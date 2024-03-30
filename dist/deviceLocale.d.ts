/**
 * Returns the device's locale. This is a simple proxy of the
 * `Intl.DateTimeFormat().resolvedOptions().locale` call.
 */
declare function deviceLocale(): string;

export { deviceLocale };
