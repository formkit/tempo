// src/dayEnd.ts
import { date } from "./date.mjs";
function dayEnd(inputDate) {
  const d = date(inputDate);
  d.setHours(23, 59, 59, 999);
  return d;
}
export {
  dayEnd
};
//# sourceMappingURL=dayEnd.mjs.map