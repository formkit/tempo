import { DateInput } from './types.cjs';

/**
 * Checks if two date objects refer to the same year.
 * @param inputDateA - First date to compare
 * @param inputDateB - Second date to compare
 */
declare function sameYear(inputDateA: DateInput, inputDateB: DateInput): boolean;

export { sameYear };
