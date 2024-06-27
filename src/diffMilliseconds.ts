import { date } from "./date"
import { DateInput, MaybeDateInput } from "./types"

/**
 * Returns the difference between 2 dates in milliseconds.
 * @param dateA A date to compare with the right date
 * @param dateB A date to compare with the left date
 */
export function diffMilliseconds(dateA: DateInput, dateB: DateInput): number
/**
 * Returns the difference between the given date and `now`.
 * @param dateA A date to compare with the `now`
 * @param now give nothing to compare with `now`
 */
export function diffMilliseconds(dateA: DateInput, now?: null): number
/**
 * Returns the difference between the given date and `now`.
 * @param now give nothing to compare with `now`
 * @param dateB A date to compare with the `now`
 */
export function diffMilliseconds(now: null | undefined, dateB: DateInput): number

export function diffMilliseconds(dateA?: MaybeDateInput, dateB?: MaybeDateInput): number {
  const left = date(dateA)
  const right = date(dateB)
  return +left - +right
}
