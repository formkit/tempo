import { differenceInMilliseconds } from "./differenceInMilliseconds"
import { DateInput } from "./types"
import {
  differenceRound,
  type DifferenceRoundingMethod,
} from "./differenceRound"

/**
 * Returns the difference between 2 dates in days.
 * @param leftDate A date to compare with the right date
 * @param rightDate A date to compare with the left date
 * @param roundingMethod the rounding method to use, default: trunc
 */
export function differenceInWeeks(
  leftDate: DateInput,
  rightDate: DateInput,
  roundingMethod?: DifferenceRoundingMethod
) {
  return differenceRound(
    differenceInMilliseconds(leftDate, rightDate) / 604800000, // day * 7
    roundingMethod
  )
}
