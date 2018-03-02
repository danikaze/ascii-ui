import { CharStyle } from '../Terminal';

export function assignCharStyle(target: CharStyle, source: CharStyle): CharStyle {
  if (source.font) {
    target.font = source.font;
  }
  if (source.fontOffsetX) {
    target.fontOffsetX = source.fontOffsetX;
  }
  if (source.fontOffsetY) {
    target.fontOffsetY = source.fontOffsetY;
  }
  if (source.fg) {
    target.fg = source.fg;
  }
  if (source.bg) {
    target.bg = source.bg;
  }

  return target;
}

export default assignCharStyle;
