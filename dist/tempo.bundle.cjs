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

// src/index.ts
var src_exports = {};
__export(src_exports, {
  addDay: () => addDay,
  addHour: () => addHour,
  addMinute: () => addMinute,
  addMonth: () => addMonth,
  addSecond: () => addSecond,
  addYear: () => addYear,
  ap: () => ap,
  applyOffset: () => applyOffset,
  date: () => date,
  dayEnd: () => dayEnd,
  dayOfYear: () => dayOfYear,
  dayStart: () => dayStart,
  format: () => format,
  formatStr: () => formatStr,
  fourDigitYear: () => fourDigitYear,
  hourEnd: () => hourEnd,
  hourStart: () => hourStart,
  isAfter: () => isAfter,
  isBefore: () => isBefore,
  isEqual: () => isEqual,
  iso8601: () => iso8601,
  minuteEnd: () => minuteEnd,
  minuteStart: () => minuteStart,
  monthDays: () => monthDays,
  monthEnd: () => monthEnd,
  monthStart: () => monthStart,
  nearestDay: () => nearestDay,
  offset: () => offset,
  parse: () => parse,
  parseParts: () => parseParts,
  parts: () => parts,
  range: () => range,
  removeOffset: () => removeOffset,
  sameDay: () => sameDay,
  sameHour: () => sameHour,
  sameMinute: () => sameMinute,
  sameSecond: () => sameSecond,
  sameYear: () => sameYear,
  tzDate: () => tzDate,
  weekEnd: () => weekEnd,
  weekStart: () => weekStart,
  yearDays: () => yearDays,
  yearEnd: () => yearEnd,
  yearStart: () => yearStart
});
module.exports = __toCommonJS(src_exports);

// src/iso8601.ts
var iso8601Match = /^([0-9]{4})-([0-1][0-9])(?:-([0-3][0-9]))?(?:[T ]?([0-2][0-9])(?::([0-5][0-9]))?(?::([0-5][0-9]))?)?(?:\.[0-9]+)?(Z|(?:\+|\-)[0-9]{2}:?[0-9]{2})?$/;
function iso8601(date2) {
  const matches = date2.match(iso8601Match);
  if (matches) {
    const month = Number(matches[2]);
    if (month < 1 || month > 12)
      return false;
    if (typeof matches[3] !== void 0) {
      const date3 = Number(matches[3]);
      if (date3 < 1 || date3 > 31)
        return false;
    }
    if (typeof matches[4] !== void 0) {
      const hours = Number(matches[4]);
      if (hours < 0 || hours > 23)
        return false;
    }
    return true;
  }
  return false;
}

// src/date.ts
function normalize(date2) {
  const matches = date2.match(iso8601Match);
  if (matches && typeof matches[4] === "undefined") {
    return date2 += "T00:00:00";
  }
  return date2;
}
function date(date2) {
  if (!date2) {
    date2 = /* @__PURE__ */ new Date();
  }
  if (date2 instanceof Date) {
    const d = new Date(date2);
    d.setMilliseconds(0);
    return d;
  }
  date2 = date2.trim();
  if (iso8601(date2)) {
    return new Date(normalize(date2));
  }
  throw new Error(`Non ISO 8601 compliant date (${date2}).`);
}

// src/addDay.ts
function addDay(inputDate, count = 1) {
  const d = date(inputDate);
  d.setDate(d.getDate() + count);
  return d;
}

// src/monthEnd.ts
function monthEnd(inputDate) {
  const d = date(inputDate);
  d.setDate(1);
  d.setMonth(d.getMonth() + 1);
  d.setDate(0);
  return d;
}

// src/monthDays.ts
function monthDays(inputDate) {
  const d = monthEnd(inputDate);
  return d.getDate();
}

// src/addMonth.ts
function addMonth(inputDate, count = 1, dateOverflow = false) {
  const d = date(inputDate);
  const dayOfMonth = d.getDate();
  if (!dateOverflow)
    d.setDate(1);
  d.setMonth(d.getMonth() + count);
  if (!dateOverflow) {
    const daysInMonth = monthDays(d);
    d.setDate(daysInMonth < dayOfMonth ? daysInMonth : dayOfMonth);
  }
  return d;
}

// src/addYear.ts
function addYear(inputDate, count = 1, dateOverflow = false) {
  const d = date(inputDate);
  const dayOfMonth = d.getDate();
  if (!dateOverflow)
    d.setDate(1);
  d.setFullYear(d.getFullYear() + count);
  if (!dateOverflow) {
    const daysInMonth = monthDays(d);
    d.setDate(daysInMonth < dayOfMonth ? daysInMonth : dayOfMonth);
  }
  return d;
}

// src/addHour.ts
function addHour(inputDate, count = 1) {
  const d = date(inputDate);
  d.setHours(d.getHours() + count);
  return d;
}

// src/addMinute.ts
function addMinute(inputDate, count = 1) {
  const d = date(inputDate);
  d.setMinutes(d.getMinutes() + count);
  return d;
}

// src/addSecond.ts
function addSecond(inputDate, count = 1) {
  const d = date(inputDate);
  d.setSeconds(d.getSeconds() + count);
  return d;
}

// src/common.ts
var specDate = "1999-03-04T02:05:01.000Z";
var memoParts = /* @__PURE__ */ new Map();
var clockAgnostic = [
  ["YYYY", { year: "numeric" }],
  ["YY", { year: "2-digit" }],
  ["MMMM", { month: "long" }],
  ["MMM", { month: "short" }],
  ["MM", { month: "2-digit" }],
  ["M", { month: "numeric" }],
  ["DD", { day: "2-digit" }],
  ["D", { day: "numeric" }],
  ["dddd", { weekday: "long" }],
  ["ddd", { weekday: "short" }],
  ["d", { weekday: "narrow" }],
  ["mm", { minute: "2-digit" }],
  ["m", { minute: "numeric" }],
  ["ss", { second: "2-digit" }],
  ["s", { second: "numeric" }],
  ["Z", { timeZoneName: "short" }]
];
var clock24 = [
  ["HH", { hour: "2-digit" }],
  ["H", { hour: "numeric" }]
];
var clock12 = [
  ["hh", { hour: "2-digit" }],
  ["h", { hour: "numeric" }],
  ["a", { dayPeriod: "narrow" }],
  ["A", { dayPeriod: "narrow" }]
];
var fixedLength = {
  DD: 2,
  HH: 2,
  MM: 2,
  YY: 2,
  YYYY: 4,
  hh: 2,
  mm: 2,
  ss: 2
};
function fixedLengthByOffset(offsetString) {
  if (/^[+-]\d{2}:\d{2}/.test(offsetString)) {
    return 6;
  }
  if (/^[+-]\d{4}/.test(offsetString)) {
    return 5;
  }
  throw new Error("Invalid offset format");
}
var genitiveTokens = ["MMMM", "MMM", "dddd", "ddd"];
var tokens = /* @__PURE__ */ new Map(
  /* @__PURE__ */ [...clockAgnostic, ...clock24, ...clock12].map((format2) => {
    return [format2[0], format2];
  })
);
var dayPeriodMap = /* @__PURE__ */ new Map();
var styles = [
  "full",
  "long",
  "medium",
  "short"
];
var two = (n) => String(n).padStart(2, "0");
var four = (n) => String(n).padStart(2, "0");
function normStr(part) {
  if (part.type === "literal") {
    part.value = part.value.normalize("NFKC");
  }
  return part;
}
function fill(inputDate, parts2, locale, genitive = false, offset2 = null) {
  const partMap = createPartMap(inputDate, parts2, locale, genitive);
  const d = date(inputDate);
  function value({ partName, partValue, token }) {
    if (partName === "literal")
      return partValue;
    const value2 = partMap[partName];
    if (partName === "hour" && token === "H") {
      return value2.replace(/^0/, "") || "0";
    }
    if (["mm", "ss", "MM"].includes(token) && value2.length === 1) {
      return `0${value2}`;
    }
    if (partName === "dayPeriod") {
      const p = ap(d.getUTCHours() < 12 ? "am" : "pm", locale);
      return token === "A" ? p.toUpperCase() : p.toLowerCase();
    }
    if (partName === "timeZoneName") {
      return offset2 != null ? offset2 : minsToOffset(-1 * d.getTimezoneOffset());
    }
    return value2;
  }
  return parts2.map((part) => {
    return {
      ...part,
      value: value(part)
    };
  });
}
function createPartMap(inputDate, parts2, locale, genitive = false) {
  const d = date(inputDate);
  const hour12 = parts2.filter((part) => part.hour12);
  const hour24 = parts2.filter((part) => !part.hour12);
  const valueParts = [];
  const genitiveParts = [];
  function addValues(requestedParts, hour122 = false) {
    const preciseLocale = `${locale}-u-hc-${hour122 ? "h12" : "h23"}`;
    valueParts.push(
      ...new Intl.DateTimeFormat(
        preciseLocale,
        requestedParts.reduce(
          (options, part) => {
            if (part.partName === "literal")
              return options;
            if (genitive && genitiveTokens.includes(part.token)) {
              genitiveParts.push(part);
            }
            return Object.assign(options, part.option);
          },
          { timeZone: "UTC" }
        )
      ).formatToParts(d).map(normStr)
    );
    if (genitive && genitiveParts.length) {
      for (const part of genitiveParts) {
        let formattedParts = [];
        switch (part.token) {
          case "MMMM":
            formattedParts = new Intl.DateTimeFormat(preciseLocale, {
              dateStyle: "long",
              timeZone: "UTC"
            }).formatToParts(d).map(normStr);
            break;
          case "MMM":
            formattedParts = new Intl.DateTimeFormat(preciseLocale, {
              dateStyle: "medium",
              timeZone: "UTC"
            }).formatToParts(d).map(normStr);
            break;
        }
        const genitiveFormattedPart = formattedParts.find(
          (p) => p.type === part.partName
        );
        const index = valueParts.findIndex((p) => p.type === part.partName);
        if (genitiveFormattedPart && index > -1) {
          valueParts[index] = genitiveFormattedPart;
        }
      }
    }
  }
  if (hour12.length)
    addValues(hour12, true);
  if (hour24.length)
    addValues(hour24);
  return valueParts.reduce((map, part) => {
    map[part.type] = part.value;
    return map;
  }, {});
}
function minsToOffset(timeDiffInMins) {
  const hours = String(Math.floor(Math.abs(timeDiffInMins / 60))).padStart(
    2,
    "0"
  );
  const mins = String(Math.abs(timeDiffInMins % 60)).padStart(2, "0");
  const sign = timeDiffInMins < 0 ? "-" : "+";
  return `${sign}${hours}${mins}`;
}
function offsetToMins(offset2) {
  validOffset(offset2);
  const [_, sign, hours, mins] = offset2.match(/([+-])([0-3][0-9])([0-6][0-9])/);
  const offsetInMins = Number(hours) * 60 + Number(mins);
  return sign === "+" ? offsetInMins : -offsetInMins;
}
function validOffset(offset2) {
  const valid = /^([+-])[0-3][0-9]:?[0-6][0-9]$/.test(offset2);
  if (!valid)
    throw new Error(`Invalid offset: ${offset2}`);
  return offset2;
}
function escapeTokens(str) {
  return clockAgnostic.concat(clock24).concat(clock12).sort((a, b) => a[0].length > b[0].length ? 1 : -1).reduce((target, part) => {
    return target.replace(part[0], `\\${part[0]}`);
  }, str);
}
function isNumeric(part) {
  return ["numeric", "2-digit"].includes(part.partValue);
}
function validate(parts2) {
  let lastPart = void 0;
  for (const part of parts2) {
    if (part.partName === "literal" && !isNaN(parseFloat(part.partValue))) {
      throw new Error(`Numbers in format (${part.partValue}).`);
    }
    if (lastPart && lastPart.partName !== "literal" && part.partName !== "literal") {
      if (!(lastPart.token in fixedLength) && !(part.token in fixedLength) && !(isNumeric(lastPart) && part.token.toLowerCase() === "a")) {
        throw new Error(
          `Illegal adjacent tokens (${lastPart.token}, ${part.token})`
        );
      }
    }
    lastPart = part;
  }
  return parts2;
}

// src/ap.ts
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

// src/applyOffset.ts
function applyOffset(dateInput, offset2 = "+0000") {
  const d = date(dateInput);
  const timeDiffInMins = offsetToMins(offset2);
  return new Date(d.getTime() + timeDiffInMins * 1e3 * 60);
}

// src/deviceTZ.ts
function deviceTZ() {
  return Intl.DateTimeFormat().resolvedOptions().timeZone;
}

// src/offset.ts
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
  }).formatToParts(d).map(normStr);
  const parts2 = {};
  utcParts.forEach((part) => {
    parts2[part.type] = part.value;
  });
  return /* @__PURE__ */ new Date(
    `${parts2.year}-${parts2.month}-${parts2.day}T${parts2.hour}:${parts2.minute}:${parts2.second}Z`
  );
}
function offset(utcTime, tzA = "UTC", tzB = "device") {
  var _a;
  tzB = tzB === "device" ? (_a = deviceTZ()) != null ? _a : "utc" : tzB;
  const d = date(utcTime);
  const timeA = relativeTime(d, tzA);
  const timeB = relativeTime(d, tzB);
  const timeDiffInMins = (timeB.getTime() - timeA.getTime()) / 1e3 / 60;
  return minsToOffset(timeDiffInMins);
}

// src/tzDate.ts
function tzDate(inputDate, tz) {
  const d = date(inputDate);
  return applyOffset(d, offset(d, tz));
}

// src/dayOfYear.ts
function dayOfYear(inputDate) {
  const d = date(inputDate);
  return Math.round(
    (new Date(d.getFullYear(), d.getMonth(), d.getDate(), 0, 0).getTime() - new Date(d.getFullYear(), 0, 0).getTime()) / 864e5
  );
}

// src/dayEnd.ts
function dayEnd(inputDate) {
  const d = date(inputDate);
  d.setHours(23, 59, 59, 999);
  return d;
}

// src/dayStart.ts
function dayStart(inputDate) {
  const d = date(inputDate);
  d.setHours(0, 0, 0);
  return d;
}

// src/parts.ts
function parts(format2, locale) {
  if (styles.includes(format2) || typeof format2 === "object") {
    return styleParts(format2, locale);
  }
  let f = format2;
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
  function validate2(patterns) {
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
  const found24Patterns = clockAgnostic.filter(testPattern).concat(clock24.filter(testPattern)).map(createPart.bind(null, false));
  const parts2 = validate2(
    found24Patterns.concat(
      clock12.filter(testPattern).map(createPart.bind(null, true))
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
function styleParts(format2, locale) {
  const options = {
    timeZone: "UTC"
  };
  if (typeof format2 === "string") {
    options.dateStyle = format2;
  } else {
    if ("date" in format2)
      options.dateStyle = format2.date;
    if ("time" in format2)
      options.timeStyle = format2.time;
  }
  const formatter = new Intl.DateTimeFormat(locale, options);
  const segments = formatter.formatToParts(new Date(specDate)).map(normStr);
  const hourTypeSegments = formatter.formatToParts(/* @__PURE__ */ new Date("1999-04-05T23:05:01.000Z")).map(normStr);
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
      return l === 2 ? tokens.get("YY") : tokens.get("YYYY");
    case "month":
      if (n)
        return l === 1 ? tokens.get("M") : tokens.get("MM");
      style = partStyle(locale, partName, partValue);
      switch (style) {
        case "long":
          return tokens.get("MMMM");
        default:
          return tokens.get("MMM");
      }
    case "day":
      return l === 1 ? tokens.get("D") : tokens.get("DD");
    case "weekday":
      style = partStyle(locale, partName, partValue);
      switch (style) {
        case "narrow":
          return tokens.get("d");
        case "short":
          return tokens.get("ddd");
        default:
          return tokens.get("dddd");
      }
    case "hour":
      if (hour === 12)
        return l === 1 ? tokens.get("h") : tokens.get("hh");
      return l === 1 ? tokens.get("H") : tokens.get("HH");
    case "minute":
      return l === 1 ? tokens.get("m") : tokens.get("mm");
    case "second":
      return l === 1 ? tokens.get("s") : tokens.get("ss");
    case "dayPeriod":
      return /^[A-Z]+$/u.test(partValue) ? tokens.get("A") : tokens.get("a");
    case "literal":
      return [partValue, { literal: partValue }, new RegExp("")];
    case "timeZoneName":
      const offset2 = partValue.split("-");
      return offset2.length === 2 && offset2[1].length === 4 ? tokens.get("ZZ") : tokens.get("Z");
    default:
      return void 0;
  }
}
function partStyle(locale, part, value) {
  if (!memoParts.has(locale)) {
    const date2 = new Date(specDate);
    const weekdays = [3, 8, 9, 7, 6, 4, 3];
    const parts2 = ["weekday", "month", "dayPeriod"];
    const partStyles = ["long", "short", "narrow"];
    const formats2 = {};
    for (let i = 0; i < 12; i++) {
      date2.setMonth(0 + i);
      if (i in weekdays)
        date2.setDate(weekdays[i]);
      date2.setUTCHours(8 + i);
      for (const style of partStyles) {
        const segments = new Intl.DateTimeFormat(
          locale,
          parts2.reduce(
            (options, part2) => Object.assign(options, { [part2]: style }),
            { hour12: true, timeZone: "UTC" }
          )
        ).formatToParts(date2).map(normStr);
        if (style === "long" || style === "short") {
          const genitiveFormattedParts = new Intl.DateTimeFormat(locale, {
            dateStyle: style === "short" ? "medium" : "long",
            timeZone: "UTC"
          }).formatToParts(date2).map(normStr);
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
    memoParts.set(locale, formats2);
  }
  const formats = memoParts.get(locale);
  return formats ? formats[part][value] : void 0;
}

// src/removeOffset.ts
function removeOffset(dateInput, offset2 = "+0000") {
  const positive = offset2.slice(0, 1) === "+";
  return applyOffset(
    dateInput,
    offset2.replace(positive ? "+" : "-", positive ? "-" : "+")
  );
}

// src/deviceLocale.ts
function deviceLocale() {
  return Intl.DateTimeFormat().resolvedOptions().locale;
}

// src/format.ts
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

// src/formatStr.ts
function formatStr(format2, locale = "en", escapeLiterals = false, filterParts = () => true) {
  return parts(format2, locale).filter(filterParts).reduce(
    (f, p) => f += escapeLiterals && p.partName === "literal" ? escapeTokens(p.token) : p.token,
    ""
  ).normalize("NFKC");
}

// src/fourDigitYear.ts
function fourDigitYear(value) {
  const y = (/* @__PURE__ */ new Date()).getFullYear();
  const currentYear = y % 100;
  const century = Math.floor(y / 100);
  const parsedYear = Number(value);
  return (century + (parsedYear > currentYear + 20 ? -1 : 0)) * 100 + parsedYear;
}

// src/hourEnd.ts
function hourEnd(inputDate) {
  const d = date(inputDate);
  d.setMinutes(59, 59, 999);
  return d;
}

// src/hourStart.ts
function hourStart(inputDate) {
  const d = date(inputDate);
  d.setMinutes(0, 0);
  return d;
}

// src/minuteEnd.ts
function minuteEnd(inputDate) {
  const d = date(inputDate);
  d.setSeconds(59, 999);
  return d;
}

// src/minuteStart.ts
function minuteStart(inputDate) {
  const d = date(inputDate);
  d.setSeconds(0);
  return d;
}

// src/monthStart.ts
function monthStart(inputDate) {
  const d = date(inputDate);
  d.setDate(1);
  d.setHours(0, 0, 0);
  return d;
}

// src/yearDays.ts
function yearDays(inputDate) {
  const d = date(inputDate);
  return (new Date(d.getFullYear() + 1, 0, 0).getTime() - new Date(d.getFullYear(), 0, 0).getTime()) / 864e5;
}

// src/nearestDay.ts
function nearestDay(inputDate, search, constraint = 7) {
  let increments;
  let decrements;
  const d = date(inputDate);
  switch (constraint) {
    case "month":
      decrements = d.getDate();
      increments = monthDays(d) - d.getDate();
      break;
    case "week":
      decrements = d.getDay() + 1;
      increments = 6 - d.getDay();
      break;
    case "year":
      const total = yearDays(d);
      const day = dayOfYear(d);
      decrements = day;
      increments = total - day;
      break;
    default:
      increments = decrements = constraint;
  }
  for (let i = 0; i <= increments || i < decrements; i++) {
    if (i <= increments) {
      const next = addDay(d, i);
      if (search(next))
        return next;
    }
    if (i && i <= decrements) {
      const prev = addDay(d, -i);
      if (search(prev))
        return prev;
    }
  }
  return null;
}

// src/range.ts
function range(token, locale = "en", genitive = false) {
  const r = (n, c) => Array(n).fill("").map((_, i) => `${c(i)}`);
  if (token === "M")
    return r(12, (i) => i + 1);
  if (token === "MM")
    return r(12, (i) => {
      const m = i + 1;
      return m < 10 ? `0${m}` : m;
    });
  if (token.startsWith("M"))
    return range("MM").map(
      (m) => format(`2000-${m}-05`, token, locale, genitive)
    );
  if (token.startsWith("d"))
    return r(7, (i) => `0${i + 2}`).map(
      (d) => format(`2022-10-${d}`, token, locale)
    );
  if (token === "a")
    return [ap("am", locale).toLowerCase(), ap("pm", locale).toLowerCase()];
  if (token === "A")
    return [ap("am", locale).toUpperCase(), ap("pm", locale).toUpperCase()];
  if (token.startsWith("Y")) {
    const year = (/* @__PURE__ */ new Date()).getFullYear();
    return r(120, (i) => i + 1).reduce(
      (ranges, i) => {
        if (i !== "120")
          ranges.push(format(`${year + Number(i)}-06-06`, token, locale));
        ranges.unshift(format(`${year - Number(i)}-06-06`, token, locale));
        return ranges;
      },
      [format(`${year}-06-06`, token, locale)]
    );
  }
  if (token.startsWith("D"))
    return r(31, (i) => `${token === "DD" && i < 9 ? "0" : ""}${i + 1}`);
  if (token.startsWith("H"))
    return r(24, (i) => `${token === "HH" && i < 10 ? "0" : ""}${i}`);
  if (token.startsWith("h"))
    return r(12, (i) => `${token === "hh" && i < 9 ? "0" : ""}${i + 1}`);
  if (token.startsWith("m") || token.startsWith("s"))
    return r(60, (i) => `${token.length > 1 && i < 10 ? "0" : ""}${i}`);
  return [];
}

// src/parse.ts
function parse(dateStrOrOptions, format2 = "ISO8601", locale = "device") {
  let partFilter = () => true;
  let dateStr;
  let dateOverflow = "backward";
  if (typeof dateStrOrOptions === "object") {
    ;
    ({
      date: dateStr,
      format: format2 = "ISO8601",
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
      `Date (${dateStr}) does not match format (${formatStr(format2, locale)})`
    );
  };
  if (format2 === "ISO8601")
    return date(dateStr);
  const genitive = styles.includes(format2) || typeof format2 === "object";
  const formatParts = validate(parts(format2, locale).filter(partFilter));
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
  let offset2 = "";
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
        offset2 = validOffset(part.value);
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
  )}:${two(s)}${offset2}`;
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

// src/sameDay.ts
function sameDay(inputDateA, inputDateB) {
  const a = date(inputDateA);
  const b = date(inputDateB);
  return a.getDate() === b.getDate() && a.getMonth() === b.getMonth() && a.getFullYear() === b.getFullYear();
}

// src/sameSecond.ts
function sameSecond(inputDateA, inputDateB) {
  const a = date(inputDateA);
  const b = date(inputDateB);
  return a.getSeconds() === b.getSeconds();
}

// src/sameMinute.ts
function sameMinute(inputDateA, inputDateB) {
  const a = date(inputDateA);
  const b = date(inputDateB);
  return a.getMinutes() === b.getMinutes();
}

// src/sameHour.ts
function sameHour(inputDateA, inputDateB) {
  const a = date(inputDateA);
  const b = date(inputDateB);
  return a.getHours() === b.getHours();
}

// src/sameYear.ts
function sameYear(inputDateA, inputDateB) {
  const a = date(inputDateA);
  const b = date(inputDateB);
  return a.getFullYear() === b.getFullYear();
}

// src/weekStart.ts
function weekStart(inputDate, startOfWeekDay = 0) {
  const d = date(inputDate);
  let diff = startOfWeekDay - d.getDay();
  if (diff > 0)
    diff = diff - 7;
  d.setDate(d.getDate() + diff);
  d.setHours(0, 0, 0);
  return d;
}

// src/weekEnd.ts
function weekEnd(inputDate, startOfWeekDay = 0) {
  const d = weekStart(inputDate, startOfWeekDay);
  d.setDate(d.getDate() + 6);
  d.setHours(23, 59, 59);
  return d;
}

// src/yearStart.ts
function yearStart(inputDate) {
  const d = date(inputDate);
  d.setMonth(0);
  d.setDate(1);
  d.setHours(0, 0, 0);
  return d;
}

// src/yearEnd.ts
function yearEnd(inputDate) {
  const d = date(inputDate);
  d.setMonth(11);
  d.setDate(31);
  d.setHours(23, 59, 59, 999);
  return d;
}

// src/isBefore.ts
function isBefore(inputDate, dateToCompare) {
  const _date = date(inputDate);
  const _dateToCompare = date(dateToCompare);
  return +_date < +_dateToCompare;
}

// src/isAfter.ts
function isAfter(inputDate, dateToCompare) {
  const _date = date(inputDate);
  const _dateToCompare = date(dateToCompare);
  return +_date > +_dateToCompare;
}

// src/isEqual.ts
function isEqual(dateLeft, dateRight) {
  const _dateLeft = date(dateLeft);
  const _dateRight = date(dateRight);
  return +_dateLeft === +_dateRight;
}
// Annotate the CommonJS export names for ESM import in node:
0 && (module.exports = {
  addDay,
  addHour,
  addMinute,
  addMonth,
  addSecond,
  addYear,
  ap,
  applyOffset,
  date,
  dayEnd,
  dayOfYear,
  dayStart,
  format,
  formatStr,
  fourDigitYear,
  hourEnd,
  hourStart,
  isAfter,
  isBefore,
  isEqual,
  iso8601,
  minuteEnd,
  minuteStart,
  monthDays,
  monthEnd,
  monthStart,
  nearestDay,
  offset,
  parse,
  parseParts,
  parts,
  range,
  removeOffset,
  sameDay,
  sameHour,
  sameMinute,
  sameSecond,
  sameYear,
  tzDate,
  weekEnd,
  weekStart,
  yearDays,
  yearEnd,
  yearStart
});
//# sourceMappingURL=tempo.bundle.cjs.map