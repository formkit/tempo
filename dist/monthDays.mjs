// src/monthDays.ts
import { monthEnd } from "./monthEnd.mjs";
function monthDays(inputDate) {
  const d = monthEnd(inputDate);
  return d.getDate();
}
export {
  monthDays
};
//# sourceMappingURL=monthDays.mjs.map