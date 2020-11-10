import { isArray, isNumber, isEmpty, isSet } from 'emnida/type';
import {
  initArrayByTypeCheck,
  _from,
  _of,
  _copyWithin,
  _entries,
  _fill,
  _find,
  _findIndex,
  _flat,
  _flatMap,
  _includes,
} from './_utils';

function getTargetIndex(v, t) {
  if (isNumber(t)) {
    return t;
  }
  return findIndex(v, vv => vv === t);
}

export function toArray(v, f, _this) {
  if (isArray(v)) return v;

  switch (true) {
    case !isEmpty(v?.length): {
      return _from(v, f, _this);
    }
    default: {
      const _f = f?.bind(_this);
      const arr = [];

      if (v?.forEach) {
        let i = -1;

        forEach(v, (vv, k) => {
          if (isSet(v)) {
            i = ++i;
            push(arr, vv);
          } else {
            i = k;
            push(arr, { v: vv, k });
          }
          _f?.(vv, i);
        });
        return arr;
      } else {
        for (const k in v) {
          const vv = v[k];

          push(arr, { v: vv, k });
          _f?.(vv, k);
        }
        return arr;
      }
    }
  }
}

export function of(v) {
  return _of(v);
}

export function concat(v, vv) {
  return initArrayByTypeCheck(v).concat(vv);
}

export function replace(v, t, start) {
  return copyWithin(v, t, start, start);
}

export function copyWithin(v, t, start, end = v.length) {
  const targetIndex = getTargetIndex(v, t);
  const startIndex = getTargetIndex(v, start);
  const endIndex = getTargetIndex(v, end);

  return _copyWithin(v, targetIndex, startIndex, endIndex + 1);
}

export function entries(v) {
  return _entries(v);
}

export function every(v, ...args) {
  return initArrayByTypeCheck(v).every(...args);
}

export function fill(v, ...args) {
  return _fill(v, ...args);
}

export function filter(v, ...args) {
  return initArrayByTypeCheck(v).filter(...args);
}

export function find(v, ...args) {
  return _find(v, ...args);
}

export function findIndex(v, ...args) {
  return _findIndex(v, ...args);
}

export function search(v, vv, _this) {
  return find(v, _v => _v === vv, _this);
}

export function searchIndex(v, vv, _this) {
  return findIndex(v, _v => _v === vv, _this);
}

export function flat(v, ...args) {
  return _flat(v, ...args);
}

export function flatMap(v, ...args) {
  return _flatMap(v, ...args);
}

export function forEach(v, ...args) {
  return initArrayByTypeCheck(v).forEach(...args);
}

export function includes(v, ...args) {
  return _includes(v, ...args);
}

export function indexOf(v, ...args) {
  return initArrayByTypeCheck(v).indexOf(v, ...args);
}

export function join(v, ...args) {
  return initArrayByTypeCheck(v).join(...args);
}

export function lastIndexOf(v, ...args) {
  return initArrayByTypeCheck(v).lastIndexOf(...args);
}

export function map(v, ...args) {
  return initArrayByTypeCheck(v).map(...args);
}

export function pop(v) {
  return initArrayByTypeCheck(v).pop();
}

export function push(v, ...args) {
  return initArrayByTypeCheck(v).push(...args);
}

export function reduce(v, ...args) {
  return initArrayByTypeCheck(v).reduce(...args);
}

export function reduceRight(v, ...args) {
  return initArrayByTypeCheck(v).reduceRight(...args);
}

export function reverse(v) {
  return initArrayByTypeCheck(v).reverse();
}

export function shift(v) {
  return initArrayByTypeCheck(v).shift();
}

export function slice(v, startIndex, endIndex = v.length) {
  return initArrayByTypeCheck(v).slice(startIndex, endIndex + 1);
}

export function some(v, ...args) {
  return initArrayByTypeCheck(v).some(...args);
}

export function sort(v, ...args) {
  return initArrayByTypeCheck(v).sort(...args);
}

export function splice(v, ...args) {
  return initArrayByTypeCheck(v).splice(...args);
}

export function remove(v, t) {
  const targetIndex = getTargetIndex(v, t);

  return splice(v, targetIndex, 0);
}

export function removeWithin(v, startIndex, endIndex = v.length) {
  return splice(v, startIndex, endIndex + 1);
}

export function insert(v, t, ...args) {
  const targetIndex = getTargetIndex(v, t);

  return splice(v, targetIndex, 0, ...args);
}

export function preInsert(v, ...args) {
  return splice(v, 0, 0, ...args);
}

export function toLocaleString(v, ...args) {
  return initArrayByTypeCheck(v).toLocaleString(...args);
}

export function toString(v) {
  return initArrayByTypeCheck(v).toString();
}

export function unshift(v, ...args) {
  return initArrayByTypeCheck(v).unshift(...args);
}

export function keys(v) {
  const _v = initArrayByTypeCheck(v);

  if (Array.prototype.keys) {
    return _v.keys();
  }
  return _v;
}

export function values(v) {
  const _v = initArrayByTypeCheck(v);

  if (Array.prototype.values) {
    return _v.values();
  }
  return _v;
}

/**
 * 전달받은 Array 객체를 무작위로 다시 섞는다.
 */
export function shuffle(v) {
  const _v = initArrayByTypeCheck(v);
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
