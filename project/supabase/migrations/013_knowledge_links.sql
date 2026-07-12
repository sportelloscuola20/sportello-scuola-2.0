-- knowledge_links: Add cross-table support and graph traversal indexes
-- Table already has: id, news_id_a, news_id_b, tipo_relazione, peso, created_at
-- All links reference intelligence_news IDs

-- Add indexes for efficient graph traversal
CREATE INDEX IF NOT EXISTS idx_knowledge_links_news_a ON knowledge_links(news_id_a);
CREATE INDEX IF NOT EXISTS idx_knowledge_links_news_b ON knowledge_links(news_id_b);
CREATE INDEX IF NOT EXISTS idx_knowledge_links_tipo ON knowledge_links(tipo_relazione);

-- Ensure RLS is enabled
ALTER TABLE knowledge_links ENABLE ROW LEVEL SECURITY;

DO $$ BEGIN
  CREATE POLICY "Anyone can read knowledge links"
    ON knowledge_links FOR SELECT USING (true);
EXCEPTION WHEN duplicate_object THEN NULL;
END $$;

-- Create a graph traversal function
CREATE OR REPLACE FUNCTION get_related_news(
  p_news_id UUID,
  p_max_depth INT DEFAULT 2,
  p_limit INT DEFAULT 20
)
RETURNS TABLE (
  news_id UUID,
  relazione TEXT,
  depth INT,
  peso_val FLOAT
) AS $$
BEGIN
  RETURN QUERY
  WITH RECURSIVE graph_traverse AS (
    SELECT
      CASE WHEN kl.news_id_a = p_news_id THEN kl.news_id_b ELSE kl.news_id_a END AS related_id,
      kl.tipo_relazione::text AS rel_type,
      1 AS current_depth,
      kl.peso AS weight
    FROM knowledge_links kl
    WHERE kl.news_id_a = p_news_id OR kl.news_id_b = p_news_id

    UNION ALL

    SELECT
      CASE WHEN kl.news_id_a = gt.related_id THEN kl.news_id_b ELSE kl.news_id_a END,
      kl.tipo_relazione::text,
      gt.current_depth + 1,
      LEAST(gt.weight, kl.peso)
    FROM knowledge_links kl
    INNER JOIN graph_traverse gt ON (kl.news_id_a = gt.related_id OR kl.news_id_b = gt.related_id)
    WHERE gt.current_depth < p_max_depth
      AND gt.related_id != p_news_id
  )
  SELECT DISTINCT ON (gt.related_id)
    gt.related_id AS news_id,
    gt.rel_type AS relazione,
    gt.current_depth AS depth,
    gt.weight AS peso_val
  FROM graph_traverse gt
  WHERE gt.related_id != p_news_id
  ORDER BY gt.related_id, gt.current_depth, gt.weight DESC
  LIMIT p_limit;
END;
$$ LANGUAGE plpgsql STABLE;
