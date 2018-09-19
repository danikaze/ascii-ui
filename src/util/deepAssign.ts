import { isPlainObject } from 'vanilla-type-check/isPlainObject';

/**
 * Deep assign an object
 */
// tslint:disable-next-line:no-any
export function deepAssign(...args: any[]) {
  const target = args[0] || {};

  for (let i = 1; i < args.length; i++) {
    const obj = args[i];

    Object.keys(obj).forEach((key) => {
      const val = obj[key];

      if (isPlainObject(val)) {
        if (!target[key]) {
          target[key] = { ...val };
        } else {
          deepAssign(target[key], val);
        }
      } else if (target[key] !== val) {
        target[key] = obj[key];
      }
    });
  }

  return target;
}
