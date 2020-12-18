import { type } from 'emnida';
import { _from } from './polyfill';

const { isUndefined, isNull, isFunction, isString } = type;

export function getGlobalObject() {
  try {
    return window;
  } catch (e) {
    return global;
  }
}

export function bindToFunction(v, _this, defaultV = function() {}) {
  let f = isFunction(v) ? v : defaultV;

  if (!isUndefined(_this) && !isNull(_this)) {
    f = f.bind(_this);
  }
  return f;
}

export function toNumber(v) {
  const nv = Number(v);

  if (isFinite(nv)) {
    return nv;
  }

  if (isString(v)) {
    const arr = _from(v);
    let ret = 0;

    arr.forEach(vv => {
      ret += vv.charCodeAt(0);
    });

    return ret;
  }
  return 0;
}

/**
 *
 * @description 객체 deepCopy
 * @param {*} obj
 * @returns
 */
export function deepCopy(obj) {
  const clone = {};

  for (const key in obj) {
    if (typeof obj[key] === 'object' && obj[key] !== null) {
      clone[key] = deepCopy(obj[key]);
    } else {
      clone[key] = obj[key];
    }
  }

  return clone;
}

// 함수로 변환한 findClosure를 활용하여 딥한곳에 요소를 찾아서 반환해준다.
export const deepFind = (function() {
  let value = null;

  return function findClosure(target, keyStr) {
    if (target && typeof target === 'object') {
      Object.keys(target).forEach(key => {
        if (key === keyStr) {
          value = target[keyStr];
          return value;
        } else {
          return findClosure(target[key], keyStr);
        }
      });
    }
    return value;
  };
})();
