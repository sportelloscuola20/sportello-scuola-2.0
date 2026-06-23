import { useState, useMemo } from 'react';
import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { TrendingUp, Plus, Trash2, RotateCcw, Loader2, BarChart3 } from 'lucide-react';
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';
import { supabase } from '../../lib/supabaseClient';
import { useAuth } from '../Auth/AuthContext';
import type { Simulation } from '../../types/database';

const TITOLI_SIMULABILI = [
  { id: 'master', label: 'Master (30 CFU)', punti: 3 },
  { id: 'cert_linguistica_c1', label: 'Cert. Linguistica C1', punti: 3 },
  { id: 'cert_linguistica_c2', label: 'Cert. Linguistica C2', punti: 4 },
  { id: 'cert_informatica', label: 'Cert. Informatica', punti: 0.5 },
  { id: 'clil', label: 'Metodologia CLIL', punti: 2 },
  { id: 'dottorato', label: 'Dottorato di Ricerca', punti: 5 },
  { id: 'abilitazione', label: 'Abilitazione altra classe', punti: 6 },
  { id: 'tirocinio_formativo', label: 'Tirocinio Formativo Attivo', punti: 1 },
];

export default function ScoreHistory() {
  const { user } = useAuth();
  const queryClient = useQueryClient();
  const [graduatoriaFilter, setGraduatoriaFilter] = useState<string>('tutte');
  const [showWhatIf, setShowWhatIf] = useState(false);
  const [whatIfTitoli, setWhatIfTitoli] = useState<string[]>([]);
  const [whatIfBase, setWhatIfBase] = useState(0);

  const { data: simulations = [], isLoading } = useQuery<Simulation[]>({
    queryKey: ['simulations', user?.id],
    queryFn: async () => {
      if (!user) return [];
      let query = supabase
        .from('simulations')
        .select('*')
        .eq('user_id', user.id)
        .order('created_at', { ascending: false });

      if (graduatoriaFilter !== 'tutte') {
        query = query.eq('tipo_graduatoria', graduatoriaFilter);
      }

      const { data } = await query;
      return (data || []) as Simulation[];
    },
    enabled: !!user,
  });

  const deleteMutation = useMutation({
    mutationFn: async (id: string) => {
      await supabase.from('simulations').delete().eq('id', id);
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['simulations', user?.id] });
    },
  });

  const chartData = useMemo(() => {
    const sorted = [...simulations].reverse();
    return sorted.map((s, i) => ({
      index: i + 1,
      data: new Date(s.created_at).toLocaleDateString('it-IT', { day: '2-digit', month: 'short' }),
      punteggio: Number(s.punteggio_finale),
      tipo: s.tipo_graduatoria,
    }));
  }, [simulations]);

  const whatIfPunteggio = useMemo(() => {
    const bonus = TITOLI_SIMULABILI
      .filter(t => whatIfTitoli.includes(t.id))
      .reduce((sum, t) => sum + t.punti, 0);
    return whatIfBase + bonus;
  }, [whatIfTitoli, whatIfBase]);

  const handleRestore = (sim: Simulation) => {
    setWhatIfBase(Number(sim.punteggio_finale));
    setWhatIfTitoli([]);
    setShowWhatIf(true);
  };

  if (isLoading) {
    return (
      <div className="rounded-2xl bg-white/5 border border-white/10 p-5">
        <div className="animate-pulse space-y-4">
          <div className="h-6 bg-white/10 rounded w-48" />
          <div className="h-48 bg-white/10 rounded" />
        </div>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-2">
          <TrendingUp size={20} className="text-brand-blu" />
          <h2 className="text-lg font-bold text-white">Evoluzione Punteggi</h2>
        </div>
        <select
          value={graduatoriaFilter}
          onChange={e => setGraduatoriaFilter(e.target.value)}
          className="bg-white/10 border border-white/10 text-white text-sm rounded-xl px-3 py-1.5 focus:outline-none focus:ring-2 focus:ring-brand-blu/30"
        >
          <option value="tutte" className="bg-[#0F172A]">Tutte</option>
          <option value="gps" className="bg-[#0F172A]">GPS</option>
          <option value="ata" className="bg-[#0F172A]">ATA</option>
        </select>
      </div>

      {chartData.length === 0 ? (
        <div className="text-center py-12 text-white/40">
          <BarChart3 size={40} className="mx-auto mb-3 opacity-50" />
          <p className="text-sm">Nessuna simulazione salvata.</p>
          <p className="text-xs mt-1">Calcola il tuo punteggio per vedere il grafico.</p>
        </div>
      ) : (
        <div className="bg-white/5 border border-white/10 rounded-2xl p-4">
          <ResponsiveContainer width="100%" height={220}>
            <LineChart data={chartData}>
              <CartesianGrid strokeDasharray="3 3" stroke="rgba(255,255,255,0.05)" />
              <XAxis dataKey="data" stroke="rgba(255,255,255,0.3)" tick={{ fontSize: 11 }} />
              <YAxis stroke="rgba(255,255,255,0.3)" tick={{ fontSize: 11 }} />
              <Tooltip
                contentStyle={{ background: '#1E293B', border: '1px solid rgba(255,255,255,0.1)', borderRadius: 12, color: '#fff' }}
                labelFormatter={(label) => `Data: ${label}`}
              />
              <Line type="monotone" dataKey="punteggio" stroke="#235377" strokeWidth={2} dot={{ fill: '#1F915E', r: 4 }} />
            </LineChart>
          </ResponsiveContainer>
        </div>
      )}

      {!showWhatIf && (
        <button
          onClick={() => { setWhatIfBase(chartData.length > 0 ? Number(simulations[0].punteggio_finale) : 0); setWhatIfTitoli([]); setShowWhatIf(true); }}
          className="w-full py-2.5 bg-brand-blu/10 text-brand-blu rounded-xl text-sm font-semibold hover:bg-brand-blu/20 transition flex items-center justify-center gap-2"
        >
          <Plus size={16} />
          Simula "What-If" — Aggiungi Titoli
        </button>
      )}

      {showWhatIf && (
        <div className="bg-white/5 border border-white/10 rounded-2xl p-5 space-y-4 animate-fade-in">
          <div className="flex items-center justify-between">
            <h3 className="text-sm font-semibold text-white">Simulazione What-If</h3>
            <button onClick={() => setShowWhatIf(false)} className="text-white/40 hover:text-white text-xs">Chiudi</button>
          </div>

          <div className="space-y-2">
            <label className="text-xs text-white/60">Punteggio base di partenza</label>
            <input
              type="number"
              value={whatIfBase}
              onChange={e => setWhatIfBase(Number(e.target.value))}
              className="w-full px-3 py-2 bg-white/10 border border-white/10 text-white rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-brand-blu/30"
            />
          </div>

          <div className="space-y-1">
            <label className="text-xs text-white/60">Titoli da simulare</label>
            <div className="grid grid-cols-2 gap-1.5">
              {TITOLI_SIMULABILI.map(t => (
                <button
                  key={t.id}
                  onClick={() => setWhatIfTitoli(prev =>
                    prev.includes(t.id) ? prev.filter(v => v !== t.id) : [...prev, t.id]
                  )}
                  className={`text-left px-3 py-2 rounded-xl text-xs font-medium border transition-all ${
                    whatIfTitoli.includes(t.id)
                      ? 'border-brand-verde bg-brand-verde/10 text-brand-verde'
                      : 'border-white/10 text-white/60 hover:border-white/30'
                  }`}
                >
                  {t.label}
                  <span className="block text-[10px] opacity-70">+{t.punti} punti</span>
                </button>
              ))}
            </div>
          </div>

          <div className="p-4 bg-gradient-to-r from-brand-blu/20 to-brand-verde/20 rounded-2xl text-center">
            <p className="text-xs text-white/60">Punteggio simulato</p>
            <p className="text-3xl font-bold text-white">{whatIfPunteggio.toFixed(1)}</p>
            {whatIfBase > 0 && (
              <p className="text-xs text-brand-verde mt-1">
                +{(whatIfPunteggio - whatIfBase).toFixed(1)} punti rispetto alla base
              </p>
            )}
          </div>
        </div>
      )}

      <div className="space-y-2">
        <h3 className="text-sm font-semibold text-white/80">Storico Simulazioni</h3>
        {simulations.length === 0 ? (
          <p className="text-xs text-white/30 py-4 text-center">Nessuna simulazione archiviata.</p>
        ) : (
          <div className="space-y-1.5 max-h-60 overflow-y-auto pr-1">
            {simulations.map(sim => (
              <div key={sim.id} className="flex items-center gap-3 p-3 bg-white/5 rounded-xl border border-white/5 group hover:bg-white/10 transition">
                <div className="flex-1 min-w-0">
                  <p className="text-sm font-medium text-white truncate">
                    {sim.tipo_graduatoria.toUpperCase()} — {Number(sim.punteggio_finale).toFixed(1)} pts
                  </p>
                  <p className="text-xs text-white/40">{new Date(sim.created_at).toLocaleDateString('it-IT')}</p>
                </div>
                <div className="flex gap-1 opacity-0 group-hover:opacity-100 transition-opacity">
                  <button
                    onClick={() => handleRestore(sim)}
                    className="p-1.5 text-white/40 hover:text-brand-verde transition"
                    title="Carica nella simulazione"
                  >
                    <RotateCcw size={14} />
                  </button>
                  <button
                    onClick={() => deleteMutation.mutate(sim.id)}
                    className="p-1.5 text-white/40 hover:text-red-400 transition"
                    title="Elimina"
                  >
                    <Trash2 size={14} />
                  </button>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
