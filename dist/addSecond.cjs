"use strict";Object.defineProperty(exports, "__esModule", {value: true});// src/addSecond.ts
var _datecjs = require('./date.cjs');
function addSecond(inputDate, count = 1) {
  const d = _datecjs.date.call(void 0, inputDate);
  d.setSeconds(d.getSeconds() + count);
  return d;
}


exports.addSecond = addSecond;
//# sourceMappingURL=addSecond.cjs.map