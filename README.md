# array-organizer

![npm](https://img.shields.io/npm/v/array-organizer) [![](https://data.jsdelivr.com/v1/package/npm/array-organizer/badge)](https://www.jsdelivr.com/package/npm/array-organizer) ![npm bundle size](https://img.shields.io/bundlephobia/min/array-organizer) ![npm](https://img.shields.io/npm/dm/array-organizer) ![NPM](https://img.shields.io/npm/l/array-organizer)
 
 # Install
 
 ```bash
 npm install array-organizer
 ```

# How to use

```javascript
import { 
  toArray,
  insert,
  replace,
  remove
 } from 'array-organizer';
 
toArray(new Set([1, 2, 3, {}, new Map()])); // [ 1, 2, 3, {}, Map {} ]

insert([1, 2, 3, 4], 1, 22); // [1, 22, 2, 3, 4]

// Will be replaced third value of given the array as 33 more then add 'ADD'
replace([1, 2, 3, 4], 2, 33, 'ADD'); // [1, 2, 33, 'ADD', 4]

// Will be removed some elements with the number type
remove(['1', 2, 3, 4], v => typeof v === 'number'); // ['1']
```

# Documentation

http://mohwa.github.io/array-organizer
