export type RuoloUtente = 'docente' | 'ata' | 'aspirante';
export type TipoGraduatoria = 'gps' | 'ata';
export type Fascia = 'I' | 'II' | 'III';

export interface UserScore {
  id: string;
  user_id: string;
  tipo_graduatoria: TipoGraduatoria;
  fascia: Fascia | null;
  classe_concorso: string | null;
  punteggio_totale: number;
  dettagli_calcolo: Record<string, unknown>;
  created_at: string;
}

export interface InterpellAlert {
  id: string;
  user_id: string;
  regione: string;
  provincia: string;
  classe_concorso_area: string;
  active: boolean;
  stripe_subscription_id: string | null;
  created_at: string;
}

export interface NewsCache {
  id: string;
  title: string;
  category: 'Docenti' | 'ATA' | 'Bandi' | 'Generale';
  content: string;
  due_date: string | null;
  source_url: string | null;
  is_pinned: boolean;
  created_at: string;
}

export interface Appointment {
  id: string;
  user_id: string;
  servizio: string;
  data_ora: string;
  is_paid: boolean;
  created_at: string;
}

export interface DocumentNorma {
  id: string;
  title: string;
  category: string;
  content: string;
  source_url: string | null;
  download_url: string | null;
  created_at: string;
}

export interface NewsletterSubscription {
  id: string;
  email: string;
  is_active: boolean;
  created_at: string;
}

export interface GPSCalculationResult {
  titoloAccesso: number;
  abilitazione: number;
  masterCorsi: number;
  certificazioniLinguistiche: number;
  clil: number;
  certificazioniInformatiche: number;
  serviziSpecifici: number;
  serviziNonSpecifici: number;
  punteggioTotale: number;
}

export interface ATACalculationResult {
  titoloStudio: number;
  ciad: boolean;
  certificazioniInformatiche: number;
  laurea: number;
  qualificheProfessionali: number;
  idoneitaConcorso: number;
  servizioStessoProfilo: number;
  servizioAltroProfilo: number;
  servizioParitarioStesso: number;
  servizioParitarioAltro: number;
  servizioEntiLocali: number;
  punteggioTotale: number;
}

export interface ServizioScolastico {
  id: string;
  dataInizio: string;
  dataFine: string;
  scuola: string;
  tipo: 'specifico' | 'non_specifico';
  annoScolastico: string;
}

export interface ServizioATA {
  id: string;
  dataInizio: string;
  dataFine: string;
  tipo: 'stesso_profilo_statale' | 'altro_profilo_statale' | 'stesso_profilo_paritario' | 'altro_profilo_paritario' | 'enti_locali';
  annoScolastico: string;
}

export interface ChatMessage {
  id: string;
  role: 'user' | 'assistant';
  content: string;
  timestamp: string;
  citations?: Array<{
    title: string;
    confidence: number;
  }>;
}

export interface SavedAlert {
  id: string;
  type: 'news' | 'bando' | 'scadenza';
  title: string;
  dueDate: string | null;
  savedAt: string;
}

export interface TimeSlot {
  time: string;
  available: boolean;
}

export interface BookingRequest {
  servizio: string;
  date: string;
  timeSlot: string;
}

export interface InterpelloNazionale {
  id: string;
  ufficio_scolastico_provinciale: string;
  scuola_istanza: string;
  classe_di_concorso: string;
  tipo_posto: 'comune' | 'sostegno' | 'ata';
  data_pubblicazione: string;
  data_scadenza: string;
  link_allegato_pdf: string;
  stato: 'aperto' | 'scaduto' | 'assegnato';
}

export interface UtenteAbbonatoInterpelli {
  utente_id: string;
  email: string;
  province_filtro: string[];
  classi_concorso_filtro: string[];
  tipo_posto_filtro: string[];
  notifica_email_attiva: boolean;
  stripe_subscription_status: string;
}

export interface SavedItem {
  id: string;
  user_id: string;
  item_type: 'news' | 'deadline' | 'document';
  item_id: string;
  item_data: Record<string, unknown>;
  created_at: string;
}

export interface UserPreference {
  user_id: string;
  full_name: string;
  ruolo: RuoloUtente;
  classe_concorso: string;
  punteggio_gps: number;
  punteggio_ata: number;
  fascia_gps: string;
  titoli: string[];
  certificazioni: string[];
  provincia_preferita: string;
  regione_preferita: string;
  updated_at: string;
}

export interface Profile {
  id: string;
  email: string;
  full_name: string | null;
  ruolo: RuoloUtente;
  is_premium: boolean;
  onboarded: boolean;
  preferences: Record<string, unknown>;
  notification_targets: Record<string, unknown>;
  created_at: string;
  updated_at: string;
}

export interface Simulation {
  id: string;
  user_id: string;
  tipo_graduatoria: string;
  punteggio_finale: number;
  dettagli: Record<string, unknown>;
  titoli_simulati: Record<string, unknown>;
  created_at: string;
}

export interface UserFavorite {
  id: string;
  user_id: string;
  item_type: string;
  item_id: string;
  item_data: Record<string, unknown>;
  created_at: string;
}

export interface StorageDocument {
  id: string;
  name: string;
  bucket_id: string;
  owner_id: string;
  created_at: string;
  updated_at: string;
  size: number;
  mimetype: string;
}

export interface Bando {
  id: string;
  titolo: string;
  ente: string;
  tipo: string;
  data_scadenza: string;
  data_pubblicazione: string;
  link: string | null;
  regione: string | null;
  provincia: string | null;
  categoria: string | null;
  descrizione: string | null;
  created_at: string;
}
