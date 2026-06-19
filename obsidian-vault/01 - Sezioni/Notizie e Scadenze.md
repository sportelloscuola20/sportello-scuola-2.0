# 📰 Notizie e Scadenze Istituzionali

Questa sezione gestisce l'acquisizione, la categorizzazione e la pubblicazione delle novità e delle scadenze amministrative pubblicate dal **Ministero dell'Istruzione e del Merito (MIM)**.

---

## ⚙️ Strategia di Ingestione Dati

Per alimentare la sezione notizie e lo scadenziario, la piattaforma implementa un sistema a tre livelli:
1.  **Feed RSS Ufficiali**: Lettura automatica dei canali di informazione MIM (es. comunicati stampa, avvisi).
2.  **Web Scraping Istituzionale (Lightweight)**: Script per il monitoraggio della sezione "Novità" e "Norme" del portale ministeriale, con rispetto delle policy dei file `robots.txt` del ministero.
3.  **Caricamento Amministrativo (Fallback)**: Pannello interno per inserire scadenze manualmente in caso di disfunzione dei servizi ministeriali.

---

## 🎨 Esperienza Utente (UI/UX)

La visualizzazione dei dati è ottimizzata per massimizzare la leggibilità ed evitare distrazioni:
*   **Espandibilità Inline**: Gli avvisi e le notizie possono essere letti interamente sulla stessa pagina tramite un menu a fisarmonica (`Accordion` in CSS Vanilla), evitando ricaricamenti di pagina non necessari.
*   **Timeline delle Scadenze**: Una linea del tempo visiva per tracciare le date di scadenza per la presentazione delle domande (es. GPS, mobilità, concorsi).
*   **Codici Colore di Urgenza (Urgency Alert)**:
    *   🔴 **Rosso (Priorità Alta)**: Mancano meno di 3 giorni alla scadenza.
    *   🟡 **Arancione (Priorità Media)**: Mancano tra i 3 e i 7 giorni.
    *   🟢 **Verde (Priorità Bassa)**: Più di 7 giorni rimanenti.

---

## 💻 Componenti React
*   `src/components/News.tsx` — Visualizzazione in homepage dell'anteprima delle notizie.
*   `src/components/Deadlines.tsx` — Griglia con scadenziario e filtri per categoria di personale (Docenti/ATA/Dirigenti).
*   `src/pages/NewsPage.tsx` e `src/pages/DeadlinesPage.tsx` — Pagine d'archivio complete con paginazione e ricerca.

---

## 🧠 Integrazione con Skill del Copilota

*   **`soft-skill`**: Traduzione del gergo ministeriale in sintesi chiare, formali e facilmente digeribili per gli utenti finali.
*   **`impeccable`**: Validazione formale dei link di provenienza ministeriale per evitare reindirizzamenti verso collegamenti rotti o non sicuri.
*   **`taste-skill`**: Transizioni CSS per l'espansione fluida delle schede notizie (`max-height` animato con transizione).

---

## 🔗 Riferimenti Istituzionali
*   Torna alla **[[00 - Benvenuto|Pagina Iniziale]]**.
*   Consulta la roadmap delle attività su **[[Attività Aperte (To-Do)]]**.
