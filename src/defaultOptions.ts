import { DebugOptions, TerminalOptions } from './Terminal';

export const defaultOptions: TerminalOptions = {
  tileWidth: 18,
  tileHeight: 28,
  autoRender: true,
  autoSize: true,
  cursor: true,
  cursorFrequency: 700,
  decayTime: 0,
  decayInitialAlpha: 0.7,
  debug: false,
  font: '20pt Terminal_VT220',
  fontOffsetX: 1,
  fontOffsetY: -1,
  fg: '#00ff00',
  bg: '#000000',
  viewport: {
    top: undefined,
    right: undefined,
    bottom: undefined,
    left: undefined,
  },
  avoidDoubleRendering: true,
};

export const defaultDebugOptions: DebugOptions = {
  verbose: true,
  renderGrid: true,
  gridStyle: '#777',
};
