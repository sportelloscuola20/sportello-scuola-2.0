---
title: "Architettura e Stato dell'Applicazione (v2)"
aliases: ["Architettura", "Stato App", "Mappa Codice", "Architettura Intelligence"]
tags: [core, architettura, codice, routing, intelligence, fonti, edge-functions]
date: 2026-06-25
status: published
---

# 🏗️ Architettura e Stato dell'Applicazione

Questo documento descrive la struttura del codice, il routing e il flusso di dati intelligence all'interno di **Sportello Scuola 2.0** (commit 079ff7c).

---

## 📂 Struttura Cartelle

```
project/
├── src/
│   ├── App.tsx — Rotte (react-router-dom v7)
│   ├── components/ — UI: News, Deadlines, NewsHub, Simulatori, AI Chat, Header, Footer
│   ├── pages/ — HomePage, NewsPage, ArchivePage, InterpelliPage, ScorePage, ecc.
│   ├── rag/ — intelligence-engine.ts (FONT_REGISTRY, helper, mock), retrieval.ts, knowledge-base.ts
│   └── types/ — intelligence.ts (8 categorie, target, scadenze, regioni)
supabase/
├── functions/ — ingest-news (v3), monitor-sources (v2), stripe-webhook, create-checkout, send-email
└── migrations/ — 001-009 (schema + intelligence + tassonomia + URL fonti)
```

## 🗺️ Rotte

| Route | Pagina | Descrizione |
|---|---|---|
| `/` | HomePage | Hero, NewsHub (tab notizie/scadenze), servizi |
| `/assistente/*` | AssistantPage | Chat AI Sindacalista |
| `/calcolo-punteggio` | ScorePage | Simulatore GPS/ATA |
| `/normative` | NormativePage | Archivio documenti normativi |
| `/notizie-scadenze` | **NewsPage** | Dashboard intelligence con live stats, legenda 8 categorie, NewsHub |
| `/notizie-scadenze/archivio` | **ArchivePage** | Archivio completo con tabelle, sorting, filtro, ricerca, `?tab=` context-aware |
| `/interpelli` | InterpelliPage | Centro Nazionale Interpelli con filtri e paywall |
| `/area-riservata/*` | AreaRiservataLayout | Punteggi, preferiti, documenti, bandi, abbonamento, impostazioni |
| `/faq`, `/contatti`, `/servizi` | Static pages | FAQ, contatti, servizi |

## 🧠 Pipeline Intelligence (AI — Gemini 3.1 Flash Lite)

```
46 Fonti (RSS/Web/USR)
    │ cron-job.org ogni 60min
    ▼
monitor-sources (Edge Function v2)
    ├── Fonti RSS → parse RSS/Atom → source_documents
    ├── Fonti Web non-USR → extractTextContent → source_documents
    └── Fonti USR → parseHTMLLinks(keyword: GPS/Graduatorie/Decreto/Nomine/Ruoli/Immissioni) → source_documents
    │
    │ cron-job.org ogni 3min (batch=3)
    ▼
ingest-news (Edge Function v3)
    ├── Prende documenti non elaborati da source_documents
    ├── Chiama Gemini 3.1 Flash Lite con prompt (8 categorie utente + 8 categorie scadenze)
    ├── Rate limiter: 14 rpm / 1450 rpd
    ├── Crea record in intelligence_news (7 livelli produzione)
    ├── Crea knowledge_links (grafo relazionale)
    └── Crea intelligence_scadenze (solo con campi obbligatori pieni)
    │
    ▼
Frontend (React)
    ├── News.tsx — Notizie con filtro 8 categorie, criticità, target, 7 livelli, knowledge graph
    ├── Deadlines.tsx — Scadenze con countdown, badge categoria, norma, conseguenze, guida, regione
    ├── ArchivePage.tsx — Tabelle ordinabili, filtro categoria, ricerca, sorting data/criticita/categoria
    └── NewsHub.tsx — Tab switcher Notizie/Scadenze con badge live stats
```

## ⚙️ Edge Functions

| Funzione | Versione | Descrizione | Schedulazione |
|---|---|---|---|
| `monitor-sources` | v2 | Scraping 46 fonti con User-Agent Chrome, parsing RSS/Atom/HTML, keyword extraction USR | cron-job.org ogni 60min |
| `ingest-news` | v3 | Classificazione Gemini + estrazione scadenze con rate limiter, validazione campi | cron-job.org ogni 3min (batch=3) |
| `create-checkout-session` | - | Stripe checkout session |
| `stripe-webhook` | - | Webhook pagamenti Stripe |
| `send-email` | - | Invio email newsletter/alert |

## 🔗 Link Correlati
- [[Sezioni/Notizie e Scadenze]] — Dettaglio intelligence
- [[Competenze/Architettura delle Fonti]] — Repository 46 fonti
- [[Diari/Attività Aperte (To-Do)]] — Prossimi step
- [[Benvenuto|Pagina Iniziale]]**
