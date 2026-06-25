# MENTE ALVEARE — Sportello Scuola 2.0

## IDENTITÀ
Piattaforma ed-tech per docenti/ATA italiani. Competitor: Orizzonte Scuola, MIM. URL: https://sportelloscuola2-0.it
Stack: React 18 + TypeScript (strict) + Tailwind CSS + Vite + Supabase + Gemini 2.5 Flash.
Deploy: Netlify (push su main → build automatica). Git: github.com/sportelloscuola20/sportello-scuola-2.0.git

## ARCHITETTURA KNOWLEDGE GRAPH

### NODI NORMATIVI
- GPS 2026-2028: OM aggiornamento biennale, D.M. 1150/2026 (tabelle valutazione), D.M. 1234/2026
- ATA Terza Fascia: D.M. 89/2024, profili AA/AT/CS/OS/GU/CU/IF
- Reclutamento: D.Lgs. 59/2017, DPCM 4/8/2023 (30/36/60 CFU), D.D. 987-989/2026 (concorsi)
- TFA Sostegno: D.D. 1025/2026 (VIII ciclo)
- Valutazione GPS: Scaglioni conversione voto (60-100), formula 12 + (voto-76)*0.5, massimo 24pt

### NODI DATABASE (SUPABASE)
- `monitored_sources` (46 fonti: 10 A, 21 B, 3 C, 4 D, 3 E, 8 F) — stato, tipo (rss/web/api), frequenza
- `source_documents` (documenti grezzi da fonti, hash dedup)
- `intelligence_news` (notizie elaborate: 7 livelli, 8 categorie, target, criticita)
- `intelligence_scadenze` (scadenze: normativa, conseguenze, guida, regione, tipo)
- `knowledge_links` (grafo relazionale tra notizie)
- `profiles`, `user_scores`, `interpelli_alerts`, `news_cache`, `appointments`
- `intelligence_dashboard_stats` (vista live)

### NODI EDGE FUNCTIONS (Supabase)
- `ingest-news` (v3): prompt Gemini con 8 categorie utente + 8 categorie scadenze, rate limiter (14 rpm/1450 rpd)
- `monitor-sources` (v2): User-Agent Chrome, RSS + Atom parsing, HTML scraping USR con keyword extraction
- `create-checkout-session`, `stripe-webhook`, `send-email`

### NODI UI/UX (Design System)
- Primario: #235377 (brand-blu), Secondario: #1F915E (brand-verde), Accento: #D97706 (brand-ambra)
- Surface: #F8F9FA, Font: sistema sans-serif
- Componenti chiave: Header, Footer, Breadcrumb, Auth modale, Simulatori GPS/ATA, AI Chat, News/Deadlines/Hub, Archive

## STATO CORRENTE (commit 9608b16)

### COMPLETATO
- **Migration 001-009**: full DB schema, tassonomia 8 categorie, URL fonti verificati, colonna regione
- **AI Pipeline**: ingest-news (v3) con prompt Gemini per classificazione + estrazione scadenze, monitor-sources (v2) con scraping USR
- **Frontend Intelligence**: News.tsx, Deadlines.tsx, NewsPage.tsx, NewsHub.tsx, ArchivePage.tsx
  - 8 categorie filtro, criticità, impatto, target, 7 livelli produzione
  - Countdown scadenze, badge regione, filtro regione
  - Archivio con sorting (data/criticita/categoria) e ricerca full-text, tab context-aware (?tab=)
- **SourceMonitorDashboard**: Live stats fonti
- **Cron-job.org**: 2 job attivi — monitor-sources (ogni 60 min), ingest-news (ogni 3 min, batch=3)

### IN PROGRESS / DA FARE
- Popolare DB con notizie/scadenze reali (primo ciclo già partito)
- Centro Interpelli (alert manager + feed integrato)
- Rigenerare GEMINI_API_KEY e token Supabase esposti in chat
- Completare Fase 3 alert/filtering engine

### DECISIONI CHIAVE
- Tassonomia: da 6 categorie tecniche a 8 categorie utente finali
- Scadenze: solo con data limite + campi obbligatori pieni (normativa, conseguenze, guida) — trigger auto-generate disabilitato
- USR: 18 fonti livello B, scraping tramite keyword (GPS/Graduatorie/Decreto/Nomine/Ruoli/Immissioni)
- Badge A-F rimossi dall'interfaccia pubblica
- Archivio su route separata (non modale)
- Edge Functions batch ≤3 docs per evitare timeout 60s Free Tier

## REGOLE OPERATIVE
- Mai lasciare campi vuoti in scadenze (normativa, conseguenze, guida obbligatori)
- Ogni notizia deve avere fonte primaria verificabile
- Gemini model: gemini-2.5-flash, API v1beta, temperature 0.2, maxOutputTokens 8192
- Rate limiter ingest-news: 14 rpm, 1450 rpd (buffer 1/50)
- USR scraping: solo link con keyword mirate, altrimenti full-page fallback
- Build: `npm run build` (project/), typecheck: `npm run typecheck` (project/)
- Per deploy: commit + push su main → Netlify build automatica
- Migration SQL: applicare via Supabase Dashboard SQL Editor (no CLI locale)
