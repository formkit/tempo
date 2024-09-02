import { date } from "./date"
import { monthDays } from "./monthDays"
import { yearDays } from "./yearDays"
import { dayOfYear } from "./dayOfYear"
import { addDay } from "./addDay"
import type { MaybeDateInput } from "./types"

/**
 * Performs a bidirectional search for the nearest date that passes a function.
 * @param [inputDate] - Performs a search for the nearest passing date.
 * @param search - The search function to use, given a date returns a boolean.
 * @param constraint - The number of iterations to perform before giving up, or logical constraint like "month", or "week".
 *
 */
export function nearestDay(
  inputDate: MaybeDateInput,
  search: (date: Date) => boolean,
  constraint: number | "month" | "week" | "year" = 7
): Date | null {
  const d = date(inputDate)
  const [increments, decrements] = (() => {
    switch (constraint) {
      case "month":
        return [monthDays(d) - d.getDate(), d.getDate()]
      case "week":
        return [6 - d.getDay(), d.getDay() + 1]
      case "year":
        const total = yearDays(d)
        const day = dayOfYear(d)
        return [total - day, day]
      default:
        return [constraint, constraint]
    }
  })()

  return (
    Array.from({ length: Math.max(increments, decrements) + 1 }, (_, i) => i)
      .flatMap((i) => [
        i <= increments ? addDay(d, i) : null,
        i && i <= decrements ? addDay(d, -i) : null,
      ])
      .find((date) => date && search(date)) || null
  )
}
