# AGENTS — Sportello Scuola 2.0

## Ecosistema

```
Open Project/
├── EMA.md              ← Enterprise Master Architecture (fonte strategica)
├── SAPM.md             ← Solution Architecture & Project Management
├── ADR.md              ← Architecture Decision Records (registro)
├── AGENTS.md           ← Questo file (comandi e architettura operativa)
├── .claude/CLAUDE.md   ← Mente Alveare (knowledge graph agenti)
├── project/            ← Applicazione (React + Supabase + Gemini)
│   ├── src/
│   │   ├── components/
│   │   │   ├── foundation/   ← Layer 1: Auth, Config, Security
│   │   │   ├── knowledge/    ← Layer 3: Normative, FAQ, News
│   │   │   ├── intelligence/ ← Layer 4: AI, Monitor
│   │   │   ├── ui/           ← Layer 5: Layout, Simulators, News, Services
│   │   │   └── AreaRiservata/
│   │   ├── pages/
│   │   ├── lib/
│   │   ├── rag/              ← Knowledge + Intelligence (Gemini)
│   │   ├── store/
│   │   ├── types/
│   │   └── data/
│   └── supabase/
│       ├── functions/
│       └── migrations/
└── obsidian-vault/     ← Mente Alveare (Obsidian)
```

## Comandi

| Azione | Comando |
|--------|---------|
| Build | `cd project && npm run build` |
| Typecheck | `cd project && npm run typecheck` |
| Dev server | `cd project && npm run dev` |
| Deploy | commit + push su main (Netlify build automatica) |
| Deploy functions | `supabase functions deploy <fn> --no-verify-jwt --workdir "project"` |
| Migration | `supabase db push --workdir "project"` |

## Architettura Pipeline

### Flusso
```
cron-job.org (1 min)
  └─→ monitor-sources (solo scrittura coda)
        └─→ source_documents (DB) [queue: processing_started_at lock]

cron-job.org (5 min)
  └─→ ingest-news (adaptive leaky bucket)
        ├─→ intelligence_news (DB) [atomic write via RPC]
        ├─→ intelligence_scadenze (DB) [atomic write via RPC]
        └─→ gemini_calls_log (DB) [rate tracking]
```

### Cron-job.org
| Nome | Job ID | URL | Intervallo |
|---|---|---|---|
| `monitor-sources` | 7908890 | `https://xawemvuralsgwvypiufl.supabase.co/functions/v1/monitor-sources` | 1 min |
| `ingest-news` | da creare | `https://xawemvuralsgwvypiufl.supabase.co/functions/v1/ingest-news` | 5 min |

### Edge Functions
| Function | Modello | Note |
|---|---|---|
| `ai-sindacalista` | gemini-3.1-flash-lite | Chat sindacale RAG, knowledge base server-side, citations |
| `ingest-news` | gemini-3.1-flash-lite | Classificazione + estrazione scadenze |
| `monitor-sources` | — | RSS/HTML scraping, keyword extraction |
| `test-gemini` | — | Health check Gemini API |
| `send-email` | — | Email via Resend |
| `create-portal-session` | — | Stripe portal session |

### AI — Gemini
| Modello | RPM | RPD | Noi |
|---|---|---|---|
| `gemini-3.1-flash-lite` | 15 | 500 | RPM=10, RPD=400 (buffer 20%) |

### Database — Tabelle chiave
- `monitored_sources`: fonti attive (54 totali, 20 attive, 34 in errore/bloccate)
- `source_documents`: coda documenti (lock via `processing_started_at`)
- `intelligence_news`: notizie processate (~8,800+)
- `intelligence_scadenze`: scadenze estratte (~155)
- `knowledge_links`: grafo relazionale (467 link, funzione `get_related_news()` per graph traversal)
- `documenti_normativi`: documenti normativi (14 seed)
- `interpelli_nazionali`: bandi/concorsi (11 seed)
- `hub_universita`: hub universitari (10 seed)
- `chat_conversations`: conversazioni chat utente (con persisted history)
- `chat_messages`: messaggi chat (con latency_ms, citations JSONB)
- `page_analytics`: analytics piattaforma (page_view, search, feature_use, chat_message, simulator_run)
- `profiles`, `user_scores`, `gemini_calls_log`

### Categorie VALIDE (CHECK constraint)
1. Bandi, Concorsi e Selezioni
2. Didattica, Formazione e Innovazione
3. Graduatorie (GPS, GAE, d'Istituto)
4. Contratti, Salari e Personale ATA
5. Pensioni, Previdenza e Welfare
6. Normative, Note e Circolari Ministeriali
7. Mobilità, Assegnazioni e Utilizzazioni
8. Esami di Stato e Valutazioni (INVALSI)

### Modello di Produzione a 6 Livelli
1. Il Fatto — Cosa Succede
2. Perché è Importante — Contesto
3. Cosa Cambia per Te — Impatto Operativo
4. Dubbi Comuni — FAQ
5. Checklist Operativa — Cosa Fare Subito
6. Riferimenti Normativi e Prossime TAPE

### Scadenze Gatekeeper
1. Certezza Temporale: data esatta?
2. Pertinenza Target: personale scolastico?
3. Azionabilità: azione richiesta all'utente?

## EMA → Codice — Mapping Layer

| EMA Layer | Directory | Responsabilità |
|-----------|-----------|----------------|
| Foundation (L1) | `components/foundation/`, `lib/` | Auth, Config, Security |
| Data (L2) | `types/`, `store/`, `data/` | Database, Types, State |
| Knowledge (L3) | `rag/`, `components/knowledge/` | Knowledge Graph, RAG, Normative |
| Intelligence (L4) | `rag/engine/`, `components/intelligence/` | AI Core, Monitor, Analysis |
| Experience (L5) | `components/ui/`, `pages/` | UI, Layout, Simulators, Services |

## Regole
- Gemini è l'unico provider AI (no OpenRouter)
- Modello: gemini-3.1-flash-lite, temperature 0.2, maxOutputTokens 16384
- Rate limiter: 10 RPM, 400 RPD
- Batch ingest: ≤3 docs per invocazione
- Build: `npm run build` (project/)
- Deploy: commit + push su main → Netlify
