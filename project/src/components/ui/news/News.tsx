import { useState, useEffect } from 'react';
import { Calendar, Clock, Star, ChevronDown, Search, FileText, Target, Shield, Activity, BarChart3, RefreshCw, Link2, Globe, AlertTriangle, CheckCircle, Info, Newspaper } from 'lucide-react';
import { Link } from 'react-router-dom';
import { useAuth } from '../../foundation/AuthContext';
import LoginModal from '../../foundation/LoginModal';
import { supabase } from '../../../lib/supabaseClient';
import { generaDatiDataJournalism, fetchKnowledgeGraph } from '../../../rag/intelligence-engine';
import { formatDataItaliana } from '../../../rag/intelligence-engine';
import type { NotiziaIntelligence, LivelloProduzione, SezioneIntelligence, KnowledgeLink, CategoriaUtente } from '../../../types/intelligence';
import { CRITICALITA_COLORS, IMPATTO_COLORS, LIVELLO_PRODUZIONE_LABELS, TARGET_LABELS, RELAZIONE_LABELS, CATEGORIE_UTENTE, CATEGORIE_UTENTE_COLORS } from '../../../types/intelligence';
import type { NewsCache } from '../../../types/database';

const MAX_VISIBLE = 4;
const REFRESH_INTERVAL_MS = 60000;

interface NewsFilters {
  activeCategory: CategoriaUtente | 'Tutte';
  searchQuery: string;
  filterCriticalita: string;
  filterRegione: string;
  onCategoryChange: (cat: CategoriaUtente | 'Tutte') => void;
  onSearchChange: (q: string) => void;
  onCriticalitaChange: (c: string) => void;
  onRegioneChange: (r: string) => void;
}

const CRITICALITA_BADGE: Record<string, { bg: string; icon: React.ReactNode; label: string }> = {
  urgente: { bg: 'bg-red-50 border-red-300 text-red-700', icon: <AlertTriangle size={12} />, label: 'URGENTE' },
  alta: { bg: 'bg-amber-50 border-amber-300 text-amber-700', icon: <Info size={12} />, label: 'ALTA' },
  strategica: { bg: 'bg-purple-50 border-purple-300 text-purple-700', icon: <Activity size={12} />, label: 'STRATEGICA' },
  media: { bg: 'bg-blue-50 border-blue-300 text-blue-700', icon: <Info size={12} />, label: 'MEDIA' },
  bassa: { bg: 'bg-gray-50 border-gray-300 text-gray-600', icon: <CheckCircle size={12} />, label: 'BASSA' },
};

const LIVELLO_ICONE: Record<LivelloProduzione, { icon: React.ReactNode; color: string }> = {
  1: { icon: <Activity size={14} />, color: 'text-blue-600' },
  2: { icon: <FileText size={14} />, color: 'text-green-600' },
  3: { icon: <Target size={14} />, color: 'text-amber-600' },
  4: { icon: <Info size={14} />, color: 'text-purple-600' },
  5: { icon: <CheckCircle size={14} />, color: 'text-emerald-600' },
  6: { icon: <Shield size={14} />, color: 'text-slate-600' },
  7: { icon: <Activity size={14} />, color: 'text-rose-600' },
};

const REGIONI_ITALIA_SHORT = [
  { codice: '', nome: 'Tutte le regioni' },
  { codice: 'ABR', nome: 'Abruzzo' },
  { codice: 'BAS', nome: 'Basilicata' },
  { codice: 'CAL', nome: 'Calabria' },
  { codice: 'CAM', nome: 'Campania' },
  { codice: 'EMR', nome: 'Emilia-Romagna' },
  { codice: 'FVG', nome: 'Friuli-Venezia Giulia' },
  { codice: 'LAZ', nome: 'Lazio' },
  { codice: 'LIG', nome: 'Liguria' },
  { codice: 'LOM', nome: 'Lombardia' },
  { codice: 'MAR', nome: 'Marche' },
  { codice: 'MOL', nome: 'Molise' },
  { codice: 'PIE', nome: 'Piemonte' },
  { codice: 'PUG', nome: 'Puglia' },
  { codice: 'SAR', nome: 'Sardegna' },
  { codice: 'SIC', nome: 'Sicilia' },
  { codice: 'TOS', nome: 'Toscana' },
  { codice: 'UMB', nome: 'Umbria' },
  { codice: 'VEN', nome: 'Veneto' },
];

export default function News({ compact = false, filters }: { compact?: boolean; filters?: NewsFilters }) {
  const { isAuthenticated } = useAuth();
  const [showLogin, setShowLogin] = useState(false);
  const [searchQuery, setSearchQuery] = useState(filters?.searchQuery ?? '');
  const [expandedId, setExpandedId] = useState<string | null>(null);
  const [expandedLivelli, setExpandedLivelli] = useState<Record<string, Set<number>>>({});
  const [favorites, setFavorites] = useState<string[]>([]);
  const [showAll, setShowAll] = useState(false);
  const [filterCriticalita, setFilterCriticalita] = useState(filters?.filterCriticalita ?? '');
  const [filterRegione, setFilterRegione] = useState(filters?.filterRegione ?? '');
  const [activeCategory, setActiveCategory] = useState<CategoriaUtente | 'Tutte'>(filters?.activeCategory ?? 'Tutte');
  const [newsItems, setNewsItems] = useState<NotiziaIntelligence[]>([]);
  const [dataJournalism] = useState<SezioneIntelligence[]>(() => generaDatiDataJournalism());
  const [showDataJournalism, setShowDataJournalism] = useState(false);
  const [knowledgeLinks, setKnowledgeLinks] = useState<Record<string, KnowledgeLink[]>>({});
  const [ultimoAggiornamento, setUltimoAggiornamento] = useState<Date>(new Date());
  const [isRefreshing, setIsRefreshing] = useState(false);

  useEffect(() => {
    if (filters) {
      setActiveCategory(filters.activeCategory);
      setSearchQuery(filters.searchQuery);
      setFilterCriticalita(filters.filterCriticalita);
      setFilterRegione(filters.filterRegione);
    }
  }, [filters?.activeCategory, filters?.searchQuery, filters?.filterCriticalita, filters?.filterRegione]);

  const fetchNewsFromDB = async (): Promise<NotiziaIntelligence[] | null> => {
    try {
      const { data, error } = await supabase
        .from('intelligence_news')
        .select('*')
        .eq('is_archived', false)
        .order('is_pinned', { ascending: false })
        .order('data_pubblicazione', { ascending: false })
        .limit(20);

      if (!error && data && data.length > 0) {
        return (data as any[]).map(n => ({
          id: n.id,
          titolo: n.titolo,
          descrizione: n.descrizione || '',
          dataPubblicazione: n.data_pubblicazione || n.created_at,
          fonte: { livello: n.fonte_livello || 'A', nome: n.fonte_nome || 'MIM', url: n.fonte_url || 'https://www.mim.gov.it', peso: n.fonte_peso || 100 },
          classifica: {
            criticita: n.criticita || 'media', impatto: n.impatto || 'nazionale',
            platea: n.platea || 'ampia', target: n.target || ['docenti'],
            categoria: n.categoria || 'Normative, Note e Circolari Ministeriali', livelloFonte: n.fonte_livello || 'A',
            fontePrimaria: n.fonte_primaria || '', fonteUrl: n.fonte_url_dettaglio || '',
            dataAcquisizione: n.data_acquisizione || n.created_at,
          },
          contenuti: n.produzione_livelli || [{ livello: 1, titolo: 'Notizia', contenuto: n.descrizione || '' }],
          tag: n.tag || [],
          link: n.link || '',
          isPinned: n.is_pinned || false,
          regione: n.regione || null,
        }));
      }
    } catch {}
    return null;
  };

  const fetchNewsCache = async (): Promise<NotiziaIntelligence[] | null> => {
    try {
      const { data, error } = await supabase
        .from('news_cache')
        .select('*')
        .order('created_at', { ascending: false })
        .limit(20);
      if (!error && data && data.length > 0) {
        return (data as NewsCache[]).map(n => ({
          id: n.id,
          titolo: n.title,
          descrizione: (n.content || '').slice(0, 200),
          dataPubblicazione: n.created_at,
          fonte: { livello: 'A', nome: 'MIM', url: 'https://www.mim.gov.it', peso: 100 },
          classifica: {
            criticita: 'media', impatto: 'nazionale',
            platea: 'ampia', target: ['docenti'],
            categoria: 'Normative, Note e Circolari Ministeriali', livelloFonte: 'A',
            fontePrimaria: n.source_url || '', fonteUrl: n.source_url || '',
            dataAcquisizione: n.created_at,
          },
          contenuti: [{ livello: 1, titolo: 'Notizia', contenuto: n.content || '' }],
          tag: [n.category],
          link: n.source_url || '',
          isPinned: n.is_pinned,
        }));
      }
    } catch {}
    return null;
  };

  const fetchData = async () => {
    setIsRefreshing(true);
    let data: NotiziaIntelligence[] | null = await fetchNewsFromDB();
    if (!data) data = await fetchNewsCache();
    if (data) {
      setNewsItems(data);
    } else {
      setNewsItems([]);
    }
    setUltimoAggiornamento(new Date());
    setIsRefreshing(false);
  };

  useEffect(() => {
    fetchData();
    const interval = setInterval(fetchData, REFRESH_INTERVAL_MS);
    return () => clearInterval(interval);
  }, []);

  const filtered = newsItems.filter(item => {
    const matchCat = activeCategory === 'Tutte' || item.classifica.categoria === activeCategory;
    const matchCrit = !filterCriticalita || item.classifica.criticita === filterCriticalita;
    const matchReg = !filterRegione || item.regione === filterRegione;
    const matchSearch = !searchQuery || item.titolo.toLowerCase().includes(searchQuery.toLowerCase()) || item.descrizione.toLowerCase().includes(searchQuery.toLowerCase());
    return matchCat && matchCrit && matchReg && matchSearch;
  });

  const displayed = showAll ? filtered : filtered.slice(0, MAX_VISIBLE);

  const toggleFavorite = (id: string) => {
    if (!isAuthenticated) { setShowLogin(true); return; }
    setFavorites(prev => prev.includes(id) ? prev.filter(f => f !== id) : [...prev, id]);
  };

  const toggleLivello = (newsId: string, livello: number) => {
    setExpandedLivelli(prev => {
      const next = new Set(prev[newsId] || []);
      if (next.has(livello)) next.delete(livello);
      else next.add(livello);
      return { ...prev, [newsId]: next };
    });
  };

  const expandedNode = expandedId ? newsItems.find(n => n.id === expandedId) ?? null : null;

  useEffect(() => {
    if (expandedId && !knowledgeLinks[expandedId]) {
      fetchKnowledgeGraph(expandedId).then(links => {
        if (links.length > 0) {
          setKnowledgeLinks(prev => ({ ...prev, [expandedId!]: links }));
        }
      }).catch(() => {});
    }
  }, [expandedId]);

  const grid = (
    <>
      {!compact && (
        <>
          <div className="text-center mb-6">
            <h2 className="text-4xl font-extrabold text-[#0F172A] mb-4 tracking-tight">
              Notizie Intelligence — Settore Istruzione
            </h2>
            <p className="text-gray-600 font-normal max-w-3xl mx-auto">
              Sistema di monitoraggio normativo e informativo basato su fonti primarie certificate con approfondimento a 6 livelli: dal fatto alla normativa.
            </p>
          </div>
          <div className="flex items-center justify-between text-xs text-gray-400 mb-2">
            <span className="flex items-center gap-1.5">
              <RefreshCw size={12} className={isRefreshing ? 'animate-spin' : ''} />
              {isRefreshing ? 'Aggiornamento...' : `Ultimo aggiornamento: ${ultimoAggiornamento.toLocaleTimeString('it-IT')}`}
            </span>
            <button onClick={fetchData} disabled={isRefreshing}
              className="flex items-center gap-1 text-brand-blu font-semibold hover:text-brand-blu/80 transition disabled:opacity-50">
              <RefreshCw size={12} className={isRefreshing ? 'animate-spin' : ''} />
              Aggiorna
            </button>
          </div>
          <div className="flex flex-col gap-4 mt-4 mb-8">
            <div className="flex flex-wrap gap-2 items-center">
              <button key="Tutte" onClick={() => { setActiveCategory('Tutte'); filters?.onCategoryChange('Tutte'); }}
                className={`px-4 py-2 rounded-2xl text-xs font-semibold transition-all ${
                  activeCategory === 'Tutte' ? 'bg-brand-blu text-white' : 'bg-white text-gray-600 border border-slate-200/60 hover:border-brand-blu/30'
                }`}>Tutte</button>
              {CATEGORIE_UTENTE.map(cat => (
                <button key={cat} onClick={() => { setActiveCategory(cat); filters?.onCategoryChange(cat); }}
                  className={`px-4 py-2 rounded-2xl text-xs font-semibold transition-all ${
                    activeCategory === cat ? 'bg-brand-blu text-white' : 'bg-white text-gray-600 border border-slate-200/60 hover:border-brand-blu/30'
                  }`}>{cat}</button>
              ))}
            </div>
            <div className="flex flex-col sm:flex-row gap-3">
              <div className="relative w-full sm:w-56">
                <Search size={16} className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" />
                <input type="text" placeholder="Cerca notizie..." value={searchQuery}
                  onChange={e => { setSearchQuery(e.target.value); filters?.onSearchChange(e.target.value); }}
                  className="w-full pl-9 pr-4 py-2 rounded-2xl border border-slate-200/60 bg-white text-sm focus:ring-2 focus:ring-brand-blu/20 focus:border-brand-blu transition outline-none" />
              </div>
              <select value={filterCriticalita} onChange={e => { setFilterCriticalita(e.target.value); filters?.onCriticalitaChange(e.target.value); }}
                className="px-4 py-2 rounded-2xl border border-slate-200/60 bg-white text-sm focus:ring-2 focus:ring-brand-blu/20 outline-none">
                <option value="">Tutte le criticità</option>
                <option value="strategica">Strategica</option>
                <option value="urgente">Urgente</option>
                <option value="alta">Alta</option>
                <option value="media">Media</option>
                <option value="bassa">Bassa</option>
              </select>
              <select value={filterRegione} onChange={e => { setFilterRegione(e.target.value); filters?.onRegioneChange(e.target.value); }}
                className="px-4 py-2 rounded-2xl border border-slate-200/60 bg-white text-sm focus:ring-2 focus:ring-brand-blu/20 outline-none">
                {REGIONI_ITALIA_SHORT.map(r => <option key={r.codice} value={r.codice}>{r.nome}</option>)}
              </select>
              <button onClick={() => setShowDataJournalism(!showDataJournalism)}
                className="flex items-center gap-2 px-4 py-2 rounded-2xl border border-slate-200/60 bg-white text-sm font-semibold text-brand-blu hover:bg-brand-blu/5 transition">
                <BarChart3 size={16} /> Data Journalism
              </button>
            </div>
          </div>
        </>
      )}

      {!compact && showDataJournalism && dataJournalism.length > 0 && (
        <div className="mb-8 space-y-6 animate-fade-in-up">
          {dataJournalism.map((sezione, si) => (
            <div key={si} className="bg-gradient-to-r from-brand-blu/5 to-brand-verde/5 rounded-3xl border border-brand-blu/10 p-6">
              <h3 className="text-lg font-bold text-[#0F172A] mb-1">{sezione.titolo}</h3>
              <p className="text-sm text-gray-500 mb-4">{sezione.descrizione}</p>
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
                {sezione.dati.map((dato, di) => (
                  <div key={di} className="bg-white/80 rounded-2xl p-4 border border-slate-200/60">
                    <p className="text-xs text-gray-500 mb-1">{dato.label}</p>
                    <p className="text-2xl font-extrabold text-[#0F172A]">{dato.valore}</p>
                    {dato.trend && (
                      <p className={`text-xs mt-1 ${dato.trend === 'up' ? 'text-green-600' : dato.trend === 'down' ? 'text-red-600' : 'text-gray-400'}`}>
                        {dato.confronto}
                      </p>
                    )}
                    <p className="text-[10px] text-gray-400 mt-1">Fonte: {dato.fonte}</p>
                  </div>
                ))}
              </div>
            </div>
          ))}
        </div>
      )}

      <div className="space-y-4">
        {displayed.length === 0 && !isRefreshing && (
          <div className="text-center py-12">
            <Newspaper size={48} className="mx-auto text-gray-300 mb-4" />
            <p className="text-gray-500 text-sm">Nessuna notizia disponibile al momento.</p>
            <p className="text-gray-400 text-xs mt-1">Le notizie vengono aggiornate automaticamente dalle fonti monitorate.</p>
          </div>
        )}
        {displayed.map((news) => {
          const isExpanded = expandedId === news.id;
          const isFav = favorites.includes(news.id);
          const { criticita, impatto, target, categoria } = news.classifica;
          const badge = CRITICALITA_BADGE[criticita] || CRITICALITA_BADGE.media;
          const livelliEspansi = expandedLivelli[news.id] || new Set<number>();
          return (
            <div key={news.id} className={`bg-white/70 backdrop-blur-md rounded-3xl border transition-all duration-500 ease-in-out overflow-hidden ${
              isExpanded ? 'border-brand-blu/30 shadow-medium' : 'border-slate-200/60 shadow-soft hover:border-brand-blu/20'
            }`}>
              <div className="p-6">
                <div className="flex items-start justify-between">
                  <div className="flex-1 min-w-0">
                    <div className="flex items-center gap-2 mb-3 flex-wrap">
                      <span className={`inline-flex items-center gap-1 text-xs font-bold px-2.5 py-1 rounded-full border ${badge.bg}`}>
                        {badge.icon} {badge.label}
                      </span>
                      <span className={`text-xs font-semibold px-2 py-0.5 rounded-full border ${CATEGORIE_UTENTE_COLORS[categoria as CategoriaUtente] || 'bg-gray-100 text-gray-600'}`}>
                        {categoria}
                      </span>
                      <span className={`text-xs font-semibold px-2 py-0.5 rounded-full ${IMPATTO_COLORS[impatto]}`}>
                        {impatto}
                      </span>
                      {news.regione && (
                        <span className="inline-flex items-center gap-1 text-xs font-semibold px-2.5 py-1 rounded-full bg-sky-50 text-sky-700 border border-sky-200">
                          <Globe size={11} /> {REGIONI_ITALIA_SHORT.find(r => r.codice === news.regione)?.nome || news.regione}
                        </span>
                      )}
                      <span className="text-xs text-gray-400 flex items-center gap-1">
                        <Calendar size={12} /> {formatDataItaliana(news.dataPubblicazione)}
                        {(() => {
                          try {
                            const d = new Date(news.dataPubblicazione);
                            return isNaN(d.getTime()) ? '' : (
                              <> <span className="text-gray-300">|</span> <Clock size={10} /> {d.toLocaleTimeString('it-IT', { hour: '2-digit', minute: '2-digit' })}</>
                            );
                          } catch { return ''; }
                        })()}
                      </span>
                    </div>
                    <h3 className="text-lg font-bold text-[#0F172A] mb-2">{news.titolo}</h3>
                    <p className={`text-gray-600 text-sm leading-relaxed ${isExpanded ? '' : 'line-clamp-2'}`}>
                      {news.descrizione}
                    </p>
                    {!isExpanded && target.length > 0 && (
                      <div className="flex gap-1.5 mt-2 flex-wrap">
                        {target.slice(0, 4).map(t => (
                          <span key={t} className="inline-flex items-center gap-1 text-[10px] px-1.5 py-0.5 rounded-full bg-gray-100 text-gray-500">
                            <Target size={10} />{TARGET_LABELS[t]}
                          </span>
                        ))}
                      </div>
                    )}
                  </div>
                  <button onClick={() => toggleFavorite(news.id)}
                    className={`ml-4 p-2 rounded-xl transition-all flex-shrink-0 ${
                      isFav ? 'text-brand-ambra bg-brand-ambra/10' : 'text-gray-300 hover:text-brand-ambra hover:bg-brand-ambra/5'
                    }`}>
                    <Star size={20} fill={isFav ? '#D97706' : 'none'} strokeWidth={2} />
                  </button>
                </div>

                {isExpanded && expandedNode && (
                  <div className="mt-4 pt-4 border-t border-slate-200/60 animate-fade-in-up space-y-4">
                    <div className="flex flex-wrap gap-1.5">
                      {target.map(t => (
                        <span key={t} className="inline-flex items-center gap-1 text-xs px-2 py-1 rounded-full bg-brand-blu/5 text-brand-blu border border-brand-blu/10">
                          <Target size={11} />{TARGET_LABELS[t]}
                        </span>
                      ))}
                    </div>

                    {/* 6 Livelli di produzione con accordion */}
                    <div className="space-y-2">
                      {expandedNode.contenuti.sort((a, b) => a.livello - b.livello).map(c => {
                        const isLivelloOpen = livelliEspansi.has(c.livello);
                        const lIcon = LIVELLO_ICONE[c.livello as LivelloProduzione] || LIVELLO_ICONE[1];
                        return (
                          <div key={c.livello} className="bg-white rounded-2xl border border-slate-200/60 overflow-hidden">
                            <button
                              onClick={() => toggleLivello(news.id, c.livello)}
                              className="w-full flex items-center justify-between p-4 text-left hover:bg-slate-50/50 transition-colors"
                            >
                              <h4 className={`text-xs font-bold uppercase tracking-wider flex items-center gap-2 ${lIcon.color}`}>
                                {lIcon.icon}
                                {c.titolo || LIVELLO_PRODUZIONE_LABELS[c.livello as LivelloProduzione] || `Livello ${c.livello}`}
                              </h4>
                              <ChevronDown size={14} className={`text-gray-400 transition-transform duration-200 ${isLivelloOpen ? 'rotate-180' : ''}`} />
                            </button>
                            {isLivelloOpen && (
                              <div className="px-4 pb-4 animate-fade-in-up">
                                <p className="text-sm text-gray-700 whitespace-pre-wrap font-sans leading-relaxed">{c.contenuto}</p>
                              </div>
                            )}
                          </div>
                        );
                      })}
                    </div>

                    {/* Callout: Rischi/Conseguenze */}
                    {criticita === 'urgente' || criticita === 'alta' ? (
                      <div className="bg-red-50 rounded-2xl p-4 border border-red-200">
                        <h4 className="text-xs font-bold text-red-700 uppercase tracking-wider mb-2 flex items-center gap-1.5">
                          <AlertTriangle size={12} /> Attenzione — Criticità {criticita.toUpperCase()}
                        </h4>
                        <p className="text-sm text-red-700 leading-relaxed">
                          Questa notizia richiede azione immediata. Verifica i dettagli e le scadenze nella sezione dedicata.
                        </p>
                      </div>
                    ) : criticita === 'strategica' ? (
                      <div className="bg-purple-50 rounded-2xl p-4 border border-purple-200">
                        <h4 className="text-xs font-bold text-purple-700 uppercase tracking-wider mb-2 flex items-center gap-1.5">
                          <Activity size={12} /> Impatto Strategico
                        </h4>
                        <p className="text-sm text-purple-700 leading-relaxed">
                          Questa notizia ha un impatto strategico sul sistema scolastico. Potrebbe richiedere adeguamenti organizzativi.
                        </p>
                      </div>
                    ) : null}

                    {/* Fonte Primaria */}
                    <div className="bg-brand-verde/5 rounded-2xl p-4 border border-brand-verde/10">
                      <h4 className="text-xs font-bold text-brand-verde uppercase tracking-wider mb-2 flex items-center gap-1.5">
                        <Shield size={12} /> Fonte Primaria
                      </h4>
                      <p className="text-sm text-gray-700">{news.classifica.fontePrimaria}</p>
                    </div>

                    {knowledgeLinks[news.id] && knowledgeLinks[news.id].length > 0 && (
                      <div className="bg-purple-50 rounded-2xl p-4 border border-purple-200">
                        <h4 className="text-xs font-bold text-purple-700 uppercase tracking-wider mb-2 flex items-center gap-1.5">
                          <Link2 size={12} /> Knowledge Graph — Contenuti Correlati
                        </h4>
                        <div className="flex flex-wrap gap-2">
                          {knowledgeLinks[news.id].map(link => (
                            <span key={link.id} className="inline-flex items-center gap-1 text-[10px] px-2 py-1 rounded-full bg-white border border-purple-200 text-purple-700">
                              {RELAZIONE_LABELS[link.tipo_relazione] || link.tipo_relazione}
                            </span>
                          ))}
                        </div>
                      </div>
                    )}
                  </div>
                )}
              </div>

              <div className="px-6 pb-4">
                <button onClick={() => setExpandedId(isExpanded ? null : news.id)}
                  className="inline-flex items-center gap-2 text-brand-verde font-semibold hover:text-brand-verde/80 transition-colors text-sm">
                  {isExpanded ? 'Riduci' : 'Leggi analisi completa'}
                  <ChevronDown size={16} className={`transition-transform duration-300 ${isExpanded ? 'rotate-180' : ''}`} />
                </button>
              </div>
            </div>
          );
        })}
      </div>

      {filtered.length > MAX_VISIBLE && !showAll && (
        <div className="text-center mt-8">
          {compact ? (
            <Link to="/notizie-scadenze/archivio?tab=notizie"
              className="inline-flex items-center gap-2 text-brand-blu font-semibold hover:text-brand-blu/80 transition-colors text-sm border border-brand-blu/20 px-5 py-2.5 rounded-xl hover:bg-brand-blu/5">
              Vedi archivio completo
            </Link>
          ) : (
            <Link to="/notizie-scadenze/archivio?tab=notizie"
              className="inline-flex items-center gap-2 bg-brand-blu text-white px-8 py-3 rounded-2xl hover:bg-brand-blu/90 transition-colors font-semibold shadow-soft">
              Vedi tutte le notizie ({filtered.length})
            </Link>
          )}
        </div>
      )}
    </>
  );

  if (compact) return grid;

  return (
    <section id="notizie" className="py-20 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {grid}
      </div>
      {showLogin && <LoginModal onClose={() => setShowLogin(false)} />}
    </section>
  );
}
