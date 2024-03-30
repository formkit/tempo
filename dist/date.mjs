// src/date.ts
import { iso8601, iso8601Match } from "./iso8601.mjs";
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
export {
  date
};
//# sourceMappingURL=date.mjs.map