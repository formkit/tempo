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

// src/yearEnd.ts
var yearEnd_exports = {};
__export(yearEnd_exports, {
  yearEnd: () => yearEnd
});
module.exports = __toCommonJS(yearEnd_exports);
var import_date = require("./date.cjs");
function yearEnd(inputDate) {
  const d = (0, import_date.date)(inputDate);
  d.setMonth(11);
  d.setDate(31);
  d.setHours(23, 59, 59, 999);
  return d;
}
// Annotate the CommonJS export names for ESM import in node:
0 && (module.exports = {
  yearEnd
});
//# sourceMappingURL=yearEnd.cjs.map