import { date } from "./date"
import { differenceInMonths } from "./differenceInMonths"
import { DateInput } from "./types"

/**
 * Returns the difference between 2 dates in years.
 * @param left A date to compare with the right date
 * @param right A date to compare with the left date
 */
export function differenceInYears(left: DateInput, right: DateInput): number {
  const r = Math.trunc(differenceInMonths(left, right) / 12)
  //ensures we don't give back -0
  return r == 0 ? 0 : r
}
