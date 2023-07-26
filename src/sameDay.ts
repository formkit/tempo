import { date } from "./date"

/**
 * Checks if two date objects refer to the same date. Ignores time.
 * @param inputDateA - First date to compare
 * @param inputDateB - Second date to compare
 */
export function sameDay(inputDateA: DateInput, inputDateB: DateInput) {
  const a = date(inputDateA)
  const b = date(inputDateB)
  return (
    a.getDate() === b.getDate() &&
    a.getMonth() === b.getMonth() &&
    a.getFullYear() === b.getFullYear()
  )
}
