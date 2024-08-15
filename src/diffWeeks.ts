import { diffMilliseconds } from "./diffMilliseconds"
import { DateInput } from "./types"
import { diffRound, type DiffRoundingMethod } from "./diffRound"

/**
 * Returns the difference between 2 dates in days.
 * @param dateA A date to compare with the right date
 * @param dateB A date to compare with the left date
 * @param roundingMethod the rounding method to use, default: trunc
 */
export function diffWeeks(
  dateA: DateInput,
  dateB: DateInput,
  roundingMethod?: DiffRoundingMethod
) {
  return diffRound(
    diffMilliseconds(dateA, dateB) / 604800000, // day * 7
    roundingMethod
  )
}
