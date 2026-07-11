import { useState, useEffect } from 'react';
import { useLocation } from 'react-router-dom';
import NewsletterForm from '../components/ui/news/NewsletterForm';
import Hero from '../components/ui/layout/Hero';
import PunteggioGPS from '../components/ui/simulators/PunteggioGPS';
import ServiziGrid from '../components/ui/services/ServiziGrid';
import AssistantsAI from '../components/intelligence/AssistantsAI';
import CentroInterpelli from '../components/ui/interpelli/CentroInterpelli';
import NormativeDocuments from '../components/knowledge/NormativeDocuments';
import UniversitaHub from '../components/ui/services/UniversitaHub';
import NewsHub from '../components/ui/news/NewsHub';
import FAQ from '../components/knowledge/FAQ';
import Contact from '../components/ui/services/Contact';
import LoginModal from '../components/foundation/LoginModal';

export default function HomePage() {
  const location = useLocation();
  const [showLogin, setShowLogin] = useState(false);

  useEffect(() => {
    const state = location.state as { showLogin?: boolean } | null;
    if (state?.showLogin) {
      setShowLogin(true);
      window.history.replaceState({}, '', window.location.pathname);
    }
  }, [location.state]);

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
      <UniversitaHub />
      <NewsHub />
      <FAQ />
      <Contact />
      {showLogin && <LoginModal onClose={() => setShowLogin(false)} />}
    </main>
  );
}
