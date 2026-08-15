/**
 * ============================================================================
 *  SAPM Part IV — Platform Engineering (Ch. 34-42)
 *  IAM, CI/CD, Monitoring, Logging, Backup, Capacity, FinOps, Sustainability.
 * ============================================================================
 */

import { createLineage, type DataLineageObject } from '../foundation/types';

// ─── Types ───────────────────────────────────────────────────────────────────

export type PlatformComponent = 'iam' | 'cicd' | 'monitoring' | 'logging' | 'backup' | 'capacity' | 'finops' | 'sustainability' | 'documentation';

export interface IAMConfig {
  provider: string;
  methods: string[];
  roles: RoleDefinition[];
  policies: PolicyDefinition[];
  sessionConfig: SessionConfig;
  lineage: DataLineageObject;
}

export interface RoleDefinition {
  name: string;
  description: string;
  permissions: string[];
  inheritsFrom?: string;
}

export interface PolicyDefinition {
  name: string;
  effect: 'allow' | 'deny';
  resources: string[];
  actions: string[];
  conditions?: string[];
}

export interface SessionConfig {
  maxAge: number; // seconds
  refreshEnabled: boolean;
  idleTimeout: number; // seconds
}

export interface CICDPipeline {
  name: string;
  stages: CICDStage[];
  triggers: string[];
  artifacts: string[];
  environment: string;
  lineage: DataLineageObject;
}

export interface CICDStage {
  name: string;
  steps: string[];
  parallel: boolean;
  timeout: number;
  requiresApproval: boolean;
}

export interface MonitoringConfig {
  metrics: MetricConfig[];
  alerts: AlertConfig[];
  dashboards: DashboardConfig[];
  retention: number; // days
  lineage: DataLineageObject;
}

export interface MetricConfig {
  name: string;
  query: string;
  interval: number; // seconds
  thresholds: { warning: number; critical: number };
  unit: string;
}

export interface AlertConfig {
  name: string;
  metric: string;
  condition: 'above' | 'below' | 'equals';
  threshold: number;
  duration: number; // seconds
  channels: string[];
  severity: 'info' | 'warning' | 'critical';
}

export interface DashboardConfig {
  name: string;
  metrics: string[];
  refreshInterval: number;
}

export interface BackupConfig {
  strategy: 'full' | 'incremental' | 'differential';
  frequency: string;
  retention: number; // days
  storage: string;
  encryption: boolean;
  testRestoreFrequency: string;
  lineage: DataLineageObject;
}

export interface CapacityPlan {
  current: CapacityMetrics;
  projected: CapacityMetrics;
  thresholds: CapacityThresholds;
  scalingStrategy: string;
  lineage: DataLineageObject;
}

export interface CapacityMetrics {
  storage: { used: number; total: number; unit: string };
  compute: { used: number; total: number; unit: string };
  bandwidth: { used: number; total: number; unit: string };
  users: { active: number; total: number };
}

export interface CapacityThresholds {
  storageWarning: number; // percentage
  storageCritical: number;
  computeWarning: number;
  computeCritical: number;
}

export interface FinOpsReport {
  period: string;
  totalCost: number;
  byService: { name: string; cost: number; trend: 'up' | 'down' | 'stable' }[];
  optimizationActions: OptimizationAction[];
  lineage: DataLineageObject;
}

export interface OptimizationAction {
  id: string;
  description: string;
  estimatedSaving: number;
  effort: 'low' | 'medium' | 'high';
  priority: 'high' | 'medium' | 'low';
}

// ═════════════════════════════════════════════════════════════════════════════
//  Ch. 34 — Identity & Access Management
// ═════════════════════════════════════════════════════════════════════════════

export const IAM_CONFIG: IAMConfig = {
  provider: 'Supabase Auth',
  methods: ['Email/Password', 'Magic Link', 'OAuth (Google, GitHub)'],
  roles: [
    { name: 'admin', description: 'Full system access', permissions: ['*'] },
    { name: 'editor', description: 'Can create/edit content', permissions: ['read:*', 'write:normativa', 'write:interpelli', 'write:notizie'] },
    { name: 'viewer', description: 'Read-only access', permissions: ['read:*'] },
    { name: 'user', description: 'Authenticated user', permissions: ['read:public', 'write:own_data'] },
  ],
  policies: [
    { name: 'public_read', effect: 'allow', resources: ['normativa', 'interpelli', 'notizie', 'scadenze', 'nomine', 'eventi'], actions: ['read'] },
    { name: 'auth_write', effect: 'allow', resources: ['chat', 'bookmarks', 'notifications'], actions: ['read', 'write'], conditions: ['is_authenticated'] },
    { name: 'admin_full', effect: 'allow', resources: ['*'], actions: ['*'], conditions: ['role:admin'] },
    { name: 'deny_sensitive', effect: 'deny', resources: ['audit_log', 'user_roles'], actions: ['read'], conditions: ['NOT role:admin'] },
  ],
  sessionConfig: { maxAge: 86400, refreshEnabled: true, idleTimeout: 3600 },
  lineage: createLineage('iam', 'supabase', { methods: 3, roles: 4 }),
};

// ═════════════════════════════════════════════════════════════════════════════
//  Ch. 35 — CI/CD Pipeline
// ═════════════════════════════════════════════════════════════════════════════

export const CICD_PIPELINE: CICDPipeline = {
  name: 'SportelloScuola CI/CD',
  stages: [
    { name: 'Quality Gates', steps: ['TypeScript typecheck', 'ESLint lint', 'Vitest tests (50+)', 'Vite build'], parallel: true, timeout: 300, requiresApproval: false },
    { name: 'Architecture Gate', steps: ['Source Gate validation (6 criteria)', 'Product consistency check', 'Security control verification'], parallel: false, timeout: 120, requiresApproval: false },
    { name: 'Deploy', steps: ['Netlify build', 'CDN invalidation', 'Health check'], parallel: false, timeout: 300, requiresApproval: false },
  ],
  triggers: ['push to main', 'pull_request to main', 'manual dispatch'],
  artifacts: ['dist/', 'coverage/'],
  environment: 'production',
  lineage: createLineage('cicd', 'github_actions', { stages: 3 }),
};

// ═════════════════════════════════════════════════════════════════════════════
//  Ch. 36 — Monitoring & Observability
// ═════════════════════════════════════════════════════════════════════════════

export const MONITORING_CONFIG: MonitoringConfig = {
  metrics: [
    { name: 'api_latency', query: 'avg(response_time)', interval: 60, thresholds: { warning: 500, critical: 2000 }, unit: 'ms' },
    { name: 'error_rate', query: 'count(errors) / count(requests)', interval: 300, thresholds: { warning: 0.01, critical: 0.05 }, unit: 'ratio' },
    { name: 'active_users', query: 'count(distinct user_id)', interval: 300, thresholds: { warning: 100, critical: 50 }, unit: 'count' },
    { name: 'gemini_calls', query: 'count(gemini_calls)', interval: 60, thresholds: { warning: 12, critical: 14 }, unit: 'count/min' },
    { name: 'source_health', query: 'avg(source_uptime)', interval: 300, thresholds: { warning: 0.95, critical: 0.9 }, unit: 'ratio' },
    { name: 'db_connections', query: 'count(active_connections)', interval: 60, thresholds: { warning: 80, critical: 95 }, unit: 'count' },
  ],
  alerts: [
    { name: 'High Error Rate', metric: 'error_rate', condition: 'above', threshold: 0.05, duration: 300, channels: ['email', 'slack'], severity: 'critical' },
    { name: 'Gemini Rate Limit', metric: 'gemini_calls', condition: 'above', threshold: 12, duration: 60, channels: ['email'], severity: 'warning' },
    { name: 'Source Down', metric: 'source_health', condition: 'below', threshold: 0.9, duration: 600, channels: ['email'], severity: 'warning' },
    { name: 'Low Active Users', metric: 'active_users', condition: 'below', threshold: 50, duration: 3600, channels: ['email'], severity: 'info' },
  ],
  dashboards: [
    { name: 'Platform Overview', metrics: ['api_latency', 'error_rate', 'active_users', 'source_health'], refreshInterval: 60 },
    { name: 'AI Performance', metrics: ['gemini_calls', 'api_latency'], refreshInterval: 60 },
  ],
  retention: 90,
  lineage: createLineage('monitoring', 'config', { metrics: 6, alerts: 4 }),
};

// ═════════════════════════════════════════════════════════════════════════════
//  Ch. 37 — Logging & Tracing
// ═════════════════════════════════════════════════════════════════════════════

export interface LogConfig {
  levels: string[];
  destinations: string[];
  format: string;
  retention: number; // days
  sensitiveFields: string[];
  tracingEnabled: boolean;
  lineage: DataLineageObject;
}

export const LOG_CONFIG: LogConfig = {
  levels: ['debug', 'info', 'warn', 'error'],
  destinations: ['console', 'Supabase gemini_calls_log', 'Supabase audit_log'],
  format: 'JSON structured logging',
  retention: 90,
  sensitiveFields: ['password', 'token', 'api_key', 'secret'],
  tracingEnabled: true,
  lineage: createLineage('logging', 'config', { levels: 4 }),
};

// ═════════════════════════════════════════════════════════════════════════════
//  Ch. 38 — Backup & Recovery
// ═════════════════════════════════════════════════════════════════════════════

export const BACKUP_CONFIG: BackupConfig = {
  strategy: 'incremental',
  frequency: 'daily',
  retention: 30,
  storage: 'Supabase (included in plan)',
  encryption: true,
  testRestoreFrequency: 'monthly',
  lineage: createLineage('backup', 'config', { strategy: 'incremental' }),
};

export interface DisasterRecoveryPlan {
  rto: number; // Recovery Time Objective in minutes
  rpo: number; // Recovery Point Objective in minutes
  procedures: DRProcedure[];
  lastTested: string;
  lineage: DataLineageObject;
}

export interface DRProcedure {
  step: number;
  action: string;
  responsible: string;
  estimatedTime: number; // minutes
}

export const DR_PLAN: DisasterRecoveryPlan = {
  rto: 60,
  rpo: 1440, // 24 hours (daily backups)
  procedures: [
    { step: 1, action: 'Assess incident scope and root cause', responsible: 'Admin', estimatedTime: 15 },
    { step: 2, action: 'Activate Supabase point-in-time recovery', responsible: 'Admin', estimatedTime: 10 },
    { step: 3, action: 'Restore database from latest backup', responsible: 'Admin', estimatedTime: 20 },
    { step: 4, action: 'Verify data integrity', responsible: 'Admin', estimatedTime: 10 },
    { step: 5, action: 'Redeploy application if needed', responsible: 'DevOps', estimatedTime: 15 },
    { step: 6, action: 'Run health checks', responsible: 'DevOps', estimatedTime: 5 },
    { step: 7, action: 'Notify stakeholders', responsible: 'Admin', estimatedTime: 5 },
  ],
  lastTested: '2026-07-01',
  lineage: createLineage('dr_plan', 'config', { rto: 60, rpo: 1440 }),
};

// ═════════════════════════════════════════════════════════════════════════════
//  Ch. 39 — Capacity Planning
// ═════════════════════════════════════════════════════════════════════════════

export const CAPACITY_PLAN: CapacityPlan = {
  current: {
    storage: { used: 150, total: 512, unit: 'MB' },
    compute: { used: 2000, total: 500000, unit: 'invocations/month' },
    bandwidth: { used: 5, total: 100, unit: 'GB/month' },
    users: { active: 200, total: 1000 },
  },
  projected: {
    storage: { used: 300, total: 512, unit: 'MB' },
    compute: { used: 50000, total: 500000, unit: 'invocations/month' },
    bandwidth: { used: 20, total: 100, unit: 'GB/month' },
    users: { active: 500, total: 2500 },
  },
  thresholds: { storageWarning: 70, storageCritical: 90, computeWarning: 80, computeCritical: 95 },
  scalingStrategy: 'Horizontal scaling via Supabase auto-scaling + Netlify CDN',
  lineage: createLineage('capacity', 'plan', {}),
};

// ═════════════════════════════════════════════════════════════════════════════
//  Ch. 40 — FinOps
// ═════════════════════════════════════════════════════════════════════════════

export const FINOPS_REPORT: FinOpsReport = {
  period: '2026-Q3',
  totalCost: 0,
  byService: [
    { name: 'Supabase Free', cost: 0, trend: 'stable' },
    { name: 'Netlify Free', cost: 0, trend: 'stable' },
    { name: 'GitHub Free', cost: 0, trend: 'stable' },
    { name: 'Gemini API', cost: 2, trend: 'up' },
    { name: 'cron-job.org Free', cost: 0, trend: 'stable' },
  ],
  optimizationActions: [
    { id: 'opt-01', description: 'Cache Gemini responses for repeated queries', estimatedSaving: 30, effort: 'medium', priority: 'high' },
    { id: 'opt-02', description: 'Implement query result pagination to reduce data transfer', estimatedSaving: 10, effort: 'low', priority: 'medium' },
    { id: 'opt-03', description: 'Use Supabase connection pooling for Edge Functions', estimatedSaving: 5, effort: 'low', priority: 'low' },
  ],
  lineage: createLineage('finops', 'report', { totalCost: 2 }),
};

// ═════════════════════════════════════════════════════════════════════════════
//  Ch. 41 — Sustainability
// ═════════════════════════════════════════════════════════════════════════════

export interface SustainabilityMetrics {
  carbonFootprint: number; // grams CO2 per request
  energySource: string;
  optimizations: string[];
  greenPractices: string[];
  lineage: DataLineageObject;
}

export const SUSTAINABILITY_CONFIG: SustainabilityMetrics = {
  carbonFootprint: 0.2, // estimated
  energySource: 'Supabase uses Google Cloud (carbon neutral)',
  optimizations: [
    'Static site generation reduces server compute',
    'CDN caching reduces repeated fetches',
    'LRU cache reduces database queries',
    'Rate limiting prevents unnecessary AI calls',
    'Efficient Vite build minimizes bundle size',
  ],
  greenPractices: [
    'Free tier maximizes resource efficiency',
    'Supabase carbon neutral infrastructure',
    'Netlify 100% renewable energy',
    'Minimal data transfer via efficient queries',
    'No unnecessary background processes',
  ],
  lineage: createLineage('sustainability', 'config', {}),
};

// ═════════════════════════════════════════════════════════════════════════════
//  Ch. 42 — Platform Documentation
// ═════════════════════════════════════════════════════════════════════════════

export interface DocumentationIndex {
  documents: DocEntry[];
  lineage: DataLineageObject;
}

export interface DocEntry {
  id: string;
  title: string;
  type: 'architecture' | 'api' | 'operations' | 'security' | 'development' | 'governance';
  path: string;
  lastUpdated: string;
  status: 'current' | 'outdated' | 'draft';
}

export const DOCUMENTATION_INDEX: DocumentationIndex = {
  documents: [
    { id: 'doc-01', title: 'Enterprise Master Architecture', type: 'architecture', path: 'EMA.md', lastUpdated: '2026-07-12', status: 'current' },
    { id: 'doc-02', title: 'Solution Architecture & Project Management', type: 'architecture', path: 'SAPM.md', lastUpdated: '2026-07-12', status: 'current' },
    { id: 'doc-03', title: 'Architecture Decision Records', type: 'governance', path: 'ADR.md', lastUpdated: '2026-07-12', status: 'current' },
    { id: 'doc-04', title: 'Agent Configuration', type: 'operations', path: 'AGENTS.md', lastUpdated: '2026-07-12', status: 'current' },
    { id: 'doc-05', title: 'Database Migrations', type: 'development', path: 'supabase/migrations/', lastUpdated: '2026-07-12', status: 'current' },
    { id: 'doc-06', title: 'CI/CD Pipeline', type: 'operations', path: '.github/workflows/ci.yml', lastUpdated: '2026-07-12', status: 'current' },
    { id: 'doc-07', title: 'Test Suite', type: 'development', path: 'src/test/', lastUpdated: '2026-07-12', status: 'current' },
  ],
  lineage: createLineage('documentation', 'index', { count: 7 }),
};

// ═════════════════════════════════════════════════════════════════════════════
//  Functions
// ═════════════════════════════════════════════════════════════════════════════

export function getRolePermissions(roleName: string): string[] {
  const role = IAM_CONFIG.roles.find(r => r.name === roleName);
  return role?.permissions || [];
}

export function getCIStages(): string[] {
  return CICD_PIPELINE.stages.map(s => s.name);
}

export function getCriticalAlerts(): AlertConfig[] {
  return MONITORING_CONFIG.alerts.filter(a => a.severity === 'critical');
}

export function getCapacityUtilization(): Record<string, number> {
  const current = CAPACITY_PLAN.current;
  return {
    storage: (current.storage.used / current.storage.total) * 100,
    compute: (current.compute.used / current.compute.total) * 100,
    bandwidth: (current.bandwidth.used / current.bandwidth.total) * 100,
  };
}

export function getFinOpsSummary(): { totalCost: number; optimizations: number; estimatedSaving: number } {
  const totalCost = FINOPS_REPORT.byService.reduce((sum, s) => sum + s.cost, 0);
  const estimatedSaving = FINOPS_REPORT.optimizationActions.reduce((sum, a) => sum + a.estimatedSaving, 0);
  return { totalCost, optimizations: FINOPS_REPORT.optimizationActions.length, estimatedSaving };
}

export function getDRProcedures(): DRProcedure[] {
  return DR_PLAN.procedures;
}

export function getDocumentationByType(type: DocEntry['type']): DocEntry[] {
  return DOCUMENTATION_INDEX.documents.filter(d => d.type === type);
}
