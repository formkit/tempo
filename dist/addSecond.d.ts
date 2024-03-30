import { DateInput } from './types.js';

/**
 * Returns a new date object 1/n seconds after the original one.
 * @param inputDate - A date to increment by 1 day.
 */
declare function addSecond(inputDate: DateInput, count?: number): Date;

export { addSecond };
