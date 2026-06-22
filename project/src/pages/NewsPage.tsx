import { useState, useEffect } from 'react';
import { Newspaper, CalendarClock, RefreshCw } from 'lucide-react';
import News from '../components/News';
import Deadlines from '../components/Deadlines';

const RSS_FEEDS = [
  { name: 'MIM — Comunicati Stampa', url: 'https://www.mim.gov.it/feed/comunicati' },
  { name: 'Orizzonte Scuola — Ultime Notizie', url: 'https://www.orizzontescuola.it/feed/' },
];

const MOCK_RSS = [
  {
    title: 'MIM: Pubblicate le graduatorie GPS definitive 2026-2028',
    date: '22 Giugno 2026',
    source: 'MIM',
    summary: 'Il Ministero dell\'Istruzione e del Merito ha pubblicato le graduatorie provinciali per le supplenze definitive per il triennio 2026-2028.',
    link: 'https://www.mim.gov.it/graduatorie-provinciali-supplenze',
  },
  {
    title: 'Orizzonte Scuola: GPS 2026, come verificare il punteggio',
    date: '22 Giugno 2026',
    source: 'Orizzonte Scuola',
    summary: 'Guida completa alla verifica del punteggio GPS 2026 con le nuove tabelle di valutazione.',
    link: 'https://www.orizzontescuola.it/gps-2026-verifica-punteggio',
  },
  {
    title: 'MIM: Concorso docenti 2026, riaperti i termini per 5.000 posti',
    date: '20 Giugno 2026',
    source: 'MIM',
    summary: 'Riaperti i termini per il concorso straordinario docenti secondaria con 5.000 posti aggiuntivi.',
    link: 'https://www.mim.gov.it/concorso-straordinario-2026',
  },
  {
    title: 'Orizzonte Scuola: TFA Sostegno VIII ciclo, tutto sul bando',
    date: '19 Giugno 2026',
    source: 'Orizzonte Scuola',
    summary: 'Tutte le informazioni sul bando TFA Sostegno VIII ciclo con 12.000 posti disponibili.',
    link: 'https://www.orizzontescuola.it/tfa-sostegno-viii-ciclo-bando',
  },
  {
    title: 'MIM: Nuovo DPCM per percorsi abilitanti 30/36/60 CFU',
    date: '18 Giugno 2026',
    source: 'MIM',
    summary: 'Pubblicato il DPCM che aggiorna i percorsi di formazione iniziale dei docenti.',
    link: 'https://www.mim.gov.it/percorsi-abilitazione-2026',
  },
];

export default function NewsPage() {
  const [activeTab, setActiveTab] = useState<'notizie' | 'scadenze'>('notizie');
  const [rssItems] = useState(MOCK_RSS);
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
            Hub informativo unificato con notizie del MIM, aggiornamenti da Orizzonte Scuola
            e scadenze ministeriali. Auto-aggiornato ogni 30 minuti.
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
              Feed RSS Ministeriali e dal Web
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
          <div className="flex flex-wrap gap-3">
            {RSS_FEEDS.map(feed => (
              <a
                key={feed.name}
                href={feed.url}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-1.5 px-3 py-1.5 bg-brand-blu/5 text-brand-blu rounded-xl text-xs font-medium hover:bg-brand-blu/10 transition"
              >
                <RefreshCw size={10} />
                {feed.name}
              </a>
            ))}
          </div>
          <div className="mt-4 space-y-2">
            {rssItems.map((item, i) => (
              <a
                key={i}
                href={item.link}
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-start gap-3 p-3 rounded-2xl hover:bg-gray-50 transition group"
              >
                <span className={`text-xs font-bold px-2 py-0.5 rounded-full flex-shrink-0 mt-0.5 ${
                  item.source === 'MIM' ? 'bg-brand-blu/10 text-brand-blu' : 'bg-brand-verde/10 text-brand-verde'
                }`}>
                  {item.source}
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