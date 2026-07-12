/**
 * ============================================================================
 *  EMA §19-23 — INTERPELLI PRODUCT ENGINE
 *  Interpello lifecycle, deadline management, AI analysis, knowledge base.
 * ============================================================================
 */

import { createLineage, type DataLineageObject } from '../../../foundation/types';
import { eventBus } from '../../../foundation/events';
import type { ProductId } from '../../../services/products';

// ─── Interpello Types ────────────────────────────────────────────────────────

export type InterpelloStatus =
  | 'draft'
  | 'submitted'
  | 'under_review'
  | 'answered'
  | 'closed';

export type InterpelloCategory =
  | 'didattica'
  | 'personale'
  | 'amministrativo'
  | 'normativo'
  | 'finanziario'
  | 'organizzativo';

export interface Interpello {
  id: string;
  title: string;
  question: string;
  ente: string;
  regione?: string;
  status: InterpelloStatus;
  category: InterpelloCategory;
  targetAudience: string[];
  submittedAt: string;
  answeredAt?: string;
  deadline?: string;
  answer?: InterpelloAnswer;
  tags: string[];
  relevanceScore: number;
  lineage: DataLineageObject;
}

export interface InterpelloAnswer {
  content: string;
  author: string;
  citations: string[];
  generatedAt: string;
  confidence: number;
  lineage: DataLineageObject;
}

// ─── Interpello Card (EMA §20) ──────────────────────────────────────────────

export interface InterpelloCard {
  id: string;
  title: string;
  question: string;
  ente: string;
  status: InterpelloStatus;
  statusLabel: string;
  category: InterpelloCategory;
  submittedAt: string;
  answeredAt?: string;
  deadline?: string;
  hasAnswer: boolean;
  tags: string[];
  url: string;
  lineage: DataLineageObject;
}

// ─── Relevance Engine (EMA §22) ─────────────────────────────────────────────

export interface RelevanceFactors {
  authorityScore: number; // 0-1
  recencyScore: number; // 0-1
  categoryMatch: boolean;
  audienceMatch: boolean;
  citationCount: number;
}

/** Calculate relevance score for an interpello */
export function calculateRelevance(
  interpello: Interpello,
  userContext?: { role?: string; regione?: string; interests?: string[] }
): { score: number; factors: RelevanceFactors } {
  let score = 0.5; // base

  const factors: RelevanceFactors = {
    authorityScore: 0.5,
    recencyScore: 0.5,
    categoryMatch: false,
    audienceMatch: false,
    citationCount: interpello.answer?.citations.length || 0,
  };

  // Authority: ente prestige
  const highAuthorityEnte = ['Ministero dell\'Istruzione', 'CNVS', 'MIUR'];
  if (highAuthorityEnte.some(e => interpello.ente.includes(e))) {
    factors.authorityScore = 0.9;
    score += 0.2;
  }

  // Recency
  const ageDays = (Date.now() - new Date(interpello.submittedAt).getTime()) / (1000 * 60 * 60 * 24);
  if (ageDays < 7) { factors.recencyScore = 1.0; score += 0.2; }
  else if (ageDays < 30) { factors.recencyScore = 0.7; score += 0.1; }
  else if (ageDays < 90) { factors.recencyScore = 0.4; }
  else { factors.recencyScore = 0.1; score -= 0.1; }

  // User context matching
  if (userContext) {
    if (userContext.role && interpello.targetAudience.includes(userContext.role)) {
      factors.audienceMatch = true;
      score += 0.15;
    }
    if (userContext.interests) {
      const matchingInterests = userContext.interests.filter(i =>
        interpello.tags.some(t => t.toLowerCase().includes(i.toLowerCase()))
      );
      if (matchingInterests.length > 0) {
        factors.categoryMatch = true;
        score += 0.1;
      }
    }
  }

  return { score: Math.max(0, Math.min(1, score)), factors };
}

// ─── Lifecycle Management ───────────────────────────────────────────────────

export function createInterpello(data: {
  title: string;
  question: string;
  ente: string;
  regione?: string;
  category: InterpelloCategory;
  targetAudience: string[];
  tags?: string[];
}): Interpello {
  return {
    id: `int_${Date.now()}_${Math.random().toString(36).slice(2, 8)}`,
    title: data.title,
    question: data.question,
    ente: data.ente,
    regione: data.regione,
    status: 'draft',
    category: data.category,
    targetAudience: data.targetAudience,
    submittedAt: new Date().toISOString(),
    tags: data.tags || [],
    relevanceScore: 0.5,
    lineage: createLineage('interpello_creation', 'new', {
      title: data.title,
      ente: data.ente,
    }),
  };
}

export function submitInterpello(interpello: Interpello): Interpello {
  if (interpello.status !== 'draft') {
    throw new Error(`Cannot submit interpello in status ${interpello.status}`);
  }
  return { ...interpello, status: 'submitted', submittedAt: new Date().toISOString() };
}

export function answerInterpello(
  interpello: Interpello,
  answer: Omit<InterpelloAnswer, 'generatedAt' | 'lineage'>
): Interpello {
  if (interpello.status !== 'submitted' && interpello.status !== 'under_review') {
    throw new Error(`Cannot answer interpello in status ${interpello.status}`);
  }

  const fullAnswer: InterpelloAnswer = {
    ...answer,
    generatedAt: new Date().toISOString(),
    lineage: createLineage('interpello_answer', `int:${interpello.id}`, {
      author: answer.author,
      citationCount: answer.citations.length,
    }),
  };

  eventBus.emit({
    type: 'interpello.answered',
    interpelloId: interpello.id,
    ente: interpello.ente,
    timestamp: new Date().toISOString(),
    lineage: fullAnswer.lineage,
  } as any);

  return {
    ...interpello,
    status: 'answered',
    answer: fullAnswer,
    answeredAt: new Date().toISOString(),
  };
}

export function closeInterpello(interpello: Interpello): Interpello {
  if (interpello.status !== 'answered') {
    throw new Error(`Cannot close interpello in status ${interpello.status}`);
  }
  return { ...interpello, status: 'closed' };
}

/** Create interpello card from full interpello */
export function createInterpelloCard(interpello: Interpello): InterpelloCard {
  const statusLabels: Record<InterpelloStatus, string> = {
    draft: 'Bozza',
    submitted: 'Inviato',
    under_review: 'In revisione',
    answered: 'Risposto',
    closed: 'Chiuso',
  };

  return {
    id: interpello.id,
    title: interpello.title,
    question: interpello.question,
    ente: interpello.ente,
    status: interpello.status,
    statusLabel: statusLabels[interpello.status],
    category: interpello.category,
    submittedAt: interpello.submittedAt,
    answeredAt: interpello.answeredAt,
    deadline: interpello.deadline,
    hasAnswer: !!interpello.answer,
    tags: interpello.tags,
    url: `/interpelli/${interpello.id}`,
    lineage: interpello.lineage,
  };
}

/** Get deadline info for an interpello */
export function getDeadlineInfo(interpello: Interpello): {
  hasDeadline: boolean;
  deadline?: string;
  daysRemaining?: number;
  isOverdue: boolean;
} {
  if (!interpello.deadline) {
    return { hasDeadline: false, isOverdue: false };
  }

  const deadlineDate = new Date(interpello.deadline);
  const now = new Date();
  const daysRemaining = Math.ceil((deadlineDate.getTime() - now.getTime()) / (1000 * 60 * 60 * 24));

  return {
    hasDeadline: true,
    deadline: interpello.deadline,
    daysRemaining,
    isOverdue: daysRemaining < 0,
  };
}
