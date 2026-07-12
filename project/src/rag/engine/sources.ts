export enum AuthorityLevel {
  L1_DOGMATIC_TRUTH = 1,
  L2_SYSTEM_IMPACT = 2,
  L3_INCLUSION_STRATEGIC = 3,
  L4_SCIENTIFIC_VALIDATION = 4,
  L5_BINDING_JURISPRUDENCE = 5,
  L6_UNION_SENSORS = 6,
  L7_PRESS_SENSORS = 7,
}

/** AuthorityLevel → LivelloFonte mapping (canonical) */
export const AUTHORITY_TO_LIVELLO: Record<AuthorityLevel, 'A' | 'B' | 'C' | 'D' | 'E' | 'F'> = {
  [AuthorityLevel.L1_DOGMATIC_TRUTH]: 'A',
  [AuthorityLevel.L2_SYSTEM_IMPACT]: 'B',
  [AuthorityLevel.L3_INCLUSION_STRATEGIC]: 'B',
  [AuthorityLevel.L4_SCIENTIFIC_VALIDATION]: 'E',
  [AuthorityLevel.L5_BINDING_JURISPRUDENCE]: 'C',
  [AuthorityLevel.L6_UNION_SENSORS]: 'F',
  [AuthorityLevel.L7_PRESS_SENSORS]: 'F',
};

export interface SourceFeed {
  level: AuthorityLevel;
  name: string;
  baseUrl: string;
  feedUrl?: string;
  pollingIntervalMs: number;
  selectorRules?: string[];
  isTriggerOnly: boolean;
  triggerTargetLevel?: AuthorityLevel;
  /** Source credibility weight (0-100). Merged from FONT_REGISTRY. */
  peso: number;
  /** Region-specific source (null = nazionale) */
  regione?: string | null;
}

export const SOURCE_MATRIX: SourceFeed[] = [
  // === L1: FONTI PRIMARIE ASSOLUTE (peso 100) ===
  {
    level: AuthorityLevel.L1_DOGMATIC_TRUTH,
    name: 'MIM - Ministero Istruzione e Merito',
    baseUrl: 'https://www.mim.gov.it',
    feedUrl: 'https://www.mim.gov.it/feed',
    pollingIntervalMs: 60_000,
    isTriggerOnly: false,
    peso: 100,
  },
  {
    level: AuthorityLevel.L1_DOGMATIC_TRUTH,
    name: 'Gazzetta Ufficiale',
    baseUrl: 'https://www.gazzettaufficiale.it',
    feedUrl: 'https://www.gazzettaufficiale.it/feed',
    pollingIntervalMs: 120_000,
    isTriggerOnly: false,
    peso: 100,
  },
  {
    level: AuthorityLevel.L1_DOGMATIC_TRUTH,
    name: 'Normattiva',
    baseUrl: 'https://www.normattiva.it',
    pollingIntervalMs: 300_000,
    isTriggerOnly: false,
    peso: 100,
  },
  {
    level: AuthorityLevel.L1_DOGMATIC_TRUTH,
    name: 'INPS',
    baseUrl: 'https://www.inps.it',
    feedUrl: 'https://www.inps.it/feed',
    pollingIntervalMs: 120_000,
    isTriggerOnly: false,
    peso: 100,
  },
  {
    level: AuthorityLevel.L1_DOGMATIC_TRUTH,
    name: 'ARAN',
    baseUrl: 'https://www.aranagenzia.it',
    pollingIntervalMs: 300_000,
    isTriggerOnly: false,
    peso: 100,
  },
  {
    level: AuthorityLevel.L1_DOGMATIC_TRUTH,
    name: 'Parlamento Italiano',
    baseUrl: 'https://www.parlamento.it',
    pollingIntervalMs: 300_000,
    isTriggerOnly: false,
    peso: 100,
  },
  {
    level: AuthorityLevel.L1_DOGMATIC_TRUTH,
    name: 'Camera dei Deputati',
    baseUrl: 'https://www.camera.it',
    pollingIntervalMs: 300_000,
    isTriggerOnly: false,
    peso: 100,
  },
  {
    level: AuthorityLevel.L1_DOGMATIC_TRUTH,
    name: 'Senato della Repubblica',
    baseUrl: 'https://www.senato.it',
    pollingIntervalMs: 300_000,
    isTriggerOnly: false,
    peso: 100,
  },
  {
    level: AuthorityLevel.L1_DOGMATIC_TRUTH,
    name: 'Dipartimento Funzione Pubblica',
    baseUrl: 'https://www.funzionepubblica.gov.it',
    pollingIntervalMs: 300_000,
    isTriggerOnly: false,
    peso: 100,
  },

  // === L2: GOVERNANCE E SISTEMA SCUOLA (peso 90-95) ===
  {
    level: AuthorityLevel.L2_SYSTEM_IMPACT,
    name: 'INVALSI',
    baseUrl: 'https://www.invalsi.it',
    pollingIntervalMs: 300_000,
    isTriggerOnly: false,
    peso: 95,
  },
  {
    level: AuthorityLevel.L2_SYSTEM_IMPACT,
    name: 'INDIRE',
    baseUrl: 'https://www.indire.it',
    pollingIntervalMs: 300_000,
    isTriggerOnly: false,
    peso: 95,
  },
  {
    level: AuthorityLevel.L2_SYSTEM_IMPACT,
    name: 'Istituto Superiore di Sanità',
    baseUrl: 'https://www.iss.it',
    pollingIntervalMs: 300_000,
    isTriggerOnly: false,
    peso: 95,
  },
  {
    level: AuthorityLevel.L2_SYSTEM_IMPACT,
    name: 'ISTAT',
    baseUrl: 'https://www.istat.it',
    pollingIntervalMs: 360_000,
    isTriggerOnly: false,
    peso: 95,
  },

  // === L2: USR REGIONALI (peso 90) ===
  {
    level: AuthorityLevel.L2_SYSTEM_IMPACT,
    name: 'USR Abruzzo',
    baseUrl: 'https://www.mim.gov.it/web/abruzzo',
    pollingIntervalMs: 300_000,
    isTriggerOnly: false,
    peso: 90,
    regione: 'Abruzzo',
  },
  {
    level: AuthorityLevel.L2_SYSTEM_IMPACT,
    name: 'USR Basilicata',
    baseUrl: 'https://www.mim.gov.it/web/basilicata',
    pollingIntervalMs: 300_000,
    isTriggerOnly: false,
    peso: 90,
    regione: 'Basilicata',
  },
  {
    level: AuthorityLevel.L2_SYSTEM_IMPACT,
    name: 'USR Calabria',
    baseUrl: 'http://www.istruzione.calabria.it',
    pollingIntervalMs: 300_000,
    isTriggerOnly: false,
    peso: 90,
    regione: 'Calabria',
  },
  {
    level: AuthorityLevel.L2_SYSTEM_IMPACT,
    name: 'USR Campania',
    baseUrl: 'https://www.mim.gov.it/web/miur-usr-campania',
    pollingIntervalMs: 300_000,
    isTriggerOnly: false,
    peso: 90,
    regione: 'Campania',
  },
  {
    level: AuthorityLevel.L2_SYSTEM_IMPACT,
    name: 'USR Emilia-Romagna',
    baseUrl: 'https://istruzioneer.gov.it',
    pollingIntervalMs: 300_000,
    isTriggerOnly: false,
    peso: 90,
    regione: 'Emilia-Romagna',
  },
  {
    level: AuthorityLevel.L2_SYSTEM_IMPACT,
    name: 'USR Friuli-Venezia Giulia',
    baseUrl: 'https://usrfvg.gov.it/it/home/index.html',
    pollingIntervalMs: 300_000,
    isTriggerOnly: false,
    peso: 90,
    regione: 'Friuli-Venezia Giulia',
  },
  {
    level: AuthorityLevel.L2_SYSTEM_IMPACT,
    name: 'USR Lazio',
    baseUrl: 'https://www.ufficioscolasticoregionalelazio.it',
    pollingIntervalMs: 300_000,
    isTriggerOnly: false,
    peso: 90,
    regione: 'Lazio',
  },
  {
    level: AuthorityLevel.L2_SYSTEM_IMPACT,
    name: 'USR Liguria',
    baseUrl: 'https://www.istruzioneliguria.gov.it/',
    pollingIntervalMs: 300_000,
    isTriggerOnly: false,
    peso: 90,
    regione: 'Liguria',
  },
  {
    level: AuthorityLevel.L2_SYSTEM_IMPACT,
    name: 'USR Lombardia',
    baseUrl: 'https://www.mim.gov.it/web/usr-lombardia/',
    pollingIntervalMs: 300_000,
    isTriggerOnly: false,
    peso: 90,
    regione: 'Lombardia',
  },
  {
    level: AuthorityLevel.L2_SYSTEM_IMPACT,
    name: 'USR Marche',
    baseUrl: 'https://www.mim.gov.it/web/miur-usr-marche',
    pollingIntervalMs: 300_000,
    isTriggerOnly: false,
    peso: 90,
    regione: 'Marche',
  },
  {
    level: AuthorityLevel.L2_SYSTEM_IMPACT,
    name: 'USR Molise',
    baseUrl: 'https://www.mim.gov.it/web/molise',
    pollingIntervalMs: 300_000,
    isTriggerOnly: false,
    peso: 90,
    regione: 'Molise',
  },
  {
    level: AuthorityLevel.L2_SYSTEM_IMPACT,
    name: 'USR Piemonte',
    baseUrl: 'http://www.istruzionepiemonte.it',
    pollingIntervalMs: 300_000,
    isTriggerOnly: false,
    peso: 90,
    regione: 'Piemonte',
  },
  {
    level: AuthorityLevel.L2_SYSTEM_IMPACT,
    name: 'USR Puglia',
    baseUrl: 'https://www.pugliausr.gov.it/',
    pollingIntervalMs: 300_000,
    isTriggerOnly: false,
    peso: 90,
    regione: 'Puglia',
  },
  {
    level: AuthorityLevel.L2_SYSTEM_IMPACT,
    name: 'USR Sardegna',
    baseUrl: 'https://www.mim.gov.it/web/usr-sardegna',
    pollingIntervalMs: 300_000,
    isTriggerOnly: false,
    peso: 90,
    regione: 'Sardegna',
  },
  {
    level: AuthorityLevel.L2_SYSTEM_IMPACT,
    name: 'USR Sicilia',
    baseUrl: 'http://www.usr.sicilia.it',
    pollingIntervalMs: 300_000,
    isTriggerOnly: false,
    peso: 90,
    regione: 'Sicilia',
  },
  {
    level: AuthorityLevel.L2_SYSTEM_IMPACT,
    name: 'USR Toscana',
    baseUrl: 'https://www.mim.gov.it/web/miur-usr-toscana',
    pollingIntervalMs: 300_000,
    isTriggerOnly: false,
    peso: 90,
    regione: 'Toscana',
  },
  {
    level: AuthorityLevel.L2_SYSTEM_IMPACT,
    name: 'USR Umbria',
    baseUrl: 'http://www.istruzione.umbria.it',
    pollingIntervalMs: 300_000,
    isTriggerOnly: false,
    peso: 90,
    regione: 'Umbria',
  },
  {
    level: AuthorityLevel.L2_SYSTEM_IMPACT,
    name: 'USR Veneto',
    baseUrl: 'https://istruzioneveneto.gov.it',
    pollingIntervalMs: 300_000,
    isTriggerOnly: false,
    peso: 90,
    regione: 'Veneto',
  },

  // === L3: INCLUSIONE E DISABILITÀ ===
  {
    level: AuthorityLevel.L3_INCLUSION_STRATEGIC,
    name: 'Osservatorio Permanente Inclusione',
    baseUrl: 'https://www.osservatorioinclusione.it',
    pollingIntervalMs: 300_000,
    isTriggerOnly: false,
    peso: 90,
  },
  {
    level: AuthorityLevel.L3_INCLUSION_STRATEGIC,
    name: 'Ministero per le Disabilità',
    baseUrl: 'https://www.disabilita.gov.it',
    pollingIntervalMs: 300_000,
    isTriggerOnly: false,
    peso: 90,
  },
  {
    level: AuthorityLevel.L3_INCLUSION_STRATEGIC,
    name: 'OMS - Linee guida ICF',
    baseUrl: 'https://www.who.int',
    pollingIntervalMs: 600_000,
    isTriggerOnly: false,
    peso: 95,
  },

  // === L4: RICERCA SCIENTIFICA (peso 90) ===
  {
    level: AuthorityLevel.L4_SCIENTIFIC_VALIDATION,
    name: 'ERIC',
    baseUrl: 'https://eric.ed.gov',
    pollingIntervalMs: 600_000,
    isTriggerOnly: false,
    peso: 90,
  },
  {
    level: AuthorityLevel.L4_SCIENTIFIC_VALIDATION,
    name: 'OECD Education',
    baseUrl: 'https://www.oecd.org/education',
    pollingIntervalMs: 600_000,
    isTriggerOnly: false,
    peso: 95,
  },
  {
    level: AuthorityLevel.L4_SCIENTIFIC_VALIDATION,
    name: 'UNESCO Education',
    baseUrl: 'https://www.unesco.org/education',
    pollingIntervalMs: 600_000,
    isTriggerOnly: false,
    peso: 95,
  },
  {
    level: AuthorityLevel.L4_SCIENTIFIC_VALIDATION,
    name: 'Commissione Europea - Istruzione',
    baseUrl: 'https://education.ec.europa.eu',
    pollingIntervalMs: 600_000,
    isTriggerOnly: false,
    peso: 95,
  },
  {
    level: AuthorityLevel.L4_SCIENTIFIC_VALIDATION,
    name: 'PubMed - Neuroscience/BES/DSA',
    baseUrl: 'https://pubmed.ncbi.nlm.nih.gov',
    pollingIntervalMs: 600_000,
    isTriggerOnly: false,
    peso: 90,
  },
  {
    level: AuthorityLevel.L4_SCIENTIFIC_VALIDATION,
    name: 'Google Scholar',
    baseUrl: 'https://scholar.google.com',
    pollingIntervalMs: 600_000,
    isTriggerOnly: false,
    peso: 90,
  },

  // === L5: GIURISPRUDENZA (peso 98) ===
  {
    level: AuthorityLevel.L5_BINDING_JURISPRUDENCE,
    name: 'Giustizia Amministrativa',
    baseUrl: 'https://www.giustizia-amministrativa.it',
    pollingIntervalMs: 180_000,
    isTriggerOnly: false,
    peso: 98,
  },
  {
    level: AuthorityLevel.L5_BINDING_JURISPRUDENCE,
    name: 'Corte Costituzionale',
    baseUrl: 'https://www.cortecostituzionale.it',
    pollingIntervalMs: 180_000,
    isTriggerOnly: false,
    peso: 98,
  },
  {
    level: AuthorityLevel.L5_BINDING_JURISPRUDENCE,
    name: 'Corte di Cassazione',
    baseUrl: 'https://www.cortedicassazione.it',
    pollingIntervalMs: 180_000,
    isTriggerOnly: false,
    peso: 98,
  },

  // === L6: SINDACATI (peso 60, trigger-only) ===
  {
    level: AuthorityLevel.L6_UNION_SENSORS,
    name: 'FLC CGIL',
    baseUrl: 'https://www.flcgcgil.it',
    feedUrl: 'https://www.flcgcgil.it/feed/',
    pollingIntervalMs: 60_000,
    isTriggerOnly: true,
    triggerTargetLevel: AuthorityLevel.L1_DOGMATIC_TRUTH,
    peso: 60,
  },
  {
    level: AuthorityLevel.L6_UNION_SENSORS,
    name: 'CISL Scuola',
    baseUrl: 'https://www.cislscuola.it',
    feedUrl: 'https://www.cislscuola.it/feed',
    pollingIntervalMs: 60_000,
    isTriggerOnly: true,
    triggerTargetLevel: AuthorityLevel.L1_DOGMATIC_TRUTH,
    peso: 60,
  },
  {
    level: AuthorityLevel.L6_UNION_SENSORS,
    name: 'UIL Scuola',
    baseUrl: 'https://uilscuolanazionale.it',
    feedUrl: 'https://www.uilscuola.it/feed',
    pollingIntervalMs: 60_000,
    isTriggerOnly: true,
    triggerTargetLevel: AuthorityLevel.L1_DOGMATIC_TRUTH,
    peso: 60,
  },
  {
    level: AuthorityLevel.L6_UNION_SENSORS,
    name: 'SNALS Confsal',
    baseUrl: 'https://www.snals.it',
    pollingIntervalMs: 60_000,
    isTriggerOnly: true,
    triggerTargetLevel: AuthorityLevel.L1_DOGMATIC_TRUTH,
    peso: 60,
  },
  {
    level: AuthorityLevel.L6_UNION_SENSORS,
    name: 'ANIEF',
    baseUrl: 'https://www.anief.org',
    pollingIntervalMs: 60_000,
    isTriggerOnly: true,
    triggerTargetLevel: AuthorityLevel.L1_DOGMATIC_TRUTH,
    peso: 60,
  },

  // === L7: STAMPA DI SETTORE (peso 60, trigger-only) ===
  {
    level: AuthorityLevel.L7_PRESS_SENSORS,
    name: 'Orizzonte Scuola',
    baseUrl: 'https://www.orizzontescuola.it',
    feedUrl: 'https://www.orizzontescuola.it/feed',
    pollingIntervalMs: 60_000,
    isTriggerOnly: true,
    triggerTargetLevel: AuthorityLevel.L1_DOGMATIC_TRUTH,
    peso: 60,
  },
  {
    level: AuthorityLevel.L7_PRESS_SENSORS,
    name: 'Tecnica della Scuola',
    baseUrl: 'https://www.tecnicadellascuola.it',
    feedUrl: 'https://www.tecnicadellascuola.it/feed',
    pollingIntervalMs: 60_000,
    isTriggerOnly: true,
    triggerTargetLevel: AuthorityLevel.L1_DOGMATIC_TRUTH,
    peso: 60,
  },
  {
    level: AuthorityLevel.L7_PRESS_SENSORS,
    name: 'Tuttoscuola',
    baseUrl: 'https://www.tuttoscuola.com',
    feedUrl: 'https://www.tuttoscuola.com/feed',
    pollingIntervalMs: 60_000,
    isTriggerOnly: true,
    triggerTargetLevel: AuthorityLevel.L1_DOGMATIC_TRUTH,
    peso: 60,
  },
];

/**
 * Canonical helper: get source by name (case-insensitive).
 * Replaces both getFonteInfo() and getFonteByUrl().
 */
export function getSourceByName(name: string): SourceFeed | undefined {
  return SOURCE_MATRIX.find(s => s.name.toLowerCase() === name.toLowerCase());
}

/**
 * Canonical helper: get source by URL (matches baseUrl prefix).
 */
export function getSourceByUrl(url: string): SourceFeed | undefined {
  return SOURCE_MATRIX.find(s => url.startsWith(s.baseUrl) || s.baseUrl.startsWith(url));
}

/**
 * Canonical helper: get peso for a source name.
 */
export function getSourcePeso(name: string): number {
  return getSourceByName(name)?.peso ?? 50;
}

/**
 * @deprecated Use SOURCE_MATRIX and getSourceByName/getSourceByUrl instead.
 * This re-export exists for backward compatibility with intelligence-engine.ts.
 */
export const FONT_REGISTRY = {
  A: SOURCE_MATRIX.filter(s => s.level === AuthorityLevel.L1_DOGMATIC_TRUTH).map(s => ({
    livello: 'A' as const, nome: s.name, url: s.baseUrl, peso: s.peso,
  })),
  B: SOURCE_MATRIX.filter(s => s.level === AuthorityLevel.L2_SYSTEM_IMPACT).map(s => ({
    livello: 'B' as const, nome: s.name, url: s.baseUrl, peso: s.peso,
  })),
  C: SOURCE_MATRIX.filter(s => s.level === AuthorityLevel.L5_BINDING_JURISPRUDENCE).map(s => ({
    livello: 'C' as const, nome: s.name, url: s.baseUrl, peso: s.peso,
  })),
  D: SOURCE_MATRIX.filter(s => s.level === AuthorityLevel.L3_INCLUSION_STRATEGIC).map(s => ({
    livello: 'D' as const, nome: s.name, url: s.baseUrl, peso: s.peso,
  })),
  E: SOURCE_MATRIX.filter(s => s.level === AuthorityLevel.L4_SCIENTIFIC_VALIDATION).map(s => ({
    livello: 'E' as const, nome: s.name, url: s.baseUrl, peso: s.peso,
  })),
  F: SOURCE_MATRIX.filter(s =>
    s.level === AuthorityLevel.L6_UNION_SENSORS || s.level === AuthorityLevel.L7_PRESS_SENSORS
  ).map(s => ({
    livello: 'F' as const, nome: s.name, url: s.baseUrl, peso: s.peso,
  })),
};
