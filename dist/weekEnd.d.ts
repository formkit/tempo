import { DateInput } from './types.js';

/**
 * Returns a Date object for the last day at the last second of the given week.
 * Defaults to Sunday as the first day of the week:
 * 0 = Sunday ... 6 = Saturday
 * @param inputDate - Gets the last day of the week
 * @param startOfWeekDay - The first day of the week
 */
declare function weekEnd(inputDate: DateInput, startOfWeekDay?: number): Date;

export { weekEnd };
