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

// src/addMinute.ts
var addMinute_exports = {};
__export(addMinute_exports, {
  addMinute: () => addMinute
});
module.exports = __toCommonJS(addMinute_exports);
var import_date = require("./date.cjs");
function addMinute(inputDate, count = 1) {
  const d = (0, import_date.date)(inputDate);
  d.setMinutes(d.getMinutes() + count);
  return d;
}
// Annotate the CommonJS export names for ESM import in node:
0 && (module.exports = {
  addMinute
});
//# sourceMappingURL=addMinute.cjs.map