import { isUndefined, isNull, isFunction } from 'emnida';

export function bindToFunction(v, _this, defaultV = function() {}) {
  let f = isFunction(v) ? v : defaultV;

  if (!isUndefined(_this) && !isNull(_this)) {
    f = f.bind(_this);
  }
  return f;
}
