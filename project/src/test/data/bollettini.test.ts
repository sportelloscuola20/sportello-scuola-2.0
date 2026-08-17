import { describe, it, expect } from 'vitest';
import {
  CLASSI_CONCORSO,
  ordinaPerCompetizione,
  filtraPerCompetizione,
  getClasseByCodice,
  type BollettinoEntry,
} from '../../data/bollettini-nomine';

function makeEntry(overrides: Partial<BollettinoEntry>): BollettinoEntry {
  return {
    id: 'e1',
    classeCodice: 'A-26',
    provinciaSigla: 'RM',
    annoScolastico: '2025/2026',
    turno: 1,
    dataBollettino: '2026-01-10',
    periodoChiamata: 'gennaio',
    tipoGraduatoria: 'GPS I Fascia',
    punteggioMinimo: 50,
    punteggioMassimo: 100,
    posizioneUltimaConvocazione: 30,
    posizioniAssegnate: 25,
    candidatiInGraduatoria: 100,
    tipoContratto: 'TD',
    competizione: 'media',
    trend: 'stabile',
    ...overrides,
  };
}

describe('Bollettini helpers', () => {
  describe('CLASSI_CONCORSO', () => {
    it('should include all official classes', () => {
      expect(CLASSI_CONCORSO.length).toBeGreaterThanOrEqual(90);
      expect(CLASSI_CONCORSO.some(c => c.codice === '00AA')).toBe(true);
      expect(CLASSI_CONCORSO.some(c => c.codice === 'ADSS')).toBe(true);
      expect(CLASSI_CONCORSO.some(c => c.codice === 'A-37')).toBe(true);
      expect(CLASSI_CONCORSO.some(c => c.codice === 'B-12')).toBe(true);
    });

    it('should include all ordini di scuola', () => {
      const ordini = new Set(CLASSI_CONCORSO.map(c => c.ordineScuola));
      expect(ordini.has('Infanzia')).toBe(true);
      expect(ordini.has('Primaria')).toBe(true);
      expect(ordini.has('Secondaria I Grado')).toBe(true);
      expect(ordini.has('Secondaria II Grado')).toBe(true);
    });
  });

  describe('getClasseByCodice', () => {
    it('should find a class by codice', () => {
      const cls = getClasseByCodice('A-26');
      expect(cls).toBeDefined();
      expect(cls?.materia).toContain('Matematica');
    });

    it('should return undefined for unknown codice', () => {
      expect(getClasseByCodice('ZZ-99')).toBeUndefined();
    });
  });

  describe('ordinaPerCompetizione', () => {
    it('should sort from highest to lowest competition', () => {
      const entries = [
        makeEntry({ id: 'a', competizione: 'media' }),
        makeEntry({ id: 'b', competizione: 'molto_alta' }),
        makeEntry({ id: 'c', competizione: 'bassa' }),
      ];
      const sorted = ordinaPerCompetizione(entries);
      expect(sorted[0].competizione).toBe('molto_alta');
      expect(sorted[1].competizione).toBe('media');
      expect(sorted[2].competizione).toBe('bassa');
    });

    it('should not mutate the input array', () => {
      const entries = [makeEntry({ competizione: 'bassa' }), makeEntry({ competizione: 'alta' })];
      const before = entries.map(e => e.id);
      ordinaPerCompetizione(entries);
      expect(entries.map(e => e.id)).toEqual(before);
    });
  });

  describe('filtraPerCompetizione', () => {
    it('should filter entries by competition level', () => {
      const entries = [
        makeEntry({ id: 'a', competizione: 'alta' }),
        makeEntry({ id: 'b', competizione: 'media' }),
        makeEntry({ id: 'c', competizione: 'alta' }),
      ];
      const alta = filtraPerCompetizione(entries, 'alta');
      expect(alta).toHaveLength(2);
      expect(alta.every(e => e.competizione === 'alta')).toBe(true);
    });
  });
});
