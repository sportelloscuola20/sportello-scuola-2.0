# 📧 Servizio Newsletter Istituzionale

Il **Servizio Newsletter** di Sportello Scuola 2.0 consente l'invio automatizzato e periodico di circolari esplicative, scadenziari mensili e avvisi di interpello rilevanti per il personale iscritto.

---

## ⚖️ Conformità Legale e Privacy (GDPR)

Nel rispetto del Regolamento Europeo n. 2016/679 (GDPR), il servizio deve seguire regole chirurgiche:
1.  **Consenso Esplicito**: Checkbox non preselezionata con collegamento ipertestuale alla Privacy Policy del sito.
2.  **Double Opt-in**: L'iscrizione non è attiva finché l'utente non clicca sul link di conferma inviato alla propria casella e-mail.
3.  **Disiscrizione Semplice**: Ogni e-mail inviata deve contenere in calce un link chiaro e univoco con etichetta *"Disiscriviti dalla Newsletter"* che disattivi immediatamente l'indirizzo nel database.

---

## 👥 Segmentazione degli Iscritti

Per evitare l'invio di materiale non pertinente (es. scadenze per docenti inviate al personale ATA), gli iscritti vengono segmentati all'atto della registrazione in base al ruolo selezionato:
*   **Ruolo Docente**: Riceve notizie sulle classi di concorso, GPS, interpelli supplenze.
*   **Ruolo ATA**: Riceve novità sui bandi di terza fascia, profili professionali, passaggi di qualifica.
*   **Ruolo Dirigente**: Riceve circolari amministrative di coordinamento ed aggiornamenti normativi complessi.

---

## ⚙️ Architettura del Database (`newsletter_subscribers`)

Proposta per la tabella database di gestione iscritti:
```sql
CREATE TABLE newsletter_subscribers (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  email TEXT UNIQUE NOT NULL,
  nome TEXT,
  ruolo TEXT CHECK (ruolo IN ('docente', 'ata', 'dirigente', 'altro')),
  stato TEXT DEFAULT 'pending' CHECK (stato IN ('pending', 'active', 'unsubscribed')),
  creato_il TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  confermato_il TIMESTAMP WITH TIME ZONE
);
```

---

## 🎨 Esperienza Utente ed Email Marketing

*   **Il Widget di Iscrizione**: Un box dal design moderno, inserito in homepage e nella sezione contatti, con animazione CSS sull'invio della richiesta (`state: loading` con pulsante disabilitato e icona spinner).
*   **Template Email (Brand Identity)**: Le e-mail devono utilizzare un template HTML responsivo, con intestazione recante il logo formale di Sportello Scuola 2.0, font puliti (es. Arial o Roboto) e palette di colori istituzionale.

---

## 🧠 Integrazione con Skill del Copilota

*   **`soft-skill`**: Stesura dei testi delle e-mail automatiche di benvenuto e conferma iscrizione con un tono accogliente e professionale.
*   **`taste-skill`**: Disegno del modulo di iscrizione (inserimento input con focus animato e bordi color ottanio `#2F797E`).
*   **`impeccable`**: Validazione formale dell'indirizzo e-mail inserito tramite espressione regolare robusta e sanificazione dell'input per prevenire tentativi di SQL Injection.

---

## 🔗 Riferimenti Istituzionali
*   Torna alla **[[00 - Benvenuto|Pagina Iniziale]]**.
*   Consulta la nota di configurazione in **[[Integrazione Supabase]]**.
