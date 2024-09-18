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
  return handleOverflow(inputDate, dateOverflow, (d) => d.setMonth(d.getMonth() + count))
  // const d = date(inputDate)
  // const dayOfMonth = d.getDate()
  // // If overflowing is disallowed, set the date back to the first of the month
  // if (!dateOverflow) d.setDate(1)
  // d.setMonth(d.getMonth() + count)

  // // If overflowing is disallowed, we need to set the date back to the proper
  // // day or the last day of the month.
  // if (!dateOverflow) {
  //   const daysInMonth = monthDays(d)
  //   d.setDate(daysInMonth < dayOfMonth ? daysInMonth : dayOfMonth)
  // }
  // return d
}
