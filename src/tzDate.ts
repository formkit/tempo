import { offset } from "./offset"
import { applyOffset } from "./applyOffset"
import { date } from "./date"
import { DateInput, MaybeDateInput } from "./types"

/**
 * Creates a date object for the input date at the given timezone. For example
 * `tzDate("2017-05-06T12:00", "Europe/Amsterdam")` will return a date object
 * for 2017-05-06T10:00:00Z since 12:00 in Amsterdam is 10:00Z.
 *
 * If given a Date object it will use local time and convert it to the given
 * timezone, thus "changing" the date.
 *
 * if given no string or date object, it'll use the current locale time and convert to the given timezone
 * @param [inputDate] - An iso8601 date string with no timezone
 * @param tz - A timezone string
 */
export function tzDate(inputDate: MaybeDateInput, tz: string) {
  const d = date(inputDate)
  return applyOffset(d, offset(d, tz))
}
