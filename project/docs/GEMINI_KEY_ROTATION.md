# Rotazione Chiave API Gemini

Runbook operativo per ruotare `VITE_GEMINI_API_KEY` in Sportello Scuola 2.0.

## Quando ruotare

- Immediatamente se la chiave è stata esposta (commit, log, screenshot, condivisione).
- Ogni 90 giorni come buona pratica.
- In caso di comportamento anomalo nel monitoraggio `gemini_calls_log` (errori `401 UNAUTHENTICATED`/`403 PERMISSION_DENIED`).

## Struttura attuale

| Voce | Valore |
|------|--------|
| Variabile | `VITE_GEMINI_API_KEY` |
| File | `project/.env` (gitignored, mai committato) |
| Formato | ~53 caratteri, prefisso `AQ.A...` |
| Modello usato | `gemini-3.1-flash-lite` |
| Base URL | `VITE_GEMINI_BASE_URL` |

La chiave è usata **solo client-side** per la chat RAG (`AssistantPage`); le edge functions
`ingest-news`/`ai-sindacalista` hanno la propria configurazione server-side (supabase secrets).

## Procedura

### 1. Genera una nuova chiave

1. Vai su [Google AI Studio](https://aistudio.google.com/apikey) e accedi con l'account del progetto.
2. Click **Create API key** → seleziona il progetto Google Cloud corretto.
3. Copia la nuova chiave (prefisso `AQ.A...`).

### 2. Aggiorna la configurazione locale

```powershell
# dalla cartella project\
$content = Get-Content -LiteralPath ".env" -Raw
$content = $content -replace '(?m)^VITE_GEMINI_API_KEY=.*$', 'VITE_GEMINI_API_KEY=<NUOVA_CHIAVE>'
Set-Content -LiteralPath ".env" -Value $content -NoNewline
```

Verifica che `.env` non contenga la vecchia chiave da nessun'altra parte:
```powershell
Select-String -LiteralPath ".env" -Pattern "VITE_GEMINI_API_KEY"
```

### 3. Aggiorna i segreti Supabase (edge functions)

Le edge functions usano segreti separati, non la chiave Vite. Se il modello è lo stesso,
ruota anche questi:

```bash
supabase secrets set GEMINI_API_KEY=<NUOVA_CHIAVE> --project-ref <PROJECT_REF> --workdir "project"
supabase functions deploy ai-sindacalista --no-verify-jwt --workdir "project"
supabase functions deploy ingest-news --no-verify-jwt --workdir "project"
```

(Elenca i segreti esistenti con `supabase secrets list --workdir "project"` per verificare il nome esatto.)

### 4. Verifica locale

1. `cd project && npm run dev`
2. Apri l'Assistant e invia un messaggio: la risposta deve usare il modello configurato.
3. Verifica nel DB che la riga in `gemini_calls_log` abbia `status='success'` (pagina Osservabilità).

### 5. Revoca la vecchia chiave

1. In [Google AI Studio](https://aistudio.google.com/apikey), click sul menu della vecchia chiave.
2. **Delete API key** (o revoca). Revoca SOLO dopo aver verificato la nuova chiave.

## Note di sicurezza

- La chiave vive solo in `project/.env` (già in `.gitignore`): non copiarla in `src/`, commenti o archivi.
- Non loggare mai il valore (il codice la usa solo via `import.meta.env.VITE_GEMINI_API_KEY`).
- Se sospetti un leak, revoca subito la chiave esposta e genera una nuova prima di modificare il codice.
