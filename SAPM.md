SPORTELLOSCUOLA 2.0

SOLUTION ARCHITECTURE \& PROJECT MANAGEMENT (SAPM)

PARTE I

ASSESSMENT DEL PROGETTO (AS-IS)

CAPITOLO 1

METODOLOGIA DI ASSESSMENT

Comprendere lo stato attuale prima della trasformazione

\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_

1.1 Scopo dell’assessment

L’Assessment costituisce il punto di partenza dell’intero SAPM.

Prima di definire qualsiasi intervento evolutivo è necessario comprendere in modo sistematico lo stato corrente del progetto, identificando componenti, responsabilità, dipendenze e criticità.

L’obiettivo non è valutare la qualità del codice in termini assoluti, ma determinare il grado di allineamento tra l’implementazione esistente e l’Enterprise Master Architecture.

L’assessment rappresenta quindi il collegamento tra l’EMA e la futura Solution Architecture.

\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_

1.2 Obiettivi

L’Assessment persegue cinque obiettivi principali.

●	documentare lo stato reale del repository;

●	identificare le componenti già conformi all’EMA;

●	individuare gli elementi che richiedono rifattorizzazione;

●	evidenziare eventuali lacune funzionali o architetturali;

●	definire la base conoscitiva per la pianificazione dell’implementazione.

Ogni decisione successiva del SAPM dovrà derivare dalle evidenze raccolte in questa fase.

\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_

1.3 Principi metodologici

L’assessment viene condotto secondo alcuni principi fondamentali.

Oggettività

Le valutazioni si basano esclusivamente sugli elementi presenti nel repository e nella documentazione disponibile.

Tracciabilità

Ogni osservazione deve poter essere ricondotta a componenti, configurazioni o documenti esistenti.

Neutralità tecnologica

Le tecnologie utilizzate vengono descritte per il ruolo che svolgono, senza esprimere giudizi basati su preferenze personali.

Orientamento evolutivo

Le criticità individuate non rappresentano errori da correggere, ma opportunità di miglioramento nel percorso di evoluzione verso l’EMA.

\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_

1.4 Ambiti di analisi

L’assessment prende in considerazione l’intero ecosistema software.

Gli ambiti analizzati comprendono:

●	struttura del repository;

●	organizzazione del codice sorgente;

●	architettura frontend;

●	architettura backend;

●	database;

●	Edge Functions;

●	integrazioni esterne;

●	componenti AI;

●	pipeline di acquisizione della conoscenza;

●	configurazioni infrastrutturali;

●	documentazione tecnica;

●	strumenti di sviluppo e distribuzione.

L’analisi considera sia gli aspetti architetturali sia quelli organizzativi.

\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_

1.5 Livelli di osservazione

Per evitare una lettura esclusivamente tecnica, l’assessment viene articolato su quattro livelli.

Livello strategico

Verifica l’allineamento con i principi definiti nell’Enterprise Master Architecture.

Livello logico

Analizza responsabilità, domini funzionali e relazioni tra i componenti.

Livello applicativo

Esamina l’organizzazione dei moduli software, delle API e dei servizi.

Livello tecnologico

Documenta le piattaforme, gli strumenti e le configurazioni utilizzate.

Questa suddivisione consentirà di separare chiaramente architettura, soluzione e implementazione.

\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_

1.6 Criteri di valutazione

Ogni componente del progetto sarà valutato secondo gli stessi criteri.

●	responsabilità chiaramente definita;

●	coerenza con l’EMA;

●	livello di modularità;

●	possibilità di riutilizzo;

●	integrazione con gli altri componenti;

●	facilità di manutenzione;

●	capacità evolutiva.

L’applicazione uniforme di questi criteri garantirà confrontabilità tra i diversi ambiti analizzati.

\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_

1.7 Classificazione delle evidenze

Le osservazioni raccolte saranno classificate in quattro categorie.

Conforme

Il componente rispetta pienamente i principi dell’EMA e può essere mantenuto senza modifiche sostanziali.

Da consolidare

Il componente è corretto, ma necessita di una migliore integrazione o documentazione.

Da rifattorizzare

La responsabilità del componente è valida, ma la sua implementazione richiede una riorganizzazione.

Da riprogettare

Il componente non risponde più ai principi architetturali definiti e dovrà essere sostituito o ripensato.

Questa classificazione guiderà le priorità del Project Management.

\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_

1.8 Output dell’assessment

L’assessment produrrà tre risultati principali.

Inventario Architetturale

Elenco completo dei componenti software e infrastrutturali.

Matrice di Allineamento con l’EMA

Relazione tra componenti esistenti e principi architetturali.

Backlog Architetturale

Elenco strutturato delle attività di consolidamento, rifattorizzazione e sviluppo.

Questi documenti costituiranno la base della Solution Architecture e della pianificazione operativa.

\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_

1.9 Relazione con l’Enterprise Master Architecture

L’Assessment non modifica l’EMA.

L’Enterprise Master Architecture rimane il riferimento strategico dell’intero ecosistema.

Il SAPM utilizza l’EMA come criterio di interpretazione dello stato attuale e come destinazione dell’evoluzione progettuale.

Ogni osservazione formulata nell’assessment deve quindi essere letta in funzione dell’obiettivo architetturale definito dall’EMA.

\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_

1.10 Obiettivo finale

L’Assessment del progetto deve fornire una rappresentazione completa, oggettiva e verificabile dello stato attuale di SportelloScuola 2.0, creando le condizioni per una trasformazione progressiva, controllata e pienamente coerente con l’Enterprise Master Architecture.

\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_

Conclusione del Capitolo 1

Con questo capitolo viene definito il metodo con cui sarà analizzato il progetto esistente. L’assessment non costituisce una verifica tecnica fine a sé stessa, ma il primo passo del percorso di trasformazione che porterà l’implementazione attuale a convergere verso il modello architetturale descritto nell’EMA.



SPORTELLOSCUOLA 2.0

SOLUTION ARCHITECTURE \& PROJECT MANAGEMENT (SAPM)

PARTE I

ASSESSMENT DEL PROGETTO (AS-IS)

CAPITOLO 2

ANALISI DELLA STRUTTURA DEL REPOSITORY

Il contenitore fisico dell’architettura

\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_

2.1 Visione

Il repository costituisce il punto di ingresso dell’intero ecosistema software.

Esso non rappresenta semplicemente una raccolta di file, ma la traduzione fisica delle decisioni architetturali adottate durante l’evoluzione del progetto.

Una struttura ordinata del repository facilita lo sviluppo, la manutenzione, la collaborazione tra i membri del team e la tracciabilità delle modifiche.

L’analisi della sua organizzazione consente quindi di comprendere il grado di maturità dell’implementazione prima ancora di esaminare il codice.

\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_

2.2 Obiettivo

L’obiettivo dell’analisi è verificare che l’organizzazione fisica del repository rifletta la suddivisione logica definita dall’Enterprise Master Architecture.

La struttura dovrà favorire:

●	separazione delle responsabilità;

●	modularità;

●	evoluzione indipendente dei componenti;

●	facilità di manutenzione;

●	chiarezza per nuovi sviluppatori.

\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_

2.3 Stato attuale

L’analisi del repository evidenzia la presenza di una struttura già articolata e orientata allo sviluppo collaborativo.

Sono presenti elementi riconducibili a differenti livelli dell’ecosistema:

●	codice applicativo;

●	configurazioni di piattaforma;

●	documentazione tecnica;

●	gestione del deployment;

●	backend Supabase;

●	componenti AI;

●	repository Git.

Questa organizzazione dimostra che il progetto ha già superato la fase di prototipo iniziale.

\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_

2.4 Livelli del repository

Dal punto di vista architetturale il repository può essere interpretato come composto da quattro livelli.

Livello 1 — Governance del progetto

Comprende gli elementi necessari alla gestione del ciclo di vita del software.

Tra questi:

●	repository Git;

●	documentazione;

●	configurazioni generali;

●	strumenti di collaborazione.

Questo livello governa il progetto ma non implementa funzionalità.

\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_

Livello 2 — Applicazione

Comprende il codice sorgente del frontend e dei moduli condivisi.

Rappresenta il punto di contatto tra gli utenti e i servizi applicativi descritti nell’EMA.

\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_

Livello 3 — Servizi di piattaforma

Comprende le componenti dedicate al backend.

Nel progetto attuale questo livello è rappresentato principalmente da Supabase e dalle relative Edge Functions.

Esso implementa i servizi condivisi necessari all’ecosistema.

\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_

Livello 4 — Componenti di supporto

Comprende tutti gli elementi che rendono possibile il funzionamento del progetto senza appartenere direttamente alla logica di business.

Ad esempio:

●	configurazioni;

●	automazioni;

●	strumenti di build;

●	pipeline;

●	monitoraggio.

\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_

2.5 Coerenza con l’EMA

La struttura del repository risulta complessivamente coerente con la separazione dei livelli definita nell’Enterprise Master Architecture.

Tuttavia, l’allineamento è ancora implicito.

Molte responsabilità risultano correttamente implementate ma non ancora esplicitamente documentate.

Il SAPM avrà il compito di rendere questa corrispondenza evidente.

\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_

2.6 Punti di forza

L’analisi evidenzia diversi elementi positivi.

●	utilizzo di un sistema di versionamento consolidato;

●	presenza di documentazione tecnica;

●	separazione tra frontend e backend;

●	integrazione con servizi cloud;

●	struttura predisposta per l’evoluzione.

Questi aspetti riducono il rischio di rifattorizzazioni radicali.

\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_

2.7 Aree di miglioramento

L’assessment individua alcune opportunità evolutive.

In particolare:

●	rendere esplicite le responsabilità delle directory;

●	uniformare le convenzioni organizzative;

●	distinguere maggiormente configurazione e logica applicativa;

●	rafforzare la documentazione architetturale.

Si tratta di interventi di consolidamento, non di ricostruzione.

\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_

2.8 Classificazione dell’assessment

Secondo la metodologia definita nel Capitolo 1, la struttura del repository viene classificata come:

Stato: Da consolidare

Motivazione:

La struttura è già adeguata ad un progetto enterprise, ma necessita di una documentazione architetturale che renda immediatamente comprensibili ruoli, responsabilità e dipendenze dei diversi livelli.

\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_

2.9 Impatto sul SAPM

L’organizzazione del repository costituirà il riferimento per tutte le successive parti del documento.

Ogni componente analizzato nei capitoli successivi verrà ricondotto alla propria posizione fisica all’interno del repository, mantenendo una corrispondenza costante tra architettura logica e implementazione reale.

Questa tracciabilità faciliterà sia lo sviluppo sia la manutenzione del progetto.

\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_

2.10 Obiettivo finale

La struttura del repository dovrà evolvere fino a rappresentare in modo chiaro e stabile l’architettura dell’ecosistema, consentendo a ogni sviluppatore di individuare rapidamente la posizione e la responsabilità di ciascun componente.

\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_

Conclusione del Capitolo 2

L’analisi conferma che il repository costituisce una base solida per l’evoluzione di SportelloScuola 2.0. La struttura esistente non richiede una riorganizzazione radicale, ma un processo di consolidamento che renda esplicita la relazione tra organizzazione fisica del codice e principi definiti nell’Enterprise Master Architecture.



SPORTELLOSCUOLA 2.0

SOLUTION ARCHITECTURE \& PROJECT MANAGEMENT (SAPM)

PARTE I

ASSESSMENT DEL PROGETTO (AS-IS)

CAPITOLO 3

ANALISI DEI CANALI DI ACCESSO E DEL FRONTEND

Il punto di ingresso dell’ecosistema

\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_

3.1 Visione

Il frontend rappresenta il livello attraverso il quale utenti, operatori e amministratori interagiscono con l’ecosistema.

Dal punto di vista architetturale esso non costituisce il luogo in cui risiede la logica di business, ma il componente responsabile della presentazione delle informazioni, della gestione dell’interazione e dell’orchestrazione delle richieste verso i servizi applicativi.

Il frontend traduce quindi i principi definiti nell’Enterprise Master Architecture in un’esperienza concreta per l’utente.

\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_

3.2 Obiettivo

L’analisi del frontend ha lo scopo di verificare che il livello di presentazione:

●	mantenga una chiara separazione dalla logica applicativa;

●	favorisca un’esperienza utente coerente;

●	supporti l’evoluzione dell’ecosistema;

●	rimanga indipendente dalle implementazioni del backend.

Un frontend ben progettato deve poter evolvere senza modificare i principi architetturali dell’EMA.

\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_

3.3 Stato attuale

L’analisi del repository evidenzia un’applicazione sviluppata con un moderno stack frontend basato su React, TypeScript e Vite.

La struttura del progetto mostra una suddivisione tra:

●	pagine;

●	componenti riutilizzabili;

●	librerie condivise;

●	gestione dello stato;

●	servizi di supporto.

Questa organizzazione costituisce una buona base per un’architettura modulare.

\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_

3.4 Ruolo architetturale

Nel modello definito dall’EMA il frontend implementa il blocco dei Canali di Accesso.

Le sue responsabilità comprendono:

●	presentazione delle informazioni;

●	raccolta degli input;

●	navigazione tra i servizi;

●	gestione dell’identità dell’utente;

●	orchestrazione delle richieste.

Non rientrano invece nelle sue responsabilità:

●	regole di business;

●	gestione della conoscenza;

●	elaborazione dell’intelligenza artificiale;

●	persistenza dei dati.

Questa distinzione dovrà essere mantenuta durante tutta l’evoluzione del progetto.

\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_

3.5 Modularità

La presenza di componenti riutilizzabili rappresenta uno degli elementi più positivi dell’implementazione attuale.

La modularità consente:

●	riuso dell’interfaccia;

●	riduzione delle duplicazioni;

●	maggiore uniformità grafica;

●	evoluzione indipendente dei moduli.

L’EMA individua proprio nella modularità uno dei principi fondamentali della sostenibilità architetturale.

\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_

3.6 Gestione dello stato

L’organizzazione del progetto evidenzia l’esistenza di meccanismi dedicati alla gestione dello stato applicativo.

Dal punto di vista architetturale questo livello deve avere una responsabilità limitata.

Lo stato del frontend deve rappresentare esclusivamente il contesto della sessione utente e le informazioni necessarie all’interazione.

La conoscenza persistente rimane invece di competenza del patrimonio informativo descritto nell’EMA.

Questa distinzione riduce il rischio di duplicazioni e incoerenze.

\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_

3.7 Comunicazione con il backend

L’analisi evidenzia una comunicazione orientata ai servizi offerti da Supabase e dalle relative Edge Functions.

Dal punto di vista della Solution Architecture tale comunicazione dovrà essere progressivamente ricondotta a un livello di servizi applicativi ben definiti.

Il frontend non dovrà conoscere i dettagli implementativi del backend, ma esclusivamente le responsabilità dei servizi che utilizza.

Questa separazione favorisce l’evoluzione indipendente delle due componenti.

\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_

3.8 Esperienza utente

Il progetto mostra già una particolare attenzione alla semplicità di utilizzo.

Questo elemento è pienamente coerente con uno dei principi fondanti dell’EMA: ridurre il costo cognitivo dell’utente.

Ogni futura evoluzione del frontend dovrà continuare a perseguire:

●	chiarezza;

●	coerenza;

●	prevedibilità;

●	accessibilità;

●	continuità dell’esperienza.

Il frontend costituisce infatti la manifestazione più evidente della qualità percepita dell’intero ecosistema.

\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_

3.9 Esito dell’assessment

Classificazione: Conforme con elementi da consolidare

Motivazioni

Il frontend presenta:

●	una buona modularità;

●	uno stack tecnologico moderno;

●	una struttura predisposta alla crescita.

Le principali attività di consolidamento riguarderanno:

●	esplicitazione delle responsabilità dei componenti;

●	migliore separazione tra logica di presentazione e logica applicativa;

●	standardizzazione delle convenzioni architetturali;

●	documentazione delle interfacce tra frontend e backend.

Non emergono criticità tali da richiedere una rifattorizzazione strutturale.

\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_

3.10 Obiettivo finale

Il frontend dovrà evolvere fino a diventare una rappresentazione fedele dei Canali di Accesso definiti nell’Enterprise Master Architecture, offrendo un’esperienza uniforme, accessibile e indipendente dalle implementazioni tecnologiche del backend.

\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_

Conclusione del Capitolo 3

L’analisi conferma che il livello di presentazione costituisce uno dei punti più maturi del progetto. La struttura adottata è coerente con i principi di modularità e separazione delle responsabilità definiti nell’EMA. Gli interventi futuri riguarderanno prevalentemente il consolidamento delle interfacce applicative e la formalizzazione delle responsabilità, senza richiedere modifiche sostanziali all’architettura del frontend.



SPORTELLOSCUOLA 2.0

SOLUTION ARCHITECTURE \& PROJECT MANAGEMENT (SAPM)

PARTE I

ASSESSMENT DEL PROGETTO (AS-IS)

CAPITOLO 4

ANALISI DEL LIVELLO APPLICATIVO

Dalla struttura del codice ai Servizi Applicativi

\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_

4.1 Visione

Il livello applicativo rappresenta il nucleo funzionale del sistema.

È il punto in cui le richieste provenienti dai Canali di Accesso vengono trasformate in servizi utili per l’utente, coordinando dati, logiche e interazioni con il backend.

Dal punto di vista dell’Enterprise Master Architecture, esso costituisce l’implementazione concreta dei Servizi Applicativi, mantenendo separata la logica di business dalle tecnologie utilizzate.

\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_

4.2 Obiettivo

L’obiettivo dell’assessment è verificare che il livello applicativo presenti una struttura coerente con il modello definito nell’EMA, assicurando:

●	chiara identificazione delle responsabilità;

●	assenza di sovrapposizioni funzionali;

●	elevata modularità;

●	facilità di evoluzione;

●	integrazione con i motori trasversali e il patrimonio informativo.

\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_

4.3 Stato attuale

L’analisi del repository evidenzia un’applicazione costruita intorno a moduli funzionali che collaborano tra loro attraverso componenti condivisi, servizi e librerie comuni.

Questa impostazione dimostra una buona predisposizione alla crescita, ma riflette ancora un’organizzazione principalmente orientata al codice piuttosto che ai domini applicativi.

L’architettura funzionale esiste, ma non è ancora esplicitata.

\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_

4.4 Organizzazione delle responsabilità

L’implementazione mostra una distinzione tra:

●	interfacce utente;

●	componenti riutilizzabili;

●	servizi di supporto;

●	gestione dello stato;

●	accesso ai dati.

Questa separazione costituisce una base solida.

Tuttavia, alcune responsabilità risultano distribuite su più livelli applicativi, rendendo meno immediata la comprensione dei confini funzionali.

Nel SAPM tali responsabilità verranno ricondotte ai domini definiti nell’EMA.

\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_

4.5 Coerenza con l’Enterprise Master Architecture

L’EMA definisce i Servizi Applicativi come unità funzionali autonome.

Nel progetto attuale tali servizi sono già presenti in forma implicita.

Ad esempio, le funzionalità dedicate alla consultazione normativa, alla gestione delle informazioni e ai servizi personalizzati risultano distribuite tra pagine, componenti e servizi.

Il processo di evoluzione non richiederà la riscrittura di tali funzionalità, ma la loro ricomposizione in domini chiaramente identificabili.

\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_

4.6 Modularità applicativa

La modularità rappresenta uno degli aspetti più maturi dell’implementazione.

L’utilizzo di componenti riutilizzabili e di librerie condivise riduce la duplicazione del codice e facilita l’introduzione di nuove funzionalità.

Dal punto di vista architetturale, il passo successivo consiste nel trasformare questa modularità tecnica in modularità di dominio.

Ogni modulo dovrà rappresentare una responsabilità dell’ecosistema, non soltanto una porzione di codice.

\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_

4.7 Gestione delle dipendenze

L’analisi evidenzia una collaborazione tra moduli applicativi e servizi condivisi.

Per mantenere la sostenibilità dell’architettura sarà necessario rafforzare il principio di dipendenza unidirezionale.

I moduli applicativi dovranno dipendere esclusivamente da interfacce e servizi condivisi, evitando accoppiamenti diretti con dettagli implementativi del backend o dell’infrastruttura.

Questa scelta renderà il sistema più facilmente manutenibile ed estendibile.

\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_

4.8 Opportunità di consolidamento

L’assessment individua alcune aree di miglioramento.

In particolare:

●	rendere espliciti i domini applicativi;

●	documentare le responsabilità di ciascun servizio;

●	standardizzare le modalità di comunicazione tra moduli;

●	ridurre la conoscenza reciproca tra componenti.

Questi interventi non modificano il comportamento dell’applicazione, ma ne aumentano la leggibilità e la capacità evolutiva.

\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_

4.9 Esito dell’assessment

Classificazione: Da consolidare

Motivazioni

Il livello applicativo presenta una struttura già coerente con i principi dell’EMA, ma necessita di una formalizzazione dei domini funzionali.

Le principali attività riguarderanno:

●	identificazione dei Servizi Applicativi;

●	definizione delle responsabilità;

●	standardizzazione delle interfacce;

●	riduzione delle dipendenze non necessarie.

Non si evidenziano elementi che richiedano una riprogettazione completa.

\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_

4.10 Obiettivo finale

Il livello applicativo dovrà evolvere fino a rappresentare in modo diretto i Servizi Applicativi definiti nell’Enterprise Master Architecture, consentendo a ogni dominio funzionale di operare come un’unità autonoma, chiaramente identificabile e facilmente evolvibile.

\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_

Conclusione del Capitolo 4

L’analisi conferma che il progetto dispone già di una buona organizzazione applicativa, costruita attraverso componenti modulari e servizi condivisi. Il principale intervento richiesto riguarda la trasformazione dell’attuale struttura tecnica in una struttura orientata ai domini, rendendo esplicita la corrispondenza tra codice sorgente e Servizi Applicativi dell’EMA.



SPORTELLOSCUOLA 2.0

SOLUTION ARCHITECTURE \& PROJECT MANAGEMENT (SAPM)

PARTE I

ASSESSMENT DEL PROGETTO (AS-IS)

CAPITOLO 5

ANALISI DEL BACKEND APPLICATIVO

Le capacità di piattaforma dell’ecosistema

\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_

5.1 Visione

Il backend costituisce il livello operativo dell’ecosistema.

Esso fornisce ai Servizi Applicativi le capacità necessarie per gestire dati, autenticazione, logiche server-side, integrazioni e comunicazione con le fonti esterne.

Dal punto di vista dell’EMA il backend non coincide con un singolo prodotto tecnologico, ma rappresenta l’insieme delle capacità che sostengono il funzionamento dell’ecosistema.

Nel progetto attuale tali capacità sono prevalentemente implementate attraverso Supabase.

\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_

5.2 Obiettivo

L’assessment ha lo scopo di verificare che il backend:

●	centralizzi le responsabilità condivise;

●	mantenga separata la logica applicativa dalla tecnologia;

●	favorisca l’evoluzione indipendente dei servizi;

●	costituisca una piattaforma comune per tutti i prodotti dell’ecosistema.

\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_

5.3 Stato attuale

L’analisi del repository evidenzia un backend costruito attorno ad un insieme integrato di servizi.

Le principali capacità individuate sono:

●	persistenza dei dati;

●	autenticazione;

●	esecuzione di funzioni server-side;

●	integrazione con servizi esterni;

●	automazione dei processi;

●	gestione delle configurazioni.

L’implementazione risulta già orientata ad un modello serverless, coerente con gli obiettivi di scalabilità del progetto.

\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_

5.4 Capacità della piattaforma

Dal punto di vista architetturale il backend può essere suddiviso in cinque macro-capacità.

Data Capability

Responsabile della gestione persistente delle informazioni.

Comprende:

●	database;

●	relazioni;

●	migrazioni;

●	consistenza dei dati.

Questa capacità realizza il Patrimonio Informativo definito nell’EMA.

\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_

Identity Capability

Responsabile dell’identificazione degli utenti.

Comprende:

●	autenticazione;

●	gestione delle sessioni;

●	autorizzazione;

●	controllo degli accessi.

Questa capacità supporta tutti i Canali di Accesso.

\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_

Compute Capability

Responsabile dell’elaborazione lato server.

Comprende:

●	Edge Functions;

●	automazioni;

●	orchestrazione delle operazioni;

●	integrazione tra componenti.

Questa capacità implementa gran parte dei Servizi Applicativi.

\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_

Storage Capability

Responsabile della gestione dei contenuti persistenti non strutturati.

Comprende:

●	documenti;

●	allegati;

●	file;

●	risorse condivise.

Questa capacità estende il Patrimonio Informativo.

\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_

Integration Capability

Responsabile della comunicazione con sistemi esterni.

Comprende:

●	servizi email;

●	AI;

●	fonti informative;

●	webhook;

●	API esterne.

Questa capacità implementa il collegamento con le Fonti Esterne dell’EMA.

\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_

5.5 Analisi delle Edge Functions

L’analisi del repository evidenzia la presenza di funzioni serverless dedicate.

Dal punto di vista architetturale esse rappresentano uno dei punti di forza del progetto.

Le Edge Functions consentono infatti di:

●	isolare le responsabilità;

●	ridurre l’accoppiamento;

●	automatizzare processi;

●	integrare servizi esterni.

Tuttavia, esse risultano oggi organizzate prevalentemente per esigenza tecnica.

Nel SAPM verranno ricondotte ai rispettivi domini applicativi.

\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_

5.6 Separazione delle responsabilità

L’implementazione mostra una buona distinzione tra:

●	frontend;

●	backend;

●	automazioni.

Tale distinzione dovrà essere ulteriormente rafforzata evitando che la logica di dominio venga distribuita tra componenti differenti.

L’obiettivo è rendere ogni responsabilità identificabile in un solo punto dell’architettura.

\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_

5.7 Punti di forza

L’assessment evidenzia diversi elementi particolarmente positivi.

●	utilizzo di un backend gestito e scalabile;

●	presenza di funzioni serverless;

●	buona integrazione tra servizi;

●	predisposizione all’automazione;

●	architettura favorevole all’evoluzione.

Questi elementi costituiscono una base molto solida.

\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_

5.8 Opportunità di consolidamento

Le principali attività evolutive riguarderanno:

●	classificazione delle Edge Functions per dominio;

●	standardizzazione delle API interne;

●	documentazione delle responsabilità;

●	separazione più esplicita tra logica di business e logica infrastrutturale;

●	introduzione di una tassonomia uniforme dei servizi backend.

Si tratta di interventi di consolidamento architetturale e non di sostituzione tecnologica.

\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_

5.9 Esito dell’assessment

Classificazione: Conforme con elementi da consolidare

Motivazioni

Il backend implementa già molte delle capacità previste dall’EMA.

Le attività future riguarderanno prevalentemente:

●	formalizzazione dell’architettura;

●	maggiore chiarezza dei domini;

●	documentazione delle interfacce;

●	miglioramento della governance tecnica.

L’infrastruttura esistente può essere mantenuta come fondamento della futura Solution Architecture.

\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_

5.10 Obiettivo finale

Il backend dovrà evolvere da insieme di servizi tecnici a piattaforma di capacità condivise, nella quale ogni componente implementi una responsabilità chiaramente definita e direttamente riconducibile all’Enterprise Master Architecture.

\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_

Conclusione del Capitolo 5

L’analisi conferma che il backend rappresenta uno degli elementi più maturi del progetto. L’utilizzo di un modello serverless, la presenza di capacità integrate e l’adozione di servizi condivisi costituiscono una base coerente con l’Enterprise Master Architecture. Gli interventi futuri saranno orientati principalmente al consolidamento delle responsabilità e alla formalizzazione delle relazioni tra i diversi componenti.



SPORTELLOSCUOLA 2.0

SOLUTION ARCHITECTURE \& PROJECT MANAGEMENT (SAPM)

PARTE I – ASSESSMENT DEL PROGETTO (AS-IS)

CAPITOLO 6

IL PATRIMONIO INFORMATIVO

Traduzione del Canonical Data Model nell’implementazione attuale

\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_

6.1 Ruolo strategico del Patrimonio Informativo

Nell’Enterprise Master Architecture il Patrimonio Informativo costituisce il nucleo permanente dell’ecosistema digitale. Tutti i servizi, i prodotti e le funzionalità si sviluppano attorno ad esso, condividendo un unico insieme di informazioni coerenti e governate.

Il repository conferma questa impostazione: la piattaforma utilizza un database relazionale centralizzato che rappresenta il punto di convergenza delle informazioni persistenti. Tuttavia, l’organizzazione attuale riflette prevalentemente esigenze implementative; il SAPM ha il compito di reinterpretarla come un vero Patrimonio Informativo condiviso, coerente con il Canonical Data Model definito nell’EMA.

Da questo momento, quindi, il database non verrà più considerato un semplice componente tecnologico, ma l’implementazione fisica di un modello informativo unico, destinato a essere condiviso da tutti i prodotti dell’ecosistema.

\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_

6.2 Obiettivi dell’assessment

L’analisi del patrimonio informativo persegue quattro obiettivi fondamentali:

●	verificare la presenza di un’unica fonte autorevole dei dati (Single Source of Truth);

●	valutare la corrispondenza tra modello dati e domini funzionali dell’EMA;

●	analizzare il livello di evolvibilità dello schema informativo;

●	predisporre il modello dati all’evoluzione verso il Knowledge Graph.

L’assessment non valuta soltanto la correttezza tecnica delle tabelle o delle relazioni, ma soprattutto la loro capacità di sostenere la crescita dell’intero ecosistema.

\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_

6.3 Analisi dello stato attuale

L’implementazione attuale adotta un modello basato su PostgreSQL gestito tramite Supabase, con evoluzione dello schema affidata a migration versionate.

Questa scelta presenta numerosi vantaggi architetturali:

●	evoluzione controllata dello schema;

●	riproducibilità degli ambienti;

●	versionamento delle modifiche;

●	possibilità di rollback;

●	integrazione con i processi di Continuous Delivery.

Dal punto di vista del SAPM, tali caratteristiche costituiscono una solida base per la costruzione di una piattaforma enterprise.

L’elemento che richiederà un consolidamento non riguarda la tecnologia adottata, bensì la rappresentazione esplicita dei domini informativi.

\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_

6.4 Dall’implementazione al Canonical Data Model

L’EMA definisce il Canonical Data Model come il modello logico comune dell’intero ecosistema.

Ciò implica che ogni entità persistente debba rappresentare un concetto del dominio scolastico e non una semplice esigenza implementativa.

Nel processo evolutivo descritto dal SAPM, ogni tabella verrà progressivamente ricondotta a uno dei domini fondamentali del sistema, quali:

●	utenti;

●	istituzioni scolastiche;

●	personale scolastico;

●	normativa;

●	documentazione;

●	eventi;

●	comunicazioni;

●	conoscenza.

In questo modo il modello fisico e quello logico convergeranno progressivamente.

\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_

6.5 Classificazione delle informazioni

Per garantire una governance efficace, il patrimonio informativo viene suddiviso in quattro macro-categorie.

Informazioni di dominio

Costituiscono il nucleo permanente della conoscenza dell’ecosistema e rappresentano gli oggetti fondamentali del modello informativo.

Informazioni operative

Supportano l’esecuzione dei processi applicativi e descrivono lo stato corrente delle attività.

Informazioni tecniche

Comprendono configurazioni, log applicativi, code di elaborazione, cache, metadati e informazioni necessarie al funzionamento della piattaforma.

Informazioni analitiche

Sono utilizzate per il monitoraggio dei KPI, delle performance, della qualità dei dati e dell’efficacia dei servizi.

Questa classificazione costituirà la base della futura Data Governance.

\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_

6.6 Evoluzione verso il Knowledge Graph

Uno degli obiettivi principali dell’EMA consiste nella realizzazione di un Knowledge Graph condiviso.

Il SAPM interpreta tale obiettivo come un’evoluzione naturale del patrimonio informativo esistente.

Non verrà costruito un secondo archivio separato, ma sarà progressivamente introdotto un livello semantico capace di rappresentare le relazioni tra persone, documenti, eventi, norme, processi e prodotti.

Il Knowledge Graph diventerà così il livello logico superiore del Canonical Data Model, consentendo ai motori AI, ai servizi applicativi e ai futuri prodotti dell’ecosistema di condividere la stessa rappresentazione della conoscenza.

\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_

6.7 Decisione architetturale

Capability

Enterprise Data Platform

Responsabilità

Costituire l’unica fonte autorevole delle informazioni dell’ecosistema, garantendone qualità, integrità, evolvibilità e condivisione.

Pattern architetturale

Canonical Data Model implementato su database relazionale estensibile mediante metadati semantici.

Provider attuale

Supabase (PostgreSQL gestito).

Evoluzione prevista

Il provider rappresenta un dettaglio implementativo. L’architettura rimane indipendente dalla piattaforma utilizzata, purché questa supporti il modello dati definito dall’EMA, il versionamento delle migrazioni, la governance delle informazioni e l’evoluzione verso il Knowledge Graph.

6.8 Prima Architectural Traceability Matrix (ATM)



Riferimento EMA	Implementazione SAPM	Repository	OpenProject

Canonical Data Model	Enterprise Data Platform	Migration SQL, schema database	Capability “Data Platform”

Knowledge Graph	Semantic Layer	Tabelle, relazioni e metadati	Epic “Knowledge Graph”

Data Governance	Governance dei dati	Politiche di schema e versionamento	Epic “Data Governance”

Universal Product Framework	Modello dati condiviso	Entità comuni	Feature “Shared Domain Model”



Questa matrice inaugura il meccanismo di tracciabilità che accompagnerà tutto il SAPM e permetterà di collegare ogni decisione architetturale alle corrispondenti attività di implementazione.

\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_

6.9 Esito dell’assessment

Classificazione: Conforme con elementi da consolidare

Motivazioni

L’adozione di un database relazionale gestito, il versionamento delle migrazioni e la centralizzazione della persistenza costituiscono una base pienamente coerente con l’Enterprise Master Architecture.

Gli interventi di consolidamento riguarderanno principalmente:

●	formalizzazione del Canonical Data Model;

●	classificazione sistematica delle entità di dominio;

●	introduzione del livello semantico;

●	predisposizione del Knowledge Graph;

●	rafforzamento della Data Governance.

Non si evidenziano criticità tali da richiedere una riprogettazione della piattaforma dati.

\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_

6.10 Conclusioni

Il patrimonio informativo rappresenta l’asset più stabile dell’intero ecosistema SportelloScuola 2.0. La sua evoluzione non consisterà nella sostituzione della tecnologia oggi adottata, bensì nella progressiva formalizzazione del modello informativo, affinché ogni servizio applicativo, ogni motore AI e ogni futuro prodotto possano operare sulla stessa base conoscitiva condivisa, realizzando pienamente i principi del Canonical Data Model e del Knowledge Graph definiti nell’Enterprise Master Architecture.

SPORTELLOSCUOLA 2.0

SOLUTION ARCHITECTURE \& PROJECT MANAGEMENT (SAPM)

PARTE I – ASSESSMENT DEL PROGETTO (AS-IS)

CAPITOLO 7

ARCHITETTURA DELL’INTELLIGENZA ARTIFICIALE

Analisi delle capacità cognitive della piattaforma

\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_

7.1 Visione

L’Intelligenza Artificiale rappresenta uno dei principali elementi distintivi dell’ecosistema SportelloScuola 2.0.

Nell’Enterprise Master Architecture essa non costituisce un servizio autonomo né un semplice componente software, ma un insieme di capacità trasversali che supportano tutti i prodotti della piattaforma.

L’AI deve quindi essere considerata una Capability condivisa, capace di assistere gli utenti, elaborare la conoscenza, supportare i processi decisionali e migliorare continuamente la qualità dei servizi.

Il repository evidenzia già la presenza di integrazioni con modelli linguistici e servizi di elaborazione automatica, che rappresentano una base concreta per la costruzione dell’AI Core previsto dall’EMA.

\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_

7.2 Obiettivi dell’assessment

L’analisi dell’architettura AI ha lo scopo di verificare:

●	il livello di integrazione dell’AI nei processi applicativi;

●	la separazione tra logica di business e modelli linguistici;

●	la predisposizione all’orchestrazione di più provider;

●	la gestione del contesto e della conoscenza;

●	la qualità e la verificabilità delle risposte generate.

L’obiettivo non consiste nell’analizzare il modello linguistico utilizzato, bensì la capacità dell’ecosistema di integrare l’AI in modo governato, evolutivo e verificabile.

\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_

7.3 Stato attuale

L’analisi del progetto evidenzia una prima integrazione di servizi di Intelligenza Artificiale destinati principalmente al supporto informativo e all’elaborazione di contenuti.

L’architettura attuale presenta già alcuni elementi favorevoli:

●	separazione tra frontend e logica AI;

●	utilizzo di servizi backend per l’interazione con i modelli;

●	possibilità di evoluzione verso un’architettura multi-provider.

Tuttavia, tali capacità risultano ancora concentrate nelle singole implementazioni e non completamente organizzate come piattaforma condivisa.

\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_

7.4 AI come Platform Capability

Nel modello architetturale definito dall’EMA l’AI Core costituisce un servizio condiviso dell’intero ecosistema.

Le sue responsabilità comprendono:

●	interpretazione delle richieste;

●	recupero della conoscenza;

●	orchestrazione dei modelli linguistici;

●	generazione controllata delle risposte;

●	supporto ai servizi applicativi;

●	collaborazione con il Knowledge Graph.

L’AI non deve contenere logiche di dominio proprie, ma operare utilizzando esclusivamente il patrimonio informativo governato dalla piattaforma.

\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_

7.5 Separazione delle responsabilità

Per garantire affidabilità e governabilità, il SAPM distingue chiaramente quattro livelli.

Livello Cognitivo

Comprende i modelli linguistici e le capacità di ragionamento.

Livello di Orchestrazione

Coordina provider, prompt, contesto e strategie di elaborazione.

Livello della Conoscenza

Recupera le informazioni dal Knowledge Graph e dal Canonical Data Model.

Livello Applicativo

Utilizza le capacità AI per offrire servizi agli utenti.

Questa separazione riduce il rischio di dipendenze tecnologiche e rende l’ecosistema più facilmente evolvibile.

\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_

7.6 Evoluzione verso l’AI Core

L’EMA prevede la realizzazione di un AI Core unico e condiviso.

Il SAPM interpreta questo obiettivo come l’evoluzione naturale dell’implementazione esistente.

Le principali capacità dell’AI Core comprenderanno:

●	gestione centralizzata dei prompt;

●	orchestrazione dei modelli;

●	gestione del contesto;

●	integrazione con il Knowledge Graph;

●	validazione delle risposte;

●	osservabilità delle elaborazioni;

●	controllo dei costi e delle prestazioni.

Ogni prodotto dell’ecosistema utilizzerà queste capacità senza implementarne versioni autonome.

\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_

7.7 Decisione architetturale

Capability

Enterprise AI Core

Responsabilità

Fornire servizi cognitivi condivisi a tutti i prodotti dell’ecosistema.

Pattern architetturale

AI Orchestrator indipendente dai provider, integrato con Knowledge Graph, Canonical Data Model e servizi applicativi.

Provider

Nessun provider viene considerato parte integrante dell’architettura.

L’AI Core dovrà poter utilizzare uno o più modelli linguistici attraverso interfacce standardizzate.

La scelta dei provider sarà documentata nella Parte III – Technology Architecture e potrà essere rivista nel tempo senza modificare la struttura logica della piattaforma.

\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_

7.8 Architectural Traceability Matrix (ATM)



EMA	SAPM	Repository	OpenProject

AI Core	Enterprise AI Core	Edge Functions, servizi AI	Capability “AI Platform”

Knowledge Graph	Context Retrieval	Modello dati e pipeline	Epic “Knowledge Graph Integration”

Quality Engine	AI Validation	Moduli di verifica	Epic “AI Quality”

Universal Product Framework	Servizi cognitivi condivisi	API AI	Feature “Shared AI Services”



7.9 Esito dell’assessment

Classificazione: Da consolidare

Motivazioni

L’implementazione attuale dimostra una buona predisposizione all’utilizzo dell’Intelligenza Artificiale, ma richiede una maggiore formalizzazione delle responsabilità architetturali.

Le principali attività riguarderanno:

●	centralizzazione dell’AI Core;

●	separazione tra orchestrazione e provider;

●	gestione condivisa del contesto;

●	integrazione completa con il Knowledge Graph;

●	introduzione di meccanismi di osservabilità e controllo qualità.

\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_

7.10 Conclusioni

L’architettura AI rappresenta l’elemento destinato a differenziare maggiormente SportelloScuola 2.0 rispetto alle tradizionali piattaforme informative.

La sua evoluzione dovrà avvenire mantenendo una netta separazione tra capacità cognitive, conoscenza e servizi applicativi, affinché ogni prodotto possa beneficiare degli stessi servizi intelligenti in modo coerente, controllato e conforme ai principi dell’Enterprise Master Architecture.



SPORTELLOSCUOLA 2.0

SOLUTION ARCHITECTURE \& PROJECT MANAGEMENT (SAPM)

PARTE I – ASSESSMENT DEL PROGETTO (AS-IS)

CAPITOLO 8

ARCHITETTURA DELL’INTEGRAZIONE

La collaborazione tra servizi e componenti dell’ecosistema

\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_

8.1 Visione

L’ecosistema SportelloScuola 2.0 è concepito come una piattaforma composta da servizi indipendenti ma cooperanti.

L’Enterprise Master Architecture stabilisce che ogni prodotto utilizzi esclusivamente servizi condivisi, evitando duplicazioni funzionali e garantendo la centralizzazione delle responsabilità. Il valore dell’ecosistema non dipende quindi dalla presenza di numerosi componenti, bensì dalla qualità delle relazioni che li collegano.

L’architettura dell’integrazione costituisce il livello che consente ai servizi applicativi, al patrimonio informativo, ai motori di Intelligenza Artificiale e ai futuri prodotti di collaborare mantenendo un basso livello di accoppiamento.

\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_

8.2 Obiettivi dell’assessment

L’analisi mira a verificare:

●	le modalità di comunicazione tra frontend e backend;

●	l’integrazione con servizi esterni;

●	il livello di accoppiamento tra i componenti;

●	la presenza di punti unici di accesso ai servizi condivisi;

●	la predisposizione verso un’architettura orientata alle capability.

L’obiettivo è comprendere se l’ecosistema possa evolvere senza introdurre dipendenze rigide tra i suoi elementi.

\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_

8.3 Stato attuale

L’implementazione evidenzia un modello di integrazione prevalentemente basato su API e funzioni serverless.

Le principali interazioni riguardano:

●	comunicazione tra frontend e backend;

●	accesso ai servizi di autenticazione;

●	interrogazione del database;

●	utilizzo dei servizi AI;

●	integrazione con provider esterni (ad esempio invio di email e servizi di supporto).

Questa impostazione favorisce una buona separazione tra i livelli dell’applicazione e costituisce una base adeguata per l’evoluzione della piattaforma.

\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_

8.4 Livelli di integrazione

Dal punto di vista architetturale è possibile distinguere quattro livelli.

Integrazione interna

Comprende la comunicazione tra i componenti sviluppati all’interno della piattaforma.

Ad esempio:

●	frontend ↔ servizi applicativi;

●	servizi applicativi ↔ patrimonio informativo;

●	servizi applicativi ↔ AI Core.

Questo livello deve rimanere stabile e indipendente dai provider utilizzati.

\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_

Integrazione di piattaforma

Comprende i servizi infrastrutturali condivisi.

Tra essi:

●	autenticazione;

●	storage;

●	notifiche;

●	gestione documentale;

●	monitoraggio;

●	scheduling.

Essi rappresentano capability comuni a tutti i prodotti dell’ecosistema.

\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_

Integrazione con servizi esterni

Comprende le interazioni con soggetti esterni alla piattaforma.

Ad esempio:

●	fornitori di servizi email;

●	modelli linguistici;

●	fonti normative;

●	servizi ministeriali;

●	sistemi di autenticazione federata.

Tali integrazioni dovranno essere sempre mediate da servizi interni, evitando che i prodotti dipendano direttamente dai provider.

\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_

Integrazione tra prodotti

L’EMA prevede la progressiva realizzazione di un ecosistema di prodotti digitali.

La comunicazione tra tali prodotti dovrà avvenire esclusivamente attraverso servizi condivisi, garantendo coerenza dei dati, uniformità delle regole e riutilizzo delle capability.

\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_

8.5 Principi di integrazione

L’analisi evidenzia alcuni principi che dovranno guidare l’evoluzione della piattaforma.

Disaccoppiamento

Ogni componente dovrà conoscere esclusivamente le interfacce dei servizi utilizzati.

Riuso

Una capability implementata una sola volta dovrà essere riutilizzata da tutti i prodotti.

Interoperabilità

Le interfacce dovranno essere documentate, versionabili e indipendenti dalle tecnologie sottostanti.

Evolvibilità

L’introduzione di nuovi provider o di nuove funzionalità non dovrà richiedere modifiche ai prodotti già esistenti.

\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_

8.6 Decisione architetturale

Capability

Integration Platform

Responsabilità

Consentire la collaborazione tra servizi, prodotti e sistemi esterni mantenendo un basso livello di accoppiamento.

Pattern architetturale

Service-Oriented Integration con API interne, eventi applicativi e adapter verso i provider esterni.

Provider

L’architettura non dipende da uno specifico provider di integrazione. Le interfacce saranno definite come contratti applicativi, mentre i provider (Supabase, Resend o altri) costituiranno dettagli implementativi documentati nella Parte III – Technology Architecture.

\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_

8.7 Architectural Traceability Matrix (ATM)



Riferimento EMA	SAPM	Repository	OpenProject

Servizi Applicativi	Integration Platform	API, servizi backend	Capability “Integration Services”

Universal Product Framework	Shared Services	Moduli condivisi	Epic “Shared Platform Services”

Ecosistema Prodotti	Product Integration	Componenti comuni	Epic “Interoperabilità”

Governance	Service Contracts	Documentazione API	Feature “API Governance”



8.8 Esito dell’assessment

Classificazione: Conforme con elementi da consolidare

Motivazioni

L’implementazione attuale dimostra una buona separazione tra frontend, backend e servizi esterni.

Le principali attività di consolidamento riguarderanno:

●	formalizzazione dei contratti di servizio;

●	introduzione di una governance delle API;

●	standardizzazione dei meccanismi di integrazione;

●	preparazione dell’architettura a un ecosistema multi-prodotto.

Non emergono criticità strutturali, ma è necessario rendere espliciti i principi di interoperabilità già presenti in forma implicita.

\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_

8.9 Conclusioni

L’architettura dell’integrazione costituisce il tessuto connettivo dell’intero ecosistema. La sua evoluzione dovrà garantire che ogni capability possa essere utilizzata da qualsiasi prodotto senza duplicazioni, preservando l’indipendenza dei componenti e la possibilità di sostituire tecnologie o provider senza alterare la struttura logica della piattaforma.



SPORTELLOSCUOLA 2.0

SOLUTION ARCHITECTURE \& PROJECT MANAGEMENT (SAPM)

PARTE I – ASSESSMENT DEL PROGETTO (AS-IS)

CAPITOLO 9

PLATFORM ARCHITECTURE

Analisi delle capacità infrastrutturali dell’ecosistema

\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_

9.1 Visione

La piattaforma costituisce il livello abilitante dell’intero ecosistema SportelloScuola 2.0.

Essa fornisce tutte le capacità tecniche necessarie affinché i prodotti, i servizi applicativi e i motori condivisi possano operare in modo affidabile, sicuro e scalabile.

Nell’Enterprise Master Architecture tali capacità non appartengono ai singoli prodotti, ma rappresentano servizi comuni dell’ecosistema.

L’obiettivo della Platform Architecture è quindi garantire uniformità, riuso e continuità operativa, evitando che ciascun prodotto implementi autonomamente funzioni infrastrutturali già disponibili.

\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_

9.2 Obiettivi dell’assessment

L’analisi della piattaforma mira a verificare:

●	la centralizzazione delle capability infrastrutturali;

●	il livello di automazione operativa;

●	la predisposizione alla crescita dell’ecosistema;

●	la separazione tra responsabilità applicative e infrastrutturali;

●	la possibilità di sostituire singoli provider senza modificare l’architettura logica.

La valutazione non riguarda la qualità dei singoli servizi cloud, ma la maturità dell’architettura di piattaforma nel suo complesso.

\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_

9.3 Stato attuale

L’analisi del repository evidenzia una piattaforma moderna, costruita prevalentemente secondo paradigmi cloud e serverless.

Le principali capacità già presenti comprendono:

●	gestione del codice sorgente;

●	distribuzione automatizzata;

●	database gestito;

●	autenticazione;

●	storage;

●	funzioni serverless;

●	gestione della configurazione;

●	integrazione con servizi esterni.

Queste componenti costituiscono una base adeguata per un ecosistema in evoluzione.

\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_

9.4 Capacità della piattaforma

Dal punto di vista architetturale la piattaforma può essere suddivisa in diverse capability permanenti.

Source Management

Gestione del codice sorgente, del versionamento e della collaborazione tra sviluppatori.

\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_

Build \& Delivery

Automazione della compilazione, dei test e della distribuzione delle applicazioni.

\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_

Runtime Platform

Ambiente di esecuzione dei servizi applicativi e delle funzioni server-side.

\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_

Identity Platform

Gestione centralizzata di autenticazione, autorizzazione e sessioni.

\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_

Data Platform

Gestione del patrimonio informativo, delle migrazioni e della persistenza.

\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_

Storage Platform

Gestione dei documenti, delle risorse multimediali e degli allegati.

\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_

Notification Platform

Invio di comunicazioni verso utenti e amministratori attraverso canali differenti.

\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_

Scheduling Platform

Gestione delle attività pianificate, delle automazioni periodiche e dei processi asincroni.

Questa capability assume particolare rilevanza nell’ecosistema SportelloScuola 2.0, poiché molti processi (aggiornamento delle fonti normative, sincronizzazione dei dati, verifiche di qualità, manutenzione e monitoraggio) dovranno essere eseguiti automaticamente.

L’EMA richiede che tali processi siano governati centralmente e non implementati come logiche isolate all’interno dei singoli prodotti.

\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_

Secrets Management

Gestione centralizzata delle credenziali, delle chiavi API e delle configurazioni riservate.

\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_

Observability Platform

Raccolta di log, metriche, eventi e informazioni diagnostiche necessarie al monitoraggio continuo dell’ecosistema.

\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_

9.5 Valutazione architetturale

Il progetto mostra già una buona separazione tra componenti applicativi e servizi infrastrutturali.

Tuttavia, alcune capability risultano ancora implicitamente associate ai provider utilizzati.

Il SAPM introduce una distinzione fondamentale:

●	Capability → responsabilità permanente della piattaforma.

●	Provider → implementazione sostituibile della capability.

Questa separazione consentirà di evolvere la tecnologia senza compromettere la stabilità dell’architettura.

\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_

9.6 Decisione architetturale

Capability

Enterprise Platform Services

Responsabilità

Fornire servizi infrastrutturali condivisi, indipendenti dai singoli prodotti.

Pattern architetturale

Platform as a Shared Service.

Ogni capability infrastrutturale dovrà essere esposta come servizio comune e utilizzata da tutti i prodotti attraverso interfacce standardizzate.

Provider

La scelta dei provider verrà affrontata nella Parte III – Technology Architecture attraverso Technology Decision Record dedicati.

Tra le capability che saranno oggetto di valutazione comparativa rientrano:

●	hosting;

●	database;

●	autenticazione;

●	posta elettronica;

●	scheduling;

●	monitoraggio;

●	caching;

●	CDN;

●	gestione dei segreti.

L’architettura non dovrà mai dipendere da uno specifico fornitore.

\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_

9.7 Architectural Traceability Matrix (ATM)



Riferimento EMA	SAPM	Repository	OpenProject

Platform Services	Enterprise Platform Services	Configurazioni infrastrutturali	Capability “Platform Engineering”

Universal Product Framework	Shared Platform	Componenti condivisi	Epic “Platform Services”

Governance	Operational Platform	Configurazioni e ambienti	Epic “Platform Governance”

Scalabilità	Runtime Platform	Servizi serverless	Feature “Runtime Management”



9.8 Esito dell’assessment

Classificazione: Conforme con elementi da consolidare

Motivazioni

La piattaforma attuale presenta caratteristiche moderne e coerenti con un’architettura cloud-native.

Le principali attività di consolidamento riguarderanno:

●	formalizzazione delle Platform Capability;

●	documentazione delle responsabilità infrastrutturali;

●	introduzione di criteri uniformi di osservabilità;

●	definizione di una strategia comune per scheduling, notifiche e gestione dei segreti;

●	riduzione del legame concettuale tra capability e provider.

Non si rendono necessarie modifiche sostanziali all’architettura della piattaforma.

\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_

9.9 Conclusioni

La Platform Architecture costituisce il livello abilitante dell’intero ecosistema e rappresenta uno degli elementi che maggiormente ne determineranno la sostenibilità nel lungo periodo.

La progressiva formalizzazione delle capability infrastrutturali consentirà ai futuri prodotti di concentrarsi esclusivamente sulla logica di dominio, delegando alla piattaforma tutti i servizi tecnici comuni.

SPORTELLOSCUOLA 2.0

SOLUTION ARCHITECTURE \& PROJECT MANAGEMENT (SAPM)

PARTE I – ASSESSMENT DEL PROGETTO (AS-IS)

CAPITOLO 10

TRUST ARCHITECTURE

Sicurezza, Privacy, Compliance e Fiducia Digitale

\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_

10.1 Visione

La fiducia rappresenta uno dei principi fondanti dell’ecosistema SportelloScuola 2.0.

Ogni servizio, prodotto digitale o componente dell’architettura dovrà garantire riservatezza, integrità, disponibilità, tracciabilità e conformità normativa, affinché utenti, istituzioni scolastiche e amministrazioni possano utilizzare la piattaforma con elevati livelli di affidabilità.

L’Enterprise Master Architecture considera tali aspetti come principi trasversali, destinati a permeare l’intero ecosistema e non come funzionalità isolate.

Di conseguenza, il SAPM interpreta sicurezza, privacy e compliance come una Trust Capability, condivisa da tutti i livelli architetturali.

\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_

10.2 Obiettivi dell’assessment

L’analisi della Trust Architecture persegue i seguenti obiettivi:

●	valutare il livello di protezione delle informazioni;

●	verificare la gestione delle identità digitali;

●	analizzare i meccanismi di autorizzazione;

●	valutare la tracciabilità delle operazioni;

●	verificare la predisposizione alla conformità normativa;

●	preparare l’ecosistema all’introduzione di controlli di sicurezza più evoluti.

\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_

10.3 Stato attuale

L’implementazione attuale presenta già numerosi elementi favorevoli.

Tra essi:

●	autenticazione centralizzata;

●	gestione delle sessioni;

●	controllo degli accessi;

●	segregazione delle responsabilità tra frontend e backend;

●	utilizzo di servizi cloud gestiti.

L’architettura risulta quindi adeguata ad una prima fase evolutiva della piattaforma.

Tuttavia, la maggior parte dei meccanismi di sicurezza è ancora implicita e dipende in larga misura dalle capacità offerte dai provider utilizzati.

Il SAPM introduce la necessità di rendere tali controlli espliciti, documentati e governati.

\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_

10.4 I pilastri della Trust Architecture

Il modello proposto si articola in sette capability fondamentali.

Identity \& Access Management

Gestione dell’identità digitale degli utenti.

Comprende:

●	autenticazione;

●	autorizzazione;

●	ruoli;

●	permessi;

●	gestione delle sessioni.

\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_

Data Protection

Protezione delle informazioni.

Comprende:

●	cifratura;

●	classificazione dei dati;

●	politiche di conservazione;

●	minimizzazione delle informazioni.

\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_

Auditability

Ogni operazione significativa dovrà poter essere ricostruita.

L’ecosistema dovrà registrare:

●	accessi;

●	modifiche;

●	operazioni amministrative;

●	elaborazioni AI;

●	attività di sistema.

\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_

Compliance Management

La piattaforma dovrà essere progettata per facilitare il rispetto delle principali normative applicabili.

Tra queste:

●	GDPR;

●	AI Act;

●	NIS2 (ove applicabile);

●	Linee guida AgID;

●	principi del Codice dell’Amministrazione Digitale.

L’obiettivo non consiste nel sostituire gli adempimenti organizzativi, ma nel predisporre un’architettura che renda possibile la conformità.

\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_

AI Trust

Le funzionalità basate sull’Intelligenza Artificiale dovranno garantire:

●	trasparenza;

●	tracciabilità;

●	supervisione umana;

●	qualità delle risposte;

●	utilizzo controllato del patrimonio informativo.

\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_

Operational Security

Comprende tutti i controlli necessari alla protezione operativa della piattaforma.

Tra essi:

●	gestione delle vulnerabilità;

●	backup;

●	monitoraggio;

●	continuità operativa;

●	gestione degli incidenti.

\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_

Governance

La sicurezza dovrà essere governata attraverso politiche comuni, criteri di revisione e controlli periodici.

Essa non rappresenterà un’attività occasionale, ma un processo continuo.

\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_

10.5 Valutazione architetturale

L’implementazione attuale risulta coerente con una moderna architettura cloud.

Le capability di sicurezza fondamentali sono già presenti, ma distribuite tra diversi servizi.

Il SAPM propone di ricondurle ad un unico modello di Trust Architecture, rendendo esplicite responsabilità, controlli e criteri di verifica.

Questa scelta consentirà di migliorare la governabilità dell’intero ecosistema.

\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_

10.6 Decisione architetturale

Capability

Enterprise Trust Platform

Responsabilità

Garantire sicurezza, affidabilità, conformità normativa e protezione del patrimonio informativo dell’intero ecosistema.

Pattern architetturale

Security by Design, Privacy by Design e Zero Trust Architecture.

Ogni componente dovrà essere progettato assumendo che nessuna richiesta sia implicitamente affidabile e che ogni accesso debba essere verificato, autorizzato e tracciato.

Provider

Le capability di sicurezza dovranno essere indipendenti dai provider utilizzati.

L’implementazione tecnica sarà documentata nella Parte III – Technology Architecture.

\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_

10.7 Architectural Traceability Matrix (ATM)



Riferimento EMA	SAPM	Repository	OpenProject

Governance	Enterprise Trust Platform	Configurazioni di sicurezza	Capability “Trust \& Security”

AI Core	AI Trust	Servizi AI	Epic “Responsible AI”

Data Governance	Data Protection	Database e Storage	Epic “Data Protection”

Universal Product Framework	Identity \& Access	Servizi condivisi	Feature “IAM”



10.8 Esito dell’assessment

Classificazione: Conforme con elementi da consolidare

Motivazioni

L’implementazione attuale presenta un buon livello di maturità in termini di autenticazione, gestione centralizzata e utilizzo di servizi cloud affidabili.

Le principali attività di consolidamento riguarderanno:

●	formalizzazione della Trust Architecture;

●	introduzione di una governance della sicurezza;

●	predisposizione alla conformità normativa;

●	rafforzamento dell’auditabilità;

●	centralizzazione dei controlli trasversali.

\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_

10.9 Conclusioni

La Trust Architecture rappresenta uno degli elementi fondamentali per garantire la sostenibilità e l’affidabilità dell’ecosistema SportelloScuola 2.0.

La sua evoluzione non richiederà necessariamente l’introduzione di nuove tecnologie, ma la progressiva formalizzazione dei principi di sicurezza, protezione dei dati e conformità, affinché ogni capability della piattaforma operi all’interno di un quadro di fiducia condiviso.

SPORTELLOSCUOLA 2.0

SOLUTION ARCHITECTURE \& PROJECT MANAGEMENT (SAPM)

PARTE I – ASSESSMENT DEL PROGETTO (AS-IS)

CAPITOLO 11

OPERATIONAL MATURITY ASSESSMENT

Valutazione della maturità operativa dell’ecosistema

\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_

11.1 Visione

La qualità di un ecosistema digitale non dipende esclusivamente dalla qualità del software sviluppato, ma dalla capacità dell’organizzazione di governarne l’intero ciclo di vita.

L’Enterprise Master Architecture identifica SportelloScuola 2.0 come un ecosistema destinato ad evolvere nel tempo attraverso nuovi prodotti, nuove capability e nuovi servizi condivisi.

Per sostenere questa evoluzione è necessario che il progetto possieda un adeguato livello di maturità operativa.

Il presente assessment valuta quindi non soltanto la qualità dell’implementazione corrente, ma soprattutto la capacità della piattaforma di essere mantenuta, evoluta e governata nel lungo periodo.

\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_

11.2 Obiettivi dell’assessment

L’analisi ha lo scopo di valutare:

●	governabilità dell’architettura;

●	capacità evolutiva;

●	manutenibilità;

●	osservabilità;

●	automazione;

●	gestione delle configurazioni;

●	documentazione;

●	tracciabilità delle modifiche;

●	predisposizione ai futuri processi DevSecOps.

\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_

11.3 Dimensioni della maturità

Il SAPM valuta il progetto secondo otto dimensioni.

Architettura

Verifica la chiarezza delle responsabilità.

Valuta:

●	separazione dei livelli;

●	modularità;

●	riuso;

●	indipendenza dei servizi.

\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_

Dati

Valuta:

●	qualità del modello informativo;

●	evolvibilità;

●	centralizzazione;

●	governance.

\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_

AI

Valuta:

●	integrazione;

●	qualità;

●	osservabilità;

●	controllo.

\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_

Piattaforma

Valuta:

●	automazione;

●	affidabilità;

●	disponibilità;

●	resilienza.

\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_

Sicurezza

Valuta:

●	protezione delle informazioni;

●	controllo degli accessi;

●	audit;

●	conformità.

\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_

Processo di sviluppo

Valuta:

●	versionamento;

●	gestione delle modifiche;

●	qualità del codice;

●	controllo delle release.

\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_

Governance

Valuta:

●	documentazione;

●	decisioni architetturali;

●	gestione del debito tecnico;

●	allineamento con l’EMA.

\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_

Project Management

Valuta:

●	pianificazione;

●	roadmap;

●	gestione delle capability;

●	monitoraggio dello stato di avanzamento.

\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_

11.4 Valutazione dello stato attuale

L’analisi del repository evidenzia un progetto caratterizzato da una buona qualità tecnica.

Sono già presenti numerosi elementi tipici di una piattaforma moderna:

●	architettura modulare;

●	backend serverless;

●	database versionato;

●	servizi condivisi;

●	repository strutturato;

●	separazione tra frontend e backend.

Tuttavia, la maggior parte di tali elementi risulta ancora implicita.

Manca infatti una formalizzazione completa delle relazioni tra architettura, implementazione e governance.

È proprio questo il ruolo del SAPM.

\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_

11.5 Livello di maturità

Il progetto viene valutato secondo cinque livelli progressivi.



Livello	Descrizione

1	Sperimentale

2	Organizzato

3	Governato

4	Enterprise

5	Ecosistema



Alla data dell’assessment, SportelloScuola 2.0 si colloca tra il Livello 2 (Organizzato) e il Livello 3 (Governato).

L’architettura tecnica risulta già sufficientemente matura; ciò che manca è la formalizzazione dei processi di governo, della documentazione e delle decisioni architetturali.

L’obiettivo dell’intero SAPM è accompagnare il progetto fino al Livello 5, nel quale l’ecosistema sarà governato attraverso capability condivise, architetture tracciabili e processi standardizzati.

\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_

11.6 Decisione architetturale

Capability

Architecture Governance

Responsabilità

Garantire che ogni evoluzione del sistema mantenga coerenza con l’Enterprise Master Architecture.

Pattern

Continuous Architecture Governance.

Ogni modifica dovrà essere valutata non soltanto dal punto di vista tecnico, ma anche rispetto agli impatti sul patrimonio informativo, sui servizi condivisi, sulla sicurezza, sull’AI e sulla roadmap evolutiva.

\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_

11.7 Architectural Traceability Matrix (ATM)



EMA	SAPM	Repository	OpenProject

Governance	Architecture Governance	Repository completo	Capability “Architecture Governance”

Roadmap	Evolution Planning	Branch, release, milestone	Epic “Roadmap Evolutiva”

Universal Product Framework	Shared Development Model	Struttura del progetto	Feature “Standardizzazione”

Ecosistema	Continuous Evolution	Componenti condivisi	Epic “Continuous Improvement”



11.8 Esito dell’assessment

Classificazione: Architettura solida con maturità organizzativa in evoluzione

Punti di forza

●	Architettura coerente.

●	Elevata modularità.

●	Ottima predisposizione alla scalabilità.

●	Buona qualità tecnologica.

●	Visione strategica già definita dall’EMA.

Aree di consolidamento

●	governance architetturale;

●	documentazione tecnica;

●	gestione delle decisioni (ADR);

●	automazione operativa;

●	monitoraggio;

●	osservabilità;

●	gestione del debito tecnico;

●	integrazione sistematica con OpenProject.

\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_

11.9 Conclusioni

L’assessment evidenzia che SportelloScuola 2.0 possiede già una base tecnologica adeguata per sostenere un ecosistema digitale di ampia evoluzione.

La sfida principale non consiste nella sostituzione delle tecnologie esistenti, bensì nella loro progressiva organizzazione all’interno di un modello architetturale governato, tracciabile e coerente con l’Enterprise Master Architecture.

Il SAPM rappresenta lo strumento attraverso il quale tale evoluzione verrà pianificata, monitorata e documentata.

PARTE II

SOLUTION ARCHITECTURE (TO-BE)

\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_

CAPITOLO 12

ENTERPRISE CAPABILITY CATALOG

Il catalogo delle capacità dell’ecosistema

\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_

12.1 Scopo

L’Enterprise Master Architecture definisce la visione strategica dell’ecosistema SportelloScuola 2.0, individuando principi, domini architetturali e servizi condivisi.

Per trasformare tale visione in una soluzione implementabile è necessario identificare in modo esplicito le capability permanenti dell’ecosistema.

Una capability rappresenta una capacità stabile che la piattaforma deve possedere indipendentemente dalle tecnologie utilizzate, dall’organizzazione del codice sorgente o dai prodotti che la utilizzeranno.

Il presente catalogo costituisce il riferimento architetturale ufficiale per tutte le successive attività di progettazione, sviluppo e governance.

Ogni componente della Solution Architecture dovrà essere ricondotto ad almeno una capability definita in questo catalogo.

\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_

12.2 Principi

L’ECC si basa sui seguenti principi.

Stabilità

Le capability evolvono molto più lentamente delle tecnologie.

Una capability rimane valida anche se cambiano framework, provider cloud o modelli AI.

\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_

Riuso

Ogni capability viene implementata una sola volta.

Successivamente viene condivisa da tutti i prodotti.

\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_

Indipendenza

Le capability descrivono responsabilità.

Non descrivono prodotti commerciali.

\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_

Governabilità

Ogni capability possiede:

●	responsabile;

●	requisiti;

●	KPI;

●	roadmap;

●	dipendenze;

●	ADR;

●	collegamento OpenProject.

\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_

Tracciabilità

Ogni capability sarà collegata a:

EMA

↓

SAPM

↓

Repository

↓

OpenProject

↓

ADR

↓

Release

↓

KPI

\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_

12.3 Classificazione

L’intero ecosistema viene organizzato in dieci macro-domini.

\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_

CAP-01

Experience Platform

Responsabilità

Fornire tutti i canali di accesso agli utenti.

Comprende:

●	Web App

●	Mobile

●	Dashboard

●	Portali

●	Accessibilità

●	UX

\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_

CAP-02

Application Services

Responsabilità

Implementare i processi applicativi.

Comprende:

●	workflow

●	business logic

●	API

●	orchestrazione

\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_

CAP-03

Enterprise Data Platform

Responsabilità

Gestire il patrimonio informativo.

Comprende:

●	Canonical Data Model

●	database

●	metadati

●	Knowledge Graph

●	Data Governance

\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_

CAP-04

Enterprise AI Core

Responsabilità

Fornire servizi cognitivi condivisi.

Comprende:

●	orchestrazione LLM

●	Prompt Management

●	Context Management

●	RAG

●	AI Quality

●	AI Observability

\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_

CAP-05

Integration Platform

Responsabilità

Consentire la comunicazione tra prodotti e servizi.

Comprende:

●	API

●	eventi

●	adapter

●	webhook

●	sincronizzazione

\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_

CAP-06

Enterprise Platform Services

Responsabilità

Fornire tutte le capability infrastrutturali.

Comprende:

●	runtime

●	deployment

●	storage

●	scheduling

●	notification

●	monitoring

●	secrets

●	cache

\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_

CAP-07

Trust Platform

Responsabilità

Garantire sicurezza e conformità.

Comprende:

●	Identity

●	Access

●	Audit

●	Privacy

●	Compliance

●	Zero Trust

\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_

CAP-08

Quality Platform

Responsabilità

Garantire qualità tecnica e funzionale.

Comprende:

●	testing

●	AI Evaluation

●	Quality Engine

●	KPI

●	monitoraggio

\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_

CAP-09

Governance Platform

Responsabilità

Governare l’intero ecosistema.

Comprende:

●	ADR

●	Architecture Review

●	Change Management

●	Risk

●	Technical Debt

●	Portfolio

\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_

CAP-10

Project Delivery Platform

Responsabilità

Gestire realizzazione ed evoluzione.

Comprende:

●	WBS

●	Capability

●	Epic

●	Feature

●	Story

●	Task

●	Sprint

●	Release

●	Roadmap

\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_

12.4 Relazione con l’EMA

Ogni capability implementa direttamente uno o più principi dell’Enterprise Master Architecture.



Capability	EMA	Descrizione

CAP-01	Universal Product Framework	Esperienza utente condivisa

CAP-02	Servizi Applicativi	Logica di business

CAP-03	Canonical Data Model	Patrimonio informativo

CAP-04	AI Core	Servizi cognitivi

CAP-05	Ecosistema Prodotti	Integrazione

CAP-06	Platform	Servizi condivisi

CAP-07	Governance e Sicurezza	Fiducia digitale

CAP-08	Quality Engine	Controllo qualità

CAP-09	Governance	Governo architetturale

CAP-10	Roadmap	Evoluzione del programma



12.5 Enterprise Capability Lifecycle

Ogni capability seguirà il medesimo ciclo di vita:

1\.	Definizione nell’EMA.

2\.	Formalizzazione nel SAPM.

3\.	Decisioni negli ADR.

4\.	Pianificazione in OpenProject.

5\.	Implementazione nel repository.

6\.	Verifica tramite test e Quality Engine.

7\.	Monitoraggio con KPI.

8\.	Riesame architetturale periodico.

Questo ciclo garantisce la continuità tra strategia, progettazione, sviluppo e gestione operativa.

\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_

12.6 Decisione architetturale

Principio fondamentale

Le capability rappresentano l’unità fondamentale di progettazione dell’ecosistema.

Di conseguenza:

●	il codice non sarà organizzato in funzione dei provider;

●	i task non saranno organizzati in funzione delle pagine;

●	i rilasci non saranno organizzati in funzione delle tecnologie.

L’unità di pianificazione, implementazione e governance sarà sempre la capability.

Questa scelta renderà possibile sostituire framework, provider o strumenti senza alterare la struttura logica dell’ecosistema.

\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_

12.7 Architectural Traceability Matrix (ATM)



Capability	EMA	SAPM	Repository	ADR	OpenProject

CAP-01	✓	✓	✓	✓	✓

CAP-02	✓	✓	✓	✓	✓

CAP-03	✓	✓	✓	✓	✓

CAP-04	✓	✓	✓	✓	✓

CAP-05	✓	✓	✓	✓	✓

CAP-06	✓	✓	✓	✓	✓

CAP-07	✓	✓	✓	✓	✓

CAP-08	✓	✓	✓	✓	✓

CAP-09	✓	✓	✓	✓	✓

CAP-10	✓	✓	✓	✓	✓



PARTE II

SOLUTION ARCHITECTURE (TO-BE)

CAPITOLO 13

CAP-01 — EXPERIENCE PLATFORM

Solution Architecture della piattaforma di esperienza utente

\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_

13.1 Mission

La Experience Platform costituisce il punto di contatto tra gli utenti e l’intero ecosistema SportelloScuola 2.0.

La sua missione consiste nel fornire un’esperienza utente coerente, accessibile, intuitiva e uniforme, indipendentemente dal canale utilizzato.

La piattaforma non implementa la logica di business, né gestisce direttamente il patrimonio informativo. Essa ha il compito di orchestrare l’interazione tra gli utenti e le capability condivise dell’ecosistema, garantendo un accesso semplice e sicuro ai servizi digitali.

L’obiettivo è costruire un’interfaccia capace di evolvere nel tempo senza compromettere la stabilità dell’architettura sottostante.

\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_

13.2 Scope

La Experience Platform comprende tutte le componenti responsabili dell’interazione con gli utenti finali.

Rientrano nel suo perimetro:

●	applicazione web principale;

●	dashboard personalizzate;

●	portali dedicati ai diversi profili utente;

●	componenti di navigazione;

●	sistema di autenticazione lato client;

●	gestione delle sessioni utente;

●	motore di ricerca dell’interfaccia;

●	notifiche visuali;

●	gestione della localizzazione e dell’internazionalizzazione;

●	accessibilità;

●	design system.

Sono invece escluse:

●	logica di business;

●	persistenza dei dati;

●	orchestrazione AI;

●	workflow amministrativi;

●	integrazioni con sistemi esterni.

Queste responsabilità appartengono alle capability specializzate dell’ecosistema.

\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_

13.3 Business Objectives

La Experience Platform dovrà perseguire i seguenti obiettivi.

Accessibilità universale

Garantire l’utilizzo della piattaforma da parte del maggior numero possibile di utenti, nel rispetto dei principi di accessibilità e inclusione.

\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_

Uniformità dell’esperienza

Offrire un’interfaccia coerente in tutti i prodotti dell’ecosistema.

\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_

Riduzione della complessità

Nascondere la complessità tecnica delle piattaforme sottostanti.

\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_

Personalizzazione

Adattare dinamicamente contenuti, dashboard e funzionalità ai diversi profili utente.

\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_

Evolvibilità

Consentire l’introduzione di nuovi servizi senza modificare l’esperienza complessiva.

\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_

13.4 Principi architetturali

La Experience Platform sarà progettata secondo i seguenti principi.

User Experience First

Ogni decisione progettuale dovrà privilegiare semplicità, chiarezza e continuità dell’esperienza.

API First

Il frontend non accederà direttamente ai dati, ma consumerà esclusivamente servizi applicativi pubblicati dalla Application Services Platform (CAP-02).

Stateless Client

Il client conserverà esclusivamente lo stato necessario all’interazione, demandando la gestione dei dati persistenti ai servizi di backend.

Responsive by Design

L’interfaccia dovrà adattarsi a differenti dispositivi e dimensioni dello schermo senza duplicare la logica applicativa.

Accessibility by Design

Ogni componente dovrà essere progettato fin dall’origine nel rispetto dei principi di accessibilità.

\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_

13.5 Componenti architetturali

La Experience Platform sarà composta dai seguenti moduli logici.

User Interface Layer

Responsabile della presentazione dei contenuti.

\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_

Navigation Layer

Gestione della navigazione, del routing e dei percorsi utente.

\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_

Session Management

Gestione delle sessioni e dello stato dell’utente.

\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_

Client Integration Layer

Interfaccia unica verso i servizi applicativi.

\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_

Design System

Insieme di componenti riutilizzabili, linee guida grafiche, tipografia, icone e pattern di interazione.

Questo elemento assumerà un ruolo strategico perché garantirà uniformità tra tutti i futuri prodotti dell’ecosistema.

\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_

13.6 Service Contracts

La Experience Platform consumerà esclusivamente servizi esposti da altre capability.

In particolare:

●	CAP-02 — Application Services per la logica di business.

●	CAP-03 — Enterprise Data Platform tramite i servizi applicativi, senza accesso diretto al database.

●	CAP-04 — Enterprise AI Core per le funzionalità di assistenza intelligente.

●	CAP-06 — Enterprise Platform Services per autenticazione, notifiche e storage.

●	CAP-07 — Trust Platform per identità, autorizzazioni e audit.

Questa separazione garantirà il disaccoppiamento tra esperienza utente e logica applicativa.

\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_

13.7 Information Managed

La Experience Platform non rappresenta il sistema autorevole dei dati.

Gestisce esclusivamente informazioni temporanee necessarie all’interazione con l’utente, quali:

●	preferenze dell’interfaccia;

●	impostazioni di visualizzazione;

●	stato della navigazione;

●	sessioni applicative;

●	cache locale non persistente.

Tutti i dati di dominio rimangono di competenza della Enterprise Data Platform (CAP-03).

PARTE II – SOLUTION ARCHITECTURE (TO-BE)

CAPITOLO 13

CAP-01 — EXPERIENCE PLATFORM

(continuazione)

\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_

13.8 AI Integration

La Experience Platform rappresenta il principale punto di interazione tra gli utenti e le capacità cognitive dell’ecosistema. Tuttavia, essa non incorpora direttamente logiche di Intelligenza Artificiale, ma utilizza esclusivamente i servizi esposti dalla Enterprise AI Core (CAP-04).

Questa scelta garantisce una chiara separazione tra il livello di presentazione e il livello cognitivo, evitando che componenti di interfaccia assumano responsabilità decisionali o implementino direttamente logiche di elaborazione del linguaggio naturale.

L’integrazione con l’AI dovrà essere realizzata attraverso contratti di servizio standardizzati, che consentano alla piattaforma di:

●	ricevere richieste formulate dagli utenti;

●	inviare tali richieste all’AI Core corredate del contesto necessario;

●	visualizzare le risposte in modo coerente con l’interfaccia utente;

●	distinguere chiaramente tra contenuti generati automaticamente e contenuti ufficiali del patrimonio informativo;

●	consentire agli utenti di fornire feedback sulla qualità delle risposte ricevute.

L’Experience Platform non conserverà memoria permanente delle conversazioni: il contesto applicativo sarà gestito centralmente dall’AI Core e dalla Enterprise Data Platform.

\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_

13.9 Security Model

La sicurezza dell’Experience Platform dovrà essere progettata secondo il principio Security by Design, integrando i controlli di sicurezza direttamente nell’architettura dell’interfaccia.

Gestione dell’identità

L’autenticazione sarà demandata alla Trust Platform (CAP-07), che rappresenterà l’unica fonte autorevole per la gestione delle identità digitali.

La Experience Platform dovrà limitarsi a consumare token di autenticazione e informazioni di sessione, senza implementare meccanismi proprietari.

Gestione delle autorizzazioni

Le autorizzazioni saranno applicate su due livelli:

●	controllo dell’accesso alle funzionalità dell’interfaccia;

●	verifica delle autorizzazioni applicative tramite i servizi di backend.

In questo modo si eviterà che il frontend diventi un punto di applicazione esclusivo delle regole di sicurezza.

Protezione delle informazioni

L’interfaccia non dovrà memorizzare dati sensibili oltre il tempo strettamente necessario all’interazione.

Le informazioni persistenti saranno gestite esclusivamente dai servizi di backend.

Audit

Le principali interazioni utente saranno registrate dai servizi applicativi per consentire la ricostruzione delle operazioni rilevanti, nel rispetto delle politiche di audit definite dalla Trust Platform.

\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_

13.10 Non Functional Requirements

La Experience Platform dovrà soddisfare requisiti non funzionali coerenti con quelli definiti nell’EMA.

Disponibilità

L’interfaccia dovrà garantire un’elevata disponibilità dei servizi, minimizzando i tempi di inattività percepiti dagli utenti.

Prestazioni

Le principali interazioni dovranno risultare rapide e reattive, privilegiando il caricamento progressivo delle informazioni e riducendo il numero di richieste non necessarie.

Scalabilità

L’architettura dovrà supportare un incremento progressivo del numero di utenti senza richiedere modifiche sostanziali alla struttura logica.

Accessibilità

Tutti i componenti dovranno essere conformi ai principi di accessibilità digitale, prevedendo il supporto alle tecnologie assistive e una navigazione utilizzabile da utenti con differenti esigenze.

Osservabilità

Le anomalie dell’interfaccia dovranno poter essere rilevate attraverso sistemi di monitoraggio centralizzati, senza introdurre dipendenze dall’ambiente di esecuzione.

Manutenibilità

L’organizzazione del codice dovrà favorire la riusabilità dei componenti e la loro evoluzione indipendente.

\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_

13.11 Technology Independence

La Experience Platform non dipenderà da uno specifico framework o provider.

Le tecnologie attualmente utilizzate rappresentano un’implementazione concreta delle capability progettate, ma potranno essere sostituite qualora emergano soluzioni più adeguate ai requisiti dell’ecosistema.

L’architettura dovrà quindi definire:

●	contratti di comunicazione stabili;

●	componenti modulari;

●	dipendenze minimizzate;

●	separazione tra logica di presentazione e servizi applicativi.

Le valutazioni comparative tra framework, librerie UI, sistemi di hosting e strumenti di build saranno sviluppate nella Parte III – Technology Architecture.

\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_

13.12 Dependencies

La Experience Platform dipende dalle seguenti capability:



Capability	Tipo di dipendenza	Motivazione

CAP-02 – Application Services	Obbligatoria	Accesso alla logica di business

CAP-03 – Enterprise Data Platform	Indiretta	Fruizione dei dati tramite servizi applicativi

CAP-04 – Enterprise AI Core	Facoltativa	Assistenza intelligente e funzionalità cognitive

CAP-06 – Enterprise Platform Services	Obbligatoria	Runtime, notifiche, storage e servizi infrastrutturali

CAP-07 – Trust Platform	Obbligatoria	Autenticazione, autorizzazione e audit



Questa rete di dipendenze evidenzia come la Experience Platform costituisca il punto di ingresso dell’ecosistema, pur mantenendo un basso livello di accoppiamento con le altre capability.

\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_

13.13 Architecture Decision Records (ADR)

Per la Experience Platform vengono individuate le seguenti decisioni architetturali iniziali:

●	ADR-001 – Adozione di un’architettura Frontend API-First.

●	ADR-002 – Separazione rigorosa tra presentazione e logica di business.

●	ADR-003 – Introduzione di un Design System condiviso per tutti i prodotti dell’ecosistema.

●	ADR-004 – Integrazione esclusiva con l’AI tramite l’Enterprise AI Core.

●	ADR-005 – Gestione centralizzata dell’identità attraverso la Trust Platform.

Ogni ADR sarà sviluppato in un documento dedicato, contenente contesto, alternative valutate, decisione adottata, conseguenze e piano di revisione.

\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_

13.14 OpenProject Mapping

La capability sarà rappresentata in OpenProject attraverso la seguente struttura gerarchica:

Capability

CAP-01 – Experience Platform

Epic

●	Portale Web

●	Design System

●	Dashboard Utente

●	Accessibilità Digitale

●	Gestione Sessioni

Feature

●	Layout condiviso

●	Navigazione unificata

●	Componenti UI riutilizzabili

●	Gestione preferenze utente

●	Localizzazione

User Story

Ogni Feature sarà suddivisa in User Story orientate al valore per l’utente.

Task

Le User Story saranno ulteriormente articolate in attività tecniche implementabili e verificabili.

Questa struttura garantirà la completa tracciabilità tra architettura, sviluppo e gestione del progetto.

\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_

13.15 KPI

Per monitorare l’efficacia della Experience Platform saranno definiti indicatori quali:

●	tempo medio di caricamento delle principali pagine;

●	disponibilità del frontend;

●	tasso di errori lato client;

●	conformità ai criteri di accessibilità;

●	percentuale di componenti riutilizzati dal Design System;

●	livello di soddisfazione degli utenti;

●	tasso di utilizzo delle funzionalità AI integrate.

Questi KPI saranno raccolti dalla Platform Services e utilizzati dalla Governance Platform per il monitoraggio continuo.

\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_

13.16 Roadmap evolutiva

L’evoluzione della Experience Platform seguirà quattro fasi:

Fase 1 – Consolidamento

Uniformazione dell’interfaccia, definizione del Design System e razionalizzazione dei componenti esistenti.

Fase 2 – Personalizzazione

Introduzione di dashboard dinamiche, preferenze utente e navigazione contestuale.

Fase 3 – Esperienza intelligente

Integrazione completa con l’Enterprise AI Core, assistenza contestuale e ricerca semantica.

Fase 4 – Ecosistema multi-prodotto

Estensione del Design System e delle capability di esperienza a tutti i futuri prodotti di SportelloScuola 2.0, garantendo un’identità visiva e funzionale unitaria.

PARTE II

SOLUTION ARCHITECTURE (TO-BE)

CAPITOLO 14

CAP-02 — APPLICATION SERVICES PLATFORM

Reference Architecture dei Servizi Applicativi

\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_

14.1 Mission

La Application Services Platform rappresenta il cuore funzionale dell’ecosistema SportelloScuola 2.0.

Essa costituisce il livello in cui vengono implementati i processi applicativi, le regole di business e le logiche di orchestrazione che consentono alla piattaforma di trasformare richieste degli utenti in servizi digitali.

La sua missione non consiste nella gestione diretta dell’interfaccia utente né nella persistenza delle informazioni, ma nell’esecuzione controllata dei processi che realizzano le capability dell’ecosistema.

Ogni servizio applicativo dovrà essere progettato come un componente indipendente, riutilizzabile e facilmente componibile, in modo da poter essere utilizzato da differenti prodotti senza duplicazioni di logica.

\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_

14.2 Scope

La Application Services Platform comprende tutti i servizi che implementano la logica di dominio.

In particolare rientrano nel suo perimetro:

●	gestione dei casi d’uso applicativi;

●	orchestrazione dei workflow;

●	coordinamento delle richieste provenienti dalla Experience Platform;

●	applicazione delle regole di business;

●	integrazione con il patrimonio informativo;

●	orchestrazione dei servizi AI;

●	gestione delle notifiche applicative;

●	validazione dei dati;

●	controllo dei processi autorizzativi.

Sono invece escluse:

●	la presentazione delle informazioni (CAP-01);

●	la persistenza dei dati (CAP-03);

●	le capacità cognitive (CAP-04);

●	i servizi infrastrutturali (CAP-06);

●	la sicurezza trasversale (CAP-07).

Questa delimitazione consente di mantenere una netta separazione delle responsabilità e favorisce l’evoluzione indipendente delle diverse capability.

\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_

14.3 Business Objectives

La Application Services Platform dovrà perseguire i seguenti obiettivi.

Centralizzazione della logica di business

Ogni regola funzionale dovrà essere implementata una sola volta, evitando duplicazioni tra frontend, backend e servizi AI.

Riusabilità

I servizi applicativi dovranno poter essere riutilizzati da più prodotti dell’ecosistema senza modifiche sostanziali.

Componibilità

Le funzionalità complesse dovranno essere ottenute componendo servizi elementari, riducendo la complessità e favorendo il riuso.

Evolvibilità

L’introduzione di nuovi processi non dovrà richiedere modifiche alle capability già esistenti.

Coerenza

Le decisioni applicative dovranno essere uniformi indipendentemente dal canale utilizzato (web, mobile o futuri client).

\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_

14.4 Architecture Vision

Nell’architettura target, la Application Services Platform agirà come livello di coordinamento tra la Experience Platform, la Enterprise Data Platform e l’Enterprise AI Core.

Essa rappresenterà il punto in cui convergono le richieste provenienti dagli utenti e dal quale si diramano le interazioni verso le capability specializzate.

Per garantire flessibilità e manutenibilità, i servizi applicativi saranno progettati come componenti stateless, ciascuno responsabile di uno specifico dominio funzionale.

Le responsabilità saranno organizzate secondo un approccio orientato alle capability e non ai singoli moduli tecnici.

\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_

14.5 Logical Architecture

La Reference Architecture della Application Services Platform sarà articolata nei seguenti livelli logici.

API Gateway Layer

Espone le interfacce applicative verso la Experience Platform e verso eventuali sistemi esterni.

Service Orchestration Layer

Coordina le chiamate ai servizi di dominio, applicando workflow e regole di orchestrazione.

Business Services Layer

Implementa la logica di business, assicurando coerenza, riuso e indipendenza dalle tecnologie sottostanti.

Domain Validation Layer

Esegue i controlli di validazione sui dati e verifica il rispetto delle regole di dominio prima della persistenza o dell’invio ai servizi esterni.

Event Publishing Layer

Pubblica eventi applicativi destinati ad altre capability (ad esempio notifiche, AI Core o sistemi di monitoraggio), favorendo un’architettura progressivamente event-driven.

\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_

14.6 Componenti architetturali

La piattaforma sarà composta da moduli logici specializzati.

API Management

Gestisce esposizione, versionamento e documentazione delle API.

Workflow Engine

Coordina l’esecuzione dei processi applicativi.

Business Rules Engine

Centralizza le regole di dominio, evitando la loro dispersione nel codice.

Validation Engine

Garantisce la qualità e la consistenza dei dati in ingresso.

Event Dispatcher

Propaga eventi significativi verso le altre capability dell’ecosistema.

Service Registry

Mantiene il catalogo dei servizi disponibili, delle versioni e delle relative dipendenze, facilitando la governance e l’evoluzione della piattaforma.

\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_

14.7 Service Contracts

La Application Services Platform espone servizi verso:

●	Experience Platform (CAP-01);

●	Enterprise AI Core (CAP-04), per la richiesta di elaborazioni cognitive;

●	Integration Platform (CAP-05), per la comunicazione con sistemi esterni.

Consuma invece servizi provenienti da:

●	Enterprise Data Platform (CAP-03), per l’accesso al patrimonio informativo;

●	Enterprise Platform Services (CAP-06), per notifiche, scheduling e storage;

●	Trust Platform (CAP-07), per autenticazione, autorizzazione e audit.

Tutti i contratti dovranno essere versionati, documentati e progettati secondo il principio API First, garantendo compatibilità retroattiva e minimizzando l’impatto delle evoluzioni future.

PARTE II

SOLUTION ARCHITECTURE (TO-BE)

CAPITOLO 14

CAP-02 — APPLICATION SERVICES PLATFORM

(continuazione)

\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_

14.8 Information Managed

La Application Services Platform non rappresenta il sistema autorevole del patrimonio informativo, ma gestisce tutte le informazioni necessarie all’esecuzione dei processi applicativi.

Il suo compito consiste nel trasformare dati grezzi provenienti dalle diverse capability in informazioni contestualizzate, validate e coerenti con le regole di dominio.

Le principali categorie informative gestite comprendono:

Contesto applicativo

Informazioni necessarie per comprendere il contesto operativo della richiesta.

Ad esempio:

●	utente autenticato;

●	ruolo;

●	organizzazione scolastica;

●	sessione;

●	autorizzazioni;

●	contesto temporale.

\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_

Stato dei workflow

Ogni processo applicativo possiede uno stato.

La piattaforma dovrà essere in grado di gestire:

●	creazione;

●	aggiornamento;

●	avanzamento;

●	sospensione;

●	completamento;

●	annullamento.

Lo stato del workflow dovrà essere sempre ricostruibile.

\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_

Regole di dominio

Le regole di business non saranno distribuite nel codice.

Saranno centralizzate.

Tra esse:

●	vincoli applicativi;

●	criteri di validazione;

●	prerequisiti;

●	autorizzazioni funzionali;

●	politiche decisionali.

\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_

Eventi applicativi

Ogni operazione significativa produrrà eventi.

Ad esempio:

●	richiesta inviata;

●	documento aggiornato;

●	risposta AI disponibile;

●	pratica conclusa;

●	notifica inviata.

Gli eventi costituiranno il principale meccanismo di integrazione tra le capability.

\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_

14.9 AI Integration

La Application Services Platform rappresenta il principale orchestratore delle capacità cognitive dell’ecosistema.

È importante sottolineare una scelta architetturale fondamentale:

l’AI non prende decisioni di business.

Le decisioni rimangono sempre responsabilità della logica applicativa.

L’AI fornisce:

●	suggerimenti;

●	classificazioni;

●	sintesi;

●	estrazioni;

●	analisi;

●	generazione controllata di contenuti.

La Business Logic:

●	verifica;

●	valida;

●	applica le regole;

●	decide.

Questa distinzione garantisce conformità ai principi di Human Oversight e AI Governance definiti nell’EMA.

\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_

Pattern di orchestrazione AI

L’integrazione seguirà sempre lo stesso flusso:

Utente



↓



Experience Platform



↓



Application Services



↓



AI Core



↓



Quality Engine



↓



Business Validation



↓



Risposta



L’utente dialoga con l’AI.

Ma la decisione finale appartiene sempre ai servizi applicativi.

\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_

14.10 Security Model

La sicurezza della Application Services Platform rappresenta uno dei principali elementi di governo dell’intero ecosistema.

Ogni servizio dovrà implementare controlli omogenei.

\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_

Authentication

Ogni richiesta dovrà essere autenticata.

I servizi applicativi non implementeranno sistemi proprietari di autenticazione.

Consumeranno esclusivamente i servizi della Trust Platform.

\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_

Authorization

Ogni operazione dovrà verificare:

●	identità;

●	ruolo;

●	contesto;

●	autorizzazioni.

L’autorizzazione dovrà essere verificata ad ogni richiesta.

\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_

Input Validation

Tutti gli input saranno validati.

La validazione comprenderà:

●	formato;

●	consistenza;

●	integrità;

●	autorizzazioni;

●	regole di dominio.

\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_

Audit

Ogni servizio dovrà produrre log strutturati.

Saranno registrati:

●	chi;

●	quando;

●	cosa;

●	perché;

●	risultato;

●	durata;

●	eventuali errori.

\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_

14.11 Non Functional Requirements

Disponibilità

I servizi applicativi costituiscono il cuore operativo della piattaforma.

Pertanto dovranno garantire elevata continuità operativa.

\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_

Scalabilità

Ogni servizio dovrà poter essere scalato indipendentemente.

L’architettura eviterà servizi monolitici.

\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_

Osservabilità

Ogni servizio dovrà produrre:

●	metriche;

●	log;

●	eventi;

●	trace distribuite;

●	indicatori di salute.

\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_

Resilienza

I guasti locali non dovranno compromettere l’intero ecosistema.

Saranno privilegiati:

●	retry controllati;

●	timeout;

●	circuit breaker;

●	gestione delle code;

●	fallback.

\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_

Performance

Le API dovranno essere progettate minimizzando:

●	chiamate ridondanti;

●	payload inutili;

●	duplicazioni di elaborazione.

\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_

14.12 Technology Independence

Una delle decisioni fondamentali del SAPM consiste nel separare completamente l’architettura dalla tecnologia.

La Application Services Platform potrà essere implementata attraverso differenti combinazioni di strumenti, purché rispettino i principi architetturali definiti.

Ad esempio, il modello potrà essere realizzato utilizzando:

●	servizi serverless;

●	microservizi;

●	container orchestrati;

●	funzioni edge;

●	servizi gestiti cloud.

La scelta concreta sarà documentata nella Parte III attraverso Technology Decision Record (TDR), nei quali confronteremo soluzioni come Supabase Edge Functions, Cloudflare Workers, Azure Functions o altri servizi equivalenti rispetto a criteri di costo, scalabilità, portabilità e semplicità gestionale.

\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_

14.13 Dependencies

La Application Services Platform costituisce la capability maggiormente interconnessa dell’ecosistema.

Dipende da:



Capability	Ruolo

CAP-01 Experience Platform	Origine delle richieste utente

CAP-03 Enterprise Data Platform	Accesso ai dati persistenti

CAP-04 Enterprise AI Core	Elaborazioni cognitive

CAP-05 Integration Platform	Connessione con sistemi esterni

CAP-06 Enterprise Platform Services	Scheduling, notifiche, storage, runtime

CAP-07 Trust Platform	Sicurezza, identità, audit

CAP-08 Quality Platform	Validazione della qualità dei servizi

CAP-09 Governance Platform	Monitoraggio architetturale



Questa posizione centrale rende la CAP-02 il principale orchestratore delle capability, ma non il loro proprietario.

PARTE II

SOLUTION ARCHITECTURE (TO-BE)

CAPITOLO 15

CAP-03 — ENTERPRISE DATA PLATFORM

Canonical Domain Model (CDM)

\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_

15.1 Mission

La Enterprise Data Platform rappresenta il patrimonio informativo ufficiale di SportelloScuola 2.0.

La sua missione consiste nel garantire che ogni informazione prodotta, elaborata o utilizzata dall’ecosistema sia descritta, classificata, governata e resa disponibile secondo un modello unico e coerente.

La piattaforma non è semplicemente un database, ma il sistema di governo dei dati dell’intero ecosistema.

Ogni capability, servizio applicativo, componente AI o integrazione esterna dovrà utilizzare questo patrimonio informativo come unica fonte autorevole, evitando duplicazioni, incoerenze e dipendenze tecnologiche.

\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_

15.2 Principi fondamentali

La progettazione della Enterprise Data Platform si basa sui seguenti principi.

Single Source of Truth

Ogni informazione possiede una sola rappresentazione autorevole.

Non possono esistere copie divergenti della stessa entità.

\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_

Canonical Data Model

Le informazioni vengono descritte attraverso un modello concettuale stabile, indipendente dal database e dalle tecnologie di persistenza.

\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_

Semantic Consistency

Ogni termine utilizzato nell’ecosistema possiede un significato univoco e condiviso.

La stessa entità non può assumere denominazioni differenti in moduli diversi.

\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_

Data as a Strategic Asset

Il patrimonio informativo costituisce un bene strategico dell’organizzazione e deve essere governato come tale.

\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_

Technology Independence

Le entità del dominio non dipendono dalla struttura fisica del database, dal provider cloud o dal motore di persistenza.

\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_

15.3 Canonical Domain Model

Il Canonical Domain Model identifica le principali entità dell’ecosistema.

Esse rappresentano il linguaggio comune tra strategia, progettazione, sviluppo e gestione operativa.

\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_

Dominio Identity

Utente

Rappresenta qualsiasi soggetto che interagisce con la piattaforma.

Attributi principali:

●	identificativo univoco;

●	profilo;

●	ruolo;

●	preferenze;

●	stato;

●	credenziali federate.

\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_

Organizzazione

Identifica un ente appartenente all’ecosistema.

Può rappresentare:

●	istituto scolastico;

●	ufficio amministrativo;

●	ente territoriale;

●	organizzazione partner.

\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_

Ruolo

Definisce le responsabilità e le autorizzazioni assegnate agli utenti.

La gestione dei ruoli sarà centralizzata nella Trust Platform.

\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_

Dominio Knowledge

Documento

Qualsiasi contenuto persistente gestito dall’ecosistema.

Comprende:

●	documenti amministrativi;

●	circolari;

●	allegati;

●	modelli;

●	file multimediali.

\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_

Fonte

Identifica l’origine ufficiale di una informazione.

Ogni documento dovrà essere collegato ad almeno una fonte autorevole.

Questo elemento sarà fondamentale per l’affidabilità delle risposte generate dall’AI.

\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_

Norma

Rappresenta atti normativi, regolamenti, linee guida e riferimenti giuridici.

Ogni norma possiederà:

●	identificativo;

●	ambito;

●	versione;

●	periodo di validità;

●	collegamenti ad altre norme.

\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_

Knowledge Asset

Qualsiasi elemento utilizzato per costruire il patrimonio informativo dell’ecosistema.

Può comprendere:

●	FAQ;

●	procedure;

●	documentazione tecnica;

●	contenuti semantici;

●	basi di conoscenza.

\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_

Dominio AI

Conversazione

Rappresenta una sessione di interazione tra utente e AI.

\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_

Prompt

Descrive la richiesta elaborata dal motore cognitivo.

\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_

AI Response

Memorizza la risposta prodotta dall’AI.

\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_

Evaluation

Contiene gli indicatori di qualità della risposta.

\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_

Citation

Collega ogni risposta AI alle fonti documentali utilizzate.

Questo elemento rappresenta una delle innovazioni più importanti dell’architettura proposta, poiché consente di garantire trasparenza, verificabilità e affidabilità delle risposte generate.

\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_

Dominio Process

Procedimento

Descrive un processo amministrativo o operativo.

\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_

Workflow

Rappresenta la sequenza delle attività che costituiscono un procedimento.

\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_

Task

Unità elementare di lavoro.

\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_

Evento

Qualsiasi cambiamento significativo dello stato dell’ecosistema.

Gli eventi costituiranno il principale meccanismo di comunicazione tra le capability.

\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_

Dominio Governance

Architecture Decision

Rappresenta una decisione progettuale formalizzata tramite Architecture Decision Record (ADR).

\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_

Capability

Identifica una capability dell’ecosistema.

\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_

KPI

Definisce gli indicatori di monitoraggio delle capability.

\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_

Risk

Registra i rischi architetturali, operativi e progettuali.

\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_

15.4 Relazioni fondamentali

Il Canonical Domain Model definisce le relazioni logiche tra le entità.

A titolo esemplificativo:

●	un Utente appartiene a una Organizzazione;

●	un Utente ricopre uno o più Ruoli;

●	una Norma è collegata a uno o più Documenti;

●	un Knowledge Asset deriva da una o più Fonti;

●	una Conversazione contiene uno o più Prompt;

●	un Prompt genera una o più AI Response;

●	ogni AI Response è associata a una o più Citation;

●	un Procedimento comprende uno o più Workflow;

●	un Workflow è composto da più Task;

●	ogni Evento può aggiornare il ciclo di vita di un Procedimento.

Queste relazioni costituiscono il modello logico del dominio e saranno successivamente tradotte nel modello fisico della piattaforma dati.

\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_

15.5 Decisione architetturale

Architecture Decision

Il Canonical Domain Model rappresenta il modello informativo ufficiale dell’ecosistema.

Il database, il Knowledge Graph, gli indici vettoriali, il motore RAG e le API non potranno introdurre concetti non presenti nel CDM senza una revisione architetturale formale.

Questa decisione garantisce che il dominio rimanga stabile anche in presenza di evoluzioni tecnologiche o organizzative.

PARTE II

SOLUTION ARCHITECTURE (TO-BE)

CAPITOLO 16

CAP-03 — ENTERPRISE DATA PLATFORM

Data Governance Framework

\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_

16.1 Vision

Il patrimonio informativo rappresenta uno degli asset strategici fondamentali dell’ecosistema SportelloScuola 2.0.

La qualità dei servizi applicativi, delle funzionalità di Intelligenza Artificiale e dei processi decisionali dipende direttamente dalla qualità, affidabilità e governabilità delle informazioni gestite.

La Data Governance definisce quindi l’insieme dei principi, delle responsabilità, delle politiche e dei processi necessari affinché il patrimonio informativo sia amministrato in modo uniforme durante tutto il suo ciclo di vita.

Essa costituisce il livello di governo sovraordinato rispetto alla progettazione del database e garantisce che ogni dato sia trattato come una risorsa condivisa dell’ecosistema.

\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_

16.2 Obiettivi

Il Data Governance Framework persegue i seguenti obiettivi:

●	assicurare la qualità dei dati;

●	garantire coerenza semantica;

●	definire responsabilità chiare;

●	supportare la conformità normativa;

●	favorire il riuso delle informazioni;

●	assicurare la tracciabilità completa del ciclo di vita dei dati;

●	consentire l’integrazione con i servizi di AI e con il Knowledge Graph.

\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_

16.3 Principi

Data as an Enterprise Asset

I dati appartengono all’intero ecosistema e non alle singole applicazioni.

Ogni capability contribuisce alla loro creazione e al loro utilizzo, ma nessuna può appropriarsene o gestirli in modo isolato.

\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_

Single Source of Truth

Ogni informazione possiede una sola rappresentazione autorevole.

Qualsiasi replica dovrà derivare dalla fonte ufficiale.

\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_

Semantic Consistency

Le definizioni delle entità e dei relativi attributi devono essere univoche e coerenti con il Canonical Domain Model.

\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_

Privacy by Design

La protezione dei dati personali deve essere integrata fin dalla progettazione dei processi e delle strutture informative.

\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_

AI-Ready Data

I dati dovranno essere organizzati in modo da poter alimentare sistemi di Intelligenza Artificiale mantenendo tracciabilità, qualità e verificabilità delle fonti.

\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_

16.4 Ruoli e responsabilità

Per garantire una gestione efficace del patrimonio informativo, l’ecosistema adotterà un modello organizzativo basato su ruoli distinti.

Enterprise Data Owner

È responsabile della governance complessiva del patrimonio informativo.

Definisce le politiche di gestione, approva le modifiche al Canonical Domain Model e supervisiona l’evoluzione della piattaforma dati.

\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_

Data Steward

Garantisce la qualità e la coerenza dei dati appartenenti a uno specifico dominio informativo.

Verifica il rispetto delle regole di classificazione, qualità e conservazione.

\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_

Data Custodian

Ha la responsabilità tecnica della protezione, della disponibilità e della manutenzione dell’infrastruttura dati.

Nel contesto attuale, tale ruolo sarà svolto dalla Enterprise Platform Services.

\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_

Information Consumer

Comprende tutte le capability e gli utenti autorizzati a utilizzare i dati per finalità operative, decisionali o analitiche.

\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_

16.5 Classificazione delle informazioni

Il patrimonio informativo sarà classificato in funzione della sensibilità e delle modalità di trattamento.



Classe	Descrizione	Esempi

Pubblica	Informazioni liberamente consultabili	FAQ, guide, documentazione pubblica

Interna	Informazioni destinate all’uso interno della piattaforma	configurazioni applicative, workflow

Riservata	Informazioni accessibili solo a utenti autorizzati	pratiche, documenti amministrativi

Critica	Informazioni la cui compromissione comporterebbe gravi conseguenze	dati personali, credenziali, audit log, chiavi crittografiche



La classificazione influenzerà direttamente i controlli di sicurezza, le politiche di conservazione e i requisiti di audit.

\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_

16.6 Data Quality Framework

La qualità del patrimonio informativo sarà valutata secondo sei dimensioni fondamentali.

Accuratezza

I dati devono rappresentare correttamente la realtà.

Completezza

Le informazioni necessarie devono essere presenti e sufficienti.

Coerenza

Le stesse informazioni non devono risultare discordanti tra sistemi differenti.

Tempestività

I dati devono essere aggiornati e disponibili quando necessario.

Unicità

Ogni entità deve essere rappresentata una sola volta.

Tracciabilità

Deve essere sempre possibile ricostruire l’origine, le modifiche e gli utilizzi di ciascun dato.

\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_

16.7 Data Lifecycle

Ogni informazione seguirà un ciclo di vita standardizzato.

1\.	Creazione.

2\.	Validazione.

3\.	Classificazione.

4\.	Persistenza.

5\.	Utilizzo operativo.

6\.	Condivisione.

7\.	Archiviazione.

8\.	Conservazione.

9\.	Eliminazione controllata.

Ogni fase dovrà essere governata da politiche esplicite e verificabili.

\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_

16.8 Metadata Management

Ogni entità del Canonical Domain Model dovrà essere accompagnata da metadati strutturati.

Tra essi:

●	identificativo univoco;

●	descrizione;

●	dominio di appartenenza;

●	proprietario del dato;

●	livello di classificazione;

●	data di creazione;

●	data di ultimo aggiornamento;

●	fonte;

●	versione;

●	stato del ciclo di vita;

●	requisiti di conservazione.

Questo consentirà di costruire in futuro un vero Enterprise Data Catalog.

\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_

16.9 Data Lineage

Uno degli elementi distintivi della futura piattaforma sarà la tracciabilità completa del percorso seguito dalle informazioni.

Per ogni dato dovrà essere possibile ricostruire:

●	origine;

●	trasformazioni subite;

●	servizi che lo hanno elaborato;

●	capability coinvolte;

●	utilizzi da parte dei modelli AI;

●	citazioni presenti nelle risposte generate;

●	eventuale eliminazione o archiviazione.

Il Data Lineage costituirà uno strumento essenziale per la governance, la conformità normativa e la qualità delle elaborazioni AI.

\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_

16.10 Decisione architetturale

Architecture Decision

Nessun componente dell’ecosistema potrà gestire dati al di fuori del Data Governance Framework.

Ogni nuova entità dovrà essere:

●	definita nel Canonical Domain Model;

●	classificata;

●	associata a un Data Owner;

●	dotata di metadati;

●	inserita nel Data Catalog;

●	soggetta a politiche di qualità e ciclo di vita.

Questa decisione garantirà uniformità e controllabilità dell’intero patrimonio informativo.

\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_

Architectural Traceability Matrix (ATM)



EMA	SAPM	Repository	OpenProject

Patrimonio Informativo	Data Governance Framework	Migration, schema dati, metadata	Capability “Enterprise Data Governance”

AI Governance	Data Lineage	Pipeline AI e RAG	Epic “AI Governance”

Governance	Enterprise Data Catalog	Catalogo metadati	Epic “Metadata Management”

Compliance	Data Classification	Policy di accesso	Feature “Data Classification”



PARTE II

SOLUTION ARCHITECTURE (TO-BE)

CAPITOLO 17

CAP-03 — ENTERPRISE DATA PLATFORM

Enterprise Information Architecture (EIA)

\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_

17.1 Vision

L’Enterprise Information Architecture definisce la struttura logica attraverso cui tutte le informazioni dell’ecosistema vengono organizzate, governate, condivise e utilizzate.

Essa non descrive tecnologie specifiche, ma individua i diversi repository informativi, il loro ruolo, le modalità di interazione e le responsabilità associate.

L’obiettivo è costruire una piattaforma dati nella quale ogni informazione sia archiviata nel componente più appropriato, mantenendo coerenza semantica, tracciabilità e indipendenza tecnologica.

\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_

17.2 Principi

L’architettura informativa si fonda sui seguenti principi.

Specializzazione

Ogni repository deve essere utilizzato esclusivamente per il tipo di informazione per cui è stato progettato.

Federazione

I diversi repository cooperano tra loro senza duplicare inutilmente le informazioni.

Interoperabilità

Le informazioni possono essere condivise attraverso modelli comuni e contratti standardizzati.

Evolvibilità

Nuovi repository potranno essere introdotti senza modificare il modello concettuale del dominio.

Neutralità tecnologica

L’architettura descrive funzioni e responsabilità, non prodotti commerciali.

\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_

17.3 Repository informativi dell’ecosistema

L’ecosistema sarà articolato in differenti livelli informativi.

1\. Operational Data Store (ODS)

Missione

Gestire le informazioni operative utilizzate quotidianamente dalla piattaforma.

Contenuti

●	utenti;

●	organizzazioni;

●	pratiche;

●	workflow;

●	notifiche;

●	configurazioni.

Implementazione prevista

Nel contesto attuale il ruolo di ODS sarà svolto dal database PostgreSQL gestito tramite Supabase.

\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_

2\. Document Repository

Missione

Gestire documenti e allegati.

Contenuti

●	PDF;

●	immagini;

●	modelli;

●	documentazione;

●	allegati amministrativi.

Implementazione prevista

Supabase Storage, mantenendo i metadati nel database relazionale.

\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_

3\. Knowledge Repository

Missione

Costituire il patrimonio documentale utilizzato dall’AI.

Contenuti

●	FAQ;

●	procedure;

●	regolamenti;

●	guide operative;

●	manuali;

●	normativa.

Ogni documento dovrà essere versionato e classificato.

\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_

4\. Vector Knowledge Store

Missione

Conservare le rappresentazioni vettoriali utilizzate dal motore RAG.

Contenuti

●	embeddings;

●	chunk semantici;

●	metadati dei documenti;

●	riferimenti alle fonti.

L’architettura rimane indipendente dall’implementazione: inizialmente potrà essere realizzata con pgvector in PostgreSQL, ma il modello consentirà, se necessario, l’adozione futura di motori dedicati senza modificare il dominio.

\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_

5\. Knowledge Graph

Missione

Rappresentare le relazioni semantiche tra entità.

Contenuti

●	norme;

●	documenti;

●	utenti;

●	procedure;

●	organizzazioni;

●	capability;

●	eventi.

Il Knowledge Graph non sostituisce il database relazionale, ma ne arricchisce la capacità di rappresentare connessioni complesse.

\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_

6\. Event Store

Missione

Memorizzare gli eventi prodotti dall’ecosistema.

Contenuti

●	audit;

●	eventi applicativi;

●	eventi AI;

●	notifiche;

●	aggiornamenti dei workflow.

Questa componente consentirà, nel tempo, l’introduzione di un’architettura progressivamente event-driven.

\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_

7\. Observability Repository

Missione

Raccogliere informazioni utili al monitoraggio operativo.

Contenuti

●	log;

●	metriche;

●	trace distribuite;

●	indicatori di salute;

●	performance.

\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_

17.4 Flusso delle informazioni

L’Enterprise Information Architecture prevede un ciclo informativo standard.

1\.	La Experience Platform genera una richiesta.

2\.	La Application Services Platform valida ed elabora la richiesta.

3\.	La Enterprise Data Platform aggiorna il patrimonio informativo.

4\.	Gli eventi vengono registrati nell’Event Store.

5\.	I documenti sono salvati nel Document Repository.

6\.	I contenuti destinati all’AI vengono indicizzati nel Knowledge Repository.

7\.	Gli embeddings sono generati e archiviati nel Vector Knowledge Store.

8\.	Le relazioni vengono aggiornate nel Knowledge Graph.

9\.	Le metriche operative sono inviate all’Observability Repository.

Questo flusso assicura che ogni informazione segua un percorso controllato e tracciabile.

\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_

17.5 Data Distribution Strategy

La distribuzione delle informazioni seguirà il principio del Best-Fit Repository.



Tipo di informazione	Repository primario

Dati transazionali	Operational Data Store

File e allegati	Document Repository

Documentazione e conoscenza	Knowledge Repository

Embeddings	Vector Knowledge Store

Relazioni semantiche	Knowledge Graph

Eventi	Event Store

Log e metriche	Observability Repository



Questa strategia evita l’uso improprio di un singolo repository per esigenze eterogenee, migliorando prestazioni, manutenibilità e scalabilità.

\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_

17.6 Evoluzione tecnologica

L’architettura informativa è progettata per consentire una crescita progressiva.

Fase iniziale (MVP evoluto)

●	PostgreSQL + pgvector (Supabase)

●	Supabase Storage

●	Eventi registrati nel database

●	Logging centralizzato

Fase intermedia

●	Introduzione di un broker di messaggistica open source (ad esempio NATS o RabbitMQ, da valutare nella Parte III in base ai requisiti e ai costi).

●	Catalogo metadati dedicato.

●	Pipeline ETL leggere.

Fase avanzata

●	Knowledge Graph dedicato.

●	Event Store specializzato.

●	Data Catalog enterprise.

●	Data Lineage automatizzato.

Questa roadmap consente di partire con uno stack semplice e a basso costo, mantenendo un percorso chiaro verso un’architettura enterprise senza riscritture sostanziali.

\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_

17.7 Decisione architetturale

Architecture Decision

Ogni categoria informativa dovrà essere gestita dal repository più idoneo, evitando concentrazioni artificiali nel database relazionale.

Il database PostgreSQL rappresenterà il nucleo operativo della piattaforma, ma non l’unico repository informativo.

L’evoluzione dell’ecosistema dovrà avvenire attraverso l’aggiunta di repository specializzati, mantenendo invariato il Canonical Domain Model.

\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_

Capability Interaction Matrix (CIM)



&#x09;Capability produttrice	Capability consumatrici

Operational Data Store	CAP-02	CAP-01, CAP-04, CAP-05

Document Repository	CAP-02	CAP-04

Knowledge Repository	CAP-03	CAP-04

Vector Knowledge Store	CAP-03	CAP-04

Knowledge Graph	CAP-03	CAP-04, CAP-09

Event Store	Tutte le capability	CAP-08, CAP-09

Observability Repository	Tutte le capability	CAP-08, CAP-09



PARTE II

SOLUTION ARCHITECTURE (TO-BE)

CAPITOLO 18

CAP-03 — ENTERPRISE DATA PLATFORM

Physical Data Architecture

\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_

18.1 Vision

La Physical Data Architecture rappresenta la traduzione del Canonical Domain Model nel modello di persistenza adottato dalla piattaforma.

Il suo obiettivo è garantire che ogni scelta implementativa rimanga coerente con i principi architetturali definiti dall’EMA e con il Data Governance Framework, evitando che lo schema fisico evolva in modo disordinato.

L’architettura fisica dovrà essere considerata un’implementazione del dominio e non la sua definizione.

Ogni modifica allo schema dovrà quindi essere giustificata da un’evoluzione del dominio o da un requisito architetturale formalmente approvato.

\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_

18.2 Principi di progettazione dello schema

La progettazione dello schema fisico seguirà i seguenti principi.

Domain Driven Persistence

Le tabelle riflettono le entità del Canonical Domain Model.

Non devono rappresentare esclusivamente esigenze implementative temporanee.

\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_

Evoluzione controllata

Ogni modifica allo schema sarà effettuata esclusivamente mediante migration versionate.

Sono vietate modifiche manuali direttamente sull’ambiente di produzione.

\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_

Backward Compatibility

Le modifiche dovranno privilegiare strategie compatibili con le versioni precedenti.

Quando non possibile, dovrà essere predisposto un piano di migrazione e rollback.

\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_

Modularità

Le tabelle saranno organizzate per domini funzionali, evitando accoppiamenti eccessivi.

\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_

Sicurezza nativa

La protezione dei dati sarà implementata direttamente a livello del database attraverso politiche di accesso, Row Level Security e privilegi minimi.

\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_

18.3 Organizzazione logica dello schema

Lo schema fisico sarà articolato in macro-domini coerenti con il Canonical Domain Model.

Identity Domain

Comprende le strutture dedicate a:

●	utenti;

●	profili;

●	organizzazioni;

●	ruoli;

●	autorizzazioni.

L’autenticazione rimarrà delegata ai servizi della piattaforma di identità, mentre il database conserverà esclusivamente le informazioni necessarie al dominio applicativo.

\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_

Knowledge Domain

Comprende:

●	documenti;

●	fonti;

●	riferimenti normativi;

●	knowledge asset;

●	metadati.

Le relazioni tra tali entità costituiranno il fondamento del futuro Knowledge Graph.

\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_

AI Domain

Comprende:

●	conversazioni;

●	prompt;

●	risposte;

●	valutazioni;

●	citazioni;

●	embeddings;

●	metriche AI.

Questa separazione consentirà di evolvere il sistema cognitivo senza alterare il modello dei dati amministrativi.

\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_

Process Domain

Comprende:

●	procedimenti;

●	workflow;

●	task;

●	eventi;

●	notifiche.

Le strutture saranno progettate per supportare processi asincroni e stati evolutivi complessi.

\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_

Governance Domain

Comprende:

●	capability;

●	KPI;

●	Architecture Decision Record;

●	rischi;

●	audit.

Queste informazioni costituiranno il patrimonio di governo dell’intero ecosistema.

\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_

18.4 Convenzioni di progettazione

Per garantire uniformità, tutte le strutture dati seguiranno convenzioni comuni.

Identificativi

Ogni entità utilizzerà identificativi univoci globali (UUID), evitando chiavi incrementali come identificatori di dominio.

Timestamp

Ogni tabella dovrà includere, salvo motivate eccezioni:

●	data di creazione;

●	data di ultimo aggiornamento;

●	eventuale data di eliminazione logica.

Audit

Le modifiche rilevanti dovranno essere tracciabili, indicando autore, operazione eseguita e momento dell’aggiornamento.

Soft Delete

Quando compatibile con i requisiti di conservazione, le eliminazioni saranno gestite tramite cancellazione logica, preservando la possibilità di recupero e audit.

Versionamento

Le entità soggette a evoluzione documentale o normativa dovranno prevedere meccanismi di versionamento esplicito.

\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_

18.5 Row Level Security (RLS)

La sicurezza a livello di riga rappresenta uno dei pilastri dell’architettura fisica.

Ogni tabella contenente informazioni non pubbliche dovrà essere protetta mediante policy RLS.

Le policy dovranno essere progettate secondo il principio del Least Privilege, garantendo che ogni utente possa accedere esclusivamente ai dati necessari allo svolgimento delle proprie attività.

Le regole di autorizzazione saranno derivate dai ruoli definiti nella Trust Platform e applicate in modo coerente su tutte le entità.

\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_

18.6 Indici e ottimizzazione

Gli indici dovranno essere progettati in funzione dei casi d’uso e non introdotti indiscriminatamente.

Saranno privilegiati:

●	indici sulle chiavi di ricerca frequente;

●	indici compositi per interrogazioni ricorrenti;

●	indici dedicati alle relazioni tra entità;

●	indici vettoriali per il recupero semantico.

Ogni nuovo indice dovrà essere giustificato da esigenze misurabili di prestazioni.

\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_

18.7 Storage Architecture

I file non saranno memorizzati nel database relazionale.

Il modello fisico distinguerà chiaramente:

●	metadati, persistiti nel database;

●	contenuti binari, gestiti tramite lo Storage Object.

Ogni documento sarà identificato da un riferimento persistente che consentirà di ricostruire le relazioni con il patrimonio informativo.

Questa separazione migliora scalabilità, prestazioni e semplicità di gestione.

\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_

18.8 Gestione degli embeddings

Le rappresentazioni vettoriali saranno considerate dati derivati e non dati primari.

Ogni embedding dovrà essere collegato:

●	al documento di origine;

●	alla versione del documento;

●	al modello utilizzato per la generazione;

●	alla data di elaborazione.

Questo approccio consentirà di rigenerare gli embeddings in caso di aggiornamento dei modelli AI senza compromettere il patrimonio informativo originale.

\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_

18.9 Versionamento dello schema

L’evoluzione del database sarà governata tramite migration incrementali.

Ogni migration dovrà:

●	essere atomica;

●	essere reversibile quando tecnicamente possibile;

●	riportare una motivazione architetturale;

●	essere collegata a un ADR e a un’attività di OpenProject;

●	essere validata negli ambienti di sviluppo e test prima della produzione.

Questa disciplina garantirà la tracciabilità completa delle modifiche strutturali.

\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_

18.10 Decisione architetturale

Architecture Decision

Lo schema fisico del database è un artefatto implementativo derivato dal Canonical Domain Model e non può evolvere autonomamente.

Ogni modifica strutturale dovrà essere coerente con:

●	Enterprise Master Architecture;

●	Canonical Domain Model;

●	Data Governance Framework;

●	Architecture Decision Record;

●	pianificazione di OpenProject.

In questo modo si mantiene l’allineamento tra strategia, architettura e implementazione.

\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_

Architectural Traceability Matrix (ATM)



Livello	Artefatto	Collegamento

Strategia	EMA	Domini informativi e principi di governance

Architettura	Canonical Domain Model	Entità e relazioni logiche

Governance	Data Governance Framework	Politiche di qualità, classificazione e ciclo di vita

Implementazione	Physical Data Architecture	Schema fisico, migration, RLS, Storage

Operatività	OpenProject	Epic, Feature, Task e milestone di evoluzione



PARTE II

SOLUTION ARCHITECTURE (TO-BE)

CAPITOLO 19

CAP-04 — ENTERPRISE AI CORE

Enterprise AI \& Knowledge Processing Architecture

\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_

19.1 Vision

L’Enterprise AI Core costituisce la capability responsabile dell’erogazione dei servizi cognitivi dell’ecosistema SportelloScuola 2.0.

La sua missione non consiste nel generare autonomamente contenuti, bensì nel trasformare il patrimonio informativo governato dalla Enterprise Data Platform in conoscenza contestualizzata, verificabile e utilizzabile dai servizi applicativi.

L’AI Core opera come una piattaforma di orchestrazione che coordina modelli linguistici, basi di conoscenza, motori di ricerca semantica, sistemi di valutazione della qualità e controlli di governance.

Questa architettura garantisce che ogni risposta prodotta sia riconducibile a fonti documentali affidabili, sia sottoposta a verifiche automatiche e rimanga sempre sotto il controllo delle regole applicative.

\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_

19.2 Principi architetturali

L’Enterprise AI Core è progettata secondo i seguenti principi.

Human-Centred AI

L’Intelligenza Artificiale supporta il processo decisionale ma non sostituisce il giudizio umano nelle decisioni amministrative, organizzative o giuridiche.

\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_

Retrieval First

Le risposte devono essere costruite privilegiando il recupero di informazioni documentate rispetto alla generazione libera di testo.

\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_

Source Grounding

Ogni contenuto prodotto deve poter essere ricondotto a una o più fonti identificate, versionate e verificabili.

\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_

Explainability

Il sistema deve essere in grado di esplicitare le motivazioni, le fonti e il contesto che hanno determinato una risposta.

\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_

Continuous Evaluation

La qualità delle elaborazioni cognitive deve essere monitorata e migliorata continuamente attraverso metriche oggettive e feedback degli utenti.

\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_

19.3 Enterprise AI Pipeline

L’intero processo cognitivo sarà organizzato come una pipeline composta da fasi indipendenti e orchestrate.

Fase 1 – Ricezione della richiesta

La richiesta dell’utente viene ricevuta dalla Experience Platform e inoltrata alla Application Services Platform.

Vengono acquisiti:

●	identità dell’utente;

●	ruolo;

●	contesto applicativo;

●	lingua;

●	preferenze;

●	cronologia rilevante.

\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_

Fase 2 – Contestualizzazione

L’Application Services Platform arricchisce la richiesta con il contesto necessario.

Ad esempio:

●	istituzione scolastica;

●	procedura amministrativa;

●	normativa applicabile;

●	documenti correlati;

●	cronologia della conversazione.

\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_

Fase 3 – Knowledge Retrieval

L’AI Core interroga il patrimonio informativo.

Le ricerche possono coinvolgere:

●	repository documentali;

●	database relazionale;

●	Vector Store;

●	Knowledge Graph;

●	metadati;

●	FAQ;

●	basi normative.

L’obiettivo è costruire un contesto informativo affidabile prima di coinvolgere il modello linguistico.

\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_

Fase 4 – Context Assembly

Le informazioni recuperate vengono selezionate, deduplicate, ordinate e sintetizzate.

Il sistema costruisce un contesto strutturato che include:

●	estratti documentali;

●	riferimenti normativi;

●	metadati;

●	livello di affidabilità delle fonti;

●	data di aggiornamento;

●	relazioni semantiche.

\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_

Fase 5 – Prompt Orchestration

Il Prompt Engine genera dinamicamente il prompt destinato al modello linguistico.

Il prompt comprenderà:

●	istruzioni di sistema;

●	contesto recuperato;

●	vincoli applicativi;

●	politiche di sicurezza;

●	requisiti di citazione delle fonti.

In questo modo il comportamento del modello sarà governato centralmente e non distribuito nel codice.

\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_

Fase 6 – LLM Processing

Il modello linguistico elabora il prompt producendo una risposta preliminare.

L’LLM non accede direttamente ai database né ai repository.

Riceve esclusivamente il contesto preparato dall’AI Core.

\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_

Fase 7 – Quality Engine

La risposta viene sottoposta a verifiche automatiche.

Tra queste:

●	presenza delle fonti;

●	coerenza con il contesto;

●	completezza;

●	rilevazione di possibili allucinazioni;

●	conformità alle policy dell’ecosistema;

●	verifica della struttura della risposta.

Solo le risposte che superano tali controlli proseguono nella pipeline.

\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_

Fase 8 – Business Validation

La Application Services Platform verifica che la risposta sia compatibile con le regole di business.

In questa fase possono essere applicati:

●	controlli autorizzativi;

●	limitazioni funzionali;

●	filtri sui contenuti;

●	integrazione con workflow applicativi.

\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_

Fase 9 – Delivery

La risposta viene restituita alla Experience Platform insieme a:

●	citazioni;

●	livello di affidabilità;

●	documenti correlati;

●	data delle fonti;

●	eventuali avvisi di limitazione.

\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_

19.4 Knowledge Processing Lifecycle

Il patrimonio documentale seguirà un ciclo di elaborazione standardizzato.

1\.	Acquisizione del documento.

2\.	Validazione della fonte.

3\.	Estrazione dei metadati.

4\.	Classificazione.

5\.	Versionamento.

6\.	Suddivisione in chunk semantici.

7\.	Generazione degli embeddings.

8\.	Indicizzazione nel Vector Store.

9\.	Aggiornamento del Knowledge Graph.

10\.	Pubblicazione per il Retrieval Engine.

Questo ciclo garantisce che il patrimonio informativo sia sempre coerente, aggiornato e pronto per essere utilizzato dall’AI.

\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_

19.5 Decisione architetturale

Architecture Decision

Nessun modello linguistico potrà accedere direttamente al patrimonio informativo dell’ecosistema.

Ogni interazione con i dati dovrà essere mediata dalla Enterprise AI Core, che assicura:

●	controllo del contesto;

●	selezione delle fonti;

●	applicazione delle policy;

●	monitoraggio della qualità;

●	tracciabilità delle elaborazioni.

Questa scelta riduce il rischio di risposte non governate e mantiene il controllo architetturale sull’intero processo cognitivo.

\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_

Capability Interaction Matrix (CIM)



Capability	Interazione con CAP-04	Finalità

CAP-01 Experience Platform	Richieste e presentazione delle risposte	Interazione utente

CAP-02 Application Services	Orchestrazione e validazione	Controllo della logica di business

CAP-03 Enterprise Data Platform	Fornitura di dati, documenti e metadati	Costruzione del contesto

CAP-06 Enterprise Platform Services	Scheduling, storage e runtime	Supporto infrastrutturale

CAP-07 Trust Platform	Controllo identità e autorizzazioni	Sicurezza

CAP-08 Quality Platform	Metriche e valutazione	Miglioramento continuo

CAP-09 Governance Platform	Audit e conformità	Supervisione



PARTE II

SOLUTION ARCHITECTURE (TO-BE)

CAPITOLO 20

CAP-04 — ENTERPRISE AI CORE

AI Governance \& Model Management

\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_

20.1 Vision

L’Enterprise AI Core non identifica un singolo modello linguistico, bensì una piattaforma di governo delle capacità cognitive dell’ecosistema.

I modelli di AI rappresentano componenti sostituibili, selezionati e gestiti in funzione delle esigenze operative, dei requisiti normativi, delle prestazioni e dei costi.

L’obiettivo dell’AI Governance è garantire che ogni elaborazione automatica sia:

●	tracciabile;

●	verificabile;

●	monitorabile;

●	sicura;

●	conforme alle normative;

●	indipendente dal fornitore.

La piattaforma deve poter evolvere nel tempo senza vincolare l’architettura a uno specifico provider.

\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_

20.2 Principi di AI Governance

L’AI Governance si fonda sui seguenti principi.

Human Oversight

Le decisioni che producono effetti giuridici o amministrativi devono rimanere sotto il controllo umano.

L’AI fornisce supporto informativo, non sostituisce il decisore.

\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_

Transparency

Gli utenti devono essere informati quando stanno interagendo con un sistema di Intelligenza Artificiale.

Le risposte devono distinguere chiaramente tra:

●	contenuti generati automaticamente;

●	informazioni tratte da fonti ufficiali;

●	valutazioni del modello.

\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_

Accountability

Ogni elaborazione AI deve essere riconducibile a:

●	modello utilizzato;

●	versione del modello;

●	prompt;

●	documenti consultati;

●	utente richiedente;

●	timestamp;

●	configurazione del sistema.

\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_

Explainability

Per ogni risposta deve essere possibile ricostruire:

●	contesto utilizzato;

●	fonti documentali;

●	regole applicate;

●	motivazioni della risposta.

\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_

Continuous Improvement

L’AI deve essere monitorata e migliorata continuamente sulla base di metriche oggettive e feedback degli utenti.

\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_

20.3 Enterprise Model Registry

L’architettura prevede un Model Registry centralizzato.

Ogni modello AI dovrà essere censito attraverso un catalogo contenente almeno:

●	identificativo;

●	provider;

●	versione;

●	data di introduzione;

●	casi d’uso autorizzati;

●	limiti operativi;

●	requisiti di sicurezza;

●	metriche di qualità;

●	stato del ciclo di vita.

Il registro consentirà di gestire contemporaneamente modelli differenti.

\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_

20.4 Provider Abstraction Layer

Una delle principali decisioni architetturali consiste nell’introdurre un livello di astrazione tra la piattaforma e i modelli AI.

L’Application Services Platform dialogherà esclusivamente con un AI Provider Adapter, senza conoscere il provider sottostante.

Questa scelta consentirà di sostituire o integrare facilmente differenti modelli, ad esempio:

●	servizi commerciali;

●	modelli open source;

●	modelli specializzati per specifici domini;

●	modelli eseguiti localmente.

L’adozione o la sostituzione di un provider non richiederà modifiche alla logica applicativa.

\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_

20.5 Prompt Management

I prompt costituiscono un patrimonio informativo dell’ecosistema e devono essere governati come qualsiasi altro artefatto architetturale.

Ogni prompt sarà:

●	identificato univocamente;

●	versionato;

●	documentato;

●	associato ai casi d’uso;

●	sottoposto a revisione;

●	tracciato nelle esecuzioni.

La gestione centralizzata consentirà di migliorare progressivamente la qualità delle interazioni senza modificare il codice applicativo.

\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_

20.6 AI Evaluation Framework

La qualità delle elaborazioni sarà monitorata attraverso un framework di valutazione continuo.

Le principali dimensioni considerate saranno:

Accuratezza

Correttezza delle informazioni restituite.

Groundedness

Aderenza della risposta alle fonti documentali utilizzate.

Completezza

Copertura delle richieste formulate.

Chiarezza

Comprensibilità e qualità espositiva.

Affidabilità

Stabilità dei risultati in condizioni analoghe.

Tempo di risposta

Latenza complessiva della pipeline AI.

Costo

Consumo di token e costo economico dell’elaborazione.

Soddisfazione dell’utente

Valutazione espressa dagli utilizzatori della piattaforma.

\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_

20.7 Fallback Strategy

Per garantire la continuità del servizio, la piattaforma dovrà prevedere meccanismi di fallback.

Tra gli scenari gestiti:

●	indisponibilità del provider AI;

●	superamento dei limiti di utilizzo;

●	errori temporanei;

●	degrado delle prestazioni;

●	risultati di qualità insufficiente.

Le strategie potranno comprendere:

●	utilizzo di un provider alternativo;

●	risposta basata esclusivamente sulla Knowledge Repository;

●	notifica all’utente della temporanea indisponibilità;

●	riesecuzione differita della richiesta.

\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_

20.8 AI Cost Governance

La sostenibilità economica dell’AI rappresenta un requisito architetturale.

Il sistema dovrà monitorare:

●	token consumati;

●	costo per richiesta;

●	costo per capability;

●	costo per utente;

●	costo per workflow;

●	distribuzione dei consumi tra i diversi provider.

Questi dati alimenteranno la Governance Platform e supporteranno le decisioni sull’evoluzione della piattaforma.

\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_

20.9 Compliance Framework

L’AI Governance integra i principali requisiti normativi applicabili.

GDPR

Il trattamento dei dati personali dovrà rispettare:

●	minimizzazione dei dati;

●	limitazione delle finalità;

●	conservazione controllata;

●	diritti dell’interessato;

●	sicurezza del trattamento.

AI Act

Pur adattandosi all’evoluzione del quadro normativo europeo, l’architettura è progettata per soddisfare i principi fondamentali del regolamento, tra cui:

●	supervisione umana;

●	trasparenza;

●	tracciabilità;

●	gestione del rischio;

●	documentazione tecnica;

●	monitoraggio post-deployment.

ISO/IEC 42001

L’architettura è inoltre allineata ai principi di un sistema di gestione dell’Intelligenza Artificiale, favorendo una futura adozione di standard internazionali senza richiedere modifiche sostanziali.

\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_

20.10 Architecture Decision

ADR-AI-001 — AI Provider Independence

L’ecosistema non dipende da un singolo modello linguistico.

Ogni provider rappresenta un componente intercambiabile dell’Enterprise AI Core.

L’adozione di nuovi modelli dovrà richiedere esclusivamente la realizzazione di un nuovo Adapter, mantenendo invariati:

●	servizi applicativi;

●	Experience Platform;

●	pipeline RAG;

●	governance;

●	Knowledge Repository.

Questa decisione garantisce continuità operativa, libertà tecnologica e riduzione del rischio di lock-in.

\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_

Architectural Traceability Matrix (ATM)



EMA	SAPM	Repository	OpenProject

AI Governance	AI Governance \& Model Management	AI Adapter Layer	Epic “AI Governance”

Architettura Applicativa	Provider Abstraction Layer	Edge Functions AI	Feature “Provider Adapter”

Compliance	AI Evaluation Framework	Logging e Audit	Epic “AI Compliance”

Governance	Model Registry	Configurazioni AI	Feature “Model Registry”



PARTE II

SOLUTION ARCHITECTURE (TO-BE)

CAPITOLO 21

CAP-04 — ENTERPRISE AI CORE

Enterprise Prompt \& Knowledge Engineering Architecture

\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_

21.1 Vision

L’efficacia dei servizi cognitivi dell’ecosistema SportelloScuola 2.0 dipende non soltanto dalla qualità dei modelli linguistici adottati, ma soprattutto dalla capacità di progettare, organizzare e governare il patrimonio di conoscenza che alimenta tali modelli.

L’Enterprise Prompt \& Knowledge Engineering Architecture definisce l’insieme dei processi, delle strutture informative e delle regole attraverso cui il patrimonio documentale viene trasformato in contesto operativo per l’Intelligenza Artificiale.

In questa architettura i prompt non costituiscono semplici stringhe di testo, ma componenti progettuali versionati e governati, analogamente alle API, ai workflow e agli altri artefatti architetturali.

\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_

21.2 Obiettivi

La capability persegue i seguenti obiettivi:

●	garantire uniformità nel comportamento dei servizi AI;

●	assicurare la qualità dei prompt utilizzati;

●	favorire il riuso delle strategie conversazionali;

●	migliorare la qualità delle risposte;

●	ridurre il rischio di allucinazioni;

●	mantenere la piena tracciabilità delle fonti;

●	rendere indipendente l’ecosistema dai singoli modelli linguistici.

\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_

21.3 Prompt Engineering Framework

Il Prompt Engineering sarà organizzato come un insieme di componenti specializzati.

System Prompt

Definisce il comportamento generale dell’assistente.

Comprende:

●	ruolo istituzionale;

●	tono comunicativo;

●	vincoli normativi;

●	politiche di sicurezza;

●	regole di citazione;

●	criteri di risposta.

Il System Prompt sarà unico per l’intero ecosistema e gestito centralmente.

\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_

Capability Prompt

Ogni capability potrà definire istruzioni specialistiche.

Ad esempio:

●	gestione normativa;

●	orientamento amministrativo;

●	assistenza ai procedimenti;

●	supporto documentale.

Questo approccio evita la proliferazione di prompt eterogenei e mantiene un comportamento coerente.

\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_

Context Prompt

È costruito dinamicamente sulla base di:

●	contesto utente;

●	ruolo;

●	organizzazione;

●	procedura corrente;

●	documenti recuperati;

●	Knowledge Graph;

●	cronologia conversazionale.

\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_

Retrieval Prompt

Definisce le modalità di interrogazione del patrimonio informativo.

Specifica:

●	tipologia di fonti;

●	numero di documenti;

●	criteri di ranking;

●	soglia di similarità;

●	priorità delle fonti.

\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_

Validation Prompt

Supporta il Quality Engine nelle verifiche automatiche.

Può essere utilizzato per:

●	controlli di coerenza;

●	verifica della completezza;

●	controllo della presenza delle citazioni;

●	analisi delle possibili allucinazioni.

\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_

21.4 Prompt Catalog

L’ecosistema manterrà un catalogo centralizzato dei prompt.

Ogni elemento comprenderà:

●	identificativo;

●	descrizione;

●	versione;

●	capability di appartenenza;

●	casi d’uso;

●	autore;

●	data di introduzione;

●	stato;

●	storico delle modifiche.

Il Prompt Catalog diventerà parte integrante dell’Enterprise Knowledge Repository.

\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_

21.5 Knowledge Engineering Pipeline

La costruzione del patrimonio cognitivo seguirà un processo strutturato.

Acquisizione

Importazione dei documenti.

\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_

Validazione

Controllo della qualità e dell’autorevolezza.

\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_

Normalizzazione

Uniformazione dei formati.

\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_

Metadata Extraction

Estrazione automatica dei metadati.

\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_

Semantic Classification

Attribuzione delle categorie informative.

\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_

Chunking

Suddivisione dei documenti in unità semantiche.

I criteri di suddivisione terranno conto di:

●	struttura del documento;

●	paragrafi;

●	sezioni;

●	riferimenti normativi;

●	contesto semantico.

\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_

Embedding Generation

Produzione delle rappresentazioni vettoriali.

Ogni embedding sarà collegato:

●	al documento;

●	alla versione;

●	al chunk;

●	al modello utilizzato;

●	alla data di generazione.

\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_

Knowledge Publication

Pubblicazione del patrimonio informativo verso:

●	Vector Store;

●	Knowledge Graph;

●	motore RAG.

\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_

21.6 Retrieval Strategy

La ricerca documentale seguirà una strategia multilivello.

Ricerca semantica

Basata sugli embeddings.

\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_

Ricerca lessicale

Basata sul testo.

\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_

Ricerca normativa

Basata sui riferimenti legislativi.

\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_

Ricerca relazionale

Basata sul Knowledge Graph.

\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_

Ranking

Le informazioni recuperate saranno ordinate considerando:

●	similarità;

●	autorevolezza della fonte;

●	aggiornamento;

●	rilevanza contestuale;

●	livello di confidenza.

\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_

21.7 Citation Framework

Ogni risposta AI dovrà riportare in maniera strutturata:

●	documenti utilizzati;

●	riferimenti normativi;

●	versione delle fonti;

●	data di aggiornamento;

●	livello di affidabilità.

Il Citation Framework rappresenta uno dei principali strumenti di trasparenza dell’intero ecosistema.

\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_

21.8 Prompt Lifecycle Management

Ogni prompt seguirà un ciclo di vita definito.

1\.	Progettazione.

2\.	Revisione tecnica.

3\.	Validazione funzionale.

4\.	Approvazione.

5\.	Pubblicazione.

6\.	Monitoraggio.

7\.	Versionamento.

8\.	Sostituzione.

9\.	Archiviazione.

Questo processo garantirà la qualità e la governabilità del patrimonio conversazionale.

\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_

21.9 Knowledge Quality Metrics

La qualità della Knowledge Repository sarà monitorata attraverso indicatori specifici.

Tra essi:

●	copertura documentale;

●	freschezza delle informazioni;

●	percentuale di documenti versionati;

●	accuratezza delle classificazioni;

●	tasso di successo del Retrieval;

●	precisione delle citazioni;

●	numero di risposte prive di fonti;

●	feedback degli utenti;

●	tasso di rigenerazione degli embeddings.

Questi indicatori saranno utilizzati dalla Governance Platform per pianificare le attività di miglioramento continuo.

\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_

21.10 Architecture Decision

ADR-AI-002 — Prompt as Enterprise Assets

I prompt, le strategie di retrieval e le pipeline di costruzione della conoscenza costituiscono asset architetturali dell’ecosistema.

Essi saranno soggetti agli stessi processi di:

●	versionamento;

●	revisione;

●	approvazione;

●	documentazione;

●	monitoraggio;

●	audit;

previsti per gli altri componenti critici della piattaforma.

Nessun prompt potrà essere modificato direttamente nel codice senza un corrispondente aggiornamento del Prompt Catalog e del relativo Architecture Decision Record.

\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_

Architectural Traceability Matrix (ATM)



EMA	SAPM	Repository	OpenProject

Knowledge Management	Prompt Catalog	/prompts, configurazioni AI, template	Epic “Knowledge Engineering”

AI Governance	Prompt Lifecycle	Repository Git e ADR	Feature “Prompt Management”

Patrimonio Informativo	Knowledge Pipeline	Edge Functions di ingestione	Epic “Knowledge Ingestion”

Governance	Citation Framework	Moduli RAG	Feature “Citation Engine”





PARTE II

SOLUTION ARCHITECTURE (TO-BE)

CAPITOLO 22

CAP-05 — ENTERPRISE INTEGRATION PLATFORM

Integration Architecture \& API Ecosystem

\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_

22.1 Mission

La Enterprise Integration Platform costituisce il livello architetturale incaricato di governare tutte le comunicazioni tra SportelloScuola 2.0 e i sistemi esterni.

La sua missione consiste nel garantire interoperabilità, affidabilità, sicurezza e indipendenza tecnologica attraverso un insieme di servizi di integrazione standardizzati.

Ogni comunicazione verso sistemi esterni dovrà transitare attraverso questa capability, evitando collegamenti diretti tra i moduli applicativi e i provider.

\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_

22.2 Vision

L’integrazione rappresenta una capability trasversale dell’intero ecosistema.

L’architettura dovrà consentire di:

●	aggiungere nuovi servizi senza modificare la logica applicativa;

●	sostituire un provider senza impatti sul dominio;

●	monitorare tutte le comunicazioni;

●	gestire errori e retry in maniera uniforme;

●	centralizzare autenticazione, autorizzazione e audit.

L’obiettivo è costruire un ecosistema aperto, modulare e resiliente.

\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_

22.3 Principi architetturali

API First

Ogni capability dovrà essere esposta attraverso contratti API formalmente definiti e versionati.

\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_

Loose Coupling

I servizi applicativi non dovranno conoscere i dettagli implementativi dei provider esterni.

\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_

Provider Independence

L’architettura dovrà consentire la sostituzione dei servizi esterni mediante Adapter dedicati.

\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_

Eventual Evolution

L’ecosistema dovrà poter evolvere gradualmente da integrazioni sincrone verso modelli event-driven, quando i requisiti lo renderanno opportuno.

\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_

Secure by Default

Ogni integrazione dovrà rispettare i principi di autenticazione forte, cifratura delle comunicazioni, gestione sicura dei segreti e registrazione delle operazioni.

\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_

22.4 Enterprise Integration Model

L’architettura distingue tre categorie di integrazione.

Integrazioni interne

Consentono la comunicazione tra le capability dell’ecosistema.

Esempi:

●	Experience Platform ↔ Application Services;

●	Application Services ↔ Enterprise Data Platform;

●	Application Services ↔ AI Core.

\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_

Integrazioni infrastrutturali

Riguardano i servizi di supporto.

Ad esempio:

●	autenticazione;

●	storage;

●	scheduler;

●	notifiche;

●	logging;

●	monitoraggio.

\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_

Integrazioni esterne

Comprendono tutti i servizi di terze parti.

Tra essi:

●	provider AI;

●	servizi email;

●	sistemi di autenticazione federata;

●	piattaforme della Pubblica Amministrazione;

●	sistemi di pagamento;

●	servizi di analytics.

\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_

22.5 Enterprise API Architecture

Le API costituiscono il principale contratto di comunicazione dell’ecosistema.

Ogni API dovrà essere:

●	documentata;

●	versionata;

●	monitorata;

●	autenticata;

●	osservabile;

●	indipendente dal client.

Le API saranno organizzate per capability e non per tecnologia.

\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_

API Versioning

Ogni modifica incompatibile richiederà una nuova versione.

Le versioni obsolete seguiranno un processo controllato di deprecazione.

\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_

API Documentation

La documentazione costituirà parte integrante del ciclo di vita delle API.

Ogni endpoint dovrà riportare:

●	finalità;

●	input;

●	output;

●	errori;

●	autorizzazioni richieste;

●	esempi.

\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_

22.6 Adapter Pattern

Ogni provider esterno sarà isolato attraverso un Adapter dedicato.

Questo pattern riduce il rischio di lock-in e semplifica l’evoluzione della piattaforma.

AI Adapter

Gestisce la comunicazione con i modelli linguistici.

\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_

Email Adapter

Astrae il servizio di posta elettronica.

Attualmente potrà utilizzare Resend, ma l’architettura consentirà la sostituzione con altri provider (ad esempio Postmark o Amazon SES) senza modificare la logica applicativa.

\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_

Storage Adapter

Gestisce il repository documentale.

\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_

Authentication Adapter

Astrae i servizi di autenticazione federata.

\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_

Notification Adapter

Gestisce notifiche email, push e futuri canali di comunicazione.

\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_

22.7 Webhook Management

L’ecosistema dovrà gestire eventi provenienti da servizi esterni.

Ogni webhook sarà:

●	autenticato;

●	validato;

●	registrato;

●	elaborato in maniera idempotente;

●	monitorato.

Le elaborazioni asincrone dovranno essere isolate dal flusso principale delle richieste utente.

\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_

22.8 Integration Reliability

Le comunicazioni con servizi esterni dovranno adottare pattern di resilienza.

Retry

I tentativi di riesecuzione saranno limitati e configurabili.

\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_

Timeout

Ogni integrazione dovrà definire tempi massimi di attesa.

\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_

Circuit Breaker

In caso di errori ripetuti il sistema sospenderà temporaneamente le chiamate verso il servizio esterno.

\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_

Idempotency

Le operazioni ripetute non dovranno produrre effetti duplicati.

\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_

Fallback

Quando possibile sarà disponibile una modalità operativa alternativa.

\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_

22.9 Secret Management

Tutte le credenziali saranno gestite centralmente.

Sono comprese:

●	API Key;

●	token OAuth;

●	chiavi JWT;

●	certificati;

●	segreti di cifratura.

Nessuna credenziale dovrà essere presente nel codice sorgente o nei repository Git.

Le configurazioni saranno distribuite tramite i meccanismi sicuri dell’infrastruttura di deployment e sottoposte a rotazione periodica.

\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_

22.10 Decisione architetturale

ADR-INT-001 — External Services Isolation

Ogni integrazione con sistemi esterni dovrà essere implementata attraverso un Integration Adapter.

Le capability applicative non potranno comunicare direttamente con provider esterni.

Questa decisione garantisce:

●	indipendenza tecnologica;

●	maggiore testabilità;

●	semplificazione delle sostituzioni;

●	migliore osservabilità;

●	riduzione del rischio di lock-in.

\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_

Capability Interaction Matrix (CIM)



Provider / Servizio	Adapter	Capability utilizzatrici

Supabase	Data Adapter	CAP-02, CAP-03

OpenAI (o altro LLM)	AI Adapter	CAP-04

Resend	Email Adapter	CAP-02

GitHub	DevOps Adapter	CAP-06

Netlify	Deployment Adapter	CAP-06

OAuth / SPID / CIE	Identity Adapter	CAP-07

Futuri servizi PA	Government Adapter	CAP-05



PARTE II

SOLUTION ARCHITECTURE (TO-BE)

CAPITOLO 23

CAP-05 — ENTERPRISE INTEGRATION PLATFORM

Enterprise Event Architecture \& Workflow Orchestration

\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_

23.1 Vision

L’Enterprise Event Architecture definisce il modello attraverso cui l’ecosistema reagisce ai cambiamenti di stato prodotti dalle diverse capability.

A differenza dell’elaborazione sincrona tradizionale, nella quale una richiesta viene elaborata integralmente all’interno dello stesso flusso, il paradigma event-driven consente di separare la generazione di un evento dalla sua elaborazione.

Questa scelta aumenta la resilienza, riduce l’accoppiamento tra componenti e permette di introdurre progressivamente nuove funzionalità senza modificare i servizi esistenti.

L’obiettivo è costruire una piattaforma capace di evolvere da un’architettura principalmente sincrona verso un modello ibrido, mantenendo semplicità operativa e sostenibilità economica.

\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_

23.2 Principi

L’Enterprise Event Architecture si fonda sui seguenti principi.

Event First

Ogni cambiamento significativo dello stato dell’ecosistema genera un evento.

L’evento rappresenta un fatto accaduto e non una richiesta di elaborazione.

\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_

Loose Coupling

I produttori di eventi non conoscono i consumatori.

Essi si limitano a pubblicare l’evento.

\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_

Event Immutability

Gli eventi costituiscono una registrazione permanente di ciò che è avvenuto.

Non devono essere modificati dopo la loro pubblicazione.

\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_

Idempotent Processing

L’elaborazione ripetuta dello stesso evento non deve produrre effetti indesiderati.

\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_

Observability by Design

Ogni evento deve poter essere monitorato, tracciato e correlato agli altri eventi del sistema.

\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_

23.3 Enterprise Event Model

Ogni evento dovrà essere descritto da un modello uniforme.

Le informazioni minime comprendono:

●	identificativo univoco;

●	tipo di evento;

●	capability produttrice;

●	timestamp;

●	soggetto coinvolto;

●	riferimento all’entità interessata;

●	versione dello schema;

●	payload;

●	livello di criticità;

●	stato dell’elaborazione.

Questa standardizzazione faciliterà l’interoperabilità tra i servizi.

\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_

23.4 Event Categories

Gli eventi saranno classificati in categorie omogenee.

Business Events

Descrivono cambiamenti del dominio applicativo.

Esempi:

●	procedimento creato;

●	documento pubblicato;

●	pratica completata;

●	risposta AI validata.

\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_

Integration Events

Notificano variazioni destinate ad altri sistemi.

Ad esempio:

●	invio email;

●	sincronizzazione con servizi esterni;

●	aggiornamento di provider.

\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_

AI Events

Descrivono le elaborazioni cognitive.

Tra essi:

●	retrieval completato;

●	embedding generato;

●	valutazione terminata;

●	risposta pubblicata.

\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_

Platform Events

Riguardano l’infrastruttura.

Ad esempio:

●	deployment completato;

●	backup eseguito;

●	errore critico;

●	aggiornamento configurazioni.

\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_

Security Events

Comprendono:

●	autenticazioni;

●	autorizzazioni;

●	accessi anomali;

●	modifiche ai privilegi;

●	tentativi falliti.

\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_

23.5 Workflow Orchestration

I workflow rappresentano la sequenza controllata delle attività necessarie per completare un processo.

L’orchestrazione dovrà distinguere:

Workflow Sincroni

Richiedono una risposta immediata.

Ad esempio:

●	autenticazione;

●	consultazione documenti;

●	interrogazioni AI.

\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_

Workflow Asincroni

Possono essere completati in tempi differiti.

Ad esempio:

●	elaborazione documentale;

●	indicizzazione;

●	generazione embeddings;

●	backup;

●	invio notifiche massive;

●	aggiornamento del Knowledge Graph.

\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_

Workflow Programmati

Attivati secondo una pianificazione.

Tra essi:

●	aggiornamento normativa;

●	pulizia dati;

●	rotazione log;

●	rigenerazione embeddings;

●	verifica integrità.

\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_

23.6 Scheduling Strategy

L’architettura distingue tre livelli di scheduling.

Livello 1 – Native Scheduling

Attività periodiche semplici.

Implementazione iniziale:

●	Supabase Cron;

●	GitHub Actions.

Sono strumenti sufficienti per la fase iniziale della piattaforma e consentono di evitare costi aggiuntivi.

\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_

Livello 2 – Workflow Engine

Quando i processi diventeranno più articolati, potrà essere introdotto un orchestratore dedicato.

Una soluzione particolarmente interessante è Trigger.dev, che offre un piano gratuito generoso, un’ottima integrazione con TypeScript e la possibilità di gestire workflow lunghi, retry, pianificazioni e monitoraggio con un’esperienza sviluppatore molto vicina al codice applicativo.

\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_

Livello 3 – Enterprise Event Platform

Solo qualora il volume e la complessità lo richiedessero, potranno essere introdotti sistemi specializzati di messaggistica come NATS, RabbitMQ o analoghi.

Questa evoluzione dovrà essere giustificata da requisiti architetturali concreti e non dall’adozione preventiva di tecnologie complesse.

\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_

23.7 Reliability Patterns

L’architettura adotterà pattern consolidati per garantire l’affidabilità delle elaborazioni asincrone.

Retry con backoff esponenziale

Riduce il rischio di sovraccarico durante errori temporanei.

\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_

Dead Letter Queue

Gli eventi non elaborabili saranno isolati per consentire analisi e recupero.

Nella fase iniziale questa funzione potrà essere implementata tramite tabelle dedicate e logging strutturato, senza introdurre immediatamente un broker di messaggistica.

\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_

Correlation Identifier

Ogni workflow distribuirà un identificativo condiviso per correlare richieste, eventi, log e metriche.

\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_

Timeout

Ogni elaborazione avrà un limite temporale definito.

\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_

Compensating Action

Quando una procedura non potrà essere completata, saranno previste azioni compensative per riportare il sistema in uno stato coerente.

\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_

23.8 Event Catalog

L’ecosistema manterrà un catalogo centralizzato degli eventi.

Per ciascun evento saranno documentati:

●	nome;

●	descrizione;

●	capability produttrice;

●	capability consumatrici;

●	struttura del payload;

●	condizioni di generazione;

●	livello di criticità;

●	politiche di conservazione.

Questo catalogo costituirà il riferimento unico per tutte le integrazioni.

\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_

23.9 Architecture Decision

ADR-INT-002 — Event Driven Evolution

L’ecosistema adotterà un’architettura event-driven evolutiva.

La prima implementazione privilegerà strumenti semplici e a basso costo, sfruttando le funzionalità già disponibili nell’infrastruttura.

L’introduzione di broker di messaggistica o piattaforme di orchestrazione avanzate avverrà esclusivamente quando supportata da requisiti misurabili di scalabilità, affidabilità o complessità operativa.

Questa decisione garantisce un equilibrio tra sostenibilità economica e maturità architetturale.

\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_

Architectural Traceability Matrix (ATM)



EMA	SAPM	Repository	OpenProject

Architettura Applicativa	Enterprise Event Architecture	Edge Functions, Trigger, Cron	Epic “Workflow Orchestration”

Governance	Event Catalog	Repository eventi	Feature “Enterprise Events”

AI Governance	AI Events	Pipeline RAG	Epic “AI Processing Pipeline”

Platform Services	Scheduling Strategy	GitHub Actions, Supabase Cron	Feature “Platform Scheduler”



PARTE II

SOLUTION ARCHITECTURE (TO-BE)

CAPITOLO 24

CAP-06 — ENTERPRISE PLATFORM SERVICES

Platform Architecture \& Runtime Environment

\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_

24.1 Vision

La Enterprise Platform Services costituisce il livello infrastrutturale dell’ecosistema SportelloScuola 2.0.

Essa fornisce i servizi comuni necessari all’esecuzione delle capability applicative, garantendo disponibilità, affidabilità, sicurezza, osservabilità e continuità operativa.

L’architettura della piattaforma è progettata secondo il principio della neutralità tecnologica: le capability utilizzano servizi astratti, mentre l’implementazione concreta può evolvere nel tempo senza modificare il modello architetturale.

\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_

24.2 Obiettivi

La piattaforma deve garantire:

●	elevata disponibilità;

●	semplicità operativa;

●	scalabilità progressiva;

●	riduzione dei costi di gestione;

●	indipendenza dai provider;

●	automazione delle attività operative;

●	sicurezza by design;

●	monitoraggio continuo;

●	resilienza ai guasti.

\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_

24.3 Platform Services

La Enterprise Platform Services comprende i seguenti macro-servizi.

Runtime Services

Gestiscono l’esecuzione del software.

Comprendono:

●	frontend;

●	backend;

●	Edge Functions;

●	servizi AI;

●	scheduler.

\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_

Infrastructure Services

Gestiscono:

●	rete;

●	DNS;

●	CDN;

●	storage;

●	gestione dei certificati;

●	bilanciamento del traffico.

\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_

Platform Management Services

Comprendono:

●	deployment;

●	configurazioni;

●	gestione segreti;

●	monitoraggio;

●	backup;

●	auditing.

\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_

Developer Platform

Supporta il ciclo di vita del software.

Comprende:

●	repository;

●	CI/CD;

●	ambienti;

●	quality gate;

●	automazioni.

\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_

24.4 Runtime Architecture

Il runtime della piattaforma dovrà essere organizzato come insieme di componenti indipendenti.

Presentation Runtime

Esegue la Experience Platform.

Attualmente:

Frontend distribuito.

\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_

Application Runtime

Ospita:

●	servizi applicativi;

●	orchestrazione AI;

●	API;

●	integrazioni.

\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_

Data Runtime

Gestisce:

●	PostgreSQL;

●	Storage;

●	autenticazione;

●	funzioni serverless.

\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_

AI Runtime

Responsabile dell’esecuzione dei modelli linguistici.

La piattaforma dovrà poter utilizzare differenti provider mantenendo invariata l’architettura.

\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_

24.5 Environment Strategy

L’ecosistema adotterà ambienti separati.

Development

Destinato allo sviluppo quotidiano.

Caratteristiche:

●	massima flessibilità;

●	dati sintetici;

●	logging esteso.

\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_

Test

Utilizzato per:

●	test funzionali;

●	test di integrazione;

●	validazione delle migration;

●	verifica dei workflow.

\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_

Staging

Replica dell’ambiente produttivo.

Consente:

●	collaudi;

●	test di carico;

●	validazione finale.

\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_

Production

Ambiente operativo.

Ogni modifica dovrà provenire esclusivamente dalla pipeline di rilascio.

\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_

24.6 Configuration Management

Le configurazioni saranno completamente esternalizzate.

Saranno gestite separatamente:

●	configurazioni applicative;

●	segreti;

●	feature flag;

●	endpoint;

●	provider;

●	parametri AI.

L’applicazione non dovrà contenere configurazioni hardcoded.

\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_

24.7 Platform Scalability

La piattaforma crescerà secondo livelli successivi.

Livello 1

Architettura attuale.

Frontend distribuito.

Backend serverless.

Database gestito.

\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_

Livello 2

Introduzione di:

●	caching distribuito;

●	workflow engine;

●	osservabilità avanzata.

\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_

Livello 3

Introduzione eventuale di:

●	servizi containerizzati;

●	orchestrazione Kubernetes (solo se realmente necessaria);

●	message broker dedicato;

●	servizi AI specializzati.

Questa evoluzione sarà guidata dai requisiti e non dalla disponibilità delle tecnologie.

\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_

24.8 Platform Observability

Ogni componente dovrà produrre informazioni osservabili.

Saranno raccolti:

Metrics

Prestazioni.

Disponibilità.

Errori.

\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_

Logs

Eventi applicativi.

Errori.

Audit.

\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_

Traces

Flussi completi delle richieste.

Interazioni tra capability.

Pipeline AI.

\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_

Health Check

Ogni servizio dovrà pubblicare indicatori di stato consultabili automaticamente.

\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_

24.9 Platform Resilience

La resilienza sarà garantita attraverso:

●	ridondanza dei servizi gestiti;

●	retry automatici;

●	backup periodici;

●	ripristino controllato;

●	monitoraggio continuo;

●	deployment progressivi;

●	rollback automatici ove possibile.

L’obiettivo è ridurre al minimo il tempo di inattività e facilitare il recupero da eventuali anomalie.

\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_

24.10 Architecture Decision

ADR-PLT-001 — Platform Neutrality

La piattaforma non dipende da uno specifico cloud provider.

Ogni servizio infrastrutturale dovrà essere rappresentato mediante un’interfaccia architetturale astratta.

L’adozione di nuove tecnologie dovrà comportare esclusivamente la sostituzione del componente implementativo, senza impatti sul dominio applicativo.

\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_

Enterprise Platform Mapping



Servizio Architetturale	Implementazione attuale	Evoluzione possibile

Source Control	GitHub	Gitea, GitLab

Frontend Runtime	Netlify	Cloudflare Pages, Vercel

Backend Platform	Supabase	PostgreSQL + servizi gestiti

Storage	Supabase Storage	Cloudflare R2, S3 compatibile

AI Runtime	OpenAI	Azure OpenAI, Ollama, vLLM, altri provider compatibili

Email Service	Resend	Postmark, Amazon SES

Scheduler	Supabase Cron, GitHub Actions	Trigger.dev

CDN / Edge	Netlify CDN	Cloudflare CDN



Nota architetturale: la colonna “Evoluzione possibile” non rappresenta una roadmap obbligatoria, ma dimostra che l’architettura è progettata per evitare il vendor lock-in. La sostituzione di un componente dovrà essere giustificata da esigenze funzionali, prestazionali, economiche o normative.

Architectural Traceability Matrix (ATM)



EMA	SAPM	Repository	OpenProject

Piattaforma Tecnologica	Platform Services	Configurazioni di deployment	Capability “Enterprise Platform”

Cloud Architecture	Runtime Environment	Hosting e runtime	Epic “Platform Evolution”

Governance	Environment Strategy	Ambienti Dev/Test/Prod	Feature “Environment Management”

Continuità Operativa	Platform Resilience	Backup e monitoraggio	Epic “Business Continuity”



PARTE II

SOLUTION ARCHITECTURE (TO-BE)

CAPITOLO 25

CAP-06 — ENTERPRISE PLATFORM SERVICES

Enterprise Security Architecture

\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_

25.1 Vision

La Enterprise Security Architecture definisce l’insieme dei principi, delle capacità e dei controlli necessari per garantire la protezione dell’intero ecosistema SportelloScuola 2.0.

La sicurezza viene considerata una proprietà intrinseca dell’architettura e non un insieme di controlli aggiuntivi applicati successivamente allo sviluppo.

Ogni capability, servizio e componente dovrà essere progettato secondo il principio della Security by Design, integrando meccanismi di prevenzione, rilevazione, risposta e recupero.

\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_

25.2 Obiettivi

L’architettura della sicurezza persegue i seguenti obiettivi:

●	tutela dei dati personali;

●	protezione del patrimonio informativo;

●	continuità operativa;

●	riduzione della superficie di attacco;

●	resilienza informatica;

●	tracciabilità delle operazioni;

●	conformità normativa;

●	indipendenza tecnologica.

\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_

25.3 Security Principles

Zero Trust

Ogni richiesta dovrà essere autenticata, autorizzata e verificata indipendentemente dalla posizione della risorsa.

La fiducia implicita tra componenti è esclusa.

\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_

Least Privilege

Ogni utente, processo e servizio riceverà esclusivamente i privilegi strettamente necessari.

\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_

Defense in Depth

La protezione sarà ottenuta mediante livelli multipli di controllo.

Tra essi:

●	autenticazione;

●	autorizzazione;

●	cifratura;

●	audit;

●	monitoraggio;

●	isolamento dei servizi.

\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_

Secure by Default

Ogni nuova funzionalità dovrà essere sicura nella configurazione iniziale.

\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_

Privacy by Design

La tutela dei dati personali sarà incorporata nella progettazione dell’intero ecosistema.

\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_

25.4 Identity \& Access Management

L’Identity Platform rappresenta il punto centrale della sicurezza applicativa.

Essa governa:

●	autenticazione;

●	autorizzazione;

●	gestione ruoli;

●	sessioni;

●	token;

●	federazione delle identità.

L’architettura è progettata per consentire l’integrazione futura con sistemi come SPID, CIE o altri Identity Provider conformi agli standard OIDC e SAML, senza modificare il dominio applicativo.

\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_

25.5 Authorization Architecture

L’autorizzazione sarà articolata su più livelli.

Livello 1 – Identity

Verifica dell’identità.

\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_

Livello 2 – Role

Controllo dei ruoli.

\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_

Livello 3 – Permission

Verifica dei privilegi.

\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_

Livello 4 – Business Rules

Applicazione delle regole di dominio.

\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_

Livello 5 – Data Access

Controllo dell’accesso ai dati tramite Row Level Security (RLS).

Questa architettura multilivello garantisce che un eventuale errore in un livello non comprometta l’intero sistema.

\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_

25.6 Data Protection

La protezione dei dati comprende:

Data at Rest

Cifratura dei dati persistenti.

\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_

Data in Transit

Utilizzo esclusivo di protocolli cifrati (TLS).

\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_

Secret Management

Gestione centralizzata di:

●	API Key;

●	token;

●	certificati;

●	chiavi di cifratura;

●	variabili d’ambiente.

\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_

Backup Protection

I backup dovranno essere cifrati e verificati periodicamente mediante procedure di ripristino controllate.

\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_

25.7 API Security

Ogni API dovrà implementare:

●	autenticazione;

●	autorizzazione;

●	rate limiting;

●	validazione degli input;

●	protezione contro replay attack;

●	logging;

●	tracciabilità.

Per la protezione perimetrale sarà valutato l’utilizzo di Cloudflare (DNS, CDN e WAF nel piano gratuito), che rappresenta un’ottima soluzione per aumentare la resilienza senza costi iniziali.

\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_

25.8 Secure Development

Il ciclo di sviluppo includerà controlli automatici.

Dependency Scanning

Analisi delle dipendenze.

Implementazione consigliata:

●	GitHub Dependabot.

\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_

Static Code Analysis

Analisi statica del codice.

Implementazione consigliata:

●	GitHub CodeQL.

\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_

Secret Scanning

Ricerca automatica di credenziali accidentalmente inserite nel repository.

\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_

Software Bill of Materials (SBOM)

Generazione dell’inventario dei componenti software utilizzati.

Questa pratica facilita la gestione delle vulnerabilità e l’allineamento ai requisiti di sicurezza della supply chain.

\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_

25.9 Security Monitoring

La sicurezza dovrà essere continuamente osservata.

Saranno raccolti:

●	autenticazioni;

●	tentativi falliti;

●	modifiche ai privilegi;

●	accessi amministrativi;

●	errori critici;

●	eventi AI rilevanti;

●	modifiche alle configurazioni.

Tali informazioni alimenteranno la Governance Platform e il sistema di osservabilità.

\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_

25.10 Security Compliance Framework

L’architettura è progettata per favorire la conformità ai principali riferimenti normativi e di buone pratiche.

GDPR

Attraverso:

●	minimizzazione dei dati;

●	limitazione delle finalità;

●	controllo degli accessi;

●	tracciabilità;

●	diritti degli interessati.

\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_

AI Act

Attraverso:

●	supervisione umana;

●	trasparenza;

●	registrazione delle elaborazioni AI;

●	valutazione continua dei rischi.

\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_

NIS2

Pur non essendo necessariamente soggetto agli obblighi previsti dalla direttiva, il progetto adotta volontariamente principi coerenti con la resilienza operativa, la gestione degli incidenti e la governance della sicurezza, così da facilitarne un’eventuale evoluzione futura.

\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_

ISO/IEC 27001

L’architettura è coerente con le principali pratiche di un sistema di gestione della sicurezza delle informazioni.

\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_

ISO/IEC 42001

Per la governance dei sistemi di Intelligenza Artificiale.

\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_

25.11 Architecture Decision

ADR-SEC-001 — Security by Design

Ogni componente dell’ecosistema dovrà essere progettato assumendo la sicurezza come requisito funzionale.

Nessuna capability potrà essere rilasciata senza:

●	autenticazione;

●	autorizzazione;

●	logging;

●	audit;

●	monitoraggio;

●	gestione delle vulnerabilità;

●	verifica della conformità.

La sicurezza rappresenta una responsabilità condivisa tra architettura, sviluppo, piattaforma e governance.

\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_

Enterprise Security Control Matrix



Livello	Controllo	Implementazione iniziale	Evoluzione possibile

Perimetro	DNS, CDN, WAF	Cloudflare Free	Cloudflare Pro o equivalente

Identità	Authentication	Supabase Auth	Identity Provider federati

Autorizzazione	RLS + RBAC	Supabase	ABAC e policy engine dedicato

Segreti	Environment Variables	GitHub + Netlify + Supabase	Vault dedicato (HashiCorp Vault o Infisical)

Codice	SAST	GitHub CodeQL	Pipeline DevSecOps avanzata

Dipendenze	Dependency Scan	Dependabot	SCA enterprise

AI	Prompt Governance	AI Core	AI Security Gateway



Architectural Traceability Matrix (ATM)



EMA	SAPM	Repository	OpenProject

Sicurezza	Enterprise Security Architecture	Configurazioni RLS, Auth, Edge Functions	Epic “Security Architecture”

Governance	Security Monitoring	Logging e Audit	Feature “Security Monitoring”

Compliance	Security Compliance	ADR e policy	Epic “Compliance Management”

Platform	Secure Development	GitHub Actions, CodeQL, Dependabot	Feature “Secure SDLC”



PARTE II

SOLUTION ARCHITECTURE (TO-BE)

CAPITOLO 26

CAP-06 — ENTERPRISE PLATFORM SERVICES

Platform Engineering \& Internal Developer Platform (IDP)

\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_

26.1 Vision

L’Enterprise Platform Engineering rappresenta l’insieme dei processi, delle piattaforme e delle automazioni che consentono di sviluppare, distribuire, monitorare ed evolvere SportelloScuola 2.0 in modo continuo, sicuro e ripetibile.

L’obiettivo non consiste esclusivamente nell’automatizzare il rilascio del software, ma nel costruire una Internal Developer Platform (IDP) capace di ridurre il carico operativo, standardizzare il ciclo di sviluppo e aumentare la qualità complessiva del prodotto.

L’IDP diventa quindi una capability interna al servizio del team di sviluppo.

\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_

26.2 Principi

La progettazione della piattaforma segue i seguenti principi.

Everything as Code

Ogni configurazione modificabile dovrà essere rappresentata come codice o come configurazione versionata.

Comprende:

●	workflow;

●	migrazioni database;

●	configurazioni CI/CD;

●	template;

●	prompt AI;

●	policy;

●	documentazione tecnica.

\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_

Automation First

Ogni attività ripetitiva dovrà essere automatizzata.

Le attività manuali saranno limitate ai processi decisionali.

\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_

Self-Service Platform

Gli sviluppatori devono poter eseguire autonomamente le operazioni comuni senza richiedere interventi infrastrutturali.

\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_

Shift Left

Qualità e sicurezza devono essere verificate il prima possibile nel ciclo di sviluppo.

\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_

Continuous Improvement

La piattaforma dovrà evolvere sulla base di metriche oggettive.

\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_

26.3 Internal Developer Platform

L’IDP è organizzata in servizi.

Source Management

Gestione del codice sorgente.

Implementazione iniziale:

GitHub.

\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_

Build Platform

Compilazione.

Lint.

Test.

Analisi qualità.

\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_

Deployment Platform

Distribuzione automatizzata.

Ambienti.

Rollback.

\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_

Database Platform

Gestione delle migration.

Versionamento.

Seed.

Rollback.

\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_

AI Platform

Gestione centralizzata di:

●	Prompt Catalog;

●	configurazioni;

●	modelli;

●	provider;

●	metriche.

\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_

Documentation Platform

Documentazione tecnica sempre aggiornata.

\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_

26.4 Repository Strategy

Il repository rappresenta il patrimonio principale dello sviluppo.

Ogni modifica dovrà essere tracciabile.

La struttura comprenderà almeno:

/app



/docs



/database



/migrations



/functions



/prompts



/tests



/scripts



/infrastructure



/openproject



/adr



Ogni directory rappresenta una capability della piattaforma.

\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_

26.5 Branch Strategy

L’architettura adotta una strategia semplificata, adatta anche a un team ridotto.

main

Versione stabile.

\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_

develop

Integrazione continua.

\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_

feature/\*

Nuove funzionalità.

\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_

hotfix/\*

Correzioni urgenti.

\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_

release/\*

Preparazione del rilascio.

\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_

Questa strategia mantiene un buon equilibrio tra semplicità e controllo.

\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_

26.6 Continuous Integration

Ogni Pull Request attiverà automaticamente una pipeline composta da:

Verifica compilazione

\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_

Lint

\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_

Test automatici

\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_

Analisi statica

(CodeQL)

\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_

Dependency Scan

(Dependabot)

\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_

Secret Scan

\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_

Controllo delle migration

Verifica della corretta esecuzione delle migration Supabase.

\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_

Validazione Prompt Catalog

Controllo della sintassi e della coerenza dei prompt versionati.

\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_

Aggiornamento documentazione

Quando possibile automatizzato.

\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_

Solo le Pull Request che superano tutti i controlli potranno essere integrate.

\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_

26.7 Continuous Delivery

La distribuzione seguirà una pipeline standard.

Developer



↓



GitHub



↓



CI Pipeline



↓



Review



↓



Merge



↓



Deployment



↓



Migration



↓



Smoke Test



↓



Health Check



↓



Monitoring



Ogni fase dovrà produrre log e metriche.

\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_

26.8 Database Delivery

Le migration rappresentano componenti critici.

Ogni modifica dovrà:

●	essere versionata;

●	essere reversibile;

●	essere testata;

●	essere documentata;

●	essere collegata a un ADR;

●	essere collegata a OpenProject.

Le migration manuali sono vietate.

\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_

26.9 Release Management

L’ecosistema adotterà rilasci incrementali.

Le strategie disponibili comprendono:

Rolling Release

Per modifiche ordinarie.

\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_

Canary Release

Per nuove funzionalità AI.

\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_

Blue/Green

Per modifiche infrastrutturali rilevanti.

\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_

L’adozione delle strategie più avanzate dipenderà dall’evoluzione della piattaforma.

\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_

26.10 Feature Flag Management

Le nuove funzionalità potranno essere abilitate progressivamente.

Le Feature Flag consentiranno:

●	test controllati;

●	attivazione graduale;

●	rollback immediato;

●	sperimentazione AI.

Le configurazioni saranno esterne al codice applicativo.

\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_

26.11 Platform Metrics

La maturità della piattaforma sarà valutata tramite indicatori quantitativi.

Metriche DORA

Deployment Frequency

Frequenza dei rilasci.

\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_

Lead Time for Changes

Tempo medio dalla modifica al rilascio.

\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_

Change Failure Rate

Percentuale di rilasci con problemi.

\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_

Mean Time to Recovery

Tempo medio di ripristino.

\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_

Metriche di qualità

●	copertura dei test;

●	vulnerabilità aperte;

●	debt ratio;

●	tempo medio di review;

●	successo delle pipeline.

\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_

Metriche AI

●	qualità dei prompt;

●	accuratezza del retrieval;

●	costo medio per richiesta;

●	tasso di fallback;

●	soddisfazione utenti.

\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_

26.12 Platform Evolution Roadmap

L’evoluzione della piattaforma seguirà quattro livelli di maturità.



Livello	Stato	Obiettivo

L1 – Foundation	GitHub, Netlify, Supabase, Resend	Standardizzare il ciclo di sviluppo

L2 – Automation	GitHub Actions, Trigger.dev, test automatici	Eliminare attività manuali ripetitive

L3 – Observability	OpenTelemetry, Grafana, Sentry, dashboard centralizzate	Monitoraggio end-to-end

L4 – Intelligent Platform	AI-assisted development, analisi predittiva, automazione architetturale	Piattaforma auto-ottimizzante



Nota progettuale: i livelli successivi saranno introdotti solo quando il rapporto costi/benefici lo giustificherà. Per un progetto come SportelloScuola 2.0 è opportuno sfruttare inizialmente gli strumenti già disponibili e gratuiti (GitHub Actions, Supabase, Netlify, Trigger.dev), rinviando l’adozione di soluzioni più complesse solo in presenza di esigenze concrete.

\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_

26.13 Architecture Decision

ADR-PLT-002 — Internal Developer Platform

L’ecosistema adotta una Internal Developer Platform come capability permanente.

Ogni attività di sviluppo, rilascio, monitoraggio e manutenzione dovrà transitare attraverso processi standardizzati e automatizzati.

L’IDP costituisce un elemento strategico dell’architettura e rappresenta il principale strumento per garantire qualità, velocità di evoluzione e sostenibilità del progetto.

\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_

Enterprise Delivery Control Matrix



Area	Implementazione iniziale	Evoluzione consigliata

Source Control	GitHub	GitHub Enterprise o GitLab (solo se necessario)

CI	GitHub Actions	Pipeline modulari con riuso di workflow

Hosting	Netlify	Cloudflare Pages o infrastruttura dedicata se richiesto

Backend	Supabase	Evoluzione modulare mantenendo PostgreSQL come standard

Scheduler	Supabase Cron + Trigger.dev	Orchestrazione avanzata dei workflow

Osservabilità	Log Supabase e Netlify	OpenTelemetry + Grafana + Sentry

Gestione Segreti	GitHub, Netlify, Supabase	Infisical (open source) o HashiCorp Vault se la complessità crescerà

Feature Flag	Configurazione applicativa	Unleash (open source) o Flagsmith



Architectural Traceability Matrix (ATM)



EMA	SAPM	Repository	OpenProject

Governance dell’implementazione	Internal Developer Platform	.github/, supabase/, functions/, docs/, adr/	Epic “Platform Engineering”

Evoluzione tecnologica	CI/CD Pipeline	GitHub Actions	Feature “Continuous Delivery”

Qualità	DORA Metrics	Dashboard operative	Epic “Operational Excellence”

AI Governance	Prompt Validation	/prompts e AI Core	Feature “AI Quality Gates”



PARTE III

TECHNOLOGY ARCHITECTURE

CAPITOLO 27

TA-01 — Enterprise Technology Strategy

Technology Selection Framework

\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_

27.1 Vision

La Technology Architecture definisce l’insieme delle tecnologie, delle piattaforme e degli strumenti attraverso cui vengono implementate le capability descritte nella Solution Architecture.

La selezione delle tecnologie non rappresenta una decisione esclusivamente tecnica, bensì un processo architetturale che tiene conto di aspetti funzionali, economici, organizzativi e strategici.

Ogni componente tecnologico dovrà contribuire agli obiettivi di lungo periodo dell’ecosistema, garantendo sostenibilità, evolvibilità e indipendenza tecnologica.

\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_

27.2 Obiettivi

La Technology Architecture persegue i seguenti obiettivi:

●	garantire coerenza tecnologica;

●	ridurre il debito tecnico;

●	minimizzare il rischio di vendor lock-in;

●	privilegiare standard aperti;

●	favorire la sostenibilità economica;

●	semplificare la manutenzione;

●	supportare l’evoluzione futura della piattaforma;

●	assicurare la conformità normativa.

\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_

27.3 Enterprise Technology Principles

Le decisioni tecnologiche saranno guidate dai seguenti principi.

Open Standards First

Quando possibile saranno privilegiate tecnologie conformi a standard aperti.

Ciò favorisce interoperabilità, portabilità e longevità dell’ecosistema.

\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_

Cloud Agnostic

L’architettura dovrà poter essere implementata su differenti provider cloud senza modifiche sostanziali.

\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_

Open Source Preferred

Le soluzioni open source saranno preferite quando soddisfano i requisiti funzionali, qualitativi e di sicurezza.

L’adozione di servizi commerciali sarà giustificata esclusivamente da vantaggi concreti e misurabili.

\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_

Managed Services When Valuable

L’utilizzo di servizi gestiti è incoraggiato quando riduce significativamente la complessità operativa, mantenendo un adeguato livello di portabilità.

\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_

Incremental Evolution

Le tecnologie potranno evolvere progressivamente senza richiedere riscritture complete dell’ecosistema.

\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_

27.4 Technology Evaluation Model

Ogni tecnologia sarà valutata mediante un insieme uniforme di criteri.

Aderenza ai requisiti funzionali

Capacità della tecnologia di soddisfare i requisiti della capability.

\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_

Maturità

Stabilità della tecnologia.

Frequenza degli aggiornamenti.

Diffusione nella comunità.

\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_

Ecosistema

Qualità della documentazione.

Disponibilità di librerie.

Comunità di supporto.

\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_

Sicurezza

Storico delle vulnerabilità.

Rapidità di aggiornamento.

Supporto ai principali standard di sicurezza.

\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_

Scalabilità

Capacità di sostenere la crescita della piattaforma.

\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_

Manutenibilità

Facilità di aggiornamento.

Compatibilità futura.

Disponibilità di competenze.

\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_

Costi

Saranno considerati:

●	costo iniziale;

●	costo operativo;

●	costo di migrazione;

●	costo della formazione;

●	costo della manutenzione.

\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_

Vendor Lock-in

Ogni soluzione sarà valutata anche in relazione al grado di dipendenza dal fornitore.

\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_

27.5 Decision Matrix

Ogni componente tecnologico sarà analizzato mediante una matrice decisionale standard.



Criterio	Peso	Valutazione

Funzionalità	Alta	✔

Sicurezza	Alta	✔

Scalabilità	Alta	✔

Costi	Alta	✔

Maturità	Media	✔

Ecosistema	Media	✔

Vendor Lock-in	Alta	✔

Facilità di gestione	Media	✔



Questa matrice sarà applicata sistematicamente nei capitoli successivi.

\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_

27.6 Technology Lifecycle

Ogni tecnologia seguirà un ciclo di vita controllato.

Candidate

Tecnologia in valutazione.

\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_

Approved

Tecnologia approvata.

\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_

Preferred

Tecnologia raccomandata.

\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_

Deprecated

Tecnologia ancora utilizzabile ma destinata alla sostituzione.

\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_

Retired

Tecnologia non più ammessa.

\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_

Il ciclo di vita sarà governato dalla Architecture Governance.

\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_

27.7 Enterprise Technology Catalog

Il SAPM costituirà il catalogo ufficiale delle tecnologie autorizzate.

Per ogni tecnologia saranno documentati:

●	finalità;

●	capability supportate;

●	stato del ciclo di vita;

●	versione raccomandata;

●	alternative valutate;

●	motivazione della scelta;

●	rischi;

●	dipendenze;

●	criteri di aggiornamento.

Questo catalogo sarà sincronizzato con gli Architecture Decision Records (ADR) e con OpenProject.

\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_

27.8 Technology Roadmap

L’evoluzione tecnologica seguirà una roadmap articolata.

Fase 1 – Foundation

Consolidamento dello stack attuale.

\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_

Fase 2 – Optimization

Introduzione di strumenti per osservabilità, automazione e qualità.

\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_

Fase 3 – Intelligent Platform

Evoluzione della piattaforma AI e delle capacità di automazione.

\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_

Fase 4 – Enterprise Ecosystem

Integrazione con ulteriori servizi istituzionali e piattaforme esterne.

\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_

27.9 Architecture Decision

ADR-TA-001 — Technology Neutrality

La selezione delle tecnologie dovrà essere sempre motivata attraverso un processo di valutazione documentato.

Nessuna tecnologia potrà essere adottata esclusivamente sulla base della popolarità, della preferenza personale o delle tendenze del mercato.

Ogni scelta dovrà dimostrare il proprio contributo agli obiettivi architetturali dell’ecosistema.

\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_

Enterprise Technology Governance Matrix



Ambito	Stato attuale	Principio guida	Evoluzione prevista

Frontend	Framework moderno	Standard aperti	Evoluzione incrementale

Backend	BaaS + Serverless	Modularità	Servizi componibili

Database	PostgreSQL	Portabilità SQL	Ottimizzazione continua

AI	Provider esterni	Provider agnostic	Modelli multipli

Hosting	Piattaforme gestite	Cloud agnostic	Multi-provider

CI/CD	Automazione	Everything as Code	Internal Developer Platform



Architectural Traceability Matrix (ATM)



EMA	SAPM	Repository	OpenProject

Strategia Tecnologica	Technology Selection Framework	ADR, documentazione tecnica	Epic “Technology Governance”

Evoluzione della piattaforma	Technology Lifecycle	Configurazioni repository	Feature “Technology Management”

Governance	Technology Catalog	/docs, /adr	Epic “Architecture Governance”

Innovazione	Technology Roadmap	Roadmap tecnica	Capability “Technology Evolution”



PARTE III

TECHNOLOGY ARCHITECTURE

CAPITOLO 28

TA-02 — Frontend \& Experience Technology Stack

Enterprise Frontend Technology Assessment

\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_

28.1 Vision

Il Frontend Technology Stack rappresenta il livello tecnologico attraverso cui viene implementata la Experience Platform descritta nella Solution Architecture.

La sua funzione non consiste esclusivamente nella realizzazione dell’interfaccia utente, ma nella costruzione di un ambiente capace di garantire:

●	accessibilità;

●	usabilità;

●	elevate prestazioni;

●	modularità;

●	integrazione con i servizi applicativi;

●	evoluzione nel tempo.

L’architettura privilegia un approccio component-driven, nel quale ogni elemento dell’interfaccia costituisce un componente riutilizzabile e governato.

\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_

28.2 Requisiti architetturali

Lo stack frontend deve soddisfare i seguenti requisiti.

Esperienza utente

Interfacce rapide, coerenti e accessibili.

\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_

Modularità

Separazione tra componenti di presentazione e logica applicativa.

\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_

Tipizzazione

Riduzione degli errori mediante tipizzazione statica.

\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_

Prestazioni

Tempi di caricamento ridotti.

Bundle ottimizzati.

Rendering efficiente.

\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_

Evolvibilità

Possibilità di introdurre nuove capability senza modifiche strutturali.

\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_

Integrazione

Comunicazione naturale con API REST, servizi AI e Supabase.

\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_

28.3 Technology Assessment

React

Valutazione

React costituisce attualmente la soluzione più coerente con i requisiti del progetto.

Punti di forza

●	enorme ecosistema;

●	ampia disponibilità di sviluppatori;

●	architettura component-based;

●	ottima integrazione con TypeScript;

●	perfetta compatibilità con Supabase;

●	eccellente supporto AI.

Criticità

Richiede scelte architetturali aggiuntive riguardo:

●	routing;

●	state management;

●	caching.

Decisione

Tecnologia Preferred.

\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_

TypeScript

Valutazione

Rappresenta un requisito architetturale e non una semplice preferenza.

Benefici

●	maggiore qualità;

●	migliore manutenzione;

●	supporto agli strumenti AI;

●	migliore documentazione implicita.

Decisione

Tecnologia Mandatory.

\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_

Vite

Valutazione

Costituisce una delle migliori soluzioni disponibili per il contesto del progetto.

Benefici

●	startup estremamente rapido;

●	build veloci;

●	semplicità;

●	integrazione nativa con React.

Criticità

Supporto SSR limitato rispetto ad altri framework.

Decisione

Preferred nella fase attuale.

\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_

Tailwind CSS

Valutazione

Particolarmente adatto a piattaforme enterprise con design system.

Benefici

●	elevata produttività;

●	coerenza grafica;

●	ottimizzazione automatica;

●	facile manutenzione.

Criticità

Necessità di una governance rigorosa delle utility class.

Decisione

Preferred.

\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_

shadcn/ui

Valutazione

Consente di costruire un Design System proprietario mantenendo il controllo del codice.

A differenza di librerie tradizionali, i componenti vengono incorporati direttamente nel progetto e possono essere adattati alle esigenze specifiche.

Benefici

●	elevata personalizzazione;

●	accessibilità;

●	qualità del codice;

●	assenza di lock-in.

Decisione

Highly Recommended.

\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_

28.4 Comparative Assessment

React vs Next.js



Aspetto	React + Vite	Next.js

Complessità	Bassa	Media

Prestazioni SPA	Molto elevate	Elevate

SEO	Limitata	Ottima

SSR	Limitato	Nativo

Routing	Separato	Integrato

Deployment	Molto semplice	Più articolato



Valutazione

Per l’attuale architettura di SportelloScuola 2.0, fortemente orientata a un’applicazione autenticata, la necessità di Server-Side Rendering è ridotta. L’adozione di Next.js introdurrebbe complessità non giustificata dai requisiti attuali.

\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_

React vs Vue

Vue offre una curva di apprendimento molto favorevole e un’ottima esperienza di sviluppo.

Tuttavia:

●	ecosistema AI meno esteso;

●	minore disponibilità di competenze;

●	integrazione meno consolidata con alcune librerie enterprise.

Decisione

React mantiene un vantaggio strategico.

\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_

React vs Angular

Angular offre:

●	struttura molto rigorosa;

●	Dependency Injection;

●	strumenti enterprise integrati.

Tuttavia introduce:

●	maggiore complessità;

●	curva di apprendimento elevata;

●	maggiore verbosità.

Per un progetto come SportelloScuola 2.0 risulterebbe eccessivamente strutturato.

\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_

React vs Svelte

Svelte presenta eccellenti prestazioni e un modello di sviluppo molto snello.

Tuttavia:

●	ecosistema più limitato;

●	minore diffusione enterprise;

●	supporto inferiore per alcune integrazioni.

\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_

28.5 State Management Strategy

L’architettura distingue chiaramente i diversi livelli di stato.



Tipo di stato	Tecnologia raccomandata

Stato locale UI	React Hooks

Stato del server	TanStack Query

Autenticazione	Supabase Auth

Configurazioni globali	Context API

Workflow complessi (solo se necessari)	Zustand



Decisione architetturale: evitare l’introduzione di Redux finché la complessità dell’applicazione non lo renda realmente necessario. Lo stack React + TanStack Query + Context API + Zustand copre efficacemente la maggior parte degli scenari previsti, mantenendo il codice più semplice e leggibile.

28.6 Enterprise Design System

Il Design System rappresenta uno degli asset architetturali della piattaforma.

Dovrà comprendere:

●	componenti UI;

●	token grafici;

●	palette cromatiche;

●	tipografia;

●	icone;

●	spacing;

●	animazioni;

●	linee guida di accessibilità.

I componenti saranno versionati e documentati.

\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_

28.7 Frontend Quality Attributes

La qualità dello stack frontend sarà monitorata attraverso indicatori quali:

●	Core Web Vitals;

●	tempo di caricamento iniziale;

●	dimensione del bundle;

●	copertura dei test;

●	accessibilità (WCAG 2.2 AA);

●	riutilizzo dei componenti;

●	complessità dei componenti;

●	debito tecnico.

\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_

28.8 Architecture Decision

ADR-FE-001 — React Technology Baseline

L’ecosistema adotta React + TypeScript + Vite + Tailwind CSS + shadcn/ui come baseline tecnologica del frontend.

Questa combinazione offre il miglior equilibrio tra:

●	semplicità;

●	produttività;

●	qualità del codice;

●	integrazione con Supabase;

●	compatibilità con l’ecosistema AI;

●	sostenibilità nel lungo periodo.

L’eventuale migrazione verso framework con rendering lato server (ad esempio Next.js) sarà presa in considerazione solo se emergeranno requisiti specifici legati a SEO pubblico, rendering ibrido o distribuzione di contenuti non autenticati.

\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_

Enterprise Frontend Technology Matrix



Tecnologia	Stato	Motivazione	Evoluzione prevista

React	Preferred	Ecosistema maturo e modulare	Consolidamento

TypeScript	Mandatory	Sicurezza del codice	Standard permanente

Vite	Preferred	Prestazioni e semplicità	Rivalutazione solo in caso di SSR

Tailwind CSS	Preferred	Design System scalabile	Consolidamento

shadcn/ui	Preferred	Componenti controllati e accessibili	Evoluzione del Design System

TanStack Query	Preferred	Gestione efficiente dello stato server	Estensione delle capability

Zustand	Optional	Stato globale leggero	Introduzione solo se necessaria



Architectural Traceability Matrix (ATM)



EMA	SAPM	Repository	OpenProject

Experience Platform	Frontend Technology Stack	src/, components/, hooks/	Epic “Frontend Evolution”

Design System	UI Component Library	components/ui/	Feature “Enterprise Design System”

Accessibilità	Frontend Quality	Configurazioni e test	Epic “Accessibility \& UX”

Evoluzione tecnologica	React Baseline	package.json, configurazioni Vite	Feature “Frontend Modernization”



PARTE III

TECHNOLOGY ARCHITECTURE

CAPITOLO 29

TA-03 — Backend \& Data Platform Technology Stack

Enterprise Backend Technology Assessment

\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_

29.1 Vision

Il Backend Technology Stack costituisce il nucleo operativo dell’ecosistema SportelloScuola 2.0, fornendo i servizi necessari alla gestione dei dati, della sicurezza, dell’integrazione applicativa e dell’esecuzione della logica di dominio.

L’architettura è progettata secondo un modello Backend as a Platform (BaaP), nel quale il backend non rappresenta semplicemente un insieme di API, ma una piattaforma componibile capace di integrare servizi dati, autenticazione, storage, funzioni serverless e capacità AI.

Questa impostazione consente di ridurre la complessità operativa mantenendo un elevato grado di modularità.

\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_

29.2 Requisiti architetturali

La piattaforma backend deve soddisfare i seguenti requisiti.

Affidabilità

Elevata disponibilità dei servizi.

\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_

Integrità

Coerenza delle informazioni.

\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_

Sicurezza

Protezione dei dati e controllo granulare degli accessi.

\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_

Scalabilità

Capacità di sostenere la crescita degli utenti e delle capability.

\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_

Evolvibilità

Possibilità di aggiungere nuovi moduli senza modifiche strutturali.

\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_

Osservabilità

Monitoraggio continuo delle operazioni.

\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_

Integrazione

Supporto nativo per servizi AI, API, eventi e workflow.

\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_

29.3 Enterprise Backend Assessment

Supabase

Valutazione

Supabase rappresenta una delle piattaforme più equilibrate oggi disponibili per la realizzazione di applicazioni enterprise di piccole e medie dimensioni.

Il suo principale punto di forza consiste nell’unificazione di servizi che normalmente richiederebbero numerosi componenti differenti.

Componenti integrati

●	PostgreSQL

●	Authentication

●	Storage

●	Row Level Security

●	Edge Functions

●	REST API

●	Realtime

●	Cron Jobs

●	Vector Database (pgvector)

Benefici

●	riduzione della complessità;

●	costi contenuti;

●	ecosistema maturo;

●	forte aderenza agli standard PostgreSQL;

●	elevata portabilità.

Criticità

●	alcune funzionalità avanzate dipendono dalla roadmap del provider;

●	ecosistema più giovane rispetto a cloud hyperscaler.

Decisione

Preferred Technology.

\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_

PostgreSQL

Valutazione

PostgreSQL costituisce uno degli elementi più strategici dell’intera architettura.

La scelta di un database relazionale standard garantisce:

●	interoperabilità;

●	indipendenza dal cloud;

●	maturità;

●	supporto GIS;

●	estensioni AI;

●	transazioni ACID;

●	alta affidabilità.

Decisione

Mandatory Technology.

\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_

Edge Functions

Valutazione

Le Edge Functions permettono di implementare logica applicativa vicina agli utenti e ai dati.

Sono particolarmente adatte per:

●	integrazione AI;

●	orchestrazione;

●	webhook;

●	API;

●	autenticazione;

●	workflow.

Criticità

Non rappresentano la soluzione ideale per elaborazioni lunghe o altamente computazionali, che dovranno essere delegate a servizi asincroni dedicati.

Decisione

Preferred.

\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_

Row Level Security

Dal punto di vista architetturale considero la RLS uno degli elementi più importanti dell’intero stack.

Essa consente di spostare parte delle regole di autorizzazione direttamente sul database.

Benefici:

●	sicurezza;

●	semplicità;

●	auditabilità;

●	riduzione del codice applicativo.

Decisione

Mandatory.

\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_

29.4 Comparative Assessment

Supabase vs Firebase



Aspetto	Supabase	Firebase

Database	PostgreSQL	NoSQL

SQL Standard	✔	✖

Vendor Lock-in	Ridotto	Elevato

RLS	✔	Limitata

AI	Ottima integrazione	Buona

Portabilità	Molto elevata	Limitata



Valutazione

Per un sistema documentale e amministrativo come SportelloScuola 2.0, PostgreSQL rappresenta una scelta più naturale rispetto a un database NoSQL.

\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_

Supabase vs Appwrite

Appwrite offre un’esperienza sviluppatore molto valida.

Tuttavia:

●	ecosistema più piccolo;

●	minore maturità;

●	minore disponibilità di estensioni PostgreSQL.

Decisione

Supabase mantiene un vantaggio architetturale.

\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_

Supabase vs PocketBase

PocketBase è estremamente interessante per MVP.

Tuttavia:

●	database SQLite;

●	scalabilità limitata;

●	minore governance.

Non è adatto ai requisiti enterprise del progetto.

\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_

Supabase vs Backend Tradizionale (NestJS + PostgreSQL)

Questa soluzione garantirebbe:

●	massimo controllo;

●	massima flessibilità;

●	architettura completamente personalizzabile.

Contro:

●	maggiore complessità;

●	costi operativi superiori;

●	necessità di gestire direttamente autenticazione, storage, API e deployment.

Decisione

Per le dimensioni e gli obiettivi di SportelloScuola 2.0, Supabase offre un rapporto costi/benefici decisamente migliore.

\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_

29.5 Data Access Strategy

L’accesso ai dati seguirà una gerarchia ben definita:

1\.	RLS (controllo di sicurezza a livello database);

2\.	View e funzioni SQL per la logica condivisa;

3\.	Edge Functions per l’orchestrazione applicativa;

4\.	Client Supabase come livello di accesso per il frontend.

Questa separazione riduce la duplicazione della logica e migliora la manutenibilità.

\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_

29.6 Serverless Strategy

L’architettura adotta il paradigma serverless per:

●	API applicative;

●	webhook;

●	integrazioni;

●	orchestrazione AI;

●	notifiche.

Le elaborazioni intensive saranno invece pianificate tramite workflow asincroni, come definito nella Solution Architecture.

\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_

29.7 Backend Quality Attributes

La qualità del backend sarà monitorata attraverso:

●	disponibilità del database;

●	tempo medio di risposta delle API;

●	latenza delle Edge Functions;

●	utilizzo delle risorse;

●	tasso di errori;

●	successo delle migrazioni;

●	prestazioni delle query;

●	copertura delle policy RLS;

●	utilizzo dello storage.

\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_

29.8 Architecture Decision

ADR-BE-001 — Supabase Enterprise Baseline

L’ecosistema adotta Supabase come piattaforma backend di riferimento, mantenendo PostgreSQL quale standard tecnologico permanente.

Le capability offerte da Supabase saranno utilizzate privilegiando componenti standard e portabili, evitando dipendenze non necessarie da funzionalità proprietarie.

Qualora esigenze future richiedessero una migrazione verso un’infrastruttura gestita autonomamente, l’utilizzo di PostgreSQL, SQL standard e RLS faciliterà significativamente la transizione.

\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_

Enterprise Backend Technology Matrix



Tecnologia	Stato	Motivazione	Evoluzione prevista

PostgreSQL	Mandatory	Standard aperto, affidabile e portabile	Standard permanente

Supabase	Preferred	Piattaforma integrata e produttiva	Consolidamento con eventuale self-hosting futuro

Edge Functions	Preferred	Orchestrazione serverless	Integrazione con workflow asincroni

Row Level Security	Mandatory	Sicurezza a livello dati	Raffinamento progressivo delle policy

Supabase Storage	Preferred	Gestione integrata dei documenti	Possibile estensione verso storage S3-compatibile

pgvector	Preferred	Base per RAG e ricerca semantica	Evoluzione della Knowledge Platform



Architectural Traceability Matrix (ATM)



EMA	SAPM	Repository	OpenProject

Enterprise Data Platform	Backend Technology Stack	supabase/, migrations/, functions/	Epic “Backend Evolution”

Sicurezza	RLS e Auth	Policy SQL e configurazioni Auth	Feature “Data Security”

AI Platform	pgvector e Storage	Tabelle vettoriali e documenti	Epic “Knowledge Platform”

Integrazione	Edge Functions	Cartella functions/	Feature “Application Services”



PARTE III

TECHNOLOGY ARCHITECTURE

CAPITOLO 30

TA-04 — Enterprise Data Architecture \& Knowledge Platform

Data Technology Assessment

\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_

30.1 Vision

L’Enterprise Data Architecture definisce il modello attraverso cui le informazioni vengono acquisite, organizzate, governate, correlate e rese disponibili alle diverse capability dell’ecosistema SportelloScuola 2.0.

L’obiettivo dell’architettura non consiste esclusivamente nella memorizzazione dei dati, bensì nella costruzione di un patrimonio informativo strutturato, affidabile e riutilizzabile.

Il database rappresenta quindi una componente della più ampia Enterprise Knowledge Platform, nella quale convivono dati strutturati, documenti, metadati, rappresentazioni vettoriali e conoscenza semantica.

\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_

30.2 Principi architetturali

La progettazione della piattaforma dati si basa sui seguenti principi.

Single Source of Truth

Ogni informazione deve avere una sola fonte autorevole.

La duplicazione sistematica dei dati è vietata.

\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_

Data as Enterprise Asset

I dati costituiscono un patrimonio strategico dell’organizzazione.

La loro gestione segue gli stessi principi di governo applicati agli altri asset architetturali.

\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_

Knowledge by Design

Ogni informazione dovrà poter essere arricchita mediante:

●	metadati;

●	relazioni;

●	classificazioni;

●	collegamenti semantici.

\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_

AI Ready

L’intera piattaforma dati dovrà essere progettata per alimentare efficacemente i servizi di Intelligenza Artificiale.

\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_

Evolvibilità

Il modello informativo dovrà poter crescere senza compromettere le applicazioni esistenti.

\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_

30.3 Enterprise Data Domains

L’ecosistema distingue differenti domini informativi.

Operational Data

Comprendono:

●	utenti;

●	pratiche;

●	workflow;

●	configurazioni;

●	autenticazione.

\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_

Document Knowledge

Comprende:

●	documentazione scolastica;

●	normativa;

●	regolamenti;

●	modulistica;

●	guide operative.

\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_

AI Knowledge

Comprende:

●	embeddings;

●	chunk;

●	risultati del retrieval;

●	valutazioni;

●	prompt;

●	feedback.

\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_

Governance Data

Comprende:

●	audit;

●	metriche;

●	monitoraggio;

●	log;

●	indicatori di qualità.

\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_

Metadata Repository

Raccoglie tutte le informazioni descrittive dei dati.

\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_

30.4 Enterprise Knowledge Model

La piattaforma distingue cinque livelli di conoscenza.

Livello 1 — Dati

Informazioni elementari.

\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_

Livello 2 — Informazioni

Dati contestualizzati.

\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_

Livello 3 — Documenti

Informazioni strutturate.

\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_

Livello 4 — Conoscenza

Relazioni tra documenti.

Metadati.

Classificazioni.

\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_

Livello 5 — Intelligenza

Risultato dell’elaborazione AI.

Questo modello supporta una progressiva trasformazione del patrimonio informativo.

\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_

30.5 PostgreSQL Assessment

Valutazione

PostgreSQL costituisce il fondamento dell’intera Enterprise Knowledge Platform.

I principali punti di forza comprendono:

●	standard SQL;

●	estendibilità;

●	affidabilità;

●	transazioni ACID;

●	indicizzazione avanzata;

●	supporto JSON;

●	ricerca full-text;

●	estensioni vettoriali;

●	sicurezza.

La scelta di PostgreSQL garantisce un’elevata longevità architetturale.

\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_

30.6 pgvector Assessment

L’estensione pgvector consente di integrare la ricerca semantica direttamente all’interno della piattaforma dati.

Benefici:

●	eliminazione di database vettoriali separati;

●	riduzione della complessità;

●	integrazione nativa con PostgreSQL;

●	semplicità di backup;

●	coerenza transazionale.

Per il volume informativo previsto di SportelloScuola 2.0, pgvector rappresenta la soluzione tecnologica più equilibrata.

Solo qualora il patrimonio documentale dovesse raggiungere dimensioni molto elevate (milioni di vettori e carichi di ricerca significativamente superiori agli scenari attesi), potrà essere valutata l’adozione di un motore vettoriale dedicato.

\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_

30.7 Document Management Strategy

Ogni documento seguirà un ciclo di vita controllato.

Acquisizione

Importazione.

\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_

Classificazione

Attribuzione delle categorie.

\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_

Metadata Extraction

Estrazione automatica.

\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_

Versioning

Gestione delle revisioni.

\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_

Chunking

Segmentazione semantica.

\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_

Embedding

Generazione dei vettori.

\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_

Publication

Disponibilità verso il motore RAG.

\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_

Archiviazione

Conservazione controllata.

\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_

30.8 Metadata Architecture

Ogni documento sarà accompagnato da un insieme strutturato di metadati.

Tra essi:

●	identificativo;

●	autore;

●	data;

●	fonte;

●	versione;

●	livello di affidabilità;

●	categoria;

●	parole chiave;

●	riferimenti normativi;

●	stato di validazione;

●	livello di accessibilità.

I metadati rappresentano uno degli elementi fondamentali della Knowledge Platform.

\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_

30.9 Data Quality Framework

La qualità del patrimonio informativo sarà valutata attraverso indicatori specifici.

Completezza

Presenza delle informazioni obbligatorie.

\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_

Accuratezza

Correttezza dei dati.

\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_

Coerenza

Assenza di contraddizioni.

\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_

Aggiornamento

Allineamento alle fonti più recenti.

\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_

Tracciabilità

Possibilità di ricostruire l’origine di ogni informazione.

\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_

Affidabilità

Valutazione della qualità delle fonti.

\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_

30.10 Knowledge Graph Evolution

L’architettura è progettata affinché la piattaforma possa evolvere progressivamente verso un Knowledge Graph.

In una prima fase le relazioni saranno gestite attraverso il modello relazionale e i metadati.

Successivamente potranno essere introdotti livelli semantici che consentano di rappresentare esplicitamente le connessioni tra:

●	norme;

●	procedure;

●	moduli;

●	enti;

●	utenti;

●	documenti;

●	conversazioni AI;

●	decisioni amministrative.

Questa evoluzione non richiederà la sostituzione del database relazionale, ma ne estenderà le capacità mediante un livello semantico dedicato.

\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_

30.11 Architecture Decision

ADR-DATA-001 — Enterprise Knowledge Platform

L’ecosistema adotta PostgreSQL come fondamento della Enterprise Knowledge Platform.

La piattaforma integra dati operativi, documenti, metadati e rappresentazioni vettoriali in un’unica architettura coerente.

L’introduzione di componenti specialistici (ad esempio database vettoriali dedicati o motori RDF) sarà valutata esclusivamente qualora esigenze misurabili di scalabilità o di espressività semantica ne dimostrino il valore aggiunto.

\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_

Enterprise Data Technology Matrix



Tecnologia	Stato	Motivazione	Evoluzione prevista

PostgreSQL	Mandatory	Standard aperto e piattaforma dati unificata	Standard permanente

pgvector	Preferred	Ricerca semantica integrata	Ottimizzazione continua

Full-Text Search	Preferred	Ricerca lessicale efficiente	Integrazione con ranking ibrido

JSONB	Preferred	Flessibilità per metadati e configurazioni	Consolidamento

Storage Oggetti	Preferred	Gestione documentale integrata	Evoluzione verso storage S3-compatibile se necessario

Knowledge Graph	Planned	Arricchimento semantico	Introduzione progressiva



Architectural Traceability Matrix (ATM)



EMA	SAPM	Repository	OpenProject

Patrimonio Informativo	Enterprise Data Architecture	supabase/, migrations/, storage/	Epic “Knowledge Platform”

AI	pgvector e pipeline RAG	Tabelle vettoriali e funzioni di indicizzazione	Feature “Semantic Search”

Governance	Data Quality Framework	Procedure di validazione	Epic “Data Governance”

Evoluzione	Knowledge Graph	Modello semantico	Capability “Knowledge Management”



PARTE III

TECHNOLOGY ARCHITECTURE

CAPITOLO 31

TA-05 — Enterprise AI Technology Platform

AI Technology Assessment

\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_

31.1 Vision

La Enterprise AI Technology Platform definisce l’insieme delle tecnologie, dei servizi e delle modalità operative attraverso cui le capacità di Intelligenza Artificiale vengono integrate nell’ecosistema SportelloScuola 2.0.

L’architettura adotta un paradigma AI Provider Agnostic, nel quale il dominio applicativo non dipende direttamente da uno specifico modello linguistico o da un singolo fornitore.

La piattaforma AI costituisce un livello infrastrutturale trasversale, capace di orchestrare differenti modelli, pipeline di Retrieval-Augmented Generation (RAG), strumenti di osservabilità e meccanismi di governance.

\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_

31.2 Principi architetturali

La progettazione della piattaforma AI segue i seguenti principi.

Provider Independence

Le applicazioni non dovranno dipendere da un singolo provider.

\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_

Model Agnostic

Ogni servizio AI dovrà poter utilizzare modelli differenti in funzione del caso d’uso.

\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_

Human Oversight

Le decisioni ad impatto significativo dovranno prevedere la possibilità di supervisione umana.

\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_

Explainability

Ogni risposta AI dovrà essere accompagnata da elementi che ne facilitino la comprensione e la verifica (ad esempio fonti, riferimenti documentali e livello di confidenza).

\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_

Cost Optimization

La selezione del modello dovrà bilanciare qualità, tempi di risposta e costi operativi.

\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_

AI Governance

L’intero ciclo di vita dell’AI dovrà essere tracciato e monitorato.

\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_

31.3 AI Platform Reference Architecture

La piattaforma è articolata nei seguenti livelli.

1\.	AI Gateway – punto di accesso unico ai servizi AI.

2\.	Model Router – selezione del modello più adatto.

3\.	Prompt Orchestrator – gestione centralizzata dei prompt.

4\.	Knowledge Retrieval Layer – recupero delle informazioni tramite RAG.

5\.	Inference Layer – interazione con i modelli linguistici.

6\.	AI Observability Layer – monitoraggio, logging e metriche.

7\.	Feedback \& Learning Layer – raccolta dei feedback e miglioramento continuo.

Questa suddivisione consente di sostituire singoli componenti senza impatti sul resto dell’ecosistema.

\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_

31.4 Comparative Assessment dei provider LLM

OpenAI

Punti di forza

●	qualità elevata dei modelli;

●	ottime capacità di ragionamento;

●	ecosistema maturo;

●	API stabili;

●	ampia documentazione.

Criticità

●	dipendenza dal provider;

●	costi variabili in funzione dell’utilizzo.

Valutazione

Provider di riferimento per la fase iniziale, grazie al buon equilibrio tra qualità, affidabilità e integrazione.

\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_

Anthropic

Punti di forza

●	particolare attenzione alla sicurezza;

●	eccellenti prestazioni nei compiti di ragionamento e analisi documentale;

●	contesto molto ampio.

Criticità

●	ecosistema meno esteso rispetto a OpenAI.

Valutazione

Provider strategico per scenari che richiedono elaborazioni documentali complesse.

\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_

Google (Gemini)

Punti di forza

●	integrazione con l’ecosistema Google;

●	modelli multimodali;

●	prestazioni competitive.

Criticità

●	API e funzionalità in rapida evoluzione.

Valutazione

Provider alternativo, particolarmente interessante per scenari multimodali.

\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_

Modelli open source

(Esempi: Llama, Mistral, Qwen)

Punti di forza

●	pieno controllo;

●	costi prevedibili;

●	possibilità di esecuzione in ambienti privati.

Criticità

●	necessità di gestire direttamente l’infrastruttura;

●	qualità variabile in funzione del modello e dell’hardware disponibile.

Valutazione

Opzione evolutiva, da considerare qualora esigenze di sovranità del dato, costi o requisiti normativi lo rendessero opportuno.

\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_

31.5 Embedding Model Strategy

La generazione degli embeddings sarà trattata come un servizio indipendente rispetto al modello generativo.

I criteri di scelta comprenderanno:

●	qualità della rappresentazione semantica;

●	costo;

●	velocità;

●	compatibilità con pgvector;

●	supporto multilingue.

Questa separazione consente di aggiornare i modelli di embedding senza modificare la logica applicativa.

\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_

31.6 Prompt Engineering Platform

I prompt rappresentano un patrimonio architetturale.

Essi saranno:

●	versionati;

●	documentati;

●	classificati;

●	sottoposti a revisione;

●	testati automaticamente;

●	collegati agli ADR e alle funzionalità applicative.

Il Prompt Catalog diventa quindi parte integrante del repository.

\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_

31.7 AI Routing Strategy

Il sistema introdurrà un Model Router capace di selezionare automaticamente il modello più adatto in base a:

●	complessità della richiesta;

●	tipologia del documento;

●	lingua;

●	costo massimo previsto;

●	requisiti di accuratezza;

●	disponibilità del provider.

Questa capacità consentirà di ottimizzare l’utilizzo delle risorse e di ridurre i costi operativi.

\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_

31.8 AI Observability

Le principali metriche monitorate comprenderanno:

●	tempo medio di risposta;

●	consumo di token;

●	costo per richiesta;

●	accuratezza percepita;

●	tasso di fallback;

●	utilizzo dei provider;

●	qualità del retrieval;

●	confidenza delle risposte;

●	feedback degli utenti.

Le metriche saranno integrate con la piattaforma di osservabilità descritta nei capitoli successivi.

\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_

31.9 AI Cost Management

L’architettura introduce una gestione esplicita dei costi AI.

Saranno monitorati:

●	costo per funzionalità;

●	costo per utente;

●	costo per provider;

●	costo per workflow;

●	consumo giornaliero e mensile;

●	soglie di allerta.

L’obiettivo è evitare che la crescita dell’utilizzo dell’AI produca incrementi incontrollati della spesa.

\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_

31.10 AI Technology Roadmap



Livello	Obiettivo

L1 – Single Provider	Un solo provider LLM con RAG di base

L2 – Multi-Provider	Introduzione del Model Router e fallback automatico

L3 – AI Gateway	Gateway centralizzato con policy, caching e metriche

L4 – Intelligent Orchestration	Routing dinamico basato su costi, qualità e carico

L5 – Hybrid AI Platform	Coesistenza di modelli cloud e open source



Nota progettuale: questa roadmap permette di partire con una configurazione semplice (ad esempio OpenAI) e di evolvere progressivamente senza modificare il codice applicativo, grazie all’astrazione introdotta dall’AI Gateway.

31.11 Architecture Decision

ADR-AI-TECH-001 — AI Provider Agnostic Platform

L’ecosistema adotta una piattaforma AI indipendente dal provider.

L’accesso ai modelli linguistici avverrà esclusivamente tramite un livello di astrazione (AI Gateway), responsabile del routing, della gestione dei prompt, del monitoraggio e del controllo dei costi.

L’adozione di un provider specifico rappresenta una scelta implementativa e non architetturale.

\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_

Enterprise AI Technology Matrix



Componente	Stato	Motivazione	Evoluzione prevista

AI Gateway	Planned	Punto unico di accesso	Introduzione progressiva

Model Router	Planned	Riduzione del vendor lock-in	Routing intelligente

OpenAI	Preferred (fase iniziale)	Qualità e maturità	Coesistenza con altri provider

Anthropic	Alternative Strategica	Ragionamento e documenti	Integrazione selettiva

Gemini	Alternative	Multimodalità	Valutazione continua

Modelli Open Source	Planned	Sovranità del dato	Introduzione in scenari dedicati

Prompt Catalog	Mandatory	Governance dei prompt	Versionamento continuo

Embedding Service	Mandatory	RAG e ricerca semantica	Aggiornamento indipendente



Architectural Traceability Matrix (ATM)



EMA	SAPM	Repository	OpenProject

AI Core	Enterprise AI Platform	functions/ai/, prompts/, supabase/	Epic “AI Platform”

Knowledge Platform	Embedding Service	Tabelle pgvector	Feature “Semantic Retrieval”

Governance AI	AI Gateway e Observability	Logging AI e metriche	Epic “AI Governance”

Evoluzione	Model Router	Configurazioni provider	Capability “Multi-Provider AI”



PARTE III

TECHNOLOGY ARCHITECTURE

CAPITOLO 32

TA-06 — AI Reliability, Evaluation \& Guardrails Architecture

Enterprise Trustworthy AI Framework

\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_

32.1 Vision

L’Intelligenza Artificiale rappresenta un componente critico dell’ecosistema SportelloScuola 2.0 e, come tale, deve essere progettata affinché le sue prestazioni siano non solo elevate, ma anche affidabili, verificabili e governabili.

La presente architettura introduce un Trustworthy AI Framework finalizzato a garantire che ogni servizio AI operi entro livelli controllati di accuratezza, trasparenza, sicurezza e conformità.

L’obiettivo non è eliminare completamente il rischio di errore — irrealistico per qualsiasi sistema basato su modelli probabilistici — bensì renderlo misurabile, monitorabile e gestibile attraverso processi strutturati.

\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_

32.2 Principi architetturali

Human-Centred AI

L’AI supporta il processo decisionale senza sostituire la responsabilità umana.

\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_

Trust by Design

La fiducia nel sistema viene costruita sin dalla progettazione, mediante controlli e verifiche integrate.

\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_

Explainability

Le risposte devono essere accompagnate da elementi che consentano di comprenderne l’origine e il contesto.

\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_

Evidence-Based Responses

Le risposte devono privilegiare informazioni supportate da fonti documentali autorevoli.

\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_

Continuous Evaluation

Le prestazioni dell’AI devono essere monitorate lungo tutto il ciclo di vita.

\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_

Safe Failure

In caso di incertezza o errore, il sistema deve adottare comportamenti conservativi, evitando di fornire indicazioni potenzialmente fuorvianti.

\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_

32.3 AI Trust Reference Model

L’architettura della fiducia si articola in sette livelli.

1\.	Input Validation

2\.	Prompt Guardrails

3\.	Knowledge Retrieval Validation

4\.	LLM Inference

5\.	Output Validation

6\.	Human Review (quando prevista)

7\.	Continuous Monitoring

Ogni richiesta attraversa questi livelli prima di essere restituita all’utente.

\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_

32.4 Guardrails Architecture

Il sistema implementa diversi livelli di protezione.

Input Guardrails

Controllano:

●	formati;

●	lunghezza;

●	linguaggio offensivo;

●	tentativi di prompt injection;

●	dati sensibili.

\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_

Prompt Guardrails

Proteggono:

●	prompt di sistema;

●	istruzioni permanenti;

●	configurazioni AI.

\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_

Retrieval Guardrails

Verificano:

●	qualità dei documenti;

●	aggiornamento delle fonti;

●	livello di affidabilità;

●	pertinenza semantica.

\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_

Output Guardrails

Controllano:

●	coerenza;

●	presenza delle fonti;

●	linguaggio appropriato;

●	informazioni mancanti;

●	possibili allucinazioni.

\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_

32.5 AI Evaluation Framework

Le prestazioni saranno misurate attraverso benchmark periodici.

Accuratezza

Percentuale di risposte corrette.

\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_

Groundedness

Grado di corrispondenza tra risposta e fonti disponibili.

\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_

Faithfulness

Assenza di contenuti inventati.

\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_

Relevance

Pertinenza rispetto alla domanda.

\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_

Completeness

Copertura delle informazioni necessarie.

\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_

Consistency

Stabilità delle risposte in condizioni analoghe.

\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_

Latency

Tempo medio di risposta.

\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_

Cost Efficiency

Costo medio per richiesta.

\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_

32.6 Hallucination Mitigation Strategy

Per ridurre il rischio di allucinazioni il sistema adotta una strategia multilivello.

Retrieval-Augmented Generation

Ogni risposta privilegia documenti interni validati.

\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_

Citation Requirement

Quando possibile, le risposte includono riferimenti alle fonti utilizzate.

\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_

Confidence Threshold

Se il livello di confidenza è insufficiente, il sistema segnala esplicitamente l’incertezza invece di formulare una risposta potenzialmente errata.

\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_

Fallback Strategy

In assenza di informazioni attendibili, l’utente viene indirizzato verso fonti ufficiali o verso l’assistenza umana.

\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_

32.7 Prompt Evaluation Pipeline

Ogni prompt segue un ciclo di vita strutturato.

1\.	Progettazione.

2\.	Revisione.

3\.	Test automatici.

4\.	Benchmark.

5\.	Approvazione.

6\.	Versionamento.

7\.	Monitoraggio.

8\.	Eventuale ritiro.

I prompt costituiscono un patrimonio architetturale soggetto a governance.

\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_

32.8 AI Testing Strategy

Il sistema prevede differenti categorie di test.

Functional AI Tests

Verificano il corretto comportamento delle funzionalità.

\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_

Prompt Regression Tests

Controllano che modifiche ai prompt non peggiorino i risultati.

\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_

RAG Evaluation

Misura la qualità del recupero documentale.

\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_

Safety Tests

Verificano la resistenza a prompt malevoli e scenari avversi.

\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_

Bias Monitoring

Analizza la presenza di eventuali comportamenti sistematicamente distorti.

\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_

Load Tests

Valutano il comportamento sotto carico.

\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_

32.9 AI Observability Dashboard

Il sistema metterà a disposizione una dashboard dedicata con indicatori quali:

●	accuratezza stimata;

●	tasso di fallback;

●	documenti maggiormente utilizzati;

●	distribuzione dei provider AI;

●	consumo di token;

●	costo per servizio;

●	tempi di risposta;

●	qualità del retrieval;

●	feedback degli utenti;

●	errori di orchestrazione.

Questa dashboard consentirà un miglioramento continuo delle prestazioni.

\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_

32.10 AI Risk Management

I principali rischi identificati comprendono:



Rischio	Misura di mitigazione

Allucinazioni	RAG, citazioni, soglie di confidenza

Prompt Injection	Input e Prompt Guardrails

Drift dei modelli	Benchmark periodici

Aumento dei costi	Model Router e budget dinamici

Obsolescenza delle fonti	Versionamento e monitoraggio documentale

Dipendenza da un provider	Architettura multi-provider



32.11 Architecture Decision

ADR-AI-TRUST-001 — Trustworthy AI by Design

Ogni componente AI della piattaforma dovrà essere progettato secondo il principio del Trustworthy AI by Design.

Nessun servizio AI potrà essere rilasciato senza:

●	benchmark documentati;

●	test automatici;

●	strategie di fallback;

●	monitoraggio continuo;

●	controllo dei costi;

●	meccanismi di tracciabilità;

●	documentazione dei prompt;

●	procedure di revisione periodica.

L’affidabilità diventa così una caratteristica architetturale verificabile e non una semplice aspettativa.

\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_

Enterprise AI Reliability Matrix



Componente	Stato	Obiettivo	Evoluzione prevista

Prompt Guardrails	Mandatory	Protezione delle istruzioni	Raffinamento continuo

Input Validation	Mandatory	Sicurezza degli ingressi	Estensione dei controlli

Retrieval Validation	Preferred	Qualità delle fonti	Ranking adattivo

Output Validation	Mandatory	Controllo delle risposte	Integrazione con verifiche automatiche

AI Evaluation Suite	Planned	Benchmark continuo	Automazione completa

AI Dashboard	Planned	Osservabilità	KPI predittivi

Confidence Scoring	Planned	Supporto alla fiducia	Calibrazione dinamica



Architectural Traceability Matrix (ATM)



EMA	SAPM	Repository	OpenProject

AI Governance	Trustworthy AI Framework	functions/ai/, prompts/, evaluations/	Epic “AI Governance”

Qualità del servizio	AI Evaluation Framework	Suite di test AI	Feature “AI Quality Assurance”

Gestione dei rischi	Guardrails Architecture	Middleware AI	Epic “AI Risk Management”

Miglioramento continuo	AI Observability	Logging e metriche	Capability “AI Continuous Improvement”



PARTE III

TECHNOLOGY ARCHITECTURE

CAPITOLO 33

TA-07 — Enterprise Integration \& API Architecture

Integration Technology Assessment

\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_

33.1 Vision

L’Enterprise Integration Architecture definisce il modello attraverso cui i componenti dell’ecosistema SportelloScuola 2.0 comunicano tra loro e con i sistemi esterni.

L’obiettivo non consiste esclusivamente nello scambio di dati, bensì nella costruzione di un’infrastruttura di interoperabilità capace di garantire affidabilità, sicurezza, osservabilità e indipendenza dalle singole implementazioni.

Le integrazioni costituiscono un asset architetturale strategico e sono progettate secondo principi di modularità, disaccoppiamento e riutilizzo.

\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_

33.2 Principi architetturali

API First

Ogni nuova capability dovrà essere progettata come servizio interoperabile.

\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_

Loose Coupling

I componenti dovranno minimizzare le dipendenze reciproche.

\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_

Event Driven

Quando appropriato, la comunicazione sarà basata su eventi anziché su chiamate sincrone.

\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_

Contract First

Ogni API sarà descritta mediante un contratto formale (es. OpenAPI).

\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_

Secure by Design

Le integrazioni adotteranno autenticazione, autorizzazione e cifratura come requisiti di base.

\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_

Observability First

Ogni chiamata dovrà essere tracciabile.

\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_

33.3 Integration Landscape

L’ecosistema prevede differenti categorie di integrazione.

Internal Services

●	Frontend

●	Edge Functions

●	Database

●	Storage

●	AI Gateway

\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_

External SaaS

●	Provider AI

●	Servizi email

●	Monitoraggio

●	Analytics

\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_

Public Administration Services

L’architettura è predisposta per future integrazioni con servizi pubblici nazionali, mantenendo l’accoppiamento il più possibile ridotto.

\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_

Future Enterprise Systems

●	ERP

●	CRM

●	LMS

●	sistemi documentali

●	sistemi di protocollo

\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_

33.4 API Strategy

Le API saranno classificate in quattro categorie.

Public API

Esposte verso soggetti esterni autorizzati.

\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_

Internal API

Utilizzate esclusivamente dai moduli dell’ecosistema.

\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_

AI API

Destinate all’interazione con i servizi di Intelligenza Artificiale.

\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_

Administrative API

Destinate alle funzioni di governo della piattaforma.

\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_

33.5 API Design Standards

Ogni API dovrà rispettare criteri uniformi.

URI coerenti

Versionamento esplicito.

\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_

HTTP Semantics

Utilizzo corretto dei metodi HTTP.

\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_

Error Handling

Codici standardizzati.

Messaggi strutturati.

\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_

Pagination

Per collezioni di grandi dimensioni.

\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_

Filtering

Supporto a interrogazioni efficienti.

\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_

Documentation

Ogni endpoint dovrà essere documentato automaticamente.

\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_

33.6 Integration Patterns

L’architettura utilizza differenti modelli di integrazione.

Request / Response

Per operazioni sincrone.

\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_

Webhook

Per notifiche asincrone.

\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_

Scheduled Jobs

Per attività pianificate.

Estensione architetturale: il progetto prevede l’adozione di un servizio di scheduling affidabile (ad esempio Supabase Cron oppure servizi analoghi come GitHub Actions per workflow tecnici o trigger serverless pianificati) per attività quali sincronizzazione documentale, aggiornamento degli embeddings, manutenzione e verifiche periodiche. Lo scheduler è considerato un componente infrastrutturale e non una logica applicativa.

\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_

Event Processing

Per workflow distribuiti.

\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_

AI Orchestration

Per pipeline RAG.

\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_

33.7 Enterprise API Gateway

L’architettura introduce un API Gateway logico.

Le principali responsabilità comprendono:

●	autenticazione;

●	autorizzazione;

●	rate limiting;

●	logging;

●	caching;

●	osservabilità;

●	routing;

●	gestione versioni.

Nota evolutiva: nella fase iniziale queste funzioni potranno essere implementate direttamente tramite Edge Functions e configurazioni di Supabase/Netlify. Con l’aumentare della complessità, sarà possibile introdurre un gateway dedicato (ad esempio basato su Kong, Traefik, Envoy o servizi cloud equivalenti) senza modificare il dominio applicativo.

\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_

33.8 Resilience Architecture

Le integrazioni implementeranno meccanismi di resilienza.

Tra essi:

●	timeout;

●	retry con backoff esponenziale;

●	circuit breaker;

●	fallback;

●	cache;

●	gestione delle code.

L’obiettivo è evitare che il malfunzionamento di un servizio esterno comprometta l’intero ecosistema.

\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_

33.9 Secrets Management

Le credenziali saranno gestite esclusivamente tramite sistemi sicuri.

Sono vietati:

●	token nel codice;

●	password nei repository;

●	configurazioni hardcoded.

Le chiavi saranno archiviate nei servizi di gestione dei segreti dell’infrastruttura e utilizzate tramite variabili d’ambiente.

Stato attuale: Netlify e Supabase offrono già una gestione sicura delle variabili d’ambiente.

&#x20;Evoluzione prevista: in caso di crescita dell’ecosistema o di distribuzione multi-cloud, potrà essere introdotto un Secret Manager dedicato (ad esempio HashiCorp Vault o servizi equivalenti), mantenendo invariata l’interfaccia applicativa.

\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_

33.10 Integration Quality Attributes

La qualità delle integrazioni sarà monitorata attraverso:

●	disponibilità;

●	latenza;

●	throughput;

●	tasso di errore;

●	successo dei webhook;

●	successo dei cron job;

●	consumo API;

●	tempi di risposta AI;

●	errori di autenticazione;

●	qualità della documentazione.

\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_

33.11 Technology Assessment delle integrazioni



Tecnologia	Stato	Motivazione

REST	Mandatory	Standard consolidato

Webhook	Preferred	Eventi asincroni

OpenAPI	Mandatory	Contratti API

JSON	Mandatory	Interoperabilità

HTTPS	Mandatory	Sicurezza

Scheduler (Supabase Cron o equivalente)	Preferred	Automazione delle attività periodiche

Queue/Event Bus	Planned	Workflow distribuiti futuri

API Gateway dedicato	Planned	Evoluzione enterprise



33.12 Architecture Decision

ADR-INT-001 — API First Integration Platform

L’ecosistema adotta una strategia API First, nella quale tutte le funzionalità esposte verso altri componenti o sistemi esterni vengono progettate come servizi documentati, osservabili e governati.

Le integrazioni saranno progettate in modo da consentire la sostituzione dei provider esterni con impatti minimi sull’architettura complessiva.

\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_

Enterprise Integration Matrix



Dominio	Tecnologia attuale	Evoluzione prevista

Backend	Supabase API	Consolidamento

AI	AI Gateway	Multi-provider

Email	Resend	Astrazione del provider

Scheduler	Supabase Cron	Orchestrazione avanzata

Deployment	Netlify	Multi-environment

Repository	GitHub	CI/CD avanzata

Eventi	Webhook	Event Bus dedicato

API	REST/OpenAPI	API Management



Architectural Traceability Matrix (ATM)



EMA	SAPM	Repository	OpenProject

Interoperabilità	Enterprise Integration Architecture	supabase/functions/, api/, configurazioni Netlify	Epic “Integration Platform”

Automazione	Scheduler e Webhook	Cron, Edge Functions	Feature “Workflow Automation”

Comunicazione esterna	API Gateway	Endpoint documentati	Epic “External Integrations”

Evoluzione tecnologica	API First	Contratti OpenAPI	Capability “Enterprise Integration”



PARTE IV

PLATFORM ENGINEERING, DEVSECOPS \& OPERATIONAL EXCELLENCE

CAPITOLO 34

PE-01 — Platform Engineering Strategy

Internal Developer Platform (IDP)

\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_

34.1 Vision

La Platform Engineering Strategy definisce l’insieme dei servizi, degli strumenti e delle pratiche che consentono di progettare, sviluppare, distribuire, monitorare ed evolvere SportelloScuola 2.0 in modo controllato e sostenibile.

L’obiettivo non consiste semplicemente nell’automatizzare il rilascio del software, ma nel costruire una Internal Developer Platform (IDP) che permetta agli sviluppatori di concentrarsi sulla realizzazione delle funzionalità applicative, delegando alla piattaforma la gestione delle attività operative ricorrenti.

La piattaforma costituisce quindi un livello architetturale autonomo, responsabile della standardizzazione dei processi di sviluppo e di esercizio.

\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_

34.2 Principi architetturali

Platform as a Product

La piattaforma di sviluppo è trattata come un prodotto interno, con utenti (gli sviluppatori), roadmap, metriche e miglioramento continuo.

\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_

Everything as Code

Configurazioni, infrastruttura, pipeline e policy devono essere definite mediante codice versionato.

\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_

Automation First

Le attività ripetitive devono essere automatizzate ogni volta che ciò riduce il rischio di errore e il tempo di esecuzione.

\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_

Self-Service

Le funzionalità della piattaforma devono essere facilmente accessibili senza interventi manuali.

\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_

Secure by Default

Le configurazioni devono essere sicure fin dalla loro definizione iniziale.

\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_

Observability Built-In

Ogni componente della piattaforma deve produrre metriche, log e informazioni diagnostiche.

\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_

34.3 Platform Reference Model

La piattaforma viene suddivisa nei seguenti livelli.

Development Layer

●	Visual Studio Code

●	Git

●	TypeScript

●	Node.js

●	strumenti di qualità del codice

\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_

Source Control Layer

●	GitHub Repository

●	Branch Protection

●	Pull Request

●	Code Review

\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_

Build Layer

●	Vite

●	Build Automation

●	Dependency Management

\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_

Deployment Layer

●	Netlify

●	Supabase

●	Edge Functions

\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_

Runtime Layer

●	Frontend

●	Backend

●	AI Platform

●	Database

\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_

Operations Layer

●	Monitoring

●	Logging

●	Backup

●	Incident Management

\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_

34.4 Platform Capabilities

La piattaforma deve fornire le seguenti capacità.

Repository Management

Gestione centralizzata del codice.

\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_

Build Automation

Generazione automatica degli artefatti.

\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_

Continuous Integration

Verifica automatica della qualità del software.

\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_

Continuous Deployment

Distribuzione automatizzata negli ambienti previsti.

\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_

Secret Management

Protezione delle credenziali.

\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_

Environment Management

Gestione degli ambienti di esecuzione.

\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_

Observability

Raccolta di metriche operative.

\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_

AI Operations

Monitoraggio delle funzionalità AI.

\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_

34.5 Enterprise Toolchain Assessment

GitHub

Ruolo

Sistema di controllo versione e collaborazione.

Benefici

●	tracciabilità;

●	code review;

●	integrazione CI/CD;

●	issue management;

●	sicurezza.

Decisione

Mandatory Platform Component.

\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_

Netlify

Ruolo

Piattaforma di hosting e deployment del frontend.

Benefici

●	distribuzione automatica;

●	CDN globale;

●	HTTPS integrato;

●	preview deploy;

●	semplicità operativa.

Decisione

Preferred Hosting Platform.

\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_

Supabase

Ruolo

Backend Platform.

Decisione

Enterprise Data Platform.

\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_

Resend

Ruolo

Servizi email transazionali.

Valutazione

Ottima soluzione per:

●	notifiche;

●	autenticazione;

●	comunicazioni automatiche.

Evoluzione

L’accesso dovrà essere mediato da un Email Service Adapter, in modo da poter sostituire il provider senza modificare il dominio applicativo.

\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_

34.6 Platform Maturity Model



Livello	Stato

Manual Deployment	✔ superato

Basic CI/CD	✔ attuale

Platform Automation	In realizzazione

Self-Service Platform	Pianificata

Internal Developer Platform	Obiettivo finale



34.7 Enterprise Platform Roadmap

Fase 1

Consolidamento dello stack esistente.

\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_

Fase 2

Automazione della qualità del codice.

\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_

Fase 3

Osservabilità completa.

\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_

Fase 4

Self-Service Developer Platform.

\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_

Fase 5

Operational Excellence.

\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_

34.8 Architecture Decision

ADR-PE-001 — Internal Developer Platform

SportelloScuola 2.0 adotta una strategia di Platform Engineering orientata alla costruzione progressiva di una Internal Developer Platform.

L’obiettivo è ridurre la complessità operativa attraverso standardizzazione, automazione e riutilizzo, mantenendo un equilibrio tra maturità enterprise e semplicità di gestione.

\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_

Enterprise Platform Matrix



Componente	Stato	Evoluzione

GitHub	Mandatory	Consolidamento

Netlify	Preferred	Multi-environment

Supabase	Mandatory	Platform Backbone

Resend	Preferred	Adapter Pattern

Git	Mandatory	Workflow GitFlow semplificato

VS Code	Recommended	Dev Containers (valutazione futura)

Node.js	Mandatory	Aggiornamento LTS continuo



Raccomandazioni architetturali aggiuntive

Qui introduco alcune proposte che non sono necessarie oggi, ma che ritengo opportuno documentare nel SAPM come possibili evoluzioni:



Componente	Priorità	Motivazione

GitHub Actions	Alta	Automatizzare test, linting, build, verifiche di sicurezza e deploy. È gratuito entro limiti molto generosi ed è la naturale estensione del repository GitHub.

Renovate o Dependabot	Alta	Aggiornamento automatico e controllato delle dipendenze, riducendo vulnerabilità e debito tecnico.

Sentry	Alta	Monitoraggio degli errori lato frontend, backend ed Edge Functions con tracciamento delle eccezioni. Ottimo piano gratuito.

UptimeRobot o Better Stack	Media	Monitoraggio della disponibilità della piattaforma e notifiche in caso di disservizi.

OpenTelemetry	Media	Standard aperto per metriche, log e tracing. Può essere introdotto gradualmente.

Terraform	Bassa (futuro)	Infrastructure as Code. Da valutare solo se l’infrastruttura crescerà sensibilmente.

Temporal o Inngest	Media	Workflow asincroni complessi e affidabili. Da introdurre solo quando i cron job e le Edge Functions non saranno più sufficienti.

Cloudflare	Media	DNS, WAF, caching avanzato e protezione DDoS. Valutabile se il traffico crescerà o aumenteranno i requisiti di sicurezza.



Questa sezione è importante perché non “obbliga” il progetto ad adottare nuovi strumenti, ma crea una roadmap tecnologica coerente con la crescita futura.

\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_

Architectural Traceability Matrix (ATM)



EMA	SAPM	Repository	OpenProject

Piattaforma Digitale	Platform Engineering Strategy	.github/, configurazioni Netlify, Supabase	Epic “Platform Engineering”

Evoluzione tecnologica	Toolchain Enterprise	Workflow GitHub	Feature “Developer Experience”

Governance operativa	IDP	Configurazioni repository	Capability “Operational Platform”

Innovazione continua	Platform Roadmap	ADR e documentazione	Epic “Platform Evolution”



PARTE IV

PLATFORM ENGINEERING, DEVSECOPS \& OPERATIONAL EXCELLENCE

CAPITOLO 35

PE-02 — Environment Strategy \& Lifecycle Management

Enterprise Environment Architecture

\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_

35.1 Vision

L’Environment Strategy definisce il modello di gestione degli ambienti applicativi lungo l’intero ciclo di vita del software.

Ogni ambiente rappresenta un contesto operativo con responsabilità, configurazioni, dati e controlli specifici.

La separazione degli ambienti garantisce qualità, sicurezza e prevedibilità del processo di rilascio.

\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_

35.2 Obiettivi

L’architettura degli ambienti deve garantire:

●	isolamento tra sviluppo e produzione;

●	ripetibilità dei rilasci;

●	sicurezza delle configurazioni;

●	tracciabilità delle modifiche;

●	riduzione del rischio operativo;

●	facilità di rollback;

●	automazione delle distribuzioni.

\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_

35.3 Environment Reference Model

L’ecosistema prevede quattro ambienti principali.

Development

Destinato allo sviluppo quotidiano.

Caratteristiche:

●	modifiche continue;

●	debugging;

●	test locali;

●	dati sintetici;

●	logging dettagliato.

Responsabile:

Developer.

\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_

Test

Ambiente dedicato alla verifica funzionale.

Caratteristiche:

●	test automatici;

●	test di integrazione;

●	validazione delle migration;

●	verifica Edge Functions;

●	simulazione servizi AI.

Responsabile:

QA / Team di sviluppo.

\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_

Staging

Replica della produzione.

Utilizzata per:

●	User Acceptance Test;

●	validazione finale;

●	benchmark;

●	verifiche prestazionali;

●	approvazione del rilascio.

Responsabile:

Release Manager.

\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_

Production

Ambiente operativo.

Caratteristiche:

●	alta disponibilità;

●	monitoraggio continuo;

●	backup;

●	logging controllato;

●	massima sicurezza.

Responsabile:

Platform Owner.

\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_

35.4 Environment Matrix



Componente	Development	Test	Staging	Production

Frontend	✔	✔	✔	✔

Supabase	Istanza dedicata	Istanza dedicata	Replica	Produzione

Database	Test	Validazione	Replica	Produzione

AI	Sandbox	Sandbox	Quota limitata	Provider ufficiali

Email	Mock	Sandbox	Sandbox	Resend

Storage	Locale	Test	Replica	Produzione



35.5 Configuration Management

Le configurazioni saranno completamente separate dal codice.

Ogni ambiente possiederà:

●	variabili dedicate;

●	API Key dedicate;

●	configurazioni AI dedicate;

●	endpoint dedicati;

●	quote dedicate.

È vietata la condivisione di credenziali tra ambienti differenti.

\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_

35.6 Secret Management Strategy

Le credenziali saranno gestite esclusivamente mediante sistemi di Secret Management.

La piattaforma adotterà:

●	variabili ambiente cifrate;

●	accesso con privilegi minimi;

●	rotazione periodica delle chiavi;

●	audit degli accessi.

Le chiavi non saranno mai archiviate nel repository Git.

\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_

35.7 Branching Strategy

Si propone un modello Git semplificato.

main

│

├── develop

│

├── feature/\*

│

├── hotfix/\*

│

└── release/\*



main

Codice stabile.

\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_

develop

Integrazione continua.

\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_

feature

Nuove funzionalità.

\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_

hotfix

Correzioni urgenti.

\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_

release

Preparazione del rilascio.

\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_

Nota evolutiva: considerando che attualmente il progetto è sviluppato principalmente da un singolo sviluppatore, il workflow può essere inizialmente semplificato (main + feature/\*). La struttura completa è comunque documentata per supportare una futura crescita del team senza modificare il modello di governance.

\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_

35.8 Release Lifecycle

Ogni rilascio seguirà il seguente ciclo.

Feature



↓



Pull Request



↓



Code Review



↓



CI



↓



Test



↓



Staging



↓



Acceptance



↓



Production



↓



Monitoring



↓



Retrospective



Questo processo riduce significativamente il rischio di regressioni.

\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_

35.9 Database Migration Strategy

Le migration rappresentano uno degli asset più critici.

Ogni modifica seguirà il processo:

Migration



↓



Review



↓



Test



↓



Backup



↓



Staging



↓



Validation



↓



Production



Le migration saranno:

●	versionate;

●	reversibili quando tecnicamente possibile;

●	documentate;

●	collegate agli ADR e ai task di OpenProject.

\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_

35.10 Environment Drift Management

Per evitare differenze non controllate tra ambienti saranno adottati:

●	configurazioni versionate;

●	controlli automatici;

●	verifiche periodiche;

●	audit delle configurazioni.

L’obiettivo è mantenere gli ambienti coerenti nel tempo.

\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_

35.11 Operational Readiness Checklist

Prima di ogni rilascio in produzione dovranno essere verificati almeno i seguenti elementi.

Applicazione

●	Build completata.

●	Test superati.

●	Nessun errore critico.

\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_

Database

●	Migration validate.

●	Backup disponibile.

●	Rollback documentato.

\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_

Sicurezza

●	Segreti aggiornati.

●	Vulnerabilità critiche assenti.

●	Policy RLS verificate.

\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_

AI

●	Prompt validati.

●	Benchmark aggiornati.

●	Budget disponibile.

\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_

Operatività

●	Dashboard funzionanti.

●	Alert configurati.

●	Piano di rollback disponibile.

\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_

35.12 Architecture Decision

ADR-ENV-001 — Enterprise Environment Lifecycle

SportelloScuola 2.0 adotta un modello di gestione degli ambienti basato sulla separazione funzionale tra Development, Test, Staging e Production.

Ogni ambiente possiede configurazioni, dati e credenziali dedicate, garantendo qualità, sicurezza e prevedibilità del ciclo di rilascio.

\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_

Enterprise Environment Matrix



Dominio	Stato attuale	Evoluzione prevista

Development	Completo	Consolidamento

Test	Parziale	Ambiente dedicato

Staging	Da introdurre	Replica della produzione

Production	Operativo	Hardening continuo

Configuration Management	Buono	Centralizzazione

Secret Management	Buono	Rotazione automatica delle chiavi



Architectural Traceability Matrix (ATM)



EMA	SAPM	Repository	OpenProject

Ciclo di vita del software	Environment Strategy	.env, configurazioni Netlify e Supabase	Epic “Release Management”

Qualità	Release Lifecycle	Workflow GitHub	Feature “Continuous Delivery”

Gestione dati	Database Migration Strategy	supabase/migrations/	Epic “Database Governance”

Sicurezza	Secret Management	Variabili ambiente	Capability “Secure Operations”



PARTE IV

PLATFORM ENGINEERING, DEVSECOPS \& OPERATIONAL EXCELLENCE

CAPITOLO 36

PE-03 — Continuous Integration, Continuous Delivery \& Quality Gates

Enterprise Delivery Pipeline

\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_

36.1 Vision

La Continuous Integration e la Continuous Delivery costituiscono il meccanismo attraverso il quale ogni modifica apportata al software viene verificata, validata e distribuita in modo controllato.

L’obiettivo della pipeline non consiste nell’automatizzare il rilascio, bensì nel garantire che soltanto modifiche conformi agli standard architetturali, qualitativi e di sicurezza possano raggiungere gli ambienti operativi.

La pipeline rappresenta pertanto un sistema di governance della qualità.

\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_

36.2 Principi architetturali

Quality First

La qualità viene verificata automaticamente.

\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_

Shift Left

I problemi devono essere individuati il prima possibile.

\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_

Automation by Default

Le verifiche ripetitive devono essere automatizzate.

\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_

Fail Fast

La pipeline interrompe immediatamente l’esecuzione in presenza di errori critici.

\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_

Reproducibility

Ogni build deve essere riproducibile.

\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_

Traceability

Ogni rilascio deve poter essere ricostruito.

\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_

36.3 Enterprise Pipeline Reference Model

La pipeline viene organizzata nei seguenti livelli.

Developer



↓



Commit



↓



Pull Request



↓



Static Analysis



↓



Unit Tests



↓



Integration Tests



↓



Security Scan



↓



AI Validation



↓



Build



↓



Staging



↓



Acceptance



↓



Production



↓



Monitoring



Ogni fase costituisce un Quality Gate.

\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_

36.4 Continuous Integration

La CI verifica automaticamente ogni modifica del repository.

Le principali attività comprendono:

●	installazione dipendenze;

●	compilazione;

●	linting;

●	formattazione;

●	controlli TypeScript;

●	verifica build;

●	verifica delle migration;

●	verifica Edge Functions.

\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_

36.5 Static Code Analysis

Ogni commit viene sottoposto ad analisi statica.

Le verifiche comprendono:

●	errori sintattici;

●	code smell;

●	complessità eccessiva;

●	duplicazioni;

●	dipendenze inutilizzate;

●	import non utilizzati;

●	convenzioni di naming.

\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_

36.6 Automated Testing Strategy

La pipeline distingue differenti categorie di test.

Unit Test

Verifica dei singoli moduli.

\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_

Integration Test

Verifica dell’interazione tra componenti.

\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_

End-to-End Test

Simulazione del comportamento dell’utente.

\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_

API Test

Validazione degli endpoint.

\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_

Database Test

Controllo delle migration.

\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_

Edge Function Test

Verifica delle funzioni serverless.

\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_

AI Regression Test

Controllo dei prompt.

Verifica del comportamento del RAG.

Benchmark delle risposte.

\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_

36.7 Security Gates

Prima del rilascio vengono eseguiti controlli automatici.

Tra essi:

●	vulnerabilità dipendenze;

●	segreti accidentalmente presenti nel repository;

●	configurazioni insicure;

●	licenze software;

●	analisi SAST.

Le vulnerabilità critiche bloccano automaticamente il rilascio.

\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_

36.8 Documentation Gates

La documentazione viene trattata come parte integrante del software.

La pipeline verifica:

●	aggiornamento degli ADR;

●	coerenza del SAPM;

●	modifica della documentazione API;

●	versionamento OpenAPI;

●	collegamento con OpenProject.

In questo modo architettura, documentazione e codice evolvono congiuntamente.

\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_

36.9 AI Quality Gates

L’Intelligenza Artificiale introduce controlli aggiuntivi.

Tra essi:

Prompt Validation

Controllo sintattico.

\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_

Prompt Regression

Confronto con benchmark precedenti.

\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_

RAG Evaluation

Verifica del retrieval.

\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_

Hallucination Detection

Analisi delle risposte.

\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_

Cost Validation

Controllo dei consumi previsti.

\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_

Provider Availability

Verifica dello stato dei provider.

\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_

36.10 Deployment Strategy

La distribuzione segue un modello progressivo.

Development



↓



Test



↓



Staging



↓



Production



Ogni promozione richiede il superamento dei Quality Gate.

\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_

36.11 Rollback Strategy

Ogni rilascio deve prevedere:

●	versione precedente disponibile;

●	backup database;

●	rollback applicativo;

●	rollback migration (quando possibile);

●	ripristino configurazioni;

●	verifica post-ripristino.

\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_

36.12 Enterprise Quality Gates



Gate	Obbligatorio

Build riuscita	✔

Lint	✔

Type Checking	✔

Test unitari	✔

Test integrazione	✔

Vulnerability Scan	✔

Secret Scan	✔

Migration Validation	✔

Edge Function Validation	✔

Prompt Validation	✔

AI Benchmark	✔

Documentazione aggiornata	✔



36.13 Toolchain Assessment



Strumento	Stato	Motivazione

GitHub Actions	Mandatory	Motore della pipeline CI/CD, integrato con il repository e sufficiente per le esigenze attuali.

ESLint	Mandatory	Analisi statica del codice.

Prettier	Mandatory	Uniformità della formattazione.

Vitest	Preferred	Test unitari e di integrazione per l’ecosistema Vite.

Playwright	Preferred	Test end-to-end automatizzati.

Dependabot	Mandatory	Aggiornamento e sicurezza delle dipendenze.

CodeQL	Preferred	Analisi automatica delle vulnerabilità del codice.

Renovate	Planned	Gestione avanzata degli aggiornamenti, valutabile come alternativa o complemento a Dependabot.

SonarQube Cloud	Future	Analisi avanzata della qualità del codice, da introdurre se la complessità del progetto crescerà.



36.14 Architecture Decision

ADR-CICD-001 — Quality Gates Before Delivery

Ogni modifica al software deve attraversare una pipeline automatizzata composta da controlli di qualità, sicurezza, test e conformità architetturale.

Il deployment rappresenta l’ultima fase del processo e non può avvenire senza il superamento di tutti i Quality Gate obbligatori.

\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_

Enterprise Delivery Maturity Model



Livello	Stato

Manual Build	✔ Superato

Automated Build	✔ Attuale

Continuous Integration	✔ In consolidamento

Continuous Delivery	Pianificata

Continuous Verification	Pianificata

Continuous Quality Governance	Obiettivo architetturale



Architectural Traceability Matrix (ATM)



EMA	SAPM	Repository	OpenProject

Qualità del software	CI/CD Pipeline	.github/workflows/	Epic “Continuous Delivery”

Sicurezza	Security Gates	Workflow GitHub e strumenti SAST	Feature “Secure Pipeline”

AI Governance	AI Quality Gates	Test dei prompt e benchmark	Epic “AI Quality”

Evoluzione controllata	Quality Governance	ADR, OpenAPI, documentazione	Capability “Engineering Excellence”



PARTE IV

PLATFORM ENGINEERING, DEVSECOPS \& OPERATIONAL EXCELLENCE

CAPITOLO 37

PE-04 — DevSecOps \& Secure Software Supply Chain

Secure Software Engineering Framework

\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_

37.1 Vision

La strategia DevSecOps integra la sicurezza all’interno dell’intero ciclo di vita del software, trasformandola da attività successiva allo sviluppo in una caratteristica intrinseca della piattaforma.

Ogni modifica al codice, alle dipendenze, alle configurazioni e alle pipeline viene sottoposta a controlli automatici finalizzati a prevenire vulnerabilità, ridurre il rischio operativo e garantire la conformità agli standard architetturali.

La sicurezza costituisce pertanto un attributo strutturale della piattaforma e non un requisito aggiuntivo.

\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_

37.2 Principi architetturali

Secure by Design

La sicurezza viene progettata sin dall’inizio.

\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_

Least Privilege

Ogni componente opera con i privilegi minimi necessari.

\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_

Zero Trust

Ogni comunicazione viene verificata indipendentemente dalla posizione del componente.

\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_

Continuous Verification

La sicurezza viene verificata continuamente.

\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_

Defense in Depth

Più livelli di protezione cooperano nella mitigazione dei rischi.

\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_

Supply Chain Integrity

Ogni componente software deve poter essere verificato e tracciato.

\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_

37.3 Secure Development Lifecycle

Il ciclo di vita della sicurezza comprende:

Requirements



↓



Threat Modeling



↓



Development



↓



Code Review



↓



Static Analysis



↓



Dependency Scan



↓



Secret Scan



↓



Build Verification



↓



Deployment Validation



↓



Runtime Monitoring



La sicurezza accompagna ogni fase del ciclo di sviluppo.

\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_

37.4 Threat Modeling Strategy

Per ogni nuova funzionalità dovrà essere effettuata una valutazione preliminare delle minacce.

Le principali categorie comprendono:

●	spoofing;

●	tampering;

●	repudiation;

●	information disclosure;

●	denial of service;

●	privilege escalation.

Le contromisure saranno documentate negli Architecture Decision Records (ADR).

\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_

37.5 Secure Source Code Management

Il repository GitHub rappresenta il punto di ingresso della Software Supply Chain.

Saranno adottate le seguenti misure:

●	Branch Protection;

●	Pull Request obbligatorie;

●	Code Review;

●	firma dei commit (quando applicabile);

●	protezione del branch principale;

●	controlli automatici della pipeline.

\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_

37.6 Dependency Security

Le dipendenze costituiscono uno dei principali vettori di rischio.

La piattaforma adotterà:

●	aggiornamenti automatici controllati;

●	scansione CVE;

●	verifica delle licenze;

●	monitoraggio delle versioni obsolete;

●	gestione del rischio delle dipendenze transitive.

Stato attuale: Dependabot è sufficiente per il progetto e deve essere considerato componente standard della pipeline. Renovate potrà essere valutato solo qualora emerga l’esigenza di una gestione più granulare degli aggiornamenti.

\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_

37.7 Secret Management

Le credenziali saranno gestite esclusivamente tramite sistemi dedicati.

Sono vietati:

●	token nel repository;

●	password nel codice;

●	chiavi API in file di configurazione versionati.

Le variabili saranno archiviate nei Secret Manager offerti da GitHub, Netlify e Supabase.

\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_

37.8 Secure CI/CD Pipeline

Ogni pipeline dovrà verificare:

●	integrità del codice;

●	autenticità delle dipendenze;

●	vulnerabilità note;

●	esposizione di segreti;

●	conformità delle configurazioni;

●	sicurezza delle Edge Functions;

●	qualità delle migration.

Le pipeline costituiranno il principale punto di controllo della Software Supply Chain.

\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_

37.9 Software Bill of Materials (SBOM)

Per ogni rilascio sarà possibile generare una Software Bill of Materials, contenente:

●	componenti software;

●	versioni;

●	licenze;

●	dipendenze dirette;

●	dipendenze transitive.

L’SBOM facilita la gestione delle vulnerabilità e la conformità normativa.

\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_

37.10 SLSA Maturity

L’architettura adotta come riferimento il framework SLSA, con una crescita progressiva.



Livello	Obiettivo

SLSA 1	Build automatizzate

SLSA 2	Provenienza verificabile degli artefatti

SLSA 3	Pipeline controllate e protette

SLSA 4	Supply Chain completamente verificata (obiettivo di lungo periodo)



Per le dimensioni attuali del progetto, il raggiungimento di un livello assimilabile a SLSA 2 rappresenta un obiettivo realistico e adeguato.

\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_

37.11 Runtime Security

La protezione continua comprende:

●	Row Level Security (RLS) di Supabase;

●	autenticazione JWT;

●	HTTPS obbligatorio;

●	Content Security Policy;

●	protezione CORS;

●	rate limiting;

●	audit log;

●	monitoraggio delle anomalie.

\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_

37.12 Incident Response Readiness

Ogni incidente di sicurezza seguirà un processo strutturato:

1\.	identificazione;

2\.	contenimento;

3\.	analisi;

4\.	mitigazione;

5\.	ripristino;

6\.	revisione post-incidente.

Le lezioni apprese confluiranno negli ADR e nella roadmap di miglioramento.

\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_

37.13 Secure Toolchain Assessment



Strumento	Stato	Motivazione

GitHub Advanced Security (funzionalità gratuite disponibili)	Preferred	Secret scanning, dipendenze e sicurezza del repository.

Dependabot	Mandatory	Gestione automatica delle vulnerabilità.

CodeQL	Preferred	Analisi statica di sicurezza.

OWASP Dependency-Check	Planned	Verifiche aggiuntive sulle librerie.

Trivy	Planned	Analisi di artefatti e configurazioni, utile se il progetto introdurrà container.

SBOM Generator (CycloneDX o SPDX)	Planned	Inventario del software distribuito.



37.14 Architecture Decision

ADR-SEC-001 — Secure Software Supply Chain

L’ecosistema adotta un modello DevSecOps nel quale sicurezza, qualità e conformità vengono integrate lungo l’intero ciclo di vita del software.

Ogni rilascio deve essere verificabile, tracciabile e conforme alle policy di sicurezza definite dall’architettura.

\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_

Enterprise DevSecOps Maturity Matrix



Dominio	Stato attuale	Evoluzione prevista

Code Review	Consolidato	Miglioramento continuo

Dependency Security	Buono	Automazione completa

Secret Management	Buono	Rotazione automatica

Secure Pipeline	In evoluzione	Quality \& Security Gates completi

SBOM	Pianificato	Generazione automatica

Supply Chain Governance	Pianificata	Monitoraggio continuo



Architectural Traceability Matrix (ATM)



EMA	SAPM	Repository	OpenProject

Sicurezza della piattaforma	DevSecOps Framework	.github/, workflow CI/CD, configurazioni Supabase	Epic “Platform Security”

Gestione del rischio	Secure Supply Chain	Dipendenze, SBOM, CodeQL	Feature “Supply Chain Security”

Continuità operativa	Incident Response	Procedure operative	Epic “Security Operations”

Conformità	Secure by Design	ADR e policy	Capability “Secure Engineering”



PARTE IV

PLATFORM ENGINEERING, DEVSECOPS \& OPERATIONAL EXCELLENCE

CAPITOLO 38

PE-05 — Observability, Telemetry \& Site Reliability Engineering (SRE)

Enterprise Operational Intelligence Platform

\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_

38.1 Vision

L’Observability Architecture definisce il modello attraverso cui l’intero ecosistema SportelloScuola 2.0 viene osservato, misurato, analizzato e migliorato durante il proprio esercizio operativo.

L’obiettivo non consiste esclusivamente nell’individuare errori, ma nel comprendere in modo continuo lo stato di salute della piattaforma, anticipare anomalie e supportare decisioni basate su evidenze.

La piattaforma di osservabilità costituisce un’infrastruttura trasversale che integra metriche, log, trace distribuite, eventi applicativi e indicatori di affidabilità.

\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_

38.2 Principi architetturali

Observability by Design

Ogni componente deve produrre informazioni diagnostiche sin dalla progettazione.

\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_

Metrics First

Le decisioni operative devono basarsi su indicatori misurabili.

\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_

End-to-End Visibility

L’intero percorso di una richiesta deve poter essere ricostruito.

\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_

Actionable Alerts

Gli avvisi devono essere significativi e orientati all’azione, evitando rumore operativo.

\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_

Continuous Improvement

Le informazioni raccolte alimentano il miglioramento continuo della piattaforma.

\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_

Unified Telemetry

Metriche, log e trace devono essere correlate tra loro.

\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_

38.3 Enterprise Observability Model

La piattaforma si basa su cinque domini osservabili.

Infrastructure

Disponibilità dei servizi.

\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_

Application

Prestazioni delle applicazioni.

\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_

Database

Prestazioni e salute del patrimonio dati.

\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_

AI Platform

Prestazioni e qualità dei servizi AI.

\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_

Business Services

Esperienza dell’utente e processi amministrativi.

\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_

38.4 The Three Pillars of Observability

Metrics

Indicatori numerici.

Esempi:

●	tempo medio risposta;

●	CPU;

●	memoria;

●	throughput;

●	error rate.

\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_

Logs

Eventi dettagliati.

Comprendono:

●	errori;

●	warning;

●	audit;

●	eventi AI;

●	autenticazioni.

\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_

Distributed Tracing

Ricostruzione completa del percorso di una richiesta.

Permette di identificare rapidamente il punto di degrado.

\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_

38.5 Site Reliability Engineering (SRE)

L’ecosistema adotta progressivamente i principi del Site Reliability Engineering (SRE).

L’obiettivo è bilanciare innovazione e stabilità mediante indicatori quantitativi.

\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_

38.6 Service Level Indicators (SLI)

Gli SLI rappresentano le metriche fondamentali della piattaforma.

Tra essi:

Disponibilità

Percentuale di tempo operativo.

\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_

Latenza

Tempo medio di risposta.

\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_

Throughput

Numero di richieste elaborate.

\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_

Error Rate

Percentuale di errori.

\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_

Success Rate

Operazioni concluse correttamente.

\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_

AI Accuracy

Accuratezza stimata delle risposte.

\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_

Retrieval Quality

Qualità del recupero documentale.

\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_

38.7 Service Level Objectives (SLO)

Gli obiettivi operativi vengono definiti per ogni servizio.



Servizio	SLO iniziale

Frontend	≥ 99,5% disponibilità

Backend API	≥ 99,5%

Database	≥ 99,9%

AI Gateway	≥ 99,0%

Email	≥ 99,0%



Nota metodologica: gli SLO iniziali rappresentano obiettivi progettuali e dovranno essere rivisti sulla base dei dati reali raccolti durante l’esercizio.

38.8 Error Budget

Ogni servizio dispone di un margine di errore accettabile.

Quando il budget viene superato:

●	si sospendono nuove funzionalità non critiche;

●	si privilegiano attività di stabilizzazione;

●	vengono analizzate le cause radice.

Questo principio consente di bilanciare innovazione e affidabilità.

\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_

38.9 AI Observability

L’AI richiede indicatori dedicati.

Saranno monitorati:

●	token consumati;

●	costo medio;

●	provider utilizzato;

●	tempi di inferenza;

●	fallback;

●	accuratezza stimata;

●	hallucination rate (stimato);

●	qualità del retrieval;

●	feedback utenti.

\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_

38.10 FinOps Observability

La piattaforma integra il monitoraggio economico.

Indicatori:

●	costo AI;

●	costo storage;

●	costo database;

●	costo email;

●	costo hosting;

●	costo mensile complessivo.

Questa visione supporta decisioni sostenibili nel lungo periodo.

\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_

38.11 Alerting Strategy

Gli alert vengono classificati secondo differenti livelli.



Livello	Azione

Informational	Registrazione evento

Warning	Verifica operativa

High	Intervento rapido

Critical	Incident Management



L’obiettivo è ridurre l’alert fatigue concentrando l’attenzione sugli eventi realmente significativi.

\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_

38.12 Operational Dashboards

La piattaforma prevede dashboard dedicate a:

●	stato generale della piattaforma;

●	AI Operations;

●	Database Health;

●	Security Operations;

●	Business KPI;

●	Cost Dashboard;

●	Developer Dashboard.

Ogni dashboard presenta indicatori pertinenti al ruolo dell’utilizzatore.

\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_

38.13 Toolchain Assessment



Strumento	Stato	Motivazione

Sentry	Preferred	Monitoraggio degli errori applicativi e delle Edge Functions.

Better Stack	Preferred	Uptime, log centralizzati e incident management con un piano gratuito adeguato.

UptimeRobot	Alternative	Monitoraggio della disponibilità dei servizi.

OpenTelemetry	Planned	Standard aperto per metriche, log e tracing distribuito.

Grafana	Future	Dashboard avanzate, qualora aumenti la complessità della piattaforma.

Prometheus	Future	Raccolta di metriche per scenari infrastrutturali più articolati.



Scelta architetturale: per l’attuale dimensione del progetto è consigliabile iniziare con Sentry e Better Stack. OpenTelemetry, Grafana e Prometheus costituiscono un’evoluzione naturale, ma non sono necessari nella fase iniziale.

\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_

38.14 Architecture Decision

ADR-OBS-001 — Operational Intelligence Platform

L’ecosistema adotta un modello di osservabilità unificata basato sulla raccolta e correlazione di metriche, log, trace ed eventi applicativi.

L’osservabilità costituisce un requisito architetturale permanente e rappresenta il fondamento del miglioramento continuo e della gestione proattiva dei servizi.

\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_

Enterprise Observability Maturity Model



Livello	Stato

Basic Logging	✔ Superato

Centralized Monitoring	In consolidamento

Full Observability	Pianificata

SRE Practices	Introduzione progressiva

Predictive Operations	Obiettivo di lungo periodo



Architectural Traceability Matrix (ATM)



EMA	SAPM	Repository	OpenProject

Continuità operativa	Observability Platform	Logging, configurazioni monitoraggio	Epic “Operational Excellence”

Affidabilità	SRE Framework	Dashboard e metriche	Feature “Service Reliability”

AI Governance	AI Observability	Metriche AI e RAG	Epic “AIOps”

Sostenibilità	FinOps Dashboard	Monitoraggio dei costi	Capability “Operational Governance”



PARTE IV

PLATFORM ENGINEERING, DEVSECOPS \& OPERATIONAL EXCELLENCE

CAPITOLO 39

PE-06 — Business Continuity, Backup \& Disaster Recovery

Enterprise Resilience Architecture

\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_

39.1 Vision

La Business Continuity Strategy definisce l’insieme delle politiche, dei processi e delle tecnologie necessarie per garantire la continuità operativa della piattaforma SportelloScuola 2.0 in presenza di eventi avversi, guasti infrastrutturali, errori umani o incidenti di sicurezza.

L’obiettivo dell’architettura non consiste esclusivamente nel ripristino dei sistemi, ma nella capacità dell’organizzazione di continuare a erogare i servizi essenziali entro tempi e livelli di qualità prestabiliti.

La resilienza viene quindi considerata una proprietà fondamentale della piattaforma.

\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_

39.2 Principi architetturali

Resilience by Design

La continuità operativa viene progettata fin dalle prime fasi dello sviluppo.

\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_

Backup is not Disaster Recovery

Il backup rappresenta uno strumento del Disaster Recovery, ma non lo sostituisce.

\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_

Automation First

Le procedure di ripristino devono essere il più possibile automatizzate.

\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_

Tested Recovery

Ogni procedura deve essere verificata periodicamente.

\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_

Business Driven

Le priorità di ripristino sono determinate dall’impatto sui servizi e sugli utenti.

\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_

Continuous Improvement

Ogni incidente alimenta il miglioramento delle strategie di continuità.

\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_

39.3 Business Impact Analysis (BIA)

La Business Impact Analysis identifica i servizi critici e le relative priorità di ripristino.



Servizio	Criticità	Priorità

Frontend pubblico	Alta	1

Backend API	Alta	1

Database PostgreSQL	Critica	1

Autenticazione	Critica	1

Edge Functions	Alta	2

AI Gateway	Media	2

Servizi Email	Media	3

Dashboard amministrative	Media	3

Analytics	Bassa	4



39.4 Recovery Objectives

Recovery Time Objective (RTO)

Tempo massimo entro cui il servizio deve essere ripristinato.

Obiettivo iniziale



Servizio	RTO

Frontend	1 ora

Backend	2 ore

Database	2 ore

AI Platform	4 ore

Email	8 ore



Recovery Point Objective (RPO)

Massima perdita di dati accettabile.



Servizio	RPO

Database	≤ 15 minuti

Storage	≤ 1 ora

Configurazioni	0 (versionate)

Codice sorgente	0 (Git)



Nota metodologica: questi valori costituiscono obiettivi progettuali iniziali e potranno essere affinati sulla base dei livelli di servizio effettivamente raggiunti dall’infrastruttura.

39.5 Backup Strategy

La piattaforma prevede differenti categorie di backup.

Database

Backup automatici.

Backup manuali prima delle migration.

\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_

Storage

Snapshot periodici.

\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_

Repository

Replica continua tramite GitHub.

\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_

Configurazioni

Versionamento tramite Git.

\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_

Secrets

Archiviazione sicura nei servizi dedicati.

\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_

Documentazione

Repository dedicato.

Versionamento continuo.

\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_

39.6 Disaster Recovery Strategy

Il Disaster Recovery comprende le seguenti fasi.

1\.	Rilevazione dell’incidente.

2\.	Valutazione dell’impatto.

3\.	Attivazione del piano.

4\.	Ripristino dei servizi critici.

5\.	Verifica dell’integrità.

6\.	Ripresa operativa.

7\.	Post-Incident Review.

\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_

39.7 Recovery Priority Matrix

1️⃣ Database



↓



2️⃣ Backend API



↓



3️⃣ Authentication



↓



4️⃣ Frontend



↓



5️⃣ Edge Functions



↓



6️⃣ AI Platform



↓



7️⃣ Email



↓



8️⃣ Analytics



L’ordine di ripristino è determinato dalla dipendenza funzionale tra i servizi.

\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_

39.8 Infrastructure Recovery

Per ciascun componente dovranno essere documentate le procedure di ripristino.

GitHub

Ripristino del repository.

Verifica della cronologia.

\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_

Netlify

Ripubblicazione automatica.

Verifica del dominio.

\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_

Supabase

Ripristino database.

Verifica RLS.

Ripristino Storage.

Verifica Edge Functions.

\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_

AI

Verifica provider.

Verifica prompt.

Verifica embeddings.

\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_

Email

Verifica Resend.

Verifica DNS.

Verifica SPF, DKIM e DMARC.

\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_

39.9 Backup Verification

Un backup non verificato non può essere considerato affidabile.

La piattaforma prevede:

●	test periodici di ripristino;

●	verifica dell’integrità;

●	controllo delle versioni;

●	simulazioni di Disaster Recovery.

\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_

39.10 Business Continuity Testing

Il piano di continuità sarà sottoposto a esercitazioni periodiche.

Le simulazioni comprenderanno:

●	indisponibilità del database;

●	indisponibilità dei provider AI;

●	perdita delle configurazioni;

●	errore nelle migration;

●	compromissione delle credenziali;

●	indisponibilità del frontend.

\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_

39.11 Operational Documentation

Ogni procedura sarà documentata.

Tra esse:

●	Runbook;

●	Playbook;

●	Checklist;

●	Incident Report;

●	Disaster Recovery Plan;

●	Business Continuity Plan.

Questa documentazione costituirà parte integrante del patrimonio architetturale.

\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_

39.12 Toolchain Assessment



Strumento	Stato	Motivazione

Backup automatici Supabase	Mandatory	Protezione del database e ripristino rapido.

GitHub	Mandatory	Versionamento e recupero del codice.

Netlify Deploy History	Preferred	Ripristino rapido del frontend.

Better Stack Status Page	Planned	Comunicazione trasparente durante gli incidenti.

Cloudflare DNS (eventuale)	Future	Ridondanza e continuità del servizio DNS.



39.13 Architecture Decision

ADR-BCDR-001 — Business Continuity by Design

SportelloScuola 2.0 adotta un modello di continuità operativa nel quale backup, Disaster Recovery e Business Continuity costituiscono processi integrati e continuamente verificati.

Ogni componente della piattaforma deve poter essere ripristinato mediante procedure documentate, testate e versionate.

\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_

Enterprise Resilience Maturity Model



Livello	Stato

Backup Manuali	✔ Superato

Backup Automatizzati	✔ Attuale

Disaster Recovery Documentato	In consolidamento

Business Continuity Testing	Pianificato

Continuous Resilience	Obiettivo di lungo periodo



Architectural Traceability Matrix (ATM)



EMA	SAPM	Repository	OpenProject

Continuità del servizio	Business Continuity	Runbook, procedure operative	Epic “Business Continuity”

Gestione del rischio	Disaster Recovery	Configurazioni Supabase e Netlify	Feature “Recovery Management”

Patrimonio informativo	Backup Strategy	Database, Storage, Git	Epic “Platform Resilience”

Governance operativa	Recovery Testing	Procedure documentate	Capability “Operational Resilience”



PARTE IV

PLATFORM ENGINEERING, DEVSECOPS \& OPERATIONAL EXCELLENCE

CAPITOLO 40

PE-07 — Operational Governance \& Lightweight IT Service Management

Pragmatic Service Governance Framework

\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_

40.1 Vision

L’Operational Governance definisce il modello organizzativo attraverso il quale SportelloScuola 2.0 viene gestito durante il proprio esercizio operativo.

L’obiettivo non consiste nell’introdurre processi burocratici, bensì nel garantire che le attività operative siano ripetibili, tracciabili e sostenibili anche con un team di sviluppo ridotto.

Il modello proposto si ispira ai principi di ITIL 4, ma ne adotta una versione semplificata e proporzionata alle dimensioni della piattaforma.

\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_

40.2 Principi architetturali

Lightweight Governance

I processi devono essere semplici da applicare e non rallentare lo sviluppo.

\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_

Automation Where Possible

Le attività ripetitive devono essere automatizzate quando ciò riduce il rischio operativo.

\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_

Documentation by Design

Le decisioni operative devono essere documentate nel momento in cui vengono prese.

\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_

Single Source of Truth

Repository GitHub, OpenProject, EMA e SAPM costituiscono l’unica fonte ufficiale della documentazione progettuale.

\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_

Continuous Learning

Ogni incidente o modifica rappresenta un’opportunità di miglioramento della piattaforma.

\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_

40.3 Service Catalog

La piattaforma viene organizzata come insieme di servizi.



Servizio	Responsabilità

Frontend Web	Interfaccia utente

Backend API	Logica applicativa

Database	Persistenza dei dati

Storage	Gestione documenti

AI Platform	Funzionalità intelligenti

Email Service	Comunicazioni automatiche

Authentication	Gestione utenti

Monitoring	Osservabilità della piattaforma



Il catalogo ha finalità documentale e organizzativa; non introduce ulteriori livelli tecnologici.

\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_

40.4 Incident Management

Un incidente è qualsiasi evento che riduca o interrompa la qualità del servizio.

Gli incidenti vengono classificati in quattro livelli.



Livello	Descrizione	Esempio

P1	Critico	Database non disponibile

P2	Alto	Login non funzionante

P3	Medio	Errore in una funzione AI

P4	Basso	Problema grafico non bloccante



Per ogni incidente saranno registrati:

●	data e ora;

●	descrizione;

●	impatto;

●	causa;

●	soluzione adottata;

●	eventuali azioni preventive.

Questa registrazione potrà essere effettuata direttamente in OpenProject, evitando strumenti dedicati.

\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_

40.5 Problem Management

Quando uno stesso incidente si ripete più volte, viene aperto un Problem.

L’obiettivo non è correggere il sintomo, ma eliminare la causa radice.

Ogni Problem sarà collegato agli Incident correlati e, se necessario, a un ADR.

\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_

40.6 Change Management

Ogni modifica significativa dovrà seguire un processo leggero.

1\.	descrizione della modifica;

2\.	analisi dell’impatto;

3\.	eventuale ADR;

4\.	implementazione;

5\.	test;

6\.	rilascio;

7\.	verifica post-rilascio.

Le modifiche minori (bug fix, refactoring limitati) seguiranno un processo semplificato.

\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_

40.7 Release Management

Ogni release dovrà essere identificata mediante:

●	numero di versione;

●	data;

●	changelog;

●	collegamento ai task di OpenProject;

●	collegamento agli ADR rilevanti.

Le release saranno gestite tramite GitHub Releases, evitando strumenti aggiuntivi.

\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_

40.8 Configuration Management

Per un progetto di queste dimensioni non è necessaria una CMDB completa.

Sarà sufficiente mantenere una Configuration Register, contenente:

●	ambienti;

●	servizi;

●	domini;

●	provider esterni;

●	principali variabili di configurazione;

●	dipendenze critiche.

Questa scelta riduce notevolmente la complessità mantenendo comunque la tracciabilità.

\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_

40.9 Service Review

Con cadenza periodica (ad esempio mensile o al termine di una milestone) verrà effettuata una revisione della piattaforma.

Gli elementi analizzati comprenderanno:

●	disponibilità dei servizi;

●	incidenti;

●	vulnerabilità aperte;

●	costi cloud;

●	qualità delle risposte AI;

●	stato della roadmap;

●	debito tecnico.

L’obiettivo è individuare tempestivamente le aree di miglioramento.

\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_

40.10 Operational KPI



KPI	Obiettivo iniziale

Incidenti P1	0

Tempo medio di risoluzione (MTTR)	< 4 ore

Disponibilità della piattaforma	≥ 99,5%

Deployment riusciti	> 95%

Vulnerabilità critiche aperte	0

Task completati entro la milestone	≥ 90%



Questi indicatori sono volutamente pochi e facilmente misurabili.

\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_

40.11 Toolchain Assessment



Strumento	Ruolo

GitHub	Repository, Release e Changelog

OpenProject	Incident, Problem, Task e Roadmap

Supabase	Audit tecnico e log applicativi

Better Stack (opzionale)	Monitoraggio e notifiche

SAPM	Governance tecnica

EMA	Governance architetturale



Non vengono introdotti strumenti ITSM dedicati (ad esempio Jira Service Management o ServiceNow), poiché non proporzionati alle esigenze attuali.

\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_

40.12 Architecture Decision

ADR-GOV-001 — Pragmatic Operational Governance

SportelloScuola 2.0 adotta un modello di governance operativa leggero, fondato sull’integrazione tra GitHub, OpenProject, EMA e SAPM.

L’obiettivo è garantire controllo e tracciabilità senza aumentare inutilmente la complessità gestionale.

\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_

Enterprise Governance Maturity Model



Livello	Stato

Gestione ad hoc	✔ Superata

Processi documentati	✔ In consolidamento

Governance integrata	Pianificata

Miglioramento continuo	Obiettivo

Operational Excellence	Visione di lungo periodo



Architectural Traceability Matrix (ATM)



EMA	SAPM	Repository	OpenProject

Governance della piattaforma	Operational Governance	ADR, GitHub Releases	Epic “Platform Governance”

Evoluzione controllata	Change Management	Pull Request e versioni	Feature “Change Control”

Continuità operativa	Incident \& Problem Management	Log e issue	Epic “Operational Support”

Pianificazione	Service Review	Milestone	Capability “Continuous Improvement”



PARTE IV

PLATFORM ENGINEERING, DEVSECOPS \& OPERATIONAL EXCELLENCE

CAPITOLO 41

PE-08 — FinOps, Cost Management \& Digital Sustainability

Sustainable Platform Economics

\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_

41.1 Vision

La sostenibilità economica costituisce un requisito architetturale della piattaforma SportelloScuola 2.0.

Ogni decisione tecnologica deve essere valutata non solo in termini di qualità, sicurezza e prestazioni, ma anche rispetto al costo complessivo di esercizio e alla capacità della piattaforma di crescere nel tempo senza generare un incremento incontrollato delle spese operative.

La strategia FinOps proposta integra il controllo dei costi nel ciclo di vita dell’architettura, favorendo decisioni basate su dati oggettivi e orientate al lungo periodo.

\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_

41.2 Principi architetturali

Cost Transparency

Ogni servizio deve avere costi comprensibili e monitorabili.

\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_

Pay Only for Value

Le risorse vengono dimensionate in funzione del valore che producono.

\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_

Incremental Scaling

L’infrastruttura cresce solo quando gli indicatori ne dimostrano la necessità.

\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_

Vendor Independence

Le scelte economiche non devono generare dipendenze irreversibili da un singolo fornitore.

\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_

Sustainability by Design

L’efficienza economica è considerata parte integrante della qualità architetturale.

\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_

41.3 Cost Domains

I costi vengono suddivisi in domini omogenei.



Dominio	Esempi

Hosting	Netlify

Backend	Supabase

Database	PostgreSQL gestito

Storage	File e documenti

AI Services	Provider LLM

Email	Resend

Domini e DNS	Registrar, Cloudflare (se adottato)

Monitoring	Sentry, Better Stack

Repository	GitHub



Questa classificazione facilita il monitoraggio e la pianificazione del budget.

\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_

41.4 Cost Allocation Model

Ogni costo viene associato a una capability architetturale, evitando una semplice ripartizione per tecnologia.



Capability	Servizi coinvolti

Autenticazione	Supabase Auth

Gestione documenti	Storage, Database

Assistente AI	LLM, Vector Store

Comunicazioni	Resend

Monitoraggio	Sentry, Better Stack



In questo modo sarà possibile valutare il costo di una funzionalità e non solo quello di un’infrastruttura.

\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_

41.5 AI Cost Governance

L’Intelligenza Artificiale rappresenta il dominio con la maggiore variabilità economica.

Per ogni provider saranno monitorati:

●	consumo di token;

●	costo medio per richiesta;

●	costo medio per utente;

●	costo mensile;

●	tempo medio di risposta;

●	tasso di fallback.

L’AI Gateway potrà utilizzare questi dati per indirizzare le richieste verso il provider più appropriato, bilanciando costo, prestazioni e qualità.

\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_

41.6 Budget Management

La piattaforma adotta un modello di budget articolato su tre livelli.

Budget operativo

Spese ricorrenti.

\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_

Budget evolutivo

Nuove funzionalità.

\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_

Budget di riserva

Imprevisti e picchi di utilizzo.

\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_

41.7 Cost Optimization Strategy

Le principali leve di ottimizzazione comprendono:

●	eliminazione delle risorse inutilizzate;

●	caching delle richieste frequenti;

●	utilizzo di modelli AI differenti in funzione del caso d’uso;

●	archiviazione ottimizzata dei documenti;

●	revisione periodica dei piani tariffari.

L’obiettivo è migliorare l’efficienza senza compromettere la qualità del servizio.

\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_

41.8 Sustainability Indicators



Indicatore	Finalità

Costo mensile della piattaforma	Controllo generale

Costo medio per utente attivo	Scalabilità economica

Costo medio per richiesta AI	Ottimizzazione dei provider

Costo per documento elaborato	Efficienza del patrimonio informativo

Crescita mensile dei costi	Pianificazione



Questi indicatori saranno riesaminati periodicamente insieme agli altri KPI operativi.

\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_

41.9 Scalability Thresholds

Per evitare ottimizzazioni premature vengono definiti alcuni punti di attenzione.



Componente	Soglia indicativa	Possibile evoluzione

Supabase	Avvicinamento ai limiti del piano	Upgrade del piano o ottimizzazione delle query

Netlify	Limiti di build o banda	Piano superiore o CDN avanzata

Resend	Superamento delle quote gratuite	Piano superiore o provider alternativo

AI Provider	Crescita significativa del costo per token	Ottimizzazione dei prompt, caching o routing multi-provider

Storage	Aumento continuo dei documenti	Policy di archiviazione e lifecycle management



Le soglie non costituiscono trigger automatici, ma elementi di valutazione architetturale.

\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_

41.10 Toolchain Assessment



Strumento	Stato	Motivazione

Dashboard Supabase	Mandatory	Monitoraggio di utilizzo e risorse backend.

Dashboard Netlify	Mandatory	Build, traffico e consumo banda.

Dashboard Resend	Mandatory	Volume e stato delle email.

Dashboard dei provider AI	Mandatory	Costi, token e quote disponibili.

Better Stack	Preferred	Correlazione tra costi e disponibilità del servizio.

OpenProject	Preferred	Pianificazione economica delle iniziative progettuali.



Si privilegia l’utilizzo delle dashboard già offerte dai provider, evitando l’introduzione di strumenti FinOps dedicati fino a quando la complessità della piattaforma non lo renderà necessario.

\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_

41.11 Architecture Decision

ADR-FIN-001 — Sustainable Cloud Economics

SportelloScuola 2.0 adotta una strategia FinOps orientata alla sostenibilità economica e alla crescita progressiva della piattaforma.

Ogni evoluzione infrastrutturale dovrà essere supportata da una valutazione congiunta di benefici attesi, impatto economico e valore prodotto.

\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_

Enterprise Cost Maturity Model



Livello	Stato

Controllo manuale dei costi	✔ Superato

Monitoraggio tramite dashboard dei provider	✔ Attuale

Budget strutturato	In consolidamento

Ottimizzazione continua	Pianificata

FinOps integrato nella governance	Visione di lungo periodo



Architectural Traceability Matrix (ATM)



EMA	SAPM	Repository	OpenProject

Sostenibilità della piattaforma	FinOps Strategy	Configurazioni dei provider cloud	Epic “Platform Sustainability”

Governo delle risorse	Cost Allocation	Dashboard operative	Feature “Cloud Cost Management”

Evoluzione architetturale	Scalability Thresholds	ADR e documentazione	Capability “Sustainable Architecture”

Pianificazione economica	Budget Management	Roadmap e milestone	Epic “Platform Evolution”



PARTE IV

PLATFORM ENGINEERING, DEVSECOPS \& OPERATIONAL EXCELLENCE

CAPITOLO 42

PE-09 — Platform Maturity \& Architecture Evolution Roadmap

Enterprise Architecture Evolution Framework

\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_

42.1 Vision

La Platform Evolution Roadmap definisce il percorso di crescita progressiva dell’ecosistema SportelloScuola 2.0.

L’obiettivo non consiste nell’introdurre indiscriminatamente nuove tecnologie, bensì nell’accompagnare l’evoluzione della piattaforma secondo priorità architetturali, disponibilità organizzative e reale valore prodotto.

Ogni evoluzione dovrà essere motivata da esigenze funzionali, operative o strategiche e non dal semplice aggiornamento tecnologico.

La roadmap costituisce pertanto il riferimento per la pianificazione delle future iniziative di sviluppo.

\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_

42.2 Evolution Principles

L’evoluzione architetturale segue alcuni principi fondamentali.

Incremental Evolution

Le modifiche devono essere progressive.

\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_

Business Driven

Le priorità sono determinate dal valore generato.

\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_

Architecture First

Ogni evoluzione deve rispettare l’EMA.

\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_

Technical Sustainability

La crescita non deve aumentare inutilmente il debito tecnico.

\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_

Evidence Based Decisions

Ogni investimento deve essere supportato da metriche raccolte dalla piattaforma.

\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_

Simplicity Before Complexity

Le soluzioni più semplici sono sempre preferite quando soddisfano i requisiti.

\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_

42.3 Platform Maturity Model

L’evoluzione della piattaforma viene rappresentata mediante quattro livelli di maturità.

\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_

Level 1 — Foundation

Obiettivo

Costruire una piattaforma stabile.

Comprende:

●	GitHub;

●	Netlify;

●	Supabase;

●	Resend;

●	repository documentato;

●	EMA;

●	SAPM;

●	OpenProject;

●	pipeline CI/CD essenziale.

Stato atteso: completamento della prima versione operativa.

\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_

Level 2 — Growth

Obiettivo

Migliorare qualità e affidabilità.

Comprende:

●	monitoraggio completo;

●	Sentry;

●	Better Stack;

●	test automatizzati;

●	AI Gateway consolidato;

●	osservabilità;

●	dashboard operative;

●	governance delle release.

Questa fase privilegia la qualità del servizio.

\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_

Level 3 — Advanced

Obiettivo

Supportare una crescita significativa della piattaforma.

Comprende:

●	caching intelligente;

●	orchestrazione avanzata dei workflow;

●	ottimizzazione dei costi AI;

●	miglioramento delle prestazioni;

●	automazione delle attività operative.

Questa fase viene avviata solo se i dati raccolti dimostrano la necessità di tali investimenti.

\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_

Level 4 — Enterprise

Obiettivo

Preparare la piattaforma a una diffusione su larga scala.

Le possibili evoluzioni comprendono:

●	gestione avanzata delle identità;

●	API Management dedicato;

●	federazione con altri sistemi;

●	maggiore automazione infrastrutturale;

●	osservabilità distribuita;

●	Infrastructure as Code.

Nota metodologica: questi elementi rappresentano possibilità evolutive e non requisiti obbligatori. La loro introduzione dovrà essere valutata in funzione della crescita effettiva della piattaforma.

\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_

42.4 Evolution Domains

L’evoluzione viene monitorata per dominio architetturale.



Dominio	Livello attuale	Obiettivo

Enterprise Architecture	Foundation	Enterprise

Data Architecture	Growth	Enterprise

AI Architecture	Growth	Enterprise

DevSecOps	Growth	Advanced

Platform Engineering	Growth	Enterprise

Security	Growth	Enterprise

Governance	Growth	Enterprise

Project Management	Foundation	Advanced



42.5 Evolution Triggers

L’introduzione di nuove tecnologie sarà valutata sulla base di indicatori oggettivi.



Evento	Possibile evoluzione

Aumento significativo degli utenti	Revisione del dimensionamento dei servizi

Incremento dei tempi di risposta	Ottimizzazione del database e caching

Crescita del costo AI	Revisione del routing multi-provider

Maggior numero di sviluppatori	Evoluzione delle pipeline CI/CD e della governance

Nuove integrazioni istituzionali	Rafforzamento dell’API Management



Le soglie saranno definite e riesaminate periodicamente.

\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_

42.6 Technical Debt Strategy

Il debito tecnico viene trattato come elemento fisiologico.

Ogni milestone comprenderà:

●	debito tecnico individuato;

●	priorità;

●	impatto;

●	piano di riduzione.

Il debito tecnico non dovrà mai compromettere l’evoluzione della piattaforma.

\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_

42.7 Innovation Backlog

Non tutte le idee devono essere implementate immediatamente.

Il SAPM prevede un Innovation Backlog contenente:

●	sperimentazioni AI;

●	nuove integrazioni;

●	strumenti emergenti;

●	miglioramenti architetturali;

●	idee provenienti dagli utenti.

Ogni elemento sarà sottoposto a valutazione periodica.

\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_

42.8 Architecture Review Cycle

La piattaforma verrà riesaminata con cadenza regolare.

La revisione comprenderà:

●	verifica della coerenza con l’EMA;

●	stato degli ADR;

●	evoluzione del SAPM;

●	stato della roadmap;

●	risultati dei KPI;

●	nuovi requisiti normativi;

●	opportunità tecnologiche.

La periodicità consigliata è semestrale, con riesami straordinari in occasione di cambiamenti significativi.

\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_

42.9 Enterprise Readiness Assessment

La maturità della piattaforma sarà valutata attraverso indicatori sintetici.



Dominio	Indicatore

Architettura	Allineamento EMA–SAPM

Qualità	Percentuale di Quality Gate superati

Sicurezza	Vulnerabilità critiche aperte

Operatività	Disponibilità dei servizi

AI	Accuratezza e costi

Governance	Stato degli ADR e della roadmap

Delivery	Milestone completate nei tempi previsti



42.10 Architecture Decision

ADR-EVO-001 — Incremental Architecture Evolution

SportelloScuola 2.0 adotta una strategia di evoluzione incrementale nella quale ogni miglioramento architetturale viene introdotto solo quando produce un beneficio misurabile rispetto ai costi, alla complessità e agli obiettivi strategici della piattaforma.

\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_

Enterprise Evolution Matrix



Ambito	Oggi	Domani

CI/CD	GitHub Actions	Pipeline con Quality Governance completa

AI	Multi-provider	Routing intelligente basato su metriche

Database	Supabase PostgreSQL	Ottimizzazione progressiva

Monitoraggio	Sentry e Better Stack	Telemetria distribuita se necessaria

Governance	GitHub + OpenProject	Processi consolidati

Infrastruttura	Cloud gestito	Evoluzione guidata dalla domanda



Architectural Traceability Matrix (ATM)



EMA	SAPM	Repository	OpenProject

Roadmap strategica	Platform Evolution	ADR e documentazione	Epic “Architecture Evolution”

Miglioramento continuo	Maturity Model	KPI e monitoraggio	Feature “Platform Improvement”

Innovazione	Innovation Backlog	Repository e proof of concept	Epic “Innovation Management”

Governo dell’architettura	Review Cycle	Riesami architetturali	Capability “Architecture Governance”



PARTE V

PROJECT MANAGEMENT \& DELIVERY

CAPITOLO 43

PM-01 — Program Governance \& Portfolio Management

Enterprise Delivery Framework

\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_

43.1 Vision

La Program Governance definisce il modello attraverso il quale SportelloScuola 2.0 viene pianificato, realizzato, monitorato ed evoluto.

Il progetto viene considerato un programma di trasformazione digitale, composto da iniziative coordinate che concorrono alla realizzazione della visione architetturale descritta nell’Enterprise Master Architecture (EMA).

La governance del programma garantisce che ogni attività di sviluppo sia coerente con gli obiettivi strategici, con le decisioni architetturali e con le priorità funzionali.

\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_

43.2 Principi di governo

Il modello di governance si fonda sui seguenti principi.

Strategy Driven

Ogni attività deriva da un obiettivo strategico.

\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_

Architecture First

Le decisioni progettuali devono rispettare l’EMA e il SAPM.

\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_

Incremental Delivery

Il valore viene rilasciato progressivamente.

\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_

Full Traceability

Ogni elemento del progetto deve essere tracciabile fino alla strategia.

\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_

Evidence Based Planning

La pianificazione si basa su dati, metriche e risultati misurabili.

\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_

Continuous Governance

Il programma viene riesaminato periodicamente per garantire l’allineamento con gli obiettivi.

\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_

43.3 Program Structure

Il programma viene articolato su sette livelli gerarchici.



Livello	Descrizione

Vision	Obiettivi strategici dell’EMA

Capability	Capacità organizzative della piattaforma

Epic	Iniziative di ampio respiro

Feature	Funzionalità coerenti

User Story	Esigenze dell’utente

Task	Attività operative

Deliverable	Risultato verificabile



Questa struttura permette di mantenere una chiara relazione tra strategia e implementazione.

\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_

43.4 Portfolio Domains

Le Capability vengono raggruppate in domini coerenti con l’EMA.



Dominio	Esempi di Capability

Governance	Gestione documentale, ADR, compliance

Servizi Applicativi	Gestione istanze, workflow, notifiche

Patrimonio Informativo	Database, Knowledge Graph, RAG

Intelligenza Artificiale	AI Gateway, orchestrazione, valutazione

Piattaforma	DevSecOps, CI/CD, monitoraggio

Sicurezza	IAM, audit, protezione dati

Interoperabilità	API, integrazioni, standard

Esperienza Utente	Frontend, accessibilità, design system



43.5 Program Governance Board

Per un progetto delle dimensioni di SportelloScuola 2.0 non è necessario un organo formale composto da più persone.

Il Governance Board viene modellato come una funzione di controllo architetturale, che può essere svolta dal Project Owner con il supporto della documentazione.

Le responsabilità comprendono:

●	approvazione delle Capability;

●	validazione degli ADR;

●	revisione delle milestone;

●	controllo dell’allineamento tra EMA e SAPM;

●	gestione delle priorità evolutive.

Questa impostazione mantiene il rigore metodologico senza introdurre complessità organizzativa.

\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_

43.6 Decision Framework

Ogni decisione significativa viene classificata secondo quattro categorie.



Categoria	Strumento

Strategica	EMA

Architetturale	ADR

Progettuale	SAPM

Operativa	OpenProject



In questo modo è sempre chiaro dove deve essere documentata una determinata decisione.

\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_

43.7 Planning Horizon

La pianificazione viene articolata su tre orizzonti temporali.

Strategico (24–36 mesi)

Definizione delle Capability e della roadmap architetturale.

\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_

Tattico (6–12 mesi)

Pianificazione di Epic e Feature.

\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_

Operativo (2–8 settimane)

Gestione di User Story, Task e Release.

Questa suddivisione evita di dettagliare prematuramente attività troppo lontane nel tempo.

\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_

43.8 Governance Reviews

La governance prevede riesami periodici.



Frequenza	Obiettivo

Ad ogni Pull Request significativa	Verifica tecnica

Ad ogni Release	Verifica funzionale

Mensile	Stato del programma

Semestrale	Riesame architetturale

Annuale	Aggiornamento dell’EMA e del SAPM



I riesami sono proporzionati alla dimensione del progetto e possono essere documentati direttamente in OpenProject e GitHub.

\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_

43.9 Key Governance Indicators

Per valutare l’efficacia del programma vengono monitorati alcuni indicatori.



Indicatore	Finalità

Capability completate	Avanzamento strategico

Epic concluse	Valore rilasciato

Milestone rispettate	Affidabilità della pianificazione

ADR implementati	Coerenza architetturale

Debito tecnico aperto	Sostenibilità evolutiva

Requisiti tracciati	Completezza della governance



Questi KPI saranno integrati con quelli operativi definiti nella Parte IV.

\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_

43.10 Architecture Decision

ADR-PGM-001 — Enterprise Program Governance

SportelloScuola 2.0 adotta un modello di governo del programma nel quale la pianificazione strategica, l’architettura e l’implementazione operativa sono integrate in un unico processo decisionale.

Ogni elemento del progetto deve poter essere ricondotto a una Capability architetturale e, attraverso essa, agli obiettivi definiti nell’EMA.

\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_

Enterprise Governance Maturity Model



Livello	Stato

Pianificazione per task	✔ Superata

Pianificazione per funzionalità	✔ Consolidata

Pianificazione per Capability	In introduzione

Program Governance integrata	Obiettivo della Parte V

Portfolio Management evolutivo	Visione di lungo periodo



Architectural Traceability Matrix (ATM)



EMA	SAPM	Repository	OpenProject

Visione strategica	Program Governance	ADR, documentazione	Capability

Architettura di riferimento	Portfolio Domains	Repository organizzato per moduli	Epic

Evoluzione della piattaforma	Planning Horizon	Milestone GitHub	Feature

Governance	Governance Reviews	Release e changelog	Riesami del programma



PARTE V

PROJECT MANAGEMENT \& DELIVERY

CAPITOLO 44

PM-02 — Capability Architecture \& Enterprise Capability Model

Strategic Capability Framework

\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_

44.1 Vision

Le Capability rappresentano le capacità permanenti che la piattaforma SportelloScuola 2.0 deve possedere per perseguire la propria missione istituzionale.

A differenza degli Epic o delle Feature, le Capability non descrivono attività temporanee né specifiche implementazioni tecniche, ma identificano ciò che il sistema deve essere in grado di fare in modo continuativo.

Esse costituiscono il collegamento stabile tra la strategia definita nell’EMA e l’esecuzione operativa gestita attraverso OpenProject.

\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_

44.2 Principi architetturali

Stability

Le Capability sono relativamente stabili nel tempo e cambiano solo in presenza di evoluzioni strategiche.

\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_

Business Orientation

Ogni Capability esprime una capacità di business o di servizio, non una tecnologia.

\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_

Technology Independence

La descrizione di una Capability è indipendente dalle soluzioni implementative adottate.

\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_

Measurability

Ogni Capability deve poter essere valutata mediante indicatori di maturità e prestazione.

\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_

Traceability

Ogni Epic, Feature e User Story deve essere ricondotta a una Capability.

\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_

44.3 Capability Hierarchy

La struttura proposta è articolata su tre livelli.



Livello	Descrizione

Domain	Grande area funzionale della piattaforma

Capability	Capacità permanente

Sub-Capability	Capacità specializzata, se necessaria



Questa gerarchia consente di mantenere il modello semplice ma estendibile.

\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_

44.4 Enterprise Capability Domains

Le Capability vengono organizzate in domini coerenti con l’EMA.



Codice	Dominio

GOV	Governance

APP	Servizi Applicativi

DAT	Patrimonio Informativo

AI	Intelligenza Artificiale

SEC	Sicurezza

INT	Interoperabilità

UX	Esperienza Utente

OPS	Platform Operations



Questi domini costituiranno la struttura principale del portfolio di OpenProject.

\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_

44.5 Capability Catalog (versione iniziale)

GOV – Governance

●	Gestione documentazione architetturale

●	Gestione ADR

●	Gestione roadmap

●	Compliance normativa

\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_

APP – Servizi Applicativi

●	Gestione pratiche

●	Workflow amministrativi

●	Gestione notifiche

●	Gestione utenti

\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_

DAT – Patrimonio Informativo

●	Database istituzionale

●	Repository documentale

●	Knowledge Graph

●	Indicizzazione documenti

●	Retrieval semantico

\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_

AI – Intelligenza Artificiale

●	AI Gateway

●	Orchestrazione modelli

●	Prompt Management

●	Valutazione delle risposte

●	Gestione embeddings

\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_

SEC – Sicurezza

●	Autenticazione

●	Autorizzazione

●	Audit

●	Gestione segreti

●	Monitoraggio sicurezza

\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_

INT – Interoperabilità

●	API REST

●	Import/export dati

●	Standard interoperabili

●	Integrazione con servizi esterni

\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_

UX – Esperienza Utente

●	Frontend web

●	Accessibilità

●	Design System

●	Navigazione

\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_

OPS – Platform Operations

●	CI/CD

●	Deploy

●	Osservabilità

●	Backup

●	Monitoraggio

●	Gestione costi

\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_

44.6 Capability Lifecycle

Ogni Capability attraversa un ciclo di vita definito.



Stato	Significato

Planned	Identificata ma non ancora sviluppata

In Progress	In fase di implementazione

Operational	Disponibile in produzione

Optimized	Sottoposta a miglioramento continuo

Retired	Non più utilizzata



Il ciclo di vita consente di monitorare l’evoluzione della piattaforma senza perdere la visione strategica.

\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_

44.7 Capability Ownership

Ogni Capability deve avere un responsabile architetturale.

Nel contesto attuale del progetto tale ruolo è svolto dal Project Owner.

In futuro, con l’eventuale crescita del team, le responsabilità potranno essere distribuite tra figure specialistiche (Data Architect, AI Lead, Platform Engineer, ecc.), senza modificare il modello di governance.

\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_

44.8 Capability Assessment

La maturità delle Capability viene valutata periodicamente.



Livello	Descrizione

Initial	Capacità embrionale

Managed	Gestione documentata

Defined	Processi standardizzati

Quantitatively Managed	Prestazioni misurate

Optimizing	Miglioramento continuo



Questo modello, ispirato ai principi del CMMI ma semplificato, è proporzionato alle dimensioni del progetto.

\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_

44.9 Collegamento con OpenProject

Le Capability rappresentano il livello più alto della pianificazione operativa.

La gerarchia adottata sarà:

Capability

&#x20;   ↓

Epic

&#x20;   ↓

Feature

&#x20;   ↓

User Story

&#x20;   ↓

Task



In OpenProject è consigliabile rappresentare le Capability come work package di tipo dedicato (se configurabile) oppure come il livello superiore della WBS, evitando di utilizzarle come semplici etichette.

Questa scelta migliora la tracciabilità e consente di monitorare l’avanzamento per capacità strategica.

\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_

44.10 Architecture Decision

ADR-CAP-001 — Capability Driven Delivery

SportelloScuola 2.0 adotta un modello di pianificazione guidato dalle Capability, nelle quali ogni iniziativa progettuale deve essere riconducibile a una capacità permanente della piattaforma.

Le Capability costituiscono il punto di collegamento tra l’Enterprise Master Architecture, il SAPM e la gestione operativa del progetto.

\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_

Enterprise Capability Maturity Matrix



Dominio	Livello iniziale	Obiettivo

Governance	Defined	Optimizing

Servizi Applicativi	Managed	Quantitatively Managed

Patrimonio Informativo	Managed	Optimizing

AI	Initial	Defined

Sicurezza	Managed	Optimizing

Interoperabilità	Initial	Defined

Esperienza Utente	Managed	Quantitatively Managed

Platform Operations	Defined	Optimizing



Architectural Traceability Matrix (ATM)



EMA	SAPM	Repository	OpenProject

Domini architetturali	Capability Domains	Struttura moduli	Capability

Obiettivi strategici	Capability Catalog	Repository applicativo	Epic

Evoluzione della piattaforma	Capability Lifecycle	ADR	Feature

Governo dell’architettura	Capability Assessment	Metriche e KPI	Dashboard Portfolio



PARTE V

PROJECT MANAGEMENT \& DELIVERY

CAPITOLO 45

PM-03 — Enterprise Capability Register

Official Architecture Repository

\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_

45.1 Vision

L’Enterprise Capability Register costituisce il catalogo ufficiale delle capacità permanenti della piattaforma SportelloScuola 2.0.

Esso rappresenta il punto di raccordo tra:

●	Enterprise Master Architecture (EMA);

●	Solution Architecture (SAPM);

●	repository software;

●	Architecture Decision Records (ADR);

●	modello dati;

●	gestione operativa del progetto in OpenProject.

Ogni evoluzione della piattaforma dovrà essere ricondotta a una o più Capability presenti nel registro.

\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_

45.2 Struttura del registro

Le Capability sono identificate da un codice composto da:

<DOMINIO>-<NUMERO\_PROGRESSIVO>



Esempi:

●	GOV-01

●	APP-03

●	DAT-02

●	AI-04

●	OPS-01

Il codice è permanente e non viene riutilizzato, anche nel caso di dismissione della Capability.

\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_

45.3 Capability GOV-01 — Architecture Governance

Identificativo

GOV-01

Dominio

Governance

Obiettivo

Garantire la coerenza tra strategia, architettura, sviluppo e gestione operativa.

Business Value

Assicurare che ogni evoluzione della piattaforma sia tracciabile e conforme ai principi definiti nell’EMA.

Componenti coinvolti

●	Documentazione EMA

●	SAPM

●	ADR

●	OpenProject

●	GitHub

Repository

/docs

/docs/ema

/docs/sapm



Database

Non applicabile.

Edge Functions

Non applicabile.

Provider

GitHub.

ADR correlati

ADR-GOV-001

ADR-PGM-001

Epic collegati

EPIC-GOV-01

Governance Framework

KPI

●	ADR aggiornati

●	Revisioni architetturali completate

●	Coerenza della documentazione

Maturità

Defined

Priorità

Alta

Stato

Operational

\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_

45.4 Capability GOV-02 — Compliance \& Regulatory Management

Identificativo

GOV-02

Dominio

Governance

Obiettivo

Garantire la conformità normativa della piattaforma rispetto al quadro legislativo applicabile.

Ambiti coperti

●	GDPR

●	AI Act

●	Accessibilità

●	CAD

●	Linee guida AgID

●	Conservazione documentale

●	Sicurezza

Componenti

●	Documentazione

●	Registro trattamenti

●	Privacy

●	Audit

Repository

/docs/compliance



Provider

Supabase

GitHub

Epic

Compliance Framework

KPI

●	Audit completati

●	Non conformità aperte

●	Aggiornamenti normativi recepiti

Stato

In evoluzione

\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_

45.5 Capability APP-01 — User \& Identity Management

Identificativo

APP-01

Obiettivo

Gestire utenti, autenticazione, autorizzazioni e profili.

Componenti

●	Frontend

●	Supabase Auth

●	Database

●	Row Level Security (RLS)

Repository

/src

/supabase



Database

●	users

●	profiles

●	roles

●	permissions (se introdotta)

Edge Functions

Autenticazione e provisioning utenti.

Provider

Supabase

KPI

●	Tempo medio di autenticazione

●	Errori login

●	Disponibilità del servizio

Stato

Operational

\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_

45.6 Capability APP-02 — Case \& Workflow Management

Identificativo

APP-02

Obiettivo

Gestire il ciclo di vita delle pratiche amministrative.

Componenti

●	Frontend

●	Backend

●	Database

●	Workflow Engine

Repository

/src/modules

/supabase/functions



Database

Tabelle relative a pratiche, workflow, stati e cronologia.

Edge Functions

Gestione transizioni di stato e notifiche.

KPI

●	Tempo medio di completamento pratica

●	Workflow completati

●	Errori di processo

Stato

Planned

\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_

45.7 Capability DAT-01 — Institutional Data Repository

Identificativo

DAT-01

Obiettivo

Gestire il patrimonio informativo strutturato della piattaforma.

Componenti

●	PostgreSQL

●	Migration

●	Storage

Repository

/supabase

/supabase/migrations



Provider

Supabase

KPI

●	Integrità referenziale

●	Performance query

●	Copertura backup

Stato

Operational

\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_

45.8 Capability DAT-02 — Knowledge Repository \& Semantic Retrieval

Identificativo

DAT-02

Obiettivo

Gestire documenti, indicizzazione semantica e recupero delle informazioni per alimentare i servizi AI.

Business Value

Consentire agli assistenti intelligenti di fornire risposte basate esclusivamente sul patrimonio documentale validato.

Componenti

●	Storage documentale

●	Database

●	Embeddings

●	Retrieval layer

●	AI Gateway

Repository

/supabase/storage

/supabase/functions

/src/ai



Provider

Supabase

Provider LLM

KPI

●	Accuratezza del retrieval

●	Tempo medio di ricerca

●	Percentuale di documenti indicizzati

Stato

Growth

\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_

45.9 Principi di gestione del Capability Register

Il registro è soggetto alle seguenti regole:

1\.	ogni nuova Capability deve essere approvata prima dell’avvio dello sviluppo;

2\.	ogni Epic deve essere associato a una Capability esistente;

3\.	una Capability può generare più Epic nel tempo;

4\.	una Feature non può appartenere a Capability differenti;

5\.	eventuali modifiche sostanziali richiedono un aggiornamento dell’ADR pertinente.

Queste regole assicurano la coerenza tra architettura e implementazione.

\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_

45.10 Architecture Decision

ADR-CAP-002 — Capability Register as Single Source of Truth

L’Enterprise Capability Register è riconosciuto come il riferimento ufficiale per la descrizione delle capacità della piattaforma.

Esso costituisce il collegamento permanente tra Enterprise Architecture, Solution Architecture, repository software e gestione operativa del progetto.

\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_

Enterprise Capability Repository Model



Elemento	Repository di riferimento

Capability	SAPM

Decisioni	ADR

Codice	GitHub

Dati	Supabase

Delivery	OpenProject

Strategia	EMA



Architectural Traceability Matrix (ATM)



EMA	SAPM	Repository	OpenProject

Domini strategici	Capability Register	Moduli software	Capability

Requisiti architetturali	Schede Capability	Cartelle e componenti	Epic

Decisioni	ADR correlati	Pull Request	Feature

Evoluzione	Stato di maturità	Release	Milestone



PARTE V

PROJECT MANAGEMENT \& DELIVERY

CAPITOLO 46

PM-04 — Solution Building Blocks \& Epic Engineering

Architectural Decomposition Model

\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_

46.1 Vision

Le Capability identificano cosa la piattaforma deve essere in grado di fare.

I Solution Building Blocks (SBB) identificano come tali capacità vengono realizzate mediante componenti software coerenti e riutilizzabili.

Gli SBB costituiscono il livello di decomposizione architetturale che collega le Capability agli Epic di sviluppo, garantendo continuità tra progettazione e implementazione.

Essi rappresentano moduli logici dell’architettura e non corrispondono necessariamente a singole cartelle del repository o a specifici microservizi.

\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_

46.2 Principi

Ogni SBB deve rispettare i seguenti criteri.

Coesione

Ogni Building Block realizza una responsabilità principale ben definita.

Basso accoppiamento

Le dipendenze con altri SBB devono essere ridotte al minimo.

Riutilizzabilità

Un Building Block può supportare più Capability e più Epic.

Evolvibilità

La modifica di un SBB non deve richiedere la revisione dell’intera piattaforma.

Tracciabilità

Ogni SBB deve essere collegato a:

●	Capability;

●	componenti software;

●	ADR;

●	Epic.

\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_

46.3 Catalogo iniziale degli SBB



Codice	Solution Building Block	Capability principali

SBB-01	Identity Service	APP-01, SEC-01

SBB-02	User Profile Service	APP-01

SBB-03	Workflow Engine	APP-02

SBB-04	Notification Service	APP-03

SBB-05	Document Repository	DAT-01, DAT-02

SBB-06	Knowledge Retrieval	DAT-02, AI-02

SBB-07	AI Gateway	AI-01

SBB-08	AI Evaluation Engine	AI-03

SBB-09	Search Service	DAT-02

SBB-10	API Integration Layer	INT-01

SBB-11	Monitoring Layer	OPS-03

SBB-12	Platform Configuration	OPS-01



Questo catalogo iniziale riflette i principali moduli già presenti o previsti nell’architettura di SportelloScuola 2.0.

\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_

46.4 Relazione tra Capability, SBB ed Epic

La relazione è la seguente:

Capability

&#x20;       │

&#x20;       ├── SBB-05 Document Repository

&#x20;       ├── SBB-06 Knowledge Retrieval

&#x20;       │

&#x20;       └── Epic

&#x20;             ├── Indicizzazione documenti

&#x20;             ├── Gestione versioni

&#x20;             ├── Ricerca semantica

&#x20;             └── Integrazione AI



Gli Epic derivano dai Building Block e ne rappresentano le iniziative evolutive.

\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_

46.5 Regole di decomposizione

Per mantenere la coerenza del modello:

●	una Capability può comprendere più SBB;

●	uno SBB può supportare più Capability;

●	un Epic appartiene a un solo SBB;

●	una Feature appartiene a un solo Epic;

●	una User Story appartiene a una sola Feature.

Queste regole evitano sovrapposizioni e semplificano la pianificazione.

\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_

46.6 Mapping con il repository

Ogni SBB deve essere associato ai principali componenti implementativi.



SBB	Repository (esempi)

Identity Service	/src/auth, /supabase

Workflow Engine	/supabase/functions

Document Repository	/supabase/storage, /supabase/migrations

AI Gateway	/src/ai

Monitoring Layer	configurazioni Sentry, Better Stack



Il mapping viene aggiornato in occasione delle revisioni architetturali.

\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_

46.7 Epic Engineering

Un Epic rappresenta un’iniziativa temporanea che evolve uno specifico SBB.

Ogni Epic deve riportare almeno:

●	codice identificativo;

●	SBB di riferimento;

●	Capability associata;

●	obiettivo;

●	valore atteso;

●	criteri di completamento;

●	ADR correlati;

●	milestone prevista.

Questa struttura assicura uniformità e facilita la pianificazione.

\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_

46.8 Architecture Decision

ADR-SBB-001 — Solution Building Blocks as Architectural Bridge

SportelloScuola 2.0 adotta i Solution Building Blocks come modello di decomposizione architetturale per collegare le Capability permanenti alle iniziative progettuali rappresentate dagli Epic.

Gli SBB costituiscono un artefatto del SAPM e non un ulteriore livello operativo di OpenProject.

\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_

46.9 Architectural Traceability Matrix (ATM)



EMA	SAPM	Repository	OpenProject

Domini applicativi	Solution Building Blocks	Moduli software	Epic

Capability	SBB	Cartelle e servizi	Epic

Decisioni	ADR-SBB	Componenti implementativi	Feature

Evoluzione	Decomposizione architetturale	Refactoring	Roadmap



PARTE V

PROJECT MANAGEMENT \& DELIVERY

CAPITOLO 47

PM-05 — Epic Engineering \& Value-Driven Planning

Enterprise Delivery Planning Model

\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_

47.1 Vision

Gli Epic rappresentano le principali iniziative evolutive della piattaforma.

Essi non costituiscono semplicemente un insieme di attività tecniche, ma descrivono interventi coordinati finalizzati ad aumentare il valore complessivo del sistema.

Ogni Epic deriva da una Capability permanente, si appoggia a uno o più Solution Building Block e viene pianificato sulla base del valore generato per gli utenti, per l’organizzazione e per la sostenibilità della piattaforma.

\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_

47.2 Principi di progettazione degli Epic

Ogni Epic deve rispettare i seguenti principi.

Value Driven

L’Epic deve produrre un beneficio chiaramente identificabile.

Architecture Aligned

L’Epic deve essere coerente con l’EMA e con il SAPM.

Technically Feasible

L’implementazione deve essere realizzabile con le risorse disponibili e senza introdurre complessità sproporzionata.

Incremental

L’Epic deve poter essere sviluppato e rilasciato in modo incrementale.

Measurable

Il completamento dell’Epic deve essere verificabile mediante criteri oggettivi.

\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_

47.3 Struttura standard di un Epic

Ogni Epic deve includere almeno le seguenti informazioni.



Campo	Descrizione

Epic ID	Identificativo univoco

Nome	Titolo descrittivo

Capability	Collegamento al Capability Register

SBB	Modulo architetturale coinvolto

Obiettivo	Risultato atteso

Business Value	Beneficio generato

Priorità	Alta, Media, Bassa

Dipendenze	Epic correlati

KPI	Indicatori di successo

Milestone	Rilascio previsto

Stato	Planned, Active, Completed, Archived



47.4 Classificazione degli Epic

Per evitare un backlog disordinato, gli Epic sono classificati in quattro categorie.

Functional Epic

Introduzione di nuove funzionalità.

Esempi:

●	gestione pratiche;

●	dashboard;

●	workflow.

\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_

Technical Epic

Miglioramenti dell’architettura.

Esempi:

●	refactoring;

●	ottimizzazione database;

●	miglioramento delle prestazioni.

\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_

AI Epic

Evoluzione dei servizi di intelligenza artificiale.

Esempi:

●	AI Gateway;

●	valutazione delle risposte;

●	orchestrazione dei modelli.

\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_

Governance Epic

Interventi riguardanti sicurezza, conformità, documentazione e processi.

Esempi:

●	aggiornamento GDPR;

●	adeguamento all’AI Act;

●	miglioramento della documentazione.

\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_

47.5 Matrice di priorità

La priorità di un Epic viene determinata considerando quattro dimensioni.



Criterio	Peso qualitativo

Valore per l’utente	Alto

Allineamento strategico	Alto

Riduzione del rischio	Medio

Complessità tecnica	Medio



Per mantenere il processo semplice, non viene adottato un algoritmo numerico: la valutazione resta qualitativa ma documentata.

\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_

47.6 Lifecycle di un Epic

Ogni Epic attraversa il seguente ciclo di vita.

Idea

&#x20;  ↓

Analisi

&#x20;  ↓

Approvazione

&#x20;  ↓

Pianificazione

&#x20;  ↓

Sviluppo

&#x20;  ↓

Validazione

&#x20;  ↓

Rilascio

&#x20;  ↓

Chiusura



Il passaggio tra gli stati deve essere supportato da evidenze documentali e criteri di accettazione.

\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_

47.7 Relazione con OpenProject

In OpenProject ogni Epic sarà rappresentato come un work package di tipo “Epic”, collegato:

●	alla Capability di appartenenza;

●	alle Feature da realizzare;

●	alle milestone del progetto;

●	agli eventuali ADR correlati (tramite collegamenti o riferimenti).

Questa configurazione mantiene il backlog leggibile anche con l’aumentare del numero di funzionalità.

\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_

47.8 Definition of Ready (DoR) per un Epic

Un Epic può essere avviato solo se:

●	è associato a una Capability;

●	è stato definito l’obiettivo;

●	è stato stimato il valore atteso;

●	sono note le principali dipendenze;

●	è identificato almeno uno SBB coinvolto;

●	sono stati individuati i criteri di successo.

\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_

47.9 Definition of Done (DoD) per un Epic

Un Epic è considerato completato quando:

●	tutte le Feature associate sono concluse;

●	i criteri di accettazione sono soddisfatti;

●	la documentazione è aggiornata;

●	gli ADR interessati sono allineati;

●	i test previsti sono superati;

●	il rilascio è stato effettuato.

\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_

47.10 Architecture Decision

ADR-EPIC-001 — Value-Driven Epic Management

SportelloScuola 2.0 adotta un modello di gestione degli Epic orientato al valore, nel quale ogni iniziativa progettuale deve dimostrare un beneficio misurabile e mantenere la piena coerenza con la strategia, l’architettura e le Capability della piattaforma.

\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_

Enterprise Epic Traceability Matrix



Origine	Collegamento

EMA	Obiettivo strategico

SAPM	Capability e SBB

Repository	Componenti software

OpenProject	Epic

GitHub	Issue e Pull Request

Release	Versione distribuita



PARTE V

PROJECT MANAGEMENT \& DELIVERY

CAPITOLO 48

PM-06 — Feature Engineering \& Functional Decomposition

Functional Delivery Model

\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_

48.1 Vision

Le Feature rappresentano gli incrementi funzionali attraverso i quali vengono realizzati gli Epic.

Una Feature costituisce un insieme coerente di funzionalità che produce un risultato verificabile per gli utenti o per la piattaforma.

Essa può richiedere modifiche a più componenti architetturali, ma viene pianificata e monitorata come un’unica unità di valore.

\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_

48.2 Principi

Ogni Feature deve rispettare i seguenti principi.

User Oriented

La Feature deve produrre un beneficio percepibile.

\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_

End-to-End

La Feature comprende tutte le modifiche necessarie al suo funzionamento.

\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_

Independent

La Feature deve essere il più possibile indipendente da altre Feature.

\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_

Testable

Il completamento deve poter essere verificato.

\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_

Deployable

La Feature deve poter essere rilasciata senza compromettere la stabilità della piattaforma.

\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_

48.3 Relazione gerarchica

La struttura della pianificazione diventa definitivamente la seguente.

Capability

&#x20;       ↓

Solution Building Block

&#x20;       ↓

Epic

&#x20;       ↓

Feature

&#x20;       ↓

User Story

&#x20;       ↓

Task



Questa gerarchia non subirà ulteriori modifiche.

\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_

48.4 Struttura standard di una Feature

Ogni Feature deve contenere almeno:



Campo	Descrizione

Feature ID	Identificativo univoco

Nome	Titolo

Epic	Epic di appartenenza

Obiettivo	Valore prodotto

Componenti coinvolti	Frontend, Backend, AI, DB…

Priorità	Alta, Media, Bassa

Stato	Planned, Active, Testing, Done

KPI	Indicatori di successo

Versione	Release prevista



48.5 Classificazione delle Feature

Per mantenere ordinato il backlog, le Feature vengono suddivise in categorie.



Tipo	Descrizione

Functional	Nuove funzionalità utente

Technical	Miglioramenti architetturali

AI	Evoluzione dei servizi intelligenti

Security	Rafforzamento della sicurezza

Integration	Nuove integrazioni

Quality	Test, monitoraggio, osservabilità

Compliance	Adeguamenti normativi



Questa classificazione permette di leggere il backlog anche dal punto di vista gestionale.

\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_

48.6 Coinvolgimento dei componenti

Una Feature può interessare contemporaneamente più parti della piattaforma.



Componente	Possibile coinvolgimento

Frontend React	UI e UX

Supabase Database	Tabelle e viste

Migration	Evoluzione dello schema dati

Edge Functions	Logica serverless

AI Gateway	Orchestrazione LLM

Storage	Gestione documenti

GitHub Actions	Pipeline di rilascio

Documentazione	EMA, SAPM, ADR



Questo approccio riflette la natura integrata del progetto.

\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_

48.7 Feature Lifecycle

Ogni Feature segue il seguente ciclo di vita.

Proposta

&#x20;     ↓

Analisi

&#x20;     ↓

Progettazione

&#x20;     ↓

Sviluppo

&#x20;     ↓

Test

&#x20;     ↓

Validazione

&#x20;     ↓

Deploy

&#x20;     ↓

Monitoraggio



L’ultima fase è essenziale: una Feature non termina con il deploy, ma entra in osservazione per verificarne il corretto funzionamento.

\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_

48.8 Definition of Ready

Una Feature è pronta per lo sviluppo quando:

●	appartiene a un Epic approvato;

●	sono definite le User Story principali;

●	i criteri di accettazione sono chiari;

●	sono identificati i componenti coinvolti;

●	eventuali dipendenze sono documentate.

\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_

48.9 Definition of Done

Una Feature è completata quando:

●	tutte le User Story risultano concluse;

●	i test previsti sono superati;

●	la documentazione è aggiornata;

●	eventuali migration sono applicate;

●	le Edge Functions sono distribuite;

●	il monitoraggio conferma il corretto funzionamento;

●	la Feature è inclusa in una release stabile.

\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_

48.10 Architecture Decision

ADR-FEAT-001 — Feature as End-to-End Functional Increment

SportelloScuola 2.0 considera la Feature come la più piccola unità di valore rilasciabile. Ogni Feature deve includere tutti gli interventi necessari, indipendentemente dal numero di componenti software coinvolti, evitando la frammentazione artificiale del lavoro.

\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_

Enterprise Feature Matrix



Livello	Esempio

Capability	DAT-02 Knowledge Repository

SBB	Knowledge Retrieval

Epic	Ricerca semantica

Feature	Ricerca full-text con AI

User Story	L’utente cerca una circolare

Task	Creazione indice PostgreSQL, aggiornamento UI, test RAG



Architectural Traceability Matrix (ATM)



EMA	SAPM	Repository	OpenProject

Servizi applicativi	Feature	Moduli React, Supabase, Edge Functions	Feature

Patrimonio informativo	Functional Increment	Migration, Storage	User Story

AI Architecture	AI Feature	AI Gateway, Prompt	Task

Governance	Documentazione	ADR, changelog	Milestone



PARTE V

PROJECT MANAGEMENT \& DELIVERY

CAPITOLO 49

PM-07 — User Story Engineering \& Acceptance Management

Functional Specification Model

\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_

49.1 Vision

Le User Story rappresentano l’unità fondamentale di pianificazione funzionale del progetto.

Esse descrivono un’esigenza concreta dell’utente e definiscono le condizioni necessarie affinché tale esigenza venga soddisfatta mediante un incremento software verificabile.

Ogni User Story costituisce il collegamento tra gli obiettivi funzionali descritti nelle Feature e le attività operative pianificate nei Task.

\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_

49.2 Principi

Ogni User Story deve rispettare i seguenti principi.

User Centric

La Story descrive sempre un valore per un utilizzatore della piattaforma.

\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_

Testable

Il completamento deve poter essere verificato attraverso criteri oggettivi.

\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_

Independent

La Story deve essere il più possibile autonoma.

\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_

Small

La realizzazione dovrebbe richiedere pochi giorni di lavoro.

\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_

Traceable

Ogni Story deve essere collegata a:

●	Feature;

●	Epic;

●	Capability;

●	ADR, se necessario.

\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_

49.3 Template standard

Ogni User Story segue il seguente modello.

Identificativo

US-XXX

\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_

Titolo

Breve descrizione.

\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_

Story

Come \[ruolo] voglio \[azione] affinché \[beneficio].

\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_

Valore

Descrizione sintetica del beneficio prodotto.

\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_

Priorità

Alta

Media

Bassa

\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_

Feature

Feature di appartenenza.

\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_

Epic

Epic di appartenenza.

\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_

Capability

Capability collegata.

\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_

49.4 Technical Implementation Profile (TIP)

Ogni User Story include una sezione tecnica che facilita la pianificazione.



Ambito	Coinvolgimento

Frontend	✔ / ✖

Backend	✔ / ✖

Database	✔ / ✖

Migration	✔ / ✖

Edge Functions	✔ / ✖

AI Gateway	✔ / ✖

Storage	✔ / ✖

API	✔ / ✖

Test	✔ / ✖

Documentazione	✔ / ✖



Il TIP non sostituisce i Task, ma aiuta a identificare rapidamente le aree coinvolte.

\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_

49.5 Acceptance Criteria

Ogni User Story deve definire criteri di accettazione chiari.

Esempio.

Dato che l’utente ha effettuato l’accesso,

quando inserisce una domanda nella ricerca,

allora il sistema restituisce documenti pertinenti entro il tempo massimo previsto.

L’uso del formato Given–When–Then favorisce la chiarezza e la possibilità di automatizzare i test.

\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_

49.6 Definition of Ready

Una User Story è pronta per lo sviluppo quando:

●	appartiene a una Feature approvata;

●	il valore per l’utente è definito;

●	i criteri di accettazione sono completi;

●	il TIP è compilato;

●	eventuali dipendenze sono note.

\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_

49.7 Definition of Done

Una User Story è completata quando:

●	il codice è stato sviluppato;

●	i test sono superati;

●	la documentazione è aggiornata;

●	la revisione del codice è conclusa;

●	i criteri di accettazione risultano soddisfatti.

\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_

49.8 Relazione con i Task

Una User Story può essere suddivisa in più Task.

Esempio.

User Story



↓



Task Frontend



↓



Task Backend



↓



Task Database



↓



Task AI



↓



Task Test



↓



Task Documentazione



I Task rappresentano esclusivamente attività operative e non devono introdurre nuovi requisiti funzionali.

\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_

49.9 Architecture Decision

ADR-US-001 — User Story as Functional Contract

Le User Story costituiscono il contratto funzionale tra progettazione e sviluppo.

Ogni Story deve descrivere un beneficio per l’utente e includere le informazioni tecniche minime necessarie alla pianificazione dell’implementazione.

\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_

Enterprise Story Traceability Matrix



Livello	Collegamento

EMA	Obiettivi strategici

SAPM	Feature

Repository	Componenti software

OpenProject	User Story

GitHub	Issue

CI/CD	Test e rilascio



Architectural Traceability Matrix (ATM)



EMA	SAPM	Repository	OpenProject

Servizi digitali	User Story	Moduli React e servizi	User Story

AI	Acceptance Criteria	AI Gateway e Prompt	Task

Data	Technical Profile	Supabase e migration	Task

Governance	Documentazione	ADR e manuali	Deliverable



PARTE V

PROJECT MANAGEMENT \& DELIVERY

CAPITOLO 50

PM-08 — Task Engineering \& Work Breakdown Structure (WBS)

Operational Delivery Model

\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_

50.1 Vision

I Task rappresentano la più piccola unità operativa del progetto.

Essi descrivono attività tecniche chiaramente delimitate, assegnabili, stimabili e verificabili.

Ogni Task deriva da una User Story e contribuisce direttamente al completamento di una Feature, garantendo la piena tracciabilità fino agli obiettivi strategici definiti nell’EMA.

\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_

50.2 Principi

Ogni Task deve essere:

Atomico

Rappresenta una singola attività.

\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_

Stimabile

Può essere valutato in termini di impegno.

\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_

Verificabile

Il completamento è facilmente accertabile.

\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_

Tracciabile

È collegato alla User Story di origine.

\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_

Indipendente

Evita dipendenze inutili.

\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_

50.3 Convenzione di classificazione

Per mantenere il backlog ordinato, i Task vengono classificati per disciplina tecnica.



Codice	Categoria	Esempi

FE	Frontend	React, componenti, UI, accessibilità

BE	Backend	Edge Functions, servizi applicativi

DB	Database	Migration, SQL, RLS, viste

AI	Artificial Intelligence	Prompt, RAG, orchestrazione LLM

OPS	Platform Operations	Deploy, Netlify, GitHub Actions, monitoraggio

QA	Quality Assurance	Test unitari, integrazione, regressione

DOC	Documentation	EMA, SAPM, ADR, manualistica



Questa classificazione è semplice, estensibile e direttamente collegabile ai moduli del repository.

\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_

50.4 Identificazione dei Task

Ogni Task utilizza un identificativo univoco.

Formato suggerito:

TASK-FE-001

TASK-DB-014

TASK-AI-008

TASK-QA-023



L’identificativo rimane stabile anche in caso di spostamento tra sprint o milestone.

\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_

50.5 Struttura standard

Ogni Task deve contenere:



Campo	Descrizione

Task ID	Identificativo

Titolo	Descrizione sintetica

Categoria	FE, BE, DB, AI, OPS, QA, DOC

User Story	Collegamento

Priorità	Alta, Media, Bassa

Stima	Ore o giorni

Responsabile	Owner

Dipendenze	Eventuali prerequisiti

Stato	To Do, In Progress, Review, Done



50.6 Work Breakdown Structure

La WBS del progetto adotta la seguente gerarchia.

Capability

&#x20;   ↓

Epic

&#x20;   ↓

Feature

&#x20;   ↓

User Story

&#x20;   ↓

Task



I Task non possono essere collegati direttamente alle Capability o agli Epic: ogni attività deve transitare attraverso una User Story.

Questa regola mantiene il modello coerente e facilita il monitoraggio.

\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_

50.7 Flusso operativo

Ogni Task attraversa il seguente ciclo di vita.

Backlog

&#x20;   ↓

Ready

&#x20;   ↓

In Progress

&#x20;   ↓

Code Review

&#x20;   ↓

Testing

&#x20;   ↓

Done



L’introduzione dello stato Code Review consente di integrare in modo naturale GitHub Pull Request con OpenProject.

\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_

50.8 Definition of Ready

Un Task è pronto quando:

●	la User Story è approvata;

●	sono noti gli obiettivi;

●	le dipendenze sono risolte;

●	sono disponibili gli ambienti necessari.

\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_

50.9 Definition of Done

Un Task è completato quando:

●	il codice è stato sviluppato;

●	i test previsti sono superati;

●	la Pull Request è approvata;

●	la documentazione è aggiornata, se necessario;

●	il Task è chiuso in OpenProject.

\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_

50.10 Gestione del debito tecnico

Non tutte le attività producono immediatamente nuove funzionalità.

Per questo motivo viene introdotta la categoria Technical Debt, destinata a raccogliere:

●	refactoring;

●	ottimizzazione del codice;

●	miglioramento delle performance;

●	aggiornamento delle dipendenze;

●	eliminazione di codice obsoleto;

●	adeguamenti di sicurezza.

Il debito tecnico deve essere pianificato come parte integrante del backlog e non gestito solo in modo reattivo.

\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_

50.11 Integrazione con GitHub

Ogni Task può essere collegato a:

●	una GitHub Issue;

●	uno o più Commit;

●	una Pull Request;

●	una Release.

Questa integrazione consente di seguire l’intero ciclo di vita dell’attività, dalla pianificazione al rilascio.

\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_

50.12 Architecture Decision

ADR-TASK-001 — Task as Atomic Delivery Unit

SportelloScuola 2.0 adotta il Task come unità operativa minima della pianificazione. Ogni Task deve essere collegato a una User Story e rappresentare un’attività tecnica autonoma, verificabile e completabile in tempi contenuti.

\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_

Enterprise Work Breakdown Structure



Livello	Artefatto

Strategia	EMA

Architettura	SAPM

Capacità	Capability

Modulo	Solution Building Block

Iniziativa	Epic

Incremento	Feature

Requisito	User Story

Attività	Task

Implementazione	GitHub

Distribuzione	Release



Architectural Traceability Matrix (ATM)



EMA	SAPM	Repository	OpenProject

Obiettivi strategici	WBS	Codice sorgente	Task

Governance	Definition of Done	Pull Request	Code Review

Tecnologia	Task tecnici	Migration, Edge Functions	QA

Evoluzione	Technical Debt	Refactoring	Backlog



PARTE V

PROJECT MANAGEMENT \& DELIVERY

CAPITOLO 51

PM-09 — Release Management \& Version Governance

Enterprise Release Management Framework

\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_

51.1 Vision

Il Release Management disciplina il processo attraverso il quale le evoluzioni della piattaforma vengono pianificate, validate, distribuite e monitorate.

L’obiettivo non è soltanto distribuire nuove funzionalità, ma garantire che ogni rilascio mantenga la stabilità, la sicurezza e la coerenza architetturale della piattaforma.

Ogni Release rappresenta un incremento controllato del patrimonio software di SportelloScuola 2.0.

\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_

51.2 Principi

Ogni Release deve rispettare i seguenti principi.

Predictability

Le date di rilascio devono essere pianificate.

\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_

Traceability

Ogni modifica deve essere riconducibile agli Epic e alle Feature che l’hanno generata.

\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_

Reproducibility

Ogni Release deve poter essere ricostruita dal repository.

\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_

Stability

Devono essere distribuite esclusivamente funzionalità validate.

\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_

Rollback Capability

Ogni Release deve prevedere procedure di ripristino.

\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_

51.3 Tipologie di Release

La piattaforma adotta quattro tipologie.



Tipo	Descrizione

Major	Evoluzione significativa dell’architettura o delle funzionalità

Minor	Introduzione di nuove funzionalità compatibili

Patch	Correzioni di errori o vulnerabilità

Hotfix	Intervento urgente su problemi critici



51.4 Versionamento

Si adotta il modello Semantic Versioning.

Formato:

MAJOR.MINOR.PATCH



Esempi:

1.0.0



1.1.0



1.1.3



2.0.0



Le modifiche incompatibili incrementano la versione Major, le nuove funzionalità compatibili la Minor, mentre correzioni e miglioramenti incrementano la Patch.

\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_

51.5 Pianificazione delle Release

Ogni Release deve contenere:

●	elenco degli Epic completati;

●	Feature incluse;

●	User Story concluse;

●	ADR approvati;

●	migration del database;

●	Edge Function distribuite;

●	modifiche AI;

●	aggiornamenti della documentazione;

●	piano di rollback.

\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_

51.6 Pipeline di rilascio

Il flusso standard è il seguente.

Backlog

&#x20;   ↓

Development

&#x20;   ↓

Pull Request

&#x20;   ↓

Code Review

&#x20;   ↓

Continuous Integration

&#x20;   ↓

Testing

&#x20;   ↓

Release Candidate

&#x20;   ↓

Production

&#x20;   ↓

Monitoring



Questa pipeline è coerente con l’uso di GitHub, Netlify e Supabase.

\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_

51.7 Gestione delle Migration

Le migration del database seguono regole dedicate.

Ogni migration deve:

●	essere versionata;

●	essere reversibile quando tecnicamente possibile;

●	essere documentata;

●	essere collegata alla Feature che l’ha generata;

●	essere validata in ambiente di test prima della produzione.

Questa disciplina riduce il rischio di incoerenze nel patrimonio informativo.

\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_

51.8 Gestione delle Edge Function

Le Edge Function vengono distribuite insieme alla Release.

Per ciascuna funzione devono essere verificati:

●	correttezza della configurazione;

●	gestione degli errori;

●	logging;

●	timeout;

●	compatibilità con le API e il database.

\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_

51.9 Release Notes

Ogni Release deve essere accompagnata da una documentazione sintetica che riporti:

●	numero di versione;

●	data di rilascio;

●	obiettivi della Release;

●	Epic completati;

●	principali Feature introdotte;

●	correzioni effettuate;

●	eventuali limitazioni note;

●	ADR rilevanti.

Le Release Notes costituiscono parte integrante della documentazione di progetto.

\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_

51.10 Architecture Decision

ADR-REL-001 — Controlled Release Management

SportelloScuola 2.0 adotta un modello di rilascio controllato, basato su versionamento semantico, pipeline automatizzate e completa tracciabilità tra modifiche implementate, repository, documentazione architetturale e distribuzione in produzione.

\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_

Enterprise Release Traceability Matrix



Artefatto	Collegamento

EMA	Obiettivi strategici

SAPM	Epic e Feature

ADR	Decisioni implementate

GitHub	Commit e Pull Request

Supabase	Migration ed Edge Function

Netlify	Deploy del frontend

Produzione	Release



Architectural Traceability Matrix (ATM)



EMA	SAPM	Repository	Operatività

Roadmap strategica	Piano Release	Tag Git	Versioni

Servizi applicativi	Feature completate	Build	Deploy

Patrimonio dati	Migration	Supabase	Produzione

AI	Evoluzione modelli	Prompt e orchestrazione	Monitoraggio



PARTE V

PROJECT MANAGEMENT \& DELIVERY

CAPITOLO 52

PM-10 — Enterprise Roadmap \& Capability Maturity Planning

Evolution Planning Framework

\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_

52.1 Vision

La Roadmap definisce l’evoluzione progressiva della piattaforma SportelloScuola 2.0.

A differenza di una pianificazione esclusivamente temporale, essa adotta un approccio orientato alla maturità delle Capability, consentendo di governare la crescita del sistema in funzione del valore prodotto e della stabilità raggiunta.

Ogni evoluzione è pianificata come incremento della maturità architetturale.

\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_

52.2 Principi

La Roadmap segue cinque principi fondamentali.

Value First

Le evoluzioni sono guidate dal valore generato.

\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_

Incremental Growth

Ogni incremento consolida quanto già realizzato.

\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_

Architecture Driven

Le decisioni rispettano EMA e SAPM.

\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_

Sustainable Evolution

La crescita non deve compromettere la qualità.

\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_

Measurable Progress

Ogni livello di maturità è verificabile mediante indicatori.

\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_

52.3 Modello di maturità

SportelloScuola 2.0 adotta sei livelli di maturità.



Livello	Descrizione

Level 0	Foundation

Level 1	Operational

Level 2	Integrated

Level 3	Intelligent

Level 4	Autonomous

Level 5	Optimizing



Questi livelli rappresentano la progressiva evoluzione della piattaforma.

\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_

52.4 Livello 0 — Foundation

Obiettivo.

Costruire le fondamenta della piattaforma.

Comprende:

●	repository GitHub;

●	Supabase;

●	autenticazione;

●	database iniziale;

●	Netlify;

●	documentazione EMA e SAPM;

●	pipeline CI/CD di base;

●	gestione delle email.

Questo è il punto di partenza del progetto.

\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_

52.5 Livello 1 — Operational

Obiettivo.

Rendere la piattaforma pienamente utilizzabile.

Comprende:

●	gestione utenti;

●	workflow amministrativi;

●	documenti;

●	notifiche;

●	dashboard;

●	logging;

●	backup;

●	monitoraggio di base.

La piattaforma è operativa e stabile.

\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_

52.6 Livello 2 — Integrated

Obiettivo.

Integrare i principali servizi.

Comprende:

●	API esterne;

●	interoperabilità;

●	sincronizzazione dati;

●	ricerca avanzata;

●	monitoraggio centralizzato;

●	automazione operativa.

In questa fase il sistema diventa una piattaforma integrata.

\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_

52.7 Livello 3 — Intelligent

Obiettivo.

Introdurre l’intelligenza artificiale come componente strutturale.

Comprende:

●	AI Gateway;

●	orchestrazione dei modelli;

●	retrieval semantico;

●	Knowledge Repository;

●	valutazione delle risposte;

●	suggerimenti intelligenti.

L’AI diventa parte integrante dell’esperienza utente.

\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_

52.8 Livello 4 — Autonomous

Obiettivo.

Automatizzare progressivamente le attività ripetitive.

Comprende:

●	workflow intelligenti;

●	classificazione automatica;

●	notifiche proattive;

●	monitoraggio predittivo;

●	assistenti operativi.

L’intervento umano si concentra sulle attività a maggior valore.

\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_

52.9 Livello 5 — Optimizing

Obiettivo.

Rendere la piattaforma capace di migliorarsi nel tempo.

Comprende:

●	ottimizzazione continua;

●	analytics avanzati;

●	osservabilità completa;

●	miglioramento delle performance;

●	revisione periodica delle Capability.

La piattaforma entra in una fase di evoluzione continua.

\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_

52.10 Capability Maturity Matrix



Capability	L0	L1	L2	L3	L4	L5

Identity Management	✔	✔	✔	✔	✔	✔

Workflow	○	✔	✔	✔	✔	✔

Document Repository	○	✔	✔	✔	✔	✔

AI Gateway	○	○	○	✔	✔	✔

Knowledge Repository	○	○	✔	✔	✔	✔

Monitoring	○	✔	✔	✔	✔	✔

DevSecOps	✔	✔	✔	✔	✔	✔



Legenda:

●	✔ = Capability pienamente operativa a quel livello;

●	○ = in fase di introduzione.

\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_

52.11 Architecture Decision

ADR-RDM-001 — Capability Maturity Roadmap

L’evoluzione della piattaforma è pianificata mediante livelli di maturità architetturale anziché esclusivamente mediante scadenze temporali.

Questo approccio garantisce una crescita sostenibile e misurabile.

\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_

Enterprise Evolution Matrix



Livello	Obiettivo principale

Foundation	Costruire

Operational	Stabilizzare

Integrated	Collegare

Intelligent	Potenziare

Autonomous	Automatizzare

Optimizing	Migliorare continuamente



Architectural Traceability Matrix (ATM)



EMA	SAPM	Repository	OpenProject

Visione strategica	Livelli di maturità	Moduli implementati	Milestone

Capability	Piano evolutivo	Repository	Release

AI Strategy	Intelligent Level	AI Gateway	Epic AI

Technology	Foundation	Configurazioni	Roadmap



PARTE V

PROJECT MANAGEMENT \& DELIVERY

CAPITOLO 53

PM-11 — Portfolio Management \& Investment Governance

Lean Portfolio Management Framework

\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_

53.1 Vision

Il Portfolio Management definisce i criteri attraverso i quali vengono selezionate, priorizzate e monitorate le iniziative evolutive della piattaforma.

L’obiettivo non consiste nel gestire un elevato numero di progetti indipendenti, bensì nel garantire che ogni investimento in tempo, risorse e sviluppo contribuisca agli obiettivi strategici definiti nell’Enterprise Master Architecture.

Ogni iniziativa deve generare un beneficio concreto e misurabile.

\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_

53.2 Principi

Il governo del portfolio si basa sui seguenti principi.

Strategic Alignment

Ogni iniziativa deve essere coerente con gli obiettivi dell’EMA.

\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_

Value Orientation

Le risorse vengono assegnate alle iniziative con il maggiore valore atteso.

\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_

Incremental Investment

Le funzionalità vengono finanziate e sviluppate progressivamente.

\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_

Sustainability

L’evoluzione della piattaforma deve essere compatibile con le risorse disponibili.

\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_

Transparency

Ogni decisione deve essere documentata e motivata.

\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_

53.3 Livelli del Portfolio

Il portfolio di SportelloScuola 2.0 è organizzato su quattro livelli.



Livello	Contenuto

Strategic	Capability e Roadmap

Tactical	Epic

Operational	Feature e User Story

Execution	Task



Questa struttura consente di collegare le decisioni strategiche alle attività operative.

\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_

53.4 Categorie di investimento

Per mantenere un equilibrio nello sviluppo, le iniziative sono suddivise in quattro categorie.



Categoria	Obiettivo

Innovation	Nuove funzionalità e servizi

Operational Excellence	Miglioramento dei processi esistenti

Technical Sustainability	Riduzione del debito tecnico e aggiornamenti

Compliance \& Security	Adeguamenti normativi e sicurezza



Questa classificazione permette di evitare che tutto il tempo venga dedicato esclusivamente a nuove funzionalità, trascurando la qualità della piattaforma.

\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_

53.5 Modello di priorità

Ogni Epic viene valutato secondo cinque criteri.



&#x09;Descrizione

Valore per l’utente	Beneficio diretto

Allineamento strategico	Coerenza con EMA

Riduzione del rischio	Impatto sulla continuità operativa

Complessità tecnica	Impegno richiesto

Dipendenze	Necessità di altri interventi



La valutazione rimane qualitativa ma deve essere esplicitata nel backlog.

\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_

53.6 Capacity Planning

Per evitare il sovraccarico del team, la capacità di sviluppo viene suddivisa indicativamente come segue.



Area	Percentuale indicativa

Nuove funzionalità	50%

Miglioramenti tecnici	20%

Correzione difetti	15%

Compliance e sicurezza	10%

Innovazione e sperimentazione	5%



Queste percentuali sono linee guida e possono essere adattate in funzione della fase evolutiva del progetto.

\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_

53.7 Portfolio Review

Il portfolio viene riesaminato con cadenza periodica.

Ogni revisione comprende:

●	verifica degli obiettivi raggiunti;

●	aggiornamento delle priorità;

●	analisi dei rischi emergenti;

●	verifica dello stato delle Capability;

●	riallineamento con la Roadmap.

Le decisioni vengono documentate e conservate come parte della governance del progetto.

\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_

53.8 Key Performance Indicators

L’efficacia del portfolio viene monitorata attraverso indicatori quali:

●	percentuale di Epic completati;

●	tempo medio di rilascio;

●	tasso di completamento delle Feature;

●	riduzione del debito tecnico;

●	disponibilità della piattaforma;

●	soddisfazione degli utenti (quando misurabile).

Questi KPI supportano le decisioni senza sostituire il giudizio architetturale.

\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_

53.9 Architecture Decision

ADR-PORT-001 — Lean Portfolio Governance

SportelloScuola 2.0 adotta un modello di Lean Portfolio Management che privilegia il valore, la sostenibilità e la tracciabilità delle decisioni rispetto a una gestione burocratica del portfolio.

Ogni investimento evolutivo deve essere giustificato da benefici concreti e allineato agli obiettivi strategici della piattaforma.

\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_

Enterprise Portfolio Matrix



Livello	Oggetto	Responsabilità

Strategico	Capability	Enterprise Architecture

Pianificazione	Epic	Portfolio Management

Realizzazione	Feature	Product \& Solution Management

Esecuzione	Task	Delivery Team



Architectural Traceability Matrix (ATM)



EMA	SAPM	Repository	OpenProject

Visione	Portfolio	Moduli coinvolti	Epic

Obiettivi	Priorità	Componenti software	Feature

Governance	Portfolio Review	ADR	Milestone

Roadmap	Investimenti	Release	Backlog



PARTE V

PROJECT MANAGEMENT \& DELIVERY

CAPITOLO 54

PM-12 — Enterprise Risk Management \& Operational Resilience

Enterprise Risk Governance Framework

\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_

54.1 Vision

Il Risk Management garantisce che l’evoluzione della piattaforma avvenga entro livelli di rischio accettabili, preservando la continuità operativa, la sicurezza delle informazioni, la conformità normativa e la sostenibilità dell’architettura.

L’obiettivo non è eliminare ogni rischio, ma identificarlo tempestivamente, valutarne l’impatto e definire misure proporzionate di prevenzione e mitigazione.

Il framework di gestione dei rischi è integrato con l’Enterprise Master Architecture (EMA), con il SAPM e con il processo di rilascio continuo della piattaforma.

\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_

54.2 Principi

La gestione del rischio si fonda sui seguenti principi.

Risk by Design

La valutazione del rischio accompagna ogni decisione progettuale.

\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_

Proportionality

Le misure di mitigazione devono essere proporzionate al livello di rischio.

\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_

Continuous Assessment

Il rischio viene riesaminato durante tutto il ciclo di vita del progetto.

\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_

Traceability

Ogni rischio rilevante deve essere documentato.

\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_

Shared Responsibility

La gestione del rischio coinvolge architettura, sviluppo, sicurezza e governance.

\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_

54.3 Enterprise Risk Catalogue

Per garantire una classificazione uniforme, i rischi vengono suddivisi nelle seguenti categorie.



Codice	Categoria

RSK-ARC	Rischi Architetturali

RSK-TEC	Rischi Tecnologici

RSK-DAT	Rischi sui Dati

RSK-AI	Rischi relativi all’AI

RSK-SEC	Cybersecurity

RSK-CMP	Compliance e Normativa

RSK-OPS	Continuità Operativa

RSK-ORG	Organizzazione

RSK-VEN	Provider e Fornitori



Questa tassonomia viene utilizzata in tutti gli artefatti di progetto.

\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_

54.4 Valutazione del rischio

Ogni rischio viene analizzato secondo tre dimensioni.



Dimensione	Livelli

Probabilità	Bassa – Media – Alta

Impatto	Basso – Medio – Alto

Priorità	Bassa – Media – Alta



Per mantenere il framework semplice, non vengono adottati algoritmi complessi di scoring: la valutazione è qualitativa, ma deve essere motivata e riesaminata periodicamente.

\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_

54.5 Registro dei rischi

Ogni rischio documentato deve includere almeno:



Campo	Descrizione

Risk ID	Identificativo univoco

Categoria	Collegamento al Catalogue

Descrizione	Evento potenziale

Cause	Fattori che possono generarlo

Conseguenze	Impatti attesi

Probabilità	Livello qualitativo

Impatto	Livello qualitativo

Misure preventive	Controlli già presenti

Piano di mitigazione	Azioni previste

Owner	Responsabile del monitoraggio

Stato	Aperto, Monitorato, Mitigato, Chiuso



54.6 Principali rischi della piattaforma

Il seguente elenco rappresenta i rischi strutturali identificati in fase di progettazione.



ID	Categoria	Descrizione	Mitigazione

RSK-ARC-001	Architettura	Crescita non controllata dei componenti	ADR, riesami architetturali periodici

RSK-DAT-001	Dati	Incoerenza del database	Migration versionate e test automatici

RSK-AI-001	AI	Risposte inaccurate o allucinazioni	RAG, validazione umana, valutazione automatica delle risposte

RSK-SEC-001	Sicurezza	Accessi non autorizzati	RLS, autenticazione, auditing

RSK-CMP-001	Compliance	Evoluzione normativa (GDPR, AI Act)	Riesame periodico e aggiornamento della documentazione

RSK-OPS-001	Operatività	Interruzione dei servizi cloud	Backup, monitoraggio, procedure di ripristino

RSK-VEN-001	Fornitori	Modifiche ai servizi cloud utilizzati	Astrazione delle integrazioni, valutazione periodica dei provider



54.7 Piano di risposta

Per ogni rischio vengono previste una o più strategie.



Strategia	Descrizione

Avoid	Eliminazione della causa

Reduce	Riduzione della probabilità

Transfer	Affidamento a terzi (quando appropriato)

Accept	Accettazione consapevole del rischio



La scelta deve essere documentata nel Registro dei Rischi.

\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_

54.8 Riesame periodico

Il Registro dei Rischi viene riesaminato:

●	prima di ogni Release Major;

●	in occasione di modifiche architetturali rilevanti;

●	dopo incidenti significativi;

●	almeno una volta ogni sei mesi.

Il riesame verifica l’efficacia delle misure adottate e aggiorna il livello di esposizione al rischio.

\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_

54.9 Integrazione con EMA e SAPM

Il Risk Management non costituisce un processo separato, ma permea l’intero progetto.

Ogni rischio significativo deve poter essere ricondotto a:

●	Capability interessate;

●	Solution Building Block coinvolti;

●	Epic o Feature correlate;

●	ADR pertinenti;

●	Release interessate.

Questa tracciabilità garantisce una gestione coerente e trasparente.

\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_

54.10 Architecture Decision

ADR-RISK-001 — Enterprise Risk Governance

SportelloScuola 2.0 adotta un modello integrato di Enterprise Risk Management che considera il rischio come parte integrante del processo decisionale, dell’architettura e della governance della piattaforma.

\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_

Enterprise Risk Traceability Matrix



Ambito	Collegamento

EMA	Principi di governance

SAPM	Processi e controlli

Repository	Componenti interessati

OpenProject	Epic, Feature e Task di mitigazione

DevSecOps	Controlli automatici

Compliance	Registro dei Rischi



Architectural Traceability Matrix (ATM)



EMA	SAPM	Repository	Operatività

Sicurezza	Risk Catalogue	RLS, autenticazione	Controlli periodici

AI Governance	AI Risk	AI Gateway, Prompt	Validazione delle risposte

Patrimonio informativo	Data Risk	Migration, Backup	Ripristino

Continuità	Operational Risk	Monitoraggio	Incident Management



PARTE V

PROJECT MANAGEMENT \& DELIVERY

CAPITOLO 55

PM-13 — Enterprise Change Management \& Architecture Evolution

Controlled Change Framework

\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_

55.1 Vision

Il Change Management disciplina il processo attraverso il quale le modifiche alla piattaforma vengono proposte, valutate, approvate, implementate e monitorate.

L’obiettivo è garantire che ogni cambiamento contribuisca all’evoluzione della piattaforma senza compromettere la stabilità dell’architettura, la qualità del software o la conformità normativa.

Il cambiamento viene considerato una componente naturale del ciclo di vita del progetto e non un evento eccezionale.

\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_

55.2 Principi

Il processo di gestione delle modifiche si fonda sui seguenti principi.

Controlled Evolution

Ogni modifica deve essere governata.

\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_

Architecture First

Le decisioni devono rispettare EMA e SAPM.

\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_

Traceability

Ogni modifica deve poter essere ricondotta alle motivazioni che l’hanno generata.

\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_

Minimum Necessary Change

Si modifica solo ciò che è realmente necessario.

\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_

Continuous Learning

Ogni cambiamento costituisce un’opportunità di miglioramento della piattaforma.

\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_

55.3 Classificazione delle modifiche

Le modifiche vengono suddivise in cinque categorie.



Codice	Categoria	Esempi

CHG-ARC	Architetturali	Nuovi SBB, modifiche alle Capability

CHG-APP	Applicative	Nuove funzionalità, workflow

CHG-DAT	Dati	Migration, nuove tabelle

CHG-AI	AI	Nuovi prompt, modelli, strategie RAG

CHG-OPS	Operative	CI/CD, monitoraggio, deploy



Questa classificazione viene utilizzata nel Registro delle Modifiche.

\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_

55.4 Livelli di impatto

Ogni modifica viene classificata secondo il proprio impatto.



Livello	Descrizione

Basso	Nessun effetto sull’architettura

Medio	Coinvolge uno o più componenti

Alto	Richiede revisione architetturale

Critico	Impatta Capability o principi EMA



Le modifiche di livello Alto o Critico richiedono una revisione dedicata.

\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_

55.5 Processo di gestione

Ogni modifica segue il seguente ciclo.

Proposta

&#x20;   ↓

Analisi

&#x20;   ↓

Valutazione dell'impatto

&#x20;   ↓

Approvazione

&#x20;   ↓

Pianificazione

&#x20;   ↓

Implementazione

&#x20;   ↓

Verifica

&#x20;   ↓

Chiusura



Il processo garantisce che nessuna modifica significativa venga introdotta senza una valutazione preventiva.

\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_

55.6 Change Register

Ogni modifica viene registrata con almeno le seguenti informazioni.



Campo	Descrizione

Change ID	Identificativo

Categoria	CHG-ARC, CHG-AI, ecc.

Descrizione	Modifica proposta

Motivazione	Ragione della modifica

Impatto	Basso, Medio, Alto, Critico

Componenti coinvolti	Repository, Database, AI…

ADR collegati	Eventuali decisioni

Epic / Feature	Collegamento operativo

Stato	Proposed, Approved, Implemented, Closed



55.7 Impact Assessment

Prima dell’approvazione vengono valutati gli effetti della modifica su:

●	Enterprise Architecture;

●	Capability;

●	Solution Building Block;

●	Repository;

●	Database;

●	AI Gateway;

●	Edge Functions;

●	Sicurezza;

●	Compliance (GDPR, AI Act, accessibilità);

●	DevSecOps;

●	Documentazione.

Questo garantisce che ogni cambiamento sia valutato in modo sistematico.

\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_

55.8 Gestione delle modifiche urgenti

Le modifiche urgenti (Emergency Change) possono seguire una procedura semplificata.

Sono ammesse esclusivamente nei seguenti casi:

●	vulnerabilità di sicurezza;

●	indisponibilità del servizio;

●	perdita di dati;

●	errore critico in produzione.

Anche le modifiche urgenti devono essere documentate e riesaminate successivamente.

\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_

55.9 Riesame delle modifiche

Le modifiche concluse vengono riesaminate per verificare:

●	raggiungimento degli obiettivi;

●	eventuali effetti collaterali;

●	aggiornamento della documentazione;

●	lezioni apprese.

I risultati alimentano il miglioramento continuo della piattaforma.

\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_

55.10 Architecture Decision

ADR-CHG-001 — Controlled Architecture Evolution

SportelloScuola 2.0 adotta un modello di gestione delle modifiche orientato alla continuità architetturale. Ogni cambiamento significativo deve essere valutato in termini di impatto tecnico, organizzativo e strategico prima della sua implementazione.

\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_

Enterprise Change Matrix



Ambito	Gestione

EMA	Revisione dei principi

SAPM	Aggiornamento della soluzione

Repository	Implementazione tecnica

OpenProject	Epic, Feature, Task

GitHub	Pull Request e Release

Documentazione	Versionamento e aggiornamento



Architectural Traceability Matrix (ATM)



EMA	SAPM	Repository	Governance

Principi	Change Framework	Codice sorgente	Change Register

Capability	Impact Assessment	Componenti	Riesame

AI Governance	CHG-AI	Prompt, Gateway	Validazione

Compliance	CHG-CMP	Configurazioni	Audit



PARTE V

PROJECT MANAGEMENT \& DELIVERY

CAPITOLO 56

PM-14 — Enterprise Quality Management \& Continuous Improvement

Quality Governance Framework

\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_

56.1 Vision

La qualità rappresenta un attributo trasversale dell’intera piattaforma e deve essere garantita durante tutto il ciclo di vita del prodotto.

L’obiettivo del Quality Management non consiste esclusivamente nell’individuare difetti, ma nel costruire processi che favoriscano la realizzazione di software affidabile, sicuro, mantenibile e coerente con gli obiettivi strategici dell’organizzazione.

Il miglioramento continuo costituisce parte integrante della governance della piattaforma.

\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_

56.2 Principi

Il sistema di gestione della qualità si basa sui seguenti principi.

Quality by Design

La qualità viene progettata fin dalle prime fasi.

\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_

Prevention over Correction

È preferibile prevenire gli errori piuttosto che correggerli.

\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_

Continuous Verification

La qualità viene verificata lungo tutto il ciclo di sviluppo.

\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_

Objective Measurement

Le decisioni devono essere supportate da indicatori misurabili.

\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_

Continuous Improvement

Ogni Release rappresenta un’opportunità di miglioramento.

\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_

56.3 Ambiti della qualità

La qualità viene monitorata nei seguenti domini.



Ambito	Obiettivo

Funzionale	Correttezza delle funzionalità

Architetturale	Coerenza con EMA e SAPM

Tecnica	Qualità del codice e delle integrazioni

Dati	Accuratezza e consistenza

AI	Affidabilità e qualità delle risposte

Sicurezza	Protezione del sistema

Esperienza utente	Usabilità e accessibilità

Documentazione	Aggiornamento e completezza



56.4 Livelli di controllo

Ogni modifica viene verificata attraverso più livelli.



Livello	Controllo

Codice	Code Review

Build	Continuous Integration

Applicazione	Test automatici e manuali

Architettura	Architecture Review

Governance	Riesame periodico



Questo modello evita che la qualità dipenda da un singolo controllo.

\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_

56.5 Quality Gate

Ogni Release deve superare i seguenti Quality Gate.

QG-01

Build completata senza errori.

\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_

QG-02

Test automatici superati.

\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_

QG-03

Migrazioni del database validate.

\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_

QG-04

Edge Function verificate.

\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_

QG-05

Controlli di sicurezza completati.

\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_

QG-06

Documentazione aggiornata.

\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_

QG-07

Release Notes predisposte.

\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_

QG-08

Approvazione finale della Release.

Solo dopo il superamento di tutti i Quality Gate la Release può essere distribuita.

\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_

56.6 Indicatori di qualità

Il monitoraggio della qualità si basa su indicatori semplici e sostenibili.



Indicatore	Finalità

Disponibilità del servizio	Continuità operativa

Tempo medio di risoluzione	Efficienza operativa

Copertura dei test	Affidabilità

Errori in produzione	Stabilità

Vulnerabilità aperte	Sicurezza

Debito tecnico	Manutenibilità

Aggiornamento documentazione	Governance



Gli indicatori vengono riesaminati periodicamente.

\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_

56.7 Miglioramento continuo

Il miglioramento continuo segue il ciclo:

Osservazione

&#x20;     ↓

Misurazione

&#x20;     ↓

Analisi

&#x20;     ↓

Decisione

&#x20;     ↓

Implementazione

&#x20;     ↓

Verifica

&#x20;     ↓

Nuova osservazione



Ogni iterazione contribuisce all’evoluzione della piattaforma.

\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_

56.8 Riesami di qualità

Con frequenza almeno semestrale vengono effettuati riesami dedicati che comprendono:

●	verifica dell’architettura;

●	analisi delle metriche;

●	revisione del debito tecnico;

●	verifica della documentazione;

●	valutazione della conformità normativa;

●	stato delle Capability;

●	analisi delle lezioni apprese.

\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_

56.9 Architecture Decision

ADR-QM-001 — Enterprise Quality Governance

SportelloScuola 2.0 adotta un modello di Quality Governance integrato nel ciclo di sviluppo e di esercizio della piattaforma, basato su verifiche continue, metriche oggettive e miglioramento progressivo.

\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_

Enterprise Quality Matrix



Livello	Obiettivo

Codice	Correttezza

Applicazione	Affidabilità

Architettura	Coerenza

AI	Attendibilità

Sicurezza	Protezione

Governance	Miglioramento continuo



Architectural Traceability Matrix (ATM)



EMA	SAPM	Repository	Operatività

Principi	Quality Framework	Code Review	Quality Gate

Capability	KPI	Test	Dashboard

AI Governance	AI Quality	Prompt	Valutazione

Security	Vulnerability Review	Dipendenze	Monitoraggio



PARTE VI

GOVERNANCE DELL’IMPLEMENTAZIONE

CAPITOLO 57

GOV-01 — Enterprise Architecture Governance Framework

Governance Operating Model

\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_

57.1 Vision

L’Architecture Governance definisce l’insieme dei processi, delle responsabilità e dei controlli attraverso i quali viene garantita la coerenza tra la visione strategica descritta nell’Enterprise Master Architecture (EMA), la progettazione operativa definita nel SAPM e l’effettiva implementazione della piattaforma.

La governance non costituisce un’attività separata dallo sviluppo, ma rappresenta un processo continuo che accompagna l’intero ciclo di vita di SportelloScuola 2.0.

\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_

57.2 Obiettivi

La governance dell’implementazione persegue i seguenti obiettivi.

●	Garantire la coerenza architetturale.

●	Salvaguardare la qualità della piattaforma.

●	Assicurare la conformità normativa.

●	Favorire la sostenibilità evolutiva.

●	Ridurre il debito tecnico.

●	Migliorare la tracciabilità delle decisioni.

●	Supportare il miglioramento continuo.

\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_

57.3 Principi di Governance

La governance della piattaforma si basa sui seguenti principi.

Architecture First

Le decisioni vengono valutate rispetto all’EMA.

\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_

Documentation as Code

La documentazione evolve insieme al codice.

\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_

Governance by Evidence

Le decisioni devono essere supportate da dati oggettivi.

\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_

Minimum Bureaucracy

La governance deve semplificare il lavoro, non rallentarlo.

\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_

Continuous Architecture

L’architettura viene aggiornata progressivamente.

\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_

57.4 Livelli di Governance

La piattaforma distingue cinque livelli.



Livello	Responsabilità

Strategico	EMA

Architetturale	SAPM

Gestionale	OpenProject

Tecnico	Repository GitHub

Operativo	Deploy e monitoraggio



Ogni livello utilizza strumenti differenti ma condivide gli stessi principi.

\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_

57.5 Enterprise Governance Cycle

L’intero progetto segue il seguente ciclo.

Visione



↓



Architettura



↓



Pianificazione



↓



Sviluppo



↓



Test



↓



Deploy



↓



Monitoraggio



↓



Feedback



↓



Miglioramento



↓



Nuova Visione



Questo ciclo rappresenta il modello permanente di evoluzione della piattaforma.

\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_

57.6 Governance Review

Con cadenza almeno semestrale viene effettuato un riesame completo che comprende:

Architettura

●	verifica dell’allineamento EMA-SAPM.

Repository

●	analisi della struttura del codice.

Database

●	verifica dello schema dati.

AI

●	valutazione dei prompt e del RAG.

DevSecOps

●	pipeline.

Documentazione

●	aggiornamento di tutti gli artefatti.

Compliance

●	GDPR

●	AI Act

●	Accessibilità

●	Sicurezza.

Roadmap

●	stato delle Capability.

\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_

57.7 Decision Authority Matrix

Per evitare processi eccessivamente burocratici, vengono definiti i livelli decisionali.



Decisione	Responsabile

Refactoring locale	Developer

Nuovo Task	Developer

Nuova User Story	Product Owner

Nuova Feature	Product Owner

Nuovo Epic	Architecture Review

Nuova Capability	Enterprise Architect

Modifica EMA	Enterprise Architect

Cambio Provider	Architecture Board

Nuova AI Strategy	Architecture Review



Nel contesto attuale di SportelloScuola 2.0, dove il progetto è gestito prevalentemente da un’unica persona, questi ruoli possono essere ricoperti dalla stessa figura. La distinzione rimane comunque utile perché rende il modello immediatamente scalabile qualora il team cresca.

\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_

57.8 Enterprise Governance Repository (EGR)

Tutti gli artefatti di governance sono raccolti in un repository documentale organizzato.

L’EGR comprende:

●	Enterprise Master Architecture;

●	SAPM;

●	ADR;

●	EDR;

●	Risk Register;

●	Change Register;

●	Quality Register;

●	Capability Catalogue;

●	SBB Catalogue;

●	Template;

●	Checklist;

●	Standard documentali.

Questo repository costituisce la memoria istituzionale della piattaforma.

\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_

57.9 Architecture Decision

ADR-GOV-001 — Continuous Architecture Governance

SportelloScuola 2.0 adotta un modello di governance continua, nel quale architettura, sviluppo, documentazione e gestione operativa evolvono in modo coordinato attraverso processi di revisione periodica, tracciabilità delle decisioni e miglioramento continuo.

\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_

Enterprise Governance Matrix



Dominio	Artefatto	Frequenza di revisione

Strategia	EMA	Annuale o per cambiamenti significativi

Soluzione	SAPM	Semestrale

Architettura	ADR	Al bisogno

Decisioni	EDR	Al bisogno

Rischi	Risk Register	Semestrale

Modifiche	Change Register	Continuo

Qualità	KPI e Dashboard	Trimestrale

Roadmap	Capability Maturity	Semestrale



Architectural Traceability Matrix (ATM)





EMA	SAPM	Repository	Governance

Principi	Processi	Codice	Review

Capability	SBB	Moduli	Release

Visione	Roadmap	GitHub	Portfolio

Governance	Registri	OpenProject	Audit



PARTE VI

GOVERNANCE DELL’IMPLEMENTAZIONE

CAPITOLO 58

GOV-02 — Enterprise Operating Model

Daily Operational Governance

\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_

58.1 Vision

L’Operating Model definisce il modo in cui SportelloScuola 2.0 viene gestito quotidianamente.

L’obiettivo è trasformare l’architettura progettata nell’EMA e nel SAPM in un insieme di pratiche operative semplici, ripetibili e sostenibili.

Ogni attività, dalla progettazione al rilascio, segue un flusso standardizzato che riduce la complessità e garantisce la qualità della piattaforma.

\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_

58.2 Principi Operativi

Il modello operativo si basa su sei principi.

Single Source of Truth

Ogni informazione deve avere una sola fonte ufficiale.

●	Codice → Repository GitHub.

●	Architettura → EMA e SAPM.

●	Pianificazione → OpenProject.

●	Configurazioni → Repository.

●	Database → Migration versionate.

●	Decisioni → ADR ed EDR.

\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_

Documentation as Code

Ogni modifica al codice deve essere accompagnata, quando necessario, dall’aggiornamento della documentazione.

\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_

Small Increment

Le modifiche devono essere piccole, frequenti e facilmente verificabili.

\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_

Continuous Validation

Ogni incremento viene validato prima dell’integrazione.

\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_

Architecture Awareness

Ogni sviluppatore deve comprendere l’impatto architetturale delle modifiche.

\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_

Sustainable Development

Le scelte progettuali devono privilegiare la manutenibilità nel lungo periodo.

\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_

58.3 Ciclo operativo quotidiano

Il flusso operativo standard è il seguente.

Nuova esigenza

&#x20;       ↓

Analisi

&#x20;       ↓

Epic (se necessario)

&#x20;       ↓

Feature

&#x20;       ↓

User Story

&#x20;       ↓

Task

&#x20;       ↓

Branch Git

&#x20;       ↓

Sviluppo

&#x20;       ↓

Test

&#x20;       ↓

Pull Request

&#x20;       ↓

Review

&#x20;       ↓

Merge

&#x20;       ↓

Deploy

&#x20;       ↓

Aggiornamento documentazione



Questo ciclo rappresenta il percorso ordinario di ogni evoluzione della piattaforma.

\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_

58.4 Regole operative

Ogni sviluppo deve rispettare le seguenti regole.

Nessuna modifica senza tracciabilità.

Ogni intervento deve essere collegato almeno a:

●	User Story;

●	Task;

●	Commit.

\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_

Nessuna Migration manuale.

Ogni modifica al database deve essere eseguita mediante migration versionate.

\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_

Nessun Deploy diretto.

Ogni rilascio deve transitare attraverso la pipeline definita.

\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_

Nessuna Decisione Architetturale implicita.

Le modifiche rilevanti devono essere documentate tramite ADR.

\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_

Nessuna documentazione obsoleta.

Il repository documentale deve evolvere insieme al software.

\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_

58.5 Ciclo di una nuova funzionalità

Ogni nuova funzionalità segue il seguente percorso.

Idea



↓



Capability



↓



Epic



↓



Feature



↓



User Story



↓



Task



↓



Repository



↓



Testing



↓



Release



↓



Roadmap aggiornata



58.6 Gestione delle priorità

Le attività vengono affrontate secondo il seguente ordine.

1\.	Sicurezza.

2\.	Disponibilità del servizio.

3\.	Correzione difetti critici.

4\.	Compliance.

5\.	Debito tecnico.

6\.	Nuove funzionalità.

7\.	Ottimizzazioni.

Questa gerarchia garantisce la sostenibilità della piattaforma.

\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_

58.7 Gestione della documentazione

Ogni Release deve verificare l’aggiornamento di:

●	EMA (solo se necessario);

●	SAPM;

●	ADR;

●	EDR;

●	Risk Register;

●	Change Register;

●	Roadmap;

●	Release Notes.

\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_

58.8 Checklist Operativa

Prima della chiusura di ogni Feature deve essere verificato che:

●	i Task siano completati;

●	i test superati;

●	la documentazione aggiornata;

●	gli ADR redatti (se necessari);

●	le migration validate;

●	le Edge Function distribuite;

●	le Release Notes predisposte.

\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_

58.9 Architecture Decision

ADR-OPS-001 — Standard Operating Model

SportelloScuola 2.0 adotta un modello operativo unico e condiviso che definisce il flusso standard di lavoro, dalla nascita di una nuova esigenza fino al rilascio in produzione, garantendo uniformità, tracciabilità e qualità.

\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_

Enterprise Operating Matrix



Processo	Strumento principale

Pianificazione	OpenProject

Codice	GitHub

Backend	Supabase

Frontend	React + Netlify

AI	AI Gateway

Documentazione	Enterprise Documentation Repository

Monitoraggio	Stack di osservabilità definito nel SAPM



Architectural Traceability Matrix (ATM)



Esigenza	Artefatto	Implementazione	Governance

Nuovo requisito	Epic	Repository	OpenProject

Evoluzione funzionale	Feature	Codice	Release

Modifica tecnica	Task	Pull Request	Code Review

Decisione strategica	ADR / EDR	SAPM	Governance Review



PARTE VI

GOVERNANCE DELL’IMPLEMENTAZIONE

CAPITOLO 59

GOV-03 — Architecture Compliance \& Conformance Management

Enterprise Architecture Compliance Framework

\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_

59.1 Vision

L’Architecture Compliance garantisce che l’evoluzione della piattaforma rimanga coerente con i principi definiti nell’Enterprise Master Architecture (EMA) e con le decisioni operative documentate nel SAPM.

L’obiettivo non è limitare l’innovazione, ma assicurare che ogni evoluzione contribuisca alla crescita ordinata del sistema, evitando deviazioni architetturali che potrebbero compromettere la qualità, la sicurezza o la sostenibilità della piattaforma.

La conformità architetturale è considerata un processo continuo e non un’attività occasionale.

\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_

59.2 Obiettivi

Il framework persegue i seguenti obiettivi:

●	verificare il rispetto dei principi architetturali;

●	ridurre il rischio di debito tecnico;

●	garantire la coerenza tra codice e documentazione;

●	assicurare l’allineamento con EMA e SAPM;

●	facilitare l’evoluzione controllata della piattaforma.

\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_

59.3 Principi

Architecture before Code

Ogni modifica significativa deve essere valutata rispetto all’architettura prima della sua implementazione.

\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_

Compliance by Design

La conformità viene verificata durante tutto il ciclo di sviluppo e non solo al termine.

\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_

Evidence Based Review

Ogni valutazione deve essere supportata da evidenze documentate.

\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_

Continuous Alignment

Repository, documentazione e piattaforma devono evolvere in modo sincronizzato.

\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_

59.4 Ambiti di verifica

Le verifiche di conformità riguardano tutti i principali domini della piattaforma.



Dominio	Oggetto della verifica

Business	Allineamento con gli obiettivi dell’EMA

Applicativo	Coerenza dei componenti software

Dati	Modello dati, migration e RLS

AI	Prompt, RAG, orchestrazione e governance

Sicurezza	Controlli, autenticazione e autorizzazioni

DevSecOps	Pipeline CI/CD e automazioni

Documentazione	Aggiornamento degli artefatti

Governance	ADR, EDR, registri e roadmap



59.5 Compliance Review

Ogni revisione architetturale verifica almeno i seguenti aspetti.

Repository

●	struttura coerente;

●	convenzioni rispettate;

●	modularità.

\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_

Database

●	migration versionate;

●	consistenza dello schema;

●	policy RLS aggiornate.

\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_

Frontend

●	rispetto dell’architettura React;

●	componenti riutilizzabili;

●	accessibilità.

\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_

Backend

●	Edge Function coerenti;

●	API documentate;

●	gestione degli errori uniforme.

\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_

AI

●	Prompt Register aggiornato;

●	modelli autorizzati;

●	Knowledge Repository coerente.

\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_

Documentazione

●	EMA;

●	SAPM;

●	ADR;

●	EGR;

●	Release Notes.

\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_

59.6 Livelli di conformità

Per semplificare la gestione, viene adottato un modello qualitativo.



Livello	Significato

Conforme	Nessuna azione richiesta

Conforme con osservazioni	Miglioramenti consigliati

Parzialmente conforme	Interventi pianificati

Non conforme	Azione correttiva obbligatoria



59.7 Non Conformità Architetturali

Ogni non conformità deve essere registrata indicando:

●	identificativo;

●	descrizione;

●	componente interessato;

●	livello di impatto;

●	rischio associato;

●	piano di correzione;

●	responsabile;

●	data prevista di risoluzione.

Le non conformità vengono monitorate fino alla loro chiusura.

\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_

59.8 Riesami di conformità

La verifica viene effettuata:

●	prima di ogni Release Major;

●	durante i riesami semestrali;

●	in seguito a modifiche architetturali rilevanti;

●	in occasione di audit interni.

\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_

59.9 Architecture Decision

ADR-COMP-001 — Continuous Architecture Compliance

SportelloScuola 2.0 adotta un modello di verifica continua della conformità architetturale, integrato nel ciclo di sviluppo e di rilascio, con l’obiettivo di preservare la coerenza tra strategia, progettazione e implementazione.

\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_

Enterprise Compliance Matrix



Artefatto	Controllo

EMA	Allineamento strategico

SAPM	Coerenza progettuale

Repository	Implementazione

ADR	Decisioni

EGR	Governance

OpenProject	Pianificazione

Release	Distribuzione



Architectural Traceability Matrix (ATM)



EMA	SAPM	Repository	Compliance

Principi	Processi	Codice	Review

Capability	SBB	Componenti	Audit

AI Strategy	AI Gateway	Prompt	Validazione

Security	DevSecOps	Pipeline	Controlli



PARTE VI

GOVERNANCE DELL’IMPLEMENTAZIONE

CAPITOLO 60

GOV-04 — Enterprise Architecture Review Process

Continuous Architecture Review Framework

\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_

60.1 Vision

L’Architecture Review rappresenta il processo mediante il quale vengono valutate le modifiche significative della piattaforma prima della loro integrazione nel sistema.

L’obiettivo è verificare che ogni evoluzione sia coerente con:

●	l’Enterprise Master Architecture;

●	il SAPM;

●	gli Architecture Decision Record;

●	i principi di qualità;

●	la roadmap evolutiva della piattaforma.

L’Architecture Review non costituisce un controllo burocratico, ma uno strumento di miglioramento continuo.

\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_

60.2 Principi

Il processo segue i seguenti principi.

Lightweight Governance

Le revisioni devono essere rapide.

\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_

Architecture before Implementation

Le modifiche più importanti vengono analizzate prima dello sviluppo.

\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_

Evidence Based Review

Ogni decisione deve essere motivata.

\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_

Shared Learning

Ogni review migliora il patrimonio conoscitivo della piattaforma.

\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_

Continuous Improvement

Ogni review aggiorna EMA, SAPM, ADR ed EGR quando necessario.

\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_

60.3 Livelli di Review

Il framework distingue tre livelli.



Livello	Quando

Light Review	Feature significative

Release Review	Prima di ogni Release Major o Minor

Strategic Review	Riesame semestrale della piattaforma



Questa articolazione garantisce un equilibrio tra controllo e agilità.

\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_

60.4 Light Review

La Light Review riguarda modifiche che possono influenzare uno o più componenti dell’architettura.

Sono verificati:

●	coerenza con il SAPM;

●	impatto sul database;

●	impatto sulle Edge Function;

●	aggiornamento della documentazione;

●	eventuale necessità di un ADR.

La revisione viene normalmente svolta contestualmente alla Pull Request.

\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_

60.5 Release Review

Prima di ogni Release significativa viene verificato:

●	completamento degli Epic;

●	Quality Gate;

●	Risk Register;

●	Change Register;

●	documentazione aggiornata;

●	conformità architetturale;

●	piano di rollback.

Solo dopo esito positivo la Release viene autorizzata.

\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_

60.6 Strategic Review

Con frequenza almeno semestrale viene effettuato un riesame complessivo della piattaforma.

La revisione comprende:

Strategia

●	verifica dell’EMA.

\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_

Architettura

●	verifica del SAPM.

\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_

Repository

●	qualità del codice.

\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_

Database

●	evoluzione del modello dati.

\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_

AI

●	stato dei modelli;

●	Prompt Register;

●	pipeline RAG.

\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_

Governance

●	ADR;

●	EGR;

●	Roadmap;

●	KPI.

\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_

DevSecOps

●	pipeline;

●	sicurezza;

●	monitoraggio.

\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_

60.7 Output della Review

Ogni review produce uno o più risultati.



Output	Finalità

Nessuna azione	Architettura conforme

Raccomandazione	Miglioramento suggerito

ADR	Decisione architetturale

Change Request	Modifica pianificata

Risk Update	Aggiornamento dei rischi

SAPM Update	Aggiornamento documentale



60.8 Checklist della Review

Ogni review verifica almeno:

✓ Coerenza con EMA.

✓ Coerenza con SAPM.

✓ Aggiornamento ADR.

✓ Aggiornamento registri.

✓ Impatto AI.

✓ Impatto sicurezza.

✓ Impatto database.

✓ Impatto DevSecOps.

✓ Aggiornamento documentazione.

✓ Piano di test.

\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_

60.9 Architecture Decision

ADR-REV-001 — Continuous Architecture Review

SportelloScuola 2.0 adotta un processo di revisione architetturale continuo, articolato su tre livelli progressivi, al fine di garantire la coerenza tra strategia, progettazione e implementazione senza introdurre complessità organizzativa non necessaria.

\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_

Enterprise Review Matrix



Review	Frequenza	Obiettivo

Light Review	Ad ogni Feature rilevante	Validare modifiche locali

Release Review	Prima di ogni Release	Validare il rilascio

Strategic Review	Semestrale	Riesame complessivo della piattaforma



Architectural Traceability Matrix (ATM)



EMA	SAPM	Repository	Review

Principi	Solution	Codice	Light Review

Capability	Epic	Feature	Release Review

Visione	Roadmap	Repository	Strategic Review

Governance	Registri	Documentazione	Audit



PARTE VI

GOVERNANCE DELL’IMPLEMENTAZIONE

CAPITOLO 61

GOV-05 — Enterprise Documentation Standard (EDS)

Enterprise Documentation Architecture (EDA)

\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_

61.1 Vision

La documentazione costituisce parte integrante dell’architettura della piattaforma.

Ogni documento rappresenta un artefatto di progetto con uno specifico ciclo di vita, un responsabile, una finalità e un collegamento esplicito con gli altri elementi dell’ecosistema.

L’obiettivo dell’Enterprise Documentation Standard è garantire che la conoscenza prodotta durante l’intero ciclo di vita della piattaforma rimanga coerente, aggiornata, facilmente reperibile e tracciabile.

\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_

61.2 Principi

La gestione documentale segue i seguenti principi.

Single Source of Truth

Ogni informazione deve avere un’unica fonte ufficiale.

\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_

Documentation by Design

La documentazione nasce insieme al software.

\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_

Documentation as Code

La documentazione viene versionata nel repository Git.

\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_

Traceability

Ogni documento deve poter essere collegato a:

●	EMA;

●	SAPM;

●	ADR;

●	Repository;

●	OpenProject.

\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_

Evoluzione Continua

La documentazione evolve insieme alla piattaforma.

\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_

61.3 Classificazione documentale

La documentazione viene suddivisa in cinque livelli.



Livello	Tipologia	Frequenza aggiornamento

Strategic	EMA	Molto bassa

Architectural	SAPM	Bassa

Decisionale	ADR	Continua

Governance	EGR	Continua

Tecnica	Guide e Manuali	Frequente



Questa classificazione determina il ciclo di vita dei documenti.

\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_

61.4 Enterprise Documentation Repository

L’intera documentazione è organizzata secondo una struttura unificata.

/docs

│

├── 01-strategy

│   ├── EMA

│   ├── Vision

│   ├── Roadmap

│   └── Principles

│

├── 02-architecture

│   ├── SAPM

│   ├── Architecture Diagrams

│   ├── Data Architecture

│   └── AI Architecture

│

├── 03-decisions

│   ├── ADR

│   └── Decision Index

│

├── 04-governance

│   ├── EGR

│   ├── Risk Register

│   ├── Change Register

│   ├── Quality Register

│   ├── Capability Register

│   └── Review Log

│

├── 05-development

│   ├── EDH

│   ├── Coding Standards

│   ├── Prompt Engineering

│   ├── API Standards

│   └── Database Standards

│

├── 06-operations

│   ├── Runbook

│   ├── Playbook

│   ├── Incident Response

│   └── Backup

│

├── 07-api

│

├── 08-security

│

├── 09-ai

│

└── 10-templates



Questa struttura rappresenta il modello documentale di riferimento.

\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_

61.5 Ciclo di vita dei documenti

Ogni documento attraversa quattro stati.



Stato	Descrizione

Draft	In elaborazione

Approved	Approvato

Active	Documento di riferimento

Archived	Non più vigente



Il passaggio di stato viene registrato nel repository.

\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_

61.6 Convenzioni di Naming

Ogni documento utilizza una nomenclatura uniforme.

Esempi.

EMA-v1.0.md



SAPM-v1.0.md



ADR-001.md



ADR-002.md



RR-001.xlsx



CR-001.xlsx



EDH-v1.0.md



RUNBOOK-DEPLOY.md



PLAYBOOK-INCIDENT.md



Questa convenzione facilita la ricerca e la tracciabilità.

\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_

61.7 Relazioni documentali

Ogni documento deve dichiarare i propri collegamenti.



Documento	Collegamenti principali

EMA	SAPM

SAPM	ADR

ADR	Repository

EGR	OpenProject

EDH	Repository

Runbook	DevSecOps



Questo consente la navigazione tra gli artefatti.

\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_

61.8 Documentazione obbligatoria

Per ogni Release devono risultare aggiornati almeno:

●	SAPM (se necessario);

●	ADR interessati;

●	Change Register;

●	Release Notes;

●	Documentazione tecnica modificata.

L’EMA viene aggiornato esclusivamente in presenza di modifiche strategiche.

\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_

61.9 Architecture Decision

ADR-DOC-001 — Enterprise Documentation Standard

SportelloScuola 2.0 adotta un modello documentale strutturato, versionato e integrato nel ciclo di sviluppo, al fine di garantire la conservazione della conoscenza, la tracciabilità delle decisioni e la continuità evolutiva della piattaforma.

\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_

Enterprise Documentation Matrix



Documento	Ruolo	Frequenza

EMA	Strategia	Annuale

SAPM	Architettura	Semestrale

ADR	Decisioni	Continuo

EGR	Governance	Continuo

EDH	Standard di sviluppo	Al bisogno

Runbook	Operazioni	Al bisogno



Architectural Traceability Matrix (ATM)





EMA	SAPM	ADR	EGR	Repository

Visione	Soluzione	Decisioni	Registri	Codice

Capability	SBB	Architettura	KPI	Moduli

Roadmap	Release	Provider	Rischi	Commit

Governance	Processi	AI	Audit	Pull Request



PARTE VI

GOVERNANCE DELL’IMPLEMENTAZIONE

CAPITOLO 62

GOV-06 — SAPM Closing Model \& Enterprise Operating Handbook

Enterprise Operating Handbook

\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_

62.1 Finalità

Il presente capitolo definisce il modello operativo permanente attraverso il quale SportelloScuola 2.0 viene progettato, sviluppato, mantenuto ed evoluto.

L’obiettivo è garantire la continuità dell’architettura e la conservazione della conoscenza prodotta durante l’intero ciclo di vita della piattaforma.

Il SAPM conclude così la propria funzione di documento progettuale e assume il ruolo di manuale operativo permanente.

\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_

62.2 Il ciclo di vita della piattaforma

Ogni evoluzione della piattaforma segue il seguente ciclo.

Nuova esigenza

&#x20;     ↓

Valutazione strategica (EMA)

&#x20;     ↓

Progettazione (SAPM)

&#x20;     ↓

Decisione (ADR)

&#x20;     ↓

Pianificazione (OpenProject)

&#x20;     ↓

Implementazione (Repository)

&#x20;     ↓

Verifica (Quality + Review)

&#x20;     ↓

Release

&#x20;     ↓

Aggiornamento EGR

&#x20;     ↓

Miglioramento continuo



Questo modello rappresenta il ciclo di vita ufficiale della piattaforma.

\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_

62.3 Ruolo dei documenti

L’ecosistema documentale è composto dai seguenti artefatti.



Documento	Funzione

EMA	Visione strategica

SAPM	Manuale di implementazione

ADR	Decisioni architetturali

EGR	Registri di governance

EDH	Manuale di sviluppo



Ogni documento svolge una funzione distinta e complementare.

\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_

62.4 Aggiornamento dei documenti

Le modifiche vengono propagate secondo le seguenti regole.

Cambia la Visione

↓

Aggiornare EMA

↓

Verificare SAPM

↓

Aggiornare Roadmap

\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_

Cambia l’Architettura

↓

Nuovo ADR

↓

Aggiornare SAPM

↓

Aggiornare EGR

\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_

Cambia il Codice

↓

Repository

↓

Documentazione tecnica

↓

Aggiornamento eventuali ADR

\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_

Cambia la Governance

↓

Aggiornare EGR

↓

Aggiornare SAPM

\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_

62.5 Enterprise Knowledge Flow

La conoscenza viene prodotta e mantenuta attraverso il seguente flusso.

Visione



↓



Decisioni



↓



Progettazione



↓



Implementazione



↓



Esperienza



↓



Conoscenza



↓



Nuova Visione



La piattaforma evolve quindi attraverso un processo di apprendimento continuo.

\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_

62.6 Responsabilità

Nel modello attuale di SportelloScuola 2.0 le responsabilità possono essere concentrate nella stessa figura.

La distinzione tra ruoli viene tuttavia mantenuta per favorire la futura crescita del progetto.



Ruolo	Responsabilità

Enterprise Architect	EMA

Solution Architect	SAPM

Product Owner	Roadmap

Developer	Repository

Governance Manager	EGR

AI Architect	AI Strategy



62.7 Principi permanenti

L’intera piattaforma viene governata secondo i seguenti principi.

●	semplicità;

●	modularità;

●	riuso;

●	sicurezza;

●	tracciabilità;

●	qualità;

●	sostenibilità;

●	evoluzione continua.

Questi principi rappresentano il riferimento permanente per ogni decisione progettuale.

\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_

62.8 Architecture Decision

ADR-SAPM-001 — Living Architecture

SportelloScuola 2.0 adotta un modello di architettura vivente, nel quale documentazione, codice, governance e processi evolvono congiuntamente lungo l’intero ciclo di vita della piattaforma.

\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_

Enterprise Knowledge Matrix



Livello	Documento	Obiettivo

Strategia	EMA	Definire la direzione

Soluzione	SAPM	Tradurre la strategia

Decisioni	ADR	Motivare le scelte

Governance	EGR	Controllare l’evoluzione

Sviluppo	EDH	Standardizzare il lavoro



Enterprise Lifecycle Matrix



Evento	Documento coinvolto

Nuova Visione	EMA

Nuova Capability	EMA + SAPM

Nuova Architettura	SAPM + ADR

Nuova Tecnologia	ADR + EGR

Nuova Release	SAPM + EGR

Nuovo Standard	EDH

Audit	EGR

Riesame Strategico	EMA



Architectural Traceability Matrix (ATM)



Esigenza	Documento	Implementazione	Governance

Visione	EMA	SAPM	ADR

Decisione	ADR	Repository	EGR

Evoluzione	SAPM	Codice	Review

Operatività	EDH	Team	Governance







