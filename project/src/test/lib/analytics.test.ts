import { describe, it, expect, vi, beforeEach } from 'vitest';

vi.mock('../../lib/supabaseClient', () => {
  return {
    supabase: {
      from: vi.fn(),
    },
  };
});

import { supabase } from '../../lib/supabaseClient';
import {
  trackEvent,
  trackPageView,
  trackSearch,
  trackFeatureUse,
  trackChatMessage,
  getDashboardStats,
} from '../../lib/analytics';

const mockedSupabase = vi.mocked(supabase);

function buildChainable(final?: unknown, insertResolve?: unknown) {
  const chainable = {
    select: () => chainable,
    insert: () => (insertResolve ? Promise.resolve(insertResolve) : Promise.resolve({ data: null, error: null })),
    gte: () => chainable,
    eq: () => chainable,
    not: () => chainable,
    then: (resolve: (v: unknown) => void) => Promise.resolve(final).then(resolve),
  };
  return chainable;
}

describe('Analytics service', () => {
  beforeEach(() => {
    vi.clearAllMocks();
  });

  describe('trackEvent', () => {
    it('should insert an event and not throw', async () => {
      mockedSupabase.from.mockReturnValue(buildChainable(undefined, { data: null, error: null }) as never);

      await expect(trackEvent({ event_type: 'page_view', page: '/home' })).resolves.toBeUndefined();
      expect(mockedSupabase.from).toHaveBeenCalledWith('page_analytics');
    });

    it('should silently swallow errors', async () => {
      mockedSupabase.from.mockReturnValue(buildChainable(undefined, { data: null, error: new Error('boom') }) as never);

      await expect(trackEvent({ event_type: 'page_view' })).resolves.toBeUndefined();
    });
  });

  describe('track helpers', () => {
    it('trackPageView should forward page', async () => {
      mockedSupabase.from.mockReturnValue(buildChainable(undefined, { data: null, error: null }) as never);
      await trackPageView('/test');
      expect(mockedSupabase.from).toHaveBeenCalled();
    });

    it('trackSearch should forward metadata', async () => {
      mockedSupabase.from.mockReturnValue(buildChainable(undefined, { data: null, error: null }) as never);
      await trackSearch('concorso', 5);
      expect(mockedSupabase.from).toHaveBeenCalled();
    });

    it('trackFeatureUse should forward feature', async () => {
      mockedSupabase.from.mockReturnValue(buildChainable(undefined, { data: null, error: null }) as never);
      await trackFeatureUse('simulator');
      expect(mockedSupabase.from).toHaveBeenCalled();
    });

    it('trackChatMessage should forward metadata', async () => {
      mockedSupabase.from.mockReturnValue(buildChainable(undefined, { data: null, error: null }) as never);
      await trackChatMessage({ latency_ms: 42, has_citations: true });
      expect(mockedSupabase.from).toHaveBeenCalled();
    });
  });

  describe('getDashboardStats', () => {
    it('should aggregate page views, users, pages and features', async () => {
      const views = { count: 10, data: null };
      const usersData = { data: [{ user_id: 'u1' }, { user_id: 'u2' }, { user_id: 'u1' }] };
      const pagesData = {
        data: [{ path: '/a' }, { path: '/b' }, { path: '/a' }, { path: '/c' }],
      };
      const featuresData = { data: [{ feature_name: 'f1' }, { feature_name: 'f1' }, { feature_name: 'f2' }] };

      const resolveFor = (table: string, cols: string, opts?: unknown): unknown => {
        if (table !== 'page_analytics') return null;
        if (cols === '*' && opts && (opts as { head?: boolean }).head) return views;
        if (cols === 'user_id') return usersData;
        if (cols === 'path') return pagesData;
        if (cols === 'feature_name') return featuresData;
        return null;
      };

      const thenable = (value: unknown) => ({
        gte: () => thenable(value),
        eq: () => thenable(value),
        not: () => thenable(value),
        order: () => thenable(value),
        limit: () => thenable(value),
        select: (c: string, o?: unknown) => thenable(resolveFor('page_analytics', c, o)),
        then: (resolve: (v: unknown) => void) => Promise.resolve(value).then(resolve),
      });

      mockedSupabase.from.mockReturnValue(thenable(null) as never);

      const stats = await getDashboardStats();
      expect(stats.totalPageViews).toBe(10);
      expect(stats.uniqueUsers).toBe(2);
      expect(stats.topPages[0].page).toBe('/a');
      expect(stats.topPages[0].count).toBe(2);
      expect(stats.topFeatures[0].feature).toBe('f1');
    });

    it('should return empty defaults on error', async () => {
      mockedSupabase.from.mockImplementation(() => {
        const q = buildChainable();
        q.select = vi.fn(() => {
          throw new Error('boom');
        });
        return q as never;
      });

      const stats = await getDashboardStats();
      expect(stats.totalPageViews).toBe(0);
      expect(stats.topPages).toEqual([]);
      expect(stats.uniqueUsers).toBe(0);
    });
  });
});
