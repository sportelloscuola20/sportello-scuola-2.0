/**
 * @deprecated This file is a backward-compatible re-export barrel.
 * Import from the specific modules instead:
 * - './helpers' — formatDataItaliana, calcolaGiorniRimasti, deriveCriticalita, generaDatiDataJournalism, getTargetFromCategory
 * - './monitoring' — fetchMonitoredSources, fetchDashboardStats, getDashboardFallbackStats, triggerMonitorSources, triggerIngestNews
 * - './knowledge-graph' — fetchKnowledgeGraph
 * - './engine/sources' — SOURCE_MATRIX, FONT_REGISTRY, getSourceByName, getSourceByUrl
 */

import type { LivelloFonte, FonteInfo } from '../types/intelligence';
import { FONT_REGISTRY as _FONT_REGISTRY } from './engine/sources';

/** @deprecated Import from './engine/sources' instead */
export const FONT_REGISTRY = _FONT_REGISTRY;

/** @deprecated Use getSourceByName() from './engine/sources' */
export function getFonteInfo(livello: LivelloFonte): FonteInfo {
  return _FONT_REGISTRY[livello][0];
}

/** @deprecated Use getSourceByUrl() from './engine/sources' */
export function getFonteByUrl(url: string): FonteInfo | undefined {
  for (const gruppo of Object.values(_FONT_REGISTRY)) {
    const found = gruppo.find(f => url.startsWith(f.url) || f.url.startsWith(url));
    if (found) return found;
  }
  return undefined;
}

export { formatDataItaliana, calcolaGiorniRimasti, deriveCriticalita, generaDatiDataJournalism, getTargetFromCategory } from './helpers';
export { fetchMonitoredSources, fetchDashboardStats, getDashboardFallbackStats, triggerMonitorSources, triggerIngestNews } from './monitoring';
export { fetchKnowledgeGraph } from './knowledge-graph';
