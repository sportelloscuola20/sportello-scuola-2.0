import { describe, it, expect, beforeEach, vi } from 'vitest';
import { CacheLayer } from '../../lib/cache';

describe('CacheLayer', () => {
  let cache: CacheLayer<string>;

  beforeEach(() => {
    cache = new CacheLayer<string>({ maxSize: 5, defaultTtlMs: 1000 });
  });

  it('should store and retrieve values', () => {
    cache.set('key1', 'value1');
    expect(cache.get('key1')).toBe('value1');
  });

  it('should return undefined for missing keys', () => {
    expect(cache.get('missing')).toBeUndefined();
  });

  it('should respect TTL', async () => {
    cache.set('key1', 'value1', 50); // 50ms TTL
    expect(cache.get('key1')).toBe('value1');
    await new Promise(r => setTimeout(r, 60));
    expect(cache.get('key1')).toBeUndefined();
  });

  it('should evict oldest when max size reached', () => {
    cache.set('a', '1');
    cache.set('b', '2');
    cache.set('c', '3');
    cache.set('d', '4');
    cache.set('e', '5');
    cache.set('f', '6'); // should evict 'a'

    expect(cache.get('a')).toBeUndefined();
    expect(cache.get('f')).toBe('6');
  });

  it('should support getOrSet', () => {
    const factory = vi.fn(() => 'computed');
    const result1 = cache.getOrSet('key', factory);
    const result2 = cache.getOrSet('key', factory);

    expect(result1).toBe('computed');
    expect(result2).toBe('computed');
    expect(factory).toHaveBeenCalledTimes(1);
  });

  it('should track stats', () => {
    cache.set('a', '1');
    cache.get('a'); // hit
    cache.get('b'); // miss

    const stats = cache.getStats();
    expect(stats.hits).toBe(1);
    expect(stats.misses).toBe(1);
    expect(stats.sets).toBe(1);
    expect(stats.size).toBe(1);
  });

  it('should prune expired entries', async () => {
    cache.set('a', '1', 30);
    cache.set('b', '2', 30);
    await new Promise(r => setTimeout(r, 40));
    const pruned = cache.prune();
    expect(pruned).toBe(2);
    expect(cache.getStats().size).toBe(0);
  });
});
