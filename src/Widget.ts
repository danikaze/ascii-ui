import { Terminal, TerminalSize, TilePosition } from './Terminal';

export interface WidgetOptions {
  /** x-position of the widget in terminal tiles */
  col?: number;
  /** y-position of the widget in terminal tiles */
  line?: number;
  /** widget width in terminal tiles */
  width?: number;
  /** widget height in terminal tiles */
  height?: number;
  /** if `true`, the widget can be selectable */
  selectable?: boolean;
  /** value use for ordering the selection order with the keys */
  tabIndex?: number;
}

/**
 * A widget is just a self-contained graphic part of the terminal, which manages its own state.
 */
export abstract class Widget {
  /** Reference to the parent terminal where it should be rendered */
  protected terminal: Terminal;
  /** Widget options */
  protected options: WidgetOptions;
  /** If the widget is focused or not */
  protected focused: boolean;
  /** If the widget has been allocated or not */
  protected allocated: boolean;

  /**
   * A Widget is created in the context of a specific terminal, in a position and with a provided height
   *
   * @param terminal
   * @param options
   */
  constructor(terminal: Terminal, options?: WidgetOptions) {
    this.terminal = terminal;
    this.setOptions(options);
  }

  /**
   * Update the options. Always use this setter so the widget knows about the change
   * instead of changing the (protected) variable directly.
   * The widget might do some internal calcs when this method is called.
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
   * Get the widget size, measured in tiles
   *
   * @returns Size of the widget, measured in tiles
   */
  getSize(): TerminalSize {
    return {
      columns: this.options.width,
      rows: this.options.height,
    };
  }

  /**
   * Get the position of the widget, in tile coordinates
   *
   * @returns current position of the widget, in tile coordinates
   */
  getPosition(): TilePosition {
    return {
      col: this.options.col,
      line: this.options.line,
    };
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
   * Check if the widget is currently focused or not
   *
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
