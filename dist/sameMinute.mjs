// src/sameMinute.ts
import { date } from "./date.mjs";
function sameMinute(inputDateA, inputDateB) {
  const a = date(inputDateA);
  const b = date(inputDateB);
  return a.getMinutes() === b.getMinutes();
}
export {
  sameMinute
};
//# sourceMappingURL=sameMinute.mjs.map