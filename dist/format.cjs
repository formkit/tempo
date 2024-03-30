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

// src/format.ts
var format_exports = {};
__export(format_exports, {
  format: () => format
});
module.exports = __toCommonJS(format_exports);
var import_date = require("./date.cjs");
var import_parts = require("./parts.cjs");
var import_common = require("./common.cjs");
var import_offset = require("./offset.cjs");
var import_removeOffset = require("./removeOffset.cjs");
var import_deviceLocale = require("./deviceLocale.cjs");
var import_deviceTZ = require("./deviceTZ.cjs");
function format(inputDateOrOptions, format2 = "long", locale = "device", genitive = false, partFilter) {
  let tz, forceOffset;
  if (typeof inputDateOrOptions === "object" && !(inputDateOrOptions instanceof Date)) {
    ;
    ({
      date: inputDateOrOptions,
      format: format2,
      locale,
      genitive,
      partFilter,
      tz
    } = inputDateOrOptions);
  }
  if (format2 === "ISO8601")
    return (0, import_date.date)(inputDateOrOptions).toISOString();
  if (tz) {
    forceOffset = (0, import_offset.offset)(inputDateOrOptions, "utc", tz);
  }
  tz != null ? tz : tz = (0, import_deviceTZ.deviceTZ)();
  if ((tz == null ? void 0 : tz.toLowerCase()) !== "utc") {
    inputDateOrOptions = (0, import_removeOffset.removeOffset)(
      inputDateOrOptions,
      (0, import_offset.offset)(inputDateOrOptions, tz, "utc")
    );
  }
  if (!locale || locale === "device") {
    locale = (0, import_deviceLocale.deviceLocale)();
  }
  return (0, import_common.fill)(
    inputDateOrOptions,
    (0, import_parts.parts)(format2, locale).filter(partFilter != null ? partFilter : () => true),
    locale,
    genitive,
    forceOffset
  ).map((p) => p.value).join("");
}
// Annotate the CommonJS export names for ESM import in node:
0 && (module.exports = {
  format
});
//# sourceMappingURL=format.cjs.map