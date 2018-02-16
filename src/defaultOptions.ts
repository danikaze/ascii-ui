import { DebugOptions, Options } from './Terminal';

export const defaultOptions: Options = {
  tileWidth: 18,
  tileHeight: 28,
  columns: 40,
  lines: 25,
  font: '20pt Terminal_VT220',
  autoRender: true,
  autoSize: true,
  cursor: true,
  cursorFrequency: 700,
  debug: false,
  defaultTile: {
    char: ' ',
    style: '',
    bg: '#000000',
    fg: '#00ff00',
  },
};

export const defaultDebugOptions: DebugOptions = {
  verbose: true,
  renderGrid: true,
  gridStyle: '#777',
};
