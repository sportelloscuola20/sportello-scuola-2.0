import { useState, useCallback } from 'react';
import { jsPDF } from 'jspdf';
import { supabase } from '../lib/supabaseClient';
import type { ATACalculationResult, ServizioATA } from '../types/database';

type ProfiloATA = 'AA' | 'AT' | 'CS' | 'OS' | 'GU' | 'CU' | 'IF';
type TipoVoto = 'centesimi' | 'giudizio';

const PROFILI: Record<ProfiloATA, { label: string; puntiMeseStesso: number; puntiMeseAltro: number; maxAnnuale: number; puntiMeseParitarioStesso: number; puntiMeseParitarioAltro: number; puntiEntiLocali: number; descrizione: string; bloccoCertOS?: boolean }> = {
  AA: { label: 'Assistente Amministrativo', puntiMeseStesso: 0.50, puntiMeseAltro: 0.15, maxAnnuale: 6, puntiMeseParitarioStesso: 0.25, puntiMeseParitarioAltro: 0.075, puntiEntiLocali: 0.05, descrizione: 'Gestione contabilità, protocollo e segreteria didattica' },
  AT: { label: 'Assistente Tecnico', puntiMeseStesso: 0.50, puntiMeseAltro: 0.15, maxAnnuale: 6, puntiMeseParitarioStesso: 0.25, puntiMeseParitarioAltro: 0.075, puntiEntiLocali: 0.05, descrizione: 'Supporto tecnico-laboratoriale e manutenzione strumenti' },
  CU: { label: 'Cuoco', puntiMeseStesso: 0.50, puntiMeseAltro: 0.15, maxAnnuale: 6, puntiMeseParitarioStesso: 0.25, puntiMeseParitarioAltro: 0.075, puntiEntiLocali: 0.05, descrizione: 'Preparazione pasti nelle scuole con servizio mensa' },
  IF: { label: 'Infermiere', puntiMeseStesso: 0.50, puntiMeseAltro: 0.15, maxAnnuale: 6, puntiMeseParitarioStesso: 0.25, puntiMeseParitarioAltro: 0.075, puntiEntiLocali: 0.05, descrizione: 'Assistenza sanitaria e somministrazione farmaci' },
  CS: { label: 'Collaboratore Scolastico', puntiMeseStesso: 0.60, puntiMeseAltro: 0.15, maxAnnuale: 7.2, puntiMeseParitarioStesso: 0.30, puntiMeseParitarioAltro: 0.075, puntiEntiLocali: 0.05, descrizione: 'Sorveglianza, pulizia e supporto alunni con disabilità' },
  OS: { label: 'Operatore Scolastico', puntiMeseStesso: 0.60, puntiMeseAltro: 0.15, maxAnnuale: 7.2, puntiMeseParitarioStesso: 0.30, puntiMeseParitarioAltro: 0.075, puntiEntiLocali: 0.05, descrizione: 'Nuovo profilo DM 89/2024; certificazioni informatiche oltre CIAD non valutabili', bloccoCertOS: true },
  GU: { label: 'Guardarobiere', puntiMeseStesso: 0.60, puntiMeseAltro: 0.15, maxAnnuale: 7.2, puntiMeseParitarioStesso: 0.30, puntiMeseParitarioAltro: 0.075, puntiEntiLocali: 0.05, descrizione: 'Gestione e manutenzione corredi e divise' },
};

const STEPS = ['Profilo', 'Titolo Studio', 'Requisiti', 'Servizi', 'Riepilogo'];

const VOTI_CENTESIMI = Array.from({ length: 41 }, (_, i) => i + 60);

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

function calcolaPuntiServizioATA(servizi: ServizioATA[], profiloData: typeof PROFILI[keyof typeof PROFILI]): {
  stessoProfilo: number; altroProfilo: number; paritarioStesso: number;
  paritarioAltro: number; entiLocali: number; dettagli: string[];
} {
  const perAnno: Record<string, { stesso: number; altro: number; parStesso: number; parAltro: number; enti: number }> = {};
  const dettagli: string[] = [];

  for (const s of servizi) {
    const anno = s.annoScolastico;
    if (!perAnno[anno]) perAnno[anno] = { stesso: 0, altro: 0, parStesso: 0, parAltro: 0, enti: 0 };
    const giorni = calcolaGiorni(s.dataInizio, s.dataFine);
    const mesi = giorniAMesiFrazione(giorni);

    switch (s.tipo) {
      case 'stesso_profilo_statale': {
        const pt = mesi * profiloData.puntiMeseStesso;
        perAnno[anno].stesso += pt;
        dettagli.push(`${anno}: ${giorni}gg (${mesi} mesi) stesso profilo statale → ${pt.toFixed(2)} pt [0.50 pt/mese]`);
        break;
      }
      case 'altro_profilo_statale': {
        const pt = mesi * profiloData.puntiMeseAltro;
        perAnno[anno].altro += pt;
        dettagli.push(`${anno}: ${giorni}gg (${mesi} mesi) altro profilo ATA/docente → ${pt.toFixed(2)} pt [0.15 pt/mese]`);
        break;
      }
      case 'stesso_profilo_paritario': {
        const pt = mesi * profiloData.puntiMeseParitarioStesso;
        perAnno[anno].parStesso += pt;
        dettagli.push(`${anno}: ${giorni}gg (${mesi} mesi) stesso profilo paritario → ${pt.toFixed(2)} pt [0.25 pt/mese - decurtaz. 50%]`);
        break;
      }
      case 'altro_profilo_paritario': {
        const pt = mesi * profiloData.puntiMeseParitarioAltro;
        perAnno[anno].parAltro += pt;
        dettagli.push(`${anno}: ${giorni}gg (${mesi} mesi) altro profilo paritario → ${pt.toFixed(2)} pt [0.075 pt/mese]`);
        break;
      }
      case 'enti_locali': {
        const pt = mesi * profiloData.puntiEntiLocali;
        perAnno[anno].enti += pt;
        dettagli.push(`${anno}: ${giorni}gg (${mesi} mesi) enti locali/Poste → ${pt.toFixed(2)} pt [0.05 pt/mese]`);
        break;
      }
    }
  }

  let totStesso = 0, totAltro = 0, totParStesso = 0, totParAltro = 0, totEnti = 0;
  for (const a of Object.values(perAnno)) {
    totStesso += Math.min(a.stesso, profiloData.maxAnnuale);
    totAltro += Math.min(a.altro, profiloData.maxAnnuale);
    totParStesso += Math.min(a.parStesso, profiloData.maxAnnuale);
    totParAltro += Math.min(a.parAltro, profiloData.maxAnnuale);
    totEnti += Math.min(a.enti, 0.60);
  }

  return {
    stessoProfilo: Math.round(totStesso * 100) / 100,
    altroProfilo: Math.round(totAltro * 100) / 100,
    paritarioStesso: Math.round(totParStesso * 100) / 100,
    paritarioAltro: Math.round(totParAltro * 100) / 100,
    entiLocali: Math.round(totEnti * 100) / 100,
    dettagli,
  };
}

export default function ATASimulator() {
  const [currentStep, setCurrentStep] = useState(0);
  const [profilo, setProfilo] = useState<ProfiloATA>('AA');
  const [tipoVoto, setTipoVoto] = useState<TipoVoto>('centesimi');
  const [votoCentesimi, setVotoCentesimi] = useState(100);
  const [giudizio, setGiudizio] = useState<'sufficiente' | 'buono' | 'distinto' | 'ottimo'>('sufficiente');
  const [ciad, setCiad] = useState(false);
  const [erroreCIAD, setErroreCIAD] = useState(false);
  const [certInfoExtra, setCertInfoExtra] = useState<number>(0);
  const [haLaurea, setHaLaurea] = useState(false);
  const [qualificaProf, setQualificaProf] = useState(false);
  const [idoneitaConcorso, setIdoneitaConcorso] = useState(false);
  const [servizi, setServizi] = useState<ServizioATA[]>([]);
  const [risultato, setRisultato] = useState<ATACalculationResult | null>(null);
  const [salvataggioOK, setSalvataggioOK] = useState(false);
  const [dettaglioVoci, setDettaglioVoci] = useState<string[]>([]);

  const profiloData = PROFILI[profilo];
  const isOS = profilo === 'OS';
  const isCS = profilo === 'CS';

  const votoCalcolato = tipoVoto === 'centesimi'
    ? Math.round((votoCentesimi / 100) * 10 * 100) / 100
    : giudizio === 'sufficiente' ? 6 : giudizio === 'buono' ? 7 : giudizio === 'distinto' ? 8 : 9;

  const progressPercent = ((currentStep + 1) / STEPS.length) * 100;

  const addServizio = useCallback(() => {
    setServizi(prev => [...prev, { id: crypto.randomUUID(), dataInizio: '', dataFine: '', tipo: 'stesso_profilo_statale', annoScolastico: '2025/2026' }]);
  }, []);

  const removeServizio = useCallback((id: string) => {
    setServizi(prev => prev.filter(s => s.id !== id));
  }, []);

  const updateServizio = useCallback((id: string, field: keyof ServizioATA, value: string) => {
    setServizi(prev => prev.map(s => s.id === id ? { ...s, [field]: value } : s));
  }, []);

  const calcola = useCallback(() => {
    if (!ciad) { setErroreCIAD(true); return; }
    setErroreCIAD(false);

    const voci: string[] = [];
    const titStudio = votoCalcolato;
    voci.push(`Titolo di studio: ${tipoVoto === 'centesimi' ? `${votoCentesimi}/100` : giudizio} → ${titStudio} pt (base 10)`);

    const certInfoMax = isOS ? 0 : 1;
    const certInfoPt = Math.min(certInfoExtra, certInfoMax) * 0.25;
    if (isOS) {
      voci.push('Certificazioni informatiche extra oltre CIAD: 0 pt (non valutabili per profilo OS — DM 89/2024)');
    } else if (certInfoPt > 0) {
      voci.push(`Certificazione informatica extra ×1: +${certInfoPt} pt`);
    }

    const laureaPt = haLaurea ? 2 : 0;
    if (laureaPt > 0) voci.push('Laurea specialistica/magistrale: +2 pt');

    const qualificaPt = qualificaProf ? 1 : 0;
    if (qualificaPt > 0) voci.push('Qualifica professionale regionale: +1 pt');

    let idoneitaPt = 0;
    if (isCS && idoneitaConcorso) { idoneitaPt = 1; voci.push('Idoneità concorso pubblico CS: +1 pt'); }

    const serv = calcolaPuntiServizioATA(servizi, profiloData);
    voci.push(...serv.dettagli);

    const totale = titStudio + certInfoPt + laureaPt + qualificaPt + idoneitaPt
      + serv.stessoProfilo + serv.altroProfilo + serv.paritarioStesso + serv.paritarioAltro + serv.entiLocali;

    const result: ATACalculationResult = {
      titoloStudio: Math.round(titStudio * 100) / 100,
      ciad: true,
      certificazioniInformatiche: Math.round(certInfoPt * 100) / 100,
      laurea: laureaPt,
      qualificheProfessionali: qualificaPt,
      idoneitaConcorso: idoneitaPt,
      servizioStessoProfilo: serv.stessoProfilo,
      servizioAltroProfilo: serv.altroProfilo,
      servizioParitarioStesso: serv.paritarioStesso,
      servizioParitarioAltro: serv.paritarioAltro,
      servizioEntiLocali: serv.entiLocali,
      punteggioTotale: Math.round(totale * 100) / 100,
    };

    setDettaglioVoci(voci);
    setRisultato(result);
    setCurrentStep(STEPS.length - 1);
  }, [ciad, votoCalcolato, tipoVoto, votoCentesimi, giudizio, certInfoExtra, haLaurea, qualificaProf, idoneitaConcorso, servizi, profiloData, isOS, isCS]);

  const salvaSuSupabase = useCallback(async () => {
    if (!risultato) return;
    const { data: { session } } = await supabase.auth.getSession();
    const userId = session?.user?.id || crypto.randomUUID();
    const { error } = await supabase.from('user_scores').insert({
      user_id: userId, tipo_graduatoria: 'ata', fascia: 'III',
      classe_concorso: profiloData.label, punteggio_totale: risultato.punteggioTotale, dettagli_calcolo: risultato,
    });
    if (!error) setSalvataggioOK(true);
  }, [risultato, profiloData]);

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
    doc.text(`Report: ${reportCode}  |  Data: ${now.toLocaleDateString('it-IT')}  |  ${now.toLocaleTimeString('it-IT')}`, margin, y);
    y += 6;
    doc.setDrawColor('#235377');
    doc.setLineWidth(0.5);
    doc.line(margin, y, pageWidth - margin, y);
    y += 8;

    doc.setFontSize(11);
    doc.setTextColor('#235377');
    doc.text('Report Valutazione Punteggio ATA — III Fascia (DM 89/2024)', margin, y);
    y += 8;

    doc.setFontSize(10);
    doc.setFillColor('#F7FAFC');
    doc.rect(margin, y, contentWidth, 18, 'F');
    doc.setDrawColor('#235377');
    doc.setLineWidth(0.3);
    doc.rect(margin, y, contentWidth, 18, 'S');
    doc.setTextColor('#333');
    doc.setFontSize(9);
    doc.text(`Graduatoria: ATA III Fascia  |  Profilo: ${profiloData.label} (${profilo})`, margin + 3, y + 7);
    doc.text(`Report generato il: ${now.toLocaleDateString('it-IT')} alle ${now.toLocaleTimeString('it-IT')}`, margin + 3, y + 14);
    y += 24;

    doc.setFontSize(8);
    doc.setTextColor('#235377');
    doc.setFont('helvetica', 'bold');
    doc.text('Macro-Area', margin, y);
    doc.text('Voce', margin + 40, y);
    doc.text('Punteggio', margin + 140, y);
    y += 1;
    doc.setDrawColor('#CBD5E0');
    doc.line(margin, y, pageWidth - margin, y);
    y += 4;
    doc.setFont('helvetica', 'normal');
    doc.setTextColor('#555');
    let rowNum = 0;
    for (const voce of dettaglioVoci) {
      if (y > 255) { doc.addPage(); y = margin; doc.setTextColor('#555'); }
      if (rowNum % 2 === 0) {
        doc.setFillColor('#F7FAFC');
        doc.rect(margin, y - 2.5, contentWidth, 7, 'F');
      }
      const label = voce.split(':')[0];
      const valore = voce.split(':').slice(1).join(':') || '';
      doc.setFontSize(7);
      doc.text(label, margin + 2, y);
      doc.text(valore, margin + 42, y);
      const ptMatch = voce.match(/[\+\-]?\d+(\.\d+)?\s*pt/);
      if (ptMatch) doc.text(ptMatch[0], margin + 142, y);
      y += 6;
      rowNum++;
    }

    y += 6;
    if (y > 250) { doc.addPage(); y = margin; }
    doc.setFillColor('#1F915E');
    doc.rect(margin, y, contentWidth, 14, 'F');
    doc.setTextColor('#FFFFFF');
    doc.setFontSize(13);
    doc.setFont('helvetica', 'bold');
    doc.text(`PUNTEGGIO TOTALE SIMULATO: ${risultato.punteggioTotale} PUNTI`, margin + 5, y + 9);
    y += 20;

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
  }, [risultato, profilo, profiloData, dettaglioVoci]);

  const tipoServizioOptions: { value: ServizioATA['tipo']; label: string; ptMese: string }[] = [
    { value: 'stesso_profilo_statale', label: 'Stesso profilo — Scuola Statale', ptMese: `${profiloData.puntiMeseStesso} pt/mese` },
    { value: 'altro_profilo_statale', label: 'Altro profilo ATA/Docente — Scuola Statale', ptMese: `${profiloData.puntiMeseAltro} pt/mese` },
    { value: 'stesso_profilo_paritario', label: 'Stesso profilo — Scuola Paritaria/EL', ptMese: `${profiloData.puntiMeseParitarioStesso} pt/mese (decurtaz. 50%)` },
    { value: 'altro_profilo_paritario', label: 'Altro profilo — Scuola Paritaria/EL', ptMese: `${profiloData.puntiMeseParitarioAltro} pt/mese` },
    { value: 'enti_locali', label: 'Enti Locali / Poste Italiane', ptMese: `${profiloData.puntiEntiLocali} pt/mese (max 0.60/anno)` },
  ];

  return (
    <div className="min-h-screen py-8 px-4">
      <div className="max-w-4xl mx-auto">
        <div className="text-center mb-8">
          <h1 className="text-3xl font-bold text-[#0F172A] mb-2">Simulatore ATA Terza Fascia — D.M. 89/2024</h1>
          <p className="text-gray-600">Calcolo completo del punteggio per tutti i profili ATA, con decurtazioni 50% e servizi enti locali — dati inseriti solo a tendina</p>
        </div>

        <div className="mb-8">
          <div className="flex justify-between mb-2 overflow-x-auto">
            {STEPS.map((step, i) => (
              <button key={step} onClick={() => { if (i < currentStep) setCurrentStep(i); }}
                className={`flex-1 text-xs sm:text-sm font-medium py-2 px-1 border-b-2 transition-all duration-200 ${
                  i === currentStep ? 'border-brand-verde text-brand-verde' : i < currentStep ? 'border-brand-ottanio text-brand-ottanio' : 'border-slate-200 text-gray-400'
                }`}>{step}</button>
            ))}
          </div>
          <div className="h-1 bg-gray-100 rounded-full overflow-hidden">
            <div className="h-full bg-gradient-to-r from-brand-verde to-brand-ottanio transition-all duration-500" style={{ width: `${progressPercent}%` }} />
          </div>
        </div>

        <div className="bg-white/70 backdrop-blur-md rounded-3xl shadow-soft border border-slate-200/60 p-6 sm:p-8">

          {currentStep === 0 && (
            <div className="space-y-6">
              <h2 className="text-xl font-semibold text-brand-verde">Seleziona il Profilo Professionale</h2>
              <p className="text-sm text-gray-500">Scegli il profilo per il quale intendi calcolare il punteggio in graduatoria III Fascia ATA</p>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                {Object.entries(PROFILI).map(([key, val]) => (
                  <button key={key} onClick={() => setProfilo(key as ProfiloATA)}
                    className={`p-4 rounded-2xl border-2 text-left transition-all ${profilo === key ? 'border-brand-verde bg-brand-verde/5' : 'border-slate-200 hover:border-brand-verde/50'}`}>
                    <span className="font-bold text-brand-verde text-lg">{key}</span>
                    <span className="ml-2 text-sm text-gray-600">— {val.label}</span>
                    <p className="text-xs text-gray-500 mt-1">{val.descrizione}</p>
                    <div className="flex flex-wrap gap-2 mt-2">
                      <span className="text-xs px-2 py-0.5 bg-blue-100 text-blue-700 rounded-full">{val.puntiMeseStesso} pt/mese stesso profilo</span>
                      <span className="text-xs px-2 py-0.5 bg-amber-100 text-amber-700 rounded-full">max {val.maxAnnuale}/anno</span>
                      <span className="text-xs px-2 py-0.5 bg-teal-100 text-teal-700 rounded-full">{val.puntiMeseParitarioStesso} pt/mese paritario</span>
                    </div>
                  </button>
                ))}
              </div>
            </div>
          )}

          {currentStep === 1 && (
            <div className="space-y-6">
              <h2 className="text-xl font-semibold text-brand-verde">Titolo di Studio</h2>
              <p className="text-sm text-gray-500">Inserisci il voto del tuo titolo di studio. Puoi scegliere tra voto in centesimi o giudizio letterale.</p>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Tipo di voto</label>
                <select value={tipoVoto} onChange={e => setTipoVoto(e.target.value as TipoVoto)}
                  className="w-full border border-slate-200 rounded-2xl px-4 py-3 focus:ring-2 focus:ring-brand-verde transition bg-white">
                  <option value="centesimi">Voto in Centesimi (Base 100)</option>
                  <option value="giudizio">Giudizio Letterale (vecchio ordinamento)</option>
                </select>
              </div>

              {tipoVoto === 'centesimi' ? (
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Voto del titolo di studio (centesimi)</label>
                  <select value={votoCentesimi} onChange={e => setVotoCentesimi(Number(e.target.value))}
                    className="w-full border border-slate-200 rounded-2xl px-4 py-3 focus:ring-2 focus:ring-brand-verde transition bg-white">
                    {VOTI_CENTESIMI.map(v => <option key={v} value={v}>{v}/100</option>)}
                  </select>
                </div>
              ) : (
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Giudizio letterale</label>
                  <select value={giudizio} onChange={e => setGiudizio(e.target.value as typeof giudizio)}
                    className="w-full border border-slate-200 rounded-2xl px-4 py-3 focus:ring-2 focus:ring-brand-verde transition bg-white">
                    <option value="sufficiente">Sufficiente — 6.00 pt</option>
                    <option value="buono">Buono — 7.00 pt</option>
                    <option value="distinto">Distinto — 8.00 pt</option>
                    <option value="ottimo">Ottimo — 9.00 pt</option>
                  </select>
                </div>
              )}

              <div className="p-4 bg-green-50 rounded-2xl">
                <p className="text-brand-verde font-semibold">
                  Voto convertito su base 10: <span className="text-2xl">{votoCalcolato}</span> punti
                </p>
                <p className="text-xs text-gray-500 mt-1">
                  {tipoVoto === 'centesimi' ? `Formula: ${votoCentesimi}/100 × 10` : `Giudizio: ${giudizio}`}
                </p>
              </div>

              <div className="border-t border-slate-200 pt-6">
                <h3 className="font-semibold text-gray-800 mb-4">Titoli Aggiuntivi Valutabili</h3>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <label className="flex items-center gap-3 p-4 border border-slate-200 rounded-2xl hover:border-brand-verde/30 cursor-pointer transition">
                    <input type="checkbox" checked={haLaurea} onChange={e => setHaLaurea(e.target.checked)}
                      className="h-5 w-5 rounded border-gray-300 text-brand-verde focus:ring-brand-verde" />
                    <div>
                      <p className="text-sm font-medium text-gray-800">Laurea Specialistica/Magistrale</p>
                      <p className="text-xs text-brand-verde font-semibold">+2 pt</p>
                    </div>
                  </label>
                  <label className="flex items-center gap-3 p-4 border border-slate-200 rounded-2xl hover:border-brand-verde/30 cursor-pointer transition">
                    <input type="checkbox" checked={qualificaProf} onChange={e => setQualificaProf(e.target.checked)}
                      className="h-5 w-5 rounded border-gray-300 text-brand-verde focus:ring-brand-verde" />
                    <div>
                      <p className="text-sm font-medium text-gray-800">Qualifica Professionale Regionale</p>
                      <p className="text-xs text-brand-verde font-semibold">+1 pt</p>
                    </div>
                  </label>
                  {isCS && (
                    <label className="flex items-center gap-3 p-4 border border-slate-200 rounded-2xl hover:border-brand-verde/30 cursor-pointer transition">
                      <input type="checkbox" checked={idoneitaConcorso} onChange={e => setIdoneitaConcorso(e.target.checked)}
                        className="h-5 w-5 rounded border-gray-300 text-brand-verde focus:ring-brand-verde" />
                      <div>
                        <p className="text-sm font-medium text-gray-800">Idoneità concorso pubblico CS</p>
                        <p className="text-xs text-brand-verde font-semibold">+1 pt</p>
                      </div>
                    </label>
                  )}
                </div>
              </div>
            </div>
          )}

          {currentStep === 2 && (
            <div className="space-y-6">
              <h2 className="text-xl font-semibold text-brand-verde">Requisiti di Accesso e Certificazioni</h2>
              <p className="text-sm text-gray-500">La CIAD è requisito obbligatorio per l'accesso alla III Fascia ATA. {isOS ? 'Per il profilo OS le certificazioni informatiche extra non sono valutabili.' : 'Le certificazioni informatiche extra sono valutabili max 1 (0.25 pt).'}</p>

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
                    <p className="text-red-700 text-sm font-bold">⚠ Il calcolo non può procedere senza CIAD.</p>
                  </div>
                )}
              </div>

              <div className="border-t border-slate-200 pt-6">
                <h3 className="font-semibold text-gray-800 mb-4">Certificazioni Informatiche Extra</h3>
                {isOS ? (
                  <div className="p-4 bg-gray-100 rounded-2xl">
                    <p className="text-sm text-gray-600">Per il profilo di Operatore Scolastico (OS) le certificazioni informatiche oltre la CIAD non sono valutabili (DM 89/2024).</p>
                  </div>
                ) : (
                  <>
                    <p className="text-xs text-gray-500 mb-3">Valutabile massimo 1 certificazione oltre la CIAD — +0.25 pt</p>
                    <select value={certInfoExtra} onChange={e => setCertInfoExtra(Number(e.target.value))}
                      className="w-full border border-slate-200 rounded-2xl px-4 py-3 focus:ring-2 focus:ring-brand-verde transition bg-white">
                      {[0, 1].map(v => <option key={v} value={v}>{v} certificazione{v > 0 ? '' : 'i'} oltre CIAD — {v * 0.25} pt</option>)}
                    </select>
                  </>
                )}
              </div>
            </div>
          )}

          {currentStep === 3 && (
            <div className="space-y-6">
              <h2 className="text-xl font-semibold text-brand-verde">Servizi Scolastici Prestati</h2>
              <p className="text-sm text-gray-500">Inserisci i periodi di servizio. La frazione &gt;15 giorni vale 1 mese intero. Tetto massimo annuale: {profiloData.maxAnnuale} pt.</p>

              <div className="p-4 bg-teal-50 rounded-2xl">
                <p className="text-sm text-brand-ottanio font-medium">
                  {profiloData.label}: {profiloData.puntiMeseStesso} pt/mese stesso profilo statale | {profiloData.puntiMeseParitarioStesso} pt/mese paritario (decurtaz. 50%) | {profiloData.puntiMeseAltro} pt/mese altro profilo | {profiloData.puntiEntiLocali} pt/mese enti locali
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
                const opt = tipoServizioOptions.find(o => o.value === s.tipo);
                const ptMese = opt ? parseFloat(opt.ptMese) : 0;
                const puntiPeriodo = mesi * ptMese;
                return (
                  <div key={s.id} className="p-4 border border-slate-200 rounded-2xl space-y-3 relative">
                    <button onClick={() => removeServizio(s.id)}
                      className="absolute top-2 right-2 text-red-400 hover:text-red-600 text-sm transition">✕ Rimuovi</button>
                    <h4 className="font-medium text-brand-ottanio text-sm">Periodo {idx + 1}</h4>
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                      <div>
                        <label className="block text-xs font-medium text-gray-600 mb-1">Data Inizio</label>
                        <input type="date" value={s.dataInizio}
                          onChange={e => updateServizio(s.id, 'dataInizio', e.target.value)}
                          className="w-full border border-slate-200 rounded-xl px-3 py-2 text-sm focus:ring-2 focus:ring-brand-verde transition bg-white" />
                      </div>
                      <div>
                        <label className="block text-xs font-medium text-gray-600 mb-1">Data Fine</label>
                        <input type="date" value={s.dataFine}
                          onChange={e => updateServizio(s.id, 'dataFine', e.target.value)}
                          className="w-full border border-slate-200 rounded-xl px-3 py-2 text-sm focus:ring-2 focus:ring-brand-verde transition bg-white" />
                      </div>
                      <div>
                        <label className="block text-xs font-medium text-gray-600 mb-1">Tipo Servizio</label>
                        <select value={s.tipo}
                          onChange={e => updateServizio(s.id, 'tipo', e.target.value)}
                          className="w-full border border-slate-200 rounded-xl px-3 py-2 text-sm focus:ring-2 focus:ring-brand-verde transition bg-white">
                          {tipoServizioOptions.map(o => (
                            <option key={o.value} value={o.value}>{o.label} — {o.ptMese}</option>
                          ))}
                        </select>
                      </div>
                      <div>
                        <label className="block text-xs font-medium text-gray-600 mb-1">Anno Scolastico</label>
                        <select value={s.annoScolastico}
                          onChange={e => updateServizio(s.id, 'annoScolastico', e.target.value)}
                          className="w-full border border-slate-200 rounded-xl px-3 py-2 text-sm focus:ring-2 focus:ring-brand-verde transition bg-white">
                          {['2023/2024', '2024/2025', '2025/2026', '2026/2027', '2027/2028'].map(a => <option key={a} value={a}>{a}</option>)}
                        </select>
                      </div>
                    </div>
                    {mesi > 0 && (
                      <p className="text-xs text-gray-500">
                        {giorni}gg → {mesi} mesi × {ptMese.toFixed(3)} pt/mese = {puntiPeriodo.toFixed(2)} pt
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

          {currentStep === 4 && risultato && (
            <div className="space-y-6">
              <h2 className="text-xl font-semibold text-brand-verde">Riepilogo Punteggio ATA — III Fascia</h2>
              <p className="text-sm text-gray-500">Dettaglio analitico del calcolo per il profilo {profiloData.label}</p>

              <div className="bg-gray-50 rounded-2xl p-4 space-y-2 text-sm">
                {dettaglioVoci.map((voce, i) => (
                  <p key={i} className="text-gray-700">{voce}</p>
                ))}
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                {[
                  { label: 'Titolo di Studio (base 10)', value: risultato.titoloStudio, color: 'bg-blue-100 text-brand-blu' },
                  { label: 'Cert. Informatiche Extra', value: risultato.certificazioniInformatiche, color: 'bg-purple-100 text-purple-700' },
                  { label: 'Laurea Specialistica', value: risultato.laurea, color: 'bg-green-100 text-green-700' },
                  { label: 'Qualifiche Professionali', value: risultato.qualificheProfessionali, color: 'bg-teal-100 text-teal-700' },
                  ...(isCS ? [{ label: 'Idoneità Concorso CS', value: risultato.idoneitaConcorso, color: 'bg-amber-100 text-amber-700' as const }] : []),
                  { label: 'Servizio stesso profilo statale', value: risultato.servizioStessoProfilo, color: 'bg-blue-100 text-blue-700' },
                  { label: 'Servizio altro profilo statale', value: risultato.servizioAltroProfilo, color: 'bg-cyan-100 text-cyan-700' },
                  { label: 'Servizio paritario stesso profilo', value: risultato.servizioParitarioStesso, color: 'bg-teal-100 text-teal-700' },
                  { label: 'Servizio paritario altro profilo', value: risultato.servizioParitarioAltro, color: 'bg-orange-100 text-orange-700' },
                  { label: 'Servizio Enti Locali/Poste', value: risultato.servizioEntiLocali, color: 'bg-amber-100 text-amber-700' },
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

          <div className="flex justify-between mt-8">
            <button onClick={() => setCurrentStep(i => Math.max(0, i - 1))} disabled={currentStep === 0}
              className="px-6 py-2 border border-slate-200 rounded-2xl text-gray-600 hover:bg-gray-50 disabled:opacity-30 transition">
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
