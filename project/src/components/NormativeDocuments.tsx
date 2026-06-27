import { useState, useEffect } from 'react';
import { FileText, BookOpen, Building, ShieldCheck, List, Download, ExternalLink, X, Search, GraduationCap, AlertCircle, RefreshCw } from 'lucide-react';
import { jsPDF } from 'jspdf';
import { supabase } from '../lib/supabaseClient';
import type { DocumentoNormativo } from '../types/database';

const CATEGORIE = ['Tutte', 'Decreti e Ordinanze Ministeriali', 'Bandi e Concorsi', 'Note e Circolari', 'Normativa Regionale', 'Contratti e CCNL', 'Modulistica'];

const CATEGORIA_STILI: Record<string, string> = {
  'Decreti e Ordinanze Ministeriali': 'bg-blue-100 text-blue-700 border-blue-200',
  'Bandi e Concorsi': 'bg-red-100 text-red-700 border-red-200',
  'Note e Circolari': 'bg-sky-100 text-sky-700 border-sky-200',
  'Normativa Regionale': 'bg-purple-100 text-purple-700 border-purple-200',
  'Contratti e CCNL': 'bg-teal-100 text-teal-700 border-teal-200',
  'Modulistica': 'bg-amber-100 text-amber-700 border-amber-200',
};

const CATEGORIA_ICONA: Record<string, typeof FileText> = {
  'Decreti e Ordinanze Ministeriali': FileText,
  'Bandi e Concorsi': GraduationCap,
  'Note e Circolari': BookOpen,
  'Normativa Regionale': Building,
  'Contratti e CCNL': ShieldCheck,
  'Modulistica': List,
};

function downloadPDF(doc: DocumentoNormativo) {
  const filename = `${doc.tipo}_${doc.numero || doc.id}.pdf`.replace(/\s+/g, '_');
  const content = `TITOLO: ${doc.titolo}\n\n${doc.abstract || doc.descrizione}\n\nEnte: ${doc.ente || 'n/d'}\nAnno: ${doc.anno || 'n/d'}\nPubblicazione: ${new Date(doc.data_pubblicazione).toLocaleDateString('it-IT')}\nRegione: ${doc.regione || 'nazionale'}\nTag: ${(doc.tags || []).join(', ')}`;

  const pdf = new jsPDF({ orientation: 'portrait', unit: 'mm', format: 'a4' });
  const margin = 20;
  const pageWidth = pdf.internal.pageSize.getWidth();
  const contentWidth = pageWidth - margin * 2;

  pdf.setFontSize(10);
  pdf.setTextColor(0x0F, 0x17, 0x2A);
  pdf.setFont('helvetica', 'bold');
  pdf.text(doc.titolo, margin, margin);

  pdf.setDrawColor(0x0F, 0x17, 0x2A);
  pdf.line(margin, margin + 3, pageWidth - margin, margin + 3);

  pdf.setFontSize(9);
  pdf.setTextColor(0x4B, 0x55, 0x63);
  pdf.setFont('helvetica', 'normal');

  const lines = pdf.splitTextToSize(content, contentWidth);
  let y = margin + 12;
  for (const line of lines) {
    if (y > 275) { pdf.addPage(); y = margin; }
    pdf.text(line, margin, y);
    y += 5;
  }

  pdf.setFontSize(8);
  pdf.setTextColor(0x9C, 0xA3, 0xAF);
  pdf.text('Documento generato da Sportello Scuola 2.0 — Fonte: MIM / Gazzetta Ufficiale', margin, 290);
  pdf.text(`Pagina ${pdf.internal.pages.length - 1}`, pageWidth - margin, 290, { align: 'right' });

  const pageCount = pdf.internal.pages.length - 1;
  for (let i = 1; i <= pageCount; i++) {
    pdf.setPage(i);
    pdf.setFontSize(8);
    pdf.setTextColor(0x9C, 0xA3, 0xAF);
    pdf.text(`Sportello Scuola 2.0 — ${doc.titolo}`, margin, 295);
    pdf.text(`Pagina ${i} di ${pageCount}`, pageWidth - margin, 295, { align: 'right' });
  }

  pdf.save(filename);
}

export default function NormativeDocuments() {
  const [activeCategory, setActiveCategory] = useState('Tutte');
  const [previewDoc, setPreviewDoc] = useState<DocumentoNormativo | null>(null);
  const [searchQuery, setSearchQuery] = useState('');
  const [documenti, setDocumenti] = useState<DocumentoNormativo[]>([]);
  const [loading, setLoading] = useState(true);

  const fetchDocumenti = async () => {
    setLoading(true);
    try {
      const { data, error } = await supabase
        .from('documenti_normativi')
        .select('*')
        .eq('validated', true)
        .eq('is_archived', false)
        .order('data_pubblicazione', { ascending: false })
        .limit(50);
      if (!error && data) {
        setDocumenti(data as DocumentoNormativo[]);
      }
    } catch {}
    setLoading(false);
  };

  useEffect(() => { fetchDocumenti(); }, []);

  const filtered = documenti.filter(d => {
    const matchCat = activeCategory === 'Tutte' || d.categoria === activeCategory;
    const matchSearch = !searchQuery
      || d.titolo.toLowerCase().includes(searchQuery.toLowerCase())
      || (d.descrizione || '').toLowerCase().includes(searchQuery.toLowerCase())
      || (d.abstract || '').toLowerCase().includes(searchQuery.toLowerCase());
    return matchCat && matchSearch;
  });

  return (
    <section id="normative" className="py-20 bg-surface-warm/40">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-6">
          <h2 className="text-4xl font-extrabold text-[#0F172A] mb-4 tracking-tight">
            Normative e Documenti
          </h2>
          <p className="text-gray-600 font-normal max-w-2xl mx-auto">
            Archivio ufficiale e centralizzato di decreti, ordinanze ministeriali, bandi di concorso e modelli di domanda scaricabili. Dati certificati da fonti primarie.
          </p>
        </div>

        <div className="flex items-center justify-between text-xs text-gray-400 mb-2">
          <span className="flex items-center gap-1.5">
            <RefreshCw size={12} className={loading ? 'animate-spin' : ''} />
            {loading ? 'Caricamento...' : `${filtered.length} documenti trovati`}
          </span>
          <button onClick={fetchDocumenti} disabled={loading}
            className="flex items-center gap-1 text-brand-blu font-semibold hover:text-brand-blu/80 transition disabled:opacity-50">
            <RefreshCw size={12} className={loading ? 'animate-spin' : ''} />
            Aggiorna
          </button>
        </div>

        <div className="flex flex-col sm:flex-row gap-4 items-center justify-between mt-4 mb-8">
          <div className="flex gap-2 flex-wrap">
            {CATEGORIE.map(cat => (
              <button key={cat} onClick={() => setActiveCategory(cat)}
                className={`px-4 py-2 rounded-2xl text-xs font-semibold transition-all ${
                  activeCategory === cat ? 'bg-brand-blu text-white' : 'bg-white text-gray-600 border border-slate-200/60 hover:border-brand-blu/30'
                }`}>{cat}</button>
            ))}
          </div>
          <div className="relative w-full sm:w-64">
            <Search size={16} className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" />
            <input type="text" placeholder="Cerca documenti..." value={searchQuery}
              onChange={e => setSearchQuery(e.target.value)}
              className="w-full pl-9 pr-4 py-2 rounded-2xl border border-slate-200/60 bg-white text-sm focus:ring-2 focus:ring-brand-blu/20 focus:border-brand-blu transition outline-none" />
          </div>
        </div>

        {loading ? (
          <div className="flex items-center justify-center py-20">
            <RefreshCw size={32} className="animate-spin text-brand-blu/30" />
          </div>
        ) : filtered.length === 0 ? (
          <div className="text-center py-20">
            <AlertCircle size={48} className="mx-auto text-gray-300 mb-4" />
            <p className="text-gray-500">Nessun documento trovato. I documenti normativi vengono pubblicati dopo la validazione.</p>
          </div>
        ) : (
          <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
            {filtered.map(doc => {
              const Icon = CATEGORIA_ICONA[doc.categoria] || FileText;
              const stile = CATEGORIA_STILI[doc.categoria] || 'bg-gray-100 text-gray-600';
              return (
                <div key={doc.id} className="bg-white/70 backdrop-blur-md rounded-3xl p-6 border border-slate-200/60 hover:border-brand-blu/30 hover:shadow-medium transition-all duration-300 group">
                  <div className="flex items-center mb-4">
                    <div className={`w-10 h-10 rounded-2xl flex items-center justify-center mr-3 ${stile}`}>
                      <Icon className="h-5 w-5" />
                    </div>
                    <div>
                      <span className={`text-xs font-semibold px-2 py-0.5 rounded-full ${stile}`}>{doc.categoria}</span>
                      <h3 className="text-base font-bold text-[#0F172A] mt-1 line-clamp-2">{doc.titolo}</h3>
                    </div>
                  </div>
                  <p className="text-gray-600 text-sm leading-relaxed mb-2 line-clamp-2">{doc.descrizione || doc.abstract}</p>
                  <div className="flex flex-wrap gap-1.5 mb-4">
                    {doc.ente && <span className="text-[10px] px-2 py-0.5 rounded-full bg-gray-100 text-gray-500">{doc.ente}</span>}
                    {doc.anno && <span className="text-[10px] px-2 py-0.5 rounded-full bg-gray-100 text-gray-500">{doc.anno}</span>}
                    {doc.regione && <span className="text-[10px] px-2 py-0.5 rounded-full bg-sky-50 text-sky-600">{doc.regione}</span>}
                  </div>
                  <div className="flex gap-3">
                    <button onClick={() => setPreviewDoc(doc)}
                      className="flex-1 flex items-center justify-center gap-2 py-2 bg-brand-blu/10 text-brand-blu rounded-2xl text-sm font-semibold hover:bg-brand-blu/20 transition">
                      <ExternalLink size={14} /> Visualizza
                    </button>
                    <button onClick={() => downloadPDF(doc)}
                      className="flex-1 flex items-center justify-center gap-2 py-2 bg-brand-verde/10 text-brand-verde rounded-2xl text-sm font-semibold hover:bg-brand-verde/20 transition">
                      <Download size={14} /> Scarica PDF
                    </button>
                  </div>
                </div>
              );
            })}
          </div>
        )}
      </div>

      {previewDoc && (
        <div className="fixed inset-0 z-50 bg-black/30 backdrop-blur-sm flex items-center justify-center p-4" onClick={() => setPreviewDoc(null)}>
          <div className="bg-white rounded-3xl max-w-2xl w-full max-h-[80vh] overflow-y-auto shadow-2xl border border-slate-200/60 p-6" onClick={e => e.stopPropagation()}>
            <div className="flex items-center justify-between mb-4">
              <div>
                <span className={`text-xs font-semibold px-2 py-0.5 rounded-full ${CATEGORIA_STILI[previewDoc.categoria] || 'bg-gray-100 text-gray-600'}`}>{previewDoc.categoria}</span>
                <h3 className="text-xl font-bold text-[#0F172A] mt-2">{previewDoc.titolo}</h3>
              </div>
              <button onClick={() => setPreviewDoc(null)} className="p-2 hover:bg-gray-100 rounded-xl transition">
                <X size={20} className="text-gray-500" />
              </button>
            </div>
            <div className="space-y-3 text-sm text-gray-700">
              <div className="flex flex-wrap gap-2">
                {previewDoc.ente && <span className="px-2 py-0.5 bg-gray-100 rounded-full text-xs">Ente: {previewDoc.ente}</span>}
                {previewDoc.anno && <span className="px-2 py-0.5 bg-gray-100 rounded-full text-xs">Anno: {previewDoc.anno}</span>}
                {previewDoc.numero && <span className="px-2 py-0.5 bg-gray-100 rounded-full text-xs">Numero: {previewDoc.numero}</span>}
                {previewDoc.regione && <span className="px-2 py-0.5 bg-sky-50 text-sky-600 rounded-full text-xs">Regione: {previewDoc.regione}</span>}
                <span className="px-2 py-0.5 bg-gray-100 rounded-full text-xs">Pubblicazione: {new Date(previewDoc.data_pubblicazione).toLocaleDateString('it-IT')}</span>
                {previewDoc.data_scadenza && <span className="px-2 py-0.5 bg-red-50 text-red-600 rounded-full text-xs">Scadenza: {new Date(previewDoc.data_scadenza).toLocaleDateString('it-IT')}</span>}
              </div>
              <div className="bg-gray-50 rounded-2xl p-4 whitespace-pre-wrap text-sm text-gray-700 leading-relaxed">
                {previewDoc.abstract || previewDoc.descrizione || 'Nessun contenuto disponibile.'}
              </div>
              {previewDoc.url_documento && (
                <a href={previewDoc.url_documento} target="_blank" rel="noopener noreferrer"
                  className="inline-flex items-center gap-2 text-brand-blu font-semibold hover:underline">
                  <ExternalLink size={14} /> Vedi documento originale
                </a>
              )}
              {previewDoc.tags && previewDoc.tags.length > 0 && (
                <div className="flex flex-wrap gap-1">
                  {previewDoc.tags.map(tag => (
                    <span key={tag} className="text-[10px] px-2 py-0.5 rounded-full bg-brand-blu/5 text-brand-blu">{tag}</span>
                  ))}
                </div>
              )}
            </div>
            <button onClick={() => downloadPDF(previewDoc)}
              className="mt-4 w-full flex items-center justify-center gap-2 py-3 bg-brand-verde text-white rounded-2xl font-semibold hover:bg-brand-verde/90 transition">
              <Download size={18} /> Scarica Documento PDF
            </button>
          </div>
        </div>
      )}
    </section>
  );
}
