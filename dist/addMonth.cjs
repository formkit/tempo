"use strict";Object.defineProperty(exports, "__esModule", {value: true});// src/addMonth.ts
var _datecjs = require('./date.cjs');
var _monthDayscjs = require('./monthDays.cjs');
function addMonth(inputDate, count = 1, dateOverflow = false) {
  const d = _datecjs.date.call(void 0, inputDate);
  const dayOfMonth = d.getDate();
  if (!dateOverflow)
    d.setDate(1);
  d.setMonth(d.getMonth() + count);
  if (!dateOverflow) {
    const daysInMonth = _monthDayscjs.monthDays.call(void 0, d);
    d.setDate(daysInMonth < dayOfMonth ? daysInMonth : dayOfMonth);
  }
  return d;
}


exports.addMonth = addMonth;
//# sourceMappingURL=addMonth.cjs.map