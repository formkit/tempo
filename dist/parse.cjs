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

// src/parse.ts
var parse_exports = {};
__export(parse_exports, {
  parse: () => parse,
  parseParts: () => parseParts
});
module.exports = __toCommonJS(parse_exports);
var import_date = require("./date.cjs");
var import_common = require("./common.cjs");
var import_formatStr = require("./formatStr.cjs");
var import_fourDigitYear = require("./fourDigitYear.cjs");
var import_ap = require("./ap.cjs");
var import_range = require("./range.cjs");
var import_monthDays = require("./monthDays.cjs");
var import_parts = require("./parts.cjs");
function parse(dateStrOrOptions, format = "ISO8601", locale = "device") {
  let partFilter = () => true;
  let dateStr;
  let dateOverflow = "backward";
  if (typeof dateStrOrOptions === "object") {
    ;
    ({
      date: dateStr,
      format = "ISO8601",
      locale = "device",
      dateOverflow = "backward",
      partFilter = () => true
    } = dateStrOrOptions);
  } else {
    dateStr = dateStrOrOptions;
  }
  if (!dateStr)
    throw new Error("parse() requires a date string.");
  const invalid = () => {
    throw new Error(
      `Date (${dateStr}) does not match format (${(0, import_formatStr.formatStr)(format, locale)})`
    );
  };
  if (format === "ISO8601")
    return (0, import_date.date)(dateStr);
  const genitive = import_common.styles.includes(format) || typeof format === "object";
  const formatParts = (0, import_common.validate)((0, import_parts.parts)(format, locale).filter(partFilter));
  if (!formatParts.length)
    throw new Error("parse() requires a pattern.");
  let parsedParts;
  try {
    parsedParts = parseParts(dateStr, formatParts);
  } catch {
    return invalid();
  }
  const now = /* @__PURE__ */ new Date();
  const parsed = /* @__PURE__ */ new Map([
    ["YYYY", now.getFullYear()],
    ["MM", now.getMonth() + 1],
    ["DD", now.getDate()],
    ["HH", 0],
    ["mm", 0],
    ["ss", 0]
  ]);
  let a = null;
  let offset = "";
  parsedParts.forEach((part) => {
    if (part.partName === "literal")
      return;
    if (part.token === part.value)
      return invalid();
    const v = Number(part.value);
    if (parsed.has(part.token)) {
      parsed.set(part.token, v);
    } else if (part.token === "YY") {
      parsed.set("YYYY", (0, import_fourDigitYear.fourDigitYear)(part.value));
    } else {
      const t = part.token;
      if (t.startsWith("d")) {
        return;
      } else if (t === "D") {
        parsed.set("DD", v);
      } else if (t === "H" || t.startsWith("h")) {
        parsed.set("HH", v);
      } else if (t === "M") {
        parsed.set("MM", v);
      } else if (t === "a" || t === "A") {
        a = part.value.toLowerCase() === (0, import_ap.ap)("am", locale).toLowerCase();
      } else if (t === "Z") {
        offset = (0, import_common.validOffset)(part.value);
      } else {
        const values = (0, import_range.range)(t, locale, genitive);
        const index = values.indexOf(part.value);
        if (index !== -1) {
          switch (t) {
            case "MMM":
            case "MMMM":
              parsed.set("MM", index + 1);
              break;
          }
        }
      }
    }
  });
  let hours = parsed.get("HH") || 0;
  if (a === false) {
    hours += hours === 12 ? 0 : 12;
    parsed.set("HH", hours === 24 ? 0 : hours);
  } else if (a === true && hours === 12) {
    parsed.set("HH", 0);
  }
  parsed.set("MM", (parsed.get("MM") || 1) - 1);
  let [Y, M, D, h, m, s] = Array.from(parsed.values());
  const maxDaysInMonth = (0, import_monthDays.monthDays)(/* @__PURE__ */ new Date(`${(0, import_common.four)(Y)}-${(0, import_common.two)(M + 1)}-10`));
  if (maxDaysInMonth < D && dateOverflow === "throw")
    throw new Error(`Invalid date ${(0, import_common.four)(Y)}-${(0, import_common.two)(M + 1)}-${(0, import_common.two)(D)}`);
  D = dateOverflow === "backward" ? Math.min(D, maxDaysInMonth) : D;
  const isoString = `${(0, import_common.four)(Y)}-${(0, import_common.two)(M + 1)}-${(0, import_common.two)(D)}T${(0, import_common.two)(h)}:${(0, import_common.two)(
    m
  )}:${(0, import_common.two)(s)}${offset}`;
  const d = new Date(isoString);
  if (isFinite(+d))
    return d;
  return invalid();
}
function parseParts(dateStr, formatParts) {
  let i = 0;
  const advance = (parts2) => [
    parts2[i++],
    parts2[i]
  ];
  let pos = 0;
  const parsed = [];
  let n = void 0;
  do {
    const [current, next] = advance(formatParts);
    n = next;
    let len = 1;
    if (current.partName === "literal") {
      len = current.partValue.length;
    } else if (current.partName === "timeZoneName") {
      len = (0, import_common.fixedLengthByOffset)(dateStr.substring(pos));
    } else if (current.token in import_common.fixedLength) {
      len = import_common.fixedLength[current.token];
    } else if (next) {
      if (next.partName === "literal") {
        len = dateStr.indexOf(next.partValue, pos) - pos;
        if (len < 0)
          throw new Error();
      } else if (next.partName === "dayPeriod") {
        for (let i2 = 1; i2 <= 4; i2++) {
          if (isNaN(Number(dateStr.charAt(pos + i2)))) {
            len = i2;
            break;
          }
        }
      } else {
        const nextChar = dateStr.substring(pos).search(/\d/);
        if (nextChar !== -1)
          len = pos + nextChar;
      }
    } else {
      len = dateStr.length;
    }
    parsed.push({ ...current, value: dateStr.substring(pos, pos + len) });
    pos += len;
  } while (n);
  return parsed;
}
// Annotate the CommonJS export names for ESM import in node:
0 && (module.exports = {
  parse,
  parseParts
});
//# sourceMappingURL=parse.cjs.map