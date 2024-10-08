import { applyOffset } from "./applyOffset"
import type { DateInput, MaybeDateInput } from "./types"

/**
 * Inverts the offset and applies it to the given date, returning a new date.
 * @param [dateInput] - The date to remove the offset from. (default: current time)
 * @param [offset] - The offset to remove in the +-HHmm or +-HH:mm format.
 */
export function removeOffset(dateInput?: MaybeDateInput, offset = "+00:00"): Date {
  const positive = offset.slice(0, 1) === "+"
  return applyOffset(
    dateInput,
    offset.replace(positive ? "+" : "-", positive ? "-" : "+")
  )
}
