/**
 * Converts a 2 digit year into a 4 digit year. This function assumes years 20
 * years into the future belong to the current century, and the past 80 are in
 * the past.
 *
 * @param value - 2 digits in string format
 */
export function fourDigitYear(value: string): number {
  const y = new Date().getFullYear()
  const currentYear = y % 100
  const century = Math.floor(y / 100)
  const parsedYear = Number(value)
  return (century + (parsedYear > currentYear + 20 ? -1 : 0)) * 100 + parsedYear
}
