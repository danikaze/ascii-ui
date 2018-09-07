import { isArray } from 'vanilla-type-check/isArray';
import { isPlainObject } from 'vanilla-type-check/isPlainObject';

export interface GenericObject { [key: string]: any; } // tslint:disable-line:no-any
export type GenericArray = any[]; // tslint:disable-line:no-any

export interface ReferencedObject {
  parent: GenericObject;
  name: string;
}

export interface TraverseOptions {
  /**
   * If `options.reference` is `true`, it will return a `ReferencedObject`.
   * By default `false`, returning the found value after the traverse
   */
  reference?: boolean;
  /**
   * Create is `false` by default. If some part of the route is not defined,
   * instead of throwing an error, it will return `undefined` when traversing it.
   * If this option is set to `true`, it will create the _missing_ parts instead.
   */
  create?: boolean;
}

/**
 * Traverse an object to access a property
 *
 * @param object Object to traverse
 * @param route Route to traverse
 * @param options If `options.reference` is `true`, it will return a `ReferencedObject`.
 *                By default `false`, returning the found value after the traverse
 *                If some part of the route is not defined, instead of throwing an error, it will return `undefined`
 *
 * @example
 * const object = {
 *   n: 1,
 *   a: ['x', 'y', 'z'],
 *   o: {
 *     n: 2,
 *     p: {
 *       n: 3,
 *       t: 'abc',
 *     },
 *   },
 * };
 *
 * traverseObject(object, 'n'); // 1
 * traverseObject(object, 'o.n'); // 2
 * traverseObject(object, 'o.z'); // undefined
 * traverseObject(object, 'o.z.n'); // undefined
 * traverseObject(object, 'o.p.n'); // 3
 * traverseObject(object, 'o.p.z.t'); // 'abc'
 * traverseObject(object, 'o.p.q.r.s.t'); // undefined
 * traverseObject(object, 'o.a.2'); // 'z'
 *
 * traverseObject(object, 'o.n', { reference: true }); // { parent: o, name: 'n' }
 *
 * traverseObject(object, 'o.z.x', { create: true }); // undefined, but object.o.z now exists and is {}
 */
export function traverseObject(object: GenericObject | GenericArray, route: string,
                               options?: TraverseOptions): any | ReferencedObject { // tslint:disable-line:no-any
  const path = route.split('.');
  const create = options && options.create;
  let current = object;
  let parent = object;
  let name = '';

  try {
    for (let i = 0; i < path.length - 1; i++) {
      name = path[i];
      if (create && typeof (current as GenericObject)[name] === 'undefined') {
        (current as GenericObject)[name] = {};
      }
      parent = current;
      current = (current as GenericObject)[name];
    }

    name = path[path.length - 1];
    parent = current;

    return options && options.reference ? {
      parent,
      name,
    } : (parent as GenericObject)[name];
  } catch (e) {
    return undefined;
  }
}

/**
 * Create a new object with the data at the end of the specified route
 *
 * @param route route to create
 * @param data data to set in the specified route
 * @return new object with the data at the end of the specified route
 *
 * @example
 * createObjectFromRoute('a.b.c', 123);
 * // { a: { b: { c: 123 } } }
 */
// tslint:disable-next-line:no-any
export function createObjectFromRoute(route: string, data: any): object {
  const obj = {};
  const ref = traverseObject(obj, route, { create: true, reference: true });

  ref.parent[ref.name] = data;

  return obj;
}

/**
 * Find the route to access `data` in `object`.
 * Note that if there's more than one ocurrence of `data` in `object`,
 * it will return only one of them unless `all` is `true`,
 * in which case it will return an array of routes (or `undefined` if not found)
 *
 * @param object Object where to search for `data`
 * @param data Data to find
 * @return Route until `data` or `undefined` if not found
 *
 * @example
 * getRouteFromObject({ a: 1, b: { c : 2 }}, 2); // 'b.c'
 * getRouteFromObject({ a: 1, b: { c : 1 }}, 1, true); // ['a', b.c']
 * getRouteFromObject({ a: 1, b: { c : 2 }}, 3); // undefined
 * getRouteFromObject({ a: 1, b: { c : 2 }}, 3, true); // undefined
 */
// tslint:disable-next-line:no-any
export function getRouteFromObject(object: any, data: any, all: boolean = false): string | string[] {
  if (object === data) {
    return undefined;
  }

  return internalGetRouteFromObject(object, data, '', all ? [] : undefined);
}

/**
 * Internal (recursive) implementation for `getRouteFromObject`
 */
// tslint:disable-next-line:no-any
function internalGetRouteFromObject(object: any, data: any, currentRoute: string,
                                    multiRes: string[]): string | string[] {
  if (object === data) {
    if (!multiRes) {
      return currentRoute;
    }
    multiRes.push(currentRoute);
  }

  if (isPlainObject(object)) {
    // tslint:disable-next-line:forin
    for (const key in object) {
      const nextRoute = currentRoute ? `${currentRoute}.${key}` : key;
      const res = internalGetRouteFromObject(object[key], data, nextRoute, multiRes);
      if (!multiRes && res) {
        return res;
      }
    }
  } else if (isArray(object)) {
    for (let i = 0; i < object.length; i++) {
      const nextRoute = currentRoute ? `${currentRoute}.${i}` : `${i}`;
      const res = internalGetRouteFromObject(object[i], data, nextRoute, multiRes);
      if (!multiRes && res) {
        return res;
      }
    }
  }

  return multiRes && multiRes.length > 0 ? multiRes : undefined;
}
