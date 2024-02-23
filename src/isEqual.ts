import { date } from "./date"
import type { DateInput } from "./types"

/**
 * Are the given dates equal?
 *
 * @param dateLeft - The first date to compare
 * @param dateRight - The second date to compare
 *
 * @returns The dates are equal.
 */
export function isEqual(dateLeft: DateInput, dateRight: DateInput) {
  const _dateLeft = date(dateLeft)
  const _dateRight = date(dateRight)

  return +_dateLeft === +_dateRight
}
