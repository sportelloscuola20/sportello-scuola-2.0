/**
 * ============================================================================
 *  CAP-04 — VERSIONED PROMPT CATALOG (EMA §5.10, §6.8)
 *  Centralized, versioned prompt management with quality scoring.
 * ============================================================================
 */

export interface PromptEntry {
  id: string;
  name: string;
  version: string;
  description: string;
  systemPrompt: string;
  temperature: number;
  maxTokens: number;
  category: 'classification' | 'generation' | 'summarization' | 'extraction' | 'chat';
  createdAt: string;
  updatedAt: string;
  isActive: boolean;
  qualityScore?: number; // 0-100
  tags: string[];
}

/** Canonical prompt catalog (versioned, SSOT) */
export const PROMPT_CATALOG: PromptEntry[] = [
  {
    id: 'news-classifier-v1',
    name: 'News Classifier',
    version: '1.0.0',
    description: 'Classifica notizie nelle 8 categorie VALIDE del sistema scolastico italiano',
    systemPrompt: `Sei un classificatore specializzato nel sistema educativo italiano.
Classifica la notizia fornita in UNA delle seguenti categorie:
1. Bandi, Concorsi e Selezioni
2. Didattica, Formazione e Innovazione
3. Graduatorie (GPS, GAE, d'Istituto)
4. Contratti, Salari e Personale ATA
5. Pensioni, Previdenza e Welfare
6. Normative, Note e Circolari Ministeriali
7. Mobilità, Assegnazioni e Utilizzazioni
8. Esami di Stato e Valutazioni (INVALSI)

Rispondi SOLO con il nome esatto della categoria.`,
    temperature: 0.1,
    maxTokens: 100,
    category: 'classification',
    createdAt: '2026-01-01T00:00:00Z',
    updatedAt: '2026-01-01T00:00:00Z',
    isActive: true,
    qualityScore: 85,
    tags: ['news', 'classification', 'italian-education'],
  },
  {
    id: 'scadenza-extractor-v1',
    name: 'Scadenza Extractor',
    version: '1.0.0',
    description: 'Estrae date e dettagli scadenze da testi normativi',
    systemPrompt: `Sei un esperto di normativa scolastica italiana.
Estrai la scadenza dal testo fornito. Rispondi in formato JSON:
{
  "titolo": "...",
  "data_scadenza": "YYYY-MM-DD",
  "soggetti_coinvolti": ["docenti", "ata", ...],
  "priorita": "bassa|media|alta|urgente",
  "conseguenze": "...",
  "guida_operativa": "..."
}
Se non c'è una scadenza, rispondi con {"scadenza": null}.`,
    temperature: 0.2,
    maxTokens: 500,
    category: 'extraction',
    createdAt: '2026-01-01T00:00:00Z',
    updatedAt: '2026-01-01T00:00:00Z',
    isActive: true,
    qualityScore: 80,
    tags: ['scadenze', 'extraction', 'normativa'],
  },
  {
    id: 'rag-rewriter-v1',
    name: 'RAG Rewriter',
    version: '1.0.0',
    description: 'Riscrive contenuti per il canale sindacale/mass-media con audacia journalistica',
    systemPrompt: `Sei un giornalista investigativo specializzato in scuola italiana.
Riscrivi il contenuto mantenendo:
1. Veridicità assoluta (nessuna inventata)
2. Tono accessibile e coinvolgente
3. Struttura: Titolo → Fatto → Perché conta → Cosa fare
4. Citazioni delle fonti normative`,
    temperature: 0.7,
    maxTokens: 2000,
    category: 'generation',
    createdAt: '2026-01-01T00:00:00Z',
    updatedAt: '2026-01-01T00:00:00Z',
    isActive: true,
    qualityScore: 75,
    tags: ['rag', 'journalism', 'rewrite'],
  },
  {
    id: 'chat-sindacale-v1',
    name: 'Chat Sindacale',
    version: '1.0.0',
    description: 'Risponde a domande sul lavoro scolastico usando knowledge base e normativa',
    systemPrompt: `Sei un consulente sindacale esperto del comparto Istruzione e Ricerca.
Rispondi alle domande dei lavoratori della scuola (docenti, ATA, dirigenti).
Regole:
1. Cita sempre la fonte normativa (CCNL, D.Lgs, circolare)
2. Distingui tra diritto e facoltà
3. Indica se ci sono variazioni regionali
4. Segnala se la normativa è in fase di modifica
5. Sii preciso sui termini e le scadenze`,
    temperature: 0.3,
    maxTokens: 4000,
    category: 'chat',
    createdAt: '2026-01-01T00:00:00Z',
    updatedAt: '2026-01-01T00:00:00Z',
    isActive: true,
    qualityScore: 90,
    tags: ['chat', 'sindacale', 'normativa', 'ccnl'],
  },
  {
    id: 'content-summarizer-v1',
    name: 'Content Summarizer',
    version: '1.0.0',
    description: 'Riassume documenti normativi lunghi in punti chiave',
    systemPrompt: `Sei un analista di normativa scolastica italiana.
Riassumi il documento nei seguenti 5 livelli:
1. COSA SUCCEDE (1-2 frasi)
2. PERCHÉ È IMPORTANTE (contesto)
3. COSA CAMBIA PER TE (impatto operativo)
4. FAQ (2-3 domande comuni)
5. COSA FARE SUBITO (checklist)`,
    temperature: 0.2,
    maxTokens: 2000,
    category: 'summarization',
    createdAt: '2026-01-01T00:00:00Z',
    updatedAt: '2026-01-01T00:00:00Z',
    isActive: true,
    qualityScore: 88,
    tags: ['summary', 'normativa', '6-livelli'],
  },
];

/**
 * Get a prompt by ID and version.
 */
export function getPrompt(id: string, version?: string): PromptEntry | undefined {
  return PROMPT_CATALOG.find(
    p => p.id === id && (!version || p.version === version) && p.isActive
  );
}

/**
 * Get all prompts in a category.
 */
export function getPromptsByCategory(category: PromptEntry['category']): PromptEntry[] {
  return PROMPT_CATALOG.filter(p => p.category === category && p.isActive);
}

/**
 * Calculate quality score for a prompt based on usage metrics.
 * Placeholder — wire to actual metrics in production.
 */
export function calculateQualityScore(prompt: PromptEntry, metrics?: {
  successRate?: number;
  avgUserRating?: number;
  errorRate?: number;
}): number {
  if (!metrics) return prompt.qualityScore || 50;

  let score = 50;
  if (metrics.successRate !== undefined) score += metrics.successRate * 30;
  if (metrics.avgUserRating !== undefined) score += (metrics.avgUserRating / 5) * 20;
  if (metrics.errorRate !== undefined) score -= metrics.errorRate * 40;

  return Math.max(0, Math.min(100, Math.round(score)));
}
