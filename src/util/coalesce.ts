/**
 * Find the first not undefined/null value of the parameter list
 *
 * @param   args List of values to check in order
 * @returns      First not `undefined`/`null` value, or `undefined` if no one is found.
 */
// tslint:disable-next-line:no-any
export function coalesce(...args: any[]): any {
  let i;

  for (i = 0; i < args.length; i++) {
    if (args[i] != undefined) { // tslint:disable-line:triple-equals
      return args[i];
    }
  }

  return undefined;
}
