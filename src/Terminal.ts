/* tslint:disable:typedef max-file-line-count */
import { isArray } from 'vanilla-type-check/isArray';

import { EventManager } from './EventManager';
import { FocusManager } from './FocusManager';
import { TerminalEvent } from './TerminalEvent';
import { assignCharStyle } from './util/assignCharStyle';
import { clamp } from './util/clamp';
import { deepAssign } from './util/deepAssign';
import { deepAssignAndDiff } from './util/deepAssignAndDiff';
import { emptyArray } from './util/emptyArray';
import { requestAnimationFrame } from './util/requestAnimationFrame';
import { Widget, WidgetConstructor } from './Widget';
import { BidirectionalIterator, isWidgetContainer, WidgetContainer } from './WidgetContainer';

export type AcceptedImage = HTMLImageElement | HTMLCanvasElement;

/**
 * Function called when the matching command is found
 * @param text The whole text
 * @param index Position of the matching commmand in the text
 * @return index where the text processing should be continued
 */
export type EscapeCallback = (params: EscapeCommandParams) => number;

export interface ImageOffset {
  /** Number of pixels inside the terminal tile to offset the image horizontally */
  x: number;
  /** Number of pixels inside the terminal tile to offset the image vertically */
  y: number;
}

export interface ImageSize {
  /** Image width */
  width: number;
  /** Image height */
  height: number;
}

export interface ImageCropParams {
  /** x-position (pixels) of the section to crop in the source image */
  srcX: number;
  /** y-position (pixels) of the section to crop in the source image */
  srcY: number;
  /** width (pixels) of the section to crop in the source image */
  srcW: number;
  /** height (pixels) of the section to crop in the source image */
  srcH: number;
}

export interface EscapeCommandParams {
  /** Full text set */
  text: string;
  /** Index of the matched expression in `text` */
  index: number;
  /** Matched expression */
  match: string;
  /** Column of the terminal where the matching expression starts */
  col: number;
  /** Line of the terminal where the matching expression starts */
  line: number;
  /** Associated terminal */
  terminal: Terminal;
}

export interface TileSize {
  /** number of columns of the terminal, in number of tiles */
  columns: number;
  /** number of rows of the terminal, in number of tiles */
  rows: number;
}

export interface TilePosition {
  /** x-coordinate of a tile in the grid */
  col: number;
  /** y-coordinate of a tile in the grid */
  line: number;
}

export interface CharStyle {
  /**
   * font or font-family to use in the terminal
   * The format is in this order:
   * [style] [variant] [weight] [family]
   */
  font?: string;
  /** x-offset to apply to each character inside the tile */
  offsetX?: number;
  /** y-offset to apply to each character inside the tile */
  offsetY?: number;
  /** foreground color (i.e. `#00ff00`) */
  fg?: string;
  /** background color (i.e. `#000000`) */
  bg?: string;
}

export interface ViewPortOptions {
  /** Top coordinate (in tiles) of the Terminal viewport (-1 to stick always to 0) */
  top?: number;
  /** Right coordinate (in tiles) of the Terminal viewport (-1 to stick always to `width`) */
  right?: number;
  /** Bottom coordinate (in tiles) of the Terminal viewport (-1 to stick always to `height`) */
  bottom?: number;
  /** Left coordinate (in tiles) of the Terminal viewport (-1 to stick always to `0`) */
  left?: number;
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
  /** minimum number of columns (tiles) allowed */
  minColumns?: number;
  /** minimum number of rows (tiles) allowed */
  minRows?: number;
  /** maximum number of columns (tiles) allowed */
  maxColumns?: number;
  /** maximum number of rows (tiles) allowed */
  maxRows?: number;
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
  /** escape secuences to parse and their callback functions */
  commands?: { [key: string]: EscapeCallback };
  /** Limit within the Terminal will draw */
  viewport?: ViewPortOptions;
  /** Optimization? If `true` it will check if the tile to render is already in the queue to avoid rendering it twice */
  avoidDoubleRendering?: boolean;
  /** `true` to enable debug console messages options, `false` to disable them */
  verbose?: boolean;
  /** Style used when calling `clear` */
  clearStyle?: TextTile;
}

export interface TextTile extends CharStyle {
  /** char to display in the tile */
  char: string;
}

export interface ImageTile {
  /** image to draw */
  image: AcceptedImage;
  /** destiny width */
  dstW: number;
  /** destiny height */
  dstH: number;
  /** Offset in the destiny coordinates */
  offset?: ImageOffset;
  /** Crop parameters for `img` */
  crop?: ImageCropParams;
}

interface InternalTile extends TextTile, ImageTile {
  /** pre-calculated tile (not contents) x-position in pixels */
  x: number;
  /** pre-calculated tile (not contents) y-position in pixels */
  y: number;
}

interface DecayTile extends TextTile {
  /** current opacity */
  alpha: number;
}

type IterateTileCallback = (tile: InternalTile, i: number) => void;

/**
 * Basic terminal features rendered into a Canvas object
 */
export class Terminal implements WidgetContainer {
  /** Default options for widget instances */
  public static defaultOptions: TerminalOptions;

  /** focus manager for the Terminal widgets */
  public readonly focusManager: FocusManager;
  /** event manager for this terminal */
  public readonly eventManager: EventManager;
  /** terminal options */
  protected readonly options: TerminalOptions = {};
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
  /** x-position (tile) of the cursor */
  private cursorX: number = 0;
  /** y-position (tile) of the cursor */
  private cursorY: number = 0;
  /** visibility status of the cursor */
  private cursorVisible: boolean = true;
  /** handler returned by `setInterval` to control the `cursorVisible` status */
  private updateCursorInterval: number;
  /** cached string to create the RegExp to escape characters */
  private escapeCharactersRegExpString: string;
  /** time of the last render */
  private lastRenderTime: number = 0;
  /** list of attached widgets */
  private readonly attachedWidgets: Widget[] = [];

  /**
   * Creates a Terminal associated to a canvas element.
   *
   * @param canvas `<canvas>` element associated to the Terminal
   * @param options Terminal options
   */
  constructor(canvas: HTMLCanvasElement, options?: TerminalOptions) {
    this.focusManager = new FocusManager(this, canvas);
    this.eventManager = new EventManager(this);
    this.canvas = canvas;
    this.ctx = canvas.getContext('2d');
    this.setOptions(deepAssign({}, Terminal.defaultOptions, options));

    if (this.options.autoSize) {
      this.canvas.width = this.options.columns * this.options.tileWidth;
      this.canvas.height = this.options.rows * this.options.tileHeight;
    }

    this.clear();
  }

  /**
   * Update the values of the Terminal options
   *
   * @param options new options to set
   */
  public setOptions(options: TerminalOptions): void {
    const oldColumns = this.options.columns;
    const oldRows = this.options.rows;

    const changed: TerminalOptions = deepAssignAndDiff(this.options, options);

    // don't accept invalid sizes
    if (changed.columns <= 0 || changed.rows <= 0) {
      this.options.columns = oldColumns;
      this.options.rows = oldRows;
    }

    // limit the size of the terminal
    this.options.columns = clamp(this.options.columns, this.options.minColumns, this.options.maxColumns);
    this.options.rows = clamp(this.options.rows, this.options.minRows, this.options.maxRows);

    // decay
    this.decayChange = this.options.decayInitialAlpha / this.options.decayTime;

    // options.commands
    if (changed.commands) {
      const commandList = this.options.commands && Object.keys(this.options.commands);
      this.escapeCharactersRegExpString = commandList ? `(${commandList.join(')|(')})` : undefined;
    }

    // cursor
    this.setCursorFrequency(this.options.cursorFrequency);
    if (!this.options.cursor && this.buffer.length > 0 && this.cursorVisible) {
      this.cursorVisible = false;
      this.addDirtyTile(this.buffer[this.cursorY][this.cursorX], this.dirtyTiles);
      if (this.options.autoRender) {
        this.render();
      }
    }

    // resize
    if (this.options.columns !== oldColumns || this.options.rows !== oldRows) {
      this.resize(this.options.columns, this.options.rows, oldColumns || 0, oldRows || 0);
    }
  }

  /**
   * Clear the whole terminal
   */
  public clear(): void;

  /**
   * Clear only the specified part of the terminal
   *
   * @param col Starting column
   * @param line Starting line
   * @param width Width of the block to clear
   * @param height Height of the vlock to clear
   */
  public clear(col: number, line: number, width: number, height: number): void;

  public clear(col?: number, line?: number, width?: number, height?: number): void {
    const start = window.performance.now();
    const dirtyTiles = this.dirtyTiles;
    const buffer = this.buffer;
    const options = this.options;

    const x0 = col === undefined ? 0 : col;
    const y0 = line === undefined ? 0 : line;
    const w = width === undefined ? options.columns - x0 : width;
    const h = height === undefined ? options.rows - y0 : height;

    if (x0 === undefined) {
      dirtyTiles.splice(0, dirtyTiles.length);
    }

    this.setTextStyle(options.clearStyle);

    const y1 = y0 + h;
    for (let y = y0; y < y1; y++) {
      const x1 = x0 + w;
      for (let x = x0; x < x1; x++) {
        const tile: InternalTile = {
          // common
          x: x * options.tileWidth,
          y: y * options.tileHeight,
          offsetX: options.offsetX,
          offsetY: options.offsetY,
          // text
          char: '',
          bg: options.bg,
          fg: options.fg,
          font: options.font,
          // image
          image: undefined,
          dstW: 0,
          dstH: 0,
        };
        buffer[y][x] = tile;
        this.addDirtyTile(tile, dirtyTiles);
      }
    }

    this.info(`clear: ${w * h} tiles: ${window.performance.now() - start} ms.`);
    if (this.options.autoRender) {
      // maybe this can be optimized with just a this.ctx.fillRect call
      this.render();
    }
  }

  /**
   * Render the terminal status into the canvas context.
   * It works with a list of _dirty_ tiles so it only renders what's changed.
   *
   * It's called automatically if `options.autoRender` is `true` (recommended),
   * but can be set to `false` and call this method manually from outside.
   */
  public render(): void {
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
      let x = tile.x;
      let y = tile.y;
      const isCursor = drawCursor && x === cursorX && y === cursorY;

      // bg
      ctx.fillStyle = isCursor ? tile.fg : tile.bg;
      ctx.fillRect(x, y, w, h);

      if (tile.image) {
        if (tile.offset) {
          x += tile.offset.x;
          y += tile.offset.y;
        }

        if (tile.crop) {
          ctx.drawImage(
            tile.image,
            tile.crop.srcX, tile.crop.srcY, tile.crop.srcW, tile.crop.srcH,
            x, y, tile.dstW, tile.dstH,
          );
        } else {
          ctx.drawImage(tile.image, x, y, tile.dstW, tile.dstH);
        }
      } else {
        const offsetX = tile.offsetX;
        const offsetY = tile.offsetY;
        const decayKey = `${x},${y}`;
        const decayTile = this.decayTiles[decayKey];
        ctx.font = tile.font;

        if (isCursor) {
          // fg
          ctx.fillStyle = tile.bg;
          ctx.fillText(tile.char, x + offsetX, y + h + offsetY);
        } else {
          // decay
          if (decayTile) {
            if (decayTile.alpha > decayChange) {
              decayTile.alpha -= decayChange;
              ctx.fillStyle = decayTile.fg;
              ctx.font = decayTile.font;
              ctx.globalAlpha = decayTile.alpha;
              ctx.fillText(decayTile.char, x + decayTile.offsetX, y + h + decayTile.offsetY);
              ctx.globalAlpha = originalAlpha;
              ctx.font = tile.font;
            } else {
              this.decayTiles[decayKey] = undefined;
            }
            this.addDirtyTile(tile, tilesToRedraw);
          }

          // fg
          ctx.fillStyle = tile.fg;
          ctx.fillText(tile.char, x + offsetX, y + h + offsetY);
        }
      }
    }

    this.info(`render: ${nTiles} tiles: ${this.lastRenderTime - start} ms.`);
    this.lastRenderTime = start;

    this.dirtyTiles = tilesToRedraw;
    if (tilesToRedraw.length > 0 && this.options.autoRender) {
      requestAnimationFrame(this.render.bind(this));
    }
  }

  /**
   * Forces a render of all the tiles, not only the changed ones
   */
  public renderAll(): void {
    this.dirtyTiles = emptyArray(this.dirtyTiles);
    for (let y = 0; y < this.options.rows; y++) {
      for (let x = 0; x < this.options.columns; x++) {
        this.dirtyTiles.push(this.buffer[y][x]);
      }
    }
    this.render();
  }

  /**
   * Get the drawing limits (viewport) of the terminal
   *
   * @returns Current viewport of the terminal
   */
  public getViewport(): ViewPortOptions {
    return { ...this.options.viewport };
  }

  /**
   * Get the terminal size, measured in tiles
   *
   * @returns Size of the terminal, measured in tiles
   */
  public getSize(): TileSize {
    return {
      columns: this.options.columns,
      rows: this.options.rows,
    };
  }

  /**
   * Get the current status of the cursor
   *
   * @returns `true` if the cursor is enabled, `false` otherwise
   */
  public isCursorEnabled(): boolean {
    return this.options.cursor;
  }

  /**
   * Get the position of the cursor, in tile coordinates
   *
   * @returns current position of the cursor, in tile coordinates
   */
  public getCursor(): TilePosition {
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
  public setCursor(col: number, line: number): void {
    const oldTile = this.buffer[this.cursorY][this.cursorX];
    let x = col;
    let y = line;

    // correct coordinates
    if (x >= this.options.columns && y < this.options.rows - 1) {
      x = 0;
      y++;
    } else if (x < 0 && y > 0) {
      x = this.options.columns - 1;
      y--;
    } else {
      x = Math.max(0, Math.min(x, this.options.columns - 1));
    }

    if (y >= this.options.rows) {
      y = this.options.rows - 1;
    } else if (y < 0) {
      y = 0;
    }

    // assign the new position of the cursor
    this.cursorX = x;
    this.cursorY = y;

    // redraw new and old tiles to update the cursor visibility
    const newTile = this.buffer[y][x];
    if (oldTile !== newTile) {
      this.addDirtyTile(oldTile, this.dirtyTiles);
      this.addDirtyTile(newTile, this.dirtyTiles);
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
  public moveCursor(dx: number, dy: number): void {
    this.setCursor(this.cursorX + dx, this.cursorY + dy);
  }

  /**
   * Given a position in pixels relative to the top-left corner of the terminal,
   * get the corresponding tile
   *
   * @param x pixels from the left corner in the grid
   * @param y pixels from the top corner in the grid
   */
  public getTilePosition(x: number, y: number): TilePosition {
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
  public setTextStyle(style: CharStyle): void {
    assignCharStyle(this.options, style);
  }

  /**
   * Get the current style being applied to the `setText` calls
   */
  public getTextStyle(): CharStyle {
    const ctx = this.ctx;

    return {
      font: ctx.font,
      offsetX: this.options.offsetX,
      offsetY: this.options.offsetY,
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
  public setText(text: string, col?: number, line?: number): void {
    this.info(`setText: ${text}`);

    const dirtyTiles = this.dirtyTiles;
    const decayTiles = this.decayTiles;
    const decayEnabled = !!this.decayChange;
    const options = this.options;
    const addDirtyTile = this.addDirtyTile.bind(this);
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
          offsetX: tile.offsetX,
          offsetY: tile.offsetY,
          fg: tile.fg,
          alpha: options.decayInitialAlpha,
        };
      }

      delete tile.image;
      tile.char = text[i + textOffset];
      tile.font = options.font;
      tile.offsetX = options.offsetX;
      tile.offsetY = options.offsetY;
      tile.fg = options.fg;
      tile.bg = options.bg;
      addDirtyTile(tile, dirtyTiles);
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

      const commandParams: Partial<EscapeCommandParams> = {
        text,
        terminal: this,
      };

      while (i < text.length && match) {
        textOffset = i;
        this.iterateTiles(match.index - i, setTile);
        commandParams.index = match.index;
        commandParams.match = match[0];
        commandParams.col = this.cursorX;
        commandParams.line = this.cursorY;
        i = this.options.commands[match[0]](commandParams as EscapeCommandParams);
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
   * Draws an image to the terminal.
   *
   * @param img Image or source image to set
   * @param col x-position of the starting tile. Current position of the cursor if not specified
   * @param line y-position of the starting tile. Current position of the cursor if not specified
   * @param crop If only a portion of `img` is to be drawn, cropping parameters are specified here
   */
  public setImage(img: AcceptedImage, col?: number, line?: number, offset?: ImageOffset,
                  size?: ImageSize, crop?: ImageCropParams): void {
    const setTile = (tile: InternalTile) => {
      tile.dstW = size ? size.width : (crop ? crop.srcW : img.width);
      tile.dstH = size ? size.height : (crop ? crop.srcH : img.height);
      tile.image = img;
      tile.crop = crop;
      tile.offset = offset;
      this.addDirtyTile(tile);
    };

    this.iterateTiles(1, setTile, col, line);
  }

  /**
   * Get the text of the terminal. By default gets the text from the current position of the cursor.
   * If the `size` is reaches the end of the line, it will continue in the next one.
   *
   * @param size Number of tiles to get
   * @param col x-position of the starting tile. Current position of the cursor if not specified
   * @param line y-position of the starting tile. Current position of the cursor if not specified
   */
  public getText(size: number = 1, col?: number, line?: number): string {
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
   * Works like `setText` but specifying all the properties of a tile, not only the text.
   *
   * @param tiles Tile or list of tiles to set
   * @param col x-position of the starting tile. Current position of the cursor if not specified
   * @param line y-position of the starting tile. Current position of the cursor if not specified
   */
  public setTiles(tiles: TextTile | TextTile[] | ImageTile | ImageTile[], col?: number, line?: number): void {
    const dirtyTiles = this.dirtyTiles;
    const tilesList = isArray(tiles) ? tiles as TextTile[] : [tiles as TextTile];

    this.iterateTiles(
      tilesList.length,
      (tile, i) => {
        Object.assign(tile, tilesList[i]);
        this.addDirtyTile(tile, dirtyTiles);
      },
      col,
      line,
    );

    if (this.options.autoRender) {
      this.render();
    }
  }

  /**
   * Get the reference to the parent of the widget, if any
   *
   * @returns parent if any, or `undefined`
   */
  // tslint:disable-next-line:prefer-function-over-method
  public getParent(): WidgetContainer {
    return;
  }

  /**
   * Create and attach a widget to this instance of the terminal
   *
   * @param WidgetClass Class of the widget
   * @param options Options for the widget constructor
   * @return handler of the attached widget. Required to deattach it.
   */
  public attachWidget<WidgetType extends Widget>(WidgetClass: WidgetConstructor<WidgetType>,
                                                 options?: any): WidgetType { // tslint:disable-line:no-any
    const widget: WidgetType = Reflect.construct(WidgetClass, [
      this,
      options,
      this,
    ]);

    this.attachedWidgets.push(widget);
    widget.render();

    return widget;
  }

  /**
   * Dettach a widget from the terminal
   *
   * @param widget Widget to dettach
   * @return `true` if the widget was found (and removed). `false` if not found
   */
  public dettachWidget(widget: Widget): boolean {
    const index = this.attachedWidgets.findIndex((w) => w === widget);

    if (index !== -1) {
      this.attachedWidgets.splice(index, 1);
      const position = widget.getPosition();
      const size = widget.getSize();
      this.clear(position.col, position.line, size.columns, size.rows);
    }

    return index !== -1;
  }

  /**
   * Get a previously attached widget by its position
   *
   * @param column column of the terminal
   * @param line line of the terminal
   * @return widget or `undefined` if not found (wrong id or previously dettached)
   */
  public getWidgetAt(column: number, line: number): Widget {
    for (const widget of this.attachedWidgets) {
      if (widget.isAt(column, line)) {
        return widget;
      }
    }

    return;
  }

  /**
   * Traverse the containers to get the last possible widget at the specified position
   *
   * @param column column of the terminal
   * @param line line of the terminal
   * @return widget or `undefined` if not found
   */
  public getLeafWidgetAt(column: number, line: number): Widget {
    // tslint:disable-next-line:no-this-assignment
    let container: WidgetContainer = this;
    let widget;
    let validWidget;

    do {
      widget = container.getWidgetAt(column, line);
      if (widget) {
        validWidget = widget;
        container = isWidgetContainer(widget) ? widget : undefined;
      }
    } while (widget && container);

    return validWidget;
  }

  /**
   * Get the list of widgets from the widget until the terminal itself (not included)
   * The result will be `undefined` if the widget is not found as a descendant of this terminal
   *
   * @param widget Widget to start the list with
   * @returns list of widgets from the `widget` itself (included) to the terminal (not included)
   */
  public getWidgetPath(widget: Widget): Array<Widget | WidgetContainer> {
    const branch: Array<Widget | WidgetContainer> = [widget];
    let current = widget.getParent();

    while (current !== this && current !== undefined) {
      branch.push(current);
      current = current.getParent();
    }

    return current === this ? branch : undefined;
  }

  /**
   * Get a bidirectional iterator to move across the attached widgets of the container
   *
   * @param startWidget if specified, the next call will start with this widget (return the next or previous one)
   */
  public [Symbol.iterator](startWidget?: Widget | number): BidirectionalIterator<Widget> {
    const data = this.attachedWidgets;
    let index: number;

    const it = {
      next: () => {
        index++;
        if (index > this.attachedWidgets.length) {
          index = this.attachedWidgets.length;
        }

        return {
          value: data[index],
          done: !(index in data),
        };
      },

      prev: () => {
        index--;
        if (index < -1) {
          index = -1;
        }

        return {
          value: data[index],
          done: !(index in data),
        };
      },

      seek: (value: Widget | number) => {
        index = typeof value === 'number'
          ? (value < 0 ? this.attachedWidgets.length - value - 1 : value)
          : this.attachedWidgets.indexOf(value);
      },
    };

    if (startWidget) {
      it.seek(startWidget);
    } else {
      index = -1;
    }

    return it;
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
    const viewPortTop = this.options.viewport.top || 0;
    const viewPortRight = this.options.viewport.right || this.options.columns - 1;
    const viewPortBottom = this.options.viewport.bottom || this.options.rows - 1;
    const viewPortLeft = this.options.viewport.left || 0;

    let x = typeof col === 'undefined' ? this.cursorX : col;
    let y = typeof line === 'undefined' ? this.cursorY : line;

    for (let i = 0; i < size; i++) {
      if (x > viewPortRight) {
        x = viewPortLeft;
        y++;
      }
      if (y > viewPortBottom) {
        break;
      }
      if (y < viewPortTop) {
        x++;
        continue;
      }
      // cursor is updated inside this function in case that `setText` is called nested via escaped commands
      this.cursorX = x;
      this.cursorY = y;
      callback(buffer[y][x], i);
      x++;
    }

    if (x >= viewPortRight) {
      x = viewPortLeft;
      if (y < viewPortBottom) {
        this.cursorY++;
      }
    }
    this.cursorX = x;
  }

  /**
   * Sets the interval managing the cursor blinking feature
   *
   * @param frequency milliseconds to wait before changing the cursor visibility status
   */
  private setCursorFrequency(frequency: number): void {
    clearInterval(this.updateCursorInterval);
    if (this.options.cursor && frequency > 0) {
      this.updateCursorInterval = window.setInterval(
        () => {
          this.cursorVisible = !this.cursorVisible;
          this.addDirtyTile(this.buffer[this.cursorY][this.cursorX], this.dirtyTiles);
          if (this.options.autoRender) {
            this.render();
          }
        },
        frequency);
    }
  }

  /**
   * Output the given text as info, only when `verbose` option is enabled
   *
   * @param text text to output
   */
  private info(text: string): void {
    if (this.options.verbose) {
      // tslint:disable-next-line:no-console
      console.log(`[Terminal] ${text}`);
    }
  }

  /**
   * Add a tile to be drawn in the next `render` only if it's not already queued
   *
   * @param dirtyTile tile to queue to draw
   * @param container usually `this.dirtyTiles`, but can be another temporal container
   */
  private addDirtyTile(dirtyTile: InternalTile, container: InternalTile[] = this.dirtyTiles): void {
    if (this.options.avoidDoubleRendering) {
      for (const tile of container) {
        if (tile.x === dirtyTile.x && tile.y === dirtyTile.y) {
          return;
        }
      }
    }

    container.push(dirtyTile);
  }

  /**
   * Resize the terminal and re-calculate the needed internal properties
   * It triggers the RESIZED event.
   *
   * @param width New terminal width (in tiles)
   * @param height New terminal height (in tiles)
   * @param oldWidth Terminal width (in tiles) before being  resized
   * @param oldHeight Terminal height (in tiles) before being resized
   */
  private resize(width: number, height: number, oldWidth: number, oldHeight: number): void {
    const buffer = this.buffer;
    const autoRender = this.options.autoRender;
    this.options.autoRender = !this.options.autoSize;

    if (height > oldHeight) {
      for (let y = oldHeight; y < height; y++) {
        buffer[y] = [];
      }
      this.clear(0, oldHeight, oldWidth, height - oldHeight);
    } else if (height < oldHeight) {
      buffer.splice(height);
    }

    if (width > oldWidth) {
      this.clear(oldWidth, 0, width - oldWidth, height);
    } else if (width < oldWidth) {
      for (let y = 0; y < height; y++) {
        buffer[y].splice(width);
      }
    }

    if (this.options.autoSize) {
      this.canvas.width = this.options.columns * this.options.tileWidth;
      this.canvas.height = this.options.rows * this.options.tileHeight;

      this.ctx.fillStyle = this.options.bg;
      this.ctx.fillRect(0, 0, this.canvas.width, this.canvas.height);
    }

    this.options.autoRender = autoRender;
    this.info(`resized to: ${width} x ${height}`);
    this.eventManager.trigger(new TerminalEvent('resized', { width, height, oldWidth, oldHeight }));
  }
}

/*
 * Default options for new instances
 */
Terminal.defaultOptions = {
  tileWidth: 18,
  tileHeight: 28,
  minColumns: 0,
  minRows: 0,
  maxColumns: Infinity,
  maxRows: Infinity,
  autoRender: true,
  autoSize: true,
  cursor: true,
  cursorFrequency: 700,
  decayTime: 0,
  decayInitialAlpha: 0.7,
  font: '20pt Terminal_VT220',
  offsetX: 1,
  offsetY: -1,
  fg: '#00ff00',
  bg: '#000000',
  viewport: {
    top: undefined,
    right: undefined,
    bottom: undefined,
    left: undefined,
  },
  avoidDoubleRendering: true,
  verbose: false,
  clearStyle: {
    char: '',
    bg: '#000000',
    fg: '#00ff00',
  },
};
