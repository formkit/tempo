import { date } from "./date"
import { DateInput } from "./types"
import { monthDays } from "./monthDays"

/**
 * Returns the difference between 2 dates in months.
 * @param dateA A date to compare with the dateB date
 * @param dateB A date to compare with the dateA date
 */
export function diffMonths(dateA: DateInput, dateB: DateInput): number {
  const l = date(dateA)
  const r = date(dateB)
  // if the dateB one is bigger, we switch them around as it's easier to do
  if (l < r) {
    const rs = diffMonths(r, l)
    return rs == 0 ? 0 : -rs
  }

  // we first get the amount of calendar months
  let months =
    (l.getFullYear() - r.getFullYear()) * 12 + (l.getMonth() - r.getMonth())

  const ld = l.getDate()
  const rd = r.getDate()

  // if no full month has passed we may subtract a month from the calendar months so we get the amount of full months
  if (ld < rd) {
    // in case dateA date is the last day of the month & the dateB date is higher, we don't subtract as a full month did actually pass
    const lm = monthDays(l)
    if (!(lm == ld && lm < rd)) {
      months--
    }
  }
  //ensures we don't give back -0
  return months == 0 ? 0 : months
}
