import { date } from "./date"
import type { DateInput } from "./types"

/**
 * Returns a Date object for end of the given minute.
 * @param inputDate - A string or Date object
 */
export function minuteEnd(inputDate: DateInput): Date {
  const d = date(inputDate)
  d.setSeconds(59, 999)
  return d
}
