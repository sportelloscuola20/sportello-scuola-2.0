import type { MonitoredSource, IntelligenceDashboardStats } from '../types/intelligence';
import { supabase } from '../lib/supabaseClient';

export async function fetchMonitoredSources(): Promise<MonitoredSource[]> {
  try {
    const { data, error } = await supabase
      .from('monitored_sources')
      .select('*')
      .order('livello', { ascending: true })
      .order('nome', { ascending: true });
    if (!error && data && data.length > 0) return data as MonitoredSource[];
  } catch {}
  return [];
}

export async function fetchDashboardStats(): Promise<IntelligenceDashboardStats | null> {
  try {
    const { data, error } = await supabase
      .from('intelligence_dashboard_stats')
      .select('*')
      .maybeSingle();
    if (!error && data) return data as IntelligenceDashboardStats;
  } catch {}
  return null;
}

export function getDashboardFallbackStats(): IntelligenceDashboardStats {
  return {
    fonti_attive: 48,
    fonti_totali: 48,
    documenti_da_elaborare: 0,
    documenti_ultime_24h: 0,
    notizie_oggi: 0,
    notizie_attive: 6,
    collegamenti_knowledge_graph: 0,
    scadenze_attive: 5,
    scadenze_imminenti: 3,
    ultimo_monitoraggio: null,
  };
}

export async function triggerMonitorSources(): Promise<{ success: boolean; message: string }> {
  try {
    const { data, error } = await supabase.functions.invoke('monitor-sources', {
      method: 'POST',
    });
    if (error) throw error;
    return { success: true, message: data?.message || 'Monitoraggio avviato' };
  } catch (e: any) {
    return { success: false, message: e.message || 'Errore attivazione monitoraggio' };
  }
}

export async function triggerIngestNews(): Promise<{ success: boolean; message: string }> {
  try {
    const { data, error } = await supabase.functions.invoke('ingest-news', {
      method: 'POST',
    });
    if (error) throw error;
    return { success: true, message: data?.message || 'Elaborazione avviata' };
  } catch (e: any) {
    return { success: false, message: e.message || 'Errore attivazione elaborazione' };
  }
}
