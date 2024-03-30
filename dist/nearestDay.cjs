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

// src/nearestDay.ts
var nearestDay_exports = {};
__export(nearestDay_exports, {
  nearestDay: () => nearestDay
});
module.exports = __toCommonJS(nearestDay_exports);
var import_date = require("./date.cjs");
var import_monthDays = require("./monthDays.cjs");
var import_yearDays = require("./yearDays.cjs");
var import_dayOfYear = require("./dayOfYear.cjs");
var import_addDay = require("./addDay.cjs");
function nearestDay(inputDate, search, constraint = 7) {
  let increments;
  let decrements;
  const d = (0, import_date.date)(inputDate);
  switch (constraint) {
    case "month":
      decrements = d.getDate();
      increments = (0, import_monthDays.monthDays)(d) - d.getDate();
      break;
    case "week":
      decrements = d.getDay() + 1;
      increments = 6 - d.getDay();
      break;
    case "year":
      const total = (0, import_yearDays.yearDays)(d);
      const day = (0, import_dayOfYear.dayOfYear)(d);
      decrements = day;
      increments = total - day;
      break;
    default:
      increments = decrements = constraint;
  }
  for (let i = 0; i <= increments || i < decrements; i++) {
    if (i <= increments) {
      const next = (0, import_addDay.addDay)(d, i);
      if (search(next))
        return next;
    }
    if (i && i <= decrements) {
      const prev = (0, import_addDay.addDay)(d, -i);
      if (search(prev))
        return prev;
    }
  }
  return null;
}
// Annotate the CommonJS export names for ESM import in node:
0 && (module.exports = {
  nearestDay
});
//# sourceMappingURL=nearestDay.cjs.map