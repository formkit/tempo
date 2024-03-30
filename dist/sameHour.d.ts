import { DateInput } from './types.js';

/**
 * Checks if two date objects refer to the same time hour. Ignores date.
 * @param inputDateA - First date to compare
 * @param inputDateB - Second date to compare
 */
declare function sameHour(inputDateA: DateInput, inputDateB: DateInput): boolean;

export { sameHour };
