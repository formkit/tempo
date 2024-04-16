import { diffMilliseconds } from "./diffMilliseconds"
import { diffRound, type DifferenceRoundingMethod } from "./diffRound"
import { DateInput } from "./types"

/**
 * Returns the difference between 2 dates in hours.
 * @param leftDate A date to compare with the right date
 * @param rightDate A date to compare with the left date
 * @param roundingMethod the rounding method to use, default: trunc
 */
export function diffHours(
  leftDate: DateInput,
  rightDate: DateInput,
  roundingMethod?: DifferenceRoundingMethod
) {
  return diffRound(
    diffMilliseconds(leftDate, rightDate) / 3_600_000, // 1000 * 60 * 60
    roundingMethod
  )
}
