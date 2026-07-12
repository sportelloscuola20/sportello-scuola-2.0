import { describe, it, expect } from 'vitest';
import { SOURCE_MATRIX, getSourceByName, getSourceByUrl, getSourcePeso, AUTHORITY_TO_LIVELLO } from '../../../rag/engine/sources';

describe('Source Registry (SSOT)', () => {
  it('should have all sources with peso field', () => {
    SOURCE_MATRIX.forEach(source => {
      expect(typeof source.peso).toBe('number');
      expect(source.peso).toBeGreaterThanOrEqual(0);
      expect(source.peso).toBeLessThanOrEqual(100);
    });
  });

  it('should have 50+ sources total', () => {
    expect(SOURCE_MATRIX.length).toBeGreaterThanOrEqual(50);
  });

  it('should find source by name', () => {
    const mim = getSourceByName('MIM - Ministero Istruzione e Merito');
    expect(mim).toBeDefined();
    expect(mim!.peso).toBe(100);
  });

  it('should find source by URL', () => {
    const source = getSourceByUrl('https://www.normattiva.it/some-page');
    expect(source).toBeDefined();
    expect(source!.name).toBe('Normattiva');
  });

  it('should get peso by name', () => {
    expect(getSourcePeso('MIM - Ministero Istruzione e Merito')).toBe(100);
    expect(getSourcePeso('Orizzonte Scuola')).toBe(60);
    expect(getSourcePeso('Non Esiste')).toBe(50); // default
  });

  it('should map authority levels to livelli', () => {
    expect(AUTHORITY_TO_LIVELLO[1]).toBe('A'); // L1 → A
    expect(AUTHORITY_TO_LIVELLO[5]).toBe('C'); // L5 → C
    expect(AUTHORITY_TO_LIVELLO[6]).toBe('F'); // L6 → F
  });

  it('should have regional sources with regione field', () => {
    const usr = SOURCE_MATRIX.filter(s => s.regione);
    expect(usr.length).toBeGreaterThanOrEqual(18); // 18 regions
  });
});
