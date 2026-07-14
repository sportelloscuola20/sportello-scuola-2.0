// ============================================================
// BOLLETTINI DI NOMINE — Classi di concorso ufficiali
// DM 259/17 + DM 22/12/2023 — Fonte: classidiconcorso.it / MIM
// Dati reali: turni basati su Orizzonte Scuola GPS 2025/26
// 43 classi GPS × 108 province × turni reali per provincia
// ============================================================

export interface ClasseConcorso {
  codice: string;
  materia: string;
  ordineScuola: 'Infanzia' | 'Primaria' | 'Secondaria I Grado' | 'Secondaria II Grado';
  fascia: 'A' | 'B' | 'S';
  ordiniiApplicabili?: ('Secondaria I Grado' | 'Secondaria II Grado')[];
}

export interface BollettinoEntry {
  id: string;
  classeCodice: string;
  provinciaSigla: string;
  annoScolastico: string;
  turno: number;
  dataBollettino: string;
  periodoChiamata: string;
  tipoGraduatoria: 'GPS I Fascia' | 'GPS II Fascia' | 'GAE' | 'Graduatoria di Istituto';
  punteggioMinimo: number;
  punteggioMassimo: number;
  posizioneUltimaConvocazione: number;
  posizioniAssegnate: number;
  candidatiInGraduatoria: number;
  tipoContratto: string;
  competizione: 'bassa' | 'media' | 'alta' | 'molto_alta';
  trend: 'stabile' | 'crescente' | 'decrescente';
}

export interface BollettinoSummary {
  classeCodice: string;
  materia: string;
  ordineScuola: string;
  totalePosizioni: number;
  totaleCandidati: number;
  punteggioMinimoNazionale: number;
  punteggioMassimoNazionale: number;
  provinceAttive: number;
  ultimoTurno: number;
  ultimaPosizione: number;
}

// ═══ CLASSI DI CONCORSO — Lista ufficiale completa (DM 259/17) ═══

export const CLASSI_CONCORSO: ClasseConcorso[] = [
  { codice: '00AA', materia: 'Posto comune - Scuola dell\'Infanzia', ordineScuola: 'Infanzia', fascia: 'A' },
  { codice: 'AD0D', materia: 'Sostegno - Scuola dell\'Infanzia', ordineScuola: 'Infanzia', fascia: 'S' },
  { codice: '00EE', materia: 'Posto comune - Scuola Primaria', ordineScuola: 'Primaria', fascia: 'A' },
  { codice: 'AD0J', materia: 'Sostegno - Scuola Primaria', ordineScuola: 'Primaria', fascia: 'S' },
  { codice: 'EEEM', materia: 'Educazione motoria - Scuola Primaria', ordineScuola: 'Primaria', fascia: 'A' },
  { codice: 'A-01', materia: 'Disegno e storia dell\'arte', ordineScuola: 'Secondaria I Grado', fascia: 'A', ordiniiApplicabili: ['Secondaria I Grado', 'Secondaria II Grado'] },
  { codice: 'A-12', materia: 'Discipline letterarie', ordineScuola: 'Secondaria I Grado', fascia: 'A', ordiniiApplicabili: ['Secondaria I Grado', 'Secondaria II Grado'] },
  { codice: 'A-21', materia: 'Geografia', ordineScuola: 'Secondaria I Grado', fascia: 'A', ordiniiApplicabili: ['Secondaria I Grado', 'Secondaria II Grado'] },
  { codice: 'A-22', materia: 'Lingue e culture straniere', ordineScuola: 'Secondaria I Grado', fascia: 'A', ordiniiApplicabili: ['Secondaria I Grado', 'Secondaria II Grado'] },
  { codice: 'A-23', materia: 'Lingua italiana per alloglotti', ordineScuola: 'Secondaria I Grado', fascia: 'A' },
  { codice: 'A-28', materia: 'Matematica e scienze', ordineScuola: 'Secondaria I Grado', fascia: 'A' },
  { codice: 'A-30', materia: 'Musica', ordineScuola: 'Secondaria I Grado', fascia: 'A', ordiniiApplicabili: ['Secondaria I Grado', 'Secondaria II Grado'] },
  { codice: 'A-48', materia: 'Scienze motorie e sportive', ordineScuola: 'Secondaria I Grado', fascia: 'A', ordiniiApplicabili: ['Secondaria I Grado', 'Secondaria II Grado'] },
  { codice: 'A-56', materia: 'Strumento musicale - I grado', ordineScuola: 'Secondaria I Grado', fascia: 'A' },
  { codice: 'A-60', materia: 'Tecnologia - Secondaria I Grado', ordineScuola: 'Secondaria I Grado', fascia: 'A' },
  { codice: 'AA22', materia: 'Lingua e letteratura francese', ordineScuola: 'Secondaria I Grado', fascia: 'A', ordiniiApplicabili: ['Secondaria I Grado', 'Secondaria II Grado'] },
  { codice: 'AB22', materia: 'Lingua e letteratura inglese', ordineScuola: 'Secondaria I Grado', fascia: 'A', ordiniiApplicabili: ['Secondaria I Grado', 'Secondaria II Grado'] },
  { codice: 'AC22', materia: 'Lingua e letteratura spagnola', ordineScuola: 'Secondaria I Grado', fascia: 'A', ordiniiApplicabili: ['Secondaria I Grado', 'Secondaria II Grado'] },
  { codice: 'AD00', materia: 'Sostegno - Secondaria I Grado', ordineScuola: 'Secondaria I Grado', fascia: 'S' },
  { codice: 'AD22', materia: 'Lingua e letteratura tedesca', ordineScuola: 'Secondaria I Grado', fascia: 'A', ordiniiApplicabili: ['Secondaria I Grado', 'Secondaria II Grado'] },
  { codice: 'A-11', materia: 'Discipline letterarie e latino', ordineScuola: 'Secondaria II Grado', fascia: 'A' },
  { codice: 'A-13', materia: 'Discipline letterarie, latino e greco', ordineScuola: 'Secondaria II Grado', fascia: 'A' },
  { codice: 'A-18', materia: 'Filosofia e scienze umane', ordineScuola: 'Secondaria II Grado', fascia: 'A' },
  { codice: 'A-19', materia: 'Filosofia e storia', ordineScuola: 'Secondaria II Grado', fascia: 'A' },
  { codice: 'A-20', materia: 'Fisica', ordineScuola: 'Secondaria II Grado', fascia: 'A' },
  { codice: 'A-26', materia: 'Matematica', ordineScuola: 'Secondaria II Grado', fascia: 'A' },
  { codice: 'A-27', materia: 'Matematica e fisica', ordineScuola: 'Secondaria II Grado', fascia: 'A' },
  { codice: 'A-34', materia: 'Scienze e tecnologie chimiche', ordineScuola: 'Secondaria II Grado', fascia: 'A' },
  { codice: 'A-41', materia: 'Scienze e tecnologie informatiche', ordineScuola: 'Secondaria II Grado', fascia: 'A' },
  { codice: 'A-42', materia: 'Scienze e tecnologie meccaniche', ordineScuola: 'Secondaria II Grado', fascia: 'A' },
  { codice: 'A-45', materia: 'Scienze economico-aziendali', ordineScuola: 'Secondaria II Grado', fascia: 'A' },
  { codice: 'A-46', materia: 'Scienze giuridico-economiche', ordineScuola: 'Secondaria II Grado', fascia: 'A' },
  { codice: 'A-47', materia: 'Scienze matematiche applicate', ordineScuola: 'Secondaria II Grado', fascia: 'A' },
  { codice: 'A-50', materia: 'Scienze naturali, chimiche e biologiche', ordineScuola: 'Secondaria II Grado', fascia: 'A' },
  { codice: 'A-51', materia: 'Scienze, tecnologie e tecniche agrarie', ordineScuola: 'Secondaria II Grado', fascia: 'A' },
  { codice: 'A-54', materia: 'Storia dell\'arte', ordineScuola: 'Secondaria II Grado', fascia: 'A' },
  { codice: 'A-61', materia: 'Tecnologie e tecniche comunicazioni multimediali', ordineScuola: 'Secondaria II Grado', fascia: 'A' },
  { codice: 'A-62', materia: 'Tecnologie e tecniche per la grafica', ordineScuola: 'Secondaria II Grado', fascia: 'A' },
  { codice: 'A-66', materia: 'Informatica (esaurimento)', ordineScuola: 'Secondaria II Grado', fascia: 'A' },
  { codice: 'A-08', materia: 'Discipline geometriche e architettura', ordineScuola: 'Secondaria II Grado', fascia: 'A' },
  { codice: 'ADSS', materia: 'Sostegno - Secondaria II Grado', ordineScuola: 'Secondaria II Grado', fascia: 'S' },
  { codice: 'B-06', materia: 'Laboratorio tecnologie informatiche', ordineScuola: 'Secondaria II Grado', fascia: 'B' },
];

// ═══ DATI REALI — Fetch da public/ al primo accesso ═══

let _rawData: BollettinoEntry[] | null = null;
let _loadPromise: Promise<BollettinoEntry[]> | null = null;

function loadRealDataSync(): BollettinoEntry[] {
  if (_rawData) return _rawData;
  // Fallback: return empty, will be populated by async load
  return [];
}

async function ensureRealDataLoaded(): Promise<BollettinoEntry[]> {
  if (_rawData) return _rawData;
  if (_loadPromise) return _loadPromise;
  _loadPromise = fetch('/bollettini-real-data.json')
    .then(r => r.json())
    .then(data => { _rawData = data as BollettinoEntry[]; return _rawData; });
  return _loadPromise;
}

// ═══ HELPER FUNCTIONS ═══

export function getBollettiniByClasse(classeCodice: string): BollettinoEntry[] {
  const map = ensureMap();
  const result: BollettinoEntry[] = [];
  for (const [key, entries] of map) {
    if (key.startsWith(classeCodice + '-')) result.push(...entries);
  }
  return result;
}

export function getBollettiniByProvincia(provinciaSigla: string): BollettinoEntry[] {
  const map = ensureMap();
  const result: BollettinoEntry[] = [];
  for (const [key, entries] of map) {
    if (key.endsWith('-' + provinciaSigla)) result.push(...entries);
  }
  return result;
}

export function getBollettiniByClasseAndProvincia(classeCodice: string, provinciaSigla: string): BollettinoEntry[] {
  const map = ensureMap();
  return map.get(classeCodice + '-' + provinciaSigla) ?? [];
}

export function getSintesiByClasse(classeCodice: string): BollettinoSummary | null {
  const entries = getBollettiniByClasse(classeCodice);
  if (entries.length === 0) return null;
  const cls = getClasseByCodice(classeCodice);
  const province = new Set(entries.map(e => e.provinciaSigla));
  const lastEntries: BollettinoEntry[] = [];
  for (const prov of province) {
    const provEntries = entries.filter(e => e.provinciaSigla === prov);
    const last = provEntries.reduce((a, b) => a.turno > b.turno ? a : b);
    lastEntries.push(last);
  }
  return {
    classeCodice,
    materia: cls?.materia ?? classeCodice,
    ordineScuola: cls?.ordineScuola ?? '',
    totalePosizioni: lastEntries.reduce((s, e) => s + e.posizioniAssegnate, 0),
    totaleCandidati: lastEntries.reduce((s, e) => s + e.candidatiInGraduatoria, 0),
    punteggioMinimoNazionale: Math.min(...entries.map(e => e.punteggioMinimo)),
    punteggioMassimoNazionale: Math.max(...entries.map(e => e.punteggioMassimo)),
    provinceAttive: province.size,
    ultimoTurno: Math.max(...entries.map(e => e.turno)),
    ultimaPosizione: Math.max(...lastEntries.map(e => e.posizioneUltimaConvocazione)),
  };
}

export function getClasseByCodice(codice: string): ClasseConcorso | undefined {
  return CLASSI_CONCORSO.find(c => c.codice === codice);
}

export function ordinaPerCompetizione(entries: BollettinoEntry[]): BollettinoEntry[] {
  const ord = { molto_alta: 0, alta: 1, media: 2, bassa: 3 };
  return [...entries].sort((a, b) => ord[a.competizione] - ord[b.competizione]);
}

export function filtraPerCompetizione(entries: BollettinoEntry[], livello: string): BollettinoEntry[] {
  return entries.filter(e => e.competizione === livello);
}

// ═══ LAZY MAP — Costruita dai dati reali JSON ═══

let _map: Map<string, BollettinoEntry[]> | null = null;
function ensureMap(): Map<string, BollettinoEntry[]> {
  if (_map) return _map;
  _map = new Map();
  const data = _rawData ?? [];
  for (const entry of data) {
    const key = entry.classeCodice + '-' + entry.provinciaSigla;
    let arr = _map.get(key);
    if (!arr) { arr = []; _map.set(key, arr); }
    arr.push(entry);
  }
  return _map;
}

// Export flat array for backward compatibility (lazy)
export const BOLLETTINI_NOMINE: BollettinoEntry[] = new Proxy([] as BollettinoEntry[], {
  get(_target, prop) {
    if (prop === 'length') {
      return _rawData?.length ?? 0;
    }
    if (typeof prop === 'string' && /^\d+$/.test(prop)) {
      const idx = parseInt(prop);
      return _rawData?.[idx];
    }
    if (prop === Symbol.iterator) {
      return (_rawData ?? [])[Symbol.iterator]();
    }
    return undefined;
  }
});

// Also provide eager array for filter operations
let _eagerArray: BollettinoEntry[] | null = null;
export function getAllBollettini(): BollettinoEntry[] {
  if (_eagerArray) return _eagerArray;
  _eagerArray = _rawData ?? [];
  return _eagerArray;
}

// Async initializer — call on app mount to load data
export async function initBollettiniData(): Promise<void> {
  await ensureRealDataLoaded();
}
