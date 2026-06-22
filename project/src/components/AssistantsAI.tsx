import { Bot, MessageCircle, Sparkles } from 'lucide-react';
import { Link } from 'react-router-dom';

const promptCards = [
  "Come si calcola il punteggio di maternità sui servizi di supplenza temporanea?",
  "Cosa succede a livello di sanzioni se rifiuto un interpello o una convocazione da GPS?",
  "Quali sono i diritti previsti dal CCNL per i permessi per motivi di studio (150 ore)?",
  "Come funziona la mobilità volontaria GPS 2026?",
  "Requisiti e procedure per le MAD 2026-2028 (sostituite dagli Interpelli)",
  "Calcolo punteggio per passaggio di ruolo ATA → Docente",
];

export default function AssistantsAI() {
  return (
    <section id="assistente-ai" className="py-20 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-6">
          <h2 className="text-4xl font-extrabold text-brand-blu mb-4 tracking-tight">
            Sindacalista AI
          </h2>
          <p className="text-gray-600 font-normal max-w-2xl mx-auto">
            Il tuo consulente sindacale digitale attivo 24/7 per risolvere dubbi normativi, contrattuali e di reclutamento.
          </p>
        </div>

        <div className="grid lg:grid-cols-5 gap-8 mt-12">
          <div className="lg:col-span-3 bg-gradient-to-br from-gray-50 to-white rounded-3xl border border-gray-200 p-6 shadow-sm">
            <Link
              to="/assistente/docente"
              className="block w-full py-4 bg-brand-blu text-white rounded-2xl font-bold text-lg hover:bg-brand-blu/90 transition text-center mb-6"
            >
              <Sparkles size={20} className="inline mr-2" />
              Apri il Sindacalista AI
            </Link>
            <div className="bg-white rounded-2xl border border-gray-200 p-5">
              <div className="flex items-center gap-3 mb-4">
                <div className="w-10 h-10 bg-brand-blu/10 rounded-xl flex items-center justify-center">
                  <Bot className="w-5 h-5 text-brand-blu" />
                </div>
                <div>
                  <h3 className="font-bold text-gray-800 text-sm">Sindacalista AI</h3>
                  <p className="text-xs text-gray-500">Assistente sindacale digitale</p>
                </div>
              </div>
              <div className="bg-gray-50 rounded-2xl p-4 mb-3">
                <p className="text-sm text-gray-600">
                  <span className="font-semibold text-brand-blu">Sindacalista AI:</span> Buongiorno, sono il Sindacalista AI di Sportello Scuola 2.0. Sono qui per assisterti su normative scolastiche, CCNL Istruzione e Ricerca, GPS, interpelli e diritti del personale. Come posso aiutarti?
                </p>
              </div>
              <div className="h-10 bg-gray-100 rounded-2xl flex items-center px-4">
                <p className="text-sm text-gray-400">Scrivi la tua domanda qui...</p>
              </div>
            </div>
          </div>

          <div className="lg:col-span-2">
            <div className="bg-white rounded-3xl border border-gray-200 p-6 shadow-sm">
              <div className="flex items-center gap-2 mb-4">
                <MessageCircle className="w-5 h-5 text-brand-verde" />
                <h3 className="font-bold text-gray-800 text-sm">Domande frequenti</h3>
              </div>
              <div className="space-y-2">
                {promptCards.map((prompt, i) => (
                  <Link
                    key={i}
                    to="/assistente/docente"
                    className="block w-full text-left p-3 bg-gray-50 hover:bg-brand-blu/5 border border-gray-100 rounded-xl text-sm text-gray-700 hover:text-brand-blu hover:border-brand-blu/30 transition-all duration-200"
                  >
                    <span className="line-clamp-2">{prompt}</span>
                  </Link>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
