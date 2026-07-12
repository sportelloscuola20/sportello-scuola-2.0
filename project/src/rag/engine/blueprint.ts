/**
 * ============================================================================
 *  EMA §55-61 — BLUEPRINT ARCHITECTURE
 *  6 macro-blocks, Service Responsibility Map, architecture validation.
 * ============================================================================
 */

import { createLineage, type DataLineageObject } from '../../foundation/types';

// ─── Blueprint Types ─────────────────────────────────────────────────────────

export type MacroBlock =
  | 'access_channels'
  | 'application_services'
  | 'cross_cutting_engines'
  | 'data_platform'
  | 'ai_intelligence'
  | 'governance_operations';

export type MaturityLevel = 'initial' | 'developing' | 'defined' | 'managed' | 'optimizing';

export interface BlueprintComponent {
  id: string;
  name: string;
  macroBlock: MacroBlock;
  description: string;
  responsibility: string;
  interfaces: string[];
  dependencies: string[];
  maturity: MaturityLevel;
  lineage: DataLineageObject;
}

export interface ServiceResponsibility {
  service: string;
  layer: string;
  responsibilities: string[];
  interfaces: string[];
  dataFlow: string;
  lineage: DataLineageObject;
}

// ─── 6 Macro-Blocks (EMA §56-61) ───────────────────────────────────────────

export const BLUEPRINT_COMPONENTS: BlueprintComponent[] = [
  // §56 — Access Channels
  {
    id: 'web_app',
    name: 'Web Application',
    macroBlock: 'access_channels',
    description: 'React SPA con routing, state management, e UI components',
    responsibility: 'Frontend rendering, user interaction, client-side routing',
    interfaces: ['REST API', 'WebSocket', 'Supabase Client'],
    dependencies: ['application_services', 'data_platform'],
    maturity: 'managed',
    lineage: createLineage('blueprint', 'web_app', {}),
  },
  {
    id: 'pwa',
    name: 'Progressive Web App',
    macroBlock: 'access_channels',
    description: 'Service worker, offline support, installability',
    responsibility: 'Offline capability, push notifications, app-like experience',
    interfaces: ['Service Worker API', 'Push API', 'Cache API'],
    dependencies: ['web_app'],
    maturity: 'developing',
    lineage: createLineage('blueprint', 'pwa', {}),
  },
  {
    id: 'email',
    name: 'Email Notifications',
    macroBlock: 'access_channels',
    description: 'Email delivery via Resend for notifications and digests',
    responsibility: 'Email delivery, template rendering, delivery tracking',
    interfaces: ['Resend API', 'SMTP'],
    dependencies: ['cross_cutting_engines'],
    maturity: 'defined',
    lineage: createLineage('blueprint', 'email', {}),
  },

  // §57 — Application Services
  {
    id: 'search_service',
    name: 'Universal Search Service',
    macroBlock: 'application_services',
    description: 'Cross-product search with semantic ranking',
    responsibility: 'Query processing, result ranking, facet generation',
    interfaces: ['Search API', 'Event Bus'],
    dependencies: ['data_platform', 'ai_intelligence'],
    maturity: 'managed',
    lineage: createLineage('blueprint', 'search_service', {}),
  },
  {
    id: 'chat_service',
    name: 'Chat Service',
    macroBlock: 'application_services',
    description: 'AI-powered conversational assistant',
    responsibility: 'Conversation management, response generation, citation tracking',
    interfaces: ['Chat API', 'AI Adapter', 'Event Bus'],
    dependencies: ['ai_intelligence', 'data_platform'],
    maturity: 'managed',
    lineage: createLineage('blueprint', 'chat_service', {}),
  },
  {
    id: 'notification_service',
    name: 'Notification Service',
    macroBlock: 'application_services',
    description: 'Multi-channel notification delivery',
    responsibility: 'Event routing, preference management, delivery tracking',
    interfaces: ['Notification API', 'Event Bus', 'Email Service'],
    dependencies: ['cross_cutting_engines'],
    maturity: 'defined',
    lineage: createLineage('blueprint', 'notification_service', {}),
  },
  {
    id: 'auth_service',
    name: 'Auth & RBAC Service',
    macroBlock: 'application_services',
    description: 'Authentication, authorization, audit logging',
    responsibility: 'User management, role assignment, permission checks, audit trail',
    interfaces: ['Auth API', 'Supabase Auth', 'Event Bus'],
    dependencies: ['data_platform'],
    maturity: 'managed',
    lineage: createLineage('blueprint', 'auth_service', {}),
  },

  // §58 — Cross-Cutting Engines
  {
    id: 'event_bus',
    name: 'Event Bus',
    macroBlock: 'cross_cutting_engines',
    description: 'Domain event distribution with persistent storage',
    responsibility: 'Event emission, routing, persistence, replay',
    interfaces: ['EventEmitter', 'Supabase'],
    dependencies: ['data_platform'],
    maturity: 'managed',
    lineage: createLineage('blueprint', 'event_bus', {}),
  },
  {
    id: 'cache_layer',
    name: 'Cache Layer',
    macroBlock: 'cross_cutting_engines',
    description: 'Multi-tier caching with LRU eviction',
    responsibility: 'Query caching, response caching, invalidation',
    interfaces: ['Cache API', 'LRU Cache'],
    dependencies: [],
    maturity: 'managed',
    lineage: createLineage('blueprint', 'cache_layer', {}),
  },
  {
    id: 'rate_limiter',
    name: 'Rate Limiter',
    macroBlock: 'cross_cutting_engines',
    description: 'Token bucket rate limiting per user/source',
    responsibility: 'Request throttling, quota management',
    interfaces: ['Rate Limit API'],
    dependencies: [],
    maturity: 'defined',
    lineage: createLineage('blueprint', 'rate_limiter', {}),
  },
  {
    id: 'lineage_tracker',
    name: 'Data Lineage Tracker',
    macroBlock: 'cross_cutting_engines',
    description: 'Tracks data provenance across all operations',
    responsibility: 'Lineage creation, propagation, storage',
    interfaces: ['Lineage API'],
    dependencies: ['data_platform'],
    maturity: 'managed',
    lineage: createLineage('blueprint', 'lineage_tracker', {}),
  },

  // §59 — Data Platform
  {
    id: 'supabase_db',
    name: 'Supabase PostgreSQL',
    macroBlock: 'data_platform',
    description: 'Primary data store with RLS, RPC, real-time',
    responsibility: 'Data storage, queries, real-time subscriptions, RLS',
    interfaces: ['Supabase Client', 'PostgreSQL', 'RLS'],
    dependencies: [],
    maturity: 'managed',
    lineage: createLineage('blueprint', 'supabase_db', {}),
  },
  {
    id: 'edge_functions',
    name: 'Supabase Edge Functions',
    macroBlock: 'data_platform',
    description: 'Server-side processing for AI, ingestion, monitoring',
    responsibility: 'Background jobs, AI calls, data processing',
    interfaces: ['Deno Runtime', 'Supabase Client'],
    dependencies: ['supabase_db', 'ai_intelligence'],
    maturity: 'managed',
    lineage: createLineage('blueprint', 'edge_functions', {}),
  },
  {
    id: 'cron_jobs',
    name: 'Cron Job Scheduler',
    macroBlock: 'data_platform',
    description: 'External scheduling via cron-job.org',
    responsibility: 'Periodic execution of monitoring and ingestion',
    interfaces: ['HTTP Triggers', 'Edge Functions'],
    dependencies: ['edge_functions'],
    maturity: 'defined',
    lineage: createLineage('blueprint', 'cron_jobs', {}),
  },

  // §60 — AI Intelligence
  {
    id: 'gemini_engine',
    name: 'Gemini AI Engine',
    macroBlock: 'ai_intelligence',
    description: 'LLM integration via Gemini 3.1 Flash Lite',
    responsibility: 'Text generation, classification, extraction, analysis',
    interfaces: ['Gemini API', 'AI Adapter'],
    dependencies: [],
    maturity: 'managed',
    lineage: createLineage('blueprint', 'gemini_engine', {}),
  },
  {
    id: 'rag_pipeline',
    name: 'RAG Pipeline',
    macroBlock: 'ai_intelligence',
    description: 'Retrieval-Augmented Generation with knowledge base',
    responsibility: 'Context retrieval, prompt construction, response augmentation',
    interfaces: ['Knowledge Base', 'Embeddings', 'Gemini'],
    dependencies: ['supabase_db', 'gemini_engine'],
    maturity: 'developing',
    lineage: createLineage('blueprint', 'rag_pipeline', {}),
  },
  {
    id: 'knowledge_graph',
    name: 'Knowledge Graph',
    macroBlock: 'ai_intelligence',
    description: 'Document relationship graph with graph traversal',
    responsibility: 'Relationship management, graph queries, recommendations',
    interfaces: ['Graph API', 'Supabase'],
    dependencies: ['supabase_db'],
    maturity: 'developing',
    lineage: createLineage('blueprint', 'knowledge_graph', {}),
  },
  {
    id: 'prompt_catalog',
    name: 'Prompt Catalog',
    macroBlock: 'ai_intelligence',
    description: 'Versioned, A/B-testable prompt templates',
    responsibility: 'Prompt management, versioning, quality scoring',
    interfaces: ['Prompt API'],
    dependencies: [],
    maturity: 'defined',
    lineage: createLineage('blueprint', 'prompt_catalog', {}),
  },

  // §61 — Governance & Operations
  {
    id: 'source_gate',
    name: 'Architecture Gate',
    macroBlock: 'governance_operations',
    description: '6-criteria validation for new source integration',
    responsibility: 'Source validation, acceptance criteria, quality checks',
    interfaces: ['Gate API', 'Event Bus'],
    dependencies: [],
    maturity: 'managed',
    lineage: createLineage('blueprint', 'source_gate', {}),
  },
  {
    id: 'health_monitor',
    name: 'Health Monitoring',
    macroBlock: 'governance_operations',
    description: 'System health checks and alerting',
    responsibility: 'Health checks, uptime monitoring, alert generation',
    interfaces: ['Health API', 'Notification Service'],
    dependencies: ['notification_service'],
    maturity: 'defined',
    lineage: createLineage('blueprint', 'health_monitor', {}),
  },
  {
    id: 'analytics',
    name: 'Analytics Engine',
    macroBlock: 'governance_operations',
    description: 'Event tracking and dashboard metrics',
    responsibility: 'Event logging, metric calculation, dashboard generation',
    interfaces: ['Analytics API', 'Supabase'],
    dependencies: ['supabase_db'],
    maturity: 'developing',
    lineage: createLineage('blueprint', 'analytics', {}),
  },
  {
    id: 'ci_cd',
    name: 'CI/CD Pipeline',
    macroBlock: 'governance_operations',
    description: 'GitHub Actions with quality gates',
    responsibility: 'Build, test, lint, deploy, Architecture Gate',
    interfaces: ['GitHub Actions', 'Netlify'],
    dependencies: [],
    maturity: 'managed',
    lineage: createLineage('blueprint', 'ci_cd', {}),
  },
];

// ─── Service Responsibility Map (EMA §56) ──────────────────────────────────

export const SERVICE_RESPONSIBILITY_MAP: ServiceResponsibility[] = [
  {
    service: 'SearchService',
    layer: 'Application Services',
    responsibilities: ['Query normalization', 'Filter building', 'Result ranking', 'Facet generation'],
    interfaces: ['search(query, options)'],
    dataFlow: 'User → QueryNormalizer → FilterEngine → RetrievalEngine → Ranker → PresentationAdapter → User',
    lineage: createLineage('service_responsibility', 'SearchService', {}),
  },
  {
    service: 'ChatService',
    layer: 'Application Services',
    responsibilities: ['Conversation CRUD', 'AI response generation', 'Citation tracking', 'Quality scoring'],
    interfaces: ['createConversation()', 'sendMessage()', 'getHistory()'],
    dataFlow: 'User → ChatService → RAG Pipeline → Gemini → Response → User',
    lineage: createLineage('service_responsibility', 'ChatService', {}),
  },
  {
    service: 'NotificationService',
    layer: 'Application Services',
    responsibilities: ['Event routing', 'Preference filtering', 'Multi-channel delivery', 'Delivery tracking'],
    interfaces: ['notify()', 'getPreferences()', 'markRead()'],
    dataFlow: 'Event → Router → RelevanceScorer → PreferenceFilter → Delivery → Tracker → User',
    lineage: createLineage('service_responsibility', 'NotificationService', {}),
  },
  {
    service: 'AuthService',
    layer: 'Foundation',
    responsibilities: ['Authentication', 'RBAC', 'Permission checks', 'Audit logging'],
    interfaces: ['login()', 'checkPermission()', 'logAuditEvent()'],
    dataFlow: 'User → Auth → RBAC Check → Permission → Response',
    lineage: createLineage('service_responsibility', 'AuthService', {}),
  },
  {
    service: 'ProductService',
    layer: 'Application Services',
    responsibilities: ['Product registry', 'Lifecycle management', 'Score calculation', 'Contract validation'],
    interfaces: ['getProduct()', 'getActiveProducts()', 'calculateProductScore()'],
    dataFlow: 'ProductRegistry → ProductContract → ConsistencyMatrix → HealthScore',
    lineage: createLineage('service_responsibility', 'ProductService', {}),
  },
  {
    service: 'SourceIntelligenceService',
    layer: 'Cross-Cutting Engines',
    responsibilities: ['Source monitoring', 'Change detection', 'Event processing', 'Health tracking'],
    interfaces: ['runMonitoringCycle()', 'checkSourceHealth()'],
    dataFlow: 'SourceObserver → ChangeClassifier → SelfHealingConnector → EventValidator → EventEnricher → PriorityClassifier',
    lineage: createLineage('service_responsibility', 'SourceIntelligenceService', {}),
  },
  {
    service: 'DocumentiService',
    layer: 'Application Services',
    responsibilities: ['Document lifecycle', 'Relationship management', 'Editorial output', 'Topic navigation'],
    interfaces: ['load()', 'approve()', 'archive()'],
    dataFlow: 'Document → Lifecycle → Relationships → EditorialModel → User',
    lineage: createLineage('service_responsibility', 'DocumentiService', {}),
  },
];

// ─── Blueprint Functions ────────────────────────────────────────────────────

/** Get components by macro block */
export function getComponentsByMacroBlock(block: MacroBlock): BlueprintComponent[] {
  return BLUEPRINT_COMPONENTS.filter(c => c.macroBlock === block);
}

/** Get component by ID */
export function getComponent(id: string): BlueprintComponent | undefined {
  return BLUEPRINT_COMPONENTS.find(c => c.id === id);
}

/** Get dependencies for a component */
export function getDependencies(componentId: string): BlueprintComponent[] {
  const component = getComponent(componentId);
  if (!component) return [];
  return component.dependencies
    .map(depId => getComponent(depId))
    .filter((c): c is BlueprintComponent => c !== undefined);
}

/** Get dependents (reverse dependencies) */
export function getDependents(componentId: string): BlueprintComponent[] {
  return BLUEPRINT_COMPONENTS.filter(c => c.dependencies.includes(componentId));
}

/** Validate blueprint completeness */
export function validateBlueprint(): {
  complete: boolean;
  missingBlocks: MacroBlock[];
  componentsByBlock: Record<MacroBlock, number>;
} {
  const allBlocks: MacroBlock[] = [
    'access_channels', 'application_services', 'cross_cutting_engines',
    'data_platform', 'ai_intelligence', 'governance_operations',
  ];

  const componentsByBlock = {} as Record<MacroBlock, number>;
  for (const block of allBlocks) {
    componentsByBlock[block] = BLUEPRINT_COMPONENTS.filter(c => c.macroBlock === block).length;
  }

  const missingBlocks = allBlocks.filter(b => componentsByBlock[b] === 0);

  return {
    complete: missingBlocks.length === 0,
    missingBlocks,
    componentsByBlock,
  };
}

/** Calculate blueprint maturity score */
export function calculateBlueprintMaturity(): {
  overall: MaturityLevel;
  byBlock: Record<MacroBlock, MaturityLevel>;
  score: number;
} {
  const maturityScores: Record<MaturityLevel, number> = {
    initial: 1,
    developing: 2,
    defined: 3,
    managed: 4,
    optimizing: 5,
  };

  const blocks: MacroBlock[] = [
    'access_channels', 'application_services', 'cross_cutting_engines',
    'data_platform', 'ai_intelligence', 'governance_operations',
  ];

  const byBlock = {} as Record<MacroBlock, MaturityLevel>;
  let totalScore = 0;
  let count = 0;

  for (const block of blocks) {
    const components = getComponentsByMacroBlock(block);
    if (components.length === 0) {
      byBlock[block] = 'initial';
      continue;
    }

    const avgScore = components.reduce((sum, c) => sum + maturityScores[c.maturity], 0) / components.length;
    const level: MaturityLevel = avgScore >= 4.5 ? 'optimizing' : avgScore >= 3.5 ? 'managed' : avgScore >= 2.5 ? 'defined' : avgScore >= 1.5 ? 'developing' : 'initial';
    byBlock[block] = level;
    totalScore += avgScore;
    count++;
  }

  const overallScore = count > 0 ? totalScore / count : 0;
  const overall: MaturityLevel = overallScore >= 4.5 ? 'optimizing' : overallScore >= 3.5 ? 'managed' : overallScore >= 2.5 ? 'defined' : overallScore >= 1.5 ? 'developing' : 'initial';

  return { overall, byBlock, score: Math.round((overallScore / 5) * 100) };
}
