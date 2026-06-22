import { useState, useEffect, useCallback } from 'react';
import { supabase } from '../lib/supabaseClient';
import type { NewsCache, SavedAlert } from '../types/database';

const MOCK_NEWS: NewsCache[] = [
  {
    id: '1',
    title: 'Apertura iscrizioni GPS 2026-2028: scadenze e requisiti',
    category: 'Docenti',
    content: 'Il Ministero dell\'Istruzione e del Merito ha pubblicato l\'ordinanza per l\'aggiornamento delle Graduatorie Provinciali per le Supplenze (GPS) per il triennio 2026-2028. Le domande potranno essere presentate esclusivamente online tramite la piattaforma Istanze On Line del MIM entro il 31 luglio 2026. Sono ammessi alla presentazione dell\'istanza i docenti in possesso dell\'abilitazione all\'insegnamento alla data di scadenza del bando. La valutazione dei titoli seguirà i criteri definiti nelle Tabelle A/1-A/10 dell\'allegato all\'ordinanza. Si ricorda che i punteggi saranno calcolati d\'ufficio sulla base dei titoli già acquisiti dal MIM, ma è possibile integrare i titoli non ancora registrati nel database ministeriale.',
    due_date: '2026-07-31',
    source_url: 'https://www.istruzione.it',
    is_pinned: true,
    created_at: '2026-06-10',
  },
  {
    id: '2',
    title: 'OM 88/2024: Reclutamento straordinario personale ATA — Aggiornamento graduatorie',
    category: 'ATA',
    content: 'Con Ordinanza Ministeriale n. 88 del 2024 sono stati definiti i criteri per il reclutamento straordinario del personale ATA per l\'anno scolastico 2026/2027. Le assunzioni riguardano i profili di Assistente Amministrativo, Assistente Tecnico, Collaboratore Scolastico e Operatore Scolastico. I candidati devono essere in possesso della Certificazione Internazionale di Alfabetizzazione Digitale (CIAD) come requisito di accesso obbligatorio. Le domande vanno presentate entro il 15 settembre 2026 tramite Istanze On Line.',
    due_date: '2026-09-15',
    source_url: 'https://www.istruzione.it',
    is_pinned: true,
    created_at: '2026-06-08',
  },
  {
    id: '3',
    title: 'Bando TFA Sostegno 2026: posti disponibili e calendario prove',
    category: 'Bandi',
    content: 'È stato pubblicato il bando per l\'ammissione al Tirocinio Formativo Attivo (TFA) per il sostegno — anno accademico 2025/2026. I posti disponibili sono complessivamente 8.500, distribuiti tra infanzia, primaria e secondaria. La prova di ammissione si terrà il 20 settembre 2026. La scadenza per la presentazione delle domande è fissata al 30 agosto 2026. Il TFA sostegno costituisce titolo preferenziale per l\'inserimento nelle GPS e dà diritto a 24 punti nella valutazione dei titoli.',
    due_date: '2026-08-30',
    source_url: 'https://www.istruzione.it',
    is_pinned: false,
    created_at: '2026-06-05',
  },
  {
    id: '4',
    title: 'CCNL Istruzione e Ricerca: aggiornamento contrattuale 2026',
    category: 'Docenti',
    content: 'Le organizzazioni sindacali hanno raggiunto un accordo per l\'aggiornamento del Contratto Collettivo Nazionale di Lavoro per il comparto Istruzione e Ricerca. Le novità principali includono: incremento del fondo di produttività del 3%, revisione della scala retributiva per il personale ATA, nuove disposizioni sulla mobilità professionale, miglioramento dei permessi per congedi parentali e formazione. L\'applicazione è retroattiva dal 1° gennaio 2026.',
    due_date: null,
    source_url: 'https://www.istruzione.it',
    is_pinned: false,
    created_at: '2026-06-01',
  },
  {
    id: '5',
    title: 'D.M. 89/2024: Terza Fascia ATA — Nomine e assunzioni in corso',
    category: 'ATA',
    content: 'Il Decreto Ministeriale 89/2024 ha istituito le graduatorie di terza fascia del personale ATA. Le assunzioni stanno procedendo su base provinciale. I candidati sono invitati a verificare la propria posizione in graduatoria tramite il portale Istanze On Line del MIM. Il punteggio è calcolato secondo i criteri del D.M. 89/2024, che prevede la valutazione del titolo di studio rapportato su base 10, dei servizi scolastici statali e paritari, delle certificazioni informatiche e delle qualifiche professionali.',
    due_date: null,
    source_url: 'https://www.istruzione.it',
    is_pinned: false,
    created_at: '2026-05-28',
  },
  {
    id: '6',
    title: 'Concorso ordinario docenti 2026: pubblicazione fascicoli e calendario',
    category: 'Bandi',
    content: 'Il MIM ha pubblicato il calendario completo del concorso ordinario per l\'assunzione di personale docente. Le prove scritte si terranno dal 15 al 25 ottobre 2026. I candidati potranno accedere ai propri fascicoli sulla piattaforma Istanze On Line dal 1° settembre 2026. Sono previsti posti per tutte le classi di concorso della scuola dell\'infanzia, primaria e secondaria di primo e secondo grado. Il superamento della prova dà titolo all\'immissione in ruolo per l\'a.s. 2027/2028.',
    due_date: '2026-09-01',
    source_url: 'https://www.istruzione.it',
    is_pinned: true,
    created_at: '2026-05-20',
  },
];

function getSavedAlerts(): SavedAlert[] {
  try {
    const raw = localStorage.getItem('ss2_saved_alerts');
    return raw ? JSON.parse(raw) : [];
  } catch {
    return [];
  }
}

function saveAlert(alert: SavedAlert): void {
  const current = getSavedAlerts();
  if (current.some(a => a.id === alert.id)) return;
  current.push(alert);
  localStorage.setItem('ss2_saved_alerts', JSON.stringify(current));
}

function removeAlert(id: string): void {
  const current = getSavedAlerts().filter(a => a.id !== id);
  localStorage.setItem('ss2_saved_alerts', JSON.stringify(current));
}

export default function NewsSection() {
  const [activeFilter, setActiveFilter] = useState<'tutti' | 'Docenti' | 'ATA' | 'Bandi'>('tutti');
  const [expandedId, setExpandedId] = useState<string | null>(null);
  const [savedIds, setSavedIds] = useState<Set<string>>(new Set(getSavedAlerts().map(a => a.id)));
  const [news, setNews] = useState<NewsCache[]>(MOCK_NEWS);

  useEffect(() => {
    (async () => {
      const { data } = await supabase
        .from('news_cache')
        .select('*')
        .order('is_pinned', { ascending: false })
        .order('created_at', { ascending: false });

      if (data && data.length > 0) setNews(data as NewsCache[]);
    })();
  }, []);

  const filtered = activeFilter === 'tutti' ? news : news.filter(n => n.category === activeFilter);

  const toggleExpand = useCallback((id: string) => {
    setExpandedId(prev => (prev === id ? null : id));
  }, []);

  const toggleSave = useCallback((id: string) => {
    if (savedIds.has(id)) {
      removeAlert(id);
      setSavedIds(prev => {
        const next = new Set(prev);
        next.delete(id);
        return next;
      });
    } else {
      const item = news.find(n => n.id === id);
      if (item) {
        const alert: SavedAlert = {
          id: item.id,
          type: 'news',
          title: item.title,
          dueDate: item.due_date,
          savedAt: new Date().toISOString(),
        };
        saveAlert(alert);
        setSavedIds(prev => new Set(prev).add(id));
      }
    }
  }, [savedIds, news]);

  const getDaysRemaining = (dueDate: string | null): number | null => {
    if (!dueDate) return null;
    const diff = new Date(dueDate).getTime() - Date.now();
    return Math.ceil(diff / (1000 * 60 * 60 * 24));
  };

  return (
    <div className="space-y-6">
      <div className="flex flex-wrap gap-2">
        {(['tutti', 'Docenti', 'ATA', 'Bandi'] as const).map(f => (
          <button
            key={f}
            onClick={() => setActiveFilter(f)}
            className={`px-4 py-2 rounded-2xl text-sm font-medium transition ${
              activeFilter === f
                ? 'bg-brand-blu text-white'
                : 'bg-gray-100 text-gray-600 hover:bg-gray-200'
            }`}
          >
            {f === 'tutti' ? 'Tutti' : f}
          </button>
        ))}
      </div>

      <div className="space-y-4">
        {filtered.map(item => {
          const days = getDaysRemaining(item.due_date);
          const isExpanded = expandedId === item.id;
          const isSaved = savedIds.has(item.id);

          return (
            <div
              key={item.id}
              className={`bg-white/70 backdrop-blur-xs border rounded-2xl overflow-hidden transition-all duration-300 ${
                item.is_pinned ? 'border-brand-blu/30' : 'border-gray-200'
              }`}
            >
              <div
                className="p-5 cursor-pointer hover:bg-gray-50/50 transition"
                onClick={() => toggleExpand(item.id)}
              >
                <div className="flex items-start justify-between gap-3">
                  <div className="flex-1">
                    <div className="flex items-center gap-2 mb-1">
                      {item.is_pinned && (
                        <span className="px-2 py-0.5 bg-brand-blu/10 text-brand-blu text-xs rounded-full font-medium">In evidenza</span>
                      )}
                      <span className={`px-2 py-0.5 text-xs rounded-full font-medium ${
                        item.category === 'Docenti' ? 'bg-blue-100 text-blue-700' :
                        item.category === 'ATA' ? 'bg-green-100 text-brand-verde' :
                        'bg-purple-100 text-purple-700'
                      }`}>
                        {item.category}
                      </span>
                    </div>
                    <h3 className="font-semibold text-gray-800">{item.title}</h3>
                    <div className="flex items-center gap-3 mt-2 text-xs text-gray-500">
                      <span>{new Date(item.created_at).toLocaleDateString('it-IT')}</span>
                      {days !== null && (
                        <span className={days <= 7 ? 'text-red-500 font-semibold' : ''}>
                          {days > 0 ? `Scade tra ${days} gg` : 'Scaduto'}
                        </span>
                      )}
                    </div>
                  </div>

                  <div className="flex items-center gap-2">
                    <button
                      onClick={e => { e.stopPropagation(); toggleSave(item.id); }}
                      className={`p-2 rounded-xl transition ${
                        isSaved ? 'text-brand-verde bg-brand-verde/10' : 'text-gray-400 hover:text-brand-verde'
                      }`}
                      title={isSaved ? 'Rimuovi dalle scadenze monitorate' : 'Salva nelle scadenze monitorate'}
                    >
                      <svg className="w-5 h-5" fill={isSaved ? 'currentColor' : 'none'} stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 17h5l-1.405-1.405A2.032 2.032 0 0118 14.158V11a6.002 6.002 0 00-4-5.659V5a2 2 0 10-4 0v.341C7.67 6.165 6 8.388 6 11v3.159c0 .538-.214 1.055-.595 1.436L4 17h5m6 0v1a3 3 0 11-6 0v-1m6 0H9" />
                      </svg>
                    </button>
                    <svg className={`w-5 h-5 text-gray-400 transition-transform duration-300 ${isExpanded ? 'rotate-180' : ''}`} fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                    </svg>
                  </div>
                </div>
              </div>

              <div
                className="overflow-hidden transition-all duration-500 ease-in-out"
                style={{ maxHeight: isExpanded ? '600px' : '0' }}
              >
                <div className="px-5 pb-5 pt-0 border-t border-gray-100">
                  <p className="text-gray-600 text-sm leading-relaxed mt-4">{item.content}</p>
                  {item.source_url && (
                    <a
                      href={item.source_url}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="inline-block mt-3 text-brand-ottanio text-sm hover:underline"
                    >
                      Fonte ufficiale →
                    </a>
                  )}
                </div>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}
