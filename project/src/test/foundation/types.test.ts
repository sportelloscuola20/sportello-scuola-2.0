import { describe, it, expect } from 'vitest';
import { createLineage, withLineage } from '../../foundation/types';
import type { DataLineageObject } from '../../foundation/types';

describe('DataLineageObject', () => {
  it('should create lineage with defaults', () => {
    const lineage = createLineage('supabase_query', 'test-service');

    expect(lineage.sourceType).toBe('supabase_query');
    expect(lineage.processedBy).toBe('test-service');
    expect(lineage.version).toBe('1.0.0');
    expect(lineage.acquiredAt).toBeTruthy();
    expect(new Date(lineage.acquiredAt)).toBeInstanceOf(Date);
  });

  it('should create lineage with options', () => {
    const lineage = createLineage('ai_generation', 'gemini-adapter', {
      sourceId: 'doc-123',
      sourceTable: 'documenti_normativi',
      version: '2.0.0',
      metadata: { model: 'gemini-3.1-flash-lite' },
    });

    expect(lineage.sourceId).toBe('doc-123');
    expect(lineage.sourceTable).toBe('documenti_normativi');
    expect(lineage.version).toBe('2.0.0');
    expect(lineage.metadata).toEqual({ model: 'gemini-3.1-flash-lite' });
  });

  it('should wrap data with lineage', () => {
    const result = withLineage(
      { title: 'Test' },
      'rag_retrieval',
      'rag-service',
      { sourceId: 'rag-1' }
    );

    expect(result.data).toEqual({ title: 'Test' });
    expect(result.lineage.sourceType).toBe('rag_retrieval');
    expect(result.lineage.processedBy).toBe('rag-service');
    expect(result.lineage.sourceId).toBe('rag-1');
  });
});
