import { date } from "./date"
import type { MaybeDateInput } from "./types"

/**
 * Returns a Date object for the with the input date set to the end of the current year.
 * @param [inputDate] - A string, Date object or nothing for the current year
 */
export function yearEnd(inputDate?: MaybeDateInput): Date {
  const d = date(inputDate)

  d.setMonth(11, 31)
  d.setHours(23, 59, 59, 999)

  return d
}
