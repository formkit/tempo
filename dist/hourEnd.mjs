// src/hourEnd.ts
import { date } from "./date.mjs";
function hourEnd(inputDate) {
  const d = date(inputDate);
  d.setMinutes(59, 59, 999);
  return d;
}
export {
  hourEnd
};
//# sourceMappingURL=hourEnd.mjs.map