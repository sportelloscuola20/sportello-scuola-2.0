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

## 🚀 Nuove Tabelle da Creare per il "Centro Interpelli"

Per implementare la nuova funzionalità, aggiungeremo le seguenti tabelle in `src/rag/database.sql`:

### 📬 `interpelli`
Memorizza tutti gli interpelli pubblicati dalle scuole.
```sql
CREATE TABLE interpelli (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  titolo TEXT NOT NULL,
  scuola TEXT NOT NULL,
  regione TEXT NOT NULL,
  provincia TEXT NOT NULL,
  classe_concorso TEXT NOT NULL, -- es. A022, A012, ADSS
  tipologia_posto TEXT NOT NULL, -- es. Comune, Sostegno
  descrizione TEXT,
  link_fonte TEXT, -- Link all'albo pretorio della scuola
  data_pubblicazione TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  scadenza TIMESTAMP WITH TIME ZONE NOT NULL,
  creato_il TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);
```

### 🔔 `interpelli_alerts`
Memorizza i codici delle classi di concorso per cui un utente ha richiesto di ricevere notifiche email/app.
```sql
CREATE TABLE interpelli_alerts (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id UUID REFERENCES users(id) ON DELETE CASCADE,
  codici_interpello TEXT[] NOT NULL, -- es. ['A012', 'A022', 'ADSS']
  creato_il TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);
```

---

## 🔗 Link Correlati
*   Vedi i requisiti del **[[Centro Interpelli Nazionale]]**.
*   Torna alla **[[00 - Benvenuto|Pagina Iniziale]]**.
