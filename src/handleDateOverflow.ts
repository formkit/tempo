import { date } from "./date"
import { monthDays } from "./monthDays"
import type { MaybeDateInput } from "./types"

/**
 * Handles date overflow when changing month or year.
 * @param [inputDate] - A string, Date object or null for the current time
 * @param action - The action that changes the month/year
 * @param [dateOverflow] - Whether to allow the date to overflow into another month.
 * @returns A new Date object with the month/year change applied.
 */
export function handleOverflow(
  inputDate: MaybeDateInput | undefined,
  action: (d: Date) => void,
  dateOverflow = false
): Date {
  const d = date(inputDate)
  const dayOfMonth = d.getDate()
  // If overflowing is disallowed, set the date back to the first of the month
  if (!dateOverflow) d.setDate(1)

  action(d)
  // If overflowing is disallowed, we need to set the date back to the proper
  // day or the last day of the month.
  if (!dateOverflow) {
    const daysInMonth = monthDays(d)
    d.setDate(daysInMonth < dayOfMonth ? daysInMonth : dayOfMonth)
  }
  return d
}
