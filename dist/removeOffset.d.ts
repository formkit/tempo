import { DateInput } from './types.js';

/**
 * Inverts the offset and applies it to the given date, returning a new date.
 * @param dateInput - The date to remove the offset from.
 * @param offset - The offset to remove in the +-HHmm format.
 */
declare function removeOffset(dateInput: DateInput, offset?: string): Date;

export { removeOffset };
