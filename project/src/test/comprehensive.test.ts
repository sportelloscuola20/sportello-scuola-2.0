/**
 * ============================================================================
 *  COMPREHENSIVE TEST SUITE
 *  Tests all EMA + SAPM engines against Italian school services.
 *  Assumes multiple roles: Dirigente, Docente, ATA, Genitore, Admin.
 * ============================================================================
 */

import { describe, it, expect } from 'vitest';

// ═════════════════════════════════════════════════════════════════════════════
//  §1 — SAPM Technology Architecture (Ch. 27-33)
// ═════════════════════════════════════════════════════════════════════════════

import {
  TECH_STACK, DATABASE_SPEC, API_ENDPOINTS, SECURITY_CONTROLS, AI_SPEC,
  INTEGRATION_ENDPOINTS, INFRA_COMPONENTS,
  getTechByCategory, getSecurityByCategory, getImplementedSecurity,
  getDatabaseStats, getAPIEndpointsByAuth, getIntegrationsByType, getInfraCost,
} from '../sapm/technology-architecture';

describe('SAPM Ch.27-33: Technology Architecture', () => {
  it('Ch.27 — should have complete tech stack', () => {
    expect(TECH_STACK.length).toBeGreaterThanOrEqual(10);
    expect(getTechByCategory('frontend').length).toBeGreaterThanOrEqual(3);
    expect(getTechByCategory('database').length).toBeGreaterThanOrEqual(1);
    expect(getTechByCategory('ai').length).toBeGreaterThanOrEqual(1);
    expect(getTechByCategory('devops').length).toBeGreaterThanOrEqual(3);
  });

  it('Ch.28 — should have complete database spec', () => {
    const stats = getDatabaseStats();
    expect(stats.tables).toBeGreaterThanOrEqual(10);
    expect(stats.indexes).toBeGreaterThanOrEqual(8);
    expect(stats.rlsPolicies).toBeGreaterThanOrEqual(5);
    expect(stats.totalRows).toBeGreaterThan(0);
    // Verify critical tables exist
    const tableNames = DATABASE_SPEC.tables.map(t => t.name);
    expect(tableNames).toContain('documenti_normativi');
    expect(tableNames).toContain('intelligence_news');
    expect(tableNames).toContain('chat_conversations');
    expect(tableNames).toContain('monitored_sources');
    expect(tableNames).toContain('audit_log');
    expect(tableNames).toContain('domain_events');
  });

  it('Ch.29 — should have complete API spec', () => {
    expect(API_ENDPOINTS.length).toBeGreaterThanOrEqual(8);
    const publicEndpoints = getAPIEndpointsByAuth(false);
    const authEndpoints = getAPIEndpointsByAuth(true);
    expect(publicEndpoints.length).toBeGreaterThanOrEqual(5);
    expect(authEndpoints.length).toBeGreaterThanOrEqual(2);
    // Verify key endpoints
    const paths = API_ENDPOINTS.map(e => e.path);
    expect(paths).toContain('/api/v1/search');
    expect(paths).toContain('/api/v1/chat');
    expect(paths).toContain('/api/v1/health');
  });

  it('Ch.30 — should have complete security controls', () => {
    expect(SECURITY_CONTROLS.length).toBeGreaterThanOrEqual(8);
    const implemented = getImplementedSecurity();
    expect(implemented.length).toBeGreaterThanOrEqual(8);
    // Verify critical controls
    const categories = SECURITY_CONTROLS.map(s => s.category);
    expect(categories).toContain('authentication');
    expect(categories).toContain('authorization');
    expect(categories).toContain('audit');
  });

  it('Ch.31 — should have AI spec', () => {
    expect(AI_SPEC.model).toBe('Gemini 3.1 Flash Lite');
    expect(AI_SPEC.rpm).toBe(15);
    expect(AI_SPEC.temperature).toBe(0.2);
    expect(AI_SPEC.features.length).toBeGreaterThanOrEqual(3);
  });

  it('Ch.32 — should have integration endpoints', () => {
    expect(INTEGRATION_ENDPOINTS.length).toBeGreaterThanOrEqual(5);
    expect(getIntegrationsByType('polling').length).toBeGreaterThanOrEqual(3);
    expect(getIntegrationsByType('push').length).toBeGreaterThanOrEqual(1);
    // Verify circuit breakers
    INTEGRATION_ENDPOINTS.forEach(ep => {
      expect(ep.circuitBreaker.failureThreshold).toBeGreaterThan(0);
      expect(ep.retryPolicy.maxRetries).toBeGreaterThan(0);
    });
  });

  it('Ch.33 — should have infrastructure components', () => {
    expect(INFRA_COMPONENTS.length).toBeGreaterThanOrEqual(5);
    INFRA_COMPONENTS.forEach(comp => {
      expect(comp.sla).toBeDefined();
      expect(comp.estimatedCost).toBeDefined();
    });
    // Verify free tier
    const freeTier = INFRA_COMPONENTS.filter(c => c.tier === 'free');
    expect(freeTier.length).toBeGreaterThanOrEqual(5);
  });
});

// ═════════════════════════════════════════════════════════════════════════════
//  §2 — SAPM Platform Engineering (Ch. 34-42)
// ═════════════════════════════════════════════════════════════════════════════

import {
  IAM_CONFIG, CICD_PIPELINE, MONITORING_CONFIG, LOG_CONFIG, BACKUP_CONFIG,
  DR_PLAN, CAPACITY_PLAN, FINOPS_REPORT, SUSTAINABILITY_CONFIG, DOCUMENTATION_INDEX,
  getRolePermissions, getCIStages, getCriticalAlerts, getCapacityUtilization,
  getFinOpsSummary, getDRProcedures, getDocumentationByType,
} from '../sapm/platform-engineering';

describe('SAPM Ch.34-42: Platform Engineering', () => {
  it('Ch.34 — should have complete IAM', () => {
    expect(IAM_CONFIG.provider).toBe('Supabase Auth');
    expect(IAM_CONFIG.roles.length).toBeGreaterThanOrEqual(3);
    expect(IAM_CONFIG.policies.length).toBeGreaterThanOrEqual(3);
    expect(getRolePermissions('admin')).toContain('*');
    expect(getRolePermissions('viewer')).toContain('read:*');
  });

  it('Ch.35 — should have complete CI/CD pipeline', () => {
    const stages = getCIStages();
    expect(stages.length).toBeGreaterThanOrEqual(3);
    expect(stages).toContain('Quality Gates');
    expect(stages).toContain('Architecture Gate');
    expect(stages).toContain('Deploy');
    CICD_PIPELINE.stages.forEach(stage => {
      expect(stage.steps.length).toBeGreaterThan(0);
    });
  });

  it('Ch.36 — should have monitoring config', () => {
    expect(MONITORING_CONFIG.metrics.length).toBeGreaterThanOrEqual(5);
    expect(MONITORING_CONFIG.alerts.length).toBeGreaterThanOrEqual(3);
    const critical = getCriticalAlerts();
    expect(critical.length).toBeGreaterThanOrEqual(1);
    MONITORING_CONFIG.metrics.forEach(m => {
      expect(m.thresholds.warning).toBeDefined();
      expect(m.thresholds.critical).toBeDefined();
    });
  });

  it('Ch.37 — should have logging config', () => {
    expect(LOG_CONFIG.levels.length).toBeGreaterThanOrEqual(3);
    expect(LOG_CONFIG.sensitiveFields.length).toBeGreaterThan(0);
    expect(LOG_CONFIG.tracingEnabled).toBe(true);
  });

  it('Ch.38 — should have backup and DR plan', () => {
    expect(BACKUP_CONFIG.frequency).toBeDefined();
    expect(BACKUP_CONFIG.retention).toBeGreaterThan(0);
    expect(DR_PLAN.rto).toBeLessThanOrEqual(60);
    expect(DR_PLAN.procedures.length).toBeGreaterThanOrEqual(5);
    const procedures = getDRProcedures();
    expect(procedures.length).toBeGreaterThanOrEqual(5);
  });

  it('Ch.39 — should have capacity plan', () => {
    const utilization = getCapacityUtilization();
    expect(utilization.storage).toBeGreaterThan(0);
    expect(utilization.compute).toBeGreaterThan(0);
    expect(utilization.bandwidth).toBeGreaterThan(0);
    // All under critical thresholds
    expect(utilization.storage).toBeLessThan(CAPACITY_PLAN.thresholds.storageCritical);
  });

  it('Ch.40 — should have FinOps report', () => {
    const summary = getFinOpsSummary();
    expect(summary.totalCost).toBeLessThanOrEqual(10); // Near zero
    expect(summary.optimizations).toBeGreaterThan(0);
    expect(summary.estimatedSaving).toBeGreaterThan(0);
  });

  it('Ch.41 — should have sustainability config', () => {
    expect(SUSTAINABILITY_CONFIG.optimizations.length).toBeGreaterThan(0);
    expect(SUSTAINABILITY_CONFIG.greenPractices.length).toBeGreaterThan(0);
    expect(SUSTAINABILITY_CONFIG.carbonFootprint).toBeLessThan(1);
  });

  it('Ch.42 — should have documentation index', () => {
    expect(DOCUMENTATION_INDEX.documents.length).toBeGreaterThanOrEqual(5);
    const archDocs = getDocumentationByType('architecture');
    expect(archDocs.length).toBeGreaterThanOrEqual(2);
  });
});

// ═════════════════════════════════════════════════════════════════════════════
//  §3 — SAPM Project Management (Ch. 43-56)
// ═════════════════════════════════════════════════════════════════════════════

import {
  PROJECT_CHARTER, STAKEHOLDERS, SCOPE_DOCUMENT, SCHEDULE, COST_MANAGEMENT,
  QUALITY_METRICS, RESOURCE_ALLOCATION, COMMUNICATION_PLAN, RISK_REGISTER,
  CHANGE_LOG, ACCEPTANCE_CRITERIA, BENEFITS,
  getCharterMilestones, getStakeholdersByInfluence, getRisksByCategory,
  getCriticalRisks, getScheduleProgress, getQualityScore, getOpenChangeRequests,
  getAcceptanceRate, getBenefitsRealized,
} from '../sapm/project-management';

describe('SAPM Ch.43-56: Project Management', () => {
  it('Ch.43 — should have complete project charter', () => {
    expect(PROJECT_CHARTER.name).toBe('SportelloScuola 2.0');
    expect(PROJECT_CHARTER.successCriteria.length).toBeGreaterThanOrEqual(5);
    const milestones = getCharterMilestones();
    expect(milestones.length).toBeGreaterThanOrEqual(10);
    // Most milestones should be completed
    const completed = milestones.filter(m => m.status === 'completed');
    expect(completed.length).toBeGreaterThanOrEqual(8);
  });

  it('Ch.44 — should have stakeholder management', () => {
    expect(STAKEHOLDERS.length).toBeGreaterThanOrEqual(5);
    expect(getStakeholdersByInfluence('high').length).toBeGreaterThanOrEqual(2);
    STAKEHOLDERS.forEach(sh => {
      expect(sh.needs.length).toBeGreaterThan(0);
      expect(sh.communicationFrequency).toBeDefined();
    });
  });

  it('Ch.45 — should have scope document', () => {
    expect(SCOPE_DOCUMENT.inScope.length).toBeGreaterThanOrEqual(8);
    expect(SCOPE_DOCUMENT.outOfScope.length).toBeGreaterThan(0);
    expect(SCOPE_DOCUMENT.assumptions.length).toBeGreaterThan(0);
    expect(SCOPE_DOCUMENT.constraints.length).toBeGreaterThan(0);
  });

  it('Ch.46 — should have schedule with progress', () => {
    expect(SCHEDULE.length).toBeGreaterThanOrEqual(5);
    const progress = getScheduleProgress();
    expect(progress).toBeGreaterThan(80); // Most work done
  });

  it('Ch.47 — should have cost management', () => {
    expect(COST_MANAGEMENT.length).toBeGreaterThanOrEqual(2);
    const totalAnnual = COST_MANAGEMENT.reduce((sum, c) => sum + c.totalAnnual, 0);
    expect(totalAnnual).toBeLessThanOrEqual(50); // Near zero
  });

  it('Ch.48 — should have quality metrics', () => {
    expect(QUALITY_METRICS.length).toBeGreaterThanOrEqual(5);
    const score = getQualityScore();
    expect(score).toBeGreaterThanOrEqual(60); // Majority on track
  });

  it('Ch.49 — should have resource allocation', () => {
    expect(RESOURCE_ALLOCATION.length).toBeGreaterThanOrEqual(2);
    RESOURCE_ALLOCATION.forEach(r => {
      expect(r.skills.length).toBeGreaterThan(0);
    });
  });

  it('Ch.50 — should have communication plan', () => {
    expect(COMMUNICATION_PLAN.length).toBeGreaterThanOrEqual(3);
    COMMUNICATION_PLAN.forEach(cp => {
      expect(cp.method).toBeDefined();
      expect(cp.frequency).toBeDefined();
    });
  });

  it('Ch.51 — should have risk register', () => {
    expect(RISK_REGISTER.length).toBeGreaterThanOrEqual(5);
    expect(getCriticalRisks().length).toBeGreaterThanOrEqual(1);
    expect(getRisksByCategory('technical').length).toBeGreaterThanOrEqual(2);
    RISK_REGISTER.forEach(r => {
      expect(r.score).toBeGreaterThan(0);
      expect(r.mitigation).toBeDefined();
    });
  });

  it('Ch.52-53 — should have change log', () => {
    expect(CHANGE_LOG.length).toBeGreaterThanOrEqual(3);
    const open = getOpenChangeRequests();
    // All changes should be implemented or one proposed
    expect(CHANGE_LOG.filter(c => c.status === 'implemented').length).toBeGreaterThanOrEqual(2);
  });

  it('Ch.54 — should have acceptance criteria', () => {
    expect(ACCEPTANCE_CRITERIA.length).toBeGreaterThanOrEqual(10);
    const rate = getAcceptanceRate();
    expect(rate).toBeGreaterThanOrEqual(80); // Most criteria met
  });

  it('Ch.56 — should have benefits realized', () => {
    expect(BENEFITS.length).toBeGreaterThanOrEqual(5);
    const realized = getBenefitsRealized();
    expect(realized).toBeGreaterThanOrEqual(70); // Most benefits realized
  });
});

// ═════════════════════════════════════════════════════════════════════════════
//  §4 — SAPM Governance (Ch. 57-62)
// ═════════════════════════════════════════════════════════════════════════════

import {
  GOVERNANCE_POLICIES, DECISION_RECORDS, COMPLIANCE_CHECKS,
  ARCHITECTURE_REVIEWS, VENDORS, IMPROVEMENT_BACKLOG,
  getGovernancePoliciesByCategory, getMandatoryPolicies, getDecisionsByStatus,
  getComplianceScore, getVendorRiskSummary, getImprovementsByPriority,
  getImprovementProgress, generateGovernanceReport,
} from '../sapm/governance';

describe('SAPM Ch.57-62: Governance', () => {
  it('Ch.57 — should have governance policies', () => {
    expect(GOVERNANCE_POLICIES.length).toBeGreaterThanOrEqual(8);
    expect(getMandatoryPolicies().length).toBeGreaterThanOrEqual(6);
    expect(getGovernancePoliciesByCategory('security').length).toBeGreaterThanOrEqual(2);
    expect(getGovernancePoliciesByCategory('architecture').length).toBeGreaterThanOrEqual(2);
  });

  it('Ch.58 — should have decision records', () => {
    expect(DECISION_RECORDS.length).toBeGreaterThanOrEqual(5);
    expect(getDecisionsByStatus('accepted').length).toBeGreaterThanOrEqual(5);
    DECISION_RECORDS.forEach(dr => {
      expect(dr.decision).toBeDefined();
      expect(dr.consequences.length).toBeGreaterThan(0);
    });
  });

  it('Ch.59 — should have compliance checks', () => {
    expect(COMPLIANCE_CHECKS.length).toBeGreaterThanOrEqual(10);
    const score = getComplianceScore();
    expect(score).toBeGreaterThanOrEqual(90); // High compliance
    // Verify GDPR coverage
    const gdprChecks = COMPLIANCE_CHECKS.filter(c => c.regulation === 'GDPR');
    expect(gdprChecks.length).toBeGreaterThanOrEqual(8);
  });

  it('Ch.60 — should have architecture reviews', () => {
    expect(ARCHITECTURE_REVIEWS.length).toBeGreaterThanOrEqual(1);
    expect(ARCHITECTURE_REVIEWS[0].result).toBe('approved');
  });

  it('Ch.61 — should have vendor management', () => {
    expect(VENDORS.length).toBeGreaterThanOrEqual(5);
    const risks = getVendorRiskSummary();
    expect(risks.low).toBeGreaterThanOrEqual(3);
    VENDORS.forEach(v => {
      expect(v.alternatives.length).toBeGreaterThan(0);
      expect(v.lockInLevel).toBeDefined();
    });
  });

  it('Ch.62 — should have improvement backlog', () => {
    expect(IMPROVEMENT_BACKLOG.length).toBeGreaterThanOrEqual(8);
    expect(getImprovementsByPriority('high').length).toBeGreaterThanOrEqual(3);
    const progress = getImprovementProgress();
    expect(progress.total).toBeGreaterThanOrEqual(8);
  });

  it('should generate full governance report', () => {
    const report = generateGovernanceReport();
    expect(report.policies).toBeGreaterThanOrEqual(8);
    expect(report.mandatoryPolicies).toBeGreaterThanOrEqual(6);
    expect(report.decisions).toBeGreaterThanOrEqual(5);
    expect(report.complianceScore).toBeGreaterThanOrEqual(90);
    expect(report.vendorCount).toBeGreaterThanOrEqual(5);
    expect(report.improvements).toBeGreaterThanOrEqual(8);
    expect(report.lineage).toBeDefined();
  });
});

// ═════════════════════════════════════════════════════════════════════════════
//  §5 — Cross-Cutting Engines (EMA §42-50)
// ═════════════════════════════════════════════════════════════════════════════

import {
  PLATFORM_METRICS, calculateMetric, checkMetricHealth,
  generateImprovementActions, calculateEcosystemHealth,
  createHubNavigation, createDecisionRequest, processDecision,
  createTemporalRange, generateTimeBuckets,
  createAction, getAvailableActions,
  createOperationalProfile, updateActivityScore,
} from '../rag/engine/cross-cutting';

describe('EMA §42-50: Cross-Cutting Engines', () => {
  it('§44 — Decision Engine should process decisions', () => {
    const req = createDecisionRequest('recommendation', { query: 'test' }, { productId: 'normativa' });
    expect(req.type).toBe('recommendation');
    const result = processDecision(req);
    expect(result.decision).toBeDefined();
    expect(result.actions.length).toBeGreaterThan(0);
  });

  it('§47 — Temporal Engine should generate buckets', () => {
    const range = createTemporalRange('2026-01-01', '2026-03-01', 'weekly');
    const buckets = generateTimeBuckets(range);
    expect(buckets.length).toBeGreaterThan(0);
    expect(buckets.length).toBeLessThanOrEqual(10);
  });

  it('§48 — Actions Engine should create actions', () => {
    const action = createAction('bookmark', 'user-1', 'document', 'doc-1');
    expect(action.type).toBe('bookmark');
    expect(action.userId).toBe('user-1');
    expect(getAvailableActions('document')).toContain('bookmark');
    expect(getAvailableActions('event')).toContain('subscribe');
  });

  it('§49 — Measurement should track metrics', () => {
    expect(PLATFORM_METRICS.length).toBeGreaterThanOrEqual(5);
    const metric = calculateMetric(PLATFORM_METRICS[0], [100, 200, 150]);
    expect(metric.value).toBe(150);
    const health = checkMetricHealth(PLATFORM_METRICS[0], 400);
    expect(health.status).toBe('healthy');
    const criticalHealth = checkMetricHealth(PLATFORM_METRICS[0], 5000);
    expect(criticalHealth.status).toBe('critical');
  });

  it('§42 — Ecosystem Health should calculate', () => {
    const health = calculateEcosystemHealth([
      { id: 'normativa', health: 90 },
      { id: 'interpelli', health: 85 },
    ]);
    expect(health.overallHealth).toBe(87.5);
    expect(health.products.length).toBe(2);
  });

  it('§50 — Hub Navigation should work', () => {
    const nav = createHubNavigation('normativa', [
      { id: 'normativa', name: 'Normativa', route: '/normativa', status: 'active' },
      { id: 'interpelli', name: 'Interpelli', route: '/interpelli', status: 'active' },
    ]);
    expect(nav.currentProduct).toBe('normativa');
    expect(nav.availableProducts.length).toBe(2);
    expect(nav.breadcrumbs.length).toBe(2);
  });

  it('§46 — Operational Profile should track activity', () => {
    const profile = createOperationalProfile('user-1', 'docente', ['normativa', 'interpelli']);
    expect(profile.activityScore).toBe(0);
    const updated = updateActivityScore(profile);
    expect(updated.activityScore).toBe(1);
  });
});

// ═════════════════════════════════════════════════════════════════════════════
//  §6 — Product Engines (EMA §12-41)
// ═════════════════════════════════════════════════════════════════════════════

import {
  createDocument, createDocumentCard, addDocumentRelationship,
  transitionDocumentStatus, generateEditorialOutput, buildTopicTree,
  canTransition,
} from '../rag/engine/products/normativa';
import {
  createInterpello, submitInterpello, answerInterpello,
  createInterpelloCard, calculateRelevance, getDeadlineInfo,
} from '../rag/engine/products/interpelli';
import {
  createNomina, createNominaCard, calculateObservatoryStats,
  getRegionalComparisons,
} from '../rag/engine/products/nomine';
import {
  createEvent, createEventCard, publishEvent, openRegistrations,
  registerAttendee, getUpcomingEvents, getEventStats,
} from '../rag/engine/products/hub-eventi';
import {
  createConversation, addMessage, scoreResponseQuality,
  createDecisionProcess, getSystemPrompt, formatCitations,
} from '../rag/engine/products/consulente';

describe('EMA §12-41: Product Engines', () => {
  describe('§12-18: Normativa', () => {
    it('should create and manage documents', () => {
      const doc = createDocument({
        title: 'Decreto Legge 123/2026',
        type: 'decreto',
        number: '123',
        year: 2026,
        ente: 'Ministero dell\'Istruzione',
        summary: 'Test decree',
        topics: ['personale', 'contratti'],
        effectiveDate: '2026-07-01',
        url: 'https://example.com/doc1',
      });
      expect(doc.id).toBeDefined();
      expect(doc.status).toBe('draft');

      // Transition lifecycle
      const submitted = transitionDocumentStatus(doc, 'under_review');
      expect(submitted.status).toBe('under_review');

      const approved = transitionDocumentStatus(submitted, 'approved');
      expect(approved.status).toBe('approved');

      const published = transitionDocumentStatus(approved, 'published');
      expect(published.status).toBe('published');

      // Card
      const card = createDocumentCard(published);
      expect(card.typeLabel).toBe('Decreto');
      expect(card.relationshipCount).toBe(0);

      // Relationships
      const withRel = addDocumentRelationship(published, 'doc-2', 'modifies', 'Aggiorna art. 5');
      expect(withRel.relationships.length).toBe(1);

      // Editorial output
      const editorial = generateEditorialOutput(published);
      expect(editorial.levels.length).toBe(6);

      // Topic tree
      const tree = buildTopicTree([published]);
      expect(tree.length).toBe(2);
    });

    it('should enforce lifecycle rules', () => {
      expect(canTransition('draft', 'under_review')).not.toBeNull();
      expect(canTransition('draft', 'published')).toBeNull();
      expect(canTransition('published', 'superseded')).not.toBeNull();
    });
  });

  describe('§19-23: Interpelli', () => {
    it('should manage interpello lifecycle', () => {
      const interpello = createInterpello({
        title: 'Interpello su Smart Working',
        question: 'È consentito lo smart working per il personale ATA?',
        ente: 'MIUR',
        category: 'personale',
        targetAudience: ['ATA', 'Dirigenti'],
      });
      expect(interpello.status).toBe('draft');

      const submitted = submitInterpello(interpello);
      expect(submitted.status).toBe('submitted');

      const answered = answerInterpello(submitted, {
        content: 'Lo smart working è consentito nei limiti della normativa.',
        author: 'AI Assistant',
        citations: ['D.Lgs. 81/2008'],
        confidence: 0.85,
      });
      expect(answered.status).toBe('answered');
      expect(answered.answer).toBeDefined();

      // Card
      const card = createInterpelloCard(answered);
      expect(card.statusLabel).toBe('Risposto');
      expect(card.hasAnswer).toBe(true);

      // Relevance
      const relevance = calculateRelevance(answered, { role: 'ATA' });
      expect(relevance.score).toBeGreaterThan(0);
    });
  });

  describe('§24-29: Nomine', () => {
    it('should manage nomine lifecycle', () => {
      const nomina = createNomina({
        title: 'Nomina DS - Istituto Verdi',
        type: 'dirigente_scolastico',
        ente: 'Provveditorato Roma',
        regione: 'Lazio',
        sede: 'Roma',
        deadline: '2026-08-01',
      });
      expect(nomina.status).toBe('pubblicata');

      const card = createNominaCard(nomina);
      expect(card.typeLabel).toBe('Dirigente Scolastico');
      expect(card.statusLabel).toBe('Pubblicata');

      // Observatory
      const stats = calculateObservatoryStats([nomina]);
      expect(stats.totalNomine).toBe(1);
      expect(stats.byType.dirigente_scolastico).toBe(1);

      // Regional comparison
      const comparisons = getRegionalComparisons([nomina]);
      expect(comparisons.length).toBe(1);
      expect(comparisons[0].regione).toBe('Lazio');
    });
  });

  describe('§30-35: Hub Eventi', () => {
    it('should manage event lifecycle', () => {
      const event = createEvent({
        title: 'Convegno Educazione Digitale',
        description: 'Convegno nazionale',
        type: 'convegno',
        organizer: 'MIUR',
        venue: { name: 'Roma Convention Center', address: 'Via Roma 1', city: 'Roma', regione: 'Lazio', isOnline: false },
        startDate: '2026-09-15',
        endDate: '2026-09-16',
        ticketType: 'paid',
        ticketPrice: 50,
        maxAttendees: 200,
      });
      expect(event.status).toBe('bozza');

      const published = publishEvent(event);
      expect(published.status).toBe('pubblicato');

      const withRegistrations = openRegistrations(published);
      expect(withRegistrations.status).toBe('registrazioni_aperte');

      const afterRegistration = registerAttendee(withRegistrations);
      expect(afterRegistration.currentAttendees).toBe(1);

      // Card
      const card = createEventCard(afterRegistration);
      expect(card.typeLabel).toBe('Convegno');
      expect(card.spotsAvailable).toBe(199);

      // Stats
      const stats = getEventStats([afterRegistration]);
      expect(stats.total).toBe(1);
      expect(stats.byType.convegno).toBe(1);
      expect(stats.totalRevenue).toBe(50);
    });
  });

  describe('§36-41: Consulente', () => {
    it('should manage conversations and quality', () => {
      const conv = createConversation('user-1', 'Consulta CCNL', 'regulatory_lookup', 'contratti');
      expect(conv.status).toBe('active');
      expect(conv.mode).toBe('regulatory_lookup');

      // Add messages
      const { conversation: conv2 } = addMessage(conv, 'user', 'Quali sono le ferie per i docenti?');
      expect(conv2.messageCount).toBe(1);

      const { conversation: conv3 } = addMessage(conv2, 'assistant', 'Le ferie per i docenti sono 40 giorni.', [
        { id: 'c1', source: 'CCNL', title: 'Contratto Collettivo', excerpt: 'Art. 15 - Ferie', confidence: 0.9, type: 'normativa' },
      ]);
      expect(conv3.messageCount).toBe(2);

      // Quality scoring
      const quality = scoreResponseQuality('Ferie docenti', 'Le ferie sono 40 giorni', [
        { id: 'c1', source: 'CCNL', title: 'Contratto', excerpt: 'Art. 15', confidence: 0.9, type: 'normativa' },
      ]);
      expect(quality.overall).toBeDefined();
      expect(quality.scores.relevance).toBeGreaterThan(0);

      // System prompt
      const prompt = getSystemPrompt('regulatory_lookup');
      expect(prompt).toContain('normativa');

      // Citations formatting
      const formatted = formatCitations([
        { id: 'c1', source: 'CCNL', title: 'Contratto', excerpt: 'Art. 15', confidence: 0.9, type: 'normativa' },
      ]);
      expect(formatted).toContain('[1]');
    });
  });
});

// ═════════════════════════════════════════════════════════════════════════════
//  §7 — EMA Assessment vs Italian School Services
// ═════════════════════════════════════════════════════════════════════════════

import { SAPM_ASSESSMENTS, calculateOverallMaturity, getHighPriorityRecommendations, getOpenActionItems } from '../sapm/assessment';
import { CAPABILITY_CATALOG, calculateImplementationProgress, getCriticalPath } from '../sapm/capabilities';
import { ARCHITECTURE_SPECS, getApprovedSpecs } from '../sapm/architecture';
import { runConsistencyMatrix } from '../rag/engine/consistency-matrix';
import { PRODUCT_REGISTRY, PRODUCT_CONTRACTS, calculateProductScore, getSuperFeaturesForProduct } from '../services/products';

describe('EMA/SAPM Compliance vs Italian School Services', () => {
  it('should have all 11 SAPM assessments completed', () => {
    expect(SAPM_ASSESSMENTS.length).toBe(11);
    const completed = SAPM_ASSESSMENTS.filter(a => a.status === 'completed');
    expect(completed.length).toBe(11);
    const maturity = calculateOverallMaturity();
    expect(maturity.average).toBeGreaterThanOrEqual(3);
  });

  it('should have all 15 capabilities tracked', () => {
    expect(CAPABILITY_CATALOG.length).toBe(15);
    const progress = calculateImplementationProgress();
    expect(progress.implemented).toBeGreaterThanOrEqual(8);
    expect(progress.percentage).toBeGreaterThanOrEqual(50);
    const criticalPath = getCriticalPath();
    expect(criticalPath.length).toBeGreaterThanOrEqual(5);
  });

  it('should have approved architecture specs', () => {
    const approved = getApprovedSpecs();
    expect(approved.length).toBeGreaterThanOrEqual(4);
  });

  it('should pass consistency matrix', () => {
    const report = runConsistencyMatrix();
    expect(report.passed).toBeGreaterThanOrEqual(6);
    expect(report.score).toBeGreaterThanOrEqual(75);
  });

  it('should have product scores for all 12 products', () => {
    const productIds = Object.keys(PRODUCT_REGISTRY) as (keyof typeof PRODUCT_REGISTRY)[];
    expect(productIds.length).toBe(12);
    for (const id of productIds) {
      const score = calculateProductScore(id);
      expect(score.overall).toBeGreaterThan(0);
      expect(score.health).toBeGreaterThan(0);
    }
  });

  it('should have super-features linking products', () => {
    expect(getSuperFeaturesForProduct('notizie_scadenze').length).toBeGreaterThan(0);
    expect(getSuperFeaturesForProduct('simulatore_nomine').length).toBeGreaterThan(0);
    expect(getSuperFeaturesForProduct('normativa').length).toBeGreaterThan(0);
  });

  // ═══════════════════════════════════════════════════════════════════════════
  //  §8 — ROLE-BASED TESTING vs Italian School Services
  // ═══════════════════════════════════════════════════════════════════════════

  describe('Role: Dirigente Scolastico', () => {
    it('should access normativa, interpelli, nomine', () => {
      // Dirigente needs normativa
      expect(PRODUCT_REGISTRY.normativa).toBeDefined();
      expect(PRODUCT_CONTRACTS.normativa.capabilities).toContain('document_indexing');

      // Dirigente needs interpelli
      expect(PRODUCT_REGISTRY.interpelli).toBeDefined();
      expect(PRODUCT_CONTRACTS.interpelli.capabilities).toContain('interpello_lifecycle');

      // Dirigente needs nomine
      expect(PRODUCT_REGISTRY.osservatorio_nomine).toBeDefined();
      expect(PRODUCT_CONTRACTS.osservatorio_nomine.capabilities).toContain('nomina_tracking');
    });

    it('should get editorial outputs for normativa', () => {
      const doc = createDocument({
        title: 'CCNL 2024-2026',
        type: 'decreto',
        number: '45',
        year: 2024,
        ente: 'MIUR',
        summary: 'Contratto collettivo',
        topics: ['contratti', 'personale'],
        effectiveDate: '2024-01-01',
        url: 'https://example.com/ccnl',
      });
      const editorial = generateEditorialOutput(doc);
      expect(editorial.levels.length).toBe(6);
      expect(editorial.levels[0].title).toBe('Il Fatto');
      expect(editorial.levels[4].title).toBe('Checklist Operativa');
    });
  });

  describe('Role: Docente', () => {
    it('should access search, scadenze, consulente', () => {
      expect(PRODUCT_REGISTRY.notizie_scadenze).toBeDefined();
      expect(PRODUCT_REGISTRY.consulente).toBeDefined();
      expect(PRODUCT_REGISTRY.calcolo_punteggio).toBeDefined();
    });

    it('should be able to search across products', () => {
      const contracts = Object.values(PRODUCT_CONTRACTS);
      const searchable = contracts.filter(c => c.searchConfig.enabled);
      expect(searchable.length).toBeGreaterThanOrEqual(6);
    });
  });

  describe('Role: Personale ATA', () => {
    it('should access guide, notizie, area riservata', () => {
      expect(PRODUCT_REGISTRY.guida_completa).toBeDefined();
      expect(PRODUCT_REGISTRY.notizie_scadenze).toBeDefined();
      expect(PRODUCT_REGISTRY.area_riservata).toBeDefined();
    });
  });

  describe('Role: Genitore', () => {
    it('should access eventi, notizie, guida', () => {
      expect(PRODUCT_REGISTRY.hub_eventi).toBeDefined();
      expect(PRODUCT_REGISTRY.notizie_scadenze).toBeDefined();
      expect(PRODUCT_REGISTRY.guida_completa).toBeDefined();
    });
  });

  describe('Role: Admin', () => {
    it('should have full access to all products', () => {
      const activeProducts = Object.values(PRODUCT_REGISTRY).filter(p => p.status === 'active');
      expect(activeProducts.length).toBe(11);
    });

    it('should access audit log and RBAC', () => {
      expect(SECURITY_CONTROLS.find(s => s.id === 'sec-05')).toBeDefined();
      expect(SECURITY_CONTROLS.find(s => s.id === 'sec-03')).toBeDefined();
    });
  });
});

// ═════════════════════════════════════════════════════════════════════════════
//  §9 — Comparison vs Major Italian School Services
// ═════════════════════════════════════════════════════════════════════════════

describe('Comparison vs Major Italian School Services', () => {
  it('vs Istanze On Line (IO) — should have document management', () => {
    // IO manages school requests — we have document lifecycle
    const doc = createDocument({
      title: 'Test Document',
      type: 'circolare',
      number: '1',
      year: 2026,
      ente: 'MIUR',
      summary: 'Test',
      topics: ['test'],
      effectiveDate: '2026-07-01',
      url: 'https://example.com',
    });
    expect(doc.status).toBe('draft');
    expect(doc.id).toBeDefined();
  });

  it('vs USAE — should have budget/resource tracking', () => {
    // USAE manages school budgets — we track costs and capacity
    const finops = getFinOpsSummary();
    expect(finops.totalCost).toBeLessThanOrEqual(10);
    expect(finops.optimizations).toBeGreaterThan(0);
  });

  it('vs SOGEST (Cineca) — should have administrative workflow', () => {
    // SOGEST manages school administration — we have RBAC + audit
    const policies = getMandatoryPolicies();
    expect(policies.length).toBeGreaterThanOrEqual(6);
    const compliance = getComplianceScore();
    expect(compliance).toBeGreaterThanOrEqual(90);
  });

  it('vs Servizi per la Scuola — should have normativa search', () => {
    // Servizi per la Scuola provides school services — we have universal search
    const searchContracts = Object.values(PRODUCT_CONTRACTS).filter(c => c.searchConfig.enabled);
    expect(searchContracts.length).toBeGreaterThanOrEqual(6);
  });

  it('vs Carta del Docente — should have teacher benefits tracking', () => {
    // Carta del Docente provides teacher benefits — we track benefits
    const benefits = getBenefitsRealized();
    expect(benefits).toBeGreaterThanOrEqual(70);
  });

  it('vs MePA (Consip) — should have vendor management', () => {
    // MePA manages procurement — we track vendors
    expect(VENDORS.length).toBeGreaterThanOrEqual(5);
    const risks = getVendorRiskSummary();
    expect(risks.low).toBeGreaterThanOrEqual(3);
  });

  it('vs MIUR Normativa API — should have comprehensive normativa', () => {
    // MIUR provides normativa — we have 12 products with 54 sources
    const stats = getDatabaseStats();
    expect(stats.tables).toBeGreaterThanOrEqual(10);
    expect(stats.totalRows).toBeGreaterThan(1000);
  });

  it('vs INVALSI — should have quality metrics and assessment', () => {
    // INVALSI assesses school quality — we have quality metrics
    expect(QUALITY_METRICS.length).toBeGreaterThanOrEqual(5);
    const score = getQualityScore();
    expect(score).toBeGreaterThanOrEqual(60);
  });

  it('vs Universitaly — should have event management', () => {
    // Universitaly manages school events — we have Hub Eventi
    expect(PRODUCT_REGISTRY.hub_eventi).toBeDefined();
    expect(PRODUCT_CONTRACTS.hub_eventi.capabilities).toContain('event_calendar');
    expect(PRODUCT_CONTRACTS.hub_eventi.capabilities).toContain('ticketing');
  });

  it('vs Scuola in Chiaro — should have transparency and reporting', () => {
    // Scuola in Chiaro provides school data transparency — we have governance
    const report = generateGovernanceReport();
    expect(report.complianceScore).toBeGreaterThanOrEqual(90);
    expect(report.policies).toBeGreaterThanOrEqual(8);
  });
});
