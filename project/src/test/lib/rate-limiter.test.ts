import { describe, it, expect, beforeEach } from 'vitest';
import { RateLimiter } from '../../lib/rate-limiter';

describe('RateLimiter', () => {
  let limiter: RateLimiter;

  beforeEach(() => {
    limiter = new RateLimiter({ maxRequests: 3, windowMs: 1000 });
  });

  it('should allow requests within limit', () => {
    expect(limiter.check('user1').allowed).toBe(true);
    expect(limiter.check('user1').allowed).toBe(true);
    expect(limiter.check('user1').allowed).toBe(true);
  });

  it('should block requests over limit', () => {
    limiter.check('user1');
    limiter.check('user1');
    limiter.check('user1');
    const result = limiter.check('user1');

    expect(result.allowed).toBe(false);
    expect(result.remaining).toBe(0);
    expect(result.retryAfterMs).toBeGreaterThan(0);
  });

  it('should track remaining correctly', () => {
    const r1 = limiter.check('user1');
    expect(r1.remaining).toBe(2);

    const r2 = limiter.check('user1');
    expect(r2.remaining).toBe(1);
  });

  it('should isolate different keys', () => {
    limiter.check('user1');
    limiter.check('user1');
    limiter.check('user1');

    expect(limiter.check('user1').allowed).toBe(false);
    expect(limiter.check('user2').allowed).toBe(true);
  });

  it('should cleanup old buckets', () => {
    limiter.check('old-user');
    limiter.destroy();
  });
});
