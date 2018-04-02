/* tslint:disable:typedef */
import { isArray } from 'vanilla-type-check';

import { defaultDebugOptions, defaultOptions } from './defaultOptions';
import { assignCharStyle } from './util/assignCharStyle';
import { emptyArray } from './util/emptyArray';
import { requestAnimationFrame } from './util/requestAnimationFrame';
import { Widget } from './Widget';

// tslint:disable-next-line:no-import-side-effect
import './styles.less';

/**
 * Function called when the matching command is found
 * @param text The whole text
 * @param index Position of the matching commmand in the text
 * @return index where the text processing should be continued
 */
export type EscapeCallback = (text: string, index: number) => number;

export interface CharStyle {
  /**
   * font or font-family to use in the terminal
   * The format is in this order:
   * [style] [variant] [weight] [family]
   */
  font?: string;
  /** x-offset to apply to each character inside the tile */
  fontOffsetX?: number;
  /** y-offset to apply to each character inside the tile */
  fontOffsetY?: number;
  /** foreground color (i.e. `#00ff00`) */
  fg?: string;
  /** background color (i.e. `#000000`) */
  bg?: string;
}

export interface TerminalOptions extends CharStyle {
  /** width of a tile in px */
  tileWidth?: number;
  /** height of a tile in px */
  tileHeight?: number;
  /** number of columns of the terminal, in number of tiles */
  columns?: number;
  /** number of rows of the terminal, in number of tiles */
  rows?: number;
  /** `true` to let the terminal manage the screen changes */
  autoRender?: boolean;
  /** if `true`, the containing canvas will be resized to contain the grid */
  autoSize?: boolean;
  /** `true` to show the cursor */
  cursor?: boolean;
  /** blinking frequency of the cursor. If set to `0` the blink will be disabled */
  cursorFrequency?: number;
  /** if > 0, milliseconds that the characters will take before disapear when changing */
  decayTime?: number;
  /** initial opacity for the decay tile, from 0 to 1 */
  decayInitialAlpha?: number;
  /** `true` to enable default debug options, `false` to disable it, an object to specify each option */
  debug?: boolean | DebugOptions;
  /** escape secuences to parse and their callback functions */
  commands?: { [key: string]: EscapeCallback };
}

export interface DebugOptions {
  /** `true` to print debug information in the console */
  verbose?: boolean;
  /** `true` to render the grid of tiles */
  renderGrid?: boolean;
  /** style to use for the grid (i.e. `#777777`) */
  gridStyle?: string;
}

export interface Tile extends CharStyle {
  /** char to display in the tile */
  char: string;
}

export interface TerminalSize {
  /** number of columns of the terminal, in number of tiles */
  columns: number;
  /** number of rows of the terminal, in number of tiles */
  rows: number;
}

export const enum TerminalEvent {
  RESIZED = 'resized',
}

export type EventListener = (...args) => void;

interface InternalTile extends Tile {
  /** pre-calculated tile x-position in pixels */
  x: number;
  /** pre-calculated tile y-position in pixels */
  y: number;
}

interface DecayTile extends Tile {
  /** current opacity */
  alpha: number;
}

export interface TilePosition {
  /** x-coordinate of a tile in the grid */
  col: number;
  /** y-coordinate of a tile in the grid */
  line: number;
}

type IterateTileCallback = (InternalTile, i) => void;

/**
 * Basic terminal features rendered into a Canvas object
 */
export class Terminal {
  /** widget id counter to generate unique ids */
  private static widgetIds: number = 0;

  /** terminal options */
  protected readonly options: TerminalOptions;
  /** canvas object associated with the terminal */
  private readonly canvas: HTMLCanvasElement;
  /** 2d context of the canvas object */
  private readonly ctx: CanvasRenderingContext2D;
  /** grid of tiles */
  private readonly buffer: InternalTile[][] = []; // [y][x]
  /** list of tiles marked to re-render */
  private dirtyTiles: InternalTile[] = [];
  /** map of tiles to render with decay */
  private readonly decayTiles: { [key: string]: DecayTile } = {}; // key being `${x},${y}`
  /** How much to change the opacity of the decayTiles when updating them */
  private decayChange: number;
  /** x-position of the cursor */
  private cursorX: number = 0;
  /** y-position of the cursor */
  private cursorY: number = 0;
  /** visibility status of the cursor */
  private cursorVisible: boolean = true;
  /** handler returned by `setInterval` to control the `cursorVisible` status */
  private updateCursorInterval: number;
  /** cached string to create the RegExp to escape characters */
  private escapeCharactersRegExpString: string;
  /** time of the last render */
  private lastRenderTime: number = 0;
  /** list of attached widgets as { id: widget } */
  private readonly attachedWidgets: { [key: number]: Widget } = {};
  /** listeners registered to the terminal events */
  private readonly eventListeners: Map<TerminalEvent, EventListener[]> = new Map();

  /**
   * Creates a Terminal associated to a canvas element.
   *
   * @param canvas `<canvas>` element associated to the Terminal
   * @param options
   */
  constructor(canvas: HTMLCanvasElement, options?: TerminalOptions) {
    this.canvas = canvas;
    this.ctx = canvas.getContext('2d');
    this.options = { ...defaultOptions };
    this.decayChange = options.decayInitialAlpha / options.decayTime;

    this.setOptions(options);

    if (this.options.autoSize) {
      this.canvas.width = this.options.columns * this.options.tileWidth;
      this.canvas.height = this.options.rows * this.options.tileHeight;
    }

    this.clear();

    if (this.options.debug) {
      this.setDebug(this.options.debug);
    }
  }

  /**
   * Update the values of the Terminal options
   *
   * @param options new options to set
   */
  setOptions(options: TerminalOptions): void {
    const oldColumns = this.options.columns;
    const oldRows = this.options.rows;

    Object.assign(this.options, options);

    // decay
    this.decayChange = this.options.decayInitialAlpha / this.options.decayTime;

    // options.commands
    const commandList = this.options.commands && Object.keys(this.options.commands);
    this.escapeCharactersRegExpString = commandList ? `(${commandList.join(')|(')})` : undefined;

    // cursor
    if (this.options.cursor) {
      this.setCursorFrequency(this.options.cursorFrequency);
    } else if (this.buffer.length > 0) {
      this.dirtyTiles.push(this.buffer[this.cursorY][this.cursorX]);
    }

    // resize
    if ((oldColumns && this.options.columns !== oldColumns) || (oldRows && this.options.rows !== oldRows)) {
      this.trigger(TerminalEvent.RESIZED, this.options.columns, this.options.rows);
    }
  }

  /**
   * Set the debug options
   *
   * @param options `true` to enable default debug options, `false` to disable it, an object to specify each option
   */
  setDebug(options: boolean | DebugOptions): void {
    if (options === true) {
      this.options.debug = { ...defaultDebugOptions };
    } else if (options === false) {
      this.options.debug = false;
    } else {
      if (this.options.debug === false) {
        this.options.debug = { ...defaultDebugOptions, ...options };
      } else {
        Object.assign(this.options.debug, options);
      }
    }

    this.renderAll();
  }

  /**
   * Clear the whole terminal
   */
  clear(): void;

  /**
   * Clear only the specified part of the terminal
   *
   * @param col
   * @param line
   * @param width
   * @param height
   */
  clear(col: number, line: number, width: number, height: number);

  clear(col?: number, line?: number, width?: number, height?: number): void {
    const start = window.performance.now();
    const dirtyTiles = this.dirtyTiles;
    const buffer = this.buffer;
    const options = this.options;

    if (col === undefined) {
      col = 0;
      line = 0;
      width = options.columns;
      height = options.rows;
    }

    dirtyTiles.splice(0, dirtyTiles.length);
    for (let y = line; y < height; y++) {
      buffer[y] = [];
      for (let x = col; x < width; x++) {
        const tile = {
          char: ' ',
          bg: options.bg,
          fg: options.fg,
          font: options.font,
          fontOffsetX: options.fontOffsetX,
          fontOffsetY: options.fontOffsetY,
          x: x * options.tileWidth,
          y: y * options.tileHeight,
        };
        buffer[y][x] = tile;
        dirtyTiles.push(tile);
      }
    }

    this.info(`clear: ${options.columns * options.rows} tiles: ${window.performance.now() - start} ms.`);
    this.render();
  }

  /**
   * Render the terminal status into the canvas context.
   * It works with a list of _dirty_ tiles so it only renders what's changed.
   *
   * It's called automatically if `options.autoRender` is `true` (recommended),
   * but can be set to `false` and call this method manually from outside.
   */
  render(): void {
    if (this.dirtyTiles.length === 0) {
      return;
    }

    const start = window.performance.now();
    const ctx = this.ctx;
    const w = this.options.tileWidth;
    const h = this.options.tileHeight;
    const nTiles = this.dirtyTiles.length;
    const cursorX = this.cursorX * w;
    const cursorY = this.cursorY * h;
    const drawCursor = this.options.cursor && this.cursorVisible;
    const originalAlpha = ctx.globalAlpha;
    const tilesToRedraw: InternalTile[] = [];
    const decayChange = this.decayChange * (start - this.lastRenderTime);

    ctx.textBaseline = 'bottom';
    for (const tile of this.dirtyTiles) {
      const x = tile.x;
      const y = tile.y;
      const offsetX = tile.fontOffsetX;
      const offsetY = tile.fontOffsetY;
      const decayKey = `${x},${y}`;
      const decayTile = this.decayTiles[decayKey];

      ctx.font = tile.font;
      // cursor
      if (drawCursor && x === cursorX && y === cursorY) {
        // bg
        ctx.fillStyle = tile.fg;
        ctx.fillRect(x, y, w, h);

        // fg
        ctx.fillStyle = tile.bg;
        ctx.fillText(tile.char, x + offsetX, y + h + offsetY);
      } else {
        // bg
        ctx.fillStyle = tile.bg;
        ctx.fillRect(x, y, w, h);

        // decay
        if (decayTile) {
          if (decayTile.alpha > decayChange) {
            decayTile.alpha -= decayChange;
            ctx.fillStyle = decayTile.fg;
            ctx.font = decayTile.font;
            ctx.globalAlpha = decayTile.alpha;
            ctx.fillText(decayTile.char, x + decayTile.fontOffsetX, y + h + decayTile.fontOffsetY);
            ctx.globalAlpha = originalAlpha;
            ctx.font = tile.font;
          } else {
            this.decayTiles[decayKey] = undefined;
          }
          tilesToRedraw.push(tile);
        }

        // fg
        ctx.fillStyle = tile.fg;
        ctx.fillText(tile.char, x + offsetX, y + h + offsetY);
      }
    }

    this.lastRenderTime = window.performance.now();
    this.info(`render: ${nTiles} tiles: ${this.lastRenderTime - start} ms.`);

    if (this.options.debug) {
      this.renderDebug();
    }

    this.dirtyTiles = tilesToRedraw;
    if (tilesToRedraw.length > 0 && this.options.autoRender) {
      requestAnimationFrame(this.render.bind(this));
    }
  }

  /**
   * Forces a render of all the tiles, not only the changed ones
   */
  renderAll(): void {
    this.dirtyTiles = emptyArray(this.dirtyTiles);
    for (let y = 0; y < this.options.rows; y++) {
      for (let x = 0; x < this.options.columns; x++) {
        this.dirtyTiles.push(this.buffer[y][x]);
      }
    }
    this.render();
  }

  /**
   * @returns Size of the terminal, measured in tiles
   */
  getSize(): TerminalSize {
    return {
      columns: this.options.columns,
      rows: this.options.rows,
    };
  }

  /**
   * @returns current position of the cursor, in tile coordinates
   */
  getCursor(): TilePosition {
    return {
      col: this.cursorX,
      line: this.cursorY,
    };
  }

  /**
   * Set the new position of the cursor
   *
   * @param col x-coordinate of the tile in the grid
   * @param line y-coordinate of the tile in the grid
   */
  setCursor(col: number, line: number): void {
    const oldTile = this.buffer[this.cursorY][this.cursorX];

    if (col >= this.options.columns && line < this.options.rows - 1) {
      col = 0;
      line++;
    } else if (col < 0 && line > 0) {
      col = this.options.columns - 1;
      line--;
    } else {
      col = Math.max(0, Math.min(col, this.options.columns - 1));
    }

    if (line >= this.options.rows) {
      line = this.options.rows - 1;
    } else if (line < 0) {
      line = 0;
    }

    this.cursorX = col;
    this.cursorY = line;

    const newTile = this.buffer[line][col];
    if (oldTile !== newTile) {
      this.dirtyTiles.push(oldTile, newTile);
      this.cursorVisible = true;
      if (this.options.autoRender) {
        this.render();
      }
    }
  }

  /**
   * Set the new position of the cursor, relative to the current one
   *
   * @param col x-coordinate of the tile in the grid
   * @param line y-coordinate of the tile in the grid
   */
  moveCursor(dx: number, dy: number): void {
    this.setCursor(this.cursorX + dx, this.cursorY + dy);
  }

  /**
   * Given a position in pixels relative to the top-left corner of the terminal,
   * get the corresponding tile
   *
   * @param x pixels from the left corner in the grid
   * @param y pixels from the top corner in the grid
   */
  getTilePosition(x: number, y: number): TilePosition {
    return {
      col: Math.floor(x / this.options.tileWidth),
      line: Math.floor(y / this.options.tileHeight),
    };
  }

  /**
   * Set the style to apply in the `setText` calls.
   * Passed `style` object can have other properties,
   * but only the ones related to the style will be applied.
   *
   * @param style new style to set for future text
   */
  setTextStyle(style: CharStyle): void {
    assignCharStyle(this.options, style);
  }

  /**
   * Get the current style being applied to the `setText` calls
   */
  getTextStyle(): CharStyle {
    const ctx = this.ctx;

    return {
      font: ctx.font,
      fontOffsetX: this.options.fontOffsetX,
      fontOffsetY: this.options.fontOffsetY,
      fg: this.options.fg,
      bg: this.options.bg,
    };
  }

  /**
   * Input a simple text in the terminal. By default the text will be set in the current position
   * of the cursor.
   * If the text reaches the right side of the terminal, will break into a new line as is
   * (there's no word begin-end control when breaking a word).
   * There's no character escape done (such as \n)
   *
   * @param text text to set in the given position
   * @param col x-position of the starting tile. Current position of the cursor if not specified
   * @param line y-position of the starting tile. Current position of the cursor if not specified
   */
  setText(text: string, col?: number, line?: number): void {
    this.info(`setText: ${text}`);

    const dirtyTiles = this.dirtyTiles;
    const decayTiles = this.decayTiles;
    const decayEnabled = !!this.decayChange;
    const options = this.options;
    let textOffset = 0;
    let regExp;
    let match;
    // autorender is disabled in case of nested calls (only the most external one will be autorendered)
    const autoRender = this.options.autoRender;
    this.options.autoRender = false;

    if (this.escapeCharactersRegExpString) {
      // regExp is created in each setText in case of nested calls
      regExp = new RegExp(this.escapeCharactersRegExpString, 'g');
      match = regExp.exec(text);
    }

    // tslint:disable-next-line:completed-docs
    function setTile(tile: InternalTile, i: number): void {
      if (decayEnabled && tile.char && tile.char !== ' ') {
        decayTiles[`${tile.x},${tile.y}`] = {
          char: tile.char,
          font: tile.font,
          fontOffsetX: tile.fontOffsetX,
          fontOffsetY: tile.fontOffsetY,
          fg: tile.fg,
          alpha: options.decayInitialAlpha,
        };
      }

      tile.char = text[i + textOffset];
      tile.font = options.font;
      tile.fontOffsetX = options.fontOffsetX;
      tile.fontOffsetY = options.fontOffsetY;
      tile.fg = options.fg;
      tile.bg = options.bg;
      dirtyTiles.push(tile);
    }

    // no text-parse
    if (!match) {
      this.iterateTiles(text.length, setTile, col, line);

    // with text-parse
    } else {
      let i = 0;

      // `cursorXY` is set to the parameters for the first `iterateTiles` call
      // in the next calls is auto updated by the function itself
      if (typeof col !== 'undefined') {
        this.cursorX = col;
      }
      if (typeof line !== 'undefined') {
        this.cursorY = line;
      }

      while (i < text.length && match) {
        textOffset = i;
        this.iterateTiles(match.index - i, setTile);
        i = this.options.commands[match[0]](text, match.index);
        match = regExp.exec(text);
      }

      if (i < text.length) {
        textOffset = i;
        this.iterateTiles(text.length - i, setTile);
      }
    }

    // update the cursor to the next tile
    this.setCursor(this.cursorX, this.cursorY);

    this.options.autoRender = autoRender;
    if (autoRender) {
      this.render();
    }
  }

  /**
   * Get the text of the terminal. By default gets the text from the current position of the cursor.
   * If the `size` is reaches the end of the line, it will continue in the next one.
   *
   * @param size Number of tiles to get
   * @param col x-position of the starting tile. Current position of the cursor if not specified
   * @param line y-position of the starting tile. Current position of the cursor if not specified
   */
  getText(size: number = 1, col?: number, line?: number): string {
    let text = '';
    const cursorX = this.cursorX;
    const cursorY = this.cursorY;

    this.iterateTiles(
      size,
      (tile) => {
        text += tile.char || ' ';
      },
      col,
      line,
    );

    this.cursorX = cursorX;
    this.cursorY = cursorY;

    return text;
  }

  /**
   * Works like `setText1 but specifying all the properties of a tile, not only the text.
   *
   * @param tiles Tile or list of tiles to set
   * @param col x-position of the starting tile. Current position of the cursor if not specified
   * @param line y-position of the starting tile. Current position of the cursor if not specified
   */
  setTiles(tiles: Tile | Tile[], col?: number, line?: number): void {
    const dirtyTiles = this.dirtyTiles;

    if (!isArray(tiles)) {
      tiles = [tiles as Tile];
    }

    this.iterateTiles(
      (tiles as Tile[]).length,
      (tile, i) => {
        Object.assign(tile, tiles[i]);
        dirtyTiles.push(tile);
      },
      col,
      line,
    );

    if (this.options.autoRender) {
      this.render();
    }
  }

  /**
   * Attach a specified widget to this instance of the terminal
   *
   * @param widget instance of the widget to attach
   * @return handler of the attached widget. Required to deattach it.
   */
  attachWidget(widget: Widget): number;

  /**
   * Create and attach a widget to this instance of the terminal
   *
   * @param WidgetClass Class of the widget
   * @param args Options for the widget constructor
   * @return handler of the attached widget. Required to deattach it.
   */
  attachWidget(WidgetClass: typeof Widget, ...args): number;

  attachWidget(WidgetClass, ...args): number {
    const widget: Widget = typeof WidgetClass === 'function'
      ? Reflect.construct(WidgetClass, [this, ...args])
      : WidgetClass;

    this.attachedWidgets[++Terminal.widgetIds] = widget;
    widget.render();

    return Terminal.widgetIds;
  }

  /**
   * Dettach a widget from this terminal
   *
   * @param handler Value returned by `attachWidget`
   */
  deattachWidget(handler: number): void {
    this.attachedWidgets[handler] = undefined;
  }

  /**
   * Register a listener to a specific event
   *
   * @param event event to listen
   * @param listener callback to register
   */
  listen(event: TerminalEvent, listener: EventListener): void {
    const list = this.eventListeners.get(event);
    if (list) {
      list.push(listener);
    } else {
      this.eventListeners.set(event, [listener]);
    }
  }

  /**
   * Iterate `size` number of tiles.
   * If it reaches the end of a line it continues in the next one.
   * `callback` is not called if the tile is in a non visible tile (over/under the screen)
   *
   * @param size number of tiles to iterate
   * @param callback function to execute for each tile
   * @param col x-position of the starting tile. Current position of the cursor if not specified
   * @param line y-position of the starting tile. Current position of the cursor if not specified
   */
  private iterateTiles(size: number, callback: IterateTileCallback, col?: number, line?: number): void {
    const buffer = this.buffer;
    const nLines = this.options.rows;
    const nColumns = this.options.columns;

    if (typeof col === 'undefined') {
      col = this.cursorX;
    }
    if (typeof line === 'undefined') {
      line = this.cursorY;
    }

    let c = col;
    for (let i = 0; i < size; i++) {
      if (c >= nColumns) {
        c = 0;
        line++;
      }
      if (line >= nLines) {
        break;
      }
      if (line < 0) {
        c++;
        continue;
      }
      // cursor is updated inside this function in case that `setText` is called nested via escaped commands
      this.cursorX = c;
      this.cursorY = line;
      callback(buffer[line][c], i);
      c++;
    }

    if (c >= nColumns) {
      c = 0;
      if (line < nLines - 1) {
        this.cursorY++;
      }
    }
    this.cursorX = c;
  }

  /**
   * Render debug information
   */
  private renderDebug() {
    if (!(this.options.debug as DebugOptions).renderGrid) {
      return;
    }

    const start = window.performance.now();
    const ALIASING_FIX_PRE = 0.5;
    const ALIASING_FIX_POST = - 1.5;
    const ctx = this.ctx;
    const options = this.options.debug as DebugOptions;
    const w = this.options.tileWidth + ALIASING_FIX_POST;
    const h = this.options.tileHeight + ALIASING_FIX_POST;
    const nTiles = this.dirtyTiles.length;

    ctx.lineWidth = 1;
    ctx.strokeStyle = options.gridStyle;

    for (const tile of this.dirtyTiles) {
      ctx.strokeRect(tile.x + ALIASING_FIX_PRE, tile.y + ALIASING_FIX_PRE, w, h);
    }

    this.info(`debugRender: ${nTiles} tiles: ${window.performance.now() - start} ms.`);
  }

  /**
   * Sets the interval managing the cursor blinking feature
   *
   * @param frequency milliseconds to wait before changing the cursor visibility status
   */
  private setCursorFrequency(frequency: number): void {
    clearInterval(this.updateCursorInterval);
    if (frequency > 0) {
      this.updateCursorInterval = window.setInterval(
        () => {
          this.cursorVisible = !this.cursorVisible;
          this.dirtyTiles.push(this.buffer[this.cursorY][this.cursorX]);
          if (this.options.autoRender) {
            this.render();
          }
        },
        frequency);
    }
  }

  /**
   * Output the given text as info, if `debug` and `verbose` options are enabled
   * @param text text to output
   */
  private info(text: string): void {
    if (this.options.debug && (this.options.debug as DebugOptions).verbose) {
      // tslint:disable-next-line:no-console
      console.log(`[Terminal] ${text}`);
    }
  }

  /**
   * Trigger an event
   *
   * @param event event to trigger
   * @param args arguments to pass to the listeners
   */
  private trigger(event: TerminalEvent, ...args): void {
    const listeners = this.eventListeners.get(event);
    if (listeners) {
      listeners.forEach((listener) => {
        listener.apply(undefined, args);
      });
    }
  }
}
