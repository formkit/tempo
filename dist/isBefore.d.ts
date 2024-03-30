import { DateInput } from './types.js';

/**
 * Is the first date before the second one?
 *
 * @param inputDate - The date that should be before the other one to return true
 * @param dateToCompare - The date to compare with
 *
 * @returns The first date is before the second date.
 */
declare function isBefore(inputDate: DateInput, dateToCompare: DateInput): boolean;

export { isBefore };
