import { useState, useCallback, useEffect } from 'react';
import { useSearchParams } from 'react-router-dom';
import { Search, Filter, Mail, BellRing, Lock, Unlock, CreditCard, Loader2, CheckCircle, X, ExternalLink } from 'lucide-react';
import { useAuth } from '../components/foundation/AuthContext';
import LoginModal from '../components/foundation/LoginModal';
import { supabase } from '../lib/supabaseClient';
import { USP_PROVINCE } from '../data/usp-italiane';
import type { Bando } from '../types/database';

const PROVINCE = USP_PROVINCE.map(p => p.sigla);

const CLASSI_CONCORSO = [
  'A-01', 'A-02', 'A-03', 'A-04', 'A-05', 'A-06', 'A-07', 'A-08', 'A-09', 'A-10',
  'A-11', 'A-12', 'A-13', 'A-14', 'A-15', 'A-16', 'A-17', 'A-18', 'A-19', 'A-20',
  'A-21', 'A-22', 'A-23', 'A-24', 'A-25', 'A-26', 'A-27', 'A-28', 'A-29', 'A-30',
  'A-31',
];

function deriveStato(dataScadenza: string): 'aperto' | 'scaduto' {
  return new Date(dataScadenza) > new Date() ? 'aperto' : 'scaduto';
}

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

  const [tuttiInterpelli, setTuttiInterpelli] = useState<Bando[]>([]);
  const [fetching, setFetching] = useState(true);
  const [filtroProvincia, setFiltroProvincia] = useState('');
  const [filtroClasse, setFiltroClasse] = useState('');
  const [filtroTipoPosto, setFiltroTipoPosto] = useState('');
  const [risultati, setRisultati] = useState<Bando[]>([]);
  const [mostraRisultati, setMostraRisultati] = useState(false);
  const [pagina, setPagina] = useState(1);
  const risultatiPerPagina = 10;

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
        if (error) throw error;
        setTuttiInterpelli(data || []);
      } catch {
        setTuttiInterpelli([]);
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
      if (filtroProvincia) filtered = filtered.filter(r => r.provincia === filtroProvincia);
      if (filtroClasse) filtered = filtered.filter(r => r.categoria === filtroClasse);
      if (filtroTipoPosto) filtered = filtered.filter(r => r.tipo === filtroTipoPosto);
      setRisultati(filtered);
      setMostraRisultati(true);
      setPagina(1);
      setLoading(false);
    }, 400);
  }, [canSearch, isAuthenticated, filtroProvincia, filtroClasse, filtroTipoPosto, tuttiInterpelli, searchCount]);

  const paginatedResults = risultati.slice(0, pagina * risultatiPerPagina);

  const statoBadge: Record<string, string> = {
    aperto: 'bg-green-100 text-green-700',
    scaduto: 'bg-red-100 text-red-700',
  };

  return (
    <div className="min-h-screen py-8 px-4">
      <div className="max-w-5xl mx-auto">
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
          <p className="text-gray-600 text-sm">Ricerca disponibilità di supplenze in tempo reale da tutti gli USP ({USP_PROVINCE.length} province)</p>
        </div>

        <div className="bg-white/70 backdrop-blur-md rounded-3xl shadow-soft border border-slate-200/60 p-6 sm:p-8 mb-8">
          <h2 className="text-xl font-semibold text-brand-blu mb-6 flex items-center gap-2">
            <Filter size={20} /> Filtri di Ricerca
          </h2>
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Provincia / USP</label>
              <select value={filtroProvincia} onChange={e => setFiltroProvincia(e.target.value)}
                className="w-full border border-slate-200 rounded-2xl px-4 py-3 focus:ring-2 focus:ring-brand-blu transition bg-white text-sm">
                <option value="">Tutte le {USP_PROVINCE.length} province</option>
                {USP_PROVINCE.map(p => (
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
              <label className="block text-sm font-medium text-gray-700 mb-1">Tipologia Posto</label>
              <select value={filtroTipoPosto} onChange={e => setFiltroTipoPosto(e.target.value)}
                className="w-full border border-slate-200 rounded-2xl px-4 py-3 focus:ring-2 focus:ring-brand-blu transition bg-white text-sm">
                <option value="">Tutti i tipi</option>
                <option value="comune">Posto Comune</option>
                <option value="sostegno">Sostegno</option>
                <option value="ata">ATA</option>
              </select>
            </div>
          </div>

          <div className="mt-6 flex items-center justify-between">
            <p className="text-xs text-gray-500">
              {isAuthenticated ? 'Ricerca illimitata' : `Ricerche gratuite rimaste: ${Math.max(0, 3 - searchCount)} / 3`}
            </p>
            <button onClick={cerca} disabled={loading || !canSearch}
              className="px-8 py-3 bg-gradient-to-r from-brand-blu to-brand-verde text-white rounded-2xl font-semibold hover:opacity-90 disabled:opacity-50 transition flex items-center gap-2 shadow-soft">
              {loading ? <Loader2 size={18} className="animate-spin" /> : <Search size={18} />}
              {loading ? 'Ricerca in corso...' : `Cerca Interpelli`}
            </button>
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
                {risultati.length} interpelli trovati
              </h2>
              {!isPremium && (
                <button onClick={() => setShowPremiumModal(true)}
                  className="flex items-center gap-2 px-4 py-2 bg-brand-ambra text-white rounded-2xl text-sm font-semibold hover:bg-brand-ambra/90 transition">
                  <BellRing size={16} /> Premium
                </button>
              )}
            </div>

            <div className="space-y-3">
              {paginatedResults.map(r => {
                const stato = deriveStato(r.data_scadenza);
                const isScaduto = stato === 'scaduto';
                return (
                  <div key={r.id} className={`p-4 rounded-2xl border transition-all ${isScaduto ? 'border-slate-200 bg-gray-50' : 'border-slate-200/60 hover:border-brand-blu/30 bg-white/50'}`}>
                    <div className="flex items-start justify-between gap-3">
                      <div className="flex-1 min-w-0">
                        <div className="flex items-center gap-2 mb-1.5 flex-wrap">
                          <span className={`text-xs font-semibold px-2 py-0.5 rounded-full ${statoBadge[stato]}`}>{stato}</span>
                          <span className="text-xs font-medium text-brand-blu">{r.provincia || r.ente}</span>
                          <span className="text-xs bg-gray-100 text-gray-600 px-2 py-0.5 rounded-full">{r.tipo}</span>
                        </div>
                        <h3 className="font-semibold text-[#0F172A] text-sm">{r.titolo}</h3>
                        <p className="text-xs text-gray-500 mt-1">
                          {r.categoria ? <>Classe: <strong>{r.categoria}</strong> | </> : ''}
                          Pubb: {r.data_pubblicazione?.split('T')[0]} | Scad: {r.data_scadenza?.split('T')[0]}
                        </p>
                      </div>
                      <div className="shrink-0">
                        {isScaduto || !isPremium ? (
                          <button disabled className="p-2 bg-gray-100 text-gray-400 rounded-xl cursor-not-allowed" title="Solo Premium">
                            <Lock size={16} />
                          </button>
                        ) : (
                          <a href={r.link || '#'} target="_blank" rel="noopener noreferrer"
                            className="p-2 bg-brand-verde/10 text-brand-verde rounded-xl hover:bg-brand-verde/20 transition inline-block" title="Candidati">
                            <ExternalLink size={16} />
                          </a>
                        )}
                      </div>
                    </div>
                  </div>
                );
              })}
            </div>

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
            <p className="text-gray-400 text-xs mt-1">Dati da tutti gli {USP_PROVINCE.length} Uffici Scolastici Provinciali d'Italia</p>
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
