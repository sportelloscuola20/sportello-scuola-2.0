/**
 * ============================================================================
 *  EMA §2 / §4 — EVENT DRIVEN ARCHITECTURE
 *  Ogni modifica genera un evento. I domini comunicano tramite eventi.
 * ============================================================================
 */

export type EventType =
  | 'news.ingested'
  | 'news.published'
  | 'news.updated'
  | 'scadenza.created'
  | 'scadenza.expiring'
  | 'scadenza.expired'
  | 'documento.approved'
  | 'documento.rejected'
  | 'documento.created'
  | 'interpello.created'
  | 'interpello.updated'
  | 'chat.message_sent'
  | 'chat.response_generated'
  | 'search.performed'
  | 'source.checked'
  | 'source.error'
  | 'user.registered'
  | 'user.subscription_changed';

export interface DomainEvent<T = unknown> {
  type: EventType;
  timestamp: string;
  source: string;
  payload: T;
  metadata?: Record<string, unknown>;
}

export type EventHandler<T = unknown> = (event: DomainEvent<T>) => void | Promise<void>;

export interface EventBus {
  emit<T>(type: EventType, source: string, payload: T, metadata?: Record<string, unknown>): void;
  on<T>(type: EventType, handler: EventHandler<T>): () => void;
  once<T>(type: EventType, handler: EventHandler<T>): () => void;
  off(type: EventType, handler: EventHandler): void;
}

type InternalHandler = { handler: EventHandler; once: boolean };

export class InMemoryEventBus implements EventBus {
  private listeners = new Map<string, InternalHandler[]>();
  private history: DomainEvent[] = [];
  private maxHistorySize = 100;

  emit<T>(type: EventType, source: string, payload: T, metadata?: Record<string, unknown>): void {
    const event: DomainEvent<T> = {
      type,
      timestamp: new Date().toISOString(),
      source,
      payload,
      metadata,
    };

    // Store in history
    this.history.push(event);
    if (this.history.length > this.maxHistorySize) {
      this.history = this.history.slice(-this.maxHistorySize);
    }

    // Notify handlers
    const handlers = this.listeners.get(type);
    if (handlers) {
      for (const entry of handlers) {
        try {
          entry.handler(event);
        } catch (err) {
          console.error(`[EventBus] Error in handler for '${type}':`, err);
        }
      }
      // Remove once handlers
      this.listeners.set(
        type,
        handlers.filter(h => !h.once)
      );
    }

    // Also notify wildcard handlers
    const wildcardHandlers = this.listeners.get('*');
    if (wildcardHandlers) {
      for (const entry of wildcardHandlers) {
        try {
          entry.handler(event);
        } catch (err) {
          console.error(`[EventBus] Error in wildcard handler:`, err);
        }
      }
      this.listeners.set(
        '*',
        wildcardHandlers.filter(h => !h.once)
      );
    }
  }

  on<T>(type: EventType, handler: EventHandler<T>): () => void {
    const key = type;
    if (!this.listeners.has(key)) {
      this.listeners.set(key, []);
    }
    this.listeners.get(key)!.push({ handler: handler as EventHandler, once: false });
    return () => this.off(type, handler as EventHandler);
  }

  once<T>(type: EventType, handler: EventHandler<T>): () => void {
    const key = type;
    if (!this.listeners.has(key)) {
      this.listeners.set(key, []);
    }
    this.listeners.get(key)!.push({ handler: handler as EventHandler, once: true });
    return () => this.off(type, handler as EventHandler);
  }

  off(type: EventType, handler: EventHandler): void {
    const handlers = this.listeners.get(type);
    if (handlers) {
      this.listeners.set(
        type,
        handlers.filter(h => h.handler !== handler)
      );
    }
  }

  /** Get recent events for observability */
  getHistory(type?: EventType): DomainEvent[] {
    if (type) return this.history.filter(e => e.type === type);
    return [...this.history];
  }

  /** Clear all listeners and history */
  reset(): void {
    this.listeners.clear();
    this.history = [];
  }
}

/** Singleton event bus instance (in-memory, client-side) */
export const eventBus: EventBus = new InMemoryEventBus();

/**
 * Persistent event bus that wraps InMemoryEventBus with Supabase persistence.
 * Events are stored in domain_events table for cross-session history.
 * Use this for server-side event sourcing (EMA §2/§4).
 */
export class PersistentEventBus implements EventBus {
  private inner: InMemoryEventBus;
  private supabaseClient: any;

  constructor(inner: InMemoryEventBus, supabaseClient: any) {
    this.inner = inner;
    this.supabaseClient = supabaseClient;
  }

  emit<T>(type: EventType, source: string, payload: T, metadata?: Record<string, unknown>): void {
    // Emit locally first (handlers run immediately)
    this.inner.emit(type, source, payload, metadata);

    // Persist to Supabase asynchronously (fire-and-forget)
    if (this.supabaseClient) {
      this.supabaseClient
        .from('domain_events')
        .insert({
          type,
          source,
          payload: payload ?? {},
          metadata: metadata ?? {},
        })
        .then(({ error }: any) => {
          if (error) console.warn('[PersistentEventBus] Failed to persist event:', error.message);
        })
        .catch(() => {});
    }
  }

  on<T>(type: EventType, handler: EventHandler<T>): () => void {
    return this.inner.on(type, handler);
  }

  once<T>(type: EventType, handler: EventHandler<T>): () => void {
    return this.inner.once(type, handler);
  }

  off(type: EventType, handler: EventHandler): void {
    this.inner.off(type, handler);
  }

  /** Get recent events (from memory + optional Supabase fetch) */
  getHistory(type?: EventType): DomainEvent[] {
    return this.inner.getHistory(type);
  }

  /** Fetch persisted events from Supabase (last N hours) */
  async fetchPersistedHistory(hours = 24): Promise<DomainEvent[]> {
    if (!this.supabaseClient) return [];
    try {
      const { data, error } = await this.supabaseClient
        .from('domain_events')
        .select('*')
        .gte('created_at', new Date(Date.now() - hours * 3600_000).toISOString())
        .order('created_at', { ascending: false })
        .limit(500);
      if (error || !data) return [];
      return data.map((row: any) => ({
        type: row.type as EventType,
        timestamp: row.created_at,
        source: row.source,
        payload: row.payload,
        metadata: row.metadata,
      }));
    } catch {
      return [];
    }
  }

  reset(): void {
    this.inner.reset();
  }
}
