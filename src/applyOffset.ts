import { date } from "./date"
import { offsetToMins } from "./common"
import type { DateInput } from "./types"

/**
 * Apply a given offset to a date, returning a new date with the offset
 * applied by adding or subtracting the given number of minutes.
 * @param dateInput - The date to apply the offset to.
 * @param offset - The offset to apply in the +-HHmm format.
 */
export function applyOffset(dateInput: DateInput, offset = "+0000"): Date {
  const d = date(dateInput)
  const timeDiffInMins = offsetToMins(offset)
  return new Date(d.getTime() + timeDiffInMins * 1000 * 60)
}
