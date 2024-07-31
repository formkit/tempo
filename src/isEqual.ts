import { date } from "./date"
import type { DateInput, MaybeDateInput } from "./types"

/**
 * Are the given dates equal or given date to the current time?
 *
 * @param dateLeft - The first date to compare
 * @param [dateRight] - The second date to compare or the current time of nothing given
 *
 * @returns The dates are equal or date to the current time
 */
export function isEqual(dateLeft: DateInput, dateRight?: MaybeDateInput): boolean
/**
 * Are the given dates equal or given date to the current time?
 *
 * @param [dateLeft] - The first date to compare or the current time if null given
 * @param dateRight - The second date to compare
 *
 * @returns The dates are equal or date to the current time
 */

export function isEqual(dateLeft: MaybeDateInput, dateRight: DateInput): boolean
export function isEqual(dateLeft: MaybeDateInput, dateRight?: MaybeDateInput): boolean {
  const _dateLeft = date(dateLeft)
  const _dateRight = date(dateRight)

  return +_dateLeft === +_dateRight
}
