// src/addHour.ts
import { date } from "./date.mjs";
function addHour(inputDate, count = 1) {
  const d = date(inputDate);
  d.setHours(d.getHours() + count);
  return d;
}
export {
  addHour
};
//# sourceMappingURL=addHour.mjs.map