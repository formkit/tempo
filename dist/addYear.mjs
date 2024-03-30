// src/addYear.ts
import { date } from "./date.mjs";
import { monthDays } from "./monthDays.mjs";
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
export {
  addYear
};
//# sourceMappingURL=addYear.mjs.map