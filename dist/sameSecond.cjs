"use strict";Object.defineProperty(exports, "__esModule", {value: true});// src/sameSecond.ts
var _datecjs = require('./date.cjs');
function sameSecond(inputDateA, inputDateB) {
  const a = _datecjs.date.call(void 0, inputDateA);
  const b = _datecjs.date.call(void 0, inputDateB);
  return a.getSeconds() === b.getSeconds();
}


exports.sameSecond = sameSecond;
//# sourceMappingURL=sameSecond.cjs.map