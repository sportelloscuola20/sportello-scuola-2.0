export type Criticalita = 'bassa' | 'media' | 'alta' | 'urgente' | 'strategica';
export type Impatto = 'locale' | 'regionale' | 'nazionale';
export type Platea = 'limitata' | 'ampia' | 'intero_sistema';
export type LivelloFonte = 'A' | 'B' | 'C' | 'D' | 'E' | 'F';
export type TargetUtente = 'docenti' | 'aspiranti_docenti' | 'sostegno' | 'ata' | 'amministrativi' | 'collaboratori' | 'dsga' | 'dirigenti' | 'educatori' | 'pedagogisti' | 'formatori' | 'universita' | 'sindacati' | 'famiglie' | 'studenti' | 'decisori_pubblici';
export type CategoriaMonitoraggio = 'normativa' | 'reclutamento' | 'personale' | 'inclusione' | 'innovazione' | 'governance';
export type LivelloProduzione = 1 | 2 | 3 | 4 | 5 | 6 | 7;

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
  categoria: CategoriaMonitoraggio;
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
  B: { nome: 'Governance e Sistema Scuola', peso: 95, descrizione: 'INVALSI, INDIRE, ISTAT' },
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
