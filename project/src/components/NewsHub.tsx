import { useState, useEffect } from 'react';
import { Newspaper, CalendarClock, Shield, Activity, Search } from 'lucide-react';
import News from './News';
import Deadlines from './Deadlines';
import { fetchDashboardStats } from '../rag/intelligence-engine';
import type { IntelligenceDashboardStats, CategoriaUtente } from '../types/intelligence';
import { CATEGORIE_UTENTE, CATEGORIE_SCADENZA, REGIONI_ITALIA } from '../types/intelligence';

interface NewsHubProps {
  isHomePage?: boolean;
}

export default function NewsHub({ isHomePage = true }: NewsHubProps) {
  const [activeTab, setActiveTab] = useState<'notizie' | 'scadenze'>('notizie');
  const [stats, setStats] = useState<IntelligenceDashboardStats | null>(null);

  // Stato filtri condivisi per homepage
  const [newsCategory, setNewsCategory] = useState<CategoriaUtente | 'Tutte'>('Tutte');
  const [newsSearch, setNewsSearch] = useState('');
  const [newsCriticalita, setNewsCriticalita] = useState('');

  const [deadlineCategory, setDeadlineCategory] = useState<string>('Tutte');
  const [deadlineSearch, setDeadlineSearch] = useState('');
  const [deadlineRegione, setDeadlineRegione] = useState('');

  useEffect(() => {
    fetchDashboardStats().then(setStats).catch(() => setStats(null));
  }, []);

  const switchBgClass = 'bg-gray-100/80 backdrop-blur-sm rounded-2xl p-1.5 border border-slate-200/60 shadow-soft';
  const activePillNews = 'bg-brand-blu text-white shadow-md shadow-brand-blu/10';
  const activePillScadenze = 'bg-brand-ambra text-white shadow-md shadow-brand-ambra/10';
  const inactivePill = 'text-gray-600 hover:text-brand-blu/80';

  return (
    <section className="py-20 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-6">
          <h2 className="text-4xl font-extrabold text-[#0F172A] mb-4 tracking-tight">
            Intelligence — Notizie e Scadenze
          </h2>
          <p className="text-gray-600 font-normal max-w-3xl mx-auto">
            Sistema di monitoraggio normativo con classificazione per categoria, criticità, impatto e target specifici.
            Ogni contenuto segue il modello di produzione a 7 livelli di approfondimento:
            dalla notizia immediata agli scenari futuri.
          </p>
        </div>

        {stats && (
          <div className="flex items-center justify-center gap-3 mb-4 flex-wrap">
            <span className="inline-flex items-center gap-1 text-[10px] bg-green-50 text-green-700 px-2.5 py-1 rounded-full border border-green-200 font-medium">
              <Shield size={10} /> {stats.fonti_attive}/{stats.fonti_totali} fonti attive
            </span>
            <span className="inline-flex items-center gap-1 text-[10px] bg-blue-50 text-blue-700 px-2.5 py-1 rounded-full border border-blue-200 font-medium">
              <Activity size={10} /> {stats.notizie_attive} notizie attive
            </span>
            <span className="inline-flex items-center gap-1 text-[10px] bg-red-50 text-red-700 px-2.5 py-1 rounded-full border border-red-200 font-medium">
              <Activity size={10} /> {stats.scadenze_imminenti} scadenze imminenti
            </span>
          </div>
        )}
        <div className={`flex items-center gap-1 ${switchBgClass} mb-6 max-w-md mx-auto`}>
          <button onClick={() => setActiveTab('notizie')}
            className={`flex-1 flex items-center justify-center gap-2 px-4 py-2.5 rounded-xl text-sm font-semibold transition-all duration-300 ${
              activeTab === 'notizie' ? activePillNews : inactivePill
            }`}>
            <Newspaper size={16} /> Notizie
          </button>
          <button onClick={() => setActiveTab('scadenze')}
            className={`flex-1 flex items-center justify-center gap-2 px-4 py-2.5 rounded-xl text-sm font-semibold transition-all duration-300 ${
              activeTab === 'scadenze' ? activePillScadenze : inactivePill
            }`}>
            <CalendarClock size={16} /> Scadenze
          </button>
        </div>

        {/* Filtri homepage — visibili sempre sopra le liste */}
        {isHomePage && activeTab === 'notizie' && (
          <div className="flex flex-col gap-3 mb-6">
            <div className="flex flex-wrap gap-2 items-center">
              <button key="Tutte" onClick={() => setNewsCategory('Tutte')}
                className={`px-3 py-1.5 rounded-2xl text-xs font-semibold transition-all ${
                  newsCategory === 'Tutte' ? 'bg-brand-blu text-white' : 'bg-white text-gray-600 border border-slate-200/60 hover:border-brand-blu/30'
                }`}>Tutte</button>
              {CATEGORIE_UTENTE.map(cat => (
                <button key={cat} onClick={() => setNewsCategory(cat)}
                  className={`px-3 py-1.5 rounded-2xl text-xs font-semibold transition-all ${
                    newsCategory === cat ? 'bg-brand-blu text-white' : 'bg-white text-gray-600 border border-slate-200/60 hover:border-brand-blu/30'
                  }`}>{cat}</button>
              ))}
            </div>
            <div className="flex flex-col sm:flex-row gap-2">
              <div className="relative w-full sm:w-56">
                <Search size={14} className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" />
                <input type="text" placeholder="Cerca notizie..." value={newsSearch}
                  onChange={e => setNewsSearch(e.target.value)}
                  className="w-full pl-9 pr-4 py-1.5 rounded-2xl border border-slate-200/60 bg-white text-xs focus:ring-2 focus:ring-brand-blu/20 outline-none" />
              </div>
            </div>
          </div>
        )}
        {isHomePage && activeTab === 'scadenze' && (
          <div className="flex flex-col gap-3 mb-6">
            <div className="flex flex-wrap gap-2 items-center">
              {['Tutte', ...CATEGORIE_SCADENZA].map(t => (
                <button key={t} onClick={() => setDeadlineCategory(t)}
                  className={`px-3 py-1.5 rounded-2xl text-xs font-semibold transition-all ${
                    deadlineCategory === t ? 'bg-brand-ambra text-white' : 'bg-white text-gray-600 border border-slate-200/60 hover:border-brand-ambra/30'
                  }`}>{t}</button>
              ))}
            </div>
            <div className="flex flex-col sm:flex-row gap-2">
              <div className="relative w-full sm:w-56">
                <Search size={14} className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" />
                <input type="text" placeholder="Cerca scadenze..." value={deadlineSearch}
                  onChange={e => setDeadlineSearch(e.target.value)}
                  className="w-full pl-9 pr-4 py-1.5 rounded-2xl border border-slate-200/60 bg-white text-xs focus:ring-2 focus:ring-brand-ambra/20 outline-none" />
              </div>
              <select value={deadlineRegione} onChange={e => setDeadlineRegione(e.target.value)}
                className="px-3 py-1.5 rounded-2xl border border-slate-200/60 bg-white text-xs focus:ring-2 focus:ring-brand-ambra/20 outline-none">
                <option value="">Tutte le regioni</option>
                {REGIONI_ITALIA.map(r => <option key={r.codice} value={r.codice}>{r.nome}</option>)}
              </select>
            </div>
          </div>
        )}

        {activeTab === 'notizie' ? (
          <News compact filters={{
            activeCategory: newsCategory,
            searchQuery: newsSearch,
            filterCriticalita: newsCriticalita,
            onCategoryChange: setNewsCategory,
            onSearchChange: setNewsSearch,
            onCriticalitaChange: setNewsCriticalita,
          }} />
        ) : (
          <Deadlines compact filters={{
            activeCategory: deadlineCategory,
            searchQuery: deadlineSearch,
            filterRegione: deadlineRegione,
            onCategoryChange: setDeadlineCategory,
            onSearchChange: setDeadlineSearch,
            onRegioneChange: setDeadlineRegione,
          }} />
        )}
      </div>
    </section>
  );
}
