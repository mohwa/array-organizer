// // // eslint-disable-next-line import/no-unresolved
// import { type } from 'emnida';
// import {
//   toArray,
//   of,
//   copyWithin,
//   fill,
//   filter,
//   find,
//   findIndex,
//   search,
//   searchIndex,
//   flat,
//   flatMap,
//   lastIndexOf,
//   asc,
//   desc,
//   splice,
//   preInsert,
//   insert,
//   replace,
//   remove,
//   removeAll,
//   lastIndex,
//   shuffle,
// } from '../lib';
// import { getGlobalObject } from '../lib/_utils';
//
// const { isNumber } = type;
// const globalObject = getGlobalObject();
//
// console.log(toArray('')); // []
// console.log(toArray('  ')); // ['', '']
// console.log(toArray('test')); // [t, e, s, t]
// console.log(toArray([1, 2, 3]));
// console.log(toArray({ x: 1, y: 2, z: 3 }));
// console.log(toArray({}));
// console.log(toArray([]));
// console.log(toArray(undefined));
// console.log(toArray(null));
// console.log(toArray(true));
// console.log(
//   toArray(
//     [1, 2, 3],
//     function(v) {
//       return { v, vv: this };
//     },
//     { x: 1 }
//   )
// );
// console.log(
//   JSON.stringify(
//     toArray(
//       [1, 2, 3],
//       function(v) {
//         return { v, vv: this };
//       },
//       { x: 1 }
//     )
//   )
// );
//
// function iteratorArgument() {
//   console.log(toArray(arguments));
// }
//
// iteratorArgument(1, 2, 5555);
//
// // function* gen1() {
// //   yield 1;
// // }
// // console.log(toArray(gen1())); // 1
//
// // try {
// //   const m1 = new Map();
// //   m1.set('x', 1);
// //   m1.set('y', 2);
// //   m1.set('z', 3);
// //   console.log(toArray(m1));
// //
// //   const m2 = new Map([[1, 2], [2, 4], [4, 8]]);
// //   console.log(toArray(m2));
// //
// //   const s1 = new Set();
// //   s1.add(1);
// //   s1.add(2);
// //   s1.add(3);
// //   console.log(toArray(s1));
// // } catch (e) {
// //   console.log(e.message);
// // }
//
// console.log(of(1, 2, 3, 4));
// console.log(of({ x: 1 }, { x: 2 }, { x: 3 }));
//
// // console.log(concat([1], [2], [3], [4]));
// // console.log(concat([1], { x: 1 }, { x: 2 }, { x: 3 }));
//
// console.log(copyWithin([1, '2', 3], 0, 1, 2)); // [2, 3, 3]
// console.log(copyWithin({ x: 1, y: '2', z: 3 }, 0, 1, 2)); // [2, 3, 3]
// //
// console.log(fill([1, 2, 3, 4], 7, 2)); // [1, 2, 7, 7]
// console.log(fill([1, 2, 3, 4], 7)); // [7, 7, 7, 7]
// console.log(fill({ x: 11, y: 22, z: 33 }, 7, 0, 1)); // [ 7, 7, { v: 33, k: 'z' } ]
// // //
// console.log(filter([1, 2, 3], v => v === 2)); // [2]
// console.log(filter({ x: 11, y: 22, z: 33 }, ({ v }) => v === 33)); // [33]
//
// console.log(find(['1', 2, 3], v => isNumber(v))); // 2
// console.log(find({ x: 11, y: 22, z: 33 }, ({ v }) => isNumber(v))); // 11
// // //
// console.log(findIndex(['1', 2, 3], v => isNumber(v))); // 1
// console.log(findIndex({ x: 11, y: 22, z: 33 }, ({ v }) => isNumber(v))); // 11
// //
// // console.log(search(['1', 2, 3], 3)); // 3
// // console.log(searchIndex(['1', 2, 3], '1')); // 0
// //
// console.log(flat(['1', [2, 3, 4], [5, 6, 2, [8, 9]]], 2)); // [1, 2, 3, 4, 5, 6, 7, 8, 9]
// console.log(flat({ x: 1, y: 2, yy: { zz: 3 } })); // [1, 2, 3, 4, 5, 6, 7, 8, 9]
// // console.log(flatMap(['1', [2, 3, 4], [5, 6, 7, [8, 9]]], v => v.slice(0))); // [1, 2, 3, 4, 5, 6, 7, [8, 9]]
// //
// // const o2 = { x: 1 };
// // console.log(indexOf([o2, 2, 3], o2)); // 0
// // console.log(lastIndexOf([1, 2, 3], 2)); // 1
// //
// console.log(
//   asc([4, 3, 22, 1], (v, vv) => {
//     return v - vv;
//   })
// );
// // console.log(asc(['d', null, 0xff, true, { x: 1 }, 'ee', new Map(), 't', 0]));
//
// console.log(asc({ x: 'd', y: null, z: 0xff }));
//
// console.log(desc(['d', true, undefined, 0xff, 'ee', [], 2e4, () => {}, 't', 0]));
// console.log(
//   desc([4, 3, 22, 1], (v, vv) => {
//     return v - vv;
//   })
// );
//
// console.log(splice([1, 2, 3, 4], 0, 1));
// //
// const a6 = [1, 2, 3, 4];
// console.log(preInsert([1, 2, 3, 4], 11));
// console.log(preInsert({ xx: 22, yy: 33 }, 3));
//
// const a7 = [1, 2, 3, 4];
// insert([1, 2, 3, 4], 1, 22);
//
// console.log(a7); // [1, 22, 2, 3, 4]
//
// const a8 = [1, 2, 3, 4];
// replace([1, 2, 3, 4], 2, 33, 'ADD');
//
// console.log(a8); // [1, 2, 33, 'ADD', 4]
//
// const a9 = [1, 2, 3, 4];
// remove([1, 2, 3, 4], 3);
//
// console.log(a9); // [1, 2, 3]
//
// const a10 = [1, 2, 3, 4];
// removeAll([1, 2, 3, 4], 1);
//
// console.log(a10); // [1]
//
// console.log(lastIndex([1, 2, 3, 4])); // 3
// console.log(shuffle([1, 2, 3, 4])); // random
//
// if (globalObject.Map) {
//   const m1 = new Map();
//   m1.set('x', 1);
//   m1.set('y', 2);
//   m1.set('z', 3);
//   console.log(toArray(m1));
// }
//
// if (globalObject.Set) {
//   const s1 = new Set();
//   s1.add(1);
//   s1.add(2);
//   s1.add(3);
//
//   console.log(toArray(s1));
// }
// console.log(toArray(Object.toString));
// //
// // // var iterable1 = {
// // //   [Symbol.iterator]() {
// // //     return {
// // //       arr: [1, 2, 3, 4],
// // //       next() {
// // //         return {
// // //           done: this.arr.length === 0,
// // //           value: (() => {
// // //             const n = this.arr.pop();
// // //             // 향위
// // //             console.log(n);
// // //             return n;
// // //           })(),
// // //         };
// // //       },
// // //     };
// // //   },
// // // };
// // //
// // // var iterable2 = {
// // //   [Symbol.iterator]() {
// // //     return {
// // //       arr: [1, 2, 3, 4],
// // //       next() {
// // //         return {
// // //           done: this.arr.length === 0,
// // //           value: this.arr.pop(),
// // //         };
// // //       },
// // //     };
// // //   },
// // // };
// // //
// // // const loop = (iterable, f) => {
// // //   const iter = iterable[Symbol.iterator]();
// // //
// // //   do {
// // //     const { done, value } = iter.next();
// // //
// // //     if (done) {
// // //       return false;
// // //     } else {
// // //       f(value);
// // //     }
// // //     // eslint-disable-next-line no-constant-condition
// // //   } while (true);
// // // };
// // //
// // // loop(iterable2, v => console.log(v));
