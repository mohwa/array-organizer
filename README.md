# array-organizer

![npm](https://img.shields.io/npm/v/array-organizer) [![](https://data.jsdelivr.com/v1/package/npm/array-organizer/badge)](https://www.jsdelivr.com/package/npm/array-organizer) ![npm bundle size](https://img.shields.io/bundlephobia/min/array-organizer) ![npm](https://img.shields.io/npm/dm/array-organizer) ![NPM](https://img.shields.io/npm/l/array-organizer)

This library can use to handling data of an array type with required utility with polyfill

> This library will be doing polyfill for feature which is not supported on some browser

[API Documentation](http://mohwa.github.io/array-organizer)
 
 # Install
 
 ```javascript
 npm i array-organizer
 ```
 
 # Support Platforms
 
 IE9 later, All modern browsers(Chrome, Safari, Edge ...), NodeJS(`10.0.0` version later).
 
 ## toArray
 
 This function convert an argument like an array like object or an iterable object to an array object
 
 ```javascript
 import { toArray } from 'array-organizer';
 
 toArray(''); // []
 // for an array like object
 toArray('  '); // ['', '']
 toArray('test'); // [t, e, s, t]
 // for an iterable object
 toArray([1, 2, 3]); // [1, 2. 3]
 // for a object type
 toArray({ x: 1, y: 2, z: 3 }); // [{ k: 'x', v: 1 }, { k: 'y', v: 2 }, { k: 'z', v: 3 }]
 toArray({}); // []
 toArray([]); // []
 toArray(undefined); // []
 toArray(null); // []
 toArray(true); // []
toArray(
 [1, 2, 3],
 function(v) {
   return { v, vv: this };
 },
 { x: 1 }
); // [{ v: 1, vv: { x: 1 }}, { v: 2, vv: { x: 1 }}, { v: 3, vv: { x: 1 }}]

function iteratorArgument() {
  toArray(arguments); // [1, 2, 5555]
}

iteratorArgument(1, 2, 5555);

function* generator1() {
  yield 1;
}
toArray(generator1()); // [1]

const m1 = new Map();
m1.set('x', 1);
m1.set('y', 2);
m1.set('z', 3);
toArray(m1); // [{ k: 'x', v: 1 }, { k: 'y', v: 2 }, { k: 'z', v: 3 }]

const s1 = new Set();
s1.add(1);
s1.add(2);
s1.add(3);
toArray(s1); // [1, 2, 3]
```
 
 ## Required API
 
 ```javascript
import {
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
} from 'array-organizer';
 
of(1, 2, 3, 4); // [1, 2, 3, 4]
of({ x: 1 }, { x: 2 }, { x: 3 }); // [{ x: 1 }, { x: 2 }, { x: 3 }]

copyWithin([1, '2', 3], 0, 1, 2); // ['2', 3, 3]
copyWithin({ x: 1, y: '2', z: 3 }, 0, 1, 2); // [{ k: 'y', v: '2' }, { k: 'z', v: 3 }, { k: 'z', v: 3 }]

fill([1, 2, 3, 4], 7, 2); // [1, 2, 7, 7]
fill([1, 2, 3, 4], 7); // [7, 7, 7, 7]
fill({ x: 11, y: 22, z: 33 }, 7, 0, 1); // [ 7, 7, {  k: 'z', v: 33 } ]

find(['1', 2, 3], v => typeof v === 'number'); // 2
find({ x: 11, y: 22, z: 33 }, ({ v }) => typeof v === 'number'); // { k: 'x', v: 11 }

findIndex(['1', 2, 3], v => typeof v === 'number'); // 1
findIndex({ x: 11, y: 22, z: 33 }, ({ v }) => typeof v === 'number'); // 0

search(['1', 2, 3], 3); // 3
searchIndex(['1', 2, 3], '1'); // 0

flat(['1', [2, 3, 4], [5, 6, 2, [8, 9]]], 2); // ['1', 2, 3, 4, 5, 6, 2, 8, 9]
flat({ x: 1, y: 2, yy: { zz: 3 } }); // [{ k: 'x', v: 1 }, { k: 'y', v: 2 }, { k: 'yy', v: { zz: 3 } }]
flatMap(['1', [2, 3, 4], [5, 6, 7, [8, 9]]], v => v.slice(0)); // ['1', 2, 3, 4, 5, 6, 7, [8, 9]]

includes([1, 2, 3], 2); // true
includes({ x: 1, y: 2, yy: { zz: 3 } }, 44); // false

asc(['d', null, 0xff, true, { x: 1 }, 'ee', new Map(), 't', 0]); // [null, { x: 1 }, {}, 0, true, 'd', 't', 'ee', 255]
asc({ x: 'd', y: null, z: 0xff }); // [null, 'd', 255]
desc(['d', true, undefined, 0xff, 'ee', [], 2e4, () => {}, 't', 0]); // [20000, 255, 'ee', 't', 'd', true, Array(0), f (), 0, undefined] 

preInsert([1, 2, 3, 4], 11); // [11, 22, 2, 3, 4]
preInsert({ xx: 22, yy: 33 }, 3); // [3, { k: 'xx', v: 22 }, { k: 'yy', v: 33 }]

insert([1, 2, 3, 4], 1, 22); // [1, 22, 2, 3, 4]
replace([1, 2, 3, 4], 2, 33, 'ADD'); // [1, 2, 33, 'ADD', 4]

remove([1, 2, 3, 4], 3); // [1, 2, 3]
removeAll([1, 2, 3, 4], 1); // [1]

lastIndex([1, 2, 3, 4]); // 3
shuffle([1, 2, 3, 4]); // [3, 1, 2, 4]
 ```
