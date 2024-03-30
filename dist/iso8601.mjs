// src/iso8601.ts
var iso8601Match = /^([0-9]{4})-([0-1][0-9])(?:-([0-3][0-9]))?(?:[T ]?([0-2][0-9])(?::([0-5][0-9]))?(?::([0-5][0-9]))?)?(?:\.[0-9]+)?(Z|(?:\+|\-)[0-9]{2}:?[0-9]{2})?$/;
function iso8601(date) {
  const matches = date.match(iso8601Match);
  if (matches) {
    const month = Number(matches[2]);
    if (month < 1 || month > 12)
      return false;
    if (typeof matches[3] !== void 0) {
      const date2 = Number(matches[3]);
      if (date2 < 1 || date2 > 31)
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
export {
  iso8601,
  iso8601Match
};
//# sourceMappingURL=iso8601.mjs.map