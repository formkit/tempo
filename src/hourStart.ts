import { date } from "./date"
import type { MaybeDateInput } from "./types"

/**
 * Returns a Date object for start of the given hour.
 * @param [inputDate] - A string, Date object or nothing for the current time
 */
export function hourStart(inputDate?: MaybeDateInput): Date {
  const d = date(inputDate)
  d.setMinutes(0, 0, 0)
  return d
}
