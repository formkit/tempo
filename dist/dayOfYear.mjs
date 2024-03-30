// src/dayOfYear.ts
import { date } from "./date.mjs";
function dayOfYear(inputDate) {
  const d = date(inputDate);
  return Math.round(
    (new Date(d.getFullYear(), d.getMonth(), d.getDate(), 0, 0).getTime() - new Date(d.getFullYear(), 0, 0).getTime()) / 864e5
  );
}
export {
  dayOfYear
};
//# sourceMappingURL=dayOfYear.mjs.map