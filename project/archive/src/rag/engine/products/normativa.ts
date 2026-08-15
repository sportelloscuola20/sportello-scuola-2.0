/**
 * ============================================================================
 *  EMA §12-18 — NORMATIVA & DOCUMENTI PRODUCT ENGINE
 *  Document type system, relationship graph, lifecycle, editorial model,
 *  topic navigation, 6-level canonical output, approval workflow.
 * ============================================================================
 */

import { createLineage, type DataLineageObject } from '../../../foundation/types';
import { eventBus } from '../../../foundation/events';
import { createCanonicalItem, type ProductId } from '../../../services/products';

// ─── Document Types (EMA §13) ───────────────────────────────────────────────

export type DocumentType =
  | 'decreto'
  | 'dpr'
  | 'd.lgs'
  | 'd.m.'
  | 'circolare'
  | 'nota'
  | 'legge'
  | 'regolamento'
  | 'delibera'
  | 'determina'
  | 'interrogazione'
  | 'risoluzione';

export type DocumentStatus =
  | 'draft'
  | 'under_review'
  | 'approved'
  | 'published'
  | 'archived'
  | 'superseded';

export type DocumentRelationshipType =
  | 'modifies'
  | 'supersedes'
  | 'clarifies'
  | 'abrogates'
  | 'implements'
  | 'references'
  | 'derives_from'
  | 'related_to';

// ─── Document Model (EMA §13) ───────────────────────────────────────────────

export interface DocumentoNormativo {
  id: string;
  title: string;
  type: DocumentType;
  number: string;
  year: number;
  ente: string;
  regione?: string;
  status: DocumentStatus;
  summary: string;
  fullText?: string;
  keywords: string[];
  topics: string[];
  effectiveDate: string;
  expiryDate?: string;
  publishedAt: string;
  updatedAt: string;
  url: string;
  lineage: DataLineageObject;
  relationships: DocumentRelationship[];
  metadata: DocumentMetadata;
}

export interface DocumentMetadata {
  articoli?: number;
  allegati?: number;
  language: string;
  source: string;
  confidence: number; // 0-1
  aiGenerated: boolean;
  version: number;
}

export interface DocumentRelationship {
  targetId: string;
  type: DocumentRelationshipType;
  description?: string;
  confidence: number;
  lineage: DataLineageObject;
}

// ─── Document Card (EMA §14) ────────────────────────────────────────────────

export interface DocumentCard {
  id: string;
  title: string;
  type: DocumentType;
  typeLabel: string;
  number: string;
  year: number;
  ente: string;
  regione?: string;
  status: DocumentStatus;
  summary: string;
  topics: string[];
  effectiveDate: string;
  publishedAt: string;
  relationshipCount: number;
  url: string;
  lineage: DataLineageObject;
}

// ─── Topic Navigation (EMA §17) ─────────────────────────────────────────────

export interface TopicNode {
  id: string;
  name: string;
  parentId?: string;
  children: TopicNode[];
  documentCount: number;
  description: string;
}

export interface TopicBreadcrumb {
  id: string;
  name: string;
}

// ─── Editorial Model (EMA §16) — 6-Level Output ────────────────────────────

export type EditorialLevel =
  | 'fatto'           // 1. Il Fatto — Cosa Succede
  | 'perche'          // 2. Perché è Importante — Contesto
  | 'cosa_cambia'     // 3. Cosa Cambia per Te — Impatto Operativo
  | 'faq'             // 4. Dubbi Comuni — FAQ
  | 'checklist'       // 5. Checklist Operativa — Cosa Fare Subito
  | 'riferimenti';    // 6. Riferimenti Normativi e Prossime TAPE

export interface EditorialOutput {
  documentId: string;
  levels: EditorialLevelContent[];
  generatedAt: string;
  lineage: DataLineageObject;
}

export interface EditorialLevelContent {
  level: EditorialLevel;
  title: string;
  content: string;
  order: number;
  metadata: Record<string, unknown>;
}

// ─── Document Lifecycle (EMA §15) ──────────────────────────────────────────

export interface LifecycleTransition {
  from: DocumentStatus;
  to: DocumentStatus;
  allowed: boolean;
  requiresApproval: boolean;
  conditions?: string[];
}

export const LIFECYCLE_TRANSITIONS: LifecycleTransition[] = [
  { from: 'draft', to: 'under_review', allowed: true, requiresApproval: false },
  { from: 'under_review', to: 'approved', allowed: true, requiresApproval: true, conditions: ['reviewer_assigned'] },
  { from: 'under_review', to: 'draft', allowed: true, requiresApproval: false, conditions: ['revision_requested'] },
  { from: 'approved', to: 'published', allowed: true, requiresApproval: false },
  { from: 'published', to: 'archived', allowed: true, requiresApproval: false, conditions: ['retention_expired'] },
  { from: 'published', to: 'superseded', allowed: true, requiresApproval: true, conditions: ['new_version_exists'] },
  { from: 'archived', to: 'published', allowed: true, requiresApproval: true, conditions: ['reactivation_requested'] },
];

// ─── Functions ──────────────────────────────────────────────────────────────

/** Create a document card from a full document */
export function createDocumentCard(doc: DocumentoNormativo): DocumentCard {
  return {
    id: doc.id,
    title: doc.title,
    type: doc.type,
    typeLabel: formatDocumentType(doc.type),
    number: doc.number,
    year: doc.year,
    ente: doc.ente,
    regione: doc.regione,
    status: doc.status,
    summary: doc.summary,
    topics: doc.topics,
    effectiveDate: doc.effectiveDate,
    publishedAt: doc.publishedAt,
    relationshipCount: doc.relationships.length,
    url: doc.url,
    lineage: doc.lineage,
  };
}

/** Format document type to human-readable label */
export function formatDocumentType(type: DocumentType): string {
  const labels: Record<DocumentType, string> = {
    decreto: 'Decreto',
    dpr: 'D.P.R.',
    'd.lgs': 'D.Lgs.',
    'd.m.': 'D.M.',
    circolare: 'Circolare',
    nota: 'Nota',
    legge: 'Legge',
    regolamento: 'Regolamento',
    delibera: 'Delibera',
    determina: 'Determina',
    interrogazione: 'Interrogazione',
    risoluzione: 'Risoluzione',
  };
  return labels[type] || type;
}

/** Add a relationship between documents */
export function addDocumentRelationship(
  source: DocumentoNormativo,
  targetId: string,
  type: DocumentRelationshipType,
  description?: string
): DocumentoNormativo {
  const relationship: DocumentRelationship = {
    targetId,
    type,
    description,
    confidence: 0.9,
    lineage: createLineage('document_relationship', type, {
      sourceId: source.id,
      targetId,
    }),
  };

  const updated = {
    ...source,
    relationships: [...source.relationships, relationship],
    updatedAt: new Date().toISOString(),
  };

  eventBus.emit({
    type: 'document.relationship_added',
    sourceId: source.id,
    targetId,
    relationshipType: type,
    timestamp: new Date().toISOString(),
    lineage: relationship.lineage,
  } as any);

  return updated;
}

/** Get documents related to a given document */
export function getRelatedDocuments(
  doc: DocumentoNormativo,
  allDocuments: DocumentoNormativo[],
  relationshipType?: DocumentRelationshipType
): { document: DocumentoNormativo; relationship: DocumentRelationship }[] {
  const filtered = relationshipType
    ? doc.relationships.filter(r => r.type === relationshipType)
    : doc.relationships;

  return filtered
    .map(rel => {
      const target = allDocuments.find(d => d.id === rel.targetId);
      return target ? { document: target, relationship: rel } : null;
    })
    .filter((r): r is NonNullable<typeof r> => r !== null);
}

/** Check if a lifecycle transition is allowed */
export function canTransition(from: DocumentStatus, to: DocumentStatus): LifecycleTransition | null {
  return LIFECYCLE_TRANSITIONS.find(t => t.from === from && t.to === to && t.allowed) || null;
}

/** Transition document status */
export function transitionDocumentStatus(
  doc: DocumentoNormativo,
  newStatus: DocumentStatus
): DocumentoNormativo {
  const transition = canTransition(doc.status, newStatus);
  if (!transition) {
    throw new Error(`Transition from ${doc.status} to ${newStatus} is not allowed`);
  }

  const updated = {
    ...doc,
    status: newStatus,
    updatedAt: new Date().toISOString(),
  };

  eventBus.emit({
    type: 'document.status_changed',
    documentId: doc.id,
    oldStatus: doc.status,
    newStatus,
    timestamp: new Date().toISOString(),
    lineage: createLineage('document_lifecycle', `doc:${doc.id}`, {
      oldStatus: doc.status,
      newStatus,
    }),
  } as any);

  return updated;
}

/** Generate 6-level editorial output for a document */
export function generateEditorialOutput(doc: DocumentoNormativo): EditorialOutput {
  return {
    documentId: doc.id,
    levels: [
      { level: 'fatto', title: 'Il Fatto', content: `${doc.typeLabel} ${doc.number}/${doc.year} — ${doc.summary}`, order: 1, metadata: {} },
      { level: 'perche', title: 'Perché è Importante', content: `Questo provvedimento riguarda ${doc.topics.join(', ')}.`, order: 2, metadata: {} },
      { level: 'cosa_cambia', title: 'Cosa Cambia per Te', content: `Impatto operativo per ${doc.ente}.`, order: 3, metadata: {} },
      { level: 'faq', title: 'Dubbi Comuni', content: `FAQ relative a ${doc.typeLabel} ${doc.number}.`, order: 4, metadata: {} },
      { level: 'checklist', title: 'Checklist Operativa', content: `Cosa fare subito dopo la pubblicazione.`, order: 5, metadata: {} },
      { level: 'riferimenti', title: 'Riferimenti Normativi', content: `Riferimenti a ${doc.relationships.length} documenti collegati.`, order: 6, metadata: {} },
    ],
    generatedAt: new Date().toISOString(),
    lineage: createLineage('editorial_output', `doc:${doc.id}`, {
      levels: 6,
      documentType: doc.type,
    }),
  };
}

/** Build topic tree from documents */
export function buildTopicTree(documents: DocumentoNormativo[]): TopicNode[] {
  const topicMap = new Map<string, TopicNode>();

  for (const doc of documents) {
    for (const topic of doc.topics) {
      if (!topicMap.has(topic)) {
        topicMap.set(topic, {
          id: topic.toLowerCase().replace(/\s+/g, '_'),
          name: topic,
          children: [],
          documentCount: 0,
          description: `Documenti relativi a ${topic}`,
        });
      }
      const node = topicMap.get(topic)!;
      node.documentCount++;
    }
  }

  return Array.from(topicMap.values());
}

/** Get topic breadcrumbs */
export function getTopicBreadcrumbs(
  topicId: string,
  topicTree: TopicNode[]
): TopicBreadcrumb[] {
  const breadcrumbs: TopicBreadcrumb[] = [];
  const find = (nodes: TopicNode[], target: string): TopicNode | null => {
    for (const node of nodes) {
      if (node.id === target) return node;
      const found = find(node.children, target);
      if (found) return found;
    }
    return null;
  };

  const node = find(topicTree, topicId);
  if (node) {
    breadcrumbs.unshift({ id: node.id, name: node.name });
  }

  return breadcrumbs;
}

/** Create a document from raw data */
export function createDocument(data: {
  title: string;
  type: DocumentType;
  number: string;
  year: number;
  ente: string;
  regione?: string;
  summary: string;
  topics: string[];
  effectiveDate: string;
  url: string;
}): DocumentoNormativo {
  return {
    id: `doc_${data.type}_${data.number}_${data.year}`,
    title: data.title,
    type: data.type,
    number: data.number,
    year: data.year,
    ente: data.ente,
    regione: data.regione,
    status: 'draft',
    summary: data.summary,
    keywords: [],
    topics: data.topics,
    effectiveDate: data.effectiveDate,
    publishedAt: new Date().toISOString(),
    updatedAt: new Date().toISOString(),
    url: data.url,
    lineage: createLineage('document_creation', `doc:${data.type}_${data.number}`, {
      title: data.title,
      type: data.type,
    }),
    relationships: [],
    metadata: {
      language: 'it',
      source: 'manual',
      confidence: 1.0,
      aiGenerated: false,
      version: 1,
    },
  };
}
