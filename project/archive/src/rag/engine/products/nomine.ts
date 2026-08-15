/**
 * ============================================================================
 *  EMA §24-29 — OSSERVATORIO NOMINE PRODUCT ENGINE
 *  Nomina ingestion, bulletin processing, trend analytics, observatory.
 * ============================================================================
 */

import { createLineage, type DataLineageObject } from '../../../foundation/types';
import { eventBus } from '../../../foundation/events';
import type { ProductId } from '../../../services/products';

// ─── Nomina Types ────────────────────────────────────────────────────────────

export type NominaStatus =
  | 'pubblicata'
  | 'in_corso'
  | 'assegnata'
  | 'annullata'
  | 'scaduta';

export type NominaType =
  | 'dirigente_scolastico'
  | 'dirigente_tecnico'
  | 'direttore_dei_servizi_generali'
  | 'presidente_consiglio_istituzionale';

export interface Nomina {
  id: string;
  title: string;
  type: NominaType;
  status: NominaStatus;
  ente: string;
  regione: string;
  provincia?: string;
  sede: string;
  publishedAt: string;
  deadline?: string;
  assignedAt?: string;
  assignedTo?: string;
  punteggio?: number;
  requirements: NominaRequirement[];
  documents: NominaDocument[];
  lineage: DataLineageObject;
}

export interface NominaRequirement {
  type: string;
  description: string;
  minScore?: number;
  mandatory: boolean;
}

export interface NominaDocument {
  id: string;
  name: string;
  url: string;
  type: 'bando' | 'allegato' | 'verbale' | 'decreto';
}

// ─── Nomina Card (EMA §25) ──────────────────────────────────────────────────

export interface NominaCard {
  id: string;
  title: string;
  type: NominaType;
  typeLabel: string;
  status: NominaStatus;
  statusLabel: string;
  statusColor: string;
  ente: string;
  regione: string;
  sede: string;
  publishedAt: string;
  deadline?: string;
  daysRemaining?: number;
  hasDocuments: boolean;
  url: string;
  lineage: DataLineageObject;
}

// ─── Observatory Dashboard (EMA §28) ────────────────────────────────────────

export interface ObservatoryStats {
  totalNomine: number;
  byStatus: Record<NominaStatus, number>;
  byRegion: Record<string, number>;
  byType: Record<NominaType, number>;
  avgTimeToAssignment: number; // days
  successRate: number; // percentage
  lastUpdated: string;
  lineage: DataLineageObject;
}

export interface RegionalComparison {
  regione: string;
  totalNomine: number;
  avgPunteggio: number;
  avgTimeToAssignment: number;
  successRate: number;
}

// ─── Trend Analytics (EMA §27) ──────────────────────────────────────────────

export interface TrendData {
  period: string;
  count: number;
  avgPunteggio: number;
  successRate: number;
}

// ─── Functions ──────────────────────────────────────────────────────────────

/** Create a nomina */
export function createNomina(data: {
  title: string;
  type: NominaType;
  ente: string;
  regione: string;
  provincia?: string;
  sede: string;
  deadline?: string;
  requirements?: NominaRequirement[];
}): Nomina {
  return {
    id: `nom_${Date.now()}_${Math.random().toString(36).slice(2, 8)}`,
    title: data.title,
    type: data.type,
    status: 'pubblicata',
    ente: data.ente,
    regione: data.regione,
    provincia: data.provincia,
    sede: data.sede,
    publishedAt: new Date().toISOString(),
    deadline: data.deadline,
    requirements: data.requirements || [],
    documents: [],
    lineage: createLineage('nomina_creation', 'new', {
      title: data.title,
      type: data.type,
      regione: data.regione,
    }),
  };
}

/** Create nomina card */
export function createNominaCard(nomina: Nomina): NominaCard {
  const typeLabels: Record<NominaType, string> = {
    dirigente_scolastico: 'Dirigente Scolastico',
    dirigente_tecnico: 'Dirigente Tecnico',
    direttore_dei_servizi_generali: 'Direttore dei Servizi Generali',
    presidente_consiglio_istituzionale: 'Presidente Consiglio Istituzionale',
  };

  const statusLabels: Record<NominaStatus, string> = {
    pubblicata: 'Pubblicata',
    in_corso: 'In Corso',
    assegnata: 'Assegnata',
    annullata: 'Annullata',
    scaduta: 'Scaduta',
  };

  const statusColors: Record<NominaStatus, string> = {
    pubblicata: 'text-blue-600',
    in_corso: 'text-yellow-600',
    assegnata: 'text-green-600',
    annullata: 'text-red-600',
    scaduta: 'text-gray-600',
  };

  let daysRemaining: number | undefined;
  if (nomina.deadline) {
    const diff = new Date(nomina.deadline).getTime() - Date.now();
    daysRemaining = Math.ceil(diff / (1000 * 60 * 60 * 24));
  }

  return {
    id: nomina.id,
    title: nomina.title,
    type: nomina.type,
    typeLabel: typeLabels[nomina.type],
    status: nomina.status,
    statusLabel: statusLabels[nomina.status],
    statusColor: statusColors[nomina.status],
    ente: nomina.ente,
    regione: nomina.regione,
    sede: nomina.sede,
    publishedAt: nomina.publishedAt,
    deadline: nomina.deadline,
    daysRemaining,
    hasDocuments: nomina.documents.length > 0,
    url: `/nomine/${nomina.id}`,
    lineage: nomina.lineage,
  };
}

/** Calculate observatory stats */
export function calculateObservatoryStats(nomine: Nomina[]): ObservatoryStats {
  const byStatus: Record<NominaStatus, number> = {
    pubblicata: 0, in_corso: 0, assegnata: 0, annullata: 0, scaduta: 0,
  };
  const byRegion: Record<string, number> = {};
  const byType: Record<NominaType, number> = {
    dirigente_scolastico: 0, dirigente_tecnico: 0,
    direttore_dei_servizi_generali: 0, presidente_consiglio_istituzionale: 0,
  };

  let totalAssignmentDays = 0;
  let assignedCount = 0;

  for (const nomina of nomine) {
    byStatus[nomina.status]++;
    byRegion[nomina.regione] = (byRegion[nomina.regione] || 0) + 1;
    byType[nomina.type]++;

    if (nomina.assignedAt && nomina.publishedAt) {
      const days = (new Date(nomina.assignedAt).getTime() - new Date(nomina.publishedAt).getTime()) / (1000 * 60 * 60 * 24);
      totalAssignmentDays += days;
      assignedCount++;
    }
  }

  return {
    totalNomine: nomine.length,
    byStatus,
    byRegion,
    byType,
    avgTimeToAssignment: assignedCount > 0 ? totalAssignmentDays / assignedCount : 0,
    successRate: nomine.length > 0 ? (byStatus.assegnata / nomine.length) * 100 : 0,
    lastUpdated: new Date().toISOString(),
    lineage: createLineage('observatory_stats', 'snapshot', {
      totalNomine: nomine.length,
    }),
  };
}

/** Get regional comparisons */
export function getRegionalComparisons(nomine: Nomina[]): RegionalComparison[] {
  const regionMap = new Map<string, Nomina[]>();

  for (const nomina of nomine) {
    if (!regionMap.has(nomina.regione)) regionMap.set(nomina.regione, []);
    regionMap.get(nomina.regione)!.push(nomina);
  }

  return Array.from(regionMap.entries()).map(([regione, regionNomine]) => {
    const assigned = regionNomine.filter(n => n.punteggio !== undefined);
    return {
      regione,
      totalNomine: regionNomine.length,
      avgPunteggio: assigned.length > 0
        ? assigned.reduce((sum, n) => sum + (n.punteggio || 0), 0) / assigned.length
        : 0,
      avgTimeToAssignment: 0, // simplified
      successRate: regionNomine.length > 0
        ? (regionNomine.filter(n => n.status === 'assegnata').length / regionNomine.length) * 100
        : 0,
    };
  });
}

/** Get trend data over time */
export function getTrendData(nomine: Nomina[], months: number = 12): TrendData[] {
  const trends: TrendData[] = [];
  const now = new Date();

  for (let i = months - 1; i >= 0; i--) {
    const startDate = new Date(now.getFullYear(), now.getMonth() - i, 1);
    const endDate = new Date(now.getFullYear(), now.getMonth() - i + 1, 0);

    const monthNomine = nomine.filter(n => {
      const pubDate = new Date(n.publishedAt);
      return pubDate >= startDate && pubDate <= endDate;
    });

    const assigned = monthNomine.filter(n => n.punteggio !== undefined);

    trends.push({
      period: `${startDate.getFullYear()}-${String(startDate.getMonth() + 1).padStart(2, '0')}`,
      count: monthNomine.length,
      avgPunteggio: assigned.length > 0
        ? assigned.reduce((sum, n) => sum + (n.punteggio || 0), 0) / assigned.length
        : 0,
      successRate: monthNomine.length > 0
        ? (monthNomine.filter(n => n.status === 'assegnata').length / monthNomine.length) * 100
        : 0,
    });
  }

  return trends;
}
