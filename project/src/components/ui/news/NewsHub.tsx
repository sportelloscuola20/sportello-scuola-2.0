import { useState, useEffect } from 'react';
import { Newspaper, CalendarClock, Activity, Search, ChevronDown, ChevronRight, ExternalLink, AlertTriangle, Clock, TrendingUp, Shield, Globe } from 'lucide-react';
import { supabase } from '../../../lib/supabaseClient';
import { CATEGORIE_UTENTE, CATEGORIE_SCADENZA, CATEGORIE_UTENTE_COLORS, CATEGORIE_SCADENZA_COLORS, CATEGORIE_ICONE, REGIONI_ITALIA } from '../../../types/intelligence';
import { formatDataItaliana } from '../../../rag/intelligence-engine';
import type { NotiziaIntelligence, ScadenzaIntelligence, CategoriaUtente, CategoriaScadenza } from '../../../types/intelligence';
import { Link } from 'react-router-dom';

interface NewsHubProps {
  isHomePage?: boolean;
}

interface BoxNews {
  categoria: CategoriaUtente;
  items: NotiziaIntelligence[];
}

interface BoxScadenza {
  categoria: CategoriaScadenza;
  items: ScadenzaIntelligence[];
}

const MAX_ITEMS_PER_BOX = 3;

function groupNewsByCategory(items: NotiziaIntelligence[]): BoxNews[] {
  return CATEGORIE_UTENTE.map(cat => ({
    categoria: cat,
    items: items.filter(n => n.classifica.categoria === cat).slice(0, MAX_ITEMS_PER_BOX),
  })).filter(box => box.items.length > 0);
}

function groupScadenzeByCategory(items: ScadenzaIntelligence[]): BoxScadenza[] {
  return CATEGORIE_SCADENZA.map(cat => ({
    categoria: cat,
    items: items.filter(s => s.tipo === cat).slice(0, MAX_ITEMS_PER_BOX),
  })).filter(box => box.items.length > 0);
}

export default function NewsHub({ isHomePage = true }: NewsHubProps) {
  const [activeTab, setActiveTab] = useState<'notizie' | 'scadenze'>('notizie');
  const [newsByCategory, setNewsByCategory] = useState<BoxNews[]>([]);
  const [scadenzeByCategory, setScadenzeByCategory] = useState<BoxScadenza[]>([]);
  const [expandedBox, setExpandedBox] = useState<string | null>(null);
  const [loading, setLoading] = useState(true);
  const [latestNews, setLatestNews] = useState<NotiziaIntelligence[]>([]);

  useEffect(() => { fetchData(); const interval = setInterval(fetchData, 5 * 60 * 1000); return () => clearInterval(interval); }, []);

  const fetchData = async () => {
    setLoading(true);
    try {
      const AUTHORITATIVE_SOURCES = ['MIM', 'MIMUR', 'Orizzonte Scuola', 'Gazzetta Ufficiale'];
      const [newsResult, scadenzeResult] = await Promise.all([
        supabase.from('intelligence_news').select('*').eq('is_archived', false).in('fonte_nome', AUTHORITATIVE_SOURCES).order('data_pubblicazione', { ascending: false }).limit(60),
        supabase.from('intelligence_scadenze').select('*').eq('is_conclusa', false).order('data_scadenza', { ascending: true }).limit(40),
      ]);

      let allNews: NotiziaIntelligence[] = [];
      if (!newsResult.error && newsResult.data && newsResult.data.length > 0) {
        allNews = newsResult.data.map((n: any) => ({
          id: n.id, titolo: n.titolo, descrizione: n.descrizione || '',
          dataPubblicazione: n.data_pubblicazione || n.created_at,
          fonte: { livello: n.fonte_livello || 'A', nome: n.fonte_nome || 'MIM', url: n.fonte_url || '', peso: n.fonte_peso || 100 },
          classifica: { criticita: n.criticita || 'media', impatto: n.impatto || 'nazionale', platea: n.platea || 'ampia', target: n.target || ['docenti'], categoria: n.categoria || 'Normative, Note e Circolari Ministeriali', livelloFonte: n.fonte_livello || 'A', fontePrimaria: n.fonte_primaria || '', fonteUrl: n.fonte_url_dettaglio || '', dataAcquisizione: n.data_acquisizione || n.created_at },
          contenuti: n.produzione_livelli || [], tag: n.tag || [], link: n.link || '', isPinned: n.is_pinned || false, regione: n.regione || null,
        }));
      }

      setNewsByCategory(groupNewsByCategory(allNews));
      setLatestNews(allNews.slice(0, 5));

      let allScadenze: ScadenzaIntelligence[] = [];
      if (!scadenzeResult.error && scadenzeResult.data && scadenzeResult.data.length > 0) {
        allScadenze = scadenzeResult.data.map((s: any) => ({
          id: s.id, titolo: s.titolo, descrizione: s.descrizione || '', normativa: s.normativa || '',
          soggettiCoinvolti: s.soggetti_coinvolti || ['docenti'], dataScadenza: s.data_scadenza || '',
          priorita: s.priorita || 'media', impatto: s.impatto || 'nazionale',
          conseguenzeNonAzione: s.conseguenze_non_azione || '', link: s.link || '', tipo: s.tipo || '', guidaOperativa: s.guida_operativa || '', regione: s.regione || '',
        }));
      }
      setScadenzeByCategory(groupScadenzeByCategory(allScadenze));
    } catch (err) {
      console.error('[NewsHub] Fetch error:', err);
    } finally {
      setLoading(false);
    }
  };

  const switchBgClass = 'bg-gray-100/80 backdrop-blur-sm rounded-2xl p-1.5 border border-slate-200/60 shadow-soft';
  const activePillNews = 'bg-brand-blu text-white shadow-md shadow-brand-blu/10';
  const activePillScadenze = 'bg-brand-ambra text-white shadow-md shadow-brand-ambra/10';
  const inactivePill = 'text-gray-600 hover:text-brand-blu/80';

  return (
    <section className="py-12 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center gap-1 ${switchBgClass} mb-6 max-w-md mx-auto" style={{ background: 'rgba(243,244,246,0.8)', borderRadius: '1rem', padding: '6px', border: '1px solid rgba(226,232,240,0.6)' }}>
          <button onClick={() => setActiveTab('notizie')} className={`flex-1 flex items-center justify-center gap-2 px-4 py-2.5 rounded-xl text-sm font-semibold transition-all duration-300 ${activeTab === 'notizie' ? activePillNews : inactivePill}`}>
            <Newspaper size={16} /> Notizie
          </button>
          <button onClick={() => setActiveTab('scadenze')} className={`flex-1 flex items-center justify-center gap-2 px-4 py-2.5 rounded-xl text-sm font-semibold transition-all duration-300 ${activeTab === 'scadenze' ? activePillScadenze : inactivePill}`}>
            <CalendarClock size={16} /> Scadenze
          </button>
        </div>

        {loading && (
          <div className="text-center py-12">
            <Activity size={32} className="mx-auto text-gray-300 mb-3 animate-pulse" />
            <p className="text-gray-400 text-sm">Caricamento contenuti...</p>
          </div>
        )}

        {/* === NOTIZIE: Thematic Boxes + Sidebar === */}
        {!loading && activeTab === 'notizie' && (
          <div className="flex gap-6">
            {/* Main content — thematic boxes */}
            <div className="flex-1 space-y-5 min-w-0">
              {/* Supabase connection indicator */}
              <div className="flex items-center gap-2 text-[10px] text-gray-400">
                <span className="w-1.5 h-1.5 rounded-full bg-green-500" />
                Dati da Supabase intelligence_news · Aggiornamento ogni 5 min
              </div>
              {newsByCategory.length === 0 && (
                <div className="text-center py-12">
                  <Newspaper size={48} className="mx-auto text-gray-300 mb-4" />
                  <p className="text-gray-500 text-sm">Nessuna notizia disponibile.</p>
                </div>
              )}
              {newsByCategory.map(box => {
                const isExpanded = expandedBox === `news-${box.categoria}`;
                const colorClass = CATEGORIE_UTENTE_COLORS[box.categoria];
                const icon = CATEGORIE_ICONE[box.categoria];
                return (
                  <div key={box.categoria} className={`rounded-3xl border overflow-hidden transition-all duration-300 ${isExpanded ? 'border-brand-blu/30 shadow-medium' : 'border-slate-200/60 shadow-soft hover:shadow-md'}`}>
                    <button onClick={() => setExpandedBox(isExpanded ? null : `news-${box.categoria}`)} className="w-full flex items-center justify-between p-5 bg-gradient-to-r from-white to-gray-50/80 hover:from-gray-50/50 transition-colors">
                      <div className="flex items-center gap-3">
                        <span className="text-2xl">{icon}</span>
                        <div className="text-left">
                          <h3 className="text-lg font-bold text-[#0F172A]">{box.categoria}</h3>
                          <p className="text-xs text-gray-500">{box.items.length} {box.items.length === 1 ? 'notizia' : 'notizie'} recenti</p>
                        </div>
                      </div>
                      <div className="flex items-center gap-2">
                        <span className={`text-xs font-semibold px-2.5 py-1 rounded-full border ${colorClass}`}>{box.items.length}</span>
                        <ChevronDown size={18} className={`text-gray-400 transition-transform duration-300 ${isExpanded ? 'rotate-180' : ''}`} />
                      </div>
                    </button>
                    {isExpanded ? (
                      <div className="p-5 pt-0 space-y-3 animate-fade-in-up">
                        {box.items.map(item => <NewsCard key={item.id} item={item} />)}
                        <Link to="/notizie-scadenze/archivio?tab=notizie" className="flex items-center justify-center gap-2 py-2 text-brand-blu text-sm font-semibold hover:text-brand-blu/80 transition">
                          Vedi tutte <ChevronRight size={14} />
                        </Link>
                      </div>
                    ) : (
                      <div className="px-5 pb-4 flex gap-3 overflow-x-auto">
                        {box.items.map(item => (
                          <div key={item.id} className="flex-shrink-0 w-64 bg-white rounded-2xl border border-slate-200/60 p-3 hover:border-brand-blu/20 transition cursor-pointer" onClick={() => setExpandedBox(`news-${box.categoria}`)}>
                            <p className="text-xs font-bold text-[#0F172A] line-clamp-2 mb-1">{item.titolo}</p>
                            <p className="text-[10px] text-gray-400">{formatDataItaliana(item.dataPubblicazione)}</p>
                          </div>
                        ))}
                      </div>
                    )}
                  </div>
                );
              })}
            </div>

            {/* Sidebar — Ultime Notizie */}
            <div className="hidden lg:block w-80 flex-shrink-0">
              <div className="sticky top-24 space-y-4">
                <div className="bg-gradient-to-br from-brand-blu/5 to-brand-verde/5 rounded-3xl border border-brand-blu/10 p-5">
                  <h3 className="flex items-center gap-2 text-sm font-bold text-[#0F172A] mb-3">
                    <TrendingUp size={16} className="text-brand-blu" /> Ultime Notizie
                  </h3>
                  <div className="space-y-3">
                    {latestNews.map((item, i) => (
                      <div key={item.id} className="flex gap-3 group cursor-pointer">
                        <span className="text-lg font-black text-brand-blu/20 leading-none mt-0.5">{String(i + 1).padStart(2, '0')}</span>
                        <div className="flex-1 min-w-0">
                          <p className="text-xs font-bold text-[#0F172A] line-clamp-2 group-hover:text-brand-blu transition">{item.titolo}</p>
                          <p className="text-[10px] text-gray-400 mt-0.5 flex items-center gap-1">
                            <Clock size={9} /> {formatDataItaliana(item.dataPubblicazione)}
                          </p>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>

                {/* Fonti certificate — Solo 4 fonti autoritative */}
                <div className="bg-white rounded-3xl border border-slate-200/60 p-5">
                  <h3 className="flex items-center gap-2 text-sm font-bold text-[#0F172A] mb-3">
                    <Shield size={16} className="text-brand-verde" /> Fonti Autoritative
                  </h3>
                  <div className="space-y-2">
                    {[
                      { nome: 'MIM', livello: 'A', desc: 'Ministero Istruzione e Merito' },
                      { nome: 'MIMUR', livello: 'A', desc: 'Archivio normative MIM' },
                      { nome: 'Orizzonte Scuola', livello: 'A', desc: 'Giornale scuola' },
                      { nome: 'Gazzetta Ufficiale', livello: 'A', desc: 'Fonte legislativa' },
                    ].map(f => (
                      <div key={f.nome} className="flex items-center justify-between text-xs">
                        <div>
                          <span className="text-gray-600 font-medium">{f.nome}</span>
                          <p className="text-[9px] text-gray-400">{f.desc}</p>
                        </div>
                        <span className="px-1.5 py-0.5 rounded text-[9px] font-bold bg-green-100 text-green-700">
                          Lvl {f.livello}
                        </span>
                      </div>
                    ))}
                  </div>
                </div>

                <Link to="/notizie-scadenze/archivio" className="flex items-center justify-center gap-2 py-3 bg-brand-blu text-white rounded-2xl text-sm font-bold hover:bg-brand-blu/90 transition shadow-md">
                  Archivio Completo <ChevronRight size={14} />
                </Link>
              </div>
            </div>
          </div>
        )}

        {/* === SCADENZE: Thematic Boxes === */}
        {!loading && activeTab === 'scadenze' && (
          <div className="space-y-6">
            {scadenzeByCategory.length === 0 && (
              <div className="text-center py-12">
                <CalendarClock size={48} className="mx-auto text-gray-300 mb-4" />
                <p className="text-gray-500 text-sm">Nessuna scadenza attiva.</p>
              </div>
            )}
            {scadenzeByCategory.map(box => {
              const isExpanded = expandedBox === `scad-${box.categoria}`;
              const colorClass = CATEGORIE_SCADENZA_COLORS[box.categoria];
              return (
                <div key={box.categoria} className={`rounded-3xl border overflow-hidden transition-all duration-300 ${isExpanded ? 'border-brand-ambra/30 shadow-medium' : 'border-slate-200/60 shadow-soft hover:shadow-md'}`}>
                  <button onClick={() => setExpandedBox(isExpanded ? null : `scad-${box.categoria}`)} className="w-full flex items-center justify-between p-5 bg-gradient-to-r from-white to-amber-50/30 hover:from-amber-50/20 transition-colors">
                    <div className="flex items-center gap-3">
                      <CalendarClock size={22} className="text-brand-ambra" />
                      <div className="text-left">
                        <h3 className="text-lg font-bold text-[#0F172A]">{box.categoria}</h3>
                        <p className="text-xs text-gray-500">{box.items.length} attive</p>
                      </div>
                    </div>
                    <div className="flex items-center gap-2">
                      <span className={`text-xs font-semibold px-2.5 py-1 rounded-full border ${colorClass}`}>{box.items.length}</span>
                      <ChevronDown size={18} className={`text-gray-400 transition-transform duration-300 ${isExpanded ? 'rotate-180' : ''}`} />
                    </div>
                  </button>
                  {isExpanded && (
                    <div className="p-5 pt-0 space-y-3 animate-fade-in-up">
                      {box.items.map(item => <ScadenzaCard key={item.id} item={item} />)}
                    </div>
                  )}
                </div>
              );
            })}
          </div>
        )}
      </div>
    </section>
  );
}

function NewsCard({ item }: { item: NotiziaIntelligence }) {
  const { criticita } = item.classifica;
  const critColors: Record<string, string> = { urgente: 'bg-red-100 text-red-700', alta: 'bg-amber-100 text-amber-700', strategica: 'bg-purple-100 text-purple-700', media: 'bg-blue-100 text-blue-700', bassa: 'bg-gray-100 text-gray-600' };

  // Elaborated content from production layers
  const elaborazione = item.contenuti && item.contenuti.length > 0
    ? item.contenuti
    : [];

  const fonte = item.fonte;

  return (
    <div className="bg-white rounded-2xl border border-slate-200/60 p-4 hover:border-brand-blu/20 transition">
      <div className="flex items-start justify-between gap-3">
        <div className="flex-1 min-w-0">
          <div className="flex items-center gap-2 mb-2 flex-wrap">
            <span className={`text-[10px] font-bold px-2 py-0.5 rounded-full ${critColors[criticita] || critColors.media}`}>{criticita.toUpperCase()}</span>
            <span className="text-[10px] text-gray-400">{formatDataItaliana(item.dataPubblicazione)}</span>
            {fonte && (
              <span className="text-[10px] text-gray-400 flex items-center gap-1">
                <Shield size={9} /> {fonte.nome}
              </span>
            )}
          </div>
          <h4 className="text-sm font-bold text-[#0F172A] line-clamp-2">{item.titolo}</h4>
          <p className="text-xs text-gray-500 mt-1 line-clamp-2">{item.descrizione}</p>

          {/* Elaborated content — homemade detail from sources */}
          {elaborazione.length > 0 && (
            <div className="mt-2.5 space-y-1.5">
              {elaborazione.slice(0, 4).map((livello, i) => (
                <div key={i} className="text-[11px] text-gray-600 leading-relaxed bg-gray-50/80 rounded-lg px-2.5 py-1.5 border border-slate-100">
                  {typeof livello === 'string' ? livello : (livello as any)?.contenuto || ''}
                </div>
              ))}
            </div>
          )}

          {/* Regionale badge */}
          {item.regione && (
            <span className="inline-flex items-center gap-1 mt-2 text-[10px] font-medium text-brand-blu bg-brand-blu/5 px-2 py-0.5 rounded-full">
              <Globe size={9} /> {item.regione}
            </span>
          )}
        </div>
        {item.link && <a href={item.link} target="_blank" rel="noopener noreferrer" className="flex-shrink-0 p-1.5 text-gray-400 hover:text-brand-blu transition"><ExternalLink size={14} /></a>}
      </div>
    </div>
  );
}

function ScadenzaCard({ item }: { item: ScadenzaIntelligence }) {
  const prioritaColors: Record<string, string> = { urgente: 'bg-red-100 text-red-700', alta: 'bg-amber-100 text-amber-700', media: 'bg-blue-100 text-blue-700', bassa: 'bg-gray-100 text-gray-600' };
  const dataScadenza = item.dataScadenza ? new Date(item.dataScadenza) : null;
  const oggi = new Date();
  const giorniRimanenti = dataScadenza ? Math.ceil((dataScadenza.getTime() - oggi.getTime()) / (1000 * 60 * 60 * 24)) : null;
  const isUrgente = giorniRimanenti !== null && giorniRimanenti <= 15;

  return (
    <div className={`rounded-2xl border p-4 transition ${isUrgente ? 'bg-red-50/50 border-red-200' : 'bg-white border-slate-200/60'}`}>
      <div className="flex items-start justify-between gap-3">
        <div className="flex-1 min-w-0">
          <div className="flex items-center gap-2 mb-2 flex-wrap">
            <span className={`text-[10px] font-bold px-2 py-0.5 rounded-full ${prioritaColors[item.priorita] || prioritaColors.media}`}>{item.priorita?.toUpperCase() || 'MEDIA'}</span>
            {giorniRimanenti !== null && (
              <span className={`text-[10px] font-bold px-2 py-0.5 rounded-full ${isUrgente ? 'bg-red-100 text-red-700' : 'bg-green-100 text-green-700'}`}>
                {giorniRimanenti <= 0 ? 'SCADUTA' : `${giorniRimanenti}g rimasti`}
              </span>
            )}
          </div>
          <h4 className="text-sm font-bold text-[#0F172A] line-clamp-2">{item.titolo}</h4>
          {item.normativa && <p className="text-[10px] text-gray-400 mt-1">Rif: {item.normativa}</p>}
          {item.conseguenzeNonAzione && <p className="text-[10px] text-red-500 mt-1 font-medium">⚠ {item.conseguenzeNonAzione}</p>}
        </div>
      </div>
    </div>
  );
}
