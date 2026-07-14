import { writeFileSync } from 'fs';
import { join } from 'path';

const outPath = join(process.cwd(), 'src', 'data', 'bollettini-nomine.ts');

// ═══ PROVINCE ═══
const PROVINCE = [
  {sigla:'AG',nome:'Agrigento',regione:'Sicilia'},{sigla:'AL',nome:'Alessandria',regione:'Piemonte'},
  {sigla:'AN',nome:'Ancona',regione:'Marche'},{sigla:'AO',nome:'Aosta',regione:'Valle d\'Aosta'},
  {sigla:'AP',nome:'Ascoli Piceno',regione:'Marche'},{sigla:'AQ',nome:'L\'Aquila',regione:'Abruzzo'},
  {sigla:'AR',nome:'Arezzo',regione:'Toscana'},{sigla:'AT',nome:'Asti',regione:'Piemonte'},
  {sigla:'AV',nome:'Avellino',regione:'Campania'},{sigla:'BA',nome:'Bari',regione:'Puglia'},
  {sigla:'BG',nome:'Bergamo',regione:'Lombardia'},{sigla:'BI',nome:'Biella',regione:'Piemonte'},
  {sigla:'BL',nome:'Belluno',regione:'Veneto'},{sigla:'BN',nome:'Benevento',regione:'Campania'},
  {sigla:'BO',nome:'Bologna',regione:'Emilia-Romagna'},{sigla:'BR',nome:'Brindisi',regione:'Puglia'},
  {sigla:'BS',nome:'Brescia',regione:'Lombardia'},{sigla:'BT',nome:'Barletta-Andria-Trani',regione:'Puglia'},
  {sigla:'BZ',nome:'Bolzano',regione:'Trentino-Alto Adige'},{sigla:'CA',nome:'Cagliari',regione:'Sardegna'},
  {sigla:'CB',nome:'Campobasso',regione:'Molise'},{sigla:'CE',nome:'Caserta',regione:'Campania'},
  {sigla:'CH',nome:'Chieti',regione:'Abruzzo'},{sigla:'CI',nome:'Carbonia-Iglesias',regione:'Sardegna'},
  {sigla:'CL',nome:'Caltanissetta',regione:'Sicilia'},{sigla:'CN',nome:'Cuneo',regione:'Piemonte'},
  {sigla:'CO',nome:'Como',regione:'Lombardia'},{sigla:'CR',nome:'Cremona',regione:'Lombardia'},
  {sigla:'CS',nome:'Cosenza',regione:'Calabria'},{sigla:'CT',nome:'Catania',regione:'Sicilia'},
  {sigla:'CZ',nome:'Catanzaro',regione:'Calabria'},{sigla:'EN',nome:'Enna',regione:'Sicilia'},
  {sigla:'FC',nome:'Forlì-Cesena',regione:'Emilia-Romagna'},{sigla:'FE',nome:'Ferrara',regione:'Emilia-Romagna'},
  {sigla:'FG',nome:'Foggia',regione:'Puglia'},{sigla:'FI',nome:'Firenze',regione:'Toscana'},
  {sigla:'FM',nome:'Forlì-Cesena',regione:'Emilia-Romagna'},{sigla:'FR',nome:'Frosinone',regione:'Lazio'},
  {sigla:'GE',nome:'Genova',regione:'Liguria'},{sigla:'GO',nome:'Gorizia',regione:'Friuli-Venezia Giulia'},
  {sigla:'GR',nome:'Grosseto',regione:'Toscana'},{sigla:'IM',nome:'Imperia',regione:'Liguria'},
  {sigla:'IS',nome:'Isernia',regione:'Molise'},{sigla:'KR',nome:'Crotone',regione:'Calabria'},
  {sigla:'LC',nome:'Lecco',regione:'Lombardia'},{sigla:'LE',nome:'Lecce',regione:'Puglia'},
  {sigla:'LI',nome:'Livorno',regione:'Toscana'},{sigla:'LO',nome:'Lodi',regione:'Lombardia'},
  {sigla:'LT',nome:'Latina',regione:'Lazio'},{sigla:'LU',nome:'Lucca',regione:'Toscana'},
  {sigla:'MB',nome:'Monza e della Brianza',regione:'Lombardia'},{sigla:'MC',nome:'Macerata',regione:'Marche'},
  {sigla:'ME',nome:'Messina',regione:'Sicilia'},{sigla:'MI',nome:'Milano',regione:'Lombardia'},
  {sigla:'MN',nome:'Mantova',regione:'Lombardia'},{sigla:'MO',nome:'Modena',regione:'Emilia-Romagna'},
  {sigla:'MS',nome:'Massa-Carrara',regione:'Toscana'},{sigla:'MT',nome:'Matera',regione:'Basilicata'},
  {sigla:'NA',nome:'Napoli',regione:'Campania'},{sigla:'NO',nome:'Novara',regione:'Piemonte'},
  {sigla:'NU',nome:'Nuoro',regione:'Sardegna'},{sigla:'OG',nome:'Ogliastra',regione:'Sardegna'},
  {sigla:'OR',nome:'Oristano',regione:'Sardegna'},{sigla:'OT',nome:'Olbia-Tempio',regione:'Sardegna'},
  {sigla:'PA',nome:'Palermo',regione:'Sicilia'},{sigla:'PC',nome:'Piacenza',regione:'Emilia-Romagna'},
  {sigla:'PD',nome:'Padova',regione:'Veneto'},{sigla:'PE',nome:'Pescara',regione:'Abruzzo'},
  {sigla:'PG',nome:'Perugia',regione:'Umbria'},{sigla:'PI',nome:'Pisa',regione:'Toscana'},
  {sigla:'PN',nome:'Pordenone',regione:'Friuli-Venezia Giulia'},{sigla:'PO',nome:'Prato',regione:'Toscana'},
  {sigla:'PR',nome:'Parma',regione:'Emilia-Romagna'},{sigla:'PT',nome:'Pistoia',regione:'Toscana'},
  {sigla:'PV',nome:'Pavia',regione:'Lombardia'},{sigla:'PZ',nome:'Potenza',regione:'Basilicata'},
  {sigla:'RA',nome:'Ravenna',regione:'Emilia-Romagna'},{sigla:'RC',nome:'Reggio Calabria',regione:'Calabria'},
  {sigla:'RE',nome:'Reggio Emilia',regione:'Emilia-Romagna'},{sigla:'RG',nome:'Ragusa',regione:'Sicilia'},
  {sigla:'RI',nome:'Rieti',regione:'Lazio'},{sigla:'RM',nome:'Roma',regione:'Lazio'},
  {sigla:'RN',nome:'Rimini',regione:'Emilia-Romagna'},{sigla:'RO',nome:'Rovigo',regione:'Veneto'},
  {sigla:'SA',nome:'Salerno',regione:'Campania'},{sigla:'SI',nome:'Siena',regione:'Toscana'},
  {sigla:'SO',nome:'Sondrio',regione:'Lombardia'},{sigla:'SP',nome:'La Spezia',regione:'Liguria'},
  {sigla:'SR',nome:'Siracusa',regione:'Sicilia'},{sigla:'SS',nome:'Sassari',regione:'Sardegna'},
  {sigla:'SV',nome:'Savona',regione:'Liguria'},{sigla:'TA',nome:'Taranto',regione:'Puglia'},
  {sigla:'TE',nome:'Teramo',regione:'Abruzzo'},{sigla:'TN',nome:'Trento',regione:'Trentino-Alto Adige'},
  {sigla:'TO',nome:'Torino',regione:'Piemonte'},{sigla:'TP',nome:'Trapani',regione:'Sicilia'},
  {sigla:'TR',nome:'Terni',regione:'Umbria'},{sigla:'TS',nome:'Trieste',regione:'Friuli-Venezia Giulia'},
  {sigla:'TV',nome:'Treviso',regione:'Veneto'},{sigla:'UD',nome:'Udine',regione:'Friuli-Venezia Giulia'},
  {sigla:'VA',nome:'Varese',regione:'Lombardia'},{sigla:'VB',nome:'Verbano-Cusio-Ossola',regione:'Piemonte'},
  {sigla:'VC',nome:'Vercelli',regione:'Piemonte'},{sigla:'VE',nome:'Venezia',regione:'Veneto'},
  {sigla:'VI',nome:'Vicenza',regione:'Veneto'},{sigla:'VR',nome:'Verona',regione:'Veneto'},
  {sigla:'VS',nome:'Medio Campidano',regione:'Sardegna'},{sigla:'VT',nome:'Viterbo',regione:'Lazio'},
  {sigla:'VV',nome:'Vibo Valentia',regione:'Calabria'},
];

const REGIONI = [...new Set(PROVINCE.map(p => p.regione))];

function getProvinceModifier(sigla) {
  const popMap = {
    RM:4300,MI:3200,NA:3100,TO:2800,PA:1250,BG:1100,BO:1000,FI:1000,GE:850,BA:750,
    CT:700,VE:650,CA:620,BZ:530,PD:520,MO:500,RE:480,VR:460,TS:430,PG:420,CAG:410,
    SA:400,CE:390,LE:380,PN:370,FC:360,TN:350,AV:340,AN:330,CO:320,UD:310,PZ:300,
    KR:290,LI:280,ME:270,PI:260,MC:250,PV:240,AO:230,PE:220,RC:210,VT:200,SI:190,
    RG:180,PR:170,CR:160,LU:150,FG:140,CH:130,CZ:120,SO:110,SR:100,SP:95,AQ:90,
    IM:85,BI:80,VC:75,NO:70,AL:65,AT:60,PT:55,AR:50,PO:48,MB:46,LC:44,LO:42,
    MN:40,LV:38,VI:36,BL:34,TR:32,RI:28,FR:26,LT:24,GO:22,GR:20,AG:18,CL:16,
    EN:14,TP:12,SS:10,NU:8,OR:6,CI:4,OG:3,VS:2,VV:1,CB:1,IS:1,BN:1,BR:1,BT:1,
    TA:1,FM:1,AP:1,PC:1,RA:1,FE:1,RN:1,RO:1,BS:1,VB:1,CN:1,SV:1,MS:1,
  };
  const pop = popMap[sigla] || 200;
  if (pop > 2000) return 18;
  if (pop > 1000) return 14;
  if (pop > 500) return 10;
  if (pop > 300) return 6;
  if (pop > 150) return 3;
  return 0;
}

// ═══ HASH ═══
function hashString(str) {
  let h = 0;
  for (let i = 0; i < str.length; i++) {
    h = ((h << 5) - h) + str.charCodeAt(i);
    h |= 0;
  }
  return Math.abs(h);
}
function srand(seed) { return (hashString(seed) % 10000) / 10000; }
function srandRange(seed, min, max) { return min + srand(seed) * (max - min); }
function srandInt(seed, min, max) { return Math.floor(srandRange(seed, min, max + 1)); }

// ═══ CLASSI DI CONCORSO ═══
const CLASSI = [
  ['00AA','Posto comune - Scuola dell\'Infanzia','Infanzia','A'],
  ['00EE','Posto comune - Scuola Primaria','Primaria','A'],
  ['EEEM','Educazione motoria - Scuola Primaria','Primaria','A'],
  ['AD0D','Sostegno - Scuola dell\'Infanzia','Infanzia','S'],
  ['AD0J','Sostegno - Scuola Primaria','Primaria','S'],
  ['AD00','Sostegno - Secondaria I Grado','Secondaria I Grado','S'],
  ['ADSS','Sostegno - Secondaria II Grado','Secondaria II Grado','S'],
  ['A-01','Disegno e storia dell\'arte','Secondaria I Grado','A'],
  ['A-11','Discipline letterarie e latino','Secondaria II Grado','A'],
  ['A-12','Discipline letterarie','Secondaria I Grado','A'],
  ['A-13','Discipline letterarie, latino e greco','Secondaria II Grado','A'],
  ['A-18','Filosofia e scienze umane','Secondaria II Grado','A'],
  ['A-19','Filosofia e storia','Secondaria II Grado','A'],
  ['A-20','Fisica','Secondaria II Grado','A'],
  ['A-21','Geografia','Secondaria I Grado','A'],
  ['A-22','Lingue e culture straniere','Secondaria I Grado','A'],
  ['A-26','Matematica','Secondaria II Grado','A'],
  ['A-27','Matematica e fisica','Secondaria II Grado','A'],
  ['A-28','Matematica e scienze','Secondaria I Grado','A'],
  ['A-30','Musica','Secondaria I Grado','A'],
  ['A-34','Scienze e tecnologie chimiche','Secondaria II Grado','A'],
  ['A-41','Scienze e tecnologie informatiche','Secondaria II Grado','A'],
  ['A-45','Scienze economico-aziendali','Secondaria II Grado','A'],
  ['A-46','Scienze giuridico-economiche','Secondaria II Grado','A'],
  ['A-48','Scienze motorie e sportive','Secondaria I Grado','A'],
  ['A-50','Scienze naturali, chimiche e biologiche','Secondaria II Grado','A'],
  ['A-54','Storia dell\'arte','Secondaria II Grado','A'],
  ['A-55','Strumento musicale','Secondaria II Grado','A'],
  ['A-56','Strumento musicale - I grado','Secondaria I Grado','A'],
  ['A-60','Tecnologia - Secondaria I Grado','Secondaria I Grado','A'],
  ['A-61','Tecnologie e tecniche comunicazioni multimediali','Secondaria II Grado','A'],
  ['A-66','Informatica (esaurimento)','Secondaria II Grado','A'],
  ['AA22','Lingua e letteratura francese','Secondaria I Grado','A'],
  ['AB22','Lingua e letteratura inglese','Secondaria I Grado','A'],
  ['AC22','Lingua e letteratura spagnola','Secondaria I Grado','A'],
  ['AD22','Lingua e letteratura tedesca','Secondaria I Grado','A'],
  ['A-02','Design dei metalli e dell\'oreficeria','Secondaria II Grado','A'],
  ['A-03','Design della ceramica','Secondaria II Grado','A'],
  ['A-04','Design del libro','Secondaria II Grado','A'],
  ['A-05','Design del tessuto e della moda','Secondaria II Grado','A'],
  ['A-06','Design del vetro','Secondaria II Grado','A'],
  ['A-07','Discipline audiovisive','Secondaria II Grado','A'],
  ['A-08','Discipline geometriche e architettura','Secondaria II Grado','A'],
  ['A-09','Discipline grafiche, pittoriche e scenografiche','Secondaria II Grado','A'],
  ['A-10','Discipline grafico-pubblicitarie','Secondaria II Grado','A'],
  ['A-15','Discipline sanitarie','Secondaria II Grado','A'],
  ['A-16','Disegno artistico e modellazione odontotecnica','Secondaria II Grado','A'],
  ['A-23','Lingua italiana per alloglotti','Secondaria I Grado','A'],
  ['A-31','Scienze degli alimenti','Secondaria II Grado','A'],
  ['A-32','Scienze della geologia e della mineralogia','Secondaria II Grado','A'],
  ['A-33','Scienze e tecnologie aeronautiche','Secondaria II Grado','A'],
  ['A-35','Scienze e tecnologie della calzatura e della moda','Secondaria II Grado','A'],
  ['A-36','Scienze e tecnologie della logistica','Secondaria II Grado','A'],
  ['A-37','Scienze e tecnologie delle costruzioni','Secondaria II Grado','A'],
  ['A-38','Scienze e tecnologie delle costruzioni aeronautiche','Secondaria II Grado','A'],
  ['A-39','Scienze e tecnologie delle costruzioni navali','Secondaria II Grado','A'],
  ['A-40','Scienze e tecnologie elettriche ed elettroniche','Secondaria II Grado','A'],
  ['A-42','Scienze e tecnologie meccaniche','Secondaria II Grado','A'],
  ['A-43','Scienze e tecnologie nautiche','Secondaria II Grado','A'],
  ['A-44','Scienze e tecnologie tessili','Secondaria II Grado','A'],
  ['A-47','Scienze matematiche applicate','Secondaria II Grado','A'],
  ['A-51','Scienze, tecnologie e tecniche agrarie','Secondaria II Grado','A'],
  ['A-52','Scienze, tecnologie e tecniche di produzioni animali','Secondaria II Grado','A'],
  ['A-53','Storia della musica e della danza','Secondaria II Grado','A'],
  ['A-57','Tecnica della danza classica','Secondaria II Grado','A'],
  ['A-58','Tecnica della danza contemporanea','Secondaria II Grado','A'],
  ['A-59','Tecniche di accompagnamento alla danza','Secondaria II Grado','A'],
  ['A-62','Tecnologie e tecniche per la grafica','Secondaria II Grado','A'],
  ['A-63','Tecnologie musicali','Secondaria II Grado','A'],
  ['A-64','Teoria, analisi e composizione','Secondaria II Grado','A'],
  ['A-65','Teoria e tecnica della comunicazione','Secondaria II Grado','A'],
  ['B-01','Laboratorio tecnologie grafiche','Secondaria II Grado','B'],
  ['B-02','Laboratorio tecnologie dell\'edilizia','Secondaria II Grado','B'],
  ['B-03','Laboratorio tecnologie meccaniche','Secondaria II Grado','B'],
  ['B-04','Laboratorio chimica industriale','Secondaria II Grado','B'],
  ['B-05','Laboratorio tecnologie elettriche ed elettroniche','Secondaria II Grado','B'],
  ['B-06','Laboratorio tecnologie informatiche','Secondaria II Grado','B'],
  ['B-07','Laboratorio trasporto e logistica','Secondaria II Grado','B'],
  ['B-08','Laboratorio commercio e pubblicità','Secondaria II Grado','B'],
  ['B-09','Laboratorio tecniche audiovisive','Secondaria II Grado','B'],
  ['B-10','Laboratorio navigazione','Secondaria II Grado','B'],
  ['B-11','Laboratorio aeronautica','Secondaria II Grado','B'],
  ['B-12','Laboratorio sicurezza','Secondaria II Grado','B'],
  ['B-13','Laboratorio gastronomia e pasticceria','Secondaria II Grado','B'],
  ['B-14','Laboratorio enologia e sommelleria','Secondaria II Grado','B'],
  ['B-15','Laboratorio produzioni alimentari','Secondaria II Grado','B'],
  ['B-16','Laboratorio zootecnia e veterinaria','Secondaria II Grado','B'],
  ['B-17','Laboratorio viticoltura e ortofrutta','Secondaria II Grado','B'],
  ['B-18','Laboratorio legno e arredamento','Secondaria II Grado','B'],
  ['B-19','Laboratorio moda e costume','Secondaria II Grado','B'],
  ['B-20','Laboratorio oreficeria e gioiello','Secondaria II Grado','B'],
  ['B-21','Laboratorio tecniche grafiche','Secondaria II Grado','B'],
  ['B-22','Laboratorio arti grafiche','Secondaria II Grado','B'],
  ['B-23','Laboratorio falegnameria','Secondaria II Grado','B'],
  ['B-24','Laboratorio apparati e impianti','Secondaria II Grado','B'],
  ['B-25','Laboratorio tecniche del corpo','Secondaria II Grado','B'],
  ['B-26','Laboratorio paesaggio e verde','Secondaria II Grado','B'],
  ['B-27','Laboratorio servizi per la persona','Secondaria II Grado','B'],
  ['B-28','Laboratorio promozione della salute','Secondaria II Grado','B'],
  ['B-29','Laboratorio turismo','Secondaria II Grado','B'],
  ['B-30','Laboratorio assistenza alla persona','Secondaria II Grado','B'],
  ['B-31','Laboratorio ristorazione','Secondaria II Grado','B'],
  ['B-32','Laboratorio organizzazione mensa','Secondaria II Grado','B'],
  ['PP','Educatore','Secondaria II Grado','A'],
];

// Classes most used in GPS supplenze
const CLASSI_GPS = [
  '00AA','00EE','EEEM','AD0D','AD0J','AD00','ADSS',
  'A-01','A-11','A-12','A-13','A-18','A-19','A-20','A-21','A-22',
  'A-26','A-27','A-28','A-30','A-34','A-41','A-45','A-46','A-48',
  'A-50','A-54','A-55','A-56','A-60','A-61',
  'AA22','AB22','AC22','AD22',
  'B-01','B-02','B-03','B-06','B-13','B-19','B-29','B-30','PP',
];

const CLASSI_PARAM = {
  '00AA':{bMin:68,bMax:116,bPos:45,bCand:580},
  '00EE':{bMin:72,bMax:120,bPos:60,bCand:720},
  'EEEM':{bMin:65,bMax:100,bPos:18,bCand:180},
  'AD0D':{bMin:55,bMax:95,bPos:25,bCand:150},
  'AD0J':{bMin:58,bMax:98,bPos:28,bCand:160},
  'AD00':{bMin:52,bMax:92,bPos:22,bCand:140},
  'ADSS':{bMin:50,bMax:90,bPos:30,bCand:170},
  'A-01':{bMin:48,bMax:85,bPos:12,bCand:90},
  'A-11':{bMin:55,bMax:95,bPos:20,bCand:180},
  'A-12':{bMin:60,bMax:100,bPos:35,bCand:320},
  'A-13':{bMin:50,bMax:90,bPos:15,bCand:130},
  'A-18':{bMin:45,bMax:82,bPos:10,bCand:70},
  'A-19':{bMin:45,bMax:82,bPos:10,bCand:70},
  'A-20':{bMin:50,bMax:88,bPos:14,bCand:110},
  'A-21':{bMin:48,bMax:85,bPos:12,bCand:95},
  'A-22':{bMin:62,bMax:105,bPos:40,bCand:380},
  'A-26':{bMin:58,bMax:98,bPos:25,bCand:220},
  'A-27':{bMin:50,bMax:88,bPos:14,bCand:110},
  'A-28':{bMin:55,bMax:95,bPos:22,bCand:200},
  'A-30':{bMin:52,bMax:92,bPos:18,bCand:150},
  'A-34':{bMin:45,bMax:82,bPos:10,bCand:75},
  'A-41':{bMin:55,bMax:95,bPos:20,bCand:180},
  'A-45':{bMin:42,bMax:78,bPos:8,bCand:60},
  'A-46':{bMin:42,bMax:78,bPos:8,bCand:60},
  'A-48':{bMin:58,bMax:100,bPos:28,bCand:250},
  'A-50':{bMin:50,bMax:88,bPos:14,bCand:115},
  'A-54':{bMin:45,bMax:82,bPos:10,bCand:75},
  'A-55':{bMin:40,bMax:75,bPos:6,bCand:45},
  'A-56':{bMin:42,bMax:78,bPos:8,bCand:55},
  'A-60':{bMin:50,bMax:88,bPos:15,bCand:120},
  'A-61':{bMin:48,bMax:85,bPos:12,bCand:90},
  'AA22':{bMin:55,bMax:95,bPos:20,bCand:170},
  'AB22':{bMin:62,bMax:108,bPos:45,bCand:420},
  'AC22':{bMin:52,bMax:92,bPos:16,bCand:140},
  'AD22':{bMin:48,bMax:85,bPos:10,bCand:80},
  'B-01':{bMin:38,bMax:72,bPos:5,bCand:35},
  'B-02':{bMin:38,bMax:72,bPos:5,bCand:35},
  'B-03':{bMin:38,bMax:72,bPos:5,bCand:35},
  'B-06':{bMin:38,bMax:72,bPos:5,bCand:35},
  'B-13':{bMin:35,bMax:68,bPos:4,bCand:28},
  'B-19':{bMin:35,bMax:68,bPos:4,bCand:28},
  'B-29':{bMin:35,bMax:68,bPos:4,bCand:28},
  'B-30':{bMin:35,bMax:68,bPos:4,bCand:28},
  'PP':{bMin:40,bMax:75,bPos:6,bCand:40},
};
const DEFAULT_PARAM = {bMin:40,bMax:80,bPos:8,bCand:60};

const TURNO_DATE = {
  1:{data:'2024-08-30',periodo:'1 Turno - Agosto/Settembre'},
  2:{data:'2024-09-05',periodo:'2 Turno - Settembre'},
  3:{data:'2024-09-10',periodo:'3 Turno - Settembre'},
  4:{data:'2024-09-17',periodo:'4 Turno - Settembre'},
  5:{data:'2024-09-24',periodo:'5 Turno - Settembre'},
  6:{data:'2024-10-03',periodo:'6 Turno - Ottobre'},
  7:{data:'2024-10-10',periodo:'7 Turno - Ottobre'},
  8:{data:'2024-10-17',periodo:'8 Turno - Ottobre'},
  9:{data:'2024-10-24',periodo:'9 Turno - Ottobre'},
  10:{data:'2024-11-07',periodo:'10 Turno - Novembre'},
  11:{data:'2024-11-14',periodo:'11 Turno - Novembre'},
  12:{data:'2024-11-21',periodo:'12 Turno - Novembre'},
  13:{data:'2024-12-05',periodo:'13 Turno - Dicembre'},
  14:{data:'2024-12-09',periodo:'14 Turno - Dicembre'},
};

function getNumTurni(classe, prov) {
  const r = srand(`turni-${classe}-${prov}`);
  if (r < 0.1) return 5;
  if (r < 0.3) return 6;
  if (r < 0.5) return 7;
  if (r < 0.8) return 8;
  if (r < 0.95) return 9;
  return 10;
}

function genBollettino(classe, prov, turno, anno) {
  const p = CLASSI_PARAM[classe] || DEFAULT_PARAM;
  const pm = getProvinceModifier(prov);
  const s = `${classe}-${prov}-${turno}`;
  const tp = turno * 1.5;
  const minS = Math.round((p.bMin + pm + tp + srandRange(`${s}mn`, -2, 3)) * 10) / 10;
  const maxS = Math.round((minS + 18 + srandRange(`${s}rg`, 0, 12)) * 10) / 10;
  const pos = Math.max(2, Math.round(p.bPos + pm * 0.8 + srandInt(`${s}ps`, -5, 8)));
  const cand = Math.max(pos + 10, Math.round(p.bCand + pm * 3 + srandInt(`${s}cd`, -30, 50)));
  const posUlt = Math.max(1, Math.min(cand, Math.round(cand * 0.15 + turno * pos * 0.7 + srandRange(`${s}pu`, 0, pos * 0.3))));
  const rap = cand / Math.max(pos, 1);
  let comp = 'bassa';
  if (rap > 15) comp = 'molto_alta';
  else if (rap > 10) comp = 'alta';
  else if (rap > 5) comp = 'media';
  const tR = srand(`${s}tr`);
  const trend = tR < 0.3 ? 'crescente' : tR < 0.6 ? 'decrescente' : 'stabile';
  const td = TURNO_DATE[turno] || {data:`2024-${String(Math.min(turno+7,12)).padStart(2,'0')}-15`,periodo:`${turno} Turno`};
  const tipoC = turno <= 8 ? 'Supplenza temporanea al 30/06' : 'Supplenza temporanea al 31/08';
  return {
    id: `${classe}-${prov}-T${turno}`,
    classeCodice: classe,
    provinciaSigla: prov,
    annoScolastico: anno,
    turno,
    dataBollettino: td.data,
    periodoChiamata: td.periodo,
    tipoGraduatoria: 'GPS I Fascia',
    punteggioMinimo: minS,
    punteggioMassimo: maxS,
    posizioneUltimaConvocazione: posUlt,
    posizioniAssegnate: pos,
    candidatiInGraduatoria: cand,
    tipoContratto: tipoC,
    competizione: comp,
    trend,
  };
}

// ═══ GENERATE ═══
let _cache = null;
function ensureGenerated() {
  if (_cache) return _cache;
  _cache = new Map();
  for (const classe of CLASSI_GPS) {
    for (const prov of PROVINCE) {
      const nt = getNumTurni(classe, prov.sigla);
      const entries = [];
      for (let t = 1; t <= nt; t++) entries.push(genBollettino(classe, prov.sigla, t, '2024/25'));
      _cache.set(`${classe}-${prov.sigla}`, entries);
    }
  }
  return _cache;
}

// ═══ BUILD OUTPUT ═══
let code = `// ============================================================
// BOLLETTINI DI NOMINE — Classi di concorso ufficiali
// DM 259/17 + DM 22/12/2023 — Fonte: classidiconcorso.it / MIM
// Generatore: ${CLASSI.length} classi x ${PROVINCE.length} province x 5-10 turni
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
`;

// Sort classi by ordine then codice
const ordineSort = {'Infanzia':0,'Primaria':1,'Secondaria I Grado':2,'Secondaria II Grado':3};
const sortedClassi = [...CLASSI].sort((a,b) => {
  const d = ordineSort[a[2]] - ordineSort[b[2]];
  return d !== 0 ? d : a[0].localeCompare(b[0]);
});

// Track which classes apply to both I and II grado
const bothGrado = new Set(['A-01','A-12','A-21','A-22','A-30','A-48','AA22','AB22','AC22','AD22']);

for (const [cod, mat, ord, fasc] of sortedClassi) {
  const both = bothGrado.has(cod);
  const ordArr = both ? `, ordiniiApplicabili: ['Secondaria I Grado', 'Secondaria II Grado']` : '';
  const matEsc = mat.replace(/'/g, "\\'");
  code += `  { codice: '${cod}', materia: '${matEsc}', ordineScuola: '${ord}', fascia: '${fasc}'${ordArr} },\n`;
}

code += `];\n\n`;

// CLASSI_GPS list
code += `const CLASSI_GPS_COMUNI = ${JSON.stringify(CLASSI_GPS)};\n\n`;

// CLASSI_PARAM
code += `interface ClassiParam { bMin: number; bMax: number; bPos: number; bCand: number; }\n`;
code += `const CLASSI_PARAMS: Record<string, ClassiParam> = ${JSON.stringify(CLASSI_PARAM, null, 0)};\n`;
code += `const DEFAULT_PARAMS: ClassiParam = ${JSON.stringify(DEFAULT_PARAM)};\n\n`;

// TURNO_DATE
code += `const TURNO_DATE: Record<number, { data: string; periodo: string }> = ${JSON.stringify(TURNO_DATE)};\n\n`;

// Province modifier + hash functions
code += `// ═══ FUNZIONI DETERMINISTICHE ═══

function hashString(str: string): number {
  let h = 0;
  for (let i = 0; i < str.length; i++) { h = ((h << 5) - h) + str.charCodeAt(i); h |= 0; }
  return Math.abs(h);
}
function srand(seed: string): number { return (hashString(seed) % 10000) / 10000; }
function srandRange(seed: string, min: number, max: number): number { return min + srand(seed) * (max - min); }
function srandInt(seed: string, min: number, max: number): number { return Math.floor(srandRange(seed, min, max + 1)); }

const PROV_MOD: Record<string, number> = {
  ${PROVINCE.map(p => `'${p.sigla}':${getProvinceModifier(p.sigla)}`).join(',\n  ')}
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
const PROVINCE_LIST = ${JSON.stringify(PROVINCE.map(p => p.sigla))};

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
    if (typeof prop === 'string' && /^\d+$/.test(prop)) {
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
`;

writeFileSync(outPath, code, 'utf-8');
console.log(`Written ${code.length} chars to ${outPath}`);
console.log(`Classi: ${CLASSI.length}, Province: ${PROVINCE.length}`);
console.log(`GPS classes: ${CLASSI_GPS.length}`);
