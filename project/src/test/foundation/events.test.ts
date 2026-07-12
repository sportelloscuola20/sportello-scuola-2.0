import { describe, it, expect, beforeEach } from 'vitest';
import { InMemoryEventBus } from '../../foundation/events';
import type { DomainEvent, EventType } from '../../foundation/events';

describe('EventBus', () => {
  let bus: InMemoryEventBus;

  beforeEach(() => {
    bus = new InMemoryEventBus();
  });

  it('should emit and receive events', () => {
    const received: DomainEvent[] = [];
    bus.on('news.published', (e) => received.push(e));

    bus.emit('news.published', 'test', { title: 'Test News' });

    expect(received).toHaveLength(1);
    expect(received[0].type).toBe('news.published');
    expect(received[0].source).toBe('test');
    expect(received[0].payload).toEqual({ title: 'Test News' });
  });

  it('should support wildcard handlers', () => {
    const received: DomainEvent[] = [];
    bus.on('*', (e) => received.push(e));

    bus.emit('news.published', 'test', {});
    bus.emit('scadenza.created', 'test', {});

    expect(received).toHaveLength(2);
  });

  it('should support once handlers', () => {
    let count = 0;
    bus.once('news.published', () => count++);

    bus.emit('news.published', 'test', {});
    bus.emit('news.published', 'test', {});

    expect(count).toBe(1);
  });

  it('should support off to unsubscribe', () => {
    let count = 0;
    const handler = () => count++;
    bus.on('news.published', handler);

    bus.emit('news.published', 'test', {});
    expect(count).toBe(1);

    bus.off('news.published', handler);
    bus.emit('news.published', 'test', {});
    expect(count).toBe(1);
  });

  it('should maintain event history', () => {
    bus.emit('news.published', 'test', {});
    bus.emit('scadenza.created', 'test', {});

    const all = bus.getHistory();
    expect(all).toHaveLength(2);

    const newsOnly = bus.getHistory('news.published');
    expect(newsOnly).toHaveLength(1);
  });

  it('should limit history size', () => {
    for (let i = 0; i < 150; i++) {
      bus.emit('news.published', 'test', { i });
    }
    const history = bus.getHistory();
    expect(history.length).toBeLessThanOrEqual(100);
  });
});
