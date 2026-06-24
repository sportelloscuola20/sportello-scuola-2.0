/**
 * ============================================================================
 *  SPORTELLO SCUOLA 2.0 — ARCHITETTURA DEL MOTORE DI CONTENT AGGREGATION
 * ============================================================================
 *
 *  FLUSSO LOGICO (PIPE LINEARE A 6 STADI):
 *
 *    ┌─────────────┐    ┌─────────────┐    ┌─────────────┐    ┌─────────────┐    ┌─────────────┐    ┌─────────────┐
 *    │  STADIO 1   │───>│  STADIO 2   │───>│  STADIO 3   │───>│  STADIO 4   │───>│  STADIO 5   │───>│  STADIO 6   │
 *    │  POLLING    │    │  RANK &     │    │  VALIDATION │    │  LLM        │    │  CACHING    │    │  PUBLISH    │
 *    │  SENSORI    │    │  FILTER     │    │  & CROSS-   │    │  REWRITE    │    │  & INDEX    │    │  (CDN/SSG)  │
 *    │             │    │  (per       │    │  CHECK      │    │  (System    │    │  (Supabase  │    │             │
 *    │  Ogni fonte │    │   livello   │    │  L6/L7 →    │    │   Prompt    │    │   + RAG)    │    │  Netlify    │
 *    │  ha il      │    │   autorità) │    │  L1/L5)     │    │   applicato)│    │             │    │  Deploy     │
 *    └─────────────┘    └─────────────┘    └─────────────┘    └─────────────┘    └─────────────┘    └─────────────┘
 *
 *  TEMPORIZZAZIONI (POLLING):
 *    - Livello 1 (MIM, G.U., INPS):    60-120 secondi
 *    - Livello 5 (Giurisprudenza):      180 secondi
 *    - Livelli 6-7 (Sindacati/Stampa):  60 secondi (trigger soltanto)
 *    - Livello 4 (Scientifico):         600 secondi
 *
 * ============================================================================
 */

/* ─── STADIO 1: RAW ITEM ───────────────────────────────────────────────── */

export interface RawFeedItem {
  id: string;
  sourceName: string;
  sourceLevel: number;
  title: string;
  content: string;
  url: string;
  pubDate: string;
  fetchedAt: string;
  /** Per L6/L7: quale livello deve validare */
  triggerTargetLevel?: number;
  /** Hash della fonte per deduplica */
  contentHash: string;
}

/* ─── STADIO 2: FILTRATO E CLASSIFICATO ─────────────────────────────────── */

export interface RankedItem {
  raw: RawFeedItem;
  rank: number;
  category: string;
  tags: string[];
  isTriggerOnly: boolean;
  validationRequired: boolean;
}

/* ─── STADIO 3: VALIDATO (CROSS-REFERENCE FATTO) ───────────────────────── */

export interface ValidatedItem {
  ranked: RankedItem;
  validatedAt: string;
  originalSourceUrl: string;
  originalSourceLevel: number;
  legalReferences: string[];
  isVerified: boolean;
  verificationNotes: string;
}

/* ─── STADIO 4: RISCITTO DA LLM ─────────────────────────────────────────── */

export interface CuratedArticle {
  validated: ValidatedItem;
  curatedAt: string;
  llmModel: string;
  title: string;
  lead: string;
  bodyHtml: string;
  legalFootnotes: string[];
  operationalGuide: string;
  oficialLink: string;
}

/* ─── STADIO 5: INDICIZZATO PER RAG ─────────────────────────────────────── */

export interface CachedArticle extends CuratedArticle {
  chunks: {
    id: string;
    content: string;
    embedding: number[];
  }[];
  publishedAt: string;
}

/* ─── CONFIG GLOBALE DELL'ENGINE ─────────────────────────────────────────── */

export interface EngineConfig {
  pollingConcurrency: number;
  defaultPollingIntervalMs: number;
  llmModel: string;
  llmTemperature: number;
  llmMaxTokens: number;
  supabaseTableNews: string;
  supabaseTableCache: string;
  maxArticlesPerBatch: number;
}

export const DEFAULT_ENGINE_CONFIG: EngineConfig = {
  pollingConcurrency: 5,
  defaultPollingIntervalMs: 60_000,
  llmModel: 'anthropic/claude-3-opus',
  llmTemperature: 0.3,
  llmMaxTokens: 2048,
  supabaseTableNews: 'news_cache',
  supabaseTableCache: 'rag_chunks',
  maxArticlesPerBatch: 10,
};
