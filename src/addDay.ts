import { date } from "./date"
import type { DateInput } from "./types"

/**
 * Returns a new date object 1/n days after the original one.
 * @param inputDate - A date to increment by 1 day.
 */
export function addDay(inputDate: DateInput, count = 1) {
  const d = date(inputDate)
  d.setDate(d.getDate() + count)
  return d
}
