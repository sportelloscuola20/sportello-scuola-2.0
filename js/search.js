(function(){
async function loadJSON(u){try{const r=await fetch(u+(u.includes('?')?'&':'?')+Date.now());if(!r.ok) return null;return await r.json();}catch(_){return null;}}
function closePanel(){ const p=document.getElementById('ss-search-results'); if(p) p.classList.remove('open'); }
async function init(){
  var container = document.getElementById('ss-search-container');
  var header = document.querySelector('header');
  if(!container){ container = document.createElement('div'); container.id='ss-search-container'; if(header && header.parentNode){ header.parentNode.insertBefore(container, header.nextSibling); } else { document.body.insertBefore(container, document.body.firstChild); } }
  container.innerHTML = '<div id="ss-search-bar"><input id="ss-search-input" placeholder="Cerca in tutto il sito…"><span aria-hidden="true">🔍</span></div><div id="ss-search-results"></div>';
  const input=document.getElementById('ss-search-input'); const panel=document.getElementById('ss-search-results');
  const deadlines = await loadJSON('data/deadlines.json') || {}; const news = await loadJSON('data/news.json') || {};
  function search(q){ q=(q||'').trim().toLowerCase(); const out=[]; if(!q) return out;
    function push(type, it){ out.push({type, title:it.title||'', summary:it.summary||'', date:it.date||'', link:it.link||'#'}); }
    Object.keys(deadlines).filter(k=>k!=='meta').forEach(y=>{ Object.keys(deadlines[y]||{}).forEach(m=>{ (deadlines[y][m]||[]).forEach(it=>{ const hay=(it.title||'')+' '+(it.summary||''); if(hay.toLowerCase().includes(q)) push('Scadenza', it); }); }); });
    Object.keys(news).filter(k=>k!=='meta').forEach(y=>{ Object.keys(news[y]||{}).forEach(m=>{ (news[y][m]||[]).forEach(it=>{ const hay=(it.title||'')+' '+(it.summary||''); if(hay.toLowerCase().includes(q)) push('Notizia', it); }); }); });
    return out.slice(0,25);
  }
  input.addEventListener('input', ()=>{
    const res=search(input.value); panel.innerHTML='';
    if(!input.value){ closePanel(); return; }
    if(res.length===0){ panel.innerHTML='<div class="ss-item"><div class="ss-item-head"><p class="ss-item-title">Nessun risultato</p></div></div>'; panel.classList.add('open'); return; }
    res.forEach(r=>{ const d=document.createElement('div'); d.className='ss-item';
      const head=document.createElement('div'); head.className='ss-item-head';
      const t=document.createElement('p'); t.className='ss-item-title'; t.textContent='['+r.type+'] '+r.title;
      const dt=document.createElement('span'); dt.className='ss-item-date'; dt.textContent = r.date? new Date(r.date).toLocaleDateString('it-IT',{day:'2-digit',month:'short'}).replace('.',''):'';
      head.appendChild(t); head.appendChild(dt);
      const body=document.createElement('div'); body.className='ss-item-body'; body.innerHTML='<p>'+ (r.summary||'') +'</p>';
      const a=document.createElement('a'); a.className='ss-link'; a.href=r.link || '#'; a.textContent='Apri';
      body.appendChild(a);
      d.appendChild(head); d.appendChild(body);
      head.addEventListener('click', ()=> d.classList.toggle('open'));
      panel.appendChild(d);
    });
    panel.classList.add('open');
  });
  document.addEventListener('keydown', (e)=>{ if(e.key==='Escape') closePanel(); });
  document.addEventListener('click', (e)=>{ const bar=document.getElementById('ss-search-bar'); if(panel.classList.contains('open') && !panel.contains(e.target) && !bar.contains(e.target)) closePanel(); });
}
if(document.readyState==='loading') document.addEventListener('DOMContentLoaded', init); else init();
})();