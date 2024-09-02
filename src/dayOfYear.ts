import { date } from "./date"
import type { MaybeDateInput } from "./types"
import { ONE_DAY_MS } from "./constants"

/**
 * Gets the what day of the year a given date is. For example, August 1st is
 * the 213th day of the year on non- years and 214th on leap years.
 * @param [inputDate] - The input date or nothing for the current day.
 */
export function dayOfYear(inputDate?: MaybeDateInput): number {
  const d = date(inputDate)
  return Math.round(
    (new Date(d.getFullYear(), d.getMonth(), d.getDate(), 0, 0).getTime() -
      new Date(d.getFullYear(), 0, 0).getTime()) /
      ONE_DAY_MS
  )
}
