import { useEffect } from 'react';
import { Routes, Route, useLocation } from 'react-router-dom';
import { QueryClientProvider } from '@tanstack/react-query';
import { AuthProvider } from './components/Auth/AuthContext';
import { queryClient } from './lib/queryClient';
import Header from './components/Header';
import Footer from './components/Footer';
import Breadcrumb from './components/Breadcrumb';
import HomePage from './pages/HomePage';
import AssistantPage from './pages/AssistantPage';
import ScorePage from './pages/ScorePage';
import NormativePage from './pages/NormativePage';
import NormativeEDocumentiPage from './pages/NormativeEDocumentiPage';
import NewsPage from './pages/NewsPage';
import ArchivePage from './pages/ArchivePage';
import FAQPage from './pages/FAQPage';
import ContactPage from './pages/ContactPage';
import ServicesPage from './pages/ServicesPage';
import InterpelliPage from './pages/InterpelliPage';
import AreaRiservataLayout from './components/AreaRiservata/AreaRiservataLayout';
import AreaRiservataPage from './pages/AreaRiservataPage';
import ScorePageAR from './pages/ScorePageAR';
import BookmarksPageAR from './pages/BookmarksPageAR';
import DocumentsPageAR from './pages/DocumentsPageAR';
import BandiPageAR from './pages/BandiPageAR';
import SubscriptionPageAR from './pages/SubscriptionPageAR';
import SettingsPageAR from './pages/SettingsPageAR';

function ScrollToTop() {
  const { pathname } = useLocation();
  useEffect(() => { window.scrollTo(0, 0); }, [pathname]);
  return null;
}

function App() {
  return (
    <QueryClientProvider client={queryClient}>
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
              <Route path="/normative-e-documenti" element={<NormativeEDocumentiPage />} />
              <Route path="/notizie-scadenze" element={<NewsPage />} />
              <Route path="/notizie-scadenze/archivio" element={<ArchivePage />} />
              <Route path="/faq" element={<FAQPage />} />
              <Route path="/contatti" element={<ContactPage />} />
              <Route path="/servizi" element={<ServicesPage />} />
              <Route path="/interpelli" element={<InterpelliPage />} />
              <Route path="/area-riservata" element={<AreaRiservataLayout><AreaRiservataPage /></AreaRiservataLayout>} />
              <Route path="/area-riservata/punteggi" element={<AreaRiservataLayout><ScorePageAR /></AreaRiservataLayout>} />
              <Route path="/area-riservata/preferiti" element={<AreaRiservataLayout><BookmarksPageAR /></AreaRiservataLayout>} />
              <Route path="/area-riservata/documenti" element={<AreaRiservataLayout><DocumentsPageAR /></AreaRiservataLayout>} />
              <Route path="/area-riservata/bandi" element={<AreaRiservataLayout><BandiPageAR /></AreaRiservataLayout>} />
              <Route path="/area-riservata/abbonamento" element={<AreaRiservataLayout><SubscriptionPageAR /></AreaRiservataLayout>} />
              <Route path="/area-riservata/impostazioni" element={<AreaRiservataLayout><SettingsPageAR /></AreaRiservataLayout>} />
            </Routes>
          </div>
          <Footer />
        </div>
      </AuthProvider>
    </QueryClientProvider>
  );
}

export default App;
