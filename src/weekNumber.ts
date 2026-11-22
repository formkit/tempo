import { date } from "./date"
import { weekStart } from "./weekStart"
import type { MaybeDateInput } from "./types"

/**
 * Returns the week of the year for a date (1–53). Defaults to ISO 8601 week
 * numbering: weeks start on Monday and week 1 is the week containing
 * January 4th — so a date at the very start or end of a year can belong to
 * a week of the neighbouring year (2024-12-30 is week 1 of 2025).
 *
 * ```js
 * weekNumber("2024-01-10") // 2
 * weekNumber("2024-12-30") // 1 (ISO week 1 of 2025)
 * weekNumber("2024-01-06", 0, 1) // 1 — Sunday weeks, week 1 contains Jan 1
 * ```
 *
 * @param [inputDate] - A string, Date object or nothing for today
 * @param [startOfWeekDay] - The first day of the week: 0 = Sunday … 6 = Saturday (default 1, Monday)
 * @param [firstWeekContainsDate] - The January date (1–7) that is always in week 1 (default 4, ISO 8601)
 */
export function weekNumber(
  inputDate?: MaybeDateInput,
  startOfWeekDay = 1,
  firstWeekContainsDate = 4
): number {
  const d = date(inputDate)
  const firstWeek = (year: number) =>
    weekStart(new Date(year, 0, firstWeekContainsDate), startOfWeekDay)
  const year = d.getFullYear()
  let start = firstWeek(year + 1)
  if (d < start) {
    start = firstWeek(year)
    if (d < start) start = firstWeek(year - 1)
  }
  const thisWeek = weekStart(d, startOfWeekDay)
  // Round whole days so a DST change (23/25h day) can't shift the count.
  const days = Math.round((+thisWeek - +start) / 86400000)
  return Math.floor(days / 7) + 1
}
