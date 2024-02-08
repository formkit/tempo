import { date } from "./date"
import type { DateInput } from "./types"

/**
 * Returns a Date object for end of the given day.
 * @param inputDate - A string or Date object
 */
export function dayEnd(inputDate: DateInput): Date {
  const d = date(inputDate)
  d.setHours(23, 59, 59, 999)
  return d
}
