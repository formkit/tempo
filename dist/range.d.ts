import { FormatToken } from './types.js';

/**
 * Returns an array of options for a given token in a given locale.
 * @param token - Get the full range of options for a given token
 * @param locale - The locale to fetch the options for.
 */
declare function range(token: FormatToken, locale?: string, genitive?: boolean): string[];

export { range };
