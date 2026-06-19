import Hero from '../components/Hero';
import PlatformUsers from '../components/PlatformUsers';
import AssistantsAI from '../components/AssistantsAI';
import PunteggioGPS from '../components/PunteggioGPS';
import NormativeDocuments from '../components/NormativeDocuments';
import News from '../components/News';
import Deadlines from '../components/Deadlines';
import FAQ from '../components/FAQ';
import Contact from '../components/Contact';

export default function HomePage() {
  return (
    <>
      <Hero />
      <PlatformUsers />
      <AssistantsAI />
      <PunteggioGPS />
      <NormativeDocuments />
      <News />
      <Deadlines />
      <FAQ />
      <Contact />
    </>
  );
}