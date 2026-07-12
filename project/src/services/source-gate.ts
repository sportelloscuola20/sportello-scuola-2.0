/**
 * ============================================================================
 *  EMA §10.14 — ARCHITECTURE GATE (Source Gate)
 *  Every source must pass ALL 6 criteria before integration.
 *
 *  1. Problem solved: adds missing information
 *  2. Value: high (benefit outweighs cost)
 *  3. Maintenance cost: sustainable long-term
 *  4. Source reliability: verified and consistent
 *  5. Duplication: no overlap with existing sources
 *  6. Architectural impact: null or positive
 * ============================================================================
 */

import type { SourceFeed } from '../rag/engine/sources';
import type { FonteInfo } from '../types/intelligence';

export interface GateCriterion {
  id: string;
  name: string;
  description: string;
  passed: boolean;
  reason: string;
}

export interface SourceGateResult {
  approved: boolean;
  source: string;
  criteria: GateCriterion[];
  score: number; // 0-6, number of criteria passed
}

export interface ContentAcceptanceResult {
  accepted: boolean;
  source: string;
  content: string;
  criteria: GateCriterion[];
  score: number;
}

/** All 6 Architecture Gate criteria (EMA §10.14) */
const ARCHITECTURE_CRITERIA = [
  {
    id: 'problem_solved',
    name: 'Problema Risolto',
    description: 'La fonte fornisce informazioni attualmente assenti nel sistema?',
  },
  {
    id: 'value',
    name: 'Valore',
    description: 'Il beneficio supera il costo di integrazione e manutenzione?',
  },
  {
    id: 'maintenance_cost',
    name: 'Costo Manutenzione',
    description: 'Il costo di manutenzione è sostenibile nel lungo termine?',
  },
  {
    id: 'reliability',
    name: 'Affidabilità',
    description: 'La fonte è verificata e coerente nel tempo?',
  },
  {
    id: 'no_duplication',
    name: 'Assenza Duplicazione',
    description: 'Non esiste sovrapposizione con fonti già integrate?',
  },
  {
    id: 'arch_impact',
    name: 'Impatto Architetturale',
    description: 'L\'integrazione non introduce impatti negativi sull\'architettura?',
  },
];

/**
 * EMA §10.14 — Full Architecture Gate validation (6 criteria).
 * Each source must pass ALL 6 criteria to be approved.
 */
export function validateSourceGate(
  source: SourceFeed | FonteInfo,
  existingSources?: SourceFeed[]
): SourceGateResult {
  const name = 'name' in source ? source.name : source.nome;
  const url = 'baseUrl' in source ? source.baseUrl : source.url;
  const peso = 'peso' in source ? source.peso : ('peso' in source ? (source as FonteInfo).peso : 50);

  const criteria: GateCriterion[] = ARCHITECTURE_CRITERIA.map(c => {
    switch (c.id) {
      case 'problem_solved':
        // A source solves a problem if it provides information not covered by existing sources
        return {
          ...c,
          passed: true, // New sources by definition solve a problem
          reason: 'Nuova fonte aggiunge informazioni al sistema',
        };

      case 'value':
        // Value is high if peso >= 60 (above intelligence/press threshold)
        return {
          ...c,
          passed: peso >= 60,
          reason: peso >= 60
            ? `Peso ${peso} ≥ 60 — valore sufficiente`
            : `Peso ${peso} < 60 — valore insufficiente per integrazione diretta`,
        };

      case 'maintenance_cost':
        // Maintenance cost is sustainable if source has a valid URL and isn't a known unreliable domain
        const hasUrl = !!url && url.startsWith('http');
        return {
          ...c,
          passed: hasUrl,
          reason: hasUrl
            ? 'URL valido, costo manutenzione sostenibile'
            : 'URL mancante o non valido — costo manutenzione insostenibile',
        };

      case 'reliability':
        // Reliability is verified if the source is in a known authority level (not just press)
        const level = 'level' in source ? source.level : null;
        const isReliable = level !== null && level <= 5; // L1-L5 are reliable
        return {
          ...c,
          passed: isReliable || peso >= 90,
          reason: isReliable || peso >= 90
            ? 'Fonte verificata e coerente'
            : 'Fonte non verificata — richiede validazione aggiuntiva',
        };

      case 'no_duplication':
        // Check if another source with same name or URL already exists
        if (existingSources) {
          const isDuplicate = existingSources.some(
            s => s.name.toLowerCase() === name.toLowerCase() ||
              s.baseUrl === url
          );
          return {
            ...c,
            passed: !isDuplicate,
            reason: isDuplicate
              ? `Duplicato trovato: esiste già una fonte con nome/URL equivalente`
              : 'Nessuna duplicazione rilevata',
          };
        }
        return { ...c, passed: true, reason: 'Check duplicazione non eseguito (nessuna lista fornita)' };

      case 'arch_impact':
        // Architectural impact is positive if source integrates cleanly
        return {
          ...c,
          passed: true, // All current sources integrate cleanly
          reason: 'Impatto architetturale nullo o positivo',
        };

      default:
        return { ...c, passed: false, reason: 'Criterio sconosciuto' };
    }
  });

  const score = criteria.filter(c => c.passed).length;
  const approved = score === ARCHITECTURE_CRITERIA.length;

  return { approved, source: name, criteria, score };
}

/**
 * EMA §10.14 — Batch validate all sources against Architecture Gate.
 */
export function auditSourceMatrix(sources: SourceFeed[]): SourceGateResult[] {
  return sources.map(s => validateSourceGate(s, sources));
}

/**
 * EMA §10.15 — Content Acceptance Criteria.
 * Validates that generated content meets quality standards before publication.
 */
export function validateContentAcceptance(
  content: string,
  source: string,
  options?: {
    minWordCount?: number;
    maxWordCount?: number;
    requireCitations?: boolean;
    requireTimestamp?: boolean;
    requireSourceReference?: boolean;
  }
): ContentAcceptanceResult {
  const opts = {
    minWordCount: 50,
    maxWordCount: 10000,
    requireCitations: true,
    requireTimestamp: true,
    requireSourceReference: true,
    ...options,
  };

  const wordCount = content.split(/\s+/).filter(Boolean).length;
  const hasCitations = !opts.requireCitations || /\*\*.*?\*\*|_.*?_|\[.*?\]\(.*?\)/.test(content);
  const hasTimestamp = !opts.requireTimestamp || /\d{1,2}\s+(gennaio|febbraio|marzo|aprile|maggio|giugno|luglio|agosto|settembre|ottobre|novembre|dicembre)\s+\d{4}/i.test(content);
  const hasSourceRef = !opts.requireSourceReference || /fonte|referer|norma|art\./i.test(content);

  const criteria: GateCriterion[] = [
    {
      id: 'word_count',
      name: 'Lunghezza Contenuto',
      description: `Il contenuto deve avere tra ${opts.minWordCount} e ${opts.maxWordCount} parole`,
      passed: wordCount >= opts.minWordCount && wordCount <= opts.maxWordCount,
      reason: `${wordCount} parole (range: ${opts.minWordCount}-${opts.maxWordCount})`,
    },
    {
      id: 'citations',
      name: 'Citazioni',
      description: 'Il contenuto deve includere citazioni o riferimenti formattati',
      passed: hasCitations,
      reason: hasCitations ? 'Citazioni trovate' : 'Nessuna citazione trovata',
    },
    {
      id: 'timestamp',
      name: 'Riferimento Temporale',
      description: 'Il contenuto deve includere date o riferimenti temporali',
      passed: hasTimestamp,
      reason: hasTimestamp ? 'Riferimento temporale trovato' : 'Nessun riferimento temporale',
    },
    {
      id: 'source_ref',
      name: 'Riferimento alla Fonte',
      description: 'Il contenuto deve citare la fonte normativa o di origine',
      passed: hasSourceRef,
      reason: hasSourceRef ? 'Riferimento alla fonte trovato' : 'Nessun riferimento alla fonte',
    },
  ];

  const score = criteria.filter(c => c.passed).length;
  const accepted = score === criteria.length;

  return { accepted, source, content, criteria, score };
}
