"use strict";Object.defineProperty(exports, "__esModule", {value: true});// src/weekEnd.ts
var _weekStartcjs = require('./weekStart.cjs');
function weekEnd(inputDate, startOfWeekDay = 0) {
  const d = _weekStartcjs.weekStart.call(void 0, inputDate, startOfWeekDay);
  d.setDate(d.getDate() + 6);
  d.setHours(23, 59, 59);
  return d;
}


exports.weekEnd = weekEnd;
//# sourceMappingURL=weekEnd.cjs.map