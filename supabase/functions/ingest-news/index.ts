// @ts-nocheck
import { createClient } from 'https://esm.sh/@supabase/supabase-js@2.57.4?target=deno';

const corsHeaders = {
  'Access-Control-Allow-Origin': '*',
  'Access-Control-Allow-Methods': 'POST, OPTIONS',
  'Access-Control-Allow-Headers': 'Content-Type, Authorization',
};

const MAX_REQUESTS_PER_MINUTE = 14;
const MAX_REQUESTS_PER_DAY = 1450;
const WINDOW_MS = 60_000;

class RateLimiter {
  private minuteTimestamps: number[] = [];
  private dayCount: number = 0;
  private dayReset: number = Date.now() + 86_400_000;

  async waitForSlot(): Promise<void> {
    const now = Date.now();
    if (now > this.dayReset) {
      this.dayCount = 0;
      this.dayReset = now + 86_400_000;
    }
    if (this.dayCount >= MAX_REQUESTS_PER_DAY) {
      const waitUntil = this.dayReset - now + 5_000;
      await new Promise(r => setTimeout(r, waitUntil));
      return this.waitForSlot();
    }
    this.minuteTimestamps = this.minuteTimestamps.filter(t => now - t < WINDOW_MS);
    if (this.minuteTimestamps.length >= MAX_REQUESTS_PER_MINUTE) {
      const oldest = this.minuteTimestamps[0];
      const waitTime = WINDOW_MS - (now - oldest) + 500;
      await new Promise(r => setTimeout(r, waitTime));
      return this.waitForSlot();
    }
    this.minuteTimestamps.push(now);
    this.dayCount++;
  }

  getStats() {
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

const GEMINI_MODEL = 'gemini-2.5-flash';
const GEMINI_BASE_URL = 'https://generativelanguage.googleapis.com/v1beta/models';

const CATEGORIE_SCADENZA = [
  'Iscrizioni, Bandi e Concorsi pubblici',
  'Aggiornamento e Inserimento Graduatorie',
  'Mobilit\u00e0 del Personale Scolastico',
  'Immissioni in Ruolo e Supplenze',
  'Cessazioni dal Servizio e Pensionamenti',
  'Adempimenti Amministrativi e Sicurezza',
  'Esami di Stato, Scrutini e Valutazioni',
  'Formazione Obbligatoria e Periodo di Prova',
] as const;

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
    categoria_scadenza: string;
    regione: string;
  }>;
}

function buildPrompt(titolo: string, contenuto: string, sourceName: string, sourceUrl: string): string {
  const contenutoBreve = contenuto.length > 2000
    ? contenuto.slice(0, 2000) + '\n...[TRONCATO]'
    : contenuto;
  return `Sei un giornalista specializzato in istruzione scolastica italiana. Analizza il documento grezzo fornito e genera un contenuto editoriale originale seguendo il modello a 7 livelli di produzione.

DOCUMENTO DA ANALIZZARE:
TITOLO: ${titolo}
FONTE: ${sourceName} (${sourceUrl})
CONTENUTO: ${contenutoBreve}

REGOLE ASSOLUTE:
- NON copiare. Rielabora professionalmente.
- criticita: bassa | media | alta | urgente | strategica
- impatto: locale | regionale | nazionale
- platea: limitata | ampia | intero_sistema
- target: scegli tra [docenti, aspiranti_docenti, sostegno, ata, amministrativi, collaboratori, dsga, dirigenti, educatori, pedagogisti, formatori, universita, sindacati, famiglie, studenti, decisori_pubblici]
- categoria: SCEGLI UNA tra: 1. Bandi/Concorsi/Selezioni, 2. Didattica/Formazione/Innovazione, 3. Graduatorie (GPS/GAE/d'Istituto), 4. Contratti/Salari/ATA, 5. Pensioni/Previdenza/Welfare, 6. Normative/Circolari Ministeriali, 7. Mobilita/Assegnazioni, 8. Esami di Stato/Valutazioni
- fonte_livello: A | B | C | D | E | F
- Se non riguarda istruzione, categoria="nessuna"

Rispondi ESCLUSIVAMENTE con JSON valido, senza markdown:
{titolo, descrizione, fonte_livello, fonte_nome, fonte_url, criticita, impatto, platea, target, categoria, fonte_primaria, tag, link, is_pinned, produzione_livelli, scadenze}`;
}

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
      return new Response(JSON.stringify({ error: 'GEMINI_API_KEY non configurata.' }), {
        status: 400,
        headers: { ...corsHeaders, 'Content-Type': 'application/json' },
      });
    }

    const supabase = createClient(supabaseUrl, supabaseServiceKey);

    let batchSize = 2;
    try {
      const raw = await req.text();
      const body = raw ? JSON.parse(raw) : {};
      if (body.batch != null && Number(body.batch) > 0) {
        batchSize = Math.min(Number(body.batch), 50);
      }
    } catch {}

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
        elapsedMs: Date.now() - startTime,
      }), { status: 200, headers: { ...corsHeaders, 'Content-Type': 'application/json' } });
    }

    const results: Array<{ titolo: string; status: string; error?: string }> = [];
    const MAX_RUNTIME_MS = 50_000;

    for (let i = 0; i < documents.length; i++) {
      const doc = documents[i] as SourceDocument;
      const elapsed = Date.now() - startTime;
      const remaining = MAX_RUNTIME_MS - elapsed;

      if (remaining < 5_000) break;
      if (i > 0) await new Promise(r => setTimeout(r, 400));

      try {
        const prompt = buildPrompt(doc.titolo || '', doc.contenuto_raw || '', doc.source_id || '', doc.url || '');
        const controller = new AbortController();
        const t = setTimeout(() => controller.abort(), 30_000);

        const geminiResp = await fetch(`${GEMINI_BASE_URL}/${GEMINI_MODEL}:generateContent?key=${geminiApiKey}`, {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          signal: controller.signal,
          body: JSON.stringify({
            contents: [{ parts: [{ text: prompt }] }],
            generationConfig: { temperature: 0.2, maxOutputTokens: 8192, responseMimeType: 'application/json' },
            safetySettings: [
              { category: 'HARM_CATEGORY_HARASSMENT', threshold: 'BLOCK_ONLY_HIGH' },
              { category: 'HARM_CATEGORY_HATE_SPEECH', threshold: 'BLOCK_ONLY_HIGH' },
              { category: 'HARM_CATEGORY_SEXUALLY_EXPLICIT', threshold: 'BLOCK_ONLY_HIGH' },
              { category: 'HARM_CATEGORY_DANGEROUS_CONTENT', threshold: 'BLOCK_ONLY_HIGH' },
            ],
          }),
        });

        clearTimeout(t);

        if (!geminiResp.ok) {
          if (geminiResp.status === 429) {
            const body429 = await geminiResp.text().catch(() => '');
            if (body429.includes('quota')) {
              results.push({ titolo: doc.titolo?.slice(0, 40), status: 'quota_exhausted' });
              break;
            }
            const retryAfter = parseInt(geminiResp.headers.get('retry-after') || '12', 10);
            await new Promise(r => setTimeout(r, Math.min(retryAfter, 30) * 1000));
            i--;
            continue;
          }
          throw new Error(`Gemini HTTP ${geminiResp.status}`);
        }

        const data = await geminiResp.json();

        if (data.promptFeedback?.blockReason) {
          await supabase.from('source_documents').update({ elaborato: true }).eq('id', doc.id);
          results.push({ titolo: doc.titolo?.slice(0, 40), status: 'blocked' });
          continue;
        }

        const text = data?.candidates?.[0]?.content?.parts?.[0]?.text || '';

        const tryParse = (s: string): GeminiResponse | null => {
          try {
            const cleaned = s.replace(/^```(?:json)?\s*/, '').replace(/\s*```$/, '').trim();
            const jsonMatch = cleaned.match(/\{[\s\S]*\}/);
            if (jsonMatch) return JSON.parse(jsonMatch[0]);
            return JSON.parse(cleaned);
          } catch { return null; }
        };

        let aiResult = tryParse(text);
        if (!aiResult) {
          aiResult = tryParse(text.replace(/[\u0000-\u001F\u007F-\u009F]/g, ''));
        }
        if (!aiResult) {
          results.push({ titolo: doc.titolo?.slice(0, 40), status: 'parse_error' });
          continue;
        }

        if (aiResult.categoria === 'nessuna' || !aiResult.titolo) {
          await supabase.from('source_documents').update({ elaborato: true }).eq('id', doc.id);
          results.push({ titolo: doc.titolo?.slice(0, 40), status: 'skipped' });
          continue;
        }

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

        if (newsError) throw new Error(`Errore insert DB: ${newsError.message}`);

        await supabase.from('source_documents').update({
          elaborato: true,
          news_generata_id: news.id,
        }).eq('id', doc.id);

        results.push({ titolo: aiResult.titolo, status: 'created' });

      } catch (err) {
        const errMsg = err instanceof Error ? err.message : String(err);
        await supabase.from('source_documents').update({ elaborato: true }).eq('id', doc.id);
        results.push({ titolo: doc.titolo?.slice(0, 40), status: 'error', error: errMsg });
      }
    }

    const created = results.filter(r => r.status === 'created').length;
    const skipped = results.filter(r => r.status === 'skipped').length;
    const errored = results.filter(r => r.status === 'error').length;
    const quotaBlocked = results.filter(r => r.status === 'quota_exhausted').length;
    const pending = documents.length - results.length;

    if (quotaBlocked > 0) {
      return new Response(JSON.stringify({
        message: `Quota Gemini esaurita. ${pending} documenti rimandati al prossimo ciclo.`,
        created, skipped, errored, quotaBlocked, pending,
        elapsedMs: Date.now() - startTime,
      }), { status: 200, headers: { ...corsHeaders, 'Content-Type': 'application/json' } });
    }

    return new Response(JSON.stringify({
      message: `Elaborati ${results.length} documenti (${created} creati, ${skipped} saltati, ${errored} errori).${pending > 0 ? ` ${pending} rimandati.` : ''}`,
      created, skipped, errored, pending,
      elapsedMs: Date.now() - startTime,
    }), { status: 200, headers: { ...corsHeaders, 'Content-Type': 'application/json' } });

  } catch (err) {
    return new Response(JSON.stringify({ error: err instanceof Error ? err.message : String(err) }), {
      status: 500,
      headers: { ...corsHeaders, 'Content-Type': 'application/json' },
    });
  }
});
