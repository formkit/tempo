import { date } from "./date"
import { MaybeDateInput } from "./types"

/**
 * set the millisecond of a date object
 * @param [inputDate] - a date or null for current time
 * @param second - the milliseconds you want the date set to (0 - 999) (can over/underflow)
 */
export function setMilliseconds(inputDate: MaybeDateInput, ms: number) {
  const d = date(inputDate)
  d.setMilliseconds(ms)
  return d
}
