import { date } from "./date"
import { monthDays } from "./monthDays"
import { yearDays } from "./yearDays"
import { dayOfYear } from "./dayOfYear"
import { addDay } from "./addDay"
import type { DateInput } from "./types"

/**
 * Performs a bidirectional search for the nearest date that passes a function.
 * @param target - Performs a search for the nearest passing date.
 * @param search - The search function to use, given a date returns a boolean.
 * @param constraint - The number of iterations to perform before giving up, or logical constraint like "month", or "week".
 *
 */
export function nearestDay(
  inputDate: DateInput,
  search: (date: Date) => boolean,
  constraint: number | "month" | "week" | "year" = 7
): Date | null {
  let increments: number
  let decrements: number
  const d = date(inputDate)
  switch (constraint) {
    case "month":
      decrements = d.getDate()
      increments = monthDays(d) - d.getDate()
      break
    case "week":
      decrements = d.getDay() + 1
      increments = 6 - d.getDay()
      break
    case "year":
      const total = yearDays(d)
      const day = dayOfYear(d)
      decrements = day
      increments = total - day
      break
    default:
      increments = decrements = constraint
  }

  for (let i = 0; i <= increments || i < decrements; i++) {
    if (i <= increments) {
      const next = addDay(d, i)
      if (search(next)) return next
    }
    if (i && i <= decrements) {
      const prev = addDay(d, -i)
      if (search(prev)) return prev
    }
  }
  return null
}
