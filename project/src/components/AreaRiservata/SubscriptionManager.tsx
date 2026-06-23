import { useState } from 'react';
import { useQuery } from '@tanstack/react-query';
import { CreditCard, Crown, Lock, CheckCircle, ExternalLink, Loader2, Sparkles } from 'lucide-react';
import { supabase } from '../../lib/supabaseClient';
import { useAuth } from '../Auth/AuthContext';

const FEATURES_PREMIUM = [
  'Consulenza prioritaria via chat 1:1',
  'Prenotazioni senza costi aggiuntivi',
  'Notifiche email personalizzate',
  'Accesso anticipato a nuovi bandi',
  'Salvataggio illimitato di preferiti',
  'Storico simulazioni completo',
  'Fascicolo digitale con 1GB di spazio',
  'Nessun limite ai calcoli punteggio',
];

export default function SubscriptionManager() {
  const { user } = useAuth();
  const [loadingPortal, setLoadingPortal] = useState(false);
  const [portalError, setPortalError] = useState<string | null>(null);

  const { data: profile } = useQuery({
    queryKey: ['profile_premium', user?.id],
    queryFn: async () => {
      if (!user) return null;
      const { data } = await supabase
        .from('profiles')
        .select('is_premium')
        .eq('id', user.id)
        .single();
      return data;
    },
    enabled: !!user,
  });

  const isPremium = profile?.is_premium || user?.is_premium || false;

  const handleManageSubscription = async () => {
    setLoadingPortal(true);
    setPortalError(null);

    try {
      const { data, error } = await supabase.functions.invoke('create-portal-session', {
        body: { return_url: window.location.origin + '/area-riservata/abbonamento' },
      });

      if (error) throw new Error(error.message);
      if (data?.url) {
        window.location.href = data.url;
      } else {
        throw new Error('Nessun URL di reindirizzamento ricevuto');
      }
    } catch (err) {
      setPortalError(
        err instanceof Error
          ? err.message
          : 'Errore di connessione con Stripe. Riprova più tardi.'
      );
    } finally {
      setLoadingPortal(false);
    }
  };

  return (
    <div className="space-y-6">
      <div className="flex items-center gap-2">
        <CreditCard size={20} className="text-brand-blu" />
        <h2 className="text-lg font-bold text-white">Abbonamento</h2>
      </div>

      <div className="bg-white/5 border border-white/10 rounded-2xl p-6">
        <div className="flex items-center justify-between mb-4">
          <div>
            <p className="text-xs text-white/40 uppercase tracking-wider">Stato attuale</p>
            <div className="flex items-center gap-2 mt-1">
              {isPremium ? (
                <>
                  <Crown size={20} className="text-brand-ambra" />
                  <span className="text-lg font-bold text-white">Premium</span>
                </>
              ) : (
                <>
                  <Lock size={20} className="text-white/40" />
                  <span className="text-lg font-bold text-white">Free</span>
                </>
              )}
            </div>
          </div>
          {isPremium && (
            <div className="px-3 py-1.5 bg-brand-ambra/10 border border-brand-ambra/20 rounded-xl">
              <span className="text-brand-ambra text-xs font-bold">ATTIVO</span>
            </div>
          )}
        </div>

        {isPremium && (
          <div className="p-4 bg-brand-verde/10 border border-brand-verde/20 rounded-2xl mb-4">
            <p className="text-brand-verde text-sm font-medium">
              Grazie per essere un utente Premium! {'<3'}
            </p>
            <p className="text-brand-verde/70 text-xs mt-1">
              Tutti i servizi premium sono attivi e disponibili.
            </p>
          </div>
        )}

        <button
          onClick={handleManageSubscription}
          disabled={loadingPortal}
          className="w-full py-3 bg-gradient-to-r from-brand-blu to-brand-verde text-white rounded-2xl font-semibold hover:opacity-90 disabled:opacity-50 transition flex items-center justify-center gap-2"
        >
          {loadingPortal ? (
            <>
              <Loader2 size={16} className="animate-spin" />
              Reindirizzamento a Stripe...
            </>
          ) : (
            <>
              <ExternalLink size={16} />
              {isPremium ? 'Gestisci Abbonamento' : 'Abbonati a Premium'}
            </>
          )}
        </button>

        {portalError && (
          <div className="mt-3 p-3 bg-red-500/10 border border-red-500/20 rounded-xl text-red-400 text-xs">
            {portalError}
          </div>
        )}
      </div>

      <div className="bg-white/5 border border-white/10 rounded-2xl p-5 space-y-4">
        <div className="flex items-center gap-2">
          <Sparkles size={18} className="text-brand-ambra" />
          <h3 className="text-sm font-semibold text-white">Vantaggi Premium</h3>
        </div>
        <div className="grid sm:grid-cols-2 gap-2">
          {FEATURES_PREMIUM.map((feat, i) => (
            <div key={i} className="flex items-start gap-2 text-xs text-white/60">
              <CheckCircle size={14} className="text-brand-verde mt-0.5 flex-shrink-0" />
              {feat}
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
