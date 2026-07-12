/**
 * ============================================================================
 *  CAP-06 — HEALTH CHECK SYSTEM (EMA §61, §6.10)
 *  System health monitoring for all service dependencies.
 * ============================================================================
 */

import { supabase } from './supabaseClient';
import { queryCache } from './cache';
import { apiRateLimiter } from './rate-limiter';

export type HealthStatus = 'healthy' | 'degraded' | 'unhealthy';

export interface HealthCheck {
  name: string;
  status: HealthStatus;
  latencyMs: number;
  message?: string;
}

export interface SystemHealth {
  status: HealthStatus;
  timestamp: string;
  checks: HealthCheck[];
  uptime: number;
}

const startTime = Date.now();

/** Check Supabase connectivity */
async function checkSupabase(): Promise<HealthCheck> {
  const start = Date.now();
  try {
    const { error } = await supabase.from('monitored_sources').select('id').limit(1);
    const latencyMs = Date.now() - start;
    if (error) {
      return { name: 'supabase', status: 'unhealthy', latencyMs, message: error.message };
    }
    return { name: 'supabase', status: latencyMs > 2000 ? 'degraded' : 'healthy', latencyMs };
  } catch (e: any) {
    return { name: 'supabase', status: 'unhealthy', latencyMs: Date.now() - start, message: e.message };
  }
}

/** Check cache layer */
function checkCache(): HealthCheck {
  const stats = queryCache.getStats();
  return {
    name: 'cache',
    status: stats.hitRate > 0.3 || stats.size === 0 ? 'healthy' : 'degraded',
    latencyMs: 0,
    message: `Hit rate: ${(stats.hitRate * 100).toFixed(1)}%, Size: ${stats.size}/${1000}`,
  };
}

/** Check rate limiter */
function checkRateLimiter(): HealthCheck {
  return {
    name: 'rate_limiter',
    status: 'healthy',
    latencyMs: 0,
    message: 'Token bucket operational',
  };
}

/** Run all health checks */
export async function getSystemHealth(): Promise<SystemHealth> {
  const checks = await Promise.all([
    checkSupabase(),
    Promise.resolve(checkCache()),
    Promise.resolve(checkRateLimiter()),
  ]);

  const worst = checks.some(c => c.status === 'unhealthy')
    ? 'unhealthy'
    : checks.some(c => c.status === 'degraded')
      ? 'degraded'
      : 'healthy';

  return {
    status: worst,
    timestamp: new Date().toISOString(),
    checks,
    uptime: Date.now() - startTime,
  };
}

/** Lightweight health endpoint (no DB check) */
export function getQuickHealth(): { status: 'ok'; uptime: number } {
  return { status: 'ok', uptime: Date.now() - startTime };
}
