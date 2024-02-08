import {
  styles,
  normStr,
  tokens,
  memoParts,
  clockAgnostic,
  clock24,
  specDate,
  clock12,
} from "./common"
import type {
  ParseOptions,
  Format,
  Part,
  FormatStyle,
  FormatStyleObj,
  FormatPattern,
  NamedFormats,
  NamedFormatOption,
} from "./types"
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
