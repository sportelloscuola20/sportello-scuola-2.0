import { useState, useEffect } from 'react';
import { Newspaper, CalendarClock, RefreshCw } from 'lucide-react';
import News from '../components/News';
import Deadlines from '../components/Deadlines';

const LOCAL_NEWS = [
  {
    title: 'Graduatorie GPS definitive 2026-2028: pubblicate le nuove tabelle',
    date: '22 Giugno 2026',
    summary: 'Sportello Scuola analizza le nuove tabelle di valutazione GPS per il triennio 2026-2028 con tutte le novit\u00e0 su punteggi e titoli.',
    link: '#',
  },
  {
    title: 'Concorso docenti 2026: riaperti i termini per 5.000 posti aggiuntivi',
    date: '20 Giugno 2026',
    summary: 'Riaperti i termini per il concorso straordinario docenti secondaria: guida completa alla domanda su POLIS.',
    link: '#',
  },
  {
    title: 'TFA Sostegno VIII ciclo: tutto sul bando con 12.000 posti',
    date: '19 Giugno 2026',
    summary: 'Bando TFA Sostegno VIII ciclo pubblicato: requisiti, prove e scadenze per l\'accesso al sostegno didattico.',
    link: '#',
  },
  {
    title: 'Nuovo DPCM per percorsi abilitanti 30/36/60 CFU',
    date: '18 Giugno 2026',
    summary: 'Pubblicato il DPCM che aggiorna i percorsi di formazione iniziale dei docenti. Analisi dei requisiti di accesso.',
    link: '#',
  },
  {
    title: 'Graduatorie ATA terza fascia: stato di pubblicazione per provincia',
    date: '17 Giugno 2026',
    summary: 'Monitoraggio in tempo reale della pubblicazione delle graduatorie ATA terza fascia 2024-2027 provincia per provincia.',
    link: '#',
  },
];

export default function NewsPage() {
  const [activeTab, setActiveTab] = useState<'notizie' | 'scadenze'>('notizie');
  const [localItems] = useState(LOCAL_NEWS);
  const [refreshing, setRefreshing] = useState(false);

  const handleRefresh = () => {
    setRefreshing(true);
    setTimeout(() => setRefreshing(false), 1500);
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-green-50">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 pt-24 pb-12">
        <div className="text-center mb-8">
          <h1 className="text-4xl font-extrabold text-[#0F172A] mb-4 tracking-tight">
            Notizie e Scadenze
          </h1>
          <p className="text-gray-600 max-w-2xl mx-auto">
            Hub informativo unificato con notizie del settore istruzione, approfondimenti normativi
            e scadenze ministeriali con countdown in tempo reale.
          </p>
        </div>

        <div className="flex items-center gap-1 bg-white/80 backdrop-blur-sm rounded-2xl p-1.5 border border-slate-200/60 shadow-soft mb-6 max-w-md mx-auto">
          <button
            onClick={() => setActiveTab('notizie')}
            className={`flex-1 flex items-center justify-center gap-2 px-4 py-2.5 rounded-xl text-sm font-semibold transition-all ${
              activeTab === 'notizie'
                ? 'bg-brand-blu text-white shadow-sm'
                : 'text-gray-600 hover:text-brand-blu hover:bg-brand-blu/5'
            }`}
          >
            <Newspaper size={16} />
            Notizie
          </button>
          <button
            onClick={() => setActiveTab('scadenze')}
            className={`flex-1 flex items-center justify-center gap-2 px-4 py-2.5 rounded-xl text-sm font-semibold transition-all ${
              activeTab === 'scadenze'
                ? 'bg-brand-ambra text-white shadow-sm'
                : 'text-gray-600 hover:text-brand-ambra hover:bg-brand-ambra/5'
            }`}
          >
            <CalendarClock size={16} />
            Scadenze
          </button>
        </div>

        <div className="mb-8 bg-white/70 backdrop-blur-md rounded-3xl border border-slate-200/60 shadow-soft p-5">
          <div className="flex items-center justify-between mb-4">
            <h3 className="text-sm font-bold text-brand-blu flex items-center gap-2">
              <RefreshCw size={14} className={refreshing ? 'animate-spin' : ''} />
              Approfondimenti Sportello Scuola
            </h3>
            <button
              onClick={handleRefresh}
              disabled={refreshing}
              className="text-xs text-gray-500 hover:text-brand-blu transition flex items-center gap-1"
            >
              <RefreshCw size={12} className={refreshing ? 'animate-spin' : ''} />
              Aggiorna
            </button>
          </div>
          <div className="mt-2 space-y-2">
            {localItems.map((item, i) => (
              <a
                key={i}
                href={item.link}
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-start gap-3 p-3 rounded-2xl hover:bg-gray-50 transition group"
              >
                <span className="text-xs font-bold px-2 py-0.5 rounded-full flex-shrink-0 mt-0.5 bg-brand-blu/10 text-brand-blu">
                  Sportello Scuola
                </span>
                <div className="flex-1 min-w-0">
                  <p className="text-sm font-medium text-gray-800 group-hover:text-brand-blu transition truncate">
                    {item.title}
                  </p>
                  <p className="text-xs text-gray-500 mt-0.5 line-clamp-1">{item.summary}</p>
                </div>
                <span className="text-xs text-gray-400 flex-shrink-0">{item.date}</span>
              </a>
            ))}
          </div>
        </div>

        {activeTab === 'notizie' ? <News /> : <Deadlines />}
      </div>
    </div>
  );
}
