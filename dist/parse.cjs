"use strict";Object.defineProperty(exports, "__esModule", {value: true});// src/parse.ts
var _datecjs = require('./date.cjs');
var _commoncjs = require('./common.cjs');
var _formatStrcjs = require('./formatStr.cjs');
var _fourDigitYearcjs = require('./fourDigitYear.cjs');
var _apcjs = require('./ap.cjs');
var _rangecjs = require('./range.cjs');
var _monthDayscjs = require('./monthDays.cjs');
var _partscjs = require('./parts.cjs');
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
      `Date (${dateStr}) does not match format (${_formatStrcjs.formatStr.call(void 0, format, locale)})`
    );
  };
  if (format === "ISO8601")
    return _datecjs.date.call(void 0, dateStr);
  const genitive = _commoncjs.styles.includes(format) || typeof format === "object";
  const formatParts = _commoncjs.validate.call(void 0, _partscjs.parts.call(void 0, format, locale).filter(partFilter));
  if (!formatParts.length)
    throw new Error("parse() requires a pattern.");
  let parsedParts;
  try {
    parsedParts = parseParts(dateStr, formatParts);
  } catch (e) {
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
      parsed.set("YYYY", _fourDigitYearcjs.fourDigitYear.call(void 0, part.value));
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
        a = part.value.toLowerCase() === _apcjs.ap.call(void 0, "am", locale).toLowerCase();
      } else if (t === "Z") {
        offset = _commoncjs.validOffset.call(void 0, part.value);
      } else {
        const values = _rangecjs.range.call(void 0, t, locale, genitive);
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
  const maxDaysInMonth = _monthDayscjs.monthDays.call(void 0, /* @__PURE__ */ new Date(`${_commoncjs.four.call(void 0, Y)}-${_commoncjs.two.call(void 0, M + 1)}-10`));
  if (maxDaysInMonth < D && dateOverflow === "throw")
    throw new Error(`Invalid date ${_commoncjs.four.call(void 0, Y)}-${_commoncjs.two.call(void 0, M + 1)}-${_commoncjs.two.call(void 0, D)}`);
  D = dateOverflow === "backward" ? Math.min(D, maxDaysInMonth) : D;
  const isoString = `${_commoncjs.four.call(void 0, Y)}-${_commoncjs.two.call(void 0, M + 1)}-${_commoncjs.two.call(void 0, D)}T${_commoncjs.two.call(void 0, h)}:${_commoncjs.two.call(void 0, 
    m
  )}:${_commoncjs.two.call(void 0, s)}${offset}`;
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
      len = _commoncjs.fixedLengthByOffset.call(void 0, dateStr.substring(pos));
    } else if (current.token in _commoncjs.fixedLength) {
      len = _commoncjs.fixedLength[current.token];
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



exports.parse = parse; exports.parseParts = parseParts;
//# sourceMappingURL=parse.cjs.map