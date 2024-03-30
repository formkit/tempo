import { DateInput } from './types.js';

/**
 * Are the given dates equal?
 *
 * @param dateLeft - The first date to compare
 * @param dateRight - The second date to compare
 *
 * @returns The dates are equal.
 */
declare function isEqual(dateLeft: DateInput, dateRight: DateInput): boolean;

export { isEqual };
