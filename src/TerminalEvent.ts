export interface EventOptions {
  type: string;
  cancellable?: boolean;
}

/**
 * Type of Events that can be triggered on Terminal's widgets, and bubble through it using an `EventManager`
 */
export class TerminalEvent {
  /** Event type. Used to listen for this kind of events when triggered */
  public readonly type: string;
  /** Data that can be passed from the trigger moment to the listeners */
  public readonly data: any; // tslint:disable-line:no-any

  /** Controls if the event propagation can be stopped */
  private readonly cancellable: boolean;
  /** Controls if the event propagation has been stopped */
  private cancelled = false;

  // tslint:disable-next-line:no-any
  constructor(options: EventOptions | string, data?: any) {
    if (typeof options === 'string') {
      this.type = options;
      this.cancellable = true;
    } else {
      this.type = options.type;
      this.cancellable = options.cancellable === undefined ? true : options.cancellable;
    }
    this.data = data;
  }

  /**
   * Stops the propagation of the event.
   * Called from a listener so the event is not passed to the next one.
   */
  public stopPropagation(): void {
    if (this.cancellable) {
      this.cancelled = true;
    }
  }

  /**
   * Check if the event is still propagating
   *
   * @returns `true` if still propagating, `false` if `stopPropagation()` was called
   */
  public isCancelled(): boolean {
    return this.cancelled;
  }
}
