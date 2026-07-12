/**
 * ============================================================================
 *  EMA §1.6 — ADAPTER PATTERN
 *  Experience Layer non accede direttamente al database.
 *  Tutte le chiamate esterne passano attraverso adapter astratti.
 * ============================================================================
 */

import type { DataLineageObject } from '../types';

/**
 * Circuit Breaker states per EMA resilience requirements.
 */
export type CircuitState = 'closed' | 'open' | 'half_open';

export interface CircuitBreakerConfig {
  failureThreshold: number;
  resetTimeoutMs: number;
  halfOpenMaxAttempts: number;
}

export interface CircuitBreaker {
  state: CircuitState;
  failureCount: number;
  lastFailureTime: number | null;
  recordSuccess(): void;
  recordFailure(): void;
  canExecute(): boolean;
}

export function createCircuitBreaker(config: CircuitBreakerConfig): CircuitBreaker {
  let state: CircuitState = 'closed';
  let failureCount = 0;
  let lastFailureTime: number | null = null;
  let halfOpenAttempts = 0;

  return {
    get state() { return state; },
    get failureCount() { return failureCount; },
    get lastFailureTime() { return lastFailureTime; },

    recordSuccess() {
      failureCount = 0;
      halfOpenAttempts = 0;
      state = 'closed';
    },

    recordFailure() {
      failureCount++;
      lastFailureTime = Date.now();

      if (state === 'half_open') {
        halfOpenAttempts++;
        if (halfOpenAttempts >= config.halfOpenMaxAttempts) {
          state = 'open';
        }
      } else if (failureCount >= config.failureThreshold) {
        state = 'open';
      }
    },

    canExecute(): boolean {
      if (state === 'closed') return true;
      if (state === 'open') {
        if (lastFailureTime && Date.now() - lastFailureTime >= config.resetTimeoutMs) {
          state = 'half_open';
          halfOpenAttempts = 0;
          return true;
        }
        return false;
      }
      // half_open: allow limited attempts
      return halfOpenAttempts < config.halfOpenMaxAttempts;
    },
  };
}

/**
 * Generic adapter interface for database operations.
 * All Supabase calls must go through this interface.
 */
export interface DatabaseAdapter {
  query<T>(table: string, opts: {
    select?: string;
    filters?: Record<string, unknown>;
    order?: { column: string; ascending: boolean };
    limit?: number;
    range?: { from: number; to: number };
  }): Promise<{ data: T[] | null; error: Error | null; lineage: DataLineageObject }>;

  querySingle<T>(table: string, opts: {
    select?: string;
    filters?: Record<string, unknown>;
  }): Promise<{ data: T | null; error: Error | null; lineage: DataLineageObject }>;

  insert<T>(table: string, row: Partial<T>): Promise<{ data: T | null; error: Error | null; lineage: DataLineageObject }>;

  update<T>(table: string, filters: Record<string, unknown>, updates: Partial<T>): Promise<{ data: T | null; error: Error | null; lineage: DataLineageObject }>;

  remove(table: string, filters: Record<string, unknown>): Promise<{ error: Error | null; lineage: DataLineageObject }>;

  rpc<T>(fn: string, params?: Record<string, unknown>): Promise<{ data: T | null; error: Error | null; lineage: DataLineageObject }>;

  invoke<T>(fn: string, body?: unknown): Promise<{ data: T | null; error: Error | null; lineage: DataLineageObject }>;
}

/**
 * Generic adapter interface for AI operations.
 * All Gemini/LLM calls must go through this interface.
 */
export interface AIAdapter {
  generateText(prompt: string, opts?: {
    systemInstruction?: string;
    temperature?: number;
    maxTokens?: number;
  }): Promise<{ text: string; tokensUsed: number; lineage: DataLineageObject }>;

  generateEmbedding(text: string): Promise<{ embedding: number[]; lineage: DataLineageObject }>;
}

/**
 * Generic adapter interface for email/notification operations.
 */
export interface NotificationAdapter {
  sendEmail(params: {
    to: string;
    subject: string;
    body: string;
    from?: string;
  }): Promise<{ success: boolean; error?: Error; lineage: DataLineageObject }>;
}
