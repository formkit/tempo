import { date } from "./date"
import type { MaybeDateInput } from "./types"

/**
 * Returns a Date object for the with the input date set to the last day of
 * the current month. Does not change the time.
 * @param [inputDate] - A string, Date object or nothing for the current month
 */
export function monthEnd(inputDate?: MaybeDateInput): Date {
  const d = date(inputDate)
  d.setDate(1)
  d.setMonth(d.getMonth() + 1)
  d.setDate(0)
  return d
}
