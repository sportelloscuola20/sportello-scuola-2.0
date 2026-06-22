import NewsletterForm from '../components/NewsletterForm';
import Hero from '../components/Hero';
import PunteggioGPS from '../components/PunteggioGPS';
import ServiziGrid from '../components/ServiziGrid';
import AssistantsAI from '../components/AssistantsAI';
import CentroInterpelli from '../components/CentroInterpelli';
import NormativeDocuments from '../components/NormativeDocuments';
import News from '../components/News';
import Deadlines from '../components/Deadlines';
import FAQ from '../components/FAQ';
import Contact from '../components/Contact';

export default function HomePage() {
  return (
    <main>
      <section className="bg-[#0F172A] py-6">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-white text-xl font-bold mb-2">
            Resta aggiornato su scadenze e novità
          </h2>
          <p className="text-gray-400 text-sm mb-4 max-w-xl mx-auto">
            Ricevi ogni lunedì il report con le scadenze ministeriali e le ultime notizie dal mondo della scuola.
          </p>
          <div className="max-w-md mx-auto">
            <NewsletterForm />
          </div>
        </div>
      </section>
      <Hero />
      <PunteggioGPS />
      <ServiziGrid />
      <AssistantsAI />
      <CentroInterpelli />
      <NormativeDocuments />
      <News />
      <Deadlines />
      <FAQ />
      <Contact />
    </main>
  );
}
