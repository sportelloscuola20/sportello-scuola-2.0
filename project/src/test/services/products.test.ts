import { describe, it, expect } from 'vitest';
import { PRODUCT_REGISTRY, getProduct, getActiveProducts, createCanonicalItem } from '../../services/products';

describe('ProductService', () => {
  it('should have all products registered', () => {
    expect(Object.keys(PRODUCT_REGISTRY)).toHaveLength(12);
    expect(PRODUCT_REGISTRY.normativa).toBeDefined();
    expect(PRODUCT_REGISTRY.interpelli).toBeDefined();
    expect(PRODUCT_REGISTRY.nomine).toBeUndefined(); // old ID removed
    expect(PRODUCT_REGISTRY.osservatorio_nomine).toBeDefined();
    expect(PRODUCT_REGISTRY.hub_eventi).toBeDefined();
    expect(PRODUCT_REGISTRY.consulente).toBeDefined();
    expect(PRODUCT_REGISTRY.area_riservata).toBeDefined();
    expect(PRODUCT_REGISTRY.notizie_scadenze).toBeDefined();
    expect(PRODUCT_REGISTRY.calcolo_punteggio).toBeDefined();
    expect(PRODUCT_REGISTRY.simulatore_nomine).toBeDefined();
    expect(PRODUCT_REGISTRY.guida_completa).toBeDefined();
    expect(PRODUCT_REGISTRY.bandi).toBeDefined();
    expect(PRODUCT_REGISTRY.gps_calculator).toBeDefined();
  });

  it('should get product by ID', () => {
    const normativa = getProduct('normativa');
    expect(normativa.name).toBe('Normativa & Documenti');
    expect(normativa.route).toBe('/normativa');
  });

  it('should return active products only', () => {
    const active = getActiveProducts();
    expect(active.every(p => p.status !== 'deprecated')).toBe(true);
  });

  it('should create canonical items', () => {
    const item = createCanonicalItem('normativa', {
      id: 'doc-1',
      title: 'Test Document',
      description: 'A test document',
      category: 'Normative',
      tags: ['ccnl'],
    });

    expect(item.product).toBe('normativa');
    expect(item.title).toBe('Test Document');
    expect(item.lineage).toBeDefined();
    expect(item.lineage.sourceType).toBe('supabase_query');
  });
});
