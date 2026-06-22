import { useState, useCallback } from 'react';
import { supabase } from '../lib/supabaseClient';
import type { ATACalculationResult } from '../types/database';

type ProfiloATA = 'AA' | 'AT' | 'CS' | 'OS' | 'GU' | 'CU' | 'IF';

const PROFILI: Record<ProfiloATA, { label: string; puntiMeseStatale: number; maxAnnuale: number; puntiMeseParitario: number }> = {
  AA: { label: 'Assistente Amministrativo', puntiMeseStatale: 0.50, maxAnnuale: 6, puntiMeseParitario: 0.25 },
  AT: { label: 'Assistente Tecnico', puntiMeseStatale: 0.50, maxAnnuale: 6, puntiMeseParitario: 0.25 },
  CU: { label: 'Cuoco', puntiMeseStatale: 0.50, maxAnnuale: 6, puntiMeseParitario: 0.25 },
  IF: { label: 'Infermiere', puntiMeseStatale: 0.50, maxAnnuale: 6, puntiMeseParitario: 0.25 },
  CS: { label: 'Collaboratore Scolastico', puntiMeseStatale: 0.60, maxAnnuale: 7.2, puntiMeseParitario: 0.30 },
  OS: { label: 'Operatore Scolastico', puntiMeseStatale: 0.60, maxAnnuale: 7.2, puntiMeseParitario: 0.30 },
  GU: { label: 'Guardarobiere', puntiMeseStatale: 0.60, maxAnnuale: 7.2, puntiMeseParitario: 0.30 },
};

interface ServizioATA {
  id: string;
  dataInizio: string;
  dataFine: string;
  tipo: 'statale' | 'paritario';
  annoScolastico: string;
}

function calcolaGiorni(inizio: string, fine: string): number {
  const d1 = new Date(inizio);
  const d2 = new Date(fine);
  return Math.max(0, Math.ceil((d2.getTime() - d1.getTime()) / (1000 * 60 * 60 * 24)) + 1);
}

function giorniAMesiFrazione(giorni: number): number {
  const frazione = giorni % 30;
  const mesiCompleti = Math.floor(giorni / 30);
  if (frazione > 15) return mesiCompleti + 1;
  return mesiCompleti;
}

export default function ATASimulator() {
  const [profilo, setProfilo] = useState<ProfiloATA>('AA');
  const [votoDiploma, setVotoDiploma] = useState<number>(100);
  const [baseVoto, setBaseVoto] = useState<number>(100);
  const [ciad, setCiad] = useState<boolean>(false);
  const [certInfoExtra, setCertInfoExtra] = useState<number>(0);
  const [haLaurea, setHaLaurea] = useState<boolean>(false);
  const [qualificaProf, setQualificaProf] = useState<boolean>(false);
  const [servizi, setServizi] = useState<ServizioATA[]>([]);
  const [risultato, setRisultato] = useState<ATACalculationResult | null>(null);
  const [erroreCIAD, setErroreCIAD] = useState<boolean>(false);
  const [salvataggioOK, setSalvataggioOK] = useState<boolean>(false);

  const votoSuBase10 = Math.round((votoDiploma / baseVoto) * 10 * 100) / 100;

  const addServizio = useCallback(() => {
    setServizi(prev => [
      ...prev,
      { id: crypto.randomUUID(), dataInizio: '', dataFine: '', tipo: 'statale', annoScolastico: '2025/2026' },
    ]);
  }, []);

  const removeServizio = useCallback((id: string) => {
    setServizi(prev => prev.filter(s => s.id !== id));
  }, []);

  const updateServizio = useCallback((id: string, field: keyof ServizioATA, value: string) => {
    setServizi(prev => prev.map(s => (s.id === id ? { ...s, [field]: value } : s)));
  }, []);

  const calcola = useCallback(() => {
    if (!ciad) {
      setErroreCIAD(true);
      return;
    }
    setErroreCIAD(false);

    const titStudio = votoSuBase10;
    const certInfoPt = Math.min(certInfoExtra, 4) * 0.25;
    const laureaPt = haLaurea ? 2 : 0;
    const qualificaPt = qualificaProf ? 1 : 0;

    const profiloData = PROFILI[profilo];
    const perAnno: Record<string, { statale: number; paritario: number }> = {};

    for (const s of servizi) {
      const anno = s.annoScolastico;
      if (!perAnno[anno]) perAnno[anno] = { statale: 0, paritario: 0 };

      const giorni = calcolaGiorni(s.dataInizio, s.dataFine);
      const mesi = giorniAMesiFrazione(giorni);
      const ptMese = s.tipo === 'statale' ? profiloData.puntiMeseStatale : profiloData.puntiMeseParitario;
      const punti = mesi * ptMese;

      if (s.tipo === 'statale') {
        perAnno[anno].statale += punti;
      } else {
        perAnno[anno].paritario += punti;
      }
    }

    let totStatale = 0;
    let totParitario = 0;
    for (const a of Object.values(perAnno)) {
      totStatale += Math.min(a.statale, profiloData.maxAnnuale);
      totParitario += Math.min(a.paritario, profiloData.maxAnnuale);
    }

    const totale = titStudio + certInfoPt + laureaPt + qualificaPt + totStatale + totParitario;

    const result: ATACalculationResult = {
      titoloStudio: Math.round(titStudio * 100) / 100,
      ciad: true,
      certificazioniInformatiche: Math.round(certInfoPt * 100) / 100,
      laurea: laureaPt,
      qualificheProfessionali: qualificaPt,
      servizioStatale: Math.round(totStatale * 100) / 100,
      servizioParitario: Math.round(totParitario * 100) / 100,
      punteggioTotale: Math.round(totale * 100) / 100,
    };

    setRisultato(result);
  }, [ciad, votoSuBase10, certInfoExtra, haLaurea, qualificaProf, servizi, profilo]);

  const salvaSuSupabase = useCallback(async () => {
    if (!risultato) return;
    const { data: { session } } = await supabase.auth.getSession();
    const userId = session?.user?.id || crypto.randomUUID();

    const { error } = await supabase.from('user_scores').insert({
      user_id: userId,
      tipo_graduatoria: 'ata',
      fascia: 'III',
      classe_concorso: PROFILI[profilo].label,
      punteggio_totale: risultato.punteggioTotale,
      dettagli_calcolo: risultato,
    });

    if (!error) setSalvataggioOK(true);
  }, [risultato, profilo]);

  return (
    <div className="min-h-screen bg-gradient-to-br from-green-50 via-white to-teal-50 py-8 px-4">
      <div className="max-w-4xl mx-auto">
        <div className="text-center mb-8">
          <h1 className="text-3xl font-bold text-brand-verde mb-2">Simulatore ATA Terza Fascia — D.M. 89/2024</h1>
          <p className="text-gray-600">Calcolo completo per tutti i profili professionali normati</p>
        </div>

        <div className="bg-white/70 backdrop-blur-xs rounded-3xl shadow-lg border border-white/40 p-6 sm:p-8 space-y-6">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Profilo Professionale</label>
            <select
              value={profilo}
              onChange={e => setProfilo(e.target.value as ProfiloATA)}
              className="w-full border border-gray-300 rounded-2xl px-4 py-3 focus:ring-2 focus:ring-brand-verde focus:border-brand-verde transition"
            >
              {Object.entries(PROFILI).map(([key, val]) => (
                <option key={key} value={key}>
                  {key} — {val.label}
                </option>
              ))}
            </select>
          </div>

          <div className="p-4 bg-teal-50 rounded-2xl">
            <p className="text-sm text-brand-ottanio font-medium">
              {PROFILI[profilo].label}: {PROFILI[profilo].puntiMeseStatale} pt/mese statale (max {PROFILI[profilo].maxAnnuale}/anno), {PROFILI[profilo].puntiMeseParitario} pt/mese paritario/ente locale
            </p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Voto Titolo di Studio</label>
              <input
                type="number"
                min={36}
                max={110}
                value={votoDiploma}
                onChange={e => setVotoDiploma(Number(e.target.value))}
                className="w-full border border-gray-300 rounded-2xl px-4 py-3 focus:ring-2 focus:ring-brand-verde transition"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Base del Voto</label>
              <select
                value={baseVoto}
                onChange={e => setBaseVoto(Number(e.target.value))}
                className="w-full border border-gray-300 rounded-2xl px-4 py-3 focus:ring-2 focus:ring-brand-verde transition"
              >
                <option value={60}>Base 60</option>
                <option value={100}>Base 100</option>
                <option value={110}>Base 110</option>
              </select>
            </div>
          </div>

          <div className="p-4 bg-green-50 rounded-2xl">
            <p className="text-brand-verde font-semibold">
              Voto convertito su base 10: <span className="text-2xl">{votoSuBase10}</span> punti
            </p>
            <p className="text-xs text-gray-500 mt-1">Formula: ({votoDiploma} / {baseVoto}) × 10</p>
          </div>

          <div className="p-4 border-2 border-red-200 rounded-2xl bg-red-50">
            <div className="flex items-start gap-3">
              <input
                type="checkbox"
                id="ciad"
                checked={ciad}
                onChange={e => {
                  setCiad(e.target.checked);
                  setErroreCIAD(false);
                }}
                className="h-5 w-5 mt-1 rounded border-gray-300 text-brand-verde focus:ring-brand-verde"
              />
              <label htmlFor="ciad" className="text-sm font-semibold text-red-700">
                Certificazione Internazionale di Alfabetizzazione Digitale (CIAD) — Requisito di accesso obbligatorio ai sensi del CCNL vigente
              </label>
            </div>
            {erroreCIAD && (
              <div className="mt-3 p-3 bg-red-100 rounded-xl border border-red-300">
                <p className="text-red-700 text-sm font-bold">
                  ⚠ Requisito di accesso obbligatorio assente ai sensi del CCNL vigente. Il calcolo non può procedere senza la CIAD.
                </p>
              </div>
            )}
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Certificazioni Informatiche Extra (EIPASS/ICDL, +0,25 pt ciascuna)
            </label>
            <input
              type="number"
              min={0}
              max={10}
              value={certInfoExtra}
              onChange={e => setCertInfoExtra(Number(e.target.value))}
              className="w-full border border-gray-300 rounded-2xl px-4 py-3 focus:ring-2 focus:ring-brand-verde transition"
            />
            <p className="mt-1 text-xs text-gray-500">Punteggio: {(Math.min(certInfoExtra, 4) * 0.25).toFixed(2)} pt</p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div className="flex items-center gap-3">
              <input
                type="checkbox"
                id="laurea"
                checked={haLaurea}
                onChange={e => setHaLaurea(e.target.checked)}
                className="h-5 w-5 rounded border-gray-300 text-brand-verde focus:ring-brand-verde"
              />
              <label htmlFor="laurea" className="text-sm font-medium text-gray-700">Laurea Specialistica/Magistrale (+2 pt)</label>
            </div>
            <div className="flex items-center gap-3">
              <input
                type="checkbox"
                id="qualifica"
                checked={qualificaProf}
                onChange={e => setQualificaProf(e.target.checked)}
                className="h-5 w-5 rounded border-gray-300 text-brand-verde focus:ring-brand-verde"
              />
              <label htmlFor="qualifica" className="text-sm font-medium text-gray-700">Qualifica Professionale Regionale (+1 pt)</label>
            </div>
          </div>

          <div className="space-y-4">
            <h3 className="text-lg font-semibold text-brand-verde">Servizi Scolastici</h3>

            {servizi.length === 0 && (
              <div className="text-center py-6 text-gray-400">
                <p>Nessun periodo di servizio inserito.</p>
              </div>
            )}

            {servizi.map((s, idx) => (
              <div key={s.id} className="p-4 border border-gray-200 rounded-2xl space-y-3 relative">
                <button
                  onClick={() => removeServizio(s.id)}
                  className="absolute top-2 right-2 text-red-400 hover:text-red-600 text-sm transition"
                >
                  ✕ Rimuovi
                </button>
                <h4 className="font-medium text-brand-ottanio text-sm">Periodo {idx + 1}</h4>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                  <div>
                    <label className="block text-xs font-medium text-gray-600 mb-1">Data Inizio</label>
                    <input
                      type="date"
                      value={s.dataInizio}
                      onChange={e => updateServizio(s.id, 'dataInizio', e.target.value)}
                      className="w-full border border-gray-300 rounded-xl px-3 py-2 text-sm focus:ring-2 focus:ring-brand-verde transition"
                    />
                  </div>
                  <div>
                    <label className="block text-xs font-medium text-gray-600 mb-1">Data Fine</label>
                    <input
                      type="date"
                      value={s.dataFine}
                      onChange={e => updateServizio(s.id, 'dataFine', e.target.value)}
                      className="w-full border border-gray-300 rounded-xl px-3 py-2 text-sm focus:ring-2 focus:ring-brand-verde transition"
                    />
                  </div>
                  <div>
                    <label className="block text-xs font-medium text-gray-600 mb-1">Tipo Ente</label>
                    <select
                      value={s.tipo}
                      onChange={e => updateServizio(s.id, 'tipo', e.target.value)}
                      className="w-full border border-gray-300 rounded-xl px-3 py-2 text-sm focus:ring-2 focus:ring-brand-verde transition"
                    >
                      <option value="statale">Statale ({PROFILI[profilo].puntiMeseStatale} pt/mese)</option>
                      <option value="paritario">Paritario/Ente Locale ({PROFILI[profilo].puntiMeseParitario} pt/mese)</option>
                    </select>
                  </div>
                  <div>
                    <label className="block text-xs font-medium text-gray-600 mb-1">Anno Scolastico</label>
                    <input
                      type="text"
                      value={s.annoScolastico}
                      onChange={e => updateServizio(s.id, 'annoScolastico', e.target.value)}
                      className="w-full border border-gray-300 rounded-xl px-3 py-2 text-sm focus:ring-2 focus:ring-brand-verde transition"
                    />
                  </div>
                </div>
              </div>
            ))}

            <button
              onClick={addServizio}
              className="w-full py-3 border-2 border-dashed border-brand-verde text-brand-verde rounded-2xl hover:bg-brand-verde/5 transition font-medium"
            >
              + Aggiungi Periodo di Servizio
            </button>
          </div>

          <button
            onClick={calcola}
            className="w-full py-4 bg-gradient-to-r from-brand-verde to-brand-ottanio text-white rounded-2xl hover:opacity-90 transition font-bold text-lg shadow-lg"
          >
            Calcola Punteggio ATA
          </button>

          {risultato && (
            <div className="space-y-4 mt-6">
              <h2 className="text-xl font-semibold text-brand-verde">Riepilogo Punteggio ATA — III Fascia</h2>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                {[
                  { label: 'Titolo di Studio (base 10)', value: risultato.titoloStudio, color: 'bg-blue-100 text-brand-blu' },
                  { label: 'Cert. Informatiche Extra', value: risultato.certificazioniInformatiche, color: 'bg-purple-100 text-purple-700' },
                  { label: 'Laurea Specialistica', value: risultato.laurea, color: 'bg-green-100 text-brand-verde' },
                  { label: 'Qualifiche Professionali', value: risultato.qualificheProfessionali, color: 'bg-teal-100 text-brand-ottanio' },
                  { label: 'Servizio Statale', value: risultato.servizioStatale, color: 'bg-amber-100 text-amber-700' },
                  { label: 'Servizio Paritario/Ente Locale', value: risultato.servizioParitario, color: 'bg-orange-100 text-orange-700' },
                ].map(item => (
                  <div key={item.label} className={`p-4 rounded-2xl ${item.color}`}>
                    <p className="text-xs font-medium opacity-80">{item.label}</p>
                    <p className="text-2xl font-bold">{item.value}</p>
                  </div>
                ))}
              </div>

              <div className="p-6 bg-gradient-to-r from-brand-verde to-brand-ottanio rounded-2xl text-white text-center">
                <p className="text-sm font-medium opacity-90">PUNTEGGIO TOTALE ATA — III FASCIA</p>
                <p className="text-5xl font-extrabold mt-1">{risultato.punteggioTotale}</p>
              </div>

              <div className="flex gap-3">
                <button
                  onClick={salvaSuSupabase}
                  className="flex-1 py-3 bg-brand-verde text-white rounded-2xl font-semibold hover:bg-brand-verde/90 transition"
                >
                  {salvataggioOK ? '✓ Salvato!' : 'Salva nel tuo profilo'}
                </button>
                <button
                  onClick={() => {
                    setRisultato(null);
                    setServizi([]);
                  }}
                  className="flex-1 py-3 border-2 border-brand-verde text-brand-verde rounded-2xl font-semibold hover:bg-brand-verde/5 transition"
                >
                  Nuovo Calcolo
                </button>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
