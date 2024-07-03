import { date } from "./date"
import type { DateInput, MaybeDateInput } from "./types"

/**
 * Returns the difference between 2 dates in milliseconds.
 * @param dateA - A date to compare with the right date
 * @param [dateB] - A date to compare with the left date or nothing to compare with the current time
 */
export function diffMilliseconds(dateA: DateInput, dateB?: MaybeDateInput): number

/**
 * Returns the difference between 2 dates in milliseconds.
 * @param [dateA] - A date to compare with the right date or null to compare with the current time
 * @param dateB - A date to compare with the left date
 */
export function diffMilliseconds(dateA: MaybeDateInput, dateB: DateInput): number

export function diffMilliseconds(dateA: MaybeDateInput, dateB?: MaybeDateInput): number {
  const left = date(dateA)
  const right = date(dateB)
  return +left - +right
}
