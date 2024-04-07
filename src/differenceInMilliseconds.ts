import { date } from "./date"
import { DateInput } from "./types"

/**
 * Returns the difference between 2 dates in milliseconds.
 * @param leftDate A date to compare with the right date
 * @param rightDate A date to compare with the left date
 */
export function differenceInMilliseconds(
  leftDate: DateInput,
  rightDate: DateInput
) {
  const left = date(leftDate)
  const right = date(rightDate)
  return +left - +right
}
