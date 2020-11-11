import { toArray, of, forEach, reduce, concat, copyWithin, replace } from '../lib';

console.log(toArray('test'));
console.log(toArray([1, 2, 3]));
console.log(toArray({ x: 1, y: 2, z: 3 }));
console.log(toArray(undefined));
console.log(toArray(null));

console.log(of(1, 2, 3, 4));
console.log(of({ x: 1 }, { x: 2 }, { x: 3 }));

console.log(concat([1], [2], [3], [4]));
console.log(concat([1], { x: 1 }, { x: 2 }, { x: 3 }));

console.log(copyWithin([1, '2', 3], '2', 2));
console.log(replace([1, 2, 2, 3, 4, 5], 2, 4));

if (window.Map) {
  const m1 = new Map();
  m1.set('x', 1);
  m1.set('y', 2);
  m1.set('z', 3);
  console.log(toArray(m1));
}

if (window.Set) {
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
