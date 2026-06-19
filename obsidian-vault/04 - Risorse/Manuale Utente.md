# 📖 Manuale Utente Semplificato

Benvenuto nel manuale d'uso di **Sportello Scuola 2.0**. Questa guida è scritta in modo semplice e non tecnico per aiutarti a far funzionare l'applicazione sul tuo computer, fare test e usare al meglio la Mente Alveare.

---

## 🚀 Come Avviare l'Applicazione sul Tuo PC

Per far girare il sito sul tuo computer, segui questi 3 semplici passaggi:

1.  **Apri la barra dei comandi (Terminale)** nel programma che utilizzi per comunicare con me (o premi `Ctrl + Shift + \`` in VS Code per aprire il terminale integrato).
2.  Incolla e premi Invio su questo comando:
    ```bash
    npm run dev
    ```
3.  Una volta avviato, vedrai apparire una scritta come `http://localhost:5173`. Fai **Ctrl + Clic** su quel link (o copialo nel browser) per aprire il sito.

> [!TIP]
> Per fermare il sito quando hai finito di lavorare, premi `Ctrl + C` nel terminale e rispondi `S` (Sì).

---

## 🧠 Come Funziona l'Assistente AI (RAG)

I chatbot AI sul sito non rispondono a caso, ma cercano le risposte all'interno dei documenti caricati nel database Supabase.
*   Se l'AI non risponde o dice di non avere le credenziali, è perché il database Supabase non è ancora configurato.
*   **Modalità Demo**: Il sistema è intelligente: se rileva che non hai configurato Supabase, si imposta automaticamente in modalità **Mock** (Demo), permettendoti comunque di testare l'interfaccia grafica e fare simulazioni senza errori bloccanti.

---

## 📂 Come Usare Obsidian come "Cervello" del Progetto

Obsidian è un ottimo strumento per prendere appunti in formato Markdown. Puoi usarlo per:
1.  **Scrivere Idee**: Crea una nuova nota cliccando sul pulsante "+" in alto a sinistra su Obsidian.
2.  **Segnalare Bug**: Se trovi qualcosa che non va, scrivi una nota chiamata `Bug Riscontrati` e inserisci l'elenco. L'agente AI la troverà e la risolverà per te.
3.  **Gestire i Compiti**: Se vuoi che l'AI faccia qualcos'altro, aggiungilo in fondo alla nota **[[Attività Aperte (To-Do)]]** usando il formato `- [ ] Nome compito`. L'AI leggerà la lista alla prossima esecuzione.

---

## 🔗 Link Correlati
*   Vedi i comandi rapidi su **[[Comandi Utili]]**.
*   Torna alla **[[00 - Benvenuto|Pagina Iniziale]]**.
