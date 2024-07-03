import { date } from "./date"
import type { DateInput, MaybeDateInput } from "./types"

/**
 * Checks if two date objects refer to the same time seconds. Ignores date.
 * @param inputDateA - First date to compare
 * @param [inputDateB] - Second date to compare or the current time if nothing given
 */
export function sameSecond(inputDateA: DateInput, inputDateB?: MaybeDateInput): boolean
/**
 * Checks if two date objects refer to the same time seconds. Ignores date.
 * @param [inputDateA] - First date to compare or the current time if null given
 * @param inputDateB - Second date to compare
 */
export function sameSecond(inputDateA: DateInput, inputDateB: DateInput): boolean
export function sameSecond(inputDateA: DateInput, inputDateB?: MaybeDateInput): boolean {
  const a = date(inputDateA)
  const b = date(inputDateB)
  return a.getSeconds() === b.getSeconds()
}
