import { DateInput } from "./types"
import { differenceInMilliseconds } from "./differenceInMilliseconds"
import {
  differenceRound,
  type DifferenceRoundingMethod,
} from "./differenceRound"

/**
 * Returns the difference between 2 dates in minutes.
 * @param leftDate A date to compare with the right date
 * @param roundingMethod the rounding method to use, default: trunc
 */
export function differenceInMinutes(
  leftDate: DateInput,
  rightDate: DateInput,
  roundingMethod?: DifferenceRoundingMethod
) {
  return differenceRound(
    differenceInMilliseconds(leftDate, rightDate) / 60_000,
    roundingMethod
  )
}
