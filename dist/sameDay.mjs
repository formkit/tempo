// src/sameDay.ts
import { date } from "./date.mjs";
function sameDay(inputDateA, inputDateB) {
  const a = date(inputDateA);
  const b = date(inputDateB);
  return a.getDate() === b.getDate() && a.getMonth() === b.getMonth() && a.getFullYear() === b.getFullYear();
}
export {
  sameDay
};
//# sourceMappingURL=sameDay.mjs.map