-- Migration 008: Nuova tassonomia 8 categorie utente, fix URL, USR, sindacati
-- ============================================================

-- 0. AGGIORNAMENTO DATI ESISTENTI alle nuove 8 categorie
UPDATE intelligence_news SET categoria = 'Normative, Note e Circolari Ministeriali'
WHERE categoria IN ('normativa', 'governance');

UPDATE intelligence_news SET categoria = 'Bandi, Concorsi e Selezioni'
WHERE categoria IN ('reclutamento');

UPDATE intelligence_news SET categoria = 'Contratti, Salari e Personale ATA'
WHERE categoria IN ('personale');

UPDATE intelligence_news SET categoria = 'Didattica, Formazione e Innovazione'
WHERE categoria IN ('inclusione', 'innovazione');

-- 1. AGGIORNAMENTO TASSONOMIA: da 6 categorie tecniche a 8 categorie utente
ALTER TABLE intelligence_news DROP CONSTRAINT IF EXISTS intelligence_news_categoria_check;
ALTER TABLE intelligence_news ADD CONSTRAINT intelligence_news_categoria_check
  CHECK (categoria IN (
    'Bandi, Concorsi e Selezioni',
    'Didattica, Formazione e Innovazione',
    'Graduatorie (GPS, GAE, d''Istituto)',
    'Contratti, Salari e Personale ATA',
    'Pensioni, Previdenza e Welfare',
    'Normative, Note e Circolari Ministeriali',
    'Mobilità, Assegnazioni e Utilizzazioni',
    'Esami di Stato e Valutazioni (INVALSI)'
  ));

-- 2. FIX URL FONTI ESISTENTI (404)
UPDATE monitored_sources SET
  rss_url = 'https://www.miur.gov.it/web/guest/archivio-notizie?p_p_id=101_INSTANCE_Sg6E42t8Xm7X&p_p_lifecycle=0&p_p_mode=view&_101_INSTANCE_Sg6E42t8Xm7X_struts_action=%2Fasset_publisher%2Fview&_101_INSTANCE_Sg6E42t8Xm7X_rss=1',
  updated_at = NOW()
WHERE nome = 'MIM' AND rss_url IS DISTINCT FROM 'https://www.miur.gov.it/web/guest/archivio-notizie?p_p_id=101_INSTANCE_Sg6E42t8Xm7X&p_p_lifecycle=0&p_p_mode=view&_101_INSTANCE_Sg6E42t8Xm7X_struts_action=%2Fasset_publisher%2Fview&_101_INSTANCE_Sg6E42t8Xm7X_rss=1';

UPDATE monitored_sources SET
  rss_url = 'https://www.inps.it/it/it/inps-comunica/notizie/rss.xml',
  updated_at = NOW()
WHERE nome = 'INPS' AND rss_url IS DISTINCT FROM 'https://www.inps.it/it/it/inps-comunica/notizie/rss.xml';

UPDATE monitored_sources SET
  rss_url = 'https://www.istat.it/it/archivio/notizie?format=rss',
  updated_at = NOW()
WHERE nome = 'ISTAT' AND rss_url IS DISTINCT FROM 'https://www.istat.it/it/archivio/notizie?format=rss';

UPDATE monitored_sources SET
  tipo = 'rss',
  rss_url = 'https://www.flcgcgil.it/feed/',
  updated_at = NOW()
WHERE nome = 'FLC CGIL' AND (tipo IS DISTINCT FROM 'rss' OR rss_url IS DISTINCT FROM 'https://www.flcgcgil.it/feed/');

-- 3. NUOVA FONTE: Gazzetta Ufficiale — Concorsi ed Esami
INSERT INTO monitored_sources (livello, nome, url, rss_url, tipo, frequenza_minuti)
SELECT 'A', 'Gazzetta Ufficiale — Concorsi', 'https://www.gazzettaufficiale.it', 'https://www.gazzettaufficiale.it/rss/concorso', 'rss', 60
WHERE NOT EXISTS (SELECT 1 FROM monitored_sources WHERE nome = 'Gazzetta Ufficiale — Concorsi');

-- 4. FIX/RINNOVO FONTI SINDACALI con RSS corretti
UPDATE monitored_sources SET rss_url = 'https://www.cislscuola.it/index.php?id=2557&type=100', tipo = 'rss', updated_at = NOW()
WHERE nome = 'CISL Scuola' AND (rss_url IS DISTINCT FROM 'https://www.cislscuola.it/index.php?id=2557&type=100' OR tipo IS DISTINCT FROM 'rss');

UPDATE monitored_sources SET rss_url = 'https://uilscuolanazionale.it/feed/', tipo = 'rss', updated_at = NOW()
WHERE nome = 'UIL Scuola' AND (rss_url IS DISTINCT FROM 'https://uilscuolanazionale.it/feed/' OR tipo IS DISTINCT FROM 'rss');

UPDATE monitored_sources SET rss_url = 'https://anief.org/index.php?option=com_obrss&task=feed&id=1:anief-rss&format=feed', tipo = 'rss', updated_at = NOW()
WHERE nome = 'ANIEF' AND (rss_url IS DISTINCT FROM 'https://anief.org/index.php?option=com_obrss&task=feed&id=1:anief-rss&format=feed' OR tipo IS DISTINCT FROM 'rss');

UPDATE monitored_sources SET rss_url = 'https://www.indire.it/feed/', updated_at = NOW()
WHERE nome = 'INDIRE' AND rss_url IS DISTINCT FROM 'https://www.indire.it/feed/';

UPDATE monitored_sources SET rss_url = 'https://www.invalsicloud.it/feed/', updated_at = NOW()
WHERE nome = 'INVALSI' AND rss_url IS DISTINCT FROM 'https://www.invalsicloud.it/feed/';

-- 5. UFFICI SCOLASTICI REGIONALI (USR) — Livello B (Governance regionale)
INSERT INTO monitored_sources (livello, nome, url, rss_url, tipo, frequenza_minuti) VALUES
  ('B', 'USR Abruzzo', 'https://www.ch.usr.abruzzo.it', 'https://www.ch.usr.abruzzo.it/site/index.php?format=feed&type=rss', 'rss', 240),
  ('B', 'USR Basilicata', 'http://www.basilicata.istruzione.it', 'http://www.basilicata.istruzione.it/index.php?format=feed&type=rss', 'rss', 240),
  ('B', 'USR Calabria', 'http://www.istruzione.calabria.it', 'http://www.istruzione.calabria.it/feed/', 'rss', 240),
  ('B', 'USR Campania', 'http://www.campania.istruzione.it', 'http://www.campania.istruzione.it/index.php?format=feed&type=rss', 'rss', 240),
  ('B', 'USR Emilia-Romagna', 'https://istruzioneer.gov.it', 'https://istruzioneer.gov.it/feed/', 'rss', 240),
  ('B', 'USR Friuli-Venezia Giulia', 'http://www.scuola.fvg.it', 'http://www.scuola.fvg.it/usr/fvg/index.php?format=feed&type=rss', 'rss', 240),
  ('B', 'USR Lazio', 'https://www.usrlazio.it', 'https://www.usrlazio.it/index.php?format=feed&type=rss', 'rss', 240),
  ('B', 'USR Liguria', 'http://www.istruzione.liguria.it', 'http://www.istruzione.liguria.it/index.php?format=feed&type=rss', 'rss', 240),
  ('B', 'USR Lombardia', 'https://usr.misuola.lombardia.gov.it', 'https://usr.misuola.lombardia.gov.it/feed/', 'rss', 240),
  ('B', 'USR Marche', 'http://www.marche.istruzione.it', 'http://www.marche.istruzione.it/rss.xml', 'rss', 240),
  ('B', 'USR Molise', 'http://www.usr.molise.istruzione.it', 'http://www.usr.molise.istruzione.it/web/index.php?format=feed&type=rss', 'rss', 240),
  ('B', 'USR Piemonte', 'http://www.istruzionepiemonte.it', 'http://www.istruzionepiemonte.it/feed/', 'rss', 240),
  ('B', 'USR Puglia', 'http://www.pugliausr.gov.it', 'http://www.pugliausr.gov.it/index.php?format=feed&type=rss', 'rss', 240),
  ('B', 'USR Sardegna', 'http://www.sardegna.istruzione.it', 'http://www.sardegna.istruzione.it/rss.xml', 'rss', 240),
  ('B', 'USR Sicilia', 'http://www.usr.sicilia.it', 'http://www.usr.sicilia.it/index.php?format=feed&type=rss', 'rss', 240),
  ('B', 'USR Toscana', 'http://www.toscana.istruzione.it', 'http://www.toscana.istruzione.it/index.php?format=feed&type=rss', 'rss', 240),
  ('B', 'USR Umbria', 'http://www.istruzione.umbria.it', 'http://www.istruzione.umbria.it/feed/', 'rss', 240),
  ('B', 'USR Veneto', 'https://istruzioneveneto.gov.it', 'https://istruzioneveneto.gov.it/feed/', 'rss', 240)
ON CONFLICT DO NOTHING;

-- 6. CORREZIONE FREQUENZA FONTI F (Sindacali/giornali): 30 min
UPDATE monitored_sources SET frequenza_minuti = 30, updated_at = NOW()
WHERE livello = 'F' AND frequenza_minuti > 30;

-- 7. AGGIORNAMENTO intelligence_scadenze: normalizza campo tipo
UPDATE intelligence_scadenze SET tipo = REPLACE(tipo, 'auto_', '') WHERE tipo LIKE 'auto_%';
