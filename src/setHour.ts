import { date } from "./date"
import { MaybeDateInput } from "./types"

/**
 * set the hour of a date object
 * @param [inputDate] - a date or null for current time
 * @param hour - the hour you want the date set to (0 - 23) (can over/underflow)
 */
export function setHour(inputDate: MaybeDateInput, hour: number) {
  const d = date(inputDate)
  d.setHours(hour)
  return d
}
