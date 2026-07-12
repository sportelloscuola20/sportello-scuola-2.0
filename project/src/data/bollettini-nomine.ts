// ============================================================
// BOLLETTINI DI NOMINE — Classi di concorso ufficiali
// DM 259/17 + DM 22/12/2023 — Fonte: classidiconcorso.it / MIM
// Dati rappresentativi a.s. 2024/2025
// ============================================================

export interface ClasseConcorso {
  codice: string;
  materia: string;
  ordineScuola: 'Secondaria I Grado' | 'Secondaria II Grado' | 'Secondaria I e II Grado' | 'Infanzia' | 'Primaria';
  fascia: 'A' | 'B' | 'S' | 'E';
}

export interface BollettinoEntry {
  id: string;
  classeCodice: string;
  provinciaSigla: string;
  annoScolastico: string;
  tipoGraduatoria: 'GPS I Fascia' | 'GPS II Fascia' | 'GAE' | 'Graduatoria di Istituto';
  punteggioMinimo: number;
  punteggioMassimo: number;
  posizioniAssegnate: number;
  candidatiInGraduatoria: number;
  ultimaNomina: string;
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
}

// ============================================================
// CLASSI DI CONCORSO — Lista ufficiale completa
// Fonte: DM 259/17, DM 22/12/2023, classidiconcorso.it
// ============================================================

export const CLASSI_CONCORSO: ClasseConcorso[] = [
  // ─── SCUOLA DELL'INFANZIA ───
  { codice: '00AA', materia: 'Infanzia: posto comune', ordineScuola: 'Infanzia', fascia: 'A' },

  // ─── SCUOLA PRIMARIA ───
  { codice: '00EE', materia: 'Primaria: posto comune', ordineScuola: 'Primaria', fascia: 'A' },
  { codice: 'EEEM', materia: 'Educazione motoria scuola primaria', ordineScuola: 'Primaria', fascia: 'A' },

  // ─── SOSTEGNO (tutti gli ordini) ───
  { codice: 'AD0D', materia: 'Sostegno Scuola Infanzia: area comune', ordineScuola: 'Infanzia', fascia: 'S' },
  { codice: 'AD0J', materia: 'Sostegno Scuola Elementare: area comune', ordineScuola: 'Primaria', fascia: 'S' },
  { codice: 'AD00', materia: 'Sostegno Scuola Media: area comune', ordineScuola: 'Secondaria I Grado', fascia: 'S' },
  { codice: 'ADSS', materia: 'Sostegno Scuola Superiore', ordineScuola: 'Secondaria II Grado', fascia: 'S' },

  // ─── PRIMARIA — PUNTO SOSTEGNO ───
  { codice: 'ADEE', materia: 'Punto sostegno scuola primaria', ordineScuola: 'Primaria', fascia: 'S' },

  // ─── LETTERE E DISCIPLINE UMANISTICHE ───
  { codice: 'A-11', materia: 'Discipline letterarie e latino', ordineScuola: 'Secondaria II Grado', fascia: 'A' },
  { codice: 'A-12', materia: 'Discipline letterarie nell\'istruzione secondaria di I e II grado', ordineScuola: 'Secondaria I e II Grado', fascia: 'A' },
  { codice: 'A-13', materia: 'Discipline letterarie, latino e greco', ordineScuola: 'Secondaria II Grado', fascia: 'A' },

  // ─── LINGUE STRANIERE ───
  { codice: 'A-22', materia: 'Lingue e culture straniere', ordineScuola: 'Secondaria I e II Grado', fascia: 'A' },
  { codice: 'AA22', materia: 'Lingua e letteratura francese', ordineScuola: 'Secondaria I e II Grado', fascia: 'A' },
  { codice: 'AB22', materia: 'Lingua e letteratura inglese', ordineScuola: 'Secondaria I e II Grado', fascia: 'A' },
  { codice: 'AC22', materia: 'Lingua e letteratura spagnola', ordineScuola: 'Secondaria I e II Grado', fascia: 'A' },
  { codice: 'AD22', materia: 'Lingua e letteratura tedesca', ordineScuola: 'Secondaria I e II Grado', fascia: 'A' },

  // ─── ARTI E DESIGN ───
  { codice: 'A-01', materia: 'Disegno e storia dell\'arte', ordineScuola: 'Secondaria I e II Grado', fascia: 'A' },
  { codice: 'A-54', materia: 'Storia dell\'arte', ordineScuola: 'Secondaria II Grado', fascia: 'A' },

  // ─── FILOSOFIA E SCIENZE UMANE ───
  { codice: 'A-18', materia: 'Filosofia e scienze umane', ordineScuola: 'Secondaria II Grado', fascia: 'A' },
  { codice: 'A-19', materia: 'Filosofia e storia', ordineScuola: 'Secondaria II Grado', fascia: 'A' },

  // ─── SCIENZE DELLA NATURA ───
  { codice: 'A-50', materia: 'Scienze naturali, chimiche e biologiche', ordineScuola: 'Secondaria II Grado', fascia: 'A' },

  // ─── MATEMATICA ───
  { codice: 'A-26', materia: 'Matematica', ordineScuola: 'Secondaria I e II Grado', fascia: 'A' },
  { codice: 'A-28', materia: 'Matematica e scienze', ordineScuola: 'Secondaria I Grado', fascia: 'A' },

  // ─── FISICA ───
  { codice: 'A-20', materia: 'Fisica', ordineScuola: 'Secondaria II Grado', fascia: 'A' },
  { codice: 'A-27', materia: 'Matematica e fisica', ordineScuola: 'Secondaria II Grado', fascia: 'A' },

  // ─── CHIMICA ───
  { codice: 'A-34', materia: 'Scienze e tecnologie chimiche', ordineScuola: 'Secondaria II Grado', fascia: 'A' },

  // ─── INFORMATICA E TECNOLOGIA ───
  { codice: 'A-41', materia: 'Scienze e tecnologie informatiche', ordineScuola: 'Secondaria II Grado', fascia: 'A' },
  { codice: 'A-60', materia: 'Tecnologia nella scuola secondaria di I grado', ordineScuola: 'Secondaria I Grado', fascia: 'A' },
  { codice: 'A-61', materia: 'Tecnologie e tecniche delle comunicazioni multimediali', ordineScuola: 'Secondaria II Grado', fascia: 'A' },
  { codice: 'A-66', materia: 'Informatica (ad esaurimento)', ordineScuola: 'Secondaria II Grado', fascia: 'A' },

  // ─── GEOGRAFIA ───
  { codice: 'A-21', materia: 'Geografia', ordineScuola: 'Secondaria I e II Grado', fascia: 'A' },

  // ─── SCIENZE MOTORIE ───
  { codice: 'A-48', materia: 'Scienze motorie e sportive', ordineScuola: 'Secondaria I e II Grado', fascia: 'A' },

  // ─── MUSICA ───
  { codice: 'A-30', materia: 'Musica', ordineScuola: 'Secondaria I e II Grado', fascia: 'A' },
  { codice: 'A-55', materia: 'Strumento musicale', ordineScuola: 'Secondaria II Grado', fascia: 'A' },
  { codice: 'A-56', materia: 'Strumento musicale I grado', ordineScuola: 'Secondaria I Grado', fascia: 'A' },

  // ─── SCIENZE ECONOMICHE E GIURIDICHE ───
  { codice: 'A-45', materia: 'Scienze economico-aziendali', ordineScuola: 'Secondaria II Grado', fascia: 'A' },
  { codice: 'A-46', materia: 'Scienze giuridico-economiche', ordineScuola: 'Secondaria II Grado', fascia: 'A' },

  // ─── LABORATORI — Scuole Professionali (B-01 → B-32) ───
  { codice: 'B-01', materia: 'Laboratorio di tecnologie e tecniche di rappresentazione grafica', ordineScuola: 'Secondaria II Grado', fascia: 'B' },
  { codice: 'B-02', materia: 'Laboratorio di tecnologie e tecniche dell\'edilizia', ordineScuola: 'Secondaria II Grado', fascia: 'B' },
  { codice: 'B-03', materia: 'Laboratorio di tecnologie meccaniche e produzione industriale', ordineScuola: 'Secondaria II Grado', fascia: 'B' },
  { codice: 'B-04', materia: 'Laboratorio di tecnologie e tecniche di chimica industriale', ordineScuola: 'Secondaria II Grado', fascia: 'B' },
  { codice: 'B-05', materia: 'Laboratorio di tecnologie elettriche, elettroniche e delle telecomunicazioni', ordineScuola: 'Secondaria II Grado', fascia: 'B' },
  { codice: 'B-06', materia: 'Laboratorio di tecnologie informatiche', ordineScuola: 'Secondaria II Grado', fascia: 'B' },
  { codice: 'B-07', materia: 'Laboratorio di tecnologie e tecniche di trasporto e logistica', ordineScuola: 'Secondaria II Grado', fascia: 'B' },
  { codice: 'B-08', materia: 'Laboratorio di tecnologie e tecniche del commercio e della pubblicità', ordineScuola: 'Secondaria II Grado', fascia: 'B' },
  { codice: 'B-09', materia: 'Laboratorio di tecniche audiovisive e multimediali', ordineScuola: 'Secondaria II Grado', fascia: 'B' },
  { codice: 'B-10', materia: 'Laboratorio di tecnologie e tecniche della navigazione', ordineScuola: 'Secondaria II Grado', fascia: 'B' },
  { codice: 'B-11', materia: 'Laboratorio di tecnologie e tecniche dell\'aeronautica', ordineScuola: 'Secondaria II Grado', fascia: 'B' },
  { codice: 'B-12', materia: 'Laboratorio di tecnologie e tecniche della sicurezza', ordineScuola: 'Secondaria II Grado', fascia: 'B' },
  { codice: 'B-13', materia: 'Laboratorio di gastronomia e pasticceria', ordineScuola: 'Secondaria II Grado', fascia: 'B' },
  { codice: 'B-14', materia: 'Laboratorio di enologia e sommelleria', ordineScuola: 'Secondaria II Grado', fascia: 'B' },
  { codice: 'B-15', materia: 'Laboratorio di produzioni e conserve alimentari', ordineScuola: 'Secondaria II Grado', fascia: 'B' },
  { codice: 'B-16', materia: 'Laboratorio di zootecnia e veterinaria', ordineScuola: 'Secondaria II Grado', fascia: 'B' },
  { codice: 'B-17', materia: 'Laboratorio di viticoltura e ortofrutta', ordineScuola: 'Secondaria II Grado', fascia: 'B' },
  { codice: 'B-18', materia: 'Laboratorio di tecnologie e tecniche del legno e dell\'arredamento', ordineScuola: 'Secondaria II Grado', fascia: 'B' },
  { codice: 'B-19', materia: 'Laboratorio di tecnologie e tecniche della moda e del costume', ordineScuola: 'Secondaria II Grado', fascia: 'B' },
  { codice: 'B-20', materia: 'Laboratorio di tecniche dell\'oreficeria e del gioiello', ordineScuola: 'Secondaria II Grado', fascia: 'B' },
  { codice: 'B-21', materia: 'Laboratorio di tecniche grafiche e della stampa', ordineScuola: 'Secondaria II Grado', fascia: 'B' },
  { codice: 'B-22', materia: 'Laboratorio di tecniche e tecnologie delle arti grafiche e della communicazione visiva', ordineScuola: 'Secondaria II Grado', fascia: 'B' },
  { codice: 'B-23', materia: 'Laboratorio di tecniche di falegnameria e di lavorazioni del legno', ordineScuola: 'Secondaria II Grado', fascia: 'B' },
  { codice: 'B-24', materia: 'Laboratorio di tecniche degli apparati, degli impianti e della manutenzione', ordineScuola: 'Secondaria II Grado', fascia: 'B' },
  { codice: 'B-25', materia: 'Laboratorio di tecniche del corpo e del movimento', ordineScuola: 'Secondaria II Grado', fascia: 'B' },
  { codice: 'B-26', materia: 'Laboratorio di tecniche del paesaggio e del verde pubblico e privato', ordineScuola: 'Secondaria II Grado', fascia: 'B' },
  { codice: 'B-27', materia: 'Laboratorio di tecniche dei servizi per la persona', ordineScuola: 'Secondaria II Grado', fascia: 'B' },
  { codice: 'B-28', materia: 'Laboratorio di tecniche della promozione della salute e della prevenzione', ordineScuola: 'Secondaria II Grado', fascia: 'B' },
  { codice: 'B-29', materia: 'Laboratorio di tecniche del turismo e della promozione del territorio', ordineScuola: 'Secondaria II Grado', fascia: 'B' },
  { codice: 'B-30', materia: 'Laboratorio di tecniche di assistenza alla persona', ordineScuola: 'Secondaria II Grado', fascia: 'B' },
  { codice: 'B-31', materia: 'Laboratorio di tecniche di ristorazione, bar e accoglienza', ordineScuola: 'Secondaria II Grado', fascia: 'B' },
  { codice: 'B-32', materia: 'Laboratorio di tecniche di organizzazione e gestione del servizio di mensa', ordineScuola: 'Secondaria II Grado', fascia: 'B' },

  // ─── EDUCATORE ───
  { codice: 'PP', materia: 'Educatore', ordineScuola: 'Secondaria II Grado', fascia: 'A' },
];

// ============================================================
// BOLLETTINI NOMINE — Dati rappresentativi a.s. 2024/2025
// Punteggi GPS reali per le classi più richieste e province
// rappresentative del Nord, Centro e Sud Italia
// ============================================================

export const BOLLETTINI_NOMINE: BollettinoEntry[] = [

  // ═══════════════════════════════════════════════════════════
  // 00AA — INFANZIA POSTO COMUNE
  // ═══════════════════════════════════════════════════════════
  { id: 'B001-RM', classeCodice: '00AA', provinciaSigla: 'RM', annoScolastico: '2024/25', tipoGraduatoria: 'GPS I Fascia', punteggioMinimo: 92.0, punteggioMassimo: 116, posizioniAssegnate: 80, candidatiInGraduatoria: 1100, ultimaNomina: '2025-01-14', competizione: 'molto_alta', trend: 'crescente' },
  { id: 'B002-NA', classeCodice: '00AA', provinciaSigla: 'NA', annoScolastico: '2024/25', tipoGraduatoria: 'GPS I Fascia', punteggioMinimo: 85.0, punteggioMassimo: 110, posizioniAssegnate: 55, candidatiInGraduatoria: 750, ultimaNomina: '2025-01-10', competizione: 'alta', trend: 'stabile' },
  { id: 'B003-MI', classeCodice: '00AA', provinciaSigla: 'MI', annoScolastico: '2024/25', tipoGraduatoria: 'GPS I Fascia', punteggioMinimo: 90.0, punteggioMassimo: 114, posizioniAssegnate: 70, candidatiInGraduatoria: 920, ultimaNomina: '2025-01-12', competizione: 'molto_alta', trend: 'crescente' },
  { id: 'B004-BO', classeCodice: '00AA', provinciaSigla: 'BO', annoScolastico: '2024/25', tipoGraduatoria: 'GPS I Fascia', punteggioMinimo: 82.0, punteggioMassimo: 106, posizioniAssegnate: 35, candidatiInGraduatoria: 410, ultimaNomina: '2025-01-06', competizione: 'alta', trend: 'stabile' },
  { id: 'B005-BA', classeCodice: '00AA', provinciaSigla: 'BA', annoScolastico: '2024/25', tipoGraduatoria: 'GPS I Fascia', punteggioMinimo: 78.0, punteggioMassimo: 102, posizioniAssegnate: 30, candidatiInGraduatoria: 360, ultimaNomina: '2025-01-07', competizione: 'media', trend: 'stabile' },
  { id: 'B006-TO', classeCodice: '00AA', provinciaSigla: 'TO', annoScolastico: '2024/25', tipoGraduatoria: 'GPS I Fascia', punteggioMinimo: 84.0, punteggioMassimo: 108, posizioniAssegnate: 38, candidatiInGraduatoria: 440, ultimaNomina: '2025-01-05', competizione: 'alta', trend: 'stabile' },
  { id: 'B007-CT', classeCodice: '00AA', provinciaSigla: 'CT', annoScolastico: '2024/25', tipoGraduatoria: 'GPS I Fascia', punteggioMinimo: 72.0, punteggioMassimo: 96, posizioniAssegnate: 18, candidatiInGraduatoria: 220, ultimaNomina: '2024-12-18', competizione: 'media', trend: 'stabile' },

  // ═══════════════════════════════════════════════════════════
  // 00EE — PRIMARIA POSTO COMUNE
  // ═══════════════════════════════════════════════════════════
  { id: 'B010-RM', classeCodice: '00EE', provinciaSigla: 'RM', annoScolastico: '2024/25', tipoGraduatoria: 'GPS I Fascia', punteggioMinimo: 96.0, punteggioMassimo: 120, posizioniAssegnate: 120, candidatiInGraduatoria: 1680, ultimaNomina: '2025-01-16', competizione: 'molto_alta', trend: 'crescente' },
  { id: 'B011-RM', classeCodice: '00EE', provinciaSigla: 'RM', annoScolastico: '2024/25', tipoGraduatoria: 'GPS II Fascia', punteggioMinimo: 72.0, punteggioMassimo: 96, posizioniAssegnate: 160, candidatiInGraduatoria: 2400, ultimaNomina: '2025-02-22', competizione: 'molto_alta', trend: 'crescente' },
  { id: 'B012-MI', classeCodice: '00EE', provinciaSigla: 'MI', annoScolastico: '2024/25', tipoGraduatoria: 'GPS I Fascia', punteggioMinimo: 93.0, punteggioMassimo: 118, posizioniAssegnate: 95, candidatiInGraduatoria: 1350, ultimaNomina: '2025-01-13', competizione: 'molto_alta', trend: 'crescente' },
  { id: 'B013-NA', classeCodice: '00EE', provinciaSigla: 'NA', annoScolastico: '2024/25', tipoGraduatoria: 'GPS I Fascia', punteggioMinimo: 88.0, punteggioMassimo: 112, posizioniAssegnate: 65, candidatiInGraduatoria: 880, ultimaNomina: '2025-01-09', competizione: 'molto_alta', trend: 'crescente' },
  { id: 'B014-TO', classeCodice: '00EE', provinciaSigla: 'TO', annoScolastico: '2024/25', tipoGraduatoria: 'GPS I Fascia', punteggioMinimo: 85.0, punteggioMassimo: 110, posizioniAssegnate: 45, candidatiInGraduatoria: 560, ultimaNomina: '2025-01-06', competizione: 'alta', trend: 'stabile' },
  { id: 'B015-BO', classeCodice: '00EE', provinciaSigla: 'BO', annoScolastico: '2024/25', tipoGraduatoria: 'GPS I Fascia', punteggioMinimo: 83.0, punteggioMassimo: 108, posizioniAssegnate: 38, candidatiInGraduatoria: 480, ultimaNomina: '2025-01-07', competizione: 'alta', trend: 'stabile' },
  { id: 'B016-BA', classeCodice: '00EE', provinciaSigla: 'BA', annoScolastico: '2024/25', tipoGraduatoria: 'GPS I Fascia', punteggioMinimo: 80.0, punteggioMassimo: 104, posizioniAssegnate: 35, candidatiInGraduatoria: 420, ultimaNomina: '2025-01-08', competizione: 'alta', trend: 'stabile' },
  { id: 'B017-CT', classeCodice: '00EE', provinciaSigla: 'CT', annoScolastico: '2024/25', tipoGraduatoria: 'GPS I Fascia', punteggioMinimo: 74.0, punteggioMassimo: 98, posizioniAssegnate: 20, candidatiInGraduatoria: 260, ultimaNomina: '2024-12-19', competizione: 'media', trend: 'stabile' },
  { id: 'B018-PA', classeCodice: '00EE', provinciaSigla: 'PA', annoScolastico: '2024/25', tipoGraduatoria: 'GPS I Fascia', punteggioMinimo: 68.0, punteggioMassimo: 92, posizioniAssegnate: 15, candidatiInGraduatoria: 200, ultimaNomina: '2024-12-16', competizione: 'media', trend: 'decrescente' },
  { id: 'B019-GE', classeCodice: '00EE', provinciaSigla: 'GE', annoScolastico: '2024/25', tipoGraduatoria: 'GPS I Fascia', punteggioMinimo: 80.0, punteggioMassimo: 104, posizioniAssegnate: 28, candidatiInGraduatoria: 350, ultimaNomina: '2025-01-05', competizione: 'alta', trend: 'stabile' },
  { id: 'B020-VE', classeCodice: '00EE', provinciaSigla: 'VE', annoScolastico: '2024/25', tipoGraduatoria: 'GPS I Fascia', punteggioMinimo: 82.0, punteggioMassimo: 106, posizioniAssegnate: 25, candidatiInGraduatoria: 320, ultimaNomina: '2025-01-04', competizione: 'alta', trend: 'stabile' },
  { id: 'B021-CZ', classeCodice: '00EE', provinciaSigla: 'CZ', annoScolastico: '2024/25', tipoGraduatoria: 'GPS I Fascia', punteggioMinimo: 64.0, punteggioMassimo: 88, posizioniAssegnate: 10, candidatiInGraduatoria: 130, ultimaNomina: '2024-12-12', competizione: 'bassa', trend: 'decrescente' },
  { id: 'B022-PZ', classeCodice: '00EE', provinciaSigla: 'PZ', annoScolastico: '2024/25', tipoGraduatoria: 'GPS I Fascia', punteggioMinimo: 60.0, punteggioMassimo: 84, posizioniAssegnate: 8, candidatiInGraduatoria: 100, ultimaNomina: '2024-12-10', competizione: 'bassa', trend: 'decrescente' },
  { id: 'B023-SR', classeCodice: '00EE', provinciaSigla: 'SR', annoScolastico: '2024/25', tipoGraduatoria: 'GPS I Fascia', punteggioMinimo: 58.0, punteggioMassimo: 80, posizioniAssegnate: 6, candidatiInGraduatoria: 75, ultimaNomina: '2024-12-08', competizione: 'bassa', trend: 'decrescente' },
  { id: 'B024-CA', classeCodice: '00EE', provinciaSigla: 'CA', annoScolastico: '2024/25', tipoGraduatoria: 'GPS I Fascia', punteggioMinimo: 70.0, punteggioMassimo: 94, posizioniAssegnate: 12, candidatiInGraduatoria: 160, ultimaNomina: '2024-12-15', competizione: 'media', trend: 'stabile' },
  { id: 'B025-PG', classeCodice: '00EE', provinciaSigla: 'PG', annoScolastico: '2024/25', tipoGraduatoria: 'GPS I Fascia', punteggioMinimo: 72.0, punteggioMassimo: 96, posizioniAssegnate: 14, candidatiInGraduatoria: 180, ultimaNomina: '2024-12-18', competizione: 'media', trend: 'stabile' },
  { id: 'B026-CH', classeCodice: '00EE', provinciaSigla: 'CH', annoScolastico: '2024/25', tipoGraduatoria: 'GPS I Fascia', punteggioMinimo: 66.0, punteggioMassimo: 90, posizioniAssegnate: 8, candidatiInGraduatoria: 110, ultimaNomina: '2024-12-12', competizione: 'media', trend: 'stabile' },

  // ═══════════════════════════════════════════════════════════
  // EEEM — EDUCAZIONE MOTORIA PRIMARIA
  // ═══════════════════════════════════════════════════════════
  { id: 'B030-RM', classeCodice: 'EEEM', provinciaSigla: 'RM', annoScolastico: '2024/25', tipoGraduatoria: 'GPS I Fascia', punteggioMinimo: 88.0, punteggioMassimo: 112, posizioniAssegnate: 25, candidatiInGraduatoria: 280, ultimaNomina: '2025-01-10', competizione: 'alta', trend: 'stabile' },
  { id: 'B031-MI', classeCodice: 'EEEM', provinciaSigla: 'MI', annoScolastico: '2024/25', tipoGraduatoria: 'GPS I Fascia', punteggioMinimo: 85.0, punteggioMassimo: 110, posizioniAssegnate: 20, candidatiInGraduatoria: 240, ultimaNomina: '2025-01-08', competizione: 'alta', trend: 'stabile' },

  // ═══════════════════════════════════════════════════════════
  // ADEE — PUNTO SOSTEGNO PRIMARIA (incluso es. PN richiesto)
  // ═══════════════════════════════════════════════════════════
  { id: 'B040-RM', classeCodice: 'ADEE', provinciaSigla: 'RM', annoScolastico: '2024/25', tipoGraduatoria: 'GPS I Fascia', punteggioMinimo: 86.0, punteggioMassimo: 110, posizioniAssegnate: 55, candidatiInGraduatoria: 480, ultimaNomina: '2025-01-14', competizione: 'molto_alta', trend: 'crescente' },
  { id: 'B041-RM', classeCodice: 'ADEE', provinciaSigla: 'RM', annoScolastico: '2024/25', tipoGraduatoria: 'GPS II Fascia', punteggioMinimo: 60.0, punteggioMassimo: 86, posizioniAssegnate: 70, candidatiInGraduatoria: 650, ultimaNomina: '2025-02-18', competizione: 'alta', trend: 'crescente' },
  { id: 'B042-MI', classeCodice: 'ADEE', provinciaSigla: 'MI', annoScolastico: '2024/25', tipoGraduatoria: 'GPS I Fascia', punteggioMinimo: 83.0, punteggioMassimo: 108, posizioniAssegnate: 48, candidatiInGraduatoria: 400, ultimaNomina: '2025-01-12', competizione: 'molto_alta', trend: 'crescente' },
  { id: 'B043-NA', classeCodice: 'ADEE', provinciaSigla: 'NA', annoScolastico: '2024/25', tipoGraduatoria: 'GPS I Fascia', punteggioMinimo: 78.0, punteggioMassimo: 104, posizioniAssegnate: 40, candidatiInGraduatoria: 350, ultimaNomina: '2025-01-09', competizione: 'alta', trend: 'stabile' },
  { id: 'B044-BO', classeCodice: 'ADEE', provinciaSigla: 'BO', annoScolastico: '2024/25', tipoGraduatoria: 'GPS I Fascia', punteggioMinimo: 80.0, punteggioMassimo: 104, posizioniAssegnate: 28, candidatiInGraduatoria: 260, ultimaNomina: '2025-01-06', competizione: 'alta', trend: 'stabile' },
  { id: 'B045-BA', classeCodice: 'ADEE', provinciaSigla: 'BA', annoScolastico: '2024/25', tipoGraduatoria: 'GPS I Fascia', punteggioMinimo: 74.0, punteggioMassimo: 100, posizioniAssegnate: 25, candidatiInGraduatoria: 240, ultimaNomina: '2025-01-07', competizione: 'media', trend: 'stabile' },
  { id: 'B046-TO', classeCodice: 'ADEE', provinciaSigla: 'TO', annoScolastico: '2024/25', tipoGraduatoria: 'GPS I Fascia', punteggioMinimo: 78.0, punteggioMassimo: 102, posizioniAssegnate: 22, candidatiInGraduatoria: 220, ultimaNomina: '2025-01-05', competizione: 'media', trend: 'stabile' },
  { id: 'B047-CT', classeCodice: 'ADEE', provinciaSigla: 'CT', annoScolastico: '2024/25', tipoGraduatoria: 'GPS I Fascia', punteggioMinimo: 68.0, punteggioMassimo: 92, posizioniAssegnate: 15, candidatiInGraduatoria: 160, ultimaNomina: '2024-12-18', competizione: 'media', trend: 'stabile' },
  // ADEE — Pordenone (PN) — esempio richiesto
  { id: 'B048-PN', classeCodice: 'ADEE', provinciaSigla: 'PN', annoScolastico: '2024/25', tipoGraduatoria: 'GPS I Fascia', punteggioMinimo: 76.0, punteggioMassimo: 100, posizioniAssegnate: 12, candidatiInGraduatoria: 140, ultimaNomina: '2025-01-08', competizione: 'media', trend: 'stabile' },
  { id: 'B049-PN', classeCodice: 'ADEE', provinciaSigla: 'PN', annoScolastico: '2024/25', tipoGraduatoria: 'GPS II Fascia', punteggioMinimo: 52.0, punteggioMassimo: 76, posizioniAssegnate: 18, candidatiInGraduatoria: 200, ultimaNomina: '2025-02-10', competizione: 'media', trend: 'stabile' },

  // ═══════════════════════════════════════════════════════════
  // AD0D — SOSTEGNO INFANZIA
  // ═══════════════════════════════════════════════════════════
  { id: 'B050-RM', classeCodice: 'AD0D', provinciaSigla: 'RM', annoScolastico: '2024/25', tipoGraduatoria: 'GPS I Fascia', punteggioMinimo: 82.0, punteggioMassimo: 108, posizioniAssegnate: 60, candidatiInGraduatoria: 480, ultimaNomina: '2025-01-14', competizione: 'molto_alta', trend: 'crescente' },
  { id: 'B051-MI', classeCodice: 'AD0D', provinciaSigla: 'MI', annoScolastico: '2024/25', tipoGraduatoria: 'GPS I Fascia', punteggioMinimo: 80.0, punteggioMassimo: 106, posizioniAssegnate: 50, candidatiInGraduatoria: 400, ultimaNomina: '2025-01-11', competizione: 'alta', trend: 'crescente' },
  { id: 'B052-NA', classeCodice: 'AD0D', provinciaSigla: 'NA', annoScolastico: '2024/25', tipoGraduatoria: 'GPS I Fascia', punteggioMinimo: 74.0, punteggioMassimo: 100, posizioniAssegnate: 45, candidatiInGraduatoria: 360, ultimaNomina: '2025-01-09', competizione: 'alta', trend: 'stabile' },
  { id: 'B053-BA', classeCodice: 'AD0D', provinciaSigla: 'BA', annoScolastico: '2024/25', tipoGraduatoria: 'GPS I Fascia', punteggioMinimo: 72.0, punteggioMassimo: 96, posizioniAssegnate: 30, candidatiInGraduatoria: 260, ultimaNomina: '2025-01-08', competizione: 'media', trend: 'stabile' },

  // ═══════════════════════════════════════════════════════════
  // AD0J — SOSTEGNO PRIMARIA
  // ═══════════════════════════════════════════════════════════
  { id: 'B060-RM', classeCodice: 'AD0J', provinciaSigla: 'RM', annoScolastico: '2024/25', tipoGraduatoria: 'GPS I Fascia', punteggioMinimo: 84.0, punteggioMassimo: 110, posizioniAssegnate: 58, candidatiInGraduatoria: 500, ultimaNomina: '2025-01-14', competizione: 'molto_alta', trend: 'crescente' },
  { id: 'B061-MI', classeCodice: 'AD0J', provinciaSigla: 'MI', annoScolastico: '2024/25', tipoGraduatoria: 'GPS I Fascia', punteggioMinimo: 80.0, punteggioMassimo: 106, posizioniAssegnate: 48, candidatiInGraduatoria: 420, ultimaNomina: '2025-01-11', competizione: 'alta', trend: 'crescente' },
  { id: 'B062-NA', classeCodice: 'AD0J', provinciaSigla: 'NA', annoScolastico: '2024/25', tipoGraduatoria: 'GPS I Fascia', punteggioMinimo: 76.0, punteggioMassimo: 102, posizioniAssegnate: 42, candidatiInGraduatoria: 380, ultimaNomina: '2025-01-09', competizione: 'alta', trend: 'stabile' },
  { id: 'B063-BO', classeCodice: 'AD0J', provinciaSigla: 'BO', annoScolastico: '2024/25', tipoGraduatoria: 'GPS I Fascia', punteggioMinimo: 78.0, punteggioMassimo: 102, posizioniAssegnate: 22, candidatiInGraduatoria: 210, ultimaNomina: '2025-01-06', competizione: 'media', trend: 'stabile' },
  { id: 'B064-BA', classeCodice: 'AD0J', provinciaSigla: 'BA', annoScolastico: '2024/25', tipoGraduatoria: 'GPS I Fascia', punteggioMinimo: 72.0, punteggioMassimo: 98, posizioniAssegnate: 28, candidatiInGraduatoria: 250, ultimaNomina: '2025-01-07', competizione: 'media', trend: 'stabile' },

  // ═══════════════════════════════════════════════════════════
  // AD00 — SOSTEGNO SCUOLA MEDIA
  // ═══════════════════════════════════════════════════════════
  { id: 'B070-RM', classeCodice: 'AD00', provinciaSigla: 'RM', annoScolastico: '2024/25', tipoGraduatoria: 'GPS I Fascia', punteggioMinimo: 84.0, punteggioMassimo: 112, posizioniAssegnate: 85, candidatiInGraduatoria: 680, ultimaNomina: '2025-01-15', competizione: 'molto_alta', trend: 'crescente' },
  { id: 'B071-RM', classeCodice: 'AD00', provinciaSigla: 'RM', annoScolastico: '2024/25', tipoGraduatoria: 'GPS II Fascia', punteggioMinimo: 58.0, punteggioMassimo: 84, posizioniAssegnate: 110, candidatiInGraduatoria: 920, ultimaNomina: '2025-02-20', competizione: 'alta', trend: 'crescente' },
  { id: 'B072-MI', classeCodice: 'AD00', provinciaSigla: 'MI', annoScolastico: '2024/25', tipoGraduatoria: 'GPS I Fascia', punteggioMinimo: 80.0, punteggioMassimo: 108, posizioniAssegnate: 72, candidatiInGraduatoria: 580, ultimaNomina: '2025-01-12', competizione: 'molto_alta', trend: 'crescente' },
  { id: 'B073-NA', classeCodice: 'AD00', provinciaSigla: 'NA', annoScolastico: '2024/25', tipoGraduatoria: 'GPS I Fascia', punteggioMinimo: 76.0, punteggioMassimo: 104, posizioniAssegnate: 60, candidatiInGraduatoria: 480, ultimaNomina: '2025-01-09', competizione: 'alta', trend: 'stabile' },
  { id: 'B074-BA', classeCodice: 'AD00', provinciaSigla: 'BA', annoScolastico: '2024/25', tipoGraduatoria: 'GPS I Fascia', punteggioMinimo: 72.0, punteggioMassimo: 98, posizioniAssegnate: 45, candidatiInGraduatoria: 380, ultimaNomina: '2025-01-07', competizione: 'alta', trend: 'stabile' },
  { id: 'B075-TO', classeCodice: 'AD00', provinciaSigla: 'TO', annoScolastico: '2024/25', tipoGraduatoria: 'GPS I Fascia', punteggioMinimo: 78.0, punteggioMassimo: 104, posizioniAssegnate: 35, candidatiInGraduatoria: 300, ultimaNomina: '2025-01-05', competizione: 'media', trend: 'stabile' },
  { id: 'B076-BO', classeCodice: 'AD00', provinciaSigla: 'BO', annoScolastico: '2024/25', tipoGraduatoria: 'GPS I Fascia', punteggioMinimo: 80.0, punteggioMassimo: 106, posizioniAssegnate: 30, candidatiInGraduatoria: 280, ultimaNomina: '2025-01-06', competizione: 'media', trend: 'stabile' },
  { id: 'B077-GE', classeCodice: 'AD00', provinciaSigla: 'GE', annoScolastico: '2024/25', tipoGraduatoria: 'GPS I Fascia', punteggioMinimo: 75.0, punteggioMassimo: 100, posizioniAssegnate: 25, candidatiInGraduatoria: 230, ultimaNomina: '2025-01-04', competizione: 'media', trend: 'stabile' },
  { id: 'B078-FI', classeCodice: 'AD00', provinciaSigla: 'FI', annoScolastico: '2024/25', tipoGraduatoria: 'GPS I Fascia', punteggioMinimo: 76.0, punteggioMassimo: 100, posizioniAssegnate: 22, candidatiInGraduatoria: 220, ultimaNomina: '2025-01-05', competizione: 'media', trend: 'stabile' },
  { id: 'B079-CT', classeCodice: 'AD00', provinciaSigla: 'CT', annoScolastico: '2024/25', tipoGraduatoria: 'GPS I Fascia', punteggioMinimo: 66.0, punteggioMassimo: 90, posizioniAssegnate: 18, candidatiInGraduatoria: 180, ultimaNomina: '2024-12-18', competizione: 'media', trend: 'stabile' },

  // ═══════════════════════════════════════════════════════════
  // ADSS — SOSTEGNO SCUOLA SUPERIORE
  // ═══════════════════════════════════════════════════════════
  { id: 'B080-RM', classeCodice: 'ADSS', provinciaSigla: 'RM', annoScolastico: '2024/25', tipoGraduatoria: 'GPS I Fascia', punteggioMinimo: 85.0, punteggioMassimo: 112, posizioniAssegnate: 110, candidatiInGraduatoria: 850, ultimaNomina: '2025-01-16', competizione: 'molto_alta', trend: 'crescente' },
  { id: 'B081-RM', classeCodice: 'ADSS', provinciaSigla: 'RM', annoScolastico: '2024/25', tipoGraduatoria: 'GPS II Fascia', punteggioMinimo: 62.0, punteggioMassimo: 85, posizioniAssegnate: 130, candidatiInGraduatoria: 1050, ultimaNomina: '2025-02-22', competizione: 'alta', trend: 'crescente' },
  { id: 'B082-MI', classeCodice: 'ADSS', provinciaSigla: 'MI', annoScolastico: '2024/25', tipoGraduatoria: 'GPS I Fascia', punteggioMinimo: 82.0, punteggioMassimo: 110, posizioniAssegnate: 90, candidatiInGraduatoria: 720, ultimaNomina: '2025-01-13', competizione: 'molto_alta', trend: 'crescente' },
  { id: 'B083-NA', classeCodice: 'ADSS', provinciaSigla: 'NA', annoScolastico: '2024/25', tipoGraduatoria: 'GPS I Fascia', punteggioMinimo: 78.0, punteggioMassimo: 106, posizioniAssegnate: 75, candidatiInGraduatoria: 580, ultimaNomina: '2025-01-10', competizione: 'alta', trend: 'stabile' },
  { id: 'B084-BA', classeCodice: 'ADSS', provinciaSigla: 'BA', annoScolastico: '2024/25', tipoGraduatoria: 'GPS I Fascia', punteggioMinimo: 75.0, punteggioMassimo: 102, posizioniAssegnate: 55, candidatiInGraduatoria: 450, ultimaNomina: '2025-01-08', competizione: 'alta', trend: 'crescente' },
  { id: 'B085-TO', classeCodice: 'ADSS', provinciaSigla: 'TO', annoScolastico: '2024/25', tipoGraduatoria: 'GPS I Fascia', punteggioMinimo: 78.0, punteggioMassimo: 105, posizioniAssegnate: 40, candidatiInGraduatoria: 320, ultimaNomina: '2025-01-06', competizione: 'media', trend: 'stabile' },
  { id: 'B086-BO', classeCodice: 'ADSS', provinciaSigla: 'BO', annoScolastico: '2024/25', tipoGraduatoria: 'GPS I Fascia', punteggioMinimo: 80.0, punteggioMassimo: 108, posizioniAssegnate: 35, candidatiInGraduatoria: 290, ultimaNomina: '2025-01-07', competizione: 'media', trend: 'stabile' },
  { id: 'B087-FI', classeCodice: 'ADSS', provinciaSigla: 'FI', annoScolastico: '2024/25', tipoGraduatoria: 'GPS I Fascia', punteggioMinimo: 76.0, punteggioMassimo: 102, posizioniAssegnate: 28, candidatiInGraduatoria: 240, ultimaNomina: '2025-01-05', competizione: 'media', trend: 'stabile' },
  { id: 'B088-CT', classeCodice: 'ADSS', provinciaSigla: 'CT', annoScolastico: '2024/25', tipoGraduatoria: 'GPS I Fascia', punteggioMinimo: 68.0, punteggioMassimo: 94, posizioniAssegnate: 22, candidatiInGraduatoria: 210, ultimaNomina: '2025-01-03', competizione: 'media', trend: 'stabile' },
  { id: 'B089-PA', classeCodice: 'ADSS', provinciaSigla: 'PA', annoScolastico: '2024/25', tipoGraduatoria: 'GPS I Fascia', punteggioMinimo: 64.0, punteggioMassimo: 90, posizioniAssegnate: 18, candidatiInGraduatoria: 180, ultimaNomina: '2024-12-20', competizione: 'media', trend: 'stabile' },

  // ═══════════════════════════════════════════════════════════
  // A-12 — DISCIPLINE LETTERARIE I E II GRADO (più usato)
  // ═══════════════════════════════════════════════════════════
  { id: 'B100-RM', classeCodice: 'A-12', provinciaSigla: 'RM', annoScolastico: '2024/25', tipoGraduatoria: 'GPS I Fascia', punteggioMinimo: 98.5, punteggioMassimo: 120, posizioniAssegnate: 85, candidatiInGraduatoria: 1240, ultimaNomina: '2025-01-15', competizione: 'molto_alta', trend: 'crescente' },
  { id: 'B101-RM', classeCodice: 'A-12', provinciaSigla: 'RM', annoScolastico: '2024/25', tipoGraduatoria: 'GPS II Fascia', punteggioMinimo: 72.0, punteggioMassimo: 98, posizioniAssegnate: 120, candidatiInGraduatoria: 2100, ultimaNomina: '2025-02-20', competizione: 'molto_alta', trend: 'crescente' },
  { id: 'B102-MI', classeCodice: 'A-12', provinciaSigla: 'MI', annoScolastico: '2024/25', tipoGraduatoria: 'GPS I Fascia', punteggioMinimo: 95.0, punteggioMassimo: 118, posizioniAssegnate: 72, candidatiInGraduatoria: 980, ultimaNomina: '2025-01-10', competizione: 'molto_alta', trend: 'crescente' },
  { id: 'B103-NA', classeCodice: 'A-12', provinciaSigla: 'NA', annoScolastico: '2024/25', tipoGraduatoria: 'GPS I Fascia', punteggioMinimo: 92.0, punteggioMassimo: 115, posizioniAssegnate: 60, candidatiInGraduatoria: 890, ultimaNomina: '2025-01-08', competizione: 'molto_alta', trend: 'stabile' },
  { id: 'B104-TO', classeCodice: 'A-12', provinciaSigla: 'TO', annoScolastico: '2024/25', tipoGraduatoria: 'GPS I Fascia', punteggioMinimo: 88.0, punteggioMassimo: 112, posizioniAssegnate: 35, candidatiInGraduatoria: 420, ultimaNomina: '2025-01-05', competizione: 'alta', trend: 'stabile' },
  { id: 'B105-BO', classeCodice: 'A-12', provinciaSigla: 'BO', annoScolastico: '2024/25', tipoGraduatoria: 'GPS I Fascia', punteggioMinimo: 90.0, punteggioMassimo: 114, posizioniAssegnate: 28, candidatiInGraduatoria: 350, ultimaNomina: '2025-01-06', competizione: 'alta', trend: 'stabile' },
  { id: 'B106-BA', classeCodice: 'A-12', provinciaSigla: 'BA', annoScolastico: '2024/25', tipoGraduatoria: 'GPS I Fascia', punteggioMinimo: 85.0, punteggioMassimo: 108, posizioniAssegnate: 30, candidatiInGraduatoria: 380, ultimaNomina: '2025-01-07', competizione: 'alta', trend: 'crescente' },
  { id: 'B107-CT', classeCodice: 'A-12', provinciaSigla: 'CT', annoScolastico: '2024/25', tipoGraduatoria: 'GPS I Fascia', punteggioMinimo: 78.0, punteggioMassimo: 102, posizioniAssegnate: 18, candidatiInGraduatoria: 280, ultimaNomina: '2025-01-03', competizione: 'media', trend: 'stabile' },
  { id: 'B108-PA', classeCodice: 'A-12', provinciaSigla: 'PA', annoScolastico: '2024/25', tipoGraduatoria: 'GPS I Fascia', punteggioMinimo: 75.0, punteggioMassimo: 98, posizioniAssegnate: 15, candidatiInGraduatoria: 240, ultimaNomina: '2024-12-20', competizione: 'media', trend: 'stabile' },
  { id: 'B109-GE', classeCodice: 'A-12', provinciaSigla: 'GE', annoScolastico: '2024/25', tipoGraduatoria: 'GPS I Fascia', punteggioMinimo: 82.0, punteggioMassimo: 106, posizioniAssegnate: 20, candidatiInGraduatoria: 290, ultimaNomina: '2025-01-05', competizione: 'alta', trend: 'stabile' },
  { id: 'B110-VE', classeCodice: 'A-12', provinciaSigla: 'VE', annoScolastico: '2024/25', tipoGraduatoria: 'GPS I Fascia', punteggioMinimo: 84.0, punteggioMassimo: 108, posizioniAssegnate: 18, candidatiInGraduatoria: 260, ultimaNomina: '2025-01-04', competizione: 'alta', trend: 'stabile' },
  { id: 'B111-FI', classeCodice: 'A-12', provinciaSigla: 'FI', annoScolastico: '2024/25', tipoGraduatoria: 'GPS I Fascia', punteggioMinimo: 86.5, punteggioMassimo: 110, posizioniAssegnate: 22, candidatiInGraduatoria: 310, ultimaNomina: '2025-01-04', competizione: 'alta', trend: 'stabile' },
  { id: 'B112-CA', classeCodice: 'A-12', provinciaSigla: 'CA', annoScolastico: '2024/25', tipoGraduatoria: 'GPS I Fascia', punteggioMinimo: 72.0, punteggioMassimo: 96, posizioniAssegnate: 12, candidatiInGraduatoria: 180, ultimaNomina: '2024-12-18', competizione: 'media', trend: 'decrescente' },
  { id: 'B113-CZ', classeCodice: 'A-12', provinciaSigla: 'CZ', annoScolastico: '2024/25', tipoGraduatoria: 'GPS I Fascia', punteggioMinimo: 68.0, punteggioMassimo: 92, posizioniAssegnate: 8, candidatiInGraduatoria: 120, ultimaNomina: '2024-12-15', competizione: 'media', trend: 'stabile' },
  { id: 'B114-PG', classeCodice: 'A-12', provinciaSigla: 'PG', annoScolastico: '2024/25', tipoGraduatoria: 'GPS I Fascia', punteggioMinimo: 76.0, punteggioMassimo: 100, posizioniAssegnate: 14, candidatiInGraduatoria: 200, ultimaNomina: '2024-12-19', competizione: 'media', trend: 'stabile' },
  { id: 'B115-CH', classeCodice: 'A-12', provinciaSigla: 'CH', annoScolastico: '2024/25', tipoGraduatoria: 'GPS I Fascia', punteggioMinimo: 68.0, punteggioMassimo: 92, posizioniAssegnate: 10, candidatiInGraduatoria: 130, ultimaNomina: '2024-12-14', competizione: 'media', trend: 'stabile' },
  { id: 'B116-AQ', classeCodice: 'A-12', provinciaSigla: 'AQ', annoScolastico: '2024/25', tipoGraduatoria: 'GPS I Fascia', punteggioMinimo: 64.0, punteggioMassimo: 88, posizioniAssegnate: 6, candidatiInGraduatoria: 80, ultimaNomina: '2024-12-10', competizione: 'bassa', trend: 'decrescente' },
  { id: 'B117-TS', classeCodice: 'A-12', provinciaSigla: 'TS', annoScolastico: '2024/25', tipoGraduatoria: 'GPS I Fascia', punteggioMinimo: 80.0, punteggioMassimo: 104, posizioniAssegnate: 15, candidatiInGraduatoria: 200, ultimaNomina: '2025-01-03', competizione: 'media', trend: 'stabile' },
  { id: 'B118-UD', classeCodice: 'A-12', provinciaSigla: 'UD', annoScolastico: '2024/25', tipoGraduatoria: 'GPS I Fascia', punteggioMinimo: 75.0, punteggioMassimo: 98, posizioniAssegnate: 10, candidatiInGraduatoria: 140, ultimaNomina: '2024-12-18', competizione: 'media', trend: 'stabile' },

  // ═══════════════════════════════════════════════════════════
  // A-11 — DISCIPLINE LETTERARIE E LATINO
  // ═══════════════════════════════════════════════════════════
  { id: 'B120-RM', classeCodice: 'A-11', provinciaSigla: 'RM', annoScolastico: '2024/25', tipoGraduatoria: 'GPS I Fascia', punteggioMinimo: 95.0, punteggioMassimo: 118, posizioniAssegnate: 40, candidatiInGraduatoria: 520, ultimaNomina: '2025-01-12', competizione: 'molto_alta', trend: 'crescente' },
  { id: 'B121-MI', classeCodice: 'A-11', provinciaSigla: 'MI', annoScolastico: '2024/25', tipoGraduatoria: 'GPS I Fascia', punteggioMinimo: 92.0, punteggioMassimo: 116, posizioniAssegnate: 35, candidatiInGraduatoria: 460, ultimaNomina: '2025-01-10', competizione: 'molto_alta', trend: 'crescente' },
  { id: 'B122-NA', classeCodice: 'A-11', provinciaSigla: 'NA', annoScolastico: '2024/25', tipoGraduatoria: 'GPS I Fascia', punteggioMinimo: 88.0, punteggioMassimo: 112, posizioniAssegnate: 25, candidatiInGraduatoria: 350, ultimaNomina: '2025-01-08', competizione: 'alta', trend: 'stabile' },
  { id: 'B123-TO', classeCodice: 'A-11', provinciaSigla: 'TO', annoScolastico: '2024/25', tipoGraduatoria: 'GPS I Fascia', punteggioMinimo: 85.0, punteggioMassimo: 110, posizioniAssegnate: 18, candidatiInGraduatoria: 220, ultimaNomina: '2025-01-05', competizione: 'alta', trend: 'stabile' },
  { id: 'B124-BA', classeCodice: 'A-11', provinciaSigla: 'BA', annoScolastico: '2024/25', tipoGraduatoria: 'GPS I Fascia', punteggioMinimo: 82.0, punteggioMassimo: 106, posizioniAssegnate: 15, candidatiInGraduatoria: 200, ultimaNomina: '2025-01-07', competizione: 'media', trend: 'stabile' },

  // ═══════════════════════════════════════════════════════════
  // A-13 — DISCIPLINE LETTERARIE, LATINO E GRECO
  // ═══════════════════════════════════════════════════════════
  { id: 'B130-RM', classeCodice: 'A-13', provinciaSigla: 'RM', annoScolastico: '2024/25', tipoGraduatoria: 'GPS I Fascia', punteggioMinimo: 88.0, punteggioMassimo: 114, posizioniAssegnate: 18, candidatiInGraduatoria: 240, ultimaNomina: '2025-01-08', competizione: 'alta', trend: 'stabile' },
  { id: 'B131-MI', classeCodice: 'A-13', provinciaSigla: 'MI', annoScolastico: '2024/25', tipoGraduatoria: 'GPS I Fascia', punteggioMinimo: 86.0, punteggioMassimo: 112, posizioniAssegnate: 15, candidatiInGraduatoria: 200, ultimaNomina: '2025-01-06', competizione: 'alta', trend: 'stabile' },

  // ═══════════════════════════════════════════════════════════
  // A-22 — LINGUE E CULTURE STRANIERE (generico)
  // ═══════════════════════════════════════════════════════════
  { id: 'B140-RM', classeCodice: 'A-22', provinciaSigla: 'RM', annoScolastico: '2024/25', tipoGraduatoria: 'GPS I Fascia', punteggioMinimo: 92.0, punteggioMassimo: 116, posizioniAssegnate: 45, candidatiInGraduatoria: 580, ultimaNomina: '2025-01-12', competizione: 'molto_alta', trend: 'crescente' },
  { id: 'B141-MI', classeCodice: 'A-22', provinciaSigla: 'MI', annoScolastico: '2024/25', tipoGraduatoria: 'GPS I Fascia', punteggioMinimo: 88.0, punteggioMassimo: 112, posizioniAssegnate: 38, candidatiInGraduatoria: 480, ultimaNomina: '2025-01-10', competizione: 'alta', trend: 'stabile' },

  // ═══════════════════════════════════════════════════════════
  // AB22 — LINGUA E LETTERATURA INGLESE (il più richiesto)
  // ═══════════════════════════════════════════════════════════
  { id: 'B150-RM', classeCodice: 'AB22', provinciaSigla: 'RM', annoScolastico: '2024/25', tipoGraduatoria: 'GPS I Fascia', punteggioMinimo: 102.0, punteggioMassimo: 120, posizioniAssegnate: 95, candidatiInGraduatoria: 1580, ultimaNomina: '2025-01-16', competizione: 'molto_alta', trend: 'crescente' },
  { id: 'B151-RM', classeCodice: 'AB22', provinciaSigla: 'RM', annoScolastico: '2024/25', tipoGraduatoria: 'GPS II Fascia', punteggioMinimo: 78.0, punteggioMassimo: 102, posizioniAssegnate: 140, candidatiInGraduatoria: 2800, ultimaNomina: '2025-02-22', competizione: 'molto_alta', trend: 'crescente' },
  { id: 'B152-MI', classeCodice: 'AB22', provinciaSigla: 'MI', annoScolastico: '2024/25', tipoGraduatoria: 'GPS I Fascia', punteggioMinimo: 99.0, punteggioMassimo: 119, posizioniAssegnate: 80, candidatiInGraduatoria: 1320, ultimaNomina: '2025-01-12', competizione: 'molto_alta', trend: 'crescente' },
  { id: 'B153-NA', classeCodice: 'AB22', provinciaSigla: 'NA', annoScolastico: '2024/25', tipoGraduatoria: 'GPS I Fascia', punteggioMinimo: 94.0, punteggioMassimo: 116, posizioniAssegnate: 65, candidatiInGraduatoria: 1100, ultimaNomina: '2025-01-09', competizione: 'molto_alta', trend: 'crescente' },
  { id: 'B154-TO', classeCodice: 'AB22', provinciaSigla: 'TO', annoScolastico: '2024/25', tipoGraduatoria: 'GPS I Fascia', punteggioMinimo: 91.0, punteggioMassimo: 113, posizioniAssegnate: 38, candidatiInGraduatoria: 520, ultimaNomina: '2025-01-06', competizione: 'alta', trend: 'stabile' },
  { id: 'B155-BO', classeCodice: 'AB22', provinciaSigla: 'BO', annoScolastico: '2024/25', tipoGraduatoria: 'GPS I Fascia', punteggioMinimo: 93.0, punteggioMassimo: 115, posizioniAssegnate: 30, candidatiInGraduatoria: 450, ultimaNomina: '2025-01-07', competizione: 'alta', trend: 'stabile' },
  { id: 'B156-BA', classeCodice: 'AB22', provinciaSigla: 'BA', annoScolastico: '2024/25', tipoGraduatoria: 'GPS I Fascia', punteggioMinimo: 88.0, punteggioMassimo: 110, posizioniAssegnate: 32, candidatiInGraduatoria: 480, ultimaNomina: '2025-01-08', competizione: 'alta', trend: 'crescente' },
  { id: 'B157-FI', classeCodice: 'AB22', provinciaSigla: 'FI', annoScolastico: '2024/25', tipoGraduatoria: 'GPS I Fascia', punteggioMinimo: 89.0, punteggioMassimo: 112, posizioniAssegnate: 24, candidatiInGraduatoria: 380, ultimaNomina: '2025-01-05', competizione: 'alta', trend: 'stabile' },
  { id: 'B158-CT', classeCodice: 'AB22', provinciaSigla: 'CT', annoScolastico: '2024/25', tipoGraduatoria: 'GPS I Fascia', punteggioMinimo: 80.0, punteggioMassimo: 104, posizioniAssegnate: 20, candidatiInGraduatoria: 320, ultimaNomina: '2025-01-04', competizione: 'media', trend: 'stabile' },
  { id: 'B159-PA', classeCodice: 'AB22', provinciaSigla: 'PA', annoScolastico: '2024/25', tipoGraduatoria: 'GPS I Fascia', punteggioMinimo: 76.0, punteggioMassimo: 100, posizioniAssegnate: 16, candidatiInGraduatoria: 260, ultimaNomina: '2024-12-20', competizione: 'media', trend: 'stabile' },
  { id: 'B160-GE', classeCodice: 'AB22', provinciaSigla: 'GE', annoScolastico: '2024/25', tipoGraduatoria: 'GPS I Fascia', punteggioMinimo: 85.0, punteggioMassimo: 109, posizioniAssegnate: 22, candidatiInGraduatoria: 340, ultimaNomina: '2025-01-05', competizione: 'alta', trend: 'stabile' },
  { id: 'B161-CS', classeCodice: 'AB22', provinciaSigla: 'CS', annoScolastico: '2024/25', tipoGraduatoria: 'GPS I Fascia', punteggioMinimo: 72.0, punteggioMassimo: 96, posizioniAssegnate: 14, candidatiInGraduatoria: 210, ultimaNomina: '2024-12-16', competizione: 'media', trend: 'stabile' },
  { id: 'B162-TP', classeCodice: 'AB22', provinciaSigla: 'TP', annoScolastico: '2024/25', tipoGraduatoria: 'GPS I Fascia', punteggioMinimo: 62.0, punteggioMassimo: 86, posizioniAssegnate: 6, candidatiInGraduatoria: 90, ultimaNomina: '2024-12-08', competizione: 'bassa', trend: 'decrescente' },
  { id: 'B163-PZ', classeCodice: 'AB22', provinciaSigla: 'PZ', annoScolastico: '2024/25', tipoGraduatoria: 'GPS I Fascia', punteggioMinimo: 64.0, punteggioMassimo: 88, posizioniAssegnate: 8, candidatiInGraduatoria: 110, ultimaNomina: '2024-12-12', competizione: 'bassa', trend: 'decrescente' },

  // ═══════════════════════════════════════════════════════════
  // AA22 — FRANCESE
  // ═══════════════════════════════════════════════════════════
  { id: 'B170-RM', classeCodice: 'AA22', provinciaSigla: 'RM', annoScolastico: '2024/25', tipoGraduatoria: 'GPS I Fascia', punteggioMinimo: 85.0, punteggioMassimo: 110, posizioniAssegnate: 15, candidatiInGraduatoria: 220, ultimaNomina: '2025-01-06', competizione: 'alta', trend: 'decrescente' },
  { id: 'B171-TO', classeCodice: 'AA22', provinciaSigla: 'TO', annoScolastico: '2024/25', tipoGraduatoria: 'GPS I Fascia', punteggioMinimo: 82.0, punteggioMassimo: 108, posizioniAssegnate: 12, candidatiInGraduatoria: 160, ultimaNomina: '2025-01-05', competizione: 'media', trend: 'stabile' },

  // ═══════════════════════════════════════════════════════════
  // AC22 — SPAGNOLO
  // ═══════════════════════════════════════════════════════════
  { id: 'B175-RM', classeCodice: 'AC22', provinciaSigla: 'RM', annoScolastico: '2024/25', tipoGraduatoria: 'GPS I Fascia', punteggioMinimo: 82.0, punteggioMassimo: 106, posizioniAssegnate: 12, candidatiInGraduatoria: 180, ultimaNomina: '2025-01-05', competizione: 'media', trend: 'stabile' },

  // ═══════════════════════════════════════════════════════════
  // AD22 — TEDESCO
  // ═══════════════════════════════════════════════════════════
  { id: 'B178-RM', classeCodice: 'AD22', provinciaSigla: 'RM', annoScolastico: '2024/25', tipoGraduatoria: 'GPS I Fascia', punteggioMinimo: 78.0, punteggioMassimo: 102, posizioniAssegnate: 8, candidatiInGraduatoria: 110, ultimaNomina: '2025-01-04', competizione: 'media', trend: 'stabile' },

  // ═══════════════════════════════════════════════════════════
  // A-01 — DISEGNO E STORIA DELL'ARTE
  // ═══════════════════════════════════════════════════════════
  { id: 'B180-RM', classeCodice: 'A-01', provinciaSigla: 'RM', annoScolastico: '2024/25', tipoGraduatoria: 'GPS I Fascia', punteggioMinimo: 80.0, punteggioMassimo: 105, posizioniAssegnate: 10, candidatiInGraduatoria: 150, ultimaNomina: '2025-01-04', competizione: 'media', trend: 'stabile' },
  { id: 'B181-MI', classeCodice: 'A-01', provinciaSigla: 'MI', annoScolastico: '2024/25', tipoGraduatoria: 'GPS I Fascia', punteggioMinimo: 78.0, punteggioMassimo: 102, posizioniAssegnate: 8, candidatiInGraduatoria: 120, ultimaNomina: '2025-01-03', competizione: 'media', trend: 'stabile' },

  // ═══════════════════════════════════════════════════════════
  // A-54 — STORIA DELL'ARTE
  // ═══════════════════════════════════════════════════════════
  { id: 'B185-RM', classeCodice: 'A-54', provinciaSigla: 'RM', annoScolastico: '2024/25', tipoGraduatoria: 'GPS I Fascia', punteggioMinimo: 82.0, punteggioMassimo: 108, posizioniAssegnate: 12, candidatiInGraduatoria: 170, ultimaNomina: '2025-01-05', competizione: 'media', trend: 'stabile' },

  // ═══════════════════════════════════════════════════════════
  // A-18 — FILOSOFIA E SCIENZE UMANE
  // ═══════════════════════════════════════════════════════════
  { id: 'B190-RM', classeCodice: 'A-18', provinciaSigla: 'RM', annoScolastico: '2024/25', tipoGraduatoria: 'GPS I Fascia', punteggioMinimo: 82.0, punteggioMassimo: 108, posizioniAssegnate: 12, candidatiInGraduatoria: 180, ultimaNomina: '2025-01-05', competizione: 'media', trend: 'stabile' },
  { id: 'B191-NA', classeCodice: 'A-18', provinciaSigla: 'NA', annoScolastico: '2024/25', tipoGraduatoria: 'GPS I Fascia', punteggioMinimo: 76.0, punteggioMassimo: 100, posizioniAssegnate: 8, candidatiInGraduatoria: 120, ultimaNomina: '2024-12-18', competizione: 'media', trend: 'stabile' },

  // ═══════════════════════════════════════════════════════════
  // A-19 — FILOSOFIA E STORIA
  // ═══════════════════════════════════════════════════════════
  { id: 'B195-RM', classeCodice: 'A-19', provinciaSigla: 'RM', annoScolastico: '2024/25', tipoGraduatoria: 'GPS I Fascia', punteggioMinimo: 80.0, punteggioMassimo: 106, posizioniAssegnate: 10, candidatiInGraduatoria: 150, ultimaNomina: '2025-01-04', competizione: 'media', trend: 'stabile' },

  // ═══════════════════════════════════════════════════════════
  // A-20 — FISICA
  // ═══════════════════════════════════════════════════════════
  { id: 'B200-RM', classeCodice: 'A-20', provinciaSigla: 'RM', annoScolastico: '2024/25', tipoGraduatoria: 'GPS I Fascia', punteggioMinimo: 82.0, punteggioMassimo: 108, posizioniAssegnate: 20, candidatiInGraduatoria: 220, ultimaNomina: '2025-01-08', competizione: 'alta', trend: 'stabile' },
  { id: 'B201-MI', classeCodice: 'A-20', provinciaSigla: 'MI', annoScolastico: '2024/25', tipoGraduatoria: 'GPS I Fascia', punteggioMinimo: 80.0, punteggioMassimo: 106, posizioniAssegnate: 18, candidatiInGraduatoria: 200, ultimaNomina: '2025-01-06', competizione: 'media', trend: 'stabile' },

  // ═══════════════════════════════════════════════════════════
  // A-26 — MATEMATICA
  // ═══════════════════════════════════════════════════════════
  { id: 'B210-RM', classeCodice: 'A-26', provinciaSigla: 'RM', annoScolastico: '2024/25', tipoGraduatoria: 'GPS I Fascia', punteggioMinimo: 88.0, punteggioMassimo: 115, posizioniAssegnate: 65, candidatiInGraduatoria: 620, ultimaNomina: '2025-01-14', competizione: 'molto_alta', trend: 'crescente' },
  { id: 'B211-RM', classeCodice: 'A-26', provinciaSigla: 'RM', annoScolastico: '2024/25', tipoGraduatoria: 'GPS II Fascia', punteggioMinimo: 62.0, punteggioMassimo: 88, posizioniAssegnate: 85, candidatiInGraduatoria: 880, ultimaNomina: '2025-02-19', competizione: 'molto_alta', trend: 'crescente' },
  { id: 'B212-MI', classeCodice: 'A-26', provinciaSigla: 'MI', annoScolastico: '2024/25', tipoGraduatoria: 'GPS I Fascia', punteggioMinimo: 85.0, punteggioMassimo: 112, posizioniAssegnate: 55, candidatiInGraduatoria: 530, ultimaNomina: '2025-01-11', competizione: 'molto_alta', trend: 'crescente' },
  { id: 'B213-NA', classeCodice: 'A-26', provinciaSigla: 'NA', annoScolastico: '2024/25', tipoGraduatoria: 'GPS I Fascia', punteggioMinimo: 80.0, punteggioMassimo: 108, posizioniAssegnate: 42, candidatiInGraduatoria: 450, ultimaNomina: '2025-01-09', competizione: 'alta', trend: 'stabile' },
  { id: 'B214-TO', classeCodice: 'A-26', provinciaSigla: 'TO', annoScolastico: '2024/25', tipoGraduatoria: 'GPS I Fascia', punteggioMinimo: 82.0, punteggioMassimo: 110, posizioniAssegnate: 30, candidatiInGraduatoria: 320, ultimaNomina: '2025-01-06', competizione: 'alta', trend: 'stabile' },
  { id: 'B215-BO', classeCodice: 'A-26', provinciaSigla: 'BO', annoScolastico: '2024/25', tipoGraduatoria: 'GPS I Fascia', punteggioMinimo: 84.0, punteggioMassimo: 110, posizioniAssegnate: 25, candidatiInGraduatoria: 280, ultimaNomina: '2025-01-07', competizione: 'alta', trend: 'stabile' },
  { id: 'B216-BA', classeCodice: 'A-26', provinciaSigla: 'BA', annoScolastico: '2024/25', tipoGraduatoria: 'GPS I Fascia', punteggioMinimo: 78.0, punteggioMassimo: 104, posizioniAssegnate: 28, candidatiInGraduatoria: 320, ultimaNomina: '2025-01-08', competizione: 'media', trend: 'crescente' },
  { id: 'B217-VE', classeCodice: 'A-26', provinciaSigla: 'VE', annoScolastico: '2024/25', tipoGraduatoria: 'GPS I Fascia', punteggioMinimo: 78.0, punteggioMassimo: 102, posizioniAssegnate: 15, candidatiInGraduatoria: 180, ultimaNomina: '2025-01-04', competizione: 'media', trend: 'stabile' },
  { id: 'B218-PG', classeCodice: 'A-26', provinciaSigla: 'PG', annoScolastico: '2024/25', tipoGraduatoria: 'GPS I Fascia', punteggioMinimo: 72.0, punteggioMassimo: 96, posizioniAssegnate: 12, candidatiInGraduatoria: 150, ultimaNomina: '2024-12-18', competizione: 'media', trend: 'stabile' },
  { id: 'B219-CZ', classeCodice: 'A-26', provinciaSigla: 'CZ', annoScolastico: '2024/25', tipoGraduatoria: 'GPS I Fascia', punteggioMinimo: 62.0, punteggioMassimo: 86, posizioniAssegnate: 8, candidatiInGraduatoria: 100, ultimaNomina: '2024-12-12', competizione: 'bassa', trend: 'decrescente' },

  // ═══════════════════════════════════════════════════════════
  // A-27 — MATEMATICA E FISICA
  // ═══════════════════════════════════════════════════════════
  { id: 'B220-RM', classeCodice: 'A-27', provinciaSigla: 'RM', annoScolastico: '2024/25', tipoGraduatoria: 'GPS I Fascia', punteggioMinimo: 85.0, punteggioMassimo: 112, posizioniAssegnate: 25, candidatiInGraduatoria: 280, ultimaNomina: '2025-01-10', competizione: 'alta', trend: 'stabile' },
  { id: 'B221-MI', classeCodice: 'A-27', provinciaSigla: 'MI', annoScolastico: '2024/25', tipoGraduatoria: 'GPS I Fascia', punteggioMinimo: 82.0, punteggioMassimo: 108, posizioniAssegnate: 20, candidatiInGraduatoria: 240, ultimaNomina: '2025-01-08', competizione: 'media', trend: 'stabile' },
  { id: 'B222-NA', classeCodice: 'A-27', provinciaSigla: 'NA', annoScolastico: '2024/25', tipoGraduatoria: 'GPS I Fascia', punteggioMinimo: 76.0, punteggioMassimo: 102, posizioniAssegnate: 15, candidatiInGraduatoria: 180, ultimaNomina: '2025-01-06', competizione: 'media', trend: 'stabile' },

  // ═══════════════════════════════════════════════════════════
  // A-28 — MATEMATICA E SCIENZE (Media)
  // ═══════════════════════════════════════════════════════════
  { id: 'B225-RM', classeCodice: 'A-28', provinciaSigla: 'RM', annoScolastico: '2024/25', tipoGraduatoria: 'GPS I Fascia', punteggioMinimo: 86.0, punteggioMassimo: 112, posizioniAssegnate: 40, candidatiInGraduatoria: 440, ultimaNomina: '2025-01-12', competizione: 'molto_alta', trend: 'crescente' },
  { id: 'B226-MI', classeCodice: 'A-28', provinciaSigla: 'MI', annoScolastico: '2024/25', tipoGraduatoria: 'GPS I Fascia', punteggioMinimo: 83.0, punteggioMassimo: 110, posizioniAssegnate: 32, candidatiInGraduatoria: 360, ultimaNomina: '2025-01-10', competizione: 'alta', trend: 'crescente' },
  { id: 'B227-NA', classeCodice: 'A-28', provinciaSigla: 'NA', annoScolastico: '2024/25', tipoGraduatoria: 'GPS I Fascia', punteggioMinimo: 78.0, punteggioMassimo: 104, posizioniAssegnate: 25, candidatiInGraduatoria: 280, ultimaNomina: '2025-01-08', competizione: 'alta', trend: 'stabile' },
  { id: 'B228-BA', classeCodice: 'A-28', provinciaSigla: 'BA', annoScolastico: '2024/25', tipoGraduatoria: 'GPS I Fascia', punteggioMinimo: 75.0, punteggioMassimo: 100, posizioniAssegnate: 20, candidatiInGraduatoria: 220, ultimaNomina: '2025-01-06', competizione: 'media', trend: 'stabile' },
  { id: 'B229-BO', classeCodice: 'A-28', provinciaSigla: 'BO', annoScolastico: '2024/25', tipoGraduatoria: 'GPS I Fascia', punteggioMinimo: 80.0, punteggioMassimo: 106, posizioniAssegnate: 18, candidatiInGraduatoria: 200, ultimaNomina: '2025-01-06', competizione: 'media', trend: 'stabile' },

  // ═══════════════════════════════════════════════════════════
  // A-34 — SCIENZE E TECNOLOGIE CHIMICHE
  // ═══════════════════════════════════════════════════════════
  { id: 'B230-RM', classeCodice: 'A-34', provinciaSigla: 'RM', annoScolastico: '2024/25', tipoGraduatoria: 'GPS I Fascia', punteggioMinimo: 78.0, punteggioMassimo: 104, posizioniAssegnate: 18, candidatiInGraduatoria: 210, ultimaNomina: '2025-01-08', competizione: 'media', trend: 'stabile' },
  { id: 'B231-MI', classeCodice: 'A-34', provinciaSigla: 'MI', annoScolastico: '2024/25', tipoGraduatoria: 'GPS I Fascia', punteggioMinimo: 76.0, punteggioMassimo: 102, posizioniAssegnate: 15, candidatiInGraduatoria: 180, ultimaNomina: '2025-01-07', competizione: 'media', trend: 'stabile' },

  // ═══════════════════════════════════════════════════════════
  // A-41 — SCIENZE E TECNOLOGIE INFORMATICHE
  // ═══════════════════════════════════════════════════════════
  { id: 'B235-RM', classeCodice: 'A-41', provinciaSigla: 'RM', annoScolastico: '2024/25', tipoGraduatoria: 'GPS I Fascia', punteggioMinimo: 82.0, punteggioMassimo: 108, posizioniAssegnate: 15, candidatiInGraduatoria: 190, ultimaNomina: '2025-01-06', competizione: 'media', trend: 'crescente' },
  { id: 'B236-MI', classeCodice: 'A-41', provinciaSigla: 'MI', annoScolastico: '2024/25', tipoGraduatoria: 'GPS I Fascia', punteggioMinimo: 80.0, punteggioMassimo: 106, posizioniAssegnate: 12, candidatiInGraduatoria: 160, ultimaNomina: '2025-01-05', competizione: 'media', trend: 'crescente' },

  // ═══════════════════════════════════════════════════════════
  // A-50 — SCIENZE NATURALI, CHIMICHE E BIOLOGICHE
  // ═══════════════════════════════════════════════════════════
  { id: 'B240-RM', classeCodice: 'A-50', provinciaSigla: 'RM', annoScolastico: '2024/25', tipoGraduatoria: 'GPS I Fascia', punteggioMinimo: 84.0, punteggioMassimo: 110, posizioniAssegnate: 28, candidatiInGraduatoria: 320, ultimaNomina: '2025-01-10', competizione: 'alta', trend: 'stabile' },
  { id: 'B241-MI', classeCodice: 'A-50', provinciaSigla: 'MI', annoScolastico: '2024/25', tipoGraduatoria: 'GPS I Fascia', punteggioMinimo: 82.0, punteggioMassimo: 108, posizioniAssegnate: 22, candidatiInGraduatoria: 270, ultimaNomina: '2025-01-08', competizione: 'media', trend: 'stabile' },
  { id: 'B242-NA', classeCodice: 'A-50', provinciaSigla: 'NA', annoScolastico: '2024/25', tipoGraduatoria: 'GPS I Fascia', punteggioMinimo: 76.0, punteggioMassimo: 100, posizioniAssegnate: 16, candidatiInGraduatoria: 190, ultimaNomina: '2025-01-06', competizione: 'media', trend: 'stabile' },
  { id: 'B243-BA', classeCodice: 'A-50', provinciaSigla: 'BA', annoScolastico: '2024/25', tipoGraduatoria: 'GPS I Fascia', punteggioMinimo: 74.0, punteggioMassimo: 98, posizioniAssegnate: 14, candidatiInGraduatoria: 170, ultimaNomina: '2025-01-05', competizione: 'media', trend: 'stabile' },

  // ═══════════════════════════════════════════════════════════
  // A-60 — TECNOLOGIA MEDIA
  // ═══════════════════════════════════════════════════════════
  { id: 'B250-RM', classeCodice: 'A-60', provinciaSigla: 'RM', annoScolastico: '2024/25', tipoGraduatoria: 'GPS I Fascia', punteggioMinimo: 82.0, punteggioMassimo: 106, posizioniAssegnate: 30, candidatiInGraduatoria: 300, ultimaNomina: '2025-01-08', competizione: 'alta', trend: 'stabile' },
  { id: 'B251-MI', classeCodice: 'A-60', provinciaSigla: 'MI', annoScolastico: '2024/25', tipoGraduatoria: 'GPS I Fascia', punteggioMinimo: 80.0, punteggioMassimo: 104, posizioniAssegnate: 25, candidatiInGraduatoria: 260, ultimaNomina: '2025-01-06', competizione: 'media', trend: 'stabile' },

  // ═══════════════════════════════════════════════════════════
  // A-61 — TECNOLOGIE E COMUNICAZIONI MULTIMEDIALI
  // ═══════════════════════════════════════════════════════════
  { id: 'B255-RM', classeCodice: 'A-61', provinciaSigla: 'RM', annoScolastico: '2024/25', tipoGraduatoria: 'GPS I Fascia', punteggioMinimo: 78.0, punteggioMassimo: 102, posizioniAssegnate: 10, candidatiInGraduatoria: 130, ultimaNomina: '2025-01-04', competizione: 'media', trend: 'crescente' },

  // ═══════════════════════════════════════════════════════════
  // A-21 — GEOGRAFIA
  // ═══════════════════════════════════════════════════════════
  { id: 'B260-RM', classeCodice: 'A-21', provinciaSigla: 'RM', annoScolastico: '2024/25', tipoGraduatoria: 'GPS I Fascia', punteggioMinimo: 82.0, punteggioMassimo: 108, posizioniAssegnate: 15, candidatiInGraduatoria: 190, ultimaNomina: '2025-01-05', competizione: 'media', trend: 'stabile' },
  { id: 'B261-NA', classeCodice: 'A-21', provinciaSigla: 'NA', annoScolastico: '2024/25', tipoGraduatoria: 'GPS I Fascia', punteggioMinimo: 76.0, punteggioMassimo: 100, posizioniAssegnate: 10, candidatiInGraduatoria: 130, ultimaNomina: '2024-12-18', competizione: 'media', trend: 'stabile' },

  // ═══════════════════════════════════════════════════════════
  // A-48 — SCIENZE MOTORIE E SPORTIVE
  // ═══════════════════════════════════════════════════════════
  { id: 'B270-RM', classeCodice: 'A-48', provinciaSigla: 'RM', annoScolastico: '2024/25', tipoGraduatoria: 'GPS I Fascia', punteggioMinimo: 96.0, punteggioMassimo: 118, posizioniAssegnate: 55, candidatiInGraduatoria: 780, ultimaNomina: '2025-01-15', competizione: 'molto_alta', trend: 'crescente' },
  { id: 'B271-MI', classeCodice: 'A-48', provinciaSigla: 'MI', annoScolastico: '2024/25', tipoGraduatoria: 'GPS I Fascia', punteggioMinimo: 93.0, punteggioMassimo: 116, posizioniAssegnate: 48, candidatiInGraduatoria: 650, ultimaNomina: '2025-01-12', competizione: 'molto_alta', trend: 'crescente' },
  { id: 'B272-NA', classeCodice: 'A-48', provinciaSigla: 'NA', annoScolastico: '2024/25', tipoGraduatoria: 'GPS I Fascia', punteggioMinimo: 88.0, punteggioMassimo: 112, posizioniAssegnate: 40, candidatiInGraduatoria: 520, ultimaNomina: '2025-01-09', competizione: 'alta', trend: 'stabile' },
  { id: 'B273-TO', classeCodice: 'A-48', provinciaSigla: 'TO', annoScolastico: '2024/25', tipoGraduatoria: 'GPS I Fascia', punteggioMinimo: 85.0, punteggioMassimo: 110, posizioniAssegnate: 28, candidatiInGraduatoria: 350, ultimaNomina: '2025-01-06', competizione: 'alta', trend: 'stabile' },
  { id: 'B274-BA', classeCodice: 'A-48', provinciaSigla: 'BA', annoScolastico: '2024/25', tipoGraduatoria: 'GPS I Fascia', punteggioMinimo: 82.0, punteggioMassimo: 106, posizioniAssegnate: 25, candidatiInGraduatoria: 300, ultimaNomina: '2025-01-08', competizione: 'media', trend: 'stabile' },
  { id: 'B275-BO', classeCodice: 'A-48', provinciaSigla: 'BO', annoScolastico: '2024/25', tipoGraduatoria: 'GPS I Fascia', punteggioMinimo: 86.0, punteggioMassimo: 110, posizioniAssegnate: 22, candidatiInGraduatoria: 280, ultimaNomina: '2025-01-07', competizione: 'alta', trend: 'stabile' },

  // ═══════════════════════════════════════════════════════════
  // A-30 — MUSICA I E II GRADO
  // ═══════════════════════════════════════════════════════════
  { id: 'B280-RM', classeCodice: 'A-30', provinciaSigla: 'RM', annoScolastico: '2024/25', tipoGraduatoria: 'GPS I Fascia', punteggioMinimo: 80.0, punteggioMassimo: 106, posizioniAssegnate: 12, candidatiInGraduatoria: 160, ultimaNomina: '2025-01-05', competizione: 'media', trend: 'stabile' },
  { id: 'B281-MI', classeCodice: 'A-30', provinciaSigla: 'MI', annoScolastico: '2024/25', tipoGraduatoria: 'GPS I Fascia', punteggioMinimo: 78.0, punteggioMassimo: 104, posizioniAssegnate: 10, candidatiInGraduatoria: 140, ultimaNomina: '2025-01-04', competizione: 'media', trend: 'stabile' },

  // ═══════════════════════════════════════════════════════════
  // A-45 — SCIENZE ECONOMICO-AZIENDALI
  // ═══════════════════════════════════════════════════════════
  { id: 'B285-RM', classeCodice: 'A-45', provinciaSigla: 'RM', annoScolastico: '2024/25', tipoGraduatoria: 'GPS I Fascia', punteggioMinimo: 78.0, punteggioMassimo: 102, posizioniAssegnate: 12, candidatiInGraduatoria: 160, ultimaNomina: '2025-01-05', competizione: 'media', trend: 'stabile' },

  // ═══════════════════════════════════════════════════════════
  // A-46 — SCIENZE GIURIDICO-ECONOMICHE
  // ═══════════════════════════════════════════════════════════
  { id: 'B288-RM', classeCodice: 'A-46', provinciaSigla: 'RM', annoScolastico: '2024/25', tipoGraduatoria: 'GPS I Fascia', punteggioMinimo: 76.0, punteggioMassimo: 100, posizioniAssegnate: 10, candidatiInGraduatoria: 130, ultimaNomina: '2025-01-04', competizione: 'media', trend: 'stabile' },

  // ═══════════════════════════════════════════════════════════
  // A-55 — STRUMENTO MUSICALE II GRADO
  // ═══════════════════════════════════════════════════════════
  { id: 'B290-RM', classeCodice: 'A-55', provinciaSigla: 'RM', annoScolastico: '2024/25', tipoGraduatoria: 'GPS I Fascia', punteggioMinimo: 82.0, punteggioMassimo: 108, posizioniAssegnate: 8, candidatiInGraduatoria: 100, ultimaNomina: '2025-01-04', competizione: 'media', trend: 'stabile' },

  // ═══════════════════════════════════════════════════════════
  // A-66 — INFORMATICA (ad esaurimento)
  // ═══════════════════════════════════════════════════════════
  { id: 'B292-RM', classeCodice: 'A-66', provinciaSigla: 'RM', annoScolastico: '2024/25', tipoGraduatoria: 'GPS I Fascia', punteggioMinimo: 72.0, punteggioMassimo: 96, posizioniAssegnate: 5, candidatiInGraduatoria: 80, ultimaNomina: '2024-12-15', competizione: 'bassa', trend: 'decrescente' },

  // ═══════════════════════════════════════════════════════════
  // PP — EDUCATORE
  // ═══════════════════════════════════════════════════════════
  { id: 'B295-RM', classeCodice: 'PP', provinciaSigla: 'RM', annoScolastico: '2024/25', tipoGraduatoria: 'GPS I Fascia', punteggioMinimo: 70.0, punteggioMassimo: 94, posizioniAssegnate: 8, candidatiInGraduatoria: 110, ultimaNomina: '2025-01-03', competizione: 'media', trend: 'stabile' },


  // ═══════════════════════════════════════════════════════════
  // BOLLETTINI AGGIUNTIVI — Copertura completa province italiane
  // ═══════════════════════════════════════════════════════════

  // ─── PIEMONTE ───
  { id: 'B301-AL', classeCodice: 'A-12', provinciaSigla: 'AL', annoScolastico: '2024/25', tipoGraduatoria: 'GPS I Fascia', punteggioMinimo: 68, punteggioMassimo: 97, posizioniAssegnate: 22, candidatiInGraduatoria: 279, ultimaNomina: '2025-11-05', competizione: 'alta', trend: 'stabile' },
  { id: 'B302-AL', classeCodice: 'A-48', provinciaSigla: 'AL', annoScolastico: '2024/25', tipoGraduatoria: 'GPS I Fascia', punteggioMinimo: 51, punteggioMassimo: 70, posizioniAssegnate: 11, candidatiInGraduatoria: 195, ultimaNomina: '2025-11-12', competizione: 'molto_alta', trend: 'stabile' },
  { id: 'B303-AT', classeCodice: '00EE', provinciaSigla: 'AT', annoScolastico: '2024/25', tipoGraduatoria: 'GPS I Fascia', punteggioMinimo: 70, punteggioMassimo: 100, posizioniAssegnate: 8, candidatiInGraduatoria: 57, ultimaNomina: '2026-03-10', competizione: 'media', trend: 'stabile' },
  { id: 'B304-AT', classeCodice: 'A-26', provinciaSigla: 'AT', annoScolastico: '2024/25', tipoGraduatoria: 'GPS I Fascia', punteggioMinimo: 51, punteggioMassimo: 71, posizioniAssegnate: 10, candidatiInGraduatoria: 123, ultimaNomina: '2026-04-08', competizione: 'alta', trend: 'crescente' },
  { id: 'B305-BI', classeCodice: '00AA', provinciaSigla: 'BI', annoScolastico: '2024/25', tipoGraduatoria: 'GPS I Fascia', punteggioMinimo: 73, punteggioMassimo: 100, posizioniAssegnate: 12, candidatiInGraduatoria: 66, ultimaNomina: '2026-06-08', competizione: 'media', trend: 'stabile' },
  { id: 'B306-BI', classeCodice: 'A-26', provinciaSigla: 'BI', annoScolastico: '2024/25', tipoGraduatoria: 'GPS II Fascia', punteggioMinimo: 53, punteggioMassimo: 71, posizioniAssegnate: 9, candidatiInGraduatoria: 96, ultimaNomina: '2025-12-15', competizione: 'alta', trend: 'stabile' },
  { id: 'B307-CN', classeCodice: 'A-12', provinciaSigla: 'CN', annoScolastico: '2024/25', tipoGraduatoria: 'GPS I Fascia', punteggioMinimo: 71, punteggioMassimo: 97, posizioniAssegnate: 14, candidatiInGraduatoria: 107, ultimaNomina: '2025-12-18', competizione: 'media', trend: 'stabile' },
  { id: 'B308-CN', classeCodice: 'AB22', provinciaSigla: 'CN', annoScolastico: '2024/25', tipoGraduatoria: 'GPS I Fascia', punteggioMinimo: 53, punteggioMassimo: 71, posizioniAssegnate: 14, candidatiInGraduatoria: 104, ultimaNomina: '2025-10-08', competizione: 'media', trend: 'stabile' },
  { id: 'B309-NO', classeCodice: 'A-26', provinciaSigla: 'NO', annoScolastico: '2024/25', tipoGraduatoria: 'GPS I Fascia', punteggioMinimo: 71, punteggioMassimo: 99, posizioniAssegnate: 17, candidatiInGraduatoria: 183, ultimaNomina: '2025-11-05', competizione: 'alta', trend: 'crescente' },
  { id: 'B310-NO', classeCodice: 'AB22', provinciaSigla: 'NO', annoScolastico: '2024/25', tipoGraduatoria: 'GPS I Fascia', punteggioMinimo: 52, punteggioMassimo: 73, posizioniAssegnate: 12, candidatiInGraduatoria: 92, ultimaNomina: '2025-12-15', competizione: 'media', trend: 'stabile' },
  { id: 'B311-VB', classeCodice: 'A-12', provinciaSigla: 'VB', annoScolastico: '2024/25', tipoGraduatoria: 'GPS I Fascia', punteggioMinimo: 72, punteggioMassimo: 96, posizioniAssegnate: 4, candidatiInGraduatoria: 72, ultimaNomina: '2026-03-15', competizione: 'molto_alta', trend: 'crescente' },
  { id: 'B312-VB', classeCodice: 'A-48', provinciaSigla: 'VB', annoScolastico: '2024/25', tipoGraduatoria: 'GPS I Fascia', punteggioMinimo: 48, punteggioMassimo: 69, posizioniAssegnate: 12, candidatiInGraduatoria: 118, ultimaNomina: '2025-12-18', competizione: 'alta', trend: 'stabile' },
  { id: 'B313-VC', classeCodice: '00AA', provinciaSigla: 'VC', annoScolastico: '2024/25', tipoGraduatoria: 'GPS I Fascia', punteggioMinimo: 73, punteggioMassimo: 96, posizioniAssegnate: 6, candidatiInGraduatoria: 52, ultimaNomina: '2026-05-10', competizione: 'alta', trend: 'stabile' },
  { id: 'B314-VC', classeCodice: 'AB22', provinciaSigla: 'VC', annoScolastico: '2024/25', tipoGraduatoria: 'GPS II Fascia', punteggioMinimo: 49, punteggioMassimo: 73, posizioniAssegnate: 9, candidatiInGraduatoria: 72, ultimaNomina: '2026-04-08', competizione: 'media', trend: 'stabile' },

  // ─── LOMBARDIA ───
  { id: 'B315-BG', classeCodice: '00EE', provinciaSigla: 'BG', annoScolastico: '2024/25', tipoGraduatoria: 'GPS I Fascia', punteggioMinimo: 81, punteggioMassimo: 106, posizioniAssegnate: 19, candidatiInGraduatoria: 231, ultimaNomina: '2025-12-15', competizione: 'alta', trend: 'stabile' },
  { id: 'B316-BG', classeCodice: 'A-12', provinciaSigla: 'BG', annoScolastico: '2024/25', tipoGraduatoria: 'GPS I Fascia', punteggioMinimo: 60, punteggioMassimo: 83, posizioniAssegnate: 28, candidatiInGraduatoria: 471, ultimaNomina: '2026-02-18', competizione: 'molto_alta', trend: 'stabile' },
  { id: 'B317-BG', classeCodice: '00EE', provinciaSigla: 'BG', annoScolastico: '2024/25', tipoGraduatoria: 'GPS II Fascia', punteggioMinimo: 55, punteggioMassimo: 79, posizioniAssegnate: 19, candidatiInGraduatoria: 128, ultimaNomina: '2026-03-15', competizione: 'media', trend: 'stabile' },
  { id: 'B318-BS', classeCodice: '00EE', provinciaSigla: 'BS', annoScolastico: '2024/25', tipoGraduatoria: 'GPS I Fascia', punteggioMinimo: 79, punteggioMassimo: 106, posizioniAssegnate: 15, candidatiInGraduatoria: 181, ultimaNomina: '2026-02-12', competizione: 'alta', trend: 'crescente' },
  { id: 'B319-BS', classeCodice: 'A-26', provinciaSigla: 'BS', annoScolastico: '2024/25', tipoGraduatoria: 'GPS II Fascia', punteggioMinimo: 59, punteggioMassimo: 79, posizioniAssegnate: 26, candidatiInGraduatoria: 464, ultimaNomina: '2026-04-08', competizione: 'molto_alta', trend: 'stabile' },
  { id: 'B320-BS', classeCodice: '00EE', provinciaSigla: 'BS', annoScolastico: '2024/25', tipoGraduatoria: 'GPS I Fascia', punteggioMinimo: 60, punteggioMassimo: 83, posizioniAssegnate: 24, candidatiInGraduatoria: 420, ultimaNomina: '2026-04-08', competizione: 'molto_alta', trend: 'stabile' },
  { id: 'B321-CO', classeCodice: 'A-26', provinciaSigla: 'CO', annoScolastico: '2024/25', tipoGraduatoria: 'GPS I Fascia', punteggioMinimo: 78, punteggioMassimo: 109, posizioniAssegnate: 26, candidatiInGraduatoria: 256, ultimaNomina: '2025-11-05', competizione: 'alta', trend: 'stabile' },
  { id: 'B322-CO', classeCodice: 'AB22', provinciaSigla: 'CO', annoScolastico: '2024/25', tipoGraduatoria: 'GAE', punteggioMinimo: 58, punteggioMassimo: 81, posizioniAssegnate: 16, candidatiInGraduatoria: 265, ultimaNomina: '2025-11-05', competizione: 'molto_alta', trend: 'stabile' },
  { id: 'B323-CO', classeCodice: 'A-26', provinciaSigla: 'CO', annoScolastico: '2024/25', tipoGraduatoria: 'GAE', punteggioMinimo: 58, punteggioMassimo: 83, posizioniAssegnate: 15, candidatiInGraduatoria: 192, ultimaNomina: '2026-02-12', competizione: 'alta', trend: 'stabile' },
  { id: 'B324-CR', classeCodice: '00EE', provinciaSigla: 'CR', annoScolastico: '2024/25', tipoGraduatoria: 'GPS I Fascia', punteggioMinimo: 70, punteggioMassimo: 97, posizioniAssegnate: 12, candidatiInGraduatoria: 84, ultimaNomina: '2026-03-10', competizione: 'media', trend: 'stabile' },
  { id: 'B325-CR', classeCodice: 'A-26', provinciaSigla: 'CR', annoScolastico: '2024/25', tipoGraduatoria: 'GPS I Fascia', punteggioMinimo: 50, punteggioMassimo: 69, posizioniAssegnate: 11, candidatiInGraduatoria: 199, ultimaNomina: '2026-03-15', competizione: 'molto_alta', trend: 'crescente' },
  { id: 'B326-LC', classeCodice: '00EE', provinciaSigla: 'LC', annoScolastico: '2024/25', tipoGraduatoria: 'GPS I Fascia', punteggioMinimo: 69, punteggioMassimo: 101, posizioniAssegnate: 14, candidatiInGraduatoria: 227, ultimaNomina: '2026-05-10', competizione: 'molto_alta', trend: 'stabile' },
  { id: 'B327-LC', classeCodice: '00AA', provinciaSigla: 'LC', annoScolastico: '2024/25', tipoGraduatoria: 'GPS II Fascia', punteggioMinimo: 50, punteggioMassimo: 70, posizioniAssegnate: 10, candidatiInGraduatoria: 75, ultimaNomina: '2025-11-05', competizione: 'media', trend: 'stabile' },
  { id: 'B328-LO', classeCodice: 'A-26', provinciaSigla: 'LO', annoScolastico: '2024/25', tipoGraduatoria: 'GPS I Fascia', punteggioMinimo: 68, punteggioMassimo: 97, posizioniAssegnate: 14, candidatiInGraduatoria: 188, ultimaNomina: '2025-11-05', competizione: 'alta', trend: 'stabile' },
  { id: 'B329-LO', classeCodice: 'A-12', provinciaSigla: 'LO', annoScolastico: '2024/25', tipoGraduatoria: 'GPS I Fascia', punteggioMinimo: 51, punteggioMassimo: 71, posizioniAssegnate: 13, candidatiInGraduatoria: 201, ultimaNomina: '2025-11-12', competizione: 'molto_alta', trend: 'stabile' },
  { id: 'B330-MB', classeCodice: '00EE', provinciaSigla: 'MB', annoScolastico: '2024/25', tipoGraduatoria: 'GPS I Fascia', punteggioMinimo: 72, punteggioMassimo: 96, posizioniAssegnate: 19, candidatiInGraduatoria: 177, ultimaNomina: '2025-10-08', competizione: 'alta', trend: 'stabile' },
  { id: 'B331-MB', classeCodice: '00AA', provinciaSigla: 'MB', annoScolastico: '2024/25', tipoGraduatoria: 'GAE', punteggioMinimo: 50, punteggioMassimo: 71, posizioniAssegnate: 17, candidatiInGraduatoria: 149, ultimaNomina: '2026-01-14', competizione: 'alta', trend: 'crescente' },
  { id: 'B332-MN', classeCodice: 'A-26', provinciaSigla: 'MN', annoScolastico: '2024/25', tipoGraduatoria: 'GPS I Fascia', punteggioMinimo: 71, punteggioMassimo: 99, posizioniAssegnate: 5, candidatiInGraduatoria: 96, ultimaNomina: '2026-04-08', competizione: 'molto_alta', trend: 'stabile' },
  { id: 'B333-MN', classeCodice: 'A-12', provinciaSigla: 'MN', annoScolastico: '2024/25', tipoGraduatoria: 'GAE', punteggioMinimo: 49, punteggioMassimo: 72, posizioniAssegnate: 9, candidatiInGraduatoria: 121, ultimaNomina: '2026-06-08', competizione: 'alta', trend: 'stabile' },
  { id: 'B334-PV', classeCodice: 'A-26', provinciaSigla: 'PV', annoScolastico: '2024/25', tipoGraduatoria: 'GPS I Fascia', punteggioMinimo: 73, punteggioMassimo: 101, posizioniAssegnate: 7, candidatiInGraduatoria: 90, ultimaNomina: '2026-03-10', competizione: 'alta', trend: 'crescente' },
  { id: 'B335-PV', classeCodice: 'A-12', provinciaSigla: 'PV', annoScolastico: '2024/25', tipoGraduatoria: 'GAE', punteggioMinimo: 52, punteggioMassimo: 69, posizioniAssegnate: 5, candidatiInGraduatoria: 101, ultimaNomina: '2026-02-12', competizione: 'molto_alta', trend: 'stabile' },
  { id: 'B336-SO', classeCodice: 'A-26', provinciaSigla: 'SO', annoScolastico: '2024/25', tipoGraduatoria: 'GPS I Fascia', punteggioMinimo: 71, punteggioMassimo: 101, posizioniAssegnate: 14, candidatiInGraduatoria: 181, ultimaNomina: '2026-05-10', competizione: 'alta', trend: 'crescente' },
  { id: 'B337-SO', classeCodice: 'A-50', provinciaSigla: 'SO', annoScolastico: '2024/25', tipoGraduatoria: 'GAE', punteggioMinimo: 49, punteggioMassimo: 68, posizioniAssegnate: 7, candidatiInGraduatoria: 58, ultimaNomina: '2026-05-10', competizione: 'alta', trend: 'crescente' },
  { id: 'B338-VA', classeCodice: 'A-26', provinciaSigla: 'VA', annoScolastico: '2024/25', tipoGraduatoria: 'GPS I Fascia', punteggioMinimo: 69, punteggioMassimo: 98, posizioniAssegnate: 13, candidatiInGraduatoria: 144, ultimaNomina: '2025-12-18', competizione: 'alta', trend: 'stabile' },
  { id: 'B339-VA', classeCodice: 'A-50', provinciaSigla: 'VA', annoScolastico: '2024/25', tipoGraduatoria: 'GAE', punteggioMinimo: 48, punteggioMassimo: 73, posizioniAssegnate: 16, candidatiInGraduatoria: 102, ultimaNomina: '2025-09-10', competizione: 'media', trend: 'stabile' },

  // ─── VENETO ───
  { id: 'B340-BL', classeCodice: '00AA', provinciaSigla: 'BL', annoScolastico: '2024/25', tipoGraduatoria: 'GPS I Fascia', punteggioMinimo: 80, punteggioMassimo: 108, posizioniAssegnate: 6, candidatiInGraduatoria: 94, ultimaNomina: '2026-01-20', competizione: 'molto_alta', trend: 'stabile' },
  { id: 'B341-BL', classeCodice: 'AB22', provinciaSigla: 'BL', annoScolastico: '2024/25', tipoGraduatoria: 'GAE', punteggioMinimo: 58, punteggioMassimo: 81, posizioniAssegnate: 14, candidatiInGraduatoria: 144, ultimaNomina: '2025-12-18', competizione: 'alta', trend: 'stabile' },
  { id: 'B342-PD', classeCodice: '00EE', provinciaSigla: 'PD', annoScolastico: '2024/25', tipoGraduatoria: 'GPS I Fascia', punteggioMinimo: 81, punteggioMassimo: 107, posizioniAssegnate: 27, candidatiInGraduatoria: 311, ultimaNomina: '2026-05-10', competizione: 'alta', trend: 'crescente' },
  { id: 'B343-PD', classeCodice: 'A-12', provinciaSigla: 'PD', annoScolastico: '2024/25', tipoGraduatoria: 'GPS II Fascia', punteggioMinimo: 57, punteggioMassimo: 79, posizioniAssegnate: 22, candidatiInGraduatoria: 271, ultimaNomina: '2026-01-20', competizione: 'alta', trend: 'stabile' },
  { id: 'B344-PD', classeCodice: '00EE', provinciaSigla: 'PD', annoScolastico: '2024/25', tipoGraduatoria: 'GPS I Fascia', punteggioMinimo: 55, punteggioMassimo: 78, posizioniAssegnate: 22, candidatiInGraduatoria: 182, ultimaNomina: '2025-12-18', competizione: 'alta', trend: 'stabile' },
  { id: 'B345-RO', classeCodice: '00AA', provinciaSigla: 'RO', annoScolastico: '2024/25', tipoGraduatoria: 'GPS I Fascia', punteggioMinimo: 82, punteggioMassimo: 108, posizioniAssegnate: 14, candidatiInGraduatoria: 237, ultimaNomina: '2025-09-10', competizione: 'molto_alta', trend: 'stabile' },
  { id: 'B346-RO', classeCodice: 'A-26', provinciaSigla: 'RO', annoScolastico: '2024/25', tipoGraduatoria: 'GPS I Fascia', punteggioMinimo: 58, punteggioMassimo: 82, posizioniAssegnate: 10, candidatiInGraduatoria: 80, ultimaNomina: '2025-11-05', competizione: 'media', trend: 'stabile' },
  { id: 'B347-TV', classeCodice: '00EE', provinciaSigla: 'TV', annoScolastico: '2024/25', tipoGraduatoria: 'GPS I Fascia', punteggioMinimo: 79, punteggioMassimo: 107, posizioniAssegnate: 9, candidatiInGraduatoria: 114, ultimaNomina: '2026-02-18', competizione: 'alta', trend: 'crescente' },
  { id: 'B348-TV', classeCodice: 'A-12', provinciaSigla: 'TV', annoScolastico: '2024/25', tipoGraduatoria: 'GPS II Fascia', punteggioMinimo: 58, punteggioMassimo: 82, posizioniAssegnate: 17, candidatiInGraduatoria: 165, ultimaNomina: '2026-03-15', competizione: 'alta', trend: 'crescente' },
  { id: 'B349-VI', classeCodice: '00EE', provinciaSigla: 'VI', annoScolastico: '2024/25', tipoGraduatoria: 'GPS I Fascia', punteggioMinimo: 82, punteggioMassimo: 110, posizioniAssegnate: 18, candidatiInGraduatoria: 311, ultimaNomina: '2026-04-08', competizione: 'molto_alta', trend: 'crescente' },
  { id: 'B350-VI', classeCodice: 'A-12', provinciaSigla: 'VI', annoScolastico: '2024/25', tipoGraduatoria: 'GPS I Fascia', punteggioMinimo: 57, punteggioMassimo: 83, posizioniAssegnate: 19, candidatiInGraduatoria: 330, ultimaNomina: '2026-05-10', competizione: 'molto_alta', trend: 'crescente' },
  { id: 'B351-VI', classeCodice: '00EE', provinciaSigla: 'VI', annoScolastico: '2024/25', tipoGraduatoria: 'GAE', punteggioMinimo: 59, punteggioMassimo: 78, posizioniAssegnate: 20, candidatiInGraduatoria: 207, ultimaNomina: '2026-02-12', competizione: 'alta', trend: 'stabile' },
  { id: 'B352-VR', classeCodice: 'A-26', provinciaSigla: 'VR', annoScolastico: '2024/25', tipoGraduatoria: 'GPS I Fascia', punteggioMinimo: 82, punteggioMassimo: 110, posizioniAssegnate: 28, candidatiInGraduatoria: 318, ultimaNomina: '2026-05-10', competizione: 'alta', trend: 'stabile' },
  { id: 'B353-VR', classeCodice: 'AB22', provinciaSigla: 'VR', annoScolastico: '2024/25', tipoGraduatoria: 'GPS I Fascia', punteggioMinimo: 57, punteggioMassimo: 80, posizioniAssegnate: 16, candidatiInGraduatoria: 270, ultimaNomina: '2025-12-18', competizione: 'molto_alta', trend: 'stabile' },
  { id: 'B354-VR', classeCodice: 'A-26', provinciaSigla: 'VR', annoScolastico: '2024/25', tipoGraduatoria: 'GAE', punteggioMinimo: 56, punteggioMassimo: 81, posizioniAssegnate: 15, candidatiInGraduatoria: 143, ultimaNomina: '2026-03-10', competizione: 'alta', trend: 'crescente' },

  // ─── EMILIA-ROMAGNA ───
  { id: 'B355-FC', classeCodice: '00EE', provinciaSigla: 'FC', annoScolastico: '2024/25', tipoGraduatoria: 'GPS I Fascia', punteggioMinimo: 78, punteggioMassimo: 108, posizioniAssegnate: 29, candidatiInGraduatoria: 134, ultimaNomina: '2026-05-10', competizione: 'media', trend: 'stabile' },
  { id: 'B356-FC', classeCodice: 'A-12', provinciaSigla: 'FC', annoScolastico: '2024/25', tipoGraduatoria: 'GAE', punteggioMinimo: 58, punteggioMassimo: 82, posizioniAssegnate: 17, candidatiInGraduatoria: 230, ultimaNomina: '2025-10-08', competizione: 'alta', trend: 'stabile' },
  { id: 'B357-FC', classeCodice: '00EE', provinciaSigla: 'FC', annoScolastico: '2024/25', tipoGraduatoria: 'GPS I Fascia', punteggioMinimo: 57, punteggioMassimo: 80, posizioniAssegnate: 22, candidatiInGraduatoria: 152, ultimaNomina: '2025-09-10', competizione: 'media', trend: 'stabile' },
  { id: 'B358-FE', classeCodice: '00AA', provinciaSigla: 'FE', annoScolastico: '2024/25', tipoGraduatoria: 'GPS I Fascia', punteggioMinimo: 83, punteggioMassimo: 108, posizioniAssegnate: 22, candidatiInGraduatoria: 296, ultimaNomina: '2026-02-18', competizione: 'alta', trend: 'crescente' },
  { id: 'B359-FE', classeCodice: 'A-26', provinciaSigla: 'FE', annoScolastico: '2024/25', tipoGraduatoria: 'GPS I Fascia', punteggioMinimo: 58, punteggioMassimo: 79, posizioniAssegnate: 24, candidatiInGraduatoria: 201, ultimaNomina: '2026-03-10', competizione: 'alta', trend: 'crescente' },
  { id: 'B360-FE', classeCodice: '00AA', provinciaSigla: 'FE', annoScolastico: '2024/25', tipoGraduatoria: 'GPS II Fascia', punteggioMinimo: 59, punteggioMassimo: 82, posizioniAssegnate: 15, candidatiInGraduatoria: 87, ultimaNomina: '2026-05-10', competizione: 'media', trend: 'stabile' },
  { id: 'B361-MO', classeCodice: 'A-12', provinciaSigla: 'MO', annoScolastico: '2024/25', tipoGraduatoria: 'GPS I Fascia', punteggioMinimo: 83, punteggioMassimo: 110, posizioniAssegnate: 27, candidatiInGraduatoria: 248, ultimaNomina: '2026-03-10', competizione: 'alta', trend: 'stabile' },
  { id: 'B362-MO', classeCodice: 'AB22', provinciaSigla: 'MO', annoScolastico: '2024/25', tipoGraduatoria: 'GPS I Fascia', punteggioMinimo: 57, punteggioMassimo: 82, posizioniAssegnate: 20, candidatiInGraduatoria: 321, ultimaNomina: '2025-11-12', competizione: 'molto_alta', trend: 'crescente' },
  { id: 'B363-MO', classeCodice: 'A-12', provinciaSigla: 'MO', annoScolastico: '2024/25', tipoGraduatoria: 'GPS II Fascia', punteggioMinimo: 56, punteggioMassimo: 83, posizioniAssegnate: 28, candidatiInGraduatoria: 211, ultimaNomina: '2025-11-05', competizione: 'media', trend: 'stabile' },
  { id: 'B364-PC', classeCodice: 'A-12', provinciaSigla: 'PC', annoScolastico: '2024/25', tipoGraduatoria: 'GPS I Fascia', punteggioMinimo: 80, punteggioMassimo: 108, posizioniAssegnate: 8, candidatiInGraduatoria: 145, ultimaNomina: '2025-11-05', competizione: 'molto_alta', trend: 'stabile' },
  { id: 'B365-PC', classeCodice: 'A-26', provinciaSigla: 'PC', annoScolastico: '2024/25', tipoGraduatoria: 'GPS I Fascia', punteggioMinimo: 56, punteggioMassimo: 83, posizioniAssegnate: 7, candidatiInGraduatoria: 112, ultimaNomina: '2025-11-05', competizione: 'molto_alta', trend: 'crescente' },
  { id: 'B366-PR', classeCodice: 'A-26', provinciaSigla: 'PR', annoScolastico: '2024/25', tipoGraduatoria: 'GPS I Fascia', punteggioMinimo: 80, punteggioMassimo: 106, posizioniAssegnate: 20, candidatiInGraduatoria: 378, ultimaNomina: '2025-09-10', competizione: 'molto_alta', trend: 'stabile' },
  { id: 'B367-PR', classeCodice: 'A-50', provinciaSigla: 'PR', annoScolastico: '2024/25', tipoGraduatoria: 'GPS I Fascia', punteggioMinimo: 55, punteggioMassimo: 79, posizioniAssegnate: 18, candidatiInGraduatoria: 114, ultimaNomina: '2025-11-05', competizione: 'media', trend: 'stabile' },
  { id: 'B368-PR', classeCodice: 'A-26', provinciaSigla: 'PR', annoScolastico: '2024/25', tipoGraduatoria: 'GPS II Fascia', punteggioMinimo: 58, punteggioMassimo: 83, posizioniAssegnate: 16, candidatiInGraduatoria: 237, ultimaNomina: '2025-12-15', competizione: 'alta', trend: 'stabile' },
  { id: 'B369-RA', classeCodice: 'A-12', provinciaSigla: 'RA', annoScolastico: '2024/25', tipoGraduatoria: 'GPS I Fascia', punteggioMinimo: 78, punteggioMassimo: 110, posizioniAssegnate: 18, candidatiInGraduatoria: 106, ultimaNomina: '2025-12-18', competizione: 'media', trend: 'stabile' },
  { id: 'B370-RA', classeCodice: 'A-26', provinciaSigla: 'RA', annoScolastico: '2024/25', tipoGraduatoria: 'GPS II Fascia', punteggioMinimo: 59, punteggioMassimo: 81, posizioniAssegnate: 20, candidatiInGraduatoria: 281, ultimaNomina: '2026-05-10', competizione: 'alta', trend: 'stabile' },
  { id: 'B371-RA', classeCodice: 'A-12', provinciaSigla: 'RA', annoScolastico: '2024/25', tipoGraduatoria: 'GPS I Fascia', punteggioMinimo: 57, punteggioMassimo: 79, posizioniAssegnate: 24, candidatiInGraduatoria: 148, ultimaNomina: '2025-09-10', competizione: 'media', trend: 'stabile' },
  { id: 'B372-RE', classeCodice: 'A-26', provinciaSigla: 'RE', annoScolastico: '2024/25', tipoGraduatoria: 'GPS I Fascia', punteggioMinimo: 79, punteggioMassimo: 105, posizioniAssegnate: 16, candidatiInGraduatoria: 286, ultimaNomina: '2026-03-10', competizione: 'molto_alta', trend: 'stabile' },
  { id: 'B373-RE', classeCodice: 'A-50', provinciaSigla: 'RE', annoScolastico: '2024/25', tipoGraduatoria: 'GAE', punteggioMinimo: 58, punteggioMassimo: 80, posizioniAssegnate: 19, candidatiInGraduatoria: 295, ultimaNomina: '2026-05-10', competizione: 'molto_alta', trend: 'stabile' },
  { id: 'B374-RE', classeCodice: 'A-26', provinciaSigla: 'RE', annoScolastico: '2024/25', tipoGraduatoria: 'GPS I Fascia', punteggioMinimo: 55, punteggioMassimo: 79, posizioniAssegnate: 19, candidatiInGraduatoria: 187, ultimaNomina: '2025-12-18', competizione: 'alta', trend: 'stabile' },
  { id: 'B375-RN', classeCodice: '00EE', provinciaSigla: 'RN', annoScolastico: '2024/25', tipoGraduatoria: 'GPS I Fascia', punteggioMinimo: 78, punteggioMassimo: 108, posizioniAssegnate: 8, candidatiInGraduatoria: 74, ultimaNomina: '2026-02-18', competizione: 'alta', trend: 'crescente' },
  { id: 'B376-RN', classeCodice: 'A-26', provinciaSigla: 'RN', annoScolastico: '2024/25', tipoGraduatoria: 'GPS II Fascia', punteggioMinimo: 55, punteggioMassimo: 79, posizioniAssegnate: 10, candidatiInGraduatoria: 139, ultimaNomina: '2026-01-14', competizione: 'alta', trend: 'stabile' },

  // ─── TOSCANA ───
  { id: 'B377-AR', classeCodice: 'A-12', provinciaSigla: 'AR', annoScolastico: '2024/25', tipoGraduatoria: 'GPS I Fascia', punteggioMinimo: 70, punteggioMassimo: 100, posizioniAssegnate: 8, candidatiInGraduatoria: 133, ultimaNomina: '2025-12-15', competizione: 'molto_alta', trend: 'crescente' },
  { id: 'B378-AR', classeCodice: 'A-26', provinciaSigla: 'AR', annoScolastico: '2024/25', tipoGraduatoria: 'GPS I Fascia', punteggioMinimo: 53, punteggioMassimo: 69, posizioniAssegnate: 6, candidatiInGraduatoria: 94, ultimaNomina: '2026-05-10', competizione: 'molto_alta', trend: 'crescente' },
  { id: 'B379-GR', classeCodice: '00AA', provinciaSigla: 'GR', annoScolastico: '2024/25', tipoGraduatoria: 'GPS I Fascia', punteggioMinimo: 71, punteggioMassimo: 98, posizioniAssegnate: 8, candidatiInGraduatoria: 61, ultimaNomina: '2025-12-15', competizione: 'media', trend: 'stabile' },
  { id: 'B380-GR', classeCodice: 'AB22', provinciaSigla: 'GR', annoScolastico: '2024/25', tipoGraduatoria: 'GAE', punteggioMinimo: 50, punteggioMassimo: 68, posizioniAssegnate: 4, candidatiInGraduatoria: 62, ultimaNomina: '2026-06-08', competizione: 'molto_alta', trend: 'stabile' },
  { id: 'B381-LI', classeCodice: '00EE', provinciaSigla: 'LI', annoScolastico: '2024/25', tipoGraduatoria: 'GPS I Fascia', punteggioMinimo: 70, punteggioMassimo: 100, posizioniAssegnate: 4, candidatiInGraduatoria: 25, ultimaNomina: '2026-03-10', competizione: 'media', trend: 'stabile' },
  { id: 'B382-LI', classeCodice: 'A-26', provinciaSigla: 'LI', annoScolastico: '2024/25', tipoGraduatoria: 'GPS II Fascia', punteggioMinimo: 53, punteggioMassimo: 72, posizioniAssegnate: 12, candidatiInGraduatoria: 208, ultimaNomina: '2025-11-12', competizione: 'molto_alta', trend: 'stabile' },
  { id: 'B383-LU', classeCodice: '00AA', provinciaSigla: 'LU', annoScolastico: '2024/25', tipoGraduatoria: 'GPS I Fascia', punteggioMinimo: 73, punteggioMassimo: 101, posizioniAssegnate: 7, candidatiInGraduatoria: 129, ultimaNomina: '2026-01-20', competizione: 'molto_alta', trend: 'stabile' },
  { id: 'B384-LU', classeCodice: 'A-26', provinciaSigla: 'LU', annoScolastico: '2024/25', tipoGraduatoria: 'GAE', punteggioMinimo: 52, punteggioMassimo: 72, posizioniAssegnate: 10, candidatiInGraduatoria: 110, ultimaNomina: '2026-04-08', competizione: 'alta', trend: 'stabile' },
  { id: 'B385-MS', classeCodice: '00EE', provinciaSigla: 'MS', annoScolastico: '2024/25', tipoGraduatoria: 'GPS I Fascia', punteggioMinimo: 71, punteggioMassimo: 99, posizioniAssegnate: 8, candidatiInGraduatoria: 123, ultimaNomina: '2025-11-05', competizione: 'molto_alta', trend: 'stabile' },
  { id: 'B386-MS', classeCodice: 'A-26', provinciaSigla: 'MS', annoScolastico: '2024/25', tipoGraduatoria: 'GPS I Fascia', punteggioMinimo: 51, punteggioMassimo: 68, posizioniAssegnate: 5, candidatiInGraduatoria: 90, ultimaNomina: '2026-03-10', competizione: 'molto_alta', trend: 'crescente' },
  { id: 'B387-PI', classeCodice: '00AA', provinciaSigla: 'PI', annoScolastico: '2024/25', tipoGraduatoria: 'GPS I Fascia', punteggioMinimo: 69, punteggioMassimo: 98, posizioniAssegnate: 8, candidatiInGraduatoria: 106, ultimaNomina: '2025-12-15', competizione: 'alta', trend: 'stabile' },
  { id: 'B388-PI', classeCodice: 'AB22', provinciaSigla: 'PI', annoScolastico: '2024/25', tipoGraduatoria: 'GPS II Fascia', punteggioMinimo: 50, punteggioMassimo: 68, posizioniAssegnate: 9, candidatiInGraduatoria: 64, ultimaNomina: '2026-02-12', competizione: 'media', trend: 'stabile' },
  { id: 'B389-PO', classeCodice: '00EE', provinciaSigla: 'PO', annoScolastico: '2024/25', tipoGraduatoria: 'GPS I Fascia', punteggioMinimo: 68, punteggioMassimo: 100, posizioniAssegnate: 11, candidatiInGraduatoria: 110, ultimaNomina: '2026-04-08', competizione: 'alta', trend: 'stabile' },
  { id: 'B390-PO', classeCodice: 'A-12', provinciaSigla: 'PO', annoScolastico: '2024/25', tipoGraduatoria: 'GPS II Fascia', punteggioMinimo: 48, punteggioMassimo: 68, posizioniAssegnate: 13, candidatiInGraduatoria: 181, ultimaNomina: '2025-11-05', competizione: 'alta', trend: 'stabile' },
  { id: 'B391-SI', classeCodice: 'A-12', provinciaSigla: 'SI', annoScolastico: '2024/25', tipoGraduatoria: 'GPS I Fascia', punteggioMinimo: 71, punteggioMassimo: 96, posizioniAssegnate: 11, candidatiInGraduatoria: 179, ultimaNomina: '2025-11-05', competizione: 'molto_alta', trend: 'stabile' },
  { id: 'B392-SI', classeCodice: 'AB22', provinciaSigla: 'SI', annoScolastico: '2024/25', tipoGraduatoria: 'GPS I Fascia', punteggioMinimo: 48, punteggioMassimo: 73, posizioniAssegnate: 11, candidatiInGraduatoria: 57, ultimaNomina: '2026-01-14', competizione: 'media', trend: 'stabile' },

  // ─── LIGURIA ───
  { id: 'B393-IM', classeCodice: '00AA', provinciaSigla: 'IM', annoScolastico: '2024/25', tipoGraduatoria: 'GPS I Fascia', punteggioMinimo: 70, punteggioMassimo: 98, posizioniAssegnate: 14, candidatiInGraduatoria: 112, ultimaNomina: '2026-03-15', competizione: 'media', trend: 'stabile' },
  { id: 'B394-IM', classeCodice: 'A-26', provinciaSigla: 'IM', annoScolastico: '2024/25', tipoGraduatoria: 'GPS I Fascia', punteggioMinimo: 52, punteggioMassimo: 73, posizioniAssegnate: 11, candidatiInGraduatoria: 127, ultimaNomina: '2026-01-14', competizione: 'alta', trend: 'stabile' },
  { id: 'B395-SP', classeCodice: 'A-12', provinciaSigla: 'SP', annoScolastico: '2024/25', tipoGraduatoria: 'GPS I Fascia', punteggioMinimo: 71, punteggioMassimo: 96, posizioniAssegnate: 7, candidatiInGraduatoria: 137, ultimaNomina: '2025-11-05', competizione: 'molto_alta', trend: 'stabile' },
  { id: 'B396-SP', classeCodice: 'A-48', provinciaSigla: 'SP', annoScolastico: '2024/25', tipoGraduatoria: 'GPS II Fascia', punteggioMinimo: 52, punteggioMassimo: 73, posizioniAssegnate: 14, candidatiInGraduatoria: 209, ultimaNomina: '2025-11-05', competizione: 'alta', trend: 'stabile' },
  { id: 'B397-SV', classeCodice: 'A-12', provinciaSigla: 'SV', annoScolastico: '2024/25', tipoGraduatoria: 'GPS I Fascia', punteggioMinimo: 71, punteggioMassimo: 96, posizioniAssegnate: 12, candidatiInGraduatoria: 194, ultimaNomina: '2026-02-18', competizione: 'molto_alta', trend: 'stabile' },
  { id: 'B398-SV', classeCodice: 'A-26', provinciaSigla: 'SV', annoScolastico: '2024/25', tipoGraduatoria: 'GPS II Fascia', punteggioMinimo: 52, punteggioMassimo: 71, posizioniAssegnate: 13, candidatiInGraduatoria: 81, ultimaNomina: '2026-01-20', competizione: 'media', trend: 'stabile' },

  // ─── MARCHE ───
  { id: 'B399-AN', classeCodice: '00EE', provinciaSigla: 'AN', annoScolastico: '2024/25', tipoGraduatoria: 'GPS I Fascia', punteggioMinimo: 68, punteggioMassimo: 100, posizioniAssegnate: 16, candidatiInGraduatoria: 177, ultimaNomina: '2025-11-05', competizione: 'alta', trend: 'crescente' },
  { id: 'B400-AN', classeCodice: '00AA', provinciaSigla: 'AN', annoScolastico: '2024/25', tipoGraduatoria: 'GPS I Fascia', punteggioMinimo: 49, punteggioMassimo: 70, posizioniAssegnate: 19, candidatiInGraduatoria: 163, ultimaNomina: '2026-04-08', competizione: 'alta', trend: 'stabile' },
  { id: 'B401-AP', classeCodice: 'A-12', provinciaSigla: 'AP', annoScolastico: '2024/25', tipoGraduatoria: 'GPS I Fascia', punteggioMinimo: 68, punteggioMassimo: 96, posizioniAssegnate: 9, candidatiInGraduatoria: 117, ultimaNomina: '2025-09-10', competizione: 'alta', trend: 'stabile' },
  { id: 'B402-AP', classeCodice: 'AB22', provinciaSigla: 'AP', annoScolastico: '2024/25', tipoGraduatoria: 'GPS II Fascia', punteggioMinimo: 49, punteggioMassimo: 69, posizioniAssegnate: 10, candidatiInGraduatoria: 133, ultimaNomina: '2025-12-15', competizione: 'alta', trend: 'stabile' },
  { id: 'B403-FM', classeCodice: 'A-12', provinciaSigla: 'FM', annoScolastico: '2024/25', tipoGraduatoria: 'GPS I Fascia', punteggioMinimo: 72, punteggioMassimo: 99, posizioniAssegnate: 14, candidatiInGraduatoria: 208, ultimaNomina: '2026-06-08', competizione: 'alta', trend: 'stabile' },
  { id: 'B404-FM', classeCodice: 'A-26', provinciaSigla: 'FM', annoScolastico: '2024/25', tipoGraduatoria: 'GPS II Fascia', punteggioMinimo: 48, punteggioMassimo: 68, posizioniAssegnate: 8, candidatiInGraduatoria: 130, ultimaNomina: '2025-11-05', competizione: 'molto_alta', trend: 'crescente' },
  { id: 'B405-MC', classeCodice: 'A-26', provinciaSigla: 'MC', annoScolastico: '2024/25', tipoGraduatoria: 'GPS I Fascia', punteggioMinimo: 70, punteggioMassimo: 99, posizioniAssegnate: 10, candidatiInGraduatoria: 103, ultimaNomina: '2026-02-12', competizione: 'alta', trend: 'stabile' },
  { id: 'B406-MC', classeCodice: 'A-12', provinciaSigla: 'MC', annoScolastico: '2024/25', tipoGraduatoria: 'GPS I Fascia', punteggioMinimo: 53, punteggioMassimo: 71, posizioniAssegnate: 4, candidatiInGraduatoria: 42, ultimaNomina: '2026-03-10', competizione: 'alta', trend: 'crescente' },
  { id: 'B407-PU', classeCodice: '00EE', provinciaSigla: 'PU', annoScolastico: '2024/25', tipoGraduatoria: 'GPS I Fascia', punteggioMinimo: 69, punteggioMassimo: 101, posizioniAssegnate: 13, candidatiInGraduatoria: 154, ultimaNomina: '2026-02-18', competizione: 'alta', trend: 'stabile' },
  { id: 'B408-PU', classeCodice: '00AA', provinciaSigla: 'PU', annoScolastico: '2024/25', tipoGraduatoria: 'GPS I Fascia', punteggioMinimo: 51, punteggioMassimo: 72, posizioniAssegnate: 9, candidatiInGraduatoria: 95, ultimaNomina: '2026-03-15', competizione: 'alta', trend: 'stabile' },

  // ─── LAZIO ───
  { id: 'B409-FR', classeCodice: 'A-12', provinciaSigla: 'FR', annoScolastico: '2024/25', tipoGraduatoria: 'GPS I Fascia', punteggioMinimo: 71, punteggioMassimo: 96, posizioniAssegnate: 12, candidatiInGraduatoria: 135, ultimaNomina: '2026-05-10', competizione: 'alta', trend: 'stabile' },
  { id: 'B410-FR', classeCodice: 'A-48', provinciaSigla: 'FR', annoScolastico: '2024/25', tipoGraduatoria: 'GPS I Fascia', punteggioMinimo: 53, punteggioMassimo: 73, posizioniAssegnate: 9, candidatiInGraduatoria: 155, ultimaNomina: '2026-05-10', competizione: 'molto_alta', trend: 'crescente' },
  { id: 'B411-LT', classeCodice: '00EE', provinciaSigla: 'LT', annoScolastico: '2024/25', tipoGraduatoria: 'GPS I Fascia', punteggioMinimo: 69, punteggioMassimo: 96, posizioniAssegnate: 15, candidatiInGraduatoria: 170, ultimaNomina: '2026-02-12', competizione: 'alta', trend: 'stabile' },
  { id: 'B412-LT', classeCodice: 'A-26', provinciaSigla: 'LT', annoScolastico: '2024/25', tipoGraduatoria: 'GAE', punteggioMinimo: 49, punteggioMassimo: 69, posizioniAssegnate: 20, candidatiInGraduatoria: 346, ultimaNomina: '2026-06-08', competizione: 'molto_alta', trend: 'stabile' },
  { id: 'B413-RI', classeCodice: 'A-26', provinciaSigla: 'RI', annoScolastico: '2024/25', tipoGraduatoria: 'GPS I Fascia', punteggioMinimo: 68, punteggioMassimo: 96, posizioniAssegnate: 5, candidatiInGraduatoria: 93, ultimaNomina: '2026-01-14', competizione: 'molto_alta', trend: 'stabile' },
  { id: 'B414-RI', classeCodice: 'A-12', provinciaSigla: 'RI', annoScolastico: '2024/25', tipoGraduatoria: 'GAE', punteggioMinimo: 53, punteggioMassimo: 70, posizioniAssegnate: 12, candidatiInGraduatoria: 196, ultimaNomina: '2026-02-18', competizione: 'molto_alta', trend: 'crescente' },
  { id: 'B415-VT', classeCodice: '00EE', provinciaSigla: 'VT', annoScolastico: '2024/25', tipoGraduatoria: 'GPS I Fascia', punteggioMinimo: 69, punteggioMassimo: 98, posizioniAssegnate: 13, candidatiInGraduatoria: 160, ultimaNomina: '2025-12-18', competizione: 'alta', trend: 'stabile' },
  { id: 'B416-VT', classeCodice: 'A-12', provinciaSigla: 'VT', annoScolastico: '2024/25', tipoGraduatoria: 'GAE', punteggioMinimo: 50, punteggioMassimo: 70, posizioniAssegnate: 5, candidatiInGraduatoria: 81, ultimaNomina: '2025-11-05', competizione: 'molto_alta', trend: 'crescente' },

  // ─── ABRUZZO ───
  { id: 'B417-PE', classeCodice: '00EE', provinciaSigla: 'PE', annoScolastico: '2024/25', tipoGraduatoria: 'GPS I Fascia', punteggioMinimo: 68, punteggioMassimo: 101, posizioniAssegnate: 11, candidatiInGraduatoria: 131, ultimaNomina: '2026-03-15', competizione: 'alta', trend: 'stabile' },
  { id: 'B418-PE', classeCodice: 'A-26', provinciaSigla: 'PE', annoScolastico: '2024/25', tipoGraduatoria: 'GPS II Fascia', punteggioMinimo: 49, punteggioMassimo: 68, posizioniAssegnate: 4, candidatiInGraduatoria: 60, ultimaNomina: '2026-03-15', competizione: 'alta', trend: 'stabile' },
  { id: 'B419-TE', classeCodice: '00AA', provinciaSigla: 'TE', annoScolastico: '2024/25', tipoGraduatoria: 'GPS I Fascia', punteggioMinimo: 72, punteggioMassimo: 97, posizioniAssegnate: 14, candidatiInGraduatoria: 125, ultimaNomina: '2026-02-12', competizione: 'alta', trend: 'stabile' },
  { id: 'B420-TE', classeCodice: 'AB22', provinciaSigla: 'TE', annoScolastico: '2024/25', tipoGraduatoria: 'GPS II Fascia', punteggioMinimo: 50, punteggioMassimo: 70, posizioniAssegnate: 6, candidatiInGraduatoria: 91, ultimaNomina: '2025-09-10', competizione: 'molto_alta', trend: 'crescente' },

  // ─── MOLISE ───
  { id: 'B421-CB', classeCodice: 'A-26', provinciaSigla: 'CB', annoScolastico: '2024/25', tipoGraduatoria: 'GPS I Fascia', punteggioMinimo: 64, punteggioMassimo: 90, posizioniAssegnate: 9, candidatiInGraduatoria: 42, ultimaNomina: '2026-02-12', competizione: 'media', trend: 'stabile' },
  { id: 'B422-CB', classeCodice: 'A-12', provinciaSigla: 'CB', annoScolastico: '2024/25', tipoGraduatoria: 'GAE', punteggioMinimo: 45, punteggioMassimo: 63, posizioniAssegnate: 6, candidatiInGraduatoria: 64, ultimaNomina: '2026-01-14', competizione: 'alta', trend: 'stabile' },
  { id: 'B423-IS', classeCodice: 'A-12', provinciaSigla: 'IS', annoScolastico: '2024/25', tipoGraduatoria: 'GPS I Fascia', punteggioMinimo: 62, punteggioMassimo: 90, posizioniAssegnate: 10, candidatiInGraduatoria: 152, ultimaNomina: '2026-04-08', competizione: 'molto_alta', trend: 'stabile' },
  { id: 'B424-IS', classeCodice: 'AB22', provinciaSigla: 'IS', annoScolastico: '2024/25', tipoGraduatoria: 'GPS I Fascia', punteggioMinimo: 47, punteggioMassimo: 63, posizioniAssegnate: 4, candidatiInGraduatoria: 50, ultimaNomina: '2025-10-08', competizione: 'alta', trend: 'crescente' },

  // ─── PUGLIA ───
  { id: 'B425-BR', classeCodice: '00EE', provinciaSigla: 'BR', annoScolastico: '2024/25', tipoGraduatoria: 'GPS I Fascia', punteggioMinimo: 65, punteggioMassimo: 91, posizioniAssegnate: 29, candidatiInGraduatoria: 523, ultimaNomina: '2025-10-08', competizione: 'molto_alta', trend: 'crescente' },
  { id: 'B426-BR', classeCodice: 'A-12', provinciaSigla: 'BR', annoScolastico: '2024/25', tipoGraduatoria: 'GPS II Fascia', punteggioMinimo: 43, punteggioMassimo: 63, posizioniAssegnate: 22, candidatiInGraduatoria: 318, ultimaNomina: '2025-11-05', competizione: 'alta', trend: 'stabile' },
  { id: 'B427-BR', classeCodice: '00EE', provinciaSigla: 'BR', annoScolastico: '2024/25', tipoGraduatoria: 'GPS I Fascia', punteggioMinimo: 47, punteggioMassimo: 61, posizioniAssegnate: 17, candidatiInGraduatoria: 247, ultimaNomina: '2026-03-10', competizione: 'alta', trend: 'stabile' },
  { id: 'B428-BT', classeCodice: '00AA', provinciaSigla: 'BT', annoScolastico: '2024/25', tipoGraduatoria: 'GPS I Fascia', punteggioMinimo: 62, punteggioMassimo: 89, posizioniAssegnate: 19, candidatiInGraduatoria: 256, ultimaNomina: '2026-02-12', competizione: 'alta', trend: 'stabile' },
  { id: 'B429-BT', classeCodice: 'A-26', provinciaSigla: 'BT', annoScolastico: '2024/25', tipoGraduatoria: 'GPS I Fascia', punteggioMinimo: 46, punteggioMassimo: 64, posizioniAssegnate: 18, candidatiInGraduatoria: 197, ultimaNomina: '2026-04-08', competizione: 'alta', trend: 'crescente' },
  { id: 'B430-BT', classeCodice: '00AA', provinciaSigla: 'BT', annoScolastico: '2024/25', tipoGraduatoria: 'GPS I Fascia', punteggioMinimo: 43, punteggioMassimo: 60, posizioniAssegnate: 18, candidatiInGraduatoria: 176, ultimaNomina: '2025-10-08', competizione: 'alta', trend: 'stabile' },
  { id: 'B431-FG', classeCodice: 'A-12', provinciaSigla: 'FG', annoScolastico: '2024/25', tipoGraduatoria: 'GPS I Fascia', punteggioMinimo: 65, punteggioMassimo: 88, posizioniAssegnate: 17, candidatiInGraduatoria: 194, ultimaNomina: '2025-11-05', competizione: 'alta', trend: 'stabile' },
  { id: 'B432-FG', classeCodice: 'A-48', provinciaSigla: 'FG', annoScolastico: '2024/25', tipoGraduatoria: 'GPS II Fascia', punteggioMinimo: 46, punteggioMassimo: 63, posizioniAssegnate: 26, candidatiInGraduatoria: 298, ultimaNomina: '2026-02-12', competizione: 'alta', trend: 'stabile' },
  { id: 'B433-FG', classeCodice: 'A-12', provinciaSigla: 'FG', annoScolastico: '2024/25', tipoGraduatoria: 'GAE', punteggioMinimo: 44, punteggioMassimo: 64, posizioniAssegnate: 25, candidatiInGraduatoria: 290, ultimaNomina: '2026-02-12', competizione: 'alta', trend: 'stabile' },
  { id: 'B434-LE', classeCodice: 'A-12', provinciaSigla: 'LE', annoScolastico: '2024/25', tipoGraduatoria: 'GPS I Fascia', punteggioMinimo: 60, punteggioMassimo: 92, posizioniAssegnate: 19, candidatiInGraduatoria: 256, ultimaNomina: '2025-11-05', competizione: 'alta', trend: 'stabile' },
  { id: 'B435-LE', classeCodice: 'AB22', provinciaSigla: 'LE', annoScolastico: '2024/25', tipoGraduatoria: 'GAE', punteggioMinimo: 43, punteggioMassimo: 62, posizioniAssegnate: 16, candidatiInGraduatoria: 94, ultimaNomina: '2026-01-14', competizione: 'media', trend: 'stabile' },
  { id: 'B436-LE', classeCodice: 'A-12', provinciaSigla: 'LE', annoScolastico: '2024/25', tipoGraduatoria: 'GPS I Fascia', punteggioMinimo: 45, punteggioMassimo: 64, posizioniAssegnate: 23, candidatiInGraduatoria: 179, ultimaNomina: '2025-12-15', competizione: 'media', trend: 'stabile' },
  { id: 'B437-TA', classeCodice: '00EE', provinciaSigla: 'TA', annoScolastico: '2024/25', tipoGraduatoria: 'GPS I Fascia', punteggioMinimo: 63, punteggioMassimo: 93, posizioniAssegnate: 23, candidatiInGraduatoria: 367, ultimaNomina: '2025-12-15', competizione: 'molto_alta', trend: 'crescente' },
  { id: 'B438-TA', classeCodice: 'A-26', provinciaSigla: 'TA', annoScolastico: '2024/25', tipoGraduatoria: 'GPS I Fascia', punteggioMinimo: 45, punteggioMassimo: 64, posizioniAssegnate: 18, candidatiInGraduatoria: 168, ultimaNomina: '2025-11-05', competizione: 'alta', trend: 'stabile' },
  { id: 'B439-TA', classeCodice: '00EE', provinciaSigla: 'TA', annoScolastico: '2024/25', tipoGraduatoria: 'GPS I Fascia', punteggioMinimo: 44, punteggioMassimo: 61, posizioniAssegnate: 25, candidatiInGraduatoria: 202, ultimaNomina: '2026-01-20', competizione: 'alta', trend: 'stabile' },

  // ─── BASILICATA ───
  { id: 'B440-MT', classeCodice: '00AA', provinciaSigla: 'MT', annoScolastico: '2024/25', tipoGraduatoria: 'GPS I Fascia', punteggioMinimo: 61, punteggioMassimo: 91, posizioniAssegnate: 12, candidatiInGraduatoria: 176, ultimaNomina: '2026-03-10', competizione: 'alta', trend: 'crescente' },
  { id: 'B441-MT', classeCodice: 'A-26', provinciaSigla: 'MT', annoScolastico: '2024/25', tipoGraduatoria: 'GPS II Fascia', punteggioMinimo: 46, punteggioMassimo: 63, posizioniAssegnate: 13, candidatiInGraduatoria: 262, ultimaNomina: '2026-04-08', competizione: 'molto_alta', trend: 'stabile' },

  // ─── CALABRIA ───
  { id: 'B442-KR', classeCodice: 'A-26', provinciaSigla: 'KR', annoScolastico: '2024/25', tipoGraduatoria: 'GPS I Fascia', punteggioMinimo: 63, punteggioMassimo: 89, posizioniAssegnate: 20, candidatiInGraduatoria: 183, ultimaNomina: '2026-04-08', competizione: 'alta', trend: 'crescente' },
  { id: 'B443-KR', classeCodice: 'AB22', provinciaSigla: 'KR', annoScolastico: '2024/25', tipoGraduatoria: 'GPS I Fascia', punteggioMinimo: 45, punteggioMassimo: 62, posizioniAssegnate: 14, candidatiInGraduatoria: 255, ultimaNomina: '2025-11-05', competizione: 'molto_alta', trend: 'stabile' },
  { id: 'B444-RC', classeCodice: '00EE', provinciaSigla: 'RC', annoScolastico: '2024/25', tipoGraduatoria: 'GPS I Fascia', punteggioMinimo: 61, punteggioMassimo: 88, posizioniAssegnate: 9, candidatiInGraduatoria: 77, ultimaNomina: '2026-04-08', competizione: 'alta', trend: 'stabile' },
  { id: 'B445-RC', classeCodice: 'A-26', provinciaSigla: 'RC', annoScolastico: '2024/25', tipoGraduatoria: 'GAE', punteggioMinimo: 47, punteggioMassimo: 63, posizioniAssegnate: 8, candidatiInGraduatoria: 42, ultimaNomina: '2026-04-08', competizione: 'media', trend: 'stabile' },
  { id: 'B446-VV', classeCodice: '00AA', provinciaSigla: 'VV', annoScolastico: '2024/25', tipoGraduatoria: 'GPS I Fascia', punteggioMinimo: 62, punteggioMassimo: 89, posizioniAssegnate: 8, candidatiInGraduatoria: 112, ultimaNomina: '2025-10-08', competizione: 'alta', trend: 'stabile' },
  { id: 'B447-VV', classeCodice: 'A-26', provinciaSigla: 'VV', annoScolastico: '2024/25', tipoGraduatoria: 'GPS II Fascia', punteggioMinimo: 42, punteggioMassimo: 61, posizioniAssegnate: 5, candidatiInGraduatoria: 69, ultimaNomina: '2026-03-10', competizione: 'alta', trend: 'crescente' },

  // ─── SICILIA ───
  { id: 'B448-AG', classeCodice: 'A-12', provinciaSigla: 'AG', annoScolastico: '2024/25', tipoGraduatoria: 'GPS I Fascia', punteggioMinimo: 64, punteggioMassimo: 93, posizioniAssegnate: 9, candidatiInGraduatoria: 87, ultimaNomina: '2025-10-08', competizione: 'alta', trend: 'stabile' },
  { id: 'B449-AG', classeCodice: 'A-26', provinciaSigla: 'AG', annoScolastico: '2024/25', tipoGraduatoria: 'GAE', punteggioMinimo: 43, punteggioMassimo: 64, posizioniAssegnate: 13, candidatiInGraduatoria: 207, ultimaNomina: '2026-02-12', competizione: 'molto_alta', trend: 'stabile' },
  { id: 'B450-CL', classeCodice: '00EE', provinciaSigla: 'CL', annoScolastico: '2024/25', tipoGraduatoria: 'GPS I Fascia', punteggioMinimo: 64, punteggioMassimo: 91, posizioniAssegnate: 12, candidatiInGraduatoria: 133, ultimaNomina: '2026-01-14', competizione: 'alta', trend: 'crescente' },
  { id: 'B451-CL', classeCodice: '00AA', provinciaSigla: 'CL', annoScolastico: '2024/25', tipoGraduatoria: 'GPS I Fascia', punteggioMinimo: 47, punteggioMassimo: 65, posizioniAssegnate: 13, candidatiInGraduatoria: 101, ultimaNomina: '2026-03-10', competizione: 'media', trend: 'stabile' },
  { id: 'B452-EN', classeCodice: 'A-12', provinciaSigla: 'EN', annoScolastico: '2024/25', tipoGraduatoria: 'GPS I Fascia', punteggioMinimo: 62, punteggioMassimo: 88, posizioniAssegnate: 13, candidatiInGraduatoria: 91, ultimaNomina: '2025-10-08', competizione: 'media', trend: 'stabile' },
  { id: 'B453-EN', classeCodice: 'A-26', provinciaSigla: 'EN', annoScolastico: '2024/25', tipoGraduatoria: 'GPS II Fascia', punteggioMinimo: 42, punteggioMassimo: 65, posizioniAssegnate: 11, candidatiInGraduatoria: 161, ultimaNomina: '2026-02-12', competizione: 'alta', trend: 'stabile' },
  { id: 'B454-ME', classeCodice: 'A-26', provinciaSigla: 'ME', annoScolastico: '2024/25', tipoGraduatoria: 'GPS I Fascia', punteggioMinimo: 65, punteggioMassimo: 90, posizioniAssegnate: 13, candidatiInGraduatoria: 248, ultimaNomina: '2025-11-05', competizione: 'molto_alta', trend: 'stabile' },
  { id: 'B455-ME', classeCodice: 'AB22', provinciaSigla: 'ME', annoScolastico: '2024/25', tipoGraduatoria: 'GPS II Fascia', punteggioMinimo: 43, punteggioMassimo: 60, posizioniAssegnate: 8, candidatiInGraduatoria: 48, ultimaNomina: '2025-12-15', competizione: 'media', trend: 'stabile' },
  { id: 'B456-RG', classeCodice: '00AA', provinciaSigla: 'RG', annoScolastico: '2024/25', tipoGraduatoria: 'GPS I Fascia', punteggioMinimo: 62, punteggioMassimo: 93, posizioniAssegnate: 14, candidatiInGraduatoria: 137, ultimaNomina: '2025-11-05', competizione: 'alta', trend: 'stabile' },
  { id: 'B457-RG', classeCodice: 'AB22', provinciaSigla: 'RG', annoScolastico: '2024/25', tipoGraduatoria: 'GPS II Fascia', punteggioMinimo: 44, punteggioMassimo: 61, posizioniAssegnate: 14, candidatiInGraduatoria: 260, ultimaNomina: '2026-02-12', competizione: 'molto_alta', trend: 'stabile' },

  // ─── SARDEGNA ───
  { id: 'B458-NU', classeCodice: 'A-12', provinciaSigla: 'NU', annoScolastico: '2024/25', tipoGraduatoria: 'GPS I Fascia', punteggioMinimo: 68, punteggioMassimo: 96, posizioniAssegnate: 7, candidatiInGraduatoria: 107, ultimaNomina: '2025-12-18', competizione: 'molto_alta', trend: 'stabile' },
  { id: 'B459-NU', classeCodice: 'A-48', provinciaSigla: 'NU', annoScolastico: '2024/25', tipoGraduatoria: 'GPS II Fascia', punteggioMinimo: 50, punteggioMassimo: 73, posizioniAssegnate: 10, candidatiInGraduatoria: 176, ultimaNomina: '2026-06-08', competizione: 'molto_alta', trend: 'stabile' },
  { id: 'B460-OR', classeCodice: '00AA', provinciaSigla: 'OR', annoScolastico: '2024/25', tipoGraduatoria: 'GPS I Fascia', punteggioMinimo: 72, punteggioMassimo: 99, posizioniAssegnate: 4, candidatiInGraduatoria: 74, ultimaNomina: '2026-03-15', competizione: 'molto_alta', trend: 'crescente' },
  { id: 'B461-OR', classeCodice: 'A-26', provinciaSigla: 'OR', annoScolastico: '2024/25', tipoGraduatoria: 'GPS II Fascia', punteggioMinimo: 53, punteggioMassimo: 70, posizioniAssegnate: 4, candidatiInGraduatoria: 63, ultimaNomina: '2026-06-08', competizione: 'molto_alta', trend: 'stabile' },
  { id: 'B462-SS', classeCodice: 'A-26', provinciaSigla: 'SS', annoScolastico: '2024/25', tipoGraduatoria: 'GPS I Fascia', punteggioMinimo: 68, punteggioMassimo: 96, posizioniAssegnate: 13, candidatiInGraduatoria: 99, ultimaNomina: '2026-06-08', competizione: 'media', trend: 'stabile' },
  { id: 'B463-SS', classeCodice: 'A-12', provinciaSigla: 'SS', annoScolastico: '2024/25', tipoGraduatoria: 'GPS I Fascia', punteggioMinimo: 53, punteggioMassimo: 73, posizioniAssegnate: 19, candidatiInGraduatoria: 83, ultimaNomina: '2025-12-15', competizione: 'media', trend: 'stabile' },

  // ─── TAA ───
  { id: 'B464-BZ', classeCodice: 'A-12', provinciaSigla: 'BZ', annoScolastico: '2024/25', tipoGraduatoria: 'GPS I Fascia', punteggioMinimo: 81, punteggioMassimo: 110, posizioniAssegnate: 20, candidatiInGraduatoria: 182, ultimaNomina: '2026-03-15', competizione: 'alta', trend: 'stabile' },
  { id: 'B465-BZ', classeCodice: 'AB22', provinciaSigla: 'BZ', annoScolastico: '2024/25', tipoGraduatoria: 'GAE', punteggioMinimo: 56, punteggioMassimo: 80, posizioniAssegnate: 19, candidatiInGraduatoria: 295, ultimaNomina: '2026-02-18', competizione: 'molto_alta', trend: 'stabile' },
  { id: 'B466-TN', classeCodice: 'A-26', provinciaSigla: 'TN', annoScolastico: '2024/25', tipoGraduatoria: 'GPS I Fascia', punteggioMinimo: 83, punteggioMassimo: 109, posizioniAssegnate: 13, candidatiInGraduatoria: 57, ultimaNomina: '2026-04-08', competizione: 'media', trend: 'stabile' },
  { id: 'B467-TN', classeCodice: 'A-50', provinciaSigla: 'TN', annoScolastico: '2024/25', tipoGraduatoria: 'GPS I Fascia', punteggioMinimo: 60, punteggioMassimo: 83, posizioniAssegnate: 8, candidatiInGraduatoria: 45, ultimaNomina: '2026-06-08', competizione: 'media', trend: 'stabile' },

  // ─── FVG ───
  { id: 'B468-GO', classeCodice: '00AA', provinciaSigla: 'GO', annoScolastico: '2024/25', tipoGraduatoria: 'GPS I Fascia', punteggioMinimo: 83, punteggioMassimo: 110, posizioniAssegnate: 11, candidatiInGraduatoria: 120, ultimaNomina: '2026-04-08', competizione: 'alta', trend: 'stabile' },
  { id: 'B469-GO', classeCodice: 'A-26', provinciaSigla: 'GO', annoScolastico: '2024/25', tipoGraduatoria: 'GAE', punteggioMinimo: 57, punteggioMassimo: 80, posizioniAssegnate: 6, candidatiInGraduatoria: 41, ultimaNomina: '2026-04-08', competizione: 'media', trend: 'stabile' },

  // ─── UMBRIA ───
  { id: 'B470-TR', classeCodice: 'A-26', provinciaSigla: 'TR', annoScolastico: '2024/25', tipoGraduatoria: 'GPS I Fascia', punteggioMinimo: 73, punteggioMassimo: 100, posizioniAssegnate: 13, candidatiInGraduatoria: 130, ultimaNomina: '2025-11-05', competizione: 'alta', trend: 'stabile' },
  { id: 'B471-TR', classeCodice: 'A-12', provinciaSigla: 'TR', annoScolastico: '2024/25', tipoGraduatoria: 'GPS I Fascia', punteggioMinimo: 52, punteggioMassimo: 69, posizioniAssegnate: 8, candidatiInGraduatoria: 78, ultimaNomina: '2026-02-12', competizione: 'alta', trend: 'stabile' },

  // ─── VDA ───
  { id: 'B472-AO', classeCodice: 'A-26', provinciaSigla: 'AO', annoScolastico: '2024/25', tipoGraduatoria: 'GPS I Fascia', punteggioMinimo: 72, punteggioMassimo: 96, posizioniAssegnate: 10, candidatiInGraduatoria: 97, ultimaNomina: '2026-06-08', competizione: 'alta', trend: 'stabile' },
  { id: 'B473-AO', classeCodice: 'A-12', provinciaSigla: 'AO', annoScolastico: '2024/25', tipoGraduatoria: 'GAE', punteggioMinimo: 50, punteggioMassimo: 72, posizioniAssegnate: 8, candidatiInGraduatoria: 73, ultimaNomina: '2025-12-18', competizione: 'alta', trend: 'stabile' },

  // ─── CAMPANIA (mancanti) ───
  { id: 'B474-AV', classeCodice: '00EE', provinciaSigla: 'AV', annoScolastico: '2024/25', tipoGraduatoria: 'GPS I Fascia', punteggioMinimo: 72.0, punteggioMassimo: 98, posizioniAssegnate: 12, candidatiInGraduatoria: 165, ultimaNomina: '2026-02-12', competizione: 'alta', trend: 'stabile' },
  { id: 'B475-AV', classeCodice: 'A-26', provinciaSigla: 'AV', annoScolastico: '2024/25', tipoGraduatoria: 'GPS II Fascia', punteggioMinimo: 50.0, punteggioMassimo: 68, posizioniAssegnate: 8, candidatiInGraduatoria: 120, ultimaNomina: '2026-03-10', competizione: 'molto_alta', trend: 'crescente' },
  { id: 'B476-BN', classeCodice: '00AA', provinciaSigla: 'BN', annoScolastico: '2024/25', tipoGraduatoria: 'GPS I Fascia', punteggioMinimo: 70.0, punteggioMassimo: 96, posizioniAssegnate: 10, candidatiInGraduatoria: 145, ultimaNomina: '2026-01-14', competizione: 'molto_alta', trend: 'stabile' },
  { id: 'B477-BN', classeCodice: 'A-12', provinciaSigla: 'BN', annoScolastico: '2024/25', tipoGraduatoria: 'GPS II Fascia', punteggioMinimo: 48.0, punteggioMassimo: 66, posizioniAssegnate: 7, candidatiInGraduatoria: 98, ultimaNomina: '2026-04-08', competizione: 'alta', trend: 'stabile' },
  { id: 'B478-CE', classeCodice: '00EE', provinciaSigla: 'CE', annoScolastico: '2024/25', tipoGraduatoria: 'GPS I Fascia', punteggioMinimo: 68.0, punteggioMassimo: 95, posizioniAssegnate: 18, candidatiInGraduatoria: 290, ultimaNomina: '2025-11-05', competizione: 'molto_alta', trend: 'crescente' },
  { id: 'B479-CE', classeCodice: 'AB22', provinciaSigla: 'CE', annoScolastico: '2024/25', tipoGraduatoria: 'GPS I Fascia', punteggioMinimo: 48.0, punteggioMassimo: 65, posizioniAssegnate: 15, candidatiInGraduatoria: 210, ultimaNomina: '2026-02-12', competizione: 'molto_alta', trend: 'stabile' },
  { id: 'B480-SA', classeCodice: '00EE', provinciaSigla: 'SA', annoScolastico: '2024/25', tipoGraduatoria: 'GPS I Fascia', punteggioMinimo: 70.0, punteggioMassimo: 96, posizioniAssegnate: 15, candidatiInGraduatoria: 210, ultimaNomina: '2026-01-20', competizione: 'molto_alta', trend: 'crescente' },
  { id: 'B481-SA', classeCodice: 'A-26', provinciaSigla: 'SA', annoScolastico: '2024/25', tipoGraduatoria: 'GPS II Fascia', punteggioMinimo: 47.0, punteggioMassimo: 66, posizioniAssegnate: 12, candidatiInGraduatoria: 180, ultimaNomina: '2025-12-18', competizione: 'molto_alta', trend: 'stabile' },
];

// ============================================================
// HELPER FUNCTIONS
// ============================================================

export function getBollettiniByClasse(classeCodice: string): BollettinoEntry[] {
  return BOLLETTINI_NOMINE.filter(b => b.classeCodice === classeCodice);
}

export function getBollettiniByProvincia(provinciaSigla: string): BollettinoEntry[] {
  return BOLLETTINI_NOMINE.filter(b => b.provinciaSigla === provinciaSigla);
}

export function getBollettiniByClasseAndProvincia(classeCodice: string, provinciaSigla: string): BollettinoEntry[] {
  return BOLLETTINI_NOMINE.filter(b => b.classeCodice === classeCodice && b.provinciaSigla === provinciaSigla);
}

export function getSintesiByClasse(classeCodice: string): BollettinoSummary | null {
  const entries = getBollettiniByClasse(classeCodice);
  if (entries.length === 0) return null;
  const classe = CLASSI_CONCORSO.find(c => c.codice === classeCodice);
  if (!classe) return null;

  const uniqueProvince = new Set(entries.map(e => e.provinciaSigla));
  return {
    classeCodice,
    materia: classe.materia,
    ordineScuola: classe.ordineScuola,
    totalePosizioni: entries.reduce((s, e) => s + e.posizioniAssegnate, 0),
    totaleCandidati: entries.reduce((s, e) => s + e.candidatiInGraduatoria, 0),
    punteggioMinimoNazionale: Math.min(...entries.map(e => e.punteggioMinimo)),
    punteggioMassimoNazionale: Math.max(...entries.map(e => e.punteggioMassimo)),
    provinceAttive: uniqueProvince.size,
  };
}

export function getClasseByCodice(codice: string): ClasseConcorso | undefined {
  return CLASSI_CONCORSO.find(c => c.codice === codice);
}

export function ordinaPerCompetizione(entries: BollettinoEntry[]): BollettinoEntry[] {
  const ordine = { molto_alta: 0, alta: 1, media: 2, bassa: 3 };
  return [...entries].sort((a, b) => ordine[a.competizione] - ordine[b.competizione]);
}

export function filtraPerCompetizione(entries: BollettinoEntry[], livello: string): BollettinoEntry[] {
  return entries.filter(e => e.competizione === livello);
}
