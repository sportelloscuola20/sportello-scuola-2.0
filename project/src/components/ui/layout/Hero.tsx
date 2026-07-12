import { Calculator, Sparkles, ArrowRight, BellRing } from 'lucide-react';
import { Link } from 'react-router-dom';

export default function Hero() {
  return (
    <section id="home" className="pt-32 pb-20 relative overflow-hidden">
      <div className="absolute inset-0 bg-gradient-to-br from-blue-50/80 via-white to-emerald-50/60 pointer-events-none"></div>
      <div className="absolute top-1/3 -left-32 w-[500px] h-[500px] bg-brand-blu/[0.03] rounded-full blur-3xl pointer-events-none"></div>
      <div className="absolute bottom-0 right-0 w-[400px] h-[400px] bg-brand-verde/[0.03] rounded-full blur-3xl pointer-events-none"></div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="text-center">
          <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-gradient-to-r from-brand-ambra/10 to-brand-oro/10 border border-brand-ambra/20 text-brand-oro text-xs font-bold uppercase tracking-wider mb-6 shadow-sm hover:scale-105 transition-all">
            <Sparkles size={14} />
            <span>Novità: Assistente Normativo — IA specializzata in normativa scolastica 24/7</span>
          </div>

          <h1 className="text-5xl md:text-7xl font-black mb-6 tracking-tight leading-tight text-[#0F172A]">
            La piattaforma AI specializzata per Docenti, ATA e Dirigenti scolastici.
          </h1>
          <p className="text-lg md:text-xl text-gray-600 font-normal max-w-2xl mx-auto mb-10 leading-relaxed">
            Calcola il tuo punteggio GPS e ATA, consulta normative aggiornate, genera documenti scolastici e ricevi assistenza professionale 24/7.
          </p>

          <div className="flex flex-col md:flex-row gap-4 justify-center items-center">
            <Link
              to="/assistente"
              className="w-full sm:w-auto flex items-center justify-center gap-2 bg-brand-verde text-white px-8 py-4 rounded-2xl hover:bg-brand-verde/90 transition-all duration-300 font-bold text-lg shadow-lg hover:shadow-xl transform hover:-translate-y-1"
            >
              <Sparkles size={22} />
              Prova l'Assistente Normativo
            </Link>
            <Link
              to="/calcolo-punteggio"
              className="w-full sm:w-auto flex items-center justify-center gap-2 bg-white text-gray-700 px-8 py-4 rounded-2xl hover:bg-gray-50 transition-all duration-300 font-bold text-lg shadow-soft hover:shadow-medium transform hover:-translate-y-1 border border-slate-200/60"
            >
              <Calculator size={22} />
              Calcola il tuo punteggio
            </Link>
          </div>

          <div className="mt-16 grid grid-cols-1 md:grid-cols-3 gap-6 max-w-4xl mx-auto">
            {[
              { icon: Calculator, label: 'Simulazione GPS/ATA', desc: 'Algoritmo aggiornato ai decreti ministeriali vigenti', color: 'text-brand-blu' },
              { icon: Sparkles, label: 'Assistente Normativo', desc: 'Consulente IA attivo 24/7 su normativa e contratti', color: 'text-brand-verde' },
              { icon: BellRing, label: 'Interpelli e Scadenze', desc: 'Monitoraggio nazionale in tempo reale con notifiche', color: 'text-brand-ambra' },
            ].map(item => (
              <div key={item.label} className="bg-white/70 backdrop-blur-md rounded-3xl p-5 border border-slate-200/60 shadow-soft text-center hover:shadow-medium transition-all duration-300">
                <item.icon className={`w-8 h-8 ${item.color} mx-auto mb-3`} />
                <h3 className="font-semibold text-[#0F172A]">{item.label}</h3>
                <p className="text-xs text-gray-500 mt-1">{item.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
