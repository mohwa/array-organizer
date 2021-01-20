import { type } from 'emnida';
import { _from, bindToFunction } from './polyfill';

const {
  isNull,
  isFunction,
  isString,
  isArrayLikeObject,
  isIterableObject,
  isMap,
  isSet,
  isEmpty,
  isObject,
  isPlainObject,
} = type;

// export function getGlobalObject() {
//   try {
//     return window;
//   } catch (e) {
//     return global;
//   }
// }

export function forEach(v, callback, _this) {
  const _callback = bindToFunction(callback, _this, v => v);

  switch (true) {
    // array like object(String, Array, arguments ...), iterable object(Map, Set, Generator iterator ...)
    // If IE 11 browser, it supported Map object and Set object so i added isMap() and isSet() to in below condition
    case isArrayLikeObject(v) || isMap(v) || isSet(v) || isIterableObject(v): {
      switch (true) {
        case isMap(v): {
          v.forEach((vv, k) => {
            _callback(vv, k);
          });
          break;
        }
        case isSet(v): {
          v.forEach((vv, k) => {
            _callback(vv, k);
          });
          break;
        }
        default: {
          _from(v, callback, _this);
        }
      }
      break;
    }
    default: {
      if (!isEmpty(v)) {
        Object.keys(v).forEach(k => {
          _callback(v[k], k);
        });
      }
      break;
    }
  }
}

export function toArray(v, callback, _this) {
  const _callback = bindToFunction(callback, _this, v => v);
  const _mapCallback = bindToFunction(callback, _this, (v, k) => ({ k, v }));

  const arr = [];

  if (isMap(v) || isPlainObject(v)) {
    forEach(v, (vv, k) => {
      arr.push(_mapCallback(vv, k));
    });
  } else {
    forEach(v, (vv, k) => {
      arr.push(_callback(vv, k));
    });
  }
  return arr;
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

        forEach(v, (vv, kk) => {
          stacks.push({ container: v, k: kk, v: vv });
        });
        break;
      }
    }
  }
  return false;
}
