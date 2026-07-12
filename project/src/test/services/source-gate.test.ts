import { describe, it, expect } from 'vitest';
import { validateSourceGate, validateContentAcceptance } from '../../services/source-gate';
import { SOURCE_MATRIX } from '../../rag/engine/sources';

describe('SourceGateService', () => {
  describe('validateSourceGate', () => {
    it('should approve valid source (not in matrix)', () => {
      const source = {
        level: 1 as any,
        name: 'Nuova Fonte Unica',
        baseUrl: 'https://www.nuovofonte.it',
        pollingIntervalMs: 60000,
        isTriggerOnly: false,
        peso: 95,
      };
      const result = validateSourceGate(source, []);

      expect(result.approved).toBe(true);
      expect(result.score).toBe(6);
      expect(result.criteria).toHaveLength(6);
    });

    it('should detect duplicate sources', () => {
      const source = { ...SOURCE_MATRIX[0] };
      const result = validateSourceGate(source, SOURCE_MATRIX);

      const dupCriterion = result.criteria.find(c => c.id === 'no_duplication');
      expect(dupCriterion?.passed).toBe(false);
    });

    it('should reject source with low peso', () => {
      const lowPesoSource = {
        level: 6 as any,
        name: 'Test Source',
        baseUrl: 'https://example.com',
        pollingIntervalMs: 60000,
        isTriggerOnly: false,
        peso: 30,
      };
      const result = validateSourceGate(lowPesoSource, []);

      const valueCriterion = result.criteria.find(c => c.id === 'value');
      expect(valueCriterion?.passed).toBe(false);
    });
  });

  describe('validateContentAcceptance', () => {
    it('should accept valid content', () => {
      const content = `Il CCNL Comparto Istruzione e Ricerca 2019-2021 è stato firmato definitivamente il **18 gennaio 2024** ed è il contratto collettivo nazionale oggi vigente per tutto il personale del comparto.

PRINCIPALI NOVITÀ:
1. Permessi retribuiti per precari
2. Operatore Scolastico (OS)
3. CIAD obbligatoria

_Fonte: CCNL Comparto Istruzione e Ricerca 2019-2021, artt. 33-39_`;

      const result = validateContentAcceptance(content, 'test');
      expect(result.accepted).toBe(true);
      expect(result.score).toBe(4);
    });

    it('should reject too-short content', () => {
      const result = validateContentAcceptance('Breve.', 'test');
      expect(result.accepted).toBe(false);

      const wordCount = result.criteria.find(c => c.id === 'word_count');
      expect(wordCount?.passed).toBe(false);
    });
  });
});
