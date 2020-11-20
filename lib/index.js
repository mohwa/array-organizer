import * as emnida from 'emnida';
import { _from, _of, _copyWithin, _fill, _find, _findIndex, _flat, _flatMap, _includes } from './polyfill';
import { bindToFunction, toNumber } from './_utils';

const {
  type: { isMap, isIterableObject, isEmpty, isArrayLikeObject },
  isEqual,
} = emnida;

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

export function of(...args) {
  return _of(...args);
}

export function concat(v, ...args) {
  const newArgs = args.reduce((acc, vv) => {
    acc.push(toArray(vv));
    return acc;
  }, []);

  return toArray(v).concat(...newArgs);
}

export function copyWithin(v, start, end, d) {
  return _copyWithin(toArray(v), d, start, end + 1);
}

export function entries(v) {
  if (Array.prototype.entries) {
    return toArray(v).entries();
  }
}

export function every(v, ...args) {
  return toArray(v, vv => vv).every(...args);
}

export function fill(v, vv, start, end = v.length) {
  return _fill(toArray(v), vv, start, end + 1);
}

export function filter(v, ...args) {
  return toArray(v, vv => vv).filter(...args);
}

export function find(v, ...args) {
  return _find(
    toArray(v, vv => vv),
    ...args
  );
}

export function findIndex(v, ...args) {
  return _findIndex(
    toArray(v, vv => vv),
    ...args
  );
}

export function search(v, t) {
  return find(v, vv => isEqual(t, vv));
}

export function searchIndex(v, t) {
  return findIndex(v, vv => isEqual(t, vv));
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
  return _includes(
    toArray(v, vv => vv),
    ...args
  );
}

export function indexOf(v, ...args) {
  return toArray(v, vv => vv).indexOf(...args);
}

export function lastIndexOf(v, ...args) {
  return toArray(v, vv => vv).lastIndexOf(...args);
}

export function join(v, ...args) {
  return toArray(v, vv => vv).join(...args);
}

export function map(v, ...args) {
  return toArray(v).map(...args);
}

export function pop(v) {
  const arr = toArray(v);
  arr.pop();

  return arr;
}

export function push(v, ...args) {
  const arr = toArray(v);
  arr.push(...args);

  return arr;
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
  const arr = toArray(v);
  arr.shift();

  return arr;
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

export function asc(v) {
  return toArray(v, vv => vv).sort((v1, v2) => {
    return toNumber(v1) - toNumber(v2);
  });
}

export function desc(v) {
  return toArray(v, vv => vv).sort((v1, v2) => {
    return toNumber(v2) - toNumber(v1);
  });
}

export function splice(v, ...args) {
  const arr = toArray(v);
  arr.splice(...args);

  return arr;
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

export function toLocale(v, ...args) {
  return toArray(v).toLocaleString(...args);
}

export function unshift(v, ...args) {
  const arr = toArray(v);
  arr.unshift(...args);

  return arr;
}

export function keys(v) {
  if (Array.prototype.keys) {
    return toArray(v).keys();
  }
}

export function values(v) {
  if (Array.prototype.values) {
    return toArray(v).values();
  }
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
