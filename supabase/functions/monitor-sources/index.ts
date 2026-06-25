// @ts-nocheck
import { createClient } from 'https://esm.sh/@supabase/supabase-js@2.57.4?target=deno';

const corsHeaders = {
  'Access-Control-Allow-Origin': '*',
  'Access-Control-Allow-Methods': 'POST, OPTIONS',
  'Access-Control-Allow-Headers': 'Content-Type, Authorization',
};

// User-Agent Chrome-like per evitare filtri di blocco
const CHROME_UA = 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/125.0.0.0 Safari/537.36';

// Keyword per scraping mirato USR
const USR_KEYWORDS = ['GPS', 'Graduatorie', 'Decreto', 'Nomine', 'Ruoli', 'Immissioni'];

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

async function fetchWithUA(url: string): Promise<{ text: string; etag?: string; lastModified?: string }> {
  const resp = await fetch(url, {
    headers: {
      'User-Agent': CHROME_UA,
      'Accept': 'text/html,application/xhtml+xml,application/xml;q=0.9,*/*;q=0.8',
      'Accept-Language': 'it-IT,it;q=0.9,en;q=0.8',
    },
  });
  if (!resp.ok) throw new Error(`HTTP ${resp.status}: ${url}`);
  return {
    text: await resp.text(),
    etag: resp.headers.get('etag') || undefined,
    lastModified: resp.headers.get('last-modified') || undefined,
  };
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

  // Fallback: prova formato Atom
  if (items.length === 0) {
    const entryRegex = /<entry>([\s\S]*?)<\/entry>/gi;
    while ((match = entryRegex.exec(xml)) !== null) {
      const block = match[1];
      const title = (block.match(/<title[^>]*>(.*?)<\/title>/))?.[1] || '';
      const linkMatch = block.match(/<link[^>]*href="(.*?)"[^>]*\/>/);
      const link = linkMatch?.[1] || (block.match(/<link[^>]*>(.*?)<\/link>/))?.[1] || '';
      const description = (block.match(/<summary[^>]*>(.*?)<\/summary>/))?.[1] || (block.match(/<content[^>]*>(.*?)<\/content>/))?.[1] || '';
      const pubDate = (block.match(/<published[^>]*>(.*?)<\/published>/))?.[1] || (block.match(/<updated[^>]*>(.*?)<\/updated>/))?.[1] || '';
      if (title || link) {
        items.push({ title: title.trim(), link: link.trim(), description: description.trim(), pubDate: pubDate.trim() });
      }
    }
  }

  return items;
}

function parseHTMLLinks(html: string, keywords: string[]): Array<{ title: string; link: string; description: string }> {
  const results: Array<{ title: string; link: string; description: string }> = [];
  const seen = new Set<string>();

  // Estrai tutti i link <a href="...">testo</a>
  const linkRegex = /<a[^>]*href=["'](.*?)["'][^>]*>(.*?)<\/a>/gi;
  let match;
  while ((match = linkRegex.exec(html)) !== null) {
    let href = match[1].trim();
    const text = match[2].replace(/<[^>]*>/g, '').trim();

    if (!href || !text) continue;

    // Normalizza URL relativi
    if (href.startsWith('//')) {
      href = 'https:' + href;
    }

    // Controlla se il testo o href contiene una delle keyword
    const matchKeyword = keywords.some(kw =>
      text.toUpperCase().includes(kw.toUpperCase()) ||
      href.toUpperCase().includes(kw.toUpperCase())
    );

    if (matchKeyword && !seen.has(href)) {
      seen.add(href);
      results.push({
        title: text,
        link: href,
        description: `Link da scraping USR — keyword: ${keywords.find(k => text.toUpperCase().includes(k.toUpperCase()) || href.toUpperCase().includes(k.toUpperCase()))}`,
      });
    }
  }

  return results;
}

function extractPageTitle(html: string): string {
  const match = html.match(/<title[^>]*>(.*?)<\/title>/i);
  return match ? match[1].trim() : '';
}

function extractTextContent(html: string): string {
  // Rimuovi script, style, tag HTML
  return html
    .replace(/<script[^>]*>[\s\S]*?<\/script>/gi, '')
    .replace(/<style[^>]*>[\s\S]*?<\/style>/gi, '')
    .replace(/<[^>]+>/g, ' ')
    .replace(/\s+/g, ' ')
    .trim()
    .slice(0, 5000);
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

    // 1. Ottieni tutte le fonti attive
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
          // --- SCRAPING RSS ---
          const { text: xml } = await fetchWithUA(source.rss_url);
          const items = parseRSSItems(xml);
          let nuovi = 0;

          for (const item of items.slice(0, 10)) {
            const contentToHash = item.title + item.description.slice(0, 500);
            const hash = simpleHash(contentToHash);

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

          await supabase.from('monitored_sources').update({
            ultimo_check: new Date().toISOString(),
            stato: 'attivo',
            errore_msg: null,
          }).eq('id', source.id);

          results.push({ source: source.nome, nuovi });

        } else if (source.tipo === 'web') {
          // --- SCRAPING WEB (con parsing HTML per keyword, specialmente USR) ---
          const { text: html } = await fetchWithUA(source.url);
          const pageTitle = extractPageTitle(html);
          let nuovi = 0;

          // Se è una fonte USR (nome inizia con "USR"), usa scraping mirato con keyword
          const isUSR = source.nome.startsWith('USR');

          if (isUSR) {
            // Scraping mirato: estrai link con keyword specifiche
            const links = parseHTMLLinks(html, USR_KEYWORDS);

            for (const link of links.slice(0, 15)) {
              const contentToHash = link.title + link.link + (link.description || '');
              const hash = simpleHash(contentToHash);

              const { data: existing } = await supabase
                .from('source_documents')
                .select('id')
                .eq('hash_contenuto', hash)
                .maybeSingle();

              if (!existing) {
                await supabase.from('source_documents').insert({
                  source_id: source.id,
                  url: link.link,
                  titolo: link.title,
                  contenuto_raw: link.description || `Link da ${source.nome}: ${pageTitle}`,
                  hash_contenuto: hash,
                  data_rilevamento: new Date().toISOString(),
                  elaborato: false,
                });
                nuovi++;
                totalNewDocs++;
              }
            }

            // Se non sono stati trovati link con keyword, salva l'intera pagina come documento
            if (nuovi === 0) {
              const fullText = extractTextContent(html);
              if (fullText.length > 100) {
                const hash = simpleHash(fullText.slice(0, 1000));
                const { data: existing } = await supabase
                  .from('source_documents')
                  .select('id')
                  .eq('hash_contenuto', hash)
                  .maybeSingle();

                if (!existing) {
                  await supabase.from('source_documents').insert({
                    source_id: source.id,
                    url: source.url,
                    titolo: pageTitle || source.nome,
                    contenuto_raw: fullText,
                    hash_contenuto: hash,
                    data_rilevamento: new Date().toISOString(),
                    elaborato: false,
                  });
                  nuovi++;
                  totalNewDocs++;
                }
              }
            }
          } else {
            // Fonti web non-USR: salva il contenuto testuale della pagina
            const fullText = extractTextContent(html);
            if (fullText.length > 200) {
              const hash = simpleHash(fullText.slice(0, 1000));
              const { data: existing } = await supabase
                .from('source_documents')
                .select('id')
                .eq('hash_contenuto', hash)
                .maybeSingle();

              if (!existing) {
                await supabase.from('source_documents').insert({
                  source_id: source.id,
                  url: source.url,
                  titolo: pageTitle || source.nome,
                  contenuto_raw: fullText,
                  hash_contenuto: hash,
                  data_rilevamento: new Date().toISOString(),
                  elaborato: false,
                });
                nuovi++;
                totalNewDocs++;
              }
            }
          }

          await supabase.from('monitored_sources').update({
            ultimo_check: new Date().toISOString(),
            stato: 'attivo',
            errore_msg: null,
          }).eq('id', source.id);

          results.push({ source: source.nome, nuovi });
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
