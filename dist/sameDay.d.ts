import { DateInput } from './types.js';

/**
 * Checks if two date objects refer to the same date. Ignores time.
 * @param inputDateA - First date to compare
 * @param inputDateB - Second date to compare
 */
declare function sameDay(inputDateA: DateInput, inputDateB: DateInput): boolean;

export { sameDay };
