// src/dayStart.ts
import { date } from "./date.mjs";
function dayStart(inputDate) {
  const d = date(inputDate);
  d.setHours(0, 0, 0);
  return d;
}
export {
  dayStart
};
//# sourceMappingURL=dayStart.mjs.map