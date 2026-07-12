/**
 * ============================================================================
 *  CAP-06 — CACHE LAYER (EMA §61, §49)
 *  In-memory LRU cache with TTL support for reducing database load.
 * ============================================================================
 */

export interface CacheEntry<T> {
  value: T;
  expiresAt: number;
  createdAt: number;
}

export interface CacheStats {
  hits: number;
  misses: number;
  sets: number;
  evictions: number;
  size: number;
  hitRate: number;
}

export class CacheLayer<T = unknown> {
  private store = new Map<string, CacheEntry<T>>();
  private stats = { hits: 0, misses: 0, sets: 0, evictions: 0 };
  private maxSize: number;
  private defaultTtlMs: number;

  constructor(options?: { maxSize?: number; defaultTtlMs?: number }) {
    this.maxSize = options?.maxSize ?? 1000;
    this.defaultTtlMs = options?.defaultTtlMs ?? 5 * 60 * 1000; // 5 minutes
  }

  get(key: string): T | undefined {
    const entry = this.store.get(key);
    if (!entry) {
      this.stats.misses++;
      return undefined;
    }
    if (Date.now() > entry.expiresAt) {
      this.store.delete(key);
      this.stats.misses++;
      return undefined;
    }
    this.stats.hits++;
    return entry.value;
  }

  getOrSet(key: string, factory: () => T | Promise<T>, ttlMs?: number): T | Promise<T> {
    const cached = this.get(key);
    if (cached !== undefined) return cached;

    const result = factory();
    if (result instanceof Promise) {
      return result.then(value => {
        this.set(key, value, ttlMs);
        return value;
      });
    }
    this.set(key, result, ttlMs);
    return result;
  }

  set(key: string, value: T, ttlMs?: number): void {
    if (this.store.size >= this.maxSize) {
      this.evictOldest();
    }
    this.store.set(key, {
      value,
      expiresAt: Date.now() + (ttlMs ?? this.defaultTtlMs),
      createdAt: Date.now(),
    });
    this.stats.sets++;
  }

  has(key: string): boolean {
    return this.get(key) !== undefined;
  }

  delete(key: string): boolean {
    return this.store.delete(key);
  }

  clear(): void {
    this.store.clear();
  }

  /** Evict expired entries */
  prune(): number {
    const now = Date.now();
    let pruned = 0;
    for (const [key, entry] of this.store) {
      if (now > entry.expiresAt) {
        this.store.delete(key);
        pruned++;
      }
    }
    return pruned;
  }

  private evictOldest(): void {
    let oldestKey: string | null = null;
    let oldestTime = Infinity;
    for (const [key, entry] of this.store) {
      if (entry.createdAt < oldestTime) {
        oldestTime = entry.createdAt;
        oldestKey = key;
      }
    }
    if (oldestKey) {
      this.store.delete(oldestKey);
      this.stats.evictions++;
    }
  }

  getStats(): CacheStats {
    const total = this.stats.hits + this.stats.misses;
    return {
      ...this.stats,
      size: this.store.size,
      hitRate: total > 0 ? this.stats.hits / total : 0,
    };
  }
}

/** Global cache instances */
export const queryCache = new CacheLayer({ maxSize: 500, defaultTtlMs: 2 * 60 * 1000 });
export const searchCache = new CacheLayer({ maxSize: 200, defaultTtlMs: 5 * 60 * 1000 });
export const aiResponseCache = new CacheLayer({ maxSize: 100, defaultTtlMs: 10 * 60 * 1000 });
