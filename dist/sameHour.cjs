"use strict";Object.defineProperty(exports, "__esModule", {value: true});// src/sameHour.ts
var _datecjs = require('./date.cjs');
function sameHour(inputDateA, inputDateB) {
  const a = _datecjs.date.call(void 0, inputDateA);
  const b = _datecjs.date.call(void 0, inputDateB);
  return a.getHours() === b.getHours();
}


exports.sameHour = sameHour;
//# sourceMappingURL=sameHour.cjs.map