// src/isAfter.ts
import { date } from "./date.mjs";
function isAfter(inputDate, dateToCompare) {
  const _date = date(inputDate);
  const _dateToCompare = date(dateToCompare);
  return +_date > +_dateToCompare;
}
export {
  isAfter
};
//# sourceMappingURL=isAfter.mjs.map