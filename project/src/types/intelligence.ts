export type Criticalita = 'bassa' | 'media' | 'alta' | 'urgente' | 'strategica';
export type Impatto = 'locale' | 'regionale' | 'nazionale';
export type Platea = 'limitata' | 'ampia' | 'intero_sistema';
export type LivelloFonte = 'A' | 'B' | 'C' | 'D' | 'E' | 'F';
export type TargetUtente = 'docenti' | 'aspiranti_docenti' | 'sostegno' | 'ata' | 'amministrativi' | 'collaboratori' | 'dsga' | 'dirigenti' | 'educatori' | 'pedagogisti' | 'formatori' | 'universita' | 'sindacati' | 'famiglie' | 'studenti' | 'decisori_pubblici';
export type CategoriaUtente =
  | 'Bandi, Concorsi e Selezioni'
  | 'Didattica, Formazione e Innovazione'
  | 'Graduatorie (GPS, GAE, d\'Istituto)'
  | 'Contratti, Salari e Personale ATA'
  | 'Pensioni, Previdenza e Welfare'
  | 'Normative, Note e Circolari Ministeriali'
  | 'Mobilità, Assegnazioni e Utilizzazioni'
  | 'Esami di Stato e Valutazioni (INVALSI)';
export type LivelloProduzione = 1 | 2 | 3 | 4 | 5 | 6 | 7;

export const CATEGORIE_UTENTE: CategoriaUtente[] = [
  'Bandi, Concorsi e Selezioni',
  'Didattica, Formazione e Innovazione',
  'Graduatorie (GPS, GAE, d\'Istituto)',
  'Contratti, Salari e Personale ATA',
  'Pensioni, Previdenza e Welfare',
  'Normative, Note e Circolari Ministeriali',
  'Mobilità, Assegnazioni e Utilizzazioni',
  'Esami di Stato e Valutazioni (INVALSI)',
];

export const CATEGORIE_UTENTE_COLORS: Record<CategoriaUtente, string> = {
  'Bandi, Concorsi e Selezioni': 'bg-blue-100 text-blue-700 border-blue-200',
  'Didattica, Formazione e Innovazione': 'bg-green-100 text-green-700 border-green-200',
  'Graduatorie (GPS, GAE, d\'Istituto)': 'bg-purple-100 text-purple-700 border-purple-200',
  'Contratti, Salari e Personale ATA': 'bg-amber-100 text-amber-700 border-amber-200',
  'Pensioni, Previdenza e Welfare': 'bg-rose-100 text-rose-700 border-rose-200',
  'Normative, Note e Circolari Ministeriali': 'bg-sky-100 text-sky-700 border-sky-200',
  'Mobilità, Assegnazioni e Utilizzazioni': 'bg-teal-100 text-teal-700 border-teal-200',
  'Esami di Stato e Valutazioni (INVALSI)': 'bg-indigo-100 text-indigo-700 border-indigo-200',
};

export type CategoriaScadenza =
  | 'Iscrizioni, Bandi e Concorsi pubblici'
  | 'Aggiornamento e Inserimento Graduatorie'
  | 'Mobilità del Personale Scolastico'
  | 'Immissioni in Ruolo e Supplenze'
  | 'Cessazioni dal Servizio e Pensionamenti'
  | 'Adempimenti Amministrativi e Sicurezza'
  | 'Esami di Stato, Scrutini e Valutazioni'
  | 'Formazione Obbligatoria e Periodo di Prova';

export const CATEGORIE_SCADENZA: CategoriaScadenza[] = [
  'Iscrizioni, Bandi e Concorsi pubblici',
  'Aggiornamento e Inserimento Graduatorie',
  'Mobilità del Personale Scolastico',
  'Immissioni in Ruolo e Supplenze',
  'Cessazioni dal Servizio e Pensionamenti',
  'Adempimenti Amministrativi e Sicurezza',
  'Esami di Stato, Scrutini e Valutazioni',
  'Formazione Obbligatoria e Periodo di Prova',
];

export const CATEGORIE_SCADENZA_COLORS: Record<CategoriaScadenza, string> = {
  'Iscrizioni, Bandi e Concorsi pubblici': 'bg-blue-100 text-blue-700 border-blue-200',
  'Aggiornamento e Inserimento Graduatorie': 'bg-purple-100 text-purple-700 border-purple-200',
  'Mobilità del Personale Scolastico': 'bg-teal-100 text-teal-700 border-teal-200',
  'Immissioni in Ruolo e Supplenze': 'bg-green-100 text-green-700 border-green-200',
  'Cessazioni dal Servizio e Pensionamenti': 'bg-rose-100 text-rose-700 border-rose-200',
  'Adempimenti Amministrativi e Sicurezza': 'bg-amber-100 text-amber-700 border-amber-200',
  'Esami di Stato, Scrutini e Valutazioni': 'bg-indigo-100 text-indigo-700 border-indigo-200',
  'Formazione Obbligatoria e Periodo di Prova': 'bg-sky-100 text-sky-700 border-sky-200',
};

export const REGIONI_ITALIA = [
  { codice: 'ABR', nome: 'Abruzzo' },
  { codice: 'BAS', nome: 'Basilicata' },
  { codice: 'CAL', nome: 'Calabria' },
  { codice: 'CAM', nome: 'Campania' },
  { codice: 'EMR', nome: 'Emilia-Romagna' },
  { codice: 'FVG', nome: 'Friuli-Venezia Giulia' },
  { codice: 'LAZ', nome: 'Lazio' },
  { codice: 'LIG', nome: 'Liguria' },
  { codice: 'LOM', nome: 'Lombardia' },
  { codice: 'MAR', nome: 'Marche' },
  { codice: 'MOL', nome: 'Molise' },
  { codice: 'PIE', nome: 'Piemonte' },
  { codice: 'PUG', nome: 'Puglia' },
  { codice: 'SAR', nome: 'Sardegna' },
  { codice: 'SIC', nome: 'Sicilia' },
  { codice: 'TOS', nome: 'Toscana' },
  { codice: 'UMB', nome: 'Umbria' },
  { codice: 'VEN', nome: 'Veneto' },
];

export const CATEGORIE_ICONE: Record<CategoriaUtente, string> = {
  'Bandi, Concorsi e Selezioni': '📋',
  'Didattica, Formazione e Innovazione': '📚',
  'Graduatorie (GPS, GAE, d\'Istituto)': '📊',
  'Contratti, Salari e Personale ATA': '💰',
  'Pensioni, Previdenza e Welfare': '🛡️',
  'Normative, Note e Circolari Ministeriali': '📜',
  'Mobilità, Assegnazioni e Utilizzazioni': '🚌',
  'Esami di Stato e Valutazioni (INVALSI)': '🎓',
};

export interface FonteInfo {
  livello: LivelloFonte;
  nome: string;
  url: string;
  peso: number;
}

export interface ClassificazioneIntelligence {
  criticita: Criticalita;
  impatto: Impatto;
  platea: Platea;
  target: TargetUtente[];
  categoria: CategoriaUtente;
  livelloFonte: LivelloFonte;
  fontePrimaria: string;
  fonteUrl: string;
  dataAcquisizione: string;
}

export interface LivelloProduzioneContenuto {
  livello: LivelloProduzione;
  titolo: string;
  contenuto: string;
}

export interface NotiziaIntelligence {
  id: string;
  titolo: string;
  descrizione: string;
  dataPubblicazione: string;
  fonte: FonteInfo;
  classifica: ClassificazioneIntelligence;
  contenuti: LivelloProduzioneContenuto[];
  tag: string[];
  link: string;
  isPinned: boolean;
}

export interface ScadenzaIntelligence {
  id: string;
  titolo: string;
  descrizione: string;
  normativa: string;
  soggettiCoinvolti: TargetUtente[];
  dataScadenza: string;
  priorita: Criticalita;
  impatto: Impatto;
  conseguenzeNonAzione: string;
  link: string;
  tipo: string;
  guidaOperativa: string;
  autoGenerata?: boolean;
  periodicita?: 'giornaliera' | 'settimanale' | 'mensile' | 'annuale';
  regione?: string;
}

export interface DataJournalismData {
  label: string;
  valore: string | number;
  trend?: 'up' | 'down' | 'stable';
  confronto?: string;
  fonte: string;
}

export interface SezioneIntelligence {
  titolo: string;
  descrizione: string;
  dati: DataJournalismData[];
}

export const LIVELLI_FONTE: Record<LivelloFonte, { nome: string; peso: number; descrizione: string }> = {
  A: { nome: 'Fonte Primaria Assoluta', peso: 100, descrizione: 'Gazzetta Ufficiale, Normattiva, MIM, Parlamento, ARAN, INPS' },
  B: { nome: 'Governance e Sistema Scuola', peso: 95, descrizione: 'USR, INVALSI, INDIRE, ISTAT' },
  C: { nome: 'Giurisprudenza', peso: 98, descrizione: 'TAR, Consiglio di Stato, Corte Costituzionale, Cassazione' },
  D: { nome: 'Osservatorio Europeo', peso: 95, descrizione: 'Commissione UE, OECD, UNESCO, WHO' },
  E: { nome: 'Ricerca Scientifica', peso: 90, descrizione: 'ERIC, PubMed, Google Scholar' },
  F: { nome: 'Intelligence di Settore', peso: 60, descrizione: 'Orizzonte Scuola, Tecnica della Scuola, Sindacati' },
};

export const CRITICALITA_COLORS: Record<Criticalita, string> = {
  bassa: 'bg-gray-100 text-gray-600',
  media: 'bg-blue-100 text-blue-700',
  alta: 'bg-amber-100 text-amber-700',
  urgente: 'bg-red-100 text-red-700',
  strategica: 'bg-purple-100 text-purple-700',
};

export const IMPATTO_COLORS: Record<Impatto, string> = {
  locale: 'bg-gray-100 text-gray-600',
  regionale: 'bg-blue-100 text-blue-700',
  nazionale: 'bg-red-100 text-red-700',
};

export const TARGET_LABELS: Record<TargetUtente, string> = {
  docenti: 'Docenti',
  aspiranti_docenti: 'Aspiranti Docenti',
  sostegno: 'Sostegno',
  ata: 'ATA',
  amministrativi: 'Assistenti Amministrativi',
  collaboratori: 'Collaboratori Scolastici',
  dsga: 'DSGA',
  dirigenti: 'Dirigenti Scolastici',
  educatori: 'Educatori',
  pedagogisti: 'Pedagogisti',
  formatori: 'Formatori',
  universita: 'Università',
  sindacati: 'Sindacati',
  famiglie: 'Famiglie',
  studenti: 'Studenti',
  decisori_pubblici: 'Decisori Pubblici',
};

export const LIVELLO_PRODUZIONE_LABELS: Record<LivelloProduzione, string> = {
  1: 'Notizia Immediata',
  2: 'Analisi',
  3: 'Impatto Operativo',
  4: 'Domande Frequenti',
  5: 'Checklist',
  6: 'Cronologia Normativa',
  7: 'Scenari Futuri',
};

// === Tipi per Monitoraggio Fonti Live ===

export type FonteStato = 'attivo' | 'errore' | 'disabilitato';
export type FonteTipo = 'web' | 'rss' | 'api';

export interface MonitoredSource {
  id: string;
  livello: LivelloFonte;
  nome: string;
  url: string;
  rss_url: string | null;
  tipo: FonteTipo;
  frequenza_minuti: number;
  ultimo_check: string | null;
  ultimo_etag: string | null;
  ultimo_last_modified: string | null;
  ultimo_hash: string | null;
  stato: FonteStato;
  errore_msg: string | null;
  created_at: string;
  updated_at: string;
}

export interface IntelligenceDashboardStats {
  fonti_attive: number;
  fonti_totali: number;
  documenti_da_elaborare: number;
  documenti_ultime_24h: number;
  notizie_oggi: number;
  notizie_attive: number;
  collegamenti_knowledge_graph: number;
  scadenze_attive: number;
  scadenze_imminenti: number;
  ultimo_monitoraggio: string | null;
}

export interface KnowledgeLink {
  id: string;
  news_id_a: string;
  news_id_b: string;
  tipo_relazione: 'normativa_correlata' | 'aggiorna' | 'sostituisce' | 'approfondimento' | 'scadenza_correlata' | 'concorso_correlato' | 'faq_correlata' | 'guida_correlata' | 'stesso_argomento' | 'cronologia';
  peso: number;
  created_at: string;
}

export const RELAZIONE_LABELS: Record<string, string> = {
  normativa_correlata: 'Normativa Correlata',
  aggiorna: 'Aggiornamento',
  sostituisce: 'Sostituisce',
  approfondimento: 'Approfondimento',
  scadenza_correlata: 'Scadenza Correlata',
  concorso_correlato: 'Concorso Correlato',
  faq_correlata: 'FAQ Correlata',
  guida_correlata: 'Guida Correlata',
  stesso_argomento: 'Stesso Argomento',
  cronologia: 'Cronologia',
};

export const FONTE_STATO_COLORS: Record<FonteStato, string> = {
  attivo: 'bg-green-100 text-green-700',
  errore: 'bg-red-100 text-red-700',
  disabilitato: 'bg-gray-100 text-gray-500',
};
