import { diffMilliseconds } from "./diffMilliseconds"
import { DiffRoundingMethod, diffRound } from "./diffRound"
import type { DateInput, MaybeDateInput } from "./types"

/**
 * Returns the difference between 2 dates in seconds.
 * @param dateA - A date to compare with the right date
 * @param [dateB] - A date to compare with the left date or nothing to compare with the current time.
 * @param [roundingMethod] - the rounding method to use, default: trunc
 */
export function diffSeconds(
  dateA: DateInput,
  dateB?: MaybeDateInput,
  roundingMethod?: DiffRoundingMethod
): number

/**
 * Returns the difference between 2 dates in seconds.
 * @param [dateA] - A date to compare with the right date or null to compare with the current time
 * @param dateB - A date to compare with the left date
 * @param [roundingMethod] - the rounding method to use, default: trunc
 */
export function diffSeconds(
  dateA: MaybeDateInput,
  dateB: DateInput,
  roundingMethod?: DiffRoundingMethod
): number

export function diffSeconds(
  dateA: MaybeDateInput,
  dateB?: MaybeDateInput,
  roundingMethod?: DiffRoundingMethod
): number {
  return diffRound(
    // @ts-ignore
    diffMilliseconds(dateA, dateB) / 1000,
    roundingMethod
  )
}
