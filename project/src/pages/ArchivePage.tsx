import { useState, useEffect } from 'react';
import { Newspaper, CalendarClock, Search, ArrowUpDown, Calendar, Target } from 'lucide-react';
import { Link } from 'react-router-dom';
import { supabase } from '../lib/supabaseClient';
import { MOCK_NEWS_INTELLIGENCE, MOCK_SCADENZE_INTELLIGENCE, formatDataItaliana } from '../rag/intelligence-engine';
import type { NotiziaIntelligence, ScadenzaIntelligence, CategoriaUtente } from '../types/intelligence';
import { CATEGORIE_UTENTE, CATEGORIE_UTENTE_COLORS, CRITICALITA_COLORS, TARGET_LABELS, CATEGORIE_ICONE } from '../types/intelligence';

export default function ArchivePage() {
  const [activeView, setActiveView] = useState<'notizie' | 'scadenze'>('notizie');
  const [searchQuery, setSearchQuery] = useState('');
  const [newsItems, setNewsItems] = useState<NotiziaIntelligence[]>([]);
  const [deadlineItems, setDeadlineItems] = useState<ScadenzaIntelligence[]>([]);
  const [sortField, setSortField] = useState<'data' | 'criticita' | 'categoria'>('data');
  const [sortAsc, setSortAsc] = useState(false);
  const [categoryFilter, setCategoryFilter] = useState<string>('Tutte');

  useEffect(() => {
    const fetchData = async () => {
      try {
        const { data: newsData } = await supabase
          .from('intelligence_news')
          .select('*')
          .order('data_pubblicazione', { ascending: false })
          .limit(200);
        if (newsData && newsData.length > 0) {
          setNewsItems((newsData as any[]).map(n => ({
            id: n.id,
            titolo: n.titolo,
            descrizione: n.descrizione || '',
            dataPubblicazione: n.data_pubblicazione || n.created_at,
            fonte: { livello: n.fonte_livello || 'A', nome: n.fonte_nome || '', url: n.fonte_url || '', peso: n.fonte_peso || 100 },
            classifica: {
              criticita: n.criticita || 'media', impatto: n.impatto || 'nazionale',
              platea: n.platea || 'ampia', target: n.target || ['docenti'],
              categoria: n.categoria || 'Normative, Note e Circolari Ministeriali',
              livelloFonte: n.fonte_livello || 'A',
              fontePrimaria: n.fonte_primaria || '', fonteUrl: n.fonte_url_dettaglio || '',
              dataAcquisizione: n.data_acquisizione || n.created_at,
            },
            contenuti: n.produzione_livelli || [],
            tag: n.tag || [],
            link: n.link || '',
            isPinned: n.is_pinned || false,
          })));
        } else {
          setNewsItems(MOCK_NEWS_INTELLIGENCE);
        }
      } catch {
        setNewsItems(MOCK_NEWS_INTELLIGENCE);
      }

      try {
        const { data: deadlineData } = await supabase
          .from('intelligence_scadenze')
          .select('*')
          .order('data_scadenza', { ascending: true })
          .limit(200);
        if (deadlineData && deadlineData.length > 0) {
          setDeadlineItems((deadlineData as any[]).map(d => ({
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
          })));
        } else {
          setDeadlineItems(MOCK_SCADENZE_INTELLIGENCE);
        }
      } catch {
        setDeadlineItems(MOCK_SCADENZE_INTELLIGENCE);
      }
    };
    fetchData();
  }, []);

  const sortNews = (items: NotiziaIntelligence[]) => {
    return [...items].sort((a, b) => {
      if (sortField === 'data') {
        return sortAsc
          ? new Date(a.dataPubblicazione).getTime() - new Date(b.dataPubblicazione).getTime()
          : new Date(b.dataPubblicazione).getTime() - new Date(a.dataPubblicazione).getTime();
      }
      if (sortField === 'criticita') {
        const order = { strategica: 0, urgente: 1, alta: 2, media: 3, bassa: 4 };
        const diff = (order[a.classifica.criticita] ?? 5) - (order[b.classifica.criticita] ?? 5);
        return sortAsc ? diff : -diff;
      }
      if (sortField === 'categoria') {
        const diff = a.classifica.categoria.localeCompare(b.classifica.categoria);
        return sortAsc ? diff : -diff;
      }
      return 0;
    });
  };

  const sortDeadlines = (items: ScadenzaIntelligence[]) => {
    return [...items].sort((a, b) => {
      if (sortField === 'data') {
        return sortAsc
          ? new Date(a.dataScadenza).getTime() - new Date(b.dataScadenza).getTime()
          : new Date(b.dataScadenza).getTime() - new Date(a.dataScadenza).getTime();
      }
      if (sortField === 'criticita') {
        const order = { strategica: 0, urgente: 1, alta: 2, media: 3, bassa: 4 };
        const diff = (order[a.priorita] ?? 5) - (order[b.priorita] ?? 5);
        return sortAsc ? diff : -diff;
      }
      return 0;
    });
  };

  const filteredNews = sortNews(newsItems).filter(n => {
    const matchSearch = !searchQuery || n.titolo.toLowerCase().includes(searchQuery.toLowerCase()) || n.descrizione.toLowerCase().includes(searchQuery.toLowerCase());
    const matchCat = categoryFilter === 'Tutte' || n.classifica.categoria === categoryFilter;
    return matchSearch && matchCat;
  });

  const filteredDeadlines = sortDeadlines(deadlineItems).filter(d => {
    const matchSearch = !searchQuery || d.titolo.toLowerCase().includes(searchQuery.toLowerCase()) || d.descrizione.toLowerCase().includes(searchQuery.toLowerCase());
    const matchCat = categoryFilter === 'Tutte' || d.tipo === categoryFilter;
    return matchSearch && matchCat;
  });

  const toggleSort = (field: 'data' | 'criticita' | 'categoria') => {
    if (sortField === field) {
      setSortAsc(!sortAsc);
    } else {
      setSortField(field);
      setSortAsc(false);
    }
  };

  const SortIcon = ({ field }: { field: string }) => {
    if (sortField !== field) return <ArrowUpDown size={12} className="opacity-30" />;
    return <ArrowUpDown size={12} className={sortAsc ? 'rotate-180' : ''} />;
  };

  return (
    <div className="min-h-screen bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-24 pb-12">
        {/* Breadcrumb */}
        <div className="mb-6">
          <Link to="/notizie-scadenze" className="text-sm text-brand-blu font-semibold hover:underline">
            &larr; Torna alla dashboard Intelligence
          </Link>
        </div>

        <div className="text-center mb-8">
          <h1 className="text-4xl font-extrabold text-[#0F172A] mb-4 tracking-tight">
            Archivio Intelligence
          </h1>
          <p className="text-gray-600 max-w-2xl mx-auto">
            Storico completo di notizie e scadenze elaborate dal sistema di monitoraggio.
          </p>
        </div>

        {/* View switcher + Search + Filter */}
        <div className="flex flex-col sm:flex-row gap-4 items-center justify-between mb-6">
          <div className="flex gap-1 bg-gray-100/80 rounded-2xl p-1.5 border border-slate-200/60">
            <button onClick={() => setActiveView('notizie')}
              className={`flex items-center gap-2 px-5 py-2.5 rounded-xl text-sm font-semibold transition-all ${
                activeView === 'notizie' ? 'bg-brand-blu text-white shadow-md' : 'text-gray-600 hover:text-brand-blu'
              }`}>
              <Newspaper size={16} /> Notizie ({filteredNews.length})
            </button>
            <button onClick={() => setActiveView('scadenze')}
              className={`flex items-center gap-2 px-5 py-2.5 rounded-xl text-sm font-semibold transition-all ${
                activeView === 'scadenze' ? 'bg-brand-ambra text-white shadow-md' : 'text-gray-600 hover:text-brand-ambra'
              }`}>
              <CalendarClock size={16} /> Scadenze ({filteredDeadlines.length})
            </button>
          </div>

          <div className="flex gap-3 flex-1 max-w-lg">
            <div className="relative flex-1">
              <Search size={16} className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" />
              <input type="text" placeholder="Cerca..." value={searchQuery}
                onChange={e => setSearchQuery(e.target.value)}
                className="w-full pl-9 pr-4 py-2 rounded-2xl border border-slate-200/60 bg-white text-sm focus:ring-2 focus:ring-brand-blu/20 outline-none" />
            </div>
            <select value={categoryFilter} onChange={e => setCategoryFilter(e.target.value)}
              className="px-3 py-2 rounded-2xl border border-slate-200/60 bg-white text-sm focus:ring-2 focus:ring-brand-blu/20 outline-none max-w-[200px]">
              <option value="Tutte">Tutte le categorie</option>
              {CATEGORIE_UTENTE.map(c => <option key={c} value={c}>{c}</option>)}
            </select>
          </div>
        </div>

        {activeView === 'notizie' ? (
          <div className="overflow-x-auto">
            <table className="w-full text-sm">
              <thead>
                <tr className="border-b border-slate-200 text-left text-xs text-gray-500 uppercase tracking-wider">
                  <th className="pb-3 pr-4 font-semibold">Categoria</th>
                  <th className="pb-3 pr-4 font-semibold">Titolo</th>
                  <th className="pb-3 pr-4 font-semibold cursor-pointer select-none" onClick={() => toggleSort('criticita')}>
                    <span className="inline-flex items-center gap-1">Criticità <SortIcon field="criticita" /></span>
                  </th>
                  <th className="pb-3 pr-4 font-semibold">Target</th>
                  <th className="pb-3 pr-4 font-semibold cursor-pointer select-none" onClick={() => toggleSort('data')}>
                    <span className="inline-flex items-center gap-1">Data <SortIcon field="data" /></span>
                  </th>
                </tr>
              </thead>
              <tbody>
                {filteredNews.map(n => (
                  <tr key={n.id} className="border-b border-slate-100 hover:bg-gray-50/50 transition">
                    <td className="py-3 pr-4">
                      <span className={`text-[10px] font-semibold px-2 py-0.5 rounded-full border whitespace-nowrap ${CATEGORIE_UTENTE_COLORS[n.classifica.categoria as CategoriaUtente] || 'bg-gray-100'}`}>
                        {CATEGORIE_ICONE[n.classifica.categoria as CategoriaUtente] || ''} {n.classifica.categoria}
                      </span>
                    </td>
                    <td className="py-3 pr-4">
                      <p className="font-semibold text-[#0F172A]">{n.titolo}</p>
                      <p className="text-xs text-gray-500 line-clamp-1">{n.descrizione}</p>
                    </td>
                    <td className="py-3 pr-4">
                      <span className={`text-[10px] font-semibold px-2 py-0.5 rounded-full ${CRITICALITA_COLORS[n.classifica.criticita]}`}>
                        {n.classifica.criticita}
                      </span>
                    </td>
                    <td className="py-3 pr-4">
                      <div className="flex gap-1 flex-wrap">
                        {n.classifica.target.slice(0, 2).map(t => (
                          <span key={t} className="inline-flex items-center gap-1 text-[10px] px-1.5 py-0.5 rounded-full bg-gray-100 text-gray-500">
                            <Target size={8} />{TARGET_LABELS[t]}
                          </span>
                        ))}
                        {n.classifica.target.length > 2 && (
                          <span className="text-[10px] text-gray-400">+{n.classifica.target.length - 2}</span>
                        )}
                      </div>
                    </td>
                    <td className="py-3 pr-4 text-xs text-gray-500 whitespace-nowrap">
                      <span className="inline-flex items-center gap-1"><Calendar size={10} /> {formatDataItaliana(n.dataPubblicazione)}</span>
                    </td>
                  </tr>
                ))}
                {filteredNews.length === 0 && (
                  <tr><td colSpan={5} className="py-8 text-center text-gray-400 text-sm">Nessuna notizia trovata</td></tr>
                )}
              </tbody>
            </table>
          </div>
        ) : (
          <div className="overflow-x-auto">
            <table className="w-full text-sm">
              <thead>
                <tr className="border-b border-slate-200 text-left text-xs text-gray-500 uppercase tracking-wider">
                  <th className="pb-3 pr-4 font-semibold">Categoria</th>
                  <th className="pb-3 pr-4 font-semibold">Titolo</th>
                  <th className="pb-3 pr-4 font-semibold cursor-pointer select-none" onClick={() => toggleSort('criticita')}>
                    <span className="inline-flex items-center gap-1">Priorità <SortIcon field="criticita" /></span>
                  </th>
                  <th className="pb-3 pr-4 font-semibold">Target</th>
                  <th className="pb-3 pr-4 font-semibold cursor-pointer select-none" onClick={() => toggleSort('data')}>
                    <span className="inline-flex items-center gap-1">Scadenza <SortIcon field="data" /></span>
                  </th>
                </tr>
              </thead>
              <tbody>
                {filteredDeadlines.map(d => {
                  const isExpired = new Date(d.dataScadenza) < new Date();
                  return (
                    <tr key={d.id} className={`border-b border-slate-100 hover:bg-gray-50/50 transition ${isExpired ? 'opacity-50' : ''}`}>
                      <td className="py-3 pr-4">
                        <span className={`text-[10px] font-semibold px-2 py-0.5 rounded-full border whitespace-nowrap ${CATEGORIE_UTENTE_COLORS[d.tipo as CategoriaUtente] || 'bg-gray-100'}`}>
                          {d.tipo}
                        </span>
                      </td>
                      <td className="py-3 pr-4">
                        <p className="font-semibold text-[#0F172A]">{d.titolo}</p>
                        <p className="text-xs text-gray-500 line-clamp-1">{d.descrizione}</p>
                      </td>
                      <td className="py-3 pr-4">
                        <span className={`text-[10px] font-semibold px-2 py-0.5 rounded-full ${CRITICALITA_COLORS[d.priorita]}`}>
                          {d.priorita}
                        </span>
                      </td>
                      <td className="py-3 pr-4">
                        <div className="flex gap-1 flex-wrap">
                          {d.soggettiCoinvolti.slice(0, 2).map(s => (
                            <span key={s} className="inline-flex items-center gap-1 text-[10px] px-1.5 py-0.5 rounded-full bg-gray-100 text-gray-500">
                              <Target size={8} />{TARGET_LABELS[s]}
                            </span>
                          ))}
                          {d.soggettiCoinvolti.length > 2 && (
                            <span className="text-[10px] text-gray-400">+{d.soggettiCoinvolti.length - 2}</span>
                          )}
                        </div>
                      </td>
                      <td className="py-3 pr-4 text-xs whitespace-nowrap">
                        <span className={`inline-flex items-center gap-1 ${isExpired ? 'text-red-400' : 'text-brand-ambra'}`}>
                          <Calendar size={10} /> {formatDataItaliana(d.dataScadenza)}
                          {isExpired && <span className="text-red-500 font-semibold">(scaduta)</span>}
                        </span>
                      </td>
                    </tr>
                  );
                })}
                {filteredDeadlines.length === 0 && (
                  <tr><td colSpan={5} className="py-8 text-center text-gray-400 text-sm">Nessuna scadenza trovata</td></tr>
                )}
              </tbody>
            </table>
          </div>
        )}
      </div>
    </div>
  );
}
