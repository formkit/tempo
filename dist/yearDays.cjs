"use strict";Object.defineProperty(exports, "__esModule", {value: true});// src/yearDays.ts
var _datecjs = require('./date.cjs');
function yearDays(inputDate) {
  const d = _datecjs.date.call(void 0, inputDate);
  return (new Date(d.getFullYear() + 1, 0, 0).getTime() - new Date(d.getFullYear(), 0, 0).getTime()) / 864e5;
}


exports.yearDays = yearDays;
//# sourceMappingURL=yearDays.cjs.map