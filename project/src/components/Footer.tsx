import { Mail, Phone } from 'lucide-react';
import NewsletterForm from './NewsletterForm';

export default function Footer() {
  const currentYear = new Date().getFullYear();

  const menuSections = [
    {
      title: 'Navigazione',
      links: [
        { label: 'Home', href: '/' },
        { label: 'Assistente AI', href: '/assistente/docente' },
        { label: 'Calcolo GPS', href: '/calcolo-punteggio' },
        { label: 'Notizie', href: '/notizie' },
        { label: 'Interpelli', href: '/interpelli' },
        { label: 'Servizi', href: '/servizi' },
      ],
    },
    {
      title: 'Risorse',
      links: [
        { label: 'Normative', href: '/normative' },
        { label: 'Scadenze', href: '/scadenze' },
        { label: 'FAQ', href: '/faq' },
        { label: 'Contatti', href: '/contatti' },
      ],
    },
    {
      title: 'Informazioni',
      links: [
        { label: 'Chi Siamo', href: '#' },
        { label: 'Privacy Policy', href: '#' },
        { label: 'Cookie Policy', href: '#' },
        { label: 'Termini e Condizioni', href: '#' },
      ],
    },
  ];

  return (
    <footer className="bg-gray-900 text-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid md:grid-cols-2 lg:grid-cols-5 gap-8 mb-12">
          <div className="lg:col-span-2">
            <h3 className="text-2xl font-bold mb-4">Sportello Scuola 2.0</h3>
            <p className="text-gray-400 mb-6 leading-relaxed">
              Il punto di riferimento per docenti e personale ATA. Supporto completo per la gestione della carriera scolastica.
            </p>
            <div className="space-y-3">
              <a
                href="mailto:sportelloscuola2.0@gmail.com"
                className="flex items-center gap-2 text-gray-400 hover:text-white transition-colors"
              >
                <Mail size={18} />
                sportelloscuola2.0@gmail.com
              </a>
              <div className="flex items-start gap-2 text-gray-400">
                <Phone size={18} className="mt-1" />
                <div>
                  <div className="hover:text-white transition-colors">388 971 1647</div>
                  <div className="hover:text-white transition-colors">334 617 0986</div>
                </div>
              </div>
            </div>
          </div>

          {menuSections.map((section) => (
            <div key={section.title}>
              <h4 className="text-lg font-semibold mb-4">{section.title}</h4>
              <ul className="space-y-2">
                {section.links.map((link) => (
                  <li key={link.label}>
                    <a
                      href={link.href}
                      className="text-gray-400 hover:text-white transition-colors"
                    >
                      {link.label}
                    </a>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>

        <div className="border-t border-gray-800 pt-8 mb-8">
          <h4 className="text-lg font-semibold mb-4">Newsletter Settimanale</h4>
          <p className="text-gray-400 text-sm mb-4">
            Ricevi ogni lunedì il report con le scadenze ministeriali e le ultime notizie.
          </p>
          <NewsletterForm />
        </div>

        <div className="border-t border-gray-800 pt-8 mb-8">
          <div className="bg-gray-800/50 rounded-2xl p-6 text-center">
            <h4 className="text-lg font-semibold mb-2">Diventa Partner di Sportello Scuola 2.0</h4>
            <p className="text-gray-400 text-sm mb-4 max-w-2xl mx-auto">
              Vuoi posizionare i tuoi corsi universitari o certificazioni informatiche davanti a migliaia di docenti e ATA?
              Diventa Partner Commerciale di Sportello Scuola 2.0 e raggiungi il tuo pubblico target.
            </p>
            <a
              href="mailto:sportelloscuola2.0@gmail.com?subject=Richiesta%20Partner%20Commerciale"
              className="inline-block px-6 py-3 bg-gradient-to-r from-brand-blu to-brand-verde text-white rounded-2xl font-semibold hover:opacity-90 transition"
            >
              Contatta il nostro ufficio marketing
            </a>
          </div>
        </div>

        <div className="border-t border-gray-800 pt-8">
          <div className="flex flex-col md:flex-row justify-between items-center gap-4">
            <p className="text-gray-400 text-sm">
              &copy; {currentYear} Sportello Scuola 2.0. Tutti i diritti riservati.
            </p>
            <p className="text-gray-400 text-sm">
              In collaborazione con{' '}
              <span className="text-green-400 font-semibold">Centro Studi Progetto21</span>
            </p>
          </div>
        </div>
      </div>
    </footer>
  );
}
