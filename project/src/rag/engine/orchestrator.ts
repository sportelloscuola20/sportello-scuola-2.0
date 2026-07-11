/**
 * ============================================================================
 *  SPORTELLO SCUOLA 2.0 — ORCHESTRATOR DEL MOTORE DI AGGREGAZIONE
 * ============================================================================
 *
 *  Loop principale che coordina i 6 stadi:
 *    POLLING → RANK & FILTER → VALIDATION (CROSS-CHECK) → LLM REWRITE →
 *    CACHING & INDEX → PUBLISH
 *
 *  Progettato per essere eseguito come Supabase Edge Function con
 *  cron scheduling (es. ogni 60 secondi per fonti L1/L6-L7).
 *
 * ============================================================================
 */

import { SOURCE_MATRIX, AuthorityLevel, type SourceFeed } from './sources';
import { DEFAULT_ENGINE_CONFIG, type RawFeedItem, type CuratedArticle } from './schema';
import { SYSTEM_PROMPT_V1 } from '../system-prompt';

/* ─── STADIO 1: POLLING ASINCRONO ────────────────────────────────────── */

async function pollSource(source: SourceFeed): Promise<RawFeedItem[]> {
  const { feedUrl, baseUrl, selectorRules, level } = source;
  const url = feedUrl || baseUrl;

  try {
    const response = await fetch(url, {
      headers: { 'User-Agent': 'SportelloScuola2.0/1.0 (Aggregation Engine)' },
      signal: AbortSignal.timeout(15_000),
    });
    if (!response.ok) return [];

    const html = await response.text();
    const items = extractItems(html, source);
    return items;
  } catch {
    return [];
  }
}

function extractItems(html: string, source: SourceFeed): RawFeedItem[] {
  /* Implementazione di parsing RSS / HTML scraping
   * - Per feed RSS: parser XML standard
   * - Per pagine HTML: selettori CSS / regex mirati
   * - Deduplica via contentHash (SHA-256 del titolo + contenuto troncato)
   */
  return [];
}

/* ─── STADIO 2: CLASSIFICAZIONE E RANKING ──────────────────────────────── */

function rankItems(items: RawFeedItem[]): RawFeedItem[] {
  return items
    .filter(item => deduplicate(item.contentHash))
    .sort((a, b) => b.sourceLevel - a.sourceLevel || new Date(b.pubDate).getTime() - new Date(a.pubDate).getTime());
}

/* ─── STADIO 3: VALIDAZIONE CROSS-LIVELLO (L6/L7 → L1/L5) ────────────── */

async function validateTriggerItem(item: RawFeedItem): Promise<boolean> {
  if (item.sourceLevel < AuthorityLevel.L6_UNION_SENSORS) return true;

  /* Logica di validazione:
   * 1. Estrarre parole chiave dal titolo L6/L7 (es. "nota MIM", "decreto", "circolare")
   * 2. Cercare nei feed L1/L5 per corrispondenza semantica
   * 3. Se trovata: agganciare la fonte originale e scartare la bozza trigger
   * 4. Se NON trovata: mettere in coda "pending validation" per revisione manuale
   */
  const keywords = extractKeywords(item.title + ' ' + item.content);
  const primarySources = SOURCE_MATRIX.filter(s =>
    s.level === AuthorityLevel.L1_DOGMATIC_TRUTH ||
    s.level === AuthorityLevel.L5_BINDING_JURISPRUDENCE
  );

  for (const primary of primarySources) {
    const primaryItems = await pollSource(primary);
    const match = primaryItems.find(p =>
      keywords.some(k => p.title.toLowerCase().includes(k) || p.content.toLowerCase().includes(k))
    );
    if (match) {
      item.triggerTargetLevel = primary.level;
      return true;
    }
  }
  return false;
}

/* ─── STADIO 4: RISCITTURA LLM ────────────────────────────────────────── */

async function rewriteWithLLM(item: RawFeedItem): Promise<CuratedArticle | null> {
  const systemPrompt = SYSTEM_PROMPT_V1;

  const userMessage = [
    '=== BOZZA GREZZA DA RISCIVERE ===',
    `Titolo: ${item.title}`,
    `Fonte: ${item.sourceName} (Livello ${item.sourceLevel})`,
    `URL: ${item.url}`,
    `Data: ${item.pubDate}`,
    '',
    '=== CONTENUTO ===',
    item.content,
  ].join('\n');

  try {
    const geminiKey = import.meta.env.VITE_GEMINI_API_KEY;
    const geminiUrl = import.meta.env.VITE_GEMINI_BASE_URL || 'https://generativelanguage.googleapis.com/v1beta';
    const geminiModel = import.meta.env.VITE_GEMINI_MODEL || 'gemini-3.1-flash-lite';

    const response = await fetch(
      `${geminiUrl}/models/${geminiModel}:generateContent?key=${geminiKey}`,
      {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          contents: [{ role: 'user', parts: [{ text: userMessage }] }],
          systemInstruction: { parts: [{ text: systemPrompt }] },
          generationConfig: {
            temperature: DEFAULT_ENGINE_CONFIG.llmTemperature,
            maxOutputTokens: DEFAULT_ENGINE_CONFIG.llmMaxTokens,
            responseMimeType: 'text/plain',
          },
        }),
      }
    );

    if (!response.ok) return null;

    const data = await response.json();
    const rewritten = data.candidates?.[0]?.content?.parts?.[0]?.text || '';

    return {
      validated: null as any,
      curatedAt: new Date().toISOString(),
      llmModel: DEFAULT_ENGINE_CONFIG.llmModel,
      title: extractTitle(rewritten),
      lead: extractLead(rewritten),
      bodyHtml: renderMarkdownToHtml(rewritten),
      legalFootnotes: extractFootnotes(rewritten),
      operationalGuide: extractGuide(rewritten),
      oficialLink: item.url,
    };
  } catch {
    return null;
  }
}

/* ─── STADIO 5: ARCHIVIAZIONE SU SUPABASE + RAG ────────────────────────── */

async function storeArticle(article: CuratedArticle): Promise<void> {
  /* Salva su Supabase table 'news_cache' e indicizza chunk per RAG */
}

/* ─── STADIO 6: PUBBLICAZIONE (invalida cache CDN) ─────────────────────── */

async function publishArticle(article: CuratedArticle): Promise<void> {
  /* Invalida cache Netlify per la route /notizie-scadenze */
}

/* ─── ORCHESTRATOR MAIN LOOP ───────────────────────────────────────────── */

export async function aggregationLoop(): Promise<void> {
  console.log('[SS Engine] ⏱️  Ciclo di aggregazione iniziato');

  for (const source of SOURCE_MATRIX) {
    const rawItems = await pollSource(source);
    if (rawItems.length === 0) continue;

    const ranked = rankItems(rawItems);

    for (const item of ranked) {
      const isValid = await validateTriggerItem(item);
      if (!isValid) continue;

      const article = await rewriteWithLLM(item);
      if (!article) continue;

      await storeArticle(article);
      await publishArticle(article);
    }
  }

  console.log('[SS Engine] ✅ Ciclo di aggregazione completato');
}

/* ─── FUNZIONI DI SUPPORTO ─────────────────────────────────────────────── */

function deduplicate(hash: string): boolean { return true; }
function extractKeywords(text: string): string[] { return []; }
function extractTitle(markdown: string): string { return ''; }
function extractLead(markdown: string): string { return ''; }
function extractFootnotes(markdown: string): string[] { return []; }
function extractGuide(markdown: string): string { return ''; }
function renderMarkdownToHtml(markdown: string): string { return markdown; }

export default { aggregationLoop };
