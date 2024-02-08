import { date } from "./date"
import type { DateInput } from "./types"

/**
 * Returns a Date object for the first day of a month.
 * @param inputDate - A string or Date object
 */
export function monthStart(inputDate: DateInput): Date {
  const d = date(inputDate)
  d.setDate(1)
  d.setHours(0, 0, 0)
  return d
}
