import { DateInput } from './types.js';

/**
 * Gets the what day of the year a given date is. For example, August 1st is
 * the 213th day of the year on non- years and 214th on leap years.
 * @param inputDate - The input date.
 */
declare function dayOfYear(inputDate: DateInput): number;

export { dayOfYear };
