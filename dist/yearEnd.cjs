"use strict";Object.defineProperty(exports, "__esModule", {value: true});// src/yearEnd.ts
var _datecjs = require('./date.cjs');
function yearEnd(inputDate) {
  const d = _datecjs.date.call(void 0, inputDate);
  d.setMonth(11);
  d.setDate(31);
  d.setHours(23, 59, 59, 999);
  return d;
}


exports.yearEnd = yearEnd;
//# sourceMappingURL=yearEnd.cjs.map