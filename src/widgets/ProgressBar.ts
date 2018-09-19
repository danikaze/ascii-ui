import { isEmpty } from 'vanilla-type-check/isEmpty';

import { Terminal, TextTile } from '../Terminal';
import { Widget, WidgetOptions } from '../Widget';
import { WidgetContainer } from '../WidgetContainer';

import { deepAssign } from '../util/deepAssign';

export const enum ProgressBarDirection {
  /** The bar has 1 tile height and it's drawn from left to right */
  HORIZONTAL = 1,
  /** The bar has 1 tile width and it's drawn from bottom to top */
  VERTICAL,
}

export interface ProgressBarOptions extends WidgetOptions {
  /** Direction of the progress bar */
  direction?: ProgressBarDirection;
  /** Progress to display (0-1) */
  progress?: number;
  /** Style to use for the completed part of the bar */
  completedStyle?: TextTile;
  /** Style to use for the pending part of the bar */
  pendingStyle?: TextTile;
  /** Style to use for current point of the bar. If not specified will be replaced by treated as a completed part */
  currentStyle?: TextTile;
  /** Style to use for the start point of the bar (as a border) */
  startStyle?: TextTile;
  /** Style to use for the end point of the bar (as a border) */
  endStyle?: TextTile;
}

/**
 * Display a progress bar
 */
export class ProgressBar extends Widget<ProgressBarOptions> {
  /** Default options for widget instances */
  public static defaultOptions: ProgressBarOptions;

  constructor(terminal: Terminal, options: ProgressBarOptions, parent?: WidgetContainer) {
    super(
      terminal,
      deepAssign({}, ProgressBar.defaultOptions, options),
      parent,
    );
  }

  /**
   * Render the widget in the associated terminal
   */
  public render(): void {
    if (this.options.direction === ProgressBarDirection.HORIZONTAL) {
      this.renderHorizontal();
    } else {
      this.renderVertical();
    }
  }

  /**
   * Retrieve a reference to the currently selected option
   */
  public getProgress(): number {
    return this.options.progress;
  }

  /**
   * `setOptions` will assign the options to `this.options`,
   * but any derivated calculation should be done here.
   *
   * @param changes Object with only the changed options
   */
  protected updateOptions(changes: ProgressBarOptions): void {
    if (this.options.direction === ProgressBarDirection.HORIZONTAL) {
      this.options.height = 1;
    } else {
      this.options.width = 1;
    }

    if (!isEmpty(changes)) {
      this.render();
    }
  }

  /**
   * Render the bar horizontally
   */
  private renderHorizontal(): void {
    const options = this.options;
    const terminal = this.terminal;
    const line = options.line;
    let width = options.width;
    let col = options.col;

    if (options.endStyle) {
      terminal.setTiles(options.endStyle, col + width - 1, line);
      width--;
    }

    if (options.startStyle) {
      terminal.setTiles(options.startStyle, col, line);
      width--;
      col++;
    }

    const progress = Math.ceil(width * options.progress);
    const done = Array(progress);
    const pending = Array(width - progress);

    done.fill(options.completedStyle);
    pending.fill(options.pendingStyle);

    terminal.setTiles(done, col, line);
    terminal.setTiles(pending, col + progress, line);

    if (options.progress > 0 && options.progress < 1 && options.currentStyle) {
      terminal.setTiles(options.currentStyle, col + progress - 1, line);
    }
  }

  /**
   * Render the bar vertically
   */
  private renderVertical(): void {
    const options = this.options;
    const terminal = this.terminal;
    const col = options.col;
    let height = options.height;
    let line = options.line;

    if (options.endStyle) {
      terminal.setTiles(options.endStyle, col, line + height - 1);
      height--;
    }

    if (options.startStyle) {
      terminal.setTiles(options.startStyle, col, line);
      height--;
      line++;
    }

    const progress = Math.ceil(height * options.progress);
    line = line + height;

    for (let i = 0; i < progress; i++) {
      line--;
      terminal.setTiles(options.completedStyle, col, line);
    }

    if (options.progress > 0 && options.progress < 1 && options.currentStyle) {
      terminal.setTiles(options.currentStyle, col, line);
    }

    for (let i = 0; i < height - progress; i++) {
      line--;
      terminal.setTiles(options.pendingStyle, col, line);
    }
  }
}

/*
 * Default options for new instances
 */
ProgressBar.defaultOptions = {
  focusable: false,
  direction: ProgressBarDirection.HORIZONTAL,
  progress: 0,
  completedStyle: { char: '', bg: '#00ff00' },
  pendingStyle: { char: '', bg: '#009900' },
  currentStyle: { char: '', bg: '#99ff99' },
  startStyle: undefined,
  endStyle: undefined,
};
