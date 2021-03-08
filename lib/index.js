import {
  isUndefined,
  isObject,
  isNull,
  isFunction,
  isString,
  isMap,
  isSet,
  isIterableObject,
  isArrayLikeObject,
  isEmpty,
  isPlainObject,
  isJSONObjectString,
} from 'emnida';
import { _of, _copyWithin, _fill, _find, _findIndex, _flat, _flatMap, _from } from './polyfill';
import { bindToFunction } from './_utils';

function splice(v, ...args) {
  const arr = toArray(v);
  arr.splice(...args);

  return arr;
}

function toNumber(v) {
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

function ascOperator(v1, v2) {
  return toNumber(v1) - toNumber(v2);
}

function descOperator(v1, v2) {
  return toNumber(v2) - toNumber(v1);
}

function deepTruly(v, { fAtNotObject = () => {}, fAtObject = () => {} }) {
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

/**
 * Iterable object like string, Array, Map, Set, Generator iterable...
 * @private
 * @typedef {Object} Iterable
 */

/**
 * This function will be call every element of an iterable object or a plain object
 * @param {Iterable|Object} v An iterable object or a plain object
 * @param {function} callback Function which will be call on every element of an iterable object or a plain object
 * @param {*} [context] Value which will be use as context(this) when executed callback function
 * @example
 * forEach('test', (v, k) => console.log(v)); // 't', 'e', 's', 't'
 */
export function forEach(v, callback, context) {
  const _callback = bindToFunction(callback, context, v => v);

  if (isString(v) && isJSONObjectString(v)) {
    v = JSON.parse(v);
  }

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
          _from(v, callback, context);
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

/**
 * This function converts an any value to new an array object
 * @param {*} v An any value
 * @param {function} [callback] Function which will be call on every element of an iterable object or a plain object
 * @param {*} [context] Value which will be use as context(this) when executed callback function
 * @returns {Array}
 * @example
 * toArrayAll(undefined) // [undefined]
 */
export function toArrayAll(v, callback, context) {
  switch (true) {
    case isString(v) && !v.length: {
      return [v];
    }
    case (!isObject(v) && !isString(v)) || isNull(v): {
      return [v];
    }
    default: {
      return toArray(v, callback, context);
    }
  }
}

/**
 * This function converts an iterable object or a plain object to new an array object
 * @param {Iterable|Object} v An iterable object or a plain object
 * @param {function} [callback] Function which will be call on every element of an iterable object or a plain object
 * @param {*} [context] Value which will be use as context(this) when executed callback function
 * @returns {Array}
 * @example
 * toArray({ x: 1, y: 2, z: 3 }); // [{ k: 'x', v: 1 }, { k: 'y', v: 2 }, { k: 'z', v: 3 }]
 */
export function toArray(v, callback, context) {
  const _callback = bindToFunction(callback, context, v => v);
  const _mapCallback = bindToFunction(callback, context, (v, k) => ({ k, v }));

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

/**
 * This function returns new an array object which includes an every arguments
 * @param {*} values Values which will be included
 * @returns {Array}
 * @example
 * of(1, 2, 3, 4); // [1, 2, 3, 4]
 */
export function of(...values) {
  return _of(...values);
}

/**
 * This function returns new an array object which merged as an argument values
 * @param {Iterable|Object} v An iterable object or a plain object
 * @param {*} values Values which will be merged
 * @returns {Array}
 * @example
 * concat({ x: 1, y: 2, z: 3 }, { xx: 1, yy: 2, zz: 3 }, { xxx: 1, yyy: 2, zzz: 3 }) // [{ k: 'x', 1 } ... { k: 'xxx', v: 1 }])
 */
export function concat(v, ...values) {
  let ret = toArray(v);

  values.forEach(vv => {
    if (!isObject(vv) || isNull(vv) || isFunction(vv)) {
      ret = ret.concat([vv]);
    } else {
      ret = ret.concat(toArray(vv));
    }
  });

  return ret;
}

/**
 * This function returns index of found value from an iterable object or a plain object
 * @param {Iterable|Object} v An iterable object or a plain object
 * @param {function} callback Function which will be call on every element of an iterable object or a plain object
 * @param {number} [fromIndex=0] Start index which will be search
 * @returns {number}
 * @example
 * indexOf([1, 2, 3], v => v === 2); // 1
 */
export function indexOf(v, callback, fromIndex) {
  const _callback = bindToFunction(callback, null, v => v);
  const _v = toArray(v);
  let _fromIndex = toNumber(fromIndex);

  if (_fromIndex < 0) {
    _fromIndex = 0;
  }

  for (let i = _fromIndex; i < _v.length; i++) {
    const vv = _v[i];

    if (_callback(vv)) {
      return i;
    }
  }
  return -1;
}

/**
 * This function returns index of found value from an iterable object or a plain object
 * @param {Iterable|Object} v An iterable object or a plain object
 * @param {function} callback Function which will be call on every element of an iterable object or a plain object
 * @param {number} [fromIndex=Iterable.length - 1] Start index which will be search from last index
 * @returns {number}
 * @example
 * lastIndexOf([1, 2, 3], v => v === 3); // 2
 */
export function lastIndexOf(v, callback, fromIndex) {
  const _callback = bindToFunction(callback, null, v => v);
  const _v = toArray(v);
  let _fromIndex = toNumber(fromIndex);
  const { length } = _v;

  if (isUndefined(fromIndex) || _fromIndex >= length) {
    _fromIndex = length - 1;
  }

  for (let i = _fromIndex; i >= 0; i--) {
    const vv = _v[i];

    if (_callback(vv)) {
      return i;
    }
  }
  return -1;
}

/**
 * This function returns joined value as a separator from every elements of an iterable object or a plain object
 * @param {Iterable|Object} v An iterable object or a plain object
 * @param {*} separator separate value
 * @returns {string}
 * @example
 * join({ x: 1, y: 2, z: 3 }, '-') // '1-2-3'
 */
export function join(v, separator) {
  return toArray(v, vv => vv).join(separator);
}

/**
 * This function returns index of found value from an iterable object or a plain object
 * @param {Iterable|Object} v An iterable object or a plain object
 * @returns {Array}
 * @example
 * keys([1, , 3]) // [0, 1, 2]
 */
export function keys(v) {
  return toArray(v, (vv, k) => k);
}

/**
 * This function returns index of found value from an iterable object or a plain object
 * @param {Iterable|Object} v An iterable object or a plain object
 * @returns {Array}
 * @example
 * values({ x: 1, y: 2, z: 3 }) // [1, 2, 3]
 */
export function values(v) {
  return toArray(v, vv => vv);
}

/**
 * This function returns new array object which included every elements copied from start index until end index
 * @param {Iterable|Object} v An iterable object or a plain object
 * @param {number} targetIndex Target index which to copied
 * @param {number} [start=0] Start index which to start copying
 * @param {number} [end=Iterable.length] End index which to end copying
 * @returns {Array}
 * @example
 * copyWithin({ x: 1, y: '2', z: 3 }, 0, 1, 2) // [ { k: 'y', v: '2' }, { k: 'y', v: '2' }, { k: 'z', v: 3 } ]
 */
export function copyWithin(v, targetIndex, start, end) {
  return _copyWithin(toArray(v), targetIndex, start, end);
}

/**
 * This function filters given an iterable object or a plain object
 * @param {Iterable|Object} v An iterable object or a plain object
 * @param {function} [callback] Function which will be call on every element of an iterable object or a plain object
 * @param {*} [context] Value which will be use as context(this) when executed callback function
 * @returns {Array}
 * @example
 * filter(['1', 2, 3], v => typeof v === 'number') // [2, 3]
 */
export function filter(v, callback, context) {
  const _v = toArray(v);

  return _v.filter(callback, context);
}

/**
 * This function returns a true when match condition of callback function to every elements of an iterable object or a plain object
 * @param {Iterable|Object} v An iterable object or a plain object
 * @param {function} [callback] Function which will be call on every element of an iterable object or a plain object
 * @param {*} [context] Value which will be use as context(this) when executed callback function
 * @returns {boolean}
 * @example
 * every([1, 2, 3], v => typeof v === 'number') // true
 */
export function every(v, callback, context) {
  const _v = toArray(v);

  return _v.every(callback, context);
}

/**
 * This function returns a true when match condition of callback function to some elements of an iterable object or a plain object
 * @param {Iterable|Object} v An iterable object or a plain object
 * @param {function} [callback] Function which will be call on every element of an iterable object or a plain object
 * @param {*} [context] Value which will be use as context(this) when executed callback function
 * @returns {boolean}
 * @example
 * some(['1', 2, 3], v => typeof v === 'number') // true
 */
export function some(v, callback, context) {
  const _v = toArray(v);

  return _v.some(callback, context);
}

/**
 * This function returns new array object which filled a value from start index until end index
 * @param {Iterable|Object} v An iterable object or a plain object
 * @param {*} vv Value which will be filled
 * @param {number} [start=0] Start index
 * @param {number} [end=Iterable.length] End index
 * @returns {Array}
 * @example
 * fill({ x: 11, y: 22, z: 33 }, 7, 0, 2) // [ 7, 7, { k: 'z', v: 33 } ]
 */
export function fill(v, vv, start, end) {
  return _fill(toArray(v), vv, start, end);
}

/**
 * This function returns a first element found from an iterable object or a plain object
 * @param {Iterable|Object} v An iterable object or a plain object
 * @param {function} callback Function which will be call on every element of an iterable object or a plain object
 * @param {*} [context] Value which will be use as context(this) when executed callback function
 * @returns {*}
 * @example
 * find(['1', 2, 3], v => typeof v === 'number') // 2
 */
export function find(v, callback, context) {
  return _find(toArray(v), callback, context);
}

/**
 * This function returns an index of first element found from an iterable object or a plain object
 * @param {Iterable|Object} v An iterable object or a plain object
 * @param {function} callback Function which will be call on every element of an iterable object or a plain object
 * @param {*} [context] Value which will be use as context(this) when executed callback function
 * @returns {number}
 * @example
 * findIndex(['1', 2, 3], v => typeof v === 'number') // 1
 */
export function findIndex(v, callback, context) {
  return _findIndex(toArray(v), callback, context);
}

/**
 * This function returns a first element found from an iterable object or a plain object
 * @param {Iterable|Object} v An iterable object or a plain object
 * @param {function} callback Function which will be call on every element of an iterable object or a plain object
 * @param {*} [context] Value which will be use as context(this) when executed callback function
 * @returns {Object}
 * @example
 * deepFind([{ x: { xx: { y: 3, z: 'A' } } }], v => typeof v === 'number') // { c: { y: 3, z: 'A' }, k: 'y', v: 3, origin: [{ ... }] }
 */
export function deepFind(v, callback, context) {
  const _callback = bindToFunction(callback, context, () => {});

  let ret;
  const checker = (vv, k, c) => {
    if (_callback(vv, k, c)) {
      ret = { v: vv, k, c, origin: v };
    }
  };

  deepTruly(v, { fAtNotObject: checker });

  return ret;
}

/**
 * This function returns new array object which included all sub-array elements
 * @param {Iterable|Object} v An iterable object or a plain object
 * @param {number} [depth] Depth level specifying how deep a nested array structure should be flattened
 * @returns {Array}
 * @example
 * flat(['1', [2, 3, 4], [5, 6, 2, [8, 9]]], 2) // ['1', 2, 3, 4, 5, 6, 2, 8, 9]
 */
export function flat(v, depth) {
  return _flat(toArray(v), depth);
}

/**
 * This function returns new array object formed by applying a given callback function to each element of an iterable object or a plain object
 * @param {Iterable|Object} v An iterable object or a plain object
 * @param {function} callback Function which will be call on every element of an iterable object or a plain object
 * @param {*} [context] Value which will be use as context(this) when executed callback function
 * @returns {Array}
 * @example
 * flatMap(['1', [2, 3, 4], [5, 6, 7, [8, 9]]], v => v.slice(0)) // ['1', 2, 3, 4, 5, 6, 7, [8, 9]]
 */
export function flatMap(v, callback, context) {
  return _flatMap(toArray(v), callback, context);
}

/**
 * This function returns whether in an array includes certain value and is not
 * @param {Iterable|Object} v An iterable object or a plain object
 * @param {function} callback Target Value which will be search
 * @param {number} [start] Start index which to searching
 * @returns {boolean}
 * @example
 * includes([1, 2, 3], v => v === 2) // true
 */
export function includes(v, callback, start) {
  return indexOf(v, callback, start) > -1;
}

/**
 * This function returns new array object sorted to ascending
 * @param {Iterable|Object} v An iterable object or a plain object
 * @returns {Array}
 * @example
 * asc({ x: 'd', y: null, z: 0xff }) // [null, 'd', 255]
 */
export function asc(v) {
  return toArray(v, vv => vv).sort((v1, v2) => {
    return ascOperator(v1, v2);
  });
}

/**
 * This function returns new array object sorted to descending
 * @param {Iterable|Object} v An iterable object or a plain object
 * @returns {Array}
 * @example
 * desc(['d', true, undefined, 0xff, 'ee', [], 2e4, () => {}, 't', 0]) // [20000, 255, 'ee', 't', 'd', true, Array(0), f (), 0, undefined]
 */
export function desc(v) {
  return toArray(v, vv => vv).sort((v1, v2) => {
    return descOperator(v1, v2);
  });
}

/**
 * This function returns new array object sorted ascending by object key
 * @param {Iterable|Object} v An iterable object or a plain object
 * @param {string} key
 * @returns {Array}
 * @example
 * ascBy([{ x: 1, y: 11 }, { x: 2, y: 22 }, { x: 3, y: 33 }], 'y') // [{ ...y: 11 }, { ...y: 22 }, { ...y: 33 }]
 */
export function ascBy(v, key) {
  return toArray(v, vv => vv).sort((v1, v2) => {
    let _v1 = v1;
    let _v2 = v2;

    if (key) {
      _v1 = deepFind(v1, (v, k) => k === key)?.v;
      _v2 = deepFind(v2, (v, k) => k === key)?.v;
    }
    return ascOperator(_v1, _v2);
  });
}

/**
 * This function returns new array object sorted descending by object key
 * @param {Iterable|Object} v An iterable object or a plain object
 * @param {string} key
 * @returns {Array}
 * @example
 * descBy([{ x: 1, y: 11 }, { x: 2, y: 22 }, { x: 3, y: 33 }], 'y') // [{ ...y: 33 }, { ...y: 22 }, { ...y: 11 }]
 */
export function descBy(v, key) {
  return toArray(v, vv => vv).sort((v1, v2) => {
    let _v1 = v1;
    let _v2 = v2;

    if (key) {
      _v1 = deepFind(v1, (v, k) => k === key)?.v;
      _v2 = deepFind(v2, (v, k) => k === key)?.v;
    }
    return descOperator(_v1, _v2);
  });
}

/**
 * This function inserts a value from first index of an iterable object or a plain object
 * @param {Iterable|Object} v An iterable object or a plain object
 * @param {*} values Values which will be inserted
 * @returns {Array}
 * @example
 * unshift([1, 2, 3], 11, 22, 33) // [ 11, 22, 33, 1, 2, 3 ]
 */
export function unshift(v, ...values) {
  return splice(v, 0, 0, ...values);
}

/**
 * This function inserts a value from last index of an iterable object or a plain object
 * @param {Iterable|Object} v An iterable object or a plain object
 * @param {*} values Values which will be inserted
 * @returns {Array}
 * @example
 * push([1, 2, 3], 11, 22, 33) // [ 1, 2, 3, 11, 22, 33 ]
 */
export function push(v, ...values) {
  const length = toNumber(v?.length);

  return splice(v, length, 0, ...values);
}

/**
 * This function inserts a value from a target index of an iterable object or a plain object
 * @param {Iterable|Object} v An iterable object or a plain object
 * @param {number} targetIndex Target index
 * @param {*} values Values which will be inserted
 * @returns {Array}
 * @example
 * insert([1, 2, 3, 4], 1, 22) // [1, 22, 2, 3, 4]
 */
export function insert(v, targetIndex, ...values) {
  return splice(v, targetIndex, 0, ...values);
}

/**
 * This function replaces from target index value of an iterable object or a plain object to new values
 * @param {Iterable|Object} v An iterable object or a plain object
 * @param {number} targetIndex Target index
 * @param {*} values Values which will be replaced
 * @returns {Array}
 * @example
 * replace([1, 2, 3, 4], 2, 33, 'ADD') // [1, 2, 33, 'ADD', 4]
 */
export function replace(v, targetIndex, ...values) {
  return splice(v, targetIndex, 1, ...values);
}

/**
 * This function removes a value at a target index of an iterable object or a plain object
 * @param {Iterable|Object} v An iterable object or a plain object
 * @param {function} callback Function which will be call on every element of an iterable object or a plain object
 * @param {number} [fromIndex=0] Start index which will be search
 * @returns {Array}
 * @example
 * remove(['1', 2, 3, 4], v => typeof v === 'number'); // ['1']
 */
export function remove(v, callback, fromIndex = 0) {
  const _callback = bindToFunction(callback, null, v => v);
  const _v = toArray(v);
  const ret = [];

  for (let i = fromIndex; i < _v.length; i++) {
    const vv = _v[i];

    if (!_callback(vv)) {
      ret.push(vv);
    }
  }
  return ret;
}

/**
 * This function returns new array object shuffled as the random
 * @param {Iterable|Object} v An iterable object or a plain object
 * @returns {Array}
 * @example
 * shuffle([1, 2, 3, 4]) // [3, 1, 2, 4]
 */
export function shuffle(v) {
  const _v = toArray(v);
  const length = _v.length;

  for (let i = length; --i; ) {
    const r = Math.floor(Math.random() * i);
    const ii = i - 1;

    const tmp = _v[ii];
    _v[ii] = v[r];
    _v[r] = tmp;
  }

  return _v;
}

/**
 * This function return new object accumulated every value of an iterable object or a plain object
 * @param {Iterable|Object} v An iterable object or a Plain object
 * @param {function} callback Function which will be call on every element of an iterable object or a plain object
 * @param {Object} initV init object
 * @returns {*}
 * @example
 * reduce([{ x: 1 }, { y: 2 }, { z: 3 }], (acc, v, k) => { acc[k] = v; return acc; }, {}) // { 0: { x: 1 }, 1: { y: 2 }, 2: { z: 3 } }
 */
export function reduce(v, callback, initV) {
  const _callback = bindToFunction(callback, null, acc => acc);

  let acc = initV;

  forEach(v, (vv, k) => {
    acc = !isUndefined(acc) ? acc : vv;
    acc = _callback(acc, vv, k, v);
  });
  return acc;
}

// /**
//  * This function returns a first element found from an iterable object or a plain object
//  * @param {Iterable|Object} v An iterable object or a plain object
//  * @param {*} searchValue Value which will be search
//  * @returns {*}
//  * @example
//  * search(['1', 2, 3], 3) // 3
//  */
// export function search(v, searchValue) {
//   return find(v, vv => isEqual(searchValue, vv));
// }
//
// /**
//  * This function returns an index of first element found from an iterable object or a plain object
//  * @param {Iterable|Object} v An iterable object or a plain object
//  * @param {*} searchValue Value which will be search
//  * @returns {number}
//  * @example
//  * searchIndex(['1', 2, 3], '1') // 0
//  */
// export function searchIndex(v, searchValue) {
//   return findIndex(v, vv => isEqual(searchValue, vv));
// }
//
// /**
//  * This function returns a first element found from an iterable object or a plain object
//  * @param {Iterable|Object} v An iterable object or a plain object
//  * @param {*} searchValue Value which will be search
//  * @returns {Object}
//  * @example
//  * deepSearch(['1', 2, 3], 3) // { c: ['1', 2, 3], k: 2, v: 3, origin: [...] }
//  */
// export function deepSearch(v, searchValue) {
//   return deepFind(v, vv => isEqual(searchValue, vv));
// }

// /**
//  * This function inserts a value from then on before of target index of an iterable object or a plain object
//  * @param {Iterable|Object} v An iterable object or a plain object
//  * @param {number} targetIndex Target index
//  * @param {*} values Values which will be inserted
//  * @returns {Array}
//  * @example
//  * insertBefore([1, 2, 3], 2, 22, 33) // [ 1, 22, 33, 2, 3 ]
//  */
// export function insertBefore(v, targetIndex, ...values) {
//   const length = toNumber(v?.length);
//   let _targetIndex;
//
//   if (targetIndex <= 0) {
//     _targetIndex = 0;
//   } else if (targetIndex >= length) {
//     _targetIndex = length;
//   } else {
//     _targetIndex = targetIndex - 1;
//   }
//
//   return splice(v, _targetIndex, 0, ...values);
// }
//
// /**
//  * This function inserts a value from then on after of target index of an iterable object or a plain object
//  * @param {Iterable|Object} v An iterable object or a plain object
//  * @param {number} targetIndex Target index
//  * @param {*} values Values which will be inserted
//  * @returns {Array}
//  * @example
//  * insertAfter([1, 2, 3], 1, 22, 33) // [ 1, 2, 22, 33, 3 ]
//  */
// export function insertAfter(v, targetIndex, ...values) {
//   const length = toNumber(v?.length);
//   let _targetIndex;
//
//   if (targetIndex <= 0) {
//     _targetIndex = 0;
//   } else if (targetIndex >= length) {
//     _targetIndex = length;
//   } else {
//     _targetIndex = targetIndex + 1;
//   }
//
//   return splice(v, _targetIndex, 0, ...values);
// }

// /**
//  * This function removes a value from a target index of an iterable object or a plain object
//  * @param {Iterable|Object} v An iterable object or a plain object
//  * @param {number} targetIndex Target index
//  * @returns {Array}
//  * @example
//  * removeAll([1, 2, 3, 4], 1) // [1]
//  */
//
// export function removeAll(v, targetIndex) {
//   return splice(v, targetIndex);
// }

// /**
//  * This function returns last index of an iterable object or a plain object
//  * @param {Iterable|Object} v An iterable object or a plain object
//  * @returns {number}
//  * @example
//  * lastIndex([1, 2, 3, 4]) // 3
//  */
// export function lastIndex(v) {
//   const { length } = toArray(v);
//   return length > 0 ? length - 1 : 0;
// }
