/**
 * The date format used as an input value. Either a date or an ISO8601 string.
 */
export type DateInput = Date | string

/**
 * The date format used as a maybe input value. Either a date, ISO8601 string or null for current time
 */
export type MaybeDateInput = DateInput | null

/**
 * Format parts with text names use these descriptors:
 */
export type NamedFormatOption = "long" | "short" | "narrow"

/**
 * A registry of named format parts. Each type of part has every option.
 */
export interface NamedFormats {
  weekday: Record<string, NamedFormatOption>
  month: Record<string, NamedFormatOption>
  dayPeriod: Record<string, NamedFormatOption>
}

/**
 * Internal format for "pieces" of a date form. Each part represents a single
 * logical grouping, like "month", or "seconds".
 */
export interface Part {
  /**
   * An object of partName to partValue For example:
   * ```js
   * { hour: '2-digit' }
   * ```
   */
  option: FormatPattern[1]
  /**
   * The name of the part, these must be valid parts of a date format as
   * specified in Intl.DateTimeFormatPartTypes. Valid values are:
   * day, dayPeriod, era, hour, literal, minute, month, second, timeZoneName,
   * weekday, year
   */
  partName: Intl.DateTimeFormatPartTypes
  /**
   * The value of a given part. For example "2-digit", or "narrow".
   */
  partValue: string
  /**
   * The string token that represents the regex. For example "YYYY".
   */
  token: string
  /**
   * A regular expression if the above token.
   */
  pattern: RegExp
  /**
   * Does this part require a the hour12 clock.
   */
  hour12: boolean
}

/**
 * A date part with an actual value applied.
 */
export type FilledPart = Part & { value: string }

/**
 * A tuple describing a given formatting token.
 */
export type FormatPattern = [
  pattern: FormatToken | string,
  option: Partial<Record<Intl.DateTimeFormatPartTypes, string>>,
  exp?: RegExp
]

/**
 * Possible options for a format style.
 */
export type FormatStyle = "full" | "long" | "medium" | "short"

/**
 * Possible objects for the dateStyle and timeStyle.
 */
export type FormatStyleObj =
  | { date: FormatStyle; time: FormatStyle }
  | { date: FormatStyle }
  | { time: FormatStyle }

export type Format = FormatStyle | FormatStyleObj | (string & {})

/**
 * A union of all available formatting tokens.
 */
export type FormatToken =
  | "YYYY"
  | "YY"
  | "MMMM"
  | "MMM"
  | "MM"
  | "M"
  | "DD"
  | "D"
  | "dddd"
  | "ddd"
  | "d"
  | "mm"
  | "m"
  | "ss"
  | "s"
  | "HH"
  | "H"
  | "hh"
  | "h"
  | "a"
  | "A"
  | "ZZ"
  | "Z"

export interface ParseOptions {
  /**
   * A string representing a date.
   */
  date: string
  /**
   * The format that should be used to parse the date. This is a string composed
   * of tokens.
   */
  format: Format
  /**
   * The locale used to parse the date.
   */
  locale: string
  /**
   * A function that can be used to filter out parts of the format. This is
   * useful when using the native Intl formats like
   * `{ date: 'full', time: 'full' }` and not wanting to keep all the parts of
   * the given format.
   */
  partFilter?: (part: Part) => boolean
  /**
   * The behavior to use when a date overflows a given month. For example, if
   * the date to parse is February 29, 2023 — there is no 29th day of February.
   * In this case overflow "forward" would result in March 1, 2023, "backward"
   * would result in February 28, 2023, and "throw" would throw an error.
   */
  dateOverflow?: "forward" | "backward" | "throw"
}

export interface FormatOptions {
  /**
   * A date object or ISO 8601 string.
   */
  date: DateInput
  /**
   * A format string or object.
   */
  format: Format
  /**
   * A locale or en by default.
   */
  locale?: string
  /**
   * Whether or not to escape literals.
   */
  genitive?: boolean
  /**
   * A function to filter parts.
   */
  tz?: string
  /**
   * A function to filter parts.
   */
  partFilter?: (part: Part) => boolean
}
