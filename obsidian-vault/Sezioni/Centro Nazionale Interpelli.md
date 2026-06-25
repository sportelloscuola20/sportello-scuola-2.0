---
title: "Centro Nazionale Interpelli"
aliases: ["Interpelli", "Centro Interpelli", "Sportello Interpelli"]
tags: [sezioni, interpelli, supplenze, reclutamento]
date: 2026-06-24
status: published
---

# 📬 Centro Nazionale Interpelli — Specifiche Istituzionali

Il **Centro Nazionale Interpelli** è lo sportello unico digitale progettato per centralizzare il monitoraggio e la candidatura per le supplenze temporanee pubblicate dalle istituzioni scolastiche italiane.

---

## ⚖️ Inquadramento Normativo ed Atti Ufficiali

Il sistema degli interpelli sostituisce la vecchia "Messa a Disposizione" (MAD) ed è disciplinato da:
*   **Ordinanza Ministeriale n. 88 del 16 maggio 2024 (Art. 13, comma 23)**: Dispone che, in caso di esaurimento delle graduatorie di istituto, le scuole pubblicano sul proprio sito istituzionale (Albo Pretorio) gli interpelli per la copertura dei posti vacanti, dandone contemporanea comunicazione all'Ufficio Scolastico Regionale (USR) competente.
*   **Circolare Ministeriale n. 115135 del 25 luglio 2024**: Chiarimenti sulle modalità di reclutamento e divieto di partecipazione per i docenti già destinatari di contratto a tempo determinato.

---

## 🎨 Requisiti Funzionali dell'Interfaccia

Il portale deve presentarsi con l'autorevolezza tipica dei siti della Pubblica Amministrazione:

### 1. Sistema di Filtri Ministeriali
L'utente deve poter filtrare gli interpelli attivi secondo i criteri standard del sistema scolastico:
*   **Ambito Territoriale (Regione / Provincia)**: Menù dinamici conformi all'anagrafica dei comuni italiani.
*   **Grado di Istruzione**: Infanzia, Primaria, Secondaria di I grado, Secondaria di II grado.
*   **Classe di Concorso**: Codici ufficiali MIM (es. `A022` - Italiano, storia e geografia nelle scuole medie; `A012` - Discipline letterarie negli istituti superiori; `ADSS` - Sostegno secondo grado).
*   **Tipologia di Posto**: Posto comune, Sostegno (UD, AD, EH, CH).

### 2. Schede Interpelli Smart
Ogni scheda rappresenta un bando attivo e include:
*   **Monitoraggio Scadenze**: Indicazione visiva dell'urgenza basata sulla data e ora limite fissata dalla scuola per l'invio della domanda.
*   **Supporto Candidatura (AI)**: Collegamento all'assistente AI con prompt precompilato: *"Genera una lettera di candidatura formale per l'interpello pubblicato dalla scuola [Nome Scuola] per la classe di concorso [Codice] rispettando le linee guida dell'OM 88/2024."*
*   **Verifica Requisiti**: Strumento per controllare se il proprio titolo di studio è coerente con la classe di concorso richiesta.

### 3. Servizio Alert e Notifiche
*   Configurazione di codici di interesse preferiti (es. `A022`, `A011`).
*   Aggiornamento automatico e notifica (via e-mail o pannello notifiche di Supabase) alla pubblicazione di un nuovo interpello corrispondente.

---

## 💻 Mappa dei Componenti e File di Riferimento

*   `src/pages/InterpelliPage.tsx` — Pagina contenitore (rotta `/interpelli`). Contiene filtri (provincia, classe concorso, tipo posto), risultati con paginazione, paywall premium, modale checkout Stripe.
*   `src/components/CentroInterpelli.tsx` — Componente teaser per la homepage con ricerca rapida e link a `/interpelli`.
*   `src/components/AreaRiservata/BandiWatch.tsx` — Monitoraggio bandi nell'area riservata (legge da `interpelli_nazionali`).
*   `src/types/database.ts` — Tipo `Bando` (mappa la tabella `interpelli_nazionali`) e `UtenteAbbonatoInterpelli`.

---

## 🧠 Integrazione con Skill del Copilota

*   **`taste-skill`**: Layout della scheda bando estremamente formale, con uso di icone istituzionali e spaziatura equilibrata per evitare il disordine visivo.
*   **`brandkit`**: Colori coordinati per i vari stati di scadenza (es. Rosso scuro istituzionale per bandi in scadenza entro 24 ore).
*   **`soft-skill`**: Formulazione formale dei testi esplicativi per l'utente non esperto.

## 🗄️ Stato Implementazione (24 Giugno 2026)

- **Fase 1 (Database & Router)**: ✅ Completata
  - Tabella `interpelli_nazionali` in `supabase/migrations/001_area_riservata.sql` (CREATE + RLS anonima in lettura)
  - Rotta `/interpelli` in `src/App.tsx`
  - Pagina `src/pages/InterpelliPage.tsx` con filtri, risultati, paginazione, paywall premium Stripe
- **Fase 2 (Dati Reali)**: ✅ Completata
  - `InterpelliPage.tsx` ora esegue `supabase.from('interpelli_nazionali').select('*')` all'avvio
  - Fallback automatico a mock data se Supabase non risponde
  - Tipo `Bando` allineato con lo schema DB esistente
  - `deriveStato()` computa stato `aperto`/`scaduto` dalla data

---

## 🔗 Riferimenti Istituzionali
- Torna alla **[[Benvenuto|Pagina Iniziale]]**
- Consulta lo **[[Competenze/Schema Database|Schema Database]]** per la tabella `interpelli_nazionali` (implementata) e `interpelli_alerts`
- Vedi lo stato di sviluppo in **[[Diari/Attività Aperte (To-Do)|Attività Aperte]]**
