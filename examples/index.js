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
  reduce,
  forEach,
  concat,
  indexOf,
  lastIndexOf,
  keys,
  values,
  join,
  unshift,
  push,
  insertBefore,
  insertAfter,
} from '../lib';

const { isNumber } = type;

forEach('', (v, k) => {
  console.log(v, k);
});

forEach('  ', (v, k) => {
  console.log(v, k);
});

forEach('test', (v, k) => {
  console.log(v, k);
});

forEach([1, 2, 3], (v, k) => {
  console.log(v, k);
});

forEach({ x: 1, y: 2, z: 3 }, (v, k) => {
  console.log(v, k);
});

// This data can not loop
forEach({}, (v, k) => {
  console.log(v, k);
});

// This data can not loop
forEach([], (v, k) => {
  console.log(v, k);
});

// This data can not loop
forEach(undefined, (v, k) => {
  console.log(v, k);
});

// This data can not loop
forEach(null, (v, k) => {
  console.log(v, k);
});

// This data can not loop
forEach(true, (v, k) => {
  console.log(v, k);
});

const fn1 = function(x, y) {};

fn1.x = 1;
fn1.y = 2;
fn1.z = 3;

forEach(fn1, (v, k) => {
  console.log(v, k);
});

console.log(concat({ x: 1, y: 2, z: 3 }, { xx: 1, yy: 2, zz: 3 }, function() {}, true, false, {}, []));

try {
  console.log(
    concat(
      { x: 1, y: 2, z: 3 },
      { xx: 1, yy: 2, zz: 3 },
      function() {},
      true,
      false,
      {},
      [],
      new Map([['x', 1]]),
      new Set([11, 22, 33]),
      'test',
      (function*() {
        yield 88;
      })()
    )
  );
} catch (e) {
  console.log(e.message);
}

console.log(concat({ x: 1, y: 2, z: 3 }, { xx: 1, yy: 2, zz: 3 }, { xxx: 1, yyy: 2, zzz: 3 }));

console.log(toArray({ x: 1, y: 2, z: '3' }).every(({ v, k }, i) => typeof v === 'number')); // false
console.log(
  toArray({ x: 'spray', y: 'limit', z: 'elite', xx: 'exuberant', yy: 'destruction', zz: 'present' }).filter(
    ({ v, k }) => v.length > 6
  )
); // [{ k: "xx", v: "exuberant" }, { k: "yy", v: "destruction" }, { k: "zz", v: "present" }]
console.log(join({ x: 1, y: 2, z: 3 }, '-')); // 1-2-3

// eslint-disable-next-line no-sparse-arrays
console.log(keys([1, , 3])); // [0, 1, 2]
console.log(keys({ x: 1, y: 2, z: 3 })); // ['x', 'y', 'z']

console.log(values([1, , 3])); // [1, undefined, 3]
console.log(values({ x: 1, y: 2, z: 3 })); // [1, 2, 3]

const popArr = toArray({ x: 1, y: 2, z: 3 });
popArr.pop();

console.log(popArr); // [{ k: "x", v: 1 }, { k: "y", v: 2 }]

const pushArr = toArray({ x: 1, y: 2, z: 3 });
pushArr.push({ xx: 4 });

console.log(pushArr); // [{ k: "x", v: 1 }, { k: "y", v: 2 }, { k: "z", v: 3 }, { xx: 4 }]

console.log(toArray({ x: 1, y: 2, z: 3 }).reverse()); // [{ k: "z", v: 3 }, { k: "y", v: 2 }, { k: "x", v: 1 }]

const shiftArr = toArray({ x: 1, y: 2, z: 3 });
shiftArr.shift();

console.log(shiftArr); // [{ k: "y", v: 2 }, { k: "z", v: 3 }]

console.log(toArray({ x: '1', y: '2', z: 3 }).some(({ v, k }, i) => typeof v === 'number')); // true

const unShiftArr = toArray({ x: 1, y: 2, z: 3 });
unShiftArr.unshift({ xx: 4 });

console.log(unShiftArr); // [{ xx: 4 }, { k: "x", v: 1 }, { k: "y", v: 2 }, { k: "z", v: 3 }]

try {
  forEach(
    new Map([
      ['x', 1],
      ['y', 2],
      ['z', 3],
    ]),
    v => console.log(v)
  );
  forEach(new Set([1, 2, 3]), v => console.log(v)); // 1, 2, 3
} catch (e) {
  console.log(e.message);
}

console.log(indexOf([1, 2, 3], 2)); // 1
console.log(indexOf({ x: 1, y: 2, yy: { zz: 3 } }, 44)); // -1

console.log(lastIndexOf([1, 2, 3], 2)); // 1
console.log(lastIndexOf({ x: 1, y: 2, yy: { zz: 3 } }, 44)); // -1

console.log(toArray('')); // []
console.log(toArray('  ')); // ['', '']
console.log(toArray('test')); // [t, e, s, t]
console.log(toArray([1, 2, 3]));
console.log(toArray({ x: 1, y: 2, z: 3 })); // [{ k: 'x', v: 1}, { k: 'y', v: 2}, { k: 'z', v: 3}]
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

const fn2 = function(x, y) {};

fn2.x = 1;
fn2.y = 2;
fn2.z = 3;

console.log(toArray(fn2));

console.log(toArray({ x: 1, y: 2, z: 3 }).concat({ xx: 1, yy: 2, zz: 3 }));

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

console.log(copyWithin([1, '2', 3], 0)); // [2, 3, 3]
console.log(copyWithin({ x: 1, y: '2', z: 3 }, 0, 1, 2)); // [2, 3, 3]

console.log(fill([1, 2, 3, 4], 77777)); // [1, 2, 7, 7]
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
console.log(flatMap(['1', [2, 3, 4]], v => [...v, 444])); // ["1", 444, 2, 3, 4, 444]

console.log(includes([1, 2, 3], 2));
console.log(includes({ x: 1, y: 2, yy: { zz: 3 } }, 44));

try {
  console.log(asc(['d', null, 0xff, true, { x: 1 }, 'ee', new Map(), 't', 0]));
} catch (e) {
  console.log(e.message);
}

console.log(asc({ x: 'd', y: null, z: 0xff }));

console.log(desc([5, 3, 4, 6, 1, 2])); // [5, 3, 4, 6, 1, 2]
console.log(desc(['d', true, undefined, 0xff, 'ee', [], 2e4, () => {}, 't', 0]));

console.log(insert([1, 2, 3, 4], 1, 22));
console.log(insert([1, 2, 3, 4], 1, 22, 44, 55));

console.log(replace([1, 2, 3, 4], 2, 33, 'ADD'));

console.log(remove([1, 2, 3, 4], 3));
console.log(removeAll([1, 2, 3, 4], 1));

console.log(lastIndex([1, 2, 3, 4])); // 3
console.log(shuffle([1, 2, 3, 4])); // random

console.log(deepFind([{ x: { xx: { y: 3, z: 'A' } }, y: () => {} }], v => isNumber(v)));

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

console.log(
  reduce(
    [1, 2, 3, 4],
    (acc, v, k) => {
      acc[k] = v;
      return acc;
    },
    []
  )
);

console.log(
  reduce(
    [{ x: 1 }, { y: 2 }, { z: 3 }],
    (acc, v, k) => {
      acc[k] = v;
      return acc;
    },
    {}
  )
);

console.log(
  reduce(
    { x: 1, y: 2, z: 3, xx: 11, yy: 22, zz: 33 },
    (acc, v, k) => {
      acc[k] = v;
      return acc;
    },
    {}
  )
);

console.log(
  reduce(
    undefined,
    (acc, v, k) => {
      acc[k] = v;
      return acc;
    },
    {}
  )
);

console.log(unshift([], 11, 22, 33));
console.log(unshift([1, 2, 3], 11, 22, 33));

console.log(push([], 11, 22, 33));
console.log(push([1, 2, 3], 11, 22, 33));

console.log(insertBefore([1, 2, 3], -1, 22, 33));
console.log(insertBefore([1, 2, 3], 88, 22, 33));
console.log(insertBefore([1, 2, 3], 2, 22, 33));

console.log(insertAfter([1, 2, 3], -1, 22, 33));
console.log(insertAfter([1, 2, 3], 88, 22, 33));
console.log(insertAfter([1, 2, 3], 1, 22, 33));
