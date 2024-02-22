import { date } from "./date"
import type { DateInput } from "./types"

/**
 * @name isBefore
 * @category Common Helpers
 * @summary Is the first date before the second one?
 *
 * @description
 * Is the first date before the second one?
 *
 * @param inputDate - The date that should be before the other one to return true
 * @param dateToCompare - The date to compare with
 *
 * @returns The first date is before the second date.
 */
export function isBefore(inputDate: DateInput, dateToCompare: DateInput) {
  const _date = date(inputDate)
  const _dateToCompare = date(dateToCompare)

  return +_date < +_dateToCompare
}
