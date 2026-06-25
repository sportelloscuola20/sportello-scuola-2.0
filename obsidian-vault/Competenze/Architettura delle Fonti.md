---
title: "Architettura delle Fonti — Knowledge Source Architecture (v2)"
aliases: ["Fonti", "Knowledge Sources", "Source Architecture", "Repository Fonti", "46 Fonti"]
tags: [competenze, fonti, verifica, intelligence, monitoraggio, scraping]
date: 2026-06-25
status: published
---

# 🏛️ Architettura delle Fonti — Knowledge Source Architecture (v2)

## Obiettivo

Monitorare continuamente 46 fonti istituzionali e sindacali tramite `monitor-sources` v2 (Edge Function) schedulato ogni 60 min via cron-job.org.

Ogni informazione associata a: fonte, URL, data pubblicazione, data acquisizione, livello affidabilità.

---

## Livello A — Fonti Primarie Assolute (100/100)

### Gazzetta Ufficiale
https://www.gazzettaufficiale.it

### Normattiva
https://www.normattiva.it

### Ministero dell'Istruzione e del Merito (MIM)
https://miur.gov.it/web/guest/home

Sottosezioni:
- https://miur.gov.it/atti-generali
- https://miur.gov.it/rassegna-normativa
- https://miur.gov.it/web/guest/normativa
- https://miur.gov.it/web/guest/comunicazioni

### MIM — Comunicazioni RSS
https://miur.gov.it/feed/rss/comunicazioni

### Parlamento Italiano
https://www.parlamento.it

### Camera dei Deputati
https://www.camera.it

### Senato della Repubblica
https://www.senato.it

### Dipartimento Funzione Pubblica
https://www.funzionepubblica.gov.it

### ARAN
https://www.aranagenzia.it

### INPS
https://www.inps.it + https://www.inps.it/it/it/inps-comunica/atti.html

---

## Livello B — Governance e Sistema Scuola (95/100)

### INVALSI
https://www.invalsicloud.it

### INDIRE
https://www.indire.it

### ISTAT
https://www.istat.it

---

## Livello C — Giurisprudenza (98/100)

### Giustizia Amministrativa
https://www.giustizia-amministrativa.it

### Corte Costituzionale
https://www.cortecostituzionale.it

### Corte di Cassazione
https://www.cortedicassazione.it

---

## Livello D — Osservatorio Europeo e Internazionale (95/100)

### Commissione Europea — Istruzione
https://education.ec.europa.eu

### OECD — Education
https://www.oecd.org/education

### UNESCO — Education
https://www.unesco.org/en/education

### WHO
https://www.who.int

---

## Livello E — Ricerca Scientifica (90/100)

- ERIC: https://eric.ed.gov
- PubMed: https://pubmed.ncbi.nlm.nih.gov
- Google Scholar: https://scholar.google.com

---

## Livello F — Intelligence di Settore / Allerta Precoce (60/100)

- Orizzonte Scuola: https://www.orizzontescuola.it
- Tecnica della Scuola: https://www.tecnicadellascuola.it
- Tuttoscuola: https://www.tuttoscuola.com
- FLC CGIL: https://www.flcgcgil.it — RSS: https://www.flcgcgil.it/feed
- CISL Scuola: https://www.cislscuola.it — RSS: https://www.cislscuola.it/feed
- UIL Scuola: https://www.uilscuola.it — RSS: https://www.uilscuola.it/rss
- SNALS: https://www.snals.it
- ANIEF: https://www.anief.org

---

## Uffici Scolastici Regionali (USR) — 18 fonti

Monitorati con scraping mirato (keyword: GPS/Graduatorie/Decreto/Nomine/Ruoli/Immissioni). Frequenza: 240 min. User-Agent Chrome obbligatorio. Fallback full-page se zero risultati.

URL endpoint su dominio MIM:
- Abruzzo: https://abruzzo.miur.gov.it
- Basilicata: https://basilicata.miur.gov.it
- Calabria: https://www.usrcalabria.it
- Campania: https://campania.miur.gov.it
- Emilia-Romagna: https://istruzioneer.gov.it
- FVG: https://fvg.miur.gov.it
- Lazio: https://lazio.miur.gov.it
- Liguria: https://liguria.miur.gov.it
- Lombardia: https://lombardia.miur.gov.it
- Marche: https://marche.miur.gov.it
- Molise: https://molise.miur.gov.it
- Piemonte: https://www.istruzionepiemonte.it
- Puglia: https://puglia.miur.gov.it
- Sardegna: https://sardegna.miur.gov.it
- Sicilia: https://www.istruzione.sicilia.it
- Toscana: https://toscana.miur.gov.it
- Trentino-Alto Adige: https://www.provincia.tn.it/istruzione
- Umbria: https://www.istruzione.umbria.it
- Valle d'Aosta: https://www.regione.vda.it/istruzione
- Veneto: https://www.istruzioneveneto.it

---

## Regola di Validazione (astratta — non più mostrata in UI)

Il sistema si basa su:
1. Allerta precoce da fonti livello F
2. Verifica su fonte primaria (livello A — MIM, G.U., Normattiva)
3. Effetti su livello B (INVALSI, INDIRE, ISTAT)
4. Impatti giuridici su livello C
5. Impatti europei su livello D
6. Letteratura scientifica su livello E

**Nessuna notizia senza fonte primaria verificabile.**

---

## Principio di Verità

Nessuna informazione pubblicata se:
- ❌ non verificata / non attribuita / non contestualizzata / non aggiornata

---

## Regola CEO

L'obiettivo non è essere il primo a pubblicare. È essere la fonte che tutti gli altri citano.

**Conflitto velocità vs accuratezza** → accuratezza
**Conflitto opinione vs fonte primaria** → fonte primaria
**Conflitto traffico vs credibilità** → credibilità

---

## 🔗 Collegamenti

- [[Sezioni/Notizie e Scadenze]] — Pipeline intelligence
- [[Core/Architettura e Stato]] — Infrastruttura
- [[Benvenuto|Pagina Iniziale]]
