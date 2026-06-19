import { Routes, Route } from 'react-router-dom';
import Header from './components/Header';
import Hero from './components/Hero';
import PlatformUsers from './components/PlatformUsers';
import AssistantsAI from './components/AssistantsAI';
import PunteggioGPS from './components/PunteggioGPS';
import NormativeDocuments from './components/NormativeDocuments';
import News from './components/News';
import Deadlines from './components/Deadlines';
import FAQ from './components/FAQ';
import Contact from './components/Contact';
import Footer from './components/Footer';
import Breadcrumb from './components/Breadcrumb';
import HomePage from './pages/HomePage';
import AssistantPage from './pages/AssistantPage';
import ScorePage from './pages/ScorePage';
import NormativePage from './pages/NormativePage';
import NewsPage from './pages/NewsPage';
import DeadlinesPage from './pages/DeadlinesPage';
import FAQPage from './pages/FAQPage';
import ContactPage from './pages/ContactPage';

function App() {
  return (
    <div className="min-h-screen">
      <Header />
      <Breadcrumb />
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/assistente/*" element={<AssistantPage />} />
        <Route path="/calcolo-punteggio" element={<ScorePage />} />
        <Route path="/normative" element={<NormativePage />} />
        <Route path="/notizie" element={<NewsPage />} />
        <Route path="/scadenze" element={<DeadlinesPage />} />
        <Route path="/faq" element={<FAQPage />} />
        <Route path="/contatti" element={<ContactPage />} />
      </Routes>
      <Footer />
    </div>
  );
}

export default App;