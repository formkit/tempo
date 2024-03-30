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

// src/tzDate.ts
var tzDate_exports = {};
__export(tzDate_exports, {
  tzDate: () => tzDate
});
module.exports = __toCommonJS(tzDate_exports);
var import_offset = require("./offset.cjs");
var import_applyOffset = require("./applyOffset.cjs");
var import_date = require("./date.cjs");
function tzDate(inputDate, tz) {
  const d = (0, import_date.date)(inputDate);
  return (0, import_applyOffset.applyOffset)(d, (0, import_offset.offset)(d, tz));
}
// Annotate the CommonJS export names for ESM import in node:
0 && (module.exports = {
  tzDate
});
//# sourceMappingURL=tzDate.cjs.map