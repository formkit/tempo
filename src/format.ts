import { date } from "./date"
import { parts } from "./parts"
import { fill } from "./common"
import type { DateInput, Format, Part } from "./types"

/**
 * Produce a formatted string. Available strings:
 *
 * YY - 2 digit year
 * YYYY - 4 digit year
 * M - The month 1-12
 * MM - The month 01-12
 * MMM - Short name Jan-Dec
 * MMMM - Full name January - December
 * D - The day of the month 1-31
 * DD - The day of the month 01-31
 * d - Single digit day "T"
 * ddd - Short day name Thu
 * dddd - Full day name Wednesday
 * H - Minimum hour digits, 24 hour, 0-23
 * HH - 2 hour digits, 24 hour, 00-23
 * h - Minimum hour digits, 12 hour clock, 1-12
 * hh - 2 hour digits, 12 hour clock, 01-12
 * m - The minute 0-59
 * mm - The minute 00-59
 * s - The second 0-59
 * ss - The second 00-59
 * a - am/pm
 * A - AM/PM
 * Z - +0800, +0530, -1345
 *
 * @param inputDate - A date object or ISO 8601 string
 * @param format - A format
 */
export function format(
  inputDate: DateInput,
  format: Format = "long",
  locale = "en",
  genitive = false,
  partFilter: (part: Part) => boolean = () => true
) {
  if (format === "ISO8601") return date(inputDate).toISOString()
  return fill(
    inputDate,
    parts(format, locale).filter(partFilter),
    locale,
    genitive
  )
    .map((p) => p.value)
    .join("")
}
