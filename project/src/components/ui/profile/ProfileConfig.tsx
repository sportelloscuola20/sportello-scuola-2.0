import { useState, useEffect, useCallback } from 'react';
import { User, Save, CheckCircle } from 'lucide-react';
import { supabase } from '../../../lib/supabaseClient';
import { useAuth } from '../../foundation/AuthContext';

interface ProfessionalProfile {
  id?: string;
  user_id?: string;
  full_name: string;
  ruolo: 'docente' | 'ata' | 'aspirante';
  classe_concorso: string;
  punteggio_gps: number;
  punteggio_ata: number;
  fascia_gps: string;
  titoli: string[];
  certificazioni: string[];
  provincia_preferita: string;
  regione_preferita: string;
  created_at?: string;
  updated_at?: string;
}

const CLASSI_CONCORSO = [
  'A-11', 'A-12', 'A-13', 'A-18', 'A-19', 'A-20',
  'A-22', 'A-23', 'A-24', 'A-26', 'A-27', 'A-28',
  'A-29', 'A-30', 'A-31', 'A-32', 'A-33', 'A-34',
  'A-35', 'A-36', 'A-37', 'A-38', 'A-39', 'A-40',
];

const PROVINCE = [
  'Agrigento', 'Alessandria', 'Ancona', 'Aosta', 'Bari', 'Barletta-Andria-Trani',
  'Belluno', 'Benevento', 'Bergamo', 'Biella', 'Bologna', 'Bolzano', 'Brescia',
  'Brindisi', 'Cagliari', 'Caltanissetta', 'Campobasso', 'Caserta', 'Catania',
  'Catanzaro', 'Chieti', 'Como', 'Cosenza', 'Cremona', 'Crotone', 'Cuneo',
  'Enna', 'Fermo', 'Ferrara', 'Firenze', 'Foggia', 'Forlì-Cesena', 'Frosinone',
  'Genova', 'Gorizia', 'Grosseto', 'Imperia', 'Isernia', 'La Spezia',
  'L\'Aquila', 'Latina', 'Lecce', 'Lecco', 'Livorno', 'Lodi', 'Lucca',
  'Macerata', 'Mantova', 'Massa-Carrara', 'Matera', 'Messina', 'Milano',
  'Modena', 'Monza-Brianza', 'Napoli', 'Novara', 'Nuoro', 'Oristano', 'Padova',
  'Palermo', 'Parma', 'Pavia', 'Perugia', 'Pesaro-Urbino', 'Pescara', 'Piacenza',
  'Pisa', 'Pistoia', 'Pordenone', 'Potenza', 'Prato', 'Ragusa', 'Ravenna',
  'Reggio Calabria', 'Reggio Emilia', 'Rieti', 'Rimini', 'Roma', 'Rovigo',
  'Salerno', 'Sassari', 'Savona', 'Siena', 'Siracusa', 'Sondrio', 'Sud Sardegna',
  'Taranto', 'Teramo', 'Terni', 'Torino', 'Trapani', 'Trento', 'Treviso',
  'Trieste', 'Udine', 'Varese', 'Venezia', 'Verbano-Cusio-Ossola', 'Vercelli',
  'Verona', 'Vibo Valentia', 'Vicenza', 'Viterbo',
];

const defaultProfile: ProfessionalProfile = {
  full_name: '',
  ruolo: 'aspirante',
  classe_concorso: '',
  punteggio_gps: 0,
  punteggio_ata: 0,
  fascia_gps: 'I',
  titoli: [],
  certificazioni: [],
  provincia_preferita: '',
  regione_preferita: '',
};

const TITOLI_OPTIONS = [
  'Laurea Magistrale', 'Laurea Triennale', 'Diploma', 'Abilitazione',
  'Dottorato', 'Master I Livello', 'Master II Livello', 'Specializzazione Sostegno',
  'PAS', '24 CFU', '60 CFU', '30 CFU', 'SFP',
];

const CERT_OPTIONS = [
  'B2 Inglese', 'C1 Inglese', 'C2 Inglese', 'B2 Francese', 'C1 Francese',
  'B2 Tedesco', 'C1 Tedesco', 'B2 Spagnolo', 'C1 Spagnolo',
  'ECDL/ICDL', 'EIPASS', 'CIAD', 'PEKIT', 'Nuova ECDL',
];

export default function ProfileConfig() {
  const { user, refreshProfile } = useAuth();
  const [profile, setProfile] = useState<ProfessionalProfile>(defaultProfile);
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [saved, setSaved] = useState(false);

  useEffect(() => {
    if (!user) return;
    setLoading(true);

    Promise.all([
      supabase.from('user_preferences').select('*').eq('user_id', user.id).maybeSingle(),
      supabase.from('user_scores').select('*').eq('user_id', user.id).order('created_at', { ascending: false }).limit(1).maybeSingle(),
    ]).then(([prefResult, scoreResult]) => {
      if (prefResult.data) {
        const pref = prefResult.data as ProfessionalProfile;
        setProfile(prev => ({
          ...prev,
          full_name: pref.full_name || user.full_name || '',
          ruolo: pref.ruolo || user.ruolo || 'aspirante',
          classe_concorso: pref.classe_concorso || '',
          punteggio_gps: pref.punteggio_gps || 0,
          punteggio_ata: pref.punteggio_ata || 0,
          fascia_gps: pref.fascia_gps || 'I',
          titoli: pref.titoli || [],
          certificazioni: pref.certificazioni || [],
          provincia_preferita: pref.provincia_preferita || '',
          regione_preferita: pref.regione_preferita || '',
        }));
      } else {
        setProfile(prev => ({
          ...prev,
          full_name: user.full_name || '',
          ruolo: user.ruolo || 'aspirante',
        }));
      }

      if (scoreResult.data) {
        const score = scoreResult.data;
        if (score.tipo_graduatoria === 'gps') {
          setProfile(prev => ({ ...prev, punteggio_gps: score.punteggio_totale }));
        } else {
          setProfile(prev => ({ ...prev, punteggio_ata: score.punteggio_totale }));
        }
      }

      setLoading(false);
    });
  }, [user]);

  const handleSave = useCallback(async () => {
    if (!user) return;
    setSaving(true);

    const payload = {
      user_id: user.id,
      full_name: profile.full_name,
      ruolo: profile.ruolo,
      classe_concorso: profile.classe_concorso,
      punteggio_gps: profile.punteggio_gps,
      punteggio_ata: profile.punteggio_ata,
      fascia_gps: profile.fascia_gps,
      titoli: profile.titoli,
      certificazioni: profile.certificazioni,
      provincia_preferita: profile.provincia_preferita,
      regione_preferita: profile.regione_preferita,
    };

    const { error } = await supabase.from('user_preferences').upsert(payload, {
      onConflict: 'user_id',
    });

    if (!error) {
      setSaved(true);
      setTimeout(() => setSaved(false), 3000);
      refreshProfile();
    }

    setSaving(false);
  }, [user, profile, refreshProfile]);

  const toggleArrayItem = (field: 'titoli' | 'certificazioni', value: string) => {
    setProfile(prev => ({
      ...prev,
      [field]: prev[field].includes(value)
        ? prev[field].filter(v => v !== value)
        : [...prev[field], value],
    }));
  };

  if (!user) {
    return (
      <div className="p-6 text-center text-gray-500 text-sm">
        Accedi per configurare il tuo profilo professionale.
      </div>
    );
  }

  if (loading) {
    return (
      <div className="text-center py-8">
        <div className="w-6 h-6 border-2 border-brand-blu border-t-transparent rounded-full animate-spin mx-auto" />
      </div>
    );
  }

  return (
    <div>
      <div className="flex items-center gap-2 mb-4">
        <User size={18} className="text-brand-blu" />
        <h3 className="font-semibold text-gray-800">Profilo Professionale</h3>
      </div>

      <div className="space-y-4">
        <div>
          <label className="block text-xs font-medium text-gray-600 mb-1">Nome e Cognome</label>
          <input
            type="text"
            value={profile.full_name}
            onChange={e => setProfile(prev => ({ ...prev, full_name: e.target.value }))}
            className="w-full border border-gray-200 rounded-xl px-3 py-2 text-sm focus:ring-2 focus:ring-brand-blu/20 focus:border-brand-blu transition outline-none"
          />
        </div>

        <div>
          <label className="block text-xs font-medium text-gray-600 mb-1">Ruolo</label>
          <select
            value={profile.ruolo}
            onChange={e => setProfile(prev => ({ ...prev, ruolo: e.target.value as ProfessionalProfile['ruolo'] }))}
            className="w-full border border-gray-200 rounded-xl px-3 py-2 text-sm focus:ring-2 focus:ring-brand-blu/20 focus:border-brand-blu transition outline-none"
          >
            <option value="aspirante">Aspirante</option>
            <option value="docente">Docente</option>
            <option value="ata">ATA</option>
          </select>
        </div>

        {profile.ruolo === 'docente' && (
          <div>
            <label className="block text-xs font-medium text-gray-600 mb-1">Classe di Concorso</label>
            <select
              value={profile.classe_concorso}
              onChange={e => setProfile(prev => ({ ...prev, classe_concorso: e.target.value }))}
              className="w-full border border-gray-200 rounded-xl px-3 py-2 text-sm focus:ring-2 focus:ring-brand-blu/20 focus:border-brand-blu transition outline-none"
            >
              <option value="">Seleziona...</option>
              {CLASSI_CONCORSO.map(c => <option key={c} value={c}>{c}</option>)}
            </select>
          </div>
        )}

        {profile.ruolo === 'docente' && (
          <div>
            <label className="block text-xs font-medium text-gray-600 mb-1">Fascia GPS</label>
            <div className="flex gap-2">
              {(['I', 'II', 'III'] as const).map(f => (
                <button
                  key={f}
                  onClick={() => setProfile(prev => ({ ...prev, fascia_gps: f }))}
                  className={`flex-1 py-2 rounded-xl text-sm font-semibold transition-all ${
                    profile.fascia_gps === f
                      ? 'bg-brand-blu text-white'
                      : 'bg-gray-100 text-gray-600 hover:bg-gray-200'
                  }`}
                >
                  {fasciaLabel(f)}
                </button>
              ))}
            </div>
          </div>
        )}

        <div>
          <p className="text-xs font-medium text-gray-600 mb-2">Titoli Posseduti</p>
          <div className="flex flex-wrap gap-1.5">
            {TITOLI_OPTIONS.map(t => (
              <button
                key={t}
                onClick={() => toggleArrayItem('titoli', t)}
                className={`px-2.5 py-1 rounded-lg text-xs font-medium transition-all ${
                  profile.titoli.includes(t)
                    ? 'bg-brand-blu text-white'
                    : 'bg-gray-100 text-gray-600 hover:bg-gray-200'
                }`}
              >
                {t}
              </button>
            ))}
          </div>
        </div>

        <div>
          <p className="text-xs font-medium text-gray-600 mb-2">Certificazioni</p>
          <div className="flex flex-wrap gap-1.5">
            {CERT_OPTIONS.map(c => (
              <button
                key={c}
                onClick={() => toggleArrayItem('certificazioni', c)}
                className={`px-2.5 py-1 rounded-lg text-xs font-medium transition-all ${
                  profile.certificazioni.includes(c)
                    ? 'bg-brand-verde text-white'
                    : 'bg-gray-100 text-gray-600 hover:bg-gray-200'
                }`}
              >
                {c}
              </button>
            ))}
          </div>
        </div>

        <div className="grid grid-cols-2 gap-3">
          <div>
            <label className="block text-xs font-medium text-gray-600 mb-1">Regione Preferita</label>
            <select
              value={profile.regione_preferita}
              onChange={e => {
                setProfile(prev => ({ ...prev, regione_preferita: e.target.value }));
              }}
              className="w-full border border-gray-200 rounded-xl px-3 py-2 text-sm focus:ring-2 focus:ring-brand-blu/20 focus:border-brand-blu transition outline-none"
            >
              <option value="">Seleziona...</option>
              {['Abruzzo', 'Basilicata', 'Calabria', 'Campania', 'Emilia-Romagna', 'Friuli-Venezia Giulia', 'Lazio', 'Liguria', 'Lombardia', 'Marche', 'Molise', 'Piemonte', 'Puglia', 'Sardegna', 'Sicilia', 'Toscana', 'Trentino-Alto Adige', 'Umbria', 'Valle d\'Aosta', 'Veneto'].map(r => (
                <option key={r} value={r}>{r}</option>
              ))}
            </select>
          </div>
          <div>
            <label className="block text-xs font-medium text-gray-600 mb-1">Provincia Preferita</label>
            <select
              value={profile.provincia_preferita}
              onChange={e => setProfile(prev => ({ ...prev, provincia_preferita: e.target.value }))}
              className="w-full border border-gray-200 rounded-xl px-3 py-2 text-sm focus:ring-2 focus:ring-brand-blu/20 focus:border-brand-blu transition outline-none"
            >
              <option value="">Seleziona...</option>
              {PROVINCE.map(p => <option key={p} value={p}>{p}</option>)}
            </select>
          </div>
        </div>

        <div className="grid grid-cols-2 gap-3">
          <div>
            <label className="block text-xs font-medium text-gray-600 mb-1">Punteggio GPS</label>
            <input
              type="number"
              value={profile.punteggio_gps}
              onChange={e => setProfile(prev => ({ ...prev, punteggio_gps: Number(e.target.value) }))}
              className="w-full border border-gray-200 rounded-xl px-3 py-2 text-sm focus:ring-2 focus:ring-brand-blu/20 focus:border-brand-blu transition outline-none"
            />
          </div>
          <div>
            <label className="block text-xs font-medium text-gray-600 mb-1">Punteggio ATA</label>
            <input
              type="number"
              value={profile.punteggio_ata}
              onChange={e => setProfile(prev => ({ ...prev, punteggio_ata: Number(e.target.value) }))}
              className="w-full border border-gray-200 rounded-xl px-3 py-2 text-sm focus:ring-2 focus:ring-brand-blu/20 focus:border-brand-blu transition outline-none"
            />
          </div>
        </div>

        <button
          onClick={handleSave}
          disabled={saving}
          className="w-full flex items-center justify-center gap-2 py-3 bg-gradient-to-r from-brand-blu to-brand-verde text-white rounded-xl font-semibold hover:opacity-90 transition disabled:opacity-50"
        >
          {saving ? (
            <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin" />
          ) : saved ? (
            <CheckCircle size={18} />
          ) : (
            <Save size={18} />
          )}
          {saved ? 'Salvato!' : 'Salva Profilo'}
        </button>
      </div>
    </div>
  );
}

function fasciaLabel(f: string): string {
  switch (f) {
    case 'I': return 'I Fascia';
    case 'II': return 'II Fascia';
    case 'III': return 'III Fascia';
    default: return f;
  }
}
