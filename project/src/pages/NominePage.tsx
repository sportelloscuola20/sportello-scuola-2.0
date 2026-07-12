import { useState, useMemo } from 'react';
import { Search, Filter, ChevronDown, ChevronRight, ExternalLink, MapPin, Target, Users, TrendingUp, TrendingDown, Minus, AlertTriangle, CheckCircle, BarChart3, Zap } from 'lucide-react';
import { USP_PROVINCE, REGIONI_WITH_USP, getUSPBySigla } from '../data/usp-italiane';
import {
  CLASSI_CONCORSO, BOLLETTINI_NOMINE,
  getBollettiniByClasseAndProvincia, getBollettiniByClasse, getSintesiByClasse,
  ordinaPerCompetizione, type BollettinoEntry, type ClasseConcorso,
} from '../data/bollettini-nomine';

const TIPI_GRADUATORIA = ['GPS I Fascia', 'GPS II Fascia'] as const;

const COMPETIZIONE_COLORS: Record<string, string> = {
  molto_alta: 'bg-red-100 text-red-700 border-red-200',
  alta: 'bg-orange-100 text-orange-700 border-orange-200',
  media: 'bg-amber-100 text-amber-700 border-amber-200',
  bassa: 'bg-green-100 text-green-700 border-green-200',
};

const COMPETIZIONE_LABELS: Record<string, string> = {
  molto_alta: 'Competizione Molto Alta',
  alta: 'Competizione Alta',
  media: 'Competizione Media',
  bassa: 'Competizione Bassa',
};

const TREND_ICONS: Record<string, typeof TrendingUp> = {
  crescente: TrendingUp,
  decrescente: TrendingDown,
  stabile: Minus,
};

const TREND_COLORS: Record<string, string> = {
  crescente: 'text-red-500',
  decrescente: 'text-green-600',
  stabile: 'text-gray-400',
};

export default function NominePage() {
  const [classeSelezionata, setClasseSelezionata] = useState('');
  const [provinciaSelezionata, setProvinciaSelezionata] = useState('');
  const [regioneSelezionata, setRegioneSelezionata] = useState('');
  const [tipoGraduatoria, setTipoGraduatoria] = useState('');
  const [searchClasse, setSearchClasse] = useState('');
  const [showSoloFiltroMio, setShowSoloFiltroMio] = useState(false);
  const [punteggioMio, setPunteggioMio] = useState('');
  const [expandedRegione, setExpandedRegione] = useState<string | null>(null);
  const [tabAttiva, setTabAttiva] = useState<'ricerca' | 'mappa' | 'classi'>('ricerca');

  const provinceFiltrate = regioneSelezionata
    ? USP_PROVINCE.filter(p => p.regioneCodice === regioneSelezionata)
    : USP_PROVINCE;

  const classiFiltrate = useMemo(() => {
    if (!searchClasse) return CLASSI_CONCORSO;
    const s = searchClasse.toLowerCase();
    return CLASSI_CONCORSO.filter(c =>
      c.codice.toLowerCase().includes(s) ||
      c.materia.toLowerCase().includes(s) ||
      c.ordineScuola.toLowerCase().includes(s)
    );
  }, [searchClasse]);

  const bollettiniFiltrati = useMemo(() => {
    let result = BOLLETTINI_NOMINE;

    if (classeSelezionata) result = result.filter(b => b.classeCodice === classeSelezionata);
    if (provinciaSelezionata) result = result.filter(b => b.provinciaSigla === provinciaSelezionata);
    if (tipoGraduatoria) result = result.filter(b => b.tipoGraduatoria === tipoGraduatoria);

    return ordinaPerCompetizione(result);
  }, [classeSelezionata, provinciaSelezionata, tipoGraduatoria]);

  const statsGlobali = useMemo(() => {
    const entries = classeSelezionata ? getBollettiniByClasse(classeSelezionata) : BOLLETTINI_NOMINE;
    const totPosizioni = entries.reduce((s, e) => s + e.posizioniAssegnate, 0);
    const totCandidati = entries.reduce((s, e) => s + e.candidatiInGraduatoria, 0);
    const uniqueProvince = new Set(entries.map(e => e.provinciaSigla));
    const minPunteggio = entries.length ? Math.min(...entries.map(e => e.punteggioMinimo)) : 0;
    const maxPunteggio = entries.length ? Math.max(...entries.map(e => e.punteggioMassimo)) : 0;
    return {
      totPosizioni,
      totCandidati,
      tassoCopertura: totCandidati > 0 ? ((totPosizioni / totCandidati) * 100).toFixed(1) : '0',
      provinceAttive: uniqueProvince.size,
      minPunteggio,
      maxPunteggio,
    };
  }, [classeSelezionata]);

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-green-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-24 pb-12">
        {/* Header */}
        <div className="text-center mb-8">
          <h1 className="text-4xl font-extrabold text-[#0F172A] mb-3 tracking-tight">
            Osservatorio Nazionale Nomine
          </h1>
          <p className="text-gray-600 max-w-3xl mx-auto text-sm">
            Bollettini ufficiali delle nomine per tutti i concorsi, GPS e graduatorie.
            Verifica i punteggi reali della tua classe di concorso e provincia per sapere dove ti collochi.
          </p>
        </div>

        {/* Stats globali */}
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 mb-8">
          <div className="bg-white/80 backdrop-blur rounded-2xl border border-slate-200/60 p-4 text-center">
            <p className="text-3xl font-extrabold text-brand-blu">{statsGlobali.totPosizioni.toLocaleString()}</p>
            <p className="text-[10px] text-gray-500 flex items-center justify-center gap-1"><Target size={10} /> Posizioni Assegnate</p>
          </div>
          <div className="bg-white/80 backdrop-blur rounded-2xl border border-slate-200/60 p-4 text-center">
            <p className="text-3xl font-extrabold text-brand-ambra">{statsGlobali.totCandidati.toLocaleString()}</p>
            <p className="text-[10px] text-gray-500 flex items-center justify-center gap-1"><Users size={10} /> Candidati in Graduatoria</p>
          </div>
          <div className="bg-white/80 backdrop-blur rounded-2xl border border-slate-200/60 p-4 text-center">
            <p className="text-3xl font-extrabold text-brand-verde">{statsGlobali.tassoCopertura}%</p>
            <p className="text-[10px] text-gray-500 flex items-center justify-center gap-1"><BarChart3 size={10} /> Tasso di Copertura</p>
          </div>
          <div className="bg-white/80 backdrop-blur rounded-2xl border border-slate-200/60 p-4 text-center">
            <p className="text-3xl font-extrabold text-brand-ottanio">{statsGlobali.provinceAttive}</p>
            <p className="text-[10px] text-gray-500 flex items-center justify-center gap-1"><MapPin size={10} /> Province con Bollettini</p>
          </div>
        </div>

        {/* Tabs */}
        <div className="flex gap-1 bg-gray-100 rounded-2xl p-1 mb-6 max-w-sm mx-auto">
          {([
            { id: 'ricerca', label: 'Cerca per Classe + Provincia', icon: Search },
            { id: 'classi', label: 'Tutte le Classi', icon: BarChart3 },
          ] as const).map(tab => (
            <button key={tab.id} onClick={() => setTabAttiva(tab.id)}
              className={`flex-1 flex items-center justify-center gap-2 px-3 py-2.5 rounded-xl text-sm font-semibold transition-all ${tabAttiva === tab.id ? 'bg-white text-brand-blu shadow-sm' : 'text-gray-500 hover:text-gray-700'}`}>
              <tab.icon size={14} /> {tab.label}
            </button>
          ))}
        </div>

        {/* ═══ TAB RICERCA ═══ */}
        {tabAttiva === 'ricerca' && (
          <>
            {/* Filtri */}
            <div className="bg-white/70 backdrop-blur-md rounded-3xl shadow-soft border border-slate-200/60 p-6 mb-8">
              <h3 className="text-lg font-semibold text-brand-blu mb-4 flex items-center gap-2">
                <Filter size={18} /> Trova il tuo bollettino
              </h3>
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
                {/* Regione */}
                <div>
                  <label className="block text-xs font-medium text-gray-500 mb-1">Regione</label>
                  <select value={regioneSelezionata} onChange={e => { setRegioneSelezionata(e.target.value); setProvinciaSelezionata(''); }}
                    className="w-full border border-slate-200 rounded-2xl px-4 py-3 focus:ring-2 focus:ring-brand-blu transition bg-white text-sm">
                    <option value="">Tutte le regioni</option>
                    {REGIONI_WITH_USP.map(r => (
                      <option key={r.codice} value={r.codice}>{r.nome} ({r.province.length})</option>
                    ))}
                  </select>
                </div>
                {/* Provincia */}
                <div>
                  <label className="block text-xs font-medium text-gray-500 mb-1">Provincia</label>
                  <select value={provinciaSelezionata} onChange={e => setProvinciaSelezionata(e.target.value)}
                    className="w-full border border-slate-200 rounded-2xl px-4 py-3 focus:ring-2 focus:ring-brand-blu transition bg-white text-sm">
                    <option value="">Tutte le province</option>
                    {provinceFiltrate.map(p => (
                      <option key={p.sigla} value={p.sigla}>{p.sigla} — {p.nome}</option>
                    ))}
                  </select>
                </div>
                {/* Tipo */}
                <div>
                  <label className="block text-xs font-medium text-gray-500 mb-1">Tipo Graduatoria</label>
                  <select value={tipoGraduatoria} onChange={e => setTipoGraduatoria(e.target.value)}
                    className="w-full border border-slate-200 rounded-2xl px-4 py-3 focus:ring-2 focus:ring-brand-blu transition bg-white text-sm">
                    <option value="">Tutte</option>
                    {TIPI_GRADUATORIA.map(t => <option key={t} value={t}>{t}</option>)}
                  </select>
                </div>
                {/* Classe di concorso */}
                <div>
                  <label className="block text-xs font-medium text-gray-500 mb-1">Classe di Concorso</label>
                  <div className="relative">
                    <Search size={14} className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" />
                    <input type="text" value={searchClasse} onChange={e => { setSearchClasse(e.target.value); setClasseSelezionata(''); }}
                      placeholder="es. A001, Inglese..."
                      className="w-full pl-9 pr-4 py-3 border border-slate-200 rounded-2xl focus:ring-2 focus:ring-brand-blu/20 outline-none text-sm" />
                    {searchClasse && (
                      <div className="absolute z-20 top-full mt-1 w-full bg-white border border-slate-200 rounded-2xl shadow-lg max-h-60 overflow-auto">
                        {classiFiltrate.slice(0, 15).map(c => (
                          <button key={c.codice} onClick={() => { setClasseSelezionata(c.codice); setSearchClasse(`${c.codice} — ${c.materia}`); }}
                            className="w-full text-left px-4 py-2.5 hover:bg-brand-blu/5 transition text-sm border-b border-slate-100 last:border-0">
                            <span className="font-bold text-brand-blu">{c.codice}</span>
                            <span className="text-gray-600 ml-2">{c.materia}</span>
                          </button>
                        ))}
                        {classiFiltrate.length === 0 && <p className="text-gray-400 text-sm p-4">Nessuna classe trovata</p>}
                      </div>
                    )}
                  </div>
                </div>
              </div>

              {/* Punteggio mio */}
              <div className="mt-4 grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs font-medium text-gray-500 mb-1">
                    <Zap size={10} className="inline" /> Il tuo punteggio (opzionale)
                  </label>
                  <input type="number" step="0.5" value={punteggioMio} onChange={e => setPunteggioMio(e.target.value)}
                    placeholder="es. 85.5"
                    className="w-full border border-slate-200 rounded-2xl px-4 py-3 focus:ring-2 focus:ring-brand-blu/20 outline-none text-sm" />
                  {punteggioMio && (
                    <p className="text-[10px] text-gray-400 mt-1">
                      {parseFloat(punteggioMio) >= statsGlobali.maxPunteggio
                        ? 'Ottimo! Sei sopra il punteggio massimo registrato'
                        : parseFloat(punteggioMio) >= statsGlobali.minPunteggio
                        ? 'Sei nella fascia delle nomine — buone possibilità!'
                        : 'Punteggio sotto la media — valuta di migliorare i titoli'}
                    </p>
                  )}
                </div>
                <div className="flex items-end">
                  <button onClick={() => setShowSoloFiltroMio(!showSoloFiltroMio)}
                    className={`px-4 py-2.5 rounded-2xl text-sm font-semibold border transition ${showSoloFiltroMio ? 'bg-brand-blu text-white border-brand-blu' : 'bg-white text-gray-600 border-slate-200 hover:border-brand-blu/30'}`}>
                    {showSoloFiltroMio ? '✓ Mostra dove ho chance' : 'Filtra per le mie possibilità'}
                  </button>
                </div>
              </div>
            </div>

            {/* Alert punteggio */}
            {punteggioMio && (
              <div className={`mb-6 rounded-3xl p-5 border ${parseFloat(punteggioMio) >= statsGlobali.maxPunteggio ? 'bg-green-50 border-green-200' : parseFloat(punteggioMio) >= statsGlobali.minPunteggio ? 'bg-amber-50 border-amber-200' : 'bg-red-50 border-red-200'}`}>
                <div className="flex items-start gap-3">
                  {parseFloat(punteggioMio) >= statsGlobali.maxPunteggio
                    ? <CheckCircle size={20} className="text-green-600 mt-0.5 flex-shrink-0" />
                    : parseFloat(punteggioMio) >= statsGlobali.minPunteggio
                    ? <AlertTriangle size={20} className="text-amber-600 mt-0.5 flex-shrink-0" />
                    : <AlertTriangle size={20} className="text-red-600 mt-0.5 flex-shrink-0" />}
                  <div>
                    <p className={`font-bold text-sm ${parseFloat(punteggioMio) >= statsGlobali.maxPunteggio ? 'text-green-800' : parseFloat(punteggioMio) >= statsGlobali.minPunteggio ? 'text-amber-800' : 'text-red-800'}`}>
                      Con punteggio {punteggioMio} punti
                    </p>
                    <p className="text-xs text-gray-600 mt-1">
                      {classeSelezionata
                        ? parseFloat(punteggioMio) >= statsGlobali.maxPunteggio
                          ? `Sei sopra il punteggio massimo (${statsGlobali.maxPunteggio}) per ${classeSelezionata}. Hai ottime possibilità di essere chiamato!`
                          : parseFloat(punteggioMio) >= statsGlobali.minPunteggio
                          ? `Sei nella fascia delle nominate reali (${statsGlobali.minPunteggio} — ${statsGlobali.maxPunteggio}). Le probabilità dipendono dalla provincia e dalla disponibilità.`
                          : `Il punteggio minimo registrato per ${classeSelezionata} è ${statsGlobali.minPunteggio}. Considera di migliorare i titoli.`
                        : `Seleziona una classe di concorso per un'analisi dettagliata delle tue possibilità.`}
                    </p>
                  </div>
                </div>
              </div>
            )}

            {/* Risultati */}
            <div className="mb-4 flex items-center justify-between">
              <h3 className="text-lg font-bold text-[#0F172A]">
                {classeSelezionata ? `Bollettini ${classeSelezionata}` : 'Tutti i bollettini'}
                {provinciaSelezionata && ` — ${provinciaSelezionata}`}
              </h3>
              <span className="text-xs text-gray-500">{bollettiniFiltrati.length} risultati</span>
            </div>

            {bollettiniFiltrati.length === 0 && (
              <div className="text-center py-16 bg-white/60 rounded-3xl border border-slate-200/60">
                <Search size={48} className="mx-auto text-gray-300 mb-4" />
                <p className="text-gray-500 text-sm">Nessun bollettino trovato con i filtri selezionati.</p>
                <p className="text-gray-400 text-xs mt-1">Prova a selezionare una classe di concorso o una provincia diversa.</p>
              </div>
            )}

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {bollettiniFiltrati.map(entry => (
                <BollettinoCard key={entry.id} entry={entry} punteggioMio={punteggioMio ? parseFloat(punteggioMio) : null} />
              ))}
            </div>
          </>
        )}

        {/* ═══ TAB TUTTE LE CLASSI ═══ */}
        {tabAttiva === 'classi' && (
          <div className="space-y-4">
            <div className="bg-white/70 backdrop-blur-md rounded-3xl shadow-soft border border-slate-200/60 p-6 mb-4">
              <div className="relative">
                <Search size={16} className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400" />
                <input type="text" value={searchClasse} onChange={e => setSearchClasse(e.target.value)}
                  placeholder="Cerca classe di concorso per codice, materia o ordine scuola..."
                  className="w-full pl-11 pr-4 py-3 border border-slate-200 rounded-2xl focus:ring-2 focus:ring-brand-blu/20 outline-none text-sm" />
              </div>
            </div>

            {/* Group by ordine scuola */}
            {(['Secondaria II Grado', 'Secondaria I Grado', 'Infanzia', 'Primaria'] as const).map(ordine => {
              const classi = classiFiltrate.filter(c => c.ordineScuola === ordine);
              if (classi.length === 0) return null;
              return (
                <div key={ordine} className="bg-white/70 backdrop-blur-md rounded-3xl shadow-soft border border-slate-200/60 overflow-hidden">
                  <div className="p-4 bg-gradient-to-r from-brand-blu/5 to-transparent border-b border-slate-200/60">
                    <h3 className="font-bold text-brand-blu text-sm">{ordine} — {classi.length} classi</h3>
                  </div>
                  <div className="divide-y divide-slate-100">
                    {classi.map(classe => {
                      const sintesi = getSintesiByClasse(classe.codice);
                      return (
                        <button key={classe.codice} onClick={() => { setClasseSelezionata(classe.codice); setSearchClasse(`${classe.codice} — ${classe.materia}`); setTabAttiva('ricerca'); }}
                          className="w-full flex items-center justify-between p-4 hover:bg-brand-blu/5 transition text-left">
                          <div className="flex items-center gap-3">
                            <span className="px-2.5 py-1 bg-brand-blu/10 text-brand-blu text-xs font-bold rounded-lg">{classe.codice}</span>
                            <div>
                              <p className="text-sm font-semibold text-[#0F172A]">{classe.materia}</p>
                              {sintesi && (
                                <p className="text-[10px] text-gray-500 mt-0.5">
                                  {sintesi.totalePosizioni} pos. assegnate · {sintesi.provinceAttive} province · Punteggio min: {sintesi.punteggioMinimoNazionale}
                                </p>
                              )}
                            </div>
                          </div>
                          <ChevronRight size={16} className="text-gray-400" />
                        </button>
                      );
                    })}
                  </div>
                </div>
              );
            })}
          </div>
        )}

        {/* ═══ INFO BOX ═══ */}
        <div className="mt-8 bg-gradient-to-r from-brand-blu/5 to-brand-verde/5 rounded-3xl border border-brand-blu/10 p-6">
          <h3 className="text-lg font-bold text-brand-blu mb-2">Come funzionano le Nomine GPS</h3>
          <div className="grid sm:grid-cols-3 gap-4 mt-4">
            <div className="bg-white/50 rounded-2xl p-4 border border-slate-200/60">
              <p className="text-sm font-semibold text-brand-blu mb-1">GPS I Fascia</p>
              <p className="text-xs text-gray-500">Docenti abilitati (TFA, PAS, laurea magistrale SSFP, percorsi 30/36/60 CFU). Chiamata prioritaria.</p>
            </div>
            <div className="bg-white/50 rounded-2xl p-4 border border-slate-200/60">
              <p className="text-sm font-semibold text-brand-blu mb-1">GPS II Fascia</p>
              <p className="text-xs text-gray-500">Docenti con titolo di studio + 24 CFU. Chiamata solo dopo esaurimento I fascia.</p>
            </div>
            <div className="bg-white/50 rounded-2xl p-4 border border-slate-200/60">
              <p className="text-sm font-semibold text-brand-blu mb-1">Graduatoria di Istituto</p>
              <p className="text-xs text-gray-500">Graduatorie interne per supplenze brevi e temporanee (fino a 10 giorni). Non sostituisce le GPS.</p>
            </div>
          </div>
          <p className="text-xs text-gray-500 mt-4">
            Dati riferiti all'anno scolastico 2024/25. I punteggi variano annualmente in base a quanti posti vengono banditi e quanti candidati partecipano.
            Fonte: OM 88/2024, bollettini USP. Per aggiornamenti in tempo reale, consulta il Centro Nazionale Interpelli.
          </p>
        </div>
      </div>
    </div>
  );
}

// ═══ BOLLINO CARD ═══
function BollettinoCard({ entry, punteggioMio }: { entry: BollettinoEntry; punteggioMio: number | null }) {
  const classe = getUSPBySigla(entry.provinciaSigla);
  const TrendIcon = TREND_ICONS[entry.trend] || Minus;
  const tassoCopertura = entry.candidatiInGraduatoria > 0
    ? ((entry.posizioniAssegnate / entry.candidatiInGraduatoria) * 100).toFixed(1)
    : '0';

  const haChance = punteggioMio !== null && punteggioMio >= entry.punteggioMinimo;
  const eSopraMax = punteggioMio !== null && punteggioMio > entry.punteggioMassimo;

  return (
    <div className={`rounded-3xl border p-5 transition-all ${haChance ? 'bg-green-50/50 border-green-200 shadow-md' : punteggioMio !== null ? 'bg-red-50/30 border-red-100' : 'bg-white border-slate-200/60 hover:border-brand-blu/20 shadow-soft'}`}>
      {/* Header */}
      <div className="flex items-start justify-between mb-3">
        <div className="flex items-center gap-2">
          <span className="px-2 py-0.5 bg-brand-blu/10 text-brand-blu text-xs font-bold rounded-full">{entry.provinciaSigla}</span>
          <span className="text-xs text-gray-500">{classe?.nome || entry.provinciaSigla}</span>
        </div>
        <div className="flex items-center gap-1.5">
          <span className={`text-[10px] font-bold px-2 py-0.5 rounded-full border ${COMPETIZIONE_COLORS[entry.competizione]}`}>
            {COMPETIZIONE_LABELS[entry.competizione]}
          </span>
        </div>
      </div>

      {/* Classe + Tipo */}
      <div className="mb-3">
        <p className="text-sm font-bold text-[#0F172A]">{entry.tipoGraduatoria}</p>
        <p className="text-[10px] text-gray-400 mt-0.5">A.S. {entry.annoScolastico}</p>
      </div>

      {/* Punteggi */}
      <div className="grid grid-cols-2 gap-3 mb-3">
        <div className="bg-brand-blu/5 rounded-2xl p-3">
          <p className="text-[10px] text-gray-500 mb-1">Punteggio Minimo Chiamato</p>
          <p className="text-xl font-extrabold text-brand-blu">{entry.punteggioMinimo}</p>
        </div>
        <div className="bg-brand-verde/5 rounded-2xl p-3">
          <p className="text-[10px] text-gray-500 mb-1">Punteggio Massimo</p>
          <p className="text-xl font-extrabold text-brand-verde">{entry.punteggioMassimo}</p>
        </div>
      </div>

      {/* Mio punteggio indicator */}
      {punteggioMio !== null && (
        <div className={`mb-3 p-2.5 rounded-2xl border text-xs ${eSopraMax ? 'bg-green-100 border-green-300 text-green-800' : haChance ? 'bg-green-50 border-green-200 text-green-700' : 'bg-red-50 border-red-200 text-red-700'}`}>
          {eSopraMax ? (
            <p className="font-bold">✓ Punteggio {punteggioMio} — Sopra il massimo ({entry.punteggioMassimo}). Hai ottime possibilità!</p>
          ) : haChance ? (
            <p className="font-bold">✓ Punteggio {punteggioMio} — Nella fascia delle nominate ({entry.punteggioMinimo} — {entry.punteggioMassimo}).</p>
          ) : (
            <p className="font-bold">✗ Punteggio {punteggioMio} — Sotto il minimo ({entry.punteggioMinimo}). Serve migliorare i titoli.</p>
          )}
        </div>
      )}

      {/* Stats riga */}
      <div className="flex items-center justify-between text-[10px] text-gray-500">
        <span className="flex items-center gap-1"><Target size={10} /> {entry.posizioniAssegnate} posizioni assegnate</span>
        <span className="flex items-center gap-1"><Users size={10} /> {entry.candidatiInGraduatoria} candidati</span>
      </div>
      <div className="flex items-center justify-between text-[10px] text-gray-500 mt-1">
        <span>Tasso copertura: <strong className="text-brand-blu">{tassoCopertura}%</strong></span>
        <span className={`flex items-center gap-1 ${TREND_COLORS[entry.trend]}`}>
          <TrendIcon size={10} /> {entry.trend}
        </span>
      </div>
      <p className="text-[9px] text-gray-400 mt-2">Ultima nomina: {new Date(entry.ultimaNomina).toLocaleDateString('it-IT')}</p>
    </div>
  );
}
