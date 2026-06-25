---
title: "Schema Database (Supabase)"
aliases: ["Schema DB", "DB Schema", "Tabelle Database", "PostgreSQL"]
tags: [competenze, database, supabase, sql, schema]
date: 2026-06-24
status: published
---

# 🗄️ Schema Database (Supabase)

Il database di **Sportello Scuola 2.0** è ospitato su **Supabase** (PostgreSQL) e include il supporto per i vettori tramite l'estensione `pgvector` per consentire le funzionalità di RAG (AI basata sui documenti caricati).

---

## 🛠️ Tabelle Esistenti

### 👥 Utenti e Abbonamenti
*   **`users`**: Informazioni sugli account degli utenti registrati.
    *   `id` (UUID, Chiave Primaria)
    *   `email` (TEXT, Unica)
    *   `password_hash` (TEXT, Nullo se usa login social/OAuth)
    *   `role` (TEXT: 'docente', 'ata', 'dirigente', 'sindacale', 'admin')
    *   `created_at` / `updated_at` (TIMESTAMP)
*   **`subscriptions`**: Stato degli abbonamenti premium degli utenti.
    *   `id` (UUID, P.K.)
    *   `user_id` (UUID, Chiave Esterna a `users.id`)
    *   `plan` (TEXT: 'free', 'pro', 'enterprise')
    *   `status` (TEXT: 'active', 'canceled', 'past_due', 'unpaid')

### 📄 RAG / Documentazione e AI
*   **`documents`**: Documenti e normative caricate per addestrare l'AI.
    *   `id` (UUID, P.K.)
    *   `title` (TEXT)
    *   `content` (TEXT)
    *   `source` (TEXT)
    *   `metadata` (JSONB)
*   **`document_chunks`**: Frammenti di testo ricavati dai documenti (necessari per la ricerca semantica).
    *   `id` (UUID, P.K.)
    *   `document_id` (UUID, F.K. a `documents.id`)
    *   `content` (TEXT)
    *   `chunk_index` (INTEGER)
*   **`embeddings`**: I vettori matematici dei frammenti per la ricerca semantica.
    *   `id` (UUID, P.K.)
    *   `chunk_id` (UUID, F.K. a `document_chunks.id`)
    *   `embedding` (VECTOR(1536) - per i vettori text-embedding)
    *   `model` (TEXT, modello di embedding usato)

### 💬 Sessioni di Chat
*   **`chat_sessions`** e **`chat_messages`**: Cronologia delle conversazioni degli utenti con gli assistenti AI.

### 📊 Punteggi Graduatorie
*   **`gps_scores`** e **`ata_scores`**: Punteggi calcolati per docenti e personale ATA, comprensivi di dettagli in formato JSONB.

---

## 🚀 Tabelle per il "Centro Interpelli" (IMPLEMENTATE)

### 📬 `interpelli_nazionali` — già in `supabase/migrations/001_area_riservata.sql`
Memorizza tutti gli interpelli pubblicati dalle scuole. Leggibile da utenti anonimi (RLS: `FOR SELECT USING (true)`).
```sql
CREATE TABLE IF NOT EXISTS interpelli_nazionali (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  titolo TEXT NOT NULL,                    -- nome scuola / titolo bando
  ente TEXT NOT NULL DEFAULT '',           -- USP o ente pubblicante
  tipo TEXT DEFAULT '',                    -- 'comune' | 'sostegno' | 'ata'
  data_scadenza TIMESTAMPTZ NOT NULL,
  data_pubblicazione TIMESTAMPTZ DEFAULT now(),
  link TEXT,                               -- link al bando/albo pretorio
  regione TEXT,
  provincia TEXT,                          -- sigla provincia (es. RM, MI)
  categoria TEXT,                          -- classe di concorso (es. A-22, A-12)
  descrizione TEXT,
  created_at TIMESTAMPTZ DEFAULT now()
);
```
**Tipo TypeScript associato**: `Bando` in `src/types/database.ts`.

### 🔔 `interpelli_alerts` — già in `supabase_schema.sql`
Memorizza le preferenze di notifica degli utenti abbonati.
```sql
CREATE TABLE IF NOT EXISTS interpelli_alerts (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id UUID NOT NULL REFERENCES profiles(id) ON DELETE CASCADE,
  regione TEXT NOT NULL,
  provincia TEXT NOT NULL,
  classe_concorso_area TEXT NOT NULL,
  active BOOLEAN NOT NULL DEFAULT true,
  stripe_subscription_id TEXT,
  created_at TIMESTAMPTZ NOT NULL DEFAULT now()
);
```

---

## 🔗 Link Correlati
- Vedi i requisiti del **[[Sezioni/Centro Nazionale Interpelli|Centro Interpelli Nazionale]]**
- Torna alla **[[Benvenuto|Pagina Iniziale]]**
