import { date } from "./date"
import type { MaybeDateInput } from "./types"

/**
 * Returns a Date object for start of the given day.
 * @param [inputDate] - A string, Date object or nothing for the current day
 */
export function dayStart(inputDate?: MaybeDateInput): Date {
  const d = date(inputDate)
  d.setHours(0, 0, 0)
  return d
}
