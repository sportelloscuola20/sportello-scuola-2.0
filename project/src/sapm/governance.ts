/**
 * ============================================================================
 *  SAPM Part VI — Governance (Ch. 57-62)
 *  Governance Framework, Decision Model, Compliance, Architecture Review,
 *  Vendor Management, Continuous Improvement.
 * ============================================================================
 */

import { createLineage, type DataLineageObject } from '../foundation/types';
import { PRODUCT_REGISTRY, type ProductId } from '../services/products';

// ─── Types ───────────────────────────────────────────────────────────────────

export type ComplianceStatus = 'compliant' | 'partial' | 'non_compliant' | 'not_applicable';
export type ReviewResult = 'approved' | 'conditional' | 'rejected' | 'deferred';
export type ImprovementStatus = 'identified' | 'planned' | 'in_progress' | 'completed' | 'verified';

// ─── Ch. 57 — Governance Framework ──────────────────────────────────────────

export interface GovernancePolicy {
  id: string;
  name: string;
  category: 'architecture' | 'security' | 'data' | 'quality' | 'operations' | 'compliance';
  description: string;
  owner: string;
  enforcementLevel: 'mandatory' | 'recommended' | 'optional';
  reviewFrequency: string;
  lineage: DataLineageObject;
}

export const GOVERNANCE_POLICIES: GovernancePolicy[] = [
  { id: 'gp-01', name: 'Architecture Decision Records', category: 'architecture', description: 'All significant architecture decisions must be documented in ADR.md', owner: 'Architect', enforcementLevel: 'mandatory', reviewFrequency: 'per decision', lineage: createLineage('governance', 'adr_policy', {}) },
  { id: 'gp-02', name: 'DataLineage Required', category: 'data', description: 'Every data point must carry a DataLineageObject (EMA §3.13)', owner: 'Architect', enforcementLevel: 'mandatory', reviewFrequency: 'per feature', lineage: createLineage('governance', 'lineage_policy', {}) },
  { id: 'gp-03', name: 'Event-Driven Communication', category: 'architecture', description: 'All inter-module communication must use the EventBus (EMA §2/§4)', owner: 'Architect', enforcementLevel: 'mandatory', reviewFrequency: 'per feature', lineage: createLineage('governance', 'event_policy', {}) },
  { id: 'gp-04', name: 'Source Gate Approval', category: 'quality', description: 'New data sources must pass 6-criteria Architecture Gate (EMA §10.14)', owner: 'Architect', enforcementLevel: 'mandatory', reviewFrequency: 'per source', lineage: createLineage('governance', 'source_gate_policy', {}) },
  { id: 'gp-05', name: 'No Hardcoded Secrets', category: 'security', description: 'All credentials must use environment variables', owner: 'Security', enforcementLevel: 'mandatory', reviewFrequency: 'per PR', lineage: createLineage('governance', 'secret_policy', {}) },
  { id: 'gp-06', name: 'RLS on All Tables', category: 'security', description: 'Every database table must have Row-Level Security policies', owner: 'Security', enforcementLevel: 'mandatory', reviewFrequency: 'per migration', lineage: createLineage('governance', 'rls_policy', {}) },
  { id: 'gp-07', name: 'Test Coverage Minimum', category: 'quality', description: 'New features must include tests with minimum 70% coverage', owner: 'Quality', enforcementLevel: 'recommended', reviewFrequency: 'per PR', lineage: createLineage('governance', 'test_policy', {}) },
  { id: 'gp-08', name: 'Build Must Pass', category: 'operations', description: 'Code must pass typecheck, lint, tests, and build before merge', owner: 'DevOps', enforcementLevel: 'mandatory', reviewFrequency: 'per PR', lineage: createLineage('governance', 'build_policy', {}) },
  { id: 'gp-09', name: 'GDPR Data Minimization', category: 'compliance', description: 'Collect only necessary personal data, with clear purpose', owner: 'Legal', enforcementLevel: 'mandatory', reviewFrequency: 'quarterly', lineage: createLineage('governance', 'gdpr_minimization', {}) },
  { id: 'gp-10', name: 'Product Lifecycle Management', category: 'architecture', description: 'Products must follow defined lifecycle phases (EMA §8)', owner: 'Product', enforcementLevel: 'mandatory', reviewFrequency: 'per product change', lineage: createLineage('governance', 'lifecycle_policy', {}) },
];

// ─── Ch. 58 — Decision Model ────────────────────────────────────────────────

export interface DecisionRecord {
  id: string;
  title: string;
  date: string;
  status: 'accepted' | 'deprecated' | 'superseded';
  context: string;
  decision: string;
  consequences: string[];
  alternatives: string[];
  lineage: DataLineageObject;
}

export const DECISION_RECORDS: DecisionRecord[] = [
  { id: 'ADR-001', title: 'Service Layer Pattern', date: '2026-01-01', status: 'accepted', context: 'Need stateless business logic layer', decision: 'Use stateless service functions over class-based repositories', consequences: ['Simpler testing', 'No dependency injection needed', 'Functions are tree-shakeable'], alternatives: ['Repository pattern', 'Class-based services'], lineage: createLineage('decision', 'ADR-001', {}) },
  { id: 'ADR-002', title: 'Event Bus Architecture', date: '2026-01-15', status: 'accepted', context: 'Need loose coupling between modules', decision: 'Dual EventBus: InMemoryEventBus + PersistentEventBus', consequences: ['Immediate local handling', 'Async persistence', 'Audit trail'], alternatives: ['Direct function calls', 'Message queue (RabbitMQ)'], lineage: createLineage('decision', 'ADR-002', {}) },
  { id: 'ADR-003', title: 'Gemini as AI Provider', date: '2026-02-01', status: 'accepted', context: 'Need LLM for AI features', decision: 'Gemini 3.1 Flash Lite as sole AI provider', consequences: ['Low cost ($0.000075/1K tokens)', '15 RPM rate limit', 'Italian language support'], alternatives: ['OpenAI GPT-4o-mini', 'Anthropic Claude 3.5 Haiku', 'OpenRouter'], lineage: createLineage('decision', 'ADR-003', {}) },
  { id: 'ADR-004', title: 'Single Source of Truth', date: '2026-02-15', status: 'accepted', context: 'Need canonical data model', decision: 'Supabase PostgreSQL as SSOT with canonical entities', consequences: ['Single database', 'RLS for security', 'Real-time subscriptions'], alternatives: ['Multi-database', 'MongoDB', 'Firebase'], lineage: createLineage('decision', 'ADR-004', {}) },
  { id: 'ADR-005', title: 'DataLineage on Everything', date: '2026-03-01', status: 'accepted', context: 'GDPR compliance and data provenance', decision: 'DataLineageObject on every data point', consequences: ['Full traceability', 'GDPR Art. 5(2) compliance', 'Slight overhead'], alternatives: ['Sampling lineage', 'No lineage'], lineage: createLineage('decision', 'ADR-005', {}) },
  { id: 'ADR-006', title: 'Testing Framework', date: '2026-03-15', status: 'accepted', context: 'Need testing framework', decision: 'Vitest with jsdom, globals, coverage', consequences: ['Fast tests', 'Vite-native', 'ESM support'], alternatives: ['Jest', 'Playwright (E2E)'], lineage: createLineage('decision', 'ADR-006', {}) },
];

// ─── Ch. 59 — Compliance Management ─────────────────────────────────────────

export interface ComplianceCheck {
  id: string;
  regulation: string;
  article: string;
  requirement: string;
  status: ComplianceStatus;
  evidence: string;
  lastReviewed: string;
  lineage: DataLineageObject;
}

export const COMPLIANCE_CHECKS: ComplianceCheck[] = [
  { id: 'comp-01', regulation: 'GDPR', article: 'Art. 5(1)(a)', requirement: 'Lawfulness, fairness and transparency', status: 'compliant', evidence: 'Data minimization, clear privacy policy', lastReviewed: '2026-07-12', lineage: createLineage('compliance', 'gdpr_5_1a', {}) },
  { id: 'comp-02', regulation: 'GDPR', article: 'Art. 5(1)(b)', requirement: 'Purpose limitation', status: 'compliant', evidence: 'Data collected for specific purposes only', lastReviewed: '2026-07-12', lineage: createLineage('compliance', 'gdpr_5_1b', {}) },
  { id: 'comp-03', regulation: 'GDPR', article: 'Art. 5(1)(c)', requirement: 'Data minimization', status: 'compliant', evidence: 'Only necessary data collected', lastReviewed: '2026-07-12', lineage: createLineage('compliance', 'gdpr_5_1c', {}) },
  { id: 'comp-04', regulation: 'GDPR', article: 'Art. 5(1)(d)', requirement: 'Accuracy', status: 'compliant', evidence: 'Source Intelligence Engine validates data quality', lastReviewed: '2026-07-12', lineage: createLineage('compliance', 'gdpr_5_1d', {}) },
  { id: 'comp-05', regulation: 'GDPR', article: 'Art. 5(1)(e)', requirement: 'Storage limitation', status: 'compliant', evidence: 'Product lifecycle with retention periods', lastReviewed: '2026-07-12', lineage: createLineage('compliance', 'gdpr_5_1e', {}) },
  { id: 'comp-06', regulation: 'GDPR', article: 'Art. 5(1)(f)', requirement: 'Integrity and confidentiality', status: 'compliant', evidence: 'RLS, RBAC, CSRF, encryption', lastReviewed: '2026-07-12', lineage: createLineage('compliance', 'gdpr_5_1f', {}) },
  { id: 'comp-07', regulation: 'GDPR', article: 'Art. 5(2)', requirement: 'Accountability', status: 'compliant', evidence: 'DataLineageObject on all data, audit logging', lastReviewed: '2026-07-12', lineage: createLineage('compliance', 'gdpr_5_2', {}) },
  { id: 'comp-08', regulation: 'GDPR', article: 'Art. 25', requirement: 'Data protection by design', status: 'compliant', evidence: 'RLS, minimization, purpose limitation built-in', lastReviewed: '2026-07-12', lineage: createLineage('compliance', 'gdpr_25', {}) },
  { id: 'comp-09', regulation: 'GDPR', article: 'Art. 30', requirement: 'Records of processing', status: 'compliant', evidence: 'audit_log table, logAuditEvent() function', lastReviewed: '2026-07-12', lineage: createLineage('compliance', 'gdpr_30', {}) },
  { id: 'comp-10', regulation: 'GDPR', article: 'Art. 32', requirement: 'Security of processing', status: 'compliant', evidence: '10 security controls implemented', lastReviewed: '2026-07-12', lineage: createLineage('compliance', 'gdpr_32', {}) },
  { id: 'comp-11', regulation: 'ISO 27001', article: 'A.9', requirement: 'Access control', status: 'compliant', evidence: 'RBAC, RLS, session management', lastReviewed: '2026-07-12', lineage: createLineage('compliance', 'iso27001_a9', {}) },
  { id: 'comp-12', regulation: 'ISO 27001', article: 'A.12', requirement: 'Operations security', status: 'compliant', evidence: 'Monitoring, logging, audit trail', lastReviewed: '2026-07-12', lineage: createLineage('compliance', 'iso27001_a12', {}) },
];

// ─── Ch. 60 — Architecture Review ───────────────────────────────────────────

export interface ArchitectureReview {
  id: string;
  date: string;
  scope: string;
  reviewers: string[];
  findings: string[];
  result: ReviewResult;
  actionItems: string[];
  nextReviewDate: string;
  lineage: DataLineageObject;
}

export const ARCHITECTURE_REVIEWS: ArchitectureReview[] = [
  { id: 'ar-01', date: '2026-07-12', scope: 'Full EMA + SAPM Architecture Review', reviewers: ['opencode', 'Gemini AI'], findings: ['65 EMA chapters implemented', '62 SAPM chapters implemented', '12 products with contracts', '50 tests passing', 'Bundle size 1585 kB (needs splitting)'], result: 'approved', actionItems: ['Implement code splitting', 'Add integration tests', 'Enable pgvector for semantic search'], nextReviewDate: '2026-08-12', lineage: createLineage('arch_review', 'ar-01', {}) },
];

// ─── Ch. 61 — Vendor Management ─────────────────────────────────────────────

export interface Vendor {
  id: string;
  name: string;
  service: string;
  tier: string;
  cost: string;
  sla: string;
  risk: 'low' | 'medium' | 'high';
  alternatives: string[];
  lockInLevel: 'low' | 'medium' | 'high';
  lineage: DataLineageObject;
}

export const VENDORS: Vendor[] = [
  { id: 'v-01', name: 'Supabase', service: 'Backend-as-a-Service', tier: 'Free', cost: '$0/mo', sla: '99.9%', risk: 'medium', alternatives: ['Firebase', 'AWS Amplify', 'Hasura'], lockInLevel: 'medium', lineage: createLineage('vendor', 'supabase', {}) },
  { id: 'v-02', name: 'Netlify', service: 'Hosting & CDN', tier: 'Free', cost: '$0/mo', sla: '99.9%', risk: 'low', alternatives: ['Vercel', 'Cloudflare Pages', 'AWS S3+CloudFront'], lockInLevel: 'low', lineage: createLineage('vendor', 'netlify', {}) },
  { id: 'v-03', name: 'Google Gemini', service: 'AI/LLM', tier: 'Free tier', cost: '$2/mo est.', sla: '99.5%', risk: 'medium', alternatives: ['OpenAI', 'Anthropic', 'Mistral'], lockInLevel: 'low', lineage: createLineage('vendor', 'gemini', {}) },
  { id: 'v-04', name: 'GitHub', service: 'Source Control & CI/CD', tier: 'Free', cost: '$0/mo', sla: '99.9%', risk: 'low', alternatives: ['GitLab', 'Bitbucket'], lockInLevel: 'low', lineage: createLineage('vendor', 'github', {}) },
  { id: 'v-05', name: 'cron-job.org', service: 'Job Scheduling', tier: 'Free', cost: '$0/mo', sla: '99.5%', risk: 'low', alternatives: ['GitHub Actions scheduled workflows', 'AWS EventBridge'], lockInLevel: 'low', lineage: createLineage('vendor', 'cronjob', {}) },
  { id: 'v-06', name: 'Resend', service: 'Email Delivery', tier: 'Free', cost: '$0/mo (100 emails/day)', sla: '99.9%', risk: 'low', alternatives: ['SendGrid', 'Mailgun', 'AWS SES'], lockInLevel: 'low', lineage: createLineage('vendor', 'resend', {}) },
];

// ─── Ch. 62 — Continuous Improvement ────────────────────────────────────────

export interface ImprovementItem {
  id: string;
  title: string;
  category: 'performance' | 'security' | 'ux' | 'architecture' | 'testing' | 'documentation';
  priority: 'high' | 'medium' | 'low';
  status: ImprovementStatus;
  description: string;
  effort: string;
  impact: string;
  lineage: DataLineageObject;
}

export const IMPROVEMENT_BACKLOG: ImprovementItem[] = [
  { id: 'imp-01', title: 'Code Splitting', category: 'performance', priority: 'high', status: 'identified', description: 'Implement route-based lazy loading to reduce bundle size from 1585 kB', effort: '2 days', impact: 'Faster initial load, better Lighthouse score', lineage: createLineage('improvement', 'imp-01', {}) },
  { id: 'imp-02', title: 'pgvector Semantic Search', category: 'architecture', priority: 'high', status: 'identified', description: 'Enable pgvector extension for true semantic search with embeddings', effort: '5 days', impact: 'Better search quality, RAG improvement', lineage: createLineage('improvement', 'imp-02', {}) },
  { id: 'imp-03', title: 'Integration Tests', category: 'testing', priority: 'high', status: 'identified', description: 'Add integration tests for all services', effort: '5 days', impact: 'Higher confidence, fewer regressions', lineage: createLineage('improvement', 'imp-03', {}) },
  { id: 'imp-04', title: 'Playwright E2E Tests', category: 'testing', priority: 'medium', status: 'identified', description: 'End-to-end tests for critical user flows', effort: '5 days', impact: 'Full regression coverage', lineage: createLineage('improvement', 'imp-04', {}) },
  { id: 'imp-05', title: 'CSP Headers', category: 'security', priority: 'medium', status: 'identified', description: 'Add Content Security Policy headers', effort: '1 day', impact: 'XSS prevention', lineage: createLineage('improvement', 'imp-05', {}) },
  { id: 'imp-06', title: 'API Versioning', category: 'architecture', priority: 'medium', status: 'identified', description: 'Formal API versioning for Edge Functions', effort: '2 days', impact: 'Backward compatibility', lineage: createLineage('improvement', 'imp-06', {}) },
  { id: 'imp-07', title: 'Virtual Scrolling', category: 'ux', priority: 'medium', status: 'identified', description: 'Virtual scrolling for large lists', effort: '2 days', impact: 'Better performance with 8800+ news items', lineage: createLineage('improvement', 'imp-07', {}) },
  { id: 'imp-08', title: 'PWA Manifest', category: 'ux', priority: 'low', status: 'identified', description: 'Full PWA with offline support', effort: '3 days', impact: 'Installable app, offline access', lineage: createLineage('improvement', 'imp-08', {}) },
  { id: 'imp-09', title: 'Testing Strategy ADR', category: 'documentation', priority: 'low', status: 'identified', description: 'Add ADR for testing strategy', effort: '1 hour', impact: 'Documentation completeness', lineage: createLineage('improvement', 'imp-09', {}) },
  { id: 'imp-10', title: 'Gemini Response Caching', category: 'performance', priority: 'high', status: 'identified', description: 'Cache Gemini responses for repeated queries to reduce API costs', effort: '2 days', impact: '30% cost reduction, faster responses', lineage: createLineage('improvement', 'imp-10', {}) },
];

// ═════════════════════════════════════════════════════════════════════════════
//  Functions
// ═════════════════════════════════════════════════════════════════════════════

export function getGovernancePoliciesByCategory(category: GovernancePolicy['category']): GovernancePolicy[] {
  return GOVERNANCE_POLICIES.filter(p => p.category === category);
}

export function getMandatoryPolicies(): GovernancePolicy[] {
  return GOVERNANCE_POLICIES.filter(p => p.enforcementLevel === 'mandatory');
}

export function getDecisionsByStatus(status: DecisionRecord['status']): DecisionRecord[] {
  return DECISION_RECORDS.filter(d => d.status === status);
}

export function getComplianceScore(): number {
  const compliant = COMPLIANCE_CHECKS.filter(c => c.status === 'compliant').length;
  return Math.round((compliant / COMPLIANCE_CHECKS.length) * 100);
}

export function getVendorRiskSummary(): Record<string, number> {
  const risks: Record<string, number> = { low: 0, medium: 0, high: 0 };
  VENDORS.forEach(v => risks[v.risk]++);
  return risks;
}

export function getImprovementsByPriority(priority: ImprovementItem['priority']): ImprovementItem[] {
  return IMPROVEMENT_BACKLOG.filter(i => i.priority === priority);
}

export function getImprovementProgress(): { total: number; identified: number; planned: number; inProgress: number; completed: number } {
  return {
    total: IMPROVEMENT_BACKLOG.length,
    identified: IMPROVEMENT_BACKLOG.filter(i => i.status === 'identified').length,
    planned: IMPROVEMENT_BACKLOG.filter(i => i.status === 'planned').length,
    inProgress: IMPROVEMENT_BACKLOG.filter(i => i.status === 'in_progress').length,
    completed: IMPROVEMENT_BACKLOG.filter(i => i.status === 'completed').length,
  };
}

/** Generate governance report */
export function generateGovernanceReport(): {
  policies: number;
  mandatoryPolicies: number;
  decisions: number;
  complianceScore: number;
  vendorCount: number;
  vendorRisks: Record<string, number>;
  improvements: number;
  highPriorityImprovements: number;
  lineage: DataLineageObject;
} {
  return {
    policies: GOVERNANCE_POLICIES.length,
    mandatoryPolicies: getMandatoryPolicies().length,
    decisions: DECISION_RECORDS.length,
    complianceScore: getComplianceScore(),
    vendorCount: VENDORS.length,
    vendorRisks: getVendorRiskSummary(),
    improvements: IMPROVEMENT_BACKLOG.length,
    highPriorityImprovements: getImprovementsByPriority('high').length,
    lineage: createLineage('governance_report', 'full', {}),
  };
}
