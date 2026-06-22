import { Calendar, ExternalLink } from 'lucide-react';

export default function News() {
  const newsItems = [
    {
      id: 1,
      date: '08 Dicembre 2025',
      title: 'Aggiornamento GPS 2025: Nuove disposizioni ministeriali',
      description: 'Il Ministero pubblica le nuove linee guida per l\'aggiornamento delle Graduatorie Provinciali per le Supplenze.',
      link: '#',
    },
    {
      id: 2,
      date: '05 Dicembre 2025',
      title: 'Concorso Docenti 2025: Date e modalità di partecipazione',
      description: 'Pubblicate le date ufficiali per il prossimo concorso ordinario per docenti di scuola secondaria.',
      link: '#',
    },
    {
      id: 3,
      date: '01 Dicembre 2025',
      title: 'Nuovi corsi di formazione riconosciuti dal MIUR',
      description: 'Disponibile l\'elenco aggiornato dei corsi di formazione e aggiornamento riconosciuti dal Ministero.',
      link: '#',
    },
  ];

  return (
    <section id="notizie" className="py-20 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-12">
          <h2 className="text-4xl font-bold text-gray-900 mb-4">
            Ultime Notizie dal Ministero dell'Istruzione
          </h2>
          <p className="text-xl text-gray-600">
            Rimani aggiornato con le ultime novità dal mondo della scuola
          </p>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8 mb-12">
          {newsItems.map((news) => (
            <div
              key={news.id}
              className="bg-white border border-gray-200 rounded-lg p-6 hover:shadow-xl transition-shadow duration-200"
            >
              <div className="flex items-center gap-2 text-blue-600 mb-3">
                <Calendar size={18} />
                <span className="text-sm font-medium">{news.date}</span>
              </div>
              <h3 className="text-xl font-bold text-gray-900 mb-3">
                {news.title}
              </h3>
              <p className="text-gray-600 mb-4 line-clamp-3">
                {news.description}
              </p>
              <a
                href={news.link}
                className="inline-flex items-center gap-2 text-blue-600 hover:text-blue-700 font-medium"
              >
                Leggi di più
                <ExternalLink size={16} />
              </a>
            </div>
          ))}
        </div>

        <div className="text-center">
          <a href="/notizie" className="inline-block bg-blue-600 text-white px-8 py-3 rounded-lg hover:bg-blue-700 transition-colors duration-200 font-semibold">
            Vedi tutte le notizie
          </a>
        </div>
      </div>
    </section>
  );
}
