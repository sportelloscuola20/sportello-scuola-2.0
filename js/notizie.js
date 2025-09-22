
const API_BASE = '/.netlify/functions';

async function fetchNews({ categoria = null, q = null, page = 1, limit = 12 } = {}){
  const url = new URL(API_BASE + '/fetchNews', window.location.origin);
  if(categoria) url.searchParams.set('categoria', categoria);
  if(q) url.searchParams.set('q', q);
  url.searchParams.set('page', page);
  url.searchParams.set('limit', limit);
  const res = await fetch(url);
  if(!res.ok) throw new Error('Errore nel recupero notizie');
  return await res.json();
}

function renderNewsCard(item){
  const el = document.createElement('article');
  el.className = 'news-card';
  const h4 = document.createElement('h4');
  const a = document.createElement('a');
  a.href = item.link; a.target = '_blank'; a.rel = 'noopener';
  a.textContent = item.title;
  h4.appendChild(a);
  const time = document.createElement('time');
  try{ time.textContent = new Date(item.pubDate).toLocaleDateString('it-IT') }catch{ time.textContent = '' }
  const p = document.createElement('p');
  p.textContent = item.description || '';
  el.appendChild(h4);
  el.appendChild(time);
  el.appendChild(p);
  return el;
}

async function loadHomepage(){
  const wrap = document.getElementById('ultimeNotizie');
  if(!wrap) return;
  try{
    const data = await fetchNews({ limit: 6 });
    wrap.innerHTML='';
    data.items.forEach(it => wrap.appendChild(renderNewsCard(it)));
  }catch(e){
    // Mantieni comunque la sezione con un fallback.
    wrap.innerHTML = '<p class="mini">Le notizie non sono al momento disponibili. Riprova tra poco o vai alla sezione <a href="notizie.html">Notizie</a>.</p>';
  }
}

async function loadNews(params = {}){
  const wrap = document.getElementById('listaNotizie');
  const pag = document.getElementById('paginator');
  if(!wrap) return;
  const url = new URL(window.location.href);
  const categoria = params.categoria ?? url.searchParams.get('categoria');
  const q = params.q ?? url.searchParams.get('q');
  const page =  Number(params.page ?? url.searchParams.get('page') || '1');
  try{
    const data = await fetchNews({ categoria, q, page, limit: 16 });
    wrap.innerHTML='';
    data.items.forEach(it => wrap.appendChild(renderNewsCard(it)));
    // paginator
    pag.innerHTML = '';
    if(data.hasMore){
      const next = document.createElement('a');
      next.href = `?categoria=${encodeURIComponent(categoria||'')}&q=${encodeURIComponent(q||'')}&page=${page+1}`;
      next.textContent = 'Carica altro →';
      next.className = 'btn ghost';
      pag.appendChild(next);
    }
  }catch(e){
    wrap.innerHTML = '<p>Errore nel caricamento delle notizie.</p>';
  }
}

document.addEventListener('DOMContentLoaded', () => {
  loadHomepage();
  loadNews();
});
