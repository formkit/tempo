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

// src/minuteEnd.ts
var minuteEnd_exports = {};
__export(minuteEnd_exports, {
  minuteEnd: () => minuteEnd
});
module.exports = __toCommonJS(minuteEnd_exports);
var import_date = require("./date.cjs");
function minuteEnd(inputDate) {
  const d = (0, import_date.date)(inputDate);
  d.setSeconds(59, 999);
  return d;
}
// Annotate the CommonJS export names for ESM import in node:
0 && (module.exports = {
  minuteEnd
});
//# sourceMappingURL=minuteEnd.cjs.map