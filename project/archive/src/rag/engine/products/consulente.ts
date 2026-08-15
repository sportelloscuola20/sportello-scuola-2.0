/**
 * ============================================================================
 *  EMA §36-41 — CONSULENTE INTELLIGENTE PRODUCT ENGINE
 *  Decision process, consultation model, knowledge engine, conversation
 *  history, response quality scoring, prompt management.
 * ============================================================================
 */

import { createLineage, type DataLineageObject } from '../../../foundation/types';
import { eventBus } from '../../../foundation/events';
import type { ProductId } from '../../../services/products';

// ─── Consultation Types ──────────────────────────────────────────────────────

export type ConsultationMode = 'regulatory_lookup' | 'analysis' | 'comparison' | 'guidance' | 'simulation';
export type ResponseQuality = 'excellent' | 'good' | 'acceptable' | 'poor' | 'unusable';
export type ConversationStatus = 'active' | 'paused' | 'completed' | 'archived';

export interface Conversation {
  id: string;
  userId: string;
  title: string;
  status: ConversationStatus;
  mode: ConsultationMode;
  topic: string;
  messageCount: number;
  createdAt: string;
  updatedAt: string;
  lastMessageAt: string;
  lineage: DataLineageObject;
}

export interface ChatMessage {
  id: string;
  conversationId: string;
  role: 'user' | 'assistant' | 'system';
  content: string;
  citations: Citation[];
  quality?: ResponseQuality;
  latencyMs?: number;
  tokens?: number;
  createdAt: string;
  lineage: DataLineageObject;
}

export interface Citation {
  id: string;
  source: string;
  title: string;
  url?: string;
  excerpt: string;
  confidence: number;
  type: 'normativa' | 'giurisprudenza' | 'circolare' | 'prassi' | 'faq';
}

// ─── Decision Process (EMA §37) ─────────────────────────────────────────────

export interface DecisionProcess {
  id: string;
  conversationId: string;
  steps: DecisionStep[];
  outcome: string;
  confidence: number;
  reasoning: string;
  lineage: DataLineageObject;
}

export interface DecisionStep {
  order: number;
  action: string;
  input: string;
  output: string;
  confidence: number;
}

/** Create a decision process */
export function createDecisionProcess(conversationId: string, query: string): DecisionProcess {
  return {
    id: `dp_${Date.now()}`,
    conversationId,
    steps: [
      { order: 1, action: 'query_analysis', input: query, output: 'Query classified', confidence: 0.9 },
      { order: 2, action: 'knowledge_retrieval', input: 'classified_query', output: 'Relevant knowledge retrieved', confidence: 0.85 },
      { order: 3, action: 'response_generation', input: 'retrieved_knowledge', output: 'Response generated', confidence: 0.8 },
    ],
    outcome: '',
    confidence: 0,
    reasoning: '',
    lineage: createLineage('decision_process', `conv:${conversationId}`, { query }),
  };
}

// ─── Knowledge Engine (EMA §39) ─────────────────────────────────────────────

export interface KnowledgeQuery {
  text: string;
  intent: string;
  entities: string[];
  topicFilters: string[];
  maxResults: number;
}

export interface KnowledgeResult {
  id: string;
  content: string;
  source: string;
  relevance: number;
  authority: number;
  recency: number;
  type: string;
  lineage: DataLineageObject;
}

/** Query the knowledge engine */
export function queryKnowledge(query: KnowledgeQuery): KnowledgeResult[] {
  // Simulated knowledge retrieval
  return [
    {
      id: 'kb_1',
      content: `Risultato per: ${query.text}`,
      source: 'knowledge_base',
      relevance: 0.9,
      authority: 0.85,
      recency: 0.7,
      type: 'normativa',
      lineage: createLineage('knowledge_query', 'kb', { query: query.text }),
    },
  ];
}

// ─── Response Quality Scorer (EMA §40) ──────────────────────────────────────

export interface QualityScore {
  overall: ResponseQuality;
  scores: {
    relevance: number; // 0-1
    accuracy: number; // 0-1
    completeness: number; // 0-1
    clarity: number; // 0-1
    citationQuality: number; // 0-1
  };
  feedback?: string;
  lineage: DataLineageObject;
}

/** Score response quality */
export function scoreResponseQuality(
  query: string,
  response: string,
  citations: Citation[]
): QualityScore {
  const scores = {
    relevance: 0.8,
    accuracy: 0.85,
    completeness: 0.7,
    clarity: 0.9,
    citationQuality: citations.length > 0 ? 0.8 : 0.3,
  };

  const avg = Object.values(scores).reduce((a, b) => a + b, 0) / Object.values(scores).length;

  let overall: ResponseQuality;
  if (avg >= 0.9) overall = 'excellent';
  else if (avg >= 0.75) overall = 'good';
  else if (avg >= 0.6) overall = 'acceptable';
  else if (avg >= 0.4) overall = 'poor';
  else overall = 'unusable';

  return {
    overall,
    scores,
    lineage: createLineage('quality_score', 'response', {
      overall,
      avgScore: avg,
    }),
  };
}

// ─── Conversation Management ────────────────────────────────────────────────

/** Create a new conversation */
export function createConversation(
  userId: string,
  title: string,
  mode: ConsultationMode,
  topic: string
): Conversation {
  return {
    id: `conv_${Date.now()}_${Math.random().toString(36).slice(2, 8)}`,
    userId,
    title,
    status: 'active',
    mode,
    topic,
    messageCount: 0,
    createdAt: new Date().toISOString(),
    updatedAt: new Date().toISOString(),
    lastMessageAt: new Date().toISOString(),
    lineage: createLineage('conversation_create', 'new', { userId, mode, topic }),
  };
}

/** Add message to conversation */
export function addMessage(
  conversation: Conversation,
  role: 'user' | 'assistant' | 'system',
  content: string,
  citations: Citation[] = [],
  latencyMs?: number
): { conversation: Conversation; message: ChatMessage } {
  const message: ChatMessage = {
    id: `msg_${Date.now()}_${Math.random().toString(36).slice(2, 8)}`,
    conversationId: conversation.id,
    role,
    content,
    citations,
    latencyMs,
    createdAt: new Date().toISOString(),
    lineage: createLineage('chat_message', `conv:${conversation.id}`, {
      role,
      contentLength: content.length,
      citationCount: citations.length,
    }),
  };

  const updatedConversation = {
    ...conversation,
    messageCount: conversation.messageCount + 1,
    updatedAt: new Date().toISOString(),
    lastMessageAt: new Date().toISOString(),
  };

  eventBus.emit({
    type: 'chat.message_sent',
    conversationId: conversation.id,
    role,
    messageLength: content.length,
    timestamp: new Date().toISOString(),
    lineage: message.lineage,
  } as any);

  return { conversation: updatedConversation, message };
}

/** Complete a conversation */
export function completeConversation(conversation: Conversation): Conversation {
  return {
    ...conversation,
    status: 'completed',
    updatedAt: new Date().toISOString(),
  };
}

/** Archive a conversation */
export function archiveConversation(conversation: Conversation): Conversation {
  return {
    ...conversation,
    status: 'archived',
    updatedAt: new Date().toISOString(),
  };
}

// ─── Prompt Management (EMA §41) ────────────────────────────────────────────

export interface PromptTemplate {
  id: string;
  name: string;
  mode: ConsultationMode;
  template: string;
  variables: string[];
  version: number;
  active: boolean;
}

/** Get system prompt for a consultation mode */
export function getSystemPrompt(mode: ConsultationMode): string {
  const prompts: Record<ConsultationMode, string> = {
    regulatory_lookup: 'Sei un assistente specializzato nella normativa scolastica italiana. Rispondi in modo preciso e citando le fonti normative.',
    analysis: 'Sei un analista specializzato nel settore scolastico. Fornisci analisi approfondite con dati e trend.',
    comparison: 'Sei un esperto di confronto normativo. Confronta diverse disposizioni evidenziando differenze e analogie.',
    guidance: 'Sei un consulente specializzato nel lavoro scolastico. Fornisci guida pratica con checklist e azioni concrete.',
    simulation: 'Sei un simulatore di scenario scolastico. Simula possibili esiti in base a diversi parametri.',
  };
  return prompts[mode];
}

/** Format citations for display */
export function formatCitations(citations: Citation[]): string {
  return citations
    .map((c, i) => `[${i + 1}] ${c.source}: ${c.title} — "${c.excerpt}"`)
    .join('\n');
}
