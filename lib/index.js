import { isEqual, type } from 'emnida';
import { _of, _copyWithin, _fill, _find, _findIndex, _flat, _flatMap, _includes, bindToFunction } from './polyfill';
import { splice, toArray, ascOperator, descOperator, deepTruly, forEach } from './_utils';

const { isUndefined, isObject, isNull, isFunction } = type;
/**
 * This function will be call every element of iterable object
 * @param {Iterable} v Iterable object
 * @param {function} callback Function which will be call on every element of iterable object
 * @param {*} _this Value which will be used as this context when executing given function
 * @example
 * forEach('test', (v, k) => console.log(v)); // 't', 'e', 's', 't'
 */
export { forEach };

/**
 * This function converts given iterable object to new an array object
 * @param {Iterable} v Iterable object
 * @param {function} callback Function which will be call on every element of iterable object
 * @param {*} _this Value which will be used as this context when executing given function
 * @returns {Array}
 * @example
 * toArray({ x: 1, y: 2, z: 3 }); // [{ k: 'x', v: 1 }, { k: 'y', v: 2 }, { k: 'z', v: 3 }]
 */
export { toArray };

/**
 * This function returns an array object which included an every arguments
 * @param {*} args Arguments
 * @returns {Array}
 * @example
 * of(1, 2, 3, 4); // [1, 2, 3, 4]
 */
export function of(...args) {
  return _of(...args);
}

/**
 * This function returns new array object which merged as an argument values
 * @param {Iterable} v Iterable object
 * @param {*} args Argument values
 * @returns {Array}
 * @example
 * concat({ x: 1, y: 2, z: 3 }, { xx: 1, yy: 2, zz: 3 }, { xxx: 1, yyy: 2, zzz: 3 }) // [{ k: 'x', 1 } ... { k: 'xxx', v: 1 }])
 */
export function concat(v, ...args) {
  let ret = toArray(v);

  args.forEach(vv => {
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
 * @param {Iterable} v Iterable object
 * @param {*} searchValue Search value
 * @param {number} [from=0] Start index which will be search
 * @returns {number}
 * @example
 * indexOf({ x: 1, y: 2, yy: { zz: 3 } }, 44); // -1
 */
export function indexOf(v, searchValue, from = 0) {
  return toArray(v, vv => vv).indexOf(searchValue, from);
}

/**
 * This function returns joined value as a separator from every elements of an iterable object
 * @param {Iterable} v Iterable object
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
 * @param {Iterable} v Iterable object
 * @param {*} searchValue Search value
 * @param {number} [from=Array.length - 1] Start index which will be search from last index
 * @returns {number}
 * @example
 * lastIndexOf({ x: 1, y: 2, yy: { zz: 3 } }, 44) // -1
 */
export function lastIndexOf(v, searchValue, from = v.length - 1) {
  return toArray(v, vv => vv).lastIndexOf(searchValue, from);
}

/**
 * This function returns index of found value from given iterable object
 * @param {Iterable} v Iterable object
 * @returns {Array}
 * @example
 * keys([1, , 3]) // [0, 1, 2]
 */
export function keys(v) {
  return toArray(v, (vv, k) => k);
}

/**
 * This function returns index of found value from given iterable object
 * @param {Iterable} v Iterable object
 * @returns {Array}
 * @example
 * values({ x: 1, y: 2, z: 3 }) // [1, 2, 3]
 */
export function values(v) {
  return toArray(v, vv => vv);
}

/**
 * This function returns new array object which included every elements copied from start index until end index
 * @param {Iterable} v Iterable object
 * @param {number} t Target index which to copied
 * @param {number} start Start index which to start copying
 * @param {number} [end=Array.length] End index which to end copying(will be increase 1 an end index)
 * @returns {Array}
 * @example
 * copyWithin({ x: 1, y: '2', z: 3 }, 0, 1, 2) // [{ k: 'y', v: '2' }, { k: 'z', v: 3 }, { k: 'z', v: 3 }]
 */
export function copyWithin(v, t, start, end = v.length) {
  return _copyWithin(toArray(v), t, start, end + 1);
}

/**
 * This function returns new array object which filled a value from start index until end index
 * @param {Iterable} v Iterable object
 * @param {*} vv Value which will be filled
 * @param {number} start Start index
 * @param {number} [end=Array.length] End index(will be increase 1 an end index)
 * @returns {Array}
 * @example
 * fill([1, 2, 3, 4], 7, 2) // [1, 2, 7, 7]
 */
export function fill(v, vv, start, end = v.length) {
  return _fill(toArray(v), vv, start, end + 1);
}

/**
 * This function returns a first element found from an iterable object
 * @param {Iterable} v Iterable object
 * @param {function} callback Function which will be call on every element of iterable object
 * @param {*} _this Value which will be used as this context when executing given function
 * @returns {*}
 * @example
 * find(['1', 2, 3], v => typeof v === 'number') // 2
 */
export function find(v, callback, _this) {
  return _find(toArray(v), callback, _this);
}

/**
 * This function returns an index of first element found from an iterable object
 * @param {Iterable} v Iterable object
 * @param {function} callback Function which will be call on every element of iterable object
 * @param {*} _this Value which will be used as this context when executing given function
 * @returns {number}
 * @example
 * findIndex(['1', 2, 3], v => typeof v === 'number') // 1
 */
export function findIndex(v, callback, _this) {
  return _findIndex(toArray(v), callback, _this);
}

/**
 * This function returns a first element found from an iterable object
 * @param {Iterable} v Iterable object
 * @param {function} callback Function which will be call on every element of iterable object
 * @param {*} _this Value which will be used as this context when executing given function
 * @returns {Object}
 * @example
 * deepFind([{ x: { xx: { y: 3, z: 'A' } } }], v => typeof v === 'number') // { c: { y: 3, z: 'A' }, k: 'y', v: 3, origin: [{ ... }] }
 */
export function deepFind(v, callback, _this) {
  const _callback = bindToFunction(callback, _this, () => {});

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
 * @param {Iterable} v Iterable object
 * @param {*} t Value which will be search
 * @returns {*}
 * @example
 * search(['1', 2, 3], 3) // 3
 */
export function search(v, t) {
  return find(v, vv => isEqual(t, vv));
}

/**
 * This function returns an index of first element found from an iterable object
 * @param {Iterable} v Iterable object
 * @param {*} t Value which will be search
 * @returns {number}
 * @example
 * searchIndex(['1', 2, 3], '1') // 0
 */
export function searchIndex(v, t) {
  return findIndex(v, vv => isEqual(t, vv));
}

/**
 * This function returns a first element found from an iterable object
 * @param {Iterable} v Iterable object
 * @param {*} t Value which will be search
 * @returns {Object}
 * @example
 * deepSearch(['1', 2, 3], 3) // { c: ['1', 2, 3], k: 2, v: 3, origin: [...] }
 */
export function deepSearch(v, t) {
  return deepFind(v, vv => isEqual(t, vv));
}
/**
 * This function returns new array object which included all sub-array elements
 * @param {Iterable} v Iterable object
 * @param {number} depth Depth level specifying how deep a nested array structure should be flattened
 * @returns {Array}
 * @example
 * flat(['1', [2, 3, 4], [5, 6, 2, [8, 9]]], 2) // ['1', 2, 3, 4, 5, 6, 2, 8, 9]
 */
export function flat(v, depth) {
  return _flat(toArray(v), depth);
}

/**
 * This function returns new array object formed by applying a given callback function to each element of iterable object
 * @param {Iterable} v Iterable object
 * @param {function} callback Function which will be call on every element of iterable object
 * @param {*} _this Value which will be used as this context when executing given function
 * @returns {Array}
 * @example
 * flatMap(['1', [2, 3, 4], [5, 6, 7, [8, 9]]], v => v.slice(0)) // ['1', 2, 3, 4, 5, 6, 7, [8, 9]]
 */
export function flatMap(v, callback, _this) {
  return _flatMap(toArray(v), callback, _this);
}

/**
 * This function returns whether in an array includes certain value and is not
 * @param {Iterable} v Iterable object
 * @param {*} t Target Value which will be search
 * @param {number} start Start index which to searching
 * @returns {Boolean}
 * @example
 * includes([1, 2, 3], 2) // true
 */
export function includes(v, t, start) {
  return _includes(
    toArray(v, vv => vv),
    t,
    start
  );
}

/**
 * This function returns new array object sorted to ascending
 * @param {Iterable} v Iterable object
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
 * @param {Iterable} v Iterable object
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
 * @param {Iterable} v Iterable object
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
 * @param {Iterable} v Iterable object
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
 * @param {Iterable} v Iterable object
 * @param {*} args Values
 * @returns {Array}
 * @example
 * preInsert([1, 2, 3, 4], 11) // [11, 22, 2, 3, 4]
 */
export function preInsert(v, ...args) {
  return splice(v, 0, 0, ...args);
}

/**
 * This function inserts a value from a target index of an array
 * @param {Iterable} v Iterable object
 * @param {number} t Target index
 * @param {*} args Values
 * @returns {Array}
 * @example
 * insert([1, 2, 3, 4], 1, 22) // [1, 22, 2, 3, 4]
 */
export function insert(v, t, ...args) {
  return splice(v, t, 0, ...args);
}

/**
 * This function replaces from target index value of an array to new values
 * @param {Iterable} v Iterable object
 * @param {number} t Target index
 * @param {*} args Values which will be replaced
 * @returns {Array}
 * @example
 * replace([1, 2, 3, 4], 2, 33, 'ADD') // [1, 2, 33, 'ADD', 4]
 */
export function replace(v, t, ...args) {
  return splice(v, t, 1, ...args);
}

/**
 * This function removes a value at a target index of an array object
 * @param {Iterable} v Iterable object
 * @param {number} t Target index
 * @returns {Array}
 * @example
 * remove([1, 2, 3, 4], 3) // [1, 2, 3]
 */
export function remove(v, t) {
  return splice(v, t, 1);
}

/**
 * This function removes a value from a target index of an array object
 * @param {Iterable} v Iterable object
 * @param {number} t Target index
 * @returns {Array}
 * @example
 * removeAll([1, 2, 3, 4], 1) // [1]
 */
export function removeAll(v, t) {
  return splice(v, t);
}

/**
 * This function returns last index of an array object
 * @param {Iterable} v Iterable object
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
 * @param {Iterable} v Iterable object
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
 * @param {Iterable} v Iterable object
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
