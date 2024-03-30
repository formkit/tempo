// src/monthEnd.ts
import { date } from "./date.mjs";
function monthEnd(inputDate) {
  const d = date(inputDate);
  d.setDate(1);
  d.setMonth(d.getMonth() + 1);
  d.setDate(0);
  return d;
}
export {
  monthEnd
};
//# sourceMappingURL=monthEnd.mjs.map