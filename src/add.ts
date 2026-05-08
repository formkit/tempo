import { addDay } from "./addDay"
import { addHour } from "./addHour"
import { addMillisecond } from "./addMillisecond"
import { addMinute } from "./addMinute"
import { addMonth } from "./addMonth"
import { addSecond } from "./addSecond"
import { addYear } from "./addYear"
import { date } from "./date"
import type { Duration, MaybeDateInput } from "./types"

/**
 * Returns a new Date object with the duration applied.
 * @param [inputDate] - A date to increment or null to increment from the current time.
 * @param duration - An object with values for the amount of time to add to the original date.
 * @param [dateOverflow] - Whether to allow month/year changes to overflow into a later month.
 */
export function add(
  inputDate: MaybeDateInput,
  duration: Duration,
  dateOverflow = false
) {
  let d = date(inputDate)
  const applyFixedUnits = () => {
    if (duration.weeks) {
      d = addDay(d, duration.weeks * 7)
    }
    if (duration.days) {
      d = addDay(d, duration.days)
    }
    if (duration.hours) {
      d = addHour(d, duration.hours)
    }
    if (duration.minutes) {
      d = addMinute(d, duration.minutes)
    }
    if (duration.seconds) {
      d = addSecond(d, duration.seconds)
    }
    if (duration.milliseconds) {
      d = addMillisecond(d, duration.milliseconds)
    }
  }
  const applyCalendarUnits = () => {
    if (duration.months) {
      d = addMonth(d, duration.months, dateOverflow)
    }
    if (duration.years) {
      d = addYear(d, duration.years, dateOverflow)
    }
  }
  const calendarFirst = (duration.months ?? 0) < 0 || (duration.years ?? 0) < 0

  if (calendarFirst) applyCalendarUnits()
  applyFixedUnits()
  if (!calendarFirst) applyCalendarUnits()

  return d
}
