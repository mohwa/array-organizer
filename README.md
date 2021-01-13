# array-organizer

![npm](https://img.shields.io/npm/v/array-organizer) [![](https://data.jsdelivr.com/v1/package/npm/array-organizer/badge)](https://www.jsdelivr.com/package/npm/array-organizer) ![npm bundle size](https://img.shields.io/bundlephobia/min/array-organizer) ![npm](https://img.shields.io/npm/dm/array-organizer) ![NPM](https://img.shields.io/npm/l/array-organizer)

This library will be used to handling data of an array type 

[API Documentation](http://mohwa.github.io/array-organizer)
 
 # Install
 
 ```javascript
 npm i array-organizer
 ```
 
 # Support Platforms
 
 IE9 later, All modern browsers(Chrome, Safari, Edge ...), NodeJS(`10.0.0` version later).
 
 ## toArray
 
 This function converts given iterable object to an array object
 
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

// generator iterable object
function* g() {
  yield 1;
}
toArray(g()); // [1]

const m = new Map();
m.set('x', 1);
m.set('y', 2);
m.set('z', 3);

toArray(m); // [{ k: 'x', v: 1 }, { k: 'y', v: 2 }, { k: 'z', v: 3 }]

const s = new Set();
s.add(1);
s.add(2);
s.add(3);

toArray(s); // [1, 2, 3]
```

## Main API 

You will be able to used for add or remove or search every element of iterable object 
 
```javascript
import {
  fill,
  find,
  search,
  asc,
  desc,
  preInsert,
  insert,
  replace,
  remove,
  removeAll,
  includes,
  deepFind,
  deepSearch,
  ascBy,
  descBy,
  reduce,
  includes
} from 'array-organizer';
 
reduce([{ x: 1 }, { y: 2 }, { z: 3 }], (acc, v, k) => { acc[k] = v; return acc; }, {}); // { 0: { x: 1 }, 1: { y: 2 }, 2: { z: 3 } }

// Will be found a 2 from an array object 
includes([1, 2, 3], 2); // true
includes({ x: 1, y: 2, yy: { zz: 3 } }, 44); // false

// Will be filled 7 from index 2 until end index of an array object
fill([1, 2, 3, 4], 7, 2); // [1, 2, 7, 7]
fill([1, 2, 3, 4], 7); // [7, 7, 7, 7]
fill({ x: 11, y: 22, z: 33 }, 7, 0, 1); // [ 7, 7, {  k: 'z', v: 33 } ]

find(['1', 2, 3], v => typeof v === 'number'); // 2
find({ x: 11, y: 22, z: 33 }, ({ v }) => typeof v === 'number'); // { k: 'x', v: 11 }

search(['1', 2, 3], 3); // 3

// Will be found a 2 from an array object 
includes([1, 2, 3], 2); // true
includes({ x: 1, y: 2, yy: { zz: 3 } }, 44); // false

asc(['d', null, 0xff, true, { x: 1 }, 'ee', new Map(), 't', 0]); // [null, { x: 1 }, {}, 0, true, 'd', 't', 'ee', 255]
asc({ x: 'd', y: null, z: 0xff }); // [null, 'd', 255]

desc([5, 3, 4, 6, 1, 2]); // [6, 5, 4, 3, 2, 1]
// Will be sorted after convert 0xff to number 255
desc(['d', true, undefined, 0xff, 'ee', [], 2e4, () => {}, 't', 0]); // [20000, 255, 'ee', 't', 'd', true, Array(0), f (), 0, undefined] 

preInsert([1, 2, 3, 4], 11); // [11, 22, 2, 3, 4]
preInsert({ xx: 22, yy: 33 }, 3); // [3, { k: 'xx', v: 22 }, { k: 'yy', v: 33 }]

// Will be inserted a 22 to index 1
insert([1, 2, 3, 4], 1, 22); // [1, 22, 2, 3, 4]
// Will be inserted a 22 to index 1 and add 'ADD'
replace([1, 2, 3, 4], 2, 33, 'ADD'); // [1, 2, 33, 'ADD', 4]

remove([1, 2, 3, 4], 3); // [1, 2, 3]
removeAll([1, 2, 3, 4], 1); // [1]

// In result c is container object of y property
deepFind([{ x: { xx: { y: 3, z: 'A' } } }], v => typeof v === 'number'); // { c: { y: 3, z: 'A' }, k: 'y', v: 3, origin: [{ ... }] }
deepSearch(
[
  { x: 1, y: [{ yy: 44 }] },
  { x: 1, y: 5, z: { yy: 33 } },
  { x: 1, y: 22, z: [{ xx: { zz: { yy: -20 } } }] },
],
-20
); // { c: { yy: -20 }, k: 'yy', v: -20, origin: [{ ... }] }

// Will be ascending based y property
ascBy([{ x: 1, y: 11 }, { x: 2, y: 22 }, { x: 3, y: 33 }], 'y'); // [{ ...y: 11 }, { ...y: 22 }, { ...y: 33 }]
descBy([{ x: 1, y: 11 }, { x: 2, y: 22 }, { x: 3, y: 33 }], 'y'); // [{ ...y: 33 }, { ...y: 22 }, { ...y: 11 }]
``` 
 
## Other API
 
 ```javascript
import {
  of,
  copyWithin,
  searchIndex,
  flat,
  flatMap,
  lastIndex,
  shuffle
} from 'array-organizer';
 
of(1, 2, 3, 4); // [1, 2, 3, 4]
of({ x: 1 }, { x: 2 }, { x: 3 }); // [{ x: 1 }, { x: 2 }, { x: 3 }]

// Will be copied an elements from index 1 until index 2 to index 0
copyWithin([1, '2', 3], 0, 1, 2); // ['2', 3, 3]
copyWithin({ x: 1, y: '2', z: 3 }, 0, 1, 2); // [{ k: 'y', v: '2' }, { k: 'z', v: 3 }, { k: 'z', v: 3 }]

searchIndex(['1', 2, 3], '1'); // 0

flat(['1', [2, 3, 4], [5, 6, 2, [8, 9]]], 2); // ['1', 2, 3, 4, 5, 6, 2, 8, 9]
flat({ x: 1, y: 2, yy: { zz: 3 } }); // [{ k: 'x', v: 1 }, { k: 'y', v: 2 }, { k: 'yy', v: { zz: 3 } }]

flatMap(['1', [2, 3, 4], [5, 6, 7, [8, 9]]], v => v.slice(0)); // ['1', 2, 3, 4, 5, 6, 7, [8, 9]]
flatMap(['1', [2, 3, 4]], v => [...v, 444]); // ['1', 444, 2, 3, 4, 444]

// Same to [1, 2, 3, 4].length - 1
lastIndex([1, 2, 3, 4]); // 3
shuffle([1, 2, 3, 4]); // [3, 1, 2, 4]
 ```

# Features to be discontinued

We decided to deprecate some functions because we thought unnecessary them.

|name|description|version that deprecated|
|:---:|:---:|:---:|
|search | Will be able to using instead  `find` or `includes`|2.0.0
|searchIndex | Will be able to using instead `findIndex`|2.0.0
|deepSearch | Will be able to using instead `deepFind`|2.0.0
