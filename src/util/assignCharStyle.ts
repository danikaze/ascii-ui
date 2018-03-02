import { CharStyle } from '../Terminal';

/**
 * Copy the `CharStyle` properties of `source` into `target`.
 * Properties will be copied only if defined, and others will be ignored as well
 *
 * @param target object to be modified
 * @param source data source
 * @returns `target`
 */
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
