import { date } from "./date"
import { monthDays } from "./monthDays"
import { MaybeDateInput } from "./types"

export function handleOverflow(
  inputDate: MaybeDateInput | undefined,
  action: (d: Date) => void,
  dateOverflow = false
) {
  let d = date(inputDate)
  const dayOfMonth = d.getDate()
  // If overflowing is disallowed, set the date back to the first of the month
  if (!dateOverflow) d.setDate(1)
  // d.setMonth(d.getMonth() + count)

  action(d)
  // If overflowing is disallowed, we need to set the date back to the proper
  // day or the last day of the month.
  if (!dateOverflow) {
    const daysInMonth = monthDays(d)
    d.setDate(daysInMonth < dayOfMonth ? daysInMonth : dayOfMonth)
  }
  return d
}
