import { useState } from 'react';
import { User, Briefcase, Globe, GraduationCap, FileCheck, MapPin, Building, MessageCircle, HelpCircle, ChevronRight, School, ArrowRight } from 'lucide-react';

type TabKey = 'docenti' | 'ata' | 'generali';

const tabs: { key: TabKey; label: string; icon: typeof User }[] = [
  { key: 'docenti', label: 'Area Docenti', icon: GraduationCap },
  { key: 'ata', label: 'Area ATA', icon: Briefcase },
  { key: 'generali', label: 'Servizi Trasversali', icon: Globe },
];

const servizi: Record<TabKey, { title: string; desc: string; icon: typeof User; items: string[] }[]> = {
  docenti: [
    {
      title: 'Compilazione e Inoltro Domande GPS',
      desc: 'Supporto completo nella scelta delle migliori classi di concorso di riferimento, inserimento ponderato dei titoli di accesso, dei titoli culturali ed artistici per l\'aggiornamento/inserimento nel biennio.',
      icon: FileCheck,
      items: ['Analisi titoli di accesso e classe di concorso', 'Inserimento certificazioni linguistiche CEDILS/C2', 'Caricamento titoli di servizio e culturali', 'Invio telematico tramite POLIS'],
    },
    {
      title: 'Scelta Preferenze 150 Scuole',
      desc: 'Consulenza strategica mirata per la compilazione dell\'istanza di scelta delle sedi e delle istituzioni scolastiche per le supplenze annuali (31 agosto / 30 giugno), ottimizzando le preferenze per massimizzare le probabilità di nomina dall\'algoritmo.',
      icon: MapPin,
      items: ['Analisi storica delle convocazioni per provincia', 'Mappatura scuole con maggiori cattedre disponibili', 'Ottimizzazione ordine preferenze algoritmo GPS', 'Simulazione scenario di nomina'],
    },
    {
      title: 'Assegnazioni Provvisorie e Utilizzazioni',
      desc: 'Gestione e controllo delle procedure di mobilità annuale interprovinciale e provinciale per il ricongiungimento familiare o per utilizzo su posti di sostegno e altra classe di concorso.',
      icon: Building,
      items: ['Verifica requisiti mobilità D.Lgs. 59/2017', 'Compilazione domanda su POLIS', 'Calcolo punteggio mobilità e precedenze', 'Assistenza post-assegnazione'],
    },
    {
      title: 'Invio Interpelli Provinciali e Nazionali',
      desc: 'Predisposizione, redazione e inoltro mirato delle candidature in risposta agli avvisi di selezione (Interpelli) pubblicati dalle scuole e dagli Uffici Scolastici Provinciali in caso di graduatorie esaurite.',
      icon: School,
      items: ['Ricerca interpelli per provincia e classe concorso', 'Predisposizione curriculum e documentazione', 'Invio candidatura tramite PEC o portale', 'Monitoraggio riscontro scuola'],
    },
  ],
  ata: [
    {
      title: 'Inserimento e Aggiornamento 3ª Fascia ATA',
      desc: 'Supporto tecnico e inserimento telematico della domanda per i profili di Assistente Amministrativo, Assistente Tecnico, Collaboratore Scolastico e Operatore Scolastico, inclusa la convalida dei titoli di accesso obbligatori.',
      icon: FileCheck,
      items: ['Riconoscimento titoli di accesso per profilo (AA/AT/CS/OS)', 'Attestazione CIAD obbligatoria', 'Inserimento servizi pregressi e titoli culturali', 'Invio istanza su POLIS entro scadenza'],
    },
    {
      title: 'Graduatoria Permanente ATA 24 Mesi',
      desc: 'Gestione completa, calcolo dei requisiti e inoltro dell\'istanza per l\'accesso ai ruoli provinciali dello Stato (I Fascia) per il personale ATA che ha maturato almeno 24 mesi di servizio effettivo.',
      icon: GraduationCap,
      items: ['Verifica requisito 24 mesi servizio effettivo', 'Calcolo punteggio titoli D.M. 89/2024', 'Compilazione domanda POLIS', 'Assistenza ricorsi e accesso atti'],
    },
    {
      title: 'Assegnazioni Provvisorie e Utilizzazioni ATA',
      desc: 'Assistenza e inoltro guidato della domanda di mobilità annuale dedicata al personale ATA già immesso in ruolo.',
      icon: Building,
      items: ['Analisi requisiti mobilità personale ATA', 'Compilazione domanda su POLIS', 'Calcolo punteggio e priorità sociali', 'Supporto ricongiungimento familiare'],
    },
  ],
  generali: [
    {
      title: 'Revisione e Check Pratiche Già Compilate',
      desc: 'Analisi minuziosa e controllo incrociato delle istanze già inoltrate autonomamente dall\'utente per rilevare errori materiali, omissioni di titoli valutabili o dichiarazioni di servizio errate.',
      icon: FileCheck,
      items: ['Audit completo della domanda presentata', 'Verifica corrispondenza titoli dichiarati/posseduti', 'Report errori e omissioni da correggere', 'Assistenza rettifica su POLIS'],
    },
    {
      title: 'Consulenza via Chat per Chiarimenti Rapidi',
      desc: 'Attivazione di un canale di messaggistica diretto, sincrono e prioritario per la risoluzione istantanea di quesiti contrattuali rapidi, scadenze o dubbi veloci sulla compilazione.',
      icon: MessageCircle,
      items: ['Chat 1:1 con consulente specializzato', 'Risposta entro 60 minuti in orario d\'ufficio', 'Archivio storico della consulenza', 'Riferimenti normativi allegati'],
    },
    {
      title: 'Assistenza Tecnica su Casi Specifici o Dubbi Complessi',
      desc: 'Sessione d\'esame e consulenza approfondita per casistiche particolari: gestione ricorsi, sanzioni da rinuncia o abbandono supplenza, calcolo congedi e maternità, superamento anno di prova.',
      icon: HelpCircle,
      items: ['Analisi normativa personalizzata', 'Ricorsi avverso punteggio errato', 'Calcolo congedi maternità e permessi 150 ore', 'Gestione anno di prova e riserve di legge'],
    },
  ],
};

export default function ServiziGrid() {
  const [activeTab, setActiveTab] = useState<TabKey>('docenti');

  return (
    <section id="servizi" className="py-20 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-4">
          <h2 className="text-4xl font-extrabold text-[#0F172A] mb-4 tracking-tight">
            I Nostri Servizi Professionali
          </h2>
          <p className="text-gray-600 font-normal max-w-3xl mx-auto">
            Consulenza specialistica per Docenti, Personale ATA e professionisti della scuola. 
            Tutti i servizi si svolgono <strong>in modalità telematica su Google Meet</strong> oppure <strong>in presenza presso la nostra Sede</strong>.
          </p>
        </div>

        <div className="flex justify-center gap-2 mt-10 mb-10">
          {tabs.map(tab => (
            <button
              key={tab.key}
              onClick={() => setActiveTab(tab.key)}
              className={`flex items-center gap-2 px-6 py-3 rounded-2xl text-sm font-bold transition-all duration-300 ${
                activeTab === tab.key
                  ? 'bg-brand-blu text-white shadow-lg shadow-brand-blu/20'
                  : 'bg-white text-gray-600 border border-slate-200/60 hover:border-brand-blu/30 hover:text-brand-blu'
              }`}
            >
              <tab.icon size={18} />
              {tab.label}
            </button>
          ))}
        </div>

        <div className="grid md:grid-cols-2 gap-6">
          {servizi[activeTab].map((srv, i) => (
            <div
              key={i}
              className="group bg-white/70 backdrop-blur-md rounded-3xl p-6 border border-slate-200/60 shadow-soft hover:shadow-medium hover:border-brand-blu/30 transition-all duration-300"
            >
              <div className="flex items-start gap-4">
                <div className="w-12 h-12 bg-brand-blu/10 rounded-2xl flex items-center justify-center flex-shrink-0 mt-1">
                  <srv.icon className="w-6 h-6 text-brand-blu" />
                </div>
                <div className="flex-1">
                  <h3 className="text-lg font-bold text-[#0F172A] mb-2">{srv.title}</h3>
                  <p className="text-gray-600 text-sm leading-relaxed mb-4">{srv.desc}</p>
                  <ul className="space-y-2">
                    {srv.items.map((item, j) => (
                      <li key={j} className="flex items-start gap-2 text-sm text-gray-600">
                        <ChevronRight size={14} className="text-brand-verde mt-0.5 flex-shrink-0" />
                        {item}
                      </li>
                    ))}
                  </ul>
                </div>
              </div>
            </div>
          ))}
        </div>

        <div className="mt-10 text-center">
          <a
            href="mailto:sportelloscuola2.0@gmail.com?subject=Richiesta%20Consulenza&body=Salve,%20vorrei%20prenotare%20una%20consulenza%20per%20il%20seguente%20servizio:%20"
            className="inline-flex items-center gap-2 bg-brand-verde text-white px-8 py-4 rounded-2xl font-bold hover:bg-brand-verde/90 transition-all duration-300 shadow-lg hover:shadow-xl transform hover:-translate-y-0.5"
          >
            <ArrowRight size={20} />
            Prenota una Consulenza
          </a>
          <p className="text-xs text-gray-400 mt-3">
            Oppure contattaci al <a href="tel:3889711647" className="text-brand-blu font-medium">388 971 1647</a> / <a href="tel:3346170986" className="text-brand-blu font-medium">334 617 0986</a>
          </p>
        </div>
      </div>
    </section>
  );
}
