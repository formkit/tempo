"use strict";Object.defineProperty(exports, "__esModule", {value: true});// src/range.ts
var _formatcjs = require('./format.cjs');
var _apcjs = require('./ap.cjs');
function range(token, locale = "en", genitive = false) {
  const r = (n, c) => Array(n).fill("").map((_, i) => `${c(i)}`);
  if (token === "M")
    return r(12, (i) => i + 1);
  if (token === "MM")
    return r(12, (i) => {
      const m = i + 1;
      return m < 10 ? `0${m}` : m;
    });
  if (token.startsWith("M"))
    return range("MM").map(
      (m) => _formatcjs.format.call(void 0, `2000-${m}-05`, token, locale, genitive)
    );
  if (token.startsWith("d"))
    return r(7, (i) => `0${i + 2}`).map(
      (d) => _formatcjs.format.call(void 0, `2022-10-${d}`, token, locale)
    );
  if (token === "a")
    return [_apcjs.ap.call(void 0, "am", locale).toLowerCase(), _apcjs.ap.call(void 0, "pm", locale).toLowerCase()];
  if (token === "A")
    return [_apcjs.ap.call(void 0, "am", locale).toUpperCase(), _apcjs.ap.call(void 0, "pm", locale).toUpperCase()];
  if (token.startsWith("Y")) {
    const year = (/* @__PURE__ */ new Date()).getFullYear();
    return r(120, (i) => i + 1).reduce(
      (ranges, i) => {
        if (i !== "120")
          ranges.push(_formatcjs.format.call(void 0, `${year + Number(i)}-06-06`, token, locale));
        ranges.unshift(_formatcjs.format.call(void 0, `${year - Number(i)}-06-06`, token, locale));
        return ranges;
      },
      [_formatcjs.format.call(void 0, `${year}-06-06`, token, locale)]
    );
  }
  if (token.startsWith("D"))
    return r(31, (i) => `${token === "DD" && i < 9 ? "0" : ""}${i + 1}`);
  if (token.startsWith("H"))
    return r(24, (i) => `${token === "HH" && i < 10 ? "0" : ""}${i}`);
  if (token.startsWith("h"))
    return r(12, (i) => `${token === "hh" && i < 9 ? "0" : ""}${i + 1}`);
  if (token.startsWith("m") || token.startsWith("s"))
    return r(60, (i) => `${token.length > 1 && i < 10 ? "0" : ""}${i}`);
  return [];
}


exports.range = range;
//# sourceMappingURL=range.cjs.map