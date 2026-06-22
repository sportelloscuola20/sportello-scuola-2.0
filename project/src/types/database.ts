export type RuoloUtente = 'docente' | 'ata' | 'aspirante';
export type TipoGraduatoria = 'gps' | 'ata';
export type Fascia = 'I' | 'II' | 'III';

export interface Profile {
  id: string;
  email: string;
  full_name: string | null;
  ruolo: RuoloUtente;
  is_premium: boolean;
  created_at: string;
}

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
  servizioStatale: number;
  servizioParitario: number;
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
