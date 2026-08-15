import { describe, it, expect, vi, beforeEach } from 'vitest';

vi.mock('../../lib/supabaseClient', () => {
  return {
    supabase: {
      from: vi.fn(),
      functions: { invoke: vi.fn() },
    },
  };
});

import { supabase } from '../../lib/supabaseClient';
import {
  fetchMonitoredSources,
  fetchDashboardStats,
  getDashboardFallbackStats,
  triggerMonitorSources,
  triggerIngestNews,
} from '../../rag/monitoring';

const mockedSupabase = vi.mocked(supabase);

const invokeMock = supabase.functions.invoke as unknown as ReturnType<typeof vi.fn>;

function buildChainable(final: unknown) {
  const chainable = {
    order: () => chainable,
    select: () => chainable,
    maybeSingle: () => Promise.resolve(final),
    then: (resolve: (v: unknown) => void) => Promise.resolve(final).then(resolve),
  };
  return chainable;
}

describe('Monitoring service', () => {
  beforeEach(() => {
    vi.clearAllMocks();
  });

  describe('fetchMonitoredSources', () => {
    it('should return sources when query succeeds', async () => {
      const sources = [
        { id: '1', nome: 'MIM', livello: 'A', stato: 'attivo' },
        { id: '2', nome: 'Orizzonte Scuola', livello: 'B', stato: 'errore' },
      ];
      mockedSupabase.from.mockReturnValue(buildChainable({ data: sources, error: null }) as never);

      const result = await fetchMonitoredSources();
      expect(result).toHaveLength(2);
      expect(mockedSupabase.from).toHaveBeenCalledWith('monitored_sources');
    });

    it('should return empty array when query fails', async () => {
      mockedSupabase.from.mockReturnValue(buildChainable({ data: null, error: new Error('boom') }) as never);

      const result = await fetchMonitoredSources();
      expect(result).toEqual([]);
    });

    it('should return empty array when query throws', async () => {
      mockedSupabase.from.mockImplementation(() => { throw new Error('boom'); });

      const result = await fetchMonitoredSources();
      expect(result).toEqual([]);
    });
  });

  describe('fetchDashboardStats', () => {
    it('should return stats when query succeeds', async () => {
      const stats = { fonti_attive: 48, notizie_attive: 6 };
      mockedSupabase.from.mockReturnValue(buildChainable({ data: stats, error: null }) as never);

      const result = await fetchDashboardStats();
      expect(result).toEqual(stats);
    });

    it('should return null when query fails', async () => {
      mockedSupabase.from.mockReturnValue(buildChainable({ data: null, error: new Error('boom') }) as never);

      const result = await fetchDashboardStats();
      expect(result).toBeNull();
    });
  });

  describe('getDashboardFallbackStats', () => {
    it('should return default stats', () => {
      const stats = getDashboardFallbackStats();
      expect(stats.fonti_attive).toBe(48);
      expect(stats.fonti_totali).toBe(48);
      expect(stats.scadenze_imminenti).toBe(3);
      expect(stats.ultimo_monitoraggio).toBeNull();
    });
  });

  describe('triggerMonitorSources', () => {
    it('should return success on invoke', async () => {
      invokeMock.mockResolvedValue({
        data: { message: 'Avviato' }, error: null,
      } as never);

      const result = await triggerMonitorSources();
      expect(result.success).toBe(true);
      expect(result.message).toBe('Avviato');
    });

    it('should return failure when invoke errors', async () => {
      invokeMock.mockRejectedValue(new Error('network')) as never;

      const result = await triggerMonitorSources();
      expect(result.success).toBe(false);
    });
  });

  describe('triggerIngestNews', () => {
    it('should return success on invoke', async () => {
      invokeMock.mockResolvedValue({
        data: { message: 'OK' }, error: null,
      } as never);

      const result = await triggerIngestNews();
      expect(result.success).toBe(true);
      expect(result.message).toBe('OK');
    });

    it('should return failure on error response', async () => {
      invokeMock.mockResolvedValue({
        data: null, error: new Error('limit'),
      } as never);

      const result = await triggerIngestNews();
      expect(result.success).toBe(false);
    });
  });
});
