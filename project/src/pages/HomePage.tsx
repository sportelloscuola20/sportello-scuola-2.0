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
      <section className="bg-[#0F172A] py-4">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-3">
            <div className="md:text-left">
              <h2 className="text-white text-lg font-bold">
                Iscriviti alla Newsletter di Sportello Scuola
              </h2>
              <p className="text-gray-400 text-xs mt-1">
                Ricevi ogni luned&igrave; il report con le scadenze GPS, ATA e concorsi. Rimani sempre informato.
              </p>
            </div>
            <div className="w-full md:w-auto md:min-w-[420px]">
              <NewsletterForm />
            </div>
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
