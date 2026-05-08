import { handleOverflow } from "./handleDateOverflow"
import type { MaybeDateInput } from "./types"

/**
 * set the month of a date
 * @param [inputDate] - a date or null for current time
 * @param month - the zero-based month to set (0-11, where 0 is January) (can over/underflow)
 * @param [dateOverflow] - Whether or not to allow the date to overflow to another month if the inputDate’s month is out of range of the new month.
 */
export function setMonth(
  inputDate: MaybeDateInput,
  month: number,
  dateOverflow = false
): Date {
  return handleOverflow(inputDate, (d) => d.setMonth(month), dateOverflow)
}
