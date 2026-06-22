import { useState } from 'react';
import { Calendar, Clock, Bell, ExternalLink, Search, ChevronDown, FileText } from 'lucide-react';
import { useAuth } from './Auth/AuthContext';
import LoginModal from './Auth/LoginModal';

interface DeadlineItem {
  id: number;
  date: string;
  type: string;
  title: string;
  description: string;
  details: string;
  link: string;
  isFollowed?: boolean;
}

const deadlines: DeadlineItem[] = [
  {
    id: 1,
    date: '30 Giugno 2026',
    type: 'Concorsi',
    title: 'Scadenza domanda TFA Sostegno VIII ciclo',
    description: 'Ultimo giorno per presentare domanda di partecipazione al Tirocinio Formativo Attivo per il sostegno didattico (VIII ciclo, D.D. prot. n. 1025/2026).',
    details: 'SCADENZA: 30 giugno 2026, ore 23:59.\n\nMODALITÀ DI PRESENTAZIONE:\nLa domanda deve essere presentata esclusivamente tramite la piattaforma Istanze On Line (POLIS) del MIM.\n\nDOCUMENTI RICHIESTI:\n- Documento di identità valido\n- Titolo di studio (laurea magistrale/specialistica)\n- Certificazione titoli di accesso per il grado richiesto\n- Ricevuta del versamento del contributo di partecipazione (€ 50,00)\n\nRIFERIMENTO NORMATIVO:\nD.D. prot. n. 1025 del 10/05/2026\nD.M. 108/2022 (Regolamento TFA sostegno)\n\nLink: https://www.mim.gov.it/tfa-sostegno-viii-ciclo',
    link: 'https://www.mim.gov.it/tfa-sostegno-viii-ciclo',
  },
  {
    id: 2,
    date: '31 Luglio 2026',
    type: 'GPS',
    title: 'Aggiornamento Graduatorie GPS 2026-2028',
    description: 'Termine ultimo per la presentazione delle domande di aggiornamento delle Graduatorie Provinciali per le Supplenze per il biennio 2026/2028.',
    details: 'APERTURA PIATTAFORMA:\nDalle ore 9:00 del 1° luglio 2026 fino alle ore 23:59 del 31 luglio 2026.\n\nOPERAZIONI POSSIBILI:\n- Inserire nuovi titoli di servizio\n- Aggiornare le certificazioni linguistiche e informatiche\n- Modificare le preferenze di provincia e classe di concorso\n- Richiedere il passaggio di fascia\n- Indicare le 150 preferenze di scuola\n\nRIFERIMENTO NORMATIVO:\nO.M. n. 88/2025, art. 3\nD.M. prot. n. 1234 del 10/06/2026\n\nLink: https://www.mim.gov.it/graduatorie-provinciali-supplenze',
    link: 'https://www.mim.gov.it/graduatorie-provinciali-supplenze',
  },
  {
    id: 3,
    date: '31 Marzo 2026',
    type: 'MAD',
    title: 'Invio Messa a Disposizione (MAD) a.s. 2026/2027',
    description: 'Periodo consigliato per l\'invio delle domande di Messa a Disposizione per l\'anno scolastico successivo.',
    details: 'PERIODO CONSIGLIATO:\nDa marzo a giugno 2026 per l\'a.s. 2026/2027.\n\nLe MAD possono essere inviate:\n- Tramite PEC alle singole scuole (certificata)\n- Tramite portale SIDI (se abilitato)\n- A mano presso la segreteria scolastica\n- Tramite raccomandata A/R\n\nDESTINATARI:\n- Dirigente Scolastico di ciascuna scuola\n- Ufficio Scolastico Provinciale di competenza\n\nRIFERIMENTO NORMATIVO:\nD.Lgs. 59/2017, art. 13\nNota MIM prot. n. 987/2025',
    link: '#',
  },
  {
    id: 4,
    date: '15 Aprile 2026',
    type: 'Mobilità',
    title: 'Domande di mobilità personale docente 2026/2027',
    description: 'Scadenza per la presentazione delle domande di mobilità territoriale e professionale per il personale docente di ruolo.',
    details: 'TERMINE ULTIMO:\n15 aprile 2026, ore 23:59.\n\nLa domanda di mobilità può riguardare:\n- Mobilità territoriale (cambio provincia ai sensi dell\'art. 7 D.Lgs. 59/2017)\n- Mobilità professionale (cambio classe di concorso/grado)\n- Mobilità intercompartimentale (passaggio ad altro comparto)\n\nLa presentazione avviene esclusivamente tramite POLIS.\n\nRIFERIMENTO NORMATIVO:\n- O.M. n. 88/2025, art. 5\n- Contratto Collettivo Nazionale Mobilità 2025-2027\n\nLink: https://www.mim.gov.it/mobilita-docenti-2026',
    link: 'https://www.mim.gov.it/mobilita-docenti-2026',
  },
  {
    id: 5,
    date: '31 Maggio 2026',
    type: 'TFA',
    title: 'Selezione TFA Sostegno — Prova preselettiva',
    description: 'Prova preselettiva nazionale per l\'accesso al Tirocinio Formativo Attivo per le attività di sostegno didattico (VIII ciclo).',
    details: 'CALENDARIO PROVE:\n- Prova preselettiva computer-based: 31 maggio 2026 (60 domande in 60 minuti)\n- Prova scritta: 15 giugno 2026 (3 domande aperte su tematiche pedagogiche)\n- Prova orale: 1-15 luglio 2026 (discussione caso clinico)\n\nPOSTI DISPONIBILI:\n- Scuola dell\'infanzia: 2.500 posti\n- Scuola primaria: 3.500 posti\n- Scuola secondaria I grado: 2.800 posti\n- Scuola secondaria II grado: 3.200 posti\n\nRIFERIMENTO:\nD.D. prot. n. 1025/2026, art. 6\n\nLink: https://www.mim.gov.it/tfa-sostegno-viii-ciclo',
    link: 'https://www.mim.gov.it/tfa-sostegno-viii-ciclo',
  },
  {
    id: 6,
    date: '30 Giugno 2026',
    type: 'Formazione',
    title: 'Iscrizione corsi formazione su piattaforma SOFIA',
    description: 'Termine per l\'iscrizione ai corsi di formazione riconosciuti dal MIM sulla piattaforma SOFIA validi per l\'anno scolastico 2025/2026.',
    details: 'PIATTAFORMA SOFIA:\nLe iscrizioni ai corsi di formazione devono essere effettuate tramite la piattaforma SOFIA del MIM.\n\nCORSI DISPONIBILI:\n- Metodologie didattiche innovative (20h)\n- Inclusione scolastica e BES (25h)\n- Didattica digitale integrata (15h)\n- Valutazione degli apprendimenti (20h)\n- Orientamento e PCTO (15h)\n- Educazione civica e Costituzione (12h)\n\nRIFERIMENTO NORMATIVO:\nD.M. 170/2025 (Sistema di formazione in servizio)\nNota MIM prot. n. 789/2025\n\nLink: https://sofia.mim.gov.it',
    link: 'https://sofia.mim.gov.it',
  },
  {
    id: 7,
    date: '30 Aprile 2026',
    type: 'Concorsi',
    title: 'Scadenza domanda Concorsi Ordinari e Straordinari MIM 2026',
    description: 'Ultimo giorno per presentare domanda di partecipazione ai concorsi ordinari e straordinari per docenti di scuola secondaria e infanzia/primaria.',
    details: 'SCADENZA: 30 aprile 2026, ore 23:59.\n\nCONCORSI ATTIVI:\n1. CONCORSO ORDINARIO SCUOLA SECONDARIA (D.D. n. 987/2026) — 20.000 posti\n2. CONCORSO STRAORDINARIO SCUOLA SECONDARIA (D.D. n. 988/2026) — 5.000 posti\n3. CONCORSO ORDINARIO INFANZIA E PRIMARIA (D.D. n. 989/2026) — 12.000 posti\n\nREQUISITI:\n- Ordinario secondaria: Laurea magistrale + 24 CFU\n- Straordinario: 36 mesi servizio negli ultimi 5 anni\n- Infanzia/primaria: Laurea Scienze della Formazione Primaria\n\nMODALITÀ: Esclusivamente tramite POLIS.\n\nLink: https://www.mim.gov.it/concorsi-2026',
    link: 'https://www.mim.gov.it/concorsi-2026',
  },
  {
    id: 8,
    date: '15 Settembre 2026',
    type: 'GPS',
    title: 'Conferimento incarichi da GPS a.s. 2026/2027',
    description: 'Avvio delle procedure di conferimento degli incarichi di supplenza da GPS per l\'anno scolastico 2026/2027.',
    details: 'Il conferimento degli incarichi di supplenza avviene secondo l\'ordine di graduatoria.\n\nLE SCUOLE ATTINGONO DALLE GPS:\n- Per le supplenze annuali (31 agosto/30 giugno)\n- Per le supplenze temporanee\n\nIL CANDIDATO HA 24 ORE PER ACCETTARE LA SUPPLENZA.\nIn caso di rinuncia senza giustificato motivo, si applicano le sanzioni previste:\n- Prima rinuncia: sanzione di 1 anno di esclusione\n- Seconda rinuncia: esclusione definitiva\n\nRIFERIMENTO NORMATIVO:\nD.Lgs. 59/2017, art. 12\nNota MIM prot. n. 987/2026',
    link: '#',
  },
];

const typeColors: Record<string, string> = {
  Concorsi: 'bg-red-100 text-red-700',
  GPS: 'bg-blue-100 text-blue-700',
  MAD: 'bg-green-100 text-green-700',
  Mobilità: 'bg-amber-100 text-amber-700',
  TFA: 'bg-purple-100 text-purple-700',
  Formazione: 'bg-teal-100 text-teal-700',
};

export default function Deadlines() {
  const { isAuthenticated } = useAuth();
  const [showLogin, setShowLogin] = useState(false);
  const [followed, setFollowed] = useState<number[]>([]);
  const [searchQuery, setSearchQuery] = useState('');
  const [expandedId, setExpandedId] = useState<number | null>(null);
  const [activeType, setActiveType] = useState('Tutte');

  const filtered = deadlines.filter(d => {
    const matchType = activeType === 'Tutte' || d.type === activeType;
    const matchSearch = !searchQuery || d.title.toLowerCase().includes(searchQuery.toLowerCase()) || d.description.toLowerCase().includes(searchQuery.toLowerCase());
    return matchType && matchSearch;
  });

  const toggleFollow = (id: number) => {
    if (!isAuthenticated) {
      setShowLogin(true);
      return;
    }
    setFollowed(prev => prev.includes(id) ? prev.filter(f => f !== id) : [...prev, id]);
  };

  const types = ['Tutte', ...new Set(deadlines.map(d => d.type))];

  return (
    <section id="scadenze" className="py-20 bg-surface-warm/40">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-6">
          <h2 className="text-4xl font-extrabold text-[#0F172A] mb-4 tracking-tight">
            Scadenze Importanti
          </h2>
          <p className="text-gray-600 font-normal max-w-2xl mx-auto">
            Non perdere le date più importanti per la tua carriera. Attiva le notifiche per ricevere promemoria 48 ore prima della scadenza.
          </p>
        </div>

        <div className="flex flex-col sm:flex-row gap-4 items-center justify-between mt-8 mb-8">
          <div className="flex gap-2 flex-wrap">
            {types.map(t => (
              <button key={t} onClick={() => setActiveType(t)}
                className={`px-4 py-2 rounded-2xl text-xs font-semibold transition-all ${
                  activeType === t ? 'bg-brand-blu text-white' : 'bg-white text-gray-600 border border-slate-200/60 hover:border-brand-blu/30'
                }`}>{t}</button>
            ))}
          </div>
          <div className="relative w-full sm:w-64">
            <Search size={16} className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" />
            <input type="text" placeholder="Cerca scadenze..." value={searchQuery}
              onChange={e => setSearchQuery(e.target.value)}
              className="w-full pl-9 pr-4 py-2 rounded-2xl border border-slate-200/60 bg-white text-sm focus:ring-2 focus:ring-brand-blu/20 focus:border-brand-blu transition outline-none" />
          </div>
        </div>

        <div className="space-y-4 mt-8">
          {filtered.map((deadline) => {
            const isExpanded = expandedId === deadline.id;
            const isFoll = followed.includes(deadline.id);
            return (
              <div
                key={deadline.id}
                className={`bg-white/70 backdrop-blur-md rounded-3xl border border-slate-200/60 shadow-soft transition-all duration-500 ease-in-out overflow-hidden ${
                  isExpanded ? 'border-brand-ambra/30 shadow-medium' : 'hover:border-brand-ambra/20'
                }`}
              >
                <div className="p-6">
                  <div className="flex items-start justify-between">
                    <div className="flex-1">
                      <div className="flex items-center gap-3 mb-3">
                        <span className={`text-xs font-semibold px-2.5 py-1 rounded-full ${typeColors[deadline.type] || 'bg-gray-100 text-gray-600'}`}>
                          {deadline.type}
                        </span>
                        <span className="text-xs font-medium text-brand-ambra flex items-center gap-1">
                          <Calendar size={12} /> {deadline.date}
                        </span>
                      </div>
                      <h3 className="text-lg font-bold text-[#0F172A] mb-2">{deadline.title}</h3>
                      <p className={`text-gray-600 text-sm leading-relaxed ${isExpanded ? '' : 'line-clamp-2'}`}>
                        {deadline.description}
                      </p>
                    </div>
                    <button
                      onClick={() => toggleFollow(deadline.id)}
                      className={`ml-4 p-2 rounded-xl transition-all duration-200 flex-shrink-0 ${
                        isFoll ? 'text-brand-ambra bg-brand-ambra/10' : 'text-gray-300 hover:text-brand-ambra hover:bg-brand-ambra/5'
                      }`}
                    >
                      <Bell
                        size={20}
                        fill={isFoll ? '#D97706' : 'none'}
                        strokeWidth={2}
                        className={isFoll ? 'animate-ping-once' : ''}
                      />
                    </button>
                  </div>

                  {isExpanded && (
                    <div className="mt-4 pt-4 border-t border-slate-200/60 animate-fade-in-up">
                      <pre className="text-sm text-gray-700 whitespace-pre-wrap font-sans leading-relaxed">
                        {deadline.details}
                      </pre>
                      {deadline.link && deadline.link !== '#' && (
                        <div className="mt-3">
                          <a href={deadline.link} target="_blank" rel="noopener noreferrer"
                            className="inline-flex items-center gap-1 text-xs text-brand-blu font-medium hover:underline">
                            <ExternalLink size={12} /> Link ufficiale MIM
                          </a>
                        </div>
                      )}
                      {isFoll && (
                        <div className="mt-4 p-3 bg-brand-ambra/5 rounded-2xl border border-brand-ambra/20">
                          <p className="text-sm text-brand-ambra font-medium flex items-center gap-2">
                            <Bell size={16} />
                            Riceverai una notifica 48 ore prima della scadenza
                          </p>
                        </div>
                      )}
                    </div>
                  )}
                </div>

                <div className="px-6 pb-4">
                  <button
                    onClick={() => setExpandedId(isExpanded ? null : deadline.id)}
                    className="inline-flex items-center gap-2 text-brand-ambra font-semibold hover:text-brand-ambra/80 transition-colors text-sm"
                  >
                    {isExpanded ? 'Riduci' : 'Dettagli scadenza'}
                    <ChevronDown size={16} className={`transition-transform duration-300 ${isExpanded ? 'rotate-180' : ''}`} />
                  </button>
                </div>
              </div>
            );
          })}
        </div>
      </div>

      {showLogin && <LoginModal onClose={() => setShowLogin(false)} />}
    </section>
  );
}
