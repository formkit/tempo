/**
 * Determines the correct value for am/pm by locale and memoizes it.
 * @param ampm - am or pm
 * @param locale - The locale to fetch.
 */
declare function ap(ampm: "am" | "pm", locale: string): string;

export { ap };
