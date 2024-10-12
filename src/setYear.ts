import { date } from "./date"
import { MaybeDateInput } from "./types"
import { handleOverflow } from "./handleDateOverflow"

/**
 * set the year of a date object with optional month and day para
 * @param inputDate - a date or null for current time
 * @param year - the full year you want the date to be set to

 */
export function setYear(
  inputDate: MaybeDateInput,
  year: number,
  dateOverflow = false
): Date {
  return handleOverflow(inputDate, (d) => d.setFullYear(year), dateOverflow)
}
