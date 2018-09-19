import { isEmpty } from 'vanilla-type-check/isEmpty';

import { CharStyle, Terminal, TextTile } from '../Terminal';
import { assignCharStyle } from '../util/assignCharStyle';
import { coalesce } from '../util/coalesce';
import { deepAssign } from '../util/deepAssign';
import { noWrap } from '../util/tokenizer';
import { Widget, WidgetConstructor, WidgetOptions } from '../Widget';
import { BidirectionalIterator, WidgetContainer } from '../WidgetContainer';

export interface BoxBorderOptions extends CharStyle {
  topLeft?: string;
  top?: string;
  topRight?: string;
  left?: string;
  center?: string;
  right?: string;
  bottomLeft?: string;
  bottom?: string;
  bottomRight?: string;
}

export interface BoxTitleOptions extends CharStyle {
  /** Number of border tiles to leave to the left of the title */
  marginLeft?: number;
  /** Number of border tiles to leave to the right of the title */
  marginRight?: number;
  /** String to use when the title doesn't fit in the box */
  ellipsis?: string;
}

export interface BoxPaddingOptions {
  /** Number of blank tiles to leave between the top border and the attached widget */
  top?: number;
  /** Number of blank tiles to leave between the right border and the attached widget */
  right?: number;
  /** Number of blank tiles to leave between the bottom border and the attached widget */
  bottom?: number;
  /** Number of blank tiles to leave between the left border and the attached widget */
  left?: number;
}

export interface BoxAspectOptions {
  /** Options related to the title, if used */
  boxTitle?: BoxTitleOptions;
  /** Options related to the border of the box */
  boxBorders?: BoxBorderOptions;
}

export interface BoxOptions extends WidgetOptions {
  /** Title to display at the top of the box */
  title?: string;
  /** Number of blank tiles to leave between the border and the attached widget */
  padding?: BoxPaddingOptions;
  /** Options used when the widget is focuseable but not focused */
  base?: BoxAspectOptions;
  /** Options used when the widget is focused */
  focus?: BoxAspectOptions;
  /** Options used when the widget is not focuseable */
  disabled?: BoxAspectOptions;
}

interface BoxPoolTiles {
  title: TextTile[];
  topLeft: TextTile;
  top: TextTile;
  topRight: TextTile;
  left: TextTile;
  center: TextTile;
  right: TextTile;
  bottomLeft: TextTile;
  bottom: TextTile;
  bottomRight: TextTile;
}

/**
 * Very basic `WidgetContainer` which draws a box around the attached content.
 * It allows only one children inside the box (which can be a Grid or any other container)
 */
export class Box extends Widget<BoxOptions> implements WidgetContainer {
  /** Default options for widget instances */
  public static defaultOptions: BoxOptions;
  /** Pool of Tiles to avoid creating always new objects */
  private static readonly boxTilesPool: BoxPoolTiles = {
    title: [],
    topLeft: { char: '' },
    top: { char: '' },
    topRight: { char: '' },
    left: { char: '' },
    center: { char: '' },
    right: { char: '' },
    bottomLeft: { char: '' },
    bottom: { char: '' },
    bottomRight: { char: '' },
  };

  /** Cached options used when rendering the widget focused */
  private optionsFocus: BoxAspectOptions;
  /** Cached options used when rendering the widget diabled */
  private optionsDisabled: BoxAspectOptions;
  /** Attached widget if any */
  private attachedWidget: Widget;

  constructor(terminal: Terminal, options?: BoxOptions, parent?: WidgetContainer) {
    super(
      terminal,
      deepAssign({}, Box.defaultOptions, options),
      parent,
    );
  }

  /**
   * Render the widget in the associated terminal
   */
  public render(): void {
    if (!this.allocated) {
      return;
    }

    const baseOptions = this.getAspectOptions();
    const boxTitle = baseOptions.boxTitle;
    const title = noWrap(
      this.options.title,
      // tslint:disable-next-line:no-magic-numbers (2 is because of the corners)
      this.options.width - boxTitle.marginLeft - boxTitle.marginRight - 2,
      baseOptions.boxTitle.ellipsis,
    );

    const tiles = this.getBoxTiles(title);
    for (let j = 0; j < tiles.length; j++) {
      this.terminal.setTiles(tiles[j], this.options.col, this.options.line + j);
    }

    if (this.attachedWidget) {
      this.attachedWidget.render();
    }
  }

  /**
   * Create and attach a widget to this instance of the terminal
   *
   * @param WidgetClass Class of the widget
   * @param options Options for the widget constructor
   * @return Created widget instance attached to the box
   */
  // tslint:disable-next-line:no-any
  public attachWidget<WidgetType extends Widget>(WidgetClass: WidgetConstructor<WidgetType>, options: any): WidgetType {
    const positionOptions = this.getAvailableSpace();

    const newWidgetOptions = {
      ...options,
      ...positionOptions,
    };
    this.attachedWidget = Reflect.construct(WidgetClass, [
      this.terminal,
      newWidgetOptions,
      this,
    ]);

    // this.attachedWidget.render();

    return this.attachedWidget as WidgetType;
  }

  /**
   * Dettach a widget from the container
   *
   * @param widget Widget to dettach
   * @return `true` if the widget was found (and removed). `false` if not found
   */
  public dettachWidget(widget: Widget): boolean {
    if (widget !== this.attachedWidget) {
      return false;
    }

    const oldWidget = this.attachedWidget;
    this.attachedWidget = undefined;

    if (oldWidget) {
      // tslint:disable:no-magic-numbers
      this.terminal.clear(
        this.options.col + 1,
        this.options.line + 1,
        this.options.width - 2,
        this.options.height - 2,
      );
      // tslint:enable:no-magic-numbers
    }

    return true;
  }

  /**
   * Get a previously attached widget by its position
   *
   * @param column column of the terminal
   * @param line line of the terminal
   * @return widget or `undefined` if not found
   */
  public getWidgetAt(column: number, line: number): Widget {
    return (this.attachedWidget && this.attachedWidget.isAt(column, line))
      ? this.attachedWidget
      : undefined;
  }

  /**
   * Get a bidirectional iterator to move across the attached widgets of the container
   *
   * @param startWidget if specified, the next call will start with this widget (return the next or previous one)
   */
  public [Symbol.iterator](startWidget?: Widget | number): BidirectionalIterator<Widget> {
    const widget = this.attachedWidget;
    let index: number;

    const it = {
      next: () => {
        index++;
        if (index > 1) {
          index = 1;
        }

        return {
          value: index === 0 ? widget : undefined,
          done: index !== 0,
        };
      },

      prev: () => {
        index--;
        if (index < -1) {
          index = -1;
        }

        return {
          value: index === 0 ? widget : undefined,
          done: index !== 0,
        };
      },

      seek: (value: Widget | number) => {
        index = typeof value === 'number'
          ? (value < 0 ? 0 - value : value - 1)
          : this.attachedWidget === value ? 0 : -1;
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
   * `setOptions` will assign the options to `this.options`,
   * but any derivated calculation should be done here.
   *
   * @param changedOptions Object with only the changed options
   */
  protected updateOptions(changes: BoxOptions): void {
    if (!isEmpty(changes)) {
      this.optionsFocus = deepAssign(this.optionsFocus, this.options.base, this.options.focus);
      this.optionsDisabled = deepAssign(this.optionsDisabled, this.options.base, this.options.disabled);

      if (this.attachedWidget
        && coalesce(changes.width, changes.height, changes.col, changes.line, changes.padding) !== undefined) {
        this.attachedWidget.setOptions(this.getAvailableSpace());
      }

      this.render();
    }
  }

  /**
   * Assign the proper values to the pool of tiles for the border based on the
   * current status of the widget and the defined options
   */
  private setBorderPool(): void {
    const pool = Box.boxTilesPool;
    const aspectOptions = this.getAspectOptions().boxBorders;

    pool.topLeft.char = aspectOptions.topLeft;
    pool.top.char = aspectOptions.top;
    pool.topRight.char = aspectOptions.topRight;
    pool.left.char = aspectOptions.left;
    pool.center.char = aspectOptions.center;
    pool.right.char = aspectOptions.right;
    pool.bottomLeft.char = aspectOptions.bottomLeft;
    pool.bottom.char = aspectOptions.bottom;
    pool.bottomRight.char = aspectOptions.bottomRight;

    assignCharStyle(pool.topLeft, aspectOptions);
    assignCharStyle(pool.top, aspectOptions);
    assignCharStyle(pool.topRight, aspectOptions);
    assignCharStyle(pool.left, aspectOptions);
    assignCharStyle(pool.center, aspectOptions);
    assignCharStyle(pool.right, aspectOptions);
    assignCharStyle(pool.bottomLeft, aspectOptions);
    assignCharStyle(pool.bottom, aspectOptions);
    assignCharStyle(pool.bottomRight, aspectOptions);
  }

  /**
   * Get the matrix of Tiles composing a complete box.
   * The matrix is created each time, but the Tiles object are reused by a pool
   *
   * @param title Optional title for the box
   */
  private getBoxTiles(title: string): TextTile[][] {
    const tiles = [];
    const pool = Box.boxTilesPool;
    const width = this.options.width;
    const height = this.options.height;
    const aspectOptions = this.getAspectOptions();
    const titleStyle = { ...assignCharStyle({}, aspectOptions.boxTitle) };

    this.setBorderPool();

    // top line
    const top = Array(width);
    top[0] = pool.topLeft;
    top.fill(pool.top, 1, width);
    top[width - 1] = pool.topRight;

    if (title) {
      const titleStart = aspectOptions.boxTitle.marginLeft + 1;
      for (let i = 0; i < title.length; i++) {
        let tile = pool.title[i];

        if (tile) {
          tile.char = title[i];
        } else {
          pool.title[i] = { char: title[i] };
          tile = pool.title[i];
        }

        top[titleStart + i] = tile;
        assignCharStyle(tile, titleStyle);
      }
    }
    tiles[0] = top;

    // center lines
    const center = Array(width);
    center[0] = pool.left;
    center.fill(pool.center, 1, width);
    center[width - 1] = pool.right;
    for (let line = 1; line < height - 1; line++) {
      tiles[line] = center;
    }

    // bottom line
    const bottom = Array(width);
    bottom[0] = pool.bottomLeft;
    bottom.fill(pool.bottom, 1, width);
    bottom[width - 1] = pool.bottomRight;
    tiles[height - 1] = bottom;

    return tiles;
  }

  /**
   * Get the options object depending on the focused state
   */
  private getAspectOptions(): BoxAspectOptions {
    if (!this.options.focusable) {
      return this.optionsDisabled;
    }

    if (this.isFocused()) {
      return this.optionsFocus;
    }

    return this.options.base;
  }

  /**
   * Calculate the available space and the position for the attached widget
   *
   */
  private getAvailableSpace() {
    const boxOptions = this.options;
    const padding = boxOptions.padding;

    // tslint:disable:no-magic-numbers
    const positionOptions = {
      col: boxOptions.col + padding.left + 1,
      line: boxOptions.line + padding.top + 1,
      width: boxOptions.width - padding.left - padding.right - 2,
      height: boxOptions.height - padding.top - padding.bottom - 2,
    };
    // tslint:enable:no-magic-numbers

    return positionOptions;
  }
}

/*
 * Default options for new instances
 */
Box.defaultOptions = {
  padding: {
    top: 1,
    right: 1,
    bottom: 1,
    left: 1,
  },
  base: {
    boxBorders: {
      fg: '#00ff00',
      topLeft: '┌',
      top: '─',
      topRight: '┐',
      left: '│',
      center: ' ',
      right: '│',
      bottomLeft: '└',
      bottom: '─',
      bottomRight: '┘',
    },
    boxTitle: {
      fg: '#00ff00',
      marginLeft: 1,
      marginRight: 1,
      ellipsis: '...',
    },
  },
  focus: {
    boxBorders: { fg: '#ffff00' },
    boxTitle: { fg: '#ffff00' },
  },
  disabled: {
    boxBorders: { fg: '#009900' },
    boxTitle: { fg: '#009900' },
  },
};
