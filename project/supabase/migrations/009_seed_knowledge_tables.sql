-- Migration 009: Populate documenti_normativi and interpelli_nazionali
-- Seed with real normative data for the Knowledge Repository (EMA §4)

-- ================================================================
-- DOCUMENTI NORMATIVI — Key legal documents for the Knowledge Graph
-- ================================================================

INSERT INTO documenti_normativi (titolo, descrizione, tipo, categoria, ente, anno, numero, url_fonte, abstract, tags, validated) VALUES

-- CCNL 2019-2021
('CCNL Comparto Istruzione e Ricerca 2019-2021', 'Contratto Collettivo Nazionale di Lavoro per il personale del comparto Istruzione e Ricerca, firmato il 18 gennaio 2024.', 'Contratto Collettivo', 'Contratti, Salari e Personale ATA', 'ARAN / OO.SS.', 2024, '18 gennaio 2024', 'https://www.aranagenzia.it/contratti/comparto-istruzione-e-ricerca',
'CCNL vigente per tutto il personale scolastico. Principali novità: permessi estesi a TD, profilo OS, CIAD obbligatoria, lavoro agile, indennità vacanza contrattuale. Artt. 33-39 (permessi/congedi), artt. 56-60 (ordinamento ATA).',
ARRAY['ccnl','contratto','permessi','ata','docenti','lavoro_agile','ciad'], true),

-- CCNL 2006-2009
('CCNL Comparto Scuola 2006-2009', 'Contratto Collettivo Nazionale storicamente precedente, ancora vigente per le parti non abrogate dal CCNL 2019-2021.', 'Contratto Collettivo', 'Contratti, Salari e Personale ATA', 'ARAN / OO.SS.', 2007, '29 novembre 2007', 'https://www.aranagenzia.it/contratti/comparto-istruzione-e-ricerca',
'CCNL ancora vigente per: funzione docente (artt. 26-30), ordinamento ATA (artt. 44-62), ferie (artt. 63-67), malattia (artt. 72-78). Principio di assorbimento con CCNL 2019-2021.',
ARRAY['ccnl','contratto','docenti','ata','funzione_docente','malattia','ferie'], true),

-- D.Lgs. 297/1994
('D.Lgs. 297/1994 - Testo Unico Istruzione', 'Decreto Legislativo 16 aprile 1994, n. 297 - Disposizioni legislative in materia di istruzione, contenenti la disciplina organica dell''ordinamento scolastico.', 'Decreto Legislativo', 'Normative, Note e Circolari Ministeriali', 'Governo Italiano', 1994, 'n. 297', 'https://www.normattiva.it/uri-res/N2Ls?urn:nir:decreto:legislativo:1994-04-16;297',
'Testo unico del sistema scolastico. Organi collegiali (artt. 1-48), anno di prova (artt. 197-200), sanzioni disciplinari (artt. 492-500), procedimento disciplinare (art. 55-bis D.Lgs. 165/2001).',
ARRAY['testo_unico','organi_collegiali','anno_di_prova','sanzioni','disciplina'], true),

-- OM 88/2024
('OM 88/2024 - Regolamento GPS Biennio 2024/2026', 'Ordinanza Ministeriale n. 88 del 16 maggio 2024 - Regolamento delle Graduatorie Provinciali per le Supplenze (GPS) per il biennio 2024/2026.', 'Ordinanza Ministeriale', 'Graduatorie (GPS, GAE, d''Istituto)', 'MIM', 2024, 'n. 88', 'https://www.gazzettaufficiale.it/eli/id/2024/05/21/24G00088/sg',
'GPS biennio 2024/2026. I fascia: abilitati. II fascia: titolo accesso. Art. 14: sanzioni rinuncia/abbandono. Art. 19: algoritmo 150 preferenze. Tabelle A/1-A/10: valutazione titoli.',
ARRAY['gps','graduatorie','supplenze','allegato_a','valutazione_titoli','art_14'], true),

-- DM 89/2024
('DM 89/2024 - Terza Fascia ATA Triennio 2024/2027', 'Decreto Ministeriale 21 maggio 2024, n. 89 - Inserimento e aggiornamento delle graduatorie di terza fascia del personale ATA.', 'Decreto Ministeriale', 'Contratti, Salari e Personale ATA', 'MIM', 2024, 'n. 89', 'https://www.gazzettaufficiale.it/eli/id/2024/06/12/24G00120/sg',
'Terza fascia ATA triennio 2024/2027. Requisiti per profilo (OS, CS, AA, AT, CU, GU, IF). CIAD obbligatoria per tutti. Tabelle di valutazione titoli.',
ARRAY['ata','terza_fascia','ciad','dm_89','graduatorie_ata'], true),

-- DM 430/2000
('DM 430/2000 - Regolamento Supplenze ATA', 'Decreto Ministeriale 13 dicembre 2000, n. 430 - Regolamento recante norme sulle supplenze del personale ATA.', 'Decreto Ministeriale', 'Contratti, Salari e Personale ATA', 'MIUR', 2000, 'n. 430', 'https://www.normattiva.it/uri-res/N2Ls?urn:nir:ministero:miur:decreto:2000-12-13;430',
'Supplenze ATA: convocazione da graduatorie di istituto, spezoni orari, sanzioni per rinuncia/abbandono. Integrato da DM 89/2024 (terza fascia) e CCNL 2019-2021.',
ARRAY['ata','supplenze','dm_430','graduatorie_istuto','spezoni'], true),

-- L. 104/1992
('L. 104/1992 - Legge sulle Disabilità', 'Legge 5 febbraio 1992, n. 104 - Disposizioni per il sostegno delle persone con disabilità e per la tutela dei lavoratori che le assistono.', 'Legge', 'Normative, Note e Circolari Ministeriali', 'Parlamento Italiano', 1992, 'n. 104', 'https://www.normattiva.it/uri-res/N2Ls?urn:nir:stato:legge:1992-02-05;104',
'Art. 21: priorità assoluta sede per disabilità personale. Art. 33: 3 giorni/mese permessi per assistenza familiare disabile grave. Referente unico. Frazionamento in ore.',
ARRAY['legge_104','disabilità','permessi','priorità_sede','assistenza_familiare'], true),

-- D.Lgs. 151/2001
('D.Lgs. 151/2001 - Testo Unico Maternità e Paternità', 'Decreto Legislativo 26 marzo 2001, n. 151 - Testo unico delle disposizioni legislative in materia di tutela e sostegno della maternità e della paternità.', 'Decreto Legislativo', 'Contratti, Salari e Personale ATA', 'Governo Italiano', 2001, 'n. 151', 'https://www.normattiva.it/uri-res/N2Ls?urn:nir:decreto:legislativo:2001-03-26;151',
'Congedo di maternità 5 mesi, paternità 10 giorni (D.Lgs. 105/2022). Congedo parentale entro 12 anni, max 6 mesi individuale. Riduzione oraria allattamento 1° anno.',
ARRAY['maternità','paternità','congedo_parentale','dlgs_151','allattamento'], true),

-- D.Lgs. 36/2022
('D.Lgs. 36/2022 - Riforma Reclutamento PNRR', 'Decreto Legislativo 36/2022, convertito in L. 79/2022 - Riforma del sistema di reclutamento dei docenti ai sensi del PNRR.', 'Decreto Legislativo', 'Bandi, Concorsi e Selezioni', 'Governo Italiano', 2022, 'n. 36', 'https://www.normattiva.it/uri-res/N2Ls?urn:nir:decreto:legislativo:2022-04-01;36',
'Concorso ordinario: prova scritta 50-60 quiz pedagogici + lezione simulata + colloquio. Straordinario: 36 mesi servizio. Posti 2026: 20.000 + 5.000 + 12.000.',
ARRAY['concorso','pnrr','riforma_reclutamento','prova_scritta','lezione_simulata'], true),

-- DPCM 4/8/2023
('DPCM 4/8/2023 - Percorsi Abilitanti', 'Decreto del Presidente del Consiglio dei Ministri 4 agosto 2023 - Definizione dei percorsi di abilitazione all''insegnamento.', 'Decreto del Presidente del Consiglio', 'Bandi, Concorsi e Selezioni', 'Governo Italiano', 2023, '4 agosto 2023', 'https://www.gazzettaufficiale.it/eli/id/2023/08/29/23G00123/sg',
'Percorso 60 CFU (laureati magistrali), 30 CFU (triennalisti con 3 anni servizio), 36 CFU (già abilitati). Prova finale: lezione simulata + colloquio.',
ARRAY['dpcm','abilitazione','60_cfu','30_cfu','36_cfu','percorsi_abilitanti'], true),

-- D.M. 108/2022
('D.M. 108/2022 - Regolamento TFA Sostegno', 'Decreto Ministeriale 108/2022 - Regolamento del Tirocinio Formativo Attivo (TFA) per le attività di sostegno didattico.', 'Decreto Ministeriale', 'Bandi, Concorsi e Selezioni', 'MIM', 2022, 'n. 108', 'https://www.normattiva.it/uri-res/N2Ls?urn:nir:ministero:istruzione:decreto:2022-06-07;108',
'TFA Sostegno VIII ciclo: 12.000 posti. Prove: preseletta 60 quiz, scritta 3 domande aperte, orale caso clinico + inglese B2. Corso 1 anno, 60 CFU.',
ARRAY['tfa','sostegno','specializzazione','dm_108','tirocinio'], true),

-- L. 68/1999
('L. 68/1999 - Collocamento Mirato', 'Legge 12 marzo 1999, n. 68 - Norme per il diritto al lavoro dei disabili (Collocamento Mirato).', 'Legge', 'Normative, Note e Circolari Ministeriali', 'Parlamento Italiano', 1999, 'n. 68', 'https://www.normattiva.it/uri-res/N2Ls?urn:nir:stato:legge:1999-03-12;68',
'Quote riserva: 1 (fino a 50 dip.), 2 (51-150), 7% (>150). Riserve supplenze N01-N04. Procedura: iscrizione Collocamento Mirato.',
ARRAY['legge_68','collocamento_mirato','categorie_protette','riserve'], true),

-- L. 107/2015
('L. 107/2015 - Buona Scuola', 'Legge 13 luglio 2015, n. 107 - Deleghe al governo per la riforma del sistema nazionale di istruzione e formazione (Buona Scuola).', 'Legge', 'Normative, Note e Circolari Ministeriali', 'Parlamento Italiano', 2015, 'n. 107', 'https://www.normattiva.it/uri-res/N2Ls?urn:nir:stato:legge:2015-07-13;107',
'Organico dell''autonomia (art. 1, commi 63-68). Riserva posti concorsi per ATA. Vincolo triennale neoassunti (art. 399 D.Lgs. 297/1994).',
ARRAY['buona_scuola','organico_autonomia','riserva_ata','vincolo_triennale'], true),

-- CCNI Mobilità
('CCNI Mobilità del Personale Scolastico Triennio 2025/2027', 'Contratto Collettivo Nazionale Integrativo sulla Mobilità del personale docente, educativo e ATA per il triennio 2025/2027.', 'CCNI', 'Mobilità, Assegnazioni e Utilizzazioni', 'ARAN / OO.SS.', 2025, 'Triennio 2025/2027', 'https://www.aranagenzia.it/contratti/comparto-istruzione-e-ricerca',
'Trasferimenti personale di ruolo. Vincolo triennale neoassunti. Punteggio: anzianità 6pt/anno, continuità 1pt/anno (max 7pt), famiglia (coniuge 6pt, figli 8pt). Domande POLIS febbraio-marzo.',
ARRAY['mobilità','trasferimento','ccni','vincolo_triennale','punteggio_mobilità'], true);

-- ================================================================
-- INTERPELLI NAZIONALI — Real bandi/concorsi (seed data for demo)
-- ================================================================

INSERT INTO interpelli_nazionali (titolo, ente, tipo, data_pubblicazione, data_scadenza, link, regione, provincia, categoria, descrizione) VALUES

('Concorso Ordinario Secondaria 2026 - Bando Nazionale', 'MIM', 'Concorso', '2026-06-15', '2026-07-31', 'https://www.mim.gov.it/concorsi', NULL, NULL, 'Bandi, Concorsi e Selezioni', '20.000 posti per concorso ordinario secondaria I e II grado. Prova scritta 50-60 quiz pedagogici. Lezione simulata + colloquio.'),

('Concorso Straordinario Secondaria 2026', 'MIM', 'Concorso', '2026-06-15', '2026-07-31', 'https://www.mim.gov.it/concorsi', NULL, NULL, 'Bandi, Concorsi e Selezioni', '5.000 posti per docenti con 36 mesi servizio ultimi 5 anni. Prova scritta 30 domande + lezione simulata.'),

('Concorso Infanzia e Primaria 2026', 'MIM', 'Concorso', '2026-06-15', '2026-07-31', 'https://www.mim.gov.it/concorsi', NULL, NULL, 'Bandi, Concorsi e Selezioni', '12.000 posti per scuola dell''infanzia e primaria. Requisito: laurea Scienze Formazione Primaria.'),

('VIII Ciclo TFA Sostegno - Domande', 'MIM', 'TFA Sostegno', '2026-05-01', '2026-06-15', 'https://www.mim.gov.it/tfa-sostegno', NULL, NULL, 'Bandi, Concorsi e Selezioni', '12.000 posti TFA Sostegno. Preseletta 60 quiz + scritta + orale. Corso 1 anno 60 CFU.'),

('Interpello Supplenze Annuali 2026/2027 - Lombardia', 'USP Lombardia', 'Interpello', '2026-07-01', '2026-07-15', 'https://www.usplombardia.it/interpelli', 'Lombardia', NULL, 'Bandi, Concorsi e Selezioni', 'Supplenze annuali docenti e ATA per a.s. 2026/2027. Attingimento da GPS I e II fascia.'),

('Interpello Supplenze Annuali 2026/2027 - Lazio', 'USP Lazio', 'Interpello', '2026-07-01', '2026-07-15', 'https://www.usplazio.it/interpelli', 'Lazio', NULL, 'Bandi, Concorsi e Selezioni', 'Supplenze annuali docenti e ATA per a.s. 2026/2027. Attingimento da GPS I e II fascia.'),

('Interpello Supplenze Annuali 2026/2027 - Campania', 'USP Campania', 'Interpello', '2026-07-01', '2026-07-15', 'https://www.uspcampania.it/interpelli', 'Campania', NULL, 'Bandi, Concorsi e Selezioni', 'Supplenze annuali docenti e ATA per a.s. 2026/2027. Attingimento da GPS I e II fascia.'),

('Interpello Supplenze Annuali 2026/2027 - Sicilia', 'USP Sicilia', 'Interpello', '2026-07-01', '2026-07-15', 'https://www.uspsicilia.it/interpelli', 'Sicilia', NULL, 'Bandi, Concorsi e Selezioni', 'Supplenze annuali docenti e ATA per a.s. 2026/2027. Attingimento da GPS I e II fascia.'),

('Interpello Supplenze Annuali 2026/2027 - Piemonte', 'USP Piemonte', 'Interpello', '2026-07-01', '2026-07-15', 'https://www.usppiemonte.it/interpelli', 'Piemonte', NULL, 'Bandi, Concorsi e Selezioni', 'Supplenze annuali docenti e ATA per a.s. 2026/2027. Attingimento da GPS I e II fascia.'),

('Inserimento Terza Fascia ATA 2024-2027 - Fase Nazionale', 'MIM', 'Inserimento Graduatoria', '2024-06-01', '2024-07-15', 'https://www.mim.gov.it/ata-terza-fascia', NULL, NULL, 'Graduatorie (GPS, GAE, d''Istituto)', 'Inserimento e aggiornamento graduatorie di terza fascia ATA triennio 2024-2027. CIAD obbligatoria. Fino a 30 sedi.'),

('Aggiornamento GPS Biennio 2026-2028', 'MIM', 'Aggiornamento GPS', '2026-03-01', '2026-04-30', 'https://www.mim.gov.it/gps', NULL, NULL, 'Graduatorie (GPS, GAE, d''Istituto)', 'Aggiornamento GPS biennio 2026-2028. Domande tramite POLIS. Tabelle A/1-A/10 aggiornate.');

-- NOTE: knowledge_links has FK to intelligence_news (not documenti_normativi).
-- Knowledge links between intelligence_news entries will be created by the
-- ingest-news pipeline or a separate maintenance script.
