-- 005_atomic_processing.sql
-- Create the monitoring/pipeline tables (previously created manually in live DB)
-- and add queue lock column for worker-based processing.

CREATE TABLE IF NOT EXISTS monitored_sources (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  livello TEXT NOT NULL DEFAULT 'F',
  nome TEXT NOT NULL,
  url TEXT NOT NULL,
  rss_url TEXT,
  tipo TEXT NOT NULL DEFAULT 'web',
  frequenza_minuti INT NOT NULL DEFAULT 60,
  ultimo_check TIMESTAMPTZ,
  ultimo_etag TEXT,
  ultimo_last_modified TEXT,
  ultimo_hash TEXT,
  stato TEXT NOT NULL DEFAULT 'attivo',
  errore_msg TEXT,
  created_at TIMESTAMPTZ NOT NULL DEFAULT now(),
  updated_at TIMESTAMPTZ NOT NULL DEFAULT now()
);

CREATE INDEX IF NOT EXISTS idx_monitored_sources_stato ON monitored_sources(stato);
CREATE INDEX IF NOT EXISTS idx_monitored_sources_tipo ON monitored_sources(tipo);

CREATE TABLE IF NOT EXISTS source_documents (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  source_id UUID REFERENCES monitored_sources(id) ON DELETE SET NULL,
  url TEXT,
  titolo TEXT,
  contenuto_raw TEXT,
  hash_contenuto TEXT,
  data_rilevamento TIMESTAMPTZ,
  elaborato BOOLEAN NOT NULL DEFAULT false,
  tentativi INT NOT NULL DEFAULT 0,
  processing_started_at TIMESTAMPTZ,
  errore_msg TEXT,
  news_generata_id UUID,
  created_at TIMESTAMPTZ NOT NULL DEFAULT now()
);

CREATE INDEX IF NOT EXISTS idx_source_documents_source ON source_documents(source_id);
CREATE INDEX IF NOT EXISTS idx_source_documents_hash ON source_documents(hash_contenuto);

ALTER TABLE source_documents ADD COLUMN IF NOT EXISTS processing_started_at TIMESTAMPTZ DEFAULT NULL;

-- Fast queue query index
CREATE INDEX IF NOT EXISTS idx_source_documents_queue 
ON source_documents (elaborato, processing_started_at, tentativi, data_rilevamento);

-- Note: atomic writes are now handled directly in the Edge Function (ingest-news)
-- The function used to rely on atomic_process_document() RPC, but we switched to
-- direct Supabase inserts from TypeScript for simpler schema maintenance.

-- Cleanup old duplicate index
DROP INDEX IF EXISTS idx_source_documents_unprocessed_ordered;
