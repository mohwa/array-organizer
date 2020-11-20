// // eslint-disable-next-line import/no-unresolved
// import { type } from 'emnida';
// import {
//   toArray,
//   of,
//   concat,
//   copyWithin,
//   entries,
//   every,
//   fill,
//   filter,
//   find,
//   findIndex,
//   search,
//   searchIndex,
//   flat,
//   flatMap,
//   forEach,
//   includes,
//   indexOf,
//   lastIndexOf,
//   join,
//   map,
//   pop,
//   push,
//   reduce,
//   reduceRight,
//   reverse,
//   shift,
//   unshift,
//   slice,
//   some,
//   sort,
//   asc,
//   desc,
//   splice,
//   preInsert,
//   insert,
//   replace,
//   remove,
//   removeAll,
//   toLocale,
//   keys,
//   values,
//   lastIndex,
//   shuffle,
// } from '../lib';
// import { getGlobalObject } from '../lib/_utils';
//
// const { isNumber } = type;
// const globalObject = getGlobalObject();
//
// // console.log(toArray('')); // []
// // console.log(toArray('  ')); // ['', '']
// // console.log(toArray('test')); // [t, e, s, t]
// // console.log(toArray([1, 2, 3]));
// // console.log(toArray({ x: 1, y: 2, z: 3 }));
// // console.log(toArray({}));
// // console.log(toArray([]));
// // console.log(toArray(undefined));
// // console.log(toArray(null));
// // console.log(toArray(true));
// // console.log(
// //   toArray(
// //     [1, 2, 3],
// //     function(v) {
// //       return { v, vv: this };
// //     },
// //     { x: 1 }
// //   )
// // );
// // console.log(
// //   JSON.stringify(
// //     toArray(
// //       [1, 2, 3],
// //       function(v) {
// //         return { v, vv: this };
// //       },
// //       { x: 1 }
// //     )
// //   )
// // );
// //
// // function iteratorArgument() {
// //   console.log(toArray(arguments));
// // }
// //
// // iteratorArgument(1, 2, 5555);
// //
// // // function* gen1() {
// // //   yield 1;
// // // }
// // // console.log(toArray(gen1())); // 1
// //
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
// //
// console.log(of(1, 2, 3, 4));
// console.log(of({ x: 1 }, { x: 2 }, { x: 3 }));
//
// // console.log(concat([1], [2], [3], [4]));
// // console.log(concat([1], { x: 1 }, { x: 2 }, { x: 3 }));
//
// console.log(concat({ x: 1, y: 2 }, { z: 2 }, { d: 33 }));
// console.log(concat([44, 55, 66], [1, 3, 4], { x: 88, zz: 111 }));
//
// console.log(copyWithin([1, '2', 3], 1, 2, 0)); // [2, 3, 3]
// console.log(copyWithin({ x: 1, y: '2', z: 3 }, 1, 2, 0)); // [2, 3, 3]
//
// console.log(entries([1, 2, 3]));
// console.log(entries({ x: 1, y: '2', z: 3 }).next());
// // //
// console.log(every([1, 2, 3], vv => isNumber(vv))); // true
// console.log(every({ x: 1, y: 2, z: 3 }, vv => isNumber(vv))); // true
// // console.log(every([1, 2, 3], v => v === 1)); // false
// // //
// console.log(fill([1, 2, 3, 4], 7, 2)); // [1, 2, 7, 7]
// console.log(fill([1, 2, 3, 4], 7)); // [7, 7, 7, 7]
// console.log(fill({ x: 11, y: 22, z: 33 }, 7, 0, 1)); // [ 7, 7, { v: 33, k: 'z' } ]
// // //
// console.log(filter([1, 2, 3], v => v === 2)); // [2]
// console.log(filter({ x: 11, y: 22, z: 33 }, v => v === 33)); // [33]
//
// console.log(find(['1', 2, 3], v => isNumber(v))); // 2
// console.log(find({ x: 11, y: 22, z: 33 }, v => isNumber(v))); // 11
// // //
// // console.log(findIndex(['1', 2, 3], v => isNumber(v))); // 1
// //
// // console.log(search(['1', 2, 3], 3)); // 3
// // console.log(searchIndex(['1', 2, 3], '1')); // 0
// //
// console.log(flat(['1', [2, 3, 4], [5, 6, 2, [8, 9]]], 2)); // [1, 2, 3, 4, 5, 6, 7, 8, 9]
// console.log(flat({ x: 1, y: 2, yy: { zz: 3 } })); // [1, 2, 3, 4, 5, 6, 7, 8, 9]
// // console.log(flatMap(['1', [2, 3, 4], [5, 6, 7, [8, 9]]], v => v.slice(0))); // [1, 2, 3, 4, 5, 6, 7, [8, 9]]
// //
// forEach([1, 2, 3], v => console.log(v));
// forEach({ x: 1, y: 2, yy: { zz: 3 } }, v => console.log(v));
//
// console.log(includes([1, 2, 3], 2));
// console.log(includes({ x: 1, y: 2, yy: { zz: 3 } }, 44));
// //
// // const o1 = { x: 1 };
// // console.log(includes([o1, 2, 3], o1));
// //
// console.log(indexOf([1, 2, 3], 3)); // 2
// console.log(indexOf({ x: 1, y: 2, yy: 44 }, 44)); // 2
// //
// // const o2 = { x: 1 };
// // console.log(indexOf([o2, 2, 3], o2)); // 0
// // console.log(lastIndexOf([1, 2, 3], 2)); // 1
// //
// console.log(join([1, 2, 3], ';')); // 1;2;3
// console.log(join({ x: 1, y: 2, yy: 44 }, ';')); // 1;2;3
// //
// map([1, 2, 3], v => console.log(v)); // 1, 2, 3
// map({ x: 1, y: 2, yy: 44 }, v => console.log(v)); // 1, 2, 3
//
// const a1 = [1, 2, 3];
// const o1 = { x: 1, y: 2, yy: 44 };
//
// console.log(pop(a1)); // [1, 2]
// console.log(pop(o1));
// //
// // const a2 = [1, 2, 3];
// // push(a2, 4);
// //
// // console.log(a2); // [1, 2, 3, 4]
// //
// // console.log(
// //   reduce(
// //     [1, 2, 3],
// //     (acc, v) => {
// //       acc.push(v);
// //       return acc;
// //     },
// //     []
// //   )
// // ); // [1, 2, 3]
// //
// // console.log(
// //   reduceRight(
// //     [1, 2, 3],
// //     (acc, v) => {
// //       acc.push(v);
// //       return acc;
// //     },
// //     []
// //   )
// // ); // [3, 2, 1]
// //
// // console.log(reverse([1, 2, 3])); // [3, 2, 1]
// //
// const a3 = [1, 2, 3];
// console.log(shift(a3, 11));
// //
// // const a4 = [1, 2, 3];
// // unshift(a4, 11);
// //
// // console.log(a4); // [11, 1, 2, 3]
// //
// console.log(slice([1, 2, 3], 1)); // [2, 3]
// //
// // console.log(some([1, 2, 3], v => v === 2)); // true
// // console.log(some([1, 2, 3], v => v === 4)); // false
// //
// // console.log(
// //   sort([4, 3, 22, 1], (v, vv) => {
// //     return v - vv;
// //   })
// // );
// //
// // console.log(
// //   asc([4, 3, 22, 1], (v, vv) => {
// //     return v - vv;
// //   })
// // );
// // console.log(asc(['d', null, 0xff, true, { x: 1 }, 'ee', new Map(), 't', 0]));
// //
// // console.log(asc({ x: 'd', y: null, z: 0xff }));
//
// // console.log(desc(['d', true, undefined, 0xff, 'ee', [], 2e4, () => {}, 't', 0]));
// // console.log(
// //   desc([4, 3, 22, 1], (v, vv) => {
// //     return v - vv;
// //   })
// // );
//
// console.log(splice([1, 2, 3, 4], 0, 1));
// //
// const a6 = [1, 2, 3, 4];
// console.log(preInsert(a6, 11));
// console.log(preInsert({ xx: 22, yy: 33 }, 3));
// //
// // const a7 = [1, 2, 3, 4];
// // insert(a7, 1, 22);
// //
// // console.log(a7); // [1, 22, 2, 3, 4]
// //
// // const a8 = [1, 2, 3, 4];
// // replace(a8, 2, 33, 'ADD');
// //
// // console.log(a8); // [1, 2, 33, 'ADD', 4]
// //
// // const a9 = [1, 2, 3, 4];
// // remove(a9, 3);
// //
// // console.log(a9); // [1, 2, 3]
// //
// // const a10 = [1, 2, 3, 4];
// // removeAll(a10, 1);
// //
// // console.log(a10); // [1]
// //
// // console.log(toLocale([1, 'a', new Date('21 Dec 1997 14:12:00 UTC')], 'en', { timeZone: 'UTC' }));
// //
// // console.log(keys([1, 2, 3, 4]));
// // console.log(values([1, 2, 3, 4]));
// //
// // console.log(lastIndex([1, 2, 3, 4])); // 3
// // console.log(shuffle([1, 2, 3, 4])); // random
// //
// // if (globalObject.Map) {
// //   const m1 = new Map();
// //   m1.set('x', 1);
// //   m1.set('y', 2);
// //   m1.set('z', 3);
// //   console.log(toArray(m1));
// // }
// //
// // if (globalObject.Set) {
// //   const s1 = new Set();
// //   s1.add(1);
// //   s1.add(2);
// //   s1.add(3);
// //
// //   console.log(toArray(s1));
// // }
// // console.log(toArray(Object.toString));
// //
// // forEach([1], v => {
// //   console.log(v);
// // });
// //
// // const r = reduce(
// //   [1, 2, 3, 4, 5],
// //   (acc, v) => {
// //     acc.push(v);
// //     return acc;
// //   },
// //   []
// // );
// //
// // console.log(r);
//
// // var iterable1 = {
// //   [Symbol.iterator]() {
// //     return {
// //       arr: [1, 2, 3, 4],
// //       next() {
// //         return {
// //           done: this.arr.length === 0,
// //           value: (() => {
// //             const n = this.arr.pop();
// //             // 향위
// //             console.log(n);
// //             return n;
// //           })(),
// //         };
// //       },
// //     };
// //   },
// // };
// //
// // var iterable2 = {
// //   [Symbol.iterator]() {
// //     return {
// //       arr: [1, 2, 3, 4],
// //       next() {
// //         return {
// //           done: this.arr.length === 0,
// //           value: this.arr.pop(),
// //         };
// //       },
// //     };
// //   },
// // };
// //
// // const loop = (iterable, f) => {
// //   const iter = iterable[Symbol.iterator]();
// //
// //   do {
// //     const { done, value } = iter.next();
// //
// //     if (done) {
// //       return false;
// //     } else {
// //       f(value);
// //     }
// //     // eslint-disable-next-line no-constant-condition
// //   } while (true);
// // };
// //
// // loop(iterable2, v => console.log(v));
