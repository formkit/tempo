import { date } from "./date"
import type { DateInput } from "./types"

/**
 * Checks if two date objects refer to the same time seconds. Ignores date.
 * @param inputDateA - First date to compare
 * @param inputDateB - Second date to compare
 */
export function sameSecond(inputDateA: DateInput, inputDateB: DateInput) {
  const a = date(inputDateA)
  const b = date(inputDateB)
  return a.getSeconds() === b.getSeconds()
}
