import { useState, useEffect } from 'react';
import { Calendar, Clock, Bell, Search, ChevronDown, FileText, AlertTriangle, Shield, Target, RefreshCw, Globe } from 'lucide-react';
import { Link } from 'react-router-dom';
import { useAuth } from './Auth/AuthContext';
import LoginModal from './Auth/LoginModal';
import { supabase } from '../lib/supabaseClient';
import { MOCK_SCADENZE_INTELLIGENCE, calcolaGiorniRimasti, formatDataItaliana } from '../rag/intelligence-engine';
import type { ScadenzaIntelligence, CategoriaUtente, CategoriaScadenza } from '../types/intelligence';
import { CRITICALITA_COLORS, IMPATTO_COLORS, TARGET_LABELS, CATEGORIE_UTENTE_COLORS, CATEGORIE_SCADENZA, CATEGORIE_SCADENZA_COLORS, REGIONI_ITALIA } from '../types/intelligence';

const MAX_VISIBLE = 4;
const REFRESH_INTERVAL_MS = 60000;

interface DeadlinesFilters {
  activeCategory: string;
  searchQuery: string;
  filterRegione: string;
  onCategoryChange: (cat: string) => void;
  onSearchChange: (q: string) => void;
  onRegioneChange: (r: string) => void;
}

function CountdownTimer({ targetDate }: { targetDate: Date }) {
  const [now, setNow] = useState(Date.now());
  useEffect(() => {
    const id = setInterval(() => setNow(Date.now()), 1000);
    return () => clearInterval(id);
  }, []);
  const diff = targetDate.getTime() - now;
  if (diff <= 0) {
    return (
      <span className="inline-flex items-center gap-1.5 text-red-600 font-bold text-sm">
        <AlertTriangle size={14} /> Scaduta
      </span>
    );
  }
  const totalSec = Math.floor(diff / 1000);
  const days = Math.floor(totalSec / 86400);
  const hours = Math.floor((totalSec % 86400) / 3600);
  const minutes = Math.floor((totalSec % 3600) / 60);
  const seconds = totalSec % 60;
  const pad = (n: number) => n.toString().padStart(2, '0');
  return (
    <div className="inline-flex items-center gap-2 text-sm font-mono font-bold text-brand-ambra bg-brand-ambra/5 px-3 py-1.5 rounded-xl border border-brand-ambra/10">
      <Clock size={14} />
      <span>{days}g</span>
      <span className="text-brand-ambra/60">:</span>
      <span>{pad(hours)}h</span>
      <span className="text-brand-ambra/60">:</span>
      <span>{pad(minutes)}m</span>
      <span className="text-brand-ambra/60">:</span>
      <span>{pad(seconds)}s</span>
    </div>
  );
}

export default function Deadlines({ compact = false, filters }: { compact?: boolean; filters?: DeadlinesFilters }) {
  const { isAuthenticated } = useAuth();
  const [showLogin, setShowLogin] = useState(false);
  const [followed, setFollowed] = useState<string[]>([]);
  const [searchQuery, setSearchQuery] = useState(filters?.searchQuery ?? '');
  const [expandedId, setExpandedId] = useState<string | null>(null);
  const [showAll, setShowAll] = useState(false);
  const [activeCategory, setActiveCategory] = useState<string>(filters?.activeCategory ?? 'Tutte');
  const [filterPriorita, setFilterPriorita] = useState<string>('');
  const [filterRegione, setFilterRegione] = useState<string>(filters?.filterRegione ?? '');
  const [deadlineItems, setDeadlineItems] = useState<ScadenzaIntelligence[]>(MOCK_SCADENZE_INTELLIGENCE);
  const [ultimoAggiornamento, setUltimoAggiornamento] = useState<Date>(new Date());
  const [isRefreshing, setIsRefreshing] = useState(false);

  // Sincronizza stato esterno quando fornito (NewsHub gestisce filtri)
  useEffect(() => {
    if (filters) {
      setActiveCategory(filters.activeCategory);
      setSearchQuery(filters.searchQuery);
      setFilterRegione(filters.filterRegione);
    }
  }, [filters?.activeCategory, filters?.searchQuery, filters?.filterRegione]);

  const fetchDeadlinesFromDB = async () => {
    setIsRefreshing(true);
    try {
      const { data, error } = await supabase
        .from('intelligence_scadenze')
        .select('*')
        .eq('is_conclusa', false)
        .order('data_scadenza', { ascending: true })
        .limit(20);

      if (!error && data && data.length > 0) {
        const mapped: ScadenzaIntelligence[] = (data as any[]).map(d => ({
          id: d.id,
          titolo: d.titolo,
          descrizione: d.descrizione || '',
          normativa: d.normativa || '',
          soggettiCoinvolti: d.soggetti_coinvolti || ['docenti'],
          dataScadenza: d.data_scadenza,
          priorita: d.priorita || 'media',
          impatto: d.impatto || 'nazionale',
          conseguenzeNonAzione: d.conseguenze_non_azione || '',
          link: d.link || '',
          tipo: d.tipo || 'generale',
          guidaOperativa: d.guida_operativa || '',
          autoGenerata: d.auto_generata,
          periodicita: d.periodicita,
          regione: d.regione || '',
        }));
        setDeadlineItems(mapped);
      }
    } catch {}
    setUltimoAggiornamento(new Date());
    setIsRefreshing(false);
  };

  useEffect(() => {
    fetchDeadlinesFromDB();
    const interval = setInterval(fetchDeadlinesFromDB, REFRESH_INTERVAL_MS);
    return () => clearInterval(interval);
  }, []);

  const filtered = deadlineItems.filter(d => {
    const matchCat = activeCategory === 'Tutte' || d.tipo === activeCategory;
    const matchPrio = !filterPriorita || d.priorita === filterPriorita;
    const matchReg = !filterRegione || d.regione === filterRegione;
    const matchSearch = !searchQuery || d.titolo.toLowerCase().includes(searchQuery.toLowerCase()) || d.descrizione.toLowerCase().includes(searchQuery.toLowerCase());
    return matchCat && matchPrio && matchReg && matchSearch;
  });

  const displayed = showAll ? filtered : filtered.slice(0, MAX_VISIBLE);

  const toggleFollow = (id: string) => {
    if (!isAuthenticated) { setShowLogin(true); return; }
    setFollowed(prev => prev.includes(id) ? prev.filter(f => f !== id) : [...prev, id]);
  };

  const types = ['Tutte', ...CATEGORIE_SCADENZA];

  const grid = (
    <>
      {!compact && (
        <>
          <div className="text-center mb-6">
            <h2 className="text-4xl font-extrabold text-[#0F172A] mb-4 tracking-tight">
              Scadenze Intelligence — Monitoraggio Attivo
            </h2>
            <p className="text-gray-600 font-normal max-w-3xl mx-auto">
              Sistema di tracciamento scadenze con classificazione per categoria, priorità, impatto e soggetti coinvolti.
              Ogni scadenza include base normativa, conseguenze della non-azione e guida operativa POLIS.
            </p>
          </div>
          <div className="flex items-center justify-between text-xs text-gray-400 mb-2">
            <span className="flex items-center gap-1.5">
              <RefreshCw size={12} className={isRefreshing ? 'animate-spin' : ''} />
              {isRefreshing ? 'Aggiornamento...' : `Ultimo aggiornamento: ${ultimoAggiornamento.toLocaleTimeString('it-IT')}`}
            </span>
            <button onClick={fetchDeadlinesFromDB} disabled={isRefreshing}
              className="flex items-center gap-1 text-brand-ambra font-semibold hover:text-brand-ambra/80 transition disabled:opacity-50">
              <RefreshCw size={12} className={isRefreshing ? 'animate-spin' : ''} />
              Aggiorna
            </button>
          </div>
          <div className="flex flex-col gap-4 mt-4 mb-8">
            <div className="flex gap-2 flex-wrap">
              {types.map(t => (
                <button key={t} onClick={() => { setActiveCategory(t); filters?.onCategoryChange(t); }}
                  className={`px-4 py-2 rounded-2xl text-xs font-semibold transition-all ${
                    activeCategory === t ? 'bg-brand-ambra text-white' : 'bg-white text-gray-600 border border-slate-200/60 hover:border-brand-ambra/30'
                  }`}>{t}</button>
              ))}
            </div>
            <div className="flex flex-col sm:flex-row gap-3">
              <div className="relative w-full sm:w-56">
                <Search size={16} className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" />
                <input type="text" placeholder="Cerca scadenze..." value={searchQuery}
                  onChange={e => { setSearchQuery(e.target.value); filters?.onSearchChange(e.target.value); }}
                  className="w-full pl-9 pr-4 py-2 rounded-2xl border border-slate-200/60 bg-white text-sm focus:ring-2 focus:ring-brand-ambra/20 outline-none" />
              </div>
              <select value={filterPriorita} onChange={e => setFilterPriorita(e.target.value)}
                className="px-4 py-2 rounded-2xl border border-slate-200/60 bg-white text-sm focus:ring-2 focus:ring-brand-ambra/20 outline-none">
                <option value="">Tutte le priorità</option>
                <option value="urgente">Urgente</option>
                <option value="alta">Alta</option>
                <option value="media">Media</option>
                <option value="bassa">Bassa</option>
              </select>
              <select value={filterRegione} onChange={e => { setFilterRegione(e.target.value); filters?.onRegioneChange(e.target.value); }}
                className="px-4 py-2 rounded-2xl border border-slate-200/60 bg-white text-sm focus:ring-2 focus:ring-brand-ambra/20 outline-none">
                <option value="">Tutte le regioni</option>
                {REGIONI_ITALIA.map(r => <option key={r.codice} value={r.codice}>{r.nome}</option>)}
              </select>
            </div>
          </div>
        </>
      )}

      <div className="space-y-4">
        {displayed.map((deadline) => {
          const isExpanded = expandedId === deadline.id;
          const isFoll = followed.includes(deadline.id);
          const targetDate = new Date(deadline.dataScadenza);
          const isValidDate = !isNaN(targetDate.getTime());
          return (
            <div key={deadline.id} className={`bg-white/70 backdrop-blur-md rounded-3xl border transition-all duration-500 ease-in-out overflow-hidden ${
              isExpanded ? 'border-brand-ambra/30 shadow-medium' : 'border-slate-200/60 shadow-soft hover:border-brand-ambra/20'
            }`}>
              <div className="p-6">
                <div className="flex items-start justify-between">
                  <div className="flex-1 min-w-0">
                    <div className="flex items-center gap-2 mb-3 flex-wrap">
                      <span className={`text-xs font-semibold px-2 py-0.5 rounded-full border ${CATEGORIE_SCADENZA_COLORS[deadline.tipo as CategoriaScadenza] || CATEGORIE_UTENTE_COLORS[deadline.tipo as CategoriaUtente] || 'bg-gray-100 text-gray-600'}`}>
                        {deadline.tipo}
                      </span>
                      <span className={`text-xs font-semibold px-2.5 py-1 rounded-full ${CRITICALITA_COLORS[deadline.priorita]}`}>
                        {deadline.priorita}
                      </span>
                      <span className={`text-xs font-semibold px-2.5 py-1 rounded-full ${IMPATTO_COLORS[deadline.impatto]}`}>
                        {deadline.impatto}
                      </span>
                      <span className="text-xs text-brand-ambra font-medium flex items-center gap-1">
                        <Calendar size={12} /> {formatDataItaliana(deadline.dataScadenza)}
                      </span>
                      {deadline.regione && (
                        <span className="text-xs font-semibold px-2 py-0.5 rounded-full bg-gray-100 text-gray-600 flex items-center gap-1">
                          <Globe size={10} /> {REGIONI_ITALIA.find(r => r.codice === deadline.regione)?.nome || deadline.regione}
                        </span>
                      )}
                    </div>
                    <h3 className="text-lg font-bold text-[#0F172A] mb-2">{deadline.titolo}</h3>
                    <p className={`text-gray-600 text-sm leading-relaxed ${isExpanded ? '' : 'line-clamp-2'}`}>
                      {deadline.descrizione}
                    </p>
                    {!isExpanded && (
                      <div className="flex gap-1.5 mt-2 flex-wrap">
                        {deadline.soggettiCoinvolti.slice(0, 4).map(s => (
                          <span key={s} className="inline-flex items-center gap-1 text-[10px] px-1.5 py-0.5 rounded-full bg-gray-100 text-gray-500">
                            <Target size={10} />{TARGET_LABELS[s]}
                          </span>
                        ))}
                      </div>
                    )}
                  </div>
                  <button onClick={() => toggleFollow(deadline.id)}
                    className={`ml-4 p-2 rounded-xl transition-all flex-shrink-0 ${
                      isFoll ? 'text-brand-ambra bg-brand-ambra/10' : 'text-gray-300 hover:text-brand-ambra hover:bg-brand-ambra/5'
                    }`}>
                    <Bell size={20} fill={isFoll ? '#D97706' : 'none'} strokeWidth={2} />
                  </button>
                </div>

                {isExpanded && (
                  <div className="mt-4 pt-4 border-t border-slate-200/60 animate-fade-in-up space-y-4">
                    <div className="flex items-center justify-between flex-wrap gap-2">
                      {isValidDate && <CountdownTimer targetDate={targetDate} />}
                      <span className="text-xs text-gray-500">
                        {calcolaGiorniRimasti(deadline.dataScadenza)} giorni rimanenti — scadenza ore 23:59
                      </span>
                    </div>

                    <div className="flex flex-wrap gap-1.5">
                      {deadline.soggettiCoinvolti.map(s => (
                        <span key={s} className="inline-flex items-center gap-1 text-xs px-2 py-1 rounded-full bg-brand-ambra/5 text-brand-ambra border border-brand-ambra/10">
                          <Target size={11} />{TARGET_LABELS[s]}
                        </span>
                      ))}
                    </div>

                    <div className="bg-brand-blu/5 rounded-2xl p-4 border border-brand-blu/10">
                      <h4 className="text-xs font-bold text-brand-blu uppercase tracking-wider mb-2 flex items-center gap-1.5">
                        <Shield size={12} /> Riferimento Normativo
                      </h4>
                      <p className="text-sm text-gray-700 leading-relaxed font-mono text-xs">
                        {deadline.normativa}
                      </p>
                    </div>

                    <div className="bg-red-50 rounded-2xl p-4 border border-red-200">
                      <h4 className="text-xs font-bold text-red-700 uppercase tracking-wider mb-2 flex items-center gap-1.5">
                        <AlertTriangle size={12} /> Conseguenze della Non-Azione
                      </h4>
                      <p className="text-sm text-red-700 leading-relaxed">
                        {deadline.conseguenzeNonAzione}
                      </p>
                    </div>

                    <div className="bg-brand-ambra/5 rounded-2xl p-4 border border-brand-ambra/10">
                      <h4 className="text-xs font-bold text-brand-ambra uppercase tracking-wider mb-2 flex items-center gap-1.5">
                        <FileText size={12} /> Guida Operativa
                      </h4>
                      <p className="text-sm text-gray-700 leading-relaxed">
                        {deadline.guidaOperativa}
                      </p>
                    </div>

                    {isFoll && (
                      <div className="p-3 bg-brand-ambra/5 rounded-2xl border border-brand-ambra/20">
                        <p className="text-sm text-brand-ambra font-medium flex items-center gap-2">
                          <Bell size={16} /> Riceverai una notifica 48 ore prima della scadenza
                        </p>
                      </div>
                    )}
                  </div>
                )}
              </div>

              <div className="px-6 pb-4">
                <button onClick={() => setExpandedId(isExpanded ? null : deadline.id)}
                  className="inline-flex items-center gap-2 text-brand-ambra font-semibold hover:text-brand-ambra/80 transition-colors text-sm">
                  {isExpanded ? 'Riduci' : 'Analisi scadenza completa'}
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
            <Link to="/notizie-scadenze/archivio?tab=scadenze"
              className="inline-flex items-center gap-2 text-brand-ambra font-semibold hover:text-brand-ambra/80 transition-colors text-sm border border-brand-ambra/20 px-5 py-2.5 rounded-xl hover:bg-brand-ambra/5">
              Vedi archivio completo
            </Link>
          ) : (
            <Link to="/notizie-scadenze/archivio?tab=scadenze"
              className="inline-flex items-center gap-2 bg-brand-ambra text-white px-8 py-3 rounded-2xl hover:bg-brand-ambra/90 transition-colors font-semibold shadow-soft">
              Vedi tutte le scadenze ({filtered.length})
            </Link>
          )}
        </div>
      )}
    </>
  );

  if (compact) return grid;

  return (
    <section id="scadenze" className="py-20 bg-surface-warm/40">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {grid}
      </div>
      {showLogin && <LoginModal onClose={() => setShowLogin(false)} />}
    </section>
  );
}
