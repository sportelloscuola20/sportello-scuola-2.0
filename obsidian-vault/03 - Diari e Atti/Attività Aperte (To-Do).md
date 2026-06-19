# 📋 Attività Aperte (To-Do)

Questa nota contiene l'elenco dei compiti necessari per completare l'implementazione del **Centro Interpelli Nazionale** e altri miglioramenti di Sportello Scuola 2.0.

---

## 🎯 Priorità Attuale: Centro Interpelli Nazionale

### 🗄️ Fase 1: Database & Rotte
*   [ ] Estendere `src/rag/database.sql` inserendo le tabelle `interpelli` e `interpelli_alerts`.
*   [ ] Creare la nuova rotta `/interpelli` in `src/App.tsx`.
*   [ ] Creare la pagina contenitore `src/pages/InterpelliPage.tsx`.

### 🎨 Fase 2: Componenti dell'Interfaccia (UI Premium)
*   [ ] **Pannello Filtri (`src/components/InterpelliFilters.tsx`)**:
    *   Filtri a tendina per Regione e Provincia.
    *   Filtro Classe di Concorso (A012, A022, ecc.) e Tipologia Posto.
*   [ ] **Schede Smart (`src/components/InterpelliCard.tsx`)**:
    *   Layout elegante con loghi/icone per tipo di posto.
    *   Visualizzazione chiara della scadenza (evidenziatore rosso se mancano <3 giorni).
    *   Pulsante *"Supporto Candidatura"* (apre chat AI con prompt pre-compilato).
    *   Pulsante *"Invio Documentazione"* (apre chat AI con prompt pre-compilato).
*   [ ] **Lista Interpelli (`src/components/InterpelliList.tsx`)**:
    *   Barra di ricerca testuale integrata.
    *   Gestione dei filtri attivi e visualizzazione dinamica delle schede.

### 🔔 Fase 3: Funzioni Avanzate & News
*   [ ] **Gestore Alert (`src/components/InterpelliAlertManager.tsx`)**:
    *   Consenti all'utente di salvare i propri codici classe di concorso per attivare le notifiche.
*   [ ] **Feed Integrato News/Scadenze (`src/components/NewsScadenzeFeed.tsx`)**:
    *   Unione di scadenze e news.
    *   Funzione di espansione interna per leggere le notizie senza cambiare pagina.
*   [ ] **Integrazione Navigazione**:
    *   Aggiungere il link "/interpelli" nel menu principale dell'Header.

---

## 🔗 Link Correlati
*   Vedi i dettagli dei requisiti su **[[Centro Interpelli Nazionale]]**.
*   Vedi come strutturare il DB su **[[Schema Database]]**.
*   Torna alla **[[00 - Benvenuto|Pagina Iniziale]]**.
