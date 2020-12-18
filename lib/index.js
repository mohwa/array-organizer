import { isEqual, type } from 'emnida';
import { _from, _of, _copyWithin, _fill, _find, _findIndex, _flat, _flatMap, _includes } from './polyfill';
import { bindToFunction, toNumber, deepCopy, deepFind } from './_utils';

const { isMap, isIterableObject, isEmpty, isArrayLikeObject } = type;

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
 * @param {Array/Object} v An array object
 * @param {*} vv Value which will be filled
 * @param {number} start Start index(default: 0)
 * @param {number} end End index(default: arr.length)
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
 * @returns {number}
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
 * @returns {number}
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
 * @param {Array/Object} v An array object
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
 * @param {Array/Object} v An array object
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
 * @param {Array/Object} v An array object
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

/**
 *
 * @description Array-like Object 형식으로 맞춰준뒤 Array.from에 인수로 전달하여 배열로 변환한것 리턴
 * @param {*} array
 * @returns
 */
export function ArrayDeepCopy(array) {
  return Array.from({ ...deepCopy(array), length: Object.keys(array).length });
}

/**
 *
 * @description sort안에 들어갈 콜백
 * @param {*} key
 * @param {*} order
 */
export function compare(key, order = 'asc') {
  return function innerSort(a, b) {
    let varA;
    let varB;

    if (!a.hasOwnProperty(key) || !b.hasOwnProperty(key)) {
      if (deepFind(a, key)) {
        varA = typeof deepFind(a, key) === 'string' ? deepFind(a, key).toUpperCase() : deepFind(a, key);
        varB = typeof deepFind(b, key) === 'string' ? deepFind(b, key).toUpperCase() : deepFind(b, key);
      }
    } else {
      varA = typeof a[key] === 'string' ? a[key].toUpperCase() : a[key];
      varB = typeof b[key] === 'string' ? b[key].toUpperCase() : b[key];
    }

    if (varA && varB) {
      let comparison = 0;
      if (varA > varB) {
        comparison = 1;
      } else if (varA < varB) {
        comparison = -1;
      }
      return order === 'desc' ? comparison * -1 : comparison;
    } else {
      return 0;
    }
  };
}

/**
 *
 * @description 사용자에게 제공할 정렬 함수
 * @param {*} objectArray
 * @param {*} key
 * @param {*} order {asc, desc}
 */
export function sort(objectArray, key, order) {
  objectArray.sort(compare(key, order));

  return objectArray;
}

/**
 *
 * @description 기존 배열은 건드리지 않고, 소팅 할때 사용할 정렬 함수
 * @param {*} objectArray
 * @param {*} key
 * @param {*} order
 * @returns
 */
export function immutableSort(objectArray, key, order) {
  const obj = ArrayDeepCopy(objectArray);

  obj.sort(compare(key, order));

  return obj;
}
