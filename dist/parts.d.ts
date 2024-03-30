import { Format, Part } from './types.js';

/**
 * Given a format string, produce an array of matching "parts", each part
 * contains a regular expression and the corresponding
 * Intl.DateTimeFormatPartTypesRegistry key/value.
 * @param format - A format string like MM/DD/YYYY
 * @param locale - The locale to parse for.
 */
declare function parts(format: Format, locale: string): Part[];

export { parts };
