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

// Soglie per deep fetch: articoli sotto questa lunghezza in caratteri vengono arricchiti
const DEEP_FETCH_MIN_LENGTH = 300;
const DEEP_FETCH_TIMEOUT_MS = 10_000;

async function deepFetchArticleContent(url: string): Promise<{ fullText: string; pageTitle: string } | null> {
  try {
    const controller = new AbortController();
    const timeoutId = setTimeout(() => controller.abort(), DEEP_FETCH_TIMEOUT_MS);
    const resp = await fetch(url, {
      headers: {
        'User-Agent': CHROME_UA,
        'Accept': 'text/html,application/xhtml+xml,application/xml;q=0.9,*/*;q=0.8',
        'Accept-Language': 'it-IT,it;q=0.9',
      },
      signal: controller.signal,
    });
    clearTimeout(timeoutId);
    if (!resp.ok) return null;
    const html = await resp.text();

    // Estrai title dalla pagina
    const titleMatch = html.match(/<title[^>]*>([\s\S]*?)<\/title>/i);
    const pageTitle = titleMatch ? titleMatch[1].trim() : '';

    // Estrai contenuto principale: cerca article tag, main tag, o .content/.testo
    let articleHtml = '';
    const articleMatch = html.match(/<article[^>]*>([\s\S]*?)<\/article>/i);
    if (articleMatch) articleHtml = articleMatch[1];
    else {
      const mainMatch = html.match(/<main[^>]*>([\s\S]*?)<\/main>/i);
      if (mainMatch) articleHtml = mainMatch[1];
      else {
        // Fallback: estrai tutto il body text
        const bodyMatch = html.match(/<body[^>]*>([\s\S]*?)<\/body>/i);
        if (bodyMatch) articleHtml = bodyMatch[1];
        else articleHtml = html;
      }
    }

    // Pulisci da script, style, tag HTML
    const fullText = articleHtml
      .replace(/<script[^>]*>[\s\S]*?<\/script>/gi, '')
      .replace(/<style[^>]*>[\s\S]*?<\/style>/gi, '')
      .replace(/<nav[^>]*>[\s\S]*?<\/nav>/gi, '')
      .replace(/<footer[^>]*>[\s\S]*?<\/footer>/gi, '')
      .replace(/<header[^>]*>[\s\S]*?<\/header>/gi, '')
      .replace(/<[^>]+>/g, ' ')
      .replace(/&nbsp;/g, ' ')
      .replace(/\s+/g, ' ')
      .trim()
      .slice(0, 10_000);

    if (fullText.length < DEEP_FETCH_MIN_LENGTH) return null;
    return { fullText, pageTitle };
  } catch {
    return null;
  }
}

async function fetchWithUA(url: string, referer?: string): Promise<{ text: string; etag?: string; lastModified?: string }> {
  // Headers browser reali completi + anti-cache forzato per bypassare firewall/404 aggregati
  const headers: Record<string, string> = {
    'User-Agent': CHROME_UA,
    'Accept': 'text/html,application/xhtml+xml,application/xml;q=0.9,image/avif,image/webp,image/apng,*/*;q=0.8',
    'Accept-Language': 'it-IT,it;q=0.9,en;q=0.8,en-US;q=0.7',
    'Connection': 'keep-alive',
    'Cache-Control': 'no-cache, no-store, must-revalidate',
    'Pragma': 'no-cache',
    'Expires': '0',
  };
  if (referer) {
    headers['Referer'] = referer;
  }
  // Tentativo con retry una volta per errori di rete transitori (firewall USR)
  let lastError: Error | null = null;
  for (let attempt = 0; attempt < 2; attempt++) {
    if (attempt > 0) {
      const backoff = 2000 * attempt;
      console.log(`Retry ${attempt + 1}/${2} per ${url} dopo ${backoff}ms...`);
      await new Promise(r => setTimeout(r, backoff));
    }
    try {
      const resp = await fetch(url, { headers });
      if (resp.ok) {
        return {
          text: await resp.text(),
          etag: resp.headers.get('etag') || undefined,
          lastModified: resp.headers.get('last-modified') || undefined,
        };
      }
      // HTTP 503/502/504 (temporaneo) → retry
      if ([502, 503, 504].includes(resp.status) && attempt === 0) {
        lastError = new Error(`HTTP ${resp.status} (temporaneo): ${url}`);
        continue;
      }
      throw new Error(`HTTP ${resp.status}: ${url}`);
    } catch (e) {
      lastError = e instanceof Error ? e : new Error(String(e));
      if (attempt === 0 && (lastError.message.includes('timed out') || lastError.message.includes('eof'))) {
        continue; // retry per timeout / EOF
      }
      throw lastError;
    }
  }
  throw lastError || new Error(`Fallimento fetch dopo retry: ${url}`);
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
            // Deep fetch: ottieni il contenuto completo dell'articolo
            let fullContent = item.description;
            let finalTitle = item.title;
            if (item.link && item.link.startsWith('http')) {
              const deep = await deepFetchArticleContent(item.link);
              if (deep && deep.fullText.length > item.description.length) {
                fullContent = deep.fullText;
                if (deep.pageTitle && deep.pageTitle.length > finalTitle.length) {
                  finalTitle = deep.pageTitle;
                }
              }
            }

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
                titolo: finalTitle,
                contenuto_raw: fullContent,
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
          // Referer = root del dominio USR per emulare navigazione browser reale
          let referer: string | undefined;
          if (source.nome.startsWith('USR')) {
            try { referer = new URL(source.url).origin + '/'; } catch {}
          }
          const { text: html } = await fetchWithUA(source.url, referer);
          const pageTitle = extractPageTitle(html);
          let nuovi = 0;

          // Se è una fonte USR (nome inizia con "USR"), usa scraping mirato con keyword
          const isUSR = source.nome.startsWith('USR');

          if (isUSR) {
            // Scraping mirato: estrai link con keyword specifiche
            let links = parseHTMLLinks(html, USR_KEYWORDS);

            // Se nessun link con keyword trovato: tenta su tutta la pagina (fallback esteso)
            if (links.length === 0) {
              console.log(`${source.nome}: nessun link keyword, tentativo fallback completo...`);
              // Estrai TUTTI i link dalla homepage
              const allLinks = parseHTMLLinks(html, ['.*']); // passa regex sempre true
              // Oppure usa il metodo standard senza keyword filter
              const linkRegex = /<a[^>]*href=["'](.*?)["'][^>]*>(.*?)<\/a>/gi;
              let match;
              const seen = new Set<string>();
              while ((match = linkRegex.exec(html)) !== null) {
                let href = match[1].trim();
                const text = match[2].replace(/<[^>]*>/g, '').trim();
                if (!href || !text || href.startsWith('#') || href.startsWith('javascript:') || seen.has(href)) continue;
                if (href.startsWith('//')) href = 'https:' + href;
                // Risolvi URL relativi
                try { href = new URL(href, source.url).href; } catch { continue; }
                seen.add(href);
                // Filtra solo link che sembrano pagine di notizie/circolari (non navigazione principale)
                if (href.includes(source.url) && text.length > 10 &&
                    !['home', 'contatti', 'chi siamo', 'newsletter', 'privacy', 'cookie'].some(w => text.toLowerCase().includes(w))) {
                  links.push({ title: text, link: href, description: `Link da ${source.nome} (fallback)` });
                }
              }
              // Limita a 10 link
              links = links.slice(0, 10);
            }

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

            // Se non sono stati trovati link (neppure nel fallback), salva l'intera pagina come documento
            if (nuovi === 0) {
              console.log(`${source.nome}: zero link trovati, salvataggio full-page come fallback finale...`);
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
      message: `Monitoraggio completato. ${totalNewDocs} nuovi documenti in coda (elaborazione asincrona ogni 5 min).`,
      totalNew: totalNewDocs,
      results,
      ingestTriggered: false,
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
