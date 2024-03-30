// src/minuteStart.ts
import { date } from "./date.mjs";
function minuteStart(inputDate) {
  const d = date(inputDate);
  d.setSeconds(0);
  return d;
}
export {
  minuteStart
};
//# sourceMappingURL=minuteStart.mjs.map