import { useState, useCallback, useEffect, useMemo } from 'react';
import { useSearchParams } from 'react-router-dom';
import {
  Search, Filter, Mail, BellRing, Lock, Unlock, CreditCard, Loader2,
  CheckCircle, X, ExternalLink, MapPin, Calendar, Users, BookOpen,
  ChevronDown, ChevronUp, AlertCircle, Building2, Clock,
} from 'lucide-react';
import { useAuth } from '../components/foundation/AuthContext';
import LoginModal from '../components/foundation/LoginModal';
import { supabase } from '../lib/supabaseClient';
import { USP_PROVINCE } from '../data/usp-italiane';
import {
  INTERPELLI_UFFICIALI,
  type InterpelloUfficiale,
} from '../data/interpelli-ufficiali';

type Interpello = InterpelloUfficiale;

function deriveStato(dataScadenza: string): 'aperto' | 'scaduto' {
  return new Date(dataScadenza) > new Date() ? 'aperto' : 'scaduto';
}

function daysUntil(dateStr: string): number {
  const now = new Date();
  const target = new Date(dateStr);
  return Math.ceil((target.getTime() - now.getTime()) / (1000 * 60 * 60 * 24));
}

const ORDINI_SCUOLA = [...new Set(INTERPELLI_UFFICIALI.map(i => i.ordineScuola))].sort();
const TIPI_CONTRATTO = [...new Set(INTERPELLI_UFFICIALI.map(i => i.tipoContratto))].sort();
const PROVINCE_DATA = [...new Set(INTERPELLI_UFFICIALI.map(i => i.provincia))].sort();
const CLASSI_CONCORSO = [...new Set(INTERPELLI_UFFICIALI.map(i => i.classeConcorso))].sort();

export default function InterpelliPage() {
  const { user, isAuthenticated, refreshProfile } = useAuth();
  const [searchParams, setSearchParams] = useSearchParams();
  const [showLogin, setShowLogin] = useState(false);
  const [searchCount, setSearchCount] = useState(0);
  const [showPremiumModal, setShowPremiumModal] = useState(false);
  const [loading, setLoading] = useState(false);
  const [checkoutLoading, setCheckoutLoading] = useState(false);
  const [subscriptionSuccess, setSubscriptionSuccess] = useState(false);
  const [checkoutError, setCheckoutError] = useState('');

  const [tuttiInterpelli, setTuttiInterpelli] = useState<Interpello[]>([]);
  const [fetching, setFetching] = useState(true);
  const [filtroProvincia, setFiltroProvincia] = useState('');
  const [filtroClasse, setFiltroClasse] = useState('');
  const [filtroOrdine, setFiltroOrdine] = useState('');
  const [filtroTipoContratto, setFiltroTipoContratto] = useState('');
  const [searchQuery, setSearchQuery] = useState('');
  const [risultati, setRisultati] = useState<Interpello[]>([]);
  const [mostraRisultati, setMostraRisultati] = useState(false);
  const [pagina, setPagina] = useState(1);
  const [expandedId, setExpandedId] = useState<string | null>(null);
  const risultatiPerPagina = 20;

  useEffect(() => {
    const sid = searchParams.get('session_id');
    if (sid) {
      setSubscriptionSuccess(true);
      setSearchParams({}, { replace: true });
      refreshProfile();
      const timer = setTimeout(() => setSubscriptionSuccess(false), 8000);
      return () => clearTimeout(timer);
    }
  }, [searchParams, setSearchParams, refreshProfile]);

  useEffect(() => {
    const fetchData = async () => {
      setFetching(true);
      try {
        const { data, error } = await supabase
          .from('interpelli_nazionali')
          .select('*')
          .order('data_scadenza', { ascending: true })
          .limit(200);

        const supabaseItems: Interpello[] = (error || !data) ? [] : data.map((r: any) => ({
          id: `SUP-${r.id}`,
          titolo: r.titolo || 'Interpello USP',
          descrizione: r.descrizione || r.titolo || '',
          provincia: r.provincia || '',
          regione: '',
          classeConcorso: r.categoria || '',
          ordineScuola: '',
          tipoContratto: (r.tipo || 'Supplenza temporanea') as Interpello['tipoContratto'],
          dataPubblicazione: r.data_pubblicazione || '',
          scadenza: r.data_scadenza || '',
          postiDisponibili: 0,
          requisiti: [],
          fonte: r.ente || 'USP',
          fonteUrl: r.link || '',
          stato: deriveStato(r.data_scadenza) === 'aperto' ? 'attivo' : 'scaduto',
        }));

        const officialIds = new Set(INTERPELLI_UFFICIALI.map(i => `${i.provincia}-${i.classeConcorso}-${i.scadenza}`));
        const uniqueSupabase = supabaseItems.filter(
          s => !officialIds.has(`${s.provincia}-${s.classeConcorso}-${s.scadenza}`)
        );

        setTuttiInterpelli([...INTERPELLI_UFFICIALI, ...uniqueSupabase]);
      } catch {
        setTuttiInterpelli([...INTERPELLI_UFFICIALI]);
      } finally {
        setFetching(false);
      }
    };
    fetchData();
  }, []);

  const canSearch = isAuthenticated ? true : searchCount < 3;
  const isPremium = user?.is_premium || false;

  const handleCheckout = useCallback(async () => {
    if (!isAuthenticated) { setShowLogin(true); return; }
    setCheckoutLoading(true);
    setCheckoutError('');
    try {
      const { data, error } = await supabase.functions.invoke('create-checkout-session', {
        body: { user_id: user!.id },
      });
      if (error) throw new Error(error.message);
      if (data?.url) {
        window.location.href = data.url;
      } else {
        throw new Error('URL checkout non ricevuto');
      }
    } catch (err: any) {
      setCheckoutError(err.message || 'Errore durante l\'attivazione. Riprova più tardi.');
    } finally {
      setCheckoutLoading(false);
    }
  }, [isAuthenticated, user]);

  const cerca = useCallback(() => {
    if (!canSearch) {
      if (!isAuthenticated) setShowLogin(true);
      return;
    }
    setLoading(true);
    setSearchCount(prev => prev + 1);
    setTimeout(() => {
      let filtered = [...tuttiInterpelli];

      if (searchQuery.trim()) {
        const q = searchQuery.toLowerCase();
        filtered = filtered.filter(r =>
          r.titolo.toLowerCase().includes(q) ||
          r.descrizione.toLowerCase().includes(q) ||
          r.classeConcorso.toLowerCase().includes(q) ||
          r.provincia.toLowerCase().includes(q) ||
          r.regione.toLowerCase().includes(q) ||
          r.fonte.toLowerCase().includes(q)
        );
      }

      if (filtroProvincia) filtered = filtered.filter(r => r.provincia === filtroProvincia);
      if (filtroClasse) filtered = filtered.filter(r => r.classeConcorso === filtroClasse);
      if (filtroOrdine) filtered = filtered.filter(r => r.ordineScuola === filtroOrdine);
      if (filtroTipoContratto) filtered = filtered.filter(r => r.tipoContratto === filtroTipoContratto);

      filtered.sort((a, b) => new Date(a.scadenza).getTime() - new Date(b.scadenza).getTime());

      setRisultati(filtered);
      setMostraRisultati(true);
      setPagina(1);
      setLoading(false);
    }, 300);
  }, [canSearch, isAuthenticated, filtroProvincia, filtroClasse, filtroOrdine, filtroTipoContratto, tuttiInterpelli, searchQuery, searchCount]);

  const paginatedResults = risultati.slice(0, pagina * risultatiPerPagina);

  const stats = useMemo(() => {
    const attivi = tuttiInterpelli.filter(i => i.stato === 'attivo');
    const posti = attivi.reduce((sum, i) => sum + i.postiDisponibili, 0);
    const provice = new Set(attivi.map(i => i.provincia)).size;
    return { attivi: attivi.length, posti, provice };
  }, [tuttiInterpelli]);

  return (
    <div className="min-h-screen py-8 px-4">
      <div className="max-w-6xl mx-auto">
        {subscriptionSuccess && (
          <div className="mb-6 p-4 bg-green-50 border border-green-200 rounded-2xl flex items-center gap-3 animate-fade-in-up">
            <CheckCircle size={20} className="text-green-600 flex-shrink-0" />
            <div>
              <p className="font-semibold text-green-800">Abbonamento attivato con successo!</p>
              <p className="text-sm text-green-600">Ora hai accesso illimitato a tutti gli interpelli.</p>
            </div>
            <button onClick={() => setSubscriptionSuccess(false)} className="ml-auto p-1 hover:bg-green-100 rounded-full">
              <X size={16} className="text-green-600" />
            </button>
          </div>
        )}

        <div className="text-center mb-8">
          <h1 className="text-3xl font-bold text-[#0F172A] mb-2">Centro Nazionale Interpelli</h1>
          <p className="text-gray-600 text-sm">
            Ricerca disponibilità di supplenze da tutti gli Uffici Scolastici Provinciali d'Italia
          </p>
          {!fetching && (
            <div className="flex items-center justify-center gap-6 mt-4 text-xs text-gray-500">
              <span className="flex items-center gap-1.5">
                <span className="w-2 h-2 rounded-full bg-green-500" />
                {stats.attivi} interpelli attivi
              </span>
              <span className="flex items-center gap-1.5">
                <Users size={12} /> {stats.posti} posti disponibili
              </span>
              <span className="flex items-center gap-1.5">
                <MapPin size={12} /> {stats.provice} province coperte
              </span>
            </div>
          )}
        </div>

        <div className="bg-white/70 backdrop-blur-md rounded-3xl shadow-soft border border-slate-200/60 p-6 sm:p-8 mb-8">
          <h2 className="text-xl font-semibold text-brand-blu mb-6 flex items-center gap-2">
            <Filter size={20} /> Filtri di Ricerca
          </h2>

          <div className="mb-4">
            <label className="block text-sm font-medium text-gray-700 mb-1">Cerca per testo</label>
            <div className="relative">
              <Search size={16} className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" />
              <input
                type="text"
                placeholder="Titolo, materia, scuola, regione..."
                value={searchQuery}
                onChange={e => setSearchQuery(e.target.value)}
                onKeyDown={e => e.key === 'Enter' && cerca()}
                className="w-full pl-9 pr-4 py-3 border border-slate-200 rounded-2xl focus:ring-2 focus:ring-brand-blu transition bg-white text-sm outline-none"
              />
            </div>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Provincia / USP</label>
              <select value={filtroProvincia} onChange={e => setFiltroProvincia(e.target.value)}
                className="w-full border border-slate-200 rounded-2xl px-4 py-3 focus:ring-2 focus:ring-brand-blu transition bg-white text-sm">
                <option value="">Tutte le province ({PROVINCE_DATA.length})</option>
                {USP_PROVINCE.filter(p => PROVINCE_DATA.includes(p.sigla)).map(p => (
                  <option key={p.sigla} value={p.sigla}>{p.sigla} — {p.nome} ({p.regione})</option>
                ))}
              </select>
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Classe di Concorso</label>
              <select value={filtroClasse} onChange={e => setFiltroClasse(e.target.value)}
                className="w-full border border-slate-200 rounded-2xl px-4 py-3 focus:ring-2 focus:ring-brand-blu transition bg-white text-sm">
                <option value="">Tutte le classi</option>
                {CLASSI_CONCORSO.map(c => <option key={c} value={c}>{c}</option>)}
              </select>
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Ordine Scuola</label>
              <select value={filtroOrdine} onChange={e => setFiltroOrdine(e.target.value)}
                className="w-full border border-slate-200 rounded-2xl px-4 py-3 focus:ring-2 focus:ring-brand-blu transition bg-white text-sm">
                <option value="">Tutti gli ordini</option>
                {ORDINI_SCUOLA.map(o => <option key={o} value={o}>{o}</option>)}
              </select>
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Tipo Contratto</label>
              <select value={filtroTipoContratto} onChange={e => setFiltroTipoContratto(e.target.value)}
                className="w-full border border-slate-200 rounded-2xl px-4 py-3 focus:ring-2 focus:ring-brand-blu transition bg-white text-sm">
                <option value="">Tutti i tipi</option>
                {TIPI_CONTRATTO.map(t => <option key={t} value={t}>{t}</option>)}
              </select>
            </div>
          </div>

          <div className="mt-6 flex items-center justify-between">
            <p className="text-xs text-gray-500">
              {isAuthenticated ? 'Ricerca illimitata' : `Ricerche gratuite rimaste: ${Math.max(0, 3 - searchCount)} / 3`}
            </p>
            <div className="flex items-center gap-3">
              {(searchQuery || filtroProvincia || filtroClasse || filtroOrdine || filtroTipoContratto) && (
                <button onClick={() => { setSearchQuery(''); setFiltroProvincia(''); setFiltroClasse(''); setFiltroOrdine(''); setFiltroTipoContratto(''); setMostraRisultati(false); }}
                  className="px-4 py-3 bg-gray-100 text-gray-600 rounded-2xl text-sm font-medium hover:bg-gray-200 transition">
                  Resetta filtri
                </button>
              )}
              <button onClick={cerca} disabled={loading || !canSearch}
                className="px-8 py-3 bg-gradient-to-r from-brand-blu to-brand-verde text-white rounded-2xl font-semibold hover:opacity-90 disabled:opacity-50 transition flex items-center gap-2 shadow-soft">
                {loading ? <Loader2 size={18} className="animate-spin" /> : <Search size={18} />}
                {loading ? 'Ricerca in corso...' : 'Cerca Interpelli'}
              </button>
            </div>
          </div>

          {!isAuthenticated && searchCount >= 3 && (
            <div className="mt-4 p-4 bg-amber-50 rounded-2xl border border-amber-200">
              <p className="text-amber-800 text-sm font-medium flex items-center gap-2">
                <Lock size={16} /> Limite raggiunto. <button onClick={() => setShowLogin(true)} className="underline font-bold">Accedi</button> per ricerche illimitate.
              </p>
            </div>
          )}
        </div>

        {mostraRisultati && (
          <div className="bg-white/70 backdrop-blur-md rounded-3xl shadow-soft border border-slate-200/60 p-6 sm:p-8">
            <div className="flex items-center justify-between mb-6">
              <h2 className="text-xl font-semibold text-brand-blu">
                {risultati.length} interpello{risultati.length !== 1 ? 'i' : ''} trovato{risultati.length !== 1 ? 'i' : ''}
              </h2>
              {!isPremium && (
                <button onClick={() => setShowPremiumModal(true)}
                  className="flex items-center gap-2 px-4 py-2 bg-brand-ambra text-white rounded-2xl text-sm font-semibold hover:bg-brand-ambra/90 transition">
                  <BellRing size={16} /> Premium
                </button>
              )}
            </div>

            {risultati.length === 0 ? (
              <div className="text-center py-16">
                <AlertCircle size={48} className="text-gray-200 mx-auto mb-4" />
                <p className="text-gray-500 text-sm">Nessun interpello trovato con i filtri selezionati</p>
                <p className="text-gray-400 text-xs mt-1">Prova a modificare i criteri di ricerca</p>
              </div>
            ) : (
              <div className="space-y-3">
                {paginatedResults.map(r => {
                  const stato = deriveStato(r.scadenza);
                  const isScaduto = stato === 'scaduto';
                  const isExpanded = expandedId === r.id;
                  const giorni = daysUntil(r.scadenza);
                  const isUrgente = !isScaduto && giorni <= 7 && giorni >= 0;

                  return (
                    <div key={r.id}
                      className={`p-4 sm:p-5 rounded-2xl border transition-all ${isScaduto ? 'border-slate-200 bg-gray-50 opacity-75' : 'border-slate-200/60 hover:border-brand-blu/30 bg-white/80 hover:shadow-sm'}`}>
                      <div className="flex items-start justify-between gap-3">
                        <div className="flex-1 min-w-0">
                          <div className="flex items-center gap-2 mb-1.5 flex-wrap">
                            <span className={`text-xs font-semibold px-2.5 py-0.5 rounded-full ${isScaduto ? 'bg-red-100 text-red-700' : isUrgente ? 'bg-amber-100 text-amber-700' : 'bg-green-100 text-green-700'}`}>
                              {isScaduto ? 'Scaduto' : isUrgente ? `Scade tra ${giorni}gg` : 'Attivo'}
                            </span>
                            <span className="text-xs font-medium text-brand-blu flex items-center gap-1">
                              <MapPin size={11} /> {r.provincia}
                            </span>
                            <span className="text-xs bg-gray-100 text-gray-600 px-2 py-0.5 rounded-full">{r.tipoContratto}</span>
                            {r.postiDisponibili > 0 && (
                              <span className="text-xs bg-blue-50 text-blue-600 px-2 py-0.5 rounded-full flex items-center gap-1">
                                <Users size={10} /> {r.postiDisponibili} posto{r.postiDisponibili > 1 ? 'i' : ''}
                              </span>
                            )}
                          </div>

                          <h3 className="font-semibold text-[#0F172A] text-sm">{r.titolo}</h3>

                          <div className="flex items-center gap-3 mt-1.5 text-xs text-gray-500 flex-wrap">
                            <span className="flex items-center gap-1">
                              <BookOpen size={11} /> {r.classeConcorso}
                            </span>
                            {r.ordineScuola && (
                              <span className="flex items-center gap-1">
                                <Building2 size={11} /> {r.ordineScuola}
                              </span>
                            )}
                            <span className="flex items-center gap-1">
                              <Calendar size={11} /> Pubb: {new Date(r.dataPubblicazione).toLocaleDateString('it-IT')}
                            </span>
                            <span className="flex items-center gap-1">
                              <Clock size={11} /> Scad: {new Date(r.scadenza).toLocaleDateString('it-IT')}
                            </span>
                          </div>

                          <div className="flex items-center gap-1 mt-1.5 text-xs text-gray-400">
                            <Building2 size={11} />
                            <span className="truncate">{r.fonte}</span>
                          </div>
                        </div>

                        <div className="shrink-0 flex items-center gap-2">
                          <button onClick={() => setExpandedId(isExpanded ? null : r.id)}
                            className="p-2 bg-gray-100 text-gray-500 rounded-xl hover:bg-gray-200 transition"
                            title="Dettagli">
                            {isExpanded ? <ChevronUp size={16} /> : <ChevronDown size={16} />}
                          </button>
                          {!isScaduto && r.fonteUrl && (
                            <a href={r.fonteUrl} target="_blank" rel="noopener noreferrer"
                              className="p-2 bg-brand-verde/10 text-brand-verde rounded-xl hover:bg-brand-verde/20 transition inline-block"
                              title="Vai alla fonte USP">
                              <ExternalLink size={16} />
                            </a>
                          )}
                          {isScaduto && (
                            <button disabled className="p-2 bg-gray-100 text-gray-300 rounded-xl cursor-not-allowed" title="Scaduto">
                              <Lock size={16} />
                            </button>
                          )}
                        </div>
                      </div>

                      {isExpanded && (
                        <div className="mt-4 pt-4 border-t border-slate-100 space-y-3">
                          <p className="text-sm text-gray-600 leading-relaxed">{r.descrizione}</p>

                          {r.requisiti.length > 0 && (
                            <div>
                              <h4 className="text-xs font-semibold text-gray-700 mb-2 uppercase tracking-wide">Requisiti</h4>
                              <ul className="space-y-1.5">
                                {r.requisiti.map((req, idx) => (
                                  <li key={idx} className="flex items-start gap-2 text-xs text-gray-600">
                                    <CheckCircle size={12} className="text-brand-verde mt-0.5 flex-shrink-0" />
                                    {req}
                                  </li>
                                ))}
                              </ul>
                            </div>
                          )}

                          <div className="flex flex-wrap gap-2">
                            {r.fonteUrl && (
                              <a href={r.fonteUrl} target="_blank" rel="noopener noreferrer"
                                className="inline-flex items-center gap-2 px-4 py-2 bg-brand-blu/10 text-brand-blu rounded-2xl text-xs font-semibold hover:bg-brand-blu/20 transition">
                                <ExternalLink size={12} /> Sito Ufficiale USP
                              </a>
                            )}
                            <span className="inline-flex items-center gap-2 px-4 py-2 bg-gray-100 text-gray-500 rounded-2xl text-xs">
                              <MapPin size={12} /> {r.regione || 'N/D'} — {r.provincia}
                            </span>
                          </div>
                        </div>
                      )}
                    </div>
                  );
                })}
              </div>
            )}

            {pagina * risultatiPerPagina < risultati.length && (
              <div className="text-center mt-6">
                <button onClick={() => setPagina(p => p + 1)}
                  className="px-6 py-2 bg-white border border-slate-200 rounded-2xl text-brand-blu font-medium hover:border-brand-blu/30 transition text-sm">
                  Carica più ({risultati.length - pagina * risultatiPerPagina} rimanenti)
                </button>
              </div>
            )}
          </div>
        )}

        {!mostraRisultati && !fetching && (
          <div className="text-center py-16">
            <Search size={48} className="text-gray-200 mx-auto mb-4" />
            <p className="text-gray-500 text-sm">Seleziona i filtri e cerca per visualizzare gli interpelli attivi</p>
            <p className="text-gray-400 text-xs mt-1">Dati aggregati da {INTERPELLI_UFFICIALI.length} interpelli ufficiali + Supabase</p>
          </div>
        )}
      </div>

      {showPremiumModal && (
        <div className="fixed inset-0 z-50 bg-black/30 backdrop-blur-sm flex items-center justify-center p-4" onClick={() => setShowPremiumModal(false)}>
          <div className="bg-white rounded-3xl max-w-md w-full shadow-2xl border border-slate-200/60 p-6" onClick={e => e.stopPropagation()}>
            <div className="flex items-center justify-between mb-4">
              <h3 className="text-xl font-bold text-[#0F172A]">Abbonamento Premium</h3>
              <button onClick={() => setShowPremiumModal(false)} className="p-1 hover:bg-gray-100 rounded-xl transition">
                <X size={20} className="text-gray-500" />
              </button>
            </div>
            <div className="space-y-4">
              <div className="p-4 bg-brand-ambra/5 rounded-2xl border border-brand-ambra/20 text-center">
                <p className="text-3xl font-extrabold text-brand-ambra">€4,99</p>
                <p className="text-sm text-gray-500">/mese — disdici quando vuoi</p>
              </div>
              <ul className="space-y-3">
                {[
                  'Notifica email immediata per ogni nuovo interpello',
                  'Filtri per provincia, classe e tipo posto',
                  'Link di candidatura sbloccati',
                  'Ricerche illimitate da tutti gli USP',
                  'Promemoria 48h prima della scadenza',
                ].map((v, i) => (
                  <li key={i} className="flex items-start gap-2 text-sm text-gray-700">
                    <CheckCircle size={16} className="text-brand-verde mt-0.5 flex-shrink-0" />
                    {v}
                  </li>
                ))}
              </ul>
              <button onClick={handleCheckout} disabled={checkoutLoading}
                className="w-full py-3 bg-gradient-to-r from-brand-ambra to-brand-oro text-white rounded-2xl font-bold hover:opacity-90 disabled:opacity-60 transition flex items-center justify-center gap-2">
                {checkoutLoading ? <Loader2 size={18} className="animate-spin" /> : <CreditCard size={18} />}
                {checkoutLoading ? 'Reindirizzamento...' : 'Attiva — €4,99/mese'}
              </button>
              {checkoutError && <p className="text-sm text-red-600 text-center">{checkoutError}</p>}
            </div>
          </div>
        </div>
      )}

      {showLogin && <LoginModal onClose={() => setShowLogin(false)} />}
    </div>
  );
}
