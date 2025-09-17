
(function(){
function el(t,a={},c=[]){const e=document.createElement(t);for(const[k,v] of Object.entries(a)){if(k==='class')e.className=v;else if(k==='html')e.innerHTML=v;else e.setAttribute(k,v);}c.forEach(x=>e.appendChild(x));return e;}
function monthLabel(y,m){const N=['Gennaio','Febbraio','Marzo','Aprile','Maggio','Giugno','Luglio','Agosto','Settembre','Ottobre','Novembre','Dicembre'];return N[parseInt(m,10)-1]+' '+y;}
function shortDate(s){try{const d=new Date(s);return d.toLocaleDateString('it-IT',{day:'2-digit',month:'short'}).replace('.','');}catch(_){return s;}}
async function loadJSON(u){const r=await fetch(u+(u.includes('?')?'&':'?')+'v='+Date.now());if(!r.ok)throw new Error('load');return await r.json();}
function findRightRail(){const S=['aside','#sidebar','.sidebar','.right-column','.right-col','.sidecol'];for(const s of S){const n=document.querySelector(s);if(n)return n;}const t=document.querySelector('main')||document.body;const rail=el('aside',{class:'sidecol'},[]);t.appendChild(rail);return rail;}
function renderWidget(mount,data,curY,curM,curR){
  mount.innerHTML='';
  const w=el('section',{class:'ss-right-rail-widget ss-card'});
  const head=el('div',{class:'ssrrw-head',style:'padding:12px 14px;'});
  head.appendChild(el('h3',{class:'ssrrw-title',html:'Scadenze importanti'}));
  const ctr=el('div',{class:'ssrrw-controls',style:'display:flex;gap:8px;flex-wrap:wrap;margin-top:8px;'});
  const ySel=el('select'), mSel=el('select'), rSel=el('select');
  const years=Object.keys(data).filter(k=>k!=='meta').sort();years.forEach(y=>{const o=el('option');o.value=y;o.textContent=y;ySel.appendChild(o);});ySel.value=curY;
  function fillMonths(){ mSel.innerHTML=''; const months=Object.keys(data[ySel.value]||{}).sort(); months.forEach(m=>{ const o=el('option'); o.value=m; o.textContent=monthLabel(ySel.value,m); mSel.appendChild(o); }); if(!Object.keys(data[ySel.value]||{}).includes(curM)){ const mm=months[0]||('0'+(new Date().getMonth()+1)).slice(-2); curM=mm; } mSel.value=curM; }
  fillMonths();
  const REGIONS = ["Tutte", "Abruzzo", "Basilicata", "Calabria", "Campania", "Emilia-Romagna", "Friuli-Venezia Giulia", "Lazio", "Liguria", "Lombardia", "Marche", "Molise", "Piemonte", "Puglia", "Sardegna", "Sicilia", "Toscana", "Trentino-Alto Adige", "Umbria", "Valle d'Aosta", "Veneto"];
  REGIONS.forEach(r=>{const o=el('option');o.value=r;o.textContent=r;rSel.appendChild(o);}); rSel.value=curR;
  ySel.addEventListener('change',()=>{fillMonths();renderList();}); mSel.addEventListener('change',renderList); rSel.addEventListener('change',renderList);
  ctr.appendChild(el('div',{class:'ss-pill'},[ySel])); ctr.appendChild(el('div',{class:'ss-pill'},[mSel])); ctr.appendChild(el('div',{class:'ss-pill'},[rSel]));
  const list=el('ul',{class:'ssrrw-list'});
  function matchRegion(it){const rs=(it.regions||['Tutte']); if(rSel.value==='Tutte') return true; return rs.includes(rSel.value)||rs.includes('Tutte');}
  function renderList(){
    list.innerHTML='';
    const items=((data[ySel.value]||{})[mSel.value]||[]).filter(matchRegion).sort((a,b)=>(a.date||'').localeCompare(b.date||''));
    if(items.length===0){ list.appendChild(el('li',{class:'ss-item'},[el('div',{class:'ss-item-head'},[el('p',{class:'ss-item-title',html:'Nessuna scadenza per il periodo selezionato'})]) ])); return; }
    items.forEach(it=>{
      const li=el('li',{class:'ss-item'});
      const head=el('div',{class:'ss-item-head'});
      head.appendChild(el('p',{class:'ss-item-title',html:it.title||'Scadenza'}));
      head.appendChild(el('span',{class:'ss-item-date',html:shortDate(it.date||'')}));
      const body=el('div',{class:'ss-item-body'},[el('p',{html:it.summary||''})]);
      head.addEventListener('click',()=>li.classList.toggle('open'));
      li.appendChild(head); li.appendChild(body); list.appendChild(li);
    });
  }
  renderList();
  const foot=el('div',{class:'ssrrw-foot',style:'padding:10px 14px 14px;border-top:1px solid var(--ss-border);display:flex;justify-content:space-between;align-items:center;'},
    [el('span',{class:'ss-legend',html:'Filtra per periodo e regione'}),el('a',{href:'scadenze.html',class:'ss-link'},[document.createTextNode('Vedi tutte')])]);
  head.appendChild(ctr); w.appendChild(head); w.appendChild(list); w.appendChild(foot); mount.insertBefore(w,mount.firstChild);
}
async function init(){ try{ const data=await loadJSON('data/deadlines.json'); const rail=findRightRail(); const years=Object.keys(data).filter(k=>k!=='meta').sort(); const y=years[years.length-1]||String(new Date().getFullYear()); const months=Object.keys(data[y]||{}).sort(); const m=months[months.length-1]||String(new Date().getMonth()+1).padStart(2,'0'); const r='Tutte'; renderWidget(rail,data,y,m,r); } catch(e){ console.error('Scadenze init error',e); } }
if(document.readyState==='loading')document.addEventListener('DOMContentLoaded',init);else init();
})();