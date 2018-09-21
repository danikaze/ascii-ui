import { isPlainObject } from 'vanilla-type-check/isPlainObject';

/**
 * Deep assign an object and return just the difference (`{}` if nothing changed)
 */
export function deepAssignAndDiff(...args: any[]): object { // tslint:disable-line:no-any
  const target = args[0];
  const diff: any = {}; // tslint:disable-line:no-any

  for (let i = 1; i < args.length; i++) {
    const obj = args[i];

    Object.keys(obj).forEach((key) => {
      const val = obj[key];

      if (isPlainObject(val)) {
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
    });
  }

  return diff;
}
