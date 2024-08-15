import { diffMilliseconds } from "./diffMilliseconds"
import { DiffRoundingMethod, diffRound } from "./diffRound"
import { DateInput } from "./types"

/**
 * Returns the difference between 2 dates in seconds.
 * @param dateA A date to compare with the right date
 * @param dateB A date to compare with the left date
 * @param roundingMethod the rounding method to use, default: trunc
 */
export function diffSeconds(
  dateA: DateInput,
  dateB: DateInput,
  roundingMethod?: DiffRoundingMethod
) {
  return diffRound(diffMilliseconds(dateA, dateB) / 1000, roundingMethod)
}
