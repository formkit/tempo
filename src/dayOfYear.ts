import { date } from "./date"
import type { DateInput } from "./types"

/**
 * Gets the what day of the year a given date is. For example, August 1st is
 * the 213th day of the year on non-leapyears and 214th on leapyears.
 * @param inputDate - The input date.
 */
export function dayOfYear(inputDate: DateInput): number {
  const d = date(inputDate)
  return Math.round(
    (new Date(d.getFullYear(), d.getMonth(), d.getDate(), 0, 0).getTime() -
      new Date(d.getFullYear(), 0, 0).getTime()) /
      86400000
  )
}
