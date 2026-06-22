import Hero from '../components/Hero';
import PunteggioGPS from '../components/PunteggioGPS';
import AssistantsAI from '../components/AssistantsAI';
import NormativeDocuments from '../components/NormativeDocuments';
import News from '../components/News';
import Deadlines from '../components/Deadlines';
import FAQ from '../components/FAQ';

export default function HomePage() {
  return (
    <main>
      <Hero />
      <PunteggioGPS />
      <AssistantsAI />
      <NormativeDocuments />
      <News />
      <Deadlines />
      <FAQ />
    </main>
  );
}
