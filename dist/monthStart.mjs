// src/monthStart.ts
import { date } from "./date.mjs";
function monthStart(inputDate) {
  const d = date(inputDate);
  d.setDate(1);
  d.setHours(0, 0, 0);
  return d;
}
export {
  monthStart
};
//# sourceMappingURL=monthStart.mjs.map