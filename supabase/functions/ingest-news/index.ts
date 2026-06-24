// @ts-nocheck
import { createClient } from 'https://esm.sh/@supabase/supabase-js@2.57.4?target=deno';

const corsHeaders = {
  'Access-Control-Allow-Origin': '*',
  'Access-Control-Allow-Methods': 'POST, OPTIONS',
  'Access-Control-Allow-Headers': 'Content-Type, Authorization',
};

// --- RATE LIMITER (sliding window) ---
// Gemini 1.5 Flash Free Tier: 15 richieste/minuto, 1500 richieste/giorno
const MAX_REQUESTS_PER_MINUTE = 14;   // 1 di buffer sotto il limite di 15
const MAX_REQUESTS_PER_DAY = 1450;    // 50 di buffer sotto il limite di 1500
const WINDOW_MS = 60_000;

class RateLimiter {
  private minuteTimestamps: number[] = [];
  private dayCount: number = 0;
  private dayReset: number = Date.now() + 86_400_000;

  async waitForSlot(): Promise<void> {
    const now = Date.now();

    // Reset contatore giornaliero se passate 24h
    if (now > this.dayReset) {
      this.dayCount = 0;
      this.dayReset = now + 86_400_000;
    }

    // Limite giornaliero
    if (this.dayCount >= MAX_REQUESTS_PER_DAY) {
      const waitUntil = this.dayReset - now + 5_000;
      console.warn(`Limite giornaliero raggiunto (${this.dayCount}/${MAX_REQUESTS_PER_DAY}). Attendo ${Math.ceil(waitUntil / 1000)}s...`);
      await new Promise(r => setTimeout(r, waitUntil));
      return this.waitForSlot();
    }

    // Pulisci timestamps scaduti (finestra mobile)
    this.minuteTimestamps = this.minuteTimestamps.filter(t => now - t < WINDOW_MS);

    // Se abbiamo raggiunto il limite al minuto, attendi
    if (this.minuteTimestamps.length >= MAX_REQUESTS_PER_MINUTE) {
      const oldest = this.minuteTimestamps[0];
      const waitTime = WINDOW_MS - (now - oldest) + 500;
      console.log(`Rate limit minute: ${this.minuteTimestamps.length}/${MAX_REQUESTS_PER_MINUTE}. Attendo ${Math.ceil(waitTime / 1000)}s...`);
      await new Promise(r => setTimeout(r, waitTime));
      return this.waitForSlot();
    }

    // Concedi slot
    this.minuteTimestamps.push(now);
    this.dayCount++;
  }

  getStats(): { rpm: number; rpmMax: number; rpd: number; rpdMax: number } {
    const now = Date.now();
    this.minuteTimestamps = this.minuteTimestamps.filter(t => now - t < WINDOW_MS);
    return {
      rpm: this.minuteTimestamps.length,
      rpmMax: MAX_REQUESTS_PER_MINUTE,
      rpd: this.dayCount,
      rpdMax: MAX_REQUESTS_PER_DAY,
    };
  }
}

const rateLimiter = new RateLimiter();

// --- MODELLO GEMINI ---
const GEMINI_MODEL = 'gemini-1.5-flash';
const GEMINI_BASE_URL = 'https://generativelanguage.googleapis.com/v1beta/models';

// --- TIPI ---
interface SourceDocument {
  id: string;
  source_id: string;
  url: string | null;
  titolo: string;
  contenuto_raw: string;
  hash_contenuto: string;
  data_rilevamento: string;
  elaborato: boolean;
}

interface GeminiResponse {
  titolo: string;
  descrizione: string;
  fonte_livello: string;
  fonte_nome: string;
  fonte_url: string;
  criticita: string;
  impatto: string;
  platea: string;
  target: string[];
  categoria: string;
  fonte_primaria: string;
  tag: string[];
  link: string;
  is_pinned: boolean;
  produzione_livelli: Array<{
    livello: number;
    titolo: string;
    contenuto: string;
  }>;
  scadenze: Array<{
    titolo: string;
    normativa: string;
    soggetti_coinvolti: string[];
    data_scadenza: string;
    priorita: string;
    conseguenze_non_azione: string;
    guida_operativa: string;
  }>;
}

// --- PROMPT DI SISTEMA per Gemini ---
function buildPrompt(titolo: string, contenuto: string): string {
  return `Sei un giornalista specializzato in istruzione scolastica italiana. Analizza il documento grezzo fornito e genera un contenuto editoriale originale seguendo il modello a 7 livelli di produzione.

DOCUMENTO DA ANALIZZARE:
TITOLO: ${titolo}
CONTENUTO: ${contenuto}

REGOLE ASSOLUTE:
- NON copiare. Rielabora professionalmente.
- criticità: bassa | media | alta | urgente | strategica
- impatto: locale | regionale | nazionale
- platea: limitata | ampia | intero_sistema
- target: scegli tra [docenti, aspiranti_docenti, sostegno, ata, amministrativi, collaboratori, dsga, dirigenti, educatori, pedagogisti, formatori, universita, sindacati, famiglie, studenti, decisori_pubblici]
- categoria: normativa | reclutamento | personale | inclusione | innovazione | governance
- fonte_livello: A | B | C | D | E | F
- Se il contenuto non riguarda l'istruzione scolastica, imposta "categoria" come "nessuna" e produzione_livelli vuoto.

Rispondi ESCLUSIVAMENTE con un JSON valido, senza markdown, senza spiegazioni, seguendo ESATTAMENTE questa struttura:
{
  "titolo": "Titolo chiaro, specifico, orientato all'impatto",
  "descrizione": "Sintesi immediata (max 5 righe). Cosa è successo, chi è coinvolto, cosa deve fare",
  "fonte_livello": "A",
  "fonte_nome": "MIM",
  "fonte_url": "https://...",
  "criticita": "media",
  "impatto": "nazionale",
  "platea": "ampia",
  "target": ["docenti", "aspiranti_docenti"],
  "categoria": "reclutamento",
  "fonte_primaria": "Riferimento normativo esatto",
  "tag": ["tag1", "tag2"],
  "link": "https://...",
  "is_pinned": false,
  "produzione_livelli": [
    { "livello": 1, "titolo": "Notizia Immediata", "contenuto": "Testo conciso della notizia" },
    { "livello": 2, "titolo": "Analisi", "contenuto": "Spiegazione approfondita con contesto, motivazioni, conseguenze" },
    { "livello": 3, "titolo": "Impatto Operativo", "contenuto": "Cosa cambia realmente, chi deve agire, come deve agire" },
    { "livello": 4, "titolo": "Domande Frequenti", "contenuto": "D: domanda? R: risposta.\\nD: altra domanda? R: altra risposta." },
    { "livello": 5, "titolo": "Checklist", "contenuto": "1. Primo passo\\n2. Secondo passo\\n3. Terzo passo" },
    { "livello": 6, "titolo": "Cronologia Normativa", "contenuto": "• Norma 1 — descrizione\\n• Norma 2 — descrizione" },
    { "livello": 7, "titolo": "Scenari Futuri", "contenuto": "Proiezioni e possibili evoluzioni" }
  ],
  "scadenze": [
    { "titolo": "Titolo scadenza", "normativa": "Rif. normativo", "soggetti_coinvolti": ["docenti"], "data_scadenza": "2026-06-30", "priorita": "alta", "conseguenze_non_azione": "Cosa succede se non si rispetta", "guida_operativa": "Istruzioni passo passo" }
  ]
}`;
}

// --- CHIAMATA A GEMINI CON RATE LIMITING ---
async function callGemini(apiKey: string, prompt: string): Promise<GeminiResponse> {
  // Attendi il rate limiter prima di ogni richiesta
  await rateLimiter.waitForSlot();

  const url = `${GEMINI_BASE_URL}/${GEMINI_MODEL}:generateContent?key=${apiKey}`;

  const resp = await fetch(url, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({
      contents: [{ parts: [{ text: prompt }] }],
      generationConfig: {
        temperature: 0.2,
        maxOutputTokens: 4096,
        responseMimeType: 'application/json',
      },
      safetySettings: [
        { category: 'HARM_CATEGORY_HARASSMENT', threshold: 'BLOCK_ONLY_HIGH' },
        { category: 'HARM_CATEGORY_HATE_SPEECH', threshold: 'BLOCK_ONLY_HIGH' },
        { category: 'HARM_CATEGORY_SEXUALLY_EXPLICIT', threshold: 'BLOCK_ONLY_HIGH' },
        { category: 'HARM_CATEGORY_DANGEROUS_CONTENT', threshold: 'BLOCK_ONLY_HIGH' },
      ],
    }),
  });

  if (!resp.ok) {
    const errBody = await resp.text();
    let msg = `Gemini HTTP ${resp.status}`;

    // Rate limit esplicito da Google -> backoff più lungo
    if (resp.status === 429) {
      msg += ': RATE LIMIT raggiunto. Backoff automatico di 60s.';
      console.warn(msg);
      await new Promise(r => setTimeout(r, 60_000));
      // Riprova una volta
      return callGemini(apiKey, prompt);
    }

    if (resp.status === 403) {
      msg += `: QUOTA o API KEY non valida. ${errBody}`;
    } else {
      msg += `: ${errBody}`;
    }
    throw new Error(msg);
  }

  const data = await resp.json();

  // Bloccato da safety filter
  if (data.promptFeedback?.blockReason) {
    console.warn(`Contenuto bloccato da Gemini: ${data.promptFeedback.blockReason}`);
    return {
      titolo: '',
      descrizione: '',
      fonte_livello: 'F',
      fonte_nome: 'Fonte Automatica',
      fonte_url: '',
      criticita: 'media',
      impatto: 'nazionale',
      platea: 'ampia',
      target: ['docenti'],
      categoria: 'nessuna',
      fonte_primaria: '',
      tag: [],
      link: '',
      is_pinned: false,
      produzione_livelli: [],
      scadenze: [],
    };
  }

  const text = data.candidates?.[0]?.content?.parts?.[0]?.text || '';

  try {
    const jsonMatch = text.match(/\{[\s\S]*\}/);
    if (jsonMatch) return JSON.parse(jsonMatch[0]);
    return JSON.parse(text);
  } catch {
    throw new Error(`Risposta Gemini non valida: ${text.slice(0, 300)}`);
  }
}

// --- FUNZIONE PER CREARE KNOWLEDGE LINKS ---
async function createKnowledgeLinks(supabase: any, newsId: string, categoria: string, limit = 5) {
  try {
    const { data: relatedNews } = await supabase
      .from('intelligence_news')
      .select('id')
      .eq('categoria', categoria)
      .neq('id', newsId)
      .limit(limit);

    if (relatedNews) {
      for (const related of relatedNews) {
        await supabase.from('knowledge_links').insert({
          news_id_a: newsId,
          news_id_b: related.id,
          tipo_relazione: 'stesso_argomento',
          peso: 0.8,
        }).catch(() => {}); // Ignora duplicati
      }
    }
  } catch (e) {
    console.warn('Errore creazione knowledge links:', e.message);
  }
}

// --- FUNZIONE PER CREARE SCADENZE ---
async function createScadenze(supabase: any, newsId: string, aiResult: GeminiResponse) {
  if (!aiResult.scadenze || !Array.isArray(aiResult.scadenze)) return;

  for (const scadenza of aiResult.scadenze) {
    // Salta scadenze senza data
    if (!scadenza.data_scadenza) continue;

    await supabase.from('intelligence_scadenze').insert({
      news_id: newsId,
      titolo: scadenza.titolo || 'Scadenza: ' + aiResult.titolo,
      normativa: scadenza.normativa || aiResult.fonte_primaria,
      soggetti_coinvolti: scadenza.soggetti_coinvolti || aiResult.target,
      data_scadenza: scadenza.data_scadenza,
      priorita: scadenza.priorita || 'media',
      impatto: aiResult.impatto || 'nazionale',
      conseguenze_non_azione: scadenza.conseguenze_non_azione || '',
      guida_operativa: scadenza.guida_operativa || '',
      tipo: 'auto_' + (aiResult.categoria || 'generale'),
      auto_generata: true,
    }).catch((e) => console.warn('Errore creazione scadenza:', e.message));
  }
}

// --- HANDLER PRINCIPALE ---
Deno.serve(async (req) => {
  if (req.method === 'OPTIONS') {
    return new Response(null, { status: 204, headers: corsHeaders });
  }

  const startTime = Date.now();

  try {
    const supabaseUrl = Deno.env.get('SUPABASE_URL') || '';
    const supabaseServiceKey = Deno.env.get('SUPABASE_SERVICE_ROLE_KEY') || '';
    const geminiApiKey = Deno.env.get('GEMINI_API_KEY') || '';

    if (!geminiApiKey) {
      return new Response(JSON.stringify({ error: 'GEMINI_API_KEY non configurata. Imposta la variabile d\'ambiente GEMINI_API_KEY nelle Edge Functions di Supabase.' }), {
        status: 400,
        headers: { ...corsHeaders, 'Content-Type': 'application/json' },
      });
    }

    const supabase = createClient(supabaseUrl, supabaseServiceKey);

    // Leggi parametri: batch opzionale via body (default 5)
    let batchSize = 5;
    try {
      const body = await req.json().catch(() => ({}));
      if (body.batch && typeof body.batch === 'number' && body.batch > 0 && body.batch <= 20) {
        batchSize = body.batch;
      }
    } catch {}

    // --- 1. Ottieni documenti da elaborare (massimo batchSize) ---
    const { data: documents, error: docsError } = await supabase
      .from('source_documents')
      .select('*')
      .eq('elaborato', false)
      .order('data_rilevamento', { ascending: true })
      .limit(batchSize);

    if (docsError) throw docsError;
    if (!documents || documents.length === 0) {
      return new Response(JSON.stringify({
        message: 'Nessun documento da elaborare',
        stats: rateLimiter.getStats(),
        elapsedMs: Date.now() - startTime,
      }), {
        status: 200,
        headers: { ...corsHeaders, 'Content-Type': 'application/json' },
      });
    }

    console.log(`Avvio elaborazione ${documents.length} documenti...`);

    // --- 2. Elabora ogni documento con rate limiting ---
    const results: Array<{ titolo: string; status: string; error?: string }> = [];

    for (let i = 0; i < documents.length; i++) {
      const doc = documents[i] as SourceDocument;
      const progress = `[${i + 1}/${documents.length}]`;

      // Pausa tra un documento e l'altro (anche se il rate limiter già gestisce)
      if (i > 0) {
        const pause = Math.min(2000, 60_000 / MAX_REQUESTS_PER_MINUTE);
        await new Promise(r => setTimeout(r, pause));
      }

      try {
        console.log(`${progress} Analisi documento: ${doc.titolo?.slice(0, 80)}...`);
        const prompt = buildPrompt(doc.titolo || '', doc.contenuto_raw || '');
        const aiResult: GeminiResponse = await callGemini(geminiApiKey, prompt);

        // Se il contenuto non è pertinente, salta
        if (aiResult.categoria === 'nessuna' || !aiResult.titolo) {
          await supabase.from('source_documents').update({ elaborato: true }).eq('id', doc.id);
          results.push({ titolo: doc.titolo, status: 'skipped' });
          console.log(`${progress} SKIPPED (non pertinente): ${doc.titolo?.slice(0, 60)}`);
          continue;
        }

        // --- 3. Inserisci notizia intelligence ---
        const { data: news, error: newsError } = await supabase
          .from('intelligence_news')
          .insert({
            titolo: aiResult.titolo,
            descrizione: aiResult.descrizione || '',
            data_pubblicazione: new Date().toISOString(),
            fonte_livello: aiResult.fonte_livello || 'F',
            fonte_nome: aiResult.fonte_nome || 'Fonte Automatica',
            fonte_url: aiResult.fonte_url || doc.url,
            fonte_peso: 100,
            criticita: aiResult.criticita || 'media',
            impatto: aiResult.impatto || 'nazionale',
            platea: aiResult.platea || 'ampia',
            target: aiResult.target || ['docenti'],
            categoria: aiResult.categoria || 'normativa',
            fonte_primaria: aiResult.fonte_primaria || '',
            fonte_url_dettaglio: doc.url,
            produzione_livelli: aiResult.produzione_livelli || [],
            tag: aiResult.tag || [],
            link: aiResult.link || doc.url || '',
            is_pinned: aiResult.is_pinned || false,
            is_archived: false,
            source_document_id: doc.id,
            ultimo_aggiornamento: new Date().toISOString(),
          })
          .select()
          .single();

        if (newsError) {
          throw new Error(`Errore insert DB: ${newsError.message}`);
        }

        // --- 4. Marca documento come elaborato ---
        await supabase.from('source_documents').update({
          elaborato: true,
          news_generata_id: news.id,
        }).eq('id', doc.id);

        // --- 5. Crea knowledge links (async, non bloccante) ---
        createKnowledgeLinks(supabase, news.id, aiResult.categoria).catch(e =>
          console.warn(`Knowledge links fallito per ${news.id}:`, e.message)
        );

        // --- 6. Crea scadenze (async, non bloccante) ---
        createScadenze(supabase, news.id, aiResult).catch(e =>
          console.warn(`Scadenze fallito per ${news.id}:`, e.message)
        );

        results.push({ titolo: aiResult.titolo, status: 'created' });
        console.log(`${progress} CREATO: ${aiResult.titolo?.slice(0, 60)}`);

      } catch (err) {
        console.error(`${progress} ERRORE elaborazione documento ${doc.id}:`, err.message);
        // Marca come processato anche in errore per evitare cicli infiniti
        await supabase.from('source_documents').update({
          elaborato: true,
        }).eq('id', doc.id);
        results.push({ titolo: doc.titolo, status: 'error', error: err.message });
      }
    }

    const elapsed = Date.now() - startTime;

    // --- 7. Risultato ---
    const created = results.filter(r => r.status === 'created').length;
    const skipped = results.filter(r => r.status === 'skipped').length;
    const errored = results.filter(r => r.status === 'error').length;

    // Suggerisci prossima esecuzione se ci sono ancora documenti
    let nextAction = null;
    try {
      const { count } = await supabase
        .from('source_documents')
        .select('*', { count: 'exact', head: true })
        .eq('elaborato', false);
      if (count && count > 0) {
        const estimatedMs = Math.ceil(count / MAX_REQUESTS_PER_MINUTE) * 60_000;
        nextAction = {
          documenti_rimanenti: count,
          stima_secondi: Math.ceil(estimatedMs / 1000),
          suggerimento: 'Esegui ingest-news tra circa ' + Math.ceil(estimatedMs / 1000) + 's per elaborare i rimanenti',
        };
      }
    } catch {}

    return new Response(JSON.stringify({
      message: `Elaborati ${results.length} documenti (${created} creati, ${skipped} saltati, ${errored} errori).`,
      results,
      stats: rateLimiter.getStats(),
      elapsedMs: elapsed,
      nextAction,
    }), {
      status: 200,
      headers: { ...corsHeaders, 'Content-Type': 'application/json' },
    });

  } catch (err) {
    console.error('Errore ingest-news:', err.message);
    return new Response(JSON.stringify({
      error: err.message,
      stats: rateLimiter.getStats(),
    }), {
      status: 500,
      headers: { ...corsHeaders, 'Content-Type': 'application/json' },
    });
  }
});
