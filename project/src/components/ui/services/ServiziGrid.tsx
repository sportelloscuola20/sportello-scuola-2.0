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
    <div className="group bg-white rounded-2xl border border-slate-200/60 shadow-soft hover:shadow-md hover:border-brand-blu/20 transition-all overflow-hidden">
      <div className="p-5 sm:p-6">
        <div className="flex items-start gap-4">
          <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-brand-blu to-brand-blu/80 flex items-center justify-center flex-shrink-0 shadow-sm">
            <Icon className="w-5 h-5 text-white" />
          </div>
          <div className="flex-1 min-w-0">
            <div className="flex items-center justify-between gap-3">
              <h3 className="text-base font-bold text-[#0F172A] leading-tight">{servizio.titolo}</h3>
              {servizio.evidenza && (
                <span className="inline-flex items-center gap-1 text-[10px] font-semibold text-brand-verde bg-brand-verde/10 px-2 py-0.5 rounded-full whitespace-nowrap">
                  <Sparkles size={10} /> {servizio.evidenza}
                </span>
              )}
            </div>
            <p className="mt-1.5 text-sm font-semibold text-brand-blu">{servizio.valore}</p>
            <p className="mt-1 text-xs text-gray-500 leading-relaxed line-clamp-2">{servizio.descrizione}</p>
            {servizio.dettagli.length > 0 && (
              <ul className="mt-2.5 flex flex-wrap gap-x-3 gap-y-1">
                {servizio.dettagli.map((d, i) => (
                  <li key={i} className="flex items-center gap-1.5 text-[11px] text-gray-500">
                    <CheckCircle size={11} className="text-brand-verde flex-shrink-0" />
                    {d}
                  </li>
                ))}
              </ul>
            )}
            <div className="mt-3 flex items-center gap-3">
              <button onClick={() => onBook(servizio.id)} className="inline-flex items-center gap-1.5 bg-brand-verde text-white px-4 py-1.5 rounded-lg text-xs font-bold hover:bg-brand-verde/90 transition shadow-sm hover:shadow-md">
                Prenota <ArrowRight size={13} />
              </button>
              <span className="text-xs font-bold text-gray-400">{servizio.prezzo > 0 ? `da €${servizio.prezzo}` : 'Prezzo da concordare'}</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

function AltroCard({ categoria, onBook }: { categoria: CategoriaServizio; onBook: (id: string) => void }) {
  const labels: Record<CategoriaServizio, { title: string; desc: string }> = {
    docenti: { title: 'Hai un\'esigenza diversa?', desc: 'Raccontaci la tua situazione: ti proporremo un percorso su misura.' },
    ata: { title: 'Non trovi il servizio che cerchi?', desc: 'Descrivici il tuo caso, troveremo la soluzione giusta.' },
    generali: { title: 'Il tuo caso non rientra in queste categorie?', desc: 'Parlaci del tuo bisogno, ti risponderemo con una proposta chiara.' },
  };
  const l = labels[categoria];
  return (
    <div className="bg-gradient-to-br from-amber-50 to-orange-50/50 rounded-2xl border border-amber-200/60 p-5 flex items-start gap-4">
      <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-amber-500 to-orange-500 flex items-center justify-center flex-shrink-0 shadow-sm">
        <MessageSquare className="w-5 h-5 text-white" />
      </div>
      <div className="flex-1">
        <h3 className="text-base font-bold text-[#0F172A]">{l.title}</h3>
        <p className="mt-1 text-xs text-gray-600">{l.desc}</p>
        <button onClick={() => onBook('altro-' + categoria)} className="mt-2.5 inline-flex items-center gap-1.5 bg-amber-500 text-white px-4 py-1.5 rounded-lg text-xs font-bold hover:bg-amber-600 transition shadow-sm">
          Racconta la tua situazione <ArrowRight size={13} />
        </button>
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
    <section id="i-nostri-servizi-professionali" className="py-12 sm:py-16 bg-white">
      <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center max-w-3xl mx-auto mb-8">
          <div className="inline-flex items-center gap-2 bg-brand-blu/10 text-brand-blu text-xs font-bold px-4 py-1.5 rounded-full mb-3">
            <Zap size={14} />
            CONSULENZA SPECIALISTICA
          </div>
          <h2 className="text-3xl sm:text-4xl font-extrabold text-[#0F172A] mb-3 tracking-tight leading-tight">
            I Nostri Servizi
          </h2>
          <p className="text-base text-gray-600">
            Consulenze specialistiche per il personale scolastico. Ogni pratica è curata da professionisti esperti.
          </p>
        </div>

        <div className="flex flex-wrap justify-center gap-2 mb-8">
          {tabs.map(tab => {
            const Icon = tab.icon;
            const isActive = activeTab === tab.key;
            return (
              <button
                key={tab.key}
                onClick={() => setActiveTab(tab.key)}
                className={`group flex items-center gap-2.5 px-5 py-2.5 rounded-xl text-sm font-bold transition-all duration-300 ${
                  isActive
                    ? 'bg-brand-blu text-white shadow-lg shadow-brand-blu/25'
                    : 'bg-white text-gray-600 border border-slate-200/60 hover:border-brand-blu/30 hover:text-brand-blu hover:shadow-sm'
                }`}
              >
                <Icon size={16} className={isActive ? 'text-white' : 'text-brand-blu'} />
                <span>{tab.label}</span>
              </button>
            );
          })}
        </div>

        <div className="max-w-3xl mx-auto mb-8">
          <p className="text-sm text-gray-600 text-center italic border-l-4 border-brand-blu/30 pl-4 py-1.5 bg-brand-blu/[0.02] rounded-r-xl">
            {categoriaCorrente.descrizione}
          </p>
        </div>

        <div className="space-y-3">
          {categoriaCorrente.servizi.map(servizio => (
            <ServiceCard key={servizio.id} servizio={servizio} onBook={handleBook} />
          ))}
          <AltroCard categoria={activeTab} onBook={handleBook} />
        </div>

        <div className="mt-10 text-center">
          <p className="text-xs text-gray-500 mb-3">
            Modalità: <strong>telematica su Google Meet</strong> o <strong>in presenza</strong>
          </p>
          <div className="flex items-center justify-center gap-3">
            <button
              onClick={() => handleBook('')}
              className="inline-flex items-center gap-2 bg-gradient-to-r from-brand-blu to-brand-verde text-white px-6 py-2.5 rounded-xl font-bold hover:opacity-90 transition shadow-lg text-sm"
            >
              <Zap size={16} /> Prenota Consulenza
            </button>
            <span className="text-xs text-gray-400">oppure chiama <a href="tel:3889711647" className="text-brand-blu font-semibold hover:underline">388 971 1647</a></span>
          </div>
        </div>
      </div>

      {showBooking && <BookingModal onClose={() => setShowBooking(false)} initialServiceId={bookingServiceId} />}
    </section>
  );
}
