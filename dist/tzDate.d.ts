import { DateInput } from './types.js';

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

export { tzDate };
