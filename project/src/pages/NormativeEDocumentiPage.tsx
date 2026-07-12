import { useState, useMemo } from 'react';
import {
  Search, Filter, FileText, BookOpen, Building, ShieldCheck, List, ExternalLink,
  X, AlertCircle, Calendar, Tag, Users, ChevronDown, ChevronUp, RefreshCw,
  GraduationCap, Download,
} from 'lucide-react';
import {
  DOCUMENTI_NORMATIVI,
  type DocumentoNormativo,
} from '../data/normative-ufficiali';

const CATEGORIE = [...new Set(DOCUMENTI_NORMATIVI.map(d => d.categoria))].sort();
const TIPI = [...new Set(DOCUMENTI_NORMATIVI.map(d => d.tipo))].sort();
const TUTTI_I_TARGET = [...new Set(DOCUMENTI_NORMATIVI.flatMap(d => d.target))].sort();

const CATEGORIA_ICONA: Record<string, typeof FileText> = {
  'Classi di concorso e Abilitazione': GraduationCap,
  'Graduatorie (GPS, GAE, d\'Istituto)': List,
  'Bandi, Concorsi e Selezioni': GraduationCap,
  'Contratti, Salari e Personale ATA': ShieldCheck,
  'Normative, Note e Circolari Ministeriali': BookOpen,
  'Didattica, Formazione e Innovazione': Building,
  'Mobilità, Assegnazioni e Utilizzazioni': Building,
  'Esami di Stato e Valutazioni (INVALSI)': FileText,
};

const CATEGORIA_STILI: Record<string, string> = {
  'Classi di concorso e Abilitazione': 'bg-blue-100 text-blue-700',
  'Graduatorie (GPS, GAE, d\'Istituto)': 'bg-purple-100 text-purple-700',
  'Bandi, Concorsi e Selezioni': 'bg-red-100 text-red-700',
  'Contratti, Salari e Personale ATA': 'bg-teal-100 text-teal-700',
  'Normative, Note e Circolari Ministeriali': 'bg-sky-100 text-sky-700',
  'Didattica, Formazione e Innovazione': 'bg-amber-100 text-amber-700',
  'Mobilità, Assegnazioni e Utilizzazioni': 'bg-indigo-100 text-indigo-700',
  'Esami di Stato e Valutazioni (INVALSI)': 'bg-rose-100 text-rose-700',
};

const RILEVANZA_STILI: Record<string, string> = {
  alta: 'bg-red-50 text-red-700 border-red-200',
  media: 'bg-amber-50 text-amber-700 border-amber-200',
  bassa: 'bg-gray-50 text-gray-500 border-gray-200',
};

export default function NormativeEDocumentiPage() {
  const [activeCategory, setActiveCategory] = useState('Tutte');
  const [activeTipo, setActiveTipo] = useState('Tutti');
  const [activeTarget, setActiveTarget] = useState('Tutti');
  const [activeRilevanza, setActiveRilevanza] = useState('Tutte');
  const [searchQuery, setSearchQuery] = useState('');
  const [previewDoc, setPreviewDoc] = useState<DocumentoNormativo | null>(null);
  const [expandedId, setExpandedId] = useState<string | null>(null);
  const [viewMode, setViewMode] = useState<'byCategory' | 'list'>('byCategory');

  const filtered = useMemo(() => {
    let result = [...DOCUMENTI_NORMATIVI];

    if (activeCategory !== 'Tutte') {
      result = result.filter(d => d.categoria === activeCategory);
    }
    if (activeTipo !== 'Tutti') {
      result = result.filter(d => d.tipo === activeTipo);
    }
    if (activeTarget !== 'Tutti') {
      result = result.filter(d => d.target.includes(activeTarget));
    }
    if (activeRilevanza !== 'Tutte') {
      result = result.filter(d => d.rilevanza === activeRilevanza);
    }
    if (searchQuery.trim()) {
      const q = searchQuery.toLowerCase();
      result = result.filter(d =>
        d.titolo.toLowerCase().includes(q) ||
        d.descrizione.toLowerCase().includes(q) ||
        d.riassunto.toLowerCase().includes(q) ||
        d.numero.toLowerCase().includes(q) ||
        d.categoria.toLowerCase().includes(q) ||
        d.emanatoDa.toLowerCase().includes(q) ||
        d.target.some(t => t.toLowerCase().includes(q))
      );
    }

    return result;
  }, [activeCategory, activeTipo, activeTarget, activeRilevanza, searchQuery]);

  const groupedByCategory = useMemo(() => {
    const groups: Record<string, DocumentoNormativo[]> = {};
    for (const doc of filtered) {
      if (!groups[doc.categoria]) groups[doc.categoria] = [];
      groups[doc.categoria].push(doc);
    }
    return groups;
  }, [filtered]);

  const stats = useMemo(() => {
    const alta = DOCUMENTI_NORMATIVI.filter(d => d.rilevanza === 'alta').length;
    return { total: DOCUMENTI_NORMATIVI.length, alta };
  }, []);

  return (
    <div className="min-h-screen py-8 px-4">
      <div className="max-w-6xl mx-auto">
        <div className="text-center mb-8">
          <h1 className="text-3xl font-bold text-[#0F172A] mb-2">Normative e Documenti Ufficiali</h1>
          <p className="text-gray-600 text-sm max-w-2xl mx-auto">
            Archivio centralizzato di decreti, leggi, ordinanze e circolari ministeriali.
            {stats.total} documenti ufficiali dalla Gazzetta Ufficiale, normattiva.it e MIM.
          </p>
          <div className="flex items-center justify-center gap-6 mt-4 text-xs text-gray-500">
            <span>{stats.total} documenti totali</span>
            <span>{stats.alta} ad alta rilevanza</span>
            <span>{CATEGORIE.length} categorie</span>
          </div>
        </div>

        <div className="bg-white/70 backdrop-blur-md rounded-3xl shadow-soft border border-slate-200/60 p-6 sm:p-8 mb-8">
          <div className="flex flex-col sm:flex-row gap-4 items-start sm:items-center justify-between mb-6">
            <h2 className="text-lg font-semibold text-brand-blu flex items-center gap-2">
              <Filter size={18} /> Ricerca e Filtri
            </h2>
            <div className="flex gap-2">
              <button onClick={() => setViewMode('byCategory')}
                className={`px-3 py-1.5 rounded-xl text-xs font-semibold transition ${viewMode === 'byCategory' ? 'bg-brand-blu text-white' : 'bg-gray-100 text-gray-600 hover:bg-gray-200'}`}>
                Per Categoria
              </button>
              <button onClick={() => setViewMode('list')}
                className={`px-3 py-1.5 rounded-xl text-xs font-semibold transition ${viewMode === 'list' ? 'bg-brand-blu text-white' : 'bg-gray-100 text-gray-600 hover:bg-gray-200'}`}>
                Lista
              </button>
            </div>
          </div>

          <div className="mb-4">
            <label className="block text-sm font-medium text-gray-700 mb-1">Cerca documenti</label>
            <div className="relative">
              <Search size={16} className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" />
              <input
                type="text"
                placeholder="Titolo, numero decreto, categoria, ente emanatore..."
                value={searchQuery}
                onChange={e => setSearchQuery(e.target.value)}
                className="w-full pl-9 pr-4 py-3 border border-slate-200 rounded-2xl focus:ring-2 focus:ring-brand-blu transition bg-white text-sm outline-none"
              />
            </div>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Tipo</label>
              <select value={activeTipo} onChange={e => setActiveTipo(e.target.value)}
                className="w-full border border-slate-200 rounded-2xl px-4 py-2.5 focus:ring-2 focus:ring-brand-blu transition bg-white text-sm">
                <option value="Tutti">Tutti i tipi</option>
                {TIPI.map(t => <option key={t} value={t}>{t}</option>)}
              </select>
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Categoria</label>
              <select value={activeCategory} onChange={e => setActiveCategory(e.target.value)}
                className="w-full border border-slate-200 rounded-2xl px-4 py-2.5 focus:ring-2 focus:ring-brand-blu transition bg-white text-sm">
                <option value="Tutte">Tutte le categorie</option>
                {CATEGORIE.map(c => <option key={c} value={c}>{c}</option>)}
              </select>
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Target</label>
              <select value={activeTarget} onChange={e => setActiveTarget(e.target.value)}
                className="w-full border border-slate-200 rounded-2xl px-4 py-2.5 focus:ring-2 focus:ring-brand-blu transition bg-white text-sm">
                <option value="Tutti">Tutti</option>
                {TUTTI_I_TARGET.map(t => <option key={t} value={t}>{t}</option>)}
              </select>
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Rilevanza</label>
              <select value={activeRilevanza} onChange={e => setActiveRilevanza(e.target.value)}
                className="w-full border border-slate-200 rounded-2xl px-4 py-2.5 focus:ring-2 focus:ring-brand-blu transition bg-white text-sm">
                <option value="Tutte">Tutte</option>
                <option value="alta">Alta</option>
                <option value="media">Media</option>
                <option value="bassa">Bassa</option>
              </select>
            </div>
          </div>

          <div className="mt-4 flex items-center justify-between">
            <p className="text-xs text-gray-500">{filtered.length} document{filtered.length !== 1 ? 'i' : 'o'} trovato{filtered.length !== 1 ? 'i' : ''}</p>
            {(activeCategory !== 'Tutte' || activeTipo !== 'Tutti' || activeTarget !== 'Tutti' || activeRilevanza !== 'Tutte' || searchQuery) && (
              <button onClick={() => { setActiveCategory('Tutte'); setActiveTipo('Tutti'); setActiveTarget('Tutti'); setActiveRilevanza('Tutte'); setSearchQuery(''); }}
                className="px-3 py-1.5 bg-gray-100 text-gray-600 rounded-xl text-xs font-medium hover:bg-gray-200 transition">
                Resetta filtri
              </button>
            )}
          </div>
        </div>

        {filtered.length === 0 ? (
          <div className="text-center py-16">
            <AlertCircle size={48} className="text-gray-200 mx-auto mb-4" />
            <p className="text-gray-500 text-sm">Nessun documento trovato con i filtri selezionati</p>
            <p className="text-gray-400 text-xs mt-1">Prova a modificare i criteri di ricerca</p>
          </div>
        ) : viewMode === 'byCategory' ? (
          <div className="space-y-10">
            {Object.entries(groupedByCategory).map(([cat, docs]) => {
              const Icon = CATEGORIA_ICONA[cat] || FileText;
              const stile = CATEGORIA_STILI[cat] || 'bg-gray-100 text-gray-600';
              return (
                <div key={cat}>
                  <div className="flex items-center gap-3 mb-4">
                    <div className={`w-10 h-10 rounded-2xl flex items-center justify-center ${stile}`}>
                      <Icon size={20} />
                    </div>
                    <div>
                      <h2 className="text-lg font-bold text-[#0F172A]">{cat}</h2>
                      <p className="text-xs text-gray-500">{docs.length} document{docs.length !== 1 ? 'i' : ''}</p>
                    </div>
                  </div>
                  <div className="grid gap-4 md:grid-cols-2">
                    {docs.map(doc => (
                      <DocCard key={doc.id} doc={doc} expandedId={expandedId} setExpandedId={setExpandedId} setPreviewDoc={setPreviewDoc} />
                    ))}
                  </div>
                </div>
              );
            })}
          </div>
        ) : (
          <div className="space-y-3">
            {filtered.map(doc => (
              <DocCard key={doc.id} doc={doc} expandedId={expandedId} setExpandedId={setExpandedId} setPreviewDoc={setPreviewDoc} />
            ))}
          </div>
        )}
      </div>

      {previewDoc && (
        <div className="fixed inset-0 z-50 bg-black/30 backdrop-blur-sm flex items-center justify-center p-4" onClick={() => setPreviewDoc(null)}>
          <div className="bg-white rounded-3xl max-w-2xl w-full max-h-[85vh] overflow-y-auto shadow-2xl border border-slate-200/60 p-6" onClick={e => e.stopPropagation()}>
            <div className="flex items-start justify-between mb-4">
              <div className="flex-1">
                <div className="flex items-center gap-2 mb-2 flex-wrap">
                  <span className={`text-xs font-semibold px-2.5 py-0.5 rounded-full ${CATEGORIA_STILI[previewDoc.categoria] || 'bg-gray-100 text-gray-600'}`}>
                    {previewDoc.tipo}
                  </span>
                  <span className={`text-xs font-semibold px-2.5 py-0.5 rounded-full border ${RILEVANZA_STILI[previewDoc.rilevanza]}`}>
                    Rilevanza {previewDoc.rilevanza}
                  </span>
                </div>
                <h3 className="text-xl font-bold text-[#0F172A]">{previewDoc.titolo}</h3>
              </div>
              <button onClick={() => setPreviewDoc(null)} className="p-2 hover:bg-gray-100 rounded-xl transition ml-4 shrink-0">
                <X size={20} className="text-gray-500" />
              </button>
            </div>

            <div className="space-y-4 text-sm">
              <div className="grid grid-cols-2 gap-3">
                <div className="bg-gray-50 rounded-xl p-3">
                  <span className="text-xs text-gray-400 block">Numero</span>
                  <span className="font-semibold text-gray-800">{previewDoc.numero}</span>
                </div>
                <div className="bg-gray-50 rounded-xl p-3">
                  <span className="text-xs text-gray-400 block">Data</span>
                  <span className="font-semibold text-gray-800">{new Date(previewDoc.data).toLocaleDateString('it-IT')}</span>
                </div>
                <div className="bg-gray-50 rounded-xl p-3">
                  <span className="text-xs text-gray-400 block">Emanato da</span>
                  <span className="font-semibold text-gray-800 text-xs">{previewDoc.emanatoDa}</span>
                </div>
                <div className="bg-gray-50 rounded-xl p-3">
                  <span className="text-xs text-gray-400 block">Categoria</span>
                  <span className="font-semibold text-gray-800 text-xs">{previewDoc.categoria}</span>
                </div>
              </div>

              <div>
                <h4 className="font-semibold text-gray-700 mb-1">Descrizione</h4>
                <p className="text-gray-600 leading-relaxed">{previewDoc.descrizione}</p>
              </div>

              <div>
                <h4 className="font-semibold text-gray-700 mb-1">Riassunto</h4>
                <div className="bg-blue-50/50 rounded-2xl p-4 text-gray-700 leading-relaxed text-sm border border-blue-100">
                  {previewDoc.riassunto}
                </div>
              </div>

              <div>
                <h4 className="font-semibold text-gray-700 mb-2">Destinatari</h4>
                <div className="flex flex-wrap gap-1.5">
                  {previewDoc.target.map(t => (
                    <span key={t} className="text-xs px-2.5 py-1 rounded-full bg-brand-blu/10 text-brand-blu font-medium">{t}</span>
                  ))}
                </div>
              </div>

              {previewDoc.url && (
                <a href={previewDoc.url} target="_blank" rel="noopener noreferrer"
                  className="inline-flex items-center gap-2 px-5 py-2.5 bg-brand-blu text-white rounded-2xl text-sm font-semibold hover:bg-brand-blu/90 transition mt-2">
                  <ExternalLink size={14} /> Consulta il testo originale
                </a>
              )}
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

function DocCard({
  doc, expandedId, setExpandedId, setPreviewDoc,
}: {
  doc: DocumentoNormativo;
  expandedId: string | null;
  setExpandedId: (id: string | null) => void;
  setPreviewDoc: (doc: DocumentoNormativo) => void;
}) {
  const isExpanded = expandedId === doc.id;
  const stile = CATEGORIA_STILI[doc.categoria] || 'bg-gray-100 text-gray-600';

  return (
    <div className="bg-white/70 backdrop-blur-md rounded-2xl border border-slate-200/60 hover:border-brand-blu/20 hover:shadow-sm transition-all duration-200">
      <div className="p-4 sm:p-5">
        <div className="flex items-start justify-between gap-3">
          <div className="flex-1 min-w-0">
            <div className="flex items-center gap-2 mb-1.5 flex-wrap">
              <span className={`text-xs font-semibold px-2 py-0.5 rounded-full ${stile}`}>{doc.tipo}</span>
              <span className={`text-xs font-semibold px-2 py-0.5 rounded-full border ${RILEVANZA_STILI[doc.rilevanza]}`}>
                {doc.rilevanza}
              </span>
            </div>
            <h3 className="font-semibold text-[#0F172A] text-sm leading-snug">{doc.titolo}</h3>
            <div className="flex items-center gap-3 mt-1.5 text-xs text-gray-500 flex-wrap">
              <span className="flex items-center gap-1">
                <Tag size={11} /> {doc.numero}
              </span>
              <span className="flex items-center gap-1">
                <Calendar size={11} /> {new Date(doc.data).toLocaleDateString('it-IT')}
              </span>
            </div>
            <p className="text-xs text-gray-500 mt-1 line-clamp-2">{doc.riassunto}</p>
          </div>

          <div className="shrink-0 flex items-center gap-1.5">
            <button onClick={() => setExpandedId(isExpanded ? null : doc.id)}
              className="p-2 bg-gray-100 text-gray-500 rounded-xl hover:bg-gray-200 transition"
              title="Dettagli">
              {isExpanded ? <ChevronUp size={14} /> : <ChevronDown size={14} />}
            </button>
            {doc.url && (
              <a href={doc.url} target="_blank" rel="noopener noreferrer"
                className="p-2 bg-brand-blu/10 text-brand-blu rounded-xl hover:bg-brand-blu/20 transition inline-block"
                title="Testo ufficiale">
                <ExternalLink size={14} />
              </a>
            )}
          </div>
        </div>

        {isExpanded && (
          <div className="mt-4 pt-4 border-t border-slate-100 space-y-3">
            <p className="text-sm text-gray-600 leading-relaxed">{doc.descrizione}</p>
            <div className="bg-blue-50/50 rounded-xl p-3 border border-blue-100">
              <h4 className="text-xs font-semibold text-blue-800 mb-1 uppercase tracking-wide">Riassunto</h4>
              <p className="text-sm text-gray-700 leading-relaxed">{doc.riassunto}</p>
            </div>
            <div>
              <h4 className="text-xs font-semibold text-gray-700 mb-1.5 uppercase tracking-wide">Destinatari</h4>
              <div className="flex flex-wrap gap-1.5">
                {doc.target.map(t => (
                  <span key={t} className="text-xs px-2.5 py-1 rounded-full bg-brand-blu/10 text-brand-blu font-medium">{t}</span>
                ))}
              </div>
            </div>
            <div className="flex items-center gap-2 text-xs text-gray-400">
              <Building size={12} /> {doc.emanatoDa}
            </div>
            <div className="flex flex-wrap gap-2">
              {doc.url && (
                <a href={doc.url} target="_blank" rel="noopener noreferrer"
                  className="inline-flex items-center gap-2 px-4 py-2 bg-brand-blu text-white rounded-2xl text-xs font-semibold hover:bg-brand-blu/90 transition">
                  <ExternalLink size={12} /> Testo Originale
                </a>
              )}
              <button onClick={() => setPreviewDoc(doc)}
                className="inline-flex items-center gap-2 px-4 py-2 bg-brand-verde/10 text-brand-verde rounded-2xl text-xs font-semibold hover:bg-brand-verde/20 transition">
                <FileText size={12} /> Vista Completa
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
