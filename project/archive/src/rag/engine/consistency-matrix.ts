/**
 * ============================================================================
 *  EMA §7 — CONSISTENCY MATRIX
 *  Cross-product consistency validation and health monitoring.
 * ============================================================================
 */

import { createLineage, type DataLineageObject } from '../../foundation/types';
import { PRODUCT_REGISTRY, PRODUCT_CONTRACTS, type ProductId } from '../../services/products';

// ─── Matrix Types ────────────────────────────────────────────────────────────

export interface ConsistencyCheck {
  id: string;
  name: string;
  description: string;
  category: 'data_model' | 'event' | 'search' | 'notification' | 'lifecycle' | 'security';
  severity: 'critical' | 'high' | 'medium' | 'low';
  check: (products: ProductId[]) => ConsistencyResult;
}

export interface ConsistencyResult {
  passed: boolean;
  products: ProductId[];
  message: string;
  details?: string[];
  lineage: DataLineageObject;
}

export interface ConsistencyReport {
  timestamp: string;
  totalChecks: number;
  passed: number;
  failed: number;
  warnings: number;
  results: ConsistencyResult[];
  score: number; // 0-100
  lineage: DataLineageObject;
}

// ─── Consistency Checks ──────────────────────────────────────────────────────

const CHECKS: ConsistencyCheck[] = [
  {
    id: 'CM-001',
    name: 'All products have contracts',
    description: 'Every product in the registry must have a corresponding contract definition',
    category: 'data_model',
    severity: 'critical',
    check: (products) => {
      const missing = products.filter(p => !PRODUCT_CONTRACTS[p]);
      return {
        passed: missing.length === 0,
        products: missing,
        message: missing.length === 0
          ? 'All products have contracts'
          : `${missing.length} products missing contracts: ${missing.join(', ')}`,
        lineage: createLineage('consistency_check', 'CM-001', { missing }),
      };
    },
  },
  {
    id: 'CM-002',
    name: 'Event declarations are unique',
    description: 'No two products should declare the same event type',
    category: 'event',
    severity: 'high',
    check: (products) => {
      const allEvents: string[] = [];
      const duplicates: string[] = [];
      for (const p of products) {
        const contract = PRODUCT_CONTRACTS[p];
        if (contract) {
          for (const e of contract.eventDeclarations) {
            if (allEvents.includes(e)) duplicates.push(e);
            allEvents.push(e);
          }
        }
      }
      return {
        passed: duplicates.length === 0,
        products,
        message: duplicates.length === 0
          ? 'All event declarations are unique'
          : `Duplicate events found: ${duplicates.join(', ')}`,
        details: duplicates,
        lineage: createLineage('consistency_check', 'CM-002', { duplicates }),
      };
    },
  },
  {
    id: 'CM-003',
    name: 'Search configurations are valid',
    description: 'Products with search enabled must have facets and boost > 0',
    category: 'search',
    severity: 'medium',
    check: (products) => {
      const invalid: ProductId[] = [];
      for (const p of products) {
        const contract = PRODUCT_CONTRACTS[p];
        if (contract?.searchConfig.enabled) {
          if (contract.searchConfig.boost <= 0 || contract.searchConfig.facets.length === 0) {
            invalid.push(p);
          }
        }
      }
      return {
        passed: invalid.length === 0,
        products: invalid,
        message: invalid.length === 0
          ? 'All search configurations are valid'
          : `Invalid search configs: ${invalid.join(', ')}`,
        lineage: createLineage('consistency_check', 'CM-003', { invalid }),
      };
    },
  },
  {
    id: 'CM-004',
    name: 'Notification channels are supported',
    description: 'Products with notifications must use valid channels',
    category: 'notification',
    severity: 'medium',
    check: (products) => {
      const validChannels = ['in_app', 'email', 'push'];
      const invalid: ProductId[] = [];
      for (const p of products) {
        const contract = PRODUCT_CONTRACTS[p];
        if (contract?.notificationConfig.enabled) {
          const bad = contract.notificationConfig.channels.filter(c => !validChannels.includes(c));
          if (bad.length > 0) invalid.push(p);
        }
      }
      return {
        passed: invalid.length === 0,
        products: invalid,
        message: invalid.length === 0
          ? 'All notification channels are valid'
          : `Invalid channels: ${invalid.join(', ')}`,
        lineage: createLineage('consistency_check', 'CM-004', { invalid }),
      };
    },
  },
  {
    id: 'CM-005',
    name: 'Lifecycle retention is positive',
    description: 'All products must have positive retention days',
    category: 'lifecycle',
    severity: 'high',
    check: (products) => {
      const invalid: ProductId[] = [];
      for (const p of products) {
        const contract = PRODUCT_CONTRACTS[p];
        if (contract) {
          if (contract.lifecycle.retentionDays <= 0 || contract.lifecycle.archiveAfterDays <= 0) {
            invalid.push(p);
          }
        }
      }
      return {
        passed: invalid.length === 0,
        products: invalid,
        message: invalid.length === 0
          ? 'All lifecycle retentions are positive'
          : `Invalid lifecycle configs: ${invalid.join(', ')}`,
        lineage: createLineage('consistency_check', 'CM-005', { invalid }),
      };
    },
  },
  {
    id: 'CM-006',
    name: 'Product routes are unique',
    description: 'No two products should share the same route',
    category: 'data_model',
    severity: 'critical',
    check: (products) => {
      const routes: Record<string, ProductId[]> = {};
      for (const p of products) {
        const route = PRODUCT_REGISTRY[p].route;
        if (!routes[route]) routes[route] = [];
        routes[route].push(p);
      }
      const conflicts = Object.entries(routes).filter(([_, prods]) => prods.length > 1);
      return {
        passed: conflicts.length === 0,
        products: conflicts.flatMap(([_, prods]) => prods),
        message: conflicts.length === 0
          ? 'All routes are unique'
          : `Route conflicts: ${conflicts.map(([r, p]) => `${r} → ${p.join(', ')}`).join('; ')}`,
        lineage: createLineage('consistency_check', 'CM-006', { conflicts }),
      };
    },
  },
  {
    id: 'CM-007',
    name: 'Data sources are declared',
    description: 'All products must declare at least one data source',
    category: 'data_model',
    severity: 'high',
    check: (products) => {
      const empty: ProductId[] = [];
      for (const p of products) {
        const contract = PRODUCT_CONTRACTS[p];
        if (contract && contract.dataSources.length === 0) {
          empty.push(p);
        }
      }
      return {
        passed: empty.length === 0,
        products: empty,
        message: empty.length === 0
          ? 'All products declare data sources'
          : `No data sources: ${empty.join(', ')}`,
        lineage: createLineage('consistency_check', 'CM-007', { empty }),
      };
    },
  },
  {
    id: 'CM-008',
    name: 'Product capabilities are non-empty',
    description: 'All products must have at least one capability declared',
    category: 'data_model',
    severity: 'medium',
    check: (products) => {
      const empty: ProductId[] = [];
      for (const p of products) {
        const contract = PRODUCT_CONTRACTS[p];
        if (contract && contract.capabilities.length === 0) {
          empty.push(p);
        }
      }
      return {
        passed: empty.length === 0,
        products: empty,
        message: empty.length === 0
          ? 'All products have capabilities'
          : `No capabilities: ${empty.join(', ')}`,
        lineage: createLineage('consistency_check', 'CM-008', { empty }),
      };
    },
  },
];

// ─── Consistency Matrix Engine ───────────────────────────────────────────────

/** Run all consistency checks across all products */
export function runConsistencyMatrix(productIds?: ProductId[]): ConsistencyReport {
  const products = productIds || (Object.keys(PRODUCT_REGISTRY) as ProductId[]);
  const results: ConsistencyResult[] = [];

  for (const check of CHECKS) {
    results.push(check.check(products));
  }

  const passed = results.filter(r => r.passed).length;
  const failed = results.filter(r => !r.passed).length;
  const score = Math.round((passed / results.length) * 100);

  return {
    timestamp: new Date().toISOString(),
    totalChecks: results.length,
    passed,
    failed,
    warnings: 0,
    results,
    score,
    lineage: createLineage('consistency_matrix', 'full_matrix', {
      totalChecks: results.length,
      passed,
      failed,
      score,
    }),
  };
}

/** Run checks for a specific category */
export function runCategoryChecks(
  category: ConsistencyCheck['category'],
  productIds?: ProductId[]
): ConsistencyResult[] {
  const products = productIds || (Object.keys(PRODUCT_REGISTRY) as ProductId[]);
  return CHECKS.filter(c => c.category === category).map(c => c.check(products));
}

/** Get all available checks */
export function getConsistencyChecks(): ConsistencyCheck[] {
  return [...CHECKS];
}

/** Get check by ID */
export function getConsistencyCheck(id: string): ConsistencyCheck | undefined {
  return CHECKS.find(c => c.id === id);
}
