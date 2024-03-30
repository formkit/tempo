"use strict";Object.defineProperty(exports, "__esModule", {value: true});// src/minuteEnd.ts
var _datecjs = require('./date.cjs');
function minuteEnd(inputDate) {
  const d = _datecjs.date.call(void 0, inputDate);
  d.setSeconds(59, 999);
  return d;
}


exports.minuteEnd = minuteEnd;
//# sourceMappingURL=minuteEnd.cjs.map