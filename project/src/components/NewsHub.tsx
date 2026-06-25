import { useState, useEffect } from 'react';
import { Newspaper, CalendarClock, Shield, Activity } from 'lucide-react';
import News from './News';
import Deadlines from './Deadlines';
import { fetchDashboardStats } from '../rag/intelligence-engine';
import type { IntelligenceDashboardStats } from '../types/intelligence';

interface NewsHubProps {
  isHomePage?: boolean;
}

export default function NewsHub({}: NewsHubProps) {
  const [activeTab, setActiveTab] = useState<'notizie' | 'scadenze'>('notizie');
  const [stats, setStats] = useState<IntelligenceDashboardStats | null>(null);

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

        {activeTab === 'notizie' ? <News compact /> : <Deadlines compact />}
      </div>
    </section>
  );
}
