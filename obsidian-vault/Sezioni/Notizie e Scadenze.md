---
title: "Notizie e Scadenze Intelligence"
aliases: ["News Intelligence", "Scadenziario Intelligence", "Notizie MIM", "Sistema Allerta"]
tags: [sezioni, notizie, scadenze, intelligence, fonti, data-journalism]
date: 2026-06-24
status: published
---

# 📰 sistema Intelligence Editoriale — Notizie e Scadenze

Questa sezione gestisce il **sistema di intelligence editoriale** per l'acquisizione, classificazione, validazione e pubblicazione delle novità normative e scadenze amministrative del sistema scolastico italiano.

Il sistema si basa su due framework operativi:
- **Modello Editoriale e CEO** — Standard redazionali, target, produzione a 7 livelli, sistema di allerta
- **Architettura delle Fonti** — Piramide di affidabilità A-F, regola di validazione in 6 passi

---

## Architettura del Sistema

### 1. Intelligence Engine (`src/rag/intelligence-engine.ts`)
Motore centrale che fornisce:
- **FONT_REGISTRY**: Repository completo di tutte le fonti per livello (A-F) con URL e peso affidabilità
- **Classificatori**: `deriveCriticalita()`, `getTargetFromCategory()`, `calcolaGiorniRimasti()`
- **Dati Mock Intelligence**: 6 notizie e 5 scadenze pre-classificate con tutti i metadati
- **Data Journalism**: `generaDatiDataJournalism()` — statistiche su reclutamento e formazione
- **Helper**: `formatDataItaliana()`, `getFonteInfo()`, `getFonteByUrl()`

### 2. Tipi Intelligence (`src/types/intelligence.ts`)
- `Criticalita`: bassa, media, alta, urgente, strategica
- `Impatto`: locale, regionale, nazionale
- `Platea`: limitata, ampia, intero_sistema
- `TargetUtente`: 16 target (docenti, ATA, DSGA, dirigenti, ecc.)
- `LivelloFonte`: A (100/100) → F (60/100)
- `LivelloProduzione`: 1 (Notizia) → 7 (Scenari Futuri)
- `NotiziaIntelligence`: notizia con classificazione completa e 7 livelli di contenuto
- `ScadenzaIntelligence`: scadenza con normativa, conseguenze, soggetti, guida operativa

### 3. Componenti React Intelligence

#### `src/components/News.tsx` (riscritto)
- Fetch da Supabase `news_cache` + fallback ai dati mock intelligence
- Badge: livello fonte (A-F con codice colore), criticità, impatto
- Tag target personalizzati (docenti, ATA, DSGA, ecc.)
- Espansione a 7 livelli di produzione:
  1. Notizia Immediata
  2. Analisi
  3. Impatto Operativo
  4. Domande Frequenti
  5. Checklist
  6. Cronologia Normativa
  7. Scenari Futuri
- Sezione "Fonte Primaria" con citazione e link
- Data journalism dashboard toggle (statistiche, benchmark, trend)
- Filtri: categoria, criticità, ricerca testuale

#### `src/components/Deadlines.tsx` (riscritto)
- Dati strutturati con normativa, conseguenze, soggetti coinvolti
- Badge priorità e impatto
- Sezione "Riferimento Normativo" con citazione ufficiale
- Sezione "Conseguenze della Non-Azione" (banner rosso)
- Guida operativa con link POLIS
- Countdown real-time con giorni rimanenti
- Filtri: tipo, priorità

#### `src/components/NewsHub.tsx`
- Hub unificato con tab switching Notizie/Scadenze
- Usato sia in HomePage (compact) che in NewsPage

#### `src/pages/NewsPage.tsx` (riscritto)
- Dashboard intelligence completa:
  - Header con badge: Fonti Primarie, 7 Livelli, Target, Allerta, Data Journalism
  - Architettura delle Fonti a scomparsa (piramide A-F con pesi e descrizioni)
  - Regola di Validazione in 6 passi

---

## Sistema di Allerta

Classificazione obbligatoria per ogni contenuto:

| Attributo | Valori |
|---|---|
| Criticità | Bassa, Media, Alta, Urgente, Strategica |
| Impatto | Locale, Regionale, Nazionale |
| Platea | Limitata, Ampia, Intero sistema |
| Target | 16 categorie (Docenti, ATA, DSGA, ecc.) |
| Livello Fonte | A (100) → F (60) |

---

## Regola di Validazione (6 Passi)

1. Allerta precoce (Livello F — media settore)
2. Verifica fonte primaria (Livello A — MIM, G.U., Normattiva)
3. Verifica effetti (Livello B — INVALSI, INDIRE, ISTAT)
4. Verifica impatti giuridici (Livello C — TAR, Consiglio di Stato)
5. Verifica impatti europei (Livello D — UE, OECD, UNESCO)
6. Ricerca scientifica (Livello E — ERIC, PubMed)

**Nessuna notizia senza fonte primaria verificabile.**

---

## Modello di Produzione (7 Livelli)

1. **Notizia Immediata** — Il fatto nudo
2. **Analisi** — Contesto e significato
3. **Impatto Operativo** — Cosa cambia nella pratica
4. **Domande Frequenti** — FAQ mirate
5. **Checklist** — Azioni concrete
6. **Cronologia Normativa** — Genesi del provvedimento
7. **Scenari Futuri** — Evoluzioni plausibili

---

## Data Journalism

Ogni dato è: verificabile, aggiornato, contestualizzato.

Sezioni attive:
- **Andamento Reclutamento 2026**: posti concorso, TFA, iscritti GPS
- **Trend Abilitazioni e Formazione**: percorsi 60 CFU, formazione SOFIA

---

## Fonti Monitorate

### Livello A (100/100)
- Gazzetta Ufficiale, Normattiva, MIM, Parlamento, ARAN, INPS, Funzione Pubblica

### Livello B (95/100)
- INVALSI, INDIRE, ISTAT

### Livello C (98/100)
- Giustizia Amministrativa, Corte Costituzionale, Cassazione

### Livello D (95/100)
- Commissione Europea, OECD, UNESCO, WHO

### Livello E (90/100)
- ERIC, PubMed, Google Scholar

### Livello F (60/100) — Allerta precoce
- Orizzonte Scuola, Tecnica della Scuola, FLC CGIL, CISL, UIL, SNALS, ANIEF

---

## Collegamenti

- [[Modello Editoriale e CEO]] — Playbook editoriale completo
- [[Architettura delle Fonti]] — Repository fonti e validazione
- [[Benvenuto|Pagina Iniziale]]
