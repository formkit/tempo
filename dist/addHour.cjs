"use strict";Object.defineProperty(exports, "__esModule", {value: true});// src/addHour.ts
var _datecjs = require('./date.cjs');
function addHour(inputDate, count = 1) {
  const d = _datecjs.date.call(void 0, inputDate);
  d.setHours(d.getHours() + count);
  return d;
}


exports.addHour = addHour;
//# sourceMappingURL=addHour.cjs.map