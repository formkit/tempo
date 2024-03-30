// src/isBefore.ts
import { date } from "./date.mjs";
function isBefore(inputDate, dateToCompare) {
  const _date = date(inputDate);
  const _dateToCompare = date(dateToCompare);
  return +_date < +_dateToCompare;
}
export {
  isBefore
};
//# sourceMappingURL=isBefore.mjs.map