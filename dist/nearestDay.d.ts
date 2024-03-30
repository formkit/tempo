import { DateInput } from './types.js';

/**
 * Performs a bidirectional search for the nearest date that passes a function.
 * @param target - Performs a search for the nearest passing date.
 * @param search - The search function to use, given a date returns a boolean.
 * @param constraint - The number of iterations to perform before giving up, or logical constraint like "month", or "week".
 *
 */
declare function nearestDay(inputDate: DateInput, search: (date: Date) => boolean, constraint?: number | "month" | "week" | "year"): Date | null;

export { nearestDay };
