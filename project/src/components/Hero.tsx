import { Calculator, Sparkles, ArrowRight } from 'lucide-react';
import { Link } from 'react-router-dom';

export default function Hero() {
  return (
    <section id="home" className="pt-32 pb-20 bg-gradient-to-br from-blue-50 to-green-50 overflow-hidden relative">
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-brand-blu/5 rounded-full blur-3xl pointer-events-none"></div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="text-center">
          <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-brand-blu/10 border border-brand-blu/20 text-brand-blu text-xs font-bold uppercase tracking-wider mb-6 shadow-sm hover:scale-105 transition-all">
            <Sparkles size={14} />
            <span>Novità: Sindacalista AI — Assistente sindacale digitale 24/7</span>
          </div>

          <h1 className="text-5xl md:text-7xl font-black mb-6 tracking-tight leading-tight text-brand-blu">
            La piattaforma AI specializzata per Docenti, ATA e Dirigenti scolastici.
          </h1>
          <p className="text-lg md:text-xl text-gray-600 font-normal max-w-2xl mx-auto mb-10 leading-relaxed">
            Calcola il tuo punteggio GPS e ATA, consulta normative aggiornate, genera documenti scolastici e ricevi assistenza professionale 24/7.
          </p>

          <div className="flex flex-col md:flex-row gap-4 justify-center items-center">
            <Link
              to="/assistente/docente"
              className="w-full sm:w-auto flex items-center justify-center gap-2 bg-brand-blu text-white px-8 py-4 rounded-xl hover:bg-brand-blu/90 transition-all duration-300 font-bold text-lg shadow-lg hover:shadow-xl transform hover:-translate-y-1"
            >
              <Sparkles size={22} />
              Prova il Sindacalista AI
            </Link>
            <Link
              to="/calcolo-punteggio"
              className="w-full sm:w-auto flex items-center justify-center gap-2 bg-white text-gray-700 px-8 py-4 rounded-xl hover:bg-gray-50 transition-all duration-300 font-bold text-lg shadow-lg hover:shadow-xl transform hover:-translate-y-1 border border-gray-200"
            >
              <Calculator size={22} />
              Calcola il tuo punteggio
            </Link>
          </div>

          <div className="mt-16 grid grid-cols-1 md:grid-cols-3 gap-6 max-w-4xl mx-auto">
            {[
              { icon: Calculator, label: 'Simulazione GPS/ATA', desc: 'Algoritmo aggiornato ai decreti ministeriali vigenti' },
              { icon: Sparkles, label: 'Sindacalista AI', desc: 'Consulente digitale attivo 24/7 su normativa e contratti' },
              { icon: ArrowRight, label: 'Interpelli e Scadenze', desc: 'Monitoraggio nazionale in tempo reale' },
            ].map(item => (
              <div key={item.label} className="bg-white/70 backdrop-blur-xs rounded-2xl p-5 border border-gray-200/60 text-center">
                <item.icon className="w-8 h-8 text-brand-blu mx-auto mb-3" />
                <h3 className="font-semibold text-brand-blu">{item.label}</h3>
                <p className="text-xs text-gray-500 mt-1">{item.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
