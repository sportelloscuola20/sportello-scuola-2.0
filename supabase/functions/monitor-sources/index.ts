// @ts-nocheck
import { createClient } from 'https://esm.sh/@supabase/supabase-js@2.57.4?target=deno';

const corsHeaders = {
  'Access-Control-Allow-Origin': '*',
  'Access-Control-Allow-Methods': 'POST, OPTIONS',
  'Access-Control-Allow-Headers': 'Content-Type, Authorization',
};

interface MonitoredSource {
  id: string;
  livello: string;
  nome: string;
  url: string;
  rss_url: string | null;
  tipo: string;
  frequenza_minuti: number;
  ultimo_check: string | null;
  ultimo_etag: string | null;
  ultimo_last_modified: string | null;
  ultimo_hash: string | null;
  stato: string;
}

async function fetchRSS(rssUrl: string): Promise<string> {
  const resp = await fetch(rssUrl, {
    headers: { 'User-Agent': 'SportelloScuola-Intelligence/1.0' },
  });
  if (!resp.ok) throw new Error(`HTTP ${resp.status}: ${rssUrl}`);
  return await resp.text();
}

function parseRSSItems(xml: string): Array<{ title: string; link: string; description: string; pubDate: string }> {
  const items: Array<{ title: string; link: string; description: string; pubDate: string }> = [];
  const itemRegex = /<item>([\s\S]*?)<\/item>/gi;
  let match;
  while ((match = itemRegex.exec(xml)) !== null) {
    const block = match[1];
    const title = (block.match(/<title[^>]*><!\[CDATA\[(.*?)\]\]><\/title>/) || block.match(/<title[^>]*>(.*?)<\/title>/))?.[1] || '';
    const link = (block.match(/<link[^>]*>(.*?)<\/link>/))?.[1] || '';
    const description = (block.match(/<description[^>]*><!\[CDATA\[(.*?)\]\]><\/description>/) || block.match(/<description[^>]*>(.*?)<\/description>/))?.[1] || '';
    const pubDate = (block.match(/<pubDate[^>]*>(.*?)<\/pubDate>/))?.[1] || '';
    if (title || link) {
      items.push({ title: title.trim(), link: link.trim(), description: description.trim(), pubDate: pubDate.trim() });
    }
  }
  return items;
}

function simpleHash(str: string): string {
  let hash = 0;
  for (let i = 0; i < str.length; i++) {
    const char = str.charCodeAt(i);
    hash = ((hash << 5) - hash) + char;
    hash = hash & hash;
  }
  return Math.abs(hash).toString(36);
}

Deno.serve(async (req) => {
  if (req.method === 'OPTIONS') {
    return new Response(null, { status: 204, headers: corsHeaders });
  }

  try {
    const supabaseUrl = Deno.env.get('SUPABASE_URL') || '';
    const supabaseServiceKey = Deno.env.get('SUPABASE_SERVICE_ROLE_KEY') || '';
    const supabase = createClient(supabaseUrl, supabaseServiceKey);

    // 1. Ottieni tutte le fonti attive con RSS
    const { data: sources, error: sourcesError } = await supabase
      .from('monitored_sources')
      .select('*')
      .eq('stato', 'attivo')
      .or('tipo.eq.rss,tipo.eq.web');

    if (sourcesError) throw sourcesError;
    if (!sources || sources.length === 0) {
      return new Response(JSON.stringify({ message: 'Nessuna fonte attiva da monitorare' }), {
        status: 200, headers: { ...corsHeaders, 'Content-Type': 'application/json' },
      });
    }

    const results: Array<{ source: string; nuovi: number; error?: string }> = [];
    let totalNewDocs = 0;

    for (const source of sources as MonitoredSource[]) {
      try {
        if (source.tipo === 'rss' && source.rss_url) {
          const xml = await fetchRSS(source.rss_url);
          const items = parseRSSItems(xml);
          let nuovi = 0;

          for (const item of items.slice(0, 10)) {
            const contentToHash = item.title + item.description;
            const hash = simpleHash(contentToHash);

            // Check if already exists
            const { data: existing } = await supabase
              .from('source_documents')
              .select('id')
              .eq('hash_contenuto', hash)
              .maybeSingle();

            if (!existing) {
              await supabase.from('source_documents').insert({
                source_id: source.id,
                url: item.link,
                titolo: item.title,
                contenuto_raw: item.description,
                hash_contenuto: hash,
                data_rilevamento: new Date().toISOString(),
                elaborato: false,
              });
              nuovi++;
              totalNewDocs++;
            }
          }

          // Update source check timestamp
          await supabase.from('monitored_sources').update({
            ultimo_check: new Date().toISOString(),
            stato: 'attivo',
            errore_msg: null,
          }).eq('id', source.id);

          results.push({ source: source.nome, nuovi });
        } else if (source.tipo === 'web') {
          // For web sources, just mark as checked (full content fetch in future)
          await supabase.from('monitored_sources').update({
            ultimo_check: new Date().toISOString(),
            stato: 'attivo',
            errore_msg: null,
          }).eq('id', source.id);
          results.push({ source: source.nome, nuovi: 0 });
        }
      } catch (err) {
        console.error(`Errore monitoraggio ${source.nome}:`, err.message);
        await supabase.from('monitored_sources').update({
          stato: 'errore',
          errore_msg: err.message,
        }).eq('id', source.id);
        results.push({ source: source.nome, nuovi: 0, error: err.message });
      }
    }

    return new Response(JSON.stringify({
      message: `Monitoraggio completato. ${totalNewDocs} nuovi documenti rilevati.`,
      totalNew: totalNewDocs,
      results,
    }), {
      status: 200,
      headers: { ...corsHeaders, 'Content-Type': 'application/json' },
    });
  } catch (err) {
    console.error('Errore monitor-sources:', err.message);
    return new Response(JSON.stringify({ error: err.message }), {
      status: 500,
      headers: { ...corsHeaders, 'Content-Type': 'application/json' },
    });
  }
});
