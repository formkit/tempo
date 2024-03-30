"use strict";Object.defineProperty(exports, "__esModule", {value: true});// src/hourStart.ts
var _datecjs = require('./date.cjs');
function hourStart(inputDate) {
  const d = _datecjs.date.call(void 0, inputDate);
  d.setMinutes(0, 0);
  return d;
}


exports.hourStart = hourStart;
//# sourceMappingURL=hourStart.cjs.map