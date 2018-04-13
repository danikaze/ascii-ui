/**
 * Clamp a number between two values
 *
 * @param x Number to limit
 * @param min Minimum value allowed (included)
 * @param max Maximum value allowed (included)
 */
export function clamp(x: number, min: number, max: number): number {
  return Math.max(min, Math.min(max, x));
}
