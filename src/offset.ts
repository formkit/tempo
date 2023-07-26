import { date } from "./date"
import { normStr, minsToOffset } from "./common"

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
