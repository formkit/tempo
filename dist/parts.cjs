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

// src/parts.ts
var parts_exports = {};
__export(parts_exports, {
  parts: () => parts
});
module.exports = __toCommonJS(parts_exports);
var import_common = require("./common.cjs");
function parts(format, locale) {
  if (import_common.styles.includes(format) || typeof format === "object") {
    return styleParts(format, locale);
  }
  let f = format;
  let match = 0;
  const testPattern = (pattern) => {
    if (!pattern[2])
      pattern[2] = new RegExp(`(.)?(${pattern[0]})`, "g");
    if (pattern[2].test(f)) {
      let didAdd = 0;
      f = f.replace(pattern[2], (_, prefix, actualMatch) => {
        if (prefix === "\\")
          return actualMatch;
        return `${typeof prefix === "string" ? prefix : ""}{!${didAdd++ ? match : match++}!}`;
      });
      return !!didAdd;
    }
    return false;
  };
  function validate(patterns) {
    const parts3 = patterns.map((part) => part.partName);
    const deduped = new Set(parts3);
    if (parts3.length > deduped.size) {
      throw new Error(`Cannot reuse format tokens.`);
    }
    return patterns;
  }
  function createPart(hour12, [token, option, exp]) {
    const partName = Object.keys(option)[0];
    const partValue = option[partName];
    return {
      option,
      partName,
      partValue,
      token,
      pattern: exp,
      hour12
    };
  }
  const found24Patterns = import_common.clockAgnostic.filter(testPattern).concat(import_common.clock24.filter(testPattern)).map(createPart.bind(null, false));
  const parts2 = validate(
    found24Patterns.concat(
      import_common.clock12.filter(testPattern).map(createPart.bind(null, true))
    )
  );
  const extractIndex = /^\{!(\d+)!\}$/;
  return f.split(/(\{!\d+!\})/).map((match2) => {
    const hasIndex = match2.match(extractIndex);
    if (hasIndex) {
      return parts2[Number(hasIndex[1])];
    }
    return {
      option: { literal: match2 },
      partName: "literal",
      partValue: match2,
      token: match2,
      pattern: new RegExp(""),
      hour12: false
    };
  }).filter((part) => !(part.partName === "literal" && part.partValue === ""));
}
function styleParts(format, locale) {
  const options = {
    timeZone: "UTC"
  };
  if (typeof format === "string") {
    options.dateStyle = format;
  } else {
    if ("date" in format)
      options.dateStyle = format.date;
    if ("time" in format)
      options.timeStyle = format.time;
  }
  const formatter = new Intl.DateTimeFormat(locale, options);
  const segments = formatter.formatToParts(new Date(import_common.specDate)).map(import_common.normStr);
  const hourTypeSegments = formatter.formatToParts(/* @__PURE__ */ new Date("1999-04-05T23:05:01.000Z")).map(import_common.normStr);
  const hourPart = hourTypeSegments.find((segment) => segment.type === "hour");
  const hourType = hourPart && hourPart.value === "23" ? 24 : 12;
  return segments.map((part) => {
    const partName = part.type;
    const formatPattern = guessPattern(
      part.type,
      part.value,
      locale,
      part.type === "hour" ? hourType : void 0
    );
    if (formatPattern === void 0)
      return;
    const partValue = formatPattern[1][partName];
    if (!partValue)
      return;
    if (!formatPattern[2])
      formatPattern[2] = new RegExp(`${formatPattern[0]}`, "g");
    return {
      option: { [partName]: partValue },
      partName,
      partValue,
      token: formatPattern[0],
      pattern: formatPattern[2],
      hour12: hourType === 12
    };
  }).filter((part) => !!part);
}
function guessPattern(partName, partValue, locale, hour) {
  const l = partValue.length;
  const n = !isNaN(Number(partValue));
  let style;
  switch (partName) {
    case "year":
      return l === 2 ? import_common.tokens.get("YY") : import_common.tokens.get("YYYY");
    case "month":
      if (n)
        return l === 1 ? import_common.tokens.get("M") : import_common.tokens.get("MM");
      style = partStyle(locale, partName, partValue);
      switch (style) {
        case "long":
          return import_common.tokens.get("MMMM");
        default:
          return import_common.tokens.get("MMM");
      }
    case "day":
      return l === 1 ? import_common.tokens.get("D") : import_common.tokens.get("DD");
    case "weekday":
      style = partStyle(locale, partName, partValue);
      switch (style) {
        case "narrow":
          return import_common.tokens.get("d");
        case "short":
          return import_common.tokens.get("ddd");
        default:
          return import_common.tokens.get("dddd");
      }
    case "hour":
      if (hour === 12)
        return l === 1 ? import_common.tokens.get("h") : import_common.tokens.get("hh");
      return l === 1 ? import_common.tokens.get("H") : import_common.tokens.get("HH");
    case "minute":
      return l === 1 ? import_common.tokens.get("m") : import_common.tokens.get("mm");
    case "second":
      return l === 1 ? import_common.tokens.get("s") : import_common.tokens.get("ss");
    case "dayPeriod":
      return /^[A-Z]+$/u.test(partValue) ? import_common.tokens.get("A") : import_common.tokens.get("a");
    case "literal":
      return [partValue, { literal: partValue }, new RegExp("")];
    case "timeZoneName":
      const offset = partValue.split("-");
      return offset.length === 2 && offset[1].length === 4 ? import_common.tokens.get("ZZ") : import_common.tokens.get("Z");
    default:
      return void 0;
  }
}
function partStyle(locale, part, value) {
  if (!import_common.memoParts.has(locale)) {
    const date = new Date(import_common.specDate);
    const weekdays = [3, 8, 9, 7, 6, 4, 3];
    const parts2 = ["weekday", "month", "dayPeriod"];
    const partStyles = ["long", "short", "narrow"];
    const formats2 = {};
    for (let i = 0; i < 12; i++) {
      date.setMonth(0 + i);
      if (i in weekdays)
        date.setDate(weekdays[i]);
      date.setUTCHours(8 + i);
      for (const style of partStyles) {
        const segments = new Intl.DateTimeFormat(
          locale,
          parts2.reduce(
            (options, part2) => Object.assign(options, { [part2]: style }),
            { hour12: true, timeZone: "UTC" }
          )
        ).formatToParts(date).map(import_common.normStr);
        if (style === "long" || style === "short") {
          const genitiveFormattedParts = new Intl.DateTimeFormat(locale, {
            dateStyle: style === "short" ? "medium" : "long",
            timeZone: "UTC"
          }).formatToParts(date).map(import_common.normStr);
          const genitiveMonth = genitiveFormattedParts.find(
            (part2) => part2.type === "month"
          );
          const index = segments.findIndex((part2) => part2.type === "month");
          if (index > -1 && genitiveMonth)
            segments[index] = genitiveMonth;
        }
        segments.forEach((part2) => {
          if (part2.type === "literal")
            return;
          const type = part2.type;
          formats2[type] = Object.assign(formats2[type] || {}, {
            [part2.value]: style
          });
        });
      }
    }
    import_common.memoParts.set(locale, formats2);
  }
  const formats = import_common.memoParts.get(locale);
  return formats ? formats[part][value] : void 0;
}
// Annotate the CommonJS export names for ESM import in node:
0 && (module.exports = {
  parts
});
//# sourceMappingURL=parts.cjs.map