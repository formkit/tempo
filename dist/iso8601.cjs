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

// src/iso8601.ts
var iso8601_exports = {};
__export(iso8601_exports, {
  iso8601: () => iso8601,
  iso8601Match: () => iso8601Match
});
module.exports = __toCommonJS(iso8601_exports);
var iso8601Match = /^([0-9]{4})-([0-1][0-9])(?:-([0-3][0-9]))?(?:[T ]?([0-2][0-9])(?::([0-5][0-9]))?(?::([0-5][0-9]))?)?(?:\.[0-9]+)?(Z|(?:\+|\-)[0-9]{2}:?[0-9]{2})?$/;
function iso8601(date) {
  const matches = date.match(iso8601Match);
  if (matches) {
    const month = Number(matches[2]);
    if (month < 1 || month > 12)
      return false;
    if (typeof matches[3] !== void 0) {
      const date2 = Number(matches[3]);
      if (date2 < 1 || date2 > 31)
        return false;
    }
    if (typeof matches[4] !== void 0) {
      const hours = Number(matches[4]);
      if (hours < 0 || hours > 23)
        return false;
    }
    return true;
  }
  return false;
}
// Annotate the CommonJS export names for ESM import in node:
0 && (module.exports = {
  iso8601,
  iso8601Match
});
//# sourceMappingURL=iso8601.cjs.map