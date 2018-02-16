/* tslint:disable:typedef */
import { isArray } from 'vanilla-type-check';

import { defaultDebugOptions, defaultOptions } from './defaultOptions';
import { emptyArray } from './util/emptyArray';

export interface Options {
  /** width of a tile in px */
  tileWidth?: number;
  /** height of a tile in px */
  tileHeight?: number;
  /** number of columns of the terminal, in number of tiles */
  columns?: number;
  /** number of rows of the terminal, in number of tiles */
  lines?: number;
  /** font or font-family to use in the terminal */
  font?: string;
  /** `true` to let the terminal manage the screen changes */
  autoRender?: boolean;
  /** if `true`, the containing canvas will be resized to contain the grid */
  autoSize?: boolean;
  /** `true` to show the cursor */
  cursor?: boolean;
  /** blinking frequency of the cursor. If set to `0` the blink will be disabled */
  cursorFrequency?: number;
  /** `true` to enable default debug options, `false` to disable it, an object to specify each option */
  debug?: boolean | DebugOptions;
  /** default properties of the tiles (for initializing the grid) */
  defaultTile?: Tile;
}

export interface DebugOptions {
  /** `true` to print debug information in the console */
  verbose?: boolean;
  /** `true` to render the grid of tiles */
  renderGrid?: boolean;
  /** style to use for the grid (i.e. `#777777`) */
  gridStyle?: string;
}

export interface Tile {
  /** char to display in the tile */
  char: string;
  /** style of the displayed char */
  style: string;
  /** background color (i.e. `#000000`) */
  bg: string;
  /** foreground color (i.e. `#00ff00`) */
  fg: string;
}

interface InternalTile extends Tile {
  /** pre-calculated tile x-position in pixels */
  x: number;
  /** pre-calculated tile y-position in pixels */
  y: number;
}

export interface TilePosition {
  /** x-coordinate of a tile in the grid */
  col: number;
  /** y-coordinate of a tile in the grid */
  line: number;
}

/**
 * Basic terminal features rendered into a Canvas object
 */
export class Terminal {
  /** canvas object associated with the terminal */
  private readonly canvas: HTMLCanvasElement;
  /** 2d context of the canvas object */
  private readonly ctx: CanvasRenderingContext2D;
  /** terminal options */
  private readonly options: Options;
  /** grid of tiles */
  private readonly buffer: InternalTile[][] = []; // [y][x]
  /** list of tiles marked to re-render */
  private dirtyTiles: InternalTile[] = [];
  /** x-position of the cursor */
  private cursorX: number = 0;
  /** y-position of the cursor */
  private cursorY: number = 0;
  /** visibility status of the cursor */
  private cursorVisible: boolean = true;
  /** handler returned by `setInterval` to control the `cursorVisible` status */
  private updateCursorInterval: number;

  /**
   * Creates a Terminal associated to a canvas element.
   *
   * @param canvas `<canvas>` element associated to the Terminal
   * @param options
   */
  constructor(canvas: HTMLCanvasElement, options?: Options) {
    this.canvas = canvas;
    this.ctx = canvas.getContext('2d');
    this.options = { ...defaultOptions, ...options };

    if (this.options.autoSize) {
      this.canvas.width = this.options.columns * this.options.tileWidth;
      this.canvas.height = this.options.lines * this.options.tileHeight;
    }

    this.setCursorFrequency(this.options.cursorFrequency);
    this.clear();

    if (this.options.debug) {
      this.setDebug(this.options.debug);
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
   * Clear the terminal, reseting it to the `options.defaultTile`
   */
  clear(): void {
    const start = window.performance.now();
    const dirtyTiles = this.dirtyTiles;
    const buffer = this.buffer;

    this.dirtyTiles.splice(0, this.dirtyTiles.length);
    for (let y = 0; y < this.options.lines; y++) {
      this.buffer[y] = [];
      for (let x = 0; x < this.options.columns; x++) {
        const tile = {
          ...this.options.defaultTile,
          x: x * this.options.tileWidth,
          y: y * this.options.tileHeight,
        };
        buffer[y][x] = tile;
        dirtyTiles.push(tile);
      }
    }

    this.info(`clear: ${this.options.columns * this.options.lines} tiles: ${window.performance.now() - start} ms.`);
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

    ctx.font = this.options.font;
    ctx.textBaseline = 'bottom';
    for (const tile of this.dirtyTiles) {
      // cursor
      if (drawCursor && tile.x === cursorX && tile.y === cursorY) {
        // bg
        ctx.fillStyle = tile.fg;
        ctx.fillRect(tile.x, tile.y, w, h);
        // fg
        ctx.fillStyle = tile.bg;
        ctx.fillText(tile.char, tile.x, tile.y + h);
      } else {
        // bg
        ctx.fillStyle = tile.bg;
        ctx.fillRect(tile.x, tile.y, w, h);
        // fg
        ctx.fillStyle = tile.fg;
        ctx.fillText(tile.char, tile.x, tile.y + h);
      }
    }

    this.info(`render: ${nTiles} tiles: ${window.performance.now() - start} ms.`);

    if (this.options.debug) {
      this.renderDebug();
    }

    this.dirtyTiles = emptyArray(this.dirtyTiles);
  }

  /**
   * Forces a render of all the tiles, not only the changed ones
   */
  renderAll(): void {
    this.dirtyTiles = emptyArray(this.dirtyTiles);
    for (let y = 0; y < this.options.lines; y++) {
      for (let x = 0; x < this.options.columns; x++) {
        this.dirtyTiles.push(this.buffer[y][x]);
      }
    }
    this.render();
  }

  /**
   * Get the current position of the cursor, in tile coordinates
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

    if (col >= this.options.columns && line < this.options.lines - 1) {
      col = 0;
      line++;
    } else if (col < 0 && line > 0) {
      col = this.options.columns - 1;
      line--;
    } else {
      col = Math.max(0, Math.min(col, this.options.columns - 1));
    }

    if (line >= this.options.lines) {
      line = this.options.lines - 1;
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
    const dirtyTiles = this.dirtyTiles;

    let newPosition = this.iterateTiles(
      text.length,
      (tile, i) => {
        tile.char = text[i];
        dirtyTiles.push(tile);
      },
      col,
      line,
    );

    // tslint:disable-next-line:no-empty
    newPosition = this.iterateTiles(1, () => {}, newPosition.col, newPosition.line);
    this.setCursor(newPosition.col - 1, newPosition.line);

    if (this.options.autoRender) {
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

    this.iterateTiles(
      size,
      (tile) => {
        text += tile.char || ' ';
      },
      col,
      line,
    );

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
   * Iterate `size` number of tiles.
   * If it reaches the end of a line it continues in the next one.
   * `callback` is not called if the tile is in a non visible tile (over/under the screen)
   *
   * @param size number of tiles to iterate
   * @param callback function to execute for each tile
   * @param col x-position of the starting tile. Current position of the cursor if not specified
   * @param line y-position of the starting tile. Current position of the cursor if not specified
   */
  private iterateTiles(size: number, callback: (InternalTile, i) => void, col?: number, line?: number): TilePosition {
    const buffer = this.buffer;
    const nLines = this.options.lines;
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
      callback(buffer[line][c], i);
      c++;
    }

    return {
      col: c,
      line,
    };
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
   * Output the given text as a warning, if `debug` and `verbose` options are enabled
   * @param text text to output
   */
  // private warn(text: string): void {
  //   if (this.options.debug && (<DebugOptions> this.options.debug).verbose) {
  //     console.error(`[Terminal] ${text}`);
  //   }
  // }

  /**
   * Output the given text as an error, if `debug` and `verbose` options are enabled
   * @param text text to output
   */
  // private error(text: string): void {
  //   if (this.options.debug && (<DebugOptions> this.options.debug).verbose) {
  //     console.error(`[Terminal] ${text}`);
  //   }
  // }
}
