import { describe, test, expect, beforeEach, vi } from 'vitest';
import { TypedEventEmitter } from '../src/EventEmitter.js';
import type { GistDBEvents, IEventEmitterLogger } from '../src/types.js';

describe('TypedEventEmitter', () => {
  let emitter: TypedEventEmitter<GistDBEvents>;

  beforeEach(() => {
    emitter = new TypedEventEmitter();
  });

  describe('Basic on / emit / off lifecycle', () => {
    test('registers listeners and triggers callback with payload', () => {
      const handler = vi.fn();
      emitter.on('change', handler);

      const payload = {
        collection: 'users',
        id: '123',
        action: 'set' as const,
        data: { name: 'Alice' },
      };

      const emitted = emitter.emit('change', payload);

      expect(emitted).toBe(true);
      expect(handler).toHaveBeenCalledTimes(1);
      expect(handler).toHaveBeenCalledWith(payload);
    });

    test('returns false from emit when no listeners are registered', () => {
      const emitted = emitter.emit('db:clear');
      expect(emitted).toBe(false);
    });

    test('supports unsubscribe function returned by on()', () => {
      const handler = vi.fn();
      const unsubscribe = emitter.on('network:online', handler);

      expect(emitter.listenerCount('network:online')).toBe(1);

      unsubscribe();
      expect(emitter.listenerCount('network:online')).toBe(0);

      emitter.emit('network:online');
      expect(handler).not.toHaveBeenCalled();
    });

    test('removes listener via off()', () => {
      const handler = vi.fn();
      emitter.on('network:offline', handler);
      expect(emitter.listenerCount('network:offline')).toBe(1);

      emitter.off('network:offline', handler);
      expect(emitter.listenerCount('network:offline')).toBe(0);

      emitter.emit('network:offline');
      expect(handler).not.toHaveBeenCalled();
    });

    test('validates callback is a function', () => {
      expect(() => {
        emitter.on('change', 'invalid' as unknown as any);
      }).toThrow(TypeError);
    });
  });

  describe('Single execution (once)', () => {
    test('executes handler exactly once and automatically cleans up', () => {
      const handler = vi.fn();
      emitter.once('sync:start', handler);

      expect(emitter.listenerCount('sync:start')).toBe(1);

      emitter.emit('sync:start');
      expect(handler).toHaveBeenCalledTimes(1);
      expect(emitter.listenerCount('sync:start')).toBe(0);

      emitter.emit('sync:start');
      expect(handler).toHaveBeenCalledTimes(1);
    });

    test('supports unsubscribe before once fires', () => {
      const handler = vi.fn();
      const unsubscribe = emitter.once('sync:start', handler);

      unsubscribe();
      expect(emitter.listenerCount('sync:start')).toBe(0);

      emitter.emit('sync:start');
      expect(handler).not.toHaveBeenCalled();
    });

    test('allows removal of once listener via off() using original callback', () => {
      const handler = vi.fn();
      emitter.once('sync:start', handler);

      emitter.off('sync:start', handler);
      expect(emitter.listenerCount('sync:start')).toBe(0);

      emitter.emit('sync:start');
      expect(handler).not.toHaveBeenCalled();
    });
  });

  describe('Multiple listeners & cleanups', () => {
    test('invokes multiple listeners in registration order', () => {
      const order: number[] = [];
      emitter.on('change', () => {
        order.push(1);
      });
      emitter.on('change', () => {
        order.push(2);
      });
      emitter.on('change', () => {
        order.push(3);
      });

      emitter.emit('change', { collection: 'test', id: '1', action: 'set' });
      expect(order).toEqual([1, 2, 3]);
    });

    test('removeAllListeners for a specific event', () => {
      emitter.on('network:online', vi.fn());
      emitter.on('network:online', vi.fn());
      emitter.on('network:offline', vi.fn());

      expect(emitter.listenerCount('network:online')).toBe(2);
      expect(emitter.listenerCount('network:offline')).toBe(1);

      emitter.removeAllListeners('network:online');
      expect(emitter.listenerCount('network:online')).toBe(0);
      expect(emitter.listenerCount('network:offline')).toBe(1);
    });

    test('removeAllListeners without arguments removes everything', () => {
      emitter.on('network:online', vi.fn());
      emitter.on('network:offline', vi.fn());
      emitter.on('db:clear', vi.fn());

      emitter.removeAllListeners();
      expect(emitter.eventNames()).toEqual([]);
    });

    test('eventNames and rawListeners methods', () => {
      const fn1 = () => {};
      const fn2 = () => {};

      emitter.on('network:online', fn1);
      emitter.on('network:online', fn2);
      emitter.on('db:clear', fn1);

      expect(emitter.eventNames()).toEqual(['network:online', 'db:clear']);
      expect(emitter.rawListeners('network:online')).toEqual([fn1, fn2]);
      expect(emitter.rawListeners('sync:start')).toEqual([]);
    });
  });

  describe('Error isolation in handlers', () => {
    test('continues executing remaining handlers when one handler throws', () => {
      const faultyHandler = vi.fn(() => {
        throw new Error('Handler crash');
      });
      const successHandler = vi.fn();

      emitter.on('change', faultyHandler);
      emitter.on('change', successHandler);

      expect(() => {
        emitter.emit('change', { collection: 'notes', id: '1', action: 'delete' });
      }).not.toThrow();

      expect(faultyHandler).toHaveBeenCalledTimes(1);
      expect(successHandler).toHaveBeenCalledTimes(1);
    });
  });

  describe('AbortSignal integration', () => {
    test('removes listener when AbortSignal triggers abort', () => {
      const controller = new AbortController();
      const handler = vi.fn();

      emitter.on('change', handler, { signal: controller.signal });
      expect(emitter.listenerCount('change')).toBe(1);

      controller.abort();
      expect(emitter.listenerCount('change')).toBe(0);

      emitter.emit('change', { collection: 'notes', id: '1', action: 'set' });
      expect(handler).not.toHaveBeenCalled();
    });

    test('once listener is removed on abort before emission', () => {
      const controller = new AbortController();
      const handler = vi.fn();

      emitter.once('change', handler, { signal: controller.signal });
      expect(emitter.listenerCount('change')).toBe(1);

      controller.abort();
      expect(emitter.listenerCount('change')).toBe(0);

      emitter.emit('change', { collection: 'notes', id: '1', action: 'set' });
      expect(handler).not.toHaveBeenCalled();
    });

    test('does not register listener if signal is already aborted', () => {
      const controller = new AbortController();
      controller.abort();

      const handler = vi.fn();
      const unsub = emitter.on('network:online', handler, {
        signal: controller.signal,
      });

      expect(emitter.listenerCount('network:online')).toBe(0);
      unsub(); // Deve ser noop seguro

      emitter.emit('network:online');
      expect(handler).not.toHaveBeenCalled();
    });

    test('cleans up abort listener if unsubscribed manually before abort', () => {
      const controller = new AbortController();
      const removeEventListenerSpy = vi.spyOn(
        controller.signal,
        'removeEventListener',
      );

      const unsub = emitter.on('sync:start', vi.fn(), {
        signal: controller.signal,
      });
      unsub();

      expect(removeEventListenerSpy).toHaveBeenCalledWith(
        'abort',
        expect.any(Function),
      );
      removeEventListenerSpy.mockRestore();
    });
  });

  describe('Observability & Custom Injectable Logger', () => {
    test('logs event registrations, emissions and removals when logging is enabled', () => {
      const mockLogger: IEventEmitterLogger = {
        debug: vi.fn(),
        info: vi.fn(),
        warn: vi.fn(),
        error: vi.fn(),
      };

      const customEmitter = new TypedEventEmitter({
        logger: mockLogger,
        enableLogging: true,
      });

      expect(customEmitter.isLoggingEnabled()).toBe(true);

      const handler = vi.fn();
      const unsub = customEmitter.on('sync:start', handler);

      expect(mockLogger.debug).toHaveBeenCalledWith(
        'EventEmitter',
        'Listener registered for event: sync:start',
        expect.objectContaining({ event: 'sync:start', once: false }),
      );

      customEmitter.emit('sync:start');
      expect(mockLogger.debug).toHaveBeenCalledWith(
        'EventEmitter',
        'Emitted event: sync:start',
        expect.objectContaining({ event: 'sync:start', listenerCount: 1 }),
      );

      unsub();
      expect(mockLogger.debug).toHaveBeenCalledWith(
        'EventEmitter',
        'Listener removed for event: sync:start',
        expect.objectContaining({ event: 'sync:start', remainingCount: 0 }),
      );
    });

    test('enableLogging() and disableLogging() toggle logging output', () => {
      const mockLogger: IEventEmitterLogger = {
        debug: vi.fn(),
      };

      const customEmitter = new TypedEventEmitter({
        logger: mockLogger,
        enableLogging: false,
      });

      customEmitter.emit('db:clear');
      expect(mockLogger.debug).not.toHaveBeenCalled();

      customEmitter.enableLogging();
      expect(customEmitter.isLoggingEnabled()).toBe(true);
      customEmitter.emit('db:clear');
      expect(mockLogger.debug).toHaveBeenCalled();

      customEmitter.disableLogging();
      expect(customEmitter.isLoggingEnabled()).toBe(false);
    });

    test('logs error when listener throws exception', () => {
      const mockLogger: IEventEmitterLogger = {
        debug: vi.fn(),
        error: vi.fn(),
      };

      const customEmitter = new TypedEventEmitter({
        logger: mockLogger,
        enableLogging: true,
      });

      customEmitter.on('change', () => {
        throw new Error('Boom');
      });

      customEmitter.emit('change', { collection: 'users', id: '1', action: 'delete' });

      expect(mockLogger.error).toHaveBeenCalledWith(
        'EventEmitter',
        expect.stringContaining("Error in listener for event 'change'"),
        expect.objectContaining({ event: 'change' }),
      );
    });

    test('setLogger allows dynamically updating logger instance', () => {
      const firstLogger: IEventEmitterLogger = { debug: vi.fn() };
      const secondLogger: IEventEmitterLogger = { debug: vi.fn() };

      const customEmitter = new TypedEventEmitter({
        logger: firstLogger,
        enableLogging: true,
      });

      customEmitter.emit('db:clear');
      expect(firstLogger.debug).toHaveBeenCalledTimes(1);
      expect(secondLogger.debug).not.toHaveBeenCalled();

      customEmitter.setLogger(secondLogger);
      customEmitter.emit('db:clear');
      expect(firstLogger.debug).toHaveBeenCalledTimes(1);
      expect(secondLogger.debug).toHaveBeenCalledTimes(1);
    });
  });

  describe('Dynamic channel patterns (change:<collection>)', () => {
    test('supports dynamic channel events', () => {
      const handler = vi.fn();
      emitter.on('change:todos', handler);

      emitter.emit('change:todos', {
        id: 'task-1',
        action: 'set',
        data: { title: 'Test Task' },
      });

      expect(handler).toHaveBeenCalledWith({
        id: 'task-1',
        action: 'set',
        data: { title: 'Test Task' },
      });
    });
  });
});
