import { date } from "./date"
import type { MaybeDateInput } from "./types"

/**
 * Returns a new date object 1/n seconds after the original one.
 * @param [inputDate] - A date to increment or null to increment from the current time.
 * @param [count] - The quantity to add.
 */
export function addSecond(inputDate: MaybeDateInput, count = 1) {
  const d = date(inputDate)
  d.setSeconds(d.getSeconds() + count)
  return d
}
