// src/yearEnd.ts
import { date } from "./date.mjs";
function yearEnd(inputDate) {
  const d = date(inputDate);
  d.setMonth(11);
  d.setDate(31);
  d.setHours(23, 59, 59, 999);
  return d;
}
export {
  yearEnd
};
//# sourceMappingURL=yearEnd.mjs.map