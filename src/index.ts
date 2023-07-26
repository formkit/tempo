/**
 * Format parts with text names use these descriptors:
 */
type NamedFormatOption = "long" | "short" | "narrow"

/**
 * A registry of named format parts. Each type of part has every option.
 */
interface NamedFormats {
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
type FilledPart = Part & { value: string }

/**
 * A tuple describing a given formatting token.
 */
type FormatPattern = [
  pattern: FormatToken | string,
  option: Partial<Record<Intl.DateTimeFormatPartTypes, string>>,
  exp?: RegExp
]

/**
 * Possible options for a format style.
 */
type FormatStyle = "full" | "long" | "medium" | "short"

/**
 * Possible objects for the dateStyle and timeStyle.
 */
type FormatStyleObj =
  | { date: FormatStyle; time: FormatStyle }
  | { date: FormatStyle }
  | { time: FormatStyle }

export type Format = FormatStyle | FormatStyleObj | string

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

/**
 * The date format used as an input value. Either a date or an ISO8601 string.
 */
export type DateInput = Date | string

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

/**
 * A date to use for determining various spec details.
 */
const specDate = "1999-03-04T02:05:01.000Z"

/**
 * A cache of Intl tokens and their respective formats.
 */
const memoParts: Map<string, NamedFormats> = new Map()

/**
 * Clock agnostic time format patterns.
 */
const clockAgnostic: FormatPattern[] = [
  ["YYYY", { year: "numeric" }],
  ["YY", { year: "2-digit" }],
  ["MMMM", { month: "long" }],
  ["MMM", { month: "short" }],
  ["MM", { month: "2-digit" }],
  ["M", { month: "numeric" }],
  ["DD", { day: "2-digit" }],
  ["D", { day: "numeric" }],
  ["dddd", { weekday: "long" }],
  ["ddd", { weekday: "short" }],
  ["d", { weekday: "narrow" }],
  ["mm", { minute: "2-digit" }],
  ["m", { minute: "numeric" }],
  ["ss", { second: "2-digit" }],
  ["s", { second: "numeric" }],
  ["Z", { timeZoneName: "short" }],
]

/**
 * 24 hour click format patterns.
 */
const clock24: FormatPattern[] = [
  ["HH", { hour: "2-digit" }],
  ["H", { hour: "numeric" }],
]

/**
 * 12 hour format patterns.
 */
const clock12: FormatPattern[] = [
  ["hh", { hour: "2-digit" }],
  ["h", { hour: "numeric" }],
  ["a", { dayPeriod: "narrow" }],
  ["A", { dayPeriod: "narrow" }],
]

/**
 * Tokens that have a fixed length.
 */
const fixedLength = {
  DD: 2,
  HH: 2,
  MM: 2,
  YY: 2,
  YYYY: 4,
  hh: 2,
  mm: 2,
  ss: 2,
  Z: 5,
}

/**
 * Tokens that are genitive — in that they can have "possession" when used in
 * a date phrase, "March’s 4th day" (but not in english).
 *
 * When computing a range for these, the range can be either genitive or not.
 * The same is true for parsing dates containing these tokens.
 */
const genitiveTokens = ["MMMM", "MMM", "dddd", "ddd"]

/**
 * A map of FormatPattern tuples to their respective token.
 */
const tokens = new Map(
  [...clockAgnostic, ...clock24, ...clock12].map((format) => {
    return [format[0], format]
  })
)

/**
 * A map of locale’s am/pm.
 */
const dayPeriodMap: Map<string, { am?: string; pm?: string }> = new Map()

/**
 * An array of all available date styles.
 */
const styles: ReadonlyArray<FormatStyle> = ["full", "long", "medium", "short"]

/**
 * Matches a given date with ISO 8601 compliance. Allows the "T" to be missing
 * and only requires year and month, other params are required with increasing
 * specificity.
 */
const iso8601Match =
  /^([0-9]{4})-([0-1][0-9])(?:-([0-3][0-9]))?(?:[T ]?([0-2][0-9])(?::([0-5][0-9]))?(?::([0-5][0-9]))?)?(?:\.[0-9]+)?(Z|(?:\+|\-)[0-9]{4})?$/

/**
 * Creates a leading zero string of 2 digits.
 * @param n - A number.
 */
const two = (n: number) => String(n).padStart(2, "0")
/**
 * Creates a leading zero string of 4 digits.
 * @param n - A number.
 */
const four = (n: number) => String(n).padStart(2, "0")

/**
 * True when the date string is valid ISO 8601.
 * @param date - A date string.
 */
export function iso8601(date: string): boolean {
  const matches = date.match(iso8601Match)
  if (matches) {
    const month = Number(matches[2])
    if (month < 1 || month > 12) return false

    if (typeof matches[3] !== undefined) {
      const date = Number(matches[3])
      if (date < 1 || date > 31) return false
    }
    if (typeof matches[4] !== undefined) {
      const hours = Number(matches[4])
      if (hours < 0 || hours > 23) return false
    }

    return true
  }
  return false
}

/**
 * Normalizes a "short" date like 2012-01-01 to 2012-01-01T00:00:00 to prevent
 * automatic coercion to UTC.
 * @param date - A string representation of the date.
 */
function normalize(date: string) {
  const matches = date.match(iso8601Match)
  if (matches && typeof matches[4] === "undefined") {
    return (date += "T00:00:00")
  }
  return date
}

/**
 * A date to parse.
 * @param date - A Date object or an ISO 8601 date.
 */
export function date(date?: DateInput): Date {
  if (!date) {
    date = new Date()
  }
  if (date instanceof Date) {
    const d = new Date(date)
    d.setMilliseconds(0)
    return d
  }
  date = date.trim()
  if (iso8601(date)) {
    return new Date(normalize(date))
  }
  throw new Error(`Non ISO 8601 compliant date (${date}).`)
}

/**
 * Returns a Date object for the first day of a month.
 * @param inputDate - A string or Date object
 */
export function monthStart(inputDate: DateInput): Date {
  const d = date(inputDate)
  d.setDate(1)
  d.setHours(0, 0, 0)
  return d
}

/**
 * Returns a Date object for the with the input date set to the last day of
 * the current month. Does not change the time.
 * @param inputDate - A string or Date object
 */
export function monthEnd(inputDate: DateInput): Date {
  const d = date(inputDate)
  d.setDate(1)
  d.setMonth(d.getMonth() + 1)
  d.setDate(0)
  return d
}

/**
 * Returns the total number of days from a given month.
 * @param inputDate - A string or Date object
 */
export function monthDays(inputDate: DateInput): number {
  const d = monthEnd(inputDate)
  return d.getDate()
}

/**
 * Get the number of days in the given date’s year.
 * @param inputDate - A string or Date object
 */
export function yearDays(inputDate: DateInput): number {
  const d = date(inputDate)
  return (
    (new Date(d.getFullYear() + 1, 0, 0).getTime() -
      new Date(d.getFullYear(), 0, 0).getTime()) /
    86400000
  )
}

/**
 * Gets the what day of the year a given date is. For example, August 1st is
 * the 213th day of the year on non-leapyears and 214th on leapyears.
 * @param inputDate - The input date.
 */
export function dayOfYear(inputDate: DateInput): number {
  const d = date(inputDate)
  return Math.round(
    (new Date(d.getFullYear(), d.getMonth(), d.getDate(), 0, 0).getTime() -
      new Date(d.getFullYear(), 0, 0).getTime()) /
      86400000
  )
}

/**
 * Returns a Date object for start of the given day.
 * @param inputDate - A string or Date object
 */
export function dayStart(inputDate: DateInput): Date {
  const d = date(inputDate)
  d.setHours(0, 0, 0)
  return d
}

/**
 * Returns a Date object for start of the given week. Defaults to Sunday as the
 * first day of the week:
 * 0 = Sunday ... 6 = Saturday
 * @param inputDate - A string or Date object
 * @param startOfWeekDay - Determines which day of the week is the first
 */
export function weekStart(inputDate: DateInput, startOfWeekDay = 0): Date {
  const d = date(inputDate)
  let diff = startOfWeekDay - d.getDay()
  if (diff > 0) diff = diff - 7
  d.setDate(d.getDate() + diff)
  d.setHours(0, 0, 0)
  return d
}

/**
 * Returns a Date object for the last day at the last second of the given week.
 * Defaults to Sunday as the first day of the week:
 * 0 = Sunday ... 6 = Saturday
 * @param inputDate - Gets the last day of the week
 * @param startOfWeekDay - The first day of the week
 */
export function weekEnd(inputDate: DateInput, startOfWeekDay = 0): Date {
  const d = weekStart(inputDate, startOfWeekDay)
  d.setDate(d.getDate() + 6)
  d.setHours(23, 59, 59)
  return d
}

/**
 * Returns a new date object 1/n days after the original one.
 * @param inputDate - A date to increment by 1 day.
 */
export function addDay(inputDate: DateInput, count = 1) {
  const d = date(inputDate)
  d.setDate(d.getDate() + count)
  return d
}

/**
 * Returns a new date object 1/n months after the original one. Keep in mind if you
 * start with a date late in a given month you could get a date after the next
 * month.
 * @param inputDate - A date to increment by 1 or more months.
 * @param count - The quantity to add.
 * @param dateOverflow - Whether or not to allow the date to overflow to another month if the inputDate’s month is out of range of the new month.
 */
export function addMonth(
  inputDate: DateInput,
  count = 1,
  dateOverflow = false
) {
  const d = date(inputDate)
  const dayOfMonth = d.getDate()
  // If overflowing is disallowed, set the date back to the first of the month
  if (!dateOverflow) d.setDate(1)
  d.setMonth(d.getMonth() + count)

  // If overflowing is disallowed, we need to set the date back to the proper
  // day or the last day of the month.
  if (!dateOverflow) {
    const daysInMonth = monthDays(d)
    d.setDate(daysInMonth < dayOfMonth ? daysInMonth : dayOfMonth)
  }
  return d
}

/**
 * Returns a new date object 1/n years after the original one. Keep in mind if
 * you start with a date late in a given month you could get a date after the
 * next month.
 * @param inputDate - A date to increment by 1 day.
 * @param count - The quantity of years add.
 * @param dateOverflow - Whether or not to allow the date to overflow to another month if the inputDate’s month is out of range of the new month.
 */
export function addYear(inputDate: DateInput, count = 1, dateOverflow = false) {
  const d = date(inputDate)
  const dayOfMonth = d.getDate()
  // If overflowing is disallowed, set the date back to the first of the month
  if (!dateOverflow) d.setDate(1)

  d.setFullYear(d.getFullYear() + count)

  // If overflowing is disallowed, we need to set the date back to the proper
  // day or the last day of the month.
  if (!dateOverflow) {
    const daysInMonth = monthDays(d)
    d.setDate(daysInMonth < dayOfMonth ? daysInMonth : dayOfMonth)
  }
  return d
}

/**
 * Checks if two date objects refer to the same date. Ignores time.
 * @param inputDateA - First date to compare
 * @param inputDateB - Second date to compare
 */
export function sameDay(inputDateA: DateInput, inputDateB: DateInput) {
  const a = date(inputDateA)
  const b = date(inputDateB)
  return (
    a.getDate() === b.getDate() &&
    a.getMonth() === b.getMonth() &&
    a.getFullYear() === b.getFullYear()
  )
}

/**
 * Determines what "style" a given part is in. For example, if you provide:
 * ```js
 * partStyle('en', 'month', 'Jan')
 * // returns "short".
 * ```
 * Part styles are always expected to be "genitive" — for use in "dateStyle".
 * @param locale - Locale string
 * @param part - The part to attempt a lookup on
 * @param value - The value of a given part.
 */
function partStyle(
  locale: string,
  part: keyof NamedFormats,
  value: string
): NamedFormatOption | undefined {
  if (!memoParts.has(locale)) {
    const date = new Date(specDate)
    const weekdays = [3, 8, 9, 7, 6, 4, 3]
    const parts = ["weekday", "month", "dayPeriod"]
    const partStyles: NamedFormatOption[] = ["long", "short", "narrow"]
    const formats: Partial<NamedFormats> = {}
    for (let i = 0; i < 12; i++) {
      date.setMonth(0 + i)
      if (i in weekdays) date.setDate(weekdays[i])
      date.setUTCHours(8 + i)
      for (const style of partStyles) {
        const segments = new Intl.DateTimeFormat(
          locale,
          parts.reduce(
            (options, part) => Object.assign(options, { [part]: style }),
            { hour12: true, timeZone: "UTC" }
          )
        )
          .formatToParts(date)
          .map(normStr)
        if (style === "long" || style === "short") {
          const genitiveFormattedParts = new Intl.DateTimeFormat(locale, {
            dateStyle: style === "short" ? "medium" : "long",
          })
            .formatToParts(date)
            .map(normStr)
          const genitiveMonth = genitiveFormattedParts.find(
            (part) => part.type === "month"
          )
          const index = segments.findIndex((part) => part.type === "month")
          if (index > -1 && genitiveMonth) segments[index] = genitiveMonth
        }
        segments.forEach((part) => {
          if (part.type === "literal") return
          const type = part.type as keyof NamedFormats
          formats[type] = Object.assign(formats[type] || {}, {
            [part.value]: style,
          })
        })
      }
    }
    memoParts.set(locale, formats as NamedFormats)
  }
  const formats = memoParts.get(locale)
  return formats ? formats[part][value] : undefined
}

/**
 * Determines the correct value for am/pm by locale and memoizes it.
 * @param ampm - am or pm
 * @param locale - The locale to fetch.
 */
function ap(ampm: "am" | "pm", locale: string): string {
  const l = dayPeriodMap.get(locale)
  if (l && l[ampm]) return l[ampm] as string
  const specimen = new Date(specDate)
  specimen.setUTCHours(ampm === "am" ? 5 : 20)
  const subparts = new Intl.DateTimeFormat(locale, {
    timeStyle: "full",
    timeZone: "UTC",
    hour12: true,
  })
    .formatToParts(specimen)
    .map(normStr)
  const period = subparts.find((part) => part.type === "dayPeriod")
  if (period) {
    const localePeriods: { am?: string; pm?: string } = l || {}
    dayPeriodMap.set(
      locale,
      Object.assign(localePeriods, { [ampm]: period.value })
    )
    return period.value
  }
  return ampm
}

/**
 * Attempts to guess the correct part value type for a given dateStyle. For
 * example a month of 02 would be "2-digit".
 *
 * @param partName - The part name to guess for, like 'year' or 'month'
 * @param partValue - The current value, it is assumed this is the smallest denom.
 */
function guessPattern<T extends Intl.DateTimeFormatPartTypes>(
  partName: T,
  partValue: string,
  locale: string,
  hour: T extends "hour" ? 12 | 24 : undefined
): FormatPattern | undefined {
  const l = partValue.length
  const n = !isNaN(Number(partValue))
  let style: NamedFormatOption | undefined
  /* eslint-disable @typescript-eslint/no-non-null-assertion */
  switch (partName) {
    case "year":
      return l === 2 ? tokens.get("YY") : tokens.get("YYYY")
    case "month":
      if (n) return l === 1 ? tokens.get("M") : tokens.get("MM")
      style = partStyle(locale, partName, partValue)
      switch (style) {
        case "long":
          return tokens.get("MMMM")
        default:
          return tokens.get("MMM")
      }
    case "day":
      return l === 1 ? tokens.get("D") : tokens.get("DD")
    case "weekday":
      style = partStyle(locale, partName, partValue)
      switch (style) {
        case "narrow":
          return tokens.get("d")
        case "short":
          return tokens.get("ddd")
        default:
          return tokens.get("dddd")
      }
    case "hour":
      // Need to distinguish the locale’s default as 24 or 12 hour.
      if (hour === 12) return l === 1 ? tokens.get("h") : tokens.get("hh")
      return l === 1 ? tokens.get("H") : tokens.get("HH")
    case "minute":
      return l === 1 ? tokens.get("m") : tokens.get("mm")
    case "second":
      return l === 1 ? tokens.get("s") : tokens.get("ss")
    case "dayPeriod":
      return /^[A-Z]+$/u.test(partValue) ? tokens.get("A") : tokens.get("a")
    case "literal":
      return [partValue, { literal: partValue }, new RegExp("")]
    case "timeZoneName":
      const offset = partValue.split("-")
      return offset.length === 2 && offset[1].length === 4
        ? tokens.get("ZZ")
        : tokens.get("Z")
    default:
      return undefined
  }
  /* eslint-enable @typescript-eslint/no-non-null-assertion */
}

/**
 * Determines the parts in a native date style, like "full".
 * @param format - A date style like "full" or "short"
 * @param locale - The locale string
 */
function styleParts(
  format: FormatStyle | FormatStyleObj,
  locale: string
): Part[] {
  const options: Intl.DateTimeFormatOptions = {
    timeZone: "UTC",
  }
  if (typeof format === "string") {
    options.dateStyle = format
  } else {
    if ("date" in format) options.dateStyle = format.date
    if ("time" in format) options.timeStyle = format.time
  }

  const formatter = new Intl.DateTimeFormat(locale, options)
  const segments = formatter.formatToParts(new Date(specDate)).map(normStr)
  const hourTypeSegments = formatter
    .formatToParts(new Date("1999-04-05T23:05:01.000Z"))
    .map(normStr)
  const hourPart = hourTypeSegments.find((segment) => segment.type === "hour")
  const hourType = hourPart && hourPart.value === "23" ? 24 : 12
  return segments
    .map((part): Part | undefined => {
      const partName = part.type
      const formatPattern = guessPattern(
        part.type,
        part.value,
        locale,
        part.type === "hour" ? hourType : undefined
      )
      if (formatPattern === undefined) return
      const partValue = formatPattern[1][partName]
      if (!partValue) return
      if (!formatPattern[2])
        formatPattern[2] = new RegExp(`${formatPattern[0]}`, "g")
      return {
        option: { [partName]: partValue },
        partName,
        partValue,
        token: formatPattern[0],
        pattern: formatPattern[2],
        hour12: hourType === 12,
      }
    })
    .filter((part): part is Part => !!part)
}

/**
 * Given a format string, produce an array of matching "parts", each part
 * contains a regular expression and the corresponding
 * Intl.DateTimeFormatPartTypesRegistry key/value.
 * @param format - A format string like MM/DD/YYYY
 * @param locale - The locale to parse for.
 */
export function parts(format: Format, locale: string): Part[] {
  if (styles.includes(format as FormatStyle) || typeof format === "object") {
    return styleParts(format as FormatStyle | FormatStyleObj, locale)
  }
  let f = format
  let match = 0
  const testPattern = (pattern: FormatPattern) => {
    if (!pattern[2]) pattern[2] = new RegExp(`(.)?(${pattern[0]})`, "g")
    if (pattern[2].test(f)) {
      let didAdd = 0
      f = f.replace(pattern[2], (_, prefix, actualMatch) => {
        if (prefix === "\\") return actualMatch
        return `${typeof prefix === "string" ? prefix : ""}{!${
          didAdd++ ? match : match++
        }!}`
      })
      return !!didAdd
    }
    return false
  }

  function validate(patterns: Part[]): Part[] {
    const parts = patterns.map((part) => part.partName)
    const deduped = new Set(parts)
    if (parts.length > deduped.size) {
      throw new Error(`Cannot reuse format tokens.`)
    }
    return patterns
  }

  function createPart(
    hour12: boolean,
    [token, option, exp]: FormatPattern
  ): Part {
    const partName = Object.keys(option)[0] as Intl.DateTimeFormatPartTypes
    const partValue = option[partName] as string
    return {
      option,
      partName,
      partValue,
      token,
      pattern: exp as RegExp,
      hour12,
    }
  }

  const found24Patterns = clockAgnostic
    .filter(testPattern)
    .concat(clock24.filter(testPattern))
    .map(createPart.bind(null, false))

  // Reset the format before re-checking
  const parts = validate(
    found24Patterns.concat(
      clock12.filter(testPattern).map(createPart.bind(null, true))
    )
  )
  const extractIndex = /^\{!(\d+)!\}$/
  return f
    .split(/(\{!\d+!\})/)
    .map((match: string): Part => {
      const hasIndex = match.match(extractIndex)
      if (hasIndex) {
        return parts[Number(hasIndex[1])]
      }
      return {
        option: { literal: match },
        partName: "literal",
        partValue: match,
        token: match,
        pattern: new RegExp(""),
        hour12: false,
      }
    })
    .filter((part) => !(part.partName === "literal" && part.partValue === ""))
}

/**
 * Return the string format for a given format. For example:
 * ```js
 * formatStr({ date: 'long' }, 'en') // dddd, MMMM D, YYYY
 * ```
 * @param format - A format string or object.
 * @param locale - A locale or en by default.
 */
export function formatStr(
  format: Format,
  locale = "en",
  escapeLiterals = false,
  filterParts: (part: Part) => boolean = () => true
): string {
  return parts(format, locale)
    .filter(filterParts)
    .reduce(
      (f, p) =>
        (f +=
          escapeLiterals && p.partName === "literal"
            ? escapeTokens(p.token)
            : p.token),
      ""
    )
    .normalize("NFKC")
}

/**
 * Given a string of tokens, escape any characters that are tokens.
 * @param str - The string to escape tokens in.
 * @returns The escaped string.
 */
export function escapeTokens(str: string): string {
  return clockAgnostic
    .concat(clock24)
    .concat(clock12)
    .sort((a, b) => (a[0].length > b[0].length ? 1 : -1))
    .reduce((target, part) => {
      return target.replace(part[0], `\\${part[0]}`)
    }, str)
}

/**
 * Creates a map of part names to their respective values.
 * @param inputDate - The date to format
 * @param parts - The individual parts the need to be formatted.
 * @param locale - The locale to format the parts with.
 * @param genitive - Whether to use genitive tokens values or not.
 */
function createPartMap(
  inputDate: DateInput,
  parts: Part[],
  locale: string,
  genitive = false
): Record<keyof Intl.DateTimeFormatPartTypesRegistry, string> {
  const d = date(inputDate)
  const hour12 = parts.filter((part) => part.hour12)
  const hour24 = parts.filter((part) => !part.hour12)
  const valueParts: Intl.DateTimeFormatPart[] = []
  const genitiveParts: Part[] = []

  function addValues(requestedParts: Part[], hour12 = false) {
    const preciseLocale = `${locale}-u-hc-${hour12 ? "h12" : "h23"}`
    valueParts.push(
      ...new Intl.DateTimeFormat(
        preciseLocale,
        requestedParts.reduce((options, part) => {
          if (part.partName === "literal") return options
          // Side effect! Genitive parts get shoved into a separate array.
          if (genitive && genitiveTokens.includes(part.token)) {
            genitiveParts.push(part)
          }
          return Object.assign(options, part.option)
        }, {} as Intl.DateTimeFormatOptions)
      )
        .formatToParts(d)
        .map(normStr)
    )
    if (genitive && genitiveParts.length) {
      for (const part of genitiveParts) {
        let formattedParts: Intl.DateTimeFormatPart[] = []
        switch (part.token) {
          case "MMMM":
            formattedParts = new Intl.DateTimeFormat(preciseLocale, {
              dateStyle: "long",
            })
              .formatToParts(d)
              .map(normStr)
            break
          case "MMM":
            formattedParts = new Intl.DateTimeFormat(preciseLocale, {
              dateStyle: "medium",
            })
              .formatToParts(d)
              .map(normStr)
            break
        }
        const genitiveFormattedPart = formattedParts.find(
          (p) => p.type === part.partName
        )
        const index = valueParts.findIndex((p) => p.type === part.partName)
        if (genitiveFormattedPart && index > -1) {
          valueParts[index] = genitiveFormattedPart
        }
      }
    }
  }

  if (hour12.length) addValues(hour12, true)
  if (hour24.length) addValues(hour24)

  return valueParts.reduce((map, part) => {
    map[part.type] = part.value
    return map
  }, {} as Record<keyof Intl.DateTimeFormatPartTypesRegistry, string>)
}

/**
 * Returns the parts filled with pertinent values.
 * @param inputDate - The date to fill parts for
 * @param parts - An array of parts to fill
 * @param locale - The locale to fill with.
 */
export function fill(
  inputDate: DateInput,
  parts: Part[],
  locale: string,
  genitive = false
): FilledPart[] {
  const partMap = createPartMap(inputDate, parts, locale, genitive)
  const d = date(inputDate)

  /**
   * Not all values get returned "properly" as our tokens would suggest. For
   * example, at times Intl returns leading zeros when it shouldn't. This fn
   * is used to clean up those irregular values.
   * @param param - Part
   */
  function value({ partName, partValue, token }: Part) {
    if (partName === "literal") return partValue
    const value = partMap[partName]
    if (partName === "hour" && token === "H") {
      return value.replace(/^0/, "")
    }
    if (
      (partName === "minute" || partName === "second") &&
      (token === "mm" || token === "ss") &&
      value.length === 1
    ) {
      return `0${value}`
    }
    if (partName === "dayPeriod") {
      const p = ap(d.getHours() < 12 ? "am" : "pm", locale)
      return token === "A" ? p.toUpperCase() : p.toLowerCase()
    }
    if (partName === "timeZoneName") {
      return minsToOffset(-1 * d.getTimezoneOffset())
    }
    return value
  }

  return parts.map((part): FilledPart => {
    return {
      ...part,
      value: value(part),
    }
  })
}

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

/**
 * Checks if a given part should have a numeric value.
 * @param part - A part to check
 */
function isNumeric(part: Part) {
  return ["numeric", "2-digit"].includes(part.partValue)
}

/**
 * Validates that an array of Parts can be parsed.
 * @param parts - Parts to validate for parsing ability.
 */
function validate(parts: Part[]): Part[] | never {
  let lastPart: Part | undefined = undefined
  for (const part of parts) {
    if (part.partName === "literal" && !isNaN(parseFloat(part.partValue))) {
      throw new Error(`Numbers in format (${part.partValue}).`)
    }
    if (
      lastPart &&
      lastPart.partName !== "literal" &&
      part.partName !== "literal"
    ) {
      if (
        !(lastPart.token in fixedLength) &&
        !(part.token in fixedLength) &&
        !(isNumeric(lastPart) && part.token.toLowerCase() === "a")
      ) {
        throw new Error(
          `Illegal adjacent tokens (${lastPart.token}, ${part.token})`
        )
      }
    }
    lastPart = part
  }
  return parts
}

/**
 * Given a string date and corresponding format parts, fill the parts with the
 * data from the string.
 * @param dateStr - A string to parse.
 * @param formatParts - The expected parts of the given string.
 */
export function parseParts(dateStr: string, formatParts: Part[]): FilledPart[] {
  let i = 0
  const advance = (parts: Part[]): [Part, Part | undefined] => [
    parts[i++],
    parts[i],
  ]
  let pos = 0
  const parsed: FilledPart[] = []
  let n: undefined | Part = undefined
  do {
    const [current, next] = advance(formatParts)
    n = next
    let len = 1
    if (current.partName === "literal") {
      // Literals can be discarded
      len = current.partValue.length
    } else if (current.token in fixedLength) {
      // Fixed length parse
      len = fixedLength[current.token as keyof typeof fixedLength]
    } else if (next) {
      // Variable length parse.
      if (next.partName === "literal") {
        len = dateStr.indexOf(next.partValue, pos) - pos
        if (len < 0) throw new Error()
      } else if (next.partName === "dayPeriod") {
        // Our validator is ensuring that the current item must be a variable
        // length number. We need to extract it.
        for (let i = 1; i <= 4; i++) {
          if (isNaN(Number(dateStr.charAt(pos + i)))) {
            len = i
            break
          }
        }
      } else {
        // Our validator guarantees the next is either not a number or it
        // will be the end of the string
        const nextChar = dateStr.substring(pos).search(/\d/)
        if (nextChar !== -1) len = pos + nextChar
      }
    } else {
      len = dateStr.length
    }

    parsed.push({ ...current, value: dateStr.substring(pos, pos + len) })
    pos += len
  } while (n)
  return parsed
}

/**
 * Converts a 2 digit year into a 4 digit year. This function assumes years 20
 * years into the future belong to the current century, and the past 80 are in
 * the past.
 *
 * @param value - 2 digits in string format
 */
function twoDigitYear(value: string): number {
  const y = new Date().getFullYear()
  const currentYear = y % 100
  const century = Math.floor(y / 100)
  const parsedYear = Number(value)
  return (century + (parsedYear > currentYear + 20 ? -1 : 0)) * 100 + parsedYear
}

/**
 * Returns an array of options for a given token in a given locale.
 * @param token - Get the full range of options for a given token
 * @param locale - The locale to fetch the options for.
 */
export function range(
  token: FormatToken,
  locale = "en",
  genitive = false
): string[] {
  const r: (n: number, c: (index: number) => string | number) => string[] = (
    n,
    c
  ) =>
    Array(n)
      .fill("")
      .map((_, i) => `${c(i)}`)

  if (token === "M") return r(12, (i) => i + 1)
  if (token === "MM")
    return r(12, (i) => {
      const m = i + 1
      return m < 10 ? `0${m}` : m
    })
  // MMM and MMMM
  if (token.startsWith("M"))
    return range("MM").map((m) =>
      format(`2000-${m}-05`, token, locale, genitive)
    )
  if (token.startsWith("d"))
    return r(7, (i) => `0${i + 2}`).map((d) =>
      format(`2022-10-${d}`, token, locale)
    )
  if (token === "a")
    return [ap("am", locale).toLowerCase(), ap("pm", locale).toLowerCase()]
  if (token === "A")
    return [ap("am", locale).toUpperCase(), ap("pm", locale).toUpperCase()]
  if (token.startsWith("Y")) {
    const year = new Date().getFullYear()
    return r(120, (i) => i + 1).reduce(
      (ranges, i) => {
        if (i !== "120")
          ranges.push(format(`${year + Number(i)}-06-06`, token, locale))
        ranges.unshift(format(`${year - Number(i)}-06-06`, token, locale))
        return ranges
      },
      [format(`${year}-06-06`, token, locale)]
    )
  }
  if (token.startsWith("D"))
    return r(31, (i) => `${token === "DD" && i < 9 ? "0" : ""}${i + 1}`)
  if (token.startsWith("H"))
    return r(24, (i) => `${token === "HH" && i < 10 ? "0" : ""}${i}`)
  if (token.startsWith("h"))
    return r(12, (i) => `${token === "hh" && i < 9 ? "0" : ""}${i + 1}`)
  if (token.startsWith("m") || token.startsWith("s"))
    return r(60, (i) => `${token.length > 1 && i < 10 ? "0" : ""}${i}`)
  return []
}

export function parse(options: ParseOptions): Date | never
export function parse(
  dateStr: string,
  format?: Format,
  locale?: string
): Date | never
/**
 * Parses a date string into a Date object using the given format.
 * @param dateStr - A string representing a date.
 * @param format - The format the given string is in.
 * @param locale - The locale to parse the string from.
 */
export function parse(
  dateStrOrOptions: string | ParseOptions,
  format: Format = "ISO8601",
  locale = "en"
): Date | never {
  let partFilter: (part: Part) => boolean = () => true
  let dateStr: string
  let dateOverflow = "backward"
  if (typeof dateStrOrOptions === "object") {
    ;({
      date: dateStr,
      format = "ISO8601",
      locale = "en",
      dateOverflow = "backward",
      partFilter = () => true,
    } = dateStrOrOptions)
  } else {
    dateStr = dateStrOrOptions
  }
  if (!dateStr) throw new Error("parse() requires a date string.")
  const invalid = (): never => {
    throw new Error(
      `Date (${dateStr}) does not match format (${formatStr(format, locale)})`
    )
  }
  if (format === "ISO8601") return date(dateStr)
  const genitive =
    styles.includes(format as FormatStyle) || typeof format === "object"
  const formatParts = validate(parts(format, locale).filter(partFilter))
  if (!formatParts.length) throw new Error("parse() requires a pattern.")
  let parsedParts
  try {
    parsedParts = parseParts(dateStr, formatParts)
  } catch {
    return invalid()
  }
  const now = new Date()
  const parsed = new Map([
    ["YYYY", now.getFullYear()],
    ["MM", now.getMonth() + 1],
    ["DD", now.getDate()],
    ["HH", 0],
    ["mm", 0],
    ["ss", 0],
  ])
  let a: null | boolean = null
  let offset = ""
  parsedParts.forEach((part): void | never => {
    if (part.partName === "literal") return
    if (part.token === part.value) return invalid()
    const v = Number(part.value)
    if (parsed.has(part.token)) {
      // Parse for YYYY, MM, DD, HH, hh, mm, ss, Z
      parsed.set(part.token, v)
    } else if (part.token === "YY") {
      // Parse for YY
      parsed.set("YYYY", twoDigitYear(part.value))
    } else {
      /* MMM - Short name Jan-Dec
       * MMMM - Full name January - December
       * h - Minimum hour digits, 12 hour clock, 1-12
       * hh - 2 hour digits, 12 hour clock, 01-12
       * m - The minute 0-59
       * mm - The minute 00-12
       * s - The second 0-59
       * a - am/pm
       * A - AM/PM
       */
      const t = part.token
      if (t.startsWith("d")) {
        // d, ddd, dddd — we just ignore these because they are non specific
        return
      } else if (t === "D") {
        parsed.set("DD", v)
      } else if (t === "H" || t.startsWith("h")) {
        parsed.set("HH", v)
      } else if (t === "M") {
        parsed.set("MM", v)
      } else if (t === "a" || t === "A") {
        a = part.value.toLowerCase() === ap("am", locale).toLowerCase()
      } else if (t === "Z") {
        offset = validOffset(part.value)
      } else {
        const values = range(t as FormatToken, locale, genitive)
        const index = values.indexOf(part.value)
        if (index !== -1) {
          switch (t) {
            case "MMM":
            case "MMMM":
              parsed.set("MM", index + 1)
              break
          }
        }
      }
    }
  })
  let hours = parsed.get("HH") || 0
  if (a === false) {
    hours += hours === 12 ? 0 : 12
    parsed.set("HH", hours === 24 ? 0 : hours)
  } else if (a === true && hours === 12) {
    // 12am === 00 in 24 hour clock.
    parsed.set("HH", 0)
  }
  parsed.set("MM", (parsed.get("MM") || 1) - 1)
  // eslint-disable-next-line prefer-const
  let [Y, M, D, h, m, s] = Array.from(parsed.values())

  // Determine if the date is valid for the month.
  const maxDaysInMonth = monthDays(new Date(`${four(Y)}-${two(M + 1)}-10`))
  if (maxDaysInMonth < D && dateOverflow === "throw")
    throw new Error(`Invalid date ${four(Y)}-${two(M + 1)}-${two(D)}`)
  D = dateOverflow === "backward" ? Math.min(D, maxDaysInMonth) : D

  // Create the date.
  const isoString = `${four(Y)}-${two(M + 1)}-${two(D)}T${two(h)}:${two(
    m
  )}:${two(s)}${offset}`
  const d = new Date(isoString)
  if (isFinite(+d)) return d
  return invalid()
}

/**
 * Validates that an offset is valid according to the format:
 * [+-]HHmm
 * @param offset - The offset to validate.
 */
export function validOffset(offset: string) {
  const valid = /^([+-])[0-3][0-9][0-6][0-9]$/.test(offset)
  if (!valid) throw new Error(`Invalid offset: ${offset}`)
  return offset
}

/**
 * Returns the offset between two timezones on a given date. The results are
 * ISO8601 compatible offsets like -0800 or +0530.
 *
 * @param dateInput - The date on which to determine the offset.
 * @param tzA - The second timezone to compare determine the offset between.
 * @param tzB - The first timezone to compare determine the offset between.
 */
export function offset(
  utcTime: DateInput,
  tzA = "UTC",
  tzB = "browser"
): string {
  tzB =
    tzB === "browser" ? Intl.DateTimeFormat().resolvedOptions().timeZone : tzB
  const d = date(utcTime)
  const relativeTime = (timeZone: string): Date => {
    const utcParts = new Intl.DateTimeFormat("en-US", {
      year: "numeric",
      month: "2-digit",
      day: "2-digit",
      hour: "2-digit",
      minute: "2-digit",
      second: "2-digit",
      timeZone,
      hourCycle: "h23",
    })
      .formatToParts(d)
      .map(normStr)
    const parts: {
      year?: string
      month?: string
      day?: string
      hour?: string
      minute?: string
      second?: string
    } = {}
    utcParts.forEach((part) => {
      parts[part.type as keyof typeof parts] = part.value
    })
    return new Date(
      `${parts.year}-${parts.month}-${parts.day}T${parts.hour}:${parts.minute}:${parts.second}Z`
    )
  }
  const timeA = relativeTime(tzA)
  const timeB = relativeTime(tzB)
  const timeDiffInMins = (timeB.getTime() - timeA.getTime()) / 1000 / 60
  return minsToOffset(timeDiffInMins)
}

/**
 * Normalizes a given part to NFKC.
 * @param part - The part to normalize.
 */
function normStr(part: Intl.DateTimeFormatPart): Intl.DateTimeFormatPart {
  if (part.type === "literal") {
    part.value = part.value.normalize("NFKC")
  }
  return part
}

/**
 * Converts minutes (300) to an ISO8601 compatible offset (+0400).
 * @param timeDiffInMins - The difference in minutes between two timezones.
 * @returns
 */
function minsToOffset(timeDiffInMins: number): string {
  const hours = String(Math.floor(Math.abs(timeDiffInMins / 60))).padStart(
    2,
    "0"
  )
  const mins = String(Math.abs(timeDiffInMins % 60)).padStart(2, "0")
  const sign = timeDiffInMins < 0 ? "-" : "+"
  return `${sign}${hours}${mins}`
}

/**
 * Converts an offset (-0500) to minutes (-300).
 * @param offset - The offset to convert to minutes.
 */
function offsetToMins(offset: string): number {
  validOffset(offset)
  const [_, sign, hours, mins] = offset.match(/([+-])([0-3][0-9])([0-6][0-9])/)!
  const offsetInMins = Number(hours) * 60 + Number(mins)
  return sign === "+" ? offsetInMins : -offsetInMins
}

/**
 * Apply a given offset to a date, returning a new date with the offset
 * applied by adding or subtracting the given number of minutes.
 * @param dateInput - The date to apply the offset to.
 * @param offset - The offset to apply in the +-HHmm format.
 */
export function applyOffset(dateInput: DateInput, offset = "+0000"): Date {
  const d = date(dateInput)
  const timeDiffInMins = offsetToMins(offset)
  return new Date(d.getTime() + timeDiffInMins * 1000 * 60)
}

/**
 * Inverts the offset and applies it to the given date, returning a new date.
 * @param dateInput - The date to remove the offset from.
 * @param offset - The offset to remove in the +-HHmm format.
 */
export function removeOffset(dateInput: DateInput, offset = "+0000"): Date {
  const positive = offset.slice(0, 1) === "+"
  return applyOffset(
    dateInput,
    offset.replace(positive ? "+" : "-", positive ? "-" : "+")
  )
}

/**
 * Performs a bidirectional search for the nearest date that passes a function.
 * @param target - Performs a search for the nearest passing date.
 * @param search - The search function to use, given a date returns a boolean.
 * @param constraint - The number of iterations to perform before giving up, or logical constraint like "month", or "week".
 *
 */
export function nearestDay(
  inputDate: DateInput,
  search: (date: Date) => boolean,
  constraint: number | "month" | "week" | "year" = 7
): Date | null {
  let increments: number
  let decrements: number
  const d = date(inputDate)
  switch (constraint) {
    case "month":
      decrements = d.getDate()
      increments = monthDays(d) - d.getDate()
      break
    case "week":
      decrements = d.getDay() + 1
      increments = 6 - d.getDay()
      break
    case "year":
      const total = yearDays(d)
      const day = dayOfYear(d)
      decrements = day
      increments = total - day
      break
    default:
      increments = decrements = constraint
  }

  for (let i = 0; i <= increments || i < decrements; i++) {
    if (i <= increments) {
      const next = addDay(d, i)
      if (search(next)) return next
    }
    if (i && i <= decrements) {
      const prev = addDay(d, -i)
      if (search(prev)) return prev
    }
  }
  return null
}
