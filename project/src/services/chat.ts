/**
 * ============================================================================
 *  EMA §1.6 — CHAT SERVICE
 *  Provides chat/conversation operations without direct Supabase from Layer 5.
 *  All AI responses are routed through the Gemini edge function (no local
 *  knowledge base fallback — EMA §7 compliance).
 * ============================================================================
 */

import { supabaseAdapter } from '../foundation/adapters';
import { eventBus } from '../foundation/events';
import { createLineage } from '../foundation/types';
import type { DataLineageObject } from '../foundation/types';

const SUPABASE_URL = import.meta.env.VITE_SUPABASE_URL as string;
const SUPABASE_ANON_KEY = import.meta.env.VITE_SUPABASE_ANON_KEY as string;

export interface ChatConversation {
  id: string;
  title: string;
  created_at: string;
  updated_at: string;
  user_id: string;
}

export interface ChatMessageRecord {
  id: string;
  conversation_id: string;
  role: 'user' | 'assistant';
  content: string;
  citations?: Array<{ title: string; confidence: number }>;
  latency_ms?: number;
  created_at: string;
}

export interface ChatResponse {
  text: string;
  citations?: Array<{ title: string; confidence: number }>;
  lineage: DataLineageObject;
}

export async function loadConversations(userId: string): Promise<{ data: ChatConversation[]; lineage: DataLineageObject }> {
  const result = await supabaseAdapter.query<ChatConversation>('chat_conversations', {
    select: '*',
    filters: { user_id: userId },
    order: { column: 'updated_at', ascending: false },
    limit: 20,
  });

  return {
    data: result.data || [],
    lineage: result.lineage,
  };
}

export async function loadConversationMessages(conversationId: string): Promise<{ data: ChatMessageRecord[]; lineage: DataLineageObject }> {
  const result = await supabaseAdapter.query<ChatMessageRecord>('chat_messages', {
    select: '*',
    filters: { conversation_id: conversationId },
    order: { column: 'created_at', ascending: true },
  });

  return {
    data: result.data || [],
    lineage: result.lineage,
  };
}

export async function createConversation(userId: string): Promise<{ data: ChatConversation | null; lineage: DataLineageObject }> {
  const result = await supabaseAdapter.insert<ChatConversation>('chat_conversations', {
    user_id: userId,
    title: 'Nuova conversazione',
  });

  if (result.data) {
    eventBus.emit('chat.message_sent', 'chat-service', {
      conversationId: result.data.id,
      userId,
    });
  }

  return result;
}

export async function deleteConversation(conversationId: string): Promise<{ error: Error | null; lineage: DataLineageObject }> {
  return supabaseAdapter.remove('chat_conversations', { id: conversationId });
}

export async function saveMessage(
  conversationId: string,
  role: 'user' | 'assistant',
  content: string,
  citations?: Array<{ title: string; confidence: number }>,
  latencyMs?: number
): Promise<{ data: ChatMessageRecord | null; lineage: DataLineageObject }> {
  return supabaseAdapter.insert<ChatMessageRecord>('chat_messages', {
    conversation_id: conversationId,
    role,
    content,
    citations: citations || [],
    latency_ms: latencyMs || 0,
  });
}

export async function logGeminiCall(
  userId: string,
  query: string,
  response: string,
  latencyMs: number,
  tokensUsed: number
): Promise<void> {
  await supabaseAdapter.insert('gemini_calls_log', {
    user_id: userId,
    prompt_preview: query.slice(0, 200),
    model: 'gemini-3.1-flash-lite',
    tokens_in: tokensUsed,
    tokens_out: Math.ceil(response.length / 4),
    latency_ms: latencyMs,
    status: 'ok',
  });
}

/**
 * Generate AI response — routes ALL queries through Gemini edge function.
 * EMA §7: No local knowledge base. All responses are AI-generated with
 * source citations from the RAG pipeline.
 *
 * System prompt includes:
 * - 107 Italian USP provinces data
 * - CCNL Istruzione e Ricerca 2019-2021
 * - OM 88/2024 (GPS)
 * - DM 89/2024 (ATA)
 * - L. 104/1992, D.Lgs. 151/2001, L. 68/1999
 * - All EMA document products
 */
export async function generateChatResponse(
  userMessage: string,
  history: Array<{ role: string; content: string }>,
  additionalContext?: string
): Promise<ChatResponse> {
  const MAX_RETRIES = 2;

  for (let attempt = 0; attempt < MAX_RETRIES; attempt++) {
    try {
      const controller = new AbortController();
      const timeoutId = setTimeout(() => controller.abort(), 45000);

      const res = await fetch(`${SUPABASE_URL}/functions/v1/ai-sindacalista`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${SUPABASE_ANON_KEY}`,
        },
        body: JSON.stringify({
          message: userMessage,
          history: history.slice(-10),
          context: additionalContext || '',
        }),
        signal: controller.signal,
      });

      clearTimeout(timeoutId);

      if (res.ok) {
        const data = await res.json();
        if (data.response) {
          eventBus.emit('chat.response_generated', 'chat-service', {
            hasCitations: (data.citations?.length ?? 0) > 0,
          });
          return {
            text: data.response,
            citations: data.citations || [],
            lineage: createLineage('gemini_response', 'chat-service', {
              metadata: { query: userMessage.slice(0, 100), model: 'gemini-3.1-flash-lite' },
            }),
          };
        }
      }

      let errorBody = '';
      try { errorBody = await res.text(); } catch { errorBody = res.statusText; }

      const isRateLimit = res.status === 429 || errorBody.includes('429') || errorBody.includes('rate') || errorBody.includes('quota');
      console.error(`[chat-service] Edge function HTTP ${res.status} (attempt ${attempt + 1}):`, errorBody.slice(0, 300));

      if (isRateLimit && attempt < MAX_RETRIES - 1) {
        const waitMs = Math.pow(2, attempt + 1) * 1000 + Math.floor(Math.random() * 1000);
        await new Promise(r => setTimeout(r, Math.min(waitMs, 8000)));
        continue;
      }

      if (isRateLimit) {
        return {
          text: `⚠️ **Servizio temporaneamente non disponibile**\n\nTroppe richieste simultanee al sistema AI. Il limite è di 15 richieste al minuto.\n\n**Cosa fare:**\n- Attendi 1-2 minuti e riprova\n- Se il problema persiste, prova con una domanda più breve\n- Per urgenze: sportelloscuola2.0@gmail.com`,
          lineage: createLineage('rate_limited', 'chat-service', {
            metadata: { query: userMessage.slice(0, 100) },
          }),
        };
      }

      if (attempt < MAX_RETRIES - 1) {
        await new Promise(r => setTimeout(r, 1500));
        continue;
      }

      return {
        text: `Mi scuso, il servizio non è al momento disponibile (HTTP ${res.status}). Riprova tra qualche istante.`,
        lineage: createLineage('error', 'chat-service', {
          metadata: { query: userMessage.slice(0, 100), status: res.status },
        }),
      };
    } catch (e: any) {
      const isAbort = e?.name === 'AbortError';
      console.error(`[chat-service] ${isAbort ? 'Timeout' : 'Exception'} (attempt ${attempt + 1}):`, e?.message || e);

      if (isAbort) {
        return {
          text: `⚠️ **Timeout della richiesta**\n\nLa risposta sta prendendo più del previsto (45s). Riprova con una domanda più breve.`,
          lineage: createLineage('timeout', 'chat-service', {
            metadata: { query: userMessage.slice(0, 100) },
          }),
        };
      }

      if (attempt < MAX_RETRIES - 1) {
        await new Promise(r => setTimeout(r, 2000));
        continue;
      }

      return {
        text: `⚠️ **Errore di connessione**\n\nImpossibile contattare il servizio AI. Verifica la connessione internet e riprova.\n\nSe il problema persiste: sportelloscuola2.0@gmail.com`,
        lineage: createLineage('network_error', 'chat-service', {
          metadata: { query: userMessage.slice(0, 100), error: e?.message },
        }),
      };
    }
  }

  return {
    text: `Mi scuso, il servizio non è al momento disponibile. Riprova tra qualche istante.`,
    lineage: createLineage('error_fallback', 'chat-service', {
      metadata: { query: userMessage.slice(0, 100), fallback: true },
    }),
  };
}
