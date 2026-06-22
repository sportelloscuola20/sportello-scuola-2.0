import { Calendar, ExternalLink } from 'lucide-react';
import { Link } from 'react-router-dom';

const newsItems = [
  {
    id: 1,
    date: '15 Giugno 2026',
    title: 'Aggiornamento GPS 2026-2028: pubblicata l\'Ordinanza Ministeriale',
    description: 'Il Ministero dell\'Istruzione e del Merito ha pubblicato l\'ordinanza per l\'aggiornamento delle Graduatorie Provinciali per le Supplenze per il triennio 2026-2028. Le domande potranno essere presentate entro il 31 luglio 2026 tramite Istanze On Line.',
    link: '#',
  },
  {
    id: 2,
    date: '10 Giugno 2026',
    title: 'Concorso Docenti 2026: pubblicato il calendario delle prove scritte',
    description: 'Pubblicate le date ufficiali per il concorso ordinario per docenti di scuola secondaria. Le prove si terranno dal 15 al 25 ottobre 2026.',
    link: '#',
  },
  {
    id: 3,
    date: '5 Giugno 2026',
    title: 'D.M. 89/2024: graduatorie ATA terza fascia in fase di pubblicazione',
    description: 'Gli Uffici Scolastici Provinciali stanno pubblicando le graduatorie definitive di terza fascia del personale ATA per il triennio 2024-2027.',
    link: '#',
  },
];

export default function News() {
  return (
    <section id="notizie" className="py-20 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-6">
          <h2 className="text-4xl font-extrabold text-brand-blu mb-4 tracking-tight">
            Ultime Notizie del Ministero dell'Istruzione
          </h2>
          <p className="text-gray-600 font-normal max-w-2xl mx-auto">
            Notiziario aggiornato in tempo reale sulle novità legislative e i bandi del comparto istruzione.
          </p>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6 mt-12">
          {newsItems.map((news) => (
            <div
              key={news.id}
              className="bg-white border border-gray-200 rounded-2xl p-6 hover:shadow-lg transition-all duration-300 hover:border-brand-blu/30"
            >
              <div className="flex items-center gap-2 text-brand-blu mb-3">
                <Calendar size={16} />
                <span className="text-sm font-medium">{news.date}</span>
              </div>
              <h3 className="text-lg font-bold text-gray-800 mb-3 leading-snug">
                {news.title}
              </h3>
              <p className="text-gray-600 text-sm mb-4 leading-relaxed line-clamp-3">
                {news.description}
              </p>
              <button
                onClick={() => {}}
                className="inline-flex items-center gap-2 text-brand-verde font-semibold hover:text-brand-verde/80 transition-colors text-sm"
              >
                Leggi di più
                <ExternalLink size={14} />
              </button>
            </div>
          ))}
        </div>

        <div className="text-center mt-10">
          <Link
            to="/notizie"
            className="inline-flex items-center gap-2 bg-brand-blu text-white px-8 py-3 rounded-xl hover:bg-brand-blu/90 transition-colors font-semibold"
          >
            Vedi tutte le notizie
            <ExternalLink size={16} />
          </Link>
        </div>
      </div>
    </section>
  );
}
