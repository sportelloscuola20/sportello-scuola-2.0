import { describe, it, expect } from 'vitest';
import { formatDataItaliana, calcolaGiorniRimasti, deriveCriticalita, getTargetFromCategory } from '../../rag/helpers';

describe('RAG Helpers', () => {
  describe('formatDataItaliana', () => {
    it('should format date in Italian', () => {
      const result = formatDataItaliana('2026-07-12T00:00:00Z');
      expect(result).toContain('2026');
      expect(result).toMatch(/\d{1,2}\s+\w+\s+\d{4}/);
    });
  });

  describe('calcolaGiorniRimasti', () => {
    it('should calculate days remaining for future date', () => {
      const future = new Date();
      future.setDate(future.getDate() + 10);
      const days = calcolaGiorniRimasti(future.toISOString());
      expect(days).toBe(10);
    });

    it('should return 0 for past dates', () => {
      const past = new Date();
      past.setDate(past.getDate() - 5);
      const days = calcolaGiorniRimasti(past.toISOString());
      expect(days).toBe(0);
    });
  });

  describe('deriveCriticalita', () => {
    it('should return urgente for dates within 3 days', () => {
      const soon = new Date();
      soon.setDate(soon.getDate() + 2);
      expect(deriveCriticalita(soon.toISOString())).toBe('urgente');
    });

    it('should return alta for dates within 15 days', () => {
      const soon = new Date();
      soon.setDate(soon.getDate() + 10);
      expect(deriveCriticalita(soon.toISOString())).toBe('alta');
    });

    it('should return bassa for dates beyond 60 days', () => {
      const far = new Date();
      far.setDate(far.getDate() + 90);
      expect(deriveCriticalita(far.toISOString())).toBe('bassa');
    });
  });

  describe('getTargetFromCategory', () => {
    it('should return correct targets for known categories', () => {
      const targets = getTargetFromCategory('Bandi, Concorsi e Selezioni');
      expect(targets).toContain('docenti');
      expect(targets).toContain('aspiranti_docenti');
    });

    it('should default to docenti for unknown categories', () => {
      const targets = getTargetFromCategory('Categoria Sconosciuta');
      expect(targets).toEqual(['docenti']);
    });
  });
});
