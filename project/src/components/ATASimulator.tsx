import { useState, useCallback } from 'react';
import { jsPDF } from 'jspdf';
import { supabase } from '../lib/supabaseClient';
import type { ATACalculationResult } from '../types/database';

type ProfiloATA = 'AA' | 'AT' | 'CS' | 'OS' | 'GU' | 'CU' | 'IF';

const PROFILI: Record<ProfiloATA, { label: string; puntiMeseStatale: number; maxAnnuale: number; puntiMeseParitario: number; descrizione: string }> = {
  AA: { label: 'Assistente Amministrativo', puntiMeseStatale: 0.50, maxAnnuale: 6, puntiMeseParitario: 0.25, descrizione: 'Gestione contabilità, protocollo e segreteria didattica' },
  AT: { label: 'Assistente Tecnico', puntiMeseStatale: 0.50, maxAnnuale: 6, puntiMeseParitario: 0.25, descrizione: 'Supporto tecnico-laboratoriale e manutenzione strumenti' },
  CU: { label: 'Cuoco', puntiMeseStatale: 0.50, maxAnnuale: 6, puntiMeseParitario: 0.25, descrizione: 'Preparazione pasti nelle scuole con servizio mensa' },
  IF: { label: 'Infermiere', puntiMeseStatale: 0.50, maxAnnuale: 6, puntiMeseParitario: 0.25, descrizione: 'Assistenza sanitaria e somministrazione farmaci' },
  CS: { label: 'Collaboratore Scolastico', puntiMeseStatale: 0.60, maxAnnuale: 7.2, puntiMeseParitario: 0.30, descrizione: 'Sorveglianza, pulizia e supporto alunni con disabilità' },
  OS: { label: 'Operatore Scolastico', puntiMeseStatale: 0.60, maxAnnuale: 7.2, puntiMeseParitario: 0.30, descrizione: 'Nuovo profilo DM 89/2024 — servizi di accoglienza e sorveglianza' },
  GU: { label: 'Guardarobiere', puntiMeseStatale: 0.60, maxAnnuale: 7.2, puntiMeseParitario: 0.30, descrizione: 'Gestione e manutenzione corredi e divise' },
};

const STEPS = ['Profilo', 'Titolo Studio', 'Requisiti Accesso', 'Servizi', 'Riepilogo'];

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
  const mesiCompleti = Math.floor(giorni / 30);
  const frazione = giorni % 30;
  return frazione > 15 ? mesiCompleti + 1 : mesiCompleti;
}

export default function ATASimulator() {
  const [currentStep, setCurrentStep] = useState(0);
  const [profilo, setProfilo] = useState<ProfiloATA>('AA');
  const [votoDiploma, setVotoDiploma] = useState<number>(100);
  const [baseVoto, setBaseVoto] = useState<number>(100);
  const [ciad, setCiad] = useState<boolean>(false);
  const [erroreCIAD, setErroreCIAD] = useState<boolean>(false);
  const [certInfoExtra, setCertInfoExtra] = useState<number>(0);
  const [haLaurea, setHaLaurea] = useState<boolean>(false);
  const [qualificaProf, setQualificaProf] = useState<boolean>(false);
  const [servizi, setServizi] = useState<ServizioATA[]>([]);
  const [risultato, setRisultato] = useState<ATACalculationResult | null>(null);
  const [salvataggioOK, setSalvataggioOK] = useState<boolean>(false);
  const [dettaglioVoci, setDettaglioVoci] = useState<string[]>([]);

  const votoSuBase10 = Math.round((votoDiploma / baseVoto) * 10 * 100) / 100;

  const progressPercent = ((currentStep + 1) / STEPS.length) * 100;
  const profiloData = PROFILI[profilo];

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

    const voci: string[] = [];
    const titStudio = votoSuBase10;
    voci.push(`Titolo di studio (convertito base 10): ${votoDiploma}/${baseVoto} × 10 = ${titStudio} pt`);

    const certInfoPt = Math.min(certInfoExtra, 4) * 0.25;
    if (certInfoPt > 0) voci.push(`Certificazioni informatiche extra × ${Math.min(certInfoExtra, 4)}: +${certInfoPt} pt (max 4)`);

    const laureaPt = haLaurea ? 2 : 0;
    if (laureaPt > 0) voci.push('Laurea specialistica/magistrale: +2 pt');

    const qualificaPt = qualificaProf ? 1 : 0;
    if (qualificaPt > 0) voci.push('Qualifica professionale regionale: +1 pt');

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
    for (const [anno, a] of Object.entries(perAnno)) {
      const spec = Math.min(a.statale, profiloData.maxAnnuale);
      const nonSpec = Math.min(a.paritario, profiloData.maxAnnuale);
      totStatale += spec;
      totParitario += nonSpec;
      if (spec > 0) voci.push(`Servizio statale ${anno}: ${spec} pt (max ${profiloData.maxAnnuale}/anno)`);
      if (nonSpec > 0) voci.push(`Servizio paritario/EL ${anno}: ${nonSpec} pt — decurtazione 50% applicata`);
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

    setDettaglioVoci(voci);
    setRisultato(result);
    setCurrentStep(STEPS.length - 1);
  }, [ciad, votoSuBase10, votoDiploma, baseVoto, certInfoExtra, haLaurea, qualificaProf, servizi, profiloData]);

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

  const scaricaPDF = useCallback(() => {
    if (!risultato) return;
    const doc = new jsPDF();
    const pageWidth = doc.internal.pageSize.getWidth();
    const margin = 20;
    const contentWidth = pageWidth - 2 * margin;
    let y = margin;

    doc.setFontSize(18);
    doc.setTextColor('#235377');
    doc.text('Sportello Scuola 2.0', margin, y);
    y += 8;
    doc.setFontSize(8);
    doc.setTextColor('#4A5568');
    const now = new Date();
    const reportCode = `SS-ATA-${crypto.randomUUID().slice(0, 8).toUpperCase()}`;
    doc.text(`Data: ${now.toLocaleDateString('it-IT')}  |  Ora: ${now.toLocaleTimeString('it-IT')}  |  Report: ${reportCode}`, margin, y);
    y += 6;
    doc.setDrawColor('#235377');
    doc.setLineWidth(0.5);
    doc.line(margin, y, pageWidth - margin, y);
    y += 8;

    doc.setFontSize(12);
    doc.setTextColor('#235377');
    doc.text('Report Valutazione Punteggio ATA — III Fascia (DM 89/2024)', margin, y);
    y += 8;
    doc.setFontSize(10);
    doc.setTextColor('#333');
    doc.text(`Profilo: ${PROFILI[profilo].label} (${profilo})`, margin, y);
    y += 5;
    doc.text(`Punteggio totale simulato: ${risultato.punteggioTotale} punti`, margin, y);
    y += 8;

    doc.setFontSize(8);
    doc.setTextColor('#235377');
    doc.text('CIAD: Certificazione Internazionale Alfabetizzazione Digitale — Requisito obbligatorio soddisfatto', margin, y);
    y += 6;
    doc.text('Dettaglio delle voci:', margin, y);
    y += 5;
    doc.setFontSize(8);
    doc.setTextColor('#555');
    for (const voce of dettaglioVoci) {
      if (y > 270) {
        doc.addPage();
        y = margin;
      }
      doc.text(voce, margin + 3, y);
      y += 4;
    }

    y += 8;
    if (y > 260) { doc.addPage(); y = margin; }
    doc.setFillColor('#235377');
    doc.rect(margin, y, contentWidth, 12, 'F');
    doc.setTextColor('#FFFFFF');
    doc.setFontSize(14);
    doc.setFont('helvetica', 'bold');
    doc.text(`PUNTEGGIO TOTALE SIMULATO: ${risultato.punteggioTotale} PUNTI`, margin + 5, y + 8);
    y += 18;

    doc.setFontSize(7);
    doc.setTextColor('#999');
    doc.setFont('helvetica', 'normal');
    const footerText = 'Il presente report costituisce una simulazione fedele elaborata sulla base delle tabelle di valutazione dei titoli di cui al DM 89/2024 e al CCNL Istruzione e Ricerca vigente. Non sostituisce l\'atto di validazione ufficiale dell\'Ufficio Scolastico Regionale o delle scuole polo preposte al controllo delle dichiarazioni.';
    const footerLines = doc.splitTextToSize(footerText, contentWidth);
    let fy = doc.internal.pageSize.getHeight() - margin - footerLines.length * 3;
    for (const line of footerLines) {
      doc.text(line, margin, fy);
      fy += 3;
    }
    const pageCount = doc.getNumberOfPages();
    for (let i = 1; i <= pageCount; i++) {
      doc.setPage(i);
      const pY = doc.internal.pageSize.getHeight() - margin;
      doc.setFontSize(7);
      doc.setTextColor('#999');
      doc.text(`Pagina ${i} di ${pageCount}`, margin, pY);
    }

    doc.save(`Report_ATA_${now.toISOString().slice(0, 10)}.pdf`);
  }, [risultato, profilo, dettaglioVoci]);

  return (
    <div className="min-h-screen bg-gradient-to-br from-green-50 via-white to-teal-50 py-8 px-4">
      <div className="max-w-4xl mx-auto">
        <div className="text-center mb-8">
          <h1 className="text-3xl font-bold text-brand-verde mb-2">Simulatore ATA Terza Fascia — D.M. 89/2024</h1>
          <p className="text-gray-600">Calcolo completo del punteggio per tutti i profili professionali ATA, conforme alle tabelle ministeriali</p>
        </div>

        <div className="mb-8">
          <div className="flex justify-between mb-2 overflow-x-auto">
            {STEPS.map((step, i) => (
              <button key={step} onClick={() => { if (i < currentStep) setCurrentStep(i); }}
                className={`flex-1 text-xs sm:text-sm font-medium py-2 px-1 border-b-2 transition-all duration-200 ${
                  i === currentStep ? 'border-brand-verde text-brand-verde' : i < currentStep ? 'border-brand-ottanio text-brand-ottanio' : 'border-gray-200 text-gray-400'
                }`}>{step}</button>
            ))}
          </div>
          <div className="h-1 bg-gray-100 rounded-full overflow-hidden">
            <div className="h-full bg-gradient-to-r from-brand-verde to-brand-ottanio transition-all duration-500" style={{ width: `${progressPercent}%` }} />
          </div>
        </div>

        <div className="bg-white/70 backdrop-blur-xs rounded-3xl shadow-lg border border-white/40 p-6 sm:p-8">
          {/* Step 0: Profilo */}
          {currentStep === 0 && (
            <div className="space-y-6">
              <h2 className="text-xl font-semibold text-brand-verde">Seleziona il Profilo Professionale</h2>
              <p className="text-sm text-gray-500">Scegli il profilo per il quale intendi calcolare il punteggio in graduatoria III Fascia ATA</p>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                {Object.entries(PROFILI).map(([key, val]) => (
                  <button key={key} onClick={() => setProfilo(key as ProfiloATA)}
                    className={`p-4 rounded-2xl border-2 text-left transition-all ${
                      profilo === key ? 'border-brand-verde bg-brand-verde/5' : 'border-gray-200 hover:border-brand-verde/50'
                    }`}>
                    <span className="font-bold text-brand-verde text-lg">{key}</span>
                    <span className="ml-2 text-sm text-gray-600">— {val.label}</span>
                    <p className="text-xs text-gray-500 mt-1">{val.descrizione}</p>
                    <div className="flex gap-3 mt-2">
                      <span className="text-xs px-2 py-0.5 bg-blue-100 text-blue-700 rounded-full font-medium">{val.puntiMeseStatale} pt/mese statale</span>
                      <span className="text-xs px-2 py-0.5 bg-amber-100 text-amber-700 rounded-full font-medium">max {val.maxAnnuale}/anno</span>
                      <span className="text-xs px-2 py-0.5 bg-teal-100 text-teal-700 rounded-full font-medium">{val.puntiMeseParitario} pt/mese paritario</span>
                    </div>
                  </button>
                ))}
              </div>
            </div>
          )}

          {/* Step 1: Titolo Studio */}
          {currentStep === 1 && (
            <div className="space-y-6">
              <h2 className="text-xl font-semibold text-brand-verde">Titolo di Studio</h2>
              <p className="text-sm text-gray-500">Inserisci il voto del tuo titolo di studio per il calcolo della valutazione su base 10</p>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Voto Titolo di Studio</label>
                  <input type="number" min={36} max={110} value={votoDiploma}
                    onChange={e => setVotoDiploma(Number(e.target.value))}
                    className="w-full border border-gray-300 rounded-2xl px-4 py-3 focus:ring-2 focus:ring-brand-verde transition" />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Base del Voto</label>
                  <select value={baseVoto} onChange={e => setBaseVoto(Number(e.target.value))}
                    className="w-full border border-gray-300 rounded-2xl px-4 py-3 focus:ring-2 focus:ring-brand-verde transition">
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

              <div className="border-t border-gray-200 pt-6">
                <h3 className="font-semibold text-gray-800 mb-4">Titoli Aggiuntivi Valutabili</h3>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <label className="flex items-center gap-3 p-4 border border-gray-200 rounded-2xl hover:border-brand-verde/30 cursor-pointer transition">
                    <input type="checkbox" checked={haLaurea} onChange={e => setHaLaurea(e.target.checked)}
                      className="h-5 w-5 rounded border-gray-300 text-brand-verde focus:ring-brand-verde" />
                    <div>
                      <p className="text-sm font-medium text-gray-800">Laurea Specialistica/Magistrale</p>
                      <p className="text-xs text-brand-verde font-semibold">+2 pt</p>
                    </div>
                  </label>
                  <label className="flex items-center gap-3 p-4 border border-gray-200 rounded-2xl hover:border-brand-verde/30 cursor-pointer transition">
                    <input type="checkbox" checked={qualificaProf} onChange={e => setQualificaProf(e.target.checked)}
                      className="h-5 w-5 rounded border-gray-300 text-brand-verde focus:ring-brand-verde" />
                    <div>
                      <p className="text-sm font-medium text-gray-800">Qualifica Professionale Regionale</p>
                      <p className="text-xs text-brand-verde font-semibold">+1 pt</p>
                    </div>
                  </label>
                </div>
              </div>
            </div>
          )}

          {/* Step 2: Requisiti Accesso */}
          {currentStep === 2 && (
            <div className="space-y-6">
              <h2 className="text-xl font-semibold text-brand-verde">Requisiti di Accesso e Certificazioni</h2>
              <p className="text-sm text-gray-500">La CIAD è requisito obbligatorio per l'accesso alla III Fascia ATA. Le certificazioni informatiche extra sono valutabili fino a un massimo di 4.</p>

              <div className="p-4 border-2 border-red-200 rounded-2xl bg-red-50">
                <div className="flex items-start gap-3">
                  <input type="checkbox" id="ciad" checked={ciad}
                    onChange={e => { setCiad(e.target.checked); setErroreCIAD(false); }}
                    className="h-5 w-5 mt-1 rounded border-gray-300 text-brand-verde focus:ring-brand-verde" />
                  <label htmlFor="ciad" className="text-sm font-semibold text-red-700">
                    Certificazione Internazionale di Alfabetizzazione Digitale (CIAD) — Requisito di accesso obbligatorio ai sensi del CCNL Istruzione e Ricerca vigente
                  </label>
                </div>
                {erroreCIAD && (
                  <div className="mt-3 p-3 bg-red-100 rounded-xl border border-red-300">
                    <p className="text-red-700 text-sm font-bold">
                      ⚠ Il calcolo non può procedere senza CIAD. Requisito obbligatorio ai sensi del CCNL vigente.
                    </p>
                  </div>
                )}
              </div>

              <div className="border-t border-gray-200 pt-6">
                <h3 className="font-semibold text-gray-800 mb-4">Certificazioni Informatiche Extra</h3>
                <p className="text-xs text-gray-500 mb-3">Valutabili fino a 4 certificazioni (EIPASS, ICDL, EUCIP, PEKIT) — +0,25 pt ciascuna, max 1 pt</p>
                <label className="block text-sm font-medium text-gray-700 mb-1">Numero certificazioni possedute</label>
                <input type="number" min={0} max={10} value={certInfoExtra}
                  onChange={e => setCertInfoExtra(Number(e.target.value))}
                  className="w-full border border-gray-300 rounded-2xl px-4 py-3 focus:ring-2 focus:ring-brand-verde transition" />
                <p className="mt-2 text-sm text-brand-verde font-semibold">Punteggio: {(Math.min(certInfoExtra, 4) * 0.25).toFixed(2)} pt</p>
              </div>
            </div>
          )}

          {/* Step 3: Servizi */}
          {currentStep === 3 && (
            <div className="space-y-6">
              <h2 className="text-xl font-semibold text-brand-verde">Servizi Scolastici Prestati</h2>
              <p className="text-sm text-gray-500">Inserisci i periodi di servizio presso scuole statali, paritarie o enti locali. Il servizio paritario/EL vale il 50% del punteggio statale (decurtazione DM 89/2024).</p>

              <div className="p-4 bg-teal-50 rounded-2xl">
                <p className="text-sm text-brand-ottanio font-medium">
                  {profiloData.label}: {profiloData.puntiMeseStatale} pt/mese statale (max {profiloData.maxAnnuale}/anno) — {profiloData.puntiMeseParitario} pt/mese paritario/EL (decurtazione 50%)
                </p>
              </div>

              {servizi.length === 0 && (
                <div className="text-center py-6 text-gray-400">
                  <p>Nessun periodo di servizio inserito.</p>
                </div>
              )}

              {servizi.map((s, idx) => {
                const giorni = s.dataInizio && s.dataFine ? calcolaGiorni(s.dataInizio, s.dataFine) : 0;
                const mesi = giorni > 0 ? giorniAMesiFrazione(giorni) : 0;
                const ptMese = s.tipo === 'statale' ? profiloData.puntiMeseStatale : profiloData.puntiMeseParitario;
                const puntiPeriodo = mesi * ptMese;
                return (
                  <div key={s.id} className="p-4 border border-gray-200 rounded-2xl space-y-3 relative">
                    <button onClick={() => removeServizio(s.id)}
                      className="absolute top-2 right-2 text-red-400 hover:text-red-600 text-sm transition">✕ Rimuovi</button>
                    <h4 className="font-medium text-brand-ottanio text-sm">Periodo {idx + 1}</h4>
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                      <div>
                        <label className="block text-xs font-medium text-gray-600 mb-1">Data Inizio</label>
                        <input type="date" value={s.dataInizio}
                          onChange={e => updateServizio(s.id, 'dataInizio', e.target.value)}
                          className="w-full border border-gray-300 rounded-xl px-3 py-2 text-sm focus:ring-2 focus:ring-brand-verde transition" />
                      </div>
                      <div>
                        <label className="block text-xs font-medium text-gray-600 mb-1">Data Fine</label>
                        <input type="date" value={s.dataFine}
                          onChange={e => updateServizio(s.id, 'dataFine', e.target.value)}
                          className="w-full border border-gray-300 rounded-xl px-3 py-2 text-sm focus:ring-2 focus:ring-brand-verde transition" />
                      </div>
                      <div>
                        <label className="block text-xs font-medium text-gray-600 mb-1">Tipo Ente</label>
                        <select value={s.tipo}
                          onChange={e => updateServizio(s.id, 'tipo', e.target.value)}
                          className="w-full border border-gray-300 rounded-xl px-3 py-2 text-sm focus:ring-2 focus:ring-brand-verde transition">
                          <option value="statale">Statale ({profiloData.puntiMeseStatale} pt/mese)</option>
                          <option value="paritario">Paritario/Ente Locale ({profiloData.puntiMeseParitario} pt/mese — decurtazione 50%)</option>
                        </select>
                      </div>
                      <div>
                        <label className="block text-xs font-medium text-gray-600 mb-1">Anno Scolastico</label>
                        <input type="text" value={s.annoScolastico}
                          onChange={e => updateServizio(s.id, 'annoScolastico', e.target.value)}
                          className="w-full border border-gray-300 rounded-xl px-3 py-2 text-sm focus:ring-2 focus:ring-brand-verde transition" />
                      </div>
                    </div>
                    {mesi > 0 && (
                      <p className="text-xs text-gray-500">
                        {giorni} giorni = {mesi} mesi × {ptMese} pt/mese = {puntiPeriodo.toFixed(2)} pt
                        {s.tipo === 'paritario' && <span className="text-amber-600 font-medium"> (decurtazione 50% applicata)</span>}
                      </p>
                    )}
                  </div>
                );
              })}

              <button onClick={addServizio}
                className="w-full py-3 border-2 border-dashed border-brand-verde text-brand-verde rounded-2xl hover:bg-brand-verde/5 transition font-medium">
                + Aggiungi Periodo di Servizio
              </button>
            </div>
          )}

          {/* Step 4: Riepilogo */}
          {currentStep === 4 && risultato && (
            <div className="space-y-6">
              <h2 className="text-xl font-semibold text-brand-verde">Riepilogo Punteggio ATA — III Fascia</h2>
              <p className="text-sm text-gray-500">Dettaglio analitico del calcolo effettuato per il profilo {PROFILI[profilo].label}</p>

              <div className="bg-gray-50 rounded-2xl p-4 space-y-2 text-sm">
                {dettaglioVoci.map((voce, i) => (
                  <p key={i} className="text-gray-700">{voce}</p>
                ))}
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                {[
                  { label: 'Titolo di Studio (base 10)', value: risultato.titoloStudio, color: 'bg-blue-100 text-brand-blu' },
                  { label: 'Cert. Informatiche Extra', value: risultato.certificazioniInformatiche, color: 'bg-purple-100 text-purple-700' },
                  { label: 'Laurea Specialistica', value: risultato.laurea, color: 'bg-green-100 text-brand-verde' },
                  { label: 'Qualifiche Professionali', value: risultato.qualificheProfessionali, color: 'bg-teal-100 text-brand-ottanio' },
                  { label: 'Servizio Statale', value: risultato.servizioStatale, color: 'bg-amber-100 text-amber-700' },
                  { label: 'Servizio Paritario/EL (decurtato 50%)', value: risultato.servizioParitario, color: 'bg-orange-100 text-orange-700' },
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

              <div className="flex gap-3 flex-wrap">
                <button onClick={salvaSuSupabase}
                  className="flex-1 min-w-[160px] py-3 bg-brand-verde text-white rounded-2xl font-semibold hover:bg-brand-verde/90 transition">
                  {salvataggioOK ? '✓ Salvato!' : 'Salva nel tuo profilo'}
                </button>
                <button onClick={scaricaPDF}
                  className="flex-1 min-w-[160px] py-3 bg-brand-blu text-white rounded-2xl font-semibold hover:bg-brand-blu/90 transition">
                  Scarica Report PDF
                </button>
                <button onClick={() => { setCurrentStep(0); setRisultato(null); setDettaglioVoci([]); setServizi([]); setCiad(false); setErroreCIAD(false); }}
                  className="flex-1 min-w-[160px] py-3 border-2 border-brand-verde text-brand-verde rounded-2xl font-semibold hover:bg-brand-verde/5 transition">
                  Nuovo Calcolo
                </button>
              </div>
            </div>
          )}

          {/* Navigation Buttons */}
          <div className="flex justify-between mt-8">
            <button onClick={() => setCurrentStep(i => Math.max(0, i - 1))} disabled={currentStep === 0}
              className="px-6 py-2 border border-gray-300 rounded-2xl text-gray-600 hover:bg-gray-50 disabled:opacity-30 transition">
              ← Indietro
            </button>
            {currentStep < STEPS.length - 2 ? (
              <button onClick={() => setCurrentStep(i => i + 1)}
                className="px-6 py-2 bg-brand-verde text-white rounded-2xl hover:bg-brand-verde/90 transition font-medium">
                Avanti →
              </button>
            ) : currentStep === STEPS.length - 2 ? (
              <button onClick={calcola}
                className="px-8 py-3 bg-gradient-to-r from-brand-verde to-brand-ottanio text-white rounded-2xl hover:opacity-90 transition font-bold text-lg shadow-lg">
                Calcola Punteggio
              </button>
            ) : null}
          </div>
        </div>
      </div>
    </div>
  );
}
