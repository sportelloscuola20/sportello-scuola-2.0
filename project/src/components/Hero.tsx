import { Calculator, Sparkles } from 'lucide-react';

export default function Hero() {
  return (
    <section id="home" className="pt-32 pb-20 bg-gradient-to-br from-blue-50 to-green-50 overflow-hidden relative">
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-blue-400/5 rounded-full blur-3xl pointer-events-none"></div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="text-center">
          {/* Badge Novità AI */}
          <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-indigo-50 border border-indigo-200 text-indigo-700 text-xs font-bold uppercase tracking-wider mb-6 shadow-sm hover:scale-105 transition-all">
            <Sparkles size={14} className="text-indigo-600 animate-spin-slow" />
            <span>Novità: Scuola AI Agent Hub</span>
          </div>

          <h1 className="text-5xl md:text-7xl font-black mb-6 tracking-tight leading-tight">
            La piattaforma AI specializzata per Docenti, ATA e Dirigenti scolastici.
          </h1>
          <p className="text-lg md:text-xl text-gray-600 font-semibold max-w-2xl mx-auto mb-10 leading-relaxed">
            Calcola il tuo punteggio GPS e ATA, consulta normative aggiornate, genera documenti scolastici e ricevi assistenza professionale 24/7.
          </p>

          <div className="flex flex-col md:flex-row gap-4 justify-center items-center">
            {/* Bottone Assistente AI (Primario) */}
            <a
              href="#assistente-ai"
              className="w-full sm:w-auto flex items-center justify-center gap-2 bg-indigo-600 text-white px-8 py-4 rounded-xl hover:bg-indigo-700 transition-all duration-300 font-bold text-lg shadow-lg hover:shadow-xl transform hover:-translate-y-1"
            >
              <Sparkles size={22} className="animate-pulse" />
              Prova l’Assistente AI
            </a>

            {/* Bottone Calcolo Punteggio (Secondario) */}
            <a
              href="#calcolo-punteggio"
              className="w-full sm:w-auto flex items-center justify-center gap-2 bg-white text-gray-700 px-8 py-4 rounded-xl hover:bg-gray-50 transition-all duration-300 font-bold text-lg shadow-lg hover:shadow-xl transform hover:-translate-y-1 border border-gray-200"
            >
              <Calculator size={22} />
              Calcola il tuo punteggio
            </a>
          </div>
        </div>
      </div>
    </section>
  );
}