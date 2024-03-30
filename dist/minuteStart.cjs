"use strict";Object.defineProperty(exports, "__esModule", {value: true});// src/minuteStart.ts
var _datecjs = require('./date.cjs');
function minuteStart(inputDate) {
  const d = _datecjs.date.call(void 0, inputDate);
  d.setSeconds(0);
  return d;
}


exports.minuteStart = minuteStart;
//# sourceMappingURL=minuteStart.cjs.map