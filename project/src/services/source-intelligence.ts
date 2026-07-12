/**
 * ============================================================================
 *  EMA §10 — SOURCE INTELLIGENCE ENGINE
 *  RSS/HTML monitoring, content pipeline, and intelligence processing.
 * ============================================================================
 */

import { SOURCE_MATRIX, type SourceFeed } from '../rag/engine/sources';
import { supabase } from '../lib/supabaseClient';
import { createLineage } from '../foundation/types';
import type { DataLineageObject } from '../foundation/types';

export interface FetchedContent {
  source: SourceFeed;
  url: string;
  title: string;
  content: string;
  pubDate: string | null;
  hash: string;
  fetchedAt: string;
}

export interface ProcessingResult {
  sourceName: string;
  itemsProcessed: number;
  itemsNew: number;
  itemsDuplicate: number;
  errors: string[];
  duration: number;
}

/** Fetch RSS feed items from a source */
export async function fetchRssFeed(source: SourceFeed): Promise<FetchedContent[]> {
  if (!source.feedUrl) return [];

  try {
    const response = await fetch(source.feedUrl, {
      headers: { 'User-Agent': 'SportelloScuola/2.0 RSS Monitor' },
      signal: AbortSignal.timeout(15_000),
    });
    if (!response.ok) return [];

    const text = await response.text();
    const items: FetchedContent[] = [];

    // Simple XML RSS parsing
    const itemMatches = text.match(/<item[^>]*>([\s\S]*?)<\/item>/gi) || [];
    for (const item of itemMatches.slice(0, 10)) {
      const title = extractTag(item, 'title');
      const link = extractTag(item, 'link');
      const description = extractTag(item, 'description');
      const pubDate = extractTag(item, 'pubDate');

      if (title && link) {
        items.push({
          source,
          url: link,
          title,
          content: description || '',
          pubDate: pubDate || null,
          hash: simpleHash(`${title}:${link}`),
          fetchedAt: new Date().toISOString(),
        });
      }
    }

    return items;
  } catch {
    return [];
  }
}

/** Extract XML tag content */
function extractTag(xml: string, tag: string): string | null {
  const regex = new RegExp(`<${tag}[^>]*>(?:<!\\[CDATA\\[)?(.*?)(?:\\]\\]>)?<\\/${tag}>`, 'i');
  const match = xml.match(regex);
  return match ? match[1].trim() : null;
}

/** Simple string hash for deduplication */
function simpleHash(str: string): string {
  let hash = 0;
  for (let i = 0; i < str.length; i++) {
    const char = str.charCodeAt(i);
    hash = ((hash << 5) - hash) + char;
    hash |= 0;
  }
  return Math.abs(hash).toString(36);
}

/** Check if content already exists in source_documents */
export async function isDuplicate(hash: string): Promise<boolean> {
  try {
    const { data } = await supabase
      .from('source_documents')
      .select('id')
      .eq('content_hash', hash)
      .limit(1);
    return !!data && data.length > 0;
  } catch {
    return false;
  }
}

/** Store fetched content in source_documents queue */
export async function storeContent(content: FetchedContent): Promise<boolean> {
  try {
    const { error } = await supabase
      .from('source_documents')
      .insert({
        source_name: content.source.name,
        source_url: content.url,
        title: content.title,
        content_text: content.content,
        content_hash: content.hash,
        pub_date: content.pubDate,
        status: 'queued',
        created_at: content.fetchedAt,
      });
    return !error;
  } catch {
    return false;
  }
}

/** Run monitoring cycle for all active sources */
export async function runMonitoringCycle(): Promise<ProcessingResult[]> {
  const activeSources = SOURCE_MATRIX.filter(s => !s.isTriggerOnly);
  const results: ProcessingResult[] = [];

  for (const source of activeSources) {
    const start = Date.now();
    const result: ProcessingResult = {
      sourceName: source.name,
      itemsProcessed: 0,
      itemsNew: 0,
      itemsDuplicate: 0,
      errors: [],
      duration: 0,
    };

    try {
      const items = await fetchRssFeed(source);
      result.itemsProcessed = items.length;

      for (const item of items) {
        const dup = await isDuplicate(item.hash);
        if (dup) {
          result.itemsDuplicate++;
          continue;
        }
        const stored = await storeContent(item);
        if (stored) result.itemsNew++;
      }
    } catch (e: any) {
      result.errors.push(e.message);
    }

    result.duration = Date.now() - start;
    results.push(result);
  }

  return results;
}

/** Get monitoring stats */
export async function getMonitoringStats(): Promise<{
  totalSources: number;
  activeSources: number;
  queuedDocuments: number;
  processedToday: number;
}> {
  const active = SOURCE_MATRIX.filter(s => !s.isTriggerOnly).length;

  try {
    const [queued, processed] = await Promise.all([
      supabase.from('source_documents').select('*', { count: 'exact', head: true }).eq('status', 'queued'),
      supabase.from('source_documents').select('*', { count: 'exact', head: true })
        .gte('created_at', new Date(Date.now() - 86400_000).toISOString()),
    ]);

    return {
      totalSources: SOURCE_MATRIX.length,
      activeSources: active,
      queuedDocuments: queued.count || 0,
      processedToday: processed.count || 0,
    };
  } catch {
    return {
      totalSources: SOURCE_MATRIX.length,
      activeSources: active,
      queuedDocuments: 0,
      processedToday: 0,
    };
  }
}
