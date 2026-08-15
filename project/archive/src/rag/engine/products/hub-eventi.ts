/**
 * ============================================================================
 *  EMA §30-35 — HUB EVENTI PRODUCT ENGINE
 *  Event calendar, ticketing, venue management, recommendation engine.
 * ============================================================================
 */

import { createLineage, type DataLineageObject } from '../../../foundation/types';
import { eventBus } from '../../../foundation/events';
import type { ProductId } from '../../../services/products';

// ─── Event Types ─────────────────────────────────────────────────────────────

export type EventType =
  | 'conferenza'
  | 'convegno'
  | 'corso_formazione'
  | 'workshop'
  | 'webinar'
  | 'fiera'
  | 'incontro_rete'
  | 'cerimonia';

export type EventStatus =
  | 'bozza'
  | 'pubblicato'
  | 'registrazioni_aperte'
  | 'registrazioni_chiuse'
  | 'in_corso'
  | 'concluso'
  | 'annullato';

export type TicketType = 'free' | 'paid' | 'invitation_only';

export interface SchedaEvento {
  id: string;
  title: string;
  description: string;
  type: EventType;
  status: EventStatus;
  organizer: string;
  venue: EventVenue;
  startDate: string;
  endDate: string;
  registrationDeadline?: string;
  ticketType: TicketType;
  ticketPrice?: number;
  maxAttendees?: number;
  currentAttendees: number;
  tags: string[];
  topics: string[];
  targetAudience: string[];
  speakers: EventSpeaker[];
  schedule: EventScheduleItem[];
  createdAt: string;
  updatedAt: string;
  url: string;
  lineage: DataLineageObject;
}

export interface EventVenue {
  name: string;
  address: string;
  city: string;
  regione: string;
  isOnline: boolean;
  onlineUrl?: string;
  capacity?: number;
}

export interface EventSpeaker {
  name: string;
  title: string;
  organization: string;
  bio?: string;
}

export interface EventScheduleItem {
  time: string;
  title: string;
  speaker?: string;
  duration: number; // minutes
}

// ─── Event Card ──────────────────────────────────────────────────────────────

export interface EventCard {
  id: string;
  title: string;
  type: EventType;
  typeLabel: string;
  status: EventStatus;
  statusLabel: string;
  organizer: string;
  venueName: string;
  isOnline: boolean;
  startDate: string;
  endDate: string;
  ticketType: TicketType;
  ticketPrice?: number;
  spotsAvailable?: number;
  speakerCount: number;
  url: string;
  lineage: DataLineageObject;
}

// ─── Functions ──────────────────────────────────────────────────────────────

/** Create an event */
export function createEvent(data: {
  title: string;
  description: string;
  type: EventType;
  organizer: string;
  venue: EventVenue;
  startDate: string;
  endDate: string;
  ticketType: TicketType;
  ticketPrice?: number;
  maxAttendees?: number;
  tags?: string[];
  topics?: string[];
  targetAudience?: string[];
}): SchedaEvento {
  return {
    id: `evt_${Date.now()}_${Math.random().toString(36).slice(2, 8)}`,
    title: data.title,
    description: data.description,
    type: data.type,
    status: 'bozza',
    organizer: data.organizer,
    venue: data.venue,
    startDate: data.startDate,
    endDate: data.endDate,
    ticketType: data.ticketType,
    ticketPrice: data.ticketPrice,
    maxAttendees: data.maxAttendees,
    currentAttendees: 0,
    tags: data.tags || [],
    topics: data.topics || [],
    targetAudience: data.targetAudience || [],
    speakers: [],
    schedule: [],
    createdAt: new Date().toISOString(),
    updatedAt: new Date().toISOString(),
    url: `/eventi/${Date.now()}`,
    lineage: createLineage('event_creation', 'new', {
      title: data.title,
      type: data.type,
    }),
  };
}

/** Create event card */
export function createEventCard(event: SchedaEvento): EventCard {
  const typeLabels: Record<EventType, string> = {
    conferenza: 'Conferenza',
    convegno: 'Convegno',
    corso_formazione: 'Corso di Formazione',
    workshop: 'Workshop',
    webinar: 'Webinar',
    fiera: 'Fiera',
    incontro_rete: 'Incontro di Rete',
    cerimonia: 'Cerimonia',
  };

  const statusLabels: Record<EventStatus, string> = {
    bozza: 'Bozza',
    pubblicato: 'Pubblicato',
    registrazioni_aperte: 'Registrazioni Aperte',
    registrazioni_chiuse: 'Registrazioni Chiuse',
    in_corso: 'In Corso',
    concluso: 'Concluso',
    annullato: 'Annullato',
  };

  return {
    id: event.id,
    title: event.title,
    type: event.type,
    typeLabel: typeLabels[event.type],
    status: event.status,
    statusLabel: statusLabels[event.status],
    organizer: event.organizer,
    venueName: event.venue.name,
    isOnline: event.venue.isOnline,
    startDate: event.startDate,
    endDate: event.endDate,
    ticketType: event.ticketType,
    ticketPrice: event.ticketPrice,
    spotsAvailable: event.maxAttendees ? event.maxAttendees - event.currentAttendees : undefined,
    speakerCount: event.speakers.length,
    url: event.url,
    lineage: event.lineage,
  };
}

/** Publish event */
export function publishEvent(event: SchedaEvento): SchedaEvento {
  if (event.status !== 'bozza') {
    throw new Error(`Cannot publish event in status ${event.status}`);
  }

  const updated = { ...event, status: 'pubblicato' as EventStatus, updatedAt: new Date().toISOString() };

  eventBus.emit({
    type: 'event.published',
    eventId: event.id,
    title: event.title,
    timestamp: new Date().toISOString(),
    lineage: createLineage('event_publish', `evt:${event.id}`, {}),
  } as any);

  return updated;
}

/** Open registrations */
export function openRegistrations(event: SchedaEvento): SchedaEvento {
  if (event.status !== 'pubblicato') {
    throw new Error(`Cannot open registrations for event in status ${event.status}`);
  }
  return { ...event, status: 'registrazioni_aperte', updatedAt: new Date().toISOString() };
}

/** Register attendee */
export function registerAttendee(event: SchedaEvento): SchedaEvento {
  if (event.status !== 'registrazioni_aperte') {
    throw new Error(`Cannot register for event in status ${event.status}`);
  }
  if (event.maxAttendees && event.currentAttendees >= event.maxAttendees) {
    throw new Error('Event is full');
  }

  const updated = {
    ...event,
    currentAttendees: event.currentAttendees + 1,
    updatedAt: new Date().toISOString(),
  };

  if (event.maxAttendees && updated.currentAttendees >= event.maxAttendees) {
    updated.status = 'registrazioni_chiuse';
  }

  return updated;
}

/** Get spots available */
export function getSpotsAvailable(event: SchedaEvento): number | undefined {
  if (!event.maxAttendees) return undefined;
  return event.maxAttendees - event.currentAttendees;
}

/** Add speaker to event */
export function addSpeaker(event: SchedaEvento, speaker: EventSpeaker): SchedaEvento {
  return {
    ...event,
    speakers: [...event.speakers, speaker],
    updatedAt: new Date().toISOString(),
  };
}

/** Add schedule item */
export function addScheduleItem(event: SchedaEvento, item: EventScheduleItem): SchedaEvento {
  return {
    ...event,
    schedule: [...event.schedule, item].sort((a, b) => a.time.localeCompare(b.time)),
    updatedAt: new Date().toISOString(),
  };
}

/** Get events by type */
export function getEventsByType(events: SchedaEvento[], type: EventType): SchedaEvento[] {
  return events.filter(e => e.type === type);
}

/** Get upcoming events */
export function getUpcomingEvents(events: SchedaEvento[]): SchedaEvento[] {
  const now = new Date();
  return events
    .filter(e => new Date(e.startDate) > now && e.status !== 'annullato' && e.status !== 'concluso')
    .sort((a, b) => new Date(a.startDate).getTime() - new Date(b.startDate).getTime());
}

/** Get events by regione */
export function getEventsByRegion(events: SchedaEvento[], regione: string): SchedaEvento[] {
  return events.filter(e => e.venue.regione === regione);
}

/** Calculate event stats */
export function getEventStats(events: SchedaEvento[]): {
  total: number;
  byStatus: Record<EventStatus, number>;
  byType: Record<EventType, number>;
  avgAttendees: number;
  totalRevenue: number;
} {
  const byStatus: Record<EventStatus, number> = {
    bozza: 0, pubblicato: 0, registrazioni_aperte: 0,
    registrazioni_chiuse: 0, in_corso: 0, concluso: 0, annullato: 0,
  };
  const byType: Record<EventType, number> = {
    conferenza: 0, convegno: 0, corso_formazione: 0, workshop: 0,
    webinar: 0, fiera: 0, incontro_rete: 0, cerimonia: 0,
  };

  let totalAttendees = 0;
  let totalRevenue = 0;

  for (const event of events) {
    byStatus[event.status]++;
    byType[event.type]++;
    totalAttendees += event.currentAttendees;
    if (event.ticketPrice) {
      totalRevenue += event.ticketPrice * event.currentAttendees;
    }
  }

  return {
    total: events.length,
    byStatus,
    byType,
    avgAttendees: events.length > 0 ? totalAttendees / events.length : 0,
    totalRevenue,
  };
}
