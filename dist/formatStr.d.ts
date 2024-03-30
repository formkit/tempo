import { Format, Part } from './types.js';

/**
 * Return the string format for a given format. For example:
 * ```js
 * formatStr({ date: 'long' }, 'en') // dddd, MMMM D, YYYY
 * ```
 * @param format - A format string or object.
 * @param locale - A locale or en by default.
 */
declare function formatStr(format: Format, locale?: string, escapeLiterals?: boolean, filterParts?: (part: Part) => boolean): string;

export { formatStr };
