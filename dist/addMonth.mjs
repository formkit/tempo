// src/addMonth.ts
import { date } from "./date.mjs";
import { monthDays } from "./monthDays.mjs";
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
export {
  addMonth
};
//# sourceMappingURL=addMonth.mjs.map