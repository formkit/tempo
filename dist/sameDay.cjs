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

// src/sameDay.ts
var sameDay_exports = {};
__export(sameDay_exports, {
  sameDay: () => sameDay
});
module.exports = __toCommonJS(sameDay_exports);
var import_date = require("./date.cjs");
function sameDay(inputDateA, inputDateB) {
  const a = (0, import_date.date)(inputDateA);
  const b = (0, import_date.date)(inputDateB);
  return a.getDate() === b.getDate() && a.getMonth() === b.getMonth() && a.getFullYear() === b.getFullYear();
}
// Annotate the CommonJS export names for ESM import in node:
0 && (module.exports = {
  sameDay
});
//# sourceMappingURL=sameDay.cjs.map