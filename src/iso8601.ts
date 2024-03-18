/**
 * Matches a given date with ISO 8601 compliance. Allows the "T" to be missing
 * and only requires year and month, other params are required with increasing
 * specificity.
 */
export const iso8601Match =
  /^([0-9]{4})-([0-1][0-9])(?:-([0-3][0-9]))?(?:[T ]?([0-2][0-9])(?::([0-5][0-9]))?(?::([0-5][0-9]))?)?(?:\.[0-9]+)?(Z|(?:\+|\-)[0-9]{2}:?[0-9]{2})?$/

/**
 * True when the date string is valid ISO 8601.
 * @param date - A date string.
 */
export function iso8601(date: string): boolean {
  const matches = date.match(iso8601Match)
  if (matches) {
    const month = Number(matches[2])
    if (month < 1 || month > 12) return false

    if (typeof matches[3] !== undefined) {
      const date = Number(matches[3])
      if (date < 1 || date > 31) return false
    }
    if (typeof matches[4] !== undefined) {
      const hours = Number(matches[4])
      if (hours < 0 || hours > 23) return false
    }

    return true
  }
  return false
}
