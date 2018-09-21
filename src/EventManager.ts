import { Terminal } from './Terminal';
import { TerminalEvent } from './TerminalEvent';
import { Widget } from './Widget';

export type EventListener = (event: TerminalEvent, target: Terminal | Widget) => void;

/**
 * Manage triggering, listening and bubbling events across the Terminal Widgets
 */
export class EventManager {
  /** Terminal to manage events within */
  private readonly terminal: Terminal;
  /** List of listeners as { type => targets => handlers } */
  private readonly listeners: Map<string, Map<Widget | Terminal, EventListener[]>> = new Map();

  constructor(terminal: Terminal) {
    this.terminal = terminal;
  }

  /**
   * Listen for events of a specific type
   *
   * @param type type of the event to listen to
   * @param listener function to call when an event is triggered on this target
   * @param widget widget to listen the event on (the terminal itself by default)
   */
  public addListener(type: string, listener: EventListener, widget?: Widget): void {
    const target = widget || this.terminal;

    let targets = this.listeners.get(type);
    if (!targets) {
      targets = new Map();
      this.listeners.set(type, targets);
    }

    let listeners = targets.get(target);
    if (!listeners) {
      listeners = [];
      targets.set(target, listeners);
    }
    listeners.push(listener);
  }

  /**
   * Remove a previous added listener.
   * Needs to be called with the same parameters as it was added.
   * Does nothing if not found.
   *
   * @param type type of the event to listen to
   * @param listener function to call when an event is triggered on this target
   * @param widget widget to listen the event on (the terminal itself by default)
   */
  public removeListener(type: string, listener: EventListener, widget?: Widget): void {
    const target = widget || this.terminal;

    const targets = this.listeners.get(type);
    if (!targets) {
      return;
    }

    const listeners = targets.get(target);
    if (!listeners) {
      return;
    }

    const index = listeners.indexOf(listener);
    if (index !== -1) {
      listeners.splice(index, 1);
    }
  }

  /**
   * Trigger an event.
   * The event will be passed to all the listeners of the target widget and then bubbled to its parent until
   * the root terminal is reached or the event propagation is stopped (`event.stopPropagation`) by one of its listeners
   *
   * @param event event to trigger
   * @param widget widget where trigger the event (the terminal by default)
   */
  public trigger(event: TerminalEvent, widget?: Widget): void {
    const path = widget ? [...this.terminal.getWidgetPath(widget), this.terminal] : [this.terminal];
    const targets = this.listeners.get(event.type);

    if (!targets) {
      return;
    }

    for (const target of path) {
      const listeners = targets.get(target as Widget | Terminal);
      if (listeners) {
        for (const listener of listeners) {
          listener(event, target as Widget | Terminal);

          if (event.isCancelled()) {
            return;
          }
        }
      }
    }
  }
}
