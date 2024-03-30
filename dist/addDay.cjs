"use strict";Object.defineProperty(exports, "__esModule", {value: true});// src/addDay.ts
var _datecjs = require('./date.cjs');
function addDay(inputDate, count = 1) {
  const d = _datecjs.date.call(void 0, inputDate);
  d.setDate(d.getDate() + count);
  return d;
}


exports.addDay = addDay;
//# sourceMappingURL=addDay.cjs.map