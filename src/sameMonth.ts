import { date } from "./date"
import type { DateInput } from "./types"

/**
 * Checks if two date objects refer to the same time minutes. Ignores date.
 * @param inputDateA - First date to compare
 * @param inputDateB - Second date to compare
 */
export function sameMonth(inputDateA: DateInput, inputDateB: DateInput) {
  const a = date(inputDateA)
  const b = date(inputDateB)
  return a.getMonth() === b.getMonth()
}
