import { date } from "./date"
import { DateInput } from "./types"

/**
 * Returns the difference between 2 dates in milliseconds.
 * @param dateA A date to compare with the right date
 * @param dateB A date to compare with the left date
 */
export function diffMilliseconds(dateA: DateInput, dateB: DateInput) {
  const left = date(dateA)
  const right = date(dateB)
  return +left - +right
}
