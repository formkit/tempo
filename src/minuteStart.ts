import { date } from "./date"
import type { MaybeDateInput } from "./types"

/**
 * Returns a Date object for start of the given minute.
 * @param [inputDate] - A string, Date object or nothing for the current time
 */
export function minuteStart(inputDate?: MaybeDateInput): Date {
  const d = date(inputDate)
  // Shift the timestamp instead of using local setters, which pick the first
  // occurrence of a repeated hour (DST fall-back).
  d.setTime(d.getTime() - d.getSeconds() * 1000 - d.getMilliseconds())
  return d
}
