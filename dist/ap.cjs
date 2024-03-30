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

// src/ap.ts
var ap_exports = {};
__export(ap_exports, {
  ap: () => ap
});
module.exports = __toCommonJS(ap_exports);
var import_common = require("./common.cjs");
function ap(ampm, locale) {
  const l = import_common.dayPeriodMap.get(locale);
  if (l && l[ampm])
    return l[ampm];
  const specimen = new Date(import_common.specDate);
  specimen.setUTCHours(ampm === "am" ? 5 : 20);
  const subparts = new Intl.DateTimeFormat(locale, {
    timeStyle: "full",
    timeZone: "UTC",
    hour12: true
  }).formatToParts(specimen).map(import_common.normStr);
  const period = subparts.find((part) => part.type === "dayPeriod");
  if (period) {
    const localePeriods = l || {};
    import_common.dayPeriodMap.set(
      locale,
      Object.assign(localePeriods, { [ampm]: period.value })
    );
    return period.value;
  }
  return ampm;
}
// Annotate the CommonJS export names for ESM import in node:
0 && (module.exports = {
  ap
});
//# sourceMappingURL=ap.cjs.map