import { Calendar, Clock, ExternalLink } from 'lucide-react';

export default function Deadlines() {
  const deadlines = [
    {
      id: 1,
      date: '15 Gennaio 2026',
      type: 'Concorsi',
      title: 'Scadenza domanda Concorso Ordinario Docenti',
      description: 'Ultimo giorno per presentare domanda di partecipazione al concorso ordinario per docenti di scuola secondaria.',
      link: '#',
    },
    {
      id: 2,
      date: '28 Febbraio 2026',
      type: 'GPS',
      title: 'Aggiornamento Graduatorie GPS',
      description: 'Apertura piattaforma per l\'aggiornamento delle Graduatorie Provinciali per le Supplenze.',
      link: '#',
    },
    {
      id: 3,
      date: '31 Marzo 2026',
      type: 'MAD',
      title: 'Invio Messa a Disposizione (MAD)',
      description: 'Periodo consigliato per l\'invio delle domande di Messa a Disposizione per l\'anno scolastico successivo.',
      link: '#',
    },
    {
      id: 4,
      date: '15 Aprile 2026',
      type: 'Mobilità',
      title: 'Domande di mobilità personale docente',
      description: 'Scadenza per la presentazione delle domande di mobilità territoriale e professionale.',
      link: '#',
    },
    {
      id: 5,
      date: '31 Maggio 2026',
      type: 'TFA',
      title: 'Selezione TFA Sostegno',
      description: 'Prove di accesso per il Tirocinio Formativo Attivo per le attività di sostegno didattico.',
      link: '#',
    },
    {
      id: 6,
      date: '30 Giugno 2026',
      type: 'Formazione',
      title: 'Iscrizione Corsi MIUR',
      description: 'Ultimo giorno per iscriversi ai corsi di formazione riconosciuti dal MIUR validi per l\'anno in corso.',
      link: '#',
    },
  ];

  const typeColors: Record<string, string> = {
    Concorsi: 'bg-red-100 text-red-700',
    GPS: 'bg-blue-100 text-blue-700',
    MAD: 'bg-green-100 text-green-700',
    Mobilità: 'bg-yellow-100 text-yellow-700',
    TFA: 'bg-orange-100 text-orange-700',
    Formazione: 'bg-cyan-100 text-cyan-700',
  };

  return (
    <section id="scadenze" className="py-20 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-12">
          <div className="flex justify-center items-center gap-3 mb-4">
            <Clock className="text-blue-600" size={40} />
            <h2 className="text-4xl font-bold text-gray-900">
              Scadenze Importanti
            </h2>
          </div>
          <p className="text-xl text-gray-600">
            Non perdere le date più importanti per la tua carriera
          </p>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
          {deadlines.map((deadline) => (
            <div
              key={deadline.id}
              className="bg-white border-2 border-gray-200 rounded-lg p-6 hover:border-blue-500 hover:shadow-xl transition-all duration-200"
            >
              <div className="flex items-start justify-between mb-4">
                <div className="flex items-center gap-2 text-blue-600">
                  <Calendar size={20} />
                  <span className="font-bold text-lg">{deadline.date}</span>
                </div>
                <span className={`px-3 py-1 rounded-full text-xs font-semibold ${typeColors[deadline.type]}`}>
                  {deadline.type}
                </span>
              </div>

              <h3 className="text-xl font-bold text-gray-900 mb-3">
                {deadline.title}
              </h3>

              <p className="text-gray-600 mb-4">
                {deadline.description}
              </p>

              <a
                href={deadline.link}
                className="inline-flex items-center gap-2 text-blue-600 hover:text-blue-700 font-medium"
              >
                Maggiori informazioni
                <ExternalLink size={16} />
              </a>
            </div>
          ))}
        </div>

        <div className="mt-12 bg-blue-50 rounded-lg p-8 border-2 border-blue-200">
          <div className="flex items-start gap-4">
            <Clock className="text-blue-600 flex-shrink-0 mt-1" size={32} />
            <div>
              <h3 className="text-xl font-bold text-gray-900 mb-2">
                Ricevi notifiche sulle scadenze
              </h3>
              <p className="text-gray-700 mb-4">
                Iscriviti al nostro servizio di promemoria e non perdere mai una scadenza importante.
              </p>
              <button className="bg-blue-600 text-white px-6 py-2 rounded-lg hover:bg-blue-700 transition-colors duration-200 font-semibold">
                Attiva notifiche
              </button>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
