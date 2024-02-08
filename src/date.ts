import { iso8601, iso8601Match } from "./iso8601"
import type { DateInput } from "./types"

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
