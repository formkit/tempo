import { date } from "./date"

/**
 * Returns a Date object for start of the given day.
 * @param inputDate - A string or Date object
 */
export function dayStart(inputDate: DateInput): Date {
  const d = date(inputDate)
  d.setHours(0, 0, 0)
  return d
}
