import { date } from "./date"
import type { DateInput } from "./types"

/**
 * Checks if two date objects refer to the same year.
 * @param inputDateA - First date to compare
 * @param inputDateB - Second date to compare
 */
export function sameYear(inputDateA: DateInput, inputDateB: DateInput) {
  const a = date(inputDateA)
  const b = date(inputDateB)
  return a.getFullYear() === b.getFullYear()
}
