import { Calculator, Trophy, Briefcase, ClipboardList } from 'lucide-react';

export default function PunteggioGPS() {
  return (
    <section id="calcolo-punteggio" className="py-16 bg-gray-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <h2 className="text-3xl font-bold text-center mb-12 text-gray-800">
          Calcolo Punteggio
        </h2>
        <p className="text-center text-gray-600 mb-12 max-w-2xl mx-auto">
          Calcola rapidamente il tuo punteggio per le graduatorie GPS e ATA con il nostro strumento aggiornato alle ultime tabelle di valutazione.
        </p>

        <div className="grid gap-8 md:grid-cols-2">
          {/* GPS */}
          <div className="bg-white p-6 rounded-lg shadow-md hover:shadow-lg transition-shadow">
            <div className="flex items-center mb-4">
              <Calculator className="h-6 w-6 text-indigo-600 mr-3" />
              <h3 className="text-xl font-semibold text-gray-800">Punteggio GPS</h3>
            </div>
            <p className="text-gray-600 mb-4">
              Calcola il tuo punteggio per le Graduatorie Provinciali per le Supplenze (GPS) considerando titoli di servizio, certificazioni linguistiche, informatiche e altri titoli valutabili.
            </p>
            <a href="#" className="text-indigo-600 font-medium hover:text-indigo-800 transition-colors">
              Calcola il tuo punteggio GPS →
            </a>
          </div>

          {/* ATA */}
          <div className="bg-white p-6 rounded-lg shadow-md hover:shadow-lg transition-shadow">
            <div className="flex items-center mb-4">
              <Briefcase className="h-6 w-6 text-indigo-600 mr-3" />
              <h3 className="text-xl font-semibold text-gray-800">Punteggio ATA</h3>
            </div>
            <p className="text-gray-600 mb-4">
              Calcola il tuo punteggio per le graduatorie del Personale ATA considerando titoli di servizio, titoli culturali, certificazioni informatiche e altri requisiti specifici per ogni profilo.
            </p>
            <a href="#" className="text-indigo-600 font-medium hover:text-indigo-800 transition-colors">
              Calcola il tuo punteggio ATA →
            </a>
          </div>
        </div>

        {/* Come funziona */}
        <div className="mt-16">
          <h3 className="text-2xl font-bold text-center mb-8 text-gray-800">
            Come funziona
          </h3>
          <div className="grid gap-6 md:grid-cols-3 text-center">
            <div>
              <Trophy className="h-8 w-8 text-indigo-500 mb-3" />
              <h4 className="font-semibold text-gray-800 mb-2">Inserisci i dati</h4>
              <p className="text-gray-600 text-sm">Compila i campi con i tuoi titoli di servizio, formazione e certificazioni.</p>
            </div>
            <div>
              <ClipboardList className="h-8 w-8 text-indigo-500 mb-3" />
              <h4 className="font-semibold text-gray-800 mb-2">Calcolo automatico</h4>
              <p className="text-gray-600 text-sm">Il sistema applica le tabelle di valutazione aggiornate e calcola il tuo punteggio totale.</p>
            </div>
            <div>
              <Briefcase className="h-8 w-8 text-indigo-500 mb-3" />
              <h4 className="font-semibold text-gray-800 mb-2">Risultato immediato</h4>
              <p className="text-gray-600 text-sm">Ottieni il tuo punteggio dettagliato e scopri come migliorarlo per le prossime graduatorie.</p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}