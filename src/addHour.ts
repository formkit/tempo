import { date } from "./date"

/**
 * Returns a new date object 1/n hours after the original one.
 * @param inputDate - A date to increment by 1 day.
 */
export function addHour(inputDate: DateInput, count = 1) {
  const d = date(inputDate)
  d.setHours(d.getHours() + count)
  return d
}
