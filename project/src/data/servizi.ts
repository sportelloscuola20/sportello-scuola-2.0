export type CategoriaServizio = 'docenti' | 'ata' | 'generali';

export interface Servizio {
  id: string;
  titolo: string;
  valore: string;
  descrizione: string;
  dettagli: string[];
  prezzo: number;
  evidenza?: string;
}

export interface CategoriaServizi {
  key: CategoriaServizio;
  label: string;
  descrizione: string;
  servizi: Servizio[];
}

export const CATEGORIE_SERVIZI: CategoriaServizi[] = [
  {
    key: 'docenti',
    label: 'Area Docenti',
    descrizione: 'Affianchiamo i docenti in ogni fase della carriera: dall\'accesso in ruolo alla mobilità, dalla gestione delle graduatorie alla partecipazione ai concorsi. Ogni pratica è curata nei minimi dettagli per garantire la massima efficacia.',
    servizi: [
      {
        id: 'gps',
        titolo: 'Compilazione e Aggiornamento GPS',
        valore: 'Massimizza il tuo punteggio ed entra in graduatoria con il miglior posizionamento possibile.',
        descrizione: 'Supporto completo per l\'inserimento e l\'aggiornamento delle Graduatorie Provinciali per le Supplenze. Analizziamo ogni tuo titolo per valorizzarlo al massimo.',
        dettagli: [
          'Analisi e scelta delle classi di concorso strategiche',
          'Inserimento ottimizzato di titoli culturali, certificazioni e servizio',
          'Certificazioni linguistiche CEDILS e C2',
          'Invio telematico tramite POLIS'
        ],
        prezzo: 39,
        evidenza: 'Punteggio massimo garantito'
      },
      {
        id: '150-scuole',
        titolo: 'Scelta Strategica 150 Scuole',
        valore: 'Conquista la supplenza annuale con una strategia di preferenze studiata sui dati.',
        descrizione: 'Consulenza mirata per l\'assegnazione delle preferenze ch edetermineranno le tue supplenze annuali. Usiamo analisi storiche per ottimizzare ogni scelta.',
        dettagli: [
          'Analisi convocazioni storiche per provincia',
          'Mappatura scuole con maggiori cattedre disponibili',
          'Ottimizzazione ordine preferenze per algoritmo GPS',
          'Simulazione personalizzata dello scenario di nomina'
        ],
        prezzo: 29,
        evidenza: 'Dati reali sulle convocazioni'
      },
      {
        id: 'mobilita',
        titolo: 'Assegnazioni Provvisorie e Utilizzazioni',
        valore: 'Torna vicino a casa o ottieni la cattedra che desideri con una domanda di mobilità perfetta.',
        descrizione: 'Gestiamo l\'intera procedura di mobilità annuale, interprovinciale e provinciale. Ogni dettaglio è curato per massimizzare le tue possibilità.',
        dettagli: [
          'Verifica requisiti D.Lgs. 59/2017',
          'Calcolo preciso del punteggio mobilità e precedenze',
          'Compilazione domanda su POLIS',
          'Assistenza post-assegnazione'
        ],
        prezzo: 39,
        evidenza: 'Precedenze valorizzate'
      },
      {
        id: 'interpelli',
        titolo: 'Candidatura Interpelli',
        valore: 'Non perdere nessuna occasione: ti candidiamo a tutti gli interpelli disponibili per la tua classe di concorso.',
        descrizione: 'Predisponiamo e inviamo le candidature in risposta agli avvisi di selezione pubblicati dalle scuole. Monitoriamo costantemente i nuovi bandi.',
        dettagli: [
          'Ricerca mirata per provincia e classe di concorso',
          'Predisposizione curriculum e documentazione',
          'Invio candidatura tramite PEC o portale',
          'Monitoraggio e riscontro con la scuola'
        ],
        prezzo: 19,
        evidenza: 'Monitoraggio continuo'
      },
      {
        id: 'tesi-docenti',
        titolo: 'Consulenza Tesi e Elaborati',
        valore: 'Dalla scelta del topic alla discussione: ti guidiamo in ogni fase della tua tesi.',
        descrizione: 'Supporto specialistico nella stesura di tesi di laurea, elaborati finali e progetti di ricerca per docenti e aspiranti docenti. Metodo collaudato, risultato garantito.',
        dettagli: [
          'Scelta dell\'argomento e pianificazione della ricerca',
          'Redazione guidata con revisioni intermedie',
          'Formattazione secondo le linee guida dell\'ateneo',
          'Preparazione alla discussione e all\'esposizione'
        ],
        prezzo: 0,
        evidenza: 'Da concordare'
      },
    ]
  },
  {
    key: 'ata',
    label: 'Area ATA',
    descrizione: 'Supportiamo il personale Amministrativo, Tecnico e Ausiliario in ogni procedura: dall\'inserimento in graduatoria alla mobilità, dalla stabilizzazione ai ricorsi. Nessuna scadenza ti sfuggirà.',
    servizi: [
      {
        id: 'ata-3-fascia',
        titolo: 'Inserimento e Aggiornamento 3ª Fascia ATA',
        valore: 'Entra nelle graduatorie ATA con il profilo giusto e tutti i tuoi titoli correttamente dichiarati.',
        descrizione: 'Supporto tecnico completo per l\'inserimento nella terza fascia ATA. Ti aiutiamo a scegliere il profilo più adatto e a valorizzare ogni titolo disponibile.',
        dettagli: [
          'Riconoscimento titoli per profilo (AA/AT/CS/OS)',
          'Attestazione CIAD obbligatoria',
          'Inserimento servizi pregressi e titoli culturali',
          'Invio istanza su POLIS'
        ],
        prezzo: 39,
        evidenza: 'Profilo ottimizzato'
      },
      {
        id: 'ata-24-mesi',
        titolo: 'Graduatoria Permanente ATA 24 Mesi',
        valore: 'Accedi ai ruoli provinciali con il requisito dei 24 mesi: ti aiutiamo a ottenere ciò che ti spetta.',
        descrizione: 'Gestione completa dell\'istanza per l\'accesso ai ruoli provinciali del personale ATA che ha maturato almeno 24 mesi di servizio effettivo.',
        dettagli: [
          'Verifica requisito 24 mesi di servizio',
          'Calcolo punteggio titoli D.M. 89/2024',
          'Compilazione domanda su POLIS',
          'Assistenza ricorsi e accesso agli atti'
        ],
        prezzo: 29,
        evidenza: 'Requisiti verificati'
      },
      {
        id: 'mobilita-ata',
        titolo: 'Assegnazioni Provvisorie ATA',
        valore: 'Rientra nella tua provincia o ottieni la sede desiderata con una mobilità ATA senza errori.',
        descrizione: 'Assistenza completa per la mobilità annuale del personale ATA già in ruolo. Gestiamo ogni aspetto della domanda.',
        dettagli: [
          'Analisi requisiti mobilità personale ATA',
          'Compilazione domanda su POLIS',
          'Calcolo punteggio e priorità sociali',
          'Supporto ricongiungimento familiare'
        ],
        prezzo: 39,
        evidenza: 'Ricongiungimento garantito'
      },
    ]
  },
  {
    key: 'generali',
    label: 'Servizi Trasversali',
    descrizione: 'Servizi pensati per ogni esigenza: dal controllo delle pratiche già inviate alla consulenza rapida, dalla gestione dei ricorsi all\'assistenza su casi complessi e tesi universitarie.',
    servizi: [
      {
        id: 'revisione',
        titolo: 'Revisione e Check Pratiche',
        valore: 'Hai già inviato la domanda da solo? La controlliamo noi per scovare errori e omissioni.',
        descrizione: 'Analisi minuziosa delle istanze già inoltrate autonomamente. Rileviamo errori materiali, omissioni e dichiarazioni errate che potrebbero costarti il posto.',
        dettagli: [
          'Audit completo della domanda presentata',
          'Verifica corrispondenza titoli dichiarati e posseduti',
          'Report dettagliato con errori e correzioni',
          'Assistenza per la rettifica su POLIS'
        ],
        prezzo: 19,
        evidenza: 'Errori zero'
      },
      {
        id: 'chat',
        titolo: 'Consulenza Rapida via Chat',
        valore: 'Un dubbio urgente? Risposta in 60 minuti con un consulente specializzato.',
        descrizione: 'Canale di messaggistica diretto e prioritario per la risoluzione immediata di quesiti su contratti, scadenze e compilazione.',
        dettagli: [
          'Chat 1:1 con consulente specializzato',
          'Risposta entro 60 minuti in orario d\'ufficio',
          'Archivio storico della consulenza',
          'Riferimenti normativi allegati'
        ],
        prezzo: 0,
        evidenza: 'Risposta immediata'
      },
      {
        id: 'ricorsi',
        titolo: 'Ricorsi e Assistenza Legale',
        valore: 'Un punteggio errato ti esclude? Impugniamo ogni atto illegittimo con la massima competenza.',
        descrizione: 'Assistenza tecnica per ricorsi avverso punteggi errati, esclusioni dalle graduatorie e sanzioni. Analizziamo ogni caso con approccio personalizzato.',
        dettagli: [
          'Ricorso per esclusione dalle graduatorie',
          'Impugnazione punteggio errato',
          'Gestione sanzioni e abbandono supplenza',
          'Accesso agli atti e diffide'
        ],
        prezzo: 59,
        evidenza: 'Successo garantito'
      },
      {
        id: 'casi-complessi',
        titolo: 'Assistenza su Casi Specifici',
        valore: 'La tua situazione è particolare? Affrontiamola insieme con una consulenza su misura.',
        descrizione: 'Sessioni dedicate a casistiche complesse: calcolo congedi e maternità, superamento anno di prova, riserve di legge e interpretazioni normative articolate.',
        dettagli: [
          'Analisi normativa personalizzata',
          'Calcolo congedi maternità e permessi 150 ore',
          'Gestione anno di prova e riserve di legge',
          'Consulenza su interpretazioni normative'
        ],
        prezzo: 39,
        evidenza: 'Soluzione su misura'
      },
      {
        id: 'tesi-generali',
        titolo: 'Consulenza Tesi di Laurea',
        valore: 'Dalla progettazione alla stesura finale: realizza la tua tesi con un metodo efficace e collaudato.',
        descrizione: 'Supporto completo per la stesura di tesi di laurea, elaborati accademici e progetti di ricerca in ambito scolastico, pedagogico e formativo. Un percorso strutturato per un risultato eccellente.',
        dettagli: [
          'Definizione del progetto di tesi e indice',
          'Ricerca bibliografica e documentale assistita',
          'Revisioni periodiche con feedback dettagliato',
          'Preparazione alla discussione finale'
        ],
        prezzo: 0,
        evidenza: 'Da concordare'
      },
    ]
  },
];

export function findServizioById(id: string): Servizio | undefined {
  for (const cat of CATEGORIE_SERVIZI) {
    const found = cat.servizi.find(s => s.id === id);
    if (found) return found;
  }
}

export function getServiziByCategoria(categoria: CategoriaServizio): Servizio[] {
  return CATEGORIE_SERVIZI.find(c => c.key === categoria)?.servizi ?? [];
}
