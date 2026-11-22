import { date } from "./date"
import { dayStart } from "./dayStart"
import { diffDays } from "./diffDays"
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
 * The amount of the given unit between the date and the base. Days, weeks,
 * months and years count calendar boundaries in local time, so 11pm last
 * night is "yesterday" and a DST change can't shift the result.
 */
function amount(unit: RelativeUnit, d: Date, base: Date): number {
  const ms = +d - +base
  switch (unit) {
    case "second":
      return Math.trunc(ms / 1000)
    case "minute":
      return Math.trunc(ms / 60_000)
    case "hour":
      return Math.trunc(ms / 3_600_000)
    case "day":
      return diffDays(dayStart(d), dayStart(base))
    case "week":
      return Math.trunc(diffDays(dayStart(d), dayStart(base)) / 7)
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
 * relative(d, { numeric: "always", style: "short" }) // "1 day ago" → "1 day ago"
 * ```
 *
 * Under 1 minute it uses seconds, under 1 hour minutes, under 1 day hours,
 * under 1 week calendar days, under 1 month weeks, under 1 year months,
 * otherwise years.
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
  const locale = !options.locale || options.locale === "device" ? deviceLocale() : options.locale
  const numeric = options.numeric ?? "auto"
  const style = options.style ?? "long"
  let unit = options.unit
  let value = 0
  if (unit) {
    value = amount(unit, d, base)
  } else {
    const ms = Math.abs(+d - +base)
    if (ms < 60_000) unit = "second"
    else if (ms < 3_600_000) unit = "minute"
    else if (ms < 86_400_000) unit = "hour"
    else {
      const months = amount("month", d, base)
      const days = amount("day", d, base)
      if (Math.abs(months) >= 12) unit = "year"
      else if (months !== 0) unit = "month"
      else if (Math.abs(days) >= 7) unit = "week"
      else unit = "day"
    }
    value = amount(unit, d, base)
  }
  const key = `${locale}|${numeric}|${style}`
  const rtf =
    formatters[key] ??
    (formatters[key] = new Intl.RelativeTimeFormat(locale, { numeric, style }))
  // Avoid "-0" ("0 seconds ago") vs "0" ("now") inconsistencies.
  return rtf.format(value === 0 ? 0 : value, unit)
}
