import { DateInput } from './types.js';

/**
 * @name isAfter
 * @category Common Helpers
 * @summary Is the first date after the second one?
 *
 * @description
 * Is the first date after the second one?
 *
 * @param inputDate - The date that should be after the other one to return true
 * @param dateToCompare - The date to compare with
 *
 * @returns The first date is after the second date.
 */
declare function isAfter(inputDate: DateInput, dateToCompare: DateInput): boolean;

export { isAfter };
