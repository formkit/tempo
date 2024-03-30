"use strict";
var __defProp = Object.defineProperty;
var __getOwnPropDesc = Object.getOwnPropertyDescriptor;
var __getOwnPropNames = Object.getOwnPropertyNames;
var __hasOwnProp = Object.prototype.hasOwnProperty;
var __export = (target, all) => {
  for (var name in all)
    __defProp(target, name, { get: all[name], enumerable: true });
};
var __copyProps = (to, from, except, desc) => {
  if (from && typeof from === "object" || typeof from === "function") {
    for (let key of __getOwnPropNames(from))
      if (!__hasOwnProp.call(to, key) && key !== except)
        __defProp(to, key, { get: () => from[key], enumerable: !(desc = __getOwnPropDesc(from, key)) || desc.enumerable });
  }
  return to;
};
var __toCommonJS = (mod) => __copyProps(__defProp({}, "__esModule", { value: true }), mod);

// src/range.ts
var range_exports = {};
__export(range_exports, {
  range: () => range
});
module.exports = __toCommonJS(range_exports);
var import_format = require("./format.cjs");
var import_ap = require("./ap.cjs");
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
      (m) => (0, import_format.format)(`2000-${m}-05`, token, locale, genitive)
    );
  if (token.startsWith("d"))
    return r(7, (i) => `0${i + 2}`).map(
      (d) => (0, import_format.format)(`2022-10-${d}`, token, locale)
    );
  if (token === "a")
    return [(0, import_ap.ap)("am", locale).toLowerCase(), (0, import_ap.ap)("pm", locale).toLowerCase()];
  if (token === "A")
    return [(0, import_ap.ap)("am", locale).toUpperCase(), (0, import_ap.ap)("pm", locale).toUpperCase()];
  if (token.startsWith("Y")) {
    const year = (/* @__PURE__ */ new Date()).getFullYear();
    return r(120, (i) => i + 1).reduce(
      (ranges, i) => {
        if (i !== "120")
          ranges.push((0, import_format.format)(`${year + Number(i)}-06-06`, token, locale));
        ranges.unshift((0, import_format.format)(`${year - Number(i)}-06-06`, token, locale));
        return ranges;
      },
      [(0, import_format.format)(`${year}-06-06`, token, locale)]
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
// Annotate the CommonJS export names for ESM import in node:
0 && (module.exports = {
  range
});
//# sourceMappingURL=range.cjs.map