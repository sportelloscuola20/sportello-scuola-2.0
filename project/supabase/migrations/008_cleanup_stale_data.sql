-- 008_cleanup_stale_data.sql
-- Create intelligence_news / intelligence_scadenze (previously created manually)
-- then cleanup old data.

CREATE TABLE IF NOT EXISTS intelligence_news (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  titolo TEXT NOT NULL,
  descrizione TEXT,
  data_pubblicazione TIMESTAMPTZ NOT NULL DEFAULT now(),
  fonte_livello TEXT,
  fonte_nome TEXT,
  fonte_url TEXT,
  fonte_peso INT,
  criticita TEXT DEFAULT 'media',
  impatto TEXT DEFAULT 'nazionale',
  platea TEXT DEFAULT 'ampia',
  target TEXT[],
  categoria TEXT,
  fonte_primaria TEXT,
  fonte_url_dettaglio TEXT,
  data_acquisizione TIMESTAMPTZ NOT NULL DEFAULT now(),
  produzione_livelli JSONB DEFAULT '[]'::jsonb,
  tag TEXT[],
  link TEXT,
  is_pinned BOOLEAN NOT NULL DEFAULT false,
  is_archived BOOLEAN NOT NULL DEFAULT false,
  regione TEXT,
  source_document_id UUID,
  ultimo_aggiornamento TIMESTAMPTZ,
  created_at TIMESTAMPTZ NOT NULL DEFAULT now()
);

CREATE INDEX IF NOT EXISTS idx_intelligence_news_published ON intelligence_news(data_pubblicazione DESC);
CREATE INDEX IF NOT EXISTS idx_intelligence_news_archived ON intelligence_news(is_archived);
CREATE INDEX IF NOT EXISTS idx_intelligence_news_pinned ON intelligence_news(is_pinned);

CREATE TABLE IF NOT EXISTS intelligence_scadenze (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  news_id UUID,
  titolo TEXT NOT NULL,
  descrizione TEXT,
  normativa TEXT,
  soggetti_coinvolti TEXT[],
  data_scadenza TIMESTAMPTZ,
  priorita TEXT DEFAULT 'media',
  impatto TEXT DEFAULT 'nazionale',
  conseguenze_non_azione TEXT,
  guida_operativa TEXT,
  tipo TEXT DEFAULT 'Adempimenti',
  auto_generata BOOLEAN NOT NULL DEFAULT false,
  is_conclusa BOOLEAN NOT NULL DEFAULT false,
  periodicita TEXT,
  regione TEXT,
  link TEXT,
  created_at TIMESTAMPTZ NOT NULL DEFAULT now()
);

CREATE INDEX IF NOT EXISTS idx_intelligence_scadenze_scadenza ON intelligence_scadenze(data_scadenza);
CREATE INDEX IF NOT EXISTS idx_intelligence_scadenze_conclusa ON intelligence_scadenze(is_conclusa);

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
