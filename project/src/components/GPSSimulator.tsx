import { useState, useCallback } from 'react';
import { supabase } from '../lib/supabaseClient';
import type { GPSCalculationResult, ServizioScolastico } from '../types/database';

type FasciaType = 'I' | 'II';
type ClasseConcorsoArea = 'infanzia_primaria' | 'secondaria' | 'itp' | 'sostegno' | 'educativo';

interface TitoloAccesso110 {
  voto: number;
  lode: boolean;
}

interface TitoloAccesso100 {
  voto: number;
}

interface Abilitazione {
  tipo: 'tfa' | 'ssis' | 'cfu30' | 'cfu36' | 'cfu60' | 'nessuna';
}

interface MasterCorso {
  count: number;
}

interface CertLinguistica {
  b2: number;
  c1: number;
  c2: number;
}

interface CertInformatica {
  count: number;
}

const STEPS = ['Titolo di Accesso', 'Abilitazione', 'Titoli Culturali', 'Servizi Scolastici', 'Riepilogo'] as const;
type StepName = (typeof STEPS)[number];

const CLASSE_CONCORSO_AREE: Record<ClasseConcorsoArea, { label: string; fascia: FasciaType; tabella: string }> = {
  infanzia_primaria: { label: 'Infanzia / Primaria (A/1)', fascia: 'I', tabella: 'A/1' },
  secondaria: { label: 'Secondaria (A/3, A/4)', fascia: 'I', tabella: 'A/3-A/4' },
  itp: { label: 'ITP (A/5, A/6)', fascia: 'I', tabella: 'A/5-A/6' },
  sostegno: { label: 'Sostegno (A/7)', fascia: 'I', tabella: 'A/7' },
  educativo: { label: 'Educativo (A/10)', fascia: 'II', tabella: 'A/10' },
};

function calcolaTitoloAccesso110(voto: number, lode: boolean): number {
  if (voto < 110) return 12;
  let punteggio = 12 + (voto - 76) * 0.5;
  if (lode) punteggio += 4;
  return Math.min(punteggio, 24);
}

function calcolaTitoloAccesso100(voto: number): number {
  if (voto >= 96 && voto <= 100) return 12;
  if (voto >= 91 && voto <= 95) return 11;
  if (voto >= 86 && voto <= 90) return 9;
  if (voto >= 81 && voto <= 85) return 8;
  if (voto >= 76 && voto <= 80) return 7;
  if (voto >= 71 && voto <= 75) return 6;
  if (voto >= 66 && voto <= 70) return 5;
  if (voto >= 60 && voto <= 65) return 4;
  return 0;
}

function calcolaAbilitazione(tipo: Abilitazione['tipo']): number {
  const mappa: Record<Abilitazione['tipo'], number> = {
    tfa: 24,
    ssis: 24,
    cfu60: 24,
    cfu36: 18,
    cfu30: 15,
    nessuna: 0,
  };
  return mappa[tipo];
}

function calcolaMasterCorsi(count: number): number {
  return Math.min(count, 3) * 1;
}

function calcolaCertLinguistiche(cert: CertLinguistica): number {
  return cert.b2 * 3 + cert.c1 * 4 + cert.c2 * 6;
}

function calcolaCLIL(haClil: boolean, haCertLingua: boolean): number {
  return haClil && haCertLingua ? 3 : 0;
}

function calcolaCertInformatica(count: number): number {
  return Math.min(count, 4) * 0.5;
}

function calcolaGiorniServizio(inizio: string, fine: string): number {
  const d1 = new Date(inizio);
  const d2 = new Date(fine);
  const diff = d2.getTime() - d1.getTime();
  return Math.max(0, Math.ceil(diff / (1000 * 60 * 60 * 24)) + 1);
}

function giorniAMesi(giorni: number): number {
  if (giorni >= 166) return 6;
  if (giorni >= 136) return 5;
  if (giorni >= 106) return 4;
  if (giorni >= 76) return 3;
  if (giorni >= 46) return 2;
  if (giorni >= 16) return 1;
  return 0;
}

function calcolaPunteggioServizio(servizi: ServizioScolastico[]): { specifico: number; nonSpecifico: number } {
  const perAnno: Record<string, { specifico: number; nonSpecifico: number }> = {};

  for (const s of servizi) {
    const anno = s.annoScolastico;
    if (!perAnno[anno]) perAnno[anno] = { specifico: 0, nonSpecifico: 0 };

    const giorni = calcolaGiorniServizio(s.dataInizio, s.dataFine);
    const mesi = giorniAMesi(giorni);
    const punti = s.tipo === 'specifico' ? mesi * 2 : mesi * 1;

    if (s.tipo === 'specifico') {
      perAnno[anno].specifico += punti;
    } else {
      perAnno[anno].nonSpecifico += punti;
    }
  }

  let totSpec = 0;
  let totNonSpec = 0;
  for (const a of Object.values(perAnno)) {
    totSpec += Math.min(a.specifico, 12);
    totNonSpec += Math.min(a.nonSpecifico, 6);
  }

  return { specifico: totSpec, nonSpecifico: totNonSpec };
}

export default function GPSSimulator() {
  const [currentStep, setCurrentStep] = useState<number>(0);
  const [fascia, setFascia] = useState<FasciaType>('II');
  const [area, setArea] = useState<ClasseConcorsoArea>('educativo');
  const [voto110, setVoto110] = useState<number>(110);
  const [lode, setLode] = useState<boolean>(false);
  const [voto100, setVoto100] = useState<number>(100);
  const [abilitazione, setAbilitazione] = useState<Abilitazione['tipo']>('nessuna');
  const [masterCount, setMasterCount] = useState<number>(0);
  const [certLing, setCertLing] = useState<CertLinguistica>({ b2: 0, c1: 0, c2: 0 });
  const [haCLIL, setHaCLIL] = useState<boolean>(false);
  const [certInfo, setCertInfo] = useState<number>(0);
  const [servizi, setServizi] = useState<ServizioScolastico[]>([]);
  const [risultato, setRisultato] = useState<GPSCalculationResult | null>(null);
  const [salvataggioOK, setSalvataggioOK] = useState<boolean>(false);

  const handleAreaChange = (newArea: ClasseConcorsoArea) => {
    setArea(newArea);
    setFascia(CLASSE_CONCORSO_AREE[newArea].fascia);
  };

  const addServizio = useCallback(() => {
    setServizi(prev => [
      ...prev,
      {
        id: crypto.randomUUID(),
        dataInizio: '',
        dataFine: '',
        scuola: '',
        tipo: 'specifico',
        annoScolastico: '2025/2026',
      },
    ]);
  }, []);

  const removeServizio = useCallback((id: string) => {
    setServizi(prev => prev.filter(s => s.id !== id));
  }, []);

  const updateServizio = useCallback((id: string, field: keyof ServizioScolastico, value: string) => {
    setServizi(prev => prev.map(s => (s.id === id ? { ...s, [field]: value } : s)));
  }, []);

  const calcolaTotale = useCallback(() => {
    const is110 = fascia === 'II';
    const titAccesso = is110 ? calcolaTitoloAccesso110(voto110, lode) : calcolaTitoloAccesso100(voto100);
    const abilPunti = is110 ? 0 : calcolaAbilitazione(abilitazione);
    const masterPunti = calcolaMasterCorsi(masterCount);
    const certLingPunti = calcolaCertLinguistiche(certLing);
    const clilPunti = calcolaCLIL(haCLIL, certLingPunti > 0);
    const certInfoPunti = calcolaCertInformatica(certInfo);
    const servPunti = calcolaPunteggioServizio(servizi);

    const totale = titAccesso + abilPunti + masterPunti + certLingPunti + clilPunti + certInfoPunti + servPunti.specifico + servPunti.nonSpecifico;

    const result: GPSCalculationResult = {
      titoloAccesso: titAccesso,
      abilitazione: abilPunti,
      masterCorsi: masterPunti,
      certificazioniLinguistiche: certLingPunti,
      clil: clilPunti,
      certificazioniInformatiche: certInfoPunti,
      serviziSpecifici: servPunti.specifico,
      serviziNonSpecifici: servPunti.nonSpecifico,
      punteggioTotale: Math.round(totale * 100) / 100,
    };

    setRisultato(result);
    setCurrentStep(STEPS.length - 1);
  }, [fascia, voto110, lode, voto100, abilitazione, masterCount, certLing, haCLIL, certInfo, servizi]);

  const salvaSuSupabase = useCallback(async () => {
    if (!risultato) return;
    const { data: { session } } = await supabase.auth.getSession();
    const userId = session?.user?.id || crypto.randomUUID();

    const { error } = await supabase.from('user_scores').insert({
      user_id: userId,
      tipo_graduatoria: 'gps',
      fascia,
      classe_concorso: CLASSE_CONCORSO_AREE[area].label,
      punteggio_totale: risultato.punteggioTotale,
      dettagli_calcolo: risultato,
    });

    if (!error) setSalvataggioOK(true);
  }, [risultato, fascia, area]);

  const progressPercent = ((currentStep + 1) / STEPS.length) * 100;

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-green-50 py-8 px-4">
      <div className="max-w-4xl mx-auto">
        <div className="text-center mb-8">
          <h1 className="text-3xl font-bold text-brand-blu mb-2">Simulatore Punteggio GPS 2026-2028</h1>
          <p className="text-gray-600">Calcolo formale conforme alle Tabelle A/1 – A/10 del MIM</p>
        </div>

        <div className="mb-8">
          <div className="flex justify-between mb-2">
            {STEPS.map((step, i) => (
              <button
                key={step}
                onClick={() => setCurrentStep(i)}
                className={`flex-1 text-xs sm:text-sm font-medium py-2 px-1 border-b-2 transition-all duration-200 ${
                  i === currentStep
                    ? 'border-brand-blu text-brand-blu'
                    : i < currentStep
                    ? 'border-brand-verde text-brand-verde'
                    : 'border-gray-200 text-gray-400'
                }`}
              >
                {step}
              </button>
            ))}
          </div>
          <div className="h-1 bg-gray-100 rounded-full overflow-hidden">
            <div
              className="h-full bg-gradient-to-r from-brand-blu to-brand-verde transition-all duration-500"
              style={{ width: `${progressPercent}%` }}
            />
          </div>
        </div>

        <div className="bg-white/70 backdrop-blur-xs rounded-3xl shadow-lg border border-white/40 p-6 sm:p-8">
          {currentStep === 0 && (
            <div className="space-y-6">
              <h2 className="text-xl font-semibold text-brand-blu">Titolo di Accesso</h2>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Classe di Concorso / Area</label>
                <select
                  value={area}
                  onChange={e => handleAreaChange(e.target.value as ClasseConcorsoArea)}
                  className="w-full border border-gray-300 rounded-2xl px-4 py-3 focus:ring-2 focus:ring-brand-blu focus:border-brand-blu transition"
                >
                  {Object.entries(CLASSE_CONCORSO_AREE).map(([key, val]) => (
                    <option key={key} value={key}>
                      {val.label} — Fascia {val.fascia} (Tab. {val.tabella})
                    </option>
                  ))}
                </select>
              </div>

              <div className="p-4 bg-blue-50 rounded-2xl">
                <p className="text-sm text-brand-blu font-medium">
                  Fascia selezionata: <strong>{fascia}</strong> — Base {fascia === 'II' ? '110' : '100'}
                </p>
              </div>

              {fascia === 'II' ? (
                <>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">Voto di Laurea (base 110)</label>
                    <input
                      type="number"
                      min={66}
                      max={110}
                      value={voto110}
                      onChange={e => setVoto110(Number(e.target.value))}
                      className="w-full border border-gray-300 rounded-2xl px-4 py-3 focus:ring-2 focus:ring-brand-blu transition"
                    />
                    <p className="mt-1 text-xs text-gray-500">Formula: 12 + (Voto - 76) × 0,5 (max 24 pt con lode)</p>
                  </div>
                  <div className="flex items-center gap-3">
                    <input
                      type="checkbox"
                      id="lode"
                      checked={lode}
                      onChange={e => setLode(e.target.checked)}
                      className="h-5 w-5 rounded border-gray-300 text-brand-verde focus:ring-brand-verde"
                    />
                    <label htmlFor="lode" className="text-sm font-medium text-gray-700">Lode (+4 punti)</label>
                  </div>
                  <div className="p-4 bg-green-50 rounded-2xl">
                    <p className="text-brand-verde font-semibold">
                      Punteggio Titolo di Accesso: <span className="text-2xl">{calcolaTitoloAccesso110(voto110, lode).toFixed(2)}</span> punti
                    </p>
                  </div>
                </>
              ) : (
                <>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">Voto di Diploma/Laurea (base 100)</label>
                    <input
                      type="number"
                      min={60}
                      max={100}
                      value={voto100}
                      onChange={e => setVoto100(Number(e.target.value))}
                      className="w-full border border-gray-300 rounded-2xl px-4 py-3 focus:ring-2 focus:ring-brand-blu transition"
                    />
                    <p className="mt-1 text-xs text-gray-500">Conversione a scaglioni MIM come da Tabella A/1, A/3, A/5, A/7</p>
                  </div>
                  <div className="p-4 bg-green-50 rounded-2xl">
                    <p className="text-brand-verde font-semibold">
                      Punteggio Titolo di Accesso: <span className="text-2xl">{calcolaTitoloAccesso100(voto100)}</span> punti
                    </p>
                  </div>
                </>
              )}
            </div>
          )}

          {currentStep === 1 && (
            <div className="space-y-6">
              <h2 className="text-xl font-semibold text-brand-blu">Abilitazione</h2>

              {fascia === 'I' ? (
                <>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">Tipo di Abilitazione</label>
                    <select
                      value={abilitazione}
                      onChange={e => setAbilitazione(e.target.value as Abilitazione['tipo'])}
                      className="w-full border border-gray-300 rounded-2xl px-4 py-3 focus:ring-2 focus:ring-brand-blu transition"
                    >
                      <option value="nessuna">Nessuna abilitazione</option>
                      <option value="cfu30">Percorso abilitante 30 CFU (+15 pt)</option>
                      <option value="cfu36">Percorso abilitante 36 CFU (+18 pt)</option>
                      <option value="cfu60">Percorso abilitante 60 CFU (+24 pt)</option>
                      <option value="tfa">TFA — Tirocinio Formativo Attivo (+24 pt)</option>
                      <option value="ssis">SSIS — Scuola di Specializzazione (+24 pt)</option>
                    </select>
                  </div>
                  <div className="p-4 bg-green-50 rounded-2xl">
                    <p className="text-brand-verde font-semibold">
                      Punteggio Abilitazione: <span className="text-2xl">{calcolaAbilitazione(abilitazione)}</span> punti
                    </p>
                  </div>
                </>
              ) : (
                <div className="p-4 bg-amber-50 rounded-2xl">
                  <p className="text-amber-700 text-sm">
                    Per la II Fascia (base 110), l'abilitazione è già inclusa nel punteggio del titolo di accesso. Non sono previsti ulteriori punti per l'abilitazione.
                  </p>
                </div>
              )}
            </div>
          )}

          {currentStep === 2 && (
            <div className="space-y-6">
              <h2 className="text-xl font-semibold text-brand-blu">Titoli Culturali Ulteriori</h2>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Master / Corsi di Perfezionamento (max 3, +1 pt ciascuno)
                </label>
                <input
                  type="number"
                  min={0}
                  max={10}
                  value={masterCount}
                  onChange={e => setMasterCount(Number(e.target.value))}
                  className="w-full border border-gray-300 rounded-2xl px-4 py-3 focus:ring-2 focus:ring-brand-blu transition"
                />
                <p className="mt-1 text-xs text-gray-500">Valutabili max 3 titoli per AA. Punteggio: {calcolaMasterCorsi(masterCount)} pt</p>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Cert. B2 (+3 pt)</label>
                  <input
                    type="number"
                    min={0}
                    max={5}
                    value={certLing.b2}
                    onChange={e => setCertLing(p => ({ ...p, b2: Number(e.target.value) }))}
                    className="w-full border border-gray-300 rounded-2xl px-4 py-3 focus:ring-2 focus:ring-brand-blu transition"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Cert. C1 (+4 pt)</label>
                  <input
                    type="number"
                    min={0}
                    max={5}
                    value={certLing.c1}
                    onChange={e => setCertLing(p => ({ ...p, c1: Number(e.target.value) }))}
                    className="w-full border border-gray-300 rounded-2xl px-4 py-3 focus:ring-2 focus:ring-brand-blu transition"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Cert. C2 (+6 pt)</label>
                  <input
                    type="number"
                    min={0}
                    max={5}
                    value={certLing.c2}
                    onChange={e => setCertLing(p => ({ ...p, c2: Number(e.target.value) }))}
                    className="w-full border border-gray-300 rounded-2xl px-4 py-3 focus:ring-2 focus:ring-brand-blu transition"
                  />
                </div>
              </div>

              <div className="flex items-center gap-3">
                <input
                  type="checkbox"
                  id="clil"
                  checked={haCLIL}
                  onChange={e => setHaCLIL(e.target.checked)}
                  className="h-5 w-5 rounded border-gray-300 text-brand-verde focus:ring-brand-verde"
                />
                <label htmlFor="clil" className="text-sm font-medium text-gray-700">
                  Corso CLIL conseguito congiuntamente a certificazione linguistica (+3 pt)
                </label>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Certificazioni Informatiche (+0,5 pt ciascuna, max 4 = +2 pt)
                </label>
                <input
                  type="number"
                  min={0}
                  max={10}
                  value={certInfo}
                  onChange={e => setCertInfo(Number(e.target.value))}
                  className="w-full border border-gray-300 rounded-2xl px-4 py-3 focus:ring-2 focus:ring-brand-blu transition"
                />
                <p className="mt-1 text-xs text-gray-500">Punteggio: {calcolaCertInformatica(certInfo)} pt (max 2 pt)</p>
              </div>

              <div className="p-4 bg-green-50 rounded-2xl">
                <p className="text-brand-verde font-semibold">
                  Subtotale Titoli Culturali: <span className="text-2xl">{(calcolaMasterCorsi(masterCount) + calcolaCertLinguistiche(certLing) + calcolaCLIL(haCLIL, calcolaCertLinguistiche(certLing) > 0) + calcolaCertInformatica(certInfo)).toFixed(2)}</span> punti
                </p>
              </div>
            </div>
          )}

          {currentStep === 3 && (
            <div className="space-y-6">
              <h2 className="text-xl font-semibold text-brand-blu">Servizi Scolastici</h2>
              <p className="text-sm text-gray-600">
                Inserisci i periodi di servizio. Il calcolo segue la regola delle frazioni mensili ministeriali (16-45gg = 1 mese, 46-75gg = 2 mesi, ..., ≥166gg = 6 mesi). Specifico: 2 pt/mese, Non specifico: 1 pt/mese. Max 12 pt/anno per specifico.
              </p>

              {servizi.length === 0 && (
                <div className="text-center py-8 text-gray-400">
                  <p>Nessun servizio inserito. Clicca "Aggiungi Periodo" per iniziare.</p>
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
                  <h3 className="font-medium text-brand-blu">Periodo {idx + 1}</h3>
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                    <div>
                      <label className="block text-xs font-medium text-gray-600 mb-1">Data Inizio</label>
                      <input
                        type="date"
                        value={s.dataInizio}
                        onChange={e => updateServizio(s.id, 'dataInizio', e.target.value)}
                        className="w-full border border-gray-300 rounded-xl px-3 py-2 text-sm focus:ring-2 focus:ring-brand-blu transition"
                      />
                    </div>
                    <div>
                      <label className="block text-xs font-medium text-gray-600 mb-1">Data Fine</label>
                      <input
                        type="date"
                        value={s.dataFine}
                        onChange={e => updateServizio(s.id, 'dataFine', e.target.value)}
                        className="w-full border border-gray-300 rounded-xl px-3 py-2 text-sm focus:ring-2 focus:ring-brand-blu transition"
                      />
                    </div>
                    <div>
                      <label className="block text-xs font-medium text-gray-600 mb-1">Tipo Servizio</label>
                      <select
                        value={s.tipo}
                        onChange={e => updateServizio(s.id, 'tipo', e.target.value)}
                        className="w-full border border-gray-300 rounded-xl px-3 py-2 text-sm focus:ring-2 focus:ring-brand-blu transition"
                      >
                        <option value="specifico">Specifico (2 pt/mese)</option>
                        <option value="non_specifico">Non specifico (1 pt/mese)</option>
                      </select>
                    </div>
                    <div>
                      <label className="block text-xs font-medium text-gray-600 mb-1">Anno Scolastico</label>
                      <input
                        type="text"
                        value={s.annoScolastico}
                        onChange={e => updateServizio(s.id, 'annoScolastico', e.target.value)}
                        placeholder="2025/2026"
                        className="w-full border border-gray-300 rounded-xl px-3 py-2 text-sm focus:ring-2 focus:ring-brand-blu transition"
                      />
                    </div>
                  </div>
                  {s.dataInizio && s.dataFine && (
                    <p className="text-xs text-gray-500">
                      Giorni: {calcolaGiorniServizio(s.dataInizio, s.dataFine)} → Mesi: {giorniAMesi(calcolaGiorniServizio(s.dataInizio, s.dataFine))}
                    </p>
                  )}
                </div>
              ))}

              <button
                onClick={addServizio}
                className="w-full py-3 border-2 border-dashed border-brand-ottanio text-brand-ottanio rounded-2xl hover:bg-brand-ottanio/5 transition font-medium"
              >
                + Aggiungi Periodo di Servizio
              </button>
            </div>
          )}

          {currentStep === 4 && risultato && (
            <div className="space-y-6">
              <h2 className="text-xl font-semibold text-brand-blu">Riepilogo Punteggio GPS</h2>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                {[
                  { label: 'Titolo di Accesso', value: risultato.titoloAccesso, color: 'bg-blue-100 text-brand-blu' },
                  { label: 'Abilitazione', value: risultato.abilitazione, color: 'bg-purple-100 text-purple-700' },
                  { label: 'Master / Corsi', value: risultato.masterCorsi, color: 'bg-green-100 text-brand-verde' },
                  { label: 'Cert. Linguistiche', value: risultato.certificazioniLinguistiche, color: 'bg-teal-100 text-brand-ottanio' },
                  { label: 'CLIL', value: risultato.clil, color: 'bg-cyan-100 text-cyan-700' },
                  { label: 'Cert. Informatiche', value: risultato.certificazioniInformatiche, color: 'bg-indigo-100 text-indigo-700' },
                  { label: 'Servizi Specifici', value: risultato.serviziSpecifici, color: 'bg-amber-100 text-amber-700' },
                  { label: 'Servizi Non Specifici', value: risultato.serviziNonSpecifici, color: 'bg-orange-100 text-orange-700' },
                ].map(item => (
                  <div key={item.label} className={`p-4 rounded-2xl ${item.color}`}>
                    <p className="text-xs font-medium opacity-80">{item.label}</p>
                    <p className="text-2xl font-bold">{item.value}</p>
                  </div>
                ))}
              </div>

              <div className="p-6 bg-gradient-to-r from-brand-blu to-brand-verde rounded-2xl text-white text-center">
                <p className="text-sm font-medium opacity-90">PUNTEGGIO TOTALE GPS</p>
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
                    setCurrentStep(0);
                    setRisultato(null);
                  }}
                  className="flex-1 py-3 border-2 border-brand-blu text-brand-blu rounded-2xl font-semibold hover:bg-brand-blu/5 transition"
                >
                  Nuovo Calcolo
                </button>
              </div>
            </div>
          )}

          <div className="flex justify-between mt-8">
            <button
              onClick={() => setCurrentStep(i => Math.max(0, i - 1))}
              disabled={currentStep === 0}
              className="px-6 py-2 border border-gray-300 rounded-2xl text-gray-600 hover:bg-gray-50 disabled:opacity-30 transition"
            >
              ← Indietro
            </button>
            {currentStep < STEPS.length - 2 ? (
              <button
                onClick={() => setCurrentStep(i => i + 1)}
                className="px-6 py-2 bg-brand-blu text-white rounded-2xl hover:bg-brand-blu/90 transition font-medium"
              >
                Avanti →
              </button>
            ) : currentStep === STEPS.length - 2 ? (
              <button
                onClick={calcolaTotale}
                className="px-8 py-3 bg-gradient-to-r from-brand-blu to-brand-verde text-white rounded-2xl hover:opacity-90 transition font-bold text-lg shadow-lg"
              >
                Calcola Punteggio
              </button>
            ) : null}
          </div>
        </div>
      </div>
    </div>
  );
}
