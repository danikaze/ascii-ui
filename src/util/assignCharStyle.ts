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
  if (source) {
    if (source.font) {
      target.font = source.font;
    }
    if (source.offsetX) {
      target.offsetX = source.offsetX;
    }
    if (source.offsetY) {
      target.offsetY = source.offsetY;
    }
    if (source.fg) {
      target.fg = source.fg;
    }
    if (source.bg) {
      target.bg = source.bg;
    }
  }

  return target;
}
