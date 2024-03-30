import { DateInput } from './types.js';

/**
 * Checks if two date objects refer to the same time minutes. Ignores date.
 * @param inputDateA - First date to compare
 * @param inputDateB - Second date to compare
 */
declare function sameMinute(inputDateA: DateInput, inputDateB: DateInput): boolean;

export { sameMinute };
