// src/fourDigitYear.ts
function fourDigitYear(value) {
  const y = (/* @__PURE__ */ new Date()).getFullYear();
  const currentYear = y % 100;
  const century = Math.floor(y / 100);
  const parsedYear = Number(value);
  return (century + (parsedYear > currentYear + 20 ? -1 : 0)) * 100 + parsedYear;
}
export {
  fourDigitYear
};
//# sourceMappingURL=fourDigitYear.mjs.map