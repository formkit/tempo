import { DateInput } from './types.cjs';

/**
 * Returns the offset between two timezones on a given date. The results are
 * ISO8601 compatible offsets like -0800 or +0530.
 *
 * @param dateInput - The date on which to determine the offset.
 * @param tzA - (default: UTC) The second timezone to compare determine the offset between.
 * @param tzB - (default: device) The first timezone to compare determine the offset between.
 */
declare function offset(utcTime: DateInput, tzA?: string, tzB?: string): string;

export { offset };
