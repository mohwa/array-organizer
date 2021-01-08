import { isEqual, type } from 'emnida';
import { _of, _copyWithin, _fill, _find, _findIndex, _flat, _flatMap, _includes } from './polyfill';
import { splice, toArray, ascOperator, descOperator, bindToFunction, deepTruly } from './_utils';

const { isUndefined } = type;
/**
 * This function convert an argument like iterable object to an array object
 * @param {Iterable} v Iterable object
 * @param {function} f Function which will call on every element of iterable object
 * @param {*} _this Value which will be used as this context when executing function
 * @returns {Array}
 * @example
 * toArray([1, 2, 3], function(v) { return { v, vv: this }; }, { x: 1 });
 */
export { toArray };

/**
 * This function return new an array object through every arguments just like Array.of() method
 * @param {*} args Arguments which same the arguments of Array.prototype.of() method
 * @returns {Array}
 * @example
 * of(1, 2, 3, 4);
 * of({ x: 1 }, { x: 2 }, { x: 3 })
 */
export function of(...args) {
  return _of(...args);
}

/**
 * This function return new an array object that copied every elements from start index until end index just like the Array.prototype.copyWithin() method
 * @param {Iterable} v Iterable object
 * @param {number} t Target index which to copy the sequence to
 * @param {number} start Start index which to start copying elements from
 * @param {number} end End index which to end copying elements from(this function would increase 1 an end index)
 * @returns {Array}
 * @example
 * copyWithin([1, '2', 3], 0, 1, 2)
 * copyWithin({ x: 1, y: '2', z: 3 }, 0, 1, 2)
 */
export function copyWithin(v, t, start, end = v.length) {
  return _copyWithin(toArray(v), t, start, end + 1);
}

/**
 * This function return new an array object that filled an argument from start index until end index just like the Array.prototype.fill() method
 * this function would increase 1 an end index
 * @param {Iterable} v Iterable object
 * @param {*} vv Value which will be filled
 * @param {number} start Start index(default: 0)
 * @param {number} end End index(default: arr.length)
 * @returns {Array}
 * @example
 * fill([1, 2, 3, 4], 7)
 */
export function fill(v, vv, start, end = v.length) {
  return _fill(toArray(v), vv, start, end + 1);
}

/**
 * This function return a first element found in an array object just like the Array.prototype.find() method
 * @param {Iterable} v Iterable object
 * @param {*} args Arguments which same an arguments of Array.prototype.find() method
 * @returns {*}
 * @example
 * find(['1', 2, 3], v => isNumber(v))
 */
export function find(v, ...args) {
  return _find(toArray(v), ...args);
}

/**
 * This function return a first element index found in an array object just like the Array.prototype.findIndex() method
 * @param {Iterable} v Iterable object
 * @param {*} args Arguments which same an arguments of Array.prototype.findIndex() method
 * @returns {number}
 * @example
 * findIndex(['1', 2, 3], v => isNumber(v))
 */
export function findIndex(v, ...args) {
  return _findIndex(toArray(v), ...args);
}

/**
 * This function return a first element found in an array object
 * @param {Iterable} v Iterable object
 * @param {Function} f callback function
 * @param {Object} _this this object
 * @returns {Object}
 * @example
 * deepFind([{ x: { xx: { y: 3, z: 'A' }}}], v => isNumber(v))
 */
export function deepFind(v, f, _this) {
  const _f = bindToFunction(f, _this, function() {});

  let ret;
  const checker = (vv, k, c) => {
    if (_f(vv, k, c)) {
      ret = { v: vv, k, c, origin: v };
    }
  };

  deepTruly(v, { fAtNotObject: checker });

  return ret;
}

/**
 * This function return a first element found in an array object
 * @param {Iterable} v Iterable object
 * @param {*} t Value which will be search
 * @returns {*}
 * @example
 * search(['1', 2, 3], 3)
 */
export function search(v, t) {
  return find(v, vv => isEqual(t, vv));
}

/**
 * This function return a first element index found in an array object
 * @param {Iterable} v Iterable object
 * @param {*} t Value which will be search
 * @returns {number}
 * @example
 * searchIndex(['1', 2, 3], '1')
 */
export function searchIndex(v, t) {
  return findIndex(v, vv => isEqual(t, vv));
}

/**
 * This function return a first element found in an array object
 * @param {Iterable} v Iterable object
 * @param {*} t Value which will be search
 * @returns {Object}
 * @example
 * deepSearch(['1', 2, 3], 3)
 */
export function deepSearch(v, t) {
  return deepFind(v, vv => isEqual(t, vv));
}
/**
 * This function return new an array object with all sub-array elements just like the Array.prototype.flat() method
 * @param {Iterable} v Iterable object
 * @param {*} args Arguments which same an arguments of Array.prototype.flat() method
 * @returns {Array}
 * @example
 * flat(['1', [2, 3, 4], [5, 6, 2, [8, 9]]], 2)
 */
export function flat(v, ...args) {
  return _flat(toArray(v), ...args);
}

/**
 * This function return new an array object formed by applying a given callback function to each element of the array just like the Array.prototype.flatMap() method
 * @param {Iterable} v Iterable object
 * @param {*} args Arguments which same an arguments of Array.prototype.flatMap() method
 * @returns {Array}
 * @example
 * flatMap(['1', [2, 3, 4], [5, 6, 7, [8, 9]]], v => v.slice(0))
 */
export function flatMap(v, ...args) {
  return _flatMap(toArray(v), ...args);
}

/**
 * This function return true or false as whether in an array includes certain value and is not
 * @param {Iterable} v Iterable object
 * @param {*} args Arguments which same an arguments of Array.prototype.includes() method
 * @returns {Array}
 * @example
 * includes([1, 2, 3], 2)
 */
export function includes(v, ...args) {
  return _includes(
    toArray(v, vv => vv),
    ...args
  );
}

/**
 * This function return new an array object sorted to ascending
 * @param {Iterable} v Iterable object
 * @returns {Array}
 * @example
 * asc(['d', null, 0xff])
 */
export function asc(v) {
  return toArray(v, vv => vv).sort((v1, v2) => {
    return ascOperator(v1, v2);
  });
}

/**
 * This function return new an array object sorted to descending
 * @param {Iterable} v Iterable object
 * @returns {Array}
 * @example
 * desc(['d', true, undefined, 0xff, 'ee', [], 2e4, () => {}, 't', 0])
 */
export function desc(v) {
  return toArray(v, vv => vv).sort((v1, v2) => {
    return descOperator(v1, v2);
  });
}

/**
 * This function return new an array object sorted ascending by object key
 * @param {Iterable} v Iterable object
 * @param {string} key object key
 * @returns {Array}
 * @example
 * ascBy([{ x: 1, y: 11 }, { x: 2, y: 22 }, { x: 3, y: 33 }], 'y')
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
 * This function return new an array object sorted descending by object key
 * @param {Iterable} v Iterable object
 * @param {string} key object key
 * @returns {Array}
 * @example
 * descBy([{ x: 1, y: 11 }, { x: 2, y: 22 }, { x: 3, y: 33 }], 'y')
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
 * This function insert values from the first index of an array object
 * @param {Iterable} v Iterable object
 * @param {*} args Values
 * @returns {Array}
 * @example
 * preInsert([1, 2, 3, 4], 11, 22, 33)
 */
export function preInsert(v, ...args) {
  return splice(v, 0, 0, ...args);
}

/**
 * This function insert values from a target index of an array
 * @param {Iterable} v Iterable object
 * @param {number} t Target index
 * @param {*} args Values
 * @returns {Array}
 * @example
 * insert([1, 2, 3, 4], 1, 22, 33, 44)
 */
export function insert(v, t, ...args) {
  return splice(v, t, 0, ...args);
}

/**
 * This function replace from target index value of an array to new values
 * @param {Iterable} v Iterable object
 * @param {number} t Target index
 * @param {*} args Values which will be replaced
 * @returns {Array}
 * @example
 * replace([1, 2, 3, 4], 2, 33, 'ADD')
 */
export function replace(v, t, ...args) {
  return splice(v, t, 1, ...args);
}

/**
 * This function remove a value at a target index of an array object
 * @param {Iterable} v Iterable object
 * @param {number} t Target index
 * @returns {Array}
 * @example
 * remove([1, 2, 3, 4], 3);
 */
export function remove(v, t) {
  return splice(v, t, 1);
}

/**
 * This function remove values from a target index of an array object
 * @param {Iterable} v Iterable object
 * @param {number} t Target index
 * @returns {Array}
 * @example
 * removeAll([1, 2, 3, 4], 1);
 */
export function removeAll(v, t) {
  return splice(v, t);
}

/**
 * This function return a last index of an array object
 * @param {Iterable} v Iterable object
 * @returns {number}
 * @example
 * lastIndex([1, 2, 3, 4])
 */
export function lastIndex(v) {
  const { length } = toArray(v);
  return length > 0 ? length - 1 : 0;
}

/**
 * This function return new an array object shuffled as the random
 * @param {Iterable} v Iterable object
 * @returns {Array}
 * @example
 * shuffle([1, 2, 3, 4])
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
 * @param {Function} f callback function
 * @param {Object} initV init object
 * @returns {Object} init object
 * @example
 * reduce([{ x: 1 }, { y: 2 }, { z: 3 }], (acc, v, k) => { acc[k] = v; return acc; }, {});
 */
export function reduce(v, f, initV) {
  const _f = bindToFunction(f, null, acc => acc);

  let acc = initV;
  // 실제 변환된 반환값을 사용하지않는 경우인데, toArray 함수를 사용하는것이 조금 어색하다는 생각이든다.
  // 이 부분은 개선하는게 좋을듯하다.
  toArray(v, (vv, k) => {
    acc = !isUndefined(acc) ? acc : vv;
    acc = _f(acc, vv, k, v);
  });
  return acc;
}
