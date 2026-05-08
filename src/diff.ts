import { addDay } from "./addDay"
import { addHour } from "./addHour"
import { addMinute } from "./addMinute"
import { addMonth } from "./addMonth"
import { addSecond } from "./addSecond"
import { addYear } from "./addYear"
import { date } from "./date"
import { diffDays } from "./diffDays"
import { diffHours } from "./diffHours"
import { diffMilliseconds } from "./diffMilliseconds"
import { diffMinutes } from "./diffMinutes"
import { diffMonths } from "./diffMonths"
import { diffSeconds } from "./diffSeconds"
import { diffWeeks } from "./diffWeeks"
import { diffYears } from "./diffYears"
import type { DateInput, DurationObj, MaybeDateInput } from "./types"

type DurationKeys = keyof Omit<DurationObj, "microseconds" | "nanoseconds">

// DiffFnOptions is called with `Fn` to prevent confusion with the other diff* function

/**
 * Options for `diff` function
 */
export interface DiffFnOptions {
  /**
   * whether the difference should be absolute (not negative)
   */
  abs?: boolean
  /**
   * units you want to skip, for example weeks
   */
  skip?: DurationKeys[] | Set<DurationKeys>
}

/**
 * Returns the difference between 2 dates in an object
 * @param dateA - A date to compare with the right date
 * @param [dateB] - A date to compare with the left date or nothing to compare with the current time
 * @param [options] additional options
 * @param [options.skip] units you want skip
 * @param [options.abs] whether the difference should be absolute
 * @returns an object which could be used with `Intl.DurationFormat.format'`
 */
export function diff(
  dateA: DateInput,
  dateB?: MaybeDateInput,
  options?: DiffFnOptions
): DurationObj

/**
 * Returns the difference between 2 dates in an object
 * @param [dateA] - A date to compare with the right date or null to compare with the current time
 * @param dateB - A date to compare with the left date
 * @param [options] additional options
 * @param [options.skip] units you want skip
 * @param [options.abs] whether the difference should be absolute
 * @returns an object which could be used with `Intl.DurationFormat.format'`
 */
export function diff(
  dateA: MaybeDateInput,
  dateB: DateInput,
  options?: DiffFnOptions
): DurationObj

export function diff(
  dateA: MaybeDateInput,
  dateB?: MaybeDateInput,
  options?: DiffFnOptions
): DurationObj {
  let a = date(dateA)
  let b = date(dateB)

  if (options?.abs && a < b) {
    const d = diff(b, a, options)
    return d
  }

  const skip = new Set(options?.skip)
  const duration: DurationObj = {}

  if (!skip.has("years")) {
    const years = diffYears(a, b)
    a = addYear(a, -years)
    if (years) duration.years = years
  }

  if (!skip.has("months")) {
    const months = diffMonths(a, b)
    a = addMonth(a, -months)
    if (months) duration.months = months
  }

  if (!skip.has("weeks")) {
    const weeks = diffWeeks(a, b)
    a = addDay(a, -(weeks * 7))
    if (weeks) duration.weeks = weeks
  }

  if (!skip.has("days")) {
    const days = diffDays(a, b)
    a = addDay(a, -days)
    if (days) duration.days = days
  }

  if (!skip.has("hours")) {
    const hours = diffHours(a, b)
    a = addHour(a, -hours)
    if (hours) duration.hours = hours
  }

  if (!skip.has("minutes")) {
    const minutes = diffMinutes(a, b)
    a = addMinute(a, -minutes)
    if (minutes) duration.minutes = minutes
  }

  if (!skip.has("seconds")) {
    const seconds = diffSeconds(a, b)
    a = addSecond(a, -seconds)
    if (seconds) duration.seconds = seconds
  }

  if (!skip.has("milliseconds")) {
    const ms = diffMilliseconds(a, b)
    // removing ms isn't needed as it's the last
    if (ms) duration.milliseconds = ms
  }
  return duration
}
