// ============================================================
// BOLLETTINI DI NOMINE — Classi di concorso ufficiali
// DM 259/17 + DM 22/12/2023 — Fonte: classidiconcorso.it / MIM
// Dati reali: turni basati su Orizzonte Scuola GPS 2025/26
// 43 classi GPS × 108 province × turni reali per provincia
// ============================================================

import { useSyncExternalStore } from 'react';

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
  { codice: 'A-02', materia: 'Design dei metalli, dell\'oreficeria, delle pietre dure e delle gemme', ordineScuola: 'Secondaria II Grado', fascia: 'A' },
  { codice: 'A-03', materia: 'Design della ceramica', ordineScuola: 'Secondaria II Grado', fascia: 'A' },
  { codice: 'A-05', materia: 'Design del tessuto e della moda', ordineScuola: 'Secondaria II Grado', fascia: 'A' },
  { codice: 'A-07', materia: 'Discipline audiovisive', ordineScuola: 'Secondaria II Grado', fascia: 'A' },
  { codice: 'A-09', materia: 'Discipline grafiche, pittoriche e scenografiche', ordineScuola: 'Secondaria II Grado', fascia: 'A' },
  { codice: 'A-10', materia: 'Discipline grafico-pubblicitarie', ordineScuola: 'Secondaria II Grado', fascia: 'A' },
  { codice: 'A-14', materia: 'Discipline plastiche, scultoree e scenoplastiche', ordineScuola: 'Secondaria II Grado', fascia: 'A' },
  { codice: 'A-15', materia: 'Discipline sanitarie', ordineScuola: 'Secondaria II Grado', fascia: 'A' },
  { codice: 'A-16', materia: 'Disegno artistico e modellazione odontotecnica', ordineScuola: 'Secondaria II Grado', fascia: 'A' },
  { codice: 'A-31', materia: 'Scienze degli alimenti', ordineScuola: 'Secondaria II Grado', fascia: 'A' },
  { codice: 'A-32', materia: 'Scienze della geologia e della mineralogia', ordineScuola: 'Secondaria II Grado', fascia: 'A' },
  { codice: 'A-36', materia: 'Scienze e tecnologia della logistica', ordineScuola: 'Secondaria II Grado', fascia: 'A' },
  { codice: 'A-37', materia: 'Scienze e tecnologie delle costruzioni', ordineScuola: 'Secondaria II Grado', fascia: 'A' },
  { codice: 'A-38', materia: 'Scienze e tecnologie delle costruzioni aeronautiche', ordineScuola: 'Secondaria II Grado', fascia: 'A' },
  { codice: 'A-40', materia: 'Scienze e tecnologie elettriche ed elettroniche', ordineScuola: 'Secondaria II Grado', fascia: 'A' },
  { codice: 'A-43', materia: 'Scienze e tecnologie nautiche', ordineScuola: 'Secondaria II Grado', fascia: 'A' },
  { codice: 'A-44', materia: 'Scienze e tecnologie tessili, dell\'abbigliamento e della moda', ordineScuola: 'Secondaria II Grado', fascia: 'A' },
  { codice: 'A-52', materia: 'Scienze, tecnologie e tecniche di produzioni animali', ordineScuola: 'Secondaria II Grado', fascia: 'A' },
  { codice: 'A-53', materia: 'Storia della musica e della danza', ordineScuola: 'Secondaria II Grado', fascia: 'A' },
  { codice: 'A-57', materia: 'Tecnica della danza classica', ordineScuola: 'Secondaria II Grado', fascia: 'A' },
  { codice: 'A-58', materia: 'Tecnica della danza contemporanea', ordineScuola: 'Secondaria II Grado', fascia: 'A' },
  { codice: 'A-59', materia: 'Tecnica di accompagnamento alla danza', ordineScuola: 'Secondaria II Grado', fascia: 'A' },
  { codice: 'A-63', materia: 'Tecnologie musicali', ordineScuola: 'Secondaria II Grado', fascia: 'A' },
  { codice: 'A-64', materia: 'Teoria, analisi e composizione', ordineScuola: 'Secondaria II Grado', fascia: 'A' },
  { codice: 'A-65', materia: 'Teoria e tecnica della comunicazione', ordineScuola: 'Secondaria II Grado', fascia: 'A' },
  { codice: 'B-03', materia: 'Laboratori di fisica', ordineScuola: 'Secondaria II Grado', fascia: 'B' },
  { codice: 'B-05', materia: 'Laboratorio di logistica', ordineScuola: 'Secondaria II Grado', fascia: 'B' },
  { codice: 'B-07', materia: 'Laboratorio di ottica', ordineScuola: 'Secondaria II Grado', fascia: 'B' },
  { codice: 'B-08', materia: 'Laboratori di produzione industriali ed artigianali della ceramica', ordineScuola: 'Secondaria II Grado', fascia: 'B' },
  { codice: 'B-09', materia: 'Laboratori di scienze e tecnologie aeronautiche', ordineScuola: 'Secondaria II Grado', fascia: 'B' },
  { codice: 'B-10', materia: 'Laboratori di scienze e tecnologie delle costruzioni aeronautiche', ordineScuola: 'Secondaria II Grado', fascia: 'B' },
  { codice: 'B-11', materia: 'Laboratori di scienze e tecnologie agrarie', ordineScuola: 'Secondaria II Grado', fascia: 'B' },
  { codice: 'B-12', materia: 'Laboratori di scienze e tecnologie chimiche e microbiologiche', ordineScuola: 'Secondaria II Grado', fascia: 'B' },
  { codice: 'B-13', materia: 'Laboratori di scienze e tecnologie della calzatura e della moda', ordineScuola: 'Secondaria II Grado', fascia: 'B' },
  { codice: 'B-14', materia: 'Laboratori di scienze e tecnologie delle costruzioni', ordineScuola: 'Secondaria II Grado', fascia: 'B' },
  { codice: 'B-15', materia: 'Laboratori di scienze e tecnologie elettriche ed elettroniche', ordineScuola: 'Secondaria II Grado', fascia: 'B' },
  { codice: 'B-16', materia: 'Laboratori di scienze e tecnologie informatiche', ordineScuola: 'Secondaria II Grado', fascia: 'B' },
  { codice: 'B-17', materia: 'Laboratori di scienze e tecnologie meccaniche', ordineScuola: 'Secondaria II Grado', fascia: 'B' },
  { codice: 'B-18', materia: 'Laboratori di scienze e tecnologie tessili, dell\'abbigliamento e della moda', ordineScuola: 'Secondaria II Grado', fascia: 'B' },
  { codice: 'B-19', materia: 'Laboratori di servizi di ricettività alberghiera', ordineScuola: 'Secondaria II Grado', fascia: 'B' },
  { codice: 'B-20', materia: 'Laboratori di servizi enogastronomici, settore cucina', ordineScuola: 'Secondaria II Grado', fascia: 'B' },
  { codice: 'B-21', materia: 'Laboratori di servizi enogastronomici, settore sala e vendita', ordineScuola: 'Secondaria II Grado', fascia: 'B' },
  { codice: 'B-22', materia: 'Laboratori di tecnologie e tecniche delle comunicazioni multimediali', ordineScuola: 'Secondaria II Grado', fascia: 'B' },
  { codice: 'B-23', materia: 'Laboratori per i servizi socio-sanitari', ordineScuola: 'Secondaria II Grado', fascia: 'B' },
  { codice: 'B-24', materia: 'Laboratorio di scienze e tecnologie nautiche', ordineScuola: 'Secondaria II Grado', fascia: 'B' },
  { codice: 'B-25', materia: 'Laboratorio di scienze e tecnologie delle costruzioni navali', ordineScuola: 'Secondaria II Grado', fascia: 'B' },
  { codice: 'B-26', materia: 'Laboratorio di tecnologie del legno', ordineScuola: 'Secondaria II Grado', fascia: 'B' },
  { codice: 'B-28', materia: 'Laboratorio di tecnologie orafe', ordineScuola: 'Secondaria II Grado', fascia: 'B' },
  { codice: 'B-29', materia: 'Gabinetto fisioterapico', ordineScuola: 'Secondaria II Grado', fascia: 'B' },
  { codice: 'ADSS', materia: 'Sostegno - Secondaria II Grado', ordineScuola: 'Secondaria II Grado', fascia: 'S' },
  { codice: 'B-06', materia: 'Laboratorio tecnologie informatiche', ordineScuola: 'Secondaria II Grado', fascia: 'B' },
];

// ═══ DATI REALI — Fetch da public/ al primo accesso ═══

let _rawData: BollettinoEntry[] | null = null;
let _loadPromise: Promise<BollettinoEntry[]> | null = null;
let _map: Map<string, BollettinoEntry[]> | null = null;
let _eagerArray: BollettinoEntry[] | null = null;

type Listener = () => void;
const _listeners = new Set<Listener>();

function emitChange() {
  _map = null;
  _eagerArray = null;
  for (const l of _listeners) l();
}

async function ensureRealDataLoaded(): Promise<BollettinoEntry[]> {
  if (_rawData) return _rawData;
  if (_loadPromise) return _loadPromise;
  _loadPromise = fetch('/bollettini-real-data.json')
    .then(r => r.json())
    .then(data => { _rawData = data as BollettinoEntry[]; emitChange(); return _rawData; });
  return _loadPromise;
}

// React hook — re-renderizza i consumer quando i dati reali arrivano
export function useBollettiniData(): BollettinoEntry[] {
  return useSyncExternalStore(
    (cb) => { _listeners.add(cb); return () => _listeners.delete(cb); },
    () => _rawData ?? EMPTY,
  );
}

const EMPTY: BollettinoEntry[] = [];

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
export function getAllBollettini(): BollettinoEntry[] {
  if (_eagerArray && _rawData) return _eagerArray;
  if (_rawData) { _eagerArray = _rawData; return _eagerArray; }
  return [];
}

// Async initializer — call on app mount to load data
export async function initBollettiniData(): Promise<void> {
  await ensureRealDataLoaded();
}
