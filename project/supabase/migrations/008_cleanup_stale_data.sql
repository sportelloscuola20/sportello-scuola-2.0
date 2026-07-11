-- 008_cleanup_stale_data.sql
-- Pulizia scadenze vecchie (pre-2025)
DELETE FROM intelligence_scadenze WHERE data_scadenza < '2025-01-01T00:00:00+00:00';

-- Reset SOLO fonti con errori temporanei (503, 500) per retry
-- Lasciare in errore: 403 (bloccato), SSL expired, redirect loop, connection reset
UPDATE monitored_sources SET stato = 'attivo', errore_msg = NULL 
WHERE stato = 'errore' 
AND (
  errore_msg LIKE '%HTTP 503%' 
  OR errore_msg LIKE '%HTTP 500%'
);
