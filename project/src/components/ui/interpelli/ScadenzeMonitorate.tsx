import { useState, useEffect, useCallback } from 'react';
import { supabase } from '../../../lib/supabaseClient';
import type { SavedAlert } from '../../../types/database';

function getSavedAlerts(): SavedAlert[] {
  try {
    const raw = localStorage.getItem('ss2_saved_alerts');
    return raw ? JSON.parse(raw) : [];
  } catch {
    return [];
  }
}

function removeSavedAlert(id: string): void {
  const current = getSavedAlerts().filter(a => a.id !== id);
  localStorage.setItem('ss2_saved_alerts', JSON.stringify(current));
}

export default function ScadenzeMonitorate() {
  const [alerts, setAlerts] = useState<SavedAlert[]>([]);

  useEffect(() => {
    setAlerts(getSavedAlerts());
  }, []);

  const getDaysRemaining = (dueDate: string | null): number | null => {
    if (!dueDate) return null;
    const diff = new Date(dueDate).getTime() - Date.now();
    return Math.ceil(diff / (1000 * 60 * 60 * 24));
  };

  const removeAlert = useCallback((id: string) => {
    removeSavedAlert(id);
    setAlerts(prev => prev.filter(a => a.id !== id));
  }, []);

  if (alerts.length === 0) {
    return (
      <div className="p-4 bg-gray-50 rounded-2xl text-center text-gray-400 text-sm">
        <p>Nessuna scadenza monitorata. Clicca la campanella sulle notizie per salvarle.</p>
      </div>
    );
  }

  return (
    <div className="space-y-3">
      <h3 className="font-semibold text-brand-blu flex items-center gap-2">
        <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
        </svg>
        Le tue Scadenze Monitorate
      </h3>
      {alerts.map(alert => {
        const days = getDaysRemaining(alert.dueDate);
        return (
          <div key={alert.id} className="flex items-center justify-between p-3 bg-white border border-gray-200 rounded-2xl">
            <div className="flex-1 min-w-0">
              <p className="text-sm font-medium text-gray-800 truncate">{alert.title}</p>
              {days !== null ? (
                <p className={`text-xs font-semibold ${days <= 7 ? 'text-red-500' : days <= 30 ? 'text-amber-600' : 'text-green-600'}`}>
                  {days > 0 ? `${days} giorni rimanenti` : 'Scaduto'}
                </p>
              ) : (
                <p className="text-xs text-gray-400">Nessuna scadenza</p>
              )}
            </div>
            <button
              onClick={() => removeAlert(alert.id)}
              className="text-gray-400 hover:text-red-500 transition ml-2"
            >
              <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
              </svg>
            </button>
          </div>
        );
      })}
    </div>
  );
}
