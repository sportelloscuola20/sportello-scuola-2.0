import { FileText, BookOpen, Building, MapPin, ShieldCheck, List } from 'lucide-react';

export default function NormativeDocuments() {
  return (
    <section id="normative" className="py-16 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <h2 className="text-3xl font-bold text-center mb-12 text-gray-800">
          Normative e Documenti
        </h2>
        <p className="text-center text-gray-600 mb-16 max-w-2xl mx-auto">
          Accesso rapido alle normative aggiornate, modelli di documenti e risorse utili per la vita scolastica.
        </p>

        <div className="grid gap-8 md:grid-cols-3">
          {/* CCNL */}
          <div className="bg-indigo-50 p-6 rounded-lg border border-indigo-200 hover:bg-indigo-100 transition-colors">
            <div className="flex items-center mb-4">
              <Building className="h-5 w-5 text-indigo-600 mr-3" />
              <h3 className="text-xl font-semibold text-indigo-800">CCNL Scuola</h3>
            </div>
            <p className="text-gray-600 mb-4">
              Contratto Collettivo Nazionale di Lavoro per il personale della scuola. Aggiornato alle ultime intese.
            </p>
            <a href="#" className="text-indigo-600 font-medium hover:text-indigo-800 transition-colors flex items-center">
              Consulta il CCNL
              <FileText className="ml-2 h-4 w-4" />
            </a>
          </div>

          {/* Ordinanze Ministeriali */}
          <div className="bg-indigo-50 p-6 rounded-lg border border-indigo-200 hover:bg-indigo-100 transition-colors">
            <div className="flex items-center mb-4">
              <List className="h-5 w-5 text-indigo-600 mr-3" />
              <h3 className="text-xl font-semibold text-indigo-800">Ordananze Ministeriali</h3>
            </div>
            <p className="text-gray-600 mb-4">
              Raccolta delle ultime ordinanze ministeriali riguardanti la scuola, le graduatorie e il personale.
            </p>
            <a href="#" className="text-indigo-600 font-medium hover:text-indigo-800 transition-colors flex items-center">
              Vedi tutte
              <FileText className="ml-2 h-4 w-4" />
            </a>
          </div>

          {/* Guide e Modelli */}
          <div className="bg-indigo-50 p-6 rounded-lg border border-indigo-200 hover:bg-indigo-100 transition-colors">
            <div className="flex items-center mb-4">
              <BookOpen className="h-5 w-5 text-indigo-600 mr-3" />
              <h3 className="text-xl font-semibold text-indigo-800">Guide e Modelli</h3>
            </div>
            <p className="text-gray-600 mb-4">
              Guide pratiche per GPS, ATA, inclusione, BES, DSA e modelli di documenti pronti all'uso.
            </p>
            <a href="#" className="text-indigo-600 font-medium hover:text-indigo-800 transition-colors flex items-center">
              Scarica le risorse
              <FileText className="ml-2 h-4 w-4" />
            </a>
          </div>

          {/* Normativa Inclusione */}
          <div className="bg-indigo-50 p-6 rounded-lg border border-indigo-200 hover:bg-indigo-100 transition-colors">
            <div className="flex items-center mb-4">
              <ShieldCheck className="h-5 w-5 text-indigo-600 mr-3" />
              <h3 className="text-xl font-semibold text-indigo-800">Normativa Inclusione</h3>
            </div>
            <p className="text-gray-600 mb-4">
              Leggi, decreti e circolari su BES, DSA, PEI, PDP e strategie inclusive per ogni ordine di scuola.
            </p>
            <a href="#" className="text-indigo-600 font-medium hover:text-indigo-800 transition-colors flex items-center">
              Approfondisci
              <FileText className="ml-2 h-4 w-4" />
            </a>
          </div>

          {/* Sicurezza e Privacy */}
          <div className="bg-indigo-50 p-6 rounded-lg border border-indigo-200 hover:bg-indigo-100 transition-colors">
            <div className="flex items-center mb-4">
              <MapPin className="h-5 w-5 text-indigo-600 mr-3" />
              <h3 className="text-xl font-semibold text-indigo-800">Sicurezza e Privacy</h3>
            </div>
            <p className="text-gray-600 mb-4">
              Normativa sulla sicurezza nei luoghi di lavoro scolastici e sulla protezione dei dati personali (GDPR).
            </p>
            <a href="#" className="text-indigo-600 font-medium hover:text-indigo-800 transition-colors flex items-center">
              Vedi dettagli
              <FileText className="ml-2 h-4 w-4" />
            </a>
          </div>

          {/* Contratti e Nomine */}
          <div className="bg-indigo-50 p-6 rounded-lg border border-indigo-200 hover:bg-indigo-100 transition-colors">
            <div className="flex items-center mb-4">
              <FileText className="h-5 w-5 text-indigo-600 mr-3" />
              <h3 className="text-xl font-semibold text-indigo-800">Contratti e Nomine</h3>
            </div>
            <p className="text-gray-600 mb-4">
              Modelli di contratti, procedure per le nomine, interpelli e gestione delle supplenze.
            </p>
            <a href="#" className="text-indigo-600 font-medium hover:text-indigo-800 transition-colors flex items-center">
              Scopri di più
              <FileText className="ml-2 h-4 w-4" />
            </a>
          </div>
        </div>
      </div>
    </section>
  );
}