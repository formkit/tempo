import { date } from "./date"
import type { MaybeDateInput } from "./types"

/**
 * Returns a Date object for end of the given minute.
 * @param [inputDate] - A string, Date object or nothing for current time
 */
export function minuteEnd(inputDate?: MaybeDateInput): Date {
  const d = date(inputDate)
  d.setSeconds(59, 999)
  return d
}
