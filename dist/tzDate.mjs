// src/tzDate.ts
import { offset } from "./offset.mjs";
import { applyOffset } from "./applyOffset.mjs";
import { date } from "./date.mjs";
function tzDate(inputDate, tz) {
  const d = date(inputDate);
  return applyOffset(d, offset(d, tz));
}
export {
  tzDate
};
//# sourceMappingURL=tzDate.mjs.map