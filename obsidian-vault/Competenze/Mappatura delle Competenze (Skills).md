---
title: "Mappatura delle Competenze (Skills)"
aliases: ["Skills", "Registro Skills", "Competenze Agenti", "Skill Agentiche"]
tags: [competenze, skills, agenti, ai]
date: 2026-06-24
status: published
---

# 🧠 Mappatura delle Competenze (Skills dell'Agente)

Questo documento definisce il regolamento e la mappatura delle **Skills (Competenze AI)** configurate all'interno della cartella del progetto `project/.claude/skills/`. Ogni agente AI (incluso Claude Code nel terminale) deve allinearsi a queste competenze specifiche per svolgere modifiche sul codice.

---

## 📂 Registro delle Competenze Istituzionali

| Nome della Skill (Cartella) | Ambito di Competenza | Responsabilità Operativa |
| :--- | :--- | :--- |
| **`brandkit`** | Identità del Brand | Garantisce la conformità con i colori istituzionali (`#235377`, `#1F915E`, `#2F797E`) e l'uso di loghi/font ufficiali. |
| **`taste-skill`** / **`taste-skill-v1`** | Estetica & Premium Design | Implementa layout di alta qualità visiva, gradienti, micro-animazioni nei bottoni, ombreggiatura moderna e curve smussate. |
| **`minimalist-skill`** | Pulizia Visiva | Evita il disordine (cluttering) visivo. Massimizza l'uso dello spazio bianco per facilitare la lettura agli utenti non esperti. |
| **`soft-skill`** | Comunicazione Formale | Traduce ogni messaggio, avviso o testo del portale in un italiano formale, cortese e coerente con la terminologia ministeriale. |
| **`impeccable`** | Qualità del Codice | Verifica l'assenza di codice segnaposto (placeholder), errori di tipizzazione TypeScript, e assicura il rispetto delle regole di linting ESLint. |
| **`stitch-skill`** | Integrazione Componenti | Gestisce il montaggio delle pagine React, collegando i componenti ai file di rotta principali in `App.tsx` e integrando il breadcrumb. |
| **`output-skill`** | Formattazione Output | Stabilisce la formattazione dei messaggi, dei report e della documentazione generata dall'AI in formato Markdown standardizzato. |
| **`brutalist-skill`** / **`redesign-skill`** | Refactoring Grafico | Utilizzate per il restyling di elementi obsoleti o per l'applicazione di forti contrasti visivi laddove necessario per l'accessibilità (AGID). |
| **`image-to-code-skill`** | Conversione Visuale | Trasforma bozze grafiche o screenshot in componenti React con CSS Vanilla funzionante e responsivo. |
| **`imagegen-frontend-web`** / **`-mobile`** | Generazione Mockup | Genera immagini di interfaccia utente ad alta definizione da utilizzare come asset statici nel portale, evitando segnaposti vuoti. |

---

## 🛠️ Come gli Agenti AI Applicano le Skills

Quando esegui un comando nel terminale (es. tramite Claude Code):
1.  **Caricamento Istruzioni**: L'agente scansiona la cartella `.claude/skills/` per caricare le regole di comportamento associate al compito corrente.
2.  **Verifica di Qualità (`impeccable`)**: Prima di salvare un file, l'agente esegue un controllo lint o compila in modalità provvisoria per prevenire malfunzionamenti.
3.  **Apporto di Stile (`taste-skill` + `brandkit`)**: Qualsiasi nuovo bottone o sezione inserita erediterà automaticamente le micro-animazioni hover e la palette istituzionale.

---

## 🔗 Riferimenti Istituzionali
- Torna alla **[[Benvenuto|Pagina Iniziale]]**
- Consulta la guida di stile visivo in **[[Core/Home Page|Home Page]]**
