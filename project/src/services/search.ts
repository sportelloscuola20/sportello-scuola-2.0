/**
 * ============================================================================
 *  EMA §9 — UNIVERSAL SEARCH ENGINE
 *  Semantic search across all products (Normativa, Interpelli, Nomine, News).
 * ============================================================================
 */

import { supabase } from '../lib/supabaseClient';
import { searchCache } from '../lib/cache';
import { createLineage } from '../foundation/types';
import type { DataLineageObject } from '../foundation/types';

export interface SearchResult {
  id: string;
  title: string;
  description: string;
  type: 'normativa' | 'interpello' | 'nomina' | 'news' | 'scadenza' | 'bando';
  url: string;
  relevanceScore: number;
  highlights: string[];
  metadata?: Record<string, unknown>;
  lineage: DataLineageObject;
}

export interface SearchResponse {
  results: SearchResult[];
  totalCount: number;
  query: string;
  filters: SearchFilters;
  lineage: DataLineageObject;
}

export interface SearchFilters {
  type?: string[];
  category?: string[];
  regione?: string[];
  dateFrom?: string;
  dateTo?: string;
}

/** Full-text search across all products */
export async function universalSearch(
  query: string,
  filters?: SearchFilters,
  options?: { limit?: number; offset?: number }
): Promise<SearchResponse> {
  const cacheKey = `search:${query}:${JSON.stringify(filters || {})}`;
  const cached = searchCache.get(cacheKey) as SearchResponse | undefined;
  if (cached) return cached;

  const results: SearchResult[] = [];
  const limit = options?.limit || 20;
  const offset = options?.offset || 0;

  // Search documenti normativi
  if (!filters?.type || filters.type.includes('normativa')) {
    try {
      const { data } = await supabase
        .from('documenti_normativi')
        .select('id, titolo, abstract, categoria, regione, created_at')
        .or(`titolo.ilike.%${query}%,abstract.ilike.%${query}%,tags.cs.{${query}}`)
        .limit(limit);
      if (data) {
        results.push(...data.map(d => ({
          id: d.id,
          title: d.titolo,
          description: d.abstract?.substring(0, 200) || '',
          type: 'normativa' as const,
          url: `/normativa/${d.id}`,
          relevanceScore: 0.8,
          highlights: [d.categoria],
          metadata: { regione: d.regione },
          lineage: createLineage('supabase_query', 'universal-search', {
            sourceId: d.id, sourceTable: 'documenti_normativi',
          }),
        })));
      }
    } catch {}
  }

  // Search interpelli
  if (!filters?.type || filters.type.includes('interpello')) {
    try {
      const { data } = await supabase
        .from('interpelli_nazionali')
        .select('id, titolo, descrizione, ente, data_scadenza, created_at')
        .or(`titolo.ilike.%${query}%,descrizione.ilike.%${query}%`)
        .limit(limit);
      if (data) {
        results.push(...data.map(d => ({
          id: d.id,
          title: d.titolo,
          description: d.descrizione?.substring(0, 200) || '',
          type: 'interpello' as const,
          url: `/interpelli/${d.id}`,
          relevanceScore: 0.7,
          highlights: [d.ente, d.data_scadenza].filter(Boolean),
          lineage: createLineage('supabase_query', 'universal-search', {
            sourceId: d.id, sourceTable: 'interpelli_nazionali',
          }),
        })));
      }
    } catch {}
  }

  // Search intelligence news
  if (!filters?.type || filters.type.includes('news')) {
    try {
      const { data } = await supabase
        .from('intelligence_news')
        .select('id, titolo, descrizione, categoria, created_at')
        .or(`titolo.ilike.%${query}%,descrizione.ilike.%${query}%`)
        .limit(limit);
      if (data) {
        results.push(...data.map(d => ({
          id: d.id,
          title: d.titolo,
          description: d.descrizione?.substring(0, 200) || '',
          type: 'news' as const,
          url: `/notizie/${d.id}`,
          relevanceScore: 0.6,
          highlights: [d.categoria].filter(Boolean),
          lineage: createLineage('supabase_query', 'universal-search', {
            sourceId: d.id, sourceTable: 'intelligence_news',
          }),
        })));
      }
    } catch {}
  }

  // Search intelligence scadenze
  if (!filters?.type || filters.type.includes('scadenza')) {
    try {
      const { data } = await supabase
        .from('intelligence_scadenze')
        .select('id, titolo, descrizione, data_scadenza, priorita, created_at')
        .or(`titolo.ilike.%${query}%,descrizione.ilike.%${query}%`)
        .limit(limit);
      if (data) {
        results.push(...data.map(d => ({
          id: d.id,
          title: d.titolo,
          description: d.descrizione?.substring(0, 200) || '',
          type: 'scadenza' as const,
          url: `/scadenze/${d.id}`,
          relevanceScore: d.priorita === 'urgente' ? 0.95 : 0.65,
          highlights: [d.data_scadenza, d.priorita].filter(Boolean),
          lineage: createLineage('supabase_query', 'universal-search', {
            sourceId: d.id, sourceTable: 'intelligence_scadenze',
          }),
        })));
      }
    } catch {}
  }

  // Sort by relevance
  results.sort((a, b) => b.relevanceScore - a.relevanceScore);

  const response: SearchResponse = {
    results: results.slice(offset, offset + limit),
    totalCount: results.length,
    query,
    filters: filters || {},
    lineage: createLineage('supabase_query', 'universal-search', {
      metadata: { resultCount: results.length },
    }),
  };

  searchCache.set(cacheKey, response, 3 * 60 * 1000); // 3 min cache
  return response;
}

/** Search with Gemini embeddings for semantic similarity */
export async function semanticSearch(
  query: string,
  options?: { limit?: number }
): Promise<SearchResponse> {
  // Fallback to full-text search (Gemini embedding integration deferred to edge function)
  return universalSearch(query, undefined, { limit: options?.limit || 10 });
}

/** Alias: searchAll → universalSearch (used by GlobalSearch component) */
export async function searchAll(
  query: string,
  limit: number = 20
): Promise<SearchResponse> {
  return universalSearch(query, undefined, { limit });
}
