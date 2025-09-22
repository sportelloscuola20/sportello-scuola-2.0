(function(){
function el(t,a={},c=[]){const e=document.createElement(t);for(const[k,v] of Object.entries(a)){if(k==='class')e.className=v;else if(k==='html')e.innerHTML=v;else e.setAttribute(k,v);}c.forEach(x=>e.appendChild(x));return e;}
function monthLabel(y,m){const n=['Gen','Feb','Mar','Apr','Mag','Giu','Lug','Ago','Set','Ott','Nov','Dic'];return n[parseInt(m,10)-1]+' '+y;}
function shortDate(s){try{const d=new Date(s);return d.toLocaleDateString('it-IT',{day:'2-digit',month:'short'}).replace('.','');}catch(_){return s;}}
async function loadJSON(u){const r=await fetch(u+(u.includes('?')?'&':'?')+'v='+Date.now());if(!r.ok)throw new Error('load');return await r.json();}
async function init(){
  const mount=document.querySelector('#ss-news-mount'); if(!mount) return;
  const data=await loadJSON('data/news.json');
  const wrap=el('section',{class:'ss-card'});
  const head=el('div',{class:'ssrrw-head',style:'padding:12px 14px;'});
  head.appendChild(el('h3',{class:'ssrrw-title',html:'Ultime notizie'}));
  const ctr=el('div',{class:'ssrrw-controls',style:'display:flex;gap:8px;flex-wrap:wrap;margin-top:8px;'});
  const ySel=el('select'), mSel=el('select');
  const years=Object.keys(data||{}).sort(); years.forEach(y=>{const o=el('option');o.value=y;o.textContent=y;ySel.appendChild(o);}); ySel.value=years[years.length-1]||String(new Date().getFullYear());
  function fillMonths(){ mSel.innerHTML=''; const months=Object.keys(data[ySel.value]||{}).sort(); months.forEach(m=>{ const o=el('option'); o.value=m; o.textContent=monthLabel(ySel.value,m); mSel.appendChild(o); }); }
  fillMonths(); mSel.value=Object.keys(data[ySel.value]||{}).sort().pop() || String(new Date().getMonth()+1).padStart(2,'0');
  ySel.addEventListener('change', ()=>{ fillMonths(); render(); }); mSel.addEventListener('change', render);
  ctr.appendChild(el('div',{class:'ss-pill'},[ySel])); ctr.appendChild(el('div',{class:'ss-pill'},[mSel]));
  const list=el('ul',{class:'ssrrw-list'});
  function render(){ list.innerHTML=''; const items=((data[ySel.value]||{})[mSel.value]||[]).slice().sort((a,b)=>(a.date||'').localeCompare(b.date||''));
    if(items.length===0){ list.appendChild(el('li',{class:'ss-item'},[el('div',{class:'ss-item-head'},[el('p',{class:'ss-item-title',html:'Nessuna notizia'})]) ])); return; }
    items.forEach(it=>{ const li=el('li',{class:'ss-item'}); const head=el('div',{class:'ss-item-head'});
      head.appendChild(el('p',{class:'ss-item-title',html:it.title||'Notizia'}));
      head.appendChild(el('span',{class:'ss-item-date',html:shortDate(it.date||'')}));
      const body=el('div',{class:'ss-item-body'},[el('p',{html:it.summary||''}), el('a',{href:(it.link||'#'),class:'ss-link'},[document.createTextNode('Leggi')])]);
      head.addEventListener('click', ()=> li.classList.toggle('open')); li.appendChild(head); li.appendChild(body); list.appendChild(li); });
  }
  render();
  const foot=el('div',{class:'ssrrw-foot',style:'padding:10px 14px 14px;border-top:1px solid var(--ss-border);display:flex;justify-content:space-between;align-items:center;'},
    [el('span',{class:'ss-legend',html:'Sincronizzazione automatica lato server (placeholder locale)'}),
     el('a',{href:'notizie.html',class:'ss-link'},[document.createTextNode('Mostra di più')])]);
  head.appendChild(ctr); wrap.appendChild(head); wrap.appendChild(list); wrap.appendChild(foot);
  mount.innerHTML=''; mount.appendChild(wrap);
}
if(document.readyState==='loading') document.addEventListener('DOMContentLoaded', init); else init();
})();