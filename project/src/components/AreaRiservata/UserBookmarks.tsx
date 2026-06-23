import { useState } from 'react';
import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { Bookmark, Star, Calendar, FileText, Trash2, ExternalLink, Filter, Search } from 'lucide-react';
import { supabase } from '../../lib/supabaseClient';
import { useAuth } from '../Auth/AuthContext';
import { useProfileStore } from '../../store/useProfileStore';
import type { UserFavorite, NewsCache } from '../../types/database';

export default function UserBookmarks() {
  const { user } = useAuth();
  const { preferences } = useProfileStore();
  const queryClient = useQueryClient();
  const [activeFilter, setActiveFilter] = useState<string>('all');
  const [searchTerm, setSearchTerm] = useState('');

  const { data: favorites = [], isLoading: favsLoading } = useQuery<UserFavorite[]>({
    queryKey: ['user_favorites', user?.id],
    queryFn: async () => {
      if (!user) return [];
      const { data } = await supabase
        .from('user_favorites')
        .select('*')
        .eq('user_id', user.id)
        .order('created_at', { ascending: false });
      return (data || []) as UserFavorite[];
    },
    enabled: !!user,
  });

  const { data: newsFeed = [], isLoading: newsLoading } = useQuery<NewsCache[]>({
    queryKey: ['news_feed', user?.id],
    queryFn: async () => {
      const interessi = (preferences?.interessi as string[]) || [];
      let query = supabase
        .from('news_cache')
        .select('*')
        .order('created_at', { ascending: false })
        .limit(20);

      if (interessi.length > 0) {
        const categoryFilter = interessi.map(i => i.toLowerCase());
        const { data: all } = await query;
        if (all) {
          return all.filter(n =>
            categoryFilter.some(c =>
              n.category?.toLowerCase().includes(c) ||
              n.title?.toLowerCase().includes(c)
            )
          ) as NewsCache[];
        }
      }

      const { data } = await query;
      return (data || []) as NewsCache[];
    },
    enabled: !!user,
  });

  const addMutation = useMutation({
    mutationFn: async (news: NewsCache) => {
      await supabase.from('user_favorites').upsert({
        user_id: user!.id,
        item_type: 'news',
        item_id: news.id,
        item_data: { title: news.title, category: news.category, link: news.source_url },
      }, { onConflict: 'user_id,item_type,item_id' });
    },
    onMutate: async (news) => {
      await queryClient.cancelQueries({ queryKey: ['user_favorites', user?.id] });
      const prev = queryClient.getQueryData<UserFavorite[]>(['user_favorites', user?.id]);
      queryClient.setQueryData<UserFavorite[]>(['user_favorites', user?.id], (old) => [
        {
          id: `optimistic-${news.id}`,
          user_id: user!.id,
          item_type: 'news',
          item_id: news.id,
          item_data: { title: news.title, category: news.category, link: news.source_url },
          created_at: new Date().toISOString(),
        },
        ...(old || []),
      ]);
      return { prev };
    },
    onError: (_err, _news, context) => {
      if (context?.prev) {
        queryClient.setQueryData(['user_favorites', user?.id], context.prev);
      }
    },
    onSettled: () => {
      queryClient.invalidateQueries({ queryKey: ['user_favorites', user?.id] });
    },
  });

  const removeMutation = useMutation({
    mutationFn: async (id: string) => {
      await supabase.from('user_favorites').delete().eq('id', id);
    },
    onMutate: async (id) => {
      await queryClient.cancelQueries({ queryKey: ['user_favorites', user?.id] });
      const prev = queryClient.getQueryData<UserFavorite[]>(['user_favorites', user?.id]);
      queryClient.setQueryData<UserFavorite[]>(['user_favorites', user?.id], (old) =>
        (old || []).filter(f => f.id !== id)
      );
      return { prev };
    },
    onError: (_err, _id, context) => {
      if (context?.prev) {
        queryClient.setQueryData(['user_favorites', user?.id], context.prev);
      }
    },
    onSettled: () => {
      queryClient.invalidateQueries({ queryKey: ['user_favorites', user?.id] });
    },
  });

  const favItemIds = new Set(favorites.map(f => f.item_id));

  const favoriteItems = favorites;
  const filteredFavs = activeFilter === 'all'
    ? favoriteItems
    : favoriteItems.filter(f => f.item_type === activeFilter);

  const filteredNews = newsFeed.filter(n =>
    n.title?.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const typeIcon = (type: string) => {
    switch (type) {
      case 'news': return <Star size={14} className="text-brand-ambra" />;
      case 'bando': return <Calendar size={14} className="text-red-400" />;
      case 'document': return <FileText size={14} className="text-brand-blu" />;
      default: return <Bookmark size={14} />;
    }
  };

  if (!user) return null;

  return (
    <div className="space-y-6">
      <div className="flex items-center gap-2">
        <Bookmark size={20} className="text-brand-blu" />
        <h2 className="text-lg font-bold text-white">I Miei Preferiti</h2>
      </div>

      <div className="bg-white/5 border border-white/10 rounded-2xl p-5 space-y-4">
        <div className="flex gap-2 flex-wrap">
          {(['all', 'news', 'bando', 'document'] as const).map(f => (
            <button
              key={f}
              onClick={() => setActiveFilter(f)}
              className={`px-3 py-1.5 rounded-xl text-xs font-semibold transition-all ${
                activeFilter === f
                  ? 'bg-brand-blu text-white'
                  : 'bg-white/10 text-white/60 hover:bg-white/20'
              }`}
            >
              {f === 'all' ? 'Tutti' : f === 'news' ? 'Notizie' : f === 'bando' ? 'Bandi' : 'Documenti'}
              <span className="ml-1 opacity-70">({f === 'all' ? favoriteItems.length : favoriteItems.filter(x => x.item_type === f).length})</span>
            </button>
          ))}
        </div>

        {favsLoading ? (
          <div className="text-center py-8">
            <div className="w-6 h-6 border-2 border-brand-blu border-t-transparent rounded-full animate-spin mx-auto" />
          </div>
        ) : filteredFavs.length === 0 ? (
          <div className="text-center py-8 text-white/30">
            <Bookmark size={32} className="mx-auto mb-2 opacity-50" />
            <p className="text-sm">Nessun preferito.</p>
            <p className="text-xs mt-1">Salva notizie dal feed qui sotto.</p>
          </div>
        ) : (
          <div className="space-y-1.5 max-h-72 overflow-y-auto pr-1">
            {filteredFavs.map(f => (
              <div key={f.id} className="flex items-start gap-3 p-3 bg-white/5 rounded-xl border border-white/5 group hover:bg-white/10 transition">
                <div className="mt-0.5">{typeIcon(f.item_type)}</div>
                <div className="flex-1 min-w-0">
                  <p className="text-sm font-medium text-white truncate">
                    {(f.item_data as Record<string, unknown>)?.title as string || 'Elemento'}
                  </p>
                  <p className="text-xs text-white/40 mt-0.5">{(f.item_data as Record<string, unknown>)?.category as string || f.item_type}</p>
                </div>
                <div className="flex gap-1 opacity-0 group-hover:opacity-100 transition-opacity">
                  {(f.item_data as Record<string, unknown>)?.link && (f.item_data as Record<string, unknown>).link !== '#' && (
                    <a
                      href={(f.item_data as Record<string, unknown>).link as string}
                      target="_blank" rel="noopener noreferrer"
                      className="p-1.5 text-white/40 hover:text-brand-blu transition"
                    >
                      <ExternalLink size={14} />
                    </a>
                  )}
                  <button
                    onClick={() => {
                      if (f.id.startsWith('optimistic-')) return;
                      removeMutation.mutate(f.id);
                    }}
                    className="p-1.5 text-white/40 hover:text-red-400 transition"
                  >
                    <Trash2 size={14} />
                  </button>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>

      <div className="bg-white/5 border border-white/10 rounded-2xl p-5 space-y-4">
        <div className="flex items-center justify-between">
          <h3 className="text-sm font-semibold text-white">Feed Notizie</h3>
          <div className="flex items-center gap-2">
            <Search size={14} className="text-white/30" />
            <input
              type="text"
              value={searchTerm}
              onChange={e => setSearchTerm(e.target.value)}
              placeholder="Cerca..."
              className="bg-white/10 border border-white/10 text-white text-xs rounded-xl px-3 py-1.5 w-32 focus:outline-none focus:ring-2 focus:ring-brand-blu/30 placeholder:text-white/20"
            />
          </div>
        </div>

        {newsLoading ? (
          <div className="text-center py-8">
            <div className="w-6 h-6 border-2 border-brand-blu border-t-transparent rounded-full animate-spin mx-auto" />
          </div>
        ) : (
          <div className="space-y-1.5 max-h-72 overflow-y-auto pr-1">
            {filteredNews.map(news => {
              const isFav = favItemIds.has(news.id);
              return (
                <div key={news.id} className="flex items-start gap-3 p-3 bg-white/5 rounded-xl border border-white/5 group hover:bg-white/10 transition">
                  <div className="flex-1 min-w-0">
                    <p className="text-sm font-medium text-white truncate">{news.title}</p>
                    <p className="text-xs text-white/40 mt-0.5">{news.category}</p>
                  </div>
                  <button
                    onClick={() => isFav ? removeMutation.mutate(favorites.find(f => f.item_id === news.id)!.id) : addMutation.mutate(news)}
                    className={`p-1.5 transition flex-shrink-0 ${
                      isFav ? 'text-brand-ambra' : 'text-white/30 hover:text-brand-ambra'
                    }`}
                  >
                    <Star size={14} fill={isFav ? 'currentColor' : 'none'} />
                  </button>
                </div>
              );
            })}
          </div>
        )}
      </div>
    </div>
  );
}
