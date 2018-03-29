import { Terminal } from './Terminal';

export interface WidgetOptions {
  col?: number;
  line?: number;
  width?: number;
  height?: number;
}

/**
 * A widget is just a self-contained graphic part of the terminal, which manages its own state.
 */
export abstract class Widget {
  private static idCount: number = 0;

  protected id: number = ++Widget.idCount;
  protected terminal: Terminal;
  protected options: WidgetOptions;
  protected focused: boolean;
  protected allocated: boolean;

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

  /**
   * Update the options. Always use this setter so the trigger knows about the change
   * instead of changing the (protected) variable directly.
   * The trigger might do some internal calcs when this method is called.
   *
   * @param options Options to change.
   */
  setOptions(options: WidgetOptions): void {
    // tslint:disable-next-line:prefer-object-spread
    this.options = Object.assign(this.options || {}, options);

    this.allocated = this.options.col >= 0
      && this.options.line >= 0
      && this.options.width >= 0
      && this.options.height >= 0;
  }

  /**
   * Set this Widget as focused. Usually done by a upper level that controls other widgets
   * (so the previously focused widget is blurred)
   */
  focus(): void {
    this.focused = true;
  }

  /**
   * Remove the focus from this widget.
   * Usually done by a upper level that controls other widgets.
   */
  blur(): void {
    this.focused = false;
  }

  /**
   * @returns if the widget is focused or not.
   */
  isFocused(): boolean {
    return this.focused;
  }

  /**
   * Render the widget in the associated terminal (if any)
   */
  abstract render(): void;
}
