import { date } from "./date"
import type { MaybeDateInput } from "./types"

/**
 * Returns a Date object for start of the given hour.
 * @param [inputDate] - A string, Date object or nothing for the current time
 */
export function hourStart(inputDate?: MaybeDateInput): Date {
  const d = date(inputDate)
  // Shift the timestamp instead of using local setters, which pick the first
  // occurrence of a repeated hour (DST fall-back).
  const shifted = new Date(
    d.getTime() -
      (d.getMinutes() * 60 + d.getSeconds()) * 1000 -
      d.getMilliseconds()
  )
  // A sub-hour offset change (e.g. 30 min in Lord_Howe) breaks the shift.
  if (shifted.getMinutes() === 0 && shifted.getHours() === d.getHours()) return shifted
  d.setMinutes(0, 0, 0)
  return d
}
