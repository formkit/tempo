"use strict";Object.defineProperty(exports, "__esModule", {value: true});// src/weekStart.ts
var _datecjs = require('./date.cjs');
function weekStart(inputDate, startOfWeekDay = 0) {
  const d = _datecjs.date.call(void 0, inputDate);
  let diff = startOfWeekDay - d.getDay();
  if (diff > 0)
    diff = diff - 7;
  d.setDate(d.getDate() + diff);
  d.setHours(0, 0, 0);
  return d;
}


exports.weekStart = weekStart;
//# sourceMappingURL=weekStart.cjs.map