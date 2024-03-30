// src/weekStart.ts
import { date } from "./date.mjs";
function weekStart(inputDate, startOfWeekDay = 0) {
  const d = date(inputDate);
  let diff = startOfWeekDay - d.getDay();
  if (diff > 0)
    diff = diff - 7;
  d.setDate(d.getDate() + diff);
  d.setHours(0, 0, 0);
  return d;
}
export {
  weekStart
};
//# sourceMappingURL=weekStart.mjs.map