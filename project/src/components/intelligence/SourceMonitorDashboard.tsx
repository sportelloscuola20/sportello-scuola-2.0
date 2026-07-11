import { useState, useEffect } from 'react';
import { Shield, Activity, AlertTriangle, RefreshCw, Globe, Rss, Server, CheckCircle2, XCircle, Clock } from 'lucide-react';
import { LIVELLI_FONTE, FONTE_STATO_COLORS } from '../../types/intelligence';
import type { MonitoredSource, LivelloFonte, IntelligenceDashboardStats } from '../../types/intelligence';
import { fetchMonitoredSources, fetchDashboardStats, getDashboardFallbackStats, triggerMonitorSources } from '../../rag/intelligence-engine';

const LIVELLI_ORDINE: LivelloFonte[] = ['A', 'B', 'C', 'D', 'E', 'F'];

function FonteTipoIcon({ tipo }: { tipo: string }) {
  switch (tipo) {
    case 'rss': return <Rss size={12} />;
    case 'api': return <Server size={12} />;
    default: return <Globe size={12} />;
  }
}

function formatUltimoCheck(date: string | null): string {
  if (!date) return 'mai';
  const diff = Date.now() - new Date(date).getTime();
  const min = Math.floor(diff / 60000);
  if (min < 1) return 'ora';
  if (min < 60) return `${min}min fa`;
  const h = Math.floor(min / 60);
  if (h < 24) return `${h}h fa`;
  return `${Math.floor(h / 24)}g fa`;
}

interface SourceGroupProps {
  livello: LivelloFonte;
  fonti: MonitoredSource[];
}

function SourceGroup({ livello, fonti }: SourceGroupProps) {
  const info = LIVELLI_FONTE[livello];
  const attive = fonti.filter(f => f.stato === 'attivo').length;
  const inErrore = fonti.filter(f => f.stato === 'errore').length;
  const colorBorder: Record<string, string> = {
    A: 'border-green-300', B: 'border-blue-300', C: 'border-purple-300',
    D: 'border-teal-300', E: 'border-amber-300', F: 'border-gray-300',
  };
  const colorBg: Record<string, string> = {
    A: 'bg-green-50', B: 'bg-blue-50', C: 'bg-purple-50',
    D: 'bg-teal-50', E: 'bg-amber-50', F: 'bg-gray-50',
  };

  return (
    <div className={`rounded-2xl border ${colorBorder[livello]} ${colorBg[livello]} p-4`}>
      <div className="flex items-center justify-between mb-3">
        <div>
          <span className="text-sm font-bold">{info?.nome}</span>
          <span className="text-xs text-gray-500 ml-2">Peso: {info?.peso}/100</span>
        </div>
        <div className="flex items-center gap-2 text-xs">
          <span className="text-green-600 font-medium">{attive} attive</span>
          {inErrore > 0 && <span className="text-red-600 font-medium">{inErrore} errore</span>}
        </div>
      </div>
      <div className="space-y-1.5">
        {fonti.map(fonte => (
          <div key={fonte.id} className="flex items-center justify-between bg-white/60 rounded-xl px-3 py-2 border border-slate-200/40">
            <div className="flex items-center gap-2 min-w-0">
              <span className={`flex-shrink-0 ${FONTE_STATO_COLORS[fonte.stato]} p-0.5 rounded-full`}>
                {fonte.stato === 'attivo' ? <CheckCircle2 size={12} /> : <XCircle size={12} />}
              </span>
              <span className="text-xs font-semibold truncate">{fonte.nome}</span>
              <FonteTipoIcon tipo={fonte.tipo} />
              {fonte.stato === 'errore' && (
                <span className="text-[10px] text-red-500 truncate max-w-[200px]" title={fonte.errore_msg || ''}>
                  {fonte.errore_msg}
                </span>
              )}
            </div>
            <div className="flex items-center gap-2 flex-shrink-0">
              <span className="text-[10px] text-gray-400 flex items-center gap-1">
                <Clock size={10} /> {formatUltimoCheck(fonte.ultimo_check)}
              </span>
              <span className={`text-[10px] font-mono ${fonte.stato === 'attivo' ? 'text-green-600' : 'text-red-600'}`}>
                {fonte.stato}
              </span>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

export default function SourceMonitorDashboard() {
  const [sources, setSources] = useState<MonitoredSource[]>([]);
  const [stats, setStats] = useState<IntelligenceDashboardStats>(getDashboardFallbackStats());
  const [loading, setLoading] = useState(true);
  const [refreshing, setRefreshing] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const loadData = async () => {
    try {
      const [s, st] = await Promise.all([
        fetchMonitoredSources(),
        fetchDashboardStats(),
      ]);
      if (s.length > 0) setSources(s);
      if (st) setStats(st);
      setError(null);
    } catch {
      setError('Impossibile connettersi al database. Dati mock visualizzati.');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => { loadData(); }, []);

  const handleRefresh = async () => {
    setRefreshing(true);
    const result = await triggerMonitorSources();
    if (result.success) {
      await new Promise(r => setTimeout(r, 2000));
      await loadData();
    } else {
      setError(result.message);
    }
    setRefreshing(false);
  };

  const grouped = LIVELLI_ORDINE.map(l => ({
    livello: l,
    fonti: sources.filter(s => s.livello === l),
  })).filter(g => g.fonti.length > 0);

  return (
    <div className="space-y-4">
      {/* Stats bar */}
      <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-5 gap-3">
        <div className="bg-white/80 rounded-2xl border border-slate-200/60 p-3 text-center">
          <p className="text-2xl font-extrabold text-green-600">{stats.fonti_attive}</p>
          <p className="text-[10px] text-gray-500">Fonti Attive / {stats.fonti_totali}</p>
        </div>
        <div className="bg-white/80 rounded-2xl border border-slate-200/60 p-3 text-center">
          <p className="text-2xl font-extrabold text-blue-600">{stats.notizie_attive}</p>
          <p className="text-[10px] text-gray-500">Notizie Intelligence</p>
        </div>
        <div className="bg-white/80 rounded-2xl border border-slate-200/60 p-3 text-center">
          <p className="text-2xl font-extrabold text-amber-600">{stats.scadenze_attive}</p>
          <p className="text-[10px] text-gray-500">Scadenze Attive</p>
        </div>
        <div className="bg-white/80 rounded-2xl border border-slate-200/60 p-3 text-center">
          <p className="text-2xl font-extrabold text-purple-600">{stats.collegamenti_knowledge_graph}</p>
          <p className="text-[10px] text-gray-500">Collegamenti KG</p>
        </div>
        <div className="bg-white/80 rounded-2xl border border-slate-200/60 p-3 text-center">
          <p className="text-2xl font-extrabold text-red-600">{stats.scadenze_imminenti}</p>
          <p className="text-[10px] text-gray-500">Scadenze Imminenti (7gg)</p>
        </div>
      </div>

      {/* Action bar */}
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-2">
          <span className="inline-flex items-center gap-1 text-xs text-gray-500">
            <Activity size={12} className={loading ? 'animate-pulse text-green-500' : 'text-gray-400'} />
            {loading ? 'Caricamento...' : `Ultimo monitoraggio: ${stats.ultimo_monitoraggio ? new Date(stats.ultimo_monitoraggio).toLocaleString('it-IT') : 'mai'}`}
          </span>
          {stats.documenti_da_elaborare > 0 && (
            <span className="inline-flex items-center gap-1 text-xs bg-amber-50 text-amber-700 px-2 py-0.5 rounded-full font-medium">
              {stats.documenti_da_elaborare} da elaborare
            </span>
          )}
        </div>
        <div className="flex gap-2">
          <button onClick={handleRefresh} disabled={refreshing || loading}
            className="flex items-center gap-1.5 px-3 py-1.5 rounded-xl bg-white border border-slate-200/60 text-xs font-semibold text-gray-600 hover:bg-gray-50 transition disabled:opacity-50">
            <RefreshCw size={12} className={refreshing ? 'animate-spin' : ''} />
            {refreshing ? 'Monitoraggio...' : 'Avvia Monitoraggio'}
          </button>
        </div>
      </div>

      {error && (
        <div className="bg-amber-50 border border-amber-200 rounded-2xl p-3 text-xs text-amber-700 flex items-center gap-2">
          <AlertTriangle size={14} /> {error}
        </div>
      )}

      {/* Source groups by level */}
      {loading ? (
        <div className="text-center py-8 text-gray-400 text-sm animate-pulse">Caricamento stato fonti...</div>
      ) : grouped.length > 0 ? (
        <div className="space-y-3">
          {grouped.map(g => <SourceGroup key={g.livello} livello={g.livello} fonti={g.fonti} />)}
        </div>
      ) : (
        <div className="text-center py-8 text-gray-400 text-sm">
          <Shield size={32} className="mx-auto mb-2 opacity-30" />
          Fonti non ancora caricate. Connetti il database Supabase per il monitoraggio live.
        </div>
      )}
    </div>
  );
}
