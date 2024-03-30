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

// src/offset.ts
var offset_exports = {};
__export(offset_exports, {
  offset: () => offset
});
module.exports = __toCommonJS(offset_exports);
var import_date = require("./date.cjs");
var import_common = require("./common.cjs");
var import_deviceTZ = require("./deviceTZ.cjs");
function relativeTime(d, timeZone) {
  const utcParts = new Intl.DateTimeFormat("en-US", {
    year: "numeric",
    month: "2-digit",
    day: "2-digit",
    hour: "2-digit",
    minute: "2-digit",
    second: "2-digit",
    timeZone,
    hourCycle: "h23"
  }).formatToParts(d).map(import_common.normStr);
  const parts = {};
  utcParts.forEach((part) => {
    parts[part.type] = part.value;
  });
  return /* @__PURE__ */ new Date(
    `${parts.year}-${parts.month}-${parts.day}T${parts.hour}:${parts.minute}:${parts.second}Z`
  );
}
function offset(utcTime, tzA = "UTC", tzB = "device") {
  var _a;
  tzB = tzB === "device" ? (_a = (0, import_deviceTZ.deviceTZ)()) != null ? _a : "utc" : tzB;
  const d = (0, import_date.date)(utcTime);
  const timeA = relativeTime(d, tzA);
  const timeB = relativeTime(d, tzB);
  const timeDiffInMins = (timeB.getTime() - timeA.getTime()) / 1e3 / 60;
  return (0, import_common.minsToOffset)(timeDiffInMins);
}
// Annotate the CommonJS export names for ESM import in node:
0 && (module.exports = {
  offset
});
//# sourceMappingURL=offset.cjs.map