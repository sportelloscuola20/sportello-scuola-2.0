import { useState, useEffect } from 'react';
import { Bookmark, TrendingUp, Calendar, Sparkles, GraduationCap, Briefcase, User, Bell, ArrowRight, Newspaper, Clock } from 'lucide-react';
import { Link } from 'react-router-dom';
import { supabase } from '../lib/supabaseClient';
import { useAuth } from '../components/foundation/AuthContext';
import { useProfileStore } from '../store/useProfileStore';
import SavedItems from '../components/ui/profile/SavedItems';
import CalendarWidget from '../components/ui/profile/CalendarWidget';
import { formatDataItaliana } from '../rag/intelligence-engine';

const ROLE_CONFIG = {
  docente: {
    icon: <GraduationCap size={24} />,
    label: 'Docente',
    tagline: 'Gestisci la tua carriera nella scuola',
    highlights: [
      { label: 'Calcolo GPS', desc: 'Simulazione punteggio aggiornata', path: '/area-riservata/punteggi' },
      { label: 'Bandi e Interpelli', desc: 'Nuove opportunità per docenti', path: '/area-riservata/bandi' },
      { label: 'Documenti Utili', desc: 'Contratti, certificazioni, titoli', path: '/area-riservata/documenti' },
    ],
  },
  ata: {
    icon: <Briefcase size={24} />,
    label: 'ATA',
    tagline: 'La tua carriera nel personale scolastico',
    highlights: [
      { label: 'Graduatorie ATA', desc: 'Calcolo punteggio 3 fascia e 24 mesi', path: '/area-riservata/punteggi' },
      { label: 'Scadenze ATA', desc: 'Bandi e utilizzazioni', path: '/area-riservata/bandi' },
      { label: 'Fascicolo Digitale', desc: 'Carica e gestisci i tuoi documenti', path: '/area-riservata/documenti' },
    ],
  },
  aspirante: {
    icon: <User size={24} />,
    label: 'Aspirante',
    tagline: 'Il primo passo verso la scuola',
    highlights: [
      { label: 'Orientamento', desc: 'Guide e risorse per iniziare', path: '/area-riservata/punteggi' },
      { label: 'Notizie e Scadenze', desc: 'Borse di studio, iscrizioni, bandi', path: '/area-riservata/bandi' },
      { label: 'Documenti', desc: 'Certificazioni e titoli di studio', path: '/area-riservata/documenti' },
    ],
  },
};

export default function AreaRiservataPage() {
  const { user } = useAuth();
  const { profile } = useProfileStore();
  const [preferitiCount, setPreferitiCount] = useState<number | null>(null);
  const [simulazioniCount, setSimulazioniCount] = useState<number | null>(null);
  const [bandiCount, setBandiCount] = useState<number | null>(null);
  const [personalNews, setPersonalNews] = useState<any[]>([]);
  const [personalDeadlines, setPersonalDeadlines] = useState<any[]>([]);

  const ruolo = profile?.ruolo || user?.ruolo || 'aspirante';

  useEffect(() => {
    if (!user) return;
    Promise.all([
      supabase.from('saved_items').select('id', { count: 'exact', head: true }).eq('user_id', user.id),
      supabase.from('simulations').select('id', { count: 'exact', head: true }).eq('user_id', user.id),
      supabase.from('user_favorites').select('id', { count: 'exact', head: true }).eq('user_id', user.id),
    ]).then(([saved, sims, favs]) => {
      if (saved.count !== null) setPreferitiCount(saved.count);
      if (sims.count !== null) setSimulazioniCount(sims.count);
      if (favs.count !== null) setBandiCount(favs.count);
    });
  }, [user]);

  useEffect(() => {
    const fetchPersonalContent = async () => {
      const targetMap: Record<string, string[]> = {
        docente: ['docenti', 'aspiranti_docenti', 'sostegno'],
        ata: ['ata', 'amministrativi', 'collaboratori', 'dsga'],
        aspirante: ['aspiranti_docenti', 'docenti'],
      };
      const targets = targetMap[ruolo] || ['docenti'];

      const { data: news } = await supabase
        .from('intelligence_news')
        .select('id, titolo, descrizione, categoria, data_pubblicazione, link, is_pinned')
        .eq('is_archived', false)
        .order('is_pinned', { ascending: false })
        .order('data_pubblicazione', { ascending: false })
        .limit(5);

      if (news) setPersonalNews(news);

      const { data: deadlines } = await supabase
        .from('intelligence_scadenze')
        .select('id, titolo, descrizione, data_scadenza, priorita, tipo')
        .gte('data_scadenza', new Date().toISOString())
        .order('data_scadenza', { ascending: true })
        .limit(5);

      if (deadlines) setPersonalDeadlines(deadlines);
    };
    fetchPersonalContent();
  }, [ruolo]);

  const config = ROLE_CONFIG[ruolo as keyof typeof ROLE_CONFIG] || ROLE_CONFIG.aspirante;

  const quickStats = [
    { label: 'Preferiti', value: preferitiCount ?? '—', icon: <Bookmark size={16} />, color: 'from-amber-400 to-orange-500' },
    { label: 'Simulazioni', value: simulazioniCount ?? '—', icon: <TrendingUp size={16} />, color: 'from-blue-400 to-indigo-500' },
    { label: 'Bandi seguiti', value: bandiCount ?? '—', icon: <Calendar size={16} />, color: 'from-green-400 to-emerald-500' },
    { label: 'Premium', value: user?.is_premium ? 'ATTIVO' : 'Free', icon: <Sparkles size={16} />, color: 'from-brand-ambra to-orange-500' },
  ];

  return (
    <div className="grid grid-cols-12 gap-6">
      <div className="col-span-12 relative overflow-hidden rounded-3xl bg-gradient-to-br from-brand-blu/20 via-brand-verde/10 to-brand-ottanio/20 border border-white/10 p-6 sm:p-10">
        <div className="absolute top-0 right-0 w-64 h-64 bg-brand-verde/10 rounded-full blur-3xl" />
        <div className="absolute bottom-0 left-0 w-48 h-48 bg-brand-blu/10 rounded-full blur-3xl" />
        <div className="relative">
          <div className="flex items-center gap-2 text-white/60 text-sm mb-2">
            {config.icon}
            <span className="px-2 py-0.5 rounded-md bg-white/10 text-xs font-medium">{config.label}</span>
          </div>
          <h1 className="text-2xl sm:text-3xl font-bold text-white mb-2">
            {config.tagline}
          </h1>
          <p className="text-white/60 text-sm max-w-xl">
            Controlla punteggi, documenti, bandi e preferiti in un hub personalizzato per il tuo profilo.
          </p>
        </div>
      </div>

      {quickStats.map(stat => (
        <div key={stat.label} className="col-span-12 sm:col-span-6 lg:col-span-3 relative overflow-hidden rounded-2xl bg-white/5 border border-white/10 p-6 hover:bg-white/10 transition group">
          <div className={`absolute inset-0 opacity-0 group-hover:opacity-10 bg-gradient-to-br ${stat.color} transition-opacity`} />
          <div className="relative">
            <div className="text-white/60 mb-3">{stat.icon}</div>
            <p className="text-2xl font-bold text-white">{stat.value}</p>
            <p className="text-xs text-white/40 mt-1">{stat.label}</p>
          </div>
        </div>
      ))}

      {config.highlights.map(h => (
        <Link
          key={h.path}
          to={h.path}
          className="col-span-12 sm:col-span-6 lg:col-span-4 group relative overflow-hidden rounded-2xl bg-white/5 border border-white/10 p-6 hover:bg-white/10 transition"
        >
          <div className="relative">
            <p className="text-white font-semibold text-sm mb-1 group-hover:text-brand-verde transition-colors">
              {h.label}
            </p>
            <p className="text-white/40 text-xs">{h.desc}</p>
          </div>
          <ArrowRight size={14} className="absolute right-4 top-1/2 -translate-y-1/2 text-white/20 group-hover:text-brand-verde group-hover:translate-x-1 transition-all" />
        </Link>
      ))}

      <div className="col-span-12 lg:col-span-6 rounded-2xl bg-white/5 border border-white/10 p-6">
        <div className="flex items-center gap-2 mb-4">
          <Bookmark size={16} className="text-brand-ambra" />
          <h3 className="text-sm font-semibold text-white">Notizie in Evidenza</h3>
        </div>
        <SavedItems />
      </div>
      <div className="col-span-12 lg:col-span-6 rounded-2xl bg-white/5 border border-white/10 p-6">
        <div className="flex items-center gap-2 mb-4">
          <Bell size={16} className="text-brand-ottanio" />
          <h3 className="text-sm font-semibold text-white">Scadenze Preferite</h3>
        </div>
        <CalendarWidget />
      </div>

      {personalNews.length > 0 && (
        <div className="col-span-12 rounded-2xl bg-white/5 border border-white/10 p-6">
          <div className="flex items-center justify-between mb-4">
            <div className="flex items-center gap-2">
              <Newspaper size={16} className="text-brand-blu" />
              <h3 className="text-sm font-semibold text-white">Ultime Notizie per Te</h3>
            </div>
            <Link to="/notizie-scadenze" className="text-xs text-brand-verde hover:underline flex items-center gap-1">
              Vedi tutte <ArrowRight size={12} />
            </Link>
          </div>
          <div className="space-y-3">
            {personalNews.slice(0, 4).map((n: any) => (
              <Link key={n.id} to={n.link || '/notizie-scadenze'}
                className="block p-3 bg-white/5 rounded-xl hover:bg-white/10 transition group">
                <div className="flex items-start justify-between gap-3">
                  <div className="min-w-0">
                    <p className="text-sm font-medium text-white truncate group-hover:text-brand-verde transition">{n.titolo}</p>
                    <p className="text-xs text-white/40 mt-1 line-clamp-1">{n.descrizione}</p>
                  </div>
                  <span className="text-[10px] text-white/30 whitespace-nowrap flex items-center gap-1">
                    <Clock size={10} /> {formatDataItaliana(n.data_pubblicazione)}
                  </span>
                </div>
              </Link>
            ))}
          </div>
        </div>
      )}

      {personalDeadlines.length > 0 && (
        <div className="col-span-12 rounded-2xl bg-white/5 border border-white/10 p-6">
          <div className="flex items-center justify-between mb-4">
            <div className="flex items-center gap-2">
              <Calendar size={16} className="text-brand-ambra" />
              <h3 className="text-sm font-semibold text-white">Prossime Scadenze</h3>
            </div>
            <Link to="/notizie-scadenze?tab=scadenze" className="text-xs text-brand-verde hover:underline flex items-center gap-1">
              Vedi tutte <ArrowRight size={12} />
            </Link>
          </div>
          <div className="space-y-3">
            {personalDeadlines.slice(0, 4).map((d: any) => (
              <Link key={d.id} to="/notizie-scadenze?tab=scadenze"
                className="block p-3 bg-white/5 rounded-xl hover:bg-white/10 transition group">
                <div className="flex items-start justify-between gap-3">
                  <div className="min-w-0">
                    <p className="text-sm font-medium text-white truncate group-hover:text-brand-verde transition">{d.titolo}</p>
                    <p className="text-xs text-white/40 mt-1">{d.tipo}</p>
                  </div>
                  <div className="flex items-center gap-2">
                    <span className={`text-[10px] px-2 py-0.5 rounded-full font-medium ${
                      d.priorita === 'urgente' ? 'bg-red-500/20 text-red-300' :
                      d.priorita === 'alta' ? 'bg-amber-500/20 text-amber-300' :
                      'bg-blue-500/20 text-blue-300'
                    }`}>{d.priorita}</span>
                    <span className="text-[10px] text-white/30 whitespace-nowrap flex items-center gap-1">
                      <Calendar size={10} /> {formatDataItaliana(d.data_scadenza)}
                    </span>
                  </div>
                </div>
              </Link>
            ))}
          </div>
        </div>
      )}
    </div>
  );
}
