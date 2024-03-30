// src/sameHour.ts
import { date } from "./date.mjs";
function sameHour(inputDateA, inputDateB) {
  const a = date(inputDateA);
  const b = date(inputDateB);
  return a.getHours() === b.getHours();
}
export {
  sameHour
};
//# sourceMappingURL=sameHour.mjs.map