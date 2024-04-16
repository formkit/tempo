import { diffMilliseconds } from "./diffMilliseconds"
import { DifferenceRoundingMethod, diffRound } from "./diffRound"
import { DateInput } from "./types"

/**
 * Returns the difference between 2 dates in seconds.
 * @param leftDate A date to compare with the right date
 * @param rightDate A date to compare with the left date
 * @param roundingMethod the rounding method to use, default: trunc
 */
export function diffSeconds(
  leftDate: DateInput,
  rightDate: DateInput,
  roundingMethod?: DifferenceRoundingMethod
) {
  return diffRound(diffMilliseconds(leftDate, rightDate) / 1000, roundingMethod)
}
