import { DateInput } from './types.js';

/**
 * Returns a Date object for the with the input date set to the last day of
 * the current month. Does not change the time.
 * @param inputDate - A string or Date object
 */
declare function monthEnd(inputDate: DateInput): Date;

export { monthEnd };
