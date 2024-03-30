// src/ap.ts
import { dayPeriodMap, specDate, normStr } from "./common.mjs";
function ap(ampm, locale) {
  const l = dayPeriodMap.get(locale);
  if (l && l[ampm])
    return l[ampm];
  const specimen = new Date(specDate);
  specimen.setUTCHours(ampm === "am" ? 5 : 20);
  const subparts = new Intl.DateTimeFormat(locale, {
    timeStyle: "full",
    timeZone: "UTC",
    hour12: true
  }).formatToParts(specimen).map(normStr);
  const period = subparts.find((part) => part.type === "dayPeriod");
  if (period) {
    const localePeriods = l || {};
    dayPeriodMap.set(
      locale,
      Object.assign(localePeriods, { [ampm]: period.value })
    );
    return period.value;
  }
  return ampm;
}
export {
  ap
};
//# sourceMappingURL=ap.mjs.map