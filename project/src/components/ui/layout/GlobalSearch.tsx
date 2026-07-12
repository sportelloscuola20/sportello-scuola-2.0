import { useState, useEffect, useCallback, useRef } from 'react';
import { Search, X, Newspaper, CalendarClock, FileText, HelpCircle, ArrowRight, Loader2, GraduationCap, Calculator, MessageSquare, Scale, BookOpen, ExternalLink, ChevronRight, Command } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import { SearchService } from '../../../services';
import { trackSearch } from '../../../lib/analytics';

interface SearchResult {
  id: string;
  title: string;
  description: string;
  type: 'notizia' | 'scadenza' | 'documento' | 'interpello' | 'faq' | 'navigation';
  url: string;
  category?: string;
  icon?: React.ReactNode;
}

const TYPE_CONFIG: Record<SearchResult['type'], { icon: React.ReactNode; label: string; color: string; bgColor: string }> = {
  notizia: { icon: <Newspaper size={16} />, label: 'Notizia', color: 'text-blue-600', bgColor: 'bg-blue-50' },
  scadenza: { icon: <CalendarClock size={16} />, label: 'Scadenza', color: 'text-amber-600', bgColor: 'bg-amber-50' },
  documento: { icon: <FileText size={16} />, label: 'Documento', color: 'text-green-600', bgColor: 'bg-green-50' },
  interpello: { icon: <FileText size={16} />, label: 'Interpello', color: 'text-purple-600', bgColor: 'bg-purple-50' },
  faq: { icon: <HelpCircle size={16} />, label: 'FAQ', color: 'text-gray-600', bgColor: 'bg-gray-50' },
  navigation: { icon: <ArrowRight size={16} />, label: 'Vai a', color: 'text-brand-blu', bgColor: 'bg-brand-blu/5' },
};

const NAVIGATION_LINKS: { label: string; description: string; url: string; icon: React.ReactNode }[] = [
  { label: 'Calcolo Punteggio GPS/ATA', description: 'Simulatore interattivo', url: '/calcolo-punteggio', icon: <Calculator size={18} /> },
  { label: 'Sindacalista AI', description: 'Chat con l\'assistente intelligente', url: '/sindacalista-ai', icon: <MessageSquare size={18} /> },
  { label: 'Interpelli Nazionali', description: 'Centro interpelli e bandi', url: '/interpelli', icon: <FileText size={18} /> },
  { label: 'Normative e Documenti', description: 'Gazzette, CCNL, circolari', url: '/normative-e-documenti', icon: <Scale size={18} /> },
  { label: 'Notizie e Scadenze', description: 'Intelligence settore scuola', url: '/notizie-scadenze', icon: <Newspaper size={18} /> },
  { label: 'Archivio Intelligence', description: 'Storico completo', url: '/notizie-scadenze/archivio', icon: <BookOpen size={18} /> },
  { label: 'FAQ — Domande Frequenti', description: 'Risposte immediate', url: '/faq', icon: <HelpCircle size={18} /> },
  { label: 'Area Riservata', description: 'Dashboard personale', url: '/area-riservata', icon: <GraduationCap size={18} /> },
  { label: 'Servizi', description: 'Abbonamento e funzionalità Pro', url: '/servizi', icon: <ExternalLink size={18} /> },
  { label: 'Contatti', description: 'Assistenza e supporto', url: '/contatti', icon: <ArrowRight size={18} /> },
];

const FAQ_DATA = [
  { q: 'Come si calcola il punteggio GPS?', a: 'Usa il simulatore GPS per calcolare il tuo punteggio', url: '/calcolo-punteggio' },
  { q: 'Come funziona la mobilità del personale?', a: 'Informazioni sulla mobilità annuale', url: '/notizie-scadenze' },
  { q: 'Cosa sono gli interpelli?', a: 'Centro nazionale interpelli scuola', url: '/interpelli' },
  { q: 'Come funziona il Sindacalista AI?', a: 'Chat con assistente AI specializzato', url: '/sindacalista-ai' },
  { q: 'Quali sono i diritti del personale ATA?', a: 'Informazioni CCNL e diritti', url: '/normative-e-documenti' },
  { q: 'Come iscriversi alle GPS?', a: 'Aggiornamento graduatorie provinciali', url: '/notizie-scadenze' },
  { q: 'TFA Sostegno requisiti e bando', a: 'Informazioni TFA Sostegno', url: '/interpelli' },
  { q: 'Congedo straordinario e permessi', a: 'Diritti CCNL personale scolastico', url: '/normative-e-documenti' },
  { q: 'Concorso docenti 2026', a: 'Calendario e requisiti concorso', url: '/notizie-scadenze' },
  { q: 'Punteggio maternità supplenze', a: 'Calcolo servizio ai fini GPS', url: '/calcolo-punteggio' },
  { q: 'Graduatorie ATA terza fascia', a: 'DM 89/2024 e graduatorie', url: '/notizie-scadenze' },
  { q: 'Passaggio di ruolo docente', a: 'Procedure e requisiti', url: '/interpelli' },
];

interface GlobalSearchProps {
  isOpen: boolean;
  onClose: () => void;
}

export default function GlobalSearch({ isOpen, onClose }: GlobalSearchProps) {
  const [query, setQuery] = useState('');
  const [results, setResults] = useState<SearchResult[]>([]);
  const [isSearching, setIsSearching] = useState(false);
  const [selectedIndex, setSelectedIndex] = useState(0);
  const inputRef = useRef<HTMLInputElement>(null);
  const resultsRef = useRef<HTMLDivElement>(null);
  const navigate = useNavigate();

  useEffect(() => {
    if (isOpen) {
      setQuery('');
      setResults([]);
      setSelectedIndex(0);
      document.body.style.overflow = 'hidden';
      setTimeout(() => inputRef.current?.focus(), 50);
    } else {
      document.body.style.overflow = '';
    }
    return () => { document.body.style.overflow = ''; };
  }, [isOpen]);

  useEffect(() => {
    if (!query.trim()) {
      setResults([]);
      setSelectedIndex(0);
      return;
    }

    const timer = setTimeout(async () => {
      setIsSearching(true);
      const q = query.toLowerCase().trim();
      const allResults: SearchResult[] = [];

      const searchResponse = await SearchService.searchAll(query, 5);

      searchResponse.results.forEach(r => {
        allResults.push({
          id: r.id,
          title: r.title,
          description: r.description,
          type: r.type,
          url: r.url,
          category: r.category,
        });
      });

      FAQ_DATA.forEach(f => {
        if (f.q.toLowerCase().includes(q) || f.a.toLowerCase().includes(q)) {
          allResults.push({
            id: `faq-${f.q}`,
            title: f.q,
            description: f.a,
            type: 'faq',
            url: f.url,
          });
        }
      });

      NAVIGATION_LINKS.forEach(n => {
        if (n.label.toLowerCase().includes(q) || n.description.toLowerCase().includes(q)) {
          allResults.push({
            id: `nav-${n.url}`,
            title: n.label,
            description: n.description,
            type: 'navigation',
            url: n.url,
            icon: n.icon,
          });
        }
      });

      setResults(allResults.slice(0, 12));
      setSelectedIndex(0);
      setIsSearching(false);
      if (q.length >= 2) trackSearch(q, allResults.length);
    }, 200);

    return () => clearTimeout(timer);
  }, [query]);

  useEffect(() => {
    if (resultsRef.current && selectedIndex >= 0) {
      const item = resultsRef.current.children[selectedIndex] as HTMLElement;
      if (item) item.scrollIntoView({ block: 'nearest', behavior: 'smooth' });
    }
  }, [selectedIndex]);

  const handleSelect = useCallback((result: SearchResult) => {
    navigate(result.url);
    onClose();
  }, [navigate, onClose]);

  const handleKeyDown = useCallback((e: React.KeyboardEvent) => {
    if (e.key === 'Escape') {
      onClose();
    } else if (e.key === 'ArrowDown') {
      e.preventDefault();
      setSelectedIndex(prev => {
        const max = query.trim() ? results.length - 1 : NAVIGATION_LINKS.length - 1;
        return Math.min(prev + 1, max);
      });
    } else if (e.key === 'ArrowUp') {
      e.preventDefault();
      setSelectedIndex(prev => Math.max(prev - 1, 0));
    } else if (e.key === 'Enter') {
      if (query.trim() && results[selectedIndex]) {
        handleSelect(results[selectedIndex]);
      } else if (!query.trim() && NAVIGATION_LINKS[selectedIndex]) {
        navigate(NAVIGATION_LINKS[selectedIndex].url);
        onClose();
      }
    }
  }, [results, selectedIndex, handleSelect, onClose, query, navigate]);

  if (!isOpen) return null;

  const displayItems = query.trim() ? results : [];
  const showNav = !query.trim();
  const totalItems = showNav ? NAVIGATION_LINKS.length : results.length;

  return (
    <div
      className="fixed inset-0 z-[200] flex items-start justify-center pt-[8vh] sm:pt-[12vh]"
      onClick={onClose}
      role="dialog"
      aria-modal="true"
      aria-label="Cerca nel sito"
    >
      <div className="absolute inset-0 bg-black/50 backdrop-blur-md" aria-hidden="true" />

      <div
        className="relative w-full max-w-2xl mx-4 bg-white rounded-2xl shadow-2xl border border-gray-200 overflow-hidden animate-scale-in"
        onClick={e => e.stopPropagation()}
        role="combobox"
        aria-expanded={query.trim() ? results.length > 0 : true}
        aria-haspopup="listbox"
      >
        <div className="flex items-center gap-3 px-5 py-4 border-b border-gray-100">
          <Search size={20} className="text-gray-400 flex-shrink-0" aria-hidden="true" />
          <label htmlFor="global-search-input" className="sr-only">Cerca notizie, normative, interpelli, FAQ</label>
          <input
            ref={inputRef}
            id="global-search-input"
            type="text"
            value={query}
            onChange={e => { setQuery(e.target.value); setSelectedIndex(0); }}
            onKeyDown={handleKeyDown}
            placeholder="Cerca notizie, normative, interpelli, FAQ..."
            className="flex-1 text-base outline-none bg-transparent placeholder-gray-400 font-medium"
            autoComplete="off"
            spellCheck={false}
            aria-autocomplete="list"
            aria-controls="search-results-list"
            aria-activedescendant={query.trim() && results[selectedIndex] ? `search-result-${results[selectedIndex].id}` : undefined}
            role="searchbox"
          />
          {isSearching && <Loader2 size={16} className="animate-spin text-gray-400" aria-hidden="true" />}
          <button onClick={onClose} className="p-1.5 hover:bg-gray-100 rounded-lg transition" aria-label="Chiudi ricerca">
            <X size={16} className="text-gray-400" />
          </button>
        </div>

        <div ref={resultsRef} id="search-results-list" className="max-h-[55vh] overflow-y-auto" role="listbox" aria-label="Risultati di ricerca">
          {showNav && (
            <div className="p-3">
              <p className="px-2 py-1 text-[10px] font-bold text-gray-400 uppercase tracking-widest" id="nav-heading">Navigazione rapida</p>
              <div className="mt-1" role="group" aria-labelledby="nav-heading">
                {NAVIGATION_LINKS.map((nav, i) => (
                  <button
                    key={nav.url}
                    id={`nav-result-${nav.url}`}
                    onClick={() => { navigate(nav.url); onClose(); }}
                    onMouseEnter={() => setSelectedIndex(i)}
                    role="option"
                    aria-selected={i === selectedIndex}
                    className={`w-full flex items-center gap-3 px-3 py-2.5 rounded-xl text-left transition-all ${
                      i === selectedIndex
                        ? 'bg-brand-blu/8 text-brand-blu'
                        : 'text-gray-700 hover:bg-gray-50'
                    }`}
                  >
                    <div className={`w-9 h-9 rounded-xl flex items-center justify-center flex-shrink-0 ${
                      i === selectedIndex ? 'bg-brand-blu/15 text-brand-blu' : 'bg-gray-100 text-gray-500'
                    }`}>
                      {nav.icon}
                    </div>
                    <div className="flex-1 min-w-0">
                      <p className="text-sm font-semibold truncate">{nav.label}</p>
                      <p className="text-xs text-gray-400 truncate">{nav.description}</p>
                    </div>
                    <ChevronRight size={14} className={`flex-shrink-0 ${i === selectedIndex ? 'text-brand-blu' : 'text-gray-300'}`} />
                  </button>
                ))}
              </div>
            </div>
          )}

          {query.trim() && results.length === 0 && !isSearching && (
            <div className="py-16 text-center px-4">
              <div className="w-16 h-16 bg-gray-100 rounded-2xl flex items-center justify-center mx-auto mb-4">
                <Search size={28} className="text-gray-300" />
              </div>
              <p className="text-gray-600 text-sm font-medium">Nessun risultato per "{query}"</p>
              <p className="text-gray-400 text-xs mt-1">Prova con parole chiave diverse oppure naviga direttamente</p>
              <button onClick={() => setQuery('')}
                className="mt-4 px-4 py-2 bg-gray-100 text-gray-600 text-xs font-medium rounded-xl hover:bg-gray-200 transition">
                Mostra navigazione
              </button>
            </div>
          )}

          {query.trim() && results.length > 0 && (
            <div className="p-3">
              <p className="px-2 py-1 text-[10px] font-bold text-gray-400 uppercase tracking-widest" id="results-heading">
                {results.length} risultat{results.length === 1 ? 'o' : 'i'}
              </p>
              <div className="mt-1" role="group" aria-labelledby="results-heading">
                {results.map((result, i) => {
                  const config = TYPE_CONFIG[result.type];
                  return (
                    <button
                      key={result.id}
                      id={`search-result-${result.id}`}
                      onClick={() => handleSelect(result)}
                      onMouseEnter={() => setSelectedIndex(i)}
                      role="option"
                      aria-selected={i === selectedIndex}
                      aria-label={`${config.label}: ${result.title}`}
                      className={`w-full flex items-center gap-3 px-3 py-2.5 rounded-xl text-left transition-all ${
                        i === selectedIndex
                          ? 'bg-brand-blu/8 text-brand-blu'
                          : 'text-gray-700 hover:bg-gray-50'
                      }`}
                    >
                      <div className={`w-9 h-9 rounded-xl flex items-center justify-center flex-shrink-0 ${config.bgColor} ${config.color}`}>
                        {result.icon || config.icon}
                      </div>
                      <div className="flex-1 min-w-0">
                        <div className="flex items-center gap-2">
                          <p className="text-sm font-semibold truncate">{result.title}</p>
                          <span className={`text-[10px] font-medium px-1.5 py-0.5 rounded-md ${config.bgColor} ${config.color} flex-shrink-0`}>
                            {config.label}
                          </span>
                        </div>
                        <p className="text-xs text-gray-400 truncate mt-0.5">{result.description}</p>
                      </div>
                      <ArrowRight size={14} className={`flex-shrink-0 transition ${i === selectedIndex ? 'text-brand-blu' : 'text-gray-300'}`} />
                    </button>
                  );
                })}
              </div>
            </div>
          )}
        </div>

        <div className="px-5 py-3 border-t border-gray-100 bg-gray-50/80 flex items-center justify-between">
          <div className="flex items-center gap-4 text-[10px] text-gray-400">
            <span className="flex items-center gap-1">
              <kbd className="px-1.5 py-0.5 bg-white border border-gray-200 rounded text-gray-500 font-mono">↑↓</kbd> naviga
            </span>
            <span className="flex items-center gap-1">
              <kbd className="px-1.5 py-0.5 bg-white border border-gray-200 rounded text-gray-500 font-mono">↵</kbd> apri
            </span>
            <span className="flex items-center gap-1">
              <kbd className="px-1.5 py-0.5 bg-white border border-gray-200 rounded text-gray-500 font-mono">esc</kbd> chiudi
            </span>
          </div>
          <div className="flex items-center gap-1 text-[10px] text-gray-400">
            <Command size={10} />
            <span>K per cercare</span>
          </div>
        </div>
      </div>
    </div>
  );
}
