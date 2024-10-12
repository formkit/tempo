import { handleOverflow } from "./handleDateOverflow"
import { MaybeDateInput } from "./types"

/**
 * set the month of a date
 * @param [inputDate] - a date or null for current time
 * @param month - the month you want the date set to (months are 1-12/jan-dec) (can over/underflow)
 * @param [dateOverflow] - Whether or not to allow the date to overflow to another month if the inputDate’s month is out of range of the new month.
 */
export function setMonth(inputDate: MaybeDateInput, month: number, dateOverflow = false) {
  return handleOverflow(inputDate, (d) => d.setMonth(month), dateOverflow)
}
