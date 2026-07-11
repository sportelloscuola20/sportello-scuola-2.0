import { Bot, MessageCircle, Sparkles, ArrowRight } from 'lucide-react';
import { Link } from 'react-router-dom';

const promptCards = [
  {
    title: 'Calcolo punteggio maternità',
    text: 'Come si calcola il punteggio di maternità sui servizi di supplenza temporanea?',
  },
  {
    title: 'Sanzioni rinuncia interpello',
    text: 'Cosa succede a livello di sanzioni se rifiuto un interpello o una convocazione da GPS?',
  },
  {
    title: 'Permessi studio 150 ore',
    text: 'Quali sono i diritti previsti dal CCNL per i permessi per motivi di studio (150 ore)?',
  },
];

export default function AssistantsAI() {
  return (
    <section id="sindacalista-ai" className="py-20 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-6">
          <h2 className="text-4xl font-extrabold text-[#0F172A] mb-4 tracking-tight">
            Sindacalista AI
          </h2>
          <p className="text-gray-600 font-normal max-w-2xl mx-auto">
            Il tuo consulente sindacale digitale attivo 24/7 per risolvere dubbi normativi, contrattuali e di reclutamento.
          </p>
        </div>

        <div className="mt-12 max-w-3xl mx-auto">
          <div className="bg-gradient-to-br from-gray-50 to-white rounded-3xl border border-slate-200/60 p-8 shadow-soft">
            <div className="flex items-center gap-4 mb-6">
              <div className="w-16 h-16 bg-gradient-to-br from-brand-verde to-brand-ottanio rounded-2xl flex items-center justify-center">
                <Bot className="w-8 h-8 text-white" />
              </div>
              <div>
                <h3 className="text-xl font-bold text-[#0F172A]">Sindacalista AI</h3>
                <p className="text-sm text-gray-500">Assistente sindacale digitale — CCNL, normative, GPS, interpelli</p>
              </div>
            </div>

            <p className="text-gray-600 text-sm leading-relaxed mb-6">
              Il tuo consulente sindacale digitale attivo 24/7 per risolvere dubbi normativi, contrattuali e di reclutamento. Basato sulla knowledge base ufficiale di CCNL Istruzione e Ricerca, Ordinanze Ministeriali e decreti del settore istruzione.
            </p>

            <div className="grid md:grid-cols-3 gap-4 mb-8">
              {promptCards.map((card, i) => (
                <Link
                  key={i}
                  to="/sindacalista-ai"
                  className="block p-4 bg-brand-verde/5 border border-brand-verde/10 rounded-2xl hover:bg-brand-verde/10 hover:border-brand-verde/30 transition-all duration-200 group"
                >
                  <p className="text-xs font-semibold text-brand-verde mb-1">{card.title}</p>
                  <p className="text-sm text-gray-600 group-hover:text-gray-800 transition-colors">{card.text}</p>
                </Link>
              ))}
            </div>

            <Link
              to="/sindacalista-ai"
              className="block w-full py-4 bg-gradient-to-r from-brand-verde to-brand-ottanio text-white rounded-2xl font-bold text-lg hover:opacity-90 transition text-center shadow-lg"
            >
              <Sparkles size={20} className="inline mr-2" />
              Apri il Sindacalista AI
              <ArrowRight size={18} className="inline ml-2" />
            </Link>
          </div>
        </div>
      </div>
    </section>
  );
}
