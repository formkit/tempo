"use strict";Object.defineProperty(exports, "__esModule", {value: true});// src/sameDay.ts
var _datecjs = require('./date.cjs');
function sameDay(inputDateA, inputDateB) {
  const a = _datecjs.date.call(void 0, inputDateA);
  const b = _datecjs.date.call(void 0, inputDateB);
  return a.getDate() === b.getDate() && a.getMonth() === b.getMonth() && a.getFullYear() === b.getFullYear();
}


exports.sameDay = sameDay;
//# sourceMappingURL=sameDay.cjs.map