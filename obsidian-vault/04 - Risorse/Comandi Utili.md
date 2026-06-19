# 💻 Comandi Utili per il Progetto

Di seguito trovi una raccolta dei comandi più comuni che puoi usare per gestire il progetto Sportello Scuola 2.0.

---

## 🛠️ Comandi di Sviluppo (Avvio Locale)

### Avviare il Server di Sviluppo
Avvia l'applicazione localmente all'indirizzo `http://localhost:5173`.
```bash
npm run dev
```

### Installare Nuove Librerie / Dipendenze
Se vedi errori relativi a pacchetti mancanti, esegui:
```bash
npm install
```

---

## 📦 Comandi di Produzione (Build)

### Compilare l'Applicazione
Genera il pacchetto pronto per la pubblicazione online (nella cartella `dist`).
```bash
npm run build
```

### Provare la Build in Locale
Avvia localmente la versione compilata (produzione) per verificare che tutto sia identico all'online.
```bash
npm run preview
```

---

## 🗄️ Comandi per il Database (Supabase)

Se decidi di configurare Supabase localmente tramite riga di comando (CLI):

### Avviare Supabase Locale
```bash
npx supabase start
```

### Creare una Nuova Migrazione Database
```bash
npx supabase migration new nome_migrazione
```

---

## 🔗 Link Correlati
*   Leggi il **[[Manuale Utente]]** per capire come far funzionare l'applicazione.
*   Torna alla **[[00 - Benvenuto|Pagina Iniziale]]**.
