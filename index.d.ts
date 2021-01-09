interface ArrayOrganizer {
  toArray(...args: any[]): any[];

  of<T>(...args: T[]): T[];

  copyWithin(iterable: any, targetIndex: number, startIndex: number, endIndex: number): any[];

  fill(iterable: any, fillValue: any, startIndex?: number, endIndex?: number): any[];

  find<T>(iterable: T | T[], predicate: (value: T, index: number, obj: T[]) => unknown, thisArg?: any): T | undefined;

  findIndex<T>(iterable: T, predicate: (value: T, index: number, obj: T[]) => unknown, thisArg?: any): number;

  deepFind(iterable: any, predicate: (value: any, index: number, obj: any[]) => unknown, thisArg?: any): any | undefined;

  search<T>(iterable: T[], searchValue: T): T | undefined;

  searchIndex<T>(iterable: T[], searchValue: T): number;

  deepSearch(iterable: any, searchValue: any): any | undefined;

  flat(iterable: any, ...args: any[]): any[];

  flatMap(iterable: any, ...args: any[]): any[];

  includes(iterable: any, searchElement: any, fromIndex?: number): boolean;

  asc(iterable: any): any[];

  desc(iterable: any): any[];

  ascBy(iterable: any, key: string): any[];

  descBy(iterable: any, key: string): any[];

  preInsert(iterable: any, ...args: any[]): any[];

  insert<T>(iterable: T[], targetIndex: number, ...args: T[]): T[];

  replace<T>(iterable: T[], targetIndex: number, ...args: T[]): T[];

  remove<T>(iterable: T[], targetIndex: number): T[];

  removeAll<T>(iterable: T[], targetIndex: number): T[];

  lastIndex<T>(iterable: T[]): number;

  shuffle<T>(iterable: T[]): T[];

  reduce(iterable: any, callbackFn: (accumulator: any, value: any, key: string) => void, initValue: any): any;
}

declare const arrayOrganizer: ArrayOrganizer;

export = arrayOrganizer;

