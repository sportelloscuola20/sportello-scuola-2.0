import { useState } from 'react';
import { ChevronDown } from 'lucide-react';

export default function FAQ() {
  const [openId, setOpenId] = useState<number | null>(null);

  const faqItems = [
    {
      id: 1,
      question: "Cos'è Sportello Scuola 2.0?",
      answer: "Sportello Scuola 2.0 è la piattaforma AI specializzata per Docenti, ATA e Dirigenti scolastici. Offre assistenti AI, calcolo punteggi GPS/ATA, normative aggiornate e supporto professionale 24/7.",
    },
    {
      id: 2,
      question: "Come funziona l'Assistente AI?",
      answer: "L'Assistente AI utilizza modelli linguistici avanzati addestrati su normative scolastiche, procedure amministrative e best practice didattiche. Fornisce risposte con fonti citate e supporto personalizzato per ogni ruolo scolastico.",
    },
    {
      id: 3,
      question: "Il calcolo del punteggio GPS è affidabile?",
      answer: "Sì, il nostro strumento di calcolo punteggio GPS e ATA è aggiornato alle ultime tabelle di valutazione ministeriali e segue rigorosamente i parametri ufficiali per garantire risultati precisi.",
    },
    {
      id: 4,
      question: "Quali normative sono disponibili sulla piattaforma?",
      answer: "Troverai CCNL Scuola, ordinanze ministeriali, decreti, linee guida su inclusione (BES, DSA, PEI, PDP), guide per GPS e ATA, nonché materiale contrattuale e sulle nomine.",
    },
    {
      id: 5,
      question: "La piattaforma è gratuita?",
      answer: "Offriamo un piano gratuito con accesso alle funzionalità di base e piani premium per assistenti AI avanzati, calcolo punteggi illimitato e accesso completo alle normative aggiornate.",
    },
  ];

  return (
    <section id="faq" className="py-16 bg-gray-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <h2 className="text-3xl font-bold text-center mb-12 text-gray-800">
          Domande Frequenti
        </h2>
        <p className="text-center text-gray-600 mb-16 max-w-2xl mx-auto">
          Trova risposte rapide alle domande più comuni sulla nostra piattaforma AI per la scuola.
        </p>

        <div className="max-w-3xl mx-auto space-y-4">
          {faqItems.map((faq) => {
            const isOpen = openId === faq.id;
            return (
              <div
                key={faq.id}
                className="bg-white rounded-2xl shadow-md hover:shadow-lg transition-shadow overflow-hidden"
              >
                <button
                  onClick={() => setOpenId(isOpen ? null : faq.id)}
                  className="w-full flex items-center justify-between p-6 text-left"
                >
                  <h3 className="text-lg font-semibold text-gray-800 pr-4">{faq.question}</h3>
                  <ChevronDown
                    size={20}
                    className={`text-indigo-500 flex-shrink-0 transition-transform duration-300 ${isOpen ? 'rotate-180' : ''}`}
                  />
                </button>
                <div
                  className="overflow-hidden transition-all duration-300 ease-in-out"
                  style={{ maxHeight: isOpen ? '300px' : '0' }}
                >
                  <div className="px-6 pb-6 pt-0 border-t border-gray-100">
                    <p className="text-gray-600 leading-relaxed mt-4">{faq.answer}</p>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
