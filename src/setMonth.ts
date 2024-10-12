import { MaybeDateInput } from "./types"
import { date } from "./date"
import { monthDays } from "./monthDays"
import { handleOverflow } from "./handleDateOverflow"

/**
 * set the year of a date object with optional month and day para
 * @param inputDate - a date or null for current time
 * @param month - the month you want the date set to (months are 1-12/jan-dec) (can over/underflow)
 * @param [dateOverflow] - Whether or not to allow the date to overflow to another month if the inputDate’s month is out of range of the new month.
 */
export function setMonth(inputDate: MaybeDateInput, month: number, dateOverflow = false) {
  return handleOverflow(inputDate, (d) => d.setMonth(month), dateOverflow)
}
