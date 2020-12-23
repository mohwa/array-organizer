// eslint-disable-next-line import/no-unresolved
import { type } from 'emnida';
import {
  toArray,
  of,
  copyWithin,
  fill,
  find,
  findIndex,
  search,
  searchIndex,
  flat,
  flatMap,
  asc,
  desc,
  preInsert,
  insert,
  replace,
  remove,
  removeAll,
  lastIndex,
  shuffle,
  includes,
  deepFind,
  deepSearch,
  ascBy,
  descBy,
} from '../lib';

const { isNumber } = type;

console.log(toArray('')); // []
console.log(toArray('  ')); // ['', '']
console.log(toArray('test')); // [t, e, s, t]
console.log(toArray([1, 2, 3]));
console.log(toArray({ x: 1, y: 2, z: 3 }));
console.log(toArray({}));
console.log(toArray([]));
console.log(toArray(undefined));
console.log(toArray(null));
console.log(toArray(true));
console.log(
  toArray(
    [1, 2, 3],
    function(v) {
      return { v, vv: this };
    },
    { x: 1 }
  )
);

function iteratorArgument() {
  console.log(toArray(arguments)); // [1, 2, 5555]
}

iteratorArgument(1, 2, 5555);

try {
  const m1 = new Map();
  m1.set('x', 1);
  m1.set('y', 2);
  m1.set('z', 3);
  console.log(toArray(m1));

  const s1 = new Set();
  s1.add(1);
  s1.add(2);
  s1.add(3);
  console.log(toArray(s1));
} catch (e) {
  console.log(e.message);
}
//
console.log(of(1, 2, 3, 4));
console.log(of({ x: 1 }, { x: 2 }, { x: 3 }));

console.log(copyWithin([1, '2', 3], 0, 1, 2)); // [2, 3, 3]
console.log(copyWithin({ x: 1, y: '2', z: 3 }, 0, 1, 2)); // [2, 3, 3]

console.log(fill([1, 2, 3, 4], 7, 2)); // [1, 2, 7, 7]
console.log(fill([1, 2, 3, 4], 7)); // [7, 7, 7, 7]
console.log(fill({ x: 11, y: 22, z: 33 }, 7, 0, 1)); // [ 7, 7, { v: 33, k: 'z' } ]

console.log(find(['1', 2, 3], v => isNumber(v))); // 2
console.log(find({ x: 11, y: 22, z: 33 }, ({ v }) => isNumber(v))); // 11

console.log(findIndex(['1', 2, 3], v => isNumber(v))); // 1
console.log(findIndex({ x: 11, y: 22, z: 33 }, ({ v }) => isNumber(v))); // 11
// //
console.log(search(['1', 2, 3], 3)); // 3
console.log(searchIndex(['1', 2, 3], '1')); // 0
// //
console.log(flat(['1', [2, 3, 4], [5, 6, 2, [8, 9]]], 2)); // [1, 2, 3, 4, 5, 6, 7, 8, 9]
console.log(flat({ x: 1, y: 2, yy: { zz: 3 } })); // [1, 2, 3, 4, 5, 6, 7, 8, 9]
console.log(flatMap(['1', [2, 3, 4], [5, 6, 7, [8, 9]]], v => v.slice(0))); // [1, 2, 3, 4, 5, 6, 7, [8, 9]]

console.log(includes([1, 2, 3], 2));
console.log(includes({ x: 1, y: 2, yy: { zz: 3 } }, 44));

console.log(asc(['d', null, 0xff, true, { x: 1 }, 'ee', new Map(), 't', 0]));
console.log(asc({ x: 'd', y: null, z: 0xff }));
console.log(desc(['d', true, undefined, 0xff, 'ee', [], 2e4, () => {}, 't', 0]));

console.log(preInsert([1, 2, 3, 4], 11));
console.log(preInsert({ xx: 22, yy: 33 }, 3));

console.log(insert([1, 2, 3, 4], 1, 22));

console.log(replace([1, 2, 3, 4], 2, 33, 'ADD'));

console.log(remove([1, 2, 3, 4], 3));
console.log(removeAll([1, 2, 3, 4], 1));

console.log(lastIndex([1, 2, 3, 4])); // 3
console.log(shuffle([1, 2, 3, 4])); // random

console.log(
  deepFind(
    [
      { x: 1, y: [{ yy: 44 }] },
      { x: 1, y: 5, z: { yy: 33 } },
      { x: 1, y: 22, z: [{ xx: { zz: { yy: -20 } } }] },
    ],
    v => v === -20
  )
);
// c: {yy: -20}
// k: "yy"
// v: -20
console.log(
  deepSearch(
    [
      { x: 1, y: [{ yy: 44 }] },
      { x: 1, y: 5, z: { yy: 33 } },
      { x: 1, y: 22, z: [{ xx: { zz: { yy: -20 } } }] },
    ],
    -20
  )
);

console.log(
  ascBy(
    [
      { x: 1, y: [{ yy: 44 }] },
      { x: 1, y: 5, z: { yy: 33 } },
      { x: 1, y: 22, z: [{ xx: { zz: { yy: -20 } } }] },
    ],
    'yy'
  )
);
// [
//   { x: 1, y: 22, z: [{ xx: { zz: { yy: -20 } } }],
//   { x: 1, y: 5, z: { yy: 33 } },
//   { x: 1, y: [{ yy: 44 }] },
// ]

console.log(
  descBy(
    [
      { x: 1, y: [{ yy: 33 }] },
      { x: 1, y: 5, z: { yy: 44 } },
      { x: 1, y: 22, z: [{ xx: { zz: { yy: 999 } } }] },
    ],
    'yy'
  )
);

// [
//   { x: 1, y: 22, z: [{ xx: { zz: { yy: 999 } } }] },
//   { x: 1, y: 5, z: { yy: 44 } },
//   { x: 1, y: [{ yy: 33 }] },
// ]
