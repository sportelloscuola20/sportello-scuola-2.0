import { createClient } from 'https://esm.sh/@supabase/supabase-js@2.57.4?target=deno';

const corsHeaders = {
  'Access-Control-Allow-Origin': '*',
  'Access-Control-Allow-Methods': 'POST, OPTIONS',
  'Access-Control-Allow-Headers': 'Content-Type, Authorization',
};

const GEMINI_BASE = 'https://generativelanguage.googleapis.com/v1beta/models';
const MODEL = 'gemini-3.1-flash-lite';

const CONFIG = {
  model: MODEL,
  maxDocsPerCall: 3,
  maxRuntimeMs: 45_000,
  geminiTimeoutMs: 45_000,
  batchReadLimit: 100,
  maxRetries: 3,
  rpmLimit: 10,
  rpdLimit: 400,
  circuitBreakerResetMs: 300_000,
  backoffBaseMs: 2_000,
  backoffMaxMs: 60_000,
  maxCallsPerInvocation: 2,
};

interface SourceDocument {
  id: string; source_id: string; url: string | null;
  titolo: string; contenuto_raw: string; hash_contenuto: string;
  data_rilevamento: string; elaborato: boolean;
  tentativi?: number; errore_msg?: string; processing_started_at?: string;
}

function sleep(ms: number): Promise<void> {
  return new Promise(r => setTimeout(r, ms));
}

function todayDate(): string {
  return new Date().toISOString().slice(0, 10);
}

// Soglia di similarità Jaccard per deduplicazione (0.0 = identici, 1.0 = completamente diversi)
const DEDUP_SIMILARITY_THRESHOLD = 0.35;

function jaccardSimilarity(a: string, b: string): number {
  const wordsA = new Set(a.toLowerCase().split(/\s+/).filter(w => w.length > 3));
  const wordsB = new Set(b.toLowerCase().split(/\s+/).filter(w => w.length > 3));
  if (wordsA.size === 0 || wordsB.size === 0) return 1;
  let intersection = 0;
  for (const w of wordsA) if (wordsB.has(w)) intersection++;
  const union = wordsA.size + wordsB.size - intersection;
  return 1 - intersection / Math.max(union, 1);
}

async function isDuplicate(supabase: any, titolo: string, contenuto: string): Promise<boolean> {
  const cutoff = new Date(Date.now() - 48 * 60 * 60 * 1000).toISOString();
  const { data: recent } = await supabase
    .from('intelligence_news')
    .select('titolo, descrizione')
    .gte('data_pubblicazione', cutoff)
    .limit(20);
  if (!recent || recent.length === 0) return false;
  const searchText = (titolo + ' ' + contenuto).slice(0, 2000);
  for (const r of recent) {
    const cmpText = ((r.titolo || '') + ' ' + (r.descrizione || '')).slice(0, 2000);
    const similarity = jaccardSimilarity(searchText, cmpText);
    if (similarity < DEDUP_SIMILARITY_THRESHOLD) return true;
  }
  return false;
}

function buildPrompt(docs: { idx: number; titolo: string; contenuto: string; fonte_nome: string; fonte_url: string }[]): string {
  return `Sei il miglior redattore-giornalista italiano, specializzato in normativa scolastica, reclutamento docenti, e organizzazione della scuola pubblica. Operi come filtro normativo e operativo per docenti, ATA, dirigenti e aspiranti.

Il tuo compito: trasformare documenti grezzi (comunicati MIM, articoli, circolari) in notizie c He rispondono a 7 domande fisse:
1. Perché è stato emanato questo atto/notizia? (contesto)
2. Quali sono gli effetti concreti sul sistema scolastico?
3. Chi sono i destinatari diretti e indiretti?
4. Cosa deve fare il singolo operatore/utente?
5. Entro quando deve agire? (scadenze certe, MAI inventate)
6. Cosa succede se non si agisce? (conseguenze dell'inerzia)
7. Quali sono gli scenari futuri? (prossime tappe, evoluzione normativa)

━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
DOCUMENTI DA PROCESSARE:
${JSON.stringify(docs)}
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━

Per OGNI documento (idx numerico), genera il seguente JSON:

{
  "idx": <stesso numero>,

  "titolo": "<Titolo editoriale, impattante, chiaro — massimo 100 caratteri>",

  "descrizione": "<Sommario potente di max 350 caratteri che risponde a 'Perché', 'Effetti', 'Chi'. Deve catturare e informare in un colpo.>",

  "fonte_livello": "<A|B|C|D|E|F>",
  "fonte_nome": "<uguale input>",
  "fonte_url": "<uguale input>",

  "criticita": "<bassa|media|alta|urgente|strategica>",
  "impatto": "<locale|regionale|nazionale>",
  "platea": "<limitata|ampia|intero_sistema>",

  "target": [
    <array ESATTO da: docenti, aspiranti_docenti, sostegno, ata, amministrativi, collaboratori, dsga, dirigenti, educatori, pedagogisti, formatori, universita, sindacati, famiglie, studenti, decisori_pubblici>
    — SELEZIONA SOLO chi è DAVVERO coinvolto, non tutti
  ],

  "categoria": "<UNA tra: Bandi, Concorsi e Selezioni | Didattica, Formazione e Innovazione | Graduatorie (GPS, GAE, d'Istituto) | Contratti, Salari e Personale ATA | Pensioni, Previdenza e Welfare | Normative, Note e Circolari Ministeriali | Mobilità, Assegnazioni e Utilizzazioni | Esami di Stato e Valutazioni (INVALSI)>",

  "fonte_primaria": "<Ente che ha emanato il documento (MIM, USR, ARAN, INPS, etc.)>",
  "tag": ["<2-5 keyword precise>"],
  "link": "<URL originale del documento>",
  "is_pinned": false,

  "data_pubblicazione": "<YYYY-MM-DD se presente nel testo, null altrimenti — MAI inventare>",

  "regione": "<Regione ITALIANA se il bando/notizia è regionale (es. LOMBARDIA, CAMPANIA, LAZIO). Se nazionale o non determinabile → null>",

  // ═══════════════════════════════════════════════════
  // MODELLO DI PRODUZIONE A 6 LIVELLI
  // Ogni livello deve essere DETTAGLIATO, non un riassunto.
  // Stile: chiaro, diretto, autorevole — come il New York Times.
  // ═══════════════════════════════════════════════════
  "produzione_livelli": [
    {
      "livello": 1,
      "titolo": "Il Fatto — Cosa Succede",
      "contenuto": "Esposizione chiara e completa della notizia/norma. Cosa dice esattamente il testo, chi lo ha emanato, quando entra in vigore. Deve essere auto-consistente (leggibile anche da solo)."
    },
    {
      "livello": 2,
      "titolo": "Perché è Importante — Contesto e Motivazioni",
      "contenuto": "Analisi del perché questa notizia è stata emanata ora. Quale problema risolve? Quale vuoto normativo colma? Che scenario ha portato a questa decisione? Collega la notizia al quadro più ampio della scuola italiana."
    },
    {
      "livello": 3,
      "titolo": "Cosa Cambia per Te — Impatto Operativo",
      "contenuto": "Spiega COSA CAMBIA da domani mattina per l'utente finale. Cosa deve sapere, cosa deve fare diversamente. Esempi concreti: 'Se sei un docente di sostegno con 3 anni di servizio, ora puoi...' oppure 'Le segreterie dovranno aggiornare le graduatorie entro...'."
    },
    {
      "livello": 4,
      "titolo": "Dubbi Comuni — FAQ",
      "contenuto": "3-5 domande e risposte che l'utente medio si farebbe. Formato: D: [domanda] R: [risposta chiara e completa]. Copri gli scenari più comuni e le eccezioni principali."
    },
    {
      "livello": 5,
      "titolo": "Checklist Operativa — Cosa Fare Subito",
      "contenuto": "Elenco puntato AZIONABILE delle cose da fare. Ogni punto deve iniziare con un verbo all'imperativo: 'Verifica la tua posizione in graduatoria', 'Presenta domanda entro il...', 'Allega il certificato...'. Deve essere una guida PRATICA, non teorica."
    },
    {
      "livello": 6,
      "titolo": "Riferimenti Normativi e Prossime Tappe",
      "contenuto": "Elenco dei riferimenti legislativi precisi (es. 'Decreto Ministeriale n. 123 del 15/03/2026', 'Nota MIM prot. 456 del ...', 'CCNL 2019-2021 art. 12'). Includi anche le PROSSIME TAPPE: cosa succederà dopo, quando aspettarsi i prossimi aggiornamenti."
    }
  ],

  // ═══════════════════════════════════════════════════
  // SCADENZE — GATEKEEPER A 3 BOOLEANI + 7 PILASTRI
  // ═══════════════════════════════════════════════════
  // ATTENZIONE: Le scadenze vanno generate SOLO se TUTTI e 3 i controlli qui sotto sono SUPERATI.
  // Se NON superi il gatekeeper, metti "scadenze": [] (array vuoto).
  //
  // Gatekeeper — Controlli obbligatori:
  // 1. Certezza Temporale: Esiste una data di inizio E una data di fine CERTA
  //    (es. "dal 1 giugno al 15 luglio", "entro 30 giorni dalla pubblicazione in G.U.",
  //     "le domande scadono il 31/12/2026")?
  //    Se la notizia dice solo "prossimamente", "a breve", "nei prossimi mesi" → NON SUPERATO.
  //
  // 2. Pertinenza del Target: La scadenza riguarda DIRETTAMENTE personale scolastico
  //    (docenti, ATA, DSGA, dirigenti, aspiranti) o famiglie/studenti?
  //    Se riguarda solo enti locali, comuni, fornitori esterni → NON SUPERATO (resta notizia).
  //
  // 3. Azionabilità: L'utente deve COMPIERE UN'AZIONE entro la scadenza
  //    (presentare domanda, allegare documenti, pagare, optare)?
  //    Se la scadenza è solo amministrativa interna (es. "il MIM pubblicherà entro...") → NON SUPERATO.

  "scadenze": [
    // SOLO se gatekeeper SUPERATO. Altrimenti array vuoto.
    {
      "titolo": "<Titolo chiaro della scadenza, es. 'Presentazione domanda GPS 2026-2028'>",

      // 7 PILASTRI DELLA SCADENZA:

      // Pilastro 1 — Spiegazione e Destinatari
      "normativa": "<Riferimento normativo ESATTO (decreto, nota, articolo di legge)>",
      "soggetti_coinvolti": ["<array dei ruoli coinvolti: docenti, ata, dsga, aspiranti, etc.>"],

      // Pilastro 2 — Dati Temporali
      "data_scadenza": "<YYYY-MM-DD — DATA ESATTA, MAI inventata>",
      "tipo": "<Scadenza|Termine|Proroga|Finestra>",
      "regione": "<null se nazionale, altrimenti sigla regione come 'LAZ', 'LOM', etc.>",

      // Pilastro 3 — Procedura e Documenti
      "guida_operativa": "<Procedura completa: su quale piattaforma (es. Istanze Online, NoiPA, INPS), quali documenti allegare (es. Certificazioni, PDF, Autocertificazioni), eventuali codici tributo o moduli specifici. MAX 500 caratteri.>",

      // Pilastro 4 — Rischi e Sanzioni
      "conseguenze_non_azione": "<Cosa succede se l'utente NON rispetta la scadenza. ESSERE PRECISI: 'Esclusione dalla graduatoria', 'Perdita del punteggio', 'Sanzione disciplinare', 'Impossibilità di partecipare al bando'. Sii concreto, non generico.>",

      // Pilastro 5 — Suggerimenti dell'Esperto
      "suggerimenti_esperto": "<Consigli pratici per evitare blocchi del sistema ministeriale, errori comuni di compilazione, tempistiche consigliate per non arrivare all'ultimo giorno. MAX 400 caratteri.>",

      // Pilastro 6 — Priorità
      "priorita": "<alta|media|bassa>",

      // Pilastro 7 — Impatto
      "impatto": "<come sopra: locale|regionale|nazionale>"
    }
  ]
}

REGOLE FONDAMENTALI:
1. Se il documento NON riguarda l'istruzione → categoria="nessuna"
2. Mai inventare date di scadenza. Se non c'è data certa → scadenze vuoto.
3. Ogni livello di produzione_livelli deve essere DETTAGLIATO e AUTOCONSISTENTE (minimo 3 frasi ciascuno).
4. I target devono essere PRECISI: non mettere tutti, solo chi è veramente coinvolto.
5. Stile giornalistico di alto livello: chiaro, preciso, autorevole, mai burocratico.
6. Rispondi SOLO con JSON valido — niente testo prima o dopo.
7. STRUTTURA JSON FINALE: {"documenti": [...]}`;
}

function parseResponse(text: string): GeminiResponse | null {
  try {
    const cleaned = text.replace(/^```(?:json)?\s*/i, '').replace(/\s*```$/i, '').trim();
    const jsonMatch = cleaned.match(/\{[\s\S]*\}/);
    const raw = jsonMatch ? JSON.parse(jsonMatch[0]) : JSON.parse(cleaned);
    if (raw.documenti && Array.isArray(raw.documenti)) return raw as GeminiResponse;
    if (Array.isArray(raw)) return { documenti: raw };
    return null;
  } catch { return null; }
}

interface GeminiResponse {
  documenti: Array<{
    idx: number; titolo: string; descrizione: string;
    fonte_livello: string; fonte_nome: string; fonte_url: string;
    criticita: string; impatto: string; platea: string;
    target: string[]; categoria: string; fonte_primaria: string;
    tag: string[]; link: string; is_pinned: boolean;
    produzione_livelli: Array<{ livello: number; titolo: string; contenuto: string }>;
    scadenze: Array<{
      titolo: string; normativa: string; soggetti_coinvolti: string[];
      data_scadenza: string; priorita: string; conseguenze_non_azione: string;
      guida_operativa: string; suggerimenti_esperto: string;
      tipo: string; regione: string;
    }>;
    data_pubblicazione: string | null;
    regione: string | null;
  }>;
}

const VALID_CATEGORIES = [
  'Bandi, Concorsi e Selezioni',
  'Didattica, Formazione e Innovazione',
  'Graduatorie (GPS, GAE, d\'Istituto)',
  'Contratti, Salari e Personale ATA',
  'Pensioni, Previdenza e Welfare',
  'Normative, Note e Circolari Ministeriali',
  'Mobilità, Assegnazioni e Utilizzazioni',
  'Esami di Stato e Valutazioni (INVALSI)',
] as const;

function normalizeCategory(raw: string): string {
  const r = raw.trim().toLowerCase();
  for (const v of VALID_CATEGORIES) {
    if (v.toLowerCase() === r) return v;
  }
  if (r.startsWith('bandi') || r.includes('concorsi') || r.includes('selezioni')) return 'Bandi, Concorsi e Selezioni';
  if (r.includes('didattica') || r.includes('formazione') || r.includes('innovazion')) return 'Didattica, Formazione e Innovazione';
  if (r.includes('graduatorie') || r.includes('gps') || r.includes('gae')) return "Graduatorie (GPS, GAE, d'Istituto)";
  if (r.includes('contratti') || r.includes('salari') || r.includes('ata')) return 'Contratti, Salari e Personale ATA';
  if (r.includes('pensioni') || r.includes('previdenza') || r.includes('welfare')) return 'Pensioni, Previdenza e Welfare';
  if (r.includes('normative') || r.includes('note') || r.includes('circolari') || r.includes('ministeriali')) return 'Normative, Note e Circolari Ministeriali';
  if (r.includes('mobilit') || r.includes('assegnazioni') || r.includes('utilizzazioni')) return 'Mobilità, Assegnazioni e Utilizzazioni';
  if (r.includes('esami') || r.includes('valutazioni') || r.includes('invalsi')) return 'Esami di Stato e Valutazioni (INVALSI)';
  return 'Normative, Note e Circolari Ministeriali';
}

Deno.serve(async (req) => {
  if (req.method === 'OPTIONS') return new Response(null, { status: 204, headers: corsHeaders });

  const startTime = Date.now();
  const supabaseUrl = Deno.env.get('SUPABASE_URL') || '';
  const supabaseServiceKey = Deno.env.get('SUPABASE_SERVICE_ROLE_KEY') || '';
  const geminiApiKey = Deno.env.get('GEMINI_API_KEY') || '';

  if (!geminiApiKey) {
    return new Response(JSON.stringify({ error: 'GEMINI_API_KEY non configurata.' }), {
      status: 400, headers: { ...corsHeaders, 'Content-Type': 'application/json' },
    });
  }

  const supabase = createClient(supabaseUrl, supabaseServiceKey);
  const log: string[] = [];

  // ─── HELPER: RECENT ERRORS (circuit breaker) ────────────────────────────
  async function recentErrors(count: number): Promise<number> {
    const { data } = await supabase
      .from('gemini_calls_log')
      .select('esito')
      .eq('giorno', todayDate())
      .order('called_at', { ascending: false })
      .limit(count);
    if (!data) return 0;
    return data.filter(r => r.esito !== 'ok').length;
  }

  async function recordCall(esito: string, durata_ms: number): Promise<void> {
    await supabase.from('gemini_calls_log').insert({
      giorno: todayDate(), called_at: new Date().toISOString(),
      modello: MODEL, esito, durata_ms,
    }).maybeSingle();
  }

  async function countDailyCalls(): Promise<number> {
    const { count } = await supabase
      .from('gemini_calls_log')
      .select('id', { count: 'exact', head: true })
      .eq('giorno', todayDate());
    return count ?? 0;
  }

  async function countRpm(): Promise<number> {
    const cutoff = new Date(Date.now() - 60_000).toISOString();
    const { count } = await supabase
      .from('gemini_calls_log')
      .select('id', { count: 'exact', head: true })
      .gte('called_at', cutoff);
    return count ?? 0;
  }

  async function callGemini(prompt: string, signal: AbortSignal, retries = 2): Promise<Response | null> {
    const url = `${GEMINI_BASE}/${MODEL}:generateContent?key=${geminiApiKey}`;
    for (let attempt = 0; attempt <= retries; attempt++) {
      const res = await fetch(url, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        signal,
        body: JSON.stringify({
          contents: [{ parts: [{ text: prompt }] }],
          generationConfig: { temperature: 0.2, maxOutputTokens: 16384, responseMimeType: 'application/json' },
          safetySettings: [
            { category: 'HARM_CATEGORY_HARASSMENT', threshold: 'BLOCK_ONLY_HIGH' },
            { category: 'HARM_CATEGORY_HATE_SPEECH', threshold: 'BLOCK_ONLY_HIGH' },
            { category: 'HARM_CATEGORY_SEXUALLY_EXPLICIT', threshold: 'BLOCK_ONLY_HIGH' },
            { category: 'HARM_CATEGORY_DANGEROUS_CONTENT', threshold: 'BLOCK_ONLY_HIGH' },
          ],
        }),
      });
      if (res.status === 429 && attempt < retries) {
        const waitMs = (attempt + 1) * 3000;
        log.push(`Gemini 429 — retry ${attempt + 1}/${retries} in ${waitMs}ms`);
        await new Promise(r => setTimeout(r, waitMs));
        continue;
      }
      return res;
    }
    return null;
  }

  // ─── CIRCUIT BREAKER CHECK ──────────────────────────────────────────────
  const errs = await recentErrors(5);
  if (errs >= 3) {
    const { data: lastErr } = await supabase
      .from('gemini_calls_log')
      .select('called_at')
      .eq('giorno', todayDate())
      .neq('esito', 'ok')
      .order('called_at', { ascending: false })
      .limit(1)
      .single();
    if (lastErr) {
      const elapsed = Date.now() - new Date(lastErr.called_at).getTime();
      if (elapsed < CONFIG.circuitBreakerResetMs) {
        log.push(`Circuit breaker aperto (${Math.round((CONFIG.circuitBreakerResetMs - elapsed) / 1000)}s rimanenti)`);
        return new Response(JSON.stringify({
          message: `Circuit breaker aperto. ${log.join('. ')}`, log, mode: 'circuit_breaker',
          elapsedMs: Date.now() - startTime,
        }), { status: 200, headers: { ...corsHeaders, 'Content-Type': 'application/json' } });
      }
    }
  }

  // ─── SWISS-WATCH ADAPTIVE TARGETING ─────────────────────────────────────
  // Milgiorato: 400 RPD distribuiti uniformemente su 288 slot da 5 minuti
  // Ogni slot ha diritto a 400/288 = 1.389 chiamate.
  // Se siamo in debito (chiamate effettive < attese), facciamo 2 chiamate.
  // Se siamo in pari o in anticipo, facciamo 1 chiamata.
  // Nessun picco, nessun blocco, nessuna quota bruciata in anticipo.
  const TOTAL_SLOTS = 288; // 24 * 60 / 5
  const daily = await countDailyCalls();
  const remainingRpd = CONFIG.rpdLimit - daily;
  if (remainingRpd <= 0) {
    log.push(`Quota RPD esaurita (${daily}/${CONFIG.rpdLimit})`);
    return new Response(JSON.stringify({
      message: `Quota esaurita (${daily}/${CONFIG.rpdLimit}).`, log, mode: 'quota_esaurita',
      elapsedMs: Date.now() - startTime,
    }), { status: 200, headers: { ...corsHeaders, 'Content-Type': 'application/json' } });
  }

  const now = new Date();
  const minsLeft = (23 - now.getUTCHours()) * 60 + (59 - now.getUTCMinutes());
  const safeMins = Math.max(minsLeft, 5);
  const slotsElapsed = TOTAL_SLOTS - Math.ceil(safeMins / 5);
  const expectedCalls = Math.round((slotsElapsed / TOTAL_SLOTS) * CONFIG.rpdLimit);
  const debtCalls = Math.max(0, expectedCalls - daily);
  let targetCallsThisRun: number;
  if (debtCalls >= 1) {
    targetCallsThisRun = Math.min(2, debtCalls + 1);
  } else {
    targetCallsThisRun = 1;
  }
  log.push(`RPD: ${daily}/${CONFIG.rpdLimit}, ${remainingRpd} rimanenti, slot#${slotsElapsed}/${TOTAL_SLOTS}, attese=${expectedCalls}, debito=${debtCalls}, target=${targetCallsThisRun}`);

  // ─── ACQUIRE DOCUMENTS (QUEUE LOCK) ─────────────────────────────────────
  const lockCutoff = new Date(Date.now() - 300_000).toISOString();
  const { data: docs, error: docsErr } = await supabase
    .from('source_documents')
    .select('*')
    .eq('elaborato', false)
    .lt('tentativi', CONFIG.maxRetries)
    .or(`processing_started_at.is.null,processing_started_at.lt.${lockCutoff}`)
    .order('data_rilevamento', { ascending: true })
    .limit(CONFIG.batchReadLimit);

  if (docsErr) throw docsErr;
  if (!docs || docs.length === 0) {
    log.push('Nessun documento in coda.');
    return new Response(JSON.stringify({
      message: 'Coda vuota.', log, mode: 'idle',
      elapsedMs: Date.now() - startTime,
    }), { status: 200, headers: { ...corsHeaders, 'Content-Type': 'application/json' } });
  }

  // Lock selected documents (atomic pick)
  const pickCount = Math.min(docs.length, CONFIG.maxDocsPerCall * targetCallsThisRun);
  const picked = docs.slice(0, Math.min(pickCount, CONFIG.batchReadLimit));
  const pickedIds = picked.map(d => d.id);
  await supabase
    .from('source_documents')
    .update({ processing_started_at: new Date().toISOString() })
    .in('id', pickedIds)
    .eq('elaborato', false)
    .is('processing_started_at', null);

  // Re-read only what we locked
  const { data: locked } = await supabase
    .from('source_documents')
    .select('*')
    .in('id', pickedIds)
    .not('processing_started_at', 'is', null);
  const owned = locked || [];
  log.push(`Acquisiti ${owned.length}/${pickedIds.length} documenti (lock)`);

  if (owned.length === 0) {
    log.push('Nessun documento acquisibile.');
    return new Response(JSON.stringify({
      message: 'Nessun documento acquisibile.', log, mode: 'contended',
      elapsedMs: Date.now() - startTime,
    }), { status: 200, headers: { ...corsHeaders, 'Content-Type': 'application/json' } });
  }

  // ─── BUILD SOURCE MAP ───────────────────────────────────────────────────
  const sourceIds = [...new Set(owned.map(d => d.source_id))];
  const { data: sources } = await supabase
    .from('monitored_sources').select('id, nome, livello, url').in('id', sourceIds);
  const sourceMap = new Map<string, { nome: string; livello: string; url: string }>();
  if (sources) for (const s of sources) sourceMap.set(s.id, s);

  // ─── PROCESS LOOP (LEAKY BUCKET) ────────────────────────────────────────
  let processed = 0;
  let created = 0;
  let skipped = 0;
  let errored = 0;
  let consecutiveErrors = 0;
  let geminiCallsMade = 0;

  while (processed < owned.length) {
    const elapsed = Date.now() - startTime;
    if (elapsed > CONFIG.maxRuntimeMs - 10_000) { log.push('Runtime esaurito'); break; }
    if (geminiCallsMade >= targetCallsThisRun) { log.push(`Target ${targetCallsThisRun} chiamate raggiunto`); break; }

    // RPM check
    const rpm = await countRpm();
    if (rpm >= CONFIG.rpmLimit) { log.push(`RPM ${rpm}/${CONFIG.rpmLimit}, attesa...`); await sleep(6_000); continue; }

    // Build batch
    const batchSize = Math.min(CONFIG.maxDocsPerCall, owned.length - processed);
    const batch = owned.slice(processed, processed + batchSize);

    const geminiInput = batch.map((d, i) => ({
      idx: i,
      titolo: d.titolo || '',
      contenuto: (d.contenuto_raw || '').slice(0, 2000),
      fonte_nome: sourceMap.get(d.source_id)?.nome || 'Sconosciuta',
      fonte_url: d.url || '',
    }));

    // Dedup check: salta documenti con contenuto simile nelle ultime 48h
    const dedupResults = await Promise.all(
      geminiInput.map(d => isDuplicate(supabase, d.titolo, d.contenuto))
    );
    const allDups = dedupResults.every(r => r);
    if (allDups) {
      log.push(`Batch ${batch.length} documenti: tutti duplicati, skip`);
      for (const d of batch) {
        await supabase.from('source_documents').update({
          elaborato: true, tentativi: (d.tentativi || 0) + 1, processing_started_at: null,
        }).eq('id', d.id);
      }
      skipped += batch.length;
      processed += batch.length;
      continue;
    }

    // Filtra solo i non-duplicati dal batch
    const nonDupIndices = geminiInput.map((_, i) => i).filter(i => !dedupResults[i]);
    if (nonDupIndices.length < geminiInput.length) {
      const skippedCount = geminiInput.length - nonDupIndices.length;
      for (let i = 0; i < geminiInput.length; i++) {
        if (dedupResults[i]) {
          await supabase.from('source_documents').update({
            elaborato: true, tentativi: (batch[i].tentativi || 0) + 1, processing_started_at: null,
          }).eq('id', batch[i].id);
          skipped++;
        }
      }
      log.push(`${skippedCount} duplicati rimossi dal batch, ${nonDupIndices.length} da processare`);
    }

    const filteredBatch = nonDupIndices.map(i => batch[i]);
    const filteredInput = nonDupIndices.map(i => geminiInput[i]);
    if (filteredBatch.length === 0) {
      processed += batch.length;
      continue;
    }

    const targetBatch = filteredBatch.length > 0 ? filteredBatch : batch;
    const prompt = buildPrompt(filteredInput);
    const controller = new AbortController();
    const timeoutId = setTimeout(() => controller.abort(), CONFIG.geminiTimeoutMs);

    let aiResult: GeminiResponse | null = null;
    let callSuccess = false;

    try {
      // Exponential backoff loop
      let resp: Response | null = null;
      for (let attempt = 0; attempt <= CONFIG.maxRetries; attempt++) {
        if (attempt > 0) {
          const backoff = Math.min(CONFIG.backoffBaseMs * Math.pow(2, attempt - 1), CONFIG.backoffMaxMs);
          log.push(`Backoff ${attempt}: attesa ${backoff}ms`);
          await sleep(backoff);
        }
        resp = await callGemini(prompt, controller.signal);
        if (resp && resp.ok) break;
        if (resp && resp.status === 429) {
          await recordCall('429_rate_limit', Date.now() - startTime - elapsed);
          consecutiveErrors++;
          if (consecutiveErrors >= 3) {
            log.push('Circuit breaker: 3 errori consecutivi, pausa 5 min');
            await recordCall('circuit_breaker_opened', 0);
            clearTimeout(timeoutId);
            // Unlock remaining docs
            const remaining = owned.slice(processed);
            for (const d of remaining) {
              await supabase.from('source_documents').update({ processing_started_at: null }).eq('id', d.id);
            }
            processed = owned.length; // exit loop
            break;
          }
          continue;
        }
        if (resp && !resp.ok && resp.status !== 429) {
          // Non-rate-limit error
          consecutiveErrors++;
          const errBody = await resp.text().catch(() => '');
          log.push(`Gemini HTTP ${resp.status}: ${errBody.slice(0, 200)}`);
          continue;
        }
      }

      if (processed >= owned.length) break; // circuit breaker exit

      clearTimeout(timeoutId);
      geminiCallsMade++;

      if (!resp) throw new Error('Nessuna risposta da Gemini');
      const callDur = Date.now() - startTime - elapsed;
      await recordCall(resp.ok ? 'ok' : `http_${resp.status}`, callDur);

      if (!resp.ok) {
        const errBody = await resp.text().catch(() => '');
        log.push(`Gemini fallito HTTP ${resp.status}: ${errBody.slice(0, 200)}`);
        consecutiveErrors++;
        // Mark batch as errored
        const errBatch = targetBatch.length > 0 ? targetBatch : batch;
        for (const d of errBatch) {
          const t = (d.tentativi || 0) + 1;
          const upd: Record<string, unknown> = { tentativi: t, processing_started_at: null };
          if (t >= CONFIG.maxRetries) { upd.elaborato = true; upd.errore_msg = `HTTP ${resp.status}`; }
          await supabase.from('source_documents').update(upd).eq('id', d.id);
        }
        errored += errBatch.length;
        processed += errBatch.length;
        continue;
      }

      // Success — reset consecutive errors counter
      consecutiveErrors = 0;

      // Parse response
      const data = await resp.json();
      const candidate = data?.candidates?.[0] || {};
      const text = candidate?.content?.parts?.[0]?.text || '';
      const finishReason = candidate?.finishReason || 'UNKNOWN';

      if (data.promptFeedback?.blockReason) {
        for (const d of targetBatch) {
          await supabase.from('source_documents').update({
            elaborato: true, errore_msg: `Bloccato: ${data.promptFeedback.blockReason}`,
            processing_started_at: null,
          }).eq('id', d.id);
        }
        errored += targetBatch.length;
        processed += targetBatch.length;
        continue;
      }

      aiResult = parseResponse(text);
      if (!aiResult) {
        log.push(`Parse fallito (finish=${finishReason}, len=${text.length})`);
        for (const d of targetBatch) {
          const t = (d.tentativi || 0) + 1;
          const upd: Record<string, unknown> = { tentativi: t, processing_started_at: null };
          if (t >= CONFIG.maxRetries) { upd.elaborato = true; upd.errore_msg = `Parse error (${finishReason})`; }
          await supabase.from('source_documents').update(upd).eq('id', d.id);
        }
        errored += targetBatch.length;
        processed += targetBatch.length;
        continue;
      }

      // ─── ATOMIC WRITE ────────────────────────────────────────────────────
      for (const item of aiResult.documenti) {
        if (item.idx === undefined || item.idx < 0 || item.idx >= targetBatch.length) continue;
        const doc = targetBatch[item.idx];

        if (item.categoria === 'nessuna' || !item.titolo) {
          await supabase.from('source_documents').update({
            elaborato: true, tentativi: (doc.tentativi || 0) + 1, processing_started_at: null,
          }).eq('id', doc.id);
          skipped++;
          continue;
        }

        // Check if already processed (idempotency)
        const { data: alreadyDone } = await supabase
          .from('source_documents')
          .select('id, elaborato')
          .eq('id', doc.id)
          .eq('elaborato', true)
          .maybeSingle();
        if (alreadyDone) {
          skipped++;
          continue;
        }

        const peso: Record<string, number> = { A: 100, B: 90, C: 70, D: 60, E: 50, F: 40 };
        const categoria = normalizeCategory(item.categoria || '');

        // Check for duplicate hash before insert
        const { data: existing } = await supabase
          .from('intelligence_news')
          .select('id')
          .eq('source_document_id', doc.id)
          .maybeSingle();
        if (existing) {
          await supabase.from('source_documents').update({
            elaborato: true, tentativi: (doc.tentativi || 0) + 1, processing_started_at: null,
          }).eq('id', doc.id);
          skipped++;
          continue;
        }

        // Insert news + scadenze in sequence (best-effort atomicity)
        const { data: newsRow, error: newsErr } = await supabase
          .from('intelligence_news')
          .insert({
            titolo: item.titolo,
            descrizione: item.descrizione || '',
            data_pubblicazione: item.data_pubblicazione
              ? new Date(item.data_pubblicazione).toISOString()
              : new Date().toISOString(),
            fonte_livello: item.fonte_livello || 'F',
            fonte_nome: item.fonte_nome || sourceMap.get(doc.source_id)?.nome || 'Fonte Automatica',
            fonte_url: item.fonte_url || doc.url,
            fonte_peso: peso[item.fonte_livello] || 50,
            criticita: item.criticita || 'media',
            impatto: item.impatto || 'nazionale',
            platea: item.platea || 'ampia',
            target: item.target || ['docenti'],
            categoria,
            fonte_primaria: item.fonte_primaria || '',
            fonte_url_dettaglio: doc.url,
            produzione_livelli: item.produzione_livelli || [],
            tag: item.tag || [],
            link: item.link || doc.url || '',
            is_pinned: item.is_pinned || false,
            regione: item.regione || null,
            source_document_id: doc.id,
            ultimo_aggiornamento: new Date().toISOString(),
          })
          .select('id')
          .single();

        if (newsErr) {
          log.push(`Insert news fallito: ${newsErr.message.slice(0, 200)}`);
          await supabase.from('source_documents').update({
            tentativi: (doc.tentativi || 0) + 1, errore_msg: newsErr.message, processing_started_at: null,
          }).eq('id', doc.id);
          errored++;
          continue;
        }

        // Insert scadenze
        const scadenze = item.scadenze || [];
        if (scadenze.length > 0) {
          const scadRows = scadenze.map(s => {
            const suggerimenti = s.suggerimenti_esperto || '';
            const guida = s.guida_operativa || '';
            const guidaCompleta = guida + (suggerimenti ? `\n\n💡 Suggerimenti dell'Esperto:\n${suggerimenti}` : '');
            return {
              news_id: newsRow.id,
              titolo: s.titolo || '',
              descrizione: s.conseguenze_non_azione || '',
              normativa: s.normativa || '',
              soggetti_coinvolti: s.soggetti_coinvolti || [],
              data_scadenza: s.data_scadenza || null,
              priorita: s.priorita || 'media',
              impatto: s.impatto || 'nazionale',
              conseguenze_non_azione: s.conseguenze_non_azione || '',
              guida_operativa: guidaCompleta,
              tipo: s.tipo || 'Adempimenti',
              auto_generata: true,
              is_conclusa: false,
              regione: s.regione || null,
            };
          });
          const { error: scadErr } = await supabase.from('intelligence_scadenze').insert(scadRows);
          if (scadErr) log.push(`Scadenze insert warning: ${scadErr.message.slice(0, 200)}`);
        }

        // Mark source doc as completed
        await supabase.from('source_documents').update({
          elaborato: true, news_generata_id: newsRow.id,
          tentativi: (doc.tentativi || 0) + 1, errore_msg: null, processing_started_at: null,
        }).eq('id', doc.id);

        created++;
      }

      processed += targetBatch.length;

      // Gap between calls (leaky bucket)
      if (processed < owned.length && Date.now() - startTime < CONFIG.maxRuntimeMs - 15_000) {
        const delayMs = Math.max(
          Math.floor(45_000 / Math.max(geminiCallsMade + 1, 1) / 2),
          6_000,
        );
        await sleep(Math.min(delayMs, 15_000));
      }

    } catch (err) {
      clearTimeout(timeoutId);
      const errMsg = err instanceof Error ? err.message : String(err);
      log.push(`Errore: ${errMsg}`);
      consecutiveErrors++;
      const errBatch = targetBatch.length > 0 ? targetBatch : batch;
      for (const d of errBatch) {
        const t = (d.tentativi || 0) + 1;
        const upd: Record<string, unknown> = { tentativi: t, processing_started_at: null };
        if (t >= CONFIG.maxRetries) { upd.elaborato = true; upd.errore_msg = errMsg; }
        await supabase.from('source_documents').update(upd).eq('id', d.id);
      }
      errored += errBatch.length;
      processed += errBatch.length;
    }
  }

  // ─── UNLOCK ANY REMAINING DOCUMENTS ─────────────────────────────────────
  if (processed < owned.length) {
    const remaining = owned.slice(processed);
    for (const d of remaining) {
      await supabase.from('source_documents').update({ processing_started_at: null }).eq('id', d.id);
    }
    log.push(`Sbloccati ${remaining.length} documenti residui`);
  }

  const pending = owned.length - processed;

  return new Response(JSON.stringify({
    message: `Elaborati ${processed} documenti (${created} creati, ${skipped} saltati, ${errored} errori).${pending > 0 ? ` ${pending} non processati.` : ''}`,
    created, skipped, errored, pending,
    geminiCalls: geminiCallsMade,
    modello: MODEL,
    log,
    elapsedMs: Date.now() - startTime,
  }), { status: 200, headers: { ...corsHeaders, 'Content-Type': 'application/json' } });
});
