import { isObject } from 'vanilla-type-check';

/**
 * Deep assign an object
 */
export function deepAssign(...args) {
  const target = args[0] || {};

  for (let i = 1, n = args.length; i < n; i++) {
    const obj = args[i];

    // tslint:disable:forin
    for (const key in obj) {
      const val = obj[key];

      if (isObject(val)) {
        if (!target[key]) {
          target[key] = { ...val };
        } else {
          deepAssign(target[key], val);
        }
      } else if (target[key] !== val) {
        target[key] = obj[key];
      }
    }
  }

  return target;
}
