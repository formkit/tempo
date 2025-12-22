import { date } from "./date"
import type { MaybeDateInput } from "./types"

/**
 * Returns a Date object for start of the given minute.
 * @param [inputDate] - A string, Date object or nothing for the current time
 */
export function minuteStart(inputDate?: MaybeDateInput): Date {
  const d = date(inputDate)
  d.setSeconds(0, 0)
  return d
}
