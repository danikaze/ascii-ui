import { Terminal } from './Terminal';

export interface WidgetOptions {
  col: number;
  line: number;
  width: number;
  height: number;
}

/**
 * A widget is just a self-contained graphic part of the terminal, which manages its own state.
 */
export abstract class Widget {
  private static idCount: number = 0;

  protected id: number = ++Widget.idCount;
  protected terminal: Terminal;
  protected options: WidgetOptions;

  /**
   * A Widget is created in the context of a specific terminal, in a position and with a provided height
   *
   * @param terminal
   * @param options
   */
  constructor(terminal: Terminal, options: WidgetOptions) {
    this.terminal = terminal;
    this.setOptions(options);
  }

  setOptions(options: WidgetOptions): void {
    // tslint:disable-next-line:prefer-object-spread
    this.options = Object.assign(this.options || {}, options);
  }

  abstract render(): void;
}

export default Widget;
