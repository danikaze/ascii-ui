import { DebugOptions, Options } from './Terminal';

export const defaultOptions: Options = {
  tileWidth: 18,
  tileHeight: 28,
  columns: 40,
  lines: 25,
  font: '20pt Terminal_VT220',
  fg: '#00ff00',
  bg: '#000000',
  autoRender: true,
  autoSize: true,
  cursor: true,
  cursorFrequency: 700,
  debug: false,
};

export const defaultDebugOptions: DebugOptions = {
  verbose: true,
  renderGrid: true,
  gridStyle: '#777',
};
