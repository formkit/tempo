import { date } from "./date"
import type { MaybeDateInput } from "./types"

/**
 * Returns a new date object 1/n milliseconds after the original one.
 * @param [inputDate] - A date to increment or null to increment from the current time.
 * @param [count] - The quantity to add.
 */
export function addMillisecond(inputDate?: MaybeDateInput, count = 1) {
  const d = date(inputDate)
  d.setMilliseconds(d.getMilliseconds() + count)
  return d
}
