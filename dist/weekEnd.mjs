// src/weekEnd.ts
import { weekStart } from "./weekStart.mjs";
function weekEnd(inputDate, startOfWeekDay = 0) {
  const d = weekStart(inputDate, startOfWeekDay);
  d.setDate(d.getDate() + 6);
  d.setHours(23, 59, 59);
  return d;
}
export {
  weekEnd
};
//# sourceMappingURL=weekEnd.mjs.map