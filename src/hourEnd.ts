import { date } from "./date"
import type { MaybeDateInput } from "./types"

/**
 * Returns a Date object for end of the given hour.
 * @param [inputDate] - A string, Date object or nothing for current time
 */
export function hourEnd(inputDate?: MaybeDateInput): Date {
  const d = date(inputDate)
  d.setMinutes(59, 59, 999)
  return d
}
