import { applyOffset } from "./applyOffset"
import type { DateInput } from "./types"

/**
 * Inverts the offset and applies it to the given date, returning a new date.
 * @param dateInput - The date to remove the offset from.
 * @param offset - The offset to remove in the +-HHmm or +-HH:mm format.
 */
export function removeOffset(dateInput: DateInput, offset = "+00:00"): Date {
  const positive = offset.slice(0, 1) === "+"
  return applyOffset(
    dateInput,
    offset.replace(positive ? "+" : "-", positive ? "-" : "+")
  )
}
