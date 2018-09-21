import { CharStyle, Terminal, TextTile, TileSize } from '../Terminal';
import { TerminalEvent } from '../TerminalEvent';
import { coalesce } from '../util/coalesce';
import { Widget, WidgetConstructor, WidgetOptions } from '../Widget';
import { BidirectionalIterator, WidgetContainer } from '../WidgetContainer';

export interface GridOptions extends WidgetOptions {
  /** Number of rows of the grid */
  rows: number;
  /** Number of columns of the grid */
  columns: number;
  /** Expand (or not) to the full size of the terminal (only applies when the parent is the terminal) */
  fullSize?: boolean;
  /** Borders enabled (`true`) or disabled (`false`). Disabled by default */
  borders?: boolean;
  /** Style to use for the border when enabled */
  borderStyle?: GridBorderOptions;
  /**
   * Function used to calculate the space for each grid
   * Leave `undefined` to use the default one
   *
   * It needs to return an array of the tiles where each row/column starts
   */
  calculateGridSpace?(available: number, cells: number, isRow: boolean, terminal: Terminal): number[];
}

export interface GridBorderOptions extends CharStyle {
  // 1 line: no joints
  top?: string;
  right?: string;
  bottom?: string;
  left?: string;
  // 2 lines: corners
  topLeft?: string;
  topRight?: string;
  bottomRight?: string;
  bottomLeft?: string;
  // 3 lines: T style
  noTop?: string;
  noRight?: string;
  noBottom?: string;
  noLeft?: string;
  // 4 lines: full
  cross?: string;
}

interface AttachedWidget {
  /** widget instance */
  widget: Widget;
  /** x-position in grid columns */
  col: number;
  /** y-position in grid rows */
  line: number;
  /** width in grid columns */
  width: number;
  /** height in grid rows */
  height: number;
}

interface TileList {
  tiles: TextTile[];
  col: number;
  line: number;
}

/**
 * Provides a dynamic grid system for Terminal Widgets
 */
export class Grid extends Widget<GridOptions> implements WidgetContainer {
  /** Default options for widget instances */
  public static defaultOptions: GridOptions;

  /** List of attached widgets */
  private readonly attachedWidgets: AttachedWidget[] = [];
  /** list of the first tile of each column */
  private columnStarts: number[] = [];
  /** list of the first tile of each row */
  private rowStarts: number[] = [];
  /** List of precalculated tiles to draw the borders */
  private borderTiles: TileList[];

  constructor(terminal: Terminal, options: GridOptions, parent?: WidgetContainer) {
    super(terminal, options, parent);
    this.options = { ...Grid.defaultOptions, ...this.options, ...options };

    if (typeof options.fullSize === 'undefined') {
      this.options.fullSize = true;
    }

    this.resizedEventHandler = this.resizedEventHandler.bind(this);

    if (parent instanceof Terminal && this.options.fullSize) {
      const parentSize = parent.getSize();
      this.setOptions({
        col: 0,
        line: 0,
        width: parentSize.columns,
        height: parentSize.rows,
      } as any); // tslint:disable-line:no-any
      // tslint:disable-next-line:no-unbound-method
      terminal.eventManager.addListener('resized', this.resizedEventHandler);

    } else {
      this.setOptions({
        col: options.col || 0,
        line: options.line || 0,
        width: options.width,
        height: options.height,
      } as any); // tslint:disable-line:no-any
    }

    this.recalculateCellSizes();
  }

  /**
   * Method to call when the widget is not going to be used anymore, so it can clean whatever it set in the constructor
   */
  public destruct() {
    // tslint:disable-next-line:no-unbound-method
    this.terminal.eventManager.removeListener('resized', this.resizedEventHandler);
  }

  /**
   * Render all the attached widgets to the grid
   */
  public render(): void {
    if (this.options.borders) {
      this.renderBorders();
    }

    this.attachedWidgets.forEach((instance) => {
      instance.widget.render();
    });
  }

  /**
   * Do the calculation of the real size of the attached widgets
   * Widgets won't be placed properly until this method is not called (to avoid duplicated calculations)
   * This is called automatically when using `attachWidget` but is provided in case it needs to be called manually
   */
  public align(): void {
    this.alignWidgets();
  }

  /**
   * Attach a widget to the grid
   *
   * @param col column of the grid
   * @param line row of the grid
   * @param width how many grid columns the widget should occupy
   * @param height how many grid rows the widget should occupy
   * @param WidgetClass Class of the widget to attach
   * @param options Options to pass to the Widget when creating it
   * @return widget instance
   */
  public attachWidget<WidgetType>(col: number, line: number, width: number, height: number,
                                  WidgetClass: WidgetConstructor<WidgetType>,
                                  options: any): WidgetType { // tslint:disable-line:no-any
    const widget = Reflect.construct(WidgetClass, [
      this.terminal,
      options,
      this,
    ]);
    const attachedWidget: AttachedWidget = {
      widget,
      col,
      line,
      width,
      height,
    };

    this.attachedWidgets.push(attachedWidget);
    this.alignWidgets(attachedWidget);

    return widget as WidgetType;
  }

  /**
   * Dettach a widget from this terminal
   *
   * @param handler Value returned by `attachWidget`
   * @return `true` if the widget was found (and removed). `false` if not found
   */
  public dettachWidget(widget: Widget): boolean {
    const index = this.attachedWidgets.findIndex((instance) => instance.widget === widget);

    if (index !== -1) {
      this.attachedWidgets.splice(index, 1);
      const position = widget.getPosition();
      const size = widget.getSize();
      this.terminal.clear(position.col, position.line, size.columns, size.rows);
    }

    return index !== -1;
  }

  /**
   * Get a previously attached widget by its position in the terminal
   *
   * @param column column of the terminal
   * @param line line of the terminal
   * @return widget or `undefined` if not found
   */
  public getWidgetAt(column: number, line: number): Widget {
    for (const instance of this.attachedWidgets) {
      if (instance.widget.isAt(column, line)) {
        return instance.widget;
      }
    }

    return;
  }

  /**
   * Get a bidirectional iterator to move across the attached widgets of the container
   *
   * @param startWidget if specified, the iterator will start with this widget
   */
  public [Symbol.iterator](startWidget?: Widget | number): BidirectionalIterator<Widget> {
    const data = this.attachedWidgets;
    let index: number;

    const it = {
      next: () => {
        const attachedWidget = data[++index];
        if (index > this.attachedWidgets.length) {
          index = this.attachedWidgets.length;
        }

        return {
          value: attachedWidget && attachedWidget.widget,
          done: !(index in data),
        };
      },

      prev: () => {
        const attachedWidget = data[--index];
        if (index < -1) {
          index = -1;
        }

        return {
          value: attachedWidget && attachedWidget.widget,
          done: !(index in data),
        };
      },

      seek: (value: Widget | number) => {
        index = typeof value === 'number'
          ? (value < 0 ? this.attachedWidgets.length - value - 1 : value)
          : data.findIndex((attachedWidget) => attachedWidget.widget === value);
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
   * Get a previously attached widget by its position in the Grid
   *
   * @param column column of the grid
   * @param line line of the grid
   * @return widget or `undefined` if not found
   */
  public getWidgetGrid(column: number, line: number): Widget {
    const attachedWidget = this.attachedWidgets.filter((instance) => instance.col >= column
      && instance.col < column + instance.width
      && instance.line >= line
      && instance.line < line + instance.height)[0];

    return attachedWidget ? attachedWidget.widget : undefined;
  }

  /**
   * Get the size of a cell of the grid in tiles
   *
   * @param column column of the grid
   * @param line line of the grid
   * @return size of a cell
   */
  public getCellSize(column: number, line: number): TileSize {
    return {
      columns: this.columnStarts[column + 1] - this.columnStarts[column],
      rows: this.rowStarts[line + 1] - this.rowStarts[line],
    };
  }

  /**
   * `setOptions` will assign the options to `this.options`,
   * but any derivated calculation should be done here.
   *
   * @param changedOptions Object with only the changed options
   */
  protected updateOptions(changes: GridOptions): void {
    const options = this.options;

    if (!options.calculateGridSpace && !changes.calculateGridSpace) {
      options.calculateGridSpace = calculateGridSpace;
    }

    if (coalesce(changes.width, changes.height, changes.col, changes.line, changes.borders) !== undefined) {
      if (this.parent instanceof Terminal && options.fullSize) {
        const terminalSize = this.parent.getSize();
        options.col = 0;
        options.line = 0;
        options.width = terminalSize.columns;
        options.height = terminalSize.rows;
      }

      this.recalculateCellSizes();
    }
  }

  /**
   * Precalculate the borders based on the options and the attached widgets
   */
  private calculateBorders(): void {
    if (!this.attachedWidgets || this.attachedWidgets.length === 0) {
      this.borderTiles = [];

      return;
    }

    const borders: { [key: number]: { [key: number]: string } } = {};
    const borderStyle = this.options.borderStyle;
    const newTiles: TileList[] = [];

    /** Check if a tile around the current one is marked to render */
    function checkTile(col: number, line: number, ...deltas: Array<[number, number]>): boolean {
      return deltas.every(([dx, dy]) => {
        const row = borders[line + dy];

        return row !== undefined && row[col + dx] !== undefined;
      });
    }

    /** Get the correct tile based on its surroundings */
    function getBorderTile(col: number, line: number, char: string): TextTile {
      let c;

      if (checkTile(col, line, [0, -1], [1, 0], [0, 1], [-1, 0])) {
        c = borderStyle.cross;
      } else if (checkTile(col, line, [1, 0], [0, 1], [-1, 0])) {
        c = borderStyle.noTop;
      } else if (checkTile(col, line, [0, -1], [0, 1], [-1, 0])) {
        c = borderStyle.noLeft;
      } else if (checkTile(col, line, [0, -1], [1, 0], [-1, 0])) {
        c = borderStyle.noBottom;
      } else if (checkTile(col, line, [0, -1], [1, 0], [0, 1])) {
        c = borderStyle.noRight;
      } else if (checkTile(col, line, [1, 0], [0, 1])) {
        c = borderStyle.topLeft;
      } else if (checkTile(col, line, [-1, 0], [0, 1])) {
        c = borderStyle.topRight;
      } else if (checkTile(col, line, [-1, 0], [0, -1])) {
        c = borderStyle.bottomRight;
      } else if (checkTile(col, line, [1, 0], [0, -1])) {
        c = borderStyle.bottomLeft;
      } else {
        c = char;
      }

      return {
        char: c,
        font: borderStyle.font,
        offsetX: borderStyle.offsetX,
        offsetY: borderStyle.offsetY,
        fg: borderStyle.fg,
        bg: borderStyle.bg,
      };
    }

    /** Add one tile to the list of tiles to calculate */
    function addTile(col: number, line: number, char: string): void {
      if (!borders[line]) {
        borders[line] = {};
      }
      borders[line][col] = char;
    }

    /** Add a box of tiles to calculate */
    function addBox(x0: number, y0: number, x1: number, y1: number): void {
      if (x0 === undefined || y0 === undefined || x1 === undefined || y1 === undefined) {
        return;
      }

      // horizontal lines
      for (let i = x0; i < x1; i++) {
        // top line
        addTile(i, y0, borderStyle.top);
        // bottom line
        addTile(i, y1 - 1, borderStyle.bottom);
      }

      // vertical lines
      for (let i = y0 + 1; i < y1 - 1; i++) {
        // left line
        addTile(x0, i, borderStyle.left);
        // right line
        addTile(x1 - 1, i, borderStyle.right);
      }
    }

    // get the list of tiles to calculate based on the attached widgets
    for (const widget of this.attachedWidgets) {
      addBox(
        this.columnStarts[widget.col] - 1,
        this.rowStarts[widget.line] - 1,
        this.columnStarts[widget.col + widget.width],
        this.rowStarts[widget.line + widget.height],
      );
    }

    // get the actual tiles to render based on the calculated ones
    Object.keys(borders)
    .forEach((keyY) => {
      const y = Number(keyY);
      const line = borders[y];
      let lastCol = -1;
      let chunkStart = -1;
      let chunk: TextTile[];

      Object.keys(line)
      .forEach((keyX) => {
        const x = Number(keyX);
        if (lastCol === -1 || x - lastCol !== 1) {
          if (chunk) {
            newTiles.push({
              tiles: chunk,
              col: chunkStart,
              line: y,
            });
          }
          chunk = [];
          chunkStart = x;
        }
        lastCol = x;
        chunk.push(getBorderTile(x, y, borders[y][x]));
      });

      newTiles.push({
        tiles: chunk,
        col: chunkStart,
        line: y,
      });
    });

    this.borderTiles = newTiles;
  }

  /**
   * Render all the borders of the grid
   */
  private renderBorders(): void {
    if (!this.borderTiles) {
      this.calculateBorders();
    }

    this.borderTiles.forEach((chunk) => {
      this.terminal.setTiles(chunk.tiles, chunk.col, chunk.line);
    });
  }

  /**
   * Here's where the calculation of the real size of the attached widget is done
   * Widget won't be placed properly until this method is not called (to avoid duplicated calculations)
   */
  private alignWidgets(attachedWidget?: AttachedWidget): void {
    const columnStarts = this.columnStarts;
    const rowStarts = this.rowStarts;
    this.borderTiles = undefined;

    /** Update the options of a widget after being aligned */
    const alignOne = (w: AttachedWidget): void => {
      const col = columnStarts[w.col];
      const line = rowStarts[w.line];
      const borders = this.options.borders ? 1 : 0;
      const width = columnStarts[w.col + w.width] - col - borders;
      const height = rowStarts[w.line + w.height] - line - borders;

      w.widget.setOptions({ col, line, width, height });
      w.widget.render();
    };

    if (this.options.borders) {
      this.renderBorders();
    }

    if (attachedWidget) {
      alignOne(attachedWidget);
    } else if (this.attachedWidgets) {
      this.attachedWidgets.forEach(alignOne);
    }
  }

  /**
   * Recalculate the start of each grid row and column based in the grid position, size and
   * calculation method
   */
  private recalculateCellSizes(): void {
    const options = this.options;

    /** Get the list of spaces for each grid and returns the start of each one */
    function spaceToStarts(first: number, spaces: number[], max: number): number[] {
      const starts: number[] = [];
      let acc = first;
      spaces.forEach((space, i) => {
        starts.push(acc + (options.borders ? i + 1 : 0));
        acc += space;
      });

      // where starts the end, for calculating widget sizes
      starts.push(max);

      return starts;
    }

    let availableWidth = options.width;
    let availableHeight = options.height;

    if (options.borders) {
      availableWidth -= options.columns + 1;
      availableHeight -= options.rows + 1;
    }

    this.columnStarts = spaceToStarts(
      options.col,
      options.calculateGridSpace(
        availableWidth,
        options.columns,
        false,
        this.terminal,
      ),
      options.width,
    );

    this.rowStarts = spaceToStarts(
      options.line,
      options.calculateGridSpace(
        availableHeight,
        options.rows,
        true,
        this.terminal,
      ),
      options.height,
    );

    this.alignWidgets();
  }

  /**
   * Handler for the Terminal RESIZED event
   *
   * @param event Triggered event
   */
  private resizedEventHandler(event: TerminalEvent): void {
    if (this.parent instanceof Terminal && this.options.fullSize) {
      const terminalSize = this.parent.getSize();

      this.setOptions({
        col: 0,
        line: 0,
        width: terminalSize.columns,
        height: terminalSize.rows,
      } as any); // tslint:disable-line:no-any
    }
  }
}

/**
 * Function that calculates the space of each grid the most equitative way.
 * Some cells can be bigger than others in no specific order, but with only 1 unit of difference as most.
 *
 * @param available number of tiles availables
 * @param cells number of rows/columns
 * @param isRow `true` when calculating the rows size, `false` for columns
 * @return list (int[]) with the horizontal or vertical size of each grid
 */
function calculateGridSpace(available: number, cells: number): number[] {
  if (cells === 0) {
    return [];
  }
  if (cells === 1) {
    return [available];
  }

  const tilesPerSlot = available / cells;
  let acc = Math.round(tilesPerSlot);
  const res = [acc];

  for (let i = 1; i < cells - 1; i++) {
    const size = Math.round(tilesPerSlot * (i + 1)) - acc;
    res.push(size);
    acc += size;
  }
  res.push(available - acc);

  return res;
}

/*
 * Default options for new instances
 */
Grid.defaultOptions = {
  calculateGridSpace,
  rows: undefined,
  columns: undefined,
  borderStyle: {
    offsetX: 0,
    offsetY: 0,
    bg: '#000000',
    fg: '#00ff00',
    font: '20pt Terminal_VT220',
    // 1 line
    top: '─',
    bottom: '─',
    left: '│',
    right: '│',
    // 2 lines
    topLeft: '┌',
    topRight: '┐',
    bottomRight: '┘',
    bottomLeft: '└',
    // 3 lines
    noTop: '┬',
    noRight: '├',
    noBottom: '┴',
    noLeft: '┤',
    // 4 lines
    cross: '┼',
  },
};
