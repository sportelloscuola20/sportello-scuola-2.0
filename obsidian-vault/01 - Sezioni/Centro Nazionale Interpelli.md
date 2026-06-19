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

*   `src/components/InterpelliFilters.tsx` — Pannello di selezione e filtri.
*   `src/components/InterpelliCard.tsx` — Singolo bando con azioni smart e integrazione prompt AI.
*   `src/components/InterpelliList.tsx` — Flusso di visualizzazione e gestione dello stato dei filtri.
*   `src/components/InterpelliAlertManager.tsx` — Gestione preferenze utente salvate a database.
*   `src/pages/InterpelliPage.tsx` — Pagina contenitore collegata alla rotta `/interpelli`.

---

## 🧠 Integrazione con Skill del Copilota

*   **`taste-skill`**: Layout della scheda bando estremamente formale, con uso di icone istituzionali e spaziatura equilibrata per evitare il disordine visivo.
*   **`brandkit`**: Colori coordinati per i vari stati di scadenza (es. Rosso scuro istituzionale per bandi in scadenza entro 24 ore).
*   **`soft-skill`**: Formulazione formale dei testi esplicativi per l'utente non esperto.

---

## 🔗 Riferimenti Istituzionali
*   Torna alla **[[00 - Benvenuto|Pagina Iniziale]]**.
*   Consulta lo **[[Schema Database]]** per le tabelle `interpelli` e `interpelli_alerts`.
