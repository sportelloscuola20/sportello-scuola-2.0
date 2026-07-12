import { useState, useEffect, useMemo } from 'react';
import { useLocation, Link } from 'react-router-dom';
import { Target, Users, MapPin, BarChart3, ChevronRight } from 'lucide-react';
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
import { BOLLETTINI_NOMINE, CLASSI_CONCORSO } from '../data/bollettini-nomine';

function NominePreview() {
  const stats = useMemo(() => {
    const totalPositions = BOLLETTINI_NOMINE.reduce((s, b) => s + b.posizioniAssegnate, 0);
    const totalCandidates = BOLLETTINI_NOMINE.reduce((s, b) => s + b.candidatiInGraduatoria, 0);
    const provinceSet = new Set(BOLLETTINI_NOMINE.map(b => b.provinciaSigla));
    return {
      totalPositions,
      totalCandidates,
      coverageRate: totalCandidates > 0 ? ((totalPositions / totalCandidates) * 100).toFixed(1) : '0',
      activeProvinces: provinceSet.size,
    };
  }, []);

  const recentBollettini = useMemo(() => {
    return [...BOLLETTINI_NOMINE]
      .sort((a, b) => b.ultimaNomina.localeCompare(a.ultimaNomina))
      .slice(0, 6);
  }, []);

  const competizioneStyle: Record<string, string> = {
    molto_alta: 'bg-red-100 text-red-700',
    alta: 'bg-orange-100 text-orange-700',
    media: 'bg-amber-100 text-amber-700',
    bassa: 'bg-green-100 text-green-700',
  };

  return (
    <section className="py-16 bg-gradient-to-b from-slate-50 to-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-10">
          <h2 className="text-3xl font-extrabold text-[#0F172A] mb-3 tracking-tight">
            Osservatorio Nomine
          </h2>
          <p className="text-gray-600 font-normal max-w-2xl mx-auto text-sm">
            Dati in tempo reale sulle nomine scolastiche: posizioni, candidati e copertura
            nelle GPS di tutta Italia.
          </p>
        </div>

        <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 mb-10">
          <div className="bg-white rounded-2xl shadow-soft border border-slate-200/60 p-5 text-center">
            <Target className="w-6 h-6 text-blue-600 mx-auto mb-2" />
            <p className="text-2xl font-bold text-[#0F172A]">{stats.totalPositions.toLocaleString('it-IT')}</p>
            <p className="text-xs text-gray-500 mt-1">Posizioni assegnate</p>
          </div>
          <div className="bg-white rounded-2xl shadow-soft border border-slate-200/60 p-5 text-center">
            <Users className="w-6 h-6 text-purple-600 mx-auto mb-2" />
            <p className="text-2xl font-bold text-[#0F172A]">{stats.totalCandidates.toLocaleString('it-IT')}</p>
            <p className="text-xs text-gray-500 mt-1">Candidati in graduatoria</p>
          </div>
          <div className="bg-white rounded-2xl shadow-soft border border-slate-200/60 p-5 text-center">
            <BarChart3 className="w-6 h-6 text-emerald-600 mx-auto mb-2" />
            <p className="text-2xl font-bold text-[#0F172A]">{stats.coverageRate}%</p>
            <p className="text-xs text-gray-500 mt-1">Tasso di copertura</p>
          </div>
          <div className="bg-white rounded-2xl shadow-soft border border-slate-200/60 p-5 text-center">
            <MapPin className="w-6 h-6 text-amber-600 mx-auto mb-2" />
            <p className="text-2xl font-bold text-[#0F172A]">{stats.activeProvinces}</p>
            <p className="text-xs text-gray-500 mt-1">Province attive</p>
          </div>
        </div>

        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4 mb-8">
          {recentBollettini.map(b => {
            const classe = CLASSI_CONCORSO.find(c => c.codice === b.classeCodice);
            return (
              <div
                key={b.id}
                className="bg-white rounded-2xl shadow-soft border border-slate-200/60 p-5 hover:shadow-md transition-shadow"
              >
                <div className="flex items-start justify-between mb-3">
                  <div>
                    <span className="text-xs font-mono font-bold text-blue-700 bg-blue-50 px-2 py-0.5 rounded-full">
                      {b.classeCodice}
                    </span>
                    <span className="text-xs text-gray-500 ml-2">{b.provinciaSigla}</span>
                  </div>
                  <span className={`text-[10px] font-semibold px-2 py-0.5 rounded-full ${competizioneStyle[b.competizione] ?? 'bg-gray-100 text-gray-600'}`}>
                    {b.competizione === 'molto_alta' ? 'Molto alta' : b.competizione === 'alta' ? 'Alta' : b.competizione === 'media' ? 'Media' : 'Bassa'}
                  </span>
                </div>
                <p className="text-sm font-semibold text-gray-800 leading-snug mb-2 line-clamp-2">
                  {classe?.materia ?? b.classeCodice}
                </p>
                <div className="flex items-center gap-3 text-xs text-gray-500">
                  <span>{b.tipoGraduatoria}</span>
                </div>
                <div className="mt-3 flex items-center justify-between text-xs">
                  <span className="text-gray-600">
                    <span className="font-semibold text-[#0F172A]">{b.posizioniAssegnate}</span> pos. / {' '}
                    <span className="font-semibold text-[#0F172A]">{b.candidatiInGraduatoria.toLocaleString('it-IT')}</span> candidati
                  </span>
                </div>
                <p className="text-[10px] text-gray-400 mt-2">
                  Ultima nomina: {new Date(b.ultimaNomina).toLocaleDateString('it-IT', { day: '2-digit', month: 'short', year: 'numeric' })}
                </p>
              </div>
            );
          })}
        </div>

        <div className="text-center">
          <Link
            to="/nomine"
            className="inline-flex items-center gap-2 bg-blue-600 hover:bg-blue-700 text-white font-semibold px-6 py-3 rounded-xl transition-colors text-sm"
          >
            Vedi tutti i bollettini
            <ChevronRight className="w-4 h-4" />
          </Link>
        </div>
      </div>
    </section>
  );
}

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
      <NominePreview />
      <CentroInterpelli />
      <NormativeDocuments />
      <NewsHub />
      <AssistantsAI />
      <ServiziGrid />
      <UniversitaHub />
      <FAQ />
      <Contact />
      {showLogin && <LoginModal onClose={() => setShowLogin(false)} />}
    </main>
  );
}
