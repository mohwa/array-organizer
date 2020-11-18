import emnida from 'emnida';
import { _from, _of, _copyWithin, _fill, _find, _findIndex, _flat, _flatMap, _includes } from './polyfill';

const {
  type: { isArray, isEmpty, isSet },
} = emnida;

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

        v.forEach((vv, k) => {
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

export function of(...args) {
  return _of(...args);
}

export function concat(v, ...args) {
  return toArray(v).concat(...args);
}

export function copyWithin(v, t, d) {
  const [start, end] = t;
  return _copyWithin(toArray(v), d, start, end + 1);
}

export function entries(v) {
  if (Array.prototype.entries) {
    return v.entries();
  }
}

export function every(v, ...args) {
  return toArray(v).every(...args);
}

export function fill(v, vv, start, end = v.length) {
  return _fill(toArray(v), vv, start, end + 1);
}

export function filter(v, ...args) {
  return toArray(v).filter(...args);
}

export function find(v, ...args) {
  return _find(toArray(v), ...args);
}

export function findIndex(v, ...args) {
  return _findIndex(toArray(v), ...args);
}

export function search(v, t, _this) {
  return find(v, vv => vv === t, _this);
}

export function searchIndex(v, t, _this) {
  return findIndex(v, vv => vv === t, _this);
}

export function flat(v, ...args) {
  return _flat(toArray(v), ...args);
}

export function flatMap(v, ...args) {
  return _flatMap(toArray(v), ...args);
}

export function forEach(v, ...args) {
  return toArray(v).forEach(...args);
}

export function includes(v, ...args) {
  return _includes(toArray(v), ...args);
}

export function indexOf(v, ...args) {
  return toArray(v).indexOf(...args);
}

export function join(v, ...args) {
  return toArray(v).join(...args);
}

export function lastIndexOf(v, ...args) {
  return toArray(v).lastIndexOf(...args);
}

export function map(v, ...args) {
  return toArray(v).map(...args);
}

export function pop(v) {
  return toArray(v).pop();
}

export function push(v, ...args) {
  return toArray(v).push(...args);
}

export function reduce(v, ...args) {
  return toArray(v).reduce(...args);
}

export function reduceRight(v, ...args) {
  return toArray(v).reduceRight(...args);
}

export function reverse(v) {
  return toArray(v).reverse();
}

export function shift(v) {
  return toArray(v).shift();
}

export function slice(v, start, end = v.length) {
  return toArray(v).slice(start, end + 1);
}

export function some(v, ...args) {
  return toArray(v).some(...args);
}

export function sort(v, ...args) {
  return toArray(v).sort(...args);
}

export function splice(v, ...args) {
  return toArray(v).splice(...args);
}

export function preInsert(v, ...args) {
  return splice(v, 0, 0, ...args);
}

export function insert(v, t, ...args) {
  return splice(v, t, 0, ...args);
}

export function replace(v, t, ...args) {
  return splice(v, t, 1, ...args);
}

export function remove(v, t) {
  return splice(v, t, 1);
}

export function removeAll(v, t) {
  return splice(v, t);
}

export function toLocaleString(v, ...args) {
  return toArray(v).toLocaleString(...args);
}

export function toString(v) {
  return toArray(v).toString();
}

export function unshift(v, ...args) {
  return toArray(v).unshift(...args);
}

export function keys(v) {
  const _v = toArray(v);

  if (Array.prototype.keys) {
    return _v.keys();
  }
  return _v;
}

export function values(v) {
  const _v = toArray(v);

  if (Array.prototype.values) {
    return _v.values();
  }
  return _v;
}

export function lastIndex(v) {
  const { length } = toArray(v);
  return length > 0 ? length - 1 : 0;
}

// 전달받은 Array 객체를 무작위로 다시 섞는다.
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
