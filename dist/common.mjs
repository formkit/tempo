// src/common.ts
import { date } from "./date.mjs";
import { ap } from "./ap.mjs";
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
  /* @__PURE__ */ [...clockAgnostic, ...clock24, ...clock12].map((format) => {
    return [format[0], format];
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
function fill(inputDate, parts, locale, genitive = false, offset = null) {
  const partMap = createPartMap(inputDate, parts, locale, genitive);
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
      return offset != null ? offset : minsToOffset(-1 * d.getTimezoneOffset());
    }
    return value2;
  }
  return parts.map((part) => {
    return {
      ...part,
      value: value(part)
    };
  });
}
function createPartMap(inputDate, parts, locale, genitive = false) {
  const d = date(inputDate);
  const hour12 = parts.filter((part) => part.hour12);
  const hour24 = parts.filter((part) => !part.hour12);
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
function offsetToMins(offset) {
  validOffset(offset);
  const [_, sign, hours, mins] = offset.match(/([+-])([0-3][0-9])([0-6][0-9])/);
  const offsetInMins = Number(hours) * 60 + Number(mins);
  return sign === "+" ? offsetInMins : -offsetInMins;
}
function validOffset(offset) {
  const valid = /^([+-])[0-3][0-9]:?[0-6][0-9]$/.test(offset);
  if (!valid)
    throw new Error(`Invalid offset: ${offset}`);
  return offset;
}
function escapeTokens(str) {
  return clockAgnostic.concat(clock24).concat(clock12).sort((a, b) => a[0].length > b[0].length ? 1 : -1).reduce((target, part) => {
    return target.replace(part[0], `\\${part[0]}`);
  }, str);
}
function isNumeric(part) {
  return ["numeric", "2-digit"].includes(part.partValue);
}
function validate(parts) {
  let lastPart = void 0;
  for (const part of parts) {
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
  return parts;
}
export {
  clock12,
  clock24,
  clockAgnostic,
  dayPeriodMap,
  escapeTokens,
  fill,
  fixedLength,
  fixedLengthByOffset,
  four,
  genitiveTokens,
  isNumeric,
  memoParts,
  minsToOffset,
  normStr,
  offsetToMins,
  specDate,
  styles,
  tokens,
  two,
  validOffset,
  validate
};
//# sourceMappingURL=common.mjs.map