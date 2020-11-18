import { isNumber } from 'emnida/type';
import { toArray, of, forEach, reduce, concat, copyWithin, entries, every, fill } from '../lib';
import { getGlobalObject } from '../lib/_utils';

const globalObject = getGlobalObject();

console.log(toArray(''));
console.log(toArray('test'));
console.log(toArray([1, 2, 3]));
console.log(toArray({ x: 1, y: 2, z: 3 }));
console.log(toArray({}));
console.log(toArray([]));
console.log(toArray(undefined));
console.log(toArray(null));
console.log(toArray(true));
console.log(toArray(Symbol(1)));

console.log(of(1, 2, 3, 4));
console.log(of({ x: 1 }, { x: 2 }, { x: 3 }));

console.log(concat([1], [2], [3], [4]));
console.log(concat([1], { x: 1 }, { x: 2 }, { x: 3 }));

console.log(copyWithin([1, '2', 3], [1, 2], 0)); // [2, 3, 3]

console.log(entries([1, 2, 3]));

console.log(every([1, 2, 3], v => isNumber(v))); // true
console.log(every([1, 2, 3], v => v === 1)); // false

console.log(fill([1, 2, 3, 4], 7, 2)); // [1, 2, 7, 7]
console.log(fill([1, 2, 3, 4], 7)); // [7, 7, 7, 7]
console.log(fill({ x: 11, y: 22, z: 33 }, 7, 0, 1)); // [ 7, 7, { v: 33, k: 'z' } ]

if (globalObject.Map) {
  const m1 = new Map();
  m1.set('x', 1);
  m1.set('y', 2);
  m1.set('z', 3);
  console.log(toArray(m1));
}

if (globalObject.Set) {
  const s1 = new Set();
  s1.add(1);
  s1.add(2);
  s1.add(3);

  console.log(toArray(s1));
}

console.log(toArray(Object.toString));

forEach([1], v => {
  console.log(v);
});

const r = reduce(
  [1, 2, 3, 4, 5],
  (acc, v) => {
    acc.push(v);
    return acc;
  },
  []
);

console.log(r);

// var iterable1 = {
//   [Symbol.iterator]() {
//     return {
//       arr: [1, 2, 3, 4],
//       next() {
//         return {
//           done: this.arr.length === 0,
//           value: (() => {
//             const n = this.arr.pop();
//             // 향위
//             console.log(n);
//             return n;
//           })(),
//         };
//       },
//     };
//   },
// };
//
// var iterable2 = {
//   [Symbol.iterator]() {
//     return {
//       arr: [1, 2, 3, 4],
//       next() {
//         return {
//           done: this.arr.length === 0,
//           value: this.arr.pop(),
//         };
//       },
//     };
//   },
// };
//
// const loop = (iterable, f) => {
//   const iter = iterable[Symbol.iterator]();
//
//   do {
//     const { done, value } = iter.next();
//
//     if (done) {
//       return false;
//     } else {
//       f(value);
//     }
//     // eslint-disable-next-line no-constant-condition
//   } while (true);
// };
//
// loop(iterable2, v => console.log(v));
