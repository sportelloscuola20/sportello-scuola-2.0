import { useState, useCallback, useMemo } from 'react';
import { Calendar, ChevronLeft, ChevronRight, Clock, CheckCircle, CreditCard, X, Loader2 } from 'lucide-react';
import { useAuth } from '../components/Auth/AuthContext';
import { supabase } from '../lib/supabaseClient';
import type { TimeSlot } from '../types/database';

const SERVICES = [
  { id: 'consulenza-gps', label: 'Consulenza compilazione domande GPS', price: 39 },
  { id: 'consulenza-ata', label: 'Consulenza compilazione domande ATA', price: 39 },
  { id: 'scelta-150-scuole', label: 'Scelta 150 scuole GPS', price: 29 },
  { id: 'inoltro-istanze', label: 'Inoltro istanze online', price: 19 },
  { id: 'ricorso', label: 'Ricorso per esclusione graduatorie', price: 59 },
];

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

export default function ServicesPage() {
  const { user, isAuthenticated } = useAuth();
  const [selectedService, setSelectedService] = useState<string | null>(null);
  const [currentDate, setCurrentDate] = useState(new Date());
  const [selectedDay, setSelectedDay] = useState<number | null>(null);
  const [selectedTime, setSelectedTime] = useState<string | null>(null);
  const [step, setStep] = useState<'service' | 'calendar' | 'confirm' | 'success'>('service');
  const [loading, setLoading] = useState(false);

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
    return SERVICES.find(s => s.id === selectedService);
  }, [selectedService]);

  const handleConfirm = useCallback(async () => {
    if (!selectedServiceData || !selectedDay || !selectedTime) return;

    if (!isAuthenticated) {
      setStep('service');
      return;
    }

    setLoading(true);

    const dataOra = `${year}-${String(month + 1).padStart(2, '0')}-${String(selectedDay).padStart(2, '0')}T${selectedTime}:00`;

    if (user?.is_premium) {
      const { error } = await supabase.from('appointments').insert({
        user_id: user.id,
        servizio: selectedServiceData.label,
        data_ora: dataOra,
        is_paid: true,
      });
      if (!error) setStep('success');
    } else {
      const { error } = await supabase.from('appointments').insert({
        user_id: user.id,
        servizio: selectedServiceData.label,
        data_ora: dataOra,
        is_paid: false,
      });
      if (!error) setStep('success');
    }

    setLoading(false);
  }, [selectedServiceData, selectedDay, selectedTime, year, month, isAuthenticated, user]);

  const calendarDays = useMemo(() => {
    const days: (number | null)[] = [];
    for (let i = 0; i < firstDay; i++) days.push(null);
    for (let i = 1; i <= daysInMonth; i++) days.push(i);
    return days;
  }, [firstDay, daysInMonth]);

  const servicePrice = selectedServiceData?.price || 0;

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-green-50 py-8 px-4">
      <div className="max-w-4xl mx-auto">
        <div className="text-center mb-8">
          <h1 className="text-3xl font-bold text-brand-blu mb-2">Prenotazione Servizi</h1>
          <p className="text-gray-600">Consulenza personalizzata per la tua carriera scolastica</p>
        </div>

        <div className="bg-white/70 backdrop-blur-xs rounded-3xl shadow-lg border border-white/40 p-6 sm:p-8">
          {step === 'service' && (
            <div className="space-y-4">
              <h2 className="text-xl font-semibold text-brand-blu mb-6">Seleziona un servizio</h2>
              {SERVICES.map(s => (
                <button
                  key={s.id}
                  onClick={() => { setSelectedService(s.id); setStep('calendar'); }}
                  className={`w-full text-left p-4 rounded-2xl border-2 transition-all duration-200 ${
                    selectedService === s.id
                      ? 'border-brand-blu bg-brand-blu/5'
                      : 'border-gray-200 hover:border-brand-verde hover:bg-brand-verde/5'
                  }`}
                >
                  <div className="flex justify-between items-center">
                    <span className="font-medium text-gray-800">{s.label}</span>
                    <span className="text-brand-verde font-bold text-lg">
                      {user?.is_premium ? 'GRATIS' : `€${s.price},00`}
                    </span>
                  </div>
                  {user?.is_premium && (
                    <p className="text-xs text-brand-verde mt-1">Incluso nel tuo abbonamento Premium</p>
                  )}
                </button>
              ))}
            </div>
          )}

          {step === 'calendar' && (
            <div className="space-y-6">
              <button
                onClick={() => setStep('service')}
                className="text-brand-blu text-sm font-medium hover:underline"
              >
                ← Cambia servizio
              </button>

              <h2 className="text-xl font-semibold text-brand-blu">
                {selectedServiceData?.label}
              </h2>
              <p className="text-gray-500 text-sm">Seleziona un giorno disponibile</p>

              <div className="bg-white rounded-2xl border border-gray-200 p-4">
                <div className="flex items-center justify-between mb-4">
                  <button onClick={prevMonth} className="p-2 hover:bg-gray-100 rounded-xl transition">
                    <ChevronLeft size={20} className="text-gray-600" />
                  </button>
                  <h3 className="font-semibold text-gray-800">
                    {MONTHS[month]} {year}
                  </h3>
                  <button onClick={nextMonth} className="p-2 hover:bg-gray-100 rounded-xl transition">
                    <ChevronRight size={20} className="text-gray-600" />
                  </button>
                </div>

                <div className="grid grid-cols-7 gap-1 mb-2">
                  {DAYS_OF_WEEK.map(d => (
                    <div key={d} className="text-center text-xs font-medium text-gray-500 py-2">
                      {d}
                    </div>
                  ))}
                </div>

                <div className="grid grid-cols-7 gap-1">
                  {calendarDays.map((day, i) => (
                    <div key={i} className="aspect-square">
                      {day && (
                        <button
                          onClick={() => {
                            if (isDayAvailable(day)) {
                              setSelectedDay(day);
                              setSelectedTime(null);
                            }
                          }}
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
                  <h3 className="font-semibold text-gray-700">
                    Slot disponibili per {selectedDay} {MONTHS[month]} {year}
                  </h3>
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
                        Hai selezionato: {selectedDay} {MONTHS[month]} {year} alle {selectedTime}
                      </p>
                      <p className="text-gray-600 text-sm mt-1">
                        {user?.is_premium
                          ? 'La prenotazione è gratuita (abbonamento Premium attivo)'
                          : `Costo: €${servicePrice},00`}
                      </p>
                    </div>
                  )}

                  <button
                    onClick={() => {
                      if (!isAuthenticated) {
                        setStep('service');
                        return;
                      }
                      if (user?.is_premium || selectedTime) {
                        setStep('confirm');
                      }
                    }}
                    disabled={!selectedTime}
                    className="w-full py-3 bg-gradient-to-r from-brand-blu to-brand-verde text-white rounded-2xl font-semibold hover:opacity-90 disabled:opacity-50 disabled:cursor-not-allowed transition"
                  >
                    {isAuthenticated ? 'Proceedi alla conferma' : 'Accedi per prenotare'}
                  </button>
                </div>
              )}
            </div>
          )}

          {step === 'confirm' && selectedServiceData && selectedDay && selectedTime && (
            <div className="space-y-6">
              <h2 className="text-xl font-semibold text-brand-blu">Conferma Prenotazione</h2>

              <div className="space-y-4">
                <div className="p-4 bg-gray-50 rounded-2xl space-y-3">
                  <div className="flex justify-between">
                    <span className="text-gray-600">Servizio</span>
                    <span className="font-medium text-gray-800">{selectedServiceData.label}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-gray-600">Data</span>
                    <span className="font-medium text-gray-800">{selectedDay} {MONTHS[month]} {year}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-gray-600">Ora</span>
                    <span className="font-medium text-gray-800">{selectedTime}</span>
                  </div>
                  <div className="border-t border-gray-200 pt-3 flex justify-between">
                    <span className="text-gray-600 font-medium">Totale</span>
                    <span className="font-bold text-xl text-brand-verde">
                      {user?.is_premium ? 'GRATIS' : `€${servicePrice},00`}
                    </span>
                  </div>
                </div>

                {!user?.is_premium && (
                  <div className="p-4 bg-amber-50 rounded-2xl border border-amber-200">
                    <p className="text-amber-800 text-sm">
                      Il pagamento verrà gestito al momento della consulenza. Riceverai una email di conferma con i dettagli.
                    </p>
                  </div>
                )}
              </div>

              <div className="flex gap-3">
                <button
                  onClick={() => setStep('calendar')}
                  className="flex-1 py-3 border-2 border-gray-300 text-gray-600 rounded-2xl font-semibold hover:bg-gray-50 transition"
                >
                  ← Indietro
                </button>
                <button
                  onClick={handleConfirm}
                  disabled={loading}
                  className="flex-1 py-3 bg-gradient-to-r from-brand-blu to-brand-verde text-white rounded-2xl font-semibold hover:opacity-90 disabled:opacity-50 transition flex items-center justify-center gap-2"
                >
                  {loading && <Loader2 className="animate-spin" size={18} />}
                  <CheckCircle size={18} />
                  Conferma Prenotazione
                </button>
              </div>
            </div>
          )}

          {step === 'success' && (
            <div className="text-center py-8 space-y-6">
              <div className="w-20 h-20 bg-green-100 rounded-full flex items-center justify-center mx-auto">
                <CheckCircle className="w-10 h-10 text-brand-verde" />
              </div>
              <h2 className="text-2xl font-bold text-brand-blu">Prenotazione Confermata!</h2>
              <p className="text-gray-600">
                La tua prenotazione per <strong>{selectedServiceData?.label}</strong> è stata registrata con successo.
              </p>
              {selectedDay && selectedTime && (
                <p className="text-brand-verde font-semibold">
                  {selectedDay} {MONTHS[month]} {year} alle {selectedTime}
                </p>
              )}
              {!user?.is_premium && (
                <div className="p-4 bg-amber-50 rounded-2xl border border-amber-200 max-w-md mx-auto">
                  <p className="text-amber-800 text-sm">
                    Riceverai una email con i dettagli per il pagamento di €{servicePrice},00.
                  </p>
                </div>
              )}
              <button
                onClick={() => { setStep('service'); setSelectedDay(null); setSelectedTime(null); setSelectedService(null); }}
                className="px-8 py-3 bg-gradient-to-r from-brand-blu to-brand-verde text-white rounded-2xl font-semibold hover:opacity-90 transition"
              >
                Nuova Prenotazione
              </button>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
