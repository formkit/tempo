import { date } from "./date"
import type { MaybeDateInput } from "./types"

/**
 * Returns a Date object for the first day of a month.
 * @param [inputDate] - A string, Date object or nothing for the current time
 */
export function monthStart(inputDate?: MaybeDateInput): Date {
  const d = date(inputDate)
  d.setDate(1)
  d.setHours(0, 0, 0)
  return d
}
