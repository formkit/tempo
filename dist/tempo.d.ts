/**
 * The date format used as an input value. Either a date or an ISO8601 string.
 */
type DateInput = Date | string;
/**
 * Format parts with text names use these descriptors:
 */
type NamedFormatOption = "long" | "short" | "narrow";
/**
 * A registry of named format parts. Each type of part has every option.
 */
interface NamedFormats {
    weekday: Record<string, NamedFormatOption>;
    month: Record<string, NamedFormatOption>;
    dayPeriod: Record<string, NamedFormatOption>;
}
/**
 * Internal format for "pieces" of a date form. Each part represents a single
 * logical grouping, like "month", or "seconds".
 */
interface Part {
    /**
     * An object of partName to partValue For example:
     * ```js
     * { hour: '2-digit' }
     * ```
     */
    option: FormatPattern[1];
    /**
     * The name of the part, these must be valid parts of a date format as
     * specified in Intl.DateTimeFormatPartTypes. Valid values are:
     * day, dayPeriod, era, hour, literal, minute, month, second, timeZoneName,
     * weekday, year
     */
    partName: Intl.DateTimeFormatPartTypes;
    /**
     * The value of a given part. For example "2-digit", or "narrow".
     */
    partValue: string;
    /**
     * The string token that represents the regex. For example "YYYY".
     */
    token: string;
    /**
     * A regular expression if the above token.
     */
    pattern: RegExp;
    /**
     * Does this part require a the hour12 clock.
     */
    hour12: boolean;
}
/**
 * A date part with an actual value applied.
 */
type FilledPart = Part & {
    value: string;
};
/**
 * A tuple describing a given formatting token.
 */
type FormatPattern = [
    pattern: FormatToken | string,
    option: Partial<Record<Intl.DateTimeFormatPartTypes, string>>,
    exp?: RegExp
];
/**
 * Possible options for a format style.
 */
type FormatStyle = "full" | "long" | "medium" | "short";
/**
 * Possible objects for the dateStyle and timeStyle.
 */
type FormatStyleObj = {
    date: FormatStyle;
    time: FormatStyle;
} | {
    date: FormatStyle;
} | {
    time: FormatStyle;
};
type Format = FormatStyle | FormatStyleObj | string;
/**
 * A union of all available formatting tokens.
 */
type FormatToken = "YYYY" | "YY" | "MMMM" | "MMM" | "MM" | "M" | "DD" | "D" | "dddd" | "ddd" | "d" | "mm" | "m" | "ss" | "s" | "HH" | "H" | "hh" | "h" | "a" | "A" | "ZZ" | "Z";
interface ParseOptions {
    /**
     * A string representing a date.
     */
    date: string;
    /**
     * The format that should be used to parse the date. This is a string composed
     * of tokens.
     */
    format: Format;
    /**
     * The locale used to parse the date.
     */
    locale: string;
    /**
     * A function that can be used to filter out parts of the format. This is
     * useful when using the native Intl formats like
     * `{ date: 'full', time: 'full' }` and not wanting to keep all the parts of
     * the given format.
     */
    partFilter?: (part: Part) => boolean;
    /**
     * The behavior to use when a date overflows a given month. For example, if
     * the date to parse is February 29, 2023 — there is no 29th day of February.
     * In this case overflow "forward" would result in March 1, 2023, "backward"
     * would result in February 28, 2023, and "throw" would throw an error.
     */
    dateOverflow?: "forward" | "backward" | "throw";
}
interface FormatOptions {
    /**
     * A date object or ISO 8601 string.
     */
    date: DateInput;
    /**
     * A format string or object.
     */
    format: Format;
    /**
     * A locale or en by default.
     */
    locale?: string;
    /**
     * Whether or not to escape literals.
     */
    genitive?: boolean;
    /**
     * A function to filter parts.
     */
    tz?: string;
    /**
     * A function to filter parts.
     */
    partFilter?: (part: Part) => boolean;
}

/**
 * Returns a new date object 1/n days after the original one.
 * @param inputDate - A date to increment by 1 day.
 */
declare function addDay(inputDate: DateInput, count?: number): Date;

/**
 * Returns a new date object 1/n months after the original one. Keep in mind if you
 * start with a date late in a given month you could get a date after the next
 * month.
 * @param inputDate - A date to increment by 1 or more months.
 * @param count - The quantity to add.
 * @param dateOverflow - Whether or not to allow the date to overflow to another month if the inputDate’s month is out of range of the new month.
 */
declare function addMonth(inputDate: DateInput, count?: number, dateOverflow?: boolean): Date;

/**
 * Returns a new date object 1/n years after the original one. Keep in mind if
 * you start with a date late in a given month you could get a date after the
 * next month.
 * @param inputDate - A date to increment by 1 day.
 * @param count - The quantity of years add.
 * @param dateOverflow - Whether or not to allow the date to overflow to another month if the inputDate’s month is out of range of the new month.
 */
declare function addYear(inputDate: DateInput, count?: number, dateOverflow?: boolean): Date;

/**
 * Returns a new date object 1/n hours after the original one.
 * @param inputDate - A date to increment by 1 day.
 */
declare function addHour(inputDate: DateInput, count?: number): Date;

/**
 * Returns a new date object 1/n seconds after the original one.
 * @param inputDate - A date to increment by 1 day.
 */
declare function addMinute(inputDate: DateInput, count?: number): Date;

/**
 * Returns a new date object 1/n seconds after the original one.
 * @param inputDate - A date to increment by 1 day.
 */
declare function addSecond(inputDate: DateInput, count?: number): Date;

/**
 * Determines the correct value for am/pm by locale and memoizes it.
 * @param ampm - am or pm
 * @param locale - The locale to fetch.
 */
declare function ap(ampm: "am" | "pm", locale: string): string;

/**
 * Apply a given offset to a date, returning a new date with the offset
 * applied by adding or subtracting the given number of minutes.
 * @param dateInput - The date to apply the offset to.
 * @param offset - The offset to apply in the +-HHmm format.
 */
declare function applyOffset(dateInput: DateInput, offset?: string): Date;

/**
 * A date to parse.
 * @param date - A Date object or an ISO 8601 date.
 */
declare function date(date?: DateInput): Date;

/**
 * Creates a date object for the input date at the given timezone. For example
 * `tzDate("2017-05-06T12:00", "Europe/Amsterdam")` will return a date object
 * for 2017-05-06T10:00:00Z since 12:00 in Amsterdam is 10:00Z.
 *
 * If given a Date object it will use local time and convert it to the given
 * timezone, thus "changing" the date.
 * @param inputDate - An iso8601 date string with no timezone
 * @param tz - A timezone string
 */
declare function tzDate(inputDate: DateInput, tz: string): Date;

/**
 * Gets the what day of the year a given date is. For example, August 1st is
 * the 213th day of the year on non- years and 214th on leap years.
 * @param inputDate - The input date.
 */
declare function dayOfYear(inputDate: DateInput): number;

/**
 * Returns a Date object for end of the given day.
 * @param inputDate - A string or Date object
 */
declare function dayEnd(inputDate: DateInput): Date;

/**
 * Returns a Date object for start of the given day.
 * @param inputDate - A string or Date object
 */
declare function dayStart(inputDate: DateInput): Date;

/**
 * Produce a formatted string. Available strings:
 * token | description
 * ------|------------
 * YY | 2 digit year
 * YYYY | 4 digit year
 * M | The month 1-12
 * MM | The month 01-12
 * MMM | Short name Jan-Dec
 * MMMM | Full name January | December
 * D | The day of the month 1-31
 * DD | The day of the month 01-31
 * d | Single digit day "T"
 * ddd | Short day name Thu
 * dddd | Full day name Wednesday
 * H | Minimum hour digits, 24 hour, 0-23
 * HH | 2 hour digits, 24 hour, 00-23
 * h | Minimum hour digits, 12 hour clock, 1-12
 * hh | 2 hour digits, 12 hour clock, 01-12
 * m | The minute 0-59
 * mm | The minute 00-59
 * s | The second 0-59
 * ss | The second 00-59
 * a | am/pm
 * A | AM/PM
 * Z | +0800, +0530, -1345
 *
 * @param inputDate - A date object or ISO 8601 string
 * @param format - A format
 */
declare function format(options: FormatOptions): string;
declare function format(inputDate: DateInput, format?: Format, locale?: string, genitive?: boolean, partFilter?: (part: Part) => boolean): string;

/**
 * Return the string format for a given format. For example:
 * ```js
 * formatStr({ date: 'long' }, 'en') // dddd, MMMM D, YYYY
 * ```
 * @param format - A format string or object.
 * @param locale - A locale or en by default.
 */
declare function formatStr(format: Format, locale?: string, escapeLiterals?: boolean, filterParts?: (part: Part) => boolean): string;

/**
 * Converts a 2 digit year into a 4 digit year. This function assumes years 20
 * years into the future belong to the current century, and the past 80 are in
 * the past.
 *
 * @param value - 2 digits in string format
 */
declare function fourDigitYear(value: string): number;

/**
 * Returns a Date object for end of the given hour.
 * @param inputDate - A string or Date object
 */
declare function hourEnd(inputDate: DateInput): Date;

/**
 * Returns a Date object for start of the given hour.
 * @param inputDate - A string or Date object
 */
declare function hourStart(inputDate: DateInput): Date;

/**
 * True when the date string is valid ISO 8601.
 * @param date - A date string.
 */
declare function iso8601(date: string): boolean;

/**
 * Returns a Date object for end of the given minute.
 * @param inputDate - A string or Date object
 */
declare function minuteEnd(inputDate: DateInput): Date;

/**
 * Returns a Date object for start of the given minute.
 * @param inputDate - A string or Date object
 */
declare function minuteStart(inputDate: DateInput): Date;

/**
 * Returns the total number of days from a given month.
 * @param inputDate - A string or Date object
 */
declare function monthDays(inputDate: DateInput): number;

/**
 * Returns a Date object for the with the input date set to the last day of
 * the current month. Does not change the time.
 * @param inputDate - A string or Date object
 */
declare function monthEnd(inputDate: DateInput): Date;

/**
 * Returns a Date object for the first day of a month.
 * @param inputDate - A string or Date object
 */
declare function monthStart(inputDate: DateInput): Date;

/**
 * Performs a bidirectional search for the nearest date that passes a function.
 * @param target - Performs a search for the nearest passing date.
 * @param search - The search function to use, given a date returns a boolean.
 * @param constraint - The number of iterations to perform before giving up, or logical constraint like "month", or "week".
 *
 */
declare function nearestDay(inputDate: DateInput, search: (date: Date) => boolean, constraint?: number | "month" | "week" | "year"): Date | null;

/**
 * Returns the offset between two timezones on a given date. The results are
 * ISO8601 compatible offsets like -0800 or +0530.
 *
 * @param dateInput - The date on which to determine the offset.
 * @param tzA - (default: UTC) The second timezone to compare determine the offset between.
 * @param tzB - (default: device) The first timezone to compare determine the offset between.
 */
declare function offset(utcTime: DateInput, tzA?: string, tzB?: string): string;

declare function parse(options: ParseOptions): Date | never;
declare function parse(dateStr: string, format?: Format, locale?: string): Date | never;
/**
 * Given a string date and corresponding format parts, fill the parts with the
 * data from the string.
 * @param dateStr - A string to parse.
 * @param formatParts - The expected parts of the given string.
 */
declare function parseParts(dateStr: string, formatParts: Part[]): FilledPart[];

/**
 * Given a format string, produce an array of matching "parts", each part
 * contains a regular expression and the corresponding
 * Intl.DateTimeFormatPartTypesRegistry key/value.
 * @param format - A format string like MM/DD/YYYY
 * @param locale - The locale to parse for.
 */
declare function parts(format: Format, locale: string): Part[];

/**
 * Returns an array of options for a given token in a given locale.
 * @param token - Get the full range of options for a given token
 * @param locale - The locale to fetch the options for.
 */
declare function range(token: FormatToken, locale?: string, genitive?: boolean): string[];

/**
 * Inverts the offset and applies it to the given date, returning a new date.
 * @param dateInput - The date to remove the offset from.
 * @param offset - The offset to remove in the +-HHmm format.
 */
declare function removeOffset(dateInput: DateInput, offset?: string): Date;

/**
 * Checks if two date objects refer to the same date. Ignores time.
 * @param inputDateA - First date to compare
 * @param inputDateB - Second date to compare
 */
declare function sameDay(inputDateA: DateInput, inputDateB: DateInput): boolean;

/**
 * Checks if two date objects refer to the same time seconds. Ignores date.
 * @param inputDateA - First date to compare
 * @param inputDateB - Second date to compare
 */
declare function sameSecond(inputDateA: DateInput, inputDateB: DateInput): boolean;

/**
 * Checks if two date objects refer to the same time minutes. Ignores date.
 * @param inputDateA - First date to compare
 * @param inputDateB - Second date to compare
 */
declare function sameMinute(inputDateA: DateInput, inputDateB: DateInput): boolean;

/**
 * Checks if two date objects refer to the same time hour. Ignores date.
 * @param inputDateA - First date to compare
 * @param inputDateB - Second date to compare
 */
declare function sameHour(inputDateA: DateInput, inputDateB: DateInput): boolean;

/**
 * Checks if two date objects refer to the same year.
 * @param inputDateA - First date to compare
 * @param inputDateB - Second date to compare
 */
declare function sameYear(inputDateA: DateInput, inputDateB: DateInput): boolean;

/**
 * Returns a Date object for the last day at the last second of the given week.
 * Defaults to Sunday as the first day of the week:
 * 0 = Sunday ... 6 = Saturday
 * @param inputDate - Gets the last day of the week
 * @param startOfWeekDay - The first day of the week
 */
declare function weekEnd(inputDate: DateInput, startOfWeekDay?: number): Date;

/**
 * Returns a Date object for start of the given week. Defaults to Sunday as the
 * first day of the week:
 * 0 = Sunday ... 6 = Saturday
 * @param inputDate - A string or Date object
 * @param startOfWeekDay - Determines which day of the week is the first
 */
declare function weekStart(inputDate: DateInput, startOfWeekDay?: number): Date;

/**
 * Get the number of days in the given date’s year.
 * @param inputDate - A string or Date object
 */
declare function yearDays(inputDate: DateInput): number;

/**
 * Returns a Date object for the with the input date set to the start of the current year.
 * @param inputDate - A string or Date object
 */
declare function yearStart(inputDate: DateInput): Date;

/**
 * Returns a Date object for the with the input date set to the end of the current year.
 * @param inputDate - A string or Date object
 */
declare function yearEnd(inputDate: DateInput): Date;

/**
 * Is the first date before the second one?
 *
 * @param inputDate - The date that should be before the other one to return true
 * @param dateToCompare - The date to compare with
 *
 * @returns The first date is before the second date.
 */
declare function isBefore(inputDate: DateInput, dateToCompare: DateInput): boolean;

/**
 * @name isAfter
 * @category Common Helpers
 * @summary Is the first date after the second one?
 *
 * @description
 * Is the first date after the second one?
 *
 * @param inputDate - The date that should be after the other one to return true
 * @param dateToCompare - The date to compare with
 *
 * @returns The first date is after the second date.
 */
declare function isAfter(inputDate: DateInput, dateToCompare: DateInput): boolean;

/**
 * Are the given dates equal?
 *
 * @param dateLeft - The first date to compare
 * @param dateRight - The second date to compare
 *
 * @returns The dates are equal.
 */
declare function isEqual(dateLeft: DateInput, dateRight: DateInput): boolean;

export { type DateInput, type FilledPart, type Format, type FormatOptions, type FormatPattern, type FormatStyle, type FormatStyleObj, type FormatToken, type NamedFormatOption, type NamedFormats, type ParseOptions, type Part, addDay, addHour, addMinute, addMonth, addSecond, addYear, ap, applyOffset, date, dayEnd, dayOfYear, dayStart, format, formatStr, fourDigitYear, hourEnd, hourStart, isAfter, isBefore, isEqual, iso8601, minuteEnd, minuteStart, monthDays, monthEnd, monthStart, nearestDay, offset, parse, parseParts, parts, range, removeOffset, sameDay, sameHour, sameMinute, sameSecond, sameYear, tzDate, weekEnd, weekStart, yearDays, yearEnd, yearStart };
