import { date } from "./date"
import { MaybeDateInput } from "./types"

/**
 * set the second of a date object
 * @param [inputDate] - a date or null for current time
 * @param second - the second you want the date set to (0 - 59) (can over/underflow)
 */
export function setSeconds(inputDate: MaybeDateInput, second: number) {
  const d = date(inputDate)
  d.setSeconds(second)
  return d
}
