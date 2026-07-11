# MENTE ALVEARE — Sportello Scuola 2.0

## IDENTITÀ
Piattaforma ed-tech per docenti/ATA italiani. Competitor: Orizzonte Scuola, MIM.
URL: https://sportelloscuola2-0.it
Stack: React 18 + TypeScript (strict) + Tailwind CSS + Vite + Supabase + Gemini 3.1 Flash Lite.
Deploy: Netlify (push su main → build automatica).
Git: github.com/sportelloscuola20/sportello-scuola-2.0.git

## ARCHITETTURA — 5 LAYER EMA

| Layer | Directory | Responsabilità |
|-------|-----------|----------------|
| **Foundation (L1)** | `components/foundation/`, `lib/` | Auth, Config, Security, API Client |
| **Data (L2)** | `types/`, `store/`, `data/` | Database Types, State Management |
| **Knowledge (L3)** | `rag/`, `components/knowledge/` | Knowledge Graph, RAG, Normative, FAQ |
| **Intelligence (L4)** | `rag/engine/`, `components/intelligence/` | AI Core, Monitor, Analysis |
| **Experience (L5)** | `components/ui/`, `pages/` | UI, Layout, Simulators, Services |

## ARCHITETTURA KNOWLEDGE GRAPH

### NODI NORMATIVI
- GPS 2026-2028: OM aggiornamento biennale
- ATA Terza Fascia: D.M. 89/2024, profili AA/AT/CS/OS/GU/CU/IF
- Reclutamento: D.Lgs. 59/2017, DPCM 4/8/2023 (30/36/60 CFU)
- TFA Sostegno: D.D. 1025/2026 (VIII ciclo)

### NODI DATABASE (SUPABASE)
- `monitored_sources` (46 fonti: 10 A, 21 B, 3 C, 4 D, 3 E, 8 F)
- `source_documents` (documenti grezzi, hash dedup)
- `intelligence_news` (notizie elaborate: 7 livelli, 8 categorie)
- `intelligence_scadenze` (scadenze: normativa, conseguenze, guida)
- `knowledge_links` (grafo relazionale tra notizie)
- `profiles`, `user_scores`, `interpelli_alerts`, `appointments`

### NODI EDGE FUNCTIONS
- `ingest-news` (v3): Gemini 3.1-flash-lite, 8 categorie + 8 scadenze, rate limiter
- `monitor-sources` (v2): User-Agent Chrome, RSS + Atom + HTML scraping

### NODI AI (GEMINI)
- Modello unico: gemini-3.1-flash-lite (free tier)
- RAG pipeline: Question → KG Search → Context → Response → Citations
- 6 componenti: Orchestrator, Retrieval, Reasoning, Citation, Context, Memory

### NODI UI/UX (Design System)
- Primario: #235377 (brand-blu)
- Secondario: #1F915E (brand-verde)
- Accento: #D97706 (brand-ambra)
- Surface: #F8F9FA, Font: sistema sans-serif

## STATO CORRENTE

### COMPLETATO
- Migration 001-009: full DB schema, tassonomia 8 categorie
- AI Pipeline: ingest-news (v3) + monitor-sources (v2)
- Frontend Intelligence: News, Deadlines, NewsHub, Archive
- Cron-job.org: 2 job attivi (monitor: 1min, ingest: 5min)

### IN PROGRESS
- Popolare DB con notizie/scadenze reali
- Centro Interpelli (alert manager + feed)
- Completare Fase 3 alert/filtering engine

### DECISIONI CHIAVE
- Tassonomia: 8 categorie utente finali
- Scadenze: solo con data limite + campi obbligatori pieni
- AI: solo Gemini 3.1-flash-lite (nessun OpenRouter)
- Badge A-F rimossi dall'interfaccia pubblica
- Archivio su route separata

## REGOLE OPERATIVE
- Mai lasciare campi vuoti in scadenze
- Ogni notizia deve avere fonte primaria verificabile
- Gemini: temperature 0.2, maxOutputTokens 16384
- Rate limiter: 10 RPM, 400 RPD
- Batch ingest: ≤3 docs per invocazione
- Build: `npm run build` (project/)
- Deploy: commit + push su main → Netlify
