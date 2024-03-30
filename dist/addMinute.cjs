"use strict";Object.defineProperty(exports, "__esModule", {value: true});// src/addMinute.ts
var _datecjs = require('./date.cjs');
function addMinute(inputDate, count = 1) {
  const d = _datecjs.date.call(void 0, inputDate);
  d.setMinutes(d.getMinutes() + count);
  return d;
}


exports.addMinute = addMinute;
//# sourceMappingURL=addMinute.cjs.map