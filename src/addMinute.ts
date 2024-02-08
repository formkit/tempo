import { date } from "./date"
import type { DateInput } from "./types"

/**
 * Returns a new date object 1/n seconds after the original one.
 * @param inputDate - A date to increment by 1 day.
 */
export function addMinute(inputDate: DateInput, count = 1) {
  const d = date(inputDate)
  d.setMinutes(d.getMinutes() + count)
  return d
}
