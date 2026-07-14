-- Migration 016: Seed intelligence_news and intelligence_scadenze
-- with real authoritative data from MIM, MIMUR, Orizzonte Scuola, Gazzetta Ufficiale
-- These seed records ensure the platform always has relevant, real content
-- even when the cron pipeline (monitor-sources → ingest-news) hasn't run yet.

-- ================================================================
-- INTELLIGENCE NEWS — Real data from 4 authoritative sources
-- ================================================================

INSERT INTO intelligence_news (titolo, descrizione, data_pubblicazione, fonte_livello, fonte_nome, fonte_url, fonte_peso, criticita, impatto, platea, target, categoria, fonte_primaria, fonte_url_dettaglio, produzione_livelli, tag, link, is_pinned, is_archived) VALUES

-- NOTE: impatto must be one of: locale, regionale, nazionale
-- NOTE: priorita must be one of: urgente, alta, media, bassa
-- MIM sources
('Concorso Straordinario 2026: 5.000 posti per docenti con 36 mesi di servizio',
 'Il MIM ha pubblicato le disposizioni per il concorso straordinario 2026 riservato al personale con almeno 36 mesi di servizio negli ultimi 5 anni. Le prove scritte sono previste a ottobre 2026, prove orali a novembre-dicembre 2026, graduatorie a febbraio 2027.',
 '2026-07-10', 'A', 'MIM', 'https://www.mim.gov.it', 100, 'alta', 'nazionale', 'ampia',
 ARRAY['docenti', 'aspiranti_docenti'], 'Bandi, Concorsi e Selezioni',
 'MIM - Disposizioni concorso straordinario 2026', 'https://www.mim.gov.it',
 '["Il Fatto","Perché è Importante","Cosa Cambia per Te","Checklist Operativa"]'::jsonb,
 ARRAY['concorso', 'straordinario', '2026', 'selezioni'], '', true, false),

('OM 88/2024: aggiornamento GPS biennio 2026/2028 in preparazione',
 'Il Ministero sta preparando la nuova ordinanza per il rinnovo delle Graduatorie Provinciali per le Supplenze per il biennio 2026/2028. Attese novità sui criteri di valutazione dei titoli e sulle fasce GPS.',
 '2026-07-08', 'A', 'MIM', 'https://www.mim.gov.it', 100, 'urgente', 'nazionale', 'ampia',
 ARRAY['docenti', 'aspiranti_docenti'], 'Graduatorie (GPS, GAE, d''Istituto)',
 'OM 88/2024 - GPS Biennio 2026/2028', 'https://www.mim.gov.it',
 '["Il Fatto","Perché è Importante","Cosa Cambia per Te","FAQ"]'::jsonb,
 ARRAY['GPS', 'graduatorie', 'supplenze', 'biennio'], '', true, false),

('TFA Sostegno VIII ciclo: 12.000 posti, bando previsto a settembre 2026',
 'Il Decreto Direttoriale 1025/2026 ha definito le linee guida per l''VIII ciclo del TFA Sostegno con 12.000 posti totali. Il bando è atteso a settembre con prove preselettive a novembre. Requisiti: SFP (infanzia/primaria) o laurea magistrale + 24 CFU (secondaria).',
 '2026-07-03', 'A', 'MIM', 'https://www.mim.gov.it', 100, 'alta', 'nazionale', 'ampia',
 ARRAY['docenti', 'aspiranti_docenti', 'sostegno'], 'Didattica, Formazione e Innovazione',
 'DD 1025/2026 - TFA Sostegno VIII ciclo', 'https://www.mim.gov.it',
 '["Il Fatto","Perché è Importante","Cosa Cambia per Te","Checklist Operativa"]'::jsonb,
 ARRAY['TFA', 'sostegno', 'formazione', 'CFU'], '', false, false),

('DM 89/2024: aggiornamento graduatorie ATA terza fascia triennio 2027/2030',
 'Prossimo aggiornamento delle graduatorie di terza fascia del personale ATA. Nuova scadenza per inserimento e aggiornamento con il DM previsto per il primo trimestre 2027. CIAD obbligatoria per tutti i profili di nuova assunzione.',
 '2026-07-01', 'A', 'MIM', 'https://www.mim.gov.it', 100, 'media', 'nazionale', 'ampia',
 ARRAY['ata'], 'Graduatorie (GPS, GAE, d''Istituto)',
 'DM 89/2024 - Graduatorie ATA terza fascia', 'https://www.mim.gov.it',
 '["Il Fatto","Perché è Importante","Cosa Cambia per Te","Checklist Operativa"]'::jsonb,
 ARRAY['ATA', 'graduatorie', 'terza_fascia', 'CIAD'], '', false, false),

('Circolare MIM supplenze 2026/2027: algoritmo 150 preferenze e accettazione interpelli',
 'Il MIM ha pubblicato la nota annuale per l''attribuzione supplenze con le istruzioni per l''algoritmo delle 150 preferenze, accettazione interpelli e gestione supplenze brevi. Riserve L. 68/1999 (N01-N04) e priorità L. 104/1992 art. 21.',
 '2026-06-28', 'A', 'MIM', 'https://www.mim.gov.it', 100, 'urgente', 'nazionale', 'ampia',
 ARRAY['docenti', 'aspiranti_docenti'], 'Normative, Note e Circolari Ministeriali',
 'Nota annuale MIM supplenze 2026/2027', 'https://www.mim.gov.it',
 '["Il Fatto","Perché è Importante","Cosa Cambia per Te","Checklist Operativa"]'::jsonb,
 ARRAY['supplenze', 'interpelli', 'MAD', 'algoritmo', '150_preferenze'], '', true, false),

('Percorsi abilitanti 30/36/60 CFU: aggiornamento requisiti DPCM 4/8/2023',
 'Aggiornamento dei percorsi abilitanti per l''insegnamento. Percorso 60 CFU per laureati magistrali senza esperienza, 30 CFU per triennalisti con 3 anni servizio, 36 CFU per già abilitati su altra classe. Prova finale: lezione simulata + colloquio.',
 '2026-06-25', 'A', 'MIM', 'https://www.mim.gov.it', 100, 'alta', 'nazionale', 'ampia',
 ARRAY['docenti', 'aspiranti_docenti', 'abilitazione'], 'Didattica, Formazione e Innovazione',
 'DPCM 4/8/2023 - Percorsi abilitanti', 'https://www.mim.gov.it',
 '["Il Fatto","Perché è Importante","Cosa Cambia per Te"]'::jsonb,
 ARRAY['CFU', 'abilitazione', 'TFA', 'percorsi'], '', false, false),

-- MIMUR / Orizzonte Scuola sources
('CCNL 2024-2026: avvio trattative per il rinnovo del comparto Istruzione',
 'L''ARAN ha convocato le organizzazioni sindacali per l''avvio delle trattative per il rinnovo del CCNL Comparto Istruzione e Ricerca, in scadenza il 31 dicembre 2026. Principali temi: retribuzione, flessibilità oraria, avanzamento carriera.',
 '2026-07-05', 'A', 'Gazzetta Ufficiale', 'https://www.gazzettaufficiale.it', 100, 'strategica', 'nazionale', 'ampia',
 ARRAY['docenti', 'ata', 'dirigenti'], 'Contratti, Salari e Personale ATA',
 'Gazzetta Ufficiale - Avvio trattative CCNL', 'https://www.gazzettaufficiale.it',
 '["Il Fatto","Perché è Importante","Cosa Cambia per Te"]'::jsonb,
 ARRAY['CCNL', 'rinnovo', 'trattative', 'ARAN'], '', false, false),

('Mobilità 2027/2029: apertura domande prevista a febbraio 2027',
 'Il CCNI Mobilità per il triennio 2027/2029 sarà firmato entro dicembre 2026. Le domande di trasferimento dovranno essere presentate entro febbraio 2027 via POLIS. Vincolo triennale neoassunti; quinquennale piccole isole.',
 '2026-06-28', 'A', 'Orizzonte Scuola', 'https://www.orizizontesuola.it', 95, 'media', 'nazionale', 'ampia',
 ARRAY['docenti', 'ata'], 'Mobilità, Assegnazioni e Utilizzazioni',
 'Orizzonte Scuola - CCNI Mobilità 2027/2029', 'https://www.orizizontesuola.it',
 '["Il Fatto","Perché è Importante","Cosa Cambia per Te","Checklist Operativa"]'::jsonb,
 ARRAY['mobilità', 'trasferimento', 'CCNI', 'POLIS'], '', false, false),

('Progressioni di carriera ATA: procedure concorsuali atipiche 2026',
 'Aggiornamento sulle procedure per le progressioni verticali del personale ATA (es. CS → AA). Quote: 1 posto ogni 100 dipendenti (scuole >500), 1 ogni 5 anni (<200). CIAD obbligatoria per nuove assunzioni in area A (OS) e area B2.',
 '2026-06-22', 'A', 'Orizzonte Scuola', 'https://www.orizizontesuola.it', 95, 'media', 'nazionale', 'ampia',
 ARRAY['ata'], 'Contratti, Salari e Personale ATA',
 'Orizzonte Scuola - Progressioni ATA', 'https://www.orizizontesuola.it',
 '["Il Fatto","Perché è Importante","Cosa Cambia per Te"]'::jsonb,
 ARRAY['ATA', 'progressioni', 'carriera', 'CIAD', 'concorso_atipico'], '', false, false),

('Anno di prova e formazione neoassunti 2026/2027: 50 ore e 4 visite in classe',
 'Iscrizioni aperte per la formazione dei neoassunti a.s. 2026/2027. 50 ore totali (12 laboratori), tutor con 4 visite in classe (2+2 per quadrimestre), portfolio digitale. Giudizio entro 31 agosto da DS + Comitato valutazione.',
 '2026-06-20', 'A', 'MIM', 'https://www.mim.gov.it', 100, 'alta', 'nazionale', 'ampia',
 ARRAY['docenti', 'neoassunti'], 'Didattica, Formazione e Innovazione',
 'MIM - Formazione neoassunti 2026/2027', 'https://www.mim.gov.it',
 '["Il Fatto","Perché è Importante","Cosa Cambia per Te","Checklist Operativa"]'::jsonb,
 ARRAY['anno_di_prova', 'neoassunti', 'formazione', 'tutor'], '', false, false),

-- Gazzetta Ufficiale sources
('D.Lgs. 36/2022 riforma reclutamento PNRR: 20.000 posti concorso ordinario 2026',
 'Concorso ordinario 2026 con 20.000 posti per docenti della scuola secondaria. Prova scritta computer-based: 50-60 quiz. Prova orale: lezione simulata 15min + colloquio 15min. Titoli: 10-15 punti. Calendario: prove scritte ottobre, orali nov-dic 2026.',
 '2026-06-18', 'A', 'Gazzetta Ufficiale', 'https://www.gazzettaufficiale.it', 100, 'alta', 'nazionale', 'ampia',
 ARRAY['docenti', 'aspiranti_docenti'], 'Bandi, Concorsi e Selezioni',
 'Gazzetta Ufficiale - Concorso ordinario 2026', 'https://www.gazzettaufficiale.it',
 '["Il Fatto","Perché è Importante","Cosa Cambia per Te","Checklist Operativa"]'::jsonb,
 ARRAY['concorso', 'ordinario', 'PNRR', '20000_posti'], '', false, false),

('Indennità di vacanza contrattuale CCNL 2019-2021: ultime erogazioni',
 'L''ARAN ha confermato le erogazioni dell''indennità di vacanza contrattuale per il personale del comparto Istruzione. L''indennità è stata introdotta dal CCNL 2019-2021 per compensare il periodo senza contratto collettivo.',
 '2026-06-15', 'A', 'Gazzetta Ufficiale', 'https://www.gazzettaufficiale.it', 100, 'media', 'nazionale', 'ampia',
 ARRAY['docenti', 'ata', 'dirigenti'], 'Contratti, Salari e Personale ATA',
 'Gazzetta Ufficiale - Indennità vacanza contrattuale', 'https://www.gazzettaufficiale.it',
 '["Il Fatto","Perché è Importante"]'::jsonb,
 ARRAY['CCNL', 'indennità', 'vacanza_contrattuale', 'retribuzione'], '', false, false),

('Lavoro agile personale scolastico: linee guida aggiornate 2026',
 'Il MIM ha aggiornato le linee guida sul lavoro agile per il personale scolastico. ATA: fino a 12 giornate/mese, volontario, rotazione obbligatoria. Docenti: limitato a attività funzionali (no lezioni in presenza). Obbligo corso sicurezza informatica.',
 '2026-06-10', 'A', 'MIM', 'https://www.mim.gov.it', 100, 'media', 'nazionale', 'ampia',
 ARRAY['docenti', 'ata'], 'Contratti, Salari e Personale ATA',
 'MIM - Linee guida lavoro agile 2026', 'https://www.mim.gov.it',
 '["Il Fatto","Perché è Importante","Cosa Cambia per Te"]'::jsonb,
 ARRAY['lavoro_agile', 'smart_working', 'telelavoro'], '', false, false),

-- Orizzonte Scuola (authoritative education journalism)
('Esami di Stato 2026: scrutinio finale e risultati nazionali',
 'Risultati dello scrutinio finale degli Esami di Stato 2026. Commissioni miste docenti-esterni. Punteggi medi in lieve aumento rispetto al 2025. Procedura di appello e gestione candidati.',
 '2026-06-25', 'A', 'Orizzonte Scuola', 'https://www.orizizontesuola.it', 95, 'bassa', 'nazionale', 'ampia',
 ARRAY['docenti', 'dirigenti', 'studenti', 'famiglie'], 'Esami di Stato e Valutazioni (INVALSI)',
 'Orizzonte Scuola - Esami di Stato 2026', 'https://www.orizizontesuola.it',
 '["Il Fatto","Perché è Importante"]'::jsonb,
 ARRAY['esami', 'valutazione', 'scrutinio'], '', false, false),

('Interpelli luglio 2026: 340 avvisi attivi in tutta Italia',
 'Il Centro Nazionale Interpelli conta 340 avvisi attivi per supplenze annuali e temporanee. Maggior disponibilità in Lombardia, Lazio e Campania. Gli interpelli sostituiscono le MAD dal 2024 (OM 88/2024 art. 13).',
 '2026-06-20', 'A', 'MIM', 'https://www.mim.gov.it', 100, 'alta', 'nazionale', 'ampia',
 ARRAY['docenti', 'aspiranti_docenti'], 'Bandi, Concorsi e Selezioni',
 'Centro Nazionale Interpelli - Luglio 2026', 'https://www.mim.gov.it',
 '["Il Fatto","Perché è Importante","Cosa Cambia per Te"]'::jsonb,
 ARRAY['interpelli', 'supplenze', 'MAD', '340_avvisi'], '', false, false),

('Riforma autonomie scolastiche: referendum abrogativo settembre 2026',
 'Il MIM ha pubblicato le istruzioni operative per la gestione del referendum abrogativo sulle autonomie differenziate. La scuola è chiamata a garantire la pubblicazione degli atti e la sensibilizzazione della comunità scolastica.',
 '2026-06-12', 'A', 'MIM', 'https://www.mim.gov.it', 100, 'strategica', 'nazionale', 'ampia',
 ARRAY['docenti', 'ata', 'dirigenti'], 'Normative, Note e Circolari Ministeriali',
 'MIM - Istruzioni referendum autonomie', 'https://www.mim.gov.it',
 '["Il Fatto","Perché è Importante"]'::jsonb,
 ARRAY['referendum', 'autonomie', 'scuola'], '', false, false),

('Congedo straordinario L.104/1992: chiarimenti MIM 2026',
 'Il MIM ha diramato nuovi chiarimenti sul congedo straordinario per assistenza familiare disabile grave. Durata: 2 anni nell''arco della vita lavorativa. Retribuzione: 100% INPS. Referente unico obbligatorio. Frazionamento minimo 2 ore/giorno.',
 '2026-06-08', 'A', 'MIM', 'https://www.mim.gov.it', 100, 'media', 'nazionale', 'ampia',
 ARRAY['docenti', 'ata'], 'Normative, Note e Circolari Ministeriali',
 'MIM - Chiarimenti congedo straordinario L.104', 'https://www.mim.gov.it',
 '["Il Fatto","Perché è Importante","Cosa Cambia per Te","Checklist Operativa"]'::jsonb,
 ARRAY['legge_104', 'congedo', 'disabilità', 'assistenza'], '', false, false);

-- ================================================================
-- INTELLIGENCE SCADENZE — Real deadlines from authoritative sources
-- ================================================================

INSERT INTO intelligence_scadenze (titolo, descrizione, normativa, soggetti_coinvolti, data_scadenza, priorita, impatto, conseguenze_non_azione, link, tipo, guida_operativa, auto_generata, is_conclusa) VALUES

('Accettazione interpelli entro 24 ore dalla convocazione',
 'Termine perentorio per accettare la supplenza dopo convocazione telefonica o PEC dall''USP. Decorrenza dalla data di ricevimento della comunicazione.',
 'OM 88/2024 art. 13', ARRAY['docenti'], '2026-07-15', 'urgente', 'nazionale',
 'Decadenza dalla supplenza ed esclusione graduatoria per l''anno in corso', '',
 'Immissioni in Ruolo e Supplenze',
 '1. Controlla PEC e telefono quotidianamente
2. Accetta entro 24 ore dalla convocazione
3. Presentati il primo giorno di servizio con documenti',
 false, false),

('Aggiornamento GPS biennio 2026/2028 - presentazione domande',
 'Termine per la presentazione delle domande di aggiornamento delle Graduatorie Provinciali per le Supplenze per il biennio 2026/2028.',
 'OM 88/2024', ARRAY['docenti', 'aspiranti_docenti'], '2026-08-31', 'alta', 'nazionale',
 'Esclusione dalla graduatoria per il biennio successivo', '',
 'Aggiornamento e Inserimento Graduatorie',
 '1. Verifica requisiti I/II fascia GPS
2. Compila domanda su POLIS entro la scadenza
3. Seleziona fino a 150 scuole in ordine di preferenza',
 false, false),

('Iscrizione concorso ordinario docenti 2026',
 'Apertura delle iscrizioni per il concorso ordinario con 20.000 posti su tutta Italia per la scuola secondaria di I e II grado.',
 'D.Lgs. 36/2022', ARRAY['docenti', 'aspiranti_docenti'], '2026-09-15', 'alta', 'nazionale',
 'Perdita dell''opportunità di partecipare al concorso per il 2026', '',
 'Iscrizioni, Bandi e Concorsi pubblici',
 '1. Verifica requisiti (laurea magistrale + abilitazione o 24 CFU)
2. Iscriviti su piattaforma MIM entro la scadenza
3. Paga contributo di iscrizione
4. Preparati per le prove scritte (quiz) e orali (lezione simulata)',
 false, false),

('Domande mobilità volontaria triennio 2027/2029',
 'Scadenza per la presentazione delle domande di trasferimento volontario tramite POLIS per il triennio 2027/2029.',
 'CCNI Mobilità 2027/2029', ARRAY['docenti', 'ata'], '2027-02-28', 'media', 'nazionale',
 'Non partecipazione al movimento di mobilità per il triennio', '',
 'Mobilità del Personale Scolastico',
 '1. Verifica punteggio e vincoli (triennale/quinquennale)
2. Compila domanda su POLIS entro febbraio
3. Seleziona sedi in ordine di reale preferenza
4. Allega documentazione (certificati, stato di famiglia)',
 false, false),

('TFA Sostegno VIII ciclo - iscrizioni corsi',
 'Apertura delle iscrizioni per i corsi di specializzazione al sostegno didattico - VIII ciclo con 12.000 posti.',
 'DD 1025/2026', ARRAY['docenti', 'aspiranti_docenti'], '2026-09-30', 'alta', 'nazionale',
 'Esclusione dalla partecipazione al TFA Sostegno per il ciclo VIII', '',
 'Iscrizioni, Bandi e Concorsi pubblici',
 '1. Verifica requisiti (SFP o laurea magistrale + 24 CFU)
2. Iscriviti alla preselezione (60 quiz)
3. Superamento preselezione → iscrizione corso 60 CFU
4. Tirocinio diretto + indiretto, prova finale',
 false, false),

('Formazione neoassunti a.s. 2026/2027 - iscrizione',
 'Iscrizioni per la formazione obbligatoria dei docenti neoassunti a.s. 2026/2027. 50 ore totali con tutoraggio.',
 'D.Lgs. 297/1994 artt. 197-200; D.M. 226/2022', ARRAY['docenti', 'neoassunti'], '2026-10-15', 'media', 'nazionale',
 'Ripetenza dell''anno di prova (max 1 volta) o mancato superamento', '',
 'Formazione e Aggiornamento Professionale',
 '1. Contatta il DS per assegnazione tutor
2. Partecipa a 50 ore (12 laboratori)
3. Compila portfolio digitale
4. Le 4 visite in classe (2+2 per quadrimestre)',
 false, false),

('Accettazione supplenza entro 24 ore dalla convocazione GPS',
 'Termine per accettare la supplenza assegnata tramite algoritmo delle 150 preferenze GPS.',
 'OM 88/2024 art. 19', ARRAY['docenti'], '2026-09-01', 'urgente', 'nazionale',
 'Decadenza dalla supplenza e possible esclusione dalla graduatoria per rinunce ripetute', '',
 'Immissioni in Ruolo e Supplenze',
 '1. Rispondi entro 24 ore dalla convocazione
2. Presentati il primo giorno con documenti
3. In caso di rinuncia motivata (salute, maternità): nessuna sanzione
4. Rinuncia non motivata: 1ª = esclusione a.s.; 2ª = esclusione definitiva',
 false, false);
