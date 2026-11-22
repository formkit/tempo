import { iso8601, iso8601Match } from "./iso8601"
import type { MaybeDateInput } from "./types"

/**
 * Rebuilds any ISO 8601 string that iso8601() accepts into the one canonical
 * shape (YYYY-MM-DDTHH:mm:ss[.SSS][Z|±HH:mm]) the native Date parser reliably
 * understands. Short dates like 2012-01-01 become 2012-01-01T00:00:00 (local)
 * to prevent automatic coercion to UTC. Offsets with seconds (+05:32:11) are
 * applied manually since Date cannot parse them.
 * @param date - A string representation of the date.
 */
function fromISO(date: string): Date {
  const m = date.match(iso8601Match)!
  const [, Y, M, D = "01", H = "00", mi = "00", s = "00", frac = ""] = m
  const tz = m[8]
  let str = `${Y}-${M}-${D}T${H}:${mi}:${s}${frac}`
  let offsetSeconds = 0
  if (tz === "Z") {
    str += "Z"
  } else if (tz) {
    const [, sign, oh, om, os = "00"] = tz.match(
      /^([+-])(\d{2}):?(\d{2})(?::?(\d{2}))?$/
    )!
    if (Number(os)) {
      offsetSeconds =
        (sign === "-" ? -1 : 1) * (Number(oh) * 3600 + Number(om) * 60 + Number(os))
      str += "Z"
    } else {
      str += `${sign}${oh}:${om}`
    }
  }
  const d = new Date(str)
  if (offsetSeconds) d.setTime(d.getTime() - offsetSeconds * 1000)
  return d
}

/**
 * A date to parse.
 * @param date - A Date object or an ISO 8601 date.
 */
export function date(date?: MaybeDateInput): Date {
  if (!date) {
    date = new Date()
  }
  if (date instanceof Date) {
    return new Date(date)
  }
  date = date.trim()
  if (iso8601(date)) {
    return fromISO(date)
  }
  throw new Error(`Non ISO 8601 compliant date (${date}).`)
}
