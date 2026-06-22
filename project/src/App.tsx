import { useEffect } from 'react';
import { Routes, Route, useLocation } from 'react-router-dom';
import { AuthProvider } from './components/Auth/AuthContext';
import Header from './components/Header';
import Footer from './components/Footer';
import Breadcrumb from './components/Breadcrumb';
import HomePage from './pages/HomePage';
import AssistantPage from './pages/AssistantPage';
import ScorePage from './pages/ScorePage';
import NormativePage from './pages/NormativePage';
import NewsPage from './pages/NewsPage';
import FAQPage from './pages/FAQPage';
import ContactPage from './pages/ContactPage';
import ServicesPage from './pages/ServicesPage';
import InterpelliPage from './pages/InterpelliPage';

function ScrollToTop() {
  const { pathname } = useLocation();
  useEffect(() => { window.scrollTo(0, 0); }, [pathname]);
  return null;
}

function App() {
  return (
    <AuthProvider>
      <div className="min-h-screen bg-surface">
        <ScrollToTop />
        <Header />
        <div className="pt-20">
          <Breadcrumb />
          <Routes>
            <Route path="/" element={<HomePage />} />
            <Route path="/assistente/*" element={<AssistantPage />} />
            <Route path="/sindacalista-ai" element={<AssistantPage />} />
            <Route path="/calcolo-punteggio" element={<ScorePage />} />
            <Route path="/normative" element={<NormativePage />} />
            <Route path="/notizie-scadenze" element={<NewsPage />} />
            <Route path="/faq" element={<FAQPage />} />
            <Route path="/contatti" element={<ContactPage />} />
            <Route path="/servizi" element={<ServicesPage />} />
            <Route path="/interpelli" element={<InterpelliPage />} />
          </Routes>
        </div>
        <Footer />
      </div>
    </AuthProvider>
  );
}

export default App;
