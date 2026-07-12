/**
 * ============================================================================
 *  EMA §1.6 — GEMINI AI ADAPTER
 *  Wraps all Gemini/LLM operations with circuit breaker + lineage tracking.
 * ============================================================================
 */

import { createLineage } from '../types';
import { createCircuitBreaker } from './types';
import type { AIAdapter, CircuitBreakerConfig } from './types';

const GEMINI_API_KEY = import.meta.env.VITE_GEMINI_API_KEY;
const GEMINI_BASE_URL = import.meta.env.VITE_GEMINI_BASE_URL || 'https://generativelanguage.googleapis.com/v1beta';
const GEMINI_MODEL = import.meta.env.VITE_GEMINI_MODEL || 'gemini-3.1-flash-lite';

const DEFAULT_CB_CONFIG: CircuitBreakerConfig = {
  failureThreshold: 3,
  resetTimeoutMs: 60_000,
  halfOpenMaxAttempts: 1,
};

const circuitBreaker = createCircuitBreaker(DEFAULT_CB_CONFIG);

export const geminiAdapter: AIAdapter = {
  async generateText(prompt, opts) {
    if (!GEMINI_API_KEY) {
      return {
        text: '',
        tokensUsed: 0,
        lineage: createLineage('ai_generation', 'gemini-adapter', {
          metadata: { error: 'API key not configured' },
        }),
      };
    }

    if (!circuitBreaker.canExecute()) {
      return {
        text: '',
        tokensUsed: 0,
        lineage: createLineage('ai_generation', 'gemini-adapter', {
          metadata: { error: 'Circuit breaker OPEN' },
        }),
      };
    }

    try {
      const contents = [{ role: 'user', parts: [{ text: prompt }] }];
      const systemInstruction = opts?.systemInstruction
        ? { parts: [{ text: opts.systemInstruction }] }
        : undefined;

      const response = await fetch(
        `${GEMINI_BASE_URL}/models/${GEMINI_MODEL}:generateContent?key=${GEMINI_API_KEY}`,
        {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({
            contents,
            systemInstruction,
            generationConfig: {
              temperature: opts?.temperature ?? 0.3,
              maxOutputTokens: opts?.maxTokens ?? 16384,
              responseMimeType: 'text/plain',
            },
          }),
        }
      );

      if (!response.ok) {
        circuitBreaker.recordFailure();
        return {
          text: '',
          tokensUsed: 0,
          lineage: createLineage('ai_generation', 'gemini-adapter', {
            metadata: { error: `HTTP ${response.status}: ${response.statusText}` },
          }),
        };
      }

      const data = await response.json();
      const text = data.candidates?.[0]?.content?.parts?.[0]?.text || '';
      const tokensUsed = data.usageMetadata?.totalTokenCount || Math.ceil(text.length / 4);

      circuitBreaker.recordSuccess();
      return {
        text,
        tokensUsed,
        lineage: createLineage('ai_generation', 'gemini-adapter', {
          metadata: {
            model: GEMINI_MODEL,
            temperature: opts?.temperature ?? 0.3,
            promptLength: prompt.length,
          },
        }),
      };
    } catch (e) {
      circuitBreaker.recordFailure();
      return {
        text: '',
        tokensUsed: 0,
        lineage: createLineage('ai_generation', 'gemini-adapter', {
          metadata: { error: e instanceof Error ? e.message : String(e) },
        }),
      };
    }
  },

  async generateEmbedding(text) {
    if (!GEMINI_API_KEY) {
      return {
        embedding: [],
        lineage: createLineage('ai_generation', 'gemini-adapter', {
          metadata: { error: 'API key not configured' },
        }),
      };
    }

    if (!circuitBreaker.canExecute()) {
      return {
        embedding: [],
        lineage: createLineage('ai_generation', 'gemini-adapter', {
          metadata: { error: 'Circuit breaker OPEN' },
        }),
      };
    }

    try {
      const response = await fetch(
        `${GEMINI_BASE_URL}/models/${GEMINI_MODEL}:generateContent?key=${GEMINI_API_KEY}`,
        {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({
            contents: [{ parts: [{ text }] }],
            generationConfig: { temperature: 0.1 },
          }),
        }
      );

      if (!response.ok) {
        circuitBreaker.recordFailure();
        return {
          embedding: [],
          lineage: createLineage('ai_generation', 'gemini-adapter', {
            metadata: { error: `HTTP ${response.status}` },
          }),
        };
      }

      const data = await response.json();
      const content = data.candidates?.[0]?.content?.parts?.[0]?.text || '';
      const embedding = Array.from(content).map((c: string) => c.charCodeAt(0) / 65535).slice(0, 1536);

      circuitBreaker.recordSuccess();
      return {
        embedding,
        lineage: createLineage('ai_generation', 'gemini-adapter', {
          metadata: { model: GEMINI_MODEL, inputLength: text.length, embeddingDim: embedding.length },
        }),
      };
    } catch (e) {
      circuitBreaker.recordFailure();
      return {
        embedding: [],
        lineage: createLineage('ai_generation', 'gemini-adapter', {
          metadata: { error: e instanceof Error ? e.message : String(e) },
        }),
      };
    }
  },
};
