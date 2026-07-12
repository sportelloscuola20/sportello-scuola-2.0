/**
 * ============================================================================
 *  CAP-06 — ANALYTICS SERVICE (EMA §49, §6.10)
 *  Page analytics, feature usage, and platform metrics.
 * ============================================================================
 */

import { supabase } from '../lib/supabaseClient';
import { createLineage } from '../foundation/types';

export type AnalyticsEventType =
  | 'page_view'
  | 'search'
  | 'feature_use'
  | 'chat_message'
  | 'simulator_run'
  | 'document_view'
  | 'notification_click';

export interface AnalyticsEvent {
  event_type: AnalyticsEventType;
  user_id?: string;
  page?: string;
  feature?: string;
  metadata?: Record<string, unknown>;
}

/** Track an analytics event (fire-and-forget) */
export async function trackEvent(event: AnalyticsEvent): Promise<void> {
  try {
    await supabase.from('page_analytics').insert({
      event_type: event.event_type,
      user_id: event.user_id || null,
      page: event.page || null,
      feature: event.feature || null,
      metadata: event.metadata || {},
      created_at: new Date().toISOString(),
    });
  } catch {
    // Silent fail — analytics should never block UI
  }
}

/** Track page view */
export async function trackPageView(page: string, userId?: string): Promise<void> {
  return trackEvent({ event_type: 'page_view', page, user_id: userId });
}

/** Track search */
export async function trackSearch(query: string, resultCount: number, userId?: string): Promise<void> {
  return trackEvent({
    event_type: 'search',
    user_id: userId,
    metadata: { query, result_count: resultCount },
  });
}

/** Track feature usage */
export async function trackFeatureUse(feature: string, userId?: string, metadata?: Record<string, unknown>): Promise<void> {
  return trackEvent({ event_type: 'feature_use', feature, user_id: userId, metadata });
}

/** Track chat message */
export async function trackChatMessage(metadata: { latency_ms?: number; has_citations?: boolean; [key: string]: unknown }): Promise<void> {
  return trackEvent({ event_type: 'chat_message', metadata });
}

/** Get platform dashboard stats */
export async function getDashboardStats(): Promise<{
  totalPageViews: number;
  uniqueUsers: number;
  topPages: Array<{ page: string; count: number }>;
  topFeatures: Array<{ feature: string; count: number }>;
  recentActivity: number;
}> {
  try {
    const last24h = new Date(Date.now() - 86400_000).toISOString();

    const [views, users, pages, features] = await Promise.all([
      supabase.from('page_analytics').select('*', { count: 'exact', head: true })
        .gte('created_at', last24h),
      supabase.from('page_analytics').select('user_id')
        .gte('created_at', last24h)
        .not('user_id', 'is', null),
      supabase.from('page_analytics').select('page')
        .eq('event_type', 'page_view')
        .gte('created_at', last24h),
      supabase.from('page_analytics').select('feature')
        .eq('event_type', 'feature_use')
        .gte('created_at', last24h),
    ]);

    // Aggregate top pages
    const pageCount = new Map<string, number>();
    (pages.data || []).forEach(r => {
      if (r.page) pageCount.set(r.page, (pageCount.get(r.page) || 0) + 1);
    });
    const topPages = [...pageCount.entries()]
      .sort((a, b) => b[1] - a[1])
      .slice(0, 10)
      .map(([page, count]) => ({ page, count }));

    // Aggregate top features
    const featureCount = new Map<string, number>();
    (features.data || []).forEach(r => {
      if (r.feature) featureCount.set(r.feature, (featureCount.get(r.feature) || 0) + 1);
    });
    const topFeatures = [...featureCount.entries()]
      .sort((a, b) => b[1] - a[1])
      .slice(0, 10)
      .map(([feature, count]) => ({ feature, count }));

    // Unique users
    const uniqueUserSet = new Set((users.data || []).map(r => r.user_id));

    return {
      totalPageViews: views.count || 0,
      uniqueUsers: uniqueUserSet.size,
      topPages,
      topFeatures,
      recentActivity: views.count || 0,
    };
  } catch {
    return {
      totalPageViews: 0,
      uniqueUsers: 0,
      topPages: [],
      topFeatures: [],
      recentActivity: 0,
    };
  }
}
