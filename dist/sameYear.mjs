// src/sameYear.ts
import { date } from "./date.mjs";
function sameYear(inputDateA, inputDateB) {
  const a = date(inputDateA);
  const b = date(inputDateB);
  return a.getFullYear() === b.getFullYear();
}
export {
  sameYear
};
//# sourceMappingURL=sameYear.mjs.map