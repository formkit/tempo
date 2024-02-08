import { date } from "./date"
import type { DateInput } from "./types"

/**
 * Get the number of days in the given date’s year.
 * @param inputDate - A string or Date object
 */
export function yearDays(inputDate: DateInput): number {
  const d = date(inputDate)
  return (
    (new Date(d.getFullYear() + 1, 0, 0).getTime() -
      new Date(d.getFullYear(), 0, 0).getTime()) /
    86400000
  )
}
