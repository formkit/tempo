import { date } from "./date"
import type { MaybeDateInput } from "./types"

/**
 * Returns a Date object for end of the given day.
 * @param [inputDate] - A string, Date object or nothing for the current day
 */
export function dayEnd(inputDate?: MaybeDateInput): Date {
  const d = date(inputDate)
  d.setHours(23, 59, 59, 999)
  return d
}
