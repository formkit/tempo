import { ParseOptions, Format, Part, FilledPart } from './types.js';

declare function parse(options: ParseOptions): Date | never;
declare function parse(dateStr: string, format?: Format, locale?: string): Date | never;
/**
 * Given a string date and corresponding format parts, fill the parts with the
 * data from the string.
 * @param dateStr - A string to parse.
 * @param formatParts - The expected parts of the given string.
 */
declare function parseParts(dateStr: string, formatParts: Part[]): FilledPart[];

export { parse, parseParts };
