"use strict";Object.defineProperty(exports, "__esModule", {value: true});// src/sameYear.ts
var _datecjs = require('./date.cjs');
function sameYear(inputDateA, inputDateB) {
  const a = _datecjs.date.call(void 0, inputDateA);
  const b = _datecjs.date.call(void 0, inputDateB);
  return a.getFullYear() === b.getFullYear();
}


exports.sameYear = sameYear;
//# sourceMappingURL=sameYear.cjs.map