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
import type { DateInput, Duration, MaybeDateInput } from "./types"

type DurationKey = keyof Duration

function negateDuration(duration: Duration): Duration {
  const negated: Duration = {}
  for (const unit of Object.keys(duration) as DurationKey[]) {
    negated[unit] = -duration[unit]!
  }
  return negated
}

function calendarDiff(
  current: Date,
  target: Date,
  diffUnit: (dateA: Date, dateB: Date) => number,
  addUnit: (date: Date, count: number) => Date
): [number, Date] {
  let amount = diffUnit(current, target)
  let next = addUnit(current, -amount)
  while (amount > 0 && next < target) {
    amount--
    next = addUnit(current, -amount)
  }
  return [amount, next]
}

/**
 * Options for `diff` function
 */
export interface DiffOptions {
  /**
   * whether the difference should be absolute (not negative)
   */
  abs?: boolean
  /**
   * units you want to skip, for example weeks
   */
  skip?: DurationKey[] | Set<DurationKey>
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
  options?: DiffOptions
): Duration

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
  options?: DiffOptions
): Duration

export function diff(
  dateA: MaybeDateInput,
  dateB?: MaybeDateInput,
  options?: DiffOptions
): Duration {
  let a = date(dateA)
  let b = date(dateB)

  if (a < b) {
    const duration = diff(b, a, options)
    return options?.abs ? duration : negateDuration(duration)
  }

  const skip = new Set(options?.skip)
  const duration: Duration = {}

  if (!skip.has("years")) {
    const [years, next] = calendarDiff(a, b, diffYears, addYear)
    a = next
    if (years) duration.years = years
  }

  if (!skip.has("months")) {
    const [months, next] = calendarDiff(a, b, diffMonths, addMonth)
    a = next
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
