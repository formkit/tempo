import { date } from "./date"
import type { DateInput, MaybeDateInput } from "./types"

/**
 * Checks if two date objects refer to the same year.
 * @param inputDateA - First date to compare
 * @param [inputDateB] - Second date to compare or the current time if null given
 */
export function sameYear(inputDateA: DateInput, inputDateB?: MaybeDateInput): boolean
/**
 * Checks if two date objects refer to the same year.
 * @param [inputDateA] - First date to compare or the current time if null given
 * @param inputDateB - Second date to compare
 */
export function sameYear(inputDateA: MaybeDateInput, inputDateB: DateInput): boolean
export function sameYear(
  inputDateA: MaybeDateInput,
  inputDateB?: MaybeDateInput
): boolean {
  const a = date(inputDateA)
  const b = date(inputDateB)
  return a.getFullYear() === b.getFullYear()
}
