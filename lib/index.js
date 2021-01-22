import { isEqual, type } from 'emnida';
import { _of, _copyWithin, _fill, _find, _findIndex, _flat, _flatMap, _includes, _from } from './polyfill';
import { bindToFunction } from './_utils';

const {
  isUndefined,
  isObject,
  isNull,
  isFunction,
  isString,
  isArrayLikeObject,
  isMap,
  isSet,
  isIterableObject,
  isEmpty,
  isPlainObject,
} = type;

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
 * This function will be call every element of iterable object
 * @param {Iterable|Object} v Iterable object or Plain object
 * @param {function} callback Function which will be call on every element of iterable object
 * @param {*} [context] Value which will be used as this context when executing given function
 * @example
 * forEach('test', (v, k) => console.log(v)); // 't', 'e', 's', 't'
 */
export function forEach(v, callback, context) {
  const _callback = bindToFunction(callback, context, v => v);

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
 * This function converts given iterable object to new an array object
 * @param {Iterable|Object} v Iterable object or Plain object
 * @param {function} [callback] Function which will be call on every element of iterable object
 * @param {*} [context] Value which will be used as this context when executing given function
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
 * This function returns an array object which included an every arguments
 * @param {*} values Values which will be included
 * @returns {Array}
 * @example
 * of(1, 2, 3, 4); // [1, 2, 3, 4]
 */
export function of(...values) {
  return _of(...values);
}

/**
 * This function returns new array object which merged as an argument values
 * @param {Iterable|Object} v Iterable object or Plain object
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
 * This function returns index of found value from given iterable object
 * @param {Iterable|Object} v Iterable object or Plain object
 * @param {*} searchValue Search value
 * @param {number} [fromIndex=0] Start index which will be search
 * @returns {number}
 * @example
 * indexOf({ x: 1, y: 2, yy: { zz: 3 } }, 44); // -1
 */
export function indexOf(v, searchValue, fromIndex = 0) {
  return toArray(v, vv => vv).indexOf(searchValue, fromIndex);
}

/**
 * This function returns joined value as a separator from every elements of an iterable object
 * @param {Iterable|Object} v Iterable object or Plain object
 * @param {*} separator separate value
 * @returns {string}
 * @example
 * join({ x: 1, y: 2, z: 3 }, '-') // '1-2-3'
 */
export function join(v, separator) {
  return toArray(v, vv => vv).join(separator);
}

/**
 * This function returns index of found value from given iterable object
 * @param {Iterable|Object} v Iterable object or Plain object
 * @param {*} searchValue Search value
 * @param {number} [fromIndex=Iterable.length-1] Start index which will be search from last index
 * @returns {number}
 * @example
 * lastIndexOf({ x: 1, y: 2, yy: { zz: 3 } }, 44) // -1
 */
export function lastIndexOf(v, searchValue, fromIndex = v.length - 1) {
  return toArray(v, vv => vv).lastIndexOf(searchValue, fromIndex);
}

/**
 * This function returns index of found value from given iterable object
 * @param {Iterable|Object} v Iterable object or Plain object
 * @returns {Array}
 * @example
 * keys([1, , 3]) // [0, 1, 2]
 */
export function keys(v) {
  return toArray(v, (vv, k) => k);
}

/**
 * This function returns index of found value from given iterable object
 * @param {Iterable|Object} v Iterable object or Plain object
 * @returns {Array}
 * @example
 * values({ x: 1, y: 2, z: 3 }) // [1, 2, 3]
 */
export function values(v) {
  return toArray(v, vv => vv);
}

/**
 * This function returns new array object which included every elements copied from start index until end index
 * @param {Iterable|Object} v Iterable object or Plain object
 * @param {number} targetIndex Target index which to copied
 * @param {number} [start=0] Start index which to start copying
 * @param {number} [end=Iterable.length] End index which to end copying(will be increase 1 an end index)
 * @returns {Array}
 * @example
 * copyWithin({ x: 1, y: '2', z: 3 }, 0, 1, 2) // [{ k: 'y', v: '2' }, { k: 'z', v: 3 }, { k: 'z', v: 3 }]
 */
export function copyWithin(v, targetIndex, start = 0, end = v.length) {
  return _copyWithin(toArray(v), targetIndex, start, end + 1);
}

/**
 * This function returns new array object which filled a value from start index until end index
 * @param {Iterable|Object} v Iterable object or Plain object
 * @param {*} vv Value which will be filled
 * @param {number} [start=0] Start index
 * @param {number} [end=Iterable.length] End index(will be increase 1 an end index)
 * @returns {Array}
 * @example
 * fill([1, 2, 3, 4], 7, 2) // [1, 2, 7, 7]
 */
export function fill(v, vv, start = 0, end = v.length) {
  return _fill(toArray(v), vv, start, end + 1);
}

/**
 * This function returns a first element found from an iterable object
 * @param {Iterable|Object} v Iterable object or Plain object
 * @param {function} callback Function which will be call on every element of iterable object
 * @param {*} [context] Value which will be used as this context when executing given function
 * @returns {*}
 * @example
 * find(['1', 2, 3], v => typeof v === 'number') // 2
 */
export function find(v, callback, context) {
  return _find(toArray(v), callback, context);
}

/**
 * This function returns an index of first element found from an iterable object
 * @param {Iterable|Object} v Iterable object or Plain object
 * @param {function} callback Function which will be call on every element of iterable object
 * @param {*} [context] Value which will be used as this context when executing given function
 * @returns {number}
 * @example
 * findIndex(['1', 2, 3], v => typeof v === 'number') // 1
 */
export function findIndex(v, callback, context) {
  return _findIndex(toArray(v), callback, context);
}

/**
 * This function returns a first element found from an iterable object
 * @param {Iterable|Object} v Iterable object or Plain object
 * @param {function} callback Function which will be call on every element of iterable object
 * @param {*} [context] Value which will be used as this context when executing given function
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
 * This function returns a first element found from an iterable object
 * @param {Iterable|Object} v Iterable object or Plain object
 * @param {*} searchValue Value which will be search
 * @returns {*}
 * @example
 * search(['1', 2, 3], 3) // 3
 */
export function search(v, searchValue) {
  return find(v, vv => isEqual(searchValue, vv));
}

/**
 * This function returns an index of first element found from an iterable object
 * @param {Iterable|Object} v Iterable object or Plain object
 * @param {*} searchValue Value which will be search
 * @returns {number}
 * @example
 * searchIndex(['1', 2, 3], '1') // 0
 */
export function searchIndex(v, searchValue) {
  return findIndex(v, vv => isEqual(searchValue, vv));
}

/**
 * This function returns a first element found from an iterable object
 * @param {Iterable|Object} v Iterable object or Plain object
 * @param {*} searchValue Value which will be search
 * @returns {Object}
 * @example
 * deepSearch(['1', 2, 3], 3) // { c: ['1', 2, 3], k: 2, v: 3, origin: [...] }
 */
export function deepSearch(v, searchValue) {
  return deepFind(v, vv => isEqual(searchValue, vv));
}
/**
 * This function returns new array object which included all sub-array elements
 * @param {Iterable|Object} v Iterable object or Plain object
 * @param {number} [depth] Depth level specifying how deep a nested array structure should be flattened
 * @returns {Array}
 * @example
 * flat(['1', [2, 3, 4], [5, 6, 2, [8, 9]]], 2) // ['1', 2, 3, 4, 5, 6, 2, 8, 9]
 */
export function flat(v, depth) {
  return _flat(toArray(v), depth);
}

/**
 * This function returns new array object formed by applying a given callback function to each element of iterable object
 * @param {Iterable|Object} v Iterable object or Plain object
 * @param {function} callback Function which will be call on every element of iterable object
 * @param {*} [context] Value which will be used as this context when executing given function
 * @returns {Array}
 * @example
 * flatMap(['1', [2, 3, 4], [5, 6, 7, [8, 9]]], v => v.slice(0)) // ['1', 2, 3, 4, 5, 6, 7, [8, 9]]
 */
export function flatMap(v, callback, context) {
  return _flatMap(toArray(v), callback, context);
}

/**
 * This function returns whether in an array includes certain value and is not
 * @param {Iterable|Object} v Iterable object or Plain object
 * @param {*} searchValue Target Value which will be search
 * @param {number} [start] Start index which to searching
 * @returns {boolean}
 * @example
 * includes([1, 2, 3], 2) // true
 */
export function includes(v, searchValue, start) {
  return _includes(
    toArray(v, vv => vv),
    searchValue,
    start
  );
}

/**
 * This function returns new array object sorted to ascending
 * @param {Iterable|Object} v Iterable object or Plain object
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
 * @param {Iterable|Object} v Iterable object or Plain object
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
 * @param {Iterable|Object} v Iterable object or Plain object
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
 * @param {Iterable|Object} v Iterable object or Plain object
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
 * This function inserts a value from the first index of an array object
 * @param {Iterable|Object} v Iterable object or Plain object
 * @param {*} values Values which will be inserted
 * @returns {Array}
 * @example
 * preInsert([1, 2, 3, 4], 11) // [11, 22, 2, 3, 4]
 */
export function preInsert(v, ...values) {
  return splice(v, 0, 0, ...values);
}

/**
 * This function inserts a value from a target index of an array
 * @param {Iterable|Object} v Iterable object or Plain object
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
 * This function replaces from target index value of an array to new values
 * @param {Iterable|Object} v Iterable object or Plain object
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
 * This function removes a value at a target index of an array object
 * @param {Iterable|Object} v Iterable object or Plain object
 * @param {number} targetIndex Target index
 * @returns {Array}
 * @example
 * remove([1, 2, 3, 4], 3) // [1, 2, 3]
 */
export function remove(v, targetIndex) {
  return splice(v, targetIndex, 1);
}

/**
 * This function removes a value from a target index of an array object
 * @param {Iterable|Object} v Iterable object or Plain object
 * @param {number} targetIndex Target index
 * @returns {Array}
 * @example
 * removeAll([1, 2, 3, 4], 1) // [1]
 */
export function removeAll(v, targetIndex) {
  return splice(v, targetIndex);
}

/**
 * This function returns last index of an array object
 * @param {Iterable|Object} v Iterable object or Plain object
 * @returns {number}
 * @example
 * lastIndex([1, 2, 3, 4]) // 3
 */
export function lastIndex(v) {
  const { length } = toArray(v);
  return length > 0 ? length - 1 : 0;
}

/**
 * This function returns new array object shuffled as the random
 * @param {Iterable|Object} v Iterable object or Plain object
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
 * This function return new object accumulated every value
 * @param {Iterable|Object} v Iterable object or Plain object
 * @param {function} callback Function which will be call on every element of iterable object
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
