import { DateInput } from './types.js';

/**
 * Returns a new date object 1/n months after the original one. Keep in mind if you
 * start with a date late in a given month you could get a date after the next
 * month.
 * @param inputDate - A date to increment by 1 or more months.
 * @param count - The quantity to add.
 * @param dateOverflow - Whether or not to allow the date to overflow to another month if the inputDate’s month is out of range of the new month.
 */
declare function addMonth(inputDate: DateInput, count?: number, dateOverflow?: boolean): Date;

export { addMonth };
