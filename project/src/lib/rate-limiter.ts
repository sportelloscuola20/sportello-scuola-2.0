/**
 * ============================================================================
 *  CAP-06 — RATE LIMITER (EMA §6.10, §25)
 *  Token bucket rate limiter for API protection.
 * ============================================================================
 */

export interface RateLimitConfig {
  maxRequests: number;
  windowMs: number;
  burstMax?: number;
}

export interface RateLimitResult {
  allowed: boolean;
  remaining: number;
  resetAt: number;
  retryAfterMs?: number;
}

interface Bucket {
  tokens: number;
  lastRefill: number;
}

export class RateLimiter {
  private buckets = new Map<string, Bucket>();
  private config: RateLimitConfig;
  private cleanupInterval?: ReturnType<typeof setInterval>;

  constructor(config: RateLimitConfig) {
    this.config = config;
    this.cleanupInterval = setInterval(() => this.cleanup(), config.windowMs);
  }

  check(key: string): RateLimitResult {
    const now = Date.now();
    let bucket = this.buckets.get(key);

    if (!bucket) {
      bucket = { tokens: this.config.maxRequests, lastRefill: now };
      this.buckets.set(key, bucket);
    }

    // Refill tokens
    const elapsed = now - bucket.lastRefill;
    const refillCount = Math.floor(elapsed / this.config.windowMs) * this.config.maxRequests;
    if (refillCount > 0) {
      bucket.tokens = Math.min(this.config.maxRequests, bucket.tokens + refillCount);
      bucket.lastRefill = now;
    }

    if (bucket.tokens <= 0) {
      const resetAt = bucket.lastRefill + this.config.windowMs;
      return {
        allowed: false,
        remaining: 0,
        resetAt,
        retryAfterMs: resetAt - now,
      };
    }

    bucket.tokens--;
    return {
      allowed: true,
      remaining: bucket.tokens,
      resetAt: bucket.lastRefill + this.config.windowMs,
    };
  }

  /** Create middleware-style check for Edge Functions */
  middleware(keyFn?: (req: Request) => string) {
    return (req: Request): RateLimitResult => {
      const key = keyFn ? keyFn(req) : (req.headers.get('x-forwarded-for') || 'anonymous');
      return this.check(key);
    };
  }

  private cleanup(): void {
    const now = Date.now();
    for (const [key, bucket] of this.buckets) {
      if (now - bucket.lastRefill > this.config.windowMs * 2) {
        this.buckets.delete(key);
      }
    }
  }

  destroy(): void {
    if (this.cleanupInterval) clearInterval(this.cleanupInterval);
    this.buckets.clear();
  }
}

/** Pre-configured rate limiters */
export const apiRateLimiter = new RateLimiter({
  maxRequests: 60,
  windowMs: 60_000, // 60 req/min
});

export const aiRateLimiter = new RateLimiter({
  maxRequests: 10,
  windowMs: 60_000, // 10 RPM (Gemini limit)
});

export const searchRateLimiter = new RateLimiter({
  maxRequests: 30,
  windowMs: 60_000, // 30 searches/min
});
