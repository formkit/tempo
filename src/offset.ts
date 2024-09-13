import { date } from "./date"
import { normStr, minsToOffset, TimezoneToken } from "./common"
import { deviceTZ } from "./deviceTZ"
import type { DateInput, MaybeDateInput } from "./types"

/**
 * Converts a date object from one timezone to that same time in UTC. This is
 * only for internal use.
 * @param d - A Date object
 * @param timeZone - A timezone string
 */
function relativeTime(d: Date, timeZone: string): Date {
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
    millisecond?: string
  } = {}

  utcParts.forEach((part) => {
    parts[part.type as keyof typeof parts] = part.value
  })

  // Include milliseconds manually
  parts.millisecond = d.getMilliseconds().toString().padStart(3, "0")

  return new Date(
    `${parts.year}-${parts.month}-${parts.day}T${parts.hour}:${parts.minute}:${parts.second}.${parts.millisecond}Z`
  )
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
  const timeDiffInMins = Math.round((timeB.getTime() - timeA.getTime()) / 1000 / 60)
  return minsToOffset(timeDiffInMins, timeZoneToken)
}
