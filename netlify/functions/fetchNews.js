// Netlify Function (CommonJS) - fetchNews (v4)
const CATEGORY_MAP = {
  'cronaca': 'Cronaca',
  'docenti': 'Docenti',
  'studenti': 'Studenti',
  'pensioni': 'Pensioni',
  'diventare-insegnanti': 'Diventare Insegnanti',
  'ata': 'ATA',
  'dsga': 'DSGA',
  'personale-educativo': 'Personale educativo',
  'genitori': 'Genitori',
  'politica-scolastica': 'Politica scolastica',
  'lettere-in-redazione': 'Lettere in redazione',
  'scuole-non-statali': 'Scuole non statali',
  'guide': 'Guide',
  'scadenze-ed-eventi': 'Scadenze ed eventi'
};

function buildFeedUrl(categoria){
  if (categoria && CATEGORY_MAP[categoria]) {
    return `https://www.orizzontescuola.it/news/${categoria}/feed/`;
  }
  return 'https://www.orizzontescuola.it/feed/';
}

function parseItems(xml){
  const items = [];
  const itemRegex = /<item>([\s\S]*?)<\/item>/g;
  let m;
  while((m = itemRegex.exec(xml))){
    const block = m[1];
    const get = (tag) => {
      const r = new RegExp(`<${tag}[^>]*>([\\s\\S]*?)<\\/${tag}>`, 'i').exec(block);
      return r ? r[1].replace(/<!\\[CDATA\\[|\\]\\]>/g,'').trim() : '';
    };
    const cats = [];
    const catRegex = /<category[^>]*>([\s\\S]*?)<\\/category>/gi;
    let c;
    while((c = catRegex.exec(block))){
      cats.push(c[1].replace(/<!\\[CDATA\\[|\\]\\]>/g,'').trim());
    }
    const desc = get('description').replace(/<[^>]+>/g,' ').replace(/\\s+/g,' ').trim();
    items.push({
      title: get('title'),
      link: get('link'),
      pubDate: get('pubDate') || get('dc:date') || new Date().toISOString(),
      description: desc.slice(0,160),
      categories: cats
    });
  }
  return items;
}

async function tryFetch(url){
  const res = await fetch(url, { headers: { 'accept': 'application/rss+xml,application/xml;q=0.9,*/*;q=0.8' }});
  if (!res.ok) throw new Error('HTTP '+res.status);
  return await res.text();
}

exports.handler = async (event) => {
  try {
    const params = event.queryStringParameters || {};
    const categoria = params.categoria || '';
    const q = (params.q || '').toLowerCase();
    const page = Math.max(1, parseInt(params.page || '1', 10));
    const limit = Math.max(1, Math.min(50, parseInt(params.limit || '20', 10)));

    const candidate = buildFeedUrl(categoria);
    let xml;
    try {
      xml = await tryFetch(candidate);
    } catch (e) {
      xml = await tryFetch('https://www.orizzontescuola.it/feed/');
    }

    let items = parseItems(xml);

    if (categoria && CATEGORY_MAP[categoria]) {
      const wanted = CATEGORY_MAP[categoria].toLowerCase();
      items = items.filter(it => (it.categories || []).some(c => c.toLowerCase().includes(wanted)));
    }

    if (q) {
      items = items.filter(it => (it.title + ' ' + (it.description||'')).toLowerCase().includes(q));
    }

    items.sort((a,b) => new Date(b.pubDate) - new Date(a.pubDate));

    const start = (page-1)*limit;
    const pageItems = items.slice(start, start+limit);
    const hasMore = start + limit < items.length;

    return {
      statusCode: 200,
      headers: {
        'content-type': 'application/json; charset=utf-8',
        'cache-control': 'public, max-age=600',
        // CORS for local preview if needed
        'access-control-allow-origin': '*'
      },
      body: JSON.stringify({ items: pageItems, total: items.length, hasMore })
    };
  } catch (err) {
    return { statusCode: 500, body: JSON.stringify({ error: 'fetchNews failure', message: String(err) }) };
  }
};
