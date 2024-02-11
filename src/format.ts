import { date } from "./date"
import { parts } from "./parts"
import { fill } from "./common"
import type { DateInput, Format, FormatOptions, Part } from "./types"
import { offset } from "./offset"
import { removeOffset } from "./removeOffset"
import { deviceLocale } from "./deviceLocale"

/**
 * Produce a formatted string. Available strings:
 * token | description
 * ------|------------
 * YY | 2 digit year
 * YYYY | 4 digit year
 * M | The month 1-12
 * MM | The month 01-12
 * MMM | Short name Jan-Dec
 * MMMM | Full name January | December
 * D | The day of the month 1-31
 * DD | The day of the month 01-31
 * d | Single digit day "T"
 * ddd | Short day name Thu
 * dddd | Full day name Wednesday
 * H | Minimum hour digits, 24 hour, 0-23
 * HH | 2 hour digits, 24 hour, 00-23
 * h | Minimum hour digits, 12 hour clock, 1-12
 * hh | 2 hour digits, 12 hour clock, 01-12
 * m | The minute 0-59
 * mm | The minute 00-59
 * s | The second 0-59
 * ss | The second 00-59
 * a | am/pm
 * A | AM/PM
 * Z | +0800, +0530, -1345
 *
 * @param inputDate - A date object or ISO 8601 string
 * @param format - A format
 */
export function format(options: FormatOptions): string
export function format(
  inputDate: DateInput,
  format?: Format,
  locale?: string,
  genitive?: boolean,
  partFilter?: (part: Part) => boolean
): string
export function format(
  inputDateOrOptions: DateInput | FormatOptions,
  format: Format = "long",
  locale: string | undefined = "device",
  genitive: boolean | undefined = false,
  partFilter?: (part: Part) => boolean
): string {
  let tz

  if (
    typeof inputDateOrOptions === "object" &&
    !(inputDateOrOptions instanceof Date)
  ) {
    // Extract options from the object.
    ;({
      date: inputDateOrOptions,
      format,
      locale,
      genitive,
      partFilter,
      tz,
    } = inputDateOrOptions)
  }
  // ISO 8601 is a special case because it doesn't require a format.
  if (format === "ISO8601") return date(inputDateOrOptions).toISOString()

  if (tz) {
    // If a timezone is provided, we need to apply the offset to the date.
    inputDateOrOptions = removeOffset(
      inputDateOrOptions,
      offset(inputDateOrOptions, tz)
    )
  }

  if (!locale || locale === "device") {
    locale = deviceLocale()
  }

  return fill(
    inputDateOrOptions,
    parts(format, locale).filter(partFilter ?? (() => true)),
    locale,
    genitive
  )
    .map((p) => p.value)
    .join("")
}
