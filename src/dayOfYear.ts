import { date } from "./date"
import type { MaybeDateInput } from "./types"

/**
 * Gets the what day of the year a given date is. For example, August 1st is
 * the 213th day of the year on non- years and 214th on leap years.
 * @param [inputDate] - The input date or nothing for the current day.
 */
export function dayOfYear(inputDate?: MaybeDateInput): number {
  const d = date(inputDate)
  // Count calendar days independently of local offset changes or skipped dates.
  return (
    (Date.UTC(d.getFullYear(), d.getMonth(), d.getDate()) -
      Date.UTC(d.getFullYear(), 0, 0)) /
      86400000
  )
}
