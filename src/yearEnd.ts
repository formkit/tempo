import { date } from "./date"
import type { DateInput } from "./types"

/**
 * Returns a Date object for the with the input date set to the end of the current year.
 * @param inputDate - A string or Date object
 */
export function yearEnd(inputDate: DateInput): Date {
  const d = date(inputDate);

  d.setMonth(11);
  d.setDate(31);
  d.setHours(23, 59, 59, 999);

  return d;
}
