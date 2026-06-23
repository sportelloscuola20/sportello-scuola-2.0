import { useMemo } from 'react';
import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { Bell, Calendar, AlertTriangle, AlarmClock, ExternalLink, Eye, EyeOff } from 'lucide-react';
import { supabase } from '../../lib/supabaseClient';
import { useAuth } from '../Auth/AuthContext';

interface BandoItem {
  id: string;
  titolo: string;
  ente: string;
  tipo: string;
  data_scadenza: string;
  data_pubblicazione: string;
  link: string | null;
  regione: string | null;
  provincia: string | null;
  descrizione: string | null;
}

export default function BandiWatch() {
  const { user } = useAuth();
  const queryClient = useQueryClient();

  const { data: followedIds = [] } = useQuery<string[]>({
    queryKey: ['followed_bandi_ids', user?.id],
    queryFn: async () => {
      if (!user) return [];
      const { data } = await supabase
        .from('user_favorites')
        .select('item_id')
        .eq('user_id', user.id)
        .eq('item_type', 'bando');
      return (data || []).map(f => f.item_id);
    },
    enabled: !!user,
  });

  const { data: bandi = [], isLoading } = useQuery<BandoItem[]>({
    queryKey: ['bandi_watch', user?.id],
    queryFn: async () => {
      const { data } = await supabase
        .from('interpelli_nazionali')
        .select('*')
        .order('data_scadenza', { ascending: true });
      return (data || []) as BandoItem[];
    },
    enabled: !!user,
  });

  const followMutation = useMutation({
    mutationFn: async ({ itemId, follow }: { itemId: string; follow: boolean }) => {
      if (follow) {
        await supabase.from('user_favorites').upsert({
          user_id: user!.id,
          item_type: 'bando',
          item_id: itemId,
          item_data: {},
        }, { onConflict: 'user_id,item_type,item_id' });
      } else {
        await supabase.from('user_favorites').delete()
          .eq('user_id', user!.id)
          .eq('item_type', 'bando')
          .eq('item_id', itemId);
      }
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['followed_bandi_ids', user?.id] });
    },
  });

  const followedSet = new Set(followedIds);
  const followedBandi = useMemo(
    () => bandi.filter(b => followedSet.has(b.id)),
    [bandi, followedSet]
  );

  const getDaysRemaining = (scadenza: string): number => {
    const now = new Date();
    const scad = new Date(scadenza);
    const diff = scad.getTime() - now.getTime();
    return Math.ceil(diff / (1000 * 60 * 60 * 24));
  };

  const getBadge = (days: number) => {
    if (days < 0) return { label: 'SCADUTO', class: 'bg-red-500/20 text-red-400 border-red-500/30' };
    if (days <= 3) return { label: `URGENTE (${days}g)`, class: 'bg-red-500/20 text-red-400 border-red-500/30' };
    if (days <= 7) return { label: `${days} giorni`, class: 'bg-amber-500/20 text-amber-400 border-amber-500/30' };
    return { label: `${days} giorni`, class: 'bg-green-500/20 text-green-400 border-green-500/30' };
  };

  const formatDate = (dateStr: string) => {
    return new Date(dateStr).toLocaleDateString('it-IT', {
      day: '2-digit', month: 'short', year: 'numeric'
    });
  };

  if (!user) return null;

  return (
    <div className="space-y-6">
      <div className="flex items-center gap-2">
        <Bell size={20} className="text-brand-blu" />
        <h2 className="text-lg font-bold text-white">Scadenziario Bandi</h2>
      </div>

      <div className="bg-white/5 border border-white/10 rounded-2xl p-5 space-y-3">
        <h3 className="text-sm font-semibold text-white/80">
          Bandi Seguiti ({followedBandi.length})
        </h3>

        {isLoading ? (
          <div className="text-center py-8">
            <div className="w-6 h-6 border-2 border-brand-blu border-t-transparent rounded-full animate-spin mx-auto" />
          </div>
        ) : followedBandi.length === 0 ? (
          <div className="text-center py-8 text-white/30">
            <EyeOff size={32} className="mx-auto mb-2 opacity-50" />
            <p className="text-sm">Nessun bando seguito.</p>
            <p className="text-xs mt-1">Clicca sull'icona occhio nei bandi qui sotto per seguirli.</p>
          </div>
        ) : (
          <div className="space-y-2 max-h-72 overflow-y-auto pr-1">
            {followedBandi.map(bando => {
              const days = getDaysRemaining(bando.data_scadenza);
              const badge = getBadge(days);
              return (
                <div key={bando.id} className="p-3 bg-white/5 rounded-xl border border-white/5 group hover:bg-white/10 transition">
                  <div className="flex items-start gap-3">
                    <div className={`mt-0.5 px-2 py-1 rounded-lg text-[10px] font-bold border ${badge.class}`}>
                      {badge.label}
                    </div>
                    <div className="flex-1 min-w-0">
                      <p className="text-sm font-medium text-white truncate">{bando.titolo}</p>
                      <p className="text-xs text-white/40 truncate">{bando.ente} — {bando.provincia || bando.regione || ''}</p>
                      <div className="flex items-center gap-3 mt-1">
                        <span className="text-[10px] text-white/30">
                          <Calendar size={10} className="inline mr-1" />
                          {formatDate(bando.data_scadenza)}
                        </span>
                        <span className="text-[10px] text-white/30">{bando.tipo}</span>
                      </div>
                    </div>
                    <div className="flex gap-1">
                      {bando.link && (
                        <a href={bando.link} target="_blank" rel="noopener noreferrer" className="p-1.5 text-white/40 hover:text-brand-blu transition">
                          <ExternalLink size={14} />
                        </a>
                      )}
                      <button
                        onClick={() => followMutation.mutate({ itemId: bando.id, follow: false })}
                        className="p-1.5 text-white/40 hover:text-red-400 transition"
                      >
                        <EyeOff size={14} />
                      </button>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        )}
      </div>

      <div className="bg-white/5 border border-white/10 rounded-2xl p-5 space-y-3">
        <h3 className="text-sm font-semibold text-white/80">Tutti i Bandi</h3>
        <div className="space-y-2 max-h-80 overflow-y-auto pr-1">
          {bandi.map(bando => {
            const days = getDaysRemaining(bando.data_scadenza);
            const badge = getBadge(days);
            const isFollowed = followedSet.has(bando.id);

            return (
              <div key={bando.id} className="p-3 bg-white/5 rounded-xl border border-white/5 group hover:bg-white/10 transition">
                <div className="flex items-start gap-3">
                  <div className={`mt-0.5 px-2 py-1 rounded-lg text-[10px] font-bold border ${badge.class}`}>
                    {badge.label}
                  </div>
                  <div className="flex-1 min-w-0">
                    <p className="text-sm font-medium text-white truncate">{bando.titolo}</p>
                    <p className="text-xs text-white/40 truncate">{bando.ente} — {bando.provincia || bando.regione || ''}</p>
                    <div className="flex items-center gap-3 mt-1">
                      <span className="text-[10px] text-white/30">
                        <Calendar size={10} className="inline mr-1" />
                        {formatDate(bando.data_scadenza)}
                      </span>
                    </div>
                  </div>
                  <div className="flex gap-1">
                    {bando.link && (
                      <a href={bando.link} target="_blank" rel="noopener noreferrer" className="p-1.5 text-white/40 hover:text-brand-blu transition">
                        <ExternalLink size={14} />
                      </a>
                    )}
                    <button
                      onClick={() => followMutation.mutate({ itemId: bando.id, follow: !isFollowed })}
                      className={`p-1.5 transition ${isFollowed ? 'text-brand-verde' : 'text-white/40 hover:text-brand-verde'}`}
                    >
                      {isFollowed ? <Eye size={14} /> : <EyeOff size={14} />}
                    </button>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
}
