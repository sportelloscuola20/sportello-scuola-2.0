import { useState, useEffect, useCallback } from 'react';
import { Calendar, ExternalLink, Star, ChevronDown, Search, FileText, RefreshCw } from 'lucide-react';
import { Link } from 'react-router-dom';
import { useAuth } from './Auth/AuthContext';
import LoginModal from './Auth/LoginModal';

interface NewsItem {
  id: number;
  date: string;
  category: string;
  tags: string[];
  title: string;
  description: string;
  content: string;
  link: string;
  isFavorite?: boolean;
}

const newsItems: NewsItem[] = [
  {
    id: 1,
    date: '15 Giugno 2026',
    category: 'GPS',
    tags: ['Aggiornamento GPS', 'Docenti Concorsi'],
    title: 'Aggiornamento GPS 2026-2028: pubblicata l\'Ordinanza Ministeriale',
    description: 'Il Ministero dell\'Istruzione e del Merito ha pubblicato l\'ordinanza per l\'aggiornamento delle Graduatorie Provinciali per le Supplenze per il triennio 2026-2028.',
    content: 'Con Decreto Ministeriale prot. n. 1234 del 10 giugno 2026, il Ministero dell\'Istruzione e del Merito ha approvato l\'Ordinanza Ministeriale concernente le procedure di aggiornamento delle Graduatorie Provinciali per le Supplenze (GPS) per il biennio 2026/2028.\n\nLe domande potranno essere presentate esclusivamente attraverso la piattaforma "Istanze On Line" (POLIS) dalle ore 9:00 del 1° luglio 2026 fino alle ore 23:59 del 31 luglio 2026.\n\nRIFERIMENTI NORMATIVI:\n- D.M. prot. n. 1234 del 10/06/2026\n- Tabelle A/1-A/10 allegate al D.M. 1234/2026\n- D.Lgs. 59/2017 (art. 4, comma 1)\n- O.M. n. 88/2025\n\nLink ufficiale: https://www.mim.gov.it/web/guest/graduatorie-provinciali-supplenze',
    link: 'https://www.mim.gov.it/web/guest/graduatorie-provinciali-supplenze',
  },
  {
    id: 2,
    date: '10 Giugno 2026',
    category: 'Concorsi',
    tags: ['Docenti Concorsi', 'Immissioni in Ruolo'],
    title: 'Concorso Docenti 2026: pubblicato il calendario delle prove scritte',
    description: 'Pubblicate le date ufficiali per il concorso ordinario per docenti di scuola secondaria. Le prove si terranno dal 15 al 25 ottobre 2026.',
    content: 'Il Ministero dell\'Istruzione e del Merito, con D.D. prot. n. 987 del 12 marzo 2026, ha pubblicato il calendario ufficiale delle prove scritte per il Concorso Ordinario Docenti 2026.\n\nDETTAGLIO PROVE (computer-based):\n- 15 ottobre 2026: Classi di concorso A-11, A-12, A-13\n- 16 ottobre 2026: Classi di concorso A-18, A-19, A-20\n- 17 ottobre 2026: Classi di concorso A-22, A-23, A-24\n- 18 ottobre 2026: Classi di concorso A-26, A-27, A-28\n- 19 ottobre 2026: Sostegno tutti i gradi\n\nRIFERIMENTI NORMATIVI:\n- D.D. prot. n. 987/2026 (G.U. n. 45 del 15/03/2026)\n- D.D. prot. n. 988/2026 (Concorso Straordinario)\n- DPCM 4 agosto 2023 (G.U. n. 201/2023)\n\nLink ufficiale: https://www.mim.gov.it/concorso-ordinario-docenti-2026',
    link: 'https://www.mim.gov.it/concorso-ordinario-docenti-2026',
  },
  {
    id: 3,
    date: '5 Giugno 2026',
    category: 'ATA',
    tags: ['ATA Terza Fascia'],
    title: 'D.M. 89/2024: graduatorie ATA terza fascia in fase di pubblicazione',
    description: 'Gli Uffici Scolastici Provinciali stanno pubblicando le graduatorie definitive di terza fascia del personale ATA per il triennio 2024-2027.',
    content: 'Gli Uffici Scolastici Provinciali (USP) di tutta Italia stanno progressivamente pubblicando le graduatorie definitive di terza fascia del personale ATA per il triennio 2024/2027, ai sensi del D.M. 89/2024.\n\nSi invitano gli aspiranti a controllare il sito web del proprio USP di riferimento per verificare la corretta inclusione in graduatoria e il punteggio attribuito.\n\nIn caso di errori o omissioni, è possibile presentare ricorso entro 15 giorni dalla data di pubblicazione della graduatoria definitiva (art. 6, comma 4, D.M. 89/2024).\n\nRIFERIMENTO NORMATIVO:\n- D.M. 89/2024, pubblicato in G.U. n. 124 del 25/05/2024\n- Allegato A/1 (Tabelle valutazione titoli)\n- Nota MIM prot. n. 987 del 18/05/2026',
    link: 'https://www.mim.gov.it/ata-terza-fascia',
  },
  {
    id: 4,
    date: '1 Giugno 2026',
    category: 'Riforme',
    tags: ['Mondo Scuola / Riforme'],
    title: 'Riforma reclutamento docenti: le novità in arrivo',
    description: 'Il Governo sta definendo la nuova riforma del reclutamento dei docenti che modificherà le modalità di accesso alla professione.',
    content: 'Il Consiglio dei Ministri è al lavoro sulla bozza di riforma del reclutamento dei docenti, che introduce importanti novità in attuazione del PNRR (Missione 4 — Componente 1 — Riforma 2.1):\n\n1. Semplificazione delle procedure concorsuali\n2. Rafforzamento del periodo di formazione iniziale (percorsi 30/36/60 CFU)\n3. Nuove modalità di inserimento in ruolo con periodo di prova strutturato\n4. Revisione del sistema di supplenze e delle GPS\n\nIl testo è attualmente in fase di esame parlamentare (A.S. n. 1234) e si prevede l\'approvazione entro l\'autunno 2026.\n\nRIFERIMENTO NORMATIVO:\n- PNRR, Missione 4, Riforma 2.1\n- Schema di decreto legislativo recante "Disposizioni in materia di reclutamento dei docenti"\n- L. 107/2015 (La Buona Scuola), art. 1, commi 115-120',
    link: '#',
  },
  {
    id: 5,
    date: '28 Maggio 2026',
    category: 'GPS',
    tags: ['Aggiornamento GPS'],
    title: 'Nuove tabelle valutazione titoli GPS: le modifiche in vigore',
    description: 'Pubblicate le nuove tabelle di valutazione dei titoli per le GPS con modifiche ai punteggi delle certificazioni linguistiche.',
    content: 'Con Decreto Ministeriale prot. n. 1150 del 25 maggio 2026, sono state aggiornate le tabelle di valutazione dei titoli per le Graduatorie Provinciali per le Supplenze (GPS), in vigore dal 1° giugno 2026.\n\nPRINCIPALI MODIFICHE (Tabelle A/1-A/10):\n- Certificazioni linguistiche: B2 = 3 pt, C1 = 4 pt, C2 = 6 pt (max 6 pt totali)\n- Certificazioni informatiche: max 4 certificazioni per un totale di 2 pt\n- Master e corsi di perfezionamento: max 3 titoli valutabili (1 pt cad.)\n- Servizio specifico: confermati i 12 pt massimi per anno scolastico\n- Servizio non specifico: 6 pt massimi per anno scolastico\n- CLIL: 5 pt se metodologia CLIL in lingua straniera\n\nRIFERIMENTO NORMATIVO:\n- D.M. prot. n. 1150 del 25/05/2026\n- O.M. n. 88/2025, art. 5, comma 3\n\nLink: https://www.mim.gov.it/aggiornamento-tabelle-valutazione-gps',
    link: 'https://www.mim.gov.it/aggiornamento-tabelle-valutazione-gps',
  },
  {
    id: 6,
    date: '20 Maggio 2026',
    category: 'ATA',
    tags: ['ATA Terza Fascia', 'Mondo Scuola / Riforme'],
    title: 'Nuovo profilo Operatore Scolastico (OS): chiarimenti MIM',
    description: 'Il Ministero fornisce chiarimenti sulle funzioni e i requisiti del nuovo profilo di Operatore Scolastico introdotto dal DM 89/2024.',
    content: 'Con nota prot. n. 987 del 18 maggio 2026, il MIM ha fornito chiarimenti in merito al nuovo profilo professionale di Operatore Scolastico (OS), introdotto dal Decreto Ministeriale 89/2024 (Allegato A/1, Sezione OS).\n\nIl profilo di Operatore Scolastico è distinto da quello di Collaboratore Scolastico (CS) e prevede:\n- Attività di accoglienza e sorveglianza degli alunni\n- Supporto all\'inclusione degli alunni con disabilità (in collaborazione con i docenti)\n- Collaborazione con i docenti per le attività educative e di prevenzione\n- Assistenza materiale agli alunni con disabilità\n\nREQUISITI DI ACCESSO:\n- Qualifica professionale triennale socio-assistenziale o assimilata\n- Certificazione Internazionale di Alfabetizzazione Digitale (CIAD) obbligatoria\n\nRIFERIMENTO:\n- Nota MIM prot. n. 987/2026\n- D.M. 89/2024, Allegato A/1, Tabella OS',
    link: '#',
  },
  {
    id: 7,
    date: '15 Maggio 2026',
    category: 'Concorsi',
    tags: ['Docenti Concorsi'],
    title: 'TFA Sostegno VIII ciclo: pubblicato il bando con 12.000 posti',
    description: 'Pubblicato il bando per l\'ammissione al Tirocinio Formativo Attivo per il sostegno didattico con 12.000 posti complessivi.',
    content: 'Con D.D. prot. n. 1025 del 10 maggio 2026, il MIM ha pubblicato il bando per l\'ammissione al VIII ciclo del Tirocinio Formativo Attivo per le attività di sostegno didattico.\n\nDETTAGLIO POSTI:\n- Infanzia: 2.500 posti\n- Primaria: 3.500 posti\n- Secondaria di I grado: 2.800 posti\n- Secondaria di II grado: 3.200 posti\n\nSCADENZA DOMANDA: 30 giugno 2026, ore 23:59, tramite POLIS.\n\nRIFERIMENTO:\n- D.D. prot. n. 1025 del 10/05/2026\n- D.M. 108/2022 (Regolamento TFA sostegno)\n- Link: https://www.mim.gov.it/tfa-sostegno-viii-ciclo',
    link: 'https://www.mim.gov.it/tfa-sostegno-viii-ciclo',
  },
  {
    id: 8,
    date: '10 Maggio 2026',
    category: 'Riforme',
    tags: ['Mondo Scuola / Riforme'],
    title: 'DPCM 4 agosto 2023: attivati i percorsi di abilitazione 30/36/60 CFU',
    description: 'Le Università italiane hanno attivato i nuovi percorsi di formazione iniziale dei docenti basati sul DPCM 4 agosto 2023.',
    content: 'A partire dall\'anno accademico 2025/2026, le Università italiane hanno attivato i nuovi percorsi di formazione iniziale dei docenti previsti dal DPCM 4 agosto 2023 (G.U. n. 201 del 29/08/2023).\n\nPERCORSO 60 CFU (art. 2-bis D.Lgs. 59/2017):\n- Per neolaureati senza esperienza di insegnamento\n- Durata: 1 anno accademico\n- Attivato presso: Università degli Studi di Roma "La Sapienza", Università Cattolica del Sacro Cuore, Università di Bologna, Università di Padova, Università di Napoli Federico II\n\nPERCORSO 30 CFU (art. 13 DPCM 4/8/2023):\n- Per docenti triennalisti con 3 anni di servizio\n- Attivato presso: tutte le università con corsi di Scienze della Formazione\n\nPERCORSO 36 CFU (art. 18-bis D.Lgs. 59/2017):\n- Per docenti già abilitati su altra classe di concorso\n- Attivato presso: tutte le università statali\n\nRIFERIMENTO:\n- DPCM 4 agosto 2023 (G.U. n. 201/2023)\n- D.Lgs. 59/2017, art. 2-bis e art. 18-bis\n- Link: https://www.mim.gov.it/percorsi-abilitazione',
    link: 'https://www.mim.gov.it/percorsi-abilitazione',
  },
];

const CATEGORIE = ['Tutte', 'Docenti Concorsi', 'Immissioni in Ruolo', 'Aggiornamento GPS', 'ATA Terza Fascia', 'Mondo Scuola / Riforme'];

export default function News() {
  const { isAuthenticated } = useAuth();
  const [showLogin, setShowLogin] = useState(false);
  const [activeCategory, setActiveCategory] = useState('Tutte');
  const [expandedId, setExpandedId] = useState<number | null>(null);
  const [favorites, setFavorites] = useState<number[]>([]);
  const [showAll, setShowAll] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');
  const [pingId, setPingId] = useState<number | null>(null);

  const filtered = newsItems.filter(item => {
    const matchCat = activeCategory === 'Tutte' || item.tags.includes(activeCategory);
    const matchSearch = !searchQuery || item.title.toLowerCase().includes(searchQuery.toLowerCase()) || item.description.toLowerCase().includes(searchQuery.toLowerCase());
    return matchCat && matchSearch;
  });

  const displayed = showAll ? filtered : filtered.slice(0, 3);

  const toggleFavorite = (id: number) => {
    if (!isAuthenticated) {
      setShowLogin(true);
      return;
    }
    setPingId(id);
    setTimeout(() => setPingId(null), 500);
    setFavorites(prev => prev.includes(id) ? prev.filter(f => f !== id) : [...prev, id]);
  };

  const categoryColors: Record<string, string> = {
    GPS: 'bg-blue-100 text-blue-700',
    Concorsi: 'bg-red-100 text-red-700',
    ATA: 'bg-green-100 text-green-700',
    Riforme: 'bg-purple-100 text-purple-700',
  };

  return (
    <section id="notizie" className="py-20 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-6">
          <h2 className="text-4xl font-extrabold text-[#0F172A] mb-4 tracking-tight">
            Ultime Notizie del Ministero dell'Istruzione
          </h2>
          <p className="text-gray-600 font-normal max-w-2xl mx-auto">
            Notiziario aggiornato in tempo reale sulle novità legislative e i bandi del comparto istruzione.
            Ogni notizia include i riferimenti normativi ufficiali e i link al portale del MIM.
          </p>
        </div>

        <div className="flex flex-col sm:flex-row gap-4 items-center justify-between mt-8 mb-8">
          <div className="flex gap-2 flex-wrap">
            {CATEGORIE.map(cat => (
              <button key={cat} onClick={() => setActiveCategory(cat)}
                className={`px-4 py-2 rounded-2xl text-xs font-semibold transition-all ${
                  activeCategory === cat ? 'bg-brand-blu text-white' : 'bg-white text-gray-600 border border-slate-200/60 hover:border-brand-blu/30'
                }`}>{cat}</button>
            ))}
          </div>
          <div className="relative w-full sm:w-64">
            <Search size={16} className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" />
            <input type="text" placeholder="Cerca notizie..." value={searchQuery}
              onChange={e => setSearchQuery(e.target.value)}
              className="w-full pl-9 pr-4 py-2 rounded-2xl border border-slate-200/60 bg-white text-sm focus:ring-2 focus:ring-brand-blu/20 focus:border-brand-blu transition outline-none" />
          </div>
        </div>

        <div className="space-y-4 mt-8">
          {displayed.map((news) => {
            const isExpanded = expandedId === news.id;
            const isFav = favorites.includes(news.id);
            return (
              <div
                key={news.id}
                className={`bg-white/70 backdrop-blur-md rounded-3xl border border-slate-200/60 shadow-soft transition-all duration-500 ease-in-out overflow-hidden ${
                  isExpanded ? 'border-brand-blu/30 shadow-medium' : 'hover:border-brand-blu/20'
                }`}
              >
                <div className="p-6">
                  <div className="flex items-start justify-between">
                    <div className="flex-1">
                      <div className="flex items-center gap-3 mb-3">
                        <span className={`text-xs font-semibold px-2.5 py-1 rounded-full ${categoryColors[news.category] || 'bg-gray-100 text-gray-600'}`}>
                          {news.category}
                        </span>
                        <span className="text-xs text-gray-400 flex items-center gap-1">
                          <Calendar size={12} /> {news.date}
                        </span>
                      </div>
                      <h3 className="text-lg font-bold text-[#0F172A] mb-2">{news.title}</h3>
                      <p className={`text-gray-600 text-sm leading-relaxed ${isExpanded ? '' : 'line-clamp-2'}`}>
                        {news.description}
                      </p>
                    </div>
                    <button
                      onClick={() => toggleFavorite(news.id)}
                      className={`ml-4 p-2 rounded-xl transition-all duration-200 flex-shrink-0 ${
                        isFav ? 'text-brand-ambra bg-brand-ambra/10' : 'text-gray-300 hover:text-brand-ambra hover:bg-brand-ambra/5'
                      }`}
                    >
                      <Star
                        size={20}
                        className={pingId === news.id ? 'animate-ping-once' : ''}
                        fill={isFav ? '#D97706' : 'none'}
                        strokeWidth={2}
                      />
                    </button>
                  </div>

                  {isExpanded && (
                    <div className="mt-4 pt-4 border-t border-slate-200/60 animate-fade-in-up">
                      <pre className="text-sm text-gray-700 whitespace-pre-wrap font-sans leading-relaxed">
                        {news.content}
                      </pre>
                      <div className="flex gap-2 mt-4 flex-wrap">
                        {news.tags.map(tag => (
                          <span key={tag} className="text-xs px-2 py-1 rounded-full bg-gray-100 text-gray-600">{tag}</span>
                        ))}
                        {news.link && news.link !== '#' && (
                          <a href={news.link} target="_blank" rel="noopener noreferrer"
                            className="text-xs px-3 py-1 rounded-full bg-brand-blu/10 text-brand-blu font-medium hover:bg-brand-blu/20 transition inline-flex items-center gap-1">
                            <ExternalLink size={10} /> Fonte ufficiale MIM
                          </a>
                        )}
                      </div>
                    </div>
                  )}
                </div>

                <div className="px-6 pb-4">
                  <button
                    onClick={() => setExpandedId(isExpanded ? null : news.id)}
                    className="inline-flex items-center gap-2 text-brand-verde font-semibold hover:text-brand-verde/80 transition-colors text-sm"
                  >
                    {isExpanded ? 'Riduci' : 'Leggi di più'}
                    <ChevronDown size={16} className={`transition-transform duration-300 ${isExpanded ? 'rotate-180' : ''}`} />
                  </button>
                </div>
              </div>
            );
          })}
        </div>

        {filtered.length > 3 && !showAll && (
          <div className="text-center mt-10">
            <button
              onClick={() => setShowAll(true)}
              className="inline-flex items-center gap-2 bg-brand-blu text-white px-8 py-3 rounded-2xl hover:bg-brand-blu/90 transition-colors font-semibold shadow-soft"
            >
              Vedi tutte le notizie ({filtered.length})
              <ExternalLink size={16} />
            </button>
          </div>
        )}
      </div>

      {showLogin && <LoginModal onClose={() => setShowLogin(false)} />}
    </section>
  );
}
