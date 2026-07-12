import { createClient } from 'https://esm.sh/@supabase/supabase-js@2.57.4?target=deno';

const corsHeaders = {
  'Access-Control-Allow-Origin': '*',
  'Access-Control-Allow-Methods': 'POST, OPTIONS',
  'Access-Control-Allow-Headers': 'Content-Type, Authorization',
};

const GEMINI_BASE = 'https://generativelanguage.googleapis.com/v1beta/models';
const MODEL = 'gemini-3.1-flash-lite';

// ================================================================
// SYSTEM PROMPT — Sindacalista AI Sportello Scuola 2.0
// ================================================================

const SISTEMA_PROMPT = `Sei l'Assistente Normativo di "Sportello Scuola 2.0", la piattaforma italiana dedicata al personale scolastico (docenti, ATA, dirigenti e aspiranti). Il tuo compito è fornire risposte precise, puntuali e normativamente fondate sul diritto del lavoro scolastico italiano.

REGOLE FERREE:
1. ZERO ALLUCINAZIONI: Ogni riferimento normativo, data, numero di articolo, comma o allegato deve essere ESATTO al 100%. Se non sei sicuro, indica [DA VERIFICARE]. Non inventare mai riferimenti normativi.
2. RISPOSTA DIRETTA: Rispondi subito alla domanda. Non fare introduzioni generiche. Vai dritto al punto.
3. STRUTTURA DELLA RISPOSTA: Usa un formato chiaro e leggibile:
   - **Grassetto** per concetti chiave, scadenze, importi, articoli di legge
   - Elenchi puntati per elencare opzioni, diritti, procedure
   - Righe separate per ogni concetto
   - Mai testi compatti senza formattazione
4. FONTI: Cita sempre la fonte normativa esatta (es. "art. 35 CCNL 2019-2021", "OM 88/2024 art. 14", "D.Lgs. 297/1994 art. 197").
5. LIMITI: Se la domanda esula dal campo scolastico/contrattuale, rispondi che non è nel tuo ambito di competenza e suggerisci di consultare uno sportellista umano.
6. TONO: Autorevole ma accessibile. Parla al collega, non al bureaucrata. Usa il "tu".
7. LUNGHEZZA: Risposte di 150-400 parole. Abbastanza dettagliate da essere utili, abbastanza breve da essere leggibili.
8. SE NON SA: Se non hai informazioni sufficienti, dillo chiaramente e consiglia di:
   - Consultare la sezione Normative del portale
   - Contattare il sindacato di riferimento
   - Scrivere a sportelloscuola2.0@gmail.com

ARGOMENTI DI COMPETENZA:
- CCNL Comparto Istruzione e Ricerca 2019-2021 e 2006-2009
- Supplenze, GPS, GAE, graduatorie d'istituto
- Concorsi docenti e ATA (ordinario, straordinario, PNRR)
- Permessi, ferie, congedi, maternità, paternità
- Legge 104/1992, L. 68/1999, D.Lgs. 151/2001
- Mobilità, trasferimenti, assegnazioni provvisorie
- Interpelli e MAD
- TFA Sostegno, percorsi abilitanti 30/36/60 CFU
- Organici, funzione docente, orario di lavoro
- Personale ATA: profili, ordinamento, CIAD, progressioni
- Retribuzione, indennità, trattamento economico
- Anno di prova e formazione neoassunti
- Scadenze ricorrenti del calendario scolastico

FONTI UFFICIALI (piramide di affidabilità):
- Livello A (verità): Gazzetta Ufficiale, Normattiva, MIM, Parlamento, ARAN, INPS
- Livello B (governance): INVALSI, INDIRE, ISTAT
- Livello C (giurisprudenza): TAR, Consiglio di Stato, Corte Costituzionale
- Livello F (intelligence): sindacati, stampa di settore — solo come trigger, mai come fonte primaria`;

// ================================================================
// KNOWLEDGE BASE — Copia server-side di knowledge-base.ts
// Keywords → contesto normativo da iniettare nel prompt
// ================================================================

interface KnowledgeEntry {
  keywords: string[];
  title: string;
  context: string;
}

const KNOWLEDGE_ENTRIES: KnowledgeEntry[] = [
  {
    keywords: ['ccnl 2019', 'nuovo contratto', 'contratto 2024', 'firmato 2024', '18 gennaio'],
    title: 'CCNL Comparto Istruzione e Ricerca 2019-2021',
    context: `CCNL firmato il 18 gennaio 2024. Principali novità:
- Permessi retribuiti estesi anche a TD (art. 35 comma 1)
- Nuovo profilo Operatore Scolastico (OS) nel personale ATA
- CIAD obbligatoria per tutti i profili ATA nella terza fascia
- Lavoro agile ATA fino a 12 giorni/mese; docenti per attività funzionali
- Indennità di vacanza contrattuale
- Art. 35: permessi personali 3 giorni/anno (anche TD); lutto 3 giorni; 104: 3 giorni/mese
- Art. 37-39: primi 30 giorni congedo parentale retribuiti al 100%
Fonte: G.U. Serie Generale n. 31 del 7 febbraio 2024.`
  },
  {
    keywords: ['ccnl 2006', 'ccnl 2007', 'ccnl 2009', 'aran', 'contratto storico'],
    title: 'CCNL Comparto Scuola 2006-2009',
    context: `CCNL siglato dall'ARAN, ancora vigente per parti non abrogate. Articoli fondamentali:
- Art. 26-40: Funzione docente, orario (infanzia 25h, primaria 22h+2h prog., secondaria 18h)
- Art. 44-62: Ordinamento ATA (aree A, B, profili AA, AT, CS, CU, GU, IF)
- Art. 49: Orario ATA 36 ore/settimanali su 6 giorni
- Art. 63-71: Ferie e festività
- Art. 72-78: Comporto malattia (9 mesi primi 3 anni; 6 mesi successivi)
Principio di assorbimento: CCNL 2019-2021 prevale dove espressamente indicato.`
  },
  {
    keywords: ['testo unico', 'dlgs 297', 'decreto 297', 't.u. istruzione', 'organi collegiali', 'collegio docenti', 'consiglio di classe', 'anno di prova', 'sanzioni disciplinari'],
    title: 'D.Lgs. 297/1994 - Testo Unico Istruzione',
    context: `Legge quadro del sistema scolastico italiano:
- Organi collegiali (artt. 1-48): Consiglio di circolo/istituto, Collegio docenti, Consiglio di classe, Giunta esecutiva
- Anno di prova (artt. 197-200): 1 anno scolastico, 50 ore formazione, tutor, 4 visite in classe
- Sanzioni disciplinari (artt. 492-500): avvertimento, censura, sospensione (fino a 10gg o 11gg-1mese), licenziamento con/senza preavviso
- Procedimento disciplinare: art. 55-bis D.Lgs. 165/2001 (contestazione scritta, 30 giorni difesa)`
  },
  {
    keywords: ['150 ore', 'permessi studio', 'diritto allo studio', 'corsi universitari'],
    title: 'Permessi studio 150 ore',
    context: `CCNL 2019-2021, artt. 33-34:
- 150 ore annue pro-rata per corsi universitari, specializzazione, dottorato, formazione professionale
- Estesi anche al personale a tempo determinato (miglioramento vs CCNL 2006-2009)
- Frequenza minima 75%; almeno 1 esame all'anno
- Retribuzione 100% a carico amministrazione
- Domanda al DS entro 15 giorni dall'inizio corso con programma didattico`
  },
  {
    keywords: ['ferie', 'festività', 'riposo'],
    title: 'Ferie, festività e riposi',
    context: `CCNL 2019-2021 artt. 30-32; CCNL 2006-2009 artt. 63-67:
- Docenti: 30 giorni lavorativi annui (fruibili al di fuori dei periodi di sospensione)
- ATA: 26 giorni (primi 3 anni), 28 giorni (dal 4°), 30 giorni (dal 21°)
- 4 giornate di festività soppresse
- 32 ore riposo settimanale consecutivo`
  },
  {
    keywords: ['stipendio', 'retribuzione', 'tabellare', 'posizione economica', 'rpd', 'salario accessorio', 'indennità', 'bonus', '13ma', 'tredicesima'],
    title: 'Trattamento economico',
    context: `Stipendio tabellare dalla posizione economica. RPD (Retribuzione Posizione Docente) in 13 mensilità.
Indennità: direzione DS, funzione collaboratori, coordinamento ATA B, turnazione/straordinario ATA, sostegno (6 punti).
13ª mensilità: 1/12 RAL per tutto il personale indeterminato e determinato (>1 mese).
CCNL 2019-2021: incrementi medi 4,5% sui tabellari.`
  },
  {
    keywords: ['funzione docente', 'profilo docente', 'attività funzionali', 'consiglio di classe ore', 'collegio docenti ore', 'ricevimento', 'programmazione'],
    title: 'Funzione docente e attività funzionali',
    context: `CCNL 2006-2009 artt. 26-30 (vigenti):
- Art. 28: orario infanzia 25h, primaria 22h+2h programmazione, secondaria 18h
- Art. 29: attività funzionali (consigli di classe 40h annue, collegi, scrutini, esami)
- Art. 30: ricevimento famiglie almeno 2 ore mensili + 2 incontri annui`
  },
  {
    keywords: ['orario', 'cattedra', 'orario insegnamento', 'orario ata', '36 ore'],
    title: 'Orario di lavoro',
    context: `Docenti: infanzia 25h, primaria 22h+2h, secondaria 18h + attività funzionali 40h/anno.
ATA: 36 ore settimanali su 6 giorni. CS/OS: turnazione antimeridiana/pomeridiana. AA/AT: 8:00-14:00 + rientro.`
  },
  {
    keywords: ['mansionario', 'mansioni ata', 'assistente amministrativo', 'assistente tecnico', 'collaboratore scolastico', 'operatore scolastico', 'profilo ata'],
    title: 'Ordinamento professionale ATA',
    context: `CCNL 2019-2021 artt. 56-60:
- Area A: Operatore Scolastico (OS) — nuovo profilo, qualifica triennale + CIAD
- Area B: CS, GU, CU, IF
- Area B2: AA (diploma II grado + CIAD), AT (diploma tecnico + CIAD)
- CIAD obbligatoria per tutti i profili di nuova assunzione`
  },
  {
    keywords: ['lavoro agile', 'smart working', 'telelavoro', 'da remoto'],
    title: 'Lavoro agile',
    context: `CCNL 2019-2021 artt. 12-13:
- ATA: fino a 12 giornate/mese, volontario, rotazione obbligatoria
- Docenti: limitato a attività funzionali (no lezioni in presenza)
- Diritto alla disconnessione (art. 13)
- Obbligo corso sicurezza informatica`
  },
  {
    keywords: ['om 88', 'ordinanza 88', 'gps biennio', 'graduatorie provinciali', 'gps 2024', 'fascia gps', 'i fascia', 'ii fascia'],
    title: 'OM 88/2024 - GPS Biennio 2024/2026',
    context: `OM n. 88/2024 del 16 maggio 2024:
- I Fascia: abilitati (concorso, TFA, PAS, laurea magistrale SFP, percorsi 30/36/60 CFU)
- II Fascia: titolo accesso (laurea magistrale + 24 CFU)
- Domanda tramite POLIS, fino a 150 scuole
- Valutazione: servizio specifico 12pt/anno, non specifico 6pt/anno, certificazioni linguistiche fino a 6pt, master fino a 1,50pt
- Art. 14: sanzioni per rinuncia/differimento/abbandono`
  },
  {
    keywords: ['allegato a', 'tabella a/', 'tabelle di valutazione', 'punteggio gps', 'calcolo punteggio', 'quanto vale', 'punteggio master', '12 punti', '6 punti'],
    title: 'Tabelle di valutazione titoli GPS',
    context: `Tabelle A/1-A/10 (Allegato 3 OM 88/2024):
- Master/corsi: max 3 titoli, 0,50pt cad = max 1,50pt
- Certificazioni linguistiche: B1=2pt, B2=3pt, C1=4pt, C2=6pt (max 6pt)
- Certificazioni informatiche: max 4, 0,50pt cad = max 2pt
- Dottorato: 4pt; CLIL: 5pt; Sostegno: 3pt
- Servizio specifico: 16-45gg=2pt ... ≥166gg=12pt (max 12pt/anno)
- Servizio non specifico: dimezzato (max 6pt/anno)
- Servizio sostegno: raddoppio (valutato come specifico x2)`
  },
  {
    keywords: ['algoritmo', '150 scuole', '150 preferenze', 'assegnazione supplenze', 'abbinamento', 'priorità'],
    title: 'Algoritmo delle 150 scuole',
    context: `OM 88/2024 art. 19: sistema SIDI abbina preferenze al punteggio.
- A parità di punteggio, vince chi ha messo la scuola in posizione più alta
- Scelta d'ufficio se nessuna supplenza coperta
- Consiglio: inserire scuole in ordine di reale preferenza`
  },
  {
    keywords: ['rinuncia', 'differimento', 'mancata presentazione', 'abbandono', 'depennamento', 'esclusione graduatoria', 'art. 14'],
    title: 'Art. 14 OM 88/2024 - Effetti rinuncia/abbandono',
    context: `Art. 14 OM 88/2024:
- Differimento: max 30 giorni, senza sanzioni se giustificato
- Rinuncia non motivata: 1ª → esclusione a.s. in corso; 2ª → esclusione definitiva
- Rinuncia motivata (salute, maternità, forza maggiore): nessuna sanzione
- Mancata presentazione: equiparata a rinuncia non motivata
- Abbandono dopo presa di servizio: cancellazione definitiva dalla graduatoria
- CCNL 2019-2021 art. 40: ulteriori sanzioni, sospensione fino a 2 anni`
  },
  {
    keywords: ['interpello', 'interpelli', 'ex mad', 'supplenze interpello', 'avviso interpello', 'usp interpello'],
    title: 'Interpelli - Sostituzione MAD',
    context: `OM 88/2024 art. 13: interpelli sostituiscono le MAD dal 2024.
- USP e scuole pubblicano avvisi per supplenze non coperte da GPS
- Scadenza perentoria (5-10 giorni)
- Selezione per punteggio GPS; in assenza, titolo di studio
- MAD: ancora valide solo per supplenze brevi/urgenti (1-10 giorni)
- Dove trovarli: albo pretorio, sito USP, POLIS/SIDI`
  },
  {
    keywords: ['dm 89', 'dm 89/2024', 'ata terza fascia', 'terza fascia ata', 'graduatorie ata', 'inserimento ata'],
    title: 'DM 89/2024 - Terza fascia ATA',
    context: `DM 89/2024 del 21 maggio 2024, triennio 2024/2027:
- Fino a 30 sedi selezionabili
- Requisiti: OS=qualifica triennale, CS=I grado, AA/AT=II grado, CU/GU/IF=titolo specifico
- CIAD obbligatoria per tutti
- Valutazione: titolo studio fino a 6pt, laurea 3pt(triennale)/5pt(magistrale), servizio stesso profilo 0,50pt/mese (max 6pt/anno)`
  },
  {
    keywords: ['dm 430', 'dm 430/2000', 'supplenze ata', 'convocazione ata', 'graduatorie istituto ata'],
    title: 'DM 430/2000 - Supplenze ATA',
    context: `DM 13 dicembre 2000, n. 430:
- Convocazione da Graduatorie di Istituto ATA (I fascia: 24 mesi; II: titolo; III: tutti)
- Spezoni orari validi ma punteggio proporzionale
- Rinuncia: esclusione graduatoria a.s. in corso
- Abbandono: decadenza + segnalazione USP`
  },
  {
    keywords: ['mobilità', 'trasferimento', 'cambio sede', 'cambio provincia', 'ricongiungimento', 'vincolo triennale', 'vincolo permanenza'],
    title: 'CCNI Mobilità',
    context: `CCNI Mobilità triennio 2025/2027:
- Vincolo triennale neoassunti (art. 399 D.Lgs. 297/1994); quinquennale piccole isole
- Punteggio: anzianità ruolo 6pt/anno, pre-ruolo 6pt primi 4 anni poi 3pt, continuità 1pt/anno (max 7pt)
- Famiglia: ricongiungimento coniuge 6pt, figli <18 8pt, genitori disabili 6pt
- Disabilità personale L.104/92: priorità assoluta
- Domande tramite POLIS entro febbraio-marzo`
  },
  {
    keywords: ['assegnazione provvisoria', 'utilizzazione', 'movimento annuale'],
    title: 'CCNI Utilizzazioni e Assegnazioni Provvisorie',
    context: `Assegnazione provvisoria = mobilità annuale (temporanea, non cambia sede titolarità):
- Per ricongiungimento, cure mediche, disabilità
- Solo: anzianità 1pt/anno, figli minori, ricongiungimento, disabilità (no titoli culturali)
- Domande entro maggio; provvedimenti entro luglio`
  },
  {
    keywords: ['legge 104', 'l. 104', '104/92', 'art. 21', 'art. 33', 'assistenza disabile', 'disabilità personale', 'permessi 104', 'tre giorni mese'],
    title: 'L. 104/1992 - Disabilità',
    context: `Art. 21: priorità assoluta sede per disabilità personale (non assistenza familiare)
Art. 33: 3 giorni/mese retribuiti per assistenza familiare disabile grave (coniuge, parente 1° grado, affine 1° grado, 2° grado se 1° deceduto/anziano)
- Referente unico obbligatorio
- Frazionabile in ore (max 2 ore/giorno)
- Esteso anche a TD (CCNL 2019-2021)
Art. 33 comma 6: esclusione dalla mobilità straordinaria (soprannumerarietà) per disabilità grave`
  },
  {
    keywords: ['maternità', 'paternità', 'congedo parentale', 'astensione obbligatoria', 'allattamento', 'riposo allattamento', 'dlgs 151'],
    title: 'T.U. Maternità e Paternità - D.Lgs. 151/2001',
    context: `Astensione obbligatoria: 5 mesi (2 prima + 3 dopo parto; flessibile 1+4)
- Indennità 100% INPS; divieto licenziamento fino a 1 anno figlio
Congedo paternità: 10 giorni obbligatori (D.Lgs. 105/2022); facoltativo sostitutivo
Congedo parentale: entro 12 anni, max 6 mesi individuale, 10 mesi complessivo
- CCNL 2019-2021 art. 37: primo mese retribuito al 100%
- Dal 2° mese: 30% (D.Lgs. 151/2001)
Riduzione oraria allattamento: 2ore/giorno (1° anno), 100% retribuiti
Congedo straordinario L.104: 2 anni nell'arco vita lavorativa, 100% INPS`
  },
  {
    keywords: ['legge 68', 'l. 68', '68/1999', 'collocamento mirato', 'categorie protette', 'riserve'],
    title: 'L. 68/1999 - Collocamento mirato',
    context: `Quote riserva: 1 posto (fino a 50 dip.), 2 (51-150), 7% (>150)
Riserve supplenze: N01 (invalidità >45%), N02 (>33% infortunio + L.68), N03 (orfani/coniugi deceduti causa lavoro), N04 (vittime terrorismo)
Procedura: registrazione Collocamento Mirato provincia residenza`
  },
  {
    keywords: ['malattia', 'aspettativa', 'comporto', '9 mesi', 'visita fiscale'],
    title: 'Malattia e aspettativa',
    context: `CCNL 2006-2009 artt. 72-78:
- Comporto: 9 mesi (primi 3 anni); 6 mesi (triennio successivo)
- Trattamento: 100% primi 9 mesi; 50% dal 10° al 18° mese
- Fasce reperibilità: 9:00-13:00 e 15:00-18:00
- Precari: conservazione posto max 30 giorni malattia
Aspettativa: famiglia 2 anni (non retribuita); studio 1 anno; cariche elettive (durata mandato)`
  },
  {
    keywords: ['dpcm', 'dpcm 4 agosto', '30 cfu', '36 cfu', '60 cfu', 'percorsi abilitanti', 'abilitazione insegnamento'],
    title: 'DPCM 4/8/2023 - Percorsi abilitanti',
    context: `Percorso 60 CFU: laureati magistrali senza esperienza, 1 anno, 40 CFU pedagogia + 20 CFU tirocinio
Percorso 30 CFU: triennalisti con 3 anni servizio ultimi 5 anni, 1 semestre, 20+10 CFU
Percorso 36 CFU: già abilitati su altra classe di concorso, 24+12 CFU
Prova finale: lezione simulata + colloquio → diploma abilitazione → I fascia GPS`
  },
  {
    keywords: ['concorso', 'concorso ordinario', 'concorso straordinario', 'prova scritta', 'quiz', 'lezione simulata', 'dl 36', 'dlgs 36/2022', 'pnrr reclutamento'],
    title: 'Concorsi docenti e riforma reclutamento PNRR',
    context: `D.Lgs. 36/2022 conv. L. 79/2022:
- Prova scritta computer-based: 50-60 quiz pedagogici/metodologici
- Prova orale: lezione simulata 15min + colloquio 15min
- Titoli: 10-15 punti
- Concorso straordinario: 36 mesi servizio ultimi 5 anni, 30 domande
- Posti 2026: 20.000 ordinario secondaria + 5.000 straordinario + 12.000 infanzia/primaria
- Calendario: prove scritte ottobre 2026, orali nov-dic 2026, graduatorie febbraio 2027`
  },
  {
    keywords: ['tfa', 'tfa sostegno', 'tirocinio formativo', 'specializzazione sostegno', 'dm 108'],
    title: 'TFA Sostegno',
    context: `VIII ciclo (D.D. 1025/2026): 12.000 posti totali
- Requisiti: SFP (infanzia/primaria) o laurea magistrale + 24 CFU (secondaria)
- Prove: preseletta 60 quiz, scritta 3 domande aperte, orale caso clinico + inglese B2
- Corso: 1 anno, 60 CFU, tirocinio diretto + indiretto
- Titolo: diploma specializzazione → GPS posti sostegno, +3pt`
  },
  {
    keywords: ['anno di prova', 'neoassunto', 'periodo di formazione', 'tutor', 'patto formativo', 'prova finale', 'superamento anno', '50 ore'],
    title: 'Anno di prova e formazione neoassunti',
    context: `D.Lgs. 297/1994 artt. 197-200; D.M. 226/2022:
- Durata: 1 anno scolastico
- Formazione: 50 ore (12 ore laboratori)
- Tutor: 4 visite in classe (2+2 per quadrimestre)
- Portfolio digitale
- Giudizio entro 31 agosto da DS + Comitato valutazione
- Positivo = conferma; negativo = ripetenza (max 1 volta)`
  },
  {
    keywords: ['progressione', 'verticale', 'orizzontale', 'fascia', 'passaggio profilo', 'da cs a aa'],
    title: 'Progressioni di carriera ATA',
    context: `Orizzontale: scatti biennali di stipendio (stesso profilo)
Verticale: cambio profilo tramite concorso (es. CS→AA), richiede diploma
Fasce graduatoria: I (24 mesi servizio), II (titolo accesso), III (tutti con titoli)`
  },
  {
    keywords: ['passaggio ruolo', 'ata docente'],
    title: 'Passaggio di ruolo ATA → Docente',
    context: `Requisiti: titolo studio per classe di concorso + 24 CFU o percorso abilitante
- Iscrizione GPS docenti
- Riserva posti concorsi per ATA (L. 107/2015)
- Scelta tra ruolo ATA e docente (non cumulabile)
- Servizio ATA valido per ricostruzione carriera (art. 485 D.Lgs. 297/1994)`
  },
  {
    keywords: ['ciad', 'certificazione internazionale alfabetizzazione digitale', 'accredia'],
    title: 'CIAD - Certificazione Internazionale Alfabetizzazione Digitale',
    context: `Obbligatoria per tutti i profili ATA (DM 89/2024):
- Rilasciata da ente accreditato Accredia
- Senza CIAD domanda ATA invalida
- Possesso oltre obbligo: +1pt graduatorie; certificazioni aggiuntive: 0,50pt cad (max 2pt)`
  },
  {
    keywords: ['organico', 'organico di diritto', 'organico di fatto', 'cattedra', 'potenziamento'],
    title: 'Organici del personale docente',
    context: `Organico di diritto: definito nazionale dal MIM per ogni a.s.
Organico di fatto: dopo iscrizioni, adeguamento alle classi effettive
Organico autonomia (L. 107/2015): cattedre curricolari + posti sostegno + posti potenziamento
Cattedra interna (di ruolo) vs esterna (supplente GPS)`
  },
  {
    keywords: ['mad', 'messa a disposizione'],
    title: 'MAD - Messa a Disposizione',
    context: `Sostituite dagli interpelli dal 2024 (OM 88/2024 art. 13)
MAD ancora valide solo per: supplenze brevi 1-10 giorni non coperte da interpello, urgenza
Modalità: PEC, consegna a mano, raccomandata A/R`
  },
  {
    keywords: ['circolare annuale', 'nota agosto', 'nota mim supplenze', 'attribuzione supplenze', 'riserva legge 68', 'priorità legge 104'],
    title: 'Circolari annuali MIM - Attribuzione supplenze',
    context: `Nota annuale agosto/settembre MIM:
- Algoritmo 150 preferenze, chiarimenti SIDI
- Riserve L. 68/1999 (N01-N04)
- Priorità L. 104/1992 art. 21 comma 1 (disabilità personale)
- Accettazione interpelli: termini e modalità
- Supplenze brevi e sostituzioni
- Precedenze: conferma stessa sede, superamento anno prova`
  },
  {
    keywords: ['scadenza', 'termine', 'quando scade', 'entro quando'],
    title: 'Scadenze ricorrenti',
    context: `Febbraio-Marzo: domande mobilità volontaria
Aprile: domande interpelli/MAD
Aprile-Maggio: assegnazioni provvisorie
Maggio: scadenza TFA Sostegno
Giugno: iscrizioni concorsi
Luglio: aggiornamento GPS
Agosto-Settembre: supplenze annuali e temporanee
Entro 24 ore dalla convocazione: accettazione supplenza`
  },
  {
    keywords: ['gps punteggio', 'punteggio complessivo', 'punteggio totale', 'simulatore', 'quanto sono in gps'],
    title: 'Calcolo punteggio GPS',
    context: `Punteggio = titolo accesso + titoli culturali + titoli di servizio
Utilizzare il Simulatore GPS di Sportello Scuola 2.0 per calcolo personalizzato.
OM 88/2024 Allegato 3; Tabelle A/1-A/10`
  },
  {
    keywords: ['dpr 19', 'dpr 19/2016', 'tabella a', 'allegato a', 'classi di concorso', 'classe concorso', 'classe a-01', 'classe a-02', 'classe a-03', 'classe b-01', 'classe b-05', 'classe b-10', 'requisiti accesso', 'scuola secondaria', 'liceo', 'istituto tecnico', 'istituto professionale'],
    title: 'DPR 19/2016 - Classi di concorso (Tabella A / Allegato A)',
    context: `DPR 19 giugno 2016, n. 19 — Allegato A (Tabella A): Classi di concorso per la scuola secondaria di I e II grado.

CLASSI DI CONCORSO — SCUOLA SECONDARIA DI I GRADO (Grado musicale e coreutico):
- Classe A-34: Discipline musicali (ISTS, Liceo musicale e coreutico)
- Classe A-35: Discipline coreutiche (ISTC, Liceo musicale e coreutico)
- Classe A-36: Discipline musicale e coreutiche (ISTP)

CLASSI DI CONCORSO — SCUOLA SECONDARIA DI II GRADO:

GRUPPO A — Discipline letterarie, giuridico-economiche e filosofico-pedagogiche:
- A-01: Italiano e Latino (Liceo classico, Liceo linguistico)
- A-02: Storia (tutti gli indirizzi)
- A-03: Lingua e letteratura straniera — Inglese (tutti gli indirizzi)
- A-04: Lingua e letteratura straniera — Francese
- A-15: Filosofia (Liceo classico, Liceo delle scienze umane)
- A-16: Pedagogia e psicologia (Liceo delle scienze umane)
- A-17: Diritto ed economia (Liceo economico-sociale)
- A-19: Religione cattolica / Attività alternative

GRUPPO B — Discipline scientifico-matematiche, fisiche e naturalistiche:
- A-05: Matematica (tutti gli indirizzi)
- A-06: Fisica (tutti gli indirizzi)
- A-07: Scienze della Terra (tutti gli indirizzi)
- A-08: Biologia (tutti gli indirizzi)
- A-09: Chimica (tutti gli indirizzi)
- A-10: Scienze applicate (tutti gli indirizzi)

GRUPPO C — Discipline artistiche, grafiche e dello spettacolo:
- A-11: Disegno e storia dell'arte (Liceo artistico)
- A-12: Disegno e storia dell'arte — Indirizzo figurativo e architettonico
- A-13: Disegno e storia dell'arte — Indirizzo scenico
- A-18: Storia dell'arte (Liceo artistico)

GRUPPO D — Discipline motorie:
- A-14: Educazione fisica (tutti gli indirizzi)

GRUPPO E — Lingue straniere:
- A-20: Lingua e letteratura tedesca
- A-21: Lingua e letteratura spagnola
- A-22: Lingua e letteratura russa
- A-23: Lingua e letteratura araba

GRUPPO F — Tecnologie (IPSIA/IPSAA/ITIS/ITS):
- A-24: Tecnologie e tecniche di rappresentazione grafica (IPSIA/IPSAA)
- A-25: Tecnologie meccaniche e costruzioni meccaniche (IPSIA)
- A-26: Tecnologie elettriche ed elettroniche (IPSIA)
- A-27: Tecnologie chimiche (IPSIA)
- A-28: Tecnologie tessili e dell'abbigliamento (IPSIA)
- A-29: Tecnologie grafiche e della comunicazione (IPSIA)
- A-30: Tecnologie dell'informatica (IPSIA/ITIS)
- A-31: Tecnologie agrarie e agroalimentari (IPSIA agrario)
- A-32: Tecnologie del legno e dell'arredamento (IPSIA)
- A-33: Tecniche dell'industria alimentare (IPSIA)
- A-34: Chimica e materiali (ITS)
- A-35: Costruzioni, ambiente e territorio (IPSIA)
- A-36: Trasporti e logistica (IPSIA)
- A-37: Affari e relazioni internazionali (Istituto tecnico)
- A-38: Amministrazione, finanza e marketing (Istituto tecnico)
- A-39: Commercio e marketing (Istituto tecnico)
- A-40: Turismo (Istituto tecnico)
- A-41: Agraria, agroalimentare e agroindustria (Istituto tecnico)
- A-42: Pesca e acquacoltura (Istituto tecnico)
- A-43: Manutenzione e assistenza tecnica (Istituto tecnico)
- A-44: Logistica, marketing e commercio estero (Istituto tecnico)

GRUPPO B (secondaria I grado — classi B):
- B-01: Filosofia e storia
- B-02: Filosofia
- B-03: Storia
- B-04: Geografia
- B-05: Matematica e fisica
- B-06: Matematica
- B-07: Fisica
- B-08: Scienze naturali
- B-09: Biologia e scienze della terra
- B-10: Chimica
- B-11: Scienze chimiche e biologiche

REQUISITI DI ACCESSO PER CLASSE DI CONCORSO (art. 5 DPR 19/2016):
Per ogni classe di concorso è richiesto:
1. Titolo di studio (laurea magistrale, specialistica o magistrale a ciclo unico, con crediti nelle discipline della classe)
2. Abilitazione (concorso ordinario, TFA, PAS, percorsi 30/36/60 CFU) oppure 24 CFU nelle discipline della classe + laurea magistrale
Il DM 259/2017 (Regolamento recante norme speciali per l'accesso all'insegnamento) e il DM 22/12/2023 hanno aggiornato alcuni profili e requisiti delle classi di concorso.

Fonte: DPR 19/2016 G.U. n. 175 del 29 luglio 2016; DM 259/2017; DM 22/12/2023.`
  },
  {
    keywords: ['congedo straordinario', 'congedo 104', '2 anni congedo', 'congedo assistenza disabile', 'art. 42 d.lgs 151', 'art. 33 legge 104', 'astensione straordinaria'],
    title: 'Congedo straordinario retribuito L.104/1992 e D.Lgs. 151/2001',
    context: `Congedo straordinario per assistenza familiare disabile grave:
- Durata: 2 anni nell'arco della vita lavorativa (art. 42 D.Lgs. 151/2001, conv. L. 53/2000)
- Retribuzione: 100% a carico INPS (fino a 3 volte il trattamento minimo annuo; eccedenza a carico datore di lavoro solo per pubbliche amministrazioni)
- Beneficiari (ordine di priorità art. 42 comma 5):
  1. Coniuge o convivente
  2. Genitore
  3. Figlio convivente (unico genitore)
  4. Fratello/sorella convivente (unico)
  5. Parente/affine di 2° grado convivente (se genitore >65 o disabile)
- Referente unico: obbligatorio (art. 33 comma 3 L. 104/1992)
- Frazionamento: giornaliero o orario (minimo 2 ore/giorno; frazioni di mezza giornata per lavoratori a tempo pieno)
- Differimento: massimo 12 mesi, con preavviso di 30 giorni
- Esclusione: non cumulabile con congedo parentale; diritto precedenza rispetto a permessi orari L.104 art. 33
- CCNL 2019-2021 art. 35 comma 6: riconoscimento anche al personale a tempo determinato
- Incompatibilità: non esonera dall'obbligo di reperibilità nelle fasce orarie (salvo provvedimento del DS)
- Note MIM: annualmente il MIM pubblica istruzioni su gestione congedi straordinari del personale scolastico

Fonte: art. 42 D.Lgs. 151/2001; art. 33 L. 104/1992; art. 35 CCNL 2019-2021.`
  },
  {
    keywords: ['orario docenti', 'ore insegnamento', '25 ore infanzia', '22 ore primaria', '18 ore secondaria', 'ore lezione', 'orario scuola', 'monte ore', 'orario annuale'],
    title: 'Orario di lavoro docenti — Monte ore per ordine e grado di scuola',
    context: `Orario di insegnamento annuale (art. 28 CCNL 2006-2009, vigente):
- Scuola dell'infanzia: 25 ore settimanali (+ 25 ore annue attività funzionali = 950 ore/anno)
- Scuola primaria: 22 ore settimanali + 2 ore programmazione (+ 25 ore annue attività funzionali = 900 ore/anno)
- Scuola secondaria di I e II grado: 18 ore settimanali (+ 40 ore annue attività funzionali = 720 ore/anno)

Monte ore complessivo annuo (insegnamento + attività funzionali):
- Infanzia: 950 ore
- Primaria: 900 ore
- Secondaria: 720 ore

Attività funzionali (art. 29 CCNL 2006-2009):
- Consigli di classe/quipe: 40 ore/anno
- Colleghi dei docenti: 32 ore/anno (a 2 turni di 16 ore)
- Ricevimento famiglie: 2 ore/mese + 2 incontri annui (art. 30)
- Programmazione interclasse e di dipartimento
- scrutinio e verifiche intermedie
- Orario straordinario: non previsto per i docenti di ruolo

Fonte: art. 28-30 CCNL Comparto Scuola 2006-2009; art. 47 D.Lgs. 297/1994; circ. MI n. 89/2001.`
  },
  {
    keywords: ['progressioni carriera ata', 'scatti ata', 'passaggio profilo ata', 'area a', 'area b', 'collaboratore scolastico', 'assistente amministrativo', 'assistente tecnico', 'ciad progressione', 'procedura concorsuale atipica'],
    title: 'Progressioni di carriera ATA — Orizzontali e verticali',
    context: `Progressione ORIZZONTALE (art. 57 CCNL 2019-2021):
- Scatti biennali di anzianità (stesso profilo, stessa area)
- Contributo: 1 punto per ogni anno di servizio (area A), 1 punto ogni 2 anni (area B, B2)
- Dopo 6 punti: mantenimento dello scatto ma non aumento retributivo

Progressione VERTICALE (cambio profilo, es. CS → AA):
- Procedura concorsuale atipica (art. 57 comma 6 CCNL 2019-2021)
- Requisiti: diploma di scuola secondaria II grado (per passaggio area B → B2); laurea (per passaggio area A)
- CIAD obbligatoria per nuove assunzioni in area A (OS) e area B2 (AA, AT) — DM 89/2024
- Graduatoria di merito interna (per scuole >500 dipendenti) oppure mobilità a domanda

Quota concorsuale atipica:
- Scuole con >500 dipendenti ATA: 1 posto ogni 100 dipendenti (arrotondato per eccesso)
- Scuole con 200-500 dipendenti: 1 posto
- Scuole con <200 dipendenti: 1 posto ogni 5 anni
- Riserva a dipendenti con >5 anni di servizio nello stesso profilo

Fasce retributive: 5 fasce per ogni profilo (art. 57 CCNL 2019-2021)
Profilo OS (nuovo): area A, qualifica triennale + CIAD

Fonte: art. 57 CCNL 2019-2021; DM 89/2024; art. 44-60 CCNL 2006-2009.`
  },
];

// ================================================================
// MATCHING — Trova la knowledge entry più pertinente
// ================================================================

function findRelevantKnowledge(query: string): { entry: KnowledgeEntry; score: number } | null {
  const lower = query.toLowerCase();
  let best: { entry: KnowledgeEntry; score: number } | null = null;

  for (const entry of KNOWLEDGE_ENTRIES) {
    let score = 0;
    for (const kw of entry.keywords) {
      if (lower.includes(kw)) {
        score += kw.length;
      }
    }
    if (score > 0 && (!best || score > best.score)) {
      best = { entry, score };
    }
  }

  return best;
}

// ================================================================
// GEMINI CLIENT
// ================================================================

const GEMINI_KEY = Deno.env.get('GEMINI_API_KEY');

async function callGemini(
  prompt: string,
  systemInstruction: string,
  temperature = 0.2,
  maxTokens = 4096,
  retries = 3,
): Promise<string> {
  const url = `${GEMINI_BASE}/${MODEL}:generateContent?key=${GEMINI_KEY}`;
  const body = {
    contents: [{ role: 'user', parts: [{ text: prompt }] }],
    systemInstruction: { parts: [{ text: systemInstruction }] },
    generationConfig: {
      temperature,
      maxOutputTokens: maxTokens,
      responseMimeType: 'text/plain',
    },
  };

  let lastError = '';
  for (let attempt = 0; attempt < retries; attempt++) {
    const res = await fetch(url, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(body),
    });

    if (res.status === 429) {
      const waitMs = (attempt + 1) * 2000;
      console.warn(`Gemini 429 — retry ${attempt + 1}/${retries} in ${waitMs}ms`);
      await new Promise(r => setTimeout(r, waitMs));
      lastError = await res.text();
      continue;
    }

    if (!res.ok) {
      const err = await res.text();
      throw new Error(`Gemini ${res.status}: ${err.slice(0, 300)}`);
    }

    const data = await res.json();
    return data.candidates?.[0]?.content?.parts?.[0]?.text || '';
  }

  throw new Error(`Gemini 429: rate limit exceeded after ${retries} retries. ${lastError.slice(0, 200)}`);
}

// ================================================================
// HANDLER PRINCIPALE
// ================================================================

Deno.serve(async (req) => {
  if (req.method === 'OPTIONS') {
    return new Response('ok', { headers: corsHeaders });
  }

  if (req.method !== 'POST') {
    return new Response(JSON.stringify({ error: 'Method not allowed' }), {
      status: 405,
      headers: { ...corsHeaders, 'Content-Type': 'application/json' },
    });
  }

  try {
    const { message, history } = await req.json();

    if (!message || typeof message !== 'string') {
      return new Response(JSON.stringify({ error: 'message is required' }), {
        status: 400,
        headers: { ...corsHeaders, 'Content-Type': 'application/json' },
      });
    }

    if (!GEMINI_KEY) {
      return new Response(JSON.stringify({ error: 'GEMINI_API_KEY not configured' }), {
        status: 500,
        headers: { ...corsHeaders, 'Content-Type': 'application/json' },
      });
    }

    // 1. Trova knowledge entry pertinente
    const match = findRelevantKnowledge(message);
    const knowledgeContext = match
      ? `NORMATIVA RILEVANTE (titolo: ${match.entry.title}):\n${match.entry.context}`
      : '';

    // 2. Costruisci il prompt con storia conversazionale
    const historyText = (history || [])
      .map((m: { role: string; content: string }) => {
        const r = m.role === 'assistant' ? 'Assistente Normativo' : 'Utente';
        return `${r}: ${m.content}`;
      })
      .join('\n\n');

    const prompt = historyText
      ? `Storia conversazione recente:\n${historyText}\n\n---\n\nDomanda attuale dell'utente: ${message}${knowledgeContext ? '\n\nContesto normativo pertinente dalla knowledge base interna:\n' + knowledgeContext : ''}`
      : `Domanda dell'utente: ${message}${knowledgeContext ? '\n\nContesto normativo pertinente dalla knowledge base interna:\n' + knowledgeContext : ''}`;

    // 3. Chiama Gemini
    const responseText = await callGemini(prompt, SISTEMA_PROMPT, 0.2, 4096);

    // 4. Costruisci citations
    const citations = match
      ? [{ title: match.entry.title, confidence: Math.min(match.score / 30, 1) }]
      : [];

    // 5. Log su Supabase (fire and forget — non bloccare la risposta)
    try {
      const supabaseUrl = Deno.env.get('SUPABASE_URL');
      const supabaseServiceKey = Deno.env.get('SUPABASE_SERVICE_ROLE_KEY');
      if (supabaseUrl && supabaseServiceKey) {
        const sb = createClient(supabaseUrl, supabaseServiceKey);
        sb.from('gemini_calls_log').insert({
          endpoint: 'ai-sindacalista',
          model: MODEL,
          input_tokens: prompt.length,
          output_tokens: responseText.length,
          latency_ms: 0,
          success: true,
        }).then(() => {}).catch(() => {});
      }
    } catch {
      // non bloccare la risposta per errori di logging
    }

    return new Response(JSON.stringify({ response: responseText, citations }), {
      status: 200,
      headers: { ...corsHeaders, 'Content-Type': 'application/json' },
    });

  } catch (err) {
    console.error('ai-sindacalista error:', err);
    const msg = err instanceof Error ? err.message : String(err);
    const isQuota = msg.includes('429') || msg.includes('quota');
    return new Response(JSON.stringify({
      error: isQuota ? 'Quota exceeded' : 'Internal error',
      details: msg,
      code: isQuota ? 'QUOTA_EXCEEDED' : 'INTERNAL_ERROR',
    }), {
      status: isQuota ? 429 : 500,
      headers: { ...corsHeaders, 'Content-Type': 'application/json' },
    });
  }
});
