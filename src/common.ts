import { date } from "./date"
import { ap } from "./ap"
import type {
  DateInput,
  NamedFormats,
  FormatPattern,
  FormatStyle,
  Part,
  FilledPart,
  Format,
  MaybeDateInput,
  ExtendedPartTypes,
} from "./types"

/**
 * A date to use for determining various spec details.
 */
export const specDate = "1999-03-04T02:05:01.000Z"

/**
 * A cache of Intl tokens and their respective formats.
 */
export const memoParts: Map<string, NamedFormats> = new Map()

/**
 * Clock agnostic time format patterns.
 */
export const clockAgnostic: FormatPattern[] = [
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
  ["ZZ", { timeZoneName: "long" }],
  ["Z", { timeZoneName: "short" }],
]

/**
 * Timezone tokens.
 */
const timeZoneTokens = ["Z", "ZZ"] as const

/**
 * Timezone token type.
 */
export type TimezoneToken = (typeof timeZoneTokens)[number]

/**
 * 24 hour click format patterns.
 */
export const clock24: FormatPattern[] = [
  ["HH", { hour: "2-digit" }],
  ["H", { hour: "numeric" }],
]

/**
 * 12 hour format patterns.
 */
export const clock12: FormatPattern[] = [
  ["hh", { hour: "2-digit" }],
  ["h", { hour: "numeric" }],
  ["a", { dayPeriod: "narrow" }],
  ["A", { dayPeriod: "narrow" }],
]

/**
 * Fractional seconds patterns.
 */
export const fractionalSeconds: FormatPattern[] = [
  ["SSS", { fractionalSecond: "3-digit" }],
]

/**
 * Tokens that have a fixed length.
 */
export const fixedLength = {
  DD: 2,
  HH: 2,
  MM: 2,
  YY: 2,
  YYYY: 4,
  hh: 2,
  mm: 2,
  ss: 2,
}

/**
 * Determines the length of a timezone offset string.
 * Supports offsets with optional seconds component.
 */
export function fixedLengthByOffset(offsetString: string): 9 | 8 | 6 | 5 {
  // starts with [+-]xx:xx:xx (9 chars, Z format with seconds)
  if (/^[+-]\d{2}:\d{2}:\d{2}/.test(offsetString)) {
    return 9
  }

  // starts with [+-]xxxxxx (8 chars, ZZ format with seconds)
  if (/^[+-]\d{6}/.test(offsetString)) {
    return 8
  }

  // starts with [+-]xx:xx (6 chars, Z format)
  if (/^[+-]\d{2}:\d{2}/.test(offsetString)) {
    return 6
  }

  // starts with [+-]xxxx (5 chars, ZZ format)
  if (/^[+-]\d{4}/.test(offsetString)) {
    return 5
  }

  throw new Error("Invalid offset format")
}

/**
 * Tokens that are genitive — in that they can have "possession" when used in
 * a date phrase, "March’s 4th day" (but not in english).
 *
 * When computing a range for these, the range can be either genitive or not.
 * The same is true for parsing dates containing these tokens.
 */
export const genitiveTokens = ["MMMM", "MMM", "dddd", "ddd"]

/**
 * A map of FormatPattern tuples to their respective token.
 */
export const tokens = /* @__PURE__ */ new Map(
  /* @__PURE__ */ [...clockAgnostic, ...clock24, ...clock12, ...fractionalSeconds].map((format) => {
    return [format[0], format]
  })
)

/**
 * A map of locale’s am/pm.
 */
export const dayPeriodMap: Map<string, { am?: string; pm?: string }> = new Map()

/**
 * An array of all available date styles.
 */
export const styles: ReadonlyArray<FormatStyle> = ["full", "long", "medium", "short"]

/**
 * Creates a leading zero string of 2 digits.
 * @param n - A number.
 */
export const two = (n: number) => String(n).padStart(2, "0")
/**
 * Creates a leading zero string of 4 digits.
 * @param n - A number.
 */
export const four = (n: number) => String(n).padStart(2, "0")

/**
 * Normalizes a given part to NFKC.
 * @param part - The part to normalize.
 */
export function normStr(part: Intl.DateTimeFormatPart): Intl.DateTimeFormatPart {
  if (part.type === "literal") {
    part.value = part.value.normalize("NFKC")
  }
  return part
}

/**
 * Returns the parts filled with pertinent values.
 * @param [inputDate] - The date to fill parts for
 * @param parts - An array of parts to fill
 * @param locale - The locale to fill with.
 * @param genitive - Whether to use genitive tokens values or not.
 * @param offset - The explicit offset to fill with (ignores the date’s true offset).
 */
export function fill(
  inputDate: MaybeDateInput,
  parts: Part[],
  locale: string,
  genitive = false,
  offset: string | null = null
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
      return value.replace(/^0/, "") || "0"
    }
    if (["mm", "ss", "MM"].includes(token) && value.length === 1) {
      // Some tokens are supposed to have leading zeros, but Intl doesn't
      // always return them, depending on the locale and the format.
      return `0${value}`
    }
    if (partName === "dayPeriod") {
      const p = ap(d.getUTCHours() < 12 ? "am" : "pm", locale)
      return token === "A" ? p.toUpperCase() : p.toLowerCase()
    }
    if (partName === "fractionalSecond") {
      return String(d.getUTCMilliseconds()).padStart(3, "0")
    }
    if (partName === "timeZoneName") {
      return offset ?? minsToOffset(-1 * d.getTimezoneOffset(), token)
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
 * Creates a map of part names to their respective values.
 * @param [inputDate] - The date to format
 * @param parts - The individual parts the need to be formatted.
 * @param locale - The locale to format the parts with.
 * @param genitive - Whether to use genitive tokens values or not.
 */
function createPartMap(
  inputDate: MaybeDateInput,
  parts: Part[],
  locale: string,
  genitive = false
): Record<ExtendedPartTypes, string> {
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
        requestedParts.reduce(
          (options, part) => {
            if (part.partName === "literal") return options
            // Side effect! Genitive parts get shoved into a separate array.
            if (genitive && genitiveTokens.includes(part.token)) {
              genitiveParts.push(part)
            }
            return Object.assign(options, part.option)
          },
          { timeZone: "UTC" } as Intl.DateTimeFormatOptions
        )
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
              timeZone: "UTC",
            })
              .formatToParts(d)
              .map(normStr)
            break
          case "MMM":
            formattedParts = new Intl.DateTimeFormat(preciseLocale, {
              dateStyle: "medium",
              timeZone: "UTC",
            })
              .formatToParts(d)
              .map(normStr)
            break
        }
        const genitiveFormattedPart = formattedParts.find((p) => p.type === part.partName)
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
    map[part.type as ExtendedPartTypes] = part.value
    return map
  }, {} as Record<ExtendedPartTypes, string>)
}

/**
 * Converts total seconds to an ISO8601 compatible offset (+04:00 or +0400).
 * Only includes seconds in output if they are non-zero.
 * @param totalSecs - The total offset in seconds (can be negative).
 * @param token - "Z" for +HH:mm[:ss] or "ZZ" for +HHmm[ss]
 */
export function secsToOffset(totalSecs: number, token: string = "Z"): string {
  const sign = totalSecs < 0 ? "-" : "+"
  const absSecs = Math.abs(totalSecs)
  const hours = String(Math.floor(absSecs / 3600)).padStart(2, "0")
  const mins = String(Math.floor((absSecs % 3600) / 60)).padStart(2, "0")
  const secs = Math.round(absSecs % 60)

  if (token === "ZZ") {
    return secs === 0
      ? `${sign}${hours}${mins}`
      : `${sign}${hours}${mins}${String(secs).padStart(2, "0")}`
  }
  return secs === 0
    ? `${sign}${hours}:${mins}`
    : `${sign}${hours}:${mins}:${String(secs).padStart(2, "0")}`
}

/**
 * Converts minutes (300) to an ISO8601 compatible offset (+0400 or +04:00).
 * @param timeDiffInMins - The difference in minutes between two timezones.
 * @returns
 */
export function minsToOffset(timeDiffInMins: number, token: string = "Z"): string {
  return secsToOffset(timeDiffInMins * 60, token)
}

/**
 * Converts an offset (-05:32:11 or -053211) to total seconds.
 * Supports offsets with optional seconds component.
 * @param offset - The offset to convert to seconds.
 * @param token - The timezone token format.
 */
export function offsetToSecs(offset: string, token: TimezoneToken): number {
  validOffset(offset, token)
  const match = offset.match(/([+-])([0-3][0-9]):?([0-5][0-9])(?::?([0-5][0-9]))?/)!
  const [_, sign, hours, mins, secs = "0"] = match
  const totalSecs = Number(hours) * 3600 + Number(mins) * 60 + Number(secs)
  return sign === "+" ? totalSecs : -totalSecs
}

/**
 * Converts an offset (-0500) to minutes (-300).
 * @param offset - The offset to convert to minutes.
 * @param token - The timezone token format.
 */
export function offsetToMins(offset: string, token: TimezoneToken): number {
  return Math.round(offsetToSecs(offset, token) / 60)
}

/**
 * Validates that an offset is valid according to the format:
 * [+-]HH:mm or [+-]HH:mm:ss (Z token)
 * [+-]HHmm or [+-]HHmmss (ZZ token)
 * @param offset - The offset to validate.
 * @param token - The timezone token format.
 */
export function validOffset(offset: string, token: TimezoneToken = "Z") {
  const valid = ((token: TimezoneToken): boolean => {
    switch (token) {
      case "Z":
        return /^([+-])[0-3][0-9]:[0-5][0-9](?::[0-5][0-9])?$/.test(offset)
      case "ZZ":
        return /^([+-])[0-3][0-9][0-5][0-9](?:[0-5][0-9])?$/.test(offset)
    }
  })(token)

  if (!valid) throw new Error(`Invalid offset: ${offset}`)
  return offset
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
    .concat(fractionalSeconds)
    .sort((a, b) => (a[0].length > b[0].length ? 1 : -1))
    .reduce((target, part) => {
      return target.replace(part[0], `\\${part[0]}`)
    }, str)
}

/**
 * Checks if a given part should have a numeric value.
 * @param part - A part to check
 */
export function isNumeric(part: Part) {
  return ["numeric", "2-digit"].includes(part.partValue)
}

/**
 * Validates that an array of Parts can be parsed.
 * @param parts - Parts to validate for parsing ability.
 */
export function validate(parts: Part[]): Part[] | never {
  let lastPart: Part | undefined = undefined
  for (const part of parts) {
    if (part.partName === "literal" && !isNaN(parseFloat(part.partValue))) {
      throw new Error(`Numbers in format (${part.partValue}).`)
    }
    if (lastPart && lastPart.partName !== "literal" && part.partName !== "literal") {
      if (
        !(lastPart.token in fixedLength) &&
        !(part.token in fixedLength) &&
        !(isNumeric(lastPart) && part.token.toLowerCase() === "a") &&
        lastPart.token !== "SSS" // SSS can be followed by anything (greedy digit consumer)
      ) {
        throw new Error(`Illegal adjacent tokens (${lastPart.token}, ${part.token})`)
      }
    }
    lastPart = part
  }
  return parts
}

/**
 * Returns the timezone token format from a given format.
 * @param format - The format to check.
 * @returns The timezone token format ("Z" or "ZZ").
 */
export function getOffsetFormat(format: Format): TimezoneToken {
  if (typeof format === "string") {
    return format.includes("ZZ") ? "ZZ" : "Z"
  }
  return "time" in format && format.time === "full" ? "Z" : "ZZ"
}
