import { User, Briefcase, ShieldCheck } from 'lucide-react';

export default function PlatformUsers() {
  return (
    <section id="platform-users" className="py-16 bg-gray-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <h2 className="text-3xl font-bold text-center mb-12 text-gray-800">
          Per chi è la piattaforma
        </h2>

        <div className="grid gap-8 md:grid-cols-3">
          {/* Docenti */}
          <div className="bg-white p-6 rounded-lg shadow-md hover:shadow-lg transition-shadow">
            <div className="flex items-center mb-4">
              <User className="h-8 w-8 text-indigo-600 mr-3" />
              <h3 className="text-xl font-semibold text-gray-800">Docenti</h3>
            </div>
            <p className="text-gray-600 mb-4">
              Supporto completo per la carriera docente: GPS, GAE, GI, supplenze, UDA, PEI, PDP, BES, DSA e molto altro.
            </p>
          </div>

          {/* ATA */}
          <div className="bg-white p-6 rounded-lg shadow-md hover:shadow-lg transition-shadow">
            <div className="flex items-center mb-4">
              <Briefcase className="h-8 w-8 text-indigo-600 mr-3" />
              <h3 className="text-xl font-semibold text-gray-800">Personale ATA</h3>
            </div>
            <p className="text-gray-600 mb-4">
              Assistenza specifica per il personale amministrativo, tecnico e ausiliario: graduatorie, punteggi, contratti, mobilità e segreteria.
            </p>
          </div>

          {/* Dirigenti */}
          <div className="bg-white p-6 rounded-lg shadow-md hover:shadow-lg transition-shadow">
            <div className="flex items-center mb-4">
              <ShieldCheck className="h-8 w-8 text-indigo-600 mr-3" />
              <h3 className="text-xl font-semibold text-gray-800">Dirigenti Scolastici</h3>
            </div>
            <p className="text-gray-600 mb-4">
              Strumenti per la gestione scolastica: normativa, personale, privacy, sicurezza e nomine.
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}