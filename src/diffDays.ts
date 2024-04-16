import { diffMilliseconds } from "./diffMilliseconds"
import { DateInput } from "./types"
import { diffRound, type DifferenceRoundingMethod } from "./diffRound"

/**
 * Returns the difference between 2 dates in days.
 * @param leftDate A date to compare with the right date
 * @param rightDate A date to compare with the left date
 * @param roundingMethod the rounding method to use, default: trunc
 */
export function diffDays(
  leftDate: DateInput,
  rightDate: DateInput,
  roundingMethod?: DifferenceRoundingMethod
) {
  return diffRound(
    diffMilliseconds(leftDate, rightDate) / 86_400_000, // hour * 24
    roundingMethod
  )
}
