import { defaultOptions } from './defaultOptions';

export interface Options {
  tileWidth?: number;
  tileHeight?: number;
  columns?: number;
  lines?: number;
  font?: string;
}

interface Tile {
  char: string;
  style: string;
  bg: string;
  fg: string;
}

interface Buffer {
  columns: number;
  lines: number;
  tiles: Tile[][];
}

/**
 * Offers terminal features into a Canvas object
 */
export class Terminal {
  private canvas: HTMLCanvasElement;
  private ctx: CanvasRenderingContext2D;
  private options: Options;
  private buffers: Buffer[];
  private activeBuffer: number;

  constructor(canvas: HTMLCanvasElement, options?: Options) {
    this.canvas = canvas;
    this.ctx = canvas.getContext('2d');
    this.options = Object.assign({}, defaultOptions, options);
    this.ctx.fillStyle = 'blue';
    this.ctx.fillRect(0, 0, this.canvas.width, this.canvas.height);
  }
}
