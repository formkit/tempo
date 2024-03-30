"use strict";Object.defineProperty(exports, "__esModule", {value: true});// src/isAfter.ts
var _datecjs = require('./date.cjs');
function isAfter(inputDate, dateToCompare) {
  const _date = _datecjs.date.call(void 0, inputDate);
  const _dateToCompare = _datecjs.date.call(void 0, dateToCompare);
  return +_date > +_dateToCompare;
}


exports.isAfter = isAfter;
//# sourceMappingURL=isAfter.cjs.map