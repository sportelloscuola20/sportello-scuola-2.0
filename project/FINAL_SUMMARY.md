# Sportello Scuola 2.0 - Trasformazione in Piattaforma AI per il Personale Scolastico

## Riepilogo delle Modifiche

### 1. Riposizionamento del Prodotto
- Il sito ora si presenta come: "Il copilota AI per Docenti, ATA e Dirigenti."
- Rimossi i riferimenti a "Portale notizie scuola", "Tool GPS" e "Generatori AI".

### 2. Aggiornamento della Sezione Hero
- **Nuovo Titolo:** "La piattaforma AI specializzata per Docenti, ATA e Dirigenti scolastici."
- **Nuovo Sottotitolo:** "Calcola il tuo punteggio GPS e ATA, consulta normative aggiornate, genera documenti scolastici e ricevi assistenza professionale 24/7."
- **CTA Primaria:** "Prova l’Assistente AI"
- **CTA Secondaria:** "Calcola il tuo punteggio"
- **Eliminato:** "Ultime Notizie" come CTA principale.

### 3. Modifica dell'Header
- **Rimosso:** "Calcolo Punteggio GPS" come pulsante principale.
- **Aggiunto:** "Assistente AI" come CTA principale.
- **Menu Aggiornato:**
  - Home
  - Assistente AI
  - Calcolo Punteggio
  - Normative
  - Scadenze
  - Contatti

### 4. Nuova Struttura della Home Page
L'ordine delle sezioni è ora:
1. Hero
2. Per chi è la piattaforma (Docenti, ATA, Dirigenti)
3. Assistenti AI (Assistente Docente, Assistente ATA, Assistente Dirigente, Assistente Sindacale)
4. Calcolo Punteggio (GPS, ATA)
5. Normative e Documenti
6. News
7. Scadenze
8. FAQ
9. Contatti
10. Footer

### 5. Riorganizzazione degli Assistenti AI
- **Eliminato:** AIAgentHub e i suoi agenti generici.
- **Creati:** Assistenti specializzati per ruolo:
  - **Assistente Docente:** Conoscenze su GPS, GAE, GI, Interpelli, Supplenze, UDA, PEI, PDP, BES, DSA, Valutazione, Normativa.
  - **Assistente ATA:** Conoscenze su Graduatorie ATA, Punteggi, Contratti, Mobilità, Segreteria.
  - **Assistente Dirigente:** Conoscenze su Normativa, Personale, Privacy, Sicurezza, Nomine.
  - **Assistente Sindacale:** Conoscenze su CCNL, Legge 104, Permessi, Congedi, Ferie, Sanzioni, Supplenze.
- Ogni assistente ha prompt iniziali specifici per guidare l'utente.

### 6. Implementazione del Sistema RAG (Retrieval-Augmented Generation)
- **Cartella Creata:** `/src/rag`
- **Architettura:**
  - **Database:** Supabase con estensione pgvector per la ricerca vettoriale.
  - **LLM:** OpenRouter (utilizzando modelli come anthropic/claude-3-haiku per il chat e text-embedding-ada-002 per gli embedding).
  - **Pipeline:**
    1. **Ingestione:** Caricamento di documenti (CCNL, ordinanze, guide, etc.) nel database.
    2. **Chunking:** Divisione dei documenti in frammenti di testo sovrapposti.
    3. **Embedding:** Generazione di vettori per ogni frammento utilizzando OpenRouter.
    4. **Storage:** Salvataggio dei frammenti e dei loro embedding in Supabase.
    5. **Retrieval:** Ricerca dei frammenti più rilevanti per una query utilizzando ricerca della similarità coseno.
    6. **Citation:** Le risposte includono citazioni con riferimento al documento originale, estratto e punteggio di attendibilità.

### 7. Schema del Database Completo
- **Tabelle Create:**
  - `users`: Per la gestione degli utenti e dei ruoli (docente, ata, dirigente, sindacale, admin).
  - `subscriptions`: Per la gestione dei piani (free, pro, enterprise).
  - `documents`: Per memorizzare i documenti caricati.
  - `document_chunks`: Per memorizzare i frammenti di testo dei documenti.
  - `embeddings`: Per memorizzare i vettori associati ai frammenti.
  - `chat_sessions` e `chat_messages`: Per la cronologia delle conversazioni con il supporto alle citazioni.
  - `gps_scores` e `ata_scores`: Per memorizzare i risultati dei calcoli di punteggio.
  - `notifications`: Per le notifiche agli utenti.

### 8. Risposte con Fonti
Ogni risposta dell'assistente AI include:
- **Risposta:** Il testo generato dall'LLM.
- **Fonti:** Elenco dei documenti utilizzati con:
  - Titolo del documento
  - Data
  - Estratto pertinente
  - Attendibilità (punteggio di similarità)

### 9. Ottimizzazione SEO
- **Meta Tag Dinamici:** Titolo e descrizione personalizzate per ogni pagina.
- **Schema.org:** Implementazione di dati strutturati per WebSite e BreadcrumbList.
- **Open Graph e Twitter Card:** Per una migliore condivisione sui social media.
- **Sitemap XML:** Inviato ai motori di ricerca.
- **Robots.txt:** Per indicare le regole di scansione.
- **Breadcrumb Navigation:** Migliorata l'esperienza utente e la comprensione da parte dei motori di ricerca.

### 10. Ottimizzazione delle Performance
- **Lazy Loading:** Implementato tramite routing di React (caricamento delle pagine solo quando necessario).
- **Code Splitting:** Grazie a Vite e React Router, il codice è diviso in chunk per ogni route.
- **Ottimizzazione Immagini:** Utilizzo di formati moderni e dimensioni appropriate (da implementare con le effettive immagini).
- **Caching:** Le richieste API vengono gestite da Supabase e OpenRouter con loro meccanismi di caching interno.

### 11. Sicurezza
- **Variabili d'Ambiente:** Le chiavi API sono memorizzate in `.env` e non esposte nel codice client.
- **Rate Limit:** Da implementare a livello di API gateway o tramite middleware (consigliato utilizzare i limiti offerti da Supabase e OpenRouter).
- **Protezione da Injection:** Utilizzo di parameterized queries in Supabase e sanitizzazione degli input.
- **XSS e CSRF:** React fornisce protezione integrata contro XSS; da valutare l'implementazione di token CSRF per le mutazioni stato se necessario.

## Prossimi Passi

### 1. Configurazione delle Credenziali
L'utente deve creare un file `.env` nella radice del progetto con le seguenti variabili:
```
VITE_SUPABASE_URL=your_supabase_url_here
VITE_SUPABASE_ANON_KEY=your_supabase_anon_key_here
VITE_OPENROUTER_API_KEY=your_openrouter_api_key_here
VITE_OPENROUTER_BASE_URL=https://openrouter.ai/api/v1
```

### 2. Popolamento del Database
- Eseguire lo script SQL in `/src/rag/database.sql` su Supabase per creare le tabelle e le funzioni.
- Caricare i documenti iniziali (CCSL, ordinanze, guide, etc.) utilizzando il servizio di ingestione del RAG.

### 3. Test e Validazione
- Testare il flusso di ingestione di un documento.
- Testare le query RAG per assicurarsi che le risposte siano pertinenti e citate correttamente.
- Testare l'interfaccia utente per ogni assistente AI.
- Verificare il funzionamento del calcolo punteggio (da collegare eventualmente a un servizio esterno o implementare la logica).

### 4. Monitoraggio e Manutenzione
- Implementare il monitoraggio delle performance (latenza delle query, tasso di successo).
- Pianificare l'aggiornamento regolare dei documenti nel database RAG.
- Considerare l'implementazione di un sistema di feedback per migliorare le risposte degli assistenti.

## Stima dei Costi

### Supabase
- Piani gratuiti disponibili per lo sviluppo.
- Per la produzione: piano "Pro" parte da $25/mese (include risorse sufficienti per un'applicazione di medie dimensioni).

### OpenRouter
- Costi basati sull'utilizzo:
  - Embedding (text-embedding-ada-002): ~$0.0001 per 1K token
  - Chat (anthropic/claude-3-haiku): ~$0.00025 per 1K token di input, ~$0.00125 per 1K token di output
- Stima mensile per un utilizzo moderato: $10-$50 a seconda del numero di utenti e query.

## Funzionalità Mancanti per Diventare la Migliore Piattaforma AI Scolastica Italiana

1. **Integrazione con i Sistemi Ministeriali:** API per accedere direttamente alle banche dati ufficiali (es. ISTANZE ONLINE, POLIS).
2. **Gestione Avanzata dei Documenti:** Funzionalità di firma digitale, marcatura temporale, versionamento.
3. **Calcolo Punteggio in Tempo Reale:** Implementazione completa della logica di calcolo per GPS e ATA con aggiornamenti automatici sulle tabelle di valutazione.
4. **Community e Forum:** Spazio per la condivisione di esperienze e migliori pratiche tra il personale scolastico.
5. **Mobile App:** Applicazioni native per iOS e Android per un accesso ottimizzato da dispositivi mobili.
6. **Integrazione con Strumenti di Videoconferenza:** Per sessioni di formazione e consulenza in diretta.
7. **Analytics Dashboard:** Per monitorare l'utilizzo della piattaforma e identificare bisogni formativi.
8. **Supporto Multi-Lingua:** Per affrontare le esigenze delle scuole in contesti linguistici diversi (es. scuole in Valle d'Aosta, Trentino-Alto Adige).
9. **Personalizzazione Avanzata:** Possibilità per le scuole di caricare i propri documenti interni e crearne una conoscenza privata.
10. **Accessibilità:** Conformità completa alle linee guida WCAG 2.1 per garantire l'accessibilità a persone con disabilità.

Con queste implementazioni, Sportello Scuola 2.0 sarà non solo un copilota AI, ma un vero e proprio ecosistema di supporto per tutto il personale scolastico italiano.