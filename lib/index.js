import { isPlainObject, isArray, isFunction, isNumber, isEmpty, isSet } from 'emnida/type';
import { _from } from './_utils';

function toArrayWithPureValue(v, _this) {
  const ret = [];

  toArray(
    v,
    (v, k) => {
      ret.push({ v, k });
    },
    _this
  );

  return ret;
}

function getTargetIndex(v, t) {
  if (isNumber(t)) {
    return t;
  }
  return findIndex(toArray(v), vv => vv === t);
}

export function toArray(v, f, _this) {
  if (isArray(v)) return v;

  switch (true) {
    case !isEmpty(v?.length): {
      return _from(v, f, _this);
    }
    default: {
      const _f = f?.bind(_this);
      let arr;

      if (v?.forEach) {
        let i = -1;
        arr = [];

        v.forEach((vv, k) => {
          i = isSet(v) ? ++i : k;

          arr.push(vv);
          _f?.(vv, i);
        });
        return arr;
      } else {
        for (const k in v) {
          arr = arr ? arr : [];
          const vv = v[k];
          arr.push(vv);
          _f?.(vv, k);
        }
      }
    }
  }
}

export function of(v) {
  return Array.of(toArray(v));
}

export function concat(v, vv) {
  return toArray(v).concat(vv);
}

export function replace(v, t, start) {
  return copyWithin(v, t, start, start);
}

export function copyWithin(v, t, start, end = v.length) {
  const _v = toArray(v);

  const targetIndex = getTargetIndex(_v, t);
  const startIndex = getTargetIndex(_v, start);
  const endIndex = getTargetIndex(_v, end);

  return _v.copyWithin(targetIndex, startIndex, endIndex + 1);
}

export function entries(v) {
  return toArray(v).entries();
}

export function every(v, f, _this) {
  return toArray(v).every(f, _this);
}

export function fill(v, fillValue, startIndex, endIndex = v.length) {
  return toArray(v).fill(fillValue, startIndex, endIndex);
}

export function filter(v, f, _this) {
  return toArray(v).filter(f, _this);
}

export function find(v, f, _this) {
  return toArray(v).find(f, _this);
}

export function findIndex(v, f, _this) {
  return toArray(v).findIndex(f, _this);
}

export function search(v, vv, _this) {
  return toArray(v).find(v => v === vv, _this);
}

export function searchIndex(v, vv, _this) {
  return toArray(v).findIndex(v => v === vv, _this);
}

export function flat(v, depth) {
  return toArray(v).flat(depth);
}

export function flatMap(v, f, _this) {
  return toArray(v).flatMap(f, _this);
}

export function forEach(v, f, _this) {
  return toArray(v).forEach(f, _this);
}

export function includes(v, vv, fromIndex) {
  return toArrayWithPureValue(v).includes(vv, fromIndex);
}

export function indexOf(v, fromIndex) {
  return toArrayWithPureValue(v).indexOf(v, fromIndex);
}

export function join(v) {
  return toArrayWithPureValue(v).join(v);
}

export function lastIndexOf(v, fromIndex) {
  return toArrayWithPureValue(v).lastIndexOf(v, fromIndex);
}

export function keys(v) {
  return toArray(v).keys();
}

export function map(v, f, _this) {
  return toArray(v).map(f, _this);
}

export function pop(v) {
  return toArray(v).pop();
}

export function push(v, vv) {
  return toArray(v).push(vv);
}

export function reduce(v, f, initValue) {
  return toArray(v).reduce(f, initValue);
}

export function reduceRight(v, f, initValue) {
  return toArray(v).reduceRight(f, initValue);
}

export function reverse(v) {
  return toArray(v).reverse();
}

export function shift(v) {
  return toArray(v).shift();
}

export function slice(v, startIndex, endIndex = v.length) {
  return toArray(v).slice(startIndex, endIndex + 1);
}

export function some(v, f, _this) {
  return toArray(v).some(f, _this);
}

export function sort(v) {
  return toArrayWithPureValue(v).sort();
}

export function splice(v, startIndex, endIndex, ...args) {
  return toArray(v).splice(startIndex, endIndex, ...args);
}

export function remove(v, t) {
  const _v = toArray(v);
  const targetIndex = getTargetIndex(_v, t);

  return splice(_v, targetIndex, 0);
}

export function removeWithin(v, startIndex, endIndex = v.length) {
  return splice(v, startIndex, endIndex + 1);
}

export function insert(v, t, ...args) {
  const _v = toArray(v);
  const targetIndex = getTargetIndex(_v, t);

  return splice(_v, targetIndex, 0, ...args);
}

export function preInsert(v, ...args) {
  return toArray(v).splice(0, 0, ...args);
}

export function toLocaleString(v, locales, options) {
  return toArrayWithPureValue(v).toLocaleString(locales, options);
}

export function toString(v) {
  return toArrayWithPureValue(v).toString();
}

export function unshift(v, ...args) {
  return toArray(v).unshift(...args);
}

export function values(v) {
  return toArray(v).values();
}

export function clone(v) {
  if (isPlainObject(v)) {
    return Object.assign({}, v);
  } else if (isArray(v)) {
    return reduce(
      v,
      (acc, vv) => {
        acc.push(vv);
        return acc;
      },
      []
    );
  }
}

export function cloneDeep(v) {
  const stacks = [{ v }];
  let stack;
  let ret;

  while ((stack = stacks.pop())) {
    const { backStack, backKey, v } = stack;

    switch (true) {
      case isPlainObject(v) || isArray(v): {
        forEach(v, (vv, k) => {
          stacks.push({ backStack: v, backKey: k, v: vv });
        });
        break;
      }
      case isFunction(v): {
        let context;

        if (isPlainObject(backStack)) {
          context = backStack;
        }

        backStack[backKey] = v.bind(context);
        break;
      }
      default: {
        backStack[backKey] = v;
        break;
      }
    }
    ret = backStack;
  }
  return ret;
}

/**
 * 전달받은 Array 객체를 무작위로 다시 섞는다.
 */
export function shuffle(v) {
  const length = v.length;

  for (let i = length; --i; ) {
    const r = Math.floor(Math.random() * i);
    const ii = i - 1;

    const tmp = v[ii];
    v[ii] = v[r];
    v[r] = tmp;
  }

  return v;
}
