"use strict";Object.defineProperty(exports, "__esModule", {value: true});// src/monthEnd.ts
var _datecjs = require('./date.cjs');
function monthEnd(inputDate) {
  const d = _datecjs.date.call(void 0, inputDate);
  d.setDate(1);
  d.setMonth(d.getMonth() + 1);
  d.setDate(0);
  return d;
}


exports.monthEnd = monthEnd;
//# sourceMappingURL=monthEnd.cjs.map