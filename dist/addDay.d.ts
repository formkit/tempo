import { DateInput } from './types.js';

/**
 * Returns a new date object 1/n days after the original one.
 * @param inputDate - A date to increment by 1 day.
 */
declare function addDay(inputDate: DateInput, count?: number): Date;

export { addDay };
