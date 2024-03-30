"use strict";Object.defineProperty(exports, "__esModule", {value: true});// src/monthStart.ts
var _datecjs = require('./date.cjs');
function monthStart(inputDate) {
  const d = _datecjs.date.call(void 0, inputDate);
  d.setDate(1);
  d.setHours(0, 0, 0);
  return d;
}


exports.monthStart = monthStart;
//# sourceMappingURL=monthStart.cjs.map