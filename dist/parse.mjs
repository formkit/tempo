// src/parse.ts
import { date } from "./date.mjs";
import { validate, styles, fixedLength, four, two, validOffset, fixedLengthByOffset } from "./common.mjs";
import { formatStr } from "./formatStr.mjs";
import { fourDigitYear } from "./fourDigitYear.mjs";
import { ap } from "./ap.mjs";
import { range } from "./range.mjs";
import { monthDays } from "./monthDays.mjs";
import { parts } from "./parts.mjs";
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
      `Date (${dateStr}) does not match format (${formatStr(format, locale)})`
    );
  };
  if (format === "ISO8601")
    return date(dateStr);
  const genitive = styles.includes(format) || typeof format === "object";
  const formatParts = validate(parts(format, locale).filter(partFilter));
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
      parsed.set("YYYY", fourDigitYear(part.value));
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
        a = part.value.toLowerCase() === ap("am", locale).toLowerCase();
      } else if (t === "Z") {
        offset = validOffset(part.value);
      } else {
        const values = range(t, locale, genitive);
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
  const maxDaysInMonth = monthDays(/* @__PURE__ */ new Date(`${four(Y)}-${two(M + 1)}-10`));
  if (maxDaysInMonth < D && dateOverflow === "throw")
    throw new Error(`Invalid date ${four(Y)}-${two(M + 1)}-${two(D)}`);
  D = dateOverflow === "backward" ? Math.min(D, maxDaysInMonth) : D;
  const isoString = `${four(Y)}-${two(M + 1)}-${two(D)}T${two(h)}:${two(
    m
  )}:${two(s)}${offset}`;
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
      len = fixedLengthByOffset(dateStr.substring(pos));
    } else if (current.token in fixedLength) {
      len = fixedLength[current.token];
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
export {
  parse,
  parseParts
};
//# sourceMappingURL=parse.mjs.map