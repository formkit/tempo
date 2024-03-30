// src/sameSecond.ts
import { date } from "./date.mjs";
function sameSecond(inputDateA, inputDateB) {
  const a = date(inputDateA);
  const b = date(inputDateB);
  return a.getSeconds() === b.getSeconds();
}
export {
  sameSecond
};
//# sourceMappingURL=sameSecond.mjs.map