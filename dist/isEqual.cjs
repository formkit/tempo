"use strict";Object.defineProperty(exports, "__esModule", {value: true});// src/isEqual.ts
var _datecjs = require('./date.cjs');
function isEqual(dateLeft, dateRight) {
  const _dateLeft = _datecjs.date.call(void 0, dateLeft);
  const _dateRight = _datecjs.date.call(void 0, dateRight);
  return +_dateLeft === +_dateRight;
}


exports.isEqual = isEqual;
//# sourceMappingURL=isEqual.cjs.map