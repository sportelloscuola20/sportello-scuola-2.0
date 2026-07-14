import { useState, useMemo } from 'react';
import {
  Search, Filter, ChevronDown, ChevronRight, ExternalLink, MapPin,
  Target, Users, TrendingUp, TrendingDown, Minus, AlertTriangle,
  CheckCircle, BarChart3, Zap, Info, Star, BookOpen,
} from 'lucide-react';
import { USP_PROVINCE, REGIONI_WITH_USP, getUSPBySigla } from '../data/usp-italiane';
import {
  CLASSI_CONCORSO, getBollettiniByClasse, getBollettiniByClasseAndProvincia,
  getSintesiByClasse, getClasseByCodice, getAllBollettini,
  ordinaPerCompetizione,
  type BollettinoEntry, type ClasseConcorso,
} from '../data/bollettini-nomine';

// ═══ CONSTANTS ═══

const TIPI_GRADUATORIA = ['GPS I Fascia', 'GPS II Fascia', 'GAE', 'Graduatoria di Istituto'] as const;

const ORDINI_SCUOLA = ['Infanzia', 'Primaria', 'Secondaria I Grado', 'Secondaria II Grado'] as const;

const ORDINI_SCUOLA_LABELS: Record<string, string> = {
  Infanzia: 'Scuola dell\'Infanzia',
  Primaria: 'Scuola Primaria',
  'Secondaria I Grado': 'Scuola Secondaria di I Grado',
  'Secondaria II Grado': 'Scuola Secondaria di II Grado',
};

const SORT_OPTIONS = [
  { value: 'turno', label: 'Turno (più recente)' },
  { value: 'competizione', label: 'Competizione (più alta)' },
  { value: 'punteggioMinimo', label: 'Punteggio Minimo (crescente)' },
  { value: 'posizioniAssegnate', label: 'Posizioni Assegnate (più posti)' },
] as const;

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

const FASCIA_COLORS: Record<string, string> = {
  A: 'bg-blue-100 text-blue-700',
  B: 'bg-purple-100 text-purple-700',
  S: 'bg-amber-100 text-amber-700',
};

function sortBollettini(entries: BollettinoEntry[], sortBy: string): BollettinoEntry[] {
  const sorted = [...entries];
  switch (sortBy) {
    case 'turno':
      return sorted.sort((a, b) => new Date(b.dataBollettino).getTime() - new Date(a.dataBollettino).getTime());
    case 'competizione': {
      const ordine = { molto_alta: 0, alta: 1, media: 2, bassa: 3 };
      return sorted.sort((a, b) => ordine[a.competizione] - ordine[b.competizione]);
    }
    case 'punteggioMinimo':
      return sorted.sort((a, b) => b.punteggioMinimo - a.punteggioMinimo);
    case 'posizioniAssegnate':
      return sorted.sort((a, b) => b.posizioniAssegnate - a.posizioniAssegnate);
    default:
      return sorted;
  }
}

// ═══ MAIN COMPONENT ═══

export default function NominePage() {
  const [classeSelezionata, setClasseSelezionata] = useState('');
  const [provinciaSelezionata, setProvinciaSelezionata] = useState('');
  const [regioneSelezionata, setRegioneSelezionata] = useState('');
  const [tipoGraduatoria, setTipoGraduatoria] = useState('');
  const [ordineScuola, setOrdineScuola] = useState('');
  const [searchClasse, setSearchClasse] = useState('');
  const [punteggioMio, setPunteggioMio] = useState('');
  const [tabAttiva, setTabAttiva] = useState<'ricerca' | 'classi'>('ricerca');
  const [expandedFascia, setExpandedFascia] = useState<string | null>(null);
  const [sortBy, setSortBy] = useState<'turno' | 'competizione' | 'punteggioMinimo' | 'posizioniAssegnate'>('turno');

  const provinceFiltrate = regioneSelezionata
    ? USP_PROVINCE.filter(p => p.regioneCodice === regioneSelezionata)
    : USP_PROVINCE;

  const classiFiltrate = useMemo(() => {
    let result = CLASSI_CONCORSO;
    if (ordineScuola) result = result.filter(c => c.ordineScuola === ordineScuola);
    if (searchClasse) {
      const s = searchClasse.toLowerCase();
      result = result.filter(c =>
        c.codice.toLowerCase().includes(s) ||
        c.materia.toLowerCase().includes(s) ||
        c.ordineScuola.toLowerCase().includes(s)
      );
    }
    return result;
  }, [searchClasse, ordineScuola]);

  const bollettiniFiltrati = useMemo(() => {
    let result: BollettinoEntry[];
    if (classeSelezionata && provinciaSelezionata) {
      result = getBollettiniByClasseAndProvincia(classeSelezionata, provinciaSelezionata);
    } else if (classeSelezionata) {
      result = getBollettiniByClasse(classeSelezionata);
    } else {
      result = getAllBollettini();
    }
    if (provinciaSelezionata && !classeSelezionata) result = result.filter(b => b.provinciaSigla === provinciaSelezionata);
    if (tipoGraduatoria) result = result.filter(b => b.tipoGraduatoria === tipoGraduatoria);
    if (ordineScuola && !classeSelezionata) {
      const codiciOrdine = CLASSI_CONCORSO.filter(c => c.ordineScuola === ordineScuola).map(c => c.codice);
      result = result.filter(b => codiciOrdine.includes(b.classeCodice));
    }
    return sortBollettini(result, sortBy);
  }, [classeSelezionata, provinciaSelezionata, tipoGraduatoria, ordineScuola, sortBy]);

  const statsGlobali = useMemo(() => {
    const scoped = classeSelezionata
      ? getBollettiniByClasse(classeSelezionata)
      : ordineScuola
        ? getAllBollettini().filter(b => {
            const codici = CLASSI_CONCORSO.filter(c => c.ordineScuola === ordineScuola).map(c => c.codice);
            return codici.includes(b.classeCodice);
          })
        : getAllBollettini();

    const totPosizioni = scoped.reduce((s, e) => s + e.posizioniAssegnate, 0);
    const totCandidati = scoped.reduce((s, e) => s + e.candidatiInGraduatoria, 0);
    const uniqueProvince = new Set(scoped.map(e => e.provinciaSigla));
    const uniqueClassi = new Set(scoped.map(e => e.classeCodice));
    const minPunteggio = scoped.length ? Math.min(...scoped.map(e => e.punteggioMinimo)) : 0;
    const maxPunteggio = scoped.length ? Math.max(...scoped.map(e => e.punteggioMassimo)) : 0;
    const muitoAltaCount = scoped.filter(e => e.competizione === 'molto_alta').length;

    return {
      totPosizioni,
      totCandidati,
      tassoCopertura: totCandidati > 0 ? ((totPosizioni / totCandidati) * 100).toFixed(1) : '0',
      provinceAttive: uniqueProvince.size,
      classiAttive: uniqueClassi.size,
      minPunteggio,
      maxPunteggio,
      totaleBollettini: scoped.length,
      muitoAltaCount,
    };
  }, [classeSelezionata, ordineScuola]);

  const punteggioVal = punteggioMio ? parseFloat(punteggioMio) : null;

  const resetFiltri = () => {
    setClasseSelezionata('');
    setProvinciaSelezionata('');
    setRegioneSelezionata('');
    setTipoGraduatoria('');
    setOrdineScuola('');
    setSearchClasse('');
    setPunteggioMio('');
    setSortBy('turno');
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-green-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-24 pb-12">

        {/* ═══ HEADER ═══ */}
        <div className="text-center mb-8">
          <h1 className="text-4xl font-extrabold text-[#0F172A] mb-3 tracking-tight">
            Osservatorio Nazionale Nomine
          </h1>
          <p className="text-gray-600 max-w-3xl mx-auto text-sm">
            Bollettini ufficiali delle nomine GPS per concorsi — Classi di concorso DM 259/17.
            Verifica i punteggi reali della tua classe di concorso e provincia, e scopri le tue
            possibilità di chiamata.
          </p>
        </div>

        {/* ═══ STATS GLOBALI ═══ */}
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 mb-8">
          <StatCard
            value={statsGlobali.totPosizioni.toLocaleString()}
            label="Posizioni Assegnate"
            icon={<Target size={10} />}
            color="text-brand-blu"
          />
          <StatCard
            value={statsGlobali.totCandidati.toLocaleString()}
            label="Candidati in Graduatoria"
            icon={<Users size={10} />}
            color="text-brand-ambra"
          />
          <StatCard
            value={`${statsGlobali.tassoCopertura}%`}
            label="Tasso di Copertura"
            icon={<BarChart3 size={10} />}
            color="text-brand-verde"
          />
          <StatCard
            value={statsGlobali.provinceAttive.toString()}
            label="Province Attive"
            icon={<MapPin size={10} />}
            color="text-brand-ottanio"
          />
        </div>

        {/* Secondary stats row */}
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 mb-8">
          <StatCard
            value={statsGlobali.classiAttive.toString()}
            label="Classi con Bollettini"
            icon={<BookOpen size={10} />}
            color="text-purple-600"
            small
          />
          <StatCard
            value={statsGlobali.totaleBollettini.toLocaleString()}
            label="Bollettini Totali"
            icon={<BarChart3 size={10} />}
            color="text-blue-600"
            small
          />
          <StatCard
            value={`${statsGlobali.minPunteggio} — ${statsGlobali.maxPunteggio}`}
            label="Fascia Punteggi Nazionale"
            icon={<Zap size={10} />}
            color="text-amber-600"
            small
          />
          <StatCard
            value={statsGlobali.muitoAltaCount.toLocaleString()}
            label="Con Competizione Molto Alta"
            icon={<AlertTriangle size={10} />}
            color="text-red-600"
            small
          />
        </div>

        {/* ═══ TABS ═══ */}
        <div className="flex gap-1 bg-gray-100 rounded-2xl p-1 mb-6 max-w-sm mx-auto">
          {([
            { id: 'ricerca' as const, label: 'Cerca Bollettino', icon: Search },
            { id: 'classi' as const, label: 'Tutte le Classi', icon: BarChart3 },
          ]).map(tab => (
            <button
              key={tab.id}
              onClick={() => setTabAttiva(tab.id)}
              className={`flex-1 flex items-center justify-center gap-2 px-3 py-2.5 rounded-xl text-sm font-semibold transition-all ${tabAttiva === tab.id ? 'bg-white text-brand-blu shadow-sm' : 'text-gray-500 hover:text-gray-700'}`}
            >
              <tab.icon size={14} /> {tab.label}
            </button>
          ))}
        </div>

        {/* ═══ TAB RICERCA ═══ */}
        {tabAttiva === 'ricerca' && (
          <>
            {/* FILTRI */}
            <div className="bg-white/70 backdrop-blur-md rounded-3xl shadow-soft border border-slate-200/60 p-6 mb-8">
              <div className="flex items-center justify-between mb-4">
                <h3 className="text-lg font-semibold text-brand-blu flex items-center gap-2">
                  <Filter size={18} /> Trova il tuo bollettino
                </h3>
                {(classeSelezionata || provinciaSelezionata || tipoGraduatoria || ordineScuola) && (
                  <button onClick={resetFiltri} className="text-xs text-gray-400 hover:text-red-500 transition">
                    Reset filtri
                  </button>
                )}
              </div>
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
                {/* Ordine Scuola */}
                <div>
                  <label className="block text-xs font-medium text-gray-500 mb-1">Ordine Scuola</label>
                  <select value={ordineScuola} onChange={e => { setOrdineScuola(e.target.value); setClasseSelezionata(''); setSearchClasse(''); }}
                    className="w-full border border-slate-200 rounded-2xl px-4 py-3 focus:ring-2 focus:ring-brand-blu transition bg-white text-sm">
                    <option value="">Tutti gli ordini</option>
                    {ORDINI_SCUOLA.map(o => (
                      <option key={o} value={o}>{ORDINI_SCUOLA_LABELS[o] || o}</option>
                    ))}
                  </select>
                </div>
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
                {/* Tipo Graduatoria */}
                <div>
                  <label className="block text-xs font-medium text-gray-500 mb-1">Tipo Graduatoria</label>
                  <select value={tipoGraduatoria} onChange={e => setTipoGraduatoria(e.target.value)}
                    className="w-full border border-slate-200 rounded-2xl px-4 py-3 focus:ring-2 focus:ring-brand-blu transition bg-white text-sm">
                    <option value="">Tutte</option>
                    {TIPI_GRADUATORIA.map(t => <option key={t} value={t}>{t}</option>)}
                  </select>
                </div>
              </div>

              {/* Ricerca classe + Ordinamento */}
              <div className="mt-4 grid grid-cols-1 sm:grid-cols-3 gap-4">
                <div>
                  <label className="block text-xs font-medium text-gray-500 mb-1">Classe di Concorso</label>
                  <div className="relative">
                    <Search size={14} className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" />
                    <input type="text" value={searchClasse} onChange={e => { setSearchClasse(e.target.value); setClasseSelezionata(''); }}
                      placeholder="es. A-12, AB22, 00EE, Matematica..."
                      className="w-full pl-9 pr-4 py-3 border border-slate-200 rounded-2xl focus:ring-2 focus:ring-brand-blu/20 outline-none text-sm" />
                    {searchClasse && (
                      <div className="absolute z-20 top-full mt-1 w-full bg-white border border-slate-200 rounded-2xl shadow-lg max-h-60 overflow-auto">
                        {classiFiltrate.slice(0, 15).map(c => (
                          <button key={c.codice} onClick={() => { setClasseSelezionata(c.codice); setSearchClasse(`${c.codice} — ${c.materia}`); }}
                            className="w-full text-left px-4 py-2.5 hover:bg-brand-blu/5 transition text-sm border-b border-slate-100 last:border-0">
                            <span className="font-bold text-brand-blu">{c.codice}</span>
                            <span className="text-gray-600 ml-2">{c.materia}</span>
                            <span className={`ml-2 text-[10px] px-1.5 py-0.5 rounded-full ${FASCIA_COLORS[c.fascia] || 'bg-gray-100'}`}>
                              Fascia {c.fascia}
                            </span>
                          </button>
                        ))}
                        {classiFiltrate.length === 0 && <p className="text-gray-400 text-sm p-4">Nessuna classe trovata</p>}
                      </div>
                    )}
                  </div>
                </div>

                {/* Punteggio mio */}
                <div>
                  <label className="block text-xs font-medium text-gray-500 mb-1">
                    <Zap size={10} className="inline" /> Il tuo punteggio GPS (opzionale)
                  </label>
                  <input type="number" step="0.5" value={punteggioMio} onChange={e => setPunteggioMio(e.target.value)}
                    placeholder="es. 85.5"
                    className="w-full border border-slate-200 rounded-2xl px-4 py-3 focus:ring-2 focus:ring-brand-blu/20 outline-none text-sm" />
                  {punteggioMio && classeSelezionata && (
                    <PunteggioAnalisi punteggio={parseFloat(punteggioMio)} entries={bollettiniFiltrati} />
                  )}
                  {punteggioMio && !classeSelezionata && (
                    <p className="text-[10px] text-gray-400 mt-1">
                      Seleziona una classe di concorso per un'analisi dettagliata.
                    </p>
                  )}
                </div>
                {/* Ordinamento */}
                <div>
                  <label className="block text-xs font-medium text-gray-500 mb-1">
                    <BarChart3 size={10} className="inline" /> Ordina per
                  </label>
                  <select value={sortBy} onChange={e => setSortBy(e.target.value as typeof sortBy)}
                    className="w-full border border-slate-200 rounded-2xl px-4 py-3 focus:ring-2 focus:ring-brand-blu/20 outline-none text-sm bg-white">
                    {SORT_OPTIONS.map(o => <option key={o.value} value={o.value}>{o.label}</option>)}
                  </select>
                </div>
              </div>

              {/* Esempio AD0J Pordenone */}
              {!classeSelezionata && !provinciaSelezionata && (
                <div className="mt-4 bg-gradient-to-r from-blue-50/80 to-indigo-50/80 rounded-2xl border border-blue-200/60 p-4">
                  <div className="flex items-start gap-3">
                    <Star size={16} className="text-blue-500 mt-0.5 flex-shrink-0" />
                    <div>
                      <p className="text-sm font-semibold text-blue-800">Esempio: AD0J — Sostegno Primaria a Pordenone</p>
                      <p className="text-xs text-blue-600 mt-1">
                        In provincia di PN, la classe AD0J ha 28 posizioni assegnate su 160 candidati (GPS I Fascia),
                        con punteggio minimo 58.0 e massimo 98.0. Competizione media.
                        L'ultimo turno risale al 17 ottobre 2024. Scorri tutti i turni per vedere l'andamento.
                      </p>
                      <button onClick={() => { setClasseSelezionata('AD0J'); setSearchClasse('AD0J — Sostegno - Scuola Primaria'); setProvinciaSelezionata('PN'); }}
                        className="mt-2 text-xs font-semibold text-blue-700 hover:text-blue-900 transition flex items-center gap-1">
                        Visualizza timeline <ChevronRight size={12} />
                      </button>
                    </div>
                  </div>
                </div>
              )}
            </div>

            {/* ALERT PUNTEGGIO */}
            {punteggioVal && classeSelezionata && (
              <PunteggioAlert punteggio={punteggioVal} entries={bollettiniFiltrati} classeCodice={classeSelezionata} />
            )}

            {/* RISULTATI */}
            <div className="mb-4 flex items-center justify-between">
              <h3 className="text-lg font-bold text-[#0F172A]">
                {classeSelezionata
                  ? (() => {
                      const cls = getClasseByCodice(classeSelezionata);
                      return cls ? `${cls.codice} — ${cls.materia}` : classeSelezionata;
                    })()
                  : 'Tutti i bollettini'}
                {provinciaSelezionata && ` — ${provinciaSelezionata}`}
                {tipoGraduatoria && ` · ${tipoGraduatoria}`}
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

            <div className="space-y-4">
              {useMemo(() => groupBollettini(bollettiniFiltrati), [bollettiniFiltrati]).slice(0, 50).map(group => (
                <BollettinoGroupBox key={group.key} group={group} punteggioMio={punteggioVal} />
              ))}
              {groupBollettini(bollettiniFiltrati).length > 50 && (
                <p className="text-center text-xs text-gray-400 py-4">
                  Mostrati i primi 50 gruppi. Affina i filtri per vedere di più.
                </p>
              )}
            </div>
          </>
        )}

        {/* ═══ TAB TUTTE LE CLASSI ═══ */}
        {tabAttiva === 'classi' && (
          <div className="space-y-4">
            {/* Search bar */}
            <div className="bg-white/70 backdrop-blur-md rounded-3xl shadow-soft border border-slate-200/60 p-6 mb-4">
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div className="relative">
                  <Search size={16} className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400" />
                  <input type="text" value={searchClasse} onChange={e => setSearchClasse(e.target.value)}
                    placeholder="Cerca per codice, materia o ordine scuola..."
                    className="w-full pl-11 pr-4 py-3 border border-slate-200 rounded-2xl focus:ring-2 focus:ring-brand-blu/20 outline-none text-sm" />
                </div>
                <select value={ordineScuola} onChange={e => setOrdineScuola(e.target.value)}
                  className="w-full border border-slate-200 rounded-2xl px-4 py-3 focus:ring-2 focus:ring-brand-blu transition bg-white text-sm">
                  <option value="">Tutti gli ordini scuola</option>
                  {ORDINI_SCUOLA.map(o => (
                    <option key={o} value={o}>{ORDINI_SCUOLA_LABELS[o] || o}</option>
                  ))}
                </select>
              </div>
            </div>

            {/* Group by ordine scuola */}
            {ORDINI_SCUOLA.map(ordine => {
              const classi = classiFiltrate.filter(c => c.ordineScuola === ordine);
              if (classi.length === 0) return null;

              const isExpanded = expandedFascia === ordine;
              const fascie = ['A', 'B', 'S'] as const;

              return (
                <div key={ordine} className="bg-white/70 backdrop-blur-md rounded-3xl shadow-soft border border-slate-200/60 overflow-hidden">
                  <button
                    onClick={() => setExpandedFascia(isExpanded ? null : ordine)}
                    className="w-full p-4 bg-gradient-to-r from-brand-blu/5 to-transparent border-b border-slate-200/60 flex items-center justify-between hover:bg-brand-blu/8 transition"
                  >
                    <div className="flex items-center gap-3">
                      <h3 className="font-bold text-brand-blu text-sm">{ORDINI_SCUOLA_LABELS[ordine] || ordine}</h3>
                      <span className="text-[10px] bg-brand-blu/10 text-brand-blu px-2 py-0.5 rounded-full font-semibold">
                        {classi.length} classi
                      </span>
                    </div>
                    <ChevronDown size={16} className={`text-gray-400 transition-transform ${isExpanded ? 'rotate-180' : ''}`} />
                  </button>

                  {isExpanded && (
                    <div className="divide-y divide-slate-100">
                      {fascie.map(fascia => {
                        const classiDiFascia = classi.filter(c => c.fascia === fascia);
                        if (classiDiFascia.length === 0) return null;
                        return (
                          <div key={fascia}>
                            <div className="px-4 py-2 bg-slate-50/50">
                              <span className={`text-[10px] font-bold px-2 py-0.5 rounded-full ${FASCIA_COLORS[fascia]}`}>
                                {fascia === 'A' ? 'A — Abilitati' : fascia === 'B' ? 'B — Laboratori/Professionalizzanti' : 'S — Sostegno'}
                              </span>
                              <span className="text-[10px] text-gray-400 ml-2">{classiDiFascia.length} classi</span>
                            </div>
                            {classiDiFascia.map(classe => {
                              const sintesi = getSintesiByClasse(classe.codice);
                              return (
                                <button
                                  key={classe.codice}
                                  onClick={() => {
                                    setClasseSelezionata(classe.codice);
                                    setSearchClasse(`${classe.codice} — ${classe.materia}`);
                                    setTabAttiva('ricerca');
                                  }}
                                  className="w-full flex items-center justify-between p-4 hover:bg-brand-blu/5 transition text-left"
                                >
                                  <div className="flex items-center gap-3">
                                    <span className="px-2.5 py-1 bg-brand-blu/10 text-brand-blu text-xs font-bold rounded-lg">
                                      {classe.codice}
                                    </span>
                                    <div>
                                      <p className="text-sm font-semibold text-[#0F172A]">{classe.materia}</p>
                                      {sintesi && (
                                        <p className="text-[10px] text-gray-500 mt-0.5">
                                          {sintesi.totalePosizioni} pos. assegnate · {sintesi.provinceAttive} province · Punteggio min: {sintesi.punteggioMinimoNazionale}
                                          {sintesi.totaleCandidati > 0 && (
                                            <> · Rapporto: {(sintesi.totaleCandidati / Math.max(sintesi.totalePosizioni, 1)).toFixed(1)}:1</>
                                          )}
                                        </p>
                                      )}
                                    </div>
                                  </div>
                                  <ChevronRight size={16} className="text-gray-400 flex-shrink-0" />
                                </button>
                              );
                            })}
                          </div>
                        );
                      })}
                    </div>
                  )}
                </div>
              );
            })}
          </div>
        )}

        {/* ═══ INFO BOX ═══ */}
        <div className="mt-8 bg-gradient-to-r from-brand-blu/5 to-brand-verde/5 rounded-3xl border border-brand-blu/10 p-6">
          <h3 className="text-lg font-bold text-brand-blu mb-2 flex items-center gap-2">
            <Info size={18} /> Come funzionano le Nomine GPS
          </h3>
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
            Dati riferiti all'anno scolastico 2024/25 — Classi di concorso DM 259/17.
            I punteggi variano annualmente in base a quanti posti vengono banditi e quanti candidati partecipano.
            Fonte: bollettini USP. Per aggiornamenti in tempo reale, consulta il Centro Nazionale Interpelli.
          </p>
        </div>
      </div>
    </div>
  );
}

// ═══ STAT CARD ═══

function StatCard({ value, label, icon, color, small }: {
  value: string;
  label: string;
  icon: React.ReactNode;
  color: string;
  small?: boolean;
}) {
  return (
    <div className={`bg-white/80 backdrop-blur rounded-2xl border border-slate-200/60 ${small ? 'p-3' : 'p-4'} text-center`}>
      <p className={`${small ? 'text-xl' : 'text-3xl'} font-extrabold ${color}`}>{value}</p>
      <p className="text-[10px] text-gray-500 flex items-center justify-center gap-1">{icon} {label}</p>
    </div>
  );
}

// ═══ PUNTEGGIO ANALISI ═══

function PunteggioAnalisi({ punteggio, entries }: { punteggio: number; entries: BollettinoEntry[] }) {
  if (entries.length === 0) return null;

  const minGlob = Math.min(...entries.map(e => e.punteggioMinimo));
  const maxGlob = Math.max(...entries.map(e => e.punteggioMassimo));
  const inRange = punteggio >= minGlob && punteggio <= maxGlob;
  const aboveMax = punteggio > maxGlob;

  return (
    <p className="text-[10px] mt-1 font-semibold">
      {aboveMax ? (
        <span className="text-green-600">Sopra il massimo ({maxGlob}) — ottime possibilità di chiamata!</span>
      ) : inRange ? (
        <span className="text-amber-600">Nella fascia ({minGlob} — {maxGlob}) — hai possibilità concrete.</span>
      ) : (
        <span className="text-red-500">Sotto il minimo ({minGlob}) — valuta di migliorare i titoli.</span>
      )}
    </p>
  );
}

// ═══ PUNTEGGIO ALERT ═══

function PunteggioAlert({ punteggio, entries, classeCodice }: {
  punteggio: number;
  entries: BollettinoEntry[];
  classeCodice: string;
}) {
  if (entries.length === 0) return null;

  const minGlob = Math.min(...entries.map(e => e.punteggioMinimo));
  const maxGlob = Math.max(...entries.map(e => e.punteggioMassimo));
  const aboveMax = punteggio > maxGlob;
  const inRange = punteggio >= minGlob && punteggio <= maxGlob;

  const countInRange = entries.filter(e => punteggio >= e.punteggioMinimo).length;
  const classe = getClasseByCodice(classeCodice);

  return (
    <div className={`mb-6 rounded-3xl p-5 border ${aboveMax ? 'bg-green-50 border-green-200' : inRange ? 'bg-amber-50 border-amber-200' : 'bg-red-50 border-red-200'}`}>
      <div className="flex items-start gap-3">
        {aboveMax
          ? <CheckCircle size={20} className="text-green-600 mt-0.5 flex-shrink-0" />
          : inRange
          ? <AlertTriangle size={20} className="text-amber-600 mt-0.5 flex-shrink-0" />
          : <AlertTriangle size={20} className="text-red-600 mt-0.5 flex-shrink-0" />}
        <div>
          <p className={`font-bold text-sm ${aboveMax ? 'text-green-800' : inRange ? 'text-amber-800' : 'text-red-800'}`}>
            Con punteggio {punteggio} punti — {classe?.codice} ({classe?.materia})
          </p>
          <p className="text-xs text-gray-600 mt-1">
            {aboveMax
              ? `Sei sopra il punteggio massimo registrato (${maxGlob}) per ${classeCodice}. Hai ottime possibilità di essere chiamato!`
              : inRange
              ? `Il tuo punteggio rientra nella fascia delle nominate reali (${minGlob} — ${maxGlob}). Sei in corsa per ${countInRange} bollettini su ${entries.length}. Le probabilità dipendono dalla tua posizione in graduatoria e dalla disponibilità posti.`
              : `Il punteggio minimo registrato per ${classeCodice} è ${minGlob}. Con ${punteggio} punti, sei sotto la soglia. Considera di migliorare i titoli o di acquisire ulteriori CFU.`}
          </p>
        </div>
      </div>
    </div>
  );
}

// ═══ GROUPED BOLLETTINI — one box per classe+provincia ═══

interface BollettinoGroup {
  key: string;
  classeCodice: string;
  provinciaSigla: string;
  entries: BollettinoEntry[];
}

function groupBollettini(entries: BollettinoEntry[]): BollettinoGroup[] {
  const map = new Map<string, BollettinoEntry[]>();
  for (const e of entries) {
    const key = `${e.classeCodice}|${e.provinciaSigla}`;
    const arr = map.get(key);
    if (arr) arr.push(e); else map.set(key, [e]);
  }
  return Array.from(map.values()).map(arr => ({
    key: `${arr[0].classeCodice}|${arr[0].provinciaSigla}`,
    classeCodice: arr[0].classeCodice,
    provinciaSigla: arr[0].provinciaSigla,
    entries: arr.sort((a, b) => b.turno - a.turno),
  }));
}

function BollettinoGroupBox({ group, punteggioMio }: { group: BollettinoGroup; punteggioMio: number | null }) {
  const classe = getClasseByCodice(group.classeCodice);
  const usp = getUSPBySigla(group.provinciaSigla);
  const latest = group.entries[0];
  const minPunteggio = Math.min(...group.entries.map(e => e.punteggioMinimo));
  const maxPunteggio = Math.max(...group.entries.map(e => e.punteggioMassimo));
  const totPosizioni = group.entries.reduce((s, e) => s + e.posizioniAssegnate, 0);
  const totCandidati = group.entries.reduce((s, e) => s + e.candidatiInGraduatoria, 0);
  const rapporto = totCandidati > 0 && totPosizioni > 0 ? (totCandidati / totPosizioni).toFixed(1) : '—';
  const haChance = punteggioMio !== null && punteggioMio >= minPunteggio;
  const eSopraMax = punteggioMio !== null && punteggioMio > maxPunteggio;

  return (
    <div className={`rounded-3xl border p-5 transition-all ${
      haChance ? 'bg-green-50/50 border-green-200 shadow-md'
        : punteggioMio !== null ? 'bg-red-50/30 border-red-100'
        : 'bg-white border-slate-200/60 hover:border-brand-blu/20 shadow-soft'
    }`}>
      {/* Header */}
      <div className="flex items-start justify-between mb-3">
        <div className="flex items-center gap-2 flex-wrap">
          <span className="px-2 py-0.5 bg-brand-blu/10 text-brand-blu text-xs font-bold rounded-full">{group.provinciaSigla}</span>
          <span className="text-xs text-gray-500">{usp?.nome || group.provinciaSigla}</span>
          <span className="text-[10px] font-bold text-brand-blu">{classe?.codice || group.classeCodice}</span>
          {classe && <span className={`text-[9px] font-bold px-1.5 py-0.5 rounded-full ${FASCIA_COLORS[classe.fascia] || 'bg-gray-100'}`}>Fascia {classe.fascia}</span>}
        </div>
        <span className="text-[10px] bg-slate-100 text-slate-600 px-2 py-0.5 rounded-full font-semibold">{group.entries.length} turni</span>
      </div>

      {classe && <p className="text-[11px] text-gray-500 mb-1">{classe.materia} · {ORDINI_SCUOLA_LABELS[classe.ordineScuola] || classe.ordineScuola}</p>}

      {/* Punteggi riepilogo */}
      <div className="grid grid-cols-3 gap-2 mb-3">
        <div className="bg-brand-blu/5 rounded-2xl p-2.5">
          <p className="text-[9px] text-gray-500 mb-0.5">Min. Chiamato</p>
          <p className="text-lg font-extrabold text-brand-blu">{minPunteggio}</p>
        </div>
        <div className="bg-brand-verde/5 rounded-2xl p-2.5">
          <p className="text-[9px] text-gray-500 mb-0.5">Max. Chiamato</p>
          <p className="text-lg font-extrabold text-brand-verde">{maxPunteggio}</p>
        </div>
        <div className="bg-amber-50 rounded-2xl p-2.5">
          <p className="text-[9px] text-gray-500 mb-0.5">Pos. Ultima</p>
          <p className="text-lg font-extrabold text-amber-700">#{latest.posizioneUltimaConvocazione}</p>
        </div>
      </div>

      {/* Punteggio mio */}
      {punteggioMio !== null && (
        <div className={`mb-3 p-2 rounded-xl border text-xs ${
          eSopraMax ? 'bg-green-100 border-green-300 text-green-800'
            : haChance ? 'bg-green-50 border-green-200 text-green-700'
            : 'bg-red-50 border-red-200 text-red-700'
        }`}>
          {eSopraMax ? `✓ ${punteggioMio} pt — Sopra il massimo (${maxPunteggio}). Ottime possibilità!` :
           haChance ? `✓ ${punteggioMio} pt — Nella fascia (${minPunteggio}—${maxPunteggio}).` :
           `✗ ${punteggioMio} pt — Sotto il minimo (${minPunteggio}).`}
        </div>
      )}

      {/* Stats riga */}
      <div className="flex items-center justify-between text-[10px] text-gray-500 mb-3">
        <span><Target size={10} className="inline" /> {totPosizioni} pos. · <Users size={10} className="inline" /> {totCandidati} cand. · Rapporto {rapporto}:1</span>
        <span className={`text-[10px] font-bold px-2 py-0.5 rounded-full border ${COMPETIZIONE_COLORS[latest.competizione]}`}>{COMPETIZIONE_LABELS[latest.competizione]}</span>
      </div>

      {/* Tabella turni compatta */}
      <div className="overflow-x-auto">
        <table className="w-full text-[10px]">
          <thead>
            <tr className="text-gray-400 border-b border-slate-200">
              <th className="text-left py-1 font-semibold">Turno</th>
              <th className="text-left py-1 font-semibold">Graduatoria</th>
              <th className="text-right py-1 font-semibold">Min</th>
              <th className="text-right py-1 font-semibold">Max</th>
              <th className="text-right py-1 font-semibold">Pos.</th>
              <th className="text-right py-1 font-semibold">Posti</th>
              <th className="text-right py-1 font-semibold">Data</th>
            </tr>
          </thead>
          <tbody>
            {group.entries.map((e, i) => {
              const inRange = punteggioMio !== null && punteggioMio >= e.punteggioMinimo;
              return (
                <tr key={e.id} className={`border-b border-slate-100 last:border-0 ${i === 0 ? 'font-semibold' : ''} ${inRange ? 'bg-green-50/50' : ''}`}>
                  <td className="py-1.5">T{e.turno}</td>
                  <td className="py-1.5 text-gray-600">{e.tipoGraduatoria}</td>
                  <td className="py-1.5 text-right text-brand-blu">{e.punteggioMinimo}</td>
                  <td className="py-1.5 text-right text-brand-verde">{e.punteggioMassimo}</td>
                  <td className="py-1.5 text-right text-amber-700">#{e.posizioneUltimaConvocazione}</td>
                  <td className="py-1.5 text-right">{e.posizioniAssegnate}</td>
                  <td className="py-1.5 text-right text-gray-400">{new Date(e.dataBollettino).toLocaleDateString('it-IT', { day: '2-digit', month: 'short', year: '2-digit' })}</td>
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>
    </div>
  );
}
