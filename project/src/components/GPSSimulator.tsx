import { useState, useCallback, useMemo } from 'react';
import { jsPDF } from 'jspdf';
import { supabase } from '../lib/supabaseClient';
import type { GPSCalculationResult, ServizioScolastico } from '../types/database';

type FasciaType = 'I' | 'II';
type TabellaType = 'A1' | 'A2' | 'A3' | 'A4' | 'A5' | 'A6' | 'A7' | 'A8' | 'A9' | 'A10';

const TABELLE: Record<TabellaType, { label: string; fascia: FasciaType; grado: string }> = {
  A1: { label: 'Infanzia / Primaria - I Fascia', fascia: 'I', grado: 'infanzia_primaria' },
  A2: { label: 'Scienze della Formazione Primaria', fascia: 'I', grado: 'infanzia_primaria' },
  A3: { label: 'Secondaria I e II Grado - I Fascia', fascia: 'I', grado: 'secondaria' },
  A4: { label: 'Secondaria I e II Grado - II Fascia', fascia: 'II', grado: 'secondaria' },
  A5: { label: 'ITP - I Fascia', fascia: 'I', grado: 'itp' },
  A6: { label: 'ITP - II Fascia', fascia: 'II', grado: 'itp' },
  A7: { label: 'Sostegno - I Fascia', fascia: 'I', grado: 'sostegno' },
  A8: { label: 'Sostegno - II Fascia', fascia: 'II', grado: 'sostegno' },
  A9: { label: 'Personale Educativo - I Fascia', fascia: 'I', grado: 'educativo' },
  A10: { label: 'Personale Educativo - II Fascia', fascia: 'II', grado: 'educativo' },
};

const STEPS = ['Tabella', 'Titolo Accesso', 'Punti Aggiuntivi', 'Titoli Culturali', 'Servizi', 'Riepilogo'];

function calcolaVoto100(voto: number, base: number): number {
  const rapportato = (voto / base) * 100;
  const arrotondato = Math.ceil(rapportato * 2) / 2;
  if (arrotondato >= 96) return 12;
  if (arrotondato >= 91) return 11;
  if (arrotondato >= 86) return 9;
  if (arrotondato >= 81) return 8;
  if (arrotondato >= 76) return 7;
  if (arrotondato >= 71) return 6;
  if (arrotondato >= 66) return 5;
  if (arrotondato >= 60) return 4;
  return 0;
}

function calcolaVoto110(voto: number, lode: boolean): number {
  if (voto <= 66) return 12;
  let punti = 12 + (voto - 76) * 0.5;
  if (lode) punti += 4;
  return Math.min(punti, 33);
}

function calcolaVotoSostegnoI(voto: number, base: number): number {
  const r = (voto / base) * 100;
  if (r >= 96) return 24;
  if (r >= 91) return 22;
  if (r >= 86) return 18;
  if (r >= 81) return 16;
  if (r >= 76) return 14;
  if (r >= 71) return 12;
  if (r >= 66) return 10;
  if (r >= 60) return 8;
  return 8;
}

function calcolaVotoSFP(media: number): number {
  const m = Math.round(media);
  if (m >= 30) return 12;
  if (m === 29) return 11;
  if (m === 28) return 10;
  if (m === 27) return 9;
  if (m === 26) return 8;
  if (m === 25) return 7;
  if (m === 24) return 6;
  return 0;
}

function calcolaGiorniServizio(inizio: string, fine: string): number {
  const d1 = new Date(inizio);
  const d2 = new Date(fine);
  return Math.max(0, Math.ceil((d2.getTime() - d1.getTime()) / (1000 * 60 * 60 * 24)) + 1);
}

function giorniAMesi(giorni: number): { specifico: number; nonSpecifico: number } {
  if (giorni >= 166) return { specifico: 12, nonSpecifico: 6 };
  if (giorni >= 136) return { specifico: 10, nonSpecifico: 5 };
  if (giorni >= 106) return { specifico: 8, nonSpecifico: 4 };
  if (giorni >= 76) return { specifico: 6, nonSpecifico: 3 };
  if (giorni >= 46) return { specifico: 4, nonSpecifico: 2 };
  if (giorni >= 16) return { specifico: 2, nonSpecifico: 1 };
  return { specifico: 0, nonSpecifico: 0 };
}

function calcolaPunteggioServizioGPS(servizi: ServizioScolastico[]): { specifico: number; nonSpecifico: number; dettagli: string[] } {
  const perAnno: Record<string, { specifico: number; nonSpecifico: number }> = {};
  const dettagli: string[] = [];

  for (const s of servizi) {
    const anno = s.annoScolastico;
    if (!perAnno[anno]) perAnno[anno] = { specifico: 0, nonSpecifico: 0 };
    const giorni = calcolaGiorniServizio(s.dataInizio, s.dataFine);
    const punti = giorniAMesi(giorni);
    if (s.tipo === 'specifico') {
      perAnno[anno].specifico += punti.specifico;
      dettagli.push(`${anno}: ${giorni}gg (specifico) → ${punti.specifico} pt [C.1]`);
    } else {
      perAnno[anno].nonSpecifico += punti.nonSpecifico;
      dettagli.push(`${anno}: ${giorni}gg (non specifico) → ${punti.nonSpecifico} pt [C.2]`);
    }
  }

  let totSpec = 0;
  let totNonSpec = 0;
  for (const a of Object.values(perAnno)) {
    totSpec += Math.min(a.specifico, 12);
    totNonSpec += Math.min(a.nonSpecifico, 6);
  }

  return { specifico: totSpec, nonSpecifico: totNonSpec, dettagli };
}

export default function GPSSimulator() {
  const [currentStep, setCurrentStep] = useState(0);
  const [tabella, setTabella] = useState<TabellaType>('A1');
  const [voto, setVoto] = useState(100);
  const [baseVoto, setBaseVoto] = useState(100);
  const [lode, setLode] = useState(false);
  const [mediaSFP, setMediaSFP] = useState(24);
  const [mancaVoto, setMancaVoto] = useState(false);

  const [abilConcorso, setAbilConcorso] = useState(false);
  const [abilSSIS, setAbilSSIS] = useState(false);
  const [abilCFU, setAbilCFU] = useState(false);
  const [abilSFP, setAbilSFP] = useState(false);
  const [abilPAS, setAbilPAS] = useState(false);
  const [specSostegno, setSpecSostegno] = useState(false);

  const [b1, setB1] = useState(0);
  const [b2, setB2] = useState(0);
  const [b3, setB3] = useState(0);
  const [b4Specializzazioni, setB4Specializzazioni] = useState(0);
  const [b5TitoloSostegno, setB5TitoloSostegno] = useState(0);
  const [b6PhD, setB6PhD] = useState(false);
  const [b7ASN, setB7ASN] = useState(0);
  const [b8Ricerca, setB8Ricerca] = useState(0);
  const [b9AFAM, setB9AFAM] = useState(0);
  const [masterCount, setMasterCount] = useState(0);
  const [certLinguaLivello, setCertLinguaLivello] = useState<'nessuna' | 'B2' | 'C1' | 'C2'>('nessuna');
  const [haCLIL, setHaCLIL] = useState(false);
  const [certInfoCount, setCertInfoCount] = useState(0);
  const [servizi, setServizi] = useState<ServizioScolastico[]>([]);

  const [risultato, setRisultato] = useState<GPSCalculationResult | null>(null);
  const [salvataggioOK, setSalvataggioOK] = useState(false);
  const [dettaglioVoci, setDettaglioVoci] = useState<string[]>([]);

  const tabellaData = TABELLE[tabella];
  const isFasciaI = tabellaData.fascia === 'I';
  const isSostegno = tabellaData.grado === 'sostegno';
  const isSFP = tabella === 'A2';
  const isSecondaFasciaSostegno = tabella === 'A8';

  const calcolaTitoloAccesso = useCallback((): number => {
    if (mancaVoto) {
      if (isSostegno) return isFasciaI ? 8 : 12;
      return isFasciaI ? 8 : 12;
    }
    if (isSFP) return calcolaVotoSFP(mediaSFP);
    if (isSostegno && isFasciaI) return calcolaVotoSostegnoI(voto, baseVoto);
    if (isFasciaI || isSecondaFasciaSostegno) return calcolaVoto100(voto, baseVoto);
    return calcolaVoto110(voto, lode);
  }, [tabella, voto, baseVoto, lode, mediaSFP, mancaVoto, isFasciaI, isSostegno, isSFP, isSecondaFasciaSostegno]);

  const calcolaPuntiAggiuntivi = useCallback((): number => {
    if (!isFasciaI) return 0;
    let tot = 0;
    if (abilConcorso) tot += 24;
    if (abilSSIS) tot += 12;
    if (abilCFU) tot += 12;
    if (abilSFP) tot += 12;
    if (abilPAS) tot += 6;
    if (specSostegno) tot += 12;
    return tot;
  }, [isFasciaI, abilConcorso, abilSSIS, abilCFU, abilSFP, abilPAS, specSostegno]);

  const calcolaTitoliCulturali = useCallback((): number => {
    let dettagli: string[] = [];
    let tot = 0;

    const b1pt = b1 * 3;
    if (b1pt > 0) { tot += b1pt; dettagli.push(`B.1 Superamento concorso: +${b1pt} pt`); }

    const b2pt = b2 * 3;
    if (b2pt > 0) { tot += b2pt; dettagli.push(`B.2 Laurea ulteriore: +${b2pt} pt`); }

    const b3pt = b3 * 1.5;
    if (b3pt > 0) { tot += b3pt; dettagli.push(`B.3 Laurea triennale/ITS: +${b3pt} pt`); }

    if (isFasciaI) {
      const b4pt = Math.min(b4Specializzazioni, 2) * 2;
      if (b4pt > 0) { tot += b4pt; dettagli.push(`B.4 Specializzazioni biennali: +${b4pt} pt (max 2)`); }
    } else {
      const b4pt = b4Specializzazioni >= 1 ? 1.5 : 0;
      if (b4pt > 0) { tot += b4pt; dettagli.push(`B.4 Abilitazione professione regolamentata: +${b4pt} pt`); }
    }

    if (tabellaData.grado === 'sostegno') {
      if (isFasciaI) {
        const b5pt = b5TitoloSostegno >= 1 ? 9 : 0;
        if (b5pt > 0) { tot += b5pt; dettagli.push(`B.5 Abilitazione grado specifico: +${b5pt} pt`); }
      } else {
        const b5pt = b5TitoloSostegno * 9;
        if (b5pt > 0) { tot += b5pt; dettagli.push(`B.5 Specializzazione sostegno ulteriore: +${b5pt} pt`); }
      }
    } else {
      const b5pt = b5TitoloSostegno * 9;
      if (b5pt > 0) { tot += b5pt; dettagli.push(`B.5 Specializzazione sostegno ulteriore: +${b5pt} pt`); }
    }

    if (b6PhD) { tot += 12; dettagli.push('B.6 Dottorato di ricerca (PhD): +12 pt'); }

    const b7pt = b7ASN * 3;
    if (b7pt > 0) { tot += b7pt; dettagli.push(`B.7 ASN: +${b7pt} pt`); }

    const b8pt = b8Ricerca * 6;
    if (b8pt > 0) { tot += b8pt; dettagli.push(`B.8 Attività ricerca: +${b8pt} pt`); }

    const b9pt = b9AFAM * 1;
    if (b9pt > 0) { tot += b9pt; dettagli.push(`B.9 Graduatorie AFAM: +${b9pt} pt`); }

    const masterPt = Math.min(masterCount, 3) * 1;
    if (masterPt > 0) { tot += masterPt; dettagli.push(`B.10 Master/Perfezionamento: +${masterPt} pt (max 3)`); }

    let certificazioneLinguisticaPt = 0;
    let livelloLingua = '';
    if (certLinguaLivello === 'C2') { certificazioneLinguisticaPt = 6; livelloLingua = 'C2'; }
    else if (certLinguaLivello === 'C1') { certificazioneLinguisticaPt = 4; livelloLingua = 'C1'; }
    else if (certLinguaLivello === 'B2') { certificazioneLinguisticaPt = 3; livelloLingua = 'B2'; }
    if (certificazioneLinguisticaPt > 0) {
      dettagli.push(`B.11 Certificazione linguistica ${livelloLingua}: +${certificazioneLinguisticaPt} pt`);
    }

    let clilPt = 0;
    if (haCLIL && certificazioneLinguisticaPt > 0) {
      clilPt = 3;
      dettagli.push(`B.12 CLIL con certificazione: +${clilPt} pt`);
    } else if (haCLIL) {
      clilPt = 1;
      dettagli.push(`B.12 Solo CLIL (senza certificazione): +${clilPt} pt`);
    }

    const lingTot = certificazioneLinguisticaPt + clilPt;
    tot += lingTot;

    const certInfoPt = Math.min(certInfoCount, 4) * 0.5;
    if (certInfoPt > 0) { tot += certInfoPt; dettagli.push(`B.13 Certificazioni informatiche: +${certInfoPt} pt (max 4 cert.)`); }

    setDettaglioVoci(prev => [...prev, ...dettagli]);
    return Math.round(tot * 100) / 100;
  }, [isFasciaI, b1, b2, b3, b4Specializzazioni, b5TitoloSostegno, b6PhD, b7ASN, b8Ricerca, b9AFAM, masterCount, certLinguaLivello, haCLIL, certInfoCount, tabellaData.grado, isSostegno]);

  const calcolaTotale = useCallback(() => {
    const voci: string[] = [];
    const titAccesso = calcolaTitoloAccesso();
    voci.push(`A.1 Titolo di accesso: ${titAccesso} pt`);

    const puntiAgg = calcolaPuntiAggiuntivi();
    if (puntiAgg > 0) voci.push(`A.2 Punti aggiuntivi titolo accesso: +${puntiAgg} pt`);

    const titCulturali = calcolaTitoliCulturali();

    const { specifico, nonSpecifico, dettagli: dettServ } = calcolaPunteggioServizioGPS(servizi);
    voci.push(...dettServ);

    const totale = titAccesso + puntiAgg + titCulturali + specifico + nonSpecifico;

    const result: GPSCalculationResult = {
      titoloAccesso: titAccesso,
      abilitazione: puntiAgg,
      masterCorsi: Math.min(masterCount, 3),
      certificazioniLinguistiche: certLinguaLivello !== 'nessuna' ? (certLinguaLivello === 'C2' ? 6 : certLinguaLivello === 'C1' ? 4 : 3) : 0,
      clil: haCLIL ? 1 : 0,
      certificazioniInformatiche: Math.min(certInfoCount, 4) * 0.5,
      serviziSpecifici: specifico,
      serviziNonSpecifici: nonSpecifico,
      punteggioTotale: Math.round(totale * 100) / 100,
    };

    setDettaglioVoci(voci);
    setRisultato(result);
    setCurrentStep(STEPS.length - 1);
  }, [calcolaTitoloAccesso, calcolaPuntiAggiuntivi, calcolaTitoliCulturali, servizi, masterCount, certLinguaLivello, haCLIL, certInfoCount]);

  const addServizio = useCallback(() => {
    setServizi(prev => [...prev, { id: crypto.randomUUID(), dataInizio: '', dataFine: '', scuola: '', tipo: 'specifico', annoScolastico: '2025/2026' }]);
  }, []);

  const removeServizio = useCallback((id: string) => {
    setServizi(prev => prev.filter(s => s.id !== id));
  }, []);

  const updateServizio = useCallback((id: string, field: keyof ServizioScolastico, value: string) => {
    setServizi(prev => prev.map(s => s.id === id ? { ...s, [field]: value } : s));
  }, []);

  const salvaSuSupabase = useCallback(async () => {
    if (!risultato) return;
    const { data: { session } } = await supabase.auth.getSession();
    const userId = session?.user?.id || crypto.randomUUID();
    const { error } = await supabase.from('user_scores').insert({
      user_id: userId, tipo_graduatoria: 'gps', fascia: tabellaData.fascia,
      classe_concorso: tabellaData.label, punteggio_totale: risultato.punteggioTotale, dettagli_calcolo: risultato,
    });
    if (!error) setSalvataggioOK(true);
  }, [risultato, tabellaData]);

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
    const reportCode = `SS-GPS-${crypto.randomUUID().slice(0, 8).toUpperCase()}`;
    doc.text(`Data: ${now.toLocaleDateString('it-IT')}  |  Ora: ${now.toLocaleTimeString('it-IT')}  |  Report: ${reportCode}`, margin, y);
    y += 6;
    doc.setDrawColor('#235377');
    doc.setLineWidth(0.5);
    doc.line(margin, y, pageWidth - margin, y);
    y += 8;

    doc.setFontSize(12);
    doc.setTextColor('#235377');
    doc.text('Report Valutazione Punteggio GPS', margin, y);
    y += 8;
    doc.setFontSize(10);
    doc.setTextColor('#333');
    doc.text(`Tabella: ${tabellaData.label}`, margin, y);
    y += 5;
    doc.text(`Punteggio totale simulato: ${risultato.punteggioTotale} punti`, margin, y);
    y += 10;

    doc.setFontSize(9);
    doc.setTextColor('#235377');
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
    const footerText = 'Il presente report costituisce una simulazione fedele elaborata sulla base delle tabelle di valutazione dei titoli ministeriali vigenti. Non sostituisce l\'atto di validazione ufficiale dell\'Ufficio Scolastico Regionale o delle scuole polo preposte al controllo delle dichiarazioni.';
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

    doc.save(`Report_GPS_${now.toISOString().slice(0, 10)}.pdf`);
  }, [risultato, tabellaData, dettaglioVoci]);

  const progressPercent = ((currentStep + 1) / STEPS.length) * 100;

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-green-50 py-8 px-4">
      <div className="max-w-4xl mx-auto">
        <div className="text-center mb-8">
          <h1 className="text-3xl font-bold text-brand-blu mb-2">Simulatore Punteggio GPS 2026-2028</h1>
          <p className="text-gray-600">Calcolo formale conforme alle Tabelle A/1 – A/10 del MIM</p>
        </div>

        <div className="mb-8">
          <div className="flex justify-between mb-2 overflow-x-auto">
            {STEPS.map((step, i) => (
              <button key={step} onClick={() => setCurrentStep(i)}
                className={`flex-1 text-xs sm:text-sm font-medium py-2 px-1 border-b-2 transition-all duration-200 ${
                  i === currentStep ? 'border-brand-blu text-brand-blu' : i < currentStep ? 'border-brand-verde text-brand-verde' : 'border-gray-200 text-gray-400'
                }`}>{step}</button>
            ))}
          </div>
          <div className="h-1 bg-gray-100 rounded-full overflow-hidden">
            <div className="h-full bg-gradient-to-r from-brand-blu to-brand-verde transition-all duration-500" style={{ width: `${progressPercent}%` }} />
          </div>
        </div>

        <div className="bg-white/70 backdrop-blur-xs rounded-3xl shadow-lg border border-white/40 p-6 sm:p-8">
          {currentStep === 0 && (
            <div className="space-y-6">
              <h2 className="text-xl font-semibold text-brand-blu">Seleziona Tabella di Riferimento</h2>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                {Object.entries(TABELLE).map(([key, val]) => (
                  <button key={key} onClick={() => { setTabella(key as TabellaType); setMancaVoto(false); }}
                    className={`p-4 rounded-2xl border-2 text-left transition-all ${
                      tabella === key ? 'border-brand-blu bg-brand-blu/5' : 'border-gray-200 hover:border-brand-blu/50'
                    }`}>
                    <span className="font-bold text-brand-blu text-lg">Tabella {key.replace('A', 'A/')}</span>
                    <p className="text-sm text-gray-600 mt-1">{val.label}</p>
                    <span className={`inline-block mt-2 px-2 py-0.5 rounded-full text-xs font-semibold ${
                      val.fascia === 'I' ? 'bg-blue-100 text-blue-700' : 'bg-purple-100 text-purple-700'
                    }`}>Fascia {val.fascia}</span>
                  </button>
                ))}
              </div>
            </div>
          )}

          {currentStep === 1 && (
            <div className="space-y-6">
              <h2 className="text-xl font-semibold text-brand-blu">
                Sezione A.1 — Titolo di Accesso ({tabellaData.label})
              </h2>

              {isSFP ? (
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Media ponderata esami sostenuti</label>
                  <input type="number" min={18} max={30} step={0.01} value={mediaSFP}
                    onChange={e => setMediaSFP(Number(e.target.value))}
                    className="w-full border border-gray-300 rounded-2xl px-4 py-3 focus:ring-2 focus:ring-brand-blu transition" />
                  <p className="mt-2 text-sm text-brand-verde font-semibold">Punteggio: {calcolaVotoSFP(mediaSFP)} pt</p>
                </div>
              ) : isSostegno && isFasciaI ? (
                <div className="space-y-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">Voto di Specializzazione</label>
                    <input type="number" min={60} max={110} value={voto}
                      onChange={e => setVoto(Number(e.target.value))}
                      className="w-full border border-gray-300 rounded-2xl px-4 py-3 focus:ring-2 focus:ring-brand-blu transition" />
                  </div>
                  <div className="p-4 bg-green-50 rounded-2xl">
                    <p className="text-brand-verde font-semibold">Punteggio (Tab. A/7): {calcolaVotoSostegnoI(voto, 100)} pt</p>
                  </div>
                </div>
              ) : (
                <div className="space-y-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">Voto del Titolo di Accesso</label>
                    <input type="number" min={36} max={110} value={voto}
                      onChange={e => setVoto(Number(e.target.value))}
                      className="w-full border border-gray-300 rounded-2xl px-4 py-3 focus:ring-2 focus:ring-brand-blu transition" />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">Base del Voto</label>
                    <select value={baseVoto} onChange={e => setBaseVoto(Number(e.target.value))}
                      className="w-full border border-gray-300 rounded-2xl px-4 py-3 focus:ring-2 focus:ring-brand-blu transition">
                      <option value={110}>Base 110</option>
                      <option value={100}>Base 100</option>
                      <option value={60}>Base 60</option>
                    </select>
                  </div>
                  {!isFasciaI && !isSecondaFasciaSostegno && (
                    <div className="flex items-center gap-3">
                      <input type="checkbox" id="lode" checked={lode}
                        onChange={e => setLode(e.target.checked)}
                        className="h-5 w-5 rounded border-gray-300 text-brand-verde focus:ring-brand-verde" />
                      <label htmlFor="lode" className="text-sm font-medium text-gray-700">Conseguito con Lode (+4 pt)</label>
                    </div>
                  )}
                  <div className="p-4 bg-green-50 rounded-2xl">
                    <p className="text-brand-verde font-semibold">
                      Punteggio: {calcolaVoto100(voto, baseVoto)} pt
                    </p>
                  </div>
                </div>
              )}

              <div className="flex items-center gap-3 p-4 bg-amber-50 rounded-2xl">
                <input type="checkbox" id="mancaVoto" checked={mancaVoto}
                  onChange={e => setMancaVoto(e.target.checked)}
                  className="h-5 w-5 rounded border-gray-300 text-amber-600 focus:ring-amber-500" />
                <label htmlFor="mancaVoto" className="text-sm text-amber-800">
                  Il titolo manca di punteggio o non è quantificabile numericamente (viene assegnato punteggio d'ufficio)
                </label>
              </div>
            </div>
          )}

          {currentStep === 2 && (
            <div className="space-y-6">
              <h2 className="text-xl font-semibold text-brand-blu">Sezione A.2 — Punti Aggiuntivi Titolo di Accesso</h2>
              {isFasciaI ? (
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  {[
                    { id: 'abilConcorso', label: 'Abilitazione tramite concorso ordinario/straordinario', pts: 24, val: abilConcorso, set: setAbilConcorso },
                    { id: 'abilSSIS', label: 'Abilitazione SSIS, COBASLID, BIFORDOC', pts: 12, val: abilSSIS, set: setAbilSSIS },
                    { id: 'abilCFU', label: 'Percorsi 60/30/36 CFU', pts: 12, val: abilCFU, set: setAbilCFU },
                    { id: 'abilSFP', label: 'Laurea SFP / LM-85 bis', pts: 12, val: abilSFP, set: setAbilSFP },
                    { id: 'abilPAS', label: 'Percorsi speciali (PAS) DM 249/2010', pts: 6, val: abilPAS, set: setAbilPAS },
                    ...(isSostegno ? [{ id: 'specSost', label: 'TFA Sostegno (titolo specializzazione)', pts: 12, val: specSostegno, set: setSpecSostegno }] : []),
                  ].map(item => (
                    <label key={item.id} className="flex items-start gap-3 p-4 border border-gray-200 rounded-2xl hover:border-brand-blu/30 cursor-pointer transition">
                      <input type="checkbox" checked={item.val} onChange={e => item.set(e.target.checked)}
                        className="h-5 w-5 mt-0.5 rounded border-gray-300 text-brand-blu focus:ring-brand-blu" />
                      <div>
                        <p className="text-sm font-medium text-gray-800">{item.label}</p>
                        <p className="text-xs text-brand-verde font-semibold">+{item.pts} punti</p>
                      </div>
                    </label>
                  ))}
                </div>
              ) : (
                <div className="p-4 bg-amber-50 rounded-2xl">
                  <p className="text-amber-700 text-sm">Per la II Fascia non sono previsti punti aggiuntivi per l'abilitazione oltre al titolo di accesso.</p>
                </div>
              )}
            </div>
          )}

          {currentStep === 3 && (
            <div className="space-y-6">
              <h2 className="text-xl font-semibold text-brand-blu">Sezione B — Titoli Culturali</h2>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">B.1 Superamento concorso ordinario (non usato come accesso) — +3 pt cad.</label>
                  <input type="number" min={0} max={5} value={b1} onChange={e => setB1(Number(e.target.value))}
                    className="w-full border border-gray-300 rounded-2xl px-4 py-3 focus:ring-2 focus:ring-brand-blu transition" />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">B.2 Laurea/specializzazione/magistrale ulteriore — +3 pt cad.</label>
                  <input type="number" min={0} max={5} value={b2} onChange={e => setB2(Number(e.target.value))}
                    className="w-full border border-gray-300 rounded-2xl px-4 py-3 focus:ring-2 focus:ring-brand-blu transition" />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">B.3 Laurea triennale/ITS ulteriore — +1,5 pt cad.</label>
                  <input type="number" min={0} max={5} value={b3} onChange={e => setB3(Number(e.target.value))}
                    className="w-full border border-gray-300 rounded-2xl px-4 py-3 focus:ring-2 focus:ring-brand-blu transition" />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">B.4 {isFasciaI ? 'Specializzazioni biennali (+2 pt, max 2)' : 'Abilitazione professione regolamentata (+1,5 pt, max 1)'}</label>
                  <input type="number" min={0} max={5} value={b4Specializzazioni} onChange={e => setB4Specializzazioni(Number(e.target.value))}
                    className="w-full border border-gray-300 rounded-2xl px-4 py-3 focus:ring-2 focus:ring-brand-blu transition" />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">B.5 {isSostegno ? 'Specializzazione sostegno ulteriore' : 'Titolo specializzazione sostegno'} — +9 pt cad.</label>
                  <input type="number" min={0} max={5} value={b5TitoloSostegno} onChange={e => setB5TitoloSostegno(Number(e.target.value))}
                    className="w-full border border-gray-300 rounded-2xl px-4 py-3 focus:ring-2 focus:ring-brand-blu transition" />
                </div>
                <div className="flex items-center gap-3 p-4 border border-gray-200 rounded-2xl">
                  <input type="checkbox" id="phd" checked={b6PhD} onChange={e => setB6PhD(e.target.checked)}
                    className="h-5 w-5 rounded border-gray-300 text-brand-blu focus:ring-brand-blu" />
                  <label htmlFor="phd" className="text-sm font-medium text-gray-700">B.6 Dottorato di ricerca (PhD) — +12 pt (max 1)</label>
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">B.7 ASN (Abilitazione Scientifica Nazionale) — +3 pt cad.</label>
                  <input type="number" min={0} max={5} value={b7ASN} onChange={e => setB7ASN(Number(e.target.value))}
                    className="w-full border border-gray-300 rounded-2xl px-4 py-3 focus:ring-2 focus:ring-brand-blu transition" />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">B.8 Attività ricerca (assegni art.51/22) — +6 pt cad.</label>
                  <input type="number" min={0} max={5} value={b8Ricerca} onChange={e => setB8Ricerca(Number(e.target.value))}
                    className="w-full border border-gray-300 rounded-2xl px-4 py-3 focus:ring-2 focus:ring-brand-blu transition" />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">B.9 Graduatorie AFAM — +1 pt cad.</label>
                  <input type="number" min={0} max={5} value={b9AFAM} onChange={e => setB9AFAM(Number(e.target.value))}
                    className="w-full border border-gray-300 rounded-2xl px-4 py-3 focus:ring-2 focus:ring-brand-blu transition" />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">B.10 Master / Corsi perfezionamento (max 3) — +1 pt cad.</label>
                  <input type="number" min={0} max={10} value={masterCount} onChange={e => setMasterCount(Number(e.target.value))}
                    className="w-full border border-gray-300 rounded-2xl px-4 py-3 focus:ring-2 focus:ring-brand-blu transition" />
                </div>
              </div>

              <div className="border-t border-gray-200 pt-6">
                <h3 className="font-semibold text-gray-800 mb-4">B.11 — Certificazioni Linguistiche (QCER)</h3>
                <select value={certLinguaLivello} onChange={e => setCertLinguaLivello(e.target.value as typeof certLinguaLivello)}
                  className="w-full border border-gray-300 rounded-2xl px-4 py-3 focus:ring-2 focus:ring-brand-blu transition">
                  <option value="nessuna">Nessuna certificazione</option>
                  <option value="B2">B2 — +3 pt</option>
                  <option value="C1">C1 — +4 pt</option>
                  <option value="C2">C2 — +6 pt</option>
                </select>
                <p className="text-xs text-gray-500 mt-2">Valutabile un solo titolo per lingua (viene calcolato il livello più alto).</p>
              </div>

              <div className="border-t border-gray-200 pt-6">
                <h3 className="font-semibold text-gray-800 mb-4">B.12 — Certificazioni CLIL</h3>
                <div className="flex items-center gap-3 p-4 border border-gray-200 rounded-2xl">
                  <input type="checkbox" id="clil" checked={haCLIL} onChange={e => setHaCLIL(e.target.checked)}
                    className="h-5 w-5 rounded border-gray-300 text-brand-blu focus:ring-brand-blu" />
                  <label htmlFor="clil" className="text-sm text-gray-700">
                    Corso CLIL {certLinguaLivello !== 'nessuna' ? `+ certificazione ${certLinguaLivello} → ${certLinguaLivello === 'C2' ? '6+3=9' : certLinguaLivello === 'C1' ? '4+3=7' : '3+3=6'} pt totali` : '(senza certificazione: +1 pt)'}
                  </label>
                </div>
              </div>

              <div className="border-t border-gray-200 pt-6">
                <h3 className="font-semibold text-gray-800 mb-4">B.13 — Certificazioni Informatiche</h3>
                <label className="block text-sm font-medium text-gray-700 mb-1">Numero certificazioni (max 4 valide, +0,50 pt cad., tetto max 2 pt)</label>
                <input type="number" min={0} max={10} value={certInfoCount} onChange={e => setCertInfoCount(Number(e.target.value))}
                  className="w-full border border-gray-300 rounded-2xl px-4 py-3 focus:ring-2 focus:ring-brand-blu transition" />
                <p className="text-xs text-gray-500 mt-1">Punteggio: {Math.min(certInfoCount, 4) * 0.5} pt (max 4 certificazioni = 2 pt)</p>
              </div>
            </div>
          )}

          {currentStep === 4 && (
            <div className="space-y-6">
              <h2 className="text-xl font-semibold text-brand-blu">Sezione C — Titoli di Servizio</h2>
              <p className="text-sm text-gray-600">Inserisci i periodi di servizio. Il calcolo segue la griglia a scaglioni ministeriali. Massimo 12 pt/anno per servizio specifico.</p>

              {servizi.length === 0 && (
                <div className="text-center py-8 text-gray-400">
                  <p>Nessun servizio inserito. Clicca "Aggiungi Periodo" per iniziare.</p>
                </div>
              )}

              {servizi.map((s, idx) => {
                const giorni = s.dataInizio && s.dataFine ? calcolaGiorniServizio(s.dataInizio, s.dataFine) : 0;
                const punti = giorni > 0 ? giorniAMesi(giorni) : null;
                return (
                  <div key={s.id} className="p-4 border border-gray-200 rounded-2xl space-y-3 relative">
                    <button onClick={() => removeServizio(s.id)}
                      className="absolute top-2 right-2 text-red-400 hover:text-red-600 text-sm transition">✕ Rimuovi</button>
                    <h3 className="font-medium text-brand-blu">Periodo {idx + 1}</h3>
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                      <div>
                        <label className="block text-xs font-medium text-gray-600 mb-1">Data Inizio</label>
                        <input type="date" value={s.dataInizio} onChange={e => updateServizio(s.id, 'dataInizio', e.target.value)}
                          className="w-full border border-gray-300 rounded-xl px-3 py-2 text-sm focus:ring-2 focus:ring-brand-blu transition" />
                      </div>
                      <div>
                        <label className="block text-xs font-medium text-gray-600 mb-1">Data Fine</label>
                        <input type="date" value={s.dataFine} onChange={e => updateServizio(s.id, 'dataFine', e.target.value)}
                          className="w-full border border-gray-300 rounded-xl px-3 py-2 text-sm focus:ring-2 focus:ring-brand-blu transition" />
                      </div>
                      <div>
                        <label className="block text-xs font-medium text-gray-600 mb-1">Tipo Servizio</label>
                        <select value={s.tipo} onChange={e => updateServizio(s.id, 'tipo', e.target.value)}
                          className="w-full border border-gray-300 rounded-xl px-3 py-2 text-sm focus:ring-2 focus:ring-brand-blu transition">
                          <option value="specifico">Specifico (C.1) — 2 pt/mese</option>
                          <option value="non_specifico">Non specifico (C.2) — 1 pt/mese</option>
                        </select>
                      </div>
                      <div>
                        <label className="block text-xs font-medium text-gray-600 mb-1">Anno Scolastico</label>
                        <input type="text" value={s.annoScolastico} onChange={e => updateServizio(s.id, 'annoScolastico', e.target.value)}
                          className="w-full border border-gray-300 rounded-xl px-3 py-2 text-sm focus:ring-2 focus:ring-brand-blu transition" />
                      </div>
                    </div>
                    {punti && (
                      <p className="text-xs text-gray-500">
                        Giorni: {giorni} → {s.tipo === 'specifico' ? `C.1: ${punti.specifico} pt (specifico)` : `C.2: ${punti.nonSpecifico} pt (non specifico)`}
                      </p>
                    )}
                  </div>
                );
              })}

              <button onClick={addServizio}
                className="w-full py-3 border-2 border-dashed border-brand-ottanio text-brand-ottanio rounded-2xl hover:bg-brand-ottanio/5 transition font-medium">
                + Aggiungi Periodo di Servizio
              </button>
            </div>
          )}

          {currentStep === 5 && risultato && (
            <div className="space-y-6">
              <h2 className="text-xl font-semibold text-brand-blu">Riepilogo Punteggio GPS</h2>

              <div className="bg-gray-50 rounded-2xl p-4 space-y-2 text-sm">
                {dettaglioVoci.map((voce, i) => (
                  <p key={i} className="text-gray-700">{voce}</p>
                ))}
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                {[
                  { label: 'A.1 Titolo di Accesso', value: risultato.titoloAccesso, color: 'bg-blue-100 text-brand-blu' },
                  { label: 'A.2 Punti Aggiuntivi', value: risultato.abilitazione, color: 'bg-purple-100 text-purple-700' },
                  { label: 'B.10 Master / Corsi', value: risultato.masterCorsi, color: 'bg-green-100 text-brand-verde' },
                  { label: 'B.11 Cert. Linguistiche', value: risultato.certificazioniLinguistiche, color: 'bg-teal-100 text-brand-ottanio' },
                  { label: 'C.1 Servizi Specifici', value: risultato.serviziSpecifici, color: 'bg-amber-100 text-amber-700' },
                  { label: 'C.2 Servizi Non Specifici', value: risultato.serviziNonSpecifici, color: 'bg-orange-100 text-orange-700' },
                ].map(item => (
                  <div key={item.label} className={`p-4 rounded-2xl ${item.color}`}>
                    <p className="text-xs font-medium opacity-80">{item.label}</p>
                    <p className="text-2xl font-bold">{item.value}</p>
                  </div>
                ))}
              </div>

              <div className="p-6 bg-gradient-to-r from-brand-blu to-brand-verde rounded-2xl text-white text-center">
                <p className="text-sm font-medium opacity-90">PUNTEGGIO TOTALE SIMULATO</p>
                <p className="text-5xl font-extrabold mt-1">{risultato.punteggioTotale}</p>
              </div>

              <div className="flex gap-3">
                <button onClick={salvaSuSupabase}
                  className="flex-1 py-3 bg-brand-verde text-white rounded-2xl font-semibold hover:bg-brand-verde/90 transition">
                  {salvataggioOK ? '✓ Salvato!' : 'Salva nel tuo profilo'}
                </button>
                <button onClick={scaricaPDF}
                  className="flex-1 py-3 bg-brand-blu text-white rounded-2xl font-semibold hover:bg-brand-blu/90 transition">
                  Scarica Report PDF
                </button>
                <button onClick={() => { setCurrentStep(0); setRisultato(null); setDettaglioVoci([]); }}
                  className="flex-1 py-3 border-2 border-brand-blu text-brand-blu rounded-2xl font-semibold hover:bg-brand-blu/5 transition">
                  Nuovo Calcolo
                </button>
              </div>
            </div>
          )}

          <div className="flex justify-between mt-8">
            <button onClick={() => setCurrentStep(i => Math.max(0, i - 1))} disabled={currentStep === 0}
              className="px-6 py-2 border border-gray-300 rounded-2xl text-gray-600 hover:bg-gray-50 disabled:opacity-30 transition">
              ← Indietro
            </button>
            {currentStep < STEPS.length - 2 ? (
              <button onClick={() => setCurrentStep(i => i + 1)}
                className="px-6 py-2 bg-brand-blu text-white rounded-2xl hover:bg-brand-blu/90 transition font-medium">
                Avanti →
              </button>
            ) : currentStep === STEPS.length - 2 ? (
              <button onClick={calcolaTotale}
                className="px-8 py-3 bg-gradient-to-r from-brand-blu to-brand-verde text-white rounded-2xl hover:opacity-90 transition font-bold text-lg shadow-lg">
                Calcola Punteggio
              </button>
            ) : null}
          </div>
        </div>
      </div>
    </div>
  );
}
