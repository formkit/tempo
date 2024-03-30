"use strict";Object.defineProperty(exports, "__esModule", {value: true});// src/tzDate.ts
var _offsetcjs = require('./offset.cjs');
var _applyOffsetcjs = require('./applyOffset.cjs');
var _datecjs = require('./date.cjs');
function tzDate(inputDate, tz) {
  const d = _datecjs.date.call(void 0, inputDate);
  return _applyOffsetcjs.applyOffset.call(void 0, d, _offsetcjs.offset.call(void 0, d, tz));
}


exports.tzDate = tzDate;
//# sourceMappingURL=tzDate.cjs.map