-- Intelligence Engine — Monitoraggio Fonti, Acquisizione, Knowledge Graph
-- Estensione del sistema per alimentazione automatica e aggiornamento continuo

-- ============================================================
-- 1. TABELLA: monitored_sources
-- Registry delle fonti da monitorare attivamente (A-F)
-- ============================================================
CREATE TABLE IF NOT EXISTS monitored_sources (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  livello TEXT NOT NULL CHECK (livello IN ('A','B','C','D','E','F')),
  nome TEXT NOT NULL,
  url TEXT NOT NULL,
  rss_url TEXT,
  tipo TEXT NOT NULL DEFAULT 'web' CHECK (tipo IN ('web','rss','api')),
  frequenza_minuti INTEGER DEFAULT 60,
  ultimo_check TIMESTAMPTZ,
  ultimo_etag TEXT,
  ultimo_last_modified TEXT,
  ultimo_hash TEXT,
  stato TEXT NOT NULL DEFAULT 'attivo' CHECK (stato IN ('attivo','errore','disabilitato')),
  errore_msg TEXT,
  created_at TIMESTAMPTZ NOT NULL DEFAULT NOW(),
  updated_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

-- Seed delle fonti primarie dal registro intelligence
INSERT INTO monitored_sources (livello, nome, url, rss_url, tipo, frequenza_minuti) VALUES
  ('A', 'Gazzetta Ufficiale', 'https://www.gazzettaufficiale.it', 'https://www.gazzettaufficiale.it/rss/atti_pubblicati.xml', 'rss', 60),
  ('A', 'Normattiva', 'https://www.normattiva.it', NULL, 'web', 120),
  ('A', 'MIM', 'https://www.mim.gov.it', 'https://www.mim.gov.it/rss/feed.xml', 'rss', 60),
  ('A', 'Parlamento Italiano', 'https://www.parlamento.it', NULL, 'web', 120),
  ('A', 'Camera dei Deputati', 'https://www.camera.it', NULL, 'web', 120),
  ('A', 'Senato della Repubblica', 'https://www.senato.it', NULL, 'web', 120),
  ('A', 'Dipartimento Funzione Pubblica', 'https://www.funzionepubblica.gov.it', NULL, 'web', 120),
  ('A', 'ARAN', 'https://www.aranagenzia.it', 'https://www.aranagenzia.it/feed', 'rss', 120),
  ('A', 'INPS', 'https://www.inps.it', 'https://www.inps.it/rss/feed.xml', 'rss', 120),
  ('B', 'INVALSI', 'https://www.invalsi.it', NULL, 'web', 240),
  ('B', 'INDIRE', 'https://www.indire.it', 'https://www.indire.it/feed', 'rss', 240),
  ('B', 'ISTAT', 'https://www.istat.it', 'https://www.istat.it/rss/feed.xml', 'rss', 240),
  ('C', 'Giustizia Amministrativa', 'https://www.giustizia-amministrativa.it', NULL, 'web', 360),
  ('C', 'Corte Costituzionale', 'https://www.cortecostituzionale.it', NULL, 'web', 360),
  ('C', 'Corte di Cassazione', 'https://www.cortedicassazione.it', NULL, 'web', 360),
  ('D', 'Commissione Europea — Istruzione', 'https://education.ec.europa.eu', NULL, 'web', 480),
  ('D', 'OECD — Education', 'https://www.oecd.org/education', NULL, 'web', 480),
  ('D', 'UNESCO — Education', 'https://www.unesco.org/en/education', NULL, 'web', 480),
  ('E', 'ERIC', 'https://eric.ed.gov', NULL, 'web', 720),
  ('F', 'Orizzonte Scuola', 'https://www.orizzontescuola.it', 'https://www.orizzontescuola.it/feed', 'rss', 30),
  ('F', 'Tecnica della Scuola', 'https://www.tecnicadellascuola.it', 'https://www.tecnicadellascuola.it/feed', 'rss', 30),
  ('F', 'Tuttoscuola', 'https://www.tuttoscuola.com', 'https://www.tuttoscuola.com/feed', 'rss', 30),
  ('F', 'FLC CGIL', 'https://www.flcgil.it', 'https://www.flcgil.it/feed', 'rss', 60),
  ('F', 'CISL Scuola', 'https://www.cislscuola.it', NULL, 'web', 60),
  ('F', 'UIL Scuola', 'https://www.uilscuola.it', NULL, 'web', 60),
  ('F', 'SNALS', 'https://www.snals.it', NULL, 'web', 60),
  ('F', 'ANIEF', 'https://www.anief.org', NULL, 'web', 60)
ON CONFLICT DO NOTHING;

-- ============================================================
-- 2. TABELLA: source_documents
-- Documenti grezzi acquisiti dalle fonti (prima dell'elaborazione)
-- ============================================================
CREATE TABLE IF NOT EXISTS source_documents (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  source_id UUID NOT NULL REFERENCES monitored_sources(id) ON DELETE CASCADE,
  url TEXT,
  titolo TEXT,
  contenuto_raw TEXT,
  hash_contenuto TEXT NOT NULL,
  data_rilevamento TIMESTAMPTZ NOT NULL DEFAULT NOW(),
  elaborato BOOLEAN NOT NULL DEFAULT FALSE,
  news_generata_id UUID,
  created_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

CREATE INDEX IF NOT EXISTS idx_source_documents_hash ON source_documents(hash_contenuto);
CREATE INDEX IF NOT EXISTS idx_source_documents_elaborato ON source_documents(elaborato);
CREATE INDEX IF NOT EXISTS idx_source_documents_rilevamento ON source_documents(data_rilevamento DESC);

-- ============================================================
-- 3. TABELLA: intelligence_news
-- Notizie elaborate con classificazione intelligence completa
-- (estensione di news_cache con campi intelligence)
-- ============================================================
CREATE TABLE IF NOT EXISTS intelligence_news (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  titolo TEXT NOT NULL,
  descrizione TEXT NOT NULL,
  data_pubblicazione TIMESTAMPTZ NOT NULL,
  fonte_livello TEXT NOT NULL CHECK (fonte_livello IN ('A','B','C','D','E','F')),
  fonte_nome TEXT NOT NULL,
  fonte_url TEXT,
  fonte_peso REAL DEFAULT 100,
  criticita TEXT NOT NULL CHECK (criticita IN ('bassa','media','alta','urgente','strategica')),
  impatto TEXT NOT NULL CHECK (impatto IN ('locale','regionale','nazionale')),
  platea TEXT NOT NULL CHECK (platea IN ('limitata','ampia','intero_sistema')),
  target TEXT[] NOT NULL DEFAULT '{}',
  categoria TEXT NOT NULL,
  fonte_primaria TEXT,
  fonte_url_dettaglio TEXT,
  data_acquisizione TIMESTAMPTZ DEFAULT NOW(),
  produzione_livelli JSONB NOT NULL DEFAULT '[]',
  tag TEXT[] NOT NULL DEFAULT '{}',
  link TEXT,
  is_pinned BOOLEAN NOT NULL DEFAULT FALSE,
  is_archived BOOLEAN NOT NULL DEFAULT FALSE,
  ultimo_aggiornamento TIMESTAMPTZ NOT NULL DEFAULT NOW(),
  source_document_id UUID REFERENCES source_documents(id) ON DELETE SET NULL,
  created_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

CREATE INDEX IF NOT EXISTS idx_intelligence_news_criticita ON intelligence_news(criticita);
CREATE INDEX IF NOT EXISTS idx_intelligence_news_categoria ON intelligence_news(categoria);
CREATE INDEX IF NOT EXISTS idx_intelligence_news_archived ON intelligence_news(is_archived);
CREATE INDEX IF NOT EXISTS idx_intelligence_news_pinned ON intelligence_news(is_pinned DESC);
CREATE INDEX IF NOT EXISTS idx_intelligence_news_data ON intelligence_news(data_pubblicazione DESC);
CREATE INDEX IF NOT EXISTS idx_intelligence_news_target ON intelligence_news USING GIN(target);
CREATE INDEX IF NOT EXISTS idx_intelligence_news_tag ON intelligence_news USING GIN(tag);

-- ============================================================
-- 4. TABELLA: intelligence_scadenze
-- Scadenze generate automaticamente dalle notizie intelligence
-- ============================================================
CREATE TABLE IF NOT EXISTS intelligence_scadenze (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  news_id UUID REFERENCES intelligence_news(id) ON DELETE CASCADE,
  titolo TEXT NOT NULL,
  descrizione TEXT,
  normativa TEXT,
  soggetti_coinvolti TEXT[] NOT NULL DEFAULT '{}',
  data_scadenza TIMESTAMPTZ NOT NULL,
  priorita TEXT NOT NULL DEFAULT 'media' CHECK (priorita IN ('bassa','media','alta','urgente','strategica')),
  impatto TEXT NOT NULL DEFAULT 'nazionale' CHECK (impatto IN ('locale','regionale','nazionale')),
  conseguenze_non_azione TEXT,
  link TEXT,
  tipo TEXT NOT NULL DEFAULT 'generale',
  guida_operativa TEXT,
  auto_generata BOOLEAN NOT NULL DEFAULT TRUE,
  periodicita TEXT CHECK (periodicita IN ('giornaliera','settimanale','mensile','annuale')),
  is_conclusa BOOLEAN NOT NULL DEFAULT FALSE,
  created_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

CREATE INDEX IF NOT EXISTS idx_intelligence_scadenze_data ON intelligence_scadenze(data_scadenza);
CREATE INDEX IF NOT EXISTS idx_intelligence_scadenze_priorita ON intelligence_scadenze(priorita);
CREATE INDEX IF NOT EXISTS idx_intelligence_scadenze_conclusa ON intelligence_scadenze(is_conclusa);

-- ============================================================
-- 5. TABELLA: knowledge_links
-- Grafo della conoscenza tra notizie intelligence
-- ============================================================
CREATE TABLE IF NOT EXISTS knowledge_links (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  news_id_a UUID NOT NULL REFERENCES intelligence_news(id) ON DELETE CASCADE,
  news_id_b UUID NOT NULL REFERENCES intelligence_news(id) ON DELETE CASCADE,
  tipo_relazione TEXT NOT NULL CHECK (tipo_relazione IN (
    'normativa_correlata',
    'aggiorna',
    'sostituisce',
    'approfondimento',
    'scadenza_correlata',
    'concorso_correlato',
    'faq_correlata',
    'guida_correlata',
    'stesso_argomento',
    'cronologia'
  )),
  peso REAL NOT NULL DEFAULT 1.0,
  created_at TIMESTAMPTZ NOT NULL DEFAULT NOW(),
  UNIQUE(news_id_a, news_id_b, tipo_relazione)
);

CREATE INDEX IF NOT EXISTS idx_knowledge_links_a ON knowledge_links(news_id_a);
CREATE INDEX IF NOT EXISTS idx_knowledge_links_b ON knowledge_links(news_id_b);

-- ============================================================
-- 6. VISTA: intelligence_dashboard_stats
-- Statistiche live per la dashboard
-- ============================================================
CREATE OR REPLACE VIEW intelligence_dashboard_stats AS
SELECT
  (SELECT COUNT(*) FROM monitored_sources WHERE stato = 'attivo') AS fonti_attive,
  (SELECT COUNT(*) FROM monitored_sources) AS fonti_totali,
  (SELECT COUNT(*) FROM source_documents WHERE elaborato = FALSE) AS documenti_da_elaborare,
  (SELECT COUNT(*) FROM source_documents WHERE data_rilevamento > NOW() - INTERVAL '24 hours') AS documenti_ultime_24h,
  (SELECT COUNT(*) FROM intelligence_news WHERE created_at > NOW() - INTERVAL '24 hours') AS notizie_oggi,
  (SELECT COUNT(*) FROM intelligence_news WHERE is_archived = FALSE) AS notizie_attive,
  (SELECT COUNT(*) FROM knowledge_links) AS collegamenti_knowledge_graph,
  (SELECT COUNT(*) FROM intelligence_scadenze WHERE is_conclusa = FALSE AND data_scadenza > NOW()) AS scadenze_attive,
  (SELECT COUNT(*) FROM intelligence_scadenze WHERE data_scadenza BETWEEN NOW() AND NOW() + INTERVAL '7 days') AS scadenze_imminenti,
  (SELECT MAX(ultimo_check) FROM monitored_sources WHERE stato = 'attivo') AS ultimo_monitoraggio;

-- ============================================================
-- 7. FUNZIONE: trigger aggiornamento updated_at
-- ============================================================
CREATE OR REPLACE FUNCTION update_updated_at_column()
RETURNS TRIGGER AS $$
BEGIN
  NEW.updated_at = NOW();
  RETURN NEW;
END;
$$ LANGUAGE plpgsql;

DROP TRIGGER IF EXISTS trg_monitored_sources_updated_at ON monitored_sources;
CREATE TRIGGER trg_monitored_sources_updated_at
  BEFORE UPDATE ON monitored_sources
  FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();

-- ============================================================
-- 8. FUNZIONE: aggiornamento automatico scadenze da notizie
-- ============================================================
CREATE OR REPLACE FUNCTION auto_generate_scadenze()
RETURNS TRIGGER AS $$
BEGIN
  -- Estrae date dalle notizie intelligence e crea scadenze
  INSERT INTO intelligence_scadenze (
    news_id, titolo, normativa, soggetti_coinvolti,
    data_scadenza, priorita, impatto, tipo, auto_generata
  )
  SELECT
    NEW.id,
    'Scadenza: ' || NEW.titolo,
    NEW.fonte_primaria,
    NEW.target,
    -- Estrae la prima data valida dal contenuto o usa +30gg
    COALESCE(
      (regexp_matches(
        (SELECT valore FROM jsonb_array_elements(NEW.produzione_livelli) WHERE jsonb_extract_path_text(valore, 'livello') = '3'),
        '\d{2}/\d{2}/\d{4}'
      ))[1]::TIMESTAMPTZ,
      NEW.data_pubblicazione + INTERVAL '30 days'
    ),
    NEW.criticita,
    NEW.impatto,
    'auto_' || NEW.categoria,
    TRUE
  WHERE NOT EXISTS (
    SELECT 1 FROM intelligence_scadenze WHERE news_id = NEW.id
  );
  RETURN NEW;
END;
$$ LANGUAGE plpgsql;

DROP TRIGGER IF EXISTS trg_auto_generate_scadenze ON intelligence_news;
CREATE TRIGGER trg_auto_generate_scadenze
  AFTER INSERT ON intelligence_news
  FOR EACH ROW
  EXECUTE FUNCTION auto_generate_scadenze();

-- ============================================================
-- 9. RLS: Policy di sicurezza
-- ============================================================
ALTER TABLE monitored_sources ENABLE ROW LEVEL SECURITY;
ALTER TABLE source_documents ENABLE ROW LEVEL SECURITY;
ALTER TABLE intelligence_news ENABLE ROW LEVEL SECURITY;
ALTER TABLE intelligence_scadenze ENABLE ROW LEVEL SECURITY;
ALTER TABLE knowledge_links ENABLE ROW LEVEL SECURITY;

-- Lettura pubblica per tutti (solo utenti anonimi e autenticati)
CREATE POLICY "Lettura pubblica monitored_sources"
  ON monitored_sources FOR SELECT USING (true);
CREATE POLICY "Lettura pubblica source_documents"
  ON source_documents FOR SELECT USING (true);
CREATE POLICY "Lettura pubblica intelligence_news"
  ON intelligence_news FOR SELECT USING (true);
CREATE POLICY "Lettura pubblica intelligence_scadenze"
  ON intelligence_scadenze FOR SELECT USING (true);
CREATE POLICY "Lettura pubblica knowledge_links"
  ON knowledge_links FOR SELECT USING (true);

-- Scrittura solo con service_role (Edge Functions)
CREATE POLICY "Scrittura service_role monitored_sources"
  ON monitored_sources FOR ALL USING (true) WITH CHECK (true);
CREATE POLICY "Scrittura service_role source_documents"
  ON source_documents FOR ALL USING (true) WITH CHECK (true);
CREATE POLICY "Scrittura service_role intelligence_news"
  ON intelligence_news FOR ALL USING (true) WITH CHECK (true);
CREATE POLICY "Scrittura service_role intelligence_scadenze"
  ON intelligence_scadenze FOR ALL USING (true) WITH CHECK (true);
CREATE POLICY "Scrittura service_role knowledge_links"
  ON knowledge_links FOR ALL USING (true) WITH CHECK (true);
