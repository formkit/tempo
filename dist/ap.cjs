"use strict";Object.defineProperty(exports, "__esModule", {value: true});// src/ap.ts
var _commoncjs = require('./common.cjs');
function ap(ampm, locale) {
  const l = _commoncjs.dayPeriodMap.get(locale);
  if (l && l[ampm])
    return l[ampm];
  const specimen = new Date(_commoncjs.specDate);
  specimen.setUTCHours(ampm === "am" ? 5 : 20);
  const subparts = new Intl.DateTimeFormat(locale, {
    timeStyle: "full",
    timeZone: "UTC",
    hour12: true
  }).formatToParts(specimen).map(_commoncjs.normStr);
  const period = subparts.find((part) => part.type === "dayPeriod");
  if (period) {
    const localePeriods = l || {};
    _commoncjs.dayPeriodMap.set(
      locale,
      Object.assign(localePeriods, { [ampm]: period.value })
    );
    return period.value;
  }
  return ampm;
}


exports.ap = ap;
//# sourceMappingURL=ap.cjs.map