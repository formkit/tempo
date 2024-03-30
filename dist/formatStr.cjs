"use strict";Object.defineProperty(exports, "__esModule", {value: true});// src/formatStr.ts
var _partscjs = require('./parts.cjs');
var _commoncjs = require('./common.cjs');
function formatStr(format, locale = "en", escapeLiterals = false, filterParts = () => true) {
  return _partscjs.parts.call(void 0, format, locale).filter(filterParts).reduce(
    (f, p) => f += escapeLiterals && p.partName === "literal" ? _commoncjs.escapeTokens.call(void 0, p.token) : p.token,
    ""
  ).normalize("NFKC");
}


exports.formatStr = formatStr;
//# sourceMappingURL=formatStr.cjs.map