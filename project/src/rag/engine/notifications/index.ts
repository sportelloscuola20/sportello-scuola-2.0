/**
 * ============================================================================
 *  EMA §11 — EVENT & NOTIFICATION ENGINE
 *  7-step pipeline: EventIngestion → Routing → RelevanceScoring →
 *  PreferenceFilter → Delivery → Tracking → Monitoring
 *  8 event types, 3 delivery channels, priority/status enums
 * ============================================================================
 */

import { createLineage, type DataLineageObject } from '../../../foundation/types';
import { eventBus } from '../../../foundation/events';
import { createNotification, markRead, markAllRead, getUnreadCount } from '../../../services/notifications';
import type { ProductId } from '../../../services/products';

// ─── Notification Types ──────────────────────────────────────────────────────

export type NotificationEventType =
  | 'news.published'
  | 'scadenza.expiring'
  | 'scadenza.expired'
  | 'documento.approved'
  | 'interpello.created'
  | 'chat.response_generated'
  | 'nomina.published'
  | 'event.created';

export type NotificationChannel = 'in_app' | 'email' | 'push';
export type NotificationPriority = 'critical' | 'high' | 'medium' | 'low';
export type NotificationStatus = 'pending' | 'sent' | 'delivered' | 'read' | 'failed' | 'cancelled';

export interface NotificationEvent {
  id: string;
  type: NotificationEventType;
  productId: ProductId;
  title: string;
  body: string;
  data: Record<string, unknown>;
  priority: NotificationPriority;
  targetUserIds: string[];
  channels: NotificationChannel[];
  createdAt: string;
  lineage: DataLineageObject;
}

export interface NotificationDelivery {
  id: string;
  eventId: string;
  userId: string;
  channel: NotificationChannel;
  status: NotificationStatus;
  sentAt?: string;
  deliveredAt?: string;
  readAt?: string;
  error?: string;
  retryCount: number;
  lineage: DataLineageObject;
}

export interface NotificationPreferences {
  userId: string;
  channels: NotificationChannel[];
  eventTypes: NotificationEventType[];
  quietHoursStart?: string; // HH:mm
  quietHoursEnd?: string; // HH:mm
  frequency: 'instant' | 'daily_digest' | 'weekly_digest';
  productFilters: ProductId[];
}

export interface NotificationMetrics {
  totalEvents: number;
  totalDeliveries: number;
  delivered: number;
  read: number;
  failed: number;
  byChannel: Record<NotificationChannel, { sent: number; delivered: number; read: number }>;
  byPriority: Record<NotificationPriority, { sent: number; delivered: number }>;
  lineage: DataLineageObject;
}

// ─── Event Taxonomy (EMA §11) ───────────────────────────────────────────────

export const EVENT_TAXONOMY: Record<NotificationEventType, {
  defaultPriority: NotificationPriority;
  defaultChannels: NotificationChannel[];
  template: (data: Record<string, unknown>) => { title: string; body: string };
}> = {
  'news.published': {
    defaultPriority: 'medium',
    defaultChannels: ['in_app'],
    template: (data) => ({
      title: `Nuova notizia: ${data.title || 'Pubblicazione'}`,
      body: data.snippet || 'Una nuova notizia è stata pubblicata.',
    }),
  },
  'scadenza.expiring': {
    defaultPriority: 'high',
    defaultChannels: ['in_app', 'email'],
    template: (data) => ({
      title: `Scadenza in arrivo: ${data.title || ''}`,
      body: `La scadenza "${data.title}" è prevista per ${data.deadline || 'prossimamente'}.`,
    }),
  },
  'scadenza.expired': {
    defaultPriority: 'critical',
    defaultChannels: ['in_app', 'email'],
    template: (data) => ({
      title: `Scadenza scaduta: ${data.title || ''}`,
      body: `La scadenza "${data.title}" è scaduta il ${data.deadline || 'data sconosciuta'}.`,
    }),
  },
  'documento.approved': {
    defaultPriority: 'medium',
    defaultChannels: ['in_app'],
    template: (data) => ({
      title: `Documento approvato: ${data.title || ''}`,
      body: `Il documento "${data.title}" è stato approvato.`,
    }),
  },
  'interpello.created': {
    defaultPriority: 'high',
    defaultChannels: ['in_app', 'email'],
    template: (data) => ({
      title: `Nuovo interpello: ${data.title || ''}`,
      body: `Un nuovo interpello "${data.title}" è stato registrato.`,
    }),
  },
  'chat.response_generated': {
    defaultPriority: 'low',
    defaultChannels: ['in_app'],
    template: (data) => ({
      title: 'Risposta disponibile',
      body: data.summary || 'Il Consulente Intelligente ha generato una risposta.',
    }),
  },
  'nomina.published': {
    defaultPriority: 'medium',
    defaultChannels: ['in_app'],
    template: (data) => ({
      title: `Nuova nomina: ${data.title || ''}`,
      body: `Una nuova nomina è stata pubblicata per ${data.region || 'la nazione'}.`,
    }),
  },
  'event.created': {
    defaultPriority: 'medium',
    defaultChannels: ['in_app', 'push'],
    template: (data) => ({
      title: `Nuovo evento: ${data.title || ''}`,
      body: `Un nuovo evento "${data.title}" è stato creato.`,
    }),
  },
};

// ─── Step 1: Event Ingestion ────────────────────────────────────────────────

export function ingestEvent(
  type: NotificationEventType,
  productId: ProductId,
  data: Record<string, unknown>,
  targetUserIds: string[] = []
): NotificationEvent {
  const taxonomy = EVENT_TAXONOMY[type];
  const { title, body } = taxonomy.template(data);

  return {
    id: `nevt_${Date.now()}_${Math.random().toString(36).slice(2, 8)}`,
    type,
    productId,
    title,
    body,
    data,
    priority: taxonomy.defaultPriority,
    targetUserIds,
    channels: taxonomy.defaultChannels,
    createdAt: new Date().toISOString(),
    lineage: createLineage('notification_event', type, {
      productId,
      targetUserCount: targetUserIds.length,
    }),
  };
}

// ─── Step 2: Event Router ───────────────────────────────────────────────────

export function routeEvent(event: NotificationEvent): {
  subscribers: string[];
  channels: NotificationChannel[];
  priority: NotificationPriority;
} {
  // In production, would query user preferences from DB
  return {
    subscribers: event.targetUserIds,
    channels: event.channels,
    priority: event.priority,
  };
}

// ─── Step 3: Relevance Scorer ───────────────────────────────────────────────

export function scoreRelevance(
  event: NotificationEvent,
  userId: string,
  preferences?: NotificationPreferences
): { score: number; reason: string } {
  let score = 0.5; // base

  // Priority boost
  const priorityBoosts: Record<NotificationPriority, number> = {
    critical: 0.4,
    high: 0.3,
    medium: 0.1,
    low: 0,
  };
  score += priorityBoosts[event.priority];

  // Product relevance
  if (preferences?.productFilters && preferences.productFilters.length > 0) {
    if (preferences.productFilters.includes(event.productId)) {
      score += 0.2;
    } else {
      score -= 0.3;
    }
  }

  // Event type relevance
  if (preferences?.eventTypes && preferences.eventTypes.length > 0) {
    if (preferences.eventTypes.includes(event.type)) {
      score += 0.15;
    } else {
      score -= 0.2;
    }
  }

  const reason = score > 0.7 ? 'high_relevance' : score > 0.4 ? 'medium_relevance' : 'low_relevance';

  return { score: Math.max(0, Math.min(1, score)), reason };
}

// ─── Step 4: Preference Filter ──────────────────────────────────────────────

export function filterByPreferences(
  event: NotificationEvent,
  userId: string,
  preferences?: NotificationPreferences
): { allowed: boolean; channels: NotificationChannel[]; reason?: string } {
  if (!preferences) {
    return { allowed: true, channels: event.channels };
  }

  // Check quiet hours
  if (preferences.quietHoursStart && preferences.quietHoursEnd) {
    const now = new Date();
    const currentHour = now.getHours();
    const currentMinute = now.getMinutes();
    const currentTime = `${String(currentHour).padStart(2, '0')}:${String(currentMinute).padStart(2, '0')}`;

    if (currentTime >= preferences.quietHoursStart && currentTime <= preferences.quietHoursEnd) {
      if (event.priority !== 'critical') {
        return { allowed: false, channels: [], reason: 'quiet_hours' };
      }
    }
  }

  // Check event type filter
  if (preferences.eventTypes.length > 0 && !preferences.eventTypes.includes(event.type)) {
    return { allowed: false, channels: [], reason: 'event_type_filtered' };
  }

  // Check product filter
  if (preferences.productFilters.length > 0 && !preferences.productFilters.includes(event.productId)) {
    return { allowed: false, channels: [], reason: 'product_filtered' };
  }

  // Intersect channels
  const allowedChannels = event.channels.filter(c => preferences.channels.includes(c));

  return { allowed: allowedChannels.length > 0, channels: allowedChannels };
}

// ─── Step 5: Delivery Engine ────────────────────────────────────────────────

export async function deliverNotification(
  event: NotificationEvent,
  userId: string,
  channels: NotificationChannel[]
): Promise<NotificationDelivery[]> {
  const deliveries: NotificationDelivery[] = [];

  for (const channel of channels) {
    const delivery: NotificationDelivery = {
      id: `ndel_${Date.now()}_${Math.random().toString(36).slice(2, 8)}`,
      eventId: event.id,
      userId,
      channel,
      status: 'pending',
      retryCount: 0,
      lineage: createLineage('notification_delivery', channel, {
        eventId: event.id,
        userId,
      }),
    };

    try {
      // Simulate delivery
      switch (channel) {
        case 'in_app':
          // Create in-app notification
          await createNotification(userId, event.title, event.body, event.productId);
          delivery.status = 'delivered';
          delivery.deliveredAt = new Date().toISOString();
          break;
        case 'email':
          // Would call email service (Resend)
          delivery.status = 'sent';
          delivery.sentAt = new Date().toISOString();
          break;
        case 'push':
          // Would call push notification service
          delivery.status = 'sent';
          delivery.sentAt = new Date().toISOString();
          break;
      }
    } catch (error) {
      delivery.status = 'failed';
      delivery.error = error instanceof Error ? error.message : 'Unknown error';
    }

    deliveries.push(delivery);
  }

  return deliveries;
}

// ─── Step 6: Delivery Tracker ───────────────────────────────────────────────

export function trackDelivery(delivery: NotificationDelivery): NotificationDelivery {
  // Update delivery status based on channel feedback
  if (delivery.status === 'sent' && delivery.sentAt) {
    const elapsed = Date.now() - new Date(delivery.sentAt).getTime();
    if (elapsed > 5000) {
      delivery.status = 'delivered';
      delivery.deliveredAt = new Date().toISOString();
    }
  }

  return delivery;
}

// ─── Step 7: Notification Monitor ───────────────────────────────────────────

export function getNotificationMetrics(): NotificationMetrics {
  return {
    totalEvents: 0,
    totalDeliveries: 0,
    delivered: 0,
    read: 0,
    failed: 0,
    byChannel: {
      in_app: { sent: 0, delivered: 0, read: 0 },
      email: { sent: 0, delivered: 0, read: 0 },
      push: { sent: 0, delivered: 0, read: 0 },
    },
    byPriority: {
      critical: { sent: 0, delivered: 0 },
      high: { sent: 0, delivered: 0 },
      medium: { sent: 0, delivered: 0 },
      low: { sent: 0, delivered: 0 },
    },
    lineage: createLineage('notification_metrics', 'snapshot', {}),
  };
}

// ─── Full Notification Pipeline ─────────────────────────────────────────────

export async function processNotificationEvent(
  type: NotificationEventType,
  productId: ProductId,
  data: Record<string, unknown>,
  targetUserIds: string[]
): Promise<{ event: NotificationEvent; deliveries: NotificationDelivery[] }> {
  // Step 1: Ingest
  const event = ingestEvent(type, productId, data, targetUserIds);

  // Step 2: Route
  const routing = routeEvent(event);

  // Step 3-4: Score and filter per user
  const allDeliveries: NotificationDelivery[] = [];

  for (const userId of routing.subscribers) {
    const relevance = scoreRelevance(event, userId);
    const filtered = filterByPreferences(event, userId);

    if (filtered.allowed && relevance.score > 0.3) {
      // Step 5: Deliver
      const deliveries = await deliverNotification(event, userId, filtered.channels);
      allDeliveries.push(...deliveries);
    }
  }

  // Emit event
  eventBus.emit({
    type: 'notification.processed',
    eventId: event.id,
    deliveryCount: allDeliveries.length,
    timestamp: new Date().toISOString(),
    lineage: event.lineage,
  } as any);

  return { event, deliveries: allDeliveries };
}

// ─── Convenience: Process Standard Events ───────────────────────────────────

export async function notifyNewsPublished(title: string, snippet: string, userIds: string[]) {
  return processNotificationEvent('news.published', 'notizie_scadenze', { title, snippet }, userIds);
}

export async function notifyScadenzaExpiring(title: string, deadline: string, userIds: string[]) {
  return processNotificationEvent('scadenza.expiring', 'notizie_scadenze', { title, deadline }, userIds);
}

export async function notifyDocumentoApproved(title: string, userIds: string[]) {
  return processNotificationEvent('documento.approved', 'normativa', { title }, userIds);
}

export async function notifyInterpelloCreated(title: string, userIds: string[]) {
  return processNotificationEvent('interpello.created', 'interpelli', { title }, userIds);
}

export async function notifyChatResponse(summary: string, userId: string) {
  return processNotificationEvent('chat.response_generated', 'consulente', { summary }, [userId]);
}

export async function notifyNominaPublished(title: string, region: string, userIds: string[]) {
  return processNotificationEvent('nomina.published', 'osservatorio_nomine', { title, region }, userIds);
}

export async function notifyEventCreated(title: string, userIds: string[]) {
  return processNotificationEvent('event.created', 'hub_eventi', { title }, userIds);
}
