"use strict";Object.defineProperty(exports, "__esModule", {value: true});// src/yearStart.ts
var _datecjs = require('./date.cjs');
function yearStart(inputDate) {
  const d = _datecjs.date.call(void 0, inputDate);
  d.setMonth(0);
  d.setDate(1);
  d.setHours(0, 0, 0);
  return d;
}


exports.yearStart = yearStart;
//# sourceMappingURL=yearStart.cjs.map