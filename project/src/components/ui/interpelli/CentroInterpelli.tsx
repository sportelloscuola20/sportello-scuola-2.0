import { useState, useCallback } from 'react';
import { Search, Filter, BellRing, Lock, Unlock, Loader2, ExternalLink } from 'lucide-react';
import { useAuth } from '../../foundation/AuthContext';
import LoginModal from '../../foundation/LoginModal';
import type { InterpelloNazionale } from '../../../types/database';

const PROVINCE = ['AG', 'AL', 'AN', 'AO', 'AP', 'AQ', 'AR', 'AT', 'AV', 'BA', 'BG', 'BI', 'BL', 'BN', 'BO', 'BR', 'BS', 'BT', 'BZ', 'CA', 'CB', 'CE', 'CH', 'CL', 'CN', 'CO', 'CR', 'CS', 'CT', 'CZ', 'EN', 'FC', 'FE', 'FG', 'FI', 'FM', 'FR', 'GE', 'GO', 'GR', 'IM', 'IS', 'KR', 'LC', 'LE', 'LI', 'LO', 'LT', 'LU', 'MB', 'MC', 'ME', 'MI', 'MN', 'MO', 'MS', 'MT', 'NA', 'NO', 'NU', 'OR', 'PA', 'PC', 'PD', 'PE', 'PG', 'PI', 'PN', 'PO', 'PR', 'PU', 'PV', 'PZ', 'RA', 'RC', 'RE', 'RG', 'RI', 'RM', 'RN', 'RO', 'SA', 'SI', 'SO', 'SP', 'SR', 'SS', 'SV', 'TA', 'TE', 'TN', 'TO', 'TP', 'TR', 'TS', 'TV', 'UD', 'VA', 'VB', 'VC', 'VE', 'VI', 'VR', 'VT', 'VV'];

const CLASSI_CONCORSO = [
  'A-01', 'A-02', 'A-03', 'A-04', 'A-05', 'A-06', 'A-07', 'A-08', 'A-09', 'A-10',
  'A-11', 'A-12', 'A-13', 'A-14', 'A-15', 'A-16', 'A-17', 'A-18', 'A-19', 'A-20',
  'A-21', 'A-22', 'A-23', 'A-24', 'A-25', 'A-26', 'A-27', 'A-28', 'A-29', 'A-30',
  'A-31', 'A-32', 'A-33', 'A-34', 'A-35', 'A-36', 'A-37', 'A-38', 'A-39', 'A-40',
  'A-41', 'A-42', 'A-43', 'A-44', 'A-45', 'A-46', 'A-47', 'A-48', 'A-49', 'A-50',
  'A-51', 'A-52', 'A-53', 'A-54', 'A-55', 'A-56', 'A-57', 'A-58', 'A-59', 'A-60',
  'Sostegno Infanzia', 'Sostegno Primaria', 'Sostegno SSI', 'Sostegno SSII',
  'AA', 'AT', 'CS', 'OS', 'CU', 'IF', 'GU',
];

const MOCK_INTERPELLI: InterpelloNazionale[] = Array.from({ length: 10 }, (_, i) => ({
  id: `int-${i + 1}`,
  ufficio_scolastico_provinciale: PROVINCE[i % PROVINCE.length],
  scuola_istanza: `IC "${['Marconi', 'Einstein', 'Dante', 'Manzoni', 'Verdi', 'Rossini', 'Galilei', 'Leonardo', 'Fermi', 'Volta'][i % 10]}" - ${PROVINCE[i % PROVINCE.length]}`,
  classe_di_concorso: CLASSI_CONCORSO[i % CLASSI_CONCORSO.length],
  tipo_posto: (['comune', 'sostegno', 'ata'] as const)[i % 3],
  data_pubblicazione: new Date(2026, 5, 1 + i).toISOString().split('T')[0],
  data_scadenza: new Date(2026, 5, 15 + (i % 10)).toISOString().split('T')[0],
  link_allegato_pdf: '#',
  stato: i % 4 === 0 ? 'scaduto' : i % 5 === 0 ? 'assegnato' : 'aperto',
}));

export default function CentroInterpelli() {
  const { user, isAuthenticated } = useAuth();
  const [showLogin, setShowLogin] = useState(false);
  const [searchCount, setSearchCount] = useState(0);
  const [loading, setLoading] = useState(false);
  const [filtroProvincia, setFiltroProvincia] = useState('');
  const [filtroClasse, setFiltroClasse] = useState('');
  const [filtroTipoPosto, setFiltroTipoPosto] = useState('');
  const [risultati, setRisultati] = useState<InterpelloNazionale[]>([]);
  const [mostraRisultati, setMostraRisultati] = useState(false);

  const canSearch = isAuthenticated ? true : searchCount < 3;
  const isPremium = user?.is_premium || false;

  const cerca = useCallback(() => {
    if (!canSearch) {
      if (!isAuthenticated) setShowLogin(true);
      return;
    }
    setLoading(true);
    setSearchCount(prev => prev + 1);
    setTimeout(() => {
      let filtered = [...MOCK_INTERPELLI];
      if (filtroProvincia) filtered = filtered.filter(r => r.ufficio_scolastico_provinciale === filtroProvincia);
      if (filtroClasse) filtered = filtered.filter(r => r.classe_di_concorso === filtroClasse);
      if (filtroTipoPosto) filtered = filtered.filter(r => r.tipo_posto === filtroTipoPosto);
      setRisultati(filtered);
      setMostraRisultati(true);
      setLoading(false);
    }, 600);
  }, [canSearch, isAuthenticated, filtroProvincia, filtroClasse, filtroTipoPosto, searchCount]);

  const statoBadge: Record<string, string> = {
    aperto: 'bg-green-100 text-green-700',
    scaduto: 'bg-red-100 text-red-700',
    assegnato: 'bg-gray-100 text-gray-600',
  };

  return (
    <section id="interpelli" className="py-20 bg-surface-warm/60">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-6">
          <h2 className="text-4xl font-extrabold text-[#0F172A] mb-4 tracking-tight">
            Centro Nazionale Interpelli
          </h2>
          <p className="text-gray-600 font-normal max-w-2xl mx-auto">
            Ricerca disponibilità di supplenze in tempo reale da tutte le province italiane. Filtra per provincia, classe di concorso e tipo posto.
          </p>
        </div>

        <div className="bg-white/70 backdrop-blur-md rounded-3xl shadow-soft border border-slate-200/60 p-6 sm:p-8 mb-6">
          <h3 className="text-lg font-semibold text-brand-blu mb-5 flex items-center gap-2">
            <Filter size={18} /> Filtri di Ricerca
          </h3>
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Provincia / USP</label>
              <select value={filtroProvincia} onChange={e => setFiltroProvincia(e.target.value)}
                className="w-full border border-slate-200 rounded-2xl px-4 py-3 focus:ring-2 focus:ring-brand-blu transition bg-white">
                <option value="">Tutte le province</option>
                {PROVINCE.map(p => <option key={p} value={p}>{p}</option>)}
              </select>
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Classe di Concorso / Profilo</label>
              <select value={filtroClasse} onChange={e => setFiltroClasse(e.target.value)}
                className="w-full border border-slate-200 rounded-2xl px-4 py-3 focus:ring-2 focus:ring-brand-blu transition bg-white">
                <option value="">Tutte le classi</option>
                {CLASSI_CONCORSO.map(c => <option key={c} value={c}>{c}</option>)}
              </select>
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Tipologia Posto</label>
              <select value={filtroTipoPosto} onChange={e => setFiltroTipoPosto(e.target.value)}
                className="w-full border border-slate-200 rounded-2xl px-4 py-3 focus:ring-2 focus:ring-brand-blu transition bg-white">
                <option value="">Tutti i tipi</option>
                <option value="comune">Posto Comune</option>
                <option value="sostegno">Sostegno</option>
                <option value="ata">ATA</option>
              </select>
            </div>
          </div>

          <div className="mt-5 flex items-center justify-between">
            <p className="text-xs text-gray-500">
              {isAuthenticated ? 'Ricerca illimitata' : `Ricerche gratuite: ${3 - searchCount} / 3`}
            </p>
            <button onClick={cerca} disabled={loading || !canSearch}
              className="px-8 py-3 bg-gradient-to-r from-brand-blu to-brand-verde text-white rounded-2xl font-semibold hover:opacity-90 disabled:opacity-50 transition flex items-center gap-2 shadow-soft">
              {loading ? <Loader2 size={18} className="animate-spin" /> : <Search size={18} />}
              {loading ? 'Ricerca...' : 'Cerca Disponibilità'}
            </button>
          </div>

          {!isAuthenticated && searchCount >= 3 && (
            <div className="mt-4 p-4 bg-amber-50 rounded-2xl border border-amber-200">
              <p className="text-amber-800 text-sm font-medium flex items-center gap-2">
                <Lock size={16} /> Limite raggiunto. <button onClick={() => setShowLogin(true)} className="underline font-bold">Accedi</button> o abbonati per ricerche illimitate.
              </p>
            </div>
          )}
        </div>

        {mostraRisultati && (
          <div className="bg-white/70 backdrop-blur-md rounded-3xl shadow-soft border border-slate-200/60 p-6 sm:p-8">
            <h3 className="text-lg font-semibold text-brand-blu mb-4">
              Risultati ({risultati.length} disponibilità)
            </h3>
            <div className="space-y-3">
              {risultati.slice(0, 5).map(r => {
                const isScaduto = r.stato === 'scaduto' || r.stato === 'assegnato';
                return (
                  <div key={r.id} className={`p-4 rounded-2xl border ${isScaduto ? 'border-slate-200 bg-gray-50' : 'border-slate-200/60 hover:border-brand-blu/30 bg-white/50'}`}>
                    <div className="flex items-start justify-between">
                      <div className="flex-1">
                        <div className="flex items-center gap-2 mb-1 flex-wrap">
                          <span className={`text-xs font-semibold px-2 py-0.5 rounded-full ${statoBadge[r.stato]}`}>{r.stato}</span>
                          <span className="text-xs font-medium text-brand-blu">{r.ufficio_scolastico_provinciale}</span>
                          <span className="text-xs bg-gray-100 text-gray-600 px-2 py-0.5 rounded-full">{r.tipo_posto}</span>
                        </div>
                        <p className="text-sm font-semibold text-[#0F172A]">{r.scuola_istanza}</p>
                        <p className="text-xs text-gray-500 mt-0.5">Classe: {r.classe_di_concorso} | Scad: {r.data_scadenza}</p>
                      </div>
                      <div className="ml-3">
                        {isScaduto || !isPremium ? (
                          <Lock size={18} className="text-gray-400" />
                        ) : (
                          <Unlock size={18} className="text-brand-verde" />
                        )}
                      </div>
                    </div>
                  </div>
                );
              })}
            </div>
            <div className="text-center mt-5">
              <a href="/interpelli"
                className="inline-flex items-center gap-2 px-6 py-2 bg-white border border-slate-200 rounded-2xl text-brand-blu font-medium hover:border-brand-blu/30 transition text-sm">
                Vedi tutti gli interpelli <ExternalLink size={14} />
              </a>
            </div>
          </div>
        )}

        <div className="mt-6 bg-gradient-to-r from-brand-ambra/10 to-brand-oro/10 rounded-3xl border border-brand-ambra/20 p-6 text-center">
          <BellRing size={24} className="text-brand-ambra mx-auto mb-2" />
          <p className="text-sm font-semibold text-[#0F172A]">Notifiche Premium</p>
          <p className="text-xs text-gray-500 mt-1">Attiva le notifiche per ricevere gli interpelli via email in tempo reale.</p>
          <a href="/interpelli" className="mt-3 inline-block px-6 py-2 bg-brand-ambra text-white rounded-2xl text-sm font-semibold hover:bg-brand-ambra/90 transition">
            Scopri di più
          </a>
        </div>
      </div>

      {showLogin && <LoginModal onClose={() => setShowLogin(false)} />}
    </section>
  );
}
