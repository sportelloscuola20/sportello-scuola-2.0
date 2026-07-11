import { useState, useEffect, useCallback, useRef } from 'react';
import { Search, X, Newspaper, CalendarClock, FileText, HelpCircle, ArrowRight, Loader2 } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import { supabase } from '../../../lib/supabaseClient';

interface SearchResult {
  id: string;
  title: string;
  description: string;
  type: 'notizia' | 'scadenza' | 'documento' | 'interpello' | 'faq';
  url: string;
  category?: string;
}

const TYPE_CONFIG: Record<SearchResult['type'], { icon: React.ReactNode; label: string; color: string }> = {
  notizia: { icon: <Newspaper size={14} />, label: 'Notizia', color: 'bg-blue-100 text-blue-700' },
  scadenza: { icon: <CalendarClock size={14} />, label: 'Scadenza', color: 'bg-amber-100 text-amber-700' },
  documento: { icon: <FileText size={14} />, label: 'Documento', color: 'bg-green-100 text-green-700' },
  interpello: { icon: <FileText size={14} />, label: 'Interpello', color: 'bg-purple-100 text-purple-700' },
  faq: { icon: <HelpCircle size={14} />, label: 'FAQ', color: 'bg-gray-100 text-gray-700' },
};

const FAQ_DATA = [
  { q: 'Come si calcola il punteggio GPS?', a: 'Usa il simulatore GPS', url: '/calcolo-punteggio' },
  { q: 'Come funziona la mobilità?', a: 'Informazioni sulla mobilità', url: '/notizie-scadenze' },
  { q: 'Cosa sono gli interpelli?', a: 'Centro nazionale interpelli', url: '/interpelli' },
  { q: 'Come accedere al sindacalista AI?', a: 'Chat con l\'assistente AI', url: '/sindacalista-ai' },
  { q: 'Quali sono i diritti del personale ATA?', a: 'Informazioni CCNL', url: '/normative-e-documenti' },
  { q: 'Come iscriversi alle GPS?', a: 'Aggiornamento graduatorie', url: '/notizie-scadenze' },
  { q: 'TFA Sostegno requisiti', a: 'Info TFA Sostegno', url: '/interpelli' },
  { q: 'Congedo straordinario', a: 'Diritti CCNL', url: '/normative-e-documenti' },
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
  const navigate = useNavigate();

  useEffect(() => {
    if (isOpen) {
      setQuery('');
      setResults([]);
      setSelectedIndex(0);
      setTimeout(() => inputRef.current?.focus(), 100);
    }
  }, [isOpen]);

  useEffect(() => {
    if (!query.trim()) {
      setResults([]);
      return;
    }

    const timer = setTimeout(async () => {
      setIsSearching(true);
      const q = query.toLowerCase().trim();
      const allResults: SearchResult[] = [];

      try {
        const [newsRes, scadenzeRes, docRes, interpRes] = await Promise.allSettled([
          supabase.from('intelligence_news').select('id, titolo, descrizione, categoria, link').ilike('titolo', `%${q}%`).limit(5),
          supabase.from('intelligence_scadenze').select('id, titolo, descrizione, tipo, link').ilike('titolo', `%${q}%`).limit(5),
          supabase.from('documenti_normativi').select('id, titolo, descrizione, tipo, categoria').ilike('titolo', `%${q}%`).limit(5),
          supabase.from('interpelli_nazionali').select('id, titolo, descrizione, tipo, link').ilike('titolo', `%${q}%`).limit(5),
        ]);

        if (newsRes.status === 'fulfilled' && newsRes.value.data) {
          newsRes.value.data.forEach((n: any) => {
            allResults.push({
              id: n.id,
              title: n.titolo,
              description: (n.descrizione || '').slice(0, 120),
              type: 'notizia',
              url: n.link || '/notizie-scadenze',
              category: n.categoria,
            });
          });
        }

        if (scadenzeRes.status === 'fulfilled' && scadenzeRes.value.data) {
          scadenzeRes.value.data.forEach((d: any) => {
            allResults.push({
              id: d.id,
              title: d.titolo,
              description: (d.descrizione || '').slice(0, 120),
              type: 'scadenza',
              url: '/notizie-scadenze?tab=scadenze',
              category: d.tipo,
            });
          });
        }

        if (docRes.status === 'fulfilled' && docRes.value.data) {
          docRes.value.data.forEach((d: any) => {
            allResults.push({
              id: d.id,
              title: d.titolo,
              description: (d.descrizione || '').slice(0, 120),
              type: 'documento',
              url: '/normative-e-documenti',
              category: d.categoria || d.tipo,
            });
          });
        }

        if (interpRes.status === 'fulfilled' && interpRes.value.data) {
          interpRes.value.data.forEach((i: any) => {
            allResults.push({
              id: i.id,
              title: i.titolo,
              description: (i.descrizione || '').slice(0, 120),
              type: 'interpello',
              url: '/interpelli',
              category: i.tipo,
            });
          });
        }

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
      } catch {}

      setResults(allResults.slice(0, 15));
      setSelectedIndex(0);
      setIsSearching(false);
    }, 250);

    return () => clearTimeout(timer);
  }, [query]);

  const handleSelect = useCallback((result: SearchResult) => {
    if (result.type === 'notizia' && result.url.startsWith('http')) {
      window.open(result.url, '_blank');
    } else {
      navigate(result.url);
    }
    onClose();
  }, [navigate, onClose]);

  const handleKeyDown = useCallback((e: React.KeyboardEvent) => {
    if (e.key === 'Escape') {
      onClose();
    } else if (e.key === 'ArrowDown') {
      e.preventDefault();
      setSelectedIndex(prev => Math.min(prev + 1, results.length - 1));
    } else if (e.key === 'ArrowUp') {
      e.preventDefault();
      setSelectedIndex(prev => Math.max(prev - 1, 0));
    } else if (e.key === 'Enter' && results[selectedIndex]) {
      handleSelect(results[selectedIndex]);
    }
  }, [results, selectedIndex, handleSelect, onClose]);

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-[100] bg-black/40 backdrop-blur-sm flex items-start justify-center pt-[10vh]" onClick={onClose}>
      <div className="bg-white rounded-3xl shadow-2xl w-full max-w-2xl mx-4 overflow-hidden animate-fade-in-up" onClick={e => e.stopPropagation()}>
        <div className="flex items-center gap-3 px-6 py-4 border-b border-slate-200/60">
          <Search size={20} className="text-gray-400 flex-shrink-0" />
          <input
            ref={inputRef}
            type="text"
            value={query}
            onChange={e => setQuery(e.target.value)}
            onKeyDown={handleKeyDown}
            placeholder="Cerca notizie, scadenze, normative, interpelli..."
            className="flex-1 text-base outline-none bg-transparent placeholder-gray-400"
          />
          {isSearching && <Loader2 size={16} className="animate-spin text-gray-400" />}
          <button onClick={onClose} className="p-1 hover:bg-gray-100 rounded-lg transition">
            <X size={18} className="text-gray-500" />
          </button>
        </div>

        <div className="max-h-[60vh] overflow-y-auto">
          {query.trim() && results.length === 0 && !isSearching && (
            <div className="py-12 text-center">
              <Search size={40} className="mx-auto text-gray-300 mb-3" />
              <p className="text-gray-500 text-sm">Nessun risultato per "{query}"</p>
              <p className="text-gray-400 text-xs mt-1">Prova con parole chiave diverse</p>
            </div>
          )}

          {!query.trim() && (
            <div className="p-4">
              <p className="text-xs text-gray-400 font-semibold uppercase tracking-wider mb-3">Ricerche rapide</p>
              <div className="flex flex-wrap gap-2">
                {['GPS', 'Concorsi', 'CCNL', 'Sostegno', 'ATA', 'Mobilità', 'Interpelli'].map(term => (
                  <button key={term} onClick={() => setQuery(term)}
                    className="px-3 py-1.5 bg-gray-100 text-gray-700 text-xs font-medium rounded-full hover:bg-brand-blu/10 hover:text-brand-blu transition">
                    {term}
                  </button>
                ))}
              </div>
            </div>
          )}

          {results.length > 0 && (
            <div className="py-2">
              {results.map((result, i) => {
                const config = TYPE_CONFIG[result.type];
                return (
                  <button
                    key={result.id}
                    onClick={() => handleSelect(result)}
                    onMouseEnter={() => setSelectedIndex(i)}
                    className={`w-full flex items-center gap-3 px-6 py-3 text-left transition ${
                      i === selectedIndex ? 'bg-brand-blu/5' : 'hover:bg-gray-50'
                    }`}
                  >
                    <div className={`p-2 rounded-xl ${config.color} flex-shrink-0`}>
                      {config.icon}
                    </div>
                    <div className="flex-1 min-w-0">
                      <div className="flex items-center gap-2">
                        <p className="text-sm font-semibold text-[#0F172A] truncate">{result.title}</p>
                        {result.category && (
                          <span className="text-[10px] text-gray-400 hidden sm:inline">{result.category}</span>
                        )}
                      </div>
                      <p className="text-xs text-gray-500 truncate">{result.description}</p>
                    </div>
                    <ArrowRight size={14} className={`flex-shrink-0 transition ${i === selectedIndex ? 'text-brand-blu' : 'text-gray-300'}`} />
                  </button>
                );
              })}
            </div>
          )}
        </div>

        <div className="px-6 py-3 border-t border-slate-200/60 bg-gray-50/50 flex items-center justify-between">
          <div className="flex items-center gap-3 text-[10px] text-gray-400">
            <span className="flex items-center gap-1"><kbd className="px-1.5 py-0.5 bg-white border rounded text-gray-500">↑↓</kbd> naviga</span>
            <span className="flex items-center gap-1"><kbd className="px-1.5 py-0.5 bg-white border rounded text-gray-500">↵</kbd> apri</span>
            <span className="flex items-center gap-1"><kbd className="px-1.5 py-0.5 bg-white border rounded text-gray-500">esc</kbd> chiudi</span>
          </div>
          <span className="text-[10px] text-gray-400">{results.length} risultati</span>
        </div>
      </div>
    </div>
  );
}
