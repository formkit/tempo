// src/format.ts
import { date } from "./date.mjs";
import { parts } from "./parts.mjs";
import { fill } from "./common.mjs";
import { offset } from "./offset.mjs";
import { removeOffset } from "./removeOffset.mjs";
import { deviceLocale } from "./deviceLocale.mjs";
import { deviceTZ } from "./deviceTZ.mjs";
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
    return date(inputDateOrOptions).toISOString();
  if (tz) {
    forceOffset = offset(inputDateOrOptions, "utc", tz);
  }
  tz != null ? tz : tz = deviceTZ();
  if ((tz == null ? void 0 : tz.toLowerCase()) !== "utc") {
    inputDateOrOptions = removeOffset(
      inputDateOrOptions,
      offset(inputDateOrOptions, tz, "utc")
    );
  }
  if (!locale || locale === "device") {
    locale = deviceLocale();
  }
  return fill(
    inputDateOrOptions,
    parts(format2, locale).filter(partFilter != null ? partFilter : () => true),
    locale,
    genitive,
    forceOffset
  ).map((p) => p.value).join("");
}
export {
  format
};
//# sourceMappingURL=format.mjs.map