---
title: "Attività Aperte (To-Do)"
aliases: ["To-Do", "Task List", "Roadmap", "Attività"]
tags: [diari, todo, roadmap, attività]
date: 2026-06-24
status: published
---

# 📋 Attività Aperte (To-Do)

Questa nota contiene l'elenco dei compiti necessari per completare l'implementazione del **Centro Interpelli Nazionale** e altri miglioramenti di Sportello Scuola 2.0.

---

## ✅ Completato: Sistema Intelligence Notizie e Scadenze
*   [x] `src/types/intelligence.ts` — Tipi per criticità, impatto, target, fonti, 7 livelli produzione
*   [x] `src/rag/intelligence-engine.ts` — Motore con FONT_REGISTRY, dati mock intelligence, helper
*   [x] `src/components/News.tsx` — Riscritto con badge fonte/criticità/target, 7 livelli, data journalism
*   [x] `src/components/Deadlines.tsx` — Riscritto con normativa, conseguenze, soggetti, guida operativa
*   [x] `src/pages/NewsPage.tsx` — Dashboard intelligence con architettura fonti e regola validazione

## 🎯 Priorità Attuale: Centro Interpelli Nazionale

### 🗄️ Fase 1: Database & Rotte — ✅ COMPLETATA
*   [x] Tabella `interpelli_nazionali` creata in `supabase/migrations/001_area_riservata.sql` con RLS anonima in lettura.
*   [x] Rotta `/interpelli` in `src/App.tsx`.
*   [x] Pagina contenitore `src/pages/InterpelliPage.tsx` con filtri, risultati, paginazione e paywall premium.

### 🎨 Fase 2: Dati Reali (Supabase) — ✅ COMPLETATA
*   [x] Sostituiti dati mock in `InterpelliPage.tsx` con query `supabase.from('interpelli_nazionali').select('*')`.
*   [x] Fallback automatico a mock data se Supabase non risponde.
*   [x] Tipo `Bando` allineato allo schema DB esistente (`interpelli_nazionali`).

### 🔔 Fase 3: Funzioni Avanzate & News
*   [ ] **Gestore Alert (`src/components/InterpelliAlertManager.tsx`)**:
    *   Consenti all'utente di salvare i propri codici classe di concorso per attivare le notifiche.
    *   Tabella `interpelli_alerts` già definita in `supabase_schema.sql` (pronta).
*   [ ] **Feed Integrato News/Scadenze (`src/components/NewsScadenzeFeed.tsx`)**:
    *   Unione di scadenze e news.
    *   Funzione di espansione interna per leggere le notizie senza cambiare pagina.

---

## ✅ Completate
*   [x] Login/Auth bug fixing (400 error, race condition, extension noise) — Giugno 2026
*   [x] Backup completo del progetto — 24 Giugno 2026
*   [x] Ristrutturazione vault Obsidian — 24 Giugno 2026
*   [x] Unificazione `supabaseClient` (`rag/supabaseClient.ts` → re-export da `lib/supabaseClient.ts`) — 24 Giugno 2026
*   [x] Estrazione knowledge base RAG in `rag/knowledge-base.ts` (25+ handler su 5 aree tematiche) — 24 Giugno 2026
*   [x] Eliminazione `ProtectedRoute.tsx` (auth handle direttamente in `AreaRiservataLayout.tsx`) — 24 Giugno 2026
*   [x] Sostituzione dati mock InterpelliPage con query Supabase a `interpelli_nazionali` — 24 Giugno 2026

---

## 🔗 Link Correlati
- Vedi i dettagli dei requisiti su **[[Sezioni/Centro Nazionale Interpelli|Centro Interpelli Nazionale]]**
- Vedi come strutturare il DB su **[[Competenze/Schema Database|Schema Database]]**
- Torna alla **[[Benvenuto|Pagina Iniziale]]**
