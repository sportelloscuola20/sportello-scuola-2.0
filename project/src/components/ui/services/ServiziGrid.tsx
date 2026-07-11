import { useState } from 'react';
import { GraduationCap, Briefcase, Globe, ArrowRight, Sparkles, Shield, Zap, CheckCircle, MessageSquare } from 'lucide-react';
import { CATEGORIE_SERVIZI, type CategoriaServizio, type Servizio } from '../../../data/servizi';
import BookingModal from './BookingModal';

const tabs: { key: CategoriaServizio; label: string; icon: typeof GraduationCap; desc: string }[] = [
  { key: 'docenti', label: 'Area Docenti', icon: GraduationCap, desc: 'Per insegnanti e aspiranti docenti' },
  { key: 'ata', label: 'Area ATA', icon: Briefcase, desc: 'Per personale Amministrativo, Tecnico e Ausiliario' },
  { key: 'generali', label: 'Servizi Trasversali', icon: Globe, desc: 'Per ogni esigenza scolastica e formativa' },
];

const iconMap: Record<string, typeof Shield> = {
  default: Shield,
  chat: MessageSquare,
};

function ServiceCard({ servizio, onBook }: { servizio: Servizio; onBook: (id: string) => void }) {
  const Icon = iconMap[servizio.id] || iconMap.default;

  return (
    <div className="group relative bg-white rounded-3xl border border-slate-200/60 shadow-soft hover:shadow-xl hover:border-brand-blu/20 transition-all duration-500 overflow-hidden">
      <div className="absolute inset-0 bg-gradient-to-br from-brand-blu/[0.02] to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
      <div className="relative p-7 sm:p-8">
        <div className="flex items-start gap-5">
          <div className="w-14 h-14 rounded-2xl bg-gradient-to-br from-brand-blu to-brand-blu/80 flex items-center justify-center flex-shrink-0 shadow-lg shadow-brand-blu/20 group-hover:shadow-brand-blu/30 transition-shadow duration-300">
            <Icon className="w-7 h-7 text-white" />
          </div>
          <div className="flex-1 min-w-0">
            <div className="flex items-start justify-between gap-4">
              <div>
                <h3 className="text-xl font-bold text-[#0F172A] leading-tight">{servizio.titolo}</h3>
                {servizio.evidenza && (
                  <span className="inline-flex items-center gap-1 mt-1.5 text-xs font-semibold text-brand-verde bg-brand-verde/10 px-3 py-1 rounded-full">
                    <Sparkles size={12} />
                    {servizio.evidenza}
                  </span>
                )}
              </div>
            </div>

            <p className="mt-3 text-base font-semibold text-brand-blu leading-snug">
              {servizio.valore}
            </p>

            <p className="mt-2 text-sm text-gray-600 leading-relaxed">
              {servizio.descrizione}
            </p>

            <ul className="mt-4 space-y-1.5">
              {servizio.dettagli.map((d, i) => (
                <li key={i} className="flex items-start gap-2 text-sm text-gray-500">
                  <CheckCircle size={14} className="text-brand-verde mt-0.5 flex-shrink-0" />
                  {d}
                </li>
              ))}
            </ul>

            <div className="mt-5 flex items-center gap-4">
              <button
                onClick={() => onBook(servizio.id)}
                className="inline-flex items-center gap-2 bg-brand-verde text-white px-5 py-2.5 rounded-xl text-sm font-bold hover:bg-brand-verde/90 transition-all duration-300 shadow-md hover:shadow-lg hover:-translate-y-0.5"
              >
                Prenota ora
                <ArrowRight size={16} />
              </button>
              <span className="text-sm font-bold text-gray-400">
                {servizio.prezzo > 0 ? `da €${servizio.prezzo}` : 'Prezzo da concordare'}
              </span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

function AltroCard({ categoria, onBook }: { categoria: CategoriaServizio; onBook: (id: string) => void }) {
  const labels: Record<CategoriaServizio, { title: string; desc: string }> = {
    docenti: {
      title: 'Hai un\'esigenza diversa?',
      desc: 'Ogni carriera ha la sua storia. Raccontaci la tua situazione specifica: ti proporremo un percorso su misura.',
    },
    ata: {
      title: 'Non trovi il servizio che cerchi?',
      desc: 'Le procedure ATA possono essere complesse e personali. Descrivici il tuo caso, troveremo la soluzione giusta.',
    },
    generali: {
      title: 'Il tuo caso non rientra in queste categorie?',
      desc: 'Affrontiamo ogni situazione con la massima attenzione. Parlaci del tuo bisogno, ti risponderemo con una proposta chiara.',
    },
  };

  const l = labels[categoria];

  return (
    <div className="relative bg-gradient-to-br from-amber-50 to-orange-50/50 rounded-3xl border border-amber-200/60 p-7 sm:p-8">
      <div className="flex items-start gap-5">
        <div className="w-14 h-14 rounded-2xl bg-gradient-to-br from-amber-500 to-orange-500 flex items-center justify-center flex-shrink-0 shadow-lg shadow-amber-500/20">
          <MessageSquare className="w-7 h-7 text-white" />
        </div>
        <div className="flex-1">
          <h3 className="text-xl font-bold text-[#0F172A]">{l.title}</h3>
          <p className="mt-2 text-sm text-gray-600">{l.desc}</p>
          <button
            onClick={() => onBook('altro-' + categoria)}
            className="mt-4 inline-flex items-center gap-2 bg-amber-500 text-white px-5 py-2.5 rounded-xl text-sm font-bold hover:bg-amber-600 transition-all duration-300 shadow-md hover:shadow-lg hover:-translate-y-0.5"
          >
            Racconta la tua situazione
            <ArrowRight size={16} />
          </button>
        </div>
      </div>
    </div>
  );
}

export default function ServiziGrid() {
  const [activeTab, setActiveTab] = useState<CategoriaServizio>('docenti');
  const [showBooking, setShowBooking] = useState(false);
  const [bookingServiceId, setBookingServiceId] = useState<string | undefined>();

  const categoriaCorrente = CATEGORIE_SERVIZI.find(c => c.key === activeTab)!;

  const handleBook = (serviceId: string) => {
    setBookingServiceId(serviceId);
    setShowBooking(true);
  };

  return (
    <section id="i-nostri-servizi-professionali" className="py-20 sm:py-28 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center max-w-4xl mx-auto mb-14">
          <div className="inline-flex items-center gap-2 bg-brand-blu/10 text-brand-blu text-xs font-bold px-4 py-1.5 rounded-full mb-4">
            <Zap size={14} />
            CONSULENZA SPECIALISTICA
          </div>
          <h2 className="text-4xl sm:text-5xl font-extrabold text-[#0F172A] mb-5 tracking-tight leading-tight">
            I Nostri Servizi Professionali
          </h2>
          <p className="text-lg text-gray-600 leading-relaxed">
            Ogni pratica è curata da professionisti esperti. Ti seguiamo in ogni fase, con un metodo collaudato e la massima trasparenza.
          </p>
        </div>

        <div className="flex flex-wrap justify-center gap-3 mb-14">
          {tabs.map(tab => {
            const Icon = tab.icon;
            const isActive = activeTab === tab.key;
            return (
              <button
                key={tab.key}
                onClick={() => setActiveTab(tab.key)}
                className={`group flex items-center gap-3 px-6 py-3.5 rounded-2xl text-sm font-bold transition-all duration-300 ${
                  isActive
                    ? 'bg-brand-blu text-white shadow-xl shadow-brand-blu/25 scale-105'
                    : 'bg-white text-gray-600 border border-slate-200/60 hover:border-brand-blu/30 hover:text-brand-blu hover:shadow-md'
                }`}
              >
                <div className={`w-9 h-9 rounded-xl flex items-center justify-center transition-all duration-300 ${
                  isActive ? 'bg-white/20' : 'bg-brand-blu/10 group-hover:bg-brand-blu/20'
                }`}>
                  <Icon size={18} className={isActive ? 'text-white' : 'text-brand-blu'} />
                </div>
                <div className="text-left">
                  <div>{tab.label}</div>
                  <div className={`text-[10px] font-normal ${isActive ? 'text-white/70' : 'text-gray-400'}`}>{tab.desc}</div>
                </div>
              </button>
            );
          })}
        </div>

        <div className="max-w-4xl mx-auto mb-12">
          <p className="text-base text-gray-600 leading-relaxed text-center italic border-l-4 border-brand-blu/30 pl-6 py-2 bg-brand-blu/[0.02] rounded-r-2xl">
            {categoriaCorrente.descrizione}
          </p>
        </div>

        <div className="space-y-6">
          {categoriaCorrente.servizi.map(servizio => (
            <ServiceCard key={servizio.id} servizio={servizio} onBook={handleBook} />
          ))}
          <AltroCard categoria={activeTab} onBook={handleBook} />
        </div>

        <div className="mt-14 text-center">
          <p className="text-sm text-gray-500 mb-5">
            Tutti i servizi si svolgono <strong>in modalità telematica su Google Meet</strong> oppure <strong>in presenza presso la nostra sede</strong>.
          </p>
          <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
            <button
              onClick={() => handleBook('')}
              className="inline-flex items-center gap-2 bg-gradient-to-r from-brand-blu to-brand-verde text-white px-10 py-4 rounded-2xl font-bold hover:opacity-90 transition-all duration-300 shadow-xl hover:shadow-2xl transform hover:-translate-y-0.5 text-base"
            >
              <Zap size={20} />
              Prenota una Consulenza
            </button>
            <span className="text-sm text-gray-400">o chiamaci al <a href="tel:3889711647" className="text-brand-blu font-semibold hover:underline">388 971 1647</a></span>
          </div>
        </div>
      </div>

      {showBooking && <BookingModal onClose={() => setShowBooking(false)} initialServiceId={bookingServiceId} />}
    </section>
  );
}
