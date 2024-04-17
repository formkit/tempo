import { DateInput } from "./types"
import { diffMilliseconds } from "./diffMilliseconds"
import { diffRound, type DiffRoundingMethod } from "./diffRound"

/**
 * Returns the difference between 2 dates in minutes.
 * @param leftDate A date to compare with the right date
 * @param roundingMethod the rounding method to use, default: trunc
 */
export function diffMinutes(
  leftDate: DateInput,
  rightDate: DateInput,
  roundingMethod?: DiffRoundingMethod
) {
  return diffRound(
    diffMilliseconds(leftDate, rightDate) / 60_000,
    roundingMethod
  )
}
