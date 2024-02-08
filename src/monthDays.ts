import { monthEnd } from "./monthEnd"
import type { DateInput } from "./types"

/**
 * Returns the total number of days from a given month.
 * @param inputDate - A string or Date object
 */
export function monthDays(inputDate: DateInput): number {
  const d = monthEnd(inputDate)
  return d.getDate()
}
