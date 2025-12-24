import { handleOverflow } from "./handleDateOverflow"
import type { MaybeDateInput } from "./types"

/**
 * Returns a new date object 1/n months after the original one. Keep in mind if you
 * start with a date late in a given month you could get a date after the next
 * month.
 * @param [inputDate] - A date to increment or null to increment from the current time
 * @param [count] - The quantity to add.
 * @param [dateOverflow] - Whether or not to allow the date to overflow to another month if the inputDate’s month is out of range of the new month.
 */
export function addMonth(inputDate?: MaybeDateInput, count = 1, dateOverflow = false) {
  return handleOverflow(inputDate, (d) => d.setMonth(d.getMonth() + count), dateOverflow)
}
