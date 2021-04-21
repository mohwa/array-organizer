# array-organizer

![npm](https://img.shields.io/npm/v/array-organizer) [![](https://data.jsdelivr.com/v1/package/npm/array-organizer/badge)](https://www.jsdelivr.com/package/npm/array-organizer) ![npm bundle size](https://img.shields.io/bundlephobia/min/array-organizer) ![npm](https://img.shields.io/npm/dm/array-organizer) ![NPM](https://img.shields.io/npm/l/array-organizer)

# Concept

- You will be able to use iterable object of all type on any API of this library

> ex: Array, Plain object, Map, Set, Generator Iterable object ...
                                                                                      
- The library included essential apis necessary when development an application

> I think not need big library like the [lodash](https://lodash.com/) or [underscore](https://underscorejs.org/) when development most an application

- Supports [tree shaking](https://webpack.js.org/guides/tree-shaking/) for the application size of your project
 
- Supports multiple browsers
 
 # Install
 
 ```javascript
 npm i array-organizer
 ```

# API Documentation

http://mohwa.github.io/array-organizer
 
# Support Platforms
 
IE9 later, All modern browsers(Chrome, Safari, Edge ...), NodeJS(`10.0.0` version later)

## Variety ways which use together a native apis

Any apis can be used more powerfully together a [native apis](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Array) like following examples

```javascript
import { toArray } from 'array-organizer';

toArray({ x: 1, y: 2, z: '3' }).every(({ v, k }, i) => typeof v === 'number') // false

toArray({ x: 'spray', y: 'limit', z: 'elite', xx: 'exuberant', yy: 'destruction', zz: 'present' }).filter(
({ v, k }) => v.length > 6
) // [{ k: "xx", v: "exuberant" }, { k: "yy", v: "destruction" }, { k: "zz", v: "present" }]

const popArr = toArray({ x: 1, y: 2, z: 3 });
popArr.pop();
 
console.log(popArr); // [{ k: "x", v: 1 }, { k: "y", v: 2 }]

const pushArr = toArray({ x: 1, y: 2, z: 3 });
pushArr.push({ xx: 4 });

console.log(pushArr); // [{ k: "x", v: 1 }, { k: "y", v: 2 }, { k: "z", v: 3 }, { xx: 4 }]

toArray({ x: 1, y: 2, z: 3 }).reverse(); // [{ k: "z", v: 3 }, { k: "y", v: 2 }, { k: "x", v: 1 }]

const shiftArr = toArray({ x: 1, y: 2, z: 3 });
shiftArr.shift();

console.log(shiftArr); // [{ k: "y", v: 2 }, { k: "z", v: 3 }]

toArray({ x: '1', y: '2', z: 3 }).some(({ v, k }, i) => typeof v === 'number') // true

const unShiftArr = toArray({ x: 1, y: 2, z: 3 });
unShiftArr.unshift({ xx: 4 });

console.log(unShiftArr); // [{ xx: 4 }, { k: "x", v: 1 }, { k: "y", v: 2 }, { k: "z", v: 3 }]
```
 
## toArray, toArrayAll
 
 This api will be able to convert iterable object of all types to new an array object
 
 ```javascript
import { toArray, toArrayAll } from 'array-organizer';
 
toArray('  '); // [ ' ', ' ' ]
 
toArray('!@#$%^&*()test'); // ['!', '@', '#','$', '%', '^','&', '*', '(',')', 't', 'e','s', 't']
toArray([1, 2, 3]); // [ 1, 2, 3 ]
 
toArray({ x: 1, y: 2, z: 3 }); // [ { k: 'x', v: 1 }, { k: 'y', v: 2 }, { k: 'z', v: 3 } ]
 
toArray(new Set([1, 2, 3, {}, new Map()])); // [ 1, 2, 3, {}, Map {} ]
 
toArray(new Map([['x', 1], ['y', {}], ['z', new Map()], ['s', new Set()]])); // [{ k: 'x', v: 1 },{ k: 'y', v: {} },{ k: 'z', v: Map {} },{ k: 's', v: Set {} }]
 
toArray((function*() { yield { x: 1 }; })()); // [ { x: 1 } ]
 
toArray(function(x, y) {}); // [ undefined, undefined ]
 
toArray({}); // []
 
toArray([]); // []
 
toArray(undefined); // []
 
toArray(null); // []
 
toArray(true); // []
 
toArray(3); // []
 
function iteratorArgument() {
  toArray(arguments); // [1, 2, 5555]
}
iteratorArgument(1, 2, 5555);

// toArrayAll converts an any element unlike a toArray
toArrayAll('1'); // ['1']
toArrayAll(1); // [1]
toArrayAll(true); // [true]
toArrayAll(undefined); // [undefined]
toArrayAll(null); // [null]
toArrayAll(Symbol(3)); // [Symbol(3)]
toArrayAll(function(){}); // [[Function]]
toArrayAll(''); // ['']
toArrayAll('  '); // ['', '']
toArrayAll([1, 2, 3]); // [1, 2, 3]
toArrayAll({ x: 1, y: 2, z: 3 }); // [{ k: 'x', v: 1}, { k: 'y', v: 2}, { k: 'z', v: 3}]
toArrayAll({}); // []
toArrayAll([]); // []
```

## Main API 

You will be able to use for add or remove or search every element of iterable object via various apis 
 
```javascript
import {
  fill,
  find,
  asc,
  desc,
  insert,
  replace,
  remove,
  includes,
  deepFind,
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
  filter, 
  some,
  every
} from 'array-organizer';

// Will be filled 7 from index 3 until end index of an array object
fill([1, 2, 3, 4], 7, 3); // [1, 2, 3, 7]
fill([1, 2, 3, 4], 7); // [7, 7, 7, 7]
fill({ x: 11, y: 22, z: 33 }, 7, 0, 2) ; // [ 7, 7, { k: 'z', v: 33 } ]

find(['1', 2, 3], v => typeof v === 'number'); // 2
find({ x: 11, y: 22, z: 33 }, ({ v }) => typeof v === 'number'); // { k: 'x', v: 11 }

asc(['d', null, 0xff, true, { x: 1 }, 'ee', new Map(), 't', 0]); // [null, { x: 1 }, {}, 0, true, 'd', 't', 'ee', 255]
asc({ x: 'd', y: null, z: 0xff }); // [null, 'd', 255]

desc([5, 3, 4, 6, 1, 2]); // [6, 5, 4, 3, 2, 1]
// Will be sorted after convert 0xff to number 255
desc(['d', true, undefined, 0xff, 'ee', [], 2e4, () => {}, 't', 0]); // [20000, 255, 'ee', 't', 'd', true, Array(0), f (), 0, undefined] 

// Will be inserted a 22 to index 1
insert([1, 2, 3, 4], 1, 22); // [1, 22, 2, 3, 4]
// Will be inserted a 22 to index 1 and add 'ADD'
replace([1, 2, 3, 4], 2, 33, 'ADD'); // [1, 2, 33, 'ADD', 4]

remove(['1', 2, 3, 4], v => typeof v === 'number'); // ['1']
remove(['1', 2, 3, 4], v => typeof v === 'string'); // [2, 3, 4]
remove({ x: '1', y: '2', z: 3, xx: 4 }, ({ k, v }) => typeof v === 'string'); // [ { k: 'z', v: 3 }, { k: 'xx', v: 4 } ]

// Will be found a 2 from an array object 
includes([1, 2, 3], v => v === 2); // true
includes({ x: 1, y: 2, yy: { zz: 3 } }, ({ k, v }) => v === 44); // false

// In result c is container object of y property
deepFind([{ x: { xx: { y: 3, z: 'A' } } }], v => typeof v === 'number'); // { c: { y: 3, z: 'A' }, k: 'y', v: 3, origin: [{ ... }] }

// Will be ascending based y property
ascBy([{ x: 1, y: 11 }, { x: 2, y: 22 }, { x: 3, y: 33 }], 'y'); // [{ ...y: 11 }, { ...y: 22 }, { ...y: 33 }]
descBy([{ x: 1, y: 11 }, { x: 2, y: 22 }, { x: 3, y: 33 }], 'y'); // [{ ...y: 33 }, { ...y: 22 }, { ...y: 11 }]

reduce([{ x: 1 }, { y: 2 }, { z: 3 }], (acc, v, k) => { acc[k] = v; return acc; }, {}); // { 0: { x: 1 }, 1: { y: 2 }, 2: { z: 3 } }

forEach('  ', (v, k) => console.log(v)); // '', ''

forEach('!@#$%^&*()test', (v, k) => console.log(v));

forEach([1, 2, 3], (v, k) => console.log(v));

forEach({ x: 1, y: 2, z: 3 }, (v, k) => console.log(v));

forEach(new Set([1, 2, 3, {}, new Map()]), (v, k) => console.log(v));

forEach(new Map([['x', 1], ['y', {}], ['z', new Map()], ['s', new Set()]]), (v, k) => console.log(v));

forEach((function*() { yield { x: 1 }}), (v, k) => console.log(v));

forEach(function(x, y) {}, (v, k) => console.log(v));

// This data can not loop
forEach({}, (v, k) => console.log(v));

// This data can not loop
forEach([], (v, k) => console.log(v));

// This data can not loop
forEach(undefined, (v, k) => console.log(v));

// This data can not loop
forEach(null, (v, k) => console.log(v));

// This data can not loop
forEach(true, (v, k) => console.log(v));

// This data can not loop
forEach(3, (v, k) => console.log(v));

concat(
  [ { x: 1 }, { y: 2 }, { z: 3 } ],
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
    yield { xxx: 1 };
  })()
); // [{ x: 1 },{ y: 2 },{ z: 3 },{ k: 'xx', v: 1 },{ k: 'yy', v: 2 },{ k: 'zz', v: 3 },[Function],true,false,{ k: 'x', v: 1 },11,22,33,'test',{ xxx: 1 }]

indexOf([1, 2, 3], v => v === 2); // 1
indexOf([1, 2, 3], v => v === 2, 2); // -1
indexOf({ x: 1, y: 2, z: 3 }, ({ k, v }) => v === 2, 2); // -1

lastIndexOf([1, 2, 3], v => v === 2); // 1
lastIndexOf({ x: 1, y: 2, yy: { zz: 3 }, zz: 44 }, ({ k, v }) => v === 44, 2); // -1

keys([1, , 3]); // [0, 1, 2]
keys({ x: 1, y: 2, z: 3 }); // ['x', 'y', 'z']

values([1, , 3]); // [1, undefined, 3]
values({ x: 1, y: 2, z: 3 }); // [1, 2, 3]

join({ x: 1, y: 2, z: 3 }, '-') // '1-2-3'

unshift([], 11, 22, 33); // [ 11, 22, 33 ]
unshift([1, 2, 3], 11, 22, 33); // [ 11, 22, 33, 1, 2, 3 ]

push([], 11, 22, 33); // [ 11, 22, 33 ]
push([1, 2, 3], 11, 22, 33); // [ 1, 2, 3, 11, 22, 33 ]

filter(['1', 2, 3], v => typeof v === 'number'); // [2, 3]
filter(new Set(['1', 2, 3]), v => typeof v === 'number'); // [2, 3]
filter(new Map([['x', 1], ['y', 2]]), ({ v }) => typeof v === 'number'); // [{ k: 'x', v: 1 }, { k: 'y', v: 2 }]

every(['1', 2, 3], v => typeof v === 'number'); // false
every([1, 2, 3], v => typeof v === 'number'); // true
every(new Set(['1', 2, 3]), v => typeof v === 'number'); // false
every(new Map([['x', 1], ['y', '2']]), ({ v }) => typeof v === 'number'); // false

some(['1', 2, 3], v => typeof v === 'number'); // true
some([1, 2, 3], v => typeof v === 'number'); // true
some(new Set(['1', 2, 3]), v => typeof v === 'number'); // true
some(new Map([['x', 1], ['y', '2']]), ({ v }) => typeof v === 'number'); // true
some(['1', '2', '3'], v => typeof v === 'number'); // false
``` 
 
## Other API
 
 ```javascript
import {
  of,
  copyWithin,
  flat,
  flatMap,
  shuffle,
  findIndex,
} from 'array-organizer';
 
of(1, 2, 3, 4); // [1, 2, 3, 4]
of({ x: 1 }, { x: 2 }, { x: 3 }); // [{ x: 1 }, { x: 2 }, { x: 3 }]

// Will be copied an elements from index 1 until index 1 to index 0
copyWithin([1, '2', 3], 0, 1, 2); // [ '2', '2', 3 ]
copyWithin({ x: 1, y: '2', z: 3 }, 0, 1, 2); // [ { k: 'y', v: '2' }, { k: 'y', v: '2' }, { k: 'z', v: 3 } ]

flat(['1', [2, 3, 4], [5, 6, 2, [8, 9]]], 2); // ['1', 2, 3, 4, 5, 6, 2, 8, 9]
flat({ x: 1, y: 2, yy: { zz: 3 } }); // [{ k: 'x', v: 1 }, { k: 'y', v: 2 }, { k: 'yy', v: { zz: 3 } }]

flatMap(['1', [2, 3, 4], [5, 6, 7, [8, 9]]], v => v.slice(0)); // ['1', 2, 3, 4, 5, 6, 7, [8, 9]]
flatMap(['1', [2, 3, 4]], v => [...v, 444]); // ['1', 444, 2, 3, 4, 444]

shuffle([1, 2, 3, 4]); // [3, 1, 2, 4]

findIndex(['1', 2, 3], v => typeof v === 'number'); // 1
 ```
