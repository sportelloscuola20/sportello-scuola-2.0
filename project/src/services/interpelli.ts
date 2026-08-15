/**
 * ============================================================================
 *  EMA §1.6 — INTERPELLI SERVICE
 *  Provides interpelli/bandi operations without direct Supabase from Layer 5.
 * ============================================================================
 */

import { supabaseAdapter } from '../foundation/adapters';
import { eventBus } from '../foundation/events';
import type { DataLineageObject } from '../foundation/types';
import type { InterpelloNazionale } from '../types/database';

export type { InterpelloNazionale } from '../types/database';

export interface InterpelliResponse {
  data: InterpelloNazionale[];
  total: number;
  lineage: DataLineageObject;
}

export async function loadTotalCount(): Promise<{ count: number; lineage: DataLineageObject }> {
  const result = await supabaseAdapter.query<InterpelloNazionale>('interpelli_nazionali', {
    select: '*',
    filters: {},
    limit: 0,
  });

  return {
    count: result.data?.length ?? 0,
    lineage: result.lineage,
  };
}

export async function searchInterpelli(filters: {
  provincia?: string;
  classe?: string;
  tipoPosto?: string;
}): Promise<InterpelliResponse> {
  const filterObj: Record<string, unknown> = {};

  if (filters.provincia) {
    filterObj.ufficio_scolastico_provinciale = filters.provincia;
  }
  if (filters.classe) {
    filterObj.classe_di_concorso = filters.classe;
  }
  if (filters.tipoPosto) {
    filterObj.tipo_posto = filters.tipoPosto;
  }

  const result = await supabaseAdapter.query<InterpelloNazionale>('interpelli_nazionali', {
    select: '*',
    filters: filterObj,
    order: { column: 'data_pubblicazione', ascending: false },
    limit: 50,
  });

  eventBus.emit('interpello.created', 'interpelli-service', {
    resultCount: result.data?.length ?? 0,
    filters,
  });

  return {
    data: result.data || [],
    total: result.data?.length ?? 0,
    lineage: result.lineage,
  };
}
