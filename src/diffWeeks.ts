import { diffMilliseconds } from "./diffMilliseconds"
import { DateInput, MaybeDateInput } from "./types"
import { diffRound, type DiffRoundingMethod } from "./diffRound"

/**
 * Returns the difference between 2 dates in days.
 * @param dateA - A date to compare with the right date
 * @param [dateB] - A date to compare with the left date or nothing to compare with the current time
 * @param [roundingMethod] - the rounding method to use, default: trunc
 */
export function diffWeeks(
  dateA: DateInput,
  dateB: DateInput,
  roundingMethod?: DiffRoundingMethod
): number

/**
 * Returns the difference between 2 dates in days.
 * @param [dateA] - A date to compare with the right date or null to compare with the current time
 * @param dateB - A date to compare with the left date
 * @param [roundingMethod] - the rounding method to use, default: trunc
 */
export function diffWeeks(
  dateA: DateInput,
  dateB: DateInput,
  roundingMethod?: DiffRoundingMethod
): number

export function diffWeeks(
  dateA: MaybeDateInput,
  dateB: DateInput,
  roundingMethod?: DiffRoundingMethod
): number {
  return diffRound(
    diffMilliseconds(dateA, dateB) / 604800000, // day * 7
    roundingMethod
  )
}
