import { date } from "./date"
import type { DateInput } from "./types"

/**
 * Returns a Date object for the with the input date set to the start of the current year.
 * @param inputDate - A string or Date object
 */
export function yearStart(inputDate: DateInput): Date {
  const d = date(inputDate)

  d.setMonth(0)
  d.setDate(1)
  d.setHours(0, 0, 0)

  return d
}
