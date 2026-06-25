---
title: "Notizie e Scadenze Intelligence (v2)"
aliases: ["News Intelligence", "Scadenziario Intelligence", "Notizie MIM", "Sistema Allerta"]
tags: [sezioni, notizie, scadenze, intelligence, fonti, gemini, pipeline]
date: 2026-06-25
status: published
---

# 📰 Sistema Intelligence Editoriale — Notizie e Scadenze (v2)

> **Stato: Attivo (26/06/2026)** — 46 fonti monitorate, pipeline AI su Gemini 2.5 Flash, cron-job.org ogni 60min + 3min.

## Architettura del Sistema

### 1. Pipeline Intelligence (AI — Gemini 2.5 Flash)

```
46 Fonti (RSS/Web/USR) ──[monitor-sources v2 ogni 60min]──► source_documents
                                                                    │
                                        [ingest-news v3 ogni 3min, batch=3]
                                                                    ▼
                                                              Gemini 2.5 Flash
                                                                    │
                                        ┌───────────────────────────┼───────────────────────────┐
                                        ▼                           ▼                           ▼
                                 intelligence_news         intelligence_scadenze      knowledge_links
                                    (8 categorie utente)    (8 categorie scadenze)    (grafo relazionale)
```

### 2. Intelligence Engine (`src/rag/intelligence-engine.ts`)
- **FONT_REGISTRY**: 46 fonti con URL verificati (migrazione 009). MIM → miur.gov.it, INVALSI → invalsicloud.it, INDIRE → indire.it.
- **Classificatori**: `deriveCriticalita()`, `getTargetFromCategory()`, `calcolaGiorniRimasti()`
- **Helper**: `formatDataItaliana()`, `getFonteInfo()`, `getFonteByUrl()`

### 3. Tipi Intelligence (`src/types/intelligence.ts`)
- `Criticalita`: bassa, media, alta, urgente, strategica
- `Impatto`: locale, regionale, nazionale
- `Platea`: limitata, ampia, intero_sistema
- `TargetUtente`: 16 target (docenti, ATA, DSGA, dirigenti, ecc.)
- `CategoriaScadenza`: 8 valori specifici diversi dalle notizie con costanti e colori
- `REGIONI_ITALIA`: costante per filtro regione
- `NotiziaIntelligence`: notizia con classificazione completa e 7 livelli di contenuto
- `ScadenzaIntelligence`: scadenza con normativa, conseguenze, guida, regione

### 4. Componenti React Intelligence

#### `src/components/News.tsx` (aggiornato)
- Fetch da DB con fallback mock intelligence
- Filtri: 8 categorie, criticità, ricerca testuale
- 7 livelli di produzione (da "Notizia Immediata" a "Scenari Futuri")
- Knowledge graph con link bidirezionali a notizie correlate
- Archive link context-aware (`?tab=notizie`)

#### `src/components/Deadlines.tsx` (aggiornato)
- Countdown real-time con colorazione urgenza (rosso ≤7gg, giallo ≤30gg, verde >30gg)
- 8 categorie scadenze statiche con badge colorato (`CATEGORIE_SCADENZA_COLORS`)
- Filtro regione dedicato
- Badge regione con icona Globe
- Normativa, conseguenze, guida operativa obbligatori
- Archive link context-aware (`?tab=scadenze`)

#### `src/components/NewsHub.tsx`
- Hub unificato con tab switching Notizie/Scadenze
- Badge live stats per tab

#### `src/pages/ArchivePage.tsx` (nuovo)
- Tabelle ordinabili con sorting per data/criticità/categoria
- Filtro categoria, ricerca testuale
- `useSearchParams()` per `?tab=` context-aware

## Categorie Notizie (8)

| # | Categoria |
|---|---|
| 1 | Bandi/Concorsi |
| 2 | Didattica/Formazione |
| 3 | Graduatorie |
| 4 | Contratti/ATA |
| 5 | Pensioni |
| 6 | Normative |
| 7 | Mobilità |
| 8 | Esami/INVALSI |

## Categorie Scadenze (8 — diverse dalle notizie)

| # | Categoria | Colore Badge |
|---|---|---|
| 1 | Iscrizioni/Bandi | `#3B82F6` (blu) |
| 2 | Aggiornamento Graduatorie | `#10B981` (verde) |
| 3 | Mobilità | `#F59E0B` (giallo) |
| 4 | Immissioni/Ruolo | `#8B5CF6` (viola) |
| 5 | Cessazioni/Pensionamenti | `#EF4444` (rosso) |
| 6 | Adempimenti/Sicurezza | `#F97316` (arancione) |
| 7 | Esami/Valutazioni | `#EC4899` (rosa) |
| 8 | Formazione Obbligatoria | `#14B8A6` (teal) |

## Regole Ferree

1. **Nessuna notizia senza fonte primaria verificabile** — Gemini classifica solo documenti da fonti reali.
2. **Scadenze solo con data limite esplicita** — Trigger `auto_generate_scadenze` disabilitato (era fonte falsi positivi). Campi normativa/conseguenze/guida obbligatori.
3. **Nessuna scadenza da dibattiti/editoriali/convegni** — Solo scadenze amministrative MIM.
4. **Nessun badge A-F nell'interfaccia pubblica** — Semaforo fonte solo nel monitoraggio interno.
5. **Nessun link esterno nelle notizie** — Consumo tutto in-platform per retention.
6. **Batch ingest ≤3 documenti** — Limite timeout 60s Edge Functions Free Tier.

## Target di Riferimento (16 categorie)

Docenti (ruolo/sostegno/religione), ATA (amministrativi/tecnici/ausiliari/collaboratori), DSGA, Dirigenti Scolastici, Personale Educativo, Infermieristico, Assistenti alla Comunicazione, ITP, Neoassunti/anno di prova, Suppleenti/GPS, Tutti.

## Collegamenti

- [[Core/Architettura e Stato]] — Infrastruttura e routing
- [[Competenze/Architettura delle Fonti]] — Repository 46 fonti
- [[Diari/Attività Aperte (To-Do)]] — Prossimi step
- [[Benvenuto|Pagina Iniziale]]
