import { DateInput } from './types.js';

/**
 * Returns a new date object 1/n hours after the original one.
 * @param inputDate - A date to increment by 1 day.
 */
declare function addHour(inputDate: DateInput, count?: number): Date;

export { addHour };
