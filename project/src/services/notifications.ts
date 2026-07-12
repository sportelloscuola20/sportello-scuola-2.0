/**
 * ============================================================================
 *  EMA §11 — EVENT & NOTIFICATION ENGINE
 *  Server-side event processing + user notifications.
 * ============================================================================
 */

import type { DomainEvent, EventType } from '../foundation/events';
import { eventBus } from '../foundation/events';
import { supabase } from '../lib/supabaseClient';

export interface Notification {
  id: string;
  user_id: string;
  type: EventType;
  title: string;
  body: string;
  link?: string;
  read: boolean;
  created_at: string;
}

export interface NotificationPreference {
  user_id: string;
  event_type: EventType;
  enabled: boolean;
  channel: 'in_app' | 'email' | 'push';
}

/** Default notification templates per event type */
const NOTIFICATION_TEMPLATES: Record<string, { title: string; body: string; link?: string }> = {
  'news.published': {
    title: 'Nuova notizia pubblicata',
    body: 'Una nuova notizia è stata aggiunta alla piattaforma.',
    link: '/notizie',
  },
  'scadenza.expiring': {
    title: 'Scadenza in arrivo',
    body: 'Una scadenza importante sta per scadere.',
    link: '/scadenze',
  },
  'scadenza.expired': {
    title: 'Scadenza scaduta',
    body: 'Una scadenza è appena scaduta.',
    link: '/scadenze',
  },
  'documento.approved': {
    title: 'Documento approvato',
    body: 'Un documento normativo è stato approvato.',
    link: '/normativa',
  },
  'interpello.created': {
    title: 'Nuovo interpello',
    body: 'Un nuovo interpello è stato pubblicato.',
    link: '/interpelli',
  },
  'chat.response_generated': {
    title: 'Risposta AI pronta',
    body: 'Il consulente ha elaborato una risposta alla tua domanda.',
    link: '/assistente',
  },
};

/** Create a notification for a user */
export async function createNotification(
  userId: string,
  eventType: EventType,
  overrides?: { title?: string; body?: string; link?: string }
): Promise<string | null> {
  const template = NOTIFICATION_TEMPLATES[eventType];
  if (!template) return null;

  try {
    const { data, error } = await supabase
      .from('user_notifications')
      .insert({
        user_id: userId,
        type: eventType,
        title: overrides?.title || template.title,
        body: overrides?.body || template.body,
        link: overrides?.link || template.link,
        read: false,
      })
      .select('id')
      .single();
    if (error || !data) return null;
    return data.id;
  } catch {
    return null;
  }
}

/** Get user notifications */
export async function getUserNotifications(
  userId: string,
  options?: { unreadOnly?: boolean; limit?: number }
): Promise<Notification[]> {
  try {
    let query = supabase
      .from('user_notifications')
      .select('*')
      .eq('user_id', userId)
      .order('created_at', { ascending: false })
      .limit(options?.limit || 50);

    if (options?.unreadOnly) query = query.eq('read', false);

    const { data, error } = await query;
    if (error || !data) return [];
    return data as Notification[];
  } catch {
    return [];
  }
}

/** Mark notification as read */
export async function markNotificationRead(notificationId: string): Promise<boolean> {
  try {
    const { error } = await supabase
      .from('user_notifications')
      .update({ read: true })
      .eq('id', notificationId);
    return !error;
  } catch {
    return false;
  }
}

/** Mark all user notifications as read */
export async function markAllNotificationsRead(userId: string): Promise<boolean> {
  try {
    const { error } = await supabase
      .from('user_notifications')
      .update({ read: true })
      .eq('user_id', userId)
      .eq('read', false);
    return !error;
  } catch {
    return false;
  }
}

/** Get unread count */
export async function getUnreadCount(userId: string): Promise<number> {
  try {
    const { count, error } = await supabase
      .from('user_notifications')
      .select('*', { count: 'exact', head: true })
      .eq('user_id', userId)
      .eq('read', false);
    if (error) return 0;
    return count || 0;
  } catch {
    return 0;
  }
}

/** Subscribe to real-time notifications */
export function subscribeToNotifications(
  userId: string,
  callback: (notification: Notification) => void
): () => void {
  const channel = supabase
    .channel('user-notifications')
    .on(
      'postgres_changes',
      {
        event: 'INSERT',
        schema: 'public',
        table: 'user_notifications',
        filter: `user_id=eq.${userId}`,
      },
      (payload) => {
        callback(payload.new as Notification);
      }
    )
    .subscribe();

  return () => {
    supabase.removeChannel(channel);
  };
}
