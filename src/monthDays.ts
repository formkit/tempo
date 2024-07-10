import { monthEnd } from "./monthEnd"
import type { MaybeDateInput } from "./types"

/**
 * Returns the total number of days from a given month.
 * @param [inputDate] - A string, Date object or nothing for current month
 */
export function monthDays(inputDate?: MaybeDateInput): number {
  const d = monthEnd(inputDate)
  return d.getDate()
}
