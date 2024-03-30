"use strict";Object.defineProperty(exports, "__esModule", {value: true});// src/dayOfYear.ts
var _datecjs = require('./date.cjs');
function dayOfYear(inputDate) {
  const d = _datecjs.date.call(void 0, inputDate);
  return Math.round(
    (new Date(d.getFullYear(), d.getMonth(), d.getDate(), 0, 0).getTime() - new Date(d.getFullYear(), 0, 0).getTime()) / 864e5
  );
}


exports.dayOfYear = dayOfYear;
//# sourceMappingURL=dayOfYear.cjs.map