import { date } from "./date"
import type { MaybeDateInput } from "./types"

/**
 * set the minute of a date object
 * @param [inputDate] - a date or null for current time
 * @param minute - the minute you want the date set to (0 - 59) (can over/underflow)
 */
export function setMinutes(inputDate: MaybeDateInput, minute: number): Date {
  const d = date(inputDate)
  d.setMinutes(minute)
  return d
}
