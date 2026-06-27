-- 005_atomic_processing.sql
-- Add queue lock column for worker-based processing
ALTER TABLE source_documents ADD COLUMN IF NOT EXISTS processing_started_at TIMESTAMPTZ DEFAULT NULL;

-- Fast queue query index
CREATE INDEX IF NOT EXISTS idx_source_documents_queue 
ON source_documents (elaborato, processing_started_at, tentativi, data_rilevamento);

-- Note: atomic writes are now handled directly in the Edge Function (ingest-news)
-- The function used to rely on atomic_process_document() RPC, but we switched to
-- direct Supabase inserts from TypeScript for simpler schema maintenance.

-- Cleanup old duplicate index
DROP INDEX IF EXISTS idx_source_documents_unprocessed_ordered;
