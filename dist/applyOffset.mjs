// src/applyOffset.ts
import { date } from "./date.mjs";
import { offsetToMins } from "./common.mjs";
function applyOffset(dateInput, offset = "+0000") {
  const d = date(dateInput);
  const timeDiffInMins = offsetToMins(offset);
  return new Date(d.getTime() + timeDiffInMins * 1e3 * 60);
}
export {
  applyOffset
};
//# sourceMappingURL=applyOffset.mjs.map