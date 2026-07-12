import { useState } from 'react';
import { Search, Filter, ChevronDown, ChevronRight, ExternalLink, Users, MapPin, Briefcase } from 'lucide-react';
import { USP_PROVINCE, REGIONI_WITH_USP, getUSPBySigla } from '../data/usp-italiane';

const TIPO_NOMINA = [
  { id: 'gps_1', label: 'GPS I Fascia (Abilitati)', desc: 'Docenti con abilitazione all\'insegnamento, TFA, PAS, laurea magistrale SSFP, percorsi 30/36/60 CFU' },
  { id: 'gps_2', label: 'GPS II Fascia (Titolati)', desc: 'Docenti con titolo di studio valido per l\'accesso alla classe di concorso + 24 CFU' },
  { id: 'ata_1', label: 'ATA I Fascia (24 mesi)', desc: 'Personale ATA con 24 mesi di servizio di ruolo' },
  { id: 'ata_2', label: 'ATA II Fascia (Titolati)', desc: 'Personale ATA con titolo di accesso al profilo' },
  { id: 'ata_3', label: 'ATA III Fascia (DM 89/2024)', desc: 'Tutti gli aspiranti ATA con requisiti, incluso OS (nuovo profilo CCNL 2019-2021)' },
  { id: 'istituto', label: 'Graduatorie di Istituto', desc: 'Graduatorie interne delle singole scuole per supplenze brevi e temporanee' },
];

const STATI_NOMINA = [
  { id: 'attiva', label: 'Attiva', color: 'bg-green-100 text-green-700' },
  { id: 'in_attesa', label: 'In Attesa', color: 'bg-amber-100 text-amber-700' },
  { id: 'completata', label: 'Completata', color: 'bg-blue-100 text-blue-700' },
  { id: 'scaduta', label: 'Scaduta', color: 'bg-red-100 text-red-700' },
];

const CLASSI_POPOLARI = [
  { classe: 'A-01', materia: 'Italiano e Storia' },
  { classe: 'A-02', materia: 'Storia' },
  { classe: 'A-03', materia: 'Inglese' },
  { classe: 'A-04', materia: 'Francese' },
  { classe: 'A-05', materia: 'Tedesco' },
  { classe: 'A-06', materia: 'Spagnolo' },
  { classe: 'A-07', materia: 'Matematica e Scienze' },
  { classe: 'A-08', materia: 'Fisica' },
  { classe: 'A-09', materia: 'Scienze Naturali' },
  { classe: 'A-10', materia: 'Chimica' },
  { classe: 'A-11', materia: 'Scienze della Terra' },
  { classe: 'A-12', materia: 'Biologia' },
  { classe: 'A-13', materia: 'Diritto ed Economia' },
  { classe: 'A-14', materia: 'Filosofia' },
  { classe: 'A-15', materia: 'Psicologia' },
  { classe: 'A-16', materia: 'Pedagogia' },
  { classe: 'A-17', materia: 'Storia dell\'Arte' },
  { classe: 'A-18', materia: 'Musica' },
  { classe: 'A-19', materia: 'Disegno e Arte' },
  { classe: 'A-20', materia: 'Educazione Fisica' },
  { classe: 'A-21', materia: 'Scienze Integrate' },
  { classe: 'A-22', materia: 'Matematica e Informatica' },
  { classe: 'A-23', materia: 'Tecnologie e Programmazione' },
  { classe: 'A-24', materia: 'Informatica' },
  { classe: 'A-25', materia: 'Diritto' },
  { classe: 'A-26', materia: 'Economia Aziendale' },
  { classe: 'A-27', materia: 'Laboratori' },
  { classe: 'A-28', materia: 'Sostegno Infanzia' },
  { classe: 'A-29', materia: 'Sostegno Primaria' },
  { classe: 'A-30', materia: 'Sostegno Secondaria I' },
  { classe: 'A-31', materia: 'Sostegno Secondaria II' },
];

export default function NominePage() {
  const [regioneSelezionata, setRegioneSelezionata] = useState('');
  const [provinciaSelezionata, setProvinciaSelezionata] = useState('');
  const [tipoNomina, setTipoNomina] = useState('');
  const [classeConcorso, setClasseConcorso] = useState('');
  const [searchText, setSearchText] = useState('');
  const [expandedRegione, setExpandedRegione] = useState<string | null>(null);

  const provinceFiltrate = regioneSelezionata
    ? USP_PROVINCE.filter(p => p.regioneCodice === regioneSelezionata)
    : USP_PROVINCE;

  const provinceCercate = searchText
    ? provinceFiltrate.filter(p =>
        p.nome.toLowerCase().includes(searchText.toLowerCase()) ||
        p.sigla.toLowerCase().includes(searchText.toLowerCase()) ||
        p.usp.toLowerCase().includes(searchText.toLowerCase())
      )
    : provinceFiltrate;

  const provincePerRegione = REGIONI_WITH_USP.map(r => ({
    ...r,
    province: r.province.filter(sigla => {
      const p = getUSPBySigla(sigla);
      if (!p) return false;
      if (searchText) {
        return p.nome.toLowerCase().includes(searchText.toLowerCase()) ||
               sigla.toLowerCase().includes(searchText.toLowerCase());
      }
      return true;
    }),
  })).filter(r => r.province.length > 0);

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-green-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-24 pb-12">
        <div className="text-center mb-8">
          <h1 className="text-4xl font-extrabold text-[#0F172A] mb-3 tracking-tight">
            Osservatorio Nazionale Nomine
          </h1>
          <p className="text-gray-600 max-w-3xl mx-auto text-sm">
            Monitoraggio in tempo reale delle nomine da parte di tutti gli Uffici Scolastici Provinciali (USP) d'Italia.
            Dati aggiornati dalle GPS, Graduatorie di Istituto e DM 89/2024 per il personale ATA.
          </p>
        </div>

        {/* Stats */}
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 mb-8">
          <div className="bg-white/80 backdrop-blur rounded-2xl border border-slate-200/60 p-4 text-center">
            <p className="text-3xl font-extrabold text-brand-blu">{USP_PROVINCE.length}</p>
            <p className="text-[10px] text-gray-500 flex items-center justify-center gap-1"><MapPin size={10} /> Province Italiane</p>
          </div>
          <div className="bg-white/80 backdrop-blur rounded-2xl border border-slate-200/60 p-4 text-center">
            <p className="text-3xl font-extrabold text-brand-verde">{REGIONI_WITH_USP.length}</p>
            <p className="text-[10px] text-gray-500 flex items-center justify-center gap-1"><Users size={10} /> Regioni + USR</p>
          </div>
          <div className="bg-white/80 backdrop-blur rounded-2xl border border-slate-200/60 p-4 text-center">
            <p className="text-3xl font-extrabold text-brand-ambra">{TIPO_NOMINA.length}</p>
            <p className="text-[10px] text-gray-500 flex items-center justify-center gap-1"><Briefcase size={10} /> Tipi di Nomina</p>
          </div>
          <div className="bg-white/80 backdrop-blur rounded-2xl border border-slate-200/60 p-4 text-center">
            <p className="text-3xl font-extrabold text-brand-ottanio">{CLASSI_POPOLARI.length}</p>
            <p className="text-[10px] text-gray-500 flex items-center justify-center gap-1"><Filter size={10} /> Classi di Concorso</p>
          </div>
        </div>

        {/* Filtri */}
        <div className="bg-white/70 backdrop-blur-md rounded-3xl shadow-soft border border-slate-200/60 p-6 mb-8">
          <h3 className="text-lg font-semibold text-brand-blu mb-4 flex items-center gap-2">
            <Filter size={18} /> Filtri di Ricerca
          </h3>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Regione</label>
              <select value={regioneSelezionata} onChange={e => { setRegioneSelezionata(e.target.value); setProvinciaSelezionata(''); }}
                className="w-full border border-slate-200 rounded-2xl px-4 py-3 focus:ring-2 focus:ring-brand-blu transition bg-white text-sm">
                <option value="">Tutte le regioni ({USP_PROVINCE.length} province)</option>
                {REGIONI_WITH_USP.map(r => (
                  <option key={r.codice} value={r.codice}>{r.nome} ({r.province.length} province)</option>
                ))}
              </select>
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Provincia / USP</label>
              <select value={provinciaSelezionata} onChange={e => setProvinciaSelezionata(e.target.value)}
                className="w-full border border-slate-200 rounded-2xl px-4 py-3 focus:ring-2 focus:ring-brand-blu transition bg-white text-sm">
                <option value="">Tutte le province</option>
                {provinceFiltrate.map(p => (
                  <option key={p.sigla} value={p.sigla}>{p.sigla} — {p.nome}</option>
                ))}
              </select>
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Tipo Nomina</label>
              <select value={tipoNomina} onChange={e => setTipoNomina(e.target.value)}
                className="w-full border border-slate-200 rounded-2xl px-4 py-3 focus:ring-2 focus:ring-brand-blu transition bg-white text-sm">
                <option value="">Tutti i tipi</option>
                {TIPO_NOMINA.map(t => (
                  <option key={t.id} value={t.id}>{t.label}</option>
                ))}
              </select>
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Classe di Concorso</label>
              <select value={classeConcorso} onChange={e => setClasseConcorso(e.target.value)}
                className="w-full border border-slate-200 rounded-2xl px-4 py-3 focus:ring-2 focus:ring-brand-blu transition bg-white text-sm">
                <option value="">Tutte le classi</option>
                {CLASSI_POPOLARI.map(c => (
                  <option key={c.classe} value={c.classe}>{c.classe} — {c.materia}</option>
                ))}
              </select>
            </div>
          </div>
          <div className="mt-4 relative">
            <Search size={16} className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400" />
            <input type="text" value={searchText} onChange={e => setSearchText(e.target.value)}
              placeholder="Cerca per nome provincia, sigla o USP..."
              className="w-full pl-11 pr-4 py-3 border border-slate-200 rounded-2xl focus:ring-2 focus:ring-brand-blu/20 outline-none text-sm" />
          </div>
        </div>

        {/* Province per Regione */}
        <div className="space-y-4">
          {regioneSelezionata ? (
            <div className="bg-white/70 backdrop-blur-md rounded-3xl shadow-soft border border-slate-200/60 p-6">
              <h3 className="text-lg font-bold text-brand-blu mb-4">
                {REGIONI_WITH_USP.find(r => r.codice === regioneSelezionata)?.nome} — {provinceCercate.length} province
              </h3>
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3">
                {provinceCercate.map(p => (
                  <ProvinciaCard key={p.sigla} provincia={p} />
                ))}
              </div>
            </div>
          ) : (
            provincePerRegione.map(regione => (
              <div key={regione.codice} className="bg-white/70 backdrop-blur-md rounded-3xl shadow-soft border border-slate-200/60 overflow-hidden">
                <button onClick={() => setExpandedRegione(expandedRegione === regione.codice ? null : regione.codice)}
                  className="w-full flex items-center justify-between p-5 hover:bg-gray-50 transition">
                  <div className="flex items-center gap-3">
                    <div className="w-10 h-10 bg-brand-blu/10 rounded-xl flex items-center justify-center">
                      <MapPin size={18} className="text-brand-blu" />
                    </div>
                    <div className="text-left">
                      <h3 className="font-bold text-[#0F172A]">{regione.nome}</h3>
                      <p className="text-xs text-gray-500">{regione.province.length} province</p>
                    </div>
                  </div>
                  {expandedRegione === regione.codice ? <ChevronDown size={18} className="text-gray-400" /> : <ChevronRight size={18} className="text-gray-400" />}
                </button>
                {expandedRegione === regione.codice && (
                  <div className="px-5 pb-5 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3 animate-fade-in-up">
                    {regione.province.map(sigla => {
                      const p = getUSPBySigla(sigla);
                      return p ? <ProvinciaCard key={sigla} provincia={p} /> : null;
                    })}
                  </div>
                )}
              </div>
            ))
          )}
        </div>

        {/* Info box */}
        <div className="mt-8 bg-gradient-to-r from-brand-blu/5 to-brand-verde/5 rounded-3xl border border-brand-blu/10 p-6">
          <h3 className="text-lg font-bold text-brand-blu mb-2">Come funzionano le Nomine</h3>
          <p className="text-sm text-gray-600 mb-3">
            Le nomine del personale scolastico avvengono attraverso le <strong>Graduatorie Provinciali per le Supplenze (GPS)</strong>,
            disciplinate dall'OM 88/2024, e le <strong>Graduatorie di Istituto</strong>. Il personale ATA segue le disposizioni del DM 430/2000 e del DM 89/2024.
          </p>
          <div className="grid sm:grid-cols-3 gap-4">
            {TIPO_NOMINA.slice(0, 3).map(t => (
              <div key={t.id} className="bg-white/50 rounded-2xl p-4 border border-slate-200/60">
                <p className="text-sm font-semibold text-brand-blu mb-1">{t.label}</p>
                <p className="text-xs text-gray-500">{t.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}

function ProvinciaCard({ provincia }: { provincia: typeof USP_PROVINCE[0] }) {
  return (
    <div className="p-4 rounded-2xl border border-slate-200/60 hover:border-brand-blu/30 bg-white/50 transition-all group">
      <div className="flex items-start justify-between mb-2">
        <div>
          <div className="flex items-center gap-2">
            <span className="px-2 py-0.5 bg-brand-blu/10 text-brand-blu text-xs font-bold rounded-full">{provincia.sigla}</span>
            <span className="font-semibold text-[#0F172A] text-sm">{provincia.nome}</span>
          </div>
          <p className="text-[11px] text-gray-500 mt-1">{provincia.regione}</p>
        </div>
        <a href={provincia.url} target="_blank" rel="noopener noreferrer"
          className="p-1.5 text-gray-400 hover:text-brand-blu transition rounded-lg hover:bg-brand-blu/5"
          title={provincia.usp}>
          <ExternalLink size={14} />
        </a>
      </div>
      <p className="text-[10px] text-gray-400 leading-relaxed">{provincia.usp}</p>
      {provincia.capoluogo && (
        <span className="inline-block mt-2 text-[9px] px-2 py-0.5 bg-brand-ambra/10 text-brand-ambra rounded-full font-semibold">
          Capoluogo di Regione
        </span>
      )}
    </div>
  );
}
