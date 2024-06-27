import { date } from "./date"
import type { DateInput, MaybeDateInput } from "./types"

/**
 * @name isAfter
 * @category Common Helpers
 * @summary Is the first date after the second one or `now`?
 *
 * @description
 * Is the first date after the second one or `now`?
 *
 * @param inputDate - The date that should be after the other one to return true
 * @param dateToCompare - The date to compare with or `now` if nothing given
 *
 * @returns The first date is after the second date or `now`.
 */
export function isAfter(inputDate: DateInput, dateToCompare?: MaybeDateInput) {
  const _date = date(inputDate)
  const _dateToCompare = date(dateToCompare)

  return +_date > +_dateToCompare
}
