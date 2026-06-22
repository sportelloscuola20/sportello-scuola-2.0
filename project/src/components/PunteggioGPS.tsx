import { Calculator, Trophy, Briefcase, ClipboardList } from 'lucide-react';
import { Link } from 'react-router-dom';

export default function PunteggioGPS() {
  return (
    <section id="calcolo-punteggio" className="py-20 bg-gray-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-6">
          <h2 className="text-4xl font-extrabold text-brand-blu mb-4 tracking-tight">
            Calcolo Punteggio
          </h2>
          <p className="text-gray-600 font-normal max-w-2xl mx-auto">
            Simula il tuo posizionamento nelle graduatorie provinciali e d'istituto con l'algoritmo aggiornato ai decreti ministeriali vigenti.
          </p>
        </div>

        <div className="grid gap-8 md:grid-cols-2 mt-12">
          <div className="bg-white p-8 rounded-2xl shadow-md hover:shadow-lg transition-all border border-gray-100">
            <div className="flex items-center mb-4">
              <div className="w-12 h-12 bg-brand-blu/10 rounded-xl flex items-center justify-center mr-4">
                <Calculator className="h-6 w-6 text-brand-blu" />
              </div>
              <h3 className="text-xl font-bold text-brand-blu">Punteggio GPS</h3>
            </div>
            <p className="text-gray-600 mb-6 text-sm leading-relaxed">
              Calcola il tuo punteggio per le Graduatorie Provinciali per le Supplenze (GPS) considerando titoli di servizio, certificazioni linguistiche, informatiche e altri titoli valutabili secondo le Tabelle A/1-A/10.
            </p>
            <Link
              to="/calcolo-punteggio"
              className="inline-flex items-center gap-2 text-brand-verde font-semibold hover:text-brand-verde/80 transition-colors text-sm"
            >
              Calcola il tuo punteggio GPS →
            </Link>
          </div>

          <div className="bg-white p-8 rounded-2xl shadow-md hover:shadow-lg transition-all border border-gray-100">
            <div className="flex items-center mb-4">
              <div className="w-12 h-12 bg-brand-verde/10 rounded-xl flex items-center justify-center mr-4">
                <Briefcase className="h-6 w-6 text-brand-verde" />
              </div>
              <h3 className="text-xl font-bold text-brand-verde">Punteggio ATA</h3>
            </div>
            <p className="text-gray-600 mb-6 text-sm leading-relaxed">
              Calcola il tuo punteggio per le graduatorie del Personale ATA considerando titoli di servizio, titoli culturali, certificazioni informatiche e altri requisiti specifici per ogni profilo professionale (D.M. 89/2024).
            </p>
            <Link
              to="/calcolo-punteggio"
              className="inline-flex items-center gap-2 text-brand-verde font-semibold hover:text-brand-verde/80 transition-colors text-sm"
            >
              Calcola il tuo punteggio ATA →
            </Link>
          </div>
        </div>

        <div className="mt-16">
          <h3 className="text-3xl font-extrabold text-center mb-3 text-brand-blu">
            Come funziona
          </h3>
          <p className="text-center text-gray-600 font-normal max-w-2xl mx-auto mb-10">
            Guida passo-passo per utilizzare i servizi dello Sportello e ottimizzare la tua domanda.
          </p>
          <div className="grid gap-6 md:grid-cols-3 text-center">
            <div className="bg-white rounded-2xl p-8 border border-gray-100 shadow-sm">
              <div className="w-14 h-14 bg-brand-blu/10 rounded-2xl flex items-center justify-center mx-auto mb-4">
                <ClipboardList className="h-7 w-7 text-brand-blu" />
              </div>
              <h4 className="font-bold text-gray-800 mb-2">Inserisci i dati</h4>
              <p className="text-gray-600 text-sm">Compila i campi con i tuoi titoli di servizio, formazione e certificazioni.</p>
            </div>
            <div className="bg-white rounded-2xl p-8 border border-gray-100 shadow-sm">
              <div className="w-14 h-14 bg-brand-verde/10 rounded-2xl flex items-center justify-center mx-auto mb-4">
                <Calculator className="h-7 w-7 text-brand-verde" />
              </div>
              <h4 className="font-bold text-gray-800 mb-2">Calcolo automatico</h4>
              <p className="text-gray-600 text-sm">Il sistema applica le tabelle di valutazione aggiornate e calcola il tuo punteggio totale.</p>
            </div>
            <div className="bg-white rounded-2xl p-8 border border-gray-100 shadow-sm">
              <div className="w-14 h-14 bg-brand-ottanio/10 rounded-2xl flex items-center justify-center mx-auto mb-4">
                <Trophy className="h-7 w-7 text-brand-ottanio" />
              </div>
              <h4 className="font-bold text-gray-800 mb-2">Risultato immediato</h4>
              <p className="text-gray-600 text-sm">Ottieni il tuo punteggio dettagliato e scopri come migliorarlo per le prossime graduatorie.</p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
