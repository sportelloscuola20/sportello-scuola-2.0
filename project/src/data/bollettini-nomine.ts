// ============================================================
// BOLLETTINI DI NOMINE — Classi di concorso ufficiali
// DM 259/17 + DM 22/12/2023 — Fonte: classidiconcorso.it / MIM
// Generatore: 104 classi x 109 province x 5-10 turni
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
  { codice: 'A-02', materia: 'Design dei metalli e dell\'oreficeria', ordineScuola: 'Secondaria II Grado', fascia: 'A' },
  { codice: 'A-03', materia: 'Design della ceramica', ordineScuola: 'Secondaria II Grado', fascia: 'A' },
  { codice: 'A-04', materia: 'Design del libro', ordineScuola: 'Secondaria II Grado', fascia: 'A' },
  { codice: 'A-05', materia: 'Design del tessuto e della moda', ordineScuola: 'Secondaria II Grado', fascia: 'A' },
  { codice: 'A-06', materia: 'Design del vetro', ordineScuola: 'Secondaria II Grado', fascia: 'A' },
  { codice: 'A-07', materia: 'Discipline audiovisive', ordineScuola: 'Secondaria II Grado', fascia: 'A' },
  { codice: 'A-08', materia: 'Discipline geometriche e architettura', ordineScuola: 'Secondaria II Grado', fascia: 'A' },
  { codice: 'A-09', materia: 'Discipline grafiche, pittoriche e scenografiche', ordineScuola: 'Secondaria II Grado', fascia: 'A' },
  { codice: 'A-10', materia: 'Discipline grafico-pubblicitarie', ordineScuola: 'Secondaria II Grado', fascia: 'A' },
  { codice: 'A-11', materia: 'Discipline letterarie e latino', ordineScuola: 'Secondaria II Grado', fascia: 'A' },
  { codice: 'A-13', materia: 'Discipline letterarie, latino e greco', ordineScuola: 'Secondaria II Grado', fascia: 'A' },
  { codice: 'A-15', materia: 'Discipline sanitarie', ordineScuola: 'Secondaria II Grado', fascia: 'A' },
  { codice: 'A-16', materia: 'Disegno artistico e modellazione odontotecnica', ordineScuola: 'Secondaria II Grado', fascia: 'A' },
  { codice: 'A-18', materia: 'Filosofia e scienze umane', ordineScuola: 'Secondaria II Grado', fascia: 'A' },
  { codice: 'A-19', materia: 'Filosofia e storia', ordineScuola: 'Secondaria II Grado', fascia: 'A' },
  { codice: 'A-20', materia: 'Fisica', ordineScuola: 'Secondaria II Grado', fascia: 'A' },
  { codice: 'A-26', materia: 'Matematica', ordineScuola: 'Secondaria II Grado', fascia: 'A' },
  { codice: 'A-27', materia: 'Matematica e fisica', ordineScuola: 'Secondaria II Grado', fascia: 'A' },
  { codice: 'A-31', materia: 'Scienze degli alimenti', ordineScuola: 'Secondaria II Grado', fascia: 'A' },
  { codice: 'A-32', materia: 'Scienze della geologia e della mineralogia', ordineScuola: 'Secondaria II Grado', fascia: 'A' },
  { codice: 'A-33', materia: 'Scienze e tecnologie aeronautiche', ordineScuola: 'Secondaria II Grado', fascia: 'A' },
  { codice: 'A-34', materia: 'Scienze e tecnologie chimiche', ordineScuola: 'Secondaria II Grado', fascia: 'A' },
  { codice: 'A-35', materia: 'Scienze e tecnologie della calzatura e della moda', ordineScuola: 'Secondaria II Grado', fascia: 'A' },
  { codice: 'A-36', materia: 'Scienze e tecnologie della logistica', ordineScuola: 'Secondaria II Grado', fascia: 'A' },
  { codice: 'A-37', materia: 'Scienze e tecnologie delle costruzioni', ordineScuola: 'Secondaria II Grado', fascia: 'A' },
  { codice: 'A-38', materia: 'Scienze e tecnologie delle costruzioni aeronautiche', ordineScuola: 'Secondaria II Grado', fascia: 'A' },
  { codice: 'A-39', materia: 'Scienze e tecnologie delle costruzioni navali', ordineScuola: 'Secondaria II Grado', fascia: 'A' },
  { codice: 'A-40', materia: 'Scienze e tecnologie elettriche ed elettroniche', ordineScuola: 'Secondaria II Grado', fascia: 'A' },
  { codice: 'A-41', materia: 'Scienze e tecnologie informatiche', ordineScuola: 'Secondaria II Grado', fascia: 'A' },
  { codice: 'A-42', materia: 'Scienze e tecnologie meccaniche', ordineScuola: 'Secondaria II Grado', fascia: 'A' },
  { codice: 'A-43', materia: 'Scienze e tecnologie nautiche', ordineScuola: 'Secondaria II Grado', fascia: 'A' },
  { codice: 'A-44', materia: 'Scienze e tecnologie tessili', ordineScuola: 'Secondaria II Grado', fascia: 'A' },
  { codice: 'A-45', materia: 'Scienze economico-aziendali', ordineScuola: 'Secondaria II Grado', fascia: 'A' },
  { codice: 'A-46', materia: 'Scienze giuridico-economiche', ordineScuola: 'Secondaria II Grado', fascia: 'A' },
  { codice: 'A-47', materia: 'Scienze matematiche applicate', ordineScuola: 'Secondaria II Grado', fascia: 'A' },
  { codice: 'A-50', materia: 'Scienze naturali, chimiche e biologiche', ordineScuola: 'Secondaria II Grado', fascia: 'A' },
  { codice: 'A-51', materia: 'Scienze, tecnologie e tecniche agrarie', ordineScuola: 'Secondaria II Grado', fascia: 'A' },
  { codice: 'A-52', materia: 'Scienze, tecnologie e tecniche di produzioni animali', ordineScuola: 'Secondaria II Grado', fascia: 'A' },
  { codice: 'A-53', materia: 'Storia della musica e della danza', ordineScuola: 'Secondaria II Grado', fascia: 'A' },
  { codice: 'A-54', materia: 'Storia dell\'arte', ordineScuola: 'Secondaria II Grado', fascia: 'A' },
  { codice: 'A-55', materia: 'Strumento musicale', ordineScuola: 'Secondaria II Grado', fascia: 'A' },
  { codice: 'A-57', materia: 'Tecnica della danza classica', ordineScuola: 'Secondaria II Grado', fascia: 'A' },
  { codice: 'A-58', materia: 'Tecnica della danza contemporanea', ordineScuola: 'Secondaria II Grado', fascia: 'A' },
  { codice: 'A-59', materia: 'Tecniche di accompagnamento alla danza', ordineScuola: 'Secondaria II Grado', fascia: 'A' },
  { codice: 'A-61', materia: 'Tecnologie e tecniche comunicazioni multimediali', ordineScuola: 'Secondaria II Grado', fascia: 'A' },
  { codice: 'A-62', materia: 'Tecnologie e tecniche per la grafica', ordineScuola: 'Secondaria II Grado', fascia: 'A' },
  { codice: 'A-63', materia: 'Tecnologie musicali', ordineScuola: 'Secondaria II Grado', fascia: 'A' },
  { codice: 'A-64', materia: 'Teoria, analisi e composizione', ordineScuola: 'Secondaria II Grado', fascia: 'A' },
  { codice: 'A-65', materia: 'Teoria e tecnica della comunicazione', ordineScuola: 'Secondaria II Grado', fascia: 'A' },
  { codice: 'A-66', materia: 'Informatica (esaurimento)', ordineScuola: 'Secondaria II Grado', fascia: 'A' },
  { codice: 'ADSS', materia: 'Sostegno - Secondaria II Grado', ordineScuola: 'Secondaria II Grado', fascia: 'S' },
  { codice: 'B-01', materia: 'Laboratorio tecnologie grafiche', ordineScuola: 'Secondaria II Grado', fascia: 'B' },
  { codice: 'B-02', materia: 'Laboratorio tecnologie dell\'edilizia', ordineScuola: 'Secondaria II Grado', fascia: 'B' },
  { codice: 'B-03', materia: 'Laboratorio tecnologie meccaniche', ordineScuola: 'Secondaria II Grado', fascia: 'B' },
  { codice: 'B-04', materia: 'Laboratorio chimica industriale', ordineScuola: 'Secondaria II Grado', fascia: 'B' },
  { codice: 'B-05', materia: 'Laboratorio tecnologie elettriche ed elettroniche', ordineScuola: 'Secondaria II Grado', fascia: 'B' },
  { codice: 'B-06', materia: 'Laboratorio tecnologie informatiche', ordineScuola: 'Secondaria II Grado', fascia: 'B' },
  { codice: 'B-07', materia: 'Laboratorio trasporto e logistica', ordineScuola: 'Secondaria II Grado', fascia: 'B' },
  { codice: 'B-08', materia: 'Laboratorio commercio e pubblicità', ordineScuola: 'Secondaria II Grado', fascia: 'B' },
  { codice: 'B-09', materia: 'Laboratorio tecniche audiovisive', ordineScuola: 'Secondaria II Grado', fascia: 'B' },
  { codice: 'B-10', materia: 'Laboratorio navigazione', ordineScuola: 'Secondaria II Grado', fascia: 'B' },
  { codice: 'B-11', materia: 'Laboratorio aeronautica', ordineScuola: 'Secondaria II Grado', fascia: 'B' },
  { codice: 'B-12', materia: 'Laboratorio sicurezza', ordineScuola: 'Secondaria II Grado', fascia: 'B' },
  { codice: 'B-13', materia: 'Laboratorio gastronomia e pasticceria', ordineScuola: 'Secondaria II Grado', fascia: 'B' },
  { codice: 'B-14', materia: 'Laboratorio enologia e sommelleria', ordineScuola: 'Secondaria II Grado', fascia: 'B' },
  { codice: 'B-15', materia: 'Laboratorio produzioni alimentari', ordineScuola: 'Secondaria II Grado', fascia: 'B' },
  { codice: 'B-16', materia: 'Laboratorio zootecnia e veterinaria', ordineScuola: 'Secondaria II Grado', fascia: 'B' },
  { codice: 'B-17', materia: 'Laboratorio viticoltura e ortofrutta', ordineScuola: 'Secondaria II Grado', fascia: 'B' },
  { codice: 'B-18', materia: 'Laboratorio legno e arredamento', ordineScuola: 'Secondaria II Grado', fascia: 'B' },
  { codice: 'B-19', materia: 'Laboratorio moda e costume', ordineScuola: 'Secondaria II Grado', fascia: 'B' },
  { codice: 'B-20', materia: 'Laboratorio oreficeria e gioiello', ordineScuola: 'Secondaria II Grado', fascia: 'B' },
  { codice: 'B-21', materia: 'Laboratorio tecniche grafiche', ordineScuola: 'Secondaria II Grado', fascia: 'B' },
  { codice: 'B-22', materia: 'Laboratorio arti grafiche', ordineScuola: 'Secondaria II Grado', fascia: 'B' },
  { codice: 'B-23', materia: 'Laboratorio falegnameria', ordineScuola: 'Secondaria II Grado', fascia: 'B' },
  { codice: 'B-24', materia: 'Laboratorio apparati e impianti', ordineScuola: 'Secondaria II Grado', fascia: 'B' },
  { codice: 'B-25', materia: 'Laboratorio tecniche del corpo', ordineScuola: 'Secondaria II Grado', fascia: 'B' },
  { codice: 'B-26', materia: 'Laboratorio paesaggio e verde', ordineScuola: 'Secondaria II Grado', fascia: 'B' },
  { codice: 'B-27', materia: 'Laboratorio servizi per la persona', ordineScuola: 'Secondaria II Grado', fascia: 'B' },
  { codice: 'B-28', materia: 'Laboratorio promozione della salute', ordineScuola: 'Secondaria II Grado', fascia: 'B' },
  { codice: 'B-29', materia: 'Laboratorio turismo', ordineScuola: 'Secondaria II Grado', fascia: 'B' },
  { codice: 'B-30', materia: 'Laboratorio assistenza alla persona', ordineScuola: 'Secondaria II Grado', fascia: 'B' },
  { codice: 'B-31', materia: 'Laboratorio ristorazione', ordineScuola: 'Secondaria II Grado', fascia: 'B' },
  { codice: 'B-32', materia: 'Laboratorio organizzazione mensa', ordineScuola: 'Secondaria II Grado', fascia: 'B' },
  { codice: 'PP', materia: 'Educatore', ordineScuola: 'Secondaria II Grado', fascia: 'A' },
];

const CLASSI_GPS_COMUNI = ["00AA","00EE","EEEM","AD0D","AD0J","AD00","ADSS","A-01","A-11","A-12","A-13","A-18","A-19","A-20","A-21","A-22","A-26","A-27","A-28","A-30","A-34","A-41","A-45","A-46","A-48","A-50","A-54","A-55","A-56","A-60","A-61","AA22","AB22","AC22","AD22","B-01","B-02","B-03","B-06","B-13","B-19","B-29","B-30","PP"];

interface ClassiParam { bMin: number; bMax: number; bPos: number; bCand: number; }
const CLASSI_PARAMS: Record<string, ClassiParam> = {"00AA":{"bMin":68,"bMax":116,"bPos":45,"bCand":580},"00EE":{"bMin":72,"bMax":120,"bPos":60,"bCand":720},"EEEM":{"bMin":65,"bMax":100,"bPos":18,"bCand":180},"AD0D":{"bMin":55,"bMax":95,"bPos":25,"bCand":150},"AD0J":{"bMin":58,"bMax":98,"bPos":28,"bCand":160},"AD00":{"bMin":52,"bMax":92,"bPos":22,"bCand":140},"ADSS":{"bMin":50,"bMax":90,"bPos":30,"bCand":170},"A-01":{"bMin":48,"bMax":85,"bPos":12,"bCand":90},"A-11":{"bMin":55,"bMax":95,"bPos":20,"bCand":180},"A-12":{"bMin":60,"bMax":100,"bPos":35,"bCand":320},"A-13":{"bMin":50,"bMax":90,"bPos":15,"bCand":130},"A-18":{"bMin":45,"bMax":82,"bPos":10,"bCand":70},"A-19":{"bMin":45,"bMax":82,"bPos":10,"bCand":70},"A-20":{"bMin":50,"bMax":88,"bPos":14,"bCand":110},"A-21":{"bMin":48,"bMax":85,"bPos":12,"bCand":95},"A-22":{"bMin":62,"bMax":105,"bPos":40,"bCand":380},"A-26":{"bMin":58,"bMax":98,"bPos":25,"bCand":220},"A-27":{"bMin":50,"bMax":88,"bPos":14,"bCand":110},"A-28":{"bMin":55,"bMax":95,"bPos":22,"bCand":200},"A-30":{"bMin":52,"bMax":92,"bPos":18,"bCand":150},"A-34":{"bMin":45,"bMax":82,"bPos":10,"bCand":75},"A-41":{"bMin":55,"bMax":95,"bPos":20,"bCand":180},"A-45":{"bMin":42,"bMax":78,"bPos":8,"bCand":60},"A-46":{"bMin":42,"bMax":78,"bPos":8,"bCand":60},"A-48":{"bMin":58,"bMax":100,"bPos":28,"bCand":250},"A-50":{"bMin":50,"bMax":88,"bPos":14,"bCand":115},"A-54":{"bMin":45,"bMax":82,"bPos":10,"bCand":75},"A-55":{"bMin":40,"bMax":75,"bPos":6,"bCand":45},"A-56":{"bMin":42,"bMax":78,"bPos":8,"bCand":55},"A-60":{"bMin":50,"bMax":88,"bPos":15,"bCand":120},"A-61":{"bMin":48,"bMax":85,"bPos":12,"bCand":90},"AA22":{"bMin":55,"bMax":95,"bPos":20,"bCand":170},"AB22":{"bMin":62,"bMax":108,"bPos":45,"bCand":420},"AC22":{"bMin":52,"bMax":92,"bPos":16,"bCand":140},"AD22":{"bMin":48,"bMax":85,"bPos":10,"bCand":80},"B-01":{"bMin":38,"bMax":72,"bPos":5,"bCand":35},"B-02":{"bMin":38,"bMax":72,"bPos":5,"bCand":35},"B-03":{"bMin":38,"bMax":72,"bPos":5,"bCand":35},"B-06":{"bMin":38,"bMax":72,"bPos":5,"bCand":35},"B-13":{"bMin":35,"bMax":68,"bPos":4,"bCand":28},"B-19":{"bMin":35,"bMax":68,"bPos":4,"bCand":28},"B-29":{"bMin":35,"bMax":68,"bPos":4,"bCand":28},"B-30":{"bMin":35,"bMax":68,"bPos":4,"bCand":28},"PP":{"bMin":40,"bMax":75,"bPos":6,"bCand":40}};
const DEFAULT_PARAMS: ClassiParam = {"bMin":40,"bMax":80,"bPos":8,"bCand":60};

const TURNO_DATE: Record<number, { data: string; periodo: string }> = {"1":{"data":"2024-08-30","periodo":"1 Turno - Agosto/Settembre"},"2":{"data":"2024-09-05","periodo":"2 Turno - Settembre"},"3":{"data":"2024-09-10","periodo":"3 Turno - Settembre"},"4":{"data":"2024-09-17","periodo":"4 Turno - Settembre"},"5":{"data":"2024-09-24","periodo":"5 Turno - Settembre"},"6":{"data":"2024-10-03","periodo":"6 Turno - Ottobre"},"7":{"data":"2024-10-10","periodo":"7 Turno - Ottobre"},"8":{"data":"2024-10-17","periodo":"8 Turno - Ottobre"},"9":{"data":"2024-10-24","periodo":"9 Turno - Ottobre"},"10":{"data":"2024-11-07","periodo":"10 Turno - Novembre"},"11":{"data":"2024-11-14","periodo":"11 Turno - Novembre"},"12":{"data":"2024-11-21","periodo":"12 Turno - Novembre"},"13":{"data":"2024-12-05","periodo":"13 Turno - Dicembre"},"14":{"data":"2024-12-09","periodo":"14 Turno - Dicembre"}};

// ═══ FUNZIONI DETERMINISTICHE ═══

function hashString(str: string): number {
  let h = 0;
  for (let i = 0; i < str.length; i++) { h = ((h << 5) - h) + str.charCodeAt(i); h |= 0; }
  return Math.abs(h);
}
function srand(seed: string): number { return (hashString(seed) % 10000) / 10000; }
function srandRange(seed: string, min: number, max: number): number { return min + srand(seed) * (max - min); }
function srandInt(seed: string, min: number, max: number): number { return Math.floor(srandRange(seed, min, max + 1)); }

const PROV_MOD: Record<string, number> = {
  'AG':0,
  'AL':0,
  'AN':6,
  'AO':3,
  'AP':0,
  'AQ':0,
  'AR':0,
  'AT':0,
  'AV':6,
  'BA':10,
  'BG':14,
  'BI':0,
  'BL':0,
  'BN':0,
  'BO':10,
  'BR':0,
  'BS':0,
  'BT':0,
  'BZ':10,
  'CA':10,
  'CB':0,
  'CE':6,
  'CH':0,
  'CI':0,
  'CL':0,
  'CN':0,
  'CO':6,
  'CR':3,
  'CS':3,
  'CT':10,
  'CZ':0,
  'EN':0,
  'FC':6,
  'FE':0,
  'FG':0,
  'FI':10,
  'FM':0,
  'FR':0,
  'GE':10,
  'GO':0,
  'GR':0,
  'IM':0,
  'IS':0,
  'KR':3,
  'LC':0,
  'LE':6,
  'LI':3,
  'LO':0,
  'LT':0,
  'LU':0,
  'MB':0,
  'MC':3,
  'ME':3,
  'MI':18,
  'MN':0,
  'MO':6,
  'MS':0,
  'MT':3,
  'NA':18,
  'NO':0,
  'NU':0,
  'OG':0,
  'OR':0,
  'OT':3,
  'PA':14,
  'PC':0,
  'PD':10,
  'PE':3,
  'PG':6,
  'PI':3,
  'PN':6,
  'PO':0,
  'PR':3,
  'PT':0,
  'PV':3,
  'PZ':3,
  'RA':0,
  'RC':3,
  'RE':6,
  'RG':3,
  'RI':0,
  'RM':18,
  'RN':0,
  'RO':0,
  'SA':6,
  'SI':3,
  'SO':0,
  'SP':0,
  'SR':0,
  'SS':0,
  'SV':0,
  'TA':0,
  'TE':3,
  'TN':6,
  'TO':18,
  'TP':0,
  'TR':0,
  'TS':6,
  'TV':3,
  'UD':6,
  'VA':3,
  'VB':0,
  'VC':0,
  'VE':10,
  'VI':0,
  'VR':6,
  'VS':0,
  'VT':3,
  'VV':0
};
function getProvinceModifier(sigla: string): number { return PROV_MOD[sigla] ?? 0; }

// ═══ GENERATORE ═══

function getNumTurni(classeCodice: string, provinciaSigla: string): number {
  const r = srand('turni-' + classeCodice + '-' + provinciaSigla);
  if (r < 0.1) return 5; if (r < 0.3) return 6; if (r < 0.5) return 7;
  if (r < 0.8) return 8; if (r < 0.95) return 9; return 10;
}

function generateBollettino(classeCodice: string, provinciaSigla: string, turno: number, annoScolastico: string): BollettinoEntry {
  const p = CLASSI_PARAMS[classeCodice] ?? DEFAULT_PARAMS;
  const pm = getProvinceModifier(provinciaSigla);
  const s = classeCodice + '-' + provinciaSigla + '-' + turno;
  const tp = turno * 1.5;
  const minS = Math.round((p.bMin + pm + tp + srandRange(s + 'mn', -2, 3)) * 10) / 10;
  const maxS = Math.round((minS + 18 + srandRange(s + 'rg', 0, 12)) * 10) / 10;
  const pos = Math.max(2, Math.round(p.bPos + pm * 0.8 + srandInt(s + 'ps', -5, 8)));
  const cand = Math.max(pos + 10, Math.round(p.bCand + pm * 3 + srandInt(s + 'cd', -30, 50)));
  const posUlt = Math.max(1, Math.min(cand, Math.round(cand * 0.15 + turno * pos * 0.7 + srandRange(s + 'pu', 0, pos * 0.3))));
  const rap = cand / Math.max(pos, 1);
  let comp: 'bassa' | 'media' | 'alta' | 'molto_alta' = 'bassa';
  if (rap > 15) comp = 'molto_alta'; else if (rap > 10) comp = 'alta'; else if (rap > 5) comp = 'media';
  const tR = srand(s + 'tr');
  const trend: 'stabile' | 'crescente' | 'decrescente' = tR < 0.3 ? 'crescente' : tR < 0.6 ? 'decrescente' : 'stabile';
  const td = TURNO_DATE[turno] || { data: annoScolastico.startsWith('2024') ? '2024-' + String(Math.min(turno + 7, 12)).padStart(2, '0') + '-15' : '2025-01-15', periodo: turno + ' Turno' };
  return {
    id: classeCodice + '-' + provinciaSigla + '-T' + turno,
    classeCodice, provinciaSigla, annoScolastico, turno,
    dataBollettino: td.data, periodoChiamata: td.periodo,
    tipoGraduatoria: 'GPS I Fascia',
    punteggioMinimo: minS, punteggioMassimo: maxS,
    posizioneUltimaConvocazione: posUlt,
    posizioniAssegnate: pos, candidatiInGraduatoria: cand,
    tipoContratto: turno <= 8 ? 'Supplenza temporanea al 30/06' : 'Supplenza temporanea al 31/08',
    competizione: comp, trend,
  };
}

let _cache: Map<string, BollettinoEntry[]> | null = null;
function ensureGenerated(): Map<string, BollettinoEntry[]> {
  if (_cache) return _cache;
  _cache = new Map();
  for (const classe of CLASSI_GPS_COMUNI) {
    for (const prov of PROVINCE_LIST) {
      const nt = getNumTurni(classe, prov);
      const entries: BollettinoEntry[] = [];
      for (let t = 1; t <= nt; t++) entries.push(generateBollettino(classe, prov, t, '2024/25'));
      _cache.set(classe + '-' + prov, entries);
    }
  }
  return _cache;
}

// Province list for generation
const PROVINCE_LIST = ["AG","AL","AN","AO","AP","AQ","AR","AT","AV","BA","BG","BI","BL","BN","BO","BR","BS","BT","BZ","CA","CB","CE","CH","CI","CL","CN","CO","CR","CS","CT","CZ","EN","FC","FE","FG","FI","FM","FR","GE","GO","GR","IM","IS","KR","LC","LE","LI","LO","LT","LU","MB","MC","ME","MI","MN","MO","MS","MT","NA","NO","NU","OG","OR","OT","PA","PC","PD","PE","PG","PI","PN","PO","PR","PT","PV","PZ","RA","RC","RE","RG","RI","RM","RN","RO","SA","SI","SO","SP","SR","SS","SV","TA","TE","TN","TO","TP","TR","TS","TV","UD","VA","VB","VC","VE","VI","VR","VS","VT","VV"];

// ═══ HELPER FUNCTIONS ═══

export function getBollettiniByClasse(classeCodice: string): BollettinoEntry[] {
  const map = ensureGenerated();
  const result: BollettinoEntry[] = [];
  for (const [key, entries] of map) {
    if (key.startsWith(classeCodice + '-')) result.push(...entries);
  }
  return result;
}

export function getBollettiniByProvincia(provinciaSigla: string): BollettinoEntry[] {
  const map = ensureGenerated();
  const result: BollettinoEntry[] = [];
  for (const [key, entries] of map) {
    if (key.endsWith('-' + provinciaSigla)) result.push(...entries);
  }
  return result;
}

export function getBollettiniByClasseAndProvincia(classeCodice: string, provinciaSigla: string): BollettinoEntry[] {
  const map = ensureGenerated();
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

// Export flat array for backward compatibility (lazy)
export const BOLLETTINI_NOMINE: BollettinoEntry[] = new Proxy([] as BollettinoEntry[], {
  get(_target, prop) {
    if (prop === 'length') {
      const map = ensureGenerated();
      let len = 0;
      for (const entries of map.values()) len += entries.length;
      return len;
    }
    if (typeof prop === 'string' && /^d+$/.test(prop)) {
      const idx = parseInt(prop);
      const map = ensureGenerated();
      let count = 0;
      for (const entries of map.values()) {
        if (idx < count + entries.length) return entries[idx - count];
        count += entries.length;
      }
      return undefined;
    }
    if (prop === Symbol.iterator) {
      const map = ensureGenerated();
      const all: BollettinoEntry[] = [];
      for (const entries of map.values()) all.push(...entries);
      return all[Symbol.iterator]();
    }
    return undefined;
  }
});

// Also provide eager array for filter operations
let _eagerArray: BollettinoEntry[] | null = null;
export function getAllBollettini(): BollettinoEntry[] {
  if (_eagerArray) return _eagerArray;
  const map = ensureGenerated();
  _eagerArray = [];
  for (const entries of map.values()) _eagerArray.push(...entries);
  return _eagerArray;
}
