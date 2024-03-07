import { offset } from "./offset"
import { applyOffset } from "./applyOffset"
import { date } from "./date"
import { DateInput } from "./types"

/**
 * Creates a date object for the input date at the given timezone.
 *
 * For example with input date is `America/New_York` timezone,
 * `tzDate("2017-05-06T12:00", "Europe/Amsterdam")` will return
 * a date object for 2017-05-06T10:00:00Z since 12:00 in `America/New_York`
 * is 18:00Z in `Europe/Amsterdam` (+6 hours).
 *
 * If given a Date object it will use local time and convert it to the given
 * timezone, thus "changing" the date.
 * @param inputDate - An iso8601 date string with no timezone
 * @param tz - A timezone string
 * @example
 * // When the local timezone is 'America/New_York',
 * process.env.TZ = 'America/New_York'
 * tzDate("2017-05-06T12:00", "Europe/Amsterdam") //returns a Date object for '2017-05-06T18:00:00Z'.
 * // This is because 12:00 in 'America/New_York' corresponds to 18:00 in 'Europe/Amsterdam'.
 */
export function tzDate(inputDate: DateInput, tz: string) {
  const d = date(inputDate)
  return applyOffset(d, offset(d, "UTC", tz))
}
