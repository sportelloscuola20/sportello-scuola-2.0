import { useState } from 'react';
import { Newspaper, CalendarClock, BarChart3, Shield, Activity, Target, AlertTriangle } from 'lucide-react';
import { LIVELLI_FONTE } from '../types/intelligence';
import type { LivelloFonte } from '../types/intelligence';
import NewsHub from '../components/NewsHub';

const LIVELLI_ORDINE: LivelloFonte[] = ['A', 'B', 'C', 'D', 'E', 'F'];

export default function NewsPage() {
  const [showSourceMap, setShowSourceMap] = useState(false);

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-green-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-24 pb-12">
        {/* Dashboard header intelligence */}
        <div className="mb-8">
          <div className="text-center mb-6">
            <h1 className="text-4xl font-extrabold text-[#0F172A] mb-4 tracking-tight">
              Intelligence Editoriale — Notizie e Scadenze
            </h1>
            <p className="text-gray-600 max-w-3xl mx-auto">
              Piattaforma di monitoraggio normativo basata su fonti primarie certificate (G.U., MIM, Normattiva, ARAN, INPS).
              Ogni contenuto è classificato per criticità, impatto, platea e target, con validazione a 6 livelli prima della pubblicazione.
            </p>
          </div>

          {/* Intelligence badges */}
          <div className="flex flex-wrap gap-3 justify-center mb-6">
            <div className="inline-flex items-center gap-2 bg-green-50 border border-green-200 rounded-2xl px-4 py-2">
              <Shield size={16} className="text-green-600" />
              <span className="text-xs font-semibold text-green-700">Fonti Primarie (Livello A)</span>
            </div>
            <div className="inline-flex items-center gap-2 bg-blue-50 border border-blue-200 rounded-2xl px-4 py-2">
              <Activity size={16} className="text-blue-600" />
              <span className="text-xs font-semibold text-blue-700">7 Livelli di Produzione</span>
            </div>
            <div className="inline-flex items-center gap-2 bg-amber-50 border border-amber-200 rounded-2xl px-4 py-2">
              <Target size={16} className="text-amber-600" />
              <span className="text-xs font-semibold text-amber-700">Target Personalizzati</span>
            </div>
            <div className="inline-flex items-center gap-2 bg-red-50 border border-red-200 rounded-2xl px-4 py-2">
              <AlertTriangle size={16} className="text-red-600" />
              <span className="text-xs font-semibold text-red-700">Sistema di Allerta</span>
            </div>
            <div className="inline-flex items-center gap-2 bg-purple-50 border border-purple-200 rounded-2xl px-4 py-2">
              <BarChart3 size={16} className="text-purple-600" />
              <span className="text-xs font-semibold text-purple-700">Data Journalism</span>
            </div>
          </div>

          {/* Source architecture map */}
          <button onClick={() => setShowSourceMap(!showSourceMap)}
            className="mx-auto flex items-center gap-2 text-sm text-brand-blu font-semibold hover:text-brand-blu/80 transition mb-4">
            <Shield size={14} /> {showSourceMap ? 'Nascondi' : 'Mostra'} Architettura delle Fonti
          </button>

          {showSourceMap && (
            <div className="bg-white/80 backdrop-blur-md rounded-3xl border border-slate-200/60 p-6 mb-6 animate-fade-in-up">
              <h3 className="text-lg font-bold text-[#0F172A] mb-4">Architettura delle Fonti — Piramide di Affidabilità</h3>
              <div className="space-y-3">
                {LIVELLI_ORDINE.map(l => {
                  const info = LIVELLI_FONTE[l];
                  const colors: Record<string, string> = {
                    A: 'border-green-300 bg-green-50',
                    B: 'border-blue-300 bg-blue-50',
                    C: 'border-purple-300 bg-purple-50',
                    D: 'border-teal-300 bg-teal-50',
                    E: 'border-amber-300 bg-amber-50',
                    F: 'border-gray-300 bg-gray-50',
                  };
                  return (
                    <div key={l} className={`rounded-2xl border p-4 ${colors[l]}`}>
                      <div className="flex items-center justify-between mb-1">
                        <span className="text-sm font-bold">Livello {l} — {info.nome}</span>
                        <span className="text-xs font-mono font-bold">Peso: {info.peso}/100</span>
                      </div>
                      <p className="text-xs text-gray-600">{info.descrizione}</p>
                    </div>
                  );
                })}
              </div>
              <div className="mt-4 p-4 bg-gray-100 rounded-2xl">
                <p className="text-xs text-gray-600 font-semibold">Regola di Validazione: 1. Allerta (Livello F) → 2. Verifica (Livello A) → 3. Effetti (Livello B) → 4. Impatti giuridici (Livello C) → 5. Impatti europei (Livello D) → 6. Ricerca scientifica (Livello E). Nessuna notizia senza fonte primaria verificabile.</p>
              </div>
            </div>
          )}
        </div>

        <NewsHub />
      </div>
    </div>
  );
}
