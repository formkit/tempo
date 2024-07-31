import { date } from "./date"
import type { MaybeDateInput } from "./types"

/**
 * Get the number of days in the given date’s year.
 * @param [inputDate] -  A string, Date object or nothing for the current year
 */
export function yearDays(inputDate?: MaybeDateInput): number {
  const d = date(inputDate)
  return (
    (new Date(d.getFullYear() + 1, 0, 0).getTime() -
      new Date(d.getFullYear(), 0, 0).getTime()) /
    86400000
  )
}
