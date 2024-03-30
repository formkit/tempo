"use strict";Object.defineProperty(exports, "__esModule", {value: true});// src/monthDays.ts
var _monthEndcjs = require('./monthEnd.cjs');
function monthDays(inputDate) {
  const d = _monthEndcjs.monthEnd.call(void 0, inputDate);
  return d.getDate();
}


exports.monthDays = monthDays;
//# sourceMappingURL=monthDays.cjs.map