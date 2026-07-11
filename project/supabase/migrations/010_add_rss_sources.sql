-- Migration 010: Add RSS sources and reset blocked ones
-- Replace blocked web-scraping sources with RSS alternatives where possible

-- ================================================================
-- ADD NEW RSS SOURCES that work from cloud IPs
-- ================================================================

-- Google News RSS for Italian education (bypasses individual site blocks)
INSERT INTO monitored_sources (livello, nome, url, rss_url, tipo, frequenza_minuti, stato) VALUES
('F', 'Google News - Scuola Italia', 'https://news.google.com', 'https://news.google.com/rss/search?q=scuola+personale+docenti+Italia&hl=it&gl=IT&ceid=IT:it', 'rss', 30, 'attivo'),
('F', 'Google News - Concorsi Scuola', 'https://news.google.com', 'https://news.google.com/rss/search?q=concorso+docenti+scuola+2026&hl=it&gl=IT&ceid=IT:it', 'rss', 30, 'attivo'),
('F', 'Google News - GPS Graduatorie', 'https://news.google.com', 'https://news.google.com/rss/search?q=GPS+graduatorie+supplenze+scuola&hl=it&gl=IT&ceid=IT:it', 'rss', 30, 'attivo'),
('F', 'Google News - CCNL Scuola', 'https://news.google.com', 'https://news.google.com/rss/search?q=CCNL+scuola+contratto+personale&hl=it&gl=IT&ceid=IT:it', 'rss', 30, 'attivo'),
('F', 'Google News - Mobilità Docenti', 'https://news.google.com', 'https://news.google.com/rss/search?q=mobilità+trasferimento+docenti+scuola&hl=it&gl=IT&ceid=IT:it', 'rss', 30, 'attivo'),
('F', 'Google News - Sostegno Disabilità Scuola', 'https://news.google.com', 'https://news.google.com/rss/search?q=sostegno+disabilità+scuola+inclusione&hl=it&gl=IT&ceid=IT:it', 'rss', 30, 'attivo'),
('F', 'Google News - ATA Personale Scuola', 'https://news.google.com', 'https://news.google.com/rss/search?q=personale+ATA+scuola+contratto&hl=it&gl=IT&ceid=IT:it', 'rss', 30, 'attivo'),
('C', 'Flcgil Scuola RSS', 'https://www.flcgil.it', 'https://www.flcgil.it/rss', 'rss', 30, 'attivo'),
('C', 'Usr Sicilia RSS (Web)', 'https://www.usr.sicilia.it', 'https://www.usr.sicilia.it/feed/', 'rss', 60, 'attivo');

-- ================================================================
-- RESET BLOCKED SOURCES with fallback to RSS where possible
-- Some government sites have RSS that may work differently
-- ================================================================

-- Reset MIM to try RSS approach
UPDATE monitored_sources SET stato = 'attivo', errore_msg = NULL, rss_url = 'https://www.mim.gov.it/rss.xml'
WHERE nome = 'MIM' AND stato = 'errore';

-- Reset Gazzetta Ufficiale RSS  
UPDATE monitored_sources SET stato = 'attivo', errore_msg = NULL
WHERE nome = 'Gazzetta Ufficiale RSS' AND stato = 'errore';

-- Reset ANIEF to try different URL
UPDATE monitored_sources SET stato = 'attivo', errore_msg = NULL, rss_url = 'https://www.anief.org/feed'
WHERE nome = 'ANIEF RSS' AND stato = 'errore';

-- Reset INVALSI
UPDATE monitored_sources SET stato = 'attivo', errore_msg = NULL
WHERE nome = 'INVALSI RSS' AND stato = 'errore';

-- Reset FLC CGIL
UPDATE monitored_sources SET stato = 'attivo', errore_msg = NULL
WHERE nome = 'FLC CGIL RSS' AND stato = 'errore';

-- Reset USR regionali that had temp errors
UPDATE monitored_sources SET stato = 'attivo', errore_msg = NULL
WHERE nome IN ('USR Emilia-Romagna RSS', 'USR Umbria RSS', 'USR Calabria RSS')
  AND stato = 'errore';
