import { date } from "./date"
import type { MaybeDateInput } from "./types"

/**
 * Returns a Date object for start of the given week. Defaults to Sunday as the
 * first day of the week:
 * 0 = Sunday ... 6 = Saturday
 * @param [inputDate] - A string, Date object or nothing for current week
 * @param [startOfWeekDay] - Determines which day of the week is the first
 */
export function weekStart(inputDate?: MaybeDateInput, startOfWeekDay = 0): Date {
  const d = date(inputDate)
  let diff = startOfWeekDay - d.getDay()
  if (diff > 0) diff = diff - 7
  d.setDate(d.getDate() + diff)
  d.setHours(0, 0, 0, 0)
  return d
}
