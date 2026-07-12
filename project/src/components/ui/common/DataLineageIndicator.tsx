/**
 * ============================================================================
 *  EMA §3.13 — DATA LINEAGE UI COMPONENT
 *  Surfaces provenance information to users.
 *  Answers: Da dove? Quando? Chi? Quale processo? Quale versione?
 * ============================================================================
 */

import { useState } from 'react';
import type { DataLineageObject } from '../../foundation/types';
import { formatDataItaliana } from '../../rag/helpers';

interface DataLineageProps {
  lineage: DataLineageObject;
  compact?: boolean;
}

const SOURCE_TYPE_LABELS: Record<string, string> = {
  supabase_query: 'Database',
  knowledge_base: 'Knowledge Base',
  rag_retrieval: 'RAG Retrieval',
  ai_generation: 'Generazione AI',
  edge_function: 'Edge Function',
  static_data: 'Dati Statici',
  user_input: 'Input Utente',
};

const SOURCE_TYPE_ICONS: Record<string, string> = {
  supabase_query: '🗄️',
  knowledge_base: '📚',
  rag_retrieval: '🔍',
  ai_generation: '🤖',
  edge_function: '⚡',
  static_data: '📄',
  user_input: '👤',
};

export function DataLineageIndicator({ lineage, compact = false }: DataLineageProps) {
  const [expanded, setExpanded] = useState(false);

  if (compact) {
    return (
      <span
        className="inline-flex items-center gap-1 text-xs text-gray-500 cursor-help"
        title={`Fonte: ${SOURCE_TYPE_LABELS[lineage.sourceType] || lineage.sourceType} | Versione: ${lineage.version}`}
      >
        {SOURCE_TYPE_ICONS[lineage.sourceType] || '📋'}
        <span>v{lineage.version}</span>
      </span>
    );
  }

  return (
    <div className="border border-gray-200 rounded-lg p-3 bg-gray-50 text-sm">
      <button
        onClick={() => setExpanded(!expanded)}
        className="flex items-center gap-2 w-full text-left font-medium text-gray-700"
      >
        <span>{SOURCE_TYPE_ICONS[lineage.sourceType] || '📋'}</span>
        <span>Provenienza dati</span>
        <span className="ml-auto text-gray-400">{expanded ? '▲' : '▼'}</span>
      </button>

      {expanded && (
        <div className="mt-3 space-y-2 text-gray-600">
          <LineageRow
            label="Da dove proviene?"
            value={SOURCE_TYPE_LABELS[lineage.sourceType] || lineage.sourceType}
          />
          {lineage.sourceId && (
            <LineageRow label="ID Fonte" value={lineage.sourceId} />
          )}
          {lineage.sourceTable && (
            <LineageRow label="Tabella" value={lineage.sourceTable} />
          )}
          <LineageRow
            label="Quando è stata acquisita?"
            value={formatDataItaliana(lineage.acquiredAt)}
          />
          <LineageRow label="Chi l'ha modificata?" value={lineage.processedBy} />
          <LineageRow label="Versione" value={`v${lineage.version}`} />
          {lineage.parentLineageId && (
            <LineageRow label="Genitore" value={lineage.parentLineageId} />
          )}
          {lineage.metadata && Object.keys(lineage.metadata).length > 0 && (
            <div>
              <span className="text-xs text-gray-500">Metadata:</span>
              <pre className="text-xs bg-white p-2 rounded mt-1 overflow-auto max-h-32">
                {JSON.stringify(lineage.metadata, null, 2)}
              </pre>
            </div>
          )}
        </div>
      )}
    </div>
  );
}

function LineageRow({ label, value }: { label: string; value: string }) {
  return (
    <div className="flex justify-between">
      <span className="text-xs text-gray-500">{label}:</span>
      <span className="text-xs font-mono text-gray-700">{value}</span>
    </div>
  );
}

/**
 * Inline lineage badge — minimal version for embedding in cards/rows.
 */
export function LineageBadge({ lineage }: { lineage: DataLineageObject }) {
  return (
    <span
      className="inline-flex items-center gap-1 px-1.5 py-0.5 rounded text-[10px] bg-gray-100 text-gray-500 border border-gray-200"
      title={`${SOURCE_TYPE_LABELS[lineage.sourceType]} | Acquisito: ${formatDataItaliana(lineage.acquiredAt)} | Elaborato da: ${lineage.processedBy}`}
    >
      {SOURCE_TYPE_ICONS[lineage.sourceType] || '📋'}
      v{lineage.version}
    </span>
  );
}
