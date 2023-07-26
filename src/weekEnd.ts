import { weekStart } from "./weekStart"

/**
 * Returns a Date object for the last day at the last second of the given week.
 * Defaults to Sunday as the first day of the week:
 * 0 = Sunday ... 6 = Saturday
 * @param inputDate - Gets the last day of the week
 * @param startOfWeekDay - The first day of the week
 */
export function weekEnd(inputDate: DateInput, startOfWeekDay = 0): Date {
  const d = weekStart(inputDate, startOfWeekDay)
  d.setDate(d.getDate() + 6)
  d.setHours(23, 59, 59)
  return d
}
