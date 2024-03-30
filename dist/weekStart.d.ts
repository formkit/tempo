import { DateInput } from './types.js';

/**
 * Returns a Date object for start of the given week. Defaults to Sunday as the
 * first day of the week:
 * 0 = Sunday ... 6 = Saturday
 * @param inputDate - A string or Date object
 * @param startOfWeekDay - Determines which day of the week is the first
 */
declare function weekStart(inputDate: DateInput, startOfWeekDay?: number): Date;

export { weekStart };
