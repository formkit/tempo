import { date } from "./date"
import type { DateInput } from "./types"

/**
 * Returns a Date object for end of the given hour.
 * @param inputDate - A string or Date object
 */
export function hourEnd(inputDate: DateInput): Date {
  const d = date(inputDate)
  d.setMinutes(59, 59, 999)
  return d
}
