-- Migration 009: Refactor fonti URL (nazionali + USR verificati), tassonomia scadenze, regione
-- ============================================================

-- 0. DISATTIVA TRIGGER auto_generate_scadenze (fonte di falsi positivi)
DROP TRIGGER IF EXISTS trg_auto_generate_scadenze ON intelligence_news;
DROP FUNCTION IF EXISTS auto_generate_scadenze;

-- 1. AGGIORNAMENTO URL FONTI NAZIONALI
UPDATE monitored_sources SET
  url = 'https://www.miur.gov.it/web/guest/home',
  updated_at = NOW()
WHERE nome = 'MIM';

UPDATE monitored_sources SET
  rss_url = 'https://www.flcgcgil.it/feed/',
  tipo = 'rss',
  updated_at = NOW()
WHERE nome = 'FLC CGIL';

UPDATE monitored_sources SET
  url = 'https://www.cislscuola.it',
  rss_url = 'https://www.cislscuola.it/index.php?id=2557&type=100',
  tipo = 'rss',
  updated_at = NOW()
WHERE nome = 'CISL Scuola';

UPDATE monitored_sources SET
  url = 'https://uilscuolanazionale.it',
  rss_url = 'https://uilscuolanazionale.it/feed/',
  tipo = 'rss',
  updated_at = NOW()
WHERE nome = 'UIL Scuola';

UPDATE monitored_sources SET
  url = 'https://www.anief.org',
  rss_url = 'https://anief.org/index.php?option=com_obrss&task=feed&id=1:anief-rss&format=feed',
  tipo = 'rss',
  updated_at = NOW()
WHERE nome = 'ANIEF';

UPDATE monitored_sources SET
  url = 'https://www.indire.it',
  rss_url = 'https://www.indire.it/feed/',
  updated_at = NOW()
WHERE nome = 'INDIRE';

UPDATE monitored_sources SET
  url = 'https://www.invalsicloud.it',
  rss_url = 'https://www.invalsicloud.it/feed/',
  updated_at = NOW()
WHERE nome = 'INVALSI';

-- 2. AGGIORNAMENTO URL USR (con URL verificati)
-- USR con URL su dominio MIM (siti istituzionali, senza RSS -> tipo 'web')
UPDATE monitored_sources SET
  url = 'https://www.mim.gov.it/web/abruzzo',
  tipo = 'web',
  rss_url = NULL,
  updated_at = NOW()
WHERE nome = 'USR Abruzzo';

UPDATE monitored_sources SET
  url = 'https://www.mim.gov.it/web/basilicata',
  tipo = 'web',
  rss_url = NULL,
  updated_at = NOW()
WHERE nome = 'USR Basilicata';

UPDATE monitored_sources SET
  url = 'https://www.mim.gov.it/web/miur-usr-campania',
  tipo = 'web',
  rss_url = NULL,
  updated_at = NOW()
WHERE nome = 'USR Campania';

UPDATE monitored_sources SET
  url = 'https://usrfvg.gov.it/it/home/index.html',
  tipo = 'web',
  rss_url = NULL,
  updated_at = NOW()
WHERE nome = 'USR Friuli-Venezia Giulia';

UPDATE monitored_sources SET
  url = 'https://www.ufficioscolasticoregionalelazio.it',
  tipo = 'web',
  rss_url = NULL,
  updated_at = NOW()
WHERE nome = 'USR Lazio';

UPDATE monitored_sources SET
  url = 'https://www.istruzioneliguria.gov.it/',
  tipo = 'web',
  rss_url = NULL,
  updated_at = NOW()
WHERE nome = 'USR Liguria';

UPDATE monitored_sources SET
  url = 'https://www.mim.gov.it/web/usr-lombardia/',
  tipo = 'web',
  rss_url = NULL,
  updated_at = NOW()
WHERE nome = 'USR Lombardia';

UPDATE monitored_sources SET
  url = 'https://www.mim.gov.it/web/miur-usr-marche',
  tipo = 'web',
  rss_url = NULL,
  updated_at = NOW()
WHERE nome = 'USR Marche';

UPDATE monitored_sources SET
  url = 'https://www.mim.gov.it/web/molise',
  tipo = 'web',
  rss_url = NULL,
  updated_at = NOW()
WHERE nome = 'USR Molise';

UPDATE monitored_sources SET
  url = 'https://www.pugliausr.gov.it/',
  updated_at = NOW()
WHERE nome = 'USR Puglia';

UPDATE monitored_sources SET
  url = 'https://www.mim.gov.it/web/usr-sardegna',
  tipo = 'web',
  rss_url = NULL,
  updated_at = NOW()
WHERE nome = 'USR Sardegna';

UPDATE monitored_sources SET
  url = 'https://www.mim.gov.it/web/miur-usr-toscana',
  tipo = 'web',
  rss_url = NULL,
  updated_at = NOW()
WHERE nome = 'USR Toscana';

-- I restanti USR (Calabria, Emilia-Romagna, Piemonte, Sicilia, Umbria, Veneto)
-- mantengono gli URL attuali (funzionanti)

-- 3. AGGIUNGI COLONNA regione a intelligence_scadenze
ALTER TABLE intelligence_scadenze ADD COLUMN IF NOT EXISTS regione TEXT;

-- 4. AGGIORNAMENTO TASSONOMIA SCADENZE (CHECK constraint)
ALTER TABLE intelligence_scadenze DROP CONSTRAINT IF EXISTS intelligence_scadenze_tipo_check;
-- Lasciamo il campo tipo come TEXT libero per flessibilità, 
-- la validazione avviene a livello applicativo

-- 5. INDICE per filtro regione
CREATE INDEX IF NOT EXISTS idx_intelligence_scadenze_regione ON intelligence_scadenze(regione);

-- 6. AGGIORNAMENTO FREQUENZA USR a 240 min (4 ore) se non già impostata
UPDATE monitored_sources SET frequenza_minuti = 240, updated_at = NOW()
WHERE livello = 'B' AND (frequenza_minuti IS NULL OR frequenza_minuti > 240);
