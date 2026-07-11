---
title: "Home Page — Portale Principale"
aliases: ["Homepage", "Pagina Iniziale del Portale"]
tags: [core, portale, homepage]
date: 2026-06-24
status: published
---

# 🏫 Portale Principale — Home Page

La **Home Page** costituisce l'interfaccia d'ingresso istituzionale per la piattaforma. Ha l'obiettivo di orientare immediatamente l'utente e di fornire l'accesso rapido ai servizi digitali di supporto.

---

## 👥 Ruoli Utente e Destinatari

L'architettura della pagina è suddivisa per servire tre categorie principali di personale scolastico:
1.  **Docenti**: Accesso a graduatorie GPS, calcolatori di punteggio titoli ed esami, e monitoraggio degli interpelli per supplenze.
2.  **Personale ATA**: Supporto per le graduatorie di terza fascia, profili professionali (collaboratori, assistenti amministrativi/tecnici) e scadenziario domande.
3.  **Dirigenti Scolastici**: Strumenti di supporto per la redazione di circolari, consultazione CCNL e reclutamento tramite interpello straordinario.

---

## 🏗️ Struttura dei Componenti

La pagina è assemblata tramite i seguenti moduli React in `src/components/`:
*   **`Header.tsx`**: Contiene il logo istituzionale del brand, la barra di navigazione con collegamenti ipertestuali alle varie aree e la gestione del profilo utente.
*   **`Breadcrumb.tsx`**: Navigazione a briciole di pane per il tracciamento del percorso dell'utente nel rispetto delle linee guida di usabilità PA.
*   **`Hero.tsx`**: Sezione d'impatto visivo con il titolo *"Il copilota AI per Docenti, ATA e Dirigenti"* e i pulsanti di azione primaria (avvio simulazione e chat assistente).
*   **`News.tsx` e `Deadlines.tsx`**: Anteprime dei feed ministeriali e delle scadenze imminenti.
*   **`Footer.tsx`**: Piè di pagina con i riferimenti legali, note sul copyright, privacy policy e link di accessibilità AGID.

---

## 🎨 Integrazione con Skill di Design e Brand

La Home Page implementa i seguenti standard in linea con le competenze degli agenti AI:
*   **`brandkit`**: Utilizzo rigoroso dei codici colore ufficiali (Blu `#235377`, Verde `#1F915E`, Ottanio `#2F797E`).
*   **`taste-skill`**: Transizioni CSS fluide (`transition: all 0.3s ease`), ombre morbide per evidenziare le schede al passaggio del mouse (`box-shadow`), e layout a griglia flessibile (Flexbox/Grid).
*   **`minimalist-skill`**: Ampio spazio bianco (padding e margin consistenti) per ridurre l'affaticamento visivo e focalizzare l'attenzione dell'utente sulle azioni principali.

---

## 🔗 Riferimenti Istituzionali
- Torna alla **[[Benvenuto|Pagina Iniziale]]**
- Consulta le linee guida visive in **[[Competenze/Mappatura delle Competenze (Skills)|Mappatura delle Competenze]]**
