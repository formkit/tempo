import { Format, FormatToken } from "./types"
import { validate } from "./common"
import { formatStr } from "./formatStr"
import { parts } from "./parts"

interface DurationOptions {
  format?: Format // supported and custom formats
  parse?: boolean // whether to parse or format
  locale?: string // locale for formatting and parsing
}

export function formatOrParseDuration(
  input: number | string,
  options: DurationOptions = {}
): string | number {
  const { format = "hh:mm:ss", parse = false, locale = "en" } = options

  // Determine whether to parse or format based on the input type and options.
  if (parse && typeof input === "string") {
    return parseDuration(input, format, locale)
  }

  if (!parse && typeof input === "number") {
    return formatDuration(input, format, locale)
  }

  throw new Error("Invalid input or options.")
}

function formatDuration(
  durationInMs: number,
  format: Format,
  locale: string
): string {
  const parts: Partial<Record<FormatToken, number>> = {
    // Calculate days from milliseconds.
    DD: Math.floor(durationInMs / 86400000),
    // Calculate hours from remaining milliseconds.
    hh: Math.floor((durationInMs % 86400000) / 3600000),
    // Calculate minutes from remaining milliseconds.
    mm: Math.floor((durationInMs % 3600000) / 60000),
    // Calculate seconds from remaining milliseconds.
    ss: Math.floor((durationInMs % 60000) / 1000),
    // Calculate milliseconds.
    SSS: durationInMs % 1000,
  }

  return formatStr(format, locale).replace(/DD|hh|mm|ss|SSS/g, (match) => {
    return String(parts[match as FormatToken]).padStart(
      match === "SSS" ? 3 : 2,
      "0"
    )
  })
}

function parseDuration(
  durationString: string,
  format: Format,
  locale: string
): number {
  const formatParts = validate(parts(format, locale))
  const regexPattern = formatParts
    .map((part) => {
      if (part.partName === "literal") {
         // Escape special regex characters
        return part.partValue.replace(/[.*+?^${}()|[\]\\]/g, "\\$&")
      }
      if (part.token === "SSS") {
        return "(\\d{1,3})"
      }
      return "(\\d{1,2})"
    })
    .join("")

  const regex = new RegExp(`^${regexPattern}$`)
  const matches = durationString.match(regex)

  if (!matches) {
    throw new Error("Invalid duration string.")
  }

  const partsValues = matches.slice(1).map(Number)

  let durationInMs = 0

  let valueIndex = 0
  formatParts.forEach((part) => {
    if (part.partName === "literal") {
      return
    }
    const value = partsValues[valueIndex++]
    switch (part.token) {
      case "DD":
        durationInMs += value * 86400000
        break
      case "hh":
        durationInMs += value * 3600000
        break
      case "mm":
        durationInMs += value * 60000
        break
      case "ss":
        durationInMs += value * 1000
        break
      case "SSS":
        durationInMs += value
        break
      default:
        throw new Error(`Unknown format token: ${part.token}`)
    }
  })

  return durationInMs
}
