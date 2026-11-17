import { offset } from "./offset"
import { date } from "./date"
import { iso8601Match } from "./iso8601"
import { offsetToSecs } from "./common"
import { MaybeDateInput } from "./types"

const DAY = 86_400_000

/**
 * The offset of the given timezone at the given UTC time, in milliseconds.
 */
function tzOffset(utcTime: number, tz: string): number {
  return offsetToSecs(offset(new Date(utcTime), "UTC", tz), "Z") * 1000
}

/**
 * The wall-clock time of the input as a UTC timestamp. Zoneless strings are
 * read field by field so a time that the device skips (a DST gap in the
 * device's timezone) is not moved.
 */
function wallClock(inputDate: MaybeDateInput, d: Date): number {
  const match =
    typeof inputDate === "string" ? inputDate.trim().match(iso8601Match) : null
  const wall = new Date(0)
  if (match && !match[7]) {
    wall.setUTCFullYear(+match[1], +match[2] - 1, +(match[3] ?? 1))
    wall.setUTCHours(
      +(match[4] ?? 0),
      +(match[5] ?? 0),
      +(match[6] ?? 0),
      d.getMilliseconds()
    )
  } else {
    wall.setUTCFullYear(d.getFullYear(), d.getMonth(), d.getDate())
    wall.setUTCHours(
      d.getHours(),
      d.getMinutes(),
      d.getSeconds(),
      d.getMilliseconds()
    )
  }
  return wall.getTime()
}

/**
 * Creates a date object for the input date at the given timezone. For example
 * `tzDate("2017-05-06T12:00", "Europe/Amsterdam")` will return a date object
 * for 2017-05-06T10:00:00Z since 12:00 in Amsterdam is 10:00Z.
 *
 * If given a Date object it will use local time and convert it to the given
 * timezone, thus "changing" the date.
 *
 * Around daylight saving time changes it works like a JavaScript Date does
 * for local time: a time that happens twice gives the earlier one, and a time
 * that is skipped is moved forward by the length of the gap.
 *
 * if given no string or date object, it'll use the current locale time and convert to the given timezone
 * @param [inputDate] - An iso8601 date string with no timezone
 * @param tz - A timezone string
 */
export function tzDate(inputDate: MaybeDateInput, tz: string) {
  const d = date(inputDate)
  const wall = wallClock(inputDate, d)
  const before = tzOffset(wall - DAY, tz)
  const after = tzOffset(wall + DAY, tz)
  if (before === after) return new Date(wall - before)
  // A DST change is near: keep the offsets that really give this wall time.
  const valid = [wall - before, wall - after].filter(
    (utc) => utc + tzOffset(utc, tz) === wall
  )
  // Both are valid in a repeated hour (take the earlier one), none in a gap.
  return new Date(valid.length ? Math.min(...valid) : wall - before)
}
