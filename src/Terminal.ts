import { isArray } from 'vanilla-type-check';
import { defaultOptions, defaultDebugOptions } from './defaultOptions';
import './styles.less';

export interface Options {
  tileWidth?: number;
  tileHeight?: number;
  columns?: number;
  lines?: number;
  font?: string;
  autoRender?: boolean;
  autoSize?: boolean;
  cursor?: boolean;
  debug?: boolean|DebugOptions,
  defaultTile?: Tile;
}

export interface DebugOptions {
  verbose?: boolean;
  renderGrid?: boolean;
  gridStyle?: string;
}

export interface Tile {
  char: string;
  style: string;
  bg: string;
  fg: string;
}

interface InternalTile extends Tile {
  x: number;
  y: number;
}

export interface TilePosition {
  col: number;
  line: number;
}

/**
 * Offers terminal features into a Canvas object
 */
export class Terminal {
  private canvas: HTMLCanvasElement;
  private ctx: CanvasRenderingContext2D;
  private options: Options;
  private buffer: InternalTile[][]; // [y][x]
  private activeBuffer: number;
  private cursorX: number = 0;
  private cursorY: number = 0;
  private dirtyTiles: InternalTile[];
  private lastRenderLength: number;

  constructor(canvas: HTMLCanvasElement, options?: Options) {
    this.canvas = canvas;
    this.ctx = canvas.getContext('2d');
    this.options = Object.assign({}, defaultOptions, options);
    Object.assign({}, this.options.defaultTile, defaultOptions.defaultTile);
    Object.assign({}, this.options.debug, defaultOptions.debug);

    if (this.options.autoSize) {
      this.canvas.width = this.options.columns * this.options.tileWidth;
      this.canvas.height = this.options.lines * this.options.tileHeight;
    }

    this.clear();

    if (this.options.debug) {
      this.setDebug(this.options.debug);
    }
  }

  setDebug(options: boolean|DebugOptions):void {
    if (options === true) {
      this.options.debug = Object.assign({}, defaultDebugOptions);
    } else if (options === false) {
      this.options.debug = false;
    } else {
      if (this.options.debug === false) {
        this.options.debug = Object.assign({}, defaultDebugOptions, options);
      } else {
        Object.assign(this.options.debug, options);
      }
    }

    this.renderAll();
  }

  clear(): void {
    const start = window.performance.now();
    const buffer = [];
    const dirtyTiles = [];
    this.buffer = buffer;
    this.dirtyTiles = dirtyTiles;

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

    ctx.font = this.options.font;
    ctx.textBaseline = 'bottom';
    this.dirtyTiles.forEach((tile) => {
      // cursor
      if (tile.x === cursorX && tile.y === cursorY) {
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
    });

    this.lastRenderLength = window.performance.now() - start;
    this.info(`render: ${nTiles} tiles: ${this.lastRenderLength} ms.`);

    if (this.options.debug) {
      this.renderDebug();
    }

    this.dirtyTiles.splice(0, this.dirtyTiles.length);
  }

  renderAll(): void {
    this.dirtyTiles.splice(0, this.dirtyTiles.length);
    for (let y = 0; y < this.options.lines; y++) {
      for (let x = 0; x < this.options.columns; x++) {
        this.dirtyTiles.push(this.buffer[y][x]);
      }
    }
    this.render();
  }

  private renderDebug() {
    if (!(<DebugOptions> this.options.debug).renderGrid) {
      return;
    }

    const start = window.performance.now();
    const ctx = this.ctx;
    const options = <DebugOptions>this.options.debug;
    const w = this.options.tileWidth;
    const h = this.options.tileHeight;
    const nTiles = this.dirtyTiles.length;

    ctx.lineWidth = 1;
    ctx.strokeStyle = options.gridStyle;

    this.dirtyTiles.forEach((tile) => {
      ctx.strokeRect(tile.x + 0.5, tile.y + 0.5, w - 1.5, h - 1.5);
    });

    this.info(`debugRender: ${nTiles} tiles: ${this.lastRenderLength} ms.`);
  }

  getCursor(): TilePosition {
    return {
      col: this.cursorX,
      line: this.cursorY,
    };
  }

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
      if (this.options.autoRender) {
        this.render();
      }
    }
  }

  moveCursor(dx: number, dy: number): void {
    this.setCursor(this.cursorX + dx, this.cursorY + dy);
  }

  getTilePosition(x: number, y: number): TilePosition {
    return {
      col: (x / this.options.tileWidth) | 0,
      line: (y / this.options.tileHeight) | 0,
    };
  }

  setText(text: string, col?: number, line?: number): void {
    const buffer = this.buffer;
    const dirtyTiles = this.dirtyTiles;
    const nLines = this.options.lines;
    const nColumns = this.options.columns;

    if (typeof col === 'undefined') {
      col = this.cursorX;
    }
    if (typeof line === 'undefined') {
      line = this.cursorY;
    }

    let c = col;
    for (let i = 0; i < text.length; i++) {
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
      const tile = buffer[line][c];
      tile.char = text[i];
      dirtyTiles.push(tile);
      c++;
    }

    this.setCursor(c, line);

    if (this.options.autoRender) {
      this.render();
    }
  }

  // extract this method
  setTextBlock(text: string[], col?: number, line?: number): void {
    const buffer = this.buffer;
    const dirtyTiles = this.dirtyTiles;
    const nLines = this.options.lines;
    const nColumns = this.options.columns;

    if (typeof col === 'undefined') {
      col = this.cursorX;
    }
    if (typeof line === 'undefined') {
      line = this.cursorY;
    }

    let c = col;
    function setLine(text: string, col, line): void {
      if (line >= 0 && line < nLines) {
        for (let i = 0; i < text.length; i++) {
          c = col + i;
          if (c < 0 || c >= nColumns) {
            break;
          }
          const tile = buffer[line][c];
          tile.char = text[i];
          dirtyTiles.push(tile);
        }
      }
    }

    text.forEach((row) => {
      setLine(row, col, line++);
    });
    this.setCursor(c, line - 1);

    if (this.options.autoRender) {
      this.render();
    }
  }

  getText(size: number = 1, col?: number, line?: number): string {
    const buffer = this.buffer;
    if (typeof col === 'undefined') {
      col = this.cursorX;
    }
    if (typeof line === 'undefined') {
      line = this.cursorY;
    }

    return buffer[line]
      .slice(col, col + size)
      .map((tile) => tile.char)
      .join('');
  }

  // extract this method
  getTextBlock(width: number, height: number, col?: number, line?: number): string[] {
    const buffer = this.buffer;
    if (typeof col === 'undefined') {
      col = this.cursorX;
    }
    if (typeof line === 'undefined') {
      line = this.cursorY;
    }

    function getLine(size: number, col: number, line: number): string {
      return buffer[line]
        .slice(col, col + size)
        .map((tile) => tile.char)
        .join('');
    }

    let text = [];
    for (let i = 0; i < height; i++) {
      text.push(getLine(width, col, line + i));
    }

    return text;
  }

  setTiles(tiles: Tile|Tile[]|Tile[][], col?: number, line?: number): void {
    const buffer = this.buffer;
    const dirtyTiles = this.dirtyTiles;
    if (typeof col === 'undefined') {
      col = this.cursorX;
    }
    if (typeof line === 'undefined') {
      line = this.cursorY;
    }

    function setTile(tile: Tile, col: number, line: number) {
      const internalTile = buffer[line][col];
      Object.assign(internalTile, tile);
      dirtyTiles.push(internalTile);
    }

    function setTileRow(tiles: Tile[], col: number, line: number) {
      tiles.forEach((tile) => {
        setTile(tile, col++, line);
      });
    }

    if (isArray(tiles)) {
      if (isArray(tiles[0])) {
        (<Tile[][]>tiles).forEach((row) => {
          setTileRow(row, col, line++);
        });
      } else {
        setTileRow(<Tile[]> tiles, col, line);
      }
    } else {
      setTile(<Tile>tiles, col, line);
    }

    if (this.options.autoRender) {
      this.render();
    }
  }

  private info(text: string): void {
    if (this.options.debug && (<DebugOptions>this.options.debug).verbose) {
      console.log(`[Terminal] ${text}`);
    }
  }

  private warn(text: string): void {
    if (this.options.debug && (<DebugOptions>this.options.debug).verbose) {
      console.error(`[Terminal] ${text}`);
    }
  }

  private error(text: string): void {
    if (this.options.debug && (<DebugOptions>this.options.debug).verbose) {
      console.error(`[Terminal] ${text}`);
    }
  }
}
