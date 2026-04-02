import { date } from "./date"
import { secsToOffset, TimezoneToken } from "./common"
import { deviceTZ } from "./deviceTZ"
import type { MaybeDateInput } from "./types"

/**
 * Converts a date object from one timezone to that same time in UTC. This is
 * only for internal use.
 * @param d - A Date object
 * @param timeZone - A timezone string
 */
function relativeTime(d: Date, timeZone: string): Date {
  const utcParts = new Intl.DateTimeFormat("en-US", {
    era: "short",
    year: "numeric",
    month: "numeric",
    day: "numeric",
    hour: "numeric",
    minute: "numeric",
    second: "numeric",
    timeZone,
    hourCycle: "h23",
  }).formatToParts(d)
  const p: Record<string, string> = {}
  utcParts.forEach((part) => {
    if (part.type !== "literal") p[part.type] = part.value
  })
  // BC year N in Intl = ISO year (1 - N), e.g. 1 BC = year 0, 2 BC = year -1
  const year = p.era === "BC" ? 1 - Number(p.year) : Number(p.year)
  const result = new Date(Date.UTC(0, 0, 1, Number(p.hour), Number(p.minute), Number(p.second)))
  // setUTCFullYear with year, month, day together avoids Date.UTC's 0-99 year mapping
  // and ensures leap day validation uses the correct year
  result.setUTCFullYear(year, Number(p.month) - 1, Number(p.day))
  return result
}

/**
 * Returns the offset between two timezones on a given date. The results are
 * ISO8601 compatible offsets like -0800 or +0530.
 *
 * @param [dateInput] - (default: current time) The date on which to determine the offset
 * @param [tzA] - (default: UTC) The second timezone to compare determine the offset between.
 * @param [tzB] - (default: device) The first timezone to compare determine the offset between.
 */
export function offset(
  utcTime?: MaybeDateInput,
  tzA = "UTC",
  tzB = "device",
  timeZoneToken: TimezoneToken = "Z"
): string {
  tzB = tzB === "device" ? deviceTZ() ?? "utc" : tzB
  const d = date(utcTime)
  const timeA = relativeTime(d, tzA)
  const timeB = relativeTime(d, tzB)
  const timeDiffInSecs = Math.round((timeB.getTime() - timeA.getTime()) / 1000)
  return secsToOffset(timeDiffInSecs, timeZoneToken)
}
