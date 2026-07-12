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
  // Route through Gemini edge function — the ONLY response path
  try {
    const result = await supabaseAdapter.invoke<{
      response: string;
      citations?: Array<{ title: string; confidence: number }>;
    }>('ai-sindacalista', {
      message: userMessage,
      history: history.slice(-10),
      context: additionalContext || '',
    });

    if (!result.error && result.data?.response) {
      eventBus.emit('chat.response_generated', 'chat-service', {
        hasCitations: (result.data.citations?.length ?? 0) > 0,
      });

      return {
        text: result.data.response,
        citations: result.data.citations || [],
        lineage: result.lineage,
      };
    }
  } catch {
    // Fall through to error message
  }

  // Error fallback — user must retry (no pre-packaged responses)
  return {
    text: `Mi scuso, il servizio è temporaneamente in sovraccarico. Riprova tra qualche istante. Se il problema persiste, contatta il supporto.`,
    lineage: createLineage('error_fallback', 'chat-service', {
      metadata: { query: userMessage.slice(0, 100), fallback: true },
    }),
  };
}
