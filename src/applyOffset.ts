import { date } from "./date"
import { TimezoneToken, fixedLengthByOffset, offsetToMins } from "./common"
import type { DateInput } from "./types"

/**
 * Apply a given offset to a date, returning a new date with the offset
 * applied by adding or subtracting the given number of minutes.
 * @param dateInput - The date to apply the offset to.
 * @param offset - The offset to apply in the +-HHmm or +-HH:mm format.
 */
export function applyOffset(dateInput: DateInput, offset = "+00:00"): Date {
  const d = date(dateInput)
  const token = ((): TimezoneToken => {
    switch (fixedLengthByOffset(offset)) {
      case 5:
        return "ZZ"
      case 6:
        return "Z"
    }
  })()
  const timeDiffInMins = offsetToMins(offset, token)
  return new Date(d.getTime() + timeDiffInMins * 1000 * 60)
}
