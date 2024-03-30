// src/addMinute.ts
import { date } from "./date.mjs";
function addMinute(inputDate, count = 1) {
  const d = date(inputDate);
  d.setMinutes(d.getMinutes() + count);
  return d;
}
export {
  addMinute
};
//# sourceMappingURL=addMinute.mjs.map