import { DateInput } from "./types"
import { diffMilliseconds } from "./diffMilliseconds"
import { diffRound, type DiffRoundingMethod } from "./diffRound"

/**
 * Returns the difference between 2 dates in minutes.
 * @param dateA A date to compare with the right date
 * @param roundingMethod the rounding method to use, default: trunc
 */
export function diffMinutes(
  dateA: DateInput,
  dateB: DateInput,
  roundingMethod?: DiffRoundingMethod
) {
  return diffRound(diffMilliseconds(dateA, dateB) / 60_000, roundingMethod)
}
