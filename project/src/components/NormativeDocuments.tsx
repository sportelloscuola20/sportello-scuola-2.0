import { FileText, BookOpen, Building, ShieldCheck, List, Download, ExternalLink } from 'lucide-react';

const documents = [
  { icon: Building, title: 'CCNL Scuola', desc: 'Contratto Collettivo Nazionale di Lavoro per il personale della scuola. Aggiornato alle ultime intese.', link: '#' },
  { icon: List, title: 'Ordinanze Ministeriali', desc: 'Raccolta delle ultime ordinanze ministeriali riguardanti la scuola, le graduatorie e il personale.', link: '#' },
  { icon: BookOpen, title: 'Guide e Modelli', desc: 'Guide pratiche per GPS, ATA, inclusione, BES, DSA e modelli di documenti pronti all\'uso.', link: '#' },
  { icon: ShieldCheck, title: 'Normativa Inclusione', desc: 'Leggi, decreti e circolari su BES, DSA, PEI, PDP e strategie inclusive per ogni ordine di scuola.', link: '#' },
  { icon: FileText, title: 'Sicurezza e Privacy', desc: 'Normativa sulla sicurezza nei luoghi di lavoro scolastici e sulla protezione dei dati personali (GDPR).', link: '#' },
  { icon: ExternalLink, title: 'Contratti e Nomine', desc: 'Modelli di contratti, procedure per le nomine, interpelli e gestione delle supplenze.', link: '#' },
];

export default function NormativeDocuments() {
  return (
    <section id="normative" className="py-20 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-6">
          <h2 className="text-4xl font-extrabold text-brand-blu mb-4 tracking-tight">
            Normative e Documenti
          </h2>
          <p className="text-gray-600 font-normal max-w-2xl mx-auto">
            Archivio ufficiale e centralizzato di decreti, ordinanze ministeriali e modelli di domanda scaricabili.
          </p>
        </div>

        <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3 mt-12">
          {documents.map((doc, i) => (
            <div
              key={i}
              className="bg-gradient-to-br from-gray-50 to-white rounded-2xl p-6 border border-gray-200 hover:border-brand-blu/30 hover:shadow-lg transition-all duration-300 group"
            >
              <div className="flex items-center mb-4">
                <div className="w-10 h-10 bg-brand-blu/10 rounded-xl flex items-center justify-center mr-3 group-hover:bg-brand-blu/20 transition-colors">
                  <doc.icon className="h-5 w-5 text-brand-blu" />
                </div>
                <h3 className="text-lg font-bold text-gray-800">{doc.title}</h3>
              </div>
              <p className="text-gray-600 text-sm leading-relaxed mb-4">
                {doc.desc}
              </p>
              <a
                href={doc.link}
                className="inline-flex items-center gap-2 text-brand-verde font-semibold text-sm hover:text-brand-verde/80 transition-colors"
              >
                <Download size={14} />
                Consulta e scarica
              </a>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
