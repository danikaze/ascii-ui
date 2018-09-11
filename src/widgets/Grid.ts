import { Terminal, TileSize } from '../Terminal';
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
  /**
   * Function used to calculate the space for each grid
   * Leave `undefined` to use the default one
   *
   * It needs to return an array of the tiles where each row/column starts
   */
  calculateGridSpace?(available: number, cells: number, isRow: boolean, terminal: Terminal): number[];
}
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

/**
 * Provides a dynamic grid system for Terminal Widgets
 */
export class Grid extends Widget<GridOptions> implements WidgetContainer {
  /** Default options for widget instances */
  static defaultOptions: GridOptions;

  /** List of attached widgets */
  private readonly attachedWidgets: AttachedWidget[] = [];
  /** list of the first tile of each column */
  private columnStarts: number[] = [];
  /** list of the first tile of each row */
  private rowStarts: number[] = [];

  constructor(terminal: Terminal, options: GridOptions, parent?: WidgetContainer) {
    super(terminal, options, parent);
    this.options = { ...Grid.defaultOptions, ...this.options, ...options };

    if (typeof options.fullSize === 'undefined') {
      this.options.fullSize = true;
    }

    if (parent instanceof Terminal && this.options.fullSize) {
      const parentSize = parent.getSize();
      this.setOptions({
        col: 0,
        line: 0,
        width: parentSize.columns,
        height: parentSize.rows,
      } as any); // tslint:disable-line:no-any
      terminal.eventManager.listen('resized', this.resizedEventHandler.bind(this));

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
   * Render all the attached widgets to the grid
   */
  render(): void {
    this.attachedWidgets.forEach((instance) => {
      instance.widget.render();
    });
  }

  /**
   * Do the calculation of the real size of the attached widgets
   * Widgets won't be placed properly until this method is not called (to avoid duplicated calculations)
   * This is called automatically when using `attachWidget` but is provided in case it needs to be called manually
   */
  align(): void {
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
  attachWidget<WidgetType>(col: number, line: number, width: number, height: number,
                           WidgetClass: WidgetConstructor<WidgetType>, options): WidgetType {
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
  dettachWidget(widget: Widget): boolean {
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
  getWidgetAt(column: number, line: number): Widget {
    for (const instance of this.attachedWidgets) {
      if (instance.widget.isAt(column, line)) {
        return instance.widget;
      }
    }

    return undefined;
  }

  /**
   * Get a bidirectional iterator to move across the attached widgets of the container
   *
   * @param startWidget if specified, the iterator will start with this widget
   */
  [Symbol.iterator](startWidget?: Widget | number): BidirectionalIterator<Widget> {
    const data = this.attachedWidgets;
    let index;

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
  getWidgetGrid(column: number, line: number): Widget {
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
  getCellSize(column: number, line: number): TileSize {
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
  // tslint:disable-next-line:prefer-function-over-method
  protected updateOptions(changes: GridOptions): void {
    if (!this.options.calculateGridSpace && !changes.calculateGridSpace) {
      this.options.calculateGridSpace = calculateGridSpace;
    }

    if (coalesce(changes.width, changes.height, changes.col, changes.line) !== undefined) {
      this.recalculateCellSizes();
      this.align();
    }
  }

  /**
   * Here's where the calculation of the real size of the attached widget is done
   * Widget won't be placed properly until this method is not called (to avoid duplicated calculations)
   */
  private alignWidgets(attachedWidget?: AttachedWidget): void {
    const columnStarts = this.columnStarts;
    const rowStarts = this.rowStarts;

    /** Update the options of a widget after being aligned */
    function alignOne(w: AttachedWidget) {
      const col = columnStarts[w.col];
      const line = rowStarts[w.line];
      const width = columnStarts[w.col + w.width] - col;
      const height = rowStarts[w.line + w.height] - line;

      w.widget.setOptions({ col, line, width, height });
      w.widget.render();
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
    /** Get the list of spaces for each grid and returns the start of each one */
    function spaceToStarts(first: number, spaces: number[], max: number): number[] {
      const starts = [];
      let acc = first;
      spaces.forEach((space) => {
        starts.push(acc);
        acc += space;
      });

      // where starts the end, for calculating widget sizes
      starts.push(max);

      return starts;
    }

    const options = this.options;
    this.columnStarts = spaceToStarts(
      options.col,
      options.calculateGridSpace(
        options.width,
        options.columns,
      false,
      this.terminal,
      ),
      options.width,
    );

    this.rowStarts = spaceToStarts(
      options.line,
      options.calculateGridSpace(
        options.height,
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

    this.recalculateCellSizes();
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

  // tslint:disable-next-line:no-magic-numbers
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
  rows: undefined,
  columns: undefined,
  calculateGridSpace,
};
