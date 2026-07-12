/**
 * ============================================================================
 *  EMA §1.6 — DOCUMENTI SERVICE
 *  Provides documenti normativi operations without direct Supabase from Layer 5.
 * ============================================================================
 */

import { supabaseAdapter } from '../foundation/adapters';
import { eventBus } from '../foundation/events';
import { createLineage } from '../foundation/types';
import type { DataLineageObject } from '../foundation/types';

export interface DocumentoNormativo {
  id: string;
  titolo: string;
  descrizione: string;
  abstract?: string;
  tipo: string;
  categoria: string;
  ente?: string;
  anno?: string;
  regione?: string;
  url_documento?: string;
  validated: boolean;
  validated_at?: string;
  validated_by?: string;
  is_archived: boolean;
  created_at: string;
}

export interface DocumentiResponse {
  data: DocumentoNormativo[];
  lineage: DataLineageObject;
}

export async function loadDocumenti(filter?: 'all' | 'validated' | 'pending' | 'archived'): Promise<DocumentiResponse> {
  const filters: Record<string, unknown> = {};

  if (filter === 'validated') {
    filters.validated = true;
  } else if (filter === 'pending') {
    filters.validated = false;
    filters.is_archived = false;
  } else if (filter === 'archived') {
    filters.is_archived = true;
  }

  const result = await supabaseAdapter.query<DocumentoNormativo>('documenti_normativi', {
    select: '*',
    filters,
    order: { column: 'created_at', ascending: false },
    limit: 100,
  });

  return {
    data: result.data || [],
    lineage: result.lineage,
  };
}

export async function approveDocumento(docId: string): Promise<{ error: Error | null; lineage: DataLineageObject }> {
  const result = await supabaseAdapter.update<DocumentoNormativo>(
    'documenti_normativi',
    { id: docId },
    {
      validated: true,
      validated_at: new Date().toISOString(),
      validated_by: 'admin',
    }
  );

  if (!result.error) {
    eventBus.emit('documento.approved', 'documenti-service', { docId });
  }

  return result;
}

export async function archiveDocumento(docId: string): Promise<{ error: Error | null; lineage: DataLineageObject }> {
  const result = await supabaseAdapter.update(
    'documenti_normativi',
    { id: docId },
    { is_archived: true }
  );

  if (!result.error) {
    eventBus.emit('documento.rejected', 'documenti-service', { docId });
  }

  return result;
}
