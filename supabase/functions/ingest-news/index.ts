// @ts-nocheck
import { createClient } from 'https://esm.sh/@supabase/supabase-js@2.57.4?target=deno';

const corsHeaders = {
  'Access-Control-Allow-Origin': '*',
  'Access-Control-Allow-Methods': 'POST, OPTIONS',
  'Access-Control-Allow-Headers': 'Content-Type, Authorization',
};

const OPENROUTER_BASE_URL = 'https://openrouter.ai/api/v1';
const MODEL = 'openai/gpt-4o-mini'; // fastest/cheapest for bulk ingestion

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

const SYSTEM_PROMPT = `Sei un giornalista specializzato in istruzione scolastica italiana. 
Analizza il documento grezzo fornito e genera un contenuto editoriale originale seguendo il modello a 7 livelli di produzione.

Rispondi SOLO con JSON valido, senza markdown, senza spiegazioni, seguendo ESATTAMENTE questa struttura:

{
  "titolo": "Titolo chiaro, specifico, orientato all'impatto",
  "descrizione": "Sintesi immediata (max 5 righe). L'utente deve capire: cosa è successo, chi è coinvolto, cosa deve fare",
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
    {
      "livello": 1,
      "titolo": "Notizia Immediata",
      "contenuto": "Testo conciso della notizia"
    },
    {
      "livello": 2,
      "titolo": "Analisi",
      "contenuto": "Spiegazione approfondita con contesto, motivazioni, conseguenze"
    },
    {
      "livello": 3,
      "titolo": "Impatto Operativo",
      "contenuto": "Cosa cambia realmente, chi deve agire, come deve agire"
    },
    {
      "livello": 4,
      "titolo": "Domande Frequenti",
      "contenuto": "D: domanda? R: risposta.\\nD: altra domanda? R: altra risposta."
    },
    {
      "livello": 5,
      "titolo": "Checklist",
      "contenuto": "1. Primo passo\\n2. Secondo passo\\n3. Terzo passo"
    },
    {
      "livello": 6,
      "titolo": "Cronologia Normativa",
      "contenuto": "• Norma 1 — descrizione\\n• Norma 2 — descrizione"
    },
    {
      "livello": 7,
      "titolo": "Scenari Futuri",
      "contenuto": "Proiezioni e possibili evoluzioni"
    }
  ],
  "scadenze": [
    {
      "titolo": "Titolo scadenza",
      "normativa": "Riferimento normativo",
      "soggetti_coinvolti": ["docenti"],
      "data_scadenza": "2026-06-30",
      "priorita": "alta",
      "conseguenze_non_azione": "Cosa succede se non si rispetta",
      "guida_operativa": "Istruzioni passo passo"
    }
  ]
}

REGOLE:
- NON copiare. Rielabora professionalmente.
- criticità: bassa | media | alta | urgente | strategica
- impatto: locale | regionale | nazionale
- platea: limitata | ampia | intero_sistema
- target: scegli tra [docenti, aspiranti_docenti, sostegno, ata, amministrativi, collaboratori, dsga, dirigenti, educatori, pedagogisti, formatori, universita, sindacati, famiglie, studenti, decisori_pubblici]
- categoria: normativa | reclutamento | personale | inclusione | innovazione | governance
- fonte_livello: A | B | C | D | E | F
- Se il contenuto non riguarda l'istruzione scolastica, imposta "categoria" come "nessuna" e produzione_livelli vuoto.`;

async function callOpenRouter(apiKey: string, content: string): Promise<any> {
  const resp = await fetch(`${OPENROUTER_BASE_URL}/chat/completions`, {
    method: 'POST',
    headers: {
      'Authorization': `Bearer ${apiKey}`,
      'Content-Type': 'application/json',
      'HTTP-Referer': 'https://sportelloscuola2-0.it',
      'X-Title': 'Sportello Scuola Intelligence',
    },
    body: JSON.stringify({
      model: MODEL,
      messages: [
        { role: 'system', content: SYSTEM_PROMPT },
        { role: 'user', content: `Analizza questo documento e genera il contenuto intelligence:\n\nTITOLO: ${content}\n\nCONTENUTO: ${content}` },
      ],
      temperature: 0.3,
      max_tokens: 3000,
    }),
  });

  if (!resp.ok) {
    const errBody = await resp.text();
    throw new Error(`OpenRouter HTTP ${resp.status}: ${errBody}`);
  }

  const data = await resp.json();
  const text = data.choices?.[0]?.message?.content || '';

  // Parse JSON from response (handle possible markdown wrapping)
  try {
    const jsonMatch = text.match(/\{[\s\S]*\}/);
    if (jsonMatch) return JSON.parse(jsonMatch[0]);
    return JSON.parse(text);
  } catch {
    throw new Error(`Risposta AI non valida: ${text.slice(0, 200)}`);
  }
}

Deno.serve(async (req) => {
  if (req.method === 'OPTIONS') {
    return new Response(null, { status: 204, headers: corsHeaders });
  }

  try {
    const supabaseUrl = Deno.env.get('SUPABASE_URL') || '';
    const supabaseServiceKey = Deno.env.get('SUPABASE_SERVICE_ROLE_KEY') || '';
    const openRouterKey = Deno.env.get('VITE_OPENROUTER_API_KEY') || Deno.env.get('OPENROUTER_API_KEY') || '';

    if (!openRouterKey) {
      return new Response(JSON.stringify({ error: 'OPENROUTER_API_KEY non configurata' }), {
        status: 400, headers: { ...corsHeaders, 'Content-Type': 'application/json' },
      });
    }

    const supabase = createClient(supabaseUrl, supabaseServiceKey);

    // Get unprocessed documents
    const { data: documents, error: docsError } = await supabase
      .from('source_documents')
      .select('*')
      .eq('elaborato', false)
      .order('data_rilevamento', { ascending: true })
      .limit(5); // Process in batches of 5

    if (docsError) throw docsError;
    if (!documents || documents.length === 0) {
      return new Response(JSON.stringify({ message: 'Nessun documento da elaborare' }), {
        status: 200, headers: { ...corsHeaders, 'Content-Type': 'application/json' },
      });
    }

    const results: Array<{ titolo: string; status: string; error?: string }> = [];

    for (const doc of documents as SourceDocument[]) {
      try {
        const aiResult = await callOpenRouter(openRouterKey, doc.titolo + '\n' + (doc.contenuto_raw || ''));

        if (aiResult.categoria === 'nessuna') {
          // Mark as processed but skip
          await supabase.from('source_documents').update({ elaborato: true }).eq('id', doc.id);
          results.push({ titolo: doc.titolo, status: 'skipped' });
          continue;
        }

        // Insert intelligence_news
        const { data: news, error: newsError } = await supabase
          .from('intelligence_news')
          .insert({
            titolo: aiResult.titolo || doc.titolo,
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

        if (newsError) throw newsError;

        // Mark document as processed
        await supabase.from('source_documents').update({
          elaborato: true,
          news_generata_id: news.id,
        }).eq('id', doc.id);

        // Create knowledge links with existing news of same category
        if (news) {
          const { data: relatedNews } = await supabase
            .from('intelligence_news')
            .select('id')
            .eq('categoria', aiResult.categoria)
            .neq('id', news.id)
            .limit(5);

          if (relatedNews) {
            for (const related of relatedNews) {
              await supabase.from('knowledge_links').insert({
                news_id_a: news.id,
                news_id_b: related.id,
                tipo_relazione: 'stesso_argomento',
                peso: 0.8,
              }).catch(() => {}); // Ignore duplicates
            }
          }

          // Create deadlines from AI result
          if (aiResult.scadenze && Array.isArray(aiResult.scadenze)) {
            for (const scadenza of aiResult.scadenze) {
              await supabase.from('intelligence_scadenze').insert({
                news_id: news.id,
                titolo: scadenza.titolo || 'Scadenza: ' + aiResult.titolo,
                normativa: scadenza.normativa || aiResult.fonte_primaria,
                soggetti_coinvolti: scadenza.soggetti_coinvolti || aiResult.target,
                data_scadenza: scadenza.data_scadenza,
                priorita: scadenza.priorita || 'media',
                impatto: aiResult.impatto || 'nazionale',
                conseguenze_non_azione: scadenza.conseguenze_non_azione || '',
                guida_operativa: scadenza.guida_operativa || '',
                tipo: 'auto_' + aiResult.categoria,
                auto_generata: true,
              }).catch(() => {});
            }
          }
        }

        results.push({ titolo: aiResult.titolo || doc.titolo, status: 'created' });
      } catch (err) {
        console.error(`Errore elaborazione documento ${doc.id}:`, err.message);
        // Mark as processed even on error to avoid infinite retry
        await supabase.from('source_documents').update({
          elaborato: true,
        }).eq('id', doc.id);
        results.push({ titolo: doc.titolo, status: 'error', error: err.message });
      }
    }

    return new Response(JSON.stringify({
      message: `Elaborati ${results.length} documenti.`,
      results,
    }), {
      status: 200,
      headers: { ...corsHeaders, 'Content-Type': 'application/json' },
    });
  } catch (err) {
    console.error('Errore ingest-news:', err.message);
    return new Response(JSON.stringify({ error: err.message }), {
      status: 500,
      headers: { ...corsHeaders, 'Content-Type': 'application/json' },
    });
  }
});
