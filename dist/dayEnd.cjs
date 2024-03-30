"use strict";Object.defineProperty(exports, "__esModule", {value: true});// src/dayEnd.ts
var _datecjs = require('./date.cjs');
function dayEnd(inputDate) {
  const d = _datecjs.date.call(void 0, inputDate);
  d.setHours(23, 59, 59, 999);
  return d;
}


exports.dayEnd = dayEnd;
//# sourceMappingURL=dayEnd.cjs.map