# SPORTELLOSCUOLA 2.0

# Architecture Decision Records (ADR)

Registro delle decisioni architettoniche dell'ecosistema SportelloScuola 2.0

Versione 1.0

\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_

## Premessa

Questo registro raccoglie tutte le Architecture Decision Records (ADR) dell'ecosistema SportelloScuola 2.0.

Ogni ADR documenta una decisione architetturale significativa, il suo contesto, le alternative considerate e le conseguenze adottate.

Le ADR sono organizzate su due livelli:

●	Livello EMA — Decisioni architettoniche enterprise (definite nell'Enterprise Master Architecture)

●	Livello SAPM — Decisioni architettoniche di soluzione e implementazione (definite nel Solution Architecture & Project Management)

Ogni ADR è immutabile una volta approvata. Le modifiche richiedono una nuova ADR che substituisce quella precedente.

\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_

## Formato ADR

Ogni ADR segue il formato standard:

| Campo | Descrizione |
|-------|-------------|
| ID | Identificativo univoco (es. ADR-001) |
| Titolo | Nome breve della decisione |
| Stato | Proposta / Approvata / Deprecata / Sostituita |
| Data | Data di approvazione |
| Contesto | Situazione che richiede la decisione |
| Decisione | Scelta architetturale adottata |
| Alternatives | Opzioni considerate e scartate |
| Conseguenze | Effetti positivi e negativi della decisione |
| Revisione | Quando la decisione dovrà essere rivalutata |

\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_

# PARTE I — ADR ENTERPRISE (EMA)

Decisioni architettoniche fondamentali che governano l'intero ecosistema.

\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_

## ADR-001 — Modular Monolith

| Campo | Valore |
|-------|--------|
| ID | ADR-001 |
| Titolo | Modular Monolith con domini separati |
| Stato | Approvata |
| Data | 2026 |
| Fonte | EMA Cap. 2 §2.2 |

### Contesto

La piattaforma deve essere sviluppata con un'architettura che bilanci semplicità di sviluppo, coerenza del dominio ed evoluzione futura.

Due opzioni estreme presentano svantaggi:

●	il monolite tradizionale diventa difficile da mantenere con la crescita;

●	i microservizi aumentano notevolmente la complessità operativa.

### Decisione

La piattaforma adotterà un **Modular Monolith** con domini chiaramente separati e API interne ben definite.

Ogni dominio funzionale sarà un modulo indipendente con:

●	responsabilità propria;

●	eventi propri;

●	API interne documentate;

●	mpossibilità di evolvere autonomamente.

### Alternatives considerate

| Alternativa | Motivo dell'esclusione |
|-------------|----------------------|
| Monolite tradizionale | Manutenzione difficult con la crescita |
| Microservizi | Complessità operativa eccessiva per le dimensioni attuali |
| Mixed (monolite + servizi esterni) | Complessità di transizione non giustificata |

### Conseguenze

**Positive:**

●	semplità di sviluppo nelle prime fasi;

●	elevata coerenza del dominio;

●	possibilità di evolvere singoli moduli in microservizi solo quando realmente necessario.

**Negative:**

●	deploy unitario di tutti i moduli;

●	necessità di discipline rigide nella separazione dei domini.

### Revisione

Rivalutare quando la piattaforma supera i 50.000 utenti attivi mensili o quando i tempi di deploy diventano eccessivi.

\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_

## ADR-002 — Knowledge Graph come cuore dell'ecosistema

| Campo | Valore |
|-------|--------|
| ID | ADR-002 |
| Titolo | Knowledge Graph come cuore dell'ecosistema |
| Stato | Approvata |
| Data | 2026 |
| Fonte | EMA Cap. 3 §3.16 |

### Contesto

Le piattaforme tradizionali organizzano le informazioni in pagine e sezioni isolate, rendendo difficile il collegamento tra contenuti e aumentando la ridondanza.

### Decisione

Tutte le informazioni di SportelloScuola 2.0 saranno organizzate attorno a un **Knowledge Graph** governato da un modello dati canonico e da regole di Data Governance.

### Alternatives considerate

| Alternativa | Motivo dell'esclusione |
|-------------|----------------------|
| Database relazionale tradizionale | Limitato nelle relazioni gerarichiche e nella navigazione contestuale |
| Database documentale | Non supporta relazioni esplicite tra entità |
| Architettura basata su pagine | Ridondanza, mancanza di collegamenti, manutenzione elevata |

### Conseguenze

**Positive:**

●	una sola fonte di verità (SSOT);

●	ricerca trasversale e contestuale;

●	aggiornamenti propagati automaticamente;

●	AI sempre basata su dati verificabili;

●	manutenzione semplificata;

●	elevata scalabilità.

**Negative:**

●	complettà iniziale nella progettazione del modello;

●	necessità di governance rigorosa delle entità e relazioni.

### Revisione

Questa decisione è permanente. Qualsiasi modifica richiede una revisione architetturale formale.

\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_

## ADR-003 — AI Core unificato con architettura RAG

| Campo | Valore |
|-------|--------|
| ID | ADR-003 |
| Titolo | AI Core unificato con architettura RAG e orchestrazione centrale |
| Stato | Approvata |
| Data | 2026 |
| Fonte | EMA Cap. 5 §5.13 |

### Contesto

Chatbot indipendenti e basi di conoscenza separate generano risposte incoerenti, duplicazione della logica e costi elevati di manutenzione.

### Decisione

Tutte le capacità di intelligenza artificiale saranno centralizzate in un unico **AI Core**, alimentato esclusivamente dal Knowledge Graph e orchestrato attraverso un sistema comune di Retrieval, Reasoning, Citation e Governance.

### Alternatives considerate

| Alternativa | Motivo dell'esclusione |
|-------------|----------------------|
| Chatbot indipendenti per ogni sezione | Risposte incoerenti, duplicazione, costi elevati |
| AI centralizzata senza RAG | Allucinazioni, mancanza di verificabilità |
| AI distribuita con Knowledge Base separata | Complessità di sincronizzazione, ridondanza |

### Conseguenze

**Positive:**

●	un'unica verità per tutta la piattaforma;

●	comportamento uniforme in ogni sezione;

●	possibilità di sostituire o integrare modelli AI senza modificare i moduli applicativi;

●	controllo centralizzato della qualità, della sicurezza e della trasparenza.

**Negative:**

●	dipendenza da un singolo punto di fallimento (mitigata da fallback);

●	necessità di governance centralizzata dei prompt.

### Revisione

Rivalutare con l'evoluzione dei modelli linguistici e delle normative AI.

\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_

# PARTE II — ADR DI SOLUZIONE (SAPM)

Decisioni architettoniche di soluzione definite nel Solution Architecture & Project Management.

Le ADR di seguito elencate sono documentate integralmente nel SAPM. Questo registro ne fornisce un indice consultivo.

\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_

## ADR — Experience Platform (Frontend)

| ID | Titolo | Fonte SAPM |
|----|--------|------------|
| ADR-FE-001 | Adozione di un'architettura Frontend API-First | SAPM §13.13 |
| ADR-FE-002 | Separazione rigorosa tra presentazione e logica di business | SAPM §13.13 |
| ADR-FE-003 | Introduzione di un Design System condiviso per tutti i prodotti | SAPM §13.13 |
| ADR-FE-004 | Integrazione esclusiva con l'AI tramite l'Enterprise AI Core | SAPM §13.13 |
| ADR-FE-005 | Gestione centralizzata dell'identità attraverso la Trust Platform | SAPM §13.13 |
| ADR-FE-006 | React Technology Baseline | SAPM §28.8 |

\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_

## ADR — Enterprise AI Core

| ID | Titolo | Fonte SAPM |
|----|--------|------------|
| ADR-AI-001 | AI Provider Independence — Ogni provider è intercambiabile | SAPM §20.10 |
| ADR-AI-002 | Prompt as Enterprise Assets — Prompt versionati e governati | SAPM §21.10 |
| ADR-AI-TECH-001 | AI Provider Agnostic Platform | SAPM §31.11 |
| ADR-AI-TRUST-001 | Trustworthy AI by Design | SAPM §32.11 |

\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_

## ADR — Enterprise Data Platform

| ID | Titolo | Fonte SAPM |
|----|--------|------------|
| ADR-DATA-001 | Enterprise Knowledge Platform | SAPM §30.11 |
| ADR-BE-001 | Supabase Enterprise Baseline — PostgreSQL come standard permanente | SAPM §29.8 |

\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_

## ADR — Enterprise Integration

| ID | Titolo | Fonte SAPM |
|----|--------|------------|
| ADR-INT-001 | External Services Isolation / API First Integration Platform | SAPM §22.10, §33.12 |
| ADR-INT-002 | Event Driven Evolution | SAPM §23.9 |

\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_

## ADR — Enterprise Platform

| ID | Titolo | Fonte SAPM |
|----|--------|------------|
| ADR-PLT-001 | Platform Neutrality | SAPM §24.10 |
| ADR-PLT-002 | Internal Developer Platform | SAPM §26.13, §34.8 |
| ADR-PE-001 | Internal Developer Platform (Platform Engineering) | SAPM §34.8 |

\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_

## ADR — Enterprise Security

| ID | Titolo | Fonte SAPM |
|----|--------|------------|
| ADR-SEC-001 | Security by Design / Secure Software Supply Chain | SAPM §25.11, §37.14 |

\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_

## ADR — Enterprise Technology

| ID | Titolo | Fonte SAPM |
|----|--------|------------|
| ADR-TA-001 | Technology Neutrality | SAPM §27.9 |

\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_

## ADR — Enterprise Operations

| ID | Titolo | Fonte SAPM |
|----|--------|------------|
| ADR-OBS-001 | Operational Intelligence Platform | SAPM §38.14 |
| ADR-BCDR-001 | Business Continuity by Design | SAPM §39.13 |
| ADR-OPS-001 | Standard Operating Model | SAPM §58.9 |

\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_

## ADR — Enterprise Governance

| ID | Titolo | Fonte SAPM |
|----|--------|------------|
| ADR-GOV-001 | Pragmatic Operational Governance / Continuous Architecture Governance | SAPM §40.12, §57.9 |
| ADR-GOV-002 | Enterprise Data Governance | SAPM §16.10 |

\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_

## ADR — Enterprise Program Management

| ID | Titolo | Fonte SAPM |
|----|--------|------------|
| ADR-PGM-001 | Enterprise Program Governance | SAPM §43.10 |
| ADR-CAP-001 | Capability Driven Delivery | SAPM §44.10 |
| ADR-CAP-002 | Capability Register as Single Source of Truth | SAPM §45.10 |
| ADR-SBB-001 | Solution Building Blocks as Architectural Bridge | SAPM §46.8 |
| ADR-EPIC-001 | Value-Driven Epic Management | SAPM §47.10 |
| ADR-FEAT-001 | Feature as End-to-End Functional Increment | SAPM §48.10 |
| ADR-US-001 | User Story as Functional Contract | SAPM §49.9 |
| ADR-TASK-001 | Task as Atomic Delivery Unit | SAPM §50.12 |
| ADR-REL-001 | Controlled Release Management | SAPM §51.10 |
| ADR-RDM-001 | Capability Maturity Roadmap | SAPM §52.11 |
| ADR-PORT-001 | Lean Portfolio Governance | SAPM §53.9 |

\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_

## ADR — Enterprise Risk & Quality

| ID | Titolo | Fonte SAPM |
|----|--------|------------|
| ADR-RISK-001 | Enterprise Risk Governance | SAPM §54.10 |
| ADR-CHG-001 | Controlled Architecture Evolution | SAPM §55.10 |
| ADR-QM-001 | Enterprise Quality Governance | SAPM §56.9 |

\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_

## ADR — Enterprise Compliance

| ID | Titolo | Fonte SAPM |
|----|--------|------------|
| ADR-COMP-001 | Continuous Architecture Compliance | SAPM §59.9 |
| ADR-REV-001 | Continuous Architecture Review | SAPM §60.9 |

\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_

## ADR — DevSecOps & Infrastructure

| ID | Titolo | Fonte SAPM |
|----|--------|------------|
| ADR-CICD-001 | Quality Gates Before Delivery | SAPM §36.14 |
| ADR-ENV-001 | Enterprise Environment Lifecycle | SAPM §35.12 |
| ADR-FIN-001 | Sustainable Cloud Economics | SAPM §41.11 |
| ADR-EVO-001 | Incremental Architecture Evolution | SAPM §42.10 |
| ADR-DOC-001 | Enterprise Documentation Standard | SAPM §61.9 |
| ADR-SAPM-001 | Living Architecture | SAPM §62.8 |

\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_

# PARTE III — GOVERNANCE DELLE ADR

\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_

## Processo di creazione

1.	Proposta — Chiunque può proporre una nuova ADR

2.	Analisi — L'ARB valuta impatto e coerenza con l'EMA

3.	Approvazione — L'ARB approva o rigetta la proposta

4.	Registrazione — L'ADR viene aggiunta a questo registro

5.	Comunicazione — Tutti i team vengono informati

\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_

## Processo di modifica

Le ADR approvate sono immutabili.

La modifica richiede:

1.	Proposta di nuova ADR che sostituisce quella esistente

2.	Analisi delle conseguenze della modifica

3.	Approvazione dell'ARB

4.	Aggiornamento dello stato della ADR precedente a "Sostituita"

5.	Registrazione della nuova ADR

\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_

## Responsabilità

L'Architecture Review Board (ARB) è responsabile della governance di tutte le ADR.

L'ARB approva solamente modifiche che rispettano:

●	SSOT (Principio N.1);

●	Knowledge Graph (ADR-002);

●	Canonical Data Model;

●	Modularità (Principio N.2);

●	Event Driven Architecture (Principio N.4);

●	API interne;

●	Sicurezza;

●	Scalabilità.

\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_

## Riferimenti

| Documento | Ruolo |
|-----------|-------|
| EMA - Sportello Scuola 2.0.md | Fonte delle ADR Enterprise |
| SAPM - Sportello Scuola 2.0.md | Fonte delle ADR di Soluzione |
| ADR.md (questo documento) | Registro centrale delle ADR |
| EGR - Enterprise Governance Registers | Registro vivente delle metriche e dei processi |
| EDH - Enterprise Development Handbook | Standard di sviluppo e coding |

\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_

## Matrice di tracciabilità EMA → SAPM

| EMA Layer | ADR Enterprise | ADR SAPM correlate |
|-----------|---------------|-------------------|
| Foundation Layer | ADR-001 (Modular Monolith) | ADR-PLT-001, ADR-PLT-002, ADR-SEC-001 |
| Data Layer | ADR-002 (Knowledge Graph) | ADR-DATA-001, ADR-BE-001, ADR-GOV-002 |
| Knowledge Layer | ADR-002 (Knowledge Graph) | ADR-DATA-001, ADR-INT-001 |
| Intelligence Layer | ADR-003 (AI Core unificato) | ADR-AI-001, ADR-AI-002, ADR-AI-TECH-001, ADR-AI-TRUST-001 |
| Experience Layer | — | ADR-FE-001 ÷ ADR-FE-006 |

\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_

Fine del registro ADR.
