"use strict";Object.defineProperty(exports, "__esModule", {value: true});// src/nearestDay.ts
var _datecjs = require('./date.cjs');
var _monthDayscjs = require('./monthDays.cjs');
var _yearDayscjs = require('./yearDays.cjs');
var _dayOfYearcjs = require('./dayOfYear.cjs');
var _addDaycjs = require('./addDay.cjs');
function nearestDay(inputDate, search, constraint = 7) {
  let increments;
  let decrements;
  const d = _datecjs.date.call(void 0, inputDate);
  switch (constraint) {
    case "month":
      decrements = d.getDate();
      increments = _monthDayscjs.monthDays.call(void 0, d) - d.getDate();
      break;
    case "week":
      decrements = d.getDay() + 1;
      increments = 6 - d.getDay();
      break;
    case "year":
      const total = _yearDayscjs.yearDays.call(void 0, d);
      const day = _dayOfYearcjs.dayOfYear.call(void 0, d);
      decrements = day;
      increments = total - day;
      break;
    default:
      increments = decrements = constraint;
  }
  for (let i = 0; i <= increments || i < decrements; i++) {
    if (i <= increments) {
      const next = _addDaycjs.addDay.call(void 0, d, i);
      if (search(next))
        return next;
    }
    if (i && i <= decrements) {
      const prev = _addDaycjs.addDay.call(void 0, d, -i);
      if (search(prev))
        return prev;
    }
  }
  return null;
}


exports.nearestDay = nearestDay;
//# sourceMappingURL=nearestDay.cjs.map