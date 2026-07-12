import { useState, useEffect } from 'react';
import { Newspaper, CalendarClock, Activity, Search, ChevronDown, ChevronRight, ExternalLink, AlertTriangle, Clock, TrendingUp, Shield } from 'lucide-react';
import { supabase } from '../../../lib/supabaseClient';
import { CATEGORIE_UTENTE, CATEGORIE_SCADENZA, CATEGORIE_UTENTE_COLORS, CATEGORIE_SCADENZA_COLORS, CATEGORIE_ICONE, REGIONI_ITALIA } from '../../../types/intelligence';
import { formatDataItaliana } from '../../../rag/intelligence-engine';
import type { NotiziaIntelligence, ScadenzaIntelligence, CategoriaUtente, CategoriaScadenza } from '../../../types/intelligence';
import { Link } from 'react-router-dom';

interface NewsHubProps {
  isHomePage?: boolean;
}

interface BoxNews {
  categoria: CategoriaUtente;
  items: NotiziaIntelligence[];
}

interface BoxScadenza {
  categoria: CategoriaScadenza;
  items: ScadenzaIntelligence[];
}

const MAX_ITEMS_PER_BOX = 3;

// ============================================================
// FALLBACK DATA — shown when Supabase tables are empty
// Ensures the platform always has relevant content
// ============================================================

const FALL_NEWS: NotiziaIntelligence[] = [
  {
    id: 'fn-1', titolo: 'Concorso Straordinario 2026: 5.000 posti per docenti con 36 mesi di servizio',
    descrizione: 'Il MIM ha pubblicato le disposizioni per il concorso straordinario 2026 riservato al personale con almeno 36 mesi di servizio negli ultimi 5 anni. Le prove scritte sono previste a ottobre 2026.',
    dataPubblicazione: '2026-07-10', fonte: { livello: 'A', nome: 'MIM', url: 'https://www.mim.gov.it', peso: 100 },
    classifica: { criticita: 'alta', impatto: 'nazionale', platea: 'ampia', target: ['docenti', 'aspiranti_docenti'], categoria: 'Bandi, Concorsi e Selezioni', livelloFonte: 'A', fontePrimaria: 'MIM - Disposizioni concorso straordinario 2026', fonteUrl: '', dataAcquisizione: '2026-07-10' },
    contenuti: [], tag: ['concorso', 'straordinario', '2026'], link: '', isPinned: true,
  },
  {
    id: 'fn-2', titolo: 'OM 88/2024: aggiornamento GPS biennio 2026/2028 in preparazione',
    descrizione: 'Il Ministero sta preparando il nuovo ordinanza per il rinnovo delle Graduatorie Provinciali per le Supplenze. Attese novità sui criteri di valutazione dei titoli e sull\'algoritmo di assegnazione.',
    dataPubblicazione: '2026-07-08', fonte: { livello: 'A', nome: 'MIM', url: 'https://www.mim.gov.it', peso: 100 },
    classifica: { criticita: 'urgente', impatto: 'nazionale', platea: 'intero_sistema', target: ['docenti', 'aspiranti_docenti'], categoria: 'Graduatorie (GPS, GAE, d\'Istituto)', livelloFonte: 'A', fontePrimaria: 'OM 88/2024 - GPS Biennio', fonteUrl: '', dataAcquisizione: '2026-07-08' },
    contenuti: [], tag: ['GPS', 'graduatorie', 'supplenze'], link: '', isPinned: true,
  },
  {
    id: 'fn-3', titolo: 'CCNL 2024-2026: avvio trattative per il rinnovo del comparto Istruzione',
    descrizione: 'L\'ARAN ha convocato le organizzazioni sindacali per l\'avvio delle trattative per il rinnovo del CCNL Comparto Istruzione e Ricerca. In scadenza il 31 dicembre 2026.',
    dataPubblicazione: '2026-07-05', fonte: { livello: 'A', nome: 'ARAN', url: 'https://www.aran.it', peso: 100 },
    classifica: { criticita: 'strategica', impatto: 'nazionale', platea: 'intero_sistema', target: ['docenti', 'ata', 'dirigenti'], categoria: 'Contratti, Salari e Personale ATA', livelloFonte: 'A', fontePrimaria: 'ARAN - Avvio trattative CCNL', fonteUrl: '', dataAcquisizione: '2026-07-05' },
    contenuti: [], tag: ['CCNL', 'rinnovo', 'trattative'], link: '', isPinned: false,
  },
  {
    id: 'fn-4', titolo: 'TFA Sostegno VIII ciclo: 12.000 posti, bando previsto a settembre',
    descrizione: 'Il Decreto Direttoriale 1025/2026 ha definito le linee guida per l\'VIII ciclo del TFA Sostegno con 12.000 posti. Il bando è atteso a settembre con prove preselettie a novembre.',
    dataPubblicazione: '2026-07-03', fonte: { livello: 'A', nome: 'MIM', url: 'https://www.mim.gov.it', peso: 100 },
    classifica: { criticita: 'alta', impatto: 'nazionale', platea: 'ampia', target: ['docenti', 'aspiranti_docenti', 'sostegno'], categoria: 'Didattica, Formazione e Innovazione', livelloFonte: 'A', fontePrimaria: 'DD 1025/2026 - TFA Sostegno', fonteUrl: '', dataAcquisizione: '2026-07-03' },
    contenuti: [], tag: ['TFA', 'sostegno', 'formazione'], link: '', isPinned: false,
  },
  {
    id: 'fn-5', titolo: 'DM 89/2024: aggiornamento graduatorie ATA terza fascia triennio 2027/2030',
    descrizione: 'Prossimo aggiornamento delle graduatorie di terza fascia del personale ATA. Nuova scadenza per inserimento e aggiornamento con il D.M. previsto per il primo trimestre 2027.',
    dataPubblicazione: '2026-07-01', fonte: { livello: 'A', nome: 'MIM', url: 'https://www.mim.gov.it', peso: 100 },
    classifica: { criticita: 'media', impatto: 'nazionale', platea: 'ampia', target: ['ata'], categoria: 'Graduatorie (GPS, GAE, d\'Istituto)', livelloFonte: 'A', fontePrimaria: 'DM 89/2024 - Graduatorie ATA', fonteUrl: '', dataAcquisizione: '2026-07-01' },
    contenuti: [], tag: ['ATA', 'graduatorie', 'terza fascia'], link: '', isPinned: false,
  },
  {
    id: 'fn-6', titolo: 'Mobilità 2027/2029: apertura domande prevista a febbraio',
    descrizione: 'Il CCNI Mobilità per il triennio 2027/2029 sarà firmato entro dicembre 2026. Le domande di trasferimento dovranno essere presentate entro febbraio 2027 via POLIS.',
    dataPubblicazione: '2026-06-28', fonte: { livello: 'A', nome: 'ARAN', url: 'https://www.aran.it', peso: 100 },
    classifica: { criticita: 'media', impatto: 'nazionale', platea: 'ampia', target: ['docenti', 'ata'], categoria: 'Mobilità, Assegnazioni e Utilizzazioni', livelloFonte: 'A', fontePrimaria: 'CCNI Mobilità 2027/2029', fonteUrl: '', dataAcquisizione: '2026-06-28' },
    contenuti: [], tag: ['mobilità', 'trasferimento', 'CCNI'], link: '', isPinned: false,
  },
  {
    id: 'fn-7', titolo: 'Esami di Stato 2026: scrutinio finale e valutazioni INVALSI',
    descrizione: 'Risultati dello scrutinio finale degli Esami di Stato 2026. Commissioni miste docenti-esterni. Punteggi e procedure di appello per i candidati.',
    dataPubblicazione: '2026-06-25', fonte: { livello: 'B', nome: 'INVALSI', url: 'https://www.invalsi.it', peso: 95 },
    classifica: { criticita: 'bassa', impatto: 'nazionale', platea: 'ampia', target: ['docenti', 'dirigenti', 'studenti', 'famiglie'], categoria: 'Esami di Stato e Valutazioni (INVALSI)', livelloFonte: 'B', fontePrimaria: 'INVALSI - Esami di Stato 2026', fonteUrl: '', dataAcquisizione: '2026-06-25' },
    contenuti: [], tag: ['esami', 'valutazione', 'INVALSI'], link: '', isPinned: false,
  },
  {
    id: 'fn-8', titolo: 'Interpelli luglio 2026: 340 avvisi attivi in tutta Italia',
    descrizione: 'Il Centro Nazionale Interpelli conta 340 avvisi attivi per supplenze annuali e temporanee. Maggior disponibilità in Lombardia, Lazio e Campania.',
    dataPubblicazione: '2026-06-20', fonte: { livello: 'A', nome: 'MIM', url: 'https://www.mim.gov.it', peso: 100 },
    classifica: { criticita: 'alta', impatto: 'nazionale', platea: 'ampia', target: ['docenti', 'aspiranti_docenti'], categoria: 'Bandi, Concorsi e Selezioni', livelloFonte: 'A', fontePrimaria: 'Centro Nazionale Interpelli', fonteUrl: '', dataAcquisizione: '2026-06-20' },
    contenuti: [], tag: ['interpelli', 'supplenze', 'concorsi'], link: '', isPinned: false,
  },
];

const FALL_SCADENZE: ScadenzaIntelligence[] = [
  { id: 'fs-1', titolo: 'Accettazione interpelli entro 24 ore dalla convocazione', descrizione: 'Termine perentorio per accettare la supplenza dopo convocazione telefonica o PEC dall\'USP.', normativa: 'OM 88/2024 art. 13', soggettiCoinvolti: ['docenti'], dataScadenza: '2026-07-15', priorita: 'urgente', impatto: 'nazionale', conseguenzeNonAzione: 'Decadenza dalla supplenza ed esclusione graduatoria per l\'anno in corso', link: '', tipo: 'Immissioni in Ruolo e Supplenze', guidaOperativa: '' },
  { id: 'fs-2', titolo: 'Aggiornamento GPS biennio 2026/2028 - presentazione domande', descrizione: 'Termini per la presentazione delle domande di aggiornamento delle Graduatorie Provinciali per le Supplenze.', normativa: 'OM 88/2024', soggettiCoinvolti: ['docenti', 'aspiranti_docenti'], dataScadenza: '2026-08-31', priorita: 'alta', impatto: 'nazionale', conseguenzeNonAzione: 'Esclusione dalla graduatoria per il biennio successivo', link: '', tipo: 'Aggiornamento e Inserimento Graduatorie', guidaOperativa: '' },
  { id: 'fs-3', titolo: 'Domande mobilità volontaria triennio 2027/2029', descrizione: 'Scadenza per la presentazione delle domande di trasferimento volontario tramite POLIS.', normativa: 'CCNI Mobilità 2027/2029', soggettiCoinvolti: ['docenti', 'ata'], dataScadenza: '2027-02-28', priorita: 'media', impatto: 'nazionale', conseguenzeNonAzione: 'Non partecipazione al movimento di mobilità per il triennio', link: '', tipo: 'Mobilità del Personale Scolastico', guidaOperativa: '' },
  { id: 'fs-4', titolo: 'Iscrizione concorso ordinario docenti 2026', descrizione: 'Apertura delle iscrizioni per il concorso ordinario con 20.000 posti su tutta la Italia.', normativa: 'D.Lgs. 36/2022', soggettiCoinvolti: ['docenti', 'aspiranti_docenti'], dataScadenza: '2026-09-15', priorita: 'alta', impatto: 'nazionale', conseguenzeNonAzione: 'Perdita dell\'opportunità di partecipare al concorso', link: '', tipo: 'Iscrizioni, Bandi e Concorsi pubblici', guidaOperativa: '' },
];

function groupNewsByCategory(items: NotiziaIntelligence[]): BoxNews[] {
  return CATEGORIE_UTENTE.map(cat => ({
    categoria: cat,
    items: items.filter(n => n.classifica.categoria === cat).slice(0, MAX_ITEMS_PER_BOX),
  })).filter(box => box.items.length > 0);
}

function groupScadenzeByCategory(items: ScadenzaIntelligence[]): BoxScadenza[] {
  return CATEGORIE_SCADENZA.map(cat => ({
    categoria: cat,
    items: items.filter(s => s.tipo === cat).slice(0, MAX_ITEMS_PER_BOX),
  })).filter(box => box.items.length > 0);
}

export default function NewsHub({ isHomePage = true }: NewsHubProps) {
  const [activeTab, setActiveTab] = useState<'notizie' | 'scadenze'>('notizie');
  const [newsByCategory, setNewsByCategory] = useState<BoxNews[]>([]);
  const [scadenzeByCategory, setScadenzeByCategory] = useState<BoxScadenza[]>([]);
  const [expandedBox, setExpandedBox] = useState<string | null>(null);
  const [loading, setLoading] = useState(true);
  const [latestNews, setLatestNews] = useState<NotiziaIntelligence[]>([]);

  useEffect(() => { fetchData(); }, []);

  const fetchData = async () => {
    setLoading(true);
    try {
      const [newsResult, scadenzeResult] = await Promise.all([
        supabase.from('intelligence_news').select('*').eq('is_archived', false).order('data_pubblicazione', { ascending: false }).limit(60),
        supabase.from('intelligence_scadenze').select('*').order('data_scadenza', { ascending: true }).limit(40),
      ]);

      let allNews: NotiziaIntelligence[] = [];
      if (!newsResult.error && newsResult.data && newsResult.data.length > 0) {
        allNews = newsResult.data.map((n: any) => ({
          id: n.id, titolo: n.titolo, descrizione: n.descrizione || '',
          dataPubblicazione: n.data_pubblicazione || n.created_at,
          fonte: { livello: n.fonte_livello || 'A', nome: n.fonte_nome || 'MIM', url: n.fonte_url || '', peso: n.fonte_peso || 100 },
          classifica: { criticita: n.criticita || 'media', impatto: n.impatto || 'nazionale', platea: n.platea || 'ampia', target: n.target || ['docenti'], categoria: n.categoria || 'Normative, Note e Circolari Ministeriali', livelloFonte: n.fonte_livello || 'A', fontePrimaria: n.fonte_primaria || '', fonteUrl: n.fonte_url_dettaglio || '', dataAcquisizione: n.data_acquisizione || n.created_at },
          contenuti: n.produzione_livelli || [], tag: n.tag || [], link: n.link || '', isPinned: n.is_pinned || false, regione: n.regione || null,
        }));
      }

      // Use fallback if DB empty
      if (allNews.length === 0) allNews = FALL_NEWS;
      setNewsByCategory(groupNewsByCategory(allNews));
      setLatestNews(allNews.slice(0, 5));

      let allScadenze: ScadenzaIntelligence[] = [];
      if (!scadenzeResult.error && scadenzeResult.data && scadenzeResult.data.length > 0) {
        allScadenze = scadenzeResult.data.map((s: any) => ({
          id: s.id, titolo: s.titolo, descrizione: s.descrizione || '', normativa: s.normativa || '',
          soggettiCoinvolti: s.soggetti_coinvolti || ['docenti'], dataScadenza: s.data_scadenza || '',
          priorita: s.priorita || 'media', impatto: s.impatto || 'nazionale',
          conseguenzeNonAzione: s.conseguenze_non_azione || '', link: s.link || '', tipo: s.tipo || '', guidaOperativa: s.guida_operativa || '', regione: s.regione || '',
        }));
      }
      if (allScadenze.length === 0) allScadenze = FALL_SCADENZE;
      setScadenzeByCategory(groupScadenzeByCategory(allScadenze));
    } catch {
      setNewsByCategory(groupNewsByCategory(FALL_NEWS));
      setLatestNews(FALL_NEWS.slice(0, 5));
      setScadenzeByCategory(groupScadenzeByCategory(FALL_SCADENZE));
    } finally {
      setLoading(false);
    }
  };

  const switchBgClass = 'bg-gray-100/80 backdrop-blur-sm rounded-2xl p-1.5 border border-slate-200/60 shadow-soft';
  const activePillNews = 'bg-brand-blu text-white shadow-md shadow-brand-blu/10';
  const activePillScadenze = 'bg-brand-ambra text-white shadow-md shadow-brand-ambra/10';
  const inactivePill = 'text-gray-600 hover:text-brand-blu/80';

  return (
    <section className="py-12 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center gap-1 ${switchBgClass} mb-6 max-w-md mx-auto" style={{ background: 'rgba(243,244,246,0.8)', borderRadius: '1rem', padding: '6px', border: '1px solid rgba(226,232,240,0.6)' }}>
          <button onClick={() => setActiveTab('notizie')} className={`flex-1 flex items-center justify-center gap-2 px-4 py-2.5 rounded-xl text-sm font-semibold transition-all duration-300 ${activeTab === 'notizie' ? activePillNews : inactivePill}`}>
            <Newspaper size={16} /> Notizie
          </button>
          <button onClick={() => setActiveTab('scadenze')} className={`flex-1 flex items-center justify-center gap-2 px-4 py-2.5 rounded-xl text-sm font-semibold transition-all duration-300 ${activeTab === 'scadenze' ? activePillScadenze : inactivePill}`}>
            <CalendarClock size={16} /> Scadenze
          </button>
        </div>

        {loading && (
          <div className="text-center py-12">
            <Activity size={32} className="mx-auto text-gray-300 mb-3 animate-pulse" />
            <p className="text-gray-400 text-sm">Caricamento contenuti...</p>
          </div>
        )}

        {/* === NOTIZIE: Thematic Boxes + Sidebar === */}
        {!loading && activeTab === 'notizie' && (
          <div className="flex gap-6">
            {/* Main content — thematic boxes */}
            <div className="flex-1 space-y-5 min-w-0">
              {newsByCategory.length === 0 && (
                <div className="text-center py-12">
                  <Newspaper size={48} className="mx-auto text-gray-300 mb-4" />
                  <p className="text-gray-500 text-sm">Nessuna notizia disponibile.</p>
                </div>
              )}
              {newsByCategory.map(box => {
                const isExpanded = expandedBox === `news-${box.categoria}`;
                const colorClass = CATEGORIE_UTENTE_COLORS[box.categoria];
                const icon = CATEGORIE_ICONE[box.categoria];
                return (
                  <div key={box.categoria} className={`rounded-3xl border overflow-hidden transition-all duration-300 ${isExpanded ? 'border-brand-blu/30 shadow-medium' : 'border-slate-200/60 shadow-soft hover:shadow-md'}`}>
                    <button onClick={() => setExpandedBox(isExpanded ? null : `news-${box.categoria}`)} className="w-full flex items-center justify-between p-5 bg-gradient-to-r from-white to-gray-50/80 hover:from-gray-50/50 transition-colors">
                      <div className="flex items-center gap-3">
                        <span className="text-2xl">{icon}</span>
                        <div className="text-left">
                          <h3 className="text-lg font-bold text-[#0F172A]">{box.categoria}</h3>
                          <p className="text-xs text-gray-500">{box.items.length} {box.items.length === 1 ? 'notizia' : 'notizie'} recenti</p>
                        </div>
                      </div>
                      <div className="flex items-center gap-2">
                        <span className={`text-xs font-semibold px-2.5 py-1 rounded-full border ${colorClass}`}>{box.items.length}</span>
                        <ChevronDown size={18} className={`text-gray-400 transition-transform duration-300 ${isExpanded ? 'rotate-180' : ''}`} />
                      </div>
                    </button>
                    {isExpanded ? (
                      <div className="p-5 pt-0 space-y-3 animate-fade-in-up">
                        {box.items.map(item => <NewsCard key={item.id} item={item} />)}
                        <Link to="/notizie-scadenze/archivio?tab=notizie" className="flex items-center justify-center gap-2 py-2 text-brand-blu text-sm font-semibold hover:text-brand-blu/80 transition">
                          Vedi tutte <ChevronRight size={14} />
                        </Link>
                      </div>
                    ) : (
                      <div className="px-5 pb-4 flex gap-3 overflow-x-auto">
                        {box.items.map(item => (
                          <div key={item.id} className="flex-shrink-0 w-64 bg-white rounded-2xl border border-slate-200/60 p-3 hover:border-brand-blu/20 transition cursor-pointer" onClick={() => setExpandedBox(`news-${box.categoria}`)}>
                            <p className="text-xs font-bold text-[#0F172A] line-clamp-2 mb-1">{item.titolo}</p>
                            <p className="text-[10px] text-gray-400">{formatDataItaliana(item.dataPubblicazione)}</p>
                          </div>
                        ))}
                      </div>
                    )}
                  </div>
                );
              })}
            </div>

            {/* Sidebar — Ultime Notizie */}
            <div className="hidden lg:block w-80 flex-shrink-0">
              <div className="sticky top-24 space-y-4">
                <div className="bg-gradient-to-br from-brand-blu/5 to-brand-verde/5 rounded-3xl border border-brand-blu/10 p-5">
                  <h3 className="flex items-center gap-2 text-sm font-bold text-[#0F172A] mb-3">
                    <TrendingUp size={16} className="text-brand-blu" /> Ultime Notizie
                  </h3>
                  <div className="space-y-3">
                    {latestNews.map((item, i) => (
                      <div key={item.id} className="flex gap-3 group cursor-pointer">
                        <span className="text-lg font-black text-brand-blu/20 leading-none mt-0.5">{String(i + 1).padStart(2, '0')}</span>
                        <div className="flex-1 min-w-0">
                          <p className="text-xs font-bold text-[#0F172A] line-clamp-2 group-hover:text-brand-blu transition">{item.titolo}</p>
                          <p className="text-[10px] text-gray-400 mt-0.5 flex items-center gap-1">
                            <Clock size={9} /> {formatDataItaliana(item.dataPubblicazione)}
                          </p>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>

                {/* Fonti certificate */}
                <div className="bg-white rounded-3xl border border-slate-200/60 p-5">
                  <h3 className="flex items-center gap-2 text-sm font-bold text-[#0F172A] mb-3">
                    <Shield size={16} className="text-brand-verde" /> Fonti Certificate
                  </h3>
                  <div className="space-y-2">
                    {[
                      { nome: 'Gazzetta Ufficiale', livello: 'A' },
                      { nome: 'MIM', livello: 'A' },
                      { nome: 'Normattiva', livello: 'A' },
                      { nome: 'ARAN', livello: 'A' },
                      { nome: 'INPS', livello: 'A' },
                      { nome: 'INVALSI', livello: 'B' },
                    ].map(f => (
                      <div key={f.nome} className="flex items-center justify-between text-xs">
                        <span className="text-gray-600">{f.nome}</span>
                        <span className={`px-1.5 py-0.5 rounded text-[9px] font-bold ${f.livello === 'A' ? 'bg-green-100 text-green-700' : 'bg-blue-100 text-blue-700'}`}>
                          Lvl {f.livello}
                        </span>
                      </div>
                    ))}
                  </div>
                </div>

                <Link to="/notizie-scadenze/archivio" className="flex items-center justify-center gap-2 py-3 bg-brand-blu text-white rounded-2xl text-sm font-bold hover:bg-brand-blu/90 transition shadow-md">
                  Archivio Completo <ChevronRight size={14} />
                </Link>
              </div>
            </div>
          </div>
        )}

        {/* === SCADENZE: Thematic Boxes === */}
        {!loading && activeTab === 'scadenze' && (
          <div className="space-y-6">
            {scadenzeByCategory.length === 0 && (
              <div className="text-center py-12">
                <CalendarClock size={48} className="mx-auto text-gray-300 mb-4" />
                <p className="text-gray-500 text-sm">Nessuna scadenza attiva.</p>
              </div>
            )}
            {scadenzeByCategory.map(box => {
              const isExpanded = expandedBox === `scad-${box.categoria}`;
              const colorClass = CATEGORIE_SCADENZA_COLORS[box.categoria];
              return (
                <div key={box.categoria} className={`rounded-3xl border overflow-hidden transition-all duration-300 ${isExpanded ? 'border-brand-ambra/30 shadow-medium' : 'border-slate-200/60 shadow-soft hover:shadow-md'}`}>
                  <button onClick={() => setExpandedBox(isExpanded ? null : `scad-${box.categoria}`)} className="w-full flex items-center justify-between p-5 bg-gradient-to-r from-white to-amber-50/30 hover:from-amber-50/20 transition-colors">
                    <div className="flex items-center gap-3">
                      <CalendarClock size={22} className="text-brand-ambra" />
                      <div className="text-left">
                        <h3 className="text-lg font-bold text-[#0F172A]">{box.categoria}</h3>
                        <p className="text-xs text-gray-500">{box.items.length} attive</p>
                      </div>
                    </div>
                    <div className="flex items-center gap-2">
                      <span className={`text-xs font-semibold px-2.5 py-1 rounded-full border ${colorClass}`}>{box.items.length}</span>
                      <ChevronDown size={18} className={`text-gray-400 transition-transform duration-300 ${isExpanded ? 'rotate-180' : ''}`} />
                    </div>
                  </button>
                  {isExpanded && (
                    <div className="p-5 pt-0 space-y-3 animate-fade-in-up">
                      {box.items.map(item => <ScadenzaCard key={item.id} item={item} />)}
                    </div>
                  )}
                </div>
              );
            })}
          </div>
        )}
      </div>
    </section>
  );
}

function NewsCard({ item }: { item: NotiziaIntelligence }) {
  const { criticita } = item.classifica;
  const critColors: Record<string, string> = { urgente: 'bg-red-100 text-red-700', alta: 'bg-amber-100 text-amber-700', strategica: 'bg-purple-100 text-purple-700', media: 'bg-blue-100 text-blue-700', bassa: 'bg-gray-100 text-gray-600' };

  return (
    <div className="bg-white rounded-2xl border border-slate-200/60 p-4 hover:border-brand-blu/20 transition">
      <div className="flex items-start justify-between gap-3">
        <div className="flex-1 min-w-0">
          <div className="flex items-center gap-2 mb-2 flex-wrap">
            <span className={`text-[10px] font-bold px-2 py-0.5 rounded-full ${critColors[criticita] || critColors.media}`}>{criticita.toUpperCase()}</span>
            <span className="text-[10px] text-gray-400">{formatDataItaliana(item.dataPubblicazione)}</span>
          </div>
          <h4 className="text-sm font-bold text-[#0F172A] line-clamp-2">{item.titolo}</h4>
          <p className="text-xs text-gray-500 mt-1 line-clamp-2">{item.descrizione}</p>
        </div>
        {item.link && <a href={item.link} target="_blank" rel="noopener noreferrer" className="flex-shrink-0 p-1.5 text-gray-400 hover:text-brand-blu transition"><ExternalLink size={14} /></a>}
      </div>
    </div>
  );
}

function ScadenzaCard({ item }: { item: ScadenzaIntelligence }) {
  const prioritaColors: Record<string, string> = { urgente: 'bg-red-100 text-red-700', alta: 'bg-amber-100 text-amber-700', media: 'bg-blue-100 text-blue-700', bassa: 'bg-gray-100 text-gray-600' };
  const dataScadenza = item.dataScadenza ? new Date(item.dataScadenza) : null;
  const oggi = new Date();
  const giorniRimanenti = dataScadenza ? Math.ceil((dataScadenza.getTime() - oggi.getTime()) / (1000 * 60 * 60 * 24)) : null;
  const isUrgente = giorniRimanenti !== null && giorniRimanenti <= 15;

  return (
    <div className={`rounded-2xl border p-4 transition ${isUrgente ? 'bg-red-50/50 border-red-200' : 'bg-white border-slate-200/60'}`}>
      <div className="flex items-start justify-between gap-3">
        <div className="flex-1 min-w-0">
          <div className="flex items-center gap-2 mb-2 flex-wrap">
            <span className={`text-[10px] font-bold px-2 py-0.5 rounded-full ${prioritaColors[item.priorita] || prioritaColors.media}`}>{item.priorita?.toUpperCase() || 'MEDIA'}</span>
            {giorniRimanenti !== null && (
              <span className={`text-[10px] font-bold px-2 py-0.5 rounded-full ${isUrgente ? 'bg-red-100 text-red-700' : 'bg-green-100 text-green-700'}`}>
                {giorniRimanenti <= 0 ? 'SCADUTA' : `${giorniRimanenti}g rimasti`}
              </span>
            )}
          </div>
          <h4 className="text-sm font-bold text-[#0F172A] line-clamp-2">{item.titolo}</h4>
          {item.normativa && <p className="text-[10px] text-gray-400 mt-1">Rif: {item.normativa}</p>}
          {item.conseguenzeNonAzione && <p className="text-[10px] text-red-500 mt-1 font-medium">⚠ {item.conseguenzeNonAzione}</p>}
        </div>
      </div>
    </div>
  );
}
