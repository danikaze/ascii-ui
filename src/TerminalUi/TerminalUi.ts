/* tslint:disable:typedef */
import { CharStyle, Terminal, TerminalOptions, Tile } from '../Terminal';
import { assignCharStyle } from '../util/assignCharStyle';

import { boxBorderDefaultOptions, boxTitleDefaultOptions } from './defaultValues';

export interface BoxBorderOptions {
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
  marginLeft?: number;
  marginRight?: number;
  /** String to use when the title doesn't fit in the box */
  ellipsis?: string;
}

export interface TerminalUiBoxOptions extends TerminalOptions {
  boxTitle?: BoxTitleOptions;
  boxBorders?: BoxBorderOptions;
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

/** Extend the basic Terminal with functionality to render boxes */
export class TerminalUiBox extends Terminal {
  /** Extended options */
  protected readonly options: TerminalUiBoxOptions;
  /** Pool of Tiles to avoid creating always new objects */
  private readonly boxTilesPool: BoxPoolTiles;

  /** Same constructor as `Terminal` but accepting `TerminalUiBoxOptions` */
  constructor(canvas: HTMLCanvasElement, options?: TerminalUiBoxOptions) {
    super(canvas, options);

    this.options.boxTitle = { ...boxTitleDefaultOptions, ...options.boxTitle };
    this.options.boxBorders = { ...boxBorderDefaultOptions, ...options.boxBorders };

    const boxBorders = this.options.boxBorders;
    this.boxTilesPool = {
      title: [],
      topLeft: { char: boxBorders.topLeft },
      top: { char: boxBorders.top },
      topRight: { char: boxBorders.topRight },
      left: { char: boxBorders.left },
      center: { char: boxBorders.center },
      right: { char: boxBorders.right },
      bottomLeft: { char: boxBorders.bottomLeft },
      bottom: { char: boxBorders.bottom },
      bottomRight: { char: boxBorders.bottomRight },
    };
  }

  /**
   * Draw a box in the specified position with the specified size, and optional title
   *
   * @param col
   * @param line
   * @param width
   * @param height
   * @param title
   */
  drawBox(col: number, line: number, width: number, height: number, title?: string): void {
    // save the original status and set the optimal one
    const originalStatus = Object.assign(this.getTextStyle(), {
      autoRender: this.options.autoRender,
      cursor: this.options.cursor,
    });
    const cursorPosition = this.getCursor();
    this.setOptions({
      autoRender: false,
      cursor: false,
    });

    const boxTitle = this.options.boxTitle;
    // tslint:disable:no-magic-numbers (2 is because of the corners)
    const titleMaxLength = width - boxTitle.marginLeft - boxTitle.marginRight - 2;
    const horizontalMaxRepeat = width - 2;
    // tslint:enable:no-magic-numbers

    if (title && title.length > titleMaxLength) {
      title = (`${title.substr(0, titleMaxLength - boxTitle.ellipsis.length)}`
        + `${this.options.boxTitle.ellipsis}`).substr(0, titleMaxLength);
    }

    const tiles = this.getBoxTiles(width, height, title);
    for (let j = 0; j < tiles.length; j++) {
      this.setTiles(tiles[j], col, line + j);
    }

    // restore original status
    this.setCursor(cursorPosition.col, cursorPosition.line);
    if (originalStatus.autoRender) {
      this.render();
    }
    this.setOptions(originalStatus);
  }

  /**
   * Get the matrix of Tiles composing a complete box.
   * The matrix is created each time, but the Tiles object are reused by a pool
   *
   * @param width
   * @param height
   * @param title
   */
  private getBoxTiles(width: number, height: number, title?: string): Tile[][] {
    const tiles = [];
    const pool = this.boxTilesPool;

    // top line
    const top = Array(width);
    top[0] = pool.topLeft;
    top.fill(pool.top, 1, width);
    top[width - 1] = pool.topRight;

    if (title) {
      const currentTitleLength = pool.title.length;
      const titleStart = this.options.boxTitle.marginLeft + 1;
      for (let i = 0; i < title.length; i++) {
        if (i >= currentTitleLength) {
          pool.title[i] = { char: title[i] };
        } else {
          pool.title[i].char = title[i];
        }
        top[i + titleStart] = pool.title[i];
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

    this.styleBoxTiles();

    return tiles;
  }

  private styleBoxTiles(): void {
    const pool = this.boxTilesPool;
    const style = { ...assignCharStyle({}, this.options.boxTitle) };

    for (const tile of pool.title) {
      assignCharStyle(tile, style);
    }
  }
}

export default TerminalUiBox;
