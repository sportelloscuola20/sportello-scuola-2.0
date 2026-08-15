/**
 * ============================================================================
 *  EMA §10 — SOURCE INTELLIGENCE ENGINE
 *  4-layer architecture: Monitoring → Collection → Processing → Distribution
 *  6 components: SourceObserver, ChangeClassifier, SelfHealingConnector,
 *  EventValidator, EventEnricher, PriorityClassifier
 * ============================================================================
 */

import { createLineage, type DataLineageObject } from '../../../foundation/types';
import { eventBus } from '../../../foundation/events';
import { SOURCE_MATRIX, type SourceDefinition } from '../sources';

// ─── Source Intelligence Types ───────────────────────────────────────────────

export type ChangeType = 'new_content' | 'updated' | 'removed' | 'structure_change' | 'metadata_change' | 'none';
export type EventPriority = 'critical' | 'high' | 'medium' | 'low';
export type EventStatus = 'pending' | 'validated' | 'enriched' | 'classified' | 'dispatched' | 'error';
export type SourceHealth = 'healthy' | 'degraded' | 'unhealthy' | 'unknown';

export interface SourceEvent {
  id: string;
  sourceId: string;
  changeType: ChangeType;
  payload: Record<string, unknown>;
  priority: EventPriority;
  status: EventStatus;
  validationErrors: string[];
  enrichmentData: Record<string, unknown>;
  detectedAt: string;
  processedAt?: string;
  lineage: DataLineageObject;
}

export interface SourceHealthStatus {
  sourceId: string;
  health: SourceHealth;
  lastCheck: string;
  lastSuccess?: string;
  consecutiveFailures: number;
  responseTime?: number;
  errorRate: number;
  uptime: number; // percentage
}

export interface MonitoringCycle {
  id: string;
  startedAt: string;
  completedAt?: string;
  sourcesChecked: number;
  eventsDetected: number;
  eventsProcessed: number;
  errors: number;
  lineage: DataLineageObject;
}

// ─── Step 1: Source Observer ─────────────────────────────────────────────────

export class SourceObserver {
  private healthMap = new Map<string, SourceHealthStatus>();

  /** Check health of a single source */
  async checkSource(source: SourceDefinition): Promise<SourceHealthStatus> {
    const existing = this.healthMap.get(source.name);
    const startTime = Date.now();

    try {
      // Simulate health check (in production, would fetch source URL)
      const responseTime = Date.now() - startTime;
      const isHealthy = source.attivo;

      const status: SourceHealthStatus = {
        sourceId: source.name,
        health: isHealthy ? 'healthy' : 'unhealthy',
        lastCheck: new Date().toISOString(),
        lastSuccess: isHealthy ? new Date().toISOString() : existing?.lastSuccess,
        consecutiveFailures: isHealthy ? 0 : (existing?.consecutiveFailures || 0) + 1,
        responseTime,
        errorRate: isHealthy ? 0 : Math.min(1, (existing?.errorRate || 0) + 0.1),
        uptime: isHealthy ? Math.min(100, (existing?.uptime || 90) + 1) : Math.max(0, (existing?.uptime || 90) - 5),
      };

      this.healthMap.set(source.name, status);
      return status;
    } catch (error) {
      const status: SourceHealthStatus = {
        sourceId: source.name,
        health: 'unhealthy',
        lastCheck: new Date().toISOString(),
        lastSuccess: existing?.lastSuccess,
        consecutiveFailures: (existing?.consecutiveFailures || 0) + 1,
        errorRate: Math.min(1, (existing?.errorRate || 0) + 0.2),
        uptime: Math.max(0, (existing?.uptime || 90) - 10),
      };
      this.healthMap.set(source.name, status);
      return status;
    }
  }

  /** Check all active sources */
  async checkAllSources(): Promise<SourceHealthStatus[]> {
    const activeSources = SOURCE_MATRIX.filter(s => s.attivo);
    return Promise.all(activeSources.map(s => this.checkSource(s)));
  }

  /** Get health status for a source */
  getSourceHealth(sourceId: string): SourceHealthStatus | undefined {
    return this.healthMap.get(sourceId);
  }

  /** Get all health statuses */
  getAllHealthStatuses(): SourceHealthStatus[] {
    return Array.from(this.healthMap.values());
  }

  /** Detect changes by comparing current vs cached content */
  async detectChanges(source: SourceDefinition, currentContent: string, cachedContent?: string): Promise<ChangeType> {
    if (!cachedContent) return 'new_content';
    if (currentContent === cachedContent) return 'none';
    if (currentContent.length < cachedContent.length * 0.5) return 'removed';
    if (currentContent.length > cachedContent.length * 1.5) return 'new_content';
    return 'updated';
  }
}

// ─── Step 2: Change Classifier ──────────────────────────────────────────────

export class ChangeClassifier {
  /** Classify a change event based on source type and content */
  classify(source: SourceDefinition, changeType: ChangeType, content?: string): {
    priority: EventPriority;
    category: string;
    requiresAI: boolean;
  } {
    let priority: EventPriority = 'medium';
    let category = 'general';
    let requiresAI = false;

    // Priority based on source authority
    if (source.livello_affidabilita >= 8) priority = 'high';
    if (source.livello_affidabilita >= 9) priority = 'critical';

    // Priority based on change type
    if (changeType === 'new_content') priority = this.escalatePriority(priority);
    if (changeType === 'removed') priority = 'high';

    // Category detection
    if (content) {
      const lowerContent = content.toLowerCase();
      if (lowerContent.includes('decreto') || lowerContent.includes('d.lgs')) {
        category = 'normativa';
        requiresAI = true;
      } else if (lowerContent.includes('concorso') || lowerContent.includes('bando')) {
        category = 'bandi';
        requiresAI = true;
      } else if (lowerContent.includes('scadenza') || lowerContent.includes('termine')) {
        category = 'scadenze';
        requiresAI = true;
      } else if (lowerContent.includes('nomina') || lowerContent.includes('dirigente')) {
        category = 'nomine';
        requiresAI = true;
      }
    }

    // Source-specific overrides
    if (source.categoria === 'Bandi, Concorsi e Selezioni') {
      category = 'bandi';
      priority = this.escalatePriority(priority);
    }
    if (source.categoria === 'Normative, Note e Circolari Ministeriali') {
      category = 'normativa';
      requiresAI = true;
    }

    return { priority, category, requiresAI };
  }

  private escalatePriority(current: EventPriority): EventPriority {
    const escalation: Record<EventPriority, EventPriority> = {
      low: 'medium',
      medium: 'high',
      high: 'critical',
      critical: 'critical',
    };
    return escalation[current];
  }
}

// ─── Step 3: Self-Healing Connector ─────────────────────────────────────────

export class SelfHealingConnector {
  private fallbackStrategies = new Map<string, string[]>();

  constructor() {
    // Define fallback strategies per source type
    this.fallbackStrategies.set('RSS', ['direct_fetch', 'cached_version', 'alternative_source']);
    this.fallbackStrategies.set('HTML', ['css_selector_v2', 'xpath_fallback', 'api_fallback']);
    this.fallbackStrategies.set('API', ['retry_with_backoff', 'alternative_endpoint', 'cached_version']);
  }

  /** Attempt to connect with fallback strategies */
  async connect(source: SourceDefinition): Promise<{
    success: boolean;
    strategy: string;
    data?: string;
    error?: string;
  }> {
    const strategies = this.fallbackStrategies.get(source.tipo) || ['direct_fetch'];

    for (const strategy of strategies) {
      try {
        const result = await this.tryStrategy(source, strategy);
        if (result.success) {
          return { success: true, strategy, data: result.data };
        }
      } catch (error) {
        continue;
      }
    }

    return {
      success: false,
      strategy: 'none',
      error: `All strategies failed for source ${source.name}`,
    };
  }

  private async tryStrategy(source: SourceDefinition, strategy: string): Promise<{ success: boolean; data?: string }> {
    // Simulate strategy execution
    switch (strategy) {
      case 'direct_fetch':
        return { success: source.attivo, data: `Content from ${source.url}` };
      case 'cached_version':
        return { success: true, data: `Cached content for ${source.name}` };
      case 'alternative_source':
        return { success: false };
      case 'retry_with_backoff':
        return { success: source.attivo, data: `Retry content from ${source.url}` };
      default:
        return { success: false };
    }
  }

  /** Get available strategies for a source type */
  getStrategies(sourceType: string): string[] {
    return this.fallbackStrategies.get(sourceType) || ['direct_fetch'];
  }
}

// ─── Step 4: Event Validator ────────────────────────────────────────────────

export class EventValidator {
  /** Validate a source event */
  validate(event: SourceEvent): { valid: boolean; errors: string[] } {
    const errors: string[] = [];

    // Required fields
    if (!event.id) errors.push('Event ID is required');
    if (!event.sourceId) errors.push('Source ID is required');
    if (!event.changeType) errors.push('Change type is required');
    if (!event.detectedAt) errors.push('Detection timestamp is required');

    // Source validation
    const source = SOURCE_MATRIX.find(s => s.name === event.sourceId);
    if (!source) errors.push(`Unknown source: ${event.sourceId}`);

    // Payload validation
    if (!event.payload || Object.keys(event.payload).length === 0) {
      errors.push('Event payload cannot be empty');
    }

    // Priority validation
    const validPriorities: EventPriority[] = ['critical', 'high', 'medium', 'low'];
    if (!validPriorities.includes(event.priority)) {
      errors.push(`Invalid priority: ${event.priority}`);
    }

    return { valid: errors.length === 0, errors };
  }

  /** Batch validate events */
  batchValidate(events: SourceEvent[]): { valid: SourceEvent[]; invalid: { event: SourceEvent; errors: string[] }[] } {
    const valid: SourceEvent[] = [];
    const invalid: { event: SourceEvent; errors: string[] }[] = [];

    for (const event of events) {
      const result = this.validate(event);
      if (result.valid) {
        valid.push({ ...event, status: 'validated' });
      } else {
        invalid.push({ event, errors: result.errors });
      }
    }

    return { valid, invalid };
  }
}

// ─── Step 5: Event Enricher ─────────────────────────────────────────────────

export class EventEnricher {
  /** Enrich a source event with additional context */
  enrich(event: SourceEvent): SourceEvent {
    const source = SOURCE_MATRIX.find(s => s.name === event.sourceId);
    if (!source) return event;

    const enrichmentData: Record<string, unknown> = {
      sourceAuthority: source.livello_affidabilita,
      sourceCategory: source.categoria,
      sourceEnte: source.nome_ente,
      sourceType: source.tipo,
      regione: source.regione,
      isNational: source.regione === 'Nazionale',
      enrichedAt: new Date().toISOString(),
    };

    // Add content-based enrichment
    if (event.payload.content) {
      const content = String(event.payload.content).toLowerCase();
      enrichmentData.containsKeywords = this.extractKeywords(content);
      enrichmentData.sentiment = this.estimateSentiment(content);
      enrichmentData.urgency = this.estimateUrgency(content);
    }

    return {
      ...event,
      enrichmentData,
      status: 'enriched',
      lineage: createLineage('event_enrichment', `source:${event.sourceId}`, {
        originalEventId: event.id,
        enrichmentFields: Object.keys(enrichmentData),
      }),
    };
  }

  private extractKeywords(content: string): string[] {
    const keywords: string[] = [];
    const importantTerms = ['decreto', 'concorso', 'bando', 'scadenza', 'nomina', 'assegnazione', 'mobilità', 'gps', 'graduatoria'];
    for (const term of importantTerms) {
      if (content.includes(term)) keywords.push(term);
    }
    return keywords;
  }

  private estimateSentiment(content: string): string {
    const positiveTerms = ['approvato', 'pubblicato', 'disponibile', 'aperto'];
    const negativeTerms = ['annullato', 'sospeso', 'respinto', 'scaduto'];
    const posCount = positiveTerms.filter(t => content.includes(t)).length;
    const negCount = negativeTerms.filter(t => content.includes(t)).length;
    if (posCount > negCount) return 'positive';
    if (negCount > posCount) return 'negative';
    return 'neutral';
  }

  private estimateUrgency(content: string): string {
    const urgentTerms = ['urgente', 'immediato', 'entro', 'scadenza', 'termine'];
    const urgentCount = urgentTerms.filter(t => content.includes(t)).length;
    if (urgentCount >= 2) return 'high';
    if (urgentCount >= 1) return 'medium';
    return 'low';
  }
}

// ─── Step 6: Priority Classifier ────────────────────────────────────────────

export class PriorityClassifier {
  /** Classify event priority based on multiple signals */
  classify(event: SourceEvent, source: SourceDefinition): EventPriority {
    let score = 0;

    // Authority score (0-3)
    score += Math.min(3, source.livello_affidabilita / 3);

    // Change type score (0-2)
    const changeScores: Record<ChangeType, number> = {
      new_content: 2,
      updated: 1,
      structure_change: 2,
      metadata_change: 0.5,
      removed: 1.5,
      none: 0,
    };
    score += changeScores[event.changeType] || 0;

    // Content urgency score (0-2)
    const urgency = event.enrichmentData.urgency;
    if (urgency === 'high') score += 2;
    else if (urgency === 'medium') score += 1;

    // Category score (0-2)
    const category = event.enrichmentData.sourceCategory;
    if (category === 'Bandi, Concorsi e Selezioni') score += 2;
    else if (category === 'Normative, Note e Circolari Ministeriali') score += 1.5;

    // Convert to priority
    if (score >= 7) return 'critical';
    if (score >= 5) return 'high';
    if (score >= 3) return 'medium';
    return 'low';
  }
}

// ─── Monitoring Cycle ───────────────────────────────────────────────────────

export async function runMonitoringCycle(): Promise<MonitoringCycle> {
  const cycleId = `cycle_${Date.now()}`;
  const startedAt = new Date().toISOString();

  const observer = new SourceObserver();
  const classifier = new ChangeClassifier();
  const connector = new SelfHealingConnector();
  const validator = new EventValidator();
  const enricher = new EventEnricher();
  const priorityClassifier = new PriorityClassifier();

  const events: SourceEvent[] = [];
  let errors = 0;

  const activeSources = SOURCE_MATRIX.filter(s => s.attivo);

  for (const source of activeSources) {
    try {
      // Step 1: Check source
      const health = await observer.checkSource(source);
      if (health.health === 'unhealthy') {
        // Step 3: Try self-healing
        const healing = await connector.connect(source);
        if (!healing.success) {
          errors++;
          continue;
        }
      }

      // Step 2: Detect and classify changes
      const changeType = await observer.detectChanges(source, `New content from ${source.name}`);
      if (changeType === 'none') continue;

      const classification = classifier.classify(source, changeType, `Content from ${source.name}`);

      // Create event
      const event: SourceEvent = {
        id: `evt_${source.name}_${Date.now()}`,
        sourceId: source.name,
        changeType,
        payload: { content: `Content from ${source.name}`, url: source.url },
        priority: classification.priority,
        status: 'pending',
        validationErrors: [],
        enrichmentData: {},
        detectedAt: new Date().toISOString(),
        lineage: createLineage('monitoring_cycle', `source:${source.name}`, {
          changeType,
          priority: classification.priority,
        }),
      };

      // Step 4: Validate
      const validation = validator.validate(event);
      if (!validation.valid) {
        event.validationErrors = validation.errors;
        errors++;
        continue;
      }
      event.status = 'validated';

      // Step 5: Enrich
      const enriched = enricher.enrich(event);

      // Step 6: Classify priority
      enriched.priority = priorityClassifier.classify(enriched, source);
      enriched.status = 'classified';

      events.push(enriched);
    } catch (error) {
      errors++;
    }
  }

  const completedAt = new Date().toISOString();

  // Emit batch event
  eventBus.emit({
    type: 'monitoring.cycle_completed',
    cycleId,
    sourcesChecked: activeSources.length,
    eventsDetected: events.length,
    errors,
    startedAt,
    completedAt,
    lineage: createLineage('monitoring_cycle', cycleId, {
      sourcesChecked: activeSources.length,
      eventsDetected: events.length,
      errors,
    }),
  } as any);

  return {
    id: cycleId,
    startedAt,
    completedAt,
    sourcesChecked: activeSources.length,
    eventsDetected: events.length,
    eventsProcessed: events.filter(e => e.status === 'classified').length,
    errors,
    lineage: createLineage('monitoring_cycle', cycleId, {
      sourcesChecked: activeSources.length,
      eventsDetected: events.length,
      errors,
    }),
  };
}

// ─── Convenience Exports ────────────────────────────────────────────────────

export const sourceObserver = new SourceObserver();
export const changeClassifier = new ChangeClassifier();
export const selfHealingConnector = new SelfHealingConnector();
export const eventValidator = new EventValidator();
export const eventEnricher = new EventEnricher();
export const priorityClassifier = new PriorityClassifier();
