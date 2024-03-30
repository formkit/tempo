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

// src/addYear.ts
var addYear_exports = {};
__export(addYear_exports, {
  addYear: () => addYear
});
module.exports = __toCommonJS(addYear_exports);
var import_date = require("./date.cjs");
var import_monthDays = require("./monthDays.cjs");
function addYear(inputDate, count = 1, dateOverflow = false) {
  const d = (0, import_date.date)(inputDate);
  const dayOfMonth = d.getDate();
  if (!dateOverflow)
    d.setDate(1);
  d.setFullYear(d.getFullYear() + count);
  if (!dateOverflow) {
    const daysInMonth = (0, import_monthDays.monthDays)(d);
    d.setDate(daysInMonth < dayOfMonth ? daysInMonth : dayOfMonth);
  }
  return d;
}
// Annotate the CommonJS export names for ESM import in node:
0 && (module.exports = {
  addYear
});
//# sourceMappingURL=addYear.cjs.map