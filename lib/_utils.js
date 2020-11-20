import * as emnida from 'emnida';
import { _from } from './polyfill';

const {
  type: { isUndefined, isNull, isFunction, isString },
  number: { isFinite },
} = emnida;

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
