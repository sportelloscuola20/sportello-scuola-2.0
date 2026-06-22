import { useState, useEffect } from 'react';
import { Calendar, Clock, Video, MapPin, ExternalLink } from 'lucide-react';
import { supabase } from '../lib/supabaseClient';
import { useAuth } from './Auth/AuthContext';

interface Appointment {
  id: string;
  servizio: string;
  data_ora: string;
  is_paid: boolean;
  meet_link?: string;
  luogo?: string;
  note?: string;
}

function CountdownBlock({ targetDate }: { targetDate: Date }) {
  const [now, setNow] = useState(Date.now());

  useEffect(() => {
    const id = setInterval(() => setNow(Date.now()), 1000);
    return () => clearInterval(id);
  }, []);

  const diff = targetDate.getTime() - now;
  if (diff <= 0) return <span className="text-green-600 font-semibold text-xs">In corso / Completato</span>;

  const days = Math.floor(diff / 86400000);
  const hours = Math.floor((diff % 86400000) / 3600000);
  const minutes = Math.floor((diff % 3600000) / 60000);

  return (
    <span className="text-brand-ambra font-bold text-xs font-mono">
      {days > 0 ? `${days}g ` : ''}{String(hours).padStart(2, '0')}h {String(minutes).padStart(2, '0')}m
    </span>
  );
}

export default function CalendarWidget() {
  const { user } = useAuth();
  const [appointments, setAppointments] = useState<Appointment[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (!user) { setLoading(false); return; }
    supabase
      .from('appointments')
      .select('*')
      .eq('user_id', user.id)
      .order('data_ora', { ascending: true })
      .then(({ data }) => {
        if (data) setAppointments(data as Appointment[]);
        setLoading(false);
      });
  }, [user]);

  const formatDate = (iso: string) => {
    const d = new Date(iso);
    return d.toLocaleDateString('it-IT', {
      weekday: 'short', day: 'numeric', month: 'short', year: 'numeric',
    });
  };

  const formatTime = (iso: string) => {
    const d = new Date(iso);
    return d.toLocaleTimeString('it-IT', { hour: '2-digit', minute: '2-digit' });
  };

  if (!user) {
    return (
      <div className="p-6 text-center text-gray-500 text-sm">
        Accedi per visualizzare i tuoi appuntamenti.
      </div>
    );
  }

  return (
    <div>
      <div className="flex items-center gap-2 mb-4">
        <Calendar size={18} className="text-brand-blu" />
        <h3 className="font-semibold text-gray-800">Prossimi Appuntamenti</h3>
      </div>

      {loading ? (
        <div className="text-center py-6">
          <div className="w-5 h-5 border-2 border-brand-blu border-t-transparent rounded-full animate-spin mx-auto" />
        </div>
      ) : appointments.length === 0 ? (
        <div className="text-center py-6 text-gray-400">
          <Calendar size={28} className="mx-auto mb-2 opacity-50" />
          <p className="text-sm">Nessun appuntamento in programma.</p>
          <p className="text-xs mt-1">Prenota una consulenza dalla sezione Servizi.</p>
        </div>
      ) : (
        <div className="space-y-3 max-h-72 overflow-y-auto pr-1">
          {appointments.map(app => {
            const appDate = new Date(app.data_ora);
            return (
              <div
                key={app.id}
                className={`p-4 rounded-xl border transition ${
                  app.is_paid
                    ? 'bg-green-50 border-green-200'
                    : 'bg-amber-50 border-amber-200'
                }`}
              >
                <div className="flex items-start justify-between mb-2">
                  <div>
                    <p className="text-sm font-semibold text-gray-800">{app.servizio}</p>
                    <p className="text-xs text-gray-500 mt-0.5 flex items-center gap-1">
                      <Calendar size={11} /> {formatDate(app.data_ora)}
                    </p>
                    <p className="text-xs text-gray-500 flex items-center gap-1">
                      <Clock size={11} /> {formatTime(app.data_ora)}
                    </p>
                  </div>
                  <div className="text-right">
                    <CountdownBlock targetDate={appDate} />
                    <p className={`text-[10px] font-medium mt-1 ${app.is_paid ? 'text-green-600' : 'text-amber-600'}`}>
                      {app.is_paid ? 'Pagato' : 'In attesa'}
                    </p>
                  </div>
                </div>

                <div className="flex items-center gap-2 mt-2">
                  {app.meet_link && (
                    <a
                      href={app.meet_link}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="flex items-center gap-1 px-2.5 py-1 bg-brand-blu text-white rounded-lg text-xs font-medium hover:bg-brand-blu/90 transition"
                    >
                      <Video size={12} /> Google Meet
                    </a>
                  )}
                  {app.luogo && (
                    <span className="flex items-center gap-1 text-xs text-gray-500">
                      <MapPin size={11} /> {app.luogo}
                    </span>
                  )}
                </div>

                {app.note && (
                  <p className="text-xs text-gray-500 mt-2 italic">{app.note}</p>
                )}
              </div>
            );
          })}
        </div>
      )}
    </div>
  );
}
