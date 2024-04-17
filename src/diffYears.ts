import { diffMonths } from "./diffMonths"
import { DateInput } from "./types"

/**
 * Returns the difference between 2 dates in years.
 * @param dateA A date to compare with the dateB date
 * @param dateB A date to compare with the dateA date
 */
export function diffYears(dateA: DateInput, dateB: DateInput): number {
  const r = Math.trunc(diffMonths(dateA, dateB) / 12)
  //ensures we don't give back -0
  return r == 0 ? 0 : r
}
