# 🗄️ Integrazione Supabase (Database & Sicurezza)

Questa nota documenta i parametri di connessione, la gestione dell'autenticazione e il comportamento del client Supabase all'interno del codebase.

---

## ⚙️ Variabili d'Ambiente e Configurazione

La connessione tra l'applicazione frontend React e il database Postgres di Supabase è regolata dal file `.env` tramite le seguenti chiavi:

*   `VITE_SUPABASE_URL`: L'URL dell'istanza del tuo database Supabase (es. `https://xyz.supabase.co`).
*   `VITE_SUPABASE_ANON_KEY`: La chiave pubblica anonima per eseguire query sicure dal client.

---

## 🛡️ Gestione della Connessione e Client Mock (`supabaseClient.ts`)

Per garantire che l'applicazione funzioni sempre senza errori bloccanti, anche se non hai configurato le credenziali di Supabase, il client implementa un sistema di **Fallback Mock** (Simulazione) in `src/rag/supabaseClient.ts`:

1.  **Verifica Parametri**: Il client controlla se `VITE_SUPABASE_URL` contiene un indirizzo valido e non segnaposto.
2.  **Inizializzazione Sicura**: Se le chiavi sono mancanti o errate, l'app avvisa nella console di sviluppo:
    *"Supabase is not configured or URL is invalid. Initializing mock client."*
3.  **Client Mock**: Viene istanziato un client fittizio che risponde a tutte le chiamate database comuni (come `select`, `insert`, `update`, `delete`, `eq`, `range`) con promesse risolte e vettori vuoti, evitando crash dell'interfaccia.

---

## 🔒 Sicurezza e RLS (Row Level Security)

Nelle tabelle di Supabase (es. per il salvataggio dei punteggi calcolati o le notifiche alert degli interpelli) è obbligatorio attivare le policy RLS:
*   **Lettura / Scrittura**: Un utente autenticato può accedere solo alle righe dove `user_id` è uguale al proprio `auth.uid()`.
*   **Tabelle Pubbliche**: La tabella `interpelli` e i `document_chunks` delle normative sono leggibili pubblicamente (anonimi), ma modificabili esclusivamente dall'utente amministratore (`role = 'admin'`).

---

## 🧠 Integrazione con Skill del Copilota

*   **`impeccable`**: Scrittura di query Supabase performanti che limitano i record estratti (`range` e `limit`) e gestione accurata degli errori (`error` ritornati da Supabase gestiti tramite blocchi `try-catch`).
*   **`stitch-skill`**: Collegamento dei moduli di interfaccia (es. `InterpelliAlertManager.tsx`) con le API del database, aggiornando lo stato locale di React dopo ogni inserimento o cancellazione.

---

## 🔗 Riferimenti Istituzionali
*   Torna alla **[[00 - Benvenuto|Pagina Iniziale]]**.
*   Consulta la mappa delle tabelle su **[[Schema Database]]**.
