import { date } from "./date"
import { monthDays } from "./monthDays"
import { MaybeDateInput } from "./types"

/**
 * set the day of the month in a date object
 * @param [inputDate] - a date or null for current time
 * @param day - the day of the month you want the date set to (1-28/29/30/31) (can over/underflow)
 * @param [dateOverflow] - Whether or not to allow the date to overflow to another month if the given day isn't in the current month
 */
export function setDayOfMonth(
  inputDate: MaybeDateInput,
  day: number,
  dateOverflow = false
) {
  const d = date(inputDate)
  const daysInMonth = monthDays(d)
  if (!dateOverflow) {
    day = day > daysInMonth ? daysInMonth : day
  }
  d.setDate(day)
  return d
}
