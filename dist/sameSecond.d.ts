import { DateInput } from './types.js';

/**
 * Checks if two date objects refer to the same time seconds. Ignores date.
 * @param inputDateA - First date to compare
 * @param inputDateB - Second date to compare
 */
declare function sameSecond(inputDateA: DateInput, inputDateB: DateInput): boolean;

export { sameSecond };
