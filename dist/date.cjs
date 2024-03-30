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

// src/date.ts
var date_exports = {};
__export(date_exports, {
  date: () => date
});
module.exports = __toCommonJS(date_exports);
var import_iso8601 = require("./iso8601.cjs");
function normalize(date2) {
  const matches = date2.match(import_iso8601.iso8601Match);
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
  if ((0, import_iso8601.iso8601)(date2)) {
    return new Date(normalize(date2));
  }
  throw new Error(`Non ISO 8601 compliant date (${date2}).`);
}
// Annotate the CommonJS export names for ESM import in node:
0 && (module.exports = {
  date
});
//# sourceMappingURL=date.cjs.map