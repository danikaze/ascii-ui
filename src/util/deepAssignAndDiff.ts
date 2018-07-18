import { isObject } from 'vanilla-type-check';

/**
 * Deep assign an object and return just the difference (`{}` if nothing changed)
 */
export function deepAssignAndDiff(...args): object {
  const target = args[0];
  const diff = {};

  for (let i = 1, n = args.length; i < n; i++) {
    const obj = args[i];

    // tslint:disable:forin
    for (const key in obj) {
      const val = obj[key];

      if (isObject(val)) {
        if (!target[key]) {
          target[key] = { ...val };
          diff[key] = target[key];
        } else {
          diff[key] = deepAssignAndDiff(target[key], val);
        }
      } else if (target[key] !== val) {
        diff[key] = val;
        target[key] = obj[key];
      }
    }
  }

  return diff;
}
