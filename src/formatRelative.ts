import { date } from "./date"
import type { DateInput, RelativeFormatOptions } from "./types"
import { deviceLocale } from "./deviceLocale"

export function formatRelative(
  inputDate: DateInput,
  options?: RelativeFormatOptions,
) {
  let { unit, locale } = options || {}

  if (!locale || locale === "device") {
    locale = deviceLocale()
  }

  // Remove the 's' from the end of the unit if it exists
  // e.g. 'days' -> 'day'
  if (unit)
    unit = (
      unit.endsWith("s") ? unit.slice(0, -1) : unit
    ) as Intl.RelativeTimeFormatUnit

  const date1 = date(inputDate)

  // Allow dates or times to be passed
  const timeMs = date1.getTime()

  // Get the amount of seconds between the given date and now
  const deltaSeconds = Math.round((timeMs - Date.now()) / 1000)

  // Array reprsenting one minute, hour, day, week, month, etc in seconds
  const cutoffs = [
    60, // 1 minute
    3600, // 1 hour
    86400, // 1 day
    86400 * 7, // 1 week
    86400 * 30, // 1 month
    86400 * 91, // 1 quarter
    86400 * 365, // 1 year
    Infinity, // Infinity days
  ]

  // Array equivalent to the above but in the string representation of the units
  const units: Intl.RelativeTimeFormatUnit[] = [
    "second",
    "minute",
    "hour",
    "day",
    "week",
    "month",
    "quarter",
    "year",
  ]

  // Grab the ideal cutoff unit
  const unitIndex = unit
    ? units.findIndex((elem) => elem === unit)
    : cutoffs.findIndex((cutoff) => cutoff > Math.abs(deltaSeconds))

  // Get the divisor to divide from the seconds. E.g. if our unit is "day" our divisor
  // is one day in seconds, so we can divide our seconds by this to get the # of days
  const divisor = unitIndex ? cutoffs[unitIndex - 1] : 1

  // Intl.RelativeTimeFormat do its magic
  const rtf = new Intl.RelativeTimeFormat(locale, options)
  const rounder = deltaSeconds < 0 ? Math.ceil : Math.floor

  return rtf.format(rounder(deltaSeconds / divisor), units[unitIndex])
}
