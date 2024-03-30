import { NamedFormats, FormatPattern, FormatStyle, DateInput, Part, FilledPart } from './types.js';

/**
 * A date to use for determining various spec details.
 */
declare const specDate = "1999-03-04T02:05:01.000Z";
/**
 * A cache of Intl tokens and their respective formats.
 */
declare const memoParts: Map<string, NamedFormats>;
/**
 * Clock agnostic time format patterns.
 */
declare const clockAgnostic: FormatPattern[];
/**
 * 24 hour click format patterns.
 */
declare const clock24: FormatPattern[];
/**
 * 12 hour format patterns.
 */
declare const clock12: FormatPattern[];
/**
 * Tokens that have a fixed length.
 */
declare const fixedLength: {
    DD: number;
    HH: number;
    MM: number;
    YY: number;
    YYYY: number;
    hh: number;
    mm: number;
    ss: number;
};
/**
 * token Z can have variable length depending on the actual value, so it's
 */
declare function fixedLengthByOffset(offsetString: string): number;
/**
 * Tokens that are genitive — in that they can have "possession" when used in
 * a date phrase, "March’s 4th day" (but not in english).
 *
 * When computing a range for these, the range can be either genitive or not.
 * The same is true for parsing dates containing these tokens.
 */
declare const genitiveTokens: string[];
/**
 * A map of FormatPattern tuples to their respective token.
 */
declare const tokens: Map<string, FormatPattern>;
/**
 * A map of locale’s am/pm.
 */
declare const dayPeriodMap: Map<string, {
    am?: string;
    pm?: string;
}>;
/**
 * An array of all available date styles.
 */
declare const styles: ReadonlyArray<FormatStyle>;
/**
 * Creates a leading zero string of 2 digits.
 * @param n - A number.
 */
declare const two: (n: number) => string;
/**
 * Creates a leading zero string of 4 digits.
 * @param n - A number.
 */
declare const four: (n: number) => string;
/**
 * Normalizes a given part to NFKC.
 * @param part - The part to normalize.
 */
declare function normStr(part: Intl.DateTimeFormatPart): Intl.DateTimeFormatPart;
/**
 * Returns the parts filled with pertinent values.
 * @param inputDate - The date to fill parts for
 * @param parts - An array of parts to fill
 * @param locale - The locale to fill with.
 * @param genitive - Whether to use genitive tokens values or not.
 * @param offset - The explicit offset to fill with (ignores the date’s true offset).
 */
declare function fill(inputDate: DateInput, parts: Part[], locale: string, genitive?: boolean, offset?: string | null): FilledPart[];
/**
 * Converts minutes (300) to an ISO8601 compatible offset (+0400).
 * @param timeDiffInMins - The difference in minutes between two timezones.
 * @returns
 */
declare function minsToOffset(timeDiffInMins: number): string;
/**
 * Converts an offset (-0500) to minutes (-300).
 * @param offset - The offset to convert to minutes.
 */
declare function offsetToMins(offset: string): number;
/**
 * Validates that an offset is valid according to the format:
 * [+-]HHmm or [+-]HH:mm
 * @param offset - The offset to validate.
 */
declare function validOffset(offset: string): string;
/**
 * Given a string of tokens, escape any characters that are tokens.
 * @param str - The string to escape tokens in.
 * @returns The escaped string.
 */
declare function escapeTokens(str: string): string;
/**
 * Checks if a given part should have a numeric value.
 * @param part - A part to check
 */
declare function isNumeric(part: Part): boolean;
/**
 * Validates that an array of Parts can be parsed.
 * @param parts - Parts to validate for parsing ability.
 */
declare function validate(parts: Part[]): Part[] | never;

export { clock12, clock24, clockAgnostic, dayPeriodMap, escapeTokens, fill, fixedLength, fixedLengthByOffset, four, genitiveTokens, isNumeric, memoParts, minsToOffset, normStr, offsetToMins, specDate, styles, tokens, two, validOffset, validate };
