// src/hourStart.ts
import { date } from "./date.mjs";
function hourStart(inputDate) {
  const d = date(inputDate);
  d.setMinutes(0, 0);
  return d;
}
export {
  hourStart
};
//# sourceMappingURL=hourStart.mjs.map