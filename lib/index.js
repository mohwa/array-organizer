import * as emnida from 'emnida';
import { _from, _of, _copyWithin, _fill, _find, _findIndex, _flat, _flatMap, _includes } from './polyfill';
import { bindToFunction, toNumber } from './_utils';

const {
  type: { isMap, isIterableObject, isEmpty, isArrayLikeObject },
  isEqual,
} = emnida;

function splice(v, ...args) {
  const arr = toArray(v);
  arr.splice(...args);

  return arr;
}

/**
 * This function convert an argument like an array like object or an iterable object to an array object.
 * @param {*} v Value which will be convert
 * @param {function} f Function which will call on every element of an array object
 * @param {*} _this Value which will use as this when executing function
 * @returns {Array}
 * @example
 * toArray([1, 2, 3], function(v) { return { v, vv: this }; }, { x: 1 });
 * toArray({ x: 1, y: 2, z: 3 });
 */
export function toArray(v, f, _this) {
  const _f = bindToFunction(f, _this, function(v, k) {
    return { k, v };
  });

  const arr = [];

  switch (true) {
    case isArrayLikeObject(v) || isIterableObject(v): {
      if (isMap(v)) {
        for (const vv of v) {
          const [k, _vv] = vv;
          arr.push(_f(_vv, k));
        }
        return arr;
      }
      return _from(v, f, _this);
    }
    default: {
      if (!isEmpty(v)) {
        Object.keys(v).forEach(k => {
          arr.push(_f(v[k], k));
        });
      }
      return arr;
    }
  }
}

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
 * @param {Array/Object} v An array object
 * @param {Number} t Target index which to copy the sequence to
 * @param {Number} start Start index which to start copying elements from
 * @param {Number} end End index which to end copying elements from(this function would increase 1 an end index)
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
 * @param {Array/Object} v An array object
 * @param {*} vv Value which will be filled
 * @param {Number} start Start index(default: 0)
 * @param {Number} end End index(default: arr.length)
 * @returns {Array}
 * @example
 * fill([1, 2, 3, 4], 7)
 * fill({ x: 11, y: 22, z: 33 }, 7, 0, 1)
 */
export function fill(v, vv, start, end = v.length) {
  return _fill(toArray(v), vv, start, end + 1);
}

/**
 * This function return a first element found in an array object just like the Array.prototype.find() method
 * @param {Array/Object} v An array object
 * @param {*} args Arguments which same an arguments of Array.prototype.find() method
 * @returns {*}
 * @example
 * find(['1', 2, 3], v => isNumber(v))
 * find({ x: 11, y: 22, z: 33 }, ({ v }) => isNumber(v))
 */
export function find(v, ...args) {
  return _find(toArray(v), ...args);
}

/**
 * This function return a first element index found in an array object just like the Array.prototype.findIndex() method
 * @param {Array/Object} v An array object
 * @param {*} args Arguments which same an arguments of Array.prototype.findIndex() method
 * @returns {Number}
 * @example
 * findIndex(['1', 2, 3], v => isNumber(v))
 * findIndex({ x: 11, y: 22, z: 33 }, ({ v }) => isNumber(v))
 */
export function findIndex(v, ...args) {
  return _findIndex(toArray(v), ...args);
}

/**
 * This function return a first element found in an array object
 * @param {Array/Object} v An array object
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
 * @param {Array/Object} v An array object
 * @param {*} t Value which will be search
 * @returns {Number}
 * @example
 * searchIndex(['1', 2, 3], '1')
 */
export function searchIndex(v, t) {
  return findIndex(v, vv => isEqual(t, vv));
}

/**
 * This function return new an array object with all sub-array elements just like the Array.prototype.flat() method
 * @param {Array/Object} v An array object
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
 * @param {Array/Object} v An array object
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
 * @param {Array/Object} v An array object
 * @param {*} args Arguments which same an arguments of Array.prototype.includes() method
 * @returns {Array}
 * @example
 * includes([1, 2, 3], 2)
 * includes({ x: 1, y: 2, yy: { zz: 3 } }, 44)
 */
export function includes(v, ...args) {
  return _includes(
    toArray(v, vv => vv),
    ...args
  );
}

/**
 * This function return new an array object sorted to ascending
 * @param {Array/Object} v An array object
 * @returns {Array}
 * @example
 * asc({ x: 'd', y: null, z: 0xff })
 */
export function asc(v) {
  return toArray(v, vv => vv).sort((v1, v2) => {
    return toNumber(v1) - toNumber(v2);
  });
}

/**
 * This function return new an array object sorted to descending
 * @param {Array/Object} v An array object
 * @returns {Array}
 * @example
 * desc(['d', true, undefined, 0xff, 'ee', [], 2e4, () => {}, 't', 0])
 */
export function desc(v) {
  return toArray(v, vv => vv).sort((v1, v2) => {
    return toNumber(v2) - toNumber(v1);
  });
}

/**
 * This function insert values from the first index of an array object
 * @param {Array/Object} v An array object
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
 * @param {Array/Object} v An array object
 * @param {Number} t Target index
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
 * @param {Array/Object} v An array object
 * @param {Number} t Target index
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
 * @param {Array/Object} v An array object
 * @param {Number} t Target index
 * @returns {Array}
 * @example
 * remove([1, 2, 3, 4], 3);
 */
export function remove(v, t) {
  return splice(v, t, 1);
}

/**
 * This function remove values from a target index of an array object
 * @param {Array/Object} v An array object
 * @param {Number} t Target index
 * @returns {Array}
 * @example
 * removeAll([1, 2, 3, 4], 1);
 */
export function removeAll(v, t) {
  return splice(v, t);
}

/**
 * This function return a last index of an array object
 * @param {Array/Object} v An array object
 * @example
 * lastIndex([1, 2, 3, 4])
 */
export function lastIndex(v) {
  const { length } = toArray(v);
  return length > 0 ? length - 1 : 0;
}

/**
 * This function return new an array object shuffled as the random
 * @param {Array/Object} v An array object
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
