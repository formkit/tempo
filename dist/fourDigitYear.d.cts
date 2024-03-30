/**
 * Converts a 2 digit year into a 4 digit year. This function assumes years 20
 * years into the future belong to the current century, and the past 80 are in
 * the past.
 *
 * @param value - 2 digits in string format
 */
declare function fourDigitYear(value: string): number;

export { fourDigitYear };
