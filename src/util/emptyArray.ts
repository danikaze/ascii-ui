/**
 * Empty an array without having to reassign it with `arr = []`.
 * It's faster and preserves the same object pointer
 *
 * @param arr Array to empty
 * @return same, modified array `arr`
 */
export function emptyArray<T>(arr: T[]): T[] {
  while (arr.length > 0) {
    arr.pop();
  }

  return arr;
}
