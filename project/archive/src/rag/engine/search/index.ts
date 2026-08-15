/**
 * ============================================================================
 *  EMA §9 — UNIVERSAL SEARCH ENGINE
 *  4-layer architecture: Query → Classification → Retrieval → Presentation
 *  8-step pipeline: QueryNormalizer → FilterEngine → RetrievalEngine →
 *  ResultMerger → Ranker → QualityFilter → PresentationAdapter → SearchLogger
 * ============================================================================
 */

import { createLineage, type DataLineageObject } from '../../../foundation/types';
import { eventBus } from '../../../foundation/events';
import { queryCache } from '../../../lib/cache';
import { searchRateLimiter } from '../../../lib/rate-limiter';
import { PRODUCT_REGISTRY, type ProductId } from '../../../services/products';
import { SOURCE_MATRIX } from '../sources';

// ─── Search Types ────────────────────────────────────────────────────────────

export type SearchIntent = 'regulatory' | 'procedural' | 'analytical' | 'comparative' | 'temporal';
export type SearchEntityType = 'person' | 'organization' | 'date' | 'location' | 'law' | 'product' | 'topic';

export interface ParsedQuery {
  original: string;
  normalized: string;
  tokens: string[];
  intent: SearchIntent;
  entities: ExtractedEntity[];
  filters: SearchFilter[];
  timeRange?: { from?: string; to?: string };
  region?: string;
  language: string;
}

export interface ExtractedEntity {
  type: SearchEntityType;
  value: string;
  confidence: number;
  startIndex: number;
  endIndex: number;
}

export interface SearchFilter {
  field: string;
  operator: 'equals' | 'contains' | 'gt' | 'lt' | 'between' | 'in';
  value: string | number | string[];
}

export interface SearchResult {
  id: string;
  title: string;
  snippet: string;
  product: ProductId;
  category: string;
  score: number;
  url: string;
  publishedAt: string;
  metadata: Record<string, unknown>;
  lineage: DataLineageObject;
  highlights: SearchHighlight[];
}

export interface SearchHighlight {
  field: string;
  fragments: string[];
}

export interface SearchResponse {
  query: ParsedQuery;
  results: SearchResult[];
  totalCount: number;
  page: number;
  pageSize: number;
  facets: SearchFacet[];
  suggestions: string[];
  took: number; // ms
  lineage: DataLineageObject;
}

export interface SearchFacet {
  field: string;
  values: { value: string; count: number }[];
}

// ─── Step 1: Query Normalizer ───────────────────────────────────────────────

const INTENT_KEYWORDS: Record<SearchIntent, string[]> = {
  regulatory: ['norma', 'decreto', 'legge', 'circolare', 'regolamento', 'dm', 'dpr', 'dlgs'],
  procedural: ['come', 'procedura', 'come fare', 'iter', 'passaggi', 'modalità'],
  analytical: ['analisi', 'statistica', 'trend', 'dati', 'confronto', 'performance'],
  comparative: ['confronto', 'differenza', 'tra', 'versus', 'vs', 'più di', 'meno di'],
  temporal: ['scadenza', 'entro', 'prima', 'dopo', 'entro il', 'entro quando'],
};

const ENTITY_PATTERNS: Record<SearchEntityType, RegExp> = {
  person: /\b(prof\.|dott\.|dirigente|preside|segretario)\s+([A-Z][a-z]+)\b/gi,
  organization: /\b(ministero|provveditorato|istituto|scuola|università|cnvs)\b/gi,
  date: /\b(\d{1,2}[\/\-]\d{1,2}[\/\-]\d{2,4}|\d{4}-\d{2}-\d{2})\b/g,
  location: /\b(Roma|Milano|Napoli|Torino|Palermo|Genova|Bologna|Firenze|[A-Z][a-z]+)\b/g,
  law: /\b(d\.lgs\.?\s*\d+\/\d+|d\.pr\.?\s*\d+\/\d+|l\.?\s*\d+\/\d+|d\.m\.?\s*\d+\/\d+)\b/gi,
  product: Object.values(PRODUCT_REGISTRY).flatMap(p => [p.name, p.route.replace('/', '')]),
  topic: ['mobilità', 'concorso', 'nomina', 'assegnazione', 'utilizzazione', 'graduatoria', 'gps', 'gae'],
};

export function normalizeQuery(raw: string): ParsedQuery {
  const normalized = raw
    .toLowerCase()
    .replace(/[^\w\sàèéìòùÀÈÉÌÒÙ\-\/\.]/g, '')
    .replace(/\s+/g, ' ')
    .trim();

  const tokens = normalized.split(' ').filter(t => t.length > 1);

  // Intent detection
  let intent: SearchIntent = 'regulatory';
  let maxScore = 0;
  for (const [i, keywords] of Object.entries(INTENT_KEYWORDS)) {
    const score = keywords.filter(k => normalized.includes(k)).length;
    if (score > maxScore) {
      maxScore = score;
      intent = i as SearchIntent;
    }
  }

  // Entity extraction
  const entities: ExtractedEntity[] = [];
  for (const [type, pattern] of Object.entries(ENTITY_PATTERNS)) {
    const regex = new RegExp(pattern.source, pattern.flags);
    let match;
    while ((match = regex.exec(raw)) !== null) {
      entities.push({
        type: type as SearchEntityType,
        value: match[0],
        confidence: 0.8,
        startIndex: match.index,
        endIndex: match.index + match[0].length,
      });
    }
  }

  // Time range extraction
  let timeRange: ParsedQuery['timeRange'];
  const dateEntities = entities.filter(e => e.type === 'date');
  if (dateEntities.length >= 2) {
    timeRange = { from: dateEntities[0].value, to: dateEntities[1].value };
  } else if (dateEntities.length === 1) {
    timeRange = { to: dateEntities[0].value };
  }

  // Region extraction
  const regionEntity = entities.find(e => e.type === 'location');

  return {
    original: raw,
    normalized,
    tokens,
    intent,
    entities,
    filters: [],
    timeRange,
    region: regionEntity?.value,
    language: 'it',
  };
}

// ─── Step 2: Filter Engine ──────────────────────────────────────────────────

export function buildFilters(parsed: ParsedQuery, userFilters?: SearchFilter[]): SearchFilter[] {
  const filters: SearchFilter[] = [...(userFilters || [])];

  // Auto-add product filter from entity
  const productEntity = parsed.entities.find(e => e.type === 'product');
  if (productEntity) {
    const product = Object.values(PRODUCT_REGISTRY).find(
      p => p.name.toLowerCase().includes(productEntity.value.toLowerCase()) ||
           p.route.includes(productEntity.value)
    );
    if (product) {
      filters.push({ field: 'product', operator: 'equals', value: product.id });
    }
  }

  // Auto-add topic filter
  const topicEntity = parsed.entities.find(e => e.type === 'topic');
  if (topicEntity) {
    filters.push({ field: 'category', operator: 'contains', value: topicEntity.value });
  }

  // Auto-add time filter
  if (parsed.timeRange) {
    filters.push({ field: 'publishedAt', operator: 'between', value: [parsed.timeRange.from || '2000-01-01', parsed.timeRange.to || new Date().toISOString()] });
  }

  return filters;
}

// ─── Step 3: Retrieval Engine ───────────────────────────────────────────────

export async function retrieveResults(
  parsed: ParsedQuery,
  filters: SearchFilter[],
  page: number = 1,
  pageSize: number = 20
): Promise<{ results: SearchResult[]; totalCount: number; facets: SearchFacet[] }> {
  // Check cache
  const cacheKey = `search:${parsed.normalized}:${JSON.stringify(filters)}:${page}`;
  const cached = queryCache.get<SearchResponse>(cacheKey);
  if (cached) {
    return { results: cached.results, totalCount: cached.totalCount, facets: cached.facets };
  }

  // Simulate retrieval from multiple sources
  const results: SearchResult[] = [];
  const facets: SearchFacet[] = [];

  // Search across SOURCE_MATRIX
  for (const source of SOURCE_MATRIX) {
    const relevance = calculateSourceRelevance(source, parsed);
    if (relevance > 0.3) {
      results.push({
        id: `src_${source.name}_${results.length}`,
        title: `Risultato da ${source.name}`,
        snippet: `Contesto da ${source.nome_ente || source.name} — ${parsed.normalized}`,
        product: 'normativa',
        category: source.categoria,
        score: relevance,
        url: source.url,
        publishedAt: new Date().toISOString(),
        metadata: { sourceType: source.tipo, authority: source.livello_affidabilita },
        lineage: createLineage('search_retrieval', `source:${source.name}`, {
          query: parsed.normalized,
          relevance,
        }),
        highlights: [],
      });
    }
  }

  // Sort by score
  results.sort((a, b) => b.score - a.score);

  // Build facets
  facets.push(
    { field: 'product', values: buildFacetValues(results, 'product') },
    { field: 'category', values: buildFacetValues(results, 'category') }
  );

  const totalCount = results.length;
  const pagedResults = results.slice((page - 1) * pageSize, page * pageSize);

  return { results: pagedResults, totalCount, facets };
}

function calculateSourceRelevance(
  source: typeof SOURCE_MATRIX[number],
  parsed: ParsedQuery
): number {
  let score = 0;
  const text = `${source.name} ${source.nome_ente || ''} ${source.categoria}`.toLowerCase();
  for (const token of parsed.tokens) {
    if (text.includes(token)) score += 0.2;
  }
  score += source.livello_affidabilita / 10;
  if (source.attivo) score += 0.1;
  return Math.min(1, score);
}

function buildFacetValues(results: SearchResult[], field: string): { value: string; count: number }[] {
  const counts: Record<string, number> = {};
  for (const r of results) {
    const val = String(r[field as keyof SearchResult] || 'unknown');
    counts[val] = (counts[val] || 0) + 1;
  }
  return Object.entries(counts)
    .map(([value, count]) => ({ value, count }))
    .sort((a, b) => b.count - a.count)
    .slice(0, 20);
}

// ─── Step 4: Result Merger ──────────────────────────────────────────────────

export function mergeResults(
  sourceResults: SearchResult[][],
  strategy: 'reciprocal_rank' | 'union' | 'intersection' = 'reciprocal_rank'
): SearchResult[] {
  if (strategy === 'union') {
    return sourceResults.flat();
  }

  if (strategy === 'intersection') {
    const ids = sourceResults.map(r => new Set(r.map(x => x.id)));
    const common = ids.reduce((a, b) => new Set([...a].filter(x => b.has(x))));
    return sourceResults.flat().filter(r => common.has(r.id));
  }

  // Reciprocal Rank Fusion
  const scores = new Map<string, number>();
  const items = new Map<string, SearchResult>();

  for (const results of sourceResults) {
    results.forEach((r, rank) => {
      const rrScore = 1 / (60 + rank); // k=60
      scores.set(r.id, (scores.get(r.id) || 0) + rrScore);
      items.set(r.id, r);
    });
  }

  return Array.from(scores.entries())
    .sort((a, b) => b[1] - a[1])
    .map(([id, score]) => ({ ...items.get(id)!, score }));
}

// ─── Step 5: Ranker ─────────────────────────────────────────────────────────

export function rankResults(
  results: SearchResult[],
  parsed: ParsedQuery,
  boosts?: Record<string, number>
): SearchResult[] {
  return results.map(r => {
    let boost = 1.0;

    // Freshness boost
    const age = Date.now() - new Date(r.publishedAt).getTime();
    const dayAge = age / (1000 * 60 * 60 * 24);
    if (dayAge < 30) boost *= 1.3;
    else if (dayAge < 90) boost *= 1.1;
    else if (dayAge > 365) boost *= 0.8;

    // Product boost
    const productBoosts: Record<ProductId, number> = {
      normativa: 1.2, interpelli: 1.1, notizie_scadenze: 1.0,
      consulente: 0.9, hub_eventi: 0.9, nomina: 1.0,
      calcolo_punteggio: 0.8, simulatore_nomine: 0.8,
      osservatorio_nomine: 0.9, guida_completa: 0.7,
      bandi: 1.0, gps_calculator: 0.8, area_riservata: 0.6,
    };
    boost *= productBoosts[r.product] || 1.0;

    // Custom boosts
    if (boosts) {
      for (const [key, val] of Object.entries(boosts)) {
        if (r.category.includes(key)) boost *= val;
      }
    }

    return { ...r, score: r.score * boost };
  }).sort((a, b) => b.score - a.score);
}

// ─── Step 6: Quality Filter ─────────────────────────────────────────────────

export function filterByQuality(
  results: SearchResult[],
  minScore: number = 0.1,
  maxResults: number = 100
): SearchResult[] {
  return results
    .filter(r => r.score >= minScore)
    .slice(0, maxResults);
}

// ─── Step 7: Presentation Adapter ───────────────────────────────────────────

export function adaptForPresentation(
  results: SearchResult[],
  parsed: ParsedQuery
): { results: SearchResult[]; suggestions: string[] } {
  // Generate suggestions based on results
  const suggestions: string[] = [];
  const productCounts: Record<string, number> = {};
  for (const r of results) {
    productCounts[r.product] = (productCounts[r.product] || 0) + 1;
  }
  const topProduct = Object.entries(productCounts).sort((a, b) => b[1] - a[1])[0];
  if (topProduct) {
    suggestions.push(`Esplora ${PRODUCT_REGISTRY[topProduct[0] as ProductId]?.name || topProduct[0]}`);
  }

  if (parsed.tokens.length > 0) {
    suggestions.push(`Cerca "${parsed.tokens[0]} ${parsed.tokens[1] || ''}"`);
  }

  return { results, suggestions };
}

// ─── Step 8: Search Logger ──────────────────────────────────────────────────

export function logSearch(
  parsed: ParsedQuery,
  resultCount: number,
  took: number
): void {
  // Log for analytics (fire and forget)
  const lineage = createLineage('search_log', 'search', {
    query: parsed.normalized,
    resultCount,
    took,
    intent: parsed.intent,
    entityCount: parsed.entities.length,
  });

  // Emit event for monitoring
  eventBus.emit({
    type: 'search.completed',
    query: parsed.normalized,
    resultCount,
    took,
    intent: parsed.intent,
    timestamp: new Date().toISOString(),
    lineage,
  } as any);
}

// ─── Full Search Pipeline ───────────────────────────────────────────────────

export async function search(
  rawQuery: string,
  options: {
    page?: number;
    pageSize?: number;
    filters?: SearchFilter[];
    boosts?: Record<string, number>;
    userId?: string;
  } = {}
): Promise<SearchResponse> {
  const startTime = Date.now();

  // Rate limiting
  if (options.userId) {
    const allowed = searchRateLimiter.tryAcquire(options.userId);
    if (!allowed) {
      throw new Error('Rate limit exceeded for search');
    }
  }

  // Step 1: Normalize
  const parsed = normalizeQuery(rawQuery);

  // Step 2: Build filters
  const filters = buildFilters(parsed, options.filters);

  // Step 3: Retrieve
  const { results: rawResults, totalCount, facets } = await retrieveResults(
    parsed, filters, options.page, options.pageSize
  );

  // Step 4: Merge (single source, pass-through)
  const merged = rawResults;

  // Step 5: Rank
  const ranked = rankResults(merged, parsed, options.boosts);

  // Step 6: Quality filter
  const filtered = filterByQuality(ranked);

  // Step 7: Present
  const { results, suggestions } = adaptForPresentation(filtered, parsed);

  // Step 8: Log
  const took = Date.now() - startTime;
  logSearch(parsed, results.length, took);

  return {
    query: parsed,
    results,
    totalCount,
    page: options.page || 1,
    pageSize: options.pageSize || 20,
    facets,
    suggestions,
    took,
    lineage: createLineage('search_pipeline', 'full_search', {
      query: parsed.normalized,
      resultCount: results.length,
      took,
      intent: parsed.intent,
    }),
  };
}
