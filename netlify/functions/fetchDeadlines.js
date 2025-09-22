// Netlify Function (CommonJS) - fetchDeadlines (v4)
const FEED = 'https://www.orizzontescuola.it/scadenze/feed/';

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
    const desc = get('description').replace(/<[^>]+>/g,' ').replace(/\\s+/g,' ').trim();
    items.push({
      title: get('title'),
      link: get('link'),
      pubDate: get('pubDate') || get('dc:date') || new Date().toISOString(),
      description: desc.slice(0,160)
    });
  }
  return items;
}

exports.handler = async (event) => {
  try {
    const params = event.queryStringParameters || {};
    const limit = Math.max(1, Math.min(60, parseInt(params.limit || '40', 10)));
    const res = await fetch(FEED, { headers: { 'accept': 'application/rss+xml,application/xml;q=0.9,*/*;q=0.8' }});
    if(!res.ok) throw new Error('HTTP '+res.status);
    const xml = await res.text();
    let items = parseItems(xml);
    items.sort((a,b) => new Date(b.pubDate) - new Date(a.pubDate));
    items = items.slice(0, limit);
    return { statusCode: 200, headers: { 'content-type': 'application/json; charset=utf-8', 'cache-control': 'public, max-age=600', 'access-control-allow-origin': '*' }, body: JSON.stringify({ items }) };
  } catch (err) {
    return { statusCode: 500, body: JSON.stringify({ error: 'fetchDeadlines failure', message: String(err) }) };
  }
};
