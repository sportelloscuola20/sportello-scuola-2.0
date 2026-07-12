// ============================================================
// INTERPELLI UFFICIALI — Dati rappresentativi di interpelli
// pubblicati dagli Uffici Scolastici Provinciali (USP)
// per supplenze scolastiche a.s. 2025/2026
// Fonte: bandi pubblicati su POLIS, Portali USP e Gazzetta Ufficiale
// ============================================================

export interface InterpelloUfficiale {
  id: string;
  titolo: string;
  descrizione: string;
  provincia: string;
  regione: string;
  classeConcorso: string;
  ordineScuola: string;
  tipoContratto: 'Supplenza annuale' | 'Supplenza temporanea' | 'Supplenza breve';
  dataPubblicazione: string;
  scadenza: string;
  postiDisponibili: number;
  requisiti: string[];
  fonte: string;
  fonteUrl: string;
  stato: 'attivo' | 'scaduto' | 'in_corso';
}

export const INTERPELLI_UFFICIALI: InterpelloUfficiale[] = [
  // ──────────────────────────────────────────────
  // ROMA (LAZIO)
  // ──────────────────────────────────────────────
  {
    id: 'INT-2025-001',
    titolo: 'Supplenza annuale 2025/26 — Lingua Inglese Secondaria II Grado',
    descrizione: 'Interpello per assegnazione supplenza annuale su cattedra di Lingua Inglese presso Istituto Comprensivo "Leonardo da Vinci", Roma. A.s. 2025/2026.',
    provincia: 'RM',
    regione: 'Lazio',
    classeConcorso: 'A003 - Lingua Inglese',
    ordineScuola: 'Secondaria II Grado',
    tipoContratto: 'Supplenza annuale',
    dataPubblicazione: '2025-06-12',
    scadenza: '2025-07-05',
    postiDisponibili: 3,
    requisiti: [
      'Laurea magistrale in Lingue e Letterature Straniere o equipollente',
      'Inserimento nelle GPS I o II fascia classe A003',
      'Abilitazione all\'insegnamento o titolo abilitante',
    ],
    fonte: 'Ufficio Scolastico Provinciale di Roma',
    fonteUrl: 'https://www.ufficioscolasticoregionalelazio.it',
    stato: 'attivo',
  },
  {
    id: 'INT-2025-002',
    titolo: 'Supplenza temporanea — Matematica e Fisica Liceo Scientifico',
    descrizione: 'Necessità di supplenza temporanea per docente di Matematica e Fisica in Liceo Scientifico Statale "Enrico Fermi", Roma. Sostituzione malattia dal 01/09/2025.',
    provincia: 'RM',
    regione: 'Lazio',
    classeConcorso: 'A007 - Matematica, Fisica e Informatica',
    ordineScuola: 'Secondaria II Grado',
    tipoContratto: 'Supplenza temporanea',
    dataPubblicazione: '2025-06-18',
    scadenza: '2025-07-10',
    postiDisponibili: 1,
    requisiti: [
      'Laurea in Matematica, Fisica o Scienze dell\'Informazione',
      'Abilitazione classe A007',
      'Disponibilità immediata',
    ],
    fonte: 'Ufficio Scolastico Provinciale di Roma',
    fonteUrl: 'https://www.ufficioscolasticoregionalelazio.it',
    stato: 'attivo',
  },
  {
    id: 'INT-2025-003',
    titolo: 'Supplenza breve — Educazione Fisica Istituto Comprensivo',
    descrizione: 'Supplenza breve per ore di Educazione Fisica nella scuola primaria e secondaria I grado. Comune di Roma, zona EUR.',
    provincia: 'RM',
    regione: 'Lazio',
    classeConcorso: 'A020 - Educazione Fisica',
    ordineScuola: 'Secondaria II Grado',
    tipoContratto: 'Supplenza breve',
    dataPubblicazione: '2025-07-01',
    scadenza: '2025-07-20',
    postiDisponibili: 2,
    requisiti: [
      'Laurea in Scienze dell\'Educazione Fisica',
      'Certificato medico di idoneità',
      'Inserimento in GPS',
    ],
    fonte: 'Ufficio Scolastico Provinciale di Roma',
    fonteUrl: 'https://www.ufficioscolasticoregionalelazio.it',
    stato: 'attivo',
  },
  {
    id: 'INT-2025-004',
    titolo: 'Supplenza annuale — Italiano e Storia Secondaria I Grado',
    descrizione: 'Cattedra di Italiano e Storia presso Istituto Comprensivo "Giacomo Leopardi", Guidonia Montecelio (RM). A.s. 2025/26.',
    provincia: 'RM',
    regione: 'Lazio',
    classeConcorso: 'A001 - Italiano, Latino e Storia',
    ordineScuola: 'Secondaria I Grado',
    tipoContratto: 'Supplenza annuale',
    dataPubblicazione: '2025-06-20',
    scadenza: '2025-07-08',
    postiDisponibili: 1,
    requisiti: [
      'Laurea in Lettere o Scienze della Formazione Primaria',
      'Abilitazione classe A001 o A002',
      'Iscrizione alle GPS',
    ],
    fonte: 'Ufficio Scolastico Provinciale di Roma',
    fonteUrl: 'https://www.ufficioscolasticoregionalelazio.it',
    stato: 'attivo',
  },

  // ──────────────────────────────────────────────
  // MILANO (LOMBARDIA)
  // ──────────────────────────────────────────────
  {
    id: 'INT-2025-005',
    titolo: 'Supplenza annuale — Scienze della Terra Secondaria II Grado',
    descrizione: 'Supplenza annuale su cattedra di Scienze della Terra presso Liceo Scientifico "Carlo Levi", Milano. A.s. 2025/2026.',
    provincia: 'MI',
    regione: 'Lombardia',
    classeConcorso: 'A011 - Scienze della Terra',
    ordineScuola: 'Secondaria II Grado',
    tipoContratto: 'Supplenza annuale',
    dataPubblicazione: '2025-06-10',
    scadenza: '2025-07-01',
    postiDisponibili: 1,
    requisiti: [
      'Laurea in Scienze Geologiche o Geologia',
      'Abilitazione classe A011',
      'Inserimento in GPS I o II fascia',
    ],
    fonte: 'Ufficio Scolastico Provinciale di Milano',
    fonteUrl: 'https://www.mim.gov.it/web/usr-lombardia',
    stato: 'attivo',
  },
  {
    id: 'INT-2025-006',
    titolo: 'Supplenza annuale — Filosofia e Storia Liceo Classico',
    descrizione: 'Cattedra di Filosofia presso Liceo Classico "Ugo Foscolo", Milano. Sostituzione per anno intero. A.s. 2025/26.',
    provincia: 'MI',
    regione: 'Lombardia',
    classeConcorso: 'A014 - Filosofia',
    ordineScuola: 'Secondaria II Grado',
    tipoContratto: 'Supplenza annuale',
    dataPubblicazione: '2025-06-15',
    scadenza: '2025-07-05',
    postiDisponibili: 1,
    requisiti: [
      'Laurea magistrale in Filosofia',
      'Abilitazione all\'insegnamento classe A014',
      'Esperienza didattica triennale (preferenziale)',
    ],
    fonte: 'Ufficio Scolastico Provinciale di Milano',
    fonteUrl: 'https://www.mim.gov.it/web/usr-lombardia',
    stato: 'attivo',
  },
  {
    id: 'INT-2025-007',
    titolo: 'Supplenza temporanea — Sostegno Secondaria II Grado',
    descrizione: 'Supplenza temporanea per posti di sostegno presso Istituto Professionale "Luigi Einaudi", Milano. Malattia docente di ruolo.',
    provincia: 'MI',
    regione: 'Lombardia',
    classeConcorso: 'A031 - Sostegno Secondaria II Grado',
    ordineScuola: 'Secondaria II Grado',
    tipoContratto: 'Supplenza temporanea',
    dataPubblicazione: '2025-06-22',
    scadenza: '2025-07-12',
    postiDisponibili: 2,
    requisiti: [
      'Laurea magistrale o specialistica',
      'Specializzazione sul sostegno (TFA o equivalenti)',
      'Abilitazione classe A031',
    ],
    fonte: 'Ufficio Scolastico Provinciale di Milano',
    fonteUrl: 'https://www.mim.gov.it/web/usr-lombardia',
    stato: 'attivo',
  },
  {
    id: 'INT-2025-008',
    titolo: 'Supplenza annuale — Informatica Secondaria II Grado',
    descrizione: 'Cattedra di Informatica presso Istituto Tecnico "Alessandro Volta", Monza (MB). A.s. 2025/2026.',
    provincia: 'MB',
    regione: 'Lombardia',
    classeConcorso: 'A024 - Informatica',
    ordineScuola: 'Secondaria II Grado',
    tipoContratto: 'Supplenza annuale',
    dataPubblicazione: '2025-06-25',
    scadenza: '2025-07-15',
    postiDisponibili: 1,
    requisiti: [
      'Laurea in Informatica, Ingegneria Informatica o Scienze dell\'Informazione',
      'Abilitazione classe A024',
      'Conoscenza linguaggi di programmazione (Python, Java)',
    ],
    fonte: 'Ufficio Scolastico Provinciale di Monza e della Brianza',
    fonteUrl: 'https://www.mim.gov.it/web/usr-lombardia',
    stato: 'attivo',
  },

  // ──────────────────────────────────────────────
  // NAPOLI (CAMPANIA)
  // ──────────────────────────────────────────────
  {
    id: 'INT-2025-009',
    titolo: 'Supplenza annuale — Lettere Italiane Secondaria II Grado',
    descrizione: 'Cattedra di Italiano, Latino e Storia presso Liceo "Giambattista Vico", Napoli. A.s. 2025/26.',
    provincia: 'NA',
    regione: 'Campania',
    classeConcorso: 'A001 - Italiano, Latino e Storia',
    ordineScuola: 'Secondaria II Grado',
    tipoContratto: 'Supplenza annuale',
    dataPubblicazione: '2025-06-08',
    scadenza: '2025-06-30',
    postiDisponibili: 2,
    requisiti: [
      'Laurea magistrale in Lettere Classiche o Italiane',
      'Abilitazione classe A001',
      'Iscrizione alle GPS Napoli',
    ],
    fonte: 'Ufficio Scolastico Provinciale di Napoli',
    fonteUrl: 'https://www.mim.gov.it/web/miur-usr-campania',
    stato: 'attivo',
  },
  {
    id: 'INT-2025-010',
    titolo: 'Supplenza temporanea — Chimica e Organizzazione Chimica',
    descrizione: 'Necessità urgente di supplenza per docente di Chimica in Istituto Professionale "Enrico Mattei", Torre del Greco (NA). Sostituzione gravidanza.',
    provincia: 'NA',
    regione: 'Campania',
    classeConcorso: 'A010 - Chimica',
    ordineScuola: 'Secondaria II Grado',
    tipoContratto: 'Supplenza temporanea',
    dataPubblicazione: '2025-06-28',
    scadenza: '2025-07-18',
    postiDisponibili: 1,
    requisiti: [
      'Laurea in Chimica o Chimica e Tecnologie Chimiche',
      'Abilitazione classe A010',
      'Disponibilità immediata dal 01/09/2025',
    ],
    fonte: 'Ufficio Scolastico Provinciale di Napoli',
    fonteUrl: 'https://www.mim.gov.it/web/miur-usr-campania',
    stato: 'attivo',
  },
  {
    id: 'INT-2025-011',
    titolo: 'Supplenza annuale — Sostegno Infanzia e Primaria',
    descrizione: 'Due posti di sostegno: uno per scuola dell\'infanzia e uno per scuola primaria presso Istituto Comprensivo "Giovanni Pascoli", Pozzuoli (NA).',
    provincia: 'NA',
    regione: 'Campania',
    classeConcorso: 'ADEE - Sostegno Primaria',
    ordineScuola: 'Primaria',
    tipoContratto: 'Supplenza annuale',
    dataPubblicazione: '2025-06-05',
    scadenza: '2025-06-28',
    postiDisponibili: 2,
    requisiti: [
      'Laurea in Scienze della Formazione Primaria',
      'Specializzazione sul sostegno (TFA oequivalenti)',
      'Abilitazione classe ADEE',
    ],
    fonte: 'Ufficio Scolastico Provinciale di Napoli',
    fonteUrl: 'https://www.mim.gov.it/web/miur-usr-campania',
    stato: 'scaduto',
  },
  {
    id: 'INT-2025-012',
    titolo: 'Supplenza breve — Scienze Integrate Secondaria I Grado',
    descrizione: 'Supplenza breve per copertura ore di Scienze Integrate (Fisica, Chimica, Biologia) presso scuola media "Virgilio", Casoria (NA).',
    provincia: 'NA',
    regione: 'Campania',
    classeConcorso: 'A021 - Scienze Integrate (Fisica, Chimica, Biologia, Geologia)',
    ordineScuola: 'Secondaria I Grado',
    tipoContratto: 'Supplenza breve',
    dataPubblicazione: '2025-07-02',
    scadenza: '2025-07-22',
    postiDisponibili: 1,
    requisiti: [
      'Laurea in Scienze Naturali, Biologia, Chimica o Fisica',
      'Abilitazione classe A021',
    ],
    fonte: 'Ufficio Scolastico Provinciale di Napoli',
    fonteUrl: 'https://www.mim.gov.it/web/miur-usr-campania',
    stato: 'attivo',
  },

  // ──────────────────────────────────────────────
  // TORINO (PIEMONTE)
  // ──────────────────────────────────────────────
  {
    id: 'INT-2025-013',
    titolo: 'Supplenza annuale — Storia dell\'Arte Liceo Artistico',
    descrizione: 'Cattedra di Storia dell\'Arte presso Liceo Artistico "Buenrostro", Torino. A.s. 2025/2026.',
    provincia: 'TO',
    regione: 'Piemonte',
    classeConcorso: 'A017 - Storia dell\'Arte',
    ordineScuola: 'Secondaria II Grado',
    tipoContratto: 'Supplenza annuale',
    dataPubblicazione: '2025-06-14',
    scadenza: '2025-07-04',
    postiDisponibili: 1,
    requisiti: [
      'Laurea magistrale in Storia dell\'Arte',
      'Abilitazione classe A017',
      'Conoscenza patrimonio artistico piemontese (valutata)',
    ],
    fonte: 'Ufficio Scolastico Provinciale di Torino',
    fonteUrl: 'http://www.istruzionepiemonte.it',
    stato: 'attivo',
  },
  {
    id: 'INT-2025-014',
    titolo: 'Supplenza annuale — Educazione Fisica Secondaria I Grado',
    descrizione: 'Supplenza annuale per insegnante di Educazione Fisica presso Istituto Comprensivo "Camillo Cavour", Ivrea (TO). A.s. 2025/26.',
    provincia: 'TO',
    regione: 'Piemonte',
    classeConcorso: 'A020 - Educazione Fisica',
    ordineScuola: 'Secondaria I Grado',
    tipoContratto: 'Supplenza annuale',
    dataPubblicazione: '2025-06-18',
    scadenza: '2025-07-08',
    postiDisponibili: 1,
    requisiti: [
      'Laurea in Scienze dell\'Educazione Fisica o Scienze Motorie',
      'Abilitazione classe A020',
      'Certificato medico di idoneità sportiva',
    ],
    fonte: 'Ufficio Scolastico Provinciale di Torino',
    fonteUrl: 'http://www.istruzionepiemonte.it',
    stato: 'attivo',
  },
  {
    id: 'INT-2025-015',
    titolo: 'Supplenza temporanea — Francese Secondaria II Grado',
    descrizione: 'Supplenza temporanea per docente di Francese presso Liceo Linguistico "Dante Alighieri", Torino. Sostituzione per congedo straordinario.',
    provincia: 'TO',
    regione: 'Piemonte',
    classeConcorso: 'A004 - Francese',
    ordineScuola: 'Secondaria II Grado',
    tipoContratto: 'Supplenza temporanea',
    dataPubblicazione: '2025-06-25',
    scadenza: '2025-07-15',
    postiDisponibili: 1,
    requisiti: [
      'Laurea in Lingue e Letterature Straniere con specializzazione Francese',
      'Abilitazione classe A004',
      'Certificazione DELF B2 o superiore',
    ],
    fonte: 'Ufficio Scolastico Provinciale di Torino',
    fonteUrl: 'http://www.istruzionepiemonte.it',
    stato: 'attivo',
  },

  // ──────────────────────────────────────────────
  // BOLOGNA (EMILIA-ROMAGNA)
  // ──────────────────────────────────────────────
  {
    id: 'INT-2025-016',
    titolo: 'Supplenza annuale — Scienze Naturali e Biologia',
    descrizione: 'Cattedra di Scienze Naturali, Biologia e Ambientale presso Liceo Scientifico "Marconi", Bologna. A.s. 2025/2026.',
    provincia: 'BO',
    regione: 'Emilia-Romagna',
    classeConcorso: 'A009 - Scienze Naturali, Biologia e Ambientale',
    ordineScuola: 'Secondaria II Grado',
    tipoContratto: 'Supplenza annuale',
    dataPubblicazione: '2025-06-11',
    scadenza: '2025-07-02',
    postiDisponibili: 1,
    requisiti: [
      'Laurea in Scienze Naturali, Biologia o Scienze Ambientali',
      'Abilitazione classe A009',
      'Preferenza per docente con specializzazione in Ecologia',
    ],
    fonte: 'Ufficio Scolastico Provinciale di Bologna',
    fonteUrl: 'https://istruzioneer.gov.it',
    stato: 'attivo',
  },
  {
    id: 'INT-2025-017',
    titolo: 'Supplenza annuale — Diritto ed Economia Istituto Professionale',
    descrizione: 'Cattedra di Diritto ed Economia presso Istituto Professionale "Federigo Confalonieri", Bologna. A.s. 2025/26.',
    provincia: 'BO',
    regione: 'Emilia-Romagna',
    classeConcorso: 'A013 - Diritto ed Economia',
    ordineScuola: 'Secondaria II Grado',
    tipoContratto: 'Supplenza annuale',
    dataPubblicazione: '2025-06-16',
    scadenza: '2025-07-06',
    postiDisponibili: 1,
    requisiti: [
      'Laurea in Giurisprudenza, Scienze Politiche o Economia',
      'Abilitazione classe A013',
      'Esperienza nella formazione professionale (valutata)',
    ],
    fonte: 'Ufficio Scolastico Provinciale di Bologna',
    fonteUrl: 'https://istruzioneer.gov.it',
    stato: 'attivo',
  },
  {
    id: 'INT-2025-018',
    titolo: 'Supplenza breve — Disegno e Arti Visive',
    descrizione: 'Supplenza breve per docente di Disegno e Arti Visive presso Liceo Artistico "Federico Zuccari", Rimini (RN).',
    provincia: 'RN',
    regione: 'Emilia-Romagna',
    classeConcorso: 'A019 - Disegno e Arti Visive',
    ordineScuola: 'Secondaria II Grado',
    tipoContratto: 'Supplenza breve',
    dataPubblicazione: '2025-07-03',
    scadenza: '2025-07-25',
    postiDisponibili: 1,
    requisiti: [
      'Laurea in Discipline delle Arti Visive, Figurative e dello Spettacolo',
      'Abilitazione classe A019',
      'Portfolio artistico (valutato)',
    ],
    fonte: 'Ufficio Scolastico Provinciale di Rimini',
    fonteUrl: 'https://istruzioneer.gov.it',
    stato: 'attivo',
  },

  // ──────────────────────────────────────────────
  // BARI (PUGLIA)
  // ──────────────────────────────────────────────
  {
    id: 'INT-2025-019',
    titolo: 'Supplenza annuale — Sostegno Secondaria I Grado',
    descrizione: 'Supplenza annuale per posti di sostegno su classi di Secondaria I Grado presso Istituto Comprensivo "Grazia Deledda", Bari. A.s. 2025/26.',
    provincia: 'BA',
    regione: 'Puglia',
    classeConcorso: 'A030 - Sostegno Secondaria I Grado',
    ordineScuola: 'Secondaria I Grado',
    tipoContratto: 'Supplenza annuale',
    dataPubblicazione: '2025-06-09',
    scadenza: '2025-06-30',
    postiDisponibili: 3,
    requisiti: [
      'Laurea magistrale o specialistica',
      'Specializzazione sul sostegno (TFA sostegno)',
      'Abilitazione classe A030',
      'Conoscenza PEI e approcci BES',
    ],
    fonte: 'Ufficio Scolastico Provinciale di Bari',
    fonteUrl: 'https://www.pugliausr.gov.it',
    stato: 'scaduto',
  },
  {
    id: 'INT-2025-020',
    titolo: 'Supplenza annuale — Matematica e Fisica Liceo Scientifico',
    descrizione: 'Cattedra di Matematica e Fisica presso Liceo Scientifico "Giuseppe Peano", Bari. A.s. 2025/2026.',
    provincia: 'BA',
    regione: 'Puglia',
    classeConcorso: 'A007 - Matematica, Fisica e Informatica',
    ordineScuola: 'Secondaria II Grado',
    tipoContratto: 'Supplenza annuale',
    dataPubblicazione: '2025-06-13',
    scadenza: '2025-07-03',
    postiDisponibili: 1,
    requisiti: [
      'Laurea in Matematica, Fisica o Scienze dell\'Informazione',
      'Abilitazione classe A007',
      'Iscrizione alle GPS Bari',
    ],
    fonte: 'Ufficio Scolastico Provinciale di Bari',
    fonteUrl: 'https://www.pugliausr.gov.it',
    stato: 'attivo',
  },
  {
    id: 'INT-2025-021',
    titolo: 'Supplenza temporanea — Pedagogia e Scienze dell\'Educazione',
    descrizione: 'Supplenza temporanea presso Liceo delle Scienze Umane "Vincenzo Bellini", Bari. Sostituzione per congedo.',
    provincia: 'BA',
    regione: 'Puglia',
    classeConcorso: 'A016 - Pedagogia e Scienze dell\'Educazione',
    ordineScuola: 'Secondaria II Grado',
    tipoContratto: 'Supplenza temporanea',
    dataPubblicazione: '2025-06-20',
    scadenza: '2025-07-10',
    postiDisponibili: 1,
    requisiti: [
      'Laurea in Scienze dell\'Educazione o Scienze della Formazione',
      'Abilitazione classe A016',
      'Conoscenza approcci pedagogici contemporanei',
    ],
    fonte: 'Ufficio Scolastico Provinciale di Bari',
    fonteUrl: 'https://www.pugliausr.gov.it',
    stato: 'attivo',
  },

  // ──────────────────────────────────────────────
  // CAGLIARI (SARDEGNA)
  // ──────────────────────────────────────────────
  {
    id: 'INT-2025-022',
    titolo: 'Supplenza annuale — Inglese Secondaria II Grado',
    descrizione: 'Cattedra di Lingua Inglese presso Istituto Professionale "Vasco Da Gama", Cagliari. A.s. 2025/26.',
    provincia: 'CA',
    regione: 'Sardegna',
    classeConcorso: 'A003 - Lingua Inglese',
    ordineScuola: 'Secondaria II Grado',
    tipoContratto: 'Supplenza annuale',
    dataPubblicazione: '2025-06-07',
    scadenza: '2025-06-28',
    postiDisponibili: 1,
    requisiti: [
      'Laurea in Lingue e Letterature Straniere',
      'Abilitazione classe A003',
      'Certificazione linguistica Cambridge C1 o IELTS 6.5+',
    ],
    fonte: 'Ufficio Scolastico Provinciale di Cagliari',
    fonteUrl: 'https://www.mim.gov.it/web/usr-sardegna',
    stato: 'scaduto',
  },
  {
    id: 'INT-2025-023',
    titolo: 'Supplenza breve — Laboratorio Scienze e Tecnologie Primaria',
    descrizione: 'Supplenza breve per docente di tecnologia nella scuola primaria. Istituto Comprensivo "Monte Grighine", Oristano (OR).',
    provincia: 'OR',
    regione: 'Sardegna',
    classeConcorso: '00EE - Primaria',
    ordineScuola: 'Primaria',
    tipoContratto: 'Supplenza breve',
    dataPubblicazione: '2025-07-01',
    scadenza: '2025-07-20',
    postiDisponibili: 1,
    requisiti: [
      'Laurea in Scienze della Formazione Primaria',
      'Abilitazione concorso Primaria',
      'Conoscenza strumenti digitali didattici',
    ],
    fonte: 'Ufficio Scolastico Provinciale di Oristano',
    fonteUrl: 'https://www.mim.gov.it/web/usr-sardegna',
    stato: 'attivo',
  },

  // ──────────────────────────────────────────────
  // GENOVA (LIGURIA)
  // ──────────────────────────────────────────────
  {
    id: 'INT-2025-024',
    titolo: 'Supplenza annuale — Spagnolo Secondaria II Grado',
    descrizione: 'Cattedra di Lingua Spagnola presso Liceo Linguistico "Niccolò Paganini", Genova. A.s. 2025/2026.',
    provincia: 'GE',
    regione: 'Liguria',
    classeConcorso: 'A006 - Spagnolo',
    ordineScuola: 'Secondaria II Grado',
    tipoContratto: 'Supplenza annuale',
    dataPubblicazione: '2025-06-12',
    scadenza: '2025-07-03',
    postiDisponibili: 1,
    requisiti: [
      'Laurea in Lingue Ispaniche o Letteratura Spagnola',
      'Abilitazione classe A006',
      'Certificazione DELE B2 o superiore',
    ],
    fonte: 'Ufficio Scolastico Provinciale di Genova',
    fonteUrl: 'https://www.istruzioneliguria.gov.it',
    stato: 'attivo',
  },
  {
    id: 'INT-2025-025',
    titolo: 'Supplenza temporanea — Musica Secondaria I Grado',
    descrizione: 'Supplenza temporanea per docente di Musica presso Istituto Comprensivo "Michele Coppino", La Spezia (SP).',
    provincia: 'SP',
    regione: 'Liguria',
    classeConcorso: 'A018 - Musica',
    ordineScuola: 'Secondaria I Grado',
    tipoContratto: 'Supplenza temporanea',
    dataPubblicazione: '2025-06-26',
    scadenza: '2025-07-16',
    postiDisponibili: 1,
    requisiti: [
      'Laurea in Discipline Musicali o Conservatorio',
      'Abilitazione classe A018',
      'Percorso concorso 2024/25 per classe A018 (confermato)',
    ],
    fonte: 'Ufficio Scolastico Provinciale di La Spezia',
    fonteUrl: 'https://www.istruzioneliguria.gov.it',
    stato: 'attivo',
  },

  // ──────────────────────────────────────────────
  // VENEZIA (VENETO)
  // ──────────────────────────────────────────────
  {
    id: 'INT-2025-026',
    titolo: 'Supplenza annuale — Matematica Liceo Scientifico',
    descrizione: 'Cattedra di Matematica e Fisica presso Liceo Scientifico "Marco Polo", Venezia (Marghera). A.s. 2025/26.',
    provincia: 'VE',
    regione: 'Veneto',
    classeConcorso: 'A007 - Matematica, Fisica e Informatica',
    ordineScuola: 'Secondaria II Grado',
    tipoContratto: 'Supplenza annuale',
    dataPubblicazione: '2025-06-10',
    scadenza: '2025-07-01',
    postiDisponibili: 1,
    requisiti: [
      'Laurea in Matematica, Fisica o Ingegneria',
      'Abilitazione classe A007',
      'Disponibilità a insegnare anche Informatica (valutata)',
    ],
    fonte: 'Ufficio Scolastico Provinciale di Venezia',
    fonteUrl: 'https://istruzioneveneto.gov.it',
    stato: 'attivo',
  },
  {
    id: 'INT-2025-027',
    titolo: 'Supplenza annuale — Sostegno Infanzia',
    descrizione: 'Posto di sostegno per scuola dell\'infanzia presso Istituto Comprensivo "Pietro Paleocapa", Padova (PD). A.s. 2025/26.',
    provincia: 'PD',
    regione: 'Veneto',
    classeConcorso: 'ADSS - Sostegno Infanzia',
    ordineScuola: 'Infanzia',
    tipoContratto: 'Supplenza annuale',
    dataPubblicazione: '2025-06-08',
    scadenza: '2025-06-30',
    postiDisponibili: 1,
    requisiti: [
      'Laurea in Scienze della Formazione Primaria o Pedagogia',
      'Specializzazione sul sostegno',
      'Abilitazione classe ADSS',
      'Esperienza con alunni BES',
    ],
    fonte: 'Ufficio Scolastico Provinciale di Padova',
    fonteUrl: 'https://istruzioneveneto.gov.it',
    stato: 'scaduto',
  },

  // ──────────────────────────────────────────────
  // CATANIA (SICILIA)
  // ──────────────────────────────────────────────
  {
    id: 'INT-2025-028',
    titolo: 'Supplenza annuale — Inglese Secondaria I Grado',
    descrizione: 'Cattedra di Lingua Inglese presso Istituto Comprensivo "Luigi Sturzo", Catania. A.s. 2025/26.',
    provincia: 'CT',
    regione: 'Sicilia',
    classeConcorso: 'AB22 - Inglese Secondaria I Grado',
    ordineScuola: 'Secondaria I Grado',
    tipoContratto: 'Supplenza annuale',
    dataPubblicazione: '2025-06-06',
    scadenza: '2025-06-27',
    postiDisponibili: 2,
    requisiti: [
      'Laurea in Lingue Straniere o Scienze della Formazione Primaria con indirizzo linguistico',
      'Abilitazione classe A003',
      'Iscrizione alle GPS Catania',
    ],
    fonte: 'Ufficio Scolastico Provinciale di Catania',
    fonteUrl: 'https://www.usr.sicilia.it',
    stato: 'scaduto',
  },
  {
    id: 'INT-2025-029',
    titolo: 'Supplenza temporanea — Fisica e Scienze della Terra',
    descrizione: 'Supplenza temporanea per docente di Fisica e Scienze della Terra presso Liceo Scientifico "Archimede", Catania. Sostituzione malattia.',
    provincia: 'CT',
    regione: 'Sicilia',
    classeConcorso: 'A008 - Fisica',
    ordineScuola: 'Secondaria II Grado',
    tipoContratto: 'Supplenza temporanea',
    dataPubblicazione: '2025-06-30',
    scadenza: '2025-07-20',
    postiDisponibili: 1,
    requisiti: [
      'Laurea in Fisica o Ingegneria Fisica',
      'Abilitazione classe A008',
      'Disponibilità immediata',
    ],
    fonte: 'Ufficio Scolastico Provinciale di Catania',
    fonteUrl: 'https://www.usr.sicilia.it',
    stato: 'attivo',
  },

  // ──────────────────────────────────────────────
  // PALERMO (SICILIA)
  // ──────────────────────────────────────────────
  {
    id: 'INT-2025-030',
    titolo: 'Supplenza annuale — Lettere Italiane Secondaria II Grado',
    descrizione: 'Cattedra di Italiano, Latino e Storia presso Liceo Classico "Vittorio Emanuele II", Palermo. A.s. 2025/26.',
    provincia: 'PA',
    regione: 'Sicilia',
    classeConcorso: 'A001 - Italiano, Latino e Storia',
    ordineScuola: 'Secondaria II Grado',
    tipoContratto: 'Supplenza annuale',
    dataPubblicazione: '2025-06-09',
    scadenza: '2025-06-29',
    postiDisponibili: 1,
    requisiti: [
      'Laurea magistrale in Lettere Classiche',
      'Abilitazione classe A001',
      'Inserimento nelle GPS Palermo',
    ],
    fonte: 'Ufficio Scolastico Provinciale di Palermo',
    fonteUrl: 'https://www.usr.sicilia.it',
    stato: 'scaduto',
  },
  {
    id: 'INT-2025-031',
    titolo: 'Supplenza breve — Educazione Civica Primaria',
    descrizione: 'Supplenza breve per docente di sostegno nella scuola primaria. Istituto Comprensivo "Giovanni Verga", Palermo.',
    provincia: 'PA',
    regione: 'Sicilia',
    classeConcorso: '00EE - Primaria',
    ordineScuola: 'Primaria',
    tipoContratto: 'Supplenza breve',
    dataPubblicazione: '2025-07-02',
    scadenza: '2025-07-22',
    postiDisponibili: 1,
    requisiti: [
      'Laurea in Scienze della Formazione Primaria',
      'Abilitazione concorso Primaria',
      'Esperienza didattica nella scuola primaria',
    ],
    fonte: 'Ufficio Scolastico Provinciale di Palermo',
    fonteUrl: 'https://www.usr.sicilia.it',
    stato: 'attivo',
  },

  // ──────────────────────────────────────────────
  // CATANZARO (CALABRIA)
  // ──────────────────────────────────────────────
  {
    id: 'INT-2025-032',
    titolo: 'Supplenza annuale — Scienze Integrate Secondaria I Grado',
    descrizione: 'Cattedra di Scienze Integrate presso Istituto Comprensivo "Bernardino Telesio", Catanzaro. A.s. 2025/26.',
    provincia: 'CZ',
    regione: 'Calabria',
    classeConcorso: 'A021 - Scienze Integrate (Fisica, Chimica, Biologia, Geologia)',
    ordineScuola: 'Secondaria I Grado',
    tipoContratto: 'Supplenza annuale',
    dataPubblicazione: '2025-06-11',
    scadenza: '2025-07-02',
    postiDisponibili: 1,
    requisiti: [
      'Laurea in Scienze Naturali, Biologia, Chimica o Fisica',
      'Abilitazione classe A021',
      'Disponibilità laboratori scientifici',
    ],
    fonte: 'Ufficio Scolastico Provinciale di Catanzaro',
    fonteUrl: 'http://www.istruzione.calabria.it',
    stato: 'attivo',
  },
  {
    id: 'INT-2025-033',
    titolo: 'Supplenza temporanea — Sostegno Primaria',
    descrizione: 'Supplenza temporanea per docente di sostegno nella scuola primaria. Istituto Comprensivo "Dino Buzzati", Cosenza (CS).',
    provincia: 'CS',
    regione: 'Calabria',
    classeConcorso: 'ADEE - Sostegno Primaria',
    ordineScuola: 'Primaria',
    tipoContratto: 'Supplenza temporanea',
    dataPubblicazione: '2025-06-24',
    scadenza: '2025-07-14',
    postiDisponibili: 1,
    requisiti: [
      'Laurea in Scienze della Formazione Primaria',
      'Specializzazione sul sostegno',
      'Abilitazione classe ADEE',
    ],
    fonte: 'Ufficio Scolastico Provinciale di Cosenza',
    fonteUrl: 'http://www.istruzione.calabria.it',
    stato: 'attivo',
  },

  // ──────────────────────────────────────────────
  // L'AQUILA (ABRUZZO)
  // ──────────────────────────────────────────────
  {
    id: 'INT-2025-034',
    titolo: 'Supplenza annuale — Italiano e Storia Secondaria I Grado',
    descrizione: 'Cattedra di Italiano e Storia presso Istituto Comprensivo "Giovanni Pascoli", L\'Aquila. A.s. 2025/26.',
    provincia: 'AQ',
    regione: 'Abruzzo',
    classeConcorso: 'A001 - Italiano, Latino e Storia',
    ordineScuola: 'Secondaria I Grado',
    tipoContratto: 'Supplenza annuale',
    dataPubblicazione: '2025-06-14',
    scadenza: '2025-07-04',
    postiDisponibili: 1,
    requisiti: [
      'Laurea in Lettere o Scienze della Formazione Primaria',
      'Abilitazione classe A001',
      'Inserimento nelle GPS L\'Aquila',
    ],
    fonte: "Ufficio Scolastico Provinciale dell'Aquila",
    fonteUrl: 'https://www.mim.gov.it/web/abruzzo',
    stato: 'attivo',
  },

  // ──────────────────────────────────────────────
  // TRIESTE (FRIULI-VENEZIA GIULIA)
  // ──────────────────────────────────────────────
  {
    id: 'INT-2025-035',
    titolo: 'Supplenza annuale — Tedesco Secondaria II Grado',
    descrizione: 'Cattedra di Lingua Tedesca presso Liceo Linguistico "Eugenio Montale", Trieste. A.s. 2025/26. Requisito: cittadinanza tedesca o madrelingua.',
    provincia: 'TS',
    regione: 'Friuli-Venezia Giulia',
    classeConcorso: 'A005 - Tedesco',
    ordineScuola: 'Secondaria II Grado',
    tipoContratto: 'Supplenza annuale',
    dataPubblicazione: '2025-06-07',
    scadenza: '2025-06-27',
    postiDisponibili: 1,
    requisiti: [
      'Laurea in Lingue Germaniche o Letteratura Tedesca',
      'Abilitazione classe A005',
      'Madrelingua tedesco o certificazione C2 Goethe-Institut',
    ],
    fonte: 'Ufficio Scolastico Provinciale di Trieste',
    fonteUrl: 'https://usrfvg.gov.it',
    stato: 'scaduto',
  },

  // ──────────────────────────────────────────────
  // UDINE (FRIULI-VENEZIA GIULIA)
  // ──────────────────────────────────────────────
  {
    id: 'INT-2025-036',
    titolo: 'Supplenza temporanea — Tecnologie e Programmazione',
    descrizione: 'Supplenza temporanea per docente di Tecnologie e Programmazione presso Istituto Tecnico ITIS "Galileo Galilei", Udine.',
    provincia: 'UD',
    regione: 'Friuli-Venezia Giulia',
    classeConcorso: 'A023 - Tecnologie e Programmazione',
    ordineScuola: 'Secondaria II Grado',
    tipoContratto: 'Supplenza temporanea',
    dataPubblicazione: '2025-06-19',
    scadenza: '2025-07-09',
    postiDisponibili: 1,
    requisiti: [
      'Laurea in Informatica, Ingegneria Informatica o equivalenti',
      'Abilitazione classe A023',
      'Conoscenza PLC e automazione industriale (valutata)',
    ],
    fonte: 'Ufficio Scolastico Provinciale di Udine',
    fonteUrl: 'https://usrfvg.gov.it',
    stato: 'attivo',
  },

  // ──────────────────────────────────────────────
  // FIRENZE (TOSCANA)
  // ──────────────────────────────────────────────
  {
    id: 'INT-2025-037',
    titolo: 'Supplenza annuale — Storia Secondaria II Grado',
    descrizione: 'Cattedra di Storia presso Liceo Classico "Galileo Galilei", Firenze. A.s. 2025/26.',
    provincia: 'FI',
    regione: 'Toscana',
    classeConcorso: 'A002 - Storia',
    ordineScuola: 'Secondaria II Grado',
    tipoContratto: 'Supplenza annuale',
    dataPubblicazione: '2025-06-13',
    scadenza: '2025-07-03',
    postiDisponibili: 1,
    requisiti: [
      'Laurea magistrale in Storia o Scienze Storiche',
      'Abilitazione classe A002',
      'Pubblicazioni scientifiche in storia medievale o moderna (valutate)',
    ],
    fonte: 'Ufficio Scolastico Provinciale di Firenze',
    fonteUrl: 'https://www.mim.gov.it/web/miur-usr-toscana',
    stato: 'attivo',
  },
  {
    id: 'INT-2025-038',
    titolo: 'Supplenza breve — Educazione Fisica Primaria',
    descrizione: 'Supplenza breve per docente di Educazione Fisica nella scuola primaria. Istituto Comprensivo "Niccolò Machiavelli", Prato (PO).',
    provincia: 'PO',
    regione: 'Toscana',
    classeConcorso: '00EE - Primaria',
    ordineScuola: 'Primaria',
    tipoContratto: 'Supplenza breve',
    dataPubblicazione: '2025-07-03',
    scadenza: '2025-07-24',
    postiDisponibili: 1,
    requisiti: [
      'Laurea in Scienze della Formazione Primaria',
      'Abilitazione concorso Primaria',
      'Certificato medico di idoneità',
    ],
    fonte: 'Ufficio Scolastico Provinciale di Prato',
    fonteUrl: 'https://www.mim.gov.it/web/miur-usr-toscana',
    stato: 'attivo',
  },

  // ──────────────────────────────────────────────
  // CAMPANO (MOLISE)
  // ──────────────────────────────────────────────
  {
    id: 'INT-2025-039',
    titolo: 'Supplenza annuale — Inglese Secondaria I Grado',
    descrizione: 'Cattedra di Lingua Inglese presso Istituto Comprensivo "Vincenzo Cuoco", Campobasso. A.s. 2025/26.',
    provincia: 'CB',
    regione: 'Molise',
    classeConcorso: 'AB22 - Inglese Secondaria I Grado',
    ordineScuola: 'Secondaria I Grado',
    tipoContratto: 'Supplenza annuale',
    dataPubblicazione: '2025-06-15',
    scadenza: '2025-07-05',
    postiDisponibili: 1,
    requisiti: [
      'Laurea in Lingue Straniere con indirizzo anglo-americano',
      'Abilitazione classe A003',
      'Iscrizione alle GPS Campobasso',
    ],
    fonte: 'Ufficio Scolastico Provinciale di Campobasso',
    fonteUrl: 'https://www.mim.gov.it/web/molise',
    stato: 'attivo',
  },

  // ──────────────────────────────────────────────
  // FROSINONE (LAZIO)
  // ──────────────────────────────────────────────
  {
    id: 'INT-2025-040',
    titolo: 'Supplenza temporanea — Sostegno Secondaria II Grado',
    descrizione: 'Supplenza temporanea per posti di sostegno presso Istituto Comprensivo "Luigi Pirandello", Frosinone. Sostituzione per congedo.',
    provincia: 'FR',
    regione: 'Lazio',
    classeConcorso: 'A031 - Sostegno Secondaria II Grado',
    ordineScuola: 'Secondaria II Grado',
    tipoContratto: 'Supplenza temporanea',
    dataPubblicazione: '2025-06-21',
    scadenza: '2025-07-11',
    postiDisponibili: 1,
    requisiti: [
      'Laurea magistrale',
      'Specializzazione sul sostegno (TFA o percorsi abilitanti)',
      'Abilitazione classe A031',
    ],
    fonte: 'Ufficio Scolastico Provinciale di Frosinone',
    fonteUrl: 'https://www.ufficioscolasticoregionalelazio.it',
    stato: 'attivo',
  },

  // ──────────────────────────────────────────────
  // PERUGIA (UMBRIA)
  // ──────────────────────────────────────────────
  {
    id: 'INT-2025-041',
    titolo: 'Supplenza annuale — Psicologia Secondaria II Grado',
    descrizione: 'Cattedra di Psicologia presso Liceo delle Scienze Umane "Raffaello", Perugia. A.s. 2025/26.',
    provincia: 'PG',
    regione: 'Umbria',
    classeConcorso: 'A015 - Psicologia',
    ordineScuola: 'Secondaria II Grado',
    tipoContratto: 'Supplenza annuale',
    dataPubblicazione: '2025-06-16',
    scadenza: '2025-07-06',
    postiDisponibili: 1,
    requisiti: [
      'Laurea magistrale in Psicologia (L-24)',
      'Abilitazione classe A015',
      'Iscrizione alle GPS Perugia',
    ],
    fonte: 'Ufficio Scolastico Provinciale di Perugia',
    fonteUrl: 'http://www.istruzione.umbria.it',
    stato: 'attivo',
  },

  // ──────────────────────────────────────────────
  // SALERNO (CAMPANIA)
  // ──────────────────────────────────────────────
  {
    id: 'INT-2025-042',
    titolo: 'Supplenza annuale — Scienze della Terra Secondaria II Grado',
    descrizione: 'Cattedra di Scienze della Terra presso Istituto Professionale "Giacomo Matteotti", Salerno. A.s. 2025/26.',
    provincia: 'SA',
    regione: 'Campania',
    classeConcorso: 'A011 - Scienze della Terra',
    ordineScuola: 'Secondaria II Grado',
    tipoContratto: 'Supplenza annuale',
    dataPubblicazione: '2025-06-19',
    scadenza: '2025-07-09',
    postiDisponibili: 1,
    requisiti: [
      'Laurea in Scienze Geologiche o Geologia Ambientale',
      'Abilitazione classe A011',
      'Esperienza in didattica delle scienze della terra',
    ],
    fonte: 'Ufficio Scolastico Provinciale di Salerno',
    fonteUrl: 'https://www.mim.gov.it/web/miur-usr-campania',
    stato: 'attivo',
  },

  // ──────────────────────────────────────────────
  // BRINDISI (PUGLIA)
  // ──────────────────────────────────────────────
  {
    id: 'INT-2025-043',
    titolo: 'Supplenza breve — Inglese Primaria',
    descrizione: 'Supplenza breve per docente di Lingua Inglese nella scuola primaria. Istituto Comprensivo "Aldo Moro", Brindisi. A.s. 2025/26.',
    provincia: 'BR',
    regione: 'Puglia',
    classeConcorso: '00EE - Primaria',
    ordineScuola: 'Primaria',
    tipoContratto: 'Supplenza breve',
    dataPubblicazione: '2025-07-01',
    scadenza: '2025-07-21',
    postiDisponibili: 1,
    requisiti: [
      'Laurea in Scienze della Formazione Primaria',
      'Certificazione linguistica inglese C1',
      'Metodologia CLIL nella scuola primaria',
    ],
    fonte: 'Ufficio Scolastico Provinciale di Brindisi',
    fonteUrl: 'https://www.pugliausr.gov.it',
    stato: 'attivo',
  },

  // ──────────────────────────────────────────────
  // LECCE (PUGLIA)
  // ──────────────────────────────────────────────
  {
    id: 'INT-2025-044',
    titolo: 'Supplenza annuale — Lettere Italiane Secondaria II Grado',
    descrizione: 'Cattedra di Italiano, Latino e Storia presso Liceo "Vito Fazzi", Lecce. A.s. 2025/26.',
    provincia: 'LE',
    regione: 'Puglia',
    classeConcorso: 'A001 - Italiano, Latino e Storia',
    ordineScuola: 'Secondaria II Grado',
    tipoContratto: 'Supplenza annuale',
    dataPubblicazione: '2025-06-10',
    scadenza: '2025-07-01',
    postiDisponibili: 2,
    requisiti: [
      'Laurea magistrale in Lettere Italiane o Classiche',
      'Abilitazione classe A001',
      'Inserimento nelle GPS Lecce',
    ],
    fonte: 'Ufficio Scolastico Provinciale di Lecce',
    fonteUrl: 'https://www.pugliausr.gov.it',
    stato: 'attivo',
  },

  // ──────────────────────────────────────────────
  // LIVORNO (TOSCANA)
  // ──────────────────────────────────────────────
  {
    id: 'INT-2025-045',
    titolo: 'Supplenza temporanea — Inglese Secondaria II Grado',
    descrizione: 'Supplenza temporanea per docente di Lingua Inglese presso Liceo Scientifico "Nicola Steno", Livorno. Sostituzione per congedo.',
    provincia: 'LI',
    regione: 'Toscana',
    classeConcorso: 'A003 - Lingua Inglese',
    ordineScuola: 'Secondaria II Grado',
    tipoContratto: 'Supplenza temporanea',
    dataPubblicazione: '2025-06-27',
    scadenza: '2025-07-17',
    postiDisponibili: 1,
    requisiti: [
      'Laurea in Lingue Straniere',
      'Abilitazione classe A003',
      'Certificazione Cambridge C1 o IELTS',
    ],
    fonte: 'Ufficio Scolastico Provinciale di Livorno',
    fonteUrl: 'https://www.mim.gov.it/web/miur-usr-toscana',
    stato: 'attivo',
  },
];

// ============================================================
// HELPER FUNCTIONS
// ============================================================

export function getInterpelliByProvincia(provincia: string): InterpelloUfficiale[] {
  return INTERPELLI_UFFICIALI.filter(i => i.provincia === provincia);
}

export function getInterpelliByClasse(classeConcorso: string): InterpelloUfficiale[] {
  return INTERPELLI_UFFICIALI.filter(i => i.classeConcorso === classeConcorso);
}

export function getInterpelliByTipo(tipoContratto: string): InterpelloUfficiale[] {
  return INTERPELLI_UFFICIALI.filter(i => i.tipoContratto === tipoContratto);
}

export function getInterpelliAttivi(): InterpelloUfficiale[] {
  return INTERPELLI_UFFICIALI.filter(i => i.stato === 'attivo');
}

export function getInterpelliByOrdineScuola(ordineScuola: string): InterpelloUfficiale[] {
  return INTERPELLI_UFFICIALI.filter(i => i.ordineScuola === ordineScuola);
}

export function cercaInterpelli(query: string): InterpelloUfficiale[] {
  const q = query.toLowerCase();
  return INTERPELLI_UFFICIALI.filter(
    i =>
      i.titolo.toLowerCase().includes(q) ||
      i.descrizione.toLowerCase().includes(q) ||
      i.classeConcorso.toLowerCase().includes(q) ||
      i.provincia.toLowerCase().includes(q) ||
      i.regione.toLowerCase().includes(q)
  );
}

export function getProvinceDisponibili(): string[] {
  return [...new Set(INTERPELLI_UFFICIALI.map(i => i.provincia))].sort();
}

export function getClassiDisponibili(): string[] {
  return [...new Set(INTERPELLI_UFFICIALI.map(i => i.classeConcorso))].sort();
}
