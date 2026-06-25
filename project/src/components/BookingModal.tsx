import { useState, useMemo, useCallback } from 'react';
import { ChevronLeft, ChevronRight, Clock, CheckCircle, X, Loader2, GraduationCap, Briefcase, Globe, ArrowRight } from 'lucide-react';
import { useAuth } from './Auth/AuthContext';
import { supabase } from '../lib/supabaseClient';
import { sendEmailBackground } from './emailService';
import { CATEGORIE_SERVIZI, findServizioById, type CategoriaServizio } from '../data/servizi';
import type { TimeSlot } from '../types/database';

const TIME_SLOTS: TimeSlot[] = [
  { time: '09:00', available: true },
  { time: '09:45', available: true },
  { time: '10:30', available: true },
  { time: '11:15', available: true },
  { time: '12:00', available: true },
  { time: '14:00', available: true },
  { time: '14:45', available: true },
  { time: '15:30', available: true },
  { time: '16:15', available: true },
  { time: '17:00', available: true },
];

const MONTHS = ['Gennaio', 'Febbraio', 'Marzo', 'Aprile', 'Maggio', 'Giugno', 'Luglio', 'Agosto', 'Settembre', 'Ottobre', 'Novembre', 'Dicembre'];
const DAYS_OF_WEEK = ['Dom', 'Lun', 'Mar', 'Mer', 'Gio', 'Ven', 'Sab'];

function getDaysInMonth(year: number, month: number): number {
  return new Date(year, month + 1, 0).getDate();
}

function getFirstDayOfMonth(year: number, month: number): number {
  return new Date(year, month, 1).getDay();
}

const tabMeta: Record<CategoriaServizio, { label: string; icon: typeof GraduationCap }> = {
  docenti: { label: 'Area Docenti', icon: GraduationCap },
  ata: { label: 'Area ATA', icon: Briefcase },
  generali: { label: 'Servizi Trasversali', icon: Globe },
};

interface BookingModalProps {
  onClose: () => void;
  initialServiceId?: string;
}

export default function BookingModal({ onClose, initialServiceId }: BookingModalProps) {
  const { user, isAuthenticated } = useAuth();
  const [selectedCategoria, setSelectedCategoria] = useState<CategoriaServizio | null>(null);
  const [selectedService, setSelectedService] = useState<string | null>(initialServiceId || null);
  const [currentDate, setCurrentDate] = useState(new Date());
  const [selectedDay, setSelectedDay] = useState<number | null>(null);
  const [selectedTime, setSelectedTime] = useState<string | null>(null);
  const [step, setStep] = useState<'categoria' | 'servizio' | 'calendar' | 'confirm' | 'success'>(
    initialServiceId ? 'calendar' : 'categoria'
  );
  const [isSubmitting, setIsSubmitting] = useState(false);

  const year = currentDate.getFullYear();
  const month = currentDate.getMonth();
  const daysInMonth = getDaysInMonth(year, month);
  const firstDay = getFirstDayOfMonth(year, month);

  const isDayAvailable = useCallback((day: number): boolean => {
    const date = new Date(year, month, day);
    const today = new Date();
    today.setHours(0, 0, 0, 0);
    return date >= today && date.getDay() !== 0;
  }, [year, month]);

  const prevMonth = useCallback(() => {
    setCurrentDate(prev => new Date(prev.getFullYear(), prev.getMonth() - 1, 1));
    setSelectedDay(null);
    setSelectedTime(null);
  }, []);

  const nextMonth = useCallback(() => {
    setCurrentDate(prev => new Date(prev.getFullYear(), prev.getMonth() + 1, 1));
    setSelectedDay(null);
    setSelectedTime(null);
  }, []);

  const selectedServiceData = useMemo(() => {
    if (!selectedService) return undefined;
    return findServizioById(selectedService);
  }, [selectedService]);

  const serviziFiltrati = useMemo(() => {
    if (!selectedCategoria) return [];
    return CATEGORIE_SERVIZI.find(c => c.key === selectedCategoria)?.servizi ?? [];
  }, [selectedCategoria]);

  const calendarDays = useMemo(() => {
    const days: (number | null)[] = [];
    for (let i = 0; i < firstDay; i++) days.push(null);
    for (let i = 1; i <= daysInMonth; i++) days.push(i);
    return days;
  }, [firstDay, daysInMonth]);

  const handleConfirm = useCallback(async () => {
    if (!selectedServiceData || !selectedDay || !selectedTime) return;

    if (!isAuthenticated) {
      setStep('categoria');
      return;
    }

    setIsSubmitting(true);

    const dataOra = `${year}-${String(month + 1).padStart(2, '0')}-${String(selectedDay).padStart(2, '0')}T${selectedTime}:00`;

    const { error } = await supabase.from('appointments').insert({
      user_id: user!.id,
      servizio: selectedServiceData.titolo,
      data_ora: dataOra,
      is_paid: user?.is_premium || false,
    });

    if (!error) {
      const formattedDate = `${selectedDay} ${MONTHS[month]} ${year}`;

      await Promise.allSettled([
        sendEmailBackground({
          name: user?.full_name || 'Utente',
          email: user?.email || '',
          subject: 'Conferma Prenotazione — Sportello Scuola 2.0',
          message: `Gentile ${user?.full_name || 'utente'},\n\nLa tua prenotazione per "${selectedServiceData.titolo}" è stata confermata.\n\nDettagli appuntamento:\n- Servizio: ${selectedServiceData.titolo}\n- Data: ${formattedDate}\n- Ora: ${selectedTime}\n- Modalità: Google Meet (il link sarà inviato prima dell'incontro)\n\nCosti: ${user?.is_premium ? 'Gratuito (abbonamento Premium)' : `€${selectedServiceData.prezzo},00 (da saldare prima dell'incontro)`}\n\nPer qualsiasi variazione, contattaci a sportelloscuola2.0@gmail.com o al 388 971 1647.\n\nCordiali saluti,\nSportello Scuola 2.0`,
        }),
        sendEmailBackground({
          name: 'Sportello Scuola 2.0',
          email: 'sportelloscuola2.0@gmail.com',
          subject: `Nuova Prenotazione: ${selectedServiceData.titolo}`,
          message: `Nuova prenotazione ricevuta:\n\nCliente: ${user?.full_name || 'Utente'} (${user?.email})\nServizio: ${selectedServiceData.titolo}\nData: ${formattedDate}\nOra: ${selectedTime}\nPremium: ${user?.is_premium ? 'Sì' : 'No'}`,
        }),
      ]);

      setStep('success');
    }

    setIsSubmitting(false);
  }, [selectedServiceData, selectedDay, selectedTime, year, month, isAuthenticated, user]);

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 backdrop-blur-sm p-4">
      <div className="bg-white rounded-3xl shadow-2xl max-w-lg w-full max-h-[90vh] overflow-y-auto">
        <div className="flex items-center justify-between p-6 border-b border-gray-100">
          <h2 className="text-xl font-bold text-brand-blu">Prenota una Consulenza</h2>
          <button onClick={onClose} className="p-2 hover:bg-gray-100 rounded-xl transition">
            <X size={20} className="text-gray-500" />
          </button>
        </div>

        <div className="p-6">
          {step === 'categoria' && (
            <div className="space-y-4">
              <p className="text-gray-600 text-sm mb-4">Scegli l'area di tuo interesse:</p>
              {CATEGORIE_SERVIZI.map(cat => {
                const Icon = tabMeta[cat.key].icon;
                return (
                  <button
                    key={cat.key}
                    onClick={() => { setSelectedCategoria(cat.key); setStep('servizio'); }}
                    className="group w-full text-left p-5 rounded-2xl border-2 border-gray-200 hover:border-brand-blu hover:bg-brand-blu/5 transition-all duration-200"
                  >
                    <div className="flex items-center gap-4">
                      <div className="w-12 h-12 rounded-xl bg-brand-blu/10 flex items-center justify-center group-hover:bg-brand-blu/20 transition-colors">
                        <Icon size={24} className="text-brand-blu" />
                      </div>
                      <div className="flex-1">
                        <h3 className="font-bold text-gray-800">{cat.label}</h3>
                        <p className="text-sm text-gray-500 mt-0.5">{cat.servizi.length} servizi disponibili</p>
                      </div>
                      <ArrowRight size={20} className="text-gray-300 group-hover:text-brand-blu transition-colors" />
                    </div>
                  </button>
                );
              })}
            </div>
          )}

          {step === 'servizio' && selectedCategoria && (
            <div className="space-y-3">
              <button onClick={() => setStep('categoria')} className="text-brand-blu text-sm font-medium hover:underline mb-2 block">
                ← Cambia area
              </button>
              <p className="text-gray-600 text-sm mb-4">
                {tabMeta[selectedCategoria].label}: seleziona il servizio che fa per te:
              </p>
              {serviziFiltrati.map(s => (
                <button
                  key={s.id}
                  onClick={() => { setSelectedService(s.id); setStep('calendar'); }}
                  className="w-full text-left p-4 rounded-2xl border-2 border-gray-200 hover:border-brand-verde hover:bg-brand-verde/5 transition-all duration-200"
                >
                  <div className="flex justify-between items-center">
                    <div>
                      <span className="font-medium text-gray-800">{s.titolo}</span>
                      {s.evidenza && (
                        <span className="ml-2 text-[10px] font-semibold text-brand-verde bg-brand-verde/10 px-2 py-0.5 rounded-full">
                          {s.evidenza}
                        </span>
                      )}
                    </div>
                    <span className="text-brand-verde font-bold text-sm flex-shrink-0 ml-2">
                      {user?.is_premium ? 'GRATIS' : s.prezzo > 0 ? `€${s.prezzo},00` : 'Da concordare'}
                    </span>
                  </div>
                  <p className="text-xs text-gray-500 mt-1 line-clamp-1">{s.valore}</p>
                  {user?.is_premium && (
                    <p className="text-xs text-brand-verde mt-1">Incluso nel tuo abbonamento Premium</p>
                  )}
                </button>
              ))}
              <button
                onClick={() => { setSelectedService('altro-' + selectedCategoria); setStep('calendar'); }}
                className="w-full text-left p-4 rounded-2xl border-2 border-dashed border-amber-300 hover:border-amber-500 hover:bg-amber-50/50 transition-all duration-200"
              >
                <div className="flex justify-between items-center">
                  <span className="font-medium text-amber-700">Altro — Raccontaci la tua situazione</span>
                  <span className="text-amber-600 font-bold text-sm">Da concordare</span>
                </div>
                <p className="text-xs text-amber-600/70 mt-1">Il tuo caso non rientra nei servizi elencati? Ti ascoltiamo e troviamo la soluzione.</p>
              </button>
            </div>
          )}

          {step === 'calendar' && selectedService && (
            <div className="space-y-6">
              <button onClick={() => setStep(selectedCategoria ? 'servizio' : 'categoria')} className="text-brand-blu text-sm font-medium hover:underline">
                ← Cambia servizio
              </button>
              <h3 className="font-semibold text-gray-800">
                {selectedServiceData?.titolo || 'Servizio personalizzato'}
              </h3>
              {selectedServiceData && (
                <p className="text-sm text-gray-500">{selectedServiceData.valore}</p>
              )}

              <div className="bg-white rounded-2xl border border-gray-200 p-4">
                <div className="flex items-center justify-between mb-4">
                  <button onClick={prevMonth} className="p-2 hover:bg-gray-100 rounded-xl transition">
                    <ChevronLeft size={20} className="text-gray-600" />
                  </button>
                  <h4 className="font-semibold text-gray-800">{MONTHS[month]} {year}</h4>
                  <button onClick={nextMonth} className="p-2 hover:bg-gray-100 rounded-xl transition">
                    <ChevronRight size={20} className="text-gray-600" />
                  </button>
                </div>

                <div className="grid grid-cols-7 gap-1 mb-2">
                  {DAYS_OF_WEEK.map(d => (
                    <div key={d} className="text-center text-xs font-medium text-gray-500 py-2">{d}</div>
                  ))}
                </div>

                <div className="grid grid-cols-7 gap-1">
                  {calendarDays.map((day, i) => (
                    <div key={i} className="aspect-square">
                      {day && (
                        <button
                          onClick={() => { if (isDayAvailable(day)) { setSelectedDay(day); setSelectedTime(null); } }}
                          disabled={!isDayAvailable(day)}
                          className={`w-full h-full rounded-xl text-sm font-medium transition ${
                            selectedDay === day
                              ? 'bg-brand-blu text-white'
                              : isDayAvailable(day)
                              ? 'hover:bg-brand-blu/10 text-gray-700'
                              : 'text-gray-300 cursor-not-allowed'
                          }`}
                        >
                          {day}
                        </button>
                      )}
                    </div>
                  ))}
                </div>
              </div>

              {selectedDay && (
                <div className="space-y-3 animate-fade-in">
                  <h4 className="font-semibold text-gray-700">
                    Slot per {selectedDay} {MONTHS[month]} {year}
                  </h4>
                  <div className="grid grid-cols-2 sm:grid-cols-5 gap-2">
                    {TIME_SLOTS.map(slot => (
                      <button
                        key={slot.time}
                        onClick={() => setSelectedTime(slot.time)}
                        className={`py-3 px-4 rounded-2xl border-2 text-sm font-medium transition ${
                          selectedTime === slot.time
                            ? 'border-brand-verde bg-brand-verde/10 text-brand-verde'
                            : slot.available
                            ? 'border-gray-200 text-gray-700 hover:border-brand-verde hover:text-brand-verde'
                            : 'border-gray-100 text-gray-300 cursor-not-allowed'
                        }`}
                      >
                        <Clock size={14} className="inline mr-1" />
                        {slot.time}
                      </button>
                    ))}
                  </div>

                  {selectedTime && (
                    <div className="p-4 bg-green-50 rounded-2xl border border-green-200">
                      <p className="text-brand-verde font-medium">
                        {selectedDay} {MONTHS[month]} {year} alle {selectedTime}
                      </p>
                    </div>
                  )}

                  {isAuthenticated ? (
                    <button
                      onClick={() => setStep('confirm')}
                      disabled={!selectedTime}
                      className="w-full py-3 bg-gradient-to-r from-brand-blu to-brand-verde text-white rounded-2xl font-semibold hover:opacity-90 disabled:opacity-50 disabled:cursor-not-allowed transition"
                    >
                      Procedi alla conferma
                    </button>
                  ) : (
                    <p className="text-sm text-amber-600 text-center p-3 bg-amber-50 rounded-2xl">
                      Devi effettuare l'accesso per prenotare.
                    </p>
                  )}
                </div>
              )}
            </div>
          )}

          {step === 'confirm' && selectedServiceData && selectedDay && selectedTime && (
            <div className="space-y-6">
              <h3 className="font-semibold text-brand-blu">Conferma Prenotazione</h3>

              <div className="space-y-3 p-4 bg-gray-50 rounded-2xl">
                <div className="flex justify-between">
                  <span className="text-gray-600 text-sm">Servizio</span>
                  <span className="font-medium text-gray-800 text-sm">{selectedServiceData.titolo}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-600 text-sm">Data</span>
                  <span className="font-medium text-gray-800 text-sm">{selectedDay} {MONTHS[month]} {year}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-600 text-sm">Ora</span>
                  <span className="font-medium text-gray-800 text-sm">{selectedTime}</span>
                </div>
                <div className="border-t border-gray-200 pt-3 flex justify-between">
                  <span className="text-gray-600 font-medium">Totale</span>
                  <span className="font-bold text-brand-verde">
                    {user?.is_premium ? 'GRATIS' : `€${selectedServiceData.prezzo},00`}
                  </span>
                </div>
              </div>

              <div className="flex gap-3">
                <button onClick={() => setStep('calendar')} className="flex-1 py-3 border-2 border-gray-300 text-gray-600 rounded-2xl font-semibold hover:bg-gray-50 transition">
                  ← Indietro
                </button>
                <button
                  onClick={handleConfirm}
                  disabled={isSubmitting}
                  className="flex-1 py-3 bg-gradient-to-r from-brand-blu to-brand-verde text-white rounded-2xl font-semibold hover:opacity-90 disabled:opacity-50 transition flex items-center justify-center gap-2"
                >
                  {isSubmitting && <Loader2 className="animate-spin" size={18} />}
                  <CheckCircle size={18} />
                  Conferma
                </button>
              </div>
            </div>
          )}

          {step === 'confirm' && !selectedServiceData && selectedDay && selectedTime && (
            <div className="space-y-6">
              <h3 className="font-semibold text-brand-blu">Conferma Richiesta</h3>
              <p className="text-sm text-gray-600">Il tuo servizio personalizzato sarà concordato direttamente con il consulente.</p>

              <div className="space-y-3 p-4 bg-gray-50 rounded-2xl">
                <div className="flex justify-between">
                  <span className="text-gray-600 text-sm">Servizio</span>
                  <span className="font-medium text-gray-800 text-sm">Da definire</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-600 text-sm">Data</span>
                  <span className="font-medium text-gray-800 text-sm">{selectedDay} {MONTHS[month]} {year}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-600 text-sm">Ora</span>
                  <span className="font-medium text-gray-800 text-sm">{selectedTime}</span>
                </div>
                <div className="border-t border-gray-200 pt-3 flex justify-between">
                  <span className="text-gray-600 font-medium">Costo</span>
                  <span className="font-bold text-brand-verde">Da concordare</span>
                </div>
              </div>

              <div className="flex gap-3">
                <button onClick={() => setStep('calendar')} className="flex-1 py-3 border-2 border-gray-300 text-gray-600 rounded-2xl font-semibold hover:bg-gray-50 transition">
                  ← Indietro
                </button>
                <button
                  onClick={handleConfirm}
                  disabled={isSubmitting}
                  className="flex-1 py-3 bg-gradient-to-r from-brand-blu to-brand-verde text-white rounded-2xl font-semibold hover:opacity-90 disabled:opacity-50 transition flex items-center justify-center gap-2"
                >
                  {isSubmitting && <Loader2 className="animate-spin" size={18} />}
                  <CheckCircle size={18} />
                  Conferma Richiesta
                </button>
              </div>
            </div>
          )}

          {step === 'success' && (
            <div className="text-center py-6 space-y-4">
              <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto">
                <CheckCircle className="w-8 h-8 text-brand-verde" />
              </div>
              <h3 className="text-xl font-bold text-brand-blu">
                {selectedServiceData ? 'Prenotazione Confermata!' : 'Richiesta Inviata!'}
              </h3>
              <p className="text-gray-600 text-sm">
                {selectedServiceData?.titolo || 'Servizio da definire'}<br />
                {selectedDay} {MONTHS[month]} {year} alle {selectedTime}
              </p>
              <p className="text-xs text-gray-500">
                {selectedServiceData
                  ? 'Riceverai una email di conferma con il link Google Meet.'
                  : 'Ti contatteremo a breve per definire i dettagli del servizio.'
                }
              </p>
              <button onClick={onClose} className="px-6 py-3 bg-brand-blu text-white rounded-2xl font-semibold hover:opacity-90 transition">
                Chiudi
              </button>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
