/**
 * Check if an object has or not properties
 *
 * @param obj Object to test
 * @return `true` if the object is empty
 */
export function isEmptyObject(obj: object): boolean {
  for (const key in obj) {
    if (obj.hasOwnProperty(key)) {
      return false;
    }
  }

  return true;
}
