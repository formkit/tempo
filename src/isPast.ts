import { isBefore } from "./isBefore"
import { DateInput } from "./types"

/**
 * is the date in the past compared to the current time
 * @param inputDate - The date that should be in the past
 * @returns the given date is in the past compared to the current time
 */
export function isPast(inputDate: DateInput): boolean {
  return isBefore(inputDate)
}
