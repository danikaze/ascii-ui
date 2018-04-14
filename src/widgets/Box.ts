import * as isEmptyObject from 'is-empty-object';

import { CharStyle, Terminal, Tile } from '../Terminal';
import { assignCharStyle } from '../util/assignCharStyle';
import { deepAssign } from '../util/deepAssign';
import { Widget, WidgetOptions } from '../Widget';
import { WidgetContainer } from '../WidgetContainer';

import { boxBorderDefaultOptions, boxDefaultOptions } from './defaultOptions';

export interface BoxBorderOptions extends CharStyle {
  topLeft: string;
  top: string;
  topRight: string;
  left: string;
  center: string;
  right: string;
  bottomLeft: string;
  bottom: string;
  bottomRight: string;
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

export interface BoxOptions extends WidgetOptions {
  /** Title to display at the top of the box */
  title?: string;
  /** Options related to the title, if used */
  boxTitle?: BoxTitleOptions;
  /** Options related to the border of the box */
  boxBorders?: BoxBorderOptions;
  /** Number of blank tiles to leave between the border and the attached widget */
  padding?: BoxPaddingOptions;
}

interface BoxPoolTiles {
  title: Tile[];
  topLeft: Tile;
  top: Tile;
  topRight: Tile;
  left: Tile;
  center: Tile;
  right: Tile;
  bottomLeft: Tile;
  bottom: Tile;
  bottomRight: Tile;
}

/**
 * Very basic `WidgetContainer` which draws a box around the attached content.
 * It allows only one children inside the box (which can be a Grid or any other container)
 */
export class Box extends Widget implements WidgetContainer {
  /** Pool of Tiles to avoid creating always new objects */
  private static readonly boxTilesPool: BoxPoolTiles = {
    title: [],
    topLeft: { char: boxBorderDefaultOptions.topLeft },
    top: { char: boxBorderDefaultOptions.top },
    topRight: { char: boxBorderDefaultOptions.topRight },
    left: { char: boxBorderDefaultOptions.left },
    center: { char: boxBorderDefaultOptions.center },
    right: { char: boxBorderDefaultOptions.right },
    bottomLeft: { char: boxBorderDefaultOptions.bottomLeft },
    bottom: { char: boxBorderDefaultOptions.bottom },
    bottomRight: { char: boxBorderDefaultOptions.bottomRight },
  };

  /** Extended options */
  protected readonly options: BoxOptions;

  /** Attached widget if any */
  private attachedWidget: Widget;

  constructor(terminal: Terminal, options: BoxOptions) {
    super(terminal, deepAssign({}, boxDefaultOptions, options));
  }

  /**
   * Render the widget in the associated terminal
   */
  render(): void {
    if (!this.allocated) {
      return;
    }

    let title = this.options.title;
    const boxTitle = this.options.boxTitle;
    // tslint:disable-next-line:no-magic-numbers (2 is because of the corners)
    const titleMaxLength = this.options.width - boxTitle.marginLeft - boxTitle.marginRight - 2;

    if (title && title.length > titleMaxLength) {
      title = (`${title.substr(0, titleMaxLength - boxTitle.ellipsis.length)}`
        + `${this.options.boxTitle.ellipsis}`).substr(0, titleMaxLength);
    }

    const tiles = this.getBoxTiles(title);
    for (let j = 0; j < tiles.length; j++) {
      this.terminal.setTiles(tiles[j], this.options.col, this.options.line + j);
    }

    if (this.attachedWidget) {
      this.attachedWidget.render();
    }
  }

  /**
   * Attach a specified widget to this box
   *
   * @param widget instance of the widget to attach
   * @return provided widget instance itself
   */
  attachWidget(widget: Widget): Widget;

  /**
   * Create and attach a widget to this instance of the terminal
   *
   * @param WidgetClass Class of the widget
   * @param options Options for the widget constructor
   * @return Created widget instance attached to the box
   */
  attachWidget(WidgetClass: typeof Widget, options, ...args): Widget;

  attachWidget(WidgetClass, options?, ...args): Widget {
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

    if (typeof WidgetClass === 'function') {
      const newWidgetOptions = {
        ...options,
        ...positionOptions,
      };
      this.attachedWidget = Reflect.construct(WidgetClass, [this.terminal, newWidgetOptions, ...args]);
    } else {
      this.attachedWidget = WidgetClass;
      this.attachedWidget.setOptions(positionOptions);
    }

    this.attachedWidget.render();

    return this.attachedWidget;
  }

  /**
   * Dettach a widget from the container
   *
   * @param widget Widget to dettach
   * @return `true` if the widget was found (and removed). `false` if not found
   */
  dettachWidget(widget: Widget): boolean {
    if (widget !== this.attachedWidget) {
      return false;
    }

    widget = this.attachedWidget;
    this.attachedWidget = undefined;

    if (widget) {
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
  getWidgetAt(column: number, line: number): Widget {
    return (this.attachedWidget && this.attachedWidget.isAt(column, line))
      ? this.attachedWidget
      : undefined;
  }

  /**
   * `setOptions` will assign the options to `this.options`,
   * but any derivated calculation should be done here.
   *
   * @param changedOptions Object with only the changed options
   */
  protected updateOptions(changes: BoxOptions): void {
    if (!isEmptyObject(changes)) {
      this.render();
    }
  }

  /**
   * Get the matrix of Tiles composing a complete box.
   * The matrix is created each time, but the Tiles object are reused by a pool
   *
   * @param width
   * @param height
   * @param title
   */
  private getBoxTiles(title: string): Tile[][] {
    const tiles = [];
    const pool = Box.boxTilesPool;
    const width = this.options.width;
    const height = this.options.height;
    const titleStyle = { ...assignCharStyle({}, this.options.boxTitle) };

    // top line
    const top = Array(width);
    top[0] = pool.topLeft;
    top.fill(pool.top, 1, width);
    top[width - 1] = pool.topRight;

    if (title) {
      const titleStart = this.options.boxTitle.marginLeft + 1;
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
}
