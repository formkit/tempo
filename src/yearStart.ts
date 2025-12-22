import { date } from "./date"
import type { MaybeDateInput } from "./types"

/**
 * Returns a Date object for the with the input date set to the start of the current year.
 * @param [inputDate] - A string, Date object or nothing for the current year
 */
export function yearStart(inputDate?: MaybeDateInput): Date {
  const d = date(inputDate)

  d.setMonth(0, 1)
  d.setHours(0, 0, 0, 0)

  return d
}
