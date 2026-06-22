import { useState } from 'react';
import { Newspaper, CalendarClock } from 'lucide-react';
import News from './News';
import Deadlines from './Deadlines';

interface NewsHubProps {
  isHomePage?: boolean;
}

export default function NewsHub({ isHomePage = false }: NewsHubProps) {
  const [activeTab, setActiveTab] = useState<'notizie' | 'scadenze'>('notizie');

  const switchBgClass =
    'bg-gray-100/80 backdrop-blur-sm rounded-2xl p-1.5 border border-slate-200/60 shadow-soft';
  const activePillNews =
    'bg-brand-blu text-white shadow-md shadow-brand-blu/10';
  const activePillScadenze =
    'bg-brand-ambra text-white shadow-md shadow-brand-ambra/10';
  const inactivePill =
    'text-gray-600 hover:text-brand-blu/80';

  return (
    <section className="py-20 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-6">
          <h2 className="text-4xl font-extrabold text-[#0F172A] mb-4 tracking-tight">
            Notizie e Scadenze
          </h2>
          <p className="text-gray-600 font-normal max-w-2xl mx-auto">
            Resta aggiornato con le ultime novit&agrave; del settore e le scadenze ministeriali.
            Ogni scheda include abstract tecnico, quadro normativo e guida operativa POLIS.
          </p>
        </div>

        <div className={`flex items-center gap-1 ${switchBgClass} mb-6 max-w-md mx-auto`}>
          <button
            onClick={() => setActiveTab('notizie')}
            className={`flex-1 flex items-center justify-center gap-2 px-4 py-2.5 rounded-xl text-sm font-semibold transition-all duration-300 ${
              activeTab === 'notizie' ? activePillNews : inactivePill
            }`}
          >
            <Newspaper size={16} />
            Notizie
          </button>
          <button
            onClick={() => setActiveTab('scadenze')}
            className={`flex-1 flex items-center justify-center gap-2 px-4 py-2.5 rounded-xl text-sm font-semibold transition-all duration-300 ${
              activeTab === 'scadenze' ? activePillScadenze : inactivePill
            }`}
          >
            <CalendarClock size={16} />
            Scadenze
          </button>
        </div>

        {activeTab === 'notizie' ? <News compact /> : <Deadlines compact />}
      </div>
    </section>
  );
}
