import { date } from "./date"
import type { DateInput, MaybeDateInput } from "./types"

/**
 * Is the first date before the second one or the current time?
 *
 * @param inputDate - The date that should be before the other one to return true
 * @param [dateToCompare] - The date to compare with or the current time if nothing given
 *
 * @returns The first date is before the second date or the current time.
 */
export function isBefore(inputDate: DateInput, dateToCompare?: MaybeDateInput): boolean {
  const _date = date(inputDate)
  const _dateToCompare = date(dateToCompare)

  return +_date < +_dateToCompare
}
