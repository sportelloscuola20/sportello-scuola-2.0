import { useState } from 'react';
import { FileText, BookOpen, Building, ShieldCheck, List, Download, ExternalLink, X, Search } from 'lucide-react';

interface Documento {
  id: string;
  icon: typeof FileText;
  category: string;
  title: string;
  desc: string;
  filename: string;
  content: string;
}

const documenti: Documento[] = [
  {
    id: 'om-gps-2026',
    icon: FileText,
    category: 'GPS',
    title: 'Ordinanza Ministeriale GPS Biennio 2026/2028',
    desc: 'Regolamento per l\'aggiornamento e la gestione delle Graduatorie Provinciali per le Supplenze del personale docente ed educativo per il biennio 2026/2028.',
    filename: 'OM_GPS_2026_2028.pdf',
    content: 'REGOLAMENTO GRADUATORIE PROVINCIALI SUPPLENZE 2026-2028\n\nArt. 1 - Finalità e ambito di applicazione\nLa presente ordinanza regola l\'aggiornamento biennale delle Graduatorie Provinciali per le Supplenze (GPS) del personale docente ed educativo.\n\nArt. 2 - Presentazione delle domande\nLe domande di aggiornamento e inserimento nelle GPS devono essere presentate esclusivamente tramite la piattaforma Istanze On Line (POLIS) del Ministero dell\'Istruzione e del Merito.\n\nArt. 3 - Titoli di accesso\nPossono presentare domanda coloro che sono in possesso del titolo di studio valido per l\'accesso alla classe di concorso prescelta, secondo le tabelle allegate al presente regolamento.\n\nArt. 4 - Valutazione dei titoli\nI titoli sono valutati secondo le Tabelle A/1-A/10 allegate al presente decreto, distinte per grado di scuola e fascia di appartenenza.',
  },
  {
    id: 'nota-mim-gps',
    icon: FileText,
    category: 'GPS',
    title: 'Nota Ministeriale — Conferimento incarichi GPS',
    desc: 'Nota esplicativa del MIM sulle procedure per il conferimento degli incarichi di supplenza da GPS e l\'assegnazione delle cattedre.',
    filename: 'Nota_MIM_Conferimento_Incarichi_GPS.pdf',
    content: 'NOTA MINISTERIALE — CONFERIMENTO INCARICHI DA GPS\n\nIl Ministero dell\'Istruzione e del Merito fornisce le seguenti indicazioni operative per il conferimento degli incarichi di supplenza:\n\n1. Le scuole attingono dalle GPS secondo l\'ordine di graduatoria.\n2. Per ciascuna classe di concorso, la scuola convoca i candidati tramite interpello.\n3. Il candidato ha 24 ore per accettare la supplenza.\n4. In caso di rinuncia senza giustificato motivo, si applicano le sanzioni previste dal D.Lgs. 59/2017.',
  },
  {
    id: 'dm-89-2024',
    icon: BookOpen,
    category: 'ATA',
    title: 'Decreto Terza Fascia ATA Triennio 2024/2027 — Allegato A/1',
    desc: 'Decreto Ministeriale 89/2024 contenente le tabelle di valutazione dei titoli per il personale ATA di terza fascia per il triennio 2024-2027.',
    filename: 'DM_89_2024_ATA_III_Fascia.pdf',
    content: 'DECRETO MINISTERIALE 89/2024 — TABELLE ATA III FASCIA\n\nAllegato A/1 — Tabelle di valutazione titoli personale ATA\n\nProfilo AA (Assistente Amministrativo):\n- Titolo di studio: fino a 10 punti\n- CIAD: requisito obbligatorio\n- Laurea: 2 punti\n- Qualifica professionale: 1 punto\n- Servizio stesso profilo: 0,50 pt/mese\n- Servizio altro profilo ATA: 0,15 pt/mese\n\nProfilo CS (Collaboratore Scolastico):\n- Titolo di studio: fino a 10 punti\n- CIAD: requisito obbligatorio\n- Laurea: 2 punti\n- Idoneità concorso CS: 1 punto',
  },
  {
    id: 'tabella-corrispondenza-at',
    icon: BookOpen,
    category: 'ATA',
    title: 'Tabella di Corrispondenza Titoli/Laboratori Assistenti Tecnici',
    desc: 'Tabella ministeriale di corrispondenza tra titoli di studio, corsi di formazione e laboratori per il profilo di Assistente Tecnico (AT).',
    filename: 'Tabella_Corrispondenza_AT.pdf',
    content: 'TABELLA DI CORRISPONDENZA TITOLI/LABORATORI — ASSISTENTE TECNICO\n\nCABINA ELETTRICA: Diploma di Perito Elettrotecnico, Elettronico\nLABORATORIO DI FISICA: Diploma Liceo Scientifico + corso specialistico\nLABORATORIO DI CHIMICA: Diploma Perito Chimico, Laurea in Chimica\nLABORATORIO DI INFORMATICA: Diploma Perito Informatico, Laurea in Informatica\nLABORATORIO LINGUISTICO/CONVERSAZIONE: Laurea in Lingue\nSERVIZI DI SEGRETERIA: Diploma di Ragioneria, Perito Commerciale',
  },
  {
    id: 'linee-guida-inclusione',
    icon: ShieldCheck,
    category: 'Inclusione',
    title: 'Linee Guida Nazionali sull\'Inclusione Scolastica',
    desc: 'Linee guida aggiornate per l\'inclusione scolastica di alunni con disabilità, DSA e BES, con indicazioni operative per PEI e PDP.',
    filename: 'Linee_Guida_Inclusione_Scolastica.pdf',
    content: 'LINEE GUIDA NAZIONALI INCLUSIONE SCOLASTICA\n\n1. Principio di personalizzazione: ogni alunno ha diritto a un percorso formativo personalizzato.\n2. PEI (Piano Educativo Individualizzato) per alunni con disabilità certificata.\n3. PDP (Piano Didattico Personalizzato) per alunni con DSA.\n4. BES: attivazione di strategie didattiche inclusive.\n5. Il GLO (Gruppo di Lavoro Operativo) si riunisce entro ottobre di ogni anno.',
  },
  {
    id: 'modello-ricorso',
    icon: List,
    category: 'Modulistica',
    title: 'Modello Richiesta Accesso agli Atti / Ricorso Punteggio',
    desc: 'Modello ufficiale per la richiesta di accesso agli atti e per il ricorso avverso al punteggio errato nelle graduatorie GPS e ATA.',
    filename: 'Modello_Ricorso_Punteggio.pdf',
    content: 'MODELLO DI RICORSO AVVERSO PUNTEGGIO GRADUATORIE\n\nAl Dirigente Scolastico della scuola polo\nL\'OGGETTO: Richiesta di accesso agli atti e ricorso avverso al punteggio attribuito\n\nIl/La sottoscritto/a _______________, nato/a a _______________ il _______________,\n\nPREMESSO CHE:\n- Ha presentato domanda di aggiornamento GPS per la classe di concorso _______________\n- Il punteggio attribuito è di _______________\n- Ritiene che il punteggio sia errato per i seguenti motivi:\n\n1. _______________\n2. _______________\n\nCHIEDE\n- La visione degli atti relativi alla valutazione dei titoli\n- La rettifica del punteggio nella misura di _______________\n\nData, _______________\nFirma _______________',
  },
  {
    id: 'bandi-concorsi',
    icon: FileText,
    category: 'Bandi',
    title: 'Bandi Concorsi Ordinari e Straordinari MIM',
    desc: 'Raccolta dei bandi di concorso ordinari e straordinari per docenti pubblicati dal Ministero dell\'Istruzione e del Merito.',
    filename: 'Bandi_Concorsi_MIM.pdf',
    content: 'BANDI DI CONCORSO MIM\n\nConcorso Ordinario Docenti 2026:\n- Posti: 20.000 cattedre\n- Scadenza: 31 marzo 2026\n- Prove scritte: 15-25 ottobre 2026\n\nConcorso Straordinario Docenti 2026:\n- Posti: 5.000 cattedre\n- Requisiti: 3 anni di servizio\n- Scadenza: 30 aprile 2026',
  },
  {
    id: 'ccnl-scuola',
    icon: Building,
    category: 'Contratti',
    title: 'CCNL Istruzione e Ricerca — Aggiornato',
    desc: 'Contratto Collettivo Nazionale di Lavoro del comparto Istruzione e Ricerca, aggiornato alle ultime intese sottoscritte all\'ARAN.',
    filename: 'CCNL_Istruzione_Ricerca.pdf',
    content: 'CCNL ISTRUZIONE E RICERCA\n\nTITOLO I - DISPOSIZIONI GENERALI\nArt. 1 - Campo di applicazione\nArt. 2 - Periodo di vigenza\n\nTITOLO II - RAPPORTO DI LAVORO\nArt. 3 - Costituzione del rapporto\nArt. 4 - Periodo di prova\nArt. 5 - Orario di lavoro\nArt. 6 - Assenze e permessi\nArt. 7 - Congedi\n\nTITOLO III - TRATTAMENTO ECONOMICO\nArt. 8 - Retribuzione\nArt. 9 - Indennità\nArt. 10 - Premi',
  },
];

const CATEGORIE = ['Tutte', 'GPS', 'ATA', 'Inclusione', 'Modulistica', 'Bandi', 'Contratti'];

export default function NormativeDocuments() {
  const [activeCategory, setActiveCategory] = useState('Tutte');
  const [previewDoc, setPreviewDoc] = useState<Documento | null>(null);
  const [searchQuery, setSearchQuery] = useState('');

  const filtered = documenti.filter(d => {
    const matchCat = activeCategory === 'Tutte' || d.category === activeCategory;
    const matchSearch = !searchQuery || d.title.toLowerCase().includes(searchQuery.toLowerCase()) || d.desc.toLowerCase().includes(searchQuery.toLowerCase());
    return matchCat && matchSearch;
  });

  const categoryIcons: Record<string, string> = {
    GPS: 'bg-blue-100 text-blue-700',
    ATA: 'bg-green-100 text-green-700',
    Inclusione: 'bg-purple-100 text-purple-700',
    Modulistica: 'bg-amber-100 text-amber-700',
    Bandi: 'bg-red-100 text-red-700',
    Contratti: 'bg-teal-100 text-teal-700',
  };

  return (
    <section id="normative" className="py-20 bg-surface-warm/40">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-6">
          <h2 className="text-4xl font-extrabold text-[#0F172A] mb-4 tracking-tight">
            Normative e Documenti
          </h2>
          <p className="text-gray-600 font-normal max-w-2xl mx-auto">
            Archivio ufficiale e centralizzato di decreti, ordinanze ministeriali e modelli di domanda scaricabili.
          </p>
        </div>

        <div className="flex flex-col sm:flex-row gap-4 items-center justify-between mt-8 mb-8">
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

        <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
          {filtered.map(doc => (
            <div key={doc.id} className="bg-white/70 backdrop-blur-md rounded-3xl p-6 border border-slate-200/60 hover:border-brand-blu/30 hover:shadow-medium transition-all duration-300 group">
              <div className="flex items-center mb-4">
                <div className={`w-10 h-10 rounded-2xl flex items-center justify-center mr-3 ${categoryIcons[doc.category] || 'bg-gray-100 text-gray-600'}`}>
                  <doc.icon className="h-5 w-5" />
                </div>
                <div>
                  <span className={`text-xs font-semibold px-2 py-0.5 rounded-full ${categoryIcons[doc.category] || 'bg-gray-100 text-gray-600'}`}>{doc.category}</span>
                  <h3 className="text-base font-bold text-[#0F172A] mt-1">{doc.title}</h3>
                </div>
              </div>
              <p className="text-gray-600 text-sm leading-relaxed mb-4 line-clamp-2">{doc.desc}</p>
              <div className="flex gap-3">
                <button onClick={() => setPreviewDoc(doc)}
                  className="flex-1 flex items-center justify-center gap-2 py-2 bg-brand-blu/10 text-brand-blu rounded-2xl text-sm font-semibold hover:bg-brand-blu/20 transition">
                  <ExternalLink size={14} /> Visualizza
                </button>
                <button onClick={() => {
                  const blob = new Blob([doc.content], { type: 'text/plain' });
                  const url = URL.createObjectURL(blob);
                  const a = document.createElement('a');
                  a.href = url; a.download = doc.filename; a.click();
                  URL.revokeObjectURL(url);
                }}
                  className="flex-1 flex items-center justify-center gap-2 py-2 bg-brand-verde/10 text-brand-verde rounded-2xl text-sm font-semibold hover:bg-brand-verde/20 transition">
                  <Download size={14} /> Scarica
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>

      {previewDoc && (
        <div className="fixed inset-0 z-50 bg-black/30 backdrop-blur-sm flex items-center justify-center p-4" onClick={() => setPreviewDoc(null)}>
          <div className="bg-white rounded-3xl max-w-2xl w-full max-h-[80vh] overflow-y-auto shadow-2xl border border-slate-200/60 p-6" onClick={e => e.stopPropagation()}>
            <div className="flex items-center justify-between mb-4">
              <div>
                <span className={`text-xs font-semibold px-2 py-0.5 rounded-full ${categoryIcons[previewDoc.category] || 'bg-gray-100 text-gray-600'}`}>{previewDoc.category}</span>
                <h3 className="text-xl font-bold text-[#0F172A] mt-2">{previewDoc.title}</h3>
              </div>
              <button onClick={() => setPreviewDoc(null)} className="p-2 hover:bg-gray-100 rounded-xl transition">
                <X size={20} className="text-gray-500" />
              </button>
            </div>
            <div className="bg-gray-50 rounded-2xl p-6 whitespace-pre-wrap text-sm text-gray-700 font-mono leading-relaxed">
              {previewDoc.content}
            </div>
            <button onClick={() => {
              const blob = new Blob([previewDoc.content], { type: 'text/plain' });
              const url = URL.createObjectURL(blob);
              const a = document.createElement('a');
              a.href = url; a.download = previewDoc.filename; a.click();
              URL.revokeObjectURL(url);
            }}
              className="mt-4 w-full flex items-center justify-center gap-2 py-3 bg-brand-verde text-white rounded-2xl font-semibold hover:bg-brand-verde/90 transition">
              <Download size={18} /> Scarica Documento ({previewDoc.filename})
            </button>
          </div>
        </div>
      )}
    </section>
  );
}
