import { isArray } from 'emnida/type';

export function initArrayByTypeCheck(v) {
  return isArray(v) ? v : [];
}

// https://developer.mozilla.org/ko/docs/Web/JavaScript/Reference/Global_Objects/Array/from
export function _from(...args) {
  if (Array.from) {
    return Array.from(...args);
  } else {
    const toStr = Object.prototype.toString;
    const isCallable = fn => {
      return typeof fn === 'function' || toStr.call(fn) === '[object Function]';
    };
    const toInteger = value => {
      const number = Number(value);
      if (isNaN(number)) {
        return 0;
      }
      if (number === 0 || !isFinite(number)) {
        return number;
      }
      return (number > 0 ? 1 : -1) * Math.floor(Math.abs(number));
    };
    const maxSafeInteger = Math.pow(2, 53) - 1;
    const toLength = value => {
      const len = toInteger(value);
      return Math.min(Math.max(len, 0), maxSafeInteger);
    };

    // The length property of the from method is 1.
    return ((arrayLike /*, mapFn, thisArg */) => {
      // 1. Let C be the this value.
      const C = this;

      // 2. Let items be ToObject(arrayLike).
      const items = Object(arrayLike);

      // 3. ReturnIfAbrupt(items).
      if (arrayLike == null) {
        throw new TypeError('Array.from requires an array-like object - not null or undefined');
      }

      // 4. If mapfn is undefined, then let mapping be false.
      const mapFn = args.length > 1 ? args[1] : void undefined;
      let T;
      if (typeof mapFn !== 'undefined') {
        // 5. else
        // 5. a If IsCallable(mapfn) is false, throw a TypeError exception.
        if (!isCallable(mapFn)) {
          throw new TypeError('Array.from: when provided, the second argument must be a function');
        }

        // 5. b. If thisArg was supplied, let T be thisArg; else let T be undefined.
        if (args.length > 2) {
          T = args[2];
        }
      }

      // 10. Let lenValue be Get(items, "length").
      // 11. Let len be ToLength(lenValue).
      const len = toLength(items.length);

      // 13. If IsConstructor(C) is true, then
      // 13. a. Let A be the result of calling the [[Construct]] internal method
      // of C with an argument list containing the single item len.
      // 14. a. Else, Let A be ArrayCreate(len).
      const A = isCallable(C) ? Object(new C(len)) : new Array(len);

      // 16. Let k be 0.
      let k = 0;
      // 17. Repeat, while k < len… (also steps a - h)
      let kValue;
      while (k < len) {
        kValue = items[k];
        if (mapFn) {
          A[k] = typeof T === 'undefined' ? mapFn(kValue, k) : mapFn.call(T, kValue, k);
        } else {
          A[k] = kValue;
        }
        k += 1;
      }
      // 18. Let putStatus be Put(A, "length", len, true).
      A.length = len;
      // 20. Return A.
      return A;
    })(...args);
  }
}

export function _of(...args) {
  if (Array.of) {
    return Array.of(...args);
  } else {
    return Array.prototype.slice.call(...args);
  }
}

// https://developer.mozilla.org/ko/docs/Web/JavaScript/Reference/Global_Objects/Array/copyWithin
export function _copyWithin(...args) {
  const v = initArrayByTypeCheck(args[0]);

  if (Array.prototype.copyWithin) {
    return v.copyWithin(...args);
  } else {
    return ((target, start) => {
      const O = Object(v);

      // Steps 3-5.
      const len = O.length >>> 0;

      // Steps 6-8.
      const relativeTarget = target >> 0;

      let to = relativeTarget < 0 ? Math.max(len + relativeTarget, 0) : Math.min(relativeTarget, len);

      // Steps 9-11.
      const relativeStart = start >> 0;

      let from = relativeStart < 0 ? Math.max(len + relativeStart, 0) : Math.min(relativeStart, len);

      // Steps 12-14.
      const end = args[2];
      const relativeEnd = end === undefined ? len : end >> 0;

      const final = relativeEnd < 0 ? Math.max(len + relativeEnd, 0) : Math.min(relativeEnd, len);

      // Step 15.
      let count = Math.min(final - from, len - to);

      // Steps 16-17.
      let direction = 1;

      if (from < to && to < from + count) {
        direction = -1;
        from += count - 1;
        to += count - 1;
      }

      // Step 18.
      while (count > 0) {
        if (from in O) {
          O[to] = O[from];
        } else {
          delete O[to];
        }

        from += direction;
        to += direction;
        count--;
      }

      // Step 19.
      return O;
    })(...args);
  }
}

// https://developer.mozilla.org/ko/docs/Web/JavaScript/Reference/Global_Objects/Object/entries
export function _entries(...args) {
  if (Object.entries) {
    return Object.entries(...args);
  } else {
    return (obj => {
      const ownProps = Object.keys(obj);
      let i = ownProps.length;
      const resArray = new Array(i); // preallocate the Array
      while (i--) {
        resArray[i] = [ownProps[i], obj[ownProps[i]]];

        return resArray;
      }
    })(...args);
  }
}

// https://developer.mozilla.org/ko/docs/Web/JavaScript/Reference/Global_Objects/Array/fill
export function _fill(...args) {
  const v = initArrayByTypeCheck(args[0]);

  if (Array.prototype.fill) {
    return v.fill(...args);
  } else {
    return (value => {
      const O = Object(v);

      // Steps 3-5.
      const len = O.length >>> 0;

      // Steps 6-7.
      const start = args[1];
      const relativeStart = start >> 0;

      // Step 8.
      let k = relativeStart < 0 ? Math.max(len + relativeStart, 0) : Math.min(relativeStart, len);

      // Steps 9-10.
      const end = args[2];
      const relativeEnd = end === undefined ? len : end >> 0;

      // Step 11.
      const final = relativeEnd < 0 ? Math.max(len + relativeEnd, 0) : Math.min(relativeEnd, len);

      // Step 12.
      while (k < final) {
        O[k] = value;
        k++;
      }

      // Step 13.
      return O;
    })(...args);
  }
}

// https://tc39.github.io/ecma262/#sec-array.prototype.find
export function _find(...args) {
  const v = initArrayByTypeCheck(args[0]);

  if (Array.prototype.find) {
    return v.find(...args);
  } else {
    return (predicate => {
      const o = Object(v);

      // 2. Let len be ? ToLength(? Get(O, "length")).
      const len = o.length >>> 0;

      // 3. If IsCallable(predicate) is false, throw a TypeError exception.
      if (typeof predicate !== 'function') {
        throw new TypeError('predicate must be a function');
      }

      // 4. If thisArg was supplied, let T be thisArg; else let T be undefined.
      const thisArg = args[1];

      // 5. Let k be 0.
      let k = 0;

      // 6. Repeat, while k < len
      while (k < len) {
        // a. Let Pk be ! ToString(k).
        // b. Let kValue be ? Get(O, Pk).
        // c. Let testResult be ToBoolean(? Call(predicate, T, « kValue, k, O »)).
        // d. If testResult is true, return kValue.
        const kValue = o[k];
        if (predicate.call(thisArg, kValue, k, o)) {
          return kValue;
        }
        // e. Increase k by 1.
        k++;
      }

      // 7. Return undefined.
      return undefined;
    })(...args);
  }
}

// https://developer.mozilla.org/ko/docs/Web/JavaScript/Reference/Global_Objects/Array/findIndex
export function _findIndex(...args) {
  const v = initArrayByTypeCheck(args[0]);

  if (Array.prototype.findIndex) {
    return v.findIndex(...args);
  } else {
    return (predicate => {
      'use strict';
      if (typeof predicate !== 'function') {
        throw new TypeError('predicate must be a function');
      }

      const list = Object(v);
      const length = list.length >>> 0;
      const thisArg = args[1];
      let value;

      for (let i = 0; i < length; i++) {
        value = list[i];
        if (predicate.call(thisArg, value, i, list)) {
          return i;
        }
      }
      return -1;
    })(...args);
  }
}

// https://developer.mozilla.org/ko/docs/Web/JavaScript/Reference/Global_Objects/Array/flat
export function _flat(...args) {
  if (Array.prototype.flat) {
    const v = initArrayByTypeCheck(args[0]);

    return v.flat(...args.slice(1));
  } else {
    return (function flatDeep(arr, d = 1) {
      return d > 0
        ? arr.reduce((acc, val) => acc.concat(Array.isArray(val) ? flatDeep(val, d - 1) : val), [])
        : arr.slice();
    })(...args);
  }
}

// https://developer.mozilla.org/ko/docs/Web/JavaScript/Reference/Global_Objects/Array/flatMap
export function _flatMap(...args) {
  if (Array.prototype.flatMap) {
    const v = initArrayByTypeCheck(args[0]);

    return v.flatMap(...args.slice(1));
  } else {
    return ((arr, f, _this) => {
      const _f = f?.bind(_this);
      return arr.reduce((acc, vv) => acc.concat(_f?.(vv)), []);
    })(...args);
  }
}

// https://tc39.github.io/ecma262/#sec-array.prototype.includes
export function _includes(...args) {
  const v = initArrayByTypeCheck(args[0]);

  if (Array.prototype.includes) {
    return v.includes(...args);
  } else {
    return ((searchElement, fromIndex) => {
      // 1. Let O be ? ToObject(this value).
      const o = Object(v);

      // 2. Let len be ? ToLength(? Get(O, "length")).
      const len = o.length >>> 0;

      // 3. If len is 0, return false.
      if (len === 0) {
        return false;
      }

      // 4. Let n be ? ToInteger(fromIndex).
      //    (If fromIndex is undefined, this step produces the value 0.)
      const n = fromIndex | 0;

      // 5. If n ≥ 0, then
      //  a. Let k be n.
      // 6. Else n < 0,
      //  a. Let k be len + n.
      //  b. If k < 0, let k be 0.
      let k = Math.max(n >= 0 ? n : len - Math.abs(n), 0);

      function sameValueZero(x, y) {
        return x === y || (typeof x === 'number' && typeof y === 'number' && isNaN(x) && isNaN(y));
      }

      // 7. Repeat, while k < len
      while (k < len) {
        // a. Let elementK be the result of ? Get(O, ! ToString(k)).
        // b. If SameValueZero(searchElement, elementK) is true, return true.
        if (sameValueZero(o[k], searchElement)) {
          return true;
        }
        // c. Increase k by 1.
        k++;
      }

      // 8. Return false
      return false;
    })(...args);
  }
}
