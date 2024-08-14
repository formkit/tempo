import { addDay } from "./addDay"
import { addHour } from "./addHour"
import { addMinute } from "./addMinute"
import { addMonth } from "./addMonth"
import { addSecond } from "./addSecond"
import { addYear } from "./addYear"
import { date } from "./date"
import type { DurationObj, MaybeDateInput } from "./types"

/**
 * returns a new date object with the added amount of time after the original date.
 * @param [inputDate] - A date to increment or null to increment from the current time.
 * @param add - An object with values for the amount of time to add to the original date.
 * @param [dateOverflow] - Whether or not to allow the date to overflow to another month if the inputDate’s month is out of range of the new month
 */
export function add(
  inputDate: MaybeDateInput,
  add: Omit<DurationObj, "microseconds" | "nanoseconds">,
  dateOverflow = false
) {
  let d = date(inputDate)
  if (add.weeks) {
    d = addDay(d, add.weeks * 7)
  }
  if (add.days) {
    d = addDay(d, add.days)
  }
  if (add.hours) {
    d = addHour(d, add.hours)
  }
  if (add.minutes) {
    d = addMinute(d, add.minutes)
  }
  if (add.seconds) {
    d = addSecond(d, add.seconds)
  }

  if (add.milliseconds) {
    d.setMilliseconds(d.getMilliseconds() + add.milliseconds)
  }

  // doing years & months due to the dateOverflow option, it might be that the other units already resolved the overflow
  if (add.months) {
    d = addMonth(d, add.months, dateOverflow)
  }
  if (add.years) {
    d = addYear(d, add.years, dateOverflow)
  }

  return d
}
