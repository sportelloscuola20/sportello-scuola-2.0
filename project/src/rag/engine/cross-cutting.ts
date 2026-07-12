/**
 * ============================================================================
 *  EMA §42-50 — CROSS-CUTTING ENGINES
 *  Decision Engine, Universal Semantic Search, Operational Profile,
 *  Temporal Engine, Actions Engine, Measurement & Continuous Improvement.
 * ============================================================================
 */

import { createLineage, type DataLineageObject } from '../../foundation/types';
import { eventBus } from '../../foundation/events';
import type { ProductId } from '../../services/products';

// ═════════════════════════════════════════════════════════════════════════════
//  §44 — DECISION ENGINE
// ═════════════════════════════════════════════════════════════════════════════

export type DecisionType = 'recommendation' | 'classification' | 'prioritization' | 'routing' | 'alerting';
export type DecisionConfidence = 'high' | 'medium' | 'low';

export interface DecisionRequest {
  id: string;
  type: DecisionType;
  input: Record<string, unknown>;
  context: DecisionContext;
  timestamp: string;
  lineage: DataLineageObject;
}

export interface DecisionContext {
  userId?: string;
  productId: ProductId;
  userProfile?: Record<string, unknown>;
  recentActivity?: string[];
  timeConstraints?: { deadline?: string; urgency?: string };
}

export interface DecisionResult {
  id: string;
  requestId: string;
  type: DecisionType;
  decision: string;
  confidence: DecisionConfidence;
  reasoning: string;
  alternatives: string[];
  actions: DecisionAction[];
  lineage: DataLineageObject;
}

export interface DecisionAction {
  type: 'notify' | 'redirect' | 'highlight' | 'filter' | 'sort' | 'recommend';
  target: string;
  params: Record<string, unknown>;
}

/** Create a decision request */
export function createDecisionRequest(
  type: DecisionType,
  input: Record<string, unknown>,
  context: DecisionContext
): DecisionRequest {
  return {
    id: `dr_${Date.now()}_${Math.random().toString(36).slice(2, 8)}`,
    type,
    input,
    context,
    timestamp: new Date().toISOString(),
    lineage: createLineage('decision_request', type, {
      productId: context.productId,
      hasUser: !!context.userId,
    }),
  };
}

/** Process a decision request */
export function processDecision(request: DecisionRequest): DecisionResult {
  let decision = '';
  let confidence: DecisionConfidence = 'medium';
  const actions: DecisionAction[] = [];

  switch (request.type) {
    case 'recommendation':
      decision = `Raccomandazione per ${request.context.productId}`;
      confidence = 'high';
      actions.push({ type: 'recommend', target: request.context.productId, params: {} });
      break;
    case 'classification':
      decision = 'Classificazione completata';
      confidence = 'medium';
      actions.push({ type: 'filter', target: 'category', params: request.input });
      break;
    case 'prioritization':
      decision = 'Priorità assegnata';
      confidence = 'high';
      actions.push({ type: 'sort', target: 'priority', params: {} });
      break;
    case 'routing':
      decision = `Routing a ${request.context.productId}`;
      confidence = 'high';
      actions.push({ type: 'redirect', target: request.context.productId, params: {} });
      break;
    case 'alerting':
      decision = 'Alert generato';
      confidence = 'medium';
      actions.push({ type: 'notify', target: 'user', params: request.input });
      break;
  }

  return {
    id: `res_${Date.now()}`,
    requestId: request.id,
    type: request.type,
    decision,
    confidence,
    reasoning: `Decisione basata su ${Object.keys(request.input).length} input signals`,
    alternatives: [],
    actions,
    lineage: createLineage('decision_result', request.type, {
      requestId: request.id,
      confidence,
    }),
  };
}

// ═════════════════════════════════════════════════════════════════════════════
//  §45 — UNIVERSAL SEMANTIC SEARCH
// ═════════════════════════════════════════════════════════════════════════════

export interface SemanticQuery {
  text: string;
  embeddings?: number[];
  filters: Record<string, unknown>;
  maxResults: number;
  minScore: number;
  products: ProductId[];
}

export interface SemanticResult {
  id: string;
  content: string;
  product: ProductId;
  score: number;
  highlights: { field: string; fragment: string }[];
  metadata: Record<string, unknown>;
  lineage: DataLineageObject;
}

/** Create a semantic query */
export function createSemanticQuery(
  text: string,
  products: ProductId[] = [],
  options: { maxResults?: number; minScore?: number } = {}
): SemanticQuery {
  return {
    text,
    filters: {},
    maxResults: options.maxResults || 20,
    minScore: options.minScore || 0.3,
    products,
  };
}

/** Execute semantic search (simplified) */
export function executeSemanticSearch(query: SemanticQuery): SemanticResult[] {
  // In production, would use vector embeddings + Supabase pgvector
  return [];
}

// ═════════════════════════════════════════════════════════════════════════════
//  §46 — OPERATIONAL PROFILE
// ═════════════════════════════════════════════════════════════════════════════

export interface OperationalProfile {
  userId: string;
  role: string;
  products: ProductId[];
  preferences: Record<string, unknown>;
  activityScore: number;
  lastActive: string;
  lineage: DataLineageObject;
}

/** Create an operational profile */
export function createOperationalProfile(
  userId: string,
  role: string,
  products: ProductId[]
): OperationalProfile {
  return {
    userId,
    role,
    products,
    preferences: {},
    activityScore: 0,
    lastActive: new Date().toISOString(),
    lineage: createLineage('operational_profile', userId, { role, productCount: products.length }),
  };
}

/** Update activity score */
export function updateActivityScore(profile: OperationalProfile): OperationalProfile {
  return {
    ...profile,
    activityScore: profile.activityScore + 1,
    lastActive: new Date().toISOString(),
  };
}

// ═════════════════════════════════════════════════════════════════════════════
//  §47 — TEMPORAL ENGINE
// ═════════════════════════════════════════════════════════════════════════════

export type TemporalGranularity = 'hourly' | 'daily' | 'weekly' | 'monthly' | 'yearly';

export interface TemporalRange {
  from: string;
  to: string;
  granularity: TemporalGranularity;
}

export interface TemporalDataPoint {
  timestamp: string;
  value: number;
  metric: string;
  metadata: Record<string, unknown>;
  lineage: DataLineageObject;
}

/** Create a temporal range */
export function createTemporalRange(
  from: string,
  to: string,
  granularity: TemporalGranularity = 'daily'
): TemporalRange {
  return { from, to, granularity };
}

/** Generate time buckets for a range */
export function generateTimeBuckets(range: TemporalRange): string[] {
  const buckets: string[] = [];
  const start = new Date(range.from);
  const end = new Date(range.to);

  const step = range.granularity === 'hourly' ? 3600000
    : range.granularity === 'daily' ? 86400000
    : range.granularity === 'weekly' ? 604800000
    : range.granularity === 'monthly' ? 2592000000
    : 31536000000;

  let current = start.getTime();
  while (current <= end.getTime()) {
    buckets.push(new Date(current).toISOString());
    current += step;
  }

  return buckets;
}

/** Aggregate temporal data */
export function aggregateTemporalData(
  dataPoints: TemporalDataPoint[],
  granularity: TemporalGranularity
): TemporalDataPoint[] {
  // Group by time bucket and aggregate
  const groups = new Map<string, TemporalDataPoint[]>();
  for (const dp of dataPoints) {
    const bucket = dp.timestamp.slice(0, granularity === 'hourly' ? 13 : granularity === 'daily' ? 10 : 7);
    if (!groups.has(bucket)) groups.set(bucket, []);
    groups.get(bucket)!.push(dp);
  }

  return Array.from(groups.entries()).map(([bucket, points]) => ({
    timestamp: bucket,
    value: points.reduce((sum, p) => sum + p.value, 0) / points.length,
    metric: points[0].metric,
    metadata: { count: points.length },
    lineage: createLineage('temporal_aggregation', granularity, { bucket, count: points.length }),
  }));
}

// ═════════════════════════════════════════════════════════════════════════════
//  §48 — ACTIONS ENGINE
// ═════════════════════════════════════════════════════════════════════════════

export type ActionType = 'bookmark' | 'share' | 'export' | 'subscribe' | 'follow' | 'remind' | 'flag';

export interface UserAction {
  id: string;
  type: ActionType;
  userId: string;
  targetType: string;
  targetId: string;
  params: Record<string, unknown>;
  createdAt: string;
  lineage: DataLineageObject;
}

/** Create a user action */
export function createAction(
  type: ActionType,
  userId: string,
  targetType: string,
  targetId: string,
  params: Record<string, unknown> = {}
): UserAction {
  const action: UserAction = {
    id: `act_${Date.now()}_${Math.random().toString(36).slice(2, 8)}`,
    type,
    userId,
    targetType,
    targetId,
    params,
    createdAt: new Date().toISOString(),
    lineage: createLineage('user_action', type, { userId, targetType, targetId }),
  };

  eventBus.emit({
    type: 'action.created',
    actionType: type,
    userId,
    targetType,
    targetId,
    timestamp: new Date().toISOString(),
    lineage: action.lineage,
  } as any);

  return action;
}

/** Get available actions for a content type */
export function getAvailableActions(contentType: string): ActionType[] {
  const actionMap: Record<string, ActionType[]> = {
    document: ['bookmark', 'share', 'export', 'follow'],
    interpello: ['bookmark', 'share', 'subscribe', 'flag'],
    nomina: ['bookmark', 'share', 'follow', 'remind'],
    event: ['bookmark', 'share', 'subscribe', 'remind'],
    news: ['bookmark', 'share', 'subscribe'],
  };
  return actionMap[contentType] || ['bookmark', 'share'];
}

// ═════════════════════════════════════════════════════════════════════════════
//  §49 — MEASUREMENT & CONTINUOUS IMPROVEMENT
// ═════════════════════════════════════════════════════════════════════════════

export interface MetricDefinition {
  id: string;
  name: string;
  description: string;
  unit: string;
  target: number;
  minThreshold: number;
  maxThreshold: number;
  calculation: string;
}

export interface MetricValue {
  metricId: string;
  value: number;
  timestamp: string;
  dimensions: Record<string, string>;
  lineage: DataLineageObject;
}

export interface ImprovementAction {
  id: string;
  metricId: string;
  type: 'optimize' | 'alert' | 'recommend' | 'deprecate';
  description: string;
  priority: 'high' | 'medium' | 'low';
  status: 'proposed' | 'approved' | 'in_progress' | 'completed';
  createdAt: string;
  lineage: DataLineageObject;
}

/** Define standard platform metrics */
export const PLATFORM_METRICS: MetricDefinition[] = [
  { id: 'search_latency', name: 'Search Latency', description: 'Average search response time', unit: 'ms', target: 500, minThreshold: 0, maxThreshold: 2000, calculation: 'avg(response_time)' },
  { id: 'ai_accuracy', name: 'AI Accuracy', description: 'Response quality score', unit: '%', target: 85, minThreshold: 60, maxThreshold: 100, calculation: 'avg(quality_score)' },
  { id: 'user_retention', name: 'User Retention', description: '30-day user retention rate', unit: '%', target: 40, minThreshold: 20, maxThreshold: 80, calculation: 'returning_users / total_users' },
  { id: 'content_freshness', name: 'Content Freshness', description: 'Average content age in days', unit: 'days', target: 7, minThreshold: 0, maxThreshold: 30, calculation: 'avg(now - published_at)' },
  { id: 'notification_rate', name: 'Notification Delivery Rate', description: 'Percentage of notifications delivered', unit: '%', target: 95, minThreshold: 80, maxThreshold: 100, calculation: 'delivered / sent' },
  { id: 'source_uptime', name: 'Source Uptime', description: 'Average source availability', unit: '%', target: 99, minThreshold: 90, maxThreshold: 100, calculation: 'uptime / total_time' },
];

/** Calculate a metric value */
export function calculateMetric(
  metric: MetricDefinition,
  values: number[]
): MetricValue {
  const avg = values.length > 0 ? values.reduce((a, b) => a + b, 0) / values.length : 0;

  return {
    metricId: metric.id,
    value: avg,
    timestamp: new Date().toISOString(),
    dimensions: { count: String(values.length) },
    lineage: createLineage('metric_calculation', metric.id, { value: avg, count: values.length }),
  };
}

/** Check if metric is within thresholds */
export function checkMetricHealth(metric: MetricDefinition, value: number): {
  status: 'healthy' | 'warning' | 'critical';
  message: string;
} {
  if (value >= metric.minThreshold && value <= metric.maxThreshold) {
    return { status: 'healthy', message: `${metric.name} is within normal range` };
  }
  if (value < metric.minThreshold) {
    return { status: 'warning', message: `${metric.name} is below minimum threshold (${metric.minThreshold} ${metric.unit})` };
  }
  return { status: 'critical', message: `${metric.name} exceeds maximum threshold (${metric.maxThreshold} ${metric.unit})` };
}

/** Generate improvement actions based on metrics */
export function generateImprovementActions(metrics: MetricValue[]): ImprovementAction[] {
  const actions: ImprovementAction[] = [];

  for (const mv of metrics) {
    const definition = PLATFORM_METRICS.find(m => m.id === mv.metricId);
    if (!definition) continue;

    const health = checkMetricHealth(definition, mv.value);
    if (health.status === 'critical') {
      actions.push({
        id: `imp_${Date.now()}_${Math.random().toString(36).slice(2, 8)}`,
        metricId: mv.metricId,
        type: 'alert',
        description: health.message,
        priority: 'high',
        status: 'proposed',
        createdAt: new Date().toISOString(),
        lineage: createLineage('improvement_action', mv.metricId, { status: 'critical' }),
      });
    }
  }

  return actions;
}

// ═════════════════════════════════════════════════════════════════════════════
//  §42 — UNIFIED ECOSYSTEM PRINCIPLE
// ═════════════════════════════════════════════════════════════════════════════

export interface EcosystemHealth {
  timestamp: string;
  products: { id: ProductId; health: number; status: string }[];
  overallHealth: number;
  issues: string[];
  lineage: DataLineageObject;
}

/** Calculate overall ecosystem health */
export function calculateEcosystemHealth(
  productHealths: { id: ProductId; health: number }[]
): EcosystemHealth {
  const overallHealth = productHealths.length > 0
    ? productHealths.reduce((sum, p) => sum + p.health, 0) / productHealths.length
    : 0;

  return {
    timestamp: new Date().toISOString(),
    products: productHealths.map(p => ({
      id: p.id,
      health: p.health,
      status: p.health >= 80 ? 'healthy' : p.health >= 60 ? 'degraded' : 'unhealthy',
    })),
    overallHealth,
    issues: productHealths.filter(p => p.health < 60).map(p => `${p.id} health is ${p.health}%`),
    lineage: createLineage('ecosystem_health', 'snapshot', { overallHealth }),
  };
}

// ═════════════════════════════════════════════════════════════════════════════
//  §50 — SINGLE HUB PRINCIPLE
// ═════════════════════════════════════════════════════════════════════════════

export interface HubNavigation {
  currentProduct: ProductId;
  availableProducts: { id: ProductId; name: string; route: string; active: boolean }[];
  breadcrumbs: { label: string; route: string }[];
  lineage: DataLineageObject;
}

/** Create hub navigation state */
export function createHubNavigation(
  currentProduct: ProductId,
  allProducts: { id: ProductId; name: string; route: string; status: string }[]
): HubNavigation {
  return {
    currentProduct,
    availableProducts: allProducts.map(p => ({
      id: p.id,
      name: p.name,
      route: p.route,
      active: p.status !== 'deprecated',
    })),
    breadcrumbs: [
      { label: 'Home', route: '/' },
      { label: allProducts.find(p => p.id === currentProduct)?.name || currentProduct, route: allProducts.find(p => p.id === currentProduct)?.route || '/' },
    ],
    lineage: createLineage('hub_navigation', currentProduct, {
      totalProducts: allProducts.length,
    }),
  };
}
