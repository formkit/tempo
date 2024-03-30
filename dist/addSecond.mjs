// src/addSecond.ts
import { date } from "./date.mjs";
function addSecond(inputDate, count = 1) {
  const d = date(inputDate);
  d.setSeconds(d.getSeconds() + count);
  return d;
}
export {
  addSecond
};
//# sourceMappingURL=addSecond.mjs.map