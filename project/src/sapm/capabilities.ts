/**
 * ============================================================================
 *  SAPM Part II — Enterprise Capability Catalog (Ch. 12-26)
 *  All 15 CAPabilities with implementation status and architecture mapping.
 * ============================================================================
 */

import { createLineage, type DataLineageObject } from '../foundation/types';

// ─── Capability Types ────────────────────────────────────────────────────────

export type CapabilityStatus = 'implemented' | 'in_progress' | 'planned' | 'not_started';
export type CapabilityPriority = 'critical' | 'high' | 'medium' | 'low';
export type ArchitectureLayer = 'foundation' | 'data' | 'knowledge' | 'intelligence' | 'experience';

export interface Capability {
  id: string;
  name: string;
  description: string;
  status: CapabilityStatus;
  priority: CapabilityPriority;
  layer: ArchitectureLayer;
  components: string[];
  interfaces: string[];
  dataModels: string[];
  dependencies: string[];
  estimatedEffort: string;
  lineage: DataLineageObject;
}

// ─── Capability Catalog ──────────────────────────────────────────────────────

export const CAPABILITY_CATALOG: Capability[] = [
  // CAP-01: Unified Data Platform
  {
    id: 'CAP-01',
    name: 'Unified Data Platform',
    description: 'Single source of truth for all school-related data with Supabase PostgreSQL',
    status: 'implemented',
    priority: 'critical',
    layer: 'data',
    components: ['Supabase PostgreSQL', 'RLS Policies', 'Edge Functions', 'Migrations'],
    interfaces: ['supabaseClient', 'DatabaseAdapter', 'RPC Functions'],
    dataModels: ['DocumentiNormativi', 'InterpelliNazionali', 'IntelligenceNews', 'IntelligenceScadenze', 'KnowledgeLinks', 'ChatConversations', 'ChatMessages'],
    dependencies: [],
    estimatedEffort: 'Completed',
    lineage: createLineage('capability', 'CAP-01', { status: 'implemented' }),
  },
  // CAP-02: Event-Driven Architecture
  {
    id: 'CAP-02',
    name: 'Event-Driven Architecture',
    description: 'Domain event bus with persistent storage and real-time distribution',
    status: 'implemented',
    priority: 'critical',
    layer: 'foundation',
    components: ['EventBus', 'InMemoryEventBus', 'PersistentEventBus', 'DomainEvent'],
    interfaces: ['eventBus.emit()', 'eventBus.subscribe()', 'eventBus.off()'],
    dataModels: ['DomainEvent', 'domain_events table'],
    dependencies: ['CAP-01'],
    estimatedEffort: 'Completed',
    lineage: createLineage('capability', 'CAP-02', { status: 'implemented' }),
  },
  // CAP-03: Canonical Entities & Data Models
  {
    id: 'CAP-03',
    name: 'Canonical Entities & Data Models',
    description: 'Standardized entity definitions across all products',
    status: 'in_progress',
    priority: 'high',
    layer: 'data',
    components: ['DocumentType', 'DocumentStatus', 'InterpelloStatus', 'NominaStatus', 'EventStatus'],
    interfaces: ['CanonicalItem', 'ProductContract', 'DataLineageObject'],
    dataModels: ['DocumentoNormativo', 'Interpello', 'Nomina', 'SchedaEvento', 'Conversation'],
    dependencies: ['CAP-01'],
    estimatedEffort: '3 days',
    lineage: createLineage('capability', 'CAP-03', { status: 'in_progress' }),
  },
  // CAP-04: AI/ML Pipeline
  {
    id: 'CAP-04',
    name: 'AI/ML Pipeline',
    description: 'Gemini-powered AI with RAG, classification, and extraction',
    status: 'implemented',
    priority: 'critical',
    layer: 'intelligence',
    components: ['GeminiAdapter', 'RAG Pipeline', 'KnowledgeGraph', 'PromptCatalog'],
    interfaces: ['aiAdapter.generate()', 'queryKnowledge()', 'scoreResponseQuality()'],
    dataModels: ['RagQueryResponse', 'KnowledgeLink', 'PromptTemplate'],
    dependencies: ['CAP-01', 'CAP-02'],
    estimatedEffort: 'Completed',
    lineage: createLineage('capability', 'CAP-04', { status: 'implemented' }),
  },
  // CAP-05: Integration Hub
  {
    id: 'CAP-05',
    name: 'Integration Hub',
    description: 'External source integration with webhook management and circuit breaker',
    status: 'in_progress',
    priority: 'high',
    layer: 'foundation',
    components: ['CircuitBreaker', 'SelfHealingConnector', 'SourceObserver', 'Edge Functions'],
    interfaces: ['circuitBreaker.execute()', 'selfHealingConnector.connect()'],
    dataModels: ['SourceDefinition', 'SourceHealthStatus', 'MonitoredSource'],
    dependencies: ['CAP-01', 'CAP-02'],
    estimatedEffort: '5 days',
    lineage: createLineage('capability', 'CAP-05', { status: 'in_progress' }),
  },
  // CAP-06: Infrastructure & DevOps
  {
    id: 'CAP-06',
    name: 'Infrastructure & DevOps',
    description: 'CI/CD pipeline, quality gates, deployment automation',
    status: 'implemented',
    priority: 'critical',
    layer: 'foundation',
    components: ['GitHub Actions', 'Netlify', 'Architecture Gate', 'Quality Gates'],
    interfaces: ['ci.yml', 'npm run build', 'npm run test'],
    dataModels: [],
    dependencies: [],
    estimatedEffort: 'Completed',
    lineage: createLineage('capability', 'CAP-06', { status: 'implemented' }),
  },
  // CAP-07: Security & Compliance
  {
    id: 'CAP-07',
    name: 'Security & Compliance',
    description: 'RLS, RBAC, CSRF, audit logging, data lineage',
    status: 'implemented',
    priority: 'critical',
    layer: 'foundation',
    components: ['Supabase RLS', 'AuthService', 'CSRF Protection', 'AuditLog'],
    interfaces: ['checkPermission()', 'logAuditEvent()', 'validateCsrfToken()'],
    dataModels: ['UserRole', 'RolePermission', 'AuditLog'],
    dependencies: ['CAP-01'],
    estimatedEffort: 'Completed',
    lineage: createLineage('capability', 'CAP-07', { status: 'implemented' }),
  },
  // CAP-08: Testing & Quality Assurance
  {
    id: 'CAP-08',
    name: 'Testing & Quality Assurance',
    description: 'Unit tests, integration tests, E2E tests with Vitest',
    status: 'in_progress',
    priority: 'high',
    layer: 'foundation',
    components: ['Vitest', 'jsdom', 'jest-dom', 'Test Setup', 'Coverage'],
    interfaces: ['vitest run', 'npm run test'],
    dataModels: [],
    dependencies: ['CAP-06'],
    estimatedEffort: '5 days',
    lineage: createLineage('capability', 'CAP-08', { status: 'in_progress' }),
  },
  // CAP-09: Governance Framework
  {
    id: 'CAP-09',
    name: 'Governance Framework',
    description: 'Architecture decisions, consistency matrix, maturity tracking',
    status: 'implemented',
    priority: 'high',
    layer: 'foundation',
    components: ['ADR', 'ConsistencyMatrix', 'RoadmapTracker', 'Architecture Gate'],
    interfaces: ['runConsistencyMatrix()', 'calculateProductScore()', 'getCapabilityStatus()'],
    dataModels: ['ArchitectureDecision', 'ConsistencyCheck', 'RoadmapCapability'],
    dependencies: [],
    estimatedEffort: 'Completed',
    lineage: createLineage('capability', 'CAP-09', { status: 'implemented' }),
  },
  // CAP-10: Delivery Roadmap
  {
    id: 'CAP-10',
    name: 'Delivery Roadmap',
    description: 'Phased implementation plan with milestones and tracking',
    status: 'in_progress',
    priority: 'medium',
    layer: 'foundation',
    components: ['RoadmapTracker', 'CAPABILITY_REGISTER', 'MilestoneTracking'],
    interfaces: ['getNextActions()', 'calculateMaturity()'],
    dataModels: ['RoadmapCapability', 'RoadmapAction'],
    dependencies: ['CAP-09'],
    estimatedEffort: '2 days',
    lineage: createLineage('capability', 'CAP-10', { status: 'in_progress' }),
  },
  // CAP-11: Universal Search
  {
    id: 'CAP-11',
    name: 'Universal Search',
    description: 'Cross-product search with semantic ranking and facets',
    status: 'implemented',
    priority: 'high',
    layer: 'knowledge',
    components: ['SearchPipeline', 'QueryNormalizer', 'Ranker', 'FilterEngine', 'PresentationAdapter'],
    interfaces: ['search(query, options)', 'normalizeQuery()', 'rankResults()'],
    dataModels: ['ParsedQuery', 'SearchResult', 'SearchResponse', 'SearchFacet'],
    dependencies: ['CAP-01', 'CAP-04'],
    estimatedEffort: 'Completed',
    lineage: createLineage('capability', 'CAP-11', { status: 'implemented' }),
  },
  // CAP-12: Notification Engine
  {
    id: 'CAP-12',
    name: 'Notification Engine',
    description: 'Multi-channel notification delivery with preference management',
    status: 'implemented',
    priority: 'high',
    layer: 'experience',
    components: ['NotificationPipeline', 'RelevanceEngine', 'DeliveryEngine', 'PreferenceFilter'],
    interfaces: ['processNotificationEvent()', 'notifyNewsPublished()', 'notifyScadenzaExpiring()'],
    dataModels: ['NotificationEvent', 'NotificationDelivery', 'NotificationPreferences'],
    dependencies: ['CAP-02', 'CAP-07'],
    estimatedEffort: 'Completed',
    lineage: createLineage('capability', 'CAP-12', { status: 'implemented' }),
  },
  // CAP-13: Analytics & Monitoring
  {
    id: 'CAP-13',
    name: 'Analytics & Monitoring',
    description: 'Event tracking, health monitoring, performance metrics',
    status: 'in_progress',
    priority: 'medium',
    layer: 'foundation',
    components: ['AnalyticsEngine', 'HealthMonitor', 'SourceIntelligence', 'MetricsCollector'],
    interfaces: ['trackEvent()', 'getHealthStatus()', 'runMonitoringCycle()'],
    dataModels: ['PageAnalytics', 'SourceHealthStatus', 'MetricValue'],
    dependencies: ['CAP-01', 'CAP-02'],
    estimatedEffort: '3 days',
    lineage: createLineage('capability', 'CAP-13', { status: 'in_progress' }),
  },
  // CAP-14: Product Lifecycle Management
  {
    id: 'CAP-14',
    name: 'Product Lifecycle Management',
    description: '12-product ecosystem with lifecycle phases, scoring, and transitions',
    status: 'implemented',
    priority: 'high',
    layer: 'data',
    components: ['ProductRegistry', 'ProductContract', 'ConsistencyMatrix', 'SuperFeatures'],
    interfaces: ['getProduct()', 'calculateProductScore()', 'transitionProductPhase()'],
    dataModels: ['ProductMeta', 'ProductContract', 'ProductScore', 'CanonicalItem'],
    dependencies: ['CAP-01'],
    estimatedEffort: 'Completed',
    lineage: createLineage('capability', 'CAP-14', { status: 'implemented' }),
  },
  // CAP-15: Source Intelligence
  {
    id: 'CAP-15',
    name: 'Source Intelligence',
    description: '54-source monitoring with change detection, self-healing, and event processing',
    status: 'implemented',
    priority: 'high',
    layer: 'intelligence',
    components: ['SourceObserver', 'ChangeClassifier', 'SelfHealingConnector', 'EventValidator', 'EventEnricher', 'PriorityClassifier'],
    interfaces: ['runMonitoringCycle()', 'detectChanges()', 'classifyChange()'],
    dataModels: ['SourceEvent', 'SourceHealthStatus', 'MonitoringCycle'],
    dependencies: ['CAP-01', 'CAP-02', 'CAP-05'],
    estimatedEffort: 'Completed',
    lineage: createLineage('capability', 'CAP-15', { status: 'implemented' }),
  },
];

// ─── Capability Functions ────────────────────────────────────────────────────

/** Get capability by ID */
export function getCapability(id: string): Capability | undefined {
  return CAPABILITY_CATALOG.find(c => c.id === id);
}

/** Get capabilities by status */
export function getCapabilitiesByStatus(status: CapabilityStatus): Capability[] {
  return CAPABILITY_CATALOG.filter(c => c.status === status);
}

/** Get capabilities by layer */
export function getCapabilitiesByLayer(layer: ArchitectureLayer): Capability[] {
  return CAPABILITY_CATALOG.filter(c => c.layer === layer);
}

/** Calculate implementation progress */
export function calculateImplementationProgress(): {
  total: number;
  implemented: number;
  inProgress: number;
  planned: number;
  notStarted: number;
  percentage: number;
} {
  const total = CAPABILITY_CATALOG.length;
  const implemented = CAPABILITY_CATALOG.filter(c => c.status === 'implemented').length;
  const inProgress = CAPABILITY_CATALOG.filter(c => c.status === 'in_progress').length;
  const planned = CAPABILITY_CATALOG.filter(c => c.status === 'planned').length;
  const notStarted = CAPABILITY_CATALOG.filter(c => c.status === 'not_started').length;

  return {
    total,
    implemented,
    inProgress,
    planned,
    notStarted,
    percentage: Math.round((implemented / total) * 100),
  };
}

/** Get capability dependencies */
export function getCapabilityDependencies(capabilityId: string): Capability[] {
  const capability = getCapability(capabilityId);
  if (!capability) return [];
  return capability.dependencies
    .map(depId => getCapability(depId))
    .filter((c): c is Capability => c !== undefined);
}

/** Get critical path capabilities */
export function getCriticalPath(): Capability[] {
  return CAPABILITY_CATALOG.filter(c => c.priority === 'critical');
}

/** Get next implementation actions */
export function getNextActions(): { capability: Capability; action: string; effort: string }[] {
  return CAPABILITY_CATALOG
    .filter(c => c.status === 'in_progress' || c.status === 'planned')
    .sort((a, b) => {
      const priorityOrder: Record<CapabilityPriority, number> = { critical: 0, high: 1, medium: 2, low: 3 };
      return priorityOrder[a.priority] - priorityOrder[b.priority];
    })
    .map(c => ({
      capability: c,
      action: c.status === 'in_progress' ? `Complete ${c.name}` : `Start ${c.name}`,
      effort: c.estimatedEffort,
    }));
}
