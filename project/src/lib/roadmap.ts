/**
 * ============================================================================
 *  EMA §62-65 — DELIVERY ROADMAP & MATURITY LEVELS
 *  Tracks ecosystem maturity and transformation progress.
 * ============================================================================
 */

export type MaturityLevel = 0 | 1 | 2 | 3 | 4 | 5;

export interface Capability {
  id: string;
  name: string;
  description: string;
  currentLevel: MaturityLevel;
  targetLevel: MaturityLevel;
  category: 'foundation' | 'data' | 'intelligence' | 'experience' | 'governance';
  evidence: string[];
}

export interface MaturityAssessment {
  date: string;
  overallScore: number;
  capabilities: Capability[];
  nextActions: string[];
}

/** CAPABILITY REGISTER — EMA §63 */
export const CAPABILITY_REGISTER: Capability[] = [
  // Foundation
  {
    id: 'auth',
    name: 'Authentication & Authorization',
    description: 'User authentication, session management, RBAC',
    currentLevel: 3,
    targetLevel: 5,
    category: 'foundation',
    evidence: ['AuthContext exists', 'RBAC migration created', 'RLS policies defined'],
  },
  {
    id: 'event-driven',
    name: 'Event-Driven Architecture',
    description: 'Inter-module communication via events',
    currentLevel: 3,
    targetLevel: 5,
    category: 'foundation',
    evidence: ['InMemoryEventBus', 'PersistentEventBus', 'domain_events table'],
  },
  {
    id: 'data-lineage',
    name: 'Data Lineage',
    description: 'Provenance tracking for every data point',
    currentLevel: 3,
    targetLevel: 5,
    category: 'foundation',
    evidence: ['DataLineageObject', 'createLineage()', 'DataLineageIndicator component'],
  },

  // Data
  {
    id: 'ssot',
    name: 'Single Source of Truth',
    description: 'Canonical data model, no duplications',
    currentLevel: 3,
    targetLevel: 5,
    category: 'data',
    evidence: ['Unified SOURCE_MATRIX', 'DocumentNorma deprecated', 'canonical types'],
  },
  {
    id: 'data-governance',
    name: 'Data Governance',
    description: 'Data quality, retention, access control',
    currentLevel: 2,
    targetLevel: 4,
    category: 'data',
    evidence: ['audit_log table', 'RLS policies', 'cleanup functions'],
  },

  // Intelligence
  {
    id: 'ai-core',
    name: 'AI Core',
    description: 'Gemini integration, prompt management, quality scoring',
    currentLevel: 3,
    targetLevel: 5,
    category: 'intelligence',
    evidence: ['geminiAdapter', 'circuit breaker', 'prompt catalog v1'],
  },
  {
    id: 'rag',
    name: 'RAG Pipeline',
    description: 'Retrieval-Augmented Generation with knowledge base',
    currentLevel: 3,
    targetLevel: 4,
    category: 'intelligence',
    evidence: ['knowledge-base.ts', 'retrieval.ts', 'orchestrator.ts'],
  },
  {
    id: 'source-intel',
    name: 'Source Intelligence',
    description: 'RSS monitoring, content pipeline, deduplication',
    currentLevel: 2,
    targetLevel: 4,
    category: 'intelligence',
    evidence: ['SOURCE_MATRIX', 'monitoring.ts', 'source-intelligence.ts'],
  },

  // Experience
  {
    id: 'search',
    name: 'Universal Search',
    description: 'Cross-product semantic search',
    currentLevel: 2,
    targetLevel: 4,
    category: 'experience',
    evidence: ['SearchService.universalSearch()', 'searchCache'],
  },
  {
    id: 'notifications',
    name: 'Notification System',
    description: 'In-app notifications, real-time updates',
    currentLevel: 1,
    targetLevel: 4,
    category: 'experience',
    evidence: ['NotificationService', 'user_notifications table'],
  },
  {
    id: 'accessibility',
    name: 'Accessibility',
    description: 'WCAG 2.1 AA compliance',
    currentLevel: 1,
    targetLevel: 4,
    category: 'experience',
    evidence: ['accessibility.ts utilities', 'trapFocus', 'announce'],
  },

  // Governance
  {
    id: 'testing',
    name: 'Test Coverage',
    description: 'Unit, integration, and E2E tests',
    currentLevel: 1,
    targetLevel: 4,
    category: 'governance',
    evidence: ['Vitest configured', 'foundation tests', 'service tests'],
  },
  {
    id: 'cicd',
    name: 'CI/CD Pipeline',
    description: 'Automated build, test, deploy',
    currentLevel: 1,
    targetLevel: 4,
    category: 'governance',
    evidence: ['GitHub Actions ci.yml', 'quality gates', 'architecture gate'],
  },
  {
    id: 'monitoring',
    name: 'Observability',
    description: 'Health checks, metrics, alerting',
    currentLevel: 1,
    targetLevel: 3,
    category: 'governance',
    evidence: ['health.ts', 'analytics.ts', 'cache stats'],
  },
];

/** Calculate overall maturity score */
export function calculateMaturityScore(capabilities: Capability[]): number {
  if (capabilities.length === 0) return 0;
  const totalCurrent = capabilities.reduce((sum, c) => sum + c.currentLevel, 0);
  const totalTarget = capabilities.reduce((sum, c) => sum + c.targetLevel, 0);
  return Math.round((totalCurrent / totalTarget) * 100);
}

/** Get next priority actions */
export function getNextActions(capabilities: Capability[]): string[] {
  return capabilities
    .filter(c => c.currentLevel < c.targetLevel)
    .sort((a, b) => (b.targetLevel - b.currentLevel) - (a.targetLevel - a.currentLevel))
    .slice(0, 5)
    .map(c => `[${c.category}] ${c.name}: Level ${c.currentLevel} → ${c.targetLevel}`);
}

/** Generate full assessment */
export function generateAssessment(): MaturityAssessment {
  const score = calculateMaturityScore(CAPABILITY_REGISTER);
  return {
    date: new Date().toISOString(),
    overallScore: score,
    capabilities: CAPABILITY_REGISTER,
    nextActions: getNextActions(CAPABILITY_REGISTER),
  };
}
