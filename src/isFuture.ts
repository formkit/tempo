import { isAfter } from "./isAfter"
import { DateInput } from "./types"

/**
 * is the date in the future compared to the current time
 * @param inputDate - The date that should be in the future
 * @returns the given date is in the future compared to the current time
 */
export function isFuture(inputDate: DateInput): boolean {
  return isAfter(inputDate)
}
