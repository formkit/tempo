// src/yearDays.ts
import { date } from "./date.mjs";
function yearDays(inputDate) {
  const d = date(inputDate);
  return (new Date(d.getFullYear() + 1, 0, 0).getTime() - new Date(d.getFullYear(), 0, 0).getTime()) / 864e5;
}
export {
  yearDays
};
//# sourceMappingURL=yearDays.mjs.map