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

// src/formatStr.ts
var formatStr_exports = {};
__export(formatStr_exports, {
  formatStr: () => formatStr
});
module.exports = __toCommonJS(formatStr_exports);
var import_parts = require("./parts.cjs");
var import_common = require("./common.cjs");
function formatStr(format, locale = "en", escapeLiterals = false, filterParts = () => true) {
  return (0, import_parts.parts)(format, locale).filter(filterParts).reduce(
    (f, p) => f += escapeLiterals && p.partName === "literal" ? (0, import_common.escapeTokens)(p.token) : p.token,
    ""
  ).normalize("NFKC");
}
// Annotate the CommonJS export names for ESM import in node:
0 && (module.exports = {
  formatStr
});
//# sourceMappingURL=formatStr.cjs.map