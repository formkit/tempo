"use strict";Object.defineProperty(exports, "__esModule", {value: true});// src/applyOffset.ts
var _datecjs = require('./date.cjs');
var _commoncjs = require('./common.cjs');
function applyOffset(dateInput, offset = "+0000") {
  const d = _datecjs.date.call(void 0, dateInput);
  const timeDiffInMins = _commoncjs.offsetToMins.call(void 0, offset);
  return new Date(d.getTime() + timeDiffInMins * 1e3 * 60);
}


exports.applyOffset = applyOffset;
//# sourceMappingURL=applyOffset.cjs.map