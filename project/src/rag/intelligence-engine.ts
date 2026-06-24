import type {
  FonteInfo, LivelloFonte, ClassificazioneIntelligence,
  Criticalita, Impatto, TargetUtente, CategoriaMonitoraggio,
  NotiziaIntelligence, ScadenzaIntelligence,
  LivelloProduzioneContenuto, DataJournalismData, SezioneIntelligence,
} from '../types/intelligence';

export const FONT_REGISTRY: Record<LivelloFonte, FonteInfo[]> = {
  A: [
    { livello: 'A', nome: 'Gazzetta Ufficiale', url: 'https://www.gazzettaufficiale.it', peso: 100 },
    { livello: 'A', nome: 'Normattiva', url: 'https://www.normattiva.it', peso: 100 },
    { livello: 'A', nome: 'MIM', url: 'https://www.mim.gov.it', peso: 100 },
    { livello: 'A', nome: 'Parlamento Italiano', url: 'https://www.parlamento.it', peso: 100 },
    { livello: 'A', nome: 'Camera dei Deputati', url: 'https://www.camera.it', peso: 100 },
    { livello: 'A', nome: 'Senato della Repubblica', url: 'https://www.senato.it', peso: 100 },
    { livello: 'A', nome: 'Dipartimento Funzione Pubblica', url: 'https://www.funzionepubblica.gov.it', peso: 100 },
    { livello: 'A', nome: 'ARAN', url: 'https://www.aranagenzia.it', peso: 100 },
    { livello: 'A', nome: 'INPS', url: 'https://www.inps.it', peso: 100 },
  ],
  B: [
    { livello: 'B', nome: 'INVALSI', url: 'https://www.invalsi.it', peso: 95 },
    { livello: 'B', nome: 'INDIRE', url: 'https://www.indire.it', peso: 95 },
    { livello: 'B', nome: 'ISTAT', url: 'https://www.istat.it', peso: 95 },
  ],
  C: [
    { livello: 'C', nome: 'Giustizia Amministrativa', url: 'https://www.giustizia-amministrativa.it', peso: 98 },
    { livello: 'C', nome: 'Corte Costituzionale', url: 'https://www.cortecostituzionale.it', peso: 98 },
    { livello: 'C', nome: 'Corte di Cassazione', url: 'https://www.cortedicassazione.it', peso: 98 },
  ],
  D: [
    { livello: 'D', nome: 'Commissione Europea — Istruzione', url: 'https://education.ec.europa.eu', peso: 95 },
    { livello: 'D', nome: 'OECD — Education', url: 'https://www.oecd.org/education', peso: 95 },
    { livello: 'D', nome: 'UNESCO — Education', url: 'https://www.unesco.org/en/education', peso: 95 },
    { livello: 'D', nome: 'WHO', url: 'https://www.who.int', peso: 95 },
  ],
  E: [
    { livello: 'E', nome: 'ERIC', url: 'https://eric.ed.gov', peso: 90 },
    { livello: 'E', nome: 'PubMed', url: 'https://pubmed.ncbi.nlm.nih.gov', peso: 90 },
    { livello: 'E', nome: 'Google Scholar', url: 'https://scholar.google.com', peso: 90 },
  ],
  F: [
    { livello: 'F', nome: 'Orizzonte Scuola', url: 'https://www.orizzontescuola.it', peso: 60 },
    { livello: 'F', nome: 'Tecnica della Scuola', url: 'https://www.tecnicadellascuola.it', peso: 60 },
    { livello: 'F', nome: 'Tuttoscuola', url: 'https://www.tuttoscuola.com', peso: 60 },
    { livello: 'F', nome: 'FLC CGIL', url: 'https://www.flcgil.it', peso: 60 },
    { livello: 'F', nome: 'CISL Scuola', url: 'https://www.cislscuola.it', peso: 60 },
    { livello: 'F', nome: 'UIL Scuola', url: 'https://www.uilscuola.it', peso: 60 },
    { livello: 'F', nome: 'SNALS', url: 'https://www.snals.it', peso: 60 },
    { livello: 'F', nome: 'ANIEF', url: 'https://www.anief.org', peso: 60 },
  ],
};

export function getFonteInfo(livello: LivelloFonte): FonteInfo {
  return FONT_REGISTRY[livello][0];
}

export function getFonteByUrl(url: string): FonteInfo | undefined {
  for (const gruppo of Object.values(FONT_REGISTRY)) {
    const found = gruppo.find(f => url.startsWith(f.url) || f.url.startsWith(url));
    if (found) return found;
  }
  return undefined;
}

export function formatDataItaliana(data: string): string {
  const d = new Date(data);
  return d.toLocaleDateString('it-IT', { day: 'numeric', month: 'long', year: 'numeric' });
}

export function calcolaGiorniRimasti(dataScadenza: string): number {
  const now = new Date();
  const scad = new Date(dataScadenza);
  const diff = scad.getTime() - now.getTime();
  return Math.max(0, Math.ceil(diff / (1000 * 60 * 60 * 24)));
}

export function deriveCriticalita(dataScadenza: string): Criticalita {
  const giorni = calcolaGiorniRimasti(dataScadenza);
  if (giorni <= 3) return 'urgente';
  if (giorni <= 15) return 'alta';
  if (giorni <= 60) return 'media';
  return 'bassa';
}

export const MOCK_NEWS_INTELLIGENCE: NotiziaIntelligence[] = [
  {
    id: 'intel-news-1',
    titolo: 'Pubblicata l\'Ordinanza Ministeriale per l\'aggiornamento GPS 2026-2028',
    descrizione: 'Il MIM ha pubblicato l\'OM per l\'aggiornamento biennale delle Graduatorie Provinciali per le Supplenze. Domande dal 1° al 31 luglio 2026 tramite POLIS.',
    dataPubblicazione: '2026-06-15',
    fonte: { livello: 'A', nome: 'MIM', url: 'https://www.mim.gov.it', peso: 100 },
    classifica: {
      criticita: 'alta', impatto: 'nazionale',
      platea: 'intero_sistema',
      target: ['docenti', 'aspiranti_docenti', 'sostegno'],
      categoria: 'reclutamento', livelloFonte: 'A',
      fontePrimaria: 'D.M. prot. n. 1234 del 10/06/2026',
      fonteUrl: 'https://www.mim.gov.it/web/guest/graduatorie-provinciali-supplenze',
      dataAcquisizione: new Date().toISOString(),
    },
    contenuti: [
      { livello: 1, titolo: 'Notizia', contenuto: 'Il Ministero dell\'Istruzione e del Merito ha pubblicato l\'ordinanza per l\'aggiornamento delle GPS per il triennio 2026-2028.' },
      { livello: 2, titolo: 'Analisi', contenuto: 'L\'aggiornamento riguarda circa 800.000 aspiranti docenti iscritti nelle GPS di I e II fascia. Le principali novità riguardano le nuove tabelle di valutazione titoli (D.M. 1150/2026) che modificano i punteggi di certificazioni linguistiche e informatiche.' },
      { livello: 3, titolo: 'Impatto Operativo', contenuto: 'I docenti devono aggiornare il proprio profilo POLIS con i nuovi titoli entro il 31 luglio. Il mancato aggiornamento comporta l\'esclusione dalle nomine per l\'a.s. 2026/2027.' },
      { livello: 4, titolo: 'FAQ', contenuto: 'D: Posso aggiornare solo alcuni titoli? R: Sì, è possibile selezionare solo i titoli che si intendono aggiornare.\nD: Cosa succede se non presento domanda? R: Rimani nella graduatoria con il punteggio precedente, ma non potrai beneficiare delle nuove tabelle.' },
      { livello: 5, titolo: 'Checklist', contenuto: '1. Verificare i titoli posseduti\n2. Acquisire certificazioni linguistiche/informatiche mancanti\n3. Preparare la documentazione digitale (PDF)\n4. Accedere a POLIS con SPID/CIE\n5. Compilare la domanda entro il 31 luglio 2026' },
      { livello: 6, titolo: 'Cronologia Normativa', contenuto: '• D.M. 1234/2026 (10/06/2026) — OM aggiornamento GPS\n• D.M. 1150/2026 (25/05/2026) — Nuove tabelle valutazione\n• O.M. n. 88/2025 — Regolamento supplenze biennio\n• D.Lgs. 59/2017 — Normativa di riferimento' },
      { livello: 7, titolo: 'Scenari Futuri', contenuto: 'Si prevede un aumento del numero di iscritti alle GPS per effetto dei nuovi percorsi abilitanti 30/36/60 CFU. La digitalizzazione delle procedure POLIS sarà completata entro il 2027.' },
    ],
    tag: ['GPS', 'Aggiornamento', 'POLIS'],
    link: 'https://www.mim.gov.it/web/guest/graduatorie-provinciali-supplenze',
    isPinned: true,
  },
  {
    id: 'intel-news-2',
    titolo: 'Concorso Docenti 2026: calendario prove scritte e requisiti',
    descrizione: 'Pubblicato il calendario ufficiale del concorso ordinario per docenti secondaria. Prove computer-based dal 15 al 25 ottobre 2026. 20.000 posti.',
    dataPubblicazione: '2026-06-10',
    fonte: { livello: 'A', nome: 'MIM', url: 'https://www.mim.gov.it', peso: 100 },
    classifica: {
      criticita: 'alta', impatto: 'nazionale',
      platea: 'ampia',
      target: ['docenti', 'aspiranti_docenti', 'sostegno'],
      categoria: 'reclutamento', livelloFonte: 'A',
      fontePrimaria: 'D.D. prot. n. 987 del 12/03/2026',
      fonteUrl: 'https://www.mim.gov.it/concorso-ordinario-docenti-2026',
      dataAcquisizione: new Date().toISOString(),
    },
    contenuti: [
      { livello: 1, titolo: 'Notizia', contenuto: 'Calendario prove concorso docenti 2026 pubblicato. Posti: 20.000 ordinario + 5.000 straordinario + 12.000 infanzia/primaria.' },
      { livello: 2, titolo: 'Analisi', contenuto: 'Il concorso 2026 si inserisce nel piano straordinario di assunzioni PNRR. Rispetto al 2024, il numero di posti è aumentato del 15%. Le prove computer-based si terranno in sedi regionali.' },
      { livello: 3, titolo: 'Impatto Operativo', contenuto: 'I candidati devono presentare domanda entro il 30 aprile 2026. È obbligatorio possedere la laurea magistrale + 24 CFU (percorso ordinario) o 36 mesi di servizio (straordinario).' },
      { livello: 4, titolo: 'FAQ', contenuto: 'D: Posso partecipare a più concorsi? R: Sì, ma solo se le date delle prove non coincidono.\nD: Il titolo di accesso estero è valido? R: Sì, previa traduzione e dichiarazione di valore.' },
      { livello: 5, titolo: 'Checklist', contenuto: '1. Verificare requisiti di accesso\n2. Domanda su POLIS entro 30/04/2026\n3. Preparare documenti (titoli, certificazioni, 24 CFU)\n4. Verificare sede d\'esame\n5. Consultare programma d\'esame' },
      { livello: 6, titolo: 'Cronologia Normativa', contenuto: '• D.D. 987/2026 — Concorso ordinario secondaria\n• D.D. 988/2026 — Concorso straordinario\n• D.D. 989/2026 — Infanzia e primaria\n• DPCM 4/8/2023 — Nuovo reclutamento' },
      { livello: 7, titolo: 'Scenari Futuri', contenuto: 'Dopo il 2026, il reclutamento sarà progressivamente basato sui nuovi percorsi abilitanti. I concorsi ordinari potrebbero diventare biennali.' },
    ],
    tag: ['Concorsi', 'Reclutamento', 'PNRR'],
    link: 'https://www.mim.gov.it/concorso-ordinario-docenti-2026',
    isPinned: true,
  },
  {
    id: 'intel-news-3',
    titolo: 'Graduatorie ATA terza fascia: pubblicazione definitiva',
    descrizione: 'USP di tutta Italia pubblicano le graduatorie definitive ATA terza fascia DM 89/2024. Controllare il sito USP per verifica punteggio.',
    dataPubblicazione: '2026-06-05',
    fonte: { livello: 'A', nome: 'MIM', url: 'https://www.mim.gov.it', peso: 100 },
    classifica: {
      criticita: 'alta', impatto: 'nazionale',
      platea: 'ampia',
      target: ['ata', 'amministrativi', 'collaboratori'],
      categoria: 'reclutamento', livelloFonte: 'A',
      fontePrimaria: 'D.M. 89/2024, G.U. n. 124 del 25/05/2024',
      fonteUrl: 'https://www.mim.gov.it/ata-terza-fascia',
      dataAcquisizione: new Date().toISOString(),
    },
    contenuti: [
      { livello: 1, titolo: 'Notizia', contenuto: 'Graduatorie ATA terza fascia 2024-2027 in pubblicazione presso gli USP.' },
      { livello: 2, titolo: 'Analisi', contenuto: 'Le graduatorie includono i nuovi profili: Operatore Scolastico (OS), Assistente Amministrativo (AA), Collaboratore Scolastico (CS), Assistente Tecnico (AT).' },
      { livello: 3, titolo: 'Impatto Operativo', contenuto: 'Verificare corretto posizionamento. Ricorso entro 15 giorni dalla pubblicazione. Il punteggio determinerà l\'ordine di convocazione per supplenze.' },
      { livello: 4, titolo: 'FAQ', contenuto: 'D: Come faccio a sapere il mio USP? R: In base alla provincia di residenza.\nD: Posso fare ricorso? R: Sì, entro 15 giorni tramite TAR o ricorso straordinario al MIM.' },
      { livello: 5, titolo: 'Checklist', contenuto: '1. Identificare USP di competenza\n2. Scaricare graduatoria pubblicata\n3. Verificare punteggio e posizione\n4. Controllare eventuali errori materiali\n5. Eventuale ricorso entro 15 giorni' },
      { livello: 6, titolo: 'Cronologia Normativa', contenuto: '• D.M. 89/2024 — Regolamento ATA\n• Nota MIM prot. 987/2026 — Chiarimenti profilo OS' },
      { livello: 7, titolo: 'Scenari Futuri', contenuto: 'Il nuovo profilo OS potrebbe essere esteso ad altre funzioni. Possibile revisione delle tabelle di valutazione per il prossimo triennio.' },
    ],
    tag: ['ATA', 'Graduatorie', 'Terza Fascia'],
    link: 'https://www.mim.gov.it/ata-terza-fascia',
    isPinned: false,
  },
  {
    id: 'intel-news-4',
    titolo: 'TFA Sostegno VIII ciclo: bando con 12.000 posti',
    descrizione: 'Pubblicato il bando per il TFA Sostegno VIII ciclo. 12.000 posti complessivi. Domande entro il 30 giugno 2026 su POLIS.',
    dataPubblicazione: '2026-05-15',
    fonte: { livello: 'A', nome: 'MIM', url: 'https://www.mim.gov.it', peso: 100 },
    classifica: {
      criticita: 'urgente', impatto: 'nazionale',
      platea: 'ampia',
      target: ['docenti', 'aspiranti_docenti', 'sostegno'],
      categoria: 'reclutamento', livelloFonte: 'A',
      fontePrimaria: 'D.D. prot. n. 1025 del 10/05/2026',
      fonteUrl: 'https://www.mim.gov.it/tfa-sostegno-viii-ciclo',
      dataAcquisizione: new Date().toISOString(),
    },
    contenuti: [
      { livello: 1, titolo: 'Notizia', contenuto: 'TFA Sostegno VIII ciclo: 12.000 posti per specializzazione sostegno.' },
      { livello: 2, titolo: 'Analisi', contenuto: 'Distribuzione: infanzia 2.500, primaria 3.500, secondaria I grado 2.800, secondaria II grado 3.200. Rispetto al VII ciclo, aumento del 10% dei posti.' },
      { livello: 3, titolo: 'Impatto Operativo', contenuto: 'Domanda su POLIS entro 30/06/2026. Prova preselettiva: 60 domande in 60 minuti. Prova scritta: 3 domande aperte. Orale: discussione caso clinico.' },
      { livello: 5, titolo: 'Checklist', contenuto: '1. Verificare possesso titoli di accesso\n2. Presentare domanda su POLIS\n3. Prepararsi alla prova preselettiva\n4. Studio pedagogia, psicologia, legislazione' },
      { livello: 6, titolo: 'Cronologia Normativa', contenuto: '• D.D. 1025/2026 — Bando VIII ciclo\n• D.M. 108/2022 — Regolamento TFA sostegno' },
    ],
    tag: ['TFA', 'Sostegno', 'Specializzazione'],
    link: 'https://www.mim.gov.it/tfa-sostegno-viii-ciclo',
    isPinned: true,
  },
  {
    id: 'intel-news-5',
    titolo: 'Nuove tabelle valutazione titoli GPS 2026',
    descrizione: 'D.M. 1150/2026: aggiornate le tabelle A/1-A/10 per la valutazione dei titoli GPS. Novità su certificazioni linguistiche e informatiche.',
    dataPubblicazione: '2026-05-28',
    fonte: { livello: 'A', nome: 'MIM', url: 'https://www.mim.gov.it', peso: 100 },
    classifica: {
      criticita: 'media', impatto: 'nazionale',
      platea: 'intero_sistema',
      target: ['docenti', 'aspiranti_docenti', 'sostegno'],
      categoria: 'reclutamento', livelloFonte: 'A',
      fontePrimaria: 'D.M. prot. n. 1150 del 25/05/2026',
      fonteUrl: 'https://www.mim.gov.it/aggiornamento-tabelle-valutazione-gps',
      dataAcquisizione: new Date().toISOString(),
    },
    contenuti: [
      { livello: 1, titolo: 'Notizia', contenuto: 'Nuove tabelle di valutazione in vigore dal 1° giugno 2026.' },
      { livello: 2, titolo: 'Analisi', contenuto: 'Certificazioni linguistiche: B2=3pt, C1=4pt, C2=6pt (max 6pt). Certificazioni informatiche: max 4 certificazioni, 2pt totali. Master: max 3 titoli, 1pt cad. CLIL: 5pt.' },
      { livello: 3, titolo: 'Impatto Operativo', contenuto: 'I nuovi punteggi si applicano alle domande di aggiornamento GPS presentate dal 1° luglio 2026. I titoli già valutati restano invariati.' },
    ],
    tag: ['GPS', 'Tabelle', 'Valutazione'],
    link: 'https://www.mim.gov.it/aggiornamento-tabelle-valutazione-gps',
    isPinned: false,
  },
  {
    id: 'intel-news-6',
    titolo: 'DPCM 4/8/2023: attivati i percorsi 30/36/60 CFU',
    descrizione: 'Università italiane hanno attivato i nuovi percorsi di formazione iniziale docenti. Domande entro settembre 2026.',
    dataPubblicazione: '2026-05-10',
    fonte: { livello: 'A', nome: 'Gazzetta Ufficiale', url: 'https://www.gazzettaufficiale.it', peso: 100 },
    classifica: {
      criticita: 'media', impatto: 'nazionale',
      platea: 'intero_sistema',
      target: ['docenti', 'aspiranti_docenti', 'universita'],
      categoria: 'normativa', livelloFonte: 'A',
      fontePrimaria: 'DPCM 4 agosto 2023, G.U. n. 201 del 29/08/2023',
      fonteUrl: 'https://www.mim.gov.it/percorsi-abilitazione',
      dataAcquisizione: new Date().toISOString(),
    },
    contenuti: [
      { livello: 1, titolo: 'Notizia', contenuto: 'Percorsi abilitanti 30/36/60 CFU attivi dall\'a.a. 2025/2026.' },
      { livello: 2, titolo: 'Analisi', contenuto: '60 CFU per neolaureati, 30 CFU per triennalisti, 36 CFU per già abilitati su altra classe. Università attive: La Sapienza, Cattolica, Bologna, Padova, Napoli Federico II.' },
      { livello: 6, titolo: 'Cronologia Normativa', contenuto: '• DPCM 4/8/2023 — Nuovi percorsi abilitanti\n• D.Lgs. 59/2017 artt. 2-bis, 18-bis\n• D.M. 108/2022' },
    ],
    tag: ['Abilitazione', 'CFU', 'Formazione'],
    link: 'https://www.mim.gov.it/percorsi-abilitazione',
    isPinned: false,
  },
];

export const MOCK_SCADENZE_INTELLIGENCE: ScadenzaIntelligence[] = [
  {
    id: 'intel-deadline-1',
    titolo: 'Domanda TFA Sostegno VIII ciclo',
    descrizione: 'Termine per la presentazione della domanda di partecipazione al TFA Sostegno VIII ciclo.',
    normativa: 'D.D. prot. n. 1025 del 10/05/2026, art. 5',
    soggettiCoinvolti: ['docenti', 'aspiranti_docenti', 'sostegno'],
    dataScadenza: '2026-06-30',
    priorita: 'urgente',
    impatto: 'nazionale',
    conseguenzeNonAzione: 'Mancata presentazione entro il termine comporta l\'esclusione dalla selezione. Non è prevista riapertura dei termini.',
    link: 'https://www.mim.gov.it/tfa-sostegno-viii-ciclo',
    tipo: 'TFA',
    guidaOperativa: 'Accedere a POLIS con SPID/CIE. Completare il modulo di domanda. Allegare i documenti richiesti. Effettuare il pagamento del contributo di € 50,00 tramite PagoPA.',
  },
  {
    id: 'intel-deadline-2',
    titolo: 'Aggiornamento GPS 2026-2028',
    descrizione: 'Termine ultimo per la presentazione delle domande di aggiornamento delle GPS.',
    normativa: 'O.M. n. 88/2025, art. 3; D.M. prot. n. 1234 del 10/06/2026',
    soggettiCoinvolti: ['docenti', 'aspiranti_docenti', 'sostegno'],
    dataScadenza: '2026-07-31',
    priorita: 'alta',
    impatto: 'nazionale',
    conseguenzeNonAzione: 'Il mancato aggiornamento comporta la permanenza in graduatoria con il punteggio precedente, senza possibilità di beneficiare delle nuove tabelle di valutazione.',
    link: 'https://www.mim.gov.it/graduatorie-provinciali-supplenze',
    tipo: 'GPS',
    guidaOperativa: 'Accedere a POLIS. Selezionare le operazioni di aggiornamento desiderate. Caricare i nuovi titoli in formato PDF. Confermare la domanda entro le 23:59 del 31/07/2026.',
  },
  {
    id: 'intel-deadline-3',
    titolo: 'Domanda Concorsi Ordinari e Straordinari 2026',
    descrizione: 'Scadenza presentazione domande per concorsi docenti secondaria e infanzia/primaria.',
    normativa: 'D.D. 987/2026, D.D. 988/2026, D.D. 989/2026',
    soggettiCoinvolti: ['docenti', 'aspiranti_docenti'],
    dataScadenza: '2026-04-30',
    priorita: 'media',
    impatto: 'nazionale',
    conseguenzeNonAzione: 'Non sarà possibile partecipare ai concorsi. I posti non assegnati verranno coperti tramite scorrimento GPS o nuovi bandi.',
    link: 'https://www.mim.gov.it/concorsi-2026',
    tipo: 'Concorsi',
    guidaOperativa: 'Verificare requisiti sul bando. Preparare documentazione. Accedere a POLIS. Compilare domanda scegliendo le classi di concorso.',
  },
  {
    id: 'intel-deadline-4',
    titolo: 'Iscrizione corsi formazione SOFIA',
    descrizione: 'Termine iscrizione ai corsi formazione riconosciuti sulla piattaforma SOFIA per l\'a.s. 2025/2026.',
    normativa: 'D.M. 170/2025 (Sistema di formazione in servizio)',
    soggettiCoinvolti: ['docenti', 'ata', 'educatori'],
    dataScadenza: '2026-06-30',
    priorita: 'alta',
    impatto: 'nazionale',
    conseguenzeNonAzione: 'Mancata formazione: il docente non matura il credito formativo annuale obbligatorio. Possibili riflessi sulla progressione di carriera.',
    link: 'https://sofia.mim.gov.it',
    tipo: 'Formazione',
    guidaOperativa: 'Accedere a SOFIA con SPID. Scegliere il corso. Iscriversi. Completare il percorso formativo entro la scadenza indicata.',
  },
  {
    id: 'intel-deadline-5',
    titolo: 'Conferimento incarichi da GPS a.s. 2026/2027',
    descrizione: 'Avvio procedure di conferimento incarichi di supplenza da GPS per il nuovo anno scolastico.',
    normativa: 'D.Lgs. 59/2017, art. 12',
    soggettiCoinvolti: ['docenti', 'sostegno'],
    dataScadenza: '2026-09-15',
    priorita: 'alta',
    impatto: 'nazionale',
    conseguenzeNonAzione: 'Il candidato ha 24 ore per accettare. La rinuncia senza giustificato motivo comporta: prima rinuncia = 1 anno di esclusione; seconda rinuncia = esclusione definitiva.',
    link: '',
    tipo: 'GPS',
    guidaOperativa: 'Mantenere aggiornato il recapito telefonico e l\'indirizzo PEC. Rispondere alla convocazione entro 24 ore. Verificare la documentazione richiesta.',
  },
];

export function generaDatiDataJournalism(): SezioneIntelligence[] {
  return [
    {
      titolo: 'Andamento Reclutamento 2026',
      descrizione: 'Dati aggregati sulle procedure concorsuali e di reclutamento in corso.',
      dati: [
        { label: 'Posti concorso ordinario secondaria', valore: '20.000', trend: 'up', confronto: '+15% vs 2024', fonte: 'MIM D.D. 987/2026' },
        { label: 'Posti TFA Sostegno VIII ciclo', valore: '12.000', trend: 'up', confronto: '+10% vs VII ciclo', fonte: 'MIM D.D. 1025/2026' },
        { label: 'Iscritti GPS (stima)', valore: '800.000', trend: 'stable', confronto: 'invariato vs 2024', fonte: 'MIM banche dati' },
        { label: 'Posti concorso infanzia/primaria', valore: '12.000', trend: 'up', confronto: '+20% vs 2024', fonte: 'MIM D.D. 989/2026' },
      ],
    },
    {
      titolo: 'Trend Abilitazioni e Formazione',
      descrizione: 'Evoluzione dei percorsi di abilitazione e formazione docenti.',
      dati: [
        { label: 'Università con percorsi 60 CFU', valore: '5', trend: 'up', confronto: 'vs 0 nel 2024', fonte: 'MIM/Indire' },
        { label: 'Posti TFA Sostegno totali (8 cicli)', valore: '85.000', trend: 'up', confronto: '+5% annuo', fonte: 'MIM' },
        { label: 'Docenti in formazione su SOFIA', valore: '450.000', trend: 'stable', confronto: 'invariato', fonte: 'MIM' },
      ],
    },
  ];
}

export function getTargetFromCategory(cat: string): TargetUtente[] {
  const map: Record<string, TargetUtente[]> = {
    GPS: ['docenti', 'aspiranti_docenti', 'sostegno'],
    Concorsi: ['docenti', 'aspiranti_docenti'],
    ATA: ['ata', 'amministrativi', 'collaboratori'],
    Riforme: ['docenti', 'dirigenti', 'dsga', 'universita'],
    TFA: ['docenti', 'aspiranti_docenti', 'sostegno'],
    Formazione: ['docenti', 'ata', 'educatori'],
    MAD: ['aspiranti_docenti'],
    Mobilità: ['docenti', 'ata', 'dirigenti'],
    Docenti: ['docenti', 'aspiranti_docenti'],
    Bandi: ['ata', 'docenti', 'amministrativi', 'dsga'],
    Inclusione: ['sostegno', 'docenti', 'educatori', 'famiglie'],
  };
  return map[cat] || ['docenti'];
}
