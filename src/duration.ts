import { DurationOptions, FormatToken, DurationFormat } from './types';

/**
 * Formats or parses a duration.
 * @param input - Duration in milliseconds to format or a string to parse.
 * @param options - Options to define formatting or parsing behavior.
 * @returns A formatted duration string or duration in milliseconds.
 */
export function formatOrParseDuration(input: number | string, options: DurationOptions = {}): string | number {
  const { format = 'hh:mm:ss', parse = false, locale } = options;

  // Determine whether to parse or format based on the input type and options.
  if (parse && typeof input === 'string') {
    return parseDuration(input, format);
  }

  if (!parse && typeof input === 'number') {
    return formatDuration(input, format);
  }

  throw new Error('Invalid input or options.');
}

/**
 * Formats a duration given in milliseconds to a string in the specified format.
 * @param durationInMs - Duration in milliseconds.
 * @param format - The format string.
 * @returns A string representing the duration.
 */
function formatDuration(durationInMs: number, format: DurationFormat): string {
  const parts: Partial<Record<FormatToken, number>> = {
    // Calculate days from milliseconds.
    DD: Math.floor(durationInMs / 86400000),
    // Calculate hours from remaining milliseconds.
    hh: Math.floor((durationInMs % 86400000) / 3600000),
    // Calculate minutes from remaining milliseconds.
    mm: Math.floor((durationInMs % 3600000) / 60000),
    // Calculate seconds from remaining milliseconds.
    ss: Math.floor((durationInMs % 60000) / 1000),
    // Calculate milliseconds.
    SSS: durationInMs % 1000,
  };

  // Replace format tokens with corresponding values from the parts object.
  return format.replace(/DD|hh|mm|ss|SSS/g, (match) => {
    return String(parts[match as FormatToken]).padStart(match === 'SSS' ? 3 : 2, '0');
  });
}

/**
 * Parses a duration string in the specified format to milliseconds.
 * @param durationString - Duration string.
 * @param format - The format string.
 * @returns The duration in milliseconds.
 */
function parseDuration(durationString: string, format: DurationFormat): number {
  // Create a regular expression to extract the numeric values based on the format.
  const regex = new RegExp(format.replace(/DD|hh|mm|ss|SSS/g, '(\\d{2,3})'));
  const matches = durationString.match(regex);

  if (!matches) {
    throw new Error('Invalid duration string.');
  }

  // Convert the extracted numeric values to an array of numbers.
  const parts = matches.slice(1).map(Number);
  let durationInMs = 0;

  // Calculate the total duration in milliseconds based on the format.
  format.split(/[^a-zA-Z]/).forEach((part, index) => {
    switch (part) {
      // Add days to duration.
      case 'DD': durationInMs += parts[index] * 86400000; break;
      // Add hours to duration.
      case 'hh': durationInMs += parts[index] * 3600000; break;
      // Add minutes to duration.
      case 'mm': durationInMs += parts[index] * 60000; break;
      // Add seconds to duration.
      case 'ss': durationInMs += parts[index] * 1000; break;
      // Add milliseconds to duration.
      case 'SSS': durationInMs += parts[index]; break;
      default: break;
    }
  });

  return durationInMs;
}
