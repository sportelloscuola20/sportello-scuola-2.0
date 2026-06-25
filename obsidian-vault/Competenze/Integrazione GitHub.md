---
title: "Integrazione GitHub"
aliases: ["GitHub", "Versionamento", "Git", "CI/CD"]
tags: [competenze, github, git, versionamento, deploy]
date: 2026-06-24
status: published
---

# 🐙 Integrazione GitHub (Versionamento & Deploy)

Questa nota definisce il protocollo formale di sincronizzazione del codice sorgente, la gestione delle credenziali di accesso e il flusso di lavoro (*Workflow*) per il versionamento su **GitHub**.

---

## 🔒 Sicurezza e Gestione dei Token

L'integrazione di GitHub all'interno dell'ambiente di lavoro degli agenti AI è regolata dalle impostazioni contenute nel file di configurazione locale del terminale `.claude/settings.json`:

*   **Credenziali Attive**:
    *   `GITHUB_TOKEN`
    *   `GITHUB_PERSONAL_ACCESS_TOKEN`
*   **Regola di Sicurezza Chirurgica**: Le credenziali e i file di impostazioni locali (come `settings.local.json` e `.env`) sono inseriti nel file `.gitignore` e **non devono mai essere committati** nella repository pubblica di GitHub per evitare fughe di chiavi e vulnerabilità.

---

## 🌿 Strategia dei Branch (Ramificazione del Codice)

Per mantenere il codice pulito e pronto per la pubblicazione, si adotta un flusso a rami:

1.  **Branch `main`**: Contiene esclusivamente la versione di produzione stabile e verificata del sito.
2.  **Branch di Funzionalità (`feature/`)**: Ogni sviluppo viene isolato in un ramo dedicato prima di essere integrato in `main`.
    *   *Esempio*: `feature/interpelli-nazionale` per l'implementazione in corso del Centro Interpelli.
    *   *Esempio*: `feature/newsletter-gdpr` per lo sviluppo dell'iscrizione newsletter.

---

## 📈 Convenzione Commit (Convenzionali)

Tutti gli agenti AI e gli sviluppatori devono descrivere le modifiche apportate utilizzando messaggi chiari e strutturati in conformità allo standard internazionale:

*   `feat: [descrizione]` — Per l'introduzione di una nuova funzionalità (es. `feat: aggiunta filtri classe concorso`).
*   `fix: [descrizione]` — Per la correzione di un errore o bug (es. `fix: arrotondamento punteggio ATA`).
*   `docs: [descrizione]` — Per modifiche alla documentazione o alla Mente Alveare (es. `docs: aggiornato schema database in Obsidian`).
*   `style: [descrizione]` — Per modifiche grafiche o estetiche che non toccano la logica (es. `style: modifica gradiente header`).

---

## 🧠 Integrazione con Skill del Copilota

*   **`impeccable`**: Verifica che prima di effettuare un commit non vi siano file temporanei lasciati nel workspace e che tutti i file modificati superino il build locale (`npm run build`).
*   **`stitch-skill`**: Organizzazione ordinata dei file modificati per evitare conflitti di merge complessi quando più agenti o programmatori lavorano contemporaneamente sul codice.

---

## 🔗 Riferimenti Istituzionali
- Torna alla **[[Benvenuto|Pagina Iniziale]]**
- Consulta i comandi di avvio rapido in **[[Risorse/Comandi Utili|Comandi Utili]]**
