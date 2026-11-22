import { date } from "./date"
import type { MaybeDateInput } from "./types"

/**
 * Returns a Date object for end of the given hour.
 * @param [inputDate] - A string, Date object or nothing for the current time
 */
export function hourEnd(inputDate?: MaybeDateInput): Date {
  const d = date(inputDate)
  // Shift the timestamp instead of using local setters, which pick the first
  // occurrence of a repeated hour (DST fall-back).
  const shifted = new Date(
    d.getTime() +
      ((59 - d.getMinutes()) * 60 + (59 - d.getSeconds())) * 1000 +
      (999 - d.getMilliseconds())
  )
  // A sub-hour offset change (e.g. 30 min in Lord_Howe) breaks the shift.
  if (shifted.getMinutes() === 59 && shifted.getHours() === d.getHours())
    return shifted
  d.setMinutes(59, 59, 999)
  return d
}
