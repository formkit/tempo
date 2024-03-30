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

// src/removeOffset.ts
var removeOffset_exports = {};
__export(removeOffset_exports, {
  removeOffset: () => removeOffset
});
module.exports = __toCommonJS(removeOffset_exports);
var import_applyOffset = require("./applyOffset.cjs");
function removeOffset(dateInput, offset = "+0000") {
  const positive = offset.slice(0, 1) === "+";
  return (0, import_applyOffset.applyOffset)(
    dateInput,
    offset.replace(positive ? "+" : "-", positive ? "-" : "+")
  );
}
// Annotate the CommonJS export names for ESM import in node:
0 && (module.exports = {
  removeOffset
});
//# sourceMappingURL=removeOffset.cjs.map