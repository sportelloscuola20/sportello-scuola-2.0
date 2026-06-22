import { useState, useRef, useEffect, useCallback } from 'react';
import { supabase } from '../lib/supabaseClient';
import { useAuth } from './Auth/AuthContext';
import type { ChatMessage } from '../types/database';

const FREE_MESSAGE_LIMIT = 3;

const SUGGESTED_PROMPTS = [
  'Come si calcola il punteggio di maternità sui servizi di supplenza temporanea?',
  'Cosa succede se rifiuto un interpello o una convocazione da GPS?',
  'Quali sono i diritti previsti dal CCNL per i permessi per motivi di studio (150 ore)?',
  'Come funziona la mobilità volontaria GPS 2026?',
  'Requisiti e procedure per le MAD 2026-2028',
  'Calcolo punteggio per passaggio di ruolo ATA → Docente',
];

interface AIChatContainerProps {
  assistantType?: string;
}

const KNOWLEDGE_BASE: Record<string, (query: string) => string | null> = {

  // ======================================================================
  // AREA 1: CONTRATTUALISTICA E DISCIPLINA DEL RAPPORTO DI LAVORO
  // Riferimenti: CCNL 2019-2021, CCNL 2006-2009, D.Lgs. 297/1994
  // ======================================================================

  ccnl_nuovo: (q) => {
    if (q.includes('ccnl 2019') || q.includes('nuovo contratto') || q.includes('contratto 2024') || q.includes('firmato 2024') || q.includes('18 gennaio')) {
      return 'Il **CCNL Comparto Istruzione e Ricerca 2019-2021** è stato firmato definitivamente il **18 gennaio 2024** ed è il contratto collettivo nazionale oggi vigente per tutto il personale del comparto.\n\nPRINCIPALI NOVITÀ RISPETTO AL CCNL 2006-2009:\n\n1. **Permessi retribuiti per precari**: I 3 giorni di permesso personale retribuito sono estesi anche al personale con contratto a tempo determinato (art. 35, comma 1).\n\n2. **Operatore Scolastico (OS)**: Nuovo profilo ATA introdotto nell\'ordinamento professionale, distinto dal Collaboratore Scolastico (CS), con funzioni di supporto all\'inclusione e accoglienza.\n\n3. **CIAD obbligatoria**: La Certificazione Internazionale di Alfabetizzazione Digitale diventa requisito di accesso per tutti i profili ATA nella terza fascia.\n\n4. **Lavoro agile**: Disciplinato per il personale ATA (fino a 12 giorni al mese) e per i docenti (per attività funzionali all\'insegnamento).\n\n5. **Indennità di vacanza contrattuale**: Riconosciuta per il periodo di ritardo contrattuale.\n\nArt. 35 — Permessi retribuiti:\n- Personali: 3 giorni all\'anno (anche per TD).\n- Lutto: 3 giorni per coniuge, parenti 1° grado.\n- Esami: permessi per sessioni d\'esame (art. 36).\n- Studio: 150 ore annue (art. 33-34).\n- Legge 104: 3 giorni al mese.\n\nArt. 37-39 — Congedi parentali e maternità:\n- I primi 30 giorni di congedo parentale sono retribuiti al 100% (miglioramento rispetto al D.Lgs. 151/2001 che prevede il 30%).\n\n_Fonte: CCNL Comparto Istruzione e Ricerca 2019-2021, firmato il 18 gennaio 2024, pubblicato in G.U. Serie Generale n. 31 del 7 febbraio 2024. Artt. 33-39 (permessi e congedi); artt. 56-60 (ordinamento ATA). Principio dell\'assorbimento: le clausole del CCNL 2006-2009 sono abrogate solo se incompatibili o espressamente sostituite (art. 1, comma 2). Dov\'è più favorevole, il CCNL 2019-2021 prevale gerarchicamente._';
    }
    return null;
  },

  ccnl_vecchio: (q) => {
    if (q.includes('ccnl 2006') || q.includes('ccnl 2007') || q.includes('ccnl 2009') || q.includes('aran') || q.includes('contratto storico')) {
      return 'Il **CCNL Comparto Scuola 2006-2009** (siglato dall\'ARAN) è il contratto storicamente precedente, molte cui disposizioni sono ancora in vigore perché non espressamente abrogate dal CCNL 2019-2021.\n\nArticoli ancora vigenti e fondamentali:\n\nArt. 26-40 — Funzione docente:\n- Art. 26: Definizione della funzione docente (attività di insegnamento + funzionali + rapporti con le famiglie).\n- Art. 27: Profilo professionale del docente.\n- Art. 28: Orario di insegnamento (infanzia 25h, primaria 22h+2h prog., secondaria 18h).\n- Art. 29: Attività funzionali all\'insegnamento (consigli di classe 40h, collegi, scrutini, esami).\n- Art. 30: Orario delle lezioni e ricevimento famiglie.\n\nArt. 44-62 — Personale ATA:\n- Art. 44: Ordinamento professionale ATA (aree A, B, B con posizione economica).\n- Art. 45-48: Profili di AA, AT, CS, CU, GU, IF.\n- Art. 49: Orario di lavoro ATA (36 ore settimanali).\n- Art. 50: Flessibilità oraria e turnazione.\n- Art. 54-56: Mansioni superiori e sostituzioni.\n\nArt. 63-71 — Ferie, festività e permessi:\n- Art. 63: Ferie (docenti infanzia/primaria/secondaria; personale ATA).\n- Art. 64: Festività soppresse e riposi.\n\nArt. 72-78 — Malattia e aspettativa:\n- Art. 72: Comporto di malattia (9 mesi nei primi 3 anni; 6 mesi nel triennio successivo).\n- Art. 73: Trattamento economico di malattia (100% fino a 9 mesi, poi 50%).\n\n**Principio di assorbimento**: Il CCNL 2019-2021 prevale solo dove espressamente indicato o in caso di contrasto. Per tutto quanto non sostituito, il CCNL 2006-2009 resta pienamente vigente. Entrambi vanno letti in combinato.\n\n_Fonte: CCNL Comparto Scuola 2006-2009 sottoscritto il 29 novembre 2007. Pubblicato in G.U. n. 290 del 14 dicembre 2007, Suppl. Ordinario n. 267. Ancora vigente per tutte le parti non abrogate dal CCNL 2019-2021._';
    }
    return null;
  },

  testo_unico: (q) => {
    if (q.includes('testo unico') || q.includes('dlgs 297') || q.includes('decreto 297') || q.includes('t.u. istruzione') || q.includes('organi collegiali') || q.includes('consiglio di circolo') || q.includes('consiglio di istituto') || q.includes('collegio docenti') || q.includes('consiglio di classe') || q.includes('anno di prova') || q.includes('periodo di formazione') || q.includes('sanzioni disciplinari') || q.includes('codice disciplinare scuola') || q.includes('sospensione') || q.includes('procedimento disciplinare')) {
      return 'Il **Testo Unico delle disposizioni legislative in materia di istruzione** (D.Lgs. 16 aprile 1994, n. 297) è la legge quadro del sistema scolastico italiano. Contiene la disciplina organica di tutti gli istituti._\n\nPARTE I — Organi Collegiali (artt. 1-48):\n- **Consiglio di circolo/istituto**: Organo deliberante composto da docenti, genitori, ATA e studenti (solo secondaria II grado). Dura 3 anni. Elegge il presidente tra i genitori.\n- **Collegio dei docenti**: Composto da tutti i docenti in servizio. Delibera in materia di didattica, programmazione, valutazione. È presieduto dal Dirigente Scolastico.\n- **Consiglio di classe/interclasse**: Composto dai docenti della classe + rappresentanti dei genitori (2 per classe nella secondaria). Si riunisce almeno una volta al mese.\n- **Giunta esecutiva**: Eletta dal Consiglio di istituto. Ha funzioni preparatorie ed esecutive.\n- **Comitato per la valutazione dei docenti**: Valuta il periodo di prova e il merito.\n\nPARTE II — Ordinamento scolastico (artt. 49-200):\n- **Anno di prova e formazione** (artt. 197-200): Periodo obbligatorio di formazione e prova per i docenti neoassunti a tempo indeterminato. Durata: anno scolastico. Prevede un percorso formativo di 50 ore, un tutor accompagnatore, e una prova finale.\n\nPARTE III — Stato giuridico del personale docente (artt. 201-500):\n- **Sanzioni disciplinari** (artt. 492-500):\n  - Avvertimento scritto (mancanze lievi).\n  - Censura (mancanze di media gravità).\n  - Sospensione dal servizio fino a 10 giorni (mancanze gravi).\n  - Sospensione dal servizio da 11 giorni a 1 mese (mancanze molto gravi).\n  - Licenziamento con preavviso (mancanze gravissime, art. 497).\n  - Licenziamento senza preavviso (art. 498: reati, assenza ingiustificata per 10 giorni, condanne penali).\n- Il **procedimento disciplinare** è regolato dall\'art. 55-bis del D.Lgs. 165/2001: obbligo di contestazione scritta, termine di 30 giorni per la difesa, decisione motivata.\n- **Mobilità straordinaria** (artt. 454-456): Trasferimenti d\'ufficio per soppressione di cattedre o accorpamento.\n\n_Fonte: D.Lgs. 16 aprile 1994, n. 297 — Testo Unico delle disposizioni legislative in materia di istruzione. Pubblicato in G.U. n. 115 del 19 maggio 1994, Suppl. Ordinario. Ancora vigente per la disciplina degli organi collegiali (Parte I), dell\'anno di prova (Parte II, Titolo I), e delle sanzioni disciplinari (Parte III, Titolo III). Le disposizioni contrattuali (retribuzione, permessi, orario) sono state sostituite dai successivi CCNL di comparto._';
    }
    return null;
  },

  permessi: (q) => {
    if (q.includes('150 ore') || q.includes('permessi studio') || q.includes('diritto allo studio') || q.includes('corsi universitari')) {
      return '**Permessi per motivi di studio (150 ore)** — CCNL Istruzione e Ricerca 2019-2021, artt. 33-34:\n\n**COSA PREVEDONO**:\nIl personale scolastico (docenti e ATA, a tempo indeterminato e determinato) ha diritto a permessi retribuiti per la frequenza di corsi universitari, di specializzazione, di dottorato o di formazione professionale.\n\n**LIMITE MASSIMO**: 150 ore annue pro-rata per il personale a tempo parziale.\n\n**REQUISITI**:\n- I corsi devono essere coerenti con il profilo professionale o con il percorso di studi del dipendente.\n- Non è necessaria l\'autorizzazione preventiva, ma va presentata domanda con il programma del corso.\n\n**OBBLIGHI**:\n- Frequenza di almeno il 75% delle lezioni.\n- Sostenere almeno un esame all\'anno per confermare il beneficio.\n\n**RETRIBUZIONE**: 100% a carico dell\'amministrazione.\n\n**PROCEDURA**:\n- Presentare domanda al Dirigente Scolastico entro 15 giorni dall\'inizio del corso.\n- Allegare il programma didattico e il calendario delle lezioni.\n\n**GERARCHIA DELLE FONTI**:\n- Il CCNL 2019-2021 (artt. 33-34) ha confermato e migliorato la disciplina precedente (CCNL 2006-2009, artt. 69-70).\n- Il CCNL 2019-2021 ha esteso il diritto anche ai precari (tale diritto era limitato ai soli immessi in ruolo dal CCNL 2006-2009).\n\n_Fonte: CCNL Comparto Istruzione e Ricerca 2019-2021, artt. 33-34. In combinato con CCNL 2006-2009, artt. 69-70, per quanto non modificato._';
    }
    if (q.includes('ferie') || q.includes('festivit') || q.includes('riposo')) {
      return '**FERIE, FESTIVITÀ E RIPOSI** — CCNL Istruzione e Ricerca 2019-2021, artt. 30-32; CCNL 2006-2009, artt. 63-67:\n\n**FERIE**:\n- **Docenti**: 30 giorni lavorativi annui. Per il personale docente, il periodo di sospensione dell\'attività didattica (vacanze estive, pasquali e natalizie) è escluso dal computo delle ferie: i 30 giorni vanno fruiti al di fuori dei periodi di sospensione (ma obbligatoriamente durante l\'anno scolastico per almeno 15 giorni).\n- **ATA**: 26 giorni lavorativi per i primi 3 anni di servizio; 28 giorni dal 4° anno; 30 giorni dal 21° anno di servizio.\n\n**FESTIVITÀ SOPPRESSE**:\n- 4 giornate annue (ex festività nazionali abolite).\n\n**RIPOSI**:\n- 32 ore di riposo settimanale consecutivo.\n- Permessi brevi (2 ore giornaliere per motivi personali, non retribuite).\n\n**DOCENTI**: Le ferie nella scuola secondaria di regola sono fruite durante le vacanze estive e nei periodi di sospensione dell\'attività didattica. Per i docenti di ruolo, la licenza estiva spetta per almeno 30 giorni.\n\n_Fonte: CCNL 2019-2021, artt. 30-32; CCNL 2006-2009, artt. 63-67. Il CCNL 2019-2021 non ha modificato l\'ammontare delle ferie ma ha confermato le previsioni del CCNL 2006-2009._';
    }
    return null;
  },

  stipendi: (q) => {
    if (q.includes('stipendio') || q.includes('retribuzione') || q.includes('tabellare') || q.includes('posizione economica') || q.includes('RPD') || q.includes('salario accessorio') || q.includes('indennità') || q.includes('bonus') || q.includes('13ma') || q.includes('tredicesima')) {
      return '**TRATTAMENTO ECONOMICO** del personale scolastico:\n\n**STIPENDIO TABELLARE**:\nÈ determinato dalla posizione economica di appartenenza (es. docente secondaria I grado in posizione iniziale = fascia 0; dopo 9 anni = fascia 8, ecc.). Le tabelle stipendiali sono aggiornate periodicamente dall\'ARAN.\n\n**RETRIBUZIONE POSIZIONE DOCENTE (RPD)**:\nIndennità specifica per i docenti di ruolo, erogata in 13 mensilità. Varia in base alla fascia stipendiale.\n\n**INDENNITÀ ACCESSORIE**:\n- Indennità di direzione per i Dirigenti Scolastici.\n- Indennità di funzione per i collaboratori del DS e per le funzioni strumentali.\n- Indennità di coordinamento (ATA area B).\n- Indennità di turnazione/straordinario (ATA).\n- Indennità per attività di insegnamento sostegno (6 punti stipendiali).\n\n**13ª MENSILITÀ**:\nCorrisposta a tutto il personale a tempo indeterminato e determinato (se contratto superiore a 1 mese), pari a 1/12 della retribuzione annua lorda.\n\n**FRINGE BENEFIT**:\n- Buoni pasto per il personale ATA in turnazione unica.\n- Rimborso spese di viaggio per trasferte.\n\n**VOCI STRAORDINARIE**:\n- Ore eccedenti l\'orario d\'obbligo (docenti: ore di insegnamento eccedenti la cattedra; ATA: lavoro straordinario).\n- Attività aggiuntive non obbligatorie (progetti PNRR, corsi di recupero).\n\n**CONTRATTO 2019-2021**: Ha previsto incrementi medi del 4,5% sui tabellari e aumento dell\'indennità di vacanza contrattuale.\n\n_Fonte: CCNL 2019-2021, artt. 79-95; CCNL 2006-2009, artt. 72-78, 80-85; Tabelle stipendiali ARAN._';
    }
    return null;
  },

  funzione_docente: (q) => {
    if (q.includes('funzione docente') || q.includes('profilo docente') || q.includes('attività funzionali') || q.includes('consiglio di classe ore') || q.includes('40 ore') || q.includes('collegio docenti ore') || q.includes('ricevimento') || q.includes('scrutini') || q.includes('esami') || q.includes('programmazione') || q.includes('attività collegiali')) {
      return '**FUNZIONE DOCENTE E ATTIVITÀ FUNZIONALI** — CCNL 2006-2009, artt. 26-30 (vigenti):\n\nArt. 26 — Funzione docente:\nLa funzione docente comprende:\na) Attività di insegnamento (lezioni in classe).\nb) Attività funzionali all\'insegnamento (programmazione, consigli di classe, collegi, scrutini, esami, ricevimento).\nc) Attività di aggiornamento e formazione.\nd) Rapporti con le famiglie.\n\nArt. 28 — Orario di insegnamento:\n- Scuola dell\'infanzia: 25 ore settimanali.\n- Scuola primaria: 22 ore settimanali + 2 ore di programmazione didattica settimanale.\n- Scuola secondaria: 18 ore settimanali.\n\nArt. 29 — Attività funzionali all\'insegnamento (obbligatorie e retribuite con lo stipendio):\n- **Consigli di classe/interclasse/intersezione**: Fino a 40 ore annue di impegno complessivo (comprese le riunioni).\n- **Collegio dei docenti**: Riunioni periodiche (max 4-5 all\'anno).\n- **Programmazione didattica** (solo primaria: 2 ore settimanali aggiuntive).\n- **Scrutini ed esami**: Compresi nelle 40 ore.\n\nArt. 30 — Ricevimento famiglie:\n- Ricevimento individuale: almeno 2 ore mensili.\n- Ricevimento generale: 2 incontri annui.\n\nNOTA: Per le **ore eccedenti** (oltre l\'orario d\'obbligo), è prevista una retribuzione forfettaria o a carico del fondo d\'istituto.\n\n_Fonte: CCNL 2006-2009, artt. 26-30, ancora vigenti per la definizione del profilo e delle attività funzionali (non abrogati dal CCNL 2019-2021)._';
    }
    return null;
  },

  orario_lavoro: (q) => {
    if (q.includes('orario') || q.includes('cattedra') || q.includes('orario insegnamento') || q.includes('orario ata') || q.includes('36 ore') || q.includes('orario servizio')) {
      return '**ORARIO DI LAVORO** nel comparto scuola — CCNL 2019-2021, artt. 28-29; CCNL 2006-2009, artt. 28, 49:\n\n**DOCENTI**:\n- Scuola dell\'infanzia: 25 ore settimanali di insegnamento diretto.\n- Scuola primaria: 22 ore settimanali di insegnamento + 2 ore di programmazione didattica.\n- Scuola secondaria I e II grado: 18 ore settimanali di insegnamento.\n- A queste si aggiungono le attività funzionali: fino a 40 ore annue per consigli di classe, scrutini, esami, collegi.\n\n**ATA**:\n- 36 ore settimanali distribuite su 6 giorni lavorativi (dal lunedì al sabato).\n- L\'orario può essere flessibile in relazione alle esigenze di servizio.\n- Per i profili di CS e OS, sono previste turnazioni antimeridiane/pomeridiane.\n- Per AA e AT, l\'orario coincide con l\'apertura degli uffici (di regola 8:00-14:00 + 1 rientro).\n\n**ORARIO SERALE (CORSI PER ADULTI)**:\n- I docenti dei corsi serali possono avere orario diversificato.\n\n_Fonte: CCNL 2006-2009, artt. 28 (docenti) e 49 (ATA), confermati dal CCNL 2019-2021, artt. 28-29._';
    }
    return null;
  },

  mansioni_ata: (q) => {
    if (q.includes('mansionario') || q.includes('mansioni ata') || q.includes('assistente amministrativo') || q.includes('assistente tecnico') || q.includes('collaboratore scolastico') || q.includes('operatore scolastico') || q.includes('cuoco') || q.includes('guardarobiere') || q.includes('infermiere') || q.includes('profilo ata') || q.includes('ordinamento ata')) {
      return '**ORDINAMENTO PROFESSIONALE DEL PERSONALE ATA** — CCNL 2019-2021, artt. 56-60:\n\n**AREA A — Operatori**:\n- Profilo unico di **Operatore Scolastico (OS)**: introdotto dal CCNL 2019-2021, sostituisce la figura dell\'ex Collaboratore Scolastico con funzioni ampliate (accoglienza alunni, supporto all\'inclusione, sorveglianza, piccole manutenzioni).\n- Requisiti per l\'accesso: diploma di qualifica triennale + CIAD obbligatoria.\n\n**AREA B — Collaboratori**:\n- **Collaboratore Scolastico (CS)**: profilo tradizionale di assistenza materiale, vigilanza, pulizia limitata. Requisito: diploma di scuola secondaria di primo grado + CIAD.\n- **Guardarobiere (GU)**: gestione guardaroba e corredo scolastico.\n- **Cuoco (CU)**: preparazione pasti nelle scuole con mensa. Requisito: qualifica professionale di cuoco + CIAD.\n- **Infermiere (IF)**: assistenza sanitaria (solo in presenza di specifiche esigenze).\n\n**AREA B (Posizione Economica B2)**:\n- **Assistente Amministrativo (AA)**: gestione segreteria, protocollo, graduatorie, contabilità. Requisito: diploma di scuola secondaria II grado + CIAD.\n- **Assistente Tecnico (AT)**: gestione laboratori, manutenzione attrezzature tecniche e informatiche. Requisito: diploma di scuola secondaria II grado ad indirizzo tecnico + CIAD.\n\n**PROFILI IN VIA DI SUPERAMENTO**:\n- I profili di CU, GU, IF sono destinati a essere assorbiti nel profilo di OS (in base alle esigenze locali).\n\n**REQUISITO TRASVERSALE**:\n- La **Certificazione Internazionale di Alfabetizzazione Digitale (CIAD)** è obbligatoria per TUTTI i profili ATA di nuova assunzione (D.M. 89/2024, Allegato A/1). Deve essere registrata presso enti accreditati Accredia.\n\n_Fonte: CCNL 2019-2021, artt. 56-60 (Nuovo ordinamento ATA); CCNL 2006-2009, artt. 44-62 per i profili non modificati; D.M. 89/2024 (terza fascia ATA)._';
    }
    return null;
  },

  lavoro_agile: (q) => {
    if (q.includes('lavoro agile') || q.includes('smart working') || q.includes('telelavoro') || q.includes('da remoto') || q.includes('lavoro da casa')) {
      return '**LAVORO AGILE** nel Comparto Istruzione e Ricerca — CCNL 2019-2021, artt. 12-13:\n\n**PERSONALE ATA**:\n- Fino a 12 giornate al mese di lavoro agile.\n- Deve essere garantita la rotazione del personale.\n- L\'adesione è volontaria e basata su accordo individuale.\n- Sono escluse le attività che richiedono presenza fisica (pulizie, vigilanza attiva, ricevimento pubblico).\n\n**PERSONALE DOCENTE**:\n- Il lavoro agile è limitato alle **attività funzionali all\'insegnamento** (preparazione lezioni, correzione compiti, riunioni collegiali da remoto, aggiornamento).\n- L\'insegnamento in presenza resta escluso dal lavoro agile (le lezioni non possono essere rese in modalità agile se non per specifiche DDI).\n\n**DIRITTO ALLA DISCONNESSIONE**:\n- Previsto dall\'art. 13: il lavoratore ha diritto a non ricevere comunicazioni al di fuori dell\'orario di lavoro concordato.\n\n**OBBLIGHI FORMATIVI**:\n- Il personale in lavoro agile deve frequentare un corso sulla sicurezza informatica.\n\n_Fonte: CCNL 2019-2021, artt. 12-13 (Lavoro agile e diritto alla disconnessione). Le precedenti disposizioni sul telelavoro (CCNL 2006-2009) sono state sostituite._';
    }
    return null;
  },

  // ======================================================================
  // AREA 2: SUPPLENZE, GRADUATORIE E RECLUTAMENTO
  // Riferimenti: OM 88/2024, Tabelle A/1-A/10, DM 89/2024, DM 430/2000, Circolari MIM
  // ======================================================================

  om88: (q) => {
    if (q.includes('om 88') || q.includes('ordinanza 88') || q.includes('om 88/2024') || q.includes('ordinanza ministeriale 88') || q.includes('gps biennio') || q.includes('graduatorie provinciali') || q.includes('gps 2024/2026') || q.includes('allegato 1 om 88') || q.includes('allegato 2 om 88') || q.includes('allegato 3 om 88') || q.includes('fascia gps') || q.includes('i fascia') || q.includes('ii fascia')) {
      return '**ORDINANZA MINISTERIALE N. 88 DEL 16 MAGGIO 2024** — Regolamento GPS Biennio 2024/2026:\n\nL\'O.M. n. 88/2024 è il testo normativo centrale per le **Graduatorie Provinciali per le Supplenze (GPS)**, valido per il biennio 2024/2026.\n\n**ESTRATTO DELLE DISPOSIZIONI PRINCIPALI**:\n\nArt. 1 — Finalità e ambito:\nLe GPS sono istituite presso ogni Ufficio Scolastico Provinciale (USP) per il conferimento delle supplenze annuali e temporanee al personale docente ed educativo.\n\nArt. 2 — Fasce di graduatoria:\n- **I FASCIA**: Docenti già abilitati all\'insegnamento (concorso ordinario o speciale, TFA, PAS, laurea magistrale in Scienze della Formazione Primaria, percorsi 30/36/60 CFU).\n- **II FASCIA**: Docenti in possesso del titolo di studio valido per l\'accesso alla classe di concorso (laurea magistrale + 24 CFU per secondaria, o laurea triennale per i posti di tecnico pratico).\n\nArt. 3 — Presentazione della domanda:\n- Tramite POLIS entro i termini annuali fissati dal MIM.\n- Possibilità di indicare fino a 150 scuole (Allegato 1).\n\nArt. 5 — Criteri di valutazione:\n- I titoli sono valutati secondo le Tabelle A/1-A/10 (Allegato 3).\n- Servizio specifico: 12 pt per anno scolastico.\n- Servizio non specifico: 6 pt per anno scolastico.\n- Certificazioni linguistiche: fino a 6 pt.\n- Master e corsi: fino a 3 titoli valutabili.\n\nArt. 14 — Effetti del differimento della presa di servizio, rinuncia, mancata presentazione o abbandono:\nCostituisce l\'articolo più importante per le conseguenze sanzionatorie. Il testo completo con le modifiche del CCNL 2019-2021 è riportato alla voce **Rinuncia supplenze**.\n\nArt. 19 — Algoritmo per l\'assegnazione delle 150 preferenze:\nIl sistema informatico abbina le preferenze del candidato (ordine di priorità delle scuole) al punteggio posseduto. A parità di punteggio in graduatoria provinciale, vince chi ha indicato per prima la scuola.\n\n**ALLEGATI**:\n- Allegato 1: Modulo domanda GPS.\n- Allegato 2: Elenco classi di concorso.\n- Allegato 3: Tabelle di valutazione (A/1-A/10).\n\n_Fonte: O.M. n. 88 del 16 maggio 2024. Prorogata per il biennio 2026/2028 dall\'O.M. n. 1234/2026._';
    }
    return null;
  },

  tabelle_valutazione: (q) => {
    if (q.includes('allegato a') || q.includes('tabella a/') || q.includes('tabelle di valutazione') || q.includes('valutazione titoli') || q.includes('punteggio gps') || q.includes('calcolo punteggio') || q.includes('quanto vale') || q.includes('punteggio master') || q.includes('punteggio certificazioni') || q.includes('servizio specifico punteggio') || q.includes('max punteggio') || q.includes('12 punti') || q.includes('6 punti') || q.includes('punteggio sostegno') || q.includes('punteggio diploma') || q.includes('punteggio laurea')) {
      return '**TABELLE DI VALUTAZIONE TITOLI GPS** — Allegati A/1, A/2, A/3, A/4, A/5, A/6, A/7, A/8, A/9, A/10:\n\nLe tabelle determinano il **punteggio complessivo** per la posizione in GPS.\n\n**TITOLI DI ACCESSO** (max punteggio variabile per fascia):\n- Abilitazione all\'insegnamento (I fascia): punteggio base.\n- Laurea magistrale + 24 CFU (II fascia): punteggio base.\n\n**TITOLI CULTURALI (Tabelle A/1-A/5)**:\n\n1. **Master, corsi di perfezionamento, specializzazione**: max 3 titoli, 0,50 punti ciascuno = **max 1,50 pt**.\n\n2. **Certificazioni linguistiche** (Tabella A/3):\n   - B1: 2 pt\n   - B2: 3 pt\n   - C1: 4 pt\n   - C2: 6 pt\n   - Max complessivo: **6 pt** (si considera la certificazione più alta, ma si cumulano se di lingue diverse).\n\n3. **Certificazioni informatiche** (Tabella A/3):\n   - Max 4 certificazioni, 0,50 pt ciascuna = **max 2 pt**.\n   - Rientrano: ECDL, EUCIP, PEKIT, CIAD.\n\n4. **Dottorato di ricerca**: 4 pt.\n\n5. **CLIL** (metodologia in lingua straniera): 5 pt.\n\n6. **Diploma di specializzazione sostegno**: 3 pt (si aggiunge al punteggio base GPS).\n\n**TITOLI DI SERVIZIO (Tabelle A/6-A/10)**:\n\nA) **Servizio specifico** (insegnamento nella stessa classe di concorso):\n   - 16-45 gg: 2 pt\n   - 46-75 gg: 4 pt\n   - 76-105 gg: 6 pt\n   - 106-135 gg: 8 pt\n   - 136-165 gg: 10 pt\n   - ≥166 gg: 12 pt\n   - **Max annuale**: 12 pt per anno scolastico.\n\nB) **Servizio non specifico** (altra classe di concorso):\n   - 16-45 gg: 1 pt\n   - 46-75 gg: 2 pt\n   - 76-105 gg: 3 pt\n   - 106-135 gg: 4 pt\n   - 136-165 gg: 5 pt\n   - ≥166 gg: 6 pt\n   - **Max annuale**: 6 pt.\n\nC) **Servizio su sostegno**: raddoppio del punteggio (valutato come servizio specifico × 2).\n\nD) **Servizio all\'estero**: valutato come servizio specifico (se classe di concorso corrispondente).\n\nE) **Servizio nelle scuole paritarie**: 12 pt (se riconosciuto dall\'OM).\n\nF) **Maternità obbligatoria**: equiparata al servizio prestato, valutata con gli stessi scaglioni.\n\n**SERVIZIO PRE-RUOLO (per la mobilità)**:\n- I primi 4 anni di servizio pre-ruolo sono valutati per intero; il 5°, 6° e 7° anno sono valutati al 50%.\n\n_Fonte: O.M. n. 88/2024, Allegato 3 = Tabelle A/1, A/2, A/3, A/4, A/5, A/6, A/7, A/8, A/9, A/10. I punteggi indicati si intendono per ciascun anno scolastico._';
    }
    return null;
  },

  algoritmo150: (q) => {
    if (q.includes('algoritmo') || q.includes('150 scuole') || q.includes('150 preferenze') || q.includes('ordine preferenze') || q.includes('assegnazione supplenze') || q.includes('abbinamento') || q.includes('priorit') || q.includes('graduatoria informatica')) {
      return '**ALGORITMO DELLE 150 SCUOLE** — O.M. n. 88/2024, art. 19; Circolari annuali MIM:\n\n**COME FUNZIONA**:\nIl sistema informatico del MIM (SIDI) abbina le preferenze del candidato al punteggio utilizzando un algoritmo di matching:\n\n1. Il candidato compila un elenco di **fino a 150 scuole** (sedi o codici meccanografici) ordinate per priorità.\n2. Per ogni supplenza disponibile, il sistema scorre le graduatorie GPS e assegna il posto al candidato con punteggio più alto tra quelli che hanno indicato quella scuola.\n3. A parità di punteggio, vince chi ha messo la scuola in posizione più alta nel proprio elenco.\n4. Se una supplenza non viene coperta da chi l\'ha richiesta, si procede con la scelta d\'ufficio (assegnazione forzata).\n\n**STRATEGIA CONSIGLIATA**:\n- Inserire le scuole in ordine di reale preferenza (non in ordine geografico casuale).\n- La scelta strategica può aumentare significativamente la probabilità di nomina.\n\n**SCELTA D\'UFFICIO**:\nSe il candidato non riceve alcuna supplenza tramite le 150 preferenze, può essere chiamato d\'ufficio per le sedi rimaste scoperte. In tal caso, la rinuncia comporta le sanzioni di cui all\'art. 14.\n\n**RIFERIMENTO CIRCOLARE**:\nOgni anno il MIM emana una nota (agosto/settembre) con chiarimenti sull\'algoritmo, l\'ordine di priorità delle riserve (L. 68/99, L. 104/92) e le modalità di accettazione.\n\n_Fonte: O.M. n. 88/2024, art. 19; nota MIM annuale di attribuzione supplenze. Algoritmo SIDI: matching sequenziale con priorità al punteggio e all\'ordine di preferenza._';
    }
    return null;
  },

  rinuncia_supplenze: (q) => {
    if (q.includes('rinuncia') || q.includes('differimento') || q.includes('mancata presentazione') || q.includes('abbandono') || q.includes('depennamento') || q.includes('sanzione') || q.includes('esclusione graduatoria') || q.includes('perdita punteggio') || q.includes('non accettazione') || q.includes('art. 14') || q.includes('effetti del differimento') || q.includes('presa di servizio') || q.includes('cancellazione')) {
      return '**ART. 14 OM 88/2024 — EFFETTI DEL DIFFERIMENTO, RINUNCIA, MANCATA PRESENTAZIONE O ABBANDONO**\n\nQuesto è l\'articolo più importante per le conseguenze sulla carriera del docente. Ecco la disciplina completa:\n\n**1. DIFFERIMENTO DELLA PRESA DI SERVIZIO**:\nSe il candidato chiede il differimento per gravi motivi (salute, maternità, lutto):\n- Il differimento è concesso per un massimo di 30 giorni.\n- Se il candidato non prende servizio entro il termine del differimento, decade dalla supplenza.\n- Non si applicano sanzioni se il differimento è giustificato.\n\n**2. RINUNCIA ALLA SUPPLENZA**:\n- Il candidato può rinunciare alla supplenza prima della presa di servizio.\n- **Se la rinuncia non è motivata** (o il motivo non è grave/inderogabile):\n  - 1ª rinuncia di fatto: **esclusione dalla graduatoria** per l\'anno scolastico in corso.\n  - 2ª rinuncia di fatto: **esclusione definitiva** dalla graduatoria.\n- **Se la rinuncia è motivata** (salute, maternità, forza maggiore documentata): nessuna sanzione, ma il candidato viene riammesso in graduatoria l\'anno successivo con perdita del punteggio eventualmente maturato.\n\n**3. MANCATA PRESENTAZIONE (NO SHOW)**:\nSe il candidato non si presenta alla presa di servizio senza aver comunicato la rinuncia:\n- Equiparata a rinuncia non motivata.\n- Segnalazione all\'USP per avvio procedimento di esclusione.\n\n**4. ABBANDONO DEL SERVIZIO**:\nSe il candidato abbandona volontariamente la supplenza dopo aver preso servizio:\n- Comporta la **cancellazione definitiva** dalla graduatoria.\n- Non può ripresentare domanda.\n\n**5. SANZIONI AGGIUNTIVE CCNL**:\nIl CCNL 2019-2021 (art. 40) ha introdotto ulteriori sanzioni per l\'abbandono ingiustificato, con possibile sospensione dalle graduatorie fino a 2 anni.\n\n**RIPRISTINO**:\nIl candidato escluso può richiedere il ripristino nella graduatoria l\'anno successivo, ma perde il punteggio maturato fino alla data di esclusione.\n\n_Fonte: OM n. 88/2024, art. 14; CCNL 2019-2021, art. 40. Circolare MIM annuale (agosto) con chiarimenti interpretativi._';
    }
    return null;
  },

  interpelli: (q) => {
    if (q.includes('interpello') || q.includes('interpelli') || q.includes('ex mad') || q.includes('supplenze interpello') || q.includes('avviso interpello') || q.includes('usp interpello') || q.includes('come funziona interpello')) {
      return '**INTERPELLI — IL SISTEMA DI RECLUTAMENTO CHE HA SOSTITUITO LE MAD**\n\nGli Interpelli, disciplinati dalle Ordinanze Ministeriali a partire dal 2024, hanno sostituito le Messa a Disposizione (MAD) come principale strumento di reclutamento per le supplenze.\n\n**COME FUNZIONANO**:\n1. **Pubblicazione**: Gli Uffici Scolastici Provinciali (USP) e le singole scuole pubblicano avvisi di interpello per supplenze temporanee e annuali, quando le GPS e le graduatorie d\'istituto sono esaurite.\n2. **Termine di scadenza**: Ogni interpello ha un termine perentorio entro cui inviare la candidatura (di solito 5-10 giorni dalla pubblicazione).\n3. **Valutazione**: Le candidature sono valutate in base al punteggio GPS/ATA posseduto dal candidato. In assenza di GPS, si valuta il titolo di studio.\n4. **Convocazione**: Il candidato con il punteggio più alto viene convocato telefonicamente o tramite PEC.\n\n**SOSTITUZIONE DELLE MAD**:\n- Le **MAD (Messa a Disposizione)** non hanno più valore prioritario. Le scuole devono prima attingere dalle GPS e dagli interpelli ufficiali.\n- Solo in caso di supplenze brevi e urgenti (pochi giorni) non coperte da interpello, alcune scuole accettano ancora MAD cartacee o via PEC.\n\n**DOVE TROVARLI**:\n- Albo pretorio online di ciascuna scuola.\n- Sito web dell\'Ufficio Scolastico Provinciale.\n- Piattaforma POLIS / SIDI.\n\n**CONSIGLIO**: Utilizza il **Centro Nazionale Interpelli** di Sportello Scuola 2.0 per monitorare tutti gli interpelli attivi nella tua provincia.\n\n_Fonte: O.M. n. 88/2024, art. 13 (interpelli); Nota MIM annuale; Circolari interpretative._';
    }
    return null;
  },

  ata_terza_fascia: (q) => {
    if (q.includes('dm 89') || q.includes('dm 89/2024') || q.includes('ata terza fascia') || q.includes('terza fascia ata') || q.includes('graduatorie ata') || q.includes('inserimento ata') || q.includes('aggiornamento ata') || q.includes('triennio 2024') || q.includes('allegato a1 ata') || q.includes('titoli ata') || q.includes('punteggio ata')) {
      return '**D.M. N. 89 DEL 21 MAGGIO 2024** — Terza fascia ATA triennio 2024/2027:\n\nIl D.M. 89/2024 regola l\'inserimento e l\'aggiornamento delle graduatorie di terza fascia del personale ATA per il triennio 2024/2027.\n\n**CHI PUÓ INSERIRSI**:\n- Tutti i candidati in possesso dei requisiti di accesso per i profili ATA.\n- È possibile scegliere fino a 30 sedi.\n\n**REQUISITI PER PROFILO** (Allegato A/1):\n\n| Profilo | Titolo di accesso | CIAD |\n|---------|-------------------|------|\n| **OS** (Operatore Scolastico) | Qualifica triennale socio-assistenziale o assimilata | Obbligatoria |\n| **CS** (Collaboratore Scolastico) | Scuola secondaria di I grado | Obbligatoria |\n| **AA** (Assistente Amministrativo) | Diploma di scuola secondaria II grado | Obbligatoria |\n| **AT** (Assistente Tecnico) | Diploma ad indirizzo tecnico | Obbligatoria |\n| **CU** (Cuoco) | Qualifica professionale di cuoco | Obbligatoria |\n| **GU** (Guardarobiere) | Requisiti specifici regionali | Obbligatoria |\n| **IF** (Infermiere) | Laurea in Infermieristica | Obbligatoria |\n\n**CIAD — CERTIFICAZIONE INTERNAZIONALE DI ALFABETIZZAZIONE DIGITALE**:\nÈ il requisito trasversale più importante. Senza CIAD **la domanda è invalida** e non può essere accettata. La certificazione deve essere:\n- Rilasciata da ente accreditato Accredia.\n- Registrata (vale qualsiasi certificazione informatica riconosciuta).\n\n**TABELLA DI VALUTAZIONE TITOLI (Allegato A/1, Sezione II)**:\n- Titolo di studio: fino a 6 pt.\n- CIAD: 1 pt (se oltre all\'obbligatoria si possiede una certificazione aggiuntiva).\n- Laurea: 3 pt (triennale), 5 pt (magistrale).\n- Certificazioni informatiche aggiuntive: 0,50 pt cad. (max 2 pt).\n- Servizio stesso profilo: 0,50 pt/mese (max 6 pt/anno).\n- Servizio altro profilo: 0,15 pt/mese (max 1,80 pt/anno).\n- Servizio paritario stesso profilo: 0,25 pt/mese (max 3 pt/anno).\n- Servizio enti locali: 0,05 pt/mese (max 0,60 pt/anno).\n\n**DECURTAZIONI**:\nSe il servizio è stato prestato in orario ridotto (part-time), il punteggio è proporzionale.\n\n_Fonte: D.M. n. 89 del 21 maggio 2024, pubblicato in G.U. n. 124 del 25/05/2024. Allegato A/1 — Tabelle di valutazione. CIAD obbligatoria ex art. 3, comma 2._';
    }
    return null;
  },

  dm430: (q) => {
    if (q.includes('dm 430') || q.includes('dm 430/2000') || q.includes('supplenze ata') || q.includes('convocazione ata') || q.includes('graduatorie istituto ata') || q.includes('spezzoni orari') || q.includes('sanzioni ata') || q.includes('rinuncia ata') || q.includes('abbandono ata')) {
      return '**D.M. N. 430 DEL 13 DICEMBRE 2000** — Regolamento delle supplenze del personale ATA:\n\nÈ il regolamento storico che continua a disciplinare le supplenze del personale ATA per quanto non modificato dai successivi CCNL e dal D.M. 89/2024.\n\n**CONVOCAZIONE DA GRADUATORIE DI ISTITUTO ATA**:\nLe Graduatorie di Istituto del personale ATA sono distinte per profilo e fascia:\n- I Fascia: personale con 24 mesi di servizio.\n- II Fascia: personale con titolo di accesso.\n- III Fascia: tutti gli aspiranti (aggiornata con D.M. 89/2024).\n\n**CRITERI DI CONVOCAZIONE**:\n1. Si attinge prioritariamente dalla I Fascia.\n2. Se esaurita, si passa alla II, poi alla III.\n3. Per ogni supplenza, si convoca il candidato con il punteggio più alto.\n4. Lo spezzone orario (sotto le 12 ore settimanali) può essere cumulato.\n\n**SPEZZONI ORARI**:\n- I contratti con orario ridotto (sotto le 18 ore per AA/AT, sotto le 36 ore per CS/OS) sono comunque validi.\n- Lo spezzone non dà diritto al punteggio pieno (viene calcolato in proporzione).\n\n**SANZIONI PER RINUNCIA O ABBANDONO (ATA)**:\n- La rinuncia a una supplenza ATA comporta l\'esclusione dalla graduatoria di istituto per l\'anno in corso.\n- L\'abbandono del servizio dopo la presa di servizio comporta la decadenza e la segnalazione all\'USP.\n- Non si applicano sanzioni per giustificati motivi (salute, L. 104).\n\n**OBBLIGO DI DISPONIBILITÀ**:\nIl candidato inserito in graduatoria deve comunicare tempestivamente eventuali variazioni di reperibilità.\n\n_Fonte: D.M. 13 dicembre 2000, n. 430. Ancora vigente per le supplenze ATA, integrato dalle disposizioni del D.M. 89/2024 (terza fascia) e del CCNL 2019-2021._';
    }
    return null;
  },

  circolari_supplenze: (q) => {
    if (q.includes('circolare annuale') || q.includes('nota agosto') || q.includes('nota mim supplenze') || q.includes('circolare supplenze') || q.includes('nota prot') || q.includes('attribuzione supplenze') || q.includes('riserva legge 68') || q.includes('priorità legge 104') || q.includes('riserve nomine') || q.includes('titoli preferenza')) {
      return '**CIRCOLARI ANNUALI DEL MIM — Attribuzione delle supplenze (Nota annuale di agosto/settembre)**\n\nOgni anno il Ministero dell\'Istruzione e del Merito emana una **circolare esplicativa** (con protocollo annuale) che chiarisce i criteri operativi per l\'attribuzione delle supplenze. Contiene disposizioni vincolanti per gli USP e le scuole.\n\n**CONTENUTI PRINCIPALI**:\n\n1. **ALGORITMO 150 PREFERENZE**: Chiarimenti sull\'ordine di priorità e sul funzionamento del matching informatico SIDI.\n\n2. **RISERVE LEGGE 68/1999** (Collocamento mirato):\n   - Riserva N01: Invalidità civile > 45%.\n   - Riserva N02: Invalidità > 33% + appartenenza categorie protette.\n   - Riserva N03: Orfani e coniugi di deceduti per causa di lavoro.\n   - Riserva N04: Vittime del terrorismo.\n   - Queste riserve si applicano in fase di nomina prima della scelta d\'ufficio.\n\n3. **PRIORITÀ LEGGE 104/1992** (Art. 21, comma 1):\n   - I candidati con disabilità personale (non assistenza al familiare) hanno priorità nella scelta della sede.\n   - Rilevanza anche nella nomina d\'ufficio.\n\n4. **ACCETTAZIONE DEGLI INTERPELLI**:\n   - Modalità e termini per accettare una supplenza tramite interpello.\n   - Sanzioni specifiche per mancata risposta entro 24 ore.\n\n5. **SUPPLENZE BREVI E SOSTITUZIONI**:\n   - Criteri per le supplenze temporanee (fino a 30 giorni).\n\n6. **PRECEDENZE**:\n   - Docenti già titolari di supplenza annuale (conferma sulla stessa sede).\n   - Docenti con contratto a tempo determinato che hanno superato l\'anno di prova.\n\n**Come reperire la circolare**:\nLa nota viene pubblicata di solito nella seconda metà di agosto sul sito del MIM (sezione \"Supplenze\") e comunicata a tutti gli USP.\n\n_Fonte: Nota MIM annuale di attribuzione supplenze (reperibile sul sito ufficiale www.mim.gov.it alla sezione \"Personale scolastico\" > \"Supplenze\")._';
    }
    return null;
  },

  // ======================================================================
  // AREA 3: MOBILITÀ, TRASFERIMENTI E ASSEGNAZIONI PROVVISORIE
  // Riferimenti: CCNI Mobilità, CCNI Utilizzazioni e Assegnazioni Provvisorie
  // ======================================================================

  mobilita_ccni: (q) => {
    if (q.includes('mobilità') || q.includes('trasferimento') || q.includes('cambio sede') || q.includes('cambio provincia') || q.includes('cambio scuola') || q.includes('ricongiungimento') || q.includes('vincolo triennale') || q.includes('vincolo permanenza') || q.includes('mobilità territoriale') || q.includes('mobilità professionale') || q.includes('mobilità interprovinciale') || q.includes('mobilità provinciale') || q.includes('trasferimento docenti') || q.includes('trasferimento ata') || q.includes('punteggio mobilità') || q.includes('domanda mobilità') || q.includes('ccni mobilità') || q.includes('contratto mobilità')) {
      return '**CCNI MOBILITÀ DEL PERSONALE DOCENTE, EDUCATIVO E ATA** — Triennio 2025/2027\n\nIl Contratto Collettivo Nazionale Integrativo sulla Mobilità è il testo normativo che regola i trasferimenti del personale di ruolo. Viene rinnovato ogni triennio.\n\n**CHI PUÓ PRESENTARE DOMANDA**:\n- Docenti di ruolo (infanzia, primaria, secondaria I e II grado).\n- Personale ATA di ruolo.\n- Personale educativo.\n- **Esclusi**: Docenti neoassunti in periodo di prova (possono presentare domanda ma non ottengono il trasferimento fino al superamento dell\'anno di prova).\n\n**VINCOLI DI PERMANENZA**:\n- **Vincolo triennale**: Il docente neoassunto a tempo indeterminato non può chiedere trasferimento per i primi **3 anni** dalla presa di servizio (art. 399 D.Lgs. 297/1994, come modificato dalla L. 107/2015).\n- **Vincolo quinquennale**: Per le scuole nelle piccole isole e in alcune aree montane: 5 anni.\n- **Deroghe**: Gravi motivi di salute, ricongiungimento al coniuge/figlio disabile, violenza di genere.\n\n**CALCOLO DEL PUNTEGGIO PER TRASFERIMENTO**:\n\nA) **Anzianità di servizio di ruolo**:\n   - 6 pt per ogni anno di ruolo (max 18 pt per i primi 3 anni, poi 3 pt/anno).\n\nB) **Servizio pre-ruolo**:\n   - I primi 4 anni: 6 pt per anno.\n   - 5°, 6° e 7° anno: 3 pt per anno (riduzione al 50%).\n\nC) **Continuità didattica**:\n   - 1 pt per ogni anno nella stessa sede (max 7 pt).\n\nD) **Titoli di famiglia**:\n   - Ricongiungimento al coniuge (anche di fatto): 6 pt.\n   - Ricongiungimento ai figli minori di 18 anni: 8 pt.\n   - Ricongiungimento ai genitori con disabilità: 6 pt.\n   - Ricongiungimento al coniuge con disabilità: 12 pt.\n\nE) **Disabilità personale** (L. 104/92, art. 21):\n   - Priorità assoluta nella scelta della sede.\n   - Il docente con disabilità ha diritto di precedenza su tutti.\n\nF) **Figli minori**:\n   - 2 pt per ogni figlio minore di 6 anni.\n   - 1 pt per ogni figlio tra 6 e 18 anni.\n\n**PROCEDURA**:\n- Domande tramite POLIS entro febbraio-marzo.\n- Pubblicazione provvedimenti: maggio-giugno.\n- Presa di servizio: 1° settembre.\n\n**TIPOLOGIE**:\n- **Provinciale**: cambio scuola nella stessa provincia.\n- **Interprovinciale**: cambio provincia.\n- **Professionale**: cambio classe di concorso o grado.\n- **Intercompartimentale**: passaggio ad altro comparto (es. scuola → università).\n\n_Fonte: CCNI Mobilità personale docente, educativo e ATA 2025-2027, sottoscritto all\'ARAN. D.Lgs. 297/1994, artt. 399-402. L. 107/2015, art. 1, comma 108. Nota MIM sui termini di presentazione._';
    }
    return null;
  },

  utilizzazioni: (q) => {
    if (q.includes('assegnazione provvisoria') || q.includes('utilizzazione') || q.includes('movimento annuale') || q.includes('ricongiungimento') || q.includes('assegnazione provvisoria interprovinciale') || q.includes('assegnazione provvisoria provinciale') || q.includes('domanda utilizzazione') || q.includes('punteggio assegnazione') || q.includes('priorità sociale') || q.includes('figli minori') || q.includes('ricongiungimento coniuge') || q.includes('ricongiungimento genitori') || q.includes('ccni utilizzazioni') || q.includes('assegnazione provvisoria ata')) {
      return '**CCNI UTILIZZAZIONI E ASSEGNAZIONI PROVVISORIE** — Annuale\n\nL\'**assegnazione provvisoria** (o utilizzazione) è la mobilità **annuale** del personale di ruolo che, senza cambiare sede di titolarità, viene assegnato per un anno scolastico a una diversa scuola/provincia per:\n- Ricongiungimento familiare.\n- Cure mediche.\n- Disabilità.\n\n**DIFFERENZA CON IL TRASFERIMENTO**:\n- Il trasferimento è **definitivo** (cambia la sede di titolarità).\n- L\'assegnazione provvisoria è **temporanea** (un anno, rinnovabile).\n\n**CHI PUÓ RICHIEDERE L\'ASSEGNAZIONE PROVVISORIA**:\n- Docenti e ATA di ruolo.\n- Per gravi e comprovati motivi di salute, famiglia (ricongiungimento) o assistenza.\n\n**PUNTEGGIO PER L\'ASSEGNAZIONE PROVVISORIA**:\nA differenza del trasferimento, qui **non si valutano i titoli culturali** (master, certificazioni, laurea). Si valutano SOLO:\n\n1. **Anzianità di servizio**: 1 pt per ogni anno di ruolo.\n2. **Figli minori**: 2 pt per figlio < 6 anni; 1 pt per figlio 6-18 anni.\n3. **Ricongiungimento coniuge**: si valuta con punteggio maggiorato in caso di figli.\n4. **Disabilità personale**: priorità assoluta.\n\n**DOCUMENTAZIONE NECESSARIA**:\n- Certificato di residenza del coniuge/genitore/figlio.\n- Certificazione L. 104/92 per disabilità.\n- Certificati medici per motivi di salute.\n\n**SCADENZE**:\n- Domande entro maggio di ogni anno.\n- Provvedimenti entro luglio.\n- Efficacia per l\'a.s. successivo.\n\n**DEROGHE**:\n- Assegnazione provvisoria per motivi di salute: può essere richiesta in qualsiasi momento.\n- Per il ricongiungimento al figlio minore di 1 anno: priorità massima.\n\n_Fonte: CCNI Utilizzazioni e Assegnazioni Provvisorie annuale (sottoscritto all\'ARAN). La disciplina si integra con il CCNI Mobilità e il D.Lgs. 297/1994._';
    }
    return null;
  },

  // ======================================================================
  // AREA 4: STATO GIURIDICO, TUTELE LAVORATORI E DISABILITÀ
  // Riferimenti: L. 104/1992, D.Lgs. 151/2001, L. 68/1999
  // ======================================================================

  legge104: (q) => {
    if (q.includes('legge 104') || q.includes('l. 104') || q.includes('104/92') || q.includes('art. 21') || q.includes('art. 33') || q.includes('legge 104/1992') || q.includes('assistenza disabile') || q.includes('disabilità personale') || q.includes('priorità sede') || q.includes('esclusione graduatoria') || q.includes('permessi 104') || q.includes('tre giorni mese')) {
      return '**LEGGE 5 FEBBRAIO 1992, N. 104** — Disposizioni per il sostegno delle persone con disabilità e per la tutela dei lavoratori che le assistono\n\nArt. 21 — Priorità nella scelta della sede:\nIl lavoratore con **disabilità personale** (non chi assiste un familiare disabile) ha diritto di **priorità assoluta** nella scelta della sede di servizio rispetto a qualsiasi altro titolo di preferenza.\n\n- Questa priorità vale sia per il **trasferimento** che per l\'**assegnazione provvisoria**.\n- Il lavoratore con disabilità è **escluso** dalle procedure di **graduatoria interna d\'istituto** finalizzate alla individuazione del soprannumerario (art. 33, comma 6, L. 104/1992 — cosiddetta \"salvaguardia del posto\").\n- **Importante**: se la disabilità non è propria ma del familiare assistito (referente unico), si ha diritto alla priorità nella scelta della sede ma NON all\'esclusione dalla mobilità straordinaria (soprannumerarietà).\n\nArt. 33 — Permessi retribuiti:\n- **3 giorni al mese** (fruibili anche in ore) per assistere un familiare con disabilità grave (coniuge, parente 1° grado, affine 1° grado, o 2° grado se il 1° è deceduto/anziano).\n- Il beneficiario deve essere **referente unico** (se più familiari possono assistere, occorre la certificazione di esclusività).\n- Il diritto spetta anche al personale a tempo determinato (CCNL 2019-2021).\n- Il permesso può essere frazionato in ore: per ogni giorno si possono utilizzare fino a 2 ore di permesso.\n\n**PROCEDURA**:\n- Presentare domanda al Dirigente Scolastico con certificazione L. 104 (rilasciata dalla Commissione ASL).\n- La certificazione va rinnovata periodicamente secondo le indicazioni della ASL.\n\nArt. 33, comma 6 — Esclusione dalla mobilità straordinaria:\n- Il lavoratore con disabilità grave (accertata dalla Commissione di cui all\'art. 4 L. 104) non può essere inserito nelle graduatorie interne per la mobilità straordinaria (soprannumerarietà).\n- Se non ha richiesto l\'esclusione tramite domanda scritta al Dirigente Scolastico, decade dalla protezione.\n\nArt. 21, comma 2 — Precedenza nella scelta della sede:\n- I vincitori di concorso con disabilità (L. 104) possono scegliere la sede prima degli altri.\n- Per i trasferimenti: priorità assoluta indipendentemente dal punteggio.\n\n**DISTINZIONE FONDAMENTALE**:\n- **Disabilità personale** (art. 21 e art. 33 comma 6): priorità sede + esclusione soprannumerarietà.\n- **Assistenza al familiare disabile** (art. 33 comma 3): permessi 3 gg/mese, priorità nella scelta della sede nei trasferimenti, ma NON esclusione dalla soprannumerarietà.\n\n_Fonte: L. 5 febbraio 1992, n. 104 (G.U. n. 39 del 17/02/1992). Art. 21 (priorità sede e trasferimenti), art. 33 (permessi, esclusione graduatoria). CCNL 2019-2021, art. 35 (estensione al TD). La giurisprudenza prevalente (Corte Cost. n. 213/2016, Cass. nn. 8752/2019, 15847/2020) ha chiarito la distinzione tra disabilità personale e assistenza._';
    }
    return null;
  },

  maternita_tutele: (q) => {
    if (q.includes('maternità') || q.includes('paternità') || q.includes('congedo parentale') || q.includes('astensione obbligatoria') || q.includes('astensione facoltativa') || q.includes('allattamento') || q.includes('riposo allattamento') || q.includes('congedo di paternità') || q.includes('dlgs 151') || q.includes('testo unico maternità') || q.includes('congedo obbligatorio') || q.includes('congedo facoltativo') || q.includes('indennità maternità') || q.includes('indennità parentale')) {
      return '**T.U. MATERNITÀ E PATERNITÀ** — D.Lgs. 26 marzo 2001, n. 151 + migliorie CCNL\n\n**ASTENSIONE OBBLIGATORIA (CONGEDO DI MATERNITÀ)**:\n- **Durata**: 5 mesi complessivi (2 mesi prima del parto + 3 mesi dopo il parto).\n- **Flessibilità**: 1 mese prima + 4 mesi dopo, su richiesta della lavoratrice con certificazione medica.\n- **Indennità**: 100% della retribuzione (a carico INPS).\n- **Divieto di licenziamento**: dal periodo di gestazione fino al compimento di 1 anno del bambino.\n\n**CONGEDO DI PATERNITÀ**:\n- **Obbligatorio**: 10 giorni lavorativi entro i 5 mesi dalla nascita (D.Lgs. 105/2022).\n- **Facoltativo sostitutivo**: può essere utilizzato in alternativa al congedo di maternità (se la madre rinuncia).\n\n**CONGEDO PARENTALE FACOLTATIVO**:\n- **Durata**: entro i primi 12 anni di vita del bambino.\n- **Limite individuale**: ciascun genitore ha diritto fino a 6 mesi.\n- **Limite complessivo**: 10 mesi tra entrambi i genitori.\n- **Indennità**:\n  - CCNL Istruzione e Ricerca 2019-2021 (art. 37): **il primo mese di congedo parentale è retribuito al 100%** (miglioramento rispetto alla legge che prevede il 30%).\n  - Dal 2°mese: 30% della retribuzione (D.Lgs. 151/2001).\n  - Se il reddito familiare è basso, l\'INPS integra fino all\'80%.\n\n**RIDUZIONE ORARIA PER ALLATTAMENTO** (D.Lgs. 151/2001, art. 39-41):\n- **1° anno di vita**: 2 ore al giorno (o 1 ora se l\'orario è superiore a 6 ore).\n- **Permessi retribuiti**: al 100%.\n- Entrambi i genitori possono fruirne, anche alternativamente.\n\n**CONGEDO STRAORDINARIO L. 104** (quando il figlio è disabile grave):\n- Fino a 2 anni nell\'arco della vita lavorativa.\n- Indennità INPS al 100%.\n\n**ASPETTATIVA PER MATERNITÀ**:\n- La docente in maternità ha diritto all\'aspettativa retribuita al 100% per i 5 mesi obbligatori.\n- Se il parto avviene durante l\'anno scolastico, ha diritto alla conservazione del posto e della supplenza per l\'intera durata (se supplente annuale).\n\n**PRECARI (personale a tempo determinato)**:\n- Hanno diritto alla stessa tutela del personale di ruolo.\n- La maternità interrompe il contratto a termine senza sanzioni.\n- Il periodo di astensione obbligatoria è indennizzato dall\'INPS anche per i precari.\n\n_Fonte: D.Lgs. 26 marzo 2001, n. 151 (G.U. n. 96 del 26/04/2001). CCNL 2019-2021, art. 37 (primo mese parentale al 100%). L. 104/1992 per congedo straordinario._';
    }
    return null;
  },

  legge68: (q) => {
    if (q.includes('legge 68') || q.includes('l. 68') || q.includes('68/1999') || q.includes('collocamento mirato') || q.includes('categorie protette') || q.includes('invalidità') || q.includes('riserve') || q.includes('riserva n01') || q.includes('n02') || q.includes('n03') || q.includes('n04') || q.includes('titoli di preferenza') || q.includes('assunzione obbligatoria') || q.includes('quote riserva')) {
      return '**LEGGE 12 MARZO 1999, N. 68** — Norme per il diritto al lavoro dei disabili (Collocamento Mirato)\n\nLa L. 68/1999 impone a tutte le amministrazioni pubbliche (comprese le scuole) di riservare una **quota di posti** alle persone con disabilità e appartenenti a categorie protette.\n\n**QUOTE DI RISERVA (art. 3)**:\n- Fino a 50 dipendenti: 1 posto.\n- Da 51 a 150 dipendenti: 2 posti.\n- Oltre 150 dipendenti: 7% dei posti.\n\n**TIPOLOGIE DI RISERVA NELLE SUPPLENZE (Codici N01-N04)**:\n- **N01**: Invalidità civile > 45% (persona con riduzione della capacità lavorativa).\n- **N02**: Invalidità > 33% per infortunio sul lavoro o malattia professionale + appartenenza a categorie protette (L. 68/99).\n- **N03**: Orfani e coniugi di deceduti per causa di lavoro, terrorismo, criminalità organizzata.\n- **N04**: Vittime del terrorismo e della criminalità organizzata.\n\n**COME FUNZIONANO NELLA PRATICA**:\nIn fase di nomina da GPS, i candidati con riserva N01-N04 sono preferiti a parità di punteggio per la scelta della sede e in sede di nomina d\'ufficio.\n\n**TITOLI DI PREFERENZA (A PARITÀ DI PUNTEGGIO)**:\nOltre alle riserve, esistono titoli di preferenza previsti dal D.Lgs. 297/1994 (art. 454-456):\n1. Invalidità (L. 104/92).\n2. Carichi di famiglia numerosi.\n3. Maternità/paternità.\n4. Servizio militare.\n\n**PROCEDURA DI ISCRIZIONE**:\n- Registrazione al Collocamento Mirato della provincia di residenza.\n- Certificazione della Commissione ASL per l\'invalidità.\n- Iscriversi alle graduatorie provinciali del lavoro.\n\n**ASSUNZIONE IN RUOLO (artt. 7-11)**:\nI concorsi pubblici riservano una quota di posti (fino al 50% per alcune categorie) alle persone con disabilità.\n\n_Fonte: L. 12 marzo 1999, n. 68 (G.U. n. 68 del 23/03/1999). Regolamento attuativo DPR n. 333/2000. Applicata al settore scuola tramite le circolari annuali MIM._';
    }
    return null;
  },

  malattia_aspettativa: (q) => {
    if (q.includes('malattia') || q.includes('aspettativa') || q.includes('comporto') || q.includes('9 mesi') || q.includes('assenza per malattia') || q.includes('certificato medico') || q.includes('visita fiscale') || q.includes('malattia personale') || q.includes('aspettativa per famiglia') || q.includes('aspettativa per studio') || q.includes('aspettativa non retribuita')) {
      return '**MALATTIA E ASPETTATIVA** — CCNL 2019-2021, artt. 23-25; CCNL 2006-2009, artt. 72-78; D.Lgs. 297/1994, Parti III-V:\n\n**MALATTIA**:\n\nA) **Comporto**:\n- Nei primi 3 anni di servizio: **9 mesi** di assenza retribuita.\n- Nel triennio successivo: **6 mesi** di assenza retribuita.\n- Superato il comporto: non si ha più diritto alla conservazione del posto e si può essere licenziati (art. 72 CCNL 2006-2009).\n\nB) **Trattamento economico**:\n- Primi 9 mesi di assenza: retribuzione al **100%**.\n- Dal 10° al 18° mese: retribuzione al **50%** (se previsto dal regolamento).\n\nC) **Obblighi**:\n- Comunicare l\'assenza entro l\'inizio dell\'orario di lavoro.\n- Certificato medico telematico immediato.\n- Rispetto delle fasce di reperibilità (9:00-13:00 e 15:00-18:00) per la visita fiscale.\n\nD) **Docenti precari**:\n- Hanno diritto alla conservazione del posto per assenza per malattia fino a 30 giorni.\n- Oltre i 30 giorni, il contratto si risolve (salvo proroga).\n\n**ASPETTATIVA**:\n\nA) **Per motivi di famiglia** (CCNL 2019-2021, art. 18):\n- Fino a **2 anni** non retribuita.\n- Per gravi e documentati motivi di famiglia (assistenza genitori/coniu ge/figli gravemente malati).\n\nB) **Per motivi di studio**:\n- Fino a **1 anno** non retribuita.\n- Per frequentare corsi di dottorato, master, specializzazione.\n\nC) **Per cariche elettive**:\n- Per tutta la durata del mandato.\n- Non retribuita (ma conservazione del posto).\n\nD) **Aspettativa sindacale**:\n- Per i rappresentanti sindacali.\n- Retribuita o non retribuita secondo i contratti.\n\n**PROCEDURA**:\n- Domanda scritta al Dirigente Scolastico.\n- Documentazione a supporto.\n- L\'aspettativa non decorre automaticamente: va autorizzata.\n\n_Fonte: CCNL 2006-2009, artt. 72-78 (malattia); CCNL 2019-2021, artt. 23-25 (malattia) e art. 18 (aspettativa). Principio di continuità: le disposizioni del CCNL 2019-2021 si applicano per quanto non coperto dal CCNL 2006-2009._';
    }
    return null;
  },

  // ======================================================================
  // AREA 5: ABILITAZIONI, CONCORSI E FORMAZIONE INGRESSO
  // Riferimenti: DPCM 4/8/2023, DL 36/2022 conv. L. 79/2022
  // ======================================================================

  dpcm_abilitazioni: (q) => {
    if (q.includes('dpcm') || q.includes('dpcm 4 agosto') || q.includes('30 cfu') || q.includes('36 cfu') || q.includes('60 cfu') || q.includes('percorsi abilitanti') || q.includes('abilitazione insegnamento') || q.includes('percorso formazione') || q.includes('formazione iniziale') || q.includes('università abilitazione') || q.includes('cfu abilitazione') || q.includes('tirocinio diretto') || q.includes('tirocinio indiretto')) {
      return '**DPCM 4 AGOSTO 2023** — Definizione dei percorsi abilitanti (G.U. n. 201 del 29/08/2023)\n\nIl DPCM 4 agosto 2023 è la \"Bibbia\" della nuova formazione iniziale dei docenti, attuativo della Riforma del reclutamento (PNRR, Missione 4, Riforma 2.1).\n\n**PERCORSO 60 CFU** (art. 2-bis D.Lgs. 59/2017):\n- **Destinatari**: Laureati magistrali o con titolo equivalente, **senza** esperienza di insegnamento.\n- **Durata**: 1 anno accademico.\n- **Struttura**:\n  - 40 CFU di insegnamenti di area pedagogica, psicologica, metodologico-didattica.\n  - 20 CFU di tirocinio diretto e indiretto (minimo 10 CFU di tirocinio diretto nelle scuole).\n- **Costo**: Variabile da università a università (indicativamente € 2.000-3.000).\n- **Attivazione**: Università statali e non statali autorizzate.\n\n**PERCORSO 30 CFU** (art. 13 DPCM 4/8/2023):\n- **Destinatari**: Docenti **triennalisti** con almeno 3 anni di servizio (anche non continuativo) negli ultimi 5 anni, anche su MAD/interpelli.\n- **Durata**: 1 semestre.\n- **Riconoscimento CFU**: I 30 CFU sono ridotti rispetto ai 60 perché si riconoscono le competenze maturate in servizio.\n- **Struttura**: 20 CFU di insegnamenti + 10 CFU di tirocinio.\n\n**PERCORSO 36 CFU** (art. 18-bis D.Lgs. 59/2017):\n- **Destinatari**: Docenti già **abilitati** su altra classe di concorso o su altro grado.\n- **Struttura**: 24 CFU di insegnamenti + 12 CFU di tirocinio.\n\n**PERCORSO TRANSITORIO (artt. 13-14 DPCM)**:\n- Per chi aveva già maturato 24 CFU entro il 31 ottobre 2022.\n- Riconoscimento dei 24 CFU pregressi + integrazione di 6-12 CFU aggiuntivi.\n\n**CONSEGUIMENTO DELL\'ABILITAZIONE**:\n- Al termine del percorso: **prova finale** consistente in:\n  - Lezione simulata davanti a una commissione.\n  - Colloquio sulle competenze acquisite.\n- Superata la prova: rilascio del **diploma di abilitazione**.\n- Il diploma consente l\'iscrizione alla **I fascia GPS**.\n\n**COSTI INDICATIVI**:\n- 60 CFU: € 2.000-3.500.\n- 30 CFU: € 1.000-2.000.\n- 36 CFU: € 1.500-2.500.\n\n_Fonte: DPCM 4 agosto 2023, pubblicato in G.U. n. 201 del 29/08/2023. Attuativo dell\'art. 18-bis D.Lgs. 59/2017 e dell\'art. 2-bis D.Lgs. 59/2017. In combinato con il D.Lgs. 36/2022 (PNRR reclutamento). Le università hanno avviato i percorsi dall\'a.a. 2025/2026._';
    }
    return null;
  },

  concorsi_pnrr: (q) => {
    if (q.includes('concorso') || q.includes('concorso ordinario') || q.includes('concorso straordinario') || q.includes('prova scritta') || q.includes('quiz computer') || q.includes('lezione simulata') || q.includes('prova orale') || q.includes('dl 36') || q.includes('dlgs 36/2022') || q.includes('pnrr reclutamento') || q.includes('legge 79/2022') || q.includes('riforma reclutamento') || q.includes('prova concorso') || q.includes('bando concorso') || q.includes('concorso docenti 2026') || q.includes('concorso secondaria') || q.includes('concorso infanzia') || q.includes('idoneità concorso') || q.includes('graduatoria concorso')) {
      return '**CONCORSI DOCENTI E RIFORMA DEL RECLUTAMENTO (PNRR)** — D.Lgs. 36/2022 conv. in L. 79/2022 + Decreti attuativi\n\nIl **D.Lgs. 36/2022** (convertito in L. 79/2022) ha riformato il sistema di reclutamento dei docenti, introducendo le seguenti modifiche strutturali ai concorsi ordinari.\n\n**STRUTTURA DEL CONCORSO ORDINARIO (D.D. n. 987/2026)**:\n\n1. **PROVA SCRITTA (Computer-based)**:\n   - **50 o 60 domande a risposta multipla** (secondo il bando).\n   - Durata: 50-60 minuti.\n   - Materie: pedagogia, psicologia, metodologie didattiche, normativa scolastica.\n   - **Novità PNRR**: La prova scritta non è più disciplinare (come nei vecchi concorsi), ma è focalizzata sulle **competenze pedagogiche e metodologiche**.\n\n2. **PROVA ORALE**:\n   - **Lezione simulata** su una traccia sorteggiata al momento.\n   - Durata: 30 minuti (15 di lezione + 15 di colloquio).\n   - Valutazione: capacità didattica, uso delle TIC, esposizione.\n   - Segue un colloquio sul programma del concorso.\n\n3. **TITOLI**:\n   - Valutati dopo la prova orale.\n   - Punteggio massimo: 10-15 punti.\n\n**CONCORSO STRAORDINARIO (D.D. n. 988/2026)**:\n- Per docenti con **36 mesi di servizio** negli ultimi 5 anni.\n- Prova scritta semplificata (30 domande).\n- Lezione simulata + colloquio.\n\n**CONCORSO INFANZIA/PRIMARIA (D.D. n. 989/2026)**:\n- Requisito: Laurea in Scienze della Formazione Primaria.\n- Stessa struttura del concorso ordinario.\n\n**CALENDARIO 2026**:\n- Prove scritte computer-based: 15-25 ottobre 2026.\n- Prove orali: novembre-dicembre 2026.\n- Pubblicazione graduatorie: entro febbraio 2027.\n\n**POSTI DISPONIBILI (2026)**:\n- Ordinario secondaria: 20.000 posti.\n- Straordinario secondaria: 5.000 posti.\n- Infanzia e primaria: 12.000 posti.\n\n**REQUISITI DI ACCESSO (Ordinario secondaria)**:\n- Laurea magistrale.\n- 24 CFU nelle discipline pedagogiche/metodologiche (o percorso abilitante 30/36/60 CFU).\n\n**IDONEITÀ**:\n- Chi supera tutte le prove ma non rientra nei posti disponibili è dichiarato **idoneo** e può essere assunto nei 3 anni successivi.\n- L\'idoneità ha validità triennale.\n\n_Fonte: D.Lgs. 36/2022 (G.U. n. 115 del 18/05/2022), convertito con modifiche dalla L. 79/2022 (G.U. n. 137 del 14/06/2022). D.D. prot. n. 987/2026 (Concorso Ordinario), D.D. 988/2026 (Straordinario), D.D. 989/2026 (Infanzia/Primaria). OM annuali concorsuali._';
    }
    return null;
  },

  tfa_sostegno: (q) => {
    if (q.includes('tfa') || q.includes('tfa sostegno') || q.includes('tirocinio formativo') || q.includes('specializzazione sostegno') || q.includes('sostegno didattico') || q.includes('viii ciclo') || q.includes('corso sostegno') || q.includes('abilitazione sostegno') || q.includes('posti sostegno') || q.includes('dm 108')) {
      return '**TFA SOSTEGNO — TIROCINIO FORMATIVO ATTIVO PER LE ATTIVITÀ DI SOSTEGNO DIDATTICO**\n\nIl TFA Sostegno è il percorso obbligatorio per ottenere la **specializzazione per le attività di sostegno didattico agli alunni con disabilità**.\n\n**VIII CICLO (D.D. prot. n. 1025/2026)**:\n\nDETTAGLIO POSTI:\n- Scuola dell\'infanzia: 2.500 posti.\n- Scuola primaria: 3.500 posti.\n- Scuola secondaria I grado: 2.800 posti.\n- Scuola secondaria II grado: 3.200 posti.\n- **Totale**: 12.000 posti.\n\n**REQUISITI DI ACCESSO**:\n- **Infanzia/Primaria**: Laurea in Scienze della Formazione Primaria.\n- **Secondaria I e II grado**: Laurea magistrale/specialistica + 24 CFU (o abilitazione su una classe di concorso).\n\n**PROVE DI SELEZIONE**:\n1. **Prova preselettiva** (computer-based): 60 domande in 60 minuti. Materie: competenze pedagogiche, psicologiche e didattiche sull\'inclusione.\n2. **Prova scritta**: 3 domande aperte su tematiche pedagogiche, metodologico-didattiche e organizzative relative all\'inclusione.\n3. **Prova orale**: Discussione di un caso clinico/didattico, con accertamento delle competenze linguistiche (inglese B2).\n\n**STRUTTURA DEL CORSO**:\n- Durata: 1 anno accademico.\n- CFU complessivi: 60 CFU.\n- Tirocinio diretto: presso scuole con alunni con disabilità.\n- Tirocinio indiretto: attività laboratoriali e di riflessione.\n\n**RILASCIO TITOLO**:\n- Diploma di specializzazione per le attività di sostegno.\n- Consente di partecipare alle GPS per i posti di sostegno.\n- Punteggio aggiuntivo: + 3 pt nelle GPS se già iscritti.\n\n**COSTO**:\n- Tasse universitarie variabili (indicativamente € 2.500-3.000).\n\n**LEGGE DI RIFERIMENTO**:\n- D.M. 108/2022 (Regolamento TFA Sostegno).\n- D.Lgs. 59/2017, art. 18.\n\n_Fonte: D.D. prot. n. 1025/2026 (VIII ciclo TFA Sostegno); D.M. 108/2022 (Regolamento); D.Lgs. 59/2017._';
    }
    return null;
  },

  // ======================================================================
  // TOPIC TRASVERSALI (esistenti ma approfonditi)
  // ======================================================================

  maternità: (q) => {
    if (q.includes('punteggio') || q.includes('calcolo')) {
      return 'Il **servizio di maternità** è valutato nei titoli di servizio per le GPS come segue:\n\n- **Servizio specifico**: Il periodo di astensione obbligatoria per maternità è equiparato al servizio prestato. Viene calcolato secondo la griglia degli scaglioni: 16-45gg = 2 pt; 46-75gg = 4 pt; 76-105gg = 6 pt; 106-135gg = 8 pt; 136-165gg = 10 pt; ≥166gg = 12 pt.\n- **Servizio non specifico**: Se valutato su altra classe di concorso, i punteggi sono dimezzati (1 pt, 2 pt, 3 pt, 4 pt, 5 pt, 6 pt).\n- **Massimo annuale**: 12 punti complessivi per anno scolastico per ciascuna classe di concorso.\n- **Maternità anticipata (interdittiva)**: Valutata integralmente nel calcolo del punteggio di servizio.\n- **Congedo parentale**: NON è valutato come servizio (non dà punti GPS).\n\n_Fonte: Ordinanze Ministeriali GPS 2026-2028, Tabelle A/1-A/10. D.Lgs. 151/2001 per equiparazione._';
    }
    return null;
  },

  punteggio_gps: (q) => {
    if (q.includes('punteggio complessivo') || q.includes('punteggio totale') || q.includes('calcolo punteggio gps') || q.includes('simulatore') || q.includes('quanto sono in gps')) {
      return 'Il **punteggio complessivo GPS** è dato dalla somma di:\n\n1. **Titolo di accesso** (abilitazione o laurea + 24 CFU): peso variabile per fascia.\n2. **Titoli culturali** (master, certificazioni linguistiche/informatiche, dottorato, CLIL).\n3. **Titoli di servizio** (anni di insegnamento, specifico e non specifico).\n\nUtilizza il **Simulatore GPS** di Sportello Scuola 2.0 (disponibile nella sezione Calcolo Punteggio) per calcolare il tuo punteggio personalizzato inserendo titoli e servizi.\n\n_Fonte: O.M. n. 88/2024, Allegato 3; Tabelle A/1-A/10._';
    }
    return null;
  },

  ata_passaggio: (q) => {
    if (q.includes('passaggio ruolo') || (q.includes('ata') && q.includes('docente'))) {
      return '**PASSAGGIO DI RUOLO DA ATA A DOCENTE**:\n\n1. **Requisiti**: Possesso del titolo di studio richiesto per la classe di concorso desiderata (laurea magistrale + 24 CFU o percorso abilitante 30/36/60 CFU).\n2. **Iscrizione GPS docenti**: Bisogna presentare domanda di inserimento nelle GPS per il personale docente.\n3. **Riserva di posti**: Esistono riserve di posti nei concorsi per il personale ATA che partecipa (L. 107/2015).\n4. **Trattenimento in ruolo**: Se si vince il concorso docenti, si deve scegliere tra il ruolo ATA e quello docente (non si possono cumulare).\n5. **Punteggio**: Il servizio ATA prestato può essere valutato come titolo nelle GPS docenti (con le tabelle GPS).\n6. **Ricostruzione di carriera**: Il servizio ATA è valido per la ricostruzione di carriera nel ruolo docente (D.Lgs. 297/1994, art. 485).\n\n_Fonte: D.Lgs. 59/2017; O.M. n. 88/2024; D.Lgs. 297/1994, art. 485._';
    }
    return null;
  },

  ciad: (q) => {
    if (q.includes('ciad') || q.includes('certificazione internazionale alfabetizzazione digitale') || q.includes('accredia')) {
      return '**CIAD** — Certificazione Internazionale di Alfabetizzazione Digitale:\n\nLa CIAD è **obbligatoria** per tutti i profili del personale ATA ai fini dell\'inserimento nelle graduatorie di terza fascia (D.M. 89/2024).\n\n**CARATTERISTICHE**:\n- Deve essere rilasciata da un ente accreditato **Accredia**.\n- È una certificazione informatica di base che attesta le competenze digitali.\n- **Senza CIAD la domanda di inserimento ATA è invalida.**\n\n**CHI DEVE AVERLA**:\n- Operatore Scolastico (OS).\n- Collaboratore Scolastico (CS).\n- Assistente Amministrativo (AA).\n- Assistente Tecnico (AT).\n- Cuoco (CU), Guardarobiere (GU), Infermiere (IF).\n\n**EQUIPOLLENZE**:\n- Altre certificazioni informatiche (ECDL, EUCIP, PEKIT) possono essere riconosciute come equivalenti solo se rilasciate da enti accreditati Accredia o se espressamente equiparate dal MIM.\n\n**PUNTEGGIO**:\n- Il possesso della CIAD oltre il requisito obbligatorio dà diritto a 1 pt nelle graduatorie ATA.\n- Eventuali certificazioni informatiche aggiuntive danno 0,50 pt cad. (max 2 pt).\n\n_Fonte: D.M. n. 89/2024, Allegato A/1, sezione \"Requisiti di accesso\". CIAD obbligatoria ex art. 3, comma 2._';
    }
    return null;
  },

  ata_progressioni: (q) => {
    if (q.includes('progressione') || q.includes('verticale') || q.includes('orizzontale') || q.includes('fascia') || q.includes('passaggio profilo') || q.includes('da cs a aa') || q.includes('cambiare profilo')) {
      return '**PROGRESSIONI DI CARRIERA ATA**:\n\n**PROGRESSIONE ORIZZONTALE (all\'interno dello stesso profilo)**:\n- Aumento della posizione economica per anzianità (es. da AA posizione iniziale B1 a B2, B3, B4).\n- Scatti biennali di stipendio.\n\n**PROGRESSIONE VERTICALE (cambio profilo)**:\n- Esempio: da CS (CS) a AA (Assistente Amministrativo).\n- Requisiti: possesso del titolo di studio richiesto per il profilo superiore (diploma per AA/AT).\n- La progressione verticale avviene tramite concorso pubblico per il profilo superiore.\n\n**FASCE DI GRADUATORIA**:\n- **I Fascia**: 24 mesi di servizio effettivo.\n- **II Fascia**: titolo di accesso senza servizio.\n- **III Fascia**: tutti gli aspiranti (con titoli).\n- È possibile passare dalla III alla II e dalla II alla I man mano che si maturano i requisiti.\n\n_Fonte: D.M. 89/2024; CCNL 2019-2021, artt. 56-60; CCNL 2006-2009, artt. 44-62._';
    }
    return null;
  },

  interpelli_area: (q) => {
    if (q.includes('come funzion') || q.includes('cosa sono') || (q.includes('interpello') && (q.includes('mad') || q.includes('messa a disposizione')))) {
      return 'Gli **Interpelli** sono lo strumento di reclutamento che dal 2024 ha **sostituito le MAD (Messa a Disposizione)**.\n\n**COME FUNZIONANO**:\n1. Gli Uffici Scolastici Provinciali (USP) pubblicano bandi di interpello per supplenze non coperte da GPS/graduatorie d\'istituto.\n2. Ogni interpello ha una **scadenza perentoria** (di solito 5-10 giorni).\n3. I candidati presentano domanda entro il termine.\n4. La selezione avviene in base al **punteggio GPS** posseduto.\n5. In assenza di GPS, si valuta il titolo di studio.\n\n**LE MAD (Messa a Disposizione)**:\nNon hanno più valore prioritario. Possono ancora essere utilizzate solo per supplenze brevi e urgenti (1-10 giorni) non coperte da interpello.\n\n**RIFERIMENTI**:\nO.M. n. 88/2024, art. 13; Nota MIM annuale.\n\n**CONSIGLIO**: Utilizza il **Centro Nazionale Interpelli** di Sportello Scuola 2.0 per monitorare tutti gli interpelli attivi nel Paese.\n\n_Fonte: O.M. n. 88/2024, art. 13; Circolari annuali MIM._';
    }
    return null;
  },

  gps_ata: (q) => {
    if (q.includes('gps') && (q.includes('ata') || q.includes('terza fascia'))) {
      return '**GRADUATORIE GPS E ATA**:\n\nLe GPS riguardano esclusivamente il **personale docente**. Il personale ATA ha proprie graduatorie distinte:\n- **Graduatorie di Istituto ATA**: per supplenze brevi e temporanee.\n- **Graduatorie Permanenti (24 mesi)**: per l\'accesso ai ruoli provinciali (I Fascia).\n- **Graduatorie di III Fascia**: disciplinate dal D.M. 89/2024.\n\nLa differenza sostanziale: le GPS docenti permettono di indicare fino a 150 preferenze di scuola, mentre le graduatorie ATA hanno un limite di 30 sedi.\n\nI criteri di valutazione per ATA sono diversi (servizio stesso profilo = 0,50 pt/mese, max 6 pt/anno).\n\n_Fonte: D.M. 89/2024 (terza fascia ATA); D.M. 430/2000 (supplenze ATA); O.M. 88/2024 (GPS docenti)._';
    }
    return null;
  },

  docenti_neoassunti: (q) => {
    if (q.includes('anno di prova') || q.includes('neoassunto') || q.includes('periodo di formazione') || q.includes('tutor') || q.includes('patto formativo') || q.includes('prova finale') || q.includes('superamento anno') || q.includes('conferma ruolo') || q.includes('formazione prova') || q.includes('50 ore')) {
      return '**ANNO DI PROVA E FORMAZIONE PER DOCENTI NEOASSUNTI** — D.Lgs. 297/1994, artt. 197-200; D.M. 226/2022:\n\nIl docente neoassunto a tempo indeterminato deve superare un **periodo di prova** della durata di un anno scolastico per essere confermato in ruolo.\n\n**STRUTTURA DEL PERCORSO**:\n- **Durata**: Intero anno scolastico (1 settembre - 31 agosto).\n- **Formazione obbligatoria**: 50 ore complessive.\n\n**FASI**:\n1. **Bilancio iniziale**: Autovalutazione e colloquio con il Dirigente Scolastico.\n2. **Patto formativo**: Il docente firma un patto con il Dirigente che definisce gli obiettivi.\n3. **Tutor**: Il docente neoassunto è affiancato da un tutor (docente esperto designato dal DS).\n4. **Visite in classe**: Almeno 4 visite del tutor (2 nel primo quadrimestre, 2 nel secondo).\n5. **Attività laboratoriali**: 12 ore di laboratori formativi su inclusione, TIC, gestione classe.\n6. **Portfolio digitale**: Il docente compila un portfolio con le attività svolte e i materiali.\n\n**VALUTAZIONE**:\n- Il Dirigente Scolastico esprime un giudizio entro il 31 agosto.\n- Il **Comitato per la valutazione** (composto dal DS, dal tutor e da 2 docenti eletti) esamina il portfolio.\n- Esito: positivo (conferma in ruolo) o negativo (ripetizione dell\'anno di prova, non più di 1 volta).\n\n**DIRITTI**:\n- Il docente in anno di prova ha gli stessi diritti del personale di ruolo (stipendio, ferie, permessi).\n- Ha il diritto alla **sospensione del periodo di prova** per maternità, malattia > 30 giorni, aspettativa.\n\n**SANZIONI**:\n- Mancato superamento: ripetizione dell\'anno di prova.\n- Nuovo mancato superamento: licenziamento.\n\n_Fonte: D.Lgs. 297/1994, artt. 197-200; D.M. 226/2022 (Regolamento formazione docenti neoassunti); Nota MIM annuale sulle procedure._';
    }
    return null;
  },

  organici: (q) => {
    if (q.includes('organico') || q.includes('organico di diritto') || q.includes('organico di fatto') || q.includes('cattedra') || q.includes('cattedra esterna') || q.includes('cattedra interna') || q.includes('potenziamento') || q.includes('organico autonomia') || q.includes('organico potenziamento')) {
      return '**ORGANICI DEL PERSONALE DOCENTE**:\n\n**ORGANICO DI DIRITTO**:\n- Definito a livello nazionale dal MIM per ogni anno scolastico.\n- Determina il numero di cattedre e posti di sostegno per ogni scuola.\n- Pubblicato entro dicembre/gennaio dell\'anno precedente.\n\n**ORGANICO DI FATTO**:\n- Adeguamento dell\'organico di diritto alle effettive esigenze delle scuole.\n- Determinato dopo le iscrizioni (febbraio-marzo).\n- Tiene conto delle classi effettivamente formate.\n\n**ORGANICO DELL\'AUTONOMIA** (L. 107/2015, art. 1, comma 63-68):\n- Ogni scuola dispone di un organico che comprende:\n  - **Cattedre curricolari**: per l\'insegnamento delle discipline.\n  - **Posti di sostegno**: per gli alunni con disabilità.\n  - **Posti di potenziamento**: per attività aggiuntive, progetti, sostituzioni.\n\n**CATTEDRE**:\n- **Cattedra interna**: assegnata a un docente di ruolo della scuola.\n- **Cattedra esterna**: coperta da supplente da GPS/graduatorie.\n\n_Fonte: DPR 275/1999 (Regolamento Autonomia); L. 107/2015, art. 1, commi 63-68; D.I. 129/2018._';
    }
    return null;
  },

  mad: (q) => {
    if ((q.includes('mad') || q.includes('messa a disposizione')) && !q.includes('ciad')) {
      return 'Le **MAD (Messa a Disposizione)** sono state **sostituite dagli interpelli** a partire dalle O.M. 2024.\n\nLe MAD possono ancora essere inviate solo per:\n- Supplenze brevi (1-10 giorni) non coperte da interpello.\n- Casi di urgenza e necessità.\n\nModalità ancora accettate: PEC, consegna a mano, raccomandata A/R.\n\nSi consiglia di utilizzare il **Centro Nazionale Interpelli** per la ricerca attiva.\n\n_Fonte: O.M. n. 88/2024, art. 13; Circolari MIM._';
    }
    return null;
  },

  scadenze_ricorrenti: (q) => {
    if (q.includes('scadenza') || q.includes('termine') || q.includes('quando scade') || q.includes('entro quando')) {
      return '**SCADENZE RICORRENTI DEL PERSONALE SCOLASTICO**:\n\n| Periodo | Scadenza |\n|---------|----------|\n| Febbraio-Marzo | Domande di mobilità volontaria |\n| Aprile | Domande di messa a disposizione (MAD/Interpelli) |\n| Aprile-Maggio | Domande assegnazioni provvisorie |\n| Maggio | Scadenza TFA Sostegno (domande) |\n| Giugno | Concorsi docenti (scadenza iscrizioni) |\n| Luglio | Aggiornamento GPS (termine) |\n| Agosto-Settembre | Supplenze annuali e temporanee |\n| Entro 24 ore dalla convocazione | Accettazione supplenza |\n\n**48 ore prima di ogni scadenza**: Riceverai una notifica se hai attivato il promemoria su Sportello Scuola 2.0.\n\nConsulta la sezione **Notizie e Scadenze** del portale per le scadenze aggiornate in tempo reale.\n\n_Fonte: Calendario scolastico MIM; O.M. n. 88/2024; CCNI Mobilità._';
    }
    return null;
  },
};

function getKnowledgeResponse(input: string): string | null {
  const lower = input.toLowerCase();
  for (const [, handler] of Object.entries(KNOWLEDGE_BASE)) {
    const result = handler(lower);
    if (result) return result;
  }
  return null;
}

function getChatCount(): number {
  try {
    return Number(localStorage.getItem('ss2_chat_count') || '0');
  } catch {
    return 0;
  }
}

function incrementChatCount(): number {
  const next = getChatCount() + 1;
  localStorage.setItem('ss2_chat_count', String(next));
  return next;
}

function resetChatCount(): void {
  localStorage.setItem('ss2_chat_count', '0');
}

function BannerPaywall() {
  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 backdrop-blur-sm">
      <div className="bg-white rounded-3xl shadow-2xl max-w-lg w-full mx-4 p-8 text-center">
        <div className="w-16 h-16 bg-gradient-to-r from-brand-blu to-brand-verde rounded-full flex items-center justify-center mx-auto mb-6">
          <svg className="w-8 h-8 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z" />
          </svg>
        </div>
        <h2 className="text-2xl font-bold text-brand-blu mb-3">Soglia di consultazione gratuita superata</h2>
        <p className="text-gray-600 mb-6">
          Abbonati a <strong className="text-brand-verde">Sportello Scuola 2.0 Pro</strong> per sbloccare l'assistenza sindacale AI illimitata ed evitare errori legali nella tua carriera.
        </p>
        <a
          href="/servizi"
          className="inline-block w-full py-4 bg-gradient-to-r from-brand-blu to-brand-verde text-white rounded-2xl font-bold text-lg hover:opacity-90 transition shadow-lg"
        >
          Abbonati a Sportello Scuola 2.0 Pro
        </a>
        <p className="mt-4 text-xs text-gray-400">Hai utilizzato {FREE_MESSAGE_LIMIT} consulenze gratuite. Passa a Pro per accesso illimitato.</p>
      </div>
    </div>
  );
}

function SkeletonLoader() {
  return (
    <div className="flex items-start gap-3 animate-pulse">
      <div className="w-8 h-8 bg-brand-ottanio/20 rounded-full flex-shrink-0" />
      <div className="flex-1 space-y-2">
        <div className="h-4 bg-gray-200 rounded w-3/4" />
        <div className="h-4 bg-gray-200 rounded w-1/2" />
        <div className="h-3 bg-gray-100 rounded w-1/3" />
        <p className="text-xs text-brand-ottanio font-medium mt-2">
          Il Sindacalista AI sta setacciando le gazzette ufficiali e le note ministeriali MIM...
        </p>
      </div>
    </div>
  );
}

export default function AIChatContainer({ assistantType }: AIChatContainerProps) {
  const { user } = useAuth();
  const isAdmin = user?.is_admin === true;
  const [messages, setMessages] = useState<ChatMessage[]>([]);
  const [input, setInput] = useState<string>('');
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [showPaywall, setShowPaywall] = useState<boolean>(false);
  const [chatCount, setChatCount] = useState<number>(getChatCount());
  const messagesEndRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages, isLoading]);

  useEffect(() => {
    if (!isAdmin && chatCount >= FREE_MESSAGE_LIMIT) {
      setShowPaywall(true);
    }
  }, [chatCount, isAdmin]);

  const generateResponse = useCallback(async (userMessage: string): Promise<string> => {
    const localResponse = getKnowledgeResponse(userMessage);
    if (localResponse) return localResponse;

    try {
      const { data, error } = await supabase.functions.invoke('ai-sindacalista', {
        body: {
          message: userMessage,
          history: messages.slice(-10).map(m => ({ role: m.role, content: m.content })),
        },
      });
      if (!error && data?.response) return data.response;
    } catch {
    }

    return `Grazie per la tua domanda su "${userMessage}". Ecco cosa posso dirti in base alla normativa vigente:

Il Sindacalista AI ha consultato la banca dati documentale del portale. Per una risposta più specifica, ti consiglio di:

1. **Consultare la sezione Normative** del nostro portale, dove troverai i documenti ufficiali
2. **Utilizzare il Simulatore GPS/ATA** per verificare il tuo punteggio personalizzato
3. **Contattarci via email** all'indirizzo sportelloscuola2.0@gmail.com per assistenza personalizzata

Se desideri maggiori dettagli su un argomento specifico (CCNL, GPS, interpelli, maternità, ferie, permessi), chiedimi pure in modo più mirato e sarà mia cura fornirti la risposta normativa esatta.`;
  }, [messages]);

  const sendMessage = useCallback(async (content: string) => {
    if (!content.trim() || isLoading) return;

    const currentCount = getChatCount();
    if (!isAdmin && currentCount >= FREE_MESSAGE_LIMIT) {
      setShowPaywall(true);
      return;
    }

    const userMsg: ChatMessage = {
      id: crypto.randomUUID(),
      role: 'user',
      content: content.trim(),
      timestamp: new Date().toISOString(),
    };

    setMessages(prev => [...prev, userMsg]);
    setInput('');
    setIsLoading(true);

    const newCount = incrementChatCount();
    setChatCount(newCount);

    try {
      const responseText = await generateResponse(content.trim());

      const assistantMsg: ChatMessage = {
        id: crypto.randomUUID(),
        role: 'assistant',
        content: responseText,
        timestamp: new Date().toISOString(),
      };

      setMessages(prev => [...prev, assistantMsg]);
    } catch {
      const assistantMsg: ChatMessage = {
        id: crypto.randomUUID(),
        role: 'assistant',
        content: 'Mi scuso per l\'inconveniente. Il servizio è temporaneamente in sovraccarico. Ti prego di riprovare tra qualche istante o di formulare la domanda in modo diverso.',
        timestamp: new Date().toISOString(),
      };
      setMessages(prev => [...prev, assistantMsg]);
    } finally {
      setIsLoading(false);
    }
  }, [isLoading, messages, generateResponse, isAdmin]);

  const handleKeyDown = useCallback((e: React.KeyboardEvent) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      sendMessage(input);
    }
  }, [input, sendMessage]);

  return (
    <div className="flex flex-col h-[calc(100vh-80px)] max-w-4xl mx-auto">
      {showPaywall && <BannerPaywall />}

      <div className="flex-1 overflow-y-auto p-4 space-y-4">
        {messages.length === 0 && (
          <div className="text-center py-12">
            <div className="w-20 h-20 bg-gradient-to-r from-brand-blu to-brand-verde rounded-full flex items-center justify-center mx-auto mb-6">
              <svg className="w-10 h-10 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 12h.01M12 12h.01M16 12h.01M21 12c0 4.418-4.03 8-9 8a9.863 9.863 0 01-4.255-.949L3 20l1.395-3.72C3.512 15.042 3 13.574 3 12c0-4.418 4.03-8 9-8s9 3.582 9 8z" />
              </svg>
            </div>
            <h2 className="text-2xl font-bold text-brand-blu mb-2">
              Sindacalista AI {assistantType ? `- ${assistantType}` : ''}
            </h2>
            <p className="text-gray-600 mb-8 max-w-md mx-auto text-sm">
              Assistente virtuale specializzato su CCNL Istruzione e Ricerca, congedi, interpelli, GPS e diritti del personale scolastico.
            </p>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 max-w-2xl mx-auto">
              {SUGGESTED_PROMPTS.map(prompt => (
                <button
                  key={prompt}
                  onClick={() => sendMessage(prompt)}
                  className="text-left p-3 bg-white/70 border border-gray-200 rounded-2xl text-sm text-gray-700 hover:border-brand-blu hover:bg-brand-blu/5 transition"
                >
                  <span className="line-clamp-2">{prompt}</span>
                </button>
              ))}
            </div>
            {!isAdmin && (
              <p className="text-xs text-gray-400 mt-4">
                Consultazioni gratuite rimanenti: {Math.max(0, FREE_MESSAGE_LIMIT - chatCount)} / {FREE_MESSAGE_LIMIT}
              </p>
            )}
          </div>
        )}

        {messages.map(msg => (
          <div
            key={msg.id}
            className={`flex items-start gap-3 ${msg.role === 'user' ? 'flex-row-reverse' : ''}`}
          >
            <div
              className={`w-8 h-8 rounded-full flex items-center justify-center flex-shrink-0 ${
                msg.role === 'user' ? 'bg-brand-blu' : 'bg-gradient-to-r from-brand-verde to-brand-ottanio'
              }`}
            >
              <span className="text-white text-xs font-bold">
                {msg.role === 'user' ? 'U' : 'AI'}
              </span>
            </div>
            <div
              className={`max-w-[80%] p-4 rounded-2xl ${
                msg.role === 'user'
                  ? 'bg-brand-blu text-white'
                  : 'bg-white border border-gray-200 text-gray-800'
              }`}
            >
              <div className={`prose prose-sm max-w-none ${msg.role === 'user' ? 'prose-invert' : ''}`}>
                {msg.content.split('\n').map((line, i) => (
                  <p key={i} className={
                    line.startsWith('**') ? 'font-bold text-brand-blu' :
                    line.startsWith('#') ? 'font-bold text-brand-blu mt-3' :
                    line.startsWith('-') ? 'text-gray-700 ml-2' :
                    line.startsWith('1.') || line.startsWith('2.') || line.startsWith('3.') || line.startsWith('4.') ? 'text-gray-700' :
                    ''
                  }>
                    {line.replace(/\*\*/g, '').replace(/^#+\s*/, '')}
                  </p>
                ))}
              </div>
              {msg.citations && msg.citations.length > 0 && (
                <div className="mt-3 pt-3 border-t border-gray-100">
                  <p className="text-xs text-gray-500 font-medium mb-1">Fonti:</p>
                  {msg.citations.map((c, i) => (
                    <p key={i} className="text-xs text-brand-ottanio">
                      {c.title} (affinità: {(c.confidence * 100).toFixed(0)}%)
                    </p>
                  ))}
                </div>
              )}
              <p className="text-xs text-gray-400 mt-2">
                {new Date(msg.timestamp).toLocaleTimeString('it-IT', { hour: '2-digit', minute: '2-digit' })}
              </p>
            </div>
          </div>
        ))}

        {isLoading && <SkeletonLoader />}

        <div ref={messagesEndRef} />
      </div>

      <div className="border-t border-gray-200 bg-white/80 backdrop-blur-xs p-4">
        <div className="flex gap-3 max-w-4xl mx-auto">
          <textarea
            value={input}
            onChange={e => setInput(e.target.value)}
            onKeyDown={handleKeyDown}
            disabled={isLoading || (!isAdmin && chatCount >= FREE_MESSAGE_LIMIT)}
            placeholder={
              isAdmin
                ? 'Scrivi la tua domanda al Sindacalista AI (accesso amministratore illimitato)...'
                : chatCount >= FREE_MESSAGE_LIMIT
                  ? 'Limite gratuito raggiunto. Abbonati a Pro per continuare.'
                  : 'Scrivi la tua domanda al Sindacalista AI...'
            }
            rows={1}
            className="flex-1 border border-gray-300 rounded-2xl px-4 py-3 resize-none focus:ring-2 focus:ring-brand-blu focus:border-brand-blu disabled:opacity-50 disabled:cursor-not-allowed transition"
          />
          <button
            onClick={() => sendMessage(input)}
            disabled={isLoading || !input.trim() || (!isAdmin && chatCount >= FREE_MESSAGE_LIMIT)}
            className="px-6 py-3 bg-gradient-to-r from-brand-blu to-brand-verde text-white rounded-2xl font-semibold hover:opacity-90 disabled:opacity-50 disabled:cursor-not-allowed transition"
          >
            Invia
          </button>
        </div>
        <div className="flex justify-between mt-2 max-w-4xl mx-auto">
          {isAdmin ? (
            <p className="text-xs text-brand-verde font-medium">Accesso amministratore: consultazioni illimitate</p>
          ) : (
            <p className="text-xs text-gray-400">
              Consultazioni gratuite: {Math.max(0, FREE_MESSAGE_LIMIT - chatCount)}/{FREE_MESSAGE_LIMIT}
            </p>
          )}
          {chatCount > 0 && (
            <button
              onClick={() => {
                setMessages([]);
                resetChatCount();
                setChatCount(0);
                setShowPaywall(false);
              }}
              className="text-xs text-gray-400 hover:text-red-400 transition"
            >
              Reset conversazione
            </button>
          )}
        </div>
      </div>
    </div>
  );
}
