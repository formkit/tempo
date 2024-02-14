import { date } from "./date"
import type { DateInput } from "./types"

/**
 * Returns a Date object for start of the given minute.
 * @param inputDate - A string or Date object
 */
export function minuteStart(inputDate: DateInput): Date {
  const d = date(inputDate)
  d.setSeconds(0)
  return d
}
