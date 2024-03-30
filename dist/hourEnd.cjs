"use strict";Object.defineProperty(exports, "__esModule", {value: true});// src/hourEnd.ts
var _datecjs = require('./date.cjs');
function hourEnd(inputDate) {
  const d = _datecjs.date.call(void 0, inputDate);
  d.setMinutes(59, 59, 999);
  return d;
}


exports.hourEnd = hourEnd;
//# sourceMappingURL=hourEnd.cjs.map