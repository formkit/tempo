import { diffMonths } from "./diffMonths"
import type { DateInput, MaybeDateInput } from "./types"

/**
 * Returns the difference between 2 dates in years.
 * @param dateA - A date to compare with the dateB date
 * @param [dateB] - A date to compare with the dateA date or nothing to compare with the current time
 */
export function diffYears(dateA: DateInput, dateB?: MaybeDateInput): number

/**
 * Returns the difference between 2 dates in years.
 * @param [dateA] - A date to compare with the dateB date or null to compare with the current time
 * @param dateB - A date to compare with the dateA date
 */
export function diffYears(dateA: MaybeDateInput, dateB: DateInput): number
export function diffYears(dateA: MaybeDateInput, dateB?: MaybeDateInput): number {
  const r = Math.trunc(diffMonths(dateA, dateB) / 12)
  // Ensures we don't give back -0
  return r == 0 ? 0 : r
}
