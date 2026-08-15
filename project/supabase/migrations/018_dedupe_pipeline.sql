-- 018_dedupe_pipeline.sql
-- Fixes the data-quality fallout of the monitor-sources `.maybeSingle()` bug:
-- the dedup query returned an ERROR (data=null) as soon as two rows shared the
-- same hash_contenuto, and since the code only checked `data`, every subsequent
-- run inserted another copy (snowball effect). This left:
--   * source_documents: 48,530 rows but only ~4,073 distinct hash_contenuto
--   * intelligence_news: 34,906 rows but only ~2,593 distinct (titolo, link)
--
-- This migration:
--   1. Clamps future data_pubblicazione to now() (INDIRE used the event date).
--   2. Re-points every intelligence_news to the canonical (min id) source_document
--      for its hash_contenuto, then deletes the duplicate source_documents.
--   3. Re-points intelligence_scadenze to the canonical news (min id per titolo+link),
--      deletes knowledge_links that referenced a duplicate news, then deletes the
--      duplicate intelligence_news.
--   4. Regenerates knowledge_links from shared tags (>=4 shared tags) so the related-news
--      graph is rebuilt after the dedup emptied it.
--   5. Adds a UNIQUE index on source_documents(hash_contenuto) as defense-in-depth
--      so the pipeline can never regress into duplicates again.
--
-- NOTE: ids are UUIDs, so MIN() is computed over id::text and cast back to uuid.
-- NOTE: statement_timeout is disabled for this maintenance migration because the
-- dedup DELETEs touch ~44k+ rows and the default 30s timeout aborted the first run.
--
-- Idempotent on a fresh DB: every dedup step is a no-op when there are no
-- duplicates, and the unique index is created with IF NOT EXISTS.

SET statement_timeout = 0;

-- ============================================================================
-- 0. Indexes that make the dedup DELETEs fast (avoid seq-scan per deleted row)
-- ============================================================================
CREATE INDEX IF NOT EXISTS idx_news_source_document ON intelligence_news(source_document_id);
CREATE INDEX IF NOT EXISTS idx_scadenze_news_id ON intelligence_scadenze(news_id);

-- ============================================================================
-- 1. Clamp future publication dates
-- ============================================================================
UPDATE intelligence_news
SET data_pubblicazione = now()
WHERE data_pubblicazione > now();

-- ============================================================================
-- 2. Canonicalize source_documents (keep min id per hash) and re-point news
-- ============================================================================
WITH keep AS (
  SELECT hash_contenuto, MIN(id::text)::uuid AS keep_id
  FROM source_documents
  WHERE hash_contenuto IS NOT NULL
  GROUP BY hash_contenuto
)
UPDATE intelligence_news n
SET source_document_id = k.keep_id
FROM source_documents sd
JOIN keep k ON sd.hash_contenuto = k.hash_contenuto
WHERE n.source_document_id = sd.id;

DELETE FROM source_documents sd
USING (
  SELECT id
  FROM (
    SELECT id, hash_contenuto,
           ROW_NUMBER() OVER (PARTITION BY hash_contenuto ORDER BY id) AS rn
    FROM source_documents
    WHERE hash_contenuto IS NOT NULL
  ) ranked
  WHERE rn > 1
) dup
WHERE sd.id = dup.id;

-- ============================================================================
-- 3. Canonicalize intelligence_news (keep min id per titolo+link)
-- ============================================================================
WITH keep AS (
  SELECT MIN(id::text)::uuid AS keep_id, titolo, COALESCE(link, '') AS lk
  FROM intelligence_news
  GROUP BY titolo, COALESCE(link, '')
)
UPDATE intelligence_scadenze s
SET news_id = k.keep_id
FROM intelligence_news n
JOIN keep k ON n.titolo = k.titolo AND COALESCE(n.link, '') = k.lk
WHERE s.news_id = n.id AND n.id <> k.keep_id;

WITH dups AS (
  SELECT id
  FROM (
    SELECT id, titolo, COALESCE(link, '') AS lk,
           ROW_NUMBER() OVER (PARTITION BY titolo, COALESCE(link, '') ORDER BY id) AS rn
    FROM intelligence_news
  ) ranked
  WHERE rn > 1
)
DELETE FROM knowledge_links kl
WHERE kl.news_id_a IN (SELECT id FROM dups)
   OR kl.news_id_b IN (SELECT id FROM dups);

WITH dups AS (
  SELECT id
  FROM (
    SELECT id, titolo, COALESCE(link, '') AS lk,
           ROW_NUMBER() OVER (PARTITION BY titolo, COALESCE(link, '') ORDER BY id) AS rn
    FROM intelligence_news
  ) ranked
  WHERE rn > 1
)
DELETE FROM intelligence_news n
USING dups
WHERE n.id = dups.id;

-- ============================================================================
-- 4. Regenerate knowledge_links from shared tags (related-news graph)
-- ============================================================================
INSERT INTO knowledge_links (news_id_a, news_id_b, tipo_relazione, peso)
SELECT a, b, 'stesso_argomento', overlap::float
FROM (
  SELECT a.id AS a, b.id AS b,
         (SELECT COUNT(*) FROM unnest(a.tag) u JOIN unnest(b.tag) v ON u = v) AS overlap
  FROM intelligence_news a
  JOIN intelligence_news b ON a.id < b.id
  WHERE a.tag IS NOT NULL AND b.tag IS NOT NULL
    AND array_length(a.tag, 1) > 0 AND array_length(b.tag, 1) > 0
) pairs
WHERE overlap >= 4
ON CONFLICT (news_id_a, news_id_b, tipo_relazione) DO NOTHING;

-- ============================================================================
-- 5. Defense-in-depth: hash uniqueness (NULLs allowed, PG ignores them in UNIQUE)
-- ============================================================================
CREATE UNIQUE INDEX IF NOT EXISTS idx_source_documents_hash_unique
ON source_documents (hash_contenuto)
WHERE hash_contenuto IS NOT NULL;
