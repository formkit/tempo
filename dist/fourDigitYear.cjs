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

// src/fourDigitYear.ts
var fourDigitYear_exports = {};
__export(fourDigitYear_exports, {
  fourDigitYear: () => fourDigitYear
});
module.exports = __toCommonJS(fourDigitYear_exports);
function fourDigitYear(value) {
  const y = (/* @__PURE__ */ new Date()).getFullYear();
  const currentYear = y % 100;
  const century = Math.floor(y / 100);
  const parsedYear = Number(value);
  return (century + (parsedYear > currentYear + 20 ? -1 : 0)) * 100 + parsedYear;
}
// Annotate the CommonJS export names for ESM import in node:
0 && (module.exports = {
  fourDigitYear
});
//# sourceMappingURL=fourDigitYear.cjs.map