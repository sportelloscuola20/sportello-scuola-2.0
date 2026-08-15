/**
 * ============================================================================
 *  SAPM Part III — Technology Architecture (Ch. 27-33)
 *  Technology Stack, Database, API, Security, AI/ML, Integration, Infra.
 * ============================================================================
 */

import { createLineage, type DataLineageObject } from '../foundation/types';

// ─── Types ───────────────────────────────────────────────────────────────────

export type TechStackCategory = 'frontend' | 'backend' | 'database' | 'ai' | 'devops' | 'security' | 'monitoring';

export interface TechComponent {
  id: string;
  name: string;
  category: TechStackCategory;
  version: string;
  purpose: string;
  license: string;
  alternatives: string[];
  migrationRisk: 'low' | 'medium' | 'high';
  lineage: DataLineageObject;
}

export interface DatabaseSpec {
  id: string;
  name: string;
  type: 'relational' | 'document' | 'vector' | 'key_value';
  engine: string;
  tables: TableSpec[];
  indexes: IndexSpec[];
  rlsPolicies: RLSPolicy[];
  lineage: DataLineageObject;
}

export interface TableSpec {
  name: string;
  description: string;
  columns: { name: string; type: string; nullable: boolean; pk: boolean }[];
  rowEstimate: number;
}

export interface IndexSpec {
  name: string;
  table: string;
  columns: string[];
  type: 'btree' | 'gin' | 'gist' | 'hash' | 'vector';
  purpose: string;
}

export interface RLSPolicy {
  name: string;
  table: string;
  operation: 'SELECT' | 'INSERT' | 'UPDATE' | 'DELETE' | 'ALL';
  using: string;
  check?: string;
}

export interface APISpec {
  id: string;
  method: 'GET' | 'POST' | 'PUT' | 'DELETE' | 'PATCH';
  path: string;
  description: string;
  auth: boolean;
  rateLimit: number;
  cacheTTL: number;
  parameters: { name: string; type: string; required: boolean; description: string }[];
  response: { status: number; schema: string; description: string }[];
}

export interface SecurityControl {
  id: string;
  name: string;
  category: 'authentication' | 'authorization' | 'encryption' | 'audit' | 'network' | 'data';
  description: string;
  implementation: string;
  status: 'implemented' | 'planned' | 'deprecated';
  complianceMapping: string[];
  lineage: DataLineageObject;
}

export interface IntegrationEndpoint {
  id: string;
  name: string;
  type: 'webhook' | 'polling' | 'push' | 'sse';
  protocol: string;
  authentication: string;
  retryPolicy: { maxRetries: number; backoffMs: number; maxBackoffMs: number };
  circuitBreaker: { failureThreshold: number; resetMs: number };
  lineage: DataLineageObject;
}

export interface InfraComponent {
  id: string;
  name: string;
  type: 'compute' | 'storage' | 'network' | 'cdn' | 'dns' | 'monitoring';
  provider: string;
  tier: 'free' | 'starter' | 'pro' | 'enterprise';
  estimatedCost: string;
  sla: string;
  lineage: DataLineageObject;
}

// ═════════════════════════════════════════════════════════════════════════════
//  Ch. 27 — Technology Stack
// ═════════════════════════════════════════════════════════════════════════════

export const TECH_STACK: TechComponent[] = [
  { id: 'ts-01', name: 'React', category: 'frontend', version: '18.x', purpose: 'UI framework', license: 'MIT', alternatives: ['Vue.js', 'Angular', 'Svelte'], migrationRisk: 'high', lineage: createLineage('tech_stack', 'react', {}) },
  { id: 'ts-02', name: 'TypeScript', category: 'frontend', version: '5.x', purpose: 'Type safety', license: 'Apache-2.0', alternatives: ['JavaScript'], migrationRisk: 'medium', lineage: createLineage('tech_stack', 'typescript', {}) },
  { id: 'ts-03', name: 'TailwindCSS', category: 'frontend', version: '3.x', purpose: 'Styling', license: 'MIT', alternatives: ['Bootstrap', 'Material UI'], migrationRisk: 'low', lineage: createLineage('tech_stack', 'tailwindcss', {}) },
  { id: 'ts-04', name: 'Vite', category: 'devops', version: '5.x', purpose: 'Build tool', license: 'MIT', alternatives: ['Webpack', 'Rollup'], migrationRisk: 'low', lineage: createLineage('tech_stack', 'vite', {}) },
  { id: 'ts-05', name: 'Supabase', category: 'database', version: '2.x', purpose: 'Backend-as-a-Service', license: 'Apache-2.0', alternatives: ['Firebase', 'AWS Amplify'], migrationRisk: 'high', lineage: createLineage('tech_stack', 'supabase', {}) },
  { id: 'ts-06', name: 'Gemini 3.1 Flash Lite', category: 'ai', version: '3.1', purpose: 'LLM for AI features', license: 'Proprietary', alternatives: ['GPT-4o-mini', 'Claude 3.5 Haiku'], migrationRisk: 'medium', lineage: createLineage('tech_stack', 'gemini', {}) },
  { id: 'ts-07', name: 'Vitest', category: 'devops', version: '3.x', purpose: 'Testing framework', license: 'MIT', alternatives: ['Jest', 'Playwright'], migrationRisk: 'low', lineage: createLineage('tech_stack', 'vitest', {}) },
  { id: 'ts-08', name: 'GitHub Actions', category: 'devops', version: 'latest', purpose: 'CI/CD', license: 'Free', alternatives: ['GitLab CI', 'Jenkins'], migrationRisk: 'low', lineage: createLineage('tech_stack', 'github_actions', {}) },
  { id: 'ts-09', name: 'Netlify', category: 'devops', version: 'latest', purpose: 'Hosting & CDN', license: 'Freemium', alternatives: ['Vercel', 'Cloudflare Pages'], migrationRisk: 'low', lineage: createLineage('tech_stack', 'netlify', {}) },
  { id: 'ts-10', name: 'Deno', category: 'backend', version: '1.x', purpose: 'Edge Functions runtime', license: 'MIT', alternatives: ['Node.js', 'Bun'], migrationRisk: 'medium', lineage: createLineage('tech_stack', 'deno', {}) },
];

// ═════════════════════════════════════════════════════════════════════════════
//  Ch. 28 — Database Architecture
// ═════════════════════════════════════════════════════════════════════════════

export const DATABASE_SPEC: DatabaseSpec = {
  id: 'db-01',
  name: 'SportelloScuola PostgreSQL',
  type: 'relational',
  engine: 'PostgreSQL 15 (Supabase)',
  tables: [
    { name: 'documenti_normativi', description: 'Documenti normativi indicizzati', columns: [{ name: 'id', type: 'uuid', nullable: false, pk: true }, { name: 'title', type: 'text', nullable: false, pk: false }, { name: 'tipo', type: 'text', nullable: false, pk: false }, { name: 'number', type: 'text', nullable: false, pk: false }, { name: 'year', type: 'integer', nullable: false, pk: false }, { name: 'ente', type: 'text', nullable: false, pk: false }, { name: 'regione', type: 'text', nullable: true, pk: false }, { name: 'status', type: 'text', nullable: false, pk: false }, { name: 'created_at', type: 'timestamptz', nullable: false, pk: false }], rowEstimate: 500 },
    { name: 'intelligence_news', description: 'Notizie classificate', columns: [{ name: 'id', type: 'uuid', nullable: false, pk: true }, { name: 'title', type: 'text', nullable: false, pk: false }, { name: 'category', type: 'text', nullable: false, pk: false }, { name: 'regione', type: 'text', nullable: true, pk: false }, { name: 'published_at', type: 'timestamptz', nullable: false, pk: false }], rowEstimate: 8800 },
    { name: 'intelligence_scadenze', description: 'Scadenze estratte', columns: [{ name: 'id', type: 'uuid', nullable: false, pk: true }, { name: 'title', type: 'text', nullable: false, pk: false }, { name: 'deadline', type: 'date', nullable: false, pk: false }, { name: 'target', type: 'text', nullable: false, pk: false }], rowEstimate: 155 },
    { name: 'interpelli_nazionali', description: 'Interpelli/bandi/concorsi', columns: [{ name: 'id', type: 'uuid', nullable: false, pk: true }, { name: 'title', type: 'text', nullable: false, pk: false }, { name: 'ente', type: 'text', nullable: false, pk: false }, { name: 'status', type: 'text', nullable: false, pk: false }], rowEstimate: 200 },
    { name: 'knowledge_links', description: 'Grafo relazionale', columns: [{ name: 'id', type: 'uuid', nullable: false, pk: true }, { name: 'source_id', type: 'uuid', nullable: false, pk: false }, { name: 'target_id', type: 'uuid', nullable: false, pk: false }, { name: 'relation_type', type: 'text', nullable: false, pk: false }], rowEstimate: 467 },
    { name: 'chat_conversations', description: 'Conversazioni chat', columns: [{ name: 'id', type: 'uuid', nullable: false, pk: true }, { name: 'user_id', type: 'uuid', nullable: false, pk: false }, { name: 'created_at', type: 'timestamptz', nullable: false, pk: false }], rowEstimate: 500 },
    { name: 'chat_messages', description: 'Messaggi chat', columns: [{ name: 'id', type: 'uuid', nullable: false, pk: true }, { name: 'conversation_id', type: 'uuid', nullable: false, pk: false }, { name: 'role', type: 'text', nullable: false, pk: false }, { name: 'content', type: 'text', nullable: false, pk: false }, { name: 'citations', type: 'jsonb', nullable: true, pk: false }, { name: 'latency_ms', type: 'integer', nullable: true, pk: false }], rowEstimate: 2000 },
    { name: 'monitored_sources', description: 'Fonti monitorate', columns: [{ name: 'name', type: 'text', nullable: false, pk: true }, { name: 'url', type: 'text', nullable: false, pk: false }, { name: 'tipo', type: 'text', nullable: false, pk: false }, { name: 'attivo', type: 'boolean', nullable: false, pk: false }], rowEstimate: 54 },
    { name: 'source_documents', description: 'Coda documenti', columns: [{ name: 'id', type: 'uuid', nullable: false, pk: true }, { name: 'source_name', type: 'text', nullable: false, pk: false }, { name: 'processing_started_at', type: 'timestamptz', nullable: true, pk: false }], rowEstimate: 10000 },
    { name: 'user_roles', description: 'Ruoli utente', columns: [{ name: 'user_id', type: 'uuid', nullable: false, pk: true }, { name: 'role', type: 'text', nullable: false, pk: false }, { name: 'assigned_at', type: 'timestamptz', nullable: false, pk: false }], rowEstimate: 100 },
    { name: 'audit_log', description: 'Log audit', columns: [{ name: 'id', type: 'uuid', nullable: false, pk: true }, { name: 'user_id', type: 'uuid', nullable: false, pk: false }, { name: 'action', type: 'text', nullable: false, pk: false }, { name: 'resource', type: 'text', nullable: false, pk: false }, { name: 'created_at', type: 'timestamptz', nullable: false, pk: false }], rowEstimate: 5000 },
    { name: 'domain_events', description: 'Eventi persistenti', columns: [{ name: 'id', type: 'uuid', nullable: false, pk: true }, { name: 'type', type: 'text', nullable: false, pk: false }, { name: 'payload', type: 'jsonb', nullable: false, pk: false }, { name: 'created_at', type: 'timestamptz', nullable: false, pk: false }], rowEstimate: 10000 },
    { name: 'gemini_calls_log', description: 'Log chiamate Gemini', columns: [{ name: 'id', type: 'uuid', nullable: false, pk: true }, { name: 'model', type: 'text', nullable: false, pk: false }, { name: 'tokens', type: 'integer', nullable: false, pk: false }, { name: 'latency_ms', type: 'integer', nullable: false, pk: false }, { name: 'created_at', type: 'timestamptz', nullable: false, pk: false }], rowEstimate: 3000 },
    { name: 'page_analytics', description: 'Analytics piattaforma', columns: [{ name: 'id', type: 'uuid', nullable: false, pk: true }, { name: 'event_type', type: 'text', nullable: false, pk: false }, { name: 'page', type: 'text', nullable: false, pk: false }, { name: 'created_at', type: 'timestamptz', nullable: false, pk: false }], rowEstimate: 20000 },
  ],
  indexes: [
    { name: 'idx_news_category', table: 'intelligence_news', columns: ['category'], type: 'btree', purpose: 'Category filtering' },
    { name: 'idx_news_published', table: 'intelligence_news', columns: ['published_at'], type: 'btree', purpose: 'Date sorting' },
    { name: 'idx_scadenze_deadline', table: 'intelligence_scadenze', columns: ['deadline'], type: 'btree', purpose: 'Deadline filtering' },
    { name: 'idx_interpelli_ente', table: 'interpelli_nazionali', columns: ['ente'], type: 'btree', purpose: 'Ente filtering' },
    { name: 'idx_knowledge_source', table: 'knowledge_links', columns: ['source_id'], type: 'btree', purpose: 'Graph traversal' },
    { name: 'idx_knowledge_target', table: 'knowledge_links', columns: ['target_id'], type: 'btree', purpose: 'Reverse graph traversal' },
    { name: 'idx_chat_conv_user', table: 'chat_conversations', columns: ['user_id'], type: 'btree', purpose: 'User conversation lookup' },
    { name: 'idx_audit_user', table: 'audit_log', columns: ['user_id', 'created_at'], type: 'btree', purpose: 'User audit history' },
    { name: 'idx_events_type', table: 'domain_events', columns: ['type', 'created_at'], type: 'btree', purpose: 'Event type filtering' },
    { name: 'idx_analytics_type', table: 'page_analytics', columns: ['event_type', 'created_at'], type: 'btree', purpose: 'Analytics queries' },
  ],
  rlsPolicies: [
    { name: 'news_read_all', table: 'intelligence_news', operation: 'SELECT', using: 'true' },
    { name: 'interpelli_read_all', table: 'interpelli_nazionali', operation: 'SELECT', using: 'true' },
    { name: 'chat_user_isolation', table: 'chat_conversations', operation: 'ALL', using: 'auth.uid() = user_id' },
    { name: 'chat_messages_via_conv', table: 'chat_messages', operation: 'ALL', using: 'EXISTS (SELECT 1 FROM chat_conversations WHERE id = conversation_id AND user_id = auth.uid())' },
    { name: 'audit_admin_only', table: 'audit_log', operation: 'SELECT', using: 'EXISTS (SELECT 1 FROM user_roles WHERE user_id = auth.uid() AND role = \'admin\')' },
    { name: 'roles_user_self', table: 'user_roles', operation: 'SELECT', using: 'user_id = auth.uid() OR EXISTS (SELECT 1 FROM user_roles WHERE user_id = auth.uid() AND role = \'admin\')' },
    { name: 'events_admin_write', table: 'domain_events', operation: 'INSERT', using: 'EXISTS (SELECT 1 FROM user_roles WHERE user_id = auth.uid() AND role IN (\'admin\', \'system\'))' },
  ],
  lineage: createLineage('database_spec', 'supabase', { tables: 13, indexes: 10, rlsPolicies: 7 }),
};

// ═════════════════════════════════════════════════════════════════════════════
//  Ch. 29 — API Architecture
// ═════════════════════════════════════════════════════════════════════════════

export const API_ENDPOINTS: APISpec[] = [
  { id: 'api-01', method: 'GET', path: '/api/v1/search', description: 'Universal search across all products', auth: false, rateLimit: 30, cacheTTL: 300, parameters: [{ name: 'q', type: 'string', required: true, description: 'Search query' }, { name: 'page', type: 'number', required: false, description: 'Page number' }, { name: 'limit', type: 'number', required: false, description: 'Results per page' }], response: [{ status: 200, schema: 'SearchResponse', description: 'Search results with facets' }] },
  { id: 'api-02', method: 'POST', path: '/api/v1/chat', description: 'Send chat message to AI assistant', auth: true, rateLimit: 10, cacheTTL: 0, parameters: [{ name: 'conversation_id', type: 'string', required: false, description: 'Existing conversation ID' }, { name: 'message', type: 'string', required: true, description: 'User message' }], response: [{ status: 200, schema: 'ChatResponse', description: 'AI response with citations' }] },
  { id: 'api-03', method: 'GET', path: '/api/v1/normativa', description: 'List documents with filters', auth: false, rateLimit: 60, cacheTTL: 600, parameters: [{ name: 'tipo', type: 'string', required: false, description: 'Document type' }, { name: 'ente', type: 'string', required: false, description: 'Issuing entity' }, { name: 'regione', type: 'string', required: false, description: 'Region' }], response: [{ status: 200, schema: 'DocumentListResponse', description: 'Document list' }] },
  { id: 'api-04', method: 'GET', path: '/api/v1/interpelli', description: 'List interpelli', auth: false, rateLimit: 60, cacheTTL: 300, parameters: [{ name: 'ente', type: 'string', required: false, description: 'Entity' }, { name: 'stato', type: 'string', required: false, description: 'Status' }], response: [{ status: 200, schema: 'InterpelloListResponse', description: 'Interpello list' }] },
  { id: 'api-05', method: 'GET', path: '/api/v1/scadenze', description: 'Upcoming deadlines', auth: false, rateLimit: 60, cacheTTL: 300, parameters: [{ name: 'days', type: 'number', required: false, description: 'Days ahead' }, { name: 'target', type: 'string', required: false, description: 'Target audience' }], response: [{ status: 200, schema: 'ScadenzaListResponse', description: 'Deadline list' }] },
  { id: 'api-06', method: 'GET', path: '/api/v1/nomine', description: 'List nomine', auth: false, rateLimit: 60, cacheTTL: 300, parameters: [{ name: 'regione', type: 'string', required: false, description: 'Region' }, { name: 'tipo', type: 'string', required: false, description: 'Nomina type' }], response: [{ status: 200, schema: 'NominaListResponse', description: 'Nomina list' }] },
  { id: 'api-07', method: 'GET', path: '/api/v1/eventi', description: 'List events', auth: false, rateLimit: 60, cacheTTL: 300, parameters: [{ name: 'tipo', type: 'string', required: false, description: 'Event type' }, { name: 'data', type: 'string', required: false, description: 'Date' }], response: [{ status: 200, schema: 'EventoListResponse', description: 'Event list' }] },
  { id: 'api-08', method: 'GET', path: '/api/v1/health', description: 'System health check', auth: false, rateLimit: 300, cacheTTL: 10, parameters: [], response: [{ status: 200, schema: 'HealthResponse', description: 'System health' }] },
  { id: 'api-09', method: 'POST', path: '/api/v1/notifications/read', description: 'Mark notification as read', auth: true, rateLimit: 60, cacheTTL: 0, parameters: [{ name: 'notification_id', type: 'string', required: true, description: 'Notification ID' }], response: [{ status: 200, schema: 'SuccessResponse', description: 'Marked as read' }] },
  { id: 'api-10', method: 'GET', path: '/api/v1/products', description: 'List all products with health', auth: false, rateLimit: 60, cacheTTL: 300, parameters: [], response: [{ status: 200, schema: 'ProductListResponse', description: 'Product list with scores' }] },
];

// ═════════════════════════════════════════════════════════════════════════════
//  Ch. 30 — Security Architecture
// ═════════════════════════════════════════════════════════════════════════════

export const SECURITY_CONTROLS: SecurityControl[] = [
  { id: 'sec-01', name: 'Supabase Auth', category: 'authentication', description: 'JWT-based authentication with email/password and OAuth', implementation: 'Supabase Auth module', status: 'implemented', complianceMapping: ['GDPR Art. 32', 'ISO 27001 A.9.4'], lineage: createLineage('security', 'auth', {}) },
  { id: 'sec-02', name: 'Row-Level Security', category: 'authorization', description: 'PostgreSQL RLS policies on all sensitive tables', implementation: 'Database-level RLS policies', status: 'implemented', complianceMapping: ['GDPR Art. 25', 'ISO 27001 A.9.1'], lineage: createLineage('security', 'rls', {}) },
  { id: 'sec-03', name: 'RBAC', category: 'authorization', description: 'Role-based access control (admin, editor, viewer)', implementation: 'user_roles table + checkPermission() RPC', status: 'implemented', complianceMapping: ['ISO 27001 A.9.2'], lineage: createLineage('security', 'rbac', {}) },
  { id: 'sec-04', name: 'CSRF Protection', category: 'security', description: 'Token-based CSRF protection with constant-time comparison', implementation: 'lib/csrf.ts', status: 'implemented', complianceMapping: ['OWASP Top 10'], lineage: createLineage('security', 'csrf', {}) },
  { id: 'sec-05', name: 'Audit Logging', category: 'audit', description: 'Complete audit trail for all mutations', implementation: 'audit_log table + logAuditEvent() RPC', status: 'implemented', complianceMapping: ['GDPR Art. 30', 'ISO 27001 A.12.4'], lineage: createLineage('security', 'audit', {}) },
  { id: 'sec-06', name: 'Data Lineage', category: 'data', description: 'DataLineageObject on every data point', implementation: 'foundation/types.ts createLineage()', status: 'implemented', complianceMapping: ['GDPR Art. 5(2)'], lineage: createLineage('security', 'lineage', {}) },
  { id: 'sec-07', name: 'Rate Limiting', category: 'network', description: 'Token bucket rate limiting per user', implementation: 'lib/rate-limiter.ts', status: 'implemented', complianceMapping: ['OWASP Top 10'], lineage: createLineage('security', 'rate_limit', {}) },
  { id: 'sec-08', name: 'Environment Variables', category: 'data', description: 'No hardcoded secrets — all credentials in env vars', implementation: 'VITE_SUPABASE_URL, VITE_SUPABASE_ANON_KEY', status: 'implemented', complianceMapping: ['OWASP Top 10', 'ISO 27001 A.10.1'], lineage: createLineage('security', 'env', {}) },
  { id: 'sec-09', name: 'Circuit Breaker', category: 'network', description: 'Circuit breaker for external API calls', implementation: 'foundation/adapters/CircuitBreaker', status: 'implemented', complianceMapping: ['ISO 27001 A.12.1'], lineage: createLineage('security', 'circuit_breaker', {}) },
  { id: 'sec-10', name: 'HTTPS Enforcement', category: 'network', description: 'TLS 1.3 enforced via Supabase and Netlify', implementation: 'Platform-level HTTPS', status: 'implemented', complianceMapping: ['GDPR Art. 32', 'ISO 27001 A.13.1'], lineage: createLineage('security', 'https', {}) },
];

// ═════════════════════════════════════════════════════════════════════════════
//  Ch. 31 — AI/ML Architecture
// ═════════════════════════════════════════════════════════════════════════════

export interface AISpec {
  model: string;
  provider: string;
  rpm: number;
  rpd: number;
  temperature: number;
  maxOutputTokens: number;
  features: string[];
  limitations: string[];
  costPer1kTokens: string;
}

export const AI_SPEC: AISpec = {
  model: 'Gemini 3.1 Flash Lite',
  provider: 'Google',
  rpm: 15,
  rpd: 500,
  temperature: 0.2,
  maxOutputTokens: 16384,
  features: ['Text generation', 'Classification', 'Entity extraction', 'Summarization', 'Translation'],
  limitations: ['No image generation', 'No real-time data', 'Italian language may have lower quality', 'Hallucination risk'],
  costPer1kTokens: '$0.000075',
};

// ═════════════════════════════════════════════════════════════════════════════
//  Ch. 32 — Integration Architecture
// ═════════════════════════════════════════════════════════════════════════════

export const INTEGRATION_ENDPOINTS: IntegrationEndpoint[] = [
  { id: 'int-01', name: 'MIUR RSS Feeds', type: 'polling', protocol: 'RSS/Atom', authentication: 'none', retryPolicy: { maxRetries: 3, backoffMs: 1000, maxBackoffMs: 30000 }, circuitBreaker: { failureThreshold: 5, resetMs: 60000 }, lineage: createLineage('integration', 'miur_rss', {}) },
  { id: 'int-02', name: 'CNSU API', type: 'polling', protocol: 'REST', authentication: 'api_key', retryPolicy: { maxRetries: 3, backoffMs: 2000, maxBackoffMs: 60000 }, circuitBreaker: { failureThreshold: 3, resetMs: 120000 }, lineage: createLineage('integration', 'cnsu', {}) },
  { id: 'int-03', name: 'Provveditorati RSS', type: 'polling', protocol: 'RSS/Atom', authentication: 'none', retryPolicy: { maxRetries: 2, backoffMs: 1000, maxBackoffMs: 15000 }, circuitBreaker: { failureThreshold: 5, resetMs: 30000 }, lineage: createLineage('integration', 'provveditorati', {}) },
  { id: 'int-04', name: 'Gemini API', type: 'push', protocol: 'REST', authentication: 'api_key', retryPolicy: { maxRetries: 2, backoffMs: 500, maxBackoffMs: 5000 }, circuitBreaker: { failureThreshold: 10, resetMs: 60000 }, lineage: createLineage('integration', 'gemini', {}) },
  { id: 'int-05', name: 'Supabase Realtime', type: 'sse', protocol: 'WebSocket', authentication: 'jwt', retryPolicy: { maxRetries: 10, backoffMs: 100, maxBackoffMs: 5000 }, circuitBreaker: { failureThreshold: 20, resetMs: 10000 }, lineage: createLineage('integration', 'supabase_realtime', {}) },
  { id: 'int-06', name: 'Resend Email', type: 'push', protocol: 'REST', authentication: 'api_key', retryPolicy: { maxRetries: 3, backoffMs: 1000, maxBackoffMs: 30000 }, circuitBreaker: { failureThreshold: 5, resetMs: 60000 }, lineage: createLineage('integration', 'resend', {}) },
  { id: 'int-07', name: 'cron-job.org', type: 'polling', protocol: 'HTTP', authentication: 'api_key', retryPolicy: { maxRetries: 1, backoffMs: 0, maxBackoffMs: 0 }, circuitBreaker: { failureThreshold: 3, resetMs: 300000 }, lineage: createLineage('integration', 'cronjob', {}) },
];

// ═════════════════════════════════════════════════════════════════════════════
//  Ch. 33 — Infrastructure Architecture
// ═════════════════════════════════════════════════════════════════════════════

export const INFRA_COMPONENTS: InfraComponent[] = [
  { id: 'infra-01', name: 'Netlify CDN', type: 'cdn', provider: 'Netlify', tier: 'free', estimatedCost: '$0/mo', sla: '99.9%', lineage: createLineage('infra', 'netlify_cdn', {}) },
  { id: 'infra-02', name: 'Supabase Database', type: 'storage', provider: 'Supabase', tier: 'free', estimatedCost: '$0/mo (500MB, 50K MAU)', sla: '99.9%', lineage: createLineage('infra', 'supabase_db', {}) },
  { id: 'infra-03', name: 'Supabase Auth', type: 'compute', provider: 'Supabase', tier: 'free', estimatedCost: '$0/mo (50K MAU)', sla: '99.9%', lineage: createLineage('infra', 'supabase_auth', {}) },
  { id: 'infra-04', name: 'Supabase Edge Functions', type: 'compute', provider: 'Supabase', tier: 'free', estimatedCost: '$0/mo (500K invocations)', sla: '99.9%', lineage: createLineage('infra', 'supabase_edge', {}) },
  { id: 'infra-05', name: 'Supabase Storage', type: 'storage', provider: 'Supabase', tier: 'free', estimatedCost: '$0/mo (1GB)', sla: '99.9%', lineage: createLineage('infra', 'supabase_storage', {}) },
  { id: 'infra-06', name: 'GitHub Actions', type: 'compute', provider: 'GitHub', tier: 'free', estimatedCost: '$0/mo (2000 min)', sla: '99.9%', lineage: createLineage('infra', 'github_actions', {}) },
  { id: 'infra-07', name: 'cron-job.org', type: 'compute', provider: 'cron-job.org', tier: 'free', estimatedCost: '$0/mo', sla: '99.5%', lineage: createLineage('infra', 'cronjob', {}) },
];

// ═════════════════════════════════════════════════════════════════════════════
//  Functions
// ═════════════════════════════════════════════════════════════════════════════

export function getTechByCategory(cat: TechStackCategory): TechComponent[] {
  return TECH_STACK.filter(t => t.category === cat);
}

export function getSecurityByCategory(cat: SecurityControl['category']): SecurityControl[] {
  return SECURITY_CONTROLS.filter(s => s.category === cat);
}

export function getImplementedSecurity(): SecurityControl[] {
  return SECURITY_CONTROLS.filter(s => s.status === 'implemented');
}

export function getDatabaseStats(): { tables: number; totalRows: number; indexes: number; rlsPolicies: number } {
  return {
    tables: DATABASE_SPEC.tables.length,
    totalRows: DATABASE_SPEC.tables.reduce((sum, t) => sum + t.rowEstimate, 0),
    indexes: DATABASE_SPEC.indexes.length,
    rlsPolicies: DATABASE_SPEC.rlsPolicies.length,
  };
}

export function getInfraCost(): string {
  return INFRA_COMPONENTS.map(i => `${i.name}: ${i.estimatedCost}`).join('\n');
}

export function getIntegrationsByType(type: IntegrationEndpoint['type']): IntegrationEndpoint[] {
  return INTEGRATION_ENDPOINTS.filter(i => i.type === type);
}

export function getAPIEndpointsByAuth(authRequired: boolean): APISpec[] {
  return API_ENDPOINTS.filter(e => e.auth === authRequired);
}
