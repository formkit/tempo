import { date } from "./date"
import { MaybeDateInput } from "./types"
import { handleOverflow } from "./handleDateOverflow"

/**
 * set the year of a date object
 * @param inputDate - a date or null for current time
 * @param year - the full year you want the date to be set to
 * @param [dateOverflow] - Whether or not to allow the date to overflow to another month if the inputDate’s month is out of range of the new month.
 */
export function setYear(
  inputDate: MaybeDateInput,
  year: number,
  dateOverflow = false
): Date {
  return handleOverflow(inputDate, (d) => d.setFullYear(year), dateOverflow)
}
