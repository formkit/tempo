"use strict";Object.defineProperty(exports, "__esModule", {value: true});// src/date.ts
var _iso8601cjs = require('./iso8601.cjs');
function normalize(date2) {
  const matches = date2.match(_iso8601cjs.iso8601Match);
  if (matches && typeof matches[4] === "undefined") {
    return date2 += "T00:00:00";
  }
  return date2;
}
function date(date2) {
  if (!date2) {
    date2 = /* @__PURE__ */ new Date();
  }
  if (date2 instanceof Date) {
    const d = new Date(date2);
    d.setMilliseconds(0);
    return d;
  }
  date2 = date2.trim();
  if (_iso8601cjs.iso8601.call(void 0, date2)) {
    return new Date(normalize(date2));
  }
  throw new Error(`Non ISO 8601 compliant date (${date2}).`);
}


exports.date = date;
//# sourceMappingURL=date.cjs.map