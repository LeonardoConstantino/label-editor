import { describe, it, expect, vi, beforeEach } from 'vitest';
import KeyboardShortcutManager from '../KeyboardShortcutManager';

describe('KeyboardShortcutManager - Focus Protection (Task 51)', () => {
  let manager: KeyboardShortcutManager;
  let handler: any;

  beforeEach(() => {
    manager = new KeyboardShortcutManager({ debug: false });
    manager.init();
    handler = vi.fn();
    
    // Mock do activeElement para simular foco
    document.body.innerHTML = '<input id="test-input" /><div id="other"></div>';
  });

  const simulateKeyDown = (key: string, modifiers = {}) => {
    const event = new KeyboardEvent('keydown', {
      key,
      bubbles: true,
      cancelable: true,
      ...modifiers
    });
    // Vi não dispara eventos nativos no jsdom facilmente, então chamamos o handler diretamente
    // mas o manager escuta o document. 
    // No jsdom, document.activeElement funciona.

    // Precisamos garantir que o manager veja o target correto como activeElement
    // Object.defineProperty(document, 'activeElement', { value: target, configurable: true });
    
    // Precisamos simular o comportamento de handleKeyDown do manager
    manager.handleKeyDown(event);
  };

  it('should block single-key shortcut when input is focused', () => {
    manager.register('t', handler, { context: 'global' });
    
    const input = document.getElementById('test-input')!;
    input.focus();
    
    simulateKeyDown('t');
    
    expect(handler).not.toHaveBeenCalled();
  });

  it('should allow modifier combination even when input is focused', () => {
    manager.register('ctrl+s', handler, { context: 'global' });
    
    const input = document.getElementById('test-input')!;
    input.focus();
    
    simulateKeyDown('s', { ctrlKey: true });
    
    expect(handler).toHaveBeenCalled();
  });

  it('should allow single-key shortcut when NO input is focused', () => {
    manager.register('t', handler, { context: 'global' });
    
    const other = document.getElementById('other')!;
    other.focus();
    
    simulateKeyDown('t');
    
    expect(handler).toHaveBeenCalled();
  });

  it('should block long press when input is focused', () => {
    vi.useFakeTimers();
    manager.registerLongPress('t', handler, { duration: 100 });
    
    const input = document.getElementById('test-input')!;
    input.focus();
    
    // Simula o fluxo de handleKeyDown que inicia o long press
    const event = new KeyboardEvent('keydown', { key: 't' });
    manager.handleKeyDown(event);
    
    vi.advanceTimersByTime(150);
    
    expect(handler).not.toHaveBeenCalled();
    vi.useRealTimers();
  });
});
