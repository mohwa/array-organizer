import { isArray, isNumber, isEmpty, isSet } from 'emnida/type';
import { _from, _of, _copyWithin, _entries, _fill, _find, _findIndex, _flat, _flatMap, _includes } from './_utils';

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
      let arr;

      if (v?.forEach) {
        let i = -1;
        arr = [];

        v.forEach((vv, k) => {
          if (isSet(v)) {
            i = ++i;
            arr.push(vv);
          } else {
            i = k;
            arr.push({ v: vv, k });
          }
          _f?.(vv, i);
        });
        return arr;
      } else {
        for (const k in v) {
          const vv = v[k];
          arr = arr ? arr : [];

          arr.push({ v: vv, k });
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
  return v.concat(vv);
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
  return v.every(...args);
}

export function fill(v, ...args) {
  return _fill(v, ...args);
}

export function filter(v, ...args) {
  return v.filter(...args);
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
  return findIndex(v,_v => _v === vv, _this);
}

export function flat(v, ...args) {
  return _flat(v, ...args);
}

export function flatMap(v, ...args) {
  return _flatMap(v, ...args);
}

export function forEach(v, ...args) {
  return v.forEach(...args);
}

export function includes(v, ...args) {
  return _includes(v, ...args);
}

export function indexOf(v, ...args) {
  return v.indexOf(v, ...args);
}

export function join(v, ...args) {
  return v.join(...args);
}

export function lastIndexOf(v, ...args) {
  return v.lastIndexOf(...args);
}

export function map(v, ...args) {
  return v.map(...args);
}

export function pop(v) {
  return v.pop();
}

export function push(v, ...args) {
  return v.push(...args);
}

export function reduce(v, ...args) {
  return v.reduce(...args);
}

export function reduceRight(v, ...args) {
  return v.reduceRight(...args);
}

export function reverse(v) {
  return v.reverse();
}

export function shift(v) {
  return v.shift();
}

export function slice(v, startIndex, endIndex = v.length) {
  return v.slice(startIndex, endIndex + 1);
}

export function some(v, ...args) {
  return v.some(...args);
}

export function sort(v, ...args) {
  return v.sort(...args);
}

export function splice(v, ...args) {
  return v.splice(...args);
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
  return splice(v,0, 0, ...args);
}

export function toLocaleString(v, ...args) {
  return v.toLocaleString(...args);
}

export function toString(v) {
  return v.toString();
}

export function unshift(v, ...args) {
  return v.unshift(...args);
}

export function keys(v) {
  if (Array.prototype.keys) {
    return v.keys();
  }
  return v;
}

export function values(v) {
  if (Array.prototype.values) {
    return v.values();
  }
  return v;
}

// export function clone(v) {
//   if (isPlainObject(v)) {
//     return Object.assign({}, v);
//   } else if (isArray(v)) {
//     return reduce(
//       v,
//       (acc, vv) => {
//         acc.push(vv);
//         return acc;
//       },
//       []
//     );
//   }
// }
//
// export function cloneDeep(v) {
//   const stacks = [{ v }];
//   let stack;
//   let ret;
//
//   while ((stack = stacks.pop())) {
//     const { backStack, backKey, v } = stack;
//
//     switch (true) {
//       case isPlainObject(v) || isArray(v): {
//         forEach(v, (vv, k) => {
//           stacks.push({ backStack: v, backKey: k, v: vv });
//         });
//         break;
//       }
//       case isFunction(v): {
//         let context;
//
//         if (isPlainObject(backStack)) {
//           context = backStack;
//         }
//
//         backStack[backKey] = v.bind(context);
//         break;
//       }
//       default: {
//         backStack[backKey] = v;
//         break;
//       }
//     }
//     ret = backStack;
//   }
//   return ret;
// }

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
