"use strict";Object.defineProperty(exports, "__esModule", {value: true});// src/dayStart.ts
var _datecjs = require('./date.cjs');
function dayStart(inputDate) {
  const d = _datecjs.date.call(void 0, inputDate);
  d.setHours(0, 0, 0);
  return d;
}


exports.dayStart = dayStart;
//# sourceMappingURL=dayStart.cjs.map