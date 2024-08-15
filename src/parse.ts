import { date } from "./date"
import { validate, styles, fixedLength, four, two, validOffset, fixedLengthByOffset } from "./common"
import { formatStr } from "./formatStr"
import { fourDigitYear } from "./fourDigitYear"
import { ap } from "./ap"
import { range } from "./range"
import { monthDays } from "./monthDays"
import { parts } from "./parts"
import type {
  ParseOptions,
  Format,
  Part,
  FormatStyle,
  FilledPart,
  FormatToken,
} from "./types"

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
  locale = "device"
): Date | never {
  let partFilter: (part: Part) => boolean = () => true
  let dateStr: string
  let dateOverflow = "backward"
  if (typeof dateStrOrOptions === "object") {
    ;({
      date: dateStr,
      format = "ISO8601",
      locale = "device",
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
      parsed.set("YYYY", fourDigitYear(part.value))
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
      } else if (t === "Z" || t === "ZZ") {
        offset = validOffset(part.value, t)
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
    } else if (current.partName === "timeZoneName") {
      len = fixedLengthByOffset(dateStr.substring(pos))
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
