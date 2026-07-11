SPORTELLOSCUOLA 2.0

ENTERPRISE MASTER ARCHITECTURE (EMA)

Versione 1.0

Documento Fondativo Ufficiale

\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_

PREFAZIONE

Lo scopo di questo documento

Questo documento rappresenta l’architettura ufficiale di SportelloScuola 2.0.

Non descrive solamente funzionalità.

Definisce:

●	la filosofia della piattaforma;

●	le regole architetturali;

●	la governance dei dati;

●	la governance dell’AI;

●	i principi di sviluppo;

●	le modalità di evoluzione futura;

●	gli standard qualitativi;

●	le responsabilità di ogni modulo.

Ogni futura implementazione dovrà essere conforme a questo documento.

Qualsiasi nuova funzionalità dovrà essere compatibile con quanto definito in questa architettura.

\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_

PRINCIPIO FONDAMENTALE N.1

Single Source of Truth (SSOT)

Ogni informazione deve esistere una sola volta.

Mai duplicazioni.

Mai copie.

Mai database paralleli.

Esempi.

Una scuola.

↓

Una sola scheda.

Una provincia.

↓

Una sola scheda.

Una normativa.

↓

Una sola scheda.

Una FAQ.

↓

Una sola scheda.

Una nomina.

↓

Una sola scheda.

Una News.

↓

Una sola scheda.

Una guida.

↓

Una sola scheda.

Qualunque modulo utilizza solamente riferimenti.

Mai copie.

\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_

PRINCIPIO N.2

Modularità assoluta

Ogni modulo ha una sola responsabilità.

Mai responsabilità condivise.

Mai sovrapposizioni.

Esempio.

National Recruitment Intelligence

↓

Gestisce esclusivamente il reclutamento.

Mai FAQ.

Mai normativa.

Mai news.

\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_

Knowledge Repository

↓

Gestisce esclusivamente la conoscenza.

Mai crawling.

Mai dashboard.

Mai AI.

\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_

AI Core

↓

Fa solamente ragionamento.

Mai storage.

Mai crawling.

Mai scraping.

Mai pubblicazione.

\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_

PRINCIPIO N.3

Knowledge First

La piattaforma non memorizza documenti.

Memorizza conoscenza.

Ogni PDF.

Ogni decreto.

Ogni nota.

Ogni interpello.

Ogni nomina.

Ogni news.

Viene trasformata.

In conoscenza strutturata.

PRINCIPIO N.4

Event Driven Architecture

Ogni modifica genera un evento.

Nuova nomina.

↓

Evento.

Nuova news.

↓

Evento.

Nuovo interpello.

↓

Evento.

Nuova normativa.

↓

Evento.

L’evento aggiorna automaticamente tutti i moduli interessati.

\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_

PRINCIPIO N.5

Zero Ridondanza

Se una funzione esiste.

Esiste una sola volta.

Mai duplicata.

Esempio.

Ricerca.

↓

Una sola.

Dashboard.

↓

Una sola.

Calendario.

↓

Uno solo.

Notifiche.

↓

Un solo sistema.

FAQ.

↓

Un solo repository.

\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_

PRINCIPIO N.6

Explainability

Ogni risposta fornita dalla piattaforma deve poter spiegare:

●	da dove proviene il dato;

●	quando è stato aggiornato;

●	quale fonte lo supporta;

●	quale versione è stata utilizzata;

●	quando è stata effettuata l’ultima verifica.

Questo principio vale per AI, ricerca, normativa, news, nomine e interpelli.

\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_

PRINCIPIO N.7

Scalabilità infinita

Ogni modulo deve poter essere sostituito.

Aggiornato.

Duplicato.

Scalato.

Senza interrompere gli altri.

\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_

PRINCIPIO N.8

Fail Safe

Qualunque errore.

Non deve mai bloccare la piattaforma.

Se un crawler si interrompe.

↓

Il resto continua.

Se il motore AI non è disponibile.

↓

Interviene un sistema di fallback.

Se una fonte cambia URL.

↓

Il monitoraggio continua e segnala l’anomalia.

\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_

PRINCIPIO N.9

User First

Ogni funzionalità dovrà rispondere almeno ad uno dei seguenti obiettivi.

Ridurre il tempo.

↓

Ridurre gli errori.

↓

Ridurre la frammentazione.

↓

Aumentare l’affidabilità.

↓

Aumentare il valore per l’utente.

Se non soddisfa almeno uno di questi obiettivi, non entra nella piattaforma.

\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_

LA MISSIONE

La missione della piattaforma è definita nel Capitolo 1, Sezione 1.1.

\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_

LA VISIONE 2035

La visione della piattaforma è definita nel Capitolo 1, Sezione 1.1.

\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_

LE QUATTRO LEGGI DELL’ECOSISTEMA

Queste saranno immutabili.

Legge 1

Ogni informazione nasce una sola volta.

Legge 2

Ogni informazione è collegata.

Legge 3

Ogni informazione è verificabile.

Legge 4

Ogni informazione migliora automaticamente tutta la piattaforma.

\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_

CONCLUSIONE DELLA PREFAZIONE

Con questo documento termina definitivamente la fase di ideazione e inizia la fase di ingegnerizzazione.

Da questo momento ogni capitolo avrà lo stesso livello di rigore di una specifica tecnica enterprise e sarà progettato per essere:

●	coerente con tutti i capitoli precedenti;

●	privo di sovrapposizioni;

●	scalabile;

●	testabile;

●	implementabile da un team di sviluppo;

●	sostenibile nel lungo periodo.

Una proposta metodologica aggiuntiva

Per rendere questo progetto davvero di livello enterprise, introdurrei un’ulteriore regola che applicheremo fin dal prossimo capitolo:

Ogni decisione architetturale dovrà essere valutata attraverso quattro prospettive obbligatorie:

1\.	Valore per l’utente (risolve davvero un problema?).

2\.	Sostenibilità tecnica (è semplice da mantenere e scalare?).

3\.	Affidabilità dei dati (garantisce tracciabilità e verificabilità?).

4\.	Vantaggio competitivo (è difficile da replicare dai concorrenti?).

Questo filtro ci impedirà di inserire funzionalità “interessanti” ma poco utili e manterrà l’intera architettura coerente con la missione della piattaforma.

Da qui inizieremo la Parte I – Fondazioni, seguendo rigorosamente l’ordine stabilito e costruendo prima le basi dell’ecosistema, poi i motori di conoscenza, quindi l’esperienza utente e infine gli strumenti operativi. Solo così potremo realizzare una piattaforma realmente solida, evolutiva e destinata a diventare un riferimento nazionale.

SPORTELLOSCUOLA 2.0

ENTERPRISE MASTER ARCHITECTURE (EMA)

PARTE I — FONDAZIONI

CAPITOLO 1

ENTERPRISE PLATFORM VISION

La filosofia architetturale dell’intero ecosistema

\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_

1.1 SCOPO DELLA PIATTAFORMA

Problema

Il sistema scolastico italiano presenta una forte frammentazione delle informazioni. Docenti, personale ATA, dirigenti e aspiranti sono costretti a consultare numerosi portali per reperire notizie, normativa, interpelli, nomine e servizi.

Le conseguenze sono:

●	perdita di tempo;

●	informazioni duplicate o incoerenti;

●	difficoltà nell’individuare la fonte ufficiale;

●	rischio di errori interpretativi;

●	scarsa integrazione tra i servizi disponibili.

\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_

Missione

SportelloScuola 2.0 nasce per diventare l’hub digitale nazionale che raccoglie, verifica, collega e rende comprensibili tutte le informazioni ufficiali di interesse per il personale della scuola.

L’obiettivo non è sostituire le fonti istituzionali, ma renderle più accessibili, navigabili e interconnesse.

\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_

Visione

Diventare entro il 2035 la piattaforma di riferimento per il personale scolastico italiano, offrendo un ecosistema digitale unico basato su dati ufficiali, strumenti intelligenti e supporto operativo.

\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_

1.2 I PROBLEMI CHE LA PIATTAFORMA RISOLVE

Ogni funzionalità dovrà essere riconducibile ad almeno uno dei seguenti problemi.



Problema	Stato attuale	Obiettivo

Frammentazione delle fonti	Decine di siti da consultare	Una sola piattaforma

Difficoltà di ricerca	PDF e pagine sparse	Ricerca unificata

Mancanza di collegamenti	Ogni informazione è isolata	Knowledge Graph

Aggiornamenti dispersi	Fonti diverse e tempi diversi	Monitoraggio continuo

Interpretazione normativa	Linguaggio complesso	AI + Guide + FAQ

Supporto operativo	Assente	Workflow guidati



1.3 DEFINIZIONE DI “INFORMAZIONE”

Questa è una regola fondamentale.

All’interno della piattaforma non esistono PDF.

Non esistono pagine.

Non esistono file.

Esistono soltanto Informazioni.

Ogni informazione viene trasformata in un’entità strutturata.

Esempio.

Una nota ministeriale non sarà un PDF.

Diventerà.

Documento



↓



Titolo



↓



Argomento



↓



Norme coinvolte



↓



Utenti interessati



↓



Scadenze



↓



Collegamenti



↓



Versioni



↓



Metadati



Lo stesso principio vale per:

●	News

●	Nomine

●	Interpelli

●	FAQ

●	Guide

●	Servizi

●	Video

●	Modulistica

\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_

1.4 LE ENTITÀ PRINCIPALI DEL SISTEMA

Prima di progettare qualsiasi funzione definiamo gli oggetti fondamentali.

Essi saranno immutabili.

L'elenco completo e canonico delle entità, incluse le relazioni e i metadati obbligatori, è definito nel Capitolo 3, Sezione 3.5 — Le Entità Canoniche.

\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_

1.5 I CINQUE LIVELLI DELL’ARCHITETTURA

L’intera piattaforma sarà organizzata in livelli indipendenti.

LIVELLO 1

Foundation Layer

Contiene:

●	Identità della piattaforma

●	Configurazioni

●	Sicurezza

●	Logging

●	Eventi

●	API

●	Autenticazione

Non contiene dati di business.

\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_

LIVELLO 2

Data Layer

Gestisce:

●	Database

●	Versionamento

●	Indicizzazione

●	Cache

●	Storage

●	Backup

●	Audit

Non conosce l’interfaccia utente.

\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_

LIVELLO 3

Knowledge Layer

È il cuore della piattaforma.

Contiene:

●	Knowledge Graph

●	Relazioni

●	Metadati

●	Tassonomie

●	Collegamenti

Ogni modulo utilizza questo livello.

\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_

LIVELLO 4

Intelligence Layer

Comprende:

●	AI Core

●	Ricerca

●	Ranking

●	Analisi

●	Raccomandazioni

●	Automazioni

Non salva dati.

Li interpreta.

\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_

LIVELLO 5

Experience Layer

Contiene:

●	Home

●	Dashboard

●	Servizi

●	Ricerca

●	Sindacalista AI

●	Interfaccia utente

È l’unico livello visibile agli utenti.

\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_

1.6 LE RESPONSABILITÀ DEI LIVELLI

Ogni livello può comunicare solo con quello immediatamente inferiore o superiore attraverso API interne ben definite.

Nessun componente dell’Experience Layer accederà direttamente al database.

Questo garantisce:

●	maggiore sicurezza;

●	migliore manutenibilità;

●	possibilità di sostituire componenti senza effetti collaterali.

\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_

1.7 PRINCIPI DI PROGETTAZIONE

Ogni decisione tecnica dovrà rispettare questi principi.

Coerenza

Una funzione esiste una sola volta.

\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_

Riutilizzabilità

Ogni componente deve poter essere utilizzato da più moduli.

\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_

Modularità

Ogni modulo ha responsabilità limitate.

\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_

Estensibilità

Nuove funzionalità devono poter essere aggiunte senza modificare quelle esistenti.

\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_

Osservabilità

Ogni evento importante deve essere registrato.

\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_

Resilienza

Il fallimento di un modulo non deve compromettere gli altri.

\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_

Accessibilità

L’interfaccia dovrà essere conforme almeno agli standard WCAG 2.2 AA.

\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_

1.8 ARCHITETTURA EVENT-DRIVEN

Ogni cambiamento genera un evento.

Esempio.

Nuova ordinanza.

↓

Evento.

↓

Knowledge Graph.

↓

News.

↓

Dashboard.

↓

Sindacalista AI.

↓

Notifiche.

↓

Analytics.

Nessun modulo aggiorna direttamente un altro.

Comunicano attraverso eventi.

Questo riduce l’accoppiamento tra i sistemi.

\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_

1.9 REGOLE DI EVOLUZIONE

Ogni futura implementazione dovrà rispettare queste condizioni.

Una nuova funzione può essere aggiunta solo se:

●	risolve un problema reale;

●	non duplica funzioni esistenti;

●	utilizza il Knowledge Graph;

●	è integrabile tramite API;

●	è testabile;

●	è documentata;

●	è sostenibile nel lungo periodo.

\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_

1.10 KPI STRATEGICI DELLA PIATTAFORMA

Il successo della piattaforma sarà misurato con indicatori concreti, non con il numero di pagine pubblicate.

KPI per l’utente

●	Tempo medio per trovare un’informazione.

●	Percentuale di ricerche concluse con successo.

●	Riduzione del numero di clic necessari per completare un’attività.

●	Tasso di ritorno degli utenti.

●	Utilizzo delle funzioni personalizzate.

KPI di qualità

●	Percentuale di dati verificati.

●	Tempo medio di aggiornamento dopo una pubblicazione ufficiale.

●	Numero di duplicati rilevati ed eliminati.

●	Accuratezza dei collegamenti nel Knowledge Graph.

KPI tecnici

●	Disponibilità della piattaforma (target ≥ 99,9%).

●	Tempo medio di risposta delle API.

●	Tempo medio di indicizzazione di un nuovo contenuto.

●	Tempo di ripristino in caso di guasto (RTO).

●	Perdita massima di dati accettabile (RPO).

\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_

1.11 CRITERI DI ACCETTAZIONE DEL CAPITOLO

Questo capitolo sarà considerato completo solo se:

●	tutti i moduli futuri potranno essere classificati all’interno dei cinque livelli architetturali;

●	nessuna funzionalità prevista richiederà la duplicazione dei dati;

●	ogni nuova sezione della piattaforma potrà essere ricondotta a una o più entità del modello dati;

●	i principi di modularità, tracciabilità e verificabilità saranno rispettati.

\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_

CONCLUSIONE DEL CAPITOLO 1

Con questo capitolo viene definita la costituzione tecnica di SportelloScuola 2.0.

Da questo momento nessuna decisione progettuale potrà violare i principi qui stabiliti.

Ogni capitolo successivo dovrà limitarsi ad aggiungere capacità all’ecosistema senza modificarne le fondamenta.



SPORTELLOSCUOLA 2.0

ENTERPRISE MASTER ARCHITECTURE (EMA)

PARTE I — FONDAZIONI

CAPITOLO 2

ENTERPRISE SYSTEM ARCHITECTURE

L’architettura tecnica dell’ecosistema

\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_

2.1 OBIETTIVO DEL CAPITOLO

Il primo capitolo ha definito la filosofia.

Questo capitolo definisce come sarà costruita la piattaforma.

Non vengono ancora progettate funzionalità.

Viene progettato il sistema che renderà possibili tutte le funzionalità future.

Da questo momento qualsiasi sviluppo dovrà rispettare questa architettura.

\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_

2.2 VISIONE DELL’ARCHITETTURA

SportelloScuola non dovrà essere sviluppato come un unico blocco software (monolite).

Nemmeno come decine di microservizi indipendenti.

Entrambe le soluzioni presentano svantaggi:

●	il monolite diventa difficile da mantenere;

●	i microservizi aumentano notevolmente la complessità operativa.

Decisione architetturale

La piattaforma adotterà un Modular Monolith con domini chiaramente separati e API interne ben definite.

Questa scelta garantisce:

●	semplicità di sviluppo nelle prime fasi;

●	elevata coerenza del dominio;

●	possibilità di evolvere singoli moduli in microservizi solo quando realmente necessario.

Questa decisione verrà registrata come ADR-001.

\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_

2.3 I DOMINI DELLA PIATTAFORMA

La piattaforma sarà suddivisa in domini funzionali.

Ogni dominio possiede responsabilità precise.

DOMAIN 1 — Foundation

Responsabilità:

●	autenticazione;

●	autorizzazioni;

●	configurazione;

●	eventi;

●	logging;

●	audit;

●	sicurezza.

Non contiene logica di business.

\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_

DOMAIN 2 — Knowledge

Responsabilità:

●	Knowledge Graph;

●	metadati;

●	tassonomie;

●	relazioni;

●	indicizzazione semantica.

È il centro della conoscenza.

Nessun altro dominio può duplicarne le informazioni.

\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_

DOMAIN 3 — Intelligence

Responsabilità:

●	AI Core;

●	motore di ricerca;

●	ranking;

●	suggerimenti;

●	analisi;

●	classificazione.

Non conserva dati.

Interpreta dati.

\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_

DOMAIN 4 — Operations

Responsabilità:

●	monitoraggio delle fonti;

●	acquisizione dati;

●	parser;

●	validazione;

●	versionamento iniziale.

È il dominio che alimenta il sistema.

\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_

DOMAIN 5 — Experience

Responsabilità:

●	Home;

●	Dashboard;

●	Ricerca;

●	Servizi;

●	Interfacce;

●	Accessibilità.

È l’unico dominio visibile agli utenti.

\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_

2.4 FLUSSO GENERALE DEL DATO

Ogni informazione segue sempre lo stesso percorso.

Fonte Ufficiale

&#x20;       │

&#x20;       ▼

Operations Domain

(acquisizione e validazione)

&#x20;       │

&#x20;       ▼

Knowledge Domain

(strutturazione e collegamenti)

&#x20;       │

&#x20;       ▼

Intelligence Domain

(analisi e arricchimento)

&#x20;       │

&#x20;       ▼

Experience Domain

(pubblicazione e interazione)



Questa pipeline è obbligatoria.

Nessun contenuto può essere pubblicato senza aver attraversato tutti i livelli previsti.

2.5 PRINCIPIO “WRITE ONCE”

Ogni dato entra nel sistema una sola volta.

Dopo la validazione:

●	riceve un identificatore univoco;

●	viene versionato;

●	viene collegato al Knowledge Graph.

Da quel momento:

nessun altro modulo può crearne una copia.

Può solo riferirsi all’identificatore.

Questo principio elimina inconsistenze e semplifica la manutenzione.

\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_

2.6 ARCHITETTURA EVENT-DRIVEN

Tutti i moduli comunicano tramite eventi.

Esempio.

Pubblicazione di una nuova Ordinanza.

↓

Evento generato:

NormativeDocumentPublished



Il Knowledge Domain aggiorna i collegamenti.

↓

L’Intelligence Domain aggiorna gli indici.

↓

La Dashboard aggiorna i widget.

↓

Il Sindacalista AI aggiorna il contesto.

↓

Le notifiche verificano gli utenti interessati.

Ogni modulo reagisce autonomamente.

Nessun modulo richiama direttamente un altro.

\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_

2.7 API INTERNE

Ogni dominio espone esclusivamente API interne documentate.

Esempi:

Knowledge API

●	recupero documenti;

●	recupero relazioni;

●	cronologia versioni.

Intelligence API

●	ricerca;

●	classificazione;

●	suggerimenti.

Operations API

●	acquisizione;

●	validazione;

●	monitoraggio.

Experience API

●	dashboard;

●	home;

●	profilo.

Questa separazione garantisce indipendenza tra i domini.

\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_

2.8 MODELLO DI VERSIONAMENTO

Ogni entità mantiene sempre il proprio storico.

Mai sovrascrivere.

Mai cancellare.

Ogni modifica genera una nuova versione.

Ogni versione contiene:

●	identificatore;

●	timestamp;

●	autore (utente o processo);

●	motivazione;

●	origine;

●	differenze rispetto alla versione precedente.

Questo garantisce piena tracciabilità.

\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_

2.9 OSSERVABILITÀ

Ogni componente dovrà produrre:

Log tecnici

Per il monitoraggio dell’infrastruttura.

Audit Log

Per la tracciabilità delle operazioni rilevanti.

Event Log

Per ricostruire la storia degli eventi.

Metriche

Per monitorare prestazioni e affidabilità.

Questi dati non saranno utilizzati solo per il debugging, ma anche per migliorare continuamente il sistema.

\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_

2.10 RESILIENZA

Ogni dominio deve poter funzionare anche in presenza di problemi negli altri domini.

Esempi.

Se il motore AI non è disponibile:

●	la ricerca continua a funzionare;

●	la normativa rimane consultabile;

●	il Knowledge Graph resta operativo.

Se un crawler delle fonti fallisce:

●	viene mantenuta l’ultima versione verificata;

●	il sistema genera un alert interno;

●	il monitoraggio tenta automaticamente il recupero.

La piattaforma privilegia la continuità del servizio.

\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_

2.11 GESTIONE DEGLI ERRORI

Gli errori saranno classificati.

Livello 1

Errore recuperabile automaticamente.

Azione:

retry con backoff.

\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_

Livello 2

Errore persistente.

Azione:

isolamento del componente.

\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_

Livello 3

Errore critico.

Azione:

attivazione delle procedure di emergenza.

\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_

Ogni errore genera un evento e viene registrato.

\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_

2.12 SCALABILITÀ

L’architettura dovrà consentire:

●	aumento del numero di utenti;

●	aumento delle fonti monitorate;

●	aumento dei documenti;

●	aumento delle richieste AI.

Senza modificare la struttura logica.

La scalabilità dovrà essere prevalentemente orizzontale.

\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_

2.13 SICUREZZA ARCHITETTURALE

La sicurezza non è un modulo.

È un requisito trasversale.

Ogni dominio deve rispettare:

●	autenticazione forte;

●	autorizzazioni basate sui ruoli;

●	cifratura dei dati sensibili;

●	protezione delle API;

●	principio del privilegio minimo.

Questi aspetti saranno approfonditi nel Capitolo 5.

\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_

2.14 REGOLE DI EVOLUZIONE

Nessun nuovo dominio potrà essere creato se:

●	può essere integrato in uno esistente;

●	duplica responsabilità;

●	introduce ridondanza.

L’obiettivo è mantenere l’architettura stabile negli anni.

\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_

2.15 KPI ARCHITETTURALI

Saranno monitorati almeno:

●	disponibilità dei domini;

●	tempo medio di risposta;

●	tempo di propagazione degli eventi;

●	numero di errori recuperati automaticamente;

●	tempo medio di indicizzazione;

●	percentuale di eventi completati con successo.

\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_

CRITERI DI ACCETTAZIONE

Il capitolo sarà considerato soddisfatto se:

●	tutti i futuri moduli possono essere assegnati a uno dei cinque domini;

●	nessun dominio richiede accessi diretti al database di un altro dominio;

●	ogni flusso informativo segue la pipeline definita;

●	tutte le comunicazioni avvengono tramite eventi o API documentate.

\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_

CONCLUSIONE DEL CAPITOLO 2

Con questo capitolo viene definita l’ossatura tecnica di SportelloScuola 2.0.

Da questo momento la piattaforma possiede un modello architetturale stabile, modulare e orientato all’evoluzione.

Tutti i capitoli successivi costruiranno funzionalità sopra questa struttura, senza modificarne i principi fondamentali.

SPORTELLOSCUOLA 2.0

ENTERPRISE MASTER ARCHITECTURE (EMA)

PARTE I — FONDAZIONI

CAPITOLO 3

DATA GOVERNANCE \& KNOWLEDGE GRAPH

Il patrimonio informativo della piattaforma

\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_

3.1 OBIETTIVO

L’obiettivo di questo capitolo è definire come SportelloScuola acquisisce, organizza, collega, conserva, aggiorna e rende disponibile ogni informazione.

Da questo momento la piattaforma non sarà più vista come un insieme di pagine.

Sarà vista come un ecosistema di conoscenza.

La conoscenza diventa l’asset principale della piattaforma.

\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_

3.2 PRINCIPIO FONDAMENTALE

Il dato è il prodotto

La maggior parte dei siti web considera il dato come un mezzo.

SportelloScuola considera il dato come il proprio prodotto principale.

Il sito.

La dashboard.

La Home.

La ricerca.

Il Sindacalista AI.

Le News.

Le Nomine.

Gli Interpelli.

Sono semplicemente modi diversi di consultare lo stesso patrimonio informativo.

Questa è la principale differenza rispetto ai competitor.

\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_

3.3 COS’È IL KNOWLEDGE GRAPH

Il Knowledge Graph è il livello logico che collega tutte le informazioni presenti nella piattaforma.

Non è un archivio di file.

Non è un database documentale.

È una rete di relazioni.

Esempio.

Una nuova Ordinanza GPS entra nel sistema.

Il Knowledge Graph la collega automaticamente a:

●	classi di concorso coinvolte;

●	personale interessato;

●	FAQ;

●	Guide;

●	Calcolo Punteggio;

●	Nomine;

●	Interpelli;

●	News;

●	Scadenze;

●	Documenti correlati;

●	Sindacalista AI.

Questo processo è automatico e governato da regole.

\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_

3.4 PRINCIPI DEL KNOWLEDGE GRAPH

Il Knowledge Graph rispetta sette principi immutabili.

1\. Unicità

Ogni entità esiste una sola volta.

\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_

2\. Relazioni esplicite

Ogni collegamento è tracciato.

\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_

3\. Versionamento

Ogni modifica genera una nuova versione.

\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_

4\. Provenienza

Ogni dato conserva sempre la fonte ufficiale.

\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_

5\. Temporalità

Ogni informazione possiede una validità temporale.

\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_

6\. Contestualizzazione

Ogni dato è accompagnato dal proprio contesto.

\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_

7\. Spiegabilità

Ogni relazione deve poter essere motivata.

\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_

3.5 LE ENTITÀ CANONICHE

L’intera piattaforma utilizzerà un modello dati canonico.

Questo modello non potrà essere modificato senza un ADR.

Le principali entità sono:

Entità Territoriali

●	Regione

●	Provincia

●	Comune

\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_

Entità Istituzionali

●	Ministero

●	USR

●	USP

●	Scuola

\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_

Entità Normative

●	Legge

●	Decreto

●	Ordinanza

●	Circolare

●	Nota

●	Contratto

●	Sentenza

\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_

Entità Operative

●	Nomina

●	Interpello

●	Graduatoria

●	Concorso

●	Procedura

●	Servizio

\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_

Entità Informative

●	News

●	FAQ

●	Guida

●	Documento

●	Video

●	Modulistica

\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_

Entità Personali

●	Utente

●	Profilo

●	Dashboard

●	Preferenze

●	Notifica

\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_

Entità AI

●	Conversazione

●	Citazione

●	Fonte

●	Sintesi

●	Ragionamento

\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_

Queste saranno le uniche tipologie di oggetti ammesse.

\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_

3.6 LE RELAZIONI

Il valore della piattaforma nasce dalle relazioni.

Esempio.

Una Nomina può essere collegata a:

●	Provincia

●	Classe di concorso

●	GPS

●	Graduatoria

●	Interpello successivo

●	News

●	FAQ

●	Normativa

●	Guida

●	Statistiche

La relazione viene salvata.

Mai ricostruita ogni volta.

\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_

3.7 METADATI OBBLIGATORI

Ogni entità possiede sempre.

ID Universale

Titolo

Tipo

Fonte

Data pubblicazione

Data acquisizione

Data ultimo controllo

Versione

Stato

Autore

Livello affidabilità

Lingua

Categoria

Tag

Hash

Cronologia modifiche

Questi metadati non possono essere rimossi.

\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_

3.8 QUALITÀ DEL DATO

Ogni informazione viene classificata.

Livello A

Fonte ufficiale verificata.

\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_

Livello B

Fonte istituzionale verificata.

\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_

Livello C

Fonte secondaria verificata.

\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_

Livello D

In verifica.

\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_

Livello E

Storico.

Non più vigente.

\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_

L’utente vede sempre il livello di qualità.

\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_

3.9 CICLO DI VITA DEL DATO

Ogni informazione attraversa sempre lo stesso ciclo.

Scoperta



↓



Acquisizione



↓



Validazione



↓



Normalizzazione



↓



Indicizzazione



↓



Collegamento



↓



Pubblicazione



↓



Monitoraggio



↓



Aggiornamento



↓



Archiviazione



Nessuna eccezione.



3.10 VERSIONAMENTO

La piattaforma non cancella mai.

Ogni modifica crea una nuova versione.

L’utente può consultare.

Versione originale.

↓

Versione modificata.

↓

Versione vigente.

↓

Storico completo.

Questo vale per tutte le entità.

\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_

3.11 KNOWLEDGE QUALITY ENGINE (NUOVA COMPONENTE)

Per garantire la qualità del patrimonio informativo introduciamo un nuovo componente architetturale, coerente con i principi definiti nei Capitoli 1 e 2.

Responsabilità esclusiva:

●	verificare l’integrità dei dati;

●	rilevare duplicati logici;

●	controllare collegamenti non validi;

●	individuare entità orfane;

●	segnalare incongruenze.

Non modifica i dati.

Produce solamente eventi di qualità.

Questo mantiene separata la responsabilità rispetto al dominio Operations.

\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_

3.12 MASTER DATA MANAGEMENT

Alcune entità sono considerate Master Data.

Esempi.

Scuola.

Provincia.

Classe di concorso.

Profilo ATA.

Normativa.

Queste entità hanno un unico proprietario logico.

Ogni altro dominio le utilizza.

Mai le modifica.

\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_

3.13 DATA LINEAGE

Ogni informazione deve poter rispondere a cinque domande.

Da dove proviene?

Quando è stata acquisita?

Chi l’ha modificata?

Quale processo l’ha elaborata?

Quale versione sto consultando?

Questa tracciabilità è fondamentale anche per l’AI, che dovrà sempre poter citare l’origine delle informazioni.

\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_

3.14 KNOWLEDGE GRAPH GOVERNANCE

Le modifiche al Knowledge Graph sono soggette a regole.

Non è possibile:

●	creare nuove entità senza ADR;

●	modificare relazioni canoniche senza revisione architetturale;

●	eliminare metadati obbligatori;

●	duplicare informazioni già esistenti.

Questo protegge il patrimonio informativo.

\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_

3.15 KPI DELLA GOVERNANCE

Saranno monitorati:

●	percentuale di dati verificati;

●	numero di duplicati rilevati;

●	tempo medio di aggiornamento;

●	integrità delle relazioni;

●	completezza dei metadati;

●	qualità complessiva del grafo;

●	numero di collegamenti orfani;

●	tempo medio di propagazione degli aggiornamenti.

\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_

3.16 CRITERI DI ACCETTAZIONE

Il capitolo è conforme se:

●	ogni informazione appartiene a un’entità canonica;

●	ogni entità possiede metadati completi;

●	ogni relazione è tracciabile;

●	nessun dato è duplicato;

●	tutte le modifiche sono versionate;

●	ogni informazione mantiene il collegamento con la fonte ufficiale.

\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_

CONCLUSIONE DEL CAPITOLO 3

Con questo capitolo viene definito il patrimonio digitale permanente di SportelloScuola 2.0.

Da questo momento il vero valore della piattaforma non risiede nelle singole funzionalità, ma nella qualità, nella coerenza e nella ricchezza del suo patrimonio informativo.

Tutti i moduli futuri (AI, Ricerca Universale, Nomine, Interpelli, News, Dashboard, Servizi e Sindacalista AI) saranno semplicemente differenti modalità di interrogare, visualizzare e arricchire questo patrimonio, senza mai duplicarlo o alterarne i principi di governance.

Questa decisione è documentata nell'ADR-002 — "Knowledge Graph come cuore dell'ecosistema" (disponibile nel registro ADR).

SPORTELLOSCUOLA 2.0

PARTE I

CAPITOLO 4

ENTERPRISE GOVERNANCE

Il sistema nervoso della piattaforma

\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_

4.1 OBIETTIVO

Definire le regole che impediscono alla piattaforma di degradarsi nel tempo.

Una piattaforma non fallisce quasi mai per il codice.

Fallisce perché negli anni perde coerenza.

Questo capitolo serve ad evitarlo.

\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_

4.2 IL CONCETTO DI GOVERNANCE

Ogni piattaforma evolve.

Ogni anno.

Nuove funzionalità.

Nuovi sviluppatori.

Nuovi servizi.

Nuove idee.

La governance impedisce che queste evoluzioni compromettano l’ecosistema.

La governance diventa quindi una responsabilità permanente.

\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_

4.3 LE CINQUE FORME DI GOVERNANCE

1\. Data Governance

Definita nel Capitolo 3.

Stabilisce come nasce e vive il dato.

\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_

2\. Architecture Governance

Controlla la qualità dell’architettura.

Verifica che nessun nuovo modulo:

●	duplichi dati;

●	rompa la modularità;

●	violi i principi SSOT;

●	introduca dipendenze non autorizzate.

\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_

3\. AI Governance

Controlla:

●	comportamento dell’AI;

●	trasparenza;

●	citazioni;

●	versioni dei modelli;

●	qualità delle risposte;

●	utilizzo corretto dei dati.

Sarà sviluppata nel Capitolo 5.

\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_

4\. Editorial Governance

Stabilisce:

●	come vengono pubblicati i contenuti;

●	workflow editoriali;

●	revisione;

●	approvazione;

●	versionamento.

Sarà sviluppata nella Parte IV.

\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_

5\. Security Governance

Controlla:

●	sicurezza;

●	permessi;

●	audit;

●	backup;

●	disaster recovery.

\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_

4.4 CHANGE MANAGEMENT

Ogni modifica importante deve seguire lo stesso flusso.

Proposta

↓

Analisi

↓

ADR

↓

Revisione

↓

Implementazione

↓

Test

↓

Monitoraggio

↓

Produzione

Mai il contrario.

\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_

4.5 ARCHITECTURE REVIEW BOARD (ARB)

Questa è una delle decisioni più importanti.

Ogni modifica dell’architettura passa da un organismo logico.

L’Architecture Review Board.

Anche se inizialmente il team è composto da poche persone, questa disciplina permette di crescere senza perdere qualità.

\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_

L’ARB approva solamente modifiche che rispettano:

●	SSOT;

●	Knowledge Graph;

●	Canonical Data Model;

●	Modularità;

●	Event Driven Architecture;

●	API interne;

●	Sicurezza;

●	Scalabilità.

\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_

4.6 GOVERNANCE DEI DOMINI

Ogni dominio possiede:

Responsabile.

Confini.

API.

Eventi.

Metriche.

Documentazione.

Nessun dominio può crescere senza mantenere questi elementi aggiornati.

\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_

4.7 CATALOGO DELLE API

Tutte le API saranno censite.

Ogni API avrà:

●	identificativo;

●	proprietario;

●	versione;

●	documentazione;

●	permessi;

●	SLA;

●	dipendenze.

In questo modo eviteremo API “fantasma” o non documentate.

\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_

4.8 CATALOGO DEGLI EVENTI

Vale lo stesso principio.

Ogni evento sarà registrato.

Esempio.

DocumentPublished

NominationCreated

USRSourceUpdated

KnowledgeGraphUpdated

NotificationDispatched

Ogni evento avrà:

●	produttore;

●	consumatori;

●	payload;

●	versione.

\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_

4.9 REGISTRO DELLE FONTI (NUOVA COMPONENTE)

Questa è una funzione che ritengo strategica per SportelloScuola.

Tutte le fonti ufficiali saranno registrate in un unico catalogo.

Ogni fonte avrà:

●	identificativo permanente;

●	tipologia (Ministero, USR, USP, Scuola, ecc.);

●	URL principale;

●	URL alternative;

●	protocolli di accesso;

●	frequenza di monitoraggio;

●	stato di salute;

●	ultimo controllo;

●	storico delle modifiche;

●	affidabilità;

●	responsabile della validazione.

Questa componente diventerà il cuore dei futuri sistemi di monitoraggio di Nomine, Interpelli, News e Normativa.

\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_

4.10 POLICY ENGINE (NUOVA COMPONENTE)

Introduciamo un motore centrale delle regole.

Ogni regola della piattaforma sarà configurabile.

Esempi:

●	frequenza di crawling;

●	priorità delle fonti;

●	tempi di conservazione;

●	criteri di deduplicazione;

●	soglie di allerta;

●	workflow editoriali.

In questo modo eviteremo logiche “hardcoded” nel software.

\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_

4.11 QUALITY GATES

Nessun dato entra nella piattaforma senza superare controlli automatici.

Esempi:

●	schema valido;

●	fonte riconosciuta;

●	firma digitale se disponibile;

●	assenza di duplicati;

●	metadati completi;

●	relazioni corrette.

Solo dopo il superamento dei controlli il dato entra nel Knowledge Graph.

\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_

4.12 MATURITÀ DELLA PIATTAFORMA

Ogni nuovo modulo dovrà dimostrare di soddisfare almeno questi requisiti:

●	documentazione completa;

●	test automatici;

●	monitoraggio;

●	metriche;

●	sicurezza;

●	API documentate;

●	compatibilità con il Knowledge Graph;

●	integrazione con il sistema eventi.

\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_

4.13 KPI DELLA GOVERNANCE

Misureremo:

●	numero di ADR approvati;

●	modifiche respinte;

●	regressioni architetturali;

●	duplicazioni evitate;

●	qualità delle API;

●	qualità degli eventi;

●	conformità dei moduli;

●	salute delle fonti.

\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_

4.14 CRITERI DI ACCETTAZIONE

La governance è conforme se:

●	ogni nuova funzionalità passa attraverso l’Architecture Review Board;

●	tutte le fonti sono censite nel Registro delle Fonti;

●	ogni modifica architetturale produce un ADR;

●	ogni API e ogni evento sono catalogati;

●	ogni dato supera i Quality Gates prima della pubblicazione.

\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_

CONCLUSIONE DEL CAPITOLO 4

Con questo capitolo SportelloScuola 2.0 acquisisce una governance enterprise.

Non stiamo progettando solo una piattaforma tecnologicamente avanzata, ma un ecosistema in grado di evolvere per molti anni senza perdere qualità, coerenza e affidabilità.

SPORTELLOSCUOLA 2.0

ENTERPRISE MASTER ARCHITECTURE (EMA)

PARTE I — FONDAZIONI

CAPITOLO 5

AI CORE \& INTELLIGENCE LAYER

Il cervello dell’intero ecosistema

\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_

5.1 OBIETTIVO

Definire l’intelligenza centrale della piattaforma.

L’AI non appartiene ad una singola sezione.

Non appartiene al Sindacalista.

Non appartiene alle News.

Non appartiene alla Ricerca.

L’AI è un servizio comune che fornisce capacità intelligenti a tutti i moduli.

\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_

5.2 PRINCIPIO FONDAMENTALE

Una sola Intelligenza

SportelloScuola utilizzerà un unico AI Core.

Mai più AI indipendenti.

Mai chatbot separati.

Mai knowledge duplicate.

Ogni funzionalità intelligente utilizzerà sempre il medesimo motore.

Questo garantisce:

●	coerenza;

●	manutenzione semplificata;

●	aggiornamenti centralizzati;

●	uniformità delle risposte.

\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_

5.3 ARCHITETTURA DELL’AI

L’AI Core sarà composto da componenti distinti.

1\. Orchestrator

Coordina ogni richiesta.

Decide:

●	quali dati interrogare;

●	quali strumenti utilizzare;

●	quale strategia seguire.

È il direttore d’orchestra.

\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_

2\. Retrieval Engine

Interroga esclusivamente il Knowledge Graph.

Mai Internet direttamente.

Mai fonti casuali.

Solo dati verificati.

Se necessario può interrogare fonti esterne autorizzate, ma le risposte vengono sempre separate dai contenuti verificati della piattaforma e chiaramente etichettate.

\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_

3\. Reasoning Engine

Analizza.

Collega.

Interpreta.

Confronta.

Spiega.

Non inventa informazioni.

\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_

4\. Citation Engine

Ogni risposta contiene:

●	fonti;

●	data aggiornamento;

●	livello affidabilità;

●	versione della normativa;

●	collegamenti.

Nessuna risposta senza citazioni.

\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_

5\. Context Engine

Tiene conto del contesto.

Esempio.

L’utente è ATA.

↓

L’AI privilegia:

●	CCNL ATA;

●	graduatorie ATA;

●	interpelli ATA;

●	normativa ATA.

Un docente riceverà invece contenuti pertinenti al proprio profilo.

\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_

6\. Memory Layer (Sessione)

Mantiene il contesto della conversazione corrente.

Non modifica il Knowledge Graph.

Non altera i dati permanenti.

\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_

5.4 L’AI NON È UNA FONTE

Principio fondamentale.

L’AI non produce verità.

Produce interpretazioni.

La fonte ufficiale rimane sempre il documento originale.

L’AI:

●	spiega;

●	collega;

●	sintetizza;

●	confronta.

Mai sostituisce la fonte.

\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_

5.5 RAG (Retrieval Augmented Generation)

Tutte le risposte seguiranno lo stesso processo.

Domanda

↓

Analisi

↓

Ricerca nel Knowledge Graph

↓

Recupero documenti

↓

Recupero relazioni

↓

Costruzione contesto

↓

Generazione risposta

↓

Citazioni

↓

Verifica finale

\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_

5.6 MODEL CONTROLLER

L’AI Core non dipenderà da un solo modello.

Ogni richiesta viene indirizzata verso il modello più adatto.

Esempio.

Ricerca normativa.

↓

Modello A.

Analisi documento.

↓

Modello B.

Riassunto.

↓

Modello C.

Traduzione.

↓

Modello D.

Questa architettura evita il lock-in tecnologico e permette di sostituire o affiancare modelli nel tempo.

\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_

5.7 TOOL ECOSYSTEM

L’AI non si limita a rispondere.

Può utilizzare strumenti interni autorizzati.

Ad esempio:

●	Ricerca normativa;

●	Ricerca nomine;

●	Ricerca interpelli;

●	Calcolo punteggio;

●	Ricerca FAQ;

●	Generazione documenti;

●	Analisi PDF;

●	Ricerca news;

●	Dashboard personale.

Ogni strumento è controllato e versionato.

\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_

5.8 AI SKILLS

Ogni funzionalità intelligente è definita come una “Skill”.

Esempi:

●	Spiegazione normativa.

●	Analisi interpelli.

●	Lettura convocazioni.

●	Confronto decreti.

●	Simulazione punteggio.

●	Generazione checklist.

●	Riassunto documenti.

●	Traduzione linguaggio giuridico.

Le Skill condividono sempre lo stesso AI Core.

\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_

5.9 GUARDRAILS

Per garantire affidabilità introduciamo regole vincolanti.

L’AI deve:

●	dichiarare quando non possiede informazioni sufficienti;

●	distinguere chiaramente fatti, interpretazioni e simulazioni;

●	indicare sempre la data dell’ultimo aggiornamento;

●	evitare conclusioni non supportate dalle fonti;

●	invitare l’utente a consultare il documento ufficiale nei casi rilevanti.

\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_

5.10 AI OBSERVABILITY

Ogni richiesta viene monitorata.

Saranno registrati:

●	tempo di risposta;

●	fonti utilizzate;

●	strumenti utilizzati;

●	livello di confidenza;

●	eventuali errori;

●	feedback dell’utente.

Questi dati servono a migliorare il sistema, nel rispetto della normativa sulla protezione dei dati.

\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_

5.11 PROMPT GOVERNANCE

I prompt di sistema non saranno scritti nel codice.

Saranno gestiti come risorse versionate.

Ogni modifica avrà:

●	identificativo;

●	autore;

●	motivazione;

●	data;

●	versione.

Questo rende il comportamento dell’AI controllabile e riproducibile.

\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_

5.12 AI SAFETY

Ogni risposta attraversa controlli finali.

Verifica:

●	citazioni presenti;

●	fonti disponibili;

●	coerenza con il Knowledge Graph;

●	rispetto delle policy;

●	assenza di dati personali non autorizzati.

Solo dopo viene restituita all’utente.

\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_

5.13 SPECIALIZZAZIONI DELL’AI

Il motore centrale alimenterà:

●	Sindacalista AI.

●	Assistente Ricerca.

●	Assistente Nomine.

●	Assistente Interpelli.

●	Assistente Normativa.

●	Assistente Dashboard.

●	Analizzatore Documenti.

●	Generatore Guide.

Questi non sono AI differenti.

Sono semplicemente interfacce specializzate dello stesso AI Core.

Questo elimina incoerenze e duplicazioni.

\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_

5.14 FUTURE CAPABILITIES

L’architettura dovrà poter supportare in futuro:

●	analisi predittive basate su dati storici;

●	sintesi vocali;

●	interazione multimodale (testo, immagini e documenti);

●	suggerimenti proattivi personalizzati;

●	agenti AI specializzati sempre governati dall’Orchestrator.

Ogni evoluzione dovrà rispettare i principi di governance definiti nei capitoli precedenti.

\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_

5.15 KPI DELL’AI

Misureremo:

●	accuratezza delle risposte;

●	percentuale di risposte con citazioni complete;

●	tempo medio di risposta;

●	soddisfazione degli utenti;

●	numero di richieste risolte senza escalation;

●	tasso di utilizzo delle Skill;

●	riduzione del tempo necessario per trovare informazioni.

\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_

5.16 CRITERI DI ACCETTAZIONE

Il capitolo è conforme se:

●	esiste un solo AI Core;

●	tutte le funzionalità intelligenti utilizzano il medesimo motore;

●	nessuna risposta viene restituita senza indicare le fonti disponibili;

●	ogni Skill è separata dalla logica del modello;

●	il sistema può evolvere senza dipendere da un singolo fornitore di AI.

\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_

CONCLUSIONE DEL CAPITOLO 5

Con questo capitolo nasce il motore cognitivo di SportelloScuola 2.0.

L’intelligenza artificiale non è più un elemento accessorio, ma un’infrastruttura comune che opera sopra il patrimonio informativo governato dal Knowledge Graph e nel rispetto delle regole definite nei capitoli precedenti.

Questo approccio permette di offrire un’esperienza coerente, trasparente e scalabile, trasformando ogni sezione della piattaforma in un punto di accesso a un’unica intelligenza condivisa.

Questa decisione è documentata nell'ADR-003 — "AI Core unificato con architettura RAG e orchestrazione centrale" (disponibile nel registro ADR).

SPORTELLOSCUOLA 2.0

ENTERPRISE MASTER ARCHITECTURE (EMA)

PARTE I — FONDAZIONI

CAPITOLO 6

PLATFORM RESILIENCE, SECURITY \& OPERATIONS

La capacità della piattaforma di non fermarsi mai

\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_

6.1 OBIETTIVO

Definire tutti i meccanismi che garantiscono continuità operativa, sicurezza, monitoraggio, recupero e scalabilità.

Questo capitolo non introduce nuove funzionalità.

Protegge tutto ciò che è stato progettato nei capitoli precedenti.

\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_

6.2 PRINCIPIO FONDAMENTALE

Graceful Degradation

La piattaforma non deve mai interrompere completamente il servizio.

Quando un componente non è disponibile:

●	le funzioni essenziali rimangono operative;

●	le funzioni dipendenti vengono temporaneamente ridotte;

●	l’utente riceve informazioni chiare sullo stato del servizio.

L’obiettivo è evitare il “tutto o niente”.

\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_

6.3 CLASSIFICAZIONE DEI SERVIZI

Ogni componente viene classificato.

Livello Critico

●	autenticazione;

●	Knowledge Graph;

●	database principale;

●	ricerca;

●	dashboard.

Devono mantenere la massima disponibilità.

\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_

Livello Elevato

●	AI Core;

●	crawler;

●	notifiche;

●	analytics.

Possono essere temporaneamente degradati senza compromettere il funzionamento generale.

\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_

Livello Standard

●	suggerimenti;

●	statistiche avanzate;

●	funzionalità sperimentali.

Sono le prime funzioni che possono essere sospese in condizioni eccezionali.

\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_

6.4 OSSERVABILITÀ COMPLETA

Ogni componente produce quattro categorie di dati.

Metriche

Prestazioni.

Carico.

Tempi.

\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_

Log

Eventi tecnici.

\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_

Tracce

Percorso completo di ogni richiesta.

\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_

Audit

Operazioni rilevanti.

Questa separazione facilita diagnosi e conformità.

\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_

6.5 HEALTH MONITOR

Ogni dominio espone uno stato di salute.

Il sistema controlla continuamente:

●	disponibilità;

●	tempo di risposta;

●	errori;

●	consumo di risorse;

●	backlog degli eventi.

In caso di anomalie vengono avviate automaticamente procedure di recupero.

\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_

6.6 SOURCE RESILIENCE ENGINE

Questa componente è fondamentale per SportelloScuola.

Ogni fonte ufficiale (Ministero, USR, USP, ecc.) viene monitorata costantemente.

Per ogni fonte il sistema verifica:

●	raggiungibilità;

●	cambiamenti strutturali;

●	variazioni degli URL;

●	modifiche del formato;

●	frequenza degli aggiornamenti.

Se una fonte cambia:

1\.	viene tentato il recupero automatico;

2\.	viene aggiornato il Registro delle Fonti;

3\.	se necessario viene aperta una segnalazione per revisione umana.

Questo soddisfa il requisito che avevi indicato: la piattaforma deve adattarsi automaticamente ai cambiamenti delle fonti ufficiali senza interrompere il servizio.

\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_

6.7 DISASTER RECOVERY

Vengono definiti due obiettivi.

RTO (Recovery Time Objective)

Tempo massimo di ripristino.

Target iniziale:

meno di 60 minuti.

\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_

RPO (Recovery Point Objective)

Massima perdita di dati accettabile.

Target iniziale:

inferiore a 5 minuti per i dati operativi.

Questi valori potranno essere migliorati nelle versioni successive.

\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_

6.8 BACKUP STRATEGY

La piattaforma adotta backup multilivello.

●	Backup incrementali frequenti.

●	Backup completi periodici.

●	Verifica automatica dell’integrità.

●	Test periodici di ripristino.

Un backup non verificato non è considerato valido.

\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_

6.9 SICUREZZA

La sicurezza è progettata secondo il principio Zero Trust.

Ogni accesso deve essere autenticato e autorizzato.

Le autorizzazioni sono basate sui ruoli (RBAC) e potranno evolvere verso controlli più granulari (ABAC) se necessario.

Le comunicazioni interne ed esterne devono essere cifrate.

Le credenziali e i segreti applicativi non saranno mai memorizzati nel codice.

\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_

6.10 GESTIONE DEI SEGRETI

Chiavi API.

Token.

Credenziali.

Certificati.

Saranno gestiti tramite un sistema centralizzato di gestione dei segreti.

Ogni segreto avrà:

●	proprietario;

●	data di scadenza;

●	rotazione programmata;

●	tracciabilità degli accessi.

\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_

6.11 RATE LIMITING

Per proteggere la piattaforma:

●	limitazione delle richieste abusive;

●	protezione contro automazioni malevole;

●	priorità ai servizi essenziali.

Gli utenti legittimi non dovranno percepire rallentamenti.

\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_

6.12 RESILIENZA DELL’AI

L’AI Core deve poter degradare in modo controllato.

Esempi.

Se il modello principale non è disponibile:

●	utilizzo di un modello alternativo compatibile;

●	in assenza di modelli disponibili, restituzione dei risultati della ricerca documentale senza generazione testuale.

L’utente non rimane mai senza risposta.

\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_

6.13 OPERATIONS CENTER

La piattaforma disporrà di un centro di controllo interno.

Visualizzerà:

●	stato dei domini;

●	stato dei crawler;

●	salute delle fonti;

●	code degli eventi;

●	prestazioni;

●	anomalie;

●	qualità del Knowledge Graph.

Questa console sarà destinata esclusivamente agli amministratori.

\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_

6.14 CONTINUOUS VERIFICATION

Ogni giorno il sistema eseguirà verifiche automatiche.

●	link non funzionanti;

●	fonti non raggiungibili;

●	dati duplicati;

●	errori di indicizzazione;

●	relazioni orfane;

●	degrado delle prestazioni.

I risultati alimentano il Knowledge Quality Engine definito nel Capitolo 3.

\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_

6.15 KPI OPERATIVI

Saranno monitorati:

●	disponibilità complessiva della piattaforma;

●	disponibilità dei singoli domini;

●	tempo medio di ripristino;

●	tempo medio di rilevazione degli errori;

●	percentuale di recuperi automatici riusciti;

●	salute delle fonti ufficiali;

●	qualità dei backup;

●	numero di incidenti critici.

\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_

6.16 CRITERI DI ACCETTAZIONE

Il capitolo è conforme se:

●	la piattaforma continua a funzionare anche con il guasto di componenti non critici;

●	ogni fonte ufficiale è monitorata automaticamente;

●	esistono procedure documentate di backup e ripristino;

●	tutte le anomalie vengono rilevate e registrate;

●	i dati rimangono coerenti dopo un recupero.

\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_

CONCLUSIONE DEL CAPITOLO 6

Con questo capitolo si conclude la Parte I – Fondazioni.

Le fondamenta della piattaforma sono ora complete:

●	Visione (perché esiste la piattaforma).

●	Architettura (come è costruita).

●	Patrimonio informativo (quale valore custodisce).

●	Governance (come evolve senza degradarsi).

●	AI Core (come interpreta la conoscenza).

●	Resilienza e Operazioni (come garantisce continuità e sicurezza).

Questa base è sufficiente per costruire tutti i moduli funzionali senza dover modificare l’architettura.

SPORTELLOSCUOLA 2.0

ENTERPRISE MASTER ARCHITECTURE (EMA)

PARTE II

IL MOTORE DELLA PIATTAFORMA

\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_

CAPITOLO 7

PRODUCT ECOSYSTEM

La piattaforma diventa un ecosistema di prodotti digitali

\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_

7.1 OBIETTIVO

Definire l’organizzazione logica di SportelloScuola.

Da questo momento non parleremo più di:

●	pagine

●	menu

●	sezioni

Parleremo di

Digital Products

Ogni prodotto risolve un problema specifico.

Tutti utilizzano lo stesso patrimonio informativo.

\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_

7.2 IL PRINCIPIO “ONE PROBLEM = ONE PRODUCT”

Questa diventa la prima regola.

Ogni problema dell’utente deve avere un solo prodotto dedicato.

Mai due.

Mai tre.

Mai funzioni duplicate.

Esempio.

Problema:

Voglio sapere se sono stato convocato.

↓

Prodotto.

Nomine

Non:

News.

Dashboard.

Sindacalista.

Interpelli.

Solo Nomine.

\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_

Problema.

Voglio capire una norma.

↓

Prodotto.

Normativa.

\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_

Problema.

Voglio cercare un interpello.

↓

Prodotto.

Interpelli.

\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_

Problema.

Voglio calcolare il punteggio.

↓

Prodotto.

Calcolo Punteggio.

\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_

Questo elimina completamente la confusione.

\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_

7.3 I PRODOTTI UFFICIALI DELLA PIATTAFORMA

L’ecosistema iniziale sarà composto da dodici prodotti.

Product 01

Normativa

\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_

Product 02

Notizie \& Scadenze

\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_

Product 03

Interpelli

\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_

Product 04

Nomine GPS

(nuovo prodotto strategico)

\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_

Product 05

Sindacalista AI

\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_

Product 06

Calcolo Punteggio

\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_

Product 07

Servizi

\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_

Product 08

Dashboard personale

\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_

Product 09

Ricerca Universale

\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_

Product 10

Documenti

\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_

Product 11

Profilo Professionale

\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_

Product 12

Centro Notifiche

\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_

Ogni prodotto avrà un proprio capitolo dedicato.

\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_

7.4 TUTTI UTILIZZANO GLI STESSI DATI

Nessun prodotto possiede dati propri.

Ogni prodotto interroga:

Knowledge Graph

↓

AI Core

↓

Canonical Data Model

↓

Registry delle Fonti

↓

Policy Engine

Questo evita qualsiasi duplicazione.

\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_

7.5 CICLO DI VITA DI UN PRODOTTO

Ogni prodotto dovrà essere progettato secondo il medesimo schema.

Missione.

↓

Utenti.

↓

Problema.

↓

Workflow.

↓

Modello dati.

↓

Interfaccia.

↓

AI.

↓

KPI.

↓

Roadmap.

\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_

Ogni capitolo successivo seguirà questa struttura.

\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_

7.6 PRODUCT CONTRACT

Ogni prodotto deve dichiarare.

Missione.

Input.

Output.

API.

Eventi.

Dipendenze.

Fonti.

AI Skills.

Metriche.

Questo contratto diventa obbligatorio.

\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_

7.7 LIVELLI DI MATURITÀ

Ogni prodotto avrà un livello.

Livello 1

Operativo.

\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_

Livello 2

Integrato.

\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_

Livello 3

Personalizzato.

\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_

Livello 4

Predittivo.

\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_

Livello 5

Autonomo.

\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_

L’obiettivo dell’intera piattaforma sarà raggiungere il Livello 5.

\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_

7.8 LE RELAZIONI TRA I PRODOTTI

Qui introduciamo una delle innovazioni principali.

I prodotti non si limitano a convivere.

Collaborano.

Esempio.

Una nuova Nomina.

↓

Aggiorna Dashboard.

↓

Genera Notifica.

↓

Collega Normativa.

↓

Aggiorna News.

↓

Arricchisce AI.

↓

Aggiorna Statistiche.

↓

Suggerisce FAQ.

↓

Memorizza Cronologia.

L’utente percepisce un unico ecosistema.

\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_

7.9 PRODUCT OBSERVABILITY

Ogni prodotto sarà monitorato.

Misureremo.

Tempo medio utilizzo.

Funzioni più usate.

Errori.

Percorsi utenti.

Abbandoni.

Performance.

Tutto servirà per migliorare continuamente.

\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_

7.10 PRODUCT SCORE

Ogni prodotto riceverà un punteggio interno.

Qualità dati.

●		●	

Prestazioni.

●		●	

Affidabilità.

●		●	

Utilizzo.

●		●	

Feedback utenti.

=

Health Score.

Questo permetterà di individuare immediatamente eventuali criticità.

\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_

7.11 IL CONCETTO DI “SUPER FEATURE”

Una Super Feature è una funzione che attraversa più prodotti.

Esempio.

Ricerca Universale.

Interroga.

Normativa.

↓

Nomine.

↓

Interpelli.

↓

Documenti.

↓

FAQ.

↓

News.

↓

Guide.

↓

Servizi.

↓

Sindacalista AI.

↓

Dashboard.

La ricerca non appartiene a nessun prodotto.

È una Super Feature.

Lo stesso vale per:

AI Core.

Notifiche.

Knowledge Graph.

Analytics.

Sono servizi trasversali.

\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_

7.12 LA HOME NON È PIÙ UNA PAGINA

Questa è probabilmente la decisione più importante dell’intera Parte II.

La Home smette di essere una vetrina.

Diventa un

Product Gateway

La Home:

non contiene contenuti.

Contiene accessi.

Mostra ciò che serve.

In base al profilo.

In base al comportamento.

In base alle preferenze.

In base al contesto.

In base alle scadenze.

Ogni utente vedrà una Home diversa.

Questo sarà progettato nel Capitolo 8.

\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_

7.13 ROADMAP DEI PRODOTTI

L’ordine di sviluppo sarà strategico.

Fase 1

Ricerca Universale.

Normativa.

Dashboard.

\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_

Fase 2

Nomine GPS.

Interpelli.

News.

\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_

Fase 3

Sindacalista AI.

Documenti.

Notifiche.

\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_

Fase 4

Servizi avanzati.

Statistiche.

Predizioni.

\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_

Fase 5

Automazioni intelligenti.

Agenti AI.

Workflow autonomi.

\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_

7.14 KPI

Misureremo.

Numero di problemi risolti.

Tempo medio risoluzione.

Tasso utilizzo.

Retention.

Errori.

Feedback.

Completezza.

Qualità.

Valore percepito.

\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_

7.15 CRITERI DI ACCETTAZIONE

La Parte II sarà conforme se:

●	ogni problema ha un solo prodotto dedicato;

●	nessun prodotto duplica dati o funzionalità;

●	tutti i prodotti utilizzano il Knowledge Graph come unica fonte di verità;

●	ogni prodotto dispone di un Product Contract, KPI e roadmap;

●	le Super Feature rimangono trasversali e non vengono inglobate in singoli prodotti.

\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_

CONCLUSIONE DEL CAPITOLO 7

Con questo capitolo SportelloScuola 2.0 cambia definitivamente natura.

Non è più un portale informativo.

Non è un insieme di pagine.

Non è un semplice gestionale.

Diventa un ecosistema di prodotti digitali integrati, ciascuno progettato per risolvere uno specifico problema del personale scolastico, ma tutti alimentati dallo stesso patrimonio informativo e coordinati dall’AI Core e dal Knowledge Graph.

SPORTELLOSCUOLA 2.0

ENTERPRISE MASTER ARCHITECTURE (EMA)

PARTE II

IL MOTORE DELLA PIATTAFORMA

CAPITOLO 8

UNIVERSAL PRODUCT FRAMEWORK

Il modello unico con cui sarà costruito ogni prodotto della piattaforma

\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_

8.1 OBIETTIVO

Prima di progettare qualsiasi prodotto (Nomine, Interpelli, Normativa, News, Sindacalista AI…), definiamo un framework unico.

Ogni prodotto della piattaforma dovrà rispettare la stessa struttura.

Questo garantisce:

●	uniformità;

●	facilità di manutenzione;

●	scalabilità;

●	esperienza utente coerente;

●	semplicità evolutiva.

\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_

8.2 UN SOLO MODELLO PER TUTTI I PRODOTTI

Ogni prodotto dovrà essere composto dagli stessi livelli logici.

Non esisteranno eccezioni.

Missione



↓



Problema Utente



↓



Modello Dati



↓



Workflow



↓



Servizi



↓



AI



↓



Esperienza Utente



↓



Metriche



↓



Governance



Questa struttura diventa obbligatoria.

8.3 MISSIONE

Ogni prodotto dovrà poter essere descritto con una sola frase.

Esempio.

Nomine

Consentire all’utente di sapere immediatamente se esiste una convocazione o una nomina di suo interesse, senza consultare decine di siti.

\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_

Normativa

Consentire di trovare, comprendere e collegare qualsiasi norma scolastica vigente.

\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_

Interpelli

Rendere ricercabili e monitorabili tutti gli interpelli pubblicati dagli enti competenti.

\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_

Se la missione richiede un paragrafo significa che il prodotto è troppo complesso e va suddiviso.

\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_

8.4 IL PROBLEMA

Ogni prodotto risolve un solo problema principale.

Può avere problemi secondari.

Mai due problemi principali.

Esempio.

Nomine.

Problema principale:

Sapere rapidamente se una convocazione riguarda il proprio profilo.

Problemi secondari:

●	conoscere il punteggio;

●	confrontare gli esiti;

●	analizzare gli scorrimenti.

\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_

8.5 MODELLO DATI

Ogni prodotto utilizza esclusivamente entità già definite nel Canonical Data Model.

Può crearne di nuove solo mediante ADR approvato.

Non saranno ammessi database locali o strutture dati isolate.

\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_

8.6 WORKFLOW

Ogni prodotto dovrà dichiarare il proprio flusso operativo.

Schema generale.

Input



↓



Validazione



↓



Knowledge Graph



↓



AI Core (quando necessario)



↓



Output



↓



Monitoraggio



Qualsiasi deviazione dovrà essere motivata.

8.7 SERVIZI INTERNI

Ogni prodotto utilizzerà esclusivamente servizi condivisi.

Ad esempio:

●	Ricerca Universale.

●	Notifiche.

●	AI Core.

●	Knowledge Graph.

●	Registro Fonti.

●	Quality Engine.

●	Policy Engine.

Nessun prodotto implementerà versioni proprie di questi servizi.

\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_

8.8 ESPERIENZA UTENTE

Ogni prodotto dovrà mantenere la stessa grammatica visiva.

Gli utenti non dovranno imparare interfacce differenti.

Elementi comuni:

●	barra di ricerca;

●	filtri;

●	cronologia;

●	preferiti;

●	condivisione;

●	esportazione;

●	collegamenti correlati;

●	assistenza AI contestuale.

\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_

8.9 INTEGRAZIONE CON L’AI

L’AI non sarà mai il punto di ingresso.

Sarà un supporto.

Ogni prodotto dovrà funzionare perfettamente anche senza AI.

L’AI servirà per:

●	spiegare;

●	riassumere;

●	confrontare;

●	guidare;

●	suggerire.

Mai per sostituire il funzionamento principale.

\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_

8.10 EVENTI

Ogni prodotto dovrà dichiarare:

Eventi generati.

Eventi consumati.

Questo mantiene la coerenza con l’architettura Event-Driven.

\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_

8.11 KPI

Ogni prodotto avrà KPI obbligatori.

Funzionali.

Tecnici.

Editoriali.

Di qualità.

Di utilizzo.

Nessun prodotto sarà considerato “finito” senza indicatori misurabili.

\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_

8.12 PRODUCT LIFECYCLE

Ogni prodotto attraverserà le stesse fasi.

Progettazione.

↓

Sviluppo.

↓

Test.

↓

Produzione.

↓

Monitoraggio.

↓

Miglioramento continuo.

Questo evita rilasci improvvisati.

\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_

8.13 EVOLUZIONE CONTROLLATA

Ogni nuova funzionalità proposta per un prodotto dovrà superare l’Architecture Gate definito al termine del capitolo precedente.

Se non supera il gate:

●	non entra nel prodotto;

●	non viene implementata;

●	viene archiviata per future valutazioni.

\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_

8.14 MATRICE DI COERENZA

Prima dell’approvazione di qualsiasi modifica, dovrà essere verificata la coerenza con:

●	Visione (Cap.1)

●	Architettura (Cap.2)

●	Data Governance (Cap.3)

●	Governance (Cap.4)

●	AI Core (Cap.5)

●	Resilienza (Cap.6)

●	Ecosistema Prodotti (Cap.7)

Se una modifica viola anche uno solo di questi capitoli, dovrà essere riprogettata.

Questa matrice diventa il principale strumento di controllo della qualità architetturale.

\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_

8.15 CRITERI DI ACCETTAZIONE

Il Universal Product Framework è conforme se:

●	tutti i prodotti condividono la stessa struttura logica;

●	nessun prodotto implementa servizi già esistenti;

●	ogni prodotto ha una missione unica e un solo problema principale;

●	tutti i prodotti possono evolvere senza modificare l’architettura generale;

●	ogni futura estensione viene valutata tramite Architecture Gate e Matrice di Coerenza.

\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_

CONCLUSIONE DEL CAPITOLO 8

Con questo capitolo viene definito il modello costruttivo universale di SportelloScuola 2.0.

Da questo momento non progetteremo più funzionalità in modo isolato. Ogni prodotto sarà costruito seguendo lo stesso schema, utilizzando gli stessi servizi condivisi e rispettando gli stessi principi di governance.

SPORTELLOSCUOLA 2.0

ENTERPRISE MASTER ARCHITECTURE (EMA)

PARTE II

IL MOTORE DELLA PIATTAFORMA

CAPITOLO 9

UNIVERSAL SEARCH ENGINE

Il motore di ricerca universale dell’intero ecosistema

\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_

9.1 OBIETTIVO

Realizzare un unico motore di ricerca capace di interrogare tutto il patrimonio informativo della piattaforma.

Non esisteranno ricerche dedicate.

Esisterà una sola ricerca.

Ogni prodotto utilizzerà questa.

\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_

9.2 IL PROBLEMA DA RISOLVERE

Oggi un docente deve cercare:

●	una norma

●	una convocazione

●	una GPS

●	una scuola

●	una FAQ

●	un interpello

●	una sentenza

●	una guida

visitando portali differenti.

Oppure utilizzando ricerche differenti.

Noi eliminiamo completamente questo problema.

\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_

9.3 PRINCIPIO FONDAMENTALE

La ricerca non cerca pagine.

La ricerca cerca entità.

Questo è coerente con il Knowledge Graph.

L’utente non deve sapere dove si trova l’informazione.

Deve semplicemente descrivere ciò che cerca.

\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_

9.4 COSA PUÒ CERCARE

Il motore dovrà interrogare qualsiasi entità canonica.

Ad esempio.

Normativa.

↓

Documenti.

↓

News.

↓

Interpelli.

↓

Nomine.

↓

Graduatorie.

↓

Scuole.

↓

Province.

↓

Classi di concorso.

↓

Profili ATA.

↓

FAQ.

↓

Guide.

↓

Servizi.

↓

Scadenze.

↓

Documenti correlati.

Tutto.

Sempre.

\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_

9.5 UNA SOLA BARRA DI RICERCA

Ovunque.

Home.

Dashboard.

Nomine.

Interpelli.

Normativa.

Documenti.

Sindacalista AI.

La barra sarà sempre la stessa.

Questo elimina la frammentazione dell’esperienza utente.

\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_

9.6 IL FLUSSO DELLA RICERCA

Ogni ricerca seguirà sempre questo percorso.

Domanda



↓



Analisi linguistica



↓



Normalizzazione



↓



Knowledge Graph



↓



Ranking



↓



Arricchimento AI



↓



Risultati



↓



Monitoraggio



Mai scorciatoie.



9.7 NORMALIZZAZIONE

L’utente non dovrà conoscere il linguaggio amministrativo.

Esempio.

Scrive.

“supplenze sostegno napoli”

Il sistema comprende.

GPS

↓

Sostegno

↓

Provincia di Napoli

↓

Nomine

↓

Interpelli

↓

Normativa correlata

↓

FAQ

↓

Guide

La piattaforma traduce automaticamente il linguaggio naturale nel modello dati canonico.

\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_

9.8 RANKING

I risultati non saranno ordinati solo cronologicamente.

Saranno valutati secondo:

●	rilevanza;

●	autorevolezza della fonte;

●	aggiornamento;

●	collegamenti con altre entità;

●	profilo dell’utente;

●	storico delle ricerche;

●	stato di validità del documento.

Questa scelta migliora la qualità della ricerca senza sacrificare la trasparenza: l’utente potrà sempre cambiare criterio di ordinamento.

\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_

9.9 FILTRI

I filtri saranno identici per tutta la piattaforma.

Categoria.

Fonte.

Provincia.

Regione.

Classe di concorso.

Profilo.

Data.

Stato.

Validità.

Livello affidabilità.

Mai filtri differenti da prodotto a prodotto.

\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_

9.10 RICERCA SEMANTICA

Il motore comprenderà il significato.

Non solo le parole.

Esempio.

“Quando scadono le GPS?”

↓

Troverà.

Ordinanza.

↓

Scadenze.

↓

FAQ.

↓

Guide.

↓

News.

↓

Servizi.

Anche se il documento non contiene quella frase esatta.

\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_

9.11 RICERCA CONTESTUALE

Ogni prodotto può limitare il contesto.

Esempio.

Dentro Nomine.

↓

la ricerca mostra prima le Nomine.

Dentro Normativa.

↓

la ricerca privilegia le Norme.

Ma il motore rimane sempre lo stesso.

\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_

9.12 RISULTATI UNIFICATI

I risultati saranno organizzati per tipologia di entità, non per pagina.

Esempio di ricerca: “GPS infanzia Napoli”

Il sistema potrebbe mostrare:

●	Normativa: ordinanze e note applicabili.

●	Nomine: convocazioni e assegnazioni correlate.

●	Interpelli: opportunità aperte.

●	News: aggiornamenti recenti.

●	Guide: spiegazioni operative.

●	FAQ: risposte alle domande più frequenti.

L’utente sceglie il percorso più utile senza ripetere la ricerca.

\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_

9.13 SUGGERIMENTI

Il motore proporrà:

●	completamento automatico;

●	sinonimi;

●	termini ufficiali;

●	ricerche frequenti;

●	contenuti correlati.

I suggerimenti saranno sempre derivati dal Knowledge Graph e non da liste statiche.

\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_

9.14 SEARCH OBSERVABILITY

Per ogni ricerca registreremo:

●	tempo di risposta;

●	numero di risultati;

●	tasso di clic;

●	ricerche senza esito;

●	filtri utilizzati;

●	riformulazioni della query.

Questi dati serviranno a migliorare continuamente il motore.

\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_

9.15 SEARCH QUALITY ENGINE

Introduciamo una nuova componente, coerente con il Knowledge Quality Engine.

Compiti:

●	individuare ricerche senza risultati;

●	suggerire nuove relazioni nel Knowledge Graph;

●	evidenziare sinonimi mancanti;

●	migliorare il ranking sulla base di dati oggettivi.

Non modifica automaticamente i dati: propone miglioramenti che vengono valutati secondo le regole di governance.

\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_

9.16 CRITERI DI ACCETTAZIONE

Il motore di ricerca è conforme se:

●	esiste una sola barra di ricerca in tutta la piattaforma;

●	tutti i prodotti utilizzano lo stesso motore;

●	la ricerca interroga il Knowledge Graph e non archivi separati;

●	i filtri sono uniformi;

●	il ranking è spiegabile e trasparente;

●	ogni ricerca è monitorata e utilizzata per migliorare il sistema.

\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_

CONCLUSIONE DEL CAPITOLO 9

Con questo capitolo nasce il motore di ricerca universale, uno dei pilastri dell’intera piattaforma.

Tutti i prodotti futuri (Normativa, Interpelli, Nomine, News, Documenti, Dashboard e Sindacalista AI) utilizzeranno questa infrastruttura condivisa, evitando duplicazioni e garantendo un’esperienza uniforme.

SPORTELLOSCUOLA 2.0

ENTERPRISE MASTER ARCHITECTURE (EMA)

PARTE II

IL MOTORE DELLA PIATTAFORMA

CAPITOLO 10

SOURCE INTELLIGENCE ENGINE

Il motore che osserva continuamente il sistema scolastico italiano

\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_

10.1 OBIETTIVO

Questo capitolo definisce il componente che alimenta tutta la piattaforma.

Non è un crawler.

Non è un parser.

Non è un aggregatore.

È il sistema che rende SportelloScuola un organismo “vivente”.

Il suo compito non è scaricare dati.

Il suo compito è capire cosa è cambiato.

\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_

10.2 IL PROBLEMA

Oggi un docente controlla:

●	Ministero

●	USR

●	USP

●	Scuole

●	INPA

●	Gazzetta Ufficiale

più volte al giorno.

Domani dovrà controllare soltanto SportelloScuola.

Per riuscirci dobbiamo monitorare il sistema prima degli utenti.

\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_

10.3 PRINCIPIO FONDAMENTALE

Il sistema non monitora pagine.

Monitora eventi.

Esempi.

Una nuova ordinanza.

↓

Evento.

Una nuova convocazione.

↓

Evento.

Un interpello.

↓

Evento.

Una rettifica.

↓

Evento.

Una proroga.

↓

Evento.

Una modifica PDF.

↓

Evento.

Una nuova graduatoria.

↓

Evento.

Questo è perfettamente coerente con l’Event Driven Architecture definita nei Capitoli 2 e 4.

\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_

10.4 REGISTRO UNICO DELLE FONTI

Riprendiamo il Registro delle Fonti introdotto nel Capitolo 4 e lo trasformiamo in un componente operativo.

Ogni fonte avrà:

●	identificativo permanente;

●	ente proprietario;

●	tipologia;

●	priorità;

●	livello di affidabilità;

●	frequenza di aggiornamento osservata;

●	metodo di acquisizione;

●	stato di salute;

●	storico delle anomalie.

Questo registro è l’unico punto di configurazione delle fonti.

\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_

10.5 CLASSIFICAZIONE DELLE FONTI

Le fonti saranno classificate in livelli.

Livello A — Strategiche

Sono indispensabili.

Esempi:

●	Ministero dell’Istruzione e del Merito;

●	USR;

●	USP;

●	INPA;

●	Gazzetta Ufficiale.

Monitoraggio continuo.

\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_

Livello B — Operative

Portali istituzionali complementari.

Monitoraggio frequente.

\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_

Livello C — Contestuali

Fonti utilizzate per arricchire i contenuti.

Monitoraggio programmato.

\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_

Questa classificazione è coerente con la richiesta che avevi fatto di eliminare molte fonti poco utili e concentrarsi su quelle realmente autorevoli.

\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_

10.6 SOURCE OBSERVER

Ogni fonte possiede un osservatore dedicato.

Il suo compito NON è scaricare tutto.

Deve capire.

È cambiato qualcosa?

Se la risposta è:

No.

Non fa nulla.

Se la risposta è:

Sì.

Genera un evento.

Questo riduce drasticamente traffico e costi.

\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_

10.7 CHANGE DETECTION

Ogni cambiamento viene classificato.

Tipo 1

Nuovo contenuto.

\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_

Tipo 2

Documento modificato.

\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_

Tipo 3

Documento eliminato.

\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_

Tipo 4

URL modificato.

\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_

Tipo 5

Struttura del sito modificata.

\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_

Tipo 6

Errore temporaneo.

\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_

Tipo 7

Fonte non raggiungibile.

\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_

Ogni tipologia attiva procedure differenti.

\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_

10.8 SELF-HEALING CONNECTORS

Questa è una delle innovazioni principali.

Ogni connettore possiede una logica di auto-ripristino.

Se un USR cambia URL:

↓

il sistema cerca automaticamente:

●	redirect;

●	sitemap;

●	feed;

●	nuove sezioni;

●	documenti collegati;

●	pattern già conosciuti.

Solo se tutti i tentativi falliscono viene aperta una segnalazione.

Questo soddisfa il requisito che avevi espresso: la piattaforma deve adattarsi autonomamente ai cambiamenti delle fonti senza dipendere immediatamente da un intervento umano.

\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_

10.9 VALIDAZIONE

Prima che un evento entri nel Knowledge Graph deve essere verificato.

Controlli:

●	provenienza;

●	integrità;

●	duplicazione;

●	metadati;

●	completezza.

Solo gli eventi validati vengono pubblicati.

\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_

10.10 EVENT ENRICHMENT

L’evento viene arricchito automaticamente.

Esempio.

Nuovo interpello.

Il sistema aggiunge:

●	provincia;

●	scuola;

●	classe di concorso;

●	profili ATA interessati;

●	scadenza;

●	normativa collegata;

●	documenti correlati.

Questo riduce il lavoro delle sezioni successive.

\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_

10.11 PRIORITÀ

Non tutti gli eventi hanno la stessa importanza.

Livello Critico:

●	nuove ordinanze;

●	aperture GPS;

●	convocazioni;

●	rettifiche.

Livello Alto:

●	interpelli;

●	decreti;

●	note ministeriali.

Livello Normale:

●	comunicazioni ordinarie.

Le priorità guideranno anche il Notification Engine che progetteremo nel capitolo successivo.

\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_

10.12 OSSERVABILITÀ

Ogni fonte produce metriche.

●	ultimo controllo;

●	ultimo cambiamento;

●	tempo medio di risposta;

●	percentuale di successo;

●	stabilità;

●	affidabilità;

●	numero di eventi prodotti.

Questi dati alimentano la console operativa descritta nel Capitolo 6.

\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_

10.13 KPI

Misureremo:

●	tempo medio di rilevazione di un nuovo evento;

●	percentuale di eventi acquisiti correttamente;

●	percentuale di recuperi automatici dei connettori;

●	numero di anomalie per fonte;

●	copertura delle fonti strategiche;

●	tempo medio di propagazione al Knowledge Graph.

\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_

10.14 ARCHITECTURE GATE

Prima di introdurre una nuova fonte, dovranno essere soddisfatti questi requisiti:

●	Problema risolto: aggiunge un’informazione che oggi manca?

●	Valore: alto.

●	Costo di manutenzione: sostenibile.

●	Affidabilità della fonte: verificata.

●	Duplicazione: assente.

●	Impatto architetturale: nullo o positivo.

Se non supera il gate, la fonte non viene integrata.

Questo evita l’accumulo incontrollato di sorgenti e mantiene la piattaforma focalizzata.

\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_

10.15 CRITERI DI ACCETTAZIONE

Il Source Intelligence Engine è conforme se:

●	tutte le fonti strategiche sono registrate e monitorate;

●	il sistema rileva eventi, non semplici pagine modificate;

●	ogni cambiamento è validato e arricchito prima di entrare nel Knowledge Graph;

●	i connettori sono in grado di tentare automaticamente il recupero in caso di modifiche strutturali;

●	ogni nuova fonte supera l’Architecture Gate.

\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_

CONCLUSIONE DEL CAPITOLO 10

Con questo capitolo SportelloScuola 2.0 acquisisce il suo sistema sensoriale.

La piattaforma non aspetta più che l’utente cerchi un’informazione: osserva costantemente il sistema scolastico, individua gli eventi rilevanti e li trasforma in conoscenza strutturata.

SPORTELLOSCUOLA 2.0

ENTERPRISE MASTER ARCHITECTURE (EMA)

PARTE II — IL MOTORE DELLA PIATTAFORMA

CAPITOLO 11

EVENT \& NOTIFICATION ENGINE

Il sistema che trasforma gli eventi in informazioni utili per l’utente

\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_

11.1 OBIETTIVO

Dopo aver progettato:

●	il Knowledge Graph;

●	la Ricerca Universale;

●	il Source Intelligence Engine;

serve un componente che trasformi gli eventi rilevati in informazioni utili.

Il Notification Engine non cerca dati.

Riceve eventi già validati e decide:

●	se sono rilevanti;

●	per chi sono rilevanti;

●	quando comunicarli.

\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_

11.2 PRINCIPIO FONDAMENTALE

La piattaforma non invia notifiche.

La piattaforma comunica solo ciò che interessa realmente all’utente.

Questo evita spam e perdita di fiducia.

\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_

11.3 FLUSSO OPERATIVO

Ogni evento segue sempre lo stesso percorso.

Evento rilevato



↓



Evento validato



↓



Classificazione



↓



Verifica destinatari



↓



Generazione notifica



↓



Consegna



↓



Monitoraggio



Il Notification Engine non modifica mai l’evento originale.

11.4 TIPOLOGIE DI EVENTO

Gli eventi vengono classificati secondo categorie standard.

●	Nuova normativa.

●	Aggiornamento di una normativa.

●	Nuovo interpello.

●	Nuova convocazione.

●	Pubblicazione graduatoria.

●	Rettifica.

●	Scadenza imminente.

●	Comunicazione istituzionale.

Questa classificazione sarà condivisa da tutta la piattaforma.

\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_

11.5 REGOLE DI RILEVANZA

Una notifica viene inviata solo se l’evento soddisfa almeno una regola.

Ad esempio:

●	riguarda la provincia seguita dall’utente;

●	riguarda il suo profilo professionale;

●	riguarda la sua classe di concorso;

●	riguarda un servizio salvato;

●	riguarda una ricerca monitorata.

Non verranno inviate notifiche generiche.

\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_

11.6 PREFERENZE DELL’UTENTE

Ogni utente potrà decidere cosa ricevere.

Le preferenze saranno semplici.

Ad esempio:

●	province di interesse;

●	profilo (docente, ATA, DSGA);

●	classi di concorso;

●	tipologia di eventi.

L’obiettivo è ridurre la complessità.

\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_

11.7 CANALI DI CONSEGNA

Le notifiche potranno essere visualizzate attraverso:

●	Centro Notifiche della piattaforma;

●	email;

●	notifiche push (nelle versioni future).

La logica rimane unica.

Cambiano solo i canali.

\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_

11.8 PRIORITÀ

Ogni notifica possiede una priorità.

Alta

Informazioni che richiedono un’azione in tempi brevi.

Media

Aggiornamenti importanti ma non urgenti.

Bassa

Informazioni di interesse generale.

La priorità influenza l’ordine di visualizzazione, non il contenuto.

\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_

11.9 STATO DELLE NOTIFICHE

Ogni notifica può assumere uno stato.

●	Nuova.

●	Letta.

●	Archiviata.

Questo è sufficiente per la prima versione della piattaforma.

\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_

11.10 COLLEGAMENTO AI PRODOTTI

Le notifiche non contengono tutte le informazioni.

Rimandano sempre al prodotto competente.

Esempio.

Una convocazione.

↓

Apre il prodotto Nomine.

Una nuova ordinanza.

↓

Apre Normativa.

Un interpello.

↓

Apre Interpelli.

Questo mantiene ogni responsabilità nel prodotto corretto.

\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_

11.11 MONITORAGGIO

Il sistema registra:

●	notifiche generate;

●	notifiche consegnate;

●	notifiche aperte;

●	notifiche ignorate.

Questi dati serviranno esclusivamente a migliorare la qualità del servizio.

\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_

11.12 KPI

Misureremo:

●	tempo medio tra evento e notifica;

●	percentuale di consegna;

●	percentuale di apertura;

●	notifiche realmente rilevanti;

●	notifiche disattivate dagli utenti.

L’obiettivo non è inviare più notifiche.

È inviare notifiche migliori.

\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_

11.13 CRITERI DI ACCETTAZIONE

Il Notification Engine è conforme se:

●	riceve solo eventi validati;

●	non genera duplicati;

●	invia notifiche solo agli utenti interessati;

●	mantiene separata la logica dei prodotti;

●	tutte le notifiche sono tracciabili.

\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_

CONCLUSIONE DEL CAPITOLO 11

Con questo capitolo termina la progettazione dell’infrastruttura trasversale della piattaforma.

Da questo momento sono presenti tutti i servizi comuni:

●	Knowledge Graph;

●	AI Core;

●	Ricerca Universale;

●	Source Intelligence Engine;

●	Notification Engine.

I prossimi capitoli non costruiranno nuovi motori.

Costruiranno i prodotti che utilizzeranno questi motori.

SPORTELLOSCUOLA 2.0

ENTERPRISE MASTER ARCHITECTURE (EMA)

PARTE III

I PRODOTTI DELLA PIATTAFORMA

PRODOTTO 1

NORMATIVA \& DOCUMENTI

CAPITOLO 12

VISIONE DEL PRODOTTO

Il punto di riferimento nazionale per la normativa scolastica

\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_

12.1 Scopo del prodotto

Il prodotto Normativa \& Documenti rappresenta il patrimonio documentale ufficiale di SportelloScuola 2.0.

Il suo compito è raccogliere, organizzare, collegare e rendere facilmente consultabile tutta la documentazione che disciplina il sistema scolastico italiano.

L’obiettivo non è creare un semplice archivio.

L’obiettivo è consentire a qualsiasi docente, ATA, dirigente o aspirante di trovare in pochi secondi il documento corretto e comprenderne immediatamente il contesto.

\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_

12.2 Il problema attuale

Oggi chi lavora nella scuola è costretto a cercare documenti tra numerose fonti differenti.

Una stessa informazione può trovarsi:

●	sul sito del Ministero;

●	su un USR;

●	in una nota ministeriale;

●	in una circolare;

●	in un decreto;

●	in una FAQ ufficiale.

Molti documenti modificano altri documenti.

Alcuni vengono superati.

Altri vengono rettificati.

Molti utenti non riescono a capire quale sia la versione realmente vigente.

SportelloScuola elimina questa frammentazione.

\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_

12.3 Obiettivo

L’utente deve poter rispondere a qualsiasi domanda normativa attraverso un unico prodotto.

Ad esempio:

●	Qual è la norma vigente?

●	È ancora valida?

●	Quali documenti l’hanno modificata?

●	Quali procedure disciplina?

●	Dove viene applicata?

●	Quali altre norme sono collegate?

Tutte queste informazioni devono essere disponibili senza dover consultare più siti.

\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_

12.4 Ambito del prodotto

Il prodotto comprenderà esclusivamente documentazione ufficiale.

Tra i principali contenuti:

●	Leggi.

●	Decreti legislativi.

●	Decreti ministeriali.

●	Ordinanze ministeriali.

●	Note ministeriali.

●	Circolari.

●	Contratti collettivi.

●	Accordi istituzionali.

●	Documentazione USR e USP di valore generale.

●	Documenti relativi a graduatorie, mobilità, concorsi, personale docente e ATA.

La selezione dei contenuti seguirà criteri di rilevanza e ufficialità, evitando documentazione ridondante o non pertinente.

\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_

12.5 Organizzazione delle informazioni

La consultazione non sarà organizzata soltanto per tipologia di documento.

Ogni documento sarà raggiungibile anche attraverso il tema trattato.

Ad esempio:

Graduatorie GPS

↓

Normativa principale

↓

Aggiornamenti

↓

FAQ

↓

Guide operative

↓

Documenti collegati

↓

Scadenze correlate

Lo stesso principio varrà per:

●	mobilità;

●	concorsi;

●	sostegno;

●	personale ATA;

●	pensioni;

●	formazione;

●	supplenze.

L’utente penserà all’argomento, non al nome del decreto.

\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_

12.6 Scheda documento

Ogni documento avrà una scheda uniforme.

La scheda conterrà:

●	titolo ufficiale;

●	ente emanante;

●	data di pubblicazione;

●	data di entrata in vigore;

●	stato (vigente, modificato, superato, abrogato);

●	sintesi introduttiva;

●	testo ufficiale;

●	documenti collegati;

●	cronologia delle modifiche;

●	argomenti trattati;

●	prodotti della piattaforma che lo utilizzano.

Questa struttura sarà identica per tutti i documenti.

\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_

12.7 Collegamenti intelligenti

Ogni documento sarà collegato automaticamente agli altri contenuti della piattaforma.

Ad esempio, una Ordinanza Ministeriale sulle GPS potrà mostrare direttamente:

●	le notizie che la riguardano;

●	gli interpelli pubblicati successivamente;

●	le convocazioni collegate;

●	le guide operative;

●	le FAQ;

●	gli articoli di approfondimento;

●	le scadenze previste.

L’utente non dovrà cercare manualmente queste relazioni.

\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_

12.8 Aggiornamento continuo

Il prodotto utilizza il Source Intelligence Engine progettato nella Parte II.

Quando una fonte ufficiale pubblica:

●	una nuova norma;

●	una rettifica;

●	una modifica;

●	un’integrazione;

il documento viene aggiornato mantenendo lo storico delle versioni e delle relazioni.

Questo consente di seguire l’evoluzione normativa nel tempo.

\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_

12.9 Ruolo nell’ecosistema

Normativa \& Documenti rappresenta il riferimento documentale per tutta la piattaforma.

Gli altri prodotti non archiviano copie dei documenti.

Si limitano a collegarsi a questo prodotto quando è necessario mostrare o spiegare una norma.

In questo modo esiste un unico punto di gestione della documentazione ufficiale.

\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_

12.10 Valore per l’utente

Il beneficio principale non è soltanto trovare rapidamente un documento.

Il vero valore è comprendere immediatamente:

●	se il documento è ancora valido;

●	perché è importante;

●	cosa modifica;

●	a quali procedure si applica;

●	quali altri contenuti della piattaforma sono collegati.

L’utente passa dalla semplice ricerca di un file alla comprensione completa del contesto normativo.

\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_

Conclusione del Capitolo 12

Con questo capitolo viene definita la missione del primo prodotto della piattaforma.

Normativa \& Documenti non è un archivio digitale né una raccolta di PDF: è il dominio centrale della conoscenza normativa di SportelloScuola 2.0.

Tutti gli altri prodotti — Interpelli, Nomine, Notizie, Sindacalista AI, Calcolo Punteggio e Servizi — utilizzeranno questo patrimonio documentale come riferimento ufficiale, garantendo coerenza e unicità dell’informazione in tutto l’ecosistema.

SPORTELLOSCUOLA 2.0

ENTERPRISE MASTER ARCHITECTURE (EMA)

PARTE III

PRODOTTO 1 — NORMATIVA \& DOCUMENTI

CAPITOLO 13

ARCHITETTURA DEL PATRIMONIO DOCUMENTALE

Come viene organizzata tutta la conoscenza normativa

\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_

13.1 Obiettivo

Il valore del prodotto non dipende dalla quantità dei documenti presenti, ma da come vengono organizzati.

Un archivio con migliaia di PDF è poco utile se l’utente non riesce a trovare rapidamente ciò che cerca.

Per questo motivo ogni documento entrerà nella piattaforma seguendo una struttura uniforme, indipendentemente dalla fonte di provenienza.

\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_

13.2 Il Documento come entità centrale

All’interno della piattaforma il documento non è considerato un semplice file.

È una entità informativa.

Ogni documento possiede una propria identità e una serie di informazioni che permettono di comprenderne il significato e le relazioni con gli altri contenuti.

Il file PDF rappresenta soltanto una delle sue componenti.

\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_

13.3 Identità del documento

Ogni documento sarà identificato in modo univoco.

Per ciascun documento saranno memorizzati almeno:

●	identificativo interno permanente;

●	titolo ufficiale;

●	numero dell’atto (se presente);

●	ente emanante;

●	data di pubblicazione;

●	data di entrata in vigore;

●	stato di validità;

●	versione corrente.

Questa identità rimane invariata anche quando il documento viene aggiornato.

\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_

13.4 Classificazione

Per rendere semplice la consultazione, ogni documento verrà classificato secondo più dimensioni.

Tipologia

Ad esempio:

●	Legge;

●	Decreto Legislativo;

●	Decreto Ministeriale;

●	Ordinanza Ministeriale;

●	Nota Ministeriale;

●	Circolare;

●	Contratto Collettivo;

●	Accordo;

●	Bando;

●	Avviso.

\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_

Argomento

Ad esempio:

●	GPS;

●	Mobilità;

●	ATA;

●	Docenti;

●	Concorsi;

●	Sostegno;

●	Pensioni;

●	Formazione;

●	Supplenze;

●	Organici.

Un documento potrà appartenere a più argomenti.

\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_

Destinatari

Ogni documento indicherà chiaramente a chi si applica.

Ad esempio:

●	Docenti;

●	ATA;

●	DSGA;

●	Dirigenti scolastici;

●	Aspiranti;

●	Tutto il personale.

\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_

Livello territoriale

●	Nazionale;

●	Regionale;

●	Provinciale.

Questo permetterà di filtrare rapidamente i contenuti realmente rilevanti.

\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_

13.5 Stato del documento

Uno dei problemi più frequenti riguarda la validità delle norme.

Per questo ogni documento avrà uno stato chiaro.

●	Vigente.

●	Modificato.

●	Integrato.

●	Superato.

●	Abrogato.

●	Sospeso.

L’utente non dovrà interpretare autonomamente la situazione normativa.

\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_

13.6 Versionamento

La piattaforma conserverà la cronologia delle modifiche.

Quando un documento viene aggiornato:

●	non viene sostituito;

●	viene creata una nuova versione;

●	rimane disponibile lo storico.

Per ogni versione saranno indicate:

●	data della modifica;

●	motivo della modifica (quando disponibile);

●	collegamento alla versione precedente.

In questo modo sarà possibile ricostruire l’evoluzione normativa.

\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_

13.7 Relazioni tra documenti

Uno dei principali punti di forza della piattaforma sarà la rete di collegamenti.

Ogni documento potrà essere collegato ad altri documenti attraverso relazioni esplicite.

Ad esempio:

●	modifica;

●	integra;

●	sostituisce;

●	richiama;

●	attua;

●	interpreta;

●	rettifica;

●	applica.

Queste relazioni saranno costruite automaticamente quando possibile e validate secondo le procedure definite nella governance.

\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_

13.8 Indicizzazione

Per garantire ricerche rapide, ogni documento verrà indicizzato utilizzando:

●	titolo;

●	contenuto testuale;

●	riferimenti normativi;

●	argomenti;

●	enti;

●	territorio;

●	date;

●	parole chiave.

L’indicizzazione sarà aggiornata automaticamente ad ogni nuova versione.

\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_

13.9 Collegamenti con gli altri prodotti

Il prodotto Normativa \& Documenti non opera isolatamente.

Costituisce il riferimento documentale dell’intera piattaforma.

I principali collegamenti saranno:

●	Notizie \& Scadenze, che richiameranno sempre la normativa di riferimento;

●	Interpelli, che potranno essere collegati alle disposizioni normative applicabili;

●	Nomine GPS, che mostreranno le norme che disciplinano la procedura;

●	Calcolo Punteggio, che utilizzerà esclusivamente tabelle e criteri ufficiali;

●	Sindacalista AI, che costruirà le proprie risposte partendo dai documenti presenti in questo prodotto.

In questo modo la normativa viene gestita in un solo punto e riutilizzata ovunque.

\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_

13.10 Controllo qualità

Prima di essere pubblicato, ogni documento dovrà superare verifiche automatiche.

Saranno controllati:

●	completezza dei metadati;

●	presenza del testo ufficiale;

●	correttezza della classificazione;

●	assenza di duplicati;

●	integrità dei collegamenti;

●	validità della fonte.

Solo dopo questi controlli il documento diventa consultabile.

\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_

13.11 Evoluzione del patrimonio documentale

Il patrimonio documentale è progettato per crescere nel tempo.

L’introduzione di nuove tipologie di atti o nuove fonti non richiederà modifiche strutturali al prodotto.

Sarà sufficiente aggiornare il modello di classificazione e il Registro delle Fonti già definito nelle parti precedenti.

Questa scelta garantisce continuità e semplicità di evoluzione.

\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_

Conclusione del Capitolo 13

Con questo capitolo viene definita l’architettura del patrimonio documentale di SportelloScuola 2.0.

Ogni documento diventa un elemento strutturato, classificato, versionato e collegato agli altri contenuti della piattaforma. Non esiste più un semplice archivio di PDF, ma un sistema organizzato che permette di comprendere immediatamente il ruolo, la validità e le relazioni di ogni atto.

Questa struttura costituirà il fondamento non solo del prodotto Normativa \& Documenti, ma anche di tutti gli altri prodotti che utilizzeranno la documentazione ufficiale come base delle proprie funzionalità. Da questo momento in avanti, l’obiettivo non sarà aggiungere documenti, ma costruire un patrimonio informativo coerente, affidabile e facilmente consultabile.

SPORTELLOSCUOLA 2.0

ENTERPRISE MASTER ARCHITECTURE (EMA)

PARTE III

PRODOTTO 1 — NORMATIVA \& DOCUMENTI

CAPITOLO 14

ESPERIENZA DI CONSULTAZIONE

Progettare la consultazione della normativa, non la semplice lettura dei documenti

\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_

14.1 Obiettivo

Il valore del prodotto non consiste soltanto nell’avere i documenti.

Il valore consiste nel rendere la consultazione semplice, veloce e comprensibile.

L’utente non deve avere la sensazione di entrare in un archivio amministrativo.

Deve percepire di trovarsi in un ambiente progettato per risolvere rapidamente un dubbio.

\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_

14.2 Punto di accesso

L’accesso al prodotto sarà unico.

L’utente potrà iniziare la consultazione in tre modi:

●	ricerca libera;

●	navigazione per argomenti;

●	consultazione cronologica.

Queste modalità non rappresentano percorsi separati, ma tre modi diversi di accedere allo stesso patrimonio documentale.

\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_

14.3 Navigazione per argomenti

L’organizzazione principale sarà costruita sui temi.

Ad esempio:

●	Graduatorie GPS;

●	Personale ATA;

●	Mobilità;

●	Concorsi;

●	Supplenze;

●	Sostegno;

●	Organici;

●	Pensioni;

●	Formazione.

Ogni argomento rappresenta un punto di accesso alla documentazione collegata.

L’utente non dovrà conoscere il nome del provvedimento per trovare ciò che cerca.

\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_

14.4 Pagina dell’argomento

Ogni argomento avrà una struttura uniforme.

La pagina conterrà:

●	breve introduzione;

●	documenti fondamentali;

●	documenti di aggiornamento;

●	documenti storici;

●	cronologia delle principali modifiche.

Questa struttura sarà identica per tutti gli argomenti.

\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_

14.5 Scheda del documento

Quando l’utente apre un documento, la consultazione sarà organizzata in sezioni chiaramente distinguibili.

La parte superiore mostrerà le informazioni essenziali:

●	titolo;

●	ente emanante;

●	data;

●	stato di validità;

●	ambito di applicazione.

Successivamente saranno disponibili:

●	sintesi;

●	testo ufficiale;

●	cronologia delle versioni;

●	riferimenti normativi collegati.

L’obiettivo è consentire all’utente di orientarsi immediatamente.

\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_

14.6 Sintesi introduttiva

Ogni documento sarà accompagnato da una sintesi redatta in linguaggio chiaro.

La sintesi non sostituisce il testo ufficiale.

Ha esclusivamente lo scopo di aiutare l’utente a comprenderne rapidamente il contenuto.

Il testo originale rimane sempre il riferimento giuridico.

\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_

14.7 Cronologia normativa

Ogni documento presenterà una cronologia.

L’utente potrà vedere:

●	quando è stato pubblicato;

●	quando è stato modificato;

●	quali aggiornamenti ha ricevuto;

●	quale versione è vigente.

Questo elimina uno dei principali problemi della consultazione normativa: capire quale testo è attualmente applicabile.

\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_

14.8 Documenti collegati

Durante la consultazione saranno mostrati esclusivamente collegamenti realmente utili.

Ad esempio:

●	atto che modifica il documento;

●	atto richiamato;

●	atto sostitutivo;

●	testo consolidato (quando disponibile).

Non verranno proposti collegamenti irrilevanti.

L’obiettivo è favorire l’approfondimento senza creare confusione.

\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_

14.9 Filtri

I filtri saranno semplici e coerenti.

L’utente potrà limitare i risultati per:

●	tipologia di atto;

●	argomento;

●	ente emanante;

●	livello territoriale;

●	stato del documento;

●	periodo temporale.

Non saranno introdotti filtri ridondanti o poco utilizzati.

\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_

14.10 Accessibilità

La consultazione dovrà rispettare i principi di accessibilità.

In particolare:

●	struttura chiara;

●	testi leggibili;

●	navigazione da tastiera;

●	compatibilità con tecnologie assistive;

●	corretta gerarchia dei contenuti.

L’obiettivo è garantire un utilizzo efficace da parte di tutti gli utenti.

\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_

14.11 Prestazioni

La consultazione dovrà essere immediata.

Le operazioni più frequenti — apertura di un documento, ricerca e navigazione tra gli argomenti — dovranno mantenere tempi di risposta ridotti anche con un archivio documentale molto esteso.

Per ottenere questo risultato saranno utilizzati i meccanismi di indicizzazione e ottimizzazione definiti nelle parti precedenti.

\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_

14.12 Coerenza dell’esperienza

Ogni documento utilizzerà la stessa struttura grafica e informativa.

L’utente, dopo aver imparato a consultare un documento, saprà automaticamente consultare tutti gli altri.

Questa uniformità riduce il tempo di apprendimento e rende il prodotto immediatamente familiare.

\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_

Conclusione del Capitolo 14

Con questo capitolo viene progettata l’esperienza di consultazione del patrimonio normativo.

L’attenzione non è rivolta alla quantità dei documenti, ma alla loro leggibilità, organizzazione e facilità di utilizzo.

Il prodotto assume così una forma concreta: un ambiente ordinato in cui ogni documento è facilmente individuabile, comprensibile e contestualizzato.

SPORTELLOSCUOLA 2.0

ENTERPRISE MASTER ARCHITECTURE (EMA)

PARTE III

PRODOTTO 1 – NORMATIVA \& DOCUMENTI

CAPITOLO 15

CICLO DI VITA DEL DOCUMENTO

Come ogni documento viene acquisito, aggiornato e mantenuto nel tempo

\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_

15.1 Obiettivo

Il valore del prodotto dipende dall’affidabilità dei suoi contenuti.

Per questo motivo ogni documento seguirà un ciclo di vita definito, dall’acquisizione fino all’eventuale archiviazione.

L’obiettivo è garantire che ogni informazione disponibile sia sempre coerente con lo stato della normativa.

\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_

15.2 Acquisizione

Quando una fonte ufficiale pubblica un nuovo documento, questo viene acquisito automaticamente dal sistema di monitoraggio progettato nella Parte II.

In questa fase il documento non è ancora consultabile.

Entra in un processo di preparazione.

\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_

15.3 Analisi iniziale

Il sistema identifica automaticamente:

●	tipologia del documento;

●	ente emanante;

●	data;

●	oggetto;

●	riferimenti normativi presenti nel testo;

●	eventuali documenti già esistenti correlati.

Queste informazioni costituiscono la base della classificazione.

\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_

15.4 Classificazione

Successivamente il documento viene inserito nel patrimonio documentale.

Ogni documento viene classificato secondo i criteri definiti nel Capitolo 13.

La classificazione deve essere uniforme per tutto il prodotto.

Non saranno previste eccezioni.

\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_

15.5 Verifica della completezza

Prima della pubblicazione vengono controllati:

●	presenza del testo ufficiale;

●	completezza dei metadati;

●	correttezza della classificazione;

●	integrità del file;

●	assenza di duplicati.

Se uno di questi controlli non viene superato, il documento rimane nello stato di elaborazione fino alla risoluzione del problema.

\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_

15.6 Pubblicazione

Solo dopo il completamento delle verifiche il documento diventa disponibile agli utenti.

La pubblicazione è immediata e mantiene la struttura uniforme definita nei capitoli precedenti.

\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_

15.7 Aggiornamenti

Quando un documento viene modificato dall’ente che lo ha emanato, la piattaforma non sostituisce il contenuto esistente.

Aggiorna la scheda del documento mantenendo traccia della modifica.

In questo modo l’utente dispone sempre della versione corrente senza perdere lo storico.

\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_

15.8 Gestione delle rettifiche

Le rettifiche rappresentano un caso particolare.

Quando una rettifica riguarda un documento già pubblicato:

●	il collegamento tra i due documenti viene creato automaticamente;

●	la scheda del documento principale evidenzia la presenza della rettifica;

●	la cronologia viene aggiornata.

L’utente può comprendere immediatamente che il documento ha subito una modifica.

\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_

15.9 Documenti superati

Quando una norma perde efficacia non viene eliminata.

Viene mantenuta nell’archivio con l’indicazione del nuovo stato.

La piattaforma continua quindi a svolgere anche una funzione di consultazione storica.

\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_

15.10 Archiviazione

L’archiviazione non rappresenta una cancellazione.

Il documento:

●	rimane disponibile;

●	continua ad essere ricercabile;

●	conserva tutti i collegamenti;

●	mantiene il proprio storico.

Cambiano esclusivamente lo stato e il livello di evidenza durante la consultazione.

\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_

15.11 Correzioni

Qualora venga rilevato un errore nella classificazione o nei metadati, la correzione non modifica il contenuto ufficiale del documento.

Vengono aggiornate esclusivamente le informazioni gestionali della piattaforma.

In questo modo è sempre preservata l’integrità della fonte ufficiale.

\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_

15.12 Tracciabilità

Ogni modifica effettuata sulla scheda di un documento viene registrata.

Per ciascun aggiornamento saranno conservati:

●	data;

●	tipologia della modifica;

●	elemento modificato.

Questo garantisce trasparenza e continuità nella gestione del patrimonio documentale.

\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_

15.13 Qualità del patrimonio documentale

L’obiettivo non è aumentare continuamente il numero dei documenti.

L’obiettivo è mantenere un archivio:

●	aggiornato;

●	coerente;

●	facilmente consultabile;

●	affidabile.

La qualità dell’archivio rappresenta il principale indicatore del valore del prodotto.

\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_

Conclusione del Capitolo 15

Con questo capitolo viene completata la progettazione del ciclo di vita del documento.

Ogni atto segue un percorso chiaro: acquisizione, analisi, classificazione, verifica, pubblicazione, aggiornamento e archiviazione.

Questo garantisce che il patrimonio normativo di SportelloScuola 2.0 rimanga ordinato e affidabile nel tempo, senza perdere la memoria storica dell’evoluzione delle norme.

SPORTELLOSCUOLA 2.0

ENTERPRISE MASTER ARCHITECTURE (EMA)

PARTE III

PRODOTTO 1 – NORMATIVA \& DOCUMENTI

CAPITOLO 16

PROGETTAZIONE FUNZIONALE DEL PORTALE

La struttura completa della sezione “Normativa \& Documenti”

\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_

16.1 Obiettivo

La sezione Normativa \& Documenti deve diventare il luogo in cui qualsiasi operatore della scuola entra con una domanda ed esce con una risposta.

Non deve sembrare un archivio.

Non deve sembrare una raccolta di PDF.

Deve essere percepita come una biblioteca digitale intelligente, costruita attorno ai bisogni dell’utente.

L’utente non entra per leggere un decreto.

Entra per risolvere un problema.

\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_

16.2 Principio progettuale

Ogni elemento della sezione deve rispondere ad una domanda.

Ad esempio.

“Cerco una norma.”

↓

Ricerca.

\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_

“Non conosco il nome della norma.”

↓

Navigazione per argomenti.

\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_

“So già quale documento mi serve.”

↓

Accesso diretto.

\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_

“Voglio capire cosa è cambiato.”

↓

Cronologia.

\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_

La struttura deve adattarsi al modo di ragionare dell’utente.

Mai il contrario.

\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_

16.3 Home del prodotto

La Home della sezione non mostrerà un elenco di documenti.

Presenterà invece quattro aree principali.

Ricerca

La barra di ricerca sarà l’elemento predominante.

L’utente deve poter iniziare immediatamente la consultazione.

\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_

Argomenti principali

I principali temi della scuola saranno presentati come categorie facilmente riconoscibili.

Ad esempio:

●	GPS;

●	ATA;

●	Mobilità;

●	Concorsi;

●	Supplenze;

●	Sostegno;

●	Organici;

●	Pensioni;

●	Formazione.

Queste categorie rappresentano il punto di ingresso principale per chi non conosce il riferimento normativo.

\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_

Ultimi aggiornamenti

Una sezione mostrerà esclusivamente gli ultimi documenti pubblicati o modificati.

Non conterrà commenti.

Solo aggiornamenti ufficiali.

\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_

Consultazioni frequenti

La piattaforma evidenzierà gli argomenti maggiormente consultati.

Questa area sarà dinamica e varierà durante l’anno scolastico.

Ad esempio, nel periodo di aggiornamento GPS saranno naturalmente evidenziati i contenuti relativi alle graduatorie.

\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_

16.4 Pagina Argomento

Ogni argomento seguirà la stessa struttura.

Nella parte superiore sarà presente una breve introduzione che spiega il tema.

Successivamente saranno organizzati:

●	documenti fondamentali;

●	aggiornamenti recenti;

●	documentazione storica;

●	domande ricorrenti;

●	collegamenti utili.

L’utente deve poter comprendere rapidamente l’intero panorama normativo relativo a quell’argomento.

\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_

16.5 Pagina Documento

La pagina dedicata a un singolo documento sarà progettata per facilitare la lettura.

La parte iniziale mostrerà immediatamente:

●	titolo;

●	ente emanante;

●	data;

●	stato della norma;

●	sintesi.

Il testo ufficiale sarà consultabile senza interruzioni.

Accanto al documento saranno disponibili i riferimenti collegati e la cronologia degli aggiornamenti.

\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_

16.6 Percorsi di navigazione

La navigazione dovrà essere sempre prevedibile.

Ogni pagina mostrerà chiaramente il percorso seguito.

Ad esempio:

Normativa

→ Graduatorie GPS

→ Ordinanze Ministeriali

→ Documento

L’utente saprà sempre dove si trova.

\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_

16.7 Ricerca all’interno del documento

I documenti particolarmente estesi potranno essere consultati attraverso una ricerca interna.

La ricerca evidenzierà direttamente le parti del testo contenenti il termine cercato.

Questa funzione riduce notevolmente i tempi di consultazione.

\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_

16.8 Esportazione e condivisione

Ogni documento potrà essere:

●	scaricato nel formato ufficiale;

●	condiviso tramite collegamento permanente;

●	salvato tra i preferiti dell’utente.

La piattaforma non modificherà mai il documento originale.

\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_

16.9 Collegamenti contestuali

Durante la consultazione saranno mostrati solo collegamenti realmente pertinenti.

Ad esempio, consultando una Ordinanza sulle GPS, l’utente potrà raggiungere direttamente eventuali decreti attuativi, note esplicative o rettifiche.

L’obiettivo è costruire un percorso di approfondimento naturale, evitando elenchi eccessivi di riferimenti.

\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_

16.10 Esperienza uniforme

Qualunque sia il documento consultato, la struttura della pagina rimarrà identica.

Questa uniformità permette all’utente di concentrarsi sul contenuto senza dover imparare modalità di consultazione differenti.

\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_

16.11 Aggiornamento della Home

La Home del prodotto non sarà aggiornata manualmente.

Le sezioni dedicate agli aggiornamenti, agli argomenti più consultati e ai documenti recenti saranno alimentate automaticamente dai dati già presenti nel patrimonio documentale.

In questo modo la Home rifletterà sempre lo stato reale della normativa senza richiedere interventi editoriali continui.

\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_

16.12 Obiettivo finale del prodotto

Al termine della progettazione, il prodotto Normativa \& Documenti dovrà essere percepito come il punto di riferimento nazionale per la consultazione della normativa scolastica.

L’utente non dovrà più domandarsi:

●	dove trovare un documento;

●	quale versione sia valida;

●	quali atti siano collegati.

Troverà tutto all’interno di un unico ambiente, organizzato in modo semplice e coerente.

\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_

Conclusione del Capitolo 16

Con questo capitolo il prodotto assume una forma concreta.

Non è più soltanto un archivio strutturato, ma una sezione progettata attorno ai bisogni reali dell’utente: consultazione rapida, orientamento immediato e accesso semplice ai documenti ufficiali.

L’interfaccia, la navigazione e l’organizzazione dei contenuti sono pensate per ridurre il tempo necessario a trovare e comprendere una norma, mantenendo sempre un’esperienza uniforme.

SPORTELLOSCUOLA 2.0

ENTERPRISE MASTER ARCHITECTURE (EMA)

PARTE III

PRODOTTO 1 – NORMATIVA \& DOCUMENTI

CAPITOLO 17

MODELLO EDITORIALE E GESTIONE DELLA CONOSCENZA

Come trasformare i documenti ufficiali in conoscenza facilmente consultabile

\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_

17.1 Obiettivo

Ogni documento ufficiale rappresenta una fonte normativa.

La piattaforma non modifica il contenuto della fonte.

Il suo compito è renderla comprensibile, contestualizzata e facilmente consultabile.

L’obiettivo è ridurre il tempo necessario per comprendere una norma senza alterarne il significato giuridico.

\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_

17.2 Separazione tra fonte e contenuto editoriale

Ogni documento sarà composto da due livelli distinti.

Livello 1

Documento ufficiale.

È il testo pubblicato dall’ente competente.

Non viene modificato.

\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_

Livello 2

Contenuto editoriale.

È prodotto dalla piattaforma.

Comprende:

●	sintesi;

●	spiegazioni;

●	contesto;

●	collegamenti;

●	parole chiave.

Questa separazione garantisce chiarezza e trasparenza.

L’utente saprà sempre distinguere ciò che è ufficiale da ciò che è stato elaborato da SportelloScuola.

\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_

17.3 Sintesi del documento

Ogni documento sarà accompagnato da una sintesi uniforme.

La sintesi dovrà rispondere rapidamente a cinque domande.

Di cosa parla?

Chi riguarda?

Cosa cambia rispetto a prima?

Quando si applica?

Quali sono i documenti collegati?

L’obiettivo è consentire all’utente di capire immediatamente se quel documento è rilevante per la propria esigenza.

\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_

17.4 Linguaggio

Il linguaggio utilizzato nelle sintesi dovrà essere:

●	chiaro;

●	tecnico quando necessario;

●	privo di interpretazioni personali;

●	coerente in tutta la piattaforma.

La piattaforma spiega la norma.

Non esprime opinioni sulla norma.

\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_

17.5 Collegamenti editoriali

Ogni documento sarà inserito in un contesto.

Ad esempio una nuova Ordinanza Ministeriale sulle GPS sarà collegata a:

●	normativa precedente;

●	normativa sostituita;

●	eventuali rettifiche;

●	documenti applicativi;

●	cronologia dell’argomento.

L’utente comprenderà immediatamente la posizione del documento nel sistema normativo.

\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_

17.6 Evitare duplicazioni

Uno dei principali problemi dei portali scolastici è la duplicazione delle informazioni.

La stessa norma viene spesso spiegata in più articoli differenti.

SportelloScuola adotterà un principio semplice.

Ogni informazione esiste una sola volta.

Le altre sezioni si limiteranno a richiamarla.

In questo modo ogni aggiornamento avrà effetto su tutta la piattaforma.

\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_

17.7 Aggiornamento editoriale

Quando un documento viene aggiornato:

●	viene verificata la sintesi;

●	vengono aggiornati i collegamenti;

●	viene verificato il contesto;

●	viene controllata la cronologia.

L’utente visualizzerà sempre una documentazione coerente.

\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_

17.8 Argomenti

Ogni documento contribuirà ad arricchire uno o più argomenti.

Gli argomenti non saranno semplici categorie.

Saranno vere aree di conoscenza.

Ad esempio:

Graduatorie GPS

conterrà progressivamente tutta la documentazione relativa a quel tema.

Nel tempo ogni argomento diventerà sempre più completo.

\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_

17.9 Evoluzione della conoscenza

L’obiettivo della piattaforma non è soltanto archiviare nuovi documenti.

È costruire un patrimonio di conoscenza che migliora continuamente.

Ogni nuovo documento arricchisce gli argomenti esistenti invece di creare nuove sezioni scollegate.

Questo rende la crescita della piattaforma ordinata e sostenibile.

\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_

17.10 Qualità editoriale

La qualità sarà valutata attraverso indicatori concreti.

Ad esempio:

●	completezza della scheda;

●	chiarezza della sintesi;

●	correttezza dei collegamenti;

●	aggiornamento delle versioni;

●	assenza di contenuti duplicati.

L’obiettivo non è produrre più contenuti.

È produrre contenuti migliori.

\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_

17.11 Esperienza dell’utente

Al termine della consultazione l’utente dovrà avere la sensazione di aver trovato:

●	il documento corretto;

●	una spiegazione comprensibile;

●	tutti i riferimenti necessari.

Non dovrà continuare la ricerca su altri portali.

Questo è il vero indicatore del successo del prodotto.

\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_

Conclusione del Capitolo 17

Con questo capitolo si completa la progettazione del modello editoriale di Normativa \& Documenti.

Il prodotto non si limita a raccogliere atti ufficiali, ma costruisce un patrimonio informativo coerente, aggiornato e facilmente comprensibile, mantenendo sempre una netta distinzione tra fonte normativa e contenuto editoriale.

Questa scelta garantisce affidabilità, trasparenza e una crescita ordinata della piattaforma nel tempo.

SPORTELLOSCUOLA 2.0

ENTERPRISE MASTER ARCHITECTURE (EMA)

PARTE III

PRODOTTO 1 – NORMATIVA \& DOCUMENTI

CAPITOLO 18

VALIDAZIONE DEL PRODOTTO

Verifica della completezza e dell’efficacia del sistema Normativa \& Documenti

\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_

18.1 Finalità

Il prodotto deve essere valutato in base alla sua capacità di risolvere un problema concreto.

La domanda di riferimento è semplice.

Un docente o un ATA riesce a trovare, comprendere e utilizzare una norma senza dover consultare altri portali?

Se la risposta è sì, il prodotto ha raggiunto il proprio obiettivo.

\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_

18.2 Scenario 1 – Ricerca di una norma

Un utente cerca la normativa relativa all’aggiornamento delle GPS.

Il sistema deve consentire di:

●	individuare rapidamente l’argomento;

●	visualizzare la normativa principale;

●	distinguere la versione vigente da quelle precedenti;

●	comprendere le modifiche intervenute nel tempo.

Il percorso deve essere lineare e non richiedere conoscenze giuridiche.

\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_

18.3 Scenario 2 – Documento conosciuto

L’utente conosce già il nome dell’atto.

Inserisce il titolo o il numero del provvedimento.

Il sistema restituisce direttamente il documento corretto, mostrando lo stato di validità e i collegamenti essenziali.

\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_

18.4 Scenario 3 – Ricerca per argomento

L’utente non conosce alcun riferimento normativo.

Sa soltanto che il problema riguarda, ad esempio, la mobilità.

Attraverso la navigazione per argomenti raggiunge rapidamente la documentazione necessaria senza dover interpretare la struttura amministrativa delle fonti.

\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_

18.5 Scenario 4 – Documento modificato

L’utente consulta una norma che è stata successivamente aggiornata.

Il sistema evidenzia chiaramente:

●	che esiste una modifica;

●	quale versione è vigente;

●	quali documenti hanno determinato il cambiamento.

L’utente non rischia di utilizzare informazioni superate.

\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_

18.6 Scenario 5 – Approfondimento

Durante la consultazione emerge la necessità di comprendere meglio il contesto.

Il sistema rende immediatamente disponibili:

●	documenti richiamati;

●	atti collegati;

●	cronologia normativa.

L’approfondimento avviene senza interrompere la consultazione.

\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_

18.7 Indicatori di efficacia

Il prodotto può essere considerato efficace se:

●	la ricerca porta rapidamente al documento corretto;

●	la struttura dei contenuti è comprensibile anche a utenti non esperti;

●	la normativa vigente è sempre identificabile;

●	le relazioni tra documenti risultano chiare;

●	l’utente conclude la ricerca senza ricorrere ad altre fonti.

\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_

18.8 Limiti del prodotto

Normativa \& Documenti non fornisce consulenza.

Non interpreta la legge.

Non sostituisce gli enti competenti.

Il suo compito è organizzare e rendere accessibile la documentazione ufficiale, offrendo strumenti di comprensione e collegamento.

\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_

18.9 Ruolo nell’ecosistema

Con la conclusione del Prodotto 1 viene definito il patrimonio normativo dell’intera piattaforma.

Da questo momento tutti gli altri prodotti utilizzeranno questa base informativa.

Non creeranno copie della documentazione.

Faranno sempre riferimento a questo dominio centrale.

Questo garantisce:

●	un solo punto di aggiornamento;

●	informazioni coerenti;

●	assenza di duplicazioni;

●	uniformità dell’intero ecosistema.

\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_

18.10 Obiettivo raggiunto

Il prodotto è considerato completo quando:

●	la documentazione è organizzata in modo uniforme;

●	la consultazione è semplice;

●	gli aggiornamenti sono continui;

●	le relazioni tra documenti sono mantenute;

●	l’utente individua rapidamente le informazioni necessarie.

In queste condizioni il patrimonio normativo diventa una base stabile su cui costruire tutti gli altri servizi della piattaforma.

\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_

CONCLUSIONE DEL PRODOTTO 1

Con questo capitolo si conclude il primo prodotto di SportelloScuola 2.0.

Normativa \& Documenti diventa il dominio centrale della conoscenza normativa dell’intera piattaforma.

Non rappresenta un semplice archivio di atti ufficiali, ma un sistema organizzato, aggiornato e progettato per rendere la normativa realmente fruibile.

La sua progettazione è completa e non richiede ulteriori estensioni prima dello sviluppo.

SPORTELLOSCUOLA 2.0

ENTERPRISE MASTER ARCHITECTURE (EMA)

PARTE III

PRODOTTO 2

INTERPELLI

CAPITOLO 19

VISIONE DEL PRODOTTO

Dal semplice monitoraggio al motore nazionale degli interpelli

\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_

19.1 Missione

Il prodotto Interpelli ha una missione precisa.

Consentire a ogni aspirante docente e a ogni aspirante ATA di conoscere, in un unico luogo, tutte le opportunità pubblicate sul territorio nazionale, senza dover consultare quotidianamente decine o centinaia di siti istituzionali.

Il prodotto nasce per eliminare la frammentazione delle informazioni e ridurre drasticamente il tempo necessario per individuare un’opportunità realmente interessante.

\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_

19.2 Il problema

Oggi gli interpelli vengono pubblicati da soggetti diversi.

Ogni ente utilizza una struttura differente.

Cambiano:

●	organizzazione del sito;

●	modalità di pubblicazione;

●	formato dei documenti;

●	frequenza degli aggiornamenti.

L’utente è costretto a controllare manualmente numerose fonti, con il rischio concreto di perdere opportunità importanti.

\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_

19.3 Obiettivo

Il prodotto deve trasformare migliaia di pubblicazioni distribuite in un unico archivio nazionale, organizzato secondo criteri uniformi.

L’utente non deve più preoccuparsi della provenienza dell’informazione.

Deve concentrarsi esclusivamente sulla rilevanza dell’opportunità.

\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_

19.4 Ambito

Il prodotto raccoglierà esclusivamente interpelli ufficiali pubblicati dagli enti competenti.

Ogni pubblicazione sarà collegata alla fonte originaria e manterrà il riferimento al documento ufficiale.

La piattaforma non sostituirà mai la pubblicazione istituzionale.

Ne faciliterà la consultazione.

\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_

19.5 Unità informativa

L’unità fondamentale del prodotto non è il PDF.

È l’opportunità.

Ogni interpello verrà trasformato in una scheda strutturata.

La scheda conterrà, quando disponibili:

●	ente pubblicatore;

●	istituzione scolastica;

●	territorio;

●	tipologia di posto;

●	classe di concorso o profilo ATA;

●	durata dell’incarico;

●	data di pubblicazione;

●	scadenza;

●	modalità di candidatura;

●	collegamento al documento ufficiale.

Questa struttura uniforme renderà confrontabili interpelli provenienti da enti diversi.

\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_

19.6 Organizzazione

Gli interpelli non saranno organizzati per ente.

Saranno organizzati secondo i criteri con cui ragiona l’utente.

Ad esempio.

Per territorio

↓

Regione

↓

Provincia

↓

Comune.

\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_

Per profilo

↓

Docente

↓

ATA.

\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_

Per tipologia

↓

Supplenza annuale.

↓

Supplenza temporanea.

↓

Sostegno.

↓

Spezzone.

\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_

L’ente pubblicatore rimane sempre visibile, ma non costituisce il principale criterio di navigazione.

\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_

19.7 Aggiornamento

Il prodotto riceve gli aggiornamenti attraverso il Source Intelligence Engine progettato nella Parte II.

Ogni nuova pubblicazione viene analizzata, classificata e inserita automaticamente.

Le modifiche e le rettifiche vengono propagate mantenendo il collegamento con l’interpello originale.

\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_

19.8 Esperienza utente

L’utente entra nella sezione con un obiettivo semplice.

Capire rapidamente se esistono opportunità di interesse.

Per questo motivo ogni scheda dovrà permettere una valutazione immediata.

Le informazioni essenziali saranno sempre visibili senza aprire il documento.

L’accesso al PDF ufficiale rimarrà comunque disponibile.

\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_

19.9 Ruolo del prodotto

Interpelli rappresenta il primo prodotto realmente dinamico della piattaforma.

Mentre Normativa \& Documenti organizza il patrimonio giuridico, Interpelli organizza le opportunità operative che derivano dall’attività delle istituzioni scolastiche.

La sua efficacia dipenderà dalla rapidità di aggiornamento, dalla qualità della classificazione e dalla semplicità della consultazione.

\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_

19.10 Obiettivo finale

Al termine dello sviluppo il prodotto dovrà essere riconosciuto come il punto di riferimento nazionale per il monitoraggio degli interpelli scolastici.

L’utente non dovrà più visitare singolarmente i siti istituzionali.

Dovrà poter individuare in pochi secondi tutte le opportunità compatibili con il proprio profilo.

\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_

Conclusione del Capitolo 19

Con questo capitolo viene definita la missione del secondo prodotto della piattaforma.

Interpelli non nasce come un semplice aggregatore di pubblicazioni, ma come un sistema che trasforma dati distribuiti e disomogenei in un flusso informativo uniforme, consultabile e orientato alle esigenze concrete del personale della scuola.

SPORTELLOSCUOLA 2.0

ENTERPRISE MASTER ARCHITECTURE (EMA)

PARTE III

PRODOTTO 2 – INTERPELLI

CAPITOLO 20

ARCHITETTURA DEL PRODOTTO

Dalla pubblicazione dell’interpello alla consultazione dell’utente

\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_

20.1 Obiettivo

Ogni interpello pubblicato da una fonte ufficiale deve seguire un percorso standard fino alla sua consultazione.

L’utente non deve percepire la complessità dell’acquisizione dei dati.

Deve vedere un archivio uniforme, aggiornato e facilmente consultabile.

\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_

20.2 Acquisizione

Il prodotto riceve gli interpelli esclusivamente dalle fonti ufficiali monitorate.

L’acquisizione è automatica e continua.

Ogni nuovo documento viene identificato come possibile interpello e inviato alla fase di analisi.

\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_

20.3 Analisi

Durante questa fase vengono estratte le informazioni essenziali.

Tra queste:

●	ente pubblicatore;

●	istituzione scolastica;

●	provincia;

●	regione;

●	data di pubblicazione;

●	scadenza;

●	tipologia di posto;

●	classe di concorso;

●	profilo ATA;

●	numero di posti (quando indicato);

●	modalità di candidatura;

●	riferimento al documento ufficiale.

L’obiettivo è trasformare un documento eterogeneo in una scheda uniforme.

\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_

20.4 Normalizzazione

Ogni dato viene convertito in un formato comune.

Ad esempio:

Le classi di concorso saranno sempre rappresentate secondo la codifica ufficiale.

Le province utilizzeranno una denominazione uniforme.

Le tipologie di incarico seguiranno la stessa classificazione in tutta la piattaforma.

Questa normalizzazione rende possibili ricerche e confronti affidabili.

\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_

20.5 Creazione della scheda

Terminata l’analisi, viene generata la scheda dell’interpello.

La scheda rappresenta il punto di accesso principale per l’utente.

Il documento originale rimane sempre disponibile come fonte ufficiale.

La piattaforma non sostituisce il documento.

Ne facilita la consultazione.

\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_

20.6 Stato dell’interpello

Ogni interpello possiede uno stato chiaramente visibile.

Ad esempio:

●	Aperto.

●	In scadenza.

●	Scaduto.

●	Rettificato.

●	Revocato.

L’utente comprende immediatamente se l’opportunità è ancora disponibile.

\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_

20.7 Aggiornamenti

Quando una scuola pubblica una rettifica o una proroga, la piattaforma aggiorna la scheda esistente.

Non viene creato un nuovo interpello.

La cronologia conserva traccia delle modifiche.

Questo evita la proliferazione di duplicati.

\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_

20.8 Eliminazione dei duplicati

Uno dei problemi più frequenti riguarda le pubblicazioni ripetute.

Prima della pubblicazione il sistema verifica:

●	stessa scuola;

●	stesso oggetto;

●	stesso documento;

●	stessa scadenza.

Quando viene individuata una duplicazione, la piattaforma aggiorna la scheda già esistente.

L’utente visualizza sempre una sola opportunità.

\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_

20.9 Conservazione dello storico

Gli interpelli scaduti non vengono eliminati.

Entrano nello storico.

Lo storico permette di:

●	analizzare l’attività delle scuole;

●	comprendere la frequenza delle pubblicazioni;

●	consultare documentazione passata.

Questo patrimonio potrà essere utile anche per analisi statistiche future, senza influire sulla consultazione quotidiana.

\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_

20.10 Qualità dei dati

Prima della pubblicazione vengono verificati:

●	completezza della scheda;

●	correttezza del territorio;

●	presenza della fonte;

●	integrità del documento;

●	assenza di duplicati.

Solo dopo questi controlli l’interpello diventa consultabile.

\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_

20.11 Prestazioni

L’utente deve poter ottenere rapidamente i risultati.

Per questo motivo il prodotto utilizza l’indicizzazione e la ricerca già progettate nella Parte II.

La crescita del numero degli interpelli non dovrà compromettere la velocità di consultazione.

\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_

20.12 Evoluzione

L’architettura del prodotto consente l’aggiunta di nuove fonti senza modificare la struttura del sistema.

Ogni nuova fonte seguirà lo stesso processo di acquisizione, analisi, normalizzazione e pubblicazione.

In questo modo il prodotto potrà estendersi progressivamente mantenendo la stessa qualità.

\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_

Conclusione del Capitolo 20

Con questo capitolo viene definita l’architettura operativa del prodotto Interpelli.

Ogni pubblicazione segue un percorso uniforme: acquisizione, analisi, normalizzazione, verifica e pubblicazione.

Il risultato è un archivio nazionale omogeneo, aggiornato e privo di duplicazioni, nel quale ogni interpello è facilmente confrontabile con gli altri indipendentemente dalla fonte di origine.

SPORTELLOSCUOLA 2.0

ENTERPRISE MASTER ARCHITECTURE (EMA)

PARTE III

PRODOTTO 2 – INTERPELLI

CAPITOLO 21

ESPERIENZA DI CONSULTAZIONE

Progettare il miglior motore nazionale di ricerca degli interpelli

\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_

21.1 Obiettivo

L’utente non entra nella piattaforma per leggere decine di interpelli.

Entra con una domanda molto semplice.

“Esiste oggi un’opportunità che riguarda me?”

L’intero prodotto deve essere costruito per rispondere a questa domanda nel minor tempo possibile.

La consultazione deve essere orientata alla decisione, non alla lettura.

\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_

21.2 Home della sezione

La Home del prodotto Interpelli non mostrerà un lungo elenco cronologico.

Sarà organizzata in quattro aree principali.

Ricerca immediata

Elemento centrale della pagina.

L’utente potrà cercare contemporaneamente:

●	classe di concorso;

●	profilo ATA;

●	provincia;

●	comune;

●	scuola.

Una sola ricerca dovrà essere sufficiente per ottenere risultati pertinenti.

\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_

Opportunità recenti

Mostra esclusivamente gli interpelli pubblicati nelle ultime ore o negli ultimi giorni.

L’ordinamento predefinito privilegia la data di pubblicazione più recente.

\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_

In scadenza

Area dedicata agli interpelli con termine di candidatura imminente.

L’obiettivo è evitare che gli utenti perdano opportunità semplicemente perché non hanno consultato la piattaforma nei giorni precedenti.

\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_

Esplora per territorio

L’utente può accedere rapidamente agli interpelli filtrando per:

●	Regione;

●	Provincia;

●	Comune.

Questa modalità è utile per chi cerca opportunità in una specifica area geografica.

\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_

21.3 Ricerca

La ricerca costituisce il cuore del prodotto.

Deve essere semplice.

Non richiede la compilazione di moduli complessi.

L’utente inserisce uno o più elementi e ottiene immediatamente i risultati.

Il sistema interpreta la richiesta senza obbligare l’utente a conoscere la struttura amministrativa della scuola.

\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_

21.4 Filtri

I filtri devono ridurre il numero dei risultati senza complicare la consultazione.

Saranno disponibili esclusivamente quelli realmente utili.

Ad esempio:

●	Regione;

●	Provincia;

●	Comune;

●	Classe di concorso;

●	Profilo ATA;

●	Tipologia di incarico;

●	Stato dell’interpello;

●	Data di pubblicazione;

●	Data di scadenza.

Non saranno introdotti filtri raramente utilizzati.

\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_

21.5 Scheda dell’interpello

La scheda rappresenta il punto centrale dell’esperienza.

Le informazioni devono essere leggibili in pochi secondi.

La parte superiore mostrerà immediatamente:

●	scuola;

●	territorio;

●	tipologia dell’incarico;

●	classe di concorso o profilo ATA;

●	stato dell’interpello;

●	data di scadenza.

Solo successivamente saranno presentati:

●	descrizione sintetica;

●	modalità di candidatura;

●	documento ufficiale;

●	recapiti della scuola.

La lettura del PDF diventa l’ultimo passaggio, non il primo.

\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_

21.6 Percorsi di navigazione

L’utente dovrà sempre comprendere dove si trova.

Un esempio di percorso:

Interpelli

→ Campania

→ Napoli

→ Classe di concorso A022

→ Interpello

La struttura rimane uniforme per ogni consultazione.

\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_

21.7 Interpelli correlati

Ogni scheda proporrà un numero limitato di opportunità simili.

I collegamenti potranno basarsi su:

●	stessa provincia;

●	stessa classe di concorso;

●	stesso profilo ATA;

●	pubblicazioni recenti.

L’obiettivo è facilitare la scoperta di opportunità pertinenti senza disperdere l’attenzione dell’utente.

\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_

21.8 Accesso al documento ufficiale

Il documento ufficiale rimane sempre il riferimento principale.

La piattaforma fornisce una consultazione semplificata, ma ogni scheda mantiene il collegamento diretto alla pubblicazione originale.

Questo garantisce trasparenza e verificabilità.

\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_

21.9 Uniformità

Indipendentemente dall’ente che ha pubblicato l’interpello, tutte le schede presenteranno la stessa struttura.

Questa uniformità elimina le differenze tra i vari siti istituzionali e rende l’esperienza prevedibile.

\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_

21.10 Prestazioni

L’utente deve poter consultare rapidamente gli interpelli anche nei periodi di maggiore attività.

L’aumento del numero delle pubblicazioni non dovrà modificare la velocità di ricerca o di navigazione.

\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_

21.11 Accessibilità

Il prodotto dovrà essere pienamente utilizzabile da dispositivi desktop, tablet e smartphone.

La consultazione dovrà mantenere la stessa chiarezza indipendentemente dal dispositivo utilizzato.

\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_

21.12 Obiettivo finale

Al termine della consultazione l’utente dovrà aver compreso immediatamente:

●	se l’opportunità è compatibile con il proprio profilo;

●	entro quando candidarsi;

●	dove trovare il documento ufficiale;

●	quali altre opportunità analoghe sono disponibili.

La piattaforma riduce il tempo necessario per prendere una decisione, senza sostituire la documentazione ufficiale.

\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_

Conclusione del Capitolo 21

Con questo capitolo prende forma l’esperienza utente del prodotto Interpelli.

La consultazione non è costruita attorno ai documenti pubblicati dalle scuole, ma attorno alle esigenze di chi cerca un’opportunità lavorativa.

L’utente viene guidato rapidamente dalla ricerca alla decisione, mantenendo sempre il collegamento con la fonte ufficiale.

SPORTELLOSCUOLA 2.0

ENTERPRISE MASTER ARCHITECTURE (EMA)

PARTE III

PRODOTTO 2 – INTERPELLI

CAPITOLO 22

MODELLO DELLA SCHEDA INTERPELLO

Trasformare un avviso amministrativo in un’opportunità comprensibile

\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_

22.1 Obiettivo

L’interpello pubblicato dalla scuola rappresenta un documento amministrativo.

L’utente, invece, cerca un’opportunità lavorativa.

Il compito della piattaforma è trasformare il documento in una scheda chiara, uniforme e facilmente leggibile, senza alterare il contenuto della pubblicazione ufficiale.

La scheda diventa quindi il principale strumento di consultazione.

Il documento originale rimane sempre disponibile come fonte.

\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_

22.2 Principio progettuale

Ogni scheda deve permettere all’utente di capire, in meno di un minuto:

●	se l’interpello lo riguarda;

●	se possiede i requisiti richiesti;

●	quanto tempo ha per candidarsi;

●	come presentare la candidatura.

Se queste quattro informazioni non sono immediatamente individuabili, la scheda non ha raggiunto il proprio obiettivo.

\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_

22.3 Struttura della scheda

Ogni interpello utilizzerà la medesima struttura.

La parte superiore conterrà esclusivamente le informazioni essenziali.

Tra queste:

●	istituzione scolastica;

●	comune;

●	provincia;

●	regione;

●	tipologia dell’interpello;

●	classe di concorso o profilo ATA;

●	data di pubblicazione;

●	termine di presentazione della candidatura;

●	stato dell’interpello.

Queste informazioni devono essere immediatamente visibili.

\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_

22.4 Sintesi operativa

Subito dopo l’intestazione sarà presente una sintesi.

La sintesi non interpreta il documento.

Ne riassume il contenuto operativo.

Risponde alle domande principali:

●	quale figura viene ricercata;

●	quale incarico viene proposto;

●	quali sono le modalità di candidatura;

●	entro quale termine.

Il linguaggio deve essere semplice e uniforme.

\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_

22.5 Informazioni di dettaglio

Successivamente saranno riportati tutti gli elementi presenti nella pubblicazione ufficiale.

Ad esempio:

●	numero dei posti, se indicato;

●	durata dell’incarico;

●	orario previsto, quando disponibile;

●	eventuali requisiti specifici;

●	documentazione richiesta;

●	modalità di invio della candidatura.

La piattaforma non aggiunge informazioni non presenti nella fonte.

\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_

22.6 Collegamento alla fonte

Ogni scheda manterrà sempre un collegamento diretto al documento ufficiale.

L’utente potrà verificare autonomamente il contenuto della pubblicazione.

Questo principio garantisce trasparenza e affidabilità.

\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_

22.7 Stato della procedura

Ogni interpello presenterà chiaramente il proprio stato.

Gli stati previsti sono:

●	Aperto;

●	In scadenza;

●	Scaduto;

●	Rettificato;

●	Revocato.

La visualizzazione dello stato evita interpretazioni errate.

\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_

22.8 Cronologia

Qualora una scuola pubblichi una rettifica o una proroga, la scheda conserverà la cronologia degli aggiornamenti.

L’utente potrà ricostruire facilmente l’evoluzione della procedura senza dover confrontare manualmente più documenti.

\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_

22.9 Uniformità

Una delle principali criticità delle pubblicazioni istituzionali è la forte eterogeneità.

Ogni scuola utilizza modelli differenti.

SportelloScuola uniforma esclusivamente la presentazione delle informazioni.

Il contenuto della pubblicazione rimane invariato.

Questa scelta rende confrontabili interpelli provenienti da qualunque parte del territorio nazionale.

\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_

22.10 Qualità delle informazioni

Prima della pubblicazione della scheda vengono verificati:

●	completezza dei dati disponibili;

●	correttezza della classificazione;

●	presenza della fonte ufficiale;

●	coerenza territoriale;

●	integrità dei collegamenti.

Solo dopo tali verifiche la scheda diventa consultabile.

\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_

22.11 Evoluzione

La struttura della scheda è progettata per rimanere stabile nel tempo.

Qualora gli enti introducano nuovi elementi nelle pubblicazioni ufficiali, questi potranno essere integrati senza modificare l’organizzazione generale della scheda.

In questo modo il prodotto mantiene continuità anche nel lungo periodo.

\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_

Conclusione del Capitolo 22

Con questo capitolo viene definito il modello della scheda Interpello.

La piattaforma non modifica il contenuto della pubblicazione ufficiale, ma lo organizza in modo uniforme e orientato alle esigenze dell’utente.

La scheda diventa il punto di incontro tra il documento amministrativo e l’opportunità lavorativa, riducendo il tempo necessario per comprendere se un interpello è realmente di interesse.

SPORTELLOSCUOLA 2.0

ENTERPRISE MASTER ARCHITECTURE (EMA)

PARTE III

PRODOTTO 2 – INTERPELLI

CAPITOLO 23

MOTORE DI RILEVANZA

Mostrare prima ciò che interessa realmente all’utente

\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_

23.1 Obiettivo

La quantità degli interpelli crescerà progressivamente.

Il problema non sarà più trovare le pubblicazioni.

Il problema diventerà distinguerle.

Per questo motivo la piattaforma organizza i risultati secondo la loro rilevanza.

L’obiettivo non è mostrare tutto.

L’obiettivo è mostrare prima ciò che è realmente utile.

\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_

23.2 Principio

Ogni interpello mantiene la stessa importanza amministrativa.

La piattaforma non attribuisce priorità giuridiche.

Organizza semplicemente la consultazione in funzione delle esigenze dell’utente.

Questo principio mantiene piena neutralità rispetto alle pubblicazioni ufficiali.

\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_

23.3 Criteri di ordinamento

L’ordinamento predefinito tiene conto esclusivamente di elementi oggettivi.

Ad esempio:

●	data di pubblicazione;

●	data di scadenza;

●	stato della procedura;

●	territorio;

●	classe di concorso;

●	profilo ATA.

Non vengono introdotti criteri arbitrari.

\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_

23.4 Personalizzazione

Quando l’utente ha configurato il proprio profilo nella piattaforma, il sistema può evidenziare gli interpelli compatibili con le informazioni già disponibili.

Ad esempio:

●	classe di concorso;

●	provincia di interesse;

●	profilo professionale.

Questa evidenziazione non modifica l’archivio.

Semplifica la consultazione personale.

\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_

23.5 Interpelli prioritari

All’interno dei risultati saranno evidenziati gli interpelli che richiedono particolare attenzione.

Ad esempio:

●	pubblicazioni molto recenti;

●	scadenze imminenti;

●	rettifiche;

●	proroghe.

L’utente individua immediatamente gli aggiornamenti più rilevanti.

\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_

23.6 Continuità della consultazione

Quando un utente consulta frequentemente un determinato territorio o una determinata classe di concorso, la piattaforma facilita il ritorno a quelle aree.

Non modifica i risultati.

Riduce semplicemente il numero di operazioni necessarie per riprendere la consultazione.

\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_

23.7 Neutralità

Il sistema non suggerisce candidature.

Non valuta le probabilità di ottenere un incarico.

Non produce graduatorie di convenienza.

Organizza esclusivamente le informazioni già pubblicate dalle fonti ufficiali.

Questa distinzione mantiene il prodotto trasparente e imparziale.

\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_

23.8 Riduzione del rumore informativo

Uno degli obiettivi principali consiste nell’eliminare le informazioni inutili.

L’utente non deve visualizzare decine di interpelli non pertinenti.

La piattaforma presenta prioritariamente quelli coerenti con il contesto di ricerca.

In questo modo diminuisce il tempo necessario per individuare un’opportunità.

\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_

23.9 Uniformità

Le regole di rilevanza sono identiche per tutto il territorio nazionale.

Non esistono trattamenti differenti tra regioni, province o scuole.

Ogni interpello viene valutato utilizzando gli stessi criteri.

Questo garantisce uniformità dell’esperienza.

\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_

23.10 Evoluzione

Il motore è progettato per adattarsi all’aumento delle pubblicazioni.

L’introduzione di nuove fonti o l’incremento del numero degli interpelli non richiede modifiche alla logica del prodotto.

L’architettura rimane stabile.

\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_

Conclusione del Capitolo 23

Con questo capitolo viene completata la progettazione del motore di rilevanza del prodotto Interpelli.

La piattaforma non modifica il significato delle pubblicazioni ufficiali, ma organizza la consultazione in modo da evidenziare rapidamente le opportunità più pertinenti per ciascun utente.

Il risultato è una riduzione significativa del tempo necessario per individuare un interpello di interesse.

SPORTELLOSCUOLA 2.0

ENTERPRISE MASTER ARCHITECTURE (EMA)

PARTE III

PRODOTTO 3

OSSERVATORIO NAZIONALE DELLE NOMINE

(Nomine GPS)

CAPITOLO 24

VISIONE DEL PRODOTTO

\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_

24.1 Missione

Il prodotto Osservatorio Nazionale delle Nomine nasce con un obiettivo preciso.

Consentire a ogni aspirante docente di comprendere, quasi in tempo reale, l’andamento delle nomine sull’intero territorio nazionale.

Non sostituisce gli Uffici Scolastici.

Non sostituisce le graduatorie.

Non produce atti amministrativi.

Organizza e rende consultabili i dati ufficiali relativi alle procedure di nomina.

\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_

24.2 Il problema

Oggi chi è inserito nelle GPS deve consultare continuamente:

●	USP;

●	USR;

●	Albo Pretorio;

●	siti provinciali;

●	pubblicazioni successive;

●	rettifiche;

●	integrazioni;

●	nuovi bollettini.

Ogni provincia utilizza modalità differenti.

Molte informazioni vengono pubblicate in PDF.

Spesso i bollettini sono difficili da confrontare.

L’utente è costretto a ricostruire manualmente l’andamento delle nomine.

\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_

24.3 Obiettivo

La piattaforma trasforma le pubblicazioni ufficiali in un osservatorio nazionale.

Ogni procedura viene organizzata secondo uno standard comune.

L’utente può comprendere rapidamente:

●	cosa è stato pubblicato;

●	dove;

●	quando;

●	quali classi di concorso sono interessate;

●	quale fascia;

●	quale tipologia di posto.

\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_

24.4 Cosa NON farà il prodotto

Per mantenere affidabilità e semplicità, il prodotto non:

●	calcola probabilità di nomina;

●	promette incarichi;

●	formula previsioni prive di dati;

●	sostituisce le comunicazioni ufficiali;

●	interpreta discrezionalmente gli atti.

L’obiettivo è offrire informazioni organizzate e verificabili.

\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_

24.5 L’unità informativa

Come già avvenuto negli Interpelli, anche qui l’unità informativa non sarà il PDF.

Sarà l’evento di nomina.

Ogni pubblicazione verrà trasformata in una scheda strutturata.

Questa scelta rende confrontabili procedure provenienti da qualsiasi provincia italiana.

\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_

24.6 Informazioni della scheda

Ogni evento di nomina conterrà, quando disponibili:

●	provincia;

●	ufficio scolastico competente;

●	turno di nomina;

●	data di pubblicazione;

●	classe di concorso;

●	tipologia di posto;

●	fascia GPS;

●	posizione dell’ultimo nominato;

●	punteggio dell’ultimo nominato;

●	scuola assegnata;

●	tipologia dell’incarico;

●	documento ufficiale.

La piattaforma pubblica esclusivamente dati presenti negli atti ufficiali.

\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_

24.7 Organizzazione

La consultazione sarà costruita seguendo il modo in cui ragiona l’utente.

Non:

Provincia

↓

PDF

↓

Fine.

Ma:

Classe di concorso

↓

Provincia

↓

Turno di nomina

↓

Scuole assegnate

↓

Ultimo nominato

↓

Documento ufficiale.

Questo riduce enormemente il tempo necessario per trovare l’informazione desiderata.

\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_

24.8 Aggiornamento

Ogni nuova pubblicazione aggiorna automaticamente l’osservatorio.

Le rettifiche e gli annullamenti non generano duplicazioni.

Aggiornano la procedura già esistente, mantenendo lo storico delle modifiche.

\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_

24.9 Valore aggiunto

Il valore del prodotto non consiste nell’avere migliaia di PDF.

Il valore consiste nel trasformare migliaia di PDF in un patrimonio interrogabile.

L’utente può finalmente consultare le nomine come dati organizzati e non come semplici documenti.

\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_

24.10 Obiettivo finale

L’Osservatorio Nazionale delle Nomine dovrà diventare il principale punto di riferimento italiano per la consultazione delle procedure di nomina GPS.

L’utente dovrà poter seguire l’andamento delle nomine senza dover monitorare continuamente decine di siti istituzionali.

\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_

Conclusione del Capitolo 24

Con questo capitolo viene definita la missione del terzo prodotto della piattaforma.

L’Osservatorio Nazionale delle Nomine non è un semplice archivio di bollettini, ma un sistema strutturato che organizza eventi di nomina provenienti da tutto il territorio nazionale, rendendoli confrontabili e facilmente consultabili.

SPORTELLOSCUOLA 2.0

ENTERPRISE MASTER ARCHITECTURE (EMA)

PARTE III

PRODOTTO 3

OSSERVATORIO NAZIONALE DELLE NOMINE

CAPITOLO 25

ARCHITETTURA DEL PRODOTTO

Dalla pubblicazione del bollettino alla costruzione dell’Osservatorio Nazionale

\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_

25.1 Obiettivo

L’Osservatorio Nazionale delle Nomine ha il compito di trasformare pubblicazioni amministrative eterogenee in un patrimonio informativo uniforme.

Il sistema non modifica il contenuto delle pubblicazioni ufficiali.

Le organizza secondo un modello unico che permette consultazione, confronto e analisi.

\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_

25.2 Acquisizione

Il prodotto acquisisce esclusivamente pubblicazioni provenienti da fonti istituzionali ufficiali.

Tra queste rientrano:

●	Uffici Scolastici Regionali;

●	Uffici di Ambito Territoriale (USP);

●	altri enti competenti qualora pubblichino atti di nomina.

L’acquisizione avviene attraverso il sistema centrale di monitoraggio già definito nella Parte II.

\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_

25.3 Identificazione dell’evento

Ogni documento acquisito viene analizzato per verificare se contiene un evento di nomina.

Un singolo documento può contenere:

●	una procedura;

●	più procedure;

●	rettifiche;

●	integrazioni;

●	annullamenti.

L’Osservatorio non considera il PDF come unità di lavoro.

L’unità informativa è sempre la procedura di nomina.

\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_

25.4 Estrazione dei dati

Per ogni procedura vengono estratti tutti gli elementi strutturati presenti nella pubblicazione.

Ad esempio:

●	provincia;

●	data;

●	turno di nomina;

●	classe di concorso;

●	tipologia di posto;

●	fascia;

●	posizione;

●	punteggio;

●	istituzione scolastica assegnata;

●	durata dell’incarico, se indicata.

L’obiettivo è trasformare informazioni distribuite in dati interrogabili.

\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_

25.5 Normalizzazione

Le informazioni vengono convertite in un formato uniforme.

La normalizzazione riguarda:

●	codici delle classi di concorso;

●	denominazioni delle province;

●	tipologie di posto;

●	fasce GPS;

●	tipologie di incarico.

Questa operazione garantisce confrontabilità tra pubblicazioni provenienti da territori differenti.

\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_

25.6 Costruzione dell’evento

Terminata la normalizzazione, il sistema genera una scheda strutturata.

La scheda rappresenta l’evento di nomina.

Il documento ufficiale rimane sempre disponibile come riferimento.

\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_

25.7 Aggiornamenti

Le procedure di nomina possono essere modificate nel tempo.

Quando viene pubblicata:

●	una rettifica;

●	una integrazione;

●	una revoca;

●	una nuova versione del bollettino;

la piattaforma aggiorna l’evento esistente.

Non genera duplicazioni.

Lo storico rimane sempre consultabile.

\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_

25.8 Gestione delle duplicazioni

Le pubblicazioni possono essere riproposte dagli enti in momenti diversi.

Prima della pubblicazione il sistema verifica:

●	provenienza;

●	procedura;

●	data;

●	turno;

●	documento di riferimento.

Se l’evento è già presente, viene aggiornato anziché duplicato.

\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_

25.9 Conservazione dello storico

L’Osservatorio conserva tutte le procedure concluse.

Lo storico permette di consultare:

●	turni precedenti;

●	evoluzione delle procedure;

●	rettifiche intervenute.

Questa memoria costituisce uno dei patrimoni informativi più importanti della piattaforma.

\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_

25.10 Qualità dei dati

Prima della pubblicazione vengono effettuati controlli automatici su:

●	completezza delle informazioni;

●	correttezza territoriale;

●	integrità della pubblicazione;

●	classificazione;

●	collegamenti alla fonte.

Solo dopo tali verifiche l’evento viene reso consultabile.

\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_

25.11 Scalabilità

L’architettura è progettata per gestire l’incremento progressivo delle pubblicazioni.

L’aumento del numero di province monitorate, dei turni di nomina o delle classi di concorso non richiede modifiche alla struttura del prodotto.

La crescita avviene mantenendo lo stesso modello dati.

\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_

25.12 Principio di unicità

Ogni procedura di nomina esiste una sola volta all’interno della piattaforma.

Tutti gli aggiornamenti fanno riferimento alla medesima scheda.

Questo principio evita duplicazioni, incoerenze e dispersione delle informazioni.

\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_

Conclusione del Capitolo 25

Con questo capitolo viene definita l’architettura operativa dell’Osservatorio Nazionale delle Nomine.

Ogni pubblicazione ufficiale segue un percorso standardizzato: acquisizione, identificazione della procedura, estrazione dei dati, normalizzazione, verifica e pubblicazione.

Il risultato è un patrimonio informativo uniforme, aggiornato e confrontabile su scala nazionale.

SPORTELLOSCUOLA 2.0

ENTERPRISE MASTER ARCHITECTURE (EMA)

PARTE III

PRODOTTO 3

OSSERVATORIO NAZIONALE DELLE NOMINE

CAPITOLO 26

ESPERIENZA DI CONSULTAZIONE

Dalla ricerca di un bollettino alla comprensione immediata delle nomine

\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_

26.1 Obiettivo

L’utente non entra nell’Osservatorio per leggere decine di bollettini.

Entra con domande molto precise, ad esempio:

●	Hanno pubblicato le nomine della mia provincia?

●	Qual è stato l’ultimo punteggio nominato per la mia classe di concorso?

●	È uscito un nuovo turno di nomina?

●	Quali scuole sono state assegnate?

L’interfaccia deve rispondere rapidamente a queste domande senza obbligare l’utente ad aprire numerosi documenti PDF.

\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_

26.2 Home dell’Osservatorio

La pagina iniziale non mostrerà un semplice elenco cronologico.

Sarà organizzata in cinque aree funzionali.

Ultimi aggiornamenti

Visualizza esclusivamente le nuove pubblicazioni validate.

Ogni elemento indica immediatamente:

●	provincia;

●	data;

●	turno di nomina;

●	classe di concorso;

●	tipologia di posto.

\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_

Ricerca immediata

Elemento centrale della pagina.

L’utente potrà ricercare utilizzando uno o più criteri:

●	classe di concorso;

●	provincia;

●	regione;

●	fascia GPS;

●	tipologia di posto;

●	istituzione scolastica.

Una sola ricerca dovrà essere sufficiente per raggiungere l’informazione desiderata.

\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_

Turni pubblicati

Una sezione dedicata ai turni di nomina già pubblicati.

L’obiettivo è consentire all’utente di capire immediatamente lo stato delle procedure nella provincia di interesse.

\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_

Aggiornamenti recenti

Mostra rettifiche, integrazioni e nuove pubblicazioni intervenute nelle ultime ore.

L’utente individua rapidamente eventuali modifiche senza dover ricontrollare manualmente le fonti ufficiali.

\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_

Esplora per territorio

La consultazione territoriale segue sempre la stessa struttura:

Regione

↓

Provincia

↓

Classe di concorso

↓

Turni disponibili

↓

Eventi di nomina

Questa organizzazione rimane identica per tutto il territorio nazionale.

\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_

26.3 Ricerca

La ricerca rappresenta il cuore dell’Osservatorio.

Non richiede la compilazione di moduli complessi.

L’utente può partire da qualsiasi elemento che conosce.

Ad esempio:

●	una provincia;

●	una classe di concorso;

●	una scuola;

●	una fascia GPS.

Il sistema restituisce direttamente le procedure compatibili.

\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_

26.4 Filtri

I filtri vengono limitati agli elementi realmente utili.

Saranno disponibili:

●	Regione;

●	Provincia;

●	Classe di concorso;

●	Fascia GPS;

●	Tipologia di posto;

●	Anno scolastico;

●	Turno di nomina;

●	Stato della procedura.

Non verranno introdotti filtri poco utilizzati o ridondanti.

\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_

26.5 Scheda della procedura

Ogni procedura di nomina sarà rappresentata da una scheda uniforme.

Nella parte superiore saranno immediatamente visibili:

●	Provincia;

●	Turno;

●	Classe di concorso;

●	Tipologia di posto;

●	Data della pubblicazione;

●	Stato della procedura.

Successivamente saranno riportati:

●	posizione dell’ultimo nominato (quando pubblicata);

●	punteggio dell’ultimo nominato (quando pubblicato);

●	istituzioni scolastiche coinvolte;

●	collegamento al documento ufficiale.

L’utente comprende rapidamente il contenuto senza leggere l’intero bollettino.

\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_

26.6 Percorsi di navigazione

Ogni consultazione mantiene la stessa struttura.

Ad esempio:

Osservatorio Nomine

↓

Campania

↓

Napoli

↓

A022

↓

Turno 3

↓

Scheda della procedura

Questa uniformità riduce il tempo necessario per orientarsi nella piattaforma.

\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_

26.7 Procedure correlate

Ogni scheda propone collegamenti verso procedure affini.

Ad esempio:

●	turni precedenti della stessa provincia;

●	stessa classe di concorso in altre province;

●	eventuali rettifiche della procedura consultata.

L’obiettivo è facilitare l’approfondimento senza generare confusione.

\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_

26.8 Collegamento alla fonte

Ogni procedura mantiene sempre il collegamento diretto al documento ufficiale pubblicato dall’ente competente.

La piattaforma organizza l’informazione ma non sostituisce mai la fonte amministrativa.

\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_

26.9 Uniformità

Indipendentemente dalla provincia o dall’ufficio scolastico che pubblica il bollettino, tutte le procedure vengono presentate nello stesso modo.

Questa uniformità elimina le differenze tra i diversi modelli utilizzati dagli enti.

\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_

26.10 Prestazioni

L’utente deve poter consultare rapidamente le procedure anche nei periodi di maggiore attività, come l’inizio dell’anno scolastico.

L’aumento del numero delle pubblicazioni non dovrà compromettere la velocità della ricerca o della navigazione.

\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_

26.11 Accessibilità

L’Osservatorio dovrà offrire la stessa qualità di consultazione su desktop, tablet e smartphone.

L’organizzazione delle informazioni rimane invariata indipendentemente dal dispositivo utilizzato.

\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_

26.12 Obiettivo finale

Al termine della consultazione l’utente deve aver compreso immediatamente:

●	se la procedura di interesse è stata pubblicata;

●	quale turno è stato effettuato;

●	quali dati sono disponibili;

●	dove reperire il documento ufficiale;

●	quali procedure correlate possono essere consultate.

L’utente ottiene le informazioni necessarie senza dover ricostruire manualmente il contenuto dei bollettini.

\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_

Conclusione del Capitolo 26

Con questo capitolo viene definita l’esperienza di consultazione dell’Osservatorio Nazionale delle Nomine.

La navigazione non è costruita attorno ai documenti amministrativi, ma attorno alle esigenze concrete degli aspiranti docenti.

L’utente passa dalla ricerca alla comprensione della procedura in modo rapido, mantenendo sempre la possibilità di verificare la fonte ufficiale.

SPORTELLOSCUOLA 2.0

ENTERPRISE MASTER ARCHITECTURE (EMA)

PARTE III

PRODOTTO 3

OSSERVATORIO NAZIONALE DELLE NOMINE

CAPITOLO 27

MODELLO DELLA SCHEDA NOMINA

Trasformare un bollettino amministrativo in un’informazione immediatamente comprensibile

\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_

27.1 Obiettivo

Il bollettino pubblicato dagli Uffici Scolastici è un documento amministrativo.

L’utente, invece, desidera comprendere rapidamente:

●	se la procedura è stata pubblicata;

●	se riguarda la propria classe di concorso;

●	quale incarico è stato assegnato;

●	quale punteggio è stato raggiunto.

La Scheda Nomina nasce per trasformare una pubblicazione complessa in una rappresentazione uniforme, senza alterarne il contenuto.

\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_

27.2 Principio progettuale

Ogni scheda deve consentire all’utente di comprendere il contenuto della procedura in meno di un minuto.

La piattaforma non sintetizza arbitrariamente i dati.

Organizza esclusivamente le informazioni presenti nella pubblicazione ufficiale.

Ogni elemento mostrato deve poter essere ricondotto alla fonte.

\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_

27.3 Identità della procedura

La parte iniziale della scheda identifica univocamente la procedura.

Comprende:

●	anno scolastico;

●	provincia;

●	ufficio competente;

●	turno di nomina;

●	data di pubblicazione;

●	stato della procedura.

Questi elementi permettono di distinguere immediatamente una procedura dalle altre.

\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_

27.4 Informazioni principali

Subito dopo vengono presentati gli elementi che interessano maggiormente agli aspiranti.

Tra questi:

●	classe di concorso;

●	tipologia di posto;

●	fascia GPS interessata;

●	eventuale tipologia di graduatoria;

●	modalità della procedura, quando specificata dall’ente.

L’utente comprende immediatamente il contesto della nomina.

\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_

27.5 Esito della procedura

Quando presenti nella pubblicazione ufficiale, la scheda riporta:

●	posizione dell’ultimo nominato;

●	punteggio dell’ultimo nominato;

●	scuola assegnata;

●	tipologia dell’incarico;

●	durata dell’incarico.

Qualora tali dati non siano disponibili, la piattaforma non li stima e non li integra da fonti non ufficiali.

\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_

27.6 Documentazione ufficiale

Ogni scheda mantiene il collegamento diretto alla pubblicazione dell’ente competente.

L’utente può verificare autonomamente il contenuto del documento originale.

La piattaforma garantisce trasparenza e tracciabilità.

\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_

27.7 Stato della procedura

Ogni procedura è identificata attraverso uno stato chiaro.

Ad esempio:

●	Pubblicata;

●	Aggiornata;

●	Rettificata;

●	Integrata;

●	Revocata;

●	Conclusa.

Lo stato consente di comprendere rapidamente se la procedura è ancora soggetta a modifiche.

\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_

27.8 Cronologia

Ogni aggiornamento viene registrato.

La cronologia permette di consultare:

●	pubblicazione iniziale;

●	eventuali integrazioni;

●	rettifiche;

●	sostituzioni;

●	versione vigente.

L’utente non deve confrontare manualmente documenti differenti.

\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_

27.9 Uniformità

Ogni provincia italiana pubblica bollettini con impostazioni differenti.

La piattaforma uniforma esclusivamente la rappresentazione delle informazioni.

Il contenuto ufficiale rimane invariato.

Questa uniformità consente confronti omogenei su scala nazionale.

\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_

27.10 Controlli di qualità

Prima della pubblicazione vengono verificati:

●	completezza della scheda;

●	correttezza della classificazione;

●	collegamento alla fonte;

●	integrità dei dati estratti;

●	assenza di duplicazioni.

Solo dopo tali verifiche la procedura diventa consultabile.

\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_

27.11 Evoluzione

La struttura della Scheda Nomina è progettata per rimanere stabile nel tempo.

L’introduzione di nuove informazioni da parte degli enti potrà essere gestita senza modificare l’architettura generale.

Questo garantisce continuità e semplicità di manutenzione.

\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_

27.12 Collegamenti con l’ecosistema

La Scheda Nomina non è un elemento isolato.

Quando pertinente, potrà collegarsi a:

●	Normativa \& Documenti, per richiamare il quadro normativo della procedura;

●	Calcolo Punteggio, per consentire all’utente di verificare il proprio punteggio rispetto ai criteri ufficiali;

●	Notizie \& Scadenze, quando una pubblicazione genera un aggiornamento di interesse generale;

●	Sindacalista AI, che potrà spiegare il significato della procedura utilizzando esclusivamente fonti ufficiali e la knowledge interna della piattaforma.

La scheda rimane il punto centrale, mentre gli altri prodotti forniscono approfondimento senza duplicare informazioni.

\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_

Conclusione del Capitolo 27

Con questo capitolo viene definito il modello della Scheda Nomina.

Ogni procedura viene rappresentata attraverso una struttura uniforme, verificabile e facilmente consultabile.

La piattaforma non sostituisce il documento amministrativo, ma ne rende immediata la comprensione, mantenendo sempre il collegamento diretto con la fonte ufficiale.

SPORTELLOSCUOLA 2.0

ENTERPRISE MASTER ARCHITECTURE (EMA)

PARTE III

PRODOTTO 3

OSSERVATORIO NAZIONALE DELLE NOMINE

CAPITOLO 28

MOTORE DI CONSULTAZIONE E ANALISI

Organizzare i dati ufficiali per renderli realmente utili

\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_

28.1 Obiettivo

L’Osservatorio raccoglie un numero crescente di procedure provenienti da tutto il territorio nazionale.

Il suo compito non è semplicemente archiviarle.

Deve consentire all’utente di consultarle rapidamente e comprenderne il contesto.

L’obiettivo è ridurre il tempo necessario per individuare le informazioni di interesse mantenendo sempre il collegamento con la fonte ufficiale.

\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_

28.2 Principio di neutralità

Il motore organizza i dati.

Non formula giudizi.

Non attribuisce probabilità.

Non suggerisce strategie.

Non interpreta gli esiti delle nomine.

Ogni informazione deriva esclusivamente dalle pubblicazioni ufficiali.

\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_

28.3 Organizzazione della consultazione

Le procedure possono essere esplorate secondo differenti percorsi.

Ad esempio:

●	anno scolastico;

●	regione;

●	provincia;

●	classe di concorso;

●	tipologia di posto;

●	turno di nomina.

L’utente può iniziare la consultazione da qualsiasi elemento senza essere vincolato alla struttura amministrativa degli enti.

\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_

28.4 Ordinamento

L’ordinamento dei risultati segue criteri oggettivi.

Tra questi:

●	data di pubblicazione;

●	aggiornamento più recente;

●	turno di nomina;

●	provincia;

●	classe di concorso.

L’utente mantiene sempre il controllo dell’ordinamento.

\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_

28.5 Confrontabilità

Una delle funzioni principali dell’Osservatorio consiste nel rendere confrontabili procedure provenienti da enti differenti.

La piattaforma utilizza lo stesso modello dati per tutte le province.

Questo consente una consultazione uniforme senza alterare il contenuto delle pubblicazioni.

\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_

28.6 Continuità della procedura

Ogni turno di nomina viene collegato ai precedenti e ai successivi.

L’utente visualizza l’intera evoluzione della procedura.

Le rettifiche vengono integrate nella cronologia senza creare nuove schede indipendenti.

\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_

28.7 Riduzione del rumore informativo

La piattaforma evita la proliferazione di risultati ripetitivi.

Una stessa procedura viene rappresentata da un’unica scheda aggiornata.

Eventuali modifiche rimangono disponibili nella cronologia.

Questo migliora la leggibilità dell’Osservatorio.

\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_

28.8 Memoria storica

Le procedure concluse non vengono eliminate.

Entrano a far parte dello storico dell’Osservatorio.

Lo storico può essere consultato per comprendere l’evoluzione delle procedure negli anni scolastici precedenti.

Il valore del patrimonio informativo cresce progressivamente nel tempo.

\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_

28.9 Collegamenti con gli altri prodotti

Quando pertinente, ogni procedura può richiamare:

●	il quadro normativo collegato;

●	eventuali notizie che spiegano la procedura;

●	il Calcolo Punteggio, qualora l’utente voglia verificare il proprio punteggio;

●	il Sindacalista AI per chiarimenti sulle norme applicabili.

Ogni prodotto mantiene il proprio ruolo senza duplicare dati.

\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_

28.10 Prestazioni

L’aumento delle pubblicazioni non deve compromettere la consultazione.

La struttura dell’Osservatorio utilizza i servizi comuni definiti nella Parte II per garantire:

●	velocità di ricerca;

●	aggiornamento continuo;

●	scalabilità.

\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_

28.11 Evoluzione

L’architettura è predisposta per accogliere eventuali nuove procedure di reclutamento introdotte dalla normativa.

L’integrazione avviene riutilizzando il modello dati esistente, evitando la creazione di sistemi separati.

Questo garantisce continuità e sostenibilità nel lungo periodo.

\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_

28.12 Obiettivo finale

Al termine della consultazione l’utente deve aver ottenuto una visione chiara della procedura di interesse.

L’Osservatorio non sostituisce le comunicazioni ufficiali.

Le rende facilmente consultabili, confrontabili e storicizzate.

Il patrimonio informativo rimane coerente con tutta l’architettura di SportelloScuola 2.0.

\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_

Conclusione del Capitolo 28

Con questo capitolo viene completata la progettazione del motore di consultazione dell’Osservatorio Nazionale delle Nomine.

Le pubblicazioni ufficiali vengono organizzate secondo criteri uniformi, mantenendo neutralità, tracciabilità e semplicità di consultazione.

Il sistema non produce nuove informazioni, ma valorizza quelle già disponibili attraverso una struttura coerente e verificabile.

SPORTELLOSCUOLA 2.0

ENTERPRISE MASTER ARCHITECTURE (EMA)

PARTE III

PRODOTTO 3

OSSERVATORIO NAZIONALE DELLE NOMINE

CAPITOLO 29

VALIDAZIONE DEL PRODOTTO

Verifica della completezza e dell’efficacia dell’Osservatorio Nazionale delle Nomine

\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_

29.1 Finalità

L’Osservatorio viene valutato esclusivamente sulla sua capacità di risolvere un problema reale.

La domanda fondamentale è una sola.

Un aspirante docente riesce a comprendere rapidamente l’andamento delle nomine senza dover consultare decine di siti istituzionali?

Se la risposta è positiva, il prodotto ha raggiunto il proprio obiettivo.

\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_

29.2 Scenario 1 – Pubblicazione di un nuovo turno

Un Ufficio Scolastico pubblica un nuovo turno di nomina.

Il sistema deve:

●	acquisire automaticamente la pubblicazione;

●	identificarne la tipologia;

●	estrarre i dati disponibili;

●	creare o aggiornare la relativa procedura;

●	renderla consultabile in tempi rapidi.

L’utente deve trovare l’aggiornamento senza conoscere preventivamente il sito dell’ente.

\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_

29.3 Scenario 2 – Rettifica

L’ente pubblica una rettifica.

La piattaforma non genera una nuova procedura.

Aggiorna la procedura esistente.

La cronologia conserva entrambe le versioni.

L’utente comprende immediatamente quale versione è quella vigente.

\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_

29.4 Scenario 3 – Ricerca

Un docente cerca la situazione della classe di concorso A022 nella provincia di Napoli.

La piattaforma restituisce esclusivamente le procedure pertinenti.

Non mostra risultati duplicati.

La consultazione avviene attraverso la Scheda Nomina.

\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_

29.5 Scenario 4 – Consultazione storica

L’utente desidera consultare le procedure dell’anno scolastico precedente.

Lo storico permette la navigazione mantenendo la stessa struttura utilizzata per le procedure correnti.

La consultazione rimane uniforme.

\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_

29.6 Scenario 5 – Verifica della fonte

L’utente vuole controllare il documento ufficiale.

Ogni scheda mantiene sempre il collegamento diretto alla pubblicazione dell’ente competente.

La piattaforma rimane pienamente verificabile.

\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_

29.7 Indicatori di efficacia

Il prodotto può essere considerato efficace quando:

●	le pubblicazioni vengono organizzate in modo uniforme;

●	la consultazione richiede pochi passaggi;

●	le rettifiche vengono gestite senza duplicazioni;

●	le fonti ufficiali rimangono sempre accessibili;

●	l’utente non ha necessità di consultare numerosi siti differenti.

\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_

29.8 Limiti del prodotto

L’Osservatorio:

non effettua stime;

non prevede future nomine;

non interpreta gli atti amministrativi;

non produce consulenza.

Organizza esclusivamente dati ufficiali.

\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_

29.9 Ruolo nell’ecosistema

Con la conclusione del Prodotto 3 viene completato il dominio dedicato alle opportunità di reclutamento.

Da questo momento:

Normativa fornisce il quadro giuridico.

Interpelli gestisce le opportunità dirette.

Osservatorio Nomine organizza gli esiti delle procedure.

Questi tre prodotti costituiscono un ecosistema coerente che descrive l’intero ciclo del reclutamento scolastico.

\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_

29.10 Obiettivo raggiunto

Il prodotto può essere considerato completo quando:

●	ogni procedura è organizzata secondo uno standard unico;

●	ogni aggiornamento mantiene la continuità della procedura;

●	ogni pubblicazione è verificabile;

●	ogni consultazione è semplice e uniforme.

In queste condizioni l’Osservatorio diventa una componente stabile dell’intera piattaforma.

\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_

CONCLUSIONE DEL PRODOTTO 3

Con questo capitolo si conclude la progettazione dell’Osservatorio Nazionale delle Nomine.

Il prodotto non rappresenta un semplice archivio di bollettini, ma un sistema nazionale che organizza, conserva e rende consultabili le procedure di nomina provenienti dagli enti competenti.

La sua architettura è coerente con i principi definiti nelle Parti I e II e si integra naturalmente con Normativa \& Documenti e Interpelli, completando il dominio del reclutamento scolastico.

SPORTELLOSCUOLA 2.0

ENTERPRISE MASTER ARCHITECTURE (EMA)

PARTE III

PRODOTTO 4

HUB EVENTI DELLA SCUOLA

CAPITOLO 30

VISIONE DEL PRODOTTO

Dal portale di notizie al centro nazionale degli eventi scolastici

\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_

30.1 Missione

L’Hub Eventi della Scuola nasce con una missione precisa.

Organizzare in modo uniforme tutti gli eventi che producono effetti concreti sul sistema scolastico italiano.

Il prodotto non ha lo scopo di pubblicare il maggior numero possibile di articoli.

Ha lo scopo di consentire agli utenti di comprendere rapidamente cosa è cambiato, chi è coinvolto e quali azioni devono eventualmente intraprendere.

\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_

30.2 Il problema

Attualmente il personale scolastico consulta numerosi siti di informazione.

Le stesse notizie vengono ripetute da molte fonti.

Spesso gli articoli:

●	duplicano contenuti;

●	riportano interpretazioni differenti;

●	non vengono aggiornati;

●	rimangono online anche quando risultano superati.

L’utente perde tempo nel comprendere quale sia l’informazione realmente utile.

\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_

30.3 Obiettivo

L’Hub Eventi trasforma ogni novità in un evento strutturato.

Ogni evento viene classificato, contestualizzato e collegato agli altri prodotti della piattaforma.

L’utente consulta un unico ecosistema invece di cercare informazioni in decine di portali.

\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_

30.4 Evento

L’unità fondamentale del prodotto non è l’articolo.

È l’evento.

Un evento rappresenta qualsiasi fatto che modifica il sistema scolastico.

Ad esempio:

●	pubblicazione di una nuova Ordinanza Ministeriale;

●	apertura di una procedura;

●	pubblicazione di un concorso;

●	nuova circolare;

●	rinnovo contrattuale;

●	scadenza amministrativa;

●	apertura delle domande;

●	proroga;

●	rettifica.

L’articolo rappresenta semplicemente il modo con cui l’evento viene raccontato.

\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_

30.5 Collegamento con l’ecosistema

Ogni evento può essere collegato ai prodotti già progettati.

Ad esempio.

Una nuova Ordinanza GPS.

↓

Normativa

↓

Calcolo Punteggio

↓

Interpelli

↓

Nomine

↓

Sindacalista AI

↓

Home Page

↓

Ricerca Universale

↓

Notifiche.

L’evento viene acquisito una sola volta.

L’intero ecosistema lo riutilizza.

\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_

30.6 Fonti

L’Hub utilizza esclusivamente fonti ufficiali e fonti editoriali selezionate.

L’obiettivo non è aumentare il numero delle fonti.

L’obiettivo è aumentare la qualità.

Le fonti devono essere:

●	affidabili;

●	aggiornate;

●	verificabili;

●	pertinenti al mondo della scuola.

Le ridondanze vengono eliminate.

\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_

30.7 Tipologie di evento

Ogni evento appartiene ad una categoria.

Ad esempio:

Normativa.

Concorsi.

Graduatorie.

Mobilità.

Personale ATA.

Docenti.

Contratti.

Interpelli.

Nomine.

Finanziamenti.

Scadenze.

Formazione.

Innovazione digitale.

La classificazione rimane stabile nel tempo.

\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_

30.8 Temporalità

Ogni evento possiede un ciclo di vita.

Nasce.

Può essere aggiornato.

Può essere rettificato.

Può produrre effetti.

Può concludersi.

L’Hub conserva sempre la cronologia.

\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_

30.9 Esperienza utente

L’utente entra nell’Hub con una domanda molto semplice.

Cosa è cambiato oggi nella scuola italiana?

Oppure.

Cosa è cambiato per me?

L’intero prodotto deve rispondere rapidamente a queste domande.

\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_

30.10 Obiettivo finale

L’Hub Eventi della Scuola dovrà diventare il principale punto di riferimento nazionale per seguire in tempo reale l’evoluzione del sistema scolastico italiano.

L’utente non consulterà semplicemente notizie.

Seguirà l’evoluzione degli eventi che incidono concretamente sulla propria attività professionale.

\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_

Conclusione del Capitolo 30

Con questo capitolo viene definita la missione del quarto prodotto della piattaforma.

L’Hub Eventi della Scuola sostituisce il concetto tradizionale di “sezione notizie” con un sistema che organizza gli eventi del mondo scolastico secondo criteri uniformi, verificabili e integrati con l’intero ecosistema di SportelloScuola 2.0.

SPORTELLOSCUOLA 2.0

ENTERPRISE MASTER ARCHITECTURE (EMA)

PARTE III

PRODOTTO 4

HUB EVENTI DELLA SCUOLA

CAPITOLO 31

ARCHITETTURA EDITORIALE

Un evento esiste una sola volta

\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_

31.1 Principio fondamentale

L’Hub Eventi non viene costruito attorno agli articoli.

Viene costruito attorno agli eventi.

Ogni evento rappresenta un fatto reale che modifica il sistema scolastico.

L’evento costituisce l’unità permanente dell’archivio.

Gli articoli, gli aggiornamenti e gli approfondimenti sono semplicemente modalità con cui l’evento viene descritto nel tempo.

\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_

31.2 Unicità dell’evento

Ogni evento viene registrato una sola volta.

Se intervengono:

●	chiarimenti;

●	rettifiche;

●	proroghe;

●	FAQ ministeriali;

●	nuovi documenti;

●	nuove circolari;

non viene creato un nuovo evento.

L’evento originario viene aggiornato.

Questa scelta elimina la proliferazione di contenuti duplicati.

\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_

31.3 Ciclo di vita

Ogni evento segue un ciclo di vita definito.

1\.	Individuazione.

2\.	Verifica della fonte.

3\.	Creazione della Scheda Evento.

4\.	Pubblicazione.

5\.	Aggiornamenti progressivi.

6\.	Chiusura dell’evento.

7\.	Archiviazione nello storico.

Ogni fase è tracciabile.

\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_

31.4 Versionamento

La piattaforma conserva la cronologia completa delle modifiche.

Ogni aggiornamento viene registrato con:

●	data;

●	ora;

●	origine;

●	tipologia della modifica.

L’utente può comprendere come l’evento si è evoluto nel tempo.

\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_

31.5 Eliminazione dei duplicati

Prima della pubblicazione di un nuovo evento il sistema verifica se esiste già un evento equivalente.

La verifica considera:

●	oggetto;

●	ente emittente;

●	riferimento normativo;

●	data;

●	categoria.

Se viene individuata una corrispondenza, il sistema propone l’aggiornamento dell’evento esistente.

Questa logica evita la frammentazione dell’informazione.

\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_

31.6 Collegamenti automatici

Ogni evento può essere collegato automaticamente ad altri elementi della piattaforma.

Ad esempio:

Una nuova Ordinanza Ministeriale sulle GPS può generare collegamenti verso:

●	Normativa \& Documenti;

●	Calcolo Punteggio;

●	Interpelli;

●	Osservatorio Nazionale delle Nomine;

●	Sindacalista AI;

●	Agenda delle Scadenze.

La relazione viene creata una sola volta e mantenuta automaticamente.

\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_

31.7 Classificazione

Ogni evento appartiene a una sola categoria principale.

Può avere più categorie secondarie.

Questa distinzione mantiene semplice la navigazione e consente ricerche più precise.

\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_

31.8 Stato dell’evento

Ogni evento possiede uno stato chiaramente identificabile.

Ad esempio:

●	In pubblicazione;

●	Attivo;

●	Aggiornato;

●	In scadenza;

●	Concluso;

●	Archiviato.

Lo stato aiuta l’utente a comprendere immediatamente se l’evento richiede ancora attenzione.

\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_

31.9 Gerarchia delle informazioni

Ogni Scheda Evento presenta le informazioni seguendo sempre lo stesso ordine.

1\.	Cosa è successo.

2\.	Chi è coinvolto.

3\.	Cosa cambia.

4\.	Da quando produce effetti.

5\.	Cosa deve fare l’utente.

6\.	Documenti ufficiali.

7\.	Collegamenti ai prodotti correlati.

Questa struttura riduce il tempo necessario per comprendere l’impatto dell’evento.

\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_

31.10 Neutralità editoriale

La piattaforma distingue chiaramente tra:

●	fatti;

●	interpretazioni;

●	approfondimenti.

La Scheda Evento riporta esclusivamente informazioni verificabili.

Gli approfondimenti, quando presenti, sono separati e chiaramente identificati.

Questo rafforza l’affidabilità della piattaforma.

\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_

31.11 Evoluzione

L’architettura editoriale è progettata per gestire un numero crescente di eventi senza modificare la struttura del prodotto.

L’aumento delle pubblicazioni comporta un incremento del patrimonio informativo, non della complessità.

\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_

31.12 Obiettivo finale

L’utente deve poter seguire l’intera evoluzione di un evento consultando un’unica Scheda Evento.

Non deve ricercare articoli pubblicati in momenti diversi.

L’informazione rimane concentrata, ordinata e facilmente consultabile.

\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_

Conclusione del Capitolo 31

Con questo capitolo viene definita l’architettura editoriale dell’Hub Eventi della Scuola.

Ogni evento viene gestito come un’entità unica, aggiornata nel tempo e collegata all’intero ecosistema.

Questa impostazione elimina duplicazioni, mantiene la coerenza dell’archivio e rende l’informazione facilmente consultabile anche a distanza di anni.

SPORTELLOSCUOLA 2.0

ENTERPRISE MASTER ARCHITECTURE (EMA)

PARTE III

PRODOTTO 4

HUB EVENTI DELLA SCUOLA

CAPITOLO 32

ESPERIENZA DI CONSULTAZIONE

Dal flusso continuo di notizie a una visione ordinata degli eventi scolastici

\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_

32.1 Obiettivo

L’utente entra nell’Hub Eventi per comprendere rapidamente cosa è cambiato nel sistema scolastico e se tali cambiamenti hanno effetti sulla propria attività.

L’interfaccia deve ridurre il tempo necessario per individuare gli eventi rilevanti, evitando la consultazione di numerosi articoli ripetitivi.

\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_

32.2 Home dell’Hub Eventi

La pagina iniziale rappresenta il punto di accesso all’intero patrimonio informativo.

La struttura non segue esclusivamente l’ordine cronologico.

Gli eventi vengono organizzati secondo criteri funzionali.

Le sezioni principali sono:

●	Eventi prioritari;

●	Ultimi aggiornamenti;

●	Eventi in scadenza;

●	Eventi recentemente modificati;

●	Archivio storico.

Questa organizzazione consente una consultazione immediata.

\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_

32.3 Eventi prioritari

La parte superiore della pagina evidenzia esclusivamente gli eventi che producono effetti concreti nel breve periodo.

Ad esempio:

●	apertura di procedure;

●	pubblicazione di ordinanze;

●	nuove finestre temporali;

●	modifiche normative di rilievo.

La priorità deriva dall’impatto dell’evento e non dalla semplice data di pubblicazione.

\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_

32.4 Ricerca

La ricerca rappresenta il principale strumento di accesso agli eventi.

L’utente può iniziare da qualsiasi elemento conosciuto.

Ad esempio:

●	parola chiave;

●	categoria;

●	ente;

●	anno scolastico;

●	riferimento normativo;

●	argomento.

La piattaforma restituisce direttamente gli eventi compatibili.

\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_

32.5 Filtri

I filtri rimangono essenziali.

Saranno disponibili:

●	categoria;

●	destinatari;

●	stato dell’evento;

●	anno scolastico;

●	ente emittente;

●	presenza di scadenze.

Non vengono introdotti filtri ridondanti.

\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_

32.6 Navigazione

Ogni evento mantiene sempre lo stesso percorso.

Hub Eventi

↓

Categoria

↓

Evento

↓

Cronologia

↓

Documenti

↓

Prodotti collegati

Questa uniformità rende prevedibile la consultazione.

\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_

32.7 Aggiornamenti

Quando un evento viene modificato, l’utente visualizza immediatamente:

●	cosa è stato aggiornato;

●	quando è avvenuta la modifica;

●	quale documento ha determinato l’aggiornamento.

L’intero storico rimane consultabile.

\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_

32.8 Collegamenti

Ogni evento presenta esclusivamente collegamenti realmente pertinenti.

Possono essere presenti riferimenti verso:

●	Normativa \& Documenti;

●	Calcolo Punteggio;

●	Interpelli;

●	Osservatorio Nazionale delle Nomine;

●	Sindacalista AI.

Non vengono proposti collegamenti privi di relazione.

\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_

32.9 Esperienza mobile

La consultazione da smartphone deve mantenere la stessa efficacia della versione desktop.

Le informazioni principali vengono visualizzate immediatamente.

Gli approfondimenti rimangono disponibili senza modificare la struttura della scheda.

\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_

32.10 Continuità

L’utente che consulta frequentemente l’Hub ritrova sempre la stessa organizzazione.

La crescita del patrimonio informativo non modifica la logica della navigazione.

Questo principio riduce il tempo di apprendimento della piattaforma.

\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_

32.11 Prestazioni

L’Hub deve mantenere tempi di risposta costanti anche durante periodi caratterizzati da un elevato numero di pubblicazioni.

L’aumento degli eventi non deve compromettere la fluidità della consultazione.

\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_

32.12 Obiettivo finale

Al termine della consultazione l’utente deve aver compreso:

●	quali eventi sono realmente importanti;

●	quali producono effetti sulla propria attività;

●	quali documenti li regolano;

●	quali altri prodotti della piattaforma risultano collegati.

L’Hub diventa così il punto di ingresso naturale verso tutto l’ecosistema.

\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_

Conclusione del Capitolo 32

Con questo capitolo viene definita l’esperienza di consultazione dell’Hub Eventi della Scuola.

La navigazione non è costruita attorno agli articoli, ma agli eventi che incidono concretamente sulla vita professionale del personale scolastico.

L’utente può comprendere rapidamente il contesto, verificare le fonti e approfondire gli aspetti collegati attraverso gli altri prodotti della piattaforma.

SPORTELLOSCUOLA 2.0

ENTERPRISE MASTER ARCHITECTURE (EMA)

PARTE III

PRODOTTO 4

HUB EVENTI DELLA SCUOLA

CAPITOLO 33

MODELLO DELLA SCHEDA EVENTO

Un unico punto di accesso per comprendere ogni cambiamento del sistema scolastico

\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_

33.1 Obiettivo

La Scheda Evento rappresenta la forma definitiva con cui un evento viene presentato all’utente.

Il suo compito è trasformare una novità amministrativa, normativa o organizzativa in un’informazione strutturata, facilmente comprensibile e sempre aggiornata.

La scheda sostituisce la logica degli articoli isolati con un modello evolutivo che accompagna l’evento durante tutto il suo ciclo di vita.

\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_

33.2 Principio progettuale

Ogni evento deve possedere una sola scheda.

La scheda viene aggiornata progressivamente.

Non viene sostituita.

Non viene duplicata.

Ogni modifica arricchisce la stessa entità informativa.

In questo modo l’utente ritrova sempre il punto di riferimento corretto.

\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_

33.3 Identità dell’evento

La parte iniziale della scheda identifica immediatamente l’evento.

Comprende:

●	titolo istituzionale;

●	categoria;

●	ente che ha originato l’evento;

●	data della prima pubblicazione;

●	stato dell’evento;

●	ultima data di aggiornamento.

Questi elementi permettono di contestualizzare rapidamente l’informazione.

\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_

33.4 Sintesi operativa

Prima di ogni approfondimento la scheda presenta una sintesi standardizzata.

Risponde sempre alle stesse domande:

●	cosa è successo;

●	chi è coinvolto;

●	cosa cambia;

●	quando produce effetti;

●	quali azioni possono essere richieste.

La sintesi mantiene un linguaggio semplice, rigoroso e privo di interpretazioni.

\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_

33.5 Cronologia dell’evento

Ogni aggiornamento viene registrato in ordine cronologico.

Per ciascun aggiornamento sono riportati:

●	data;

●	origine;

●	descrizione della modifica;

●	collegamento al documento che l’ha determinata.

L’utente può ricostruire facilmente l’evoluzione dell’evento.

\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_

33.6 Documentazione collegata

La scheda raccoglie in un’unica area tutti i documenti ufficiali correlati.

Ad esempio:

●	decreti;

●	ordinanze;

●	note ministeriali;

●	circolari;

●	comunicati ufficiali;

●	FAQ istituzionali.

Ogni documento mantiene il collegamento diretto alla fonte.

\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_

33.7 Impatto sull’ecosistema

Ogni evento evidenzia chiaramente quali prodotti della piattaforma risultano coinvolti.

Ad esempio:

●	Normativa \& Documenti;

●	Calcolo Punteggio;

●	Interpelli;

●	Osservatorio Nazionale delle Nomine;

●	Servizi;

●	Sindacalista AI.

Questo consente all’utente di approfondire senza dover effettuare nuove ricerche.

\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_

33.8 Stato dell’evento

Lo stato viene rappresentato in maniera uniforme.

Ad esempio:

●	Nuovo;

●	Aggiornato;

●	In corso;

●	In scadenza;

●	Concluso;

●	Archiviato.

Lo stato riflette esclusivamente il ciclo di vita dell’evento.

Non rappresenta un giudizio di importanza.

\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_

33.9 Scadenze collegate

Quando l’evento produce effetti temporali, la scheda evidenzia le relative scadenze.

Ogni scadenza indica:

●	data;

●	oggetto;

●	soggetti interessati;

●	collegamento all’evento principale.

In questo modo la piattaforma evita la duplicazione tra eventi e calendario.

\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_

33.10 Collegamenti intelligenti

La Scheda Evento non propone collegamenti generici.

Ogni collegamento viene generato in base ai metadati dell’evento.

Ad esempio:

Una nuova Ordinanza GPS.

↓

Normativa GPS.

↓

Calcolo Punteggio.

↓

Interpelli.

↓

Nomine.

↓

Sindacalista AI.

↓

FAQ.

↓

Scadenze.

L’utente percepisce l’intero ecosistema come un unico sistema integrato.

\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_

33.11 Controlli di qualità

Prima della pubblicazione vengono verificati:

●	completezza della scheda;

●	coerenza della classificazione;

●	presenza delle fonti ufficiali;

●	correttezza dei collegamenti;

●	assenza di eventi duplicati.

Solo dopo tali verifiche la scheda diventa visibile.

\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_

33.12 Evoluzione

La Scheda Evento è progettata per rimanere stabile negli anni.

L’introduzione di nuove categorie o nuovi prodotti della piattaforma richiede esclusivamente l’aggiunta di nuovi collegamenti, senza modificare la struttura della scheda.

Questo garantisce continuità, semplicità di manutenzione e scalabilità.

\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_

Conclusione del Capitolo 33

Con questo capitolo viene definito il modello della Scheda Evento, elemento centrale dell’Hub Eventi della Scuola.

Ogni evento viene rappresentato come un’entità unica, evolutiva e verificabile, capace di raccogliere in un solo punto tutte le informazioni, gli aggiornamenti e i collegamenti necessari per comprenderne l’impatto sul sistema scolastico.

SPORTELLOSCUOLA 2.0

ENTERPRISE MASTER ARCHITECTURE (EMA)

PARTE III

PRODOTTO 4

HUB EVENTI DELLA SCUOLA

CAPITOLO 34

MOTORE DI GESTIONE DEGLI EVENTI

Come il sistema mantiene aggiornato il patrimonio informativo senza interventi manuali

\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_

34.1 Obiettivo

L’Hub Eventi deve garantire che ogni evento rimanga corretto, aggiornato e coerente lungo tutto il suo ciclo di vita.

Il motore non produce contenuti.

Gestisce esclusivamente l’evoluzione degli eventi già acquisiti.

\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_

34.2 Evento come entità persistente

Ogni evento possiede un identificativo permanente.

Tutti gli aggiornamenti futuri vengono associati allo stesso identificativo.

Questa scelta garantisce:

●	continuità;

●	tracciabilità;

●	assenza di frammentazione.

\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_

34.3 Riconoscimento degli aggiornamenti

Quando viene acquisito un nuovo documento, il sistema verifica se:

●	apre un nuovo evento;

●	aggiorna un evento esistente;

●	conclude un evento;

●	corregge un evento precedente.

La decisione avviene attraverso i metadati definiti nella Parte II e non mediante regole manuali.

\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_

34.4 Aggiornamento incrementale

Quando un evento evolve, il sistema aggiorna esclusivamente le sezioni interessate.

Non rigenera l’intera scheda.

Questo approccio:

●	riduce il rischio di errori;

●	mantiene stabile l’indirizzo della scheda;

●	conserva la cronologia.

\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_

34.5 Controllo di coerenza

Prima della pubblicazione di ogni aggiornamento il sistema verifica:

●	corrispondenza con la fonte originaria;

●	integrità dei collegamenti;

●	validità delle relazioni con gli altri prodotti;

●	completezza dei metadati.

Solo gli aggiornamenti coerenti vengono pubblicati.

\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_

34.6 Gestione delle anomalie

Quando il sistema rileva informazioni incomplete o incoerenti, l’evento non viene bloccato automaticamente.

Viene invece classificato come “in verifica” e reso disponibile soltanto dopo il completamento dei controlli.

In questo modo si evita sia la pubblicazione di dati incerti sia l’interruzione dell’intero flusso.

\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_

34.7 Conservazione dello storico

Ogni versione significativa dell’evento viene mantenuta.

Lo storico permette di:

●	verificare le modifiche;

●	ricostruire l’evoluzione;

●	rispondere a eventuali contestazioni.

Lo storico costituisce parte integrante del patrimonio informativo.

\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_

34.8 Scalabilità

Il motore è indipendente dal numero degli eventi.

Che gli eventi siano mille o un milione, il processo rimane identico.

La crescita della piattaforma non richiede modifiche alla logica di gestione.

\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_

34.9 Integrazione con l’ecosistema

Quando un evento viene aggiornato, il motore notifica internamente soltanto i prodotti realmente interessati.

Ad esempio:

●	una nuova Ordinanza aggiorna Normativa \& Documenti;

●	un nuovo interpello aggiorna Interpelli;

●	una nuova procedura alimenta l’Osservatorio Nazionale delle Nomine.

Il principio è sempre lo stesso:

un evento → più prodotti, senza duplicare il dato.

\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_

34.10 Obiettivo finale

Il motore deve garantire che ogni evento rimanga:

●	unico;

●	aggiornato;

●	verificabile;

●	coerente con il resto dell’ecosistema.

L’utente non percepisce il funzionamento del motore, ma beneficia di un patrimonio informativo sempre ordinato.

\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_

Conclusione del Capitolo 34

Con questo capitolo viene completata la progettazione del motore di gestione dell’Hub Eventi.

L’intero prodotto si basa su un principio semplice: ogni evento viene creato una sola volta, evolve nel tempo e mantiene sempre la propria identità.

Questa scelta riduce la manutenzione, elimina la duplicazione delle informazioni e assicura continuità all’intero ecosistema.

SPORTELLOSCUOLA 2.0

ENTERPRISE MASTER ARCHITECTURE (EMA)

PARTE III

PRODOTTO 4

HUB EVENTI DELLA SCUOLA

CAPITOLO 35

VALIDAZIONE DEL PRODOTTO

Verifica della completezza dell’Hub Eventi della Scuola

\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_

35.1 Finalità

L’Hub Eventi viene valutato sulla sua capacità di organizzare il patrimonio informativo della scuola senza generare frammentazione.

La domanda di verifica è la seguente:

L’utente riesce a comprendere cosa è cambiato nel sistema scolastico consultando un unico evento, senza dover leggere molteplici articoli sullo stesso argomento?

Se la risposta è positiva, il prodotto raggiunge il proprio obiettivo.

\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_

35.2 Scenario 1 – Pubblicazione di una nuova Ordinanza

Il Ministero pubblica una nuova Ordinanza.

Il sistema deve:

●	acquisire il documento;

●	riconoscere l’evento;

●	creare una nuova Scheda Evento;

●	collegarla alla Normativa;

●	renderla disponibile nella Home;

●	aggiornare il Sindacalista AI;

●	generare gli eventuali collegamenti con gli altri prodotti.

L’utente consulta un solo punto informativo.

\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_

35.3 Scenario 2 – Rettifica

Dopo alcuni giorni viene pubblicata una rettifica.

La piattaforma:

●	aggiorna la Scheda Evento esistente;

●	registra la modifica nella cronologia;

●	mantiene disponibile la versione precedente;

●	evidenzia il cambiamento.

Non vengono creati nuovi eventi.

\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_

35.4 Scenario 3 – Nuovi documenti

All’evento vengono successivamente collegati:

●	FAQ;

●	nota ministeriale;

●	chiarimenti;

●	allegati.

La Scheda Evento si arricchisce progressivamente.

L’utente continua a consultare la medesima pagina.

\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_

35.5 Scenario 4 – Ricerca

L’utente ricerca:

“GPS 2026”

La piattaforma restituisce:

la Scheda Evento relativa.

Non una sequenza di articoli pubblicati nel tempo.

Questo riduce il rumore informativo.

\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_

35.6 Scenario 5 – Collegamenti

L’utente consulta la Scheda Evento.

Può accedere direttamente, quando pertinenti, a:

●	Normativa \& Documenti;

●	Calcolo Punteggio;

●	Interpelli;

●	Osservatorio Nazionale delle Nomine;

●	Sindacalista AI.

L’approfondimento avviene senza duplicare informazioni.

\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_

35.7 Indicatori di efficacia

Il prodotto può essere considerato efficace quando:

●	ogni evento esiste una sola volta;

●	gli aggiornamenti mantengono la continuità della scheda;

●	le fonti risultano sempre verificabili;

●	le duplicazioni vengono eliminate;

●	i collegamenti con gli altri prodotti rimangono coerenti.

\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_

35.8 Limiti del prodotto

L’Hub Eventi:

●	non sostituisce le fonti ufficiali;

●	non produce interpretazioni normative autonome;

●	non crea eventi privi di documentazione verificabile;

●	non genera articoli duplicati.

Il suo ruolo è organizzare e rendere comprensibili gli eventi del sistema scolastico.

\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_

35.9 Ruolo nell’ecosistema

Con il completamento dell’Hub Eventi viene introdotta la dimensione temporale dell’intera piattaforma.

I prodotti risultano ora organizzati secondo funzioni complementari:

●	Normativa \& Documenti definisce il quadro regolatorio.

●	Interpelli raccoglie le opportunità di reclutamento.

●	Osservatorio Nazionale delle Nomine descrive gli esiti delle procedure.

●	Hub Eventi della Scuola organizza l’evoluzione del sistema nel tempo.

Ogni prodotto mantiene un dominio distinto, evitando sovrapposizioni.

\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_

35.10 Obiettivo raggiunto

L’Hub Eventi può considerarsi completo quando:

●	ogni cambiamento del sistema scolastico viene rappresentato attraverso una sola Scheda Evento;

●	gli aggiornamenti si integrano nella cronologia;

●	i documenti ufficiali rimangono sempre accessibili;

●	l’intero ecosistema utilizza lo stesso patrimonio informativo.

In queste condizioni il prodotto diventa il motore cronologico della piattaforma.

\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_

CONCLUSIONE DEL PRODOTTO 4

Con questo capitolo termina la progettazione dell’Hub Eventi della Scuola.

Il prodotto sostituisce il tradizionale modello basato su articoli indipendenti con un sistema fondato su eventi permanenti, evolutivi e collegati all’intero ecosistema.

La sua architettura è coerente con i principi definiti nei prodotti precedenti e contribuisce a ridurre la frammentazione dell’informazione scolastica.

SPORTELLOSCUOLA 2.0

ENTERPRISE MASTER ARCHITECTURE (EMA)

PARTE III

PRODOTTO 5

CONSULENTE INTELLIGENTE

(AI Knowledge Layer)

CAPITOLO 36

VISIONE DEL PRODOTTO

Dall’assistente virtuale al livello cognitivo dell’intera piattaforma

\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_

36.1 Missione

Il Consulente Intelligente rappresenta il punto di accesso conversazionale a tutto il patrimonio informativo di SportelloScuola 2.0.

Il suo compito non consiste nel sostituire le fonti ufficiali.

Consiste nel renderle facilmente consultabili attraverso un’interazione naturale.

L’utente pone una domanda.

La piattaforma costruisce la risposta utilizzando esclusivamente informazioni verificate.

\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_

36.2 Obiettivo

Il prodotto deve consentire agli utenti di ottenere risposte affidabili senza dover conoscere preventivamente la struttura della piattaforma.

L’utente non deve sapere se la risposta proviene da:

●	Normativa;

●	Interpelli;

●	Osservatorio Nomine;

●	Hub Eventi;

●	Calcolo Punteggio;

●	Servizi.

Il sistema individua autonomamente il dominio corretto.

\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_

36.3 Principio fondamentale

Il Consulente non genera conoscenza.

La recupera.

La organizza.

La collega.

La spiega.

Ogni risposta nasce dal patrimonio informativo già presente nella piattaforma.

Questo principio garantisce coerenza e verificabilità.

\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_

36.4 Fonti della conoscenza

Il motore utilizza esclusivamente informazioni provenienti da:

●	banca dati normativa;

●	Hub Eventi;

●	archivio Interpelli;

●	Osservatorio Nazionale delle Nomine;

●	database Calcolo Punteggio;

●	contenuti redazionali validati.

Ogni risposta deve poter essere ricondotta alla relativa fonte.

\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_

36.5 Ambiti di competenza

Il Consulente può assistere l’utente in relazione a:

●	normativa scolastica;

●	reclutamento;

●	GPS;

●	graduatorie;

●	interpelli;

●	nomine;

●	personale ATA;

●	mobilità;

●	contratti;

●	concorsi;

●	scadenze;

●	servizi presenti nella piattaforma.

Ogni ambito utilizza la medesima architettura.

\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_

36.6 Specializzazioni

Il motore cognitivo supporta differenti modalità di consulenza.

Ad esempio:

●	Sindacalista AI;

●	Esperto GPS;

●	Esperto ATA;

●	Esperto Mobilità;

●	Esperto Concorsi;

●	Guida ai Servizi.

Le specializzazioni condividono la stessa base di conoscenza.

Cambiano esclusivamente il contesto della risposta.

\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_

36.7 Trasparenza

Ogni risposta deve distinguere chiaramente:

●	fatti;

●	spiegazioni;

●	riferimenti normativi;

●	eventuali limiti della risposta.

L’utente deve comprendere sempre quale parte deriva direttamente dalle fonti ufficiali.

\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_

36.8 Collegamento con l’ecosistema

Il Consulente non sostituisce i prodotti della piattaforma.

Li utilizza.

Quando opportuno indirizza l’utente verso:

●	la Scheda Documento;

●	la Scheda Evento;

●	la Scheda Interpello;

●	la Scheda Nomina;

●	il Calcolo Punteggio;

●	i Servizi.

La conversazione diventa il punto di ingresso dell’ecosistema.

\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_

36.9 Evoluzione

L’architettura è progettata affinché nuovi domini possano essere aggiunti senza modificare il motore.

L’introduzione di nuove sezioni della piattaforma comporta semplicemente l’estensione della base di conoscenza.

\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_

36.10 Obiettivo finale

Il Consulente Intelligente deve diventare il principale strumento di consultazione della piattaforma.

L’utente non cerca documenti.

Dialoga con un sistema che conosce l’intero ecosistema e lo guida verso le informazioni corrette.

\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_

Conclusione del Capitolo 36

Con questo capitolo viene definita la missione del Consulente Intelligente.

Il prodotto non è un chatbot tradizionale, ma un livello cognitivo che rende accessibile tutto il patrimonio informativo di SportelloScuola 2.0 attraverso un’interazione naturale, verificabile e coerente.

SPORTELLOSCUOLA 2.0

ENTERPRISE MASTER ARCHITECTURE (EMA)

PARTE III

PRODOTTO 5

CONSULENTE INTELLIGENTE

CAPITOLO 37

ARCHITETTURA DEL PROCESSO DECISIONALE

Come il Consulente costruisce una risposta verificabile

\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_

37.1 Obiettivo

Il Consulente Intelligente non risponde immediatamente a una domanda.

Prima identifica:

●	cosa chiede l’utente;

●	quali prodotti dell’ecosistema contengono la risposta;

●	quali fonti sono realmente pertinenti.

Solo dopo costruisce la risposta.

L’obiettivo è garantire accuratezza e coerenza.

\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_

37.2 Comprensione della richiesta

Ogni richiesta viene classificata in uno o più domini funzionali.

Ad esempio:

●	normativa;

●	graduatorie;

●	interpelli;

●	nomine;

●	contratti;

●	personale ATA;

●	docenti;

●	servizi;

●	calcolo punteggio.

La classificazione è indipendente dal modello linguistico utilizzato.

\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_

37.3 Individuazione delle fonti

Per ogni dominio individuato il sistema seleziona le fonti interne pertinenti.

Ad esempio:

Una domanda sulla mobilità richiama:

●	Normativa \& Documenti;

●	Hub Eventi, se sono presenti modifiche recenti;

●	eventuali scadenze correlate.

Una domanda sulle GPS richiama:

●	normativa GPS;

●	Hub Eventi;

●	Calcolo Punteggio;

●	Osservatorio Nomine, se pertinente.

Il sistema consulta solo le informazioni necessarie.

\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_

37.4 Costruzione del contesto

Le informazioni recuperate vengono organizzate in un contesto unico.

Il contesto contiene esclusivamente dati verificati e aggiornati.

In questa fase non viene ancora generata alcuna risposta.

\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_

37.5 Elaborazione

Solo dopo la costruzione del contesto interviene il modello linguistico.

Il suo compito è:

●	spiegare;

●	sintetizzare;

●	collegare;

●	contestualizzare.

Il modello non sostituisce le fonti.

Le rende comprensibili.

\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_

37.6 Verifica della risposta

Prima della restituzione all’utente il sistema controlla che la risposta:

●	sia coerente con il contesto costruito;

●	non introduca informazioni non supportate dalle fonti;

●	mantenga un linguaggio chiaro e professionale.

Quando una risposta richiede interpretazioni non ricavabili dalle fonti disponibili, il sistema lo dichiara esplicitamente.

\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_

37.7 Riferimenti

Ogni risposta può richiamare:

●	documenti normativi;

●	Schede Evento;

●	Schede Interpello;

●	Schede Nomina;

●	strumenti della piattaforma.

L’utente può approfondire senza dover ripetere la ricerca.

\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_

37.8 Continuità della conversazione

Il Consulente mantiene il contesto della conversazione.

Le domande successive possono riferirsi alle precedenti senza richiedere nuove spiegazioni complete.

La continuità migliora l’esperienza dell’utente e riduce ridondanze.

\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_

37.9 Neutralità

Il Consulente:

●	non sostituisce consulenze professionali personalizzate;

●	non esprime opinioni;

●	non formula valutazioni arbitrarie.

Quando esistono più interpretazioni ufficialmente ammesse, le espone indicando i relativi riferimenti.

\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_

37.10 Obiettivo finale

Ogni risposta deve essere:

●	pertinente;

●	verificabile;

●	coerente con l’intero ecosistema;

●	facilmente approfondibile.

Il valore del Consulente deriva dalla qualità delle informazioni che utilizza, non dalla quantità di testo prodotto.

\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_

Conclusione del Capitolo 37

Con questo capitolo viene definita la logica di costruzione delle risposte del Consulente Intelligente.

Il processo è indipendente dal modello AI adottato e si fonda su un principio essenziale: prima si costruisce un contesto informativo verificato, poi si genera la risposta. Questo garantisce coerenza, trasparenza e affidabilità nel tempo.

SPORTELLOSCUOLA 2.0

ENTERPRISE MASTER ARCHITECTURE (EMA)

PARTE III

PRODOTTO 5

CONSULENTE INTELLIGENTE

CAPITOLO 38

MODELLO DELLA CONSULENZA

Una risposta deve essere sempre completa, verificabile e orientata all’azione

\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_

38.1 Obiettivo

Ogni risposta del Consulente Intelligente deve seguire una struttura uniforme.

L’obiettivo non è produrre molto testo.

L’obiettivo è permettere all’utente di comprendere rapidamente:

●	la risposta;

●	il motivo della risposta;

●	i riferimenti ufficiali;

●	il passo successivo, se necessario.

La qualità deriva dalla struttura, non dalla lunghezza.

\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_

38.2 Principio di uniformità

Indipendentemente dall’argomento trattato, ogni consulenza segue lo stesso modello logico.

Questo rende l’esperienza prevedibile e facilita la comprensione.

L’utente impara a riconoscere immediatamente dove trovare ogni informazione.

\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_

38.3 Struttura della consulenza

Ogni risposta è composta da sezioni ben distinte:

1\.	Risposta sintetica.

2\.	Spiegazione.

3\.	Riferimenti ufficiali.

4\.	Eventuali effetti pratici.

5\.	Collegamenti ai prodotti correlati.

Questa struttura rimane invariata per tutti gli argomenti.

\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_

38.4 Risposta sintetica

La prima parte risponde direttamente alla domanda.

Non contiene dettagli superflui.

L’utente deve comprendere immediatamente il punto principale.

\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_

38.5 Spiegazione

Dopo la sintesi, il Consulente approfondisce.

La spiegazione:

●	chiarisce il contesto;

●	collega le norme;

●	evidenzia eventuali eccezioni;

●	mantiene un linguaggio comprensibile.

Non introduce interpretazioni non supportate dalle fonti.

\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_

38.6 Riferimenti

Ogni consulenza indica chiaramente i riferimenti utilizzati.

Ad esempio:

●	norma;

●	ordinanza;

●	nota ministeriale;

●	Scheda Evento;

●	documento presente nella banca dati.

La risposta rimane sempre verificabile.

\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_

38.7 Effetti pratici

Quando pertinente, il sistema evidenzia le conseguenze operative.

Ad esempio:

●	apertura di una procedura;

●	nuova scadenza;

●	modifica di un requisito;

●	aggiornamento del punteggio;

●	disponibilità di interpelli.

L’utente comprende cosa cambia concretamente.

\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_

38.8 Collegamenti

Se la piattaforma dispone già di strumenti utili, la risposta li richiama.

Ad esempio:

●	Calcolo Punteggio;

●	Hub Eventi;

●	Normativa \& Documenti;

●	Osservatorio Nomine;

●	Interpelli;

●	Servizi.

I collegamenti vengono proposti solo se realmente pertinenti.

\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_

38.9 Gestione dell’incertezza

Quando le fonti non consentono una risposta definitiva, il Consulente lo dichiara esplicitamente.

Può:

●	spiegare il motivo;

●	indicare le informazioni mancanti;

●	rinviare alla documentazione ufficiale disponibile.

La trasparenza prevale sulla completezza apparente.

\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_

38.10 Linguaggio

Il linguaggio deve essere:

●	professionale;

●	semplice;

●	neutrale;

●	coerente.

Vanno evitati tecnicismi non necessari e formulazioni ambigue.

\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_

38.11 Evoluzione

Nuove aree tematiche potranno utilizzare lo stesso modello senza modificarne la struttura.

Il formato della consulenza rimane stabile anche con l’espansione della piattaforma.

\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_

38.12 Obiettivo finale

Ogni risposta deve consentire all’utente di:

●	comprendere il problema;

●	verificare la fonte;

●	sapere cosa fare;

●	accedere immediatamente agli strumenti utili.

La consulenza diventa così un punto di ingresso verso l’intero ecosistema.

\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_

Conclusione del Capitolo 38

Con questo capitolo viene definito il modello standard della consulenza.

La risposta del Consulente Intelligente non è un semplice testo generato dall’AI, ma un contenuto strutturato, verificabile e integrato con gli altri prodotti della piattaforma, mantenendo uniformità e qualità in ogni contesto.

SPORTELLOSCUOLA 2.0

ENTERPRISE MASTER ARCHITECTURE (EMA)

PARTE III

PRODOTTO 5

CONSULENTE INTELLIGENTE

CAPITOLO 39

MOTORE DELLA CONOSCENZA

La conoscenza come patrimonio strutturato della piattaforma

\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_

39.1 Obiettivo

Il Consulente Intelligente deve basare ogni risposta su una conoscenza strutturata, verificabile e continuamente aggiornata.

La qualità della consulenza dipende dalla qualità della conoscenza disponibile, non dal modello linguistico utilizzato.

\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_

39.2 Principio del patrimonio unico

L’intera piattaforma mantiene un solo patrimonio informativo condiviso.

Normativa, Eventi, Interpelli, Nomine, Calcolo Punteggio e Servizi alimentano la stessa base di conoscenza.

Nessun prodotto mantiene copie autonome delle informazioni.

Questo elimina incoerenze e duplicazioni.

\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_

39.3 Origine della conoscenza

Ogni elemento della conoscenza deve derivare da una fonte identificabile.

Le principali categorie sono:

●	documenti normativi;

●	documenti amministrativi;

●	eventi strutturati;

●	procedure di reclutamento;

●	dati prodotti dai moduli interni;

●	contenuti redazionali validati.

Ogni elemento mantiene il riferimento alla propria origine.

\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_

39.4 Arricchimento della conoscenza

La piattaforma non si limita ad archiviare documenti.

Ogni nuovo elemento viene arricchito con metadati che ne facilitano il riutilizzo.

Ad esempio:

●	area tematica;

●	destinatari;

●	anno scolastico;

●	territorio di applicazione;

●	stato di validità;

●	relazioni con altri elementi della piattaforma.

Questa classificazione rende possibile una ricerca precisa e un recupero contestuale delle informazioni.

\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_

39.5 Evoluzione controllata

La conoscenza evolve nel tempo.

Quando una norma viene modificata o un evento viene aggiornato, il sistema non elimina la versione precedente.

Conserva lo storico e identifica chiaramente quale versione è attualmente vigente.

Questo garantisce tracciabilità e affidabilità.

\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_

39.6 Controllo di qualità

Prima che un nuovo contenuto entri nella base di conoscenza vengono verificati:

●	autenticità della fonte;

●	completezza delle informazioni;

●	coerenza con i dati già presenti;

●	assenza di duplicazioni.

Solo i contenuti validati diventano disponibili al Consulente.

\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_

39.7 Separazione tra dati e interpretazione

La piattaforma distingue sempre:

●	il dato oggettivo;

●	la spiegazione del dato.

Le informazioni ufficiali vengono conservate integralmente.

Le spiegazioni sono prodotte dal Consulente sulla base di tali informazioni, senza modificarne il significato.

\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_

39.8 Riutilizzo trasversale

Un elemento della conoscenza può essere utilizzato contemporaneamente da più prodotti.

Ad esempio, una nuova Ordinanza può essere richiamata da:

●	Normativa \& Documenti;

●	Hub Eventi;

●	Calcolo Punteggio;

●	Consulente Intelligente;

●	Osservatorio Nomine.

L’informazione esiste una sola volta.

\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_

39.9 Indipendenza dal modello AI

La base di conoscenza appartiene alla piattaforma.

Il modello linguistico rappresenta esclusivamente il motore che la consulta.

L’eventuale sostituzione del modello AI non richiede modifiche al patrimonio informativo.

Questa separazione tutela il valore del progetto nel lungo periodo.

\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_

39.10 Scalabilità

L’aumento della conoscenza non modifica il funzionamento del sistema.

Nuove categorie, nuove norme o nuovi prodotti vengono integrati seguendo lo stesso modello.

La crescita dell’ecosistema rimane ordinata.

\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_

39.11 Obiettivo finale

Il patrimonio informativo di SportelloScuola 2.0 deve diventare la fonte unica e autorevole da cui tutti i prodotti della piattaforma recuperano le informazioni necessarie.

Il Consulente Intelligente rappresenta il principale utilizzatore di questo patrimonio, ma non il suo proprietario.

\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_

Conclusione del Capitolo 39

Con questo capitolo viene definita l’architettura della conoscenza dell’intera piattaforma.

Il patrimonio informativo viene trattato come un asset strategico: unico, strutturato, verificabile e condiviso tra tutti i prodotti. Questa impostazione garantisce coerenza, riduce la manutenzione e rende SportelloScuola 2.0 indipendente dalle evoluzioni dei modelli linguistici.

SPORTELLOSCUOLA 2.0

ENTERPRISE MASTER ARCHITECTURE (EMA)

PARTE III

PRODOTTO 5

CONSULENTE INTELLIGENTE

CAPITOLO 40

ARCHITETTURA DELL’AGGIORNAMENTO CONTINUO

Il Consulente migliora perché cresce la piattaforma

\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_

40.1 Obiettivo

Il Consulente Intelligente deve rimanere costantemente aggiornato senza richiedere interventi specifici sul motore conversazionale.

L’aggiornamento della conoscenza deve derivare dall’evoluzione naturale dell’ecosistema.

\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_

40.2 Principio fondamentale

Il Consulente non possiede una propria banca dati.

Consulta sempre il patrimonio informativo condiviso della piattaforma.

Di conseguenza, quando un prodotto viene aggiornato, anche il Consulente dispone immediatamente delle nuove informazioni.

\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_

40.3 Aggiornamento attraverso i prodotti

Ogni prodotto contribuisce all’evoluzione della conoscenza.

Ad esempio:

●	Normativa \& Documenti aggiorna il quadro giuridico;

●	Hub Eventi registra le novità;

●	Interpelli aggiorna le opportunità;

●	Osservatorio Nomine aggiorna gli esiti delle procedure;

●	Calcolo Punteggio aggiorna i criteri applicativi.

Il Consulente utilizza queste informazioni senza creare copie.

\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_

40.4 Aggiornamento controllato

Ogni nuova informazione diventa disponibile solo dopo il processo di validazione previsto dal prodotto di origine.

Il Consulente non utilizza dati incompleti, provvisori o non verificati.

Questo principio tutela l’affidabilità delle risposte.

\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_

40.5 Continuità della conoscenza

Quando una norma viene modificata o sostituita:

●	la nuova versione diventa quella di riferimento;

●	la versione precedente rimane nello storico;

●	il Consulente distingue chiaramente tra disciplina vigente e disciplina storica.

L’utente può comprendere sia l’attualità sia l’evoluzione normativa.

\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_

40.6 Correzione degli errori

Se viene individuato un errore in un contenuto della piattaforma:

●	la correzione viene effettuata una sola volta;

●	tutti i prodotti che utilizzano quell’informazione ne beneficiano automaticamente;

●	il Consulente restituisce immediatamente la versione corretta.

Questo elimina il rischio di correzioni parziali.

\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_

40.7 Coerenza tra prodotti

Il Consulente verifica che le informazioni recuperate siano coerenti tra loro.

In presenza di aggiornamenti in corso o di differenze temporali tra documenti, la risposta evidenzia chiaramente il contesto.

La trasparenza prevale sempre sulla semplificazione.

\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_

40.8 Evoluzione dell’ecosistema

Quando in futuro verranno introdotti nuovi prodotti, essi potranno alimentare la stessa base di conoscenza.

Non sarà necessario modificare il funzionamento del Consulente.

Sarà sufficiente definire le relazioni con il patrimonio informativo esistente.

\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_

40.9 Monitoraggio della qualità

L’efficacia del Consulente viene valutata attraverso indicatori oggettivi, ad esempio:

●	percentuale di risposte supportate da fonti ufficiali;

●	completezza dei riferimenti;

●	tempo medio di aggiornamento dopo una modifica normativa;

●	coerenza tra risposta e documentazione.

L’obiettivo è migliorare il sistema attraverso dati misurabili.

\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_

40.10 Obiettivo finale

Il Consulente deve rimanere costantemente allineato all’evoluzione del sistema scolastico senza richiedere manutenzioni dedicate.

L’aggiornamento della conoscenza coincide con l’aggiornamento dell’intera piattaforma.

\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_

Conclusione del Capitolo 40

Con questo capitolo viene definito il modello di aggiornamento continuo del Consulente Intelligente.

L’AI non apprende autonomamente da fonti esterne né modifica la propria conoscenza in modo indipendente. Rimane sincronizzata con il patrimonio informativo validato della piattaforma, garantendo stabilità, coerenza e affidabilità nel tempo.

SPORTELLOSCUOLA 2.0

ENTERPRISE MASTER ARCHITECTURE (EMA)

PARTE III

PRODOTTO 5

CONSULENTE INTELLIGENTE

CAPITOLO 41

VALIDAZIONE DEL PRODOTTO

Verifica dell’affidabilità del Consulente Intelligente

\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_

41.1 Finalità

Il Consulente Intelligente viene valutato sulla capacità di fornire consulenze coerenti, verificabili e integrate con l’ecosistema.

La domanda fondamentale è una sola.

L’utente ottiene una risposta affidabile senza dover conoscere la struttura interna della piattaforma?

Se la risposta è positiva, il prodotto raggiunge il proprio obiettivo.

\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_

41.2 Scenario 1 – Domanda normativa

L’utente chiede:

“Quali requisiti servono per partecipare all’aggiornamento GPS?”

Il sistema deve:

●	individuare il dominio Normativa;

●	recuperare la disciplina vigente;

●	verificare eventuali eventi recenti che modificano la materia;

●	costruire una risposta coerente;

●	indicare la documentazione ufficiale.

La consulenza rimane verificabile.

\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_

41.3 Scenario 2 – Domanda operativa

L’utente domanda:

“Quanto vale il mio servizio?”

Il Consulente non produce un calcolo autonomo.

Indirizza l’utente al Calcolo Punteggio, spiegando il criterio applicabile.

Ogni prodotto mantiene il proprio ruolo.

\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_

41.4 Scenario 3 – Domanda sul reclutamento

L’utente chiede:

“Ci sono interpelli disponibili nella mia provincia?”

Il sistema consulta il prodotto Interpelli.

Non utilizza fonti esterne non validate.

La risposta rimane coerente con i dati disponibili nella piattaforma.

\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_

41.5 Scenario 4 – Domanda complessa

L’utente pone una domanda che coinvolge più ambiti.

Ad esempio:

“Sono inserito in GPS, ho maturato altro servizio e vorrei capire come cambia la mia posizione e quali opportunità avrò.”

Il Consulente:

●	individua i domini coinvolti;

●	organizza la risposta;

●	propone i prodotti pertinenti.

Non tenta di sostituire strumenti specialistici già presenti.

\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_

41.6 Scenario 5 – Informazioni non disponibili

Quando la piattaforma non dispone di informazioni sufficienti, il Consulente:

●	dichiara il limite della conoscenza disponibile;

●	spiega il motivo;

●	indica, se presente, la fonte ufficiale da consultare.

La trasparenza prevale sempre sulla completezza apparente.

\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_

41.7 Indicatori di efficacia

Il prodotto può essere considerato efficace quando:

●	le risposte sono coerenti con le fonti;

●	i riferimenti risultano verificabili;

●	vengono utilizzati correttamente i prodotti dell’ecosistema;

●	il linguaggio rimane chiaro e uniforme;

●	le risposte mantengono continuità durante la conversazione.

\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_

41.8 Limiti del prodotto

Il Consulente:

●	non sostituisce consulenze legali personalizzate;

●	non modifica le fonti ufficiali;

●	non produce interpretazioni arbitrarie;

●	non risponde oltre il proprio dominio specialistico.

Questi limiti costituiscono una garanzia di affidabilità.

\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_

41.9 Ruolo nell’ecosistema

Con il completamento del Consulente Intelligente, l’intera piattaforma acquisisce un punto di accesso conversazionale unico.

Ogni prodotto mantiene la propria autonomia funzionale.

Il Consulente rappresenta il livello di orchestrazione della conoscenza, senza duplicare dati o logiche.

\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_

41.10 Obiettivo raggiunto

Il prodotto può essere considerato completo quando:

●	ogni risposta nasce da informazioni validate;

●	ogni consulenza mantiene riferimenti verificabili;

●	ogni domanda viene ricondotta al dominio corretto;

●	l’utente viene accompagnato verso gli strumenti realmente utili.

In queste condizioni il Consulente Intelligente diventa il principale punto di accesso all’intero ecosistema.

\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_

CONCLUSIONE DEL PRODOTTO 5

Con questo capitolo termina la progettazione del Consulente Intelligente.

Il prodotto non viene concepito come un semplice chatbot, ma come un livello cognitivo che organizza, interpreta e rende accessibile il patrimonio informativo di SportelloScuola 2.0 attraverso un’interazione naturale, trasparente e verificabile.

La sua architettura è coerente con tutti i prodotti sviluppati in precedenza e garantisce indipendenza dal modello linguistico utilizzato.

SPORTELLOSCUOLA 2.0

ENTERPRISE MASTER ARCHITECTURE (EMA)

PARTE IV

ARCHITETTURA DELL’ECOSISTEMA

Obiettivo

Trasformare l’insieme dei prodotti in un unico sistema intelligente, coerente e scalabile.

\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_

CAPITOLO 42

IL PRINCIPIO DELL’ECOSISTEMA UNIFICATO

La piattaforma come organismo, non come insieme di sezioni

\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_

42.1 Visione

SportelloScuola 2.0 non deve essere percepito come un sito composto da pagine indipendenti.

L’utente non dovrebbe mai avere la sensazione di “cambiare sezione”.

Dovrebbe invece percepire un unico ambiente informativo.

Ogni prodotto rappresenta una diversa prospettiva sul medesimo patrimonio informativo.

\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_

42.2 Un solo patrimonio informativo

Tutti i prodotti condividono la stessa base dati logica.

La piattaforma evita archivi paralleli o contenuti duplicati.

Ogni informazione viene gestita una sola volta e resa disponibile ai diversi prodotti secondo le rispettive esigenze.

Questo principio garantisce:

●	coerenza;

●	riduzione della manutenzione;

●	eliminazione delle incongruenze.

\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_

42.3 Un solo linguaggio

L’intero ecosistema deve utilizzare un linguaggio uniforme.

Ad esempio, termini come:

●	evento;

●	interpello;

●	nomina;

●	documento;

●	scadenza;

●	punteggio.

devono avere lo stesso significato in ogni parte della piattaforma.

Questa uniformità riduce l’ambiguità e facilita l’apprendimento da parte dell’utente.

\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_

42.4 Un solo modello di navigazione

Ogni prodotto segue gli stessi principi di interazione.

L’utente ritrova sempre:

●	identificazione del contenuto;

●	sintesi iniziale;

●	approfondimento;

●	riferimenti;

●	collegamenti contestuali.

Non è necessario imparare modalità diverse di consultazione.

\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_

42.5 Un solo motore di ricerca

La ricerca non appartiene a una singola sezione.

È un servizio trasversale.

Qualunque ricerca può restituire risultati provenienti da più prodotti, organizzati secondo il contesto della richiesta.

La ricerca diventa un punto di ingresso all’ecosistema.

\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_

42.6 Un solo sistema di aggiornamento

L’aggiornamento delle informazioni segue un flusso unico.

Ogni modifica viene propagata ai prodotti interessati senza interventi manuali.

Questo assicura che tutte le sezioni della piattaforma riflettano sempre lo stato più recente delle informazioni.

\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_

42.7 Un solo sistema di collegamenti

I collegamenti tra prodotti non vengono creati manualmente.

Sono determinati dalle relazioni esistenti tra gli elementi della conoscenza.

Questo rende la navigazione coerente e facilmente estendibile.

\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_

42.8 Un solo punto di accesso

L’utente può iniziare il proprio percorso da qualsiasi punto:

●	una ricerca;

●	una News;

●	un interpello;

●	una nomina;

●	una norma;

●	il Consulente Intelligente.

Indipendentemente dal punto di ingresso, il sistema lo accompagna verso le informazioni correlate.

\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_

42.9 Un solo criterio di evoluzione

L’aggiunta di un nuovo prodotto non deve richiedere la revisione dell’intera piattaforma.

È sufficiente che il nuovo prodotto:

●	utilizzi il patrimonio informativo comune;

●	adotti il linguaggio condiviso;

●	rispetti le regole di collegamento.

Questo rende l’ecosistema scalabile.

\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_

42.10 Obiettivo finale

SportelloScuola 2.0 deve essere percepito come un unico sistema capace di accompagnare l’utente lungo tutto il percorso informativo, indipendentemente dal punto di partenza.

La piattaforma non offre semplicemente contenuti.

Offre un’esperienza coerente.

\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_

Conclusione del Capitolo 42

Con questo capitolo viene definito il principio dell’Ecosistema Unificato.

Tutti i prodotti progettati nelle parti precedenti vengono ricondotti a un’unica architettura logica, nella quale dati, processi e interazioni sono condivisi. Questa scelta costituisce il fondamento della scalabilità futura della piattaforma.

SPORTELLOSCUOLA 2.0

ENTERPRISE MASTER ARCHITECTURE (EMA)

PARTE IV

ARCHITETTURA DELL’ECOSISTEMA

CAPITOLO 43

IL PRINCIPIO DEL PERCORSO CONTINUO

La piattaforma accompagna l’utente fino al risultato

\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_

43.1 Obiettivo

Ogni interazione con SportelloScuola 2.0 deve essere considerata l’inizio di un percorso.

Mai la fine.

L’utente non entra nella piattaforma per leggere una pagina.

Entra perché deve risolvere un problema.

L’intero ecosistema viene progettato per accompagnarlo fino al completamento del proprio obiettivo.

\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_

43.2 Superare la logica delle pagine

Nei siti tradizionali ogni pagina rappresenta un contenuto isolato.

Su SportelloScuola 2.0 ogni pagina rappresenta invece uno stato del percorso.

Ad esempio:

l’utente arriva su un interpello.

Per la piattaforma non è importante che abbia letto l’interpello.

È importante capire:

“Cosa probabilmente dovrà fare adesso?”

Questa differenza cambia completamente la progettazione.

\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_

43.3 Ogni contenuto deve avere uno scopo

Ogni pagina dell’ecosistema deve rispondere a quattro domande.

Dove mi trovo?

Il sistema identifica chiaramente il contenuto.

\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_

Perché questa informazione è importante?

L’utente comprende immediatamente il motivo della consultazione.

\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_

Cosa posso fare adesso?

La piattaforma propone esclusivamente azioni realmente utili.

\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_

Quale sarà il passo successivo?

L’utente non rimane mai senza una direzione.

\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_

43.4 Il principio della continuità

Ogni prodotto deve conoscere quali prodotti possono rappresentare il naturale proseguimento del percorso.

Esempio.

L’utente legge una nuova Ordinanza sulle GPS.

Il sistema comprende che potrebbe essere interessato a:

●	verificare il punteggio;

●	consultare gli interpelli;

●	monitorare le future nomine;

●	parlare con il Consulente.

Non vengono mostrati tutti i prodotti.

Solo quelli coerenti.

\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_

43.5 Collegamenti contestuali

I collegamenti non vengono costruiti manualmente.

Sono generati utilizzando:

●	dominio tematico;

●	anno scolastico;

●	categoria;

●	destinatari;

●	relazioni della Knowledge Graph.

In questo modo ogni pagina rimane aggiornata automaticamente.

\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_

43.6 Percorsi differenti

Non esiste un solo percorso.

Esistono percorsi differenti in funzione dell’obiettivo.

Ad esempio.

Aspirante docente

Normativa

↓

Calcolo Punteggio

↓

Interpelli

↓

Nomine

↓

Consulente

\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_

Personale ATA

Normativa

↓

Graduatorie

↓

Interpelli ATA

↓

Nomine ATA

↓

Servizi

\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_

Docente già di ruolo

Normativa

↓

Mobilità

↓

Contratti

↓

Consulente

Ogni percorso utilizza gli stessi prodotti.

Cambia soltanto l’ordine.

\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_

43.7 Nessun vicolo cieco

Una delle regole fondamentali della piattaforma.

Nessuna pagina deve terminare senza offrire almeno una possibilità concreta di proseguire.

Naturalmente:

senza pubblicità,

senza spam,

senza suggerimenti casuali.

Solo collegamenti realmente utili.

\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_

43.8 Riduzione del numero di click

L’obiettivo non consiste nel ridurre il numero assoluto di click.

L’obiettivo consiste nel ridurre i click inutili.

Ogni click deve avvicinare l’utente al risultato.

Mai allontanarlo.

\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_

43.9 Misurazione della qualità

Il percorso viene considerato efficace quando:

●	l’utente trova rapidamente la risposta;

●	non ripete la stessa ricerca;

●	non ritorna continuamente alla Home;

●	utilizza naturalmente più prodotti durante la stessa sessione.

Questi indicatori consentono di valutare l’efficacia dell’ecosistema.

\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_

43.10 Obiettivo finale

SportelloScuola 2.0 deve essere progettato affinché ogni contenuto rappresenti una tappa di un percorso più ampio.

La piattaforma non distribuisce informazioni isolate.

Costruisce esperienze guidate.

\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_

Conclusione del Capitolo 43

Con questo capitolo viene introdotto il principio del Percorso Continuo.

Ogni prodotto dell’ecosistema assume un ruolo preciso all’interno del cammino dell’utente. I collegamenti tra i contenuti non sono più semplici link, ma transizioni logiche basate sul contesto e sull’obiettivo dell’utente.

SPORTELLOSCUOLA 2.0

ENTERPRISE MASTER ARCHITECTURE (EMA)

PARTE IV

ARCHITETTURA DELL’ECOSISTEMA

CAPITOLO 44

IL MOTORE DECISIONALE DELL’ECOSISTEMA

Come la piattaforma decide cosa mostrare, quando mostrarlo e a chi

\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_

44.1 Visione

Ogni utente entra nella piattaforma con un obiettivo diverso.

Un aspirante docente cerca informazioni differenti rispetto a un assistente amministrativo.

Un docente di ruolo ha esigenze differenti rispetto a un neoassunto.

La piattaforma deve essere capace di adattare automaticamente il proprio comportamento.

Non modificando i contenuti.

Ma modificando il percorso.

\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_

44.2 Principio fondamentale

L’ecosistema non prende decisioni casuali.

Ogni suggerimento nasce esclusivamente da informazioni oggettive.

Le decisioni vengono costruite utilizzando:

●	il contenuto consultato;

●	il dominio tematico;

●	l’anno scolastico;

●	il profilo dell’utente (se disponibile);

●	le relazioni presenti nella Knowledge Graph.

Non vengono utilizzati criteri pubblicitari o promozionali.

\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_

44.3 Decisioni contestuali

Ogni schermata genera un contesto.

Il contesto rappresenta la situazione informativa nella quale si trova l’utente.

Ad esempio:

L’utente consulta un interpello ATA.

Il sistema comprende che il contesto riguarda:

●	personale ATA;

●	reclutamento;

●	provincia specifica;

●	anno scolastico corrente.

Tutte le decisioni successive derivano da questo contesto.

\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_

44.4 Priorità delle informazioni

Quando esistono molte informazioni collegate, il sistema stabilisce un ordine di priorità.

I criteri sono:

1\.	rilevanza per la richiesta;

2\.	validità temporale;

3\.	ufficialità della fonte;

4\.	impatto pratico sull’utente;

5\.	relazioni con il percorso già seguito.

Questo evita sovraccarico informativo.

\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_

44.5 Selezione intelligente

La piattaforma non mostra tutto ciò che conosce.

Mostra soltanto ciò che può aiutare concretamente l’utente nel momento in cui si trova.

Questo principio riduce il rumore informativo.

\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_

44.6 Neutralità

Il motore decisionale non modifica mai:

●	norme;

●	punteggi;

●	graduatorie;

●	documenti ufficiali.

Decide esclusivamente:

●	l’ordine di presentazione;

●	i collegamenti;

●	i suggerimenti di navigazione.

La conoscenza rimane sempre oggettiva.

\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_

44.7 Adattabilità

Se durante la navigazione cambia il contesto, anche il comportamento della piattaforma cambia.

Ad esempio.

L’utente passa da una ricerca sulle GPS a una ricerca sulla mobilità.

Il sistema aggiorna automaticamente i suggerimenti.

Non mantiene collegamenti ormai non più pertinenti.

\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_

44.8 Stabilità

Le regole decisionali devono essere prevedibili.

Lo stesso contesto produce sempre lo stesso comportamento.

Questa coerenza aumenta la fiducia dell’utente.

\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_

44.9 Evoluzione

Nuovi prodotti potranno essere integrati definendo:

●	il dominio di appartenenza;

●	le relazioni con gli altri prodotti;

●	le regole decisionali.

Non sarà necessario modificare il motore.

\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_

44.10 Obiettivo finale

La piattaforma deve comportarsi come un consulente esperto.

Non invade.

Non interrompe.

Non propone elementi casuali.

Accompagna l’utente utilizzando esclusivamente informazioni pertinenti.

\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_

Conclusione del Capitolo 44

Con questo capitolo viene definito il Motore Decisionale dell’Ecosistema.

L’architettura distingue chiaramente tra conoscenza (ciò che la piattaforma sa) e decisione (ciò che la piattaforma sceglie di mostrare in un determinato contesto). Questa separazione rende il comportamento dell’intero ecosistema coerente, trasparente e facilmente estendibile.

SPORTELLOSCUOLA 2.0

ENTERPRISE MASTER ARCHITECTURE (EMA)

PARTE IV

ARCHITETTURA DELL’ECOSISTEMA

CAPITOLO 45

LA RICERCA UNIVERSALE SEMANTICA

L’utente cerca una risposta, non un documento

\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_

45.1 Visione

La ricerca rappresenta il principale punto di ingresso dell’intera piattaforma.

L’utente non deve conoscere:

●	la struttura del sito;

●	il nome della sezione;

●	il tipo di documento;

●	la terminologia amministrativa.

Deve poter formulare la propria esigenza con un linguaggio naturale.

La piattaforma interpreta la richiesta e individua autonomamente le informazioni pertinenti.

\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_

45.2 Obiettivo

Trasformare la ricerca da semplice recupero di contenuti a sistema di orientamento intelligente.

L’utente non cerca un PDF.

Cerca una soluzione.

\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_

45.3 Principio fondamentale

La ricerca non lavora sui testi.

Lavora sulla Knowledge Graph costruita nei capitoli precedenti.

Ogni risultato deriva dalle relazioni tra:

●	documenti;

●	eventi;

●	interpelli;

●	nomine;

●	servizi;

●	punteggi;

●	consulenze.

Questo consente di comprendere il significato della richiesta.

\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_

45.4 Comprensione della domanda

Il sistema interpreta automaticamente:

●	sinonimi;

●	abbreviazioni;

●	errori ortografici;

●	linguaggio comune;

●	linguaggio amministrativo.

Esempi.

L’utente scrive:

“Quando aprono le GPS?”

Il sistema comprende che potrebbe riferirsi a:

●	aggiornamento GPS;

●	Ordinanza Ministeriale;

●	calendario;

●	eventi collegati;

●	normativa.

Non ricerca semplicemente la parola “GPS”.

\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_

45.5 Classificazione della richiesta

Ogni ricerca viene classificata secondo:

●	argomento;

●	categoria;

●	territorio;

●	anno scolastico;

●	tipologia di personale;

●	stato della procedura.

Questa classificazione permette di selezionare i risultati più pertinenti.

\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_

45.6 Ordinamento intelligente

I risultati non vengono ordinati cronologicamente.

L’ordine dipende da:

1\.	pertinenza;

2\.	validità;

3\.	ufficialità;

4\.	impatto pratico;

5\.	relazioni con altri contenuti.

L’obiettivo è mostrare prima ciò che serve davvero.

\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_

45.7 Risultati unificati

Una sola ricerca può restituire contemporaneamente:

●	una Scheda Evento;

●	una norma;

●	un interpello;

●	una nomina;

●	una scadenza;

●	un servizio;

●	un calcolo;

●	una risposta del Consulente.

L’utente non percepisce la divisione in sezioni.

\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_

45.8 Ricerca contestuale

Se l’utente sta già consultando un argomento, la ricerca utilizza quel contesto.

Ad esempio.

Se l’utente è nella sezione ATA e ricerca:

“graduatorie”

il sistema privilegia:

Graduatorie ATA.

Non GPS Docenti.

Il contesto migliora la precisione.

\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_

45.9 Nessun risultato

La piattaforma non restituisce mai una semplice pagina:

“Nessun risultato trovato.”

Quando non individua contenuti esatti:

●	propone argomenti correlati;

●	suggerisce il Consulente Intelligente;

●	mostra eventi simili;

●	propone documenti vicini semanticamente.

Ogni ricerca produce sempre un orientamento.

\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_

45.10 Evoluzione

La ricerca migliora automaticamente con la crescita della Knowledge Graph.

Nuovi prodotti non richiedono modifiche al motore.

Vengono semplicemente collegati alla rete della conoscenza.

\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_

45.11 Obiettivo finale

L’utente deve poter digitare qualsiasi domanda relativa al mondo della scuola.

La piattaforma individua autonomamente:

●	il dominio;

●	il contesto;

●	il percorso;

●	il prodotto più adatto.

La ricerca diventa così il principale strumento di accesso all’intero ecosistema.

\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_

Conclusione del Capitolo 45

Con questo capitolo viene definita la Ricerca Universale Semantica.

Il sistema supera il tradizionale modello basato su parole chiave e adotta un approccio orientato al significato delle richieste. La ricerca diventa il punto di accesso privilegiato all’intero ecosistema, valorizzando il patrimonio informativo condiviso e la Knowledge Graph progettata nei capitoli precedenti.

SPORTELLOSCUOLA 2.0

ENTERPRISE MASTER ARCHITECTURE (EMA)

PARTE IV

ARCHITETTURA DELL’ECOSISTEMA

CAPITOLO 46

IL PROFILO OPERATIVO

La memoria funzionale dell’ecosistema

\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_

46.1 Visione

Il Profilo Operativo rappresenta la memoria funzionale della piattaforma.

Non descrive l’identità dell’utente.

Descrive esclusivamente il contesto necessario per offrirgli un’esperienza più efficiente.

L’obiettivo è ridurre le operazioni ripetitive.

Non raccogliere dati.

\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_

46.2 Principio fondamentale

Il Profilo Operativo deve contenere esclusivamente informazioni che migliorano concretamente l’utilizzo della piattaforma.

Ogni dato memorizzato deve superare una domanda fondamentale.

“Se questa informazione non esistesse, l’utente dovrebbe ripeterla frequentemente?”

Se la risposta è no,

quell’informazione non appartiene al Profilo Operativo.

\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_

46.3 Informazioni persistenti

Il Profilo Operativo può memorizzare informazioni stabili, ad esempio:

●	provincia di interesse;

●	regione;

●	categoria prevalente (Docente, ATA, Educatore, ecc.);

●	anno scolastico corrente;

●	preferenze linguistiche;

●	preferenze di visualizzazione.

Questi elementi migliorano l’esperienza senza modificare i contenuti.

\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_

46.4 Informazioni temporanee

Durante una sessione il sistema può mantenere un contesto temporaneo.

Ad esempio:

●	ricerca in corso;

●	procedura seguita;

●	evento consultato;

●	conversazione con il Consulente.

Alla conclusione della sessione queste informazioni decadono, salvo diversa scelta dell’utente.

\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_

46.5 Personalizzazione del percorso

Il Profilo Operativo non modifica le informazioni mostrate.

Modifica esclusivamente:

●	l’ordine dei suggerimenti;

●	il percorso consigliato;

●	le scorciatoie;

●	i collegamenti contestuali.

Due utenti possono leggere lo stesso documento seguendo percorsi differenti.

Il contenuto rimane identico.

\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_

46.6 Nessuna duplicazione

Le informazioni del Profilo Operativo non vengono replicate nei prodotti.

Normativa.

Interpelli.

Nomine.

Consulente.

Hub Eventi.

Tutti interrogano lo stesso Profilo Operativo.

Questo garantisce uniformità.

\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_

46.7 Controllo dell’utente

L’utente mantiene sempre il controllo del proprio Profilo Operativo.

Può:

●	visualizzare le informazioni memorizzate;

●	modificarle;

●	eliminarle;

●	ripristinare il profilo.

La piattaforma mantiene piena trasparenza sul loro utilizzo.

\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_

46.8 Evoluzione

Nuovi prodotti potranno utilizzare il Profilo Operativo senza introdurre nuovi campi.

Prima di aggiungere un’informazione dovrà essere dimostrato che essa produce un beneficio concreto e misurabile.

\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_

46.9 Benefici architetturali

Questa impostazione consente di:

●	ridurre il numero di configurazioni richieste;

●	diminuire il tempo necessario per trovare le informazioni;

●	migliorare la continuità tra i prodotti;

●	mantenere semplice l’interfaccia.

\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_

46.10 Obiettivo finale

Il Profilo Operativo deve rappresentare una memoria minima, coerente e condivisa che accompagna l’utente nell’ecosistema senza trasformarsi in un archivio di dati personali.

\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_

Conclusione del Capitolo 46

Con questo capitolo viene definito il Profilo Operativo come componente trasversale dell’ecosistema.

Esso non introduce nuove funzionalità, ma consente ai prodotti già progettati di offrire un’esperienza più fluida e coerente, riducendo la necessità di ripetere configurazioni e ricerche.

SPORTELLOSCUOLA 2.0

ENTERPRISE MASTER ARCHITECTURE (EMA)

PARTE IV

ARCHITETTURA DELL’ECOSISTEMA

CAPITOLO 47

IL MOTORE TEMPORALE DELL’ECOSISTEMA

Il tempo come dimensione trasversale della piattaforma

\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_

47.1 Visione

Ogni elemento della piattaforma possiede una dimensione temporale.

Una norma entra in vigore.

Un interpello apre e chiude.

Una nomina viene pubblicata.

Una graduatoria viene aggiornata.

Una scadenza arriva.

Il tempo non rappresenta una caratteristica accessoria.

È una proprietà fondamentale della conoscenza.

\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_

47.2 Obiettivo

L’ecosistema deve conoscere in ogni momento lo stato temporale di ogni informazione.

Questo consente di:

●	distinguere ciò che è attuale;

●	evidenziare ciò che sta per cambiare;

●	archiviare ciò che è concluso;

●	mantenere disponibile lo storico.

\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_

47.3 Stato temporale

Ogni elemento viene classificato secondo uno stato.

Ad esempio:

●	programmato;

●	imminente;

●	attivo;

●	aggiornato;

●	concluso;

●	storico.

Lo stato viene determinato automaticamente sulla base dei metadati.

\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_

47.4 Relazioni temporali

Gli elementi della piattaforma non vengono analizzati singolarmente.

Ogni evento temporale viene collegato agli altri.

Esempio.

Una nuova Ordinanza può determinare:

●	apertura GPS;

●	aggiornamento punteggi;

●	nuovi interpelli;

●	future nomine.

L’ecosistema conosce queste relazioni.

\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_

47.5 Evoluzione automatica

Quando cambia il tempo, cambiano automaticamente anche gli stati.

Non è necessario intervenire manualmente.

Un interpello aperto diventa chiuso.

Una scadenza diventa trascorsa.

Una procedura diventa conclusa.

La logica rimane coerente.

\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_

47.6 Effetti sull’ecosistema

Il Motore Temporale non modifica i contenuti.

Modifica esclusivamente:

●	la priorità;

●	la visibilità;

●	i suggerimenti;

●	il percorso dell’utente.

La conoscenza rimane invariata.

\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_

47.7 Gestione dello storico

Quando un elemento termina il proprio ciclo di vita non viene eliminato.

Diventa parte dello storico.

Lo storico continua ad alimentare:

●	il Consulente;

●	la ricerca;

●	gli studi statistici;

●	l’Osservatorio Nazionale delle Nomine.

\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_

47.8 Coerenza

Ogni prodotto utilizza lo stesso Motore Temporale.

Normativa.

Interpelli.

Nomine.

Hub Eventi.

Consulente.

Ricerca.

Non esistono calendari separati.

Esiste una sola linea temporale condivisa.

\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_

47.9 Scalabilità

L’introduzione di nuovi prodotti non richiede nuovi sistemi temporali.

Ogni nuovo elemento eredita automaticamente il comportamento del Motore Temporale.

Questo mantiene uniforme l’intero ecosistema.

\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_

47.10 Obiettivo finale

Il tempo diventa una proprietà condivisa della conoscenza.

La piattaforma non si limita a conservare informazioni.

Ne comprende l’evoluzione.

\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_

Conclusione del Capitolo 47

Con questo capitolo viene introdotto il Motore Temporale dell’Ecosistema.

Ogni elemento della piattaforma acquisisce un ciclo di vita gestito in modo uniforme. Ciò permette di aggiornare automaticamente priorità, percorsi e visibilità senza alterare il contenuto informativo, mantenendo l’intero ecosistema coerente e sincronizzato.

SPORTELLOSCUOLA 2.0

ENTERPRISE MASTER ARCHITECTURE (EMA)

PARTE IV

ARCHITETTURA DELL’ECOSISTEMA

CAPITOLO 48

IL MOTORE DELLE AZIONI

Ogni informazione deve generare un’azione utile

\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_

48.1 Visione

L’obiettivo della piattaforma non è trasmettere informazioni.

L’obiettivo è aiutare l’utente a compiere correttamente il passo successivo.

Ogni contenuto deve quindi essere accompagnato dalle azioni realmente disponibili in quel momento.

La piattaforma non sostituisce l’utente nelle decisioni.

Lo guida.

\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_

48.2 Principio fondamentale

Ogni elemento dell’ecosistema deve rispondere automaticamente a una domanda:

“Cosa può fare adesso l’utente?”

La risposta dipende esclusivamente dal contesto.

Mai da logiche commerciali o promozionali.

\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_

48.3 Le azioni non sono pulsanti

Un errore comune consiste nel confondere le azioni con i pulsanti dell’interfaccia.

Nel nostro modello un’azione rappresenta un obiettivo operativo.

Ad esempio:

●	verificare il proprio punteggio;

●	consultare un interpello;

●	leggere una norma collegata;

●	monitorare una nomina;

●	salvare un documento;

●	confrontare due procedure;

●	chiedere chiarimenti al Consulente.

L’interfaccia rappresenta semplicemente il modo in cui queste azioni vengono eseguite.

\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_

48.4 Azioni contestuali

Le azioni disponibili cambiano in funzione del contenuto consultato.

Esempio.

L’utente legge una nuova Ordinanza Ministeriale.

Le azioni possono essere:

●	consultare la sintesi operativa;

●	verificare le modifiche rispetto alla versione precedente;

●	controllare il proprio punteggio;

●	visualizzare le scadenze collegate;

●	aprire gli interpelli interessati;

●	monitorare le future nomine.

Non vengono proposte azioni estranee.

\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_

48.5 Azioni progressive

L’ecosistema deve evitare di proporre tutto contemporaneamente.

Ogni azione viene proposta nel momento più opportuno.

Prima comprendere.

Poi verificare.

Poi agire.

Infine monitorare.

Questo riduce il sovraccarico cognitivo.

\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_

48.6 Azioni condivise

Le stesse azioni possono essere richiamate da prodotti differenti.

Ad esempio.

“Verifica il tuo punteggio”

può essere proposta da:

●	Hub Eventi;

●	Normativa;

●	Consulente Intelligente;

●	Ricerca Universale;

●	Home Page.

L’azione è una sola.

Cambiano i punti di accesso.

\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_

48.7 Azioni verificabili

Ogni azione deve produrre un risultato verificabile.

La piattaforma evita azioni che:

●	non portano valore;

●	duplicano operazioni;

●	interrompono inutilmente il percorso.

Ogni passaggio deve avvicinare l’utente al proprio obiettivo.

\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_

48.8 Evoluzione

L’aggiunta di nuovi prodotti non comporta la creazione di nuove logiche.

Le nuove funzionalità riutilizzano il Motore delle Azioni già esistente.

Questo mantiene uniforme il comportamento dell’intero ecosistema.

\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_

48.9 Indicatori di qualità

Il Motore delle Azioni viene considerato efficace quando:

●	diminuisce il numero di ricerche ripetute;

●	riduce il numero di click senza obiettivo;

●	aumenta il completamento dei percorsi;

●	migliora la scoperta naturale delle funzionalità;

●	rende intuitivo l’utilizzo della piattaforma anche ai nuovi utenti.

\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_

48.10 Obiettivo finale

Ogni contenuto dell’ecosistema deve rappresentare non soltanto una fonte di informazione, ma anche un punto di partenza verso un’azione concreta, pertinente e utile.

\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_

Conclusione del Capitolo 48

Con questo capitolo viene definito il Motore delle Azioni, componente trasversale che collega la conoscenza ai comportamenti dell’utente.

Grazie a questo modello, SportelloScuola 2.0 supera la logica del portale informativo e si configura come un ecosistema orientato al completamento delle attività, nel quale ogni informazione genera un percorso operativo coerente.

SPORTELLOSCUOLA 2.0

ENTERPRISE MASTER ARCHITECTURE (EMA)

PARTE IV

ARCHITETTURA DELL’ECOSISTEMA

CAPITOLO 49

SISTEMA DI MISURAZIONE E MIGLIORAMENTO CONTINUO

La piattaforma evolve attraverso evidenze, non intuizioni

\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_

49.1 Visione

Ogni componente dell’ecosistema deve poter essere valutato attraverso indicatori oggettivi.

Le evoluzioni della piattaforma non devono dipendere da impressioni personali, richieste isolate o mode tecnologiche.

Ogni modifica deve essere giustificata da dati osservabili e coerenti con la missione di SportelloScuola 2.0.

\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_

49.2 Principio fondamentale

Il sistema misura il successo dell’utente.

Non il successo della piattaforma.

La domanda principale non è:

“Quante persone hanno visitato questa pagina?”

La domanda corretta è:

“Quante persone hanno raggiunto il proprio obiettivo grazie a questa pagina?”

Questa differenza cambia completamente il modo di progettare.

\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_

49.3 Indicatori strategici

L’ecosistema utilizza un insieme limitato ma significativo di indicatori.

Essi devono rappresentare l’efficacia reale della piattaforma.

Tra questi:

●	Tasso di risoluzione dei percorsi;

●	Tempo medio per raggiungere l’obiettivo;

●	Numero medio di passaggi necessari;

●	Percentuale di utilizzo della Ricerca Universale;

●	Percentuale di utilizzo del Consulente Intelligente;

●	Percentuale di consultazione di documenti ufficiali;

●	Percentuale di completamento delle procedure suggerite.

Non vengono privilegiati indicatori di semplice traffico.

\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_

49.4 Qualità della conoscenza

La piattaforma misura costantemente:

●	completezza della Knowledge Graph;

●	copertura normativa;

●	aggiornamento delle fonti;

●	presenza di collegamenti mancanti;

●	eventuali duplicazioni informative.

La qualità della conoscenza è il primo patrimonio della piattaforma.

\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_

49.5 Qualità dei percorsi

Ogni percorso viene analizzato.

Si verificano:

●	interruzioni frequenti;

●	ritorni inutili alla Home;

●	ricerche ripetute;

●	cambi continui di sezione;

●	consultazioni prive di esito.

Quando un percorso presenta criticità, viene riprogettato.

\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_

49.6 Qualità delle decisioni

Il Motore Decisionale viene verificato attraverso indicatori come:

●	pertinenza dei suggerimenti;

●	utilizzo effettivo delle azioni proposte;

●	frequenza di ignoranza dei suggerimenti;

●	equilibrio tra semplicità e completezza.

L’obiettivo è migliorare progressivamente la qualità dell’accompagnamento.

\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_

49.7 Evoluzione controllata

Ogni nuova funzionalità proposta deve essere validata.

Prima della pubblicazione vengono valutati:

●	impatto sull’ecosistema;

●	sostenibilità tecnica;

●	sostenibilità redazionale;

●	impatto sul costo cognitivo;

●	compatibilità con la Knowledge Graph;

●	compatibilità con il Motore Decisionale;

●	compatibilità con il Motore delle Azioni.

Solo dopo questa verifica può essere integrata.

\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_

49.8 Ciclo di miglioramento

Il miglioramento segue un processo continuo:

1\.	osservazione;

2\.	raccolta dati;

3\.	analisi;

4\.	progettazione;

5\.	implementazione;

6\.	validazione;

7\.	monitoraggio.

Questo ciclo accompagna tutta la vita della piattaforma.

\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_

49.9 Indicatori da evitare

L’ecosistema non deve ottimizzare le proprie decisioni sulla base di metriche che possono essere fuorvianti.

Ad esempio:

●	numero assoluto di click;

●	tempo di permanenza;

●	numero di pagine visitate;

●	frequenza di ritorno.

Questi indicatori vengono considerati solo se interpretati insieme agli obiettivi realmente raggiunti.

\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_

49.10 Obiettivo finale

SportelloScuola 2.0 deve evolvere attraverso un processo di miglioramento continuo, fondato su evidenze oggettive e orientato esclusivamente ad aumentare la capacità degli utenti di risolvere i propri problemi in modo semplice, rapido e affidabile.

\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_

Conclusione del Capitolo 49

Con questo capitolo viene definito il Sistema di Misurazione e Miglioramento Continuo.

L’ecosistema acquisisce la capacità di valutare il proprio funzionamento sulla base del valore generato per gli utenti, trasformando il miglioramento in un processo permanente, strutturato e coerente con l’architettura generale.

SPORTELLOSCUOLA 2.0

ENTERPRISE MASTER ARCHITECTURE (EMA)

PARTE IV

ARCHITETTURA DELL’ECOSISTEMA

CAPITOLO 50

IL PRINCIPIO DELL’HUB UNICO

L’ecosistema come punto di accesso nazionale al sistema scolastico

\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_

50.1 Visione

La missione originaria di SportelloScuola 2.0 è affrontare uno dei problemi più rilevanti del sistema scolastico italiano: la frammentazione delle informazioni.

L’utente, oggi, è costretto a consultare numerose fonti per ottenere una visione completa di una procedura amministrativa o di un’opportunità professionale.

L’obiettivo della piattaforma non è sostituire tali fonti, ma integrarle in un ecosistema coerente che renda più semplice il reperimento, la comprensione e l’utilizzo delle informazioni.

\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_

50.2 Principio fondamentale

SportelloScuola 2.0 deve costituire il punto di ingresso privilegiato per ogni attività informativa relativa al personale della scuola.

La piattaforma:

●	raccoglie;

●	organizza;

●	collega;

●	contestualizza;

●	rende consultabili

le informazioni provenienti dalle fonti ufficiali.

L’utente non è costretto a conoscere in anticipo quale ente abbia pubblicato un determinato contenuto.

\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_

50.3 Centralizzazione logica

La piattaforma realizza una centralizzazione logica, non amministrativa.

Le informazioni rimangono di proprietà degli enti che le producono.

SportelloScuola 2.0 ne organizza la consultazione attraverso la Knowledge Graph, il Motore Decisionale e la Ricerca Universale.

Questo principio preserva l’autorevolezza delle fonti e, al tempo stesso, riduce la complessità per l’utente.

\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_

50.4 Unificazione dei percorsi

Ogni procedura scolastica viene ricondotta a un percorso unico.

Ad esempio, un utente interessato all’aggiornamento delle GPS non dovrà ricercare separatamente:

●	la normativa;

●	le scadenze;

●	le FAQ;

●	gli interpelli;

●	le future nomine;

●	il calcolo del punteggio.

L’ecosistema costruisce automaticamente un percorso coerente che collega questi elementi.

\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_

50.5 Integrazione delle fonti

L’integrazione delle fonti avviene secondo criteri rigorosi.

Ogni contenuto deve essere:

●	identificabile;

●	verificabile;

●	aggiornabile;

●	classificato;

●	collegato agli altri elementi della piattaforma.

La semplice aggregazione di collegamenti non è sufficiente.

\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_

50.6 Neutralità dell’Hub

L’Hub non altera mai il contenuto delle fonti ufficiali.

Il suo valore consiste nel:

●	facilitarne la consultazione;

●	spiegarne il contesto;

●	evidenziarne le relazioni;

●	accompagnare l’utente verso l’azione successiva.

Questa distinzione tutela l’affidabilità dell’ecosistema.

\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_

50.7 Continuità operativa

L’Hub deve garantire continuità anche quando una fonte esterna modifica la propria struttura tecnica.

Per questo motivo, ogni collegamento con una fonte ufficiale deve essere gestito attraverso un sistema di monitoraggio e validazione automatica, già previsto nei principi di resilienza dell’architettura.

In caso di indisisponibilità temporanea di una fonte:

●	il sistema mantiene disponibili i metadati già validati;

●	informa l’utente dello stato della fonte;

●	ripristina automaticamente il collegamento quando la risorsa torna disponibile.

L’obiettivo è evitare interruzioni dell’esperienza utente senza sostituire il contenuto ufficiale.

\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_

50.8 Coerenza con i prodotti

L’Hub non rappresenta un nuovo prodotto.

È il principio architetturale che consente ai prodotti esistenti di operare come un unico ecosistema.

Normativa \& Documenti.

Hub Eventi.

Interpelli.

Osservatorio Nazionale delle Nomine.

Consulente Intelligente.

Ricerca Universale.

Calcolo Punteggio.

Servizi.

Tutti continuano a mantenere la propria autonomia funzionale.

L’Hub ne coordina il comportamento.

\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_

50.9 Scalabilità

L’architettura dell’Hub deve consentire l’integrazione futura di nuovi domini del sistema scolastico senza modificare i principi fondamentali dell’ecosistema.

Ogni nuovo dominio dovrà:

●	utilizzare la Knowledge Graph;

●	adottare il modello dei metadati;

●	rispettare il Motore Decisionale;

●	integrarsi nel Motore Temporale;

●	partecipare al Motore delle Azioni.

Questo garantisce una crescita ordinata della piattaforma.

\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_

50.10 Obiettivo finale

SportelloScuola 2.0 deve essere riconosciuto come il punto di accesso unitario al sistema informativo della scuola italiana.

Non perché sostituisce le istituzioni.

Ma perché rende semplice, coerente e verificabile la consultazione del loro patrimonio informativo.

\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_

Conclusione del Capitolo 50

Con questo capitolo viene formalizzato il Principio dell’Hub Unico.

Esso rappresenta la sintesi operativa di tutte le parti precedenti dell’Enterprise Master Architecture. L’ecosistema non si limita a offrire servizi distinti, ma organizza l’intero patrimonio informativo della scuola italiana in un sistema coerente, resiliente e orientato ai bisogni concreti degli utenti.

SPORTELLOSCUOLA 2.0

ENTERPRISE MASTER ARCHITECTURE (EMA)

PARTE V

GOVERNANCE DELL’ECOSISTEMA

CAPITOLO 51

IL FRAMEWORK DI GOVERNANCE

Le regole che permettono alla piattaforma di crescere senza perdere qualità

\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_

51.1 Visione

La crescita di SportelloScuola 2.0 non deve dipendere dalle persone che sviluppano la piattaforma.

Deve dipendere dalle regole dell’architettura.

Ogni nuova funzione, prodotto o evoluzione deve rispettare principi condivisi e verificabili.

In questo modo la qualità dell’ecosistema rimane costante anche nel lungo periodo.

\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_

51.2 Obiettivo

Il Framework di Governance definisce i criteri con cui l’ecosistema viene progettato, evoluto e mantenuto.

Esso garantisce che ogni modifica sia coerente con:

●	la missione della piattaforma;

●	l’architettura generale;

●	il patrimonio informativo condiviso;

●	l’esperienza utente.

\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_

51.3 Principio della coerenza architetturale

Ogni componente introdotto nella piattaforma deve utilizzare i modelli già definiti.

In particolare:

●	la Knowledge Graph;

●	il modello unico dei metadati;

●	il Motore Decisionale;

●	il Motore Temporale;

●	il Motore delle Azioni;

●	la Ricerca Universale;

●	il Profilo Operativo.

Non sono ammesse eccezioni.

Questo evita la nascita di sottosistemi indipendenti.

\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_

51.4 Principio della singola responsabilità

Ogni prodotto dell’ecosistema deve avere uno scopo chiaramente definito.

Ad esempio:

●	Normativa \& Documenti gestisce il patrimonio documentale.

●	Hub Eventi organizza gli eventi amministrativi.

●	Interpelli raccoglie e struttura gli interpelli.

●	Osservatorio Nazionale delle Nomine monitora gli esiti delle procedure.

●	Calcolo Punteggio esegue esclusivamente il calcolo.

●	Consulente Intelligente interpreta e collega la conoscenza.

Nessun prodotto deve svolgere funzioni appartenenti ad altri.

\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_

51.5 Principio della fonte unica

Ogni informazione deve possedere un’unica rappresentazione ufficiale.

Se un documento viene modificato:

la modifica avviene una sola volta.

Tutti gli altri prodotti ricevono automaticamente l’aggiornamento.

Questo elimina incoerenze e duplicazioni.

\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_

51.6 Principio della crescita controllata

Ogni nuova proposta di sviluppo deve rispondere a cinque domande.

1

Risolve realmente un problema del personale scolastico?

\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_

2

È già risolvibile utilizzando componenti esistenti?

\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_

3

Riduce la frammentazione?

\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_

4

Riduce il costo cognitivo?

\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_

5

Può essere mantenuta nel tempo senza aumentare in modo significativo il carico operativo?

Solo se tutte le risposte sono positive la proposta può essere presa in considerazione.

\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_

51.7 Principio della reversibilità

Ogni evoluzione deve poter essere rimossa senza compromettere l’intero ecosistema.

Le nuove funzionalità devono essere modulari.

La loro eventuale eliminazione non deve produrre effetti collaterali sui prodotti già esistenti.

\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_

51.8 Principio della verificabilità

Ogni decisione progettuale deve poter essere motivata.

La piattaforma deve essere in grado di spiegare:

●	perché un contenuto viene mostrato;

●	perché un suggerimento viene proposto;

●	perché un percorso viene costruito in un determinato modo.

La trasparenza aumenta la fiducia dell’utente.

\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_

51.9 Evoluzione della governance

Il Framework di Governance non è statico.

Può evolvere.

Ogni modifica, tuttavia, deve rispettare i principi fondanti dell’Enterprise Master Architecture.

L’evoluzione non deve mai compromettere la coerenza costruita.

\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_

51.10 Obiettivo finale

La Governance deve garantire che SportelloScuola 2.0 possa crescere per molti anni mantenendo un’architettura semplice, coerente, verificabile e orientata ai bisogni reali del personale della scuola.

\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_

Conclusione del Capitolo 51

Con questo capitolo viene definito il Framework di Governance dell’ecosistema.

Esso rappresenta il livello di controllo che assicura la qualità dell’architettura nel tempo, impedendo la proliferazione di componenti ridondanti, la duplicazione delle informazioni e l’aumento della complessità.

SPORTELLOSCUOLA 2.0

ENTERPRISE MASTER ARCHITECTURE (EMA)

PARTE V

GOVERNANCE DELL’ECOSISTEMA

CAPITOLO 52

IL MODELLO DI EVOLUZIONE DELL’ECOSISTEMA

Crescere senza aumentare la complessità

\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_

52.1 Visione

L’architettura di SportelloScuola 2.0 deve essere progettata affinché la crescita rappresenti un miglioramento e non un aumento della complessità.

Ogni evoluzione deve rafforzare l’ecosistema esistente, evitando la creazione di componenti isolati, ridondanti o difficili da mantenere.

L’obiettivo è garantire continuità, stabilità e qualità anche nel lungo periodo.

\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_

52.2 Principio fondamentale

Ogni evoluzione deve essere considerata un’estensione dell’ecosistema, mai una deviazione.

Un nuovo componente entra a far parte della piattaforma solo se utilizza:

●	il patrimonio informativo condiviso;

●	la Knowledge Graph;

●	il modello unico dei metadati;

●	il Motore Decisionale;

●	il Motore Temporale;

●	il Motore delle Azioni;

●	la Ricerca Universale.

Non vengono introdotte architetture parallele.

\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_

52.3 Evoluzione incrementale

La piattaforma evolve attraverso piccoli incrementi indipendenti.

Ogni incremento deve essere:

●	autonomo;

●	verificabile;

●	reversibile;

●	compatibile con quanto già esiste.

Questa metodologia riduce il rischio operativo e facilita la manutenzione.

\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_

52.4 Compatibilità retroattiva

Ogni evoluzione deve preservare il corretto funzionamento dei prodotti già esistenti.

Nessuna nuova funzione può:

●	modificare il comportamento consolidato di un altro prodotto;

●	alterare il significato dei dati;

●	introdurre incoerenze nella Knowledge Graph.

La retrocompatibilità è un requisito architetturale.

\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_

52.5 Gestione della complessità

La complessità dell’ecosistema deve crescere più lentamente rispetto alle funzionalità offerte.

Questo principio viene perseguito attraverso:

●	riutilizzo dei componenti esistenti;

●	eliminazione delle duplicazioni;

●	centralizzazione delle logiche comuni;

●	standardizzazione dei processi.

L’obiettivo è ottenere il massimo valore con il minimo numero di componenti.

\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_

52.6 Criteri di ammissione

Ogni nuova proposta viene valutata secondo una matrice decisionale.

La proposta deve dimostrare:

●	valore concreto per il personale scolastico;

●	integrazione naturale nell’ecosistema;

●	sostenibilità tecnica;

●	sostenibilità redazionale;

●	sostenibilità economica;

●	compatibilità con i principi dell’EMA.

L’assenza anche di uno solo di questi requisiti comporta il rinvio o la revisione della proposta.

\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_

52.7 Evoluzione delle fonti

L’ecosistema deve poter integrare nuove fonti ufficiali senza modificare la propria architettura.

Ogni nuova fonte viene:

●	classificata;

●	normalizzata;

●	validata;

●	collegata alla Knowledge Graph;

●	resa disponibile ai prodotti interessati.

L’integrazione segue un processo uniforme.

\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_

52.8 Evoluzione dei prodotti

I prodotti esistenti possono evolvere.

Tuttavia ogni evoluzione deve rispettare il principio della singola responsabilità.

Un prodotto può diventare più efficace.

Non può cambiare natura.

Ad esempio:

Il Calcolo Punteggio può migliorare gli algoritmi di valutazione.

Non deve trasformarsi in una sezione normativa.

L’Osservatorio Nazionale delle Nomine può ampliare la copertura territoriale.

Non deve diventare un motore di ricerca generale.

Questa distinzione preserva la chiarezza dell’ecosistema.

\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_

52.9 Evoluzione dell’esperienza utente

L’evoluzione della piattaforma deve essere quasi invisibile.

Le migliorie devono:

●	ridurre il numero di operazioni;

●	migliorare la chiarezza;

●	aumentare l’affidabilità;

●	mantenere stabile il modello mentale dell’utente.

L’utente non deve “reimparare” la piattaforma dopo ogni aggiornamento.

\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_

52.10 Obiettivo finale

SportelloScuola 2.0 deve poter crescere per molti anni mantenendo gli stessi principi architetturali, garantendo continuità, semplicità e affidabilità indipendentemente dal numero di prodotti, utenti o fonti integrate.

\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_

Conclusione del Capitolo 52

Con questo capitolo viene definito il Modello di Evoluzione dell’Ecosistema.

La crescita della piattaforma viene disciplinata attraverso regole di integrazione, retrocompatibilità e sostenibilità che impediscono l’aumento incontrollato della complessità e preservano la coerenza dell’Enterprise Master Architecture.

SPORTELLOSCUOLA 2.0

ENTERPRISE MASTER ARCHITECTURE (EMA)

PARTE V

GOVERNANCE DELL’ECOSISTEMA

CAPITOLO 53

LA CONFORMITÀ ARCHITETTURALE

Garantire che ogni evoluzione rispetti l’Enterprise Master Architecture

\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_

53.1 Visione

L’Enterprise Master Architecture non rappresenta soltanto un documento di progettazione.

Essa costituisce il riferimento permanente per ogni decisione evolutiva della piattaforma.

Ogni intervento deve essere verificato rispetto ai principi definiti nelle Parti I, II, III, IV e V.

La conformità architetturale garantisce continuità e qualità nel tempo.

\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_

53.2 Obiettivo

Assicurare che ogni modifica dell’ecosistema sia coerente con l’architettura complessiva.

La conformità non ha lo scopo di rallentare lo sviluppo.

Ha lo scopo di evitare incoerenze che, nel lungo periodo, comprometterebbero la qualità della piattaforma.

\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_

53.3 Ambito di applicazione

La verifica di conformità riguarda ogni intervento che modifica:

●	i dati;

●	i prodotti;

●	i servizi;

●	i percorsi utente;

●	le relazioni della Knowledge Graph;

●	i motori trasversali dell’ecosistema;

●	le integrazioni con fonti esterne.

Nessun componente è escluso.

\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_

53.4 Criteri di conformità

Ogni proposta deve dimostrare la propria coerenza rispetto a sette criteri.

1\.	Coerenza con la missione.

2\.	Coerenza con il modello informativo.

3\.	Coerenza con la Knowledge Graph.

4\.	Coerenza con l’esperienza utente.

5\.	Coerenza con la governance.

6\.	Sostenibilità operativa.

7\.	Assenza di duplicazioni.

L’insieme di questi criteri costituisce la base della valutazione architetturale.

\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_

53.5 Gestione delle eccezioni

Possono verificarsi situazioni straordinarie che richiedono soluzioni temporanee.

In tali casi l’eccezione deve essere:

●	motivata;

●	documentata;

●	limitata nel tempo;

●	accompagnata da un piano di riallineamento.

Le eccezioni non possono diventare la regola.

\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_

53.6 Verifica preventiva

La conformità viene verificata prima dell’introduzione di una modifica.

Questo approccio riduce il rischio di interventi correttivi successivi e preserva la stabilità dell’ecosistema.

La prevenzione è preferibile alla correzione.

\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_

53.7 Riesame periodico

La conformità non è una verifica svolta una sola volta.

Con cadenza periodica vengono riesaminati:

●	i prodotti;

●	i processi;

●	le integrazioni;

●	i modelli informativi;

●	le relazioni della Knowledge Graph.

L’obiettivo è individuare tempestivamente eventuali disallineamenti.

\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_

53.8 Documentazione

Ogni decisione architetturale significativa deve essere tracciabile.

La documentazione deve consentire di comprendere:

●	il problema affrontato;

●	le alternative considerate;

●	la soluzione adottata;

●	le motivazioni della scelta.

Questo favorisce continuità anche in caso di cambiamento del team di sviluppo.

\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_

53.9 Benefici

L’adozione della conformità architetturale consente di:

●	preservare la coerenza dell’ecosistema;

●	facilitare l’evoluzione controllata;

●	ridurre il debito tecnico;

●	migliorare la qualità delle decisioni progettuali;

●	aumentare la fiducia degli utenti e dei futuri partner istituzionali.

\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_

53.10 Obiettivo finale

Ogni evoluzione di SportelloScuola 2.0 deve poter essere ricondotta ai principi fondanti dell’Enterprise Master Architecture, assicurando continuità, qualità e sostenibilità nel tempo.

\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_

Conclusione del Capitolo 53

Con questo capitolo viene introdotto il principio della Conformità Architetturale.

L’Enterprise Master Architecture assume un ruolo operativo permanente: non è soltanto il documento che descrive la piattaforma, ma il criterio con cui vengono valutate tutte le evoluzioni future.

SPORTELLOSCUOLA 2.0

ENTERPRISE MASTER ARCHITECTURE (EMA)

PARTE V

GOVERNANCE DELL’ECOSISTEMA

CAPITOLO 54

IL MODELLO DECISIONALE DELL’ECOSISTEMA

Classificare le decisioni per preservare la coerenza architetturale

\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_

54.1 Visione

Non tutte le decisioni hanno lo stesso impatto.

Una correzione redazionale e una modifica alla Knowledge Graph non possono essere gestite allo stesso modo.

L’ecosistema deve quindi distinguere chiaramente il livello di ogni decisione.

Questa classificazione permette di mantenere stabile l’architettura anche durante la crescita della piattaforma.

\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_

54.2 Obiettivo

Definire un modello uniforme per classificare ogni decisione in funzione del proprio impatto sull’ecosistema.

In questo modo ogni evoluzione riceve il livello di valutazione adeguato.

\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_

54.3 Livello Strategico

Appartengono al livello strategico le decisioni che modificano:

●	la missione della piattaforma;

●	i principi fondanti;

●	gli obiettivi generali;

●	l’Enterprise Master Architecture nel suo impianto complessivo.

Queste decisioni sono eccezionali e devono essere attentamente motivate.

\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_

54.4 Livello Architetturale

Rientrano nel livello architetturale le decisioni che incidono sui componenti condivisi dell’ecosistema.

Ad esempio:

●	evoluzione della Knowledge Graph;

●	modifica del modello dei metadati;

●	aggiornamento del Motore Decisionale;

●	evoluzione della Ricerca Universale;

●	modifica del Motore Temporale;

●	revisione del Motore delle Azioni.

Ogni intervento deve essere valutato per il suo impatto trasversale.

\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_

54.5 Livello Funzionale

Il livello funzionale riguarda l’evoluzione dei prodotti esistenti.

Ad esempio:

●	miglioramento del Calcolo Punteggio;

●	ampliamento dell’Osservatorio Nazionale delle Nomine;

●	nuove viste della Normativa;

●	nuovi percorsi dell’Hub Eventi.

Le modifiche devono rispettare la singola responsabilità di ciascun prodotto.

\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_

54.6 Livello Operativo

Il livello operativo comprende le attività quotidiane della piattaforma.

Tra queste:

●	aggiornamento dei contenuti;

●	pubblicazione di nuovi documenti;

●	integrazione di nuove fonti già previste;

●	correzioni redazionali;

●	manutenzione ordinaria.

Queste attività non modificano l’architettura.

Garantiscono il corretto funzionamento dell’ecosistema.

\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_

54.7 Relazione tra i livelli

Ogni livello può influenzare quelli inferiori.

Il contrario non deve avvenire.

Una decisione operativa non può modificare principi architetturali.

Una decisione funzionale non può cambiare la missione della piattaforma.

Questa gerarchia protegge la stabilità dell’intero sistema.

\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_

54.8 Tracciabilità

Ogni decisione significativa deve essere registrata indicando:

●	il livello di appartenenza;

●	la motivazione;

●	i componenti coinvolti;

●	gli effetti previsti;

●	gli eventuali rischi.

La tracciabilità facilita la manutenzione e la trasparenza.

\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_

54.9 Benefici

Il modello decisionale consente di:

●	evitare modifiche non controllate;

●	ridurre il rischio di incoerenze;

●	facilitare la pianificazione evolutiva;

●	migliorare il coordinamento tra sviluppo, contenuti e governance;

●	preservare la qualità dell’Enterprise Master Architecture.

\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_

54.10 Obiettivo finale

Ogni decisione relativa a SportelloScuola 2.0 deve essere classificata in base al proprio impatto, così da garantire che l’evoluzione della piattaforma avvenga in modo ordinato, trasparente e coerente con i principi definiti nell’Enterprise Master Architecture.

\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_

Conclusione del Capitolo 54

Con questo capitolo viene definito il Modello Decisionale dell’Ecosistema.

La classificazione delle decisioni permette di distinguere gli interventi strategici da quelli architetturali, funzionali e operativi, assicurando che ogni evoluzione sia valutata con il livello di attenzione proporzionato al suo impatto.

SPORTELLOSCUOLA 2.0

ENTERPRISE MASTER ARCHITECTURE (EMA)

PARTE VI

BLUEPRINT DELL’IMPLEMENTAZIONE

CAPITOLO 55

IL BLUEPRINT DELL’ECOSISTEMA

Dall’architettura concettuale all’architettura realizzabile

\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_

55.1 Visione

L’Enterprise Master Architecture descrive l’ecosistema dal punto di vista concettuale.

Per trasformare tale visione in una piattaforma concreta è necessario definire un Blueprint di Implementazione.

Il Blueprint non descrive il software.

Descrive la struttura con cui i principi dell’EMA vengono tradotti in componenti implementabili.

\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_

55.2 Obiettivo

Il Blueprint ha lo scopo di trasformare i principi architetturali in blocchi funzionali chiaramente identificabili.

Ogni blocco deve:

●	avere una responsabilità precisa;

●	collaborare con gli altri;

●	poter evolvere senza compromettere l’ecosistema.

\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_

55.3 Principio fondamentale

L’implementazione deve riflettere fedelmente l’architettura.

Non devono esistere componenti software che non trovino corrispondenza nei principi definiti nelle Parti I-V.

Allo stesso modo, ogni principio architetturale deve essere riconoscibile nell’implementazione.

Si realizza così la tracciabilità completa tra progettazione e realizzazione.

\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_

55.4 I macro-blocchi dell’ecosistema

L’intera piattaforma può essere rappresentata attraverso pochi macro-componenti.

Essi sono:

●	Canali di accesso.

●	Servizi applicativi.

●	Motori trasversali.

●	Patrimonio informativo.

●	Fonti esterne.

●	Servizi infrastrutturali.

Questa suddivisione rimane valida indipendentemente dalle tecnologie adottate.

\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_

55.5 Separazione delle responsabilità

Ogni macro-blocco svolge esclusivamente il proprio compito.

Ad esempio:

I canali di accesso presentano le informazioni.

I servizi applicativi gestiscono i prodotti.

I motori trasversali applicano le logiche comuni.

Il patrimonio informativo conserva e organizza la conoscenza.

Le fonti esterne alimentano il sistema.

L’infrastruttura garantisce affidabilità e continuità.

La separazione delle responsabilità riduce la complessità e facilita l’evoluzione.

\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_

55.6 Collaborazione tra i blocchi

I blocchi non operano in modo indipendente.

Ogni richiesta attraversa l’ecosistema secondo un flusso ordinato.

Le informazioni vengono recuperate dal patrimonio informativo.

I motori trasversali applicano le logiche dell’EMA.

I servizi applicativi costruiscono la risposta.

I canali di accesso la presentano all’utente.

Ogni componente contribuisce al risultato finale senza sovrapporsi agli altri.

\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_

55.7 Modularità

Ogni macro-blocco può evolvere mantenendo stabile il resto dell’ecosistema.

Questo principio consente:

●	manutenzione semplificata;

●	evoluzione progressiva;

●	sostituzione controllata dei componenti;

●	riduzione del rischio progettuale.

\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_

55.8 Tracciabilità

Ogni componente implementato deve poter essere ricondotto a:

●	un principio dell’EMA;

●	un prodotto dell’ecosistema;

●	una responsabilità definita.

Questo garantisce coerenza tra progettazione e sviluppo.

\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_

55.9 Indipendenza tecnologica

Il Blueprint non impone linguaggi di programmazione, framework o piattaforme.

Le tecnologie rappresentano strumenti di implementazione.

L’architettura rappresenta invece una scelta strutturale destinata a durare nel tempo.

Questa distinzione consente all’ecosistema di evolvere senza essere vincolato alle tecnologie del momento.

\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_

55.10 Obiettivo finale

Il Blueprint costituisce il ponte tra la progettazione concettuale e la realizzazione della piattaforma, assicurando che ogni scelta tecnica futura rimanga coerente con i principi dell’Enterprise Master Architecture.

\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_

Conclusione del Capitolo 55

Con questo capitolo si apre la fase di realizzazione dell’Enterprise Master Architecture.

L’architettura viene tradotta in una struttura implementabile, mantenendo la completa tracciabilità con i principi definiti nelle parti precedenti e preservando l’indipendenza dalle tecnologie.

SPORTELLOSCUOLA 2.0

ENTERPRISE MASTER ARCHITECTURE (EMA)

PARTE VI

BLUEPRINT DELL’IMPLEMENTAZIONE

CAPITOLO 56

L’ARCHITETTURA DEI CANALI DI ACCESSO

Un ecosistema, molteplici punti di ingresso

\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_

56.1 Visione

I canali di accesso rappresentano il punto di contatto tra l’utente e l’ecosistema.

Essi non contengono la logica della piattaforma.

Hanno il solo compito di rendere disponibili i servizi e le informazioni in modo coerente, indipendentemente dal dispositivo o dalla modalità di utilizzo.

L’ecosistema rimane unico.

Cambiano soltanto le modalità di accesso.

\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_

56.2 Obiettivo

Garantire che ogni utente possa utilizzare SportelloScuola 2.0 attraverso canali differenti mantenendo la stessa esperienza informativa e operativa.

Il contenuto non cambia.

Cambia esclusivamente la modalità di presentazione.

\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_

56.3 Principio fondamentale

La logica dell’ecosistema non appartiene ai canali.

Ogni decisione viene presa dai componenti centrali già definiti nelle parti precedenti:

●	Knowledge Graph;

●	Motore Decisionale;

●	Motore Temporale;

●	Motore delle Azioni;

●	Ricerca Universale;

●	Consulente Intelligente.

I canali si limitano a rappresentarne i risultati.

\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_

56.4 Uniformità dell’esperienza

Indipendentemente dal canale utilizzato, l’utente deve ritrovare:

●	gli stessi contenuti;

●	gli stessi percorsi;

●	le stesse relazioni informative;

●	le stesse azioni disponibili.

L’uniformità rafforza il modello mentale dell’utente e riduce il tempo di apprendimento.

\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_

56.5 Indipendenza dei canali

Ogni canale può evolvere senza modificare il comportamento dell’ecosistema.

Ad esempio, un miglioramento dell’interfaccia web non richiede modifiche ai motori decisionali o alla Knowledge Graph.

Allo stesso modo, l’introduzione di un nuovo canale non comporta la duplicazione della logica applicativa.

\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_

56.6 Accessibilità

Tutti i canali devono essere progettati secondo criteri di accessibilità, usabilità e inclusività.

Questo principio è coerente con la missione di SportelloScuola 2.0 e con l’attenzione, già evidenziata nelle parti precedenti, alla riduzione del costo cognitivo.

L’accessibilità non rappresenta un requisito aggiuntivo.

È una caratteristica strutturale dell’ecosistema.

\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_

56.7 Continuità del contesto

L’utente deve poter iniziare un’attività attraverso un canale e proseguirla da un altro senza perdere il contesto operativo.

Questa continuità è resa possibile dal Profilo Operativo e dai motori trasversali dell’ecosistema.

Il canale non conserva autonomamente lo stato delle attività.

\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_

56.8 Scalabilità

L’architettura dei canali deve consentire l’introduzione di nuovi punti di accesso senza modificare i prodotti esistenti.

Ogni nuovo canale utilizza gli stessi servizi applicativi e le stesse regole dell’ecosistema.

La crescita avviene per estensione, non per duplicazione.

\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_

56.9 Relazione con gli altri blocchi

I canali di accesso costituiscono il livello più esterno del Blueprint.

Essi:

●	ricevono le richieste degli utenti;

●	le inoltrano ai servizi applicativi;

●	presentano le risposte elaborate dall’ecosistema.

Non accedono direttamente al patrimonio informativo né implementano logiche decisionali proprie.

Questa separazione mantiene l’architettura semplice e coerente.

\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_

56.10 Obiettivo finale

I canali di accesso devono garantire un’esperienza uniforme, accessibile e indipendente dal dispositivo, preservando l’unicità dell’ecosistema e demandando ogni logica ai componenti centrali dell’Enterprise Master Architecture.

\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_

Conclusione del Capitolo 56

Con questo capitolo viene definita l’Architettura dei Canali di Accesso.

Essi rappresentano il livello di interazione con l’utente, mantenendo una netta separazione tra presentazione e logica dell’ecosistema. Questa scelta consente di evolvere le modalità di accesso senza compromettere la coerenza dell’intera piattaforma.

SPORTELLOSCUOLA 2.0

ENTERPRISE MASTER ARCHITECTURE (EMA)

PARTE VI

BLUEPRINT DELL’IMPLEMENTAZIONE

CAPITOLO 57

L’ARCHITETTURA DEI SERVIZI APPLICATIVI

I prodotti come servizi dell’ecosistema

\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_

57.1 Visione

I prodotti definiti nella Parte III non rappresentano semplici sezioni del sito.

Essi costituiscono i servizi applicativi dell’ecosistema.

Ogni servizio realizza una responsabilità specifica e collabora con gli altri attraverso i principi definiti dall’Enterprise Master Architecture.

L’utente percepisce un’unica piattaforma.

L’architettura realizza una rete coordinata di servizi.

\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_

57.2 Obiettivo

Organizzare le funzionalità della piattaforma come servizi autonomi, coerenti e riutilizzabili.

Ogni servizio deve poter essere utilizzato da qualsiasi canale di accesso senza modificare il proprio comportamento.

\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_

57.3 Principio fondamentale

Ogni servizio applicativo possiede una responsabilità esclusiva.

Ad esempio:

●	Normativa \& Documenti gestisce il patrimonio documentale.

●	Hub Eventi organizza gli eventi amministrativi.

●	Interpelli raccoglie e struttura gli interpelli.

●	Osservatorio Nazionale delle Nomine analizza gli esiti delle procedure.

●	Calcolo Punteggio esegue le valutazioni.

●	Consulente Intelligente interpreta il contesto e accompagna l’utente.

Nessun servizio deve assumere responsabilità appartenenti ad altri.

\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_

57.4 Collaborazione tra servizi

I servizi non operano in isolamento.

Ogni richiesta può coinvolgere più servizi contemporaneamente.

Ad esempio, una ricerca sull’aggiornamento delle GPS può richiedere:

●	la consultazione della Normativa;

●	gli eventi correlati;

●	il Calcolo Punteggio;

●	il Consulente Intelligente;

●	il Motore delle Azioni.

La collaborazione avviene senza che l’utente percepisca la complessità interna.

\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_

57.5 Riutilizzo

Un servizio può essere utilizzato in contesti differenti.

Ad esempio, il servizio Calcolo Punteggio può essere richiamato:

●	dalla Home;

●	dall’Hub Eventi;

●	dal Consulente Intelligente;

●	dalla Ricerca Universale;

●	da future integrazioni.

Il servizio rimane unico.

Cambiano solamente i punti di accesso.

\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_

57.6 Indipendenza

Ogni servizio può evolvere mantenendo stabile il resto dell’ecosistema.

L’evoluzione di un servizio non deve richiedere modifiche agli altri, salvo nei casi in cui cambino i contratti di collaborazione definiti dall’architettura.

Questo principio riduce il rischio evolutivo.

\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_

57.7 Coordinamento

Il coordinamento tra servizi non è affidato ai canali di accesso.

Esso viene garantito dai componenti trasversali già definiti:

●	Knowledge Graph;

●	Motore Decisionale;

●	Motore Temporale;

●	Motore delle Azioni;

●	Profilo Operativo.

I servizi rimangono focalizzati sulla propria responsabilità.

\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_

57.8 Scalabilità

L’introduzione di un nuovo servizio deve seguire il modello definito nella Parte V.

Prima di creare un nuovo servizio occorre verificare che il requisito non possa essere soddisfatto attraverso l’evoluzione di un servizio esistente.

Solo quando emerge una nuova responsabilità autonoma è giustificata la nascita di un nuovo servizio applicativo.

\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_

57.9 Relazione con il patrimonio informativo

I servizi non possiedono copie autonome delle informazioni.

Essi consultano il patrimonio informativo condiviso.

Questo garantisce:

●	una sola fonte di verità;

●	assenza di duplicazioni;

●	aggiornamento uniforme;

●	piena coerenza tra tutti i prodotti.

\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_

57.10 Obiettivo finale

L’architettura dei servizi applicativi deve consentire a SportelloScuola 2.0 di offrire un ecosistema modulare, riutilizzabile e facilmente evolvibile, nel quale ogni servizio contribuisce al funzionamento complessivo senza compromettere l’autonomia degli altri.

\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_

Conclusione del Capitolo 57

Con questo capitolo viene definita l’Architettura dei Servizi Applicativi.

I prodotti progettati nella Parte III assumono il ruolo di servizi coordinati, ciascuno responsabile di uno specifico dominio funzionale e integrato nell’ecosistema attraverso i motori trasversali e il patrimonio informativo condiviso.

SPORTELLOSCUOLA 2.0

ENTERPRISE MASTER ARCHITECTURE (EMA)

PARTE VI

BLUEPRINT DELL’IMPLEMENTAZIONE

CAPITOLO 58

L’ARCHITETTURA DEI MOTORI TRASVERSALI

Il nucleo cognitivo dell’ecosistema

\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_

58.1 Visione

L’intelligenza di SportelloScuola 2.0 non risiede nei singoli prodotti.

Essa è concentrata nei Motori Trasversali.

Questi componenti non appartengono a uno specifico servizio applicativo.

Operano a beneficio dell’intero ecosistema, garantendo uniformità, coerenza e continuità.

Ogni prodotto utilizza gli stessi motori.

Ogni utente beneficia delle stesse regole decisionali.

\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_

58.2 Obiettivo

Riunire in un’unica architettura i componenti trasversali già definiti nelle parti precedenti.

L’obiettivo non è aumentarne il numero.

È coordinarne il comportamento.

I motori costituiscono il livello cognitivo dell’ecosistema.

\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_

58.3 Principio fondamentale

Ogni motore svolge una funzione specifica.

L’intelligenza complessiva nasce dalla loro collaborazione.

Nessun motore deve duplicare le responsabilità degli altri.

Questa separazione rende l’architettura stabile e facilmente evolvibile.

\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_

58.4 Il patrimonio della conoscenza

La Knowledge Graph rappresenta il fondamento cognitivo dell’ecosistema.

Essa:

●	organizza la conoscenza;

●	collega le informazioni;

●	elimina le duplicazioni;

●	costituisce l’unica fonte strutturata delle relazioni informative.

Tutti gli altri motori operano a partire da questo patrimonio condiviso.

\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_

58.5 Il contesto

Il Profilo Operativo fornisce il contesto minimo necessario.

Non modifica la conoscenza.

Consente ai motori di interpretare la situazione dell’utente.

Il contesto rimane separato dai contenuti.

\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_

58.6 La comprensione

La Ricerca Universale e il Consulente Intelligente rappresentano i principali strumenti di comprensione delle richieste.

Entrambi utilizzano:

●	la Knowledge Graph;

●	il Profilo Operativo;

●	il Motore Decisionale.

La differenza riguarda esclusivamente il punto di ingresso.

La logica cognitiva rimane condivisa.

\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_

58.7 La decisione

Il Motore Decisionale determina:

●	quali contenuti privilegiare;

●	quali relazioni valorizzare;

●	quali percorsi suggerire;

●	quali servizi coinvolgere.

Esso non produce contenuti.

Organizza il comportamento dell’ecosistema.

\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_

58.8 Il tempo

Il Motore Temporale attribuisce rilevanza temporale alla conoscenza.

Ogni informazione viene interpretata anche in funzione del proprio ciclo di vita.

Questa dimensione temporale è condivisa da tutti i servizi applicativi.

\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_

58.9 L’azione

Il Motore delle Azioni traduce la conoscenza in percorsi operativi.

Dopo che il Motore Decisionale ha individuato il contenuto più pertinente, il Motore delle Azioni suggerisce il passo successivo più utile.

In questo modo la piattaforma accompagna l’utente senza sostituirsi alle sue decisioni.

\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_

58.10 Il nucleo cognitivo

I Motori Trasversali operano come un unico sistema.

Il loro funzionamento può essere sintetizzato in una sequenza logica:

1\.	La Knowledge Graph organizza la conoscenza.

2\.	Il Profilo Operativo fornisce il contesto.

3\.	La Ricerca Universale o il Consulente comprendono la richiesta.

4\.	Il Motore Decisionale costruisce il percorso.

5\.	Il Motore Temporale ne valuta la rilevanza.

6\.	Il Motore delle Azioni propone il passo successivo.

Ogni componente mantiene la propria responsabilità.

L’insieme costituisce il nucleo cognitivo di SportelloScuola 2.0.

\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_

Conclusione del Capitolo 58

Con questo capitolo viene definita l’Architettura dei Motori Trasversali.

I componenti progettati nelle Parti II, III e IV vengono ricondotti a un unico nucleo cognitivo, condiviso da tutti i servizi applicativi. Questa scelta elimina duplicazioni, centralizza l’intelligenza dell’ecosistema e garantisce un comportamento uniforme indipendentemente dal prodotto o dal canale di accesso utilizzato.

SPORTELLOSCUOLA 2.0

ENTERPRISE MASTER ARCHITECTURE (EMA)

PARTE VI

BLUEPRINT DELL’IMPLEMENTAZIONE

CAPITOLO 59

L’ARCHITETTURA DEL PATRIMONIO INFORMATIVO

La conoscenza come risorsa condivisa dell’ecosistema

\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_

59.1 Visione

Il patrimonio informativo rappresenta il bene più importante dell’intero ecosistema.

Tutti i prodotti, i servizi applicativi e i motori trasversali operano utilizzando una base informativa comune.

Questa scelta garantisce uniformità, coerenza e continuità nella gestione della conoscenza.

\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_

59.2 Obiettivo

Organizzare il patrimonio informativo come una risorsa condivisa e indipendente dai singoli prodotti.

Le informazioni non appartengono alle applicazioni.

Sono patrimonio dell’ecosistema.

I prodotti le utilizzano secondo le proprie responsabilità funzionali.

\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_

59.3 Principio fondamentale

Ogni informazione viene acquisita, organizzata e mantenuta una sola volta.

Successivamente può essere utilizzata da qualunque componente autorizzato dell’ecosistema.

Questo principio elimina duplicazioni e garantisce che ogni prodotto operi sugli stessi dati.

\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_

59.4 Patrimonio condiviso

Il patrimonio informativo comprende tutti gli elementi già definiti nelle Parti II, III e IV.

Tra essi rientrano:

●	documenti normativi;

●	atti amministrativi;

●	eventi;

●	interpelli;

●	graduatorie e procedure monitorate;

●	relazioni della Knowledge Graph;

●	metadati;

●	contenuti redazionali;

●	conoscenza strutturata prodotta dall’ecosistema.

Ogni elemento mantiene una propria identità, pur facendo parte di un insieme unitario.

\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_

59.5 Indipendenza dai prodotti

I prodotti applicativi non gestiscono copie autonome delle informazioni.

Essi consultano il patrimonio condiviso e restituiscono all’utente una vista coerente con la propria responsabilità.

Ad esempio:

●	Normativa \& Documenti presenta il patrimonio documentale.

●	Hub Eventi evidenzia la dimensione temporale.

●	Interpelli valorizza le opportunità professionali.

●	Osservatorio Nazionale delle Nomine interpreta i dati relativi alle assegnazioni.

Il patrimonio rimane unico.

Cambiano le modalità di utilizzo.

\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_

59.6 Evoluzione del patrimonio

Il patrimonio informativo può crescere nel tempo.

Nuove tipologie di contenuto possono essere integrate senza modificare l’architettura generale.

Ogni nuova informazione viene classificata secondo il modello definito nella Parte II e resa disponibile all’intero ecosistema.

La crescita avviene per estensione del patrimonio, non per creazione di archivi separati.

\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_

59.7 Qualità del patrimonio

Il valore del patrimonio informativo dipende dalla sua qualità.

Per questo motivo ogni informazione deve essere:

●	identificabile;

●	verificabile;

●	aggiornata;

●	contestualizzata;

●	collegata alle altre informazioni.

La qualità non riguarda soltanto l’accuratezza dei dati, ma anche la qualità delle relazioni che li uniscono.

\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_

59.8 Accesso al patrimonio

L’accesso al patrimonio informativo avviene esclusivamente attraverso i servizi applicativi e i motori trasversali.

Nessun canale di accesso interagisce direttamente con il patrimonio.

Questa separazione garantisce sicurezza, coerenza e controllo delle logiche applicative.

\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_

59.9 Relazione con gli altri blocchi

Nel Blueprint dell’implementazione il patrimonio informativo occupa una posizione centrale.

Esso:

●	alimenta i servizi applicativi;

●	supporta i motori trasversali;

●	riceve informazioni dalle fonti esterne;

●	costituisce la base della conoscenza condivisa.

Ogni flusso informativo dell’ecosistema attraversa questo componente.

\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_

59.10 Obiettivo finale

L’architettura del patrimonio informativo deve garantire che tutta la conoscenza di SportelloScuola 2.0 sia gestita come una risorsa unica, condivisa e indipendente dai prodotti, preservandone qualità, coerenza e riutilizzabilità.

\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_

Conclusione del Capitolo 59

Con questo capitolo viene definito il ruolo del Patrimonio Informativo all’interno del Blueprint dell’implementazione.

La conoscenza, già modellata nella Parte II, assume ora il ruolo di componente centrale dell’ecosistema, condivisa da tutti i servizi applicativi e dai motori trasversali. Questa impostazione garantisce che ogni evoluzione futura continui a fondarsi su una base informativa unitaria, evitando duplicazioni e mantenendo la coerenza dell’intera Enterprise Master Architecture.

SPORTELLOSCUOLA 2.0

ENTERPRISE MASTER ARCHITECTURE (EMA)

PARTE VI

BLUEPRINT DELL’IMPLEMENTAZIONE

CAPITOLO 60

L’ARCHITETTURA DELLE FONTI ESTERNE

L’acquisizione della conoscenza nell’ecosistema

\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_

60.1 Visione

L’ecosistema non genera autonomamente la maggior parte delle informazioni che mette a disposizione.

Il suo valore consiste nella capacità di acquisire, organizzare e valorizzare il patrimonio informativo prodotto dalle fonti ufficiali e dagli altri soggetti rilevanti del sistema scolastico.

Le fonti esterne rappresentano quindi l’origine del flusso informativo dell’ecosistema.

\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_

60.2 Obiettivo

Integrare le informazioni provenienti da fonti esterne in modo uniforme, controllato e verificabile.

Ogni informazione acquisita deve poter essere utilizzata dall’intero ecosistema mantenendo il collegamento con la propria origine.

\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_

60.3 Principio fondamentale

Le fonti esterne non interagiscono direttamente con i servizi applicativi.

Ogni contenuto acquisito attraversa un processo comune di integrazione prima di entrare a far parte del patrimonio informativo condiviso.

Questo garantisce uniformità e qualità.

\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_

60.4 Il flusso di acquisizione

L’acquisizione delle informazioni segue un percorso ordinato.

Le fonti producono i contenuti.

L’ecosistema li acquisisce.

Successivamente vengono:

●	identificati;

●	classificati;

●	normalizzati;

●	collegati alla Knowledge Graph;

●	resi disponibili ai servizi applicativi.

Ogni fase contribuisce alla qualità del patrimonio informativo.

\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_

60.5 Separazione tra origine e utilizzo

L’origine di una informazione rimane sempre distinguibile dal suo utilizzo.

Il patrimonio informativo conserva il riferimento alla fonte originaria, mentre i prodotti dell’ecosistema ne valorizzano il contenuto in funzione delle esigenze dell’utente.

Questa distinzione tutela sia la trasparenza sia l’affidabilità.

\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_

60.6 Evoluzione delle fonti

L’architettura deve consentire l’integrazione di nuove fonti senza modificare i componenti già esistenti.

Ogni nuova fonte viene sottoposta allo stesso processo di acquisizione previsto per le fonti già presenti.

L’ecosistema cresce ampliando il patrimonio informativo, non introducendo procedure differenti.

\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_

60.7 Continuità operativa

Le eventuali variazioni o indisponibilità temporanee di una fonte non devono compromettere il funzionamento dell’intera piattaforma.

L’ecosistema deve essere in grado di:

●	rilevare le anomalie;

●	segnalarle;

●	preservare i dati già validati;

●	riprendere automaticamente il processo di acquisizione quando la fonte torna disponibile.

Questo principio rafforza la resilienza dell’ecosistema.

\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_

60.8 Relazione con il patrimonio informativo

Le fonti esterne alimentano esclusivamente il patrimonio informativo condiviso.

Non distribuiscono dati direttamente ai servizi applicativi.

In questo modo ogni prodotto continua a operare sulla stessa base conoscitiva, evitando incoerenze tra i diversi punti dell’ecosistema.

\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_

60.9 Relazione con gli altri blocchi

Nel Blueprint le fonti esterne rappresentano il punto di ingresso della conoscenza.

Esse:

●	alimentano il patrimonio informativo;

●	non comunicano direttamente con i canali di accesso;

●	non implementano logiche decisionali;

●	non modificano il comportamento dei servizi applicativi.

Il loro ruolo è fornire conoscenza che l’ecosistema organizza e valorizza.

\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_

60.10 Obiettivo finale

L’architettura delle fonti esterne deve garantire un processo uniforme di acquisizione della conoscenza, preservando qualità, tracciabilità e coerenza del patrimonio informativo condiviso.

\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_

Conclusione del Capitolo 60

Con questo capitolo viene definito il ruolo delle Fonti Esterne nel Blueprint dell’implementazione.

Le fonti non costituiscono semplici collegamenti informativi, ma il punto di origine del patrimonio conoscitivo dell’ecosistema. Attraverso un processo unitario di acquisizione e integrazione, ogni contenuto diventa parte della base informativa condivisa, mantenendo il riferimento alla propria origine e rendendosi disponibile a tutti i servizi applicativi.

SPORTELLOSCUOLA 2.0

ENTERPRISE MASTER ARCHITECTURE (EMA)

PARTE VI

BLUEPRINT DELL’IMPLEMENTAZIONE

CAPITOLO 61

L’ARCHITETTURA DEI SERVIZI INFRASTRUTTURALI

Le capacità che garantiscono continuità all’ecosistema

\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_

61.1 Visione

L’infrastruttura rappresenta il fondamento operativo dell’ecosistema.

Essa non produce conoscenza, non interpreta le informazioni e non implementa le logiche applicative.

Il suo compito è garantire che tutti i componenti dell’ecosistema possano operare in modo affidabile, sicuro e continuo.

L’infrastruttura costituisce quindi il livello abilitante dell’intera piattaforma.

\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_

61.2 Obiettivo

Fornire ai servizi applicativi, ai motori trasversali e al patrimonio informativo un insieme stabile di capacità comuni.

L’infrastruttura deve sostenere l’ecosistema senza influenzarne il comportamento funzionale.

Questa separazione preserva la modularità dell’architettura.

\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_

61.3 Principio fondamentale

Le capacità infrastrutturali sono condivise.

Ogni componente dell’ecosistema utilizza gli stessi servizi di base, evitando implementazioni autonome o comportamenti differenti.

Questo principio garantisce uniformità operativa e riduce la complessità gestionale.

\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_

61.4 Disponibilità

L’ecosistema deve rimanere disponibile anche in presenza di eventi che interessano singoli componenti.

L’infrastruttura deve quindi favorire:

●	continuità del servizio;

●	recupero delle funzionalità;

●	riduzione delle interruzioni;

●	gestione controllata dei malfunzionamenti.

La disponibilità rappresenta un requisito strutturale.

\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_

61.5 Sicurezza

La sicurezza costituisce una responsabilità trasversale.

Ogni componente dell’ecosistema deve operare all’interno di un contesto che garantisca:

●	protezione delle informazioni;

●	controllo degli accessi;

●	integrità dei dati;

●	tracciabilità delle operazioni.

La sicurezza non appartiene a un singolo prodotto.

È una caratteristica dell’intera architettura.

\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_

61.6 Scalabilità

L’infrastruttura deve consentire all’ecosistema di adattarsi alla crescita.

L’aumento del numero di utenti, delle fonti informative o dei servizi applicativi non deve richiedere una revisione dell’architettura.

La crescita deve avvenire in modo progressivo e sostenibile.

\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_

61.7 Osservabilità

L’ecosistema deve poter essere monitorato in ogni sua parte.

L’infrastruttura deve rendere possibile:

●	la verifica dello stato dei servizi;

●	l’individuazione delle anomalie;

●	l’analisi delle prestazioni;

●	il supporto alle attività di miglioramento continuo.

L’osservabilità costituisce uno strumento di governo dell’ecosistema.

\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_

61.8 Continuità operativa

Ogni componente deve poter essere mantenuto, aggiornato o evoluto senza compromettere il funzionamento complessivo della piattaforma.

L’infrastruttura deve favorire interventi graduali, riducendo al minimo l’impatto sugli utenti.

Questo principio rafforza la sostenibilità dell’ecosistema nel lungo periodo.

\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_

61.9 Relazione con gli altri blocchi

Nel Blueprint i servizi infrastrutturali costituiscono il livello di supporto permanente.

Essi:

●	sostengono i canali di accesso;

●	abilitano i servizi applicativi;

●	garantiscono il funzionamento dei motori trasversali;

●	proteggono il patrimonio informativo;

●	supportano l’integrazione delle fonti esterne.

L’infrastruttura non modifica il comportamento dell’ecosistema.

Ne rende possibile il funzionamento.

\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_

61.10 Obiettivo finale

L’architettura dei servizi infrastrutturali deve garantire che SportelloScuola 2.0 possa operare in modo affidabile, sicuro, scalabile e continuo, fornendo una base stabile per tutti gli altri componenti dell’Enterprise Master Architecture.

\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_

Conclusione del Capitolo 61

Con questo capitolo si completa il Blueprint dell’implementazione.

L’infrastruttura viene definita come l’insieme delle capacità trasversali che rendono possibile il funzionamento dell’intero ecosistema, senza interferire con la logica applicativa o con il patrimonio informativo. La distinzione tra capacità infrastrutturali e componenti funzionali mantiene l’architettura indipendente dalle tecnologie e coerente con i principi definiti nelle parti precedenti.

SPORTELLOSCUOLA 2.0

ENTERPRISE MASTER ARCHITECTURE (EMA)

PARTE VII

ROADMAP DI ATTUAZIONE

CAPITOLO 62

IL MODELLO DI TRASFORMAZIONE DELL’ECOSISTEMA

Dall’architettura alla realizzazione progressiva

\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_

62.1 Visione

L’Enterprise Master Architecture rappresenta la destinazione dell’ecosistema.

La realizzazione della piattaforma avviene invece attraverso un processo graduale, nel quale ogni fase contribuisce ad avvicinare l’implementazione al modello architetturale definitivo.

La trasformazione non consiste nell’aggiungere funzionalità.

Consiste nel costruire progressivamente un ecosistema sempre più coerente con l’Enterprise Master Architecture.

\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_

62.2 Obiettivo

Definire un modello di attuazione che consenta di realizzare l’architettura senza interrompere la continuità evolutiva della piattaforma.

Ogni fase deve produrre valore autonomo, mantenendo la compatibilità con le successive.

\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_

62.3 Principio fondamentale

La trasformazione avviene per maturazione dell’ecosistema.

Ogni componente viene introdotto solo quando il contesto architetturale è pronto a sostenerlo.

L’ordine di implementazione deve seguire le dipendenze logiche già definite nelle parti precedenti.

\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_

62.4 Evoluzione per capacità

La roadmap non è organizzata per prodotti.

È organizzata per capacità.

Ogni fase rafforza una capacità dell’ecosistema.

Ad esempio:

●	organizzazione della conoscenza;

●	integrazione delle fonti;

●	supporto decisionale;

●	automazione dei percorsi;

●	continuità operativa.

I prodotti evolvono come conseguenza della crescita delle capacità condivise.

\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_

62.5 Incrementalità

Ogni fase deve essere completa e utilizzabile.

Non sono previste implementazioni parziali che richiedano il completamento dell’intera architettura per produrre benefici.

Ogni incremento rende l’ecosistema più maturo rispetto alla fase precedente.

\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_

62.6 Continuità

L’introduzione di nuove capacità non deve compromettere il funzionamento di quelle già disponibili.

La trasformazione deve preservare:

●	stabilità;

●	affidabilità;

●	coerenza dell’esperienza utente;

●	continuità del patrimonio informativo.

L’evoluzione è un processo cumulativo.

\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_

62.7 Validazione

Al termine di ogni fase viene verificata la conformità rispetto all’Enterprise Master Architecture.

La validazione considera:

●	coerenza architetturale;

●	qualità del patrimonio informativo;

●	integrazione dei componenti;

●	sostenibilità operativa.

Solo dopo questa verifica si procede alla fase successiva.

\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_

62.8 Adattabilità

La roadmap può essere aggiornata in funzione di nuove esigenze normative, organizzative o tecnologiche.

Tuttavia gli aggiornamenti devono rispettare i principi dell’EMA.

Si modifica il percorso.

Non la destinazione.

\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_

62.9 Relazione con il Blueprint

La roadmap utilizza come riferimento il Blueprint definito nella Parte VI.

Ogni capacità introdotta deve poter essere ricondotta ai macro-blocchi dell’implementazione.

Questo garantisce continuità tra progettazione e realizzazione.

\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_

62.10 Obiettivo finale

Il modello di trasformazione deve consentire la realizzazione progressiva di SportelloScuola 2.0, assicurando che ogni fase contribuisca alla costruzione dell’ecosistema senza alterarne i principi architetturali.

\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_

Conclusione del Capitolo 62

Con questo capitolo si apre la Roadmap di Attuazione dell’Enterprise Master Architecture.

La trasformazione dell’ecosistema viene concepita come un percorso di maturazione progressiva, nel quale ogni fase rafforza le capacità condivise e consolida l’architettura definita nelle parti precedenti.

SPORTELLOSCUOLA 2.0

ENTERPRISE MASTER ARCHITECTURE (EMA)

PARTE VII

ROADMAP DI ATTUAZIONE

CAPITOLO 63

I LIVELLI DI MATURITÀ DELL’ECOSISTEMA

Misurare il progresso attraverso le capacità acquisite

\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_

63.1 Visione

La realizzazione di SportelloScuola 2.0 non deve essere valutata esclusivamente in funzione delle funzionalità implementate.

Il vero indicatore di progresso è il livello di maturità raggiunto dall’ecosistema.

La maturità esprime la capacità della piattaforma di operare in modo coerente con i principi dell’Enterprise Master Architecture.

\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_

63.2 Obiettivo

Definire un modello che consenta di valutare l’evoluzione dell’ecosistema sulla base delle capacità realmente consolidate.

Ogni livello rappresenta uno stato stabile dell’architettura e costituisce il punto di partenza per il livello successivo.

\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_

63.3 Livello 1 – Fondazione

Nel primo livello vengono realizzate le capacità essenziali.

L’ecosistema dispone di:

●	un patrimonio informativo condiviso;

●	una struttura coerente delle informazioni;

●	i primi servizi applicativi;

●	i canali di accesso;

●	i principi fondamentali di governance.

L’obiettivo è costruire una base solida su cui sviluppare tutte le evoluzioni successive.

\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_

63.4 Livello 2 – Integrazione

Nel secondo livello le diverse componenti iniziano a collaborare come un unico ecosistema.

Si consolidano:

●	l’integrazione delle fonti esterne;

●	il riutilizzo del patrimonio informativo;

●	la collaborazione tra servizi applicativi;

●	la centralizzazione delle logiche comuni.

L’attenzione si sposta dall’esistenza dei componenti alla loro cooperazione.

\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_

63.5 Livello 3 – Intelligenza

Nel terzo livello il nucleo cognitivo dell’ecosistema opera in modo completo.

I motori trasversali collaborano stabilmente.

La piattaforma è in grado di:

●	interpretare il contesto;

●	organizzare percorsi;

●	valorizzare le relazioni informative;

●	proporre azioni coerenti con le esigenze dell’utente.

L’intelligenza dell’ecosistema emerge dalla collaborazione dei suoi componenti.

\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_

63.6 Livello 4 – Ottimizzazione

Nel quarto livello l’attenzione si concentra sul miglioramento continuo.

L’ecosistema rafforza:

●	qualità dei dati;

●	efficienza operativa;

●	semplicità dei percorsi;

●	sostenibilità della manutenzione;

●	affidabilità complessiva.

Le evoluzioni non introducono nuove capacità fondamentali.

Raffinano quelle esistenti.

\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_

63.7 Livello 5 – Maturità

Nel quinto livello l’Enterprise Master Architecture è pienamente realizzata.

Ogni nuova esigenza viene affrontata utilizzando i principi già definiti.

L’ecosistema cresce senza aumentare la propria complessità.

La maturità coincide con la capacità di evolvere mantenendo stabile l’architettura.

\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_

63.8 Valutazione della maturità

Il passaggio da un livello al successivo non dipende dal tempo trascorso.

Dipende dalla verifica delle capacità effettivamente acquisite.

La valutazione considera:

●	coerenza architetturale;

●	integrazione dei componenti;

●	qualità del patrimonio informativo;

●	sostenibilità operativa;

●	esperienza utente.

\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_

63.9 Evoluzione continua

Il raggiungimento del livello più elevato non conclude il percorso evolutivo.

L’ecosistema continua ad adattarsi ai cambiamenti del contesto scolastico, mantenendo però invariati i principi fondamentali dell’Enterprise Master Architecture.

La maturità rappresenta una condizione di equilibrio dinamico.

\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_

63.10 Obiettivo finale

I livelli di maturità forniscono un modello condiviso per valutare il progresso dell’ecosistema, orientando l’evoluzione verso il consolidamento delle capacità architetturali piuttosto che verso il semplice incremento delle funzionalità.

\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_

Conclusione del Capitolo 63

Con questo capitolo viene introdotto il Modello di Maturità dell’Ecosistema.

La roadmap di attuazione viene descritta attraverso livelli progressivi di consolidamento delle capacità architetturali, consentendo di misurare l’evoluzione della piattaforma in termini di qualità, integrazione e coerenza con l’Enterprise Master Architecture.

SPORTELLOSCUOLA 2.0

ENTERPRISE MASTER ARCHITECTURE (EMA)

PARTE VII

ROADMAP DI ATTUAZIONE

CAPITOLO 64

IL MODELLO DI PRIORITIZZAZIONE ARCHITETTURALE

Valutare le iniziative in funzione del valore per l’ecosistema

\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_

64.1 Visione

L’evoluzione di SportelloScuola 2.0 deve essere guidata dal valore architetturale delle iniziative, non dalla loro complessità tecnica o dalla loro visibilità.

Ogni proposta deve essere valutata in relazione al contributo che offre alla crescita ordinata dell’ecosistema.

La roadmap non è quindi una semplice successione di attività, ma il risultato di un processo di selezione coerente con l’Enterprise Master Architecture.

\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_

64.2 Obiettivo

Definire un modello uniforme per stabilire la priorità delle iniziative future.

La priorità non dipende dall’urgenza percepita, ma dalla capacità dell’iniziativa di rafforzare le fondamenta dell’ecosistema.

\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_

64.3 Principio fondamentale

Un’iniziativa è prioritaria quando incrementa una capacità condivisa dell’ecosistema.

Le iniziative che migliorano esclusivamente un singolo prodotto devono essere valutate con maggiore attenzione, verificando che producano benefici anche a livello sistemico.

Questo principio favorisce una crescita equilibrata.

\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_

64.4 Criteri di valutazione

Ogni iniziativa viene analizzata secondo cinque criteri.

Coerenza architetturale

L’iniziativa rispetta i principi definiti dall’Enterprise Master Architecture?

Valore per l’utente

Riduce realmente il costo cognitivo o la frammentazione delle informazioni?

Riutilizzabilità

La capacità introdotta può essere utilizzata da più prodotti o servizi?

Sostenibilità

L’iniziativa può essere mantenuta nel tempo con un impegno proporzionato al valore prodotto?

Contributo alla maturità

L’iniziativa favorisce il passaggio a un livello superiore di maturità dell’ecosistema?

\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_

64.5 Priorità delle capacità condivise

Le iniziative che rafforzano componenti condivisi devono essere considerate strategiche.

Ad esempio:

●	miglioramento del patrimonio informativo;

●	evoluzione della Knowledge Graph;

●	affinamento dei motori trasversali;

●	incremento della qualità delle integrazioni;

●	semplificazione dei percorsi comuni.

Questi interventi generano benefici distribuiti su tutto l’ecosistema.

\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_

64.6 Priorità delle evoluzioni funzionali

Le evoluzioni di un singolo prodotto assumono priorità quando:

●	risolvono un problema concreto per gli utenti;

●	valorizzano capacità già esistenti;

●	non introducono duplicazioni;

●	rimangono coerenti con la responsabilità del prodotto.

In questo modo la crescita funzionale rimane subordinata alla crescita architetturale.

\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_

64.7 Gestione delle opportunità

Possono emergere esigenze impreviste derivanti da cambiamenti normativi, organizzativi o tecnologici.

Il modello di prioritizzazione consente di valutarle senza modificare i principi dell’EMA.

La flessibilità riguarda le iniziative.

La stabilità riguarda l’architettura.

\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_

64.8 Riesame delle priorità

La priorità assegnata a un’iniziativa non è definitiva.

Può essere rivista quando cambiano:

●	il contesto normativo;

●	le esigenze degli utenti;

●	il livello di maturità raggiunto;

●	le capacità già disponibili.

Ogni riesame deve essere motivato e documentato.

\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_

64.9 Relazione con la Roadmap

Il modello di prioritizzazione costituisce il criterio di costruzione della Roadmap di Attuazione.

Le fasi evolutive non derivano da decisioni occasionali, ma dall’applicazione sistematica dei principi architetturali.

In questo modo la roadmap rimane coerente anche nel lungo periodo.

\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_

64.10 Obiettivo finale

Ogni iniziativa futura deve essere selezionata sulla base del proprio contributo all’ecosistema, assicurando che la crescita di SportelloScuola 2.0 continui a essere guidata dai principi dell’Enterprise Master Architecture.

\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_

Conclusione del Capitolo 64

Con questo capitolo viene definito il Modello di Prioritizzazione Architetturale.

La Roadmap di Attuazione si dota di un criterio stabile per valutare e ordinare le iniziative evolutive, privilegiando quelle che rafforzano le capacità condivise dell’ecosistema e contribuiscono al raggiungimento dei livelli di maturità definiti nel capitolo precedente.

SPORTELLOSCUOLA 2.0

ENTERPRISE MASTER ARCHITECTURE (EMA)

PARTE VII

ROADMAP DI ATTUAZIONE

CAPITOLO 65

I CRITERI DI COMPLETAMENTO DELLA TRASFORMAZIONE

Consolidare l’architettura prima di evolvere

\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_

65.1 Visione

La trasformazione dell’ecosistema non si conclude con la realizzazione di nuove funzionalità.

Una fase può considerarsi completata soltanto quando le capacità introdotte risultano stabilmente integrate nell’architettura e contribuiscono al funzionamento coerente dell’intero ecosistema.

Il completamento rappresenta quindi il consolidamento dell’architettura, non la semplice conclusione delle attività.

\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_

65.2 Obiettivo

Definire i criteri che consentono di verificare il consolidamento di un livello di maturità prima dell’avvio del successivo.

Ogni fase deve lasciare in eredità un’architettura stabile, coerente e pronta ad accogliere nuove evoluzioni.

\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_

65.3 Principio fondamentale

Una fase della roadmap può considerarsi conclusa soltanto quando le capacità introdotte sono diventate parte integrante dell’ecosistema.

Non è sufficiente che siano disponibili.

Devono essere utilizzabili, integrate e coerenti con tutti i principi dell’Enterprise Master Architecture.

\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_

65.4 Consolidamento architetturale

Il consolidamento richiede che ogni nuova capacità:

●	sia integrata con il patrimonio informativo;

●	utilizzi i motori trasversali quando necessario;

●	rispetti le responsabilità dei servizi applicativi;

●	sia accessibile attraverso i canali previsti;

●	sia governata secondo i principi della Parte V.

Solo in presenza di questa integrazione la capacità può considerarsi consolidata.

\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_

65.5 Coerenza sistemica

L’introduzione di una nuova capacità non deve alterare l’equilibrio dell’ecosistema.

Ogni evoluzione deve mantenere:

●	uniformità dei comportamenti;

●	continuità dell’esperienza utente;

●	coerenza del patrimonio informativo;

●	chiarezza delle responsabilità architetturali.

L’ecosistema cresce mantenendo stabile la propria struttura.

\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_

65.6 Assenza di regressioni

Ogni fase conclusa deve preservare quanto già consolidato.

L’introduzione di nuove capacità non deve compromettere:

●	i servizi esistenti;

●	le relazioni informative;

●	i percorsi operativi;

●	la qualità della conoscenza.

L’evoluzione procede per accumulo di valore, non per sostituzione continua.

\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_

65.7 Capacità di evoluzione

Una fase può dirsi realmente completata quando rende possibile quella successiva senza richiedere revisioni sostanziali dell’architettura.

Ogni livello di maturità deve costituire una base stabile sulla quale costruire il livello seguente.

La roadmap assume così una natura progressiva e sostenibile.

\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_

65.8 Riesame architetturale

Al termine di ogni fase è opportuno effettuare un riesame complessivo dell’ecosistema.

Il riesame verifica:

●	l’allineamento ai principi dell’EMA;

●	la qualità dell’integrazione tra i componenti;

●	la coerenza del patrimonio informativo;

●	la sostenibilità delle capacità introdotte.

L’obiettivo non è certificare la conclusione delle attività, ma confermare la solidità dell’architettura.

\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_

65.9 Relazione con la Roadmap

I criteri di completamento rappresentano il punto di controllo della Roadmap di Attuazione.

Essi collegano i livelli di maturità con il modello di prioritizzazione, garantendo che ogni nuova iniziativa venga introdotta su una base architetturale consolidata.

In questo modo la trasformazione mantiene continuità e coerenza nel tempo.

\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_

65.10 Obiettivo finale

Il completamento di una fase della roadmap coincide con il consolidamento delle capacità architetturali introdotte, assicurando che ogni evoluzione rafforzi l’ecosistema senza comprometterne l’equilibrio complessivo.

\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_

Conclusione del Capitolo 65

Con questo capitolo viene completato il modello di attuazione dell’Enterprise Master Architecture.

La Roadmap non è più soltanto un percorso evolutivo, ma un processo disciplinato di consolidamento progressivo delle capacità architetturali. Ogni livello di maturità viene raggiunto solo quando le nuove capacità risultano pienamente integrate, coerenti e sostenibili.





