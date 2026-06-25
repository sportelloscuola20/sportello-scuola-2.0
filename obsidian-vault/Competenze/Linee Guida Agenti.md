---
title: "Linee Guida per gli Agenti AI"
aliases: ["Linee Guida", "Regole Agenti", "Convenzioni Sviluppo"]
tags: [competenze, linee-guida, agenti, sviluppo, design]
date: 2026-06-24
status: published
---

# 📜 Linee Guida per gli Agenti AI

Questo documento contiene le regole e le convenzioni che **ogni agente AI** (incluso me stesso e gli agenti futuri) deve seguire rigorosamente quando lavora su questo codebase.

L'obiettivo è mantenere il codice pulito, garantire un design **premium** ed evitare di creare problemi tecnici o visivi.

---

## 🎨 1. Linee Guida di Design & UI/UX

La qualità visiva dell'applicazione è di fondamentale importanza. Il design deve apparire professionale, curato nei dettagli e moderno.

*   **Colori Coerenti**: Utilizzare sempre i tre colori primari del brand:
    *   Blu Sportello: `#235377`
    *   Verde Scuola: `#1F915E`
    *   Ottanio 2.0: `#2F797E`
*   **Avanzamento Visivo (Premium Look)**:
    *   Evitare colori generici o piatti (come rosso puro o blu puro). Usare gradienti morbidi e variazioni HSL o opacità.
    *   Usare bordi sottili con angoli arrotondati (`border-radius: 12px` o `16px`).
    *   Utilizzare l'effetto "Glassmorphism" (sfondo semi-trasparente con sfocatura: `backdrop-filter: blur(10px); background: rgba(255, 255, 255, 0.7);`) per pannelli moderni.
*   **Micro-animazioni**:
    *   Tutti i pulsanti e gli elementi interattivi devono avere transizioni morbide: `transition: all 0.2s ease-in-out;`.
    *   Aggiungere effetti al passaggio del mouse (`:hover`), come un leggero sollevamento o cambiamento di opacità.
*   **Tipografia**:
    *   Usare font moderni come *Inter*, *Outfit* o *Roboto* importati da Google Fonts, mai i caratteri predefiniti del browser (Times New Roman o Arial standard).
*   **Placeholder**:
    *   Non inserire mai immagini o testi segnaposto ("Lorem Ipsum" o scatole grigie vuote). Se serve un'immagine, usare strumenti di generazione o asset reali.

---

## 💻 2. Standard di Sviluppo del Codice

*   **Tecnologie Core**: React con **TypeScript**. Definire sempre i tipi per le Props e gli stati, evitando l'uso di `any`.
*   **CSS Vanilla**:
    *   Scrivere gli stili in file CSS dedicati (es. `src/index.css` o CSS Modules) per mantenere il controllo totale della grafica.
    *   Non installare o usare Tailwind CSS a meno che l'utente non lo richieda esplicitamente.
*   **Preservazione del Codice**:
    *   Non cancellare o modificare commenti esistenti, documentazione o codice funzionante non correlato al proprio compito.
    *   Seguire la struttura dei componenti già presente nel progetto.
*   **SEO & Accessibilità**:
    *   Ogni nuova pagina deve avere tag `title` e `meta` descrizione corretti.
    *   Usare tag semantici HTML5 (`<main>`, `<section>`, `<article>`, `<header>`, `<footer>`, `<aside>`).
    *   Garantire che tutti gli elementi interattivi (pulsanti, link) abbiano attributi `id` univoci per facilitare i test.

---

## 🤝 3. Procedura di Handoff (Passaggio di Consegne)

Ogni volta che finisci una sessione di lavoro:
1.  Aggiorna il **[[Diari/Diario del Progetto|Diario del Progetto]]** con una sintesi delle modifiche apportate.
2.  Aggiorna le **[[Diari/Attività Aperte (To-Do)|Attività Aperte]]**, segnando come completate quelle svolte ed eventualmente aggiungendo nuovi task scoperti durante l'implementazione.
3.  Non lasciare file a metà o con errori di compilazione TypeScript.
