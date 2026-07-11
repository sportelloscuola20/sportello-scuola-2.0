import { useState, useEffect } from 'react';
import { Bookmark, Trash2, ExternalLink, Calendar, FileText, Star } from 'lucide-react';
import { supabase } from '../../../lib/supabaseClient';
import { useAuth } from '../../foundation/AuthContext';

interface SavedItem {
  id: string;
  item_type: 'news' | 'deadline' | 'document';
  item_id: string;
  item_data: {
    title: string;
    description?: string;
    date?: string;
    category?: string;
    link?: string;
  };
  created_at: string;
}

export default function SavedItems() {
  const { user } = useAuth();
  const [items, setItems] = useState<SavedItem[]>([]);
  const [loading, setLoading] = useState(true);
  const [activeFilter, setActiveFilter] = useState<'all' | 'news' | 'deadline' | 'document'>('all');

  useEffect(() => {
    if (!user) return;
    setLoading(true);
    supabase
      .from('saved_items')
      .select('*')
      .eq('user_id', user.id)
      .order('created_at', { ascending: false })
      .then(({ data }) => {
        if (data) setItems(data as SavedItem[]);
        setLoading(false);
      });
  }, [user]);

  const handleRemove = async (id: string) => {
    await supabase.from('saved_items').delete().eq('id', id);
    setItems(prev => prev.filter(i => i.id !== id));
  };

  const filtered = activeFilter === 'all'
    ? items
    : items.filter(i => i.item_type === activeFilter);

  const counts = {
    all: items.length,
    news: items.filter(i => i.item_type === 'news').length,
    deadline: items.filter(i => i.item_type === 'deadline').length,
    document: items.filter(i => i.item_type === 'document').length,
  };

  const typeIcon = (type: string) => {
    switch (type) {
      case 'news': return <Star size={14} className="text-brand-ambra" />;
      case 'deadline': return <Calendar size={14} className="text-red-500" />;
      case 'document': return <FileText size={14} className="text-brand-blu" />;
      default: return <Bookmark size={14} />;
    }
  };

  if (!user) {
    return (
      <div className="p-6 text-center text-gray-500 text-sm">
        Accedi per vedere i tuoi elementi salvati.
      </div>
    );
  }

  return (
    <div>
      <div className="flex items-center gap-2 mb-4">
        <Bookmark size={18} className="text-brand-blu" />
        <h3 className="font-semibold text-gray-800">I Miei Preferiti</h3>
      </div>

      <div className="flex gap-2 mb-4 flex-wrap">
        {(['all', 'news', 'deadline', 'document'] as const).map(f => (
          <button
            key={f}
            onClick={() => setActiveFilter(f)}
            className={`px-3 py-1.5 rounded-xl text-xs font-semibold transition-all ${
              activeFilter === f
                ? 'bg-brand-blu text-white'
                : 'bg-gray-100 text-gray-600 hover:bg-gray-200'
            }`}
          >
            {f === 'all' ? 'Tutti' : f === 'news' ? 'Notizie' : f === 'deadline' ? 'Scadenze' : 'Documenti'}
            <span className="ml-1 opacity-70">({counts[f]})</span>
          </button>
        ))}
      </div>

      {loading ? (
        <div className="text-center py-8">
          <div className="w-6 h-6 border-2 border-brand-blu border-t-transparent rounded-full animate-spin mx-auto" />
        </div>
      ) : filtered.length === 0 ? (
        <div className="text-center py-8 text-gray-400">
          <Bookmark size={32} className="mx-auto mb-2 opacity-50" />
          <p className="text-sm">Nessun elemento salvato.</p>
          <p className="text-xs mt-1">Salva notizie e scadenze cliccando sull&rsquo;icona a forma di stella o campanella.</p>
        </div>
      ) : (
        <div className="space-y-2 max-h-80 overflow-y-auto pr-1">
          {filtered.map(item => (
            <div
              key={item.id}
              className="flex items-start gap-3 p-3 bg-gray-50 rounded-xl border border-gray-100 group hover:border-gray-200 transition"
            >
              <div className="mt-0.5">{typeIcon(item.item_type)}</div>
              <div className="flex-1 min-w-0">
                <p className="text-sm font-medium text-gray-800 truncate">{item.item_data.title}</p>
                {item.item_data.description && (
                  <p className="text-xs text-gray-500 truncate mt-0.5">{item.item_data.description}</p>
                )}
                <div className="flex items-center gap-2 mt-1">
                  <span className="text-[10px] text-gray-400 uppercase">{item.item_type}</span>
                  {item.item_data.date && (
                    <span className="text-[10px] text-gray-400">{item.item_data.date}</span>
                  )}
                </div>
              </div>
              <div className="flex gap-1 opacity-0 group-hover:opacity-100 transition-opacity">
                {item.item_data.link && item.item_data.link !== '#' && (
                  <a
                    href={item.item_data.link}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="p-1.5 text-gray-400 hover:text-brand-blu transition"
                  >
                    <ExternalLink size={14} />
                  </a>
                )}
                <button
                  onClick={() => handleRemove(item.id)}
                  className="p-1.5 text-gray-400 hover:text-red-500 transition"
                >
                  <Trash2 size={14} />
                </button>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
