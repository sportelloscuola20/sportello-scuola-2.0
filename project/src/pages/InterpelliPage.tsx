import { useState, useMemo } from 'react';
import { Search, MapPin, Bell, ExternalLink } from 'lucide-react';

interface Interpello {
  id: string;
  regione: string;
  provincia: string;
  classeConcorso: string;
  profiloATA: string;
  tipo: 'docente' | 'ata';
  dataPubblicazione: string;
  scadenza: string;
  posti: number;
  scuola: string;
}

const REGIONI = [
  'Abruzzo', 'Basilicata', 'Calabria', 'Campania', 'Emilia-Romagna',
  'Friuli-Venezia Giulia', 'Lazio', 'Liguria', 'Lombardia', 'Marche',
  'Molise', 'Piemonte', 'Puglia', 'Sardegna', 'Sicilia',
  'Toscana', 'Trentino-Alto Adige', 'Umbria', 'Valle d\'Aosta', 'Veneto',
];

const PROVINCE: Record<string, string[]> = {
  'Lazio': ['Roma', 'Latina', 'Frosinone', 'Viterbo', 'Rieti'],
  'Lombardia': ['Milano', 'Brescia', 'Bergamo', 'Como', 'Varese', 'Monza', 'Pavia', 'Cremona', 'Mantova', 'Lecco', 'Lodi', 'Sondrio'],
  'Campania': ['Napoli', 'Salerno', 'Caserta', 'Avellino', 'Benevento'],
  'Sicilia': ['Palermo', 'Catania', 'Messina', 'Agrigento', 'Trapani', 'Siracusa', 'Ragusa', 'Caltanissetta', 'Enna'],
  'Puglia': ['Bari', 'Lecce', 'Foggia', 'Taranto', 'Brindisi', 'Barletta-Andria-Trani'],
  'Emilia-Romagna': ['Bologna', 'Modena', 'Reggio Emilia', 'Parma', 'Ferrara', 'Ravenna', 'Forlì-Cesena', 'Rimini', 'Piacenza'],
  'Veneto': ['Venezia', 'Verona', 'Padova', 'Vicenza', 'Treviso', 'Rovigo', 'Belluno'],
  'Piemonte': ['Torino', 'Novara', 'Alessandria', 'Cuneo', 'Asti', 'Vercelli', 'Biella', 'Verbano-Cusio-Ossola'],
};

const CLASSI_CONCORSO_DOCENTI = [
  'A-01', 'A-02', 'A-03', 'A-04', 'A-05', 'A-06', 'A-07', 'A-08', 'A-09', 'A-10',
  'A-11', 'A-12', 'A-13', 'A-14', 'A-15', 'A-16', 'A-17', 'A-18', 'A-19', 'A-20',
  'A-21', 'A-22', 'A-23', 'A-24', 'A-25', 'A-26', 'A-27', 'A-28', 'A-29', 'A-30',
  'A-31', 'A-32', 'A-33', 'A-34', 'A-35', 'A-36', 'A-37', 'A-38', 'A-39', 'A-40',
  'A-41', 'A-42', 'A-43', 'A-44', 'A-45', 'A-46', 'A-47', 'A-48', 'A-49', 'A-50',
  'A-51', 'A-52', 'A-53', 'A-54', 'AAA', 'AABB',
  'Sostegno infanzia', 'Sostegno primaria', 'Sostegno secondaria I grado', 'Sostegno secondaria II grado',
];

const PROFILI_ATA = ['AA', 'AT', 'CS', 'OS', 'GU', 'CU', 'IF'];

const MOCK_INTERPELLI: Interpello[] = [
  { id: '1', regione: 'Lazio', provincia: 'Roma', classeConcorso: 'A-01', profiloATA: '', tipo: 'docente', dataPubblicazione: '2026-06-15', scadenza: '2026-07-15', posti: 3, scuola: 'IC Leonardo Da Vinci' },
  { id: '2', regione: 'Lazio', provincia: 'Latina', classeConcorso: 'A-12', profiloATA: '', tipo: 'docente', dataPubblicazione: '2026-06-14', scadenza: '2026-07-14', posti: 1, scuola: 'Liceo Classico G. B. Grassi' },
  { id: '3', regione: 'Lombardia', provincia: 'Milano', classeConcorso: 'A-22', profiloATA: '', tipo: 'docente', dataPubblicazione: '2026-06-13', scadenza: '2026-07-13', posti: 2, scuola: 'ISIS P. Carcano' },
  { id: '4', regione: 'Campania', provincia: 'Napoli', classeConcorso: '', profiloATA: 'AA', tipo: 'ata', dataPubblicazione: '2026-06-12', scadenza: '2026-07-12', posti: 1, scuola: 'IC 4° Garibaldi' },
  { id: '5', regione: 'Lazio', provincia: 'Roma', classeConcorso: 'Sostegno primaria', profiloATA: '', tipo: 'docente', dataPubblicazione: '2026-06-11', scadenza: '2026-07-11', posti: 4, scuola: 'IC Via Gattamelata' },
  { id: '6', regione: 'Emilia-Romagna', provincia: 'Bologna', classeConcorso: '', profiloATA: 'CS', tipo: 'ata', dataPubblicazione: '2026-06-10', scadenza: '2026-07-10', posti: 2, scuola: 'IC 8 Bologna' },
  { id: '7', regione: 'Puglia', provincia: 'Bari', classeConcorso: 'A-26', profiloATA: '', tipo: 'docente', dataPubblicazione: '2026-06-09', scadenza: '2026-07-09', posti: 1, scuola: 'Liceo Scientifico E. Fermi' },
  { id: '8', regione: 'Sicilia', provincia: 'Palermo', classeConcorso: '', profiloATA: 'AT', tipo: 'ata', dataPubblicazione: '2026-06-08', scadenza: '2026-07-08', posti: 1, scuola: 'ITI V. E. Marconi' },
];

export default function InterpelliPage() {
  const [tipo, setTipo] = useState<'docente' | 'ata'>('docente');
  const [regione, setRegione] = useState('');
  const [provincia, setProvincia] = useState('');
  const [classeConcorso, setClasseConcorso] = useState('');
  const [profiloATA, setProfiloATA] = useState('');

  const provinceDisponibili = regione ? PROVINCE[regione] || [] : [];

  const filtered = useMemo(() => {
    return MOCK_INTERPELLI.filter(i => {
      if (i.tipo !== tipo) return false;
      if (regione && i.regione !== regione) return false;
      if (provincia && i.provincia !== provincia) return false;
      if (tipo === 'docente' && classeConcorso && i.classeConcorso !== classeConcorso) return false;
      if (tipo === 'ata' && profiloATA && i.profiloATA !== profiloATA) return false;
      return true;
    });
  }, [tipo, regione, provincia, classeConcorso, profiloATA]);

  const hasNoResults = filtered.length === 0 && (regione || provincia || classeConcorso || profiloATA);

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-green-50 py-8 px-4">
      <div className="max-w-6xl mx-auto">
        <div className="text-center mb-8">
          <h1 className="text-3xl font-bold text-brand-blu mb-2">Centro Nazionale Interpelli</h1>
          <p className="text-gray-600">Monitoraggio interpelli per supplenze su tutto il territorio nazionale</p>
        </div>

        <div className="bg-white/70 backdrop-blur-xs rounded-3xl shadow-lg border border-white/40 p-6 sm:p-8 mb-8">
          <div className="flex flex-wrap gap-3 mb-6">
            <button
              onClick={() => { setTipo('docente'); setClasseConcorso(''); }}
              className={`px-6 py-2.5 rounded-2xl text-sm font-semibold transition ${
                tipo === 'docente' ? 'bg-brand-blu text-white' : 'bg-gray-100 text-gray-600 hover:bg-gray-200'
              }`}
            >
              Docenti
            </button>
            <button
              onClick={() => { setTipo('ata'); setProfiloATA(''); }}
              className={`px-6 py-2.5 rounded-2xl text-sm font-semibold transition ${
                tipo === 'ata' ? 'bg-brand-verde text-white' : 'bg-gray-100 text-gray-600 hover:bg-gray-200'
              }`}
            >
              ATA
            </button>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
            <div>
              <label className="block text-xs font-medium text-gray-600 mb-1">Regione</label>
              <select
                value={regione}
                onChange={e => { setRegione(e.target.value); setProvincia(''); }}
                className="w-full border border-gray-300 rounded-2xl px-4 py-2.5 text-sm focus:ring-2 focus:ring-brand-blu focus:border-brand-blu transition"
              >
                <option value="">Tutte le regioni</option>
                {REGIONI.map(r => <option key={r} value={r}>{r}</option>)}
              </select>
            </div>

            <div>
              <label className="block text-xs font-medium text-gray-600 mb-1">Provincia</label>
              <select
                value={provincia}
                onChange={e => setProvincia(e.target.value)}
                disabled={!regione}
                className="w-full border border-gray-300 rounded-2xl px-4 py-2.5 text-sm focus:ring-2 focus:ring-brand-blu focus:border-brand-blu transition disabled:opacity-50"
              >
                <option value="">Tutte le province</option>
                {provinceDisponibili.map(p => <option key={p} value={p}>{p}</option>)}
              </select>
            </div>

            <div>
              <label className="block text-xs font-medium text-gray-600 mb-1">
                {tipo === 'docente' ? 'Classe di Concorso' : 'Profilo ATA'}
              </label>
              {tipo === 'docente' ? (
                <select
                  value={classeConcorso}
                  onChange={e => setClasseConcorso(e.target.value)}
                  className="w-full border border-gray-300 rounded-2xl px-4 py-2.5 text-sm focus:ring-2 focus:ring-brand-blu focus:border-brand-blu transition"
                >
                  <option value="">Tutte le classi</option>
                  {CLASSI_CONCORSO_DOCENTI.map(c => <option key={c} value={c}>{c}</option>)}
                </select>
              ) : (
                <select
                  value={profiloATA}
                  onChange={e => setProfiloATA(e.target.value)}
                  className="w-full border border-gray-300 rounded-2xl px-4 py-2.5 text-sm focus:ring-2 focus:ring-brand-blu focus:border-brand-blu transition"
                >
                  <option value="">Tutti i profili</option>
                  {PROFILI_ATA.map(p => (
                    <option key={p} value={p}>{p}</option>
                  ))}
                </select>
              )}
            </div>
          </div>
        </div>

        {hasNoResults && (
          <div className="bg-amber-50 border border-amber-200 rounded-3xl p-8 text-center mb-8">
            <MapPin className="w-12 h-12 text-amber-500 mx-auto mb-4" />
            <h3 className="text-xl font-bold text-amber-800 mb-2">Nessun interpello attivo per questa selezione</h3>
            <p className="text-amber-700 mb-6 max-w-lg mx-auto">
              Attiva il servizio di <strong>Alert Nazionale Pro</strong> per ricevere una notifica email e SMS istantanea non appena si apre un posto nella zona o classe di concorso scelta.
            </p>
            <button className="px-8 py-3 bg-gradient-to-r from-brand-blu to-brand-verde text-white rounded-2xl font-semibold hover:opacity-90 transition shadow-lg">
              <Bell size={18} className="inline mr-2" />
              Attiva Alert Nazionale Pro
            </button>
          </div>
        )}

        {filtered.length > 0 && (
          <div className="space-y-4">
            <p className="text-sm text-gray-500">
              {filtered.length} interpell{filtered.length === 1 ? 'o' : 'i'} trovat{filtered.length === 1 ? 'o' : 'i'}
            </p>
            {filtered.map(item => (
              <div
                key={item.id}
                className="bg-white/70 backdrop-blur-xs border border-gray-200 rounded-2xl p-5 hover:shadow-md transition"
              >
                <div className="flex flex-wrap items-start justify-between gap-3">
                  <div className="flex-1">
                    <div className="flex items-center gap-2 mb-2">
                      <span className={`px-2.5 py-0.5 rounded-full text-xs font-semibold ${
                        item.tipo === 'docente' ? 'bg-blue-100 text-blue-700' : 'bg-green-100 text-brand-verde'
                      }`}>
                        {item.tipo === 'docente' ? 'Docente' : 'ATA'}
                      </span>
                      {item.posti > 1 && (
                        <span className="px-2.5 py-0.5 bg-red-100 text-red-600 rounded-full text-xs font-semibold">
                          {item.posti} post{i > 1 ? 'i' : 'o'}
                        </span>
                      )}
                    </div>
                    <h3 className="font-semibold text-gray-800">
                      {item.tipo === 'docente' ? item.classeConcorso : item.profiloATA}
                    </h3>
                    <p className="text-sm text-gray-500 mt-1">{item.scuola}</p>
                    <div className="flex items-center gap-4 mt-2 text-xs text-gray-500">
                      <span className="flex items-center gap-1">
                        <MapPin size={12} />
                        {item.provincia} ({item.regione})
                      </span>
                      <span>Scade: {new Date(item.scadenza).toLocaleDateString('it-IT')}</span>
                    </div>
                  </div>
                  <button className="px-4 py-2 bg-brand-verde/10 text-brand-verde rounded-xl text-sm font-medium hover:bg-brand-verde/20 transition flex items-center gap-1">
                    <ExternalLink size={14} />
                    Dettagli
                  </button>
                </div>
              </div>
            ))}
          </div>
        )}

        {!regione && !provincia && !classeConcorso && !profiloATA && filtered.length === 0 && (
          <div className="text-center py-12 text-gray-400">
            <Search size={48} className="mx-auto mb-4 opacity-50" />
            <p>Seleziona i filtri per visualizzare gli interpelli disponibili</p>
          </div>
        )}
      </div>
    </div>
  );
}
