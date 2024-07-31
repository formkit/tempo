import { date } from "./date"
import type { DateInput, MaybeDateInput } from "./types"

/**
 * Checks if two date objects refer to the same time minutes. Ignores date.
 * @param inputDateA - First date to compare
 * @param [inputDateB] - Second date to compare or the current time if nothing given
 */
export function sameMinute(inputDateA: DateInput, inputDateB?: MaybeDateInput): boolean
/**
 * Checks if two date objects refer to the same time minutes. Ignores date.
 * @param [inputDateA] - First date to compare or the current time if null given
 * @param inputDateB - Second date to compare
 */
export function sameMinute(inputDateA: MaybeDateInput, inputDateB: DateInput): boolean
export function sameMinute(
  inputDateA: MaybeDateInput,
  inputDateB?: MaybeDateInput
): boolean {
  const a = date(inputDateA)
  const b = date(inputDateB)
  return a.getMinutes() === b.getMinutes()
}
