import { type } from 'emnida';
import { _from, bindToFunction } from './polyfill';

const { isNull, isFunction, isString, isArrayLikeObject, isIterableObject, isMap, isEmpty, isObject } = type;

export function getGlobalObject() {
  try {
    return window;
  } catch (e) {
    return global;
  }
}

/**
 * This function converts given iterable object to a array object
 * @param {Iterable} v Iterable object
 * @param {function} callback Function which will be call on every element of iterable object
 * @param {*} _this Value which will be used as this context when executing given function
 * @returns {Array}
 * @example
 * toArray([1, 2, 3], function(v) { return { v, vv: this }; }, { x: 1 });
 */
export function toArray(v, callback, _this) {
  const _callback = bindToFunction(callback, _this, function(v, k) {
    return { k, v };
  });

  const arr = [];

  switch (true) {
    // array like object(String, Array, arguments ...), iterable object(Map, Set, Generator iterator ...)
    case isArrayLikeObject(v) || isIterableObject(v): {
      if (isMap(v)) {
        for (const vv of v) {
          const [k, _vv] = vv;
          arr.push(_callback(_vv, k));
        }
        return arr;
      }
      return _from(v, callback, _this);
    }
    default: {
      if (!isEmpty(v)) {
        // extra object
        return Object.keys(v).reduce((acc, k) => {
          acc.push(_callback(v[k], k));
          return acc;
        }, arr);
      }
      return arr;
    }
  }
}

export function toNumber(v) {
  const nv = Number(v);

  if (isFinite(nv)) {
    return nv;
  }

  if (isString(v)) {
    const arr = _from(v);
    let ret = 0;

    arr.forEach(vv => {
      ret += vv.charCodeAt(0);
    });

    return ret;
  }
  return 0;
}

export function splice(v, ...args) {
  const arr = toArray(v);
  arr.splice(...args);

  return arr;
}

export function ascOperator(v1, v2) {
  return toNumber(v1) - toNumber(v2);
}

export function descOperator(v1, v2) {
  return toNumber(v2) - toNumber(v1);
}

export function deepTruly(v, { fAtNotObject = () => {}, fAtObject = () => {} }) {
  const stacks = [{ v }];

  let stack;
  while ((stack = stacks.shift())) {
    const { container, k, v } = stack;

    switch (true) {
      // null is object
      case (!isObject(v) && !isFunction(v)) || isNull(v): {
        // Maybe it will be most of primitive type
        if (fAtNotObject(v, k, container)) {
          return true;
        }
        break;
      }
      default: {
        if (fAtObject(v, k, container)) {
          return true;
        }

        toArray(v, (vv, kk) => {
          stacks.push({ container: v, k: kk, v: vv });
        });
        break;
      }
    }
  }
  return false;
}
