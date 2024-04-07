import { differenceInMilliseconds } from "./differenceInMilliseconds"
import { DifferenceRoundingMethod, differenceRound } from "./differenceRound"
import { DateInput } from "./types"

/**
 * Returns the difference between 2 dates in seconds.
 * @param leftDate A date to compare with the right date
 * @param rightDate A date to compare with the left date
 * @param roundingMethod the rounding method to use, default: trunc
 */
export function differenceInSeconds(
  leftDate: DateInput,
  rightDate: DateInput,
  roundingMethod?: DifferenceRoundingMethod
) {
  return differenceRound(
    differenceInMilliseconds(leftDate, rightDate) / 1000,
    roundingMethod
  )
}
