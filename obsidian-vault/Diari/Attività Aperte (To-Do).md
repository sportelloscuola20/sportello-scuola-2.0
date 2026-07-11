---
title: "Attività Aperte (To-Do) — v2"
aliases: ["To-Do", "Task List", "Roadmap", "Attività"]
tags: [diari, todo, roadmap, attività, intelligence, cron, deployment]
date: 2026-06-25
status: published
---

# 📋 Attività Aperte (To-Do) — v2

## ✅ Completato (Giugno 2026)

### Pipeline Intelligence
- [x] `src/types/intelligence.ts` — Tipi per criticità, impatto, target, 8 categorie scadenze, regioni
- [x] `src/rag/intelligence-engine.ts` — FONT_REGISTRY con 46 fonti URL verificati, helper
- [x] `src/components/News.tsx` — 8 categorie filtro, 7 livelli, knowledge graph, context-aware archive link, HH:MM timestamp, external filter props
- [x] `src/components/Deadlines.tsx` — 8 categorie statiche, filtro regione, badge regione, context-aware archive link, external filter props
- [x] `src/components/NewsHub.tsx` — Tab switcher Notizie/Scadenze, gestione filtri condivisi per homepage
- [x] `src/pages/ArchivePage.tsx` — Archivio con `useSearchParams()`, sorting, filtro, ricerca
- [x] `src/pages/NewsPage.tsx` — Dashboard intelligence con live stats e legenda categorie

### Edge Functions
- [x] `monitor-sources` v2 → v2.1 — Headers browser reali (Accept, Accept-Language, Referer, Connection), anti-cache forzato (Cache-Control no-cache, Pragma no-cache, Expires 0), retry con backoff per 502/503/504, Referer dinamico per dominio USR, algoritmo fallback esteso (tutti i link pagina → filtro navigazione → keyword slice)
- [x] `ingest-news` v3 → v3.1 — Atomic try-catch per-documento con timeout 25s (Promise.race), batch default 10 (max 50), error logging atomico, status='failed' su fallimento

### Database & Migrazioni
- [x] **Migration 009**: URL 46 fonti verificati (MIM, INVALSI, INDIRE, sindacati, 18 USR). Trigger auto_generate_scadenze disabilitato. Colonna regione su intelligence_scadenze. Indice idx_intelligence_scadenze_regione.
- [x] Migrazioni 001-008 eseguite (schema, RLS, intelligence, interpelli, area riservata)

### Deploy & Schedulazione
- [x] **cron-job.org**: 2 job attivi — monitor-sources (ID 7908890, ogni 60min), ingest-news (ID 7908893, ogni 3min, batch=10 — aggiornato da 3)
- [x] **Netlify**: Deploy automatico su push main (commit 9608b16 + 079ff7c + a2c942e)
- [x] **Hive Mind**: `.claude/CLAUDE.md`, `AGENTS.md` aggiornati
- [x] **Build TypeScript**: OK (2612 moduli). Typecheck: solo 2 pre-esistenti (setShowAll unused)

### Altro
- [x] Login/Auth bug fixing (400 error, race condition, extension noise)
- [x] Backup completo del progetto
- [x] Ristrutturazione vault Obsidian
- [x] Unificazione supabaseClient, eliminazione ProtectedRoute, estrazione knowledge-base.ts
- [x] Sostituzione dati mock InterpelliPage con query Supabase
- [x] Centro Interpelli Fase 1-2 completata (DB, rotte, pagina con filtri e paywall)

## 🎯 In Attesa

### 🔔 Fase 3: Funzioni Avanzate
- [ ] **Gestore Alert** (`InterpelliAlertManager.tsx`): salvataggio codici classe concorso, notifiche
- [ ] **Feed Integrato News/Scadenze** (`NewsScadenzeFeed.tsx`): unione con espansione interna

### Pipeline AI
- [ ] **Verificare primo ciclo** monitor-sources + ingest-news (batch=10, timeout 25s per doc)
- [ ] **Monitorare 503 cold start** Edge Functions e ottimizzare se necessario
- [ ] **Rigenerare API key Gemini** su AI Studio (esposta in chat)
- [ ] **Rigenerare token Supabase** `sbp_237a40bc...` (esposto in chat)

---

## 🔗 Link Correlati
- [[Sezioni/Notizie e Scadenze]] — Stato intelligence
- [[Core/Architettura e Stato]] — Infrastruttura
- [[Competenze/Architettura delle Fonti]] — 46 fonti
- [[Benvenuto|Pagina Iniziale]]
