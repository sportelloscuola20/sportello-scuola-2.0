---
title: "Simulatore Punteggi GPS e ATA"
aliases: ["Simulatore GPS", "Calcolo Punteggio", "GPS ATA"]
tags: [sezioni, simulatore, gps, ata, punteggi]
date: 2026-06-24
status: published
---

# 📊 Simulatore Punteggi GPS e ATA

I simulatori consentono agli aspiranti docenti e al personale ATA di calcolare in modo rapido e formale il punteggio spettante nelle graduatorie scolastiche sulla base dei titoli di studio, delle certificazioni e dei servizi svolti.

---

## ⚖️ Riferimenti Normativi e Tabelle Valutazione

Le formule matematiche e le tabelle dei punteggi caricate nell'algoritmo di calcolo derivano dagli atti ministeriali ufficiali:
1.  **Graduatorie Provinciali Supplenze (GPS)**:
    *   **Ordinanza Ministeriale n. 88 del 16 maggio 2024**: Allegati **A/1** (Tabella valutazione titoli I fascia docenti scuola infanzia/primaria), **A/2** (II fascia), **A/3** (I fascia docenti scuola secondaria I e II grado), **A/4** (II fascia secondaria I e II grado), e successivi da A/5 a A/10.
2.  **Graduatorie Personale ATA (Terza Fascia)**:
    *   **Decreto Ministeriale n. 89 del 21 maggio 2021** (e successivi aggiornamenti): Tabelle di valutazione dei titoli per i diversi profili professionali.

---

## 🧠 Logica e Fasi del Calcolo

Il simulatore (sviluppato nel componente `src/components/PunteggioGPS.tsx`) opera in modalità guidata (*Wizard*) divisa in 4 fasi:

### Fase 1: Selezione del Profilo e Titolo di Accesso
*   L'utente sceglie la graduatoria (GPS o ATA) e la specifica classe di concorso o profilo professionale (es. *Collaboratore Scolastico*, *Assistente Amministrativo*).
*   Inserimento del voto del titolo di accesso (es. Laurea o Diploma).
    *   *Formula GPS standard*: `(Voto_Laurea - 60) / 3` (se espresso in centesimi). Se il voto ha la lode, si sommano ulteriori `3` punti.

### Fase 2: Inserimento Titoli Culturali e Certificazioni
Inserimento di abilitazioni, master, corsi di perfezionamento e certificazioni.
*   **Certificazioni Linguistiche**: es. B2 (`3` punti), C1 (`4` punti), C2 (`6` punti).
*   **Certificazioni Informatiche / Digitali**: `0.5` punti ciascuna, fino a un tetto massimo cumulabile di **`2` punti** (ai sensi del bando).

### Fase 3: Inserimento Titoli di Servizio (Esperienza Lavorativa)
Calcolo dei giorni o mesi di supplenza svolti.
*   **Servizio Specifico** (svolto sulla stessa classe di concorso per cui ci si iscrive): `2` punti per ogni mese o frazione di almeno 16 giorni, fino a un massimo di **`12` punti** per anno scolastico (180 giorni di servizio continuativo).
*   **Servizio Non Specifico** (svolto su altra classe di concorso o ruolo): Il punteggio è dimezzato (`1` punto al mese, max `6` punti all'anno).

### Fase 4: Report Finale e Dettaglio Punteggi
*   Riepilogo analitico che scompone il punteggio finale (Titolo di accesso + Titoli culturali + Servizio).
*   Pulsante per esportare la simulazione in formato PDF stampabile.

---

## 🎨 Integrazione con Skill del Copilota

*   **`taste-skill`**: Sviluppo di una barra di avanzamento del calcolo in tempo reale, moduli input con convalida dinamica e griglia riassuntiva dei punteggi con grafici SVG o barre grafiche CSS ad alta definizione.
*   **`impeccable`**: Controllo rigoroso delle eccezioni matematiche (es. voti non espressi in centesimi o centodecimi che richiedono formule di conversione ministeriale) e dei tetti massimi di punteggio cumulabile per evitare sovrastime.

---

## 🔗 Riferimenti Istituzionali
- Torna alla **[[Benvenuto|Pagina Iniziale]]**
- Vedi l'elenco dei decreti nel **[[Diari/Registro degli Atti Ufficiali|Registro degli Atti Ufficiali]]**
