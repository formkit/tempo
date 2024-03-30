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

// src/isEqual.ts
var isEqual_exports = {};
__export(isEqual_exports, {
  isEqual: () => isEqual
});
module.exports = __toCommonJS(isEqual_exports);
var import_date = require("./date.cjs");
function isEqual(dateLeft, dateRight) {
  const _dateLeft = (0, import_date.date)(dateLeft);
  const _dateRight = (0, import_date.date)(dateRight);
  return +_dateLeft === +_dateRight;
}
// Annotate the CommonJS export names for ESM import in node:
0 && (module.exports = {
  isEqual
});
//# sourceMappingURL=isEqual.cjs.map