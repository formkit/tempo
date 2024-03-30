// src/minuteEnd.ts
import { date } from "./date.mjs";
function minuteEnd(inputDate) {
  const d = date(inputDate);
  d.setSeconds(59, 999);
  return d;
}
export {
  minuteEnd
};
//# sourceMappingURL=minuteEnd.mjs.map