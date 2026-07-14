import { Suspense, lazy, useEffect, useState } from 'react';
import { Routes, Route, useLocation } from 'react-router-dom';
import { QueryClientProvider } from '@tanstack/react-query';
import { AuthProvider } from './components/foundation/AuthContext';
import { queryClient } from './lib/queryClient';
import { trackPageView } from './lib/analytics';
import { initBollettiniData } from './data/bollettini-nomine';
import Header from './components/ui/layout/Header';
import Footer from './components/ui/layout/Footer';
import Breadcrumb from './components/ui/layout/Breadcrumb';
const GlobalSearch = lazy(() => import('./components/ui/layout/GlobalSearch'));
import AreaRiservataLayout from './components/AreaRiservata/AreaRiservataLayout';

const HomePage = lazy(() => import('./pages/HomePage'));
const AssistantPage = lazy(() => import('./pages/AssistantPage'));
const ScorePage = lazy(() => import('./pages/ScorePage'));
const NormativePage = lazy(() => import('./pages/NormativePage'));
const NormativeEDocumentiPage = lazy(() => import('./pages/NormativeEDocumentiPage'));
const NewsPage = lazy(() => import('./pages/NewsPage'));
const ArchivePage = lazy(() => import('./pages/ArchivePage'));
const FAQPage = lazy(() => import('./pages/FAQPage'));
const ContactPage = lazy(() => import('./pages/ContactPage'));
const ServicesPage = lazy(() => import('./pages/ServicesPage'));
const InterpelliPage = lazy(() => import('./pages/InterpelliPage'));
const NominePage = lazy(() => import('./pages/NominePage'));
const AreaRiservataPage = lazy(() => import('./pages/AreaRiservataPage'));
const ScorePageAR = lazy(() => import('./pages/ScorePageAR'));
const BookmarksPageAR = lazy(() => import('./pages/BookmarksPageAR'));
const DocumentsPageAR = lazy(() => import('./pages/DocumentsPageAR'));
const DocumentiApprovalPageAR = lazy(() => import('./pages/DocumentiApprovalPageAR'));
const BandiPageAR = lazy(() => import('./pages/BandiPageAR'));
const SubscriptionPageAR = lazy(() => import('./pages/SubscriptionPageAR'));
const SettingsPageAR = lazy(() => import('./pages/SettingsPageAR'));
const ObservabilityPage = lazy(() => import('./pages/ObservabilityPage'));

function ScrollToTop() {
  const { pathname } = useLocation();
  useEffect(() => { window.scrollTo(0, 0); }, [pathname]);
  useEffect(() => { trackPageView(pathname); }, [pathname]);
  return null;
}

function App() {
  const [showSearch, setShowSearch] = useState(false);

  useEffect(() => {
    initBollettiniData(); // Load real bollettini data from public/
    function handleKeyDown(e: KeyboardEvent) {
      if ((e.metaKey || e.ctrlKey) && e.key === 'k') {
        e.preventDefault();
        setShowSearch(prev => !prev);
      }
    }
    function handleOpenSearch() {
      setShowSearch(true);
    }
    document.addEventListener('keydown', handleKeyDown);
    window.addEventListener('open-global-search', handleOpenSearch);
    return () => {
      document.removeEventListener('keydown', handleKeyDown);
      window.removeEventListener('open-global-search', handleOpenSearch);
    };
  }, []);

  return (
    <QueryClientProvider client={queryClient}>
      <AuthProvider>
        <div className="min-h-screen bg-surface">
          <ScrollToTop />
          <Header onSearchOpen={() => setShowSearch(true)} />
          <div className="pt-16">
            <Breadcrumb />
            <Suspense fallback={<div className="flex justify-center items-center h-64"><div className="text-sm text-muted">Caricamento...</div></div>}>
              <Routes>
                <Route path="/" element={<HomePage />} />
                <Route path="/assistente" element={<AssistantPage />} />
                <Route path="/assistente/:type" element={<AssistantPage />} />
                <Route path="/calcolo-punteggio" element={<ScorePage />} />
                <Route path="/normative" element={<NormativePage />} />
                <Route path="/normative-e-documenti" element={<NormativeEDocumentiPage />} />
                <Route path="/notizie-scadenze" element={<NewsPage />} />
                <Route path="/notizie-scadenze/archivio" element={<ArchivePage />} />
                <Route path="/nomine" element={<NominePage />} />
                <Route path="/faq" element={<FAQPage />} />
                <Route path="/contatti" element={<ContactPage />} />
                <Route path="/servizi" element={<ServicesPage />} />
                <Route path="/interpelli" element={<InterpelliPage />} />
                <Route path="/area-riservata" element={<AreaRiservataLayout><AreaRiservataPage /></AreaRiservataLayout>} />
                <Route path="/area-riservata/punteggi" element={<AreaRiservataLayout><ScorePageAR /></AreaRiservataLayout>} />
                <Route path="/area-riservata/preferiti" element={<AreaRiservataLayout><BookmarksPageAR /></AreaRiservataLayout>} />
                <Route path="/area-riservata/documenti" element={<AreaRiservataLayout><DocumentsPageAR /></AreaRiservataLayout>} />
                <Route path="/area-riservata/documenti-approval" element={<AreaRiservataLayout><DocumentiApprovalPageAR /></AreaRiservataLayout>} />
                <Route path="/area-riservata/bandi" element={<AreaRiservataLayout><BandiPageAR /></AreaRiservataLayout>} />
                <Route path="/area-riservata/abbonamento" element={<AreaRiservataLayout><SubscriptionPageAR /></AreaRiservataLayout>} />
                <Route path="/area-riservata/impostazioni" element={<AreaRiservataLayout><SettingsPageAR /></AreaRiservataLayout>} />
                <Route path="/area-riservata/observability" element={<AreaRiservataLayout><ObservabilityPage /></AreaRiservataLayout>} />
              </Routes>
            </Suspense>
          </div>
          <Footer />
        </div>
        <Suspense fallback={null}>
          <GlobalSearch isOpen={showSearch} onClose={() => setShowSearch(false)} />
        </Suspense>
      </AuthProvider>
    </QueryClientProvider>
  );
}

export default App;
