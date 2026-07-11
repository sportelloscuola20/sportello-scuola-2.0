import { useState } from 'react';
import { X, GraduationCap, Briefcase, User } from 'lucide-react';
import { useAuth } from '../foundation/AuthContext';
import { useProfileStore } from '../../store/useProfileStore';
import { supabase } from '../../lib/supabaseClient';

const RUOLI = [
  { key: 'docente', label: 'Docente', icon: GraduationCap },
  { key: 'ata', label: 'ATA', icon: Briefcase },
  { key: 'aspirante', label: 'Aspirante / Genitore', icon: User },
];

export default function OnboardingModal() {
  const { user, refreshProfile } = useAuth();
  const { updatePreferences, completeOnboarding } = useProfileStore();
  const [step, setStep] = useState(1);
  const [ruolo, setRuolo] = useState('');
  const [classeConcorso, setClasseConcorso] = useState('');
  const [interessi, setInteressi] = useState<string[]>([]);
  const [saving, setSaving] = useState(false);

  const INTERESSI_MAP: Record<string, string[]> = {
    docente: ['GPS', 'TFA Sostegno', 'Assegnazioni Provvisorie', 'Interpelli', 'Ricorsi', 'Formazione'],
    ata: ['3 Fascia ATA', 'Graduatoria 24 Mesi', 'Utilizzazioni', 'Interpelli ATA'],
    aspirante: ['Orientamento', 'Borse di Studio', 'Iscrizioni', 'Supporto Genitori'],
  };

  const handleInteresseToggle = (val: string) => {
    setInteressi(prev =>
      prev.includes(val) ? prev.filter(v => v !== val) : [...prev, val]
    );
  };

  const handleComplete = async () => {
    if (!user) return;
    setSaving(true);

    await supabase.from('profiles').upsert({
      id: user.id,
      email: user.email,
      full_name: user.full_name,
      ruolo: ruolo || user.ruolo,
      onboarded: true,
      preferences: { ruolo, classeConcorso, interessi },
      notification_targets: { email: true, push: true, categorie: interessi },
      updated_at: new Date().toISOString(),
    });

    await updatePreferences({ ruolo, classeConcorso, interessi });
    await completeOnboarding();
    await refreshProfile();
    setSaving(false);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 backdrop-blur-sm">
      <div className="bg-white rounded-3xl shadow-2xl w-full max-w-lg mx-4 p-8 relative animate-fade-in-up">
        <div className="flex items-center gap-2 mb-6">
          {[1, 2].map(s => (
            <div key={s} className={`h-2 rounded-full flex-1 transition-all ${s <= step ? 'bg-brand-blu' : 'bg-gray-200'}`} />
          ))}
        </div>

        {step === 1 && (
          <div className="space-y-6">
            <div className="text-center">
              <div className="w-16 h-16 bg-brand-blu/10 rounded-2xl flex items-center justify-center mx-auto mb-4">
                <GraduationCap size={28} className="text-brand-blu" />
              </div>
              <h2 className="text-2xl font-bold text-gray-800">Benvenuto!</h2>
              <p className="text-gray-500 text-sm mt-1">Raccontaci di te per personalizzare l'esperienza.</p>
            </div>

            <div className="space-y-2">
              <label className="text-sm font-medium text-gray-700">Chi sei?</label>
              <div className="grid grid-cols-3 gap-2">
                {RUOLI.map(r => (
                  <button
                    key={r.key}
                    onClick={() => setRuolo(r.key)}
                    className={`flex flex-col items-center gap-2 p-4 rounded-2xl border-2 transition-all ${
                      ruolo === r.key
                        ? 'border-brand-blu bg-brand-blu/5 text-brand-blu'
                        : 'border-gray-200 text-gray-600 hover:border-brand-blu/30'
                    }`}
                  >
                    <r.icon size={24} />
                    <span className="text-xs font-semibold">{r.label}</span>
                  </button>
                ))}
              </div>
            </div>

            <div className="space-y-2">
              <label className="text-sm font-medium text-gray-700">Classe di concorso / Profilo (opzionale)</label>
              <input
                type="text"
                value={classeConcorso}
                onChange={e => setClasseConcorso(e.target.value)}
                placeholder="es. A043, AA24, CS..."
                className="w-full px-4 py-3 border border-gray-200 rounded-2xl text-sm focus:outline-none focus:ring-2 focus:ring-brand-blu/20 focus:border-brand-blu"
              />
            </div>

            <button
              onClick={() => setStep(2)}
              disabled={!ruolo}
              className="w-full py-3 bg-gradient-to-r from-brand-blu to-brand-verde text-white rounded-2xl font-semibold hover:opacity-90 disabled:opacity-50 disabled:cursor-not-allowed transition"
            >
              Continua
            </button>
          </div>
        )}

        {step === 2 && (
          <div className="space-y-6">
            <div className="text-center">
              <h2 className="text-2xl font-bold text-gray-800">I tuoi interessi</h2>
              <p className="text-gray-500 text-sm mt-1">Seleziona gli argomenti che ti interessano.</p>
            </div>

            <div className="flex flex-wrap gap-2">
              {(INTERESSI_MAP[ruolo] || INTERESSI_MAP.aspirante).map(val => (
                <button
                  key={val}
                  onClick={() => handleInteresseToggle(val)}
                  className={`px-4 py-2.5 rounded-2xl text-sm font-medium border-2 transition-all ${
                    interessi.includes(val)
                      ? 'border-brand-verde bg-brand-verde/10 text-brand-verde'
                      : 'border-gray-200 text-gray-600 hover:border-brand-verde/30'
                  }`}
                >
                  {val}
                </button>
              ))}
            </div>

            <div className="flex gap-3">
              <button
                onClick={() => setStep(1)}
                className="flex-1 py-3 border-2 border-gray-300 text-gray-600 rounded-2xl font-semibold hover:bg-gray-50 transition"
              >
                Indietro
              </button>
              <button
                onClick={handleComplete}
                disabled={saving}
                className="flex-1 py-3 bg-gradient-to-r from-brand-blu to-brand-verde text-white rounded-2xl font-semibold hover:opacity-90 disabled:opacity-50 transition flex items-center justify-center gap-2"
              >
                {saving && <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin" />}
                Salva e Inizia
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
