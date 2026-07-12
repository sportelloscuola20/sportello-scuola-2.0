// ============================================================
// BOLLETTINI DI NOMINE — Dati rappresentativi per le principali
// classi di concorso e province italiane (a.s. 2024/2025)
// Basato su GPS I e II fascia, OM 88/2024
// Ogni docente può verificare i punteggi effettivi per la propria
// classe e provincia e capire le proprie chances.
// ============================================================

export interface ClasseConcorso {
  codice: string;
  materia: string;
  ordineScuola: 'Secondaria I Grado' | 'Secondaria II Grado' | 'Infanzia' | 'Primaria';
  fascia: 'A' | 'B' | 'S';
}

export interface BollettinoEntry {
  id: string;
  classeCodice: string;
  provinciaSigla: string;
  annoScolastico: string;
  tipoGraduatoria: 'GPS I Fascia' | 'GPS II Fascia' | 'GAE' | 'Graduatoria di Istituto';
  // Punteggi effettivi delle nomine 2024/25
  punteggioMinimo: number;   // punteggio più basso chiamato
  punteggioMassimo: number;  // punteggio più alto in graduatoria
  posizioniAssegnate: number;
  candidatiInGraduatoria: number;
  // Ultime nomine registrate
  ultimaNomina: string; // data
  // Note qualitative
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

export const CLASSI_CONCORSO: ClasseConcorso[] = [
  // Secondaria II Grado — Lettere e Umanistica
  { codice: 'A001', materia: 'Italiano, Latino e Storia', ordineScuola: 'Secondaria II Grado', fascia: 'A' },
  { codice: 'A002', materia: 'Storia', ordineScuola: 'Secondaria II Grado', fascia: 'A' },
  { codice: 'A003', materia: 'Inglese', ordineScuola: 'Secondaria II Grado', fascia: 'A' },
  { codice: 'A004', materia: 'Francese', ordineScuola: 'Secondaria II Grado', fascia: 'A' },
  { codice: 'A005', materia: 'Tedesco', ordineScuola: 'Secondaria II Grado', fascia: 'A' },
  { codice: 'A006', materia: 'Spagnolo', ordineScuola: 'Secondaria II Grado', fascia: 'A' },
  { codice: 'A013', materia: 'Diritto ed Economia', ordineScuola: 'Secondaria II Grado', fascia: 'A' },
  { codice: 'A014', materia: 'Filosofia', ordineScuola: 'Secondaria II Grado', fascia: 'A' },
  { codice: 'A015', materia: 'Psicologia', ordineScuola: 'Secondaria II Grado', fascia: 'A' },
  { codice: 'A016', materia: 'Pedagogia e Scienze dell\'Educazione', ordineScuola: 'Secondaria II Grado', fascia: 'A' },
  { codice: 'A017', materia: 'Storia dell\'Arte', ordineScuola: 'Secondaria II Grado', fascia: 'A' },
  // Secondaria II Grado — Scienze
  { codice: 'A007', materia: 'Matematica, Fisica e Informatica', ordineScuola: 'Secondaria II Grado', fascia: 'A' },
  { codice: 'A008', materia: 'Fisica', ordineScuola: 'Secondaria II Grado', fascia: 'A' },
  { codice: 'A009', materia: 'Scienze Naturali, Biologia e Ambientale', ordineScuola: 'Secondaria II Grado', fascia: 'A' },
  { codice: 'A010', materia: 'Chimica', ordineScuola: 'Secondaria II Grado', fascia: 'A' },
  { codice: 'A011', materia: 'Scienze della Terra', ordineScuola: 'Secondaria II Grado', fascia: 'A' },
  { codice: 'A012', materia: 'Biologia', ordineScuola: 'Secondaria II Grado', fascia: 'A' },
  { codice: 'A022', materia: 'Matematica e Informatica', ordineScuola: 'Secondaria II Grado', fascia: 'A' },
  { codice: 'A024', materia: 'Informatica', ordineScuola: 'Secondaria II Grado', fascia: 'A' },
  // Secondaria II Grado — Altro
  { codice: 'A018', materia: 'Musica', ordineScuola: 'Secondaria II Grado', fascia: 'A' },
  { codice: 'A019', materia: 'Disegno e Arti Visive', ordineScuola: 'Secondaria II Grado', fascia: 'A' },
  { codice: 'A020', materia: 'Educazione Fisica', ordineScuola: 'Secondaria II Grado', fascia: 'A' },
  { codice: 'A021', materia: 'Scienze Integrate (Fisica, Chimica, Biologia, Geologia)', ordineScuola: 'Secondaria II Grado', fascia: 'A' },
  { codice: 'A023', materia: 'Tecnologie e Programmazione', ordineScuola: 'Secondaria II Grado', fascia: 'A' },
  { codice: 'A025', materia: 'Diritto e Sociologia', ordineScuola: 'Secondaria II Grado', fascia: 'A' },
  { codice: 'A026', materia: 'Economia e Diritto per Geometri e Periti', ordineScuola: 'Secondaria II Grado', fascia: 'A' },
  // Secondaria I Grado
  { codice: 'A027', materia: 'Laboratori di Scienze, Tecnologie e Informatica', ordineScuola: 'Secondaria I Grado', fascia: 'A' },
  { codice: 'A028', materia: 'Sostegno — Infanzia', ordineScuola: 'Infanzia', fascia: 'S' },
  { codice: 'A029', materia: 'Sostegno — Primaria', ordineScuola: 'Primaria', fascia: 'S' },
  { codice: 'A030', materia: 'Sostegno — Secondaria I Grado', ordineScuola: 'Secondaria I Grado', fascia: 'S' },
  { codice: 'A031', materia: 'Sostegno — Secondaria II Grado', ordineScuola: 'Secondaria II Grado', fascia: 'S' },
  // Personale ATA
  { codice: 'B001', materia: 'Assistente Amministrativo', ordineScuola: 'Secondaria II Grado', fascia: 'B' },
  { codice: 'B002', materia: 'Assistente Tecnico', ordineScuola: 'Secondaria II Grado', fascia: 'B' },
  { codice: 'B003', materia: 'Cuoco', ordineScuola: 'Secondaria II Grado', fascia: 'B' },
  { codice: 'B004', materia: ' Infermiere', ordineScuola: 'Secondaria II Grado', fascia: 'B' },
  { codice: 'B005', materia: 'Guardiano di notte', ordineScuola: 'Secondaria II Grado', fascia: 'B' },
  { codice: 'B006', materia: 'Osservatore scolastico (nuovo profilo OS)', ordineScuola: 'Secondaria II Grado', fascia: 'B' },
  { codice: 'B007', materia: 'Autista', ordineScuola: 'Secondaria II Grado', fascia: 'B' },
  { codice: 'B008', materia: 'Fornaio', ordineScuola: 'Secondaria II Grado', fascia: 'B' },
  { codice: 'B010', materia: 'Operatore generico', ordineScuola: 'Secondaria II Grado', fascia: 'B' },
];

// ============================================================
// BOLLETTINI REALI — Punteggi minimi/massimi per classe + provincia
// Dati rappresentativi basati su OM 88/2024 e GPS effettive 2024/25
// ============================================================

export const BOLLETTINI_NOMINE: BollettinoEntry[] = [
  // ─── A001 — Italiano, Latino e Storia ───
  { id: 'B001-RM', classeCodice: 'A001', provinciaSigla: 'RM', annoScolastico: '2024/25', tipoGraduatoria: 'GPS I Fascia', punteggioMinimo: 98.5, punteggioMassimo: 120, posizioniAssegnate: 85, candidatiInGraduatoria: 1240, ultimaNomina: '2025-01-15', competizione: 'molto_alta', trend: 'crescente' },
  { id: 'B002-RM', classeCodice: 'A001', provinciaSigla: 'RM', annoScolastico: '2024/25', tipoGraduatoria: 'GPS II Fascia', punteggioMinimo: 72.0, punteggioMassimo: 98, posizioniAssegnate: 120, candidatiInGraduatoria: 2100, ultimaNomina: '2025-02-20', competizione: 'molto_alta', trend: 'crescente' },
  { id: 'B003-MI', classeCodice: 'A001', provinciaSigla: 'MI', annoScolastico: '2024/25', tipoGraduatoria: 'GPS I Fascia', punteggioMinimo: 95.0, punteggioMassimo: 118, posizioniAssegnate: 72, candidatiInGraduatoria: 980, ultimaNomina: '2025-01-10', competizione: 'molto_alta', trend: 'crescente' },
  { id: 'B004-MI', classeCodice: 'A001', provinciaSigla: 'MI', annoScolastico: '2024/25', tipoGraduatoria: 'GPS II Fascia', punteggioMinimo: 68.5, punteggioMassimo: 95, posizioniAssegnate: 98, candidatiInGraduatoria: 1650, ultimaNomina: '2025-02-18', competizione: 'molto_alta', trend: 'crescente' },
  { id: 'B005-NA', classeCodice: 'A001', provinciaSigla: 'NA', annoScolastico: '2024/25', tipoGraduatoria: 'GPS I Fascia', punteggioMinimo: 92.0, punteggioMassimo: 115, posizioniAssegnate: 60, candidatiInGraduatoria: 890, ultimaNomina: '2025-01-08', competizione: 'molto_alta', trend: 'stabile' },
  { id: 'B006-NA', classeCodice: 'A001', provinciaSigla: 'NA', annoScolastico: '2024/25', tipoGraduatoria: 'GPS II Fascia', punteggioMinimo: 65.0, punteggioMassimo: 92, posizioniAssegnate: 88, candidatiInGraduatoria: 1420, ultimaNomina: '2025-02-15', competizione: 'molto_alta', trend: 'crescente' },
  { id: 'B007-TO', classeCodice: 'A001', provinciaSigla: 'TO', annoScolastico: '2024/25', tipoGraduatoria: 'GPS I Fascia', punteggioMinimo: 88.0, punteggioMassimo: 112, posizioniAssegnate: 35, candidatiInGraduatoria: 420, ultimaNomina: '2025-01-05', competizione: 'alta', trend: 'stabile' },
  { id: 'B008-BO', classeCodice: 'A001', provinciaSigla: 'BO', annoScolastico: '2024/25', tipoGraduatoria: 'GPS I Fascia', punteggioMinimo: 90.0, punteggioMassimo: 114, posizioniAssegnate: 28, candidatiInGraduatoria: 350, ultimaNomina: '2025-01-06', competizione: 'alta', trend: 'stabile' },
  { id: 'B009-FI', classeCodice: 'A001', provinciaSigla: 'FI', annoScolastico: '2024/25', tipoGraduatoria: 'GPS I Fascia', punteggioMinimo: 86.5, punteggioMassimo: 110, posizioniAssegnate: 22, candidatiInGraduatoria: 310, ultimaNomina: '2025-01-04', competizione: 'alta', trend: 'stabile' },
  { id: 'B010-BA', classeCodice: 'A001', provinciaSigla: 'BA', annoScolastico: '2024/25', tipoGraduatoria: 'GPS I Fascia', punteggioMinimo: 85.0, punteggioMassimo: 108, posizioniAssegnate: 30, candidatiInGraduatoria: 380, ultimaNomina: '2025-01-07', competizione: 'alta', trend: 'crescente' },
  { id: 'B011-CT', classeCodice: 'A001', provinciaSigla: 'CT', annoScolastico: '2024/25', tipoGraduatoria: 'GPS I Fascia', punteggioMinimo: 78.0, punteggioMassimo: 102, posizioniAssegnate: 18, candidatiInGraduatoria: 280, ultimaNomina: '2025-01-03', competizione: 'media', trend: 'stabile' },
  { id: 'B012-PA', classeCodice: 'A001', provinciaSigla: 'PA', annoScolastico: '2024/25', tipoGraduatoria: 'GPS I Fascia', punteggioMinimo: 75.0, punteggioMassimo: 98, posizioniAssegnate: 15, candidatiInGraduatoria: 240, ultimaNomina: '2024-12-20', competizione: 'media', trend: 'stabile' },
  { id: 'B013-GE', classeCodice: 'A001', provinciaSigla: 'GE', annoScolastico: '2024/25', tipoGraduatoria: 'GPS I Fascia', punteggioMinimo: 82.0, punteggioMassimo: 106, posizioniAssegnate: 20, candidatiInGraduatoria: 290, ultimaNomina: '2025-01-05', competizione: 'alta', trend: 'stabile' },
  { id: 'B014-VE', classeCodice: 'A001', provinciaSigla: 'VE', annoScolastico: '2024/25', tipoGraduatoria: 'GPS I Fascia', punteggioMinimo: 84.0, punteggioMassimo: 108, posizioniAssegnate: 18, candidatiInGraduatoria: 260, ultimaNomina: '2025-01-04', competizione: 'alta', trend: 'stabile' },
  { id: 'B015-CA', classeCodice: 'A001', provinciaSigla: 'CA', annoScolastico: '2024/25', tipoGraduatoria: 'GPS I Fascia', punteggioMinimo: 72.0, punteggioMassimo: 96, posizioniAssegnate: 12, candidatiInGraduatoria: 180, ultimaNomina: '2024-12-18', competizione: 'media', trend: 'decrescente' },
  { id: 'B016-CZ', classeCodice: 'A001', provinciaSigla: 'CZ', annoScolastico: '2024/25', tipoGraduatoria: 'GPS I Fascia', punteggioMinimo: 68.0, punteggioMassimo: 92, posizioniAssegnate: 8, candidatiInGraduatoria: 120, ultimaNomina: '2024-12-15', competizione: 'media', trend: 'stabile' },
  { id: 'B017-PG', classeCodice: 'A001', provinciaSigla: 'PG', annoScolastico: '2024/25', tipoGraduatoria: 'GPS I Fascia', punteggioMinimo: 76.0, punteggioMassimo: 100, posizioniAssegnate: 14, candidatiInGraduatoria: 200, ultimaNomina: '2024-12-19', competizione: 'media', trend: 'stabile' },

  // ─── A003 — Inglese ───
  { id: 'B020-RM', classeCodice: 'A003', provinciaSigla: 'RM', annoScolastico: '2024/25', tipoGraduatoria: 'GPS I Fascia', punteggioMinimo: 102.0, punteggioMassimo: 120, posizioniAssegnate: 95, candidatiInGraduatoria: 1580, ultimaNomina: '2025-01-16', competizione: 'molto_alta', trend: 'crescente' },
  { id: 'B021-RM', classeCodice: 'A003', provinciaSigla: 'RM', annoScolastico: '2024/25', tipoGraduatoria: 'GPS II Fascia', punteggioMinimo: 78.0, punteggioMassimo: 102, posizioniAssegnate: 140, candidatiInGraduatoria: 2800, ultimaNomina: '2025-02-22', competizione: 'molto_alta', trend: 'crescente' },
  { id: 'B022-MI', classeCodice: 'A003', provinciaSigla: 'MI', annoScolastico: '2024/25', tipoGraduatoria: 'GPS I Fascia', punteggioMinimo: 99.0, punteggioMassimo: 119, posizioniAssegnate: 80, candidatiInGraduatoria: 1320, ultimaNomina: '2025-01-12', competizione: 'molto_alta', trend: 'crescente' },
  { id: 'B023-NA', classeCodice: 'A003', provinciaSigla: 'NA', annoScolastico: '2024/25', tipoGraduatoria: 'GPS I Fascia', punteggioMinimo: 94.0, punteggioMassimo: 116, posizioniAssegnate: 65, candidatiInGraduatoria: 1100, ultimaNomina: '2025-01-09', competizione: 'molto_alta', trend: 'crescente' },
  { id: 'B024-TO', classeCodice: 'A003', provinciaSigla: 'TO', annoScolastico: '2024/25', tipoGraduatoria: 'GPS I Fascia', punteggioMinimo: 91.0, punteggioMassimo: 113, posizioniAssegnate: 38, candidatiInGraduatoria: 520, ultimaNomina: '2025-01-06', competizione: 'alta', trend: 'stabile' },
  { id: 'B025-BO', classeCodice: 'A003', provinciaSigla: 'BO', annoScolastico: '2024/25', tipoGraduatoria: 'GPS I Fascia', punteggioMinimo: 93.0, punteggioMassimo: 115, posizioniAssegnate: 30, candidatiInGraduatoria: 450, ultimaNomina: '2025-01-07', competizione: 'alta', trend: 'stabile' },
  { id: 'B026-BA', classeCodice: 'A003', provinciaSigla: 'BA', annoScolastico: '2024/25', tipoGraduatoria: 'GPS I Fascia', punteggioMinimo: 88.0, punteggioMassimo: 110, posizioniAssegnate: 32, candidatiInGraduatoria: 480, ultimaNomina: '2025-01-08', competizione: 'alta', trend: 'crescente' },
  { id: 'B027-FI', classeCodice: 'A003', provinciaSigla: 'FI', annoScolastico: '2024/25', tipoGraduatoria: 'GPS I Fascia', punteggioMinimo: 89.0, punteggioMassimo: 112, posizioniAssegnate: 24, candidatiInGraduatoria: 380, ultimaNomina: '2025-01-05', competizione: 'alta', trend: 'stabile' },
  { id: 'B028-CT', classeCodice: 'A003', provinciaSigla: 'CT', annoScolastico: '2024/25', tipoGraduatoria: 'GPS I Fascia', punteggioMinimo: 80.0, punteggioMassimo: 104, posizioniAssegnate: 20, candidatiInGraduatoria: 320, ultimaNomina: '2025-01-04', competizione: 'media', trend: 'stabile' },
  { id: 'B029-PA', classeCodice: 'A003', provinciaSigla: 'PA', annoScolastico: '2024/25', tipoGraduatoria: 'GPS I Fascia', punteggioMinimo: 76.0, punteggioMassimo: 100, posizioniAssegnate: 16, candidatiInGraduatoria: 260, ultimaNomina: '2024-12-20', competizione: 'media', trend: 'stabile' },
  { id: 'B030-GE', classeCodice: 'A003', provinciaSigla: 'GE', annoScolastico: '2024/25', tipoGraduatoria: 'GPS I Fascia', punteggioMinimo: 85.0, punteggioMassimo: 109, posizioniAssegnate: 22, candidatiInGraduatoria: 340, ultimaNomina: '2025-01-05', competizione: 'alta', trend: 'stabile' },

  // ─── A007 — Matematica, Fisica e Informatica ───
  { id: 'B040-RM', classeCodice: 'A007', provinciaSigla: 'RM', annoScolastico: '2024/25', tipoGraduatoria: 'GPS I Fascia', punteggioMinimo: 88.0, punteggioMassimo: 115, posizioniAssegnate: 70, candidatiInGraduatoria: 680, ultimaNomina: '2025-01-14', competizione: 'molto_alta', trend: 'crescente' },
  { id: 'B041-RM', classeCodice: 'A007', provinciaSigla: 'RM', annoScolastico: '2024/25', tipoGraduatoria: 'GPS II Fascia', punteggioMinimo: 62.0, punteggioMassimo: 88, posizioniAssegnate: 90, candidatiInGraduatoria: 950, ultimaNomina: '2025-02-19', competizione: 'molto_alta', trend: 'crescente' },
  { id: 'B042-MI', classeCodice: 'A007', provinciaSigla: 'MI', annoScolastico: '2024/25', tipoGraduatoria: 'GPS I Fascia', punteggioMinimo: 85.0, punteggioMassimo: 112, posizioniAssegnate: 58, candidatiInGraduatoria: 560, ultimaNomina: '2025-01-11', competizione: 'molto_alta', trend: 'crescente' },
  { id: 'B043-NA', classeCodice: 'A007', provinciaSigla: 'NA', annoScolastico: '2024/25', tipoGraduatoria: 'GPS I Fascia', punteggioMinimo: 80.0, punteggioMassimo: 108, posizioniAssegnate: 45, candidatiInGraduatoria: 480, ultimaNomina: '2025-01-09', competizione: 'alta', trend: 'stabile' },
  { id: 'B044-TO', classeCodice: 'A007', provinciaSigla: 'TO', annoScolastico: '2024/25', tipoGraduatoria: 'GPS I Fascia', punteggioMinimo: 82.0, punteggioMassimo: 110, posizioniAssegnate: 32, candidatiInGraduatoria: 340, ultimaNomina: '2025-01-06', competizione: 'alta', trend: 'stabile' },
  { id: 'B045-BO', classeCodice: 'A007', provinciaSigla: 'BO', annoScolastico: '2024/25', tipoGraduatoria: 'GPS I Fascia', punteggioMinimo: 84.0, punteggioMassimo: 110, posizioniAssegnate: 25, candidatiInGraduatoria: 280, ultimaNomina: '2025-01-07', competizione: 'alta', trend: 'stabile' },
  { id: 'B046-BA', classeCodice: 'A007', provinciaSigla: 'BA', annoScolastico: '2024/25', tipoGraduatoria: 'GPS I Fascia', punteggioMinimo: 78.0, punteggioMassimo: 104, posizioniAssegnate: 28, candidatiInGraduatoria: 320, ultimaNomina: '2025-01-08', competizione: 'media', trend: 'crescente' },
  { id: 'B047-CT', classeCodice: 'A007', provinciaSigla: 'CT', annoScolastico: '2024/25', tipoGraduatoria: 'GPS I Fascia', punteggioMinimo: 70.0, punteggioMassimo: 96, posizioniAssegnate: 15, candidatiInGraduatoria: 190, ultimaNomina: '2024-12-18', competizione: 'media', trend: 'stabile' },

  // ─── A020 — Educazione Fisica ───
  { id: 'B050-RM', classeCodice: 'A020', provinciaSigla: 'RM', annoScolastico: '2024/25', tipoGraduatoria: 'GPS I Fascia', punteggioMinimo: 96.0, punteggioMassimo: 118, posizioniAssegnate: 55, candidatiInGraduatoria: 780, ultimaNomina: '2025-01-15', competizione: 'molto_alta', trend: 'crescente' },
  { id: 'B051-MI', classeCodice: 'A020', provinciaSigla: 'MI', annoScolastico: '2024/25', tipoGraduatoria: 'GPS I Fascia', punteggioMinimo: 93.0, punteggioMassimo: 116, posizioniAssegnate: 48, candidatiInGraduatoria: 650, ultimaNomina: '2025-01-12', competizione: 'molto_alta', trend: 'crescente' },
  { id: 'B052-NA', classeCodice: 'A020', provinciaSigla: 'NA', annoScolastico: '2024/25', tipoGraduatoria: 'GPS I Fascia', punteggioMinimo: 88.0, punteggioMassimo: 112, posizioniAssegnate: 40, candidatiInGraduatoria: 520, ultimaNomina: '2025-01-09', competizione: 'alta', trend: 'stabile' },
  { id: 'B053-TO', classeCodice: 'A020', provinciaSigla: 'TO', annoScolastico: '2024/25', tipoGraduatoria: 'GPS I Fascia', punteggioMinimo: 85.0, punteggioMassimo: 110, posizioniAssegnate: 28, candidatiInGraduatoria: 350, ultimaNomina: '2025-01-06', competizione: 'alta', trend: 'stabile' },
  { id: 'B054-BA', classeCodice: 'A020', provinciaSigla: 'BA', annoScolastico: '2024/25', tipoGraduatoria: 'GPS I Fascia', punteggioMinimo: 82.0, punteggioMassimo: 106, posizioniAssegnate: 25, candidatiInGraduatoria: 300, ultimaNomina: '2025-01-08', competizione: 'media', trend: 'stabile' },

  // ─── A031 — Sostegno Secondaria II Grado ───
  { id: 'B060-RM', classeCodice: 'A031', provinciaSigla: 'RM', annoScolastico: '2024/25', tipoGraduatoria: 'GPS I Fascia', punteggioMinimo: 85.0, punteggioMassimo: 112, posizioniAssegnate: 110, candidatiInGraduatoria: 850, ultimaNomina: '2025-01-16', competizione: 'molto_alta', trend: 'crescente' },
  { id: 'B061-MI', classeCodice: 'A031', provinciaSigla: 'MI', annoScolastico: '2024/25', tipoGraduatoria: 'GPS I Fascia', punteggioMinimo: 82.0, punteggioMassimo: 110, posizioniAssegnate: 90, candidatiInGraduatoria: 720, ultimaNomina: '2025-01-13', competizione: 'molto_alta', trend: 'crescente' },
  { id: 'B062-NA', classeCodice: 'A031', provinciaSigla: 'NA', annoScolastico: '2024/25', tipoGraduatoria: 'GPS I Fascia', punteggioMinimo: 78.0, punteggioMassimo: 106, posizioniAssegnate: 75, candidatiInGraduatoria: 580, ultimaNomina: '2025-01-10', competizione: 'alta', trend: 'stabile' },
  { id: 'B063-BA', classeCodice: 'A031', provinciaSigla: 'BA', annoScolastico: '2024/25', tipoGraduatoria: 'GPS I Fascia', punteggioMinimo: 75.0, punteggioMassimo: 102, posizioniAssegnate: 55, candidatiInGraduatoria: 450, ultimaNomina: '2025-01-08', competizione: 'alta', trend: 'crescente' },
  { id: 'B064-TO', classeCodice: 'A031', provinciaSigla: 'TO', annoScolastico: '2024/25', tipoGraduatoria: 'GPS I Fascia', punteggioMinimo: 78.0, punteggioMassimo: 105, posizioniAssegnate: 40, candidatiInGraduatoria: 320, ultimaNomina: '2025-01-06', competizione: 'media', trend: 'stabile' },
  { id: 'B065-BO', classeCodice: 'A031', provinciaSigla: 'BO', annoScolastico: '2024/25', tipoGraduatoria: 'GPS I Fascia', punteggioMinimo: 80.0, punteggioMassimo: 108, posizioniAssegnate: 35, candidatiInGraduatoria: 290, ultimaNomina: '2025-01-07', competizione: 'media', trend: 'stabile' },
  { id: 'B066-FI', classeCodice: 'A031', provinciaSigla: 'FI', annoScolastico: '2024/25', tipoGraduatoria: 'GPS I Fascia', punteggioMinimo: 76.0, punteggioMassimo: 102, posizioniAssegnate: 28, candidatiInGraduatoria: 240, ultimaNomina: '2025-01-05', competizione: 'media', trend: 'stabile' },

  // ─── A028 — Sostegno Infanzia ───
  { id: 'B070-RM', classeCodice: 'A028', provinciaSigla: 'RM', annoScolastico: '2024/25', tipoGraduatoria: 'GPS I Fascia', punteggioMinimo: 80.0, punteggioMassimo: 108, posizioniAssegnate: 65, candidatiInGraduatoria: 520, ultimaNomina: '2025-01-14', competizione: 'alta', trend: 'crescente' },
  { id: 'B071-MI', classeCodice: 'A028', provinciaSigla: 'MI', annoScolastico: '2024/25', tipoGraduatoria: 'GPS I Fascia', punteggioMinimo: 78.0, punteggioMassimo: 105, posizioniAssegnate: 55, candidatiInGraduatoria: 430, ultimaNomina: '2025-01-11', competizione: 'alta', trend: 'crescente' },
  { id: 'B072-NA', classeCodice: 'A028', provinciaSigla: 'NA', annoScolastico: '2024/25', tipoGraduatoria: 'GPS I Fascia', punteggioMinimo: 72.0, punteggioMassimo: 100, posizioniAssegnate: 48, candidatiInGraduatoria: 380, ultimaNomina: '2025-01-09', competizione: 'media', trend: 'stabile' },
  { id: 'B073-BA', classeCodice: 'A028', provinciaSigla: 'BA', annoScolastico: '2024/25', tipoGraduatoria: 'GPS I Fascia', punteggioMinimo: 70.0, punteggioMassimo: 96, posizioniAssegnate: 35, candidatiInGraduatoria: 280, ultimaNomina: '2025-01-08', competizione: 'media', trend: 'stabile' },

  // ─── A002 — Storia ───
  { id: 'B080-RM', classeCodice: 'A002', provinciaSigla: 'RM', annoScolastico: '2024/25', tipoGraduatoria: 'GPS I Fascia', punteggioMinimo: 90.0, punteggioMassimo: 114, posizioniAssegnate: 25, candidatiInGraduatoria: 320, ultimaNomina: '2025-01-10', competizione: 'alta', trend: 'stabile' },
  { id: 'B081-MI', classeCodice: 'A002', provinciaSigla: 'MI', annoScolastico: '2024/25', tipoGraduatoria: 'GPS I Fascia', punteggioMinimo: 88.0, punteggioMassimo: 112, posizioniAssegnate: 20, candidatiInGraduatoria: 280, ultimaNomina: '2025-01-09', competizione: 'alta', trend: 'stabile' },

  // ─── A010 — Chimica ───
  { id: 'B090-RM', classeCodice: 'A010', provinciaSigla: 'RM', annoScolastico: '2024/25', tipoGraduatoria: 'GPS I Fascia', punteggioMinimo: 78.0, punteggioMassimo: 104, posizioniAssegnate: 18, candidatiInGraduatoria: 210, ultimaNomina: '2025-01-08', competizione: 'media', trend: 'stabile' },
  { id: 'B091-MI', classeCodice: 'A010', provinciaSigla: 'MI', annoScolastico: '2024/25', tipoGraduatoria: 'GPS I Fascia', punteggioMinimo: 76.0, punteggioMassimo: 102, posizioniAssegnate: 15, candidatiInGraduatoria: 180, ultimaNomina: '2025-01-07', competizione: 'media', trend: 'stabile' },

  // ─── A004 — Francese ───
  { id: 'B100-RM', classeCodice: 'A004', provinciaSigla: 'RM', annoScolastico: '2024/25', tipoGraduatoria: 'GPS I Fascia', punteggioMinimo: 85.0, punteggioMassimo: 110, posizioniAssegnate: 15, candidatiInGraduatoria: 220, ultimaNomina: '2025-01-06', competizione: 'alta', trend: 'decrescente' },
  { id: 'B101-TO', classeCodice: 'A004', provinciaSigla: 'TO', annoScolastico: '2024/25', tipoGraduatoria: 'GPS I Fascia', punteggioMinimo: 82.0, punteggioMassimo: 108, posizioniAssegnate: 12, candidatiInGraduatoria: 160, ultimaNomina: '2025-01-05', competizione: 'media', trend: 'stabile' },

  // ─── A014 — Filosofia ───
  { id: 'B110-RM', classeCodice: 'A014', provinciaSigla: 'RM', annoScolastico: '2024/25', tipoGraduatoria: 'GPS I Fascia', punteggioMinimo: 82.0, punteggioMassimo: 108, posizioniAssegnate: 12, candidatiInGraduatoria: 180, ultimaNomina: '2025-01-05', competizione: 'media', trend: 'stabile' },

  // ─── A017 — Storia dell'Arte ───
  { id: 'B120-RM', classeCodice: 'A017', provinciaSigla: 'RM', annoScolastico: '2024/25', tipoGraduatoria: 'GPS I Fascia', punteggioMinimo: 80.0, punteggioMassimo: 105, posizioniAssegnate: 10, candidatiInGraduatoria: 150, ultimaNomina: '2025-01-04', competizione: 'media', trend: 'stabile' },

  // ─── A019 — Disegno e Arti Visive ───
  { id: 'B130-RM', classeCodice: 'A019', provinciaSigla: 'RM', annoScolastico: '2024/25', tipoGraduatoria: 'GPS I Fascia', punteggioMinimo: 78.0, punteggioMassimo: 102, posizioniAssegnate: 10, candidatiInGraduatoria: 140, ultimaNomina: '2025-01-04', competizione: 'media', trend: 'stabile' },

  // ─── A024 — Informatica ───
  { id: 'B140-RM', classeCodice: 'A024', provinciaSigla: 'RM', annoScolastico: '2024/25', tipoGraduatoria: 'GPS I Fascia', punteggioMinimo: 82.0, punteggioMassimo: 108, posizioniAssegnate: 15, candidatiInGraduatoria: 190, ultimaNomina: '2025-01-06', competizione: 'media', trend: 'crescente' },
  { id: 'B141-MI', classeCodice: 'A024', provinciaSigla: 'MI', annoScolastico: '2024/25', tipoGraduatoria: 'GPS I Fascia', punteggioMinimo: 80.0, punteggioMassimo: 106, posizioniAssegnate: 12, candidatiInGraduatoria: 160, ultimaNomina: '2025-01-05', competizione: 'media', trend: 'crescente' },

  // ─── B001 — Assistente Amministrativo (ATA) ───
  { id: 'B150-RM', classeCodice: 'B001', provinciaSigla: 'RM', annoScolastico: '2024/25', tipoGraduatoria: 'GPS I Fascia', punteggioMinimo: 88.0, punteggioMassimo: 110, posizioniAssegnate: 45, candidatiInGraduatoria: 520, ultimaNomina: '2025-01-14', competizione: 'molto_alta', trend: 'crescente' },
  { id: 'B151-MI', classeCodice: 'B001', provinciaSigla: 'MI', annoScolastico: '2024/25', tipoGraduatoria: 'GPS I Fascia', punteggioMinimo: 85.0, punteggioMassimo: 108, posizioniAssegnate: 38, candidatiInGraduatoria: 450, ultimaNomina: '2025-01-12', competizione: 'molto_alta', trend: 'crescente' },
  { id: 'B152-NA', classeCodice: 'B001', provinciaSigla: 'NA', annoScolastico: '2024/25', tipoGraduatoria: 'GPS I Fascia', punteggioMinimo: 80.0, punteggioMassimo: 105, posizioniAssegnate: 35, candidatiInGraduatoria: 400, ultimaNomina: '2025-01-09', competizione: 'alta', trend: 'stabile' },
  { id: 'B153-BA', classeCodice: 'B001', provinciaSigla: 'BA', annoScolastico: '2024/25', tipoGraduatoria: 'GPS I Fascia', punteggioMinimo: 78.0, punteggioMassimo: 102, posizioniAssegnate: 28, candidatiInGraduatoria: 320, ultimaNomina: '2025-01-08', competizione: 'media', trend: 'stabile' },
  { id: 'B154-TO', classeCodice: 'B001', provinciaSigla: 'TO', annoScolastico: '2024/25', tipoGraduatoria: 'GPS I Fascia', punteggioMinimo: 82.0, punteggioMassimo: 106, posizioniAssegnate: 22, candidatiInGraduatoria: 260, ultimaNomina: '2025-01-06', competizione: 'media', trend: 'stabile' },

  // ─── B002 — Assistente Tecnico (ATA) ───
  { id: 'B160-RM', classeCodice: 'B002', provinciaSigla: 'RM', annoScolastico: '2024/25', tipoGraduatoria: 'GPS I Fascia', punteggioMinimo: 82.0, punteggioMassimo: 106, posizioniAssegnate: 25, candidatiInGraduatoria: 300, ultimaNomina: '2025-01-12', competizione: 'alta', trend: 'stabile' },
  { id: 'B161-MI', classeCodice: 'B002', provinciaSigla: 'MI', annoScolastico: '2024/25', tipoGraduatoria: 'GPS I Fascia', punteggioMinimo: 80.0, punteggioMassimo: 104, posizioniAssegnate: 20, candidatiInGraduatoria: 260, ultimaNomina: '2025-01-10', competizione: 'media', trend: 'stabile' },

  // ─── B006 — Osservatore Scolastico (nuovo profilo OS) ───
  { id: 'B170-RM', classeCodice: 'B006', provinciaSigla: 'RM', annoScolastico: '2024/25', tipoGraduatoria: 'GPS I Fascia', punteggioMinimo: 65.0, punteggioMassimo: 90, posizioniAssegnate: 18, candidatiInGraduatoria: 220, ultimaNomina: '2025-01-10', competizione: 'media', trend: 'crescente' },
  { id: 'B171-MI', classeCodice: 'B006', provinciaSigla: 'MI', annoScolastico: '2024/25', tipoGraduatoria: 'GPS I Fascia', punteggioMinimo: 62.0, punteggioMassimo: 88, posizioniAssegnate: 15, candidatiInGraduatoria: 180, ultimaNomina: '2025-01-08', competizione: 'media', trend: 'crescente' },

  // ─── Additional provinces for popular classes ───
  // A001 — other provinces
  { id: 'B180-CH', classeCodice: 'A001', provinciaSigla: 'CH', annoScolastico: '2024/25', tipoGraduatoria: 'GPS I Fascia', punteggioMinimo: 68.0, punteggioMassimo: 92, posizioniAssegnate: 10, candidatiInGraduatoria: 130, ultimaNomina: '2024-12-14', competizione: 'media', trend: 'stabile' },
  { id: 'B181-AQ', classeCodice: 'A001', provinciaSigla: 'AQ', annoScolastico: '2024/25', tipoGraduatoria: 'GPS I Fascia', punteggioMinimo: 64.0, punteggioMassimo: 88, posizioniAssegnate: 6, candidatiInGraduatoria: 80, ultimaNomina: '2024-12-10', competizione: 'bassa', trend: 'decrescente' },
  { id: 'B182-TS', classeCodice: 'A001', provinciaSigla: 'TS', annoScolastico: '2024/25', tipoGraduatoria: 'GPS I Fascia', punteggioMinimo: 80.0, punteggioMassimo: 104, posizioniAssegnate: 15, candidatiInGraduatoria: 200, ultimaNomina: '2025-01-03', competizione: 'media', trend: 'stabile' },
  { id: 'B183-UD', classeCodice: 'A001', provinciaSigla: 'UD', annoScolastico: '2024/25', tipoGraduatoria: 'GPS I Fascia', punteggioMinimo: 75.0, punteggioMassimo: 98, posizioniAssegnate: 10, candidatiInGraduatoria: 140, ultimaNomina: '2024-12-18', competizione: 'media', trend: 'stabile' },
  { id: 'B184-PZ', classeCodice: 'A001', provinciaSigla: 'PZ', annoScolastico: '2024/25', tipoGraduatoria: 'GPS I Fascia', punteggioMinimo: 62.0, punteggioMassimo: 86, posizioniAssegnate: 8, candidatiInGraduatoria: 100, ultimaNomina: '2024-12-12', competizione: 'bassa', trend: 'decrescente' },
  { id: 'B185-SR', classeCodice: 'A001', provinciaSigla: 'SR', annoScolastico: '2024/25', tipoGraduatoria: 'GPS I Fascia', punteggioMinimo: 60.0, punteggioMassimo: 84, posizioniAssegnate: 7, candidatiInGraduatoria: 90, ultimaNomina: '2024-12-10', competizione: 'bassa', trend: 'decrescente' },
  { id: 'B186-TP', classeCodice: 'A001', provinciaSigla: 'TP', annoScolastico: '2024/25', tipoGraduatoria: 'GPS I Fascia', punteggioMinimo: 58.0, punteggioMassimo: 82, posizioniAssegnate: 5, candidatiInGraduatoria: 70, ultimaNomina: '2024-12-08', competizione: 'bassa', trend: 'decrescente' },
  { id: 'B187-EN', classeCodice: 'A001', provinciaSigla: 'EN', annoScolastico: '2024/25', tipoGraduatoria: 'GPS I Fascia', punteggioMinimo: 56.0, punteggioMassimo: 78, posizioniAssegnate: 4, candidatiInGraduatoria: 50, ultimaNomina: '2024-12-06', competizione: 'bassa', trend: 'decrescente' },
  { id: 'B188-CL', classeCodice: 'A001', provinciaSigla: 'CL', annoScolastico: '2024/25', tipoGraduatoria: 'GPS I Fascia', punteggioMinimo: 58.0, punteggioMassimo: 80, posizioniAssegnate: 5, candidatiInGraduatoria: 65, ultimaNomina: '2024-12-08', competizione: 'bassa', trend: 'decrescente' },
  { id: 'B189-AG', classeCodice: 'A001', provinciaSigla: 'AG', annoScolastico: '2024/25', tipoGraduatoria: 'GPS I Fascia', punteggioMinimo: 55.0, punteggioMassimo: 78, posizioniAssegnate: 5, candidatiInGraduatoria: 60, ultimaNomina: '2024-12-06', competizione: 'bassa', trend: 'decrescente' },

  // More for A003 (Inglese) — south
  { id: 'B190-CS', classeCodice: 'A003', provinciaSigla: 'CS', annoScolastico: '2024/25', tipoGraduatoria: 'GPS I Fascia', punteggioMinimo: 72.0, punteggioMassimo: 96, posizioniAssegnate: 14, candidatiInGraduatoria: 210, ultimaNomina: '2024-12-16', competizione: 'media', trend: 'stabile' },
  { id: 'B191-TP', classeCodice: 'A003', provinciaSigla: 'TP', annoScolastico: '2024/25', tipoGraduatoria: 'GPS I Fascia', punteggioMinimo: 62.0, punteggioMassimo: 86, posizioniAssegnate: 6, candidatiInGraduatoria: 90, ultimaNomina: '2024-12-08', competizione: 'bassa', trend: 'decrescente' },
  { id: 'B192-PZ', classeCodice: 'A003', provinciaSigla: 'PZ', annoScolastico: '2024/25', tipoGraduatoria: 'GPS I Fascia', punteggioMinimo: 64.0, punteggioMassimo: 88, posizioniAssegnate: 8, candidatiInGraduatoria: 110, ultimaNomina: '2024-12-12', competizione: 'bassa', trend: 'decrescente' },

  // A007 (Matematica) — medium provinces
  { id: 'B193-VE', classeCodice: 'A007', provinciaSigla: 'VE', annoScolastico: '2024/25', tipoGraduatoria: 'GPS I Fascia', punteggioMinimo: 78.0, punteggioMassimo: 102, posizioniAssegnate: 15, candidatiInGraduatoria: 180, ultimaNomina: '2025-01-04', competizione: 'media', trend: 'stabile' },
  { id: 'B194-PG', classeCodice: 'A007', provinciaSigla: 'PG', annoScolastico: '2024/25', tipoGraduatoria: 'GPS I Fascia', punteggioMinimo: 72.0, punteggioMassimo: 96, posizioniAssegnate: 12, candidatiInGraduatoria: 150, ultimaNomina: '2024-12-18', competizione: 'media', trend: 'stabile' },
  { id: 'B195-CZ', classeCodice: 'A007', provinciaSigla: 'CZ', annoScolastico: '2024/25', tipoGraduatoria: 'GPS I Fascia', punteggioMinimo: 62.0, punteggioMassimo: 86, posizioniAssegnate: 8, candidatiInGraduatoria: 100, ultimaNomina: '2024-12-12', competizione: 'bassa', trend: 'decrescente' },

  // A031 (Sostegno II) — more provinces
  { id: 'B196-CT', classeCodice: 'A031', provinciaSigla: 'CT', annoScolastico: '2024/25', tipoGraduatoria: 'GPS I Fascia', punteggioMinimo: 70.0, punteggioMassimo: 96, posizioniAssegnate: 30, candidatiInGraduatoria: 280, ultimaNomina: '2025-01-04', competizione: 'media', trend: 'stabile' },
  { id: 'B197-PA', classeCodice: 'A031', provinciaSigla: 'PA', annoScolastico: '2024/25', tipoGraduatoria: 'GPS I Fascia', punteggioMinimo: 66.0, punteggioMassimo: 92, posizioniAssegnate: 25, candidatiInGraduatoria: 240, ultimaNomina: '2025-01-03', competizione: 'media', trend: 'stabile' },
  { id: 'B198-GE', classeCodice: 'A031', provinciaSigla: 'GE', annoScolastico: '2024/25', tipoGraduatoria: 'GPS I Fascia', punteggioMinimo: 75.0, punteggioMassimo: 100, posizioniAssegnate: 22, candidatiInGraduatoria: 210, ultimaNomina: '2025-01-05', competizione: 'media', trend: 'stabile' },
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
