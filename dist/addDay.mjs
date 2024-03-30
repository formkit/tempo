// src/addDay.ts
import { date } from "./date.mjs";
function addDay(inputDate, count = 1) {
  const d = date(inputDate);
  d.setDate(d.getDate() + count);
  return d;
}
export {
  addDay
};
//# sourceMappingURL=addDay.mjs.map