import { date } from "./date"
import type { DateInput } from "./types"

/**
 * Returns a Date object for start of the given hour.
 * @param inputDate - A string or Date object
 */
export function hourStart(inputDate: DateInput): Date {
  const d = date(inputDate)
  d.setMinutes(0, 0)
  return d
}
