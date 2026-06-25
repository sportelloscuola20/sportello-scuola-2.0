import { useState, useEffect } from 'react';
import { Newspaper, CalendarClock, Shield, AlertTriangle, RefreshCw, Monitor, Link2 } from 'lucide-react';
import type { IntelligenceDashboardStats, CategoriaUtente } from '../types/intelligence';
import { CATEGORIE_UTENTE, CATEGORIE_UTENTE_COLORS } from '../types/intelligence';
import { fetchDashboardStats, getDashboardFallbackStats } from '../rag/intelligence-engine';
import NewsHub from '../components/NewsHub';
import SourceMonitorDashboard from '../components/SourceMonitorDashboard';

export default function NewsPage() {
  const [showMonitor, setShowMonitor] = useState(false);
  const [stats, setStats] = useState<IntelligenceDashboardStats>(getDashboardFallbackStats());
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchDashboardStats().then(s => {
      if (s) setStats(s);
    }).catch(() => {}).finally(() => setLoading(false));
  }, []);

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-green-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-24 pb-12">
        {/* Dashboard header intelligence */}
        <div className="mb-8">
          <div className="text-center mb-6">
            <h1 className="text-4xl font-extrabold text-[#0F172A] mb-4 tracking-tight">
              Intelligence Editoriale — Notizie e Scadenze
            </h1>
            <p className="text-gray-600 max-w-3xl mx-auto">
              Piattaforma di monitoraggio normativo basata su fonti primarie certificate (G.U., MIM, Normattiva, ARAN, INPS, USR).
              Ogni contenuto è classificato per categoria, criticità, impatto e target,
              con validazione a 8 categorie tematiche e 7 livelli di approfondimento.
            </p>
          </div>

          {/* Live Dashboard Stats */}
          <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-5 gap-3 mb-6">
            <div className="bg-white/80 backdrop-blur rounded-2xl border border-slate-200/60 p-3 text-center">
              <p className="text-2xl font-extrabold text-green-600">{loading ? '...' : stats.fonti_attive}</p>
              <p className="text-[10px] text-gray-500 flex items-center justify-center gap-1">
                <Shield size={10} /> Fonti Attive
              </p>
            </div>
            <div className="bg-white/80 backdrop-blur rounded-2xl border border-slate-200/60 p-3 text-center">
              <p className="text-2xl font-extrabold text-blue-600">{loading ? '...' : stats.notizie_attive}</p>
              <p className="text-[10px] text-gray-500 flex items-center justify-center gap-1">
                <Newspaper size={10} /> Notizie Intelligence
              </p>
            </div>
            <div className="bg-white/80 backdrop-blur rounded-2xl border border-slate-200/60 p-3 text-center">
              <p className="text-2xl font-extrabold text-amber-600">{loading ? '...' : stats.scadenze_attive}</p>
              <p className="text-[10px] text-gray-500 flex items-center justify-center gap-1">
                <CalendarClock size={10} /> Scadenze Attive
              </p>
            </div>
            <div className="bg-white/80 backdrop-blur rounded-2xl border border-slate-200/60 p-3 text-center">
              <p className="text-2xl font-extrabold text-purple-600">{loading ? '...' : stats.collegamenti_knowledge_graph}</p>
              <p className="text-[10px] text-gray-500 flex items-center justify-center gap-1">
                <Link2 size={10} /> Knowledge Graph
              </p>
            </div>
            <div className="bg-white/80 backdrop-blur rounded-2xl border border-slate-200/60 p-3 text-center">
              <p className="text-2xl font-extrabold text-red-600">{loading ? '...' : stats.scadenze_imminenti}</p>
              <p className="text-[10px] text-gray-500 flex items-center justify-center gap-1">
                <AlertTriangle size={10} /> Scadenze Imminenti
              </p>
            </div>
          </div>

          {/* Quick stats */}
          <div className="flex items-center justify-center gap-2 mb-4 flex-wrap text-xs">
            <span className="inline-flex items-center gap-1 text-gray-500">
              <RefreshCw size={11} className={loading ? 'animate-pulse' : ''} />
              Documenti ultime 24h: {stats.documenti_ultime_24h}
            </span>
            {stats.documenti_da_elaborare > 0 && (
              <span className="inline-flex items-center gap-1 bg-amber-50 text-amber-700 px-2 py-0.5 rounded-full">
                {stats.documenti_da_elaborare} da elaborare
              </span>
            )}
            {stats.ultimo_monitoraggio && (
              <span className="text-gray-400">
                Ultimo check: {new Date(stats.ultimo_monitoraggio).toLocaleString('it-IT')}
              </span>
            )}
          </div>

          {/* Control buttons */}
          <div className="flex flex-wrap gap-2 justify-center mb-6">
            <button onClick={() => setShowMonitor(!showMonitor)}
              className="inline-flex items-center gap-2 text-sm text-brand-blu font-semibold hover:text-brand-blu/80 transition border border-brand-blu/20 px-4 py-2 rounded-xl hover:bg-brand-blu/5">
              <Monitor size={14} /> {showMonitor ? 'Nascondi' : 'Mostra'} Monitoraggio Fonti
            </button>
          </div>

          {/* Source monitor dashboard */}
          {showMonitor && (
            <div className="mb-6 animate-fade-in-up">
              <SourceMonitorDashboard />
            </div>
          )}

          {/* Macro-categories legend */}
          <div className="bg-white/80 backdrop-blur-md rounded-3xl border border-slate-200/60 p-6 mb-6">
            <h3 className="text-lg font-bold text-[#0F172A] mb-3">8 Categorie Tematiche</h3>
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-2">
              {CATEGORIE_UTENTE.map(cat => (
                <div key={cat} className={`text-xs font-semibold px-3 py-2 rounded-xl border text-center ${CATEGORIE_UTENTE_COLORS[cat]}`}>
                  {cat}
                </div>
              ))}
            </div>
            <div className="mt-4 p-4 bg-gray-100 rounded-2xl">
              <p className="text-xs text-gray-600 font-semibold">Ogni notizia è classificata in una delle 8 categorie tematiche, con criticità, impatto, platea e target specifici. Validazione a 6 livelli: Allerta → Verifica Fonte Primaria → Effetti Operativi → Impatti Giuridici → Risvolti Europei → Ricerca Scientifica.</p>
            </div>
          </div>
        </div>

        <NewsHub />
      </div>
    </div>
  );
}
