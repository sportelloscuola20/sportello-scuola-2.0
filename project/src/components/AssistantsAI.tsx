import { Sparkles, Bot, Briefcase, School, ShieldCheck, Users, MessageCircle, FileText, ClipboardList } from 'lucide-react';
import { Link } from 'react-router-dom';

export default function AssistantsAI() {
  return (
    <section id="assistente-ai" className="py-16 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <h2 className="text-3xl font-bold text-center mb-12 text-gray-800">
          Assistenti AI
        </h2>
        <p className="text-center text-gray-600 mb-12 max-w-2xl mx-auto">
          Assistenti specializzati per ogni ruolo scolastico, addestrati su normative, procedure e best practice del mondo della scuola.
        </p>

        <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-4">
          {/* Assistente Docente */}
          <Link to="/assistente/docente" className="block">
            <div className="bg-indigo-50 p-6 rounded-lg border border-indigo-200 hover:bg-indigo-100 transition-colors hover:shadow-lg">
              <div className="flex items-center mb-4">
                <School className="h-6 w-6 text-indigo-600 mr-3" />
                <h3 className="text-xl font-semibold text-indigo-800">Assistente Docente</h3>
              </div>
              <div className="mb-4">
                <h4 className="font-medium text-indigo-700 mb-2">Conoscenze:</h4>
                <ul className="list-disc pl-5 text-gray-600 space-y-1 text-sm">
                  <li>GPS</li>
                  <li>GAE</li>
                  <li>GI</li>
                  <li>Interpelli</li>
                  <li>Supplenze</li>
                  <li>UDA</li>
                  <li>PEI</li>
                  <li>PDP</li>
                  <li>BES</li>
                  <li>DSA</li>
                  <li>Valutazione</li>
                  <li>Normativa</li>
                </ul>
              </div>
              <div className="mb-4">
                <h4 className="font-medium text-indigo-700 mb-2">Prompt iniziali:</h4>
                <ul className="list-disc pl-5 text-gray-600 space-y-1 text-sm">
                  <li>&ldquo;Posso accettare questa supplenza?&rdquo;</li>
                  <li>&ldquo;Calcola il mio punteggio GPS&rdquo;</li>
                  <li>&ldquo;Aiutami a creare una UDA&rdquo;</li>
                </ul>
              </div>
            </div>
          </Link>

          {/* Assistente ATA */}
          <Link to="/assistente/ata" className="block">
            <div className="bg-indigo-50 p-6 rounded-lg border border-indigo-200 hover:bg-indigo-100 transition-colors hover:shadow-lg">
              <div className="flex items-center mb-4">
                <Briefcase className="h-6 w-6 text-indigo-600 mr-3" />
                <h3 className="text-xl font-semibold text-indigo-800">Assistente ATA</h3>
              </div>
              <div className="mb-4">
                <h4 className="font-medium text-indigo-700 mb-2">Conoscenze:</h4>
                <ul className="list-disc pl-5 text-gray-600 space-y-1 text-sm">
                  <li>Graduatorie ATA</li>
                  <li>Punteggi</li>
                  <li>Contratti</li>
                  <li>Mobilità</li>
                  <li>Segreteria</li>
                </ul>
              </div>
              <div className="mb-4">
                <h4 className="font-medium text-indigo-700 mb-2">Prompt iniziali:</h4>
                <ul className="list-disc pl-5 text-gray-600 space-y-1 text-sm">
                  <li>&ldquo;Quanto vale questo attestato?&rdquo;</li>
                </ul>
              </div>
            </div>
          </Link>

          {/* Assistente Dirigente */}
          <Link to="/assistente/dirigente" className="block">
            <div className="bg-indigo-50 p-6 rounded-lg border border-indigo-200 hover:bg-indigo-100 transition-colors hover:shadow-lg">
              <div className="flex items-center mb-4">
                <ShieldCheck className="h-6 w-6 text-indigo-600 mr-3" />
                <h3 className="text-xl font-semibold text-indigo-800">Assistente Dirigente</h3>
              </div>
              <div className="mb-4">
                <h4 className="font-medium text-indigo-700 mb-2">Conoscenze:</h4>
                <ul className="list-disc pl-5 text-gray-600 space-y-1 text-sm">
                  <li>Normativa</li>
                  <li>Personale</li>
                  <li>Privacy</li>
                  <li>Sicurezza</li>
                  <li>Nomine</li>
                </ul>
              </div>
              <div className="mb-4">
                <h4 className="font-medium text-indigo-700 mb-2">Prompt iniziali:</h4>
                <ul className="list-disc pl-5 text-gray-600 space-y-1 text-sm">
                  <li>&ldquo;Come gestire una richiesta di permesso?&rdquo;</li>
                  <li>&ldquo;Qual è la procedura per le nomine?&rdquo;</li>
                </ul>
              </div>
            </div>
          </Link>

          {/* Assistente Sindacale */}
          <Link to="/assistente/sindacale" className="block">
            <div className="bg-indigo-50 p-6 rounded-lg border border-indigo-200 hover:bg-indigo-100 transition-colors hover:shadow-lg">
              <div className="flex items-center mb-4">
                <Users className="h-6 w-6 text-indigo-600 mr-3" />
                <h3 className="text-xl font-semibold text-indigo-800">Assistente Sindacale</h3>
              </div>
              <div className="mb-4">
                <h4 className="font-medium text-indigo-700 mb-2">Conoscenze:</h4>
                <ul className="list-disc pl-5 text-gray-600 space-y-1 text-sm">
                  <li>CCNL</li>
                  <li>Legge 104</li>
                  <li>Permessi</li>
                  <li>Congedi</li>
                  <li>Ferie</li>
                  <li>Sanzioni</li>
                  <li>Supplenze</li>
                </ul>
              </div>
              <div className="mb-4">
                <h4 className="font-medium text-indigo-700 mb-2">Prompt iniziali:</h4>
                <ul className="list-disc pl-5 text-gray-600 space-y-1 text-sm">
                  <li>&ldquo;Posso rifiutare questa supplenza?&rdquo;</li>
                  <li>&ldquo;Hai diritto ai permessi?&rdquo;</li>
                </ul>
              </div>
            </div>
          </Link>
        </div>
      </div>
    </section>
  );
}