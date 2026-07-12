import { useState, useEffect } from 'react';
import { supabase } from '../lib/supabaseClient';
import { useAuth } from '../components/foundation/AuthContext';
import { BarChart3, Activity, Database, Clock, Users, Search, MessageSquare, AlertTriangle } from 'lucide-react';

interface Stats {
  geminiCalls: { total: number; today: number; avgLatency: number; errors: number };
  analytics: { pageViews: number; searches: number; chatMessages: number; uniqueUsers: number };
  sources: { active: number; total: number; errors: number };
  knowledge: { news: number; scadenze: number; documenti: number; interpelli: number };
}

export default function ObservabilityPage() {
  const { user } = useAuth();
  const [stats, setStats] = useState<Stats | null>(null);
  const [loading, setLoading] = useState(true);
  const [recentCalls, setRecentCalls] = useState<any[]>([]);

  useEffect(() => {
    if (!user?.is_admin) return;
    loadStats();
  }, [user?.is_admin]);

  const loadStats = async () => {
    setLoading(true);
    try {
      const today = new Date().toISOString().split('T')[0];

      const [geminiTotal, geminiToday, geminiErrors, analyticsRes, sourcesRes, newsCount, scadCount, docCount, intCount, recentRes] = await Promise.all([
        supabase.from('gemini_calls_log').select('*', { count: 'exact', head: true }),
        supabase.from('gemini_calls_log').select('latency_ms').gte('created_at', today),
        supabase.from('gemini_calls_log').select('*', { count: 'exact', head: true }).eq('status', 'error'),
        supabase.from('page_analytics').select('event_type, user_id').gte('created_at', today),
        supabase.from('monitored_sources').select('status'),
        supabase.from('intelligence_news').select('*', { count: 'exact', head: true }),
        supabase.from('intelligence_scadenze').select('*', { count: 'exact', head: true }),
        supabase.from('documenti_normativi').select('*', { count: 'exact', head: true }),
        supabase.from('interpelli_nazionali').select('*', { count: 'exact', head: true }),
        supabase.from('gemini_calls_log').select('*').order('created_at', { ascending: false }).limit(10),
      ]);

      const latencies = geminiToday.data?.map((c: any) => c.latency_ms).filter(Boolean) || [];
      const avgLatency = latencies.length > 0 ? Math.round(latencies.reduce((a: number, b: number) => a + b, 0) / latencies.length) : 0;

      const pageViews = analyticsRes.data?.filter((e: any) => e.event_type === 'page_view').length || 0;
      const searches = analyticsRes.data?.filter((e: any) => e.event_type === 'search').length || 0;
      const chatMessages = analyticsRes.data?.filter((e: any) => e.event_type === 'chat_message').length || 0;
      const uniqueUsers = new Set(analyticsRes.data?.map((e: any) => e.user_id).filter(Boolean)).size;

      const activeSources = sourcesRes.data?.filter((s: any) => s.status === 'active').length || 0;
      const errorSources = sourcesRes.data?.filter((s: any) => s.status === 'error' || s.status === 'blocked').length || 0;

      setStats({
        geminiCalls: { total: geminiTotal.count || 0, today: geminiToday.data?.length || 0, avgLatency, errors: geminiErrors.count || 0 },
        analytics: { pageViews, searches, chatMessages, uniqueUsers },
        sources: { active: activeSources, total: sourcesRes.data?.length || 0, errors: errorSources },
        knowledge: { news: newsCount.count || 0, scadenze: scadCount.count || 0, documenti: docCount.count || 0, interpelli: intCount.count || 0 },
      });
      setRecentCalls(recentRes.data || []);
    } catch (e) {
      console.error('Failed to load observability stats', e);
    } finally {
      setLoading(false);
    }
  };

  if (!user?.is_admin) {
    return (
      <div className="min-h-[60vh] flex items-center justify-center">
        <div className="text-center">
          <AlertTriangle size={48} className="text-amber-400 mx-auto mb-4" />
          <h2 className="text-xl font-bold text-gray-800 mb-2">Accesso Riservato</h2>
          <p className="text-gray-500">Questa pagina è accessibile solo agli amministratori.</p>
        </div>
      </div>
    );
  }

  if (loading) {
    return (
      <div className="min-h-[60vh] flex items-center justify-center">
        <div className="animate-pulse text-center">
          <div className="w-16 h-16 bg-brand-blu/10 rounded-2xl flex items-center justify-center mx-auto mb-4">
            <BarChart3 size={32} className="text-brand-blu" />
          </div>
          <p className="text-gray-500">Caricamento metriche...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      <div className="mb-8">
        <h1 className="text-3xl font-extrabold text-[#0F172A] mb-2">AI Observability</h1>
        <p className="text-gray-500">Metriche pipeline, uso API Gemini, analytics piattaforma.</p>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 mb-8">
        <StatCard icon={<Activity size={20} />} label="Chiamate Gemini Oggi" value={stats?.geminiCalls.today ?? 0} sub={`Media: ${stats?.geminiCalls.avgLatency ?? 0}ms`} color="blue" />
        <StatCard icon={<Users size={20} />} label="Utenti Attivi Oggi" value={stats?.analytics.uniqueUsers ?? 0} sub={`${stats?.analytics.pageViews ?? 0} page views`} color="green" />
        <StatCard icon={<Database size={20} />} label="Fonti Attive" value={`${stats?.sources.active ?? 0}/${stats?.sources.total ?? 0}`} sub={`${stats?.sources.errors ?? 0} errori`} color={stats?.sources.errors ? 'red' : 'amber'} />
        <StatCard icon={<MessageSquare size={20} />} label="Chat Oggi" value={stats?.analytics.chatMessages ?? 0} sub={`${stats?.analytics.searches ?? 0} ricerche`} color="purple" />
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-8">
        <div className="bg-white rounded-2xl border border-slate-200/60 shadow-soft p-6">
          <h3 className="text-lg font-bold text-[#0F172A] mb-4 flex items-center gap-2">
            <BarChart3 size={18} className="text-brand-blu" /> Knowledge Base
          </h3>
          <div className="grid grid-cols-2 gap-4">
            <KBDetail label="Notizie" value={stats?.knowledge.news ?? 0} />
            <KBDetail label="Scadenze" value={stats?.knowledge.scadenze ?? 0} />
            <KBDetail label="Documenti Normativi" value={stats?.knowledge.documenti ?? 0} />
            <KBDetail label="Interpelli" value={stats?.knowledge.interpelli ?? 0} />
          </div>
        </div>

        <div className="bg-white rounded-2xl border border-slate-200/60 shadow-soft p-6">
          <h3 className="text-lg font-bold text-[#0F172A] mb-4 flex items-center gap-2">
            <AlertTriangle size={18} className="text-amber-500" /> Errori & Stato
          </h3>
          <div className="space-y-3">
            <div className="flex items-center justify-between">
              <span className="text-sm text-gray-600">Errori Gemini totali</span>
              <span className={`font-bold ${stats?.geminiCalls.errors ? 'text-red-500' : 'text-green-500'}`}>
                {stats?.geminiCalls.errors ?? 0}
              </span>
            </div>
            <div className="flex items-center justify-between">
              <span className="text-sm text-gray-600">Chiamate Gemini totali</span>
              <span className="font-bold text-gray-800">{stats?.geminiCalls.total ?? 0}</span>
            </div>
            <div className="flex items-center justify-between">
              <span className="text-sm text-gray-600">Fonti con errore/bloccate</span>
              <span className={`font-bold ${stats?.sources.errors ? 'text-amber-500' : 'text-green-500'}`}>
                {stats?.sources.errors ?? 0}
              </span>
            </div>
          </div>
        </div>
      </div>

      <div className="bg-white rounded-2xl border border-slate-200/60 shadow-soft p-6">
        <h3 className="text-lg font-bold text-[#0F172A] mb-4 flex items-center gap-2">
          <Clock size={18} className="text-brand-ottanio" /> Ultime 10 Chiamate Gemini
        </h3>
        <div className="overflow-x-auto">
          <table className="w-full text-sm">
            <thead>
              <tr className="border-b border-gray-100 text-left text-xs text-gray-500 uppercase tracking-wider">
                <th className="pb-2 pr-4">Modello</th>
                <th className="pb-2 pr-4">Prompt (anteprima)</th>
                <th className="pb-2 pr-4">Latency</th>
                <th className="pb-2 pr-4">Tokens In</th>
                <th className="pb-2 pr-4">Status</th>
                <th className="pb-2">Data</th>
              </tr>
            </thead>
            <tbody>
              {recentCalls.map((call: any) => (
                <tr key={call.id} className="border-b border-gray-50 hover:bg-gray-50/50">
                  <td className="py-2.5 pr-4 font-mono text-xs text-gray-600">{call.model}</td>
                  <td className="py-2.5 pr-4 text-xs text-gray-700 max-w-[200px] truncate">{call.prompt_preview}</td>
                  <td className="py-2.5 pr-4 text-xs font-medium">{call.latency_ms}ms</td>
                  <td className="py-2.5 pr-4 text-xs text-gray-600">{call.tokens_in}</td>
                  <td className="py-2.5 pr-4">
                    <span className={`px-2 py-0.5 rounded-full text-[10px] font-bold ${call.status === 'ok' ? 'bg-green-100 text-green-700' : 'bg-red-100 text-red-700'}`}>
                      {call.status}
                    </span>
                  </td>
                  <td className="py-2.5 text-xs text-gray-500">{new Date(call.created_at).toLocaleString('it-IT')}</td>
                </tr>
              ))}
              {recentCalls.length === 0 && (
                <tr><td colSpan={6} className="py-8 text-center text-gray-400 text-sm">Nessuna chiamata registrata.</td></tr>
              )}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}

function StatCard({ icon, label, value, sub, color }: { icon: React.ReactNode; label: string; value: string | number; sub: string; color: string }) {
  const colorMap: Record<string, string> = {
    blue: 'bg-blue-50 text-blue-600',
    green: 'bg-green-50 text-green-600',
    red: 'bg-red-50 text-red-600',
    amber: 'bg-amber-50 text-amber-600',
    purple: 'bg-purple-50 text-purple-600',
  };
  return (
    <div className="bg-white rounded-2xl border border-slate-200/60 shadow-soft p-5">
      <div className="flex items-center gap-3 mb-3">
        <div className={`w-10 h-10 rounded-xl flex items-center justify-center ${colorMap[color]}`}>{icon}</div>
        <span className="text-xs font-medium text-gray-500">{label}</span>
      </div>
      <p className="text-2xl font-extrabold text-[#0F172A]">{value}</p>
      <p className="text-xs text-gray-400 mt-1">{sub}</p>
    </div>
  );
}

function KBDetail({ label, value }: { label: string; value: number }) {
  return (
    <div className="bg-gray-50 rounded-xl p-3">
      <p className="text-xs text-gray-500 mb-1">{label}</p>
      <p className="text-xl font-bold text-[#0F172A]">{value.toLocaleString('it-IT')}</p>
    </div>
  );
}
