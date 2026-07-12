// ============================================================
// DOCUMENTI UFFICIALI — Normativa scuola italiana
// Decreti, leggi, ordinanze e circolari ministeriali
// Fonti: Gazzetta Ufficiale, normattiva.it, mim.gov.it
// Ultimo aggiornamento: luglio 2025
// ============================================================

export interface DocumentoNormativo {
  id: string;
  titolo: string;
  descrizione: string;
  tipo: 'Decreto Ministeriale' | 'Decreto Legislativo' | 'Legge' | 'Ordinanza Ministeriale' | 'Circolare' | 'DPR';
  numero: string;
  data: string;
  emanatoDa: string;
  categoria: string;
  riassunto: string;
  url: string;
  rilevanza: 'alta' | 'media' | 'bassa';
  target: string[];
}

export const DOCUMENTI_NORMATIVI: DocumentoNormativo[] = [
  // ──────────────────────────────────────────────
  // CLASSI DI CONCORSO
  // ──────────────────────────────────────────────
  {
    id: 'DOC-001',
    titolo: 'DM 259/2017 — Classi di concorso per i posti di insegnamento',
    descrizione: 'Regolamento recante norme in materia di classi di concorso per i posti di insegnamento nelle scuole secondarie di primo e secondo grado.',
    tipo: 'Decreto Ministeriale',
    numero: '259',
    data: '2017-10-09',
    emanatoDa: 'Ministero dell\'Istruzione, dell\'Università e della Ricerca',
    categoria: 'Classi di concorso e Abilitazione',
    riassunto: 'Definisce le classi di concorso per l\'accesso all\'insegnamento nella scuola secondaria, individuando per ciascuna classe i titoli di studio richiesti e le prove concorsuali. È il riferimento principale per determinare l\'idoneità all\'insegnamento.',
    url: 'https://www.gazzettaufficiale.it/eli/id/2017/11/29/17G00217/sg',
    rilevanza: 'alta',
    target: ['Docenti', 'Dirigenti Scolastici', 'Uffici Personale'],
  },
  {
    id: 'DOC-002',
    titolo: 'DM 22/12/2023 — Revisione classi di concorso',
    descrizione: 'Decreto ministeriale di revisione delle classi di concorso per i posti di insegnamento nelle scuole secondarie di primo e secondo grado.',
    tipo: 'Decreto Ministeriale',
    numero: '22/12/2023',
    data: '2023-12-22',
    emanatoDa: 'Ministero dell\'Istruzione e del Merito',
    categoria: 'Classi di concorso e Abilitazione',
    riassunto: 'Riorganizza le classi di concorso della scuola secondaria, modificando la struttura di molte classi esistenti e introducendone di nuove. Il decreto entra in vigore gradualmente a partire dall\'a.s. 2024/25 con il transitorio delle vecchie classi.',
    url: 'https://www.gazzettaufficiale.it/eli/id/2024/01/19/24G00004/sg',
    rilevanza: 'alta',
    target: ['Docenti', 'Aspiranti Docenti', 'Dirigenti Scolastici'],
  },
  {
    id: 'DOC-003',
    titolo: 'DPR 19/2016 — Classi di concorso secondaria I grado e disposizioni transitorie',
    descrizione: 'Regio Decreto emesso su proposta del Ministro della Pubblica Istruzione concernente la disciplina transitoria per le classi di concorso.',
    tipo: 'DPR',
    numero: '19/2016',
    data: '2016-01-15',
    emanatoDa: 'Presidente della Repubblica',
    categoria: 'Classi di concorso e Abilitazione',
    riassunto: 'Disposizioni transitorie sulle classi di concorso della scuola secondaria di primo grado, stabilendo le modalità di passaggio tra vecchie e nuove classi di concorso per gli insegnanti già in servizio.',
    url: 'https://www.normattiva.it/uri-res/N2Ls?urn:nir:presidente.repubblica:decreto:2016-01-15;19',
    rilevanza: 'media',
    target: ['Docenti in servizio', 'Uffici Personale'],
  },

  // ──────────────────────────────────────────────
  // GRADUATORIE E GPS
  // ──────────────────────────────────────────────
  {
    id: 'DOC-004',
    titolo: 'DM 88/2024 — Graduatorie di merito per le supplenze (GPS)',
    descrizione: 'Decreto ministeriale attuativo delle disposizioni in materia di Graduatorie di merito per le Supplenze (GPS) e delle relative procedure di aggiornamento.',
    tipo: 'Decreto Ministeriale',
    numero: '88/2024',
    data: '2024-03-18',
    emanatoDa: 'Ministero dell\'Istruzione e del Merito',
    categoria: 'Graduatorie (GPS, GAE, d\'Istituto)',
    riassunto: 'Indica le modalità di aggiornamento delle GPS (Graduatorie Provinciali per le Supplenze) con le nuove classi di concorso DM 22/12/2023. Fissa le scadenze per l\'aggiornamento, definisce i criteri di attribuzione dei punteggi e regola le procedure di iscrizione per la I e II fascia.',
    url: 'https://www.gazzettaufficiale.it/eli/id/2024/04/10/24G00060/sg',
    rilevanza: 'alta',
    target: ['Docenti in GPS', 'Aspiranti Docenti', 'Dirigenti Scolastici'],
  },
  {
    id: 'DOC-005',
    titolo: 'OM 88/2024 — Nomine GPS I e II fascia e 150 scuole',
    descrizione: 'Ordinanza Ministeriale 88/2024 per le procedure di nomina delle supplenze annuali e temporanee attraverso le GPS I e II fascia.',
    tipo: 'Ordinanza Ministeriale',
    numero: '88/2024',
    data: '2024-06-14',
    emanatoDa: 'Ministero dell\'Istruzione e del Merito',
    categoria: 'Graduatorie (GPS, GAE, d\'Istituto)',
    riassunto: 'Disciplina le procedure di nomina delle supplenze annuali e temporanee per l\'anno scolastico 2024/25 e successivi. Regola le convocazioni dalla GPS I fascia (per le supplenze annuali - 150 scuole) e dalla II fascia (per le supplenze temporanee). Definisce i termini di accettazione e rinuncia.',
    url: 'https://www.mim.gov.it/cerca?search-all=OM+88%2F2024',
    rilevanza: 'alta',
    target: ['Docenti', 'Dirigenti Scolastici', 'Uffici Personale'],
  },
  {
    id: 'DOC-006',
    titolo: 'OM 2/2025 — Aggiornamento GPS 2025',
    descrizione: 'Ordinanza Ministeriale per l\'aggiornamento delle Graduatorie Provinciali per le Supplenze (GPS) per l\'anno scolastico 2025/26.',
    tipo: 'Ordinanza Ministeriale',
    numero: '2/2025',
    data: '2025-01-20',
    emanatoDa: 'Ministero dell\'Istruzione e del Merito',
    categoria: 'Graduatorie (GPS, GAE, d\'Istituto)',
    riassunto: 'Dispone l\'aggiornamento delle GPS I e II fascia con i titoli culturali, di servizio e di concorso maturati alla data del 31 dicembre 2024. Fissa le scadenze per la presentazione delle domande di aggiornamento (entro il 28 febbraio 2025) e le modalità di presentazione tramite POLIS.',
    url: 'https://www.mim.gov.it/cerca?search-all=OM+2%2F2025',
    rilevanza: 'alta',
    target: ['Docenti', 'Aspiranti Docenti'],
  },

  // ──────────────────────────────────────────────
  // GRADUATORIE ATA
  // ──────────────────────────────────────────────
  {
    id: 'DOC-007',
    titolo: 'DM 89/2024 — Graduatorie del personale ATA',
    descrizione: 'Decreto ministeriale per l\'individuazione delle procedure di inserimento e aggiornamento delle graduatorie del personale ATA.',
    tipo: 'Decreto Ministeriale',
    numero: '89/2024',
    data: '2024-03-18',
    emanatoDa: 'Ministero dell\'Istruzione e del Merito',
    categoria: 'Graduatorie (GPS, GAE, d\'Istituto)',
    riassunto: 'Regola le graduatorie permanenti del personale ATA (Assistente Amministrativo, Assistente Tecnico, Cuoco, Infermiere, Osservatore Scolastico). Definisce i punteggi per l\'inserimento nelle tre fasce, con particolare riferimento alla I fascia (24 mesi) e alla III fascia (nuove assunzioni).',
    url: 'https://www.gazzettaufficiale.it/eli/id/2024/04/10/24G00060/sg',
    rilevanza: 'alta',
    target: ['Personale ATA', 'Dirigenti Scolastici'],
  },
  {
    id: 'DOC-008',
    titolo: 'DM 230/2005 — Inserimento personale ATA nelle graduatorie',
    descrizione: 'Decreto Ministeriale per l\'inserimento del personale ATA nelle graduatorie permanenti provinciali.',
    tipo: 'Decreto Ministeriale',
    numero: '230/2005',
    data: '2005-06-30',
    emanatoDa: 'Ministero dell\'Istruzione, dell\'Università e della Ricerca',
    categoria: 'Graduatorie (GPS, GAE, d\'Istituto)',
    riassunto: 'Regola le modalità di inserimento del personale ATA nelle graduatorie permanenti provinciali di terza fascia, i criteri di attribuzione dei punteggi per titoli di studio e servizio, e le procedure per l\'aggiornamento periodico.',
    url: 'https://www.normattiva.it/uri-res/N2Ls?urn:nir:ministero.istruzione:decreto:2005-06-30;230',
    rilevanza: 'media',
    target: ['Personale ATA', 'Uffici Personale'],
  },

  // ──────────────────────────────────────────────
  // CONCORSI PUBBLICI
  // ──────────────────────────────────────────────
  {
    id: 'DOC-009',
    titolo: 'D.Lgs. 36/2022 — Concorsi per le amministrazioni pubbliche',
    descrizione: 'Decreto Legislativo recante disposizioni in materia di procedure di assunzione nelle amministrazioni pubbliche, incluso il comparto Istruzione e Ricerca.',
    tipo: 'Decreto Legislativo',
    numero: '36/2022',
    data: '2022-03-25',
    emanatoDa: 'Governo della Repubblica',
    categoria: 'Bandi, Concorsi e Selezioni',
    riassunto: 'Riforma i concorsi pubblici per i docenti, introducendo la procedura unica nazionale con prove scritte e orali gestite da commissioni nazionali. Sostituisce le vecchie prove a scelta multipla con prove aperte. Modifica i requisiti di accesso e i criteri di valutazione.',
    url: 'https://www.gazzettaufficiale.it/eli/id/2022/04/19/22G00066/sg',
    rilevanza: 'alta',
    target: ['Aspiranti Docenti', 'Docenti', 'Dirigenti Scolastici'],
  },
  {
    id: 'DOC-010',
    titolo: 'DM 328/2023 — Concorso 2023/24 Docenti di ruolo',
    descrizione: 'Decreto ministeriale per l\'individuazione dei requisiti e delle modalità di svolgimento del concorso per l\'assunzione di docenti in ruolo.',
    tipo: 'Decreto Ministeriale',
    numero: '328/2023',
    data: '2023-07-14',
    emanatoDa: 'Ministero dell\'Istruzione e del Merito',
    categoria: 'Bandi, Concorsi e Selezioni',
    riassunto: 'Indica le modalità di svolgimento del concorso per docenti di ruolo con D.Lgs. 36/2022, definendo le prove d\'esame, i programmi, i punteggi minimi e i criteri di valutazione. Prevede prove scritte su piattaforma digitale e colloquio orale.',
    url: 'https://www.mim.gov.it/cerca?search-all=DM+328%2F2023',
    rilevanza: 'alta',
    target: ['Aspiranti Docenti', 'Docenti in ruolo'],
  },

  // ──────────────────────────────────────────────
  // CONTRATTO COLLETTIVO NAZIONALE
  // ──────────────────────────────────────────────
  {
    id: 'DOC-011',
    titolo: 'CCNL Istruzione e Ricerca 2019-2021 — Contratto Collettivo Nazionale',
    descrizione: 'Contratto Collettivo Nazionale di Lavoro per il comparto Istruzione e Ricerca, siglato per il triennio 2019-2021.',
    tipo: 'Decreto Ministeriale',
    numero: 'CCNL 2019-2021',
    data: '2021-03-22',
    emanatoDa: 'Ministero dell\'Istruzione / Ministero dell\'Università e della Ricerca',
    categoria: 'Contratti, Salari e Personale ATA',
    riassunto: 'Regola le condizioni contrattuali del personale scolastico: retribuzione, orario di servizio, permessi, ferie, diritto allo studio, mobilità, passaggi di ruolo e ogni aspetto del rapporto di lavoro per docenti, ATA e dirigenti scolastici.',
    url: 'https://www.mim.gov.it/cerca?search-all=CCNL+2019-2021',
    rilevanza: 'alta',
    target: ['Docenti', 'Personale ATA', 'Dirigenti Scolastici'],
  },

  // ──────────────────────────────────────────────
  // LEGGI FONDAMENTALI
  // ──────────────────────────────────────────────
  {
    id: 'DOC-012',
    titolo: 'L. 104/1992 — Legge-quadro per l\'assistenza, l\'integrazione sociale e i diritti delle persone handicappate',
    descrizione: 'Legge 5 febbraio 1992, n. 104, recante norme in materia di assistenza, integrazione sociale e diritti delle persone con disabilità.',
    tipo: 'Legge',
    numero: '104/1992',
    data: '1992-02-05',
    emanatoDa: 'Parlamento della Repubblica',
    categoria: 'Normative, Note e Circolari Ministeriali',
    riassunto: 'Norma fondamentale per il diritto all\'istruzione delle persone con disabilità. Garantisce il diritto all\'inserimento scolastico con misure di integrazione (assistenza educativa, tutor, ausili tecnologici). Prevede il DSA, il PEI e le certificazioni per le agevolazioni lavorative (art. 42).',
    url: 'https://www.normattiva.it/uri-res/N2Ls?urn:nir:stato:legge:1992-02-05;104',
    rilevanza: 'alta',
    target: ['Docenti', 'Genitori', 'Dirigenti Scolastici', 'Personale ATA'],
  },
  {
    id: 'DOC-013',
    titolo: 'L. 107/2015 — La Buona Scuola',
    descrizione: 'Legge 13 luglio 2015, n. 107, recante delega al Governo per la riforma del sistema nazionale di istruzione e formazione.',
    tipo: 'Legge',
    numero: '107/2015',
    data: '2015-07-13',
    emanatoDa: 'Parlamento della Repubblica',
    categoria: 'Normative, Note e Circolari Ministeriali',
    riassunto: 'Riforma complessiva del sistema scolastico italiano. Introduce il potere docente, l\'autonomia differenziata, i Consigli di Classe digitali, il Registro Elettronico, l\'alternanza scuola-lavoro, il FIT e le scuole in rete. Rafforza il ruolo del Dirigente Scolastico.',
    url: 'https://www.gazzettaufficiale.it/eli/id/2015/07/15/15G00107/sg',
    rilevanza: 'alta',
    target: ['Docenti', 'Dirigenti Scolastici', 'Personale ATA'],
  },
  {
    id: 'DOC-014',
    titolo: 'L. 53/2003 — Disposizioni per la formazione permanente, l\'aggiornamento e l\'assistenza tecnica',
    descrizione: 'Legge 7 marzo 2003, n. 53, sul diritto allo studio e alla formazione permanente del personale scolastico.',
    tipo: 'Legge',
    numero: '53/2003',
    data: '2003-03-07',
    emanatoDa: 'Parlamento della Repubblica',
    categoria: 'Didattica, Formazione e Innovazione',
    riassunto: 'Disciplina il diritto allo studio del personale scolastico: 150 ore di permesso retribuito per formazione, organizzazione dell\'orario di lavoro, formazione in servizio e aggiornamento professionale. Regola i congedi per la formazione.',
    url: 'https://www.normattiva.it/uri-res/N2Ls?urn:nir:stato:legge:2003-03-07;53',
    rilevanza: 'media',
    target: ['Docenti', 'Personale ATA'],
  },

  // ──────────────────────────────────────────────
  // CONGEDI E TUTELA DEL LAVORO
  // ──────────────────────────────────────────────
  {
    id: 'DOC-015',
    titolo: 'D.Lgs. 151/2001 — Testo Unico Maternità e Paternità',
    descrizione: 'Decreto Legislativo 26 marzo 2001, n. 151, testo unico delle disposizioni legislative in materia di tutela e sostegno della maternità e della paternità.',
    tipo: 'Decreto Legislativo',
    numero: '151/2001',
    data: '2001-03-26',
    emanatoDa: 'Governo della Repubblica',
    categoria: 'Contratti, Salari e Personale ATA',
    riassunto: 'Regola i congedi parentali e per maternità del personale scolastico: astensione obbligatoria 5 mesi, congedo parentale fino a 6 anni del bambino (9 anni dopo la riforma Fornero), permessi retribuiti, allattamento. Prevede il divieto di discriminazione per maternità.',
    url: 'https://www.gazzettaufficiale.it/eli/id/2001/04/07/001G0110/sg',
    rilevanza: 'alta',
    target: ['Docenti', 'Personale ATA', 'Dirigenti Scolastici'],
  },
  {
    id: 'DOC-016',
    titolo: 'D.Lgs. 80/2015 — Disposizioni in materia di tutela e conciliazione vita-lavoro',
    descrizione: 'Decreto Legislativo 14 settembre 2015, n. 80, in attuazione della Direttiva 2010/18/UE per la conciliazione delle responsabilità familiari e della vita lavorativa.',
    tipo: 'Decreto Legislativo',
    numero: '80/2015',
    data: '2015-09-14',
    emanatoDa: 'Governo della Repubblica',
    categoria: 'Contratti, Salari e Personale ATA',
    riassunto: 'Estende il congedo parentale e introduce misure di conciliazione vita-lavoro: congedo di 10 giorni per il padre, flessibilità oraria, diritto a tempo parziale, congedo per figli disabili senza limiti di età.',
    url: 'https://www.gazzettaufficiale.it/eli/id/2015/10/06/15G00163/sg',
    rilevanza: 'media',
    target: ['Docenti', 'Personale ATA', 'Dirigenti Scolastici'],
  },

  // ──────────────────────────────────────────────
  // MOBILITÀ E SURROGAZIONE
  // ──────────────────────────────────────────────
  {
    id: 'DOC-017',
    titolo: 'D.Lgs. 59/2017 — Disposizioni in materia di mobilità del personale scolastico',
    descrizione: 'Decreto Legislativo 13 aprile 2017, n. 59, recante disposizioni in materia di mobilità del personale docente, educativo e ATA.',
    tipo: 'Decreto Legislativo',
    numero: '59/2017',
    data: '2017-04-13',
    emanatoDa: 'Governo della Repubblica',
    categoria: 'Mobilità, Assegnazioni e Utilizzazioni',
    riassunto: 'Riforma la mobilità del personale scolastico: introduce le precedenze per motivi familiari e di salute, le tutele per il ricongiungimento, i trasferimenti per motivi di servizio. Regola le procedure di assegnazione provvisoria e utilizzazione.',
    url: 'https://www.gazzettaufficiale.it/eli/id/2017/05/15/17G00076/sg',
    rilevanza: 'alta',
    target: ['Docenti', 'Personale ATA'],
  },
  {
    id: 'DOC-018',
    titolo: 'OM 4/2023 — Mobilità personale docente e ATA a.s. 2023/24',
    descrizione: 'Ordinanza Ministeriale per le procedure di mobilità del personale docente, educativo e ATA per l\'anno scolastico 2023/2024.',
    tipo: 'Ordinanza Ministeriale',
    numero: '4/2023',
    data: '2023-01-24',
    emanatoDa: 'Ministero dell\'Istruzione e del Merito',
    categoria: 'Mobilità, Assegnazioni e Utilizzazioni',
    riassunto: 'Definisce le procedure di mobilità territoriale e professionale per il personale docente e ATA, con le scadenze per la presentazione delle domande di trasferimento, le precedenze e le riserve. Regola le modalità di presentazione tramite POLIS.',
    url: 'https://www.mim.gov.it/cerca?search-all=OM+4%2F2023',
    rilevanza: 'alta',
    target: ['Docenti', 'Personale ATA'],
  },

  // ──────────────────────────────────────────────
  // ANNO DI PROVA
  // ──────────────────────────────────────────────
  {
    id: 'DOC-019',
    titolo: 'DM 85/2018 — Conferma in ruolo dei docenti in prova',
    descrizione: 'Decreto Ministeriale sulle modalità di valutazione e conferma in ruolo del personale docente neoassunto.',
    tipo: 'Decreto Ministeriale',
    numero: '85/2018',
    data: '2018-06-04',
    emanatoDa: 'Ministero dell\'Istruzione, dell\'Università e della Ricerca',
    categoria: 'Normative, Note e Circolari Ministeriali',
    riassunto: 'Regola la conferma in ruolo dei docenti al termine dell\'anno di prova e formazione (ex FIT). Definisce i criteri di valutazione, il ruolo del Tutor e della Commissione, e le modalità di superamento dell\'anno di prova.',
    url: 'https://www.gazzettaufficiale.it/eli/id/2018/06/26/18G00109/sg',
    rilevanza: 'alta',
    target: ['Docenti neoassunti', 'Dirigenti Scolastici'],
  },

  // ──────────────────────────────────────────────
  // INVALSI
  // ──────────────────────────────────────────────
  {
    id: 'DOC-020',
    titolo: 'OM 45/2024 — Prove INVALSI 2024',
    descrizione: 'Ordinanza Ministeriale per l\'effettuazione delle prove standardizzate INVALSI per l\'anno scolastico 2023/2024.',
    tipo: 'Ordinanza Ministeriale',
    numero: '45/2024',
    data: '2024-03-15',
    emanatoDa: 'Ministero dell\'Istruzione e del Merito',
    categoria: 'Esami di Stato e Valutazioni (INVALSI)',
    riassunto: 'Definisce le modalità di svolgimento delle prove INVALSI nazionali per gli studenti della secondaria I grado (classe III), della secondaria II grado (classe II) e dell\'esame di Stato. Indica le date, le modalità di somministrazione e i contenuti delle prove.',
    url: 'https://www.mim.gov.it/cerca?search-all=OM+45%2F2024',
    rilevanza: 'media',
    target: ['Docenti', 'Studenti', 'Dirigenti Scolastici'],
  },

  // ──────────────────────────────────────────────
  // ESAMI DI STATO
  // ──────────────────────────────────────────────
  {
    id: 'DOC-021',
    titolo: 'OM 3/2023 — Esami di Stato a.s. 2023/24',
    descrizione: 'Ordinanza Ministeriale per l\'esame di Stato conclusivo del secondo ciclo di istruzione per l\'anno scolastico 2023/2024.',
    tipo: 'Ordinanza Ministeriale',
    numero: '3/2023',
    data: '2023-01-23',
    emanatoDa: 'Ministero dell\'Istruzione e del Merito',
    categoria: 'Esami di Stato e Valutazioni (INVALSI)',
    riassunto: 'Disciplina le prove dell\'esame di Stato, la commissione, i criteri di valutazione, le prove scritte e orali. Definisce le novità per la seconda sessione e la commissione interna. Regola le prove INVALSI come parte integrante dell\'esame.',
    url: 'https://www.mim.gov.it/cerca?search-all=OM+3%2F2023',
    rilevanza: 'alta',
    target: ['Docenti', 'Studenti', 'Dirigenti Scolastici'],
  },

  // ──────────────────────────────────────────────
  // DIDATTICA E INNOVAZIONE
  // ──────────────────────────────────────────────
  {
    id: 'DOC-022',
    titolo: 'D.Lgs. 62/2017 — Disposizioni in materia di esame di Stato',
    descrizione: 'Decreto Legislativo 13 aprile 2017, n. 62, recante norme in materia di esame di Stato conclusivo dei percorsi di istruzione secondaria di secondo grado.',
    tipo: 'Decreto Legislativo',
    numero: '62/2017',
    data: '2017-04-13',
    emanatoDa: 'Governo della Repubblica',
    categoria: 'Esami di Stato e Valutazioni (INVALSI)',
    riassunto: 'Definisce la struttura dell\'esame di Stato con le prove scritte, gli obiettivi delle competenze, il colloquio orale e la prova INVALSI. Stabilisce i commissari interni ed esterni e i criteri di valutazione.',
    url: 'https://www.gazzettaufficiale.it/eli/id/2017/05/15/17G00076/sg',
    rilevanza: 'alta',
    target: ['Docenti', 'Studenti', 'Dirigenti Scolastici'],
  },
  {
    id: 'DOC-023',
    titolo: 'DM 10/2023 — Piano nazionale per la digitalizzazione della scuola',
    descrizione: 'Decreto Ministeriale per la definizione del Piano Nazionale per la Digitalizzazione della Scuola (PNSD).',
    tipo: 'Decreto Ministeriale',
    numero: '10/2023',
    data: '2023-02-08',
    emanatoDa: 'Ministero dell\'Istruzione e del Merito',
    categoria: 'Didattica, Formazione e Innovazione',
    riassunto: 'Definisce le linee di indirizzo per la trasformazione digitale della scuola: infrastrutture, connettività, strumenti digitali per la didattica, formazione del personale, e integrazione del digitale nei percorsi curricolari.',
    url: 'https://www.mim.gov.it/cerca?search-all=PNSD',
    rilevanza: 'media',
    target: ['Docenti', 'Dirigenti Scolastici', 'Personale ATA'],
  },

  // ──────────────────────────────────────────────
  // BES / DSA
  // ──────────────────────────────────────────────
  {
    id: 'DOC-024',
    titolo: 'L. 170/2010 — Nuove norme in materia di disturbi dell\'apprendimento (DSA)',
    descrizione: 'Legge 8 ottobre 2010, n. 170, recante nuove norme in materia di disturbi specifici dell\'apprendimento.',
    tipo: 'Legge',
    numero: '170/2010',
    data: '2010-10-08',
    emanatoDa: 'Parlamento della Repubblica',
    categoria: 'Normative, Note e Circolari Ministeriali',
    riassunto: 'Disciplina i disturbi specifici dell\'apprendimento (DSA): dislessia, disgrafia, discalculia, disturbo della comprensione della lettura. Garantisce il diritto all\'apprendimento con misure compensative e dispensative. Obbligo di diagnosi entro il primo anno della scuola secondaria di I grado.',
    url: 'https://www.normattiva.it/uri-res/N2Ls?urn:nir:stato:legge:2010-10-08;170',
    rilevanza: 'alta',
    target: ['Docenti', 'Genitori', 'Dirigenti Scolastici'],
  },
  {
    id: 'DOC-025',
    titolo: 'CNM 1/2019 — Linee guida per l\'inclusione scolastica (BES)',
    descrizione: 'Circolare del Ministero dell\'Istruzione sulle Linee Guida per l\'inclusione scolastica degli alunni con Bisogni Educativi Speciali (BES).',
    tipo: 'Circolare',
    numero: '1/2019',
    data: '2019-03-04',
    emanatoDa: 'Ministero dell\'Istruzione, dell\'Università e della Ricerca',
    categoria: 'Normative, Note e Circolari Ministeriali',
    riassunto: 'Aggiorna le linee guida per l\'inclusione scolastica degli alunni con BES (bisogni educativi speciali), definendo il PEI (Piano Educativo Individualizzato), il GLI (Gruppo per l\'Inclusione), le misure dispensative e compensative.',
    url: 'https://www.mim.gov.it/cerca?search-all=linee+guida+BES',
    rilevanza: 'alta',
    target: ['Docenti', 'Genitori', 'Dirigenti Scolastici'],
  },

  // ──────────────────────────────────────────────
  // ORARIO E SERVIZIO
  // ──────────────────────────────────────────────
  {
    id: 'DOC-026',
    titolo: 'DM 264/1993 — Orario di lavoro dei docenti',
    descrizione: 'Decreto Ministeriale 4 agosto 1993, n. 264, in materia di orario di lavoro del personale docente della scuola.',
    tipo: 'Decreto Ministeriale',
    numero: '264/1993',
    data: '1993-08-04',
    emanatoDa: 'Ministero dell\'Istruzione',
    categoria: 'Contratti, Salari e Personale ATA',
    riassunto: 'Definisce l\'orario di servizio del personale docente: 18 ore settimanali per la scuola secondaria, 22 ore per la primaria. Regola le attività extra-ore, la funzione strumentale e i turni di reperibilità.',
    url: 'https://www.normattiva.it/uri-res/N2Ls?urn:nir:ministero.istruzione:decreto:1993-08-04;264',
    rilevanza: 'media',
    target: ['Docenti', 'Dirigenti Scolastici'],
  },
  {
    id: 'DOC-027',
    titolo: 'DM 29/2013 — Assegnazione cattedre e posti d\'istituto',
    descrizione: 'Decreto Ministeriale per l\'assegnazione provvisoria e definitiva di cattedre e posti d\'istituto.',
    tipo: 'Decreto Ministeriale',
    numero: '29/2013',
    data: '2013-02-12',
    emanatoDa: 'Ministero dell\'Istruzione, dell\'Università e della Ricerca',
    categoria: 'Mobilità, Assegnazioni e Utilizzazioni',
    riassunto: 'Disciplina le procedure di assegnazione delle cattedre e dei posti d\'istituto per il personale docente, con le preferenze, i punteggi e le modalità di convocazione. Regola le surrogazioni e le assegnazioni temporanee.',
    url: 'https://www.gazzettaufficiale.it/eli/id/2013/03/09/13G00061/sg',
    rilevanza: 'media',
    target: ['Docenti', 'Dirigenti Scolastici'],
  },

  // ──────────────────────────────────────────────
  // DIRIGENZA SCOLASTICA
  // ──────────────────────────────────────────────
  {
    id: 'DOC-028',
    titolo: 'DPR 81/2009 — Concorso per Dirigente Scolastico',
    descrizione: 'Decreto del Presidente della Repubblica 3 febbraio 2009, n. 81, per le disposizioni unitarie sul concorso per Dirigente Scolastico.',
    tipo: 'DPR',
    numero: '81/2009',
    data: '2009-02-03',
    emanatoDa: 'Presidente della Repubblica',
    categoria: 'Bandi, Concorsi e Selezioni',
    riassunto: 'Definisce le prove, i requisiti e le modalità di svolgimento del concorso per Dirigente Scolastico: prove scritte su piattaforma INVALSI, colloquio orale con simulazione di gestione scolastica. Requisito: 7 anni di servizio e titolo abilitante.',
    url: 'https://www.gazzettaufficiale.it/eli/id/2009/03/21/009G0054/sg',
    rilevanza: 'media',
    target: ['Dirigenti Scolastici', 'Docenti aspiranti DS'],
  },

  // ──────────────────────────────────────────────
  // SCUOLA PRIVATA E PARITARIA
  // ──────────────────────────────────────────────
  {
    id: 'DOC-029',
    titolo: 'DPR 389/1988 — Scuola paritaria',
    descrizione: 'Decreto del Presidente della Repubblica 10 settembre 1988, n. 389, per l\'autorizzazione e l\'illegalità delle scuole non statali.',
    tipo: 'DPR',
    numero: '389/1988',
    data: '1988-09-10',
    emanatoDa: 'Presidente della Repubblica',
    categoria: 'Normative, Note e Circolari Ministeriali',
    riassunto: 'Regola le scuole paritarie: requisiti per il riconoscimento, parità scolastica, requisiti del personale, obblighi didattici, vigilanza ministeriale. Stabilisce i criteri di equiparazione con le scuole statali.',
    url: 'https://www.normattiva.it/uri-res/N2Ls?urn:nir:presidente.repubblica:decreto:1988-09-10;389',
    rilevanza: 'bassa',
    target: ['Dirigenti Scolastici', 'Personale scuole paritarie'],
  },

  // ──────────────────────────────────────────────
  // SCUOLA INCLUSIVA
  // ──────────────────────────────────────────────
  {
    id: 'DOC-030',
    titolo: 'DPR 182/2003 — Regolamento sulle scuole unitarie speciali',
    descrizione: 'Decreto del Presidente della Repubblica 24 febbraio 2004, n. 182, sulle modalità di inclusione degli alunni con disabilità.',
    tipo: 'DPR',
    numero: '182/2004',
    data: '2004-02-24',
    emanatoDa: 'Presidente della Repubblica',
    categoria: 'Normative, Note e Circolari Ministeriali',
    riassunto: 'Disciplina le modalità di inserimento degli alunni con disabilità nelle classi comuni: composizione del Glhellos, elaborazione del PEI, misure di integrazione, supporto del personale di sostegno. Regola le scuole unitarie speciali e i centri per l\'inclusione.',
    url: 'https://www.normattiva.it/uri-res/N2Ls?urn:nir:presidente.repubblica:decreto:2004-02-24;182',
    rilevanza: 'media',
    target: ['Docenti', 'Dirigenti Scolastici', 'Genitori'],
  },

  // ──────────────────────────────────────────────
  // SCUOLE ITALIANE ALL\'ESTERO
  // ──────────────────────────────────────────────
  {
    id: 'DOC-031',
    titolo: 'L. 519/1992 — Promozione della lingua e cultura italiana all\'estero',
    descrizione: 'Legge 3 agosto 1992, n. 519, per la promozione della cultura e della lingua italiana nelle scuole all\'estero.',
    tipo: 'Legge',
    numero: '519/1992',
    data: '1992-08-03',
    emanatoDa: 'Parlamento della Repubblica',
    categoria: 'Normative, Note e Circolari Ministeriali',
    riassunto: 'Promuove la diffusione della lingua e cultura italiana nelle scuole e università straniere. Regola le scuole statali all\'estero, il reclutamento del personale docente per l\'estero e le borse di studio per studenti stranieri.',
    url: 'https://www.normattiva.it/uri-res/N2Ls?urn:nir:stato:legge:1992-08-03;519',
    rilevanza: 'bassa',
    target: ['Docenti', 'Studenti'],
  },

  // ──────────────────────────────────────────────
  // BONUS E AGEVOLAZIONI
  // ──────────────────────────────────────────────
  {
    id: 'DOC-032',
    titolo: 'Circolare INPS 139/2020 — Bonus Docenti 2020',
    descrizione: 'Circolare INPS per l\'erogazione del bonus per il personale scolastico (600€ one-shot per l\'a.s. 2019/20).',
    tipo: 'Circolare',
    numero: '139/2020',
    data: '2020-08-14',
    emanatoDa: 'Istituto Nazionale della Previdenza Sociale',
    categoria: 'Contratti, Salari e Personale ATA',
    riassunto: 'Dispone l\'erogazione del bonus una tantum di 600€ lordi per il personale scolastico dell\'anno scolastico 2019/20, in relazione all\'emergenza COVID-19. Erogazione tramite datore di lavoro (Scuola).',
    url: 'https://www.inps.it/it/it/inps-comunica/inps-a-portata-di-mano/schede-informationali/bonus-docenti-2020.html',
    rilevanza: 'bassa',
    target: ['Docenti', 'Personale ATA'],
  },

  // ──────────────────────────────────────────────
  // COMPETENZE FUNZIONALI
  // ──────────────────────────────────────────────
  {
    id: 'DOC-033',
    titolo: 'CCNL 2022 — Accordo quadro per le competenze funzionali',
    descrizione: 'Accordo quadro per l\'attribuzione delle funzioni speciali e delle competenze dei Dirigenti Scolastici nel comparto Istruzione e Ricerca.',
    tipo: 'Decreto Ministeriale',
    numero: 'Accordo Quadro 2022',
    data: '2022-09-01',
    emanatoDa: 'Ministero dell\'Istruzione / MLPS',
    categoria: 'Contratti, Salari e Personale ATA',
    riassunto: 'Definisce le competenze funzionali del Dirigente Scolastico e le funzioni speciali del personale ATA (Assistente Amministrativo, Assistente Tecnico, Cuoco, Infermiere). Regola le indennità per mansioni speciali.',
    url: 'https://www.mim.gov.it/cerca?search-all=accordo+quadro+funzioni+speciali',
    rilevanza: 'media',
    target: ['Dirigenti Scolastici', 'Personale ATA'],
  },

  // ──────────────────────────────────────────────
  // VALUTAZIONE
  // ──────────────────────────────────────────────
  {
    id: 'DOC-034',
    titolo: 'DM 1/2018 — Modalità di valutazione degli alunni',
    descrizione: 'Decreto Ministeriale per il riordino delle disposizioni in materia di valutazione degli alunni della scuola primaria, secondaria di primo grado e secondaria di secondo grado.',
    tipo: 'Decreto Ministeriale',
    numero: '1/2018',
    data: '2018-03-26',
    emanatoDa: 'Ministero dell\'Istruzione, dell\'Università e della Ricerca',
    categoria: 'Esami di Stato e Valutazioni (INVALSI)',
    riassunto: 'Definisce le scale di valutazione, i criteri di attribuzione dei voti in decimi, le modalità di scrutinio, le verifiche periodiche e finali. Regola la valutazione della condotta e le procedure di recupero.',
    url: 'https://www.gazzettaufficiale.it/eli/id/2018/04/17/18G00055/sg',
    rilevanza: 'media',
    target: ['Docenti', 'Studenti', 'Genitori', 'Dirigenti Scolastici'],
  },

  // ──────────────────────────────────────────────
  // SICUREZZA SUL LAVORO
  // ──────────────────────────────────────────────
  {
    id: 'DOC-035',
    titolo: 'D.Lgs. 81/2008 — Testo Unico Sicurezza sul Lavoro',
    descrizione: 'Decreto Legislativo 9 aprile 2008, n. 81, testo unico in materia di tutela della salute e della sicurezza nei luoghi di lavoro.',
    tipo: 'Decreto Legislativo',
    numero: '81/2008',
    data: '2008-04-09',
    emanatoDa: 'Governo della Repubblica',
    categoria: 'Normative, Note e Circolari Ministeriali',
    riassunto: 'Testo unico sulla sicurezza sul lavoro, applicabile anche alle scuole. Regola la valutazione dei rischi, la formazione del personale, le misure di prevenzione, il RLS, la sorveglianza sanitaria e gli obblighi del Datore di Lavoro (Dirigente Scolastico).',
    url: 'https://www.gazzettaufficiale.it/eli/id/2008/04/24/008G0091/sg',
    rilevanza: 'media',
    target: ['Dirigenti Scolastici', 'Personale ATA', 'Docenti'],
  },
];

// ============================================================
// HELPER FUNCTIONS
// ============================================================

export function getDocumentiByTipo(tipo: string): DocumentoNormativo[] {
  return DOCUMENTI_NORMATIVI.filter(d => d.tipo === tipo);
}

export function getDocumentiByCategoria(categoria: string): DocumentoNormativo[] {
  return DOCUMENTI_NORMATIVI.filter(d => d.categoria === categoria);
}

export function getDocumentiByRilevanza(rilevanza: string): DocumentoNormativo[] {
  return DOCUMENTI_NORMATIVI.filter(d => d.rilevanza === rilevanza);
}

export function getDocumentiByTarget(target: string): DocumentoNormativo[] {
  return DOCUMENTI_NORMATIVI.filter(d => d.target.includes(target));
}

export function cercaDocumenti(query: string): DocumentoNormativo[] {
  const q = query.toLowerCase();
  return DOCUMENTI_NORMATIVI.filter(
    d =>
      d.titolo.toLowerCase().includes(q) ||
      d.descrizione.toLowerCase().includes(q) ||
      d.riassunto.toLowerCase().includes(q) ||
      d.categoria.toLowerCase().includes(q) ||
      d.numero.toLowerCase().includes(q)
  );
}

export function getCategorieDisponibili(): string[] {
  return [...new Set(DOCUMENTI_NORMATIVI.map(d => d.categoria))].sort();
}

export function getTipiDisponibili(): string[] {
  return [...new Set(DOCUMENTI_NORMATIVI.map(d => d.tipo))].sort();
}
