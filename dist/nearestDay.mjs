// src/nearestDay.ts
import { date } from "./date.mjs";
import { monthDays } from "./monthDays.mjs";
import { yearDays } from "./yearDays.mjs";
import { dayOfYear } from "./dayOfYear.mjs";
import { addDay } from "./addDay.mjs";
function nearestDay(inputDate, search, constraint = 7) {
  let increments;
  let decrements;
  const d = date(inputDate);
  switch (constraint) {
    case "month":
      decrements = d.getDate();
      increments = monthDays(d) - d.getDate();
      break;
    case "week":
      decrements = d.getDay() + 1;
      increments = 6 - d.getDay();
      break;
    case "year":
      const total = yearDays(d);
      const day = dayOfYear(d);
      decrements = day;
      increments = total - day;
      break;
    default:
      increments = decrements = constraint;
  }
  for (let i = 0; i <= increments || i < decrements; i++) {
    if (i <= increments) {
      const next = addDay(d, i);
      if (search(next))
        return next;
    }
    if (i && i <= decrements) {
      const prev = addDay(d, -i);
      if (search(prev))
        return prev;
    }
  }
  return null;
}
export {
  nearestDay
};
//# sourceMappingURL=nearestDay.mjs.map