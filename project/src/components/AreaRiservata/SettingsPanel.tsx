import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Save, User, Loader2, CheckCircle, AlertTriangle } from 'lucide-react';
import { useAuth } from '../foundation/AuthContext';
import { supabase } from '../../lib/supabaseClient';

const RUOLI = [
  { value: 'aspirante', label: 'Aspirante Docente', desc: 'Chi si prepara per l\'accesso all\'insegnamento' },
  { value: 'docente', label: 'Docente', desc: 'Docente già in ruolo o con incarico annuale' },
  { value: 'ata', label: 'ATA', desc: 'Personale Amministrativo, Tecnico e Ausiliario' },
];

export default function SettingsPanel() {
  const { user, refreshProfile } = useAuth();
  const navigate = useNavigate();
  const [firstName, setFirstName] = useState(user?.full_name?.split(' ')[0] || '');
  const [lastName, setLastName] = useState(user?.full_name?.split(' ').slice(1).join(' ') || '');
  const [ruolo, setRuolo] = useState(user?.ruolo || 'aspirante');
  const [saving, setSaving] = useState(false);
  const [saved, setSaved] = useState(false);
  const [error, setError] = useState('');

  const handleSave = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!user) return;
    setSaving(true);
    setError('');
    setSaved(false);

    try {
      const fullName = `${firstName} ${lastName}`.trim();

      const { error: updateError } = await supabase
        .from('profiles')
        .update({
          full_name: fullName,
          ruolo,
          updated_at: new Date().toISOString(),
        })
        .eq('id', user.id);

      if (updateError) throw updateError;

      const { error: metaError } = await supabase.auth.updateUser({
        data: { full_name: fullName, ruolo },
      });

      if (metaError) throw metaError;

      await refreshProfile();
      setSaved(true);
      setTimeout(() => setSaved(false), 3000);

      if (ruolo !== user.ruolo) {
        setTimeout(() => navigate('/area-riservata', { replace: true }), 500);
      }
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Errore durante il salvataggio');
    } finally {
      setSaving(false);
    }
  };

  return (
    <div className="space-y-6">
      <div className="flex items-center gap-2">
        <User size={20} className="text-brand-blu" />
        <h2 className="text-lg font-bold text-white">Impostazioni Profilo</h2>
      </div>

      <form onSubmit={handleSave} className="bg-white/5 border border-white/10 rounded-2xl p-6 space-y-5">
        <div className="grid sm:grid-cols-2 gap-4">
          <div>
            <label className="block text-sm font-medium text-white/70 mb-1.5">Nome</label>
            <input
              type="text"
              value={firstName}
              onChange={e => setFirstName(e.target.value)}
              required
              className="w-full px-4 py-3 bg-white/10 border border-white/20 rounded-xl text-white text-sm focus:outline-none focus:ring-2 focus:ring-brand-blu/40 focus:border-brand-blu placeholder-white/30"
              placeholder="Mario"
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-white/70 mb-1.5">Cognome</label>
            <input
              type="text"
              value={lastName}
              onChange={e => setLastName(e.target.value)}
              required
              className="w-full px-4 py-3 bg-white/10 border border-white/20 rounded-xl text-white text-sm focus:outline-none focus:ring-2 focus:ring-brand-blu/40 focus:border-brand-blu placeholder-white/30"
              placeholder="Rossi"
            />
          </div>
        </div>

        <div>
          <label className="block text-sm font-medium text-white/70 mb-1.5">Email</label>
          <input
            type="email"
            value={user?.email || ''}
            disabled
            className="w-full px-4 py-3 bg-white/5 border border-white/10 rounded-xl text-white/50 text-sm cursor-not-allowed"
          />
          <p className="text-xs text-white/30 mt-1">L'email non può essere modificata</p>
        </div>

        <div>
          <label className="block text-sm font-medium text-white/70 mb-3">Ruolo</label>
          <div className="grid sm:grid-cols-3 gap-2">
            {RUOLI.map(r => (
              <button
                key={r.value}
                type="button"
                onClick={() => setRuolo(r.value as typeof ruolo)}
                className={`text-left p-4 rounded-xl border-2 transition-all ${
                  ruolo === r.value
                    ? 'border-brand-verde bg-brand-verde/10'
                    : 'border-white/10 bg-white/5 hover:border-white/20'
                }`}
              >
                <p className={`text-sm font-semibold ${ruolo === r.value ? 'text-brand-verde' : 'text-white'}`}>
                  {r.label}
                </p>
                <p className="text-xs text-white/40 mt-1">{r.desc}</p>
              </button>
            ))}
          </div>
          {ruolo !== user?.ruolo && (
            <div className="mt-3 flex items-start gap-2 p-3 bg-brand-ambra/10 border border-brand-ambra/20 rounded-xl">
              <AlertTriangle size={16} className="text-brand-ambra flex-shrink-0 mt-0.5" />
              <p className="text-xs text-brand-ambra">
                Cambiando ruolo, la dashboard e i contenuti si adatteranno automaticamente al nuovo profilo.
              </p>
            </div>
          )}
        </div>

        {error && (
          <div className="p-3 bg-red-500/10 border border-red-500/20 rounded-xl text-red-400 text-sm">{error}</div>
        )}

        <div className="flex items-center gap-3">
          <button
            type="submit"
            disabled={saving}
            className="flex items-center gap-2 px-6 py-3 bg-gradient-to-r from-brand-blu to-brand-verde text-white rounded-xl font-semibold hover:opacity-90 disabled:opacity-50 transition"
          >
            {saving ? (
              <Loader2 size={16} className="animate-spin" />
            ) : (
              <Save size={16} />
            )}
            {saving ? 'Salvataggio...' : 'Salva Modifiche'}
          </button>

          {saved && (
            <div className="flex items-center gap-1.5 text-brand-verde text-sm font-medium">
              <CheckCircle size={16} />
              Modifiche salvate
            </div>
          )}
        </div>
      </form>
    </div>
  );
}
