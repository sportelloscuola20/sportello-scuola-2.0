import { useState, useEffect } from 'react';
import { CheckCircle, XCircle, FileText, Search, RefreshCw, AlertCircle, ExternalLink, Shield, Calendar } from 'lucide-react';
import { supabase } from '../lib/supabaseClient';
import type { DocumentoNormativo } from '../types/database';

const CATEGORIA_STILI: Record<string, string> = {
  'Decreti e Ordinanze Ministeriali': 'bg-blue-100 text-blue-700',
  'Bandi e Concorsi': 'bg-red-100 text-red-700',
  'Note e Circolari': 'bg-sky-100 text-sky-700',
  'Normativa Regionale': 'bg-purple-100 text-purple-700',
  'Contratti e CCNL': 'bg-teal-100 text-teal-700',
  'Modulistica': 'bg-amber-100 text-amber-700',
};

export default function DocumentiApprovalPageAR() {
  const [documenti, setDocumenti] = useState<DocumentoNormativo[]>([]);
  const [loading, setLoading] = useState(true);
  const [searchQuery, setSearchQuery] = useState('');
  const [filterValidated, setFilterValidated] = useState<string>('all');
  const [approving, setApproving] = useState<string | null>(null);

  const fetchDocumenti = async () => {
    setLoading(true);
    try {
      let query = supabase
        .from('documenti_normativi')
        .select('*')
        .order('created_at', { ascending: false })
        .limit(100);

      if (filterValidated === 'validated') query = query.eq('validated', true);
      else if (filterValidated === 'pending') query = query.eq('validated', false).eq('is_archived', false);
      else if (filterValidated === 'archived') query = query.eq('is_archived', true);

      const { data, error } = await query;
      if (!error && data) setDocumenti(data as DocumentoNormativo[]);
    } catch {}
    setLoading(false);
  };

  useEffect(() => { fetchDocumenti(); }, [filterValidated]);

  const handleApprove = async (doc: DocumentoNormativo) => {
    setApproving(doc.id);
    await supabase
      .from('documenti_normativi')
      .update({ validated: true, validated_at: new Date().toISOString(), validated_by: 'admin' })
      .eq('id', doc.id);
    setDocumenti(prev => prev.map(d => d.id === doc.id ? { ...d, validated: true, validated_at: new Date().toISOString() } : d));
    setApproving(null);
  };

  const handleReject = async (doc: DocumentoNormativo) => {
    setApproving(doc.id);
    await supabase
      .from('documenti_normativi')
      .update({ is_archived: true })
      .eq('id', doc.id);
    setDocumenti(prev => prev.filter(d => d.id !== doc.id));
    setApproving(null);
  };

  const filtered = documenti.filter(d => {
    if (!searchQuery) return true;
    const q = searchQuery.toLowerCase();
    return d.titolo.toLowerCase().includes(q) || (d.descrizione || '').toLowerCase().includes(q) || (d.abstract || '').toLowerCase().includes(q) || (d.ente || '').toLowerCase().includes(q);
  });

  return (
    <div>
      <div className="flex items-center justify-between mb-6">
        <div>
          <h1 className="text-2xl font-bold text-white">Gestione Documenti Normativi</h1>
          <p className="text-white/60 text-sm mt-1">Approva o archivia i documenti prima della pubblicazione.</p>
        </div>
        <button onClick={fetchDocumenti} disabled={loading}
          className="flex items-center gap-2 px-4 py-2 bg-white/10 text-white rounded-xl text-sm font-semibold hover:bg-white/20 transition disabled:opacity-50">
          <RefreshCw size={14} className={loading ? 'animate-spin' : ''} />
          Aggiorna
        </button>
      </div>

      <div className="flex flex-col sm:flex-row gap-3 items-center justify-between mb-6">
        <div className="flex gap-2 flex-wrap">
          {[
            { key: 'all', label: 'Tutti' },
            { key: 'pending', label: 'Da approvare' },
            { key: 'validated', label: 'Approvati' },
            { key: 'archived', label: 'Archiviati' },
          ].map(f => (
            <button key={f.key} onClick={() => setFilterValidated(f.key)}
              className={`px-4 py-2 rounded-2xl text-xs font-semibold transition-all ${
                filterValidated === f.key ? 'bg-brand-blu text-white' : 'bg-white/10 text-white/70 border border-white/10 hover:bg-white/20'
              }`}>{f.label}</button>
          ))}
        </div>
        <div className="relative w-full sm:w-64">
          <Search size={16} className="absolute left-3 top-1/2 -translate-y-1/2 text-white/40" />
          <input type="text" placeholder="Cerca documenti..." value={searchQuery}
            onChange={e => setSearchQuery(e.target.value)}
            className="w-full pl-9 pr-4 py-2 rounded-2xl border border-white/10 bg-white/5 text-white text-sm focus:ring-2 focus:ring-brand-blu/30 focus:border-brand-blu/50 transition outline-none placeholder-white/30" />
        </div>
      </div>

      {loading ? (
        <div className="flex items-center justify-center py-20">
          <RefreshCw size={32} className="animate-spin text-white/20" />
        </div>
      ) : filtered.length === 0 ? (
        <div className="text-center py-20">
          <AlertCircle size={48} className="mx-auto text-white/20 mb-4" />
          <p className="text-white/50">Nessun documento trovato.</p>
        </div>
      ) : (
        <div className="space-y-4">
          {filtered.map(doc => {
            const stile = CATEGORIA_STILI[doc.categoria] || 'bg-gray-100 text-gray-600';
            return (
              <div key={doc.id} className={`bg-white/5 backdrop-blur-md rounded-2xl p-5 border transition-all ${
                doc.validated ? 'border-green-500/20' : 'border-amber-500/20'
              }`}>
                <div className="flex items-start justify-between gap-4">
                  <div className="flex-1 min-w-0">
                    <div className="flex items-center gap-2 mb-2 flex-wrap">
                      <span className={`text-xs font-semibold px-2 py-0.5 rounded-full ${stile}`}>{doc.categoria}</span>
                      <span className="text-xs text-white/40">{doc.tipo}</span>
                      {doc.validated ? (
                        <span className="inline-flex items-center gap-1 text-xs text-green-400 bg-green-500/10 px-2 py-0.5 rounded-full">
                          <CheckCircle size={10} /> Approvato
                        </span>
                      ) : (
                        <span className="inline-flex items-center gap-1 text-xs text-amber-400 bg-amber-500/10 px-2 py-0.5 rounded-full">
                          <AlertCircle size={10} /> In attesa
                        </span>
                      )}
                    </div>
                    <h3 className="text-base font-bold text-white mb-1">{doc.titolo}</h3>
                    <p className="text-sm text-white/60 line-clamp-2 mb-2">{doc.descrizione || doc.abstract}</p>
                    <div className="flex flex-wrap gap-1.5">
                      {doc.ente && <span className="text-xs text-white/40 flex items-center gap-1"><Shield size={10} />{doc.ente}</span>}
                      {doc.anno && <span className="text-xs text-white/40">{doc.anno}</span>}
                      {doc.regione && <span className="text-xs text-white/40">{doc.regione}</span>}
                      <span className="text-xs text-white/40 flex items-center gap-1">
                        <Calendar size={10} /> {new Date(doc.created_at).toLocaleDateString('it-IT')}
                      </span>
                    </div>
                  </div>

                  <div className="flex flex-col gap-2 flex-shrink-0">
                    {!doc.validated ? (
                      <>
                        <button onClick={() => handleApprove(doc)} disabled={approving === doc.id}
                          className="flex items-center justify-center gap-2 px-4 py-2 bg-green-500/20 text-green-400 rounded-xl text-sm font-semibold hover:bg-green-500/30 transition disabled:opacity-50 min-w-[120px]">
                          {approving === doc.id ? <RefreshCw size={14} className="animate-spin" /> : <CheckCircle size={14} />}
                          Approva
                        </button>
                        <button onClick={() => handleReject(doc)} disabled={approving === doc.id}
                          className="flex items-center justify-center gap-2 px-4 py-2 bg-red-500/20 text-red-400 rounded-xl text-sm font-semibold hover:bg-red-500/30 transition disabled:opacity-50 min-w-[120px]">
                          <XCircle size={14} /> Archivia
                        </button>
                      </>
                    ) : (
                      <a href={doc.url_documento || '#'} target="_blank" rel="noopener noreferrer"
                        className="flex items-center justify-center gap-2 px-4 py-2 bg-white/10 text-white/70 rounded-xl text-sm font-semibold hover:bg-white/20 transition min-w-[120px]">
                        <ExternalLink size={14} /> Vedi
                      </a>
                    )}
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      )}
    </div>
  );
}
