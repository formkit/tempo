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

// src/weekEnd.ts
var weekEnd_exports = {};
__export(weekEnd_exports, {
  weekEnd: () => weekEnd
});
module.exports = __toCommonJS(weekEnd_exports);
var import_weekStart = require("./weekStart.cjs");
function weekEnd(inputDate, startOfWeekDay = 0) {
  const d = (0, import_weekStart.weekStart)(inputDate, startOfWeekDay);
  d.setDate(d.getDate() + 6);
  d.setHours(23, 59, 59);
  return d;
}
// Annotate the CommonJS export names for ESM import in node:
0 && (module.exports = {
  weekEnd
});
//# sourceMappingURL=weekEnd.cjs.map