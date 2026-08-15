/**
 * ============================================================================
 *  SAPM Part I — Assessment Reports (Ch. 1-11)
 *  Repository Structure, Frontend, Application Layer, Backend, Data, AI,
 *  Integration, Platform, Trust, Operations.
 * ============================================================================
 */

import { createLineage, type DataLineageObject } from '../foundation/types';

// ─── Assessment Types ────────────────────────────────────────────────────────

export type AssessmentStatus = 'completed' | 'in_progress' | 'pending' | 'not_applicable';
export type MaturityLevel = 0 | 1 | 2 | 3 | 4 | 5;

export interface AssessmentReport {
  id: string;
  chapter: number;
  title: string;
  status: AssessmentStatus;
  maturityLevel: MaturityLevel;
  findings: Finding[];
  recommendations: Recommendation[];
  actionItems: ActionItem[];
  assessedAt: string;
  assessor: string;
  lineage: DataLineageObject;
}

export interface Finding {
  id: string;
  category: 'strength' | 'weakness' | 'opportunity' | 'risk';
  description: string;
  evidence: string;
  impact: 'high' | 'medium' | 'low';
}

export interface Recommendation {
  id: string;
  priority: 'critical' | 'high' | 'medium' | 'low';
  description: string;
  rationale: string;
  effort: string;
  timeline: string;
}

export interface ActionItem {
  id: string;
  description: string;
  owner: string;
  status: 'todo' | 'in_progress' | 'done' | 'blocked';
  dueDate?: string;
}

// ─── Assessment Reports ──────────────────────────────────────────────────────

export const SAPM_ASSESSMENTS: AssessmentReport[] = [
  {
    id: 'SAPM-01',
    chapter: 1,
    title: 'Repository Structure',
    status: 'completed',
    maturityLevel: 4,
    findings: [
      { id: 'f1', category: 'strength', description: 'Clean separation: foundation/, services/, rag/, components/, lib/', evidence: 'Directory structure analysis', impact: 'high' },
      { id: 'f2', category: 'strength', description: 'TypeScript throughout with strict mode', evidence: 'tsconfig.json analysis', impact: 'high' },
      { id: 'f3', category: 'weakness', description: 'Some legacy files in root src/ not yet migrated', evidence: 'File listing scan', impact: 'low' },
    ],
    recommendations: [
      { id: 'r1', priority: 'medium', description: 'Migrate remaining legacy files to new structure', rationale: 'Consistency', effort: '2 days', timeline: 'Sprint 3' },
    ],
    actionItems: [
      { id: 'a1', description: 'Audit and migrate legacy files', owner: 'dev', status: 'todo' },
    ],
    assessedAt: '2026-07-12T10:00:00Z',
    assessor: 'opencode',
    lineage: createLineage('sapm_assessment', 'ch01', { maturity: 4 }),
  },
  {
    id: 'SAPM-02',
    chapter: 2,
    title: 'Frontend Architecture',
    status: 'completed',
    maturityLevel: 3,
    findings: [
      { id: 'f1', category: 'strength', description: 'React + TypeScript + TailwindCSS with shadcn/ui', evidence: 'package.json + component analysis', impact: 'high' },
      { id: 'f2', category: 'strength', description: 'Component-based architecture with reusable UI primitives', evidence: 'components/ui/ directory', impact: 'high' },
      { id: 'f3', category: 'weakness', description: 'Main bundle is 1,572 kB — needs code splitting', evidence: 'vite build output', impact: 'medium' },
      { id: 'f4', category: 'weakness', description: 'No lazy loading for route components', evidence: 'pages/ imports', impact: 'medium' },
    ],
    recommendations: [
      { id: 'r1', priority: 'high', description: 'Implement route-based code splitting with React.lazy()', rationale: 'Performance', effort: '3 days', timeline: 'Sprint 2' },
      { id: 'r2', priority: 'medium', description: 'Add virtual scrolling for large lists', rationale: 'UX', effort: '2 days', timeline: 'Sprint 3' },
    ],
    actionItems: [
      { id: 'a1', description: 'Add lazy loading to App.tsx routes', owner: 'dev', status: 'todo' },
      { id: 'a2', description: 'Analyze and optimize bundle size', owner: 'dev', status: 'todo' },
    ],
    assessedAt: '2026-07-12T10:00:00Z',
    assessor: 'opencode',
    lineage: createLineage('sapm_assessment', 'ch02', { maturity: 3 }),
  },
  {
    id: 'SAPM-03',
    chapter: 3,
    title: 'Application Layer',
    status: 'completed',
    maturityLevel: 4,
    findings: [
      { id: 'f1', category: 'strength', description: 'Service layer pattern with stateless functions', evidence: 'services/ directory — 9 services', impact: 'high' },
      { id: 'f2', category: 'strength', description: 'All services have lineage tracking', evidence: 'createLineage() usage in all services', impact: 'high' },
      { id: 'f3', category: 'strength', description: 'Event-driven architecture with EventBus', evidence: 'foundation/events.ts', impact: 'high' },
    ],
    recommendations: [
      { id: 'r1', priority: 'medium', description: 'Add input validation with Zod schemas', rationale: 'Type safety', effort: '2 days', timeline: 'Sprint 3' },
    ],
    actionItems: [],
    assessedAt: '2026-07-12T10:00:00Z',
    assessor: 'opencode',
    lineage: createLineage('sapm_assessment', 'ch03', { maturity: 4 }),
  },
  {
    id: 'SAPM-04',
    chapter: 4,
    title: 'Backend & Data Layer',
    status: 'completed',
    maturityLevel: 4,
    findings: [
      { id: 'f1', category: 'strength', description: 'Supabase with RLS, RPC, and real-time subscriptions', evidence: 'supabase/migrations/', impact: 'high' },
      { id: 'f2', category: 'strength', description: '54 sources in unified SOURCE_MATRIX with权重系统', evidence: 'rag/engine/sources.ts', impact: 'high' },
      { id: 'f3', category: 'strength', description: 'Migration-based schema management', evidence: '15 migrations', impact: 'medium' },
    ],
    recommendations: [
      { id: 'r1', priority: 'low', description: 'Add database connection pooling config', rationale: 'Scalability', effort: '1 day', timeline: 'Sprint 4' },
    ],
    actionItems: [],
    assessedAt: '2026-07-12T10:00:00Z',
    assessor: 'opencode',
    lineage: createLineage('sapm_assessment', 'ch04', { maturity: 4 }),
  },
  {
    id: 'SAPM-05',
    chapter: 5,
    title: 'AI & Intelligence Layer',
    status: 'completed',
    maturityLevel: 3,
    findings: [
      { id: 'f1', category: 'strength', description: 'Gemini 3.1 Flash Lite with circuit breaker pattern', evidence: 'foundation/adapters/gemini-adapter.ts', impact: 'high' },
      { id: 'f2', category: 'strength', description: 'RAG pipeline with knowledge graph', evidence: 'rag/ directory', impact: 'high' },
      { id: 'f3', category: 'weakness', description: 'RAG pipeline is "developing" maturity', evidence: 'blueprint assessment', impact: 'medium' },
    ],
    recommendations: [
      { id: 'r1', priority: 'high', description: 'Implement pgvector for semantic search', rationale: 'RAG quality', effort: '5 days', timeline: 'Sprint 2-3' },
    ],
    actionItems: [
      { id: 'a1', description: 'Enable pgvector extension in Supabase', owner: 'dev', status: 'todo' },
    ],
    assessedAt: '2026-07-12T10:00:00Z',
    assessor: 'opencode',
    lineage: createLineage('sapm_assessment', 'ch05', { maturity: 3 }),
  },
  {
    id: 'SAPM-06',
    chapter: 6,
    title: 'Integration & API Layer',
    status: 'completed',
    maturityLevel: 3,
    findings: [
      { id: 'f1', category: 'strength', description: 'Edge Functions for server-side processing', evidence: 'supabase/functions/', impact: 'high' },
      { id: 'f2', category: 'strength', description: 'Cron-job.org for periodic monitoring', evidence: 'AGENTS.md cron config', impact: 'medium' },
      { id: 'f3', category: 'weakness', description: 'No formal API versioning in production', evidence: 'lib/api-version.ts is scaffold only', impact: 'medium' },
    ],
    recommendations: [
      { id: 'r1', priority: 'medium', description: 'Implement API versioning for Edge Functions', rationale: 'Backward compatibility', effort: '2 days', timeline: 'Sprint 3' },
    ],
    actionItems: [],
    assessedAt: '2026-07-12T10:00:00Z',
    assessor: 'opencode',
    lineage: createLineage('sapm_assessment', 'ch06', { maturity: 3 }),
  },
  {
    id: 'SAPM-07',
    chapter: 7,
    title: 'Platform & Infrastructure',
    status: 'completed',
    maturityLevel: 4,
    findings: [
      { id: 'f1', category: 'strength', description: 'Vite build with optimized output', evidence: 'vite.config.ts', impact: 'high' },
      { id: 'f2', category: 'strength', description: 'Netlify deployment with auto-build', evidence: 'CI/CD pipeline', impact: 'high' },
      { id: 'f3', category: 'strength', description: 'GitHub Actions with quality gates', evidence: '.github/workflows/ci.yml', impact: 'high' },
    ],
    recommendations: [],
    actionItems: [],
    assessedAt: '2026-07-12T10:00:00Z',
    assessor: 'opencode',
    lineage: createLineage('sapm_assessment', 'ch07', { maturity: 4 }),
  },
  {
    id: 'SAPM-08',
    chapter: 8,
    title: 'Security & Trust',
    status: 'completed',
    maturityLevel: 4,
    findings: [
      { id: 'f1', category: 'strength', description: 'Supabase RLS on all tables', evidence: 'migrations 014, 015', impact: 'high' },
      { id: 'f2', category: 'strength', description: 'CSRF protection with constant-time comparison', evidence: 'lib/csrf.ts', impact: 'high' },
      { id: 'f3', category: 'strength', description: 'RBAC with audit logging', evidence: 'services/auth.ts + migration 015', impact: 'high' },
      { id: 'f4', category: 'strength', description: 'No hardcoded secrets — env vars required', evidence: 'supabaseClient.ts security fix', impact: 'high' },
    ],
    recommendations: [
      { id: 'r1', priority: 'medium', description: 'Add Content Security Policy headers', rationale: 'XSS prevention', effort: '1 day', timeline: 'Sprint 3' },
    ],
    actionItems: [],
    assessedAt: '2026-07-12T10:00:00Z',
    assessor: 'opencode',
    lineage: createLineage('sapm_assessment', 'ch08', { maturity: 4 }),
  },
  {
    id: 'SAPM-09',
    chapter: 9,
    title: 'Testing & Quality',
    status: 'completed',
    maturityLevel: 3,
    findings: [
      { id: 'f1', category: 'strength', description: '50 tests passing across 9 test files', evidence: 'vitest run output', impact: 'high' },
      { id: 'f2', category: 'strength', description: 'Vitest with jsdom, globals, coverage', evidence: 'vitest.config.ts', impact: 'medium' },
      { id: 'f3', category: 'weakness', description: 'No integration or E2E tests', evidence: 'test/ directory', impact: 'medium' },
    ],
    recommendations: [
      { id: 'r1', priority: 'high', description: 'Add integration tests for services', rationale: 'Confidence', effort: '5 days', timeline: 'Sprint 2-3' },
      { id: 'r2', priority: 'medium', description: 'Add Playwright E2E tests for critical flows', rationale: 'Regression', effort: '5 days', timeline: 'Sprint 4' },
    ],
    actionItems: [
      { id: 'a1', description: 'Write integration tests for SearchService', owner: 'dev', status: 'todo' },
      { id: 'a2', description: 'Set up Playwright for E2E testing', owner: 'dev', status: 'todo' },
    ],
    assessedAt: '2026-07-12T10:00:00Z',
    assessor: 'opencode',
    lineage: createLineage('sapm_assessment', 'ch09', { maturity: 3 }),
  },
  {
    id: 'SAPM-10',
    chapter: 10,
    title: 'DevOps & Deployment',
    status: 'completed',
    maturityLevel: 4,
    findings: [
      { id: 'f1', category: 'strength', description: 'CI/CD with quality gates (typecheck, lint, test, build)', evidence: '.github/workflows/ci.yml', impact: 'high' },
      { id: 'f2', category: 'strength', description: 'Architecture Gate in CI pipeline', evidence: 'ci.yml gate job', impact: 'high' },
      { id: 'f3', category: 'strength', description: 'Netlify auto-deploy on main', evidence: 'Netlify config', impact: 'medium' },
    ],
    recommendations: [],
    actionItems: [],
    assessedAt: '2026-07-12T10:00:00Z',
    assessor: 'opencode',
    lineage: createLineage('sapm_assessment', 'ch10', { maturity: 4 }),
  },
  {
    id: 'SAPM-11',
    chapter: 11,
    title: 'Governance & Documentation',
    status: 'completed',
    maturityLevel: 4,
    findings: [
      { id: 'f1', category: 'strength', description: 'ADR.md with 6 Architecture Decision Records', evidence: 'ADR.md', impact: 'high' },
      { id: 'f2', category: 'strength', description: 'AGENTS.md with architecture documentation', evidence: 'AGENTS.md', impact: 'high' },
      { id: 'f3', category: 'strength', description: 'EMA.md (16,664 lines) + SAPM.md (20,776 lines)', evidence: 'Documentation files', impact: 'high' },
    ],
    recommendations: [
      { id: 'r1', priority: 'low', description: 'Add ADR for testing strategy', rationale: 'Completeness', effort: '1 hour', timeline: 'Sprint 3' },
    ],
    actionItems: [],
    assessedAt: '2026-07-12T10:00:00Z',
    assessor: 'opencode',
    lineage: createLineage('sapm_assessment', 'ch11', { maturity: 4 }),
  },
];

// ─── Assessment Functions ────────────────────────────────────────────────────

/** Get assessment by chapter */
export function getAssessmentByChapter(chapter: number): AssessmentReport | undefined {
  return SAPM_ASSESSMENTS.find(a => a.chapter === chapter);
}

/** Get all completed assessments */
export function getCompletedAssessments(): AssessmentReport[] {
  return SAPM_ASSESSMENTS.filter(a => a.status === 'completed');
}

/** Calculate overall maturity */
export function calculateOverallMaturity(): {
  average: number;
  byChapter: { chapter: number; title: string; maturity: MaturityLevel }[];
  weakest: AssessmentReport[];
  strongest: AssessmentReport[];
} {
  const completed = getCompletedAssessments();
  const average = completed.length > 0
    ? completed.reduce((sum, a) => sum + a.maturityLevel, 0) / completed.length
    : 0;

  const byChapter = completed.map(a => ({
    chapter: a.chapter,
    title: a.title,
    maturity: a.maturityLevel,
  }));

  const sorted = [...completed].sort((a, b) => a.maturityLevel - b.maturityLevel);

  return {
    average: Math.round(average * 10) / 10,
    byChapter,
    weakest: sorted.slice(0, 3),
    strongest: sorted.slice(-3).reverse(),
  };
}

/** Get all findings by category */
export function getFindingsByCategory(category: Finding['category']): Finding[] {
  return SAPM_ASSESSMENTS.flatMap(a => a.findings.filter(f => f.category === category));
}

/** Get all high-priority recommendations */
export function getHighPriorityRecommendations(): Recommendation[] {
  return SAPM_ASSESSMENTS.flatMap(a => a.recommendations.filter(r => r.priority === 'critical' || r.priority === 'high'));
}

/** Get all open action items */
export function getOpenActionItems(): ActionItem[] {
  return SAPM_ASSESSMENTS.flatMap(a => a.actionItems.filter(ai => ai.status === 'todo' || ai.status === 'in_progress'));
}
