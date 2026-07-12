/**
 * ============================================================================
 *  EMA §7 + §8 — PRODUCT ECOSYSTEM + UNIVERSAL PRODUCT FRAMEWORK
 *  12 official products, ProductContract, lifecycle phases, ConsistencyMatrix.
 * ============================================================================
 */

import { createLineage, type DataLineageObject } from '../foundation/types';
import { eventBus } from '../foundation/events';

// ─── Product Identifiers ─────────────────────────────────────────────────────

export type ProductId =
  | 'normativa'
  | 'notizie_scadenze'
  | 'interpelli'
  | 'calcolo_punteggio'
  | 'consulente'
  | 'simulatore_nomine'
  | 'osservatorio_nomine'
  | 'guida_completa'
  | 'bandi'
  | 'hub_eventi'
  | 'gps_calculator'
  | 'area_riservata';

// ─── Lifecycle Phases (EMA §8) ──────────────────────────────────────────────

export type ProductPhase =
  | 'discovery'
  | 'design'
  | 'development'
  | 'validation'
  | 'launch'
  | 'growth'
  | 'maturity'
  | 'sunset'
  | 'deprecated';

// ─── Canonical Product Attributes (EMA §8) ──────────────────────────────────

export interface ProductMeta {
  id: ProductId;
  name: string;
  description: string;
  icon: string;
  route: string;
  color: string;
  version: string;
  status: 'active' | 'beta' | 'deprecated';
  phase: ProductPhase;
  targetUsers: string[];
  kpis: ProductKPI[];
  maturity: number; // 0-5
}

// ─── Product KPI (EMA §8) ───────────────────────────────────────────────────

export interface ProductKPI {
  name: string;
  metric: string;
  target: number;
  unit: string;
}

// ─── Product Contract (EMA §7) ──────────────────────────────────────────────

export interface ProductContract {
  id: ProductId;
  name: string;
  version: string;
  phase: ProductPhase;
  capabilities: string[];
  dataSources: string[];
  eventDeclarations: string[];
  searchConfig: ProductSearchConfig;
  notificationConfig: ProductNotificationConfig;
  lifecycle: ProductLifecycleConfig;
}

export interface ProductSearchConfig {
  enabled: boolean;
  boost: number;
  facets: string[];
  synonyms: string[];
}

export interface ProductNotificationConfig {
  enabled: boolean;
  channels: ('in_app' | 'email' | 'push')[];
  events: string[];
}

export interface ProductLifecycleConfig {
  retentionDays: number;
  archiveAfterDays: number;
  autoDeleteAfterDays: number;
  versioningEnabled: boolean;
}

// ─── Canonical Item (EMA §8) ────────────────────────────────────────────────

export interface CanonicalItem {
  id: string;
  product: ProductId;
  title: string;
  description: string;
  category: string;
  tags: string[];
  publishedAt: string;
  updatedAt: string;
  url: string;
  lineage: DataLineageObject;
  lifecycle: {
    phase: ProductPhase;
    version: string;
    deprecatedAt?: string;
    archivedAt?: string;
  };
  metadata: Record<string, unknown>;
}

// ─── Product Score (EMA §7) ─────────────────────────────────────────────────

export interface ProductScore {
  productId: ProductId;
  health: number; // 0-100
  adoption: number; // 0-100
  freshness: number; // 0-100
  quality: number; // 0-100
  overall: number; // weighted average
  lastCalculated: string;
}

// ─── SuperFeature (EMA §7) ──────────────────────────────────────────────────

export interface SuperFeature {
  id: string;
  name: string;
  products: ProductId[];
  description: string;
  enabled: boolean;
}

// ─── 12 Official Products (EMA §7) ──────────────────────────────────────────

export const PRODUCT_REGISTRY: Record<ProductId, ProductMeta> = {
  normativa: {
    id: 'normativa',
    name: 'Normativa & Documenti',
    description: 'Il punto di riferimento nazionale per la normativa scolastica',
    icon: '📜',
    route: '/normativa',
    color: 'text-blue-600',
    version: '2.0.0',
    status: 'active',
    phase: 'growth',
    targetUsers: ['Dirigenti', 'Segreterie', 'Docenti', 'ATA'],
    kpis: [
      { name: 'Documenti indicizzati', metric: 'indexed_documents', target: 5000, unit: 'docs' },
      { name: 'Ricerche/mese', metric: 'monthly_searches', target: 10000, unit: 'searches' },
      { name: 'Copertura normativa', metric: 'coverage', target: 95, unit: '%' },
    ],
    maturity: 4,
  },
  notizie_scadenze: {
    id: 'notizie_scadenze',
    name: 'Notizie & Scadenze',
    description: 'Dashboard intelligence con scadenze filtrabili e notizie classificate',
    icon: '📰',
    route: '/notizie',
    color: 'text-green-600',
    version: '2.0.0',
    status: 'active',
    phase: 'growth',
    targetUsers: ['Tutti gli utenti'],
    kpis: [
      { name: 'Notizie pubblicate', metric: 'published_news', target: 500, unit: 'news/month' },
      { name: 'Scadenze attive', metric: 'active_deadlines', target: 50, unit: 'deadlines' },
      { name: 'Fonti monitorate', metric: 'monitored_sources', target: 30, unit: 'sources' },
    ],
    maturity: 4,
  },
  interpelli: {
    id: 'interpelli',
    name: 'Interpelli',
    description: 'Il motore nazionale degli interpelli scolastici con AI analysis',
    icon: '📋',
    route: '/interpelli',
    color: 'text-purple-600',
    version: '2.0.0',
    status: 'active',
    phase: 'growth',
    targetUsers: ['Dirigenti', 'SGM', 'Consulenti'],
    kpis: [
      { name: 'Interpelli totali', metric: 'total_interpelli', target: 200, unit: 'interpelli' },
      { name: 'Risposte ottenute', metric: 'responses_received', target: 80, unit: '%' },
      { name: 'Tempo medio risposta', metric: 'avg_response_time', target: 30, unit: 'days' },
    ],
    maturity: 4,
  },
  calcolo_punteggio: {
    id: 'calcolo_punteggio',
    name: 'Calcolo Punteggio',
    description: 'Simulatore calcolo punteggio concorsi pubblici scolastici',
    icon: '🧮',
    route: '/calcolo-punteggio',
    color: 'text-indigo-600',
    version: '1.0.0',
    status: 'active',
    phase: 'maturity',
    targetUsers: ['Docenti', 'Dirigenti'],
    kpis: [
      { name: 'Calcoli/mese', metric: 'monthly_calculations', target: 500, unit: 'calculations' },
      { name: 'Tasso completion', metric: 'completion_rate', target: 90, unit: '%' },
      { name: 'Soddisfazione', metric: 'satisfaction', target: 85, unit: '%' },
    ],
    maturity: 5,
  },
  consulente: {
    id: 'consulente',
    name: 'Consulente Intelligente',
    description: 'AI sindacalista per consulenza personalizzata sul lavoro scolastico',
    icon: '🤖',
    route: '/assistente',
    color: 'text-amber-600',
    version: '2.0.0',
    status: 'active',
    phase: 'growth',
    targetUsers: ['Tutti gli utenti'],
    kpis: [
      { name: 'Conversazioni/mese', metric: 'monthly_conversations', target: 2000, unit: 'conversations' },
      { name: 'Risposte corrette', metric: 'accuracy', target: 90, unit: '%' },
      { name: 'Tempo risposta medio', metric: 'avg_response_time', target: 3, unit: 'seconds' },
    ],
    maturity: 4,
  },
  simulatore_nomine: {
    id: 'simulatore_nomine',
    name: 'Simulatore Nomine',
    description: 'Simulatore nomine direttive con calcolo automatico punteggi',
    icon: '🎯',
    route: '/simulatore-nomine',
    color: 'text-cyan-600',
    version: '1.0.0',
    status: 'active',
    phase: 'growth',
    targetUsers: ['Dirigenti', 'SGM'],
    kpis: [
      { name: 'Simulazioni/mese', metric: 'monthly_simulations', target: 200, unit: 'simulations' },
      { name: 'Tasso completion', metric: 'completion_rate', target: 85, unit: '%' },
    ],
    maturity: 3,
  },
  osservatorio_nomine: {
    id: 'osservatorio_nomine',
    name: 'Osservatorio Nomine',
    description: 'Osservatorio Nazionale delle Nomine scolastiche con analytics avanzati',
    icon: '🏛️',
    route: '/nomine',
    color: 'text-teal-600',
    version: '1.0.0',
    status: 'beta',
    phase: 'development',
    targetUsers: ['Dirigenti', 'Ricercatori', 'Policy maker'],
    kpis: [
      { name: 'Nomine trackate', metric: 'tracked_nominations', target: 1000, unit: 'nominations' },
      { name: 'Regioni coperte', metric: 'regions_covered', target: 21, unit: 'regions' },
    ],
    maturity: 2,
  },
  guida_completa: {
    id: 'guida_completa',
    name: 'Guida Completa',
    description: 'Guida interattiva al sistema scolastico italiano per nuovi assunti',
    icon: '📖',
    route: '/guida',
    color: 'text-orange-600',
    version: '1.0.0',
    status: 'active',
    phase: 'maturity',
    targetUsers: ['Nuovi assunti', 'Docenti', 'ATA'],
    kpis: [
      { name: 'Sezioni completate', metric: 'sections_completed', target: 50, unit: 'sections' },
      { name: 'Tempo medio lettura', metric: 'avg_read_time', target: 15, unit: 'minutes' },
    ],
    maturity: 5,
  },
  bandi: {
    id: 'bandi',
    name: 'Bandi & Concorsi',
    description: 'Raccolta e classificazione bandi e concorsi scolastici nazionali',
    icon: '📢',
    route: '/bandi',
    color: 'text-red-600',
    version: '1.0.0',
    status: 'active',
    phase: 'growth',
    targetUsers: ['Docenti', 'Dirigenti'],
    kpis: [
      { name: 'Bandi attivi', metric: 'active_calls', target: 100, unit: 'bandi' },
      { name: 'Tasso scadenza rispettata', metric: 'deadline_compliance', target: 95, unit: '%' },
    ],
    maturity: 3,
  },
  hub_eventi: {
    id: 'hub_eventi',
    name: 'Hub Eventi',
    description: 'Centro nazionale degli eventi scolastici con ticketing integrato',
    icon: '🎪',
    route: '/eventi',
    color: 'text-emerald-600',
    version: '2.0.0',
    status: 'active',
    phase: 'growth',
    targetUsers: ['Tutti gli utenti', 'Organizzatori'],
    kpis: [
      { name: 'Eventi/mese', metric: 'monthly_events', target: 50, unit: 'events' },
      { name: 'Partecipanti', metric: 'attendees', target: 500, unit: 'people' },
      { name: 'Ticket venduti', metric: 'tickets_sold', target: 200, unit: 'tickets' },
    ],
    maturity: 3,
  },
  gps_calculator: {
    id: 'gps_calculator',
    name: 'GPS Calculator',
    description: 'Calcolatore punteggio GPS/GAE con backfill automatico',
    icon: '📐',
    route: '/gps-calculator',
    color: 'text-violet-600',
    version: '1.0.0',
    status: 'active',
    phase: 'maturity',
    targetUsers: ['Docenti', 'Dirigenti'],
    kpis: [
      { name: 'Calcoli/mese', metric: 'monthly_calculations', target: 300, unit: 'calculations' },
      { name: 'Precisione', metric: 'accuracy', target: 99, unit: '%' },
    ],
    maturity: 5,
  },
  area_riservata: {
    id: 'area_riservata',
    name: 'Area Riservata',
    description: 'Pannello personale con bookmark, scadenze e profilo utente',
    icon: '👤',
    route: '/area-riservata',
    color: 'text-rose-600',
    version: '2.0.0',
    status: 'active',
    phase: 'growth',
    targetUsers: ['Utenti autenticati'],
    kpis: [
      { name: 'Utenti attivi', metric: 'active_users', target: 500, unit: 'users' },
      { name: 'Bookmark medi', metric: 'avg_bookmarks', target: 10, unit: 'bookmarks' },
    ],
    maturity: 4,
  },
};

// ─── Product Contracts (EMA §7) ─────────────────────────────────────────────

export const PRODUCT_CONTRACTS: Record<ProductId, ProductContract> = {
  normativa: {
    id: 'normativa',
    name: 'Normativa & Documenti',
    version: '2.0.0',
    phase: 'growth',
    capabilities: ['document_indexing', 'full_text_search', 'relationship_graph', 'topic_navigation'],
    dataSources: ['monitored_sources', 'documenti_normativi', 'source_documents'],
    eventDeclarations: ['document.published', 'document.updated', 'document.relationship_added'],
    searchConfig: { enabled: true, boost: 1.2, facets: ['tipo', 'ente', 'anno', 'tema'], synonyms: ['circolare', 'norma', 'decreto'] },
    notificationConfig: { enabled: true, channels: ['in_app', 'email'], events: ['document.published', 'document.updated'] },
    lifecycle: { retentionDays: 3650, archiveAfterDays: 1825, autoDeleteAfterDays: 3650, versioningEnabled: true },
  },
  notizie_scadenze: {
    id: 'notizie_scadenze',
    name: 'Notizie & Scadenze',
    version: '2.0.0',
    phase: 'growth',
    capabilities: ['news_classification', 'deadline_extraction', 'data_journalism', 'trend_analysis'],
    dataSources: ['intelligence_news', 'intelligence_scadenze', 'monitored_sources'],
    eventDeclarations: ['news.published', 'scadenza.expiring', 'scadenza.expired'],
    searchConfig: { enabled: true, boost: 1.0, facets: ['categoria', 'regione', 'urgenza'], synonyms: ['notizia', 'news', 'avviso'] },
    notificationConfig: { enabled: true, channels: ['in_app', 'email', 'push'], events: ['news.published', 'scadenza.expiring'] },
    lifecycle: { retentionDays: 730, archiveAfterDays: 365, autoDeleteAfterDays: 730, versioningEnabled: false },
  },
  interpelli: {
    id: 'interpelli',
    name: 'Interpelli',
    version: '2.0.0',
    phase: 'growth',
    capabilities: ['interpello_lifecycle', 'ai_analysis', 'deadline_management', 'knowledge_base'],
    dataSources: ['interpelli_nazionali', 'source_documents'],
    eventDeclarations: ['interpello.created', 'interpello.answered', 'interpello.closed'],
    searchConfig: { enabled: true, boost: 1.1, facets: ['ente', 'stato', 'tema'], synonyms: ['interpello', 'richiesta', 'quesito'] },
    notificationConfig: { enabled: true, channels: ['in_app', 'email'], events: ['interpello.created', 'interpello.answered'] },
    lifecycle: { retentionDays: 1825, archiveAfterDays: 365, autoDeleteAfterDays: 1825, versioningEnabled: false },
  },
  calcolo_punteggio: {
    id: 'calcolo_punteggio',
    name: 'Calcolo Punteggio',
    version: '1.0.0',
    phase: 'maturity',
    capabilities: ['score_calculation', 'formula_engine', 'export_pdf'],
    dataSources: ['normative_references'],
    eventDeclarations: ['calculation.completed', 'calculation.exported'],
    searchConfig: { enabled: false, boost: 0, facets: [], synonyms: [] },
    notificationConfig: { enabled: false, channels: [], events: [] },
    lifecycle: { retentionDays: 365, archiveAfterDays: 180, autoDeleteAfterDays: 365, versioningEnabled: false },
  },
  consulente: {
    id: 'consulente',
    name: 'Consulente Intelligente',
    version: '2.0.0',
    phase: 'growth',
    capabilities: ['ai_chat', 'rag_pipeline', 'knowledge_graph', 'citation_management', 'conversation_history'],
    dataSources: ['knowledge_graph', 'normative_references', 'chat_conversations', 'chat_messages'],
    eventDeclarations: ['chat.message_sent', 'chat.response_generated', 'chat.conversation_started'],
    searchConfig: { enabled: true, boost: 0.8, facets: ['topic'], synonyms: ['assistente', 'chat', 'ai'] },
    notificationConfig: { enabled: true, channels: ['in_app'], events: ['chat.response_generated'] },
    lifecycle: { retentionDays: 365, archiveAfterDays: 90, autoDeleteAfterDays: 365, versioningEnabled: false },
  },
  simulatore_nomine: {
    id: 'simulatore_nomine',
    name: 'Simulatore Nomine',
    version: '1.0.0',
    phase: 'growth',
    capabilities: ['nomina_simulation', 'score_engine', 'pdf_export'],
    dataSources: ['nomine_data', 'normative_references'],
    eventDeclarations: ['simulation.completed', 'simulation.exported'],
    searchConfig: { enabled: false, boost: 0, facets: [], synonyms: [] },
    notificationConfig: { enabled: false, channels: [], events: [] },
    lifecycle: { retentionDays: 365, archiveAfterDays: 180, autoDeleteAfterDays: 365, versioningEnabled: false },
  },
  osservatorio_nomine: {
    id: 'osservatorio_nomine',
    name: 'Osservatorio Nomine',
    version: '1.0.0',
    phase: 'development',
    capabilities: ['nomina_tracking', 'trend_analytics', 'regional_comparison', 'observatory_dashboard'],
    dataSources: ['nomine_data', 'monitored_sources'],
    eventDeclarations: ['nomina.published', 'nomina.updated', 'trend.detected'],
    searchConfig: { enabled: true, boost: 0.9, facets: ['regione', 'anno', 'tipo'], synonyms: ['nomina', 'osservatorio'] },
    notificationConfig: { enabled: true, channels: ['in_app'], events: ['nomina.published'] },
    lifecycle: { retentionDays: 1825, archiveAfterDays: 365, autoDeleteAfterDays: 1825, versioningEnabled: true },
  },
  guida_completa: {
    id: 'guida_completa',
    name: 'Guida Completa',
    version: '1.0.0',
    phase: 'maturity',
    capabilities: ['interactive_guide', 'section_progress', 'search'],
    dataSources: ['guida_content'],
    eventDeclarations: ['guide.section_completed'],
    searchConfig: { enabled: true, boost: 0.7, facets: ['sezione'], synonyms: ['guida', 'manuale', 'handbook'] },
    notificationConfig: { enabled: false, channels: [], events: [] },
    lifecycle: { retentionDays: 3650, archiveAfterDays: 1825, autoDeleteAfterDays: 3650, versioningEnabled: false },
  },
  bandi: {
    id: 'bandi',
    name: 'Bandi & Concorsi',
    version: '1.0.0',
    phase: 'growth',
    capabilities: ['bando_indexing', 'deadline_tracking', 'notification', 'search'],
    dataSources: ['interpelli_nazionali', 'monitored_sources'],
    eventDeclarations: ['bando.published', 'bando.deadline_approaching', 'bando.expired'],
    searchConfig: { enabled: true, boost: 1.0, facets: ['ente', 'tipo', 'scadenza'], synonyms: ['bando', 'concorso', 'selezione'] },
    notificationConfig: { enabled: true, channels: ['in_app', 'email'], events: ['bando.published', 'bando.deadline_approaching'] },
    lifecycle: { retentionDays: 730, archiveAfterDays: 365, autoDeleteAfterDays: 730, versioningEnabled: false },
  },
  hub_eventi: {
    id: 'hub_eventi',
    name: 'Hub Eventi',
    version: '2.0.0',
    phase: 'growth',
    capabilities: ['event_calendar', 'ticketing', 'venue_management', 'recommendation_engine'],
    dataSources: ['event_data', 'venue_data', 'ticket_data'],
    eventDeclarations: ['event.created', 'event.published', 'event.registrations_open', 'event.sold_out'],
    searchConfig: { enabled: true, boost: 1.0, facets: ['tipo', 'luogo', 'data', 'costo'], synonyms: ['evento', 'conferenza', 'corso'] },
    notificationConfig: { enabled: true, channels: ['in_app', 'email', 'push'], events: ['event.created', 'event.registrations_open'] },
    lifecycle: { retentionDays: 365, archiveAfterDays: 90, autoDeleteAfterDays: 365, versioningEnabled: false },
  },
  gps_calculator: {
    id: 'gps_calculator',
    name: 'GPS Calculator',
    version: '1.0.0',
    phase: 'maturity',
    capabilities: ['gps_score_calculation', 'gae_score_calculation', 'backfill_engine'],
    dataSources: ['normative_references'],
    eventDeclarations: ['calculation.completed'],
    searchConfig: { enabled: false, boost: 0, facets: [], synonyms: [] },
    notificationConfig: { enabled: false, channels: [], events: [] },
    lifecycle: { retentionDays: 365, archiveAfterDays: 180, autoDeleteAfterDays: 365, versioningEnabled: false },
  },
  area_riservata: {
    id: 'area_riservata',
    name: 'Area Riservata',
    version: '2.0.0',
    phase: 'growth',
    capabilities: ['bookmark_management', 'deadline_tracking', 'profile_management', 'notification_preferences'],
    dataSources: ['profiles', 'user_bookmarks', 'user_deadlines'],
    eventDeclarations: ['bookmark.added', 'bookmark.removed', 'deadline.created'],
    searchConfig: { enabled: false, boost: 0, facets: [], synonyms: [] },
    notificationConfig: { enabled: true, channels: ['in_app', 'email'], events: ['deadline.created'] },
    lifecycle: { retentionDays: 3650, archiveAfterDays: 365, autoDeleteAfterDays: 3650, versioningEnabled: false },
  },
};

// ─── SuperFeatures (EMA §7) ─────────────────────────────────────────────────

export const SUPER_FEATURES: SuperFeature[] = [
  {
    id: 'intelligence_suite',
    name: 'Intelligence Suite',
    products: ['notizie_scadenze', 'interpelli', 'osservatorio_nomine'],
    description: 'Raccolta intelligente di informazioni scolastiche con AI classification',
    enabled: true,
  },
  {
    id: 'nomine_ecosystem',
    name: 'Nomine Ecosystem',
    products: ['simulatore_nomine', 'osservatorio_nomine'],
    description: 'Ecosistema completo per la gestione e analisi delle nomine scolastiche',
    enabled: true,
  },
  {
    id: 'compliance_hub',
    name: 'Compliance Hub',
    products: ['normativa', 'bandi', 'interpelli'],
    description: 'Centro compliance normativa con tracciamento obblighi e scadenze',
    enabled: true,
  },
  {
    id: 'personal_workspace',
    name: 'Personal Workspace',
    products: ['area_riservata', 'consulente'],
    description: 'Spazio personale con assistente AI e gestione preferenze',
    enabled: true,
  },
];

// ─── Product Registry Functions ──────────────────────────────────────────────

/** Get product by ID */
export function getProduct(id: ProductId): ProductMeta {
  return PRODUCT_REGISTRY[id];
}

/** Get all active products */
export function getActiveProducts(): ProductMeta[] {
  return Object.values(PRODUCT_REGISTRY).filter(p => p.status !== 'deprecated');
}

/** Get products by phase */
export function getProductsByPhase(phase: ProductPhase): ProductMeta[] {
  return Object.values(PRODUCT_REGISTRY).filter(p => p.phase === phase);
}

/** Get product route by ID */
export function getProductRoute(id: ProductId): string {
  return PRODUCT_REGISTRY[id]?.route || '/';
}

/** Get product contract */
export function getProductContract(id: ProductId): ProductContract {
  return PRODUCT_CONTRACTS[id];
}

/** Get products by maturity level */
export function getProductsByMaturity(minLevel: number, maxLevel: number = 5): ProductMeta[] {
  return Object.values(PRODUCT_REGISTRY).filter(p => p.maturity >= minLevel && p.maturity <= maxLevel);
}

/** Get super-features for a product */
export function getSuperFeaturesForProduct(productId: ProductId): SuperFeature[] {
  return SUPER_FEATURES.filter(sf => sf.products.includes(productId) && sf.enabled);
}

/** Calculate product health score */
export function calculateProductScore(productId: ProductId): ProductScore {
  const product = PRODUCT_REGISTRY[productId];
  if (!product) {
    throw new Error(`Product ${productId} not found`);
  }

  const health = product.status === 'active' ? 100 : product.status === 'beta' ? 70 : 20;
  const adoption = Math.min(100, (product.kpis.length / 3) * 80);
  const freshness = product.phase === 'growth' ? 90 : product.phase === 'maturity' ? 70 : product.phase === 'sunset' ? 30 : 50;
  const quality = product.maturity * 20;

  const overall = Math.round(health * 0.3 + adoption * 0.2 + freshness * 0.25 + quality * 0.25);

  return {
    productId,
    health,
    adoption,
    freshness,
    quality,
    overall,
    lastCalculated: new Date().toISOString(),
  };
}

/** Create a canonical item from product-specific data */
export function createCanonicalItem(
  product: ProductId,
  data: {
    id: string;
    title: string;
    description: string;
    category: string;
    tags?: string[];
    publishedAt?: string;
    updatedAt?: string;
    url?: string;
    metadata?: Record<string, unknown>;
  }
): CanonicalItem {
  const productMeta = PRODUCT_REGISTRY[product];
  return {
    id: data.id,
    product,
    title: data.title,
    description: data.description,
    category: data.category,
    tags: data.tags || [],
    publishedAt: data.publishedAt || new Date().toISOString(),
    updatedAt: data.updatedAt || new Date().toISOString(),
    url: data.url || `${productMeta.route}/${data.id}`,
    lineage: createLineage('supabase_query', `product:${product}`, {
      sourceId: data.id,
    }),
    lifecycle: {
      phase: productMeta.phase,
      version: productMeta.version,
    },
    metadata: data.metadata || {},
  };
}

/** Transition product phase with event emission */
export function transitionProductPhase(
  productId: ProductId,
  newPhase: ProductPhase,
  reason?: string
): ProductMeta {
  const product = PRODUCT_REGISTRY[productId];
  if (!product) {
    throw new Error(`Product ${productId} not found`);
  }

  const oldPhase = product.phase;
  product.phase = newPhase;

  eventBus.emit({
    type: 'product.phase_changed',
    productId,
    oldPhase,
    newPhase,
    reason,
    timestamp: new Date().toISOString(),
    lineage: createLineage('product_transition', `product:${productId}`, {
      oldPhase,
      newPhase,
    }),
  } as any);

  return product;
}
