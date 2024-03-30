import { DateInput } from './types.js';

/**
 * Apply a given offset to a date, returning a new date with the offset
 * applied by adding or subtracting the given number of minutes.
 * @param dateInput - The date to apply the offset to.
 * @param offset - The offset to apply in the +-HHmm format.
 */
declare function applyOffset(dateInput: DateInput, offset?: string): Date;

export { applyOffset };
