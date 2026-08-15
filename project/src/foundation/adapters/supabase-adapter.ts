/**
 * ============================================================================
 *  EMA §1.6 — SUPABASE ADAPTER
 *  Wraps all Supabase operations with circuit breaker + lineage tracking.
 * ============================================================================
 */

import { supabase } from '../../lib/supabaseClient';
import { createLineage } from '../types';
import { createCircuitBreaker } from './types';
import type { DatabaseAdapter, CircuitBreakerConfig } from './types';

const DEFAULT_CB_CONFIG: CircuitBreakerConfig = {
  failureThreshold: 5,
  resetTimeoutMs: 30_000,
  halfOpenMaxAttempts: 2,
};

const circuitBreaker = createCircuitBreaker(DEFAULT_CB_CONFIG);

export const supabaseAdapter: DatabaseAdapter = {
  async query<T>(table: string, opts: NonNullable<Parameters<DatabaseAdapter['query']>[1]>) {
    if (!circuitBreaker.canExecute()) {
      return {
        data: null,
        error: new Error('Circuit breaker OPEN — Supabase temporarily unavailable'),
        lineage: createLineage('supabase_query', 'supabase-adapter', { sourceTable: table }),
      };
    }

    try {
      let q = supabase.from(table).select(opts.select || '*');

      if (opts.filters) {
        for (const [key, value] of Object.entries(opts.filters)) {
          if (value === null) {
            q = q.is(key, null);
          } else if (Array.isArray(value)) {
            q = q.in(key, value);
          } else {
            q = q.eq(key, value);
          }
        }
      }

      if (opts.order) {
        q = q.order(opts.order.column, { ascending: opts.order.ascending });
      }

      if (opts.limit) {
        q = q.limit(opts.limit);
      }

      if (opts.range) {
        q = q.range(opts.range.from, opts.range.to);
      }

      const { data, error } = await q;

      if (error) {
        circuitBreaker.recordFailure();
        return {
          data: null,
          error: new Error(error.message),
          lineage: createLineage('supabase_query', 'supabase-adapter', { sourceTable: table }),
        };
      }

      circuitBreaker.recordSuccess();
      return {
        data: data as T[],
        error: null,
        lineage: createLineage('supabase_query', 'supabase-adapter', {
          sourceTable: table,
          metadata: { rowCount: data?.length },
        }),
      };
    } catch (e) {
      circuitBreaker.recordFailure();
      return {
        data: null,
        error: e instanceof Error ? e : new Error(String(e)),
        lineage: createLineage('supabase_query', 'supabase-adapter', { sourceTable: table }),
      };
    }
  },

  async querySingle<T>(table: string, opts: NonNullable<Parameters<DatabaseAdapter['querySingle']>[1]>) {
    const result = await this.query<T>(table, { ...opts, limit: 1 });
    return {
      data: result.data?.[0] ?? null,
      error: result.error,
      lineage: result.lineage,
    };
  },

  async insert<T>(table: string, row: Partial<T>) {
    if (!circuitBreaker.canExecute()) {
      return {
        data: null,
        error: new Error('Circuit breaker OPEN'),
        lineage: createLineage('supabase_query', 'supabase-adapter', { sourceTable: table }),
      };
    }

    try {
      const { data, error } = await supabase
        .from(table)
        .insert(row)
        .select()
        .single();

      if (error) {
        circuitBreaker.recordFailure();
        return {
          data: null,
          error: new Error(error.message),
          lineage: createLineage('supabase_query', 'supabase-adapter', { sourceTable: table }),
        };
      }

      circuitBreaker.recordSuccess();
      return {
        data: data as T,
        error: null,
        lineage: createLineage('supabase_query', 'supabase-adapter', { sourceTable: table }),
      };
    } catch (e) {
      circuitBreaker.recordFailure();
      return {
        data: null,
        error: e instanceof Error ? e : new Error(String(e)),
        lineage: createLineage('supabase_query', 'supabase-adapter', { sourceTable: table }),
      };
    }
  },

  async update<T>(table: string, filters: Record<string, unknown>, updates: Partial<T>) {
    if (!circuitBreaker.canExecute()) {
      return {
        data: null,
        error: new Error('Circuit breaker OPEN'),
        lineage: createLineage('supabase_query', 'supabase-adapter', { sourceTable: table }),
      };
    }

    try {
      let q = supabase.from(table).update(updates);

      for (const [key, value] of Object.entries(filters)) {
        q = q.eq(key, value);
      }

      const { data, error } = await q.select().single();

      if (error) {
        circuitBreaker.recordFailure();
        return {
          data: null,
          error: new Error(error.message),
          lineage: createLineage('supabase_query', 'supabase-adapter', { sourceTable: table }),
        };
      }

      circuitBreaker.recordSuccess();
      return {
        data: data as T,
        error: null,
        lineage: createLineage('supabase_query', 'supabase-adapter', { sourceTable: table }),
      };
    } catch (e) {
      circuitBreaker.recordFailure();
      return {
        data: null,
        error: e instanceof Error ? e : new Error(String(e)),
        lineage: createLineage('supabase_query', 'supabase-adapter', { sourceTable: table }),
      };
    }
  },

  async remove(table: string, filters: Record<string, unknown>) {
    if (!circuitBreaker.canExecute()) {
      return {
        error: new Error('Circuit breaker OPEN'),
        lineage: createLineage('supabase_query', 'supabase-adapter', { sourceTable: table }),
      };
    }

    try {
      let q = supabase.from(table).delete();

      for (const [key, value] of Object.entries(filters)) {
        q = q.eq(key, value);
      }

      const { error } = await q;

      if (error) {
        circuitBreaker.recordFailure();
        return {
          error: new Error(error.message),
          lineage: createLineage('supabase_query', 'supabase-adapter', { sourceTable: table }),
        };
      }

      circuitBreaker.recordSuccess();
      return {
        error: null,
        lineage: createLineage('supabase_query', 'supabase-adapter', { sourceTable: table }),
      };
    } catch (e) {
      circuitBreaker.recordFailure();
      return {
        error: e instanceof Error ? e : new Error(String(e)),
        lineage: createLineage('supabase_query', 'supabase-adapter', { sourceTable: table }),
      };
    }
  },

  async rpc<T>(fn: string, params?: Record<string, unknown>) {
    if (!circuitBreaker.canExecute()) {
      return {
        data: null,
        error: new Error('Circuit breaker OPEN'),
        lineage: createLineage('supabase_query', 'supabase-adapter'),
      };
    }

    try {
      const { data, error } = await supabase.rpc(fn, params || {});

      if (error) {
        circuitBreaker.recordFailure();
        return {
          data: null,
          error: new Error(error.message),
          lineage: createLineage('supabase_query', 'supabase-adapter'),
        };
      }

      circuitBreaker.recordSuccess();
      return {
        data: data as T,
        error: null,
        lineage: createLineage('supabase_query', 'supabase-adapter'),
      };
    } catch (e) {
      circuitBreaker.recordFailure();
      return {
        data: null,
        error: e instanceof Error ? e : new Error(String(e)),
        lineage: createLineage('supabase_query', 'supabase-adapter'),
      };
    }
  },

  async invoke<T>(fn: string, body?: unknown) {
    if (!circuitBreaker.canExecute()) {
      return {
        data: null,
        error: new Error('Circuit breaker OPEN'),
        lineage: createLineage('edge_function', 'supabase-adapter'),
      };
    }

    try {
      const { data, error } = await supabase.functions.invoke(fn, { body: body as Record<string, unknown> });

      if (error) {
        circuitBreaker.recordFailure();
        return {
          data: null,
          error: new Error(error.message),
          lineage: createLineage('edge_function', 'supabase-adapter'),
        };
      }

      circuitBreaker.recordSuccess();
      return {
        data: data as T,
        error: null,
        lineage: createLineage('edge_function', 'supabase-adapter'),
      };
    } catch (e) {
      circuitBreaker.recordFailure();
      return {
        data: null,
        error: e instanceof Error ? e : new Error(String(e)),
        lineage: createLineage('edge_function', 'supabase-adapter'),
      };
    }
  },
};
