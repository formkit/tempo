import { date } from "./date"
import { TimezoneToken, fixedLengthByOffset, offsetToSecs } from "./common"
import type { MaybeDateInput } from "./types"

/**
 * Apply a given offset to a date, returning a new date with the offset
 * applied by adding or subtracting the given number of seconds.
 * @param [dateInput] - The date to apply the offset to. (default: current time)
 * @param [offset] - The offset to apply in the +-HHmm, +-HH:mm, +-HHmmss, or +-HH:mm:ss format.
 */
export function applyOffset(dateInput?: MaybeDateInput, offset = "+00:00"): Date {
  const d = date(dateInput)
  const len = fixedLengthByOffset(offset)
  // 5 or 8 chars = no colons (ZZ format), 6 or 9 chars = with colons (Z format)
  const token: TimezoneToken = len === 5 || len === 8 ? "ZZ" : "Z"
  const timeDiffInSecs = offsetToSecs(offset, token)
  return new Date(d.getTime() + timeDiffInSecs * 1000)
}
