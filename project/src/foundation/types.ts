/**
 * ============================================================================
 *  EMA §3.13 — DATA LINEAGE
 *  Ogni informazione deve poter rispondere a cinque domande:
 *    1. Da dove proviene?
 *    2. Quando è stata acquisita?
 *    3. Chi l'ha modificata?
 *    4. Quale processo l'ha elaborata?
 *    5. Quale versione sto consultando?
 * ============================================================================
 */

export type DataSourceType =
  | 'supabase_query'
  | 'knowledge_base'
  | 'rag_retrieval'
  | 'ai_generation'
  | 'edge_function'
  | 'static_data'
  | 'user_input';

export interface DataLineageObject {
  sourceType: DataSourceType;
  sourceId?: string;
  sourceTable?: string;
  acquiredAt: string;
  processedBy: string;
  version: string;
  parentLineageId?: string;
  metadata?: Record<string, unknown>;
}

export interface LineageAwareResponse<T> {
  data: T;
  lineage: DataLineageObject;
}

export function createLineage(
  sourceType: DataSourceType,
  processedBy: string,
  opts?: {
    sourceId?: string;
    sourceTable?: string;
    version?: string;
    parentLineageId?: string;
    metadata?: Record<string, unknown>;
  }
): DataLineageObject {
  return {
    sourceType,
    sourceId: opts?.sourceId,
    sourceTable: opts?.sourceTable,
    acquiredAt: new Date().toISOString(),
    processedBy,
    version: opts?.version || '1.0.0',
    parentLineageId: opts?.parentLineageId,
    metadata: opts?.metadata,
  };
}

/**
 * EMA §3.13 — Wraps any data payload with lineage provenance.
 */
export function withLineage<T>(
  data: T,
  sourceType: DataSourceType,
  processedBy: string,
  opts?: {
    sourceId?: string;
    sourceTable?: string;
    version?: string;
    parentLineageId?: string;
    metadata?: Record<string, unknown>;
  }
): LineageAwareResponse<T> {
  return {
    data,
    lineage: createLineage(sourceType, processedBy, opts),
  };
}
