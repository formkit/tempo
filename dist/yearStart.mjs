// src/yearStart.ts
import { date } from "./date.mjs";
function yearStart(inputDate) {
  const d = date(inputDate);
  d.setMonth(0);
  d.setDate(1);
  d.setHours(0, 0, 0);
  return d;
}
export {
  yearStart
};
//# sourceMappingURL=yearStart.mjs.map