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

// src/applyOffset.ts
var applyOffset_exports = {};
__export(applyOffset_exports, {
  applyOffset: () => applyOffset
});
module.exports = __toCommonJS(applyOffset_exports);
var import_date = require("./date.cjs");
var import_common = require("./common.cjs");
function applyOffset(dateInput, offset = "+0000") {
  const d = (0, import_date.date)(dateInput);
  const timeDiffInMins = (0, import_common.offsetToMins)(offset);
  return new Date(d.getTime() + timeDiffInMins * 1e3 * 60);
}
// Annotate the CommonJS export names for ESM import in node:
0 && (module.exports = {
  applyOffset
});
//# sourceMappingURL=applyOffset.cjs.map