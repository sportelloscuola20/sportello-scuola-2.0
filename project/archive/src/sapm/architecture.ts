/**
 * ============================================================================
 *  SAPM Part II — Solution Architecture (Ch. 12-26)
 *  Architecture specifications for all 15 capabilities.
 * ============================================================================
 */

import { createLineage, type DataLineageObject } from '../foundation/types';
import { CAPABILITY_CATALOG, type Capability, type CapabilityStatus } from './capabilities';

// ─── Architecture Spec Types ─────────────────────────────────────────────────

export type SpecStatus = 'approved' | 'draft' | 'review' | 'superseded';

export interface ArchitectureSpec {
  id: string;
  capabilityId: string;
  title: string;
  version: string;
  status: SpecStatus;
  overview: string;
  architecture: ArchitectureDetail;
  dataFlows: DataFlow[];
  securityConsiderations: string[];
  scalabilityNotes: string[];
  monitoringApproach: string;
  testingStrategy: string;
  risks: Risk[];
  approvedAt?: string;
  lineage: DataLineageObject;
}

export interface ArchitectureDetail {
  components: ComponentSpec[];
  patterns: string[];
  technologies: string[];
  constraints: string[];
}

export interface ComponentSpec {
  name: string;
  type: 'service' | 'database' | 'cache' | 'queue' | 'adapter' | 'ui' | 'edge_function';
  description: string;
  interfaces: string[];
  dependencies: string[];
}

export interface DataFlow {
  id: string;
  name: string;
  steps: string[];
  trigger: string;
  frequency: string;
}

export interface Risk {
  id: string;
  description: string;
  probability: 'high' | 'medium' | 'low';
  impact: 'high' | 'medium' | 'low';
  mitigation: string;
}

// ─── Architecture Specs ──────────────────────────────────────────────────────

export const ARCHITECTURE_SPECS: ArchitectureSpec[] = [
  {
    id: 'SPEC-01',
    capabilityId: 'CAP-01',
    title: 'Unified Data Platform Architecture',
    version: '1.0',
    status: 'approved',
    overview: 'Supabase PostgreSQL as single source of truth with RLS, Edge Functions, and real-time subscriptions.',
    architecture: {
      components: [
        { name: 'Supabase PostgreSQL', type: 'database', description: 'Primary data store', interfaces: ['SQL', 'RPC', 'Realtime'], dependencies: [] },
        { name: 'Edge Functions', type: 'edge_function', description: 'Server-side processing', interfaces: ['HTTP', 'Deno'], dependencies: ['Supabase PostgreSQL'] },
      ],
      patterns: ['Repository Pattern', 'CQRS (read/write separation)', 'Event Sourcing (domain events)'],
      technologies: ['Supabase', 'PostgreSQL', 'Deno', 'pgvector'],
      constraints: ['54 source maximum', 'RLS mandatory on all tables'],
    },
    dataFlows: [
      { id: 'df-01', name: 'Data Ingestion', steps: ['Cron Trigger', 'Edge Function', 'Source Fetch', 'AI Classification', 'DB Write'], trigger: 'cron-job.org (1-5 min)', frequency: 'periodic' },
      { id: 'df-02', name: 'User Query', steps: ['Frontend', 'Supabase Client', 'RLS Check', 'Query', 'Response'], trigger: 'User action', frequency: 'on-demand' },
    ],
    securityConsiderations: ['RLS policies on all tables', 'No hardcoded credentials', 'Environment variables required'],
    scalabilityNotes: ['Connection pooling via Supabase', 'Read replicas for heavy queries', 'Edge Functions auto-scale'],
    monitoringApproach: 'Health checks, query performance metrics, connection pool stats',
    testingStrategy: 'Integration tests for all RPC functions, RLS policy tests',
    risks: [
      { id: 'r1', description: 'Supabase vendor lock-in', probability: 'medium', impact: 'medium', mitigation: 'Abstract database adapter interface' },
    ],
    approvedAt: '2026-07-12T10:00:00Z',
    lineage: createLineage('architecture_spec', 'SPEC-01', { capabilityId: 'CAP-01' }),
  },
  {
    id: 'SPEC-02',
    capabilityId: 'CAP-02',
    title: 'Event-Driven Architecture Spec',
    version: '1.0',
    status: 'approved',
    overview: 'Dual event bus: InMemoryEventBus for local handlers, PersistentEventBus for Supabase storage.',
    architecture: {
      components: [
        { name: 'InMemoryEventBus', type: 'service', description: 'Local event distribution', interfaces: ['emit()', 'subscribe()', 'off()'], dependencies: [] },
        { name: 'PersistentEventBus', type: 'service', description: 'Supabase-backed event storage', interfaces: ['persist()', 'replay()'], dependencies: ['Supabase PostgreSQL'] },
      ],
      patterns: ['Observer Pattern', 'Event Sourcing', 'Fire-and-Forget (persistence)'],
      technologies: ['TypeScript EventEmitter', 'Supabase'],
      constraints: ['Events must be serializable', 'Maximum 100 events/second'],
    },
    dataFlows: [
      { id: 'df-01', name: 'Event Emission', steps: ['Service', 'EventBus.emit()', 'Handler Execution', 'PersistentEventBus.persist()'], trigger: 'Domain action', frequency: 'on-demand' },
    ],
    securityConsiderations: ['Event payload sanitization', 'No sensitive data in events'],
    scalabilityNotes: ['InMemoryEventBus handles local traffic', 'PersistentEventBus for audit/replay'],
    monitoringApproach: 'Event count tracking, handler execution time, persistence latency',
    testingStrategy: 'Unit tests for EventBus, integration tests for PersistentEventBus',
    risks: [
      { id: 'r1', description: 'Event ordering guarantees', probability: 'low', impact: 'medium', mitigation: 'Sequence numbers in events' },
    ],
    approvedAt: '2026-07-12T10:00:00Z',
    lineage: createLineage('architecture_spec', 'SPEC-02', { capabilityId: 'CAP-02' }),
  },
  {
    id: 'SPEC-04',
    capabilityId: 'CAP-04',
    title: 'AI/ML Pipeline Architecture',
    version: '1.0',
    status: 'approved',
    overview: 'Gemini 3.1 Flash Lite with circuit breaker, RAG pipeline, knowledge graph, and prompt catalog.',
    architecture: {
      components: [
        { name: 'GeminiAdapter', type: 'adapter', description: 'LLM integration with circuit breaker', interfaces: ['generate()', 'classify()'], dependencies: ['CircuitBreaker'] },
        { name: 'RAG Pipeline', type: 'service', description: 'Retrieval-Augmented Generation', interfaces: ['query()', 'retrieve()'], dependencies: ['Supabase PostgreSQL', 'GeminiAdapter'] },
        { name: 'KnowledgeGraph', type: 'service', description: 'Document relationship graph', interfaces: ['getRelated()', 'traverse()'], dependencies: ['Supabase PostgreSQL'] },
        { name: 'PromptCatalog', type: 'service', description: 'Versioned prompt templates', interfaces: ['getPrompt()', 'scoreQuality()'], dependencies: [] },
      ],
      patterns: ['Circuit Breaker', 'RAG (Retrieval-Augmented Generation)', 'Knowledge Graph', 'Prompt Engineering'],
      technologies: ['Gemini 3.1 Flash Lite', 'pgvector', 'Supabase'],
      constraints: ['10 RPM Gemini limit', 'Temperature 0.2', 'Max 16384 tokens'],
    },
    dataFlows: [
      { id: 'df-01', name: 'RAG Query', steps: ['User Query', 'Embedding', 'Vector Search', 'Context Retrieval', 'Prompt Construction', 'Gemini Generation', 'Response'], trigger: 'User chat', frequency: 'on-demand' },
    ],
    securityConsiderations: ['No API keys in frontend', 'Rate limiting on AI calls', 'Content filtering'],
    scalabilityNotes: ['Circuit breaker prevents cascading failures', 'Response caching for repeated queries'],
    monitoringApproach: 'Gemini call tracking, response quality scoring, latency monitoring',
    testingStrategy: 'Unit tests for adapters, mock Gemini for integration tests',
    risks: [
      { id: 'r1', description: 'Gemini API rate limits', probability: 'high', impact: 'medium', mitigation: 'Circuit breaker + rate limiter' },
      { id: 'r2', description: 'AI hallucination', probability: 'medium', impact: 'high', mitigation: 'RAG with citations, quality scoring' },
    ],
    approvedAt: '2026-07-12T10:00:00Z',
    lineage: createLineage('architecture_spec', 'SPEC-04', { capabilityId: 'CAP-04' }),
  },
  {
    id: 'SPEC-07',
    capabilityId: 'CAP-07',
    title: 'Security & Compliance Architecture',
    version: '1.0',
    status: 'approved',
    overview: 'Multi-layer security: Supabase RLS, RBAC, CSRF, audit logging, data lineage.',
    architecture: {
      components: [
        { name: 'Supabase RLS', type: 'database', description: 'Row-level security policies', interfaces: ['SQL Policies'], dependencies: [] },
        { name: 'AuthService', type: 'service', description: 'RBAC + audit logging', interfaces: ['checkPermission()', 'logAuditEvent()'], dependencies: ['Supabase PostgreSQL'] },
        { name: 'CSRF Protection', type: 'service', description: 'Token generation + validation', interfaces: ['generateToken()', 'validateToken()'], dependencies: [] },
      ],
      patterns: ['RBAC', 'Defense in Depth', 'Least Privilege', 'Audit Trail'],
      technologies: ['Supabase Auth', 'PostgreSQL RLS', 'Crypto API'],
      constraints: ['All tables must have RLS', 'All mutations must be audit-logged'],
    },
    dataFlows: [
      { id: 'df-01', name: 'Auth Flow', steps: ['User Login', 'Supabase Auth', 'JWT Token', 'RLS Check', 'Data Access'], trigger: 'User action', frequency: 'on-demand' },
    ],
    securityConsiderations: ['No hardcoded secrets', 'Constant-time CSRF comparison', 'RLS on all tables'],
    scalabilityNotes: ['JWT-based auth scales horizontally', 'Audit log partitioning for performance'],
    monitoringApproach: 'Failed login tracking, permission denied alerts, audit log analysis',
    testingStrategy: 'RLS policy tests, RBAC permission tests, CSRF validation tests',
    risks: [
      { id: 'r1', description: 'RLS policy bypass', probability: 'low', impact: 'critical', mitigation: 'Regular policy audits, penetration testing' },
    ],
    approvedAt: '2026-07-12T10:00:00Z',
    lineage: createLineage('architecture_spec', 'SPEC-07', { capabilityId: 'CAP-07' }),
  },
  {
    id: 'SPEC-11',
    capabilityId: 'CAP-11',
    title: 'Universal Search Architecture',
    version: '1.0',
    status: 'approved',
    overview: '8-step search pipeline: QueryNormalizer → FilterEngine → RetrievalEngine → ResultMerger → Ranker → QualityFilter → PresentationAdapter → SearchLogger.',
    architecture: {
      components: [
        { name: 'QueryNormalizer', type: 'service', description: 'Intent detection + entity extraction', interfaces: ['normalizeQuery()'], dependencies: [] },
        { name: 'FilterEngine', type: 'service', description: 'Auto-filter generation from entities', interfaces: ['buildFilters()'], dependencies: [] },
        { name: 'RetrievalEngine', type: 'service', description: 'Multi-source retrieval', interfaces: ['retrieveResults()'], dependencies: ['Supabase PostgreSQL'] },
        { name: 'Ranker', type: 'service', description: 'Freshness + product + custom boosts', interfaces: ['rankResults()'], dependencies: [] },
        { name: 'PresentationAdapter', type: 'service', description: 'Result formatting + suggestions', interfaces: ['adaptForPresentation()'], dependencies: [] },
      ],
      patterns: ['Pipeline Pattern', 'Reciprocal Rank Fusion', 'Faceted Search'],
      technologies: ['Supabase', 'TypeScript', 'LRU Cache'],
      constraints: ['Maximum 100 results per query', 'Cache TTL 5 minutes'],
    },
    dataFlows: [
      { id: 'df-01', name: 'Search Pipeline', steps: ['User Query', 'Normalize', 'Filter', 'Retrieve', 'Merge', 'Rank', 'Quality Filter', 'Present', 'Log'], trigger: 'User search', frequency: 'on-demand' },
    ],
    securityConsiderations: ['Rate limiting per user', 'Query sanitization', 'No SQL injection'],
    scalabilityNotes: ['LRU cache for repeated queries', 'Result pagination', 'Facet caching'],
    monitoringApproach: 'Search latency tracking, result quality scoring, cache hit rate',
    testingStrategy: 'Unit tests for each pipeline step, integration tests for full pipeline',
    risks: [
      { id: 'r1', description: 'Search quality degradation', probability: 'medium', impact: 'medium', mitigation: 'Quality scoring + feedback loop' },
    ],
    approvedAt: '2026-07-12T10:00:00Z',
    lineage: createLineage('architecture_spec', 'SPEC-11', { capabilityId: 'CAP-11' }),
  },
  {
    id: 'SPEC-14',
    capabilityId: 'CAP-14',
    title: 'Product Lifecycle Management Architecture',
    version: '1.0',
    status: 'approved',
    overview: '12-product ecosystem with ProductContract, lifecycle phases, ConsistencyMatrix, and SuperFeatures.',
    architecture: {
      components: [
        { name: 'ProductRegistry', type: 'service', description: 'SSOT for all 12 products', interfaces: ['getProduct()', 'getActiveProducts()'], dependencies: [] },
        { name: 'ProductContract', type: 'service', description: 'Capability/data/event declarations', interfaces: ['getProductContract()'], dependencies: [] },
        { name: 'ConsistencyMatrix', type: 'service', description: '8 consistency checks', interfaces: ['runConsistencyMatrix()'], dependencies: [] },
        { name: 'SuperFeatures', type: 'service', description: 'Cross-product features', interfaces: ['getSuperFeaturesForProduct()'], dependencies: [] },
      ],
      patterns: ['Registry Pattern', 'Contract-First', 'Consistency Validation'],
      technologies: ['TypeScript'],
      constraints: ['12 products maximum', 'All products must have contracts'],
    },
    dataFlows: [
      { id: 'df-01', name: 'Product Discovery', steps: ['Registry Query', 'Contract Check', 'Score Calculation', 'Health Report'], trigger: 'System startup / periodic', frequency: 'periodic' },
    ],
    securityConsiderations: ['Product transitions audit-logged', 'Consistency matrix prevents invalid states'],
    scalabilityNotes: ['Product registry is static (in-memory)', 'Score calculation is O(n) where n = products'],
    monitoringApproach: 'Product health scores, consistency matrix results, phase transition tracking',
    testingStrategy: 'Unit tests for all product functions, consistency matrix tests',
    risks: [
      { id: 'r1', description: 'Product sprawl', probability: 'medium', impact: 'medium', mitigation: 'Consistency matrix validates product count' },
    ],
    approvedAt: '2026-07-12T10:00:00Z',
    lineage: createLineage('architecture_spec', 'SPEC-14', { capabilityId: 'CAP-14' }),
  },
];

// ─── Architecture Spec Functions ─────────────────────────────────────────────

/** Get spec by ID */
export function getArchitectureSpec(id: string): ArchitectureSpec | undefined {
  return ARCHITECTURE_SPECS.find(s => s.id === id);
}

/** Get spec by capability ID */
export function getSpecByCapability(capabilityId: string): ArchitectureSpec | undefined {
  return ARCHITECTURE_SPECS.find(s => s.capabilityId === capabilityId);
}

/** Get all approved specs */
export function getApprovedSpecs(): ArchitectureSpec[] {
  return ARCHITECTURE_SPECS.filter(s => s.status === 'approved');
}

/** Get all risks across specs */
export function getAllRisks(): (Risk & { specId: string })[] {
  return ARCHITECTURE_SPECS.flatMap(s => s.risks.map(r => ({ ...r, specId: s.id })));
}

/** Get high-impact risks */
export function getHighImpactRisks(): (Risk & { specId: string })[] {
  return getAllRisks().filter(r => r.impact === 'high' || r.impact === 'critical');
}
