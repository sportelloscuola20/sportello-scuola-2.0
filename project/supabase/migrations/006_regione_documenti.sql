-- 006_regione_documenti.sql
-- Aggiunge colonna regione a intelligence_news per filtro regionale
ALTER TABLE intelligence_news ADD COLUMN IF NOT EXISTS regione TEXT DEFAULT NULL;
CREATE INDEX IF NOT EXISTS idx_intelligence_news_regione ON intelligence_news (regione);

-- Crea tabella documenti_normativi per la sezione /normative-e-documenti
CREATE TABLE IF NOT EXISTS documenti_normativi (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  titolo TEXT NOT NULL,
  descrizione TEXT DEFAULT '',
  tipo TEXT NOT NULL DEFAULT 'decreto',
  categoria TEXT NOT NULL DEFAULT 'Decreti e Ordinanze Ministeriali',
  ente TEXT DEFAULT '',
  anno INTEGER,
  numero TEXT DEFAULT '',
  url_documento TEXT,
  url_fonte TEXT,
  data_pubblicazione TIMESTAMPTZ DEFAULT now(),
  data_entrata_vigore TIMESTAMPTZ,
  data_scadenza TIMESTAMPTZ,
  regione TEXT,
  abstract TEXT DEFAULT '',
  tags TEXT[] DEFAULT '{}',
  validated BOOLEAN DEFAULT false,
  validated_at TIMESTAMPTZ,
  validated_by TEXT,
  is_archived BOOLEAN DEFAULT false,
  created_at TIMESTAMPTZ DEFAULT now(),
  updated_at TIMESTAMPTZ DEFAULT now()
);

ALTER TABLE documenti_normativi ENABLE ROW LEVEL SECURITY;
CREATE POLICY "Anyone can read validated documents" ON documenti_normativi
  FOR SELECT USING (validated = true);

-- Indici per ricerca e filtri
CREATE INDEX IF NOT EXISTS idx_documenti_normativi_tipo ON documenti_normativi (tipo);
CREATE INDEX IF NOT EXISTS idx_documenti_normativi_categoria ON documenti_normativi (categoria);
CREATE INDEX IF NOT EXISTS idx_documenti_normativi_anno ON documenti_normativi (anno);
CREATE INDEX IF NOT EXISTS idx_documenti_normativi_validated ON documenti_normativi (validated);
CREATE INDEX IF NOT EXISTS idx_documenti_normativi_regione ON documenti_normativi (regione);

-- Tabella per l'hub universitario (percorsi abilitanti e TFA)
CREATE TABLE IF NOT EXISTS hub_universita (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  nome TEXT NOT NULL,
  tipo TEXT NOT NULL DEFAULT 'telematica',
  regione TEXT,
  citta TEXT,
  url_corso TEXT NOT NULL,
  url_avvisi TEXT,
  ultimo_bando TEXT,
  stato_iscrizioni TEXT DEFAULT 'n/d',
  note TEXT DEFAULT '',
  ordine INTEGER DEFAULT 0,
  created_at TIMESTAMPTZ DEFAULT now(),
  updated_at TIMESTAMPTZ DEFAULT now()
);

ALTER TABLE hub_universita ENABLE ROW LEVEL SECURITY;
CREATE POLICY "Anyone can read universita" ON hub_universita
  FOR SELECT USING (true);

-- Crea vista per dashboard documenti
CREATE OR REPLACE VIEW documenti_normativi_stats AS
SELECT
  COUNT(*) AS totale,
  COUNT(*) FILTER (WHERE validated = true) AS validati,
  COUNT(*) FILTER (WHERE validated = false) AS da_validare,
  COUNT(*) FILTER (WHERE data_scadenza IS NOT NULL AND data_scadenza > now()) AS in_scadenza,
  COUNT(*) FILTER (WHERE data_pubblicazione > now() - interval '30 days') AS ultimi_30_giorni
FROM documenti_normativi;

-- Popola hub università con dati iniziali
INSERT INTO hub_universita (nome, tipo, regione, citta, url_corso, stato_iscrizioni, ordine) VALUES
('Università Telematica Pegaso', 'telematica', 'Campania', 'Napoli', 'https://www.unipegaso.it', 'n/d', 1),
('Università Telematica IUL', 'telematica', 'Toscana', 'Firenze', 'https://www.iuline.it', 'n/d', 2),
('Università della Campania "Luigi Vanvitelli"', 'pubblica', 'Campania', 'Caserta', 'https://www.unicampania.it', 'n/d', 3),
('Università degli Studi di Cassino e del Lazio Meridionale', 'pubblica', 'Lazio', 'Cassino', 'https://www.unicas.it', 'n/d', 4),
('Università degli Studi Suor Orsola Benincasa', 'pubblica', 'Campania', 'Napoli', 'https://www.unisob.na.it', 'n/d', 5),
('Università degli Studi di Salerno', 'pubblica', 'Campania', 'Fisciano (SA)', 'https://www.unisa.it', 'n/d', 6),
('Università degli Studi della Tuscia', 'pubblica', 'Lazio', 'Viterbo', 'https://www.unitus.it', 'n/d', 7),
('Università degli Studi Roma Tre', 'pubblica', 'Lazio', 'Roma', 'https://www.uniroma3.it', 'n/d', 8),
('Sapienza Università di Roma', 'pubblica', 'Lazio', 'Roma', 'https://www.uniroma1.it', 'n/d', 9),
('Università degli Studi di Roma "Tor Vergata"', 'pubblica', 'Lazio', 'Roma', 'https://www.uniroma2.it', 'n/d', 10),
('Università Europea di Roma', 'privata', 'Lazio', 'Roma', 'https://www.universitaeuropeadiroma.it', 'n/d', 11)
ON CONFLICT DO NOTHING;
