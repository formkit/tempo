import { date } from "./date"
import { diffMonths } from "./diffMonths"
import { diffYears } from "./diffYears"
import { deviceLocale } from "./deviceLocale"
import type { DateInput, MaybeDateInput } from "./types"

export type RelativeUnit =
  | "second"
  | "minute"
  | "hour"
  | "day"
  | "week"
  | "month"
  | "year"

export interface RelativeOptions {
  /** The date to compare with (default: now). */
  base?: MaybeDateInput
  /** A BCP 47 locale (default: the device locale). */
  locale?: string
  /** "auto" (default) gives "yesterday" / "now"; "always" gives "1 day ago". */
  numeric?: "auto" | "always"
  /** "long" (default), "short" or "narrow". */
  style?: "long" | "short" | "narrow"
  /** Always use this unit instead of picking one. */
  unit?: RelativeUnit
}

const formatters: Record<string, Intl.RelativeTimeFormat> = {}

/**
 * The local wall-clock time of a date as a UTC timestamp, so differences are
 * measured the way a person reads a clock (a DST change doesn't add or remove
 * an hour).
 */
function wall(d: Date, dateOnly = false): number {
  const w = new Date(0)
  w.setUTCFullYear(d.getFullYear(), d.getMonth(), d.getDate())
  if (!dateOnly) {
    w.setUTCHours(d.getHours(), d.getMinutes(), d.getSeconds(), d.getMilliseconds())
  }
  return +w
}

/**
 * The (truncated) amount of the given unit from base to the date. Hours use
 * the wall clock, days and weeks count calendar dates, months and years are
 * completed months/years (like diffMonths/diffYears).
 */
function amount(unit: RelativeUnit, d: Date, base: Date): number {
  switch (unit) {
    case "second":
      return Math.trunc((+d - +base) / 1000)
    case "minute":
      return Math.trunc((+d - +base) / 60_000)
    case "hour": {
      // Wall-clock hours, except inside a repeated (fall-back) hour where the
      // wall clock reads the same twice: fall back to elapsed hours.
      const hours = Math.trunc((wall(d) - wall(base)) / 3_600_000)
      return hours || Math.trunc((+d - +base) / 3_600_000)
    }
    case "day":
      return Math.round((wall(d, true) - wall(base, true)) / 86_400_000)
    case "week":
      return Math.trunc(amount("day", d, base) / 7)
    case "month":
      return diffMonths(d, base)
    case "year":
      return diffYears(d, base)
  }
}

/**
 * Formats a date relative to now (or another date) using
 * `Intl.RelativeTimeFormat`, picking the largest sensible unit:
 *
 * ```js
 * relative(addMinute(new Date(), -5)) // "5 minutes ago"
 * relative(addDay(new Date(), -1)) // "yesterday"
 * relative("2030-01-01", { locale: "fr" }) // "dans 3 ans"
 * ```
 *
 * - under a minute: seconds; under an hour: minutes
 * - under 24 wall-clock hours: hours
 * - otherwise calendar days (under 7), then weeks (under a completed month),
 *   completed months (under 12), then completed years.
 *
 * Amounts are truncated toward zero (59.9 minutes is "59 minutes"), and are
 * computed in the device's local time zone.
 *
 * @param inputDate - The date to describe
 * @param [options] - base, locale, numeric, style or a fixed unit
 */
export function relative(
  inputDate: DateInput,
  options: RelativeOptions = {}
): string {
  const d = date(inputDate)
  const base = date(options.base)
  const locale =
    !options.locale || options.locale === "device" ? deviceLocale() : options.locale
  const numeric = options.numeric ?? "auto"
  const style = options.style ?? "long"
  let unit = options.unit
  if (!unit) {
    const ms = Math.abs(+d - +base)
    if (ms < 60_000) unit = "second"
    else if (ms < 3_600_000) unit = "minute"
    else if (Math.abs(wall(d) - wall(base)) < 86_400_000) unit = "hour"
    else if (Math.abs(amount("day", d, base)) < 7) unit = "day"
    else {
      const months = amount("month", d, base)
      unit = months === 0 ? "week" : Math.abs(months) < 12 ? "month" : "year"
    }
  }
  let value = amount(unit, d, base)
  // Keep the direction for zero amounts: "0 days ago" vs "in 0 days".
  if (value === 0) value = +d < +base ? -0 : 0
  const key = `${locale}|${numeric}|${style}`
  const rtf =
    formatters[key] ??
    (formatters[key] = new Intl.RelativeTimeFormat(locale, { numeric, style }))
  return rtf.format(value, unit)
}
