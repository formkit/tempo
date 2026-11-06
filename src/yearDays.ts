import { date } from "./date"
import type { MaybeDateInput } from "./types"

/**
 * Get the number of days in the given date’s year.
 * @param [inputDate] -  A string, Date object or nothing for the current year
 */
export function yearDays(inputDate?: MaybeDateInput): number {
  const d = date(inputDate)
  // Use UTC boundaries: local midnights can be shifted by DST/offset changes,
  // which would make the difference a non-integer number of days.
  return (
    (Date.UTC(d.getFullYear() + 1, 0, 0) - Date.UTC(d.getFullYear(), 0, 0)) / 86400000
  )
}
