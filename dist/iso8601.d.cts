/**
 * Matches a given date with ISO 8601 compliance. Allows the "T" to be missing
 * and only requires year and month, other params are required with increasing
 * specificity.
 */
declare const iso8601Match: RegExp;
/**
 * True when the date string is valid ISO 8601.
 * @param date - A date string.
 */
declare function iso8601(date: string): boolean;

export { iso8601, iso8601Match };
