// src/isEqual.ts
import { date } from "./date.mjs";
function isEqual(dateLeft, dateRight) {
  const _dateLeft = date(dateLeft);
  const _dateRight = date(dateRight);
  return +_dateLeft === +_dateRight;
}
export {
  isEqual
};
//# sourceMappingURL=isEqual.mjs.map