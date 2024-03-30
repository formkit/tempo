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

// src/monthDays.ts
var monthDays_exports = {};
__export(monthDays_exports, {
  monthDays: () => monthDays
});
module.exports = __toCommonJS(monthDays_exports);
var import_monthEnd = require("./monthEnd.cjs");
function monthDays(inputDate) {
  const d = (0, import_monthEnd.monthEnd)(inputDate);
  return d.getDate();
}
// Annotate the CommonJS export names for ESM import in node:
0 && (module.exports = {
  monthDays
});
//# sourceMappingURL=monthDays.cjs.map