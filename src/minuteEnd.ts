import { date } from "./date"
import type { MaybeDateInput } from "./types"

/**
 * Returns a Date object for end of the given minute.
 * @param [inputDate] - A string, Date object or nothing for the current time
 */
export function minuteEnd(inputDate?: MaybeDateInput): Date {
  const d = date(inputDate)
  // Shift the timestamp instead of using local setters, which pick the first
  // occurrence of a repeated hour (DST fall-back).
  d.setTime(
    d.getTime() + (59 - d.getSeconds()) * 1000 + (999 - d.getMilliseconds())
  )
  return d
}
