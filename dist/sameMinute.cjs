"use strict";Object.defineProperty(exports, "__esModule", {value: true});// src/sameMinute.ts
var _datecjs = require('./date.cjs');
function sameMinute(inputDateA, inputDateB) {
  const a = _datecjs.date.call(void 0, inputDateA);
  const b = _datecjs.date.call(void 0, inputDateB);
  return a.getMinutes() === b.getMinutes();
}


exports.sameMinute = sameMinute;
//# sourceMappingURL=sameMinute.cjs.map